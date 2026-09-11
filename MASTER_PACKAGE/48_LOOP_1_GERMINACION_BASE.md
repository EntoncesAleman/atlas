# 48 — Loop 1: Crecimiento / Germinación — base editorial

Primer loop editorial corto (no enciclopédico) sobre la entrada `germinacion` (categoría
`fundamentos`, mostrada como "Crecimiento" desde el Patch 47.2). Objetivo: dejarla lista para
publicar como pieza editorial completa — introducción, historia, mecanismo, observación,
contexto y relación con otras etapas — sin abrir los 8 loops de investigación enciclopédica.

## 1. Qué ya existía (Fase 7A/7B2) y qué se decidió conservar

La entrada ya tenía: `intro` (introducción), 5 secciones (`que-es-la-germinacion`,
`que-esta-ocurriendo`, `primeras-senales`, `condiciones-ambientales`, `lectura-de-la-plantula`),
`observations`, `signals` (EXPECTED/ATTENTION/AMBIGUOUS), `commonMistakes` y `environmentContext`,
respaldada por 5 fuentes (INASE, dos guías universitarias argentinas —UNNE, UNPSJB—, y dos papers
científicos internacionales sobre priming/dormancy de semilla de Cannabis).

Se conservó **todo ese contenido sin reescritura** — no tenía errores, afirmaciones débiles ni
contradicciones detectadas contra la investigación nueva. Los cambios de este loop son
**aditivos** (secciones nuevas) más dos correcciones puntuales de fuente (ver §4) y dos cambios de
título de sección para alinear mejor con la convención pedida por el loop (ver §5).

## 2. Investigación realizada

Búsquedas web (WebSearch) y verificación directa por lectura (WebFetch) priorizando, en este
orden: organismos oficiales argentinos → universidades argentinas → INTA → INASE → CONICET →
publicaciones revisadas por pares → instituciones internacionales reconocidas.

Para la historia de la planta (fuera de alcance argentino, como corresponde a un evento anterior
a la existencia de Argentina), se investigó específicamente:
- Estudios genómicos de domesticación de *Cannabis sativa*.
- Evidencia arqueobotánica (semillas/fitolitos) en sitios de Asia.
- Verificación cruzada de metadatos bibliográficos vía Crossref y PubMed/PMC (no solo motor de
  búsqueda general) antes de citar cualquier fuente nueva.

Para reforzar "cómo ocurre" la germinación, se buscó una revisión científica internacional
clásica sobre fisiología de germinación de semillas en general (no específica de Cannabis, pero
sí el marco conceptual estándar del campo), dado que las dos guías argentinas ya citadas
(UNNE, UNPSJB) siguen sin poder leerse en texto completo (limitación ya documentada en Fase 7A,
no resuelta en este loop — ver §7).

También se re-investigó la única fuente de la entrada que tenía una nota `UNVERIFIED` pendiente
(la revista de un paper sobre latencia de semilla en variedades locales de Cannabis), para
resolver esa ambigüedad en vez de dejarla arrastrándose.

## 3. Fuentes nuevas incorporadas (`sources.js`)

| id | Qué respalda | Verificación |
|---|---|---|
| `cientifica-bewley-1997-seed-germination-dormancy` | El modelo trifásico de germinación (imbibición / activación metabólica / emergencia de radícula) como marco general de la fisiología de semillas | **Verificado por lectura directa** (PMC, artículo de libre acceso, PMC156979, DOI 10.1105/tpc.9.7.1055) |
| `cientifica-ren-2021-cannabis-domestication-genomics` | Antigüedad y origen geográfico estimado de la domesticación de *Cannabis sativa* (~12.000 años BP, este de Asia) | **Verificado por lectura directa** (PMC, libre acceso, PMC8284894, DOI 10.1126/sciadv.abg2286) — se extrajeron y citan frases textuales del abstract |
| `cientifica-dalmartello-2023-haimenkou-cannabis-archaeobotany` | Evidencia arqueobotánica directa de semilla: +800 aquenios de Cannabis en Haimenkou (Yunnan), Edad del Bronce, ~1650-400 a.C. | Metadatos (título/autoría/revista/DOI) **verificados vía Crossref**; texto completo bloqueado (acceso institucional) |
| `cientifica-liu-2026-shandong-cannabis-phytolith` | Evidencia física más temprana (fitolitos, no semilla) de Cannabis en un conjunto de cultivos manejados, Shandong, 4.500-3.400 años BP | Metadatos **verificados vía Crossref**; texto completo bloqueado |

## 4. Corrección de una fuente ya existente

