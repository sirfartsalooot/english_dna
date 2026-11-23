// Original vocab-app trainer (6 levels + final test), ported with the same didactic mechanics:
// 10/20/50 words, weighted selection of difficult words, requeue of mistakes (3–5 items later),
// group-aware distractors, final test without hints, history. Storage moved to IndexedDB;
// every answer also produces an analytics event.
import { html, useState, useEffect, useRef, useMemo, useCallback, useApp, Screen, I, Row, Sheet, createContext, useContext, fmtDT } from "./core.js";
import { DICT_BY_ID, SET_BY_ID, DICTS, CONTENT_VERSION } from "../content/index.js";
import { norm, accepts, shuffle, plural, pct, uid, iso, dayKey } from "../engine/util.js";
import { isSpellingSlip } from "../engine/scoring.js";

const VCtx = createContext(null);
const useV = () => useContext(VCtx);
const plainSentence = w => w.exampleSentence.replace(/\[\[(.+?)\]\]/g, "$1");
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const clozeList = w => w.clozeAnswers || w.acceptedEnglishAnswers;
const Extra = ({ w }) => html`<div class="extra">${(w.extraExamples || []).map((s, i) => html`<p key=${i}><span class="ex" lang="en">${s}</span></p>`)}</div>`;
export const LEVELS = [
  { n: 1, title: "Найди пару", desc: "Соедините слово с переводом" }, { n: 2, title: "Выбери перевод", desc: "Один верный вариант из четырёх" },
  { n: 3, title: "Вспомни перевод", desc: "Карточки с самопроверкой" }, { n: 4, title: "Заполни пропуск", desc: "Слово в предложении" },
  { n: 5, title: "Переведи наоборот", desc: "С русского на английский" }, { n: 6, title: "Найди ошибку", desc: "Верен ли перевод?" }
];
export function freshSet() { const levels = {}; for (let i = 1; i <= 6; i++) levels[i] = { learned: [], size: 10, runs: 0, session: null }; return { v: 1, stats: {}, levels, test: { current: null, history: [] } }; }
const sanitize = s => { const f = freshSet(); if (!s) return f; const o = Object.assign(f, s); o.levels = Object.assign(freshSet().levels, s.levels || {}); o.test = Object.assign({ current: null, history: [] }, s.test || {}); o.stats = s.stats || {}; return o; };

/* ---------- original selection helpers (unchanged logic) ---------- */
function pickWords(WORDS, state, level, n) {
  const learned = new Set(state.levels[level].learned);
  const keyed = WORDS.map(w => { const st = state.stats[w.id] || { c: 0, w: 0 };
    let wt = 1 + 2.2 * Math.min(st.w, 5) + (learned.has(w.id) ? 0 : 1.2) - Math.min(st.c, 5) * 0.15; wt = Math.max(.3, wt);
    return { id: w.id, k: Math.pow(Math.random(), 1 / wt) }; });
  keyed.sort((a, b) => b.k - a.k); return keyed.slice(0, n).map(x => x.id);
}
function distractors(WORDS, BY, target, n, field) {
  const t = BY[target]; const ok = w => w.id !== target && !(t.group && w.group === t.group) && w[field] !== t[field];
  let pool = shuffle(WORDS.filter(w => ok(w) && w.category === t.category));
  if (pool.length < n) pool = pool.concat(shuffle(WORDS.filter(w => ok(w) && w.category !== t.category)));
  return pool.slice(0, n).map(w => w.id);
}
function record(s, level, id, ok) { const st = s.stats[id] || (s.stats[id] = { c: 0, w: 0 }); if (ok) st.c++; else st.w++; if (ok && !s.levels[level].learned.includes(id)) s.levels[level].learned.push(id); }
function newQueueSession(WORDS, s, lv, extra) { const ids = pickWords(WORDS, s, lv, s.levels[lv].size);
  s.levels[lv].session = Object.assign({ queue: ids, pos: 0, correct: 0, wrong: 0, requeued: [], ans: null, done: false }, extra ? extra(ids) : {}); s.levels[lv].runs++; }
function advance(s, lv) { const ss = s.levels[lv].session; ss.pos++; ss.ans = null; if (ss.pos >= ss.queue.length) ss.done = true; }
function answerQ(s, lv, id, ok, ans) { const ss = s.levels[lv].session; record(s, lv, id, ok); if (ok) ss.correct++; else { ss.wrong++;
  if (!ss.requeued.includes(id)) { ss.requeued.push(id); const at = Math.min(ss.queue.length, ss.pos + 3 + Math.floor(Math.random() * 3)); ss.queue.splice(at, 0, id); } }
  ss.ans = Object.assign({ ok }, ans); }
function buildSets(BY, ids) { const sets = []; const rest = ids.slice();
  while (rest.length) { const size = rest.length <= 8 ? rest.length : 6; const set = [];
    for (let i = 0; i < rest.length && set.length < size;) { const w = BY[rest[i]]; if (!w.group || !set.some(x => BY[x].group === w.group)) { set.push(rest[i]); rest.splice(i, 1); } else i++; }
    if (!set.length) set.push(rest.shift()); sets.push({ ids: set, ru: shuffle(set), matched: [] }); }
  return sets; }

