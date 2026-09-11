# 32 — Cierre Editorial del Atlas (Fase 7C)

Cierra el ciclo editorial abierto en Fase 7A (modelo), 7B1 (piloto `germinacion`) y 7B2 (escalado a las 6 entradas restantes). No se reescribió contenido de ninguna entrada — esta fase es de normalización, verificación y recuperación de fuentes, según su propio alcance acotado.

## 1. Qué se cerró

Las 7 entradas del Atlas (`germinacion`, `sustrato-y-drenaje`, `luz-y-fotoperiodo`, `lectura-de-senales`, `cultivo-en-secuencia`, `cosecha-y-maduracion`, `marco-editorial`) se revisaron como conjunto coherente: mismo modelo de datos, misma forma de `signals`/`commonMistakes` (vocabulario en inglés con traducción de UI), `relatedEntryIds` cruzados y consistentes, fuentes trazables, assets sin cambios. No se encontró ninguna inconsistencia estructural real que requiriera corrección de código o arquitectura.

## 2. Estado final de las 7 entradas

Sin cambios de contenido respecto de 7B2. Las 7 permanecen `editorialStatus: 'PUBLISHED'`, `lastReviewed: '2026-09-10'`, con `seoTitle`/`seoDescription` coherentes con el contenido real. `marco-editorial` mantiene `signals: null` y `environmentContext: null` por diseño (naturaleza editorial/legal, no botánica-observacional) — revisado nuevamente en esta fase y confirmado que sigue siendo la decisión correcta, no un campo faltante.

## 3. Normalización final (§3 del encargo)

Se revisaron IDs, categorías, `relatedEntryIds`, tags, `editorialStatus`, `lastReviewed`, `seoTitle`, `seoDescription`, `sourceIds` y estructura de las 7 entradas contra el modelo de `28_EDITORIAL_CONTENT_MODEL.md`. Resultado: **todo coherente, nada que corregir**.

- IDs estables y sin colisiones (verificado por `grep` sobre `editorialData.js`).
- Cada `categoryId` de entrada corresponde a una categoría real existente.
- Las 7 relaciones (`relatedEntryIds`) son recíprocas o temáticamente justificadas y apuntan siempre a IDs de entrada reales (no de categoría) — verificado cruzando cada entrada contra sus relacionadas.
- `assets.js`: cada entrada tiene exactamente un asset propio vía `entryId` inverso, sin duplicación (`asset-marco-legal-internal.entryId === 'marco-editorial'`, etc.) — sin cambios respecto de Fase 6/7A.
- No se encontraron clases CSS obsoletas en español (`.atlas-signal-esperable/atencion/ambigua`) remanentes de antes de la formalización de 7B2 — la migración a inglés (`.atlas-signal-expected/attention/ambiguous`) quedó completa.
- No se encontró ningún `sourceId` ni JSON crudo en el render de `page.js`/`creditos/page.js`.

Ninguna inconsistencia encontrada ameritó "CORREGIR" según la regla del encargo — se documenta la revisión, no una corrección, porque no había nada que corregir.

## 4. Coherencia entre entradas (§4 del encargo)

Las 7 entradas usan el mismo modelo (`sections`, `observations`, `signals`, `commonMistakes`, `environmentContext`, `sources`, `relatedEntryIds`), distinguen observación de interpretación de forma consistente, y ninguna expone campos internos. La ausencia de `signals`/`environmentContext` en `marco-editorial` es la única asimetría de campos entre entradas, y es deliberada (documentada desde 7B2, reconfirmada acá). No se encontró contenido contradictorio entre entradas — por ejemplo, la transición vegetativo→reproductivo se describe de forma consistente en `luz-y-fotoperiodo` (mecanismo del fitocromo) y `cultivo-en-secuencia` (la secuencia ontogénica completa), sin que una contradiga a la otra.

## 5. Recuperación de PDFs

### 5.1 Diagnóstico inicial

Las 4 fuentes pendientes desde Fase 7B2 (todas `PARTIAL`, PDF sin texto extraíble por la herramienta de fetch):
1. INTA, EEA Alto Valle — "Relación suelo – planta – agua" (`oficial-inta-relacion-suelo-planta-agua`).
2. UNLPam + INTA Anguil — "Guía para la evaluación visual de la calidad del suelo" (`academica-unlpam-inta-guia-evaluacion-visual-suelo`).
3. UNNE — "Fitocromos y desarrollo vegetal" (`academica-unne-fitocromos-desarrollo-vegetal`).
4. UNCUYO — "Ciclo de Ingreso, Guía N°3 Crecimiento" (`academica-uncuyo-guia-crecimiento`).

