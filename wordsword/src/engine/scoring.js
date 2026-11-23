// Scoring for every question format. Responses are always expressed in CANONICAL indices
// (the order in the content file); the UI maps its shuffled display order back before scoring.
import { norm, levenshtein } from "./util.js";

export const ERROR_TAGS = {
  MEANING: "Смысл / оттенок",
  FORM: "Форма / формула / V1-V2-V3",
  TIMELINE: "Временные точки и порядок событий",
  AUXILIARY: "Вспомогательный глагол",
  AGREEMENT: "Согласование",
  MODALITY: "Модальность: уверенность, обязанность",
  STRUCTURE: "Порядок слов / конструкция",
  ARTICLE_DETERMINER: "Артикль / определитель",
  PREPOSITION: "Предлог / управление",
  VOCAB_MEANING: "Значение слова",
  COLLOCATION: "Сочетаемость",
  REGISTER: "Регистр / тон",
  SPELLING: "Орфография",
  THEORY: "Концептуальная модель правила",
  CONTEXT: "Пропущено условие контекста",
  UNCLASSIFIED: "Не классифицировано"
};
export const TAG_KEYS = Object.keys(ERROR_TAGS);

/** Is the typed answer a near miss of any accepted answer (likely a spelling slip)? */
export function isSpellingSlip(input, accepted) {
  const n = norm(input); if (!n) return false;
  return accepted.some(a => { const t = norm(a); const lim = t.length <= 4 ? 1 : t.length <= 9 ? 2 : 3; const d = levenshtein(n, t); return d > 0 && d <= lim && n[0] === t[0]; });
}

/** Classify a wrong typed answer by explicit rules first, then by spelling distance. */
export function classifyTyped(input, accepted, rules = [], fallback = "UNCLASSIFIED") {
  const n = norm(input);
  if (!n) return { tags: ["UNCLASSIFIED"], why: "Ответ не введён." };
  for (const r of rules) {
    const pats = Array.isArray(r[0]) ? r[0] : [r[0]];
    if (pats.some(p => (p instanceof RegExp ? p.test(n) : norm(p) === n))) return { tags: [r[1]], why: r[2] || "" };
  }
  if (isSpellingSlip(input, accepted)) return { tags: ["SPELLING"], why: "Похоже на опечатку или орфографическую ошибку." };
  return { tags: [fallback], why: "" };
}

/** Maximum attainable points on a branching tree (best path). */
export function branchMax(q, nodeId = q.start, seen = new Set()) {
  const node = q.nodes[nodeId]; if (!node || !node.choices || seen.has(nodeId)) return 0;
  seen.add(nodeId);
  const best = Math.max(...node.choices.map(c => (c.pts || 0) + (c.next ? branchMax(q, c.next, new Set(seen)) : 0)));
  return best;
}

/**
 * @returns {{correct:boolean, score:number, tags:string[], why?:string, detail?:any}}
 */
