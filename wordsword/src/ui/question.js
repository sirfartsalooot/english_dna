import { html, useState, useEffect, useRef, I, rich } from "./core.js";
import { ERROR_TAGS, correctAnswerText, userAnswerText } from "../engine/scoring.js";
import { LESSON_BY_ID } from "../content/index.js";

const order = (perm, n) => perm && perm.length === n ? perm : Array.from({ length: n }, (_, i) => i);
const TYPE_NAME = { single: "Один ответ", multi: "Несколько ответов", input: "Ввод", match: "Сопоставление", order: "Порядок", fix: "Найти ошибку", branch: "Сценарий" };

/**
 * Renders one question. `value` is the response in canonical indices; `checked` shows correctness
 * (Learning Mode after «Проверить», or exam review). In Exam Mode `checked` is false until the exam ends.
 */
export function QuestionView({ q, perm, value, onChange, checked, learning, onEnter }) {
  return html`<div>
    <div class="qmeta"><span class="tagchip">${TYPE_NAME[q.type]}</span><span class="tagchip">${q.level}</span>${q.kind === "theory" ? html`<span class="tagchip">теория</span>` : null}${q.kind === "case" ? html`<span class="tagchip">кейс</span>` : null}</div>
    ${q.ctx ? html`<div class="qctx" lang="en">${q.ctx}</div>` : null}
    <div class=${"qprompt" + (/[а-яё]/i.test(q.prompt) ? "" : " en")} lang=${/[а-яё]/i.test(q.prompt) ? "ru" : "en"}>${q.prompt}</div>
    ${q.type === "single" ? html`<${Single} q=${q} perm=${perm} value=${value} onChange=${onChange} checked=${checked}/>` : null}
    ${q.type === "multi" ? html`<${Multi} q=${q} perm=${perm} value=${value} onChange=${onChange} checked=${checked}/>` : null}
    ${q.type === "input" ? html`<${Input} q=${q} value=${value} onChange=${onChange} checked=${checked} onEnter=${onEnter}/>` : null}
    ${q.type === "match" ? html`<${Match} q=${q} perm=${perm} value=${value} onChange=${onChange} checked=${checked}/>` : null}
    ${q.type === "order" ? html`<${Order} q=${q} perm=${perm} value=${value} onChange=${onChange} checked=${checked}/>` : null}
    ${q.type === "fix" ? html`<${Fix} q=${q} value=${value} onChange=${onChange} checked=${checked} onEnter=${onEnter}/>` : null}
    ${q.type === "branch" ? html`<${Branch} q=${q} value=${value} onChange=${onChange} checked=${checked} learning=${learning}/>` : null}
  </div>`;
}

