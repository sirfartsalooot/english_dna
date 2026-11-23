import { html, useState, useEffect, useMemo, useRef, useApp, Screen, I, Row, StatusChip, Pbar, rich, Sheet } from "./core.js";
import { QuestionView, Explain } from "./question.js";
import { BLOCKS, BLOCK_BY_ID, COURSE, CASES, CASE_FORMATS, Q_BY_ID, LESSON_BY_ID, DICTS, TEST_BY_ID } from "../content/index.js";
import { scoreQuestion, isAnswered } from "../engine/scoring.js";
import { createLearning, requeue, makeEvent } from "../engine/exam.js";
import { blockMastery } from "../engine/analytics.js";
import { plural, pct } from "../engine/util.js";

const LV = n => ((n - 1) % 6) + 1;

/* ---------------- Course tab ---------------- */
export function CourseTab({ nav }) {
  const app = useApp(); const [seg, setSeg] = useState("blocks"); const [qText, setQ] = useState("");
  const found = useMemo(() => search(qText), [qText]);
  return html`<${Screen} bare nav=${nav}>
    <div class="home-head"><div><h1>Курс B2 → C1</h1><p>${BLOCKS.length} из ${COURSE.length} блоков в этой сборке. Теория, тренировки и контрольные.</p></div></div>
    <input class="search" type="search" placeholder="Поиск: тема, урок или глагол" value=${qText} onInput=${e => setQ(e.target.value)} aria-label="Поиск"/>
    ${qText.trim().length >= 2 ? html`<${SearchResults} found=${found}/>` : html`
      <div class="seg2" role="group"><button aria-pressed=${seg === "blocks"} onClick=${() => setSeg("blocks")}>Блоки</button><button aria-pressed=${seg === "theory"} onClick=${() => setSeg("theory")}>Theory Check</button><button aria-pressed=${seg === "cases"} onClick=${() => setSeg("cases")}>Case Lab</button></div>
      ${seg === "blocks" ? html`<${BlockList}/>` : seg === "theory" ? html`<${TheoryHub}/>` : html`<${CaseHub}/>`}`}
  </${Screen}>`;
}
function BlockList() {
  const app = useApp();
  return html`<div class="lv-list">${BLOCKS.map(b => { const m = blockMastery(b, mctx(app)); return html`<button key=${b.id} class=${"lv-card lv-" + LV(b.n)} onClick=${() => app.nav.push("block", { id: b.id })}>
    <span class="lv-num">${b.n}</span><span><h3>${b.title}</h3><p>${b.short}</p><span class="lv-prog"><span class="pb"><i style=${{ width: m.score + "%" }}></i></span>${m.score}%</span><span style=${{ display: "block", marginTop: "6px" }}><${StatusChip} s=${m.status}/></span></span></button>`; })}</div>`;
}
export const mctx = app => ({ course: app.docs.course || {}, qstats: app.docs.qstats || {}, attempts: app.attempts });

