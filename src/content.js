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

module.exports = { gamas, estudios, mercados, t };
