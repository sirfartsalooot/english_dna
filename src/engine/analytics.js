// All analytics are computed from stored answer events and attempts — nothing synthetic.
import { isoWeek, dayKey, groupBy, pct } from "./util.js";
import { TAG_KEYS } from "./scoring.js";

/** Filter events: {from, to (ms), mode:'exam'|'learning'|'all', level:'B2'|'C1'|'all', module} */
export function filterEvents(events, f = {}) {
  return events.filter(e => (f.from == null || e.ts >= f.from) && (f.to == null || e.ts <= f.to) &&
    (!f.mode || f.mode === "all" || e.mode === f.mode) && (!f.level || f.level === "all" || e.level === f.level) &&
    (!f.module || e.moduleId === f.module));
}

/** Error map module × reason. Each wrong answer contributes to every tag it carries (primary + secondary). */
export function errorMatrix(events) {
  const rows = {};
  events.forEach(e => {
    const m = e.moduleId || "—"; const r = rows[m] = rows[m] || { module: m, total: 0, wrong: 0, tags: {} };
    r.total++; if (!e.isCorrect) { r.wrong++; (e.errorTags || ["UNCLASSIFIED"]).forEach(t => { r.tags[t] = (r.tags[t] || 0) + 1; }); }
  });
  return Object.values(rows).sort((a, b) => b.wrong - a.wrong);
}

/** Top systemic problems: (module, subtopic, tag) combinations by count, with the events that led to them. */
export function topIssues(events, n = 5) {
  const m = {}; const totals = {};
  events.forEach(e => { const k = (e.moduleId || "—") + "|" + (e.subtopicId || "—"); totals[k] = (totals[k] || 0) + 1; });
  events.filter(e => !e.isCorrect).forEach(e => (e.errorTags || ["UNCLASSIFIED"]).forEach(t => {
    const k = (e.moduleId || "—") + "|" + (e.subtopicId || "—") + "|" + t;
    const it = m[k] = m[k] || { module: e.moduleId, sub: e.subtopicId, tag: t, count: 0, events: [] }; it.count++; it.events.push(e);
  }));
  return Object.values(m).filter(x => x.tag !== "UNCLASSIFIED" || x.count >= 2)
    .map(x => Object.assign(x, { total: totals[(x.module || "—") + "|" + (x.sub || "—")], rate: x.count / totals[(x.module || "—") + "|" + (x.sub || "—")] }))
    .sort((a, b) => b.count - a.count || b.rate - a.rate).slice(0, n);
}

/** Weekly dynamics: answered, correct, accuracy, errors per tag, split by mode. */
export function weekly(events) {
  const g = groupBy(events, e => isoWeek(e.ts));
  return Object.keys(g).sort().map(w => {
    const es = g[w]; const wrong = es.filter(e => !e.isCorrect); const tags = {};
    wrong.forEach(e => (e.errorTags || []).forEach(t => { tags[t] = (tags[t] || 0) + 1; }));
    const ex = es.filter(e => e.mode === "exam"), le = es.filter(e => e.mode === "learning");
    return { week: w, answered: es.length, correct: es.length - wrong.length, accuracy: pct(es.length - wrong.length, es.length), errors: wrong.length, tags,
      exam: ex.length, examAcc: pct(ex.filter(e => e.isCorrect).length, ex.length), learning: le.length, learningAcc: pct(le.filter(e => e.isCorrect).length, le.length),
      timeMs: es.reduce((a, e) => a + (e.timeSpentMs || 0), 0) };
  });
}

/** Breakdown by any key, e.g. level or mode. */
export function breakdown(events, key) {
  const g = groupBy(events, e => e[key] || "—");
  return Object.keys(g).map(k => { const es = g[k]; const ok = es.filter(e => e.isCorrect).length; return { key: k, total: es.length, correct: ok, accuracy: pct(ok, es.length) }; });
}

/** First-answer accuracy and speed: only firstAttempt events, so repeated drilling can't inflate the figure. */
export function firstAnswerStats(events) {
  const first = events.filter(e => e.firstAttempt && !e.retry);
  const ok = first.filter(e => e.isCorrect).length;
  const times = first.map(e => e.timeSpentMs).filter(t => t > 0).sort((a, b) => a - b);
  const median = times.length ? times[Math.floor(times.length / 2)] : 0;
  return { n: first.length, accuracy: pct(ok, first.length), medianMs: median, retries: events.filter(e => e.retry).length };
}

