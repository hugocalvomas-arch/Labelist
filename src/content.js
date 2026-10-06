// Contenido de la home. Todo dato visible sale de aquí.
// Rebranding: cambiar nombres, colores e imágenes en este archivo y en css/tokens.css.

const gamas = [
  {
    id: 'joy', nombre: 'JOY', desc: 'hydrat',
    necesidad: { es: 'Hidratación', en: 'Hydration' },
    casa: {
      img: 'casa-joy', w: 869, h: 900,
      productos: {
        es: ['Sérum con Ácido hialurónico + B5', 'Crema con Ácido hialurónico + Hibiscus', 'Sérum Cica Recovery'],
        en: ['Hyaluronic Acid + B5 Serum', 'Hyaluronic Acid + Hibiscus Cream', 'Cica Recovery Serum'],
      },
    },
    cabina: {
      img: 'vial-hydra-volume',
      productos: [
        { n: 'Hydra Volume', es: 'Hidratación, volumen y elasticidad', en: 'Hydration, volume and elasticity' },
        { n: 'Cell Energy', es: 'Nutrición y revitalización', en: 'Nourishing and revitalizing' },
        { n: 'Skin Repair', es: 'Textura y regeneración', en: 'Skin texture and regeneration' },
        { n: 'Lacto Renewal', es: 'Peeling. Hidratación y renovación', en: 'Peel. Moisturizing and renewal' },
      ],
    },
  },
  {
    id: 'glow', nombre: 'GLOW', desc: 'antiox',
    necesidad: { es: 'Luminosidad', en: 'Radiance' },
    casa: {
      img: 'casa-glow', w: 870, h: 900,
      productos: {
        es: ['Sérum con Vitamina C + GAG', 'Sérum C+ AGE Defense', 'Scrub Curcumin Bloom'],
        en: ['Vitamin C + GAG Serum', 'C+ AGE Defense Serum', 'Curcumin Bloom Scrub'],
      },
    },
    cabina: {
      img: 'vial-radiance',
      productos: [
        { n: 'Radiance', es: 'Iluminación y firmeza', en: 'Brightening and firming' },
        { n: 'Glow Boost', es: 'Potencia la luminosidad global', en: 'Skin luminosity' },
      ],
    },
  },
  {
    id: 'blur', nombre: 'BLUR', desc: 'dark spots',
    necesidad: { es: 'Manchas', en: 'Dark spots' },
    casa: {
      img: 'casa-blur', w: 868, h: 900,
      productos: {
        es: ['Sérum con Niacinamida', 'Crema antimanchas Niolac'],
        en: ['Niacinamide Serum', 'Dark Spots Cream Niolac'],
      },
    },
    cabina: {
      img: 'vial-spot-corrector',
      productos: [
        { n: 'Spot Corrector', es: 'Antimanchas y unificación del tono', en: 'Dark spots correction and tone unification' },
        { n: 'Pigment Balance', es: 'Control de la melanina', en: 'Melanin harmony' },
        { n: 'Pigment Control', es: 'Peeling. Reducción de manchas y tono uniforme', en: 'Peel. Dark spot reduction and even tone' },
      ],
    },
  },
  {
    id: 'silk', nombre: 'SILK', desc: 'proage',
    necesidad: { es: 'Antiedad', en: 'Pro-age' },
    casa: {
      img: 'casa-silk', w: 869, h: 900,
      productos: {
        es: ['Retinol 0.15% Sérum', 'Crema con Retinol 0.3%', 'Crema con Ceramidas', 'Crema solar fluida SPF50'],
        en: ['Retinol 0.15% Serum', '0.3% Retinol Cream', 'Ceramides Cream', 'Fluid Sunscreen SPF50 Proage'],
      },
    },
    cabina: {
      img: 'vial-youth-restore',
      productos: [
        { n: 'Youth Restore', es: 'Regeneración y rejuvenecimiento', en: 'Regeneration and rejuvenation' },
        { n: 'Firming Essence', es: 'Reafirmante y antiarrugas', en: 'Firming and anti-wrinkle' },
        { n: 'Expression Relax', es: 'Líneas dinámicas', en: 'Dynamic wrinkles' },
        { n: 'Eye Flash', es: 'Biorevitalización periocular', en: 'Periocular biorevitalization' },
      ],
    },
  },
  {
    id: 'pure', nombre: 'PURE', desc: 'shine control',
    necesidad: { es: 'Brillos e imperfecciones', en: 'Shine and blemishes' },
    casa: {
      img: 'casa-pure', w: 614, h: 636,
      productos: {
        es: ['Sérum con Ácido Salicílico', 'Crema con Salicílico que Cuida el Microbioma', 'Gel con Ácido Glicólico + AHAs'],
        en: ['Salicylic Acid Serum', 'Salicylic Acid Cream that Supports the Microbiome', 'Glycolic Acid + AHA Gel'],
      },
    },
    cabina: {
      img: 'peel-pure', w: 900, h: 652,
      productos: [
        { n: 'Salicylic Balance', es: 'Peeling. Purificación y control del sebo', en: 'Peel. Purifying and sebum control' },
      ],
    },
  },
  {
    id: 'root', nombre: 'ROOT', desc: 'structure',
    necesidad: { es: 'Cabello', en: 'Hair' },
    casa: null,
    cabina: {
      img: 'vial-hair-density',
      productos: [
        { n: 'Hair Density', es: 'Refuerzo capilar', en: 'Hair reinforcement' },
      ],
    },
  },
];

