# 29 — Implementación de Fase 7A: Normalización del Modelo Editorial

## 1. Resumen

Se construyó una capa editorial estructurada (categorías, entradas, fuentes, assets, relaciones, tags, estado editorial, metadata) sobre el catálogo plano que existía desde Fase 5. La UI pública sigue funcionando sin regresiones — el mapa, `GeoSelector`, el Panel Ambiental y las APIs de geo/clima no se tocaron. Se migraron las 7 entradas y 7 categorías existentes sin escribir contenido nuevo. Se agregó una página `/creditos` que expone la procedencia real de los 7 assets con licencia externa. Se corrigieron dos enlaces `href="#"` muertos (nav "Enciclopedia" → `/atlas`, footer "Créditos" → `/creditos`) como cambio mínimo necesario para que `/creditos` fuera navegable, tal como pedía el encargo.

## 2. Arquitectura antes

```
src/app/lib/atlasData.js   ← única fuente de verdad, contenido plano
  atlasCategories[]  (7, campos planos: asset, alt, description...)
  atlasEntries[]      (7, campos planos: content string único, related: slugs de categoría)
  categoryBySlug() / entryBySlug()

page.js, atlas/page.js, atlas/[category]/page.js, atlas/[category]/[entry]/page.js
  → importan directo de atlasData.js
```

## 3. Arquitectura después

```
EDITORIAL DATA (editorial/editorialData.js — única fuente autoría)
        ↓
EDITORIAL REGISTRY / ADAPTER (editorial/registry.js)
        ↓ (también combina editorial/sources.js y editorial/assets.js)
ATLAS DATA COMPATIBILITY (atlasData.js — derivado, no autoría)
        ↓
UI EXISTENTE (page.js, atlas/page.js, atlas/[category]/page.js sin cambios)

atlas/[category]/[entry]/page.js y creditos/page.js
        ↓ consumen editorial/registry.js y editorial/assets.js DIRECTAMENTE
```

## 4. Archivos creados

- `src/app/lib/editorial/editorialData.js` — fuente de verdad estructurada (7 categorías + 7 entradas).
- `src/app/lib/editorial/sources.js` — 11 fuentes reales estructuradas (5 legales + 6 visuales).
- `src/app/lib/editorial/assets.js` — 8 assets reales estructurados (7 de categoría + 1 de entrada).
- `src/app/lib/editorial/tags.js` — vocabulario controlado (17 tags) + auditoría de duplicados.
- `src/app/lib/editorial/registry.js` — adaptador/API editorial.
- `src/app/creditos/page.js` — página pública de créditos/atribución.
- `MASTER_PACKAGE/28_EDITORIAL_CONTENT_MODEL.md`
- `MASTER_PACKAGE/29_PHASE_7A_IMPLEMENTATION.md` (este documento)

## 5. Archivos modificados

- `src/app/lib/atlasData.js` — reescrito de "fuente de verdad" a "adaptador de compatibilidad" (deriva desde `editorial/registry.js`; misma forma exportada, mismo comportamiento).
- `src/app/atlas/[category]/[entry]/page.js` — reescrito para consumir `editorial/registry.js` directamente y renderizar condicionalmente secciones/observaciones/señales/errores frecuentes/contexto ambiental/fuentes (ninguno de estos existe todavía en el contenido real, así que hoy no se renderiza ninguno — el código está listo, no forzado).
- `src/app/page.js` — dos correcciones de enlace (`Enciclopedia` → `/atlas`, agregado `Créditos` → `/creditos` en el footer). Sin cambios visuales ni de composición.
- `src/app/globals.css` — se agregaron reglas nuevas para `.atlas-entry-section`, `.atlas-sources*`, `.atlas-source-item`, `.credits-grid` y `.credit-card*`. No se modificó ninguna regla existente.

No se tocó: `GeoSelector.js`, `EnvironmentalPanel.js`, `CategoryShowcase.js`, `AtlasVisualCard.js`, `HomeSecondaryAccess.js`, `atlas/page.js`, `atlas/[category]/page.js`, `not-found.js`, `layout.js`, `/api/geo`, `/api/climate`, `/api/auth`, `/api/storage`.

## 6. Modelo editorial

Ver `MASTER_PACKAGE/28_EDITORIAL_CONTENT_MODEL.md` para el detalle completo de campos.