export function scoreQuestion(q, r) {
  switch (q.type) {
    case "single": {
      if (r == null || !q.options[r]) return { correct: false, score: 0, tags: ["UNCLASSIFIED"], why: "Нет ответа." };
      const o = q.options[r];
      return o.ok ? { correct: true, score: 1, tags: [] } : { correct: false, score: 0, tags: o.tag ? [].concat(o.tag) : [q.tag || "UNCLASSIFIED"], why: o.why };
    }
    case "multi": {
      const sel = new Set(r || []); const need = q.options.filter(o => o.ok).length;
      let hit = 0, falsePos = 0; const tags = new Set();
      q.options.forEach((o, i) => { if (sel.has(i)) { if (o.ok) hit++; else { falsePos++; if (o.tag) [].concat(o.tag).forEach(t => tags.add(t)); } } });
      const missed = need - hit; if (missed > 0) tags.add(q.missTag || q.tag || "UNCLASSIFIED");
      const correct = hit === need && falsePos === 0 && sel.size === need;
      const score = Math.max(0, (hit - falsePos) / need);
      return { correct, score: correct ? 1 : score, tags: correct ? [] : [...tags], detail: { hit, falsePos, need } };
    }
    case "input": {
      if (q.accept.some(a => norm(a) === norm(r)) && norm(r)) return { correct: true, score: 1, tags: [] };
      const c = classifyTyped(r, q.accept, q.rules, q.tag || "UNCLASSIFIED");
      return { correct: false, score: 0, tags: c.tags, why: c.why };
    }
    case "match": {
      const resp = r || {}; let ok = 0; const tags = new Set(); const wrong = [];
      q.items.forEach((it, i) => { if (resp[i] === it.cat) ok++; else { wrong.push(i); tags.add(it.tag || q.tag || "UNCLASSIFIED"); } });
      const correct = ok === q.items.length;
      return { correct, score: ok / q.items.length, tags: correct ? [] : [...tags], detail: { wrong } };
    }
    case "order": {
      const seq = (r || []).map(i => q.tokens[i]).join(" ");
      const targets = [q.tokens.join(" ")].concat((q.alts || []).map(a => Array.isArray(a) ? a.join(" ") : a));
      const correct = (r || []).length === q.tokens.length && targets.some(t => norm(t) === norm(seq));
      // partial credit: longest correct prefix
      let pre = 0; while (pre < (r || []).length && q.tokens[r[pre]] === q.tokens[pre]) pre++;
      return { correct, score: correct ? 1 : pre / q.tokens.length, tags: correct ? [] : [q.tag || "STRUCTURE"] };
    }
    case "fix": {
      const resp = r || {}; const seg = q.segments[resp.seg];
      if (!seg || !seg.bad) return { correct: false, score: 0, tags: [q.findTag || q.tag || "THEORY"], why: "Выбран фрагмент без ошибки." };
      if (seg.fix.some(f => norm(f) === norm(resp.text)) && norm(resp.text)) return { correct: true, score: 1, tags: [] };
      const c = classifyTyped(resp.text, seg.fix, seg.rules || [], seg.tag || q.tag || "UNCLASSIFIED");
      return { correct: false, score: 0.5, tags: c.tags, why: c.why || "Ошибка найдена верно, но исправление неточное." };
    }
    case "branch": {
      const path = r || []; let pts = 0; const tags = new Set(); let allBest = true;
      path.forEach(step => { const node = q.nodes[step.node]; const ch = node && node.choices[step.choice]; if (!ch) return;
        pts += ch.pts || 0; const best = Math.max(...node.choices.map(c => c.pts || 0));
        if ((ch.pts || 0) < best) { allBest = false; if (ch.tag) [].concat(ch.tag).forEach(t => tags.add(t)); } });
      const max = branchMax(q); const last = path.length ? q.nodes[path[path.length - 1].node].choices[path[path.length - 1].choice] : null;
      const finished = !!last && !last.next;
      const score = max ? pts / max : 0;
      const correct = finished && score >= (q.pass || 0.8);
      return { correct, score, tags: correct && allBest ? [] : (tags.size ? [...tags] : (correct ? [] : [q.tag || "CONTEXT"])), detail: { pts, max, finished } };
    }
    default: throw new Error("Unknown question type " + q.type);
  }
}

/** Human-readable correct answer used in results, CSV and the error drill-down. */
export function correctAnswerText(q) {
  switch (q.type) {
    case "single": return q.options.find(o => o.ok).t;
    case "multi": return q.options.filter(o => o.ok).map(o => o.t).join(" | ");
    case "input": return q.accept[0];
    case "match": return q.items.map(it => it.t + " → " + q.cats[it.cat]).join(" | ");
    case "order": return q.tokens.join(" ");
    case "fix": { const s = q.segments.find(x => x.bad); return s.t + " → " + s.fix[0]; }
    case "branch": { const out = []; let id = q.start, guard = 0; while (id && guard++ < 10) { const n = q.nodes[id]; if (!n.choices) break; const b = n.choices.reduce((m, c) => (c.pts || 0) > (m.pts || 0) ? c : m, n.choices[0]); out.push(b.t); id = b.next; } return out.join(" → "); }
  }
  return "";
}
/** Human-readable user answer (raw text preserved for typed answers). */
export function userAnswerText(q, r) {
  if (r == null) return "";
  switch (q.type) {
    case "single": return q.options[r] ? q.options[r].t : "";
    case "multi": return (r || []).map(i => q.options[i].t).join(" | ");
    case "input": return String(r);
    case "match": return q.items.map((it, i) => it.t + " → " + (r[i] != null ? q.cats[r[i]] : "—")).join(" | ");
    case "order": return r.map(i => q.tokens[i]).join(" ");
    case "fix": return q.segments[r.seg] ? q.segments[r.seg].t + " → " + (r.text || "") : "";
    case "branch": return r.map(s => q.nodes[s.node].choices[s.choice].t).join(" → ");
  }
  return "";
}
/** Whether a response is "filled" (for the exam progress indicator). */
export function isAnswered(q, r) {
  if (r == null) return false;
  switch (q.type) {
    case "single": return Number.isInteger(r);
    case "multi": return Array.isArray(r) && r.length === q.options.filter(o => o.ok).length;
    case "input": return !!String(r).trim();
    case "match": return q.items.every((_, i) => r[i] != null);
    case "order": return Array.isArray(r) && r.length === q.tokens.length;
    case "fix": return r.seg != null && !!(r.text || "").trim();
    case "branch": { if (!r.length) return false; const l = r[r.length - 1]; const c = q.nodes[l.node].choices[l.choice]; return !!c && !c.next; }
  }
  return false;
}
