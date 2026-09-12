# 53 — Loop 4: investigación ambiental y fenológica provincial

Reemplaza, donde hay evidencia real, los estados `PENDING_RESEARCH` de la Ficha Provincial
(`provinceProfile.js`) por datos argentinos verificables. No se inventó ningún valor; donde la
investigación no encontró una fuente suficiente, el campo permanece `PENDING_RESEARCH` con la
razón documentada.

## 1. Objetivo

Mejorar la cobertura real de Ambiente/Cultivo/Cosecha de las 24 jurisdicciones sin bajar el
estándar de evidencia ya establecido en los loops 3B/3C, priorizando calidad de dato sobre
cantidad de campos completados.

## 2. Metodología

Prioridad de fuentes seguida: SMN → INTA → IGN → INDEC/ANIDA → organismos provinciales →
universidades nacionales → publicaciones científicas argentinas, exactamente como pedía la
consigna. Para cada hallazgo se exigió poder responder las 5 preguntas de la "regla de
incorporación": ¿de dónde salió?, ¿de qué período es?, ¿a qué escala aplica?, ¿qué representa?,
¿qué NO representa? — si alguna quedaba sin respuesta, el dato se dejó en `PENDING_RESEARCH` en
vez de forzarlo.

Cambio de método respecto de loops anteriores: en vez de intentar leer el PDF grande de 105
estaciones del SMN otra vez, se buscó explícitamente una **versión en dataset/API** — eso fue lo
que llevó al hallazgo central de este loop (§4).

## 3. Fuentes consultadas

Ver tabla completa en `19_SOURCE_REGISTRY.md` (sección "Loop 4") y los 3 registros nuevos en
`editorial/sources.js`. Resumen:

| Fuente | Resultado |
|---|---|
| `datos.gob.ar` (API de datos abiertos, organización SMN) | **Hallazgo central**: catálogo real de datasets SMN en formato descargable (no solo PDF) |
| SMN — Listado de Estaciones Meteorológicas (ZIP/TXT) | **Descargado y parseado directamente** — 118 estaciones, provincia real de cada una |
| INDEC/IGN (ANIDA) — capa WFS "Tipos de climas" | **Consultada en vivo** (WFS GetFeature, GeoJSON) — 16 geometrías reales de tipo climático |
| SMN — PDF de 105 estaciones con normales 1991-2020 | Reintentado: sigue excediendo 10MB, no procesable |
| `climayagua.inta.gob.ar` (heladas INTA) | Reintentado: conexión rechazada (mismo bloqueo ya documentado) |
| Atlas Climático Digital INTA 2010 / fascículo IGN "Clima en Argentina" | No releídos en profundidad en este loop (ya identificados en el Loop 3B, sin cambio de estado) |
| Tabaco (*Nicotiana tabacum*) como 2ª especie de referencia fenológica | Investigado y **descartado con evidencia científica** (§7) |
| SMN — datasets "temperatura últimos 365 días", "temperaturas extremas diarias" | Encontrados y descargables, pero **descartados a propósito** por ser tiempo reciente, no climatología (§5) |

## 4. Datos encontrados e incorporados

### 4.1 Cantidad de estaciones SMN por provincia (nuevo)

Descargado el ZIP oficial (`ssl.smn.gob.ar/dpd/zipopendata.php?dato=estaciones`), descomprimido y
parseado (formato de ancho fijo, 118 filas). Las 24 jurisdicciones tienen al menos 1 estación:

| Provincia | Estaciones | Provincia | Estaciones |
|---|---|---|---|
| Buenos Aires | 26 | Neuquén | 2 |
| Córdoba | 9 | Formosa | 2 |
| Santa Cruz | 7 | Chaco | 2 |
| Santa Fe | 7 | Catamarca | 2 |
| Mendoza | 6 | San Juan | 2 |
| Chubut | 5 | CABA | 2 |
| Corrientes | 5 | Santiago del Estero | 2 |
| Río Negro | 5 | Tierra del Fuego | 2 |
| Salta | 5 | Tucumán | 1 |
| La Rioja | 4 | | |
| Misiones | 4 | | |
| Entre Ríos | 3 | | |
| Jujuy | 3 | | |
| La Pampa | 3 | | |
| San Luis | 3 | | |

No es un valor climático — es un dato de cobertura de la red de observación (nivel A, oficial),
útil para entender qué tan densa o escasa es la infraestructura de medición real de cada
jurisdicción (Tucumán, con 1 sola estación, es el caso más limitado).