/** Classify a wrong typed English answer for a vocabulary item (no psychological guessing). */
export function classifyVocab(input, w, words) {
  const n = norm(input); if (!n) return ["UNCLASSIFIED"];
  const acc = w.acceptedEnglishAnswers.concat(w.clozeAnswers || []);
  if (w.v2 && [...w.v2, ...w.v3, w.v1].some(f => norm(f) === n)) return ["FORM"];
  if (w.v1 && (n === norm(w.v1) + "ed" || n === norm(w.v1) + "d")) return ["FORM"];
  if (isSpellingSlip(input, acc)) return ["SPELLING"];
  if (words.some(x => x.id !== w.id && x.acceptedEnglishAnswers.some(a => norm(a) === n))) return ["VOCAB_MEANING"];
  return ["UNCLASSIFIED"];
}

/* ---------- context provider for a set ---------- */
function useSetModel(setId) {
  const app = useApp(); const set = SET_BY_ID[setId]; const dict = DICT_BY_ID[set.dict]; const key = "vocab:" + setId;
  const state = useMemo(() => sanitize(app.docs[key]), [app.docs[key]]);
  const update = useCallback(fn => app.setDoc(key, s => { const n = JSON.parse(JSON.stringify(sanitize(s))); fn(n); n.updatedAt = Date.now(); return n; }), [key]);
  const WORDS = set.words, BY = useMemo(() => Object.fromEntries(WORDS.map(w => [w.id, w])), [setId]);
  const t0 = useRef(Date.now());
  const log = (w, lv, ok, user, correct, mode = "learning", attemptId, tags) => {
    app.addEvent({ id: uid("ev"), attemptId: attemptId || `vocab:${setId}:L${lv}:${(state.levels[lv] || { runs: 0 }).runs}`, testId: mode === "exam" ? "vocab:" + setId : null, questionId: w.id, questionVersion: 1,
      moduleId: "vocab-" + dict.id, subtopicId: setId + ":L" + lv, lessonId: null, kind: "vocab", format: "vocab-L" + lv, level: w.level || "B2", difficulty: 1, mode, ts: Date.now(), timestamp: iso(Date.now()),
      userAnswer: user || "", userAnswerNorm: norm(user || ""), correctAnswer: correct || "", isCorrect: ok, score: ok ? 1 : 0, timeSpentMs: Date.now() - t0.current,
      errorTags: ok ? [] : (tags || ["VOCAB_MEANING"]), explanationId: w.id, firstAttempt: !(state.stats[w.id]), retry: false });
    t0.current = Date.now();
  };
  return { app, set, dict, state, update, WORDS, BY, TOTAL: WORDS.length, sfx: app.sfx, log, setId };
}

/* ---------- set overview ---------- */
export function VocabSet({ params }) {
  const app = useApp(); const set = SET_BY_ID[params.setId]; const dict = DICT_BY_ID[set.dict]; const st = sanitize(app.docs["vocab:" + set.id]);
  const total = set.words.length; const hist = st.test.history; const best = hist.length ? Math.max(...hist.map(h => h.score)) : null;
  return html`<${Screen} title=${dict.title} sub=${`Слова ${set.from}–${set.to}`} onBack=${app.nav.back}>
    <div class="lv-list">
      ${LEVELS.map(l => { const n = st.levels[l.n].learned.length; return html`<button key=${l.n} class=${"lv-card lv-" + l.n} onClick=${() => app.nav.push("vocabLevel", { setId: set.id, lv: l.n })}>
        <span class="lv-num">${l.n}</span><span><h3>${l.title}</h3><p>${l.desc}</p><span class="lv-prog"><span class="pb"><i style=${{ width: n / total * 100 + "%" }}></i></span>${n}/${total}</span></span></button>`; })}
      <button class="lv-card final" onClick=${() => app.nav.push("vocabFinal", { setId: set.id })}><span class="lv-num">7</span>
        <span><h3>Итоговая проверка ${total}/${total}</h3><p>${st.test.current ? "Тест продолжается" : "Все слова набора без подсказок"}</p><span class="lv-prog">${best != null ? `Лучший результат: ${best}/${total}` : "Попыток пока не было"}</span></span></button>
    </div>
  </${Screen}>`;
}

export function VocabDict({ params }) {
  const app = useApp(); const d = DICT_BY_ID[params.dict];
  return html`<${Screen} title=${d.title} sub=${d.short} onBack=${app.nav.back}>
    ${d.note ? html`<div class="banner warn">${d.note}</div>` : null}
    ${d.sets.map(s => { const st = sanitize(app.docs["vocab:" + s.id]); const learned = new Set(Object.values(st.levels).flatMap(L => L.learned)).size;
      return html`<${Row} key=${s.id} title=${`Набор ${s.from}–${s.to}`} sub=${`изучено ${learned} из ${s.words.length} · 6 уровней + итоговая ${s.words.length}/${s.words.length}`} onClick=${() => app.nav.push("vocabSet", { setId: s.id })}/>`; })}
    <${Row} title=${`Полный контрольный: ${d.words.length} слов`} sub="весь словарь без подсказок" onClick=${() => app.nav.push("vocabFull", { dict: d.id })}/>
    ${d.id === "irregular" ? html`<${Row} title="Формы V1 → V2 → V3" sub="тренажёр направлений и контекста" onClick=${() => app.nav.push("irregularForms")}/>` : null}
  </${Screen}>`;
}