function TheoryHub() {
  const app = useApp(); const all = BLOCKS.flatMap(b => b.questions.filter(q => q.kind === "theory")); const qs = app.docs.qstats || {};
  const seen = all.filter(q => qs[q.id]); const first = seen.filter(q => qs[q.id].firstOk).length;
  return html`<div>
    <div class="cardx"><h3>Проверки теории</h3><p class="small2">Вопросы «почему», «когда НЕ применяется», «какой смысл меняется». Каждый ответ — с объяснением и контрпримером.</p>
      <div class="kv" style=${{ marginTop: "10px" }}><div><div class="v">${seen.length}/${all.length}</div><div class="l">вопросов пройдено</div></div><div><div class="v">${pct(first, seen.length)}%</div><div class="l">верно с первой попытки</div></div></div></div>
    ${BLOCKS.map(b => html`<${Row} key=${b.id} left=${html`<span class=${"numc lv-" + LV(b.n)}>${b.n}</span>`} title=${b.title} sub=${b.questions.filter(q => q.kind === "theory").length + " теоретических вопросов · тренировка"}
      onClick=${() => app.nav.push("practice", { title: "Теория: " + b.title, key: "theory:" + b.id, ids: b.questions.filter(q => q.kind === "theory").map(q => q.id), n: 12 })}/>`)}
    <${Row} title="Тренировка по всей теории" sub="Случайные вопросы из всех блоков" onClick=${() => app.nav.push("practice", { title: "Теория: все блоки", key: "theory:all", ids: all.map(q => q.id), n: 15 })}/>
    <${Row} title=${TEST_BY_ID.theory.title} sub=${TEST_BY_ID.theory.size + " вопросов · Exam Mode · новый вариант каждый раз"} onClick=${() => app.nav.push("examIntro", { testId: "theory" })}/>
  </div>`;
}
function CaseHub() {
  const app = useApp();
  return html`<div>
    <div class="cardx"><h3>Case Lab</h3><p class="small2">Короткие рабочие ситуации: письма, встречи, отчёты. Шесть форматов, у каждого варианта — разбор. В тренировке ответ проверяется сразу.</p></div>
    ${CASE_FORMATS.map((f, k) => { const ids = CASES.filter(c => c.type === f.type).map(c => c.id);
      return html`<${Row} key=${f.type} left=${html`<span class=${"numc lv-" + (k + 1)}>${k + 1}</span>`} title=${f.title} sub=${ids.length + " заданий"} onClick=${() => app.nav.push("practice", { title: f.title, key: "cases:" + f.type, ids, n: 8 })}/>`; })}
    <${Row} title="Смешанная тренировка кейсов" sub=${CASES.length + " заданий во всех форматах"} onClick=${() => app.nav.push("practice", { title: "Case Lab: все форматы", key: "cases:all", ids: CASES.map(c => c.id), n: 10 })}/>
    <${Row} title=${TEST_BY_ID.cases.title} sub=${TEST_BY_ID.cases.size + " заданий · все 6 форматов · Exam Mode"} onClick=${() => app.nav.push("examIntro", { testId: "cases" })}/>
  </div>`;
}

/* ---------------- search ---------------- */
function search(t) {
  const s = t.trim().toLowerCase(); if (s.length < 2) return { lessons: [], words: [] };
  const lessons = BLOCKS.flatMap(b => b.lessons.filter(l => (l.title + " " + l.goal + " " + b.title).toLowerCase().includes(s)).map(l => Object.assign({ block: b }, l))).slice(0, 12);
  const words = DICTS.flatMap(d => d.words.filter(w => w.english.toLowerCase().includes(s) || w.russian.toLowerCase().includes(s)).map(w => Object.assign({ dict: d }, w))).slice(0, 20);
  return { lessons, words };
}
function SearchResults({ found }) {
  const app = useApp(); const [w, setW] = useState(null);
  return html`<div>
    <h2 class="h2">Уроки (${found.lessons.length})</h2>
    ${found.lessons.length ? found.lessons.map(l => html`<${Row} key=${l.id} title=${l.title} sub=${l.block.title} onClick=${() => app.nav.push("lesson", { id: l.id })}/>`) : html`<div class="empty">Ничего не найдено</div>`}
    <h2 class="h2">Слова (${found.words.length})</h2>
    ${found.words.length ? found.words.map(x => html`<${Row} key=${x.id} title=${x.english} sub=${x.russian + " · " + x.dict.title} onClick=${() => setW(x)}/>`) : html`<div class="empty">Ничего не найдено</div>`}
    ${w ? html`<${Sheet} onClose=${() => setW(null)} label=${w.english}><h2 lang="en">${w.english}</h2><p style=${{ color: "var(--ink)" }}>${w.russian}</p>
      ${w.v2 ? html`<p><b lang="en">${w.v1} — ${w.v2.join("/")} — ${w.v3.join("/")}</b></p>` : null}
      <p class="ex" lang="en">${w.exampleSentence.replace(/\[\[|\]\]/g, "")}</p><p class="small2">${w.exampleTranslation}</p>
      ${(w.collocations || []).length ? html`<p class="small2"><b>Сочетания:</b> ${w.collocations.join(", ")}</p>` : null}
      ${w.usageNotes ? html`<p class="small2">${w.usageNotes}</p>` : null}
      <button class="btn btn-dark" onClick=${() => { setW(null); const set = w.dict.sets.find(s => s.words.some(x => x.id === w.id)); app.nav.push("vocabSet", { setId: set.id }); }}>Открыть набор со словом</button></${Sheet}>` : null}
  </div>`;
}