// Cifras tomadas de los informes de estudio. 20 voluntarios por estudio.
const estudios = [
  { gama: 'silk', prod: 'SILK proage · Ceramides', es: 'Firmeza', en: 'Firmness', valor: '18,23', valorEn: '18.23', plazoEs: '28 días', plazoEn: '28 days', informe: 'M23d4737' },
  { gama: 'joy', prod: 'JOY hydrat · HA + Hibiscus', es: 'Hidratación', en: 'Hydration', valor: '21,64', valorEn: '21.64', plazoEs: '72 horas', plazoEn: '72 hours', informe: 'M23d4753' },
  { gama: 'glow', prod: 'GLOW antiox · Multivitamin Cocktail', es: 'Firmeza', en: 'Firmness', valor: '21,00', valorEn: '21.00', plazoEs: '28 días', plazoEn: '28 days', informe: 'M23d4752' },
  { gama: 'pure', prod: 'PURE shine control · Salicylic', es: 'Reducción de sebo', en: 'Sebum reduction', valor: '20,73', valorEn: '20.73', plazoEs: '28 días', plazoEn: '28 days', informe: 'M23d4747' },
  { gama: 'blur', prod: 'BLUR dark spots · Niacinamide', es: 'Reducción de melanina', en: 'Melanin reduction', valor: '11,71', valorEn: '11.71', plazoEs: '28 días', plazoEn: '28 days', informe: 'M23d4754' },
];

// Fuente: brief comercial de ferias. Lista pendiente de confirmar para publicación.
const mercados = {
  es: ['Rusia', 'Ucrania', 'Países Bálticos', 'México', 'Polonia', 'Emiratos Árabes Unidos', 'Chipre', 'Vietnam'],
  en: ['Russia', 'Ukraine', 'Baltic countries', 'Mexico', 'Poland', 'United Arab Emirates', 'Cyprus', 'Vietnam'],
};

