import { html, useState, useEffect, useRef, useApp, Screen, I, Row, Sheet, fmtDT, fmtDur } from "./core.js";
import { QuestionView, Explain } from "./question.js";
import { TESTS, TEST_BY_ID, BLOCKS, DICTS, LESSON_BY_ID, CONTENT_VERSION } from "../content/index.js";
import { createAttempt, finish, filledCount } from "../engine/exam.js";
import { isAnswered, ERROR_TAGS } from "../engine/scoring.js";
import { plural, groupBy } from "../engine/util.js";

export function TestsTab({ nav }) {
  const app = useApp();
  const open = Object.values(app.sessions).filter(s => s.id.startsWith("exam:") && s.attempt);
  const last = id => { const a = app.attempts.filter(x => x.testId === id).sort((a, b) => b.finishedAt - a.finishedAt)[0]; return a ? `последний результат ${a.pct}% (${a.score}/${a.total})` : "ещё не проходили"; };
  const recent = app.attempts.slice().sort((a, b) => b.finishedAt - a.finishedAt).slice(0, 8);
  return html`<${Screen} bare nav=${nav}>
    <div class="home-head"><div><h1>Контрольные</h1><p>Exam Mode: без подсказок до завершения, можно возвращаться и менять ответы. Каждая попытка — новый вариант из банка.</p></div></div>
    ${open.length ? html`<h2 class="h2">Незавершённые</h2>${open.map(s => html`<${Row} key=${s.id} title=${s.attempt.title} sub=${`заполнено ${filledCount(s.attempt)} из ${s.attempt.items.length} · начато ${fmtDT(s.attempt.startedAt)}`} onClick=${() => app.nav.push("exam", { testId: s.attempt.testId })}/>`)}` : null}
    <h2 class="h2">По блокам</h2>
    ${BLOCKS.map(b => html`<${Row} key=${b.id} title=${b.n + ". " + b.title} sub=${TEST_BY_ID["block:" + b.id].size + " заданий · " + last("block:" + b.id)} onClick=${() => app.nav.push("examIntro", { testId: "block:" + b.id })}/>`)}
    <h2 class="h2">Общие</h2>
    ${["theory", "cases", "mixed"].map(id => html`<${Row} key=${id} title=${TEST_BY_ID[id].title} sub=${TEST_BY_ID[id].size + " заданий · " + last(id)} onClick=${() => app.nav.push("examIntro", { testId: id })}/>`)}
    <h2 class="h2">Словари</h2>
    ${DICTS.map(d => html`<${Row} key=${d.id} title=${"Полный контрольный: " + d.title} sub=${d.words.length + " слов без подсказок · а также итоговые 50/50 по наборам"} onClick=${() => app.nav.push("vocabFull", { dict: d.id })}/>`)}
    <h2 class="h2">История</h2>
    ${recent.length ? recent.map(a => html`<${Row} key=${a.id} title=${a.title} sub=${`${fmtDT(a.finishedAt)} · ${a.score}/${a.total} (${a.pct}%)`} onClick=${() => app.nav.push(a.kind === "vocab" ? "vocabResult" : "results", { id: a.id })}/>`) : html`<div class="empty">Пока нет завершённых контрольных.</div>`}
  </${Screen}>`;
}

export function ExamIntro({ params }) {
  const app = useApp(); const def = TEST_BY_ID[params.testId]; const sess = app.sessions["exam:" + def.id]; const [confirm, setConfirm] = useState(false);
  const bank = new Set(def.parts.flatMap(p => p.pool.map(q => q.id))).size; const seen = Object.keys(((app.docs.exposure || {})[def.id]) || {}).length;
  const start = () => { const att = createAttempt(def, (app.docs.exposure || {})[def.id] || {}, { contentVersion: CONTENT_VERSION }); app.putSession({ id: "exam:" + def.id, attempt: att }); app.nav.replace("exam", { testId: def.id }); };
  return html`<${Screen} title="Контрольная" onBack=${app.nav.back} footer=${sess ? html`<button class="btn btn-dark" onClick=${() => app.nav.replace("exam", { testId: def.id })}>Продолжить (${filledCount(sess.attempt)}/${sess.attempt.items.length})</button><button class="btn btn-light" onClick=${() => setConfirm(true)}>Начать новую попытку</button>` : html`<button class="btn btn-dark" onClick=${start}>Начать</button>`}>
    <div class="intro"><span class="ring"></span><h2>${def.title}</h2>
      <p>${def.size} заданий из банка в ${bank}. Сначала выбираются задания, которых вы ещё не видели в этом тесте (сейчас знакомо ${seen}), с балансом по темам, форматам и сложности.</p>
      <p>Во время теста правильность не показывается. Можно переходить между заданиями и менять ответы. После завершения — оценка, правильные ответы, объяснения и карта причин ошибок.</p>
      <p>Ответы сохраняются после каждого действия: тест можно закрыть и продолжить позже.</p></div>
    ${confirm ? html`<${Sheet} onClose=${() => setConfirm(false)} label="Новая попытка"><h2>Начать заново?</h2><p>Незавершённая попытка будет удалена без оценки.</p>
      <div class="stack-btns"><button class="btn btn-bad" onClick=${() => { app.delSession("exam:" + def.id); setConfirm(false); start(); }}>Удалить и начать новую</button><button class="btn btn-light" onClick=${() => setConfirm(false)}>Отмена</button></div></${Sheet}>` : null}
  </${Screen}>`;
}

