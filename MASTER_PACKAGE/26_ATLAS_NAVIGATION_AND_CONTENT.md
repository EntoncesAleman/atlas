# 26 — Atlas navegable + primera experiencia de contenido

## Arquitectura de navegación

Se implementa una ruta pública de atlas con una estructura rígida y reusable:

- `/` → Home visual RELIEVE
- `/atlas` → Índice editorial del atlas
- `/atlas/[categoria]` → página de categoría
- `/atlas/[categoria]/[entrada]` → ficha editorial de entrada
- `/not-found` → fallback de estado visual para contenidos no encontrados

La navegación se sostiene en un modelo de datos local simple:

- categorías: `src/app/lib/atlasData.js`
- entradas: `src/app/lib/atlasData.js`

Se evita crear un CMS, un CRUD o un administrador editorial. Los datos siguen siendo un arreglo simple de objetos y están preparados para migrar posteriormente a una fuente dinámica.

## Estructura de categorías

La estructura mínima de cada categoría:

- id
- slug
- title
- tag
- type
- regionLabel
- cta
- description
- shortDescription
- editorialDescription
- asset
- alt

## Estructura de entradas

Cada entrada de contenido incluye:

- id
- slug
- categoryId
- title
- summary
- content
- image
- alt
- tags
- category
- categorySlug
- type
- related
- state

Las piezas publicadas están en `PUBLISHED`. El estado `DRAFT` queda reservado y ninguna pieza sin publicar se muestra en la UI pública.

## URLs

Las rutas previstas son:

- `/atlas`
- `/atlas/fundamentos`
- `/atlas/fundamentos/germinacion`

Se usan slugs estables y SEO-friendly, sin identificadores numéricos visibles.

## Componentes reutilizables

Se reutiliza el componente `AtlasVisualCard` en la Home y el patrón de datos llama al nuevo catálogo compartido en `atlasData.js`.

La navegación de categorías y fichas se acopla con:

- `AtlasVisualCard` para la Home
- `CategoryShowcase` para la colección visual de atlas
- `CategoryPage` para páginas de categoría
- `EntryPage` para páginas de entrada

## Relación entre contenido

Cada entrada expone:

- categoría
- contenido editorial
- contenido relacionado por `related`
- navegación siguiente/anterior dentro de la misma categoría
- acceso a la categoría de regreso

## Estados

Se implementa el estado de no encontrado por `not-found.js` y la ruta real de una sola pieza o categoría inexistente devuelve una página 404 comestible y coherente con el estilo RELIEVE.

## Visual

Se mantiene la dirección RELIEVE:

- editorial;
- cartográfica;
- natural;
- argentina;
- atlas.

No se introduce clima real, meteorología, regionalización ni usuarios/micultivo.

## SEO

Se aplica una base mínima de metadata de layout en `layout.js`: título y descripción del sitio. Las páginas dinámicas no introducen metadatos complejos. El patrón está preparado para extenderse sin crear una estrategia SEO masiva.

## Qué quedó preparado

- Sistema de rutas reusable para 5–7 categorías.
- Modelo de datos sencillo compatible con migración local o API.
- Páginas de categoría y ficha con breadcrumb.
- Piezas de contenido y relaciones de contenido.
- Estado de contenido futuro vacante en la categoría.
- Estado 404.

## Qué NO se implementó

- biblioteca completa de contenido;
- búsqueda compleja;
- CMS/admin;
- autenticación o usuarios;
- Mi Cultivo;
- clima real;
- meteorología;
- regionalización;
- ecommerce o marketplace.
