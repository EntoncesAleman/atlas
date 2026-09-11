# 28 — Modelo Editorial de Contenido (Fase 7A)

Documenta la infraestructura editorial estructurada introducida en Fase 7A. No es un cambio de contenido — es el modelo sobre el que Fase 7B podrá escribir contenido real sin reescribir la arquitectura.

## Dónde vive cada cosa

```
src/app/lib/editorial/
  editorialData.js   ← única fuente de verdad autoría (categorías + entradas)
  sources.js          ← registro estructurado de fuentes reales
  assets.js            ← registro estructurado de assets reales
  tags.js               ← vocabulario controlado
  registry.js            ← adaptador/API editorial (lo único que la UI debería importar)

src/app/lib/atlasData.js ← capa de compatibilidad: deriva la forma plana legada
                            (atlasCategories, atlasEntries, categoryBySlug, entryBySlug)
                            a partir de editorial/registry.js, para que page.js,
                            CategoryShowcase, atlas/page.js y atlas/[category]/page.js
                            sigan funcionando sin cambios.
```

No hay dos fuentes de verdad: todo contenido se edita en `editorialData.js`; `atlasData.js` nunca se edita a mano.

## Modelo de categoría

```
id, slug, title, tag, type, regionLabel, cta,
description, shortDescription, editorialDescription,
tags: [...],                 // vocabulario controlado, ver tags.js
metadata: { seoTitle, seoDescription, canonical, ogImage },
status: 'PUBLISHED'
```
El asset de una categoría no vive en el objeto de categoría — se resuelve por `categoryId` desde `assets.js` (`getCategoryAsset`), para no duplicar la misma información de asset en dos lugares.

## Modelo de entrada

```
id, slug, categoryId,
title, summary,
intro,                        // el contenido existente, preservado verbatim
sections: [],                 // [{ id, title, paragraphs, list?, note? }] — vacío si no hay
observations, signals, commonMistakes, environmentContext,  // string | null
tags: [...],
relatedEntryIds: [...],       // IDs de ENTRADA real, no de categoría (ver §Migración)
sourceIds: [...],             // IDs de ./sources.js
editorialStatus,              // ver §Estado editorial
lastReviewed,                 // fecha | null
metadata: { seoTitle, seoDescription, canonical, ogImage }
```

## Modelo de sección (dentro de `sections`)
```
{ id, title, paragraphs: [string, ...], list?: [string, ...], note?: string }
```
No se instaló ningún parser de Markdown ni editor enriquecido — es un array de objetos JS nativo, renderizado directamente en la página de entrada. Ninguna de las 7 entradas migradas usa `sections` todavía (su contenido sigue siendo un único párrafo en `intro`) — está listo para que Fase 7B lo use sin cambiar el modelo.

## Modelo de fuente (`sources.js`)
```
{ id, title, authorOrInstitution, url, type, publicationDate, accessedAt, notes }
```
Tipos: `OFFICIAL | ACADEMIC | SCIENTIFIC | AGRICULTURAL | LEGAL | VISUAL | OTHER`. En esta fase se estructuraron 11 fuentes reales (5 legales + 6 visuales), todas ya existentes en `MASTER_PACKAGE/19_SOURCE_REGISTRY.md` — ninguna se investigó de nuevo ni se inventó.

## Modelo de asset (`assets.js`)
```
{ id, file, type, categoryId, entryId, sourceId, author, license, sourceUrl, alt, credit, status, knownIssues? }
```
Estados: `ACTIVE | REVIEW | ARCHIVED | PENDING`. Se mapearon los 8 assets reales activos desde `MASTER_PACKAGE/ASSET_REGISTRY.md` (7 de categoría + 1 específico de la entrada Germinación) — no se buscó ni se reemplazó ningún archivo de Fase 6.

## Relación entre entradas

**Antes**: `related: ['suelo-y-agua', 'luz-y-clima']` — apuntaba a *slugs de categoría*.
**Ahora**: `relatedEntryIds: ['sustrato-y-drenaje', 'luz-y-fotoperiodo']` — apunta a *IDs de entrada real*.

La migración fue determinable sin ambigüedad para las 7 entradas actuales porque, a la fecha de esta fase, **cada categoría tiene exactamente una entrada publicada** — por lo tanto "relacionado con la categoría X" y "relacionado con la única entrada de X" son equivalentes hoy. Esto **no se mantendrá automáticamente**: el día que una categoría tenga dos o más entradas, una relación nueva deberá elegir explícitamente a qué entrada apunta — no hay un mecanismo de "categoría relacionada" implícito en el nuevo modelo, por diseño.

`getRelatedEntries(entry)` en `registry.js` resuelve esto en tiempo real; la página de entrada ya no reconstruye relaciones a mano vía `categorySlug`.

## Vocabulario de tags controlado

Base fija en `tags.js` (17 términos, según el encargo de esta fase). Auditoría: los tags actualmente en uso en las 7 entradas coinciden exactamente con términos de esta lista — no se encontró ningún duplicado semántico, no se eliminó ningún tag existente.

## Estado editorial

Valores permitidos: `DRAFT | REVIEW | PUBLISHED | ARCHIVED`.

**Decisión documentada**: las 7 entradas migradas mantienen `editorialStatus: 'PUBLISHED'` porque ya estaban publicadas (campos legados `state`/`type` en `atlasData.js`) antes de esta fase. **No se las degradó automáticamente a `REVIEW`** solo porque ahora existe el campo formal — eso habría sido un cambio de comportamiento visible (contenido que hoy es público dejaría de estarlo) disfrazado de refactor interno, y esta fase no está autorizada a alterar qué contenido es público. El campo `editorialStatus` queda listo para que, a partir de ahora, cualquier entrada *nueva* de Fase 7B nazca en `DRAFT` y pase por `REVIEW` antes de `PUBLISHED` — el flujo formal empieza a regir hacia adelante, no hacia atrás.

