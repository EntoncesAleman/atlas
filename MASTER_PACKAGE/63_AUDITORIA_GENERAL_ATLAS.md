# Auditoría general del Atlas — estado actual del proyecto

Fecha: 2026-09-16 (adenda: 2026-09-16, segunda pasada tras revisión) — **cierre de los 5 P1:
2026-09-16** — **bug Jujuy→Salta + P2-1/P2-2/P2-3/P2-6: 2026-09-16** — **P2-4/P2-5 (parcial,
con investigación real): 2026-09-16** — **cierre de los 3 P3: 2026-09-17**

## Estado de cierre de los P1 (2026-09-16)

Los 5 hallazgos P1 de este informe fueron corregidos y verificados con build + Playwright real.
Detalle de qué se hizo en cada uno, al final de su propia sección (buscar "**Cierre**" dentro de
P1-1 a P1-5B más abajo). Resumen:

| # | Hallazgo | Estado |
|---|---|---|
| P1-1 | Sin metadata por página / sin sitemap / sin robots.txt | ✅ Resuelto |
| P1-2 | Overflow horizontal real (768px tablet, 375px mobile) | ✅ Resuelto |
| P1-3 | Dos sistemas de "provincia" desincronizados | ✅ Resuelto (bridge, no fusión) |
| P1-4 | "Otras categorías" no relacionaba nada | ✅ Resuelto |
| P1-5A | Referencias "(ver X)" en texto plano | ✅ Resuelto |
| P1-5B | Mapa mobile: Tucumán/Misiones casi imposibles de tocar | ✅ Resuelto |

## Bug Jujuy→Salta, detectado al verificar P1-5B (2026-09-16)

**Diagnóstico**: no es un solapamiento de datos — el `<path>` de Jujuy y el de Salta no invaden
territorio ajeno. El problema es que Salta tiene una forma muy irregular (un "gajo" largo hacia
el este), y tanto su `centroid` guardado como su centroide geométrico real (área-ponderada, calculado
con la fórmula shoelace) caen matemáticamente **fuera de su propio polígono** y dentro del de
Jujuy — confirmado con un point-in-polygon test sobre las coordenadas reales de
`lib/geo/argentinaProvinces.js`. Cualquier clic apuntado "al centro de Salta" (el comportamiento
por default de un test automatizado, y el peor caso de un tap impreciso) caía sobre Jujuy.

**Corrección**: se calculó el "pole of inaccessibility" de Salta (el punto interior más alejado de
cualquier borde — la misma técnica que usan herramientas de mapas reales para ubicar una etiqueta),
verificado con point-in-polygon contra los 6 polígonos vecinos de Salta (Jujuy, Catamarca, Tucumán,
Santiago del Estero, Chaco, Formosa: ninguno lo contiene). Se agregó al mismo mecanismo de hitbox
invisible ya usado para CABA/Tucumán/Misiones (`src/app/components/GeoSelector.js`), como una
excepción explícita (`HITBOX_CENTROID_OVERRIDES`) que reemplaza el `centroid` guardado solo para
el área táctil — la geometría visible de Salta no se tocó.

**Residual, documentado y no corregido** (por no poder resolverse sin redistorsionar la geometría
real, algo explícitamente prohibido): un clic apuntado exactamente al centro matemático del
bounding-box de Salta —no a un punto visible de su territorio, ni al nuevo punto corregido— todavía
puede caer en Jujuy. Ningún usuario real llega a ese pixel salvo por casualidad: no se ve como
"el medio de Salta" en pantalla. Verificado: tocar cualquier punto visible de Salta (incluida la
zona sur/este de su forma) y el nuevo hitbox corregido seleccionan Salta correctamente; Jujuy,
Catamarca, Santiago del Estero, Chaco, Formosa, Tucumán y Misiones sin regresión.

---
Alcance: auditoría de comportamiento real (build + navegación real con Playwright + lectura de
código + contraste contra `MASTER_PACKAGE`). No se modificó código. Cada hallazgo fue reproducido
en ejecución real, no inferido solo de la existencia de un componente.

**Nota sobre la adenda**: la primera entrega de este informe (P1-1 a P1-3, P2-1 a P2-6, P3-1 a P3-3)
se quedó corta en tres áreas pedidas explícitamente: navegación dentro del contenido editorial,
usabilidad real del mapa en mobile, y si "categorías relacionadas" relaciona algo de verdad. Una
segunda pasada encontró 3 hallazgos reales adicionales (P1-4, P1-5, P2-7), agregados abajo sin
reescribir lo ya entregado.

Metodología: `npm run build`; recorrido de las 15 rutas con Playwright (desktop/tablet/mobile,
consola de errores, medición real de `scrollWidth` vs `clientWidth`); flujo completo de selección/
persistencia/deselección de provincia con clics reales; flujo completo de Mi Cultivo en modo sin
cuenta (provincia → clima real → evento → reload); prueba de login inválido; prueba de RLS de
Supabase con la anon key sin sesión; verificación cruzada de integridad de datos (`editorialData.js`
↔ `sources.js` ↔ `assets.js`, sin scripts, por parseo directo); contraste de `11_SEO.md`,
`09_SECURITY.md`, `10_PRIVACY.md`, `40_PHASE_10B_ACCOUNT_AUTH.md` contra el código real.

---

## Resumen ejecutivo

- **Build**: limpio, sin errores ni warnings de TypeScript/lint.
- **P0 (bloqueante)**: ninguno. El sitio funciona de punta a punta en las rutas y flujos probados.
- **P1**: 5 hallazgos — metadata/SEO por página inexistente (contradice `11_SEO.md`), overflow
  horizontal real en dos anchos de pantalla comunes, dos sistemas de "provincia" independientes que
  no se sincronizan, "Otras categorías" que no relaciona nada (siempre las mismas 3), y referencias
  cruzadas dentro del texto editorial que nombran otras entradas pero nunca son clickeables (más el
  mapa de Home con dos provincias casi imposibles de tocar en mobile).
