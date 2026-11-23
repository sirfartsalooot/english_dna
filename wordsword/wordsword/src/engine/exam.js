// Exam attempts and learning sessions. Pure functions over plain objects (persisted by the store).
import { balancedPick, makePermutation } from "./selector.js";
import { scoreQuestion, correctAnswerText, userAnswerText, isAnswered } from "./scoring.js";
import { uid, shuffle, norm, iso } from "./util.js";

const keyFn = k => typeof k === "function" ? k : (q => q[k] == null ? "_" : q[k]);

/** Build a fresh exam attempt. exposure: {qid: timesShownInThisTest}. */
export function createAttempt(def, exposure = {}, { rng = Math.random, contentVersion = "", now = Date.now() } = {}) {
  const chosen = []; const used = new Set();
  def.parts.forEach(part => {
    const pool = part.pool.filter(q => !used.has(q.id));
    balancedPick(pool, part.n, { k1: keyFn(part.k1), k2: keyFn(part.k2), exposure, rng, minEach: part.minEach }).forEach(q => { used.add(q.id); chosen.push(q); });
  });
  const items = shuffle(chosen, rng).map(q => ({ qid: q.id, v: q.v || 1, perm: makePermutation(q, rng) }));
  const snapshot = Object.fromEntries(chosen.map(q => [q.id, JSON.parse(JSON.stringify(q))]));
  return { id: uid("att"), testId: def.id, title: def.title, kind: def.kind, module: def.module || null, mode: "exam",
    contentVersion, startedAt: now, updatedAt: now, idx: 0, items, snapshot, responses: {}, timeSpent: {}, finishedAt: null };
}

export const filledCount = att => att.items.filter(it => isAnswered(att.snapshot[it.qid], att.responses[it.qid])).length;

/** Score an attempt and produce answer events. Does not mutate the input. */
export function finish(att, now = Date.now()) { const results = {}; let score = 0; const events = [];
  att.items.forEach((it, i) => { const q = att.snapshot[it.qid]; const r = att.responses[it.qid]; const res = scoreQuestion(q, r); results[it.qid] = res; if (res.correct) score++;
    events.push(makeEvent({ q, response: r, result: res, mode: "exam", attemptId: att.id, testId: att.testId, ts: now + i, timeSpentMs: att.timeSpent[it.qid] || 0, firstAttempt: true })); });
  const total = att.items.length;
  return { attempt: Object.assign({}, att, { finishedAt: now, results, score, total, pct: total ? Math.round(score / total * 100) : 0, durationMs: now - att.startedAt }), events };
}

/** One answer event with every field needed for the error map and CSV. Raw typed text is preserved. */
export function makeEvent({ q, response, result, mode, attemptId, testId, ts = Date.now(), timeSpentMs = 0, firstAttempt = true, retry = false, extra = {} }) {
  const user = userAnswerText(q, response);
  return Object.assign({
    id: uid("ev"), attemptId, testId: testId || null, questionId: q.id, questionVersion: q.v || 1, moduleId: q.module || null,
    subtopicId: q.sub || null, lessonId: q.lesson || q.sub || null, kind: q.kind || null, format: q.type, level: q.level || null, difficulty: q.diff || null,
    mode, ts, timestamp: iso(ts), userAnswer: user, userAnswerNorm: q.type === "input" ? norm(user) : "", correctAnswer: correctAnswerText(q),
    isCorrect: !!result.correct, score: Math.round((result.score || 0) * 100) / 100, timeSpentMs: Math.round(timeSpentMs),
    errorTags: result.correct ? [] : (result.tags && result.tags.length ? result.tags : ["UNCLASSIFIED"]),
    explanationId: q.id, firstAttempt: !!firstAttempt, retry: !!retry
  }, extra);
}

/** Learning session: queue of question ids; a wrong answer is re-inserted 3–5 items later (once). */
export function createLearning(scope, questions, n, qstats = {}, rng = Math.random) {
  // prefer unseen and previously failed items; random tie-break
  const w = q => { const s = qstats[q.id]; if (!s) return 3; return 1 + (s.firstOk === false ? 2 : 0) + (s.n < 2 ? 0.5 : 0); };
  const keyed = questions.map(q => ({ q, k: Math.pow(rng(), 1 / w(q)) })).sort((a, b) => b.k - a.k).slice(0, n).map(x => x.q);
  return { id: "learn:" + scope, scope, mode: "learning", queue: keyed.map(q => q.id), perms: Object.fromEntries(keyed.map(q => [q.id, makePermutation(q, rng)])),
    pos: 0, requeued: [], answers: {}, correct: 0, wrong: 0, startedAt: Date.now(), done: false, response: null, checked: false };
}
export function requeue(sess, qid, rng = Math.random) {
  if (sess.requeued.includes(qid)) return sess;
  const at = Math.min(sess.queue.length, sess.pos + 3 + Math.floor(rng() * 3));
  const queue = sess.queue.slice(); queue.splice(at, 0, qid);
  return Object.assign({}, sess, { queue, requeued: sess.requeued.concat(qid) });
}
