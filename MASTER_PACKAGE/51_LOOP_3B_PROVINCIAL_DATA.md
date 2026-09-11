# 51 — Loop 3B: base de datos de la Ficha Provincial

Implementa el modelo de datos `provinceProfile`/`ArgentinaProfile` especificado en
`MASTER_PACKAGE/50_FICHA_PROVINCIAL_ATLAS.md`, con datos reales donde hay evidencia y
`PENDING_RESEARCH` explícito donde no la hay. No se construyó ningún componente visual (eso es
Loop 3C) — es investigación + modelo de datos + código de soporte mínimo para poder probarlo.

## 1. Objetivo

Construir la base factual, trazable y estructurada de la Ficha Provincial para las 24
jurisdicciones (23 provincias + CABA), sin inventar ningún dato y sin convertir este loop en una
investigación climática nacional exhaustiva.

## 2. Inventario de datos existentes (Fase 2)

| Dato | Fuente actual | Archivo | Reutilizable | Observaciones |
|---|---|---|---|---|
| Nombre visible + id interno | `PROVINCE_LOCATIONS` | `lib/weather/locations.js` | Sí, tal cual | Fase 11, centroide georef-ar-api |
| Latitud/longitud (centroide) | `PROVINCE_LOCATIONS` | `lib/weather/locations.js` | Sí, tal cual | Excepción documentada: Tierra del Fuego usa el centroide de Ushuaia, no el geométrico real (cae en territorio antártico) |
| Macrorregión + texto editorial | `getProvinceGeoContext` | `lib/geo/provinceContext.js` | Sí, tal cual | Fase 47.2 |
| Geometría SVG + bbox | `ARGENTINA_PROVINCES` | `lib/geo/argentinaProvinces.js` | Sí, tal cual (recorte por bbox, sin nuevo dataset) | Fase 8A, IGN/georef-ar-api |
| Contexto redactado por entrada | `getEntryProvinceContext` | `lib/editorial/provinceContext.js` | Sí, tal cual | Fase 47.2 |
| Clima operativo (pronóstico vivo) | `fetchProvinceWeather` | `lib/weather/service.js` | **No** (tipo de dato distinto — ver §9) | Fase 11 |
| Nombre oficial completo + código INDEC | — (no existía) | — | Se investigó en este loop | georef-ar-api, campo `nombre_completo` + `id` |
| Capital de cada jurisdicción | — (no existía) | — | Se investigó en este loop | Hecho administrativo público |
| Climatología de referencia (temp/precip/Köppen) | — (no existía) | — | Sigue `PARTIAL_RESEARCH` | Ver §9 |
| Fotoperiodo/duración del día | — (no existía) | — | Se implementó en este loop | Cálculo determinista, no fuente externa |

No se duplicó ningún dato ya existente: `provinceProfile.js` (nuevo) importa y deriva de los
cuatro módulos de la columna "Archivo" de arriba, sin copiar valores.

## 3. Metodología general

Prioridad de fuentes seguida (idéntica a la pedida): oficial/primaria → académica revisada →
institucional secundaria → cálculo documentado → pendiente. Se usó la misma API oficial
(georef-ar-api, `apis.datos.gob.ar`) que ya usa el proyecto desde la Fase 8A/11, consultada de
nuevo en esta sesión para obtener `nombre_completo` y el código INDEC de 2 dígitos de las 24
jurisdicciones — no se inventó ningún código ni nombre oficial.

## 4. Identity — verificado

Consulta directa (esta sesión) a
`https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre,nombre_completo,centroide`:
devuelve exactamente 24 registros, sin duplicados ni omisiones, con el código INDEC de 2 dígitos
en el campo `id` (ej. `"06"` para Buenos Aires, `"02"` para CABA) y el nombre oficial completo en
`nombre_completo` (ej. `"Provincia de Buenos Aires"`, `"Ciudad Autónoma de Buenos Aires"` — nótese
que CABA no lleva el prefijo "Provincia de", coherente con su naturaleza jurídica distinta).

