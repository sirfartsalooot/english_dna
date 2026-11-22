// CSV export built ONLY from stored events/attempts. UTF-8 with BOM (Excel), RFC 4180 escaping, ISO-8601 dates.
import { isoWeek, weekStart, groupBy, pct, iso } from "./util.js";
import { tagTrend } from "./analytics.js";

export const BOM = "\uFEFF";
export function cell(v) {
  if (v == null) return "";
  let s = Array.isArray(v) ? v.join(";") : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // neutralise spreadsheet formula injection
  return /[",\r\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
export function toCSV(headers, rows) { return BOM + [headers.map(cell).join(",")].concat(rows.map(r => headers.map(h => cell(r[h])).join(","))).join("\r\n") + "\r\n"; }

export const ANSWER_HEADERS = ["eventId", "attemptId", "testId", "timestamp", "week", "mode", "moduleId", "subtopicId", "questionId", "questionVersion", "kind", "format", "level", "difficulty",
  "userAnswer", "userAnswerNorm", "correctAnswer", "isCorrect", "score", "timeSpentMs", "errorTags", "primaryErrorTag", "explanationId", "firstAttempt", "retry"];
export function answerEventsCSV(events) {
  return toCSV(ANSWER_HEADERS, events.slice().sort((a, b) => a.ts - b.ts).map(e => ({
    eventId: e.id, attemptId: e.attemptId, testId: e.testId, timestamp: e.timestamp || iso(e.ts), week: isoWeek(e.ts), mode: e.mode, moduleId: e.moduleId, subtopicId: e.subtopicId,
    questionId: e.questionId, questionVersion: e.questionVersion, kind: e.kind, format: e.format, level: e.level, difficulty: e.difficulty, userAnswer: e.userAnswer, userAnswerNorm: e.userAnswerNorm,
    correctAnswer: e.correctAnswer, isCorrect: e.isCorrect ? 1 : 0, score: e.score, timeSpentMs: e.timeSpentMs, errorTags: e.errorTags, primaryErrorTag: (e.errorTags || [])[0] || "",
    explanationId: e.explanationId, firstAttempt: e.firstAttempt ? 1 : 0, retry: e.retry ? 1 : 0 })));
}

export const ATTEMPT_HEADERS = ["attemptId", "testId", "title", "mode", "startedAt", "finishedAt", "score", "total", "percentage", "durationSec", "questionBankVersion", "questionIds"];
export function testAttemptsCSV(attempts) {
  return toCSV(ATTEMPT_HEADERS, attempts.filter(a => a.finishedAt).sort((a, b) => a.finishedAt - b.finishedAt).map(a => ({
    attemptId: a.id, testId: a.testId, title: a.title, mode: a.mode || "exam", startedAt: iso(a.startedAt), finishedAt: iso(a.finishedAt), score: a.score, total: a.total,
    percentage: a.pct, durationSec: Math.round((a.durationMs || 0) / 1000), questionBankVersion: a.contentVersion || "", questionIds: (a.items || []).map(i => i.qid + "@v" + i.v) })));
}

export const WEEKLY_HEADERS = ["weekStart", "week", "moduleId", "attempts", "answered", "correct", "accuracy", "learningAnswered", "examAnswered", "timeSpentMin", "mastered", "weakTags"];
/** One row per week × module. `masteredByModule` comes from the same mastery calculation shown in the Dashboard. */
export function weeklySummaryCSV(events, attempts, masteredByModule = {}) {
  const g = groupBy(events, e => isoWeek(e.ts) + "|" + (e.moduleId || "—"));
  const rows = Object.keys(g).sort().map(k => {
    const es = g[k]; const [week, moduleId] = k.split("|"); const wrong = es.filter(e => !e.isCorrect); const tags = {};
    wrong.forEach(e => (e.errorTags || []).forEach(t => { tags[t] = (tags[t] || 0) + 1; }));
    const atts = new Set(es.map(e => e.attemptId)).size;
    return { weekStart: weekStart(es[0].ts), week, moduleId, attempts: atts, answered: es.length, correct: es.length - wrong.length, accuracy: pct(es.length - wrong.length, es.length),
      learningAnswered: es.filter(e => e.mode === "learning").length, examAnswered: es.filter(e => e.mode === "exam").length,
      timeSpentMin: Math.round(es.reduce((a, e) => a + (e.timeSpentMs || 0), 0) / 60000), mastered: masteredByModule[moduleId] || "",
      weakTags: Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([t, n]) => t + ":" + n) };
  });
  return toCSV(WEEKLY_HEADERS, rows);
}

export const ERRORMAP_HEADERS = ["week", "moduleId", "subtopicId", "errorTag", "count", "total", "errorRate", "trend"];
export function errorMapCSV(events, now = Date.now()) {
  const totals = groupBy(events, e => isoWeek(e.ts) + "|" + (e.moduleId || "—") + "|" + (e.subtopicId || "—"));
  const rows = [];
  Object.keys(totals).sort().forEach(k => {
    const es = totals[k]; const [week, moduleId, subtopicId] = k.split("|"); const counts = {};
    es.filter(e => !e.isCorrect).forEach(e => (e.errorTags || ["UNCLASSIFIED"]).forEach(t => { counts[t] = (counts[t] || 0) + 1; }));
    Object.entries(counts).forEach(([t, c]) => rows.push({ week, moduleId, subtopicId, errorTag: t, count: c, total: es.length, errorRate: (c / es.length).toFixed(3), trend: tagTrend(events, moduleId, t, now) }));
  });
  return toCSV(ERRORMAP_HEADERS, rows);
}

/** Validate a JSON backup before import. Returns {ok, errors, summary}. */
export function validateBackup(obj) {
  const errors = [];
  if (!obj || typeof obj !== "object") return { ok: false, errors: ["Файл не является JSON-объектом."] };
  if (obj.app !== "wordsword") errors.push("Это не резервная копия Wordsword.");
  if (typeof obj.schema !== "number") errors.push("Нет версии схемы.");
  const d = obj.data || {};
  if (typeof d.kv !== "object" || Array.isArray(d.kv)) errors.push("Раздел kv повреждён.");
  ["attempts", "events", "sessions"].forEach(s => { if (!Array.isArray(d[s])) errors.push(`Раздел ${s} должен быть массивом.`); });
  if (Array.isArray(d.events)) { const bad = d.events.filter(e => !e || !e.id || typeof e.ts !== "number" || !e.questionId).length; if (bad) errors.push(`${bad} событий без обязательных полей (id, ts, questionId).`); }
  if (Array.isArray(d.attempts)) { const bad = d.attempts.filter(a => !a || !a.id || !a.testId).length; if (bad) errors.push(`${bad} попыток без id/testId.`); }
  return { ok: !errors.length, errors, summary: errors.length ? null : { events: d.events.length, attempts: d.attempts.length, docs: Object.keys(d.kv).length, exportedAt: obj.exportedAt } };
}
export function makeBackup(dump, schema, contentVersion) { return { app: "wordsword", schema, contentVersion, exportedAt: new Date().toISOString(), data: dump }; }