/* ---------- shared bits ---------- */
function LevelBar({ level, extra }) {
  const { state, update, TOTAL } = useV(); const L = state.levels[level], learned = L.learned.length;
  return html`<div class="lvbar"><div class="chips" role="group" aria-label="Слов в тренировке">${[10, 20, 50].map(n => html`<button key=${n} class="chip" aria-pressed=${L.size === n} onClick=${() => update(s => { s.levels[level].size = n; s.levels[level].session = null; })}>${n} слов</button>`)}</div>
    ${extra ? html`<div class="chips dir" role="group">${extra}</div>` : null}
    <div class="learned"><span>Изучено <b>${learned}</b> из ${TOTAL}</span><span class="pbar"><i style=${{ width: learned / TOTAL * 100 + "%" }}></i></span></div></div>`;
}
const Count = ({ pos, len }) => html`<div class="cnt"><span>${Math.min(pos + 1, len)} / ${len}</span><span class="pb"><i style=${{ width: pos / len * 100 + "%" }}></i></span></div>`;
function Feedback({ ok, children }) { const ref = useRef(null); useEffect(() => { const t = setTimeout(() => { const el = ref.current; const sc = el && el.closest(".content"); if (sc) { const r = el.getBoundingClientRect(), s = sc.getBoundingClientRect(); if (r.bottom > s.bottom) sc.scrollBy({ top: r.bottom - s.bottom + 16, behavior: "smooth" }); } }, 50); return () => clearTimeout(t); }, []);
  return html`<div ref=${ref} class=${"fb " + (ok ? "fb-ok" : "fb-bad")} role="status"><div class="fb-h">${ok ? I.ok : I.bad}${ok ? "Правильно!" : "Ошибка"}</div>${children ? html`<div class="fb-b">${children}</div>` : null}</div>`; }
function SummaryCard({ sess }) { const { sfx } = useV(); useEffect(() => { sfx("finish"); }, []);
  return html`<div class="sum"><h2>Тренировка завершена</h2><div class="kpis"><div class="k-ok"><span class="v">${sess.correct}</span><span class="l">${plural(sess.correct, "верный ответ", "верных ответа", "верных ответов")}</span></div><div class="k-bad"><span class="v">${sess.wrong}</span><span class="l">${plural(sess.wrong, "ошибка", "ошибки", "ошибок")}</span></div><div class="k-n"><span class="v">${pct(sess.correct, sess.correct + sess.wrong)}%</span><span class="l">точность</span></div></div><p class="muted small">Слова с ошибками будут чаще попадаться в следующих тренировках.</p></div>`; }
const summaryFooter = (again, back) => html`<button class="btn btn-dark" onClick=${again}>Ещё одна тренировка</button><button class="btn btn-light" onClick=${back}>К уровням</button>`;
const restartBtn = fn => html`<button class="ib" onClick=${fn} aria-label="Начать заново">${I.restart}</button>`;

export function VocabLevel({ params }) {
  const m = useSetModel(params.setId); const Comp = [null, Match, Choice, Cards, TypeCloze, TypeReverse, TrueFalse][params.lv];
  return html`<${VCtx.Provider} value=${m}><${Comp}/></${VCtx.Provider}>`;
}
const T = lv => LEVELS[lv - 1].title;