La capital de cada jurisdicción es un hecho administrativo público (mismo nivel de certeza que ya
usa el proyecto para "23 provincias + CABA, confirmado por IGN" en `03_GEO.md`) — no se le asignó
una URL/DOI individual por dato porque no es una investigación puntual, es conocimiento
geográfico-administrativo de nivel A. Registrado íntegro en `IDENTITY_TABLE` dentro de
`src/app/lib/geo/provinceProfile.js`.

**CABA vs. Provincia de Buenos Aires** (Fase 20, verificación explícita pedida): son dos
jurisdicciones distintas en el modelo, con `type` distinto (`'CABA'` vs. `'PROVINCIA'`) y capital
distinta — la capital de la Provincia de Buenos Aires es **La Plata**, no CABA. El test
`tests/province-profile-model-check.mjs` verifica esto explícitamente (§8).

## 5. Geography — verificado, con distinción explícita de qué representa cada coordenada

Cada `provinceProfile.geography` incluye `coordinateMeaning: 'centroide_geometrico_provincial'`
— una aclaración explícita (pedida en la Fase 4 de la consigna) de que la latitud/longitud
**no** es la capital, **no** es una estación meteorológica y **no** es la ubicación de ninguna
persona usuaria. Es el mismo centroide que ya usa `PROVINCE_LOCATIONS` desde la Fase 11, ahora
etiquetado explícitamente en el modelo para que un futuro consumidor de la ficha no lo confunda
con otro tipo de coordenada.

No se investigó superficie provincial — no aporta valor real para el propósito de la ficha
(criterio explícito de la Fase 4: "solamente si aporta valor real") y no estaba entre los datos
que Loop 3A pedía priorizar.

## 6. Mapa — sin investigación nueva, reutilización confirmada

La geometría SVG (IGN/georef-ar-api, licencia de datos pendiente de confirmar antes de
redistribuir según ya documenta `03_GEO.md`) ya existe completa para las 24 jurisdicciones desde
la Fase 8A. `provinceProfile.map` no copia esa geometría — guarda una referencia (`provinceId`) al
mismo dataset. No se descargó ningún mapa nuevo, no se investigó ninguna fuente geoespacial
adicional (innecesario: la Fase 5 de la consigna pedía justamente evitar eso si ya existe
infraestructura reutilizable, y la hay).

## 7. Climatología — lo que se encontró y lo que no

Se investigó activamente (no se asumió directamente `PARTIAL_RESEARCH` sin buscar), priorizando
SMN → INTA → IGN → INDEC/ANIDA → universidades/CONICET, en ese orden:

| Fuente investigada | Resultado |
|---|---|
| SMN — Estadísticas Climatológicas Normales 1991-2020 (PDF, 105 estaciones) | Existencia y URL real verificadas; **el archivo excede 10MB**, el límite de la herramienta de lectura disponible en este entorno — no se pudo extraer ninguna cifra por estación. |
| SMN — nota "Cambios en las normales climatológicas del SMN" | **Leída directamente.** Única fuente climática con cifras reales verificadas en este loop (ver §8). |
| IGN — fascículo ANIDA "Clima en Argentina" (2014) | Existencia, autoría institucional y año verificados; contenido de texto/tablas no extraíble (PDF con mucho contenido gráfico) en esta sesión. |
| INTA — Atlas Climático Digital de la República Argentina (Bianchi & Cravero, 2010) | Título/autoría/año corroborados por búsqueda; contenido no leído directamente. |
| Capa GIS Köppen INDEC/ANIDA (ya verificada en Fase 7, `21_GEO_CLIMATE_RESEARCH.md`) | No se re-investigó (regla "no rehacer investigaciones cerradas") — sigue sin poder determinarse el tipo predominante por provincia sin herramientas de análisis geoespacial, no disponibles en este entorno. |
| INTA — heladas por deciles (climayagua.inta.gob.ar) | No reintentado — ya documentado como bloqueado por acceso de dominio en `TODO.md` (Fase 21_GEO_CLIMATE_RESEARCH). |

