# Web Labelist (prototipo)

Prototipo de la nueva web de Labelist Cosmetics. De momento solo la home, en español (`/`) e inglés (`/en/`).

- `site/`: lo que se publica. HTML, CSS y JavaScript sin dependencias.
- `src/content.js`: todos los textos y datos (gamas, productos, estudios, mercados).
- `src/build.js`: genera `site/index.html` y `site/en/index.html`. Ejecutar con `node src/build.js`.
- `site/css/tokens.css`: colores, tipografías y espaciados. El rebranding se aplica aquí.

Las etiquetas amarillas de la página marcan datos pendientes de confirmar.
