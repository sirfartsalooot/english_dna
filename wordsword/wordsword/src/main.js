import { html, React, useState, useEffect, useRef, useCallback, AppCtx, BottomNav, playSfx, unlockAudio, SFX } from "./ui/core.js";
import { createStore, migrateLegacyVocab } from "./engine/store.js";
import { TEST_BY_ID, DICTS } from "./content/index.js";
import { CourseTab, BlockScreen, LessonScreen, PracticeScreen, IrregularForms } from "./ui/course.js";
import { TestsTab, ExamIntro, ExamRun, Results } from "./ui/exam.js";
import { WordsTab, VocabDict, VocabSet, VocabLevel, VocabFinal, VocabResult } from "./ui/vocab.js";
import { ProgressTab, ErrorsScreen } from "./ui/dashboard.js";
import { TodayTab, ReviewScreen, SettingsScreen } from "./ui/today.js";

const store = createStore();
const SCREENS = {
  block: BlockScreen, lesson: LessonScreen, practice: PracticeScreen, irregularForms: IrregularForms,
  examIntro: ExamIntro, exam: ExamRun, results: Results, errors: ErrorsScreen, review: ReviewScreen, settings: SettingsScreen,
  vocabDict: VocabDict, vocabSet: VocabSet, vocabLevel: VocabLevel, vocabFinal: VocabFinal, vocabFull: VocabFinal, vocabResult: VocabResult
};
const TABS = { today: TodayTab, course: CourseTab, words: WordsTab, tests: TestsTab, progress: ProgressTab };