**Conclusión honesta**: la climatología de referencia por provincia sigue, para la enorme mayoría
de las 24 jurisdicciones y de los campos posibles (temperatura media, precipitación anual,
clasificación Köppen, heladas), en estado `PENDING_RESEARCH` — no por falta de intento, sino
porque las fuentes primarias existen pero no son procesables con las herramientas disponibles en
este entorno (PDF de 105 estaciones demasiado grande; capa GIS requiere software de análisis
espacial). Esto es consistente con el gate `PARTIAL_RESEARCH` que el proyecto ya documentaba desde
antes de este loop (`04_CLIMATE.md`) — este loop no lo resuelve, pero deja registrado con
precisión *por qué* no se resuelve todavía y *qué* se necesitaría (extracción manual del PDF de
SMN, o acceso a una herramienta GIS).

## 8. Los 3 datos climáticos reales que sí se incorporaron

La nota oficial del SMN "Cambios en las normales climatológicas del SMN" (leída directamente) dio
tres hechos verificables y citables — todos son **cambios entre dos normales climatológicas**
(1981-2010 vs. 1991-2020), es decir, una tendencia, nunca una precipitación o temperatura anual
absoluta:

1. **Temperatura media anual, país completo**: 16.1°C (1981-2010) → 16.3°C (1991-2020). Se asignó
   únicamente a `ArgentinaProfile` — nunca a ninguna provincia (sería, literalmente, "usar un
   promedio nacional engañoso para representar cualquier provincia", lo que la Fase 18 de la
   consigna prohíbe explícitamente).
2. **Córdoba**: "secamiento cercano al 7.5%" — pero la fuente lo atribuye textualmente al **norte**
   de la provincia, no a toda su superficie. Se registró con esa aclaración explícita en `notes`.
3. **Mendoza y Entre Ríos**: aumento de precipitación de "entre un 8 y un 9%" — se registró el
   punto medio (8.5%) para ambas, con nota de que la fuente da un rango, no un valor puntual.

Los tres tienen `evidenceLevel: 'A'` (fuente oficial primaria, SMN) y `sourceId` real
(`oficial-smn-normales-1991-2020-cambios`).

## 9. Clima vs. tiempo — separación aplicada

Ningún dato de `fetchProvinceWeather` (pronóstico en vivo, Open-Meteo) se copió al modelo
`provinceProfile`. Son tipos de dato distintos por diseño (climatología de referencia vs. tiempo
operativo, tal como pedía la Fase 7 de la consigna) — mezclar "hoy hacen 17°C" con climatología
habría sido exactamente el error que la consigna pedía evitar. Mi Cultivo sigue siendo el único
consumidor de `fetchProvinceWeather`, sin cambios.

## 10. Fotoperiodo — implementado (código real, no solo diseño)

Implementado en `src/app/lib/geo/photoperiod.js`. Metodología:

1. **Declinación solar**: aproximación de Fourier de **Spencer (1971)**, la fórmula de 7 términos
   más citada en la literatura de geometría solar (error máximo documentado ~0.28°). Fórmula
   completa (grados → radianes) implementada y comentada en el código.
2. **Ángulo horario de salida/puesta de sol y duración del día**: geometría solar estándar
   (`duración = (24/π) · arccos(-tan(latitud)·tan(declinación))`), atribuida por convención a
   **Cooper (1969)** pero reproducida idénticamente en cualquier texto de ingeniería solar — no es
   una fórmula controvertida ni exclusiva.

**Supuestos y límites documentados en el propio código** (pedido explícito de la Fase 8):
- Ignora refracción atmosférica y el radio aparente del disco solar (diferencia típica: pocos
  minutos) — calcula duración de luz solar geométrica, no la definición civil exacta de
  amanecer/atardecer.
- **No calcula hora civil de amanecer/atardecer** — eso requeriría además longitud, huso horario
  (ART, UTC-3 fijo sin horario de verano desde 2009) y la ecuación del tiempo; se dejó
  explícitamente fuera de este loop porque no se pudo verificar la precisión de esa parte contra
  una referencia confiable en este entorno (ver limitaciones, §15) — mejor no implementarlo que
  implementarlo sin poder verificarlo.
- Ignora elevación del terreno y obstrucciones locales del horizonte.
- Años bisiestos: manejados correctamente por `Date` nativo de JavaScript (día del año real, no
  un cálculo manual propenso a error).
