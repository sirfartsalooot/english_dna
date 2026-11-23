// Compact, readable authoring helpers. They only shape static data — nothing is generated at
// exam time. Every question gets a stable id written by the author; the validator checks it.

const CONTR = [
  ["have not", "haven't"], ["has not", "hasn't"], ["had not", "hadn't"], ["do not", "don't"], ["does not", "doesn't"],
  ["did not", "didn't"], ["will not", "won't"], ["would not", "wouldn't"], ["is not", "isn't"], ["are not", "aren't"],
  ["was not", "wasn't"], ["were not", "weren't"], ["cannot", "can't"], ["could not", "couldn't"], ["should not", "shouldn't"],
  ["must not", "mustn't"], ["need not", "needn't"], ["might not", "mightn't"], ["shall not", "shan't"],
  ["I am", "I'm"], ["I have", "I've"], ["I will", "I'll"], ["I would", "I'd"], ["I had", "I'd"],
  ["you are", "you're"], ["you have", "you've"], ["you will", "you'll"], ["you would", "you'd"], ["you had", "you'd"],
  ["we are", "we're"], ["we have", "we've"], ["we will", "we'll"], ["we would", "we'd"], ["we had", "we'd"],
  ["they are", "they're"], ["they have", "they've"], ["they will", "they'll"], ["they would", "they'd"], ["they had", "they'd"],
  ["he is", "he's"], ["he has", "he's"], ["he will", "he'll"], ["he would", "he'd"], ["he had", "he'd"],
  ["she is", "she's"], ["she has", "she's"], ["she will", "she'll"], ["she would", "she'd"], ["she had", "she'd"],
  ["it is", "it's"], ["it has", "it's"], ["it will", "it'll"], ["it would", "it'd"],
  ["that is", "that's"], ["there is", "there's"], ["let us", "let's"]
];
const esc = s => s.replace(/[.*+?^${}()|[\]\\']/g, "\\$&");
/** Add contracted / expanded spellings of an accepted answer (case-insensitive, word-bounded). */
export function variants(ans) {
  const out = new Set([ans]);
  let grew = true, guard = 0;
  while (grew && guard++ < 3) {
    grew = false;
    [...out].forEach(a => CONTR.forEach(([full, short]) => {
      const rf = new RegExp("(^|\\s)" + esc(full) + "(?=\\s|$)", "i"), rs = new RegExp("(^|\\s)" + esc(short) + "(?=\\s|$)", "i");
      [[rf, short], [rs, full]].forEach(([re, rep]) => { if (re.test(a)) { const v = a.replace(re, (m, sp) => sp + rep); if (!out.has(v)) { out.add(v); grew = true; } } });
    }));
  }
  return [...out];
}
const expandAll = list => [...new Set(list.flatMap(variants))];

function meta(m) { const [id, sub, diff, level] = m.split(/\s+/); return { id, sub, diff: +diff || 2, level: level || "B2", v: 1 }; }
function tail(rest) { return rest.length && rest[rest.length - 1] && !Array.isArray(rest[rest.length - 1]) && typeof rest[rest.length - 1] === "object" ? rest.pop() : {}; }

/** Single choice. First option is correct. opts: [text, why, errorTag] */
function single(kind, m, prompt, rest) {
  const extra = tail(rest);
  const options = rest.map(([t, why, tag], i) => i === 0 ? { t, ok: true, why } : { t, why, tag: tag || "UNCLASSIFIED" });
  return Object.assign({ ...meta(m), kind, type: "single", prompt, options, explain: options[0].why }, extra);
}
export const S = (m, prompt, ...rest) => single("practice", m, prompt, rest);
export const TS = (m, prompt, ...rest) => single("theory", m, prompt, rest);

/** Multiple choice: opts [text, isCorrect, why, errorTag]. Number of correct answers is shown to the user. */
function multi(kind, m, prompt, rest) {
  const extra = tail(rest);
  const options = rest.map(([t, ok, why, tag]) => ok ? { t, ok: true, why } : { t, why, tag: tag || "UNCLASSIFIED" });
  return Object.assign({ ...meta(m), kind, type: "multi", prompt, options, explain: extra.explain || options.filter(o => o.ok).map(o => o.why).join(" ") }, extra);
}
export const M = (m, prompt, ...rest) => multi("practice", m, prompt, rest);
export const TM = (m, prompt, ...rest) => multi("theory", m, prompt, rest);

/** Typed answer. rules: [[wrongAnswer|[...], errorTag, why], ...] */
export const I = (m, prompt, accept, explain, tag, rules = [], extra = {}) =>
  Object.assign({ ...meta(m), kind: "practice", type: "input", prompt, accept: expandAll(accept), explain, tag: tag || "FORM", rules }, extra);

/** Matching / categorisation: items [text, categoryIndex, errorTag?] */
export const MA = (m, prompt, cats, items, explain, tag = "MEANING", extra = {}) =>
  Object.assign({ ...meta(m), kind: "practice", type: "match", prompt, cats, items: items.map(([t, cat, tg]) => ({ t, cat, tag: tg })), explain, tag }, extra);

/** Ordering: tokens are listed in the correct order. alts: other fully correct orders (token texts joined by spaces). */
export const O = (m, prompt, tokens, explain, tag = "STRUCTURE", alts = [], extra = {}) =>
  Object.assign({ ...meta(m), kind: "practice", type: "order", prompt, tokens, alts, explain, tag }, extra);

/** Error hotspot: segments are strings (correct fragments) or {t, fix:[...], tag, rules} for the single wrong one. */
export const FX = (m, prompt, segments, explain, extra = {}) =>
  Object.assign({ ...meta(m), kind: "practice", type: "fix", prompt, explain,
    segments: segments.map(s => typeof s === "string" ? { t: s } : { t: s.t, bad: true, fix: expandAll(s.fix), tag: s.tag || "FORM", rules: s.rules || [] }),
    tag: (segments.find(s => typeof s !== "string") || {}).tag || "FORM" }, extra);

/** Lesson body blocks */
export const p = t => ({ k: "p", t });
export const h = t => ({ k: "h", t });
export const f = t => ({ k: "f", t });
export const tip = t => ({ k: "tip", t });
export const warn = t => ({ k: "warn", t });
export const tb = (head, rows, note) => ({ k: "tb", head, rows, note });
export const ex = (...rows) => ({ k: "ex", rows }); // rows: [en, ru, note?]
/** Timeline: marks [{t, at:0..100} | {t, from, to}], now: position of "now" (0..100) or null */
export const tl = (marks, now = 50, caption = "") => ({ k: "tl", marks, now, caption });

export const L = (id, title, goal, body, checks) => ({ id, title, goal, body, checks });

/** Assemble a block: stamps module/lesson ids on every question. */
export function block(def, lessons, practice) {
  const questions = [];
  lessons.forEach(l => l.checks.forEach(q => { q.module = def.id; q.sub = q.sub || l.id; q.lesson = l.id; q.goal = q.goal || l.goal; questions.push(q); }));
  practice.forEach(q => { q.module = def.id; const l = lessons.find(x => x.id === q.sub); q.lesson = l ? l.id : lessons[0].id; q.goal = q.goal || (l ? l.goal : def.title); questions.push(q); });
  lessons.forEach(l => { l.checkIds = l.checks.map(q => q.id); delete l.checks; });
  return Object.assign({}, def, { lessons, questions });
}
