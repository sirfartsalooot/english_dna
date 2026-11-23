import { test } from "node:test";
import assert from "node:assert/strict";
import { scoreQuestion, branchMax, isAnswered, classifyTyped } from "../src/engine/scoring.js";
import { createAttempt, finish, createLearning, requeue, makeEvent } from "../src/engine/exam.js";
import { overlap } from "../src/engine/selector.js";
import { rngFrom, norm } from "../src/engine/util.js";
import { toCSV, cell, answerEventsCSV, testAttemptsCSV, weeklySummaryCSV, errorMapCSV, validateBackup, makeBackup, BOM } from "../src/engine/csv.js";
import { errorMatrix, topIssues, blockMastery, firstAnswerStats, streak } from "../src/engine/analytics.js";
import { variants } from "../src/content/dsl.js";
import * as C from "../src/content/index.js";
import { validateContent } from "../src/engine/validate.js";

const byType = t => C.CASES.find(q => q.type === t);

test("content validator: no errors on the shipped bank", () => {
  const r = validateContent(C);
  assert.deepEqual(r.errors, []);
});

test("scoring: case single — correct option and annotated distractor tag", () => {
  const q = byType("single");
  const ok = q.options.findIndex(o => o.ok), bad = q.options.findIndex(o => !o.ok);
  assert.equal(scoreQuestion(q, ok).correct, true);
  const r = scoreQuestion(q, bad); assert.equal(r.correct, false); assert.deepEqual(r.tags, [q.options[bad].tag]);
  assert.equal(scoreQuestion(q, null).correct, false);
});

test("scoring: case multi — full set only, no 'select all' credit", () => {
  const q = byType("multi"); const good = q.options.map((o, i) => o.ok ? i : -1).filter(i => i >= 0);
  assert.equal(scoreQuestion(q, good).correct, true);
  const all = q.options.map((_, i) => i); const r = scoreQuestion(q, all);
  assert.equal(r.correct, false); assert.ok(r.score < 1);
  const partial = scoreQuestion(q, good.slice(0, 1)); assert.equal(partial.correct, false); assert.ok(partial.score > 0 && partial.score < 1);
  assert.equal(isAnswered(q, good.slice(0, 1)), false); // exactly N must be chosen
});

test("scoring: matching — every mapping checked", () => {
  const q = byType("match"); const resp = Object.fromEntries(q.items.map((it, i) => [i, it.cat]));
  assert.equal(scoreQuestion(q, resp).correct, true);
  const wrong = Object.assign({}, resp, { 0: (q.items[0].cat + 1) % q.cats.length });
  const r = scoreQuestion(q, wrong); assert.equal(r.correct, false); assert.equal(r.detail.wrong.length, 1);
});

test("scoring: ordering — canonical order, alternatives, partial prefix", () => {
  const q = byType("order"); const idx = q.tokens.map((_, i) => i);
  assert.equal(scoreQuestion(q, idx).correct, true);
  const rev = idx.slice().reverse(); assert.equal(scoreQuestion(q, rev).correct, false);
  const alt = C.Q_BY_ID["con-021"]; // has an alternative order
  const altTokens = ["we", "would", "have", "caught", "the", "flight", "If", "we", "had", "left", "earlier,"];
  const used = new Set(); const perm = altTokens.map(t => { const i = alt.tokens.findIndex((x, j) => x === t && !used.has(j)); used.add(i); return i; });
  assert.equal(scoreQuestion(alt, perm).correct, true);
});

test("scoring: hotspot — segment + correction, classification of misses", () => {
  const q = byType("fix"); const bad = q.segments.findIndex(s => s.bad);
  assert.equal(scoreQuestion(q, { seg: bad, text: q.segments[bad].fix[0] }).correct, true);
  const wrongSeg = q.segments.findIndex(s => !s.bad);
  assert.equal(scoreQuestion(q, { seg: wrongSeg, text: "x" }).correct, false);
  const half = scoreQuestion(q, { seg: bad, text: "zzz" }); assert.equal(half.correct, false); assert.equal(half.score, 0.5);
});

