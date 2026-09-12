# 54 — Loop 4.1: Cannabis regional + expansión del Atlas

Evoluciona el Atlas de "colección de fichas climáticas por provincia" hacia "Atlas argentino de
Cannabis": la planta pasa a ser protagonista (nueva categoría Historia, con dos entradas), el
ingreso con cuenta deja de aislarse en `/mi-cultivo` y pasa por el Atlas completo, y Luz/Cultivo
se refuerzan con ciencia directa de Cannabis en vez de depender solo de la analogía con la soja.

## 1. Nuevo concepto

El eje geográfico/provincial (Fases 47.2-53) se mantiene sin cambios — la provincia sigue siendo
la puerta de entrada contextual. Lo que cambia es qué rodea a ese eje: el Atlas ahora también
cuenta de dónde viene la planta (Historia), qué significan realmente sus nombres más repetidos
(Genética), y deja de tratar el ingreso con cuenta como una función aislada de "seguimiento de
cultivo" separada del resto del contenido.

## 2. Nueva arquitectura del Grid

Se evaluaron explícitamente Historia y Genética como categorías principales independientes vs.
subsecciones. **Decisión**: una sola categoría nueva, **"Historia"**, con **dos entradas** dentro
(`historia-de-la-planta` y `genetica-y-tipos`) — el modelo editorial ya soporta varias entradas
por categoría (documentado desde la Fase 7A), así que no hizo falta ninguna extensión de esquema.
Esto agrega **una sola tarjeta nueva** al Grid (no dos), cumpliendo la instrucción explícita de no
crear un grid gigantesco. El Grid pasó de 8 a 9 tarjetas: "Mi Cultivo" (reutilizando la tarjeta ya
existente, ver §3) + 7 categorías previas + Historia.

No se creó contenido nuevo de imágenes: la portada de "Historia" reutiliza el mismo archivo
histórico (lámina de Köhler, 1887, dominio público) ya usado en "Crecimiento" — coherente
temáticamente y sin ninguna licencia nueva que gestionar.

## 3. Mi Cultivo: una sola tarjeta, session-aware

Se descartó crear una segunda tarjeta "Mi Cultivo" distinta de "De semilla al frasco" — son el
mismo destino (`/mi-cultivo`) desde la Fase 4, así que duplicarlas habría sido exactamente lo que
la consigna pedía evitar ("no duplicar el sistema de Mi Cultivo existente"). En cambio,
`TrackerShowcaseCard.js` (usado en el Grid de Home y de `/atlas`) pasó a ser un componente cliente
que detecta la sesión de Supabase (mismo patrón ya usado en `ProvinceContextPanel`) y cambia texto
y CTA:

- **Sin sesión**: "Explorar o ingresar" — kicker "Mi Cultivo", explica que funciona con o sin
  cuenta.
- **Con sesión**: "Ir a Mi Cultivo" — mismo destino, mensaje de que el historial ya está guardado
  en la cuenta.

## 4. Login: redirect a `/atlas`, no a `/mi-cultivo`

Único cambio de código en el flujo de autenticación (autorizado explícitamente por la consigna:
"no modificar autenticación salvo el redirect posterior al login"). En
`src/app/mi-cultivo/page.js`, `handleAuthSubmit`:

- Login exitoso (`signInWithPassword` sin error) → `router.push('/atlas')`.
- Signup con sesión inmediata (proyecto sin confirmación de email obligatoria, ya documentado en
  el Loop 2) → `router.push('/atlas')`.
- Signup que requiere confirmar el email → sin cambios: se queda mostrando el aviso, porque
  todavía no hay sesión a la que redirigir.

El formulario de ingreso **sigue viviendo en `/mi-cultivo`** (no se movió a una ruta nueva) — el
único cambio de comportamiento es hacia dónde navega el navegador **después** de autenticarse con
éxito, tal como pedía la consigna. Se agregó, antes del formulario, un bloque
**"¿Qué gano al ingresar?"** con 7 beneficios reales (verificados contra funcionalidad ya
existente, ninguno prometido sin implementar): guardar Mi Cultivo en la nube, registrar
etapas/eventos, guardar fotos privadas, mantener la provincia guardada, consultar "Mi Temporada",
usar el Chatbot con contexto propio, conservar la información entre dispositivos.

## 5. Historia — hallazgos principales

Ver la entrada completa en `/atlas/historia/historia-de-la-planta`. Resumen de lo verificado en
este loop (todo con fuente y nivel de verificación documentados en `sources.js`):

- **Origen/domesticación**: reutiliza, sin cambios, la investigación ya verificada del Loop 1
  (Ren et al. 2021, genómica; Dal Martello et al. 2023 y Liu et al. 2026, arqueobotánica).