- Nivel de evidencia: **D** (cálculo documentado, determinista, nunca presentado como medición).

**Datos disponibles**: `light` de cada `provinceProfile` incluye un `DataPoint` real
(`day_length_hours`) para la fecha en que se genera el perfil, usando la latitud ya verificada de
esa provincia. **Verificado con sentido físico real** (no solo que el código corra sin error): en
diciembre (verano austral), Tierra del Fuego tiene más horas de luz que Jujuy; en junio (invierno
austral), menos — y la amplitud estacional de Jujuy (cerca del trópico) es menor que la de Tierra
del Fuego (mucho más al sur), exactamente lo que predice la astronomía. Estas cuatro relaciones se
verifican automáticamente en `tests/province-profile-model-check.mjs`.

## 11. Estacionalidad

No se agregó ningún dato nuevo de estacionalidad más allá de lo que ya existe (macrorregión +
fotoperiodo). Heladas por deciles y estacionalidad de precipitación siguen bloqueadas por las
mismas razones que la climatología general (§7) — no se investigó de nuevo por separado, sería
repetir el mismo bloqueo ya documentado.

## 12. Cultivo — nada respaldado, y por qué

Se buscó explícitamente si existía alguna fuente (argentina o internacional) que diera una
"ventana orientativa" de alguna etapa de *Cannabis sativa* **por provincia argentina** — no se
encontró ninguna. Lo que existe en el registro de fuentes del proyecto (Hesami et al. 2023, Latif
et al. 2025, etc., ya citadas en `germinacion`/`cultivo-en-secuencia`/`cosecha-y-maduracion`) son
estudios de variedades/condiciones experimentales puntuales, no climatología argentina aplicada a
ventanas de cultivo. Generalizar esos estudios a "ventana orientativa para tal provincia" habría
sido exactamente la "receta universal" que la consigna prohíbe. Las dos entradas de
`cultivation` en `provinceProfile` (`stage_window_germinacion`, `harvest_window`) quedan
`PENDING_RESEARCH` para las 24 jurisdicciones, con la razón documentada en el propio dato
(`notes`).

## 13. Cosecha — mismo criterio

No se estableció ninguna fecha ni ventana de cosecha por provincia. Los criterios de maduración ya
documentados en la entrada `cosecha-y-maduracion` (color de tricomas, gradiente continuo) siguen
siendo los únicos criterios reales del Atlas — la Ficha Provincial, cuando tenga datos, debería
mostrar **estacionalidad + condiciones ambientales**, nunca una fecha, tal como especifica
`50_FICHA_PROVINCIAL_ATLAS.md` §13. Hoy no hay ningún dato de estacionalidad de cosecha por
provincia respaldado, así que el campo permanece vacío.

## 14. Contradicciones y datos no asignables

No se encontraron dos fuentes numéricas en conflicto sobre el mismo dato en este loop (la única
fuente climática con cifras reales, el aviso del SMN, no tiene ningún duplicado contradictorio
consultado). Sí apareció un caso de **dato real pero no asignable con precisión**, documentado en
vez de forzado:

- La nota del SMN menciona "el oeste del NOA" con un secamiento del 7.5% — el proyecto agrupa 6
  provincias bajo NOA (Jujuy, Salta, Catamarca, Tucumán, Santiago del Estero, La Rioja) y la fuente
  no especifica a cuáles corresponde "oeste" con precisión suficiente para atribuirlo a una
  jurisdicción sin adivinar. **Decisión**: no se creó ningún `DataPoint` para esto — ni para una
  provincia puntual ni para las 6 repartido por igual (sería inventar una distribución que la
  fuente no da). Queda documentado acá como hallazgo real, no perdido, pero no incorporado al
  modelo.

## 15. Limitaciones

- Climatología de referencia (temperatura/precipitación/Köppen) sigue `PENDING_RESEARCH` para 21
  de las 24 jurisdicciones en el campo de precipitación, y para las 24 en temperatura media y
  clasificación Köppen — requiere extracción manual del PDF de 105 estaciones del SMN (>10MB, no
  procesable automáticamente en este entorno) o acceso a herramientas GIS para la capa Köppen.