### 4.2 Clasificación climática oficial en el centroide de cada provincia (nuevo)

**Este es el avance más significativo del loop.** La capa GIS oficial "Tipos de climas" de
IGN/INDEC (ANIDA) — ya identificada como fuente Köppen verificada desde el Loop 3B, pero sin poder
determinar el tipo por provincia por falta de herramientas GIS — se consultó en vivo vía su
servicio WFS (`GetFeature`, formato GeoJSON, EPSG:4326) y se obtuvieron las 16 geometrías reales
de tipo climático (clasificación propia IGN/INDEC en español, 4 grupos: Frío/Templado/Cálido/Árido).
Se implementó un algoritmo de punto-en-polígono (ray casting, sin librerías externas) y se calculó,
para cada una de las 24 jurisdicciones, qué tipo climático corresponde al mismo centroide
geométrico ya usado en `PROVINCE_LOCATIONS` desde la Fase 11:

| Provincia | Clasificación (centroide) | Provincia | Clasificación (centroide) |
|---|---|---|---|
| Jujuy | Cálido / Subtropical Serrano | San Luis | Templado / De transición |
| Salta | Cálido / Subtropical Serrano | Buenos Aires | Templado / Pampeano |
| Tucumán | Cálido / Subtropical Serrano | CABA | Templado / Pampeano |
| Catamarca | Árido / De sierras y campos | La Pampa | Templado / De transición |
| La Rioja | Árido / De sierras y campos | Neuquén | Árido / Patagónico |
| Santiago del Estero | Cálido / Subtropical con Estación Seca | Río Negro | Árido / Patagónico |
| Formosa | Cálido / Subtropical con Estación Seca | Chubut | Árido / Patagónico |
| Chaco | Cálido / Subtropical con Estación Seca | Santa Cruz | Árido / Patagónico |
| Santa Fe | Cálido / Subtropical con Estación Seca | Tierra del Fuego | Frío / Andes patagónico-fueguinos |
| Misiones | Cálido / Subtropical sin Estación Seca | Córdoba | Templado / Pampeano |
| Corrientes | Cálido / Subtropical sin Estación Seca | Entre Ríos | Templado / Pampeano |
| San Juan | Árido / De sierras y campos | Mendoza | Árido / De la estepa patagónica |

Las 24 jurisdicciones obtuvieron exactamente un resultado (sin ambigüedad de polígonos superpuestos
ni provincias sin match). Sanity check geográfico: los resultados son internamente coherentes con
conocimiento geográfico ya documentado en `03_GEO.md` (NEA subtropical con/sin estación seca según
cercanía atlántica, Patagonia árida, pampa templada, Tierra del Fuego fría).

**Limitación central, aplicada en el propio dato**: es la clasificación del **punto centroide**,
no de toda la superficie provincial. Cuatro provincias ya documentadas en `03_GEO.md` como
internamente heterogéneas (Mendoza, Salta, Jujuy, Buenos Aires) llevan una nota reforzada. El caso
más ilustrativo es **Mendoza**: su centroide geométrico cae en una zona árida esteparia del sur/este
de la provincia, no en el oasis cultivado cercano a la Cordillera donde vive la mayoría de su
población — exactamente el tipo de "falsa precisión provincial" que la consigna pedía evitar (§10
de la consigna de este loop).

### 4.3 Fenología: se mantiene la soja, se investigó y descartó el tabaco

Ver §7.

## 5. Datos descartados (encontrados, pero no incorporados a propósito)

- **Temperatura de los últimos 365 días** y **temperaturas extremas diarias** (datasets reales de
  `datos.gob.ar`/SMN, formato ZIP, confirmados descargables): son **tiempo reciente**, no
  climatología de referencia (normal de 30 años). Incorporarlos como "temperatura de la provincia"
  habría mezclado clima con tiempo — exactamente lo que la consigna prohíbe explícitamente
  (Objetivo 7 de la consigna: "no mezclar clima actual con climatología histórica"). Se decidió no
  usarlos para nada de `environment`, ni siquiera relabeled.
- **Tabaco como especie de referencia fenológica**: investigado y descartado con evidencia (§7).

## 6. Cobertura por provincia

Las 24 jurisdicciones mejoraron de forma pareja: cada una ganó 2 `DataPoint` reales nuevos en
`environment` (cantidad de estaciones + clasificación climática del centroide) que antes no
existían. Antes de este loop, solo 3 provincias (Córdoba, Mendoza, Entre Ríos) tenían algún dato
`AVAILABLE` en `environment`; ahora las 24 lo tienen. Ninguna provincia estaba "completamente
vacía" en sentido estricto (Luz y Cultivo/Cosecha ya tenían datos desde el Loop 3C) — la mejora de
este loop es específicamente el bloque Ambiente.

