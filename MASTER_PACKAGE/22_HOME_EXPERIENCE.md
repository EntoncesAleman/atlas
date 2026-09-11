# 22 — Especificación Funcional y UX: Home y Recorrido Principal

Documento de especificación (no implementación). Extiende `02_UX.md` con el nivel de detalle necesario para construir la Home y el recorrido principal sin ambigüedad. No introduce nuevas tecnologías, no cambia el modelo de datos de `07_DATABASE.md`, no cambia decisiones de `16_DECISIONS.md` — las hace operativas a nivel de pantalla.

**Regla que gobierna todo este documento** (ya estable en `01_PRODUCT.md`, `03_GEO.md` y `21_GEO_CLIMATE_RESEARCH.md`, reafirmada acá): el mapa representa **geografía**, nunca clima. El clima vive en un **panel ambiental independiente** que hoy no existe (no hay proveedor integrado) y se especifica aquí solo en su forma conceptual, sin datos reales ni proveedor elegido. La "zona aproximada" es una **capa editorial**, no una clasificación científica — ningún texto de Home o de la zona debe insinuar que es una regionalización de INTA, del SMN, ni de ningún organismo, salvo que el dato puntual citado ya esté `VERIFIED` en `19_SOURCE_REGISTRY.md`.

---

## 1. Qué ve un visitante al entrar por primera vez

En orden de aparición, sin necesidad de interactuar:
1. Un encabezado corto que declara la premisa del proyecto ("el cultivo no es igual en toda Argentina") — no un video, no un carrusel, no autoplay.
2. La pregunta **"¿Dónde cultivás?"** con el selector de ubicación (mapa + buscador de texto, ver §3) y una salida sin fricción: **"Explorar sin elegir ubicación"**, siempre visible al mismo nivel que el selector, no como link chico al pie.
3. Debajo, el espacio reservado para el **panel ambiental** (§6-7) en su **estado sin ubicación**: no muestra datos, muestra una explicación breve de qué va a mostrar una vez que el usuario elija zona, y no antes.
4. Debajo, la vidriera de categorías de la enciclopedia (§10) — accesible y navegable sin haber elegido ubicación, porque gran parte del contenido es general (`05_CONTENT.md`).
5. Accesos secundarios: biblioteca visual, comparador, calendario, newsletter.
6. Pie de página: sobre el proyecto, privacidad, términos.

Ningún elemento pide email, cuenta, ni ubicación exacta en esta primera pantalla. No hay modal ni interstitial antes de mostrar el contenido (coherente con la regla "sin dark patterns" de `02_UX.md`).

## 2. Jerarquía visual de la Home

De mayor a menor peso:
1. **Propuesta + selector de ubicación** (el elemento dominante, ocupa el primer "viewport" completo en mobile; en desktop comparte espacio con el panel ambiental, ver §14).
2. **Panel ambiental** (placeholder hoy, dato real cuando exista el proveedor) — inmediatamente debajo/al lado del selector, nunca lejos de él, porque conceptualmente es "lo que ves apenas elegís dónde estás".
3. **Vidriera de categorías de la enciclopedia** — contenido nacional, no depende de ubicación, es el segundo motivo de visita más importante después de la ubicación.
4. **Descubrimiento secundario**: biblioteca visual, calendario, comparador — presentados como accesos, no como contenido expandido en Home.
5. **Newsletter y "sobre el proyecto"** — la menor prioridad visual, vive cerca del pie.

Regla dura: el peso visual de "Mi Cultivo" en Home es **condicional** (§11) — para un visitante o un usuario sin cultivo activo, no ocupa lugar en esta jerarquía en absoluto.

## 3. Papel del mapa de Argentina

El mapa es **exclusivamente un control de navegación geográfica**, no una superficie de datos:
- Muestra límites de provincia (y, dentro de una provincia seleccionada, los departamentos/partidos que componen cada zona editorial, ver §4) — nada más.
- **Prohibido**: colorear el mapa por temperatura, precipitación, riesgo climático, o cualquier variable ambiental. Ningún ícono de clima (sol, nube, copo de nieve) se superpone al mapa. Esto es una regla dura, no una preferencia estética — mezclar geografía y clima en el mismo objeto visual es exactamente el error que este encargo pide evitar.
- Interacción: clic/tap en una provincia → la provincia se resalta → se despliega la lista de zonas editoriales de esa provincia (no un zoom que obligue a acertar un departamento pequeño).
- Tiene un equivalente textual completo (lista de provincias) que hace exactamente lo mismo — el mapa es una mejora de UX sobre esa lista, nunca el único camino (ya definido en `02_UX.md`/`03_GEO.md`, se reafirma acá porque es central a la Home).

