const fs = require('fs'); const path = require('path');
const { gamas, estudios, mercados, medline, prensa, activos, t } = require('./content.js');
const out = path.join(__dirname, '..', 'site');
const img = (n, w, h, alt, cls = '', lazy = true) =>
  `<img src="/img/${n}.webp" width="${w}" height="${h}" alt="${alt}"${cls ? ` class="${cls}"` : ''}${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;
const lockup = (g, tag = 'span') => `<${tag} class="lockup"><span class="lockup-n">${g.nombre}</span> <em class="lockup-d">${g.desc}</em></${tag}>`;
const pend = (txt) => `<span class="pend">${txt}</span>`;

const retail = require('./data/retail.json');
const medData = require('./data/medline.json');
const BASE = 'https://labelistcosmetics.com'; // dominio final, para canonical y datos estructurados
const RUTAS = {
  home: ['', ''], dist: ['distribuidores', 'distributors'], pro: ['profesional', 'professional'],
  shop: ['tienda', 'shop'], about: ['sobre-labelist', 'about'], contact: ['contacto', 'contact'],
};
const url = (L, key, id) => { const r = RUTAS[key === 'med' ? 'pro' : key === 'prod' ? 'shop' : key][L === 'es' ? 0 : 1]; return (L === 'en' ? '/en/' : '/') + (r ? r + '/' : '') + (id ? id + '/' : ''); };
const orgLd = L => ({ '@context': 'https://schema.org', '@type': 'Organization', name: 'Labelist Cosmetics', legalName: 'Skin and Soul SL', url: BASE + url(L, 'home'), logo: BASE + '/img/logo-labelist.svg', email: 'hello@labelistcosmetics.com', address: { '@type': 'PostalAddress', streetAddress: 'Pg. Manuel Girona 71', postalCode: '08034', addressLocality: 'Barcelona', addressCountry: 'ES' } });
const crumbLd = (L, items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: BASE + u })) });

function shell(L, { key, id, title, desc, body, ld = [], ogImg = 'portada-poster' }) {
  const s = t[L]; const es = L === 'es'; const o = s.other; const here = url(L, key, id), there = url(o, key, id);
  const cur = k => (k === key || (k === 'pro' && key === 'med') || (k === 'shop' && key === 'prod')) ? ' aria-current="page"' : '';
  return `<!doctype html>
