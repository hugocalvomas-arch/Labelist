const fs = require('fs'); const path = require('path');
const { gamas, estudios, mercados, t } = require('./content.js');
const out = path.join(__dirname, '..', 'site');
const img = (n, w, h, alt, cls = '', lazy = true) =>
  `<img src="/img/${n}.webp" width="${w}" height="${h}" alt="${alt}"${cls ? ` class="${cls}"` : ''}${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;
const lockup = (g, tag = 'span') => `<${tag} class="lockup"><span class="lockup-n">${g.nombre}</span> <em class="lockup-d">${g.desc}</em></${tag}>`;
const pend = (txt) => `<span class="pend">${txt}</span>`;

function page(L) {
  const s = t[L];
  const tabs = gamas.map((g, i) => `
        <button class="tab" role="tab" id="tab-${g.id}" aria-controls="panel-${g.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-gama="${g.id}">
          <span class="dot" style="--c:var(--${g.id})"></span>${lockup(g)}<span class="tab-need">${g.necesidad[L]}</span>
        </button>`).join('');
  const panels = gamas.map((g, i) => `
      <div class="panel" role="tabpanel" id="panel-${g.id}" aria-labelledby="tab-${g.id}" style="--c:var(--${g.id})"${i === 0 ? '' : ' hidden'}>
        <div class="panel-disc" aria-hidden="true"></div>
        <div class="ctx ctx-casa">
          <h3 class="ctx-h">${s.casa}</h3>
          ${g.casa ? `<div class="ctx-body">
            <div class="ctx-img${g.casa.foto ? ' foto' : ''}">${img(g.casa.img, g.casa.w, g.casa.h, `${g.nombre} ${g.desc}: ${g.casa.productos[L][0]}`)}</div>
            <ul class="plist">${g.casa.productos[L].map(p => `<li>${p}</li>`).join('')}</ul>
          </div>
          <a class="btn btn-line" href="#contacto">${s.ctaTienda}</a>` : `<p class="ctx-none">${s.sinCasa}</p>`}
        </div>
        <div class="ctx ctx-cabina">
          <h3 class="ctx-h">${s.cabina} ${pend(s.reg)}</h3>
          <div class="ctx-body">
            <div class="ctx-img">${img(g.cabina.img, g.cabina.w || 388, g.cabina.h || 700, `MedLine ${g.cabina.productos[0].n}, ${g.nombre} ${g.desc}`)}</div>
            <ul class="plist plist-pro">${g.cabina.productos.map(p => `<li><span class="pname">${p.n}</span><span class="pclaim">${p[L]}</span></li>`).join('')}</ul>
          </div>
          <a class="btn btn-line" href="#contacto" data-rol="pro">${s.ctaPrecio}</a>
        </div>
      </div>`).join('');
  const filas = estudios.map(e => {
    const [gm, pr] = e.prod.split(' · '); const [n, ...d] = gm.split(' ');
    return `
          <tr>
            <th scope="row"><span class="dot" style="--c:var(--${e.gama})"></span><span class="lockup"><span class="lockup-n">${n}</span> <em class="lockup-d">${d.join(' ')}</em></span><span class="row-prod">${pr}</span></th>
            <td data-l="${s.eficCols[1]}">${e[L]}</td>
            <td data-l="${s.eficCols[2]}" class="num">${L === 'es' ? e.valor + '&nbsp;%' : e.valorEn + '%'}</td>
            <td data-l="${s.eficCols[3]}">${L === 'es' ? e.plazoEs : e.plazoEn}</td>
            <td data-l="${s.eficCols[4]}" class="ref">${e.informe}</td>
          </tr>`; }).join('');
  const f = s.form;
  const field = (id, label, type = 'text', req = true, ac = '') => `
            <div class="field">
              <label for="${id}">${label}</label>
              <input id="${id}" name="${id}" type="${type}"${req ? ' required' : ''}${ac ? ` autocomplete="${ac}"` : ''} aria-describedby="${id}-err">
              <p class="err" id="${id}-err" hidden></p>
            </div>`;
  return `<!doctype html>
