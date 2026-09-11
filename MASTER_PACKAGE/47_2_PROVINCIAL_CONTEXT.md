# 47.2 — Patch: Contextualización del Atlas por provincia

Cierra la brecha que dejó explícitamente abierta el Patch 47.1: la provincia elegida ya se
persistía (`atlas:selectedProvince`, vía `GeoSelector`), pero ninguna entrada del Atlas la usaba
para nada. Este patch conecta ese dato con el contenido editorial, para que la promesa "el cultivo
cambia según dónde estés" se note también adentro de una entrada, no solo en Home.

## 1. Inspección previa (según consigna, sin auditoría general)

Se releyeron únicamente: `editorial/editorialData.js` y `editorial/registry.js` (modelo editorial),
`GeoSelector.js` (persistencia de `atlas:selectedProvince`/`atlas:selectedZone`),
`lib/geo/argentinaProvinces.js` (geometría del mapa, 24 ids), `lib/weather/locations.js` y
`lib/weather/service.js` (única fuente de coordenadas por provincia y de clima real, Fase 11),
`api/geo/route.js` y `api/climate/route.js`, `EnvironmentalPanel.js` (componente huérfano que ya
leía las mismas claves), las páginas de categoría/entrada del Atlas, y `03_GEO.md`/`04_CLIMATE.md`
para confirmar qué dato geográfico/climático está realmente verificado hoy (y cuál sigue
`PARTIAL_RESEARCH`, para no inventarlo).

## 2. Arquitectura elegida

Separación de tres capas, tal como pide la consigna:

- **Contenido base** (sin cambios): `editorial/editorialData.js` sigue siendo la única fuente de
  verdad del conocimiento general de cada entrada. No se reescribió ni se duplicó ningún texto
  existente.
- **Contexto geográfico** — archivo nuevo `src/app/lib/geo/provinceContext.js`. Reutiliza
  `PROVINCE_LOCATIONS` de `lib/weather/locations.js` (Fase 11 — nombre + latitud real, por
  centroide oficial de georef-ar-api) como única fuente de nombre/latitud: no se duplicó el
  listado de provincias ni se inventó ninguna coordenada. Agrega una sola pieza de dato nueva: la
  agrupación de las 24 jurisdicciones en 5 macrorregiones (NOA, NEA, Cuyo, Pampeana, Patagonia —
  la regionalización estadística de uso corriente en Argentina, la misma que ya usa el propio
  `03_GEO.md` como ejemplo narrativo). Esta agrupación es **geográfica, no climática**: no es una
  clasificación Köppen ni pretende serlo (esa capa sigue en `PARTIAL_RESEARCH`, ver `04_CLIMATE.md`
  y `21_GEO_CLIMATE_RESEARCH.md`, y este patch no la adelanta).
- **Contexto climático**: no se agregó ninguno nuevo. La única variable climática real disponible
  hoy en el proyecto (`fetchProvinceWeather`, Mi Cultivo) es un pronóstico en vivo por
  coordenadas, no una climatología de referencia por zona — no encaja como contenido editorial
  estático de una entrada del Atlas, y conectarla habría significado tocar Mi Cultivo o crear una
  arquitectura climática nueva, ambas cosas explícitamente fuera de alcance de este patch. La
  única pieza de tipo "ambiental" que sí se reutiliza es la **latitud real** de la provincia
  (dato geográfico, no climático) para la entrada de fotoperiodo, ver más abajo.
- **Contextualización por entrada** — archivo nuevo `src/app/lib/editorial/provinceContext.js`.
  Un generador de texto por `entryId` (7 funciones, una por entrada — no 24 objetos por
  provincia): cada una recibe el contexto geográfico ya resuelto (`{ name, region, regionLabel,
  lat }`) y arma 1-2 párrafos cortos. No hay ninguna tabla `provinceId → texto`: el texto se
  arma en el momento a partir de macrorregión + latitud, así que agregar una entrada nueva en el
  futuro no requiere escribir 24 variantes a mano.
