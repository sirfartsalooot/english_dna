// Automatic content validation: ids, keys, option counts, explanations, metadata, minima, blueprint sufficiency.
import { TAG_KEYS } from "./scoring.js";
const TAGS = new Set(TAG_KEYS);
const BIG = new Set(["tenses", "modals", "conditionals", "articles"]);

export function validateQuestion(q, lessonsById, errors, warnings) {
  const E = m => errors.push(`${q.id}: ${m}`), W = m => warnings.push(`${q.id}: ${m}`);
  if (!q.id) return E("нет id");
  if (!q.module) E("нет module");
  if (!["B2", "C1"].includes(q.level)) E("level должен быть B2/C1");
  if (!(q.diff >= 1 && q.diff <= 3)) E("diff 1–3");
  if (!q.sub || (lessonsById && !lessonsById[q.sub])) E(`subtopic/lesson «${q.sub}» не найден`);
  if (!q.prompt) E("нет prompt");
  if (!q.explain) E("нет объяснения");
  if (q.kind === "theory" && !q.ce) E("теоретическому вопросу нужен контрпример (ce)");
  if (q.kind === "case" && (!q.ctx || q.ctx.split(/[.!?»](\s|$)/).filter(s => s.trim()).length < 2)) E("кейсу нужен контекст из нескольких предложений");
  const tagOk = t => [].concat(t).every(x => TAGS.has(x));
  switch (q.type) {
    case "single": {
      const ok = q.options.filter(o => o.ok).length;
      if (ok !== 1) E(`single: верных вариантов ${ok}`);
      if (q.options.length < 4 || q.options.length > 5) E(`single: вариантов ${q.options.length} (нужно 4–5)`);
      q.options.forEach((o, i) => { if (!o.why) E(`вариант ${i}: нет объяснения`); if (!o.ok && !tagOk(o.tag)) E(`вариант ${i}: тег «${o.tag}»`); });
      if (new Set(q.options.map(o => o.t)).size !== q.options.length) E("повторяющиеся варианты");
      break; }
    case "multi": {
      const ok = q.options.filter(o => o.ok).length;
      if (ok < 2 || ok > 3) E(`multi: верных ${ok} (нужно 2–3)`);
      if (q.options.length < 4 || q.options.length > 6) E(`multi: вариантов ${q.options.length} (нужно 4–6)`);
      q.options.forEach((o, i) => { if (!o.why) E(`вариант ${i}: нет объяснения`); if (!o.ok && !tagOk(o.tag)) E(`вариант ${i}: тег`); });
      break; }
    case "input":
      if (!q.accept || !q.accept.length) E("input: нет допустимых ответов");
      if (!tagOk(q.tag)) E("input: тег");
      (q.rules || []).forEach(r => { if (!tagOk(r[1])) E(`правило: тег ${r[1]}`); [].concat(r[0]).forEach(w => { if (typeof w === "string" && q.accept.some(a => a.toLowerCase() === w.toLowerCase())) E(`правило помечает допустимый ответ «${w}» как ошибку`); }); });
      break;
    case "match":
      if (q.cats.length < 2) E("match: <2 категорий");
      if (q.items.length < 4) E("match: <4 элементов");
      q.items.forEach(it => { if (!(it.cat >= 0 && it.cat < q.cats.length)) E(`match: неверная категория у «${it.t}»`); });
      q.cats.forEach((c, i) => { if (!q.items.some(it => it.cat === i)) W(`match: категория «${c}» не используется`); });
      break;
    case "order":
      if (q.tokens.length < 3) E("order: <3 элементов");
      break;
    case "fix": {
      const bad = q.segments.filter(s => s.bad);
      if (bad.length !== 1) E(`fix: ошибочных фрагментов ${bad.length}`);
      if (q.segments.length < 3) E("fix: слишком мало фрагментов для выбора");
      bad.forEach(s => { if (!s.fix || !s.fix.length) E("fix: нет исправления"); if (!tagOk(s.tag)) E("fix: тег"); });
      break; }
    case "branch": {
      if (!q.nodes[q.start]) { E("branch: нет стартового узла"); break; }
      const depths = []; const walk = (id, d, seen) => { const n = q.nodes[id]; if (!n) { E(`branch: узел «${id}» не найден`); return; } if (seen.has(id)) { E("branch: цикл"); return; }
        if (!n.choices || n.choices.length < 2) E(`branch: в узле ${id} <2 вариантов`);
        (n.choices || []).forEach((c, i) => { if (!c.fb) E(`branch ${id}/${i}: нет обратной связи`); if (c.tag && !tagOk(c.tag)) E(`branch ${id}/${i}: тег`); if (c.next) walk(c.next, d + 1, new Set([...seen, id])); else depths.push(d); }); };
      walk(q.start, 1, new Set());
      if (Math.min(...depths) < 3 || Math.max(...depths) > 5) E(`branch: длина траекторий ${Math.min(...depths)}–${Math.max(...depths)} (нужно 3–5)`);
      const nexts = new Set(); Object.values(q.nodes).forEach(n => (n.choices || []).forEach(c => c.next && nexts.add(c.next)));
      if (Object.values(q.nodes).every(n => new Set((n.choices || []).map(c => c.next || "END")).size < 2)) E("branch: нет реального ветвления (все варианты ведут в один узел)");
      Object.keys(q.nodes).forEach(id => { if (id !== q.start && !nexts.has(id)) W(`branch: недостижимый узел ${id}`); });
      break; }
    default: E("неизвестный тип " + q.type);
  }
}