<html lang="${s.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${s.title}</title>
<meta name="description" content="${s.metaDesc}">
<meta name="robots" content="noindex">
<link rel="alternate" hreflang="es" href="/">
<link rel="alternate" hreflang="en" href="/en/">
<link rel="icon" href="/img/monograma.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/bodoni-moda-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/tokens.css">
<link rel="stylesheet" href="/css/main.css">
</head>
<body>
<a class="skip" href="#contenido">${s.skip}</a>
<p class="proto">${s.proto}</p>
<header class="top">
  <a class="brand" href="${s.home}" aria-label="Labelist Cosmetics"><img src="/img/logo-labelist.svg" width="360" height="51" alt="Labelist"></a>
  <button class="menu-btn" aria-expanded="false" aria-controls="nav">${s.nav.menu}</button>
  <nav id="nav" class="nav" aria-label="${L === 'es' ? 'Principal' : 'Main'}">
    <a href="#sistema">${s.nav.tienda}</a>
    <a href="#profesional">${s.nav.pro}</a>
    <a href="#distribuidores">${s.nav.dist}</a>
    <a href="#fabricacion">${s.nav.sobre}</a>
    <span class="nav-end">
      <a href="${s.otherHref}" lang="${s.other}" hreflang="${s.other}">${s.otherLabel}</a>
      <a href="#sistema">${s.nav.carrito} (0)</a>
    </span>
  </nav>
</header>

