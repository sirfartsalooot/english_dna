// Builds a balanced, fresh exam variant from a large bank.
// Strategy: round-robin over primary strata (e.g. subtopic), inside a stratum prefer
// (1) the least-exposed questions (never seen first), (2) the least represented secondary key
// (e.g. difficulty or module), (3) random tie-break. No questionId can appear twice.
import { shuffle } from "./util.js";

/**
 * @param {object[]} items  candidate questions
 * @param {number} n        how many to pick
 * @param {object} opt      {k1:fn, k2:fn, exposure:{qid:count}, rng, minPer?:{[k1value]:number}}
 */
export function balancedPick(items, n, opt = {}) {
  const rng = opt.rng || Math.random, exp = opt.exposure || {};
  const k1 = opt.k1 || (q => q.sub), k2 = opt.k2 || (q => q.diff);
  const uniq = []; const seen = new Set();
  items.forEach(q => { if (!seen.has(q.id)) { seen.add(q.id); uniq.push(q); } });
  n = Math.min(n, uniq.length);
  const groups = {}; uniq.forEach(q => { (groups[k1(q)] = groups[k1(q)] || []).push(q); });
  // inside each group: random order first, then stable sort by exposure → random among equally fresh
  Object.keys(groups).forEach(k => { groups[k] = shuffle(groups[k], rng).sort((a, b) => (exp[a.id] || 0) - (exp[b.id] || 0)); });
  let order = shuffle(Object.keys(groups), rng);
  // groups with fresher material go first in each round so freshness wins when n < #groups
  const freshness = k => Math.min(...groups[k].map(q => exp[q.id] || 0));
  const picked = []; const k2count = {}; const per = {}; const minEach = opt.minEach == null ? 1 : opt.minEach;
  const take = k => {
    const g = groups[k]; if (!g.length) return false;
    const minExp = exp[g[0].id] || 0;
    const cands = g.filter(q => (exp[q.id] || 0) === minExp);
    cands.sort((a, b) => (k2count[k2(a)] || 0) - (k2count[k2(b)] || 0));
    const q = cands[0]; g.splice(g.indexOf(q), 1); picked.push(q); k2count[k2(q)] = (k2count[k2(q)] || 0) + 1; per[k] = (per[k] || 0) + 1; return true;
  };
  if (opt.minPer) Object.entries(opt.minPer).forEach(([k, m]) => { for (let i = 0; i < m && picked.length < n; i++) if (groups[k]) take(k); });
  while (picked.length < n) {
    order = order.filter(k => groups[k].length);
    if (!order.length) break;
    // balance first (every group gets minEach), then freshness: groups holding only already-seen items wait
    const gmin = Math.min(...order.map(freshness));
    let round = order.filter(k => (per[k] || 0) < minEach || freshness(k) === gmin);
    if (!round.length) round = order;
    round = round.slice().sort((a, b) => freshness(a) - freshness(b));
    for (const k of round) { if (picked.length >= n) break; take(k); }
  }
  return picked;
}

/** Overlap ratio between two question-id lists (0 = disjoint, 1 = identical). */
export function overlap(a, b) { const s = new Set(a); const inter = b.filter(x => s.has(x)).length; return inter / Math.max(1, Math.min(a.length, b.length)); }

/** Shuffle option order for single/multi without changing semantics. Returns display permutation. */
export function makePermutation(q, rng = Math.random) {
  if (q.type === "single" || q.type === "multi") return shuffle(q.options.map((_, i) => i), rng);
  if (q.type === "order") { let p; let guard = 0; do { p = shuffle(q.tokens.map((_, i) => i), rng); } while (guard++ < 10 && p.every((x, i) => x === i)); return p; }
  if (q.type === "match") return shuffle(q.items.map((_, i) => i), rng);
  if (q.type === "fix") return null;
  return null;
}