`cientifica-cannabis-landraces-dormancy-2023` tenía, desde la Fase 7A, una nota `UNVERIFIED`
explícita: dos búsquedas independientes habían reportado dos revistas distintas para el mismo
paper (Industrial Crops and Products vs. South African Journal of Botany) sin poder confirmar
cuál era correcta, y la nota indicaba "USO INTERNO, no mostrar en UI pública" — pero el código
igual la mostraba en la sección "Fuentes" de la entrada pública (no había ningún filtro por esa
nota; es solo texto informativo para quien edita). Se resolvió en este loop: **Crossref confirma
de forma inequívoca** que es Langa, S.; Magwaza, L. S.; Mditshwa, A.; Tesfay, S. Z. (2024),
*South African Journal of Botany*, vol. 165, pp. 91-100, DOI 10.1016/j.sajb.2023.12.021. Se
actualizó el registro con la autoría y revista correctas y se quitó la advertencia — ya puede
mostrarse en UI pública con datos exactos.

## 5. Contenido incorporado a la entrada (`editorialData.js`)

Secciones nuevas (todas dentro del array `sections[]` ya existente — no se cambió el esquema):

1. **Historia** (un solo párrafo, como pide la consigna). Distingue explícitamente evidencia de
   interpretación: la fecha de domesticación (~12.000 años BP) se presenta como "una fecha
   estimada por métodos genéticos, no una medición directa" y con el origen geográfico exacto
   señalado como "en discusión académica"; los hallazgos de Shandong y Haimenkou se presentan
   como evidencia física fechada, más tardía pero más concreta. No se afirma "el primer cultivo"
   ni "la primera semilla" en ningún punto.
2. **El estado de la semilla, antes de que empiece todo** — cubre el punto "selección/estado de
   la semilla" pedido por la consigna (ítem C), citando la distinción de INASE entre ensayo de
   germinación y ensayo de vigor. No prescribe ninguna acción de selección — describe una
   distinción conceptual/institucional.
3. **Qué ocurre, qué se ve y por qué** — sección nueva con una lista de 3 puntos que separa
   explícitamente proceso / observación / mecanismo, tal como pide la consigna ("separar
   claramente QUÉ HACER, QUÉ OBSERVAR, POR QUÉ OCURRE"). Se renombró el primer eje de "qué hacer"
   a "qué ocurre" porque la propia entrada ya establece, desde la Fase 7A, que la germinación "no
   es una técnica" que alguien ejecuta — mantener "qué hacer" habría contradicho esa premisa ya
   publicada; "qué ocurre" preserva la misma separación conceptual sin ese choque de tono.
4. **Relación con otras etapas** — párrafo breve que conecta la germinación con "Sustrato, agua y
   drenaje", "Luz como señal temporal" y "Cultivo en secuencia" (siempre por su título público
   exacto, nunca por su id técnico), sin desarrollar esas etapas. Se agregó `cultivo-en-secuencia`
   a `relatedEntryIds` de la entrada (antes solo tenía `sustrato-y-drenaje` y `luz-y-fotoperiodo`),
   así que la conexión también aparece en el bloque real "Contenido relacionado" de la página, sin
   necesidad de ningún componente nuevo.

Cambio de título (sin cambiar el `id` interno de la sección, que no es público): la sección
`que-esta-ocurriendo` pasó de titularse "Qué está ocurriendo" a "Cómo ocurre la germinación",
para acercarse al pedido de la consigna ("Cómo se hace") sin adoptar un verbo de acción que no
corresponde a un proceso biológico no ejecutado por la persona que cultiva.

No se tocó: `intro`, `observations`, `signals`, `commonMistakes`, `environmentContext`,
`editorialStatus`. Se actualizó `lastReviewed` a `2026-09-11`.

## 6. Contexto provincial (Fase 47.2) — verificado sin tocar código

La consigna pedía explícitamente no romper la contextualización provincial ni crear 24 textos
nuevos. No se tocó `lib/geo/provinceContext.js` ni `lib/editorial/provinceContext.js`: el
generador de contexto para `germinacion` sigue funcionando sobre el contenido base ampliado sin
ningún cambio, porque lee `entry.id` (que no cambió) y arma su texto de forma independiente del
contenido de `sections[]`. Se confirmó con la suite `tests/provincial-context-audit.mjs` — ver §8.

## 7. Qué quedó fuera por falta de evidencia (documentado, no inventado)

- **Ningún parámetro numérico de germinación específico de Cannabis** (temperatura, humedad,
  tiempo) se agregó como regla — ni siquiera citando el paper de Latif et al. 2025 (que sí mide
  condiciones experimentales de priming), porque esa fuente ya estaba marcada como "no se usa
  para recomendar ningún tratamiento específico" desde la Fase 7A y este loop no encontró motivo
  para cambiar ese criterio.
- **Texto completo de las guías UNNE y UNPSJB**: se reintentó la extracción en este loop (ambas
  siguen sirviendo el PDF, pero la herramienta de fetch disponible no pudo leer el contenido más
  allá de metadatos binarios). Siguen citadas como respaldo convergente institucional, no como
  fuente de una cita textual — mismo estado que en la Fase 7A, no es un hallazgo nuevo.