export function ExamRun({ params }) {
  const app = useApp(); const sid = "exam:" + params.testId; const s0 = app.sessions[sid];
  const [att, setAtt] = useState(s0 ? s0.attempt : null); const [sheet, setSheet] = useState(null); const shownAt = useRef(Date.now());
  useEffect(() => { if (att) app.putSession({ id: sid, attempt: att }); }, [att]);
  useEffect(() => { const flush = () => { if (document.hidden) addTime(); }; document.addEventListener("visibilitychange", flush); return () => document.removeEventListener("visibilitychange", flush); });
  if (!att) return html`<${Screen} title="Контрольная" onBack=${app.nav.back}><div class="empty">Попытка не найдена — возможно, она уже завершена.</div></${Screen}>`;
  const n = att.items.length; const it = att.items[att.idx]; const q = att.snapshot[it.qid]; const filled = filledCount(att);
  function addTime(patch = {}) { const dt = Date.now() - shownAt.current; shownAt.current = Date.now(); setAtt(a => Object.assign({}, a, patch, { timeSpent: Object.assign({}, a.timeSpent, { [it.qid]: (a.timeSpent[it.qid] || 0) + dt }), updatedAt: Date.now() })); }
  const go = i => addTime({ idx: Math.max(0, Math.min(n - 1, i)) });
  const setResp = v => setAtt(a => Object.assign({}, a, { responses: Object.assign({}, a.responses, { [it.qid]: v }), updatedAt: Date.now() }));
  const doFinish = () => {
    const dt = Date.now() - shownAt.current; const a2 = Object.assign({}, att, { timeSpent: Object.assign({}, att.timeSpent, { [it.qid]: (att.timeSpent[it.qid] || 0) + dt }) });
    const { attempt, events } = finish(a2); app.commitAttempt(attempt, events, sid); app.sfx(attempt.pct === 100 ? "done" : "finish"); app.nav.replace("results", { id: attempt.id });
  };
  const nextEmpty = () => { for (let k = 1; k <= n; k++) { const j = (att.idx + k) % n; if (!isAnswered(att.snapshot[att.items[j].qid], att.responses[att.items[j].qid])) return j; } return -1; };
  const footer = html`<div class="nav3"><button class="btn btn-light" disabled=${att.idx === 0} onClick=${() => go(att.idx - 1)} aria-label="Назад">${I.left}</button>
    <button class="btn btn-light mid" onClick=${() => setSheet("grid")}>${I.grid}${filled} / ${n}</button>
    <button class="btn btn-light" disabled=${att.idx === n - 1} onClick=${() => go(att.idx + 1)} aria-label="Вперёд">${I.right}</button></div>
    <button class="btn btn-dark" onClick=${() => setSheet("finish")}>Завершить тест</button>`;
  return html`<${Screen} title=${att.title} sub=${"Задание " + (att.idx + 1) + " из " + n} onBack=${() => { addTime(); app.nav.back(); }} scrollKey=${att.idx} footer=${footer}>
    <div class="banner exam">Exam Mode: ответы проверяются только после завершения. Ответы сохранены.</div>
    <div class="learned" style=${{ marginBottom: "12px" }}><span>Заполнено <b>${filled}</b> из ${n}</span><span class="pbar"><i style=${{ width: filled / n * 100 + "%" }}></i></span></div>
    <${QuestionView} key=${it.qid} q=${q} perm=${it.perm} value=${att.responses[it.qid]} onChange=${setResp} checked=${false} learning=${false} onEnter=${() => go(att.idx + 1)}/>
    ${(() => { const ne = nextEmpty(); return ne >= 0 && ne !== att.idx + 1 && ne !== att.idx ? html`<button class="btn btn-light" style=${{ width: "100%", marginTop: "14px", minHeight: "46px" }} onClick=${() => go(ne)}>К следующему незаполненному — № ${ne + 1}</button>` : null; })()}
    ${sheet === "grid" ? html`<${Sheet} onClose=${() => setSheet(null)} label="Все задания"><h2>Все задания</h2><p>Заполнено ${filled} из ${n}.</p>
      <div class="grid">${att.items.map((x, i) => html`<button key=${x.qid} class=${"cell" + (i === att.idx ? " cur" : "") + (isAnswered(att.snapshot[x.qid], att.responses[x.qid]) ? " filled" : "")} onClick=${() => { go(i); setSheet(null); }}>${i + 1}</button>`)}</div>
      <button class="btn btn-light" onClick=${() => setSheet(null)}>Закрыть</button></${Sheet}>` : null}
    ${sheet === "finish" ? html`<${Sheet} onClose=${() => setSheet(null)} label="Завершить"><h2>Завершить тест?</h2>
      <p>${filled < n ? `Не заполнено ${n - filled} ${plural(n - filled, "задание", "задания", "заданий")} — они будут засчитаны как неверные. ` : ""}После завершения ответы изменить нельзя.</p>
      <div class="stack-btns"><button class="btn btn-dark" onClick=${doFinish}>Завершить и проверить</button><button class="btn btn-light" onClick=${() => setSheet(null)}>Вернуться к ответам</button></div></${Sheet}>` : null}
  </${Screen}>`;
}