const t = {
  es: {
    lang: 'es', other: 'en', otherLabel: 'English', otherHref: '/en/', home: '/',
    title: 'Labelist Cosmetics | Dermocosmética y mesoterapia de Barcelona',
    metaDesc: 'Dermocosmética y mesoterapia formuladas y fabricadas en Barcelona. Línea de casa y línea profesional MedLine, con eficacia medida en estudios.',
    proto: 'Prototipo de la home. Las etiquetas amarillas señalan datos por confirmar.',
    skip: 'Saltar al contenido',
    nav: { tienda: 'Tienda', pro: 'Profesional', dist: 'Distribuidores', sobre: 'Sobre Labelist', carrito: 'Carrito', menu: 'Menú' },
    h1: 'La misma ciencia, en cabina y en casa.',
    heroSub: 'Dermocosmética y mesoterapia de Barcelona. Fórmulas con concentraciones declaradas y eficacia medida en estudios.',
    ctaDist: 'Ser distribuidor', ctaTienda: 'Comprar en la tienda', ctaPro: 'Ver catálogo MedLine', ctaPrecio: 'Solicitar precio',
    heroCap: 'Gama BLUR: sérum de casa, peeling y vial profesional.',
    heroAlt: 'Sérum Niacinamide, peeling y vial Spot Corrector de la gama BLUR de Labelist',
    prueba: [
      ['Fabricado en Barcelona', 'En instalaciones certificadas ISO 22716 e ISO 13485.'],
      ['Eficacia medida', 'Cinco fórmulas con estudio instrumental en 20 voluntarios cada una.'],
      ['Dos líneas, un criterio', 'Unas 20 referencias para casa y MedLine para profesionales: 12 mesocócteles y 3 peelings.'],
    ],
    puertasH: 'Tres formas de trabajar con Labelist',
    puertas: {
      tienda: ['Tienda', 'La línea de casa, con compra directa y envío a domicilio.'],
      pro: ['Profesional', 'MedLine: mesocócteles y peelings con su protocolo de cabina.'],
      dist: ['Distribuidores', 'Un socio por territorio, con formación y materiales.'],
    },
    sistemaH: 'Cada necesidad se trata en cabina y se mantiene en casa.',
    sistemaP: 'Las dos líneas comparten gamas. Elige una para ver qué producto corresponde a cada contexto.',
    casa: 'En casa', cabina: 'En cabina',
    sinCasa: 'Esta gama es solo profesional.',
    otras: 'La línea de casa incluye además CLEAN (limpieza) y WINK (contorno de ojos).',
    reg: 'Pendiente validación regulatoria',
    proH: '12 mesocócteles y 3 peelings, cada uno con su protocolo.',
    proP: 'El catálogo MedLine es para profesionales. Mostramos ficha técnica y protocolo, y enviamos el precio a quien lo solicita.',
    proAlt: 'Viales MedLine Hydra Volume, Spot Corrector y Youth Restore',
    eficH: 'Lo que midieron los estudios',
    eficP: 'Mediciones instrumentales en voluntarios adultos, antes y después de usar el producto.',
    eficCols: ['Producto', 'Parámetro', 'Mejora media', 'Plazo', 'Informe'],
    eficNota: 'Cada estudio se hizo con 20 voluntarios. El informe completo está disponible para distribuidores.',
    fabH: 'Fórmulas que declaran lo que llevan',
    fabP1: 'El catálogo indica la concentración de los activos principales de cada producto: niacinamida al 13&nbsp;%, vitamina C al 15&nbsp;%, retinol al 0,3&nbsp;%.',
    fabP2: 'Fabricado en Barcelona en instalaciones certificadas ISO 22716 e ISO 13485.',
    fabAlt: 'Texturas de sérum, gel y crema sobre discos blancos',
    distH: 'Un socio por territorio',
    distP: 'Trabajamos con distribuidores del canal profesional y les damos lo necesario para abrir su mercado.',
    soporte: [
      ['Formación de producto', 'Técnica y comercial, para el equipo del distribuidor.'],
      ['Protocolos documentados', 'Paso a paso, por línea y por necesidad de la piel.'],
      ['Materiales comerciales', 'Fichas, catálogos y argumentarios listos para usar.'],
      ['Soporte continuo', 'Consultas científicas y comerciales durante toda la relación.'],
    ],
    mercH: 'Mercados activos',
    mercPend: 'Dato pendiente: confirmar qué países se pueden publicar',
    formH: 'Escríbenos',
    form: {
      rol: 'Soy', rolDist: 'Distribuidor', rolPro: 'Profesional',
      nombre: 'Nombre y apellidos', empresa: 'Empresa o centro', pais: 'País', email: 'Correo electrónico', msg: 'Mensaje', msgHelp: 'Opcional',
      enviar: 'Enviar solicitud',
      errReq: 'Escribe este dato.', errEmail: 'Escribe un correo válido, por ejemplo nombre@empresa.com.',
      ok: 'Solicitud registrada. Este prototipo todavía no envía datos.',
    },
    foot: { legal: 'Aviso legal', priv: 'Política de privacidad', cookies: 'Política de cookies', dir: 'Skin and Soul SL, Pg. Manuel Girona 71, 08034 Barcelona' },
    licencia: 'Licencia de imagen por confirmar',
  },
  en: {
    lang: 'en', other: 'es', otherLabel: 'Español', otherHref: '/', home: '/en/',
    title: 'Labelist Cosmetics | Dermocosmetics and mesotherapy from Barcelona',
    metaDesc: 'Dermocosmetics and mesotherapy formulated and made in Barcelona. A homecare line and the MedLine professional line, with efficacy measured in studies.',
    proto: 'Homepage prototype. Yellow tags mark data still to be confirmed.',
    skip: 'Skip to content',
    nav: { tienda: 'Shop', pro: 'Professional', dist: 'Distributors', sobre: 'About Labelist', carrito: 'Cart', menu: 'Menu' },
    h1: 'The same science, in the clinic and at home.',
    heroSub: 'Dermocosmetics and mesotherapy from Barcelona. Formulas with declared concentrations and efficacy measured in studies.',
    ctaDist: 'Become a distributor', ctaTienda: 'Shop the range', ctaPro: 'View MedLine catalogue', ctaPrecio: 'Request pricing',
    heroCap: 'BLUR range: homecare serum, peel and professional vial.',
    heroAlt: 'Niacinamide serum, peel and Spot Corrector vial from the Labelist BLUR range',
    prueba: [
      ['Made in Barcelona', 'In facilities certified to ISO 22716 and ISO 13485.'],
      ['Measured efficacy', 'Five formulas with an instrumental study on 20 volunteers each.'],
      ['Two lines, one standard', 'Around 20 homecare products and MedLine for professionals: 12 mesococktails and 3 peels.'],
    ],
    puertasH: 'Three ways to work with Labelist',
    puertas: {
      tienda: ['Shop', 'The homecare line, bought direct and delivered to your door.'],
      pro: ['Professional', 'MedLine: mesococktails and peels with their clinic protocol.'],
      dist: ['Distributors', 'One partner per territory, with training and materials.'],
    },
    sistemaH: 'Every skin need is treated in the clinic and maintained at home.',
    sistemaP: 'Both lines share the same ranges. Pick one to see which product belongs to each setting.',
    casa: 'At home', cabina: 'In the clinic',
    sinCasa: 'This range is professional only.',
    otras: 'The homecare line also includes CLEAN (cleansing) and WINK (eye care).',
    reg: 'Pending regulatory review',
    proH: '12 mesococktails and 3 peels, each with its own protocol.',
    proP: 'The MedLine catalogue is for professionals. We show the technical sheet and protocol, and send pricing on request.',
    proAlt: 'MedLine vials: Hydra Volume, Spot Corrector and Youth Restore',
    eficH: 'What the studies measured',
    eficP: 'Instrumental measurements on adult volunteers, before and after using the product.',
    eficCols: ['Product', 'Parameter', 'Mean improvement', 'Period', 'Report'],
    eficNota: 'Each study had 20 volunteers. The full report is available to distributors.',
    fabH: 'Formulas that state what is in them',
    fabP1: 'The catalogue lists the concentration of the main actives in each product: niacinamide at 13%, vitamin C at 15%, retinol at 0.3%.',
    fabP2: 'Made in Barcelona in facilities certified to ISO 22716 and ISO 13485.',
    fabAlt: 'Serum, gel and cream textures on white discs',
    distH: 'One partner per territory',
    distP: 'We work with distributors in the professional channel and give them what they need to open their market.',
    soporte: [
      ['Product training', 'Technical and commercial, for the distributor\'s team.'],
      ['Documented protocols', 'Step by step, by line and by skin need.'],
      ['Sales materials', 'Product sheets, catalogues and sales arguments, ready to use.'],
      ['Ongoing support', 'Scientific and commercial queries throughout the partnership.'],
    ],
    mercH: 'Active markets',
    mercPend: 'Pending: confirm which countries can be published',
    formH: 'Write to us',
    form: {
      rol: 'I am a', rolDist: 'Distributor', rolPro: 'Professional',
      nombre: 'Full name', empresa: 'Company or clinic', pais: 'Country', email: 'Email', msg: 'Message', msgHelp: 'Optional',
      enviar: 'Send request',
      errReq: 'Fill in this field.', errEmail: 'Enter a valid email, for example name@company.com.',
      ok: 'Request recorded. This prototype does not send data yet.',
    },
    foot: { legal: 'Legal notice', priv: 'Privacy policy', cookies: 'Cookie policy', dir: 'Skin and Soul SL, Pg. Manuel Girona 71, 08034 Barcelona' },
    licencia: 'Image licence to be confirmed',
  },
};

