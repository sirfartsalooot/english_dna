// Application-level persistence over IndexedDB: documents (kv), attempts, events, sessions.
// Every write resolves after the transaction commits, and listeners get an explicit "saved" status.
import { openDB, makeDB, DB_VERSION } from "./db.js";

export function createStore({ idb, name } = {}) {
  let db = null; const listeners = new Set(); const timers = {}; const pending = {};
  let status = { state: "idle", at: 0, error: null };
  const emit = s => { status = Object.assign({}, status, s); listeners.forEach(f => f(status)); };
  const track = async p => { emit({ state: "saving" }); try { await p; emit({ state: "saved", at: Date.now(), error: null }); } catch (e) { emit({ state: "error", error: String(e && e.message || e) }); throw e; } };

  return {
    get status() { return status; },
    onStatus(f) { listeners.add(f); return () => listeners.delete(f); },
    async init() {
      db = makeDB(await openDB(idb, name));
      let meta = await db.get("kv", "meta");
      if (!meta) { meta = { schema: DB_VERSION, createdAt: Date.now() }; await db.put("kv", meta, "meta"); }
      else if (meta.schema !== DB_VERSION) { meta = Object.assign({}, meta, { schema: DB_VERSION, migratedAt: Date.now() }); await db.put("kv", meta, "meta"); }
      return meta;
    },
    db: () => db,
    get: k => db.get("kv", k),
    async loadDocs() { const keys = await db.keys("kv"); const out = {}; for (const k of keys) out[k] = await db.get("kv", k); return out; },
    /** Debounced document save (coalesces fast successive updates); flush() forces pending writes. */
    saveDoc(key, value, delay = 120) {
      pending[key] = value; clearTimeout(timers[key]);
      return new Promise((res, rej) => { timers[key] = setTimeout(() => { const v = pending[key]; delete pending[key]; track(db.put("kv", v, key)).then(res, rej); }, delay); });
    },
    async flush() { const ks = Object.keys(pending); ks.forEach(k => clearTimeout(timers[k])); const ops = ks.map(k => ({ store: "kv", key: k, value: pending[k] })); ks.forEach(k => delete pending[k]); if (ops.length) await track(db.batch(ops)); },
    putSession: s => track(db.put("sessions", s)),
    delSession: id => track(db.del("sessions", id)),
    getSession: id => db.get("sessions", id),
    sessions: () => db.getAll("sessions"),
    attempts: () => db.getAll("attempts"),
    events: () => db.getAll("events"),
    addEvents: evs => evs.length ? track(db.putMany("events", evs)) : Promise.resolve(),
    /** Finish an exam atomically: attempt + events + exposure doc + remove the open session. */
    commitAttempt(attempt, events, extraDocs = {}, sessionId) {
      const ops = [{ store: "attempts", value: attempt }].concat(events.map(e => ({ store: "events", value: e })), Object.entries(extraDocs).map(([k, v]) => ({ store: "kv", key: k, value: v })));
      if (sessionId) ops.push({ store: "sessions", key: sessionId, del: true });
      return track(db.batch(ops));
    },
    dumpAll: () => db.dumpAll(),
    replaceAll: dump => track(db.replaceAll(dump)),
    async clearProgress(scope) {
      if (scope === "all") return track(db.replaceAll({ kv: { meta: await db.get("kv", "meta"), prefs: await db.get("kv", "prefs") }, attempts: [], events: [], sessions: [] }));
    }
  };
}

/**
 * Import progress from the previous vocab-app (localStorage key "cvt:<setId>:v1").
 * Word ids are remapped (numeric → "ai-<n>"). Runs once; the source is left untouched.
 */
export function migrateLegacyVocab(raw) {
  if (!raw) return null;
  let s; try { s = JSON.parse(raw); } catch (e) { return null; }
  if (!s || !s.levels) return null;
  const map = id => typeof id === "number" || /^\d+$/.test(String(id)) ? "ai-" + id : id;
  const stats = {}; Object.entries(s.stats || {}).forEach(([k, v]) => { stats[map(k)] = v; });
  const levels = {}; Object.entries(s.levels).forEach(([n, L]) => { levels[n] = { learned: (L.learned || []).map(map), size: L.size || 10, runs: L.runs || 0, session: null }; });
  const hist = ((s.test && s.test.history) || []).map(h => ({ ts: h.ts, score: h.score, total: h.total }));
  let current = null;
  if (s.test && s.test.current) { const c = s.test.current; const answers = {}; Object.entries(c.answers || {}).forEach(([k, v]) => { answers[map(k)] = v; }); current = Object.assign({}, c, { order: (c.order || []).map(map), answers }); }
  return { v: 1, stats, levels, test: { current, history: hist }, migratedFrom: "vocab-app", migratedAt: Date.now() };
}
