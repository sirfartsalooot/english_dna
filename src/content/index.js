import tenses from "./blocks/b01-tenses.js";
import irregular from "./blocks/b02-irregular.js";
import modals from "./blocks/b03-modals.js";
import conditionals from "./blocks/b04-conditionals.js";
import { passive, gerund } from "./blocks/b05-06.js";
import { articles, prepositions } from "./blocks/b07-08.js";
import { reported, relative } from "./blocks/b09-10.js";
import { structure, linking } from "./blocks/b11-12.js";
import { phrasal, collocations } from "./blocks/b13-14.js";
import { wordform, quantifiers } from "./blocks/b15-16.js";
import { advanced, register } from "./blocks/b17-18.js";
import { CASES_A } from "./cases/cases-a.js";
import { CASES_B } from "./cases/cases-b.js";
import { CASES_C } from "./cases/cases-c.js";
import { CASES_D } from "./cases/cases-d.js";
import { CASES_E } from "./cases/cases-e.js";
import { GENERAL } from "./vocab/general200.js";
import { BUSINESS } from "./vocab/business100.js";
import { IRREGULAR } from "./vocab/irregular.js";
import { AGENTS } from "./vocab/agents123.js";

/** Bumped whenever question content changes. Attempts store snapshots, so history stays reproducible. */
export const CONTENT_VERSION = "2026.11.23-v2";

/** The 18 course blocks in order. `ready:false` blocks are listed in the course map but have no content yet. */
export const COURSE = [
  { n: 1, id: "tenses", title: "Времена и aspect" }, { n: 2, id: "irregular", title: "Неправильные глаголы" },
  { n: 3, id: "modals", title: "Модальные глаголы" }, { n: 4, id: "conditionals", title: "Conditionals" },
  { n: 5, id: "passive", title: "Passive Voice" }, { n: 6, id: "gerund", title: "Gerund / Infinitive" },
  { n: 7, id: "articles", title: "Articles / Determiners" }, { n: 8, id: "prepositions", title: "Prepositions" },
  { n: 9, id: "reported", title: "Reported Speech" }, { n: 10, id: "relative", title: "Relative Clauses" },
  { n: 11, id: "structure", title: "Sentence Structure" }, { n: 12, id: "linking", title: "Linking Words" },
  { n: 13, id: "phrasal", title: "Phrasal Verbs" }, { n: 14, id: "collocations", title: "Collocations" },
  { n: 15, id: "wordform", title: "Word Formation" }, { n: 16, id: "quantifiers", title: "Quantifiers / Comparison" },
  { n: 17, id: "advanced", title: "Advanced Grammar" }, { n: 18, id: "register", title: "Register / Nuance" }
];
export const BLOCKS = [tenses, irregular, modals, conditionals, passive, gerund, articles, prepositions, reported, relative,
  structure, linking, phrasal, collocations, wordform, quantifiers, advanced, register];
export const BLOCK_BY_ID = Object.fromEntries(BLOCKS.map(b => [b.id, b]));
export const CASES = CASES_A.concat(CASES_B, CASES_C, CASES_D, CASES_E);

export const QUESTIONS = BLOCKS.flatMap(b => b.questions).concat(CASES);
export const Q_BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
export const LESSON_BY_ID = Object.fromEntries(BLOCKS.flatMap(b => b.lessons.map(l => [l.id, Object.assign({ module: b.id }, l)])));

export const CASE_FORMATS = [
  { type: "single", title: "Case-Based Single Choice" }, { type: "multi", title: "Case-Based Multiple Choice" },
  { type: "match", title: "Matching / Categorization" }, { type: "order", title: "Ordering / Sequencing" },
  { type: "fix", title: "Error Debugging / Hotspot" }, { type: "branch", title: "Branching Scenario" }
];

/** Dictionaries. Each is split into sets for the original 6-level trainer (sets of 50 → 50/50 final). */
function sets(prefix, words, size = 50) { const out = []; for (let i = 0; i < words.length; i += size) out.push({ id: `${prefix}-${out.length + 1}`, from: i + 1, to: Math.min(words.length, i + size), words: words.slice(i, i + size) }); return out; }
export const DICTS = [
  { id: "general", title: "General 200", short: "200 частых глаголов", words: GENERAL, sets: sets("general", GENERAL), note: "Список составлен вручную (curated high-frequency), а не выгружен из частотного корпуса." },
  { id: "business", title: "Business 100", short: "100 деловых глаголов", words: BUSINESS, sets: sets("business", BUSINESS) },
  { id: "irregular", title: "Irregular 120", short: "120 неправильных глаголов", words: IRREGULAR, sets: sets("irr", IRREGULAR) },
  { id: "agents", title: "AI Agents 123", short: "Исходный словарь из vocab-app", words: AGENTS.words, sets: [{ id: "agents", from: 1, to: AGENTS.words.length, words: AGENTS.words }], legacyKey: "cvt:" + AGENTS.id + ":v1" }
];
export const DICT_BY_ID = Object.fromEntries(DICTS.map(d => [d.id, d]));
export const SET_BY_ID = Object.fromEntries(DICTS.flatMap(d => d.sets.map(s => [s.id, Object.assign({ dict: d.id }, s)])));

/** Test blueprints: every control test draws a fresh balanced subset from a bank ≥ 2× its length. */
export function testDefs() {
  const defs = [];
  BLOCKS.forEach(b => {
    const bp = b.blueprint;
    defs.push({ id: "block:" + b.id, kind: "block", module: b.id, title: `Контрольная: ${b.title}`, size: bp.size,
      parts: [
        { n: bp.theory, pool: b.questions.filter(q => q.kind === "theory"), k1: "sub", k2: "diff" },
        ...(bp.drills ? [{ n: bp.drills, pool: b.questions.filter(q => q.drill), k1: "drill", k2: "verb" }] : []),
        { n: bp.size - bp.theory - (bp.drills || 0), pool: b.questions.filter(q => q.kind === "practice" && !q.drill), k1: "sub", k2: "type" }
      ] });
  });
  const theory = BLOCKS.flatMap(b => b.questions.filter(q => q.kind === "theory"));
  const tSize = Math.min(60, Math.max(40, Math.floor(theory.length / 2)));
  defs.push({ id: "theory", kind: "theory", title: "Theory Check: итоговый тест по теории", size: tSize,
    parts: [{ n: tSize, pool: theory, k1: "module", k2: "sub", minEach: 3 }] });
  const cSize = Math.min(40, Math.floor(CASES.length / 2));
  defs.push({ id: "cases", kind: "cases", title: "Контрольная Case Lab", size: cSize,
    parts: [{ n: cSize, pool: CASES, k1: "type", k2: "module", minEach: 3 }] });
  const practice = BLOCKS.flatMap(b => b.questions.filter(q => q.kind === "practice" && !q.drill));
  defs.push({ id: "mixed", kind: "mixed", title: "Смешанный экзамен B2 → C1", size: 40,
    parts: [{ n: 8, pool: theory, k1: "module", k2: "sub" }, { n: 22, pool: practice, k1: "module", k2: "sub" }, { n: 10, pool: CASES, k1: "type", k2: "module" }] });
  return defs;
}
export const TESTS = testDefs();
export const TEST_BY_ID = Object.fromEntries(TESTS.map(t => [t.id, t]));
