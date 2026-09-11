# 30 — Piloto Editorial Completo: Germinación (Fase 7B1)

## 1. Objetivo

Convertir `germinacion` en la primera entrada editorial completa del Atlas, validando en la práctica el modelo de Fase 7A con contenido real, fuentes trazables y estructura editorial — sin escalar el patrón a las otras 6 entradas.

## 2. Fuentes investigadas

Búsqueda con prioridad: organismos oficiales argentinos → instituciones científicas/académicas argentinas → publicaciones internacionales revisadas por pares (solo para lo que las fuentes argentinas no cubren en detalle: fisiología específica de *Cannabis sativa*). Se investigaron y evaluaron:
- INASE (Instituto Nacional de Semillas, Argentina) — página oficial sobre vigor y ensayos de germinación.
- INTA — se intentó acceder a una página específica sobre "poder germinativo" (`inta.gob.ar/servicios/poder-germinativo-1`); redirigió (301) a la home genérica de INTA, sin contenido específico recuperable — **descartada por no resolver a contenido verificable**.
- Cátedra de Fisiología Vegetal, FaCENA, Universidad Nacional del Nordeste (UNNE) — guía de estudio sobre germinación.
- Cátedra de Fisiología General, Universidad Nacional de la Patagonia San Juan Bosco (UNPSJB) — trabajo práctico sobre germinación.
- Latif et al. (2025), *Scientific Reports* — germinación y establecimiento de plántula en cáñamo (*Cannabis sativa*).
- Publicación científica (ScienceDirect, 2023) sobre latencia de semilla en landraces de cannabis.
- Un artículo Dialnet sobre imbibición y calidad fisiológica de semillas, y un PDF de ResearchGate ("Biología y germinación de semillas") — **evaluados y descartados**: no se pudo confirmar con suficiente solidez su procedencia institucional exacta dentro del tiempo de esta ronda, y ya había cobertura equivalente y mejor verificada con las fuentes elegidas.

## 3. Fuentes seleccionadas

Las 5 registradas en `sources.js` y en `19_SOURCE_REGISTRY.md`:
1. **INASE — "Vigor en semillas"** (`oficial-inase-vigor-semillas`) — `VERIFIED`, leída directamente.
2. **UNNE — guía de estudio Germinación** (`academica-unne-fisiologia-vegetal-germinacion`) — `PARTIAL`: existencia y origen institucional verificados (PDF servido desde el dominio académico de la UNNE); el texto no se pudo extraer automáticamente en esta sesión.
3. **UNPSJB — TP15 Germinación** (`academica-unpsjb-fisiologia-general-germinacion`) — `PARTIAL`, mismo límite.
4. **Latif et al. 2025, Scientific Reports** (`cientifica-latif-2025-hemp-priming-germination`) — `VERIFIED` bibliográficamente (título/autoría/revista/DOI consistentes en múltiples búsquedas); texto completo no accesible (gate de sesión de Nature).
5. **Publicación 2023 sobre latencia de semilla de cannabis** (`cientifica-cannabis-landraces-dormancy-2023`) — `PARTIAL/UNVERIFIED`: título y URL consistentes, pero autoría exacta y nombre de revista no confirmados (dos búsquedas dieron nombres de revista distintos; acceso directo bloqueado con HTTP 403). Se cita solo para el hecho general de que la latencia de semilla existe y se estudia en Cannabis — nunca para una cifra o resultado específico del estudio.

**Regla aplicada**: ninguna cifra, temperatura, tiempo o porcentaje específico se incluyó en el contenido publicado sin poder respaldarlo con lectura directa de una fuente — por eso el texto explícitamente dice que no hay "un número único válido" para la temperatura, en vez de inventar un rango.

## 4. Fuentes descartadas relevantes