- **Europa**: Cannabis es nativo de Europa desde el Pleistoceno (presencia silvestre, no cultivo);
  la evidencia de CULTIVO aparece recién en la Edad del Cobre/Bronce, y los escitas habrían
  introducido el cultivo a pueblos celtas/eslavos hacia el 550 a.C. (McPartland et al. 2018,
  síntesis de 28 estudios de polen — corroborado por metadatos de búsqueda, no leído en texto
  completo).
- **América**: distinguida explícitamente en Norte/Sur/Río de la Plata, tal como pedía la
  consigna (§6).
- **Argentina/Belgrano**: ver §8.

## 6. Cannabis en América

**América del Norte**: cáñamo inglés en Jamestown, Virginia — cultivado desde los primeros años de
la colonia, con John Rolfe documentando en 1616 que igualaba en calidad al de Inglaterra/Holanda.

**América del Sur**: se corrigió, con fuente primaria, el mito difundido de "1545, Quillota,
Chile" como el origen americano del cáñamo. La evidencia documental (Archivo General de Indias)
muestra remisiones de semilla ya en 1513-1520, dirigidas primero a Mesoamérica — la Real Cédula de
1545 fue una orden general a "las Indias", no específica de Chile. Chile sí se consolidó, desde
1577-1605, como la única región con cultivo rentable y sostenido a gran escala en Sudamérica
colonial (Quillota, La Ligua), por compatibilidad climática (mediterráneo), no por haber sido el
primer lugar de siembra.

## 7. Cannabis en Argentina (Río de la Plata / Tucumán)

**Hallazgo central de este loop**: documentos primarios del Archivo General de Indias muestran que
la Corona española extendió órdenes de fomento del cultivo de cáñamo específicamente a la región
del Río de la Plata (real cédula de 1619, dirigida al gobernador del Río de la Plata) y a Tucumán
(real cédula de 1626, dirigida también a Río de la Plata y Paraguay) — casi 180 años antes de
Belgrano. No se encontró evidencia de que esas órdenes se hayan traducido en cultivo exitoso: los
propios funcionarios reales fueron confirmando que, salvo Chile, el cáñamo no era rentable en
ninguna otra jurisdicción americana. Sí quedó documentado un vínculo económico indirecto: la
escasez de mano de obra chilena de 1644-1648 se atribuye en parte al cierre del puerto de Buenos
Aires — el Río de la Plata aparece conectado a la cadena de suministro colonial del cáñamo como
nudo logístico, no como zona de cultivo.

## 8. Belgrano

Se investigó la afirmación popular con el cuidado que pedía la consigna, en vez de darla por
cierta. **Documento real**: el 9 de junio de 1797, como Secretario del Consulado de Comercio de
Buenos Aires (cargo 1794-1809), Manuel Belgrano presentó la memoria "Utilidades que resultarán a
esta Provincia y a la Península del cultivo del lino y del cáñamo" — corroborada por varias
fuentes secundarias independientes (título, fecha y contexto institucional consistentes), aunque
no se localizó una copia digitalizada del texto original en esta sesión.

