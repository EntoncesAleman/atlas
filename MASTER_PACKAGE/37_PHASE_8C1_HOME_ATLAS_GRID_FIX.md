# 37 — Home/Atlas: Separación Real + Grid Completo + Imagen de "De semilla al frasco" (Fase 8C.1)

Corrige tres problemas encontrados tras 8C: la Home seguía mostrando contenido del Atlas debajo del bloque de entrada, el Atlas real (`/atlas`) no usaba el grid cuadrado de 8B, y la tarjeta "De semilla al frasco" tenía un rail de puntos poco representativo.

## 1. Home reducida a pantalla de entrada

`src/app/page.js` — se eliminaron de la Home:
- El `<nav className="main-nav">` completo (Argentina / Provincias / Enciclopedia / Clima / Mi Cultivo) y el botón "Explorar" del header — ninguno de los dos era funcional (eran `href="#"`, salvo Enciclopedia y Mi Cultivo). El header ahora solo muestra la marca.
- La sección `.home-env` (`EnvironmentalPanel`).
- La sección `.category-section` (`CategoryShowcase`, el grid de categorías).
- La sección `.secondary-section` (`HomeSecondaryAccess`).

Ninguno de estos tres componentes se borró — `EnvironmentalPanel.js` y `HomeSecondaryAccess.js` siguen existiendo en el proyecto, simplemente ya no se importan desde `page.js`. Quedan disponibles para una página de provincia/zona futura, tal como pedía la consigna ("no eliminar funcionalidades internas: simplemente no mostrarlas").

El footer se conservó (no está en la lista explícita de secciones a remover, y es la única vía de navegación a `/creditos`, `Privacidad` y `Términos` — documentos legalmente requeridos según `12_LEGAL.md`/`10_PRIVACY.md`).

## 2. Dos caminos de acceso

Los dos botones del hero (`hero-actions`), antes placeholders muertos (`href="#"`, "Explorar provincias" / "Explorar sin elegir ubicación"), pasan a ser los dos accesos pedidos:
- **"Ingresar como usuario"** → `/mi-cultivo` (la página ya preparada en Fase 8C que explica el concepto de cuenta/historial futuro — es el destino conceptualmente correcto hoy, sin inventar un sistema de auth nuevo).
- **"Ingresar libremente"** → `/atlas` (acceso directo al Atlas sin cuenta).

No se implementó autenticación ni persistencia — ambos son simplemente enlaces reales a páginas ya existentes.

## 3. El Atlas real ahora muestra el grid completo

`src/app/atlas/page.js` — reemplazada la lista en filas (`atlas-index-row`, que nunca había usado el sistema de tarjetas cuadradas) por `<CategoryShowcase showHeading={false} />`, que renderiza las 8 tarjetas (7 categorías + "De semilla al frasco") en el mismo `.atlas-grid` cuadrado de Fase 8B, sin límite. Se mantiene el hero propio de `/atlas` ("El Atlas" + lede) por encima del grid.

`CategoryShowcase.js` ganó una prop `showHeading` (default `true`) para poder reusarse sin duplicar el encabezado "Enciclopedia / Categorías del atlas" cuando la página ya tiene su propio título — sin tocar el comportamiento existente en ningún otro lugar.

## 4. Orden: "De semilla al frasco" primero

`CategoryShowcase.js`: `<TrackerShowcaseCard />` se mueve al principio del `.atlas-grid`, antes del `.map()` de categorías. Las categorías conservan su numeración propia (01–07), no afectada por la tarjeta especial al no participar del `index` del `.map()`.

## 5. Nueva imagen para "De semilla al frasco"

Se reemplazó el rail de puntos con texto (`.tracker-stage-rail`) por una ilustración interna nueva (`.tracker-evolution-graphic`, SVG inline en `TrackerShowcaseCard.js`): seis siluetas de una planta en tamaño creciente — semilla, brote, plántula, vegetativa, floración (con racimo de flores) — conectadas por una línea ascendente punteada que termina en un frasco. Es un **asset editorial interno** (código, no una imagen subida), consistente con la misma técnica ya usada para la ilustración de "Marco legal" — no se generó nada con IA, no se buscó ninguna fotografía nueva para esta tarjeta específica (el concepto de "evolución completa, de semilla a frasco" no corresponde a ningún momento fotografiable único). Se verificó visualmente que comunica evolución/recorrido con claridad: la secuencia de siluetas creciendo + la curva ascendente + el frasco final son legibles a simple vista.

## 6. Revisión de imágenes de categoría — reemplazo de "Luz y clima"

Revisión visual del grid completo (las 7 categorías): 6 de 7 son fotografías documentales reales, claras y representativas (Fundamentos usa deliberadamente una lámina botánica histórica, decisión ya tomada en Fase 6). **"Luz y clima" fue la única que calificaba para reemplazo**: su imagen (`Photoperiodism_in_plants.jpg`, un diagrama científico apaisado con bloques de texto en inglés) se leía como "un dibujo denso e ilegible" al recortarse a 1:1 — el texto quedaba cortado y la tarjeta no comunicaba el concepto de un vistazo (issue ya documentado desde Fase 6 como pendiente de composición).

