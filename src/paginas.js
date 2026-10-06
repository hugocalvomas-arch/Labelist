// Páginas interiores. Los datos de producto salen de src/data/*.json; los textos de sección están aquí, en español e inglés.
module.exports = (c) => {
  const { gamas, estudios, mercados, medline, medData, retail, activos, t, img, lockup, pend, url, shell, orgLd, crumbLd, mapa, BASE } = c;
  const gById = Object.fromEntries(gamas.map(g => [g.id, g]));
  const extra = { clean: { id: 'clean', nombre: 'CLEAN', desc: 'skin', necesidad: { es: 'Limpieza', en: 'Cleansing' } }, wink: { id: 'wink', nombre: 'WINK', desc: 'eye care', necesidad: { es: 'Contorno de ojos', en: 'Eye care' } } };
  const gama = id => gById[id] || extra[id];
  const estProd = { silk: 'ceramides-cream', joy: 'ha-hibiscus-cream', glow: 'multivitamin-cocktail-concentrate', pure: 'salicylic-serum', blur: 'niacinamide-serum' };
  const actProd = { blur: 'niacinamide-serum', glow: 'c-age-defense-serum', silk: 'retinol-03-cream' };
  const preoc = { hidratacion: ['Hidratación', 'Hydration'], luminosidad: ['Luminosidad', 'Radiance'], manchas: ['Manchas', 'Dark spots'], antiedad: ['Antiedad', 'Pro-age'], grasa: ['Brillos e imperfecciones', 'Shine and blemishes'], sensible: ['Piel sensible', 'Sensitive skin'], limpieza: ['Limpieza', 'Cleansing'], ojos: ['Contorno de ojos', 'Eye care'], solar: ['Protección solar', 'Sun protection'] };

  return (L) => {
    const s = t[L]; const es = L === 'es'; const T = (a, b) => es ? a : b;
    const num = x => es ? String(x).replace('.', ',') : String(x);
    const pct = x => `${num(String(x).replace(/\.0$/, ''))}${es ? '&nbsp;' : ''}%`;
    const eur = x => es ? x.toFixed(2).replace('.', ',') + '&nbsp;€' : '€' + x.toFixed(2);
    const reg = pend(s.reg);
    const migas = items => `<nav class="migas" aria-label="${T('Ruta', 'Breadcrumb')}"><ol>${items.map(([n, u], i) => i < items.length - 1 ? `<li><a href="${u}">${n}</a></li>` : `<li aria-current="page">${n}</li>`).join('')}</ol></nav>`;
    const f = s.form;
    const field = (id, label, type = 'text', req = true, ac = '') => `
          <div class="field">
            <label for="${id}">${label}</label>
            <input id="${id}" name="${id}" type="${type}"${req ? ' required' : ''}${ac ? ` autocomplete="${ac}"` : ''} aria-describedby="${id}-err">
            <p class="err" id="${id}-err" hidden></p>
          </div>`;
    const opt = `<span class="opt">${f.msgHelp}</span>`;
    // Formulario único, con los campos que cualifican a cada tipo de contacto
    const form = (roles, sel, titulo) => `
        <form class="form" id="contacto" novalidate>
          <h2>${titulo}</h2>
          <fieldset class="rol">
            <legend>${f.rol}</legend>
            ${roles.map(([v, l]) => `<label><input type="radio" name="rol" value="${v}"${v === sel ? ' checked' : ''}> ${l}</label>`).join('\n            ')}
          </fieldset>
          <div class="fields">${field('nombre', f.nombre, 'text', true, 'name')}${field('empresa', f.empresa, 'text', true, 'organization')}${field('pais', f.pais, 'text', true, 'country-name')}${field('email', f.email, 'email', true, 'email')}
          </div>
          <div class="fields" data-solo="dist">
          <div class="field">
            <label for="canal">${T('Canal principal', 'Main channel')} ${opt}</label>
            <select id="canal" name="canal"><option value="">${T('Elige una opción', 'Choose an option')}</option><option>${T('Clínicas y medicina estética', 'Clinics and aesthetic medicine')}</option><option>${T('Centros de estética', 'Beauty centres')}</option><option>${T('Farmacia', 'Pharmacy')}</option><option>${T('Venta online', 'Online retail')}</option><option>${T('Otro', 'Other')}</option></select>
          </div>${field('web', s.webL + ' ' + opt, 'url', false, 'url')}
          </div>
          <div class="field">
            <label for="msg">${f.msg} ${opt}</label>
            <textarea id="msg" name="msg" rows="3"></textarea>
          </div>
          <button class="btn btn-solid" type="submit">${f.enviar}</button>
          <p class="ok" role="status" hidden>${f.ok}</p>
          <template id="msgs" data-req="${f.errReq}" data-email="${f.errEmail}" data-precio="${s.ctaPrecio}"></template>
        </form>`;
    const R = { dist: ['dist', f.rolDist], pro: ['pro', f.rolPro], cli: ['cli', T('Cliente', 'Customer')], otro: ['otro', T('Otro', 'Other')] };
    const cifras = `<dl class="cifras-g">${s.cifras.map(([a, b, d]) => `<div><dt>${a}${b ? `<br>${b}` : ''}</dt><dd>${d}</dd></div>`).join('')}</dl>`;
    const estMini = `<ul class="estm">${estudios.map(e => `<li style="--c:var(--${e.gama})"><span class="estm-n">${es ? e.valor + '&nbsp;%' : e.valorEn + '%'}</span><strong>${e[L]}, ${es ? e.plazoEs : e.plazoEn}</strong><a href="${url(L, 'prod', estProd[e.gama])}">${retail.find(p => p.id === estProd[e.gama]).nombre[L]}</a>${e.det.pend ? pend(e.det.pend[L]) : ''}</li>`).join('')}</ul>
      <p class="nota">${s.eficNota} <a href="${url(L, 'home')}#eficacia">${T('Ver cómo se midió cada estudio', 'See how each study was measured')}</a></p>`;
    const mapaSvg = mapa.replace('__TITLE__', s.mapaT).replace(/<path class="on"([^>]*)><title>[^<]*<\/title>/g, '<path class="on"$1>');
    const merc = `<div class="merc">
        <div class="merc-mapa">${mapaSvg}
          <p class="leyenda"><span><i class="l-on"></i>${s.mercH}</span><span><i class="l-bcn"></i>${s.bcn}</span></p>
        </div>
        <div class="merc-l"><h3>${s.mercH}</h3><ul>${mercados[L].map(m => `<li>${m}</li>`).join('')}</ul><p>${pend(s.mercPend)}</p></div>
      </div>`;
    const dl = arr => `<dl class="soporte">${arr.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>`;
    const pcard = p => { const g = gama(p.gama); return `
        <li data-gama="${p.gama}" data-pre="${p.preocupacion.join(' ')}"><a class="pc" href="${url(L, 'prod', p.id)}" style="--c:var(--${p.gama},var(--line))">
          <span class="pc-i">${img('prod-' + p.id, 1000, 1000, '')}${p.fotos[1] ? img(p.fotos[1], 1000, 1000, '', 'pc-b') : ''}</span>
          <span class="pc-g">${g.nombre} <em>${g.desc}</em></span>
          <span class="pc-n">${p.nombre[L]}</span>
          <span class="pc-m">${p.formato || ''}${p.precio ? ` · ${eur(p.precio)}` : ''}</span>
        </a></li>`; };
    const mcard = m => `
            <li><a class="med" href="${url(L, 'med', m.id)}">
              ${img('med-' + m.id, 640, 480, '')}
              <span class="med-n">${m.n}</span>
              <span class="med-m">${m.tipo === 'm' ? s.tipoM : s.tipoP}</span>
              <span class="med-cta">${T('Ver ficha', 'View product')}</span>
            </a></li>`;
    const out = [];
    const add = (key, id, o) => out.push({ url: url(L, key, id), html: shell(L, { key, id, ...o }) });

    // ---------- Distribuidores ----------
    add('dist', null, {
      title: T('Distribuidores | Labelist Cosmetics', 'Distributors | Labelist Cosmetics'),
      desc: T('Labelist busca un distribuidor por territorio para su línea profesional MedLine y su línea de casa. Qué ofrece la marca, cómo se empieza y cómo contactar.', 'Labelist is looking for one distributor per territory for its MedLine professional line and its homecare line. What the brand offers, how to start and how to get in touch.'),
      ld: [orgLd(L), crumbLd(L, [['Labelist', url(L, 'home')], [s.nav.dist, url(L, 'dist')]])], ogImg: 'puerta-dist',
      body: `
  <section class="ph ph-split">
    <div class="ph-txt">
      ${migas([['Labelist', url(L, 'home')], [s.nav.dist]])}
      <h1>${T('Un socio por territorio.', 'One partner per territory.')}</h1>
      <p class="lead">${T('Labelist es una marca de dermocosmética y mesoterapia de Barcelona. Trabaja con un distribuidor del canal profesional en cada mercado y le da formación, protocolos y materiales para abrirlo.', 'Labelist is a dermocosmetics and mesotherapy brand from Barcelona. It works with one professional-channel distributor in each market and provides the training, protocols and materials to open it.')}</p>
      <div class="actions"><a class="btn btn-solid" href="#contacto">${T('Solicitar información', 'Request information')}</a><a class="btn btn-line" href="#modelo">${T('Ver cómo funciona', 'See how it works')}</a></div>
    </div>
    <figure class="ph-fig">${img('puerta-dist', 1358, 1080, T('Cajas de producto Labelist de las dos líneas', 'Labelist product boxes from both lines'), '', false)}</figure>
  </section>

  <section class="band">
    <div class="w">${cifras}</div>
  </section>

  <section>
    <div class="w">
      <h2 class="h-sec">${T('Una marca, dos canales, las mismas gamas', 'One brand, two channels, the same ranges')}</h2>
      <p class="sec-p">${T('El profesional trata en cabina con MedLine y recomienda la línea de casa de la misma gama. El distribuidor vende las dos con un solo argumento.', 'The professional treats in the clinic with MedLine and recommends the homecare line from the same range. The distributor sells both with a single argument.')}</p>
      <div class="tabla-w"><table class="tabla">
        <caption class="vh">${T('Productos por gama y línea', 'Products by range and line')}</caption>
        <thead><tr><th scope="col">${T('Gama', 'Range')}</th><th scope="col">${T('Necesidad', 'Skin need')}</th><th scope="col">MedLine</th><th scope="col">${T('Línea de casa', 'Homecare')}</th></tr></thead>
        <tbody>${gamas.map(g => `<tr><th scope="row" style="--c:var(--${g.id})"><span class="dot"></span> ${lockup(g)}</th><td>${g.necesidad[L]}</td><td>${medline.filter(m => m.gama === g.id).map(m => m.n).join(', ')}</td><td>${retail.filter(p => p.gama === g.id).map(p => p.nombre[L]).join(', ') || T('Solo profesional', 'Professional only')}</td></tr>`).join('')}</tbody>
      </table></div>
      <p class="otras">${s.otras}</p>
      <div class="actions"><a class="btn btn-line" href="${url(L, 'pro')}">${s.ctaPro}</a><a class="btn btn-line" href="${url(L, 'shop')}">${T('Ver la línea de casa', 'View the homecare line')}</a></div>
    </div>
  </section>

  <section class="dark">
    <div class="w">
      <h2 class="h-sec">${T('Argumentos que se pueden enseñar', 'Arguments you can show')}</h2>
      <p class="sec-p">${s.eficP}</p>
      ${estMini}
      <h3 class="h-sub h-sub2">${T('Concentraciones declaradas', 'Declared concentrations')}</h3>
      <ul class="act">${activos.map(a => `<li style="--c:var(--${a.gama})"><span class="act-n">${a.pct[es ? 0 : 1]}${es ? '&nbsp;' : ''}%</span><strong>${a[L]}</strong><span>${a.prod[L]}</span></li>`).join('')}</ul>
    </div>
  </section>

  <section>
    <div class="w dos">
      <div><h2 class="h-sec">${s.recibeH}</h2>${dl(s.soporte)}</div>
      <div><h2 class="h-sec">${s.socioH}</h2>${dl(s.socio)}</div>
    </div>
  </section>

  <section class="band" id="modelo">
    <div class="w">
      <h2 class="h-sec">${T('Cómo funciona la colaboración', 'How the partnership works')} ${pend(s.pasosPend)}</h2>
      <div class="pasos"><ol>${s.pasos.map(([a, b]) => `<li><strong>${a}</strong><span>${b}</span></li>`).join('')}</ol></div>
      <p class="nota">${T('La logística es Ex Works desde Barcelona.', 'Logistics are Ex Works from Barcelona.')} ${pend(T('Pendiente: confirmar', 'Pending: confirm'))}</p>
      <h2 class="h-sec h-gap">${T('Dónde está Labelist', 'Where Labelist is')}</h2>
      ${merc}
    </div>
  </section>

  <section>
    <div class="w dos">
      <div>
        <h2 class="h-sec">${T('Cuéntanos tu territorio', 'Tell us about your territory')}</h2>
        <p class="sec-p">${T('Con el país, el canal y la web de tu empresa podemos decirte si el territorio está libre y enviarte la documentación comercial.', 'With your country, channel and company website we can tell you whether the territory is open and send you the commercial documentation.')}</p>
        <p class="sec-p">hello@labelistcosmetics.com<br>${s.horario}</p>
      </div>
      ${form([R.dist, R.pro], 'dist', s.formH)}
    </div>
  </section>` });

    // ---------- Profesional ----------
    const meso = medData.find(m => m.id === 'hydra-volume'), peel = medData.find(m => m.id === 'lacto-renewal');
    const comb = [...new Map(medData.filter(m => m.combinado && m.combinado.con.length).map(m => [m.combinado.nombre, [m.id, ...m.combinado.con]])).entries()];
    add('pro', null, {
      title: T('MedLine: mesocócteles y peelings profesionales | Labelist', 'MedLine: professional mesococktails and peels | Labelist'),
      desc: T('Catálogo MedLine de Labelist para médicos estéticos y centros de estética: 12 mesocócteles y 3 peelings organizados por necesidad, con su protocolo. Precio bajo solicitud.', 'The Labelist MedLine catalogue for aesthetic physicians and beauty centres: 12 mesococktails and 3 peels organised by skin need, each with its protocol. Pricing on request.'),
      ld: [crumbLd(L, [['Labelist', url(L, 'home')], [s.nav.pro, url(L, 'pro')]])], ogImg: 'medline-poster',
      body: `
  <section class="pro pro-page">
    <div class="pro-top">
      <div class="vid">
        <video src="/img/medline.mp4" poster="/img/medline-poster.webp" muted loop playsinline preload="none" aria-label="${s.videoMed}"></video>
        <button class="vid-btn" type="button" data-pausa="${s.pausa}" data-play="${s.play}">${s.play}</button>
      </div>
      <div class="pro-txt">
        ${migas([['Labelist', url(L, 'home')], [s.nav.pro]])}
        <img class="pro-logo" src="/img/logo-medline.svg" width="1128" height="191" alt="Labelist MedLine">
        <h1 class="h1-m">${T('12 mesocócteles y 3 peelings, organizados por necesidad.', '12 mesococktails and 3 peels, organised by skin need.')}</h1>
        <p>${T('MedLine es la línea de Labelist para médicos estéticos y centros de estética. Cada producto tiene su protocolo de cabina y una pauta de casa de la misma gama.', 'MedLine is the Labelist line for aesthetic physicians and beauty centres. Each product has its clinic protocol and a homecare routine from the same range.')}</p>
        <div class="actions"><a class="btn btn-solid" href="#contacto">${s.ctaPrecio}</a><a class="btn btn-line" href="#catalogo">${T('Ver el catálogo', 'View the catalogue')}</a></div>
      </div>
    </div>
  </section>

  <section id="catalogo">
    <div class="w">
      <h2 class="h-sec">${s.catH} ${reg}</h2>
      <p class="sec-p">${s.catP}</p>
      <ul class="cat-rows">${gamas.map(g => `
        <li class="cat-row" id="g-${g.id}" style="--c:var(--${g.id})">
          <div class="cat-l"><h3>${lockup(g)}</h3><p class="cat-need">${g.necesidad[L]}</p><p class="cat-proto">${g.proto[L]}</p></div>
          <ul class="cat-g">${medline.filter(m => m.gama === g.id).map(mcard).join('')}
          </ul>
        </li>`).join('')}
      </ul>
    </div>
  </section>

  <section class="band">
    <div class="w">
      <h2 class="h-sec">${T('El protocolo de cabina', 'The clinic protocol')} ${reg}</h2>
      <p class="sec-p">${T('Los viales son monodosis estériles y se usan enteros en la misma sesión. La secuencia es la misma para todos los mesocócteles; los peelings tienen la suya.', 'The vials are sterile single doses and are used entirely in the same session. The sequence is the same for every mesococktail; peels have their own.')}</p>
      <div class="dos dos-top">
        <div><h3 class="h-sub">${T('Mesocócteles', 'Mesococktails')}</h3><ol class="sec">${meso.pasos[L].map(p => { const [a, ...b] = p.split(': '); return `<li><strong>${a}</strong><span>${b.join(': ')}</span></li>`; }).join('')}</ol></div>
        <div><h3 class="h-sub">${T('Peelings', 'Peels')}</h3><ol class="sec">${peel.pasos[L].map(p => { const [a, ...b] = p.split(': '); return b.length ? `<li><strong>${a}</strong><span>${b.join(': ')}</span></li>` : `<li><span>${a}</span></li>`; }).join('')}</ol></div>
      </div>
      <h3 class="h-sub h-sub2">${T('Protocolos combinados', 'Combined protocols')}</h3>
      <p class="sec-p">${T('Los cócteles se pueden mezclar en la misma jeringa. Estas son las combinaciones documentadas.', 'Cocktails can be mixed in the same syringe. These are the documented combinations.')}</p>
      <ul class="comb">${comb.map(([n, ids]) => `<li><strong>${n}</strong><span>${ids.map(i => `<a href="${url(L, 'med', i)}">${medline.find(m => m.id === i).n}</a>`).join(' + ')}</span></li>`).join('')}</ul>
    </div>
  </section>

  <section>
    <div class="w dos">
      <div>
        <h2 class="h-sec">${T('Solicitar precio', 'Request pricing')}</h2>
        <p class="sec-p">${T('Los precios de MedLine se envían solo a profesionales. Indica tu centro y tu país y te mandamos la tarifa y la documentación técnica.', 'MedLine pricing is sent to professionals only. Tell us your clinic and country and we will send the price list and the technical documentation.')}</p>
        <p class="sec-p">${T('¿Quieres distribuir Labelist en tu país?', 'Would you like to distribute Labelist in your country?')} <a href="${url(L, 'dist')}">${T('Ver el modelo de distribución', 'See the distribution model')}</a></p>
      </div>
      ${form([R.pro, R.dist], 'pro', s.ctaPrecio)}
    </div>
  </section>` });

    // ---------- Ficha MedLine ----------
    for (const m of medData) {
      const g = gById[m.gama]; const p = m.protocolo; const casa = retail.filter(x => x.gama === m.gama);
      const otros = medline.filter(x => x.gama === m.gama && x.id !== m.id);
      const tipo = m.tipo === 'm' ? s.tipoM : s.tipoP;
      const precio = `${url(L, 'contact')}?rol=pro&prod=${encodeURIComponent(m.n)}`;
      add('med', m.id, {
        title: `${m.n}, ${tipo.toLowerCase()} MedLine ${g.nombre} | Labelist`,
        desc: m.resumen[L].slice(0, 155),
        ld: [crumbLd(L, [['Labelist', url(L, 'home')], [s.nav.pro, url(L, 'pro')], [m.n, url(L, 'med', m.id)]])], ogImg: 'med-' + m.id,
        body: `
  <section class="ficha" style="--c:var(--${m.gama})">
    <div class="w ficha-g">
      <div class="ficha-img">${img('med-' + m.id, 640, 480, `${m.n}, MedLine ${g.nombre} ${g.desc}`, '', false)}</div>
      <div class="ficha-txt">
        ${migas([['Labelist', url(L, 'home')], [s.nav.pro, url(L, 'pro')], [m.n]])}
        <p class="ficha-g1"><span class="dot"></span> ${lockup(g)} · ${tipo} MedLine</p>
        <h1 class="h1-m">${m.n}</h1>
        <p class="lead">${m.resumen[L]}</p>
        <p>${reg}</p>
        <dl class="datos">
          <div><dt>${T('Formato', 'Format')}</dt><dd>${m.formato[L]}</dd></div>
          <div><dt>${T('Sesiones', 'Sessions')}</dt><dd>${p.sesiones.replace('-', T(' a ', ' to '))}, ${p.intervalo[L]}</dd></div>
          ${p.mantenimiento ? `<div><dt>${T('Mantenimiento', 'Maintenance')}</dt><dd>${p.mantenimiento[L]}</dd></div>` : ''}
        </dl>
        <div class="actions"><a class="btn btn-solid" href="${precio}">${s.ctaPrecio}</a></div>
        <p class="ficha-nota">${T('Uso profesional. No se muestra precio.', 'Professional use. Pricing is not shown.')}</p>
      </div>
    </div>
  </section>

  <section class="band">
    <div class="w dos dos-top">
      <div>
        <h2 class="h-sub">${T('Indicado para', 'Indicated for')}</h2>
        <ul class="lista">${m.indicaciones[L].map(x => `<li>${x}</li>`).join('')}</ul>
      </div>
      <div>
        <h2 class="h-sub">${T('Activos principales', 'Main actives')}</h2>
        <ul class="activos">${m.activos.map(a => `<li><span>${a.n[L]}</span>${a.pct ? `<strong>${pct(a.pct)}</strong>` : ''}</li>`).join('')}</ul>
      </div>
    </div>
  </section>

  <section>
    <div class="w dos dos-top">
      <div>
        <h2 class="h-sub">${T('Protocolo de cabina', 'Clinic protocol')}</h2>
        <p class="sec-p">${p.tecnica[L]}</p>
        ${m.pasos[L].length ? `<ol class="sec">${m.pasos[L].map(x => { const [a, ...b] = x.split(': '); return b.length ? `<li><strong>${a}</strong><span>${b.join(': ')}</span></li>` : `<li><span>${a}</span></li>`; }).join('')}</ol>` : `<p>${pend(T('Dato pendiente: secuencia de cabina específica para esta zona', 'Pending: clinic sequence specific to this area'))}</p>`}
        ${m.combinado && m.combinado.con.length ? `<p class="comb1"><strong>${T('Protocolo combinado', 'Combined protocol')} ${m.combinado.nombre}.</strong> ${T('Se mezcla con', 'Mixed with')} ${m.combinado.con.map(i => `<a href="${url(L, 'med', i)}">${medline.find(x => x.id === i).n}</a>`).join(', ')}.</p>` : ''}
      </div>
      <div>
        <h2 class="h-sub">${T('Precauciones', 'Precautions')}</h2>
        ${m.precauciones[L].length ? `<ul class="lista">${m.precauciones[L].map(x => `<li>${x}</li>`).join('')}</ul>` : `<p>${pend(T('Dato pendiente', 'Pending'))}</p>`}
        ${m.tipo === 'p' && ['pigment-control', 'salicylic-balance'].includes(m.id) ? `<p>${pend(T('Dato pendiente: contraindicaciones específicas', 'Pending: specific contraindications'))}</p>` : ''}
      </div>
    </div>
  </section>

  <section class="tint" style="--c:var(--${m.gama})">
    <div class="w">
      <h2 class="h-sec">${casa.length ? T(`El mantenimiento en casa de ${g.nombre}`, `${g.nombre} homecare maintenance`) : T('Esta gama es solo profesional', 'This range is professional only')}</h2>
      ${casa.length ? `<ul class="pgrid">${casa.map(pcard).join('')}</ul>` : ''}
      ${otros.length ? `<h3 class="h-sub h-sub2">${T(`Más MedLine en ${g.nombre}`, `More MedLine in ${g.nombre}`)}</h3><ul class="cat-g cat-g4">${otros.map(mcard).join('')}</ul>` : ''}
      <div class="actions h-gap"><a class="btn btn-solid" href="${precio}">${s.ctaPrecio}</a><a class="btn btn-line" href="${url(L, 'pro')}#catalogo">${T('Volver al catálogo', 'Back to the catalogue')}</a></div>
    </div>
  </section>` });
    }

    // ---------- Tienda ----------
    const gShop = ['joy', 'glow', 'blur', 'silk', 'pure', 'clean', 'wink'];
    const preUsadas = Object.keys(preoc).filter(k => retail.some(p => p.preocupacion.includes(k)));
    add('shop', null, {
      title: T('Tienda: dermocosmética para casa | Labelist', 'Shop: homecare dermocosmetics | Labelist'),
      desc: T('La línea de casa de Labelist: sérums, cremas, limpieza, contorno de ojos y solar, con la concentración de sus activos declarada. Filtra por gama o por necesidad.', 'The Labelist homecare line: serums, creams, cleansing, eye care and sun care, with declared active concentrations. Filter by range or by skin need.'),
      ld: [crumbLd(L, [['Labelist', url(L, 'home')], [s.nav.tienda, url(L, 'shop')]])], ogImg: 'puerta-tienda',
      body: `
  <section class="ph">
    <div class="w">
      ${migas([['Labelist', url(L, 'home')], [s.nav.tienda]])}
      <h1 class="h1-m">${T('La línea de casa', 'The homecare line')}</h1>
      <p class="lead">${T('Veinte productos organizados por necesidad de la piel. Cada ficha indica qué activos lleva y en qué concentración.', 'Twenty products organised by skin need. Each product page states which actives it contains and at what concentration.')}</p>
      <div class="filtros" hidden>
        <div class="filtro" role="group" aria-label="${T('Filtrar por gama', 'Filter by range')}">
          <button type="button" class="chip" data-f="gama" data-v="" aria-pressed="true">${T('Todas las gamas', 'All ranges')}</button>${gShop.map(k => `<button type="button" class="chip" data-f="gama" data-v="${k}" aria-pressed="false" style="--c:var(--${k},var(--line))">${gama(k).nombre} <em>${gama(k).desc}</em></button>`).join('')}
        </div>
        <div class="filtro" role="group" aria-label="${T('Filtrar por necesidad', 'Filter by skin need')}">
          <button type="button" class="chip" data-f="pre" data-v="" aria-pressed="true">${T('Todas las necesidades', 'All skin needs')}</button>${preUsadas.map(k => `<button type="button" class="chip" data-f="pre" data-v="${k}" aria-pressed="false">${preoc[k][es ? 0 : 1]}</button>`).join('')}
        </div>
        <p class="cuenta" role="status" data-uno="${T('producto', 'product')}" data-n="${T('productos', 'products')}"></p>
      </div>
      <ul class="pgrid" id="lista">${retail.map(pcard).join('')}
      </ul>
      <p class="vacio" hidden>${T('Ningún producto coincide con los dos filtros. Quita uno para ver más.', 'No product matches both filters. Remove one to see more.')}</p>
      <p class="nota">${T('Tienda simulada: los precios son los de la web actual y el carrito no procesa pedidos.', 'Simulated shop: prices are those of the current website and the cart does not process orders.')}</p>
    </div>
  </section>` });

    // ---------- Ficha de casa ----------
    for (const p of retail) {
      const g = gama(p.gama); const e = estudios.find(x => estProd[x.gama] === p.id);
      const cab = medline.filter(m => m.gama === p.gama); const comp = retail.filter(x => x.gama === p.gama && x.id !== p.id);
      const cuando = { am: T('Por la mañana', 'In the morning'), pm: T('Por la noche', 'At night'), ampm: T('Mañana y noche', 'Morning and night') }[p.cuando];
      add('prod', p.id, {
        title: `${p.nombre[L]} ${g.nombre} | Labelist`,
        desc: p.resumen[L].slice(0, 155),
        ld: [crumbLd(L, [['Labelist', url(L, 'home')], [s.nav.tienda, url(L, 'shop')], [p.nombre[L], url(L, 'prod', p.id)]]),
          Object.assign({ '@context': 'https://schema.org', '@type': 'Product', name: p.nombre[L], description: p.resumen[L], image: `${BASE}/img/prod-${p.id}.webp`, brand: { '@type': 'Brand', name: 'Labelist' }, category: p.tipo[L] }, p.precio ? { offers: { '@type': 'Offer', price: p.precio.toFixed(2), priceCurrency: 'EUR', url: BASE + url(L, 'prod', p.id) } } : {})],
        ogImg: 'prod-' + p.id,
        body: `
  <section class="ficha" style="--c:var(--${p.gama},var(--line))">
    <div class="w ficha-g">
      <div class="galeria">
        <div class="ficha-img">${img('prod-' + p.id, 1000, 1000, `${p.nombre[L]}, ${g.nombre} ${g.desc}`, '', false)}</div>
        ${p.fotos.length > 1 ? `<div class="miniaturas" role="group" aria-label="${T('Más fotos del producto', 'More product photos')}">${p.fotos.map((f, i) => `<button type="button" aria-pressed="${i === 0}" data-src="/img/${f}.webp"><img src="/img/${f}.webp" width="120" height="120" alt="${T('Foto', 'Photo')} ${i + 1}" loading="lazy"></button>`).join('')}</div>` : ''}
      </div>
      <div class="ficha-txt">
        ${migas([['Labelist', url(L, 'home')], [s.nav.tienda, url(L, 'shop')], [p.nombre[L]]])}
        <p class="ficha-g1"><span class="dot"></span> ${lockup(g)} · ${g.necesidad[L]}</p>
        <h1 class="h1-m">${p.nombre[L]}</h1>
        <p class="lead">${p.resumen[L]}</p>
        <dl class="datos">
          <div><dt>${T('Formato', 'Size')}</dt><dd>${p.formato || '-'}</dd></div>
          <div><dt>${T('Cuándo', 'When')}</dt><dd>${cuando}</dd></div>
          ${p.textura ? `<div><dt>${T('Textura', 'Texture')}</dt><dd>${p.textura[L]}</dd></div>` : ''}
        </dl>
        <p class="precio">${p.precio ? eur(p.precio) : pend(T('Dato pendiente: precio', 'Pending: price'))}</p>
        <div class="actions"><button class="btn btn-solid" type="button" data-add="${p.nombre[L]}"${p.precio ? '' : ' disabled'}>${T('Añadir al carrito', 'Add to cart')}</button></div>
        <p class="ok" role="status" hidden data-msg="${T('Añadido. El carrito de este prototipo es simulado.', 'Added. The cart in this prototype is simulated.')}"></p>
      </div>
    </div>
  </section>

  <section class="band">
    <div class="w">
      <h2 class="h-sec">${T('Qué lleva y en qué concentración', 'What it contains and at what concentration')}</h2>
      <ul class="act act-f">${p.activos.map(a => `<li>${a.pct ? `<span class="act-n">${pct(a.pct)}</span>` : `<span class="act-n act-0" aria-hidden="true">·</span>`}<strong>${a.n[L]}</strong><span>${a.fn[L]}</span></li>`).join('')}</ul>
    </div>
  </section>

  <section>
    <div class="w dos dos-top">
      <div>
        <h2 class="h-sub">${T('Cómo se usa', 'How to use')}</h2>
        <p class="sec-p">${p.uso[L]}</p>
        ${p.inci ? `<details class="inci"><summary>${T('Ingredientes (INCI)', 'Ingredients (INCI)')}</summary><p>${p.inci}</p></details>` : ''}
      </div>
      <div>
        ${e ? `<h2 class="h-sub">${T('Lo que se midió', 'What was measured')}</h2>
        <p class="ev-num">${es ? e.valor + '&nbsp;%' : e.valorEn + '%'}</p>
        <p class="sec-p">${e[L]}, ${es ? e.plazoEs : e.plazoEn}. ${T('Mejora media en 20 voluntarias, con', 'Mean improvement in 20 volunteers, measured with')} ${e.det.ap[0]}. ${e.det.pend ? pend(e.det.pend[L]) : ''}</p>
        <p><a href="${url(L, 'home')}#est-${e.gama}">${T('Ver el estudio', 'See the study')}</a></p>` : `<h2 class="h-sub">${T('Estudio de eficacia', 'Efficacy study')}</h2><p class="sec-p">${T('Este producto no tiene estudio propio publicado.', 'This product has no published study of its own.')}</p>`}
      </div>
    </div>
  </section>

  <section class="tint">
    <div class="w">
      ${cab.length ? `<h2 class="h-sec">${T(`${g.nombre} en cabina`, `${g.nombre} in the clinic`)} ${reg}</h2>
      <p class="sec-p">${T('Esta gama tiene tratamiento profesional. Lo aplica un médico estético o un centro de estética con MedLine.', 'This range has a professional treatment. It is applied by an aesthetic physician or a beauty centre using MedLine.')}</p>
      <p class="chips">${cab.map(m => `<a class="chip" href="${url(L, 'med', m.id)}">${m.n}</a>`).join('')}</p>` : ''}
      ${comp.length ? `<h2 class="h-sec${cab.length ? ' h-gap' : ''}">${T(`Para combinar en ${g.nombre}`, `To combine within ${g.nombre}`)}</h2><ul class="pgrid">${comp.map(pcard).join('')}</ul>` : ''}
      <div class="actions h-gap"><a class="btn btn-line" href="${url(L, 'shop')}">${T('Volver a la tienda', 'Back to the shop')}</a></div>
    </div>
  </section>` });
    }

    // ---------- Sobre Labelist ----------
    add('about', null, {
      title: T('Sobre Labelist: dermocosmética y mesoterapia de Barcelona', 'About Labelist: dermocosmetics and mesotherapy from Barcelona'),
      desc: T('Qué es Labelist: una marca de Barcelona con una línea profesional y una línea de casa que comparten gamas, concentraciones declaradas y eficacia medida en estudios.', 'What Labelist is: a Barcelona brand with a professional line and a homecare line that share ranges, declared concentrations and efficacy measured in studies.'),
      ld: [orgLd(L), crumbLd(L, [['Labelist', url(L, 'home')], [s.nav.sobre, url(L, 'about')]])], ogImg: 'marca-poster',
      body: `
  <section class="ph ph-split">
    <div class="ph-txt">
      ${migas([['Labelist', url(L, 'home')], [s.nav.sobre]])}
      <h1>${T('La misma ciencia, en cabina y en casa.', 'The same science, in the clinic and at home.')}</h1>
      <p class="lead">${T('Labelist es una marca de dermocosmética y mesoterapia de Barcelona. Hace productos para el profesional y para casa con el mismo criterio: decir qué lleva cada fórmula y medir lo que consigue.', 'Labelist is a dermocosmetics and mesotherapy brand from Barcelona. It makes products for the professional and for home use by the same standard: state what each formula contains and measure what it achieves.')}</p>
    </div>
    <div class="vid ph-fig">
      <video src="/img/marca.mp4" poster="/img/marca-poster.webp" muted loop playsinline preload="none" aria-label="${s.videoLabel}"></video>
      <button class="vid-btn" type="button" data-pausa="${s.pausa}" data-play="${s.play}">${s.play}</button>
    </div>
  </section>

  <section class="band"><div class="w">${cifras}</div></section>

  <section>
    <div class="w">
      <h2 class="h-sec">${T('Tres ideas que ordenan la marca', 'Three ideas that shape the brand')}</h2>
      <ol class="ideas">
        <li><h3>${T('Una gama por necesidad', 'One range per skin need')}</h3><p>${T('Hidratación, luminosidad, manchas, antiedad, brillos e imperfecciones y cabello. Cada necesidad tiene su nombre y su color, y es la misma en las dos líneas.', 'Hydration, radiance, dark spots, pro-age, shine and blemishes, and hair. Each need has its own name and colour, the same across both lines.')}</p></li>
        <li><h3>${T('Se trata en cabina, se mantiene en casa', 'Treated in the clinic, maintained at home')}</h3><p>${T('El profesional trabaja con MedLine y recomienda la pauta de casa de la misma gama. El resultado de la cabina no depende de un producto ajeno.', 'The professional works with MedLine and recommends the homecare routine from the same range. The clinic result does not depend on another brand\'s product.')}</p></li>
        <li><h3>${T('Fórmulas que declaran lo que llevan', 'Formulas that state what is in them')}</h3><p>${T('Cada ficha indica la concentración de sus activos principales, y cinco fórmulas tienen estudio de eficacia con medición instrumental.', 'Each product sheet states the concentration of its main actives, and five formulas have an efficacy study with instrumental measurement.')}</p></li>
      </ol>
    </div>
  </section>

  <section class="tint tint-g">
    <div class="w">
      <h2 class="h-sec">${T('Las gamas', 'The ranges')}</h2>
      <ul class="gamas-l">${gamas.map(g => `<li style="--c:var(--${g.id})"><h3>${lockup(g)}</h3><p>${g.necesidad[L]}</p><p class="gl-m">MedLine: ${medline.filter(m => m.gama === g.id).length} · ${T('Casa', 'Homecare')}: ${retail.filter(p => p.gama === g.id).length}</p></li>`).join('')}</ul>
      <p class="otras">${s.otras}</p>
      <div class="actions"><a class="btn btn-line" href="${url(L, 'shop')}">${T('Ver la línea de casa', 'View the homecare line')}</a><a class="btn btn-line" href="${url(L, 'pro')}">${s.ctaPro}</a></div>
    </div>
  </section>

  <section class="dark">
    <div class="w">
      <h2 class="h-sec">${s.eficH}</h2>
      <p class="sec-p">${s.eficP}</p>
      ${estMini}
    </div>
  </section>

  <section>
    <div class="w dos">
      <div>
        <h2 class="h-sec">${T('Hecho en Barcelona', 'Made in Barcelona')}</h2>
        <p class="sec-p">${T('Fabricado en Barcelona en instalaciones certificadas ISO 22716 e ISO 13485.', 'Made in Barcelona in facilities certified to ISO 22716 and ISO 13485.')}</p>
        <p class="sec-p">${T('Desde Barcelona, Labelist llega a otros mercados con un distribuidor por territorio.', 'From Barcelona, Labelist reaches other markets through one distributor per territory.')}</p>
        <div class="actions"><a class="btn btn-solid" href="${url(L, 'dist')}">${s.ctaDist}</a><a class="btn btn-line" href="${url(L, 'contact')}">${s.contactoH}</a></div>
      </div>
      <ul class="act act-2">${activos.slice(0, 4).map(a => `<li style="--c:var(--${a.gama})"><span class="act-n">${a.pct[es ? 0 : 1]}${es ? '&nbsp;' : ''}%</span><strong>${a[L]}</strong><span>${a.prod[L]}</span></li>`).join('')}</ul>
    </div>
  </section>` });

    // ---------- Contacto ----------
    add('contact', null, {
      title: T('Contacto | Labelist Cosmetics', 'Contact | Labelist Cosmetics'),
      desc: T('Contacta con Labelist: distribuidores, profesionales que quieren el precio de MedLine y clientes de la línea de casa.', 'Contact Labelist: distributors, professionals requesting MedLine pricing and homecare customers.'),
      ld: [orgLd(L), crumbLd(L, [['Labelist', url(L, 'home')], [s.contactoH, url(L, 'contact')]])],
      body: `
  <section class="ph">
    <div class="w dos">
      <div>
        ${migas([['Labelist', url(L, 'home')], [s.contactoH]])}
        <h1 class="h1-m">${T('Escríbenos', 'Write to us')}</h1>
        <p class="lead">${T('Dinos quién eres y te responde la persona adecuada.', 'Tell us who you are and the right person will reply.')}</p>
        <dl class="soporte">
          <div><dt>${T('Correo', 'Email')}</dt><dd>hello@labelistcosmetics.com</dd></div>
          <div><dt>${T('Horario', 'Opening hours')}</dt><dd>${s.horario}</dd></div>
          <div><dt>${T('Dirección', 'Address')}</dt><dd>${s.foot.dir}</dd></div>
        </dl>
        <p class="sec-p">${T('Si quieres distribuir Labelist, en la página de distribuidores tienes el modelo completo.', 'If you would like to distribute Labelist, the distributors page explains the full model.')} <a href="${url(L, 'dist')}">${s.nav.dist}</a></p>
      </div>
      ${form([R.dist, R.pro, R.cli, R.otro], 'cli', T('Formulario de contacto', 'Contact form'))}
    </div>
  </section>` });

    return out;
  };
};