## 4. Flujo Argentina → Provincia → Departamento/Partido → Zona aproximada

Este es un flujo de **datos**, no necesariamente cuatro pantallas o cuatro decisiones que el usuario deba tomar una por una. Especificación exacta de cómo se colapsa en interacción real:

```
ARGENTINA
  ↓ (clic en mapa o buscador de texto — interacción del usuario)
PROVINCIA
  ↓ (resolución interna, no visible como paso propio)
DEPARTAMENTO/PARTIDO  ←  unidad de datos (INDEC/IGN), agrupada editorialmente (D1, 16_DECISIONS.md)
  ↓ (el sistema ya sabe qué zonas editoriales existen para esta provincia)
ZONA APROXIMADA
  ↓ (interacción del usuario — opcional)
```

- **Paso visible 1 (usuario)**: elegir provincia.
- **Paso invisible (sistema)**: el departamento/partido nunca se presenta como una lista para elegir directamente — es la capa de datos que ya está agrupada editorialmente en zonas (por eso D1 existe: para que el usuario no tenga que navegar ~530 unidades).
- **Paso visible 2 (usuario, opcional)**: elegir una zona de una lista corta (nombres reconocibles: "Valle de Uco", "Costa Atlántica bonaerense"), o omitirla y quedarse a nivel provincia.
- **Transparencia opcional, no obligatoria**: cada zona puede tener un detalle expandible ("¿Qué incluye esta zona?") que lista los departamentos/partidos que la componen — esto es para el usuario curioso o técnico, nunca un paso que haya que atravesar para llegar a la zona.

**Por qué se resuelve así y no como 4 pantallas secuenciales**: exponer el departamento/partido como paso de navegación obligatorio contradice directamente la decisión D1 y el principio de UX ya establecido ("¿Dónde cultivás?" no debe sentirse como un formulario catastral, `03_GEO.md`). El departamento/partido sigue existiendo y siendo trazable — solo que como dato, no como interacción.

## 5. Qué ocurre cuando el usuario ya seleccionó una ubicación

Cambios inmediatos y consistentes en todo el sitio, no solo en Home:
1. Aparece un **chip/breadcrumb persistente** en el header: *"Estás viendo: Mendoza · Valle de Uco — Cambiar"* (o solo *"Mendoza — Cambiar"* si no eligió zona).
2. En Home, el **panel ambiental** pasa de su estado "sin ubicación" (§7) a su estado real (cuando exista el proveedor) o a un estado explícito de "todavía no disponible para esta zona" (mientras no exista) — nunca a datos simulados.
3. Los bloques "En tu zona" de artículos de enciclopedia (ya definidos en `02_UX.md`) se activan automáticamente en cualquier artículo que tenga contenido regional para esa zona.
4. El calendario y el comparador prellenan esa zona como valor por defecto, sin impedir cambiarla.
5. La selección persiste en `localStorage` (visitante) o en el perfil (usuario logueado que activó "guardar mi ubicación" — nunca automático, ver `10_PRIVACY.md`).
6. Cambiar de ubicación desde el chip vuelve a mostrar el selector (mapa o buscador), sin recargar toda la experiencia — es un cambio de contexto, no una nueva sesión.

## 6. Lugar conceptual del futuro widget climático ("Panel Ambiental")

Nombre de trabajo para todo el proyecto: **Panel Ambiental** (evitar llamarlo "widget de clima" en la interfaz pública — ver naming en §16, decisión pendiente de copy). Ubicación:
- **Home**: inmediatamente debajo/al lado del selector de ubicación (§2), nunca dentro del mapa ni compartiendo contenedor con él.
- **Página de zona** (`/provincias/{provincia}/{zona}`): repetido, con el mismo componente conceptual.
- **Página de clima** (`/clima/{provincia}/{zona}`): versión ampliada del mismo panel, con más detalle (pronóstico extendido, histórico de referencia — ver `04_CLIMATE.md` para la distinción entre climatología de referencia y clima operativo).

Es un componente **aislado en su ciclo de vida**: tiene su propio estado de carga y error, y su falla (proveedor caído, sin ubicación elegida) **nunca** debe romper ni bloquear el resto de la página que lo contiene — coherente con el principio de arquitectura ya establecido ("nada bloquea la lectura pública", `08_ARCHITECTURE.md`).

## 7. Qué información debería mostrar ese panel (sin proveedor ni datos reales todavía)

Especificación de **estructura**, no de datos — ningún número de este punto es real hasta que exista integración:

1. **Encabezado de contexto**: a qué ubicación refiere ("Mendoza · Valle de Uco") + marca de "última actualización" (deja claro que es un dato vivo, distinto de la climatología de referencia).
2. **Bloque "Datos meteorológicos"** (crudo, sin interpretación editorial): temperatura actual, mínima/máxima del día, viento, probabilidad de precipitación. Solo números y unidades, sin adjetivos.
3. **Bloque "Condiciones relevantes"** (señales cortas derivadas por regla de umbral, no redacción larga): etiquetas tipo "riesgo de helada esta noche", "viento fuerte previsto" — las reglas de umbral ya están conceptualmente definidas en `04_CLIMATE.md` (helada ≤0°C previsto, ráfagas ≥ umbral, etc.), este documento no las redefine.
4. **Bloque "Contenido relacionado"**: enlace editorial a partir de la condición detectada (ej. "riesgo de helada" → artículo de la categoría Clima/Sanidad sobre daño por frío, o entrada de calendario). Es un link, no contenido incrustado.
5. **Disclaimer fijo**: aviso de que es información orientativa y un enlace a la fuente oficial (SMN) — coherente con el riesgo ya documentado en `04_CLIMATE.md` sobre depender de un proveedor sin SLA.

**Estados del panel** (a construir, especificados ahora):
- `SIN_UBICACION` — el usuario no eligió provincia/zona: mensaje explicativo de qué mostrará el panel una vez que elija, con el CTA de elegir ubicación.
- `NO_IMPLEMENTADO` — la ubicación está elegida pero el proveedor de clima todavía no existe en el proyecto (estado actual, 2026): mensaje honesto ("Esta función está en construcción para tu zona"), nunca datos inventados ni de relleno.
- `CARGANDO` — pedido en curso al proveedor.
- `CON_DATOS` — los 4 bloques de arriba, poblados.
- `ERROR_PROVEEDOR` — proveedor caído o sin respuesta: cae a mostrar climatología de referencia general de la zona (si existe) con aviso explícito de que no es el dato de hoy (ya definido como fallback en `02_UX.md`).

## 8. Relación clima → condiciones relevantes → contenido del Atlas

```
DATOS METEOROLÓGICOS (crudo, del proveedor — sin opinión editorial)
        ↓  regla de umbral (definida en 04_CLIMATE.md, no en este documento)
CONDICIÓN RELEVANTE (etiqueta corta: "riesgo de helada", "viento fuerte")
        ↓  mapeo fijo condición → contenido (tabla editorial, mantenida por el equipo de contenido)
CONTENIDO DEL ATLAS (artículo de enciclopedia / bloque "En tu zona" / entrada de calendario)
```

**Regla dura de separación** (la más importante de este documento junto con la del mapa en §3): estas tres capas viven en **bloques visuales distintos**, nunca mezclados en el mismo párrafo o tarjeta. Un dato crudo del proveedor no debe aparecer redactado como si fuera opinión editorial ("hace mucho frío, cuidado") ni el contenido editorial debe presentarse como si fuera un dato medido en tiempo real. Esta separación permite además que cambiar de proveedor climático (ver `18_EXTERNAL_SERVICES.md`) nunca obligue a reescribir contenido editorial, y que actualizar un artículo nunca dependa de tocar la integración de clima.

## 9. Arquitectura de navegación del Atlas

La navegación global ya está definida en `02_UX.md` (sección "Navegación global" y "Sitemap completo") y no se modifica acá. Lo que este documento agrega es el rol de la Home dentro de esa arquitectura: **la Home es una vidriera, no una sección más**. Cada bloque de Home es una puerta de entrada a una sección que tiene su propia página completa (enciclopedia, biblioteca visual, clima, calendario, comparador) — la Home nunca contiene la experiencia completa de ninguna sección, solo su mejor punto de entrada contextual.

## 10. Categorías principales y organización visual en Home

`05_CONTENT.md` define 16 categorías/subcategorías de la enciclopedia — mostrarlas todas en Home sería ruido. Se agrupan en un número reducido de **áreas macro** para la vidriera de Home (nombres de trabajo, ajustables en copy, no en estructura):

1. **Fundamentos y ciclo de vida** (Fundamentos, Germinación, Crecimiento, Floración, Clonación)
2. **Suelo y agua** (Sustrato y suelo, Agua)
3. **Luz y clima** (Luz, Clima)
4. **Sanidad** (plagas, hongos, enfermedades, deficiencias)
5. **Cultivo interior/exterior** (formatos de cultivo)
6. **Cosecha y almacenamiento**
7. **Marco legal y contexto** (con el disclaimer editorial ya definido en `12_LEGAL.md`)

