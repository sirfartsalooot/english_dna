// UI primitives shared by all screens. React + htm are loaded locally from /vendor (no network).
export const React = window.React;
export const { useState, useEffect, useRef, useMemo, useCallback, useContext, createContext } = React;
export const html = window.htm.bind(React.createElement);
export const AppCtx = createContext(null);
export const useApp = () => useContext(AppCtx);

/* ---------- sound & vibration (Web Audio, no files) ---------- */
let actx = null;
function audio() { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; try { if (!actx) actx = new AC(); if (actx.state === "suspended") actx.resume(); } catch (e) { return null; } return actx; }
export function unlockAudio() { const c = audio(); if (!c) return; try { const b = c.createBuffer(1, 1, 22050), s = c.createBufferSource(); s.buffer = b; s.connect(c.destination); s.start(0); } catch (e) {} }
window.addEventListener("pointerdown", unlockAudio, { passive: true, capture: true });
function tone(seq) { const c = audio(); if (!c) return; try { const t0 = c.currentTime + .02;
  seq.forEach(([f, st, d, v, type, f2]) => { const o = c.createOscillator(), g = c.createGain(); o.type = type || "sine"; o.frequency.setValueAtTime(f, t0 + st); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t0 + st + d);
    g.gain.setValueAtTime(.0001, t0 + st); g.gain.linearRampToValueAtTime(v || .2, t0 + st + .012); g.gain.exponentialRampToValueAtTime(.0001, t0 + st + d); o.connect(g); g.connect(c.destination); o.start(t0 + st); o.stop(t0 + st + d + .05); }); } catch (e) {} }
export const SFX = {
  ok: [[659.25, 0, .16, .22, "triangle"], [987.77, .085, .3, .2, "sine"]],
  bad: [[246, 0, .2, .2, "triangle", 196], [250, 0, .2, .06, "sawtooth", 200], [185, .15, .32, .2, "triangle", 150], [188, .15, .32, .05, "sawtooth", 152]],
  set: [[523.25, 0, .14, .18, "triangle"], [659.25, .08, .14, .18, "triangle"], [783.99, .16, .3, .2, "sine"]],
  finish: [[392, 0, .22, .17, "triangle"], [523.25, .11, .22, .17, "triangle"], [659.25, .22, .42, .18, "sine"]],
  done: [[523.25, 0, .3, .2, "triangle"], [659.25, .08, .3, .2, "triangle"], [783.99, .16, .4, .2, "triangle"], [1046.5, .26, .7, .2, "sine"]],
  tap: [[520, 0, .07, .07, "sine"]]
};
const VIB = { ok: 18, bad: [45, 50, 45], set: [20, 40, 20], finish: [25, 40, 60], done: [30, 40, 30, 40, 90] };
export function playSfx(prefs, k) { if (prefs.sound && SFX[k]) tone(SFX[k]); if (prefs.vibro && VIB[k] && navigator.vibrate) { try { navigator.vibrate(VIB[k]); } catch (e) {} } }

/* ---------- icons ---------- */
const svg = (d, sw) => html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=${sw || 2} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const I = {
  back: svg(html`<path d="M15 5l-7 7 7 7"/>`), right: svg(html`<path d="M9 5l7 7-7 7"/>`), left: svg(html`<path d="M15 5l-7 7 7 7"/>`),
  ok: svg(html`<path d="M5 12.5l4.5 4.5L19 7.5"/>`, 2.4), bad: svg(html`<path d="M7 7l10 10M17 7L7 17"/>`, 2.4),
  restart: svg(html`<path d="M3.5 12a8.5 8.5 0 1 0 2.5-6"/><path d="M3.5 3.5V8H8"/>`),
  soundOn: svg(html`<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12"/>`, 1.8),
  soundOff: svg(html`<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l5 5M22 9l-5 5"/>`, 1.8),
  gear: svg(html`<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>`, 1.8),
  grid: svg(html`<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>`, 1.8),
  today: svg(html`<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>`, 1.8),
  book: svg(html`<path d="M5 4h9a4 4 0 014 4v12H9a4 4 0 01-4-4z"/><path d="M5 16a4 4 0 014-4h9"/>`, 1.8),
  words: svg(html`<path d="M4 6h10M4 12h16M4 18h12"/><path d="M17 4l3 3-3 3"/>`, 1.8),
  test: svg(html`<path d="M7 4h10v16H7z"/><path d="M10 9l1.5 1.5L14 8M10 15h4"/>`, 1.8),
  chart: svg(html`<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>`, 1.8),
  check: svg(html`<path d="M5 12.5l4.5 4.5L19 7.5"/>`, 2.6), search: svg(html`<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>`, 1.8)
};

