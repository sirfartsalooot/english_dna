import { html, useState, useMemo, useApp, Screen, I, Row, Sheet, StatusChip, fmtDT, fmtDur } from "./core.js";
import { BLOCKS, BLOCK_BY_ID, DICTS, Q_BY_ID, LESSON_BY_ID, COURSE, CONTENT_VERSION } from "../content/index.js";
import { filterEvents, errorMatrix, topIssues, weekly, breakdown, firstAnswerStats, streak, topicStrength, blockMastery, dictStats } from "../engine/analytics.js";
import { ERROR_TAGS, TAG_KEYS } from "../engine/scoring.js";
import { answerEventsCSV, testAttemptsCSV, weeklySummaryCSV, errorMapCSV, makeBackup, validateBackup } from "../engine/csv.js";
import { DB_VERSION } from "../engine/db.js";
import { dayKey, pct, isoWeek, plural } from "../engine/util.js";
import { mctx } from "./course.js";

export const moduleTitle = m => (BLOCK_BY_ID[m] && BLOCK_BY_ID[m].title) || (m && m.startsWith("vocab-") ? "Слова: " + ((DICTS.find(d => "vocab-" + d.id === m) || {}).title || m) : m || "—");
const DAY = 864e5;
function rangeOf(r, from, to) { const now = Date.now(); if (r === "7") return { from: now - 7 * DAY, to: now }; if (r === "30") return { from: now - 30 * DAY, to: now };
  if (r === "custom" && from && to) { const f = new Date(from + "T00:00:00").getTime(), t = new Date(to + "T23:59:59").getTime(); return { from: f, to: t }; } return {}; }

/* ---------- file delivery: Web Share with files where available, otherwise Blob download ---------- */
export async function deliverFiles(files, title) {
  const blobs = files.map(f => new File([f.text], f.name, { type: f.type || "text/csv;charset=utf-8" }));
  try { if (navigator.canShare && navigator.canShare({ files: blobs })) { await navigator.share({ files: blobs, title }); return "shared"; } }
  catch (e) { if (e && e.name === "AbortError") return "cancelled"; }
  for (const f of blobs) { const url = URL.createObjectURL(f); const a = document.createElement("a"); a.href = url; a.download = f.name; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000); await new Promise(r => setTimeout(r, 350)); }
  return "downloaded";
}