- **Texto completo de Bewley (1997), Dal Martello et al. (2023) y Liu et al. (2026)**: Bewley sí
  se pudo leer (PMC, libre acceso) y se usó para extraer contenido real. Dal Martello y Liu
  quedaron con metadatos verificados por Crossref pero texto bloqueado — se citan únicamente para
  el hallazgo puntual ya corroborado por evidencia secundaria convergente (número de semillas,
  sitio, rango de fechas), no para ninguna afirmación adicional del cuerpo del artículo.
- **Origen geográfico único de la domesticación**: Ren et al. (2021) proponen China/este de Asia
  con buena evidencia genómica, pero el propio campo sigue debatiendo el detalle geográfico
  exacto — la entrada lo señala como "en discusión académica" en lugar de presentarlo como un
  hecho cerrado.
- **Ninguna fecha de "primer cultivo" ni "primera semilla"** — la consigna lo prohibía
  explícitamente y no había evidencia que lo permitiera de todas formas: toda evidencia disponible
  es sobre una fecha estimada (genómica) o un hallazgo puntual fechado (arqueobotánico), nunca
  sobre un origen absoluto.

## 8. Verificación

- `npm run build`: limpio, mismas 9 rutas.
- `tests/provincial-context-audit.mjs` (suite ya existente de la Fase 47.2, sin modificar):
  **1280/1280 verificaciones en verde** — confirma que la ampliación de contenido de `germinacion`
  no rompió la contextualización provincial, el resto de las 24 jurisdicciones, ni ninguna
  entrada, ni la regresión de superficies (Home, `/atlas`, Mi Cultivo, Chatbot, `/api/geo`,
  `/api/climate`, `/creditos`).
- Verificación visual (Playwright, captura completa de la página en 1280×1000): las 9 secciones
  nuevas y existentes renderizan en el orden esperado, "Contexto de tu zona" sigue funcionando
  (mostró el prompt genérico porque no había provincia elegida en esa corrida), la aside
  "Contenido relacionado" ahora incluye "Cultivo en secuencia", las 9 fuentes aparecen en
  "Fuentes" con sus enlaces, cero imágenes rotas, cero errores de consola.
- Revisado a mano: ningún id técnico (`sustrato-y-drenaje`, `luz-y-fotoperiodo`,
  `cultivo-en-secuencia`, `germinacion`) aparece como texto de prosa — las referencias cruzadas en
  "Relación con otras etapas" usan siempre el título público exacto de cada entrada.
- Revisado a mano: cada afirmación histórica importante tiene una fuente en `sourceIds`; ningún
  parámetro ambiental (temperatura/humedad/tiempo) aparece como cifra única; `signals` sigue
  separando observación de diagnóstico sin cambios.

## 9. Limitaciones honestas

- La sección "Historia" cubre domesticación y evidencia de semilla/cultivo temprano — no cubre
  usos históricos posteriores (textiles, medicinales, rituales) ni la llegada del cáñamo/cannabis
  a América o a Argentina; eso excede el alcance de "contextualizar históricamente la
  germinación" que pedía este loop y queda para una fase de historia más amplia si se decide
  hacerla.
- Dos de las cuatro fuentes nuevas (Dal Martello 2023, Liu 2026) no se pudieron leer en texto
  completo en esta sesión — se citan solo para el hallazgo puntual ya corroborado por más de una
  fuente secundaria convergente, siguiendo el mismo estándar de honestidad que ya usaba el
  registro de fuentes desde la Fase 7A.
- No se agregó ninguna imagen nueva (fuera de alcance explícito de este loop).

## 10. Archivos

**Modificados**: `src/app/lib/editorial/editorialData.js` (entrada `germinacion`: 4 secciones
nuevas, 1 título de sección renombrado, `relatedEntryIds` y `sourceIds` ampliados,
`lastReviewed` actualizado — ninguna otra entrada ni categoría tocada), `src/app/lib/editorial/sources.js`
(4 fuentes nuevas, 1 fuente existente corregida).
**Nuevo**: `MASTER_PACKAGE/48_LOOP_1_GERMINACION_BASE.md`.
**Sin cambios**: arquitectura editorial (`registry.js`, `atlasData.js`), `GeoSelector.js`,
contextualización provincial (`lib/geo/provinceContext.js`, `lib/editorial/provinceContext.js`,
`ProvinceContextPanel.js`), Mi Cultivo, Chatbot, Supabase/Auth/RLS/Storage, diseño visual del
Atlas, las otras 6 entradas editoriales.

**LOOP 1 TERMINADO. No se continuó automáticamente con Sustrato y drenaje, Luz y fotoperiodo,
Lectura de señales, Cultivo en secuencia, Cosecha y maduración ni Marco argentino — esos son
loops separados.**