// ---- Segunda versión de la home ----
const vida = { joy: 'vida-joy', glow: 'vida-glow', blur: 'vida-blur', silk: 'vida-silk', pure: 'vida-pure' };
gamas.forEach(g => { g.vida = vida[g.id] || null; });

// Catálogo MedLine completo. Sin precios.
const medline = [
  { id: 'hydra-volume', n: 'Hydra Volume', gama: 'joy', tipo: 'm' },
  { id: 'cell-energy', n: 'Cell Energy', gama: 'joy', tipo: 'm' },
  { id: 'skin-repair', n: 'Skin Repair', gama: 'joy', tipo: 'm' },
  { id: 'radiance', n: 'Radiance', gama: 'glow', tipo: 'm' },
  { id: 'glow-boost', n: 'Glow Boost', gama: 'glow', tipo: 'm' },
  { id: 'spot-corrector', n: 'Spot Corrector', gama: 'blur', tipo: 'm' },
  { id: 'pigment-balance', n: 'Pigment Balance', gama: 'blur', tipo: 'm' },
  { id: 'youth-restore', n: 'Youth Restore', gama: 'silk', tipo: 'm' },
  { id: 'firming-essence', n: 'Firming Essence', gama: 'silk', tipo: 'm' },
  { id: 'expression-relax', n: 'Expression Relax', gama: 'silk', tipo: 'm' },
  { id: 'eye-flash', n: 'Eye Flash', gama: 'silk', tipo: 'm' },
  { id: 'hair-density', n: 'Hair Density', gama: 'root', tipo: 'm' },
  { id: 'lacto-renewal', n: 'Lacto Renewal', gama: 'joy', tipo: 'p' },
  { id: 'pigment-control', n: 'Pigment Control', gama: 'blur', tipo: 'p' },
  { id: 'salicylic-balance', n: 'Salicylic Balance', gama: 'pure', tipo: 'p' },
];
const estImg = { silk: ['est-silk', 520, 207], joy: ['est-joy', 520, 218], glow: ['est-glow', 346, 520], pure: ['est-pure', 502, 520], blur: ['est-blur', 502, 520] };
estudios.forEach(e => { e.img = estImg[e.gama]; });