- **INTA "poder germinativo"**: la URL específica ya no resuelve a contenido propio (redirige a la home de INTA) — se prefirió no citar una URL que hoy no respalda lo que se le atribuiría.
- **Dialnet / ResearchGate genéricos sobre fisiología de semillas**: descartados por no poder verificar procedencia institucional con la misma solidez que las fuentes elegidas, dado que ya había cobertura equivalente.
- Ninguna fuente comercial, blog de venta, foro o contenido generado por IA fue considerada como fuente — cumpliendo la restricción explícita de esta fase.

## 5. Contenido creado

Estructura completa en español, tono editorial/científico accesible, sin instrucciones operativas de cultivo, sin contenido de consumo. Ver el archivo fuente (`editorial/editorialData.js`) para el texto exacto. Resumen de las piezas nuevas:
- `summary` corregido: la versión anterior mencionaba la luz como factor de germinación — imprecisión corregida (la luz importa recién cuando la plántula emerge, no durante la germinación en sí).
- `intro` reescrito, más preciso y menos genérico.
- 5 `sections`: ¿Qué es la germinación?, Qué está ocurriendo (proceso trifásico + germinación epigea específica de *Cannabis sativa*, que valida el uso del asset de diagrama epigeo/hipogeo), Primeras señales, Condiciones ambientales (agua/oxígeno/temperatura/estructura del sustrato, sin cifras inventadas), Lectura de la plántula.
- `observations`: 2 párrafos que distinguen explícitamente observación de interpretación.
- `signals`: 3 entradas estructuradas (`ESPERABLE`/`ATENCIÓN`/`AMBIGUA`).
- `commonMistakes`: 3 entradas tipadas (interpretación/observación/contextualización), cada una un error real de lectura, no una lista genérica de "errores de cultivo".
- `environmentContext`: 2 párrafos — explica que ambiente protegido vs. exterior cambia la observación de la etapa, y que la diversidad climática argentina hace variar el ritmo sin afirmar ninguna diferencia provincial puntual sin fuente (regla explícita de esta fase).

## 6. Estructura del entry

Ver el objeto completo en `editorial/editorialData.js`. Todos los campos del modelo de Fase 7A están presentes; ninguno se rellenó artificialmente — `sections` pasó de `[]` a 5 elementos reales; `observations`/`signals`/`commonMistakes`/`environmentContext` pasaron de `null` a contenido real (y su forma se amplió, ver `MODEL_GAP` en `28_EDITORIAL_CONTENT_MODEL.md`).

## 7. Source IDs

`['oficial-inase-vigor-semillas', 'academica-unne-fisiologia-vegetal-germinacion', 'academica-unpsjb-fisiologia-general-germinacion', 'cientifica-latif-2025-hemp-priming-germination', 'cientifica-cannabis-landraces-dormancy-2023']`

## 8. Asset IDs

No se agregó un campo `assetIds` en la entrada — la relación queda del lado del asset (`asset-germinacion-diagram.entryId === 'germinacion'`), resuelta dinámicamente por `getAssetsForEntry()`. Mantener una sola fuente de verdad de la relación fue una decisión explícita de Fase 7A (D11) que este piloto no reabre. Se **revisó el `alt`** del asset (`asset-germinacion-diagram` en `assets.js`): antes mezclaba descripción y atribución en el mismo texto; ahora es puramente descriptivo de lo visible (radícula, hipocótilo, cotiledones, germinación epigea/hipogea), y la atribución vive solo en `credit`.

## 9. Relaciones

`relatedEntryIds: ['sustrato-y-drenaje', 'luz-y-fotoperiodo']` — se mantuvieron ambas del modelo heredado de Fase 7A, revisadas contra el contenido final: "Sustrato, agua y drenaje" es directamente relevante (la sección "Condiciones ambientales" habla explícitamente de sustrato y agua); "Luz como señal temporal" es relevante como continuación natural (la sección "Lectura de la plántula" es exactamente el punto donde termina germinación y la luz empieza a importar). No se creó ninguna entrada nueva.

## 10. Tags