- Heladas por deciles: sigue bloqueado por acceso a dominio INTA, sin cambios desde
  `21_GEO_CLIMATE_RESEARCH.md`.
- Fotoperiodo: implementado y verificado en duración del día; hora civil de amanecer/atardecer
  **no** implementada (ver §10) — decisión deliberada, no un olvido.
- Cultivo/Cosecha por provincia: sin ninguna fuente encontrada, para ninguna de las 24
  jurisdicciones — 100% `PENDING_RESEARCH`, documentado con la razón exacta en cada dato.
- El hallazgo de "oeste del NOA" (§14) queda sin asignar — recuperable en una fase futura si se
  consigue el mapa/informe completo del SMN con el detalle regional exacto.

## 16. Datos pendientes (para investigación futura, no para Loop 3C)

1. Extracción manual del PDF de 105 estaciones SMN (temperatura/precipitación por estación →
   asignar a la provincia de cada estación).
2. Análisis geoespacial de la capa Köppen INDEC/ANIDA para determinar tipo(s) predominante(s) por
   provincia.
3. Lectura completa del fascículo IGN/ANIDA "Clima en Argentina" y del Atlas Climático Digital
   INTA 2010 (ambos ya identificados, ninguno leído en profundidad).
4. Resolución del dato "oeste del NOA" con una fuente que dé el detalle geográfico exacto.
5. Cualquier fuente específica de *Cannabis sativa* con ventanas de cultivo por región argentina
   (no encontrada en este loop).

## 17. Modelo de datos — `provinceProfile` y `ArgentinaProfile`

Implementados en `src/app/lib/geo/provinceProfile.js`:

- `getProvinceProfile(provinceId)` → objeto con `identity/geography/map/environment/light/cultivation/sources/metadata`,
  o `null` si el id no existe (nunca lanza una excepción sobre un id desconocido).
- `getArgentinaProfile()` → mismo esquema, para el estado sin provincia seleccionada
  (`50_FICHA_PROVINCIAL_ATLAS.md` §8). Su único dato de `environment` es la temperatura media
  **nacional**, con una nota explícita de que no debe usarse para representar ninguna provincia.
- `getAllProvinceIds()` → las 24 claves (para iterar, ej. en una futura página de índice).
- `ENTRY_FOCUS` → tabla estática de qué bloque(s) prioriza cada una de las 7 entradas editoriales
  (Fase 12/19 de `50_...md`), incluida la regla de que `marco-editorial` no muestra
  ambiente/cultivo.

Cada `DataPoint` (dentro de `environment`/`light`/`cultivation`) sigue exactamente la forma
`{ key, value, unit, period, sourceId, evidenceLevel, availability, notes }` especificada en
`50_FICHA_PROVINCIAL_ATLAS.md` §16 — sin adaptaciones.

## 18. Matriz de las 24 jurisdicciones

`IDENTITY`/`MAP`: **AVAILABLE** para las 24 (datos ya existentes + verificación georef-ar-api).
`LIGHT`: **AVAILABLE** para las 24 (cálculo determinista sobre latitud ya verificada).
`SOURCES`: no vacío para ninguna (todas tienen al menos la fuente de `identity` y `light`).

| Jurisdicción | CLIMATE (environment) | CULTIVATION | STATUS general |
|---|---|---|---|
| Buenos Aires | PENDING_RESEARCH | PENDING_RESEARCH | Parcial (identity/map/light OK) |
| CABA | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Catamarca | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Chaco | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Chubut | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Córdoba | **AVAILABLE parcial** (tendencia de precipitación, solo norte) | PENDING_RESEARCH | Parcial, con 1 dato real |
| Corrientes | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Entre Ríos | **AVAILABLE** (tendencia de precipitación) | PENDING_RESEARCH | Parcial, con 1 dato real |
| Formosa | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Jujuy | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| La Pampa | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| La Rioja | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Mendoza | **AVAILABLE** (tendencia de precipitación) | PENDING_RESEARCH | Parcial, con 1 dato real |
| Misiones | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Neuquén | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Río Negro | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Salta | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| San Juan | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| San Luis | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Santa Cruz | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Santa Fe | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Santiago del Estero | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Tucumán | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |
| Tierra del Fuego | PENDING_RESEARCH | PENDING_RESEARCH | Parcial |