- **Presentación** — componente nuevo `src/app/components/ProvinceContextPanel.js` (cliente),
  montado al final del cuerpo de cada entrada (`atlas/[category]/[entry]/page.js`), después de
  "Contexto ambiental" y antes de "Fuentes". Lee `atlas:selectedProvince` de `localStorage` en un
  `useEffect` (mismo patrón ya usado por `GeoSelector`/`EnvironmentalPanel`) y renderiza:
  - la sección **"Contexto de tu zona"** con el nombre de la provincia y los párrafos generados,
    si hay provincia elegida y la entrada tiene contextualización definida;
  - el mensaje **"Elegí tu provincia para contextualizar esta información."** si no hay ninguna
    elegida — nunca un contexto provincial inventado ni un bloqueo de lectura.

## 3. Cómo se obtiene la provincia (sin estado nuevo)

Se reutiliza exactamente `atlas:selectedProvince` — la misma clave de `localStorage` que ya
escribe `GeoSelector` (Home) desde el Patch 47.1. No se creó ninguna clave nueva, ningún contexto
de React, ningún parámetro de URL. Si el usuario cambia de provincia en Home y vuelve a una
entrada del Atlas, el panel se actualiza porque vuelve a leer la misma clave al montar la página.
Si usa "Explorar sin elegir", `GeoSelector` ya borraba esa clave desde el Patch 47.1 — este patch
no tocó esa lógica, solo la consume.

## 4. Qué entradas tienen contextualización y con qué profundidad

Las 7 entradas publicadas tienen un generador definido en `provinceContext.js`, con el nivel de
profundidad que pedía la consigna por tema (no todas cambian de la misma manera):

| Entrada | Qué usa | Qué NO afirma |
|---|---|---|
| Germinación | Macrorregión (rasgo general) | Ninguna cifra de tiempo, temperatura o humedad |
| Sustrato y drenaje | Macrorregión (rasgo general) | Ningún mm de lluvia ni frecuencia de riego |
| Luz y fotoperiodo | Macrorregión **+ latitud real** (grados, redondeados) | Ninguna hora de luz exacta ni fecha de floración |
| Lectura de señales | Macrorregión (rasgo general) | Ningún diagnóstico ni causa específica |
| Cultivo en secuencia | Macrorregión (rasgo general) | Ningún calendario ni duración de etapa |
| Cosecha y maduración | Macrorregión **+ latitud real** (mención cualitativa) | Ninguna fecha de cosecha |
| Marco editorial | Nada geográfico — nota fija de alcance nacional | No se inventó legislación provincial sin fuente verificada |

"Luz y fotoperiodo" y "Cosecha y maduración" son las únicas dos que citan un número (la latitud
aproximada de la provincia, en grados sur) — es un dato geográfico real, ya verificado y en uso
en el proyecto desde la Fase 11 (`lib/weather/locations.js`), no un dato climático inventado. Las
demás entradas solo usan el nombre de la macrorregión y un rasgo geográfico general en prosa
(ej. "clima templado", "clima árido") — la misma clase de afirmación general que ya usa el propio
`03_GEO.md` del proyecto para justificar por qué una provincia no alcanza como unidad
("Mendoza: de alta montaña árida...", "Salta/Jujuy: puna árida, yungas húmeda"). Ningún párrafo
de esta capa afirma un valor numérico de temperatura, precipitación, humedad, fecha de helada u
horas de luz — la regla dura de la consigna ("no inventar clima") se cumplió absteniéndose de esa
categoría completa de dato, no marcándola como `ASSUMPTION`.

Provincias de una misma macrorregión reciben el mismo texto general a propósito (ej. Córdoba y
Santa Fe, ambas "pampeanas", comparten el cuerpo del párrafo de Germinación) — no hay evidencia
propia del proyecto para diferenciarlas más allá de eso, e inventar una diferencia solo para que
parezcan distintas habría sido peor que no tenerla, tal como advierte la consigna. El nombre de la
provincia mostrado sí es siempre el propio (nunca el de otra), y en las dos entradas que usan
latitud, el texto sí es distinto provincia por provincia dentro de la misma región (verificado,
ver §6).

## 5. Datos considerados insuficientes (y qué se hizo en su lugar)

- **Clasificación climática por provincia** (Köppen, normales SMN, heladas por deciles): sigue
  `PARTIAL_RESEARCH` (`04_CLIMATE.md`). No se usó para nada de esta capa.
- **Regionalización agroecológica** (INTA RIAN / RySA): sigue sin lectura primaria posible desde
  este entorno (`21_GEO_CLIMATE_RESEARCH.md`). No se usó.