function Single({ q, perm, value, onChange, checked }) {
  return html`<div class="tiles" role="radiogroup">${order(perm, q.options.length).map((i, k) => { const o = q.options[i];
    let cl = "tile"; if (value === i && !checked) cl += " sel"; if (checked) { if (o.ok) cl += " good"; else if (value === i) cl += " badf"; else cl += " faded"; }
    return html`<button key=${i} role="radio" aria-checked=${value === i} class=${cl} disabled=${checked} onClick=${() => onChange(i)} lang="en"><span class="k">${k + 1}</span>${o.t}</button>`; })}</div>`;
}
function Multi({ q, perm, value, onChange, checked }) {
  const need = q.options.filter(o => o.ok).length; const sel = value || [];
  const toggle = i => { if (sel.includes(i)) onChange(sel.filter(x => x !== i)); else if (sel.length < need) onChange(sel.concat(i)); };
  return html`<div><p class="hint">Выберите ровно ${need} варианта. Выбрано: ${sel.length} из ${need}.</p>
    <div class="tiles">${order(perm, q.options.length).map(i => { const o = q.options[i]; const on = sel.includes(i);
      let cl = "tile"; if (on && !checked) cl += " sel"; if (checked) { if (o.ok) cl += " good"; else if (on) cl += " badf"; else cl += " faded"; }
      return html`<button key=${i} role="checkbox" aria-checked=${on} class=${cl} disabled=${checked || (!on && sel.length >= need)} onClick=${() => toggle(i)} lang="en"><span class="ck">${on ? I.check : null}</span>${o.t}</button>`; })}</div></div>`;
}
function Input({ q, value, onChange, checked, onEnter }) {
  const ref = useRef(null);
  useEffect(() => { if (!checked && ref.current && window.matchMedia("(pointer:fine)").matches) ref.current.focus({ preventScroll: true }); }, [q.id]);
  return html`<form onSubmit=${e => { e.preventDefault(); onEnter && onEnter(); }} autocomplete="off">
    <input ref=${ref} class=${"minput" + (checked ? "" : "")} lang="en" value=${value || ""} readOnly=${checked} onChange=${e => onChange(e.target.value)}
      placeholder="Ответ на английском" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="done" aria-label="Ответ"/></form>`;
}
function Match({ q, perm, value, onChange, checked }) {
  const v = value || {};
  return html`<div>${order(perm, q.items.length).map(i => { const it = q.items[i]; let cl = "mitem"; if (checked) cl += v[i] === it.cat ? " good" : " badf";
    return html`<div key=${i} class=${cl}><div class="mt" lang="en">${it.t}</div><div class="mc">${q.cats.map((c, ci) => html`<button key=${ci} aria-pressed=${v[i] === ci} disabled=${checked} onClick=${() => onChange(Object.assign({}, v, { [i]: ci }))}>${c}</button>`)}</div>
      ${checked && v[i] !== it.cat ? html`<div class="small2" style=${{ marginTop: "6px" }}>Верно: <b>${q.cats[it.cat]}</b></div>` : null}</div>`; })}</div>`;
}
function Order({ q, perm, value, onChange, checked }) {
  const seq = value || []; const bank = order(perm, q.tokens.length);
  return html`<div><p class="hint">Нажимайте элементы по порядку. Нажмите элемент в строке ответа, чтобы убрать его.</p>
    <div class="oline" aria-label="Ваш ответ">${seq.length ? seq.map((i, k) => html`<button key=${k} class="tok" disabled=${checked} onClick=${() => onChange(seq.filter((_, j) => j !== k))} lang="en">${q.tokens[i]}</button>`) : html`<span class="small2">Ответ появится здесь</span>`}</div>
    <div class="obank">${bank.map(i => html`<button key=${i} class=${"tok" + (seq.includes(i) ? " used" : "")} disabled=${checked || seq.includes(i)} onClick=${() => onChange(seq.concat(i))} lang="en">${q.tokens[i]}</button>`)}</div>
    ${!checked && seq.length ? html`<button class="link" style=${{ marginTop: "10px" }} onClick=${() => onChange([])}>Очистить</button>` : null}
    ${checked ? html`<p class="small2" style=${{ marginTop: "8px" }}>Верный порядок: <span lang="en">${q.tokens.join(" ")}</span></p>` : null}</div>`;
}
function Fix({ q, value, onChange, checked, onEnter }) {
  const v = value || {};
  return html`<div><p class="hint">1) Нажмите на фрагмент с ошибкой. 2) Введите исправленный вариант.</p>
    <div class="fixs" lang="en">${q.segments.map((s, i) => { let cl = ""; if (v.seg === i) cl = "sel"; if (checked && s.bad) cl = "good";
      return html`<button key=${i} class=${cl} disabled=${checked} onClick=${() => onChange({ seg: i, text: v.seg === i ? v.text : "" })}>${s.t}</button>`; })}</div>
    ${v.seg != null ? html`<form onSubmit=${e => { e.preventDefault(); onEnter && onEnter(); }} autocomplete="off"><label class="small2">Исправление для «${q.segments[v.seg].t}»:</label>
      <input class="minput" lang="en" value=${v.text || ""} readOnly=${checked} onChange=${e => onChange({ seg: v.seg, text: e.target.value })} autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" placeholder="Исправленный фрагмент"/></form>` : null}</div>`;
}
function Branch({ q, value, onChange, checked, learning }) {
  const path = value || []; const last = path[path.length - 1];
  const lastChoice = last ? q.nodes[last.node].choices[last.choice] : null;
  const curId = !last ? q.start : lastChoice.next; const node = curId ? q.nodes[curId] : null;
  return html`<div>
    <div class="bpath">${path.map((st, k) => { const n = q.nodes[st.node]; const c = n.choices[st.choice]; const best = Math.max(...n.choices.map(x => x.pts || 0));
      const good = (c.pts || 0) === best;
      return html`<div key=${k} class=${"bstep" + (learning || checked ? (good ? " ok" : " bad") : "")}><b>Шаг ${k + 1}. ${n.text}</b><div class="ans" lang="en">${c.t}</div>${learning || checked ? html`<div class="fbk">${good ? "✓ " : "✗ "}${c.fb}</div>` : null}</div>`; })}</div>
    ${node && !checked ? html`<div><div class="qprompt">${node.text}</div><div class="tiles">${node.choices.map((c, i) => html`<button key=${i} class="tile" onClick=${() => onChange(path.concat({ node: curId, choice: i }))} lang="en"><span class="k">${String.fromCharCode(65 + i)}</span>${c.t}</button>`)}</div></div>`
      : !checked ? html`<div class="banner learn">Сценарий завершён. ${learning ? "Нажмите «Проверить», чтобы увидеть оценку траектории." : "Ответ сохранён; оценка будет после завершения теста."}</div>` : null}
    ${!checked && path.length ? html`<button class="link" style=${{ marginTop: "10px" }} onClick=${() => onChange([])}>Пройти сценарий заново</button>` : null}
  </div>`;
}