// Fuente: CRM de distribuidores, cuentas con pedido (etapas 9 y 10). Pendiente de confirmar para publicación.
mercados.es = ['Bulgaria', 'Dinamarca', 'Emiratos Árabes Unidos', 'Irak', 'Letonia', 'México', 'Rusia', 'Ucrania'];
mercados.en = ['Bulgaria', 'Denmark', 'Iraq', 'Latvia', 'Mexico', 'Russia', 'Ukraine', 'United Arab Emirates'];

const prensa = ['ABC', 'Marie Claire', 'Mujer Hoy', 'Mía', 'Expansión y Negocios', 'El País de los Negocios'];

Object.assign(t.es, {
  verProducto: 'Ver el producto', verUso: 'Ver en uso',
  heroAlt: 'Manos sosteniendo el tarro de crema JOY hydrat HA + Hibiscus', heroAlt2: 'Crema JOY hydrat HA + Hibiscus con su caja',
  heroCap: 'JOY hydrat, crema con ácido hialurónico e hibiscus.',
  cifras: [
    ['ISO 22716', 'ISO 13485', 'Fabricado en Barcelona en instalaciones certificadas'],
    ['5', '', 'estudios de eficacia con medición instrumental'],
    ['20', '', 'voluntarios en cada estudio'],
    ['12 + 3', '', 'mesocócteles y peelings en la línea MedLine'],
  ],
  prensaH: 'Han hablado de Labelist',
  vidaAlt: 'Producto de la gama',
  catH: 'El catálogo MedLine', catP: 'Viales de 5 ml en cajas de cinco y peelings de cabina. Precio bajo solicitud.',
  tipoM: 'Mesocóctel', tipoP: 'Peeling',
  eficNota: 'Cada estudio se hizo con 20 voluntarios adultos. La cifra es la mejora media frente al valor inicial.',
  eficRef: 'Informe',
  fabH: 'Fórmulas que declaran lo que llevan',
  fabP1: 'El catálogo indica la concentración de los activos principales de cada producto: niacinamida al 13&nbsp;%, vitamina C al 15&nbsp;%, retinol al 0,3&nbsp;%.',
  videoLabel: 'Vídeo de la marca Labelist', videoMed: 'Vídeo de la línea MedLine',
  pausa: 'Pausar vídeo', play: 'Reproducir vídeo',
  tex: [['tex-ha', 'Sérum con Ácido hialurónico + B5'], ['tex-niacinamida', 'Sérum con Niacinamida'], ['tex-vitc', 'Sérum con Vitamina C + GAG'], ['tex-retinol', 'Retinol 0.15% Sérum']],
  texAlt: 'Textura del producto con sus activos señalados',
  pasosH: 'Cómo empezamos',
  pasos: [
    ['Solicitud', 'Nos cuentas tu canal y tu territorio.'],
    ['Fase de entrada', 'Seis meses con pedido mínimo flexible para probar el mercado.'],
    ['Exclusividad', 'Un socio por territorio, con un compromiso anual.'],
  ],
  pasosPend: 'Pendiente: confirmar condiciones publicables',
  mercPend: 'Pendiente: confirmar qué países se publican',
  mapaT: 'Mapa del mundo con los países donde se vende Labelist',
  bcn: 'Barcelona, origen',
  footCols: {
    lineas: ['Líneas', [['Tienda', '#sistema'], ['MedLine', '#profesional'], ['Estudios de eficacia', '#eficacia']]],
    marca: ['Labelist', [['Fórmulas y fabricación', '#fabricacion'], ['Distribuidores', '#distribuidores'], ['Contacto', '#contacto']]],
  },
  contactoH: 'Contacto', horario: 'De lunes a viernes, de 9:00 a 15:00',
});
Object.assign(t.en, {
  verProducto: 'See the product', verUso: 'See it in use',
  heroAlt: 'Hands holding the jar of JOY hydrat HA + Hibiscus cream', heroAlt2: 'JOY hydrat HA + Hibiscus cream with its box',
  heroCap: 'JOY hydrat, cream with hyaluronic acid and hibiscus.',
  cifras: [
    ['ISO 22716', 'ISO 13485', 'Made in Barcelona in certified facilities'],
    ['5', '', 'efficacy studies with instrumental measurement'],
    ['20', '', 'volunteers in each study'],
    ['12 + 3', '', 'mesococktails and peels in the MedLine range'],
  ],
  prensaH: 'Labelist in the press',
  vidaAlt: 'Product from the range',
  catH: 'The MedLine catalogue', catP: '5 ml vials in boxes of five, and clinic peels. Pricing on request.',
  tipoM: 'Mesococktail', tipoP: 'Peel',
  eficNota: 'Each study had 20 adult volunteers. The figure is the mean improvement against baseline.',
  eficRef: 'Report',
  fabH: 'Formulas that state what is in them',
  fabP1: 'The catalogue lists the concentration of the main actives in each product: niacinamide at 13%, vitamin C at 15%, retinol at 0.3%.',
  videoLabel: 'Labelist brand video', videoMed: 'MedLine range video',
  pausa: 'Pause video', play: 'Play video',
  tex: [['tex-ha', 'Hyaluronic Acid + B5 Serum'], ['tex-niacinamida', 'Niacinamide Serum'], ['tex-vitc', 'Vitamin C + GAG Serum'], ['tex-retinol', 'Retinol 0.15% Serum']],
  texAlt: 'Product texture with its actives labelled',
  pasosH: 'How we start',
  pasos: [
    ['Enquiry', 'Tell us about your channel and your territory.'],
    ['Entry phase', 'Six months with a flexible minimum order to test the market.'],
    ['Exclusivity', 'One partner per territory, with an annual commitment.'],
  ],
  pasosPend: 'Pending: confirm which terms can be published',
  mercPend: 'Pending: confirm which countries are published',
  mapaT: 'World map showing the countries where Labelist is sold',
  bcn: 'Barcelona, origin',
  footCols: {
    lineas: ['Ranges', [['Shop', '#sistema'], ['MedLine', '#profesional'], ['Efficacy studies', '#eficacia']]],
    marca: ['Labelist', [['Formulas and manufacturing', '#fabricacion'], ['Distributors', '#distribuidores'], ['Contact', '#contacto']]],
  },
  contactoH: 'Contact', horario: 'Monday to Friday, 9:00 to 15:00',
});