- **P2**: 6 hallazgos — sin headers de seguridad, carpeta muerta `api/auth/`, 4 fuentes sin URL,
  sección Comunidad completamente vacía de datos reales, estructura editorial muy delgada (12/13
  categorías con una sola entrada), sin `error.js` de marca.
- **P3**: 3 hallazgos menores de pulido.

---

## P0 — Bloqueantes

Ninguno encontrado. Build limpio, las 15 rutas responden 200 (las inexistentes responden 404
correctamente vía `not-found.js`), no hay errores de consola en navegación normal, autenticación,
Mi Cultivo (modo local) y persistencia de provincia funcionan según lo verificado con clics reales.

---

## P1 — Problemas importantes

### P1-1. No existe metadata por página — el `seoTitle`/`seoDescription`/`canonical`/`ogImage` de cada categoría y entrada nunca llega al HTML

**Ubicación**: `src/app/layout.js` (única fuente de `<title>`/`<meta description>` de todo el sitio);
ausencia de `generateMetadata`/`export const metadata` en los 15 `page.js` restantes; campos
`metadata.seoTitle`/`seoDescription`/`canonical`/`ogImage` en cada categoría y entrada de
`src/app/lib/editorial/editorialData.js` (más de 25 ocurrencias).

**Evidencia**: se navegaron las 15 rutas reales con Playwright y `page.title()` devolvió
literalmente `"Atlas del Cultivo Argentino"` en TODAS — Home, `/atlas`, cada categoría, cada
entrada (`/atlas/fundamentos/ciclo-de-vida`, `/atlas/marco-legal/marco-editorial`, etc.), Comunidad,
Mi Cultivo, Chatbot. `grep` confirma que ningún archivo bajo `src/app` lee `seoTitle` fuera de donde
se define. No existe `sitemap.xml` ni `robots.txt` (`find` no encontró ningún archivo `sitemap*`/
`robots*` en `src/app`).