/* Level 1 */
function Match() {
  const V = useV(); const { state, update, WORDS, BY, app } = V; const lv = 1, L = state.levels[lv], S = L.session;
  const start = () => update(s => { const ids = pickWords(WORDS, s, lv, s.levels[lv].size); s.levels[lv].session = { sets: buildSets(BY, ids), idx: 0, correct: 0, wrong: 0, done: false }; s.levels[lv].runs++; });
  useEffect(() => { if (!L.session) start(); }, [L.session]);
  return html`<${Screen} lv=${lv} title=${T(lv)} sub=${"Уровень 1 · " + V.dict.title} onBack=${app.nav.back} right=${restartBtn(start)} scrollKey=${S ? S.idx + ":" + L.runs : 0} footer=${S && S.done ? summaryFooter(start, app.nav.back) : null}>
    <${LevelBar} level=${lv}/>${!S ? null : S.done ? html`<${SummaryCard} sess=${S}/>` : html`<${MatchSet} key=${S.idx + ":" + L.runs} S=${S}/>`}</${Screen}>`;
}
function MatchSet({ S }) {
  const { update, BY, sfx, log } = useV(); const lv = 1, set = S.sets[S.idx];
  const [sel, setSel] = useState({ en: null, ru: null }); const [flash, setFlash] = useState(null); const [msg, setMsg] = useState(null);
  const setDone = set.matched.length === set.ids.length;
  useEffect(() => { if (setDone && !S.done) { const t = setTimeout(() => update(s => { s.levels[lv].session.idx++; }), 1300); return () => clearTimeout(t); } }, [setDone, S.done]);
  useEffect(() => { if (!msg) return; const t = setTimeout(() => setMsg(null), msg.ok ? 1100 : 3200); return () => clearTimeout(t); }, [msg]);
  const trySel = (side, id) => { if (set.matched.includes(id)) return; const next = Object.assign({}, sel, { [side]: sel[side] === id ? null : id });
    if (next.en != null && next.ru != null) { const ok = next.en === next.ru, en = next.en, completes = ok && set.matched.length + 1 === set.ids.length;
      setFlash({ en: next.en, ru: next.ru, ok }); sfx(ok ? (completes ? "set" : "ok") : "bad"); setMsg({ ok, en, k: Date.now(), completes }); setTimeout(() => setFlash(null), 650); setSel({ en: null, ru: null });
      log(BY[en], lv, ok, BY[next.ru].russian, BY[en].russian, "learning", null, ["VOCAB_MEANING"]);
      update(s => { const ss = s.levels[lv].session, st = ss.sets[ss.idx]; record(s, lv, en, ok); if (ok) { ss.correct++; st.matched.push(en); if (st.matched.length === st.ids.length && ss.idx === ss.sets.length - 1) ss.done = true; } else ss.wrong++; });
    } else { sfx("tap"); setSel(next); } };
  const cls = (side, id) => { let c = "pair"; if (set.matched.includes(id)) c += " matched"; if (sel[side] === id) c += " sel"; if (flash && flash[side] === id) c += flash.ok ? " good" : " badf"; return c; };
  return html`<div><div class="test-meta"><span>Набор ${S.idx + 1} из ${S.sets.length}</span><span>${set.matched.length} / ${set.ids.length} пар</span></div><p class="hint">Нажмите английское слово, а затем его перевод.</p>
    <div class="match"><div class="col">${set.ids.map(id => html`<button key=${"e" + id} class=${cls("en", id) + " en"} lang="en" disabled=${set.matched.includes(id)} onClick=${() => trySel("en", id)}>${BY[id].english}</button>`)}</div>
      <div class="col">${set.ru.map(id => html`<button key=${"r" + id} class=${cls("ru", id)} disabled=${set.matched.includes(id)} onClick=${() => trySel("ru", id)}>${BY[id].russian}</button>`)}</div></div>
    ${msg ? html`<div key=${msg.k} class=${"toast " + (msg.ok ? "fb-ok" : "fb-bad")} role="status"><b>${msg.ok ? I.ok : I.bad}${msg.ok ? (msg.completes ? "Набор собран!" : "Правильно!") : "Ошибка"}</b>${!msg.ok ? html`<span style=${{ color: "var(--ink)" }}><span lang="en" class="en">${BY[msg.en].english}</span> означает «${BY[msg.en].russian}».</span>` : null}</div>` : null}</div>`;
}
/* Level 2 */
function Choice() {
  const V = useV(); const { state, update, WORDS, BY, app, sfx, log } = V; const lv = 2, L = state.levels[lv], S = L.session;
  const start = () => update(s => newQueueSession(WORDS, s, lv, () => ({ opts: {} })));
  useEffect(() => { if (!L.session) start(); }, [L.session]);
  const id = S && !S.done ? S.queue[S.pos] : null, w = id != null ? BY[id] : null;
  useEffect(() => { if (S && !S.done && !S.opts[S.pos]) update(s => { const ss = s.levels[lv].session; ss.opts[ss.pos] = shuffle([id].concat(distractors(WORDS, BY, id, 3, "russian"))); }); }, [S && S.pos, S && S.done, L.runs]);
  const o = S && S.opts ? S.opts[S.pos] || [] : [];
  const choose = c => { if (S.ans) return; const ok = c === id; sfx(ok ? "ok" : "bad"); log(w, lv, ok, BY[c].russian, w.russian); update(s => answerQ(s, lv, id, ok, { choice: c })); };
  const next = () => update(s => advance(s, lv));
  const footer = !S ? null : S.done ? summaryFooter(start, app.nav.back) : S.ans ? html`<button class="btn btn-dark" onClick=${next}>Дальше</button>` : null;
  return html`<${Screen} lv=${lv} title=${T(lv)} sub=${"Уровень 2 · " + V.dict.title} onBack=${app.nav.back} right=${restartBtn(start)} scrollKey=${S ? S.pos + ":" + L.runs + ":" + S.done : 0} footer=${footer}>
    <${LevelBar} level=${lv}/>${!S ? null : S.done ? html`<${SummaryCard} sess=${S}/>` : html`<div>
      <div class="wcard"><${Count} pos=${S.pos} len=${S.queue.length}/><div class="word" lang="en">${w.english}</div></div>
      <div class="tiles">${o.map((c, i) => { let cl = "tile"; if (S.ans) { if (c === id) cl += " good"; else if (c === S.ans.choice) cl += " badf"; else cl += " faded"; }
        return html`<button key=${c} class=${cl} disabled=${!!S.ans} onClick=${() => choose(c)}><span class="k">${i + 1}</span>${BY[c].russian}</button>`; })}</div>
      ${S.ans ? html`<div style=${{ marginTop: "14px" }}><${Feedback} key=${"f" + S.pos} ok=${S.ans.ok}>${S.ans.ok ? html`<span class="ex" lang="en">${plainSentence(w)}</span><${Extra} w=${w}/>` : html`<span><span lang="en" class="en">${w.english}</span> означает «${w.russian}».<p><span class="ex" lang="en">${plainSentence(w)}</span></p><${Extra} w=${w}/></span>`}</${Feedback}></div>` : null}</div>`}</${Screen}>`;
}
/* Level 3 */
function Cards() {
  const V = useV(); const { state, update, WORDS, BY, app, sfx, log } = V; const lv = 3, L = state.levels[lv], S = L.session;
  const start = () => update(s => { const dir = (s.levels[lv].session && s.levels[lv].session.dir) || "en"; newQueueSession(WORDS, s, lv, () => ({ dir, revealed: false, repeat: [] })); });
  useEffect(() => { if (!L.session) start(); }, [L.session]);
  if (!S) return html`<${Screen} lv=${lv} title=${T(lv)} onBack=${app.nav.back}/>`;
  const setDir = d => update(s => { s.levels[lv].session.dir = d; s.levels[lv].session.revealed = false; });
  const extra = html`<button class="chip" aria-pressed=${S.dir === "en"} onClick=${() => setDir("en")}>EN → RU</button><button class="chip" aria-pressed=${S.dir === "ru"} onClick=${() => setDir("ru")}>RU → EN</button>`;
  if (S.done) return html`<${Screen} lv=${lv} title=${T(lv)} onBack=${app.nav.back} right=${restartBtn(start)} footer=${summaryFooter(start, app.nav.back)}><${LevelBar} level=${lv} extra=${extra}/><${SummaryCard} sess=${S}/>
    ${S.repeat.length ? html`<div class="card"><h3>Повторить эти слова</h3><ul class="replist">${S.repeat.map(i => html`<li key=${i}><span lang="en" class="en">${BY[i].english}</span> — ${BY[i].russian}</li>`)}</ul></div>` : null}</${Screen}>`;
  const id = S.queue[S.pos], w = BY[id];
  const front = S.dir === "en" ? html`<div class="word" lang="en">${w.english}</div>` : html`<div class="word ru">${w.russian}</div>`;
  const back = S.dir === "en" ? html`<div class="answer">${w.russian}</div>` : html`<div class="answer en" lang="en">${w.english}</div>`;
  const reveal = () => { if (S.revealed) return; sfx("tap"); update(s => { s.levels[lv].session.revealed = true; }); };
  const mark = ok => { sfx(ok ? "ok" : "bad"); log(w, lv, ok, ok ? "вспомнил(а)" : "не вспомнил(а)", S.dir === "en" ? w.russian : w.english); update(s => { const ss = s.levels[lv].session; answerQ(s, lv, id, ok, {}); if (!ok && !ss.repeat.includes(id)) ss.repeat.push(id); advance(s, lv); ss.revealed = false; }); };
  const footer = !S.revealed ? html`<button class="btn btn-dark" onClick=${reveal}>Показать перевод</button>` : html`<div class="btn-row"><button class="btn btn-bad" onClick=${() => mark(false)}>Не вспомнила</button><button class="btn btn-ok" onClick=${() => mark(true)}>Вспомнила</button></div>`;
  return html`<${Screen} lv=${lv} title=${T(lv)} sub=${"Уровень 3 · " + V.dict.title} onBack=${app.nav.back} right=${restartBtn(start)} scrollKey=${S.pos + ":" + L.runs} footer=${footer}>
    <${LevelBar} level=${lv} extra=${extra}/>
    <div class="stack">${S.revealed ? html`<div class="wcard"><${Count} pos=${S.pos} len=${S.queue.length}/>${front}<div class="back">${back}<p class="ex" lang="en">${plainSentence(w)}</p><p class="small" style=${{ opacity: .8 }}>${w.exampleTranslation}</p><${Extra} w=${w}/></div></div>`
      : html`<button class="wcard" onClick=${reveal} aria-label="Показать перевод"><${Count} pos=${S.pos} len=${S.queue.length}/>${front}<span class="tap-hint">Вспомните перевод и нажмите на карточку</span></button>`}</div>
    ${S.repeat.length ? html`<p class="muted small" style=${{ textAlign: "center" }}>Для повторения: ${S.repeat.length}</p>` : null}</${Screen}>`;
}
/* Levels 4 & 5 */
const TypeCloze = () => html`<${TypeLevel} lv=${4} mode="cloze"/>`;
const TypeReverse = () => html`<${TypeLevel} lv=${5} mode="reverse"/>`;
function TypeLevel({ lv, mode }) {
  const V = useV(); const { state, update, WORDS, BY, app, sfx, log } = V; const L = state.levels[lv], S = L.session;
  const start = () => update(s => newQueueSession(WORDS, s, lv));
  useEffect(() => { if (!L.session) start(); }, [L.session]);
  const [val, setVal] = useState(""); const inp = useRef(null);
  useEffect(() => { setVal(""); if (inp.current && window.matchMedia("(pointer:fine)").matches) inp.current.focus({ preventScroll: true }); }, [S && S.pos, S && S.done, L.runs]);
  if (!S) return html`<${Screen} lv=${lv} title=${T(lv)} onBack=${app.nav.back}/>`;
  if (S.done) return html`<${Screen} lv=${lv} title=${T(lv)} onBack=${app.nav.back} right=${restartBtn(start)} footer=${summaryFooter(start, app.nav.back)}><${LevelBar} level=${lv}/><${SummaryCard} sess=${S}/></${Screen}>`;
  const id = S.queue[S.pos], w = BY[id]; const list = mode === "cloze" ? clozeList(w) : w.acceptedEnglishAnswers;
  const submit = e => { e && e.preventDefault(); if (S.ans) { update(s => advance(s, lv)); return; } if (!val.trim()) return;
    const ok = accepts(list, val); sfx(ok ? "ok" : "bad"); log(w, lv, ok, val, list[0], "learning", null, ok ? [] : classifyVocab(val, w, WORDS)); update(s => answerQ(s, lv, id, ok, { given: val })); };
  let prompt;
  if (mode === "cloze") { const parts = w.exampleSentence.split(/\[\[(.+?)\]\]/);
    prompt = html`<p class="cloze" lang="en">${parts.map((p, i) => i % 2 ? html`<span key=${i} class="gap">${p.split(" ").map((x, j) => html`<span key=${j} class="gapw" style=${{ width: Math.max(2.5, x.length * .6) + "em" }}></span>`)}</span>` : p)}</p><p class="sub">Значение: «${w.russian}»</p>`;
  } else prompt = html`<div class="word ru">${cap(w.testPrompt)}</div><p class="sub">Напишите по-английски</p>`;
  const footer = html`<form class="inbar" onSubmit=${submit} autocomplete="off"><input ref=${inp} lang="en" class=${S.ans ? (S.ans.ok ? "ok" : "bad") : ""} value=${S.ans ? S.ans.given : val} readOnly=${!!S.ans} onChange=${e => { if (!S.ans) setVal(e.target.value); }}
      placeholder="Ответ на английском" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint=${S.ans ? "next" : "done"} aria-label="Ответ"/>
    <button class="btn btn-dark" type="submit" onMouseDown=${e => e.preventDefault()} disabled=${!S.ans && !val.trim()}>${S.ans ? "Дальше" : "Проверить"}</button></form>`;
  return html`<${Screen} lv=${lv} title=${T(lv)} sub=${"Уровень " + lv + " · " + V.dict.title} onBack=${app.nav.back} right=${restartBtn(start)} scrollKey=${S.pos + ":" + L.runs} footer=${footer}>
    <${LevelBar} level=${lv}/><div class="wcard"><${Count} pos=${S.pos} len=${S.queue.length}/>${prompt}</div>
    ${S.ans ? html`<${Feedback} key=${"f" + S.pos} ok=${S.ans.ok}>${mode === "cloze" ? html`<span>${!S.ans.ok ? html`<span>Правильно: <b lang="en" class="en">${clozeList(w)[0]}</b></span>` : null}<p><span class="ex" lang="en">${plainSentence(w)}</span></p><p class="muted">${w.exampleTranslation}</p><${Extra} w=${w}/>${!S.ans.ok ? html`<p class="muted">Это слово встретится ещё раз в этой тренировке.</p>` : null}</span>`
      : html`<span>Правильно: <b lang="en" class="en">${w.english}</b>${w.acceptedEnglishAnswers.length > 1 ? html` <span class="muted">(принимается также: ${w.acceptedEnglishAnswers.filter(a => norm(a) !== norm(w.english)).join(", ")})</span>` : null}${!S.ans.ok ? html`<p class="muted">Это слово встретится ещё раз в этой тренировке.</p>` : null}</span>`}</${Feedback}>` : null}</${Screen}>`;
}
/* Level 6 */
function TrueFalse() {
  const V = useV(); const { state, update, WORDS, BY, app, sfx, log } = V; const lv = 6, L = state.levels[lv], S = L.session;
  const start = () => update(s => newQueueSession(WORDS, s, lv, ids => { const t = {}; const half = shuffle(ids).slice(0, Math.ceil(ids.length / 2)); ids.forEach(i => t[i] = half.includes(i)); return { truth: t }; }));
  useEffect(() => { if (!L.session) start(); }, [L.session]);
  const fallback = useRef({});
  if (!S) return html`<${Screen} lv=${lv} title=${T(lv)} onBack=${app.nav.back}/>`;
  if (S.done) return html`<${Screen} lv=${lv} title=${T(lv)} onBack=${app.nav.back} right=${restartBtn(start)} footer=${summaryFooter(start, app.nav.back)}><${LevelBar} level=${lv}/><${SummaryCard} sess=${S}/></${Screen}>`;
  const id = S.queue[S.pos], w = BY[id]; let isTrue = S.truth[id];
  if (isTrue === undefined) { const fk = S.pos + ":" + id; if (fallback.current[fk] === undefined) fallback.current[fk] = Math.random() < .5; isTrue = fallback.current[fk]; }
  const shown = isTrue ? w.russian : w.wrongRussian;
  const pick = v => { if (S.ans) return; const ok = v === isTrue; sfx(ok ? "ok" : "bad"); log(w, lv, ok, (v ? "верно: " : "неверно: ") + shown, w.russian);
    update(s => { answerQ(s, lv, id, ok, { v, isTrue, shown }); const ss = s.levels[lv].session; if (ss.truth[id] !== undefined && ss.requeued.includes(id)) ss.truth[id] = !ss.truth[id]; }); };
  const disp = S.ans ? S.ans.shown : shown, truthNow = S.ans ? S.ans.isTrue : isTrue;
  const footer = S.ans ? html`<button class="btn btn-dark" onClick=${() => update(s => advance(s, lv))}>Дальше</button>` : html`<div class="btn-row"><button class="btn btn-bad" onClick=${() => pick(false)}>${I.bad}Неверно</button><button class="btn btn-ok" onClick=${() => pick(true)}>${I.ok}Верно</button></div>`;
  return html`<${Screen} lv=${lv} title=${T(lv)} sub=${"Уровень 6 · " + V.dict.title} onBack=${app.nav.back} right=${restartBtn(start)} scrollKey=${S.pos + ":" + L.runs} footer=${footer}>
    <${LevelBar} level=${lv}/><div class="wcard"><${Count} pos=${S.pos} len=${S.queue.length}/><div class="word" lang="en">${w.english}</div><p class="claim-eq">означает</p><div class="claim-ru">«${disp}»</div></div>
    <p class="hint" style=${{ textAlign: "center" }}>Верен ли перевод?</p>
    ${S.ans ? html`<${Feedback} key=${"f" + S.pos} ok=${S.ans.ok}>${truthNow ? html`<span>Перевод верный: «${w.russian}».</span>` : html`<span>Перевод неверный. Правильно: <b>«${w.russian}»</b>.</span>`}</${Feedback}>` : null}</${Screen}>`;
}