## 7. Referencias biológicas: se evaluó una alternativa y se descartó

Se investigó si el **tabaco** (*Nicotiana tabacum*) podía sumarse como segunda especie de
referencia fenológica para las provincias donde realmente se cultiva (Jujuy, Salta, Tucumán, Chaco,
Catamarca, Misiones, Corrientes — confirmado por una fuente oficial del Ministerio de Agricultura,
Ganadería y Pesca), dado que también es una de las dos especies originales con las que Garner y
Allard describieron el fotoperiodismo en 1920.

**Resultado: se descartó, con evidencia científica directa.** Un paper de 2024 (Schmidt et al.,
*Frontiers in Plant Science*, leído en texto completo) demuestra que el tabaco **cultivado**
perdió, durante su domesticación/hibridación, la sensibilidad fotoperiódica de sus ancestros
silvestres — hoy tiene "comportamiento de floración día-neutro" (no depende del fotoperiodo para
florecer). Eso lo vuelve una referencia **más débil**, no mejor, que la soja para ilustrar una
respuesta de día corto comparable a Cannabis sativa, a pesar de cultivarse en regiones argentinas
relevantes. La soja se mantiene como única especie de referencia, sin cambios respecto del Loop
3C — la sustitución/adición no estaba justificada científicamente, tal como exigía la consigna.

## 8. Niveles de evidencia asignados en este loop

- **A** (fuente directa oficial): cantidad de estaciones SMN; clasificación climática del centroide
  (dato oficial + cálculo determinista, no una estimación editorial); tendencia de precipitación
  (ya existente desde el Loop 3B).
- **B**: no se incorporó ningún dato nuevo de este nivel en este loop.
- **C**: referencias fenológicas de Cultivo/Cosecha (sin cambios respecto del Loop 3C — se
  investigó una alternativa y se descartó, ver §7).
- **D**: fotoperiodo (sin cambios respecto del Loop 3B).
- **E**: temperatura media anual, precipitación anual absoluta, heladas — siguen pendientes en las
  24 jurisdicciones, con la razón documentada en cada `DataPoint`.

Ningún dato C o D se elevó a A o B — verificado a mano y con los tests existentes (§10 de la
consigna de este loop, sin necesidad de un test nuevo: el test de Fase 3B ya valida que todo
`DataPoint` `AVAILABLE` tenga un `evidenceLevel` válido y un `sourceId` real).

## 9. Limitaciones

- La clasificación climática es del centroide geométrico, no de toda la superficie — documentado
  en el propio dato (`limitation`) y reforzado para las 4 provincias ya conocidas como
  heterogéneas.
- Temperatura media y precipitación absoluta siguen sin resolver para las 24 jurisdicciones — el
  único dataset accesible y procesable (estaciones + WFS Köppen) no contiene esos valores; el que
  sí los contiene (normales SMN) sigue sin una versión descargable liviana.
- Heladas: sigue bloqueado, mismo dominio INTA inaccesible ya documentado en fases anteriores.
- La licencia de la capa WFS de IGN/INDEC sigue figurando "Not Specified" — se citó el resultado
  de la clasificación con atribución completa, sin redistribuir el archivo/capa original.

## 10. Problemas de escala

Exactamente el punto que pedía evitar la consigna ("1 provincia = 1 clima"): Mendoza es el caso más
claro de que un centroide geométrico puede caer en una zona climáticamente no representativa del
grueso de la actividad/población de la provincia. Se optó por **mostrar el dato con la limitación
explícita** en vez de ocultarlo o de intentar "corregirlo" manualmente eligiendo otro punto
arbitrario — cambiar el punto de referencia sin metodología habría sido menos trazable, no más
preciso.

## 11. Pendientes

1. Temperatura media y precipitación anual absoluta por provincia — requiere extracción manual del
   PDF de 105 estaciones del SMN (still >10MB) o acceso a una herramienta que lo procese.
2. Heladas — sigue bloqueado por el mismo dominio INTA inaccesible.
3. Evidencia A/B específica de Cannabis sativa para Cultivo/Cosecha por provincia — no encontrada,
   ni en este loop ni en el anterior; sigue dependiendo de investigación futura dedicada.