Verificación de herramientas disponibles, **antes de instalar nada**:
- `which pdftotext` / `which pdfinfo` → no encontrados.
- `brew list poppler` → `No such keg` (la instalación de `poppler` intentada al cierre de Fase 7B2 **no se completó** — quedó un `poppler.formula.lock` vacío de Homebrew, sin binario ni Cellar; confirmado con el registro del sistema: el proceso en segundo plano fue detenido, sin marca de finalización).
- `python3` presente (3.14.7) pero sin `PyMuPDF`/`pdfplumber`/`PyPDF2` instalados.
- `mutool`, `qpdf`, `gs`, `tesseract` → ninguno instalado.
- Gestor de paquetes disponible: Homebrew 6.0.22.

### 5.2 Estrategia aplicada

En vez de reintentar `brew install poppler` (que en el intento anterior quedó colgado compilando 15 dependencias nativas desde código fuente — exactamente lo que la regla de esta fase pide evitar cuando hay una alternativa más simple), se instaló **PyMuPDF** (librería Python libre/open-source, wheel precompilado, sin compilación) dentro de un **entorno virtual aislado** en el directorio de scratchpad de la sesión — no se tocó el Python del sistema ni Homebrew. Instalación completada en segundos, sin dependencias nativas que compilar. Cumple la prioridad del encargo: "otra herramienta local gratuita" antes que reinstalar/compilar poppler.

### 5.3 Resultado por fuente

| Fuente | Resultado | Detalle |
|---|---|---|
| UNLPam + INTA Anguil — "Guía evaluación visual del suelo" | **RECUPERADA → VERIFIED** | Descarga exitosa (3,1 MB, 76 páginas), texto extraído en su mayoría legible (~68.600 caracteres). No era un PDF escaneado — era texto normal que la herramienta de fetch anterior no había podido procesar. Confirma autoría (Noellemeyer et al., Editorial UNLPam, 2021, ISBN 978-950-863-430-6) y contenido real sobre estructura/porosidad/aireación/drenaje del suelo. |
| UNNE — "Fitocromos y desarrollo vegetal" | **RECUPERADA → VERIFIED** | Descarga exitosa (539 KB, 11 páginas), texto completamente legible (~38.900 caracteres). Confirma el modelo de fitocromo como receptor de fotoperiodo. |
| UNCUYO — "Guía N°3 Crecimiento" | **RECUPERADA → VERIFIED** | Descarga exitosa (700 KB, 7 páginas), texto completamente legible (~12.200 caracteres). Confirma la transición fase vegetativa → fase reproductiva como concepto botánico general (usa la planta de poroto como ejemplo didáctico). |
| INTA, EEA Alto Valle — "Relación suelo – planta – agua" | **NO RECUPERADA — sigue `PARTIAL`** | La descarga falló con `Recv failure: Connection reset by peer` (reset de conexión TLS) contra `repositorio.inta.gob.ar` — el mismo tipo de bloqueo de dominio INTA ya documentado en `21_GEO_CLIMATE_RESEARCH.md` para otros subdominios de INTA (`agroregionesrian`, `climayagua`), no una limitación de la herramienta de extracción. Se probaron 2 intentos (descarga simple y con verbose para diagnóstico) — sin éxito ninguno de los dos. Se buscó una alternativa HTML/institucional equivalente sin encontrar una versión no-PDF de este documento específico. Queda `PARTIAL`, citada solo como respaldo convergente, nunca como fuente única. |

### 5.4 Qué se hizo con el texto recuperado (§7 del encargo)

Se contrastaron las afirmaciones ya publicadas en `sustrato-y-drenaje`, `luz-y-fotoperiodo` y `cultivo-en-secuencia` contra el texto ahora legible de sus 3 fuentes correspondientes. Resultado: **ninguna corrección de contenido fue necesaria** — las 3 entradas ya evitaban cifras específicas no verificables (siguiendo la disciplina de 7B2) y describían relaciones cualitativas (agua/oxígeno/drenaje; fitocromo/fotoperiodo; transición vegetativo→reproductivo) que el texto recuperado confirma directamente. Se actualizó únicamente el **estado de la fuente** (`PARTIAL` → `VERIFIED`) y sus `notes` en `sources.js` y en `19_SOURCE_REGISTRY.md`, con el detalle de qué se confirmó. No se agregó contenido nuevo a ninguna entrada por el solo hecho de que el PDF ahora es legible — la extracción sirvió para verificar, no para expandir.

### 5.5 Herramientas — resumen final

- **Instalada**: PyMuPDF (Python, libre/open-source), en un entorno virtual aislado dentro del scratchpad de sesión — no persiste en el proyecto ni en el sistema global, no se agregó como dependencia del proyecto Next.js (no aparece en `package.json`).
- **No instalada**: `poppler`/`pdftotext` vía Homebrew — el intento anterior (Fase 7B2) quedó incompleto y no se reintentó, siguiendo la regla de "evitar compilaciones innecesarias si existe una alternativa gratuita y sencilla" (PyMuPDF cumplió el mismo objetivo sin compilar nada).
- Se descargaron temporalmente los 4 PDF al scratchpad de sesión para extracción local; se borraron al finalizar (no quedan archivos sueltos en el repositorio del proyecto).

