import { html, useState, useEffect, useApp, Screen, I, Row, Sheet, SaveBadge, fmtDT } from "./core.js";
import { PLAN } from "../content/plan30.js";
import { BLOCK_BY_ID, COURSE, DICT_BY_ID, SET_BY_ID, TEST_BY_ID, Q_BY_ID, LESSON_BY_ID, CONTENT_VERSION, BLOCKS } from "../content/index.js";
import { topicStrength, topIssues } from "../engine/analytics.js";
import { ERROR_TAGS } from "../engine/scoring.js";
import { dayKey, plural } from "../engine/util.js";
import { filledCount } from "../engine/exam.js";
import { moduleTitle } from "./dashboard.js";

const DAY = 864e5;
const planDayIndex = start => Math.max(0, Math.min(29, Math.floor((new Date(dayKey(Date.now())) - new Date(start)) / DAY)));

/** Automatic completion check for a plan item (based on real data); manual ticks override. */
function itemDone(it, app, dayStartTs) {
  const course = app.docs.course || {}; const since = e => e.ts >= dayStartTs;
  switch (it.k) {
    case "lesson": return !!BLOCK_BY_ID[it.block] && (it.lessons || BLOCK_BY_ID[it.block].lessons.map(l => l.id)).every(id => course.lessons && course.lessons[id] && course.lessons[id].doneAt);
    case "vocab": return app.events.filter(e => e.moduleId === "vocab-" + it.dict && since(e) && (!it.set || (e.subtopicId || "").startsWith(it.set))).length >= 15;
    case "practice": return app.events.filter(e => e.moduleId === it.block && e.mode === "learning" && since(e)).length >= 10;
    case "cases": return app.events.filter(e => e.kind === "case" && since(e)).length >= 6;
    case "test": return app.attempts.some(a => a.testId === it.test && a.finishedAt >= dayStartTs);
    default: return false;
  }
}
function itemLabel(it) {
  switch (it.k) {
    case "lesson": { const b = BLOCK_BY_ID[it.block]; const c = COURSE.find(x => x.id === it.block); return { t: "Теория: " + (b ? b.title : c.title), s: b && it.lessons ? it.lessons.map(id => LESSON_BY_ID[id].title).join(" · ") : "все уроки блока", ok: !!b }; }
    case "vocab": { const d = DICT_BY_ID[it.dict]; return { t: "Слова: " + d.title, s: it.note || "", ok: true }; }
    case "practice": return { t: "Грамматика: " + BLOCK_BY_ID[it.block].title, s: it.note || "тренировка Learning Mode", ok: true };
    case "cases": return { t: "Case Lab", s: it.note || "кейсы в Learning Mode", ok: true };
    case "test": return { t: TEST_BY_ID[it.test] ? TEST_BY_ID[it.test].title : it.test, s: it.note || "Exam Mode", ok: !!TEST_BY_ID[it.test] };
    case "review": return { t: "Разбор ошибок", s: "ошибки за последние 7 дней", ok: true };
  }
}
function openItem(app, it) {
  switch (it.k) {
    case "lesson": { const b = BLOCK_BY_ID[it.block]; const course = app.docs.course || {}; const nextL = (it.lessons || []).find(id => !(course.lessons && course.lessons[id] && course.lessons[id].doneAt)); return nextL ? app.nav.push("lesson", { id: nextL }) : app.nav.push("block", { id: b.id }); }
    case "vocab": return it.set ? app.nav.push("vocabSet", { setId: it.set }) : app.nav.push("vocabFull", { dict: it.dict });
    case "practice": { const b = BLOCK_BY_ID[it.block]; return app.nav.push("practice", { title: b.title, key: "block:" + b.id, ids: b.questions.filter(q => q.kind === "practice" && !q.drill).map(q => q.id), n: 15 }); }
    case "cases": return app.nav.push("practice", { title: "Case Lab", key: "cases:all", ids: Object.keys(Q_BY_ID).filter(id => Q_BY_ID[id].kind === "case"), n: 8 });
    case "test": return app.nav.push("examIntro", { testId: it.test });
    case "review": return app.nav.push("review");
  }
}

