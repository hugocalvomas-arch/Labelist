// Menú móvil
const btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
btn.addEventListener('click', () => { const o = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!o)); nav.classList.toggle('open', !o); });
nav.addEventListener('click', e => { if (e.target.closest('a')) { btn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); } });

// Hero: alterna entre la foto en uso y el producto
const sw = document.querySelector('.hero-sw');
sw.addEventListener('click', () => {
  const on = sw.getAttribute('aria-pressed') !== 'true';
  sw.setAttribute('aria-pressed', String(on)); sw.textContent = on ? sw.dataset.on : sw.dataset.off;
  sw.parentElement.classList.toggle('alt', on);
});

// Pestañas de gamas
const tabs = [...document.querySelectorAll('.tab')];
function pick(tab, focus) {
  tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; document.getElementById(t.getAttribute('aria-controls')).hidden = !on; });
  if (focus) tab.focus();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => pick(t));
  t.addEventListener('keydown', e => {
    const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (k) { e.preventDefault(); pick(tabs[(i + k + tabs.length) % tabs.length], true); }
    if (e.key === 'Home') { e.preventDefault(); pick(tabs[0], true); }
    if (e.key === 'End') { e.preventDefault(); pick(tabs[tabs.length - 1], true); }
  });
});

// Vídeos: se reproducen solo a la vista, nunca con movimiento reducido, y siempre se pueden pausar
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.vid').forEach(box => {
  const v = box.querySelector('video'), b = box.querySelector('.vid-btn'); let user = calm;
  const sync = () => { b.textContent = v.paused ? b.dataset.play : b.dataset.pausa; };
  v.addEventListener('play', sync); v.addEventListener('pause', sync);
  b.addEventListener('click', () => { if (v.paused) { user = false; v.play(); } else { user = true; v.pause(); } });
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !user) v.play().catch(() => {}); else if (!e.isIntersecting) v.pause(); }, { threshold: .35 }).observe(box);
});

// "Solicitar precio" marca el rol profesional y anota el producto en el mensaje
const form = document.getElementById('contacto'), m = document.getElementById('msgs').dataset;
document.querySelectorAll('[data-rol="pro"]').forEach(a => a.addEventListener('click', () => {
  form.querySelector('input[name="rol"][value="pro"]').checked = true;
  if (a.dataset.prod) form.querySelector('#msg').value = m.precio + ': MedLine ' + a.dataset.prod;
}));

// Formulario simulado: valida y confirma, no envía nada
form.addEventListener('submit', e => {
  e.preventDefault(); let first = null;
  form.querySelectorAll('input[required]').forEach(inp => {
    const err = document.getElementById(inp.id + '-err'); let msg = '';
    if (!inp.value.trim()) msg = m.req; else if (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) msg = m.email;
    err.textContent = msg; err.hidden = !msg; inp.setAttribute('aria-invalid', String(!!msg)); if (msg && !first) first = inp;
  });
  const ok = form.querySelector('.ok');
  if (first) { ok.hidden = true; first.focus(); } else { ok.hidden = false; form.reset(); }
});