export function validateContent({ BLOCKS, CASES, DICTS, TESTS }) {
  const errors = [], warnings = [], report = [];
  const lessonsById = Object.fromEntries(BLOCKS.flatMap(b => b.lessons.map(l => [l.id, l])));
  const all = BLOCKS.flatMap(b => b.questions).concat(CASES);
  const seen = new Set(); all.forEach(q => { if (seen.has(q.id)) errors.push(`дубликат id ${q.id}`); seen.add(q.id); });
  const prompts = {}; all.filter(q => q.type !== "input" || !q.drill).forEach(q => { const k = (q.ctx || "") + "|" + q.prompt + "|" + JSON.stringify(q.options || q.segments || q.tokens || q.items || q.accept || ""); if (prompts[k]) errors.push(`${q.id}: дублирует ${prompts[k]}`); prompts[k] = q.id; });
  all.forEach(q => validateQuestion(q, lessonsById, errors, warnings));
  BLOCKS.forEach(b => {
    const th = b.questions.filter(q => q.kind === "theory"), pr = b.questions.filter(q => q.kind === "practice");
    const big = BIG.has(b.id); const minTh = big ? 20 : 12, minPr = 40;
    if (b.lessons.length < 8) errors.push(`${b.id}: уроков ${b.lessons.length} (<8)`);
    if (th.length < minTh) errors.push(`${b.id}: теории ${th.length} (<${minTh})`);
    if (pr.length < minPr) errors.push(`${b.id}: практики ${pr.length} (<${minPr})`);
    if (big && pr.length < 80) warnings.push(`${b.id}: практики ${pr.length} — для крупного блока цель 80–120`);
    b.lessons.forEach(l => { if (l.checkIds.length && (l.checkIds.length < 3 || l.checkIds.length > 5)) errors.push(`${l.id}: мини-проверок ${l.checkIds.length} (нужно 3–5)`); if (!l.body || l.body.length < 2) errors.push(`${l.id}: пустой урок`); });
    const def = TESTS.find(t => t.id === "block:" + b.id);
    report.push({ module: b.id, title: b.title, lessons: b.lessons.length, theory: th.length, practice: pr.length, test: def.size, coverage: `${new Set(b.questions.map(q => q.sub)).size}/${b.lessons.length} уроков` });
  });
  const ctypes = {}; CASES.forEach(c => { ctypes[c.type] = (ctypes[c.type] || 0) + 1; });
  TESTS.forEach(t => t.parts.forEach((p, i) => { const ids = new Set(p.pool.map(q => q.id)); if (ids.size < p.n) errors.push(`${t.id}/часть ${i}: банк ${ids.size} меньше длины ${p.n}`); else if (ids.size < 2 * p.n) warnings.push(`${t.id}/часть ${i}: банк ${ids.size} < 2× длины (${p.n})`); }));
  DICTS.forEach(d => {
    const ids = new Set(), en = new Set(), pr = new Set();
    d.words.forEach(w => {
      ["id", "english", "russian", "testPrompt", "exampleSentence", "exampleTranslation", "wrongRussian"].forEach(f => { if (!w[f]) errors.push(`${d.id}/${w.english || w.id}: нет поля ${f}`); });
      if (!(w.acceptedEnglishAnswers || []).length) errors.push(`${d.id}/${w.english}: нет acceptedEnglishAnswers`);
      if (!/\[\[.+?\]\]/.test(w.exampleSentence)) errors.push(`${d.id}/${w.english}: в примере нет [[цели]]`);
      if (ids.has(w.id)) errors.push(`${d.id}: дубликат id ${w.id}`); ids.add(w.id);
      if (en.has(w.english)) errors.push(`${d.id}: дубликат слова ${w.english}`); en.add(w.english);
      const p = (w.testPrompt || "").toLowerCase(); if (pr.has(p)) errors.push(`${d.id}: неоднозначная подсказка «${w.testPrompt}»`); pr.add(p);
      if (w.wrongRussian && w.wrongRussian === w.russian) errors.push(`${d.id}/${w.english}: wrongRussian совпадает с переводом`);
    });
  });
  return { errors, warnings, report, cases: ctypes, totals: { questions: all.length, cases: CASES.length } };
}
