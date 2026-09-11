# 34 — Grid de Categorías en Formato Cuadrado (Fase 8B)

Corrige el grid de `CategoryShowcase`/`AtlasVisualCard`: las tarjetas eran rectangulares/horizontales (270px alto mínimo, imagen de 150px, cuerpo de texto debajo) y, además, tenían un bug de layout (ver §3).

## 1. Qué se encontró en la inspección

- `CategoryShowcase.js` aplicaba **dos clases de grid a la vez** al mismo contenedor: `"category-grid atlas-grid"`. `.category-grid` (5 columnas, resto de un diseño de Home anterior, no referenciada por ningún otro componente JS) y `.atlas-grid` (3 columnas) competían por la misma propiedad `grid-template-columns` — por orden de aparición en la hoja de estilos, `.category-grid` ganaba, produciendo un grid angosto de 5 columnas con tarjetas apretadas y contenido desbordado.
- **`.atlas-card-image` no tenía ninguna regla CSS** — el `<img>` se renderizaba a su tamaño intrínseco (hasta ~1200px de ancho), lo que causaba el overflow horizontal detectado en la Fase 8A. Confirmado como la causa raíz exacta (no solo una sospecha): al día de hoy, tras el fix, `.atlas-card-image` ya no aparece entre los elementos que exceden el viewport en 390px.
- `.atlas-card-title-link` no tenía ninguna regla CSS — el título de cada categoría se renderizaba con el estilo azul/subrayado por defecto del navegador, inconsistente con la identidad editorial del resto del sitio.

## 2. Rediseño aplicado

- `CategoryShowcase.js`: se quitó la clase `category-grid` del contenedor, dejando solo `atlas-grid` como única fuente de las columnas (sin colisión).
- `.atlas-card` pasa a `aspect-ratio: 1 / 1` — la tarjeta completa (no solo la imagen) es un cuadrado real, igual para las 7 categorías.
- La imagen (`.atlas-card-media-link` + `.atlas-card-media` + `.atlas-card-image`) ahora ocupa el 100% del cuadrado como fondo (`position: absolute; inset: 0; object-fit: cover`).
- El cuerpo de texto (`.atlas-card-body`: etiqueta/tipo, título, descripción, link "Explorar") pasa de ser un bloque debajo de la imagen a un **panel superpuesto en la parte inferior del mismo cuadrado**, con un degradado (`transparent` → `var(--paper)`) para legibilidad — así el título queda "claramente visible" y el texto secundario nunca fuerza que la tarjeta crezca (se limita a 2 líneas con `-webkit-line-clamp: 2`). El panel tiene `pointer-events: none` con `pointer-events: auto` solo en los enlaces internos, para que el resto del cuadrado siga siendo clickeable a través del link de imagen (mismo destino, sin zonas muertas).
- Se agregó la regla faltante para `.atlas-card-title-link` (`color: inherit; text-decoration: none`), corrigiendo el título que antes se veía como link azul de navegador — parte directa de "título de categoría claramente visible", no un cambio de contenido.

## 3. Caso especial: "Marco legal" (asset ilustrativo, no fotográfico)

Con `object-fit: cover`, la única categoría cuyo asset es una ilustración SVG interna (`category-marco-legal.svg`, 900×680, con texto "MARCO LEGAL"/"Marco legal" dibujado dentro del archivo) quedaba recortada de forma agresiva al forzarla a un cuadrado, cortando el texto propio de la ilustración. Se detectó visualmente (captura de pantalla) y se corrigió sin tocar el archivo del asset: `AtlasVisualCard.js` ahora detecta si `category.asset` termina en `.svg` y le aplica una clase adicional (`atlas-card-image-contain`) que usa `object-fit: contain; object-position: center top` en vez de `cover` — la ilustración se ve completa, sin recortes, alineada arriba para no superponerse con el panel de texto inferior. Las 6 fotografías documentales (Fase 6) siguen usando `cover` sin cambios. No se reemplazó ni editó ningún archivo de asset.

## 4. Responsive

- Desktop (>980px): 3 columnas.
- Tablet (≤980px): 2 columnas.
- Mobile (≤640px): 1 columna, con un ancho máximo (`max-width: 420px`, centrado) para que el cuadrado no quede excesivamente grande en pantallas angostas.
- La proporción 1:1 se mantiene en las 3 resoluciones porque depende de `aspect-ratio` en la tarjeta, no de cálculos de alto/ancho manuales por breakpoint.

## 5. Qué NO se tocó

Categorías, títulos, imágenes (archivos), enlaces, orden, modelo editorial — sin cambios. El mapa (`GeoSelector`, Fase 8A) no se tocó. No se creó el panel "Historia de la planta". No se generó ni buscó ningún asset nuevo. No se tocó clima, auth, CMS ni SEO.

## 6. Pruebas realizadas

- `npm run build`: exit limpio, sin errores provocados por esta tarea.
- Playwright (Chromium headless) en 1440×900, 768×1024 y 390×844 sobre Home: las 7 tarjetas presentes, proporción 1:1 exacta en las 7 (verificado midiendo `getBoundingClientRect` de cada `.atlas-card`, ratio ancho/alto = 1.00 en las tres resoluciones), sin overflow del componente `.category-showcase` en ninguna resolución, sin imágenes rotas, sin errores de consola, navegación real confirmada (click en el título de "Fundamentos" navega a `/atlas/fundamentos`).
- Inspección visual de capturas completas en las 3 resoluciones y una captura recortada de la tarjeta "Marco legal" antes/después del fix de `object-fit`, confirmando que el texto de la ilustración ya no se corta ni se superpone de forma ilegible con el título de la tarjeta.
- Regresión: `/api/geo`, `/api/climate`, `/atlas` responden 200. El mapa (Fase 8A) no fue tocado.

## 7. Resultado del build

`npm run build` → éxito, mismas 9 rutas que en fases anteriores, sin errores de TypeScript ni de compilación.

## 8. Problemas detectados pero fuera de alcance (no corregidos aquí)

- El overflow horizontal a nivel de documento completo en mobile **persiste**, pero se confirmó que ya **no lo causa** `.atlas-card-image` (corregido en esta fase) — la causa actual es `.secondary-access-card` dentro de `HomeSecondaryAccess.js` (la fila "Biblioteca visual / Calendario / Comparador / Newsletter"), un componente fuera del alcance explícito de esta tarea ("inspeccionar únicamente CategoryShowcase, AtlasVisualCard y CSS directamente relacionado"). Queda registrado en `TODO.md` para una futura fase.
- La tarjeta "Marco legal" muestra el texto "Marco legal" dos veces (una vez dentro de la ilustración SVG, otra vez como título de la tarjeta) — ya no se superponen ni cortan (bug corregido), pero la redundancia editorial en sí es una decisión de contenido preexistente (`tag: 'Contexto'`, `type: 'CONTEXTO'` en `editorialData.js`, que además se renderizan ambos en mayúsculas y se ven duplicados como "CONTEXTO CONTEXTO") — no se tocó por ser contenido editorial, fuera del alcance de una tarea de grid/CSS.

**FASE 8B TERMINADA. No se inicia el panel "Historia de la planta" ni la Fase 8C.**