// ---- Tercera versión de la home: datos sacados de protocolos, fichas e informes ----
// Protocolos: "Professional & Homecare Protocols". Pendiente de validación regulatoria.
const proto = {
  joy: { es: 'Mesocócteles: 4 a 6 sesiones, cada 7 a 15 días. Peeling: 3 a 6 sesiones, cada 2 a 4 semanas.', en: 'Mesococktails: 4 to 6 sessions, every 7 to 15 days. Peel: 3 to 6 sessions, every 2 to 4 weeks.' },
  glow: { es: '4 a 6 sesiones, cada 10 a 14 días.', en: '4 to 6 sessions, every 10 to 14 days.' },
  blur: { es: 'Mesocócteles: 4 a 6 sesiones, cada 10 días. Peeling: 3 a 5 sesiones, cada 2 semanas.', en: 'Mesococktails: 4 to 6 sessions, every 10 days. Peel: 3 to 5 sessions, every 2 weeks.' },
  silk: { es: '4 a 6 sesiones, cada 10 a 14 días.', en: '4 to 6 sessions, every 10 to 14 days.' },
  pure: { es: 'Peeling: 3 a 5 sesiones, cada 2 semanas.', en: 'Peel: 3 to 5 sessions, every 2 weeks.' },
  root: { es: '6 a 8 sesiones, cada 7 a 14 días.', en: '6 to 8 sessions, every 7 to 14 days.' },
};
gamas.forEach(g => { g.proto = proto[g.id]; });