function App({ boot }) {
  const [docs, setDocs] = useState(boot.docs); const docsRef = useRef(boot.docs);
  const [events, setEvents] = useState(boot.events); const [attempts, setAttempts] = useState(boot.attempts);
  const [sessions, setSessions] = useState(boot.sessions); const [saveStatus, setSaveStatus] = useState(store.status);
  const [tab, setTabState] = useState("today"); const [stack, setStack] = useState([]); const stackRef = useRef(stack); stackRef.current = stack;
  const [persisted, setPersisted] = useState(boot.persisted);
  const prefs = Object.assign({ sound: true, vibro: true, theme: "auto" }, docs.prefs);

  useEffect(() => store.onStatus(setSaveStatus), []);
  useEffect(() => { const dark = prefs.theme === "dark" || (prefs.theme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light"); const m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute("content", dark ? "#0F1117" : "#F3F4F8"); }, [prefs.theme]);
  useEffect(() => { const f = () => { store.flush(); }; window.addEventListener("pagehide", f); document.addEventListener("visibilitychange", f); return () => { window.removeEventListener("pagehide", f); document.removeEventListener("visibilitychange", f); }; }, []);
  useEffect(() => { const onPop = () => { if (stackRef.current.length) setStack(s => s.slice(0, -1)); }; window.addEventListener("popstate", onPop); return () => window.removeEventListener("popstate", onPop); }, []);

  const setDoc = useCallback((key, upd) => { const cur = docsRef.current[key]; const val = typeof upd === "function" ? upd(cur) : upd;
    docsRef.current = Object.assign({}, docsRef.current, { [key]: val }); setDocs(docsRef.current); store.saveDoc(key, val).catch(() => {}); }, []);
  const app = {
    docs, setDoc, events, attempts, sessions, saveStatus, store, prefs, persisted,
    setPref: (k, v, demo) => { setDoc("prefs", p => Object.assign({ sound: true, vibro: true, theme: "auto" }, p, { [k]: v })); if (demo && k === "sound" && v) { unlockAudio(); playSfx({ sound: true }, "ok"); } },
    sfx: k => playSfx(prefs, k),
    addEvent: ev => { setEvents(es => es.concat(ev)); store.addEvents([ev]).catch(() => {}); },
    putSession: s => { setSessions(m => Object.assign({}, m, { [s.id]: s })); store.putSession(s).catch(() => {}); },
    delSession: id => { setSessions(m => { const n = Object.assign({}, m); delete n[id]; return n; }); store.delSession(id).catch(() => {}); },
    commitAttempt: (attempt, evs, sessionId, extraDocs = {}) => {
      if (TEST_BY_ID[attempt.testId]) { const exp = Object.assign({}, docsRef.current.exposure); const t = Object.assign({}, exp[attempt.testId]); attempt.items.forEach(i => { t[i.qid] = (t[i.qid] || 0) + 1; }); exp[attempt.testId] = t; setDoc("exposure", exp); }
      Object.entries(extraDocs).forEach(([k, v]) => { docsRef.current = Object.assign({}, docsRef.current, { [k]: v }); setDocs(docsRef.current); store.saveDoc(k, v, 0).catch(() => {}); });
      setAttempts(a => a.concat(attempt)); setEvents(e => e.concat(evs));
      if (sessionId) setSessions(m => { const n = Object.assign({}, m); delete n[sessionId]; return n; });
      store.commitAttempt(attempt, evs, {}, sessionId).catch(() => {});
    },
    importAll: async data => { await store.replaceAll(data); location.reload(); },
    resetAll: async () => { await store.clearProgress("all"); location.reload(); },
    requestPersist: async () => { try { const r = navigator.storage && navigator.storage.persist ? await navigator.storage.persist() : null; setPersisted(r); } catch (e) { setPersisted(false); } },
    nav: {
      push: (name, params = {}) => { history.pushState({ ws: stackRef.current.length + 1 }, ""); setStack(s => s.concat({ name, params, k: Date.now() })); },
      replace: (name, params = {}) => setStack(s => s.slice(0, -1).concat({ name, params, k: Date.now() })),
      back: () => { if (stackRef.current.length) history.back(); },
      tab, setTab: t => { setTabState(t); if (stackRef.current.length) { const n = stackRef.current.length; setStack([]); history.go(-n); } }
    }
  };
  const top = stack[stack.length - 1];
  const nav = html`<${BottomNav} tab=${tab} setTab=${app.nav.setTab}/>`;
  let screen;
  if (top) { const S = SCREENS[top.name]; screen = html`<${S} key=${top.k} params=${top.params}/>`; }
  else { const T = TABS[tab]; screen = html`<${T} nav=${nav}/>`; }
  return html`<${AppCtx.Provider} value=${app}>${screen}</${AppCtx.Provider}>`;
}

async function boot() {
  const root = document.getElementById("root");
  try {
    const meta = await store.init();
    let docs = await store.loadDocs();
    if (!meta.legacyChecked) { // one-time import from the previous vocab-app (same origin only)
      try { const agents = DICTS.find(d => d.id === "agents"); const raw = localStorage.getItem(agents.legacyKey); const m = migrateLegacyVocab(raw);
        if (m && !docs["vocab:agents"]) { await store.saveDoc("vocab:agents", m, 0); docs["vocab:agents"] = m; }
        const p = localStorage.getItem("cvt:prefs"); if (p && !docs.prefs) { const pr = JSON.parse(p); await store.saveDoc("prefs", pr, 0); docs.prefs = pr; } } catch (e) {}
      await store.saveDoc("meta", Object.assign({}, meta, { legacyChecked: true }), 0); docs.meta = Object.assign({}, meta, { legacyChecked: true });
    }
    const [events, attempts, sessionsArr] = await Promise.all([store.events(), store.attempts(), store.sessions()]);
    let persisted = null; try { if (navigator.storage && navigator.storage.persisted) { persisted = await navigator.storage.persisted(); if (!persisted && navigator.storage.persist) persisted = await navigator.storage.persist(); } } catch (e) {}
    const sessions = Object.fromEntries(sessionsArr.map(s => [s.id, s]));
    window.__wsMounted = true;
    ReactDOM.createRoot(root).render(html`<${App} boot=${{ docs, events, attempts, sessions, persisted }}/>`);
  } catch (e) {
    window.__wsMounted = true;
    root.innerHTML = `<div class="boot" style="padding:24px;text-align:center">Не удалось открыть хранилище: ${String(e.message || e)}.<br>Закройте другие вкладки приложения и обновите страницу. Если используется приватный режим браузера или файл открыт напрямую с диска в браузере, который это запрещает, сохранение может быть недоступно.</div>`;
  }
}
boot();
if (!window.React || !window.ReactDOM || !window.htm) window.__wsFail && window.__wsFail("Не загрузились библиотеки из папки lib/.");
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) navigator.serviceWorker.register("./sw.js").catch(() => {});