Cada área macro es una tarjeta con foto/ilustración representativa (`06_VISUAL.md`), título, y enlace al índice de esa área — nunca un resumen extenso del contenido dentro de la tarjeta misma (eso vive en la página secundaria).

## 11. Diferencia entre visitante, usuario registrado y "Mi Cultivo"

| | Visitante | Usuario registrado (sin cultivo activo) | Usuario con "Mi Cultivo" activo |
|---|---|---|---|
| Ubicación | Elegida por sesión (`localStorage`), se pierde al limpiar el navegador | Puede guardarse en el perfil, persiste entre dispositivos | Igual que usuario registrado |
| Panel ambiental | Visible, mismo comportamiento que cualquier visitante | Igual | Igual |
| Enciclopedia/calendario/comparador | Acceso completo | Igual + favoritos | Igual |
| Newsletter/alertas | Puede suscribirse solo con email | Gestionable desde perfil | Igual |
| "Mi Cultivo" | No existe para este usuario | Existe pero vacío — Home no le dedica espacio, solo el nav lo ofrece | Existe con datos — Home puede mostrar un resumen opcional (§12) |

**"Mi Cultivo" no es sinónimo de "usuario registrado"**: un usuario puede registrarse solo para guardar favoritos o recibir alertas, sin haber creado nunca un cultivo. La Home debe reflejar esto — no asumir que todo usuario logueado tiene algo que mostrar en un resumen de cultivo.

## 12. Qué vive en Home vs páginas secundarias

**En Home** (siempre resumen/entrada, nunca el detalle completo):
- Selector de ubicación + chip de ubicación activa.
- Panel ambiental (versión resumida, ver §7).
- Vidriera de áreas macro de la enciclopedia.
- Accesos a biblioteca visual, calendario, comparador.
- CTA de newsletter.
- **Condicional**: si el usuario está logueado y tiene un cultivo activo, una tarjeta resumen ("Continuar mi cultivo — Día 34") que enlaza directo al timeline — nunca el timeline completo dentro de Home.

**En páginas secundarias** (el detalle completo vive ahí, no en Home):
- Artículo completo de enciclopedia.
- Página de provincia/zona completa (clima ampliado, suelo, agua, contenido regional).
- Comparador funcional con selección de dos o más zonas.
- Calendario completo por provincia.
- Timeline completo de "Mi Cultivo", perfil, alertas.

## 13. Qué aparece inmediatamente vs qué queda detrás de una interacción

**Inmediato (sin clic, sin login)**: propuesta de valor, selector de ubicación, salida "explorar sin elegir ubicación", vidriera de categorías, accesos secundarios.

**Detrás de una interacción, pero sin login**: panel ambiental con datos reales (requiere haber elegido zona), detalle "¿qué incluye esta zona?" (requiere expandir), bloques "En tu zona" en artículos (requieren zona elegida), resultado del comparador (requiere elegir 2 zonas).

**Detrás de login**: guardar ubicación en el perfil, favoritos, alertas, newsletter con preferencias, y todo "Mi Cultivo".

## 14. Mobile vs desktop

**Mobile** (uso esperado: consulta rápida y también registro de cultivo desde el lugar físico del cultivo):
- Flujo estrictamente vertical: propuesta → selector de ubicación → panel ambiental → vidriera de categorías, todo en scroll simple, sin columnas paralelas.
- El mapa se muestra compacto y tappable, con el buscador de texto siempre visible arriba del mapa (no escondido detrás de un ícono) porque en mobile tocar una provincia pequeña con el dedo es menos preciso que buscar por texto.
- El panel ambiental es una tarjeta compacta (los 4 bloques de §7 apilados, no en columnas).

**Desktop** (uso esperado: lectura más extensa, comparación, planificación):
- Layout de dos zonas: mapa + selector a la izquierda/centro, panel ambiental a la derecha, visibles simultáneamente sin scroll.
- La vidriera de categorías usa grid multi-columna, no una lista larga.
- El desktop debe sentirse como un sitio editorial completo (más denso, más información visible a la vez), no como la versión mobile estirada — principio ya fijado en `02_UX.md`.

## 15. Recorrido ideal (end-to-end)

```
VISITANTE
  ↓ descubre (Home: propuesta + pregunta de ubicación, sin fricción)
  ↓ selecciona ubicación (provincia, opcionalmente zona — o la omite)
  ↓ consulta condiciones (panel ambiental: real si existe proveedor, honesto si no)
  ↓ explora el Atlas (enciclopedia con bloques "En tu zona", calendario, comparador)
  ↓ eventualmente crea cuenta (invitación contextual en el momento en que intenta
     guardar algo — favorito, ubicación persistente, o crear su primer cultivo —
     nunca antes, nunca como requisito para los pasos anteriores)
```