export function TodayTab({ nav }) {
  const app = useApp(); const course = app.docs.course || {}; const plan = course.plan || {};
  const start = plan.start || dayKey(Date.now()); const idx0 = planDayIndex(start); const [idx, setIdx] = useState(idx0);
  const day = PLAN[idx]; const dayStart = new Date(start).getTime() + idx * DAY;
  const manual = plan.done || {};
  const isDone = (it, k) => manual[`${day.day}:${k}`] != null ? manual[`${day.day}:${k}`] : itemDone(it, app, idx === idx0 ? new Date(dayKey(Date.now())).getTime() : dayStart);
  const toggle = (k, v) => app.setDoc("course", c => { c = Object.assign({}, c); c.plan = Object.assign({ start }, c.plan); c.plan.done = Object.assign({}, c.plan.done, { [`${day.day}:${k}`]: v }); return c; });
  const open = Object.values(app.sessions).filter(s => (s.id.startsWith("exam:") && s.attempt) || (s.id.startsWith("learn:") && !s.done && s.queue));
  const behind = PLAN.slice(0, idx0).filter(d => d.items.some((it, k) => { const lab = itemLabel(it); return lab.ok && !(manual[`${d.day}:${k}`] ?? false) && it.k !== "review" && !itemDone(it, app, 0); }));
  const weak = topicStrength(app.events.filter(e => e.ts > Date.now() - 14 * DAY)).filter(s => s.accuracy < 70 && LESSON_BY_ID[s.sub])[0];
  useEffect(() => { if (!plan.start) app.setDoc("course", c => Object.assign({}, c, { plan: Object.assign({ start }, (c || {}).plan) })); }, []);
  return html`<${Screen} bare nav=${nav}>
    <div class="home-head"><div><h1>Wordsword</h1><p>Интенсив B2 → C1 · <${SaveBadge}/></p></div>
      <div class="acts"><button class="ib" aria-label=${app.prefs.sound ? "Выключить звук" : "Включить звук"} onClick=${() => app.setPref("sound", !app.prefs.sound, true)}>${app.prefs.sound ? I.soundOn : I.soundOff}</button><button class="ib" aria-label="Настройки" onClick=${() => app.nav.push("settings")}>${I.gear}</button></div></div>
    ${open.length ? html`<h2 class="h2">Продолжить</h2>${open.map(s => s.attempt ? html`<${Row} key=${s.id} title=${s.attempt.title} sub=${`контрольная · заполнено ${filledCount(s.attempt)}/${s.attempt.items.length}`} onClick=${() => app.nav.push("exam", { testId: s.attempt.testId })}/>`
      : html`<${Row} key=${s.id} title=${"Тренировка: " + s.scope} sub=${`задание ${s.pos + 1} из ${s.queue.length}`} onClick=${() => app.nav.push("practice", { title: "Продолжение тренировки", key: s.scope, ids: s.queue, n: s.queue.length })}/>`)}` : null}
    <h2 class="h2">30 дней</h2>
    <div class="daynav"><button class="ib" disabled=${idx === 0} onClick=${() => setIdx(idx - 1)} aria-label="Предыдущий день">${I.left}</button>
      <div class="c"><b>День ${day.day}${idx === idx0 ? " · сегодня" : ""}</b><span class="small2">Неделя ${day.week} · ${day.title}</span></div>
      <button class="ib" disabled=${idx === 29} onClick=${() => setIdx(idx + 1)} aria-label="Следующий день">${I.right}</button></div>
    <p class="small2" style=${{ margin: "0 2px 8px" }}>Ориентир на день: 20 мин теория · 30 мин словарь · 35 мин грамматика/кейсы · 20 мин разбор ошибок. Другие темы не блокируются.</p>
    ${day.items.map((it, k) => { const lab = itemLabel(it); const done = isDone(it, k);
      if (!lab.ok) return html`<div key=${k} class="row dim"><span class="rt"><b>${lab.t}</b><span>Этого блока нет в текущей сборке. Вместо него в этот день: разбор ошибок и тренировка слабых тем.</span></span></div>`;
      return html`<div key=${k} style=${{ display: "flex", gap: "8px", alignItems: "stretch", marginBottom: "8px" }}><button class=${"chk" + (done ? " on" : "")} style=${{ alignSelf: "center" }} aria-pressed=${done} aria-label="Отметить выполненным" onClick=${() => toggle(k, !done)}>${done ? I.check : null}</button>
        <div style=${{ flex: 1 }}><${Row} title=${lab.t} sub=${lab.s + " · ~" + it.min + " мин"} onClick=${() => openItem(app, it)}/></div></div>`; })}
    ${weak ? html`<h2 class="h2">Адаптация по результатам</h2><${Row} title=${"Слабая тема: " + LESSON_BY_ID[weak.sub].title} sub=${`точность ${weak.accuracy}% за 14 дней — короткая тренировка`} onClick=${() => app.nav.push("practice", { title: LESSON_BY_ID[weak.sub].title, key: "weak:" + weak.sub, ids: BLOCK_BY_ID[weak.module].questions.filter(q => q.sub === weak.sub).map(q => q.id), n: 10 })}/>` : null}
    ${behind.length ? html`<h2 class="h2">Догнать</h2>${behind.slice(0, 3).map(d => html`<${Row} key=${d.day} title=${"День " + d.day + ": " + d.title} sub="есть невыполненные пункты" onClick=${() => setIdx(d.day - 1)}/>`)}` : null}
    <p class="small2" style=${{ marginTop: "14px" }}>Старт маршрута: ${new Date(start).toLocaleDateString("ru-RU")}. Изменить можно в настройках.</p>
  </${Screen}>`;
}