/* ---------- shell ---------- */
export function Screen({ title, sub, onBack, right, footer, scrollKey, lv, children, nav, bare }) {
  const sc = useRef(null);
  useEffect(() => { if (sc.current) sc.current.scrollTop = 0; }, [scrollKey]);
  return html`<div class=${"screen" + (lv ? " lv-" + lv : "")}>
    ${!bare ? html`<header class="topbar">
      ${onBack ? html`<button class="ib" onClick=${onBack} aria-label="Назад">${I.back}</button>` : html`<span></span>`}
      <div class="tb-t"><b>${title}</b>${sub ? html`<span>${sub}</span>` : null}</div>
      ${right || html`<span></span>`}
    </header>` : null}
    <main class=${"content" + (nav ? " has-nav" : "")} ref=${sc}>${children}</main>
    ${footer ? html`<footer class="footer">${footer}</footer>` : null}
    ${nav || null}
  </div>`;
}
export function BottomNav({ tab, setTab }) {
  const items = [["today", "Сегодня", I.today], ["course", "Курс", I.book], ["words", "Слова", I.words], ["tests", "Тесты", I.test], ["progress", "Прогресс", I.chart]];
  return html`<nav class="bnav" aria-label="Разделы">${items.map(([k, l, ic]) => html`<button key=${k} aria-current=${tab === k ? "page" : undefined} onClick=${() => setTab(k)}>${ic}<span>${l}</span></button>`)}</nav>`;
}
export function Sheet({ onClose, label, children }) {
  useEffect(() => { const k = e => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  return html`<div class="sheet-bg" onClick=${e => { if (e.target === e.currentTarget) onClose(); }}><div class="sheet" role="dialog" aria-modal="true" aria-label=${label}><div class="grab"></div>${children}</div></div>`;
}
export function SaveBadge() {
  const app = useApp(); const s = app.saveStatus;
  const t = s.state === "saving" ? "Сохранение…" : s.state === "error" ? "Ошибка сохранения" : s.at ? "Сохранено " + new Date(s.at).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "Данные на устройстве";
  return html`<span class=${"save " + s.state} role="status" aria-live="polite" title=${s.error || ""}><i></i>${t}</span>`;
}
export const Pbar = ({ v }) => html`<span class="pbar" aria-hidden="true"><i style=${{ width: Math.max(0, Math.min(100, v || 0)) + "%" }}></i></span>`;
export const STATUS_CLS = { "Не начато": "st-0", "Изучаю": "st-1", "Готов к проверке": "st-2", "Закреплено": "st-3", "Нужно повторить": "st-4" };
export const StatusChip = ({ s }) => html`<span class=${"badge-s " + (STATUS_CLS[s] || "st-0")}>${s}</span>`;
export const Row = ({ title, sub, onClick, left, right, dim }) => html`<button class=${"row" + (dim ? " dim" : "")} onClick=${onClick}>${left || null}<span class="rt"><b>${title}</b>${sub ? html`<span>${sub}</span>` : null}</span>${right || null}<span class="chev">${I.right}</span></button>`;
export const fmtDT = ts => new Date(ts).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
export const fmtDur = ms => { const m = Math.round(ms / 60000); return m < 60 ? m + " мин" : Math.floor(m / 60) + " ч " + (m % 60) + " мин"; };

/** Minimal inline markup for lesson text: **bold**, _english_, ~~strike~~. */
export function rich(t) {
  const out = []; const re = /(\*\*[^*]+\*\*|_[^_]+_|~~[^~]+~~)/g; let last = 0, m, k = 0;
  while ((m = re.exec(t))) { if (m.index > last) out.push(t.slice(last, m.index)); const s = m[0];
    if (s.startsWith("**")) out.push(html`<b key=${k++}>${s.slice(2, -2)}</b>`); else if (s.startsWith("~~")) out.push(html`<s key=${k++}>${s.slice(2, -2)}</s>`); else out.push(html`<em key=${k++} lang="en">${s.slice(1, -1)}</em>`);
    last = m.index + s.length; }
  if (last < t.length) out.push(t.slice(last)); return out;
}