Este recorrido es el criterio de diseño para cualquier pantalla nueva que se agregue en el futuro: si una pantalla nueva no encaja en algún punto de esta cadena, no pertenece al recorrido principal (puede ser válida como página secundaria igual, pero no debe competir por espacio en Home).

---

## Componentes conceptuales (nombres de referencia, no implementación)

- **LocationPicker** — mapa + buscador + fallback en lista (§3, §4).
- **LocationChip** — breadcrumb persistente de ubicación activa (§5).
- **EnvironmentalPanel ("Panel Ambiental")** — contenedor del futuro widget climático, con sus 5 estados (§7).
- **CategoryShowcase** — vidriera de áreas macro de la enciclopedia (§10).
- **RegionalContentBlock** — bloque "En tu zona" ya definido en `02_UX.md`.
- **CultivationSummaryCard** — resumen condicional de cultivo activo en Home (§11-12).
- **NewsletterCTA** — invitación a suscripción, sin checkbox pre-marcado.

---

## Decisiones pendientes (no bloqueantes, no resueltas en este documento)

- Nombre público final del Panel Ambiental de cara al usuario (copy, no estructura) — "Panel Ambiental" es el nombre de trabajo interno.
- Si el `CultivationSummaryCard` se muestra siempre que exista un cultivo activo o solo en cierta ventana de tiempo (ej. últimos 7 días de actividad) — detalle de producto a definir en construcción.
- Cantidad definitiva de áreas macro en la vidriera de Home (se proponen 7 en §10; puede ajustarse por resultado de pruebas de usuario, no por preferencia estética).
- Umbral exacto de cada "condición relevante" del panel ambiental — ya conceptualizado en `04_CLIMATE.md`, los valores finales son tarea de construcción, no de este documento.

## Criterios de aceptación

1. Un visitante nuevo puede llegar a explorar la enciclopedia en 2 clics o menos, sin haber elegido ubicación.
2. Un visitante puede completar la selección de provincia + zona en 3 interacciones o menos, con opción explícita de omitir en cada paso.
3. El mapa nunca renderiza ninguna variable climática (color, ícono, leyenda) — cualquier revisión de diseño que encuentre esto debe tratarse como bug de producto, no de estilo.
4. El Panel Ambiental es un componente visual y de estado independiente del mapa y del resto de la Home — su error o ausencia de datos no impide leer ningún otro contenido de la página.
5. Ningún dato meteorológico crudo aparece en el mismo bloque visual que texto editorial interpretativo (separación de las 3 capas de §8 verificable a simple vista).
6. Mientras no exista proveedor de clima integrado, el Panel Ambiental nunca muestra números simulados o de relleno — solo el estado `NO_IMPLEMENTADO` explícito.
7. Ningún elemento de Home exige cuenta, salvo el `CultivationSummaryCard`, que además es condicional y nunca ocupa espacio si no aplica.
8. El flujo completo de ubicación (mapa → provincia → zona) tiene un equivalente 100% funcional sin JavaScript de mapa cargado (fallback en lista, ya definido en `03_GEO.md`).
9. Ninguna zona editorial se presenta con lenguaje que sugiera clasificación científica oficial (ej. nunca "Región Agroecológica X" salvo que esa clasificación esté `VERIFIED` en `19_SOURCE_REGISTRY.md` y así se cite explícitamente).

## Verificación de coherencia con el resto del blueprint

- No contradice `01_PRODUCT.md`: el modo visitante sigue siendo completo, el registro sigue sin bloquear lectura.
- No contradice `02_UX.md`: extiende el flujo "¿Dónde cultivás?" y el sitemap ya definidos, no los reemplaza.
- No contradice `03_GEO.md`/D1 (`16_DECISIONS.md`): el departamento/partido sigue siendo unidad de datos, no de navegación de usuario; la zona sigue siendo agrupación editorial.
- No contradice `04_CLIMATE.md`/`21_GEO_CLIMATE_RESEARCH.md`: no se afirma ninguna clasificación climática nueva, no se usa la capa Köppen de INDEC/ANIDA como si fuera de uso libre confirmado (sigue marcada con licencia pendiente), no se inventa regionalización de INTA.
- No contradice `08_ARCHITECTURE.md`: el Panel Ambiental respeta el principio de que ningún servicio externo puede tumbar la lectura pública.
- No introduce ecommerce, marcas, ni venta — coherente con `01_PRODUCT.md` y D5.