## 7. Modelo de fuentes

11 fuentes estructuradas, todas ya presentes en `19_SOURCE_REGISTRY.md` — ninguna investigada de nuevo. 5 legales (`ley-27350-reprocann`, `ley-23737-art5`, `fallo-arriola-csjn-2009`, `ley-27669-publicidad`, `ley-25326-datos-personales`) y 6 visuales (una por asset con licencia externa). No hubo ningún caso de `SOURCE_MAPPING_PENDING` — todas las fuentes que se decidió estructurar en esta fase se mapearon con claridad.

## 8. Modelo de assets

8 assets activos mapeados 1:1 desde `ASSET_REGISTRY.md`. Ninguno se buscó, generó o reemplazó. Se preservaron las dos notas de reserva ya documentadas en Fase 6 (`knownIssues` en el asset de Luz y clima por el recorte de composición, y en el de Cosecha por el tono estético) para que no se pierdan al pasar al nuevo modelo.

## 9. Relaciones

Migradas de `related` (slugs de categoría) a `relatedEntryIds` (IDs de entrada real) para las 7 entradas, sin ambigüedad porque cada categoría tenía exactamente una entrada publicada (detalle y advertencia sobre el futuro en el documento 28, sección "Relación entre entradas"). Verificado visualmente: la página de la entrada "Germinación" ahora muestra como relacionados los títulos reales "Sustrato, agua y drenaje" y "Luz como señal temporal" (antes hubiera mostrado nombres de categoría).

## 10. Migración de las 7 entradas

| Entrada | categoryId | relatedEntryIds (nuevo) | sourceIds | asset propio |
|---|---|---|---|---|
| germinacion | fundamentos | sustrato-y-drenaje, luz-y-fotoperiodo | [] | asset-germinacion-diagram |
| sustrato-y-drenaje | suelo-y-agua | germinacion, cultivo-en-secuencia | [] | asset-suelo-agua-profile |
| luz-y-fotoperiodo | luz-y-clima | cultivo-en-secuencia, cosecha-y-maduracion | [] | asset-luz-clima-photoperiodism |
| lectura-de-senales | sanidad | sustrato-y-drenaje, marco-editorial | [] | asset-sanidad-spider-mite |
| cultivo-en-secuencia | cultivo | germinacion, luz-y-fotoperiodo | [] | asset-cultivo-hemp-field |
| cosecha-y-maduracion | cosecha | cultivo-en-secuencia, marco-editorial | [] | asset-cosecha-drying |
| marco-editorial | marco-legal | lectura-de-senales, germinacion | ley-27350-reprocann, ley-23737-art5, fallo-arriola-csjn-2009 | asset-marco-legal-internal |

Todas conservan `editorialStatus: 'PUBLISHED'` (ver justificación en documento 28). Ningún contenido (`intro`) se modificó respecto del `content` original.

## 11. Créditos

`/creditos` lista los 7 assets con licencia externa (todo excepto el SVG interno de Marco legal) con imagen, licencia, crédito de atribución y enlace a la fuente original. No expone IDs internos ni JSON. Verificado visualmente en desktop — grilla de 3 columnas, coherente con el resto del sitio.

## 12. Cambios de UI

- Página de entrada: ahora tiene un bloque `Fuentes` que se muestra solo cuando `getSourcesForEntry(entry)` devuelve al menos una — hoy solo aparece en "Marco editorial y responsable". Las demás entradas no muestran ninguna caja vacía en su lugar.
- Nueva ruta `/creditos`.
- Nav "Enciclopedia" y footer "Créditos" ahora apuntan a rutas reales en vez de `#`.
- Ningún otro cambio visual — Home, mapa, categorías y el resto de la página de entrada quedan pixel-idénticos a como estaban al cierre de Fase 6.

## 13. Tests

No existen tests automatizados en el proyecto (`package.json` no define un script `test`, y no hay archivos `*.test.js`/`*.spec.js` en el repositorio) — no se ejecutó ninguno porque no hay ninguno que ejecutar, no porque se haya omitido. `npm run build` corre TypeScript/verificación de tipos como parte del build de Next.js y pasó sin errores (exit limpio) tanto después de introducir la capa editorial como después de reescribir la página de entrada y agregar `/creditos`. No existe un script `lint` separado en `package.json`.

## 14. Browser

