// Pure helpers shared by engine, content and UI. No DOM access here (tested in Node).

/** Normalise a typed English answer for comparison (keeps the user's raw text elsewhere). */
export const norm = s => (s || "").toLowerCase().normalize("NFKC")
  .replace(/[\u2010-\u2015\u2212]/g, "-").replace(/[\u2018\u2019`´]/g, "'")
  .replace(/-/g, " ").replace(/\s+/g, " ").trim().replace(/[.!?,;:]+$/, "").trim();

export const accepts = (list, input) => { const n = norm(input); return n.length > 0 && (list || []).some(a => norm(a) === n); };

/** Deterministic PRNG (mulberry32) — used by tests; UI uses Math.random. */
export function rngFrom(seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export const shuffle = (arr, rng = Math.random) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

export const uid = (p = "id") => p + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);

/** Local calendar day "YYYY-MM-DD" for a timestamp (ms). */
export const dayKey = ts => { const d = new Date(ts); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
/** ISO-8601 week label "YYYY-Www" (local time). */
export function isoWeek(ts) {
  const d = new Date(ts); const t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = (t.getDay() + 6) % 7; t.setDate(t.getDate() - day + 3);
  const firstThu = new Date(t.getFullYear(), 0, 4);
  const week = 1 + Math.round(((t - firstThu) / 86400000 - 3 + ((firstThu.getDay() + 6) % 7)) / 7);
  return t.getFullYear() + "-W" + String(week).padStart(2, "0");
}
/** Monday (local) of the ISO week containing ts, as dayKey. */
export function weekStart(ts) { const d = new Date(ts); const day = (d.getDay() + 6) % 7; d.setDate(d.getDate() - day); return dayKey(d.getTime()); }

export const iso = ts => new Date(ts).toISOString();

export function levenshtein(a, b) {
  if (a === b) return 0; if (!a.length) return b.length; if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

export const plural = (n, a, b, c) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? b : c); };
export const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
export const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
export const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
export const groupBy = (arr, f) => { const m = {}; arr.forEach(x => { const k = f(x); (m[k] = m[k] || []).push(x); }); return m; };