/** Consecutive days with at least one answer, ending today or yesterday. */
export function streak(events, now = Date.now()) {
  const days = new Set(events.map(e => dayKey(e.ts))); let n = 0; let d = new Date(now);
  if (!days.has(dayKey(d.getTime()))) d.setDate(d.getDate() - 1);
  while (days.has(dayKey(d.getTime()))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/** Strong / weak subtopics (needs ≥ minN answers). */
export function topicStrength(events, minN = 4) {
  const g = groupBy(events, e => (e.moduleId || "—") + "|" + (e.subtopicId || "—"));
  return Object.entries(g).filter(([, es]) => es.length >= minN).map(([k, es]) => { const [module, sub] = k.split("|"); return { module, sub, n: es.length, accuracy: pct(es.filter(e => e.isCorrect).length, es.length) }; })
    .sort((a, b) => a.accuracy - b.accuracy);
}

/** Trend of an error tag inside a module: last week vs previous week count. */
export function tagTrend(events, module, tag, now = Date.now()) {
  const wk = isoWeek(now); const prev = isoWeek(now - 7 * 864e5);
  const c = w => events.filter(e => !e.isCorrect && e.moduleId === module && isoWeek(e.ts) === w && (e.errorTags || []).includes(tag)).length;
  const a = c(wk), b = c(prev); return a > b ? "up" : a < b ? "down" : "flat";
}

/**
 * Mastery for a course block.
 * - theory/practice accuracy counts only the FIRST answer per question (qstats.firstOk) → no inflation by re-answering;
 * - exam component uses the latest finished block test.
 */
export function blockMastery(block, { course = {}, qstats = {}, attempts = [], now = Date.now() }) {
  const lessons = block.lessons.length; const done = block.lessons.filter(l => course.lessons && course.lessons[l.id] && course.lessons[l.id].doneAt).length;
  const qs = block.questions; const th = qs.filter(q => q.kind === "theory"), pr = qs.filter(q => q.kind === "practice");
  const seen = list => list.filter(q => qstats[q.id]); const acc = list => { const s = seen(list); return s.length ? pct(s.filter(q => qstats[q.id].firstOk).length, s.length) : null; };
  const tests = attempts.filter(a => a.testId === "block:" + block.id && a.finishedAt).sort((a, b) => b.finishedAt - a.finishedAt);
  const last = tests[0] || null; const best = tests.reduce((m, a) => Math.max(m, a.pct), 0);
  const theoryAcc = acc(th), practiceAcc = acc(pr); const practiceSeen = seen(pr).length; const coverage = pct(practiceSeen, pr.length);
  const lastActivity = Math.max(0, ...qs.map(q => (qstats[q.id] && qstats[q.id].last) || 0), last ? last.finishedAt : 0, ...block.lessons.map(l => (course.lessons && course.lessons[l.id] && course.lessons[l.id].doneAt) || 0));
  const score = Math.round(0.15 * pct(done, lessons) + 0.15 * (theoryAcc || 0) + 0.25 * ((practiceAcc || 0) * Math.min(1, coverage / 50)) + 0.45 * (last ? last.pct : 0));
  let status = "Не начато";
  if (lastActivity) status = "Изучаю";
  if (done / lessons >= 0.8 && (practiceAcc || 0) >= 70 && practiceSeen >= 20) status = "Готов к проверке";
  if (last && last.pct >= 85) status = "Закреплено";
  if ((last && last.pct < 70) || (status === "Закреплено" && now - lastActivity > 21 * 864e5)) status = "Нужно повторить";
  return { lessons, done, theoryAcc, practiceAcc, coverage, practiceSeen, practiceTotal: pr.length, lastExam: last ? last.pct : null, lastExamAt: last ? last.finishedAt : null, bestExam: tests.length ? best : null, tests: tests.length, score, status, lastActivity };
}

/** Vocabulary statistics for a dictionary from trainer state docs and events. */
export function dictStats(dict, setDocs, fullDoc, events) {
  const ids = new Set(dict.words.map(w => w.id)); let learned = new Set(), c = 0, w = 0; const stats = {};
  dict.sets.forEach(s => { const d = setDocs[s.id]; if (!d) return;
    Object.values(d.levels || {}).forEach(L => (L.learned || []).forEach(id => learned.add(id)));
    Object.entries(d.stats || {}).forEach(([id, st]) => { stats[id] = st; c += st.c; w += st.w; }); });
  const consolidated = Object.values(stats).filter(st => st.c - st.w >= 3).length;
  const ev = events.filter(e => ids.has(e.questionId) || (e.moduleId === "vocab-" + dict.id));
  const lastTs = ev.reduce((m, e) => Math.max(m, e.ts), 0);
  const finals = dict.sets.map(s => { const h = (setDocs[s.id] && setDocs[s.id].test && setDocs[s.id].test.history) || []; return { set: s.id, size: s.words.length, best: h.length ? Math.max(...h.map(x => x.score)) : null, attempts: h.length, perfect: h.some(x => x.score === x.total) }; });
  const fullH = (fullDoc && fullDoc.test && fullDoc.test.history) || [];
  const times = ev.map(e => e.timeSpentMs).filter(Boolean).sort((a, b) => a - b);
  return { total: dict.words.length, learned: learned.size, consolidated, accuracy: pct(c, c + w), answers: c + w, lastTs, finals,
    fullBest: fullH.length ? Math.max(...fullH.map(x => x.score)) : null, fullAttempts: fullH.length, medianMs: times.length ? times[Math.floor(times.length / 2)] : 0 };
}

export { TAG_KEYS };