<html lang="${s.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${BASE}${here}">
<link rel="alternate" hreflang="es" href="${BASE}${url('es', key, id)}">
<link rel="alternate" hreflang="en" href="${BASE}${url('en', key, id)}">
<link rel="alternate" hreflang="x-default" href="${BASE}${url('en', key, id)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Labelist Cosmetics">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${BASE}${here}">
<meta property="og:image" content="${BASE}/img/${ogImg}.webp">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/img/monograma.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/bodoni-moda-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/tokens.css">
<link rel="stylesheet" href="/css/main.css">
${ld.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#contenido">${s.skip}</a>
<p class="proto">${es ? 'Prototipo. Las etiquetas amarillas señalan datos por confirmar.' : 'Prototype. Yellow tags mark data still to be confirmed.'}</p>
<header class="top">
  <a class="brand" href="${url(L, 'home')}" aria-label="Labelist Cosmetics"><img src="/img/logo-labelist.svg" width="360" height="51" alt="Labelist"></a>
  <button class="menu-btn" aria-expanded="false" aria-controls="nav">${s.nav.menu}</button>
  <nav id="nav" class="nav" aria-label="${es ? 'Principal' : 'Main'}">
    <a href="${url(L, 'shop')}"${cur('shop')}>${s.nav.tienda}</a>
    <a href="${url(L, 'pro')}"${cur('pro')}>${s.nav.pro}</a>
    <a href="${url(L, 'home')}#eficacia">${es ? 'Estudios' : 'Studies'}</a>
    <a href="${url(L, 'about')}"${cur('about')}>${s.nav.sobre}</a>
    <span class="nav-end">
      <a href="${there}" lang="${o}" hreflang="${o}">${s.otherLabel}</a>
      <a href="${url(L, 'shop')}" class="cart">${s.nav.carrito} (<span data-cart>0</span>)</a>
      <a class="btn btn-solid btn-s" href="${url(L, 'dist')}"${cur('dist')}>${s.ctaDist}</a>
    </span>
  </nav>
</header>

<main id="contenido">${body}</main>

<footer class="foot">
  <div class="w foot-g">
    <div class="foot-m">
      <img src="/img/logo-labelist.svg" width="360" height="51" alt="Labelist" loading="lazy">
      <p>${s.foot.dir}</p>
      <p class="foot-fab">${es ? 'Fabricado en Barcelona en instalaciones certificadas ISO 22716 e ISO 13485.' : 'Made in Barcelona in facilities certified to ISO 22716 and ISO 13485.'}</p>
    </div>
    <nav aria-label="${es ? 'Líneas' : 'Ranges'}"><h2>${es ? 'Líneas' : 'Ranges'}</h2><ul><li><a href="${url(L, 'shop')}">${s.nav.tienda}</a></li><li><a href="${url(L, 'pro')}">MedLine</a></li><li><a href="${url(L, 'home')}#eficacia">${es ? 'Estudios de eficacia' : 'Efficacy studies'}</a></li></ul></nav>
    <nav aria-label="Labelist"><h2>Labelist</h2><ul><li><a href="${url(L, 'about')}">${s.nav.sobre}</a></li><li><a href="${url(L, 'dist')}">${s.nav.dist}</a></li><li><a href="${url(L, 'contact')}">${s.contactoH}</a></li></ul></nav>
    <div><h2>${s.contactoH}</h2><ul><li>hello@labelistcosmetics.com</li><li>${s.horario}</li></ul></div>
  </div>
  <div class="w foot-b">
    <p>© 2026 Labelist</p>
    <p class="foot-links"><a href="https://labelistcosmetics.com/aviso-legal/">${s.foot.legal}</a><a href="https://labelistcosmetics.com/politica-de-privacidad/">${s.foot.priv}</a><a href="https://labelistcosmetics.com/politica-de-cookies/">${s.foot.cookies}</a><a href="${there}" lang="${o}">${s.otherLabel}</a></p>
  </div>
</footer>
<script src="/js/main.js" defer></script>
</body>
</html>
`;
}
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
            <ul class="plist plist-pro">${g.cabina.productos.map(p => `<li><a href="${url(L, 'med', medline.find(m => m.n === p.n).id)}"><span class="pname">${p.n}</span><span class="pclaim">${p[L]}</span></a></li>`).join('')}</ul>
            <p class="ctx-proto"><strong>${s.protoL}.</strong> ${g.proto[L]}</p>
            <a class="btn btn-line" href="${url(L, 'pro')}#g-${g.id}">${s.ctaPro}</a>
          </li>
          <li class="ctx">
            <h3 class="ctx-h">${s.paso2}</h3>
            ${g.casa ? `<ul class="plist">${retail.filter(p => p.gama === g.id).map(p => `<li><a href="${url(L, 'prod', p.id)}">${p.nombre[L]}</a></li>`).join('')}</ul>
            <a class="btn btn-line" href="${url(L, 'shop')}?gama=${g.id}">${s.ctaTienda}</a>` : `<p class="ctx-none">${s.sinCasa}</p>`}
          </li>
          <li class="ctx ctx-ev">
            <h3 class="ctx-h">${s.paso3}</h3>
            ${e ? `<p class="ev-num">${es ? e.valor + '&nbsp;%' : e.valorEn + '%'}</p>
            <p class="ev-par">${e[L]}, ${es ? e.plazoEs : e.plazoEn}. ${e.prod.split(' · ')[1]}.</p>
            <a class="ev-link" href="${url(L, 'home')}#est-${e.gama}">${s.verEstudio}</a>` : `<p class="ctx-none">${s.sinEstudio}</p>`}
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
            <li><a class="med" href="${url(L, 'med', m.id)}">
              ${img('med-' + m.id, 640, 480, '')}
              <span class="med-n">${m.n}</span>
              <span class="med-m">${m.tipo === 'm' ? s.tipoM : s.tipoP}</span>
              <span class="med-cta">${es ? 'Ver ficha' : 'View product'}</span>
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
  const body = `
  <section class="hero hero2">
    <div class="w hero2-g">
      <h1>${s.h1}</h1>
      <div class="hero-txt">
        <p class="lead">${s.heroSub}</p>
        <div class="actions"><a class="btn btn-solid" href="${url(L, 'dist')}">${s.ctaDist}</a></div>
        <p class="hero-alt">${s.heroO} <a href="${url(L, 'pro')}">${s.heroPro}</a> <a href="${url(L, 'shop')}">${s.heroCasa}</a></p>
      </div>
    </div>
    <div class="vid hero-wide">
      <video src="/img/portada.mp4" poster="/img/portada-poster.webp" muted loop playsinline preload="metadata" aria-label="${s.videoLabel}"></video>
      <button class="vid-btn" type="button" data-pausa="${s.pausa}" data-play="${s.play}">${s.play}</button>
    </div>
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
      <div class="puertas-grid">${[['tienda', 'puerta-tienda', 1080, 1080, url(L, 'shop'), s.ctaTienda], ['pro', 'puerta-pro', 1040, 1300, url(L, 'pro'), s.ctaPro], ['dist', 'puerta-dist', 1358, 1080, url(L, 'dist'), s.ctaDist]].map(([k, im, w, h, href, cta]) => `
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
          <a class="btn btn-solid" href="${url(L, 'pro')}">${s.ctaPro}</a>
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
`;
  return shell(L, { key: 'home', title: s.title, desc: s.metaDesc, body, ld: [orgLd(L)] });
}
const write = (u, html) => { const d = path.join(out, u); fs.mkdirSync(d, { recursive: true }); fs.writeFileSync(path.join(d, 'index.html'), html); };
const ctx = { gamas, estudios, mercados, medline, medData, retail, prensa, activos, t, img, lockup, pend, url, shell, orgLd, crumbLd, mapa, BASE };
const paginas = require('./paginas.js')(ctx);
const urls = [];
for (const L of ['es', 'en']) {
  write(url(L, 'home'), page(L)); urls.push(url(L, 'home'));
  for (const p of paginas(L)) { write(p.url, p.html); urls.push(p.url); }
}
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${BASE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(out, 'robots.txt'), `# Prototipo: no indexar. Al pasar a producción, quitar la cabecera noindex y esta línea.\nUser-agent: *\nDisallow: /\nSitemap: ${BASE}/sitemap.xml\n`);
fs.writeFileSync(path.join(out, 'data.json'), JSON.stringify({ gamas, estudios, mercados, medline: medData, retail }, null, 2));
console.log('ok', urls.length);
