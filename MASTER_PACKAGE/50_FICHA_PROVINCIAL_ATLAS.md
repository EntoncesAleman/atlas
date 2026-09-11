# 50 — Ficha Provincial del Atlas: diseño y especificación (Loop 3A)

Loop de **diseño y especificación**, no de implementación. Ningún dato climático, de luz ni de
cultivo nuevo se carga en este loop — se define la pieza, su modelo de datos y su integración con
lo que ya existe, para que un Loop 3B pueda implementarla incrementalmente sin inventar
arquitectura sobre la marcha.

## 1. Objetivo

Especificar una nueva pieza del Atlas — la **Ficha Provincial** — que acompañe cada entrada
editorial con una columna contextual que resuma, de forma trazable y honesta, en qué contexto
geográfico y ambiental se está leyendo esa entrada. No se implementa el componente completo ni se
cargan datos: se deja documentado qué debe existir, de dónde sale cada dato, y qué falta.

## 2. Problema que resuelve

Hoy, dentro de una entrada del Atlas, la única señal de "dónde estás leyendo esto" es el bloque
"Contexto de tu zona" al final del cuerpo (`ProvinceContextPanel`, Fase 47.2) — un párrafo de
texto corto, sin jerarquía visual propia, sin mapa, sin distinguir tipos de dato (geografía vs.
ambiente vs. luz vs. cultivo), y sin ningún lugar donde mostrar fuentes por dato. La Ficha
Provincial no reemplaza ese panel — lo absorbe como uno de sus bloques (ver §20) y le da un lugar
permanente, visible desde que se entra a la página, no solo al final del texto.

## 3. Concepto UX

> Una columna contextual, al costado de la entrada editorial, que responde: **"¿en qué contexto
> geográfico estoy leyendo esto?"**

