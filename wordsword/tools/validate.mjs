// Usage: node tools/validate.mjs  — prints the coverage report; exits 1 on errors.
import * as C from "../src/content/index.js";
import { validateContent } from "../src/engine/validate.js";
const r = validateContent(C);
console.log("модуль | уроков | теория | практика в банке | вопросов в контроле | покрытие");
r.report.forEach(x => console.log(`${x.n || ""}${x.module} | ${x.lessons} | ${x.theory} | ${x.practice} | ${x.test} | ${x.coverage}`));
C.TESTS.filter(t => !t.module).forEach(t => console.log(`${t.id} | — | ${t.parts.map(p => new Set(p.pool.map(q => q.id)).size).join("+")} в банке | ${t.size} | ${t.title}`));
C.DICTS.forEach(d => console.log(`словарь ${d.id} | ${d.words.length} слов | наборов ${d.sets.length}`));
console.log("Case Lab по форматам:", JSON.stringify(r.cases), "всего", r.totals.cases);
console.log(`\nОшибок: ${r.errors.length}, предупреждений: ${r.warnings.length}`);
r.errors.forEach(e => console.log("ERROR", e)); r.warnings.forEach(w => console.log("WARN ", w));
process.exit(r.errors.length ? 1 : 0);
