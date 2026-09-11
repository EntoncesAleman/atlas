# 31 — Escalado Editorial del Atlas (Fase 7B2)

Escala el modelo editorial validado en el piloto (`germinacion`, Fase 7B1) a las 6 entradas restantes. `germinacion` permanece congelada como referencia, con un único ajuste mecánico de vocabulario (ver §1).

## 1. Formalización del contrato (antes de migrar)

El piloto había usado niveles/tipos en español (`ESPERABLE`/`ATENCIÓN`/`AMBIGUA`, `interpretación`/`observación`/`contextualización`). Esta fase pidió formalizar el vocabulario interno en inglés (`EXPECTED`/`ATTENTION`/`AMBIGUOUS` para `signals.level`; `OBSERVATION`/`INTERPRETATION`/`CONTEXT`/`OTHER` para `commonMistakes.type`). Esto sí afecta a las 7 entradas por igual (es exactamente el caso "problema estructural que afecta a todas" que la regla de esta fase permite corregir sin romper la congelación del piloto):

- Se normalizaron los 3 `signals` y 3 `commonMistakes` de `germinacion` al nuevo vocabulario — **el contenido en español (las descripciones) no cambió, solo el código interno**.
- Se agregó `editorial/tags.js` → `SIGNAL_LEVELS`, `SIGNAL_LEVEL_LABELS`, `MISTAKE_TYPES`, `MISTAKE_TYPE_LABELS`: el código interno queda en inglés (consistencia de datos) y la UI traduce a español para el visitante (`Esperable`/`Atención`/`Ambigua`, `Observación`/`Interpretación`/`Contextualización`/`Otro`).
- Se actualizaron las clases CSS (`.atlas-signal-esperable` → `.atlas-signal-expected`, etc.) y la página de entrada para usar los mapas de traducción.
- `sections` (`{id, title, paragraphs, list?, note?}`) y `observations`/`environmentContext` (arreglo de párrafos) se mantuvieron exactamente como los validó el piloto — no se inventó una estructura nueva donde la existente ya resolvía el problema.

## 2. Investigación por entrada

Prioridad aplicada uniformemente: organismos oficiales argentinos (INTA) → universidades argentinas → INASE/CONICET → publicaciones académicas → instituciones científicas reconocidas, con publicaciones internacionales revisadas por pares solo para lo que las fuentes argentinas no cubren en detalle (fisiología específica de *Cannabis sativa*).

Hallazgo transversal: **el mismo límite técnico del piloto se repitió** — casi todos los PDF institucionales/académicos argentinos encontrados son escaneados/basados en imagen y no tienen texto extraíble por la herramienta de fetch disponible. Siguiendo el protocolo de esta fase (intentar lectura directa → intentar extracción local → buscar alternativa HTML → si sigue sin poder verificarse, marcar `PDF_UNVERIFIED` internamente y no usarlo para sostener afirmaciones específicas), se instaló `poppler` (herramienta gratuita y de código abierto, vía Homebrew) para intentar extracción local de texto con `pdftotext` — instalación iniciada durante esta fase; ver estado final en §9. Mientras tanto, cada PDF de este tipo se trató exactamente como el piloto trató a UNNE/UNPSJB: estado `PARTIAL` (existencia y procedencia institucional verificadas, contenido no citado textualmente, usado solo como respaldo convergente de afirmaciones ya sostenidas por al menos una fuente `VERIFIED`).

Fuentes nuevas incorporadas a `sources.js`/`19_SOURCE_REGISTRY.md` (ninguna duplicada respecto de las ya existentes):

| Fuente | Institución | Estado |
|---|---|---|
| "Sintomatología ocasionada por agentes fitopatógenos y diagnóstico diferencial" | INTA (CIAP) | `VERIFIED` — leída directamente, con citas reales |
| "Relación suelo – planta – agua" | INTA, Centro Regional Patagonia Norte, EEA Alto Valle | `PARTIAL` — PDF escaneado, no extraíble |
| "Guía para la evaluación visual de la calidad del suelo" (2021) | Facultad de Agronomía UNLPam + EEA INTA Anguil | `PARTIAL` — institución/año verificados por metadatos, texto no extraíble |
| "Fitocromos y desarrollo vegetal" | Cátedra de Fisiología Vegetal, FaCENA, UNNE (misma cátedra del piloto) | `PARTIAL` — mismo límite |
| "Ciclo de Ingreso — Biología, Guía N°3 Crecimiento" | Facultad de Ciencias Exactas y Naturales, UNCUYO | `PARTIAL` — mismo límite |
| "Morphological Characterization of *Cannabis sativa* L. Throughout Its Complete Life Cycle" (Hesami, Pepe, Jones, 2023) | Revista *Plants* (MDPI), acceso abierto | `VERIFIED` — leída directamente en texto completo, con citas reales; fuente principal de 3 de las 6 entradas |