<main id="contenido">
  <section class="hero">
    <div class="hero-txt">
      <h1>${s.h1}</h1>
      <p class="lead">${s.heroSub}</p>
      <div class="actions">
        <a class="btn btn-solid" href="#distribuidores">${s.ctaDist}</a>
        <a class="btn btn-line" href="#sistema">${s.ctaTienda}</a>
      </div>
    </div>
    <figure class="hero-fig">
      ${img('hero-blur-trio', 1000, 1500, s.heroAlt, '', false)}
      <figcaption>${s.heroCap}</figcaption>
    </figure>
  </section>

  <section class="prueba" aria-label="${L === 'es' ? 'Datos de la marca' : 'Brand facts'}">
    ${s.prueba.map(([a, b]) => `<div><h2>${a}</h2><p>${b}</p></div>`).join('\n    ')}
  </section>

  <section class="puertas">
    <h2 class="h-sec">${s.puertasH}</h2>
    <div class="puertas-grid">
      <a class="puerta puerta-tienda" href="#sistema">
        ${img('retail-c-age-defense-caja', 1130, 1200, '')}
        <span class="puerta-t"><strong>${s.puertas.tienda[0]}</strong><span>${s.puertas.tienda[1]}</span></span>
      </a>
      <a class="puerta puerta-pro" href="#profesional">
        ${img('silk-movimiento', 1040, 1300, '')}
        <span class="puerta-t"><strong>${s.puertas.pro[0]}</strong><span>${s.puertas.pro[1]}</span></span>
      </a>
      <a class="puerta puerta-dist" href="#distribuidores">
        ${img('caja-medline', 900, 557, '')}
        <span class="puerta-t"><strong>${s.puertas.dist[0]}</strong><span>${s.puertas.dist[1]}</span></span>
      </a>
    </div>
  </section>

  <section class="sistema" id="sistema">
    <h2 class="h-sec">${s.sistemaH}</h2>
    <p class="sec-p">${s.sistemaP}</p>
    <div class="tabs" role="tablist" aria-label="${L === 'es' ? 'Gamas' : 'Ranges'}">${tabs}
    </div>
    <div class="panels">${panels}
    </div>
    <p class="otras">${s.otras}</p>
  </section>

  <section class="pro" id="profesional">
    ${img('pro-viales', 1800, 744, s.proAlt, 'pro-img')}
    <div class="pro-txt">
      <img class="pro-logo" src="/img/logo-medline.svg" width="1128" height="191" alt="Labelist MedLine">
      <h2>${s.proH}</h2>
      <p>${s.proP}</p>
      <div class="actions">
        <a class="btn btn-solid" href="#sistema">${s.ctaPro}</a>
        <a class="btn btn-line" href="#contacto" data-rol="pro">${s.ctaPrecio}</a>
      </div>
    </div>
  </section>

  <section class="efic" id="eficacia">
    <h2 class="h-sec">${s.eficH}</h2>
    <p class="sec-p">${s.eficP}</p>
    <table class="tabla">
      <thead><tr>${s.eficCols.map(c => `<th scope="col">${c}</th>`).join('')}</tr></thead>
      <tbody>${filas}
      </tbody>
    </table>
    <p class="nota">${s.eficNota}</p>
  </section>

  <section class="fab" id="fabricacion">
    <figure class="fab-fig">
      ${img('texturas', 1600, 1009, s.fabAlt)}
      <figcaption>${pend(s.licencia)}</figcaption>
    </figure>
    <div class="fab-txt">
      <h2 class="h-sec">${s.fabH}</h2>
      <p>${s.fabP1} ${pend(s.reg)}</p>
      <p class="fab-sello">${s.fabP2}</p>
    </div>
  </section>

  <section class="dist" id="distribuidores">
    <div class="dist-intro">
      <h2 class="h-sec">${s.distH}</h2>
      <p class="sec-p">${s.distP}</p>
      <dl class="soporte">${s.soporte.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
      <h3 class="merc-h">${s.mercH}</h3>
      <p class="merc">${mercados[L].join(', ')}.</p>
      <p>${pend(s.mercPend)}</p>
    </div>
    <form class="form" id="contacto" novalidate>
      <h3>${s.formH}</h3>
      <fieldset class="rol">
        <legend>${f.rol}</legend>
        <label><input type="radio" name="rol" value="dist" checked> ${f.rolDist}</label>
        <label><input type="radio" name="rol" value="pro"> ${f.rolPro}</label>
      </fieldset>${field('nombre', f.nombre, 'text', true, 'name')}${field('empresa', f.empresa, 'text', true, 'organization')}${field('pais', f.pais, 'text', true, 'country-name')}${field('email', f.email, 'email', true, 'email')}
            <div class="field">
              <label for="msg">${f.msg} <span class="opt">${f.msgHelp}</span></label>
              <textarea id="msg" name="msg" rows="4"></textarea>
            </div>
      <button class="btn btn-solid" type="submit">${f.enviar}</button>
      <p class="ok" role="status" hidden>${f.ok}</p>
      <template id="msgs" data-req="${f.errReq}" data-email="${f.errEmail}"></template>
    </form>
  </section>
</main>

<footer class="foot">
  <img src="/img/logo-labelist.svg" width="360" height="51" alt="Labelist" loading="lazy">
  <p>${s.foot.dir}</p>
  <p class="foot-links"><a href="https://labelistcosmetics.com/aviso-legal/">${s.foot.legal}</a><a href="https://labelistcosmetics.com/politica-de-privacidad/">${s.foot.priv}</a><a href="https://labelistcosmetics.com/politica-de-cookies/">${s.foot.cookies}</a><a href="${s.otherHref}" lang="${s.other}">${s.otherLabel}</a></p>
  <p>© 2026 Labelist</p>
</footer>
<script src="/js/main.js" defer></script>
</body>
</html>
`;
}
fs.writeFileSync(path.join(out, 'index.html'), page('es'));
fs.mkdirSync(path.join(out, 'en'), { recursive: true });
fs.writeFileSync(path.join(out, 'en', 'index.html'), page('en'));
fs.writeFileSync(path.join(out, 'data.json'), JSON.stringify({ gamas, estudios, mercados }, null, 2));
console.log('ok');