// Informes: el de GLOW da cifras de firmeza contradictorias, así que se publica la luminosidad y se marca para revisión.
const det = {
  silk: { ap: ['Cutometer Dual MPA580', 'Zona de patas de gallo', 'Crow\'s feet area'], edad: '38-65', mej: 70 },
  joy: { ap: ['Corneometer', 'Frente y mejillas', 'Forehead and cheeks'], edad: '20-70', mej: 90, extra: { es: 'A las 48 horas la mejora media fue del 19,52&nbsp;%.', en: 'At 48 hours the mean improvement was 19.52%.' } },
  glow: { ap: ['Skin-Colorimeter CL400', 'Frente, mejillas y cuello', 'Forehead, cheeks and neck'], edad: '19-40', mej: 85, pend: { es: 'Pendiente: revisar el informe', en: 'Pending: report under review' } },
  pure: { ap: ['Sebumeter SM 815', 'Frente, mejillas y mentón', 'Forehead, cheeks and chin'], edad: '18-50', mej: 65 },
  blur: { ap: ['Mexameter MX 18', 'Rostro', 'Face'], edad: '37-70', mej: 80, extra: { es: 'Diferencia estadísticamente significativa según el informe.', en: 'Statistically significant difference according to the report.' } },
};
estudios.forEach(e => { e.det = det[e.gama]; });
Object.assign(estudios.find(e => e.gama === 'glow'), { es: 'Luminosidad', en: 'Luminosity', valor: '7,13', valorEn: '7.13' });

// Concentraciones declaradas en fichas técnicas y catálogo.
const activos = [
  { pct: ['13', '13'], es: 'Niacinamida', en: 'Niacinamide', prod: { es: 'Sérum con Niacinamida', en: 'Niacinamide Serum' }, gama: 'blur' },
  { pct: ['15', '15'], es: 'Vitamina C', en: 'Vitamin C', prod: { es: 'Sérum C+ AGE Defense', en: 'C+ AGE Defense Serum' }, gama: 'glow' },
  { pct: ['0,3', '0.3'], es: 'Retinol', en: 'Retinol', prod: { es: 'Crema con Retinol 0.3%', en: '0.3% Retinol Cream' }, gama: 'silk' },
  { pct: ['2', '2'], es: 'Ácido salicílico', en: 'Salicylic acid', prod: { es: 'Sérum con Ácido Salicílico', en: 'Salicylic Acid Serum' }, gama: 'pure' },
  { pct: ['8', '8'], es: 'Ácido glicólico', en: 'Glycolic acid', prod: { es: 'Gel con Ácido Glicólico + AHAs', en: 'Glycolic Acid + AHA Gel' }, gama: 'pure' },
];