/* ---------- Final test (set 50/50 or whole dictionary) — no hints, free navigation ---------- */
export function VocabFinal({ params }) {
  const app = useApp(); const full = !!params.dict; const dict = full ? DICT_BY_ID[params.dict] : DICT_BY_ID[SET_BY_ID[params.setId].dict];
  const words = full ? dict.words : SET_BY_ID[params.setId].words; const BY = useMemo(() => Object.fromEntries(words.map(w => [w.id, w])), [words]);
  const key = full ? "vocabfull:" + dict.id : "vocab:" + params.setId; const testId = full ? "vocabfull:" + dict.id : "vocab:" + params.setId;
  const doc = full ? Object.assign({ test: { current: null, history: [] } }, app.docs[key]) : sanitize(app.docs[key]); const T0 = doc.test; const cur = T0.current;
  const update = fn => app.setDoc(key, s => { const n = JSON.parse(JSON.stringify(full ? Object.assign({ test: { current: null, history: [] } }, s) : sanitize(s))); fn(n); return n; });
  const [sheet, setSheet] = useState(null); const inp = useRef(null); const shown = useRef(Date.now());
  const TOTAL = words.length; const title = full ? `Полный контрольный: ${dict.title}` : `Итоговая проверка ${TOTAL}/${TOTAL}`;
  useEffect(() => { if (inp.current && window.matchMedia("(pointer:fine)").matches) inp.current.focus({ preventScroll: true }); shown.current = Date.now(); }, [cur && cur.idx]);
  const begin = () => { app.sfx("tap"); update(s => { s.test.current = { id: uid("att"), order: shuffle(words.map(w => w.id)), answers: {}, idx: 0, startedAt: Date.now(), time: {} }; }); };
  const hist = T0.history.slice().reverse();
  if (!cur) return html`<${Screen} lv=${7} title=${title} sub=${dict.title} onBack=${app.nav.back} footer=${html`<button class="btn btn-dark" onClick=${begin}>Начать тест</button>`}>
    <div class="intro"><span class="ring"></span><h2>${TOTAL} ${plural(TOTAL, "слово", "слова", "слов")} — одна попытка</h2>
      <p>По русскому значению напишите английское слово или выражение. Каждое слово встретится один раз.</p>
      <p>Правильность во время теста не показывается. Между заданиями можно переходить и менять ответы. Если закрыть приложение, ответы сохранятся.</p></div>
    <h2 class="h2">История</h2>${hist.length ? hist.map(h => html`<${Row} key=${h.ts} title=${`${h.score}/${h.total}`} sub=${fmtDT(h.ts)} onClick=${() => h.attemptId && app.nav.push("vocabResult", { id: h.attemptId })}/>`) : html`<div class="empty">Попыток пока не было.</div>`}
  </${Screen}>`;
  const id = cur.order[cur.idx], w = BY[id]; const n = cur.order.length;
  const isFilled = i => !!(cur.answers[i] || "").trim(); const filled = cur.order.filter(isFilled).length;
  const addTime = () => { const dt = Date.now() - shown.current; shown.current = Date.now(); return Object.assign({}, cur.time, { [id]: ((cur.time || {})[id] || 0) + dt }); };
  const setAns = v => update(s => { s.test.current.answers[id] = v; });
  const go = i => { const time = addTime(); update(s => { s.test.current.idx = Math.max(0, Math.min(n - 1, i)); s.test.current.time = time; }); };
  const finishTest = () => {
    const time = addTime(); let score = 0; const now = Date.now(); const attemptId = cur.id || uid("att"); const events = [];
    cur.order.forEach((i, k) => { const wd = BY[i]; const raw = cur.answers[i] || ""; const ok = accepts(wd.acceptedEnglishAnswers, raw); if (ok) score++;
      events.push({ id: uid("ev"), attemptId, testId, questionId: i, questionVersion: 1, moduleId: "vocab-" + dict.id, subtopicId: full ? "full" : params.setId, lessonId: null, kind: "vocab", format: "vocab-final",
        level: wd.level || "B2", difficulty: 1, mode: "exam", ts: now + k, timestamp: iso(now + k), userAnswer: raw, userAnswerNorm: norm(raw), correctAnswer: wd.acceptedEnglishAnswers[0], isCorrect: ok, score: ok ? 1 : 0,
        timeSpentMs: time[i] || 0, errorTags: ok ? [] : classifyVocab(raw, wd, words), explanationId: i, firstAttempt: true, retry: false }); });
    const attempt = { id: attemptId, testId, title: `${title} (${dict.title})`, kind: "vocab", mode: "exam", contentVersion: CONTENT_VERSION, startedAt: cur.startedAt, finishedAt: now, durationMs: now - cur.startedAt,
      score, total: n, pct: Math.round(score / n * 100), items: cur.order.map(i => ({ qid: i, v: 1 })), responses: cur.answers, prompts: Object.fromEntries(cur.order.map(i => [i, BY[i].testPrompt])) };
    app.sfx(score === n ? "done" : "finish");
    app.commitAttempt(attempt, events, null, { [key]: (() => { const d = JSON.parse(JSON.stringify(doc)); d.test.history.push({ ts: now, score, total: n, attemptId }); d.test.current = null; return d; })() });
    setSheet(null); app.nav.replace("vocabResult", { id: attemptId });
  };
  const footer = html`<form class="inbar" style=${{ gridTemplateColumns: "1fr" }} onSubmit=${e => { e.preventDefault(); go(cur.idx < n - 1 ? cur.idx + 1 : cur.idx); }} autocomplete="off">
      <input ref=${inp} lang="en" value=${cur.answers[id] || ""} onChange=${e => setAns(e.target.value)} placeholder="Английское слово или выражение" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="next" aria-label=${"Ответ на задание " + (cur.idx + 1)}/></form>
    <div class="nav3"><button class="btn btn-light" onMouseDown=${e => e.preventDefault()} disabled=${cur.idx === 0} onClick=${() => go(cur.idx - 1)} aria-label="Назад">${I.left}</button>
      <button class="btn btn-light mid" onClick=${() => setSheet("grid")}>${I.grid}${filled} / ${n}</button>
      <button class="btn btn-light" onMouseDown=${e => e.preventDefault()} disabled=${cur.idx === n - 1} onClick=${() => go(cur.idx + 1)} aria-label="Вперёд">${I.right}</button></div>`;
  return html`<${Screen} lv=${7} title=${title} sub=${"Задание " + (cur.idx + 1) + " из " + n} onBack=${app.nav.back} scrollKey=${cur.idx} footer=${footer}>
    <div class="banner exam">Exam Mode: проверка после завершения. Ответы сохраняются автоматически.</div>
    <div class="wcard"><div class="cnt"><span>${cur.idx + 1} / ${n}</span></div><div class="word ru">${cap(w.testPrompt)}</div><p class="sub">Напишите по-английски</p></div>
    ${filled === n ? html`<button class="btn btn-dark" style=${{ width: "100%" }} onClick=${() => setSheet("finish")}>Завершить тест</button>` : html`<p class="small2" style=${{ textAlign: "center" }}>Завершить тест можно, когда будут заполнены все ${n} ответов (как в оригинальной итоговой проверке).</p>`}
    ${sheet === "grid" ? html`<${Sheet} onClose=${() => setSheet(null)} label="Все задания"><h2>Все задания</h2><p>Заполнено ${filled} из ${n}.</p><div class="grid">${cur.order.map((i, k) => html`<button key=${i} class=${"cell" + (k === cur.idx ? " cur" : "") + (isFilled(i) ? " filled" : "")} onClick=${() => { go(k); setSheet(null); }}>${k + 1}</button>`)}</div>
      <div class="stack-btns">${filled === n ? html`<button class="btn btn-dark" onClick=${() => setSheet("finish")}>Завершить тест</button>` : null}<button class="btn btn-light" onClick=${() => setSheet(null)}>Закрыть</button></div></${Sheet}>` : null}
    ${sheet === "finish" ? html`<${Sheet} onClose=${() => setSheet(null)} label="Завершить"><h2>Завершить тест?</h2><p>После этого ответы проверятся и изменить их будет нельзя.</p>
      <div class="stack-btns"><button class="btn btn-dark" onClick=${finishTest}>Завершить тест</button><button class="btn btn-light" onClick=${() => setSheet(null)}>Вернуться к ответам</button></div></${Sheet}>` : null}
  </${Screen}>`;
}