Verificación real con Playwright (Chromium headless) en 1440×900, 1280×800 y 390×844, sobre Home, `/atlas`, `/atlas/fundamentos`, `/atlas/fundamentos/germinacion`, `/atlas/marco-legal/marco-editorial` y `/creditos` — 18 combinaciones. Resultado: status 200 en todas, cero errores de consola/página, cero imágenes rotas, cero apariciones de `NO_IMPLEMENTADO`/"pollinations"/`undefined`/`[object Object]` en el texto renderizado. Capturas revisadas visualmente para las piezas nuevas (entrada con fuentes, créditos, entrada sin fuentes) — todas coherentes con la identidad RELIEVE existente.

## 15. Regresión

Confirmado explícitamente tras los cambios: `/api/geo?layer=provinces` responde igual que antes (24 provincias, jerarquía `argentina -> provincia`, fuente IGN + INDEC); `/api/climate` responde 200; la Home sigue mostrando el prompt "¿Dónde cultivás?" y el "Panel ambiental"; ningún componente geográfico (`GeoSelector`, mapa SVG, Panel Ambiental) fue importado, tocado ni modificado en ningún archivo de esta fase.

## 16. Pendientes para Fase 7B

- Escribir contenido real estructurado (`sections`, `observations`, `signals`, `commonMistakes`, `environmentContext`) para las 7 entradas existentes.
- Investigar y mapear fuentes de contenido reales para las 6 entradas que hoy tienen `sourceIds: []`.
- Definir `lastReviewed` cuando exista una revisión editorial real.
- Ampliar entradas por categoría (el modelo ya lo soporta; hoy es 1:1).
- Definir `canonical`/`ogImage` cuando exista dominio de producción.

## 17. Qué NO se hizo (por regla explícita de esta fase)

CMS, base de datos, autenticación, dashboard editorial, cuentas de usuario, Mi Cultivo, newsletter, alertas climáticas, personalización, favoritos persistentes, diario de cultivo, calendarios regionales, recomendaciones climáticas automatizadas, generación de imágenes con IA, búsqueda de imágenes nuevas, investigación visual nueva, contenido editorial masivo o profundo, nuevas entradas, rediseño de Home/mapa/GeoSelector/Panel Ambiental.

## 18. Problemas encontrados

Un bug propio, detectado y corregido antes de cerrar la fase: la primera versión de la página de entrada calculaba mal la categoría de las entradas relacionadas (usaba una función auxiliar que siempre devolvía `undefined` y caía al slug de la categoría actual) — hubiera generado enlaces "relacionado" rotos para cualquier entrada relacionada que perteneciera a una categoría distinta a la actual. Se corrigió agregando `getCategoryById()` al registry y resolviendo la categoría real de cada entrada relacionada antes de construir el link. Verificado visualmente que "Germinación" (categoría Fundamentos) enlaza correctamente a "Sustrato, agua y drenaje" (categoría Suelo y agua) y "Luz como señal temporal" (categoría Luz y clima) con las URLs de categoría correctas.

## 19. Recomendación para Fase 7B

Empezar por una sola entrada (ej. "Germinación") y llevarla de punta a punta por el nuevo modelo — escribir 2-3 `sections` reales, sumar `observations`/`signals` si el contenido lo amerita genuinamente, y buscar 1-2 fuentes de contenido reales y verificables — antes de replicar el patrón a las otras 6. Esto valida que el modelo (secciones como array de objetos, sin Markdown parser) es suficiente en la práctica antes de comprometerse con él en todas las entradas.

---

## Addendum (Fase 7B1, 2026-09-10) — corrección de infraestructura detectada por el piloto

El piloto editorial de la entrada `germinacion` (`MASTER_PACKAGE/30_GERMINACION_PILOT.md`) encontró que el modelo de `observations`/`signals`/`commonMistakes`/`environmentContext` como `string | null` era insuficiente frente a contenido real (no podía representar las 3 categorías semánticas de `signals` ni el tipo de cada `commonMistake`). Se amplió a arreglos estructurados — cambio aditivo, sin romper las 6 entradas restantes (siguen en `null`). Detalle completo en `MASTER_PACKAGE/28_EDITORIAL_CONTENT_MODEL.md`, sección "MODEL_GAP detectado y resuelto en Fase 7B1".

**FASE 7A TERMINADA. No se inicia Fase 7B automáticamente.**