export function ReviewScreen() {
  const app = useApp(); const recent = app.events.filter(e => !e.isCorrect && e.ts > Date.now() - 7 * DAY);
  const grammar = recent.filter(e => Q_BY_ID[e.questionId]); const vocab = recent.filter(e => e.kind === "vocab");
  const ids = [...new Set(grammar.map(e => e.questionId))]; const issues = topIssues(recent, 5);
  return html`<${Screen} title="Разбор ошибок" sub="последние 7 дней" onBack=${app.nav.back} footer=${ids.length ? html`<button class="btn btn-dark" onClick=${() => app.nav.replace("practice", { title: "Работа над ошибками", key: "review", ids, n: Math.min(15, ids.length) })}>Тренировать эти задания (${ids.length})</button>` : null}>
    ${!recent.length ? html`<div class="empty">За 7 дней ошибок нет. Отличная работа — или пора пройти тренировку.</div>` : null}
    ${issues.map((x, k) => html`<div key=${k} class="cardx"><h3>${ERROR_TAGS[x.tag]}</h3><p class="small2">${moduleTitle(x.module)}${LESSON_BY_ID[x.sub] ? " · " + LESSON_BY_ID[x.sub].title : ""} · ${x.count} ${plural(x.count, "ошибка", "ошибки", "ошибок")}</p>
      ${x.events.slice(0, 3).map(e => html`<p key=${e.id} class="small2">«${e.userAnswer || "—"}» → <b lang="en">${e.correctAnswer}</b></p>`)}
      ${LESSON_BY_ID[x.sub] ? html`<button class="link" onClick=${() => app.nav.push("lesson", { id: x.sub })}>Повторить урок</button>` : null}</div>`)}
    ${vocab.length ? html`<h2 class="h2">Слова с ошибками</h2><ul class="replist">${[...new Map(vocab.map(e => [e.questionId, e])).values()].slice(0, 30).map(e => html`<li key=${e.id}><b lang="en">${e.correctAnswer}</b>${e.userAnswer ? html` — ваш ответ: ${e.userAnswer}` : null}</li>`)}</ul><p class="small2">Эти слова автоматически чаще попадаются в тренировках словаря.</p>` : null}
  </${Screen}>`;
}

export function SettingsScreen() {
  const app = useApp(); const [ask, setAsk] = useState(false); const course = app.docs.course || {};
  return html`<${Screen} title="Настройки" onBack=${app.nav.back}>
    <div class="cardx">
      <button class="set-row" onClick=${() => app.setPref("sound", !app.prefs.sound, true)}><span>Звук ответов</span><span class=${"sw" + (app.prefs.sound ? " on" : "")}></span></button>
      ${navigator.vibrate ? html`<button class="set-row" onClick=${() => app.setPref("vibro", !app.prefs.vibro)}><span>Вибрация</span><span class=${"sw" + (app.prefs.vibro ? " on" : "")}></span></button>` : null}
      <div class="set-row"><span>Тема</span><div class="seg">${[["light", "Светлая"], ["dark", "Тёмная"], ["auto", "Авто"]].map(([k, l]) => html`<button key=${k} aria-pressed=${app.prefs.theme === k} onClick=${() => app.setPref("theme", k)}>${l}</button>`)}</div></div>
      <div class="set-row"><span>Старт 30-дневного маршрута</span><input class="datein" type="date" value=${(course.plan && course.plan.start) || ""} onChange=${e => e.target.value && app.setDoc("course", c => Object.assign({}, c, { plan: Object.assign({}, (c || {}).plan, { start: e.target.value }) }))}/></div>
    </div>
    <h2 class="h2">Хранение данных</h2>
    <div class="cardx"><p class="small2">Прогресс хранится в IndexedDB этого браузера и не зависит от кэша приложения: обновления не стирают данные. ${app.persisted === true ? "Браузер подтвердил постоянное хранилище." : app.persisted === false ? "Браузер не подтвердил постоянное хранилище — при нехватке места он может очистить данные." : "Статус постоянного хранилища неизвестен."} Данные пропадут, если очистить данные сайта, удалить приложение или если ОС освободит место. Регулярно делайте резервную копию JSON в разделе «Прогресс».</p>
      <p class="small2"><${SaveBadge}/></p>
      <button class="btn btn-light" style=${{ width: "100%" }} onClick=${() => app.requestPersist()}>Запросить постоянное хранилище</button></div>
    <h2 class="h2">О сборке</h2>
    <div class="cardx"><p class="small2">Версия контента ${CONTENT_VERSION}. Блоков в сборке: ${BLOCKS.length} из ${COURSE.length}. Работает офлайн после первого открытия.</p></div>
    <button class="btn btn-bad" style=${{ width: "100%", marginTop: "8px" }} onClick=${() => setAsk(true)}>Сбросить весь прогресс</button>
    ${ask ? html`<${Sheet} onClose=${() => setAsk(false)} label="Сброс"><h2>Сбросить весь прогресс?</h2><p>Будут удалены все ответы, попытки, уроки и словари на этом устройстве. Сначала сделайте резервную копию JSON.</p>
      <div class="stack-btns"><button class="btn btn-bad" onClick=${async () => { await app.resetAll(); setAsk(false); app.nav.back(); }}>Удалить всё</button><button class="btn btn-light" onClick=${() => setAsk(false)}>Отмена</button></div></${Sheet}>` : null}
  </${Screen}>`;
}
