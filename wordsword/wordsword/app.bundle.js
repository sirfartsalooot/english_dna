(() => {
  var __freeze = Object.freeze, __defProp = Object.defineProperty, __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value, __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b))
        __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);
    return a;
  }, __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));

  // src/ui/core.js
  var React = window.React, { useState, useEffect, useRef, useMemo, useCallback, useContext, createContext } = React, html = window.htm.bind(React.createElement), AppCtx = createContext(null), useApp = () => useContext(AppCtx), actx = null;
  function audio() {
    let AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      actx || (actx = new AC()), actx.state === "suspended" && actx.resume();
    } catch (e) {
      return null;
    }
    return actx;
  }
  function unlockAudio() {
    let c = audio();
    if (c)
      try {
        let b = c.createBuffer(1, 1, 22050), s = c.createBufferSource();
        s.buffer = b, s.connect(c.destination), s.start(0);
      } catch (e) {
      }
  }
  window.addEventListener("pointerdown", unlockAudio, { passive: !0, capture: !0 });
  function tone(seq) {
    let c = audio();
    if (c)
      try {
        let t0 = c.currentTime + 0.02;
        seq.forEach(([f3, st, d, v, type, f22]) => {
          let o = c.createOscillator(), g = c.createGain();
          o.type = type || "sine", o.frequency.setValueAtTime(f3, t0 + st), f22 && o.frequency.exponentialRampToValueAtTime(f22, t0 + st + d), g.gain.setValueAtTime(1e-4, t0 + st), g.gain.linearRampToValueAtTime(v || 0.2, t0 + st + 0.012), g.gain.exponentialRampToValueAtTime(1e-4, t0 + st + d), o.connect(g), g.connect(c.destination), o.start(t0 + st), o.stop(t0 + st + d + 0.05);
        });
      } catch (e) {
      }
  }
  var SFX = {
    ok: [[659.25, 0, 0.16, 0.22, "triangle"], [987.77, 0.085, 0.3, 0.2, "sine"]],
    bad: [[246, 0, 0.2, 0.2, "triangle", 196], [250, 0, 0.2, 0.06, "sawtooth", 200], [185, 0.15, 0.32, 0.2, "triangle", 150], [188, 0.15, 0.32, 0.05, "sawtooth", 152]],
    set: [[523.25, 0, 0.14, 0.18, "triangle"], [659.25, 0.08, 0.14, 0.18, "triangle"], [783.99, 0.16, 0.3, 0.2, "sine"]],
    finish: [[392, 0, 0.22, 0.17, "triangle"], [523.25, 0.11, 0.22, 0.17, "triangle"], [659.25, 0.22, 0.42, 0.18, "sine"]],
    done: [[523.25, 0, 0.3, 0.2, "triangle"], [659.25, 0.08, 0.3, 0.2, "triangle"], [783.99, 0.16, 0.4, 0.2, "triangle"], [1046.5, 0.26, 0.7, 0.2, "sine"]],
    tap: [[520, 0, 0.07, 0.07, "sine"]]
  }, VIB = { ok: 18, bad: [45, 50, 45], set: [20, 40, 20], finish: [25, 40, 60], done: [30, 40, 30, 40, 90] };
  function playSfx(prefs, k) {
    if (prefs.sound && SFX[k] && tone(SFX[k]), prefs.vibro && VIB[k] && navigator.vibrate)
      try {
        navigator.vibrate(VIB[k]);
      } catch (e) {
      }
  }
  var _a, svg = (d, sw) => html(_a || (_a = __template(['<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=', ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">', "</svg>"])), sw || 2, d), _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, I = {
    back: svg(html(_b || (_b = __template(['<path d="M15 5l-7 7 7 7"/>'])))),
    right: svg(html(_c || (_c = __template(['<path d="M9 5l7 7-7 7"/>'])))),
    left: svg(html(_d || (_d = __template(['<path d="M15 5l-7 7 7 7"/>'])))),
    ok: svg(html(_e || (_e = __template(['<path d="M5 12.5l4.5 4.5L19 7.5"/>']))), 2.4),
    bad: svg(html(_f || (_f = __template(['<path d="M7 7l10 10M17 7L7 17"/>']))), 2.4),
    restart: svg(html(_g || (_g = __template(['<path d="M3.5 12a8.5 8.5 0 1 0 2.5-6"/><path d="M3.5 3.5V8H8"/>'])))),
    soundOn: svg(html(_h || (_h = __template(['<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12"/>']))), 1.8),
    soundOff: svg(html(_i || (_i = __template(['<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l5 5M22 9l-5 5"/>']))), 1.8),
    gear: svg(html(_j || (_j = __template(['<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>']))), 1.8),
    grid: svg(html(_k || (_k = __template(['<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>']))), 1.8),
    today: svg(html(_l || (_l = __template(['<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>']))), 1.8),
    book: svg(html(_m || (_m = __template(['<path d="M5 4h9a4 4 0 014 4v12H9a4 4 0 01-4-4z"/><path d="M5 16a4 4 0 014-4h9"/>']))), 1.8),
    words: svg(html(_n || (_n = __template(['<path d="M4 6h10M4 12h16M4 18h12"/><path d="M17 4l3 3-3 3"/>']))), 1.8),
    test: svg(html(_o || (_o = __template(['<path d="M7 4h10v16H7z"/><path d="M10 9l1.5 1.5L14 8M10 15h4"/>']))), 1.8),
    chart: svg(html(_p || (_p = __template(['<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>']))), 1.8),
    check: svg(html(_q || (_q = __template(['<path d="M5 12.5l4.5 4.5L19 7.5"/>']))), 2.6),
    search: svg(html(_r || (_r = __template(['<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>']))), 1.8)
  }, _s, _t, _u, _v, _w, _x, _y;
  function Screen({ title, sub, onBack, right, footer, scrollKey, lv, children, nav, bare }) {
    let sc = useRef(null);
    return useEffect(() => {
      sc.current && (sc.current.scrollTop = 0);
    }, [scrollKey]), html(_y || (_y = __template(["<div class=", ">\n    ", "\n    <main class=", " ref=", ">", "</main>\n    ", "\n    ", "\n  </div>"])), "screen" + (lv ? " lv-" + lv : ""), bare ? null : html(_w || (_w = __template(['<header class="topbar">\n      ', '\n      <div class="tb-t"><b>', "</b>", "</div>\n      ", "\n    </header>"])), onBack ? html(_s || (_s = __template(['<button class="ib" onClick=', ' aria-label="Назад">', "</button>"])), onBack, I.back) : html(_t || (_t = __template(["<span></span>"]))), title, sub ? html(_u || (_u = __template(["<span>", "</span>"])), sub) : null, right || html(_v || (_v = __template(["<span></span>"])))), "content" + (nav ? " has-nav" : ""), sc, children, footer ? html(_x || (_x = __template(['<footer class="footer">', "</footer>"])), footer) : null, nav || null);
  }
  var _z, _A;
  function BottomNav({ tab, setTab }) {
    let items = [["today", "Сегодня", I.today], ["course", "Курс", I.book], ["words", "Слова", I.words], ["tests", "Тесты", I.test], ["progress", "Прогресс", I.chart]];
    return html(_A || (_A = __template(['<nav class="bnav" aria-label="Разделы">', "</nav>"])), items.map(([k, l, ic]) => html(_z || (_z = __template(["<button key=", " aria-current=", " onClick=", ">", "<span>", "</span></button>"])), k, tab === k ? "page" : void 0, () => setTab(k), ic, l)));
  }
  var _B;
  function Sheet({ onClose, label, children }) {
    return useEffect(() => {
      let k = (e) => {
        e.key === "Escape" && onClose();
      };
      return window.addEventListener("keydown", k), () => window.removeEventListener("keydown", k);
    }, []), html(_B || (_B = __template(['<div class="sheet-bg" onClick=', '><div class="sheet" role="dialog" aria-modal="true" aria-label=', '><div class="grab"></div>', "</div></div>"])), (e) => {
      e.target === e.currentTarget && onClose();
    }, label, children);
  }
  var _C;
  function SaveBadge() {
    let s = useApp().saveStatus, t = s.state === "saving" ? "Сохранение…" : s.state === "error" ? "Ошибка сохранения" : s.at ? "Сохранено " + new Date(s.at).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "Данные на устройстве";
    return html(_C || (_C = __template(["<span class=", ' role="status" aria-live="polite" title=', "><i></i>", "</span>"])), "save " + s.state, s.error || "", t);
  }
  var STATUS_CLS = { "Не начато": "st-0", Изучаю: "st-1", "Готов к проверке": "st-2", Закреплено: "st-3", "Нужно повторить": "st-4" }, _E, StatusChip = ({ s }) => html(_E || (_E = __template(["<span class=", ">", "</span>"])), "badge-s " + (STATUS_CLS[s] || "st-0"), s), _F, _G, Row = ({ title, sub, onClick, left, right, dim }) => html(_G || (_G = __template(["<button class=", " onClick=", ">", '<span class="rt"><b>', "</b>", "</span>", '<span class="chev">', "</span></button>"])), "row" + (dim ? " dim" : ""), onClick, left || null, title, sub ? html(_F || (_F = __template(["<span>", "</span>"])), sub) : null, right || null, I.right), fmtDT = (ts) => new Date(ts).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }), fmtDur = (ms) => {
    let m = Math.round(ms / 6e4);
    return m < 60 ? m + " мин" : Math.floor(m / 60) + " ч " + m % 60 + " мин";
  }, _H, _I, _J;
  function rich(t) {
    let out = [], re = /(\*\*[^*]+\*\*|_[^_]+_|~~[^~]+~~)/g, last = 0, m, k = 0;
    for (; m = re.exec(t); ) {
      m.index > last && out.push(t.slice(last, m.index));
      let s = m[0];
      s.startsWith("**") ? out.push(html(_H || (_H = __template(["<b key=", ">", "</b>"])), k++, s.slice(2, -2))) : s.startsWith("~~") ? out.push(html(_I || (_I = __template(["<s key=", ">", "</s>"])), k++, s.slice(2, -2))) : out.push(html(_J || (_J = __template(["<em key=", ' lang="en">', "</em>"])), k++, s.slice(1, -1))), last = m.index + s.length;
    }
    return last < t.length && out.push(t.slice(last)), out;
  }

  // src/engine/db.js
  var DB_NAME = "wordsword";
  var MIGRATIONS = {
    1(db) {
      db.createObjectStore("kv");
      let a = db.createObjectStore("attempts", { keyPath: "id" });
      a.createIndex("testId", "testId"), a.createIndex("finishedAt", "finishedAt");
      let e = db.createObjectStore("events", { keyPath: "id" });
      e.createIndex("attemptId", "attemptId"), e.createIndex("ts", "ts"), db.createObjectStore("sessions", { keyPath: "id" });
    }
  };
  function openDB(idb = globalThis.indexedDB, name = DB_NAME, version = 1) {
    return new Promise((resolve, reject) => {
      if (!idb) return reject(new Error("IndexedDB недоступен"));
      let req = idb.open(name, version);
      req.onupgradeneeded = (e) => {
        let db = req.result;
        for (let v = e.oldVersion + 1; v <= version; v++) MIGRATIONS[v] && MIGRATIONS[v](db, req.transaction);
      }, req.onsuccess = () => {
        let db = req.result;
        db.onversionchange = () => db.close(), resolve(db);
      }, req.onerror = () => reject(req.error), req.onblocked = () => reject(new Error("База данных заблокирована другой вкладкой. Закройте другие вкладки приложения."));
    });
  }
  var done = (tx) => new Promise((res, rej) => {
    tx.oncomplete = () => res(), tx.onerror = () => rej(tx.error), tx.onabort = () => rej(tx.error || new Error("Transaction aborted"));
  }), reqP = (r) => new Promise((res, rej) => {
    r.onsuccess = () => res(r.result), r.onerror = () => rej(r.error);
  });
  function makeDB(db) {
    return {
      raw: db,
      async get(store2, key) {
        let tx = db.transaction(store2);
        return reqP(tx.objectStore(store2).get(key));
      },
      async getAll(store2) {
        let tx = db.transaction(store2);
        return reqP(tx.objectStore(store2).getAll());
      },
      async keys(store2) {
        let tx = db.transaction(store2);
        return reqP(tx.objectStore(store2).getAllKeys());
      },
      /** Resolves only after the transaction has committed (explicit save confirmation). */
      async put(store2, value, key) {
        let tx = db.transaction(store2, "readwrite"), os = tx.objectStore(store2);
        return key === void 0 ? os.put(value) : os.put(value, key), done(tx);
      },
      async putMany(store2, values) {
        let tx = db.transaction(store2, "readwrite"), os = tx.objectStore(store2);
        return values.forEach((v) => os.put(v)), done(tx);
      },
      async del(store2, key) {
        let tx = db.transaction(store2, "readwrite");
        return tx.objectStore(store2).delete(key), done(tx);
      },
      async clear(store2) {
        let tx = db.transaction(store2, "readwrite");
        return tx.objectStore(store2).clear(), done(tx);
      },
      /** Several stores in one atomic transaction: ops = [{store, value, key?, del?}] */
      async batch(ops) {
        let stores = [...new Set(ops.map((o) => o.store))], tx = db.transaction(stores, "readwrite");
        return ops.forEach((o) => {
          let os = tx.objectStore(o.store);
          o.del ? os.delete(o.key) : o.key === void 0 ? os.put(o.value) : os.put(o.value, o.key);
        }), done(tx);
      },
      async dumpAll() {
        let kvKeys = await this.keys("kv"), kv = {};
        for (let k of kvKeys) kv[k] = await this.get("kv", k);
        return { kv, attempts: await this.getAll("attempts"), events: await this.getAll("events"), sessions: await this.getAll("sessions") };
      },
      async replaceAll(dump) {
        let tx = db.transaction(["kv", "attempts", "events", "sessions"], "readwrite");
        return ["kv", "attempts", "events", "sessions"].forEach((s) => tx.objectStore(s).clear()), Object.entries(dump.kv || {}).forEach(([k, v]) => tx.objectStore("kv").put(v, k)), (dump.attempts || []).forEach((v) => tx.objectStore("attempts").put(v)), (dump.events || []).forEach((v) => tx.objectStore("events").put(v)), (dump.sessions || []).forEach((v) => tx.objectStore("sessions").put(v)), done(tx);
      }
    };
  }

  // src/engine/store.js
  function createStore({ idb, name } = {}) {
    let db = null, listeners = /* @__PURE__ */ new Set(), timers = {}, pending = {}, status = { state: "idle", at: 0, error: null }, emit = (s) => {
      status = Object.assign({}, status, s), listeners.forEach((f3) => f3(status));
    }, track = async (p2) => {
      emit({ state: "saving" });
      try {
        await p2, emit({ state: "saved", at: Date.now(), error: null });
      } catch (e) {
        throw emit({ state: "error", error: String(e && e.message || e) }), e;
      }
    };
    return {
      get status() {
        return status;
      },
      onStatus(f3) {
        return listeners.add(f3), () => listeners.delete(f3);
      },
      async init() {
        db = makeDB(await openDB(idb, name));
        let meta2 = await db.get("kv", "meta");
        return meta2 ? meta2.schema !== 1 && (meta2 = Object.assign({}, meta2, { schema: 1, migratedAt: Date.now() }), await db.put("kv", meta2, "meta")) : (meta2 = { schema: 1, createdAt: Date.now() }, await db.put("kv", meta2, "meta")), meta2;
      },
      db: () => db,
      get: (k) => db.get("kv", k),
      async loadDocs() {
        let keys = await db.keys("kv"), out = {};
        for (let k of keys) out[k] = await db.get("kv", k);
        return out;
      },
      /** Debounced document save (coalesces fast successive updates); flush() forces pending writes. */
      saveDoc(key, value, delay = 120) {
        return pending[key] = value, clearTimeout(timers[key]), new Promise((res, rej) => {
          timers[key] = setTimeout(() => {
            let v = pending[key];
            delete pending[key], track(db.put("kv", v, key)).then(res, rej);
          }, delay);
        });
      },
      async flush() {
        let ks = Object.keys(pending);
        ks.forEach((k) => clearTimeout(timers[k]));
        let ops = ks.map((k) => ({ store: "kv", key: k, value: pending[k] }));
        ks.forEach((k) => delete pending[k]), ops.length && await track(db.batch(ops));
      },
      putSession: (s) => track(db.put("sessions", s)),
      delSession: (id) => track(db.del("sessions", id)),
      getSession: (id) => db.get("sessions", id),
      sessions: () => db.getAll("sessions"),
      attempts: () => db.getAll("attempts"),
      events: () => db.getAll("events"),
      addEvents: (evs) => evs.length ? track(db.putMany("events", evs)) : Promise.resolve(),
      /** Finish an exam atomically: attempt + events + exposure doc + remove the open session. */
      commitAttempt(attempt, events, extraDocs = {}, sessionId) {
        let ops = [{ store: "attempts", value: attempt }].concat(events.map((e) => ({ store: "events", value: e })), Object.entries(extraDocs).map(([k, v]) => ({ store: "kv", key: k, value: v })));
        return sessionId && ops.push({ store: "sessions", key: sessionId, del: !0 }), track(db.batch(ops));
      },
      dumpAll: () => db.dumpAll(),
      replaceAll: (dump) => track(db.replaceAll(dump)),
      async clearProgress(scope) {
        if (scope === "all") return track(db.replaceAll({ kv: { meta: await db.get("kv", "meta"), prefs: await db.get("kv", "prefs") }, attempts: [], events: [], sessions: [] }));
      }
    };
  }
  function migrateLegacyVocab(raw) {
    if (!raw) return null;
    let s;
    try {
      s = JSON.parse(raw);
    } catch (e) {
      return null;
    }
    if (!s || !s.levels) return null;
    let map = (id) => typeof id == "number" || /^\d+$/.test(String(id)) ? "ai-" + id : id, stats = {};
    Object.entries(s.stats || {}).forEach(([k, v]) => {
      stats[map(k)] = v;
    });
    let levels = {};
    Object.entries(s.levels).forEach(([n, L2]) => {
      levels[n] = { learned: (L2.learned || []).map(map), size: L2.size || 10, runs: L2.runs || 0, session: null };
    });
    let hist = (s.test && s.test.history || []).map((h5) => ({ ts: h5.ts, score: h5.score, total: h5.total })), current = null;
    if (s.test && s.test.current) {
      let c = s.test.current, answers = {};
      Object.entries(c.answers || {}).forEach(([k, v]) => {
        answers[map(k)] = v;
      }), current = Object.assign({}, c, { order: (c.order || []).map(map), answers });
    }
    return { v: 1, stats, levels, test: { current, history: hist }, migratedFrom: "vocab-app", migratedAt: Date.now() };
  }

  // src/content/dsl.js
  var CONTR = [
    ["have not", "haven't"],
    ["has not", "hasn't"],
    ["had not", "hadn't"],
    ["do not", "don't"],
    ["does not", "doesn't"],
    ["did not", "didn't"],
    ["will not", "won't"],
    ["would not", "wouldn't"],
    ["is not", "isn't"],
    ["are not", "aren't"],
    ["was not", "wasn't"],
    ["were not", "weren't"],
    ["cannot", "can't"],
    ["could not", "couldn't"],
    ["should not", "shouldn't"],
    ["must not", "mustn't"],
    ["need not", "needn't"],
    ["might not", "mightn't"],
    ["shall not", "shan't"],
    ["I am", "I'm"],
    ["I have", "I've"],
    ["I will", "I'll"],
    ["I would", "I'd"],
    ["I had", "I'd"],
    ["you are", "you're"],
    ["you have", "you've"],
    ["you will", "you'll"],
    ["you would", "you'd"],
    ["you had", "you'd"],
    ["we are", "we're"],
    ["we have", "we've"],
    ["we will", "we'll"],
    ["we would", "we'd"],
    ["we had", "we'd"],
    ["they are", "they're"],
    ["they have", "they've"],
    ["they will", "they'll"],
    ["they would", "they'd"],
    ["they had", "they'd"],
    ["he is", "he's"],
    ["he has", "he's"],
    ["he will", "he'll"],
    ["he would", "he'd"],
    ["he had", "he'd"],
    ["she is", "she's"],
    ["she has", "she's"],
    ["she will", "she'll"],
    ["she would", "she'd"],
    ["she had", "she'd"],
    ["it is", "it's"],
    ["it has", "it's"],
    ["it will", "it'll"],
    ["it would", "it'd"],
    ["that is", "that's"],
    ["there is", "there's"],
    ["let us", "let's"]
  ], esc = (s) => s.replace(/[.*+?^${}()|[\]\\']/g, "\\$&");
  function variants(ans) {
    let out = /* @__PURE__ */ new Set([ans]), grew = !0, guard = 0;
    for (; grew && guard++ < 3; )
      grew = !1, [...out].forEach((a) => CONTR.forEach(([full, short]) => {
        let rf = new RegExp("(^|\\s)" + esc(full) + "(?=\\s|$)", "i"), rs = new RegExp("(^|\\s)" + esc(short) + "(?=\\s|$)", "i");
        [[rf, short], [rs, full]].forEach(([re, rep]) => {
          if (re.test(a)) {
            let v = a.replace(re, (m, sp) => sp + rep);
            out.has(v) || (out.add(v), grew = !0);
          }
        });
      }));
    return [...out];
  }
  var expandAll = (list) => [...new Set(list.flatMap(variants))];
  function meta(m) {
    let [id, sub, diff, level] = m.split(/\s+/);
    return { id, sub, diff: +diff || 2, level: level || "B2", v: 1 };
  }
  function tail(rest) {
    return rest.length && rest[rest.length - 1] && !Array.isArray(rest[rest.length - 1]) && typeof rest[rest.length - 1] == "object" ? rest.pop() : {};
  }
  function single(kind, m, prompt, rest) {
    let extra = tail(rest), options = rest.map(([t, why, tag], i) => i === 0 ? { t, ok: !0, why } : { t, why, tag: tag || "UNCLASSIFIED" });
    return Object.assign(__spreadProps(__spreadValues({}, meta(m)), { kind, type: "single", prompt, options, explain: options[0].why }), extra);
  }
  var S = (m, prompt, ...rest) => single("practice", m, prompt, rest), TS = (m, prompt, ...rest) => single("theory", m, prompt, rest);
  function multi(kind, m, prompt, rest) {
    let extra = tail(rest), options = rest.map(([t, ok, why, tag]) => ok ? { t, ok: !0, why } : { t, why, tag: tag || "UNCLASSIFIED" });
    return Object.assign(__spreadProps(__spreadValues({}, meta(m)), { kind, type: "multi", prompt, options, explain: extra.explain || options.filter((o) => o.ok).map((o) => o.why).join(" ") }), extra);
  }
  var M = (m, prompt, ...rest) => multi("practice", m, prompt, rest);
  var I2 = (m, prompt, accept, explain, tag, rules = [], extra = {}) => Object.assign(__spreadProps(__spreadValues({}, meta(m)), { kind: "practice", type: "input", prompt, accept: expandAll(accept), explain, tag: tag || "FORM", rules }), extra), MA = (m, prompt, cats, items, explain, tag = "MEANING", extra = {}) => Object.assign(__spreadProps(__spreadValues({}, meta(m)), { kind: "practice", type: "match", prompt, cats, items: items.map(([t, cat3, tg]) => ({ t, cat: cat3, tag: tg })), explain, tag }), extra), O = (m, prompt, tokens, explain, tag = "STRUCTURE", alts = [], extra = {}) => Object.assign(__spreadProps(__spreadValues({}, meta(m)), { kind: "practice", type: "order", prompt, tokens, alts, explain, tag }), extra), FX = (m, prompt, segments, explain, extra = {}) => Object.assign(__spreadProps(__spreadValues({}, meta(m)), {
    kind: "practice",
    type: "fix",
    prompt,
    explain,
    segments: segments.map((s) => typeof s == "string" ? { t: s } : { t: s.t, bad: !0, fix: expandAll(s.fix), tag: s.tag || "FORM", rules: s.rules || [] }),
    tag: (segments.find((s) => typeof s != "string") || {}).tag || "FORM"
  }), extra), p = (t) => ({ k: "p", t }), h = (t) => ({ k: "h", t }), f = (t) => ({ k: "f", t }), tip = (t) => ({ k: "tip", t }), warn = (t) => ({ k: "warn", t }), tb = (head, rows, note) => ({ k: "tb", head, rows, note }), ex = (...rows) => ({ k: "ex", rows }), tl = (marks, now = 50, caption = "") => ({ k: "tl", marks, now, caption }), L = (id, title, goal, body, checks) => ({ id, title, goal, body, checks });
  function block(def, lessons5, practice5) {
    let questions = [];
    return lessons5.forEach((l) => l.checks.forEach((q) => {
      q.module = def.id, q.sub = q.sub || l.id, q.lesson = l.id, q.goal = q.goal || l.goal, questions.push(q);
    })), practice5.forEach((q) => {
      q.module = def.id;
      let l = lessons5.find((x) => x.id === q.sub);
      q.lesson = l ? l.id : lessons5[0].id, q.goal = q.goal || (l ? l.goal : def.title), questions.push(q);
    }), lessons5.forEach((l) => {
      l.checkIds = l.checks.map((q) => q.id), delete l.checks;
    }), Object.assign({}, def, { lessons: lessons5, questions });
  }

  // src/content/blocks/b01-tenses.js
  var lessons = [
    L("ten-sys", "Система: время × аспект", "Видеть любую форму как пересечение времени (Present/Past/Future) и аспекта (Simple/Continuous/Perfect/Perfect Continuous).", [
      p("Английская форма глагола отвечает на **два независимых вопроса**. Первый — **где на линии времени** находится точка отсчёта: сейчас (Present), в прошлом (Past) или в будущем (Future). Второй — **как говорящий смотрит на действие** относительно этой точки: просто как на факт (Simple), как на процесс в развитии (Continuous), как на то, что произошло раньше точки отсчёта и связано с ней (Perfect), или как на процесс, длившийся до точки отсчёта (Perfect Continuous)."),
      tb(["", "Simple", "Continuous", "Perfect", "Perfect Continuous"], [
        ["Present", "I work", "I am working", "I have worked", "I have been working"],
        ["Past", "I worked", "I was working", "I had worked", "I had been working"],
        ["Future", "I will work", "I will be working", "I will have worked", "I will have been working"]
      ], "3 времени × 4 аспекта = 12 форм. Строки меняют точку отсчёта, столбцы — взгляд на действие."),
      h("Формулы аспектов"),
      f("Simple: V / V-s / V2 / will + V"),
      f("Continuous: be + V-ing"),
      f("Perfect: have + V3"),
      f("Perfect Continuous: have been + V-ing"),
      p("Время выражает **первый** вспомогательный глагол: am/is/are → was/were → will be; have/has → had → will have. Именно он меняется в вопросе и отрицании: _Have you been waiting?_ — _I hadn't finished._"),
      tip("Маркеры (yesterday, since, already) подсказывают, но не определяют форму механически: решает смысл. «Already» встречается и с Past Simple в американском английском: _Did you eat already?_"),
      ex(
        ["She works from home.", "Она работает из дома (обычно).", "Present Simple: факт/привычка"],
        ["She is working from home this week.", "На этой неделе она работает из дома.", "Present Continuous: временная ситуация"],
        ["She has worked from home since May.", "Она работает из дома с мая.", "Present Perfect: период до сейчас"],
        ["She has been working all morning — look how tired she is.", "Она работает всё утро — видно, как устала.", "Present Perfect Continuous: длительность + след"]
      )
    ], [
      TS(
        "ten-t01 ten-sys 1 B2",
        "Какой элемент формы «had been waiting» сообщает, что точка отсчёта находится в прошлом?",
        ["had", "Время выражает первый вспомогательный глагол: had (а не have/has) переносит точку отсчёта в прошлое."],
        ["been", "Been — часть аспекта Perfect Continuous, во всех временах он одинаковый (have been / had been / will have been).", "THEORY"],
        ["waiting", "-ing показывает аспект Continuous, а не время.", "THEORY"],
        ["Сочетание been + waiting", "Это аспектная часть; она не меняется от времени к времени.", "THEORY"],
        { ce: "Сравните: have been waiting / had been waiting / will have been waiting — меняется только первый вспомогательный." }
      ),
      TS(
        "ten-t02 ten-sys 2 B2",
        "Почему нельзя сказать, что Perfect всегда означает «действие завершено»?",
        ["Perfect связывает событие с более поздней точкой отсчёта; действие может продолжаться (I have lived here for ten years).", "Perfect — про предшествование и связь с точкой отсчёта; с for/since действие часто продолжается."],
        ["Потому что Perfect описывает только будущее.", "Perfect есть во всех трёх временах.", "THEORY"],
        ["Потому что Perfect всегда показывает процесс.", "Процесс — это Continuous; Perfect Simple часто описывает результат.", "THEORY"],
        ["Потому что Perfect используется только с for и since.", "For/since — частый, но не обязательный контекст (I have read it).", "THEORY"],
        { ce: "I have lived here for ten years — и живу до сих пор; действие не завершено." }
      ),
      TS(
        "ten-t03 ten-sys 2 B2",
        "Какой вспомогательный глагол появится в вопросе к «She works remotely»?",
        ["does — Present Simple в вопросе требует do/does, а основной глагол теряет -s", "В Simple нет «своего» вспомогательного в утверждении, поэтому в вопросе добавляется do/does/did."],
        ["is — потому что действие происходит сейчас", "Is нужен только для Continuous или для be как основного глагола.", "AUXILIARY"],
        ["has — потому что это факт о настоящем", "Has образует Perfect, а не Present Simple.", "AUXILIARY"],
        ["Никакой: Works she remotely?", "Инверсия основного глагола в современном английском невозможна (кроме be и модальных).", "AUXILIARY"],
        { ce: "Does she work remotely? — но Is she working remotely? (здесь уже есть be)." }
      )
    ]),
    L("ten-simple", "Simple: факт, привычка, последовательность", "Выбирать Simple для фактов, повторяющихся действий и цепочек завершённых событий.", [
      p("**Present Simple** описывает то, что верно вообще или регулярно: привычки, расписания, законы, постоянные состояния. **Past Simple** — завершённое событие в прошлом, которое мы видим целиком, обычно в известный момент. **Future Simple (will)** — прогноз, решение в момент речи, обещание, факт о будущем."),
      tb(["Форма", "Утверждение", "Вопрос", "Отрицание"], [
        ["Present Simple", "He reviews the code.", "Does he review the code?", "He doesn't review the code."],
        ["Past Simple", "He reviewed the code.", "Did he review the code?", "He didn't review the code."],
        ["Future Simple", "He'll review the code.", "Will he review the code?", "He won't review the code."]
      ]),
      p("Цепочка Past Simple передаёт **последовательность**: порядок упоминания совпадает с порядком событий. _She opened the report, checked the figures and called the client._"),
      tl([{ t: "opened", at: 15 }, { t: "checked", at: 30 }, { t: "called", at: 45 }], 80, "Past Simple: три завершённых события подряд, до «сейчас»."),
      ex(
        ["The train leaves at 7:40.", "Поезд отправляется в 7:40.", "расписание — Present Simple даже о будущем"],
        ["I lived in Kazan for two years.", "Я жил в Казани два года.", "период закончился — Past Simple"],
        ["I think it'll rain.", "Думаю, будет дождь.", "прогноз — will"],
        ["Water boils at 100°C.", "Вода кипит при 100°C.", "общий факт"]
      ),
      warn("После did/does основной глагол в начальной форме: _Did you see?_, не _Did you saw?_")
    ], [
      TS(
        "ten-t04 ten-simple 1 B2",
        "Почему в «The conference starts on Monday» используется Present Simple, хотя речь о будущем?",
        ["Это событие по официальному расписанию; Present Simple описывает фиксированный график.", "Расписания и программы — классическое употребление Present Simple с будущим значением."],
        ["Потому что в английском нет будущего времени.", "Will и другие формы будущего существуют; выбор здесь — про расписание.", "THEORY"],
        ["Потому что Monday — маркер Present Simple.", "Маркеры не определяют время механически: можно сказать и I'm meeting him on Monday.", "THEORY"],
        ["Это ошибка, нужно will start.", "Will start возможно, но не обязательно; Present Simple подчёркивает фиксированное расписание.", "THEORY"],
        { ce: "Но о личных планах: I'm flying to Paris on Monday (не «I fly», если это не расписание)." }
      ),
      TS(
        "ten-t05 ten-simple 2 B2",
        "Что сообщает Past Simple в «I worked at Yandex for three years»?",
        ["Период работы закончился и не связан с настоящим.", "Past Simple с for описывает закрытый период в прошлом."],
        ["Я всё ещё работаю там.", "Тогда нужен Present Perfect: I have worked there for three years.", "TIMELINE"],
        ["Я работал там регулярно, но с перерывами.", "Форма не сообщает о перерывах.", "MEANING"],
        ["Работа началась в прошлом и продолжится в будущем.", "Past Simple не продлевает действие в будущее.", "TIMELINE"],
        { ce: "I have worked at Yandex for three years — значит, работаю и сейчас." }
      ),
      TS(
        "ten-t06 ten-simple 2 B2",
        "Когда Future Simple (will) естественнее, чем be going to?",
        ["Для решения, принятого в момент речи: «The phone's ringing.» — «I'll get it.»", "Will передаёт спонтанное решение/предложение помощи; going to — намерение, существовавшее раньше."],
        ["Для плана, о котором договорились неделю назад.", "Для договорённостей типичен Present Continuous, для намерений — going to.", "MEANING"],
        ["Для прогноза на основе видимых признаков сейчас.", "Look at those clouds — it's going to rain: признаки налицо → going to.", "MEANING"],
        ["Для расписания поездов.", "Расписание — Present Simple.", "MEANING"],
        { ce: "Спонтанно: I'll call him. Заранее решено: I'm going to call him tonight." }
      )
    ]),
    L("ten-cont", "Continuous: процесс в точке и временность", "Использовать Continuous для процесса вокруг точки отсчёта, временных ситуаций и фона.", [
      p("Continuous показывает действие **изнутри**: в точке отсчёта оно уже началось и ещё не закончилось. Present Continuous — сейчас или в текущий период (_this week_), а также временные ситуации и изменения (_Prices are rising_). Past Continuous — процесс в прошлом, часто как **фон** для короткого события в Past Simple. Future Continuous — процесс в точке будущего или ожидаемое по ходу событий действие."),
      tl([{ t: "was writing the report", from: 15, to: 60 }, { t: "the power went off", at: 40 }], 85, "Past Continuous (фон) прерывается Past Simple (событие)."),
      ex(
        ["I was writing the report when the power went off.", "Я писал отчёт, когда отключили свет.", "фон + событие"],
        ["While she was presenting, the client was taking notes.", "Пока она выступала, клиент делал заметки.", "два параллельных процесса"],
        ["This time tomorrow I'll be flying to Berlin.", "Завтра в это время я буду лететь в Берлин.", "процесс в точке будущего"],
        ["He's always interrupting me!", "Он вечно меня перебивает!", "always + Continuous = раздражение"]
      ),
      tip("Present Continuous для будущего — **договорённость** с конкретным временем: _We're meeting the vendor at 3._"),
      warn("Порядок упоминания ≠ хронология: «When he arrived, we were having lunch» — обед начался раньше прихода.")
    ], [
      TS(
        "ten-t07 ten-cont 2 B2",
        "В чём разница: «When she arrived, we had lunch» и «When she arrived, we were having lunch»?",
        ["В первом обед начался после её прихода; во втором уже шёл в момент прихода.", "Past Simple + Past Simple = последовательность; Past Continuous = процесс, уже идущий в точке."],
        ["Разницы нет, обе формы описывают одно и то же.", "Аспект меняет хронологию событий.", "TIMELINE"],
        ["В первом обед закончился до её прихода.", "Для этого нужен Past Perfect: we had had lunch.", "TIMELINE"],
        ["Во втором обед начался после прихода и длился долго.", "Continuous не означает «начался после».", "TIMELINE"],
        { ce: "When she arrived, we had already had lunch — обед закончился ДО прихода." }
      ),
      TS(
        "ten-t08 ten-cont 2 C1",
        "Какую функцию выполняет Future Continuous в «Will you be using the car tonight?»",
        ["Вежливо спрашивает о планах, не звуча как просьба или давление.", "Future Continuous часто смягчает вопрос о планах: спрашиваем о ходе событий, а не о решении."],
        ["Сообщает, что действие точно завершится к вечеру.", "Завершение к точке — Future Perfect.", "MEANING"],
        ["Выражает спонтанное решение говорящего.", "Спонтанное решение — will + V.", "MEANING"],
        ["Описывает расписание.", "Расписание — Present Simple.", "MEANING"],
        { ce: "Will you use the car tonight? может звучать как запрос решения/разрешения." }
      ),
      TS(
        "ten-t09 ten-cont 1 B2",
        "Почему «I am living with my parents until I find a flat» звучит естественно?",
        ["Present Continuous подчёркивает временную ситуацию.", "Continuous описывает временные состояния; Simple (I live) звучал бы как постоянный факт."],
        ["Потому что live — стативный глагол и всегда в Continuous.", "Стативные глаголы обычно НЕ используются в Continuous; live к ним не относится.", "THEORY"],
        ["Потому что until требует Continuous.", "Until не управляет аспектом главной части.", "THEORY"],
        ["Потому что действие происходит ровно в момент речи.", "Continuous охватывает и текущий период, не только момент речи.", "THEORY"],
        { ce: "I live in Moscow — постоянный факт; I'm living in Moscow for now — временно." }
      )
    ]),
    L("ten-stative", "Стативные глаголы", "Различать состояния и действия и понимать, когда «стативный» глагол допускает Continuous.", [
      p("Стативные глаголы описывают **состояния**, у которых нет внутреннего развития: знание и мнение (_know, believe, understand, mean_), чувства (_like, love, hate, prefer, want_), обладание (_own, belong, possess_), восприятие и вид (_seem, appear, consist of, contain_). Обычно они не используются в Continuous: _I know the answer_, не _I'm knowing_."),
      p("Многие глаголы двойственны: в значении состояния — Simple, в значении действия — Continuous."),
      tb(["Глагол", "Состояние (Simple)", "Действие (Continuous)"], [
        ["think", "I think it's risky. (мнение)", "I'm thinking about it. (обдумываю)"],
        ["have", "She has two kids. (владение)", "She's having lunch. (ест)"],
        ["see", "I see what you mean. (понимаю)", "I'm seeing the doctor at 5. (встреча)"],
        ["taste", "The soup tastes salty. (свойство)", "He's tasting the soup. (пробует)"],
        ["be", "He is rude. (характер)", "He's being rude. (ведёт себя сейчас)"]
      ]),
      ex(
        ["I'm loving this weather!", "Обожаю эту погоду!", "разговорное усиление; в экзамене безопаснее Simple"],
        ["This box contains spare parts.", "В коробке запасные части.", "contain — состояние"],
        ["We've known each other since school.", "Мы знакомы со школы.", "know + since → Present Perfect, не Perfect Continuous"]
      ),
      warn("Со стативными глаголами для длительности до сейчас используйте Present Perfect Simple: _I've had this phone for years_.")
    ], [
      TS(
        "ten-t10 ten-stative 2 B2",
        "Почему верно «She is being difficult today», хотя be обычно стативный?",
        ["Здесь be описывает временное поведение (ведёт себя), а не постоянное качество.", "Be в Continuous = «ведёт себя так сейчас»; это действие, а не состояние."],
        ["Be никогда не бывает стативным.", "В обычном значении (He is tall) be — стативный.", "THEORY"],
        ["Потому что today требует Continuous.", "Маркер не решает; решает значение глагола.", "THEORY"],
        ["Это ошибка, нужно She is difficult today.", "Это изменило бы смысл: «у неё трудный характер».", "MEANING"],
        { ce: "She is difficult (характер) vs She is being difficult (поведение сейчас)." }
      ),
      TS(
        "ten-t11 ten-stative 1 B2",
        "Какой глагол здесь стативный: «I ___ what you mean»?",
        ["see — в значении «понимаю», поэтому Simple: I see", "See = understand описывает состояние понимания."],
        ["am seeing — Continuous возможен, потому что понимание происходит сейчас", "В значении «понимать» see не используется в Continuous.", "FORM"],
        ["have seen — потому что понимание связано с настоящим", "Perfect здесь меняет смысл на «видел».", "MEANING"],
        ["saw — потому что понимание уже произошло", "Past Simple сдвигает понимание в прошлое.", "TIMELINE"],
        { ce: "I'm seeing a client at 4 — see = встречаться, действие → Continuous возможен." }
      ),
      TS(
        "ten-t12 ten-stative 2 C1",
        "Почему «I've been knowing him for years» ошибочно?",
        ["Know — стативный глагол; для длительности используется Present Perfect Simple: I've known him for years.", "Perfect Continuous требует глагола-действия; know описывает состояние."],
        ["Нужен Past Simple: I knew him for years.", "Это значит «знал, но больше нет» — другой смысл.", "TIMELINE"],
        ["Ошибка только в предлоге for.", "For правильно передаёт длительность.", "PREPOSITION"],
        ["Нужно have been known.", "Это пассив — другая конструкция и другой смысл.", "FORM"],
        { ce: "I've been working with him for years — work — действие, Continuous возможен." }
      )
    ]),
    L("ten-pp", "Present Perfect vs Past Simple", "Выбирать между связью с настоящим (Present Perfect) и закрытым моментом прошлого (Past Simple).", [
      p("**Present Perfect** = событие в прошлом + **точка отсчёта сейчас**. Типичные смыслы: результат важен сейчас (_I've lost my keys_), опыт за жизнь (_Have you ever been to Japan?_), период, который ещё не закончился (_this week, so far, since 2020_), новость (_The CEO has resigned_)."),
      p("**Past Simple** = событие в закрытом прошлом; говорящий смотрит из прошлого момента. Если указано или подразумевается **конкретное завершённое время** (_yesterday, in 2019, last week, when I was a child_), в обычном утвердительном высказывании нужен Past Simple."),
      tb(["Контекст", "Present Perfect", "Past Simple"], [
        ["Период", "I've written three emails today. (день идёт)", "I wrote three emails yesterday."],
        ["Опыт", "She has visited Japan twice.", "She visited Japan in 2018."],
        ["Новость → детали", "The server has crashed.", "It crashed at 9:15 during the update."],
        ["Человек жив/неактивен", "He has written five novels. (пишет)", "Tolstoy wrote many novels."]
      ]),
      tl([{ t: "lost the keys", at: 30 }, { t: "результат: ключей нет", from: 30, to: 70 }], 70, "Present Perfect: событие раньше «сейчас», значим результат."),
      ex(
        ["Have you finished the report? — Yes, I finished it an hour ago.", "Ты закончил отчёт? — Да, закончил час назад.", "вопрос о результате → деталь о времени"],
        ["I've never worked with this tool.", "Я никогда не работал с этим инструментом.", "опыт"],
        ["We've had three outages this month.", "У нас было три сбоя в этом месяце.", "период не закрыт"],
        ["Shakespeare wrote 39 plays.", "Шекспир написал 39 пьес.", "автор не может добавить новые → Past Simple"]
      ),
      warn("Present Perfect не сочетается с точной завершённой датой: ~~I have seen him yesterday~~ → _I saw him yesterday_. Но _I have seen him today_ — день не закончился."),
      tip("Since требует Perfect в главной части, если период длится до сейчас; за since — точка начала: _since Monday, since I joined_.")
    ], [
      TS(
        "ten-t13 ten-pp 1 B2",
        "Почему «I have seen him yesterday» считается ошибкой?",
        ["Yesterday закрывает период в прошлом, а Present Perfect берёт точку отсчёта «сейчас».", "Точная завершённая дата прошлого в обычном утверждении несовместима с Present Perfect."],
        ["Потому что see — неправильный глагол.", "Неправильность глагола не влияет на выбор времени.", "THEORY"],
        ["Потому что Present Perfect используется только с ever/never.", "Он используется и в других контекстах (результат, период, новости).", "THEORY"],
        ["Потому что после have нужен V2.", "После have нужен V3 (seen) — форма здесь правильная.", "FORM"],
        { ce: "I have seen him today — «сегодня» ещё не закончилось, поэтому Present Perfect возможен." }
      ),
      TS(
        "ten-t14 ten-pp 2 B2",
        "Почему «Picasso painted many pictures», но «Our designer has painted many pictures»?",
        ["Пикассо умер — его «период» закрыт; дизайнер жив и может нарисовать ещё.", "Present Perfect опыта требует, чтобы период (жизнь, карьера) был открыт."],
        ["Потому что Пикассо — известный художник.", "Известность не влияет на время.", "THEORY"],
        ["Потому что many требует Past Simple.", "Many сочетается с любыми временами.", "THEORY"],
        ["Оба варианта взаимозаменяемы.", "Смысл различается: открыт ли период.", "MEANING"],
        { ce: "Picasso has painted... звучало бы так, будто он ещё может продолжать." }
      ),
      TS(
        "ten-t15 ten-pp 3 C1",
        "В каком случае возможны ОБА варианта: «I've lost / I lost my wallet»?",
        ["В обоих, но смысл разный: lost — история в прошлом, 've lost — сейчас кошелька нет.", "Выбор зависит от того, что важнее говорящему; в американском английском Past Simple чаще и для результата."],
        ["Только Past Simple — потеря уже произошла.", "Present Perfect подчёркивает актуальный результат и тоже верен.", "THEORY"],
        ["Только Present Perfect — потому что результат важен.", "Past Simple тоже грамматичен, особенно в AmE или в рассказе.", "THEORY"],
        ["Ни один: нужен Past Perfect.", "Past Perfect требует второй точки в прошлом.", "TIMELINE"],
        { ce: "I lost my wallet last Friday — но потом нашёл: Present Perfect здесь неуместен." }
      )
    ]),
    L("ten-ppc", "Present Perfect Continuous", "Отличать длительность процесса (PPC) от результата/количества (PP).", [
      p("**Present Perfect Continuous** (have/has been + V-ing) смотрит на **процесс**, который длился до сейчас: он мог только что закончиться (видны следы) или продолжаться. Вопрос «как долго?» — PPC; вопрос «сколько/что сделано?» — Present Perfect Simple."),
      tb(["Акцент", "Пример"], [
        ["Длительность", "I've been reading this report for two hours."],
        ["Результат/количество", "I've read 40 pages. / I've read the report."],
        ["Видимые следы", "Your eyes are red — have you been crying?"],
        ["Временность", "I've been staying with friends (временно)."]
      ]),
      tl([{ t: "been working", from: 20, to: 70 }], 70, "PPC: процесс от точки в прошлом до «сейчас»."),
      ex(
        ["We've been testing the new build since Monday.", "Мы тестируем новую сборку с понедельника.", "процесс продолжается"],
        ["We've tested twelve scenarios.", "Мы протестировали двенадцать сценариев.", "количество → PP Simple"],
        ["It's been raining — the streets are wet.", "Шёл дождь — улицы мокрые.", "след процесса"],
        ["How long have you been learning English?", "Как долго ты учишь английский?", "how long → PPC"]
      ),
      warn("Со стативными глаголами — только PP Simple: _I've had this laptop for three years._")
    ], [
      TS(
        "ten-t16 ten-ppc 2 B2",
        "Почему «I've been writing three emails» звучит неестественно?",
        ["Количество выполненного (three) требует результата — Present Perfect Simple: I've written three emails.", "PPC фокусируется на длительности процесса, а не на числе завершённых единиц."],
        ["Write не используется в Continuous.", "Write — глагол-действие, Continuous возможен (I've been writing emails all morning).", "THEORY"],
        ["Нужно Past Simple: I wrote three emails.", "Это меняет смысл: период закрыт.", "TIMELINE"],
        ["Ошибка в been — нужно being.", "Being не используется в Perfect Continuous.", "FORM"],
        { ce: "I've been writing emails all morning — длительность, число не указано." }
      ),
      TS(
        "ten-t17 ten-ppc 2 B2",
        "Что сообщает «You've been painting!», сказанное человеку в краске?",
        ["Процесс недавно шёл; видимый след говорит о нём сейчас.", "PPC используется, когда видны последствия недавнего процесса."],
        ["Покраска закончена полностью.", "Акцент на завершённости требует PP Simple: You've painted the room.", "MEANING"],
        ["Покраска будет продолжаться завтра.", "Форма ничего не сообщает о будущем.", "TIMELINE"],
        ["Человек красит регулярно.", "Регулярность — Present Simple.", "MEANING"],
        { ce: "You've painted the room — комната готова (результат)." }
      ),
      TS(
        "ten-t18 ten-ppc 3 C1",
        "Когда «I've lived here for five years» и «I've been living here for five years» почти синонимичны?",
        ["С глаголами длительных состояний/занятий (live, work, study) + for/since; Continuous может добавлять оттенок временности.", "С live/work + for/since разница минимальна; Continuous иногда подчёркивает временность."],
        ["Никогда: одна из форм всегда ошибочна.", "Обе грамматичны с live/work.", "THEORY"],
        ["Только если речь об опыте (ever).", "Ever-опыт — PP Simple: Have you ever lived abroad?", "THEORY"],
        ["Только в пассиве.", "Пассив не связан с этим выбором.", "THEORY"],
        { ce: "I've read the book for two hours — неестественно: read с результатом требует PPC или другого смысла." }
      )
    ]),
    L("ten-pastperf", "Past Perfect и Past Perfect Continuous", "Использовать Past Perfect для предшествования в прошлом — и не ставить его там, где порядок и так ясен.", [
      p("**Past Perfect** (had + V3) — это «Present Perfect, сдвинутый в прошлое»: нужна **точка отсчёта в прошлом**, и событие произошло раньше неё. **Past Perfect Continuous** (had been + V-ing) — процесс, длившийся до точки в прошлом."),
      tl([{ t: "had left", at: 25 }, { t: "we arrived", at: 55 }], 85, "Past Perfect: событие (had left) раньше точки в прошлом (arrived)."),
      ex(
        ["When we arrived, the train had left.", "Когда мы пришли, поезд уже ушёл.", "ушёл ДО прихода"],
        ["When we arrived, the train left.", "Когда мы пришли, поезд ушёл.", "ушёл ПОСЛЕ/в момент прихода"],
        ["She had been working there for ten years when the company closed.", "Она проработала там десять лет, когда компанию закрыли.", "PPC: длительность до точки"],
        ["After she left, I called him.", "После того как она ушла, я ему позвонил.", "after уже задаёт порядок — Past Perfect не обязателен"]
      ),
      tip("Если порядок ясен из after/before или из последовательности рассказа, Past Simple достаточен. Past Perfect нужен, когда без него порядок неясен или когда мы «отматываем» назад."),
      warn("Past Perfect не означает «давно»: _I had eaten five minutes before she called_ — короткий интервал.")
    ], [
      TS(
        "ten-t19 ten-pastperf 2 B2",
        "Чем отличаются «When I got home, Anna cooked dinner» и «When I got home, Anna had cooked dinner»?",
        ["В первом Анна готовила после моего прихода, во втором ужин был готов к моему приходу.", "Past Perfect переносит готовку раньше точки «got home»."],
        ["Ничем — Past Perfect лишь звучит формальнее.", "Форма меняет хронологию.", "TIMELINE"],
        ["Во втором Анна готовила в момент моего прихода.", "Процесс в момент — Past Continuous: was cooking.", "TIMELINE"],
        ["В первом ужин был готов заранее.", "Past Simple + when → последовательность: сначала пришёл, потом готовила.", "TIMELINE"],
        { ce: "When I got home, Anna was cooking dinner — процесс уже шёл." }
      ),
      TS(
        "ten-t20 ten-pastperf 2 C1",
        "Почему в «After the meeting ended, we went for lunch» Past Perfect не обязателен?",
        ["After уже показывает порядок событий; Past Perfect здесь возможен, но избыточен.", "Когда союз или контекст делает хронологию ясной, достаточно Past Simple."],
        ["Потому что Past Perfect нельзя использовать с after.", "Можно: After the meeting had ended... — грамматично.", "THEORY"],
        ["Потому что end — стативный глагол.", "End — событие, не состояние.", "THEORY"],
        ["Потому что ланч был раньше встречи.", "After показывает обратное.", "TIMELINE"],
        { ce: "I realised I had left my laptop at home — без Past Perfect порядок «оставил → понял» был бы неясен." }
      ),
      TS(
        "ten-t21 ten-pastperf 2 B2",
        "Какую информацию добавляет Past Perfect Continuous в «Her eyes were red. She had been crying.»?",
        ["Процесс длился до точки в прошлом и объясняет видимое состояние в тот момент.", "PPC = Present Perfect Continuous, сдвинутый в прошлое: след процесса в прошлой точке."],
        ["Она плакала после того, как я её увидел.", "Had been + V-ing ставит процесс ДО точки.", "TIMELINE"],
        ["Она плачет регулярно.", "Регулярность здесь не выражена.", "MEANING"],
        ["Плач продолжается сейчас.", "Точка отсчёта — прошлое, не «сейчас».", "TIMELINE"],
        { ce: "Her eyes are red. She has been crying. — то же, но точка отсчёта «сейчас»." }
      )
    ]),
    L("ten-future", "Будущее: will, going to, Continuous, Simple", "Выбирать форму будущего по источнику уверенности: решение, намерение, договорённость, расписание, прогноз.", [
      p("В английском нет одной «формы будущего»: выбор зависит от того, **на чём основано** высказывание."),
      tb(["Форма", "Основание", "Пример"], [
        ["will + V", "решение сейчас, обещание, прогноз-мнение", "I'll send it right away. I think prices will fall."],
        ["be going to + V", "намерение заранее; прогноз по признакам", "I'm going to apply. Look — it's going to fall!"],
        ["Present Continuous", "договорённость с людьми/временем", "We're meeting the auditors on Friday."],
        ["Present Simple", "расписание, программа", "The webinar starts at 10."],
        ["will be + V-ing", "процесс в точке будущего; «по ходу событий»", "At noon I'll be presenting."],
        ["will have + V3", "завершится к точке будущего", "By Friday we'll have migrated the data."],
        ["will have been + V-ing", "длительность к точке будущего", "By June I'll have been working here for a year."]
      ]),
      tl([{ t: "will have migrated", at: 40 }, { t: "by Friday", at: 70 }], 20, "Future Perfect: действие завершится раньше точки в будущем."),
      ex(
        ["I'm going to quit, I've decided.", "Я уйду, я решил.", "намерение"],
        ["Don't worry, I'll help you.", "Не волнуйся, я помогу.", "обещание/решение"],
        ["By the time you read this, I'll have left.", "Когда ты это прочтёшь, я уже уеду.", "Future Perfect"],
        ["Shall I open the window?", "Мне открыть окно?", "shall — предложение (BrE)"]
      )
    ], [
      TS(
        "ten-t22 ten-future 2 B2",
        "Что точнее объясняет выбор: «Look at the queue — we're going to miss the train»?",
        ["Прогноз основан на признаках, видимых сейчас.", "Going to для прогноза по текущим признакам."],
        ["Это спонтанное решение пропустить поезд.", "Никто не решает опоздать; это прогноз.", "MEANING"],
        ["Это расписание поезда.", "Расписание описывают Present Simple.", "MEANING"],
        ["Will здесь невозможен грамматически.", "We'll miss the train грамматичен, но без акцента на видимые признаки.", "THEORY"],
        { ce: "I think we'll miss the train — мнение без опоры на видимые признаки." }
      ),
      TS(
        "ten-t23 ten-future 2 C1",
        "Чем «By 2030 the city will have built a new airport» отличается от «In 2030 the city will build a new airport»?",
        ["Future Perfect: строительство завершится до 2030; Future Simple: строительство относится к 2030 году.", "Future Perfect ставит завершение раньше точки отсчёта в будущем."],
        ["Ничем, by и in взаимозаменяемы.", "By = «не позже чем», in = «в течение/в».", "PREPOSITION"],
        ["Первый вариант означает, что аэропорт строится сейчас.", "Сейчас — Present Continuous.", "TIMELINE"],
        ["Второй вариант означает завершение до 2030.", "Это смысл первого.", "TIMELINE"],
        { ce: "By 2030 they will be building — строительство будет идти в 2030, не закончится." }
      ),
      TS(
        "ten-t24 ten-future 2 B2",
        "Когда Present Continuous для будущего звучит странно?",
        ["Когда нет личной договорённости/плана: ~~It's raining tomorrow~~ — погоду не «договаривают».", "Present Continuous для будущего требует организованного плана."],
        ["Всегда — Present Continuous не выражает будущее.", "We're meeting at 5 — нормальное будущее.", "THEORY"],
        ["Когда указано точное время.", "Точное время, наоборот, типично для договорённостей.", "THEORY"],
        ["Когда подлежащее — I.", "I'm flying tomorrow — естественно.", "THEORY"],
        { ce: "It's going to rain tomorrow / It will rain tomorrow — прогноз." }
      )
    ]),
    L("ten-timecl", "Времена в придаточных времени и условия", "Не ставить will после when/as soon as/until/before/after/if в значении будущего.", [
      p("В придаточных **времени и условия** (when, as soon as, until, before, after, once, by the time, if, unless) будущее выражается **настоящим**: Present Simple для события, Present Perfect для завершённости к моменту."),
      ex(
        ["I'll call you when I arrive.", "Я позвоню, когда приеду.", "не «when I will arrive»"],
        ["We'll start as soon as everyone has joined.", "Начнём, как только все подключатся.", "Present Perfect: завершённость"],
        ["Don't leave until I tell you.", "Не уходи, пока я не скажу.", "until + Present Simple"],
        ["By the time we get there, the shop will have closed.", "Когда мы доберёмся, магазин уже закроется.", "главная часть — Future Perfect"]
      ),
      warn("Если when начинает **дополнительное** придаточное (что? — когда), will возможен: _I don't know when he will arrive._ Здесь when-часть — объект знания, а не условие времени."),
      tip("If + will возможно в значении готовности/вежливой просьбы: _If you'll wait a moment, I'll check._")
    ], [
      TS(
        "ten-t25 ten-timecl 1 B2",
        "Почему верно «I'll tell her when she comes back», а не «when she will come back»?",
        ["В придаточном времени будущее выражается Present Simple.", "When вводит придаточное времени; там будущее передаёт настоящее время."],
        ["Потому что when всегда требует Present Simple.", "В дополнительном придаточном (I wonder when she will come) will возможен.", "THEORY"],
        ["Потому что come — неправильный глагол.", "Это не влияет на выбор.", "THEORY"],
        ["Потому что will нельзя использовать дважды в предложении.", "Ограничение связано с типом придаточного, а не с повтором will.", "THEORY"],
        { ce: "I don't know when she will come back — придаточное отвечает на «что не знаю?», will допустим." }
      ),
      TS(
        "ten-t26 ten-timecl 2 C1",
        "Какой вариант правильно передаёт «как только отчёт будет готов (завершён)»?",
        ["as soon as the report has been finished", "Present Perfect в придаточном времени подчёркивает завершённость к моменту."],
        ["as soon as the report will be finished", "Will в придаточном времени не используется.", "FORM"],
        ["as soon as the report will have been finished", "Future Perfect в придаточном времени тоже недопустим.", "FORM"],
        ["as soon as the report had been finished", "Past Perfect переносит в прошлое.", "TIMELINE"],
        { ce: "as soon as the report is finished — тоже верно; Perfect лишь подчёркивает завершённость." }
      ),
      TS(
        "ten-t27 ten-timecl 2 C1",
        "В каком предложении will после if корректен?",
        ["If you'll take a seat, the doctor will see you shortly.", "Здесь if + will = вежливая просьба/готовность, а не условие будущего."],
        ["If it will rain, we'll cancel.", "Обычное условие будущего: If it rains.", "FORM"],
        ["If you will finish early, call me.", "Нужно: If you finish early.", "FORM"],
        ["If the price will drop, we'll buy.", "Нужно: If the price drops.", "FORM"],
        { ce: "If you take a seat... — тоже нормально, но менее вежливо-формально." }
      )
    ]),
    L("ten-mix", "Сочетания времён, пассив, backshift и ошибки", "Комбинировать формы в одном тексте, строить пассив в любом времени и избегать типичных ошибок.", [
      p("В реальном тексте формы сочетаются по логике точек отсчёта: _I **have been working** on this since Monday, but I **didn't finish** the draft yesterday because the data **had been corrupted**._ Каждая форма отвечает на вопрос «откуда смотрим?»."),
      h("Пассив по временам: be в нужной форме + V3"),
      tb(["Форма", "Актив", "Пассив"], [
        ["Present Simple", "They check the logs.", "The logs are checked."],
        ["Present Continuous", "They are checking the logs.", "The logs are being checked."],
        ["Present Perfect", "They have checked the logs.", "The logs have been checked."],
        ["Past Simple", "They checked the logs.", "The logs were checked."],
        ["Past Perfect", "They had checked the logs.", "The logs had been checked."],
        ["Future", "They will check the logs.", "The logs will be checked."]
      ], "Perfect Continuous в пассиве (has been being checked) практически не используется."),
      h("Backshift в косвенной речи (кратко)"),
      tb(["Прямая речь", "Косвенная после said"], [
        ["am/is working", "was working"],
        ["worked / have worked", "had worked"],
        ["will finish", "would finish"]
      ], "Если сказанное остаётся верным, сдвиг не обязателен: He said the office is closed on Sundays."),
      ex(
        ["The bridge is being repaired, so we took a detour.", "Мост ремонтируют, поэтому мы поехали в объезд.", "пассив Continuous"],
        ["She told me she had already sent it.", "Она сказала, что уже отправила это.", "backshift"]
      ),
      h("Частые ошибки"),
      tb(["Ошибка", "Верно", "Причина"], [
        ["I am agree.", "I agree.", "agree — глагол, be не нужен"],
        ["Did you saw it?", "Did you see it?", "после did — V1"],
        ["I live here since 2020.", "I have lived here since 2020.", "период до сейчас"],
        ["When I will finish, I'll call.", "When I finish, I'll call.", "придаточное времени"],
        ["He don't know.", "He doesn't know.", "согласование 3-го лица"]
      ])
    ], [
      TS(
        "ten-t28 ten-mix 2 B2",
        "Какая форма пассива соответствует «They are interviewing the candidates now»?",
        ["The candidates are being interviewed now.", "Present Continuous Passive: am/is/are + being + V3."],
        ["The candidates are interviewed now.", "Present Simple Passive теряет значение процесса сейчас.", "FORM"],
        ["The candidates have been interviewed now.", "Это Present Perfect Passive — результат, а не процесс.", "FORM"],
        ["The candidates were being interviewed now.", "Was/were переносят в прошлое и не сочетаются с now.", "TIMELINE"],
        { ce: "The candidates have been interviewed — собеседования уже завершены." }
      ),
      TS(
        "ten-t29 ten-mix 3 C1",
        "Почему в «He said the Earth goes round the Sun» нет backshift (went)?",
        ["Сказанное — общая истина, верная и сейчас; сдвиг не обязателен.", "Backshift не механический: если факт по-прежнему верен, настоящее сохраняется."],
        ["Потому что goes — неправильный глагол.", "Неправильность не влияет на backshift.", "THEORY"],
        ["Потому что после said никогда нет сдвига.", "Обычно сдвиг есть: He said he was tired.", "THEORY"],
        ["Это ошибка, нужно went.", "Went тоже возможно, но present подчёркивает, что факт верен всегда.", "THEORY"],
        { ce: "He said he was busy — состояние того момента, backshift естественен." }
      ),
      TS(
        "ten-t30 ten-mix 2 B2",
        "Почему «I am agree with you» — ошибка?",
        ["Agree — полноценный глагол; be перед ним не нужен: I agree.", "Конструкция «be + глагол в начальной форме» невозможна."],
        ["Нужно I am agreeing.", "Agree — стативный в этом значении; Continuous неуместен.", "FORM"],
        ["Нужно I agreed.", "Это прошедшее время — меняет смысл.", "TIMELINE"],
        ["Ошибка в предлоге with.", "Agree with someone — верное управление.", "PREPOSITION"],
        { ce: "I am in agreement with you — be возможен, если дальше существительное (формально)." }
      )
    ])
  ], practice = [
    // --- system / auxiliaries / questions ---
    I2(
      "ten-001 ten-sys 1 B2",
      "Have you ever ___ (work) with a remote team?",
      ["worked"],
      "После have в Present Perfect нужен V3: worked.",
      "FORM",
      [[["work"], "FORM", "После have нужен V3, а не начальная форма."], [["working"], "FORM", "Have + V-ing не образует Perfect; нужен V3."], [["been working"], "MEANING", "Для вопроса об опыте с ever нужен Present Perfect Simple."]]
    ),
    S(
      "ten-002 ten-sys 1 B2",
      "___ the new version include the export feature?",
      ["Does", "Present Simple, подлежащее в 3-м лице ед. ч. (the new version) → Does + V1."],
      ["Is", "Is нужен для Continuous или be-сказуемого; include — смысловой глагол.", "AUXILIARY"],
      ["Do", "Do — для I/you/we/they; version — 3-е лицо ед. ч.", "AGREEMENT"],
      ["Has", "Has образует Perfect, тогда нужен V3 (included).", "AUXILIARY"]
    ),
    S(
      "ten-003 ten-sys 2 B2",
      "Choose the correct negative: «The client ___ the contract yet.»",
      ["hasn't signed", "Yet в отрицании → Present Perfect: hasn't + V3."],
      ["didn't signed", "После did — V1; кроме того, yet сочетается с Perfect.", "FORM"],
      ["doesn't signed", "После doesn't — V1, и смысл «пока не» требует Perfect.", "FORM"],
      ["hasn't sign", "После has нужен V3: signed.", "FORM"]
    ),
    O(
      "ten-004 ten-sys 2 B2",
      "Постройте вопрос: «Как долго вы ждали (до сих пор)?»",
      ["How", "long", "have", "you", "been", "waiting", "?"],
      "Wh-слово + вспомогательный (have) + подлежащее + been + V-ing.",
      "STRUCTURE"
    ),
    O(
      "ten-005 ten-sys 2 B2",
      "Постройте вопрос: «Что вы делали, когда позвонил клиент?»",
      ["What", "were", "you", "doing", "when", "the", "client", "called", "?"],
      "Past Continuous в вопросе: What + were + you + doing; придаточное when + Past Simple.",
      "STRUCTURE"
    ),
    FX(
      "ten-006 ten-sys 1 B2",
      "Найдите ошибку и исправьте её.",
      ["Did", "you", { t: "sent", fix: ["send"], tag: "FORM", rules: [[["sended"], "FORM", "Send — неправильный глагол; после did всё равно V1."]] }, "the invoice", "to the client?"],
      "После did основной глагол стоит в начальной форме: Did you send...?"
    ),
    S(
      "ten-007 ten-sys 2 C1",
      "Which question is grammatically correct?",
      ["Who called you this morning?", "Вопрос к подлежащему (who) не требует did: Who called...?"],
      ["Who did call you this morning?", "Did с who-подлежащим используется только для эмфазы; в нейтральном вопросе — ошибка.", "AUXILIARY"],
      ["Who did called you this morning?", "Двойное прошедшее (did + V2) невозможно.", "FORM"],
      ["Who has called you this morning yesterday?", "This morning + yesterday противоречат друг другу.", "TIMELINE"]
    ),
    // --- simple ---
    S(
      "ten-008 ten-simple 1 B2",
      "Our team ___ a stand-up meeting every morning at 9:30.",
      ["has", "Регулярное действие → Present Simple; team (ед. ч.) → has."],
      ["is having", "Continuous не подходит для регулярного расписания.", "MEANING"],
      ["having", "Нужна личная форма глагола: has.", "FORM"],
      ["had", "Every morning и контекст настоящего → не Past Simple.", "TIMELINE"]
    ),
    S(
      "ten-009 ten-simple 1 B2",
      "In 2019 she ___ to Berlin and started her own agency.",
      ["moved", "Конкретный завершённый момент (in 2019) + цепочка событий → Past Simple."],
      ["has moved", "Present Perfect несовместим с точной датой прошлого.", "TIMELINE"],
      ["had moved", "Нет второй точки в прошлом, раньше которой был переезд.", "TIMELINE"],
      ["was moving", "Переезд здесь — завершённое событие в цепочке, а не фон.", "MEANING"]
    ),
    I2(
      "ten-010 ten-simple 1 B2",
      "Water ___ (freeze) at 0°C.",
      ["freezes"],
      "Общий научный факт → Present Simple, 3-е лицо: freezes.",
      "FORM",
      [[["is freezing"], "MEANING", "Continuous описывает процесс сейчас, а не общий закон."], [["freeze"], "AGREEMENT", "Water — 3-е лицо ед. ч.: freezes."], [["froze"], "TIMELINE", "Закон природы верен всегда — Present Simple."]]
    ),
    S(
      "ten-011 ten-simple 2 B2",
      "«What time does the webinar start?» — «It ___ at 10, according to the programme.»",
      ["starts", "Официальная программа/расписание → Present Simple."],
      ["started", "Прошедшее время не отвечает на вопрос о предстоящем вебинаре.", "TIMELINE"],
      ["is going to start", "Going to описывает намерение/прогноз, а не расписание.", "MEANING"],
      ["has started", "Present Perfect сообщает, что уже началось.", "TIMELINE"]
    ),
    I2(
      "ten-012 ten-simple 2 B2",
      "She ___ (not / reply) to my email yesterday, so I called her.",
      ["didn't reply", "did not reply"],
      "Yesterday → Past Simple; отрицание: didn't + V1.",
      "AUXILIARY",
      [[["hasn't replied", "has not replied"], "TIMELINE", "Yesterday — закрытое время, Present Perfect невозможен."], [["didn't replied"], "FORM", "После didn't — V1: reply."], [["not replied"], "AUXILIARY", "Нужен вспомогательный did."]]
    ),
    S(
      "ten-013 ten-simple 2 B2",
      "«It's cold in here.» — «OK, I ___ the window.»",
      ["'ll close", "Решение в момент речи → will."],
      ["'m going to close", "Going to — намерение, принятое заранее; здесь решение спонтанное.", "MEANING"],
      ["close", "Present Simple не выражает спонтанное решение.", "FORM"],
      ["'m closing", "Present Continuous для будущего — договорённость, а не реакция.", "MEANING"]
    ),
    S(
      "ten-014 ten-simple 2 C1",
      "Choose the sentence where Past Simple is NOT appropriate.",
      ["I lost my phone, so I can't call you right now.", "Результат важен сейчас: в BrE стандартно I've lost my phone. В AmE Past Simple здесь допустим — поэтому вопрос задан про британскую норму."],
      ["I lost my phone last week, but found it the next day.", "Закрытая история с точным временем — Past Simple обязателен.", "TIMELINE"],
      ["When I was a student, I lost my phone twice.", "Период закрыт (when I was a student) — Past Simple верен.", "TIMELINE"],
      ["I lost my phone at the airport in March.", "Точное время в прошлом — Past Simple.", "TIMELINE"],
      { prompt: "В каком контексте Past Simple наименее уместен в британском английском?" }
    ),
    S(
      "ten-015 ten-simple 1 B2",
      "He usually ___ to work, but today he's driving because of the rain.",
      ["cycles", "Usually → привычка → Present Simple; контраст с временным today + Continuous."],
      ["is cycling", "Continuous — для временной ситуации; usually требует Simple.", "MEANING"],
      ["cycled", "Контекст — настоящее.", "TIMELINE"],
      ["has cycled", "Present Perfect не описывает привычку.", "MEANING"]
    ),
    // --- continuous ---
    S(
      "ten-016 ten-cont 1 B2",
      "I ___ the slides when my laptop suddenly crashed.",
      ["was finishing", "Процесс-фон в прошлом (Past Continuous) прерван событием (Past Simple)."],
      ["am finishing", "Главное событие в прошлом (crashed) — настоящее время не согласуется.", "TIMELINE"],
      ["finish", "Нужна форма прошедшего процесса.", "FORM"],
      ["have been finishing", "Present Perfect Continuous не сочетается с прошлым событием crashed.", "TIMELINE"]
    ),
    I2(
      "ten-017 ten-cont 1 B2",
      "Look! The price ___ (go) up again right now.",
      ["is going"],
      "Look! + right now → процесс в момент речи → Present Continuous.",
      "FORM",
      [[["goes"], "MEANING", "Present Simple описывает регулярность, а не процесс сейчас."], [["going"], "AUXILIARY", "Нужен be: is going."], [["is go"], "FORM", "После is — V-ing."]]
    ),
    S(
      "ten-018 ten-cont 2 B2",
      "While I ___ the data, my colleague was preparing the summary.",
      ["was analysing", "While + два параллельных процесса в прошлом → Past Continuous в обеих частях."],
      ["analyse", "Нужна форма прошедшего процесса.", "FORM"],
      ["am analysing", "Главная часть в прошлом — нужна согласованность.", "TIMELINE"],
      ["had analysed", "Past Perfect поставил бы анализ раньше, а не одновременно.", "TIMELINE"],
      { note: "Написание analyzing (AmE) равноценно." }
    ),
    S(
      "ten-019 ten-cont 2 B2",
      "This time next week we ___ on a beach in Portugal.",
      ["will be lying", "Процесс в определённой точке будущего → Future Continuous."],
      ["will lie", "Will + V не передаёт процесс «в этот момент».", "MEANING"],
      ["will have lain", "Future Perfect = завершится к точке; лежать на пляже не «завершается».", "TIMELINE"],
      ["are lying", "Present Continuous — договорённость, а не процесс в будущей точке.", "MEANING"]
    ),
    S(
      "ten-020 ten-cont 2 C1",
      "She's always ___ meetings at the last minute — it's so frustrating!",
      ["cancelling", "Always + Continuous выражает раздражение повторяющимся поведением."],
      ["cancel", "После 's (is) нужен V-ing.", "FORM"],
      ["cancelled", "She's always cancelled — Present Perfect, смысл «всегда отменяла» без оттенка раздражения.", "MEANING"],
      ["to cancel", "Is + to-infinitive здесь не образует нужного смысла.", "STRUCTURE"]
    ),
    FX(
      "ten-021 ten-cont 2 B2",
      "Найдите ошибку.",
      ["When I", { t: "was arriving", fix: ["arrived"], tag: "MEANING" }, "at the office,", "everyone was already sitting", "in the meeting room."],
      "Приход — короткое событие; Past Simple: When I arrived... Процесс-фон — were sitting."
    ),
    S(
      "ten-022 ten-cont 1 B2",
      "«Where's Tom?» — «He ___ a call in the other room.»",
      ["is taking", "Действие сейчас, в момент речи → Present Continuous."],
      ["takes", "Present Simple = обычно.", "MEANING"],
      ["has taken", "Present Perfect = звонок уже принят/завершён.", "TIMELINE"],
      ["took", "Прошедшее не отвечает на вопрос «где он сейчас».", "TIMELINE"]
    ),
    S(
      "ten-023 ten-cont 2 C1",
      "Which sentence describes a temporary situation?",
      ["I'm working from the Lisbon office this month.", "Present Continuous + this month = временная ситуация."],
      ["I work from the Lisbon office.", "Simple — постоянный факт.", "MEANING"],
      ["I've worked from the Lisbon office.", "Опыт/результат, а не временность.", "MEANING"],
      ["I worked from the Lisbon office.", "Закрытое прошлое.", "TIMELINE"]
    ),
    // --- stative ---
    S(
      "ten-024 ten-stative 1 B2",
      "I ___ your point, but I still think we need more data.",
      ["understand", "Understand — стативный глагол (знание), Continuous не используется."],
      ["am understanding", "Стативный глагол в Continuous звучит неправильно.", "FORM"],
      ["understood", "Контекст — настоящее (still think).", "TIMELINE"],
      ["am understand", "Be + начальная форма — несуществующая конструкция.", "FORM"]
    ),
    S(
      "ten-025 ten-stative 2 B2",
      "We ___ about moving the launch to May — nothing's decided yet.",
      ["are thinking", "Think = обдумывать (процесс) → Continuous возможен."],
      ["think", "Think в Simple = «считаем/мнение»; здесь процесс обдумывания.", "MEANING"],
      ["have thought", "Present Perfect = обдумали (результат), но nothing's decided показывает процесс.", "MEANING"],
      ["thought", "Прошедшее не согласуется с nothing's decided yet.", "TIMELINE"]
    ),
    S(
      "ten-026 ten-stative 2 B2",
      "This software ___ to the marketing department.",
      ["belongs", "Belong — стативный глагол обладания → Present Simple."],
      ["is belonging", "Стативный глагол в Continuous.", "FORM"],
      ["has belonged", "Без указания периода Perfect здесь неестественен.", "MEANING"],
      ["belong", "Software — 3-е лицо ед. ч.: belongs.", "AGREEMENT"]
    ),
    I2(
      "ten-027 ten-stative 2 B2",
      "I ___ (have) this laptop for five years and it still works fine.",
      ["have had"],
      "Период до сейчас + стативное have (владение) → Present Perfect Simple: have had.",
      "FORM",
      [[["have been having"], "FORM", "Have в значении «владеть» стативный — без Continuous."], [["had"], "TIMELINE", "Past Simple означал бы, что ноутбука больше нет."], [["have"], "TIMELINE", "Present Simple не сочетается с for five years (длительность до сейчас)."]]
    ),
    S(
      "ten-028 ten-stative 2 C1",
      "The soup ___ too salty. Who made it?",
      ["tastes", "Taste = иметь вкус (свойство) → стативное, Simple."],
      ["is tasting", "Continuous возможен только в значении «пробовать» (He is tasting the soup).", "MEANING"],
      ["has tasted", "Perfect меняет смысл.", "MEANING"],
      ["tasted", "Вопрос в настоящем показывает, что суп сейчас перед нами.", "TIMELINE"]
    ),
    S(
      "ten-029 ten-stative 2 B2",
      "«What are you doing?» — «I ___ lunch with a client.»",
      ["'m having", "Have = есть/обедать (действие) → Continuous возможен."],
      ["have", "Present Simple = обычно; вопрос про сейчас.", "MEANING"],
      ["'ve had", "Present Perfect = уже пообедал.", "TIMELINE"],
      ["had", "Прошедшее не отвечает на «what are you doing».", "TIMELINE"]
    ),
    MA(
      "ten-030 ten-stative 2 B2",
      "Распределите предложения: глагол употреблён как состояние или как действие?",
      ["Состояние", "Действие"],
      [
        ["I think the budget is too low.", 0],
        ["I'm thinking about the budget.", 1],
        ["She has a new car.", 0],
        ["She's having a meeting.", 1],
        ["I see your point.", 0],
        ["I'm seeing the auditors at 3.", 1]
      ],
      "Think/have/see стативны в значениях «мнение / владение / понимание» и динамичны в значениях «обдумывать / проводить (встречу) / встречаться».",
      "MEANING"
    ),
    // --- present perfect vs past simple ---
    S(
      "ten-031 ten-pp 1 B2",
      "(British English) I ___ my keys, so I can't get into the office.",
      ["have lost", "Важен результат сейчас (не могу войти) → Present Perfect."],
      ["lose", "Present Simple = регулярно; здесь единичное событие с результатом.", "TIMELINE"],
      ["had lost", "Past Perfect требует второй точки в прошлом.", "TIMELINE"],
      ["was losing", "Потеря — мгновенное событие, а не процесс.", "MEANING"]
    ),
    S(
      "ten-032 ten-pp 1 B2",
      "We ___ the contract last Tuesday.",
      ["signed", "Last Tuesday — точное завершённое время → Past Simple."],
      ["have signed", "Present Perfect несовместим с last Tuesday.", "TIMELINE"],
      ["have been signing", "PPC не сочетается с точной датой и не подходит для разового события.", "TIMELINE"],
      ["sign", "Нужна форма прошедшего.", "FORM"]
    ),
    I2(
      "ten-033 ten-pp 1 B2",
      "She ___ (work) here since 2021.",
      ["has worked", "has been working"],
      "Since + период до сейчас → Present Perfect (Simple или Continuous; с work обе формы естественны).",
      "TIMELINE",
      [[["works", "is working"], "TIMELINE", "Present Simple/Continuous не сочетаются с since для периода до сейчас."], [["worked"], "TIMELINE", "Past Simple + since 2021 противоречит идее «до сих пор»."], [["has work"], "FORM", "После has нужен V3: worked."]]
    ),
    S(
      "ten-034 ten-pp 2 B2",
      "«___ you ___ to the client since Monday's call?» — «Not yet.»",
      ["Have ... spoken", "Since + период до сейчас → Present Perfect."],
      ["Did ... speak", "Since задаёт период, который длится до сейчас; Past Simple с ним не сочетается.", "TIMELINE"],
      ["Do ... speak", "Present Simple не передаёт период до сейчас.", "TIMELINE"],
      ["Had ... spoken", "Нет второй точки в прошлом.", "TIMELINE"]
    ),
    S(
      "ten-035 ten-pp 2 B2",
      "This is the first time I ___ a presentation in English.",
      ["have given", "This is the first time... → Present Perfect (опыт до сейчас)."],
      ["give", "Конструкция требует Perfect.", "FORM"],
      ["am giving", "В BrE после «the first time» нужен Present Perfect, даже если действие идёт сейчас.", "THEORY"],
      ["gave", "Для прошлой ситуации было бы: That was the first time I had given...", "TIMELINE"]
    ),
    S(
      "ten-036 ten-pp 2 C1",
      "That was the first time she ___ abroad on business.",
      ["had travelled", "That was the first time → Past Perfect (опыт до точки в прошлом)."],
      ["has travelled", "Was переносит точку отсчёта в прошлое.", "TIMELINE"],
      ["travelled", "После «the first time» нужен Perfect.", "THEORY"],
      ["was travelling", "Continuous не передаёт опыт.", "MEANING"],
      { tagAlt: "traveled (AmE)" }
    ),
    FX(
      "ten-037 ten-pp 1 B2",
      "Найдите и исправьте ошибку.",
      ["I", { t: "have met", fix: ["met"], tag: "TIMELINE" }, "the new CFO", "at the conference", "last month."],
      "Last month — закрытый период → Past Simple: I met..."
    ),
    FX(
      "ten-038 ten-pp 2 B2",
      "Найдите и исправьте ошибку.",
      ["We", { t: "know", fix: ["have known", "'ve known"], tag: "TIMELINE" }, "each other", "since university."],
      "Since + период до сейчас; know — стативный → Present Perfect Simple: have known."
    ),
    S(
      "ten-039 ten-pp 2 B2",
      "(British English) How many candidates ___ so far?",
      ["have you interviewed", "So far — период до сейчас → Present Perfect."],
      ["did you interview", "So far связывает с настоящим.", "TIMELINE"],
      ["have you been interviewing", "Вопрос «сколько» — про количество → PP Simple.", "MEANING"],
      ["were you interviewing", "Past Continuous не сочетается с so far.", "TIMELINE"]
    ),
    S(
      "ten-040 ten-pp 2 B2",
      "(British English, news report) The central bank ___ interest rates, it was announced a few minutes ago. Details are still coming in.",
      ["has raised", "Новость без указания времени → Present Perfect."],
      ["raises", "Present Simple = регулярно.", "TIMELINE"],
      ["had raised", "Нет точки в прошлом.", "TIMELINE"],
      ["is raising", "Значение процесса; новость сообщает о свершившемся факте.", "MEANING"]
    ),
    S(
      "ten-041 ten-pp 2 C1",
      "Choose the most natural sentence.",
      ["I've been to three conferences this year.", "This year ещё идёт → Present Perfect; been to = посещал и вернулся."],
      ["I've gone to three conferences this year.", "Have gone = ушёл и ещё там; со счётом посещений используют been to.", "MEANING"],
      ["I've been in three conferences this year.", "Посещение мероприятия — been to, не been in.", "PREPOSITION"],
      ["I was to three conferences this year.", "Was to — некорректная конструкция.", "FORM"]
    ),
    S(
      "ten-042 ten-pp 1 B2",
      "(British English) «Is Anna here?» — «No, she ___ to the bank. She'll be back in ten minutes.»",
      ["has gone", "Has gone = ушла и ещё не вернулась."],
      ["has been", "Has been = была и уже вернулась — противоречит «she'll be back».", "MEANING"],
      ["had gone", "Past Perfect требует точки в прошлом.", "TIMELINE"],
      ["goes", "Present Simple = регулярно.", "MEANING"]
    ),
    I2(
      "ten-043 ten-pp 2 B2",
      "I ___ (not / see) him since the merger.",
      ["haven't seen", "have not seen"],
      "Since + отрицание периода до сейчас → Present Perfect.",
      "TIMELINE",
      [[["didn't see", "did not see"], "TIMELINE", "Since требует Perfect."], [["haven't saw"], "FORM", "V3 от see — seen."], [["don't see"], "TIMELINE", "Present Simple не передаёт период до сейчас."]]
    ),
    S(
      "ten-044 ten-pp 3 C1",
      "He ___ five novels and is working on his sixth.",
      ["has written", "Автор жив и активен → Present Perfect опыта."],
      ["wrote", "Past Simple звучит так, будто период закрыт; is working on his sixth показывает обратное.", "TIMELINE"],
      ["had written", "Нет точки в прошлом.", "TIMELINE"],
      ["has been writing", "Количество завершённых книг → PP Simple.", "MEANING"]
    ),
    // --- present perfect continuous ---
    S(
      "ten-045 ten-ppc 1 B2",
      "You look exhausted. ___ all night?",
      ["Have you been working", "Видимый след (усталость) + процесс до сейчас → Present Perfect Continuous."],
      ["Do you work", "Present Simple = обычно, а вопрос про недавний процесс.", "MEANING"],
      ["Had you been working", "Past Perfect Continuous требует точки отсчёта в прошлом.", "TIMELINE"],
      ["Are you working", "Сейчас — но «all night» уже прошла.", "TIMELINE"]
    ),
    I2(
      "ten-046 ten-ppc 1 B2",
      "How long have you ___ (wait)? — Since ten o'clock.",
      ["been waiting", "waited"],
      "How long + период до сейчас → Present Perfect Continuous (been waiting); с wait допустим и Present Perfect Simple (waited), но PPC естественнее.",
      "FORM",
      [[["waiting"], "FORM", "После have для длительности нужно been + V-ing."], [["wait"], "FORM", "После have нужен V3 или been + V-ing."], [["be waiting"], "FORM", "После have — been, не be."]]
    ),
    S(
      "ten-047 ten-ppc 2 B2",
      "I ___ this book for weeks, but I'm only on page 50.",
      ["have been reading", "Длительный незавершённый процесс → PPC."],
      ["have read", "Have read = прочитал (результат) — противоречит «only on page 50».", "MEANING"],
      ["read", "Past Simple закрывает действие.", "TIMELINE"],
      ["am reading", "For weeks требует Perfect.", "TIMELINE"]
    ),
    S(
      "ten-048 ten-ppc 2 B2",
      "We ___ 200 tickets since Monday.",
      ["have sold", "Количество (200) → Present Perfect Simple."],
      ["have been selling", "PPC — про процесс; с точным числом проданного — PP Simple.", "MEANING"],
      ["sold", "Since требует Perfect.", "TIMELINE"],
      ["are selling", "Since требует Perfect.", "TIMELINE"]
    ),
    S(
      "ten-049 ten-ppc 2 C1",
      "The ground is wet. It ___.",
      ["has been raining", "Видимый след недавнего процесса → PPC."],
      ["had been raining", "Точка отсчёта — сейчас (is wet), а не прошлое.", "TIMELINE"],
      ["rains", "Present Simple = обычно.", "MEANING"],
      ["was raining", "Не связывает с текущим следом.", "TIMELINE"]
    ),
    FX(
      "ten-050 ten-ppc 2 B2",
      "Найдите и исправьте ошибку.",
      ["She", { t: "has been owning", fix: ["has owned", "'s owned"], tag: "FORM" }, "the company", "for a decade."],
      "Own — стативный глагол; длительность передаёт Present Perfect Simple."
    ),
    M(
      "ten-051 ten-ppc 3 C1",
      "Выберите 2 предложения, где Present Perfect Continuous естественен.",
      ["I've been trying to call you all day.", !0, "Длительные повторяющиеся попытки до сейчас."],
      ["Prices have been rising since January.", !0, "Процесс изменения до сейчас."],
      ["I've been knowing this for years.", !1, "Know — стативный.", "FORM"],
      ["I've been visiting Rome twice.", !1, "Количество раз (twice) → PP Simple.", "MEANING"],
      ["She's been finishing the report yesterday.", !1, "Yesterday несовместим с Perfect.", "TIMELINE"]
    ),
    S(
      "ten-052 ten-ppc 2 B2",
      "«Sorry I'm late. ___ long?» — «About twenty minutes.»",
      ["Have you been waiting", "Вопрос о длительности процесса до сейчас → PPC."],
      ["Do you wait", "Present Simple = обычно.", "MEANING"],
      ["Are you waiting", "Long требует Perfect.", "TIMELINE"],
      ["Were you waiting", "Прошедший процесс без связи с «сейчас».", "TIMELINE"]
    ),
    // --- past perfect ---
    S(
      "ten-053 ten-pastperf 1 B2",
      "By the time I got to the station, the train ___.",
      ["had left", "By the time + Past Simple: отъезд раньше точки в прошлом → Past Perfect."],
      ["left", "Past Simple сделал бы отъезд одновременным/последующим.", "TIMELINE"],
      ["has left", "Точка отсчёта в прошлом (got).", "TIMELINE"],
      ["was leaving", "Процесс отъезда — другой смысл (поезд как раз отходил).", "MEANING"]
    ),
    I2(
      "ten-054 ten-pastperf 2 B2",
      "I realised I ___ (leave) my badge at home.",
      ["had left"],
      "Сначала оставил, потом понял → Past Perfect для предшествующего события.",
      "TIMELINE",
      [[["left"], "TIMELINE", "Без Past Perfect порядок неясен: оставил после того, как понял?"], [["have left"], "TIMELINE", "Realised — прошлая точка отсчёта."], [["had leave"], "FORM", "После had — V3: left."]]
    ),
    S(
      "ten-055 ten-pastperf 2 B2",
      "She ___ in sales for ten years before she moved to marketing.",
      ["had worked", "Длительный период до другой прошлой точки → Past Perfect (или PPC)."],
      ["has worked", "Точка отсчёта — прошлое (moved).", "TIMELINE"],
      ["works", "Контекст — прошлое.", "TIMELINE"],
      ["would work", "Would не передаёт предшествование.", "FORM"]
    ),
    S(
      "ten-056 ten-pastperf 2 C1",
      "He was out of breath because he ___.",
      ["had been running", "Причина состояния в прошлом — процесс, длившийся до этой точки → Past Perfect Continuous."],
      ["has been running", "Точка отсчёта — was (прошлое).", "TIMELINE"],
      ["runs", "Настоящее время не согласуется с was.", "TIMELINE"],
      ["was running", "Процесс в тот же момент — но он уже запыхался (бег был до этого).", "TIMELINE"]
    ),
    S(
      "ten-057 ten-pastperf 2 B2",
      "When I opened the fridge, I saw that someone ___ my yoghurt.",
      ["had eaten", "Съели раньше, чем я открыл → Past Perfect."],
      ["ate", "Past Simple сделал бы это последовательно после открытия.", "TIMELINE"],
      ["has eaten", "Точка отсчёта — прошлое.", "TIMELINE"],
      ["was eating", "Значило бы, что кто-то ел в этот момент.", "MEANING"]
    ),
    FX(
      "ten-058 ten-pastperf 2 B2",
      "Найдите и исправьте ошибку.",
      ["After", "she", { t: "has signed", fix: ["had signed", "signed"], tag: "TIMELINE" }, "the agreement,", "she sent it to legal."],
      "Повествование в прошлом (sent) → Past Simple или Past Perfect; Present Perfect невозможен."
    ),
    S(
      "ten-059 ten-pastperf 3 C1",
      "Which sentence does NOT need Past Perfect to make the order clear?",
      ["After the guests left, we cleaned up.", "After уже задаёт порядок; Past Simple достаточен."],
      ["When we arrived, the film started.", "Без Past Perfect фильм начался после прихода — смысл другой, если он начался раньше.", "TIMELINE"],
      ["I didn't recognise him — he changed a lot.", "Нужно had changed: изменился до момента встречи.", "TIMELINE"],
      ["She told me she lost the key.", "Двусмысленно: had lost снимает неясность порядка.", "TIMELINE"]
    ),
    O(
      "ten-060 ten-pastperf 2 B2",
      "Расположите события в хронологическом порядке (сначала самое раннее): «When the manager arrived, the team had already fixed the bug that a client had reported.»",
      ["A client reported a bug", "The team fixed the bug", "The manager arrived"],
      "Порядок упоминания не совпадает с хронологией: had reported → had fixed → arrived.",
      "TIMELINE"
    ),
    S(
      "ten-061 ten-pastperf 2 B2",
      "I ___ for two hours when the help desk finally answered.",
      ["had been waiting", "Длительность процесса до точки в прошлом → Past Perfect Continuous."],
      ["have been waiting", "Точка отсчёта — прошлое (answered).", "TIMELINE"],
      ["was waiting for two hours", "Past Continuous плохо сочетается с for + длительность до точки.", "TIMELINE"],
      ["have waited", "Точка отсчёта — прошлое (answered).", "TIMELINE"]
    ),
    // --- future ---
    S(
      "ten-062 ten-future 1 B2",
      "We ___ the auditors on Friday at 11 — it's in the calendar.",
      ["are meeting", "Договорённость с конкретным временем → Present Continuous."],
      ["meet", "Present Simple — для расписаний/программ, не для личных встреч.", "MEANING"],
      ["have met", "Present Perfect не выражает будущее.", "TIMELINE"],
      ["will have met", "Future Perfect — завершится к точке.", "TIMELINE"]
    ),
    S(
      "ten-063 ten-future 1 B2",
      "I've decided: I ___ for the senior position.",
      ["'m going to apply", "Намерение, принятое до момента речи → going to."],
      ["'ll apply", "Will — решение в момент речи; «I've decided» показывает, что решено раньше.", "MEANING"],
      ["apply", "Present Simple не выражает личное намерение.", "FORM"],
      ["applied", "Прошедшее время: заявление ещё не подано.", "TIMELINE"]
    ),
    I2(
      "ten-064 ten-future 2 B2",
      "By the end of the month, we ___ (migrate) all users to the new platform.",
      ["will have migrated"],
      "By + точка в будущем + завершённость → Future Perfect.",
      "TIMELINE",
      [[["will migrate"], "TIMELINE", "Без Perfect нет идеи «к моменту»."], [["will be migrating"], "TIMELINE", "Процесс в точке, а не завершённость."], [["will have migrate"], "FORM", "После have — V3: migrated."]]
    ),
    S(
      "ten-065 ten-future 2 B2",
      "Don't call at 3 — I ___ the quarterly results then.",
      ["'ll be presenting", "Процесс в конкретный момент будущего → Future Continuous."],
      ["'ll present", "Will + V не передаёт «буду в процессе».", "MEANING"],
      ["'ll have presented", "Значило бы «уже закончу» — тогда звонить можно.", "TIMELINE"],
      ["present", "Present Simple — расписание, а не процесс.", "MEANING"]
    ),
    S(
      "ten-066 ten-future 2 C1",
      "By next June, I ___ at this company for ten years.",
      ["will have been working", "Длительность до точки в будущем → Future Perfect Continuous."],
      ["will work", "Не передаёт длительность к моменту.", "TIMELINE"],
      ["will be working", "Процесс в точке, но не длительность «к».", "TIMELINE"],
      ["am working", "Present Continuous не сочетается с by next June + for.", "TIMELINE"]
    ),
    S(
      "ten-067 ten-future 2 B2",
      "«I don't have a pen.» — «No problem, I ___ you mine.»",
      ["'ll lend", "Спонтанное предложение помощи → will."],
      ["'m going to lend", "Намерение заранее — здесь реакция.", "MEANING"],
      ["lend", "Present Simple не выражает решение в момент речи.", "FORM"],
      ["'m lending", "Договорённость — не подходит.", "MEANING"]
    ),
    S(
      "ten-068 ten-future 2 B2",
      "Look at those figures — we ___ our target this quarter.",
      ["are going to miss", "Прогноз по признакам, видимым сейчас → going to."],
      ["miss", "Present Simple не выражает прогноз.", "FORM"],
      ["are missing", "Present Continuous — договорённость, никто не планирует провал.", "MEANING"],
      ["will have missed", "Слишком сильная завершённость без точки «к».", "TIMELINE"]
    ),
    M(
      "ten-069 ten-future 3 C1",
      "Выберите 2 естественных варианта для: «The flight to Rome ___ at 6:15 tomorrow.»",
      ["leaves", !0, "Расписание → Present Simple."],
      ["is leaving", !0, "Present Continuous тоже возможен для запланированного отправления."],
      ["will have left", !1, "Значит «уже улетит к» — нужна точка by.", "TIMELINE"],
      ["is going to leave", !1, "Going to описывает намерение/признаки, для расписания неестественно.", "MEANING"],
      ["has left", !1, "Present Perfect не выражает будущее.", "TIMELINE"]
    ),
    FX(
      "ten-070 ten-future 2 B2",
      "Найдите и исправьте ошибку.",
      ["I think", "the new policy", { t: "is improving", fix: ["will improve"], tag: "MEANING" }, "team morale", "next year."],
      "Прогноз-мнение (I think) → will; Present Continuous для будущего — только договорённость."
    ),
    S(
      "ten-071 ten-future 2 C1",
      "«Shall I send you the slides?» — The speaker is ___",
      ["offering to do something", "Shall I...? — предложение помощи."],
      ["asking about the future in general", "Для этого: Will I...?", "MEANING"],
      ["giving an order", "Shall I не выражает приказ.", "MEANING"],
      ["describing a schedule", "Расписание — Present Simple.", "MEANING"]
    ),
    // --- time clauses ---
    S(
      "ten-072 ten-timecl 1 B2",
      "I'll send you the file as soon as I ___ it.",
      ["finish", "В придаточном времени будущее → Present Simple."],
      ["will finish", "Will после as soon as не используется.", "FORM"],
      ["finished", "Past Simple переносит в прошлое.", "TIMELINE"],
      ["am finishing", "Процесс; нужен факт завершения.", "MEANING"]
    ),
    S(
      "ten-073 ten-timecl 2 B2",
      "We can't start until everyone ___ the NDA.",
      ["has signed", "Until + завершённость к моменту → Present Perfect (возможен и signs)."],
      ["will sign", "Will после until недопустим.", "FORM"],
      ["will have signed", "Future Perfect в придаточном времени недопустим.", "FORM"],
      ["had signed", "Past Perfect — прошлое.", "TIMELINE"]
    ),
    I2(
      "ten-074 ten-timecl 1 B2",
      "If the client ___ (agree), we'll start next week.",
      ["agrees"],
      "Условие реального будущего → Present Simple в if-части.",
      "FORM",
      [[["will agree"], "FORM", "Will после if в обычном условии не используется."], [["agree"], "AGREEMENT", "The client — 3-е лицо ед. ч.: agrees."], [["agreed"], "TIMELINE", "Past Simple — это уже второй тип условия."]]
    ),
    S(
      "ten-075 ten-timecl 2 C1",
      "I'm not sure when the results ___ published.",
      ["will be", "When вводит дополнительное придаточное (не sure — что?) → will возможен."],
      ["had been", "Past Perfect сдвигает публикацию в прошлое до другой точки.", "TIMELINE"],
      ["have been", "Сообщало бы о прошлом/результате.", "TIMELINE"],
      ["were", "Прошлое.", "TIMELINE"]
    ),
    FX(
      "ten-076 ten-timecl 1 B2",
      "Найдите и исправьте ошибку.",
      ["Call me", "when", "you", { t: "will land", fix: ["land"], tag: "FORM" }, "in Dubai."],
      "Придаточное времени → Present Simple: when you land."
    ),
    S(
      "ten-077 ten-timecl 2 B2",
      "By the time you ___ this message, I'll be on the plane.",
      ["read", "By the time — придаточное времени → Present Simple."],
      ["will read", "Will в придаточном времени недопустим.", "FORM"],
      ["will have read", "Future Perfect в придаточном времени недопустим.", "FORM"],
      ["are reading", "Процесс не нужен.", "MEANING"]
    ),
    S(
      "ten-078 ten-timecl 3 C1",
      "Which sentence is correct?",
      ["Tell me when you've finished, and I'll check it.", "Present Perfect в придаточном подчёркивает завершённость."],
      ["Tell me when you'll have finished, and I'll check it.", "Future Perfect в придаточном времени недопустим.", "FORM"],
      ["Tell me when you will finish, and I'll check it.", "Как придаточное времени — нужна форма настоящего. (Как вопрос «когда ты закончишь?» — другой смысл.)", "FORM"],
      ["Tell me when you had finished, and I'll check it.", "Past Perfect не подходит для будущего.", "TIMELINE"]
    ),
    I2(
      "ten-079 ten-timecl 2 B2",
      "Before you ___ (leave), please switch off the projector.",
      ["leave"],
      "Before + будущее → Present Simple.",
      "FORM",
      [[["will leave"], "FORM", "Will после before не используется."], [["left"], "TIMELINE", "Прошедшее не подходит для инструкции на будущее."]]
    ),
    // --- mix / passive / combinations ---
    S(
      "ten-080 ten-mix 2 B2",
      "The new office ___ at the moment, so we're working from home.",
      ["is being renovated", "Процесс сейчас + пассив → is being + V3."],
      ["is renovated", "Present Simple Passive — регулярно, а не сейчас.", "FORM"],
      ["has renovated", "Актив: офис сам ничего не ремонтирует.", "FORM"],
      ["is renovating", "Актив: «офис ремонтирует (что-то)».", "FORM"]
    ),
    I2(
      "ten-081 ten-mix 2 B2",
      "All the invoices ___ (send) yesterday.",
      ["were sent"],
      "Yesterday → Past Simple Passive: were + V3.",
      "FORM",
      [[["have been sent"], "TIMELINE", "Yesterday несовместим с Perfect."], [["was sent"], "AGREEMENT", "Invoices — мн. ч.: were."], [["were send"], "FORM", "После were — V3: sent."]]
    ),
    S(
      "ten-082 ten-mix 3 C1",
      "I ___ on this project since Monday, but I still ___ the main bug.",
      ["have been working / haven't found", "Процесс до сейчас (PPC) + результат «ещё не нашёл» (PP)."],
      ["worked / didn't find", "Since требует Perfect.", "TIMELINE"],
      ["have worked / don't find", "Find — нужен Perfect для «ещё не».", "TIMELINE"],
      ["am working / haven't found", "Since требует Perfect в первой части.", "TIMELINE"]
    ),
    S(
      "ten-083 ten-mix 2 B2",
      "She said she ___ the report by Friday.",
      ["would finish", "Backshift: will → would после said."],
      ["has finished", "Present Perfect не согласуется с said и будущим by Friday.", "TIMELINE"],
      ["finishes", "Present Simple здесь не передаёт будущее в косвенной речи.", "FORM"],
      ["finished", "Будущий план превратился бы в факт прошлого.", "TIMELINE"]
    ),
    M(
      "ten-084 ten-mix 3 C1",
      "Выберите 2 предложения с ошибками.",
      ["He don't like long meetings.", !0, "Согласование: he doesn't.", "AGREEMENT"],
      ["I am agree with the proposal.", !0, "Agree — глагол; be не нужен."],
      ["We've been discussing this since noon.", !1, "Корректно: процесс до сейчас.", "TIMELINE"],
      ["The results will be announced tomorrow.", !1, "Корректный Future Passive.", "FORM"],
      ["When I arrived, the meeting had already started.", !1, "Корректный Past Perfect.", "TIMELINE"],
      { explain: "Ошибки: «He don't» (нужно doesn't) и «I am agree» (нужно I agree)." }
    ),
    MA(
      "ten-085 ten-mix 2 C1",
      "Соотнесите предложение с формой.",
      ["Present Perfect", "Past Perfect", "Future Perfect", "Present Perfect Continuous"],
      [
        ["By noon we'll have tested every module.", 2],
        ["They had already left when we called.", 1],
        ["I've just sent you the link.", 0],
        ["She's been coding since 8 a.m.", 3],
        ["Had you met him before the interview?", 1],
        ["Have the results come in yet?", 0]
      ],
      "Форма определяется первым вспомогательным (have/had/will have) и наличием been + V-ing.",
      "FORM"
    ),
    O(
      "ten-086 ten-mix 2 B2",
      "Постройте отрицание в пассиве: «Решение ещё не принято».",
      ["The", "decision", "has", "not", "been", "made", "yet"],
      "Present Perfect Passive: has + not + been + V3; yet в конце.",
      "STRUCTURE",
      ["The decision has not yet been made"]
    )
  ], b01_tenses_default = block({
    id: "tenses",
    n: 1,
    title: "Времена и aspect",
    short: "Система 3×4, Perfect, будущее, придаточные",
    blueprint: { size: 26, theory: 6 }
  }, lessons, practice);

  // src/content/vocab/irregular.js
  var RAW = "\nbe|was/were|been|быть, находиться|становиться|She has [[been]] in London since Monday.|Она в Лондоне с понедельника.|was — для I/he/she/it, were — для you/we/they\nbecome|became|become|становиться (кем-то, каким-то)|приходить|He [[became]] team lead last year.|В прошлом году он стал тимлидом.|ABA: become — became — become\nbegin|began|begun|начинать(ся)|продолжать|The meeting has already [[begun]].|Встреча уже началась.|i-a-u\nbend|bent|bent|сгибать, наклонять|ломать|She [[bent]] down to pick up the badge.|Она наклонилась, чтобы поднять бейдж.|\nbet|bet|bet|делать ставку, держать пари|выигрывать|I [[bet]] you can't guess the result.|Спорим, ты не угадаешь результат.|AAA\nbite|bit|bitten|кусать|жалить|The dog has never [[bitten]] anyone.|Собака никогда никого не кусала.|\nblow|blew|blown|дуть|бросать|The wind has [[blown]] the papers off the desk.|Ветер сдул бумаги со стола.|\nbreak|broke|broken|ломать, разбивать|резать|Someone has [[broken]] the coffee machine.|Кто-то сломал кофемашину.|\nbring|brought|brought|приносить (сюда, к говорящему)|относить (туда)|Thanks for [[bringing]] the documents.|Спасибо, что принёс документы.|bring — к говорящему, take — от говорящего\nbroadcast|broadcast|broadcast|транслировать (по ТВ, радио)|записывать|The final was [[broadcast]] live.|Финал транслировали в прямом эфире.|AAA; broadcasted встречается редко\nbuild|built|built|строить|разрушать|They [[built]] the platform in six months.|Они построили платформу за полгода.|\nburn|burnt/burned|burnt/burned|гореть; жечь|тушить|I've [[burnt]] the toast again.|Я снова сжёг тост.|burnt — BrE, burned — AmE и BrE\nbuy|bought|bought|покупать|продавать|We [[bought]] new licences last week.|На прошлой неделе мы купили новые лицензии.|произношение /bɔːt/\ncatch|caught|caught|ловить; успеть (на транспорт)|пропустить|We [[caught]] the last train home.|Мы успели на последний поезд домой.|произношение /kɔːt/\nchoose|chose|chosen|выбирать|отказываться|Have you [[chosen]] a supplier yet?|Ты уже выбрал поставщика?|\ncome|came|come|приходить, приезжать|уходить|She [[came]] to the office early.|Она пришла в офис рано.|ABA\ncost|cost|cost|стоить (о цене)|тратить|The repair [[cost]] more than we expected.|Ремонт обошёлся дороже, чем мы ожидали.|AAA\ncut|cut|cut|резать; сокращать|склеивать|The company has [[cut]] its marketing budget.|Компания сократила маркетинговый бюджет.|AAA\ndeal|dealt|dealt|иметь дело (с), разбираться (с)|избегать|She [[dealt]] with the complaint quickly.|Она быстро разобралась с жалобой.|произношение /delt/\ndig|dug|dug|копать|закапывать|They [[dug]] deeper into the data.|Они глубже копнули в данные.|\ndive|dived/dove|dived|нырять|плавать|He [[dived]] into the pool.|Он нырнул в бассейн.|dove — AmE прошедшее\ndo|did|done|делать (выполнять, заниматься)|создавать (изготавливать)|Have you [[done]] the security training?|Ты прошёл обучение по безопасности?|do — действие/работа; make — создание\ndraw|drew|drawn|рисовать (линиями); вытягивать|красить|He [[drew]] a diagram on the whiteboard.|Он нарисовал схему на доске.|draw conclusions — делать выводы\ndream|dreamt/dreamed|dreamt/dreamed|видеть сон; мечтать|спать|I [[dreamt]] about the exam last night.|Мне снился экзамен прошлой ночью.|dreamt — BrE, dreamed — оба варианта\ndrink|drank|drunk|пить|есть|I've [[drunk]] too much coffee today.|Я сегодня выпил слишком много кофе.|i-a-u\ndrive|drove|driven|водить (машину), ехать за рулём|ехать пассажиром|She [[drove]] to the airport.|Она поехала в аэропорт на машине.|\neat|ate|eaten|есть, кушать|пить|Have you [[eaten]] yet?|Ты уже ел?|ate: /et/ BrE, /eɪt/ AmE\nfall|fell|fallen|падать|поднимать|Sales have [[fallen]] by 10%.|Продажи упали на 10%.|не путать с fell (рубить) — правильный\nfeed|fed|fed|кормить|голодать|Who [[fed]] the cat this morning?|Кто покормил кота утром?|\nfeel|felt|felt|чувствовать|видеть|I [[felt]] tired after the flight.|После перелёта я чувствовал усталость.|\nfight|fought|fought|бороться; драться|мириться|They [[fought]] hard for the contract.|Они упорно боролись за контракт.|\nfind|found|found|находить|терять|I [[found]] the bug in line 42.|Я нашёл баг в строке 42.|found (основывать) — отдельный правильный глагол\nfly|flew|flown|летать|ехать|We [[flew]] to Dubai on Sunday.|В воскресенье мы полетели в Дубай.|\nforbid|forbade|forbidden|запрещать|разрешать|Smoking is [[forbidden]] in the building.|Курение в здании запрещено.|\nforecast|forecast/forecasted|forecast/forecasted|прогнозировать|подсчитывать (итог)|Analysts [[forecast]] a slowdown.|Аналитики спрогнозировали замедление.|обе формы допустимы\nforget|forgot|forgotten|забывать|вспоминать|I've [[forgotten]] my password.|Я забыл пароль.|forgot — AmE V3 тоже встречается в некоторых значениях; стандарт — forgotten\nforgive|forgave|forgiven|прощать|обвинять|She has [[forgiven]] him for the mistake.|Она простила ему ошибку.|\nfreeze|froze|frozen|замерзать; замораживать; зависать (о программе)|таять|My laptop [[froze]] during the call.|У меня завис ноутбук во время звонка.|\nget|got|got/gotten|получать; доставать|отдавать|I've [[got]] your message.|Я получил твоё сообщение.|gotten — AmE V3; have got = иметь (BrE)\ngive|gave|given|давать|брать|They've [[given]] us a discount.|Нам дали скидку.|\ngo|went|gone|идти, ехать (уходить)|приходить|He's [[gone]] home.|Он ушёл домой.|been to — был и вернулся; gone to — ушёл и ещё там\ngrow|grew|grown|расти; выращивать|уменьшаться|The team has [[grown]] to 40 people.|Команда выросла до 40 человек.|\nhang|hung|hung|вешать; висеть|снимать|We [[hung]] the posters in the hall.|Мы повесили плакаты в холле.|hanged — только о казни\nhave|had|had|иметь|давать|We [[had]] a long meeting yesterday.|Вчера у нас было долгое совещание.|\nhear|heard|heard|слышать|слушать|Have you [[heard]] the news?|Ты слышал новости?|произношение /hɜːd/\nhide|hid|hidden|прятать(ся), скрывать|показывать|The setting is [[hidden]] in the menu.|Настройка спрятана в меню.|\nhit|hit|hit|ударять; попадать (в цель)|промахиваться|We [[hit]] our sales target in May.|В мае мы выполнили план продаж.|AAA\nhold|held|held|держать; проводить (мероприятие)|отменять|The conference was [[held]] in Kazan.|Конференция прошла в Казани.|\nhurt|hurt|hurt|причинять боль; болеть|лечить|My back [[hurt]] after the long drive.|После долгой поездки у меня болела спина.|AAA\nkeep|kept|kept|хранить; продолжать (делать)|выбрасывать|She [[kept]] all the receipts.|Она сохранила все чеки.|\nknow|knew|known|знать|забывать|I've [[known]] her for years.|Я знаю её много лет.|\nlay|laid|laid|класть горизонтально; накрывать (стол)|лежать|She [[laid]] the documents on the table.|Она положила документы на стол.|lay (класть) ≠ lie (лежать)\nlead|led|led|вести; руководить|следовать|She [[led]] the project for two years.|Она руководила проектом два года.|\nlean|leant/leaned|leant/leaned|прислоняться; наклоняться|выпрямляться|He [[leaned]] against the wall.|Он прислонился к стене.|leant — BrE\nlearn|learnt/learned|learnt/learned|учить (самому), узнавать|учить (кого-то), преподавать|We [[learned]] a lot from the failure.|Мы многому научились на этой неудаче.|learnt — BrE; learned — оба\nleave|left|left|уходить, уезжать; оставлять|прибывать|I [[left]] my charger at the office.|Я оставил зарядку в офисе.|\nlend|lent|lent|одалживать (давать в долг)|занимать (брать в долг)|Could you [[lend]] me your pen?|Не одолжишь ручку?|lend — давать; borrow — брать\nlet|let|let|позволять, разрешать|запрещать|My manager [[let]] me leave early.|Руководитель отпустил меня пораньше.|AAA\nlie|lay|lain|лежать|класть горизонтально|The files have [[lain]] untouched for months.|Файлы месяцами лежали нетронутыми.|lie — lied — lied = лгать (правильный)\nlight|lit/lighted|lit/lighted|зажигать; освещать|гасить|They [[lit]] the candles.|Они зажгли свечи.|\nlose|lost|lost|терять; проигрывать|находить|We [[lost]] the tender to a competitor.|Мы проиграли тендер конкуренту.|\nmake|made|made|делать (создавать, изготавливать)|выполнять (заниматься)|We've [[made]] a decision.|Мы приняли решение.|make a decision, make a mistake\nmean|meant|meant|означать; иметь в виду|понимать|I [[meant]] to call you.|Я собирался тебе позвонить.|произношение /ment/\nmeet|met|met|встречать(ся); знакомиться|прощаться|We [[met]] at a conference in 2022.|Мы познакомились на конференции в 2022.|\novercome|overcame|overcome|преодолевать|избегать|They [[overcame]] the technical issues.|Они преодолели технические проблемы.|ABA, как come\npay|paid|paid|платить|получать|Have you [[paid]] the invoice?|Ты оплатил счёт?|орфография: paid (не payed)\nprove|proved|proved/proven|доказывать; оказываться|опровергать|The idea [[proved]] successful.|Идея оказалась удачной.|proven — чаще AmE и как прилагательное\nput|put|put|класть, ставить (куда-либо; общий глагол)|брать|I [[put]] the file in the shared folder.|Я положил файл в общую папку.|AAA\nquit|quit/quitted|quit/quitted|бросать (работу, привычку)|начинать|She [[quit]] her job in March.|Она уволилась в марте.|quitted — BrE, редко\nread|read|read|читать|писать|I [[read]] your report yesterday.|Я прочитал твой отчёт вчера.|V2/V3 произносятся /red/\nride|rode|ridden|ездить (верхом, на велосипеде)|идти пешком|Have you ever [[ridden]] a horse?|Ты когда-нибудь катался на лошади?|\nring|rang|rung|звонить (о звонке, телефоне)|молчать|The phone [[rang]] during the meeting.|Во время встречи зазвонил телефон.|i-a-u\nrise|rose|risen|подниматься, расти (самому)|поднимать (что-то)|Prices have [[risen]] sharply.|Цены резко выросли.|raise — raised — raised (поднимать что-то)\nrun|ran|run|бежать; управлять (бизнесом, процессом)|стоять|She [[runs]] a small agency.|Она руководит небольшим агентством.|ABA\nsay|said|said|сказать (что-то; передать слова)|сказать кому-то, рассказать|He [[said]] that the deadline had moved.|Он сказал, что срок перенесли.|произношение /sed/; say something, tell someone\nsee|saw|seen|видеть|слышать|Have you [[seen]] the new design?|Ты видел новый дизайн?|\nseek|sought|sought|искать (формально), добиваться|находить|The company [[sought]] legal advice.|Компания обратилась за юридической консультацией.|\nsell|sold|sold|продавать|покупать|We [[sold]] 500 units last month.|В прошлом месяце мы продали 500 единиц.|\nsend|sent|sent|отправлять, посылать|получать|I've [[sent]] you the link.|Я отправил тебе ссылку.|\nset|set|set|устанавливать (цель, срок, будильник)|отменять|We [[set]] a clear deadline.|Мы установили чёткий срок.|AAA\nshake|shook|shaken|трясти; пожимать (руку)|держать неподвижно|They [[shook]] hands after the deal.|После сделки они пожали руки.|\nshine|shone/shined|shone/shined|светить, сиять|темнеть|The sun [[shone]] all day.|Солнце светило весь день.|shined — «начистить» (обувь)\nshoot|shot|shot|стрелять; снимать (видео)|монтировать|They [[shot]] the promo video in one day.|Промо-ролик сняли за один день.|\nshow|showed|shown/showed|показывать|прятать|She [[showed]] us the prototype.|Она показала нам прототип.|showed как V3 — редко\nshrink|shrank|shrunk|сжиматься, уменьшаться|растягиваться|The market has [[shrunk]] this year.|Рынок в этом году сократился.|\nshut|shut|shut|закрывать (захлопывать)|открывать|Please [[shut]] the door.|Пожалуйста, закрой дверь.|AAA\nsing|sang|sung|петь|танцевать|She [[sang]] at the company party.|Она пела на корпоративе.|i-a-u\nsink|sank|sunk|тонуть; погружаться|всплывать|The boat [[sank]] in minutes.|Лодка затонула за несколько минут.|i-a-u\nsit|sat|sat|сидеть|стоять|We [[sat]] in the front row.|Мы сидели в первом ряду.|\nsleep|slept|slept|спать|просыпаться|I [[slept]] badly before the exam.|Перед экзаменом я плохо спал.|\nsmell|smelt/smelled|smelt/smelled|пахнуть; нюхать|видеть|The room [[smelled]] of fresh paint.|В комнате пахло свежей краской.|smelt — BrE\nspeak|spoke|spoken|говорить (на языке); выступать|молчать|Have you [[spoken]] to HR?|Ты поговорил с отделом кадров?|speak — язык/выступление; talk — разговор\nspell|spelt/spelled|spelt/spelled|писать / произносить по буквам|читать вслух|How do you [[spell]] your surname?|Как пишется ваша фамилия?|spelt — BrE\nspend|spent|spent|тратить (деньги, время)|копить|We [[spent]] two days on testing.|Мы потратили два дня на тестирование.|\nspill|spilt/spilled|spilt/spilled|проливать|вытирать|I [[spilled]] coffee on my keyboard.|Я пролил кофе на клавиатуру.|spilt — BrE\nsplit|split|split|разделять, делить|соединять|We [[split]] the task into three parts.|Мы разделили задачу на три части.|AAA\nspread|spread|spread|распространять(ся); намазывать|сокращать|The news [[spread]] quickly.|Новость быстро разлетелась.|AAA; произношение /spred/\nstand|stood|stood|стоять|сидеть|We [[stood]] in the queue for an hour.|Мы простояли в очереди час.|\nsteal|stole|stolen|красть|возвращать|My bike was [[stolen]].|У меня украли велосипед.|\nstick|stuck|stuck|приклеивать(ся); застревать|отрывать|We got [[stuck]] in traffic.|Мы застряли в пробке.|\nstrike|struck|struck|ударять; поражать (о мысли); бастовать|защищать|It [[struck]] me that we'd missed something.|Меня осенило, что мы что-то упустили.|stricken — прилагательное (поражённый)\nswear|swore|sworn|клясться; ругаться|хвалить|He [[swore]] he hadn't seen the email.|Он поклялся, что не видел письма.|\nswim|swam|swum|плавать|нырять|I've never [[swum]] in the ocean.|Я никогда не плавал в океане.|i-a-u\ntake|took|taken|брать; относить (туда); занимать (о времени)|приносить (сюда)|The migration [[took]] three weeks.|Миграция заняла три недели.|\nteach|taught|taught|учить (кого-то), преподавать|учить (самому)|She [[taught]] me how to use the CRM.|Она научила меня пользоваться CRM.|\ntear|tore|torn|рвать, разрывать|склеивать|He [[tore]] up the old contract.|Он порвал старый контракт.|tear /teə/ (рвать) ≠ tear /tɪə/ (слеза)\ntell|told|told|сказать кому-то; рассказать|сказать (что-то; передать слова)|She [[told]] me about the changes.|Она рассказала мне об изменениях.|tell someone something\nthink|thought|thought|думать; считать|знать|I [[thought]] you were on holiday.|Я думал, ты в отпуске.|\nthrow|threw|thrown|бросать (кидать)|ловить|He [[threw]] the ball to me.|Он бросил мне мяч.|\nundertake|undertook|undertaken|браться за (проект), предпринимать|отказываться|The firm [[undertook]] a full audit.|Компания провела полный аудит.|\nunderstand|understood|understood|понимать|объяснять|I haven't [[understood]] the last part.|Я не понял последнюю часть.|\nupset|upset|upset|расстраивать; нарушать (планы)|радовать|The delay [[upset]] the client.|Задержка расстроила клиента.|AAA\nwake|woke|woken|просыпаться; будить|засыпать|I [[woke]] up at six.|Я проснулся в шесть.|\nwear|wore|worn|носить (одежду), быть одетым в|снимать (одежду)|She [[wore]] a suit to the interview.|На собеседование она надела костюм.|\nwin|won|won|выигрывать (матч, приз, тендер)|проигрывать|We [[won]] the contract.|Мы выиграли контракт.|произношение /wʌn/\nwithdraw|withdrew|withdrawn|снимать (деньги); отзывать|вносить|They [[withdrew]] the offer.|Они отозвали предложение.|\nwrite|wrote|written|писать|читать|Have you [[written]] the summary?|Ты написал резюме встречи?|\narise|arose|arisen|возникать (о проблеме, вопросе)|исчезать|A problem has [[arisen]] with the payment.|Возникла проблема с оплатой.|\nbear|bore|borne|выносить, терпеть; нести (расходы)|избегать|The costs will be [[borne]] by the client.|Расходы возьмёт на себя клиент.|born — только «рождён»\nbeat|beat|beaten|побеждать (соперника); бить|проигрывать|We [[beat]] our competitors on price.|Мы обошли конкурентов по цене.|\n", split = (s) => s.split("/").map((x) => x.trim()).filter(Boolean), IRREGULAR = RAW.trim().split("\n").map((line, i) => {
    let [v1, v2, v3, ru2, wrong, exS, exR, note] = line.split("|").map((s) => (s || "").trim()), id = "irr-" + v1.replace(/\s+/g, "-"), target = (exS.match(/\[\[(.+?)\]\]/) || [])[1] || v1, v2s = split(v2), v3s = split(v3), pattern = v1 === v2s[0] && v1 === v3s[0] ? "AAA" : v2s[0] === v3s[0] ? "ABB" : v1 === v3s[0] ? "ABA" : "ABC";
    return {
      id,
      english: v1,
      russian: ru2,
      testPrompt: ru2,
      acceptedEnglishAnswers: [v1],
      acceptedRussianAnswers: [ru2],
      exampleSentence: exS,
      exampleTranslation: exR,
      category: pattern,
      group: null,
      wrongRussian: wrong,
      clozeAnswers: v2s.includes(target) ? v2s.slice() : v3s.includes(target) ? v3s.slice() : [target],
      v1,
      v2: v2s,
      v3: v3s,
      usageNotes: note || "",
      level: "B2",
      tags: ["irregular", pattern],
      n: i + 1
    };
  });

  // src/content/blocks/b02-irregular.js
  var lessons2 = [
    L("irr-roles", "V1, V2, V3: где работает каждая форма", "Знать, какая форма нужна в каждой конструкции, и строить правильные глаголы по -ed.", [
      p("У каждого глагола три опорные формы. **V1** — начальная (инфинитив, настоящее время, после do/does/did и модальных). **V2** — Past Simple в утверждении. **V3** (причастие прошедшего времени) — во всех Perfect-формах (_have/had/will have + V3_) и в пассиве (_be + V3_), а также как определение (_a broken link_)."),
      tb(["Форма", "Где используется", "Пример"], [
        ["V1", "Present Simple, после do/did/модальных, инфинитив", "Did you see it? You should see it."],
        ["V2", "Past Simple (утверждение)", "I saw it yesterday."],
        ["V3", "Perfect, пассив, причастие-определение", "I've seen it. It was seen. The seen files."]
      ]),
      p("У **правильных** глаголов V2 = V3 = V1 + -ed (с правилами орфографии: _stop → stopped, try → tried, plan → planned_). У **неправильных** формы нужно помнить, но они группируются в повторяющиеся модели — об этом следующие уроки."),
      ex(
        ["I didn't know.", "Я не знал.", "после did — V1, не V2"],
        ["The report was written by Anna.", "Отчёт написан Анной.", "пассив: be + V3"],
        ["She has gone home.", "Она ушла домой.", "Perfect: has + V3"]
      ),
      warn("Самая частая ошибка — V2 вместо V3 после have/be: ~~has went~~, ~~was wrote~~.")
    ], [
      TS(
        "irr-t01 irr-roles 1 B2",
        "Почему в «Did you saw the email?» ошибка?",
        ["После did основной глагол стоит в V1: Did you see...?", "Прошедшее время уже выражено did; второй раз его не показывают."],
        ["Потому что нужен V3: Did you seen?", "V3 после did не используется.", "FORM"],
        ["Потому что see — правильный глагол.", "See — неправильный, но дело не в этом.", "FORM"],
        ["Ошибки нет.", "Двойное прошедшее (did + V2) — ошибка.", "AUXILIARY"],
        { ce: "I saw the email — в утверждении без did нужен V2." }
      ),
      TS(
        "irr-t02 irr-roles 2 B2",
        "В какой конструкции нужен V3?",
        ["В пассиве: The decision was made yesterday.", "Пассив = be + V3."],
        ["После модального: You must made it.", "После модального — V1.", "FORM"],
        ["В Past Simple: I made it.", "Past Simple — V2 (у make V2 = V3, но роль разная).", "THEORY"],
        ["После did: Did you made it?", "После did — V1.", "FORM"],
        { ce: "You must make it — после must V1." }
      ),
      TS(
        "irr-t03 irr-roles 2 B2",
        "Почему у глагола make нельзя по одной форме made понять, V2 это или V3?",
        ["У модели ABB формы V2 и V3 совпадают; роль определяется конструкцией (have made / made).", "Функцию формы показывает окружение: вспомогательный have/be или его отсутствие."],
        ["Потому что make — правильный глагол.", "Make неправильный (не makeed).", "FORM"],
        ["Потому что made — это V1.", "V1 — make.", "FORM"],
        ["Потому что у make нет V3.", "V3 есть: made.", "FORM"],
        { ce: "У take формы различаются: took (V2) / taken (V3) — роль видна сразу." }
      )
    ]),
    L("irr-aaa", "Модель AAA: cut — cut — cut", "Узнавать глаголы с тремя одинаковыми формами и определять время по контексту.", [
      p("У глаголов модели **AAA** все три формы совпадают: _cut, put, set, let, hit, cost, shut, hurt, spread, split, bet, upset, broadcast, quit (AmE)_. Время определяется по контексту: подлежащее в 3-м лице без -s, маркеры времени, вспомогательные."),
      tb(["Предложение", "Время", "Подсказка"], [
        ["She puts the files in the folder every Friday.", "Present Simple", "-s и every Friday"],
        ["She put the files in the folder yesterday.", "Past Simple", "yesterday; нет -s у she"],
        ["She has put the files in the folder.", "Present Perfect", "has + V3"]
      ]),
      ex(
        ["The update cost us two days.", "Обновление стоило нам двух дней.", "Past Simple"],
        ["How much does it cost?", "Сколько это стоит?", "Present Simple"]
      ),
      tip("Если подлежащее he/she/it, а у глагола нет -s, — это прошедшее время: _He let me go._")
    ], [
      TS(
        "irr-t04 irr-aaa 2 B2",
        "Как понять время в «He cut the budget»?",
        ["У he нет -s у глагола → это прошедшее (Past Simple).", "В настоящем было бы He cuts."],
        ["Это Present Simple.", "В Present Simple с he нужно cuts.", "AGREEMENT"],
        ["Время определить невозможно.", "Отсутствие -s с he — ясный признак.", "THEORY"],
        ["Это Present Perfect.", "Нет has.", "AUXILIARY"],
        { ce: "They cut the budget — без контекста время неочевидно: с they -s не появляется." }
      ),
      TS(
        "irr-t05 irr-aaa 1 B2",
        "Какой глагол НЕ относится к модели AAA?",
        ["sit — sat — sat", "Sit меняет гласную (ABB)."],
        ["put — put — put", "AAA.", "FORM"],
        ["let — let — let", "AAA.", "FORM"],
        ["hurt — hurt — hurt", "AAA.", "FORM"],
        { ce: "set — set — set: AAA, несмотря на сходство с sit." }
      ),
      TS(
        "irr-t06 irr-aaa 2 C1",
        "Почему «They upsetted the client» — ошибка?",
        ["Upset — глагол модели AAA: upset — upset — upset.", "Окончание -ed к нему не добавляется."],
        ["Нужно upsat.", "Такой формы нет.", "FORM"],
        ["Upset — только прилагательное.", "Это и глагол.", "THEORY"],
        ["Нужно have upset.", "Present Perfect возможен, но ошибка в форме upsetted.", "FORM"],
        { ce: "The delay upset the client — Past Simple." }
      )
    ]),
    L("irr-abb", "Модель ABB: V2 = V3", "Запомнить крупнейшую группу неправильных глаголов по подгруппам звучания.", [
      p("В модели **ABB** V2 и V3 совпадают. Её удобно учить по звуковым подгруппам:"),
      tb(["Подгруппа", "Глаголы"], [
        ["-ought / -aught", "bring — brought, buy — bought, think — thought, fight — fought, seek — sought; catch — caught, teach — taught"],
        ["-d → -t", "send — sent, spend — spent, lend — lent, build — built, bend — bent"],
        ["ee/ea → e + t", "keep — kept, sleep — slept, feel — felt, leave — left, meet — met, mean — meant, deal — dealt"],
        ["-ay → -aid", "say — said, pay — paid, lay — laid"],
        ["-ind / -old / -and", "find — found, hold — held, stand — stood, understand — understood"],
        ["другие", "sell — sold, tell — told, lose — lost, win — won, sit — sat, get — got, have — had, make — made, hear — heard, lead — led, feed — fed"]
      ]),
      ex(
        ["We've bought new licences.", "Мы купили новые лицензии.", "/bɔːt/"],
        ["She taught me the basics.", "Она научила меня основам.", "/tɔːt/"]
      ),
      warn("Орфография: paid, laid, said — без y: ~~payed~~, ~~layed~~, ~~sayed~~.")
    ], [
      TS(
        "irr-t07 irr-abb 2 B2",
        "Почему «I payed the invoice» — ошибка?",
        ["Pay — неправильный глагол: pay — paid — paid.", "Как say — said и lay — laid."],
        ["Нужно pied.", "Такой формы нет.", "SPELLING"],
        ["Нужно have payed.", "Форма payed неверна в любом времени.", "FORM"],
        ["Ошибки нет.", "Payed используется лишь в узком морском значении; в обычном — paid.", "SPELLING"],
        { ce: "play — played — played: правильный глагол, -ed с y сохраняется." }
      ),
      TS(
        "irr-t08 irr-abb 2 B2",
        "Чем различаются brought и bought?",
        ["Brought — от bring (принести), bought — от buy (купить).", "Похожие формы разных глаголов: проверяйте по V1."],
        ["Это варианты одного глагола.", "Это разные глаголы.", "VOCAB_MEANING"],
        ["Brought — BrE, bought — AmE.", "Не варианты.", "VOCAB_MEANING"],
        ["Bought — V3, brought — V2 от buy.", "Неверно.", "FORM"],
        { ce: "I bought a coffee (купил) / I brought a coffee (принёс)." }
      ),
      TS(
        "irr-t09 irr-abb 1 B2",
        "Какая пара форм верна для leave?",
        ["left — left", "Leave — left — left (ABB)."],
        ["leaved — leaved", "Неправильный глагол.", "FORM"],
        ["left — leften", "Формы leften нет.", "FORM"],
        ["lived — lived", "Это формы live (жить).", "VOCAB_MEANING"],
        { ce: "Live — lived — lived (правильный); leave — left — left (неправильный)." }
      )
    ]),
    L("irr-abc", "Модель ABC: все формы разные", "Освоить глаголы с тремя разными формами по звуковым моделям.", [
      p("В модели **ABC** все три формы различаются. Основные звуковые модели:"),
      tb(["Модель", "Примеры"], [
        ["i — a — u", "begin — began — begun, drink — drank — drunk, ring — rang — rung, sing — sang — sung, sink — sank — sunk, swim — swam — swum, shrink — shrank — shrunk"],
        ["V2 + -n / V1 + -n", "speak — spoke — spoken, break — broke — broken, choose — chose — chosen, freeze — froze — frozen, steal — stole — stolen, wake — woke — woken; take — took — taken, give — gave — given, eat — ate — eaten, fall — fell — fallen"],
        ["-ew — -own", "know — knew — known, grow — grew — grown, throw — threw — thrown, blow — blew — blown, fly — flew — flown, draw — drew — drawn"],
        ["i — o — i…en", "write — wrote — written, drive — drove — driven, ride — rode — ridden, rise — rose — risen"],
        ["особые", "be — was/were — been, go — went — gone, do — did — done, see — saw — seen, wear — wore — worn, tear — tore — torn, lie — lay — lain"]
      ]),
      ex(
        ["Prices have risen.", "Цены выросли.", "rise — rose — risen"],
        ["I've never flown business class.", "Я никогда не летал бизнес-классом.", "fly — flew — flown"]
      ),
      warn("Самые частые ошибки: ~~has went~~ (→ has gone), ~~was began~~ (→ had begun/began), ~~I have drank~~ (→ drunk).")
    ], [
      TS(
        "irr-t10 irr-abc 2 B2",
        "Почему «The meeting has began» — ошибка?",
        ["После has нужен V3: begun.", "Began — V2 (Past Simple)."],
        ["Нужно has begin.", "После has не V1.", "FORM"],
        ["Нужно has beginned.", "Неправильный глагол.", "FORM"],
        ["Ошибки нет.", "Began — V2.", "FORM"],
        { ce: "The meeting began at 10 — Past Simple, V2." }
      ),
      TS(
        "irr-t11 irr-abc 2 B2",
        "Какая модель у swim?",
        ["i — a — u: swim — swam — swum", "Как begin, drink, sing."],
        ["swim — swum — swum", "V2 — swam.", "FORM"],
        ["swim — swimmed — swimmed", "Неправильный глагол.", "FORM"],
        ["swim — swam — swam", "V3 — swum.", "FORM"],
        { ce: "bring — brought — brought: не i-a-u, хотя похоже на ring." }
      ),
      TS(
        "irr-t12 irr-abc 3 C1",
        "Почему «I have went» особенно частая ошибка, и как её запомнить?",
        ["Went — V2 от go и исторически от другого глагола; V3 — gone, его нужно запомнить отдельно.", "Go образует V2 от другого корня (wend), поэтому аналогия не работает."],
        ["Потому что went — V3 в AmE.", "Ни в одном стандарте went не является V3.", "FORM"],
        ["Потому что go — правильный глагол.", "Go неправильный.", "FORM"],
        ["Потому что нужно have goed.", "Goed не существует.", "FORM"],
        { ce: "I have been to Rome (был и вернулся) vs I have gone (ушёл)." }
      )
    ]),
    L("irr-aba", "Модель ABA: come — came — come", "Не путать V1 и V3 у глаголов, где они совпадают.", [
      p("В модели **ABA** V1 и V3 совпадают: _come — came — come, become — became — become, run — ran — run, overcome — overcame — overcome_. Ошибка — использовать V2 после have: ~~has became~~."),
      ex(
        ["She has become a partner.", "Она стала партнёром.", "has + become (V3)"],
        ["They have run the test twice.", "Они дважды прогнали тест.", "has + run (V3)"]
      ),
      tip("Проверяйте по вспомогательному: после have/has/had и be — форма, совпадающая с V1.")
    ], [
      TS(
        "irr-t13 irr-aba 1 B2",
        "Какая форма верна: «He has ___ head of sales»?",
        ["become", "Become — became — become: V3 совпадает с V1."],
        ["became", "V2 после has не используется.", "FORM"],
        ["becomed", "Неправильный глагол.", "FORM"],
        ["becoming", "Has becoming — неверно.", "FORM"],
        { ce: "He became head of sales in 2022 — Past Simple: V2." }
      ),
      TS(
        "irr-t14 irr-aba 2 B2",
        "Как отличить V1 от V3 в «I have run the report»?",
        ["По вспомогательному have: после него — V3 (run).", "Форма совпадает, функция видна из конструкции."],
        ["Это V1, потому что форма run.", "Совпадение формы не означает V1.", "THEORY"],
        ["Нужно have ran.", "Ran — V2.", "FORM"],
        ["Отличить невозможно.", "Конструкция всегда подсказывает.", "THEORY"],
        { ce: "I run the report every Monday — без have: V1." }
      ),
      TS(
        "irr-t15 irr-aba 2 B2",
        "Какой глагол относится к модели ABA?",
        ["overcome", "Overcome — overcame — overcome."],
        ["overtake", "Overtake — overtook — overtaken (ABC).", "FORM"],
        ["understand", "Understand — understood — understood (ABB).", "FORM"],
        ["forget", "Forget — forgot — forgotten (ABC).", "FORM"],
        { ce: "become — became — become: как и все производные от come." }
      )
    ]),
    L("irr-variants", "Варианты: BrE / AmE и двойные формы", "Знать, какие варианты форм равноправны, а какие ограничены регистром или значением.", [
      p("У ряда глаголов есть **две допустимые формы**: британский вариант на -t и общий на -ed: _learnt/learned, burnt/burned, dreamt/dreamed, spelt/spelled, spilt/spilled, smelt/smelled, leant/leaned_. В американском английском почти всегда -ed."),
      tb(["Глагол", "BrE", "AmE", "Комментарий"], [
        ["get", "got — got", "got — gotten", "have got = иметь (BrE); have gotten = получил/стал (AmE)"],
        ["prove", "proved — proved", "proved — proven", "proven — также прилагательное: a proven method"],
        ["dive", "dived", "dove / dived", "dove — разговорное AmE"],
        ["quit", "quit / quitted", "quit", "quitted — редко"],
        ["light", "lit", "lit / lighted", "lighted — чаще как прилагательное"]
      ]),
      ex(
        ["I've learnt a lot. / I've learned a lot.", "Я многому научился.", "обе формы верны"],
        ["She's gotten much better at Excel. (AmE)", "Она стала гораздо лучше разбираться в Excel.", "BrE: She's got much better"]
      ),
      tip("В заданиях на ввод приложение принимает оба варианта, если они стандартны.")
    ], [
      TS(
        "irr-t16 irr-variants 2 B2",
        "Верно ли «I've learnt a lot this year»?",
        ["Да, learnt — стандартная британская форма, наравне с learned.", "Обе формы допустимы."],
        ["Нет, только learned.", "Learnt — стандарт BrE.", "THEORY"],
        ["Нет, нужно learned only in Past Simple.", "Ограничения нет.", "THEORY"],
        ["Да, но только в AmE.", "Наоборот: -t — BrE.", "THEORY"],
        { ce: "В AmE learnt звучит непривычно; learned — универсально." }
      ),
      TS(
        "irr-t17 irr-variants 3 C1",
        "Чем отличаются «I've got a car» и «I've gotten a car» в AmE?",
        ["Have got = иметь (состояние); have gotten = получил/приобрёл (результат).", "В AmE gotten — V3 в динамическом значении."],
        ["Ничем.", "Значение различается.", "MEANING"],
        ["Gotten — ошибка.", "В AmE — стандарт.", "THEORY"],
        ["Got — только BrE.", "Have got используется и в AmE.", "THEORY"],
        { ce: "BrE: I've got a car (имею) — и для «получил» тоже got." }
      ),
      TS(
        "irr-t18 irr-variants 2 C1",
        "Почему «a proven track record» звучит естественнее, чем «a proved track record»?",
        ["Proven — предпочтительная форма как прилагательное перед существительным.", "Как глагольная форма proved и proven обе возможны."],
        ["Proved — ошибочная форма.", "Proved — нормальная V2/V3.", "FORM"],
        ["Proven — только AmE V2.", "V2 — proved.", "FORM"],
        ["Никакой разницы нет.", "В роли прилагательного proven заметно частотнее.", "COLLOCATION"],
        { ce: "It has been proved / proven that... — обе формы встречаются." }
      )
    ]),
    L("irr-confusing", "Пары-ловушки: lie/lay, rise/raise, fall/fell, find/found", "Различать глаголы с пересекающимися формами по значению и переходности.", [
      p("Некоторые пары путают, потому что формы одного глагола совпадают с формами другого."),
      tb(["Глагол", "Формы", "Значение", "Объект"], [
        ["lie", "lie — lay — lain", "лежать", "без объекта"],
        ["lay", "lay — laid — laid", "класть", "с объектом: lay sth"],
        ["lie (лгать)", "lie — lied — lied", "лгать", "правильный"],
        ["rise", "rise — rose — risen", "подниматься (само)", "без объекта"],
        ["raise", "raise — raised — raised", "поднимать (что-то)", "с объектом"],
        ["fall", "fall — fell — fallen", "падать", "без объекта"],
        ["fell", "fell — felled — felled", "рубить (дерево)", "с объектом"],
        ["find", "find — found — found", "находить", ""],
        ["found", "found — founded — founded", "основывать", "с объектом"]
      ]),
      ex(
        ["He lay on the sofa all day.", "Он весь день лежал на диване.", "lay = V2 от lie"],
        ["She laid the papers on the desk.", "Она положила бумаги на стол.", "laid = V2 от lay"],
        ["The company was founded in 1998.", "Компания основана в 1998 году.", "found — правильный"]
      ),
      warn("Lay — одновременно V1 «класть» и V2 «лежал». Смотрите на наличие объекта.")
    ], [
      TS(
        "irr-t19 irr-confusing 2 C1",
        "Почему верно «Yesterday I lay in bed all morning», а не «laid»?",
        ["Lie (лежать) — lay — lain; объекта нет, поэтому V2 от lie: lay.", "Laid — V2 от lay (класть), требует объекта."],
        ["Laid тоже верно в этом значении.", "Laid требует объекта: laid the book.", "FORM"],
        ["Нужно lied.", "Lied — от lie (лгать).", "VOCAB_MEANING"],
        ["Нужно lain.", "Lain — V3, нужен have.", "FORM"],
        { ce: "Yesterday I laid the book on the bed — есть объект: laid." }
      ),
      TS(
        "irr-t20 irr-confusing 2 B2",
        "Почему «The company raised by 10%» звучит неверно?",
        ["Raise требует объекта; «вырасти» без объекта — rise: The company's revenue rose by 10%.", "Rise — непереходный, raise — переходный."],
        ["Нужно raisen.", "Raise — правильный глагол.", "FORM"],
        ["Нужно has raised.", "Перфект не исправляет отсутствие объекта.", "FORM"],
        ["Ошибки нет.", "Без объекта raise не используется.", "VOCAB_MEANING"],
        { ce: "The company raised prices by 10% — есть объект." }
      ),
      TS(
        "irr-t21 irr-confusing 2 B2",
        "Что значит «The firm was found in 1990»?",
        ["Буквально «фирму нашли в 1990» — для «основана» нужно was founded.", "Found (основывать) — правильный: founded."],
        ["Фирма основана в 1990.", "Это смысл was founded.", "VOCAB_MEANING"],
        ["Фирма закрылась в 1990.", "Нет.", "VOCAB_MEANING"],
        ["Ошибки нет.", "Found как V3 от find означает «найдена».", "VOCAB_MEANING"],
        { ce: "The firm was founded in 1990." }
      )
    ]),
    L("irr-pron", "Произношение форм и окончание -ed", "Правильно произносить частые неправильные формы и -ed у правильных глаголов.", [
      p("Многие неправильные формы читаются не так, как пишутся: _read_ /red/ (V2, V3), _said_ /sed/, _meant_ /ment/, _dealt_ /delt/, _bought, brought, thought, caught, taught_ — /ɔːt/, _won_ /wʌn/, _done_ /dʌn/."),
      tb(["Окончание -ed у правильных", "Когда", "Примеры"], [
        ["/t/", "после глухих звуков (p, k, f, s, ʃ, tʃ)", "worked, stopped, fixed, watched"],
        ["/d/", "после звонких и гласных", "planned, called, played, changed"],
        ["/ɪd/", "после t и d", "wanted, needed, started, decided"]
      ]),
      ex(
        ["I've read it twice. /red/", "Я прочитал это дважды.", ""],
        ["We started at nine. /ˈstɑːtɪd/", "Мы начали в девять.", "лишний слог только после t/d"]
      ),
      tip("Приложение не проверяет произношение голосом: оно не может надёжно оценить речь офлайн. Здесь — только теория и задания на распознавание.")
    ], [
      TS(
        "irr-t22 irr-pron 2 B2",
        "В каком слове -ed произносится как отдельный слог /ɪd/?",
        ["decided", "После d — /ɪd/."],
        ["worked", "После k — /t/.", "THEORY"],
        ["played", "После гласного — /d/.", "THEORY"],
        ["changed", "После /dʒ/ — /d/.", "THEORY"],
        { ce: "wanted — тоже /ɪd/ (после t)." }
      ),
      TS(
        "irr-t23 irr-pron 2 B2",
        "Как произносится read в «I read it yesterday»?",
        ["/red/ — как red", "V2 и V3 от read пишутся так же, но читаются /red/."],
        ["/riːd/ — как reed", "Это V1.", "THEORY"],
        ["/reɪd/", "Не существует.", "THEORY"],
        ["/rɪd/", "Не существует.", "THEORY"],
        { ce: "I read every day /riːd/ — Present Simple." }
      ),
      TS(
        "irr-t24 irr-pron 3 C1",
        "Почему «I've won» и «one» звучат одинаково?",
        ["Won произносится /wʌn/ — так же, как one.", "Орфография не отражает звук."],
        ["Потому что won — ошибка написания one.", "Это разные слова.", "SPELLING"],
        ["Они звучат по-разному: /wɒn/ и /wʌn/.", "Стандартное произношение won — /wʌn/.", "THEORY"],
        ["Потому что win — правильный глагол.", "Win неправильный.", "FORM"],
        { ce: "Want /wɒnt/ — другой гласный." }
      )
    ])
  ], practice2 = [
    I2("irr-001 irr-roles 1 B2", "Have you ever ___ (eat) sushi?", ["eaten"], "Have + V3: eat — ate — eaten.", "FORM", [[["ate"], "FORM", "Ate — V2; после have нужен V3."], [["eated"], "FORM", "Eat — неправильный глагол."]]),
    I2("irr-002 irr-roles 1 B2", "Did you ___ (send) the invoice?", ["send"], "После did — V1.", "FORM", [[["sent"], "FORM", "После did — V1, а не V2."], [["sended"], "FORM", "Send — неправильный, и после did всё равно V1."]]),
    S(
      "irr-003 irr-roles 1 B2",
      "The contract was ___ by both parties.",
      ["signed", "Пассив: was + V3 (правильный глагол)."],
      ["sign", "После was нужен V3.", "FORM"],
      ["signing", "Was signing — Past Continuous актив.", "FORM"],
      ["sang", "Это V2 от sing.", "VOCAB_MEANING"]
    ),
    FX("irr-004 irr-roles 1 B2", "Найдите и исправьте ошибку.", ["The report", { t: "was wrote", fix: ["was written"], tag: "FORM" }, "by our analyst", "last week."], "Пассив: was + V3 (written)."),
    S(
      "irr-005 irr-aaa 1 B2",
      "Last year the company ___ prices twice.",
      ["cut", "AAA: cut — cut — cut; last year → Past Simple."],
      ["cutted", "Cut — неправильный.", "FORM"],
      ["cuts", "-s — настоящее время.", "TIMELINE"],
      ["has cut", "Last year несовместим с Present Perfect.", "TIMELINE"]
    ),
    I2("irr-006 irr-aaa 1 B2", "My manager ___ (let) me leave early yesterday.", ["let"], "AAA: let — let — let.", "FORM", [[["letted"], "FORM", "Let — неправильный."], [["lets"], "TIMELINE", "Yesterday → прошедшее."]]),
    S(
      "irr-007 irr-aaa 2 B2",
      "How much did the repairs ___?",
      ["cost", "После did — V1 (cost)."],
      ["costed", "Cost (стоить) — неправильный AAA.", "FORM"],
      ["costs", "После did — без -s.", "AGREEMENT"],
      ["costing", "Нужна форма V1.", "FORM"]
    ),
    FX("irr-008 irr-aaa 2 B2", "Найдите и исправьте ошибку.", ["The rumour", { t: "spreaded", fix: ["spread"], tag: "FORM" }, "quickly", "across the office."], "Spread — AAA."),
    S(
      "irr-009 irr-abb 1 B2",
      "I ___ a new laptop last week.",
      ["bought", "Buy — bought — bought."],
      ["brought", "Это от bring.", "VOCAB_MEANING"],
      ["buyed", "Buy — неправильный.", "FORM"],
      ["buy", "Нужна форма прошедшего.", "FORM"]
    ),
    I2("irr-010 irr-abb 1 B2", "She ___ (teach) English in Spain for two years.", ["taught"], "Teach — taught — taught.", "FORM", [[["teached"], "FORM", "Teach — неправильный."], [["thought"], "VOCAB_MEANING", "Thought — от think."]]),
    I2("irr-011 irr-abb 2 B2", "We have ___ (spend) too much on travel this quarter.", ["spent"], "Spend — spent — spent.", "FORM", [[["spended"], "FORM", "Spend — неправильный."]]),
    FX("irr-012 irr-abb 1 B2", "Найдите и исправьте ошибку.", ["We", { t: "payed", fix: ["paid"], tag: "SPELLING" }, "the supplier", "on time."], "Pay — paid — paid."),
    S(
      "irr-013 irr-abb 2 B2",
      "I've ___ about your proposal and I like it.",
      ["thought", "Think — thought — thought."],
      ["thinked", "Think — неправильный.", "FORM"],
      ["taught", "Это от teach.", "VOCAB_MEANING"],
      ["thank", "Это другой глагол.", "VOCAB_MEANING"]
    ),
    I2("irr-014 irr-abb 2 B2", "The conference was ___ (hold) in Almaty.", ["held"], "Hold — held — held.", "FORM", [[["holded"], "FORM", "Hold — неправильный."], [["hold"], "FORM", "После was нужен V3."]]),
    S(
      "irr-015 irr-abb 2 B2",
      "They ___ the tender, so we've lost the contract.",
      ["won", "Win — won — won."],
      ["winned", "Win — неправильный.", "FORM"],
      ["win", "Нужна форма прошедшего.", "FORM"],
      ["wan", "Такой формы нет.", "FORM"]
    ),
    S(
      "irr-016 irr-abc 1 B2",
      "The meeting had already ___ when I arrived.",
      ["begun", "Had + V3: begin — began — begun."],
      ["began", "V2 после had не используется.", "FORM"],
      ["beginned", "Неправильный глагол.", "FORM"],
      ["begin", "После had нужен V3.", "FORM"]
    ),
    I2("irr-017 irr-abc 1 B2", "I've ___ (write) three drafts already.", ["written"], "Write — wrote — written.", "FORM", [[["wrote"], "FORM", "V2 после have не используется."], [["writen"], "SPELLING", "Двойная t: written."]]),
    I2("irr-018 irr-abc 1 B2", "Have you ___ (speak) to the client yet?", ["spoken"], "Speak — spoke — spoken.", "FORM", [[["spoke"], "FORM", "Spoke — V2."], [["speaked"], "FORM", "Speak — неправильный."]]),
    FX("irr-019 irr-abc 1 B2", "Найдите и исправьте ошибку.", ["She", { t: "has went", fix: ["has gone"], tag: "FORM" }, "to the bank."], "Go — went — gone."),
    S(
      "irr-020 irr-abc 2 B2",
      "Our team has ___ from 5 to 40 people.",
      ["grown", "Grow — grew — grown."],
      ["grew", "V2 после has не используется.", "FORM"],
      ["growed", "Неправильный глагол.", "FORM"],
      ["growing", "Has growing — неверно.", "FORM"]
    ),
    I2("irr-021 irr-abc 2 B2", "I've never ___ (fly) business class.", ["flown"], "Fly — flew — flown.", "FORM", [[["flew"], "FORM", "V2."], [["flied"], "FORM", "Fly — неправильный."]]),
    S(
      "irr-022 irr-abc 2 B2",
      "My bike was ___ outside the office.",
      ["stolen", "Пассив: steal — stole — stolen."],
      ["stole", "V2 в пассиве не используется.", "FORM"],
      ["stealed", "Неправильный.", "FORM"],
      ["steal", "После was — V3.", "FORM"]
    ),
    I2("irr-023 irr-abc 2 B2", "Prices have ___ (rise) by 8% this year.", ["risen"], "Rise — rose — risen.", "FORM", [[["rose"], "FORM", "V2."], [["raised"], "VOCAB_MEANING", "Raise требует объекта (поднимать что-то)."], [["rised"], "FORM", "Rise — неправильный."]]),
    FX("irr-024 irr-abc 2 B2", "Найдите и исправьте ошибку.", ["I", "have", { t: "drank", fix: ["drunk"], tag: "FORM" }, "four coffees today."], "Drink — drank — drunk."),
    S(
      "irr-025 irr-aba 1 B2",
      "She has ___ one of our best engineers.",
      ["become", "Become — became — become."],
      ["became", "V2 после has.", "FORM"],
      ["becomed", "Неправильный.", "FORM"],
      ["becoming", "Неверно после has.", "FORM"]
    ),
    I2("irr-026 irr-aba 2 B2", "We had ___ (run) out of time before we reached the last slide.", ["run"], "Run — ran — run (ABA).", "FORM", [[["ran"], "FORM", "Ran — V2."], [["runned"], "FORM", "Run — неправильный."]]),
    FX("irr-027 irr-aba 2 B2", "Найдите и исправьте ошибку.", ["Many guests", "had", { t: "came", fix: ["come"], tag: "FORM" }, "from abroad."], "Come — came — come."),
    S(
      "irr-028 irr-variants 2 B2",
      "Which sentence is NOT standard English?",
      ["She has went to Paris.", "Went — V2; V3 — gone."],
      ["I've learnt a lot.", "Стандарт BrE.", "THEORY"],
      ["I've learned a lot.", "Стандарт.", "THEORY"],
      ["The toast is burnt.", "Стандарт.", "THEORY"]
    ),
    M(
      "irr-029 irr-variants 3 C1",
      "Выберите 2 стандартные формы Past Simple от dream.",
      ["dreamt", !0, "BrE."],
      ["dreamed", !0, "BrE и AmE."],
      ["drempt", !1, "Не существует.", "SPELLING"],
      ["drame", !1, "Не существует.", "FORM"],
      ["dreamen", !1, "Не существует.", "FORM"]
    ),
    S(
      "irr-030 irr-variants 2 C1",
      "(AmE) Her English has ___ much better since she moved to Boston.",
      ["gotten", "AmE: get — got — gotten в значении «стать»."],
      ["getted", "Неправильный глагол.", "FORM"],
      ["gotted", "Не существует.", "FORM"],
      ["get", "После has нужен V3.", "FORM"],
      { note: "В BrE: has got much better." }
    ),
    S(
      "irr-031 irr-confusing 2 C1",
      "She ___ the documents on the desk and left.",
      ["laid", "Lay (класть) — laid — laid; есть объект."],
      ["lay", "Lay как V2 — от lie (лежать), без объекта.", "VOCAB_MEANING"],
      ["lied", "Lied — от lie (лгать).", "VOCAB_MEANING"],
      ["layed", "Орфография: laid.", "SPELLING"]
    ),
    S(
      "irr-032 irr-confusing 2 C1",
      "I was so tired that I ___ down for an hour.",
      ["lay", "Lie (лежать) — lay — lain; без объекта."],
      ["laid", "Laid требует объекта.", "VOCAB_MEANING"],
      ["lied", "Это «лгал».", "VOCAB_MEANING"],
      ["lain", "V3 требует had.", "FORM"]
    ),
    S(
      "irr-033 irr-confusing 2 B2",
      "The company was ___ in 2009 by two former bankers.",
      ["founded", "Found (основывать) — founded — founded."],
      ["found", "Found = V3 от find (найдена).", "VOCAB_MEANING"],
      ["finded", "Не существует.", "FORM"],
      ["funded", "Funded — профинансирована (другой глагол).", "VOCAB_MEANING"]
    ),
    S(
      "irr-034 irr-confusing 2 B2",
      "Inflation ___ sharply last month.",
      ["rose", "Rise — rose — risen; без объекта."],
      ["raised", "Raise требует объекта.", "VOCAB_MEANING"],
      ["rised", "Неправильный глагол.", "FORM"],
      ["arose", "Arose = возник (проблема), не «вырос».", "VOCAB_MEANING"]
    ),
    S(
      "irr-035 irr-confusing 3 C1",
      "The government has ___ taxes again.",
      ["raised", "Raise + объект (taxes)."],
      ["risen", "Rise без объекта.", "VOCAB_MEANING"],
      ["rose", "V2 и без объекта.", "FORM"],
      ["arisen", "Arise — возникать.", "VOCAB_MEANING"]
    ),
    MA(
      "irr-036 irr-abc 2 B2",
      "Распределите глаголы по моделям.",
      ["AAA", "ABB", "ABA", "ABC"],
      [
        ["put", 0],
        ["shut", 0],
        ["bring", 1],
        ["keep", 1],
        ["come", 2],
        ["run", 2],
        ["write", 3],
        ["know", 3]
      ],
      "AAA — все формы одинаковы; ABB — V2=V3; ABA — V1=V3; ABC — все разные.",
      "FORM"
    ),
    MA(
      "irr-037 irr-pron 2 B2",
      "Распределите по произношению окончания -ed.",
      ["/t/", "/d/", "/ɪd/"],
      [
        ["worked", 0],
        ["fixed", 0],
        ["called", 1],
        ["planned", 1],
        ["needed", 2],
        ["started", 2]
      ],
      "После t/d — /ɪd/; после глухих — /t/; после звонких и гласных — /d/.",
      "THEORY"
    ),
    S(
      "irr-038 irr-pron 2 B2",
      "Which form is pronounced /sed/?",
      ["said", "Said произносится /sed/."],
      ["sad", "Это прилагательное /sæd/.", "VOCAB_MEANING"],
      ["sayed", "Ошибочная форма.", "SPELLING"],
      ["seed", "Это другое слово.", "VOCAB_MEANING"]
    ),
    O("irr-039 irr-roles 2 B2", "Постройте пассивное предложение: «Решение было принято вчера».", ["The", "decision", "was", "made", "yesterday"], "Пассив Past Simple: was + V3 (made).", "STRUCTURE"),
    O("irr-040 irr-abc 2 B2", "Постройте: «Ты когда-нибудь видел северное сияние?»", ["Have", "you", "ever", "seen", "the", "northern", "lights", "?"], "Have + подлежащее + ever + V3 (seen).", "STRUCTURE"),
    I2("irr-041 irr-abb 2 C1", "The new manager ___ (seek) advice from the board before making changes.", ["sought"], "Seek — sought — sought.", "FORM", [[["seeked"], "FORM", "Seek — неправильный."], [["saught"], "SPELLING", "Правильно: sought."]]),
    I2("irr-042 irr-abc 2 C1", "A problem has ___ (arise) with the payment system.", ["arisen"], "Arise — arose — arisen.", "FORM", [[["arose"], "FORM", "V2."], [["arised"], "FORM", "Неправильный."], [["risen"], "VOCAB_MEANING", "Risen — от rise (подниматься)."]]),
    I2("irr-043 irr-abc 2 C1", "All travel costs will be ___ (bear) by the client.", ["borne"], "Bear (нести расходы) — bore — borne.", "FORM", [[["born"], "SPELLING", "Born — только «рождён»."], [["beared"], "FORM", "Bear — неправильный."]]),
    S(
      "irr-044 irr-abc 2 B2",
      "They ___ the offer at the last minute.",
      ["withdrew", "Withdraw — withdrew — withdrawn."],
      ["withdrawed", "Неправильный.", "FORM"],
      ["withdrawn", "V3 без have.", "FORM"],
      ["withdraw", "Нужно прошедшее.", "FORM"]
    )
  ], ru = (v) => v.russian.split(";")[0], drills = [];
  IRREGULAR.forEach((v) => {
    drills.push({
      id: v.id + "-v2",
      v: 1,
      sub: "irr-forms",
      kind: "practice",
      type: "input",
      level: "B2",
      diff: 1,
      skill: "form",
      prompt: "".concat(v.v1, " (").concat(ru(v), ") → V2 (Past Simple)"),
      accept: v.v2.slice(),
      explain: "".concat(v.v1, " — ").concat(v.v2.join("/"), " — ").concat(v.v3.join("/"), ". ").concat(v.usageNotes || "").trim(),
      tag: "FORM",
      rules: [[v.v3.filter((x) => !v.v2.includes(x)), "FORM", "Это V3, а нужна форма Past Simple."], [[v.v1 + "ed", v.v1 + "d"].filter((x) => !v.v2.includes(x)), "FORM", "Глагол неправильный: окончание -ed не подходит."]].filter((r) => r[0].length),
      drill: "v1v2",
      verb: v.id
    }), drills.push({
      id: v.id + "-v3",
      v: 1,
      sub: "irr-forms",
      kind: "practice",
      type: "input",
      level: "B2",
      diff: 1,
      skill: "form",
      prompt: "".concat(v.v1, " (").concat(ru(v), ") → V3 (Past Participle)"),
      accept: v.v3.slice(),
      explain: "".concat(v.v1, " — ").concat(v.v2.join("/"), " — ").concat(v.v3.join("/"), ". ").concat(v.usageNotes || "").trim(),
      tag: "FORM",
      rules: [[v.v2.filter((x) => !v.v3.includes(x)), "FORM", "Это V2, а нужна форма V3."], [[v.v1 + "ed", v.v1 + "d"].filter((x) => !v.v3.includes(x)), "FORM", "Глагол неправильный: окончание -ed не подходит."]].filter((r) => r[0].length),
      drill: "v1v3",
      verb: v.id
    });
    let shown = v.v3[0] !== v.v1 ? v.v3[0] : v.v2[0];
    shown !== v.v1 && drills.push({
      id: v.id + "-back",
      v: 1,
      sub: "irr-forms",
      kind: "practice",
      type: "input",
      level: "B2",
      diff: 2,
      skill: "form",
      prompt: "".concat(shown, " (").concat(ru(v), ") → V1"),
      accept: [v.v1],
      explain: "".concat(v.v1, " — ").concat(v.v2.join("/"), " — ").concat(v.v3.join("/"), "."),
      tag: "FORM",
      rules: [],
      drill: "back",
      verb: v.id
    });
  });
  var formsLesson = L("irr-forms", "Тренажёр форм V1 → V2 → V3", "Автоматизировать формы всех 120 неправильных глаголов в трёх направлениях.", [
    p("Это банк форм для тренировки в трёх направлениях: **V1 → V2**, **V1 → V3** и **V2/V3 → V1**. В скобках стоит перевод — он снимает неоднозначность (например, _found_ — это и V2 от find, и самостоятельный глагол «основывать»; _lay_ — и «класть», и V2 от lie)."),
    tip("Для вариантов (learnt/learned, got/gotten) принимается любая стандартная форма. В контрольном тесте форменные задания комбинируются с контекстными предложениями.")
  ], []);
  lessons2.push(formsLesson);
  var b02_irregular_default = block({
    id: "irregular",
    n: 2,
    title: "Неправильные глаголы",
    short: "V1/V2/V3, модели, варианты, ловушки",
    blueprint: { size: 26, theory: 4, drills: 8 }
  }, lessons2, practice2.concat(drills));

  // src/content/blocks/b03-modals.js
  var lessons3 = [
    L("mod-basics", "Как устроены модальные глаголы", "Знать формальные свойства модальных глаголов и их «заменителей» (have to, be able to, need to).", [
      p("Чистые модальные глаголы (**can, could, may, might, must, shall, should, will, would**) не изменяются по лицам (_she can_, не _she cans_), после них идёт **инфинитив без to**, вопрос и отрицание строятся без do: _Can you...? You mustn't..._ У них нет форм прошедшего времени и инфинитива, поэтому для других времён используются заменители: _have to, be able to, be allowed to, need to_."),
      tb(["Модальный", "Заменитель для других форм", "Пример"], [
        ["can", "be able to", "I'll be able to join tomorrow. I've never been able to whistle."],
        ["must", "have to", "We had to cancel the trip. You'll have to wait."],
        ["may (разрешение)", "be allowed to", "We weren't allowed to take photos."]
      ]),
      f("modal + V1 → действие в настоящем/будущем: She might come."),
      f("modal + be + V-ing → процесс сейчас: He must be working."),
      f("modal + have + V3 → взгляд на прошлое: They must have left."),
      ex(
        ["She can speak three languages.", "Она говорит на трёх языках.", "без -s, без to"],
        ["Do we have to bring laptops?", "Нам нужно брать ноутбуки?", "have to — обычный глагол: нужен do"],
        ["You needn't come. / You don't need to come.", "Можешь не приходить.", "need: модальный и обычный варианты"]
      ),
      warn("Две модальные подряд невозможны: ~~will can~~ → _will be able to_.")
    ], [
      TS(
        "mod-t01 mod-basics 1 B2",
        "Почему неверно «She musts finish today»?",
        ["Модальные глаголы не принимают -s в 3-м лице.", "Модальные не изменяются по лицам: She must finish."],
        ["Потому что после must нужен to.", "После must — инфинитив без to.", "FORM"],
        ["Потому что must не используется с she.", "Must используется с любым лицом.", "AGREEMENT"],
        ["Потому что нужно She has must finish.", "Такой конструкции нет.", "FORM"],
        { ce: "She has to finish today — have to обычный глагол, поэтому has." }
      ),
      TS(
        "mod-t02 mod-basics 2 B2",
        "Как правильно сказать «Я смогу прийти завтра»?",
        ["I'll be able to come tomorrow.", "Will + can невозможно; будущее выражается заменителем be able to."],
        ["I'll can come tomorrow.", "Две модальные подряд недопустимы.", "FORM"],
        ["I can to come tomorrow.", "После can — без to.", "FORM"],
        ["I'm can come tomorrow.", "Be + can — несуществующая конструкция.", "FORM"],
        { ce: "I can come tomorrow — тоже возможно: can описывает решение о будущем «сейчас»." }
      ),
      TS(
        "mod-t03 mod-basics 2 C1",
        "Что выражает конструкция modal + have + V3 (must have left)?",
        ["Оценку или комментарий к событию в прошлом с точки зрения настоящего.", "Модальность (уверенность, критика) — сейчас, событие — в прошлом."],
        ["Обязанность в прошлом.", "Обязанность в прошлом — had to.", "MODALITY"],
        ["Будущее совершённое действие.", "Это функция will have + V3.", "TIMELINE"],
        ["Пассив в прошлом.", "Пассив — have been + V3.", "FORM"],
        { ce: "He had to leave early = был обязан; He must have left early = я уверен, что он ушёл." }
      )
    ]),
    L("mod-ability", "Способность: can, could, be able to", "Различать общую способность в прошлом (could) и успешное разовое действие (was able to / managed to).", [
      p("**Can** — способность или возможность сейчас. **Could** — общая способность в прошлом (_I could swim when I was five_). Для **конкретного успешного действия** в прошлом в утверждении используют **was able to / managed to**, а не could: _The firefighters were able to rescue everyone._ В отрицании couldn't возможно для обоих случаев: _I couldn't open the file._"),
      tb(["Ситуация", "Форма"], [
        ["Общая способность в прошлом", "could / was able to"],
        ["Разовый успех в прошлом (+)", "was able to / managed to"],
        ["Разовая неудача в прошлом (−)", "couldn't / wasn't able to"],
        ["Глаголы восприятия", "could see / hear / smell (даже для разового случая)"]
      ]),
      ex(
        ["Despite the traffic, we managed to catch the flight.", "Несмотря на пробки, мы успели на рейс.", "разовый успех"],
        ["I could hear voices next door.", "Я слышал голоса за стеной.", "восприятие → could"],
        ["She hasn't been able to sleep well lately.", "Она в последнее время плохо спит.", "Present Perfect → be able to"]
      ),
      tip("Could также выражает возможность сейчас/в будущем и вежливость — не путайте с прошлым.")
    ], [
      TS(
        "mod-t04 mod-ability 2 B2",
        "Почему «After hours of searching, we could find the bug» звучит неестественно?",
        ["Для разового успеха в прошлом используют was able to / managed to.", "Could в утверждении — общая способность, а не однократный результат."],
        ["Потому что could никогда не означает прошлое.", "Could — прошлое от can для общей способности.", "THEORY"],
        ["Потому что find — неправильный глагол.", "Не влияет на выбор.", "THEORY"],
        ["Потому что после could нужен V3.", "После could — V1; could have + V3 — другой смысл.", "FORM"],
        { ce: "We couldn't find the bug — в отрицании couldn't естественно." }
      ),
      TS(
        "mod-t05 mod-ability 2 B2",
        "В каком случае could для разового события в прошлом допустим в утверждении?",
        ["С глаголами восприятия: I could see the coast from the plane.", "See/hear/smell/feel/understand — исключение."],
        ["С любым глаголом, если есть yesterday.", "Маркер не снимает ограничение.", "THEORY"],
        ["Только в вопросах.", "Ограничение касается утверждения; вопросы — отдельный случай, но не единственное исключение.", "THEORY"],
        ["Никогда.", "Глаголы восприятия — устойчивое исключение.", "THEORY"],
        { ce: "I could reach him on the phone at last — неестественно; лучше I managed to reach him." }
      ),
      TS(
        "mod-t06 mod-ability 1 B2",
        "Какая форма нужна в «I've never ___ understand his handwriting»?",
        ["been able to", "После have/has (Perfect) нужен заменитель be able to."],
        ["could", "Could не имеет формы V3.", "FORM"],
        ["can", "Can нельзя ставить после have.", "FORM"],
        ["managed", "Managed to + V1 возможен, но в пропуске нужна форма be able to перед understand без to.", "FORM"],
        { ce: "I could never understand his handwriting — тоже верно, но без Perfect." }
      )
    ]),
    L("mod-permission", "Разрешение и просьбы", "Выбирать форму просьбы и разрешения по степени вежливости и регистру.", [
      p("**Can I...?** — нейтрально, разговорно. **Could I...?** — вежливее. **May I...?** — формально, вежливо. В ответе разрешения обычно используют can (_Yes, you can_), запрет — **can't** или **mustn't** (строже). Просьба к другому: _Can you / Could you / Would you / Would you mind + V-ing?_"),
      tb(["Задача", "Нейтрально", "Вежливо / формально"], [
        ["Попросить разрешения", "Can I leave early?", "Could I / May I leave early?"],
        ["Попросить сделать", "Can you send it?", "Could you send it? Would you mind sending it?"],
        ["Разрешение в прошлом", "We could wear jeans on Fridays.", "We were allowed to..."],
        ["Разовое разрешение в прошлом", "—", "We were allowed to leave early yesterday. (не could)"]
      ]),
      ex(
        ["Would you mind if I opened the window?", "Вы не возражаете, если я открою окно?", "very polite + past"],
        ["Visitors may not use the staff entrance.", "Посетителям запрещено пользоваться служебным входом.", "may not — официальный запрет"]
      ),
      warn("На «Would you mind...?» согласие выражается отрицанием: «No, not at all» = «пожалуйста, не возражаю».")
    ], [
      TS(
        "mod-t07 mod-permission 2 B2",
        "Что значит ответ «Not at all» на «Would you mind closing the door?»",
        ["Согласие: «Нисколько не возражаю, закрою».", "Mind = возражать; отрицание означает отсутствие возражений."],
        ["Отказ закрыть дверь.", "Отказ выразили бы: Sorry, I'd rather not / Actually, I'm cold.", "MEANING"],
        ["Что дверь уже закрыта.", "Ответ не сообщает об этом.", "MEANING"],
        ["Просьбу повторить вопрос.", "Не связано с вопросом.", "MEANING"],
        { ce: "Yes, I do mind — буквально «да, я возражаю» = отказ." }
      ),
      TS(
        "mod-t08 mod-permission 2 C1",
        "Почему «Yesterday we could leave early» хуже, чем «Yesterday we were allowed to leave early»?",
        ["Разовое разрешение в прошлом передаётся was/were allowed to; could — общее разрешение.", "Ограничение похоже на could/was able to для способности."],
        ["Потому что could не выражает разрешение.", "Could выражает общее разрешение в прошлом: As kids we could stay up late on Fridays.", "THEORY"],
        ["Потому что yesterday требует Present Perfect.", "Yesterday требует Past Simple.", "TIMELINE"],
        ["Оба варианта одинаково нейтральны.", "Could для разового разрешения в утверждении звучит неестественно.", "THEORY"],
        { ce: "At my last job we could work from home on Fridays — общее правило → could." }
      ),
      TS(
        "mod-t09 mod-permission 1 B2",
        "Какая просьба звучит наиболее формально и вежливо?",
        ["May I ask you a few questions?", "May I — формальная вежливая просьба о разрешении."],
        ["Can I ask you a few questions?", "Нейтрально-разговорно.", "REGISTER"],
        ["I want to ask you a few questions.", "Прямолинейно, без смягчения.", "REGISTER"],
        ["Let me ask you some questions, OK?", "Разговорно и напористо.", "REGISTER"],
        { ce: "Can I ask you something? — нормально среди коллег, но не на официальном интервью." }
      )
    ]),
    L("mod-obligation", "Обязанность: must, have to, need to; mustn't vs don't have to", "Разделять внутреннюю/внешнюю обязанность, запрет и отсутствие необходимости.", [
      p("**Must** часто выражает обязанность с точки зрения говорящего (правило, которое он поддерживает, или сильная рекомендация): _I must call my mum._ **Have to** — внешняя обязанность, обстоятельства: _I have to wear a uniform at work._ В письменных правилах **must** звучит официально: _Passengers must wear seat belts._ Во многих случаях оба возможны с небольшой разницей оттенка."),
      p("Главное различие — в **отрицании**: **mustn't** = нельзя (запрет); **don't have to / don't need to / needn't** = не обязательно."),
      tb(["Форма", "Смысл", "Пример"], [
        ["mustn't", "запрещено", "You mustn't share your password."],
        ["don't have to", "не обязательно", "You don't have to reply today."],
        ["needn't + V1", "не нужно (часто BrE)", "You needn't print it."],
        ["didn't need to", "не было необходимости (могли и не делать)", "I didn't need to pay — it was free."],
        ["needn't have + V3", "сделал, хотя не было нужно", "I needn't have paid — it turned out to be free."]
      ]),
      ex(
        ["We had to postpone the launch.", "Нам пришлось перенести запуск.", "прошлое — had to (must не имеет прошлого)"],
        ["You'll have to show your ID.", "Вам нужно будет показать удостоверение.", "будущее — will have to"]
      )
    ], [
      TS(
        "mod-t10 mod-obligation 1 B2",
        "В чём разница между «You mustn't tell him» и «You don't have to tell him»?",
        ["Первое — запрет (нельзя говорить), второе — отсутствие необходимости (можно не говорить).", "Отрицание must и have to даёт противоположные смыслы."],
        ["Разницы нет.", "Это одна из главных ловушек: смыслы противоположны.", "MODALITY"],
        ["Первое вежливее второго.", "Разница не в вежливости, а в смысле.", "MODALITY"],
        ["Второе — более строгий запрет.", "Don't have to — не запрет вообще.", "MODALITY"],
        { ce: "You don't have to come, but you can if you want." }
      ),
      TS(
        "mod-t11 mod-obligation 3 C1",
        "Чем отличаются «I didn't need to wait» и «I needn't have waited»?",
        ["Didn't need to: не ждал (или неважно); needn't have waited: ждал, но зря.", "Needn't have + V3 сообщает, что действие было, хотя не требовалось."],
        ["Одинаковы по смыслу.", "Различаются фактом совершения действия.", "MODALITY"],
        ["Первое — о будущем, второе — о прошлом.", "Оба — о прошлом.", "TIMELINE"],
        ["Второе — запрет в прошлом.", "Запрет в прошлом — wasn't allowed to.", "MODALITY"],
        { ce: "I needn't have bought a ticket — entry was free (но купил)." }
      ),
      TS(
        "mod-t12 mod-obligation 2 B2",
        "Почему нельзя сказать «Yesterday I must work late»?",
        ["У must нет формы прошедшего времени; нужно I had to work late.", "Прошлая обязанность — had to."],
        ["Потому что must только для будущего.", "Must относится к настоящему/будущему, но дело в отсутствии формы прошлого.", "THEORY"],
        ["Потому что нужно I must have worked late.", "Это дедукция: «наверное, я работал».", "MODALITY"],
        ["Потому что late требует Continuous.", "Не связано.", "THEORY"],
        { ce: "She said she must leave — в косвенной речи must допустим (после said)." }
      )
    ]),
    L("mod-advice", "Совет и рекомендация: should, ought to, had better", "Выбирать между мягким советом и предупреждением с последствиями.", [
      p("**Should / ought to** — совет, мнение о правильном: _You should update your CV._ Ought to чуть формальнее и реже в вопросах/отрицаниях. **Had better ('d better)** — сильный совет о конкретной ситуации с подразумеваемым неприятным последствием: _We'd better leave now, or we'll miss the train._"),
      tb(["Форма", "Оттенок", "Отрицание"], [
        ["should", "совет, мнение", "shouldn't"],
        ["ought to", "совет (формальнее)", "ought not to"],
        ["had better", "срочно, иначе будет плохо", "had better not"]
      ]),
      ex(
        ["You'd better not be late again.", "Лучше тебе больше не опаздывать.", "предупреждение"],
        ["Should I call him or wait?", "Мне позвонить ему или подождать?", "просьба о совете"],
        ["The parcel should arrive tomorrow.", "Посылка должна прийти завтра.", "should = ожидание, не совет"]
      ),
      warn("Had better — про настоящее/будущее, хотя had похож на прошедшее; после него инфинитив без to: ~~had better to go~~.")
    ], [
      TS(
        "mod-t13 mod-advice 2 B2",
        "Почему «You had better to call her» — ошибка?",
        ["После had better идёт инфинитив без to.", "Had better ведёт себя как модальный: You'd better call her."],
        ["Had better используется только в прошлом.", "Had better относится к настоящему/будущему.", "TIMELINE"],
        ["Нужно have better.", "Форма неизменна: had better.", "FORM"],
        ["После had better нужен V-ing.", "Нужен V1.", "FORM"],
        { ce: "You ought to call her — ought требует to." }
      ),
      TS(
        "mod-t14 mod-advice 2 C1",
        "Какое значение should в «The update should be ready by Friday»?",
        ["Ожидание, вероятный ход событий.", "Should также выражает ожидаемый результат."],
        ["Совет обновлению.", "Совет даётся людям; здесь прогноз.", "MODALITY"],
        ["Строгая обязанность.", "Обязанность — must/have to.", "MODALITY"],
        ["Условие.", "Should в условии — инверсия (Should it be ready...).", "MODALITY"],
        { ce: "You should check the update — совет." }
      ),
      TS(
        "mod-t15 mod-advice 2 B2",
        "Когда had better уместнее, чем should?",
        ["Когда есть конкретная срочная ситуация и подразумеваемое неприятное последствие.", "Had better — предупреждение «иначе плохо»."],
        ["Для общих жизненных советов.", "Общие советы — should.", "REGISTER"],
        ["Когда говорим о прошлом.", "Для прошлого — should have.", "TIMELINE"],
        ["В формальной письменной рекомендации.", "Had better разговорное и может звучать резко.", "REGISTER"],
        { ce: "People should exercise regularly — общий совет, had better звучало бы как угроза." }
      )
    ]),
    L("mod-deduction-present", "Логические выводы о настоящем", "Выражать степень уверенности о настоящем: must, can't, might, may, could.", [
      p("Модальные глаголы выражают **степень уверенности** в выводе. **Must** — уверен, что да (≈95%). **Can't** — уверен, что нет. **May / might / could** — возможно (около 30–50%). Обратите внимание: противоположность must в дедукции — **can't**, а не mustn't."),
      tb(["Уверенность", "Утверждение", "Отрицание"], [
        ["почти уверен", "must be", "can't be / couldn't be"],
        ["возможно", "may / might / could be", "may not / might not be"],
        ["процесс сейчас", "must be working", "can't be working"]
      ]),
      ex(
        ["The lights are on — they must be at home.", "Свет горит — они наверняка дома.", "вывод по признаку"],
        ["That can't be Anna — she's in London.", "Это не может быть Анна — она в Лондоне.", "уверенность «нет»"],
        ["He might be stuck in traffic.", "Возможно, он застрял в пробке.", "предположение"]
      ),
      warn("Could not be и may not be различаются: _It may not be true_ (возможно, неправда) vs _It couldn't be true_ (не может быть правдой).")
    ], [
      TS(
        "mod-t16 mod-deduction-present 2 B2",
        "Почему «He mustn't be at home — his car's gone» неверно для логического вывода?",
        ["В дедукции отрицание must — can't: He can't be at home.", "Mustn't выражает запрет, а не уверенность «нет»."],
        ["Потому что нужно He doesn't have to be at home.", "Это отсутствие необходимости.", "MODALITY"],
        ["Потому что must не используется для выводов.", "Must — основной модальный для выводов «да».", "THEORY"],
        ["Ошибки нет.", "В BrE mustn't в дедукции считается ошибкой; AmE иногда допускает must not, но can't — нейтральный стандарт.", "THEORY"],
        { ce: "He must be at home — his car's outside (уверенный вывод «да»)." }
      ),
      TS(
        "mod-t17 mod-deduction-present 2 C1",
        "Чем «It may not be true» отличается от «It can't be true»?",
        ["May not — возможно, неправда; can't — уверен, что неправда.", "Разная степень уверенности."],
        ["Ничем.", "Уверенность разная.", "MODALITY"],
        ["May not — запрет.", "Здесь это вероятность.", "MODALITY"],
        ["Can't — неспособность.", "Здесь это вывод.", "MODALITY"],
        { ce: "It might be true — возможно, правда." }
      ),
      TS(
        "mod-t18 mod-deduction-present 2 B2",
        "Какая форма выражает вывод о процессе, идущем сейчас?",
        ["must be + V-ing: She must be sleeping.", "Модальный + be + V-ing — процесс сейчас."],
        ["must + V-ing: She must sleeping.", "Пропущен be.", "FORM"],
        ["must have slept", "Это вывод о прошлом.", "TIMELINE"],
        ["must to sleep", "После must — без to.", "FORM"],
        { ce: "She must sleep a lot — вывод о привычке, а не о процессе сейчас." }
      )
    ]),
    L("mod-deduction-past", "Выводы о прошлом: must have, can't have, might have", "Строить выводы о прошлом через modal + have + V3 и не путать с обязанностью.", [
      p("Вывод о прошлом = **модальный + have + V3**. _must have done_ — уверен, что сделал; _can't / couldn't have done_ — уверен, что не сделал; _may / might / could have done_ — возможно, сделал. Есть также процессный вариант: _must have been working_."),
      tb(["Уверенность", "Форма", "Пример"], [
        ["да (почти уверен)", "must have + V3", "She must have missed the train."],
        ["нет (почти уверен)", "can't / couldn't have + V3", "He can't have seen the email — he was offline."],
        ["возможно", "may / might / could have + V3", "They might have changed the password."]
      ]),
      ex(
        ["The ground is wet. It must have rained overnight.", "Земля мокрая. Наверное, ночью шёл дождь.", "вывод по признаку"],
        ["You could have been killed!", "Ты мог погибнуть!", "could have = было возможно, но не случилось"]
      ),
      tip("Could have + V3 имеет два значения: «возможно, сделал» и «мог, но не сделал». Различайте по контексту.")
    ], [
      TS(
        "mod-t19 mod-deduction-past 2 B2",
        "Что значит «She must have forgotten about the meeting»?",
        ["Я почти уверен, что она забыла.", "Must have + V3 — уверенный вывод о прошлом."],
        ["Она была обязана забыть.", "Обязанность — had to.", "MODALITY"],
        ["Ей не следовало забывать.", "Критика — shouldn't have.", "MODALITY"],
        ["Возможно, она забудет.", "Это будущее; форма — о прошлом.", "TIMELINE"],
        { ce: "She had to forget about it — была вынуждена (обязанность)." }
      ),
      TS(
        "mod-t20 mod-deduction-past 3 C1",
        "Какие два значения может иметь «You could have told me»?",
        ["Упрёк (мог сказать, но не сказал) — по интонации и контексту; реже — предположение.", "Could have + V3: нереализованная возможность часто звучит как упрёк."],
        ["Только разрешение в прошлом.", "Разрешение в прошлом — were allowed to.", "MODALITY"],
        ["Только способность в прошлом.", "Способность — could/was able to + V1.", "MODALITY"],
        ["Только вывод «наверняка сказал».", "Уверенный вывод — must have.", "MODALITY"],
        { ce: "He could have taken the earlier train — возможно, так и сделал (предположение)." }
      ),
      TS(
        "mod-t21 mod-deduction-past 2 B2",
        "Почему «He can't have came» — ошибка?",
        ["После have нужен V3: can't have come.", "Структура modal + have + V3."],
        ["Нужно can't had come.", "После модального — have, не had.", "FORM"],
        ["Нужно mustn't have come.", "В выводе «нет» — can't/couldn't.", "MODALITY"],
        ["Ошибки нет.", "Came — V2, а нужен V3.", "FORM"],
        { ce: "He can't have come — уверен, что не пришёл." }
      )
    ]),
    L("mod-perfect-crit", "Should have, could have, would have: критика и сожаление", "Выражать критику, сожаление и нереализованные возможности в прошлом.", [
      p("**Should have + V3** — было бы правильно сделать (но не сделали). **Shouldn't have + V3** — сделали, но зря. **Could have + V3** — была возможность. **Would have + V3** — хотели бы/сделали бы при другом условии (связь с третьим условным)."),
      tb(["Форма", "Смысл", "Пример"], [
        ["should have done", "надо было, но не сделал", "We should have tested it on mobile."],
        ["shouldn't have done", "сделал зря", "I shouldn't have sent that email."],
        ["could have done", "мог (была возможность)", "You could have asked for help."],
        ["would have done", "сделал бы (при условии)", "I would have called, but I didn't have your number."]
      ]),
      ex(
        ["You should have seen his face!", "Видел бы ты его лицо!", "идиоматичное употребление"],
        ["We needn't have hurried — the meeting was postponed.", "Зря торопились — встречу перенесли.", "needn't have"]
      ),
      warn("В устной речи should've / could've / would've иногда ошибочно пишут как should of — это ошибка.")
    ], [
      TS(
        "mod-t22 mod-perfect-crit 1 B2",
        "Что сообщает «We should have booked earlier»?",
        ["Мы не забронировали заранее, и это было ошибкой.", "Should have + V3 = критика/сожаление о несделанном."],
        ["Мы забронировали заранее.", "Should have подразумевает, что действия не было.", "MEANING"],
        ["Нам придётся забронировать.", "Это будущее.", "TIMELINE"],
        ["Возможно, мы забронировали.", "Это might have booked.", "MODALITY"],
        { ce: "We shouldn't have booked so early — забронировали, но зря." }
      ),
      TS(
        "mod-t23 mod-perfect-crit 2 B2",
        "Почему написание «should of» неверно?",
        ["Это запись произношения should've; грамматически нужно should have.", "После модального идёт have + V3."],
        ["Потому что нужно should off.", "Off — предлог/наречие.", "SPELLING"],
        ["Should of верно в американском английском.", "Это ошибка в любом варианте.", "SPELLING"],
        ["Потому что should не используется в прошлом.", "Should have + V3 — о прошлом.", "THEORY"],
        { ce: "Should've — нормальное сокращение в неформальном письме." }
      ),
      TS(
        "mod-t24 mod-perfect-crit 3 C1",
        "В чём разница: «He could have won» и «He was able to win»?",
        ["Could have won — мог, но не выиграл; was able to win — выиграл.", "Could have + V3 = нереализованная возможность."],
        ["Одинаково: выиграл.", "Could have обычно означает, что результата не было.", "MEANING"],
        ["Оба значат: не выиграл.", "Was able to = смог (успех).", "MEANING"],
        ["Первое — о будущем.", "Оба — о прошлом.", "TIMELINE"],
        { ce: "He might have won — возможно, выиграл (мы не знаем)." }
      )
    ]),
    L("mod-will-would", "Will, would, shall: готовность, привычки, отказ, уверенность", "Использовать will/would не только для будущего: готовность, отказ, привычки, ожидания.", [
      p("**Will** выражает готовность и отказ (_The door won't open_ — «не хочет открываться»), привычное поведение (_She'll sit for hours reading_), уверенное предположение о настоящем (_That'll be the courier_). **Would** — прошлое этих значений: привычки в прошлом (_We would meet every Sunday_), отказ в прошлом (_He wouldn't listen_)."),
      tb(["Значение", "Настоящее", "Прошлое"], [
        ["отказ", "The car won't start.", "The car wouldn't start."],
        ["привычка", "He'll often work late.", "He would often work late."],
        ["предположение", "That'll be John at the door.", "That would have been John."],
        ["предложение (BrE)", "Shall I help?", "—"]
      ]),
      ex(
        ["When I was a child, my grandfather would tell us stories.", "В детстве дедушка рассказывал нам истории.", "would = used to (действия)"],
        ["I used to live in Minsk. (не would)", "Раньше я жил в Минске.", "состояния — только used to"],
        ["Experts are bound to criticise the plan.", "Эксперты наверняка раскритикуют план.", "be bound to = почти неизбежно"]
      ),
      warn("Would для прошлых привычек — только с действиями: ~~I would have a dog~~ → _I used to have a dog_.")
    ], [
      TS(
        "mod-t25 mod-will-would 2 C1",
        "Почему неверно «When I was young, I would have long hair»?",
        ["Would для прошлых привычек используется только с действиями, а не состояниями; нужно I used to have.", "Состояния в прошлом — used to."],
        ["Потому что would только для будущего.", "Would выражает и прошлые привычки.", "THEORY"],
        ["Потому что нужно would had.", "Такой формы нет.", "FORM"],
        ["Ошибки нет.", "С состоянием (have long hair) would некорректен.", "THEORY"],
        { ce: "When I was young, I would walk to school — действие, would возможен." }
      ),
      TS(
        "mod-t26 mod-will-would 2 B2",
        "Что выражает «The printer won't work»?",
        ["Отказ: принтер «не хочет» работать (сейчас не работает).", "Will not — отказ, нежелание, в том числе у предметов."],
        ["Принтер сломается в будущем.", "Это не прогноз.", "MODALITY"],
        ["Принтеру запрещено работать.", "Запрет — mustn't.", "MODALITY"],
        ["Принтер работал в прошлом.", "Не о прошлом.", "TIMELINE"],
        { ce: "The printer didn't work yesterday — просто факт в прошлом." }
      ),
      TS(
        "mod-t27 mod-will-would 2 C1",
        "Что значит «The doorbell! That'll be the delivery»?",
        ["Уверенное предположение о настоящем.", "Will может выражать уверенность в выводе о настоящем."],
        ["Доставка придёт в будущем.", "Звонок уже прозвучал — это вывод о «сейчас».", "TIMELINE"],
        ["Говорящий обещает получить доставку.", "Не обещание.", "MODALITY"],
        ["Доставка должна была прийти.", "Не критика и не обязанность.", "MODALITY"],
        { ce: "That might be the delivery — менее уверенно." }
      )
    ])
  ], practice3 = [
    // basics
    S(
      "mod-001 mod-basics 1 B2",
      "She ___ speak Mandarin fluently.",
      ["can", "Модальный без -s и без to."],
      ["cans", "Модальные не изменяются по лицам.", "AGREEMENT"],
      ["can to", "После can — без to.", "FORM"],
      ["is can", "Be + can — несуществующая конструкция.", "FORM"]
    ),
    S(
      "mod-002 mod-basics 2 B2",
      "We ___ submit the form by Monday — the deadline is fixed.",
      ["have to", "Внешняя обязанность (дедлайн) → have to; must тоже возможен, поэтому его нет среди вариантов."],
      ["has to", "We → have.", "AGREEMENT"],
      ["must to", "После must — без to.", "FORM"],
      ["have", "Без to смысл обязанности теряется.", "FORM"]
    ),
    I2(
      "mod-003 mod-basics 2 B2",
      "I'm sorry, I ___ (not / able) to attend yesterday's call.",
      ["wasn't able", "was not able"],
      "Прошедшее разовое → was/wasn't able to (to уже в предложении).",
      "FORM",
      [[["couldn't", "could not"], "FORM", "В пропуске должна быть форма be able (дальше стоит to)."], [["didn't able"], "AUXILIARY", "Able — прилагательное, нужен be: wasn't able."], [["haven't been able"], "TIMELINE", "Yesterday → Past Simple."]]
    ),
    FX("mod-004 mod-basics 1 B2", "Найдите и исправьте ошибку.", ["You", { t: "will can", fix: ["will be able to"], tag: "FORM" }, "access the files", "after the update."], "Две модальные подряд невозможны: will be able to."),
    O("mod-005 mod-basics 2 B2", "Постройте вопрос: «Нам придётся заплатить заранее?»", ["Will", "we", "have", "to", "pay", "in", "advance", "?"], "Will + подлежащее + have to + V1.", "STRUCTURE"),
    S(
      "mod-006 mod-basics 2 B2",
      "___ we have to wear formal clothes at the event?",
      ["Do", "Have to — обычный глагол: вопрос через do."],
      ["Must", "Must we have to — двойная модальность.", "AUXILIARY"],
      ["Did", "Вопрос о предстоящем мероприятии — нужно настоящее (Do).", "TIMELINE"],
      ["Are", "Are не образует вопрос с have to.", "AUXILIARY"]
    ),
    // ability
    S(
      "mod-007 mod-ability 2 B2",
      "The fire spread quickly, but everyone ___ get out safely.",
      ["was able to", "Разовый успех в прошлом → was able to."],
      ["could", "Could в утверждении — общая способность, не разовый успех.", "MODALITY"],
      ["can", "Контекст — прошлое.", "TIMELINE"],
      ["must", "Must — обязанность/вывод.", "MODALITY"]
    ),
    S(
      "mod-008 mod-ability 1 B2",
      "When I was a child, I ___ swim, but I can't any more.",
      ["could", "Общая способность в прошлом → could."],
      ["can", "Контекст — прошлое.", "TIMELINE"],
      ["was able", "Нужно was able to.", "FORM"],
      ["must", "Не способность.", "MODALITY"]
    ),
    I2(
      "mod-009 mod-ability 2 B2",
      "After several attempts, she ___ (manage) to fix the printer.",
      ["managed"],
      "Разовый успех: managed to.",
      "FORM",
      [[["could manage"], "MODALITY", "Could с разовым успехом неестественен."], [["manages"], "TIMELINE", "Контекст — прошлое."]]
    ),
    S(
      "mod-010 mod-ability 2 B2",
      "I ___ hear the neighbours arguing through the wall last night.",
      ["could", "Глаголы восприятия допускают could и для разового случая."],
      ["was able", "Нужно was able to.", "FORM"],
      ["can", "Last night → прошлое.", "TIMELINE"],
      ["might", "Might — предположение, а не способность.", "MODALITY"]
    ),
    S(
      "mod-011 mod-ability 2 B2",
      "I'm afraid I ___ make it to the workshop next week.",
      ["won't be able to", "Будущая невозможность → won't be able to."],
      ["won't can", "Две модальные подряд невозможны.", "FORM"],
      ["couldn't", "Couldn't без условия описывает прошлое.", "TIMELINE"],
      ["mustn't", "Mustn't — запрет.", "MODALITY"]
    ),
    M(
      "mod-012 mod-ability 3 C1",
      "Выберите 2 верных продолжения: «Despite the storm, the pilot ___ land the plane safely.»",
      ["was able to", !0, "Разовый успех."],
      ["managed to", !0, "Разовый успех с усилием."],
      ["could", !1, "Could в утверждении — общая способность.", "MODALITY"],
      ["can", !1, "Прошлое.", "TIMELINE"],
      ["must", !1, "Не способность.", "MODALITY"]
    ),
    FX("mod-013 mod-ability 2 B2", "Найдите и исправьте ошибку.", ["She", "has", { t: "could", fix: ["been able to"], tag: "FORM" }, "work remotely", "since March."], "После has нужен V3 — у could его нет: has been able to."),
    // permission & requests
    S(
      "mod-014 mod-permission 1 B2",
      "(formal meeting) ___ I ask a question about the budget?",
      ["May", "Формальная вежливая просьба о разрешении."],
      ["Must", "Must не используется для просьбы о разрешении.", "MODALITY"],
      ["Will", "Will I ask — не просьба о разрешении.", "MODALITY"],
      ["Should", "Should I ask — просьба о совете, а не о разрешении.", "MODALITY"]
    ),
    S(
      "mod-015 mod-permission 2 B2",
      "Would you mind ___ the report before 5?",
      ["sending", "Would you mind + V-ing."],
      ["to send", "После mind — V-ing.", "FORM"],
      ["send", "После mind — V-ing.", "FORM"],
      ["sent", "Нужен V-ing.", "FORM"]
    ),
    S(
      "mod-016 mod-permission 2 C1",
      "Would you mind if I ___ the window?",
      ["opened", "Would you mind if + Past Simple (более вежливо, гипотетично)."],
      ["will open", "Will после if в этом значении неуместен.", "FORM"],
      ["opening", "После if нужно подлежащее + глагол.", "STRUCTURE"],
      ["have opened", "Present Perfect не подходит.", "TIMELINE"],
      { note: "Would you mind if I open the window? также встречается в разговоре; среди вариантов он не дан." }
    ),
    S(
      "mod-017 mod-permission 2 B2",
      "At my old job we ___ wear jeans on Fridays.",
      ["could", "Общее разрешение в прошлом → could (или were allowed to)."],
      ["can", "Прошлое.", "TIMELINE"],
      ["must", "Must — обязанность.", "MODALITY"],
      ["might", "Might — вероятность.", "MODALITY"]
    ),
    S(
      "mod-018 mod-permission 2 B2",
      "Yesterday the staff ___ leave early because of the storm.",
      ["were allowed to", "Разовое разрешение в прошлом → were allowed to."],
      ["could", "Could для разового разрешения в утверждении неестественно.", "MODALITY"],
      ["are allowed to", "Yesterday → прошлое.", "TIMELINE"],
      ["must", "Обязанность, а не разрешение.", "MODALITY"]
    ),
    S(
      "mod-019 mod-permission 2 B2",
      "«Could I borrow your charger?» — «Yes, of course you ___.»",
      ["can", "Разрешение в ответе — can (could в ответе звучит странно)."],
      ["could", "Could в ответе на вежливую просьбу не используется.", "MODALITY"],
      ["may to", "После may — без to.", "FORM"],
      ["must", "Обязанность.", "MODALITY"]
    ),
    MA(
      "mod-020 mod-permission 2 C1",
      "Распределите по регистру.",
      ["Нейтрально / разговорно", "Вежливо / формально"],
      [
        ["Can I use your phone?", 0],
        ["May I use your phone?", 1],
        ["Could you possibly send me the file?", 1],
        ["Can you send me the file?", 0],
        ["Would you mind waiting a moment?", 1],
        ["Hang on a sec, will you?", 0]
      ],
      "May, could possibly, would you mind — маркеры формальности; can, hang on, will you — разговорные.",
      "REGISTER"
    ),
    // obligation
    S(
      "mod-021 mod-obligation 1 B2",
      "You ___ share your password with anyone — it's against company policy.",
      ["mustn't", "Запрет → mustn't."],
      ["don't have to", "Отсутствие необходимости, а не запрет.", "MODALITY"],
      ["needn't", "Не нужно — тоже не запрет.", "MODALITY"],
      ["shouldn't to", "После shouldn't — без to.", "FORM"]
    ),
    S(
      "mod-022 mod-obligation 1 B2",
      "You ___ come to the office tomorrow — you can work from home.",
      ["don't have to", "Не обязательно → don't have to."],
      ["mustn't", "Запрет противоречит «можете работать из дома».", "MODALITY"],
      ["haven't to", "Не стандарт; нужно don't have to.", "AUXILIARY"],
      ["can't", "Can't — нельзя/невозможно.", "MODALITY"]
    ),
    I2(
      "mod-023 mod-obligation 1 B2",
      "Last year we ___ (have to) move to a smaller office.",
      ["had to"],
      "Прошлая обязанность → had to.",
      "FORM",
      [[["must"], "FORM", "У must нет прошедшей формы."], [["must have"], "MODALITY", "Must have = вывод, а не обязанность."], [["have to"], "TIMELINE", "Last year → прошлое."]]
    ),
    S(
      "mod-024 mod-obligation 3 C1",
      "I rushed across town, but I ___ — it turned out the meeting was cancelled.",
      ["needn't have hurried", "Торопился, но зря → needn't have + V3."],
      ["mustn't hurry", "Mustn't — запрет на сейчас; не о прошлом.", "MODALITY"],
      ["mustn't have hurried", "Mustn't have — некорректно для этого смысла.", "MODALITY"],
      ["shouldn't hurry", "Shouldn't + V1 — совет на сейчас.", "TIMELINE"]
    ),
    S(
      "mod-025 mod-obligation 2 B2",
      "Visitors ___ sign in at reception. (written rule)",
      ["must", "Официальное письменное правило → must."],
      ["have", "Без to не обязанность.", "FORM"],
      ["mustn't", "Это запрет.", "MODALITY"],
      ["could", "Could — возможность/разрешение.", "MODALITY"]
    ),
    S(
      "mod-026 mod-obligation 2 B2",
      "Good news: we ___ redo the whole design — only the logo.",
      ["don't need to", "Отсутствие необходимости."],
      ["mustn't", "Запрет.", "MODALITY"],
      ["can't", "Невозможность.", "MODALITY"],
      ["needn't to", "Модальное needn't — без to.", "FORM"]
    ),
    FX("mod-027 mod-obligation 2 B2", "Найдите и исправьте ошибку.", ["Yesterday", "I", { t: "must stay", fix: ["had to stay"], tag: "FORM" }, "late", "to finish the audit."], "У must нет прошедшей формы: had to stay."),
    M(
      "mod-028 mod-obligation 3 C1",
      "Выберите 2 варианта со смыслом «не обязательно»: «You ___ bring your own laptop.»",
      ["don't have to", !0, "Нет необходимости."],
      ["needn't", !0, "Нет необходимости (BrE)."],
      ["mustn't", !1, "Запрет.", "MODALITY"],
      ["can't", !1, "Нельзя.", "MODALITY"],
      ["shouldn't", !1, "Совет не делать.", "MODALITY"]
    ),
    S(
      "mod-029 mod-obligation 2 B2",
      "Will we ___ pay for parking?",
      ["have to", "Будущая обязанность → will have to."],
      ["must", "Will must — две модальные.", "FORM"],
      ["must to", "Неверно.", "FORM"],
      ["had to", "После will — V1: have to.", "FORM"]
    ),
    S(
      "mod-030 mod-obligation 2 C1",
      "I didn't need to take a taxi, so I ___.",
      ["walked", "Didn't need to + «поэтому пошёл пешком» — согласованное продолжение."],
      ["needn't have walked", "Противоречит логике: needn't have — сделал зря.", "MODALITY"],
      ["must walk", "Must без прошедшей формы.", "FORM"],
      ["had walked", "Past Perfect без второй точки.", "TIMELINE"]
    ),
    // advice
    S(
      "mod-031 mod-advice 1 B2",
      "You look tired. You ___ take a break.",
      ["should", "Совет."],
      ["must to", "После must — без to.", "FORM"],
      ["had better to", "Had better — без to.", "FORM"],
      ["ought", "Нужно ought to.", "FORM"]
    ),
    S(
      "mod-032 mod-advice 2 B2",
      "We ___ leave now, or we'll miss the last train.",
      ["'d better", "Срочно + последствие → had better."],
      ["'d better to", "После had better — без to.", "FORM"],
      ["should to", "После should — без to.", "FORM"],
      ["would better", "Устойчивая форма — had better.", "FORM"]
    ),
    I2(
      "mod-033 mod-advice 2 B2",
      "You ___ (better / not) mention the bonus yet — nothing is confirmed.",
      ["had better not", "'d better not"],
      "Отрицание had better → had better not + V1.",
      "STRUCTURE",
      [[["hadn't better"], "STRUCTURE", "Not ставится после better."], [["had not better"], "STRUCTURE", "Not ставится после better."], [["had better don't"], "AUXILIARY", "Don't после had better невозможен."]]
    ),
    S(
      "mod-034 mod-advice 2 C1",
      "The package ___ arrive by Thursday, according to the tracking.",
      ["should", "Should = ожидание."],
      ["must to", "Неверная форма.", "FORM"],
      ["had better", "Had better — совет людям.", "MODALITY"],
      ["ought", "Нужно ought to.", "FORM"]
    ),
    S(
      "mod-035 mod-advice 2 B2",
      "«___ I tell her the truth?» — «Yes, I think you should.»",
      ["Should", "Просьба о совете."],
      ["Must", "Must I — «я обязан?», не просьба совета.", "MODALITY"],
      ["Had", "Had I better — редко и разговорно.", "AUXILIARY"],
      ["Ought", "Ought I to — формально; без to неверно.", "FORM"]
    ),
    FX("mod-036 mod-advice 1 B2", "Найдите и исправьте ошибку.", ["You", { t: "ought", fix: ["ought to", "should"], tag: "FORM" }, "check", "the contract carefully."], "Ought требует to: ought to check."),
    // deduction present
    S(
      "mod-037 mod-deduction-present 1 B2",
      "All the lights are off. They ___ be at home.",
      ["can't", "Уверенность «нет»."],
      ["mustn't", "Mustn't — запрет.", "MODALITY"],
      ["must", "Противоречит признаку.", "MEANING"],
      ["don't have to", "Отсутствие необходимости.", "MODALITY"]
    ),
    S(
      "mod-038 mod-deduction-present 1 B2",
      "He's been working for 14 hours. He ___ be exhausted.",
      ["must", "Уверенный вывод «да»."],
      ["can't", "Противоречит логике.", "MEANING"],
      ["mustn't", "Запрет.", "MODALITY"],
      ["should to", "Неверная форма.", "FORM"]
    ),
    S(
      "mod-039 mod-deduction-present 2 B2",
      "I'm not sure where Sam is. He ___ be in the gym.",
      ["might", "Неуверенное предположение."],
      ["must", "Must = уверен; противоречит «not sure».", "MODALITY"],
      ["can't", "Уверенность «нет» противоречит контексту.", "MODALITY"],
      ["has to", "Обязанность.", "MODALITY"]
    ),
    I2(
      "mod-040 mod-deduction-present 2 B2",
      "Don't call her now — she ___ (must / sleep).",
      ["must be sleeping"],
      "Вывод о процессе сейчас: must be + V-ing.",
      "FORM",
      [[["must sleep"], "FORM", "Must sleep — вывод о привычке, а не о процессе сейчас."], [["must sleeping"], "FORM", "Нужен be."], [["must have slept"], "TIMELINE", "Это вывод о прошлом."]]
    ),
    S(
      "mod-041 mod-deduction-present 2 C1",
      "That ___ be the right answer — it contradicts the data.",
      ["can't", "Уверенность «нет»."],
      ["must", "Must = уверен «да»; противоречит «it contradicts the data».", "MEANING"],
      ["mustn't", "Запрет.", "MODALITY"],
      ["needn't", "Отсутствие необходимости.", "MODALITY"]
    ),
    MA(
      "mod-042 mod-deduction-present 2 C1",
      "Распределите по степени уверенности.",
      ["Почти уверен «да»", "Возможно", "Почти уверен «нет»"],
      [
        ["She must be in the meeting.", 0],
        ["She could be in the meeting.", 1],
        ["She can't be in the meeting.", 2],
        ["She might be on her way.", 1],
        ["That must be the new manager.", 0],
        ["That couldn't be true.", 2]
      ],
      "must → да; may/might/could → возможно; can't/couldn't → нет.",
      "MODALITY"
    ),
    // deduction past
    S(
      "mod-043 mod-deduction-past 1 B2",
      "The road is wet. It ___ during the night.",
      ["must have rained", "Уверенный вывод о прошлом."],
      ["must rain", "Must + V1 — о настоящем.", "TIMELINE"],
      ["had to rain", "Had to — обязанность.", "MODALITY"],
      ["must have rain", "После have — V3.", "FORM"]
    ),
    S(
      "mod-044 mod-deduction-past 2 B2",
      "He ___ the email — he was on a plane with no Wi-Fi.",
      ["can't have read", "Уверенность «не читал» в прошлом."],
      ["mustn't have read", "В выводе «нет» используют can't/couldn't have.", "MODALITY"],
      ["can't read", "Это о настоящем/способности.", "TIMELINE"],
      ["shouldn't have read", "Критика — другой смысл.", "MODALITY"]
    ),
    I2(
      "mod-045 mod-deduction-past 2 B2",
      "I can't find my badge. I ___ (might / leave) it in the car.",
      ["might have left"],
      "Предположение о прошлом: might have + V3.",
      "FORM",
      [[["might leave"], "TIMELINE", "Might + V1 — о будущем."], [["might have leave"], "FORM", "После have — V3: left."], [["might left"], "FORM", "Пропущен have."]]
    ),
    S(
      "mod-046 mod-deduction-past 3 C1",
      "She was smiling when she left the interview. It ___ well.",
      ["must have gone", "Вывод «да» по признаку."],
      ["can't have gone", "Противоречит признаку.", "MEANING"],
      ["should have gone", "Should have — критика/ожидание, не вывод.", "MODALITY"],
      ["must go", "О настоящем.", "TIMELINE"]
    ),
    FX("mod-047 mod-deduction-past 2 B2", "Найдите и исправьте ошибку.", ["They", { t: "must have took", fix: ["must have taken"], tag: "FORM" }, "the wrong exit,", "because they're late."], "После have — V3: taken."),
    S(
      "mod-048 mod-deduction-past 2 C1",
      "I'm not sure why he's late. He ___ the bus.",
      ["may have missed", "Неуверенное предположение о прошлом."],
      ["must have missed", "Must = уверен; противоречит «not sure».", "MODALITY"],
      ["had to miss", "Обязанность.", "MODALITY"],
      ["may miss", "О будущем.", "TIMELINE"]
    ),
    S(
      "mod-049 mod-deduction-past 2 B2",
      "She ___ been working all night — her coffee mug is still warm.",
      ["must have", "Must have been + V-ing — уверенный вывод о процессе в прошлом."],
      ["must", "Must been — пропущен have.", "FORM"],
      ["had", "Had been working — факт, а не вывод.", "MODALITY"],
      ["can't have", "Противоречит признаку.", "MEANING"]
    ),
    // perfect criticism
    S(
      "mod-050 mod-perfect-crit 1 B2",
      "We lost the client. We ___ responded faster.",
      ["should have", "Критика несделанного."],
      ["must have", "Вывод, а не критика.", "MODALITY"],
      ["should", "Should + V1 — совет на сейчас; нужно should have + V3.", "TIMELINE"],
      ["had to", "Обязанность.", "MODALITY"]
    ),
    S(
      "mod-051 mod-perfect-crit 1 B2",
      "I ___ eaten so much — I feel awful.",
      ["shouldn't have", "Сделал зря."],
      ["mustn't have", "Неверно для критики.", "MODALITY"],
      ["needn't", "Needn't eaten — неверная форма.", "FORM"],
      ["couldn't have", "Невозможность.", "MODALITY"]
    ),
    I2(
      "mod-052 mod-perfect-crit 2 B2",
      "You ___ (could / tell) me earlier! Now it's too late.",
      ["could have told"],
      "Упрёк о нереализованной возможности: could have + V3.",
      "FORM",
      [[["could tell"], "TIMELINE", "Could tell — о прошлой способности/настоящем."], [["could have tell"], "FORM", "После have — V3: told."], [["could of told"], "SPELLING", "Should/could of — ошибка написания."]]
    ),
    S(
      "mod-053 mod-perfect-crit 2 C1",
      "I ___ you, but I didn't have your number.",
      ["would have called", "Сделал бы при другом условии (смешение с 3-м условным)."],
      ["would call", "Would + V1 — о настоящем/будущем гипотетическом; здесь прошлое.", "TIMELINE"],
      ["must have called", "Вывод.", "MODALITY"],
      ["will call", "Будущее.", "TIMELINE"]
    ),
    FX("mod-054 mod-perfect-crit 1 B2", "Найдите и исправьте ошибку.", ["We", { t: "should of", fix: ["should have"], tag: "SPELLING" }, "tested", "the app on Android."], "Should have + V3; «of» — ошибка на слух."),
    M(
      "mod-055 mod-perfect-crit 3 C1",
      "Выберите 2 предложения, где действие в прошлом НЕ произошло.",
      ["We should have booked a bigger room.", !0, "Should have = не сделали."],
      ["She could have won the race.", !0, "Could have = была возможность, но не победила (без иного контекста)."],
      ["He must have booked a room.", !1, "Вывод: наверняка забронировал.", "MODALITY"],
      ["They needn't have waited.", !1, "Ждали, но зря — действие было.", "MODALITY"],
      ["She was able to win the race.", !1, "Победила.", "MEANING"]
    ),
    S(
      "mod-056 mod-perfect-crit 2 B2",
      "We ___ hurried — the train was delayed anyway.",
      ["needn't have", "Сделали, но зря."],
      ["didn't need", "Нужно didn't need to hurry.", "FORM"],
      ["mustn't have", "Неверно для смысла.", "MODALITY"],
      ["can't have", "Вывод «не делали».", "MODALITY"]
    ),
    // will / would
    S(
      "mod-057 mod-will-would 2 B2",
      "My laptop ___ turn on. I think the battery is dead.",
      ["won't", "Отказ/нежелание работать → won't."],
      ["mustn't", "Запрет.", "MODALITY"],
      ["shouldn't", "Совет.", "MODALITY"],
      ["needn't", "Нет необходимости.", "MODALITY"]
    ),
    S(
      "mod-058 mod-will-would 2 C1",
      "When we were students, we ___ study in the library every evening.",
      ["would", "Прошлая привычка (действие) → would или used to."],
      ["will", "Прошлое.", "TIMELINE"],
      ["were used to", "Be used to = привыкнуть к чему-то, требует -ing.", "STRUCTURE"],
      ["must", "Обязанность.", "MODALITY"]
    ),
    S(
      "mod-059 mod-will-would 2 C1",
      "I ___ have a cat when I lived in Riga.",
      ["used to", "Прошлое состояние → used to (would невозможен)."],
      ["would", "Would не используется с состояниями.", "THEORY"],
      ["use to", "В утверждении — used to.", "SPELLING"],
      ["was used to", "Be used to — привычка к чему-то.", "STRUCTURE"]
    ),
    S(
      "mod-060 mod-will-would 2 B2",
      "He ___ listen to anyone — he just did what he wanted.",
      ["wouldn't", "Отказ в прошлом → wouldn't."],
      ["won't", "Прошлое.", "TIMELINE"],
      ["mustn't", "Запрет.", "MODALITY"],
      ["needn't", "Нет необходимости.", "MODALITY"]
    ),
    S(
      "mod-061 mod-will-would 2 C1",
      "The new policy is ___ cause some confusion at first.",
      ["bound to", "Be bound to = почти неизбежно."],
      ["bound", "Нужен to.", "FORM"],
      ["must to", "Неверная форма.", "FORM"],
      ["likely", "Нужно likely to.", "FORM"]
    ),
    S(
      "mod-062 mod-will-would 2 B2",
      "(BrE) ___ I make some coffee for everyone?",
      ["Shall", "Shall I — предложение помощи."],
      ["Will", "Will I — вопрос о будущем, а не предложение.", "MODALITY"],
      ["Must", "Обязанность.", "MODALITY"],
      ["Would", "Would I — неестественно.", "MODALITY"]
    ),
    I2(
      "mod-063 mod-will-would 2 B2",
      "The client ___ (not / sign) — he says the terms are unfair.",
      ["won't sign", "will not sign"],
      "Отказ сейчас → won't + V1.",
      "MODALITY",
      [[["doesn't sign"], "MODALITY", "Present Simple не передаёт отказ."], [["mustn't sign"], "MODALITY", "Это запрет."]]
    ),
    // mixed
    S(
      "mod-064 mod-obligation 3 C1",
      "Passengers ___ use mobile phones during take-off, but they ___ switch them off completely.",
      ["mustn't / don't have to", "Запрет во время взлёта, но выключать полностью не обязательно."],
      ["don't have to / mustn't", "Перевёрнутые смыслы.", "MODALITY"],
      ["mustn't / mustn't", "Второе противоречит «but».", "MODALITY"],
      ["needn't / mustn't", "Перевёрнутые смыслы.", "MODALITY"]
    ),
    S(
      "mod-065 mod-deduction-present 3 C1",
      "«Is that Tom's car?» — «It ___ be. His is blue, and this one is red.»",
      ["can't", "Уверенный вывод «нет» по признаку."],
      ["mustn't", "Запрет.", "MODALITY"],
      ["must", "Признаки говорят обратное.", "MEANING"],
      ["doesn't have to", "Нет необходимости.", "MODALITY"]
    ),
    O("mod-066 mod-deduction-past 2 B2", "Постройте: «Они, наверное, уже ушли».", ["They", "must", "have", "already", "left"], "Modal + have + (наречие) + V3; already между have и V3.", "STRUCTURE", ["They must already have left"]),
    O("mod-067 mod-perfect-crit 2 B2", "Постройте: «Тебе не нужно было приносить вино».", ["You", "needn't", "have", "brought", "wine"], "Needn't have + V3.", "STRUCTURE"),
    S(
      "mod-068 mod-ability 2 C1",
      "She ___ to finish the marathon, even though she'd injured her knee.",
      ["managed", "Разовый успех с усилием → managed to."],
      ["could", "Could to — неверно, а could для разового успеха — неестественно.", "FORM"],
      ["succeeded", "Succeed управляет in + V-ing: succeeded in finishing.", "PREPOSITION"],
      ["can", "Прошлое.", "TIMELINE"]
    ),
    S(
      "mod-069 mod-advice 3 C1",
      "Which sentence sounds like a warning rather than general advice?",
      ["You'd better back up your files before the update.", "Had better — конкретная ситуация + риск."],
      ["You should back up your files regularly.", "Общий совет.", "REGISTER"],
      ["It's a good idea to back up files.", "Общая рекомендация.", "REGISTER"],
      ["People ought to back up their files.", "Общая норма.", "REGISTER"]
    ),
    S(
      "mod-070 mod-permission 2 B2",
      "«Can I park here?» — «No, you ___. It's for staff only.»",
      ["can't", "Запрет в ответе на can I → can't."],
      ["needn't", "Не нужно — не запрет.", "MODALITY"],
      ["don't have to", "Не обязательно — не запрет.", "MODALITY"],
      ["couldn't", "Прошлое/условие.", "TIMELINE"]
    ),
    I2(
      "mod-071 mod-obligation 2 B2",
      "I ___ (not / have to) work tomorrow — it's a public holiday.",
      ["don't have to", "do not have to"],
      "Отсутствие необходимости → don't have to.",
      "MODALITY",
      [[["mustn't"], "MODALITY", "Это запрет."], [["haven't to"], "AUXILIARY", "Have to — обычный глагол, нужен do."]]
    ),
    S(
      "mod-072 mod-deduction-past 3 C1",
      "The window is broken and the laptop is gone. Someone ___ in.",
      ["must have broken", "Уверенный вывод о прошлом."],
      ["should have broken", "Критика.", "MODALITY"],
      ["had to break", "Обязанность.", "MODALITY"],
      ["can't have broken", "Противоречит признакам.", "MEANING"]
    ),
    S(
      "mod-073 mod-ability 2 B2",
      "I tried for an hour, but I ___ connect to the VPN.",
      ["couldn't", "Разовая неудача в прошлом — в отрицании couldn't естественно."],
      ["can't", "Прошлое (tried).", "TIMELINE"],
      ["mustn't", "Запрет.", "MODALITY"],
      ["needn't", "Нет необходимости.", "MODALITY"]
    ),
    S(
      "mod-074 mod-permission 2 C1",
      "(sign in a hospital) Mobile phones ___ be used in the intensive care unit.",
      ["may not", "Официальный запрет в табличке → may not."],
      ["might not", "Might not — вероятность, не запрет.", "MODALITY"],
      ["needn't", "Нет необходимости — не запрет.", "MODALITY"],
      ["don't have to", "Не обязательно — не запрет.", "MODALITY"]
    ),
    I2(
      "mod-075 mod-deduction-present 2 B2",
      "She's not answering. She ___ (might / drive) right now.",
      ["might be driving"],
      "Предположение о процессе сейчас: might be + V-ing.",
      "FORM",
      [[["might drive"], "TIMELINE", "Might drive — о будущем/привычке, а не о процессе сейчас."], [["might driving"], "FORM", "Нужен be."], [["might have driven"], "TIMELINE", "Это о прошлом."]]
    ),
    S(
      "mod-076 mod-deduction-past 3 C1",
      "I'm surprised she didn't reply. She ___ the message — she always answers within minutes.",
      ["can't have seen", "Уверенность «не видела» по признаку (всегда отвечает быстро)."],
      ["mustn't have seen", "В выводе «нет» — can't/couldn't have.", "MODALITY"],
      ["shouldn't have seen", "Критика, а не вывод.", "MODALITY"],
      ["didn't have to see", "Отсутствие необходимости.", "MODALITY"]
    ),
    S(
      "mod-077 mod-advice 2 C1",
      "(formal report) The committee ___ review the policy annually.",
      ["ought to", "Ought to — рекомендация в формальном стиле."],
      ["had better", "Had better — разговорное предупреждение, неуместно в отчёте.", "REGISTER"],
      ["ought", "Без to неверно.", "FORM"],
      ["better", "Без had — разговорно и неуместно.", "REGISTER"]
    ),
    FX("mod-078 mod-obligation 2 B2", "Найдите и исправьте ошибку.", ["Do", "we", { t: "must", fix: ["have to", "need to"], tag: "AUXILIARY" }, "register", "before the webinar?"], "Must не используется с do; вопрос: Do we have to / need to...?"),
    S(
      "mod-079 mod-will-would 2 B2",
      "«Will you join us for dinner?» — «I'd love to, but I ___. I have an early flight.»",
      ["can't", "Невозможность → can't."],
      ["mustn't", "Запрет — неуместно.", "MODALITY"],
      ["won't can", "Две модальные подряд.", "FORM"],
      ["needn't", "Нет необходимости — противоречит причине.", "MODALITY"]
    ),
    MA(
      "mod-080 mod-perfect-crit 3 C1",
      "Соотнесите фразу и смысл.",
      ["Сделал зря", "Не сделал, а надо было", "Был способен/шанс, но не сделал", "Уверенный вывод"],
      [
        ["We needn't have printed all the slides.", 0],
        ["We should have printed the slides.", 1],
        ["We could have printed the slides at the hotel.", 2],
        ["They must have printed the slides.", 3],
        ["I shouldn't have said that.", 0],
        ["You ought to have told me.", 1]
      ],
      "needn't have / shouldn't have — сделано зря; should have / ought to have — не сделано; could have — возможность; must have — вывод.",
      "MODALITY"
    )
  ], b03_modals_default = block({
    id: "modals",
    n: 3,
    title: "Модальные глаголы",
    short: "Способность, разрешение, обязанность, вывод, modal perfect",
    blueprint: { size: 26, theory: 6 }
  }, lessons3, practice3);

  // src/content/blocks/b04-conditionals.js
  var lessons4 = [
    L("cond-zero-first", "Zero и First Conditional", "Различать общую закономерность (zero) и конкретное реальное будущее (first).", [
      p("**Zero conditional** — закономерность, которая верна всегда: _If you heat ice, it melts._ Обе части в Present Simple; if часто можно заменить на when. **First conditional** — реальное конкретное будущее: _If the client approves, we'll start on Monday._ В if-части — настоящее время, в главной — will/can/may/imperative."),
      tb(["Тип", "If-часть", "Главная часть", "Пример"], [
        ["Zero", "Present Simple", "Present Simple", "If the battery dies, the app closes."],
        ["First", "Present Simple / Perfect / Continuous", "will / can / may / imperative", "If you've finished, you can go."]
      ]),
      ex(
        ["If you press this button, the alarm goes off.", "Если нажать эту кнопку, срабатывает сигнализация.", "закономерность"],
        ["If it rains tomorrow, we'll move the event inside.", "Если завтра пойдёт дождь, перенесём мероприятие в зал.", "конкретное будущее"],
        ["If you see Anna, tell her I called.", "Увидишь Анну — скажи, что я звонил.", "imperative"]
      ),
      warn("Will в if-части — только в значении готовности/вежливости: _If you'll follow me, I'll show you the lab._")
    ], [
      TS(
        "cond-t01 cond-zero-first 1 B2",
        "Чем отличаются «If you mix blue and yellow, you get green» и «If you mix them now, you'll get green»?",
        ["Первое — закономерность (zero), второе — конкретная ситуация в будущем (first).", "Zero — всегда верно; first — реальное единичное будущее."],
        ["Первое — нереальное условие.", "Нереальное — second conditional.", "THEORY"],
        ["Второе грамматически неверно.", "Оба верны.", "THEORY"],
        ["Разницы нет.", "Различается обобщённость.", "MEANING"],
        { ce: "If you mixed them, you'd get green — гипотеза (second)." }
      ),
      TS(
        "cond-t02 cond-zero-first 2 B2",
        "Почему в if-части first conditional не используют will?",
        ["If-часть — придаточное условия; будущее в нём выражается настоящим временем.", "Правило совпадает с придаточными времени."],
        ["Потому что will запрещён в любых предложениях с if.", "If you'll wait... — допустимо в значении вежливой просьбы.", "THEORY"],
        ["Потому что first conditional — о прошлом.", "First conditional — о будущем.", "TIMELINE"],
        ["Потому что will только для вопросов.", "Не так.", "THEORY"],
        { ce: "I don't know if he will come — if = «ли», дополнительное придаточное; will возможен." }
      ),
      TS(
        "cond-t03 cond-zero-first 2 C1",
        "Какая форма в главной части first conditional НЕ подходит?",
        ["would + V1 для реального будущего", "Would переводит условие в гипотетическое (second)."],
        ["will + V1", "Основная форма.", "THEORY"],
        ["can / may + V1", "Модальные допустимы.", "THEORY"],
        ["повелительное наклонение", "If you finish early, call me — нормально.", "THEORY"],
        { ce: "If it rains, we would cancel — смешение реального и гипотетического." }
      )
    ]),
    L("cond-second", "Second Conditional: нереальное настоящее и маловероятное будущее", "Использовать second conditional для гипотез о настоящем и маловероятном будущем.", [
      p("**Second conditional**: _If + Past Simple, would + V1._ Прошедшая форма здесь **не про прошлое**, а про **дистанцию от реальности**: _If I had more time, I'd learn Japanese_ (времени нет). Также для маловероятного будущего: _If you won the lottery, what would you do?_"),
      f("If + V2 (were), would / could / might + V1"),
      ex(
        ["If I were you, I'd negotiate the price.", "На твоём месте я бы поторговался.", "совет"],
        ["If we hired two more people, we could finish on time.", "Если бы мы наняли ещё двоих, успели бы.", "гипотеза"],
        ["What would you do if the server went down?", "Что бы ты сделал, если бы сервер упал?", "маловероятное будущее"]
      ),
      tip("If I were — нейтрально-формальная норма для всех лиц; If I was — разговорный вариант. Для совета — устойчиво If I were you."),
      warn("Выбор first vs second отражает оценку вероятности говорящим: _If I get the job..._ (реально) vs _If I got the job..._ (маловероятно).")
    ], [
      TS(
        "cond-t04 cond-second 2 B2",
        "Почему в «If I had a car, I'd drive to work» стоит had, хотя речь о настоящем?",
        ["Прошедшая форма выражает нереальность (дистанцию от реальности), а не прошлое.", "У меня нет машины сейчас — это гипотеза."],
        ["Потому что действие было в прошлом.", "Речь о сейчас: машины нет.", "TIMELINE"],
        ["Потому что have — стативный глагол.", "Стативность не влияет на тип условного.", "THEORY"],
        ["Это ошибка, нужно have.", "Have дало бы first conditional с другим смыслом.", "THEORY"],
        { ce: "If I have a car next year, I'll drive — реальная возможность (first)." }
      ),
      TS(
        "cond-t05 cond-second 2 C1",
        "Чем отличаются «If I get the promotion, I'll buy a flat» и «If I got the promotion, I'd buy a flat»?",
        ["Оценкой вероятности: первое — реальный сценарий, второе — маловероятный/гипотетический.", "Выбор типа отражает отношение говорящего."],
        ["Первое — о прошлом.", "Оба о будущем.", "TIMELINE"],
        ["Второе грамматически неверно.", "Оба верны.", "THEORY"],
        ["Ничем.", "Различается степень реальности.", "MODALITY"],
        { ce: "If I had got the promotion, I'd have bought a flat — о прошлом (third)." }
      ),
      TS(
        "cond-t06 cond-second 1 B2",
        "Какая форма считается нейтральной нормой в «If I ___ you, I'd apologise»?",
        ["were", "If I were you — устойчивая форма совета."],
        ["am", "Am дало бы реальное условие, что нелогично (я — не ты).", "FORM"],
        ["will be", "Will в if-части недопустим.", "FORM"],
        ["have been", "Perfect меняет смысл.", "FORM"],
        { ce: "If I was rich... — встречается в разговоре; в совете If I were you — норма." }
      )
    ]),
    L("cond-third", "Third Conditional: нереальное прошлое", "Описывать несбывшиеся условия в прошлом и их несбывшиеся последствия.", [
      p("**Third conditional**: _If + Past Perfect, would have + V3._ Обе части нереальны и относятся к прошлому: _If we had tested the update, we wouldn't have lost the data_ (не протестировали → потеряли)."),
      f("If + had + V3, would / could / might + have + V3"),
      ex(
        ["If you had told me, I would have helped.", "Если бы ты сказал, я бы помог.", "не сказал → не помог"],
        ["We might have won if we had started earlier.", "Мы могли бы победить, если бы начали раньше.", "might have"],
        ["If she hadn't missed the flight, she wouldn't have met him.", "Если бы она не опоздала на рейс, то не встретила бы его.", "двойное отрицание реальности"]
      ),
      warn("~~If I would have known~~ — в стандартном английском would в if-части третьего типа не используется: _If I had known_."),
      tip("В речи 'd в обеих частях: _If I'd known, I'd have come_ — первое 'd = had, второе = would.")
    ], [
      TS(
        "cond-t07 cond-third 1 B2",
        "Что известно о реальности из «If they had invited me, I would have gone»?",
        ["Меня не пригласили, и я не пошёл.", "Third conditional описывает противоположное фактам."],
        ["Меня пригласили, и я пошёл.", "Это противоположно смыслу.", "MEANING"],
        ["Меня, возможно, пригласят.", "Речь о прошлом.", "TIMELINE"],
        ["Меня пригласили, но я не пошёл.", "Условие не выполнено: не пригласили.", "MEANING"],
        { ce: "If they invite me, I'll go — реальное будущее." }
      ),
      TS(
        "cond-t08 cond-third 2 B2",
        "Почему «If I would have known, I would have come» считается ошибкой в стандартном английском?",
        ["В if-части third conditional нужен Past Perfect: If I had known.", "Would не ставится в условную часть."],
        ["Потому что know — стативный глагол.", "Стативность не связана.", "THEORY"],
        ["Потому что нужно If I knew.", "Это second conditional — о настоящем.", "TIMELINE"],
        ["Ошибки нет.", "В разговорном AmE встречается, но в стандарте — ошибка.", "THEORY"],
        { ce: "If I'd known, I'd have come — 'd = had / would." }
      ),
      TS(
        "cond-t09 cond-third 2 C1",
        "Как расшифровать 'd в «If I'd seen it, I'd have told you»?",
        ["Первое 'd = had (Past Perfect), второе 'd = would (перед have).", "Позиция подсказывает: в if-части — had, перед have + V3 — would."],
        ["Оба 'd = would.", "В if-части would не используется.", "FORM"],
        ["Оба 'd = had.", "Had have told — невозможно.", "FORM"],
        ["Первое = would, второе = had.", "Наоборот.", "FORM"],
        { ce: "I'd better go — 'd = had (had better)." }
      )
    ]),
    L("cond-mixed", "Mixed Conditionals", "Соединять прошлое условие с настоящим результатом и наоборот.", [
      p("**Mixed conditionals** соединяют разные временные планы. Чаще всего: **прошлое условие → настоящий результат**: _If I had taken that job, I would be living in Dubai now._ Реже: **постоянное (настоящее) условие → прошлый результат**: _If I weren't so shy, I would have spoken to her at the party._"),
      tb(["Тип", "If-часть", "Главная часть", "Пример"], [
        ["Прошлое → настоящее", "had + V3", "would + V1", "If I had saved money, I wouldn't be broke now."],
        ["Настоящее → прошлое", "V2 / were", "would have + V3", "If he were more careful, he wouldn't have crashed."]
      ]),
      ex(
        ["If you'd listened to me, we wouldn't be in this mess.", "Если бы ты меня послушал, мы бы сейчас не были в этой ситуации.", "прошлое → сейчас"],
        ["If I didn't trust you, I wouldn't have lent you the car.", "Если бы я тебе не доверял, не одолжил бы машину.", "постоянная черта → прошлое"]
      ),
      tip("Подсказки в контексте: now/today/still → настоящий результат; yesterday/last year → прошлое событие.")
    ], [
      TS(
        "cond-t10 cond-mixed 2 B2",
        "Почему в «If I had studied medicine, I would be a doctor now» во второй части нет have?",
        ["Результат относится к настоящему (now), поэтому would + V1.", "Mixed: прошлое условие → настоящий результат."],
        ["Это ошибка: нужно would have been.", "Would have been относило бы результат в прошлое, противоречит now.", "TIMELINE"],
        ["Потому что be — неправильный глагол.", "Не связано.", "THEORY"],
        ["Потому что had уже стоит в первой части.", "Форма главной части определяется временем результата.", "THEORY"],
        { ce: "If I had studied medicine, I would have become a doctor in 2015 — результат в прошлом." }
      ),
      TS(
        "cond-t11 cond-mixed 3 C1",
        "Какой временной план у условия в «If she weren't so stubborn, she would have accepted the offer»?",
        ["Настоящее (постоянная черта характера), результат — прошлое.", "Weren't = постоянное нереальное условие."],
        ["Прошлое, как и результат.", "Для прошлого условия было бы hadn't been.", "TIMELINE"],
        ["Будущее.", "Не будущее.", "TIMELINE"],
        ["Условие и результат — оба настоящее.", "Would have accepted — прошлое.", "TIMELINE"],
        { ce: "If she hadn't been so stubborn yesterday — разовое поведение в прошлом → third." }
      ),
      TS(
        "cond-t12 cond-mixed 2 B2",
        "Какая подсказка в предложении указывает на mixed conditional?",
        ["Наречие now/today/still в главной части при прошлом условии.", "Разные временные маркеры в двух частях."],
        ["Слово if.", "If есть во всех типах.", "THEORY"],
        ["Наличие would.", "Would есть в second и third.", "THEORY"],
        ["Отрицание.", "Отрицание не определяет тип.", "THEORY"],
        { ce: "If I had left earlier, I would have caught the train — оба плана в прошлом → third." }
      )
    ]),
    L("cond-unless", "Unless, provided that, as long as, in case, otherwise", "Выбирать союз условия по смыслу: исключение, оговорка, мера предосторожности.", [
      p("**Unless** ≈ if not / except if: _We'll go unless it rains_. **Provided (that) / providing / as long as / on condition that** — «только при условии»: подчёркивают ограничение. **In case** — НЕ условие, а **мера предосторожности**: _Take an umbrella in case it rains_ (возьми в любом случае, на всякий случай). **Otherwise** — «иначе»."),
      tb(["Союз", "Смысл", "Пример"], [
        ["unless", "если не; кроме случая", "Don't call unless it's urgent."],
        ["provided that", "только если (формально)", "You can work remotely provided that you attend Monday meetings."],
        ["as long as", "при условии, пока", "As long as we stay within budget, they'll approve."],
        ["in case", "на случай если", "Save a copy in case the system crashes."],
        ["otherwise", "иначе", "Book now; otherwise the price will go up."]
      ]),
      ex(
        ["I won't sign unless they change clause 4.", "Я не подпишу, пока они не изменят пункт 4.", "unless + Present Simple"],
        ["I'll take the charger in case my battery runs out.", "Возьму зарядку, на случай если сядет батарея.", "in case: беру в любом случае"]
      ),
      warn("После unless не ставят второе отрицание: ~~unless you don't hurry~~ → _unless you hurry_ (или _if you don't hurry_).")
    ], [
      TS(
        "cond-t13 cond-unless 2 B2",
        "Чем отличаются «I'll take an umbrella if it rains» и «I'll take an umbrella in case it rains»?",
        ["If — возьму только если пойдёт дождь; in case — возьму заранее на всякий случай.", "In case — мера предосторожности, а не условие."],
        ["Ничем.", "Смысл различается.", "MEANING"],
        ["In case грамматически неверно.", "Оба верны.", "THEORY"],
        ["If — заранее, in case — после дождя.", "Наоборот.", "MEANING"],
        { ce: "Call me if you need help (позвони при необходимости) vs I'll keep my phone on in case you need help." }
      ),
      TS(
        "cond-t14 cond-unless 2 B2",
        "Почему «Unless you don't hurry, you'll miss the bus» — ошибка?",
        ["Unless уже содержит отрицание (= if not); двойное отрицание искажает смысл.", "Нужно Unless you hurry / If you don't hurry."],
        ["Потому что после unless нужен will.", "Будущее в условной части — настоящим временем.", "FORM"],
        ["Потому что unless используется только в прошлом.", "Используется в любых временах.", "THEORY"],
        ["Ошибки нет.", "Смысл получается обратным.", "MEANING"],
        { ce: "Unless you hurry, you'll miss the bus." }
      ),
      TS(
        "cond-t15 cond-unless 2 C1",
        "Когда provided that уместнее, чем if?",
        ["Когда нужно подчеркнуть, что условие — обязательная оговорка (часто в формальном/договорном контексте).", "Provided that = только при соблюдении условия."],
        ["Когда условие нереальное.", "Для нереального — if + past.", "THEORY"],
        ["Для мер предосторожности.", "Это in case.", "MEANING"],
        ["Никогда — это устаревшая форма.", "Активно используется в деловом английском.", "REGISTER"],
        { ce: "If you like it, buy it — простое условие, оговорка не нужна." }
      )
    ]),
    L("cond-inversion", "Инверсия в условных предложениях", "Строить формальные условные без if: Should..., Were..., Had...", [
      p("В формальном стиле if можно опустить, поставив вспомогательный глагол перед подлежащим. **Should** — для first conditional (маловероятно, формально), **Were** — для second, **Had** — для third."),
      tb(["Тип", "С if", "С инверсией"], [
        ["First", "If you have any questions, contact us.", "Should you have any questions, contact us."],
        ["Second", "If I were in your position, I'd wait.", "Were I in your position, I'd wait."],
        ["Second (+ to)", "If we were to lose the client...", "Were we to lose the client..."],
        ["Third", "If we had known, we'd have acted.", "Had we known, we'd have acted."]
      ]),
      ex(
        ["Should the meeting be cancelled, you will be notified by email.", "Если встреча будет отменена, вас уведомят по почте.", "типично для официальных писем"],
        ["Had it not been for your help, we would have failed.", "Если бы не ваша помощь, мы бы не справились.", "отрицание: Had it not been"]
      ),
      warn("Отрицание при инверсии без сокращения: _Had we not known_, не ~~Hadn't we known~~.")
    ], [
      TS(
        "cond-t16 cond-inversion 2 C1",
        "Почему «Hadn't we left early, we'd have missed it» считается ошибкой?",
        ["При условной инверсии отрицание не сокращается: Had we not left early...", "Hadn't + подлежащее звучит как вопрос."],
        ["Потому что инверсия возможна только с should.", "Возможна с should/were/had.", "THEORY"],
        ["Потому что нужно Didn't we leave.", "Did не используется в условной инверсии.", "AUXILIARY"],
        ["Ошибки нет.", "Сокращённая форма в инверсии нестандартна.", "STRUCTURE"],
        { ce: "Had we not left early, we'd have missed it." }
      ),
      TS(
        "cond-t17 cond-inversion 2 C1",
        "Какая инверсия соответствует «If you should need assistance»?",
        ["Should you need assistance", "Should + подлежащее + V1."],
        ["Would you need assistance", "Would не используется в условной инверсии.", "STRUCTURE"],
        ["Did you need assistance", "Did — вопрос, не условие.", "STRUCTURE"],
        ["Should you needed assistance", "После should — V1.", "FORM"],
        { ce: "If you need assistance — нейтральный вариант без инверсии." }
      ),
      TS(
        "cond-t18 cond-inversion 2 C1",
        "Чем «Were we to lose this client...» отличается от «If we lose this client...»?",
        ["Первое — формальная гипотеза о маловероятном; второе — реальная возможность.", "Were + to-infinitive = маловероятное будущее."],
        ["Первое — о прошлом.", "Речь о будущем.", "TIMELINE"],
        ["Второе — формальнее.", "Инверсия формальнее.", "REGISTER"],
        ["Ничем.", "Различаются вероятностью и регистром.", "MODALITY"],
        { ce: "Had we lost this client... — о прошлом (third)." }
      )
    ]),
    L("cond-wish", "Wish и If only", "Выражать сожаление о настоящем и прошлом и желание изменить чужое поведение.", [
      p("**Wish / if only + Past Simple** — сожаление о настоящем: _I wish I spoke German_ (не говорю). **Wish + Past Perfect** — сожаление о прошлом: _I wish I had accepted the offer_ (не принял). **Wish + would** — желание, чтобы кто-то/что-то изменилось (часто раздражение): _I wish you would stop interrupting_."),
      tb(["Сожаление о", "Форма", "Пример"], [
        ["настоящем", "wish + V2 / were", "I wish I had more time."],
        ["прошлом", "wish + had + V3", "I wish I hadn't said that."],
        ["чужом поведении", "wish + someone + would", "I wish he would reply."],
        ["способности", "wish + could", "I wish I could come."]
      ]),
      ex(
        ["If only we had backed up the files!", "Если бы только мы сделали резервную копию!", "сильнее, чем wish"],
        ["I wish it would stop raining.", "Хоть бы дождь перестал.", "внешнее изменение"]
      ),
      warn("~~I wish I would...~~ о себе неестественно: нельзя «желать», чтобы ты сам захотел. Используйте _I wish I could / I wish I did_.")
    ], [
      TS(
        "cond-t19 cond-wish 2 B2",
        "Что значит «I wish I knew the answer»?",
        ["Я не знаю ответа и жалею об этом (сейчас).", "Wish + V2 — сожаление о настоящем."],
        ["Я знал ответ в прошлом.", "Knew здесь не про прошлое.", "TIMELINE"],
        ["Я узнаю ответ позже.", "Не прогноз.", "MEANING"],
        ["Я не знал ответа в прошлом.", "Для прошлого — wish I had known.", "TIMELINE"],
        { ce: "I wish I had known the answer — сожаление о прошлом." }
      ),
      TS(
        "cond-t20 cond-wish 2 C1",
        "Почему «I wish I would be taller» звучит неестественно?",
        ["Wish + would — про чужое поведение/изменения; о своём состоянии — wish + V2: I wish I were taller.", "Would после wish с I обычно не используется."],
        ["Потому что tall — прилагательное.", "Не причина.", "THEORY"],
        ["Нужно I wish I will be taller.", "Will после wish не используется.", "FORM"],
        ["Ошибки нет.", "Конструкция нестандартна.", "STRUCTURE"],
        { ce: "I wish you would be more patient — о поведении другого человека, допустимо." }
      ),
      TS(
        "cond-t21 cond-wish 2 B2",
        "Какая форма передаёт раздражение чужой привычкой?",
        ["I wish you would stop leaving dishes in the sink.", "Wish + would — желание, чтобы человек изменил поведение."],
        ["I wish you stopped leaving dishes in the sink.", "Грамматически возможно, но без значения просьбы-раздражения.", "MEANING"],
        ["I wish you had stopped leaving dishes.", "Сожаление о прошлом.", "TIMELINE"],
        ["I wish you stop leaving dishes.", "После wish нужна прошедшая форма или would.", "FORM"],
        { ce: "I wish you were here — сожаление о текущей ситуации, без раздражения." }
      )
    ]),
    L("cond-unreal-past", "Нереальное прошедшее: would rather, it's time, as if, suppose", "Узнавать прошедшую форму с нереальным значением после особых конструкций.", [
      p("Прошедшая форма выражает нереальность и после других конструкций: **It's (high) time + V2** — давно пора; **would rather + someone + V2** — я бы предпочёл, чтобы кто-то...; **as if / as though + V2/had V3** — как будто; **suppose / imagine + V2** — предположим."),
      tb(["Конструкция", "Пример", "Смысл"], [
        ["It's time we left.", "Нам пора уходить.", "давно пора (критика задержки)"],
        ["I'd rather you didn't tell anyone.", "Я бы предпочёл, чтобы ты никому не говорил.", "вежливая просьба"],
        ["I'd rather stay here.", "Я бы лучше остался здесь.", "без нового подлежащего — V1"],
        ["He talks as if he knew everything.", "Он говорит так, будто всё знает.", "нереальное сравнение"],
        ["Suppose you lost your job — what would you do?", "Предположим, ты потерял работу...", "гипотеза"]
      ]),
      ex(
        ["It's high time the company updated its security policy.", "Компании давно пора обновить политику безопасности.", ""],
        ["She looked as though she had seen a ghost.", "Она выглядела так, будто увидела привидение.", "as though + had V3"]
      ),
      warn("I'd rather + V1, но I'd rather you + V2: _I'd rather go_ / _I'd rather you went_.")
    ], [
      TS(
        "cond-t22 cond-unreal-past 2 C1",
        "Почему «I'd rather you don't call after 10» звучит неграмотно в нейтральной норме?",
        ["После would rather + новое подлежащее нужна прошедшая форма: I'd rather you didn't call.", "Прошедшая форма выражает нереальность/вежливую дистанцию."],
        ["Потому что после rather нужен V-ing.", "Нет.", "FORM"],
        ["Потому что нельзя использовать you.", "Можно.", "STRUCTURE"],
        ["Ошибки нет.", "В разговорной речи встречается, но норма — Past Simple.", "THEORY"],
        { ce: "I'd rather not call after 10 — без нового подлежащего, V1." }
      ),
      TS(
        "cond-t23 cond-unreal-past 2 B2",
        "Что выражает «It's time we started»?",
        ["Пора начинать, мы уже опаздываем.", "It's time + V2 подчёркивает, что действие давно назрело."],
        ["Мы уже начали.", "Started — нереальная форма, не прошлое.", "TIMELINE"],
        ["Мы начали вовремя.", "Нет.", "MEANING"],
        ["Нам не нужно начинать.", "Противоположно.", "MEANING"],
        { ce: "It's time to start — нейтрально, без оттенка запоздалости." }
      ),
      TS(
        "cond-t24 cond-unreal-past 3 C1",
        "Когда после as if возможно настоящее время?",
        ["Когда сравнение может быть правдой: It looks as if it's going to rain.", "Present — реальная вероятность; past — нереальность."],
        ["Никогда.", "Возможно при реальной вероятности.", "THEORY"],
        ["Только с глаголом be.", "Не только.", "THEORY"],
        ["Только в вопросах.", "Нет.", "THEORY"],
        { ce: "He acts as if he owned the place — он не владелец (нереально)." }
      )
    ]),
    L("cond-variants", "Варианты: if it weren't for, but for, if + should/happen to", "Использовать продвинутые варианты условий в формальной и деловой речи.", [
      p("**If it weren't for + noun** — если бы не (сейчас): _If it weren't for the subsidy, the project would close._ **If it hadn't been for + noun** — если бы не (в прошлом). **But for + noun** — формальный аналог. **If + should / happen to** — подчёркивает малую вероятность: _If you happen to see Max, say hi._ **Supposing / what if** — гипотеза."),
      ex(
        ["If it hadn't been for the backup, we would have lost everything.", "Если бы не бэкап, мы бы всё потеряли.", ""],
        ["But for your support, the launch would have failed.", "Если бы не ваша поддержка, запуск провалился бы.", "formal"],
        ["What if the supplier doesn't deliver on time?", "А что, если поставщик не успеет?", "реальная обеспокоенность"],
        ["If you should change your mind, let me know.", "Если вдруг передумаете, дайте знать.", "малая вероятность"]
      ),
      tip("What if + present — реальное беспокойство; what if + past — гипотеза: _What if we moved the deadline?_")
    ], [
      TS(
        "cond-t25 cond-variants 2 C1",
        "Что выражает «If it weren't for his experience, we'd be lost»?",
        ["Благодаря его опыту мы справляемся (сейчас).", "If it weren't for = если бы не (настоящее)."],
        ["У него нет опыта.", "Наоборот: опыт есть.", "MEANING"],
        ["Мы потерялись в прошлом.", "Речь о настоящем.", "TIMELINE"],
        ["Мы потеряемся в будущем.", "Не прогноз.", "TIMELINE"],
        { ce: "If it hadn't been for his experience, we would have been lost — о прошлом." }
      ),
      TS(
        "cond-t26 cond-variants 2 C1",
        "Чем «What if we postpone?» отличается от «What if we postponed?»?",
        ["Первое — реальное предложение/вариант, второе — более осторожная гипотеза.", "Прошедшая форма добавляет дистанцию."],
        ["Второе — о прошлом.", "Не о прошлом: гипотетичность.", "TIMELINE"],
        ["Первое неверно.", "Оба верны.", "THEORY"],
        ["Ничем.", "Различается степень предположительности/вежливости.", "MODALITY"],
        { ce: "What if we had postponed? — о прошлом." }
      ),
      TS(
        "cond-t27 cond-variants 2 B2",
        "Что добавляет happen to в «If you happen to be in Kazan, call me»?",
        ["Подчёркивает случайность и малую вероятность.", "Happen to = «если вдруг, случайно»."],
        ["Делает условие нереальным в прошлом.", "Нет.", "TIMELINE"],
        ["Превращает условие в приказ.", "Нет.", "MEANING"],
        ["Означает обязанность.", "Нет.", "MODALITY"],
        { ce: "If you are in Kazan, call me — нейтральное условие." }
      )
    ])
  ], practice4 = [
    // zero/first
    S(
      "con-001 cond-zero-first 1 B2",
      "If you ___ water to 100°C, it boils.",
      ["heat", "Zero conditional: Present Simple в обеих частях."],
      ["will heat", "Will в if-части недопустим.", "FORM"],
      ["heated", "Past — это второй тип.", "FORM"],
      ["would heat", "Would — гипотеза.", "FORM"]
    ),
    S(
      "con-002 cond-zero-first 1 B2",
      "If the client ___ the proposal, we'll start next week.",
      ["approves", "First conditional: if + Present Simple."],
      ["will approve", "Will в if-части недопустим.", "FORM"],
      ["approved", "Past — гипотеза.", "FORM"],
      ["approve", "Client — 3-е лицо ед. ч.", "AGREEMENT"]
    ),
    I2(
      "con-003 cond-zero-first 1 B2",
      "If it ___ (rain) tomorrow, we'll move the event indoors.",
      ["rains"],
      "First conditional: if + Present Simple.",
      "FORM",
      [[["will rain"], "FORM", "Will в if-части не используется."], [["rain"], "AGREEMENT", "It — 3-е лицо: rains."], [["rained"], "FORM", "Past — второй тип."]]
    ),
    S(
      "con-004 cond-zero-first 2 B2",
      "If you ___ the report, send it to me.",
      ["'ve finished", "Present Perfect в if-части подчёркивает завершённость (возможно и finish)."],
      ["'ll finish", "Will недопустим.", "FORM"],
      ["'d finish", "Would — гипотеза.", "FORM"],
      ["'ll have finished", "Future Perfect в if-части недопустим.", "FORM"]
    ),
    S(
      "con-005 cond-zero-first 2 B2",
      "If the meeting ___ late, I'll miss my train.",
      ["runs", "If + Present Simple."],
      ["will run", "Will недопустим.", "FORM"],
      ["would run", "Гипотеза.", "FORM"],
      ["ran", "Second conditional.", "FORM"]
    ),
    FX("con-006 cond-zero-first 1 B2", "Найдите и исправьте ошибку.", ["If", "the price", { t: "will go", fix: ["goes"], tag: "FORM" }, "up,", "we'll buy fewer licences."], "If-часть — Present Simple: goes."),
    S(
      "con-007 cond-zero-first 2 C1",
      "If you'll take a seat, the manager ___ with you in a moment.",
      ["will be", "If you'll... — вежливая просьба; главная часть — будущее."],
      ["would be", "Would — гипотеза.", "FORM"],
      ["is", "Present Simple не передаёт обещание.", "FORM"],
      ["was", "Прошлое.", "TIMELINE"]
    ),
    S(
      "con-008 cond-zero-first 2 B2",
      "If you see a red light on the router, it ___ there's no connection.",
      ["means", "Zero conditional — закономерность."],
      ["would mean", "Гипотеза.", "FORM"],
      ["meant", "Прошлое/гипотеза.", "FORM"],
      ["will meant", "Неверная форма.", "FORM"]
    ),
    // second
    S(
      "con-009 cond-second 1 B2",
      "If I ___ more time, I'd take an evening course.",
      ["had", "Second conditional: if + Past Simple."],
      ["have", "Present — реальное условие, но would в главной части требует past.", "FORM"],
      ["will have", "Will недопустим.", "FORM"],
      ["would have", "Would в if-части не используется.", "FORM"]
    ),
    S(
      "con-010 cond-second 1 B2",
      "If I ___ you, I'd ask for a written confirmation.",
      ["were", "If I were you — совет."],
      ["am", "Реальное условие нелогично.", "FORM"],
      ["will be", "Will недопустим.", "FORM"],
      ["had been", "Third — о прошлом.", "TIMELINE"]
    ),
    I2(
      "con-011 cond-second 2 B2",
      "What ___ you ___ (do) if the server went down during the demo?",
      ["would do"],
      "Second conditional: what would you do if + Past Simple. Введите would + глагол.",
      "FORM",
      [[["will do"], "FORM", "Went требует would в главной части."], [["did"], "FORM", "Главная часть — would + V1."], [["would have done"], "TIMELINE", "Это третий тип (прошлое)."]]
    ),
    S(
      "con-012 cond-second 2 B2",
      "We ___ finish on time if we hired two more developers.",
      ["could", "Could + V1 — возможность в гипотезе."],
      ["can", "Can — реальная ситуация, не сочетается с hired.", "FORM"],
      ["will", "Будущее реальное.", "FORM"],
      ["could have", "Третий тип.", "TIMELINE"]
    ),
    S(
      "con-013 cond-second 3 C1",
      "If I ___ the job (and I doubt I will), I'd move to Berlin.",
      ["got", "Маловероятное будущее → second conditional."],
      ["get", "Get — реальный сценарий; противоречит «I doubt I will» и would.", "MODALITY"],
      ["will get", "Will недопустим.", "FORM"],
      ["had got", "Третий тип — о прошлом.", "TIMELINE"]
    ),
    FX("con-014 cond-second 2 B2", "Найдите и исправьте ошибку.", ["If", "I", { t: "would know", fix: ["knew"], tag: "FORM" }, "the password,", "I would tell you."], "If-часть второго типа — Past Simple: knew."),
    S(
      "con-015 cond-second 2 B2",
      "If our office ___ closer to the station, more people would come in.",
      ["were", "Second conditional; were — норма (was — разговорно)."],
      ["is", "Реальное условие.", "FORM"],
      ["would be", "Would в if-части не используется.", "FORM"],
      ["has been", "Perfect.", "FORM"],
      { note: "If our office was closer... — разговорный вариант, тоже понятен." }
    ),
    // third
    S(
      "con-016 cond-third 1 B2",
      "If we ___ the update, we wouldn't have lost the data.",
      ["had tested", "Third conditional: if + Past Perfect."],
      ["tested", "Second conditional — не сочетается с would have lost.", "FORM"],
      ["would have tested", "Would в if-части не используется.", "FORM"],
      ["have tested", "Present Perfect.", "FORM"]
    ),
    I2(
      "con-017 cond-third 1 B2",
      "If you had told me earlier, I ___ (help) you.",
      ["would have helped"],
      "Third conditional: would have + V3.",
      "FORM",
      [[["would help"], "TIMELINE", "Would help — о настоящем (mixed); здесь результат в прошлом."], [["will have helped"], "FORM", "Will недопустим."], [["would have help"], "FORM", "После have — V3."]]
    ),
    S(
      "con-018 cond-third 2 B2",
      "She ___ the promotion if she had applied.",
      ["might have got", "Might have + V3 — возможный результат в прошлом."],
      ["might get", "О будущем/настоящем.", "TIMELINE"],
      ["had got", "Past Perfect в главной части.", "FORM"],
      ["will have got", "Will недопустим.", "FORM"],
      { note: "might have gotten (AmE) — равноценно." }
    ),
    S(
      "con-019 cond-third 2 B2",
      "If he ___ his alarm, he wouldn't have missed the interview.",
      ["hadn't ignored", "Отрицательное условие в прошлом."],
      ["didn't ignore", "Second conditional.", "FORM"],
      ["wouldn't ignore", "Would в if-части.", "FORM"],
      ["hasn't ignored", "Present Perfect.", "FORM"]
    ),
    FX("con-020 cond-third 2 B2", "Найдите и исправьте ошибку.", ["If", "they", { t: "would have asked", fix: ["had asked"], tag: "FORM" }, "us,", "we would have agreed."], "В if-части третьего типа — Past Perfect: had asked."),
    O("con-021 cond-third 2 B2", "Постройте: «Если бы мы выехали раньше, мы бы успели на рейс».", ["If", "we", "had", "left", "earlier,", "we", "would", "have", "caught", "the", "flight"], "If + had + V3, would + have + V3.", "STRUCTURE", ["We would have caught the flight if we had left earlier,"]),
    S(
      "con-022 cond-third 3 C1",
      "We ___ the deadline if the supplier hadn't let us down.",
      ["would have met", "Third: результат в прошлом."],
      ["would meet", "Mixed — результат сейчас; здесь дедлайн в прошлом.", "TIMELINE"],
      ["had met", "Past Perfect в главной части.", "FORM"],
      ["will meet", "Будущее.", "TIMELINE"]
    ),
    // mixed
    S(
      "con-023 cond-mixed 2 B2",
      "If I had taken that job in Dubai, I ___ there now.",
      ["would be living", "Прошлое условие → настоящий результат (now)."],
      ["would have lived", "Результат в прошлом противоречит now.", "TIMELINE"],
      ["will live", "Реальное будущее.", "FORM"],
      ["had lived", "Past Perfect в главной части.", "FORM"]
    ),
    S(
      "con-024 cond-mixed 3 C1",
      "If she weren't so impatient, she ___ the last question more carefully.",
      ["would have read", "Постоянное условие → прошлый результат."],
      ["would read", "Результат в прошлом (последний вопрос уже был).", "TIMELINE"],
      ["had read", "Past Perfect в главной части.", "FORM"],
      ["will read", "Будущее.", "TIMELINE"]
    ),
    I2(
      "con-025 cond-mixed 2 B2",
      "If you had listened to the advice, we ___ (not / be) in this mess now.",
      ["wouldn't be", "would not be"],
      "Прошлое условие → настоящий результат: wouldn't + V1.",
      "TIMELINE",
      [[["wouldn't have been", "would not have been"], "TIMELINE", "Now → результат в настоящем."], [["won't be"], "FORM", "Реальное будущее."]]
    ),
    S(
      "con-026 cond-mixed 2 C1",
      "If I ___ French, I would have applied for the job in Lyon.",
      ["spoke", "Постоянное нереальное условие (не говорю) → прошлый результат."],
      ["had spoken", "Past Perfect относил бы условие к прошлому эпизоду; знание языка — постоянное.", "TIMELINE"],
      ["speak", "Реальное условие.", "FORM"],
      ["would speak", "Would в if-части.", "FORM"],
      { note: "If I had spoken French back then — тоже возможно, если речь о прошлом периоде; без «back then» естественнее spoke." }
    ),
    M(
      "con-027 cond-mixed 3 C1",
      "Выберите 2 mixed conditionals.",
      ["If I had saved more, I wouldn't be worried now.", !0, "Прошлое → настоящее."],
      ["If he were more organised, he wouldn't have missed the deadline.", !0, "Постоянная черта → прошлое."],
      ["If I had saved more, I wouldn't have worried.", !1, "Чистый third.", "THEORY"],
      ["If he were more organised, he wouldn't miss deadlines.", !1, "Чистый second.", "THEORY"],
      ["If it rains, we'll stay in.", !1, "First.", "THEORY"]
    ),
    // unless etc.
    S(
      "con-028 cond-unless 1 B2",
      "We won't sign the contract ___ they reduce the price.",
      ["unless", "Unless = if not."],
      ["in case", "In case — мера предосторожности.", "MEANING"],
      ["otherwise", "Otherwise — «иначе», связывает предложения.", "STRUCTURE"],
      ["despite", "Уступка, не условие.", "MEANING"]
    ),
    S(
      "con-029 cond-unless 2 B2",
      "Take a power bank ___ your phone runs out of battery.",
      ["in case", "Мера предосторожности: возьми заранее."],
      ["unless", "Unless = если не — смысл ломается.", "MEANING"],
      ["provided", "Условие-оговорка.", "MEANING"],
      ["as long as", "Условие.", "MEANING"]
    ),
    S(
      "con-030 cond-unless 2 C1",
      "You can work remotely ___ you attend the Monday meetings in person.",
      ["provided that", "Оговорка-условие."],
      ["in case", "Предосторожность.", "MEANING"],
      ["unless", "Unless изменил бы смысл на противоположный.", "MEANING"],
      ["even if", "Уступка: «даже если».", "MEANING"]
    ),
    FX("con-031 cond-unless 2 B2", "Найдите и исправьте ошибку.", [{ t: "Unless you don't book", fix: ["Unless you book", "If you don't book"], tag: "MEANING" }, "today,", "the price", "will go up."], "Unless уже содержит отрицание."),
    S(
      "con-032 cond-unless 2 B2",
      "Back up your work regularly; ___ you might lose hours of effort.",
      ["otherwise", "Otherwise = иначе."],
      ["unless", "Unless требует придаточного с подлежащим и сказуемым после себя.", "STRUCTURE"],
      ["in case", "Смысл ломается.", "MEANING"],
      ["provided", "Смысл ломается.", "MEANING"]
    ),
    I2(
      "con-033 cond-unless 2 B2",
      "I'll come to the party ___ (if not) I have to work late. (одно слово)",
      ["unless"],
      "Unless = if not.",
      "VOCAB_MEANING",
      [[["if"], "MEANING", "If изменил бы смысл."], [["except"], "STRUCTURE", "Except требует that/if: except if."]]
    ),
    S(
      "con-034 cond-unless 3 C1",
      "___ we stay within budget, the board will approve the next phase.",
      ["As long as", "Условие «пока / при условии»."],
      ["In case", "Предосторожность.", "MEANING"],
      ["Unless", "Противоположный смысл.", "MEANING"],
      ["Even though", "Уступка о факте.", "MEANING"]
    ),
    MA(
      "con-035 cond-unless 2 C1",
      "Соотнесите союз и смысл.",
      ["Условие-оговорка", "Мера предосторожности", "Если не"],
      [
        ["provided that", 0],
        ["in case", 1],
        ["unless", 2],
        ["as long as", 0],
        ["on condition that", 0],
        ["just in case", 1]
      ],
      "Provided that / as long as / on condition that — оговорки; in case — предосторожность; unless — если не.",
      "MEANING"
    ),
    // inversion
    S(
      "con-036 cond-inversion 2 C1",
      "___ you have any questions, please contact our support team.",
      ["Should", "Should + подлежащее — формальная инверсия первого типа."],
      ["Would", "Would не используется в инверсии.", "STRUCTURE"],
      ["Did", "Did — вопрос.", "STRUCTURE"],
      ["Had", "Had — третий тип.", "TIMELINE"]
    ),
    S(
      "con-037 cond-inversion 2 C1",
      "___ we known about the delay, we would have informed the client.",
      ["Had", "Had + подлежащее + V3 — третий тип."],
      ["Have", "Have не используется в условной инверсии.", "STRUCTURE"],
      ["Should", "Should — первый тип.", "TIMELINE"],
      ["Did", "Did — вопрос.", "STRUCTURE"]
    ),
    I2(
      "con-038 cond-inversion 2 C1",
      "___ I in your position, I would accept the offer. (одно слово)",
      ["Were"],
      "Were + подлежащее — инверсия второго типа.",
      "STRUCTURE",
      [[["Was"], "STRUCTURE", "В инверсии используется только were."], [["If"], "STRUCTURE", "If I in... — пропущен глагол."]]
    ),
    FX("con-039 cond-inversion 3 C1", "Найдите и исправьте ошибку.", [{ t: "Hadn't it been", fix: ["Had it not been"], tag: "STRUCTURE" }, "for the backup,", "we would have lost", "the whole database."], "При инверсии отрицание не сокращается."),
    O("con-040 cond-inversion 2 C1", "Постройте формальное: «Если вам понадобится помощь, позвоните».", ["Should", "you", "need", "help,", "please", "call"], "Should + подлежащее + V1.", "STRUCTURE"),
    S(
      "con-041 cond-inversion 3 C1",
      "___ the merger to fail, hundreds of jobs would be at risk.",
      ["Were", "Were + подлежащее + to-infinitive — маловероятная гипотеза."],
      ["Should", "Should the merger fail — без to.", "FORM"],
      ["Had", "Had the merger failed — без to и о прошлом.", "FORM"],
      ["Would", "Would не используется в инверсии.", "STRUCTURE"]
    ),
    // wish
    S(
      "con-042 cond-wish 1 B2",
      "I wish I ___ German — it would help with our Berlin clients.",
      ["spoke", "Сожаление о настоящем: wish + Past Simple."],
      ["speak", "После wish нужна прошедшая форма.", "FORM"],
      ["will speak", "Will недопустим.", "FORM"],
      ["had spoken", "Сожаление о прошлом.", "TIMELINE"]
    ),
    S(
      "con-043 cond-wish 1 B2",
      "I wish I ___ that email — it caused so much trouble.",
      ["hadn't sent", "Сожаление о прошлом: wish + had + V3."],
      ["didn't send", "Сожаление о настоящем/привычке.", "TIMELINE"],
      ["wouldn't send", "Would — о чужом поведении.", "STRUCTURE"],
      ["haven't sent", "Present Perfect.", "FORM"]
    ),
    I2(
      "con-044 cond-wish 2 B2",
      "I wish you ___ (stop) interrupting me in meetings.",
      ["would stop"],
      "Раздражение чужим поведением → wish + would.",
      "STRUCTURE",
      [[["stopped"], "MEANING", "Грамматично, но без оттенка просьбы-раздражения."], [["stop"], "FORM", "После wish нужна прошедшая форма или would."], [["will stop"], "FORM", "Will недопустим."]],
      { accept: ["would stop"], note: "I wish you stopped... — не ошибка грамматики, но меняет оттенок; в этом задании проверяется конструкция раздражения." }
    ),
    S(
      "con-045 cond-wish 2 C1",
      "If only we ___ more time to prepare!",
      ["had", "If only + Past Simple — сожаление о настоящем."],
      ["have", "Нужна прошедшая форма.", "FORM"],
      ["would have", "Would в этой части.", "STRUCTURE"],
      ["will have", "Will недопустим.", "FORM"]
    ),
    S(
      "con-046 cond-wish 2 B2",
      "I wish I ___ come to your wedding, but I'll be abroad.",
      ["could", "Wish + could — сожаление о невозможности."],
      ["can", "Нужна прошедшая форма.", "FORM"],
      ["would", "Wish I would — неестественно о себе.", "STRUCTURE"],
      ["will", "Will недопустим.", "FORM"]
    ),
    FX("con-047 cond-wish 2 C1", "Найдите и исправьте ошибку.", ["I wish", "I", { t: "would have", fix: ["had"], tag: "STRUCTURE" }, "a bigger flat."], "Сожаление о настоящем о себе: wish + Past Simple — I wish I had."),
    // unreal past
    S(
      "con-048 cond-unreal-past 2 B2",
      "It's high time we ___ our pricing strategy.",
      ["reviewed", "It's time + Past Simple."],
      ["review", "После it's time + подлежащее — прошедшая форма.", "FORM"],
      ["will review", "Will недопустим.", "FORM"],
      ["have reviewed", "Perfect.", "FORM"]
    ),
    S(
      "con-049 cond-unreal-past 2 C1",
      "I'd rather you ___ this with anyone outside the team.",
      ["didn't discuss", "Would rather + подлежащее + Past Simple."],
      ["don't discuss", "Нужна прошедшая форма.", "FORM"],
      ["not discuss", "Не хватает вспомогательного.", "AUXILIARY"],
      ["won't discuss", "Will недопустим.", "FORM"]
    ),
    S(
      "con-050 cond-unreal-past 2 B2",
      "I'd rather ___ by train than fly.",
      ["go", "Would rather + V1 (без нового подлежащего)."],
      ["went", "Прошедшая форма — только с новым подлежащим.", "FORM"],
      ["to go", "Без to.", "FORM"],
      ["going", "Нужен V1.", "FORM"]
    ),
    S(
      "con-051 cond-unreal-past 2 C1",
      "He spoke about the project as if he ___ it himself, though he joined last week.",
      ["had designed", "Нереальное сравнение о прошлом → as if + had + V3."],
      ["designs", "Реальное — противоречит контексту.", "FORM"],
      ["would design", "Would не используется после as if в этом значении.", "STRUCTURE"],
      ["has designed", "Perfect настоящего.", "FORM"]
    ),
    I2(
      "con-052 cond-unreal-past 2 C1",
      "Suppose you ___ (lose) your biggest client tomorrow — what would you do?",
      ["lost"],
      "Suppose + Past Simple — гипотеза.",
      "FORM",
      [[["lose"], "MODALITY", "Lose — реальное предположение; would в главной части требует lost."], [["will lose"], "FORM", "Will недопустим."]]
    ),
    // variants
    S(
      "con-053 cond-variants 2 C1",
      "If it ___ for her quick thinking, the presentation would have been a disaster.",
      ["hadn't been", "If it hadn't been for — если бы не (прошлое)."],
      ["weren't", "If it weren't for — о настоящем; результат здесь прошлый.", "TIMELINE"],
      ["wasn't been", "Неверная форма.", "FORM"],
      ["wouldn't be", "Would в if-части.", "FORM"]
    ),
    S(
      "con-054 cond-variants 2 C1",
      "___ for the government subsidy, the factory would close.",
      ["If it weren't", "Если бы не (сейчас) → If it weren't for."],
      ["If it hadn't been", "Результат в настоящем (would close).", "TIMELINE"],
      ["Unless", "Unless for — неверно.", "STRUCTURE"],
      ["In case", "Предосторожность.", "MEANING"]
    ),
    S(
      "con-055 cond-variants 2 C1",
      "___ your help, we would never have finished in time. (formal)",
      ["But for", "But for + noun — формальное «если бы не»."],
      ["Except", "Except = кроме; не условие.", "MEANING"],
      ["Unless", "Unless + noun невозможно.", "STRUCTURE"],
      ["Despite", "Уступка.", "MEANING"]
    ),
    S(
      "con-056 cond-variants 2 B2",
      "If you ___ to see Max at the conference, tell him to call me.",
      ["happen", "If you happen to — если вдруг."],
      ["will happen", "Will недопустим.", "FORM"],
      ["happened", "Не согласуется с повелительным tell.", "FORM"],
      ["happens", "You → happen.", "AGREEMENT"]
    ),
    S(
      "con-057 cond-variants 2 C1",
      "«What if we ___ the launch by a week?» (cautious suggestion)",
      ["postponed", "What if + Past Simple — осторожное предложение-гипотеза."],
      ["will postpone", "Will недопустим.", "FORM"],
      ["had postponed", "О прошлом.", "TIMELINE"],
      ["would postpone", "Would после what if неестественно.", "STRUCTURE"],
      { note: "What if we postpone the launch? — тоже верно, но звучит как прямое предложение; здесь просили осторожный вариант." }
    ),
    // mixed review
    MA(
      "con-058 cond-third 2 B2",
      "Определите тип условного предложения.",
      ["First", "Second", "Third", "Mixed"],
      [
        ["If we win the tender, we'll hire more staff.", 0],
        ["If we won the tender, we'd hire more staff.", 1],
        ["If we had won the tender, we would have hired more staff.", 2],
        ["If we had won the tender, we would be hiring now.", 3],
        ["Unless it rains, we'll eat outside.", 0],
        ["If I were taller, I'd play basketball.", 1]
      ],
      "Тип определяется формами обеих частей и временем, к которому они относятся.",
      "FORM"
    ),
    S(
      "con-059 cond-second 2 B2",
      "Which sentence expresses an unlikely future situation?",
      ["If the company went bankrupt, we'd lose our pensions.", "Second conditional — маловероятное будущее."],
      ["If the company goes bankrupt, we'll lose our pensions.", "First — реальная возможность.", "MODALITY"],
      ["If the company had gone bankrupt, we'd have lost our pensions.", "Third — прошлое.", "TIMELINE"],
      ["When the company goes bankrupt, we'll lose our pensions.", "When — уверенность, что произойдёт.", "MODALITY"]
    ),
    S(
      "con-060 cond-zero-first 2 B2",
      "Don't touch the cable ___ the power is off.",
      ["unless", "Не трогай, если питание не выключено."],
      ["in case", "Смысл ломается.", "MEANING"],
      ["as if", "Нереальное сравнение.", "MEANING"],
      ["otherwise", "Otherwise не вводит придаточное.", "STRUCTURE"]
    ),
    I2(
      "con-061 cond-third 2 C1",
      "Had the team ___ (follow) the checklist, the error would have been caught.",
      ["followed"],
      "Инверсия третьего типа: Had + подлежащее + V3.",
      "FORM",
      [[["follow"], "FORM", "После had — V3."], [["following"], "FORM", "Нужен V3."]]
    ),
    S(
      "con-062 cond-mixed 3 C1",
      "If the system ___ properly designed, we wouldn't have needed so many patches.",
      ["were", "Постоянная характеристика системы (сейчас) → прошлый результат; had been тоже возможно, но его нет среди вариантов."],
      ["is", "Реальное условие.", "FORM"],
      ["would be", "Would в if-части.", "FORM"],
      ["will be", "Will недопустим.", "FORM"]
    ),
    S(
      "con-063 cond-wish 3 C1",
      "She wishes she ___ the offer from Google last year — it was a great opportunity.",
      ["had accepted", "Сожаление о прошлом."],
      ["accepted", "Сожаление о настоящем; last year — прошлое.", "TIMELINE"],
      ["would accept", "Would — о чужом поведении.", "STRUCTURE"],
      ["has accepted", "Perfect.", "FORM"]
    ),
    O("con-064 cond-wish 2 B2", "Постройте: «Жаль, что я не знаю его номер».", ["I", "wish", "I", "knew", "his", "number"], "Wish + Past Simple — сожаление о настоящем.", "STRUCTURE"),
    S(
      "con-065 cond-unless 2 B2",
      "I'll lend you my notes ___ you give them back by Friday.",
      ["as long as", "Условие-оговорка."],
      ["in case", "Предосторожность — смысл ломается.", "MEANING"],
      ["unless", "Противоположный смысл.", "MEANING"],
      ["so that", "Цель.", "MEANING"]
    ),
    S(
      "con-066 cond-variants 3 C1",
      "If you ___ need any further information, do not hesitate to contact me. (formal letter)",
      ["should", "If you should — формальная малая вероятность."],
      ["would", "Would в if-части.", "FORM"],
      ["will", "Will — в значении готовности здесь не подходит.", "FORM"],
      ["shall", "Shall в if-части неестественно.", "FORM"]
    ),
    S(
      "con-067 cond-zero-first 2 B2",
      "If you ___ any problems with the installation, call our hotline.",
      ["have", "First conditional с повелительным наклонением: if + Present Simple."],
      ["will have", "Will в if-части недопустим.", "FORM"],
      ["had", "Past — второй тип; не сочетается с повелительным call.", "FORM"],
      ["are having", "Continuous здесь неуместен для общего условия.", "MEANING"]
    ),
    I2(
      "con-068 cond-second 2 B2",
      "If we ___ (have) more data, we could make a better forecast.",
      ["had"],
      "Second conditional: if + Past Simple.",
      "FORM",
      [[["have"], "FORM", "Could в главной части требует прошедшей формы в условии."], [["would have"], "FORM", "Would в if-части недопустим."]]
    ),
    S(
      "con-069 cond-third 2 B2",
      "The project ___ over budget if we hadn't renegotiated the contract.",
      ["would have gone", "Third conditional: результат в прошлом."],
      ["would go", "Результат в настоящем/будущем — не согласуется с hadn't renegotiated.", "TIMELINE"],
      ["will have gone", "Will недопустим.", "FORM"],
      ["had gone", "Past Perfect в главной части.", "FORM"]
    ),
    FX("con-070 cond-second 2 B2", "Найдите и исправьте ошибку.", ["If", "the meeting room", { t: "would be", fix: ["were", "was"], tag: "FORM" }, "bigger,", "we could invite the whole team."], "If-часть второго типа — Past Simple: were (was — разговорно)."),
    S(
      "con-071 cond-mixed 3 C1",
      "If I ___ more confident, I would have asked a question at the conference.",
      ["were", "Постоянная черта (неуверенность) → прошлый результат."],
      ["will be", "Will в if-части недопустим.", "FORM"],
      ["am", "Реальное условие.", "FORM"],
      ["would be", "Would в if-части.", "FORM"]
    ),
    I2(
      "con-072 cond-unless 2 B2",
      "The offer will expire ___ you accept it by Friday. (одно слово)",
      ["unless"],
      "Unless = если не.",
      "VOCAB_MEANING",
      [[["if"], "MEANING", "If изменил бы смысл на противоположный."], [["until"], "MEANING", "Until — до тех пор, пока; не условие."]]
    ),
    S(
      "con-073 cond-unless 3 C1",
      "We'll keep a few spare laptops in the office ___ new hires arrive before their equipment.",
      ["in case", "Мера предосторожности."],
      ["unless", "Смысл ломается: «если не приедут».", "MEANING"],
      ["provided that", "Условие-оговорка; держим ноутбуки в любом случае.", "MEANING"],
      ["as long as", "Условие; смысл ломается.", "MEANING"]
    ),
    S(
      "con-074 cond-inversion 3 C1",
      "___ the funds not be transferred by noon, the order will be cancelled.",
      ["Should", "Should + подлежащее + not + V1 — формальная инверсия."],
      ["Would", "Would не используется в инверсии.", "STRUCTURE"],
      ["Shouldn't", "В инверсии отрицание не сокращается.", "STRUCTURE"],
      ["Had", "Had — третий тип.", "TIMELINE"]
    ),
    O("con-075 cond-inversion 2 C1", "Постройте: «Если бы я знал о проблеме, я бы вмешался» (формально, инверсия).", ["Had", "I", "known", "about", "the", "problem,", "I", "would", "have", "intervened"], "Had + подлежащее + V3, would have + V3.", "STRUCTURE"),
    S(
      "con-076 cond-wish 2 B2",
      "I wish the office ___ so far from my home.",
      ["weren't", "Сожаление о настоящем: wish + Past Simple (weren't / wasn't)."],
      ["isn't", "Нужна прошедшая форма.", "FORM"],
      ["wouldn't be", "Would о состоянии неестественно.", "STRUCTURE"],
      ["hadn't been", "Сожаление о прошлом; офис далеко сейчас.", "TIMELINE"],
      { note: "I wish the office wasn't so far — разговорный вариант, тоже понятен." }
    ),
    I2(
      "con-077 cond-unreal-past 2 C1",
      "It's about time you ___ (start) preparing for the audit.",
      ["started"],
      "It's (about/high) time + подлежащее + Past Simple.",
      "FORM",
      [[["start"], "FORM", "После it's time + подлежащее — прошедшая форма."], [["will start"], "FORM", "Will недопустим."]]
    ),
    S(
      "con-078 cond-variants 2 C1",
      "Supposing the client ___ the contract tomorrow — what would we do?",
      ["cancelled", "Supposing + Past Simple — гипотеза."],
      ["will cancel", "Will недопустим.", "FORM"],
      ["had cancelled", "О прошлом.", "TIMELINE"],
      ["would cancel", "Would не используется в этой части.", "STRUCTURE"]
    ),
    M(
      "con-079 cond-variants 3 C1",
      "Выберите 2 варианта, которые передают «если бы не его помощь (в прошлом)».",
      ["If it hadn't been for his help", !0, "Прошлое."],
      ["Had it not been for his help", !0, "Формальная инверсия."],
      ["If it weren't for his help", !1, "О настоящем.", "TIMELINE"],
      ["Unless his help", !1, "Unless не сочетается с существительным.", "STRUCTURE"],
      ["In case of his help", !1, "In case of — на случай.", "MEANING"]
    ),
    S(
      "con-080 cond-zero-first 2 C1",
      "Which sentence is a general truth rather than a specific prediction?",
      ["If demand rises, prices go up.", "Zero conditional — закономерность."],
      ["If demand rises next month, prices will go up.", "Конкретный прогноз — first.", "MODALITY"],
      ["If demand rose, prices would go up.", "Гипотеза — second.", "MODALITY"],
      ["If demand had risen, prices would have gone up.", "Прошлое — third.", "TIMELINE"]
    )
  ], b04_conditionals_default = block({
    id: "conditionals",
    n: 4,
    title: "Conditionals",
    short: "0/1/2/3, mixed, unless, инверсия, wish",
    blueprint: { size: 26, theory: 6 }
  }, lessons4, practice4);

  // src/content/cases/cases-a.js
  var C = (module, ctx, extra = {}) => Object.assign({ kind: "case", module, ctx }, extra), CASES_A = [
    // ---------- Case-Based Single Choice ----------
    S(
      "cs-01 ten-pp 2 B2",
      "Which reply best fits the situation?",
      ["«Yes, I've just sent it — check your inbox.»", "Только что сделанное действие с результатом сейчас (письмо в ящике) → Present Perfect с just."],
      ["«Yes, I sent it just now yesterday.»", "Just now и yesterday противоречат друг другу.", "TIMELINE"],
      ["«Yes, I had sent it — check your inbox.»", "Past Perfect требует второй точки в прошлом; её нет.", "TIMELINE"],
      ["«Yes, I send it — check your inbox.»", "Present Simple описывает привычку, а не только что выполненное действие.", "FORM"],
      ["«Yes, I was sending it — check your inbox.»", "Continuous показывает процесс, а не результат «письмо уже у тебя».", "MEANING"],
      C("tenses", "It's 4:55 p.m. Your manager writes in the team chat: «Has the client report gone out? They need it before 5.» You finished the report two minutes ago and attached it to an email to the client. The email has already been delivered. You want to answer briefly and accurately.")
    ),
    S(
      "cs-02 ten-pp 2 B2",
      "Which sentence should go into the incident summary?",
      ["«The outage began at 09:12 and lasted 40 minutes.»", "Точное время в прошлом + закрытый эпизод → Past Simple."],
      ["«The outage has begun at 09:12 and has lasted 40 minutes.»", "Present Perfect несовместим с точным временем 09:12.", "TIMELINE"],
      ["«The outage had begun at 09:12 and lasted 40 minutes.»", "Нет более поздней точки отсчёта в прошлом, раньше которой был сбой.", "TIMELINE"],
      ["«The outage begins at 09:12 and lasts 40 minutes.»", "Present Simple превращает факт в расписание.", "TIMELINE"],
      C("tenses", "You are writing a post-incident summary for management on Tuesday. The service went down on Monday at 09:12 and was fully restored at 09:52. The summary must state facts in the past, with exact times. Nothing about the outage is ongoing.")
    ),
    S(
      "cs-03 ten-future 2 B2",
      "What is the most appropriate way to tell your colleague about tomorrow?",
      ["«I'm meeting the supplier at ten tomorrow.»", "Подтверждённая договорённость с временем → Present Continuous."],
      ["«I meet the supplier at ten tomorrow.»", "Present Simple — для расписаний, не для личных договорённостей.", "MEANING"],
      ["«I'll have met the supplier at ten tomorrow.»", "Future Perfect = встреча закончится к десяти; смысл другой.", "TIMELINE"],
      ["«I'm going to have met the supplier at ten.»", "Неестественная конструкция, смысл завершённости.", "FORM"],
      C("tenses", "Yesterday you and the supplier agreed by phone to meet at their office at 10 a.m. tomorrow. It is in both calendars. A colleague asks whether you can join a 10 a.m. call tomorrow. You want to explain why you can't.")
    ),
    S(
      "cs-04 mod-deduction-past 2 B2",
      "What is the most accurate conclusion to write to your team?",
      ["«Someone must have changed the password.»", "Уверенный вывод о прошлом по сильным признакам → must have + V3."],
      ["«Someone had to change the password.»", "Had to = был обязан; это не вывод.", "MODALITY"],
      ["«Someone should have changed the password.»", "Should have = критика, что не сменили; противоречит фактам.", "MODALITY"],
      ["«Someone can't have changed the password.»", "Противоречит фактам: старый пароль не работает.", "MEANING"],
      ["«Someone might change the password.»", "Говорит о будущем, а событие уже произошло.", "TIMELINE"],
      C("modals", "On Friday the shared account worked with the usual password. On Monday morning the old password is rejected, and the audit log shows a «password updated» event at 23:40 on Sunday. Only three people have admin access. You are not sure who did it, but you are sure that it happened.")
    ),
    S(
      "cs-05 mod-obligation 2 B2",
      "Which sentence correctly states the policy for new employees?",
      ["«You don't have to come to the office on Fridays, but you can if you like.»", "Отсутствие необходимости → don't have to."],
      ["«You mustn't come to the office on Fridays.»", "Mustn't = запрет; офис открыт, приходить можно.", "MODALITY"],
      ["«You needn't to come to the office on Fridays.»", "Модальное needn't без to.", "FORM"],
      ["«You haven't to come to the office on Fridays.»", "Нестандартная форма; нужно don't have to.", "AUXILIARY"],
      C("modals", "Your company's hybrid policy says: «Fridays are optional office days. The office is open, and employees may work from home or from the office.» A new colleague asks whether attendance on Fridays is required. You want to give a precise answer.")
    ),
    S(
      "cs-06 cond-mixed 3 C1",
      "Which sentence best expresses your reflection in the retrospective?",
      ["«If we had tested on older Android devices, we wouldn't be fixing these crashes now.»", "Прошлое условие → настоящий результат (now) → mixed conditional."],
      ["«If we tested on older Android devices, we wouldn't fix these crashes now.»", "Second conditional описывает гипотезу о настоящем, а пропущенное тестирование было в прошлом.", "TIMELINE"],
      ["«If we had tested on older Android devices, we wouldn't have been fixing these crashes now.»", "Would have been относит результат в прошлое и противоречит now.", "TIMELINE"],
      ["«If we test on older Android devices, we won't fix these crashes now.»", "First conditional — реальное будущее, а не сожаление.", "MODALITY"],
      C("conditionals", "Two weeks ago your team released an app update without testing it on older Android phones. Since the release, many users have reported crashes, and today the whole team is still working on fixes. In the retrospective you want to connect the past decision with the current situation.")
    ),
    S(
      "cs-07 cond-unless 2 B2",
      "Which sentence should the email contain?",
      ["«We'll ship on Monday unless we hear otherwise from you.»", "Отправим, если вы не скажете иное → unless."],
      ["«We'll ship on Monday in case we hear otherwise from you.»", "In case — мера предосторожности; смысл ломается.", "MEANING"],
      ["«We'll ship on Monday unless we won't hear from you.»", "Will в условной части и двойное отрицание.", "FORM"],
      ["«We'll ship on Monday provided that we hear otherwise from you.»", "Provided that делает «иное мнение» обязательным условием отправки — смысл обратный.", "MEANING"],
      C("conditionals", "You manage deliveries. The client has approved the order but might still want to change the quantity. Your plan is to ship the goods on Monday by default. If the client contacts you with changes before Monday, you will not ship. You are writing a short confirmation email.")
    ),
    S(
      "cs-08 irr-abc 1 B2",
      "Which version of the sentence is correct for the release notes?",
      ["«The login bug has been fixed, and the new export feature has been written from scratch.»", "Пассив Present Perfect: has been + V3 (fixed, written)."],
      ["«The login bug has been fixed, and the new export feature has been wrote from scratch.»", "Wrote — V2; после been нужен V3: written.", "FORM"],
      ["«The login bug has been fix, and the new export feature has been written from scratch.»", "После been нужен V3: fixed.", "FORM"],
      ["«The login bug has fixed, and the new export feature has written from scratch.»", "Без been это актив: баг сам что-то исправил.", "FORM"],
      C("irregular", "You are preparing release notes for version 3.2. Two changes need to be announced: a developer repaired the login error, and the team created the export feature again from the beginning. The notes are written in a neutral, impersonal style.")
    ),
    S(
      "cs-09 mod-permission 2 C1",
      "Which request is the most appropriate in this context?",
      ["«Would you mind sharing the slides after the session?»", "Вежливая просьба к незнакомому спикеру: would you mind + V-ing."],
      ["«Share the slides after the session.»", "Повелительное наклонение звучит как приказ.", "REGISTER"],
      ["«You must share the slides after the session.»", "Must — обязанность, грубо по отношению к спикеру.", "REGISTER"],
      ["«Would you mind to share the slides after the session?»", "После mind — V-ing.", "FORM"],
      C("modals", "You are attending an external industry webinar. The speaker, whom you don't know, mentions that the slides contain several useful charts. In the Q&A chat, which other participants can also see, you want to ask the speaker to send the slides. The tone should be polite and professional.")
    ),
    S(
      "cs-10 ten-pastperf 3 C1",
      "Which sentence describes the sequence correctly in your report?",
      ["«When the auditors arrived, we had already corrected the figures.»", "Исправили до прихода аудиторов → Past Perfect."],
      ["«When the auditors arrived, we corrected the figures.»", "Past Simple сделал бы исправление последующим за приходом.", "TIMELINE"],
      ["«When the auditors arrived, we were correcting the figures.»", "Continuous — процесс в момент прихода; но всё было исправлено заранее.", "TIMELINE"],
      ["«When the auditors arrived, we have already corrected the figures.»", "Present Perfect не сочетается с прошлой точкой отсчёта.", "TIMELINE"],
      C("tenses", "During the quarterly check you found errors in the expense table on Tuesday morning and fixed them by 11 a.m. The external auditors came to the office at 2 p.m. the same day. In your report you want to show that the errors were fixed before the audit started.")
    ),
    S(
      "cs-11 cond-third 2 B2",
      "Which sentence most accurately expresses your feedback to the candidate?",
      ["«If you had sent the portfolio by Friday, we could have considered your application.»", "Нереальное прошлое: не прислали → не рассмотрели (third conditional)."],
      ["«If you sent the portfolio by Friday, we could consider your application.»", "Second conditional — гипотеза о настоящем/будущем, но срок уже прошёл.", "TIMELINE"],
      ["«If you have sent the portfolio by Friday, we can consider your application.»", "Реальное условие о будущем, но пятница прошла.", "TIMELINE"],
      ["«If you would have sent the portfolio by Friday, we could have considered your application.»", "Would в if-части нестандартно.", "FORM"],
      C("conditionals", "A candidate missed the deadline (last Friday) for sending a design portfolio. The selection has now closed, and other candidates have been chosen. The candidate asks why they were not invited to the next stage. You want to explain politely what would have been possible.")
    ),
    S(
      "cs-12 mod-perfect-crit 2 C1",
      "Which phrase best expresses the lesson learned without blaming a specific person?",
      ["«We should have checked the time zone before sending the invitations.»", "Should have + V3 — сожаление о несделанном, «мы» — без поиска виноватого."],
      ["«We must have checked the time zone before sending the invitations.»", "Must have = уверенный вывод, что проверили; противоречит фактам.", "MODALITY"],
      ["«You should check the time zone before sending invitations.»", "Совет на будущее, обращённый к конкретному человеку, — звучит как упрёк.", "REGISTER"],
      ["«We had to check the time zone before sending the invitations.»", "Had to = были обязаны (и, вероятно, сделали); не выражает сожаление.", "MODALITY"],
      C("modals", "Your team sent webinar invitations to 400 clients in Asia, but the time was given in London time, so many people joined at the wrong hour. In the internal review, the manager asks everyone to describe what went wrong without blaming individuals.")
    ),
    // ---------- Case-Based Multiple Choice ----------
    M(
      "cm-01 ten-pp 2 B2",
      "Выберите 2 предложения, которые корректно сообщают о результате на сегодняшней планёрке.",
      ["«We've closed 14 tickets since Monday.»", !0, "Since + период до сейчас → Present Perfect."],
      ["«So far this week we've resolved most of the critical issues.»", !0, "So far this week — период не закончился."],
      ["«We've closed 14 tickets last week.»", !1, "Last week — закрытый период; нужен Past Simple.", "TIMELINE"],
      ["«We close 14 tickets since Monday.»", !1, "Since требует Perfect.", "TIMELINE"],
      ["«We had closed 14 tickets since Monday.»", !1, "Нет прошлой точки отсчёта.", "TIMELINE"],
      C("tenses", "It is Thursday's stand-up meeting. Since Monday your support team has closed 14 tickets, including most of the critical ones. The week is not over, and the work continues. You want to report progress in two sentences.")
    ),
    M(
      "cm-02 mod-obligation 3 C1",
      "Выберите 2 формулировки, которые точно передают правила безопасности.",
      ["«Visitors mustn't enter the server room without an escort.»", !0, "Запрет → mustn't."],
      ["«Visitors don't have to sign the NDA, but they must wear a badge.»", !0, "NDA — необязательно; бейдж — обязательно."],
      ["«Visitors don't have to enter the server room without an escort.»", !1, "Don't have to = «не обязаны» — не запрет.", "MODALITY"],
      ["«Visitors mustn't sign the NDA.»", !1, "Подписывать NDA не запрещено, это просто необязательно.", "MODALITY"],
      ["«Visitors needn't wear a badge.»", !1, "Бейдж обязателен.", "MODALITY"],
      C("modals", "The office security rules for guests: a badge is required at all times; entering the server room alone is forbidden, but it is allowed with an escort; signing an NDA is optional for visitors (it is only required for contractors). You are preparing a short notice for reception.")
    ),
    M(
      "cm-03 cond-zero-first 2 B2",
      "Выберите 2 корректных предложения для FAQ.",
      ["«If you forget your password, you can reset it from the login page.»", !0, "Реальное условие: if + Present Simple, can + V1."],
      ["«If the payment fails, you will receive an email with instructions.»", !0, "First conditional: if + Present, will + V1."],
      ["«If you will forget your password, you can reset it.»", !1, "Will в if-части недопустим.", "FORM"],
      ["«If the payment failed, you receive an email.»", !1, "Смешение прошедшего условия и настоящего результата без логики.", "FORM"],
      ["«If you forgot your password, you would reset it from the login page.»", !1, "Second conditional делает ситуацию гипотетической — для FAQ неуместно.", "MODALITY"],
      C("conditionals", "You are writing an FAQ for a banking app. The FAQ describes real situations that often happen to users and tells them what to do. The tone is neutral and practical.")
    ),
    M(
      "cm-04 irr-abc 2 B2",
      "Выберите 3 предложения без ошибок в формах глаголов.",
      ["«The figures were drawn from last year's report.»", !0, "Draw — drew — drawn."],
      ["«Costs have risen faster than expected.»", !0, "Rise — rose — risen."],
      ["«We have chosen a new vendor.»", !0, "Choose — chose — chosen."],
      ["«The team has began the migration.»", !1, "Began — V2; нужно begun.", "FORM"],
      ["«The servers were shutted down overnight.»", !1, "Shut — AAA: shut.", "FORM"],
      ["«She has spoke to the auditors.»", !1, "Spoke — V2; нужно spoken.", "FORM"],
      C("irregular", "You are proofreading a monthly operations update before it goes to senior management. It contains six sentences with irregular verbs. Three of them are correct.")
    ),
    M(
      "cm-05 mod-deduction-present 3 C1",
      "Выберите 2 вывода, которые обоснованы фактами.",
      ["«He can't be in the office — his badge hasn't been used today.»", !0, "Сильный признак отсутствия → can't."],
      ["«He might be working from home.»", !0, "Возможный, но не доказанный вариант → might."],
      ["«He must be on holiday.»", !1, "Факты не дают уверенности в отпуске: отпуск не отмечен в календаре.", "CONTEXT"],
      ["«He mustn't be in the office.»", !1, "Mustn't — запрет, а не вывод.", "MODALITY"],
      ["«He can't be working from home.»", !1, "Нет оснований исключать этот вариант.", "CONTEXT"],
      C("modals", "It's 11 a.m. A colleague isn't answering messages. His access badge has not been used at the office today. His calendar shows no holiday or sick leave. Sometimes he works from home without telling anyone. You are summarising what you can reasonably conclude.")
    ),
    M(
      "cm-06 ten-future 2 B2",
      "Выберите 2 уместные формы для анонса.",
      ["«The training starts at 10:00 on 3 June.»", !0, "Официальное расписание → Present Simple."],
      ["«By the end of the course, participants will have built their own dashboard.»", !0, "Результат к точке в будущем → Future Perfect."],
      ["«The training is going to start at 10:00 because it's in the timetable.»", !1, "Going to — намерение/признаки, а не расписание.", "MEANING"],
      ["«By the end of the course, participants will build their own dashboard by then.»", !1, "By then требует Future Perfect.", "TIMELINE"],
      ["«The training will be starting at 10:00, I've decided.»", !1, "Future Continuous + «I've decided» — нелогично.", "MEANING"],
      C("tenses", "You are writing an announcement for an internal Power BI course. The timetable has been fixed by HR: start on 3 June at 10:00. The course promises that, by the final session, every participant has a dashboard of their own.")
    ),
    M(
      "cm-07 cond-inversion 3 C1",
      "Выберите 2 формально корректных предложения для официального письма.",
      ["«Should you require any further information, please contact me.»", !0, "Should + подлежащее + V1 — формальная инверсия."],
      ["«Had we received the documents earlier, we would have processed the claim.»", !0, "Had + подлежащее + V3 — формальная инверсия третьего типа."],
      ["«Should you required any further information, please contact me.»", !1, "После should — V1.", "FORM"],
      ["«Hadn't we received the documents, we would not have processed the claim.»", !1, "В инверсии отрицание не сокращается: Had we not received.", "STRUCTURE"],
      ["«Would you require further information, please contact me.»", !1, "Would не используется в условной инверсии.", "STRUCTURE"],
      C("conditionals", "You work in an insurance company and are drafting a formal letter to a client whose claim was delayed because documents arrived late. The letter should end with an offer of further help. The style must be formal.")
    ),
    M(
      "cm-08 mod-advice 2 B2",
      "Выберите 2 формулировки, которые подходят как совет новому коллеге.",
      ["«You should book meeting rooms at least a day in advance.»", !0, "Общий совет → should."],
      ["«You'd better save your work — the system restarts in five minutes.»", !0, "Срочная ситуация с последствием → had better."],
      ["«You'd better to book rooms in advance.»", !1, "После had better — без to.", "FORM"],
      ["«You must to save your work.»", !1, "После must — без to.", "FORM"],
      ["«You ought book rooms in advance.»", !1, "Ought требует to.", "FORM"],
      C("modals", "A new colleague is starting today. You want to give two pieces of advice: a general habit about meeting rooms, which are often busy, and an urgent warning, because IT has announced a system restart in five minutes.")
    ),
    M(
      "cm-09 ten-stative 2 B2",
      "Выберите 2 предложения, где употребление времени корректно.",
      ["«I'm thinking about switching to the annual plan.»", !0, "Think = обдумывать (процесс) → Continuous возможен."],
      ["«This plan includes priority support.»", !0, "Include — состояние → Present Simple."],
      ["«I'm knowing the price already.»", !1, "Know — стативный.", "FORM"],
      ["«This plan is including priority support.»", !1, "Include в значении «содержать» — стативный.", "FORM"],
      ["«I'm understanding the terms now.»", !1, "Understand — стативный; нужно I understand.", "FORM"],
      C("tenses", "You are chatting with a software vendor's sales manager. You are considering an upgrade but have not decided yet. The manager has just explained what the annual plan contains.")
    ),
    M(
      "cm-10 cond-wish 3 C1",
      "Выберите 2 предложения, которые точно выражают то, что вы чувствуете.",
      ["«I wish I had negotiated a longer notice period.»", !0, "Сожаление о прошлом → wish + had + V3."],
      ["«If only I spoke better German — the client meetings would be easier.»", !0, "Сожаление о настоящем → if only + V2."],
      ["«I wish I negotiated a longer notice period last year.»", !1, "Для прошлого нужен Past Perfect.", "TIMELINE"],
      ["«I wish I would speak better German.»", !1, "Wish + would о себе неестественно.", "STRUCTURE"],
      ["«If only I have spoken better German.»", !1, "После if only нужна прошедшая форма.", "FORM"],
      C("conditionals", "You signed a contract last year and accepted a two-week notice period; now you regret it. You also work with German clients, and your German is weak, which makes meetings difficult right now.")
    ),
    // ---------- Matching / Categorization ----------
    MA(
      "cma-01 ten-sys 2 B2",
      "Соотнесите реплики из переписки с формой времени.",
      ["Present Perfect", "Past Simple", "Present Continuous", "Present Perfect Continuous"],
      [
        ["«I've uploaded the files.»", 0],
        ["«I uploaded them at 9.»", 1],
        ["«I'm uploading the last one now.»", 2],
        ["«I've been uploading files all morning.»", 3],
        ["«Has anyone checked them?»", 0],
        ["«Anna checked two of them yesterday.»", 1]
      ],
      "Present Perfect — результат; Past Simple — точное время в прошлом; Continuous — процесс сейчас; PPC — длительность до сейчас.",
      "FORM",
      C("tenses", "A short project chat on Wednesday. A designer reports on uploading files to a shared folder, and colleagues react to the progress.")
    ),
    MA(
      "cma-02 mod-deduction-present 2 B2",
      "Распределите фразы из разговора по функции модального глагола.",
      ["Обязанность", "Вывод / вероятность", "Разрешение", "Совет"],
      [
        ["«You must log in with your corporate account.»", 0],
        ["«It must be the VPN — everything else works.»", 1],
        ["«You can use the meeting room after 3.»", 2],
        ["«You should restart the router first.»", 3],
        ["«It might be a cache issue.»", 1],
        ["«You have to submit the request by Friday.»", 0]
      ],
      "Один глагол (must) выполняет разные функции: обязанность и вывод — решает контекст.",
      "MODALITY",
      C("modals", "An employee can't connect to the internal system from home. The support specialist explains the rules and suggests possible causes.")
    ),
    MA(
      "cma-03 cond-mixed 2 C1",
      "Соотнесите предложение с типом условного.",
      ["First", "Second", "Third", "Mixed"],
      [
        ["If the vendor confirms today, we'll sign tomorrow.", 0],
        ["If we had a bigger budget, we'd hire a vendor.", 1],
        ["If we had chosen the other vendor, we would have saved money.", 2],
        ["If we had chosen the other vendor, we would be on schedule now.", 3],
        ["If I were the CFO, I'd approve it.", 1],
        ["Unless they reply, we'll go with plan B.", 0]
      ],
      "Тип определяется формами и временем обеих частей.",
      "FORM",
      C("conditionals", "A procurement team is choosing between two vendors for a project. Some remarks are about real plans, others about imagined or past alternatives.")
    ),
    MA(
      "cma-04 irr-abc 2 B2",
      "Распределите формы глаголов по роли.",
      ["V2 (Past Simple)", "V3 (Perfect / пассив)", "V1 и V3 совпадают (ABA)"],
      [
        ["took", 0],
        ["taken", 1],
        ["became", 0],
        ["come", 2],
        ["written", 1],
        ["run", 2]
      ],
      "V2 — Past Simple; V3 — после have/be; у ABA-глаголов V1 = V3.",
      "FORM",
      C("irregular", "A colleague often confuses V2 and V3 forms in reports. You are building a revision card that sorts forms by their role.")
    ),
    MA(
      "cma-05 mod-permission 2 C1",
      "Распределите реплики по регистру.",
      ["Формально", "Нейтрально", "Неформально"],
      [
        ["«May I request a copy of the agreement?»", 0],
        ["«Could you send me a copy of the agreement?»", 1],
        ["«Can you shoot me a copy?»", 2],
        ["«I would be grateful if you could forward the agreement.»", 0],
        ["«Can you send it over?»", 2],
        ["«Would you be able to share the agreement?»", 1]
      ],
      "May I request / I would be grateful — формально; could you / would you be able — нейтрально-вежливо; shoot me / send it over — неформально.",
      "REGISTER",
      C("modals", "You need a copy of a contract from three different people. One is a lawyer at a partner firm, one is a colleague from another department, and one is a friend on your team.")
    ),
    MA(
      "cma-06 ten-future 2 B2",
      "Соотнесите высказывание и основание для формы будущего.",
      ["Расписание", "Договорённость", "Намерение", "Спонтанное решение"],
      [
        ["«The shuttle leaves at 8:15.»", 0],
        ["«I'm having dinner with the client at 7.»", 1],
        ["«I'm going to learn Spanish next year.»", 2],
        ["«I'll grab you a coffee.»", 3],
        ["«The exhibition opens on Friday.»", 0],
        ["«We're flying back on Sunday.»", 1]
      ],
      "Форма будущего зависит от основания: расписание, договорённость, намерение, решение в момент речи.",
      "MEANING",
      C("tenses", "Colleagues chat during a business trip. They talk about timetables, fixed appointments, personal plans and quick offers of help.")
    ),
    MA(
      "cma-07 cond-unless 2 C1",
      "Соотнесите союз и ситуацию из договора.",
      ["Условие-оговорка", "Мера предосторожности", "Если не (исключение)"],
      [
        ["«…provided that payment is received within 30 days.»", 0],
        ["«Keep a backup copy in case the file is corrupted.»", 1],
        ["«The offer is valid unless withdrawn in writing.»", 2],
        ["«…as long as both parties agree.»", 0],
        ["«…in case of delays, notify the buyer.»", 1],
        ["«No refunds will be made unless the goods are faulty.»", 2]
      ],
      "Provided that / as long as — оговорка; in case — предосторожность; unless — исключение.",
      "MEANING",
      C("conditionals", "These fragments come from a supply contract and its internal checklist. Each one uses a different way of expressing a condition.")
    ),
    MA(
      "cma-08 ten-pp 2 C1",
      "Распределите предложения: допустим Present Perfect или только Past Simple?",
      ["Present Perfect возможен", "Только Past Simple"],
      [
        ["I ___ (finish) the report — you can read it.", 0],
        ["I ___ (finish) the report at 6 p.m.", 1],
        ["She ___ (work) here since 2019.", 0],
        ["She ___ (join) the company in 2019.", 1],
        ["We ___ (not hear) from them yet.", 0],
        ["We ___ (not hear) from them last week.", 1]
      ],
      "Точное время в прошлом исключает Present Perfect; результат, since и yet — его контекст.",
      "TIMELINE",
      C("tenses", "You are editing a colleague's email before it goes to a client. For each sentence you check whether Present Perfect is possible or only Past Simple.")
    ),
    MA(
      "cma-09 mod-obligation 2 B2",
      "Соотнесите правило и формулировку.",
      ["Запрещено", "Не обязательно", "Обязательно"],
      [
        ["You mustn't park in the disabled bay.", 0],
        ["You don't have to wear a tie.", 1],
        ["You have to show your ID at the gate.", 2],
        ["Employees must not share login details.", 0],
        ["You needn't print the boarding pass.", 1],
        ["All staff must complete the training.", 2]
      ],
      "Mustn't/must not — запрет; don't have to/needn't — нет необходимости; must/have to — обязанность.",
      "MODALITY",
      C("modals", "You are summarising the rules of a new office for a welcome pack. Some things are forbidden, some are optional, and some are required.")
    ),
    MA(
      "cma-10 irr-confusing 3 C1",
      "Соотнесите глагол из отчёта с инфинитивом.",
      ["rise", "raise", "lie", "lay", "found", "find"],
      [
        ["Revenue rose by 4%.", 0],
        ["The board raised the dividend.", 1],
        ["The file lay untouched for weeks.", 2],
        ["They laid the groundwork for the merger.", 3],
        ["The firm was founded in 1995.", 4],
        ["We found a mistake in the totals.", 5]
      ],
      "Rose — rise; raised — raise; lay (лежал) — lie; laid — lay; founded — found; found (нашли) — find.",
      "VOCAB_MEANING",
      C("irregular", "A financial report uses several easily confused verbs. You check which infinitive each form comes from.")
    ),
    // extra single-choice to strengthen coverage
    S(
      "cs-13 cond-second 2 B2",
      "How should you answer the hypothetical question?",
      ["«If I were in your position, I'd ask for the offer in writing first.»", "Совет-гипотеза → If I were in your position + would."],
      ["«If I am in your position, I'll ask for the offer in writing.»", "Реальное условие нелогично: вы не на его месте.", "MODALITY"],
      ["«If I would be in your position, I'd ask for the offer in writing.»", "Would в if-части недопустим.", "FORM"],
      ["«If I had been in your position, I'd ask for the offer in writing.»", "Past Perfect — о прошлом, а решение ещё не принято.", "TIMELINE"],
      C("conditionals", "A friend has received a verbal job offer and has to decide by tomorrow. She asks you: «What would you do in my place?» You think getting the offer in writing first is the key step.")
    ),
    S(
      "cs-14 mod-ability 2 B2",
      "Which sentence correctly reports what happened?",
      ["«Despite the network outage, we were able to finish the demo.»", "Разовый успех в прошлом → was/were able to."],
      ["«Despite the network outage, we could finish the demo.»", "Could в утверждении — общая способность, не разовый успех.", "MODALITY"],
      ["«Despite the network outage, we can finish the demo.»", "Прошлое событие.", "TIMELINE"],
      ["«Despite the network outage, we must have finished the demo.»", "Вывод, а вы знаете факт.", "MODALITY"],
      C("modals", "Yesterday, during a live product demo for a client, the office internet went down. Your team switched to a mobile hotspot and completed the demo successfully. You are writing a short note to your manager.")
    ),
    S(
      "cs-15 ten-timecl 2 B2",
      "Which sentence should you send?",
      ["«I'll send you the invoice as soon as the payment system is back online.»", "Придаточное времени → Present Simple (is), главная → will."],
      ["«I'll send you the invoice as soon as the payment system will be back online.»", "Will в придаточном времени недопустим.", "FORM"],
      ["«I send you the invoice as soon as the payment system is back online.»", "Present Simple в главной части не выражает обещание.", "FORM"],
      ["«I'd send you the invoice as soon as the payment system was back online.»", "Гипотетическая форма без условия нереальности.", "MODALITY"],
      C("tenses", "A client asks for an invoice. The payment system is down for maintenance and should be restored later today. You want to promise to send the invoice immediately after it is restored.")
    ),
    S(
      "cs-16 irr-variants 2 C1",
      "Which comment is most accurate for your colleague's review?",
      ["«Both “learnt” and “learned” are correct; just use one spelling consistently.»", "Обе формы стандартны; важна последовательность."],
      ["«“Learnt” is a mistake — always write “learned”.»", "Learnt — стандарт BrE.", "THEORY"],
      ["«“Learned” is American slang — use “learnt”.»", "Learned — стандарт в обоих вариантах.", "THEORY"],
      ["«Write “learnded” to be safe.»", "Такой формы нет.", "FORM"],
      C("irregular", "A colleague's report written in British English uses «learnt» in one paragraph and «learned» in another. The company style guide only asks for consistency. You are adding a review comment.")
    ),
    S(
      "cs-17 cond-variants 3 C1",
      "Which sentence best fits the formal thank-you note?",
      ["«Had it not been for your team's support, the launch would have been delayed.»", "Формальное «если бы не» о прошлом."],
      ["«If it weren't for your team's support, the launch would have been delayed.»", "Weren't for — о настоящем; результат в прошлом — нужно hadn't been for.", "TIMELINE"],
      ["«Hadn't it been for your team's support, the launch would have been delayed.»", "В инверсии отрицание не сокращается.", "STRUCTURE"],
      ["«Unless your team's support, the launch would have been delayed.»", "Unless не сочетается с существительным.", "STRUCTURE"],
      C("conditionals", "The partner company's engineers worked over a weekend to help your product launch on time last month. You are writing a formal thank-you letter to their director.")
    ),
    S(
      "cs-18 mod-will-would 2 C1",
      "Which sentence best describes your former manager's habit in the reference letter?",
      ["«She would always take time to explain decisions to the team.»", "Прошлая повторяющаяся манера поведения → would."],
      ["«She will always take time to explain decisions to the team.»", "Will — настоящая/будущая привычка; речь о прошлом.", "TIMELINE"],
      ["«She would always be a patient person.»", "Would не используется с состояниями.", "THEORY"],
      ["«She used to always took time to explain decisions.»", "После used to — V1.", "FORM"],
      C("modals", "You are writing an informal reference for a former manager you worked with from 2019 to 2023. You want to describe her typical behaviour during that period.")
    )
  ];

  // src/content/cases/cases-b.js
  var C2 = (module, ctx, extra = {}) => Object.assign({ kind: "case", module, ctx }, extra), CASES_B = [
    // ---------- Ordering / Sequencing ----------
    O(
      "co-01 ten-pastperf 2 B2",
      "Расположите события в реальном хронологическом порядке (сначала самое раннее).",
      ["The bug was reported by a client", "The developers fixed the bug", "The release was approved", "The manager announced the release"],
      "В тексте события упомянуты не по порядку: had reported → had fixed → approved → announced. Past Perfect указывает на более ранние события.",
      "TIMELINE",
      [],
      C2("tenses", "From a project log: «When the manager announced the release on Friday, the release had been approved that morning. The developers had fixed the bug that a client had reported on Monday.»")
    ),
    O(
      "co-02 ten-sys 2 B2",
      "Соберите вопрос, который нужно отправить в чат.",
      ["How", "long", "have", "you", "been", "working", "on", "the", "migration", "?"],
      "How long + have + подлежащее + been + V-ing + остальное.",
      "STRUCTURE",
      [],
      C2("tenses", "You want to ask a new contractor about the duration of their work on the data migration so far. The work is still in progress.")
    ),
    O(
      "co-03 cond-third 2 B2",
      "Соберите предложение для ретроспективы.",
      ["If", "we", "had", "involved", "legal", "earlier,", "we", "wouldn't", "have", "missed", "the", "deadline"],
      "Third conditional: If + had + V3, would(n't) + have + V3.",
      "STRUCTURE",
      ["we wouldn't have missed the deadline If we had involved legal earlier,"],
      C2("conditionals", "Last month the contract review was delayed because the legal team saw it only two days before the deadline. In the retrospective you want to state what would have changed the outcome.")
    ),
    O(
      "co-04 mod-deduction-past 2 C1",
      "Соберите вывод о произошедшем.",
      ["The", "courier", "must", "have", "come", "while", "we", "were", "at", "lunch"],
      "Must have + V3 — уверенный вывод; while + Past Continuous — фон.",
      "STRUCTURE",
      ["While we were at lunch the courier must have come"],
      C2("modals", "You returned from lunch and found a parcel at reception with today's delivery note. Nobody remembers seeing the courier. You are explaining to your colleague what happened.")
    ),
    O(
      "co-05 cond-inversion 3 C1",
      "Соберите формальную фразу для письма клиенту.",
      ["Should", "you", "have", "any", "questions,", "please", "do", "not", "hesitate", "to", "contact", "us"],
      "Should + подлежащее + V1 в начале — формальная инверсия условия.",
      "STRUCTURE",
      [],
      C2("conditionals", "You are finishing a formal email to a new corporate client. You want to end with the standard offer of further help.")
    ),
    O(
      "co-06 ten-future 2 B2",
      "Расположите действия в порядке выполнения согласно письму (сначала первое).",
      ["Finish the internal review", "Send the draft to the client", "Receive the client's comments", "Sign the final version"],
      "«By the time the client sends comments, we will have sent the draft; we'll sign once the comments have been received; the draft goes out after the internal review is finished.» — хронология определяется формами, а не порядком в тексте.",
      "TIMELINE",
      [],
      C2("tenses", "From a planning email: «We'll sign the final version once we've received the client's comments. By the time they send their comments, we'll have sent them the draft, which will go out as soon as the internal review is finished.»")
    ),
    O(
      "co-07 irr-roles 2 B2",
      "Соберите предложение для пресс-релиза.",
      ["The", "new", "office", "was", "built", "in", "just", "eight", "months"],
      "Пассив Past Simple: was + V3 (built).",
      "STRUCTURE",
      ["The new office was built in just eight months"],
      C2("irregular", "Your company opened a new office today. The construction company finished the building in eight months. The press release should focus on the office, not on the builders.")
    ),
    O(
      "co-08 mod-obligation 2 B2",
      "Соберите вопрос в правильном порядке.",
      ["Do", "we", "have", "to", "bring", "our", "own", "laptops", "?"],
      "Have to — обычный глагол: Do + подлежащее + have to + V1.",
      "AUXILIARY",
      [],
      C2("modals", "You are going to an external training workshop next week. The invitation doesn't say whether participants get computers there. You are writing to the organiser.")
    ),
    O(
      "co-09 ten-sys 3 C1",
      "Расположите шаги построения формы в правильной логике.",
      ["Определить время точки отсчёта (прошлое)", "Определить аспект (процесс до точки → Perfect Continuous)", "Выбрать первый вспомогательный (had)", "Добавить been + V-ing (had been waiting)"],
      "Сначала время и аспект, затем первый вспомогательный (он несёт время), затем аспектная часть.",
      "THEORY",
      [],
      C2("tenses", "You want to say in English: «К тому времени, как пришёл ответ, мы ждали уже две недели.» You build the verb form step by step.")
    ),
    O(
      "co-10 cond-wish 2 C1",
      "Соберите сожаление о прошлом решении.",
      ["I", "wish", "we", "hadn't", "agreed", "to", "such", "a", "tight", "deadline"],
      "Wish + Past Perfect — сожаление о прошлом.",
      "STRUCTURE",
      [],
      C2("conditionals", "Three weeks ago your team accepted a very short deadline from a client. Now everyone is working late. You share your feelings with a teammate.")
    ),
    // ---------- Error Debugging / Hotspot ----------
    FX(
      "cf-01 ten-pp 2 B2",
      "В письме ровно одна грамматическая ошибка. Нажмите на ошибочный фрагмент и введите исправление.",
      ["Dear Ms Lee,", "thank you for your message.", { t: "We have received", fix: ["We received"], tag: "TIMELINE" }, "your order on 12 March", "and it is now being processed."],
      "Точная дата (on 12 March) → Past Simple: We received your order on 12 March.",
      C2("tenses", "A customer service email confirming an order. The order arrived on 12 March and is still being processed.")
    ),
    FX(
      "cf-02 ten-timecl 2 B2",
      "Найдите и исправьте ошибку в сообщении.",
      ["Hi team,", "I'll share the slides", { t: "as soon as I will get", fix: ["as soon as I get"], tag: "FORM" }, "the final numbers", "from finance."],
      "Придаточное времени: as soon as + Present Simple.",
      C2("tenses", "A project manager posts in Slack the day before a presentation. The slides depend on numbers that finance hasn't sent yet.")
    ),
    FX(
      "cf-03 mod-obligation 2 B2",
      "Найдите и исправьте ошибку в памятке.",
      ["Guests", "must wear a badge at all times.", "They", { t: "mustn't", fix: ["don't have to", "do not have to", "needn't", "don't need to", "do not need to"], tag: "MODALITY" }, "sign the NDA,", "but it is recommended."],
      "NDA необязательно, но рекомендуется → don't have to / needn't, а не запрет.",
      C2("modals", "A welcome note for office visitors. Rule: a badge is compulsory; the NDA is optional but recommended.")
    ),
    FX(
      "cf-04 cond-third 2 B2",
      "Найдите и исправьте ошибку в отчёте.",
      ["If the supplier", { t: "would have delivered", fix: ["had delivered"], tag: "FORM" }, "on time,", "we would have met", "the launch date."],
      "В if-части третьего типа — Past Perfect.",
      C2("conditionals", "This is a short post-mortem paragraph about a delayed launch. The delay was caused by a late delivery from a supplier.")
    ),
    FX(
      "cf-05 irr-abc 1 B2",
      "Найдите и исправьте ошибку в протоколе встречи.",
      ["The board", "has", { t: "chose", fix: ["chosen"], tag: "FORM" }, "a new auditor,", "and the contract will be signed next week."],
      "Has + V3: choose — chose — chosen.",
      C2("irregular", "These are the minutes of a board meeting. They were prepared by a junior assistant and need checking before they are circulated.")
    ),
    FX(
      "cf-06 mod-deduction-present 2 C1",
      "Найдите и исправьте ошибку в сообщении.",
      ["The server room is locked", "and the lights are off,", "so Ivan", { t: "mustn't be", fix: ["can't be", "cannot be", "couldn't be"], tag: "MODALITY" }, "there."],
      "Вывод «нет» → can't be; mustn't — запрет.",
      C2("modals", "A colleague is looking for the sysadmin. You send a quick message explaining where he can't be.")
    ),
    FX(
      "cf-07 ten-stative 2 B2",
      "Найдите и исправьте ошибку.",
      ["Thanks for the update.", { t: "I'm understanding", fix: ["I understand"], tag: "FORM" }, "the risks,", "but I still think", "we should go ahead."],
      "Understand — стативный глагол: I understand.",
      C2("tenses", "A manager replies to a risk report from the project team. She accepts the risks but wants to continue.")
    ),
    FX(
      "cf-08 cond-unless 2 B2",
      "Найдите и исправьте ошибку в условиях акции.",
      ["The discount applies to all orders", { t: "unless you don't use", fix: ["unless you use", "if you don't use", "if you do not use"], tag: "MEANING" }, "a promo code", "from another campaign."],
      "Unless уже значит «если не» — двойное отрицание искажает смысл. Скидка не действует, если используется другой промокод.",
      C2("conditionals", "These are the terms of a sales promotion. The discount does not work together with promo codes from other campaigns.")
    ),
    FX(
      "cf-09 ten-pastperf 3 C1",
      "Найдите и исправьте ошибку в отчёте об инциденте.",
      ["When IT arrived,", "the hard drive", { t: "already failed", fix: ["had already failed"], tag: "TIMELINE" }, "and the backup", "had not been updated for a week."],
      "Отказ диска произошёл раньше прихода ИТ → Past Perfect: had already failed.",
      C2("tenses", "An incident report written the next day. The hard drive stopped working before IT staff came.")
    ),
    FX(
      "cf-10 mod-perfect-crit 2 B2",
      "Найдите и исправьте ошибку в письме.",
      ["I'm sorry about the confusion —", "I", { t: "should of", fix: ["should have"], tag: "SPELLING" }, "double-checked", "the time zone."],
      "Should have + V3; «should of» — ошибка написания на слух.",
      C2("modals", "Clients joined a webinar at the wrong time because of a time-zone mistake. You are writing an apology email.")
    ),
    // ---------- Branching scenarios (real branching, 3 steps; feedback per choice) ----------
    {
      id: "cb-01",
      v: 1,
      kind: "case",
      type: "branch",
      module: "tenses",
      sub: "ten-pp",
      level: "B2",
      diff: 2,
      start: "a",
      pass: 0.8,
      tag: "TIMELINE",
      prompt: "Ответьте клиенту в чате поддержки. Каждый ответ влияет на следующий шаг.",
      ctx: "A client writes to support: «My payment didn't go through. What's going on?» The system shows that the payment failed at 10:03 today because of a bank timeout. Your colleague restarted the gateway at 10:20, and payments are working again now.",
      explain: "Лучшая траектория: сообщить результат (Present Perfect), затем детали с точным временем (Past Simple), затем реальное условие о будущем (first conditional).",
      nodes: {
        a: { text: "Ваше первое сообщение клиенту:", choices: [
          { t: "«I'm sorry about that. The issue has been fixed, and payments are working again.»", pts: 2, next: "b1", fb: "Отлично: результат, важный сейчас → Present Perfect (passive)." },
          { t: "«I'm sorry about that. The issue was fixed, and payments are working again.»", pts: 1, next: "b1", fb: "Грамматически возможно (особенно в AmE), но без указания времени новость о результате естественнее передать Present Perfect.", tag: "TIMELINE" },
          { t: "«I'm sorry about that. The issue had been fixed.»", pts: 0, next: "b2", fb: "Past Perfect без прошлой точки отсчёта сбивает клиента: «к какому моменту?»", tag: "TIMELINE" }
        ] },
        b1: { text: "Клиент: «OK, but what happened exactly?» Ваш ответ:", choices: [
          { t: "«Your payment failed at 10:03 because of a bank timeout. We restarted the gateway at 10:20.»", pts: 2, next: "c", fb: "Точное время → Past Simple. Хронология ясна." },
          { t: "«Your payment has failed at 10:03 because of a bank timeout.»", pts: 0, next: "c", fb: "Present Perfect несовместим с точным временем 10:03.", tag: "TIMELINE" },
          { t: "«Your payment was failing at 10:03 because of a bank timeout.»", pts: 1, next: "c", fb: "Continuous делает разовую неудачу процессом — неточно.", tag: "MEANING" }
        ] },
        b2: { text: "Клиент: «Had been fixed? Before what? Is it working now or not?» Ваш ответ:", choices: [
          { t: "«Sorry for the confusion — it's working now. It was fixed at 10:20.»", pts: 2, next: "c", fb: "Вы исправили ситуацию: состояние сейчас + точное время в Past Simple." },
          { t: "«It had been fixed at 10:20.»", pts: 0, next: "c", fb: "Повтор той же ошибки: Past Perfect без точки отсчёта.", tag: "TIMELINE" }
        ] },
        c: { text: "Клиент: «Should I try again now or wait?» Ваш ответ:", choices: [
          { t: "«Please try again now. If it fails, I'll escalate it to the payments team straight away.»", pts: 2, next: null, fb: "First conditional: реальная возможность в будущем." },
          { t: "«Please try again now. If it will fail, I'll escalate it.»", pts: 0, next: null, fb: "Will в if-части недопустим.", tag: "FORM" },
          { t: "«Please try again now. If it failed, I would escalate it.»", pts: 1, next: null, fb: "Second conditional звучит так, будто неудача маловероятна/гипотетична — менее уместно для поддержки.", tag: "MODALITY" }
        ] }
      }
    },
    {
      id: "cb-02",
      v: 1,
      kind: "case",
      type: "branch",
      module: "modals",
      sub: "mod-obligation",
      level: "B2",
      diff: 2,
      start: "a",
      pass: 0.8,
      tag: "MODALITY",
      prompt: "Объясните новому сотруднику правила удалённой работы.",
      ctx: "Company rules: Remote work is allowed up to 3 days a week. Using public Wi-Fi without the VPN is forbidden. Cameras are optional in internal meetings but required in client meetings. A new employee messages you with questions.",
      explain: "Ключ — различать обязанность (must/have to), запрет (mustn't) и отсутствие необходимости (don't have to).",
      nodes: {
        a: { text: "Новичок: «Can I work from a café?» Ваш ответ:", choices: [
          { t: "«Yes, but you mustn't use public Wi-Fi without the VPN.»", pts: 2, next: "b", fb: "Запрет → mustn't." },
          { t: "«Yes, but you don't have to use public Wi-Fi without the VPN.»", pts: 0, next: "b_fix", fb: "Don't have to = «не обязательно» — правило звучит как необязательное, хотя это запрет.", tag: "MODALITY" },
          { t: "«Yes, but you needn't use public Wi-Fi without the VPN.»", pts: 0, next: "b_fix", fb: "Needn't = нет необходимости; это не запрет.", tag: "MODALITY" }
        ] },
        b_fix: { text: "Новичок: «So it's fine to skip the VPN sometimes?» Ваш ответ:", choices: [
          { t: "«No — sorry, I put it badly. It's not allowed: you mustn't use public Wi-Fi without the VPN.»", pts: 1, next: "b", fb: "Хорошо, что вы исправились: mustn't = запрет." },
          { t: "«Yes, it's up to you.»", pts: 0, next: "b", fb: "Это нарушает правило безопасности.", tag: "CONTEXT" }
        ] },
        b: { text: "Новичок: «Do I need to turn my camera on in team meetings?» Ваш ответ:", choices: [
          { t: "«You don't have to in internal meetings, but you have to in client meetings.»", pts: 2, next: "c", fb: "Точно передано: необязательно / обязательно." },
          { t: "«You mustn't in internal meetings, but you have to in client meetings.»", pts: 0, next: "c", fb: "Mustn't — запрет; камеру включать можно.", tag: "MODALITY" },
          { t: "«You must in all meetings.»", pts: 0, next: "c", fb: "Противоречит правилу: во внутренних — по желанию.", tag: "CONTEXT" }
        ] },
        c: { text: "Новичок: «How many days can I work remotely?» Ваш ответ:", choices: [
          { t: "«You can work remotely up to three days a week.»", pts: 2, next: null, fb: "Can — разрешение в пределах правила." },
          { t: "«You have to work remotely three days a week.»", pts: 0, next: null, fb: "Have to превращает разрешение в обязанность.", tag: "MODALITY" },
          { t: "«You might work remotely three days a week.»", pts: 1, next: null, fb: "Might звучит как предположение, а не как правило.", tag: "MODALITY" }
        ] }
      }
    },
    {
      id: "cb-03",
      v: 1,
      kind: "case",
      type: "branch",
      module: "conditionals",
      sub: "cond-zero-first",
      level: "B2",
      diff: 2,
      start: "a",
      pass: 0.8,
      tag: "CONTEXT",
      prompt: "Проведите переговоры о сроках с поставщиком по почте.",
      ctx: "Your supplier says they can deliver in 6 weeks. You need delivery in 4 weeks. You are ready to pay 5% more for faster delivery, but only if the date is guaranteed in the contract. Last year this supplier missed a deadline.",
      explain: "Реальные условия (first conditional, provided that) для предложений, second conditional — для мягкой гипотезы, third — только о прошлом.",
      nodes: {
        a: { text: "Ваше предложение поставщику:", choices: [
          { t: "«We can pay 5% more provided that the four-week date is guaranteed in the contract.»", pts: 2, next: "b1", fb: "Чёткая оговорка-условие → provided that." },
          { t: "«We could pay 5% more if you delivered in four weeks.»", pts: 1, next: "b2", fb: "Мягкая гипотеза (second) — вежливо, но без ключевого условия о гарантии в договоре.", tag: "CONTEXT" },
          { t: "«We would have paid 5% more if you had delivered in four weeks.»", pts: 0, next: "b2", fb: "Third conditional — о прошлом; это звучит как упрёк за несостоявшееся.", tag: "TIMELINE" }
        ] },
        b1: { text: "Поставщик: «Four weeks is tight. What happens if we're late?» Ваш ответ:", choices: [
          { t: "«If the delivery is late, the 5% premium won't apply.»", pts: 2, next: "c", fb: "First conditional — реальное последствие." },
          { t: "«If the delivery will be late, the premium won't apply.»", pts: 0, next: "c", fb: "Will в if-части недопустим.", tag: "FORM" }
        ] },
        b2: { text: "Поставщик: «We'll try, but we can't promise.» Ваш ответ:", choices: [
          { t: "«Then we'll need the date in writing; otherwise we'll stay with the six-week schedule.»", pts: 2, next: "c", fb: "Вы вернули ключевое условие (гарантия в договоре); otherwise = иначе." },
          { t: "«OK, we'll pay 5% more anyway.»", pts: 0, next: "c", fb: "Вы отказались от главного условия кейса.", tag: "CONTEXT" }
        ] },
        c: { text: "Последнее письмо: вы хотите учесть прошлый опыт без резкости.", choices: [
          { t: "«Given what happened last year, it would help to have a penalty clause in case of delays.»", pts: 2, next: null, fb: "In case of — мера предосторожности; would help — дипломатично." },
          { t: "«If you hadn't missed the deadline last year, we wouldn't ask for a penalty clause now.»", pts: 1, next: null, fb: "Грамматически верно (mixed), но звучит как упрёк.", tag: "REGISTER" },
          { t: "«Unless you miss the deadline, we will add a penalty clause.»", pts: 0, next: null, fb: "Смысл обратный: штраф без нарушения.", tag: "MEANING" }
        ] }
      }
    },
    {
      id: "cb-04",
      v: 1,
      kind: "case",
      type: "branch",
      module: "modals",
      sub: "mod-deduction-present",
      level: "C1",
      diff: 3,
      start: "a",
      pass: 0.8,
      tag: "MODALITY",
      prompt: "Разберитесь со сбоем и сообщите команде выводы правильной степени уверенности.",
      ctx: "At 9:00 the dashboard stops showing new orders. The database is running. The last data import log ends with «timeout» at 8:55. Nobody has changed the dashboard settings this week, according to the change log.",
      explain: "Степень уверенности выражается must / might / can't в соответствии с силой доказательств.",
      nodes: {
        a: { text: "Ваше первое сообщение в чат команды:", choices: [
          { t: "«The import must have failed — the log ends with a timeout at 8:55.»", pts: 2, next: "b", fb: "Сильный признак → must have + V3." },
          { t: "«The import might fail.»", pts: 0, next: "b", fb: "Будущее время для уже произошедшего события.", tag: "TIMELINE" },
          { t: "«The import had to fail.»", pts: 0, next: "b", fb: "Had to — обязанность.", tag: "MODALITY" }
        ] },
        b: { text: "Коллега: «Could it be the dashboard settings?» Ваш ответ:", choices: [
          { t: "«It can't be the settings — nobody has changed them this week.»", pts: 2, next: "c1", fb: "Факт исключает вариант → can't." },
          { t: "«It mustn't be the settings.»", pts: 0, next: "c2", fb: "Mustn't — запрет, не вывод.", tag: "MODALITY" },
          { t: "«It must be the settings.»", pts: 0, next: "c2", fb: "Противоречит журналу изменений.", tag: "CONTEXT" }
        ] },
        c1: { text: "Руководитель: «When will it be fixed?» Вы не знаете точно; перезапуск импорта занимает около 20 минут.", choices: [
          { t: "«We should have it running again by 9:30, provided the restart works.»", pts: 2, next: null, fb: "Should = ожидание + оговорка provided." },
          { t: "«It must be fixed by 9:30.»", pts: 0, next: null, fb: "Must звучит как категорическая уверенность или требование.", tag: "MODALITY" },
          { t: "«It will have been fixed by 9:30 for sure.»", pts: 1, next: null, fb: "Future Perfect верен грамматически, но «for sure» обещает больше, чем вы знаете.", tag: "MODALITY" }
        ] },
        c2: { text: "Коллега проверил настройки: «Settings are fine.» Как вы скорректируете вывод?", choices: [
          { t: "«Right, then it must be the import timeout.»", pts: 1, next: null, fb: "Вы вернулись к обоснованному выводу." },
          { t: "«Then it can't be anything.»", pts: 0, next: null, fb: "Вывод противоречит признакам (timeout в логе).", tag: "CONTEXT" }
        ] }
      }
    },
    {
      id: "cb-05",
      v: 1,
      kind: "case",
      type: "branch",
      module: "tenses",
      sub: "ten-future",
      level: "B2",
      diff: 2,
      start: "a",
      pass: 0.8,
      tag: "MEANING",
      prompt: "Спланируйте встречу с коллегой из другого офиса.",
      ctx: "You have a confirmed client meeting on Thursday at 11:00. Your train to Kazan leaves at 16:40 on Friday (it's on the official timetable). You are free on Thursday afternoon. A colleague from Berlin asks when you can meet online.",
      explain: "Договорённость → Present Continuous; расписание → Present Simple; спонтанное решение → will; процесс в точке будущего → Future Continuous.",
      nodes: {
        a: { text: "Коллега: «Are you free on Thursday morning?» Ваш ответ:", choices: [
          { t: "«Sorry, I'm meeting a client at 11.»", pts: 2, next: "b", fb: "Договорённость → Present Continuous." },
          { t: "«Sorry, I'll meet a client at 11.»", pts: 1, next: "b", fb: "Will звучит как решение сейчас, а встреча уже назначена.", tag: "MEANING" },
          { t: "«Sorry, I meet a client at 11.»", pts: 0, next: "a_fix", fb: "Present Simple — для расписаний, не для личных встреч.", tag: "MEANING" }
        ] },
        a_fix: { text: "Коллега: «Every Thursday? Is that a regular slot?» Ваш ответ:", choices: [
          { t: "«No, just this Thursday — I'm meeting a new client.»", pts: 1, next: "b", fb: "Вы исправили неоднозначность: разовая договорённость → Present Continuous." },
          { t: "«Yes, I meet him.»", pts: 0, next: "b", fb: "Ответ вводит коллегу в заблуждение: встреча разовая.", tag: "CONTEXT" }
        ] },
        b: { text: "Коллега: «What about Friday at 5 p.m.?» Ваш ответ:", choices: [
          { t: "«I'll be travelling then — my train leaves at 16:40.»", pts: 2, next: "c", fb: "Процесс в точке будущего → Future Continuous; расписание → Present Simple." },
          { t: "«I travel then — my train will leave at 16:40.»", pts: 0, next: "c", fb: "Формы перепутаны: процесс в момент vs расписание.", tag: "MEANING" },
          { t: "«I'll have travelled then.»", pts: 0, next: "c", fb: "Future Perfect: «уже доеду» — неверно по фактам.", tag: "TIMELINE" }
        ] },
        c: { text: "Коллега: «Thursday afternoon, then?» Вы принимаете решение прямо сейчас:", choices: [
          { t: "«Perfect, I'll send you an invite for 3 p.m.»", pts: 2, next: null, fb: "Спонтанное решение → will." },
          { t: "«Perfect, I'm going to send you an invite.»", pts: 1, next: null, fb: "Going to допустимо, но будто решено заранее.", tag: "MEANING" },
          { t: "«Perfect, I send you an invite.»", pts: 0, next: null, fb: "Present Simple не выражает обещание.", tag: "FORM" }
        ] }
      }
    },
    {
      id: "cb-06",
      v: 1,
      kind: "case",
      type: "branch",
      module: "conditionals",
      sub: "cond-wish",
      level: "C1",
      diff: 3,
      start: "a",
      pass: 0.8,
      tag: "REGISTER",
      prompt: "Дайте обратную связь коллеге после неудачной презентации — честно и дипломатично.",
      ctx: "Your colleague presented to a client yesterday. The slides were too long, and the key numbers came only at the end, so the client lost interest. Your colleague asks you for feedback. You want to be honest but supportive and focus on next time.",
      explain: "Гипотетические формы (would, if + past, could have) смягчают критику; wish + would о себе неуместно; прямые упрёки ухудшают диалог.",
      nodes: {
        a: { text: "Как вы начнёте?", choices: [
          { t: "«The content was strong. If the key numbers had come earlier, I think the client would have stayed more engaged.»", pts: 2, next: "b", fb: "Third conditional + hedging (I think) — конкретно и дипломатично." },
          { t: "«You should have put the numbers first. It was boring.»", pts: 0, next: "b_tense", fb: "Грамматически верно, но резко: «boring» оценивает человека.", tag: "REGISTER" },
          { t: "«If the key numbers would have come earlier, it would be better.»", pts: 0, next: "b", fb: "Would в if-части нестандартно.", tag: "FORM" }
        ] },
        b_tense: { text: "Коллега явно расстроен: «Well, I did my best.» Ваш ответ:", choices: [
          { t: "«I know, and the analysis was excellent. I just wish we had shown the numbers earlier — next time, could we start with them?»", pts: 1, next: "c", fb: "Вы смягчили тон; wish + had + V3 — корректное сожаление." },
          { t: "«Yes, but it wasn't enough.»", pts: 0, next: "c", fb: "Обострение конфликта.", tag: "REGISTER" }
        ] },
        b: { text: "Коллега: «Fair point. What would you do differently?»", choices: [
          { t: "«If I were you, I'd start with the three key numbers and keep the details for the appendix.»", pts: 2, next: "c", fb: "Совет через second conditional." },
          { t: "«If I am you, I will start with the numbers.»", pts: 0, next: "c", fb: "Реальное условие нелогично.", tag: "FORM" }
        ] },
        c: { text: "Финальная фраза:", choices: [
          { t: "«Shall we go through the next deck together on Monday?»", pts: 2, next: null, fb: "Shall we — дружелюбное предложение." },
          { t: "«I wish you would listen to feedback more often.»", pts: 0, next: null, fb: "Wish + would — раздражение, звучит как упрёк.", tag: "REGISTER" }
        ] }
      }
    },
    {
      id: "cb-07",
      v: 1,
      kind: "case",
      type: "branch",
      module: "irregular",
      sub: "irr-abc",
      level: "B2",
      diff: 2,
      start: "a",
      pass: 0.8,
      tag: "FORM",
      prompt: "Отредактируйте отчёт по проекту шаг за шагом.",
      ctx: "You are editing a project report written by a junior colleague. Each step shows a sentence that may contain a verb form problem. You decide what to do.",
      explain: "После have/has/had и be — V3; в Past Simple — V2; AAA и ABA-глаголы проверяются по конструкции.",
      nodes: {
        a: { text: "«The team has wrote three prototypes.»", choices: [
          { t: "Исправить на «has written».", pts: 2, next: "b", fb: "Has + V3." },
          { t: "Исправить на «has writed».", pts: 0, next: "b", fb: "Write — неправильный.", tag: "FORM" },
          { t: "Оставить как есть.", pts: 0, next: "b", fb: "Wrote — V2, после has нужен V3.", tag: "FORM" }
        ] },
        b: { text: "«Costs rised in March.»", choices: [
          { t: "Исправить на «rose».", pts: 2, next: "c", fb: "Rise — rose — risen." },
          { t: "Исправить на «raised».", pts: 0, next: "c_raise", fb: "Raise требует объекта.", tag: "VOCAB_MEANING" }
        ] },
        c_raise: { text: "Автор возражает: «But raised is a correct verb!» Ваш ответ:", choices: [
          { t: "«It is, but it needs an object: “We raised prices”. Costs rose by themselves.»", pts: 1, next: "c", fb: "Хорошее объяснение переходности." },
          { t: "«Fine, keep raised.»", pts: 0, next: "c", fb: "Ошибка осталась.", tag: "VOCAB_MEANING" }
        ] },
        c: { text: "«The budget was cut by 10% and the remaining funds were spent on testing.»", choices: [
          { t: "Оставить как есть — ошибок нет.", pts: 2, next: null, fb: "Cut (AAA) и spent (ABB) — верные V3 в пассиве." },
          { t: "Исправить на «was cutted».", pts: 0, next: null, fb: "Cut — неправильный AAA.", tag: "FORM" },
          { t: "Исправить на «were spended».", pts: 0, next: null, fb: "Spend — spent.", tag: "FORM" }
        ] }
      }
    },
    {
      id: "cb-08",
      v: 1,
      kind: "case",
      type: "branch",
      module: "tenses",
      sub: "ten-pastperf",
      level: "C1",
      diff: 3,
      start: "a",
      pass: 0.8,
      tag: "TIMELINE",
      prompt: "Расскажите на собеседовании о трудной ситуации (метод STAR).",
      ctx: "Two years ago you joined a project that was already three months behind schedule. For six months before you joined, the team had been using a spreadsheet instead of a proper tracker. You introduced Jira, and the project finished on time.",
      explain: "Фон до точки в прошлом — Past Perfect (Continuous); последовательность ваших действий — Past Simple; связь с настоящим — Present Perfect.",
      nodes: {
        a: { text: "Ваше вступление:", choices: [
          { t: "«When I joined the project, it was already three months behind schedule.»", pts: 2, next: "b", fb: "Ясная точка отсчёта и состояние в Past Simple." },
          { t: "«When I have joined the project, it was three months behind.»", pts: 0, next: "b", fb: "Present Perfect с when о прошлом недопустим.", tag: "TIMELINE" }
        ] },
        b: { text: "Опишите ситуацию до вашего прихода:", choices: [
          { t: "«For six months, the team had been tracking tasks in a spreadsheet.»", pts: 2, next: "c", fb: "Длительность до точки в прошлом → Past Perfect Continuous." },
          { t: "«For six months, the team has been tracking tasks in a spreadsheet.»", pts: 0, next: "c_fix", fb: "Present Perfect Continuous переносит действие в «сейчас».", tag: "TIMELINE" },
          { t: "«For six months, the team was tracking tasks in a spreadsheet.»", pts: 1, next: "c", fb: "Понятно, но не показывает, что это было ДО вашего прихода.", tag: "TIMELINE" }
        ] },
        c_fix: { text: "Интервьюер уточняет: «Are they still using the spreadsheet?» Ваш ответ:", choices: [
          { t: "«No, sorry — I meant they had been using it before I joined. We replaced it with Jira.»", pts: 1, next: "c", fb: "Вы исправили временную линию." },
          { t: "«Yes, they have.»", pts: 0, next: "c", fb: "Противоречит фактам.", tag: "CONTEXT" }
        ] },
        c: { text: "Результат и вывод:", choices: [
          { t: "«I introduced Jira, and we delivered on time. Since then, I've always set up tracking at the start of a project.»", pts: 2, next: null, fb: "Past Simple для действий + Present Perfect для опыта до сейчас." },
          { t: "«I had introduced Jira, and we delivered on time.»", pts: 0, next: null, fb: "Past Perfect без более поздней точки — сбивает хронологию.", tag: "TIMELINE" }
        ] }
      }
    },
    {
      id: "cb-09",
      v: 1,
      kind: "case",
      type: "branch",
      module: "modals",
      sub: "mod-permission",
      level: "B2",
      diff: 2,
      start: "a",
      pass: 0.8,
      tag: "REGISTER",
      prompt: "Попросите о переносе дедлайна у старшего руководителя другого отдела.",
      ctx: "You need two extra days for a report requested by a director from another department whom you rarely work with. The delay is caused by late data from a third team. The director prefers short, polite messages.",
      explain: "Вежливость задаётся модальными (could, would you mind, would it be possible), прошедшими формами и смягчением.",
      nodes: {
        a: { text: "Первая фраза письма:", choices: [
          { t: "«Would it be possible to move the deadline to Thursday?»", pts: 2, next: "b", fb: "Формально-вежливый запрос." },
          { t: "«I need to move the deadline to Thursday.»", pts: 1, next: "b", fb: "Ясно, но прямолинейно для малознакомого директора.", tag: "REGISTER" },
          { t: "«Move the deadline to Thursday, please.»", pts: 0, next: "b_cold", fb: "Повелительное наклонение звучит как приказ.", tag: "REGISTER" }
        ] },
        b_cold: { text: "Директор отвечает сухо: «Why?» Как продолжить?", choices: [
          { t: "«Apologies for the abrupt message. The data from Finance arrived late, so I'd like two more days to check it.»", pts: 1, next: "c", fb: "Вы восстановили тон." },
          { t: "«Because Finance was late.»", pts: 0, next: "c", fb: "Звучит как перекладывание вины.", tag: "REGISTER" }
        ] },
        b: { text: "Объяснение причины:", choices: [
          { t: "«The data we needed arrived later than expected, and I'd like to make sure the figures are accurate.»", pts: 2, next: "c", fb: "Нейтрально, без обвинений." },
          { t: "«Finance must have been lazy.»", pts: 0, next: "c", fb: "Must have + оскорбительная оценка.", tag: "REGISTER" }
        ] },
        c: { text: "Завершение:", choices: [
          { t: "«Please let me know if that works for you.»", pts: 2, next: null, fb: "Вежливое открытое завершение." },
          { t: "«You must reply today.»", pts: 0, next: null, fb: "Must — требование к старшему.", tag: "REGISTER" },
          { t: "«Could you possibly let me know if Thursday works?»", pts: 2, next: null, fb: "Очень вежливо и уместно." }
        ] }
      }
    },
    {
      id: "cb-10",
      v: 1,
      kind: "case",
      type: "branch",
      module: "conditionals",
      sub: "cond-mixed",
      level: "C1",
      diff: 3,
      start: "a",
      pass: 0.8,
      tag: "TIMELINE",
      prompt: "Обсудите с руководителем последствия прошлого решения и варианты на будущее.",
      ctx: "Last year your company decided not to move to the cloud. Now servers are overloaded every Monday. A cloud migration would take about three months. Your manager asks you to present the situation to the board.",
      explain: "Mixed conditional связывает прошлое решение с текущей ситуацией; second — гипотеза о будущем; first — реальный план.",
      nodes: {
        a: { text: "Связь прошлого решения и текущей проблемы:", choices: [
          { t: "«If we had moved to the cloud last year, we wouldn't be facing these Monday overloads now.»", pts: 2, next: "b", fb: "Mixed: прошлое → настоящее." },
          { t: "«If we moved to the cloud last year, we wouldn't face these overloads.»", pts: 0, next: "a_fix", fb: "Last year требует Past Perfect в if-части.", tag: "TIMELINE" },
          { t: "«If we had moved to the cloud last year, we wouldn't have faced these overloads now.»", pts: 1, next: "b", fb: "Would have faced + now — смешение планов; mixed точнее.", tag: "TIMELINE" }
        ] },
        a_fix: { text: "Член совета: «Sorry — did we move to the cloud last year or not?» Ваш ответ:", choices: [
          { t: "«No, we didn't. I meant: if we had moved last year, we wouldn't be facing these problems now.»", pts: 1, next: "b", fb: "Вы исправили смешение времён: mixed conditional." },
          { t: "«We moved, but not really.»", pts: 0, next: "b", fb: "Противоречит фактам и запутывает совет.", tag: "CONTEXT" }
        ] },
        b: { text: "Член совета: «What if we did nothing?» Ваш ответ:", choices: [
          { t: "«If we did nothing, the overloads would probably get worse as traffic grows.»", pts: 2, next: "c", fb: "Second conditional отвечает на гипотезу того же типа." },
          { t: "«If we do nothing, the overloads would get worse.»", pts: 0, next: "c", fb: "Смешение first и second в одной фразе.", tag: "FORM" }
        ] },
        c: { text: "Ваше предложение:", choices: [
          { t: "«If the board approves the plan today, the migration will be completed by the end of Q3.»", pts: 2, next: null, fb: "Реальный план → first conditional; пассив Future Simple." },
          { t: "«Had the board approved the plan, we will migrate.»", pts: 0, next: null, fb: "Инверсия третьего типа + will — несовместимо.", tag: "FORM" },
          { t: "«Should the board approve the plan today, we will have completed the migration by the end of Q3.»", pts: 2, next: null, fb: "Формальная инверсия + Future Perfect — корректно." }
        ] }
      }
    }
  ];

  // src/content/vocab/general200.js
  var RAW2 = "\n# Ядро\nbe|быть, являться|быть, являться, находиться|становиться|The office [[is]] closed on Sundays.|Офис по воскресеньям закрыт.|be ready; be late; be responsible for|\nhave|иметь|иметь, обладать|давать|We [[have]] three new clients this month.|В этом месяце у нас три новых клиента.|have a meeting; have lunch; have a look|\ndo|делать (выполнять, заниматься)|делать (выполнять работу, заниматься)|создавать, изготавливать|Who [[did]] the analysis?|Кто делал анализ?|do research; do business; do your best|makedo\nmake|делать (создавать, производить)|делать (создавать, производить)|выполнять работу|We [[made]] a few changes to the plan.|Мы внесли несколько изменений в план.|make a decision; make a mistake; make money|makedo\nsay|сказать (что-то, передать слова)|сказать что-то (без адресата: ___ that...)|рассказать кому-то|She [[said]] the figures were wrong.|Она сказала, что цифры неверные.|say hello; say no; say goodbye|speech\ntell|сказать кому-то, рассказать|сказать кому-то, рассказать (___ me)|произнести вслух|Can you [[tell]] me the address?|Можешь сказать мне адрес?|tell the truth; tell a story; tell sb to do|speech\nget|получать; становиться (общее)|получать, доставать (общее, разговорное; g…)|отдавать|I [[got]] your email this morning.|Я получил твоё письмо сегодня утром.|get feedback; get better; get ready|\ngo|идти, ехать|идти, ехать (уходить)|приходить|Let's [[go]] through the agenda.|Давайте пройдёмся по повестке.|go ahead; go wrong; go on|\ncome|приходить, приезжать|приходить, приезжать (сюда)|уходить|Can you [[come]] to the meeting at 3?|Можешь прийти на встречу в 3?|come back; come up with; come true|\nknow|знать|знать|догадываться|Do you [[know]] who's in charge?|Ты знаешь, кто отвечает?|know sb well; know about; let sb know|\ntake|брать; занимать (о времени)|брать; занимать (о времени)|давать|The update [[took]] two hours.|Обновление заняло два часа.|take time; take part; take a break|bring\nsee|видеть|видеть|слышать|I can't [[see]] the attachment.|Я не вижу вложения.|see a doctor; see the point; see you|look\nthink|думать, считать|думать, считать (иметь мнение)|знать наверняка|I [[think]] we should wait.|Думаю, нам стоит подождать.|think about; think of; think twice|\nlook|смотреть (на что-то); выглядеть|смотреть (на что-то, look at); выглядеть|видеть|[[Look]] at this chart.|Посмотри на этот график.|look at; look for; look forward to|look\nwant|хотеть|хотеть|требовать|I [[want]] to change the date.|Я хочу перенести дату.|want sb to do; want to know|\ngive|давать|давать|брать|Please [[give]] me a minute.|Дайте мне минуту.|give advice; give feedback; give up|\nuse|использовать|использовать, пользоваться|выбрасывать|We [[use]] Slack for quick questions.|Мы используем Slack для быстрых вопросов.|use a tool; use data; used to|\nfind|находить|находить|терять|I can't [[find]] the latest version.|Не могу найти последнюю версию.|find out; find a solution; find it hard|\nask|спрашивать; просить|спрашивать; просить|отвечать|Can I [[ask]] a quick question?|Можно задать быстрый вопрос?|ask a question; ask for help; ask sb to do|\nwork|работать|работать|отдыхать|The new feature doesn't [[work]] on iOS.|Новая функция не работает на iOS.|work on; work out; work from home|\nseem|казаться|казаться (производить впечатление)|оказываться точно|The client [[seems]] happy with the results.|Похоже, клиент доволен результатами.|seem to be; it seems that|\nfeel|чувствовать|чувствовать (себя)|выглядеть|I [[feel]] much better today.|Сегодня я чувствую себя гораздо лучше.|feel free; feel like; feel sure|\ntry|пытаться, пробовать|пытаться, пробовать|избегать|[[Try]] restarting the app.|Попробуй перезапустить приложение.|try to do; try doing; try on|\nleave|уходить, уезжать; оставлять|уходить, уезжать; оставлять|прибывать|I [[left]] my laptop in the car.|Я оставил ноутбук в машине.|leave a message; leave early; leave out|\ncall|звонить; называть|звонить (по телефону); называть|писать (сообщение)|I'll [[call]] you after lunch.|Позвоню тебе после обеда.|call back; call off; call a meeting|\nput|класть, ставить|класть, ставить (куда-либо)|брать|[[Put]] the files in the shared folder.|Положи файлы в общую папку.|put off; put forward; put together|\nkeep|хранить; продолжать|хранить, держать; продолжать (делать)|выбрасывать|Please [[keep]] me updated.|Пожалуйста, держи меня в курсе.|keep in touch; keep doing; keep track of|\nlet|позволять (let sb do)|позволять (let sb do; l…)|запрещать|[[Let]] me check the schedule.|Дай я проверю расписание.|let sb know; let go; let down|allow\nmean|означать; иметь в виду|означать; иметь в виду|понимать|What do you [[mean]] by \"soon\"?|Что ты имеешь в виду под «скоро»?|mean to do; mean a lot|\nbecome|становиться|становиться (кем-то, каким-то)|приходить|She [[became]] a partner in 2021.|Она стала партнёром в 2021 году.|become clear; become available|\n# Речь и общение\ntalk|разговаривать|разговаривать (с кем-то, talk to)|кричать|We need to [[talk]] about the budget.|Нам нужно поговорить о бюджете.|talk to; talk about; talk sb into|speech\nspeak|говорить (на языке); выступать|говорить (на языке); выступать (с речью)|молчать|Do you [[speak]] German?|Вы говорите по-немецки?|speak English; speak up; speak at a conference|speech\nexplain|объяснять|объяснять|спрашивать|Could you [[explain]] the difference?|Не мог бы ты объяснить разницу?|explain sth to sb; explain why|\ndescribe|описывать|описывать|изображать (рисовать)|[[Describe]] the problem in detail.|Опиши проблему подробно.|describe sth as; describe how|\nmention|упоминать|упоминать|подчёркивать|She didn't [[mention]] the price.|Она не упомянула цену.|mention sth to sb; not to mention|\ndiscuss|обсуждать|обсуждать|спорить|Let's [[discuss]] it tomorrow.|Давайте обсудим это завтра.|discuss sth (без about!)|\nagree|соглашаться|соглашаться|спорить|I [[agree]] with your point.|Я согласен с твоим мнением.|agree with sb; agree on sth; agree to do|\nargue|спорить; утверждать|спорить; утверждать (приводя доводы)|соглашаться|They [[argued]] about the budget.|Они спорили о бюджете.|argue with sb; argue that|\nanswer|отвечать (на вопрос, звонок)|отвечать (на вопрос, звонок; a…)|спрашивать|Nobody [[answered]] the phone.|Никто не ответил на звонок.|answer a question; answer the phone|reply\nreply|отвечать (на письмо, сообщение)|отвечать (на письмо, сообщение; r…, + to)|пересылать|Please [[reply]] to this email by Friday.|Пожалуйста, ответьте на это письмо до пятницы.|reply to sb; reply-all|reply\nsuggest|предлагать (идею)|предлагать (идею, вариант; suggest doing)|требовать|I [[suggest]] postponing the launch.|Предлагаю отложить запуск.|suggest that; suggest doing|\npromise|обещать|обещать|угрожать|He [[promised]] to send the report.|Он пообещал прислать отчёт.|promise to do; keep a promise|\noffer|предлагать (что-то дать, сделать)|предлагать (дать или сделать что-то; offer to do)|просить|They [[offered]] me a job.|Мне предложили работу.|offer help; offer a discount; offer to do|\nwarn|предупреждать|предупреждать (об опасности)|успокаивать|I [[warned]] them about the risks.|Я предупредил их о рисках.|warn sb about; warn sb not to do|\ncomplain|жаловаться|жаловаться|хвалить|Customers [[complained]] about the delay.|Клиенты жаловались на задержку.|complain about; complain to sb|\napologise|извиняться|извиняться|благодарить|I [[apologise]] for the confusion.|Приношу извинения за путаницу.|apologise for; apologise to sb|\nthank|благодарить|благодарить|извиняться|I wanted to [[thank]] you for your help.|Хотел поблагодарить тебя за помощь.|thank sb for|\ninvite|приглашать|приглашать|выгонять|They [[invited]] us to the launch event.|Нас пригласили на презентацию.|invite sb to; invite sb to do|\nadmit|признавать|признавать (вину, факт)|отрицать|He [[admitted]] making a mistake.|Он признал, что ошибся.|admit doing; admit that|\ndeny|отрицать|отрицать|признавать|She [[denied]] sending the email.|Она отрицала, что отправляла письмо.|deny doing; deny that|\nclaim|утверждать; заявлять права|утверждать (что-то, не доказав); требовать (компенсацию)|доказывать|They [[claim]] the product is 100% safe.|Они утверждают, что продукт на 100% безопасен.|claim that; claim compensation|\nrecommend|рекомендовать|рекомендовать|запрещать|I'd [[recommend]] booking in advance.|Я бы рекомендовал бронировать заранее.|recommend doing; recommend that|\npersuade|убеждать (сделать что-то)|убеждать сделать что-то (persuade sb to do)|разубеждать|We [[persuaded]] them to extend the deadline.|Мы убедили их продлить срок.|persuade sb to do|\nconvince|убеждать (в чём-то)|убеждать в чём-то (convince sb of / that)|сомневаться|The data [[convinced]] me that we were wrong.|Данные убедили меня, что мы ошибались.|convince sb of; convince sb that|\ninform|сообщать, информировать|сообщать официально, информировать (inform sb of)|скрывать|Please [[inform]] us of any changes.|Пожалуйста, сообщайте нам о любых изменениях.|inform sb of / about|\n# Мышление\nbelieve|верить; считать|верить; полагать|сомневаться|I [[believe]] this is the right decision.|Я считаю, что это правильное решение.|believe in; believe that|\nunderstand|понимать|понимать|объяснять|I don't [[understand]] the error message.|Я не понимаю сообщение об ошибке.|understand why; make oneself understood|\nremember|помнить, вспоминать|помнить, вспоминать|забывать|[[Remember]] to save your work.|Не забудь сохранить работу.|remember to do; remember doing|\nforget|забывать|забывать|вспоминать|Don't [[forget]] your badge.|Не забудь бейдж.|forget to do; forget about|\nlearn|учить (самому), узнавать|учить (самому), узнавать (о чём-то)|учить кого-то|I'm [[learning]] Python.|Я учу Python.|learn from; learn about; learn how to|learn\nteach|учить (кого-то), преподавать|учить (кого-то), преподавать|учиться самому|She [[teaches]] data analysis.|Она преподаёт анализ данных.|teach sb to do; teach sb sth|learn\nstudy|изучать, учиться|изучать (подробно), учиться (в вузе)|забывать|We [[studied]] the market carefully.|Мы тщательно изучили рынок.|study for an exam; study at university|learn\nconsider|рассматривать, обдумывать|рассматривать (вариант), обдумывать (consider doing)|отвергать|We're [[considering]] a new supplier.|Мы рассматриваем нового поставщика.|consider doing; consider sb/sth (to be)|\ndecide|решать (принимать решение)|решать (принимать решение)|откладывать|We [[decided]] to cancel the trip.|Мы решили отменить поездку.|decide to do; decide on; decide whether|\nexpect|ожидать (считать вероятным)|ожидать (считать вероятным)|надеяться|We [[expect]] the results by Friday.|Мы ожидаем результаты к пятнице.|expect sb to do; as expected|\nhope|надеяться|надеяться|ожидать (как вероятное)|I [[hope]] you're well.|Надеюсь, у тебя всё хорошо.|hope to do; hope for; hope so|\nwonder|интересоваться, задаваться вопросом|задаваться вопросом, интересоваться (I ___ if...)|знать точно|I [[wonder]] if you could help me.|Не могли бы вы мне помочь?|wonder if / whether; wonder why|\nrealise|осознавать|осознавать, понимать (вдруг)|забывать|I didn't [[realise]] it was so late.|Я не понимал, что уже так поздно.|realise that; realise a plan (осуществить)|\nrecognise|узнавать (кого-то); признавать|узнавать (знакомое); признавать (официально)|путать|I didn't [[recognise]] her at first.|Я сначала её не узнал.|recognise sb; recognise the need for|\nimagine|представлять (себе)|представлять себе, воображать|вспоминать|[[Imagine]] the app had a million users.|Представь, что у приложения миллион пользователей.|imagine doing; imagine that|\nguess|угадывать, догадываться|угадывать, догадываться|знать наверняка|Can you [[guess]] the total cost?|Угадаешь общую стоимость?|guess right; I guess (разг. «думаю»)|\ndoubt|сомневаться|сомневаться|верить|I [[doubt]] they'll agree.|Сомневаюсь, что они согласятся.|doubt that / whether; no doubt|\nprefer|предпочитать|предпочитать|ненавидеть|I [[prefer]] email to phone calls.|Я предпочитаю почту звонкам.|prefer A to B; prefer to do|\nnotice|замечать|замечать|игнорировать|Did you [[notice]] the typo?|Ты заметил опечатку?|notice that; notice sb doing|look\ncompare|сравнивать|сравнивать|смешивать|Let's [[compare]] the two offers.|Давайте сравним два предложения.|compare with / to; compared to|\nchoose|выбирать|выбирать|отказываться|You can [[choose]] any date.|Можно выбрать любую дату.|choose between; choose to do|\nplan|планировать|планировать|импровизировать|We [[plan]] to launch in May.|Мы планируем запуск в мае.|plan to do; plan ahead|\nsolve|решать (задачу, проблему)|решать (задачу, проблему)|создавать (проблему)|We finally [[solved]] the problem.|Мы наконец решили проблему.|solve a problem; solve a puzzle|\ncheck|проверять|проверять|подтверждать|[[Check]] your spelling before sending.|Проверь орфографию перед отправкой.|check in; check out; check that|\nmind|возражать (против)|возражать, быть против (Do you ___ if...?)|соглашаться|Do you [[mind]] if I join?|Не возражаешь, если я присоединюсь?|mind doing; never mind|\n# Движение и положение\nmove|двигать(ся); переезжать|двигать(ся); переезжать|оставаться|We [[moved]] to a new office.|Мы переехали в новый офис.|move on; move in; move forward|\nturn|поворачивать(ся); превращаться|поворачивать(ся)|останавливаться|[[Turn]] left at the lights.|На светофоре поверните налево.|turn on/off; turn down; turn into|\nfollow|следовать (за)|следовать (за кем-то/чем-то)|опережать|Please [[follow]] the instructions.|Пожалуйста, следуйте инструкциям.|follow up; follow the rules; as follows|\nreturn|возвращать(ся)|возвращать(ся)|уезжать|She [[returned]] from Tokyo yesterday.|Вчера она вернулась из Токио.|return to; return a call|\narrive|прибывать|прибывать (arrive at / in)|отправляться|The parcel [[arrived]] this morning.|Посылка пришла сегодня утром.|arrive at the office; arrive in Paris|\nenter|входить; вводить (данные)|входить; вводить (данные)|выходить|[[Enter]] your password.|Введите пароль.|enter a room; enter data; enter a market|\ntravel|путешествовать, ездить|путешествовать, ездить (в поездки)|оставаться дома|I [[travel]] a lot for work.|Я много езжу по работе.|travel abroad; travel by train|\nwalk|идти пешком, гулять|идти пешком, гулять|бежать|I usually [[walk]] to work.|Я обычно хожу на работу пешком.|walk sb through (объяснить по шагам)|\nrun|бежать; управлять (бизнесом)|бежать; управлять (бизнесом), запускать (программу)|стоять|She [[runs]] a design studio.|Она руководит дизайн-студией.|run a business; run a test; run out of|\nfall|падать|падать, снижаться (fall — fell — fallen)|подниматься|Profits [[fell]] by 5%.|Прибыль снизилась на 5%.|fall behind; fall apart; fall in love|\nrise|подниматься, расти (сам; r…)|подниматься, расти (сам, без объекта; r…)|поднимать что-то|Costs [[rose]] sharply in March.|В марте расходы резко выросли.|rise by 10%; rise to the challenge|rise\nraise|поднимать (что-то)|поднимать что-то (raise prices, raise a question)|подниматься самому|She [[raised]] an important question.|Она подняла важный вопрос.|raise prices; raise concerns; raise money|rise\ncarry|нести, носить|нести (в руках), перевозить|ронять|Can you [[carry]] this box?|Можешь донести эту коробку?|carry out (выполнять); carry on|bring\nbring|приносить (сюда)|приносить (сюда, к говорящему)|относить туда|[[Bring]] your laptop to the workshop.|Принесите ноутбук на семинар.|bring up; bring sb along|bring\nsend|отправлять|отправлять, посылать|получать|I'll [[send]] you the invite.|Я пришлю тебе приглашение.|send off; send back; send sb sth|\nset|устанавливать|устанавливать (цель, срок)|отменять|Let's [[set]] a deadline.|Давайте установим срок.|set up; set a goal; set an alarm|\nstand|стоять; выносить|стоять; терпеть (can't ___)|сидеть|I can't [[stand]] long meetings.|Терпеть не могу долгие совещания.|stand up; stand for; stand out|\nsit|сидеть|сидеть|стоять|Please [[sit]] down.|Садитесь, пожалуйста.|sit down; sit an exam (BrE)|\nstay|оставаться; останавливаться|оставаться; останавливаться (в отеле)|уезжать|We [[stayed]] at a hotel near the venue.|Мы остановились в отеле рядом с площадкой.|stay in touch; stay late; stay at|\nreach|достигать, дотягиваться; связаться|достигать (цели, места); дозвониться|терять|We [[reached]] an agreement.|Мы достигли соглашения.|reach a goal; reach sb by phone|\ncross|пересекать|пересекать, переходить|обходить|[[Cross]] the street at the lights.|Переходите улицу на светофоре.|cross out; cross one's mind|\ndrive|водить машину, ехать за рулём|водить машину, ехать за рулём|ехать пассажиром|She [[drives]] to work.|Она ездит на работу на машине.|drive growth; drive sb crazy|\nfly|летать, лететь|летать, лететь|плыть|We're [[flying]] to Almaty tomorrow.|Завтра мы летим в Алматы.|fly economy; time flies|\npull|тянуть|тянуть (на себя)|толкать|[[Pull]] the door to open it.|Потяните дверь на себя, чтобы открыть.|pull out; pull together|push\npush|толкать; продвигать|толкать; продвигать (настаивать)|тянуть|They're [[pushing]] for a quick decision.|Они настаивают на быстром решении.|push for; push back (переносить)|push\n# Изменения и состояния\nchange|менять(ся)|менять(ся), изменять(ся)|сохранять|We [[changed]] the meeting time.|Мы изменили время встречи.|change one's mind; change plans|\ngrow|расти; выращивать|расти (развиваться), выращивать (g…)|уменьшаться|The company [[grew]] fast last year.|В прошлом году компания быстро росла.|grow up; grow a business|rise\nincrease|увеличивать(ся)|увеличивать(ся) (в объёме, числе; i…)|уменьшать|We need to [[increase]] the budget.|Нам нужно увеличить бюджет.|increase by / to; increase sales|rise\nreduce|сокращать, уменьшать|сокращать, уменьшать|увеличивать|We [[reduced]] costs by 15%.|Мы сократили расходы на 15%.|reduce costs; reduce risk|\nimprove|улучшать(ся)|улучшать(ся)|ухудшать|The update [[improved]] performance.|Обновление улучшило производительность.|improve quality; improve on|\ndevelop|развивать(ся); разрабатывать|развивать(ся); разрабатывать (продукт)|разрушать|They [[developed]] a new app.|Они разработали новое приложение.|develop skills; develop a product|\ncontinue|продолжать(ся)|продолжать(ся)|прекращать|Please [[continue]] with your presentation.|Пожалуйста, продолжайте выступление.|continue to do / doing|\nstop|останавливать(ся), прекращать|останавливать(ся), прекращать|начинать|[[Stop]] the recording, please.|Остановите запись, пожалуйста.|stop doing; stop to do|\nstart|начинать; запускать (s…)|начинать; запускать (s…)|заканчивать|Let's [[start]] the meeting.|Давайте начнём встречу.|start doing / to do; start a business|begin\nbegin|начинать(ся) (b…)|начинать(ся) (книжн.-нейтр.; b…)|заканчивать|The conference [[begins]] on Monday.|Конференция начинается в понедельник.|begin with; to begin with|begin\nfinish|заканчивать (f…)|заканчивать (дело, работу; f…)|начинать|Have you [[finished]] the slides?|Ты закончил слайды?|finish doing; finish off|finish\nend|заканчиваться, завершать(ся) (e…)|заканчиваться, завершаться (e…)|начинаться|The contract [[ends]] in June.|Контракт заканчивается в июне.|end up; end with|finish\nremain|оставаться (в состоянии)|оставаться (в том же состоянии; формальнее stay)|меняться|Prices [[remain]] high.|Цены остаются высокими.|remain calm; it remains to be seen|\nhappen|происходить, случаться|происходить, случаться|планировать|What [[happened]] to the server?|Что случилось с сервером?|happen to do; happen to sb|\nappear|появляться; казаться|появляться (возникать)|исчезать|A warning [[appeared]] on the screen.|На экране появилось предупреждение.|appear to be; appear in court|\ndisappear|исчезать|исчезать|появляться|The file [[disappeared]] from the folder.|Файл исчез из папки.|disappear without a trace|\nexist|существовать|существовать|исчезать|Does this feature [[exist]] in the free plan?|Есть ли эта функция в бесплатном тарифе?|exist in; no longer exist|\ndepend|зависеть|зависеть (depend on)|влиять|It [[depends]] on the budget.|Это зависит от бюджета.|depend on; it depends|\nmatter|иметь значение|иметь значение|мешать|It doesn't [[matter]] who starts.|Неважно, кто начнёт.|it doesn't matter; matter to sb|\nbelong|принадлежать|принадлежать (belong to)|заимствовать|This laptop [[belongs]] to the company.|Этот ноутбук принадлежит компании.|belong to; belong together|\nfail|терпеть неудачу; не суметь|терпеть неудачу, проваливать (экзамен)|добиваться успеха|The test [[failed]] twice.|Тест дважды не прошёл.|fail to do; fail an exam|\nsucceed|добиваться успеха|добиваться успеха (succeed in doing)|проваливаться|She [[succeeded]] in closing the deal.|Ей удалось заключить сделку.|succeed in doing; succeed sb (сменить)|\nsurvive|выживать, пережить|выживать, пережить (кризис)|погибать|The company [[survived]] the crisis.|Компания пережила кризис.|survive a crisis|\nbreak|ломать|ломать, разбивать; нарушать (правило)|чинить|Don't [[break]] the rules.|Не нарушай правила.|break down; break the news; break a record|\nfix|чинить, исправлять|чинить, исправлять (ошибку)|ломать|They [[fixed]] the bug overnight.|Они исправили баг за ночь.|fix a bug; fix a date|\n# Владение и деньги\nbuy|покупать|покупать|продавать|We [[bought]] a new server.|Мы купили новый сервер.|buy from; buy time|\nsell|продавать|продавать|покупать|They [[sell]] software subscriptions.|Они продают подписки на ПО.|sell out; sell well|\npay|платить|платить|получать оплату|Who [[paid]] for lunch?|Кто заплатил за обед?|pay for; pay attention; pay off|\nspend|тратить (деньги, время)|тратить (деньги, время)|экономить|We [[spent]] a week on research.|Мы потратили неделю на исследование.|spend time on / doing|\ncost|стоить|стоить (о цене)|тратить|How much does it [[cost]]?|Сколько это стоит?|cost a fortune; cost sb sth|\nlose|терять; проигрывать|терять; проигрывать|находить|We [[lost]] an important client.|Мы потеряли важного клиента.|lose money; lose weight; lose track of|\nwin|выигрывать|выигрывать (приз, матч, тендер)|проигрывать|We [[won]] the contract.|Мы выиграли контракт.|win an award; win a deal|\nown|владеть|владеть (быть собственником)|арендовать|Who [[owns]] the data?|Кому принадлежат данные?|own a company; own up (признаться)|\nshare|делиться; совместно использовать|делиться; совместно использовать|скрывать|Can you [[share]] your screen?|Можешь показать свой экран?|share a screen; share an opinion|\nborrow|брать взаймы|брать взаймы (у кого-то)|давать взаймы|Can I [[borrow]] your charger?|Можно взять твою зарядку?|borrow from sb|money\nlend|давать взаймы|давать взаймы, одалживать (кому-то)|брать взаймы|Could you [[lend]] me 10 euros?|Не одолжишь 10 евро?|lend sb sth; lend a hand|money\nsave|сохранять; экономить; спасать|сохранять (файл); экономить; спасать|тратить|Don't forget to [[save]] the file.|Не забудь сохранить файл.|save time; save money; save a file|\nwaste|тратить впустую|тратить впустую|экономить|Let's not [[waste]] time.|Давайте не терять время зря.|waste time / money|\nearn|зарабатывать|зарабатывать|тратить|She [[earns]] more than her manager.|Она зарабатывает больше своего руководителя.|earn money; earn a living; earn respect|\nreceive|получать (официально; r…)|получать (официально, формально; r…)|отправлять|We [[received]] your application.|Мы получили вашу заявку.|receive feedback; receive a payment|\nprovide|предоставлять, обеспечивать|предоставлять, обеспечивать (provide sb with)|лишать|We [[provide]] 24/7 support.|Мы обеспечиваем круглосуточную поддержку.|provide sb with sth; provide for|\ninclude|включать (в состав)|включать (в состав)|исключать|The price [[includes]] VAT.|Цена включает НДС.|including; include sth in|\ncontain|содержать (внутри)|содержать (в себе)|выпускать|The file [[contains]] personal data.|Файл содержит персональные данные.|contain information|\ncollect|собирать (коллекционировать)|собирать (данные, вещи); забирать (кого-то)|раздавать|We [[collect]] feedback after each session.|Мы собираем отзывы после каждой сессии.|collect data; collect sb from the station|\ndeliver|доставлять; выполнять (обещанное)|доставлять; выполнять обещанное (deliver results)|заказывать|The team always [[delivers]] on time.|Команда всегда сдаёт работу вовремя.|deliver results; deliver a talk|\n# Действия и работа\nbuild|строить|строить|разрушать|We're [[building]] a new platform.|Мы строим новую платформу.|build trust; build a team|\ncreate|создавать|создавать|уничтожать|[[Create]] a new folder for the project.|Создай новую папку для проекта.|create value; create an account|\nproduce|производить|производить, выпускать (продукцию)|потреблять|The factory [[produces]] 500 units a day.|Завод выпускает 500 единиц в день.|produce results; produce a report|\ndesign|проектировать, разрабатывать дизайн|проектировать, разрабатывать дизайн|копировать|She [[designed]] the new logo.|Она разработала новый логотип.|design a system; be designed to|\nwrite|писать|писать|читать|I'll [[write]] a short summary.|Я напишу краткое резюме.|write down; write up; write to sb|\nread|читать|читать|писать|Have you [[read]] the brief?|Ты прочитал бриф?|read through; read about|\nopen|открывать|открывать|закрывать|[[Open]] the attachment.|Откройте вложение.|open a file; open an account|\nclose|закрывать|закрывать|открывать|Please [[close]] all tabs before the update.|Перед обновлением закройте все вкладки.|close a deal; close down|\ncut|резать; сокращать|резать; сокращать (расходы)|увеличивать|They [[cut]] the price by half.|Они снизили цену вдвое.|cut costs; cut down on|\nhold|держать; проводить (мероприятие)|держать; проводить (встречу, мероприятие)|отменять|We'll [[hold]] a meeting on Monday.|В понедельник мы проведём встречу.|hold a meeting; hold on|\ncatch|ловить; успевать (на транспорт)|ловить; успевать (на поезд); заразиться|пропускать|I need to [[catch]] the 7 o'clock train.|Мне нужно успеть на поезд в 7.|catch a cold; catch up|\nthrow|бросать|бросать (кидать)|ловить|Don't [[throw]] away the receipt.|Не выбрасывай чек.|throw away; throw a party|\ndrop|ронять; падать; отказываться от|ронять; снижаться резко; отказываться от (идеи)|поднимать|Sales [[dropped]] in January.|В январе продажи упали.|drop by; drop out; drop an idea|\nfill|наполнять; заполнять|наполнять; заполнять (fill in a form)|опустошать|Please [[fill]] in this form.|Пожалуйста, заполните эту форму.|fill in / out; fill a position|\ncover|покрывать; охватывать|покрывать (расходы); охватывать (тему)|раскрывать|The report [[covers]] the last quarter.|Отчёт охватывает последний квартал.|cover costs; cover for sb|\njoin|присоединяться|присоединяться, вступать|покидать|Will you [[join]] us for lunch?|Присоединишься к нам за обедом?|join a team; join a call|\nmeet|встречать(ся); знакомиться|встречать(ся), знакомиться; выполнять (meet a deadline)|прощаться|Nice to [[meet]] you.|Приятно познакомиться.|meet a deadline; meet expectations|\nvisit|посещать|посещать, навещать|покидать|We [[visited]] the factory last week.|На прошлой неделе мы посетили завод.|visit a client; visit a website|\nwait|ждать|ждать (wait for)|спешить|Can you [[wait]] a moment?|Можешь подождать минутку?|wait for; can't wait to|\nwatch|смотреть (фильм, процесс), наблюдать|смотреть (фильм, процесс), наблюдать|видеть|We [[watched]] the demo together.|Мы вместе посмотрели демо.|watch out; watch a video|look\nlisten|слушать|слушать (listen to)|слышать|Please [[listen]] carefully.|Пожалуйста, слушайте внимательно.|listen to sb|hear\nhear|слышать|слышать|слушать|I can't [[hear]] you — you're on mute.|Я тебя не слышу — у тебя выключен микрофон.|hear about; hear from sb|hear\nhelp|помогать|помогать|мешать|Can you [[help]] me with this?|Можешь помочь мне с этим?|help sb (to) do; can't help doing|\nsupport|поддерживать|поддерживать|противостоять|We fully [[support]] the proposal.|Мы полностью поддерживаем предложение.|support a decision; customer support|\nallow|разрешать (allow sb to do)|разрешать (allow sb to do; a…)|запрещать|The policy [[allows]] remote work.|Политика разрешает удалённую работу.|allow sb to do; allow for|allow\nneed|нуждаться, нужно|нуждаться (I ___ help)|иметь лишнее|We [[need]] more time.|Нам нужно больше времени.|need to do; need sth|\nrequire|требовать (формально)|требовать (быть необходимым — формально)|предлагать|The role [[requires]] fluent English.|Должность требует свободного английского.|require sb to do; be required|\ninvolve|включать в себя; вовлекать|включать в себя (предполагать); вовлекать|исключать|The job [[involves]] a lot of travel.|Работа предполагает много поездок.|involve doing; be involved in|\nmanage|управлять; справляться|управлять (руководить); справиться (manage to do)|проваливать|She [[manages]] a team of ten.|Она руководит командой из десяти человек.|manage to do; manage a project|\nhandle|справляться с, обрабатывать|справляться с (ситуацией), обрабатывать (запросы)|избегать|Who [[handles]] customer complaints?|Кто занимается жалобами клиентов?|handle a situation; handle requests|\nprepare|готовить(ся)|готовить(ся) (prepare for)|импровизировать|I need to [[prepare]] for the interview.|Мне нужно подготовиться к собеседованию.|prepare for; prepare a report|\nprotect|защищать|защищать|атаковать|We must [[protect]] customer data.|Мы должны защищать данные клиентов.|protect from / against|\nprevent|предотвращать|предотвращать, не допускать|вызывать|Backups [[prevent]] data loss.|Резервные копии предотвращают потерю данных.|prevent sb from doing|\ncause|вызывать, быть причиной|вызывать, быть причиной|предотвращать|What [[caused]] the outage?|Что вызвало сбой?|cause problems; cause sb to do|\naffect|влиять (на)|влиять на (affect sth)|не замечать|The delay will [[affect]] our plans.|Задержка повлияет на наши планы.|affect performance; be affected by|\navoid|избегать|избегать|искать|Try to [[avoid]] jargon.|Старайтесь избегать жаргона.|avoid doing; avoid mistakes|\naccept|принимать (соглашаться)|принимать (предложение, условия)|отклонять|We [[accepted]] their offer.|Мы приняли их предложение.|accept an offer; accept responsibility|\nrefuse|отказываться|отказываться (refuse to do)|соглашаться|He [[refused]] to sign.|Он отказался подписывать.|refuse to do; refuse an offer|\npick|выбирать; срывать; забирать|забирать (кого-то, pick up); отбирать|бросать|I'll [[pick]] you up at eight.|Я заберу тебя в восемь.|pick up; pick out|\nadd|добавлять|добавлять|удалять|[[Add]] me to the channel.|Добавь меня в канал.|add to; add up|\nremove|удалять, убирать|удалять, убирать|добавлять|Please [[remove]] my name from the list.|Пожалуйста, удалите моё имя из списка.|remove from|\nreplace|заменять|заменять|сохранять|We need to [[replace]] the old printer.|Нужно заменить старый принтер.|replace A with B|\ntest|тестировать, проверять|тестировать|игнорировать|We [[tested]] the app on 20 devices.|Мы протестировали приложение на 20 устройствах.|test a hypothesis; test sb on|\nprint|печатать|печатать (на принтере)|сканировать|Could you [[print]] the agenda?|Не распечатаешь повестку?|print out|\ndownload|скачивать|скачивать|загружать на сервер|[[Download]] the latest version.|Скачайте последнюю версию.|download a file|\nsign|подписывать|подписывать|расторгать|Please [[sign]] here.|Подпишите здесь, пожалуйста.|sign a contract; sign up; sign in|\ncancel|отменять|отменять|подтверждать|They [[cancelled]] the meeting.|Они отменили встречу.|cancel an order; cancel a subscription|\nbook|бронировать|бронировать|отменять|I've [[booked]] a room for Monday.|Я забронировал переговорку на понедельник.|book a table; book a flight|\norder|заказывать; приказывать|заказывать (товар, еду)|отменять|We [[ordered]] new laptops.|Мы заказали новые ноутбуки.|order online; order sb to do|\ncount|считать (количество); рассчитывать на|считать (пересчитывать); рассчитывать на (count on)|делить|You can [[count]] on me.|Можешь на меня рассчитывать.|count on; count the votes|\n";
  var isIrreg = /* @__PURE__ */ new Set(["be", "have", "do", "make", "say", "tell", "get", "go", "come", "know", "take", "see", "think", "give", "find", "feel", "leave", "put", "keep", "let", "mean", "become", "speak", "understand", "forget", "learn", "teach", "choose", "run", "fall", "rise", "bring", "send", "set", "stand", "sit", "drive", "fly", "grow", "begin", "break", "buy", "sell", "pay", "spend", "cost", "lose", "win", "lend", "build", "write", "read", "cut", "hold", "catch", "throw", "meet", "hear"]), GENERAL = [], cat = "";
  RAW2.trim().split("\n").forEach((line) => {
    if (line.startsWith("#")) {
      cat = line.slice(1).trim();
      return;
    }
    let [en, ru2, prompt, wrong, exS, exR, coll, group] = line.split("|").map((s) => (s || "").trim()), target = (exS.match(/\[\[(.+?)\]\]/) || [])[1] || en, accepted = [en], IZE = /* @__PURE__ */ new Set(["apologise", "realise", "recognise"]);
    IZE.has(en) && accepted.push(en.replace(/ise$/, "ize"));
    let clozeAnswers = [target];
    IZE.has(en) && clozeAnswers.push(target.replace(/is(e|ed|es|ing)$/, "iz$1")), /lled$/.test(target) && clozeAnswers.push(target.replace(/lled$/, "led")), GENERAL.push({
      id: "gen-" + en,
      english: en,
      russian: ru2,
      testPrompt: prompt || ru2,
      acceptedEnglishAnswers: accepted,
      acceptedRussianAnswers: [ru2],
      exampleSentence: exS,
      exampleTranslation: exR,
      category: cat,
      group: group || null,
      wrongRussian: wrong,
      clozeAnswers,
      collocations: coll ? coll.split(";").map((s) => s.trim()) : [],
      usageNotes: "",
      level: "B2",
      tags: ["general", isIrreg.has(en) ? "irregular" : "regular"],
      irregularId: isIrreg.has(en) ? "irr-" + en : null,
      n: GENERAL.length + 1
    });
  });

  // src/content/vocab/business100.js
  var RAW3 = "\n# Планирование\nallocate|выделять, распределять (ресурсы)|выделять, распределять (ресурсы, бюджет)|сокращать|We [[allocated]] 20% of the budget to marketing.|Мы выделили 20% бюджета на маркетинг.|allocate resources / budget to sth|\nprioritise|расставлять приоритеты|расставлять приоритеты, ставить на первое место|откладывать|We need to [[prioritise]] the security fixes.|Нужно в первую очередь заняться исправлениями безопасности.|prioritise tasks; prioritise A over B|\nschedule|назначать (на время), планировать в графике|назначать на определённое время (s…)|отменять|The call is [[scheduled]] for 10 a.m.|Звонок назначен на 10 утра.|schedule a meeting; be scheduled for|time\nreschedule|переносить на другое время|переносить на другое время (назначить заново; r…)|отменять полностью|Can we [[reschedule]] for Thursday?|Можем перенести на четверг?|reschedule a meeting / for|time\npostpone|откладывать (на более поздний срок)|откладывать на более поздний срок (p…)|ускорять|The launch was [[postponed]] until May.|Запуск отложили до мая.|postpone sth until / to|time\nforecast|прогнозировать|прогнозировать (продажи, спрос)|подсчитывать факт|We [[forecast]] a 10% rise in demand.|Мы прогнозируем рост спроса на 10%.|forecast sales / demand|\nestimate|оценивать приблизительно|оценивать приблизительно (сроки, затраты)|измерять точно|We [[estimate]] the project will take six weeks.|По нашей оценке, проект займёт шесть недель.|estimate costs; it is estimated that|\nbudget|планировать бюджет, закладывать в бюджет|закладывать в бюджет|тратить сверх плана|We've [[budgeted]] for two new hires.|Мы заложили в бюджет двух новых сотрудников.|budget for sth|\nalign|согласовывать, выравнивать (цели, позиции)|согласовывать, приводить в соответствие (цели, позиции)|разделять|Let's [[align]] on the priorities before Monday.|Давайте согласуем приоритеты до понедельника.|align with; align on; be aligned|\noutline|кратко излагать, обрисовывать|кратко излагать, обрисовывать (план)|детально расписывать|She [[outlined]] the main risks.|Она кратко обрисовала основные риски.|outline a plan / proposal|\n# Встречи и коммуникация\nbrief|инструктировать, вводить в курс|инструктировать, вводить в курс дела (brief sb on)|допрашивать|I'll [[brief]] the new team on the project.|Я введу новую команду в курс проекта.|brief sb on sth|\nupdate|держать в курсе; обновлять|держать в курсе (update sb on); обновлять|скрывать информацию|I'll [[update]] you on the progress tomorrow.|Завтра расскажу тебе о прогрессе.|update sb on; keep sb updated|\nclarify|уточнять, прояснять|уточнять, прояснять|запутывать|Could you [[clarify]] the deadline?|Не могли бы вы уточнить срок?|clarify a point / requirements|\nconfirm|подтверждать|подтверждать|отменять|Please [[confirm]] your attendance.|Пожалуйста, подтвердите участие.|confirm a booking; confirm that|\nsummarise|подводить итог, кратко излагать|подводить итог (summarise the discussion)|подробно расписывать|Let me [[summarise]] what we've agreed.|Позвольте подвести итог тому, о чём мы договорились.|summarise the key points|\npresent|представлять, презентовать|представлять, презентовать (результаты)|скрывать|She will [[present]] the results on Friday.|В пятницу она представит результаты.|present to sb; present findings|\npropose|предлагать (официально, план)|официально предлагать (план, решение; propose that)|отклонять|We [[propose]] a phased rollout.|Мы предлагаем поэтапное внедрение.|propose a solution; propose doing|\nfollow up|связываться повторно, отслеживать (после встречи)|связаться повторно после встречи (follow up on)|забывать|I'll [[follow up]] with an email.|Я пришлю письмо по итогам.|follow up on; follow up with sb|\ncirculate|рассылать (документ кругу лиц)|рассылать (документ всем участникам)|засекречивать|I'll [[circulate]] the minutes after the meeting.|После встречи разошлю протокол.|circulate a draft / minutes|\naddress|рассматривать, заниматься (проблемой); обращаться|заниматься (проблемой), решать вопрос; обращаться (к аудитории)|игнорировать|We need to [[address]] these concerns.|Нам нужно заняться этими опасениями.|address an issue / concerns|\nhighlight|выделять, подчёркивать|подчёркивать, акцентировать (важное)|скрывать|The report [[highlights]] three key trends.|В отчёте выделены три ключевых тренда.|highlight a problem / the need for|\nacknowledge|признавать; подтверждать получение|признавать (факт, ошибку); подтверждать получение|отрицать|Please [[acknowledge]] receipt of this email.|Пожалуйста, подтвердите получение письма.|acknowledge a mistake / receipt|\nattend|посещать (мероприятие), присутствовать|присутствовать на (встрече, мероприятии)|пропускать|Will you [[attend]] the board meeting?|Ты будешь на заседании совета?|attend a meeting (без to!)|\nchair|председательствовать, вести (встречу)|вести (встречу) как председатель|присутствовать как гость|Who's [[chairing]] the meeting today?|Кто сегодня ведёт встречу?|chair a meeting / committee|\nfacilitate|содействовать, облегчать; модерировать|модерировать (сессию); облегчать (процесс)|затруднять|She [[facilitated]] the workshop.|Она модерировала семинар.|facilitate a discussion / process|\n# Оценка и анализ\nassess|оценивать (ситуацию, риск; a…)|оценивать (ситуацию, риск, потребности; a…)|игнорировать|We need to [[assess]] the impact on customers.|Нужно оценить влияние на клиентов.|assess risks / needs / impact|evaluate\nevaluate|оценивать (эффективность, результат; e…)|оценивать (эффективность, варианты, результат; e…)|внедрять|We'll [[evaluate]] the pilot after three months.|Мы оценим пилот через три месяца.|evaluate options / performance|evaluate\nanalyse|анализировать|анализировать|угадывать|We [[analysed]] customer churn.|Мы проанализировали отток клиентов.|analyse data / results|\nreview|пересматривать, проверять (документ)|просматривать и оценивать (документ, процесс), пересматривать|утверждать без проверки|Legal will [[review]] the contract.|Юристы проверят договор.|review a document / performance|\nmeasure|измерять|измерять (показатели)|угадывать|How do we [[measure]] success?|Как мы измеряем успех?|measure performance / impact|\nmonitor|отслеживать, контролировать (состояние; m…)|отслеживать, контролировать состояние (m…)|забрасывать|We [[monitor]] server load 24/7.|Мы круглосуточно отслеживаем нагрузку на серверы.|monitor progress / performance|track\ntrack|отслеживать (прогресс, заказ; t…)|отслеживать (прогресс, заказ, метрики; t…)|терять|You can [[track]] your order online.|Вы можете отслеживать заказ онлайн.|track progress; keep track of|track\nbenchmark|сравнивать с эталоном|сравнивать с эталоном, с лучшими практиками|копировать|We [[benchmarked]] our prices against competitors.|Мы сравнили наши цены с ценами конкурентов.|benchmark against|\nidentify|выявлять, определять|выявлять, определять (проблемы, причины)|скрывать|We [[identified]] three bottlenecks.|Мы выявили три узких места.|identify risks / opportunities|\nquantify|количественно оценивать|выражать в цифрах, количественно оценивать|описывать качественно|Can we [[quantify]] the savings?|Можем ли мы выразить экономию в цифрах?|quantify the impact / benefits|\n# Переговоры и сделки\nnegotiate|вести переговоры|вести переговоры, договариваться (об условиях)|диктовать условия|We [[negotiated]] a 10% discount.|Мы выторговали скидку 10%.|negotiate a deal / terms / with sb|\napprove|одобрять, утверждать|одобрять, утверждать (официально)|отклонять|The board [[approved]] the budget.|Совет утвердил бюджет.|approve a plan; approve of sth (одобрять морально)|\nreject|отклонять|отклонять, отвергать|утверждать|The client [[rejected]] our first proposal.|Клиент отклонил наше первое предложение.|reject a proposal / an application|\nconcede|уступать; признавать (неохотно)|уступать (в переговорах); неохотно признавать|настаивать|They [[conceded]] on the delivery terms.|Они уступили по условиям поставки.|concede a point; concede that|\ncompromise|идти на компромисс|идти на компромисс (compromise on)|упорствовать|Both sides had to [[compromise]].|Обеим сторонам пришлось пойти на компромисс.|compromise on sth; reach a compromise (n.)|\nsecure|обеспечивать, добиваться (сделки, финансирования)|добиться, получить (сделку, финансирование)|упустить|We [[secured]] funding for next year.|Мы получили финансирование на следующий год.|secure a deal / funding / a contract|\nfinalise|окончательно согласовывать, завершать|окончательно согласовать, доработать (финальную версию)|начинать|We're [[finalising]] the contract this week.|На этой неделе мы окончательно согласовываем договор.|finalise details / a deal|\nsign off|утверждать, давать окончательное согласие|утвердить окончательно (дать «добро», sign off on)|возражать|The CFO needs to [[sign off]] on the budget.|Финансовый директор должен утвердить бюджет.|sign off on sth|\nrenew|продлевать (договор, подписку)|продлевать (договор, подписку)|расторгать|We [[renewed]] the contract for two years.|Мы продлили договор на два года.|renew a contract / licence|\nterminate|расторгать, прекращать|расторгать (договор), прекращать|продлевать|Either party may [[terminate]] the agreement.|Любая из сторон может расторгнуть соглашение.|terminate a contract / employment|\n# Проекты и исполнение\nimplement|внедрять (решение, систему)|внедрять (решение, систему)|откладывать|We [[implemented]] the new CRM in March.|В марте мы внедрили новую CRM.|implement a strategy / changes|\nexecute|выполнять, исполнять (план, стратегию)|исполнять, реализовывать (план, стратегию)|обдумывать|The plan was well designed but poorly [[executed]].|План был хорошо продуман, но плохо реализован.|execute a strategy / an order|\nroll out|разворачивать, внедрять поэтапно|разворачивать поэтапно (для всех пользователей)|сворачивать|We'll [[roll out]] the update to all users next week.|На следующей неделе развернём обновление для всех пользователей.|roll out a feature / an update|\nlaunch|запускать (продукт, кампанию)|запускать (продукт, кампанию)|закрывать|They [[launched]] the app in 12 countries.|Они запустили приложение в 12 странах.|launch a product / campaign|\ncoordinate|координировать|координировать, согласовывать действия|мешать|She [[coordinates]] the work of three teams.|Она координирует работу трёх команд.|coordinate with; coordinate efforts|\ndelegate|делегировать, поручать|делегировать, поручать (delegate sth to sb)|делать всё самому|Learn to [[delegate]] routine tasks.|Научитесь делегировать рутинные задачи.|delegate tasks / authority to|\noversee|курировать, руководить (контролировать)|курировать, надзирать за (проектом)|игнорировать|He [[oversees]] all international projects.|Он курирует все международные проекты.|oversee a project / operations|\nstreamline|оптимизировать, упрощать (процесс)|упрощать и ускорять (процесс)|усложнять|We [[streamlined]] the approval process.|Мы упростили процесс согласования.|streamline processes / operations|\niterate|делать итерации, дорабатывать по шагам|дорабатывать итерациями, многократно улучшать|бросать|We'll [[iterate]] on the design based on feedback.|Мы будем дорабатывать дизайн по отзывам.|iterate on sth|\nescalate|эскалировать, передавать на уровень выше|передавать (проблему) на уровень выше; обостряться|скрывать|If it's not fixed by noon, [[escalate]] it to the manager.|Если до полудня не исправят — передай вопрос руководителю.|escalate an issue to sb|\nresolve|урегулировать, разрешать (проблему, спор)|разрешать, урегулировать (проблему, спор)|обострять|The issue was [[resolved]] within an hour.|Проблему решили в течение часа.|resolve an issue / a conflict|\ntroubleshoot|искать и устранять неполадки|искать и устранять неполадки (диагностировать)|ломать|IT is [[troubleshooting]] the network.|ИТ-отдел ищет неполадки в сети.|troubleshoot a problem|\ndeploy|развёртывать (ПО); направлять (ресурсы)|развёртывать (ПО на сервере); направлять (ресурсы, людей)|откатывать|We [[deployed]] the fix to production.|Мы развернули исправление на проде.|deploy code / resources / staff|\n# Данные и технологии\nautomate|автоматизировать|автоматизировать|делать вручную|We [[automated]] the monthly reports.|Мы автоматизировали ежемесячные отчёты.|automate a process / tasks|\nintegrate|интегрировать|интегрировать, встраивать (integrate with / into)|разделять|The tool [[integrates]] with Slack.|Инструмент интегрируется со Slack.|integrate with / into|\nmigrate|переносить (данные, систему)|переносить, мигрировать (данные, систему)|удалять|We [[migrated]] all data to the cloud.|Мы перенесли все данные в облако.|migrate to; migrate data|\nupgrade|обновлять (до новой версии), повышать класс|обновлять до более новой/высокой версии (тарифа)|понижать|We [[upgraded]] to the premium plan.|Мы перешли на премиум-тариф.|upgrade to; upgrade software|\noptimise|оптимизировать|оптимизировать|ухудшать|We [[optimised]] the checkout page.|Мы оптимизировали страницу оформления заказа.|optimise performance / costs|\nscale|масштабировать|масштабировать (scale up / down)|сокращать до нуля|The platform can [[scale]] to millions of users.|Платформа может масштабироваться до миллионов пользователей.|scale up; scale back|\nvalidate|валидировать, подтверждать корректность|подтверждать корректность (данных, гипотезы), валидировать|опровергать|We [[validated]] the idea with ten customers.|Мы проверили идею на десяти клиентах.|validate data / a hypothesis|\nverify|удостоверяться, проверять достоверность|удостоверяться, проверять достоверность (фактов, личности)|подделывать|Please [[verify]] your email address.|Пожалуйста, подтвердите адрес электронной почты.|verify identity / information|\nconfigure|настраивать (систему)|настраивать, конфигурировать (систему)|удалять|[[Configure]] the settings before the first run.|Настройте параметры перед первым запуском.|configure settings / a server|\nback up|делать резервную копию|делать резервную копию (данных)|удалять|[[Back up]] your files before the update.|Сделайте резервную копию файлов перед обновлением.|back up data; a backup (n.)|\n# Финансы\ninvest|инвестировать, вкладывать|инвестировать, вкладывать (invest in)|выводить средства|We [[invested]] heavily in training.|Мы много вложили в обучение.|invest in; invest time / money|\npurchase|приобретать (формально)|приобретать (формальный синоним buy)|продавать|You can [[purchase]] additional licences online.|Дополнительные лицензии можно приобрести онлайн.|purchase goods / licences|\nprocure|закупать (через процедуру закупок)|закупать через процедуру закупок (procurement)|продавать|The department [[procures]] equipment through tenders.|Отдел закупает оборудование через тендеры.|procure goods / services|\ninvoice|выставлять счёт|выставлять счёт (invoice sb for)|оплачивать счёт|We'll [[invoice]] you at the end of the month.|Мы выставим вам счёт в конце месяца.|invoice a client for sth|\nreimburse|возмещать (расходы)|возмещать (расходы сотруднику, клиенту)|штрафовать|The company will [[reimburse]] your travel expenses.|Компания возместит ваши командировочные расходы.|reimburse sb for sth|\noutsource|передавать на аутсорс|передавать на аутсорс (внешнему подрядчику)|делать своими силами|We [[outsource]] our payroll.|Мы передали расчёт зарплаты на аутсорс.|outsource sth to|\nfund|финансировать|финансировать|облагать налогом|The project is [[funded]] by a grant.|Проект финансируется грантом.|fund a project; be funded by|\ngenerate|генерировать, приносить (доход)|приносить (доход), генерировать (лиды)|тратить|The campaign [[generated]] 500 leads.|Кампания принесла 500 лидов.|generate revenue / leads / ideas|\nexceed|превышать|превышать (ожидания, бюджет)|не дотягивать|Sales [[exceeded]] expectations.|Продажи превзошли ожидания.|exceed expectations / the budget|\nincur|нести (расходы, убытки)|нести, понести (расходы, убытки)|получать прибыль|The company [[incurred]] heavy losses.|Компания понесла крупные убытки.|incur costs / losses / fees|\n# Люди и команда\nhire|нанимать (h…)|нанимать на работу (h…)|увольнять|We're [[hiring]] two engineers.|Мы нанимаем двух инженеров.|hire staff; hire sb as|hire\nrecruit|набирать, подбирать (персонал; r…)|набирать, подбирать персонал (r…)|сокращать|It's hard to [[recruit]] senior developers.|Сложно найти старших разработчиков.|recruit staff / candidates|hire\nonboard|вводить в должность, адаптировать (новичка)|проводить онбординг, адаптировать нового сотрудника|увольнять|We [[onboard]] new hires in their first week.|Новичков мы адаптируем в первую неделю.|onboard new employees / clients|\ntrain|обучать|обучать (персонал)|экзаменовать|We [[trained]] all managers in GDPR.|Мы обучили всех менеджеров требованиям GDPR.|train sb in / on; train staff|\nmentor|наставлять|быть наставником, наставлять|контролировать|She [[mentors]] two junior analysts.|Она наставник двух младших аналитиков.|mentor sb|\npromote|повышать (в должности); продвигать|повышать в должности; продвигать (продукт)|понижать|He was [[promoted]] to head of sales.|Его повысили до руководителя отдела продаж.|promote sb to; promote a product|\nappoint|назначать (на должность)|назначать на должность (appoint sb as)|увольнять|They [[appointed]] a new CEO.|Они назначили нового генерального директора.|appoint sb (as) CEO|\nresign|увольняться по собственному желанию|увольняться по собственному желанию, уходить в отставку|нанимать|She [[resigned]] after five years.|Она уволилась через пять лет.|resign from a position|\nretain|удерживать, сохранять (клиентов, сотрудников)|удерживать (клиентов, сотрудников)|терять|We need to [[retain]] our best people.|Нам нужно удержать лучших сотрудников.|retain staff / customers|\nmotivate|мотивировать|мотивировать|демотивировать (лишать стимула)|Bonuses alone don't [[motivate]] people.|Одни лишь бонусы не мотивируют людей.|motivate sb to do|\ncollaborate|сотрудничать|сотрудничать (collaborate with / on)|конкурировать|We [[collaborated]] with the design team.|Мы работали совместно с командой дизайна.|collaborate with sb on sth|\nlay off|сокращать (увольнять по сокращению)|сокращать (увольнять из-за сокращения штата)|нанимать|The company [[laid off]] 200 employees.|Компания сократила 200 сотрудников.|lay off staff; be laid off|\nassign|поручать, назначать (задачу)|поручать (задачу), назначать на задачу (assign sth to sb)|отменять|I've [[assigned]] the ticket to Maria.|Я назначил тикет на Марию.|assign a task to sb|\n# Риски и контроль\nmitigate|смягчать (риск, последствия)|смягчать (риск, последствия)|усугублять|We added a backup supplier to [[mitigate]] the risk.|Мы добавили резервного поставщика, чтобы снизить риск.|mitigate risks / impact|\ncomply|соблюдать (требования)|соблюдать (требования, закон; comply with)|нарушать|All suppliers must [[comply]] with the policy.|Все поставщики обязаны соблюдать политику.|comply with regulations|\nenforce|обеспечивать соблюдение (правил)|обеспечивать соблюдение (правил, закона)|отменять|The new rules will be strictly [[enforced]].|За соблюдением новых правил будут строго следить.|enforce a rule / policy|\naudit|проводить аудит|проводить аудит, проверять (счета, процессы)|подделывать|External consultants [[audited]] our accounts.|Внешние консультанты провели аудит нашей отчётности.|audit accounts / processes|\nauthorise|санкционировать, разрешать (официально)|официально санкционировать, давать полномочия|запрещать|Only managers can [[authorise]] refunds.|Только руководители могут санкционировать возвраты.|authorise payment / sb to do|\nensure|гарантировать, обеспечивать|гарантировать, обеспечивать (ensure that)|рисковать|Please [[ensure]] that all fields are completed.|Пожалуйста, убедитесь, что все поля заполнены.|ensure that; ensure quality|\nanticipate|предвидеть, ожидать (и готовиться)|предвидеть (и заранее готовиться)|не замечать|We [[anticipate]] some delays in Q3.|Мы ожидаем некоторых задержек в третьем квартале.|anticipate problems / demand|\nflag|отмечать, обращать внимание (на проблему)|сигнализировать о проблеме, отметить (flag sth to sb)|скрывать|Thanks for [[flagging]] the issue.|Спасибо, что обратил внимание на проблему.|flag an issue / a risk|\nminimise|сводить к минимуму|сводить к минимуму|максимизировать|We want to [[minimise]] downtime.|Мы хотим свести простои к минимуму.|minimise risk / costs / downtime|\n", BUSINESS = [], cat2 = "";
  RAW3.trim().split("\n").forEach((line) => {
    if (line.startsWith("#")) {
      cat2 = line.slice(1).trim();
      return;
    }
    let [en, ru2, prompt, wrong, exS, exR, coll, group] = line.split("|").map((s) => (s || "").trim()), target = (exS.match(/\[\[(.+?)\]\]/) || [])[1] || en, accepted = [en], IZE = /* @__PURE__ */ new Set(["prioritise", "summarise", "finalise", "optimise", "authorise", "minimise"]);
    IZE.has(en) && accepted.push(en.replace(/ise$/, "ize")), en === "analyse" && accepted.push("analyze");
    let cloze = [target];
    IZE.has(en) && cloze.push(target.replace(/is(e|ed|es|ing)$/, "iz$1")), target === "analysed" && cloze.push("analyzed"), BUSINESS.push({
      id: "bus-" + en.replace(/\s+/g, "-"),
      english: en,
      russian: ru2,
      testPrompt: prompt || ru2,
      acceptedEnglishAnswers: accepted,
      acceptedRussianAnswers: [ru2],
      exampleSentence: exS,
      exampleTranslation: exR,
      category: cat2,
      group: group || null,
      wrongRussian: wrong,
      clozeAnswers: cloze,
      collocations: coll ? coll.split(";").map((s) => s.trim()) : [],
      usageNotes: "",
      level: "B2",
      tags: ["business"],
      n: BUSINESS.length + 1
    });
  });

  // src/content/vocab/agents123.js
  var AGENTS = { id: "building-effective-agents-123-v3", title: "Building Effective Agents", words: [{ english: "extensive testing", russian: "всестороннее тестирование", testPrompt: "всестороннее тестирование", acceptedEnglishAnswers: ["extensive testing"], acceptedRussianAnswers: ["всестороннее тестирование"], exampleSentence: "We recommend [[extensive testing]] in sandboxed environments, along with the appropriate guardrails.", exampleTranslation: "Перевод целевого выражения: всестороннее тестирование.", extraExamples: ["The release requires extensive testing.", "Extensive testing uncovered an edge case."], category: "agents", wrongRussian: "автоматизация оценивания моделей", clozeAnswers: ["extensive testing"], id: "ai-1" }, { english: "tradeoff", russian: "компромисс между преимуществами и недостатками", testPrompt: "компромисс между преимуществами и недостатками", acceptedEnglishAnswers: ["tradeoff"], acceptedRussianAnswers: ["компромисс между преимуществами и недостатками"], exampleSentence: "Agentic systems often trade latency and cost for better task performance, and you should consider when this [[tradeoff]] makes sense.", exampleTranslation: "Перевод целевого выражения: компромисс между преимуществами и недостатками.", extraExamples: ["Every design choice involves a tradeoff.", "The tradeoff between speed and quality is worth discussing."], category: "language", wrongRussian: "было бы достаточно", clozeAnswers: ["tradeoff"], id: "ai-2" }, { english: "assumption", russian: "предположение", testPrompt: "предположение", acceptedEnglishAnswers: ["assumption"], acceptedRussianAnswers: ["предположение"], exampleSentence: "Incorrect [[assumptions]] about what's under the hood are a common source of customer error.", exampleTranslation: "Перевод целевого выражения: предположение.", extraExamples: ["We made an assumption about user behavior.", "That assumption needs to be tested."], category: "development", wrongRussian: "проявляется в", clozeAnswers: ["assumptions", "assumption"], id: "ai-3" }, { english: "run in parallel", russian: "выполняться параллельно", testPrompt: "выполняться параллельно", acceptedEnglishAnswers: ["run in parallel"], acceptedRussianAnswers: ["выполняться параллельно"], exampleSentence: "Sectioning: Breaking a task into independent subtasks [[run in parallel]].", exampleTranslation: "Перевод целевого выражения: выполняться параллельно.", extraExamples: ["The calculations run in parallel to save time.", "Both experiments run in parallel this week."], category: "workflow", wrongRussian: "наборы инструментов", clozeAnswers: ["run in parallel"], id: "ai-4" }, { english: "harder to debug", russian: "сложнее отлаживать", testPrompt: "сложнее отлаживать", acceptedEnglishAnswers: ["harder to debug"], acceptedRussianAnswers: ["сложнее отлаживать"], exampleSentence: "However, they often create extra layers of abstraction that can obscure the underlying prompts ​​and responses, making them [[harder to debug]].", exampleTranslation: "Перевод целевого выражения: сложнее отлаживать.", extraExamples: ["Nested callbacks make code harder to debug.", "The inconsistent logs made the issue harder to debug."], category: "development", wrongRussian: "чётко формулировать", clozeAnswers: ["harder to debug"], id: "ai-5" }, { english: "ground truth", russian: "достоверная информация из реальной среды", testPrompt: "достоверная информация из реальной среды", acceptedEnglishAnswers: ["ground truth"], acceptedRussianAnswers: ["достоверная информация из реальной среды"], exampleSentence: "During execution, it's crucial for the agents to gain “[[ground truth]]” from the environment at each step (such as tool call results or code execution) to assess its progress.", exampleTranslation: "Перевод целевого выражения: достоверная информация из реальной среды.", extraExamples: ["The team checked the model's output against ground truth.", "Accurate labels provide ground truth for evaluation."], category: "agents", wrongRussian: "использование инструментов", clozeAnswers: ["ground truth"], id: "ai-6" }, { english: "use the term to describe", russian: "используют термин для обозначения", testPrompt: "используют термин для обозначения", acceptedEnglishAnswers: ["use the term to describe"], acceptedRussianAnswers: ["используют термин для обозначения"], exampleSentence: "Others [[use the term to describe]] more prescriptive implementations that follow predefined workflows.", exampleTranslation: "Перевод целевого выражения: используют термин для обозначения.", extraExamples: ["We use the term to describe a reusable component.", "Teachers use the term to describe a learning strategy."], category: "language", wrongRussian: "заранее определённые", clozeAnswers: ["use the term to describe"], id: "ai-7" }, { english: "chaining calls together", russian: "связывание вызовов в цепочку", testPrompt: "связывание вызовов в цепочку", acceptedEnglishAnswers: ["chaining calls together"], acceptedRussianAnswers: ["связывание вызовов в цепочку"], exampleSentence: "These frameworks make it easy to get started by simplifying standard low-level tasks like calling LLMs, defining and parsing tools, and [[chaining calls together]].", exampleTranslation: "Перевод целевого выражения: связывание вызовов в цепочку.", extraExamples: ["Chaining calls together is useful for multistep analysis.", "We reduced errors by chaining calls together carefully."], category: "development", wrongRussian: "учитывать, рассматривать", clozeAnswers: ["chaining calls together"], id: "ai-8" }, { english: "follow-up", russian: "Последующее действие / уточнение (что)", testPrompt: "Последующее действие / уточнение (что)", acceptedEnglishAnswers: ["follow-up"], acceptedRussianAnswers: ["Последующее действие / уточнение (что)"], exampleSentence: "Routing classifies an input and directs it to a specialized [[followup]] task.", exampleTranslation: "Перевод целевого выражения: последующее действие / уточнение (что).", extraExamples: ["Please send a follow-up after the meeting.", "The customer asked a follow-up question."], category: "workflow", wrongRussian: "Поддерживать, обслуживать", clozeAnswers: ["followup", "follow-up"], id: "ai-9" }, { english: "augmentations", russian: "дополнительные возможности, расширения", testPrompt: "дополнительные возможности, расширения", acceptedEnglishAnswers: ["augmentations"], acceptedRussianAnswers: ["дополнительные возможности", "расширения"], exampleSentence: "The basic building block of agentic systems is an LLM enhanced with [[augmentations]] such as retrieval, tools, and memory.", exampleTranslation: "Перевод целевого выражения: дополнительные возможности, расширения.", extraExamples: ["These augmentations improve the original system.", "The browser supports several accessibility augmentations."], category: "development", wrongRussian: "помечать код как проблемный", clozeAnswers: ["augmentations"], id: "ai-10" }, { english: "explore in detail", russian: "подробно рассмотреть", testPrompt: "подробно рассмотреть", acceptedEnglishAnswers: ["explore in detail"], acceptedRussianAnswers: ["подробно рассмотреть"], exampleSentence: "Below, we will [[explore]] both types of agentic systems in detail.", exampleTranslation: "Перевод целевого выражения: подробно рассмотреть.", extraExamples: ["The course will explore in detail how cities grow.", "We plan to explore in detail the reasons for the decline."], category: "language", wrongRussian: "поиск и извлечение информации", clozeAnswers: ["explore", "explore in detail"], id: "ai-11" }, { english: "useful critiques", russian: "полезные замечания", testPrompt: "полезные замечания", acceptedEnglishAnswers: ["useful critiques"], acceptedRussianAnswers: ["полезные замечания"], exampleSentence: "Literary translation where there are nuances that the translator LLM might not capture initially, but where an evaluator LLM can provide [[useful critiques]].", exampleTranslation: "Перевод целевого выражения: полезные замечания.", extraExamples: ["The editor gave useful critiques of the draft.", "Useful critiques help designers improve their work."], category: "agents", wrongRussian: "одновременно", clozeAnswers: ["useful critiques"], id: "ai-12" }, { english: "appropriate tools", russian: "подходящие инструменты", testPrompt: "подходящие инструменты", acceptedEnglishAnswers: ["appropriate tools"], acceptedRussianAnswers: ["подходящие инструменты"], exampleSentence: "Our current models can actively use these capabilities—generating their own search queries, selecting [[appropriate tools]], and determining what information to retain.", exampleTranslation: "Перевод целевого выражения: подходящие инструменты.", extraExamples: ["Choose appropriate tools for the task.", "The team struggled to identify appropriate tools."], category: "development", wrongRussian: "во время выполнения", clozeAnswers: ["appropriate tools"], id: "ai-13" }, { english: "capture initially", russian: "уловить с первого раза", testPrompt: "уловить с первого раза", acceptedEnglishAnswers: ["capture initially"], acceptedRussianAnswers: ["уловить с первого раза"], exampleSentence: "Literary translation where there are nuances that the translator LLM might not [[capture initially]], but where an evaluator LLM can provide useful critiques.", exampleTranslation: "Перевод целевого выражения: уловить с первого раза.", extraExamples: ["A beginner may not capture initially every nuance.", "Some risks are hard to capture initially in a short survey."], category: "agents", wrongRussian: "особая ценность", clozeAnswers: ["capture initially"], id: "ai-14" }, { english: "prescriptive", russian: "заранее заданная логика, жёсткие предписания", testPrompt: "заранее заданная логика, жёсткие предписания", acceptedEnglishAnswers: ["prescriptive"], acceptedRussianAnswers: ["заранее заданная логика", "жёсткие предписания"], exampleSentence: "Others use the term to describe more [[prescriptive]] implementations that follow predefined workflows.", exampleTranslation: "Перевод целевого выражения: заранее заданная логика, жёсткие предписания.", extraExamples: ["The guidelines are too prescriptive for creative work.", "A prescriptive process leaves little room for experimentation."], category: "language", wrongRussian: "оказаться недостаточным", clozeAnswers: ["prescriptive"], id: "ai-15" }, { english: "separation of concerns", russian: "разделение ответственности", testPrompt: "разделение ответственности", acceptedEnglishAnswers: ["separation of concerns"], acceptedRussianAnswers: ["разделение ответственности"], exampleSentence: "This workflow allows for [[separation of concerns]], and building more specialized prompts.", exampleTranslation: "Перевод целевого выражения: разделение ответственности.", extraExamples: ["Separation of concerns makes code easier to test.", "We improved separation of concerns between design and engineering."], category: "workflow", wrongRussian: "более качественное выполнение задач", clozeAnswers: ["separation of concerns"], id: "ai-16" }, { english: "some level of trust", russian: "определённый уровень доверия", testPrompt: "определённый уровень доверия", acceptedEnglishAnswers: ["some level of trust"], acceptedRussianAnswers: ["определённый уровень доверия"], exampleSentence: "The LLM will potentially operate for many turns, and you must have [[some level of trust]] in its decision-making.", exampleTranslation: "Перевод целевого выражения: определённый уровень доверия.", extraExamples: ["Delegation requires some level of trust.", "We need some level of trust before enabling automation."], category: "agents", wrongRussian: "ухудшать производительность", clozeAnswers: ["some level of trust"], id: "ai-17" }, { english: "assume", russian: "предполагать", testPrompt: "предполагать", acceptedEnglishAnswers: ["assume"], acceptedRussianAnswers: ["предполагать"], exampleSentence: "For the remainder of this post, we'll [[assume]] each LLM call has access to these augmented capabilities.", exampleTranslation: "Перевод целевого выражения: предполагать.", extraExamples: ["We assume that all users have a valid account.", "Don't assume the customer knows the terminology."], category: "development", wrongRussian: "адаптация под конкретный сценарий использования", clozeAnswers: ["assume"], id: "ai-18" }, { english: "over extended periods", russian: "в течение длительного времени", testPrompt: "в течение длительного времени", acceptedEnglishAnswers: ["over extended periods"], acceptedRussianAnswers: ["в течение длительного времени"], exampleSentence: "Some customers define agents as fully autonomous systems that operate independently [[over extended periods]], using various tools to accomplish complex tasks.", exampleTranslation: "Перевод целевого выражения: в течение длительного времени.", extraExamples: ["The device can collect readings over extended periods.", "Trust is built through collaboration over extended periods."], category: "language", wrongRussian: "не стесняйтесь, не бойтесь", clozeAnswers: ["over extended periods"], id: "ai-19" }, { english: "environmental feedback", russian: "обратная связь из окружающей среды", testPrompt: "обратная связь из окружающей среды", acceptedEnglishAnswers: ["environmental feedback"], acceptedRussianAnswers: ["обратная связь из окружающей среды"], exampleSentence: "They are typically just LLMs using tools based on [[environmental feedback]] in a loop.", exampleTranslation: "Перевод целевого выражения: обратная связь из окружающей среды.", extraExamples: ["The robot learns from environmental feedback.", "Environmental feedback helps an autonomous system adjust."], category: "agents", wrongRussian: "проверка кода на уязвимости", clozeAnswers: ["environmental feedback"], id: "ai-20" }, { english: "works well for", russian: "хорошо подходит для", testPrompt: "хорошо подходит для (глагол: w… w… for)", acceptedEnglishAnswers: ["works well for"], acceptedRussianAnswers: ["хорошо подходит для"], exampleSentence: "When to use this workflow: Routing [[works well for]] complex tasks where there are distinct categories that are better handled separately, and where classification can be handled accurately, either by an LLM or a more traditional classification model/algorithm.", exampleTranslation: "Перевод целевого выражения: хорошо подходит для.", extraExamples: ["This method works well for beginners.", "A short survey works well for quick feedback."], category: "workflow", wrongRussian: "критически важный", clozeAnswers: ["works well for"], id: "ai-21" }, { english: "on track", russian: "идёт по плану", testPrompt: "идёт по плану", acceptedEnglishAnswers: ["on track"], acceptedRussianAnswers: ["идёт по плану"], exampleSentence: 'You can add programmatic checks (see "gate” in the diagram below) on any intermediate steps to ensure that the process is still [[on track]].', exampleTranslation: "Перевод целевого выражения: идёт по плану.", extraExamples: ["The launch is still on track for Friday.", "Regular check-ins help keep the project on track."], category: "workflow", wrongRussian: "обычно работает лучше", clozeAnswers: ["on track"], id: "ai-22" }, { english: "make it tempting", russian: "создавать соблазн", testPrompt: "создавать соблазн", acceptedEnglishAnswers: ["make it tempting"], acceptedRussianAnswers: ["создавать соблазн"], exampleSentence: "They can also [[make it tempting]] to add complexity when a simpler setup would suffice.", exampleTranslation: "Перевод целевого выражения: создавать соблазн.", extraExamples: ["A discount can make it tempting to buy too much.", "Early success may make it tempting to skip testing."], category: "development", wrongRussian: "оптимизация отдельных вызовов LLM", clozeAnswers: ["make it tempting"], id: "ai-23" }, { english: "underlying", russian: "лежащие в основе", testPrompt: "лежащие в основе", acceptedEnglishAnswers: ["underlying"], acceptedRussianAnswers: ["лежащие в основе"], exampleSentence: "However, they often create extra layers of abstraction that can obscure the [[underlying]] prompts ​​and responses, making them harder to debug.", exampleTranslation: "Перевод целевого выражения: лежащие в основе.", extraExamples: ["We should investigate the underlying cause of the issue.", "The underlying assumptions may be incorrect."], category: "development", wrongRussian: "оправданный, обоснованный", clozeAnswers: ["underlying"], id: "ai-24" }, { english: "composable", russian: "комбинируемые", testPrompt: "комбинируемые", acceptedEnglishAnswers: ["composable"], acceptedRussianAnswers: ["комбинируемые"], exampleSentence: "Instead, they were building with simple, [[composable]] patterns.", exampleTranslation: "Перевод целевого выражения: комбинируемые.", extraExamples: ["These modules are composable and can be reused.", "The system uses composable components rather than one large service."], category: "language", wrongRussian: "практическое правило, эмпирическое правило", clozeAnswers: ["composable"], id: "ai-25" }, { english: "capable models", russian: "мощные модели", testPrompt: "мощные модели", acceptedEnglishAnswers: ["capable models"], acceptedRussianAnswers: ["мощные модели"], exampleSentence: "Routing easy/common questions to smaller, cost-efficient models like Claude Haiku 4.5 and hard/unusual questions to more [[capable models]] like Claude Sonnet 4.5 to optimize for best performance.", exampleTranslation: "Перевод целевого выражения: мощные модели.", extraExamples: ["More capable models can solve harder problems.", "The platform needs capable models for complex queries."], category: "workflow", wrongRussian: "маршрутизация", clozeAnswers: ["capable models"], id: "ai-26" }, { english: "clear evaluation criteria", russian: "чёткие критерии оценки", testPrompt: "чёткие критерии оценки", acceptedEnglishAnswers: ["clear evaluation criteria"], acceptedRussianAnswers: ["чёткие критерии оценки"], exampleSentence: "When to use this workflow: This workflow is particularly effective when we have [[clear evaluation criteria]], and when iterative refinement provides measurable value.", exampleTranslation: "Перевод целевого выражения: чёткие критерии оценки.", extraExamples: ["Define clear evaluation criteria before testing.", "The committee published clear evaluation criteria."], category: "agents", wrongRussian: "тем, как они выполняют задачи", clozeAnswers: ["clear evaluation criteria"], id: "ai-27" }, { english: "maximum number of iterations", russian: "максимальное количество итераций", testPrompt: "максимальное количество итераций", acceptedEnglishAnswers: ["maximum number of iterations"], acceptedRussianAnswers: ["максимальное количество итераций"], exampleSentence: "The task often terminates upon completion, but it’s also common to include stopping conditions (such as a [[maximum number of iterations]]) to maintain control.", exampleTranslation: "Перевод целевого выражения: максимальное количество итераций.", extraExamples: ["We configured a maximum number of iterations.", "A maximum number of iterations keeps costs predictable."], category: "agents", wrongRussian: "изолированные среды тестирования", clozeAnswers: ["maximum number of iterations"], id: "ai-28" }, { english: "on the other hand", russian: "с другой стороны", testPrompt: "с другой стороны", acceptedEnglishAnswers: ["on the other hand"], acceptedRussianAnswers: ["с другой стороны"], exampleSentence: "Agents, [[on the other hand]], are systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks.", exampleTranslation: "Перевод целевого выражения: с другой стороны.", extraExamples: ["The design looks elegant; on the other hand, it is expensive.", "She wants to move; on the other hand, she likes her neighborhood."], category: "language", wrongRussian: "на основе плана", clozeAnswers: ["on the other hand"], id: "ai-29" }, { english: "worked with dozens of teams", russian: "работали с десятками команд", testPrompt: "работали с десятками команд", acceptedEnglishAnswers: ["worked with dozens of teams"], acceptedRussianAnswers: ["работали с десятками команд"], exampleSentence: "Over the past year, we've [[worked with dozens of teams]] building large language model (LLM) agents across industries.", exampleTranslation: "Перевод целевого выражения: работали с десятками команд.", extraExamples: ["We have worked with dozens of teams on onboarding.", "The researchers worked with dozens of teams across Europe."], category: "language", wrongRussian: "явно", clozeAnswers: ["worked with dozens of teams"], id: "ai-30" }, { english: "accuracy", russian: "точность", testPrompt: "точность", acceptedEnglishAnswers: ["accuracy"], acceptedRussianAnswers: ["точность"], exampleSentence: "The main goal is to trade off latency for higher [[accuracy]], by making each LLM call an easier task.", exampleTranslation: "Перевод целевого выражения: точность.", extraExamples: ["We measured the accuracy of the model.", "Higher accuracy matters more than speed in this case."], category: "workflow", wrongRussian: "по мере развития LLM", clozeAnswers: ["accuracy"], id: "ai-31" }, { english: "consistently", russian: "неизменно, стабильно", testPrompt: "неизменно, стабильно", acceptedEnglishAnswers: ["consistently"], acceptedRussianAnswers: ["неизменно", "стабильно"], exampleSentence: "[[Consistently]], the most successful implementations weren't using complex frameworks or specialized libraries.", exampleTranslation: "Перевод целевого выражения: неизменно, стабильно.", extraExamples: ["She consistently delivers reports before the deadline.", "The system consistently handles a thousand requests per minute."], category: "language", wrongRussian: "условия остановки", clozeAnswers: ["Consistently"], id: "ai-32" }, { english: "encountering blockers", russian: "сталкиваясь с препятствиями", testPrompt: "сталкиваясь с препятствиями", acceptedEnglishAnswers: ["encountering blockers"], acceptedRussianAnswers: ["сталкиваясь с препятствиями"], exampleSentence: "Agents can then pause for human feedback at checkpoints or when [[encountering blockers]].", exampleTranslation: "Перевод целевого выражения: сталкиваясь с препятствиями.", extraExamples: ["When encountering blockers, ask for clarification.", "The project slowed after encountering blockers."], category: "agents", wrongRussian: "необходимо при масштабировании", clozeAnswers: ["encountering blockers"], id: "ai-33" }, { english: "evaluation and feedback", russian: "оценка и обратная связь", testPrompt: "оценка и обратная связь", acceptedEnglishAnswers: ["evaluation and feedback"], acceptedRussianAnswers: ["оценка и обратная связь"], exampleSentence: "In the evaluator-optimizer workflow, one LLM call generates a response while another provides [[evaluation and feedback]] in a loop.", exampleTranslation: "Перевод целевого выражения: оценка и обратная связь.", extraExamples: ["The manager provided evaluation and feedback after the demo.", "Regular evaluation and feedback help the team improve."], category: "agents", wrongRussian: "реализация", clozeAnswers: ["evaluation and feedback"], id: "ai-34" }, { english: "downstream", russian: "последующие процессы / последствия (как)", testPrompt: "последующие процессы / последствия (как)", acceptedEnglishAnswers: ["downstream"], acceptedRussianAnswers: ["последующие процессы / последствия (как)"], exampleSentence: "Directing different types of customer service queries (general questions, refund requests, technical support) into different [[downstream]] processes, prompts, and tools.", exampleTranslation: "Перевод целевого выражения: последующие процессы / последствия (как).", extraExamples: ["The change affected downstream services.", "We considered the downstream impact of the decision."], category: "workflow", wrongRussian: "тщательно доработанный", clozeAnswers: ["downstream"], id: "ai-35" }, { english: "parsing tools", russian: "разбор инструментов", testPrompt: "разбор инструментов", acceptedEnglishAnswers: ["parsing tools"], acceptedRussianAnswers: ["разбор инструментов"], exampleSentence: "These frameworks make it easy to get started by simplifying standard low-level tasks like calling LLMs, defining and [[parsing tools]], and chaining calls together.", exampleTranslation: "Перевод целевого выражения: разбор инструментов.", extraExamples: ["The framework simplifies parsing tools and interpreting responses.", "Parsing tools correctly is essential for automation."], category: "development", wrongRussian: "конструктор рабочих процессов", clozeAnswers: ["parsing tools"], id: "ai-36" }, { english: "well-defined tasks", russian: "чётко определённые задачи", testPrompt: "чётко определённые задачи", acceptedEnglishAnswers: ["well-defined tasks"], acceptedRussianAnswers: ["чётко определённые задачи"], exampleSentence: "When more complexity is warranted, workflows offer predictability and consistency for [[well-defined tasks]], whereas agents are the better option when flexibility and model-driven decision-making are needed at scale.", exampleTranslation: "Перевод целевого выражения: чётко определённые задачи.", extraExamples: ["Automation is useful for well-defined tasks.", "Assign well-defined tasks to each team member."], category: "language", wrongRussian: "начинающие применяться в реальных системах", clozeAnswers: ["well-defined tasks"], id: "ai-37" }, { english: "building blocks", russian: "базовые компоненты", testPrompt: "базовые компоненты", acceptedEnglishAnswers: ["building blocks"], acceptedRussianAnswers: ["базовые компоненты"], exampleSentence: "[[Building blocks]], workflows, and agents", exampleTranslation: "Перевод целевого выражения: базовые компоненты.", extraExamples: ["Use these building blocks to assemble a workflow.", "Trust and communication are building blocks of teamwork."], category: "development", wrongRussian: "фундаментальный компонент", clozeAnswers: ["Building blocks"], id: "ai-38" }, { english: "latency", russian: "задержка, время отклика", testPrompt: "задержка, время отклика", acceptedEnglishAnswers: ["latency"], acceptedRussianAnswers: ["задержка", "время отклика"], exampleSentence: "The main goal is to trade off [[latency]] for higher accuracy, by making each LLM call an easier task.", exampleTranslation: "Перевод целевого выражения: задержка, время отклика.", extraExamples: ["High latency makes video calls frustrating.", "The team reduced network latency by twenty percent."], category: "language", wrongRussian: "несколько точек зрения", clozeAnswers: ["latency"], id: "ai-39" }, { english: "align with broader requirements", russian: "соответствовать более широким требованиям", testPrompt: "соответствовать более широким требованиям", acceptedEnglishAnswers: ["align with broader requirements"], acceptedRussianAnswers: ["соответствовать более широким требованиям"], exampleSentence: "However, whereas automated testing helps verify functionality, human review remains crucial for ensuring solutions [[align with]] broader system requirements.", exampleTranslation: "Перевод целевого выражения: соответствовать более широким требованиям.", extraExamples: ["New features must align with broader requirements.", "The proposal should align with broader requirements for security."], category: "agents", wrongRussian: "последовательность шагов", clozeAnswers: ["align with", "align with broader requirements"], id: "ai-40" }, { english: "search queries", russian: "поисковые запросы", testPrompt: "поисковые запросы", acceptedEnglishAnswers: ["search queries"], acceptedRussianAnswers: ["поисковые запросы"], exampleSentence: "Our current models can actively use these capabilities—generating their own [[search queries]], selecting appropriate tools, and determining what information to retain.", exampleTranslation: "Перевод целевого выражения: поисковые запросы.", extraExamples: ["The assistant generates search queries automatically.", "Short search queries can miss important details."], category: "development", wrongRussian: "просто, понятно", clozeAnswers: ["search queries"], id: "ai-41" }, { english: "obscure", russian: "скрывать, затруднять понимание", testPrompt: "скрывать, затруднять понимание", acceptedEnglishAnswers: ["obscure"], acceptedRussianAnswers: ["скрывать", "затруднять понимание"], exampleSentence: "However, they often create extra layers of abstraction that can [[obscure]] the underlying prompts ​​and responses, making them harder to debug.", exampleTranslation: "Перевод целевого выражения: скрывать, затруднять понимание.", extraExamples: ["Too many charts can obscure the main finding.", "The error message should not obscure the next step."], category: "development", wrongRussian: "Аспекты, факторы, соображения", clozeAnswers: ["obscure"], id: "ai-42" }, { english: "vote thresholds", russian: "пороговые значения голосования", testPrompt: "пороговые значения голосования", acceptedEnglishAnswers: ["vote thresholds"], acceptedRussianAnswers: ["пороговые значения голосования"], exampleSentence: "Evaluating whether a given piece of content is inappropriate, with multiple prompts evaluating different aspects or requiring different [[vote thresholds]] to balance false positives and negatives.", exampleTranslation: "Перевод целевого выражения: пороговые значения голосования.", extraExamples: ["Higher vote thresholds reduce false alarms.", "We adjusted vote thresholds after examining the results."], category: "workflow", wrongRussian: "перетаскивание элементов", clozeAnswers: ["vote thresholds"], id: "ai-43" }, { english: "prompt chaining", russian: "последовательное связывание промптов", testPrompt: "последовательное связывание промптов", acceptedEnglishAnswers: ["prompt chaining"], acceptedRussianAnswers: ["последовательное связывание промптов"], exampleSentence: "Workflow: [[Prompt chaining]]", exampleTranslation: "Перевод целевого выражения: последовательное связывание промптов.", extraExamples: ["Prompt chaining helps break complex requests into steps.", "We compared prompt chaining with a single-call approach."], category: "workflow", wrongRussian: "сложные, многоуровневые задачи", clozeAnswers: ["Prompt chaining"], id: "ai-44" }, { english: "comprehensive information", russian: "исчерпывающая информация", testPrompt: "исчерпывающая информация", acceptedEnglishAnswers: ["comprehensive information"], acceptedRussianAnswers: ["исчерпывающая информация"], exampleSentence: "Complex search tasks that require multiple rounds of searching and analysis to gather [[comprehensive information]], where the evaluator decides whether further searches are warranted.", exampleTranslation: "Перевод целевого выражения: исчерпывающая информация.", extraExamples: ["We need comprehensive information before choosing a vendor.", "The guide provides comprehensive information on enrollment."], category: "agents", wrongRussian: "расширенная дополнительными возможностями LLM", clozeAnswers: ["comprehensive information"], id: "ai-45" }, { english: "multiple rounds of searching", russian: "несколько раундов поиска", testPrompt: "несколько раундов поиска", acceptedEnglishAnswers: ["multiple rounds of searching"], acceptedRussianAnswers: ["несколько раундов поиска"], exampleSentence: "Complex search tasks that require [[multiple rounds of searching]] and analysis to gather comprehensive information, where the evaluator decides whether further searches are warranted.", exampleTranslation: "Перевод целевого выражения: несколько раундов поиска.", extraExamples: ["The investigation required multiple rounds of searching.", "Multiple rounds of searching uncovered the missing report."], category: "agents", wrongRussian: "накапливающиеся ошибки", clozeAnswers: ["multiple rounds of searching"], id: "ai-46" }, { english: "gathering and analyzing", russian: "сбор и анализ", testPrompt: "сбор и анализ", acceptedEnglishAnswers: ["gathering and analyzing"], acceptedRussianAnswers: ["сбор и анализ"], exampleSentence: "Search tasks that involve [[gathering and analyzing]] information from multiple sources for possible relevant information.", exampleTranslation: "Перевод целевого выражения: сбор и анализ.", extraExamples: ["The job involves gathering and analyzing customer feedback.", "Gathering and analyzing data takes time."], category: "agents", wrongRussian: "разбивает задачи на части", clozeAnswers: ["gathering and analyzing"], id: "ai-47" }, { english: "core response", russian: "основной ответ", testPrompt: "основной ответ", acceptedEnglishAnswers: ["core response"], acceptedRussianAnswers: ["основной ответ"], exampleSentence: "This tends to perform better than having the same LLM call handle both guardrails and the [[core response]].", exampleTranslation: "Перевод целевого выражения: основной ответ.", extraExamples: ["The core response should address the user's question.", "Keep the core response short and add details later."], category: "workflow", wrongRussian: "жёстко задать фиксированный путь в коде", clozeAnswers: ["core response"], id: "ai-48" }, { english: "refinement", russian: "улучшение", testPrompt: "улучшение", acceptedEnglishAnswers: ["refinement"], acceptedRussianAnswers: ["улучшение"], exampleSentence: "When to use this workflow: This workflow is particularly effective when we have clear evaluation criteria, and when iterative [[refinement]] provides measurable value.", exampleTranslation: "Перевод целевого выражения: улучшение.", extraExamples: ["The draft needs another round of refinement.", "Refinement can make the output clearer."], category: "agents", wrongRussian: "экономичные модели", clozeAnswers: ["refinement"], id: "ai-49" }, { english: "trade latency and cost", russian: "жертвовать скоростью и стоимостью", testPrompt: "жертвовать скоростью и стоимостью", acceptedEnglishAnswers: ["trade latency and cost"], acceptedRussianAnswers: ["жертвовать скоростью и стоимостью"], exampleSentence: "Agentic systems often [[trade latency and cost]] for better task performance, and you should consider when this tradeoff makes sense.", exampleTranslation: "Перевод целевого выражения: жертвовать скоростью и стоимостью.", extraExamples: ["Some teams trade latency and cost for better quality.", "We cannot trade latency and cost without measuring the benefit."], category: "language", wrongRussian: "выполнение рассуждений и планирования", clozeAnswers: ["trade latency and cost"], id: "ai-50" }, { english: "reliably", russian: "Надежный, достоверный", testPrompt: "Надежный, достоверный", acceptedEnglishAnswers: ["reliably"], acceptedRussianAnswers: ["Надежный", "достоверный"], exampleSentence: "Agents are emerging in production as LLMs mature in key capabilities—understanding complex inputs, engaging in reasoning and planning, using tools [[reliably]], and recovering from errors.", exampleTranslation: "Перевод целевого выражения: надежный, достоверный.", extraExamples: ["The system must respond reliably under load.", "The backup process runs reliably every night."], category: "agents", wrongRussian: "экосистема инструментов", clozeAnswers: ["reliably"], id: "ai-51" }, { english: "simpler setup", russian: "более простая конфигурация", testPrompt: "более простая конфигурация", acceptedEnglishAnswers: ["simpler setup"], acceptedRussianAnswers: ["более простая конфигурация"], exampleSentence: "They can also make it tempting to add complexity when a [[simpler setup]] would suffice.", exampleTranslation: "Перевод целевого выражения: более простая конфигурация.", extraExamples: ["A simpler setup can be easier to maintain.", "For a prototype, a simpler setup is usually better."], category: "development", wrongRussian: "признаки того, что подходит", clozeAnswers: ["simpler setup"], id: "ai-52" }, { english: "in a loop", russian: "в цикле", testPrompt: "в цикле", acceptedEnglishAnswers: ["in a loop"], acceptedRussianAnswers: ["в цикле"], exampleSentence: "They are typically just LLMs using tools based on environmental feedback [[in a loop]].", exampleTranslation: "Перевод целевого выражения: в цикле.", extraExamples: ["The service checks results in a loop.", "They practice the same skill in a loop until it feels natural."], category: "agents", wrongRussian: "последовательность, стабильность", clozeAnswers: ["in a loop"], id: "ai-53" }, { english: "distinction", russian: "различие", testPrompt: "различие", acceptedEnglishAnswers: ["distinction"], acceptedRussianAnswers: ["различие"], exampleSentence: "At Anthropic, we categorize all these variations as agentic systems, but draw an important architectural [[distinction]] between workflows and agents:", exampleTranslation: "Перевод целевого выражения: различие.", extraExamples: ["There is an important distinction between speed and quality.", "The distinction becomes clear in the second example."], category: "language", wrongRussian: "защитные ограничения", clozeAnswers: ["distinction"], id: "ai-54" }, { english: "to accomplish", russian: "Выполнять, совершать", testPrompt: "Выполнять, совершать", acceptedEnglishAnswers: ["to accomplish"], acceptedRussianAnswers: ["Выполнять", "совершать"], exampleSentence: "Some customers define agents as fully autonomous systems that operate independently over extended periods, using various tools [[to accomplish]] complex tasks.", exampleTranslation: "Перевод целевого выражения: выполнять, совершать.", extraExamples: ["We need more time to accomplish the goal.", "This tool helps the team accomplish repetitive tasks."], category: "language", wrongRussian: "текущий подход", clozeAnswers: ["to accomplish"], id: "ai-55" }, { english: "third-party tools", russian: "сторонние инструменты", testPrompt: "сторонние инструменты", acceptedEnglishAnswers: ["third-party tools"], acceptedRussianAnswers: ["сторонние инструменты"], exampleSentence: "While there are many ways to implement these augmentations, one approach is through our recently released Model Context Protocol, which allows developers to integrate with a growing ecosystem of [[third-party tools]] with a simple client implementation.", exampleTranslation: "Перевод целевого выражения: сторонние инструменты.", extraExamples: ["The company restricts access to third-party tools.", "We connected several third-party tools to the dashboard."], category: "development", wrongRussian: "проверяет", clozeAnswers: ["third-party tools"], id: "ai-56" }, { english: "carefully craft", russian: "тщательно проектировать", testPrompt: "тщательно проектировать", acceptedEnglishAnswers: ["carefully craft"], acceptedRussianAnswers: ["тщательно проектировать"], exampleSentence: "[[Carefully craft]] your agent-computer interface (ACI) through thorough tool documentation and testing.", exampleTranslation: "Перевод целевого выражения: тщательно проектировать.", extraExamples: ["Take time to carefully craft the opening paragraph.", "We carefully craft each survey question."], category: "agents", wrongRussian: "убедиться, обеспечить", clozeAnswers: ["Carefully craft"], id: "ai-57" }, { english: "automating evals", russian: "автоматизация оценивания моделей", testPrompt: "автоматизация оценивания моделей", acceptedEnglishAnswers: ["automating evals"], acceptedRussianAnswers: ["автоматизация оценивания моделей"], exampleSentence: "[[Automating evals]] for evaluating LLM performance, where each LLM call evaluates a different aspect of the model’s performance on a given prompt.", exampleTranslation: "Перевод целевого выражения: автоматизация оценивания моделей.", extraExamples: ["Automating evals saves the research team time.", "We started automating evals after defining success metrics."], category: "workflow", wrongRussian: "характер изменения", clozeAnswers: ["Automating evals"], id: "ai-58" }, { english: "would suffice", russian: "было бы достаточно", testPrompt: "было бы достаточно", acceptedEnglishAnswers: ["would suffice"], acceptedRussianAnswers: ["было бы достаточно"], exampleSentence: "They can also make it tempting to add complexity when a simpler setup [[would suffice]].", exampleTranslation: "Перевод целевого выражения: было бы достаточно.", extraExamples: ["A brief email would suffice for this update.", "One clear example would suffice to explain the rule."], category: "development", wrongRussian: "чётко различающиеся категории", clozeAnswers: ["would suffice"], id: "ai-59" }, { english: "manifests in", russian: "проявляется в", testPrompt: "проявляется в", acceptedEnglishAnswers: ["manifests in"], acceptedRussianAnswers: ["проявляется в"], exampleSentence: "This workflow, parallelization, [[manifests in]] two key variations:", exampleTranslation: "Перевод целевого выражения: проявляется в.", extraExamples: ["The problem manifests in unexpected delays.", "Stress manifests in different ways for different people."], category: "workflow", wrongRussian: "под капотом, во внутреннем устройстве", clozeAnswers: ["manifests in"], id: "ai-60" }, { english: "toolsets", russian: "наборы инструментов", testPrompt: "наборы инструментов", acceptedEnglishAnswers: ["toolsets"], acceptedRussianAnswers: ["наборы инструментов"], exampleSentence: "It is therefore crucial to design [[toolsets]] and their documentation clearly and thoughtfully.", exampleTranslation: "Перевод целевого выражения: наборы инструментов.", extraExamples: ["Different teams need different toolsets.", "The course introduces toolsets for data analysis."], category: "agents", wrongRussian: "задачи без заранее определённого способа решения", clozeAnswers: ["toolsets"], id: "ai-61" }, { english: "articulate", russian: "чётко формулировать", testPrompt: "чётко формулировать", acceptedEnglishAnswers: ["articulate"], acceptedRussianAnswers: ["чётко формулировать"], exampleSentence: "The two signs of good fit are, first, that LLM responses can be demonstrably improved when a human [[articulates]] their feedback; and second, that the LLM can provide such feedback.", exampleTranslation: "Перевод целевого выражения: чётко формулировать.", extraExamples: ["She can articulate the problem clearly.", "It takes practice to articulate complex ideas."], category: "agents", wrongRussian: "хорошо документированный", clozeAnswers: ["articulates", "articulate"], id: "ai-62" }, { english: "tool usage", russian: "использование инструментов", testPrompt: "использование инструментов", acceptedEnglishAnswers: ["tool usage"], acceptedRussianAnswers: ["использование инструментов"], exampleSentence: "Agents, on the other hand, are systems where LLMs dynamically direct their own processes and [[tool usage]], maintaining control over how they accomplish tasks.", exampleTranslation: "Перевод целевого выражения: использование инструментов.", extraExamples: ["We monitor tool usage to understand costs.", "The policy defines acceptable tool usage."], category: "language", wrongRussian: "хорошо подходит для", clozeAnswers: ["tool usage"], id: "ai-63" }, { english: "predefined", russian: "заранее определённые", testPrompt: "заранее определённые", acceptedEnglishAnswers: ["predefined"], acceptedRussianAnswers: ["заранее определённые"], exampleSentence: "Others use the term to describe more prescriptive implementations that follow [[predefined]] workflows.", exampleTranslation: "Перевод целевого выражения: заранее определённые.", extraExamples: ["The meeting follows a predefined agenda.", "We use predefined rules for common requests."], category: "language", wrongRussian: "принятие решений самой моделью", clozeAnswers: ["predefined"], id: "ai-64" }, { english: "consider", russian: "учитывать, рассматривать", testPrompt: "учитывать, рассматривать", acceptedEnglishAnswers: ["consider"], acceptedRussianAnswers: ["учитывать", "рассматривать"], exampleSentence: "To repeat: you should [[consider]] adding complexity only when it demonstrably improves outcomes.", exampleTranslation: "Перевод целевого выражения: учитывать, рассматривать.", extraExamples: ["Please consider the impact on new users.", "We should consider two alternatives before deciding."], category: "language", wrongRussian: "удобный в поддержке", clozeAnswers: ["consider"], id: "ai-65" }, { english: "maintain", russian: "Поддерживать, обслуживать", testPrompt: "Поддерживать, обслуживать", acceptedEnglishAnswers: ["maintain"], acceptedRussianAnswers: ["Поддерживать", "обслуживать"], exampleSentence: "Agents, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage, [[maintaining]] control over how they accomplish tasks.", exampleTranslation: "Перевод целевого выражения: поддерживать, обслуживать.", extraExamples: ["We maintain the service throughout the year.", "It is difficult to maintain a large codebase without tests."], category: "language", wrongRussian: "тогда как, в то время как", clozeAnswers: ["maintaining", "maintain"], id: "ai-66" }, { english: "flag the code", russian: "помечать код как проблемный", testPrompt: "помечать код как проблемный", acceptedEnglishAnswers: ["flag the code"], acceptedRussianAnswers: ["помечать код как проблемный"], exampleSentence: "Reviewing a piece of code for vulnerabilities, where several different prompts review and [[flag the code]] if they find a problem.", exampleTranslation: "Перевод целевого выражения: помечать код как проблемный.", extraExamples: ["The scanner may flag the code as risky.", "The reviewer will flag the code if it contains a secret."], category: "workflow", wrongRussian: "всестороннее тестирование", clozeAnswers: ["flag the code"], id: "ai-67" }, { english: "retrieval", russian: "поиск и извлечение информации", testPrompt: "поиск и извлечение информации", acceptedEnglishAnswers: ["retrieval"], acceptedRussianAnswers: ["поиск и извлечение информации"], exampleSentence: "For many applications, however, optimizing single LLM calls with [[retrieval]] and in-context examples is usually enough.", exampleTranslation: "Перевод целевого выражения: поиск и извлечение информации.", extraExamples: ["Retrieval helps students recall facts.", "The app uses retrieval to find relevant documents."], category: "language", wrongRussian: "компромисс между преимуществами и недостатками", clozeAnswers: ["retrieval"], id: "ai-68" }, { english: "simultaneously", russian: "одновременно", testPrompt: "одновременно", acceptedEnglishAnswers: ["simultaneously"], acceptedRussianAnswers: ["одновременно"], exampleSentence: "LLMs can sometimes work [[simultaneously]] on a task and have their outputs aggregated programmatically.", exampleTranslation: "Перевод целевого выражения: одновременно.", extraExamples: ["Three services can run simultaneously.", "She was managing two projects simultaneously."], category: "workflow", wrongRussian: "предположение", clozeAnswers: ["simultaneously"], id: "ai-69" }, { english: "during execution", russian: "во время выполнения", testPrompt: "во время выполнения", acceptedEnglishAnswers: ["during execution"], acceptedRussianAnswers: ["во время выполнения"], exampleSentence: "[[During execution]], it's crucial for the agents to gain “ground truth” from the environment at each step (such as tool call results or code execution) to assess its progress.", exampleTranslation: "Перевод целевого выражения: во время выполнения.", extraExamples: ["We record errors during execution.", "The task failed during execution because of a timeout."], category: "agents", wrongRussian: "выполняться параллельно", clozeAnswers: ["During execution"], id: "ai-70" }, { english: "particular value", russian: "особая ценность", testPrompt: "особая ценность", acceptedEnglishAnswers: ["particular value"], acceptedRussianAnswers: ["особая ценность"], exampleSentence: "In Appendix 1 (“Agents in Practice”), we describe two domains where customers have found [[particular value]] in using these kinds of systems.", exampleTranslation: "Перевод целевого выражения: особая ценность.", extraExamples: ["The data has particular value for small businesses.", "Her experience brings particular value to this project."], category: "language", wrongRussian: "сложнее отлаживать", clozeAnswers: ["particular value"], id: "ai-71" }, { english: "fall short", russian: "оказаться недостаточным", testPrompt: "оказаться недостаточным", acceptedEnglishAnswers: ["fall short"], acceptedRussianAnswers: ["оказаться недостаточным"], exampleSentence: "Start with simple prompts, optimize them with comprehensive evaluation, and add multi-step agentic systems only when simpler solutions [[fall short]].", exampleTranslation: "Перевод целевого выражения: оказаться недостаточным.", extraExamples: ["The original plan may fall short of the target.", "A brief explanation will fall short for expert readers."], category: "agents", wrongRussian: "достоверная информация из реальной среды", clozeAnswers: ["fall short"], id: "ai-72" }, { english: "better task performance", russian: "более качественное выполнение задач", testPrompt: "более качественное выполнение задач", acceptedEnglishAnswers: ["better task performance"], acceptedRussianAnswers: ["более качественное выполнение задач"], exampleSentence: "Agentic systems often trade latency and cost for [[better task performance]], and you should consider when this tradeoff makes sense.", exampleTranslation: "Перевод целевого выражения: более качественное выполнение задач.", extraExamples: ["Clear instructions usually lead to better task performance.", "Better task performance matters more than fancy features."], category: "language", wrongRussian: "используют термин для обозначения", clozeAnswers: ["better task performance"], id: "ai-73" }, { english: "hurt performance", russian: "ухудшать производительность", testPrompt: "ухудшать производительность", acceptedEnglishAnswers: ["hurt performance"], acceptedRussianAnswers: ["ухудшать производительность"], exampleSentence: "Without this workflow, optimizing for one kind of input can [[hurt performance]] on other inputs.", exampleTranslation: "Перевод целевого выражения: ухудшать производительность.", extraExamples: ["Unnecessary animations can hurt performance.", "Large files may hurt performance on older phones."], category: "workflow", wrongRussian: "связывание вызовов в цепочку", clozeAnswers: ["hurt performance"], id: "ai-74" }, { english: "tailoring to your specific use case", russian: "адаптация под конкретный сценарий использования", testPrompt: "адаптация под конкретный сценарий использования", acceptedEnglishAnswers: ["tailoring to your specific use case"], acceptedRussianAnswers: ["адаптация под конкретный сценарий использования"], exampleSentence: "We recommend focusing on two key aspects of the implementation: [[tailoring]] these capabilities to your specific use case and ensuring they provide an easy, well-documented interface for your LLM.", exampleTranslation: "Перевод целевого выражения: адаптация под конкретный сценарий использования.", extraExamples: ["Tailoring to your specific use case matters more than adding features.", "Start by tailoring to your specific use case."], category: "development", wrongRussian: "Последующее действие / уточнение (что)", clozeAnswers: ["tailoring", "tailoring to your specific use case"], id: "ai-75" }, { english: "don't hesitate to", russian: "не стесняйтесь, не бойтесь", testPrompt: "не стесняйтесь, не бойтесь", acceptedEnglishAnswers: ["don't hesitate to"], acceptedRussianAnswers: ["не стесняйтесь", "не бойтесь"], exampleSentence: "Frameworks can help you get started quickly, but [[don't hesitate to]] reduce abstraction layers and build with basic components as you move to production.", exampleTranslation: "Перевод целевого выражения: не стесняйтесь, не бойтесь.", extraExamples: ["Don't hesitate to ask if something is unclear.", "Don't hesitate to contact support."], category: "agents", wrongRussian: "дополнительные возможности, расширения", clozeAnswers: ["don't hesitate to"], id: "ai-76" }, { english: "reviewing code for vulnerabilities", russian: "проверка кода на уязвимости", testPrompt: "проверка кода на уязвимости", acceptedEnglishAnswers: ["reviewing code for vulnerabilities"], acceptedRussianAnswers: ["проверка кода на уязвимости"], exampleSentence: "[[Reviewing]] a piece of code for vulnerabilities, where several different prompts review and flag the code if they find a problem.", exampleTranslation: "Перевод целевого выражения: проверка кода на уязвимости.", extraExamples: ["Reviewing code for vulnerabilities is part of the audit.", "We practiced reviewing code for vulnerabilities together."], category: "workflow", wrongRussian: "подробно рассмотреть", clozeAnswers: ["Reviewing", "reviewing code for vulnerabilities"], id: "ai-77" }, { english: "crucial", russian: "критически важный", testPrompt: "критически важный", acceptedEnglishAnswers: ["crucial"], acceptedRussianAnswers: ["критически важный"], exampleSentence: "It is therefore [[crucial]] to design toolsets and their documentation clearly and thoughtfully.", exampleTranslation: "Перевод целевого выражения: критически важный.", extraExamples: ["Clear communication is crucial during emergencies.", "It is crucial to verify the final result."], category: "agents", wrongRussian: "полезные замечания", clozeAnswers: ["crucial"], id: "ai-78" }, { english: "tends to perform better", russian: "обычно работает лучше", testPrompt: "обычно работает лучше", acceptedEnglishAnswers: ["tends to perform better"], acceptedRussianAnswers: ["обычно работает лучше"], exampleSentence: "This [[tends to perform better]] than having the same LLM call handle both guardrails and the core response.", exampleTranslation: "Перевод целевого выражения: обычно работает лучше.", extraExamples: ["A smaller batch tends to perform better here.", "The new version tends to perform better under load."], category: "workflow", wrongRussian: "подходящие инструменты", clozeAnswers: ["tends to perform better"], id: "ai-79" }, { english: "optimizing single LLM calls", russian: "оптимизация отдельных вызовов LLM", testPrompt: "оптимизация отдельных вызовов LLM", acceptedEnglishAnswers: ["optimizing single LLM calls"], acceptedRussianAnswers: ["оптимизация отдельных вызовов LLM"], exampleSentence: "For many applications, however, [[optimizing single LLM calls]] with retrieval and in-context examples is usually enough.", exampleTranslation: "Перевод целевого выражения: оптимизация отдельных вызовов LLM.", extraExamples: ["Optimizing single LLM calls can cut operating costs.", "Start by optimizing single LLM calls before adding agents."], category: "language", wrongRussian: "уловить с первого раза", clozeAnswers: ["optimizing single LLM calls"], id: "ai-80" }, { english: "warranted", russian: "оправданный, обоснованный", testPrompt: "оправданный, обоснованный", acceptedEnglishAnswers: ["warranted"], acceptedRussianAnswers: ["оправданный", "обоснованный"], exampleSentence: "Complex search tasks that require multiple rounds of searching and analysis to gather comprehensive information, where the evaluator decides whether further searches are [[warranted]].", exampleTranslation: "Перевод целевого выражения: оправданный, обоснованный.", extraExamples: ["A larger budget is warranted by the new requirements.", "Further investigation is warranted after the incident."], category: "language", wrongRussian: "заранее заданная логика, жёсткие предписания", clozeAnswers: ["warranted"], id: "ai-81" }, { english: "rule of thumb", russian: "практическое правило, эмпирическое правило", testPrompt: "практическое правило, эмпирическое правило", acceptedEnglishAnswers: ["rule of thumb"], acceptedRussianAnswers: ["практическое правило", "эмпирическое правило"], exampleSentence: "One [[rule of thumb]] is to think about how much effort goes into human-computer interfaces (HCI), and plan to invest just as much effort in creating good agent-computer interfaces (ACI).", exampleTranslation: "Перевод целевого выражения: практическое правило, эмпирическое правило.", extraExamples: ["As a rule of thumb, test before deploying.", "A useful rule of thumb is to keep instructions short."], category: "agents", wrongRussian: "разделение ответственности", clozeAnswers: ["rule of thumb"], id: "ai-82" }, { english: "routing", russian: "маршрутизация", testPrompt: "маршрутизация", acceptedEnglishAnswers: ["routing"], acceptedRussianAnswers: ["маршрутизация"], exampleSentence: "Workflow: [[Routing]]", exampleTranslation: "Перевод целевого выражения: маршрутизация.", extraExamples: ["Routing sends each request to the right department.", "Efficient routing reduces delivery time."], category: "workflow", wrongRussian: "определённый уровень доверия", clozeAnswers: ["Routing"], id: "ai-83" }, { english: "how they accomplish tasks", russian: "тем, как они выполняют задачи", testPrompt: "тем, как они выполняют задачи", acceptedEnglishAnswers: ["how they accomplish tasks"], acceptedRussianAnswers: ["тем", "как они выполняют задачи"], exampleSentence: "Agents, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage, maintaining control over [[how they accomplish tasks]].", exampleTranslation: "Перевод целевого выражения: тем, как они выполняют задачи.", extraExamples: ["We evaluate how they accomplish tasks, not just their final answers.", "Ask employees how they accomplish tasks during a busy shift."], category: "language", wrongRussian: "предполагать", clozeAnswers: ["how they accomplish tasks"], id: "ai-84" }, { english: "sandboxed environments", russian: "изолированные среды тестирования", testPrompt: "изолированные среды тестирования", acceptedEnglishAnswers: ["sandboxed environments"], acceptedRussianAnswers: ["изолированные среды тестирования"], exampleSentence: "We recommend extensive testing in [[sandboxed environments]], along with the appropriate guardrails.", exampleTranslation: "Перевод целевого выражения: изолированные среды тестирования.", extraExamples: ["We run untrusted code in sandboxed environments.", "Students experiment in sandboxed environments."], category: "agents", wrongRussian: "в течение длительного времени", clozeAnswers: ["sandboxed environments"], id: "ai-85" }, { english: "based on the outline", russian: "на основе плана", testPrompt: "на основе плана", acceptedEnglishAnswers: ["based on the outline"], acceptedRussianAnswers: ["на основе плана"], exampleSentence: "Writing an outline of a document, checking that the outline meets certain criteria, then writing the document [[based on the outline]].", exampleTranslation: "Перевод целевого выражения: на основе плана.", extraExamples: ["She wrote the article based on the outline.", "The workshop was planned based on the outline."], category: "workflow", wrongRussian: "обратная связь из окружающей среды", clozeAnswers: ["based on the outline"], id: "ai-86" }, { english: "explicitly", russian: "явно", testPrompt: "явно", acceptedEnglishAnswers: ["explicitly"], acceptedRussianAnswers: ["явно"], exampleSentence: "Prioritize transparency by [[explicitly]] showing the agent’s planning steps.", exampleTranslation: "Перевод целевого выражения: явно.", extraExamples: ["Please state your assumptions explicitly.", "The contract explicitly defines the responsibilities."], category: "agents", wrongRussian: "хорошо подходит для", clozeAnswers: ["explicitly"], id: "ai-87" }, { english: "as LLMs mature", russian: "по мере развития LLM", testPrompt: "по мере развития LLM", acceptedEnglishAnswers: ["as LLMs mature"], acceptedRussianAnswers: ["по мере развития LLM"], exampleSentence: "Agents are emerging in production [[as LLMs mature]] in key capabilities—understanding complex inputs, engaging in reasoning and planning, using tools reliably, and recovering from errors.", exampleTranslation: "Перевод целевого выражения: по мере развития LLM.", extraExamples: ["As LLMs mature, developers can delegate harder tasks.", "Safety requirements evolve as LLMs mature."], category: "agents", wrongRussian: "идёт по плану", clozeAnswers: ["as LLMs mature"], id: "ai-88" }, { english: "stopping conditions", russian: "условия остановки", testPrompt: "условия остановки", acceptedEnglishAnswers: ["stopping conditions"], acceptedRussianAnswers: ["условия остановки"], exampleSentence: "The task often terminates upon completion, but it’s also common to include [[stopping conditions]] (such as a maximum number of iterations) to maintain control.", exampleTranslation: "Перевод целевого выражения: условия остановки.", extraExamples: ["Clear stopping conditions prevent endless retries.", "Set stopping conditions before running the experiment."], category: "agents", wrongRussian: "создавать соблазн", clozeAnswers: ["stopping conditions"], id: "ai-89" }, { english: "needed at scale", russian: "необходимо при масштабировании", testPrompt: "необходимо при масштабировании", acceptedEnglishAnswers: ["needed at scale"], acceptedRussianAnswers: ["необходимо при масштабировании"], exampleSentence: "When more complexity is warranted, workflows offer predictability and consistency for well-defined tasks, whereas agents are the better option when flexibility and model-driven decision-making are [[needed at scale]].", exampleTranslation: "Перевод целевого выражения: необходимо при масштабировании.", extraExamples: ["Stronger monitoring is needed at scale.", "Manual reviews become too expensive when needed at scale."], category: "language", wrongRussian: "лежащие в основе", clozeAnswers: ["needed at scale"], id: "ai-90" }, { english: "implementation", russian: "реализация", testPrompt: "реализация", acceptedEnglishAnswers: ["implementation"], acceptedRussianAnswers: ["реализация"], exampleSentence: "Consistently, the most successful [[implementations]] weren't using complex frameworks or specialized libraries.", exampleTranslation: "Перевод целевого выражения: реализация.", extraExamples: ["The implementation took longer than expected.", "We reviewed the implementation before launch."], category: "language", wrongRussian: "комбинируемые", clozeAnswers: ["implementations", "implementation"], id: "ai-91" }, { english: "polished", russian: "тщательно доработанный", testPrompt: "тщательно доработанный", acceptedEnglishAnswers: ["polished"], acceptedRussianAnswers: ["тщательно доработанный"], exampleSentence: "This is analogous to the iterative writing process a human writer might go through when producing a [[polished]] document.", exampleTranslation: "Перевод целевого выражения: тщательно доработанный.", extraExamples: ["The report looks polished and professional.", "We need a polished presentation for the meeting."], category: "agents", wrongRussian: "мощные модели", clozeAnswers: ["polished"], id: "ai-92" }, { english: "workflow builder", russian: "конструктор рабочих процессов", testPrompt: "конструктор рабочих процессов", acceptedEnglishAnswers: ["workflow builder"], acceptedRussianAnswers: ["конструктор рабочих процессов"], exampleSentence: "Rivet, a drag and drop GUI LLM [[workflow builder]]; and", exampleTranslation: "Перевод целевого выражения: конструктор рабочих процессов.", extraExamples: ["The workflow builder lets employees automate approvals.", "A visual workflow builder can simplify onboarding."], category: "development", wrongRussian: "чёткие критерии оценки", clozeAnswers: ["workflow builder"], id: "ai-93" }, { english: "emerging in production", russian: "начинающие применяться в реальных системах", testPrompt: "начинающие применяться в реальных системах", acceptedEnglishAnswers: ["emerging in production"], acceptedRussianAnswers: ["начинающие применяться в реальных системах"], exampleSentence: "Agents are [[emerging in production]] as LLMs mature in key capabilities—understanding complex inputs, engaging in reasoning and planning, using tools reliably, and recovering from errors.", exampleTranslation: "Перевод целевого выражения: начинающие применяться в реальных системах.", extraExamples: ["The technology is emerging in production at several banks.", "This practice is emerging in production across our industry."], category: "agents", wrongRussian: "максимальное количество итераций", clozeAnswers: ["emerging in production"], id: "ai-94" }, { english: "foundational building block", russian: "фундаментальный компонент", testPrompt: "фундаментальный компонент", acceptedEnglishAnswers: ["foundational building block"], acceptedRussianAnswers: ["фундаментальный компонент"], exampleSentence: "We'll start with our [[foundational building block]]—the augmented LLM—and progressively increase complexity, from simple compositional workflows to autonomous agents.", exampleTranslation: "Перевод целевого выражения: фундаментальный компонент.", extraExamples: ["A reliable database is a foundational building block.", "The API acts as a foundational building block for the product."], category: "development", wrongRussian: "с другой стороны", clozeAnswers: ["foundational building block"], id: "ai-95" }, { english: "multiple perspectives", russian: "несколько точек зрения", testPrompt: "несколько точек зрения", acceptedEnglishAnswers: ["multiple perspectives"], acceptedRussianAnswers: ["несколько точек зрения"], exampleSentence: "When to use this workflow: Parallelization is effective when the divided subtasks can be parallelized for speed, or when [[multiple perspectives]] or attempts are needed for higher confidence results.", exampleTranslation: "Перевод целевого выражения: несколько точек зрения.", extraExamples: ["We need multiple perspectives to understand the issue.", "The report combines multiple perspectives on the market."], category: "workflow", wrongRussian: "работали с десятками команд", clozeAnswers: ["multiple perspectives"], id: "ai-96" }, { english: "a sequence of steps", russian: "последовательность шагов", testPrompt: "последовательность шагов", acceptedEnglishAnswers: ["a sequence of steps"], acceptedRussianAnswers: ["последовательность шагов"], exampleSentence: "Prompt chaining decomposes a task into [[a sequence of steps]], where each LLM call processes the output of the previous one.", exampleTranslation: "Перевод целевого выражения: последовательность шагов.", extraExamples: ["The tutorial follows a sequence of steps.", "Please document the sequence of steps you took."], category: "workflow", wrongRussian: "точность", clozeAnswers: ["a sequence of steps"], id: "ai-97" }, { english: "straightforward", russian: "просто, понятно", testPrompt: "просто, понятно", acceptedEnglishAnswers: ["straightforward"], acceptedRussianAnswers: ["просто", "понятно"], exampleSentence: "Agents can handle sophisticated tasks, but their implementation is often [[straightforward]].", exampleTranslation: "Перевод целевого выражения: просто, понятно.", extraExamples: ["The instructions are straightforward.", "We need a straightforward solution to this problem."], category: "agents", wrongRussian: "неизменно, стабильно", clozeAnswers: ["straightforward"], id: "ai-98" }, { english: "consideration", russian: "Аспекты, факторы, соображения", testPrompt: "Аспекты, факторы, соображения", acceptedEnglishAnswers: ["consideration"], acceptedRussianAnswers: ["Аспекты", "факторы", "соображения"], exampleSentence: "For complex tasks with multiple [[considerations]], LLMs generally perform better when each consideration is handled by a separate LLM call, allowing focused attention on each specific aspect.", exampleTranslation: "Перевод целевого выражения: аспекты, факторы, соображения.", extraExamples: ["Cost is an important consideration.", "Security considerations should shape the architecture."], category: "workflow", wrongRussian: "сталкиваясь с препятствиями", clozeAnswers: ["considerations", "consideration"], id: "ai-99" }, { english: "drag-and-drop", russian: "перетаскивание элементов", testPrompt: "перетаскивание элементов", acceptedEnglishAnswers: ["drag-and-drop"], acceptedRussianAnswers: ["перетаскивание элементов"], exampleSentence: "Rivet, a [[drag and drop]] GUI LLM workflow builder; and", exampleTranslation: "Перевод целевого выражения: перетаскивание элементов.", extraExamples: ["The drag-and-drop editor works without coding.", "She built the dashboard with a drag-and-drop interface."], category: "development", wrongRussian: "оценка и обратная связь", clozeAnswers: ["drag and drop", "drag-and-drop"], id: "ai-100" }, { english: "sophisticated tasks", russian: "сложные, многоуровневые задачи", testPrompt: "сложные, многоуровневые задачи", acceptedEnglishAnswers: ["sophisticated tasks"], acceptedRussianAnswers: ["сложные", "многоуровневые задачи"], exampleSentence: "Agents can handle [[sophisticated tasks]], but their implementation is often straightforward.", exampleTranslation: "Перевод целевого выражения: сложные, многоуровневые задачи.", extraExamples: ["The platform can handle sophisticated tasks.", "Sophisticated tasks require careful evaluation."], category: "agents", wrongRussian: "последующие процессы / последствия (как)", clozeAnswers: ["sophisticated tasks"], id: "ai-101" }, { english: "augmented LLM", russian: "расширенная дополнительными возможностями LLM", testPrompt: "расширенная дополнительными возможностями LLM", acceptedEnglishAnswers: ["augmented LLM"], acceptedRussianAnswers: ["расширенная дополнительными возможностями LLM"], exampleSentence: "The [[augmented LLM]]", exampleTranslation: "Перевод целевого выражения: расширенная дополнительными возможностями LLM.", extraExamples: ["An augmented LLM can search company documents.", "We tested an augmented LLM with external tools."], category: "development", wrongRussian: "разбор инструментов", clozeAnswers: ["augmented LLM"], id: "ai-102" }, { english: "compounding errors", russian: "накапливающиеся ошибки", testPrompt: "накапливающиеся ошибки", acceptedEnglishAnswers: ["compounding errors"], acceptedRussianAnswers: ["накапливающиеся ошибки"], exampleSentence: "The autonomous nature of agents means higher costs, and the potential for [[compounding errors]].", exampleTranslation: "Перевод целевого выражения: накапливающиеся ошибки.", extraExamples: ["Small mistakes can lead to compounding errors.", "Compounding errors make long workflows risky."], category: "agents", wrongRussian: "чётко определённые задачи", clozeAnswers: ["compounding errors"], id: "ai-103" }, { english: "breaks down tasks", russian: "разбивает задачи на части", testPrompt: "разбивает задачи на части", acceptedEnglishAnswers: ["breaks down tasks"], acceptedRussianAnswers: ["разбивает задачи на части"], exampleSentence: "In the orchestrator-workers workflow, a central LLM dynamically [[breaks down tasks]], delegates them to worker LLMs, and synthesizes their results.", exampleTranslation: "Перевод целевого выражения: разбивает задачи на части.", extraExamples: ["The project manager breaks down tasks for the team.", "The planner breaks down tasks into manageable steps."], category: "agents", wrongRussian: "базовые компоненты", clozeAnswers: ["breaks down tasks"], id: "ai-104" }, { english: "hardcode a fixed path", russian: "жёстко задать фиксированный путь в коде", testPrompt: "жёстко задать фиксированный путь в коде", acceptedEnglishAnswers: ["hardcode a fixed path"], acceptedRussianAnswers: ["жёстко задать фиксированный путь в коде"], exampleSentence: "When to use agents: Agents can be used for open-ended problems where it’s difficult or impossible to predict the required number of steps, and where you can’t [[hardcode a fixed path]].", exampleTranslation: "Перевод целевого выражения: жёстко задать фиксированный путь в коде.", extraExamples: ["Don't hardcode a fixed path if requirements keep changing.", "We decided to hardcode a fixed path for this small experiment."], category: "agents", wrongRussian: "задержка, время отклика", clozeAnswers: ["hardcode a fixed path"], id: "ai-105" }, { english: "cost-efficient models", russian: "экономичные модели", testPrompt: "экономичные модели", acceptedEnglishAnswers: ["cost-efficient models"], acceptedRussianAnswers: ["экономичные модели"], exampleSentence: "Routing easy/common questions to smaller, [[cost-efficient models]] like Claude Haiku 4.5 and hard/unusual questions to more capable models like Claude Sonnet 4.5 to optimize for best performance.", exampleTranslation: "Перевод целевого выражения: экономичные модели.", extraExamples: ["Cost-efficient models can handle simple requests.", "We use cost-efficient models for basic classification."], category: "workflow", wrongRussian: "соответствовать более широким требованиям", clozeAnswers: ["cost-efficient models"], id: "ai-106" }, { english: "engaging in reasoning and planning", russian: "выполнение рассуждений и планирования", testPrompt: "выполнение рассуждений и планирования", acceptedEnglishAnswers: ["engaging in reasoning and planning"], acceptedRussianAnswers: ["выполнение рассуждений и планирования"], exampleSentence: "Agents are emerging in production as LLMs mature in key capabilities—understanding complex inputs, [[engaging in reasoning and planning]], using tools reliably, and recovering from errors.", exampleTranslation: "Перевод целевого выражения: выполнение рассуждений и планирования.", extraExamples: ["Engaging in reasoning and planning requires clear goals.", "The agent spent several steps engaging in reasoning and planning."], category: "agents", wrongRussian: "поисковые запросы", clozeAnswers: ["engaging in reasoning and planning"], id: "ai-107" }, { english: "tooling landscape", russian: "экосистема инструментов", testPrompt: "экосистема инструментов", acceptedEnglishAnswers: ["tooling landscape"], acceptedRussianAnswers: ["экосистема инструментов"], exampleSentence: "Note: Much of the [[tooling landscape]] described in this post has changed since December 2024.", exampleTranslation: "Перевод целевого выражения: экосистема инструментов.", extraExamples: ["The tooling landscape for mobile apps changes quickly.", "We compared the tooling landscape before choosing a platform."], category: "language", wrongRussian: "скрывать, затруднять понимание", clozeAnswers: ["tooling landscape"], id: "ai-108" }, { english: "signs of good fit", russian: "признаки того, что подходит", testPrompt: "признаки того, что подходит", acceptedEnglishAnswers: ["signs of good fit"], acceptedRussianAnswers: ["признаки того", "что подходит"], exampleSentence: "The two [[signs of good fit]] are, first, that LLM responses can be demonstrably improved when a human articulates their feedback; and second, that the LLM can provide such feedback.", exampleTranslation: "Перевод целевого выражения: признаки того, что подходит.", extraExamples: ["Fast adoption and low error rates are signs of good fit.", "We looked for signs of good fit before expanding the program."], category: "agents", wrongRussian: "пороговые значения голосования", clozeAnswers: ["signs of good fit"], id: "ai-109" }, { english: "consistency", russian: "последовательность, стабильность", testPrompt: "последовательность, стабильность", acceptedEnglishAnswers: ["consistency"], acceptedRussianAnswers: ["последовательность", "стабильность"], exampleSentence: "When more complexity is warranted, workflows offer predictability and [[consistency]] for well-defined tasks, whereas agents are the better option when flexibility and model-driven decision-making are needed at scale.", exampleTranslation: "Перевод целевого выражения: последовательность, стабильность.", extraExamples: ["Consistency matters when teaching beginners.", "The interface needs consistency across screens."], category: "language", wrongRussian: "последовательное связывание промптов", clozeAnswers: ["consistency"], id: "ai-110" }, { english: "guardrails", russian: "защитные ограничения", testPrompt: "защитные ограничения", acceptedEnglishAnswers: ["guardrails"], acceptedRussianAnswers: ["защитные ограничения"], exampleSentence: "We recommend extensive testing in sandboxed environments, along with the appropriate [[guardrails]].", exampleTranslation: "Перевод целевого выражения: защитные ограничения.", extraExamples: ["We added guardrails to prevent unsafe actions.", "Clear guardrails help teams experiment responsibly."], category: "agents", wrongRussian: "исчерпывающая информация", clozeAnswers: ["guardrails"], id: "ai-111" }, { english: "current approach", russian: "текущий подход", testPrompt: "текущий подход", acceptedEnglishAnswers: ["current approach"], acceptedRussianAnswers: ["текущий подход"], exampleSentence: "For our [[current approach]], see how we built Claude Managed Agents and the Managed Agents documentation.", exampleTranslation: "Перевод целевого выражения: текущий подход.", extraExamples: ["Our current approach is to ship small updates weekly.", "The current approach works for a team of five."], category: "language", wrongRussian: "несколько раундов поиска", clozeAnswers: ["current approach"], id: "ai-112" }, { english: "screens", russian: "проверяет", testPrompt: "проверяет", acceptedEnglishAnswers: ["screens"], acceptedRussianAnswers: ["проверяет"], exampleSentence: "Implementing guardrails where one model instance processes user queries while another [[screens]] them for inappropriate content or requests.", exampleTranslation: "Перевод целевого выражения: проверяет.", extraExamples: ["The filter screens applications before review.", "A clinician screens patients for symptoms."], category: "workflow", wrongRussian: "сбор и анализ", clozeAnswers: ["screens"], id: "ai-113" }, { english: "ensure", russian: "убедиться, обеспечить", testPrompt: "убедиться, обеспечить", acceptedEnglishAnswers: ["ensure"], acceptedRussianAnswers: ["убедиться", "обеспечить"], exampleSentence: "If you do use a framework, [[ensure]] you understand the underlying code.", exampleTranslation: "Перевод целевого выражения: убедиться, обеспечить.", extraExamples: ["Ensure that the document is shared with the team.", "We need to ensure consistent quality."], category: "development", wrongRussian: "основной ответ", clozeAnswers: ["ensure"], id: "ai-114" }, { english: "the nature of the change", russian: "характер изменения", testPrompt: "характер изменения", acceptedEnglishAnswers: ["the nature of the change"], acceptedRussianAnswers: ["характер изменения"], exampleSentence: "When to use this workflow: This workflow is well-suited for complex tasks where you can’t predict the subtasks needed (in coding, for example, the number of files that need to be changed and [[the nature of the change]] in each file likely depend on the task).", exampleTranslation: "Перевод целевого выражения: характер изменения.", extraExamples: ["The nature of the change determines the testing effort.", "Explain the nature of the change in your request."], category: "agents", wrongRussian: "улучшение", clozeAnswers: ["the nature of the change"], id: "ai-115" }, { english: "distinct categories", russian: "чётко различающиеся категории", testPrompt: "чётко различающиеся категории", acceptedEnglishAnswers: ["distinct categories"], acceptedRussianAnswers: ["чётко различающиеся категории"], exampleSentence: "When to use this workflow: Routing works well for complex tasks where there are [[distinct categories]] that are better handled separately, and where classification can be handled accurately, either by an LLM or a more traditional classification model/algorithm.", exampleTranslation: "Перевод целевого выражения: чётко различающиеся категории.", extraExamples: ["The data falls into distinct categories.", "We created distinct categories for customer issues."], category: "workflow", wrongRussian: "жертвовать скоростью и стоимостью", clozeAnswers: ["distinct categories"], id: "ai-116" }, { english: "under the hood", russian: "под капотом, во внутреннем устройстве", testPrompt: "под капотом, во внутреннем устройстве", acceptedEnglishAnswers: ["under the hood"], acceptedRussianAnswers: ["под капотом", "во внутреннем устройстве"], exampleSentence: "Incorrect assumptions about what's [[under the hood]] are a common source of customer error.", exampleTranslation: "Перевод целевого выражения: под капотом, во внутреннем устройстве.", extraExamples: ["I want to know what happens under the hood.", "The tool looks simple, but a lot happens under the hood."], category: "development", wrongRussian: "Надежный, достоверный", clozeAnswers: ["under the hood"], id: "ai-117" }, { english: "open-ended problems", russian: "задачи без заранее определённого способа решения", testPrompt: "задачи без заранее определённого способа решения", acceptedEnglishAnswers: ["open-ended problems"], acceptedRussianAnswers: ["задачи без заранее определённого способа решения"], exampleSentence: "When to use agents: Agents can be used for [[open-ended problems]] where it’s difficult or impossible to predict the required number of steps, and where you can’t hardcode a fixed path.", exampleTranslation: "Перевод целевого выражения: задачи без заранее определённого способа решения.", extraExamples: ["Open-ended problems allow more than one valid answer.", "Students discussed open-ended problems in class."], category: "agents", wrongRussian: "более простая конфигурация", clozeAnswers: ["open-ended problems"], id: "ai-118" }, { english: "well-documented", russian: "хорошо документированный", testPrompt: "хорошо документированный", acceptedEnglishAnswers: ["well-documented"], acceptedRussianAnswers: ["хорошо документированный"], exampleSentence: "We recommend focusing on two key aspects of the implementation: tailoring these capabilities to your specific use case and ensuring they provide an easy, [[well-documented]] interface for your LLM.", exampleTranslation: "Перевод целевого выражения: хорошо документированный.", extraExamples: ["The API is well-documented and easy to integrate.", "We prefer a well-documented process over informal instructions."], category: "development", wrongRussian: "в цикле", clozeAnswers: ["well-documented"], id: "ai-119" }, { english: "well-suited for", russian: "хорошо подходит для", testPrompt: "хорошо подходит для (прилагательное: w…-s… for)", acceptedEnglishAnswers: ["well-suited for"], acceptedRussianAnswers: ["хорошо подходит для"], exampleSentence: "When to use this workflow: This workflow is [[well-suited for]] complex tasks where you can’t predict the subtasks needed (in coding, for example, the number of files that need to be changed and the nature of the change in each file likely depend on the task).", exampleTranslation: "Перевод целевого выражения: хорошо подходит для.", extraExamples: ["This strategy is well-suited for iterative design.", "Remote work is well-suited for people who need flexibility."], category: "agents", wrongRussian: "различие", clozeAnswers: ["well-suited for"], id: "ai-120" }, { english: "model-driven decision-making", russian: "принятие решений самой моделью", testPrompt: "принятие решений самой моделью", acceptedEnglishAnswers: ["model-driven decision-making"], acceptedRussianAnswers: ["принятие решений самой моделью"], exampleSentence: "When more complexity is warranted, workflows offer predictability and consistency for well-defined tasks, whereas agents are the better option when flexibility and [[model-driven decision-making]] are needed at scale.", exampleTranslation: "Перевод целевого выражения: принятие решений самой моделью.", extraExamples: ["Model-driven decision-making can adapt to changing inputs.", "We need to audit model-driven decision-making in sensitive workflows."], category: "language", wrongRussian: "Выполнять, совершать", clozeAnswers: ["model-driven decision-making"], id: "ai-121" }, { english: "maintainable", russian: "удобный в поддержке", testPrompt: "удобный в поддержке", acceptedEnglishAnswers: ["maintainable"], acceptedRussianAnswers: ["удобный в поддержке"], exampleSentence: "By following these principles, you can create agents that are not only powerful but also reliable, [[maintainable]], and trusted by their users.", exampleTranslation: "Перевод целевого выражения: удобный в поддержке.", extraExamples: ["The new code is easier to read and maintainable.", "We need a maintainable solution that future teams can understand."], category: "agents", wrongRussian: "сторонние инструменты", clozeAnswers: ["maintainable"], id: "ai-122" }, { english: "whereas", russian: "тогда как, в то время как", testPrompt: "тогда как, в то время как", acceptedEnglishAnswers: ["whereas"], acceptedRussianAnswers: ["тогда как", "в то время как"], exampleSentence: "However, [[whereas]] automated testing helps verify functionality, human review remains crucial for ensuring solutions align with broader system requirements.", exampleTranslation: "Перевод целевого выражения: тогда как, в то время как.", extraExamples: ["The first option is cheaper, whereas the second is faster.", "She enjoys research, whereas her colleague prefers design."], category: "language", wrongRussian: "тщательно проектировать", clozeAnswers: ["whereas"], id: "ai-123" }] };

  // src/content/index.js
  var CONTENT_VERSION = "2026.11.22-it1", COURSE = [
    { n: 1, id: "tenses", title: "Времена и aspect" },
    { n: 2, id: "irregular", title: "Неправильные глаголы" },
    { n: 3, id: "modals", title: "Модальные глаголы" },
    { n: 4, id: "conditionals", title: "Conditionals" },
    { n: 5, id: "passive", title: "Passive Voice" },
    { n: 6, id: "gerund", title: "Gerund / Infinitive" },
    { n: 7, id: "articles", title: "Articles / Determiners" },
    { n: 8, id: "prepositions", title: "Prepositions" },
    { n: 9, id: "reported", title: "Reported Speech" },
    { n: 10, id: "relative", title: "Relative Clauses" },
    { n: 11, id: "structure", title: "Sentence Structure" },
    { n: 12, id: "linking", title: "Linking Words" },
    { n: 13, id: "phrasal", title: "Phrasal Verbs" },
    { n: 14, id: "collocations", title: "Collocations" },
    { n: 15, id: "wordform", title: "Word Formation" },
    { n: 16, id: "quantifiers", title: "Quantifiers / Comparison" },
    { n: 17, id: "advanced", title: "Advanced Grammar" },
    { n: 18, id: "register", title: "Register / Nuance" }
  ], BLOCKS = [b01_tenses_default, b02_irregular_default, b03_modals_default, b04_conditionals_default], BLOCK_BY_ID = Object.fromEntries(BLOCKS.map((b) => [b.id, b])), CASES = CASES_A.concat(CASES_B), QUESTIONS = BLOCKS.flatMap((b) => b.questions).concat(CASES), Q_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q])), LESSON_BY_ID = Object.fromEntries(BLOCKS.flatMap((b) => b.lessons.map((l) => [l.id, Object.assign({ module: b.id }, l)]))), CASE_FORMATS = [
    { type: "single", title: "Case-Based Single Choice" },
    { type: "multi", title: "Case-Based Multiple Choice" },
    { type: "match", title: "Matching / Categorization" },
    { type: "order", title: "Ordering / Sequencing" },
    { type: "fix", title: "Error Debugging / Hotspot" },
    { type: "branch", title: "Branching Scenario" }
  ];
  function sets(prefix, words, size = 50) {
    let out = [];
    for (let i = 0; i < words.length; i += size) out.push({ id: "".concat(prefix, "-").concat(out.length + 1), from: i + 1, to: Math.min(words.length, i + size), words: words.slice(i, i + size) });
    return out;
  }
  var DICTS = [
    { id: "general", title: "General 200", short: "200 частых глаголов", words: GENERAL, sets: sets("general", GENERAL), note: "Список составлен вручную (curated high-frequency), а не выгружен из частотного корпуса." },
    { id: "business", title: "Business 100", short: "100 деловых глаголов", words: BUSINESS, sets: sets("business", BUSINESS) },
    { id: "irregular", title: "Irregular 120", short: "120 неправильных глаголов", words: IRREGULAR, sets: sets("irr", IRREGULAR) },
    { id: "agents", title: "AI Agents 123", short: "Исходный словарь из vocab-app", words: AGENTS.words, sets: [{ id: "agents", from: 1, to: AGENTS.words.length, words: AGENTS.words }], legacyKey: "cvt:" + AGENTS.id + ":v1" }
  ], DICT_BY_ID = Object.fromEntries(DICTS.map((d) => [d.id, d])), SET_BY_ID = Object.fromEntries(DICTS.flatMap((d) => d.sets.map((s) => [s.id, Object.assign({ dict: d.id }, s)])));
  function testDefs() {
    let defs = [];
    BLOCKS.forEach((b) => {
      let bp = b.blueprint;
      defs.push({
        id: "block:" + b.id,
        kind: "block",
        module: b.id,
        title: "Контрольная: ".concat(b.title),
        size: bp.size,
        parts: [
          { n: bp.theory, pool: b.questions.filter((q) => q.kind === "theory"), k1: "sub", k2: "diff" },
          ...bp.drills ? [{ n: bp.drills, pool: b.questions.filter((q) => q.drill), k1: "drill", k2: "verb" }] : [],
          { n: bp.size - bp.theory - (bp.drills || 0), pool: b.questions.filter((q) => q.kind === "practice" && !q.drill), k1: "sub", k2: "type" }
        ]
      });
    });
    let theory = BLOCKS.flatMap((b) => b.questions.filter((q) => q.kind === "theory")), tSize = Math.min(60, Math.max(40, Math.floor(theory.length / 2)));
    defs.push({
      id: "theory",
      kind: "theory",
      title: "Theory Check: итоговый тест по теории",
      size: tSize,
      parts: [{ n: tSize, pool: theory, k1: "module", k2: "sub", minEach: 6 }]
    });
    let cSize = Math.min(40, Math.floor(CASES.length / 2));
    defs.push({
      id: "cases",
      kind: "cases",
      title: "Контрольная Case Lab",
      size: cSize,
      parts: [{ n: cSize, pool: CASES, k1: "type", k2: "module", minEach: 3 }]
    });
    let practice5 = BLOCKS.flatMap((b) => b.questions.filter((q) => q.kind === "practice" && !q.drill));
    return defs.push({
      id: "mixed",
      kind: "mixed",
      title: "Смешанный экзамен B2 → C1",
      size: 40,
      parts: [{ n: 8, pool: theory, k1: "module", k2: "sub" }, { n: 22, pool: practice5, k1: "module", k2: "sub" }, { n: 10, pool: CASES, k1: "type", k2: "module" }]
    }), defs;
  }
  var TESTS = testDefs(), TEST_BY_ID = Object.fromEntries(TESTS.map((t) => [t.id, t]));

  // src/engine/util.js
  var norm = (s) => (s || "").toLowerCase().normalize("NFKC").replace(/[\u2010-\u2015\u2212]/g, "-").replace(/[\u2018\u2019`´]/g, "'").replace(/-/g, " ").replace(/\s+/g, " ").trim().replace(/[.!?,;:]+$/, "").trim(), accepts = (list, input) => {
    let n = norm(input);
    return n.length > 0 && (list || []).some((a) => norm(a) === n);
  };
  var shuffle = (arr, rng = Math.random) => {
    let a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      let j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, uid = (p2 = "id") => p2 + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8), dayKey = (ts) => {
    let d = new Date(ts);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  };
  function isoWeek(ts) {
    let d = new Date(ts), t = new Date(d.getFullYear(), d.getMonth(), d.getDate()), day = (t.getDay() + 6) % 7;
    t.setDate(t.getDate() - day + 3);
    let firstThu = new Date(t.getFullYear(), 0, 4), week = 1 + Math.round(((t - firstThu) / 864e5 - 3 + (firstThu.getDay() + 6) % 7) / 7);
    return t.getFullYear() + "-W" + String(week).padStart(2, "0");
  }
  function weekStart(ts) {
    let d = new Date(ts), day = (d.getDay() + 6) % 7;
    return d.setDate(d.getDate() - day), dayKey(d.getTime());
  }
  var iso = (ts) => new Date(ts).toISOString();
  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let cur = [i];
      for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[b.length];
  }
  var plural = (n, a, b, c) => {
    let m10 = n % 10, m100 = n % 100;
    return m10 === 1 && m100 !== 11 ? a : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? b : c;
  }, pct = (a, b) => b ? Math.round(a / b * 100) : 0;
  var groupBy = (arr, f3) => {
    let m = {};
    return arr.forEach((x) => {
      let k = f3(x);
      (m[k] = m[k] || []).push(x);
    }), m;
  };

  // src/engine/scoring.js
  var ERROR_TAGS = {
    MEANING: "Смысл / оттенок",
    FORM: "Форма / формула / V1-V2-V3",
    TIMELINE: "Временные точки и порядок событий",
    AUXILIARY: "Вспомогательный глагол",
    AGREEMENT: "Согласование",
    MODALITY: "Модальность: уверенность, обязанность",
    STRUCTURE: "Порядок слов / конструкция",
    ARTICLE_DETERMINER: "Артикль / определитель",
    PREPOSITION: "Предлог / управление",
    VOCAB_MEANING: "Значение слова",
    COLLOCATION: "Сочетаемость",
    REGISTER: "Регистр / тон",
    SPELLING: "Орфография",
    THEORY: "Концептуальная модель правила",
    CONTEXT: "Пропущено условие контекста",
    UNCLASSIFIED: "Не классифицировано"
  }, TAG_KEYS = Object.keys(ERROR_TAGS);
  function isSpellingSlip(input, accepted) {
    let n = norm(input);
    return n ? accepted.some((a) => {
      let t = norm(a), lim = t.length <= 4 ? 1 : t.length <= 9 ? 2 : 3, d = levenshtein(n, t);
      return d > 0 && d <= lim && n[0] === t[0];
    }) : !1;
  }
  function classifyTyped(input, accepted, rules = [], fallback = "UNCLASSIFIED") {
    let n = norm(input);
    if (!n) return { tags: ["UNCLASSIFIED"], why: "Ответ не введён." };
    for (let r of rules)
      if ((Array.isArray(r[0]) ? r[0] : [r[0]]).some((p2) => p2 instanceof RegExp ? p2.test(n) : norm(p2) === n)) return { tags: [r[1]], why: r[2] || "" };
    return isSpellingSlip(input, accepted) ? { tags: ["SPELLING"], why: "Похоже на опечатку или орфографическую ошибку." } : { tags: [fallback], why: "" };
  }
  function branchMax(q, nodeId = q.start, seen = /* @__PURE__ */ new Set()) {
    let node = q.nodes[nodeId];
    return !node || !node.choices || seen.has(nodeId) ? 0 : (seen.add(nodeId), Math.max(...node.choices.map((c) => (c.pts || 0) + (c.next ? branchMax(q, c.next, new Set(seen)) : 0))));
  }
  function scoreQuestion(q, r) {
    switch (q.type) {
      case "single": {
        if (r == null || !q.options[r]) return { correct: !1, score: 0, tags: ["UNCLASSIFIED"], why: "Нет ответа." };
        let o = q.options[r];
        return o.ok ? { correct: !0, score: 1, tags: [] } : { correct: !1, score: 0, tags: o.tag ? [].concat(o.tag) : [q.tag || "UNCLASSIFIED"], why: o.why };
      }
      case "multi": {
        let sel = new Set(r || []), need = q.options.filter((o) => o.ok).length, hit = 0, falsePos = 0, tags = /* @__PURE__ */ new Set();
        q.options.forEach((o, i) => {
          sel.has(i) && (o.ok ? hit++ : (falsePos++, o.tag && [].concat(o.tag).forEach((t) => tags.add(t))));
        }), need - hit > 0 && tags.add(q.missTag || q.tag || "UNCLASSIFIED");
        let correct = hit === need && falsePos === 0 && sel.size === need, score = Math.max(0, (hit - falsePos) / need);
        return { correct, score: correct ? 1 : score, tags: correct ? [] : [...tags], detail: { hit, falsePos, need } };
      }
      case "input": {
        if (q.accept.some((a) => norm(a) === norm(r)) && norm(r)) return { correct: !0, score: 1, tags: [] };
        let c = classifyTyped(r, q.accept, q.rules, q.tag || "UNCLASSIFIED");
        return { correct: !1, score: 0, tags: c.tags, why: c.why };
      }
      case "match": {
        let resp = r || {}, ok = 0, tags = /* @__PURE__ */ new Set(), wrong = [];
        q.items.forEach((it, i) => {
          resp[i] === it.cat ? ok++ : (wrong.push(i), tags.add(it.tag || q.tag || "UNCLASSIFIED"));
        });
        let correct = ok === q.items.length;
        return { correct, score: ok / q.items.length, tags: correct ? [] : [...tags], detail: { wrong } };
      }
      case "order": {
        let seq = (r || []).map((i) => q.tokens[i]).join(" "), targets = [q.tokens.join(" ")].concat((q.alts || []).map((a) => Array.isArray(a) ? a.join(" ") : a)), correct = (r || []).length === q.tokens.length && targets.some((t) => norm(t) === norm(seq)), pre = 0;
        for (; pre < (r || []).length && q.tokens[r[pre]] === q.tokens[pre]; ) pre++;
        return { correct, score: correct ? 1 : pre / q.tokens.length, tags: correct ? [] : [q.tag || "STRUCTURE"] };
      }
      case "fix": {
        let resp = r || {}, seg = q.segments[resp.seg];
        if (!seg || !seg.bad) return { correct: !1, score: 0, tags: [q.findTag || q.tag || "THEORY"], why: "Выбран фрагмент без ошибки." };
        if (seg.fix.some((f3) => norm(f3) === norm(resp.text)) && norm(resp.text)) return { correct: !0, score: 1, tags: [] };
        let c = classifyTyped(resp.text, seg.fix, seg.rules || [], seg.tag || q.tag || "UNCLASSIFIED");
        return { correct: !1, score: 0.5, tags: c.tags, why: c.why || "Ошибка найдена верно, но исправление неточное." };
      }
      case "branch": {
        let path = r || [], pts = 0, tags = /* @__PURE__ */ new Set(), allBest = !0;
        path.forEach((step) => {
          let node = q.nodes[step.node], ch = node && node.choices[step.choice];
          if (!ch) return;
          pts += ch.pts || 0;
          let best = Math.max(...node.choices.map((c) => c.pts || 0));
          (ch.pts || 0) < best && (allBest = !1, ch.tag && [].concat(ch.tag).forEach((t) => tags.add(t)));
        });
        let max = branchMax(q), last = path.length ? q.nodes[path[path.length - 1].node].choices[path[path.length - 1].choice] : null, finished = !!last && !last.next, score = max ? pts / max : 0, correct = finished && score >= (q.pass || 0.8);
        return { correct, score, tags: correct && allBest ? [] : tags.size ? [...tags] : correct ? [] : [q.tag || "CONTEXT"], detail: { pts, max, finished } };
      }
      default:
        throw new Error("Unknown question type " + q.type);
    }
  }
  function correctAnswerText(q) {
    switch (q.type) {
      case "single":
        return q.options.find((o) => o.ok).t;
      case "multi":
        return q.options.filter((o) => o.ok).map((o) => o.t).join(" | ");
      case "input":
        return q.accept[0];
      case "match":
        return q.items.map((it) => it.t + " → " + q.cats[it.cat]).join(" | ");
      case "order":
        return q.tokens.join(" ");
      case "fix": {
        let s = q.segments.find((x) => x.bad);
        return s.t + " → " + s.fix[0];
      }
      case "branch": {
        let out = [], id = q.start, guard = 0;
        for (; id && guard++ < 10; ) {
          let n = q.nodes[id];
          if (!n.choices) break;
          let b = n.choices.reduce((m, c) => (c.pts || 0) > (m.pts || 0) ? c : m, n.choices[0]);
          out.push(b.t), id = b.next;
        }
        return out.join(" → ");
      }
    }
    return "";
  }
  function userAnswerText(q, r) {
    if (r == null) return "";
    switch (q.type) {
      case "single":
        return q.options[r] ? q.options[r].t : "";
      case "multi":
        return (r || []).map((i) => q.options[i].t).join(" | ");
      case "input":
        return String(r);
      case "match":
        return q.items.map((it, i) => it.t + " → " + (r[i] != null ? q.cats[r[i]] : "—")).join(" | ");
      case "order":
        return r.map((i) => q.tokens[i]).join(" ");
      case "fix":
        return q.segments[r.seg] ? q.segments[r.seg].t + " → " + (r.text || "") : "";
      case "branch":
        return r.map((s) => q.nodes[s.node].choices[s.choice].t).join(" → ");
    }
    return "";
  }
  function isAnswered(q, r) {
    if (r == null) return !1;
    switch (q.type) {
      case "single":
        return Number.isInteger(r);
      case "multi":
        return Array.isArray(r) && r.length === q.options.filter((o) => o.ok).length;
      case "input":
        return !!String(r).trim();
      case "match":
        return q.items.every((_, i) => r[i] != null);
      case "order":
        return Array.isArray(r) && r.length === q.tokens.length;
      case "fix":
        return r.seg != null && !!(r.text || "").trim();
      case "branch": {
        if (!r.length) return !1;
        let l = r[r.length - 1], c = q.nodes[l.node].choices[l.choice];
        return !!c && !c.next;
      }
    }
    return !1;
  }

  // src/ui/question.js
  var order = (perm, n) => perm && perm.length === n ? perm : Array.from({ length: n }, (_, i) => i), TYPE_NAME = { single: "Один ответ", multi: "Несколько ответов", input: "Ввод", match: "Сопоставление", order: "Порядок", fix: "Найти ошибку", branch: "Сценарий" }, _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2;
  function QuestionView({ q, perm, value, onChange, checked, learning, onEnter }) {
    return html(_k2 || (_k2 = __template(['<div>\n    <div class="qmeta"><span class="tagchip">', '</span><span class="tagchip">', "</span>", "", "</div>\n    ", "\n    <div class=", " lang=", ">", "</div>\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n  </div>"])), TYPE_NAME[q.type], q.level, q.kind === "theory" ? html(_a2 || (_a2 = __template(['<span class="tagchip">теория</span>']))) : null, q.kind === "case" ? html(_b2 || (_b2 = __template(['<span class="tagchip">кейс</span>']))) : null, q.ctx ? html(_c2 || (_c2 = __template(['<div class="qctx" lang="en">', "</div>"])), q.ctx) : null, "qprompt" + (/[а-яё]/i.test(q.prompt) ? "" : " en"), /[а-яё]/i.test(q.prompt) ? "ru" : "en", q.prompt, q.type === "single" ? html(_d2 || (_d2 = __template(["<", " q=", " perm=", " value=", " onChange=", " checked=", "/>"])), Single, q, perm, value, onChange, checked) : null, q.type === "multi" ? html(_e2 || (_e2 = __template(["<", " q=", " perm=", " value=", " onChange=", " checked=", "/>"])), Multi, q, perm, value, onChange, checked) : null, q.type === "input" ? html(_f2 || (_f2 = __template(["<", " q=", " value=", " onChange=", " checked=", " onEnter=", "/>"])), Input, q, value, onChange, checked, onEnter) : null, q.type === "match" ? html(_g2 || (_g2 = __template(["<", " q=", " perm=", " value=", " onChange=", " checked=", "/>"])), Match, q, perm, value, onChange, checked) : null, q.type === "order" ? html(_h2 || (_h2 = __template(["<", " q=", " perm=", " value=", " onChange=", " checked=", "/>"])), Order, q, perm, value, onChange, checked) : null, q.type === "fix" ? html(_i2 || (_i2 = __template(["<", " q=", " value=", " onChange=", " checked=", " onEnter=", "/>"])), Fix, q, value, onChange, checked, onEnter) : null, q.type === "branch" ? html(_j2 || (_j2 = __template(["<", " q=", " value=", " onChange=", " checked=", " learning=", "/>"])), Branch, q, value, onChange, checked, learning) : null);
  }
  var _l2, _m2;
  function Single({ q, perm, value, onChange, checked }) {
    return html(_m2 || (_m2 = __template(['<div class="tiles" role="radiogroup">', "</div>"])), order(perm, q.options.length).map((i, k) => {
      let o = q.options[i], cl = "tile";
      return value === i && !checked && (cl += " sel"), checked && (o.ok ? cl += " good" : value === i ? cl += " badf" : cl += " faded"), html(_l2 || (_l2 = __template(["<button key=", ' role="radio" aria-checked=', " class=", " disabled=", " onClick=", ' lang="en"><span class="k">', "</span>", "</button>"])), i, value === i, cl, checked, () => onChange(i), k + 1, o.t);
    }));
  }
  var _n2, _o2;
  function Multi({ q, perm, value, onChange, checked }) {
    let need = q.options.filter((o) => o.ok).length, sel = value || [], toggle = (i) => {
      sel.includes(i) ? onChange(sel.filter((x) => x !== i)) : sel.length < need && onChange(sel.concat(i));
    };
    return html(_o2 || (_o2 = __template(['<div><p class="hint">Выберите ровно ', " варианта. Выбрано: ", " из ", '.</p>\n    <div class="tiles">', "</div></div>"])), need, sel.length, need, order(perm, q.options.length).map((i) => {
      let o = q.options[i], on = sel.includes(i), cl = "tile";
      return on && !checked && (cl += " sel"), checked && (o.ok ? cl += " good" : on ? cl += " badf" : cl += " faded"), html(_n2 || (_n2 = __template(["<button key=", ' role="checkbox" aria-checked=', " class=", " disabled=", " onClick=", ' lang="en"><span class="ck">', "</span>", "</button>"])), i, on, cl, checked || !on && sel.length >= need, () => toggle(i), on ? I.check : null, o.t);
    }));
  }
  var _p2;
  function Input({ q, value, onChange, checked, onEnter }) {
    let ref = useRef(null);
    return useEffect(() => {
      !checked && ref.current && window.matchMedia("(pointer:fine)").matches && ref.current.focus({ preventScroll: !0 });
    }, [q.id]), html(_p2 || (_p2 = __template(["<form onSubmit=", ' autocomplete="off">\n    <input ref=', " class=", ' lang="en" value=', " readOnly=", " onChange=", '\n      placeholder="Ответ на английском" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="done" aria-label="Ответ"/></form>'])), (e) => {
      e.preventDefault(), onEnter && onEnter();
    }, ref, "minput", value || "", checked, (e) => onChange(e.target.value));
  }
  var _q2, _r2, _s2, _t2;
  function Match({ q, perm, value, onChange, checked }) {
    let v = value || {};
    return html(_t2 || (_t2 = __template(["<div>", "</div>"])), order(perm, q.items.length).map((i) => {
      let it = q.items[i], cl = "mitem";
      return checked && (cl += v[i] === it.cat ? " good" : " badf"), html(_s2 || (_s2 = __template(["<div key=", " class=", '><div class="mt" lang="en">', '</div><div class="mc">', "</div>\n      ", "</div>"])), i, cl, it.t, q.cats.map((c, ci) => html(_q2 || (_q2 = __template(["<button key=", " aria-pressed=", " disabled=", " onClick=", ">", "</button>"])), ci, v[i] === ci, checked, () => onChange(Object.assign({}, v, { [i]: ci })), c)), checked && v[i] !== it.cat ? html(_r2 || (_r2 = __template(['<div class="small2" style=', ">Верно: <b>", "</b></div>"])), { marginTop: "6px" }, q.cats[it.cat]) : null);
    }));
  }
  var _u2, _v2, _w2, _x2, _y2, _z2;
  function Order({ q, perm, value, onChange, checked }) {
    let seq = value || [], bank = order(perm, q.tokens.length);
    return html(_z2 || (_z2 = __template(['<div><p class="hint">Нажимайте элементы по порядку. Нажмите элемент в строке ответа, чтобы убрать его.</p>\n    <div class="oline" aria-label="Ваш ответ">', '</div>\n    <div class="obank">', "</div>\n    ", "\n    ", "</div>"])), seq.length ? seq.map((i, k) => html(_u2 || (_u2 = __template(["<button key=", ' class="tok" disabled=', " onClick=", ' lang="en">', "</button>"])), k, checked, () => onChange(seq.filter((_, j) => j !== k)), q.tokens[i])) : html(_v2 || (_v2 = __template(['<span class="small2">Ответ появится здесь</span>']))), bank.map((i) => html(_w2 || (_w2 = __template(["<button key=", " class=", " disabled=", " onClick=", ' lang="en">', "</button>"])), i, "tok" + (seq.includes(i) ? " used" : ""), checked || seq.includes(i), () => onChange(seq.concat(i)), q.tokens[i])), !checked && seq.length ? html(_x2 || (_x2 = __template(['<button class="link" style=', " onClick=", ">Очистить</button>"])), { marginTop: "10px" }, () => onChange([])) : null, checked ? html(_y2 || (_y2 = __template(['<p class="small2" style=', '>Верный порядок: <span lang="en">', "</span></p>"])), { marginTop: "8px" }, q.tokens.join(" ")) : null);
  }
  var _A2, _B2, _C2;
  function Fix({ q, value, onChange, checked, onEnter }) {
    let v = value || {};
    return html(_C2 || (_C2 = __template(['<div><p class="hint">1) Нажмите на фрагмент с ошибкой. 2) Введите исправленный вариант.</p>\n    <div class="fixs" lang="en">', "</div>\n    ", "</div>"])), q.segments.map((s, i) => {
      let cl = "";
      return v.seg === i && (cl = "sel"), checked && s.bad && (cl = "good"), html(_A2 || (_A2 = __template(["<button key=", " class=", " disabled=", " onClick=", ">", "</button>"])), i, cl, checked, () => onChange({ seg: i, text: v.seg === i ? v.text : "" }), s.t);
    }), v.seg != null ? html(_B2 || (_B2 = __template(["<form onSubmit=", ' autocomplete="off"><label class="small2">Исправление для «', '»:</label>\n      <input class="minput" lang="en" value=', " readOnly=", " onChange=", ' autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" placeholder="Исправленный фрагмент"/></form>'])), (e) => {
      e.preventDefault(), onEnter && onEnter();
    }, q.segments[v.seg].t, v.text || "", checked, (e) => onChange({ seg: v.seg, text: e.target.value })) : null);
  }
  var _D, _E2, _F2, _G2, _H2, _I2, _J2;
  function Branch({ q, value, onChange, checked, learning }) {
    let path = value || [], last = path[path.length - 1], lastChoice = last ? q.nodes[last.node].choices[last.choice] : null, curId = last ? lastChoice.next : q.start, node = curId ? q.nodes[curId] : null;
    return html(_J2 || (_J2 = __template(['<div>\n    <div class="bpath">', "</div>\n    ", "\n    ", "\n  </div>"])), path.map((st, k) => {
      let n = q.nodes[st.node], c = n.choices[st.choice], best = Math.max(...n.choices.map((x) => x.pts || 0)), good = (c.pts || 0) === best;
      return html(_E2 || (_E2 = __template(["<div key=", " class=", "><b>Шаг ", ". ", '</b><div class="ans" lang="en">', "</div>", "</div>"])), k, "bstep" + (learning || checked ? good ? " ok" : " bad" : ""), k + 1, n.text, c.t, learning || checked ? html(_D || (_D = __template(['<div class="fbk">', "", "</div>"])), good ? "✓ " : "✗ ", c.fb) : null);
    }), node && !checked ? html(_G2 || (_G2 = __template(['<div><div class="qprompt">', '</div><div class="tiles">', "</div></div>"])), node.text, node.choices.map((c, i) => html(_F2 || (_F2 = __template(["<button key=", ' class="tile" onClick=', ' lang="en"><span class="k">', "</span>", "</button>"])), i, () => onChange(path.concat({ node: curId, choice: i })), String.fromCharCode(65 + i), c.t))) : checked ? null : html(_H2 || (_H2 = __template(['<div class="banner learn">Сценарий завершён. ', "</div>"])), learning ? "Нажмите «Проверить», чтобы увидеть оценку траектории." : "Ответ сохранён; оценка будет после завершения теста."), !checked && path.length ? html(_I2 || (_I2 = __template(['<button class="link" style=', " onClick=", ">Пройти сценарий заново</button>"])), { marginTop: "10px" }, () => onChange([])) : null);
  }
  var _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U;
  function Explain({ q, value, result, onLesson, compact }) {
    let lesson = LESSON_BY_ID[q.lesson || q.sub];
    return html(_U || (_U = __template(["<div class=", ' role="status">\n    <div class="fb-h">', "", '</div>\n    <div class="fb-b">\n      ', "\n      <p>", "</p>\n      ", "\n      ", "\n      ", "\n      ", "\n      ", "\n      ", "\n      ", "\n    </div></div>"])), "fb " + (result.correct ? "fb-ok" : "fb-bad"), result.correct ? I.ok : I.bad, result.correct ? "Верно" : result.score > 0 ? "Частично верно (".concat(Math.round(result.score * 100), "%)") : "Неверно", result.correct ? null : html(_K || (_K = __template(['<p><b>Ваш ответ:</b> <span lang="en">', '</span></p><p><b>Правильно:</b> <span lang="en">', "</span></p>"])), userAnswerText(q, value) || "—", correctAnswerText(q)), rich(q.explain), q.ce ? html(_L || (_L = __template(["<p><b>Контрпример:</b> ", "</p>"])), rich(q.ce)) : null, q.note ? html(_M || (_M = __template(['<p class="small2">', "</p>"])), q.note) : null, result.why && !result.correct ? html(_N || (_N = __template(["<p>", "</p>"])), result.why) : null, !compact && (q.type === "single" || q.type === "multi") ? html(_P || (_P = __template(['<div class="optexp">', "</div>"])), q.options.map((o, i) => html(_O || (_O = __template(["<div key=", " class=", '><b lang="en">', "</b> — ", "</div>"])), i, o.ok ? "okx" : "nox", o.t, o.why))) : null, !compact && q.type === "branch" ? html(_Q || (_Q = __template(["<p>", "</p>"])), q.explain) : null, !result.correct && result.tags && result.tags.length ? html(_S || (_S = __template(["<p><b>Вероятная причина:</b> ", "</p>"])), result.tags.map((t) => html(_R || (_R = __template(["<span key=", ' class="tagchip">', "</span>"])), t, ERROR_TAGS[t] || t))) : null, lesson && onLesson ? html(_T || (_T = __template(['<p><button class="link" onClick=', ">Урок: ", "</button></p>"])), () => onLesson(lesson.id), lesson.title) : null);
  }

  // src/engine/selector.js
  function balancedPick(items, n, opt = {}) {
    let rng = opt.rng || Math.random, exp = opt.exposure || {}, k1 = opt.k1 || ((q) => q.sub), k2 = opt.k2 || ((q) => q.diff), uniq = [], seen = /* @__PURE__ */ new Set();
    items.forEach((q) => {
      seen.has(q.id) || (seen.add(q.id), uniq.push(q));
    }), n = Math.min(n, uniq.length);
    let groups = {};
    uniq.forEach((q) => {
      (groups[k1(q)] = groups[k1(q)] || []).push(q);
    }), Object.keys(groups).forEach((k) => {
      groups[k] = shuffle(groups[k], rng).sort((a, b) => (exp[a.id] || 0) - (exp[b.id] || 0));
    });
    let order2 = shuffle(Object.keys(groups), rng), freshness = (k) => Math.min(...groups[k].map((q) => exp[q.id] || 0)), picked = [], k2count = {}, per = {}, minEach = opt.minEach == null ? 1 : opt.minEach, take = (k) => {
      let g = groups[k];
      if (!g.length) return !1;
      let minExp = exp[g[0].id] || 0, cands = g.filter((q2) => (exp[q2.id] || 0) === minExp);
      cands.sort((a, b) => (k2count[k2(a)] || 0) - (k2count[k2(b)] || 0));
      let q = cands[0];
      return g.splice(g.indexOf(q), 1), picked.push(q), k2count[k2(q)] = (k2count[k2(q)] || 0) + 1, per[k] = (per[k] || 0) + 1, !0;
    };
    for (opt.minPer && Object.entries(opt.minPer).forEach(([k, m]) => {
      for (let i = 0; i < m && picked.length < n; i++) groups[k] && take(k);
    }); picked.length < n && (order2 = order2.filter((k) => groups[k].length), !!order2.length); ) {
      let gmin = Math.min(...order2.map(freshness)), round = order2.filter((k) => (per[k] || 0) < minEach || freshness(k) === gmin);
      round.length || (round = order2), round = round.slice().sort((a, b) => freshness(a) - freshness(b));
      for (let k of round) {
        if (picked.length >= n) break;
        take(k);
      }
    }
    return picked;
  }
  function makePermutation(q, rng = Math.random) {
    if (q.type === "single" || q.type === "multi") return shuffle(q.options.map((_, i) => i), rng);
    if (q.type === "order") {
      let p2, guard = 0;
      do
        p2 = shuffle(q.tokens.map((_, i) => i), rng);
      while (guard++ < 10 && p2.every((x, i) => x === i));
      return p2;
    }
    return q.type === "match" ? shuffle(q.items.map((_, i) => i), rng) : (q.type === "fix", null);
  }

  // src/engine/exam.js
  var keyFn = (k) => typeof k == "function" ? k : (q) => q[k] == null ? "_" : q[k];
  function createAttempt(def, exposure = {}, { rng = Math.random, contentVersion = "", now = Date.now() } = {}) {
    let chosen = [], used = /* @__PURE__ */ new Set();
    def.parts.forEach((part) => {
      let pool = part.pool.filter((q) => !used.has(q.id));
      balancedPick(pool, part.n, { k1: keyFn(part.k1), k2: keyFn(part.k2), exposure, rng, minEach: part.minEach }).forEach((q) => {
        used.add(q.id), chosen.push(q);
      });
    });
    let items = shuffle(chosen, rng).map((q) => ({ qid: q.id, v: q.v || 1, perm: makePermutation(q, rng) })), snapshot = Object.fromEntries(chosen.map((q) => [q.id, JSON.parse(JSON.stringify(q))]));
    return {
      id: uid("att"),
      testId: def.id,
      title: def.title,
      kind: def.kind,
      module: def.module || null,
      mode: "exam",
      contentVersion,
      startedAt: now,
      updatedAt: now,
      idx: 0,
      items,
      snapshot,
      responses: {},
      timeSpent: {},
      finishedAt: null
    };
  }
  var filledCount = (att) => att.items.filter((it) => isAnswered(att.snapshot[it.qid], att.responses[it.qid])).length;
  function finish(att, now = Date.now()) {
    let results = {}, score = 0, events = [];
    att.items.forEach((it, i) => {
      let q = att.snapshot[it.qid], r = att.responses[it.qid], res = scoreQuestion(q, r);
      results[it.qid] = res, res.correct && score++, events.push(makeEvent({ q, response: r, result: res, mode: "exam", attemptId: att.id, testId: att.testId, ts: now + i, timeSpentMs: att.timeSpent[it.qid] || 0, firstAttempt: !0 }));
    });
    let total = att.items.length;
    return { attempt: Object.assign({}, att, { finishedAt: now, results, score, total, pct: total ? Math.round(score / total * 100) : 0, durationMs: now - att.startedAt }), events };
  }
  function makeEvent({ q, response, result, mode, attemptId, testId, ts = Date.now(), timeSpentMs = 0, firstAttempt = !0, retry = !1, extra = {} }) {
    let user = userAnswerText(q, response);
    return Object.assign({
      id: uid("ev"),
      attemptId,
      testId: testId || null,
      questionId: q.id,
      questionVersion: q.v || 1,
      moduleId: q.module || null,
      subtopicId: q.sub || null,
      lessonId: q.lesson || q.sub || null,
      kind: q.kind || null,
      format: q.type,
      level: q.level || null,
      difficulty: q.diff || null,
      mode,
      ts,
      timestamp: iso(ts),
      userAnswer: user,
      userAnswerNorm: q.type === "input" ? norm(user) : "",
      correctAnswer: correctAnswerText(q),
      isCorrect: !!result.correct,
      score: Math.round((result.score || 0) * 100) / 100,
      timeSpentMs: Math.round(timeSpentMs),
      errorTags: result.correct ? [] : result.tags && result.tags.length ? result.tags : ["UNCLASSIFIED"],
      explanationId: q.id,
      firstAttempt: !!firstAttempt,
      retry: !!retry
    }, extra);
  }
  function createLearning(scope, questions, n, qstats = {}, rng = Math.random) {
    let w = (q) => {
      let s = qstats[q.id];
      return s ? 1 + (s.firstOk === !1 ? 2 : 0) + (s.n < 2 ? 0.5 : 0) : 3;
    }, keyed = questions.map((q) => ({ q, k: Math.pow(rng(), 1 / w(q)) })).sort((a, b) => b.k - a.k).slice(0, n).map((x) => x.q);
    return {
      id: "learn:" + scope,
      scope,
      mode: "learning",
      queue: keyed.map((q) => q.id),
      perms: Object.fromEntries(keyed.map((q) => [q.id, makePermutation(q, rng)])),
      pos: 0,
      requeued: [],
      answers: {},
      correct: 0,
      wrong: 0,
      startedAt: Date.now(),
      done: !1,
      response: null,
      checked: !1
    };
  }
  function requeue(sess, qid, rng = Math.random) {
    if (sess.requeued.includes(qid)) return sess;
    let at = Math.min(sess.queue.length, sess.pos + 3 + Math.floor(rng() * 3)), queue = sess.queue.slice();
    return queue.splice(at, 0, qid), Object.assign({}, sess, { queue, requeued: sess.requeued.concat(qid) });
  }

  // src/engine/analytics.js
  function filterEvents(events, f3 = {}) {
    return events.filter((e) => (f3.from == null || e.ts >= f3.from) && (f3.to == null || e.ts <= f3.to) && (!f3.mode || f3.mode === "all" || e.mode === f3.mode) && (!f3.level || f3.level === "all" || e.level === f3.level) && (!f3.module || e.moduleId === f3.module));
  }
  function errorMatrix(events) {
    let rows = {};
    return events.forEach((e) => {
      let m = e.moduleId || "—", r = rows[m] = rows[m] || { module: m, total: 0, wrong: 0, tags: {} };
      r.total++, e.isCorrect || (r.wrong++, (e.errorTags || ["UNCLASSIFIED"]).forEach((t) => {
        r.tags[t] = (r.tags[t] || 0) + 1;
      }));
    }), Object.values(rows).sort((a, b) => b.wrong - a.wrong);
  }
  function topIssues(events, n = 5) {
    let m = {}, totals = {};
    return events.forEach((e) => {
      let k = (e.moduleId || "—") + "|" + (e.subtopicId || "—");
      totals[k] = (totals[k] || 0) + 1;
    }), events.filter((e) => !e.isCorrect).forEach((e) => (e.errorTags || ["UNCLASSIFIED"]).forEach((t) => {
      let k = (e.moduleId || "—") + "|" + (e.subtopicId || "—") + "|" + t, it = m[k] = m[k] || { module: e.moduleId, sub: e.subtopicId, tag: t, count: 0, events: [] };
      it.count++, it.events.push(e);
    })), Object.values(m).filter((x) => x.tag !== "UNCLASSIFIED" || x.count >= 2).map((x) => Object.assign(x, { total: totals[(x.module || "—") + "|" + (x.sub || "—")], rate: x.count / totals[(x.module || "—") + "|" + (x.sub || "—")] })).sort((a, b) => b.count - a.count || b.rate - a.rate).slice(0, n);
  }
  function weekly(events) {
    let g = groupBy(events, (e) => isoWeek(e.ts));
    return Object.keys(g).sort().map((w) => {
      let es = g[w], wrong = es.filter((e) => !e.isCorrect), tags = {};
      wrong.forEach((e) => (e.errorTags || []).forEach((t) => {
        tags[t] = (tags[t] || 0) + 1;
      }));
      let ex2 = es.filter((e) => e.mode === "exam"), le = es.filter((e) => e.mode === "learning");
      return {
        week: w,
        answered: es.length,
        correct: es.length - wrong.length,
        accuracy: pct(es.length - wrong.length, es.length),
        errors: wrong.length,
        tags,
        exam: ex2.length,
        examAcc: pct(ex2.filter((e) => e.isCorrect).length, ex2.length),
        learning: le.length,
        learningAcc: pct(le.filter((e) => e.isCorrect).length, le.length),
        timeMs: es.reduce((a, e) => a + (e.timeSpentMs || 0), 0)
      };
    });
  }
  function breakdown(events, key) {
    let g = groupBy(events, (e) => e[key] || "—");
    return Object.keys(g).map((k) => {
      let es = g[k], ok = es.filter((e) => e.isCorrect).length;
      return { key: k, total: es.length, correct: ok, accuracy: pct(ok, es.length) };
    });
  }
  function firstAnswerStats(events) {
    let first = events.filter((e) => e.firstAttempt && !e.retry), ok = first.filter((e) => e.isCorrect).length, times = first.map((e) => e.timeSpentMs).filter((t) => t > 0).sort((a, b) => a - b), median = times.length ? times[Math.floor(times.length / 2)] : 0;
    return { n: first.length, accuracy: pct(ok, first.length), medianMs: median, retries: events.filter((e) => e.retry).length };
  }
  function streak(events, now = Date.now()) {
    let days = new Set(events.map((e) => dayKey(e.ts))), n = 0, d = new Date(now);
    for (days.has(dayKey(d.getTime())) || d.setDate(d.getDate() - 1); days.has(dayKey(d.getTime())); )
      n++, d.setDate(d.getDate() - 1);
    return n;
  }
  function topicStrength(events, minN = 4) {
    let g = groupBy(events, (e) => (e.moduleId || "—") + "|" + (e.subtopicId || "—"));
    return Object.entries(g).filter(([, es]) => es.length >= minN).map(([k, es]) => {
      let [module, sub] = k.split("|");
      return { module, sub, n: es.length, accuracy: pct(es.filter((e) => e.isCorrect).length, es.length) };
    }).sort((a, b) => a.accuracy - b.accuracy);
  }
  function tagTrend(events, module, tag, now = Date.now()) {
    let wk = isoWeek(now), prev = isoWeek(now - 7 * 864e5), c = (w) => events.filter((e) => !e.isCorrect && e.moduleId === module && isoWeek(e.ts) === w && (e.errorTags || []).includes(tag)).length, a = c(wk), b = c(prev);
    return a > b ? "up" : a < b ? "down" : "flat";
  }
  function blockMastery(block2, { course = {}, qstats = {}, attempts = [], now = Date.now() }) {
    let lessons5 = block2.lessons.length, done2 = block2.lessons.filter((l) => course.lessons && course.lessons[l.id] && course.lessons[l.id].doneAt).length, qs = block2.questions, th = qs.filter((q) => q.kind === "theory"), pr = qs.filter((q) => q.kind === "practice"), seen = (list) => list.filter((q) => qstats[q.id]), acc = (list) => {
      let s = seen(list);
      return s.length ? pct(s.filter((q) => qstats[q.id].firstOk).length, s.length) : null;
    }, tests = attempts.filter((a) => a.testId === "block:" + block2.id && a.finishedAt).sort((a, b) => b.finishedAt - a.finishedAt), last = tests[0] || null, best = tests.reduce((m, a) => Math.max(m, a.pct), 0), theoryAcc = acc(th), practiceAcc = acc(pr), practiceSeen = seen(pr).length, coverage = pct(practiceSeen, pr.length), lastActivity = Math.max(0, ...qs.map((q) => qstats[q.id] && qstats[q.id].last || 0), last ? last.finishedAt : 0, ...block2.lessons.map((l) => course.lessons && course.lessons[l.id] && course.lessons[l.id].doneAt || 0)), score = Math.round(0.15 * pct(done2, lessons5) + 0.15 * (theoryAcc || 0) + 0.25 * ((practiceAcc || 0) * Math.min(1, coverage / 50)) + 0.45 * (last ? last.pct : 0)), status = "Не начато";
    return lastActivity && (status = "Изучаю"), done2 / lessons5 >= 0.8 && (practiceAcc || 0) >= 70 && practiceSeen >= 20 && (status = "Готов к проверке"), last && last.pct >= 85 && (status = "Закреплено"), (last && last.pct < 70 || status === "Закреплено" && now - lastActivity > 21 * 864e5) && (status = "Нужно повторить"), { lessons: lessons5, done: done2, theoryAcc, practiceAcc, coverage, practiceSeen, practiceTotal: pr.length, lastExam: last ? last.pct : null, lastExamAt: last ? last.finishedAt : null, bestExam: tests.length ? best : null, tests: tests.length, score, status, lastActivity };
  }
  function dictStats(dict, setDocs, fullDoc, events) {
    let ids = new Set(dict.words.map((w2) => w2.id)), learned = /* @__PURE__ */ new Set(), c = 0, w = 0, stats = {};
    dict.sets.forEach((s) => {
      let d = setDocs[s.id];
      d && (Object.values(d.levels || {}).forEach((L2) => (L2.learned || []).forEach((id) => learned.add(id))), Object.entries(d.stats || {}).forEach(([id, st]) => {
        stats[id] = st, c += st.c, w += st.w;
      }));
    });
    let consolidated = Object.values(stats).filter((st) => st.c - st.w >= 3).length, ev = events.filter((e) => ids.has(e.questionId) || e.moduleId === "vocab-" + dict.id), lastTs = ev.reduce((m, e) => Math.max(m, e.ts), 0), finals = dict.sets.map((s) => {
      let h5 = setDocs[s.id] && setDocs[s.id].test && setDocs[s.id].test.history || [];
      return { set: s.id, size: s.words.length, best: h5.length ? Math.max(...h5.map((x) => x.score)) : null, attempts: h5.length, perfect: h5.some((x) => x.score === x.total) };
    }), fullH = fullDoc && fullDoc.test && fullDoc.test.history || [], times = ev.map((e) => e.timeSpentMs).filter(Boolean).sort((a, b) => a - b);
    return {
      total: dict.words.length,
      learned: learned.size,
      consolidated,
      accuracy: pct(c, c + w),
      answers: c + w,
      lastTs,
      finals,
      fullBest: fullH.length ? Math.max(...fullH.map((x) => x.score)) : null,
      fullAttempts: fullH.length,
      medianMs: times.length ? times[Math.floor(times.length / 2)] : 0
    };
  }

  // src/ui/course.js
  var LV = (n) => (n - 1) % 6 + 1, _a3, _b3, _c3, _d3, _e3, _f3;
  function CourseTab({ nav }) {
    let app = useApp(), [seg, setSeg] = useState("blocks"), [qText, setQ] = useState(""), found = useMemo(() => search(qText), [qText]);
    return html(_f3 || (_f3 = __template(["<", " bare nav=", '>\n    <div class="home-head"><div><h1>Курс B2 → C1</h1><p>', " из ", ' блоков в этой сборке. Теория, тренировки и контрольные.</p></div></div>\n    <input class="search" type="search" placeholder="Поиск: тема, урок или глагол" value=', " onInput=", ' aria-label="Поиск"/>\n    ', "\n  </", ">"])), Screen, nav, BLOCKS.length, COURSE.length, qText, (e) => setQ(e.target.value), qText.trim().length >= 2 ? html(_a3 || (_a3 = __template(["<", " found=", "/>"])), SearchResults, found) : html(_e3 || (_e3 = __template(['\n      <div class="seg2" role="group"><button aria-pressed=', " onClick=", ">Блоки</button><button aria-pressed=", " onClick=", ">Theory Check</button><button aria-pressed=", " onClick=", ">Case Lab</button></div>\n      ", ""])), seg === "blocks", () => setSeg("blocks"), seg === "theory", () => setSeg("theory"), seg === "cases", () => setSeg("cases"), seg === "blocks" ? html(_b3 || (_b3 = __template(["<", "/>"])), BlockList) : seg === "theory" ? html(_c3 || (_c3 = __template(["<", "/>"])), TheoryHub) : html(_d3 || (_d3 = __template(["<", "/>"])), CaseHub)), Screen);
  }
  var _g3, _h3;
  function BlockList() {
    let app = useApp();
    return html(_h3 || (_h3 = __template(['<div class="lv-list">', "</div>"])), BLOCKS.map((b) => {
      let m = blockMastery(b, mctx(app));
      return html(_g3 || (_g3 = __template(["<button key=", " class=", " onClick=", '>\n    <span class="lv-num">', "</span><span><h3>", "</h3><p>", '</p><span class="lv-prog"><span class="pb"><i style=', "></i></span>", "%</span><span style=", "><", " s=", "/></span></span></button>"])), b.id, "lv-card lv-" + LV(b.n), () => app.nav.push("block", { id: b.id }), b.n, b.title, b.short, { width: m.score + "%" }, m.score, { display: "block", marginTop: "6px" }, StatusChip, m.status);
    }));
  }
  var mctx = (app) => ({ course: app.docs.course || {}, qstats: app.docs.qstats || {}, attempts: app.attempts }), _i3, _j3, _k3;
  function TheoryHub() {
    let app = useApp(), all = BLOCKS.flatMap((b) => b.questions.filter((q) => q.kind === "theory")), qs = app.docs.qstats || {}, seen = all.filter((q) => qs[q.id]), first = seen.filter((q) => qs[q.id].firstOk).length;
    return html(_k3 || (_k3 = __template(['<div>\n    <div class="cardx"><h3>Проверки теории</h3><p class="small2">Вопросы «почему», «когда НЕ применяется», «какой смысл меняется». Каждый ответ — с объяснением и контрпримером.</p>\n      <div class="kv" style=', '><div><div class="v">', "/", '</div><div class="l">вопросов пройдено</div></div><div><div class="v">', '%</div><div class="l">верно с первой попытки</div></div></div></div>\n    ', "\n    <", ' title="Тренировка по всей теории" sub="Случайные вопросы из всех блоков" onClick=', "/>\n    <", " title=", " sub=", " onClick=", "/>\n  </div>"])), { marginTop: "10px" }, seen.length, all.length, pct(first, seen.length), BLOCKS.map((b) => html(_j3 || (_j3 = __template(["<", " key=", " left=", " title=", " sub=", "\n      onClick=", "/>"])), Row, b.id, html(_i3 || (_i3 = __template(["<span class=", ">", "</span>"])), "numc lv-" + LV(b.n), b.n), b.title, b.questions.filter((q) => q.kind === "theory").length + " теоретических вопросов · тренировка", () => app.nav.push("practice", { title: "Теория: " + b.title, key: "theory:" + b.id, ids: b.questions.filter((q) => q.kind === "theory").map((q) => q.id), n: 12 }))), Row, () => app.nav.push("practice", { title: "Теория: все блоки", key: "theory:all", ids: all.map((q) => q.id), n: 15 }), Row, TEST_BY_ID.theory.title, TEST_BY_ID.theory.size + " вопросов · Exam Mode · новый вариант каждый раз", () => app.nav.push("examIntro", { testId: "theory" }));
  }
  var _l3, _m3, _n3;
  function CaseHub() {
    let app = useApp();
    return html(_n3 || (_n3 = __template(['<div>\n    <div class="cardx"><h3>Case Lab</h3><p class="small2">Короткие рабочие ситуации: письма, встречи, отчёты. Шесть форматов, у каждого варианта — разбор. В тренировке ответ проверяется сразу.</p></div>\n    ', "\n    <", ' title="Смешанная тренировка кейсов" sub=', " onClick=", "/>\n    <", " title=", " sub=", " onClick=", "/>\n  </div>"])), CASE_FORMATS.map((f3, k) => {
      let ids = CASES.filter((c) => c.type === f3.type).map((c) => c.id);
      return html(_m3 || (_m3 = __template(["<", " key=", " left=", " title=", " sub=", " onClick=", "/>"])), Row, f3.type, html(_l3 || (_l3 = __template(["<span class=", ">", "</span>"])), "numc lv-" + (k + 1), k + 1), f3.title, ids.length + " заданий", () => app.nav.push("practice", { title: f3.title, key: "cases:" + f3.type, ids, n: 8 }));
    }), Row, CASES.length + " заданий во всех форматах", () => app.nav.push("practice", { title: "Case Lab: все форматы", key: "cases:all", ids: CASES.map((c) => c.id), n: 10 }), Row, TEST_BY_ID.cases.title, TEST_BY_ID.cases.size + " заданий · все 6 форматов · Exam Mode", () => app.nav.push("examIntro", { testId: "cases" }));
  }
  function search(t) {
    let s = t.trim().toLowerCase();
    if (s.length < 2) return { lessons: [], words: [] };
    let lessons5 = BLOCKS.flatMap((b) => b.lessons.filter((l) => (l.title + " " + l.goal + " " + b.title).toLowerCase().includes(s)).map((l) => Object.assign({ block: b }, l))).slice(0, 12), words = DICTS.flatMap((d) => d.words.filter((w) => w.english.toLowerCase().includes(s) || w.russian.toLowerCase().includes(s)).map((w) => Object.assign({ dict: d }, w))).slice(0, 20);
    return { lessons: lessons5, words };
  }
  var _o3, _p3, _q3, _r3, _s3, _t3, _u3, _v3, _w3;
  function SearchResults({ found }) {
    let app = useApp(), [w, setW] = useState(null);
    return html(_w3 || (_w3 = __template(['<div>\n    <h2 class="h2">Уроки (', ")</h2>\n    ", '\n    <h2 class="h2">Слова (', ")</h2>\n    ", "\n    ", "\n  </div>"])), found.lessons.length, found.lessons.length ? found.lessons.map((l) => html(_o3 || (_o3 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, l.id, l.title, l.block.title, () => app.nav.push("lesson", { id: l.id }))) : html(_p3 || (_p3 = __template(['<div class="empty">Ничего не найдено</div>']))), found.words.length, found.words.length ? found.words.map((x) => html(_q3 || (_q3 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, x.id, x.english, x.russian + " · " + x.dict.title, () => setW(x))) : html(_r3 || (_r3 = __template(['<div class="empty">Ничего не найдено</div>']))), w ? html(_v3 || (_v3 = __template(["<", " onClose=", " label=", '><h2 lang="en">', "</h2><p style=", ">", "</p>\n      ", '\n      <p class="ex" lang="en">', '</p><p class="small2">', "</p>\n      ", "\n      ", '\n      <button class="btn btn-dark" onClick=', ">Открыть набор со словом</button></", ">"])), Sheet, () => setW(null), w.english, w.english, { color: "var(--ink)" }, w.russian, w.v2 ? html(_s3 || (_s3 = __template(['<p><b lang="en">', " — ", " — ", "</b></p>"])), w.v1, w.v2.join("/"), w.v3.join("/")) : null, w.exampleSentence.replace(/\[\[|\]\]/g, ""), w.exampleTranslation, (w.collocations || []).length ? html(_t3 || (_t3 = __template(['<p class="small2"><b>Сочетания:</b> ', "</p>"])), w.collocations.join(", ")) : null, w.usageNotes ? html(_u3 || (_u3 = __template(['<p class="small2">', "</p>"])), w.usageNotes) : null, () => {
      setW(null);
      let set = w.dict.sets.find((s) => s.words.some((x) => x.id === w.id));
      app.nav.push("vocabSet", { setId: set.id });
    }, Sheet) : null);
  }
  var _x3, _y3, _z3, _A3, _B3, _C3, _D2;
  function BlockScreen({ params }) {
    let app = useApp(), b = BLOCK_BY_ID[params.id], m = blockMastery(b, mctx(app)), lv = LV(b.n), course = app.docs.course || {}, sess = app.sessions["exam:block:" + b.id], evs = app.events.filter((e) => e.moduleId === b.id), wrong = evs.filter((e) => !e.isCorrect), practice5 = b.questions.filter((q) => q.kind === "practice" && !q.drill);
    return html(_D2 || (_D2 = __template(["<", " lv=", " title=", " sub=", " onBack=", '>\n    <div class="wcard"><div class="cnt"><span>Mastery ', "%</span><", " s=", '/></div>\n      <div class="kv"><div><div class="v">', "/", '</div><div class="l">уроков пройдено</div></div><div><div class="v">', '</div><div class="l">теория (1-я попытка)</div></div>\n        <div><div class="v">', '</div><div class="l">практика (1-я попытка), покрытие ', '%</div></div><div><div class="v">', '</div><div class="l">последняя контрольная', '</div></div></div></div>\n    <h2 class="h2">Уроки</h2>\n    ', '\n    <h2 class="h2">Тренировка (Learning Mode)</h2>\n    <', ' title="Все темы блока" sub=', " onClick=", "/>\n    ", "\n    ", '\n    <h2 class="h2">Контрольный тест</h2>\n    <', " title=", " sub=", " onClick=", '/>\n    <h2 class="h2">Отчёт об ошибках</h2>\n    ', "\n  </", ">"])), Screen, lv, b.title, "Блок " + b.n, app.nav.back, m.score, StatusChip, m.status, m.done, m.lessons, m.theoryAcc == null ? "—" : m.theoryAcc + "%", m.practiceAcc == null ? "—" : m.practiceAcc + "%", m.coverage, m.lastExam == null ? "—" : m.lastExam + "%", m.bestExam != null ? ", лучшая " + m.bestExam + "%" : "", b.lessons.map((l, k) => {
      let d = course.lessons && course.lessons[l.id];
      return html(_y3 || (_y3 = __template(["<", " key=", " left=", " title=", " sub=", " onClick=", "/>"])), Row, l.id, html(_x3 || (_x3 = __template(["<span class=", ">", "</span>"])), "chk" + (d && d.doneAt ? " on" : ""), d && d.doneAt ? I.check : k + 1), l.title, d && d.doneAt ? "пройден · мини-проверка ".concat(d.correct, "/").concat(d.total) : l.checkIds.length ? l.checkIds.length + " мини-проверки" : "справочный урок", () => app.nav.push("lesson", { id: l.id }));
    }), Row, practice5.length + " заданий в банке · сразу проверка и разбор", () => app.nav.push("practice", { title: b.title, key: "block:" + b.id, ids: practice5.map((q) => q.id), n: 15, lv }), b.id === "irregular" ? html(_z3 || (_z3 = __template(["<", ' title="Формы V1 → V2 → V3" sub="120 глаголов в трёх направлениях" onClick=', "/>"])), Row, () => app.nav.push("irregularForms")) : null, b.lessons.filter((l) => practice5.some((q) => q.sub === l.id)).map((l) => html(_A3 || (_A3 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, "p" + l.id, "Тема: " + l.title, practice5.filter((q) => q.sub === l.id).length + " заданий", () => app.nav.push("practice", { title: l.title, key: "lesson:" + l.id, ids: practice5.filter((q) => q.sub === l.id).map((q) => q.id), n: 10, lv }))), Row, sess ? "Продолжить контрольную" : "Начать контрольную", TEST_BY_ID["block:" + b.id].size + " заданий из банка " + b.questions.length + " · Exam Mode", () => app.nav.push("examIntro", { testId: "block:" + b.id }), evs.length ? html(_B3 || (_B3 = __template(['<div class="cardx"><p class="small2">Ответов: ', ", ошибок: ", '.</p><button class="link" onClick=', ">Открыть карту ошибок блока</button></div>"])), evs.length, wrong.length, () => app.nav.push("errors", { module: b.id })) : html(_C3 || (_C3 = __template(['<div class="empty">Ошибок пока нет: начните с урока или тренировки.</div>']))), Screen);
  }
  var _E3, _F3, _G3, _H3, _I3, _J3, _K2, _L2, _M2, _N2, _O2, _P2, _Q2, _R2, _S2, _T2, _U2, _V;
  function Body({ blocks }) {
    return html(_V || (_V = __template(['<div class="lesson">', "</div>"])), blocks.map((b, i) => {
      switch (b.k) {
        case "p":
          return html(_E3 || (_E3 = __template(["<p key=", ">", "</p>"])), i, rich(b.t));
        case "h":
          return html(_F3 || (_F3 = __template(["<h4 key=", ">", "</h4>"])), i, b.t);
        case "f":
          return html(_G3 || (_G3 = __template(["<div key=", ' class="formula" lang="en">', "</div>"])), i, b.t);
        case "tip":
          return html(_H3 || (_H3 = __template(["<div key=", ' class="tip">', "</div>"])), i, rich(b.t));
        case "warn":
          return html(_I3 || (_I3 = __template(["<div key=", ' class="warnb">', "</div>"])), i, rich(b.t));
        case "tb":
          return html(_N2 || (_N2 = __template(["<div key=", '><div class="tblw"><table><thead><tr>', "</tr></thead><tbody>", "</tbody></table></div>", "</div>"])), i, b.head.map((c, j) => html(_J3 || (_J3 = __template(["<th key=", ">", "</th>"])), j, c)), b.rows.map((r, j) => html(_L2 || (_L2 = __template(["<tr key=", ">", "</tr>"])), j, r.map((c, k) => html(_K2 || (_K2 = __template(["<td key=", " lang=", ">", "</td>"])), k, /[а-яё]/i.test(c) ? "ru" : "en", rich(c))))), b.note ? html(_M2 || (_M2 = __template(['<p class="tblnote">', "</p>"])), b.note) : null);
        case "ex":
          return html(_Q2 || (_Q2 = __template(["<div key=", ' class="exs">', "</div>"])), i, b.rows.map((r, j) => html(_P2 || (_P2 = __template(["<div key=", '><div class="e" lang="en">', '</div><div class="r">', "</div>", "</div>"])), j, r[0], r[1], r[2] ? html(_O2 || (_O2 = __template(['<div class="n">', "</div>"])), r[2]) : null)));
        case "tl":
          return html(_U2 || (_U2 = __template(["<div key=", '><div class="tline" role="img" aria-label=', '>\n          <div class="ax"></div>', "\n          ", '\n        </div><p class="tcap">', "</p></div>"])), i, b.caption, b.now != null ? html(_R2 || (_R2 = __template(['<div class="now" style=', "></div>"])), { left: b.now + "%" }) : null, b.marks.map((m, j) => m.from != null ? html(_S2 || (_S2 = __template(["<div key=", '><div class="sp" style=', '></div><div class="lb" style=', ' lang="en">', "</div></div>"])), j, { left: m.from + "%", width: m.to - m.from + "%" }, { left: (m.from + m.to) / 2 + "%" }, m.t) : html(_T2 || (_T2 = __template(["<div key=", '><div class="pt" style=', '></div><div class="lb" style=', ' lang="en">', "</div></div>"])), j, { left: m.at + "%" }, { left: m.at + "%", top: j % 2 * 18 + "px" }, m.t)), b.caption);
        default:
          return null;
      }
    }));
  }
  var _W, _X, _Y, _Z, __;
  function LessonScreen({ params }) {
    let app = useApp(), l = LESSON_BY_ID[params.id], b = BLOCK_BY_ID[l.module], k = b.lessons.findIndex((x) => x.id === l.id), next = b.lessons[k + 1], d = (app.docs.course || {}).lessons && app.docs.course.lessons[l.id], markRead = () => app.setDoc("course", (c) => (c = Object.assign({ lessons: {} }, c), c.lessons = Object.assign({}, c.lessons, { [l.id]: Object.assign({}, c.lessons[l.id], { doneAt: Date.now(), correct: 0, total: 0 }) }), c)), footer = l.checkIds.length ? html(_W || (_W = __template(['<button class="btn btn-dark" onClick=', ">Мини-проверка (", ")</button>"])), () => app.nav.push("practice", { title: "Мини-проверка: " + l.title, key: "check:" + l.id, ids: l.checkIds, n: l.checkIds.length, lessonId: l.id, lv: LV(b.n), noRequeue: !1 }), l.checkIds.length) : html(_X || (_X = __template(['<button class="btn btn-dark" onClick=', ">Отметить как прочитанный</button>"])), () => {
      markRead(), app.nav.back();
    });
    return html(__ || (__ = __template(["<", " lv=", " title=", " sub=", " onBack=", " scrollKey=", " footer=", '>\n    <div class="banner learn">Цель: ', "</div>\n    <", " blocks=", "/>\n    ", "\n    ", "\n  </", ">"])), Screen, LV(b.n), l.title, b.title + " · урок " + (k + 1) + "/" + b.lessons.length, app.nav.back, l.id, footer, l.goal, Body, l.body, d && d.doneAt ? html(_Y || (_Y = __template(['<div class="banner warn">Урок пройден', ". Мини-проверку можно пройти ещё раз — в статистику mastery идёт только первая попытка по каждому вопросу.</div>"])), d.total ? ": мини-проверка ".concat(d.correct, "/").concat(d.total) : "") : null, next ? html(_Z || (_Z = __template(["<", " title=", " onClick=", "/>"])), Row, "Следующий урок: " + next.title, () => app.nav.replace("lesson", { id: next.id })) : null, Screen);
  }
  var _$, _aa, _ba, _ca, _da, _ea, _fa, _ga;
  function PracticeScreen({ params }) {
    let app = useApp(), sid = "learn:" + params.key, [sess, setSess] = useState(() => {
      let s = app.sessions[sid];
      return s && !s.done && s.queue.every((id) => Q_BY_ID[id]) ? s : createLearning(params.key, params.ids.map((id) => Q_BY_ID[id]).filter(Boolean), params.n || 10, app.docs.qstats || {});
    }), t0 = useRef(Date.now());
    useEffect(() => {
      app.putSession(sess);
    }, [sess]), useEffect(() => {
      t0.current = Date.now();
    }, [sess.pos]);
    let qid = sess.queue[sess.pos], q = qid ? Q_BY_ID[qid] : null, value = sess.response, update = (patch) => setSess((s) => Object.assign({}, s, patch)), check = () => {
      if (!q || sess.checked || !isAnswered(q, value)) return;
      let res = scoreQuestion(q, value), prev = (app.docs.qstats || {})[q.id], retry = sess.requeued.includes(q.id) && sess.queue.indexOf(q.id) !== sess.pos;
      app.sfx(res.correct ? "ok" : "bad"), app.addEvent(makeEvent({ q, response: value, result: res, mode: "learning", attemptId: sess.id + ":" + sess.startedAt, testId: null, timeSpentMs: Date.now() - t0.current, firstAttempt: !prev, retry })), app.setDoc("qstats", (st) => {
        st = Object.assign({}, st);
        let o = st[q.id] || { n: 0, ok: 0 };
        return st[q.id] = { n: o.n + 1, ok: o.ok + (res.correct ? 1 : 0), firstOk: o.firstOk == null ? res.correct : o.firstOk, last: Date.now() }, st;
      });
      let s = Object.assign({}, sess, {
        checked: !0,
        result: res,
        correct: sess.correct + (res.correct ? 1 : 0),
        wrong: sess.wrong + (res.correct ? 0 : 1),
        answers: Object.assign({}, sess.answers, { [sess.pos]: { qid, ok: res.correct } })
      });
      !res.correct && !params.lessonId && (s = requeue(s, q.id)), setSess(s);
    }, next = () => {
      let pos = sess.pos + 1, done2 = pos >= sess.queue.length;
      done2 && (app.sfx("finish"), params.lessonId && app.setDoc("course", (c) => (c = Object.assign({ lessons: {} }, c), c.lessons = Object.assign({}, c.lessons, { [params.lessonId]: { doneAt: Date.now(), correct: sess.correct, total: sess.correct + sess.wrong } }), c))), setSess(Object.assign({}, sess, { pos, response: null, checked: !1, result: null, done: done2 }));
    }, restart = () => {
      let s = createLearning(params.key, params.ids.map((id) => Q_BY_ID[id]).filter(Boolean), params.n || 10, app.docs.qstats || {});
      app.putSession(s), setSess(s);
    };
    if (sess.done) return html(_aa || (_aa = __template(["<", " lv=", " title=", " onBack=", " footer=", '>\n    <div class="sum"><h2>Тренировка завершена</h2><div class="kpis"><div class="k-ok"><span class="v">', '</span><span class="l">верно</span></div><div class="k-bad"><span class="v">', '</span><span class="l">', '</span></div><div class="k-n"><span class="v">', '%</span><span class="l">точность</span></div></div>\n      <p class="small2">Это тренировочный результат, а не экзаменационный. Ошибки уже вернулись в очередь внутри тренировки и чаще будут попадаться в следующих сессиях.</p></div>\n  </', ">"])), Screen, params.lv, params.title, () => {
      app.delSession(sid), app.nav.back();
    }, html(_$ || (_$ = __template(['<button class="btn btn-dark" onClick=', '>Ещё одна тренировка</button><button class="btn btn-light" onClick=', ">Готово</button>"])), restart, () => {
      app.delSession(sid), app.nav.back();
    }), sess.correct, sess.wrong, plural(sess.wrong, "ошибка", "ошибки", "ошибок"), pct(sess.correct, sess.correct + sess.wrong), Screen);
    let footer = sess.checked ? html(_ca || (_ca = __template(['<button class="btn btn-dark" onClick=', ">Дальше</button>"])), next) : html(_ba || (_ba = __template(['<button class="btn btn-dark" disabled=', " onClick=", ">Проверить</button>"])), !isAnswered(q, value), check);
    return html(_ga || (_ga = __template(["<", " lv=", " title=", " sub=", " onBack=", " scrollKey=", " footer=", "\n      right=", '>\n    <div class="banner learn">Learning Mode: проверка сразу после ответа. Это тренировка, не экзамен.</div>\n    <', " key=", " q=", " perm=", " value=", " onChange=", " checked=", " learning=", " onEnter=", "/>\n    ", "\n  </", ">"])), Screen, params.lv, params.title, "Задание " + (sess.pos + 1) + " из " + sess.queue.length, app.nav.back, sess.pos, footer, html(_da || (_da = __template(['<button class="ib" aria-label="Начать заново" onClick=', ">", "</button>"])), restart, I.restart), QuestionView, sess.pos, q, sess.perms[q.id], value, (v) => !sess.checked && update({ response: v }), sess.checked, !0, () => sess.checked ? next() : check(), sess.checked ? html(_fa || (_fa = __template(["<div style=", "><", " q=", " value=", " result=", " onLesson=", "/>", "</div>"])), { marginTop: "14px" }, Explain, q, value, sess.result, (id) => app.nav.push("lesson", { id }), !sess.result.correct && !params.lessonId ? html(_ea || (_ea = __template(['<p class="small2">Это задание вернётся через несколько шагов.</p>']))) : null) : null, Screen);
  }
  var _ha;
  function IrregularForms() {
    let app = useApp(), b = BLOCK_BY_ID.irregular, dir = (d) => b.questions.filter((q) => q.drill === d).map((q) => q.id), ctx = b.questions.filter((q) => q.kind === "practice" && !q.drill).map((q) => q.id);
    return html(_ha || (_ha = __template(["<", " lv=", ' title="Формы неправильных глаголов" onBack=', '>\n    <p class="hint">В скобках дан перевод — он снимает неоднозначность (found: находить / основывать). Принимаются стандартные варианты: learnt/learned, got/gotten.</p>\n    <', ' title="V1 → V2" sub="Past Simple" onClick=', "/>\n    <", ' title="V1 → V3" sub="Past Participle" onClick=', "/>\n    <", ' title="V2/V3 → V1" sub="узнать инфинитив" onClick=', "/>\n    <", ' title="Формы в предложениях" sub=', " onClick=", '/>\n    <div class="cardx" style=', '><h3>Произношение</h3><p class="small2">Режим диктовки и проверки произношения не включён: офлайн браузер не может надёжно распознать речь. Произношение форм разобрано в уроке «Произношение форм и окончание -ed».</p></div>\n  </', ">"])), Screen, 2, app.nav.back, Row, () => app.nav.push("practice", { title: "V1 → V2", key: "irr:v1v2", ids: dir("v1v2"), n: 20, lv: 2 }), Row, () => app.nav.push("practice", { title: "V1 → V3", key: "irr:v1v3", ids: dir("v1v3"), n: 20, lv: 2 }), Row, () => app.nav.push("practice", { title: "V2/V3 → V1", key: "irr:back", ids: dir("back"), n: 20, lv: 2 }), Row, ctx.length + " контекстных заданий", () => app.nav.push("practice", { title: "Глаголы в контексте", key: "irr:ctx", ids: ctx, n: 15, lv: 2 }), { marginTop: "12px" }, Screen);
  }

  // src/ui/exam.js
  var _a4, _b4, _c4, _d4, _e4, _f4, _g4, _h4;
  function TestsTab({ nav }) {
    let app = useApp(), open = Object.values(app.sessions).filter((s) => s.id.startsWith("exam:") && s.attempt), last = (id) => {
      let a = app.attempts.filter((x) => x.testId === id).sort((a2, b) => b.finishedAt - a2.finishedAt)[0];
      return a ? "последний результат ".concat(a.pct, "% (").concat(a.score, "/").concat(a.total, ")") : "ещё не проходили";
    }, recent = app.attempts.slice().sort((a, b) => b.finishedAt - a.finishedAt).slice(0, 8);
    return html(_h4 || (_h4 = __template(["<", " bare nav=", '>\n    <div class="home-head"><div><h1>Контрольные</h1><p>Exam Mode: без подсказок до завершения, можно возвращаться и менять ответы. Каждая попытка — новый вариант из банка.</p></div></div>\n    ', '\n    <h2 class="h2">По блокам</h2>\n    ', '\n    <h2 class="h2">Общие</h2>\n    ', '\n    <h2 class="h2">Словари</h2>\n    ', '\n    <h2 class="h2">История</h2>\n    ', "\n  </", ">"])), Screen, nav, open.length ? html(_b4 || (_b4 = __template(['<h2 class="h2">Незавершённые</h2>', ""])), open.map((s) => html(_a4 || (_a4 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, s.id, s.attempt.title, "заполнено ".concat(filledCount(s.attempt), " из ").concat(s.attempt.items.length, " · начато ").concat(fmtDT(s.attempt.startedAt)), () => app.nav.push("exam", { testId: s.attempt.testId })))) : null, BLOCKS.map((b) => html(_c4 || (_c4 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, b.id, b.n + ". " + b.title, TEST_BY_ID["block:" + b.id].size + " заданий · " + last("block:" + b.id), () => app.nav.push("examIntro", { testId: "block:" + b.id }))), ["theory", "cases", "mixed"].map((id) => html(_d4 || (_d4 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, id, TEST_BY_ID[id].title, TEST_BY_ID[id].size + " заданий · " + last(id), () => app.nav.push("examIntro", { testId: id }))), DICTS.map((d) => html(_e4 || (_e4 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, d.id, "Полный контрольный: " + d.title, d.words.length + " слов без подсказок · а также итоговые 50/50 по наборам", () => app.nav.push("vocabFull", { dict: d.id }))), recent.length ? recent.map((a) => html(_f4 || (_f4 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, a.id, a.title, "".concat(fmtDT(a.finishedAt), " · ").concat(a.score, "/").concat(a.total, " (").concat(a.pct, "%)"), () => app.nav.push(a.kind === "vocab" ? "vocabResult" : "results", { id: a.id }))) : html(_g4 || (_g4 = __template(['<div class="empty">Пока нет завершённых контрольных.</div>']))), Screen);
  }
  var _i4, _j4, _k4, _l4;
  function ExamIntro({ params }) {
    let app = useApp(), def = TEST_BY_ID[params.testId], sess = app.sessions["exam:" + def.id], [confirm, setConfirm] = useState(!1), bank = new Set(def.parts.flatMap((p2) => p2.pool.map((q) => q.id))).size, seen = Object.keys((app.docs.exposure || {})[def.id] || {}).length, start = () => {
      let att = createAttempt(def, (app.docs.exposure || {})[def.id] || {}, { contentVersion: CONTENT_VERSION });
      app.putSession({ id: "exam:" + def.id, attempt: att }), app.nav.replace("exam", { testId: def.id });
    };
    return html(_l4 || (_l4 = __template(["<", ' title="Контрольная" onBack=', " footer=", '>\n    <div class="intro"><span class="ring"></span><h2>', "</h2>\n      <p>", " заданий из банка в ", ". Сначала выбираются задания, которых вы ещё не видели в этом тесте (сейчас знакомо ", "), с балансом по темам, форматам и сложности.</p>\n      <p>Во время теста правильность не показывается. Можно переходить между заданиями и менять ответы. После завершения — оценка, правильные ответы, объяснения и карта причин ошибок.</p>\n      <p>Ответы сохраняются после каждого действия: тест можно закрыть и продолжить позже.</p></div>\n    ", "\n  </", ">"])), Screen, app.nav.back, sess ? html(_i4 || (_i4 = __template(['<button class="btn btn-dark" onClick=', ">Продолжить (", "/", ')</button><button class="btn btn-light" onClick=', ">Начать новую попытку</button>"])), () => app.nav.replace("exam", { testId: def.id }), filledCount(sess.attempt), sess.attempt.items.length, () => setConfirm(!0)) : html(_j4 || (_j4 = __template(['<button class="btn btn-dark" onClick=', ">Начать</button>"])), start), def.title, def.size, bank, seen, confirm ? html(_k4 || (_k4 = __template(["<", " onClose=", ' label="Новая попытка"><h2>Начать заново?</h2><p>Незавершённая попытка будет удалена без оценки.</p>\n      <div class="stack-btns"><button class="btn btn-bad" onClick=', '>Удалить и начать новую</button><button class="btn btn-light" onClick=', ">Отмена</button></div></", ">"])), Sheet, () => setConfirm(!1), () => {
      app.delSession("exam:" + def.id), setConfirm(!1), start();
    }, () => setConfirm(!1), Sheet) : null, Screen);
  }
  var _m4, _n4, _o4, _p4, _q4, _r4, _s4;
  function ExamRun({ params }) {
    let app = useApp(), sid = "exam:" + params.testId, s0 = app.sessions[sid], [att, setAtt] = useState(s0 ? s0.attempt : null), [sheet, setSheet] = useState(null), shownAt = useRef(Date.now());
    if (useEffect(() => {
      att && app.putSession({ id: sid, attempt: att });
    }, [att]), useEffect(() => {
      let flush = () => {
        document.hidden && addTime();
      };
      return document.addEventListener("visibilitychange", flush), () => document.removeEventListener("visibilitychange", flush);
    }), !att) return html(_m4 || (_m4 = __template(["<", ' title="Контрольная" onBack=', '><div class="empty">Попытка не найдена — возможно, она уже завершена.</div></', ">"])), Screen, app.nav.back, Screen);
    let n = att.items.length, it = att.items[att.idx], q = att.snapshot[it.qid], filled = filledCount(att);
    function addTime(patch = {}) {
      let dt = Date.now() - shownAt.current;
      shownAt.current = Date.now(), setAtt((a) => Object.assign({}, a, patch, { timeSpent: Object.assign({}, a.timeSpent, { [it.qid]: (a.timeSpent[it.qid] || 0) + dt }), updatedAt: Date.now() }));
    }
    let go = (i) => addTime({ idx: Math.max(0, Math.min(n - 1, i)) }), setResp = (v) => setAtt((a) => Object.assign({}, a, { responses: Object.assign({}, a.responses, { [it.qid]: v }), updatedAt: Date.now() })), doFinish = () => {
      let dt = Date.now() - shownAt.current, a2 = Object.assign({}, att, { timeSpent: Object.assign({}, att.timeSpent, { [it.qid]: (att.timeSpent[it.qid] || 0) + dt }) }), { attempt, events } = finish(a2);
      app.commitAttempt(attempt, events, sid), app.sfx(attempt.pct === 100 ? "done" : "finish"), app.nav.replace("results", { id: attempt.id });
    }, nextEmpty = () => {
      for (let k = 1; k <= n; k++) {
        let j = (att.idx + k) % n;
        if (!isAnswered(att.snapshot[att.items[j].qid], att.responses[att.items[j].qid])) return j;
      }
      return -1;
    }, footer = html(_n4 || (_n4 = __template(['<div class="nav3"><button class="btn btn-light" disabled=', " onClick=", ' aria-label="Назад">', '</button>\n    <button class="btn btn-light mid" onClick=', ">", "", " / ", '</button>\n    <button class="btn btn-light" disabled=', " onClick=", ' aria-label="Вперёд">', '</button></div>\n    <button class="btn btn-dark" onClick=', ">Завершить тест</button>"])), att.idx === 0, () => go(att.idx - 1), I.left, () => setSheet("grid"), I.grid, filled, n, att.idx === n - 1, () => go(att.idx + 1), I.right, () => setSheet("finish"));
    return html(_s4 || (_s4 = __template(["<", " title=", " sub=", " onBack=", " scrollKey=", " footer=", '>\n    <div class="banner exam">Exam Mode: ответы проверяются только после завершения. Ответы сохранены.</div>\n    <div class="learned" style=', "><span>Заполнено <b>", "</b> из ", '</span><span class="pbar"><i style=', "></i></span></div>\n    <", " key=", " q=", " perm=", " value=", " onChange=", " checked=", " learning=", " onEnter=", "/>\n    ", "\n    ", "\n    ", "\n  </", ">"])), Screen, att.title, "Задание " + (att.idx + 1) + " из " + n, () => {
      addTime(), app.nav.back();
    }, att.idx, footer, { marginBottom: "12px" }, filled, n, { width: filled / n * 100 + "%" }, QuestionView, it.qid, q, it.perm, att.responses[it.qid], setResp, !1, !1, () => go(att.idx + 1), (() => {
      let ne = nextEmpty();
      return ne >= 0 && ne !== att.idx + 1 && ne !== att.idx ? html(_o4 || (_o4 = __template(['<button class="btn btn-light" style=', " onClick=", ">К следующему незаполненному — № ", "</button>"])), { width: "100%", marginTop: "14px", minHeight: "46px" }, () => go(ne), ne + 1) : null;
    })(), sheet === "grid" ? html(_q4 || (_q4 = __template(["<", " onClose=", ' label="Все задания"><h2>Все задания</h2><p>Заполнено ', " из ", '.</p>\n      <div class="grid">', '</div>\n      <button class="btn btn-light" onClick=', ">Закрыть</button></", ">"])), Sheet, () => setSheet(null), filled, n, att.items.map((x, i) => html(_p4 || (_p4 = __template(["<button key=", " class=", " onClick=", ">", "</button>"])), x.qid, "cell" + (i === att.idx ? " cur" : "") + (isAnswered(att.snapshot[x.qid], att.responses[x.qid]) ? " filled" : ""), () => {
      go(i), setSheet(null);
    }, i + 1)), () => setSheet(null), Sheet) : null, sheet === "finish" ? html(_r4 || (_r4 = __template(["<", " onClose=", ' label="Завершить"><h2>Завершить тест?</h2>\n      <p>', 'После завершения ответы изменить нельзя.</p>\n      <div class="stack-btns"><button class="btn btn-dark" onClick=', '>Завершить и проверить</button><button class="btn btn-light" onClick=', ">Вернуться к ответам</button></div></", ">"])), Sheet, () => setSheet(null), filled < n ? "Не заполнено ".concat(n - filled, " ").concat(plural(n - filled, "задание", "задания", "заданий"), " — они будут засчитаны как неверные. ") : "", doFinish, () => setSheet(null), Sheet) : null, Screen);
  }
  var _t4, _u4, _v4;
  function TagSummary({ events }) {
    let wrong = events.filter((e) => !e.isCorrect), c = {};
    wrong.forEach((e) => (e.errorTags || ["UNCLASSIFIED"]).forEach((t) => {
      c[t] = (c[t] || 0) + 1;
    }));
    let rows = Object.entries(c).sort((a, b) => b[1] - a[1]);
    return rows.length ? html(_v4 || (_v4 = __template(["<div>", '\n    <p class="small2">Причина — «вероятная»: она взята из разметки выбранного варианта или правила для введённого ответа. Ошибки без надёжного признака помечены «Не классифицировано».</p></div>'])), rows.map(([t, k]) => html(_u4 || (_u4 = __template(["<div key=", ' class="hbar"><span>', '</span><span class="t"><i style=', "></i></span><b>", "</b></div>"])), t, ERROR_TAGS[t] || t, { width: k / wrong.length * 100 + "%" }, k))) : html(_t4 || (_t4 = __template(['<div class="empty">Ошибок нет.</div>'])));
  }
  var _w4, _x4, _y4, _z4, _A4, _B4, _C4;
  function Results({ params }) {
    let app = useApp(), a = app.attempts.find((x) => x.id === params.id), [open, setOpen] = useState(null);
    if (!a) return html(_w4 || (_w4 = __template(["<", ' title="Результат" onBack=', '><div class="empty">Попытка не найдена.</div></', ">"])), Screen, app.nav.back, Screen);
    let evs = app.events.filter((e) => e.attemptId === a.id), weak = Object.entries(groupBy(evs.filter((e) => !e.isCorrect), (e) => e.lessonId || e.subtopicId)).sort((x, y) => y[1].length - x[1].length);
    return html(_C4 || (_C4 = __template(["<", ' title="Результат" sub=', " onBack=", " footer=", '>\n    <div class="sum"><h2>', '</h2>\n      <div class="kpis"><div class="k-ok"><span class="v">', '</span><span class="l">из ', ' верно</span></div><div class="k-bad"><span class="v">', '</span><span class="l">', '</span></div><div class="k-n"><span class="v">', '%</span><span class="l">результат</span></div></div>\n      <p class="small2">', " · длительность ", " · банк ", '</p></div>\n    <h2 class="h2">Карта причин ошибок</h2><', " events=", '/>\n    <h2 class="h2">Слабые темы и рекомендации</h2>\n    ', '\n    <h2 class="h2">Все задания с разбором</h2>\n    ', "\n  </", ">"])), Screen, a.title, app.nav.back, a.testId ? html(_x4 || (_x4 = __template(['<button class="btn btn-dark" onClick=', ">Ретест: новые задания</button>"])), () => app.nav.replace("examIntro", { testId: a.testId })) : null, a.pct === 100 ? "Идеально!" : "Тест завершён", a.score, a.total, a.total - a.score, plural(a.total - a.score, "ошибка", "ошибки", "ошибок"), a.pct, fmtDT(a.finishedAt), fmtDur(a.durationMs || 0), a.contentVersion, TagSummary, evs, weak.length ? weak.slice(0, 6).map(([lid, es]) => {
      let l = LESSON_BY_ID[lid];
      return html(_y4 || (_y4 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, lid, l ? l.title : lid, "".concat(es.length, " ").concat(plural(es.length, "ошибка", "ошибки", "ошибок"), " · повторите урок, затем тренировку по теме"), () => l && app.nav.push("lesson", { id: l.id }));
    }) : html(_z4 || (_z4 = __template(['<div class="empty">Слабых тем в этой попытке нет.</div>']))), a.items.map((it, i) => {
      let q = a.snapshot[it.qid], r = a.results[it.qid], on = open === i;
      return html(_B4 || (_B4 = __template(["<div key=", ' class="cardx"><button class="row" style=', " onClick=", ">\n        <span class=", " style=", ">", '</span>\n        <span class="rt"><b>', ". ", "</b></span></button>\n        ", "</div>"])), it.qid, { border: "none", padding: "0", minHeight: "auto", background: "none" }, () => setOpen(on ? null : i), "chk" + (r.correct ? " on" : ""), r.correct ? null : { background: "var(--bad)", borderColor: "var(--bad-line)", color: "var(--bad-ink)" }, r.correct ? I.check : I.bad, i + 1, q.prompt.length > 80 ? q.prompt.slice(0, 80) + "…" : q.prompt, on ? html(_A4 || (_A4 = __template(["<div style=", "><", " q=", " perm=", " value=", " onChange=", " checked=", " learning=", "/><div style=", "><", " q=", " value=", " result=", " onLesson=", "/></div></div>"])), { marginTop: "12px" }, QuestionView, q, it.perm, a.responses[it.qid], () => {
      }, !0, !0, { marginTop: "10px" }, Explain, q, a.responses[it.qid], r, (id) => app.nav.push("lesson", { id })) : null);
    }), Screen);
  }

  // src/ui/vocab.js
  var VCtx = createContext(null), useV = () => useContext(VCtx), plainSentence = (w) => w.exampleSentence.replace(/\[\[(.+?)\]\]/g, "$1"), cap = (s) => s.charAt(0).toUpperCase() + s.slice(1), clozeList = (w) => w.clozeAnswers || w.acceptedEnglishAnswers, _a5, _b5, Extra = ({ w }) => html(_b5 || (_b5 = __template(['<div class="extra">', "</div>"])), (w.extraExamples || []).map((s, i) => html(_a5 || (_a5 = __template(["<p key=", '><span class="ex" lang="en">', "</span></p>"])), i, s))), LEVELS = [
    { n: 1, title: "Найди пару", desc: "Соедините слово с переводом" },
    { n: 2, title: "Выбери перевод", desc: "Один верный вариант из четырёх" },
    { n: 3, title: "Вспомни перевод", desc: "Карточки с самопроверкой" },
    { n: 4, title: "Заполни пропуск", desc: "Слово в предложении" },
    { n: 5, title: "Переведи наоборот", desc: "С русского на английский" },
    { n: 6, title: "Найди ошибку", desc: "Верен ли перевод?" }
  ];
  function freshSet() {
    let levels = {};
    for (let i = 1; i <= 6; i++) levels[i] = { learned: [], size: 10, runs: 0, session: null };
    return { v: 1, stats: {}, levels, test: { current: null, history: [] } };
  }
  var sanitize = (s) => {
    let f3 = freshSet();
    if (!s) return f3;
    let o = Object.assign(f3, s);
    return o.levels = Object.assign(freshSet().levels, s.levels || {}), o.test = Object.assign({ current: null, history: [] }, s.test || {}), o.stats = s.stats || {}, o;
  };
  function pickWords(WORDS, state, level, n) {
    let learned = new Set(state.levels[level].learned), keyed = WORDS.map((w) => {
      let st = state.stats[w.id] || { c: 0, w: 0 }, wt = 1 + 2.2 * Math.min(st.w, 5) + (learned.has(w.id) ? 0 : 1.2) - Math.min(st.c, 5) * 0.15;
      return wt = Math.max(0.3, wt), { id: w.id, k: Math.pow(Math.random(), 1 / wt) };
    });
    return keyed.sort((a, b) => b.k - a.k), keyed.slice(0, n).map((x) => x.id);
  }
  function distractors(WORDS, BY, target, n, field) {
    let t = BY[target], ok = (w) => w.id !== target && !(t.group && w.group === t.group) && w[field] !== t[field], pool = shuffle(WORDS.filter((w) => ok(w) && w.category === t.category));
    return pool.length < n && (pool = pool.concat(shuffle(WORDS.filter((w) => ok(w) && w.category !== t.category)))), pool.slice(0, n).map((w) => w.id);
  }
  function record(s, level, id, ok) {
    let st = s.stats[id] || (s.stats[id] = { c: 0, w: 0 });
    ok ? st.c++ : st.w++, ok && !s.levels[level].learned.includes(id) && s.levels[level].learned.push(id);
  }
  function newQueueSession(WORDS, s, lv, extra) {
    let ids = pickWords(WORDS, s, lv, s.levels[lv].size);
    s.levels[lv].session = Object.assign({ queue: ids, pos: 0, correct: 0, wrong: 0, requeued: [], ans: null, done: !1 }, extra ? extra(ids) : {}), s.levels[lv].runs++;
  }
  function advance(s, lv) {
    let ss = s.levels[lv].session;
    ss.pos++, ss.ans = null, ss.pos >= ss.queue.length && (ss.done = !0);
  }
  function answerQ(s, lv, id, ok, ans) {
    let ss = s.levels[lv].session;
    if (record(s, lv, id, ok), ok) ss.correct++;
    else if (ss.wrong++, !ss.requeued.includes(id)) {
      ss.requeued.push(id);
      let at = Math.min(ss.queue.length, ss.pos + 3 + Math.floor(Math.random() * 3));
      ss.queue.splice(at, 0, id);
    }
    ss.ans = Object.assign({ ok }, ans);
  }
  function buildSets(BY, ids) {
    let sets2 = [], rest = ids.slice();
    for (; rest.length; ) {
      let size = rest.length <= 8 ? rest.length : 6, set = [];
      for (let i = 0; i < rest.length && set.length < size; ) {
        let w = BY[rest[i]];
        !w.group || !set.some((x) => BY[x].group === w.group) ? (set.push(rest[i]), rest.splice(i, 1)) : i++;
      }
      set.length || set.push(rest.shift()), sets2.push({ ids: set, ru: shuffle(set), matched: [] });
    }
    return sets2;
  }
  function classifyVocab(input, w, words) {
    let n = norm(input);
    if (!n) return ["UNCLASSIFIED"];
    let acc = w.acceptedEnglishAnswers.concat(w.clozeAnswers || []);
    return w.v2 && [...w.v2, ...w.v3, w.v1].some((f3) => norm(f3) === n) ? ["FORM"] : w.v1 && (n === norm(w.v1) + "ed" || n === norm(w.v1) + "d") ? ["FORM"] : isSpellingSlip(input, acc) ? ["SPELLING"] : words.some((x) => x.id !== w.id && x.acceptedEnglishAnswers.some((a) => norm(a) === n)) ? ["VOCAB_MEANING"] : ["UNCLASSIFIED"];
  }
  function useSetModel(setId) {
    let app = useApp(), set = SET_BY_ID[setId], dict = DICT_BY_ID[set.dict], key = "vocab:" + setId, state = useMemo(() => sanitize(app.docs[key]), [app.docs[key]]), update = useCallback((fn) => app.setDoc(key, (s) => {
      let n = JSON.parse(JSON.stringify(sanitize(s)));
      return fn(n), n.updatedAt = Date.now(), n;
    }), [key]), WORDS = set.words, BY = useMemo(() => Object.fromEntries(WORDS.map((w) => [w.id, w])), [setId]), t0 = useRef(Date.now()), log = (w, lv, ok, user, correct, mode = "learning", attemptId, tags) => {
      app.addEvent({
        id: uid("ev"),
        attemptId: attemptId || "vocab:".concat(setId, ":L").concat(lv, ":").concat((state.levels[lv] || { runs: 0 }).runs),
        testId: mode === "exam" ? "vocab:" + setId : null,
        questionId: w.id,
        questionVersion: 1,
        moduleId: "vocab-" + dict.id,
        subtopicId: setId + ":L" + lv,
        lessonId: null,
        kind: "vocab",
        format: "vocab-L" + lv,
        level: w.level || "B2",
        difficulty: 1,
        mode,
        ts: Date.now(),
        timestamp: iso(Date.now()),
        userAnswer: user || "",
        userAnswerNorm: norm(user || ""),
        correctAnswer: correct || "",
        isCorrect: ok,
        score: ok ? 1 : 0,
        timeSpentMs: Date.now() - t0.current,
        errorTags: ok ? [] : tags || ["VOCAB_MEANING"],
        explanationId: w.id,
        firstAttempt: !state.stats[w.id],
        retry: !1
      }), t0.current = Date.now();
    };
    return { app, set, dict, state, update, WORDS, BY, TOTAL: WORDS.length, sfx: app.sfx, log, setId };
  }
  var _c5, _d5;
  function VocabSet({ params }) {
    let app = useApp(), set = SET_BY_ID[params.setId], dict = DICT_BY_ID[set.dict], st = sanitize(app.docs["vocab:" + set.id]), total = set.words.length, hist = st.test.history, best = hist.length ? Math.max(...hist.map((h5) => h5.score)) : null;
    return html(_d5 || (_d5 = __template(["<", " title=", " sub=", " onBack=", '>\n    <div class="lv-list">\n      ', '\n      <button class="lv-card final" onClick=', '><span class="lv-num">7</span>\n        <span><h3>Итоговая проверка ', "/", "</h3><p>", '</p><span class="lv-prog">', "</span></span></button>\n    </div>\n  </", ">"])), Screen, dict.title, "Слова ".concat(set.from, "–").concat(set.to), app.nav.back, LEVELS.map((l) => {
      let n = st.levels[l.n].learned.length;
      return html(_c5 || (_c5 = __template(["<button key=", " class=", " onClick=", '>\n        <span class="lv-num">', "</span><span><h3>", "</h3><p>", '</p><span class="lv-prog"><span class="pb"><i style=', "></i></span>", "/", "</span></span></button>"])), l.n, "lv-card lv-" + l.n, () => app.nav.push("vocabLevel", { setId: set.id, lv: l.n }), l.n, l.title, l.desc, { width: n / total * 100 + "%" }, n, total);
    }), () => app.nav.push("vocabFinal", { setId: set.id }), total, total, st.test.current ? "Тест продолжается" : "Все слова набора без подсказок", best != null ? "Лучший результат: ".concat(best, "/").concat(total) : "Попыток пока не было", Screen);
  }
  var _e5, _f5, _g5, _h5;
  function VocabDict({ params }) {
    let app = useApp(), d = DICT_BY_ID[params.dict];
    return html(_h5 || (_h5 = __template(["<", " title=", " sub=", " onBack=", ">\n    ", "\n    ", "\n    <", " title=", ' sub="весь словарь без подсказок" onClick=', "/>\n    ", "\n  </", ">"])), Screen, d.title, d.short, app.nav.back, d.note ? html(_e5 || (_e5 = __template(['<div class="banner warn">', "</div>"])), d.note) : null, d.sets.map((s) => {
      let st = sanitize(app.docs["vocab:" + s.id]), learned = new Set(Object.values(st.levels).flatMap((L2) => L2.learned)).size;
      return html(_f5 || (_f5 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, s.id, "Набор ".concat(s.from, "–").concat(s.to), "изучено ".concat(learned, " из ").concat(s.words.length, " · 6 уровней + итоговая ").concat(s.words.length, "/").concat(s.words.length), () => app.nav.push("vocabSet", { setId: s.id }));
    }), Row, "Полный контрольный: ".concat(d.words.length, " слов"), () => app.nav.push("vocabFull", { dict: d.id }), d.id === "irregular" ? html(_g5 || (_g5 = __template(["<", ' title="Формы V1 → V2 → V3" sub="тренажёр направлений и контекста" onClick=', "/>"])), Row, () => app.nav.push("irregularForms")) : null, Screen);
  }
  var _i5, _j5, _k5;
  function LevelBar({ level, extra }) {
    let { state, update, TOTAL } = useV(), L2 = state.levels[level], learned = L2.learned.length;
    return html(_k5 || (_k5 = __template(['<div class="lvbar"><div class="chips" role="group" aria-label="Слов в тренировке">', "</div>\n    ", '\n    <div class="learned"><span>Изучено <b>', "</b> из ", '</span><span class="pbar"><i style=', "></i></span></div></div>"])), [10, 20, 50].map((n) => html(_i5 || (_i5 = __template(["<button key=", ' class="chip" aria-pressed=', " onClick=", ">", " слов</button>"])), n, L2.size === n, () => update((s) => {
      s.levels[level].size = n, s.levels[level].session = null;
    }), n)), extra ? html(_j5 || (_j5 = __template(['<div class="chips dir" role="group">', "</div>"])), extra) : null, learned, TOTAL, { width: learned / TOTAL * 100 + "%" });
  }
  var _l5, Count = ({ pos, len }) => html(_l5 || (_l5 = __template(['<div class="cnt"><span>', " / ", '</span><span class="pb"><i style=', "></i></span></div>"])), Math.min(pos + 1, len), len, { width: pos / len * 100 + "%" }), _m5, _n5;
  function Feedback({ ok, children }) {
    let ref = useRef(null);
    return useEffect(() => {
      let t = setTimeout(() => {
        let el = ref.current, sc = el && el.closest(".content");
        if (sc) {
          let r = el.getBoundingClientRect(), s = sc.getBoundingClientRect();
          r.bottom > s.bottom && sc.scrollBy({ top: r.bottom - s.bottom + 16, behavior: "smooth" });
        }
      }, 50);
      return () => clearTimeout(t);
    }, []), html(_n5 || (_n5 = __template(["<div ref=", " class=", ' role="status"><div class="fb-h">', "", "</div>", "</div>"])), ref, "fb " + (ok ? "fb-ok" : "fb-bad"), ok ? I.ok : I.bad, ok ? "Правильно!" : "Ошибка", children ? html(_m5 || (_m5 = __template(['<div class="fb-b">', "</div>"])), children) : null);
  }
  var _o5;
  function SummaryCard({ sess }) {
    let { sfx } = useV();
    return useEffect(() => {
      sfx("finish");
    }, []), html(_o5 || (_o5 = __template(['<div class="sum"><h2>Тренировка завершена</h2><div class="kpis"><div class="k-ok"><span class="v">', '</span><span class="l">', '</span></div><div class="k-bad"><span class="v">', '</span><span class="l">', '</span></div><div class="k-n"><span class="v">', '%</span><span class="l">точность</span></div></div><p class="muted small">Слова с ошибками будут чаще попадаться в следующих тренировках.</p></div>'])), sess.correct, plural(sess.correct, "верный ответ", "верных ответа", "верных ответов"), sess.wrong, plural(sess.wrong, "ошибка", "ошибки", "ошибок"), pct(sess.correct, sess.correct + sess.wrong));
  }
  var _p5, summaryFooter = (again, back) => html(_p5 || (_p5 = __template(['<button class="btn btn-dark" onClick=', '>Ещё одна тренировка</button><button class="btn btn-light" onClick=', ">К уровням</button>"])), again, back), _q5, restartBtn = (fn) => html(_q5 || (_q5 = __template(['<button class="ib" onClick=', ' aria-label="Начать заново">', "</button>"])), fn, I.restart), _r5;
  function VocabLevel({ params }) {
    let m = useSetModel(params.setId), Comp = [null, Match2, Choice, Cards, TypeCloze, TypeReverse, TrueFalse][params.lv];
    return html(_r5 || (_r5 = __template(["<", " value=", "><", "/></", ">"])), VCtx.Provider, m, Comp, VCtx.Provider);
  }
  var T = (lv) => LEVELS[lv - 1].title, _s5, _t5, _u5;
  function Match2() {
    let V2 = useV(), { state, update, WORDS, BY, app } = V2, lv = 1, L2 = state.levels[lv], S2 = L2.session, start = () => update((s) => {
      let ids = pickWords(WORDS, s, lv, s.levels[lv].size);
      s.levels[lv].session = { sets: buildSets(BY, ids), idx: 0, correct: 0, wrong: 0, done: !1 }, s.levels[lv].runs++;
    });
    return useEffect(() => {
      L2.session || start();
    }, [L2.session]), html(_u5 || (_u5 = __template(["<", " lv=", " title=", " sub=", " onBack=", " right=", " scrollKey=", " footer=", ">\n    <", " level=", "/>", "</", ">"])), Screen, lv, T(lv), "Уровень 1 · " + V2.dict.title, app.nav.back, restartBtn(start), S2 ? S2.idx + ":" + L2.runs : 0, S2 && S2.done ? summaryFooter(start, app.nav.back) : null, LevelBar, lv, S2 ? S2.done ? html(_s5 || (_s5 = __template(["<", " sess=", "/>"])), SummaryCard, S2) : html(_t5 || (_t5 = __template(["<", " key=", " S=", "/>"])), MatchSet, S2.idx + ":" + L2.runs, S2) : null, Screen);
  }
  var _v5, _w5, _x5, _y5, _z5;
  function MatchSet({ S: S2 }) {
    let { update, BY, sfx, log } = useV(), lv = 1, set = S2.sets[S2.idx], [sel, setSel] = useState({ en: null, ru: null }), [flash, setFlash] = useState(null), [msg, setMsg] = useState(null), setDone = set.matched.length === set.ids.length;
    useEffect(() => {
      if (setDone && !S2.done) {
        let t = setTimeout(() => update((s) => {
          s.levels[lv].session.idx++;
        }), 1300);
        return () => clearTimeout(t);
      }
    }, [setDone, S2.done]), useEffect(() => {
      if (!msg) return;
      let t = setTimeout(() => setMsg(null), msg.ok ? 1100 : 3200);
      return () => clearTimeout(t);
    }, [msg]);
    let trySel = (side, id) => {
      if (set.matched.includes(id)) return;
      let next = Object.assign({}, sel, { [side]: sel[side] === id ? null : id });
      if (next.en != null && next.ru != null) {
        let ok = next.en === next.ru, en = next.en, completes = ok && set.matched.length + 1 === set.ids.length;
        setFlash({ en: next.en, ru: next.ru, ok }), sfx(ok ? completes ? "set" : "ok" : "bad"), setMsg({ ok, en, k: Date.now(), completes }), setTimeout(() => setFlash(null), 650), setSel({ en: null, ru: null }), log(BY[en], lv, ok, BY[next.ru].russian, BY[en].russian, "learning", null, ["VOCAB_MEANING"]), update((s) => {
          let ss = s.levels[lv].session, st = ss.sets[ss.idx];
          record(s, lv, en, ok), ok ? (ss.correct++, st.matched.push(en), st.matched.length === st.ids.length && ss.idx === ss.sets.length - 1 && (ss.done = !0)) : ss.wrong++;
        });
      } else
        sfx("tap"), setSel(next);
    }, cls = (side, id) => {
      let c = "pair";
      return set.matched.includes(id) && (c += " matched"), sel[side] === id && (c += " sel"), flash && flash[side] === id && (c += flash.ok ? " good" : " badf"), c;
    };
    return html(_z5 || (_z5 = __template(['<div><div class="test-meta"><span>Набор ', " из ", "</span><span>", " / ", ' пар</span></div><p class="hint">Нажмите английское слово, а затем его перевод.</p>\n    <div class="match"><div class="col">', '</div>\n      <div class="col">', "</div></div>\n    ", "</div>"])), S2.idx + 1, S2.sets.length, set.matched.length, set.ids.length, set.ids.map((id) => html(_v5 || (_v5 = __template(["<button key=", " class=", ' lang="en" disabled=', " onClick=", ">", "</button>"])), "e" + id, cls("en", id) + " en", set.matched.includes(id), () => trySel("en", id), BY[id].english)), set.ru.map((id) => html(_w5 || (_w5 = __template(["<button key=", " class=", " disabled=", " onClick=", ">", "</button>"])), "r" + id, cls("ru", id), set.matched.includes(id), () => trySel("ru", id), BY[id].russian)), msg ? html(_y5 || (_y5 = __template(["<div key=", " class=", ' role="status"><b>', "", "</b>", "</div>"])), msg.k, "toast " + (msg.ok ? "fb-ok" : "fb-bad"), msg.ok ? I.ok : I.bad, msg.ok ? msg.completes ? "Набор собран!" : "Правильно!" : "Ошибка", msg.ok ? null : html(_x5 || (_x5 = __template(["<span style=", '><span lang="en" class="en">', "</span> означает «", "».</span>"])), { color: "var(--ink)" }, BY[msg.en].english, BY[msg.en].russian)) : null);
  }
  var _A5, _B5, _C5, _D3, _E4, _F4, _G4, _H4;
  function Choice() {
    let V2 = useV(), { state, update, WORDS, BY, app, sfx, log } = V2, lv = 2, L2 = state.levels[lv], S2 = L2.session, start = () => update((s) => newQueueSession(WORDS, s, lv, () => ({ opts: {} })));
    useEffect(() => {
      L2.session || start();
    }, [L2.session]);
    let id = S2 && !S2.done ? S2.queue[S2.pos] : null, w = id != null ? BY[id] : null;
    useEffect(() => {
      S2 && !S2.done && !S2.opts[S2.pos] && update((s) => {
        let ss = s.levels[lv].session;
        ss.opts[ss.pos] = shuffle([id].concat(distractors(WORDS, BY, id, 3, "russian")));
      });
    }, [S2 && S2.pos, S2 && S2.done, L2.runs]);
    let o = S2 && S2.opts ? S2.opts[S2.pos] || [] : [], choose = (c) => {
      if (S2.ans) return;
      let ok = c === id;
      sfx(ok ? "ok" : "bad"), log(w, lv, ok, BY[c].russian, w.russian), update((s) => answerQ(s, lv, id, ok, { choice: c }));
    }, next = () => update((s) => advance(s, lv)), footer = S2 ? S2.done ? summaryFooter(start, app.nav.back) : S2.ans ? html(_A5 || (_A5 = __template(['<button class="btn btn-dark" onClick=', ">Дальше</button>"])), next) : null : null;
    return html(_H4 || (_H4 = __template(["<", " lv=", " title=", " sub=", " onBack=", " right=", " scrollKey=", " footer=", ">\n    <", " level=", "/>", "</", ">"])), Screen, lv, T(lv), "Уровень 2 · " + V2.dict.title, app.nav.back, restartBtn(start), S2 ? S2.pos + ":" + L2.runs + ":" + S2.done : 0, footer, LevelBar, lv, S2 ? S2.done ? html(_B5 || (_B5 = __template(["<", " sess=", "/>"])), SummaryCard, S2) : html(_G4 || (_G4 = __template(['<div>\n      <div class="wcard"><', " pos=", " len=", '/><div class="word" lang="en">', '</div></div>\n      <div class="tiles">', "</div>\n      ", "</div>"])), Count, S2.pos, S2.queue.length, w.english, o.map((c, i) => {
      let cl = "tile";
      return S2.ans && (c === id ? cl += " good" : c === S2.ans.choice ? cl += " badf" : cl += " faded"), html(_C5 || (_C5 = __template(["<button key=", " class=", " disabled=", " onClick=", '><span class="k">', "</span>", "</button>"])), c, cl, !!S2.ans, () => choose(c), i + 1, BY[c].russian);
    }), S2.ans ? html(_F4 || (_F4 = __template(["<div style=", "><", " key=", " ok=", ">", "</", "></div>"])), { marginTop: "14px" }, Feedback, "f" + S2.pos, S2.ans.ok, S2.ans.ok ? html(_D3 || (_D3 = __template(['<span class="ex" lang="en">', "</span><", " w=", "/>"])), plainSentence(w), Extra, w) : html(_E4 || (_E4 = __template(['<span><span lang="en" class="en">', "</span> означает «", '».<p><span class="ex" lang="en">', "</span></p><", " w=", "/></span>"])), w.english, w.russian, plainSentence(w), Extra, w), Feedback) : null) : null, Screen);
  }
  var _I4, _J4, _K3, _L3, _M3, _N3, _O3, _P3, _Q3, _R3, _S3, _T3, _U3, _V2, _W2;
  function Cards() {
    let V2 = useV(), { state, update, WORDS, BY, app, sfx, log } = V2, lv = 3, L2 = state.levels[lv], S2 = L2.session, start = () => update((s) => {
      let dir = s.levels[lv].session && s.levels[lv].session.dir || "en";
      newQueueSession(WORDS, s, lv, () => ({ dir, revealed: !1, repeat: [] }));
    });
    if (useEffect(() => {
      L2.session || start();
    }, [L2.session]), !S2) return html(_I4 || (_I4 = __template(["<", " lv=", " title=", " onBack=", "/>"])), Screen, lv, T(lv), app.nav.back);
    let setDir = (d) => update((s) => {
      s.levels[lv].session.dir = d, s.levels[lv].session.revealed = !1;
    }), extra = html(_J4 || (_J4 = __template(['<button class="chip" aria-pressed=', " onClick=", '>EN → RU</button><button class="chip" aria-pressed=', " onClick=", ">RU → EN</button>"])), S2.dir === "en", () => setDir("en"), S2.dir === "ru", () => setDir("ru"));
    if (S2.done) return html(_M3 || (_M3 = __template(["<", " lv=", " title=", " onBack=", " right=", " footer=", "><", " level=", " extra=", "/><", " sess=", "/>\n    ", "</", ">"])), Screen, lv, T(lv), app.nav.back, restartBtn(start), summaryFooter(start, app.nav.back), LevelBar, lv, extra, SummaryCard, S2, S2.repeat.length ? html(_L3 || (_L3 = __template(['<div class="card"><h3>Повторить эти слова</h3><ul class="replist">', "</ul></div>"])), S2.repeat.map((i) => html(_K3 || (_K3 = __template(["<li key=", '><span lang="en" class="en">', "</span> — ", "</li>"])), i, BY[i].english, BY[i].russian))) : null, Screen);
    let id = S2.queue[S2.pos], w = BY[id], front = S2.dir === "en" ? html(_N3 || (_N3 = __template(['<div class="word" lang="en">', "</div>"])), w.english) : html(_O3 || (_O3 = __template(['<div class="word ru">', "</div>"])), w.russian), back = S2.dir === "en" ? html(_P3 || (_P3 = __template(['<div class="answer">', "</div>"])), w.russian) : html(_Q3 || (_Q3 = __template(['<div class="answer en" lang="en">', "</div>"])), w.english), reveal = () => {
      S2.revealed || (sfx("tap"), update((s) => {
        s.levels[lv].session.revealed = !0;
      }));
    }, mark = (ok) => {
      sfx(ok ? "ok" : "bad"), log(w, lv, ok, ok ? "вспомнил(а)" : "не вспомнил(а)", S2.dir === "en" ? w.russian : w.english), update((s) => {
        let ss = s.levels[lv].session;
        answerQ(s, lv, id, ok, {}), !ok && !ss.repeat.includes(id) && ss.repeat.push(id), advance(s, lv), ss.revealed = !1;
      });
    }, footer = S2.revealed ? html(_S3 || (_S3 = __template(['<div class="btn-row"><button class="btn btn-bad" onClick=', '>Не вспомнила</button><button class="btn btn-ok" onClick=', ">Вспомнила</button></div>"])), () => mark(!1), () => mark(!0)) : html(_R3 || (_R3 = __template(['<button class="btn btn-dark" onClick=', ">Показать перевод</button>"])), reveal);
    return html(_W2 || (_W2 = __template(["<", " lv=", " title=", " sub=", " onBack=", " right=", " scrollKey=", " footer=", ">\n    <", " level=", " extra=", '/>\n    <div class="stack">', "</div>\n    ", "</", ">"])), Screen, lv, T(lv), "Уровень 3 · " + V2.dict.title, app.nav.back, restartBtn(start), S2.pos + ":" + L2.runs, footer, LevelBar, lv, extra, S2.revealed ? html(_T3 || (_T3 = __template(['<div class="wcard"><', " pos=", " len=", "/>", '<div class="back">', '<p class="ex" lang="en">', '</p><p class="small" style=', ">", "</p><", " w=", "/></div></div>"])), Count, S2.pos, S2.queue.length, front, back, plainSentence(w), { opacity: 0.8 }, w.exampleTranslation, Extra, w) : html(_U3 || (_U3 = __template(['<button class="wcard" onClick=', ' aria-label="Показать перевод"><', " pos=", " len=", "/>", '<span class="tap-hint">Вспомните перевод и нажмите на карточку</span></button>'])), reveal, Count, S2.pos, S2.queue.length, front), S2.repeat.length ? html(_V2 || (_V2 = __template(['<p class="muted small" style=', ">Для повторения: ", "</p>"])), { textAlign: "center" }, S2.repeat.length) : null, Screen);
  }
  var _X2, TypeCloze = () => html(_X2 || (_X2 = __template(["<", " lv=", ' mode="cloze"/>'])), TypeLevel, 4), _Y2, TypeReverse = () => html(_Y2 || (_Y2 = __template(["<", " lv=", ' mode="reverse"/>'])), TypeLevel, 5), _Z2, __2, _$2, _aa2, _ba2, _ca2, _da2, _ea2, _fa2, _ga2, _ha2, _ia, _ja, _ka, _la;
  function TypeLevel({ lv, mode }) {
    let V2 = useV(), { state, update, WORDS, BY, app, sfx, log } = V2, L2 = state.levels[lv], S2 = L2.session, start = () => update((s) => newQueueSession(WORDS, s, lv));
    useEffect(() => {
      L2.session || start();
    }, [L2.session]);
    let [val, setVal] = useState(""), inp = useRef(null);
    if (useEffect(() => {
      setVal(""), inp.current && window.matchMedia("(pointer:fine)").matches && inp.current.focus({ preventScroll: !0 });
    }, [S2 && S2.pos, S2 && S2.done, L2.runs]), !S2) return html(_Z2 || (_Z2 = __template(["<", " lv=", " title=", " onBack=", "/>"])), Screen, lv, T(lv), app.nav.back);
    if (S2.done) return html(__2 || (__2 = __template(["<", " lv=", " title=", " onBack=", " right=", " footer=", "><", " level=", "/><", " sess=", "/></", ">"])), Screen, lv, T(lv), app.nav.back, restartBtn(start), summaryFooter(start, app.nav.back), LevelBar, lv, SummaryCard, S2, Screen);
    let id = S2.queue[S2.pos], w = BY[id], list = mode === "cloze" ? clozeList(w) : w.acceptedEnglishAnswers, submit = (e) => {
      if (e && e.preventDefault(), S2.ans) {
        update((s) => advance(s, lv));
        return;
      }
      if (!val.trim()) return;
      let ok = accepts(list, val);
      sfx(ok ? "ok" : "bad"), log(w, lv, ok, val, list[0], "learning", null, ok ? [] : classifyVocab(val, w, WORDS)), update((s) => answerQ(s, lv, id, ok, { given: val }));
    }, prompt;
    if (mode === "cloze") {
      let parts = w.exampleSentence.split(/\[\[(.+?)\]\]/);
      prompt = html(_ba2 || (_ba2 = __template(['<p class="cloze" lang="en">', '</p><p class="sub">Значение: «', "»</p>"])), parts.map((p2, i) => i % 2 ? html(_aa2 || (_aa2 = __template(["<span key=", ' class="gap">', "</span>"])), i, p2.split(" ").map((x, j) => html(_$2 || (_$2 = __template(["<span key=", ' class="gapw" style=', "></span>"])), j, { width: Math.max(2.5, x.length * 0.6) + "em" }))) : p2), w.russian);
    } else prompt = html(_ca2 || (_ca2 = __template(['<div class="word ru">', '</div><p class="sub">Напишите по-английски</p>'])), cap(w.testPrompt));
    let footer = html(_da2 || (_da2 = __template(['<form class="inbar" onSubmit=', ' autocomplete="off"><input ref=', ' lang="en" class=', " value=", " readOnly=", " onChange=", '\n      placeholder="Ответ на английском" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint=', ' aria-label="Ответ"/>\n    <button class="btn btn-dark" type="submit" onMouseDown=', " disabled=", ">", "</button></form>"])), submit, inp, S2.ans ? S2.ans.ok ? "ok" : "bad" : "", S2.ans ? S2.ans.given : val, !!S2.ans, (e) => {
      S2.ans || setVal(e.target.value);
    }, S2.ans ? "next" : "done", (e) => e.preventDefault(), !S2.ans && !val.trim(), S2.ans ? "Дальше" : "Проверить");
    return html(_la || (_la = __template(["<", " lv=", " title=", " sub=", " onBack=", " right=", " scrollKey=", " footer=", ">\n    <", " level=", '/><div class="wcard"><', " pos=", " len=", "/>", "</div>\n    ", "</", ">"])), Screen, lv, T(lv), "Уровень " + lv + " · " + V2.dict.title, app.nav.back, restartBtn(start), S2.pos + ":" + L2.runs, footer, LevelBar, lv, Count, S2.pos, S2.queue.length, prompt, S2.ans ? html(_ka || (_ka = __template(["<", " key=", " ok=", ">", "</", ">"])), Feedback, "f" + S2.pos, S2.ans.ok, mode === "cloze" ? html(_ga2 || (_ga2 = __template(["<span>", '<p><span class="ex" lang="en">', '</span></p><p class="muted">', "</p><", " w=", "/>", "</span>"])), S2.ans.ok ? null : html(_ea2 || (_ea2 = __template(['<span>Правильно: <b lang="en" class="en">', "</b></span>"])), clozeList(w)[0]), plainSentence(w), w.exampleTranslation, Extra, w, S2.ans.ok ? null : html(_fa2 || (_fa2 = __template(['<p class="muted">Это слово встретится ещё раз в этой тренировке.</p>'])))) : html(_ja || (_ja = __template(['<span>Правильно: <b lang="en" class="en">', "</b>", "", "</span>"])), w.english, w.acceptedEnglishAnswers.length > 1 ? html(_ha2 || (_ha2 = __template([' <span class="muted">(принимается также: ', ")</span>"])), w.acceptedEnglishAnswers.filter((a) => norm(a) !== norm(w.english)).join(", ")) : null, S2.ans.ok ? null : html(_ia || (_ia = __template(['<p class="muted">Это слово встретится ещё раз в этой тренировке.</p>'])))), Feedback) : null, Screen);
  }
  var _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta;
  function TrueFalse() {
    let V2 = useV(), { state, update, WORDS, BY, app, sfx, log } = V2, lv = 6, L2 = state.levels[lv], S2 = L2.session, start = () => update((s) => newQueueSession(WORDS, s, lv, (ids) => {
      let t = {}, half = shuffle(ids).slice(0, Math.ceil(ids.length / 2));
      return ids.forEach((i) => t[i] = half.includes(i)), { truth: t };
    }));
    useEffect(() => {
      L2.session || start();
    }, [L2.session]);
    let fallback = useRef({});
    if (!S2) return html(_ma || (_ma = __template(["<", " lv=", " title=", " onBack=", "/>"])), Screen, lv, T(lv), app.nav.back);
    if (S2.done) return html(_na || (_na = __template(["<", " lv=", " title=", " onBack=", " right=", " footer=", "><", " level=", "/><", " sess=", "/></", ">"])), Screen, lv, T(lv), app.nav.back, restartBtn(start), summaryFooter(start, app.nav.back), LevelBar, lv, SummaryCard, S2, Screen);
    let id = S2.queue[S2.pos], w = BY[id], isTrue = S2.truth[id];
    if (isTrue === void 0) {
      let fk = S2.pos + ":" + id;
      fallback.current[fk] === void 0 && (fallback.current[fk] = Math.random() < 0.5), isTrue = fallback.current[fk];
    }
    let shown = isTrue ? w.russian : w.wrongRussian, pick = (v) => {
      if (S2.ans) return;
      let ok = v === isTrue;
      sfx(ok ? "ok" : "bad"), log(w, lv, ok, (v ? "верно: " : "неверно: ") + shown, w.russian), update((s) => {
        answerQ(s, lv, id, ok, { v, isTrue, shown });
        let ss = s.levels[lv].session;
        ss.truth[id] !== void 0 && ss.requeued.includes(id) && (ss.truth[id] = !ss.truth[id]);
      });
    }, disp = S2.ans ? S2.ans.shown : shown, truthNow = S2.ans ? S2.ans.isTrue : isTrue, footer = S2.ans ? html(_oa || (_oa = __template(['<button class="btn btn-dark" onClick=', ">Дальше</button>"])), () => update((s) => advance(s, lv))) : html(_pa || (_pa = __template(['<div class="btn-row"><button class="btn btn-bad" onClick=', ">", 'Неверно</button><button class="btn btn-ok" onClick=', ">", "Верно</button></div>"])), () => pick(!1), I.bad, () => pick(!0), I.ok);
    return html(_ta || (_ta = __template(["<", " lv=", " title=", " sub=", " onBack=", " right=", " scrollKey=", " footer=", ">\n    <", " level=", '/><div class="wcard"><', " pos=", " len=", '/><div class="word" lang="en">', '</div><p class="claim-eq">означает</p><div class="claim-ru">«', '»</div></div>\n    <p class="hint" style=', ">Верен ли перевод?</p>\n    ", "</", ">"])), Screen, lv, T(lv), "Уровень 6 · " + V2.dict.title, app.nav.back, restartBtn(start), S2.pos + ":" + L2.runs, footer, LevelBar, lv, Count, S2.pos, S2.queue.length, w.english, disp, { textAlign: "center" }, S2.ans ? html(_sa || (_sa = __template(["<", " key=", " ok=", ">", "</", ">"])), Feedback, "f" + S2.pos, S2.ans.ok, truthNow ? html(_qa || (_qa = __template(["<span>Перевод верный: «", "».</span>"])), w.russian) : html(_ra || (_ra = __template(["<span>Перевод неверный. Правильно: <b>«", "»</b>.</span>"])), w.russian), Feedback) : null, Screen);
  }
  var _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa;
  function VocabFinal({ params }) {
    let app = useApp(), full = !!params.dict, dict = full ? DICT_BY_ID[params.dict] : DICT_BY_ID[SET_BY_ID[params.setId].dict], words = full ? dict.words : SET_BY_ID[params.setId].words, BY = useMemo(() => Object.fromEntries(words.map((w2) => [w2.id, w2])), [words]), key = full ? "vocabfull:" + dict.id : "vocab:" + params.setId, testId = full ? "vocabfull:" + dict.id : "vocab:" + params.setId, doc = full ? Object.assign({ test: { current: null, history: [] } }, app.docs[key]) : sanitize(app.docs[key]), T0 = doc.test, cur = T0.current, update = (fn) => app.setDoc(key, (s) => {
      let n2 = JSON.parse(JSON.stringify(full ? Object.assign({ test: { current: null, history: [] } }, s) : sanitize(s)));
      return fn(n2), n2;
    }), [sheet, setSheet] = useState(null), inp = useRef(null), shown = useRef(Date.now()), TOTAL = words.length, title = full ? "Полный контрольный: ".concat(dict.title) : "Итоговая проверка ".concat(TOTAL, "/").concat(TOTAL);
    useEffect(() => {
      inp.current && window.matchMedia("(pointer:fine)").matches && inp.current.focus({ preventScroll: !0 }), shown.current = Date.now();
    }, [cur && cur.idx]);
    let begin = () => {
      app.sfx("tap"), update((s) => {
        s.test.current = { id: uid("att"), order: shuffle(words.map((w2) => w2.id)), answers: {}, idx: 0, startedAt: Date.now(), time: {} };
      });
    }, hist = T0.history.slice().reverse();
    if (!cur) return html(_xa || (_xa = __template(["<", " lv=", " title=", " sub=", " onBack=", " footer=", '>\n    <div class="intro"><span class="ring"></span><h2>', " ", ' — одна попытка</h2>\n      <p>По русскому значению напишите английское слово или выражение. Каждое слово встретится один раз.</p>\n      <p>Правильность во время теста не показывается. Между заданиями можно переходить и менять ответы. Если закрыть приложение, ответы сохранятся.</p></div>\n    <h2 class="h2">История</h2>', "\n  </", ">"])), Screen, 7, title, dict.title, app.nav.back, html(_ua || (_ua = __template(['<button class="btn btn-dark" onClick=', ">Начать тест</button>"])), begin), TOTAL, plural(TOTAL, "слово", "слова", "слов"), hist.length ? hist.map((h5) => html(_va || (_va = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, h5.ts, "".concat(h5.score, "/").concat(h5.total), fmtDT(h5.ts), () => h5.attemptId && app.nav.push("vocabResult", { id: h5.attemptId }))) : html(_wa || (_wa = __template(['<div class="empty">Попыток пока не было.</div>']))), Screen);
    let id = cur.order[cur.idx], w = BY[id], n = cur.order.length, isFilled = (i) => !!(cur.answers[i] || "").trim(), filled = cur.order.filter(isFilled).length, addTime = () => {
      let dt = Date.now() - shown.current;
      return shown.current = Date.now(), Object.assign({}, cur.time, { [id]: ((cur.time || {})[id] || 0) + dt });
    }, setAns = (v) => update((s) => {
      s.test.current.answers[id] = v;
    }), go = (i) => {
      let time = addTime();
      update((s) => {
        s.test.current.idx = Math.max(0, Math.min(n - 1, i)), s.test.current.time = time;
      });
    }, finishTest = () => {
      let time = addTime(), score = 0, now = Date.now(), attemptId = cur.id || uid("att"), events = [];
      cur.order.forEach((i, k) => {
        let wd = BY[i], raw = cur.answers[i] || "", ok = accepts(wd.acceptedEnglishAnswers, raw);
        ok && score++, events.push({
          id: uid("ev"),
          attemptId,
          testId,
          questionId: i,
          questionVersion: 1,
          moduleId: "vocab-" + dict.id,
          subtopicId: full ? "full" : params.setId,
          lessonId: null,
          kind: "vocab",
          format: "vocab-final",
          level: wd.level || "B2",
          difficulty: 1,
          mode: "exam",
          ts: now + k,
          timestamp: iso(now + k),
          userAnswer: raw,
          userAnswerNorm: norm(raw),
          correctAnswer: wd.acceptedEnglishAnswers[0],
          isCorrect: ok,
          score: ok ? 1 : 0,
          timeSpentMs: time[i] || 0,
          errorTags: ok ? [] : classifyVocab(raw, wd, words),
          explanationId: i,
          firstAttempt: !0,
          retry: !1
        });
      });
      let attempt = {
        id: attemptId,
        testId,
        title: "".concat(title, " (").concat(dict.title, ")"),
        kind: "vocab",
        mode: "exam",
        contentVersion: CONTENT_VERSION,
        startedAt: cur.startedAt,
        finishedAt: now,
        durationMs: now - cur.startedAt,
        score,
        total: n,
        pct: Math.round(score / n * 100),
        items: cur.order.map((i) => ({ qid: i, v: 1 })),
        responses: cur.answers,
        prompts: Object.fromEntries(cur.order.map((i) => [i, BY[i].testPrompt]))
      };
      app.sfx(score === n ? "done" : "finish"), app.commitAttempt(attempt, events, null, { [key]: (() => {
        let d = JSON.parse(JSON.stringify(doc));
        return d.test.history.push({ ts: now, score, total: n, attemptId }), d.test.current = null, d;
      })() }), setSheet(null), app.nav.replace("vocabResult", { id: attemptId });
    }, footer = html(_ya || (_ya = __template(['<form class="inbar" style=', " onSubmit=", ' autocomplete="off">\n      <input ref=', ' lang="en" value=', " onChange=", ' placeholder="Английское слово или выражение" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="next" aria-label=', '/></form>\n    <div class="nav3"><button class="btn btn-light" onMouseDown=', " disabled=", " onClick=", ' aria-label="Назад">', '</button>\n      <button class="btn btn-light mid" onClick=', ">", "", " / ", '</button>\n      <button class="btn btn-light" onMouseDown=', " disabled=", " onClick=", ' aria-label="Вперёд">', "</button></div>"])), { gridTemplateColumns: "1fr" }, (e) => {
      e.preventDefault(), go(cur.idx < n - 1 ? cur.idx + 1 : cur.idx);
    }, inp, cur.answers[id] || "", (e) => setAns(e.target.value), "Ответ на задание " + (cur.idx + 1), (e) => e.preventDefault(), cur.idx === 0, () => go(cur.idx - 1), I.left, () => setSheet("grid"), I.grid, filled, n, (e) => e.preventDefault(), cur.idx === n - 1, () => go(cur.idx + 1), I.right);
    return html(_Fa || (_Fa = __template(["<", " lv=", " title=", " sub=", " onBack=", " scrollKey=", " footer=", '>\n    <div class="banner exam">Exam Mode: проверка после завершения. Ответы сохраняются автоматически.</div>\n    <div class="wcard"><div class="cnt"><span>', " / ", '</span></div><div class="word ru">', '</div><p class="sub">Напишите по-английски</p></div>\n    ', "\n    ", "\n    ", "\n  </", ">"])), Screen, 7, title, "Задание " + (cur.idx + 1) + " из " + n, app.nav.back, cur.idx, footer, cur.idx + 1, n, cap(w.testPrompt), filled === n ? html(_za || (_za = __template(['<button class="btn btn-dark" style=', " onClick=", ">Завершить тест</button>"])), { width: "100%" }, () => setSheet("finish")) : html(_Aa || (_Aa = __template(['<p class="small2" style=', ">Завершить тест можно, когда будут заполнены все ", " ответов (как в оригинальной итоговой проверке).</p>"])), { textAlign: "center" }, n), sheet === "grid" ? html(_Da || (_Da = __template(["<", " onClose=", ' label="Все задания"><h2>Все задания</h2><p>Заполнено ', " из ", '.</p><div class="grid">', '</div>\n      <div class="stack-btns">', '<button class="btn btn-light" onClick=', ">Закрыть</button></div></", ">"])), Sheet, () => setSheet(null), filled, n, cur.order.map((i, k) => html(_Ba || (_Ba = __template(["<button key=", " class=", " onClick=", ">", "</button>"])), i, "cell" + (k === cur.idx ? " cur" : "") + (isFilled(i) ? " filled" : ""), () => {
      go(k), setSheet(null);
    }, k + 1)), filled === n ? html(_Ca || (_Ca = __template(['<button class="btn btn-dark" onClick=', ">Завершить тест</button>"])), () => setSheet("finish")) : null, () => setSheet(null), Sheet) : null, sheet === "finish" ? html(_Ea || (_Ea = __template(["<", " onClose=", ' label="Завершить"><h2>Завершить тест?</h2><p>После этого ответы проверятся и изменить их будет нельзя.</p>\n      <div class="stack-btns"><button class="btn btn-dark" onClick=', '>Завершить тест</button><button class="btn btn-light" onClick=', ">Вернуться к ответам</button></div></", ">"])), Sheet, () => setSheet(null), finishTest, () => setSheet(null), Sheet) : null, Screen);
  }
  var _Ga, _Ha, _Ia, _Ja, _Ka, _La;
  function VocabResult({ params }) {
    let app = useApp(), a = app.attempts.find((x) => x.id === params.id);
    if (!a) return html(_Ga || (_Ga = __template(["<", ' title="Результат" onBack=', '><div class="empty">Попытка не найдена.</div></', ">"])), Screen, app.nav.back, Screen);
    let wrong = app.events.filter((e) => e.attemptId === a.id).filter((e) => !e.isCorrect), TAGS = { SPELLING: "Орфография (почти верно)", FORM: "Форма глагола", VOCAB_MEANING: "Другое слово словаря", UNCLASSIFIED: "Нет ответа / не классифицировано" }, c = {};
    return wrong.forEach((e) => e.errorTags.forEach((t) => {
      c[t] = (c[t] || 0) + 1;
    })), html(_La || (_La = __template(["<", " lv=", ' title="Результат" sub=', " onBack=", '>\n    <div class="sum"><h2>', '</h2><div class="kpis"><div class="k-ok"><span class="v">', '</span><span class="l">из ', '</span></div><div class="k-bad"><span class="v">', '</span><span class="l">', '</span></div><div class="k-n"><span class="v">', '%</span><span class="l">результат</span></div></div><p class="small2">', "</p></div>\n    ", "\n  </", ">"])), Screen, 7, a.title, app.nav.back, a.pct === 100 ? "Идеальный результат!" : "Тест завершён", a.score, a.total, a.total - a.score, plural(a.total - a.score, "ошибка", "ошибки", "ошибок"), a.pct, fmtDT(a.finishedAt), wrong.length ? html(_Ka || (_Ka = __template(['<h2 class="h2">Причины ошибок</h2>', '\n      <h2 class="h2">Ошибки</h2><ul class="replist">', "</ul>"])), Object.entries(c).map(([t, k]) => html(_Ha || (_Ha = __template(["<div key=", ' class="hbar"><span>', '</span><span class="t"><i style=', "></i></span><b>", "</b></div>"])), t, TAGS[t] || t, { width: k / wrong.length * 100 + "%" }, k)), wrong.map((e) => html(_Ja || (_Ja = __template(["<li key=", ">", ' — <b lang="en" class="en">', "</b>", "</li>"])), e.id, a.prompts ? a.prompts[e.questionId] : "", e.correctAnswer, e.userAnswer ? html(_Ia || (_Ia = __template(['<br/><span class="small2">ваш ответ: <s>', "</s></span>"])), e.userAnswer) : null))) : null, Screen);
  }
  var _Ma, _Na;
  function WordsTab({ nav }) {
    let app = useApp(), unique = new Set(DICTS.filter((d) => d.id !== "agents").flatMap((d) => d.words.map((w) => (w.v1 || w.english).toLowerCase()))).size;
    return html(_Na || (_Na = __template(["<", " bare nav=", '>\n    <div class="home-head"><div><h1>Словари</h1><p>', ' уникальных глаголов в General, Business и Irregular (пересечения учтены один раз). Шесть уровней тренировки и итоговые проверки.</p></div></div>\n    <div class="lv-list">', "</div>\n  </", ">"])), Screen, nav, unique, DICTS.map((d, k) => html(_Ma || (_Ma = __template(["<button key=", " class=", " onClick=", '><span class="lv-num">', "</span><span><h3>", "</h3><p>", '</p><span class="lv-prog">', " ", "</span></span></button>"])), d.id, "lv-card lv-" + (k + 2), () => app.nav.push("vocabDict", { dict: d.id }), d.words.length, d.title, d.short, d.sets.length, plural(d.sets.length, "набор", "набора", "наборов"))), Screen);
  }

  // src/engine/csv.js
  var BOM = "\uFEFF";
  function cell(v) {
    if (v == null) return "";
    let s = Array.isArray(v) ? v.join(";") : String(v);
    return /^[=+\-@\t\r]/.test(s) && (s = "'" + s), /[",\r\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  function toCSV(headers, rows) {
    return BOM + [headers.map(cell).join(",")].concat(rows.map((r) => headers.map((h5) => cell(r[h5])).join(","))).join("\r\n") + "\r\n";
  }
  var ANSWER_HEADERS = [
    "eventId",
    "attemptId",
    "testId",
    "timestamp",
    "week",
    "mode",
    "moduleId",
    "subtopicId",
    "questionId",
    "questionVersion",
    "kind",
    "format",
    "level",
    "difficulty",
    "userAnswer",
    "userAnswerNorm",
    "correctAnswer",
    "isCorrect",
    "score",
    "timeSpentMs",
    "errorTags",
    "primaryErrorTag",
    "explanationId",
    "firstAttempt",
    "retry"
  ];
  function answerEventsCSV(events) {
    return toCSV(ANSWER_HEADERS, events.slice().sort((a, b) => a.ts - b.ts).map((e) => ({
      eventId: e.id,
      attemptId: e.attemptId,
      testId: e.testId,
      timestamp: e.timestamp || iso(e.ts),
      week: isoWeek(e.ts),
      mode: e.mode,
      moduleId: e.moduleId,
      subtopicId: e.subtopicId,
      questionId: e.questionId,
      questionVersion: e.questionVersion,
      kind: e.kind,
      format: e.format,
      level: e.level,
      difficulty: e.difficulty,
      userAnswer: e.userAnswer,
      userAnswerNorm: e.userAnswerNorm,
      correctAnswer: e.correctAnswer,
      isCorrect: e.isCorrect ? 1 : 0,
      score: e.score,
      timeSpentMs: e.timeSpentMs,
      errorTags: e.errorTags,
      primaryErrorTag: (e.errorTags || [])[0] || "",
      explanationId: e.explanationId,
      firstAttempt: e.firstAttempt ? 1 : 0,
      retry: e.retry ? 1 : 0
    })));
  }
  var ATTEMPT_HEADERS = ["attemptId", "testId", "title", "mode", "startedAt", "finishedAt", "score", "total", "percentage", "durationSec", "questionBankVersion", "questionIds"];
  function testAttemptsCSV(attempts) {
    return toCSV(ATTEMPT_HEADERS, attempts.filter((a) => a.finishedAt).sort((a, b) => a.finishedAt - b.finishedAt).map((a) => ({
      attemptId: a.id,
      testId: a.testId,
      title: a.title,
      mode: a.mode || "exam",
      startedAt: iso(a.startedAt),
      finishedAt: iso(a.finishedAt),
      score: a.score,
      total: a.total,
      percentage: a.pct,
      durationSec: Math.round((a.durationMs || 0) / 1e3),
      questionBankVersion: a.contentVersion || "",
      questionIds: (a.items || []).map((i) => i.qid + "@v" + i.v)
    })));
  }
  var WEEKLY_HEADERS = ["weekStart", "week", "moduleId", "attempts", "answered", "correct", "accuracy", "learningAnswered", "examAnswered", "timeSpentMin", "mastered", "weakTags"];
  function weeklySummaryCSV(events, attempts, masteredByModule = {}) {
    let g = groupBy(events, (e) => isoWeek(e.ts) + "|" + (e.moduleId || "—")), rows = Object.keys(g).sort().map((k) => {
      let es = g[k], [week, moduleId] = k.split("|"), wrong = es.filter((e) => !e.isCorrect), tags = {};
      wrong.forEach((e) => (e.errorTags || []).forEach((t) => {
        tags[t] = (tags[t] || 0) + 1;
      }));
      let atts = new Set(es.map((e) => e.attemptId)).size;
      return {
        weekStart: weekStart(es[0].ts),
        week,
        moduleId,
        attempts: atts,
        answered: es.length,
        correct: es.length - wrong.length,
        accuracy: pct(es.length - wrong.length, es.length),
        learningAnswered: es.filter((e) => e.mode === "learning").length,
        examAnswered: es.filter((e) => e.mode === "exam").length,
        timeSpentMin: Math.round(es.reduce((a, e) => a + (e.timeSpentMs || 0), 0) / 6e4),
        mastered: masteredByModule[moduleId] || "",
        weakTags: Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([t, n]) => t + ":" + n)
      };
    });
    return toCSV(WEEKLY_HEADERS, rows);
  }
  var ERRORMAP_HEADERS = ["week", "moduleId", "subtopicId", "errorTag", "count", "total", "errorRate", "trend"];
  function errorMapCSV(events, now = Date.now()) {
    let totals = groupBy(events, (e) => isoWeek(e.ts) + "|" + (e.moduleId || "—") + "|" + (e.subtopicId || "—")), rows = [];
    return Object.keys(totals).sort().forEach((k) => {
      let es = totals[k], [week, moduleId, subtopicId] = k.split("|"), counts = {};
      es.filter((e) => !e.isCorrect).forEach((e) => (e.errorTags || ["UNCLASSIFIED"]).forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      })), Object.entries(counts).forEach(([t, c]) => rows.push({ week, moduleId, subtopicId, errorTag: t, count: c, total: es.length, errorRate: (c / es.length).toFixed(3), trend: tagTrend(events, moduleId, t, now) }));
    }), toCSV(ERRORMAP_HEADERS, rows);
  }
  function validateBackup(obj) {
    let errors = [];
    if (!obj || typeof obj != "object") return { ok: !1, errors: ["Файл не является JSON-объектом."] };
    obj.app !== "wordsword" && errors.push("Это не резервная копия Wordsword."), typeof obj.schema != "number" && errors.push("Нет версии схемы.");
    let d = obj.data || {};
    if ((typeof d.kv != "object" || Array.isArray(d.kv)) && errors.push("Раздел kv повреждён."), ["attempts", "events", "sessions"].forEach((s) => {
      Array.isArray(d[s]) || errors.push("Раздел ".concat(s, " должен быть массивом."));
    }), Array.isArray(d.events)) {
      let bad = d.events.filter((e) => !e || !e.id || typeof e.ts != "number" || !e.questionId).length;
      bad && errors.push("".concat(bad, " событий без обязательных полей (id, ts, questionId)."));
    }
    if (Array.isArray(d.attempts)) {
      let bad = d.attempts.filter((a) => !a || !a.id || !a.testId).length;
      bad && errors.push("".concat(bad, " попыток без id/testId."));
    }
    return { ok: !errors.length, errors, summary: errors.length ? null : { events: d.events.length, attempts: d.attempts.length, docs: Object.keys(d.kv).length, exportedAt: obj.exportedAt } };
  }
  function makeBackup(dump, schema, contentVersion) {
    return { app: "wordsword", schema, contentVersion, exportedAt: (/* @__PURE__ */ new Date()).toISOString(), data: dump };
  }

  // src/ui/dashboard.js
  var moduleTitle = (m) => BLOCK_BY_ID[m] && BLOCK_BY_ID[m].title || (m && m.startsWith("vocab-") ? "Слова: " + ((DICTS.find((d) => "vocab-" + d.id === m) || {}).title || m) : m || "—"), DAY = 864e5;
  function rangeOf(r, from, to) {
    let now = Date.now();
    if (r === "7") return { from: now - 7 * DAY, to: now };
    if (r === "30") return { from: now - 30 * DAY, to: now };
    if (r === "custom" && from && to) {
      let f3 = (/* @__PURE__ */ new Date(from + "T00:00:00")).getTime(), t = (/* @__PURE__ */ new Date(to + "T23:59:59")).getTime();
      return { from: f3, to: t };
    }
    return {};
  }
  async function deliverFiles(files, title) {
    let blobs = files.map((f3) => new File([f3.text], f3.name, { type: f3.type || "text/csv;charset=utf-8" }));
    try {
      if (navigator.canShare && navigator.canShare({ files: blobs }))
        return await navigator.share({ files: blobs, title }), "shared";
    } catch (e) {
      if (e && e.name === "AbortError") return "cancelled";
    }
    for (let f3 of blobs) {
      let url = URL.createObjectURL(f3), a = document.createElement("a");
      a.href = url, a.download = f3.name, a.rel = "noopener", document.body.appendChild(a), a.click(), a.remove(), setTimeout(() => URL.revokeObjectURL(url), 4e3), await new Promise((r) => setTimeout(r, 350));
    }
    return "downloaded";
  }
  var _a6, _b6, _c6, _d6, _e6, _f6, _g6, _h6, _i6, _j6, _k6, _l6, _m6, _n6, _o6, _p6, _q6, _r6, _s6, _t6, _u6, _v6, _w6, _x6, _y6, _z6, _A6, _B6, _C6, _D4, _E5, _F5;
  function ProgressTab({ nav }) {
    let app = useApp(), [r, setR] = useState("30"), [mode, setMode] = useState("all"), [lvl, setLvl] = useState("all"), [from, setFrom] = useState(""), [to, setTo] = useState(""), [drill, setDrill] = useState(null), [msg, setMsg] = useState(null), [imp, setImp] = useState(null), range = rangeOf(r, from, to), evs = useMemo(() => filterEvents(app.events, Object.assign({ mode, level: lvl }, range)), [app.events, r, mode, lvl, from, to]), allInRange = useMemo(() => filterEvents(app.events, range), [app.events, r, from, to]), matrix = errorMatrix(evs), usedTags = TAG_KEYS.filter((t) => matrix.some((m) => m.tags[t])), issues = topIssues(evs), weeks = weekly(app.events).slice(-8), fa = firstAnswerStats(allInRange), wkNow = isoWeek(Date.now()), wkPrev = isoWeek(Date.now() - 7 * DAY), W = weeks.reduce((m, w) => (m[w.week] = w, m), {}), cw = W[wkNow] || { answered: 0, accuracy: 0, errors: 0 }, pw = W[wkPrev] || { answered: 0, accuracy: 0, errors: 0 }, masteries = BLOCKS.map((b) => ({ b, m: blockMastery(b, mctx(app)) })), courseScore = Math.round(masteries.reduce((a, x) => a + x.m.score, 0) / COURSE.length), strength = topicStrength(evs), lvlB = breakdown(allInRange.filter((e) => e.level), "level"), modeB = breakdown(allInRange, "mode"), attemptsInRange = app.attempts.filter((a) => (range.from == null || a.finishedAt >= range.from) && (range.to == null || a.finishedAt <= range.to)), stamp = dayKey(Date.now()), masteredBy = Object.fromEntries(masteries.map((x) => [x.b.id, x.m.status])), exportCSV = async (scope) => {
      let E = scope === "full" ? app.events : allInRange, A = scope === "full" ? app.attempts : attemptsInRange, files = [
        { name: "weekly_summary_".concat(stamp, ".csv"), text: weeklySummaryCSV(E, A, masteredBy) },
        { name: "test_attempts_".concat(stamp, ".csv"), text: testAttemptsCSV(A) },
        { name: "answer_events_".concat(stamp, ".csv"), text: answerEventsCSV(E) },
        { name: "error_map_".concat(stamp, ".csv"), text: errorMapCSV(E) }
      ], res = await deliverFiles(files, "Wordsword CSV");
      setMsg(res === "cancelled" ? "Экспорт отменён." : "".concat(E.length ? "" : "Внимание: событий за период нет — файлы содержат только заголовки. ", "Готово: 4 файла (").concat(E.length, " ответов, ").concat(A.length, " попыток) ").concat(res === "shared" ? "переданы в меню «Поделиться»" : "скачаны", "."));
    }, exportJSON = async () => {
      let dump = await app.store.dumpAll(), b = makeBackup(dump, 1, CONTENT_VERSION), res = await deliverFiles([{ name: "wordsword_backup_".concat(stamp, ".json"), text: JSON.stringify(b), type: "application/json" }], "Wordsword backup");
      setMsg(res === "cancelled" ? "Отменено." : "Резервная копия создана: ".concat(dump.events.length, " событий, ").concat(dump.attempts.length, " попыток."));
    }, pickImport = () => {
      let i = document.createElement("input");
      i.type = "file", i.accept = "application/json,.json", i.onchange = async () => {
        let f3 = i.files[0];
        if (f3)
          try {
            let obj = JSON.parse(await f3.text()), v = validateBackup(obj);
            setImp({ obj, v, name: f3.name });
          } catch (e) {
            setImp({ v: { ok: !1, errors: ["Не удалось прочитать JSON: " + e.message] }, name: f3.name });
          }
      }, i.click();
    }, chip = (cur, set, v, l) => html(_a6 || (_a6 = __template(['<button class="chip" aria-pressed=', " onClick=", ">", "</button>"])), cur === v, () => set(v), l);
    return html(_F5 || (_F5 = __template(["<", " bare nav=", '>\n    <div class="home-head"><div><h1>Прогресс</h1><p>Всё рассчитано из ваших ответов на этом устройстве.</p></div></div>\n    <div class="chips" style=', ">", "", "", "", "</div>\n    ", '\n    <div class="chips" style=', ">", "", "", "", "", "", '</div>\n\n    <div class="stat"><div class="stat-top"><span class="stat-l">Курс</span><span class="stat-n">', '<small>%</small></span></div>\n      <p class="stat-sub">Средний mastery по ', " блокам (в сборке ", "). Серия: ", ' дн. подряд.</p></div>\n    <div class="kv" style=', '><div><div class="v">', '</div><div class="l">ответов за период</div></div><div><div class="v">', '%</div><div class="l">точность первых ответов (', ')</div></div>\n      <div><div class="v">', '</div><div class="l">медианное время ответа</div></div><div><div class="v">', '</div><div class="l">время в заданиях</div></div></div>\n\n    <h2 class="h2">Неделя к неделе</h2>\n    <div class="kv"><div><div class="v">', ' <small class="small2">/ ', '</small></div><div class="l">ответов: эта / прошлая</div></div><div><div class="v">', '% <small class="small2">/ ', '%</small></div><div class="l">точность: эта / прошлая</div></div>\n      <div><div class="v">', ' <small class="small2">/ ', '</small></div><div class="l">ошибок: эта / прошлая</div></div><div><div class="v">', ' <small class="small2">/ ', '</small></div><div class="l">Exam / Learning точность</div></div></div>\n    <h2 class="h2">Динамика по неделям</h2>\n    ', '\n\n    <h2 class="h2">Карта ошибок: блок × причина</h2>\n    ', '\n\n    <h2 class="h2">Топ-5 системных проблем</h2>\n    ', '\n\n    <h2 class="h2">Блоки курса</h2>\n    ', '\n    <p class="small2">Mastery = 15% уроки + 15% теория + 25% практика (первые ответы × покрытие) + 45% последняя контрольная. Повторные ответы на тот же вопрос в mastery не учитываются.</p>\n\n    <h2 class="h2">Словари</h2>\n    ', '\n\n    <h2 class="h2">Уровень и режим</h2>\n    <div class="cardx">', "", '</div>\n    <h2 class="h2">Сильные и слабые темы</h2>\n    ', '\n\n    <h2 class="h2">Экспорт и резервная копия</h2>\n    <div class="cardx"><div class="stack-btns">\n      <button class="btn btn-dark" onClick=', '>Экспорт CSV (выбранный период)</button>\n      <button class="btn btn-light" onClick=', '>Полный CSV</button>\n      <button class="btn btn-light" onClick=', '>Резервная копия JSON</button>\n      <button class="btn btn-light" onClick=', ">Импорт JSON</button></div>\n      ", '\n      <p class="small2" style=', ">Создаются 4 файла: weekly_summary, test_attempts, answer_events, error_map (UTF-8 с BOM — корректно открываются в Excel). На iPhone откроется меню «Поделиться» → «Сохранить в Файлы»; на Android — меню «Поделиться» или папка «Загрузки». Поведение браузеров может отличаться. Данные никуда не отправляются.</p></div>\n\n    ", "\n    ", "\n  </", ">"])), Screen, nav, { marginBottom: "8px" }, chip(r, setR, "7", "7 дней"), chip(r, setR, "30", "30 дней"), chip(r, setR, "all", "Всё время"), chip(r, setR, "custom", "Даты"), r === "custom" ? html(_b6 || (_b6 = __template(["<div style=", '><input class="datein" type="date" value=', " onChange=", ' aria-label="С"/><input class="datein" type="date" value=', " onChange=", ' aria-label="По"/></div>'])), { display: "flex", gap: "8px", marginBottom: "8px" }, from, (e) => setFrom(e.target.value), to, (e) => setTo(e.target.value)) : null, { marginBottom: "14px" }, chip(mode, setMode, "all", "Все режимы"), chip(mode, setMode, "exam", "Exam"), chip(mode, setMode, "learning", "Learning"), chip(lvl, setLvl, "all", "B2+C1"), chip(lvl, setLvl, "B2", "B2"), chip(lvl, setLvl, "C1", "C1"), courseScore, COURSE.length, BLOCKS.length, streak(app.events), { marginTop: "12px" }, allInRange.length, fa.accuracy, fa.n, fa.medianMs ? (fa.medianMs / 1e3).toFixed(1) + " с" : "—", fmtDur(allInRange.reduce((a, e) => a + (e.timeSpentMs || 0), 0)), cw.answered, pw.answered, cw.accuracy, pw.accuracy, cw.errors, pw.errors, modeB.map((x) => x.key === "exam" ? x.accuracy + "%" : null).filter(Boolean)[0] || "—", modeB.map((x) => x.key === "learning" ? x.accuracy + "%" : null).filter(Boolean)[0] || "—", weeks.length ? html(_e6 || (_e6 = __template(['<div class="cardx"><div class="bars" aria-label="Точность по неделям">', '</div>\n      <div class="bars" aria-label="Ошибки по неделям" style=', ">", '</div>\n      <p class="small2">Сверху — точность, снизу — число ошибок.</p></div>'])), weeks.map((w) => html(_c6 || (_c6 = __template(["<div key=", ' class="b"><span>', "%</span><i style=", "></i><span>", "</span></div>"])), w.week, w.accuracy, { height: Math.max(2, w.accuracy) + "px" }, w.week.slice(5))), { height: "80px" }, weeks.map((w) => {
      let mx = Math.max(...weeks.map((x) => x.errors), 1);
      return html(_d6 || (_d6 = __template(["<div key=", ' class="b"><span>', '</span><i class="e" style=', "></i></div>"])), w.week, w.errors, { height: Math.max(2, w.errors / mx * 50) + "px" });
    })) : html(_f6 || (_f6 = __template(['<div class="empty">Пока нет данных.</div>']))), matrix.some((m) => m.wrong) ? html(_l6 || (_l6 = __template(['<div class="heat"><table><thead><tr><th class="m">Блок</th>', "</tr></thead><tbody>\n      ", '\n      </tbody></table></div><p class="small2">Число ошибок и доля от всех ответов блока за период. Нажмите на ячейку — увидите вопросы и ответы, из которых сделан вывод.</p>'])), usedTags.map((t) => html(_g6 || (_g6 = __template(["<th key=", ">", "</th>"])), t, ERROR_TAGS[t])), matrix.filter((m) => m.total).map((m) => html(_k6 || (_k6 = __template(["<tr key=", '><td class="m">', '<div class="small2">', "/", "</div></td>", "</tr>"])), m.module, moduleTitle(m.module), m.wrong, m.total, usedTags.map((t) => {
      let c = m.tags[t] || 0, share = c / m.total;
      return html(_j6 || (_j6 = __template(["<td key=", ">", "</td>"])), t, c ? html(_h6 || (_h6 = __template(["<button style=", " onClick=", " aria-label=", ">", "<br/>", "%</button>"])), { background: "rgba(163,49,60,".concat(0.12 + share * 1.6, ")"), color: share > 0.3 ? "#fff" : "var(--ink)" }, () => setDrill({ module: m.module, tag: t }), "".concat(moduleTitle(m.module), ", ").concat(ERROR_TAGS[t], ": ").concat(c), c, Math.round(share * 100)) : html(_i6 || (_i6 = __template(['<span class="small2">·</span>']))));
    })))) : html(_m6 || (_m6 = __template(['<div class="empty">Ошибок за период нет — или ещё нет ответов.</div>']))), issues.length ? issues.map((x, k) => {
      let l = LESSON_BY_ID[x.sub];
      return html(_p6 || (_p6 = __template(["<div key=", ' class="cardx"><h3>', ". ", " — ", '</h3>\n      <p class="small2">', " ", " на ", " ", " (", '%). Вероятная причина — по разметке выбранных вариантов.</p>\n      <p class="small2"><b>Пример:</b> «', "» вместо «", "».</p>\n      <div style=", ">", '\n        <button class="link" onClick=', ">Вопросы</button>\n        ", "</div></div>"])), k, k + 1, ERROR_TAGS[x.tag], l ? l.title : moduleTitle(x.module), x.count, plural(x.count, "ошибка", "ошибки", "ошибок"), x.total, plural(x.total, "ответ", "ответа", "ответов"), Math.round(x.rate * 100), x.events[0].userAnswer || "—", x.events[0].correctAnswer, { display: "flex", gap: "12px", flexWrap: "wrap" }, l ? html(_n6 || (_n6 = __template(['<button class="link" onClick=', ">Урок</button>"])), () => app.nav.push("lesson", { id: l.id })) : null, () => setDrill({ module: x.module, tag: x.tag, sub: x.sub }), BLOCK_BY_ID[x.module] ? html(_o6 || (_o6 = __template(['<button class="link" onClick=', ">Ретест из новых заданий</button>"])), () => app.nav.push("practice", { title: "Ретест: " + (l ? l.title : x.module), key: "retest:" + x.sub, ids: BLOCK_BY_ID[x.module].questions.filter((q) => q.sub === x.sub && q.kind !== "theory").map((q) => q.id), n: 10 })) : null);
    }) : html(_q6 || (_q6 = __template(['<div class="empty">Недостаточно ошибок для выводов.</div>']))), masteries.map(({ b, m }) => {
      var _a9, _b9, _c9;
      return html(_r6 || (_r6 = __template(["<div key=", ' class="cardx"><div style=', "><h3 style=", ">", ". ", "</h3><", " s=", '/></div>\n      <p class="small2">Уроки ', "/", " · теория ", "% · практика ", "% (1-я попытка) · покрытие ", "% · контрольная ", "% · mastery ", '%</p>\n      <div class="hbar"><span>Покрытие банка</span><span class="t"><i style=', "></i></span><b>", "%</b></div></div>"])), b.id, { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }, { margin: 0 }, b.n, b.title, StatusChip, m.status, m.done, m.lessons, (_a9 = m.theoryAcc) != null ? _a9 : "—", (_b9 = m.practiceAcc) != null ? _b9 : "—", m.coverage, (_c9 = m.lastExam) != null ? _c9 : "—", m.score, { width: m.coverage + "%" }, m.coverage);
    }), DICTS.map((d) => {
      let st = dictStats(d, Object.fromEntries(d.sets.map((s) => [s.id, app.docs["vocab:" + s.id]])), app.docs["vocabfull:" + d.id], app.events);
      return html(_s6 || (_s6 = __template(["<div key=", ' class="cardx"><h3>', '</h3><p class="small2">Изучено ', "/", " · закреплено ", " · точность ", "% (", " ответов) · медиана ", " · последнее повторение ", '</p>\n        <p class="small2">Итоговые по наборам: ', " · полный: ", "</p></div>"])), d.id, d.title, st.learned, st.total, st.consolidated, st.accuracy, st.answers, st.medianMs ? (st.medianMs / 1e3).toFixed(1) + " с" : "—", st.lastTs ? fmtDT(st.lastTs) : "—", st.finals.map((f3) => "".concat(f3.set, ": ").concat(f3.best == null ? "—" : f3.best + "/" + f3.size)).join(" · "), st.fullBest == null ? "—" : st.fullBest + "/" + st.total);
    }), lvlB.concat(modeB).map((x) => html(_t6 || (_t6 = __template(["<div key=", ' class="hbar"><span>', " (", ')</span><span class="t"><i style=', "></i></span><b>", "%</b></div>"])), x.key, x.key === "exam" ? "Exam" : x.key === "learning" ? "Learning" : x.key, x.total, { width: x.accuracy + "%" }, x.accuracy)), lvlB.length ? null : html(_u6 || (_u6 = __template(['<p class="small2">Нет данных.</p>']))), strength.length ? html(_x6 || (_x6 = __template(['<div class="cardx">', "\n      ", '\n      <p class="small2">Темы с ≥ 4 ответами. Красные — слабые, зелёные — сильные.</p></div>'])), strength.slice(0, 4).map((s) => html(_v6 || (_v6 = __template(["<div key=", ' class="hbar"><span>', '</span><span class="t"><i style=', "></i></span><b>", "%</b></div>"])), s.module + s.sub, (LESSON_BY_ID[s.sub] || {}).title || s.sub, { width: s.accuracy + "%", background: "var(--bad-ink)" }, s.accuracy)), strength.length > 4 ? strength.slice(-3).reverse().map((s) => html(_w6 || (_w6 = __template(["<div key=", ' class="hbar"><span>', '</span><span class="t"><i style=', "></i></span><b>", "%</b></div>"])), "s" + s.module + s.sub, (LESSON_BY_ID[s.sub] || {}).title || s.sub, { width: s.accuracy + "%", background: "var(--ok-ink)" }, s.accuracy)) : null) : html(_y6 || (_y6 = __template(['<div class="empty">Нужно больше ответов (≥ 4 по теме).</div>']))), () => exportCSV("range"), () => exportCSV("full"), exportJSON, pickImport, msg ? html(_z6 || (_z6 = __template(['<p class="banner warn" style=', ">", "</p>"])), { marginTop: "10px" }, msg) : null, { marginTop: "10px" }, drill ? html(_A6 || (_A6 = __template(["<", " drill=", " events=", " onClose=", "/>"])), Drill, drill, evs, () => setDrill(null)) : null, imp ? html(_E5 || (_E5 = __template(["<", " onClose=", ' label="Импорт"><h2>Импорт ', "</h2>\n      ", "</", ">"])), Sheet, () => setImp(null), imp.name, imp.v.ok ? html(_B6 || (_B6 = __template(["<p>Файл корректен: ", " событий, ", " попыток, ", " документов (создан ", '). <b>Текущие данные на устройстве будут полностью заменены.</b></p>\n        <div class="stack-btns"><button class="btn btn-bad" onClick=', '>Заменить данные</button><button class="btn btn-light" onClick=', ">Отмена</button></div>"])), imp.v.summary.events, imp.v.summary.attempts, imp.v.summary.docs, imp.v.summary.exportedAt, async () => {
      await app.importAll(imp.obj.data), setImp(null), setMsg("Импорт выполнен.");
    }, () => setImp(null)) : html(_D4 || (_D4 = __template(['<p>Файл не прошёл проверку, данные не изменены:</p><ul class="replist">', '</ul><button class="btn btn-light" onClick=', ">Закрыть</button>"])), imp.v.errors.map((e) => html(_C6 || (_C6 = __template(["<li key=", ">", "</li>"])), e, e)), () => setImp(null)), Sheet) : null, Screen);
  }
  var _G5, _H5, _I5, _J5;
  function Drill({ drill, events, onClose }) {
    let app = useApp(), list = events.filter((e) => !e.isCorrect && e.moduleId === drill.module && (e.errorTags || []).includes(drill.tag) && (!drill.sub || e.subtopicId === drill.sub)).sort((a, b) => b.ts - a.ts);
    return html(_J5 || (_J5 = __template(["<", " onClose=", ' label="Детализация"><h2>', "</h2><p>", " · ", " ", " к этому выводу.</p>\n    ", '\n    <button class="btn btn-light" onClick=', ">Закрыть</button></", ">"])), Sheet, onClose, ERROR_TAGS[drill.tag], moduleTitle(drill.module), list.length, plural(list.length, "ответ привёл", "ответа привели", "ответов привели"), list.slice(0, 40).map((e) => {
      let q = Q_BY_ID[e.questionId], l = LESSON_BY_ID[e.lessonId];
      return html(_I5 || (_I5 = __template(["<div key=", ' class="cardx"><p class="small2">', " · ", " · ", "</p>\n        <p style=", ">", '</p><p class="small2">Ответ: <s>', '</s> → верно: <b lang="en">', "</b></p>\n        ", "", "</div>"])), e.id, fmtDT(e.ts), e.mode === "exam" ? "Exam" : "Learning", e.format, { fontWeight: 600 }, q ? q.prompt : e.questionId, e.userAnswer || "—", e.correctAnswer, q ? html(_G5 || (_G5 = __template(['<p class="small2">', "</p>"])), q.explain) : null, l ? html(_H5 || (_H5 = __template(['<button class="link" onClick=', ">Урок: ", "</button>"])), () => {
        onClose(), app.nav.push("lesson", { id: l.id });
      }, l.title) : null);
    }), onClose, Sheet);
  }
  var _K4, _L4, _M4, _N4, _O4;
  function ErrorsScreen({ params }) {
    let app = useApp(), evs = app.events.filter((e) => e.moduleId === params.module), m = errorMatrix(evs)[0], [drill, setDrill] = useState(null);
    return html(_O4 || (_O4 = __template(["<", ' title="Карта ошибок" sub=', " onBack=", ">\n    ", "\n    ", "\n  </", ">"])), Screen, moduleTitle(params.module), app.nav.back, m && m.wrong ? html(_L4 || (_L4 = __template(['<div class="cardx">', "</div>"])), Object.entries(m.tags).sort((a, b) => b[1] - a[1]).map(([t, c]) => html(_K4 || (_K4 = __template(["<button key=", ' class="row" onClick=', '><span class="rt"><b>', "</b><span>", " из ", " ответов (", '%)</span></span><span class="chev">', "</span></button>"])), t, () => setDrill({ module: params.module, tag: t }), ERROR_TAGS[t], c, m.total, pct(c, m.total), I.right))) : html(_M4 || (_M4 = __template(['<div class="empty">Ошибок нет.</div>']))), drill ? html(_N4 || (_N4 = __template(["<", " drill=", " events=", " onClose=", "/>"])), Drill, drill, evs, () => setDrill(null)) : null, Screen);
  }

  // src/content/plan30.js
  var T2 = (block2, lessons5) => ({ k: "lesson", block: block2, lessons: lessons5, min: 20 }), V = (dict, set, note) => ({ k: "vocab", dict, set, note, min: 30 }), G = (block2, note) => ({ k: "practice", block: block2, note, min: 35 }), X = (test, note) => ({ k: "test", test, note, min: 35 }), CL = (note) => ({ k: "cases", note, min: 35 }), R = () => ({ k: "review", min: 20 }), PLAN = [
    // Неделя 1: фундамент, времена, General 1–70, Business 1–25, неправильные глаголы
    { day: 1, week: 1, title: "Система времён", items: [T2("tenses", ["ten-sys", "ten-simple"]), V("general", "general-1", "слова 1–25"), G("tenses", "Simple и вопросы"), R()] },
    { day: 2, week: 1, title: "Continuous и стативы", items: [T2("tenses", ["ten-cont", "ten-stative"]), V("general", "general-1", "слова 26–50"), G("tenses", "Continuous / stative"), R()] },
    { day: 3, week: 1, title: "Present Perfect", items: [T2("tenses", ["ten-pp", "ten-ppc"]), V("irregular", "irr-1", "глаголы 1–50"), G("tenses", "PP vs Past Simple"), R()] },
    { day: 4, week: 1, title: "Прошедшее и будущее", items: [T2("tenses", ["ten-pastperf", "ten-future"]), V("general", "general-2", "слова 51–70"), G("tenses", "Past Perfect, future"), R()] },
    { day: 5, week: 1, title: "Придаточные и сочетания", items: [T2("tenses", ["ten-timecl", "ten-mix"]), V("business", "business-1", "слова 1–25"), CL("кейсы по временам"), R()] },
    { day: 6, week: 1, title: "Неправильные глаголы", items: [T2("irregular", ["irr-roles", "irr-aaa", "irr-abb", "irr-abc"]), V("irregular", "irr-2", "глаголы 51–100"), G("irregular", "формы V1→V2→V3"), R()] },
    { day: 7, week: 1, title: "Контроль недели 1", items: [T2("irregular", ["irr-aba", "irr-variants", "irr-confusing", "irr-pron"]), V("irregular", "irr-3", "глаголы 101–120"), X("block:tenses", "контрольная по временам"), X("block:irregular", "контрольная по глаголам")] },
    // Неделя 2: modals, conditionals, passive, gerund; General 71–140; Business 26–50
    { day: 8, week: 2, title: "Модальные: основа", items: [T2("modals", ["mod-basics", "mod-ability", "mod-permission"]), V("general", "general-2", "слова 71–100"), G("modals"), R()] },
    { day: 9, week: 2, title: "Обязанность и совет", items: [T2("modals", ["mod-obligation", "mod-advice"]), V("general", "general-3", "слова 101–120"), G("modals"), R()] },
    { day: 10, week: 2, title: "Выводы и modal perfect", items: [T2("modals", ["mod-deduction-present", "mod-deduction-past", "mod-perfect-crit", "mod-will-would"]), V("business", "business-1", "слова 26–50"), CL("кейсы по модальным"), R()] },
    { day: 11, week: 2, title: "Conditionals 0–3", items: [T2("conditionals", ["cond-zero-first", "cond-second", "cond-third"]), V("general", "general-3", "слова 121–140"), G("conditionals"), R()] },
    { day: 12, week: 2, title: "Mixed, unless, инверсия", items: [T2("conditionals", ["cond-mixed", "cond-unless", "cond-inversion"]), V("business", "business-1", "повторение 1–50"), G("conditionals"), R()] },
    { day: 13, week: 2, title: "Wish и нереальное прошлое", items: [T2("conditionals", ["cond-wish", "cond-unreal-past", "cond-variants"]), V("general", "general-2", "итоговая 50/50"), X("block:modals"), X("block:conditionals")] },
    { day: 14, week: 2, title: "Passive и Gerund", items: [T2("passive"), T2("gerund"), V("general", "general-3", "повторение"), R()] },
    // Неделя 3
    { day: 15, week: 3, title: "Reported Speech", items: [T2("reported"), V("general", "general-3", "итоговая 50/50"), CL("смешанные кейсы"), R()] },
    { day: 16, week: 3, title: "Relative Clauses", items: [T2("relative"), V("general", "general-4", "слова 151–175"), G("tenses", "повторение слабых тем"), R()] },
    { day: 17, week: 3, title: "Articles", items: [T2("articles"), V("general", "general-4", "слова 176–200"), G("modals", "повторение слабых тем"), R()] },
    { day: 18, week: 3, title: "Prepositions", items: [T2("prepositions"), V("business", "business-2", "слова 51–75"), G("conditionals", "повторение слабых тем"), R()] },
    { day: 19, week: 3, title: "Linking Words", items: [T2("linking"), V("general", "general-4", "итоговая 50/50"), CL("кейсы: ветвление"), R()] },
    { day: 20, week: 3, title: "Phrasal Verbs", items: [T2("phrasal"), V("business", "business-2", "повторение 51–75"), X("theory", "Theory Check"), R()] },
    { day: 21, week: 3, title: "Collocations", items: [T2("collocations"), V("general", null, "полный контрольный General 200"), X("cases", "контрольная Case Lab"), R()] },
    // Неделя 4
    { day: 22, week: 4, title: "Word Formation", items: [T2("wordform"), V("business", "business-2", "слова 76–100"), G("irregular", "формы"), R()] },
    { day: 23, week: 4, title: "Quantifiers / Comparison", items: [T2("quantifiers"), V("business", "business-2", "итоговая 50/50"), CL("кейсы: hotspot"), R()] },
    { day: 24, week: 4, title: "Advanced Grammar", items: [T2("advanced"), V("business", null, "полный контрольный Business 100"), G("tenses"), R()] },
    { day: 25, week: 4, title: "Register / Nuance", items: [T2("register"), V("irregular", null, "полный контрольный Irregular"), G("modals"), R()] },
    { day: 26, week: 4, title: "Смешанный экзамен 1", items: [X("mixed"), V("general", "general-1", "повторение сложных"), R()] },
    { day: 27, week: 4, title: "Слабые места", items: [R(), G("conditionals", "по карте ошибок"), V("general", "general-2", "повторение сложных"), CL()] },
    { day: 28, week: 4, title: "Theory Check 2", items: [X("theory"), V("general", "general-3", "повторение сложных"), R()] },
    { day: 29, week: 4, title: "Case Lab 2", items: [X("cases"), V("general", "general-4", "повторение сложных"), R()] },
    { day: 30, week: 4, title: "Финальный смешанный экзамен", items: [X("mixed", "сравните с днём 26"), V("general", null, "полный контрольный General 200"), R()] }
  ];

  // src/ui/today.js
  var DAY2 = 864e5, planDayIndex = (start) => Math.max(0, Math.min(29, Math.floor((new Date(dayKey(Date.now())) - new Date(start)) / DAY2)));
  function itemDone(it, app, dayStartTs) {
    let course = app.docs.course || {}, since = (e) => e.ts >= dayStartTs;
    switch (it.k) {
      case "lesson":
        return !!BLOCK_BY_ID[it.block] && (it.lessons || BLOCK_BY_ID[it.block].lessons.map((l) => l.id)).every((id) => course.lessons && course.lessons[id] && course.lessons[id].doneAt);
      case "vocab":
        return app.events.filter((e) => e.moduleId === "vocab-" + it.dict && since(e) && (!it.set || (e.subtopicId || "").startsWith(it.set))).length >= 15;
      case "practice":
        return app.events.filter((e) => e.moduleId === it.block && e.mode === "learning" && since(e)).length >= 10;
      case "cases":
        return app.events.filter((e) => e.kind === "case" && since(e)).length >= 6;
      case "test":
        return app.attempts.some((a) => a.testId === it.test && a.finishedAt >= dayStartTs);
      default:
        return !1;
    }
  }
  function itemLabel(it) {
    switch (it.k) {
      case "lesson": {
        let b = BLOCK_BY_ID[it.block], c = COURSE.find((x) => x.id === it.block);
        return { t: "Теория: " + (b ? b.title : c.title), s: b && it.lessons ? it.lessons.map((id) => LESSON_BY_ID[id].title).join(" · ") : "все уроки блока", ok: !!b };
      }
      case "vocab":
        return { t: "Слова: " + DICT_BY_ID[it.dict].title, s: it.note || "", ok: !0 };
      case "practice":
        return { t: "Грамматика: " + BLOCK_BY_ID[it.block].title, s: it.note || "тренировка Learning Mode", ok: !0 };
      case "cases":
        return { t: "Case Lab", s: it.note || "кейсы в Learning Mode", ok: !0 };
      case "test":
        return { t: TEST_BY_ID[it.test] ? TEST_BY_ID[it.test].title : it.test, s: it.note || "Exam Mode", ok: !!TEST_BY_ID[it.test] };
      case "review":
        return { t: "Разбор ошибок", s: "ошибки за последние 7 дней", ok: !0 };
    }
  }
  function openItem(app, it) {
    switch (it.k) {
      case "lesson": {
        let b = BLOCK_BY_ID[it.block], course = app.docs.course || {}, nextL = (it.lessons || []).find((id) => !(course.lessons && course.lessons[id] && course.lessons[id].doneAt));
        return nextL ? app.nav.push("lesson", { id: nextL }) : app.nav.push("block", { id: b.id });
      }
      case "vocab":
        return it.set ? app.nav.push("vocabSet", { setId: it.set }) : app.nav.push("vocabFull", { dict: it.dict });
      case "practice": {
        let b = BLOCK_BY_ID[it.block];
        return app.nav.push("practice", { title: b.title, key: "block:" + b.id, ids: b.questions.filter((q) => q.kind === "practice" && !q.drill).map((q) => q.id), n: 15 });
      }
      case "cases":
        return app.nav.push("practice", { title: "Case Lab", key: "cases:all", ids: Object.keys(Q_BY_ID).filter((id) => Q_BY_ID[id].kind === "case"), n: 8 });
      case "test":
        return app.nav.push("examIntro", { testId: it.test });
      case "review":
        return app.nav.push("review");
    }
  }
  var _a7, _b7, _c7, _d7, _e7, _f7, _g7, _h7, _i7;
  function TodayTab({ nav }) {
    let app = useApp(), plan = (app.docs.course || {}).plan || {}, start = plan.start || dayKey(Date.now()), idx0 = planDayIndex(start), [idx, setIdx] = useState(idx0), day = PLAN[idx], dayStart = new Date(start).getTime() + idx * DAY2, manual = plan.done || {}, isDone = (it, k) => manual["".concat(day.day, ":").concat(k)] != null ? manual["".concat(day.day, ":").concat(k)] : itemDone(it, app, idx === idx0 ? new Date(dayKey(Date.now())).getTime() : dayStart), toggle = (k, v) => app.setDoc("course", (c) => (c = Object.assign({}, c), c.plan = Object.assign({ start }, c.plan), c.plan.done = Object.assign({}, c.plan.done, { ["".concat(day.day, ":").concat(k)]: v }), c)), open = Object.values(app.sessions).filter((s) => s.id.startsWith("exam:") && s.attempt || s.id.startsWith("learn:") && !s.done && s.queue), behind = PLAN.slice(0, idx0).filter((d) => d.items.some((it, k) => {
      var _a9;
      return itemLabel(it).ok && !((_a9 = manual["".concat(d.day, ":").concat(k)]) != null && _a9) && it.k !== "review" && !itemDone(it, app, 0);
    })), weak = topicStrength(app.events.filter((e) => e.ts > Date.now() - 14 * DAY2)).filter((s) => s.accuracy < 70 && LESSON_BY_ID[s.sub])[0];
    return useEffect(() => {
      plan.start || app.setDoc("course", (c) => Object.assign({}, c, { plan: Object.assign({ start }, (c || {}).plan) }));
    }, []), html(_i7 || (_i7 = __template(["<", " bare nav=", '>\n    <div class="home-head"><div><h1>Wordsword</h1><p>Интенсив B2 → C1 · <', '/></p></div>\n      <div class="acts"><button class="ib" aria-label=', " onClick=", ">", '</button><button class="ib" aria-label="Настройки" onClick=', ">", "</button></div></div>\n    ", '\n    <h2 class="h2">30 дней</h2>\n    <div class="daynav"><button class="ib" disabled=', " onClick=", ' aria-label="Предыдущий день">', '</button>\n      <div class="c"><b>День ', "", '</b><span class="small2">Неделя ', " · ", '</span></div>\n      <button class="ib" disabled=', " onClick=", ' aria-label="Следующий день">', '</button></div>\n    <p class="small2" style=', ">Ориентир на день: 20 мин теория · 30 мин словарь · 35 мин грамматика/кейсы · 20 мин разбор ошибок. Другие темы не блокируются.</p>\n    ", "\n    ", "\n    ", '\n    <p class="small2" style=', ">Старт маршрута: ", ". Изменить можно в настройках.</p>\n  </", ">"])), Screen, nav, SaveBadge, app.prefs.sound ? "Выключить звук" : "Включить звук", () => app.setPref("sound", !app.prefs.sound, !0), app.prefs.sound ? I.soundOn : I.soundOff, () => app.nav.push("settings"), I.gear, open.length ? html(_c7 || (_c7 = __template(['<h2 class="h2">Продолжить</h2>', ""])), open.map((s) => s.attempt ? html(_a7 || (_a7 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, s.id, s.attempt.title, "контрольная · заполнено ".concat(filledCount(s.attempt), "/").concat(s.attempt.items.length), () => app.nav.push("exam", { testId: s.attempt.testId })) : html(_b7 || (_b7 = __template(["<", " key=", " title=", " sub=", " onClick=", "/>"])), Row, s.id, "Тренировка: " + s.scope, "задание ".concat(s.pos + 1, " из ").concat(s.queue.length), () => app.nav.push("practice", { title: "Продолжение тренировки", key: s.scope, ids: s.queue, n: s.queue.length })))) : null, idx === 0, () => setIdx(idx - 1), I.left, day.day, idx === idx0 ? " · сегодня" : "", day.week, day.title, idx === 29, () => setIdx(idx + 1), I.right, { margin: "0 2px 8px" }, day.items.map((it, k) => {
      let lab = itemLabel(it), done2 = isDone(it, k);
      return lab.ok ? html(_e7 || (_e7 = __template(["<div key=", " style=", "><button class=", " style=", " aria-pressed=", ' aria-label="Отметить выполненным" onClick=', ">", "</button>\n        <div style=", "><", " title=", " sub=", " onClick=", "/></div></div>"])), k, { display: "flex", gap: "8px", alignItems: "stretch", marginBottom: "8px" }, "chk" + (done2 ? " on" : ""), { alignSelf: "center" }, done2, () => toggle(k, !done2), done2 ? I.check : null, { flex: 1 }, Row, lab.t, lab.s + " · ~" + it.min + " мин", () => openItem(app, it)) : html(_d7 || (_d7 = __template(["<div key=", ' class="row dim"><span class="rt"><b>', "</b><span>Этого блока нет в текущей сборке. Вместо него в этот день: разбор ошибок и тренировка слабых тем.</span></span></div>"])), k, lab.t);
    }), weak ? html(_f7 || (_f7 = __template(['<h2 class="h2">Адаптация по результатам</h2><', " title=", " sub=", " onClick=", "/>"])), Row, "Слабая тема: " + LESSON_BY_ID[weak.sub].title, "точность ".concat(weak.accuracy, "% за 14 дней — короткая тренировка"), () => app.nav.push("practice", { title: LESSON_BY_ID[weak.sub].title, key: "weak:" + weak.sub, ids: BLOCK_BY_ID[weak.module].questions.filter((q) => q.sub === weak.sub).map((q) => q.id), n: 10 })) : null, behind.length ? html(_h7 || (_h7 = __template(['<h2 class="h2">Догнать</h2>', ""])), behind.slice(0, 3).map((d) => html(_g7 || (_g7 = __template(["<", " key=", " title=", ' sub="есть невыполненные пункты" onClick=', "/>"])), Row, d.day, "День " + d.day + ": " + d.title, () => setIdx(d.day - 1)))) : null, { marginTop: "14px" }, new Date(start).toLocaleDateString("ru-RU"), Screen);
  }
  var _j7, _k7, _l7, _m7, _n7, _o7, _p7, _q7, _r7;
  function ReviewScreen() {
    let app = useApp(), recent = app.events.filter((e) => !e.isCorrect && e.ts > Date.now() - 7 * DAY2), grammar = recent.filter((e) => Q_BY_ID[e.questionId]), vocab = recent.filter((e) => e.kind === "vocab"), ids = [...new Set(grammar.map((e) => e.questionId))], issues = topIssues(recent, 5);
    return html(_r7 || (_r7 = __template(["<", ' title="Разбор ошибок" sub="последние 7 дней" onBack=', " footer=", ">\n    ", "\n    ", "\n    ", "\n  </", ">"])), Screen, app.nav.back, ids.length ? html(_j7 || (_j7 = __template(['<button class="btn btn-dark" onClick=', ">Тренировать эти задания (", ")</button>"])), () => app.nav.replace("practice", { title: "Работа над ошибками", key: "review", ids, n: Math.min(15, ids.length) }), ids.length) : null, recent.length ? null : html(_k7 || (_k7 = __template(['<div class="empty">За 7 дней ошибок нет. Отличная работа — или пора пройти тренировку.</div>']))), issues.map((x, k) => html(_n7 || (_n7 = __template(["<div key=", ' class="cardx"><h3>', '</h3><p class="small2">', "", " · ", " ", "</p>\n      ", "\n      ", "</div>"])), k, ERROR_TAGS[x.tag], moduleTitle(x.module), LESSON_BY_ID[x.sub] ? " · " + LESSON_BY_ID[x.sub].title : "", x.count, plural(x.count, "ошибка", "ошибки", "ошибок"), x.events.slice(0, 3).map((e) => html(_l7 || (_l7 = __template(["<p key=", ' class="small2">«', '» → <b lang="en">', "</b></p>"])), e.id, e.userAnswer || "—", e.correctAnswer)), LESSON_BY_ID[x.sub] ? html(_m7 || (_m7 = __template(['<button class="link" onClick=', ">Повторить урок</button>"])), () => app.nav.push("lesson", { id: x.sub })) : null)), vocab.length ? html(_q7 || (_q7 = __template(['<h2 class="h2">Слова с ошибками</h2><ul class="replist">', '</ul><p class="small2">Эти слова автоматически чаще попадаются в тренировках словаря.</p>'])), [...new Map(vocab.map((e) => [e.questionId, e])).values()].slice(0, 30).map((e) => html(_p7 || (_p7 = __template(["<li key=", '><b lang="en">', "</b>", "</li>"])), e.id, e.correctAnswer, e.userAnswer ? html(_o7 || (_o7 = __template([" — ваш ответ: ", ""])), e.userAnswer) : null))) : null, Screen);
  }
  var _s7, _t7, _u7, _v7;
  function SettingsScreen() {
    let app = useApp(), [ask, setAsk] = useState(!1), course = app.docs.course || {};
    return html(_v7 || (_v7 = __template(["<", ' title="Настройки" onBack=', '>\n    <div class="cardx">\n      <button class="set-row" onClick=', "><span>Звук ответов</span><span class=", "></span></button>\n      ", '\n      <div class="set-row"><span>Тема</span><div class="seg">', '</div></div>\n      <div class="set-row"><span>Старт 30-дневного маршрута</span><input class="datein" type="date" value=', " onChange=", '/></div>\n    </div>\n    <h2 class="h2">Хранение данных</h2>\n    <div class="cardx"><p class="small2">Прогресс хранится в IndexedDB этого браузера и не зависит от кэша приложения: обновления не стирают данные. ', ' Данные пропадут, если очистить данные сайта, удалить приложение или если ОС освободит место. Регулярно делайте резервную копию JSON в разделе «Прогресс».</p>\n      <p class="small2"><', '/></p>\n      <button class="btn btn-light" style=', " onClick=", '>Запросить постоянное хранилище</button></div>\n    <h2 class="h2">О сборке</h2>\n    <div class="cardx"><p class="small2">Версия контента ', ". Блоков в сборке: ", " из ", '. Работает офлайн после первого открытия.</p></div>\n    <button class="btn btn-bad" style=', " onClick=", ">Сбросить весь прогресс</button>\n    ", "\n  </", ">"])), Screen, app.nav.back, () => app.setPref("sound", !app.prefs.sound, !0), "sw" + (app.prefs.sound ? " on" : ""), navigator.vibrate ? html(_s7 || (_s7 = __template(['<button class="set-row" onClick=', "><span>Вибрация</span><span class=", "></span></button>"])), () => app.setPref("vibro", !app.prefs.vibro), "sw" + (app.prefs.vibro ? " on" : "")) : null, [["light", "Светлая"], ["dark", "Тёмная"], ["auto", "Авто"]].map(([k, l]) => html(_t7 || (_t7 = __template(["<button key=", " aria-pressed=", " onClick=", ">", "</button>"])), k, app.prefs.theme === k, () => app.setPref("theme", k), l)), course.plan && course.plan.start || "", (e) => e.target.value && app.setDoc("course", (c) => Object.assign({}, c, { plan: Object.assign({}, (c || {}).plan, { start: e.target.value }) })), app.persisted === !0 ? "Браузер подтвердил постоянное хранилище." : app.persisted === !1 ? "Браузер не подтвердил постоянное хранилище — при нехватке места он может очистить данные." : "Статус постоянного хранилища неизвестен.", SaveBadge, { width: "100%" }, () => app.requestPersist(), CONTENT_VERSION, BLOCKS.length, COURSE.length, { width: "100%", marginTop: "8px" }, () => setAsk(!0), ask ? html(_u7 || (_u7 = __template(["<", " onClose=", ' label="Сброс"><h2>Сбросить весь прогресс?</h2><p>Будут удалены все ответы, попытки, уроки и словари на этом устройстве. Сначала сделайте резервную копию JSON.</p>\n      <div class="stack-btns"><button class="btn btn-bad" onClick=', '>Удалить всё</button><button class="btn btn-light" onClick=', ">Отмена</button></div></", ">"])), Sheet, () => setAsk(!1), async () => {
      await app.resetAll(), setAsk(!1), app.nav.back();
    }, () => setAsk(!1), Sheet) : null, Screen);
  }

  // src/main.js
  var store = createStore(), SCREENS = {
    block: BlockScreen,
    lesson: LessonScreen,
    practice: PracticeScreen,
    irregularForms: IrregularForms,
    examIntro: ExamIntro,
    exam: ExamRun,
    results: Results,
    errors: ErrorsScreen,
    review: ReviewScreen,
    settings: SettingsScreen,
    vocabDict: VocabDict,
    vocabSet: VocabSet,
    vocabLevel: VocabLevel,
    vocabFinal: VocabFinal,
    vocabFull: VocabFinal,
    vocabResult: VocabResult
  }, TABS = { today: TodayTab, course: CourseTab, words: WordsTab, tests: TestsTab, progress: ProgressTab }, _a8, _b8, _c8, _d8;
  function App({ boot: boot2 }) {
    let [docs, setDocs] = useState(boot2.docs), docsRef = useRef(boot2.docs), [events, setEvents] = useState(boot2.events), [attempts, setAttempts] = useState(boot2.attempts), [sessions, setSessions] = useState(boot2.sessions), [saveStatus, setSaveStatus] = useState(store.status), [tab, setTabState] = useState("today"), [stack, setStack] = useState([]), stackRef = useRef(stack);
    stackRef.current = stack;
    let [persisted, setPersisted] = useState(boot2.persisted), prefs = Object.assign({ sound: !0, vibro: !0, theme: "auto" }, docs.prefs);
    useEffect(() => store.onStatus(setSaveStatus), []), useEffect(() => {
      let dark = prefs.theme === "dark" || prefs.theme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
      let m = document.querySelector('meta[name="theme-color"]');
      m && m.setAttribute("content", dark ? "#0F1117" : "#F3F4F8");
    }, [prefs.theme]), useEffect(() => {
      let f3 = () => {
        store.flush();
      };
      return window.addEventListener("pagehide", f3), document.addEventListener("visibilitychange", f3), () => {
        window.removeEventListener("pagehide", f3), document.removeEventListener("visibilitychange", f3);
      };
    }, []), useEffect(() => {
      let onPop = () => {
        stackRef.current.length && setStack((s) => s.slice(0, -1));
      };
      return window.addEventListener("popstate", onPop), () => window.removeEventListener("popstate", onPop);
    }, []);
    let setDoc = useCallback((key, upd) => {
      let cur = docsRef.current[key], val = typeof upd == "function" ? upd(cur) : upd;
      docsRef.current = Object.assign({}, docsRef.current, { [key]: val }), setDocs(docsRef.current), store.saveDoc(key, val).catch(() => {
      });
    }, []), app = {
      docs,
      setDoc,
      events,
      attempts,
      sessions,
      saveStatus,
      store,
      prefs,
      persisted,
      setPref: (k, v, demo) => {
        setDoc("prefs", (p2) => Object.assign({ sound: !0, vibro: !0, theme: "auto" }, p2, { [k]: v })), demo && k === "sound" && v && (unlockAudio(), playSfx({ sound: !0 }, "ok"));
      },
      sfx: (k) => playSfx(prefs, k),
      addEvent: (ev) => {
        setEvents((es) => es.concat(ev)), store.addEvents([ev]).catch(() => {
        });
      },
      putSession: (s) => {
        setSessions((m) => Object.assign({}, m, { [s.id]: s })), store.putSession(s).catch(() => {
        });
      },
      delSession: (id) => {
        setSessions((m) => {
          let n = Object.assign({}, m);
          return delete n[id], n;
        }), store.delSession(id).catch(() => {
        });
      },
      commitAttempt: (attempt, evs, sessionId, extraDocs = {}) => {
        if (TEST_BY_ID[attempt.testId]) {
          let exp = Object.assign({}, docsRef.current.exposure), t = Object.assign({}, exp[attempt.testId]);
          attempt.items.forEach((i) => {
            t[i.qid] = (t[i.qid] || 0) + 1;
          }), exp[attempt.testId] = t, setDoc("exposure", exp);
        }
        Object.entries(extraDocs).forEach(([k, v]) => {
          docsRef.current = Object.assign({}, docsRef.current, { [k]: v }), setDocs(docsRef.current), store.saveDoc(k, v, 0).catch(() => {
          });
        }), setAttempts((a) => a.concat(attempt)), setEvents((e) => e.concat(evs)), sessionId && setSessions((m) => {
          let n = Object.assign({}, m);
          return delete n[sessionId], n;
        }), store.commitAttempt(attempt, evs, {}, sessionId).catch(() => {
        });
      },
      importAll: async (data) => {
        await store.replaceAll(data), location.reload();
      },
      resetAll: async () => {
        await store.clearProgress("all"), location.reload();
      },
      requestPersist: async () => {
        try {
          let r = navigator.storage && navigator.storage.persist ? await navigator.storage.persist() : null;
          setPersisted(r);
        } catch (e) {
          setPersisted(!1);
        }
      },
      nav: {
        push: (name, params = {}) => {
          history.pushState({ ws: stackRef.current.length + 1 }, ""), setStack((s) => s.concat({ name, params, k: Date.now() }));
        },
        replace: (name, params = {}) => setStack((s) => s.slice(0, -1).concat({ name, params, k: Date.now() })),
        back: () => {
          stackRef.current.length && history.back();
        },
        tab,
        setTab: (t) => {
          if (setTabState(t), stackRef.current.length) {
            let n = stackRef.current.length;
            setStack([]), history.go(-n);
          }
        }
      }
    }, top = stack[stack.length - 1], nav = html(_a8 || (_a8 = __template(["<", " tab=", " setTab=", "/>"])), BottomNav, tab, app.nav.setTab), screen;
    if (top) {
      let S2 = SCREENS[top.name];
      screen = html(_b8 || (_b8 = __template(["<", " key=", " params=", "/>"])), S2, top.k, top.params);
    } else {
      let T3 = TABS[tab];
      screen = html(_c8 || (_c8 = __template(["<", " nav=", "/>"])), T3, nav);
    }
    return html(_d8 || (_d8 = __template(["<", " value=", ">", "</", ">"])), AppCtx.Provider, app, screen, AppCtx.Provider);
  }
  var _e8;
  async function boot() {
    let root = document.getElementById("root");
    try {
      let meta2 = await store.init(), docs = await store.loadDocs();
      if (!meta2.legacyChecked) {
        try {
          let agents = DICTS.find((d) => d.id === "agents"), raw = localStorage.getItem(agents.legacyKey), m = migrateLegacyVocab(raw);
          m && !docs["vocab:agents"] && (await store.saveDoc("vocab:agents", m, 0), docs["vocab:agents"] = m);
          let p2 = localStorage.getItem("cvt:prefs");
          if (p2 && !docs.prefs) {
            let pr = JSON.parse(p2);
            await store.saveDoc("prefs", pr, 0), docs.prefs = pr;
          }
        } catch (e) {
        }
        await store.saveDoc("meta", Object.assign({}, meta2, { legacyChecked: !0 }), 0), docs.meta = Object.assign({}, meta2, { legacyChecked: !0 });
      }
      let [events, attempts, sessionsArr] = await Promise.all([store.events(), store.attempts(), store.sessions()]), persisted = null;
      try {
        navigator.storage && navigator.storage.persisted && (persisted = await navigator.storage.persisted(), !persisted && navigator.storage.persist && (persisted = await navigator.storage.persist()));
      } catch (e) {
      }
      let sessions = Object.fromEntries(sessionsArr.map((s) => [s.id, s]));
      window.__wsMounted = !0, ReactDOM.createRoot(root).render(html(_e8 || (_e8 = __template(["<", " boot=", "/>"])), App, { docs, events, attempts, sessions, persisted }));
    } catch (e) {
      window.__wsMounted = !0, root.innerHTML = '<div class="boot" style="padding:24px;text-align:center">Не удалось открыть хранилище: '.concat(String(e.message || e), ".<br>Закройте другие вкладки приложения и обновите страницу. Если используется приватный режим браузера или файл открыт напрямую с диска в браузере, который это запрещает, сохранение может быть недоступно.</div>");
    }
  }
  boot();
  (!window.React || !window.ReactDOM || !window.htm) && window.__wsFail && window.__wsFail("Не загрузились библиотеки из папки lib/.");
  "serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost") && navigator.serviceWorker.register("./sw.js").catch(() => {
  });
})();