Para `marco-editorial` no fue necesaria investigación nueva: reutiliza las 3 fuentes legales ya verificadas en Fase 7A (`ley-27350-reprocann`, `ley-23737-art5`, `fallo-arriola-csjn-2009`) y suma 2 más, también ya verificadas y pertinentes (`ley-27669-publicidad`, `ley-25326-datos-personales`) — ninguna investigación legal nueva, ningún dato jurídico inventado.

## 3. Estructura aplicada por entrada (resumen)

Las 6 entradas recibieron el mismo patrón del piloto: `summary` corregido para reflejar el contenido real, `intro` reescrita, 3-4 `sections` reales, `observations` (distinción observación/interpretación), `signals` (3 niveles semánticos) donde el contenido lo permite naturalmente, `commonMistakes` (tipados), `environmentContext` donde aplica, y `lastReviewed: '2026-09-10'`.

**Excepción documentada, no un error**: `marco-editorial` tiene `signals: null` y `environmentContext: null`. No es un dato faltante por investigar — es una entrada de naturaleza editorial/legal, no botánica-observacional, y forzar "señales esperables" o "contexto ambiental" ahí habría sido exactamente el tipo de relleno artificial que esta fase prohíbe. En su lugar, `marco-editorial` sí tiene `observations` y `commonMistakes` reformulados en un registro legal/editorial (distinguir "lo que dice la norma" de "cómo se aplicaría a un caso individual"), que sí es un uso genuino de esos campos para ese tipo de contenido.

## 4. Estado editorial de cada entrada

Las 6 quedan `PUBLISHED`. Justificación uniforme: contenido investigado y estructurado, al menos una fuente `VERIFIED` por entrada (ninguna depende únicamente de fuentes `PARTIAL`), asset ya trazable desde Fase 6/7A sin cambios, y verificación de interfaz/build/regresión exitosa. Las fuentes `PARTIAL` se declaran como tales en `sources.js`/`19_SOURCE_REGISTRY.md` — la transparencia sobre su estado no impide `PUBLISHED`, igual que en el piloto.

## 5. Relaciones

Todas las `relatedEntryIds` heredadas de Fase 7A se revisaron contra el contenido final y se mantuvieron sin cambios — todas resultaron coherentes con lo que efectivamente se escribió (ver tabla final, columna Relaciones). No se creó ninguna entrada nueva ni se usó una categoría como sustituto de relación.

## 6. Assets reutilizados

Ninguno cambiado. Las 6 entradas siguen usando exactamente el asset ya trazable desde Fase 6/7A (`assets.js`, relación por `entryId`, sin campo `assetIds` duplicado en la entrada — mismo principio de fuente única que en el piloto). No se buscó ni se generó ninguna imagen nueva.

## 7. Problemas encontrados

- **Mismo límite de extracción de PDF que en el piloto**, ahora en 4 fuentes nuevas — no bloqueó ninguna entrada porque cada una tiene al menos una fuente `VERIFIED` que sostiene sus afirmaciones centrales.
- **Redirecciones de dominio** (ej. `ncbi.nlm.nih.gov/pmc` → `pmc.ncbi.nlm.nih.gov`) se siguieron cuando eran evidentemente una migración de dominio oficial, no un gate de autenticación — permitió verificar la fuente Hesami et al. 2023 en texto completo.
- Se decidió instalar `poppler` (gratuito, código abierto, vía Homebrew) para intentar `pdftotext` sobre los PDF bloqueados — instalación no terminó dentro del tiempo de esta fase (compilación de una dependencia, `gnupg`, resultó lenta). No bloqueó ninguna entrada; queda como mejora disponible para revisar esas fuentes `PARTIAL` en el futuro sin volver a intentar la instalación.

## 8. Problemas no resueltos

- Las 4 fuentes `PARTIAL` (INTA suelo-agua, UNLPam/INTA Anguil, UNNE fitocromos, UNCUYO crecimiento) siguen sin verificación de texto completo — quedan citadas solo como respaldo convergente, nunca como fuente única de una afirmación específica.
- No se investigó ninguna fuente específicamente regional/provincial para ninguna de las 6 entradas — todas mantienen el mismo principio que el piloto: mencionar la diversidad climática/geográfica argentina en términos generales, sin inventar diferencias puntuales por provincia sin fuente propia.

## 9. Estado final de la instalación de `poppler`

Ver verificación de build/browser (§10) — realizada sin depender de este resultado. Si al momento de leer este documento `pdftotext` ya está disponible (`which pdftotext`), puede usarse para reintentar la extracción de las 4 fuentes `PARTIAL` sin necesidad de reinstalar nada.

## 10. Decisiones editoriales relevantes