- **Legislación provincial específica sobre cannabis**: no hay ninguna fuente verificada en
  `19_SOURCE_REGISTRY.md` sobre variaciones provinciales del marco nacional (`Ley 27.350`,
  `Ley 23.737`). La entrada `marco-editorial` no varía por provincia — muestra siempre la misma
  nota aclarando que el marco descripto es de alcance nacional y que este atlas no tiene todavía
  información verificada específica por jurisdicción. Es la limitación más importante de esta
  fase y queda documentada acá, no resuelta con una afirmación sin fuente.
- **Departamento/partido/zona aproximada**: la consigna pedía que esta fase funcione con provincia
  solamente. No se usó `atlas:selectedZone` para nada — queda disponible para una fase futura si
  hay evidencia propia por zona, pero no se fuerza su uso ahora.

## 6. Cómo se probaron las 24 jurisdicciones

Script Playwright nuevo: `tests/provincial-context-audit.mjs` (Node directo sobre la librería
`playwright` ya instalada — el proyecto no tiene un test runner configurado, mismo estado que en
fases anteriores). No requiere servidor de producción: se corrió contra `next dev` en
`localhost:3000`.

Para cada una de las 24 provincias (Buenos Aires, Catamarca, Chaco, Chubut, Córdoba, Corrientes,
Entre Ríos, Formosa, Jujuy, La Pampa, La Rioja, Mendoza, Misiones, Neuquén, Río Negro, Salta, San
Juan, San Luis, Santa Cruz, Santa Fe, Santiago del Estero, Tierra del Fuego, Tucumán, CABA) el
script:
1. la selecciona en el `<input>` de Home (confirmando que el resumen visual resuelve al nombre
   correcto antes de confirmar),
2. hace clic en "Explorar {provincia}" y navega a `/atlas`,
3. confirma la persistencia real en `localStorage`,
4. abre las 7 entradas y en cada una verifica: nombre de provincia correcto, ausencia del nombre
   de cualquier otra de las 23 provincias, ausencia de `undefined`/`null` en el texto, cero
   imágenes rotas, cero overflow horizontal, cero errores de consola en todo el recorrido,
5. vuelve a Home y confirma que la selección sigue mostrada.

Después de las 24 rondas, dos verificaciones cruzadas automáticas:
- **Coherencia por macrorregión** (entrada Germinación): para cada par de provincias, si
  pertenecen a la misma macrorregión el cuerpo del texto (sin el nombre propio) debe ser idéntico;
  si pertenecen a macrorregiones distintas, debe ser distinto. Evita tanto "todo inventado
  distinto" como "todo idéntico sin razón".
- **Diferenciación real por latitud** (entrada Luz y fotoperiodo): las 24 provincias deben tener
  un texto de panel completo distinto entre sí (la latitud real de cada una es única), verificado
  contando valores únicos contra el total.

Además: prueba de aislamiento explícita (Buenos Aires → Mendoza → Tierra del Fuego → CABA,
confirmando que el contenido base no cambia, que el panel muestra siempre el nombre correcto y que
no queda texto de la provincia anterior), prueba de "Explorar sin elegir" (persistencia limpiada,
prompt genérico en las 7 entradas, sin nombres de provincia, sin `undefined`/`null`, sin errores de
consola), responsive en 1440×900/1280×800/768×1024/390×844 sobre Home y dos entradas (Tierra del
Fuego y CABA, los dos nombres de provincia con más caracteres para forzar el wrap), y una
regresión mínima de las superficies que este patch no debía tocar (Home, `/atlas`, `/mi-cultivo`,
`/chatbot`, `/creditos`, `/api/geo`, `/api/climate`, las 7 categorías) más la verificación de que
"Crecimiento" reemplazó a "Fundamentos" como texto visible.

## 7. Resultado de la corrida

**1280/1280 verificaciones en verde** (0 fallas) en la corrida final contra `next dev`. La primera
corrida del script tuvo 73 fallas — todas por dos errores del propio script de prueba, no del
producto: (a) una aserción mal planteada que interpretaba la persistencia legítima entre
provincias como un falso positivo, y (b) una comparación de texto que usaba `.replace()` (solo
reemplaza la primera aparición) en vez de `.replaceAll()`/`split().join()` para quitar el nombre
de provincia, que aparece dos veces en el panel (el badge y dentro de la oración) — al corregir
ambos, las 1280 verificaciones pasaron.

