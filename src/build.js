const fs = require('fs'); const path = require('path');
const { gamas, estudios, mercados, medline, prensa, activos, t } = require('./content.js');
const out = path.join(__dirname, '..', 'site');
const img = (n, w, h, alt, cls = '', lazy = true) =>
  `<img src="/img/${n}.webp" width="${w}" height="${h}" alt="${alt}"${cls ? ` class="${cls}"` : ''}${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;
const lockup = (g, tag = 'span') => `<${tag} class="lockup"><span class="lockup-n">${g.nombre}</span> <em class="lockup-d">${g.desc}</em></${tag}>`;
const pend = (txt) => `<span class="pend">${txt}</span>`;

const mapa = fs.readFileSync(path.join(__dirname, 'mapa.svg'), 'utf8');
const gById = Object.fromEntries(gamas.map(g => [g.id, g]));

function page(L) {
  const s = t[L]; const es = L === 'es';
  const tabs = gamas.map((g, i) => `
        <button class="tab" role="tab" id="tab-${g.id}" aria-controls="panel-${g.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" style="--c:var(--${g.id})">
          <span class="dot"></span>${lockup(g)}<span class="tab-need">${g.necesidad[L]}</span>
        </button>`).join('');
  const panels = gamas.map((g, i) => { const e = estudios.find(x => x.gama === g.id); return `
      <div class="panel" role="tabpanel" id="panel-${g.id}" aria-labelledby="tab-${g.id}" style="--c:var(--${g.id})"${i === 0 ? '' : ' hidden'}>
        <div class="p-foto${g.vida ? '' : ' p-vial'}">${g.vida ? img(g.vida, 1080, 1080, `${s.vidaAlt} ${g.nombre} ${g.desc}`) : img(g.cabina.img, 388, 700, `MedLine ${g.cabina.productos[0].n}`)}</div>
        <ol class="flujo">
          <li class="ctx">
            <h3 class="ctx-h">${s.paso1} ${pend(s.reg)}</h3>
            <ul class="plist plist-pro">${g.cabina.productos.map(p => `<li><span class="pname">${p.n}</span><span class="pclaim">${p[L]}</span></li>`).join('')}</ul>
            <p class="ctx-proto"><strong>${s.protoL}.</strong> ${g.proto[L]}</p>
            <a class="btn btn-line" href="#contacto" data-rol="pro">${s.ctaPrecio}</a>
          </li>
          <li class="ctx">
            <h3 class="ctx-h">${s.paso2}</h3>
            ${g.casa ? `<ul class="plist">${g.casa.productos[L].map(p => `<li>${p}</li>`).join('')}</ul>
            <a class="btn btn-line" href="#contacto">${s.ctaTienda}</a>` : `<p class="ctx-none">${s.sinCasa}</p>`}
          </li>
          <li class="ctx ctx-ev">
            <h3 class="ctx-h">${s.paso3}</h3>
            ${e ? `<p class="ev-num">${es ? e.valor + '&nbsp;%' : e.valorEn + '%'}</p>
            <p class="ev-par">${e[L]}, ${es ? e.plazoEs : e.plazoEn}. ${e.prod.split(' · ')[1]}.</p>
            <a class="ev-link" href="#est-${e.gama}">${s.verEstudio}</a>` : `<p class="ctx-none">${s.sinEstudio}</p>`}
          </li>
        </ol>
      </div>`; }).join('');
  const cat = gamas.map(g => `
        <li class="cat-row" style="--c:var(--${g.id})">
          <div class="cat-l">
            <h4>${lockup(g)}</h4>
            <p class="cat-need">${g.necesidad[L]}</p>
            <p class="cat-proto">${g.proto[L]}</p>
          </div>
          <ul class="cat-g">${medline.filter(m => m.gama === g.id).map(m => `
            <li><a class="med" href="#contacto" data-rol="pro" data-prod="${m.n}">
              ${img('med-' + m.id, 640, 480, '')}
              <span class="med-n">${m.n}</span>
              <span class="med-m">${m.tipo === 'm' ? s.tipoM : s.tipoP}</span>
              <span class="med-cta">${s.ctaPrecio}</span>
            </a></li>`).join('')}
          </ul>
        </li>`).join('');
  const cards = estudios.map(e => {
    const [gm, pr] = e.prod.split(' · '); const [n, ...d] = gm.split(' ');
    return `
        <li class="est" id="est-${e.gama}" style="--c:var(--${e.gama})">
          <div class="est-img">${img(e.img[0], e.img[1], e.img[2], `${gm} ${pr}`)}</div>
          <p class="est-num">${es ? e.valor + '&nbsp;%' : e.valorEn + '%'}</p>
          <p class="est-par">${e[L]}<span>${es ? e.plazoEs : e.plazoEn}</span></p>
          <p class="est-prod"><span class="lockup"><span class="lockup-n">${n}</span> <em class="lockup-d">${d.join(' ')}</em></span> ${pr}</p>
          <details class="est-d">
            <summary>${s.comoH}</summary>
            <dl>
              <dt>${s.dAp}</dt><dd>${e.det.ap[0]}</dd>
              <dt>${s.dZona}</dt><dd>${e.det.ap[es ? 1 : 2]}</dd>
              <dt>${s.dPanel}</dt><dd>${s.panelTxt(e.det.edad)}</dd>
              <dt>${s.dMej}</dt><dd>${es ? e.det.mej + '&nbsp;%' : e.det.mej + '%'}</dd>
            </dl>
            ${e.det.extra ? `<p>${e.det.extra[L]}</p>` : ''}
            <p class="est-ref">${s.eficRef} ${e.informe}</p>
          </details>
          ${e.det.pend ? `<p>${pend(e.det.pend[L])}</p>` : ''}
        </li>`; }).join('');
  const f = s.form;
  const field = (id, label, type = 'text', req = true, ac = '') => `
          <div class="field">
            <label for="${id}">${label}</label>
            <input id="${id}" name="${id}" type="${type}"${req ? ' required' : ''}${ac ? ` autocomplete="${ac}"` : ''} aria-describedby="${id}-err">
            <p class="err" id="${id}-err" hidden></p>
          </div>`;
  const video = (n, label) => `<div class="vid">
        <video src="/img/${n}.mp4" poster="/img/${n}-poster.webp" muted loop playsinline preload="none" aria-label="${label}"></video>
        <button class="vid-btn" type="button" data-pausa="${s.pausa}" data-play="${s.play}">${s.play}</button>
      </div>`;
  const mapaSvg = mapa.replace('__TITLE__', s.mapaT).replace(/<path class="on"([^>]*)><title>[^<]*<\/title>/g, '<path class="on"$1>');
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
  <nav id="nav" class="nav" aria-label="${es ? 'Principal' : 'Main'}">
    <a href="#sistema">${s.nav.tienda}</a>
    <a href="#profesional">${s.nav.pro}</a>
    <a href="#eficacia">${es ? 'Estudios' : 'Studies'}</a>
    <a href="#fabricacion">${s.nav.sobre}</a>
    <span class="nav-end">
      <a href="${s.otherHref}" lang="${s.other}" hreflang="${s.other}">${s.otherLabel}</a>
      <a href="#sistema">${s.nav.carrito} (0)</a>
      <a class="btn btn-solid btn-s" href="#distribuidores">${s.ctaDist}</a>
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
      </div>
      <p class="hero-alt">${s.heroO} <a href="#profesional">${s.heroPro}</a> <a href="#sistema">${s.heroCasa}</a></p>
    </div>
    <figure class="hero-fig">
      ${img('hero-manos', 1080, 1080, s.heroAlt, 'hero-a', false)}
      ${img('hero-producto', 1300, 544, s.heroAlt2, 'hero-b')}
      <button class="hero-sw" type="button" aria-pressed="false" data-on="${s.verUso}" data-off="${s.verProducto}">${s.verProducto}</button>
      <figcaption>${s.heroCap}</figcaption>
    </figure>
  </section>

  <section class="cifras" aria-label="${es ? 'Datos de la marca' : 'Brand facts'}">
    <div class="w">
      <dl class="cifras-g">${s.cifras.map(([a, b, c]) => `
        <div><dt>${a}${b ? `<br>${b}` : ''}</dt><dd>${c}</dd></div>`).join('')}
      </dl>
      <div class="prensa"><h2>${s.prensaH}</h2><ul>${prensa.map(p => `<li>${p}</li>`).join('')}</ul></div>
    </div>
  </section>

  <section class="puertas">
    <div class="w">
      <h2 class="h-sec">${s.puertasH}</h2>
      <div class="puertas-grid">${[['tienda', 'puerta-tienda', 1080, 1080, '#sistema', s.ctaTienda], ['pro', 'silk-movimiento', 1040, 1300, '#profesional', s.ctaPro], ['dist', 'puerta-dist', 1358, 1080, '#distribuidores', s.ctaDist]].map(([k, im, w, h, href, cta]) => `
        <a class="puerta puerta-${k}" href="${href}">
          <span class="puerta-img">${img(im, w, h, '')}</span>
          <strong>${s.puertas[k][0]}</strong>
          <span class="puerta-p">${s.puertas[k][1]}</span>
          <span class="puerta-cta">${cta}</span>
        </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="sistema" id="sistema">
    <div class="w">
      <h2 class="h-sec">${s.sistemaH}</h2>
      <p class="sec-p">${s.sistemaP}</p>
      <div class="tabs" role="tablist" aria-label="${es ? 'Gamas' : 'Ranges'}">${tabs}
      </div>
      <div class="panels">${panels}
      </div>
      <p class="otras">${s.otras}</p>
    </div>
  </section>

  <section class="pro" id="profesional">
    <div class="pro-top">
      ${video('medline', s.videoMed)}
      <div class="pro-txt">
        <img class="pro-logo" src="/img/logo-medline.svg" width="1128" height="191" alt="Labelist MedLine">
        <h2>${s.proH}</h2>
        <p>${s.proP}</p>
        <div class="actions">
          <a class="btn btn-solid" href="#catalogo">${s.ctaPro}</a>
          <a class="btn btn-line" href="#contacto" data-rol="pro">${s.ctaPrecio}</a>
        </div>
      </div>
    </div>
    <div class="w cat" id="catalogo">
      <h3 class="cat-h">${s.catH} ${pend(s.reg)}</h3>
      <p class="sec-p">${s.catP}</p>
      <ul class="cat-rows">${cat}
      </ul>
    </div>
  </section>

  <section class="efic" id="eficacia">
    <div class="w">
      <h2 class="h-sec">${s.eficH}</h2>
      <p class="sec-p">${s.eficP}</p>
      <ul class="est-g">${cards}
      </ul>
      <p class="nota">${s.eficNota}</p>
    </div>
  </section>

  <section class="fab" id="fabricacion">
    <div class="w">
      <div class="fab-top">
        <div class="fab-txt">
          <h2 class="h-sec">${s.fabH}</h2>
          <p>${s.fabP1}</p>
        </div>
        ${video('marca', s.videoLabel)}
      </div>
      <ul class="act">${activos.map(a => `
        <li style="--c:var(--${a.gama})"><span class="act-n">${a.pct[es ? 0 : 1]}${es ? '&nbsp;' : ''}%</span><strong>${a[L]}</strong><span>${a.prod[L]}</span></li>`).join('')}
      </ul>
    </div>
  </section>

  <section class="dist" id="distribuidores">
    <div class="w">
      <h2 class="h-sec">${s.distH}</h2>
      <p class="sec-p">${s.distP}</p>
      <div class="merc">
        <div class="merc-mapa">${mapaSvg}
          <p class="leyenda"><span><i class="l-on"></i>${s.mercH}</span><span><i class="l-bcn"></i>${s.bcn}</span></p>
        </div>
        <div class="merc-l">
          <h3>${s.mercH}</h3>
          <ul>${mercados[L].map(m => `<li>${m}</li>`).join('')}</ul>
          <p>${pend(s.mercPend)}</p>
        </div>
      </div>
      <div class="pasos">
        <h3 class="h-sub">${s.pasosH} ${pend(s.pasosPend)}</h3>
        <ol>${s.pasos.map(([a, b]) => `<li><strong>${a}</strong><span>${b}</span></li>`).join('')}</ol>
      </div>
      <div class="dist-b">
        <div>
          <h3 class="h-sub">${s.recibeH}</h3>
          <dl class="soporte">${s.soporte.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
          <h3 class="h-sub h-sub2">${s.socioH}</h3>
          <dl class="soporte">${s.socio.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
        </div>
        <form class="form" id="contacto" novalidate>
          <h3>${s.formH}</h3>
          <fieldset class="rol">
            <legend>${f.rol}</legend>
            <label><input type="radio" name="rol" value="dist" checked> ${f.rolDist}</label>
            <label><input type="radio" name="rol" value="pro"> ${f.rolPro}</label>
          </fieldset>
          <div class="fields">${field('nombre', f.nombre, 'text', true, 'name')}${field('empresa', f.empresa, 'text', true, 'organization')}${field('pais', f.pais, 'text', true, 'country-name')}${field('email', f.email, 'email', true, 'email')}
          </div>${field('web', s.webL + ' <span class="opt">' + f.msgHelp + '</span>', 'url', false, 'url')}
          <div class="field">
            <label for="msg">${f.msg} <span class="opt">${f.msgHelp}</span></label>
            <textarea id="msg" name="msg" rows="3"></textarea>
          </div>
          <button class="btn btn-solid" type="submit">${f.enviar}</button>
          <p class="ok" role="status" hidden>${f.ok}</p>
          <template id="msgs" data-req="${f.errReq}" data-email="${f.errEmail}" data-precio="${s.ctaPrecio}"></template>
        </form>
      </div>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="w foot-g">
    <div class="foot-m">
      <img src="/img/logo-labelist.svg" width="360" height="51" alt="Labelist" loading="lazy">
      <p>${s.foot.dir}</p>
    </div>
    ${Object.values(s.footCols).map(([h, ls]) => `<nav aria-label="${h}"><h2>${h}</h2><ul>${ls.map(([a, b]) => `<li><a href="${b}">${a}</a></li>`).join('')}</ul></nav>`).join('\n    ')}
    <div><h2>${s.contactoH}</h2><ul><li>hello@labelistcosmetics.com</li><li>${s.horario}</li></ul></div>
  </div>
  <div class="w foot-b">
    <p>© 2026 Labelist</p>
    <p class="foot-links"><a href="https://labelistcosmetics.com/aviso-legal/">${s.foot.legal}</a><a href="https://labelistcosmetics.com/politica-de-privacidad/">${s.foot.priv}</a><a href="https://labelistcosmetics.com/politica-de-cookies/">${s.foot.cookies}</a><a href="${s.otherHref}" lang="${s.other}">${s.otherLabel}</a></p>
  </div>
</footer>
<script src="/js/main.js" defer></script>
</body>
</html>
`;
}
fs.writeFileSync(path.join(out, 'index.html'), page('es'));
fs.mkdirSync(path.join(out, 'en'), { recursive: true });
fs.writeFileSync(path.join(out, 'en', 'index.html'), page('en'));
fs.writeFileSync(path.join(out, 'data.json'), JSON.stringify({ gamas, estudios, mercados, medline }, null, 2));
console.log('ok');
