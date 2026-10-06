// Menú móvil
const btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
btn.addEventListener('click', () => { const o = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!o)); nav.classList.toggle('open', !o); });
nav.addEventListener('click', e => { if (e.target.closest('a')) { btn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); } });

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

// "Solicitar precio" marca el rol profesional en el formulario
document.querySelectorAll('[data-rol="pro"]').forEach(a => a.addEventListener('click', () => { document.querySelector('input[name="rol"][value="pro"]').checked = true; }));

// Formulario simulado: valida y confirma, no envía nada
const form = document.getElementById('contacto'), m = document.getElementById('msgs').dataset;
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
