# 36 — Cuadrado "De semilla al frasco" (Fase 8C)

Agrega una pieza nueva al grid del Atlas: la puerta de entrada futura al seguimiento de cultivo, sin implementar todavía ningún sistema real detrás.

## 1. Decisión de arquitectura

"De semilla al frasco" **no se agregó como categoría editorial** en `editorial/editorialData.js`/`atlasCategories`. Motivo: ese modelo (Fase 7A en adelante) es estrictamente para contenido enciclopédico investigado y fuenteado (`sourceIds`, `editorialStatus`, `signals`, etc.) — mezclar ahí una funcionalidad de producto futura (seguimiento personal de cultivo) habría roto la separación fuente-de-verdad que el proyecto mantiene desde Fase 7A. En cambio, se creó un componente autónomo (`TrackerShowcaseCard.js`) que se renderiza **junto a** las tarjetas de categoría dentro del mismo grid (`.atlas-grid`), sin pasar por `atlasCategories` ni por ningún registro editorial.

## 2. Qué se agregó

- **`src/app/components/TrackerShowcaseCard.js`** — nueva tarjeta cuadrada (reutiliza la clase base `.atlas-card` de Fase 8B para heredar `aspect-ratio: 1/1`, borde y overflow, sin tocar esa clase). Visualmente distinta a propósito de las tarjetas botánicas: fondo degradado verde oscuro (en vez de foto), insignia "Nuevo", y una lista de 7 etapas con marcadores de punto en vez de una fotografía — ninguna imagen generada por IA, ninguna imagen nueva buscada; es una composición gráfica interna con CSS/HTML, coherente con el mismo recurso visual ya usado en "Marco legal" (líneas + texto, sin fotografía).
- **`CategoryShowcase.js`**: se agregó `<TrackerShowcaseCard />` como último ítem del `.atlas-grid`, después de las categorías (recortadas o completas según `limit`). Las categorías existentes no se tocaron ni reordenaron.
- **`src/app/mi-cultivo/page.js`** — página mínima nueva, siguiendo el mismo patrón visual que `/creditos` (`atlas-page`, `atlas-topbar` con breadcrumb, `atlas-category-hero`). Contenido:
  - Las 7 etapas (`Semilla → Germinación → Tierra y sustrato → Crecimiento → Floración → Cosecha → Maduración y almacenamiento`) como lista visual de píldoras, con una nota explícita: "Esta secuencia es conceptual: todavía no registra fechas, notas ni fotos de ninguna planta real."
  - Dos tarjetas explicando el concepto de cuenta: **Sin cuenta** (carga durante la sesión, sin historial persistente) y **Con cuenta** (historial, fechas, notas y fotos persistentes) — con la aclaración explícita "Todavía no existe registro ni inicio de sesión en el sitio."
  - Un placeholder reservado para la futura línea de tiempo de fotos, con el texto "La carga de fotos todavía no está disponible" — ningún botón de upload real, ningún input de archivo.
  - CTA de salida "Volver al Atlas".
  - Ningún formulario, ningún botón que simule funcionalidad real; todos los estados "todavía no disponible" siguen el mismo tono honesto ya usado en el Panel Ambiental (`Pendiente`, `En preparación`, `Sin datos`).
- **`globals.css`**: reglas nuevas para `.tracker-card*` (la tarjeta del grid) y `.stage-sequence*`/`.mi-cultivo-account-grid`/`.mi-cultivo-account-tag`/`.photo-placeholder*`/`.mi-cultivo-cta-section` (la página `/mi-cultivo`). Se reutilizaron clases ya existentes donde fue posible (`.atlas-page`, `.atlas-topbar`, `.atlas-category-hero`, `.atlas-entry-section`, `.atlas-entry-grid`, `.atlas-entry-card`, `.atlas-section-note`, `.primary-button`) en vez de crear un sistema visual paralelo.
- **`page.js`** (Home): el link de navegación "Mi Cultivo" (antes `href="#"`, placeholder muerto) ahora apunta a `/mi-cultivo` — mismo concepto, cambio de una línea, evita tener dos entradas desconectadas al mismo destino futuro.

## 3. Qué NO se implementó (a propósito, por regla explícita de esta fase)

Autenticación, base de datos, persistencia real, carga de fotos, historial, chatbot. La página `/mi-cultivo` es puramente explicativa — ninguna interacción de esa página guarda ni envía datos a ningún lado.

## 4. Convivencia con el Atlas existente

Las categorías botánicas (`Fundamentos`, `Suelo y agua`, `Luz y clima` en la vista previa de Home; las 7 completas en el modelo) no se modificaron ni se reordenaron — `TrackerShowcaseCard` se agrega siempre al final del grid, como un ítem adicional. `/atlas` (la página de índice completo, con su propia lista en filas, sin relación con `.atlas-grid`) no fue tocada en esta fase — el nuevo cuadrado vive únicamente donde ya vivía el grid cuadrado de categorías (hoy, la vista previa de Home).

## 5. Pruebas realizadas

- `npm run build`: exit limpio, nueva ruta estática `/mi-cultivo` generada junto a las 10 rutas existentes.
- Playwright (Chromium headless) en 1440×900 y 390×844:
  - Grid de Home: 4 tarjetas (3 categorías + la nueva), proporción 1:1 exacta en la tarjeta nueva, categorías existentes con sus títulos intactos (`Fundamentos`, `Suelo y agua`, `Luz y clima`), sin overflow del componente `.category-showcase`.
  - Clic en la tarjeta nueva navega realmente a `/mi-cultivo` (`page.url()` verificado).
  - En `/mi-cultivo`: exactamente un `<h1>`, las 7 etapas presentes y contadas, sin errores de consola en ninguna de las dos resoluciones.
- Inspección visual: captura del grid de Home (la tarjeta nueva se distingue claramente del resto por color/composición) y de la página `/mi-cultivo` completa en desktop y mobile (las píldoras de etapas, las dos tarjetas de cuenta y el placeholder de fotos se leen con claridad, sin overflow ni deformación).
- Regresión: `/api/geo`, `/api/climate`, `/atlas` responden 200.

## 6. Resultado del build

`npm run build` → éxito. Rutas: `/`, `/_not-found`, `/api/auth/[...nextauth]`, `/api/climate`, `/api/geo`, `/api/storage`, `/atlas`, `/atlas/[category]`, `/atlas/[category]/[entry]`, `/creditos`, **`/mi-cultivo`** (nueva).

**FASE 8C TERMINADA. No se implementó autenticación, base de datos, upload, historial ni chatbot. No se modificó el mapa. No se inicia ninguna fase nueva automáticamente.**