/* ---------------- Block ---------------- */
export function BlockScreen({ params }) {
  const app = useApp(); const b = BLOCK_BY_ID[params.id]; const m = blockMastery(b, mctx(app)); const lv = LV(b.n);
  const course = app.docs.course || {}; const sess = app.sessions["exam:block:" + b.id];
  const evs = app.events.filter(e => e.moduleId === b.id); const wrong = evs.filter(e => !e.isCorrect);
  const practice = b.questions.filter(q => q.kind === "practice" && !q.drill);
  return html`<${Screen} lv=${lv} title=${b.title} sub=${"Блок " + b.n} onBack=${app.nav.back}>
    <div class="wcard"><div class="cnt"><span>Mastery ${m.score}%</span><${StatusChip} s=${m.status}/></div>
      <div class="kv"><div><div class="v">${m.done}/${m.lessons}</div><div class="l">уроков пройдено</div></div><div><div class="v">${m.theoryAcc == null ? "—" : m.theoryAcc + "%"}</div><div class="l">теория (1-я попытка)</div></div>
        <div><div class="v">${m.practiceAcc == null ? "—" : m.practiceAcc + "%"}</div><div class="l">практика (1-я попытка), покрытие ${m.coverage}%</div></div><div><div class="v">${m.lastExam == null ? "—" : m.lastExam + "%"}</div><div class="l">последняя контрольная${m.bestExam != null ? ", лучшая " + m.bestExam + "%" : ""}</div></div></div></div>
    <h2 class="h2">Уроки</h2>
    ${b.lessons.map((l, k) => { const d = course.lessons && course.lessons[l.id]; return html`<${Row} key=${l.id} left=${html`<span class=${"chk" + (d && d.doneAt ? " on" : "")}>${d && d.doneAt ? I.check : k + 1}</span>`} title=${l.title} sub=${d && d.doneAt ? `пройден · мини-проверка ${d.correct}/${d.total}` : l.checkIds.length ? l.checkIds.length + " мини-проверки" : "справочный урок"} onClick=${() => app.nav.push("lesson", { id: l.id })}/>`; })}
    <h2 class="h2">Тренировка (Learning Mode)</h2>
    <${Row} title="Все темы блока" sub=${practice.length + " заданий в банке · сразу проверка и разбор"} onClick=${() => app.nav.push("practice", { title: b.title, key: "block:" + b.id, ids: practice.map(q => q.id), n: 15, lv })}/>
    ${b.id === "irregular" ? html`<${Row} title="Формы V1 → V2 → V3" sub="120 глаголов в трёх направлениях" onClick=${() => app.nav.push("irregularForms")}/>` : null}
    ${b.lessons.filter(l => practice.some(q => q.sub === l.id)).map(l => html`<${Row} key=${"p" + l.id} title=${"Тема: " + l.title} sub=${practice.filter(q => q.sub === l.id).length + " заданий"} onClick=${() => app.nav.push("practice", { title: l.title, key: "lesson:" + l.id, ids: practice.filter(q => q.sub === l.id).map(q => q.id), n: 10, lv })}/>`)}
    <h2 class="h2">Контрольный тест</h2>
    <${Row} title=${sess ? "Продолжить контрольную" : "Начать контрольную"} sub=${TEST_BY_ID["block:" + b.id].size + " заданий из банка " + b.questions.length + " · Exam Mode"} onClick=${() => app.nav.push("examIntro", { testId: "block:" + b.id })}/>
    <h2 class="h2">Отчёт об ошибках</h2>
    ${evs.length ? html`<div class="cardx"><p class="small2">Ответов: ${evs.length}, ошибок: ${wrong.length}.</p><button class="link" onClick=${() => app.nav.push("errors", { module: b.id })}>Открыть карту ошибок блока</button></div>` : html`<div class="empty">Ошибок пока нет: начните с урока или тренировки.</div>`}
  </${Screen}>`;
}