/** Error map for a set of answer events (used on results and in Dashboard). */
export function TagSummary({ events }) {
  const wrong = events.filter(e => !e.isCorrect); const c = {};
  wrong.forEach(e => (e.errorTags || ["UNCLASSIFIED"]).forEach(t => { c[t] = (c[t] || 0) + 1; }));
  const rows = Object.entries(c).sort((a, b) => b[1] - a[1]);
  if (!rows.length) return html`<div class="empty">Ошибок нет.</div>`;
  return html`<div>${rows.map(([t, k]) => html`<div key=${t} class="hbar"><span>${ERROR_TAGS[t] || t}</span><span class="t"><i style=${{ width: k / wrong.length * 100 + "%" }}></i></span><b>${k}</b></div>`)}
    <p class="small2">Причина — «вероятная»: она взята из разметки выбранного варианта или правила для введённого ответа. Ошибки без надёжного признака помечены «Не классифицировано».</p></div>`;
}

export function Results({ params }) {
  const app = useApp(); const a = app.attempts.find(x => x.id === params.id); const [open, setOpen] = useState(null);
  if (!a) return html`<${Screen} title="Результат" onBack=${app.nav.back}><div class="empty">Попытка не найдена.</div></${Screen}>`;
  const evs = app.events.filter(e => e.attemptId === a.id);
  const weak = Object.entries(groupBy(evs.filter(e => !e.isCorrect), e => e.lessonId || e.subtopicId)).sort((x, y) => y[1].length - x[1].length);
  return html`<${Screen} title="Результат" sub=${a.title} onBack=${app.nav.back} footer=${a.testId ? html`<button class="btn btn-dark" onClick=${() => app.nav.replace("examIntro", { testId: a.testId })}>Ретест: новые задания</button>` : null}>
    <div class="sum"><h2>${a.pct === 100 ? "Идеально!" : "Тест завершён"}</h2>
      <div class="kpis"><div class="k-ok"><span class="v">${a.score}</span><span class="l">из ${a.total} верно</span></div><div class="k-bad"><span class="v">${a.total - a.score}</span><span class="l">${plural(a.total - a.score, "ошибка", "ошибки", "ошибок")}</span></div><div class="k-n"><span class="v">${a.pct}%</span><span class="l">результат</span></div></div>
      <p class="small2">${fmtDT(a.finishedAt)} · длительность ${fmtDur(a.durationMs || 0)} · банк ${a.contentVersion}</p></div>
    <h2 class="h2">Карта причин ошибок</h2><${TagSummary} events=${evs}/>
    <h2 class="h2">Слабые темы и рекомендации</h2>
    ${weak.length ? weak.slice(0, 6).map(([lid, es]) => { const l = LESSON_BY_ID[lid]; return html`<${Row} key=${lid} title=${l ? l.title : lid} sub=${`${es.length} ${plural(es.length, "ошибка", "ошибки", "ошибок")} · повторите урок, затем тренировку по теме`} onClick=${() => l && app.nav.push("lesson", { id: l.id })}/>`; }) : html`<div class="empty">Слабых тем в этой попытке нет.</div>`}
    <h2 class="h2">Все задания с разбором</h2>
    ${a.items.map((it, i) => { const q = a.snapshot[it.qid]; const r = a.results[it.qid]; const on = open === i;
      return html`<div key=${it.qid} class="cardx"><button class="row" style=${{ border: "none", padding: "0", minHeight: "auto", background: "none" }} onClick=${() => setOpen(on ? null : i)}>
        <span class=${"chk" + (r.correct ? " on" : "")} style=${!r.correct ? { background: "var(--bad)", borderColor: "var(--bad-line)", color: "var(--bad-ink)" } : null}>${r.correct ? I.check : I.bad}</span>
        <span class="rt"><b>${i + 1}. ${q.prompt.length > 80 ? q.prompt.slice(0, 80) + "…" : q.prompt}</b></span></button>
        ${on ? html`<div style=${{ marginTop: "12px" }}><${QuestionView} q=${q} perm=${it.perm} value=${a.responses[it.qid]} onChange=${() => {}} checked=${true} learning=${true}/><div style=${{ marginTop: "10px" }}><${Explain} q=${q} value=${a.responses[it.qid]} result=${r} onLesson=${id => app.nav.push("lesson", { id })}/></div></div>` : null}</div>`; })}
  </${Screen}>`;
}