4. Posible refinamiento de la clasificación climática usando más de un punto por provincia (ej. la
   zona de mayor densidad poblacional o de mayor superficie cultivada) en vez de solo el centroide
   — identificado como mejora futura, no implementado acá (cambiaría la metodología, que hoy es
   consistente y documentada para las 24).

## 12. Decisiones

1. Se buscó explícitamente una alternativa liviana al PDF grande de SMN (dataset/API) en vez de
   reintentar la misma extracción fallida — esa búsqueda fue la que abrió el hallazgo del loop.
2. Se resolvió la clasificación climática por cálculo propio (punto-en-polígono) en vez de esperar
   una fuente secundaria que ya la tuviera tabulada por provincia — mayor trazabilidad, mismo nivel
   de evidencia A que citar una tabla ajena, y sin depender de que esa tabla exista.
3. Se decidió NO usar los datasets de temperatura de corto plazo (365 días) como sustituto de
   climatología, aunque estaban técnicamente disponibles — prioriza la separación clima/tiempo por
   sobre completar el campo.
4. Se investigó una especie de referencia adicional (tabaco) y se descartó con evidencia — la
   consigna pedía justificar tanto agregar como no agregar, y ambas decisiones quedan documentadas.
5. No se tocó `ProvinceProfileCard.js` ni el resto de la UI — los nuevos `DataPoint` fluyen
   automáticamente a través del mismo renderizado ya construido en el Loop 3C (bloques que antes
   estaban vacíos para 21 provincias ahora muestran contenido real, sin ningún cambio de código de
   presentación).

## 13. Auditoría de evidencia — matriz de las 24 jurisdicciones

Niveles: A (oficial directo) · B (científico/agronómico argentino aplicable) · C (referencia
fenológica comparable) · D (cálculo derivado) · E (pendiente).

| Provincia | Clima (centroide) | Precipitación | Temperatura | Heladas | Fotoperiodo | Cultivo | Cosecha |
|---|---|---|---|---|---|---|---|
| Buenos Aires | A | E | E | E | D | C | C |
| CABA | A | E | E | E | D | C | C |
| Catamarca | A | E | E | E | D | C | C |
| Chaco | A | E | E | E | D | C | C |
| Chubut | A | E | E | E | D | C | C |
| Córdoba | A | **A** (tendencia, norte) | E | E | D | C | C |
| Corrientes | A | E | E | E | D | C | C |
| Entre Ríos | A | **A** (tendencia) | E | E | D | C | C |
| Formosa | A | E | E | E | D | C | C |
| Jujuy | A | E | E | E | D | C | C |
| La Pampa | A | E | E | E | D | C | C |
| La Rioja | A | E | E | E | D | C | C |
| Mendoza | A | **A** (tendencia) | E | E | D | C | C |
| Misiones | A | E | E | E | D | C | C |
| Neuquén | A | E | E | E | D | C | C |
| Río Negro | A | E | E | E | D | C | C |
| Salta | A | E | E | E | D | C | C |
| San Juan | A | E | E | E | D | C | C |
| San Luis | A | E | E | E | D | C | C |
| Santa Cruz | A | E | E | E | D | C | C |
| Santa Fe | A | E | E | E | D | C | C |
| Santiago del Estero | A | E | E | E | D | C | C |
| Tierra del Fuego | A | E | E | E | D | C | C |
| Tucumán | A | E | E | E | D | C | C |

Este loop cambió la columna **Clima** de E→A en las 24 filas (antes ninguna tenía clasificación
climática resuelta) y no cambió Precipitación/Temperatura/Heladas/Fotoperiodo/Cultivo/Cosecha más
allá de lo ya establecido en loops anteriores.

## 14. Archivos

**Modificados**: `src/app/lib/geo/provinceProfile.js` (2 `DataPoint` nuevos por provincia:
`smn_station_count`, `climate_classification_centroid`), `src/app/lib/editorial/sources.js` (3
fuentes nuevas), `MASTER_PACKAGE/19_SOURCE_REGISTRY.md` (espejo de esas 3 fuentes).
**Nuevo**: `MASTER_PACKAGE/53_LOOP_4_ENVIRONMENTAL_RESEARCH.md`.
**Sin cambios**: `ProvinceProfileCard.js` (ni ningún otro componente de UI), `photoperiod.js`,
arquitectura de Home/Mi Cultivo/Chatbot, Supabase/Auth/RLS/Storage.

**LOOP 4 TERMINADO. No se inició el Loop 5.**