`['fundamentos', 'germinación', 'agua']` — se agregó `agua` (ya presente en el vocabulario controlado) porque el contenido final tiene una sección sustantiva sobre agua/imbibición, a diferencia de la versión anterior. No se creó ningún tag nuevo.

## 11. Metadata

`seoTitle` sin cambios de fondo; `seoDescription` reescrito para reflejar el contenido real ("Qué es la germinación, qué ocurre biológicamente, qué señales observar y qué errores de interpretación son frecuentes..."). `canonical`/`ogImage` siguen en `null` — no hay dominio de producción todavía.

## 12. Estado editorial

`editorialStatus: 'PUBLISHED'`. Justificación: contenido revisado, estructura completa, asset trazable con alt revisado, y fuentes verificadas **con matices declarados explícitamente** — 2 de las 5 fuentes (las dos guías universitarias) tienen su existencia y procedencia institucional confirmadas pero su texto completo no pudo extraerse en esta sesión, y 1 fuente (la publicación 2023 sobre latencia) tiene autoría/revista sin confirmar. Ninguna de esas tres se usa para una afirmación específica o numérica — solo para respaldar el modelo general de germinación (ampliamente convergente con las 2 fuentes totalmente verificadas: INASE y Latif et al. 2025). Se juzgó que esto no constituye "incertidumbre editorial importante" en el sentido de la regla 17, pero queda documentado con total transparencia en vez de ocultarse.

## 13. Fecha de revisión

`lastReviewed: '2026-09-10'` — fecha real de esta implementación. No se inventó una fecha de publicación histórica.

## 14. Cambios de UI

- `atlas/[category]/[entry]/page.js`: renderizado condicional actualizado para las nuevas formas de `observations` (párrafos), `signals` (lista con 3 niveles semánticos) y `commonMistakes` (lista tipada). `sections` ya tenía soporte desde Fase 7A, sin cambios de código, solo de datos.
- `globals.css`: estilos nuevos para `.atlas-signal*` y `.atlas-mistake*` — codificación por color discreta y no alarmista (tonos ya existentes de la paleta RELIEVE: verde salvia para "esperable", arcilla para "atención", gris salvia para "ambigua"), sin rojo/amarillo de alerta.

## 15. Archivos creados

- `MASTER_PACKAGE/30_GERMINACION_PILOT.md` (este documento).

## 16. Archivos modificados

- `src/app/lib/editorial/editorialData.js` — entrada `germinacion` reescrita por completo con el modelo enriquecido.
- `src/app/lib/editorial/sources.js` — 5 fuentes de contenido nuevas.
- `src/app/lib/editorial/assets.js` — `alt` revisado del asset de germinación.
- `src/app/atlas/[category]/[entry]/page.js` — render de `observations`/`signals`/`commonMistakes` actualizado a las nuevas formas estructuradas.
- `src/app/globals.css` — estilos nuevos para señales y errores frecuentes.
- `MASTER_PACKAGE/19_SOURCE_REGISTRY.md`, `28_EDITORIAL_CONTENT_MODEL.md`, `29_PHASE_7A_IMPLEMENTATION.md` — actualizados según corresponde.

Ninguna de las otras 6 entradas fue modificada.

## 17. Tests

No existen tests automatizados en el proyecto (sin script `test` en `package.json`, sin archivos `*.test.js`) — no se ejecutó ninguno porque no hay ninguno. No existe script `lint` separado; `npm run build` corre TypeScript como parte de `next build` y pasó sin errores en cada punto de verificación (antes y después de la corrección de la fuga de nota interna).

## 18. Browser

Verificación real con Playwright (Chromium headless) en 1440×900, 1280×800 y 390×844 sobre Home, `/atlas`, `/atlas/fundamentos` y `/atlas/fundamentos/germinacion`: status 200, cero errores de consola, cero imágenes rotas, cero texto técnico (`NO_IMPLEMENTADO`, `PLACEHOLDER`, `TODO`, `undefined`, "pollinations"), exactamente un `<h1>` por página. Inspección visual de capturas completas en desktop (1440) y mobile (390): breadcrumb, h1, resumen, intro, las 5 secciones, observaciones, señales (3 niveles con codificación de color discreta), errores frecuentes (3 tipos), contexto ambiental, fuentes (5, legibles, sin IDs técnicos) y contenido relacionado — todo renderiza correctamente, sin cajas vacías ni overflow visible.