test("scoring: branching — trajectory scored against best path, real branching", () => {
  const q = C.Q_BY_ID["cb-01"]; assert.equal(branchMax(q), 6);
  const best = [{ node: "a", choice: 0 }, { node: "b1", choice: 0 }, { node: "c", choice: 0 }];
  assert.equal(scoreQuestion(q, best).correct, true);
  const detour = [{ node: "a", choice: 2 }, { node: "b2", choice: 0 }, { node: "c", choice: 1 }];
  const r = scoreQuestion(q, detour); assert.equal(r.correct, false); assert.ok(r.tags.includes("TIMELINE") && r.tags.includes("FORM"));
  assert.equal(isAnswered(q, best.slice(0, 2)), false); assert.equal(isAnswered(q, best), true);
  assert.notEqual(q.nodes.a.choices[0].next, q.nodes.a.choices[2].next); // the next screen depends on the answer
});

test("scoring: typed answers — contractions, spelling slip, rule-based tags, raw text kept", () => {
  assert.ok(variants("had not finished").includes("hadn't finished"));
  const q = C.Q_BY_ID["ten-012"]; // didn't reply
  assert.equal(scoreQuestion(q, "did not reply").correct, true);
  assert.equal(scoreQuestion(q, "Didn't reply.").correct, true);
  assert.deepEqual(scoreQuestion(q, "hasn't replied").tags, ["TIMELINE"]);
  assert.deepEqual(classifyTyped("recieve", ["receive"]).tags, ["SPELLING"]);
  assert.deepEqual(classifyTyped("", ["receive"]).tags, ["UNCLASSIFIED"]);
  const ev = makeEvent({ q, response: "  Hasn't Replied ", result: scoreQuestion(q, "  Hasn't Replied "), mode: "exam", attemptId: "a" });
  assert.equal(ev.userAnswer, "  Hasn't Replied "); assert.equal(ev.userAnswerNorm, "hasn't replied");
});

test("exam: no duplicate questionIds, blueprint size and balance", () => {
  for (const def of C.TESTS) {
    const att = createAttempt(def, {}, { rng: rngFrom(7) });
    const ids = att.items.map(i => i.qid);
    assert.equal(new Set(ids).size, ids.length, def.id + " has duplicates");
    assert.equal(ids.length, def.size, def.id + " size");
  }
  const caseAtt = createAttempt(C.TEST_BY_ID.cases, {}, { rng: rngFrom(3) });
  const types = new Set(caseAtt.items.map(i => caseAtt.snapshot[i.qid].type)); assert.equal(types.size, 6, "all 6 case formats covered");
  assert.ok(new Set(caseAtt.items.map(i => caseAtt.snapshot[i.qid].module)).size >= 8, "case exam covers at least 8 thematic blocks");
  assert.equal(C.BLOCKS.length, 18, "all 18 course blocks are present");
  assert.ok(C.CASES.length >= 180 && C.CASES.length <= 240, "case bank 180–240");
  ["single", "multi", "match", "order", "fix", "branch"].forEach(t => assert.ok(C.CASES.filter(c => c.type === t).length >= 20, t + " ≥ 20"));
  const th = createAttempt(C.TEST_BY_ID.theory, {}, { rng: rngFrom(5) });
  assert.equal(new Set(th.items.map(i => th.snapshot[i.qid].module)).size, C.BLOCKS.length, "theory check covers every available block");
});

test("exam: consecutive attempts differ substantially (fresh questions first)", () => {
  for (const id of ["block:tenses", "block:modals", "block:conditionals", "block:irregular", "theory", "cases"]) {
    const def = C.TEST_BY_ID[id]; const exp = {};
    const a1 = createAttempt(def, exp, { rng: rngFrom(11) }); a1.items.forEach(i => { exp[i.qid] = (exp[i.qid] || 0) + 1; });
    const a2 = createAttempt(def, exp, { rng: rngFrom(12) });
    const o = overlap(a1.items.map(i => i.qid), a2.items.map(i => i.qid));
    assert.ok(o <= 0.1, `${id}: overlap ${o}`);
  }
});

test("exam: finish() scores from the snapshot and emits one event per question", () => {
  const att = createAttempt(C.TEST_BY_ID["block:tenses"], {}, { rng: rngFrom(1) });
  att.items.forEach(it => { const q = att.snapshot[it.qid]; if (q.type === "single") att.responses[it.qid] = q.options.findIndex(o => o.ok); });
  const singles = att.items.filter(it => att.snapshot[it.qid].type === "single").length;
  const { attempt, events } = finish(att, 1_700_000_000_000);
  assert.equal(events.length, att.items.length); assert.equal(attempt.score, singles);
  assert.ok(events.every(e => e.mode === "exam" && e.attemptId === att.id && e.questionVersion >= 1));
});