/* ---------------- Lesson ---------------- */
function Body({ blocks }) {
  return html`<div class="lesson">${blocks.map((b, i) => {
    switch (b.k) {
      case "p": return html`<p key=${i}>${rich(b.t)}</p>`;
      case "h": return html`<h4 key=${i}>${b.t}</h4>`;
      case "f": return html`<div key=${i} class="formula" lang="en">${b.t}</div>`;
      case "tip": return html`<div key=${i} class="tip">${rich(b.t)}</div>`;
      case "warn": return html`<div key=${i} class="warnb">${rich(b.t)}</div>`;
      case "tb": return html`<div key=${i}><div class="tblw"><table><thead><tr>${b.head.map((c, j) => html`<th key=${j}>${c}</th>`)}</tr></thead><tbody>${b.rows.map((r, j) => html`<tr key=${j}>${r.map((c, k) => html`<td key=${k} lang=${/[а-яё]/i.test(c) ? "ru" : "en"}>${rich(c)}</td>`)}</tr>`)}</tbody></table></div>${b.note ? html`<p class="tblnote">${b.note}</p>` : null}</div>`;
      case "ex": return html`<div key=${i} class="exs">${b.rows.map((r, j) => html`<div key=${j}><div class="e" lang="en">${r[0]}</div><div class="r">${r[1]}</div>${r[2] ? html`<div class="n">${r[2]}</div>` : null}</div>`)}</div>`;
      case "tl": return html`<div key=${i}><div class="tline" role="img" aria-label=${b.caption}>
          <div class="ax"></div>${b.now != null ? html`<div class="now" style=${{ left: b.now + "%" }}></div>` : null}
          ${b.marks.map((m, j) => m.from != null ? html`<div key=${j}><div class="sp" style=${{ left: m.from + "%", width: (m.to - m.from) + "%" }}></div><div class="lb" style=${{ left: (m.from + m.to) / 2 + "%" }} lang="en">${m.t}</div></div>`
            : html`<div key=${j}><div class="pt" style=${{ left: m.at + "%" }}></div><div class="lb" style=${{ left: m.at + "%", top: (j % 2) * 18 + "px" }} lang="en">${m.t}</div></div>`)}
        </div><p class="tcap">${b.caption}</p></div>`;
      default: return null;
    }
  })}</div>`;
}
export function LessonScreen({ params }) {
  const app = useApp(); const l = LESSON_BY_ID[params.id]; const b = BLOCK_BY_ID[l.module]; const k = b.lessons.findIndex(x => x.id === l.id);
  const next = b.lessons[k + 1]; const d = (app.docs.course || {}).lessons && app.docs.course.lessons[l.id];
  const markRead = () => app.setDoc("course", c => { c = Object.assign({ lessons: {} }, c); c.lessons = Object.assign({}, c.lessons, { [l.id]: Object.assign({}, c.lessons[l.id], { doneAt: Date.now(), correct: 0, total: 0 }) }); return c; });
  const footer = l.checkIds.length ? html`<button class="btn btn-dark" onClick=${() => app.nav.push("practice", { title: "Мини-проверка: " + l.title, key: "check:" + l.id, ids: l.checkIds, n: l.checkIds.length, lessonId: l.id, lv: LV(b.n), noRequeue: false })}>Мини-проверка (${l.checkIds.length})</button>`
    : html`<button class="btn btn-dark" onClick=${() => { markRead(); app.nav.back(); }}>Отметить как прочитанный</button>`;
  return html`<${Screen} lv=${LV(b.n)} title=${l.title} sub=${b.title + " · урок " + (k + 1) + "/" + b.lessons.length} onBack=${app.nav.back} scrollKey=${l.id} footer=${footer}>
    <div class="banner learn">Цель: ${l.goal}</div>
    <${Body} blocks=${l.body}/>
    ${d && d.doneAt ? html`<div class="banner warn">Урок пройден${d.total ? `: мини-проверка ${d.correct}/${d.total}` : ""}. Мини-проверку можно пройти ещё раз — в статистику mastery идёт только первая попытка по каждому вопросу.</div>` : null}
    ${next ? html`<${Row} title=${"Следующий урок: " + next.title} onClick=${() => app.nav.replace("lesson", { id: next.id })}/>` : null}
  </${Screen}>`;
}