## 19. Regresión

Confirmado explícitamente: `/api/geo` y `/api/climate` responden 200; la Home sigue mostrando "¿Dónde cultivás?"; `/atlas`, `/atlas/fundamentos` y `/atlas/fundamentos/germinacion` responden 200 en las tres resoluciones. Ningún archivo de mapa, `GeoSelector`, `EnvironmentalPanel` ni las otras 6 entradas fue tocado.

## 20. MODEL_GAP encontrados

Ver detalle completo en `MASTER_PACKAGE/28_EDITORIAL_CONTENT_MODEL.md`, sección "MODEL_GAP detectado y resuelto en Fase 7B1": `observations`/`signals`/`commonMistakes`/`environmentContext` necesitaban una forma estructurada (arreglos), no un string único. Corrección pequeña, reversible, implementada directamente (no requirió parar ni escalar como bloqueo arquitectónico).

## 21. Problema encontrado y corregido: fuga de nota interna en campo público

Al integrar la fuente `cientifica-cannabis-landraces-dormancy-2023`, la nota de verificación interna ("autoría/revista sin confirmar, HTTP 403") quedó inicialmente dentro de `authorOrInstitution` — el campo que la UI muestra en la sección pública "Fuentes". Se detectó al revisar la primera captura de pantalla del navegador (el texto aparecía visible en la página real) y se corrigió moviendo la nota íntegramente a `notes` (nunca renderizado), dejando el campo público limpio. Verificado con un segundo build + segunda ronda de capturas que el texto ya no aparece en el HTML renderizado.

## 22. Decisiones

- Ampliar `signals`/`commonMistakes`/`observations`/`environmentContext` a formas estructuradas en vez de mantenerlos como string — documentado como corrección de modelo, no como excepción ad hoc solo para esta entrada (el modelo actualizado en `editorialData.js`/`28_EDITORIAL_CONTENT_MODEL.md` es el que regirá para las próximas entradas también).
- No usar `assetIds` como campo directo en la entrada — se mantiene la relación inversa de Fase 7A (asset → entrada) como única fuente de verdad.
- Corregir el `summary` heredado (mención imprecisa de la luz como factor de germinación) en vez de preservarlo tal cual — justificado porque esta fase sí autoriza reescribir completamente el contenido de `germinacion` (a diferencia de las otras 6 entradas, que están fuera de alcance).

## 23. Pendientes

- Las otras 6 entradas siguen con el modelo mínimo de Fase 7A (`sections: []`, resto en `null`) — quedan fuera de esta fase por regla explícita.
- La nota "TODO RESEARCH" implícita de las 3 fuentes con verificación parcial (2 PDFs universitarios no legibles automáticamente, 1 paper con autoría sin confirmar) queda abierta para quien tenga acceso a leerlas directamente fuera de esta sesión.
- No se agregó ninguna imagen nueva, ninguna fuente visual nueva, ningún contenido de consumo — todo fuera de alcance por regla explícita de esta fase.

## 24. Recomendación para 7B2

El patrón funcionó: investigar con prioridad argentina/académica real, escribir contenido que separe observación de interpretación, estructurar señales/errores de forma semántica (no solo texto libre), y documentar honestamente cuándo una fuente quedó con verificación parcial en vez de forzarla a "VERIFIED". Antes de escalar a las 6 entradas restantes, conviene decidir explícitamente si el modelo `{level, description}` para `signals` y `{type, description}` para `commonMistakes` queda fijo como estándar del Atlas (recomendado, ya que funcionó bien acá) o si cada entrada puede variarlo — fijarlo ahora evita divergencia de forma entre entradas futuras.