export function ProgressTab({ nav }) {
  const app = useApp(); const [r, setR] = useState("30"); const [mode, setMode] = useState("all"); const [lvl, setLvl] = useState("all"); const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const [drill, setDrill] = useState(null); const [msg, setMsg] = useState(null); const [imp, setImp] = useState(null);
  const range = rangeOf(r, from, to);
  const evs = useMemo(() => filterEvents(app.events, Object.assign({ mode, level: lvl }, range)), [app.events, r, mode, lvl, from, to]);
  const allInRange = useMemo(() => filterEvents(app.events, range), [app.events, r, from, to]);
  const matrix = errorMatrix(evs); const usedTags = TAG_KEYS.filter(t => matrix.some(m => m.tags[t]));
  const issues = topIssues(evs); const weeks = weekly(app.events).slice(-8); const fa = firstAnswerStats(allInRange);
  const wkNow = isoWeek(Date.now()), wkPrev = isoWeek(Date.now() - 7 * DAY); const W = weeks.reduce((m, w) => (m[w.week] = w, m), {});
  const cw = W[wkNow] || { answered: 0, accuracy: 0, errors: 0 }, pw = W[wkPrev] || { answered: 0, accuracy: 0, errors: 0 };
  const masteries = BLOCKS.map(b => ({ b, m: blockMastery(b, mctx(app)) }));
  const courseScore = Math.round(masteries.reduce((a, x) => a + x.m.score, 0) / COURSE.length);
  const strength = topicStrength(evs); const lvlB = breakdown(allInRange.filter(e => e.level), "level"); const modeB = breakdown(allInRange, "mode");
  const attemptsInRange = app.attempts.filter(a => (range.from == null || a.finishedAt >= range.from) && (range.to == null || a.finishedAt <= range.to));
  const stamp = dayKey(Date.now());
  const masteredBy = Object.fromEntries(masteries.map(x => [x.b.id, x.m.status]));
  const exportCSV = async (scope) => {
    const E = scope === "full" ? app.events : allInRange, A = scope === "full" ? app.attempts : attemptsInRange;
    const files = [{ name: `weekly_summary_${stamp}.csv`, text: weeklySummaryCSV(E, A, masteredBy) }, { name: `test_attempts_${stamp}.csv`, text: testAttemptsCSV(A) },
      { name: `answer_events_${stamp}.csv`, text: answerEventsCSV(E) }, { name: `error_map_${stamp}.csv`, text: errorMapCSV(E) }];
    const res = await deliverFiles(files, "Wordsword CSV");
    setMsg(res === "cancelled" ? "Экспорт отменён." : `${E.length ? "" : "Внимание: событий за период нет — файлы содержат только заголовки. "}Готово: 4 файла (${E.length} ответов, ${A.length} попыток) ${res === "shared" ? "переданы в меню «Поделиться»" : "скачаны"}.`);
  };
  const exportJSON = async () => { const dump = await app.store.dumpAll(); const b = makeBackup(dump, DB_VERSION, CONTENT_VERSION);
    const res = await deliverFiles([{ name: `wordsword_backup_${stamp}.json`, text: JSON.stringify(b), type: "application/json" }], "Wordsword backup");
    setMsg(res === "cancelled" ? "Отменено." : `Резервная копия создана: ${dump.events.length} событий, ${dump.attempts.length} попыток.`); };
  const pickImport = () => { const i = document.createElement("input"); i.type = "file"; i.accept = "application/json,.json"; i.onchange = async () => { const f = i.files[0]; if (!f) return;
    try { const obj = JSON.parse(await f.text()); const v = validateBackup(obj); setImp({ obj, v, name: f.name }); } catch (e) { setImp({ v: { ok: false, errors: ["Не удалось прочитать JSON: " + e.message] }, name: f.name }); } }; i.click(); };
  const chip = (cur, set, v, l) => html`<button class="chip" aria-pressed=${cur === v} onClick=${() => set(v)}>${l}</button>`;
  return html`<${Screen} bare nav=${nav}>
    <div class="home-head"><div><h1>Прогресс</h1><p>Всё рассчитано из ваших ответов на этом устройстве.</p></div></div>
    <div class="chips" style=${{ marginBottom: "8px" }}>${chip(r, setR, "7", "7 дней")}${chip(r, setR, "30", "30 дней")}${chip(r, setR, "all", "Всё время")}${chip(r, setR, "custom", "Даты")}</div>
    ${r === "custom" ? html`<div style=${{ display: "flex", gap: "8px", marginBottom: "8px" }}><input class="datein" type="date" value=${from} onChange=${e => setFrom(e.target.value)} aria-label="С"/><input class="datein" type="date" value=${to} onChange=${e => setTo(e.target.value)} aria-label="По"/></div>` : null}
    <div class="chips" style=${{ marginBottom: "14px" }}>${chip(mode, setMode, "all", "Все режимы")}${chip(mode, setMode, "exam", "Exam")}${chip(mode, setMode, "learning", "Learning")}${chip(lvl, setLvl, "all", "B2+C1")}${chip(lvl, setLvl, "B2", "B2")}${chip(lvl, setLvl, "C1", "C1")}</div>

    <div class="stat"><div class="stat-top"><span class="stat-l">Курс</span><span class="stat-n">${courseScore}<small>%</small></span></div>
      <p class="stat-sub">Средний mastery по ${COURSE.length} блокам (в сборке ${BLOCKS.length}). Серия: ${streak(app.events)} дн. подряд.</p></div>
    <div class="kv" style=${{ marginTop: "12px" }}><div><div class="v">${allInRange.length}</div><div class="l">ответов за период</div></div><div><div class="v">${fa.accuracy}%</div><div class="l">точность первых ответов (${fa.n})</div></div>
      <div><div class="v">${fa.medianMs ? (fa.medianMs / 1000).toFixed(1) + " с" : "—"}</div><div class="l">медианное время ответа</div></div><div><div class="v">${fmtDur(allInRange.reduce((a, e) => a + (e.timeSpentMs || 0), 0))}</div><div class="l">время в заданиях</div></div></div>

    <h2 class="h2">Неделя к неделе</h2>
    <div class="kv"><div><div class="v">${cw.answered} <small class="small2">/ ${pw.answered}</small></div><div class="l">ответов: эта / прошлая</div></div><div><div class="v">${cw.accuracy}% <small class="small2">/ ${pw.accuracy}%</small></div><div class="l">точность: эта / прошлая</div></div>
      <div><div class="v">${cw.errors} <small class="small2">/ ${pw.errors}</small></div><div class="l">ошибок: эта / прошлая</div></div><div><div class="v">${modeB.map(x => x.key === "exam" ? x.accuracy + "%" : null).filter(Boolean)[0] || "—"} <small class="small2">/ ${modeB.map(x => x.key === "learning" ? x.accuracy + "%" : null).filter(Boolean)[0] || "—"}</small></div><div class="l">Exam / Learning точность</div></div></div>
    <h2 class="h2">Динамика по неделям</h2>
    ${weeks.length ? html`<div class="cardx"><div class="bars" aria-label="Точность по неделям">${weeks.map(w => html`<div key=${w.week} class="b"><span>${w.accuracy}%</span><i style=${{ height: Math.max(2, w.accuracy) + "px" }}></i><span>${w.week.slice(5)}</span></div>`)}</div>
      <div class="bars" aria-label="Ошибки по неделям" style=${{ height: "80px" }}>${weeks.map(w => { const mx = Math.max(...weeks.map(x => x.errors), 1); return html`<div key=${w.week} class="b"><span>${w.errors}</span><i class="e" style=${{ height: Math.max(2, w.errors / mx * 50) + "px" }}></i></div>`; })}</div>
      <p class="small2">Сверху — точность, снизу — число ошибок.</p></div>` : html`<div class="empty">Пока нет данных.</div>`}

    <h2 class="h2">Карта ошибок: блок × причина</h2>
    ${matrix.some(m => m.wrong) ? html`<div class="heat"><table><thead><tr><th class="m">Блок</th>${usedTags.map(t => html`<th key=${t}>${ERROR_TAGS[t]}</th>`)}</tr></thead><tbody>
      ${matrix.filter(m => m.total).map(m => html`<tr key=${m.module}><td class="m">${moduleTitle(m.module)}<div class="small2">${m.wrong}/${m.total}</div></td>${usedTags.map(t => { const c = m.tags[t] || 0; const share = c / m.total;
        return html`<td key=${t}>${c ? html`<button style=${{ background: `rgba(163,49,60,${0.12 + share * 1.6})`, color: share > .3 ? "#fff" : "var(--ink)" }} onClick=${() => setDrill({ module: m.module, tag: t })} aria-label=${`${moduleTitle(m.module)}, ${ERROR_TAGS[t]}: ${c}`}>${c}<br/>${Math.round(share * 100)}%</button>` : html`<span class="small2">·</span>`}</td>`; })}</tr>`)}
      </tbody></table></div><p class="small2">Число ошибок и доля от всех ответов блока за период. Нажмите на ячейку — увидите вопросы и ответы, из которых сделан вывод.</p>` : html`<div class="empty">Ошибок за период нет — или ещё нет ответов.</div>`}

    <h2 class="h2">Топ-5 системных проблем</h2>
    ${issues.length ? issues.map((x, k) => { const l = LESSON_BY_ID[x.sub]; return html`<div key=${k} class="cardx"><h3>${k + 1}. ${ERROR_TAGS[x.tag]} — ${l ? l.title : moduleTitle(x.module)}</h3>
      <p class="small2">${x.count} ${plural(x.count, "ошибка", "ошибки", "ошибок")} на ${x.total} ${plural(x.total, "ответ", "ответа", "ответов")} (${Math.round(x.rate * 100)}%). Вероятная причина — по разметке выбранных вариантов.</p>
      <p class="small2"><b>Пример:</b> «${x.events[0].userAnswer || "—"}» вместо «${x.events[0].correctAnswer}».</p>
      <div style=${{ display: "flex", gap: "12px", flexWrap: "wrap" }}>${l ? html`<button class="link" onClick=${() => app.nav.push("lesson", { id: l.id })}>Урок</button>` : null}
        <button class="link" onClick=${() => setDrill({ module: x.module, tag: x.tag, sub: x.sub })}>Вопросы</button>
        ${BLOCK_BY_ID[x.module] ? html`<button class="link" onClick=${() => app.nav.push("practice", { title: "Ретест: " + (l ? l.title : x.module), key: "retest:" + x.sub, ids: BLOCK_BY_ID[x.module].questions.filter(q => q.sub === x.sub && q.kind !== "theory").map(q => q.id), n: 10 })}>Ретест из новых заданий</button>` : null}</div></div>`; }) : html`<div class="empty">Недостаточно ошибок для выводов.</div>`}

    <h2 class="h2">Блоки курса</h2>
    ${masteries.map(({ b, m }) => html`<div key=${b.id} class="cardx"><div style=${{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}><h3 style=${{ margin: 0 }}>${b.n}. ${b.title}</h3><${StatusChip} s=${m.status}/></div>
      <p class="small2">Уроки ${m.done}/${m.lessons} · теория ${m.theoryAcc ?? "—"}% · практика ${m.practiceAcc ?? "—"}% (1-я попытка) · покрытие ${m.coverage}% · контрольная ${m.lastExam ?? "—"}% · mastery ${m.score}%</p>
      <div class="hbar"><span>Покрытие банка</span><span class="t"><i style=${{ width: m.coverage + "%" }}></i></span><b>${m.coverage}%</b></div></div>`)}
    <p class="small2">Mastery = 15% уроки + 15% теория + 25% практика (первые ответы × покрытие) + 45% последняя контрольная. Повторные ответы на тот же вопрос в mastery не учитываются.</p>

    <h2 class="h2">Словари</h2>
    ${DICTS.map(d => { const st = dictStats(d, Object.fromEntries(d.sets.map(s => [s.id, app.docs["vocab:" + s.id]])), app.docs["vocabfull:" + d.id], app.events);
      return html`<div key=${d.id} class="cardx"><h3>${d.title}</h3><p class="small2">Изучено ${st.learned}/${st.total} · закреплено ${st.consolidated} · точность ${st.accuracy}% (${st.answers} ответов) · медиана ${st.medianMs ? (st.medianMs / 1000).toFixed(1) + " с" : "—"} · последнее повторение ${st.lastTs ? fmtDT(st.lastTs) : "—"}</p>
        <p class="small2">Итоговые по наборам: ${st.finals.map(f => `${f.set}: ${f.best == null ? "—" : f.best + "/" + f.size}`).join(" · ")} · полный: ${st.fullBest == null ? "—" : st.fullBest + "/" + st.total}</p></div>`; })}

    <h2 class="h2">Уровень и режим</h2>
    <div class="cardx">${lvlB.concat(modeB).map(x => html`<div key=${x.key} class="hbar"><span>${x.key === "exam" ? "Exam" : x.key === "learning" ? "Learning" : x.key} (${x.total})</span><span class="t"><i style=${{ width: x.accuracy + "%" }}></i></span><b>${x.accuracy}%</b></div>`)}${!lvlB.length ? html`<p class="small2">Нет данных.</p>` : null}</div>
    <h2 class="h2">Сильные и слабые темы</h2>
    ${strength.length ? html`<div class="cardx">${strength.slice(0, 4).map(s => html`<div key=${s.module + s.sub} class="hbar"><span>${(LESSON_BY_ID[s.sub] || {}).title || s.sub}</span><span class="t"><i style=${{ width: s.accuracy + "%", background: "var(--bad-ink)" }}></i></span><b>${s.accuracy}%</b></div>`)}
      ${strength.length > 4 ? strength.slice(-3).reverse().map(s => html`<div key=${"s" + s.module + s.sub} class="hbar"><span>${(LESSON_BY_ID[s.sub] || {}).title || s.sub}</span><span class="t"><i style=${{ width: s.accuracy + "%", background: "var(--ok-ink)" }}></i></span><b>${s.accuracy}%</b></div>`) : null}
      <p class="small2">Темы с ≥ 4 ответами. Красные — слабые, зелёные — сильные.</p></div>` : html`<div class="empty">Нужно больше ответов (≥ 4 по теме).</div>`}

    <h2 class="h2">Экспорт и резервная копия</h2>
    <div class="cardx"><div class="stack-btns">
      <button class="btn btn-dark" onClick=${() => exportCSV("range")}>Экспорт CSV (выбранный период)</button>
      <button class="btn btn-light" onClick=${() => exportCSV("full")}>Полный CSV</button>
      <button class="btn btn-light" onClick=${exportJSON}>Резервная копия JSON</button>
      <button class="btn btn-light" onClick=${pickImport}>Импорт JSON</button></div>
      ${msg ? html`<p class="banner warn" style=${{ marginTop: "10px" }}>${msg}</p>` : null}
      <p class="small2" style=${{ marginTop: "10px" }}>Создаются 4 файла: weekly_summary, test_attempts, answer_events, error_map (UTF-8 с BOM — корректно открываются в Excel). На iPhone откроется меню «Поделиться» → «Сохранить в Файлы»; на Android — меню «Поделиться» или папка «Загрузки». Поведение браузеров может отличаться. Данные никуда не отправляются.</p></div>

    ${drill ? html`<${Drill} drill=${drill} events=${evs} onClose=${() => setDrill(null)}/>` : null}
    ${imp ? html`<${Sheet} onClose=${() => setImp(null)} label="Импорт"><h2>Импорт ${imp.name}</h2>
      ${imp.v.ok ? html`<p>Файл корректен: ${imp.v.summary.events} событий, ${imp.v.summary.attempts} попыток, ${imp.v.summary.docs} документов (создан ${imp.v.summary.exportedAt}). <b>Текущие данные на устройстве будут полностью заменены.</b></p>
        <div class="stack-btns"><button class="btn btn-bad" onClick=${async () => { await app.importAll(imp.obj.data); setImp(null); setMsg("Импорт выполнен."); }}>Заменить данные</button><button class="btn btn-light" onClick=${() => setImp(null)}>Отмена</button></div>`
        : html`<p>Файл не прошёл проверку, данные не изменены:</p><ul class="replist">${imp.v.errors.map(e => html`<li key=${e}>${e}</li>`)}</ul><button class="btn btn-light" onClick=${() => setImp(null)}>Закрыть</button>`}</${Sheet}>` : null}
  </${Screen}>`;
}

function Drill({ drill, events, onClose }) {
  const app = useApp(); const list = events.filter(e => !e.isCorrect && e.moduleId === drill.module && (e.errorTags || []).includes(drill.tag) && (!drill.sub || e.subtopicId === drill.sub)).sort((a, b) => b.ts - a.ts);
  return html`<${Sheet} onClose=${onClose} label="Детализация"><h2>${ERROR_TAGS[drill.tag]}</h2><p>${moduleTitle(drill.module)} · ${list.length} ${plural(list.length, "ответ привёл", "ответа привели", "ответов привели")} к этому выводу.</p>
    ${list.slice(0, 40).map(e => { const q = Q_BY_ID[e.questionId]; const l = LESSON_BY_ID[e.lessonId];
      return html`<div key=${e.id} class="cardx"><p class="small2">${fmtDT(e.ts)} · ${e.mode === "exam" ? "Exam" : "Learning"} · ${e.format}</p>
        <p style=${{ fontWeight: 600 }}>${q ? q.prompt : e.questionId}</p><p class="small2">Ответ: <s>${e.userAnswer || "—"}</s> → верно: <b lang="en">${e.correctAnswer}</b></p>
        ${q ? html`<p class="small2">${q.explain}</p>` : null}${l ? html`<button class="link" onClick=${() => { onClose(); app.nav.push("lesson", { id: l.id }); }}>Урок: ${l.title}</button>` : null}</div>`; })}
    <button class="btn btn-light" onClick=${onClose}>Закрыть</button></${Sheet}>`;
}

/** Error map for one block (opened from the block screen). */
export function ErrorsScreen({ params }) {
  const app = useApp(); const evs = app.events.filter(e => e.moduleId === params.module); const m = errorMatrix(evs)[0]; const [drill, setDrill] = useState(null);
  return html`<${Screen} title="Карта ошибок" sub=${moduleTitle(params.module)} onBack=${app.nav.back}>
    ${m && m.wrong ? html`<div class="cardx">${Object.entries(m.tags).sort((a, b) => b[1] - a[1]).map(([t, c]) => html`<button key=${t} class="row" onClick=${() => setDrill({ module: params.module, tag: t })}><span class="rt"><b>${ERROR_TAGS[t]}</b><span>${c} из ${m.total} ответов (${pct(c, m.total)}%)</span></span><span class="chev">${I.right}</span></button>`)}</div>` : html`<div class="empty">Ошибок нет.</div>`}
    ${drill ? html`<${Drill} drill=${drill} events=${evs} onClose=${() => setDrill(null)}/>` : null}
  </${Screen}>`;
}