/** Full explanation after answering (Learning) or in exam results. */
export function Explain({ q, value, result, onLesson, compact }) {
  const lesson = LESSON_BY_ID[q.lesson || q.sub];
  return html`<div class=${"fb " + (result.correct ? "fb-ok" : "fb-bad")} role="status">
    <div class="fb-h">${result.correct ? I.ok : I.bad}${result.correct ? "Верно" : result.score > 0 ? `Частично верно (${Math.round(result.score * 100)}%)` : "Неверно"}</div>
    <div class="fb-b">
      ${!result.correct ? html`<p><b>Ваш ответ:</b> <span lang="en">${userAnswerText(q, value) || "—"}</span></p><p><b>Правильно:</b> <span lang="en">${correctAnswerText(q)}</span></p>` : null}
      <p>${rich(q.explain)}</p>
      ${q.ce ? html`<p><b>Контрпример:</b> ${rich(q.ce)}</p>` : null}
      ${q.note ? html`<p class="small2">${q.note}</p>` : null}
      ${result.why && !result.correct ? html`<p>${result.why}</p>` : null}
      ${!compact && (q.type === "single" || q.type === "multi") ? html`<div class="optexp">${q.options.map((o, i) => html`<div key=${i} class=${o.ok ? "okx" : "nox"}><b lang="en">${o.t}</b> — ${o.why}</div>`)}</div>` : null}
      ${!compact && q.type === "branch" ? html`<p>${q.explain}</p>` : null}
      ${!result.correct && result.tags && result.tags.length ? html`<p><b>Вероятная причина:</b> ${result.tags.map(t => html`<span key=${t} class="tagchip">${ERROR_TAGS[t] || t}</span>`)}</p>` : null}
      ${lesson && onLesson ? html`<p><button class="link" onClick=${() => onLesson(lesson.id)}>Урок: ${lesson.title}</button></p>` : null}
    </div></div>`;
}