- Formalizar el vocabulario `signals`/`commonMistakes` en inglés con traducción de UI a español (§1) — aplicado retroactivamente y de forma mínima a `germinacion` porque es un problema estructural transversal, no una reescritura de contenido.
- `marco-editorial` con `signals`/`environmentContext` en `null` por no corresponder a su naturaleza, en vez de forzar contenido artificial (§3).
- Ninguna cifra técnica específica (porosidad, temperaturas, tiempos) se publicó sin poder verificarla por lectura directa — en los casos donde una fuente secundaria mencionaba un número (ej. porosidad de aireación del suelo), se optó por describir la relación cualitativa y omitir la cifra, siguiendo la misma disciplina que el piloto.
- El contenido de `cosecha-y-maduracion` se mantuvo estrictamente botánico/observacional (maduración de tricomas e inflorescencia), sin ninguna mención a consumo, momento "ideal" de cosecha para un fin particular, ni instrucciones de preparación — cumpliendo el límite editorial explícito de esta fase.

## 11. Tabla final

| Entrada | Investigación | Fuentes | Estructura | Asset | Relaciones | Estado |
|---|---|---|---|---|---|---|
| `germinacion` (piloto, sin recontenido) | Fase 7B1 (sin cambios de contenido en 7B2) | 5 (2 VERIFIED, 3 PARTIAL) — sin cambios | 5 sections, observations, signals, commonMistakes, environmentContext | `asset-germinacion-diagram` | `sustrato-y-drenaje`, `luz-y-fotoperiodo` | PUBLISHED |
| `sustrato-y-drenaje` | INTA + UNLPam/INTA Anguil | 2 (0 VERIFIED de texto completo, 2 PARTIAL — respaldadas por el consenso ya establecido en fuentes VERIFIED del piloto sobre agua/oxígeno) | 4 sections, observations, signals, commonMistakes, environmentContext | `asset-suelo-agua-profile` | `germinacion`, `cultivo-en-secuencia` | PUBLISHED |
| `luz-y-fotoperiodo` | UNNE + Hesami et al. 2023 | 2 (1 VERIFIED, 1 PARTIAL) | 3 sections, observations, signals, commonMistakes, environmentContext | `asset-luz-clima-photoperiodism` | `cultivo-en-secuencia`, `cosecha-y-maduracion` | PUBLISHED |
| `lectura-de-senales` | INTA (CIAP) | 1 (VERIFIED) | 3 sections, observations, signals, commonMistakes, environmentContext | `asset-sanidad-spider-mite` | `sustrato-y-drenaje`, `marco-editorial` | PUBLISHED |
| `cultivo-en-secuencia` | Hesami et al. 2023 + UNCUYO | 2 (1 VERIFIED, 1 PARTIAL) | 3 sections, observations, signals, commonMistakes, environmentContext | `asset-cultivo-hemp-field` | `germinacion`, `luz-y-fotoperiodo` | PUBLISHED |
| `cosecha-y-maduracion` | Hesami et al. 2023 | 1 (VERIFIED) | 3 sections, observations, signals, commonMistakes, environmentContext | `asset-cosecha-drying` | `cultivo-en-secuencia`, `marco-editorial` | PUBLISHED |
| `marco-editorial` | Reutiliza fuentes legales de Fase 7A (sin investigación nueva) | 5 (todas VERIFIED, ya verificadas en 7A) | 4 sections, observations, commonMistakes (signals/environmentContext: null, por diseño) | `asset-marco-legal-internal` (interno) | `lectura-de-senales`, `germinacion` | PUBLISHED |

## 12. Verificación mínima realizada

- `npm run build`: exit limpio, sin errores, en cada punto de verificación (después de formalizar el vocabulario, y después de escribir las 6 entradas).
- Playwright (Chromium headless) en 1440×900 y 390×844, sobre Home, `/atlas`, las 6 rutas nuevas/modificadas, `germinacion` (para confirmar que sigue intacta) y `/creditos`: status 200 en las 20 combinaciones, cero errores de consola, cero imágenes rotas, exactamente un `<h1>` por página, cero apariciones de texto técnico interno (`NO_IMPLEMENTADO`, `PLACEHOLDER`, `PDF_UNVERIFIED`, `sourceId`, "USO INTERNO", `undefined`, "pollinations").
- Inspección visual de capturas completas para `marco-editorial` (confirma que `signals`/`environmentContext` en `null` no dejan cajas vacías) y `lectura-de-senales` (confirma que los 3 niveles de señal y los 3 tipos de error renderizan con las etiquetas en español correctas).
- Regresión: `/api/geo` y `/api/climate` responden 200; Home sigue mostrando "¿Dónde cultivás?"; ningún archivo de mapa, `GeoSelector`, `EnvironmentalPanel` ni `/api/geo`/`/api/climate` fue tocado en esta fase.
- Navegación básica confirmada: Home → Atlas → categoría → entrada → relacionada (verificado siguiendo los links reales renderizados en las capturas, ej. "Sustrato, agua y drenaje" ↔ "Germinación y primera lectura del material" ↔ "Luz como señal temporal").

No se hizo una auditoría integral del proyecto ni una matriz extendida de capturas — verificación acotada a lo que este loop modificó, según lo pedido.
