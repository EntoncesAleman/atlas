# 45 — Chatbot del Atlas: Retrieval del Conocimiento Editorial (Fase 13B)

Primer motor real de conocimiento del Chatbot del Atlas: pregunta → normalización → búsqueda local sobre el modelo editorial → evidencia estructurada y trazable. Sin LLM, sin generación de lenguaje natural, sin Internet.

## 1. Objetivo

Que `/chatbot`, ya protegido por sesión desde la Fase 13A, pueda recibir una pregunta y recuperar contenido real y existente del Atlas — de forma determinista, trazable hasta su entrada/sección/fuente, y sin inventar ni parafrasear nada.

## 2. Inspección previa

Antes de programar se releyeron solo los archivos necesarios: `lib/editorial/editorialData.js` (forma real de `editorialCategories`/`editorialEntries` — título, summary, intro, sections[], observations[], signals[], commonMistakes[], environmentContext[], tags[], relatedEntryIds[], sourceIds[]), `lib/editorial/registry.js` (adaptador ya existente: `getEntries()` filtra por `PUBLISHED`, `getCategoryById()`, `getSourcesForEntry()`), `lib/editorial/sources.js` (`sourceById(id)`), `lib/editorial/tags.js` (vocabulario controlado), `atlas/[category]/[entry]/page.js` (cómo se renderizan hoy sections/signals/commonMistakes/fuentes, y el patrón de URL `/atlas/{categorySlug}/{entrySlug}`), y `chatbot/page.js` tal como quedó en 13A. No se releyó el resto de `MASTER_PACKAGE/`.

## 3. Arquitectura

```
src/app/lib/chatbot/
  searchAtlas.js   — normalización, scoring, snippets, searchAtlas(query)
```

`searchAtlas.js` importa únicamente `getEntries` y `getCategoryById` de `lib/editorial/registry.js` — el mismo adaptador que ya usa `/atlas`. No se duplicó ningún dato editorial, no se creó ninguna tabla ni base paralela; el contenido sigue viviendo exclusivamente en `editorialData.js`. `chatbot/page.js` resuelve `categoryId → categoría` con `getCategoryById` (ya existente) y `sourceId → fuente` con `sourceById` (ya existente) — ninguna función de resolución nueva hizo falta.

## 4. Normalización de la consulta

`normalizeText(text)`: minúsculas → `NFD` + eliminación de marcas diacríticas combinantes (acentos) → reemplazo de todo signo/puntuación por espacio → colapso de espacios repetidos → `trim()`. Ejemplos reales verificados: `"¿Cómo germina el cannabis?"` → `"como germina el cannabis"`; `"GERMINACIÓN"` → `"germinacion"`.

Sobre el texto normalizado se tokeniza por espacios, se descarta una lista fija de ~40 stopwords en español (artículos, preposiciones, pronombres comunes: "el", "la", "de", "en", "y", "que", "para", etc.) y tokens de 2 caracteres o menos.

## 5. Coincidencia aproximada (sin diccionario de sinónimos)

Cada token se reduce a un prefijo de hasta 6 caracteres (`stem()`) — un recorte simple, no un stemmer lingüístico real. Esto resuelve, sin ningún diccionario manual, los dos casos que pedía la consigna:
- `"semilla"` / `"semillas"` → ambos recortan a `"semill"`.
- `"germinar"` / `"germinación"` (ya sin acento: `"germinacion"`) → ambos recortan a `"germin"`.

Documentado explícitamente como la única forma de coincidencia aproximada de esta fase: no se creó ningún diccionario de sinónimos científicos ni una lista de equivalencias manual. Por diseño, esto significa que términos genuinamente distintos aunque relacionados (por ejemplo `"suelo"` y `"sustrato"`, que no comparten raíz) **no** se equiparan entre sí — se verificó que esto no impide la recuperación correcta en la prueba 4 (ver §9), porque `"drenaje"` por sí solo ya aporta evidencia suficiente.

## 6. Campos buscados y pesos (scoring)

Se usan exactamente los campos reales que existen en una entrada — ninguno inventado. Si un campo no existe o está vacío en una entrada dada, se ignora sin error.

| Campo | Peso |
|---|---|
| `title` | 10 |
| `summary` | 9 |
| `tags[]` | 8 |
| `sections[].title` | 6 |
| `sections[].paragraphs[]` | 4 |
| `observations[]` | 3 |
| `signals[].description` | 2 |
| `commonMistakes[].description` | 2 |
| `environmentContext[]` | 1 |