## 8. Fundamentos → Crecimiento

Cambio de presentación editorial (`editorial/editorialData.js`, categoría `id: 'fundamentos'`):
`title`, `tag` y `type` pasan de "Fundamentos"/"FUNDAMENTOS" a "Crecimiento"/"CRECIMIENTO" (los
tres son texto visible: grilla, tarjeta de categoría, breadcrumb y encabezado de `/atlas/fundamentos`).
`shortDescription` y `metadata.seoTitle` (no renderizados hoy en ninguna página, confirmado con
`grep`) se actualizaron también por consistencia editorial. **El slug/id técnico `fundamentos` no
se tocó** — sigue siendo la URL real (`/atlas/fundamentos`), la clave de relación con sus assets
(`assets.js`) y el tag interno (`tags.js`), evitando romper URLs o relaciones existentes, tal como
pedía la consigna.

## 9. Verificación de responsive y regresión

Confirmado por el mismo script (§6): cero overflow horizontal en las 4 resoluciones pedidas, sobre
Home y dos entradas con los nombres de provincia más largos. Regresión: Home, `/atlas` (grid con
"Crecimiento" visible y "Fundamentos" ya no presente como texto), las 7 categorías, `/mi-cultivo`,
`/chatbot`, `/creditos`, `/api/geo`, `/api/climate` responden 200. `npm run build` limpio, mismas 9
rutas que antes de este patch (no se agregó ni quitó ninguna ruta — el panel es un componente
cliente dentro de una ruta ya existente).

## 10. Limitaciones honestas

- La contextualización de 5 de las 7 entradas diferencia solo por macrorregión (5 valores
  posibles), no por provincia individual — es una decisión deliberada para no inventar un dato
  más fino del que hay evidencia (§4), no una limitación técnica.
- `marco-editorial` no varía en absoluto por provincia — es la entrada con menos evidencia
  disponible, y mostrar una nota genérica en vez de inventar variación legal provincial es
  exactamente lo que pide la consigna en su regla de "no inventar" (§21 de la consigna original).
- No se conectó ningún dato climático en vivo (pronóstico real) a ninguna entrada del Atlas — la
  única fuente climática viva del proyecto (`fetchProvinceWeather`) sigue exclusiva de Mi Cultivo,
  sin tocar, tal como exigía el alcance de este patch.
- `atlas:selectedZone` (departamento/zona aproximada) no se usa todavía en esta capa — queda como
  candidato futuro si aparece evidencia propia por zona, sin forzarlo ahora.

## 11. Fuera de alcance (a propósito, no iniciado)

Ninguno de los 8 loops de investigación editorial profunda, ninguna clasificación climática nueva,
ningún calendario personalizado, ningún diagnóstico de plantas, ningún cambio a Mi Cultivo, al
Chatbot (más allá de que ya lee la misma provincia guardada desde la Fase 13C, sin tocar su
código en este patch), a Supabase/Auth/RLS/Storage, ni ninguna investigación web nueva.

## 12. Archivos

**Nuevos**: `src/app/lib/geo/provinceContext.js`, `src/app/lib/editorial/provinceContext.js`,
`src/app/components/ProvinceContextPanel.js`, `tests/provincial-context-audit.mjs`,
`MASTER_PACKAGE/47_2_PROVINCIAL_CONTEXT.md`.
**Modificados**: `src/app/atlas/[category]/[entry]/page.js` (monta el panel nuevo),
`src/app/lib/editorial/editorialData.js` (Fundamentos → Crecimiento, solo texto visible),
`src/app/globals.css` (2 reglas nuevas para el panel, reutiliza `.atlas-entry-section` existente).
**Sin cambios**: `editorial/editorialData.js` (contenido base de las 7 entradas), `GeoSelector.js`,
`EnvironmentalPanel.js`, `lib/weather/*`, `api/geo`, `api/climate`, Mi Cultivo, Chatbot, Auth, RLS,
Storage.

**PATCH 47.2 TERMINADO. No se iniciaron los 8 loops de investigación. No se rediseñó Mi Cultivo,
Chatbot ni el sistema de clima. No se inventó ningún dato climático.**