export function VocabResult({ params }) {
  const app = useApp(); const a = app.attempts.find(x => x.id === params.id);
  if (!a) return html`<${Screen} title="Результат" onBack=${app.nav.back}><div class="empty">Попытка не найдена.</div></${Screen}>`;
  const evs = app.events.filter(e => e.attemptId === a.id); const wrong = evs.filter(e => !e.isCorrect);
  const TAGS = { SPELLING: "Орфография (почти верно)", FORM: "Форма глагола", VOCAB_MEANING: "Другое слово словаря", UNCLASSIFIED: "Нет ответа / не классифицировано" };
  const c = {}; wrong.forEach(e => e.errorTags.forEach(t => { c[t] = (c[t] || 0) + 1; }));
  return html`<${Screen} lv=${7} title="Результат" sub=${a.title} onBack=${app.nav.back}>
    <div class="sum"><h2>${a.pct === 100 ? "Идеальный результат!" : "Тест завершён"}</h2><div class="kpis"><div class="k-ok"><span class="v">${a.score}</span><span class="l">из ${a.total}</span></div><div class="k-bad"><span class="v">${a.total - a.score}</span><span class="l">${plural(a.total - a.score, "ошибка", "ошибки", "ошибок")}</span></div><div class="k-n"><span class="v">${a.pct}%</span><span class="l">результат</span></div></div><p class="small2">${fmtDT(a.finishedAt)}</p></div>
    ${wrong.length ? html`<h2 class="h2">Причины ошибок</h2>${Object.entries(c).map(([t, k]) => html`<div key=${t} class="hbar"><span>${TAGS[t] || t}</span><span class="t"><i style=${{ width: k / wrong.length * 100 + "%" }}></i></span><b>${k}</b></div>`)}
      <h2 class="h2">Ошибки</h2><ul class="replist">${wrong.map(e => html`<li key=${e.id}>${a.prompts ? a.prompts[e.questionId] : ""} — <b lang="en" class="en">${e.correctAnswer}</b>${e.userAnswer ? html`<br/><span class="small2">ваш ответ: <s>${e.userAnswer}</s></span>` : null}</li>`)}</ul>` : null}
  </${Screen}>`;
}

export function WordsTab({ nav }) {
  const app = useApp(); const unique = new Set(DICTS.filter(d => d.id !== "agents").flatMap(d => d.words.map(w => (w.v1 || w.english).toLowerCase()))).size;
  return html`<${Screen} bare nav=${nav}>
    <div class="home-head"><div><h1>Словари</h1><p>${unique} уникальных глаголов в General, Business и Irregular (пересечения учтены один раз). Шесть уровней тренировки и итоговые проверки.</p></div></div>
    <div class="lv-list">${DICTS.map((d, k) => html`<button key=${d.id} class=${"lv-card lv-" + (k + 2)} onClick=${() => app.nav.push("vocabDict", { dict: d.id })}><span class="lv-num">${d.words.length}</span><span><h3>${d.title}</h3><p>${d.short}</p><span class="lv-prog">${d.sets.length} ${plural(d.sets.length, "набор", "набора", "наборов")}</span></span></button>`)}</div>
  </${Screen}>`;
}