Por cada "trozo" de texto (cada tag, cada párrafo de sección, cada observación, etc.) se cuenta cuántos stems distintos de la consulta aparecen en él — sin ponderar por repetición dentro del mismo trozo — y se multiplica por el peso del campo. La suma de todos los trozos coincidentes es el puntaje total de la entrada. Se descarta cualquier entrada con puntaje menor a **3** (`MIN_SCORE`): un único acierto aislado en `signals` o `commonMistakes` (peso 2) nunca alcanza por sí solo para considerarse evidencia — necesita reforzarse con otro acierto, o venir de un campo de mayor peso. Esto es lo que distingue "coincidencia débil" de "evidencia real" pedido en la consigna.

**Deliberadamente no se usó `relatedEntryIds`** como señal de scoring (era el campo #10, el de menor prioridad, en la lista de la consigna): usar relaciones para sumar entradas que no contienen ningún texto coincidente hubiera arriesgado devolver resultados sin evidencia real en ese resultado puntual, violando la regla de no rellenar con contenido irrelevante. `relatedEntryIds` sigue existiendo en el modelo y se sigue usando, sin cambios, en la página de la entrada (`/atlas/[category]/[entry]`) — solo no se convirtió en una señal de búsqueda.

## 7. Resultados

`searchAtlas(query)` devuelve `{ results }`: array ordenado por puntaje descendente, **máximo 5**, nunca rellenado con coincidencias débiles para completar el límite (si solo hay 1 o 2 entradas que superan el umbral, se devuelven solo esas). Consulta sin ningún token válido (vacía, o solo stopwords) devuelve `{ results: [] }` de inmediato, sin ejecutar ningún scoring.

Cada resultado:
```js
{
  entryId, categoryId, title, score, matchedFields,
  snippet, sectionId, sourceIds, url
}
```
`matchedFields` lista los campos donde hubo coincidencia (para diagnóstico/futura UI, no se muestra literal en pantalla). `sectionId` queda en `null` cuando el mejor trozo no vino de una sección puntual (por ejemplo, si el mejor acierto fue en el título).

## 8. Snippets

`buildSnippet` ubica la primera palabra de la consulta (por raíz) dentro del texto real del trozo con mejor puntaje y recorta una ventana real alrededor (60 caracteres antes, 140 después, ajustada a límites de palabra, con `…` si el recorte no llega al borde del texto). **Nunca se parafrasea ni se resume con IA** — es siempre una extracción literal del contenido editorial ya escrito. Si el mejor trozo es un tag o el título (textos demasiado cortos para un recorte útil), se usa el `summary` real de la entrada en su lugar — sigue siendo texto editorial real, nunca inventado. Solo si no hay ningún texto disponible el snippet queda en `null` y la UI simplemente no lo muestra.

## 9. Pruebas funcionales (consultas reales, resultado real)

| # | Consulta | Resultado #1 esperado | Resultado #1 obtenido |
|---|---|---|---|
| 1 | "germinación" | `germinacion` | ✅ `germinacion` (score 48) |
| 2 | "cómo germina una semilla" | `germinacion` | ✅ `germinacion` |
| 3 | "luz y fotoperiodo" | `luz-y-fotoperiodo` | ✅ `luz-y-fotoperiodo` (score 91, muy por encima del resto) |
| 4 | "suelo y drenaje" | `sustrato-y-drenaje` | ✅ único resultado devuelto |
| 5 | "cosecha" | `cosecha-y-maduracion` | ✅ único resultado devuelto |
| 6 | "errores durante la germinación" | `germinacion` (si la evidencia lo permite) | ✅ `germinacion` primero |
| 7 | "recetas de pizza con muzzarella" (sin evidencia) | `results: []` | ✅ `[]`, UI muestra "No encuentro información suficiente..." |

**Verificación explícita de que los resultados secundarios no son ruido**: para la consulta "germinación", `cultivo-en-secuencia` y `marco-editorial` aparecieron con puntaje bajo (4 cada uno, muy por debajo del 48 del resultado principal) — se confirmó por inspección directa del texto fuente que ambas entradas **mencionan realmente la palabra "germinación"** de forma genuina (`cultivo-en-secuencia`: "esa secuencia completa —desde la germinación hasta la maduración— es lo que se llama ontogenia"; `marco-editorial`: "por ejemplo, cómo germina una semilla..."). Mismo chequeo para "luz y fotoperiodo": los cuatro resultados secundarios (`germinacion`, `lectura-de-senales`, `cultivo-en-secuencia`, `cosecha-y-maduracion`) mencionan genuinamente "luz" o "fotoperiodo" en su propio texto real — ninguno es una coincidencia espuria.

## 10. Pruebas de trazabilidad

Para el primer resultado de "germinación" (`germinacion`): `entryId`/`categoryId` válidos (categoría "Fundamentos" mostrada correctamente), `sectionId` válido cuando el mejor trozo vino de una sección, 5 `sourceIds` válidos resueltos correctamente vía `sourceById` (mismas fuentes que se ven en la propia página de la entrada), y `url` (`/atlas/fundamentos/germinacion`) verificada real: clic en "Ver entrada" navega a la entrada real del Atlas con el título correcto, y "volver" regresa al chatbot sin perder el estado de la página. Ningún resultado devuelto por ninguna de las 7 consultas de prueba careció de `entryId`/`categoryId`/`url` válidos.

## 11. Pruebas de UI

Autenticado: abrir `/chatbot` → escribir consulta → enviar → ver resultados → abrir una entrada real → volver al chatbot → realizar una segunda consulta distinta (funcionó sin recargar la página, mismo estado de sesión) → consulta sin resultados (mensaje correcto, sin inventar nada). Sin autenticación: `/chatbot` sigue mostrando únicamente la pantalla de acceso — el formulario de búsqueda **no existe en el DOM** (mismo patrón de 13A), por lo que el retrieval nunca se ejecuta sin sesión. Responsive 1440×900 y 390×844: sin overflow horizontal en ningún estado (vacío, con resultados, sin resultados), tarjetas de resultado, snippets, link "Ver entrada" y botón "Fuentes" visibles y usables en ambos tamaños.

## 12. Seguridad

`searchAtlas` no lee Supabase, no lee Mi Cultivo, no lee clima, no usa `fetch` ni ningún servicio externo — es una función pura sobre datos en memoria del propio bundle de la app. Los resultados se renderizan como texto plano dentro de JSX (React escapa por defecto); no se usó `dangerouslySetInnerHTML` en ningún punto. La consulta del usuario se trata siempre como texto — nunca se interpola en HTML, en una query SQL ni en un `eval`. El gate de sesión de 13A no se modificó: sin sesión, el formulario de búsqueda no se renderiza, por lo que no hay ninguna vía de ejecutar `searchAtlas` sin autenticación (confirmado en la prueba de UI). No se expone ningún UUID, token ni dato de Supabase en ningún resultado — el modelo editorial no contiene ninguno de esos datos. `get_advisors` de seguridad: sin alertas (no se tocó ninguna tabla ni política).

## 13. Regresión

`/`, `/atlas`, una categoría, una entrada del Atlas, `/mi-cultivo`, login/logout, `/creditos`, `/api/geo`, `/api/climate` — todos responden 200, sin errores de consola nuevos. `npm run build`: limpio, 10 rutas (sin cambios respecto a 13A).

## 14. Límites explícitos de esta fase

- **13B NO usa LLM.** Ningún modelo de lenguaje, ninguna API de OpenAI/Anthropic/Gemini/Ollama, ningún modelo local.
- **13B NO usa Internet.** Sin `fetch` a buscadores, sin scraping, sin Wikipedia dinámica.
- **13B NO usa clima.** `/api/climate` no se llama desde ningún punto de este código.
- **13B NO usa Mi Cultivo.** No se lee cultivo, eventos, notas, fotos, etapa ni provincia del usuario.
- **13B NO genera respuestas libres.** Lo que se muestra son resultados reales del Atlas (título, categoría, fragmento textual extraído, fuentes, link) — nunca una oración redactada que sintetice o interprete esos resultados.
- No hay memoria conversacional ni historial — cada búsqueda es independiente, no se guarda ninguna consulta en ningún lugar (ni local ni en Supabase).
- No se instaló ninguna dependencia nueva.

## 15. Archivos

**Nuevos**: `src/app/lib/chatbot/searchAtlas.js`.
**Modificados**: `src/app/chatbot/page.js` (formulario real conectado a `searchAtlas`, estados de resultados/sin resultados/error), `src/app/globals.css` (estilos de las tarjetas de resultado).
**Sin cambios**: `editorialData.js`, `registry.js`, `sources.js`, `tags.js`, esquema de Supabase, RLS, Storage, Auth, Home, mapa, páginas del Atlas.

## 16. Resultado final

`/chatbot`, para un usuario autenticado, ahora recupera evidencia real y trazable del Atlas a partir de una pregunta en lenguaje natural simple, con normalización y coincidencia aproximada deterministas, sin depender de ningún servicio externo. El gate de acceso de la Fase 13A queda intacto. Ninguna respuesta conversacional se genera todavía — eso es exactamente lo que separa esta fase de la 13D.

**Siguiente fase sugerida: 13C** — sumar contexto autorizado del propio usuario (etapa de Mi Cultivo, provincia, clima actual) a la evidencia ya recuperada, sin generar todavía una respuesta redactada.

**FASE 13B TERMINADA. No se implementó LLM, generación de lenguaje natural, Internet, clima, Mi Cultivo, memoria conversacional, historial, ni ninguna otra funcionalidad de fases posteriores.**
