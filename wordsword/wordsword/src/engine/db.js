// IndexedDB persistence. All user progress lives here (never only in the SW cache).
// Schema changes are applied by numbered migrations; existing data is never dropped.
export const DB_NAME = "wordsword";
export const DB_VERSION = 1;

export const MIGRATIONS = {
  1(db) {
    db.createObjectStore("kv");                                   // documents: prefs, vocab sets, course, qstats, exposure, meta
    const a = db.createObjectStore("attempts", { keyPath: "id" }); // finished exams with question snapshots
    a.createIndex("testId", "testId"); a.createIndex("finishedAt", "finishedAt");
    const e = db.createObjectStore("events", { keyPath: "id" });   // every answer event (learning and exam)
    e.createIndex("attemptId", "attemptId"); e.createIndex("ts", "ts");
    db.createObjectStore("sessions", { keyPath: "id" });           // unfinished exams / learning sessions
  }
};

export function openDB(idb = globalThis.indexedDB, name = DB_NAME, version = DB_VERSION) {
  return new Promise((resolve, reject) => {
    if (!idb) return reject(new Error("IndexedDB недоступен"));
    const req = idb.open(name, version);
    req.onupgradeneeded = e => { const db = req.result; for (let v = e.oldVersion + 1; v <= version; v++) if (MIGRATIONS[v]) MIGRATIONS[v](db, req.transaction); };
    req.onsuccess = () => { const db = req.result; db.onversionchange = () => db.close(); resolve(db); };
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error("База данных заблокирована другой вкладкой. Закройте другие вкладки приложения."));
  });
}

const done = tx => new Promise((res, rej) => { tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); tx.onabort = () => rej(tx.error || new Error("Transaction aborted")); });
const reqP = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });

export function makeDB(db) {
  return {
    raw: db,
    async get(store, key) { const tx = db.transaction(store); return reqP(tx.objectStore(store).get(key)); },
    async getAll(store) { const tx = db.transaction(store); return reqP(tx.objectStore(store).getAll()); },
    async keys(store) { const tx = db.transaction(store); return reqP(tx.objectStore(store).getAllKeys()); },
    /** Resolves only after the transaction has committed (explicit save confirmation). */
    async put(store, value, key) { const tx = db.transaction(store, "readwrite"); const os = tx.objectStore(store); key === undefined ? os.put(value) : os.put(value, key); return done(tx); },
    async putMany(store, values) { const tx = db.transaction(store, "readwrite"); const os = tx.objectStore(store); values.forEach(v => os.put(v)); return done(tx); },
    async del(store, key) { const tx = db.transaction(store, "readwrite"); tx.objectStore(store).delete(key); return done(tx); },
    async clear(store) { const tx = db.transaction(store, "readwrite"); tx.objectStore(store).clear(); return done(tx); },
    /** Several stores in one atomic transaction: ops = [{store, value, key?, del?}] */
    async batch(ops) {
      const stores = [...new Set(ops.map(o => o.store))]; const tx = db.transaction(stores, "readwrite");
      ops.forEach(o => { const os = tx.objectStore(o.store); if (o.del) os.delete(o.key); else o.key === undefined ? os.put(o.value) : os.put(o.value, o.key); });
      return done(tx);
    },
    async dumpAll() {
      const kvKeys = await this.keys("kv"); const kv = {};
      for (const k of kvKeys) kv[k] = await this.get("kv", k);
      return { kv, attempts: await this.getAll("attempts"), events: await this.getAll("events"), sessions: await this.getAll("sessions") };
    },
    async replaceAll(dump) {
      const tx = db.transaction(["kv", "attempts", "events", "sessions"], "readwrite");
      ["kv", "attempts", "events", "sessions"].forEach(s => tx.objectStore(s).clear());
      Object.entries(dump.kv || {}).forEach(([k, v]) => tx.objectStore("kv").put(v, k));
      (dump.attempts || []).forEach(v => tx.objectStore("attempts").put(v));
      (dump.events || []).forEach(v => tx.objectStore("events").put(v));
      (dump.sessions || []).forEach(v => tx.objectStore("sessions").put(v));
      return done(tx);
    }
  };
}