/* ---------------- Learning Mode practice (generic) ---------------- */
export function PracticeScreen({ params }) {
  const app = useApp(); const sid = "learn:" + params.key;
  const [sess, setSess] = useState(() => { const s = app.sessions[sid]; return s && !s.done && s.queue.every(id => Q_BY_ID[id]) ? s : createLearning(params.key, params.ids.map(id => Q_BY_ID[id]).filter(Boolean), params.n || 10, app.docs.qstats || {}); });
  const t0 = useRef(Date.now());
  useEffect(() => { app.putSession(sess); }, [sess]);
  useEffect(() => { t0.current = Date.now(); }, [sess.pos]);
  const qid = sess.queue[sess.pos]; const q = qid ? Q_BY_ID[qid] : null;
  const value = sess.response;
  const update = patch => setSess(s => Object.assign({}, s, patch));
  const check = () => {
    if (!q || sess.checked || !isAnswered(q, value)) return;
    const res = scoreQuestion(q, value); const prev = (app.docs.qstats || {})[q.id];
    const retry = sess.requeued.includes(q.id) && sess.queue.indexOf(q.id) !== sess.pos;
    app.sfx(res.correct ? "ok" : "bad");
    app.addEvent(makeEvent({ q, response: value, result: res, mode: "learning", attemptId: sess.id + ":" + sess.startedAt, testId: null, timeSpentMs: Date.now() - t0.current, firstAttempt: !prev, retry }));
    app.setDoc("qstats", st => { st = Object.assign({}, st); const o = st[q.id] || { n: 0, ok: 0 }; st[q.id] = { n: o.n + 1, ok: o.ok + (res.correct ? 1 : 0), firstOk: o.firstOk == null ? res.correct : o.firstOk, last: Date.now() }; return st; });
    let s = Object.assign({}, sess, { checked: true, result: res, correct: sess.correct + (res.correct ? 1 : 0), wrong: sess.wrong + (res.correct ? 0 : 1),
      answers: Object.assign({}, sess.answers, { [sess.pos]: { qid, ok: res.correct } }) });
    if (!res.correct && !params.lessonId) s = requeue(s, q.id);
    setSess(s);
  };
  const next = () => {
    const pos = sess.pos + 1; const done = pos >= sess.queue.length;
    if (done) { app.sfx("finish"); if (params.lessonId) app.setDoc("course", c => { c = Object.assign({ lessons: {} }, c); c.lessons = Object.assign({}, c.lessons, { [params.lessonId]: { doneAt: Date.now(), correct: sess.correct, total: sess.correct + sess.wrong } }); return c; }); }
    setSess(Object.assign({}, sess, { pos, response: null, checked: false, result: null, done }));
  };
  const restart = () => { const s = createLearning(params.key, params.ids.map(id => Q_BY_ID[id]).filter(Boolean), params.n || 10, app.docs.qstats || {}); app.putSession(s); setSess(s); };
  if (sess.done) return html`<${Screen} lv=${params.lv} title=${params.title} onBack=${() => { app.delSession(sid); app.nav.back(); }} footer=${html`<button class="btn btn-dark" onClick=${restart}>Ещё одна тренировка</button><button class="btn btn-light" onClick=${() => { app.delSession(sid); app.nav.back(); }}>Готово</button>`}>
    <div class="sum"><h2>Тренировка завершена</h2><div class="kpis"><div class="k-ok"><span class="v">${sess.correct}</span><span class="l">верно</span></div><div class="k-bad"><span class="v">${sess.wrong}</span><span class="l">${plural(sess.wrong, "ошибка", "ошибки", "ошибок")}</span></div><div class="k-n"><span class="v">${pct(sess.correct, sess.correct + sess.wrong)}%</span><span class="l">точность</span></div></div>
      <p class="small2">Это тренировочный результат, а не экзаменационный. Ошибки уже вернулись в очередь внутри тренировки и чаще будут попадаться в следующих сессиях.</p></div>
  </${Screen}>`;
  const footer = !sess.checked ? html`<button class="btn btn-dark" disabled=${!isAnswered(q, value)} onClick=${check}>Проверить</button>` : html`<button class="btn btn-dark" onClick=${next}>Дальше</button>`;
  return html`<${Screen} lv=${params.lv} title=${params.title} sub=${"Задание " + (sess.pos + 1) + " из " + sess.queue.length} onBack=${app.nav.back} scrollKey=${sess.pos} footer=${footer}
      right=${html`<button class="ib" aria-label="Начать заново" onClick=${restart}>${I.restart}</button>`}>
    <div class="banner learn">Learning Mode: проверка сразу после ответа. Это тренировка, не экзамен.</div>
    <${QuestionView} key=${sess.pos} q=${q} perm=${sess.perms[q.id]} value=${value} onChange=${v => !sess.checked && update({ response: v })} checked=${sess.checked} learning=${true} onEnter=${() => sess.checked ? next() : check()}/>
    ${sess.checked ? html`<div style=${{ marginTop: "14px" }}><${Explain} q=${q} value=${value} result=${sess.result} onLesson=${id => app.nav.push("lesson", { id })}/>${!sess.result.correct && !params.lessonId ? html`<p class="small2">Это задание вернётся через несколько шагов.</p>` : null}</div>` : null}
  </${Screen}>`;
}