**Impacto**: contradice directamente `MASTER_PACKAGE/11_SEO.md` ("Title y meta description únicos
por página... canonical obligatorio en toda página... Sitemap XML"). El trabajo editorial de
redactar un `seoTitle`/`seoDescription` específico para cada una de las 13 categorías y 14 entradas
es, en la práctica, dato muerto: Google indexaría todo el sitio con el mismo título y la misma
descripción, y no hay sitemap que ayude a descubrir las páginas. Es la brecha más grande entre "lo
documentado como objetivo" y "lo que el código realmente hace" encontrada en esta auditoría.

**Posible solución** (no aplicada): agregar `generateMetadata()` en `atlas/[category]/page.js` y
`atlas/[category]/[entry]/page.js` leyendo `category.metadata`/`entry.metadata` ya existentes en el
registry; agregar `app/sitemap.js` y `app/robots.js` (soportados nativamente por Next.js) generados
desde `getCategories()`/`getEntries()`.

**Cierre (2026-09-16)**: exactamente eso. `generateMetadata()` agregado en `atlas/page.js`,
`atlas/[category]/page.js` y `atlas/[category]/[entry]/page.js` (lee `category.metadata`/
`entry.metadata` ya existentes). Para `comunidad/*`, `creditos` y `sobre-el-proyecto` (server
components) se agregó `export const metadata` directo con título/descripción propios de cada uno.
Para `mi-cultivo` y `chatbot` (client components, no pueden exportar `metadata`) se agregó un
`layout.js` server-side sibling — sin tocar el `page.js` de ninguno de los dos. `mi-cultivo` queda
además `noindex` (así lo pide `11_SEO.md` para rutas privadas). Se agregaron `app/sitemap.js` y
`app/robots.js` nativos de Next.js, generados desde `getCategories()`/`getEntries()`. Verificado:
`page.title()` y la meta description son distintos y coherentes con el contenido real en las 10
rutas probadas; `/sitemap.xml` y `/robots.txt` responden 200.

---

### P1-2. Overflow horizontal real en anchos de pantalla no cubiertos por las verificaciones anteriores

**Ubicación**: `.atlas-category-hero`, `.atlas-entry-hero`, `.atlas-entry-content-wrap` en
`src/app/globals.css` (líneas ~576-584 y el fallback `grid-template-columns: 1fr` en
`@media (max-width: 980px)`, líneas ~2140-2150).

**Evidencia** (medición real, no visual): 
- `/atlas/fundamentos/ciclo-de-vida` a 768px (ancho real de iPad/tablet en vertical) →
  `scrollWidth - clientWidth = 434px` de overflow horizontal.
- `/comunidad` a 375px (mobile) → `19px` de overflow horizontal.

Diagnóstico confirmado inspeccionando `getBoundingClientRect()` de los elementos reales: en ambos
casos el contenedor grid colapsa a `grid-template-columns: 1fr`, pero un `1fr` sin `min-width: 0`
conserva como mínimo implícito el ancho de "min-content" de su contenido — en `/comunidad` eso es la
palabra más larga del `<h1>` ("Conocimiento y territorio, en red") a `font-size: 56px`; en
`ciclo-de-vida` es la tabla de 6 columnas con `th { white-space: nowrap }` dentro de
`.atlas-entry-content-wrap`. El wrapper `.atlas-entry-table-wrap { overflow-x: auto }` existe y está
bien pensado, pero no llega a activarse porque el elemento que lo contiene (la columna del grid) ya
creció más allá del viewport antes de que el scroll interno pudiera limitar nada.

**Impacto**: los loops anteriores verificaron overflow en 1440/834/390px (desktop/tablet/mobile
"típicos" de las capturas) y en 1200/980/720/480px (breakpoints propios del grid de categorías), pero
nunca en 768px exacto (ancho real de tablet más común) ni en el `<h1>` largo de Comunidad a 375px —
por eso pasó sin detectarse en tres loops seguidos que pidieron explícitamente "sin overflow
horizontal". Es un ejemplo directo de "verificado en el loop anterior pero no funciona en la
práctica" en un ancho de pantalla real y común.

**Posible solución** (no aplicada): agregar `min-width: 0` a los grid items afectados (o al propio
`grid-template-columns: 1fr` de la media query), y revisar si `white-space: nowrap` en
`.atlas-entry-table th` debe caer a `normal` antes del breakpoint de 720px donde la tabla se apila.

**Cierre (2026-09-16)**: dos causas reales distintas, no una sola.
(1) A 768px (grid, entre 641-980px): se agregó `min-width: 0` a los hijos directos de
`.atlas-category-hero`/`.atlas-entry-hero`/`.atlas-entry-content-wrap` dentro de la media query de
980px — `ciclo-de-vida` pasó de 434px a 0px de overflow.
(2) A 375px (`/comunidad`): resultó ser un mecanismo distinto, no cubierto por la hipótesis
original de "solo falta `min-width:0`" — a ≤640px estos mismos contenedores pasan a
`display:flex; flex-direction:column`, y `align-items: flex-start` (heredado) hace que cada hijo
se dimensione por su propio max-content en vez de llenar el ancho disponible. Se cambió a
`align-items: stretch` para `.atlas-category-hero`/`.atlas-entry-hero` (`.atlas-topbar` se dejó
intacto, no estaba en el hallazgo). Eso solo no alcanzó: el título largo de Comunidad
("Conocimiento y territorio, en red") tiene una palabra ("Conocimiento") más ancha que el
contenedor de 343px al piso del `clamp()` de 56px — se agregó `overflow-wrap: break-word` a los
`h1` de hero (mecanismo estándar para ese caso límite, sin cambiar tipografía en ningún título que
ya entre bien). Verificado: 0px de overflow en ambos casos, y sin overflow nuevo en ninguna de las
19 combinaciones ruta×ancho reprobadas (incluye las rutas que no eran parte del hallazgo, como
regresión).

---

### P1-3. Dos sistemas de "provincia seleccionada" independientes que no se sincronizan

**Ubicación**: `atlas:selectedProvince`/`atlas:selectedZone` en `localStorage`
(`GeoSelector.js`, `ProvinceContextPanel.js`, `ProvinceProfileCard.js`, `ProvinceStatusBar.js`) vs.
`provinceId` dentro del objeto `cultivo` de Mi Cultivo (`mi-cultivo/page.js`, persistido en
`atlas:miCultivo` local o en la columna `province_id` de Supabase).

**Evidencia**: prueba real con Playwright — se eligió Córdoba en el mapa de Home (que persiste en
`atlas:selectedProvince` y se refleja correctamente en `/atlas` como "VIENDO · CÓRDOBA"), y
al entrar inmediatamente después a `/mi-cultivo`, el `<select>` de provincia de esa página muestra
`''` (sin elegir) — completamente ajeno a lo recién elegido en Home.

**Impacto**: en un producto que se presenta como "atlas geográfico", un usuario que ya indicó su
provincia en la portada razonablemente espera que Mi Cultivo la conozca — hoy tiene que elegirla
por segunda vez, sin que el sitio se lo explique en ningún lado. No es un bug de persistencia (cada
sistema persiste correctamente lo suyo, ya verificado), es una fragmentación de UX/arquitectura de
datos entre dos features que deberían compartir el mismo concepto de "dónde estoy".

**Posible solución** (no aplicada, requiere decisión de producto): decidir si deben unificarse (y
con qué prioridad si ambas tienen un valor guardado distinto) o si la separación es intencional y
amerita una aclaración visible en la UI de Mi Cultivo.

**Cierre (2026-09-16)**: se tomó la opción de puente, no de fusión (evita mezclar el
`localStorage` global del Atlas con `provinceId` por-cultivo, que en cuenta vive en Supabase y no
debía tocarse). En `mi-cultivo/page.js`, si el cultivo (local, sin cuenta) todavía no tiene
`provinceId` propio, se sugiere como valor inicial el de `atlas:selectedProvince` — nunca
sobreescribe una elección que la persona ya haya hecho dentro de Mi Cultivo, y nunca escribe a
Supabase en modo cuenta (cero cambios en `remoteStorage.js`/migración). Se agregó además una
frase aclaratoria junto al selector de provincia de Mi Cultivo explicando que es independiente del
de Inicio. Verificado: elegir Córdoba en Home y entrar a Mi Cultivo por primera vez ahora
pre-selecciona Córdoba automáticamente; la deselección de provincia (loop anterior) sigue
funcionando sin cambios.

---

### P1-4. "Otras categorías" no relaciona nada — siempre muestra las mismas 3 categorías fijas

**Ubicación**: `src/app/atlas/[category]/page.js` línea 86 —
`atlasCategories.filter((item) => item.id !== category.id).slice(0, 3)`.

**Evidencia**: se navegaron 4 categorías distintas y reales con Playwright y se leyó el contenido
real de la sección "Otras categorías":

```
marco-legal          -> ['Germinación', 'Suelo y agua', 'Luz y clima']
genetica-tipos        -> ['Germinación', 'Suelo y agua', 'Luz y clima']
manejo-poscosecha     -> ['Germinación', 'Suelo y agua', 'Luz y clima']
germinacion            -> ['Suelo y agua', 'Luz y clima', 'Crecimiento']
```

Es literalmente "los primeros 3 elementos del array de categorías, salvo la propia" — nunca cambia
según de qué categoría se trate. Visitar "Marco legal" sugiere Germinación/Suelo y agua/Luz y clima
como si fueran relacionadas, sin ninguna relación editorial real entre ellas.

**Impacto**: es una función de navegación con nombre ("Otras categorías" / *relacionado*) que un
usuario esperaría razonablemente que fuera contextual, y no lo es en absoluto — mecánicamente no
falla (no hay error, siempre renderiza algo), pero editorialmente está rota desde que se agregaron
más de 3 categorías al Atlas.

**Posible solución** (no aplicada): usar un criterio real (categorías de entradas listadas en
`relatedEntryIds` de la entrada actual, o simplemente un `slice` aleatorio/rotado por request en vez
de las primeras 3 del array fijo).

**Cierre (2026-09-16)**: se agregó `getRelatedCategories(category, limit)` en `registry.js` —
prioriza las categorías de las entradas que ya aparecen en `relatedEntryIds` de las entradas de la
categoría actual (ordenadas por frecuencia real), y solo si eso no alcanza para completar el
`limit` rellena con las categorías más cercanas en `order` (nunca aleatorio ni inventado).
`atlas/[category]/page.js` ahora usa esta función en vez de `slice(0, 3)` sobre el array completo.
Verificado en 5 categorías distintas: cada una devuelve una combinación distinta y coherente con
su contenido real (ej. Genética y tipos → Historia, por su vínculo real de `relatedEntryIds`).

---

### P1-5. Los cross-references editoriales ("ver X") son texto plano, nunca links — y dos provincias son casi imposibles de tocar en el mapa mobile

**Ubicación A — cross-references**: `section.paragraphs` en `editorialData.js` se renderizan como
`<p key={index}>{paragraph}</p>` en `atlas/[category]/[entry]/page.js` línea 86 — string plano, sin
ningún procesamiento de markdown/links. `grep` cuenta al menos 7 menciones explícitas del tipo
`(ver "Luz como señal temporal")`, `(ver "Cultivo en secuencia")`,
`(ver "Germinación y primera lectura del material")`, `(ver la entrada sobre luz)` dentro del texto
de las entradas — todas nombrando otra entrada real y publicada del Atlas, ninguna clickeable.
`grep -c "href="` sobre todo `editorialData.js` da **0**.

**Ubicación B — mapa mobile**: `src/app/components/GeoSelector.js` (mapa SVG de Home). Medido con
Playwright a 375px de ancho (mobile real): el `<path>` de **Tucumán mide 13×17px** y el de
**Misiones 19×21px** como área tocable real en pantalla — muy por debajo del mínimo de accesibilidad
táctil (WCAG 2.5.5 recomienda 44×44px; el mínimo AA de WCAG 2.2 es 24×24px). El propio código ya
reconoce este problema para CABA (su `<path>` real mide ~1×2px) y le agregó a propósito un
`<circle className="map-caba-hitbox" r={16}>` como área de toque más grande — pero no existe ningún
mecanismo equivalente para Tucumán ni Misiones, que quedan con el mismo problema sin resolver.

**Impacto**: (A) el Atlas invita constantemente a "ver" otra entrada relacionada y el lector no tiene
forma de llegar ahí con un clic — tiene que volver a Atlas y buscarla manualmente; es fricción de
navegación real y recurrente, no un caso aislado. (B) en un teléfono real, elegir Tucumán o Misiones
en el mapa —el punto de entrada principal de la Home— es genuinamente difícil de acertar con el dedo;
Misiones en particular tiene contenido real documentado en el Atlas (evidencia histórica
MisioPharma/Biofábrica), lo que hace más notorio que sea una de las dos provincias más difíciles de
seleccionar.

**Posible solución** (no aplicada): (A) convertir `paragraphs` en un array de fragmentos
`{text, linkToEntryId}` o adoptar un mini-parser de `(ver "Título")` → `<Link>`, resuelto contra
`getEntries()` en build/render. (B) agregar hitboxes invisibles ampliados (mismo patrón que CABA)
para Tucumán y Misiones, o subir el `stroke-width`/padding táctil de todas las provincias pequeñas.

**Cierre (2026-09-16)**:
(A) se agregó `lib/editorial/linkifyReferences.js` — detecta, dentro de un párrafo, los
fragmentos entre comillas que coinciden EXACTAMENTE (verbatim) con el `title` de otra entrada
publicada, y los envuelve en un `<Link>` real; el texto original en `editorialData.js` no se tocó
ni un carácter. Aplicado en `section.paragraphs`, `observations`, `environmentContext` y
`commonMistakes[].description` de la página de entrada. Verificado: 7 referencias reales
detectadas y clickeables (ej. `(ver "Cultivo en secuencia")` → navega a `/atlas/cultivo/
cultivo-en-secuencia` con el `<h1>` correcto); menciones sin comillas exactas ("ver más abajo",
"ver la entrada sobre luz") quedaron intactas como texto plano, tal como pedía la consigna
("no convertir por aproximación").
(B) se agregaron círculos invisibles de radio 52 (unidades del viewBox, mismo mecanismo que el
`map-caba-hitbox` ya existente) centrados en el centroide real de Tucumán y Misiones — la
geometría visible de ambas provincias no se tocó. Medido en pantalla a 375px: el área táctil pasó
de ~13×17px/~19×21px a 24×24px (mínimo WCAG 2.2 AA) para ambas. Probado con clics reales:
Tucumán, Misiones, CABA y las vecinas Catamarca, Santiago del Estero, Corrientes y Buenos Aires
seleccionan cada una la provincia correcta, sin solapamiento introducido por este cambio.
*(Nota aparte, no corregida por no ser parte de este hallazgo ni de los 5 P1: al probar vecinas se
detectó que el `<path>` de Jujuy intercepta clics dirigidos al centro de Salta —un problema de
geometría preexistente entre esas dos provincias, no relacionado con Tucumán/Misiones/CABA ni con
este cambio. Se deja documentado acá para un futuro P2, sin tocarlo ahora.)*

---

## P2 — Problemas menores

Estado de cierre (2026-09-16): 4 de 6 resueltos (P2-1, P2-2, P2-3, P2-6). P2-4 y P2-5 se
resolvieron parcialmente, con investigación e implementación real (ver cierre de cada uno más
abajo) — ninguno de los dos queda 100 % cerrado, por motivos documentados en su propio cierre
(no por falta de intento).

**P2-1. Sin headers de seguridad HTTP configurados.** No existe `next.config.js`/`next.config.mjs`
en la raíz del proyecto → sin CSP, sin `X-Frame-Options`, sin `X-Content-Type-Options`, sin
`Strict-Transport-Security`. `curl -I` confirma además `X-Powered-By: Next.js` expuesto (comportamiento
por defecto, apagable con `poweredByHeader: false`). Contrastar contra lo que declare
`09_SECURITY.md` — no se encontró ninguna mención de headers configurados ahí tampoco.

**Cierre (2026-09-16)**: ✅ Resuelto. Se creó `next.config.js` con `poweredByHeader: false` y
`headers()` agregando `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(),
geolocation=()` (refuerza la promesa de `10_PRIVACY.md` de nunca pedir GPS) y
`Strict-Transport-Security`. Se agregó también un `Content-Security-Policy` siguiendo el patrón
"Without Nonces" documentado en `node_modules/next/dist/docs/.../content-security-policy.md`
(deliberadamente sin nonces, que forzarían renderizado dinámico en todo el sitio — cambio de
arquitectura fuera de alcance) — con `connect-src`/`img-src` habilitando el host real de Supabase
(leído de `NEXT_PUBLIC_SUPABASE_URL`, usado por auth y por las fotos de Mi Cultivo en Storage).
Verificado con Playwright: los 5 headers + CSP presentes en la respuesta real; navegación por las
rutas clave sin errores de consola; login inválido en Mi Cultivo sigue devolviendo el mensaje de
error esperado (confirma que el fetch a Supabase no quedó bloqueado por el CSP); clima real en Mi
Cultivo sigue funcionando. `X-Powered-By` ya no aparece.

**P2-2. `src/app/api/auth/` es una carpeta vacía sin `route.js`.** No rompe nada (no hay ninguna
referencia a `/api/auth/*` en el código), pero es un directorio de scaffolding muerto — code smell
a limpiar en un loop de higiene.

**Cierre (2026-09-16)**: ✅ Resuelto. Carpeta eliminada tras confirmar (grep) que ningún archivo del
proyecto referencia `/api/auth`. Build limpio después de borrarla.

**P2-3. 4 fuentes en `sources.js` con `url: null`**: `academica-white-mastalerz-1966-container-capacity`,
`cientifica-spencer-1971-solar-declination`, `academica-cooper-1969-solar-geometry`,
`historica-belgrano-1797-memoria-lino-canamo`. Plausiblemente legítimo (papers pre-internet / documento
de archivo), pero un lector no puede verificarlas con un clic como sí puede con las otras 65 —
vale la pena una nota editorial explícita en vez de dejarlas indistinguibles de un dato faltante.

**Cierre (2026-09-16)**: ✅ Resuelto. En `atlas/[category]/[entry]/page.js`, cuando `source.url` es
`null` ahora se muestra `(sin enlace público disponible)` junto al título de la fuente (estilo
discreto, `title` con la explicación completa al pasar el mouse) — nunca se inventó una URL, y no
se tocó el texto editorial de ninguna entrada, solo la presentación de la lista de fuentes.
Verificado en las dos entradas publicadas que citan alguna de estas 4 fuentes
(`sustrato-y-drenaje`, `historia-de-la-planta`): la etiqueta aparece correctamente.

**P2-4. La sección "Comunidad" completa (4 subpáginas + franja de aliados) no tiene ni un solo dato
real.** `communityClubs`, `communityEvents`, `communityCourses`, `communityVoices` y `atlasPartners`
en `lib/community/communityData.js` están todos vacíos (`[]`). Cada subpágina renderiza
correctamente su estado vacío (no hay contenido simulado, coherente con la regla del proyecto de no
inventar), pero en la práctica es una sección entera de navegación principal sin ningún contenido
real todavía.

**Cierre parcial (2026-09-16).** Se investigó activamente (búsqueda + verificación directa de cada
fuente contra su página oficial, no solo resultado de buscador) qué clubes, eventos, cursos, voces
y aliados reales existen. Resultado, por colección:

- **Agenda: 2 eventos reales agregados.** "II Congreso Internacional de Cáñamo Industrial y
  Cannabis Medicinal" (UNAJ + investigadores de CONICET/ENyS, Florencio Varela, 8-9 de mayo de
  2026, ya realizado) y "1er Congreso Internacional y 4to Congreso Argentino de Cannabis y Salud"
  (UNR/AUPAC/SADCYT con la Red RACME de CONICET, Rosario, 7-9 de octubre de 2026, próximo). Ambos
  son congresos académicos institucionales, verificados por fetch directo de su fuente oficial —
  no expos comerciales.