## Metadata editorial

`seoTitle`/`seoDescription` se completaron para las 7 entradas y 7 categorías, pero **derivándolos literalmente del título/resumen ya autoría** (no es contenido nuevo, es reuso). `canonical` y `ogImage` quedan explícitamente en `null` en las 22 entidades — no se inventó ninguna URL ni se decidió una estrategia de imagen social, porque el dominio de producción todavía no existe (hosting sigue `BLOCKED` en `TODO.md`).

## Adaptador editorial (`registry.js`)

```
getCategories()              → categorías PUBLISHED
getEntries()                  → entradas PUBLISHED
getCategory(slug)
getCategoryById(id)
getEntry(categorySlug, entrySlug)
getEntriesForCategory(category)
getRelatedEntries(entry)
getSourcesForEntry(entry)
getAssetsForEntry(entry)
getCategoryAsset(category)
```
Es la única puerta de entrada recomendada para código nuevo. `atlas/[category]/[entry]/page.js` ya lo consume directamente; `page.js` (Home), `atlas/page.js` y `atlas/[category]/page.js` siguen consumiendo `atlasData.js` (la capa de compatibilidad) sin cambios, porque no era necesario tocarlos en esta fase.

## Reglas de migración aplicadas

1. No se escribió contenido nuevo — `intro` es una copia exacta del `content` anterior.
2. Ningún campo sin dato real se completó con un valor inventado — se dejó `null` o `[]` explícito.
3. Ninguna fuente se inventó — las únicas `sourceIds` pobladas (`marco-editorial`) referencian fuentes que ya estaban en `19_SOURCE_REGISTRY.md` y son temáticamente exactas al contenido de esa entrada (marco legal), no una asociación forzada.
4. Ningún asset se buscó, generó o reemplazó — se mapearon 1:1 desde `ASSET_REGISTRY.md`.

## MODEL_GAP detectado y resuelto en Fase 7B1 (piloto "Germinación")

Al escribir contenido real por primera vez, `observations`, `signals`, `commonMistakes` y `environmentContext` resultaron insuficientes como campos de texto único (`string | null`):

- **Qué faltaba**: `signals` necesitaba representar tres categorías semánticas distintas (`ESPERABLE`/`ATENCIÓN`/`AMBIGUA`, requisito explícito de Fase 7B1) — un string plano no puede estructurar eso sin recurrir a formato de texto libre poco fiable. Lo mismo con `commonMistakes`, que necesita distinguir el *tipo* de error (observación/interpretación/contextualización) de su descripción. `observations` y `environmentContext` en la práctica necesitaban más de un párrafo cada uno.
- **Por qué faltaba**: en Fase 7A el modelo se diseñó sin contenido real todavía — se eligió el tipo más simple posible (`string | null`) precisamente para no inventar estructura sin evidencia de que hiciera falta.
- **Impacto**: bajo — el cambio es aditivo y no rompe ninguna otra entrada (las 6 restantes tienen estos campos en `null`, indiferente a la forma que tome un valor no nulo).
- **Solución aplicada** (pequeña, reversible, implementada directamente sin bloquear la fase, según la regla de la Fase 7B1 sobre `MODEL_GAP` menores):
  - `observations: string[] | null` — arreglo de párrafos.
  - `signals: { level: 'ESPERABLE' | 'ATENCIÓN' | 'AMBIGUA', description: string }[] | null`.
  - `commonMistakes: { type: string, description: string }[] | null`.
  - `environmentContext: string[] | null` — arreglo de párrafos.
- **Dónde se actualizó**: `editorial/editorialData.js` (dato), `atlas/[category]/[entry]/page.js` (render condicional por forma nueva), `globals.css` (estilos semánticos discretos, sin colores de alarma).

## Segundo hallazgo (menor, corregido antes de publicar): fuga de nota interna en un campo público

Al escribir la fuente `cientifica-cannabis-landraces-dormancy-2023`, la nota de verificación interna ("autoría/revista sin confirmar, HTTP 403...") se puso primero dentro de `authorOrInstitution` — campo que la UI muestra directamente en la sección "Fuentes" de la página pública. Se detectó al revisar la captura de pantalla de verificación (el texto interno aparecía en la página real) y se corrigió moviendo esa nota íntegramente a `notes` (campo que la UI nunca renderiza), dejando `authorOrInstitution` con una descripción pública limpia ("Publicación científica revisada por pares (ScienceDirect, 2023)"). Ver `MASTER_PACKAGE/30_GERMINACION_PILOT.md` para el detalle completo.

## Qué queda pendiente (explícitamente, para Fase 7B)

- Escribir `sections`, `observations`, `signals`, `commonMistakes` y `environmentContext` reales para las 7 entradas — hoy están vacíos/`null` a propósito.
- Poblar `sourceIds` de contenido para las 6 entradas que hoy no tienen ninguna (solo se resolvió `marco-editorial`, que tenía una correspondencia real y directa disponible).
- Definir `lastReviewed` real cuando exista una revisión editorial efectiva — no existe una fecha real hoy, por eso quedó `null` en las 7 entradas.
- Definir `canonical`/`ogImage` cuando exista dominio de producción y una estrategia de imagen social.
- Ampliar la biblioteca de entradas por categoría (hoy 1:1) — el modelo ya soporta N entradas por categoría sin cambios estructurales.