## 6. Fuentes recuperadas vs. pendientes

- **Recuperadas (PARTIAL → VERIFIED)**: 3 de 4 — UNLPam/INTA Anguil, UNNE Fitocromos, UNCUYO Crecimiento.
- **Pendiente**: 1 de 4 — INTA "Relación suelo – planta – agua", bloqueada por reset de conexión TLS al dominio del repositorio institucional, no por ser un PDF escaneado. Queda como candidata para un reintento futuro desde una red distinta, consistente con el mismo patrón de bloqueo de dominios INTA ya documentado para la investigación geográfica/climática.

## 7. SEO editorial mínimo

Las 7 entradas tienen `seoTitle` y `seoDescription` no vacíos, coherentes con el contenido real de cada una (verificado por lectura cruzada contra `summary`/`intro` de cada entrada). No se tocó SEO global del sitio, no se creó sitemap ni estrategia nueva.

## 8. Créditos y fuentes

`/creditos` sigue funcionando (verificado, status 200) y sigue listando exclusivamente los assets con licencia externa, sin mezclarse con las fuentes editoriales de contenido (que viven en la sección "Fuentes" de cada entrada, no en créditos). No se buscaron ni cambiaron assets — los 8 assets de Fase 6/7A permanecen idénticos.

## 9. Verificación de 7C

- `npm run build`: exit limpio, rutas generadas correctas (`/`, `/atlas`, `/atlas/[category]`, `/atlas/[category]/[entry]`, `/creditos`, además de las rutas de API existentes).
- Playwright (Chromium headless) en 1440×900 y 390×844 sobre las 7 entradas + Home + `/atlas` + `/creditos` (20 combinaciones): status 200 en todas, exactamente un `<h1>` por página, cero imágenes rotas, cero errores de consola.
- Verificación de ausencia de fugas: se comprobó que el texto **visible** (`document.body.innerText`, no el HTML/JS interno de React Server Components) no contiene `NO_IMPLEMENTADO`, `PLACEHOLDER`, `PDF_UNVERIFIED`, `sourceId`, "USO INTERNO", "HTTP 403", "UNVERIFIED" ni `[object Object]`. Nota metodológica: una primera pasada de verificación marcó falsamente la cadena `undefined` como fuga, presente en las 20 rutas — incluida la Home, no tocada por esta fase. Se comprobó que se trata de `$undefined`, un token interno de la serialización de React Server Components de Next.js (visible solo en el HTML/JS crudo, nunca en el texto renderizado que ve un visitante) — no es una fuga real. Corregido el criterio de verificación para revisar el texto visible en vez del HTML completo, y confirmado que no hay ninguna fuga real en las 20 combinaciones.
- Navegación básica: Home → `/atlas` → categoría → entrada → entrada relacionada, confirmada con las 7 entradas accesibles por su ruta real y sus enlaces de "relacionado" resolviendo a las entradas correctas (mismo mecanismo de `getCategoryById()` verificado en Fase 7A, sin cambios en esta fase).

## 10. Regresión mínima

`/api/geo?layer=provinces` → 200. `/api/climate` → 200. Home sigue mostrando "¿Dónde cultivás?". Ningún archivo de mapa, `GeoSelector.js`, `EnvironmentalPanel.js` fue tocado en esta fase.

## 11. Correcciones realizadas

Ninguna corrección de contenido editorial. Las únicas modificaciones de esta fase fueron:
- `src/app/lib/editorial/sources.js`: actualización de estado (`PARTIAL` → `VERIFIED`) y `notes` de 3 fuentes, y actualización de `notes` (sin cambio de estado) de la cuarta fuente (INTA suelo-agua) para documentar el diagnóstico de bloqueo de red de esta fase.
- `MASTER_PACKAGE/19_SOURCE_REGISTRY.md`: espejo de esos mismos 4 cambios en la tabla de Fase 7B2.

Ningún archivo de código (`editorialData.js`, `page.js`, `globals.css`, `registry.js`, `assets.js`, `tags.js`) requirió cambios — la normalización (§3) no encontró inconsistencias reales que corregir.

## 12. Pendientes que pasan a la siguiente etapa

- 1 fuente (INTA "Relación suelo – planta – agua") sigue `PARTIAL` por bloqueo de red al dominio del repositorio institucional — no bloqueante, ya citada solo como respaldo convergente.
- Ninguna de las 7 entradas tiene todavía contenido regional/provincial específico — mismo pendiente heredado de 7B1/7B2, sin cambios en esta fase.
- La auditoría integral del proyecto (arquitectura completa, decisiones de infraestructura BLOCKED en `TODO.md`, matriz extendida de capturas) queda explícitamente para VSC, no para este loop.

**FASE 7C TERMINADA. No se inicia auditoría final ni ninguna fase nueva automáticamente.**