**Fuente nueva investigada y verificada** (mismo proceso que Fase 6 — Wikimedia Commons, licencia confirmada por lectura directa de la página de archivo):
- **Candidatos evaluados**: fotos de "Category:Cannabis cultivation" (descartadas por depender del mismo fotógrafo — "Cannabis Pictures" — ya usado para Cosecha, y por no evocar "luz" con claridad más allá de "exterior, de día"); `Plant_under_a_phytolamp.jpg` (Alla Varta, CC BY 4.0) — fotografía documental real de una planta (ciclamen) bajo luz de cultivo artificial violeta, sin marca ni logo visible, sin estética de dispensario — **elegida** por comunicar el concepto de luz/fotoperiodo con claridad inmediata a escala de tarjeta.
- No es una fotografía de *Cannabis sativa* específicamente — se acepta por el mismo criterio ya usado para "Suelo y agua" (una fotografía de perfil de suelo genérico): la categoría trata el concepto ambiental general, no una especie puntual, y el diagrama que reemplaza como portada tampoco era específico de cannabis.

**Cómo se resolvió sin romper la entrada "luz-y-fotoperiodo"**: antes, un único asset (`asset-luz-clima-photoperiodism`) servía tanto de portada de categoría como de imagen de la entrada. Se creó un asset nuevo y separado, **`asset-luz-clima-cover`** (`categoryId: 'luz-y-clima'`, sin `entryId`), que ahora gana la resolución de `getCategoryAsset()` (prioriza assets de categoría sin `entryId`). El asset original del diagrama **no se tocó ni se eliminó** — sigue activo con su `entryId: 'luz-y-fotoperiodo'`, y sigue siendo la imagen de esa entrada (donde el diagrama es contenido pertinente y se lee en un contenedor más ancho, sin recorte cuadrado). Verificado visualmente: `/atlas/luz-y-clima` (portada de categoría) y `/atlas/luz-y-clima/luz-y-fotoperiodo` (entrada) muestran ahora imágenes distintas, cada una apropiada a su contexto.

**Archivos**:
- Nuevo: `public/atlas/categories/real/category-luz-y-clima-cover-real.jpg` (1280×853, CC BY 4.0).
- `src/app/lib/editorial/assets.js`: nuevo asset `asset-luz-clima-cover`; `asset-luz-clima-photoperiodism` conservado, `knownIssues` obsoleto removido (el problema que describía —recorte de la miniatura de categoría— ya no aplica porque ese asset dejó de usarse como portada).
- `src/app/lib/editorial/sources.js`: nueva fuente `visual-plant-under-phytolamp`; nota agregada a `visual-photoperiodism-diagram` explicando el cambio de uso.
- `MASTER_PACKAGE/ASSET_REGISTRY.md` y `19_SOURCE_REGISTRY.md`: filas actualizadas/agregadas, nota de composición reescrita.

## 7. Corrección adicional encontrada durante la prueba: overflow del footer en mobile

Al probar la nueva Home en 390×844 apareció un overflow horizontal (`.footer-links`, 5 enlaces en una sola fila sin `flex-wrap`) — no relacionado con el grid ni con `.atlas-card-image` (ya corregido en 8B), sino con el footer que esta fase sí mantiene visible en Home. Se agregó `flex-wrap: wrap` a `.footer-content` y `.footer-links` dentro del breakpoint `@media (max-width: 640px)` ya existente. Verificado: `scrollWidth === clientWidth` tras el fix.

## 8. Qué NO se implementó

Chatbot, autenticación real, base de datos, upload de fotos, calendario personalizado, panel "Historia de la planta", sistema de Mi Cultivo — todo sigue siendo estructura preparada (páginas y enlaces reales) sin funcionalidad real detrás, tal como pedía la consigna.

## 9. Pruebas realizadas

- `npm run build`: exit limpio, mismas 10 rutas que en 8C.
- Playwright (Chromium headless) en 1440×900 y 390×844:
  - Home: sin overflow de documento, sin `.category-showcase`/`.environmental-panel`/`.tracker-card`/`.main-nav` presentes, mapa (`.geo-picker`) presente.
  - Ambos accesos (`Ingresar como usuario` → `/mi-cultivo`, `Ingresar libremente` → `/atlas`) navegan correctamente (verificado por URL real tras el clic).
  - `/atlas`: 8 tarjetas en `.atlas-grid` (tracker + 7 categorías), la tracker es el primer elemento del grid, las 8 con ratio 1:1 exacto, sin overflow de página.
  - Sin errores de consola en ninguna combinación.
- Inspección visual: grid completo de `/atlas` (las 8 tarjetas, "De semilla al frasco" primera con su nueva ilustración de evolución, "Luz y clima" con la nueva fotografía), Home en desktop y mobile, página de categoría y de entrada de "Luz y clima" (confirmando que cada una usa la imagen correcta).
- Regresión: `/api/geo`, `/api/climate`, `/mi-cultivo`, `/creditos`, `/atlas/luz-y-clima`, `/atlas/luz-y-clima/luz-y-fotoperiodo` responden 200.

## 10. Resultado del build

`npm run build` → éxito. Mismas 10 rutas que al cierre de 8C (`/`, `/_not-found`, `/api/auth/[...nextauth]`, `/api/climate`, `/api/geo`, `/api/storage`, `/atlas`, `/atlas/[category]`, `/atlas/[category]/[entry]`, `/creditos`, `/mi-cultivo`).

**FASE 8C.1 TERMINADA. No se inicia el sistema de Mi Cultivo ni el chatbot.**