**Corrección explícita de la simplificación popular**: el documento trata sobre **lino y cáñamo**
como insumo textil/naval de sustitución de importaciones — parte de un programa económico más
amplio (una de ~15 memorias que escribió sobre agricultura, manufactura, comercio y crédito) — no
sobre la planta en su sentido psicoactivo/medicinal actual. Además, la iniciativa **no prosperó**
por falta de apoyo gubernamental y privado. Ambos matices están corroborados de forma
independiente y se explicitan en la entrada, tal como pedía la consigna ("si la frase popular es
una simplificación, explicarlo").

## 9. Primeras plantaciones

Con la investigación de este loop, **no se encontró ninguna fuente primaria verificada** de una
plantación argentina exitosa y sostenida posterior a Belgrano y anterior al siglo XX. La entrada
documenta esa ausencia explícitamente, en vez de inventar una "primera plantación" — coherente con
la instrucción de usar "una de las primeras evidencias documentadas" en vez de "primera
plantación" cuando la evidencia es una mención aislada, y de no rellenar un vacío de evidencia con
una afirmación no respaldada.

## 10. Genética y tipos

Entrada nueva `genetica-y-tipos`, con la historia real de la clasificación:

- **Linnaeus (1753)**: una sola especie, Cannabis sativa.
- **Lamarck (1785)**: propuso Cannabis indica como especie distinta, por diferencias
  **morfológicas** entre plantas cultivadas de Occidente y poblaciones silvestres de India — **no**
  por clima ni por efecto.
- **Janischevsky (1924)**: describió Cannabis ruderalis en poblaciones silvestres/ruderales del
  sur de Rusia.
- **Estado actual**: la botánica moderna trata mayormente a Cannabis como un género
  monoespecífico o polimórfico, no como tres especies separadas; y los nombres "sativa"/"indica"
  que usan hoy cultivadores y dispensarios **no tienen validez taxonómica** (Pollio, 2016, PMC,
  leído en texto completo) — cita textual usada para desactivar explícitamente la idea de "tres
  variedades modernas independientes".

Categorías priorizadas para la Ficha Provincial, en lugar de "sativa"/"indica": **fotoperiódica**,
**autofloreciente**, **ciclo corto/medio/largo** — con la aclaración explícita, repetida en la
entrada, de que "sativa = clima cálido" / "indica = clima frío" / "ruderalis = clima norteño"
**no son reglas universales** (ninguna de las tres clasificaciones originales se basó en clima).

## 11. Luz — reforzada con ciencia directa de Cannabis

Se agregó una sección nueva a la entrada ya existente `luz-y-fotoperiodo` ("De la señal a la
flor"), citando un hallazgo de 2024 sobre el mecanismo fisiológico **de Cannabis sativa misma**
(no una analogía con otra especie): bajo fotoperiodo de día corto, los niveles de giberelina bajan
y eso dispara la inflorescencia condensada; la señal necesita al menos 3 días consecutivos de
oscuridad prolongada para registrarse (Alter et al., 2024, *Horticulture Research*, leído en texto
completo). Esto no reemplaza el cálculo astronómico de fotoperiodo (Fase 3B, sin tocar) — lo
complementa con el mecanismo biológico real que ese fotoperiodo dispara.

## 12. Cultivo/Cosecha — referencia fenológica reforzada, no reemplazada

La referencia fenológica de la soja (Loop 3C) se mantiene — sigue siendo la única fuente con
variación por latitud documentada para Argentina. Se la reforzó agregando el hallazgo de Alter et
al. (2024) al campo `photoperiodResponse` de `provinceProfile.js`: ahora el texto distingue
explícitamente qué parte es ciencia directa de Cannabis (el mecanismo giberelina/día corto) y qué
parte sigue siendo analogía con otra especie (la variación de ese umbral según la latitud
argentina, que sigue sin fuente propia de Cannabis). Se investigó el tabaco como especie de
referencia adicional para las provincias donde se cultiva realmente (Jujuy, Salta, Tucumán, Chaco,
Catamarca, Misiones, Corrientes) — descartado con evidencia (Schmidt et al. 2024): el tabaco
cultivado es día-neutro, más débil como referencia de día corto que la soja.

## 13. Fuentes nuevas

| id | Verificación |
|---|---|
| `cientifica-mcpartland-2018-cannabis-europa-polen` | Metadatos verificados; texto no leído directamente |
| `academica-diaz-ordonez-2017-cannabis-chile-colonial` | **Leído en texto completo** (22 páginas, extraídas localmente) |
| `historica-belgrano-1797-memoria-lino-canamo` | Corroborado por varias fuentes secundarias; documento original no localizado, sin URL |
| `cientifica-pollio-2016-nombre-cannabis-taxonomia` | Leído en texto completo (PMC) |
| `cientifica-alter-2024-cannabis-fotoperiodo-giberelina` | Leído en texto completo (PMC) |
| `preprint-cannabis-daylength-mutation-2023` | Preprint, no leído directamente, corroborado por búsqueda |
| `otra-semillalibre-2026-guia-regional-revisada` | Blog comercial, investigado y contrastado explícitamente (§14), no usado como autoridad |

## 14. Verificación del artículo de Semilla Libre

Se investigó específicamente la URL indicada en la consigna. El artículo no cita ninguna fuente
propia. Cada afirmación se clasificó de forma independiente:

| Afirmación | Clasificación |
|---|---|
| Las autoflorecientes no dependen del fotoperiodo para florecer | **Corroborada** (ciencia real, ver §10/§11) |
| Patagonia tiene temporadas más cortas y temperaturas más bajas | **Parcialmente corroborada** (consistente con la clasificación climática real, sin fuente que valide la conclusión de cultivo) |
| Ventanas exactas de siembra/floración/cosecha por mes y región | **No corroborada** — ninguna fuente independiente respalda esas fechas para Cannabis en Argentina |

Ninguna fecha específica del artículo se incorporó al producto — exactamente el resultado que la
consigna pedía poder demostrar.

## 15. Niveles de evidencia

- **A**: hechos históricos con documento primario citado (fechas de las reales cédulas 1513-1626,
  vía Díaz-Ordóñez 2017); clasificación climática y estaciones SMN (sin cambios del Loop 4).
- **B**: no se incorporó un dato nuevo de este nivel específicamente argentino sobre Cannabis en
  este loop (el hueco de evidencia directa para Cultivo/Cosecha de Cannabis en Argentina sigue
  abierto).
- **C**: referencia fenológica de la soja (Loop 3C, reforzada en §12).
- **D**: cálculo de fotoperiodo (sin cambios).
- **E**: ninguna fuente para una "primera plantación" argentina posterior a Belgrano (§9);
  ventanas de siembra/cosecha específicas de Cannabis en Argentina, sin cambios.

## 16. Limitaciones

- La memoria de Belgrano (1797) no se pudo leer en su texto original en esta sesión — su
  contenido se reconstruyó a partir de fuentes secundarias convergentes, no de lectura primaria.
- McPartland et al. (2018) y el preprint sobre la mutación de fotoperiodo (2023) no se leyeron en
  texto completo — se citan por su hallazgo ya corroborado por metadatos/búsqueda, no por lectura
  directa.
- No se encontró ninguna fuente primaria de una plantación argentina exitosa entre Belgrano y el
  siglo XX — documentado como vacío real, no rellenado.
- El tabaco quedó descartado como segunda especie de referencia — la soja sigue siendo la única.

## 17. Decisiones

1. Historia y Genética entran como **una** categoría nueva con dos entradas, no dos categorías —
   evita un Grid "gigante" sin perder profundidad editorial en ninguno de los dos temas.
2. El redirect post-login es el único cambio a la autenticación — el formulario sigue en
   `/mi-cultivo`, Supabase/RLS/Storage no se tocaron.
3. "Mi Cultivo" reutiliza la tarjeta "De semilla al frasco" ya existente (ahora session-aware) en
   vez de crear una segunda tarjeta con el mismo destino.
4. Se corrigió un bug real encontrado durante la verificación: la grilla de categoría renderizaba
   `<img>` sin condicional para las entradas sin asset propio — corregido de forma defensiva
   (`{entry.image && (...)}`) y, además, se le dieron assets reales (reutilizados, no nuevos) a las
   2 entradas nuevas para mantener consistencia visual con el resto del Atlas.
5. El tabaco se investigó y se descartó como referencia fenológica adicional, con evidencia
   científica documentada — no se sustituyó a la soja "porque sí".
6. Ninguna fecha de siembra/cosecha del artículo de Semilla Libre se incorporó al producto.

## 18. Tests

- `provincial-context-audit.mjs` (Fase 47.2, sin modificar): **1280/1280**.
- `province-profile-model-check.mjs` (Fase 51, sin modificar su lógica): **674/674**.
- `province-profile-ui-audit.mjs` (Fase 52, sin modificar): **147/147**.
- `atlas-expansion-audit.mjs` (**nuevo**, pequeño y específico): **31/31**, cubriendo: Grid sin
  sesión (tarjeta invita a ingresar) y con sesión real (tarjeta pasa a "Ir a Mi Cultivo" sin
  recargar manualmente); categoría Historia y sus 2 entradas (200, sin imágenes rotas, sin
  overflow, sin errores de consola, sin sintaxis markdown sin procesar); login real → redirect
  exacto a `/atlas`; pantalla de ingreso muestra "¿Qué gano al ingresar?"; responsive en mobile
  (390×844) sobre Home, Grid y la entrada de Historia. Usa una cuenta de prueba real, creada y
  borrada de Supabase en cada corrida (mismo patrón ya validado en el Loop 2).

## 19. Build

`npm run build`: limpio, mismas 9 rutas (las 2 entradas y la categoría nuevas se sirven con las
rutas dinámicas `/atlas/[category]` y `/atlas/[category]/[entry]` ya existentes).

## 20. Archivos

**Nuevos**: `tests/atlas-expansion-audit.mjs`,
`MASTER_PACKAGE/54_LOOP_4_1_CANNABIS_REGIONAL_AND_ATLAS_EXPANSION.md`.
**Modificados**: `src/app/mi-cultivo/page.js` (redirect post-login, beneficios), `src/app/components/TrackerShowcaseCard.js`
(session-aware), `src/app/atlas/[category]/page.js` (fix defensivo de imagen de entrada),
`src/app/lib/editorial/editorialData.js` (categoría Historia + 2 entradas; refuerzo de
`luz-y-fotoperiodo`; `relatedEntryIds` cruzados), `src/app/lib/editorial/assets.js` (3 assets
nuevos, todos reutilizando archivos ya licenciados), `src/app/lib/editorial/tags.js` (5 tags
nuevos), `src/app/lib/editorial/sources.js` (7 fuentes nuevas), `src/app/lib/geo/provinceProfile.js`
(referencia fenológica reforzada con Alter et al. 2024), `src/app/globals.css` (estilos del bloque
de beneficios de ingreso).
**Sin cambios**: Supabase (esquema/RLS/Storage), Chatbot, `ProvinceProfileCard.js`,
`provincial-context-audit.mjs`, cualquier otra entrada editorial fuera de las mencionadas.

**LOOP 4.1 TERMINADO. No se inició el Loop 5.**
