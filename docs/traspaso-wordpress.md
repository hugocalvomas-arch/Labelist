# Web Labelist: traspaso a WordPress + WooCommerce

Prototipo estático publicado en https://labelist-swart.vercel.app/. Este documento explica qué hay, cómo está hecho y cómo pasarlo a un tema de WooCommerce.

## 1. Qué hay

82 páginas generadas, 41 por idioma (español en `/`, inglés en `/en/`).

| Página | ES | EN | Plantilla WordPress |
|---|---|---|---|
| Home | `/` | `/en/` | `front-page.php` |
| Distribuidores | `/distribuidores/` | `/en/distributors/` | página con plantilla propia |
| Profesional (catálogo MedLine) | `/profesional/` | `/en/professional/` | archivo de producto, categoría MedLine |
| Ficha MedLine (15) | `/profesional/<id>/` | `/en/professional/<id>/` | `single-product` variante sin precio |
| Tienda | `/tienda/` | `/en/shop/` | `archive-product.php` |
| Ficha de casa (20) | `/tienda/<id>/` | `/en/shop/<id>/` | `single-product.php` |
| Sobre Labelist | `/sobre-labelist/` | `/en/about/` | página |
| Contacto | `/contacto/` | `/en/contact/` | página con formulario |

## 2. Cómo está hecho

- HTML, CSS y JavaScript sin frameworks. Un generador en Node (`node src/build.js`) escribe todo en `site/`.
- `src/content.js`: textos de la home, gamas, estudios, mercados, concentraciones.
- `src/paginas.js`: plantillas y textos de las páginas interiores.
- `src/data/retail.json` y `src/data/medline.json`: una entrada por producto. Son la base para importar productos a WooCommerce.
- `site/css/tokens.css`: colores, tipografías, espaciado y radios. **El rebranding de enero de 2027 se aplica aquí** y cambiando las imágenes de `site/img/`.
- `site/css/main.css`: componentes. `site/js/main.js`: un único script; cada bloque comprueba si su elemento existe.

## 3. Variables de diseño

Definidas en `:root` de `tokens.css`: `--paper`, `--mist`, `--ink`, `--ink-2`, `--line`, `--flag` (marcadores de pendiente), un color por gama (`--joy`, `--glow`, `--blur`, `--silk`, `--pure`, `--root`), `--serif` (Bodoni Moda), `--sans` (Montserrat), escala tipográfica (`--t-display`, `--t-h2`, `--t-h3`, `--t-body`), `--gutter`, `--sec`, `--max`, `--r-ctl` (controles en píldora), `--r-surf` (superficies casi rectas) y `--ease`.

En WordPress conviene pasarlas a `theme.json` (paleta, tipografías, espaciado) y mantener el color de gama como término de taxonomía con un campo de color.

## 4. Componentes que hay que trasladar

| Componente | Clase | Dónde se usa | Notas |
|---|---|---|---|
| Cabecera y menú | `.top`, `.nav`, `.menu-btn` | todas | El botón "Ser distribuidor" va siempre a la derecha |
| Pie | `.foot` | todas | Incluye la frase de fabricación |
| Botones | `.btn`, `.btn-solid`, `.btn-line`, `.chip` | todas | Altura mínima de 44 px |
| Marcador de pendiente | `.pend` | donde falta un dato | Se elimina al confirmar el dato |
| Nombre de gama | `.lockup` | todas | Nombre en versales y descriptor en cursiva |
| Selector de gamas | `.tabs`, `.panel`, `.flujo` | home | Pestañas ARIA con flechas del teclado |
| Tarjeta de producto de casa | `.pc` | tienda, fichas | |
| Tarjeta MedLine | `.med`, `.cat-row` | home, profesional | Nunca lleva precio |
| Estudio | `.est`, `.estm` | home, distribuidores, sobre | Cifra, parámetro, plazo y "Cómo se midió" |
| Concentración | `.act` | home, fichas, distribuidores | |
| Secuencia numerada | `.sec`, `.pasos` | profesional, fichas, distribuidores | Solo para pasos reales |
| Mapa de mercados | `.mapa`, `.merc` | home, distribuidores | SVG generado; ver `mapa.svg` |
| Vídeo | `.vid` | home, profesional, sobre | Silenciado, con botón de pausa, parado si el usuario pide menos movimiento |
| Formulario | `.form` | home, distribuidores, profesional, contacto | Ahora es simulado |
| Ficha | `.ficha`, `.datos` | fichas de producto | |

## 5. Modelo de datos para WooCommerce

**Producto de casa** (`retail.json`): `id` (slug), `gama`, `nombre` (es/en), `tipo`, `resumen`, `preocupacion` (lista), `activos` (nombre, porcentaje, función), `textura`, `uso`, `cuando`, `formato`, `precio`, `inci`.

**Producto MedLine** (`medline.json`): `id`, `n`, `gama`, `tipo` (mesocóctel o peeling), `resumen`, `indicaciones`, `activos`, `formato`, `protocolo` (sesiones, intervalo, mantenimiento, técnica), `pasos`, `combinado`, `precauciones`.

Propuesta:
- Taxonomías: `gama` (con color), `necesidad`, `linea` (casa o MedLine).
- Campos personalizados (ACF o similar) para activos, protocolo, pasos y precauciones.
- **MedLine sin precio:** crear los productos MedLine sin precio y no comprables, y sustituir el botón de compra por "Solicitar precio", que abre el formulario de contacto con el rol profesional y el nombre del producto ya rellenos (hoy se hace con `?rol=pro&prod=`).
- Idiomas con WPML o Polylang, manteniendo los slugs de la tabla del punto 1.

## 6. Lo que es simulado y hay que conectar

- Formularios: validan pero no envían. Conectar a un plugin de formularios con destino hello@labelistcosmetics.com.
- Carrito: solo cuenta unidades en el navegador. Lo sustituye WooCommerce.
- Filtros de la tienda: funcionan en el navegador. Sustituir por los filtros de WooCommerce por `gama` y `necesidad`.

## 7. SEO

- Cada página tiene título, descripción, canonical, `hreflang` (es, en, x-default) y Open Graph.
- Datos estructurados: `Organization` (home, distribuidores, sobre, contacto), `BreadcrumbList` (todas las interiores) y `Product` con oferta (fichas de casa con precio). Las fichas MedLine no llevan `Product` con oferta porque no tienen precio público.
- `sitemap.xml` generado. El dominio usado es `https://labelistcosmetics.com` (constante `BASE` en `build.js`).
- **El prototipo no se indexa:** cabecera `noindex` en `vercel.json`, meta `robots` y `robots.txt`. Hay que quitar las tres cosas al publicar.

## 8. Accesibilidad

Revisado en las 82 páginas, en escritorio y móvil: un solo `h1` por página, sin desplazamiento horizontal, sin imágenes rotas, sin errores de script y sin enlaces internos rotos. Enlace "Saltar al contenido", foco visible, pestañas y menú operables con teclado, etiquetas en todos los campos, errores de formulario asociados al campo, tablas con cabeceras, movimiento desactivado con `prefers-reduced-motion`. No se ha hecho prueba con lector de pantalla real.

## 9. Reglas de contenido que no se pueden romper

- No nombrar a ningún fabricante ni laboratorio tercero, y no escribir "fabricación propia". Fórmula única: "Fabricado en Barcelona en instalaciones certificadas ISO 22716 e ISO 13485".
- No mostrar fundadores, equipo, nombres ni biografías.
- MedLine no muestra precios.
- No inventar datos; lo que falte se marca.
- Las cifras de eficacia salen de los informes de estudio.
- Sin imágenes de producto generadas con IA.