No es un infobox enciclopédico de datos generales de la provincia (eso ya lo hacen fuentes
externas) — es una ficha **orientada a lo que ese contexto significa para leer el Atlas**: mismo
principio editorial que ya rige el resto del sitio ("observar ≠ diagnosticar", "no convertir
información en receta"), aplicado a una pieza de UI en vez de a un párrafo.

Reglas de tono, heredadas del resto del Atlas:
- Nunca antropomorfiza el clima ni la provincia ("tu provincia te dice que...").
- Nunca convierte un dato en instrucción ("regá cada 3 días").
- Siempre distingue dato observado de interpretación editorial (mismo principio que ya usan
  `signals`/`observations` en las entradas).

## 4. Estructura visual (conceptual, no wireframe literal)

Bloques, de arriba abajo:

1. **Encabezado de identidad** — nombre de provincia + badge de macrorregión (reutiliza
   `regionLabel` de `provinceContext.js`).
2. **Mapa** (§10) — contorno provincial, sin overlay climático.
3. **Geografía** — macrorregión, latitud aproximada, (futuro) zona/departamento si existe.
4. **Ambiente** — clima, hoy vacío/pendiente (§11).
5. **Luz** — latitud y fotoperiodo general, hoy parcial (§12).
6. **Cultivo** — vacío por diseño hasta que haya evidencia (§13).
7. **Contexto de tu zona** — el `ProvinceContextPanel` actual, reubicado acá como el bloque que
   conecta la ficha con la entrada específica que se está leyendo (ver §9 y §20).
8. **Fuentes de esta ficha** — lista de fuentes citadas en los bloques de arriba, con el mismo
   patrón que ya usa "Fuentes" al pie de la entrada, pero acotada a lo que la ficha mostró.

Cada bloque es independiente y puede no renderizar nada si no tiene datos disponibles (ver
"disponibilidad" en §14) — la ficha nunca fuerza los 8 bloques si 5 están vacíos.

## 5. Desktop

Reutiliza el grid de dos columnas que **ya existe** en `atlas/[category]/[entry]/page.js`
(`.atlas-entry-content-wrap`, `grid-template-columns: minmax(520px, 2fr) minmax(260px, 1fr)`,
`gap: 26px`, `align-items: start`). La Ficha Provincial se agrega como un bloque nuevo **dentro
del mismo `<aside class="atlas-entry-aside">`**, antes del bloque "Contenido relacionado" que ya
vive ahí — no se crea una tercera columna ni un segundo `<aside>`.

- Ancho: hereda el `minmax(260px, 1fr)` existente — no se propone un ancho especial.
- Sticky: **no** en la primera versión. El aside actual no usa `position: sticky` (verificado en
  `globals.css`) y la ficha va a ser más alta que el aside actual (mapa + varios bloques) — hacerla
  sticky en una entrada con mucho texto generaría un panel que "flota" incómodamente. Se documenta
  como decisión abierta a revisar en Loop 3B una vez que el contenido real (con mapa) permita medir
  la altura real.
- Separación visual entre bloques: mismo patrón que ya usa `.atlas-entry-section` (borde superior
  fino, `padding-top`), para que la ficha se sienta parte del mismo sistema visual, no un widget
  ajeno.

## 6. Tablet (768–980px aprox.)

El breakpoint existente en `globals.css` (`@media (max-width: 980px)`) ya colapsa
`.atlas-entry-content-wrap` a una sola columna (`grid-template-columns: 1fr`) — la Ficha
Provincial hereda ese comportamiento sin cambios: pasa a renderizarse **debajo** del contenido
editorial, a todo el ancho. No se propone un breakpoint intermedio nuevo ni un comportamiento de
acordeón en tablet — solo mobile lo necesita (§7).

## 7. Mobile (≤640px)

Un mapa provincial chico y una tabla de datos ambientales no funcionan en una columna de 360px de
ancho. Comportamiento propuesto:
- El bloque de **identidad** (nombre + macrorregión) se muestra siempre, sin colapsar — es la
  información mínima de orientación.
- Mapa, Geografía, Ambiente, Luz y Cultivo se agrupan en un **acordeón** (un bloque por sección,
  colapsado por defecto salvo el primero) en vez de mostrarse expandidos uno debajo del otro — evita
  que la ficha entera empuje el contenido editorial varias pantallas hacia abajo antes de que la
  persona llegue a leer la entrada.
- "Contexto de tu zona" **no** se colapsa — sigue siendo el puente directo con la entrada, y ya
  funciona bien hoy como bloque de texto simple (verificado en las 4 resoluciones de la Fase 47.2).
- El mapa nunca es más ancho que su contenedor (`max-width: 100%`) y tiene una altura máxima fija
  para no dominar la pantalla en mobile.

## 8. Comportamiento sin provincia seleccionada

Se reutiliza exactamente el patrón que ya usa `ProvinceContextPanel` (Fase 47.2): estado
`null`/hidratación antes de saber si hay provincia, luego `''` si no hay ninguna.

Decisión: **ficha nacional mínima**, no ficha vacía ni bloqueo de lectura.
- Encabezado: "Argentina" en vez de un nombre de provincia.
- Mapa: contorno completo del país (reutilizable de `ARGENTINA_PROVINCES`/`ARGENTINA_MAP_VIEWBOX`
  ya existentes en `lib/geo/argentinaProvinces.js` — el mismo SVG que ya arma `GeoSelector`, sin
  ningún provincia resaltada).
- Geografía/Ambiente/Luz/Cultivo: no se muestran (no hay nada nacional específico que decir en
  esos bloques sin caer en generalidades vacías) — en su lugar, un único bloque de invitación:
  "Elegí tu provincia en Home para ver el contexto de tu zona" con link a `/`.
- Fuentes: no se muestra el bloque de fuentes (no hay ningún dato citado).

Se descartó "ficha vacía contextual" (una ficha con 8 bloques todos en estado "sin datos" se lee
como una pantalla rota, no como una invitación) y "solo información geográfica nacional sin
invitación" (pierde la oportunidad de guiar a la acción que ya existe en Home). Nunca se rompe la
página: si `getProvinceGeoContext` devuelve `null`, la ficha cae directamente a este estado, igual
que ya hace `ProvinceContextPanel` hoy con su entrada.

## 9. Cambio de provincia

La ficha lee `localStorage['atlas:selectedProvince']` **exactamente** con el mismo patrón que
`ProvinceContextPanel` (hidratación en `useEffect`, sin duplicar la clave). No hay ningún mecanismo
de "push" entre pestañas/páginas hoy (ni lo tiene `ProvinceContextPanel`, ni lo tenía
`EnvironmentalPanel`) — el valor se relee cada vez que el componente se monta, es decir: cada vez
que se navega a una entrada. Cambiar de provincia en Home y volver a `/atlas/...` ya actualiza la
ficha sin recargar manualmente, porque es una navegación real de Next.js (nuevo montaje del árbol
de la página), no una SPA con estado global persistente entre rutas. No hace falta ningún
`storage`-event listener nuevo para este caso de uso — documentado como suficiente para la
navegación real del sitio, no para "dos pestañas abiertas al mismo tiempo" (caso no cubierto hoy
por ningún componente existente, fuera de alcance de este loop).

## 10. Mapa

**Reutilizar, no crear**: `lib/geo/argentinaProvinces.js` ya tiene la geometría real (SVG path por
provincia, verificada, fuente IGN/georef-ar-api) que usa `GeoSelector` en Home. La Ficha Provincial
no necesita un segundo dataset de mapas ni un asset por provincia — necesita un **modo de recorte**
del mismo SVG nacional: en vez de mostrar las 24 provincias con una resaltada (como en Home), la
ficha muestra **solo el `path` de la provincia seleccionada**, ajustando el `viewBox` a su `bbox`
(ya presente en cada entrada de `ARGENTINA_PROVINCES`, ej. `bbox: [145.2, 37.5, 251.1, 140.2]` para
Jujuy) — es un recorte de dato ya existente, no una investigación ni una descarga nueva.

- Formato: SVG (no GeoJSON, no imagen estática) — coherente con lo que ya existe, sin agregar
  ninguna librería de mapas.
- Estilo: un solo color de relleno (el mismo tono editorial del sitio), sin escala de colores, sin
  leyenda. Nada de overlay climático — el mapa comunica *dónde*, nunca *cómo está el clima ahí*.
- Departamento/zona: si en el futuro `atlas:selectedZone` tiene geometría propia, podría marcarse
  como un punto/resaltado dentro del contorno provincial — no hay esa geometría hoy (`zoneExamples`
  en `GeoSelector.js` son solo nombres, sin coordenadas), así que esto queda fuera de alcance y
  **no se implementa ni se investiga en este loop**.
- Fallback de accesibilidad: el mapa lleva `role="img"` + `aria-label` con el nombre de la
  provincia (mismo patrón que ya usa el SVG de `GeoSelector`) — el nombre de la provincia también
  aparece como texto en el encabezado de la ficha, así que ningún dato depende solo del mapa (ver
  §18).

## 11. Bloque Ambiente

Campos potenciales (ninguno cargado en este loop):

| Campo | Unidad | Período | Nivel de evidencia esperable |
|---|---|---|---|
| Clasificación climática (macrorregión editorial, ya existe) | — | — | ya disponible, no es climatología |
| Temperatura (normal histórica) | °C | ventana estacional | B (SMN) |
| Precipitación | mm | ventana estacional | B (SMN) |
| Humedad relativa | % | ventana estacional | B (SMN) |
| Heladas (primera/última, por deciles) | fecha | anual | D/E (INTA, acceso bloqueado — ver `TODO.md` `CLAUDE_RESEARCH_REQUIRED`) |
| Estacionalidad práctica | texto editorial | — | C (interpretación editorial sobre datos B) |

Estado real hoy: **todos pendientes**. La única pieza "ambiental" ya disponible es la
macrorregión (`provinceContext.js`, geográfica, no climática) y el clima **operativo** (pronóstico
en vivo de Open-Meteo, vía `fetchProvinceWeather`) — que es un tipo de dato distinto (momento
actual, no climatología de referencia, ver §16) y no debería mostrarse en este bloque sin
etiquetarlo aparte.

Comportamiento de estado (no textual, ver §14): cada campo tiene un estado interno
(`AVAILABLE` / `UNAVAILABLE` / `PENDING_RESEARCH`) que la UI traduce — nunca el string literal
"sin datos". Un campo en `PENDING_RESEARCH` simplemente no se renderiza en la v1 (mismo criterio
que ya sigue el resto del Atlas: no mostrar un placeholder que parezca un dato).

## 12. Bloque Luz

Ya hay un dato real y reutilizable: **latitud** (`PROVINCE_LOCATIONS`, `lib/weather/locations.js`,
Fase 11 — centroide oficial georef-ar-api). Es exactamente el mismo dato que ya usa
`provinceContext.js` para el texto de la entrada "Luz y fotoperiodo".

Campos potenciales para Loop 3B:

| Campo | Fuente propuesta | Nivel de evidencia |
|---|---|---|
| Latitud aproximada | `PROVINCE_LOCATIONS` (ya existe) | A (geográfico, ya verificado) |
| Duración del día en fecha actual | cálculo astronómico determinista a partir de latitud + fecha (ninguna librería nueva necesaria: fórmula estándar de declinación solar) | D (cálculo, no medición) — pero determinista y verificable, no una estimación arbitraria |
| Evolución anual del fotoperiodo (gráfico simple) | mismo cálculo, para las 12 fechas del año | D |
| Amanecer/atardecer | mismo cálculo + longitud (también en `PROVINCE_LOCATIONS`) | D |

Distinción explícita que la ficha debe mantener (pedida por la consigna): **geografía** (latitud,
dato) vs. **cálculo astronómico** (duración del día, derivado matemáticamente, no medido) vs.
**interpretación editorial** (lo que ya escribe `provinceContext.js`: "cuanto más al sur, mayor la
diferencia estacional..."). Los tres conviven en el bloque pero nunca se presentan con el mismo
peso visual — el cálculo astronómico se marca como tal, no como una medición.

No se implementa el cálculo en este loop (evitar convertir un loop de diseño en uno de
implementación) — se deja identificado como la pieza de menor esfuerzo/mayor valor para 3B, porque
no depende de ninguna fuente externa ni de investigación: es matemática determinista sobre un dato
que el proyecto ya tiene.

## 13. Bloque Cultivo

El bloque más sensible — la consigna es explícita en que no debe volverse un calendario rígido.
Modelo propuesto (una "tarjeta de ventana", no una fecha):

```
[ Etapa ]
Ventana orientativa: [rango o "sin evidencia suficiente"]
Factores que pueden modificarla: [lista corta, ej. "temperatura", "fotoperiodo natural"]
Qué observar: [link a la sección "Señales" de la entrada correspondiente, no un texto nuevo]
Nivel de evidencia: [interno, no mostrado como letra — ver §15]
```

Ningún campo de este bloque tiene datos hoy. Se define la forma, no el contenido. Regla dura para
3B: si no hay una fuente con nivel de evidencia A o B para una "ventana orientativa" concreta por
provincia, el bloque **no se muestra** para esa etapa — mejor un bloque ausente que uno relleno con
una estimación no marcada como tal.

## 14. Disponibilidad — estados internos (no textuales)

Cada dato de la ficha (en cualquier bloque) tiene uno de estos estados internos, siguiendo el
mismo espíritu que ya usa el registro de fuentes del proyecto (`VERIFICADO` / `UNVERIFIED` /
`TODO RESEARCH` en `sources.js` y `TODO.md`):

- `AVAILABLE` — hay valor, fuente y nivel de evidencia suficiente para mostrarlo.
- `UNAVAILABLE` — se investigó y no hay fuente confiable (ej. heladas por deciles, bloqueado hoy).
- `PENDING_RESEARCH` — todavía no se investigó ese campo para esa provincia.
- `NOT_APPLICABLE` — el campo no aplica a ese contexto (ej. "amanecer/atardecer" en el bloque de
  Ambiente, que no le corresponde).

La UI nunca traduce `UNAVAILABLE`/`PENDING_RESEARCH` como el texto "sin datos" (regla explícita de
la consigna) — la v1 simplemente **omite** el campo. Un estado "en investigación" visible de forma
sutil (no un texto que suene a error) queda como posible mejora de 3B, no obligatoria.

## 15. Evidencia y confianza

Escala interna (no visible como letra en la UI, pero sí en el modelo de datos y en el código):

| Nivel | Descripción | Ejemplo ya existente en el proyecto |
|---|---|---|
| A | Fuente oficial/primaria directa | Geometría de provincias (IGN/georef-ar-api) |
| B | Fuente académica revisada por pares | Papers ya citados en `sources.js` (type `SCIENTIFIC`) |
| C | Fuente institucional secundaria confiable | Notas oficiales tipo INTA (type `OFFICIAL`) |
| D | Estimación/cálculo documentado | Cálculo de fotoperiodo por latitud (§12) |
| E | Pendiente de verificación | Heladas INTA, dominio bloqueado (`TODO.md`) |

Regla dura: un dato de nivel D o E nunca se presenta tipográficamente igual que uno de nivel A/B —
en la práctica, esto ya lo resuelve el propio criterio de "no mostrar el campo si no hay evidencia
suficiente" (§14): los niveles D/E rara vez llegan a la UI, y cuando lo hacen (ej. el cálculo
astronómico de §12, D pero determinista) llevan una aclaración textual explícita ("cálculo, no
medición"), igual que ya hace el proyecto con las alertas por umbral de Mi Cultivo ("cálculo
propio, no oficiales").

## 16. Modelo de datos propuesto

```js
provinceProfile = {
  identity: {
    id: 'buenos-aires',           // mismo id que ya usa todo el proyecto
    name: 'Buenos Aires',         // derivado de PROVINCE_LOCATIONS
  },
  geography: {
    region: 'pampeana',           // derivado de provinceContext.js (ya existe)
    regionLabel: 'la región pampeana',
    latitude: -36.6774,           // derivado de PROVINCE_LOCATIONS (ya existe)
  },
  map: {
    provinceId: 'buenos-aires',   // referencia a ARGENTINA_PROVINCES, no una copia del path
  },
  environment: [
    // array de DataPoint (ver forma abajo) — vacío hoy
  ],
  light: [
    // array de DataPoint — hoy solo derivable de geography.latitude, sin cálculo implementado
  ],
  cultivation: [
    // array de DataPoint por etapa — vacío hoy
  ],
  sources: [
    // sourceId[] — reutiliza el mismo registro de editorial/sources.js, no uno nuevo
  ],
  metadata: {
    generatedAt: null,            // no aplica hasta que haya datos calculados en runtime (§12)
    lastReviewed: null,           // fecha editorial, como ya usan las entradas
  },
}

// Forma de cada dato individual (reutilizable en environment/light/cultivation):
DataPoint = {
  key: 'temperature_mean_summer',
  value: null,
  unit: null,                     // ej. '°C', 'mm', '%', 'h'
  period: null,                   // ej. 'verano', '1991-2020'
  sourceId: null,                 // id real de editorial/sources.js — nunca inventado
  evidenceLevel: null,            // 'A' | 'B' | 'C' | 'D' | 'E'
  availability: 'PENDING_RESEARCH', // ver §14
  notes: null,
}
```

Principio de no duplicación: `identity`/`geography`/`map` se **derivan** en el momento de
`PROVINCE_LOCATIONS` + `provinceContext.js` + `argentinaProvinces.js` — no se guarda una copia
paralela de esos datos en ningún archivo nuevo. Solo `environment`/`light`/`cultivation` son datos
genuinamente nuevos que hoy no existen en ningún lado del proyecto.

## 17. Datos existentes reutilizables (inventario)

| Dato | Ya existe en | Uso en la ficha |
|---|---|---|
| Nombre + id de provincia | `lib/weather/locations.js` (`PROVINCE_LOCATIONS`) | `identity` |
| Latitud/longitud | `lib/weather/locations.js` | `geography.latitude`, futuro cálculo de luz |
| Macrorregión + texto editorial de región | `lib/editorial/geo/provinceContext.js` (`getProvinceGeoContext`) | `geography.region`/`regionLabel` |
| Geometría SVG + bbox por provincia | `lib/geo/argentinaProvinces.js` (`ARGENTINA_PROVINCES`) | `map` |
| Contexto por entrada ya redactado | `lib/editorial/provinceContext.js` (`getEntryProvinceContext`) | Bloque "Contexto de tu zona" (reubicado, no reescrito) |
| Selección persistida | `localStorage['atlas:selectedProvince']` | Disparador de toda la ficha |
| Clima operativo (pronóstico en vivo) | `lib/weather/service.js` (`fetchProvinceWeather`) | **No** se reutiliza en Ambiente (es "momento actual", no climatología — ver §16); posible bloque separado y explícito en una fase futura, no en esta ficha |

## 18. Datos que faltan (para Loop 3B, no para ahora)

- Climatología de referencia por provincia (temperatura/precipitación/humedad) — sigue
  `PARTIAL_RESEARCH` (`04_CLIMATE.md`), no se resuelve en este loop.
- Heladas por deciles — bloqueado por acceso a dominio INTA (`TODO.md`).
- Cálculo de fotoperiodo/amanecer/atardecer — no bloqueado por fuente, solo no implementado
  todavía (identificado en §12 como la pieza de mayor valor/menor esfuerzo para 3B).
- Cualquier dato de "Cultivo" (ventanas, duración de etapas) — requiere fuente propia por etapa,
  no existe ninguna todavía.
- Geometría de zona/departamento — no existe (`zoneExamples` de `GeoSelector` son solo nombres).

## 19. Relación con la entrada actual

La ficha es **un solo componente reutilizable**, no siete. La priorización de bloques por entrada
se resuelve con una tabla de configuración estática (no siete componentes, no siete layouts):

```js
const ENTRY_FOCUS = {
  germinacion: ['environment'],
  'sustrato-y-drenaje': ['environment'],
  'luz-y-fotoperiodo': ['light'],
  'lectura-de-senales': ['environment'],
  'cultivo-en-secuencia': ['cultivation'],
  'cosecha-y-maduracion': ['cultivation', 'environment'],
  'marco-editorial': [], // nunca prioriza cultivo/ambiente — ver regla abajo
};
```

`ENTRY_FOCUS[entryId]` decide qué bloque se muestra expandido/primero en mobile (acordeón, §7) y
cuál se resalta levemente en desktop — pero **todos los bloques con datos disponibles siguen
existiendo** para cualquier entrada; esto solo cambia el orden/énfasis, nunca oculta información
real. Para `marco-editorial`, la regla es más fuerte que una simple prioridad: ese bloque de
Cultivo/Ambiente directamente **no se muestra**, porque mezclar contexto ambiental con una entrada
sobre marco legal podría leerse como si el Atlas estuviera dando una recomendación agronómica
dentro de una entrada legal — la ficha en `marco-editorial` se reduce a identidad + mapa +
geografía, nada más.

## 20. Relación con la contextualización provincial existente (Fase 47.2)

No se reemplaza nada. `ProvinceContextPanel` (componente) y `getEntryProvinceContext` (función)
**se reutilizan tal cual**, sin modificar su lógica ni su texto — la única propuesta de cambio
(para 3B, no para ahora) es de **ubicación**: hoy el panel vive al final del cuerpo del artículo;
la Ficha Provincial lo incorporaría como su último bloque, dentro del `<aside>`. Esto es un cambio
de layout (mover un componente ya existente a otro lugar del árbol), no de lógica ni de contenido
— y **no se implementa en este loop** (Fase 21 de la consigna pide preferir documentar antes que
tocar código de comportamiento existente).

## 21. Relación con el Panel Ambiental (Mi Cultivo)

| | Panel Ambiental (`EnvironmentalPanel.js`) | Ficha Provincial |
|---|---|---|
| Dónde vive | Componente huérfano, no importado en ninguna página hoy | Al costado de cada entrada del Atlas |
| Qué contexto | Clima **operativo** del cultivo de una persona (dato vivo, ligado a Mi Cultivo) | Contexto **geográfico/ambiental de referencia** de la provincia, para leer el Atlas |
| Dato base | Mismo `atlas:selectedProvince`/`atlas:selectedZone` | Mismo `atlas:selectedProvince` |
| Fuente de clima | `fetchProvinceWeather` (Open-Meteo, en vivo) | Climatología de referencia (futura, distinta fuente — SMN/normales, no pronóstico) |
| Datos privados | Si se revive, podría mostrar contexto ligado al cultivo del usuario | Nunca — ver §17 (Privacidad) |

No se crean dos sistemas de clima paralelos: si en el futuro se revive `EnvironmentalPanel` (sigue
pendiente desde el Patch 47.1, ver `TODO.md`), debería consumir el mismo servicio
(`fetchProvinceWeather`) que ya usa Mi Cultivo — la Ficha Provincial, en cambio, necesitaría una
fuente de **climatología histórica**, que es un tipo de dato distinto y todavía no existe en el
proyecto (§18). Ambos componentes pueden coexistir sin duplicar lógica porque responden preguntas
distintas: "¿cómo está el clima ahora, para mi cultivo?" vs. "¿cómo es, en general, esta zona, para
leer el Atlas?".

## 22. Privacidad

La Ficha Provincial nunca lee ni muestra: eventos de Mi Cultivo, fotos, notas, email/sesión del
usuario, ni ningún id interno de Supabase (`user_id`, `cultivo_id`, etc.). Su único dato de entrada
es `atlas:selectedProvince` (un id de provincia, no una ubicación precisa) — mismo principio de
minimización que ya rige `GeoSelector`/`PROVINCE_LOCATIONS` desde la Fase 11 (`10_PRIVACY.md`): la
resolución nunca baja de "provincia", nunca hay coordenadas propias de la persona ni GPS. La ficha
no necesita sesión iniciada — funciona igual para un visitante anónimo que para alguien con cuenta.

## 23. Accesibilidad y SEO

- El mapa lleva `role="img"` + `aria-label` (mismo patrón que `GeoSelector`), pero **el nombre de
  la provincia también existe como texto real en el encabezado de la ficha** — ningún dato
  depende exclusivamente de una visualización (regla explícita de la consigna).
- Jerarquía de encabezados: la ficha usa `<h2>` para cada bloque (Ambiente, Luz, Cultivo, etc.),
  igual que ya hace `.atlas-entry-section` en el cuerpo — no introduce un nivel de heading nuevo ni
  compite con el `<h1>` de la entrada.
- El acordeón de mobile (§7) se implementa con elementos nativos accesibles (`<details>`/`<summary>`
  o botones con `aria-expanded`) — nunca un `div` con `onClick` sin semántica, para no perder
  navegación por teclado ni lectura por lector de pantalla.
- Contraste: reutiliza las variables de color ya definidas (`--sage-dark`, `--text-soft`, etc.) —
  no se proponen colores nuevos en este loop.
- SEO: toda la información de la ficha vive en HTML real desde el primer render de servidor
  (`identity`/`geography`/`map` no dependen de `localStorage`, solo el *disparador* de "qué
  provincia mostrar" lo necesita) — la única parte que depende de cliente es saber *qué provincia*
  eligió la persona, igual que ya ocurre hoy con `ProvinceContextPanel`.

## 24. Riesgos

- **Sobrecarga visual**: 8 bloques es mucho para una columna lateral. Mitigación ya incorporada en
  el diseño: bloques sin datos no se renderizan (§14), así que en la práctica la v1 (sin Ambiente,
  sin Cultivo, con Luz parcial) se ve mucho más liviana que el máximo teórico.
- **Falsa sensación de precisión**: mostrar un mapa y varios bloques puede sugerir más certeza de
  la que hay. Mitigación: niveles de evidencia (§15) y el mismo lenguaje condicional que ya usa el
  resto del Atlas.
- **Duplicar el Panel Ambiental sin darse cuenta**: mitigado explícitamente en §21 con una tabla de
  diferencias y la regla de reutilizar el mismo servicio de clima si se revive.
- **Volverse un calendario de cultivo disfrazado**: el bloque más riesgoso es Cultivo (§13) — la
  regla dura ("no se muestra sin evidencia A/B") es la mitigación principal.

## 25. Decisiones tomadas en este loop

1. La ficha vive dentro del `<aside>` ya existente, no en una columna nueva.
2. No sticky en la v1.
3. Sin provincia elegida: ficha nacional mínima + invitación a elegir, nunca una ficha vacía de 8
   bloques ni una provincia inventada.
4. El mapa se recorta del SVG nacional ya existente — no se crea ni se descarga ningún asset nuevo.
5. El bloque Cultivo no muestra nada sin evidencia de nivel A/B por dato.
6. `marco-editorial` nunca muestra los bloques de Ambiente/Cultivo, por regla explícita, no por
   ausencia de datos.
7. `ProvinceContextPanel`/`getEntryProvinceContext` se reutilizan sin modificar su lógica — el
   único cambio propuesto (ubicación dentro del aside) queda para 3B.
8. El clima operativo de Mi Cultivo (`fetchProvinceWeather`) no se reutiliza en el bloque Ambiente
   de la ficha — son tipos de dato distintos (momento actual vs. climatología de referencia).

## 26. Preparación para Loop 3B

Orden sugerido de implementación (de menor a mayor esfuerzo/riesgo), sin comprometerse a ejecutarlo
todo en un solo loop:

1. Componente `ProvinceProfileCard` con los bloques **identity + map + geography** únicamente
   (100% de datos ya existentes, cero investigación) + el estado "sin provincia" (§8).
2. Reubicar `ProvinceContextPanel` como último bloque dentro de la nueva ficha (cambio de layout,
   no de lógica).
3. Implementar el cálculo determinista de fotoperiodo/amanecer-atardecer para el bloque Luz (§12)
   — no depende de ninguna fuente externa nueva.
4. Acordeón mobile (§7) sobre el componente ya armado en el paso 1-3.
5. Recién después: investigación de climatología de referencia (Ambiente) y de ventanas de cultivo
   (Cultivo) — loops separados, con su propia ronda de fuentes, no antes de que la estructura (1-4)
   esté validada visualmente.

No se implementó nada de esto en este loop — queda documentado como plan, no como código.

## 27. Implementación en este loop

**Ninguna.** Este documento es el único artefacto de Loop 3A. No se tocó ningún componente, ningún
archivo de datos, ningún estilo. Se inspeccionó (sin modificar) `GeoSelector.js`,
`ProvinceContextPanel.js`, `lib/geo/provinceContext.js`, `lib/editorial/provinceContext.js`,
`lib/weather/locations.js`, `lib/geo/argentinaProvinces.js`, `EnvironmentalPanel.js`,
`atlas/[category]/[entry]/page.js` y las reglas de `globals.css` relevantes al layout de la
entrada (`.atlas-entry-content-wrap`, `.atlas-entry-aside`, breakpoints `980px`/`640px`).

**LOOP 3A TERMINADO. No se implementó la Ficha Provincial. No se cargó ningún dato climático,
de luz ni de cultivo nuevo. No se investigaron las 24 jurisdicciones. No se inició el Loop 3B.**
