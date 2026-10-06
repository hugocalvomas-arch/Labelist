// Cada bloque comprueba que su elemento existe: el mismo archivo sirve a todas las páginas.
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const q = new URLSearchParams(location.search);

// Menú móvil
const btn = $('.menu-btn'), nav = $('#nav');
if (btn) {
  btn.addEventListener('click', () => { const o = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!o)); nav.classList.toggle('open', !o); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { btn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { btn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); btn.focus(); } });
}

// Carrito simulado: solo cuenta unidades en este navegador
const cartGet = () => { try { return +localStorage.getItem('lbl-cart') || 0; } catch { return 0; } };
const cartSet = n => { try { localStorage.setItem('lbl-cart', n); } catch {} $$('[data-cart]').forEach(e => { e.textContent = n; }); };
cartSet(cartGet());
$$('[data-add]').forEach(b => b.addEventListener('click', () => {
  cartSet(cartGet() + 1); const ok = b.closest('.ficha-txt').querySelector('.ok'); ok.textContent = ok.dataset.msg; ok.hidden = false;
}));

// Hero: alterna entre la foto en uso y el producto
const sw = $('.hero-sw');
if (sw) sw.addEventListener('click', () => {
  const on = sw.getAttribute('aria-pressed') !== 'true';
  sw.setAttribute('aria-pressed', String(on)); sw.textContent = on ? sw.dataset.on : sw.dataset.off;
  sw.parentElement.classList.toggle('alt', on);
});

// Pestañas de gamas
const tabs = $$('.tab');
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
$$('.vid').forEach(box => {
  const v = $('video', box), b = $('.vid-btn', box); let user = calm;
  const sync = () => { b.textContent = v.paused ? b.dataset.play : b.dataset.pausa; };
  v.addEventListener('play', sync); v.addEventListener('pause', sync);
  b.addEventListener('click', () => { if (v.paused) { user = false; v.play(); } else { user = true; v.pause(); } });
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !user) v.play().catch(() => {}); else if (!e.isIntersecting) v.pause(); }, { threshold: .35 }).observe(box);
});

// Tienda: filtros por gama y por necesidad. Sin JavaScript se ve la lista completa.
const filtros = $('.filtros');
if (filtros) {
  const st = { gama: q.get('gama') || '', pre: q.get('pre') || '' }; const items = $$('#lista > li'), cuenta = $('.cuenta'), vacio = $('.vacio');
  const draw = () => {
    let n = 0;
    items.forEach(li => { const ok = (!st.gama || li.dataset.gama === st.gama) && (!st.pre || li.dataset.pre.split(' ').includes(st.pre)); li.hidden = !ok; n += ok; });
    $$('.chip', filtros).forEach(c => c.setAttribute('aria-pressed', String(st[c.dataset.f] === c.dataset.v)));
    cuenta.textContent = n + ' ' + (n === 1 ? cuenta.dataset.uno : cuenta.dataset.n); vacio.hidden = n > 0;
  };
  filtros.hidden = false;
  filtros.addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; st[c.dataset.f] = c.dataset.v; draw(); });
  draw();
}

// Formulario simulado: valida y confirma, no envía nada
const form = $('#contacto');
if (form) {
  const m = $('#msgs').dataset, solo = $$('[data-solo]', form);
  const rol = v => { const r = $(`input[name="rol"][value="${v}"]`, form); if (r) r.checked = true; solo.forEach(e => { e.hidden = $('input[name="rol"]:checked', form).value !== e.dataset.solo; }); };
  form.addEventListener('change', e => { if (e.target.name === 'rol') rol(e.target.value); });
  rol(q.get('rol') || $('input[name="rol"]:checked', form).value);
  if (q.get('prod')) $('#msg', form).value = m.precio + ': MedLine ' + q.get('prod');
  $$('[data-rol="pro"]').forEach(a => a.addEventListener('click', () => rol('pro')));
  form.addEventListener('submit', e => {
    e.preventDefault(); let first = null;
    $$('input[required]', form).forEach(inp => {
      const err = document.getElementById(inp.id + '-err'); let msg = '';
      if (!inp.value.trim()) msg = m.req; else if (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) msg = m.email;
      err.textContent = msg; err.hidden = !msg; inp.setAttribute('aria-invalid', String(!!msg)); if (msg && !first) first = inp;
    });
    const ok = $('.ok', form);
    if (first) { ok.hidden = true; first.focus(); } else { ok.hidden = false; form.reset(); rol($('input[name="rol"]:checked', form).value); }
  });
}
