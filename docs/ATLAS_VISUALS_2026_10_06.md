# Imágenes del Atlas — 6 de octubre de 2026

La cobertura pasó de 15 a 87 entradas con imagen, sobre 87 publicadas. Se incorporaron 37 archivos de fuentes con licencias libres y tres ilustraciones originales generadas con IA, optimizados a WebP y alojados en el proyecto. Una fuente puede ilustrar más de una entrada cuando trata el mismo tema; las atribuciones se registran una sola vez.

## Procedencia y licencias

Las licencias se verificaron en las fichas originales de Wikimedia Commons y en los artículos científicos originales de PLOS ONE y Plants/MDPI. Se admitieron dominio público, CC0, CC BY y CC BY-SA, con su versión exacta. No se usaron afiches o fotogramas con derechos no comprobados. Las tres ilustraciones generadas se registran por separado como material interno y se identifican como IA.

El registro verificable está en [OPEN_VISUAL_LICENSES_2026_10_06.json](OPEN_VISUAL_LICENSES_2026_10_06.json), y el registro utilizado por la web en [openVisuals.js](../src/app/lib/editorial/openVisuals.js). Cada figura enlaza a su fuente y a la licencia. Las versiones optimizadas conservan la licencia de origen e indican la conversión y el ajuste de tamaño. En algunos casos se descargó la vista oficial de resolución adaptada de Wikimedia; su URL queda registrada como `downloadedFrom`. La portada de Dewey se obtuvo de la página 3 del PDF original de Internet Archive.

Las imágenes de especies distintas de Cannabis se identifican expresamente en el pie: cebolla, vid, Tradescantia y Pinus taeda. Las figuras generales de fisiología y suelo se presentan como tales. Las imágenes internacionales y las imágenes de referencia para reseñas no se presentan como producción argentina, portada de libro o fotograma.

## Encuadres y lectura

- Las fotografías de artículo conservan el sujeto completo, centrado, sin recortar los archivos.
- Los diagramas ocupan el ancho del artículo y conservan rótulos, escalas y bordes.
- Las miniaturas de entradas y los créditos muestran la imagen completa.
- Las fotografías de portada de categoría conservan un recorte con puntos de encuadre revisados; las láminas botánicas se muestran completas.
- Cada imagen permite abrir su versión local completa. Se registraron dimensiones para reducir movimientos durante la carga.
- Maduración ahora muestra tricomas en lugar de una fotografía de secado.
- Poda de bajos y defoliación muestran la figura del experimento de Danziger y Bernstein (2021), fuente que ya cita la entrada, bajo CC BY 4.0.

## Ilustraciones originales autorizadas

Tras la búsqueda de fuentes libres, el usuario pidió expresamente «crealas vos» para las tres entradas pendientes: `super-cropping`, `documental-madre-planta` y `documental-el-profe`. Se generaron tres ilustraciones conceptuales con la herramienta integrada `image_gen`, en tinta y acuarela sobre fondo claro.

Super cropping muestra una rama flexionada como representación conceptual, sin presentarse como observación experimental ni guía del procedimiento. Las reseñas de documentales muestran cuidado compartido y aprendizaje, con personajes anónimos: no son afiches oficiales, fotogramas ni retratos de participantes. Cada pie y la página de créditos declaran su generación con IA.

El registro está en [generatedVisuals.js](../src/app/lib/editorial/generatedVisuals.js); los prompts exactos y las rutas de originales y versiones WebP se conservan en [GENERATED_VISUAL_PROMPTS_2026_10_06.json](GENERATED_VISUAL_PROMPTS_2026_10_06.json). Los originales están en `output/imagegen/atlas-2026-10-06/`. Esta autorización es una excepción limitada a estas tres entradas y no modifica el criterio general de fuentes verificadas.

## Verificación

`node --import ./tests/_register-ext-loader.mjs tests/editorial-visuals-audit.mjs` comprueba archivos, licencias, fuentes registradas, destinos editoriales, atribuciones visibles y ausencia de imágenes rotas en todas las categorías. Verifica encuadres y desbordamientos en 390px y 1440px. La compilación se verifica con `npm run build`.