Object.assign(t.es, {
  heroSub: 'Marca de dermocosmética y mesoterapia de Barcelona. Una línea profesional y una línea de casa que comparten gamas, con eficacia medida. Buscamos un distribuidor por territorio.',
  heroPro: 'Soy profesional', heroCasa: 'Comprar para casa', heroO: 'O bien:',
  sistemaP: 'Las dos líneas comparten gamas. Elige una necesidad para ver su tratamiento profesional, el mantenimiento en casa y lo que se ha medido.',
  paso1: 'Se trata en cabina', paso2: 'Se mantiene en casa', paso3: 'Se ha medido',
  protoL: 'Protocolo', verEstudio: 'Ver el estudio', sinEstudio: 'Esta gama todavía no tiene estudio publicado.',
  proP: 'MedLine se organiza por necesidad de la piel. Cada producto tiene su protocolo de cabina y su pauta de casa. El catálogo es para profesionales y enviamos el precio a quien lo solicita.',
  catP: 'Mesocócteles en cajas de 5 viales de 5&nbsp;ml y peelings en frasco de 50&nbsp;ml. Precio bajo solicitud.',
  eficP: 'Tests de uso con medición instrumental antes y después, en 20 voluntarias adultas por estudio.',
  eficNota: 'Estudios abiertos, sin grupo de control. La cifra es la mejora media frente al valor inicial. En los cinco estudios ninguna voluntaria refirió irritación, enrojecimiento, picor ni sequedad.',
  comoH: 'Cómo se midió', dAp: 'Instrumento', dZona: 'Zona', dPanel: 'Panel', dMej: 'Voluntarias que mejoraron',
  panelTxt: e => `20 mujeres de ${e.replace('-', ' a ')} años`,
  fabP1: 'Cada ficha indica la concentración de sus activos principales. Estas son cinco de ellas.',
  socioH: 'Qué buscamos en un socio',
  socio: [
    ['Acceso al canal profesional', 'Trato directo con dermatólogos, médicos estéticos y centros médicos.'],
    ['Red de puntos de venta', 'Cobertura real en su territorio.'],
    ['Mismo posicionamiento', 'Canal profesional y selectivo, no gran consumo.'],
    ['Capacidad de crecer', 'Un plan de crecimiento con compromiso anual.'],
  ],
  recibeH: 'Qué recibe el distribuidor',
  soporte: [
    ['Formación técnica y comercial', 'Para el equipo del distribuidor, antes de salir al mercado.'],
    ['Protocolos documentados', 'Paso a paso, por línea y por necesidad de la piel, listos para la clínica.'],
    ['Materiales comerciales', 'Fichas de producto, catálogos y argumentarios adaptados a cada mercado.'],
    ['Soporte continuo', 'Consultas científicas y comerciales durante toda la relación.'],
  ],
  pasos: [
    ['Solicitud', 'Nos cuentas tu canal y tu territorio.'],
    ['Fase de entrada', 'Seis meses con pedido mínimo flexible para probar el mercado.'],
    ['Exclusividad', 'Un socio por territorio, con plan de crecimiento y compromiso anual.'],
  ],
  webL: 'Web de la empresa',
});
t.es.cifras[2] = ['20', '', 'voluntarias en cada estudio'];
t.es.form.pais = 'País o territorio de interés';
Object.assign(t.en, {
  heroSub: 'A dermocosmetics and mesotherapy brand from Barcelona. A professional line and a homecare line that share the same ranges, with measured efficacy. We are looking for one distributor per territory.',
  heroPro: 'I am a professional', heroCasa: 'Shop homecare', heroO: 'Or:',
  sistemaP: 'Both lines share the same ranges. Pick a skin need to see its professional treatment, the homecare that maintains it and what has been measured.',
  paso1: 'Treated in the clinic', paso2: 'Maintained at home', paso3: 'Measured',
  protoL: 'Protocol', verEstudio: 'See the study', sinEstudio: 'This range has no published study yet.',
  proP: 'MedLine is organised by skin need. Each product has its clinic protocol and its homecare routine. The catalogue is for professionals and we send pricing on request.',
  catP: 'Mesococktails in boxes of 5 vials of 5 ml, and peels in 50 ml bottles. Pricing on request.',
  eficP: 'In-use tests with instrumental measurement before and after, on 20 adult women per study.',
  eficNota: 'Open-label studies with no control group. The figure is the mean improvement against baseline. In all five studies no volunteer reported irritation, redness, itching or dryness.',
  comoH: 'How it was measured', dAp: 'Instrument', dZona: 'Area', dPanel: 'Panel', dMej: 'Volunteers who improved',
  panelTxt: e => `20 women aged ${e.replace('-', ' to ')}`,
  fabP1: 'Each product sheet states the concentration of its main actives. Here are five of them.',
  socioH: 'What we look for in a partner',
  socio: [
    ['Access to the professional channel', 'Direct contact with dermatologists, aesthetic physicians and medical centres.'],
    ['A network of points of sale', 'Real coverage in the territory.'],
    ['The same positioning', 'Professional and selective channel, not mass market.'],
    ['Capacity to scale', 'A growth plan with a yearly commitment.'],
  ],
  recibeH: 'What a distributor receives',
  soporte: [
    ['Technical and commercial training', 'For the distributor\'s team, before going to market.'],
    ['Documented protocols', 'Step by step, by line and by skin need, ready for the clinic.'],
    ['Sales materials', 'Product cards, catalogues and sales arguments adapted to each market.'],
    ['Ongoing support', 'Scientific and commercial queries throughout the partnership.'],
  ],
  pasos: [
    ['Enquiry', 'Tell us about your channel and your territory.'],
    ['Entry phase', 'Six months with a flexible minimum order to test the market.'],
    ['Exclusivity', 'One partner per territory, with a growth plan and a yearly commitment.'],
  ],
  webL: 'Company website',
});
t.en.cifras[2] = ['20', '', 'volunteers in each study'];
t.en.form.pais = 'Country or territory of interest';

module.exports = { gamas, estudios, mercados, medline, prensa, activos, t };