/* Irregular forms trainer: directions V1→V2, V1→V3, V2/V3→V1, context sentences */
export function IrregularForms() {
  const app = useApp(); const b = BLOCK_BY_ID.irregular;
  const dir = d => b.questions.filter(q => q.drill === d).map(q => q.id);
  const ctx = b.questions.filter(q => q.kind === "practice" && !q.drill).map(q => q.id);
  return html`<${Screen} lv=${2} title="Формы неправильных глаголов" onBack=${app.nav.back}>
    <p class="hint">В скобках дан перевод — он снимает неоднозначность (found: находить / основывать). Принимаются стандартные варианты: learnt/learned, got/gotten.</p>
    <${Row} title="V1 → V2" sub="Past Simple" onClick=${() => app.nav.push("practice", { title: "V1 → V2", key: "irr:v1v2", ids: dir("v1v2"), n: 20, lv: 2 })}/>
    <${Row} title="V1 → V3" sub="Past Participle" onClick=${() => app.nav.push("practice", { title: "V1 → V3", key: "irr:v1v3", ids: dir("v1v3"), n: 20, lv: 2 })}/>
    <${Row} title="V2/V3 → V1" sub="узнать инфинитив" onClick=${() => app.nav.push("practice", { title: "V2/V3 → V1", key: "irr:back", ids: dir("back"), n: 20, lv: 2 })}/>
    <${Row} title="Формы в предложениях" sub=${ctx.length + " контекстных заданий"} onClick=${() => app.nav.push("practice", { title: "Глаголы в контексте", key: "irr:ctx", ids: ctx, n: 15, lv: 2 })}/>
    <div class="cardx" style=${{ marginTop: "12px" }}><h3>Произношение</h3><p class="small2">Режим диктовки и проверки произношения не включён: офлайн браузер не может надёжно распознать речь. Произношение форм разобрано в уроке «Произношение форм и окончание -ed».</p></div>
  </${Screen}>`;
}