- **Formación: 2 cursos reales agregados.** "Diplomado en Cultivo de Cannabis Sativa" (Facultad de
  Ciencias Agrarias, UNCuyo, Mendoza, próxima cohorte 7 de octubre de 2026) y "Curso de Producción
  de Aceite de Cannabis" (UTN FRBA, online, certificado oficial). Un tercer candidato (AAMI) se
  descartó por tener inscripciones cerradas y fecha "a confirmar" — no había nada vigente que
  documentar sin inventar una fecha.
- **Clubes: sigue vacío, a propósito.** El candidato más documentado institucionalmente (Mamá
  Cultiva Argentina) se descartó tras verificar directamente su sitio oficial: opera "Tienda y
  Dispensario" con venta de flores/aceites — un enlace ahí sería un enlace a un punto de venta de
  cannabis, lo que prohíbe la regla dura D5 de `16_DECISIONS.md` ("cero venta, cero marcas, cero
  enlaces a puntos de venta/clubes de cultivo"). Ninguna otra organización verificada resultó libre
  de ese mismo conflicto.
- **Voces del territorio: sigue vacío, a propósito.** Son entrevistas editoriales propias
  (requieren conversar con una persona real) — no un dato verificable por investigación de
  escritorio como las dos colecciones de arriba.
- **Aliados del Atlas: sigue vacío, a propósito.** Ser citado como fuente (INTA/CONICET/UNCuyo ya
  lo son en `sources.js`) no es lo mismo que ser "aliado" — esa palabra implica una relación de
  colaboración real que no existe y no debía inventarse.

Verificado con Playwright: las 2 páginas con contenido nuevo (Agenda, Formación) renderizan los
datos reales con su fuente enlazada, sin overflow en 375px/768px, sin errores de consola; Clubes y
Voces siguen mostrando el estado "Próximamente" sin contenido de relleno; `/atlas` conserva la
franja de aliados en su único estado válido ("Próximamente"). No se inventó ningún club, evento,
fecha ni enlace.

**P2-5. Estructura editorial muy delgada: 12 de las 13 categorías tienen exactamente 1 entrada**
(la única excepción es Germinación, con 2). Ya identificado conceptualmente en
`62_LOOP_08_MAPA_MUNDIAL.md` como huecos de contenido — se restaca acá porque el pedido de esta
auditoría incluye explícitamente "estructura editorial" y "categorías".

**Cierre parcial (2026-09-16).** `62_LOOP_08_MAPA_MUNDIAL.md` §4 ya había identificado 4 huecos
concretos, ordenados por claridad estructural. Se resolvieron los 3 no legales, cada uno con fuente
real verificada por lectura directa (o, cuando el editor bloqueó el acceso al texto completo,
marcada explícitamente `PARCIAL` en `sources.js`, nunca presentada como lectura completa):

1. **"Cuidado de la plántula post-emergencia"** (hueco #1) → entrada nueva `cuidado-de-la-plantula`
   en Crecimiento (categoría `fundamentos`), con evidencia GENERAL (extensión agrícola
   universitaria, no específica de Cannabis, igual que ya hace el atlas en "Suelo y agua"/
   "Fertilización") sobre damping-off y etiolación.
2. **"Química de la maduración: tricomas y cannabinoides"** (hueco #3) → entrada nueva
   `quimica-de-la-maduracion` en Cosecha, con evidencia CANNABIS (biosíntesis CBGA→THCA/CBDA/CBCA;
   tres tipos de tricoma glandular y su contenido diferencial de cannabinoides) — completa,
   sin duplicar, lo que "Genética y tipos: sativa, indica, ruderalis" ya declaraba fuera de su
   propio alcance.
3. **"Escarificación y semillas con dormición dura"** (hueco #4) → sección nueva agregada dentro de
   la entrada existente `formas-de-germinar` (no una entrada aparte, siguiendo la sugerencia del
   propio mapa), con evidencia GENERAL sobre dormición física y escarificación.

**No se tocó el hueco #2** ("Cáñamo industrial y régimen de licencias", dentro de Marco legal): el
propio mapa lo marca de alta sensibilidad legal y pide verificación contra Boletín Oficial
(ARICCAME, Res. MSAL 1780/2025, Res. ARICCAME 41/2026) antes de redactar — una pasada de
verificación legal dedicada que excede el alcance de esta tarea. Queda documentado como pendiente,
no como resuelto.

Se agregaron 5 fuentes nuevas a `sources.js` (2 AGRICULTURAL, 1 ACADEMIC, 2 SCIENTIFIC) y 2
entradas nuevas a `editorialData.js`, con `relatedEntryIds` cruzados en ambos sentidos hacia las
entradas existentes que ya las mencionaban (`germinacion`, `ciclo-de-vida`, `cosecha-y-maduracion`,
`genetica-y-tipos`). Estado real después de este cierre: 3 de 13 categorías tienen 2 entradas
(Germinación, Crecimiento, Cosecha); las 10 restantes siguen con 1 — el hueco estructural general
que señala P2-5 no se cerró por completo, se redujo en los 3 puntos que el propio proyecto ya había
identificado como más claros y viables sin nueva investigación legal.

Verificado: integridad de datos por parseo directo (0 `relatedEntryIds`/`sourceIds`/`categoryId`
huérfanos en las 16 entradas), `npm run build` limpio, y las 2 entradas nuevas navegadas con
Playwright — título/H1 coherentes, 0px de overflow en 375px/768px, sin errores de consola, y los
cross-references entre comillas (`(ver "...")`) enlazando correctamente vía el mecanismo de
`linkifyReferences.js` ya existente (cerrado en P1-5A).

**P2-6. No hay `error.js`** (error boundary de Next.js) en `src/app`. Sí existe `not-found.js`
(bien resuelto), pero un error de render/servidor inesperado caería en la pantalla de error genérica
de Next en vez de una con la identidad visual del sitio.

**Cierre (2026-09-16)**: ✅ Resuelto. Se agregó `src/app/error.js` (cliente, con la prop `retry` —
no `reset`: esta versión de Next.js renombró el callback, confirmado en la doc local del paquete
antes de escribirlo), con el mismo estilo visual que `not-found.js` y botón de reintento + vuelta
al Atlas. Verificado en vivo: se creó temporalmente una ruta que lanza un error real, se confirmó
que `error.js` la captura (título "Algo salió mal", botón "Reintentar" funcional) en vez de caer en
la pantalla genérica de Next, y la ruta de prueba se eliminó después.

---

## P3 — Mejoras menores

Estado de cierre (2026-09-17): **3 de 3 resueltos.**

**P3-1.** El Chatbot se llama "Chatbot del Atlas" pero hoy es retrieval puro (devuelve entradas
relacionadas, no arma una respuesta conversacional) — ya está aclarado con una nota in-page
("todavía no arma una respuesta conversacional"), así que el riesgo de confusión es bajo, pero el
nombre podría ajustarse mientras tanto.

**Cierre (2026-09-17):** ✅ Resuelto. Se renombró a "Buscador del Atlas" en las 4 superficies
donde aparecía el nombre anterior: `chatbot/layout.js` (metadata `title`/`description`),
`chatbot/page.js` (breadcrumb, `<h1>`, copy del gate de autenticación, nota de estado), y la
mención cruzada en `mi-cultivo/page.js` ("Usar el Buscador del Atlas con contexto de tu propio
cultivo"). Cambio de nombre visible únicamente — la ruta (`/chatbot`), el código de
retrieval/contexto y `sitemap.js` no se tocaron. Verificado con Playwright: el texto "Chatbot del
Atlas" ya no aparece en ningún lado del sitio; "Buscador del Atlas" aparece de forma consistente;
sin errores de consola ni overflow nuevo.

**P3-2.** No hay `loading.js` para las rutas dinámicas (`/atlas/[category]`,
`/atlas/[category]/[entry]`) — sin esqueleto de carga durante la navegación. Impacto bajo dado que
son datos estáticos en memoria (sin espera real), pero es la convención de Next.js que falta.

**Cierre (2026-09-17):** ✅ Resuelto. Se agregaron `atlas/[category]/loading.js` y
`atlas/[category]/[entry]/loading.js`, reutilizando las clases reales de cada página
(`atlas-category-hero`/`atlas-entry-grid` en una, `atlas-entry-hero`/`atlas-entry-content-wrap`/
`atlas-entry-aside` en la otra) para que el esqueleto tenga aproximadamente la misma forma que el
contenido real — sin duplicar el layout ni crear un segundo sistema visual. Se agregaron 2 clases
CSS nuevas (`atlas-skeleton-block`/`atlas-skeleton-line`, con `prefers-reduced-motion` respetado) a
`globals.css`, reutilizando los tokens de color ya existentes. Verificado: `npm run build` genera
ambas rutas dinámicas sin error; navegación real a ambas rutas sin overflow ni errores de consola.

**P3-3.** `/api/climate` devuelve `error.message` crudo en el cuerpo de la respuesta 500
(`src/app/api/climate/route.js`) — fuga menor de detalle interno, sin impacto de seguridad real dado
que no hay secretos en ese mensaje, pero no es buena práctica exponerlo tal cual al cliente.

**Cierre (2026-09-17):** ✅ Resuelto. Se quitó `detail: error.message` del cuerpo de la respuesta
500 — el detalle ahora se registra con `console.error` en el servidor (para diagnóstico) sin
exponerlo al cliente; el cuerpo público mantiene el mismo `error: 'climate_provider_exception'`
ya usado, sin cambiar el contrato de la API para quien la consume. Verificado: `/api/climate` en
su camino de éxito no incluye ninguna clave `detail`; build limpio.

---

## Verificaciones positivas (lo que SÍ funciona, confirmado en ejecución real)

- **RLS de Supabase realmente enforced**, no solo documentado: se consultaron `cultivos` y
  `cultivo_events` con la anon key pública sin sesión activa y ambas devolvieron 0 filas sin error —
  el aislamiento entre usuarios que promete `40_PHASE_10B_ACCOUNT_AUTH.md` se comprobó en vivo.
- **Sin geolocalización, sin analytics/tracking, sin cookies, sin `dangerouslySetInnerHTML`** en
  todo `src/app` — coherente con las promesas de `10_PRIVACY.md`.
- **Integridad de datos editoriales**: se verificó por parseo directo (no visual) que las 14
  entradas, sus `relatedEntryIds`, sus `sourceIds` y las referencias `categoryId`/`entryId` de
  `assets.js` no tienen ningún huérfano — cero inconsistencias.
- **Mi Cultivo (modo sin cuenta)** probado de punta a punta con clics reales: elegir provincia trae
  clima real de Open-Meteo, registrar evento funciona, y sobrevive a un reload completo de página.
- **Login con credenciales inválidas** maneja el error correctamente (mensaje en español, sin
  crash, sin quedar colgado).
- **Deselección de provincia** (corregida en el loop anterior) se reconfirmó funcionando en este
  loop: sin provincia → nacional, seleccionar → persiste, recargar → persiste, quitar desde una
  entrada → se queda en la misma URL y vuelve a nacional, recargar → sigue nacional, cambiar de
  provincia → sin zona residual.
- **13 categorías, cero huérfanas, orden correcto**, todas con al menos 1 entrada — la reorganización
  de loops previos sigue íntegra.
- **Accesibilidad básica sin errores**: chequeo automatizado en 6 rutas (Home, Atlas, una entrada,
  Mi Cultivo, Chatbot, Comunidad) no encontró ninguna `<img>` sin `alt`, ningún `<button>` sin texto
  ni `aria-label`, ni ningún `<input>`/`<select>` sin label asociado.

---

## Archivos/documentos principalmente afectados por los hallazgos

- `src/app/layout.js`, todos los `page.js` bajo `src/app/atlas/` (P1-1)
- `src/app/globals.css` (P1-2, reglas de grid en `.atlas-category-hero`/`.atlas-entry-hero`/
  `.atlas-entry-content-wrap`)
- `src/app/mi-cultivo/page.js` vs. `src/app/components/GeoSelector.js`/`ProvinceStatusBar.js` (P1-3)
- `src/app/atlas/[category]/page.js` (P1-4)
- `src/app/lib/editorial/editorialData.js` + `src/app/atlas/[category]/[entry]/page.js` (P1-5A);
  `src/app/components/GeoSelector.js` (P1-5B)
- `next.config.js` (ausente — P2-1)
- `src/app/api/auth/` (P2-2)
- `src/app/lib/editorial/sources.js` (P2-3)
- `src/app/lib/community/communityData.js`, `src/app/comunidad/agenda/page.js`,
  `src/app/comunidad/formacion/page.js`, `src/app/globals.css` (P2-4, cierre parcial 2026-09-16)
- `src/app/lib/editorial/editorialData.js`, `src/app/lib/editorial/sources.js` (P2-5, cierre
  parcial 2026-09-16, huecos ya identificados conceptualmente en `62_LOOP_08_MAPA_MUNDIAL.md`)
- `MASTER_PACKAGE/11_SEO.md` (documento cuyas decisiones no están implementadas — P1-1)
- `src/app/chatbot/layout.js`, `src/app/chatbot/page.js`, `src/app/mi-cultivo/page.js` (P3-1)
- `src/app/atlas/[category]/loading.js`, `src/app/atlas/[category]/[entry]/loading.js`,
  `src/app/globals.css` (P3-2)
- `src/app/api/climate/route.js` (P3-3)

**No se modificó ningún archivo durante esta auditoría.**

---

## CHECKPOINT FUNCIONAL DE PRODUCTO

Fecha: 2026-09-17. Recorrido de extremo a extremo de todas las piezas existentes del Atlas para
confirmar que forman un producto funcional y coherente — no es una nueva auditoría (no se investigó
contenido, no se revisaron fuentes, no se tocó arquitectura ni categorías) y no repite el trabajo de
P0-P3, ya cerrados. Verificación con Playwright real contra `npm run dev` (desktop, 768px, 375px) +
`npm run build`.

### Rutas y flujos recorridos, con resultado (A = funciona, B = funciona pero mejorable, C = falla)

| # | Flujo | Resultado |
|---|---|---|
| 1 | Home: carga, mapa (26 `<path>`, `aria-label` por provincia), selección de provincia (Córdoba) → resumen de selección actualizado → botón "Explorar" | A |
| 1 | Persistencia: `atlas:selectedProvince` en localStorage tras "Explorar", visible en `/atlas` ("viendo Córdoba") y sobrevive a un reload | A |
| 1 | Quitar provincia (`.atlas-province-status-clear` en una entrada) → localStorage se limpia → sigue limpio tras reload → vuelve a contexto nacional | A |
| 1 | Responsive Home (768px/375px) | A |
| 2 | Atlas: 14 cards (13 categorías + promo "De semilla al frasco" de Mi Cultivo), orden estable, todas las imágenes cargan (0 rotas) | A |
| 2 | Entrar a categoría → volver al atlas | A |
| 2 | Franja de aliados visible al final de `/atlas` (estado "Próximamente", sin aliados inventados) | A |
| 3 | Categoría → listado de entradas, imágenes, entrar a una entrada | A |
| 3 | Entrada: fuentes agrupadas por scope, imagen hero, tags, "Contenido relacionado" (`.atlas-aside-link`), ficha provincial | A |
| 3 | "Otras categorías" presente y con relación real (cierre de P1-4, sin regresión) | A |
| 3 | Volver / anterior / siguiente dentro de la categoría | A |
| 3 | `loading.js` de categoría y de entrada: compilan y generan la ruta dinámica sin error (`npm run build`); impacto real bajo ya documentado en P3-2 | A |
| 3 | Ruta de categoría inexistente → `not-found.js` real (no la pantalla genérica de Next) | A |
| 4 | Buscador del Atlas: acceso, gate de autenticación para usuario sin sesión, cero menciones a "Chatbot del Atlas" en todo el sitio | A |
| 4 | Búsqueda real / resultados / abrir resultado / sin-resultados / autenticación | B — no re-verificado con una cuenta real en este checkpoint (ya cubierto con sesión real en cierres anteriores de P1/13A-13C); el gate y el cero-regresión del renombre sí se confirmaron en vivo |
| 5 | Mi Cultivo: acceso, modo sin cuenta, selección de provincia, clima real de Open-Meteo (11°C, humedad, pronóstico, alerta de helada), línea de tiempo/etapas, formulario "Registrar evento" | A |
| 5 | Persistencia de `atlas:miCultivo` en localStorage tras reload | A |
| 5 | Volver al Atlas sin romper el contexto geográfico ya elegido | A |
| 5 | Fotos (modo cuenta) y sesión autenticada existente | B — no re-verificado con login real en este checkpoint (requiere credenciales de prueba; ya cubierto con cuenta real en cierres de Fase 10B/10C/P1) |
| 6 | Comunidad: hub, Agenda (2 tarjetas reales, enlaces a CONICET/congresodecannabis.com → 200), Formación (2 tarjetas reales, enlaces a UNCuyo/UTN → 200), Clubes y Voces en estado "Próximamente" sin relleno | A |
| 6 | Responsive Comunidad (768px/375px) | A |
| 7 | Sobre el proyecto, Créditos (21 fuentes visuales listadas con licencia/atribución/enlace) | A |
| 7 | Responsive institucionales | A |
| 8 | `/api/climate` con lat/lon reales → 200, payload con `current`/`daily`; respuesta de error ya no expone `detail` (P3-3, sin regresión) | A |
| 9 | Responsive general (desktop/768/375) en Home, Atlas, categoría, entrada, Comunidad, Mi Cultivo, institucionales: 0px de overflow horizontal en todos los casos probados | A |
| 10 | `npm run build` limpio (17 rutas) | A |
| 10 | `sitemap.xml` (39 URLs) — las 39 responden 200, cero rutas muertas | A |
| 10 | `robots.txt` — 200 | A |
| 10 | Imágenes: 0 respuestas ≥400 en todo el recorrido (incluye las 13 imágenes reales de la ronda visual anterior) | A |

### Correcciones realizadas

Ninguna. No se encontró ningún fallo funcional durante el recorrido — todo lo probado quedó en
estado A, salvo dos B explícitamente documentados arriba (no son fallos, son alcance no
re-verificado en este checkpoint por requerir una sesión autenticada real).

### Mejoras futuras detectadas (no corregidas, no bloquean)

- Verificar el flujo de Búsqueda del Atlas y Mi Cultivo con una sesión autenticada real en un
  próximo loop dedicado (fila 4 y 5 de la tabla) — no es una regresión conocida, es cobertura que
  este checkpoint no reprodujo.
- Nada nuevo más allá de lo ya documentado en `ASSET_REGISTRY.md` (reserva de calidad de Poda) y en
  P2-5 (hueco legal de cáñamo industrial, pendiente de verificación dedicada).

### Bloqueos reales

Ninguno.