test("learning: wrong answers are requeued once, 3–5 items later", () => {
  const qs = C.BLOCK_BY_ID.tenses.questions.slice(0, 20);
  let s = createLearning("t", qs, 10, {}, rngFrom(2)); const first = s.queue[0];
  s = requeue(s, first, rngFrom(3)); const pos = s.queue.indexOf(first, 1);
  assert.ok(pos >= 3 && pos <= 5); assert.equal(requeue(s, first).queue.length, s.queue.length);
});

test("CSV: BOM, quotes, commas, newlines, apostrophes, Cyrillic, formula guard", () => {
  const csv = toCSV(["a", "b"], [{ a: 'He said "hi", then left', b: "line1\nline2" }, { a: "don't", b: "Привет, мир" }, { a: "=SUM(A1)", b: ["x", "y"] }]);
  assert.ok(csv.startsWith(BOM));
  assert.ok(csv.includes('"He said ""hi"", then left"')); assert.ok(csv.includes('"line1\nline2"'));
  assert.ok(csv.includes("don't")); assert.ok(csv.includes('"Привет, мир"')); assert.ok(csv.includes("'=SUM(A1)")); assert.equal(cell(["x", "y"]), '"x;y"');
});

test("CSV: four exports are produced from real events and match analytics", () => {
  const att = createAttempt(C.TEST_BY_ID["block:modals"], {}, { rng: rngFrom(9) });
  att.items.forEach(it => { const q = att.snapshot[it.qid]; att.responses[it.qid] = q.type === "single" ? q.options.findIndex(o => !o.ok) : null; });
  const { attempt, events } = finish(att, Date.UTC(2026, 10, 20, 10));
  const ans = answerEventsCSV(events); assert.equal(ans.trim().split("\r\n").length, events.length + 1);
  assert.ok(testAttemptsCSV([attempt]).includes(attempt.id));
  const weekly = weeklySummaryCSV(events, [attempt]); assert.ok(weekly.includes("modals"));
  const map = errorMapCSV(events, Date.UTC(2026, 10, 20, 12));
  const matrix = errorMatrix(events); const wrongTotal = Object.values(matrix[0].tags).reduce((a, b) => a + b, 0);
  const mapCount = map.trim().split("\r\n").slice(1).map(l => +l.split(",")[4]).reduce((a, b) => a + b, 0);
  assert.equal(mapCount, wrongTotal, "error_map.csv totals equal the Dashboard error matrix");
  assert.ok(topIssues(events).length > 0);
  assert.equal(answerEventsCSV([]).trim().split("\r\n").length, 1, "empty export has only headers");
});

test("JSON backup: validation rejects broken files and accepts real dumps", () => {
  assert.equal(validateBackup(null).ok, false);
  assert.equal(validateBackup({ app: "other", schema: 1, data: {} }).ok, false);
  const ok = makeBackup({ kv: { prefs: {} }, attempts: [{ id: "a", testId: "t" }], events: [{ id: "e", ts: 1, questionId: "q" }], sessions: [] }, 1, "v");
  const r = validateBackup(JSON.parse(JSON.stringify(ok))); assert.equal(r.ok, true); assert.equal(r.summary.events, 1);
  assert.equal(validateBackup({ app: "wordsword", schema: 1, data: { kv: {}, attempts: [], events: [{ id: "x" }], sessions: [] } }).ok, false);
});

test("mastery: re-answering the same question cannot inflate accuracy", () => {
  const b = C.BLOCK_BY_ID.tenses; const q = b.questions.find(x => x.kind === "practice");
  const qstats = { [q.id]: { n: 25, ok: 24, firstOk: false, last: Date.now() } };
  const m = blockMastery(b, { qstats, attempts: [], course: {} });
  assert.equal(m.practiceAcc, 0, "first answer was wrong → 0% regardless of 24 later correct answers");
  const evs = [{ firstAttempt: true, isCorrect: false, timeSpentMs: 1000 }, { firstAttempt: false, retry: true, isCorrect: true, timeSpentMs: 500 }];
  assert.equal(firstAnswerStats(evs).accuracy, 0);
});

test("streak counts consecutive active days only", () => {
  const day = 864e5, now = Date.UTC(2026, 10, 22, 12);
  assert.equal(streak([{ ts: now }, { ts: now - day }, { ts: now - 3 * day }], now), 2);
});

test("norm keeps meaning-relevant text and strips punctuation/case", () => {
  assert.equal(norm("  Drag-and-Drop. "), "drag and drop"); assert.equal(norm("It’s"), "it's");
});