Las 24 jurisdicciones están **presentes y completas en identity/geography/map/light** — ninguna
omitida, ninguna duplicada (verificado automáticamente, ver §19). Ninguna tiene todavía
`cultivation` disponible — resultado esperado y documentado (§12), no un error.

## 19. Verificación

- `npm run build`: limpio, mismas 9 rutas (el modelo nuevo es una librería sin UI, no agrega
  ninguna ruta).
- `tests/provincial-context-audit.mjs` (Fase 47.2, **sin modificar**): 1280/1280 — confirma que
  nada de este loop rompió la contextualización provincial existente ni ninguna otra superficie.
- `tests/province-profile-model-check.mjs` (nuevo, pequeño y específico — Fase 23 de la consigna):
  **506/506 verificaciones en verde**, cubriendo: las 24 jurisdicciones generan un perfil válido
  con las 8 claves requeridas; 24 códigos INDEC únicos; CABA nunca se confunde con la Provincia de
  Buenos Aires; todo `DataPoint` marcado `AVAILABLE` tiene un `sourceId` que existe de verdad en
  `editorial/sources.js` (nunca uno inventado); `ArgentinaProfile` no resalta ninguna provincia en
  el mapa y su dato de temperatura está marcado explícitamente como nacional; y las 4 relaciones
  físicas esperables del cálculo de fotoperiodo (más luz en el sur en verano, menos en invierno,
  menor amplitud estacional cerca del trópico). Se corre con:
  `node --import ./tests/_register-ext-loader.mjs tests/province-profile-model-check.mjs`
  (el archivo `_ext-resolver-loader.mjs`/`_register-ext-loader.mjs` es un loader mínimo, sin
  dependencias nuevas, que le permite a Node puro resolver los imports sin extensión que ya usa el
  resto del proyecto — no cambia ningún archivo de la aplicación).

## 20. Seguridad y privacidad

No se tocó Supabase, Auth, RLS, Storage, Mi Cultivo ni Chatbot. `provinceProfile` no lee
`localStorage` ni ninguna sesión — es una función pura que recibe un `provinceId` y devuelve datos
públicos derivados de fuentes ya verificadas. Ningún dato de coordenada baja de la resolución de
"centroide provincial" (nunca GPS, nunca dirección, nunca ubicación de una persona).

## 21. Preparación para Loop 3C

Con este loop, el componente visual de la Ficha Provincial (pendiente, Loop 3C) ya tiene:
- Una función (`getProvinceProfile`) que devuelve todo lo que un componente necesitaría renderizar,
  sin que el componente tenga que saber de dónde sale cada dato.
- Un fallback (`getArgentinaProfile`) ya resuelto para el estado sin provincia.
- Un cálculo de fotoperiodo real y verificado para el bloque Luz.
- Una tabla de énfasis por entrada (`ENTRY_FOCUS`) lista para decidir qué bloque destacar.
- Bloques de Ambiente/Cultivo mayormente vacíos (`PENDING_RESEARCH`) — el componente de 3C deberá
  implementar la regla ya especificada en `50_...md` §14: nunca renderizar un campo en ese estado,
  nunca mostrar el texto "sin datos".

## 22. Archivos

**Nuevos**: `src/app/lib/geo/photoperiod.js`, `src/app/lib/geo/provinceProfile.js`,
`tests/province-profile-model-check.mjs`, `tests/_ext-resolver-loader.mjs`,
`tests/_register-ext-loader.mjs`, `MASTER_PACKAGE/51_LOOP_3B_PROVINCIAL_DATA.md`.
**Modificados**: `src/app/lib/editorial/sources.js` (7 fuentes nuevas).
**Sin cambios**: cualquier entrada editorial, componentes de UI, `GeoSelector`, contextualización
provincial existente, Mi Cultivo, Chatbot, Supabase/Auth/RLS/Storage.

**LOOP 3B TERMINADO. No se construyó la Ficha Provincial visual. No se inventó ningún dato
climático, de cultivo ni de cosecha. No se inició el Loop 3C.**
