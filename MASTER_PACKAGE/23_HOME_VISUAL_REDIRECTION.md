# 23 — Auditoría Visual Brutal + Nueva Dirección Visual: Home

Rol de este documento: crítica de producto/UX/UI/dirección de arte sobre la Home real (código, no solo especificación), y una nueva dirección visual concreta. No es implementación. Cada afirmación se etiqueta como **OBSERVACIÓN** (lo que existe, verificable), **PROBLEMA** (por qué eso es un defecto), **RECOMENDACIÓN** (qué hacer) o **DECISIÓN** (algo que ya se resuelve en este documento). Cuando una recomendación choca con una decisión ya registrada en `16_DECISIONS.md`, se marca `DECISION_REVIEW_REQUIRED` explícitamente — adelanto: **no encontré ninguna decisión registrada (D1-D10) que deba reabrirse**; los problemas de esta auditoría son de *implementación* que no sigue lo ya bien especificado en `02_UX.md`, `06_VISUAL.md` y `22_HOME_EXPERIENCE.md`, no defectos de esos documentos.

## Limitación de esta auditoría (declarada, no oculta)

Se intentó ver la aplicación renderizada: el servidor de Next.js ya estaba corriendo en `localhost:3000` (puerto ocupado por un proceso preexistente, no iniciado por esta auditoría) y respondió `200`. No hay Playwright ni un navegador instalable en este entorno sin violar la regla de "no instalar nada", así que **no se tomó captura de pantalla real**. La auditoría se hizo leyendo `page.js`, los 4 componentes de Home, `globals.css` y `layout.js` línea por línea, y **cruzando cada clase CSS usada en el JSX contra las reglas definidas en `globals.css`** para detectar layout roto o no aplicado — este cruce es un método objetivo, no una impresión visual, y varias de las conclusiones de esta auditoría son directamente verificables reconstruyendo ese cruce.

---

## 1. Resumen ejecutivo

La Home actual **no es un atlas**. Es un formulario de selección geográfica envuelto en una landing page de producto SaaS: hero con contador de estadísticas, franja de features con íconos genéricos, grilla de tarjetas de texto, y una sección final que mezcla "artículos" falsos con un panel lateral de estado técnico. No hay una sola imagen, ilustración o mapa real en todo el proyecto. El estado interno `NO_IMPLEMENTADO` se filtra al usuario final en al menos **siete lugares distintos** de la misma pantalla. Y hay una inconsistencia de código concreta y verificable: varias secciones clave (`home-intro`, `home-env`, `category-section`) usan clases que **no tienen ninguna regla CSS asociada**, es decir, se renderizan sin el layout que la propia hoja de estilos ya diseñó para ellas (evidencia en `home-intro` vs. `.hero`, ver §22 y anexo técnico). Esto no es una opinión de gusto: es una Home que documentalmente aspira a "atlas/biblioteca visual/producto editorial" (`01_PRODUCT.md`, `02_UX.md`) y que en código se construyó, sin querer, como un dashboard de infraestructura con estética prestada de sitio de gobierno.

La buena noticia: la paleta de color base (verdes salvia, tierras, papel crema) ya evita el cliché "hoja de cannabis" y el CSS contiene, sin usar, los restos de una idea mejor — un tratamiento de "mapa" abstracto tipo blob con etiquetas de región flotantes (`.map-frame`, `.map-surface`, `.map-region`) que fue reemplazado por un formulario de autocompletado y nunca se borró. Esa pista es el punto de partida real de la nueva dirección visual.

## 2. Crítica brutal de la Home actual

**Primera impresión (3-5 segundos, evaluado sobre el código real, no una opinión sin base)**: un visitante entra y ve un encabezado con el nombre del proyecto + el subtítulo "Geografía · Clima · Contenido", un titular enorme en serif ("El cultivo cambia según dónde estés"), dos botones, tres números grandes ("24 Jurisdicciones", "6+ Regiones editoriales", "16 Categorías") y, al lado, una tarjeta con tres campos de formulario (Provincia / Departamento-Partido / Zona aproximada) con autocompletado. Eso es exactamente la anatomía de una landing page de producto B2B o de un portal de datos abiertos de gobierno — **no la de un atlas ni una biblioteca visual**. No hay ninguna imagen, ilustración ni mapa real en pantalla. La única pista de "geografía" es un breadcrumb de texto en mayúsculas.

**Qué funciona**: la premisa está bien escrita ("El cultivo cambia según dónde estés" es clara, corta, no promocional). El botón de "Explorar sin elegir" existe y está al mismo nivel jerárquico que el de explorar con ubicación, coherente con `02_UX.md`. La paleta de color no cae en el cliché "weed shop".

**Qué no funciona**: cero contenido visual, el mapa no es un mapa, el widget de clima expone su nombre de estado interno como si fuera contenido, y la composición completa es una sucesión de bloques con tarjeta-borde-sombra sin ninguna variación de escala, ritmo o material — siete secciones seguidas que "pesan" casi lo mismo.

**Qué confunde**: la tarjeta de "artículo" titulada "Panel Ambiental" con el cuerpo "Estado separado y futuro, todavía NO_IMPLEMENTADO." se presenta con el mismo formato exacto que un artículo real de enciclopedia — un usuario nuevo no tiene forma de distinguir "esto es contenido educativo real" de "esto es una nota interna sobre el estado del proyecto". El nav pone "Mi Cultivo" al mismo nivel visual que "Enciclopedia", sin ninguna marca de que requiere cuenta.

**Qué sobra**: el contador de estadísticas estilo landing page ("24 Jurisdicciones"), la franja de tres íconos genéricos ("Sistema geográfico / Climatología / Enciclopedia"), y la sección de "artículos" ficticios que en realidad describen la arquitectura del propio sitio en vez de dar contenido real al usuario.

## 3. Problemas críticos

1. **`NO_IMPLEMENTADO` es lenguaje interno filtrado al usuario, repetido siete veces en una sola pantalla** (`page.js`: encabezado de la sección "Panel ambiental" y su `panel-status`; `EnvironmentalPanel.js`: badge de cabecera, fila "Estado", fila "Datos meteorológicos", fila "Condiciones relevantes"; `page.js`: cuerpo del artículo falso "Panel Ambiental"; `page.js`: `stat-value` del sidebar "Clima"). Esto es exactamente lo que el propio encargo cita como ejemplo de lo que nunca debe ver un usuario.
2. **El mapa no existe.** `GeoSelector.js` es un `<form>` con tres `<input list="...">` (HTML5 autocomplete/datalist). No hay SVG, canvas, ni ninguna representación gráfica de Argentina. El "mapa" es, literalmente, texto.
3. **El flujo expone "Departamento/Partido" como paso de navegación visible y como campo de formulario independiente** (`geo-path` lo lista como un nodo más del breadcrumb; el input de Departamento/Partido está habilitado y es editable apenas se elige provincia). Esto contradice directamente `22_HOME_EXPERIENCE.md` §4, que especifica que el departamento/partido es una capa de datos invisible para el usuario, nunca un paso de interacción.
4. **Layout roto/no aplicado en secciones estructurales clave.** Cruce verificado clase por clase: `home-intro`, `home-intro-copy`, `home-env`, `home-frame`, `home-frame-heading` y `category-section` (los contenedores de la sección hero y de la sección del Panel Ambiental) **no tienen ninguna regla CSS definida en `globals.css`**. La grilla de dos columnas que sí existe en el CSS (`.hero`, `.hero-content`, `.hero-copy`) nunca se aplica porque el JSX usa nombres de clase distintos. Esto significa que, en el código actual, la Home probablemente no logra ni siquiera el layout de dos columnas que el propio CSS ya diseñó — se cae a bloques apilados sin querer, en desktop y en mobile por igual.
5. **Cero contenido visual en todo el proyecto.** `find` sobre `public/` no devuelve ningún archivo; no hay `.png`, `.jpg`, `.svg` ni `.webp` en el repositorio fuera de `node_modules`. `06_VISUAL.md` diseña un sistema de biblioteca visual con fotografía/ilustración por categoría — la Home actual no usa ninguna imagen, ni siquiera un placeholder o patrón gráfico.
6. **La tipografía "distintiva" es invisible para la mayoría de los usuarios reales.** `--font-serif: "Iowan Old Style", "Times New Roman", serif` — "Iowan Old Style" es una fuente exclusiva de macOS/iOS. En Windows y Android (la mayoría del tráfico esperado en Argentina) el fallback real es Times New Roman sin ninguna carga de fuente propia (`layout.js` no importa ninguna fuente vía `next/font` ni `<link>`). El titular de 72-118px que se ve en desarrollo probablemente no es el que verá la mayoría de los usuarios en producción.
7. **"Clima" se presenta como pilar de marca, no como panel secundario.** El subtítulo de marca es literalmente "Geografía · Clima · Contenido" y "Clima" es un ítem de nav principal — contradice directamente la premisa "esto no debe sentirse como una app del clima" del propio encargo, más allá de que el mapa en sí no tenga datos meteorológicos.

## 4. Problemas secundarios

- El header mezcla ítems públicos y privados sin distinción visual ("Mi Cultivo" junto a "Enciclopedia").
- Los "íconos" son glifos Unicode genéricos (◇ ✦ ☰ ◌ ☼ ⇄ ✉), no un sistema de iconografía real — funcionan como relleno tipográfico, no como lenguaje visual.
- Las opciones de "zona" en el selector están hardcodeadas por provincia en el propio componente (`zoneExamples`) con nombres que suenan definitivos ("Valle de Uco", "Puna", "Yungas") sin ningún indicador de que son ejemplos/placeholder — riesgo de que un usuario o un revisor los lea como el catálogo real ya cerrado.
- Hay CSS completamente huérfano (`panel-card`, `map-frame`, `map-surface`, `location-form`, `form-field` — cero usos en JSX): evidencia de una iteración de diseño anterior, más visual, que fue abandonada sin limpiar.
- El patrón "micro-label uppercase con letter-spacing" (`panel-kicker`, `section-label`, `geo-label-text`, `strip-text`, `access-text`, `stat-label`, `category-tag`) se repite en al menos ocho componentes distintos — cuando todo es una etiqueta destacada, nada lo es.

## 5. Qué funciona (para no destruir sin criterio)

- El copy del hero ("El cultivo cambia según dónde estés") es preciso y no promocional.
- La paleta base (verdes salvia/oliva, tierras, papel crema) es una elección razonable que evita el cliché de dispensario — merece conservarse como punto de partida de color.
- El botón "Explorar sin elegir ubicación" existe y está al mismo nivel que el flujo con ubicación — respeta el principio de no bloquear la exploración.
- El Panel Ambiental ya vive en su propia sección/componente separado del mapa (aislamiento correcto a nivel de arquitectura de componentes, aunque el copy que muestra sea el problema).
- El endpoint `/api/geo` y el modelo de datos detrás del selector ya reflejan la jerarquía correcta (`03_GEO.md`/D1) — el problema es de presentación, no de datos.

## 6. Qué eliminar (sección obligatoria, sin diplomacia)

- El contador de estadísticas del hero ("24 Jurisdicciones / 6+ Regiones editoriales / 16 Categorías"). Es lenguaje de landing page de producto, no de atlas editorial. Fuera.
- La franja de tres íconos genéricos ("Sistema geográfico / Climatología / Enciclopedia"). No aporta nada que la navegación y las secciones de abajo no digan mejor con contenido real.
- Los "artículos" ficticios de `content-grid` que describen la arquitectura del sitio ("Panel Ambiental — todavía NO_IMPLEMENTADO", "Enciclopedia editorial — Publicación estructurada..."). Esto no es contenido para el usuario, es una nota de desarrollo disfrazada de artículo. Fuera de la Home por completo hasta que exista contenido real de enciclopedia que mostrar ahí.
- El sidebar "Región actual" con `stat-value` mostrando literalmente "NO_IMPLEMENTADO". Fuera tal como está.
- Toda aparición literal de la cadena `NO_IMPLEMENTADO` en el DOM visible al usuario, sin excepción.
- El campo de formulario "Departamento/Partido" como input visible e independiente, y su nodo correspondiente en el breadcrumb `geo-path`.
- Los glifos Unicode usados como "iconografía" (◇ ✦ ☰ ◌ ☼ ⇄ ✉) — o se reemplazan por un sistema real de iconos/ilustración, o se eliminan y se resuelve con tipografía y color.
- El CSS huérfano (`panel-card`, `map-frame`, `map-surface`, `location-form`, `form-field`) debe **reciclarse** (ver §8) o eliminarse — no debe quedar código muerto que documente una dirección que no se tomó.

## 7. Qué conservar

- La paleta de color base y sus variables (`--sage-*`, `--soil`, `--clay`, `--cream`, `--paper`).
- El copy del hero y el principio "explorar sin elegir ubicación".
- La separación del Panel Ambiental como sección/componente propio (arquitectura correcta, contenido a rehacer).
- El endpoint `/api/geo` y el modelo `provincia → departamento/partido → zona` como fuente de datos (no tocar el contrato, solo la presentación).
- El patrón de botón píldora (`primary-button`/`secondary-button`) como lenguaje de acción — es limpio y no necesita reinventarse.

---

## 8. Nueva dirección visual: **RELIEVE**

**Concepto**: "relieve" es la palabra que describe tanto la topografía física de un territorio (altura, quebradas, llanura, cordillera) como la idea de que algo "se destaca" — es exactamente la metáfora del producto: la información se define por el relieve real del país, no por una plantilla uniforme. Evita cualquier asociación con cannabis, con SaaS o con gobierno, y suena a producto editorial serio (piense en cómo un atlas físico o una revista de geografía nombraría una sección).

**Personalidad**: cartográfico, táctil, editorial, seco en el copy (sin signos de exclamación, sin lenguaje de marketing), con una sola voz tipográfica fuerte (el titular) y todo lo demás subordinado a ella.

**Principios**:
1. El mapa es el objeto más importante de la Home — nunca un formulario disfrazado de mapa.
2. Ninguna palabra que un ingeniero usaría para describir un estado de sistema (`NO_IMPLEMENTADO`, `PARTIAL_RESEARCH`, `contrato`, `endpoint`) puede aparecer en el DOM visible al usuario, bajo ninguna circunstancia.
3. Una tarjeta con imagen vale más que tres tarjetas de texto — toda categoría o zona debe tender hacia una superficie fotográfica/ilustrada, no hacia una lista con borde redondeado.
4. El ritmo visual se construye alternando densidad (una sección de mucho texto seguida de una sección de mucho blanco/imagen), nunca repitiendo el mismo módulo de tarjeta seis veces seguidas.
5. El clima nunca comparte titular, subtítulo de marca ni nivel de nav principal con la geografía — vive un escalón más abajo, siempre.

**Paleta conceptual** (ajusta la ya existente, no la reinventa desde cero):
- Fondo principal: papel crema cálido (ya existe, `--paper`) — se mantiene.
- Fondo secundario: un tono topográfico más oscuro (verde oliva profundo, no el gris genérico `--paper-soft` actual) reservado *solo* para la sección del mapa, para que el mapa tenga un "terreno" propio distinto del resto de la página.
- Texto principal: verde muy oscuro casi negro (ya existe, `--text`) — se mantiene.
- Color de acción (CTA): el verde salvia profundo actual (`--sage-deep`) — se mantiene, es sobrio y funciona.
- Color de selección (provincia/zona activa): un tono tierra/arcilla (`--clay`/`--soil` ya definidos, hoy sin uso real) — se activa específicamente para marcar "esto está seleccionado" en el mapa y en el chip de ubicación, para no confundirlo con el verde de acción genérico.
- Color de alerta (reservado exclusivamente para el Panel Ambiental cuando exista dato real, ej. helada): un tono distinto de los anteriores (a definir en construcción, pero **nunca** verde ni salvia — el verde ya significa "acción/marca" en el resto del sitio, reusarlo para alertas climáticas generaría ambigüedad).
- Uso del color en el mapa: **solo dos estados** — provincia neutra (tono terreno base) y provincia seleccionada (tono arcilla/clay) — nunca una escala de color por variable ambiental.

**Tipografía conceptual**:
- Mantener la idea de una serif editorial de gran escala para el titular, pero cargarla realmente (vía `next/font` o self-host) en vez de depender de una fuente de sistema exclusiva de Apple — si no se carga una fuente real, usar una serif de sistema verdaderamente universal en vez de fingir una que la mayoría no verá.
- Reducir drásticamente el uso del patrón "micro-label uppercase con tracking" — reservarlo para un solo rol (el "kicker" de sección), no reutilizarlo en ocho componentes distintos sin distinción.
- Los números (24 provincias, etc.) si se usan, deben aparecer *dentro* de contenido real (ej. en el pie de una página de provincia: "12 artículos regionales para esta zona"), nunca como bloque de estadísticas de landing page en la Home.

**Composición**: editorial, no modular-dashboard — ver wireframes en §9-10.

**Mapa**: representación cartográfica real de Argentina (aunque sea una ilustración simplificada/vectorial propia en la primera versión, no un mapa de calles) — nunca un formulario. El formulario de búsqueda por texto **coexiste** como alternativa accesible, pero no reemplaza al mapa como protagonista visual.

**Navegación**: "Mi Cultivo" se separa visualmente del resto del nav (agrupado a la derecha, con un tratamiento distinto — ej. dentro de un menú de cuenta) en vez de listarse en línea junto a "Enciclopedia". "Clima" desaparece del nav principal y de la marca; el acceso al clima vive dentro de la página de zona y del propio Panel Ambiental, no como sección de nivel superior.

**Selección geográfica**: el mapa es el mecanismo primario; el buscador de texto es el mecanismo alternativo/accesible, presentado como tal (no como el mecanismo por defecto). El departamento/partido deja de ser un campo visible.

**Panel Ambiental**: ver especificación completa en §13 — la clave de esta dirección es que su estado "no disponible todavía" se comunica con lenguaje humano y con una superficie visual distinta (no una fila de tabla con un estado en mayúsculas).

**Categorías**: tarjetas con imagen/ilustración dominante (60-70% de la tarjeta), título y una palabra de categoría — no descripciones largas en la vidriera (la descripción larga vive en la página de la categoría).

**Footer**: se mantiene simple, pero se separa visualmente del resto (ya lo está, con fondo oscuro) — sin cambios mayores necesarios.

**Responsive**: ver §14 y wireframe mobile en §11.

**Interacción**: ver §21.

---

## 9. Arquitectura visual de Home (orden de secciones recomendado)

```
HEADER (marca + nav pública, cuenta separada a la derecha)
  ↓
HERO CARTOGRÁFICO (titular + mapa real, sin contador de estadísticas)
  ↓
CONTEXTO DE UBICACIÓN (chip/resumen de lo elegido, aparece solo tras seleccionar)
  ↓
PANEL AMBIENTAL (siempre visible, con su estado honesto, nunca con jerga técnica)
  ↓
CATEGORÍAS DEL ATLAS (vidriera visual, imagen-dominante)
  ↓
EXPLORACIÓN SECUNDARIA (biblioteca visual, calendario, comparador — accesos, no tarjetas de feature)
  ↓
NEWSLETTER (invitación breve, sin checkbox premarcado)
  ↓
FOOTER
```

Diferencia clave contra el orden actual: se elimina la franja de features y el bloque de "artículos" ficticios; el mapa pasa a ser el hero en sí (no comparte hero con un formulario ni con contadores).

## 10. Wireframe textual — Desktop

```
┌──────────────────────────────────────────────────────────────────┐
│ [Marca]         Inicio  Enciclopedia  Clima¹  Comparar   [Cuenta▾]│
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│   El cultivo cambia según dónde estés.        ┌──────────────┐   │
│   (deck corto, 1-2 líneas)                    │              │   │
│                                                │  MAPA REAL   │   │
│   [Explorar provincias]  [Explorar sin elegir]│  DE ARGENTINA│   │
│                                                │  (ilustrado, │   │
│                                                │  clickeable) │   │
│                                                └──────────────┘   │
│                                                 Buscar provincia  │
│                                                 [___________]     │
├──────────────────────────────────────────────────────────────────┤
│  (solo si ya eligió ubicación)                                    │
│  Estás viendo: Mendoza · Valle de Uco  [Cambiar]                  │
├──────────────────────────────────────────────────────────────────┤
│  PANEL AMBIENTAL                                                   │
│  ┌────────────────────────────┐  ┌────────────────────────────┐  │
│  │ Contexto: Mendoza·Valle Uco │  │ "Todavía no tenemos datos   │  │
│  │ (estado real cuando exista) │  │  meteorológicos para tu     │  │
│  │                              │  │  zona. Mientras tanto, así  │  │
│  │                              │  │  es el clima típico acá:"  │  │
│  └────────────────────────────┘  └────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│  CATEGORÍAS DEL ATLAS                                              │
│  [img]Fundamentos  [img]Suelo y agua  [img]Luz y clima             │
│  [img]Sanidad      [img]Cultivo       [img]Cosecha    [img]Legal   │
├──────────────────────────────────────────────────────────────────┤
│  Biblioteca visual · Calendario · Comparar zonas   (accesos,      │
│  no tarjetas de feature — íconos + texto simple, en línea)        │
├──────────────────────────────────────────────────────────────────┤
│  Newsletter (una línea + input + botón)                            │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER                                                             │
└──────────────────────────────────────────────────────────────────┘
```
¹ "Clima" no aparece como ítem de nav de primer nivel en la dirección recomendada (ver §8) — se muestra acá solo para dejar registrada la alternativa descartada; la recomendación final es quitarlo del nav principal y dejarlo accesible desde la página de zona y el Panel Ambiental.

## 11. Wireframe textual — Mobile

```
┌───────────────────────┐
│ [Marca]        [☰ Menú]│
├───────────────────────┤
│ El cultivo cambia       │
│ según dónde estés.      │
│ (deck corto)             │
├───────────────────────┤
│  MAPA REAL (compacto,   │
│  tappable, altura fija) │
├───────────────────────┤
│ Buscar provincia         │
│ [__________________]    │
│ [Explorar sin elegir]   │
├───────────────────────┤
│ (si hay ubicación)      │
│ Mendoza · Valle de Uco  │
│ [Cambiar]                │
├───────────────────────┤
│ PANEL AMBIENTAL          │
│ (tarjeta compacta,       │
│ mensaje honesto si       │
│ no hay datos todavía)    │
├───────────────────────┤
│ CATEGORÍAS               │
│ (scroll horizontal de    │
│ tarjetas con imagen,     │
│ no grilla apretada)      │
├───────────────────────┤
│ Accesos secundarios       │
│ (lista simple, no cards) │
├───────────────────────┤
│ Newsletter                │
├───────────────────────┤
│ Footer                    │
└───────────────────────┘
```
Diferencias clave mobile: el buscador de texto sube por encima del mapa en jerarquía táctil (más fácil de usar con el dedo que acertar una provincia chica), las categorías pasan a scroll horizontal en vez de grilla de 2 columnas apretada, y los accesos secundarios dejan de ser tarjetas con borde/sombra para ser una lista limpia (menos "ruido de tarjeta" en una pantalla angosta).

## 12. Estados de Home

- **STATE A — Primer ingreso, sin ubicación**: mapa neutro (todas las provincias en el tono "terreno base"), sin chip de ubicación, Panel Ambiental en su mensaje explicativo ("elegí una ubicación para ver esto"), categorías visibles igual (no dependen de ubicación).
- **STATE B — Provincia seleccionada**: la provincia elegida cambia a color "arcilla" en el mapa, aparece el chip "Estás viendo: [Provincia] — Cambiar", se despliega una lista corta de zonas de esa provincia (no un input de texto nuevo, una lista de opciones clickeables), Panel Ambiental pasa a su mensaje de "todavía sin datos para tu zona" si corresponde.
- **STATE C — Provincia + zona seleccionada**: chip actualizado ("Mendoza · Valle de Uco"), Panel Ambiental muestra contexto de zona específico, bloques "En tu zona" listos para activarse en cualquier artículo.
- **STATE D — Ubicación con clima disponible** (futuro, cuando exista proveedor): Panel Ambiental muestra los 4 bloques reales (dato crudo / condición relevante / contenido relacionado / disclaimer), con una superficie visual claramente distinta a los estados sin dato (ej. un borde o encabezado de color que solo aparece cuando el dato es real).
- **STATE E — Ubicación sin clima disponible** (estado actual real del proyecto): mensaje humano y honesto ("Todavía no tenemos pronóstico para tu zona — estamos trabajando en conectar una fuente de datos"), nunca la palabra `NO_IMPLEMENTADO`, nunca un dato inventado, opcionalmente mostrando climatología de referencia general si existe.

## 13. Panel Ambiental (especificación visual, sin datos reales)

- **Posición**: inmediatamente debajo del bloque de ubicación, ancho completo o en tarjeta destacada — nunca metido dentro del mapa ni compartiendo borde con él.
- **Tamaño/importancia**: segundo elemento en peso visual de la Home (después del mapa), pero con una superficie visualmente **distinta** al resto de las tarjetas del sitio (para que el usuario entienda que es "vivo/dinámico", no editorial estático) — ej. un tratamiento con textura o color de fondo propio, no el mismo `--paper-soft` que usan todas las demás tarjetas.
- **Qué prioriza**: cuando haya dato real, la condición relevante (la etiqueta corta, "riesgo de helada") es lo primero que se lee — el dato crudo (temperatura exacta) es secundario, no protagonista, porque el valor para el usuario es la interpretación por umbral, no el número en sí.
- **Qué oculta**: nunca muestra el nombre del proveedor, ni "estado: X", ni ninguna palabra que suene a configuración de sistema. La ausencia de dato se comunica en una oración completa y humana, no en una fila de tabla con una palabra en mayúsculas.
- **Cómo evitar que parezca app de clima**: sin ícono de sol/nube/termómetro como elemento decorativo repetido, sin la estética típica de "widget de clima" (fondo celeste, iconografía meteorológica genérica) — usa la misma paleta tierra/editorial del resto del sitio, con un único acento de color reservado para cuando hay una condición relevante activa.

## 14. Mapa

- **Tamaño/protagonismo**: el elemento más grande del hero, no una tarjeta lateral chica.
- **Contexto**: vive dentro del hero, junto al titular — es la ilustración del "dónde estés" del titular, no un widget aparte.
- **Interacción**: clic en provincia → resalta esa provincia (color arcilla) y despliega la lista corta de zonas debajo o al costado, sin navegar a otra página todavía.
- **Relación con el título**: el titular dice "El cultivo cambia según dónde estés" — el mapa es la prueba visual inmediata de esa frase (regiones visualmente distintas), no un dato suelto al lado.
- **Estética**: ilustrado/vectorial propio (no un mapa de calles ni un mapa de datos abiertos genérico) — con tono editorial, coherente con la paleta de RELIEVE.
- **Densidad**: bajo — solo contornos de provincia, sin ruido de líneas de ruta, ríos, ciudades, etc. en la vista general.
- **¿Parece un mapa real o un selector técnico?** Hoy: selector técnico (formulario). Objetivo: mapa real reconocible como Argentina a simple vista, con el formulario de texto como alternativa secundaria visible pero no protagonista.

## 15. Geografía (flujo de selección)

- El flujo actual "parece formulario" porque literalmente lo es (tres inputs de texto secuenciales). Debe sentirse como **exploración**: clic en el mapa → lista corta de zonas con nombre reconocible → selección.
- El departamento/partido deja de tener presencia visual — sigue existiendo como dato (`/api/geo` no cambia), pero no como campo ni como nodo de breadcrumb.
- Después de elegir provincia: debe aparecer inmediatamente una lista compacta de zonas (no otro campo de texto vacío para llenar) — reduce la sensación de "formulario burocrático" a "menú de opciones".
- Cómo mostrar una ubicación ya elegida: un chip persistente y discreto en el header o justo debajo del hero, con opción de cambiar en un clic — nunca un panel lateral grande tipo "ficha técnica" (como el `sidebar-card` actual con `stat-list`).

## 16. Categorías

**Identificación actual**: menú de enlaces con descripción — no biblioteca, no atlas, no enciclopedia visual. Son tarjetas de texto con número, tag y dos líneas de descripción; ninguna imagen.

**Dirección recomendada**: cada categoría macro es una tarjeta dominada por una imagen o ilustración representativa (60-70% del área de la tarjeta), con el título superpuesto o inmediatamente debajo, y sin descripción larga en la vidriera (la descripción vive en la página de la categoría). Mientras no exista fotografía real (`06_VISUAL.md` todavía no generó ni descargó ninguna), la alternativa honesta de transición es una **ilustración/patrón gráfico propio por categoría** (una textura o forma abstracta asociada a cada tema — ej. un patrón de hojas para Fundamentos, un patrón de gotas para Agua) en vez de dejar la tarjeta en texto puro. Nunca usar una foto de stock genérica de "planta de cannabis" como placeholder — sería exactamente la estética que el proyecto busca evitar.

**Agrupamiento**: las 7 áreas macro definidas en `22_HOME_EXPERIENCE.md` §10 se mantienen — el problema no es la taxonomía, es la ausencia total de tratamiento visual.

**Hover**: en desktop, el hover puede revelar la descripción breve (hoy visible siempre) — así la vista por defecto es limpia y visual, y el detalle aparece solo al interactuar.

**Mobile**: scroll horizontal de tarjetas grandes en vez de grilla apretada de 2 columnas — prioriza que cada tarjeta se vea bien (imagen grande) por sobre mostrar las 7 al mismo tiempo.

## 17. Tipografía

- **Personalidad**: una serif con carácter para titulares (mantiene la idea actual), pero **cargada de verdad** (`next/font` con una fuente real y libre, o self-hosted) — no una fuente de sistema exclusiva de una plataforma.
- **Jerarquía**: hoy hay un solo salto real (el titular gigante) y luego todo cae a un mismo nivel de "micro-label uppercase" — se necesita un escalón intermedio real (subtítulos de sección en serif mediano, ej. 28-36px) entre el titular y las etiquetas chicas.
- **Longitud de línea**: el deck del hero (`hero-lede`) tiene `max-width: 620px`, razonable — mantener ese criterio en el resto del copy largo (artículos).
- **Mayúsculas**: usadas hoy en exceso (ocho componentes con el mismo patrón de label uppercase) — reservar mayúsculas + tracking solo para un rol único y consistente (el "kicker" de sección), no para tags, no para botones, no para nav.
- **Números**: si se muestran cifras grandes (conteos, fechas), usar la serif de titulares para que se sientan "editorial" y no "dashboard" (esto ya se hace bien en `.proof-number` — el problema no es el tratamiento tipográfico del número, es que el bloque de estadísticas no debería existir en la Home, ver §6).

## 18. Color

Ver paleta conceptual completa en §8. Resumen de reglas de uso:
- Fondo principal: papel crema (mantener).
- Fondo secundario reservado para el mapa: un verde-oliva más oscuro y "de terreno", distinto del gris verdoso genérico usado hoy en todas las tarjetas por igual.
- Texto principal/secundario: mantener los tonos actuales de verde oscuro.
- Acción (CTA): salvia profundo (mantener).
- Selección geográfica activa: tierra/arcilla (`--clay`/`--soil`, hoy definidos pero sin uso real) — se activa específicamente para esto, dándole un rol propio que hoy no tiene.
- Alerta/condición climática relevante: un color nuevo, distinto del verde de marca (a definir en construcción) — nunca el mismo verde que ya significa "acción".
- Mapa: solo 2 estados de color (neutro / seleccionado), nunca escala por variable ambiental.

## 19. Componentes — política KEEP / REDUCE / REMOVE / REPLACE

| Componente/patrón | Política | Motivo |
|---|---|---|
| Botón píldora (primary/secondary) | **KEEP** | Limpio, consistente, no necesita cambio |
| Paleta de color base | **KEEP** | Ya evita el cliché, solo falta variar su aplicación |
| Chip de ubicación | **KEEP** (conceptual, falta implementar bien) | Ya especificado en `22_HOME_EXPERIENCE.md`, no implementado como tal hoy |
| Tarjetas con borde 1px + sombra suave + radio grande | **REDUCE** | Usado en 6+ contextos distintos sin variación — perder distinción |
| Micro-labels uppercase con tracking | **REDUCE** | Sobreusado en 8 componentes, pierde jerarquía |
| Formulario de 3 inputs de texto para geografía | **REPLACE** | Por mapa interactivo + lista de zonas tras elegir provincia |
| Breadcrumb "Argentina → Provincia → Departamento/Partido → Zona" como texto visible | **REPLACE** | El departamento/partido no debe ser visible (ver §3/§15) |
| Contador de estadísticas del hero | **REMOVE** | Lenguaje de landing page, no de atlas |
| Franja de 3 íconos genéricos | **REMOVE** | No aporta sobre lo que ya dice la navegación |
| "Artículos" ficticios sobre la arquitectura del sitio | **REMOVE** | Confunden contenido real con notas de desarrollo |
| Glifos Unicode como iconografía | **REPLACE** | Por un sistema real de íconos o por tipografía/color puro |
| Sidebar "Región actual" con `stat-list` técnico | **REMOVE** (tal como está) | Expone estado interno; su función (mostrar ubicación activa) la cumple mejor el chip |
| CSS huérfano (`map-frame`, `map-surface`, `panel-card`, `location-form`, `form-field`) | **REDUCE** → reciclar como base del mapa real o eliminar | Ya es la semilla de una idea mejor, no debe perderse ni quedar muerto |

## 20. Fotografía / imagen

**Proporción actual texto vs. imagen: prácticamente 100% texto.** Esto es un desvío severo respecto de la ambición de `01_PRODUCT.md`/`06_VISUAL.md` ("biblioteca visual", "producto editorial y visual"). Definición de qué debería ser cada cosa:
- **Fotográfico**: fotos reales de plantas/etapas/plagas en la biblioteca visual y en artículos de enciclopedia (pendiente de banco de imágenes, `06_VISUAL.md` ya lo marca como TODO).
- **Ilustrado**: el mapa de Argentina, los patrones/texturas de categoría mientras no haya fotografía real, diagramas de ciclo de vida/fotoperiodo.
- **Cartográfico**: el mapa en sí, y cualquier visual de comparación de zonas (§17 del blueprint original, comparador).
- **Tipográfico**: el titular del hero, los números si se usan en contexto real (no como bloque de estadísticas suelto).
- **Interactivo**: el mapa (clic/hover por provincia), el Panel Ambiental cuando tenga datos reales.

## 21. Microinteracciones (solo las necesarias)

- Selección de provincia en el mapa: resaltado inmediato de color (sin animación larga) + aparición de la lista de zonas.
- Cambio de contexto (cambiar ubicación desde el chip): transición corta de contenido, no recarga completa de página.
- Hover de categoría: revelar descripción breve o cambiar estado de la imagen (ej. leve zoom), nada más elaborado.
- Entrada al Atlas (clic en una categoría o zona): transición simple de página, sin efectos decorativos.
- Evitar: animaciones de entrada tipo "fade-in-up" en cascada sobre cada tarjeta de la página (patrón muy común en landing pages, refuerza la sensación de "producto SaaS" que se quiere evitar), parallax, contadores animados de números.

## 22. Copy / lenguaje

**Lenguaje técnico detectado que un usuario nunca debería ver**: `NO_IMPLEMENTADO` (7 apariciones), el propio breadcrumb con "Departamento/Partido" en mayúsculas técnicas, `geo-source-note` mostrando literalmente "Cargando contrato geográfico" (¡la palabra "contrato" en la interfaz pública!), y el `meta-tag` que imprime `geoSource.model?.geographic_hierarchy?.join(' → ')` — es decir, **una estructura de datos interna concatenada y mostrada tal cual al usuario** si la respuesta de `/api/geo` llega antes de que el usuario interactúe. Esto es el ejemplo más grave de fuga de lenguaje técnico de toda la auditoría.

**Tono definido**: argentino sin modismos forzados, claro, editorial, inteligente, cercano sin ser infantil, nunca corporativo ("simplificamos tu experiencia") ni académico excesivo.

**Ejemplos de microcopy de reemplazo**:
- En vez de "Cargando contrato geográfico" → "Cargando el mapa..."
- En vez de "NO_IMPLEMENTADO" (Panel Ambiental sin ubicación) → "Elegí una provincia para ver el contexto ambiental de tu zona."
- En vez de "NO_IMPLEMENTADO" (Panel Ambiental con ubicación, sin proveedor) → "Todavía no tenemos pronóstico para Valle de Uco. Estamos trabajando en sumar esta información."
- En vez de "Estado: NO_IMPLEMENTADO" (encabezado de sección) → directamente eliminar el badge de estado del encabezado de sección; el mensaje del punto anterior ya comunica lo mismo sin jerga.
- En vez de "Argentina → Provincia → Departamento/Partido → Zona aproximada" (breadcrumb técnico) → "Elegí tu provincia y, si querés, tu zona" (una frase, no una ruta de datos).
- En vez del artículo falso "Panel Ambiental — Estado separado y futuro, todavía NO_IMPLEMENTADO" → eliminar esa tarjeta de la Home (ver §6).

## 23. Responsive

Ver wireframes en §10-11. Diferencias que hoy **no existen realmente** en el código (la sección hero no tiene ninguna regla de grid, así que probablemente ya se ve igual en mobile y desktop, ver §3 problema 4) y que la nueva dirección exige:
- Mobile: buscador de texto por encima del mapa en prioridad táctil; categorías en scroll horizontal; accesos secundarios como lista simple, no tarjetas.
- Desktop: mapa y contenido conviven en el mismo viewport sin scroll para ver la propuesta completa; categorías en grilla multi-columna con imagen grande.
- En ambos: cero apariciones de `NO_IMPLEMENTADO` o jerga técnica, sin excepción de breakpoint.

## 24. Design system conceptual

- **Colores**: ver §8/§18 — base actual + rol nuevo para `--clay`/`--soil` (selección) y un color de alerta climática todavía no definido.
- **Tipografía**: serif editorial real (cargada, no de sistema) para titulares; sans para UI/datos (mantener `Inter` como base sans); un tercer nivel de jerarquía intermedio (subtítulos de sección) que hoy no existe.
- **Escala tipográfica**: mantener el rango grande del hero, pero introducir un escalón medio (28-36px) hoy ausente entre el titular y las etiquetas de 10-11px.
- **Spacing**: mantener el ritmo de `--max-width: 1400px` y el padding lateral actual; introducir más variación vertical entre secciones (hoy casi todas las secciones usan el mismo margen, reforzando la monotonía).
- **Border radius**: hoy hay dos familias (10px en inputs/tarjetas chicas, 24-30px en tarjetas grandes/paneles) — mantener esa distinción, pero no aplicarla a absolutamente todo (el mapa, por ejemplo, no necesita el mismo radio que un botón).
- **Sombras**: usadas de forma uniforme hoy (`box-shadow` suave en casi toda tarjeta) — reservar sombra para elementos flotantes/interactivos reales (el chip de ubicación, el Panel Ambiental cuando tiene datos), no para toda superficie con borde.
- **Botones**: mantener el lenguaje píldora actual.
- **Cards**: reducir su uso general (ver §19); cuando se usen, variar tamaño/proporción según contenido (una card de categoría con imagen no debería tener las mismas proporciones que una card de acceso secundario).
- **Íconos**: sustituir los glifos Unicode por un sistema real (aunque sea simple/lineal) o eliminarlos.
- **Imágenes**: formato moderno (ya definido en `06_VISUAL.md`), tratamiento documental/botánico, nunca lifestyle de consumo.
- **Mapas**: paleta de solo 2-3 tonos (neutro/seleccionado/hover), sin gradientes decorativos tipo el `map-frame` actual (que es un blob abstracto, no un mapa reconocible — útil como semilla de estilo, no como forma final).
- **Estados**: todo estado sin dato real se comunica en lenguaje humano completo, nunca con una palabra en mayúsculas tipo enum.

## 25. Must / Should / Nice

**MUST HAVE** (sin esto, la Home sigue sin identidad):
- Eliminar toda aparición de `NO_IMPLEMENTADO` y de cualquier término técnico (`contrato`, `geographic_hierarchy`, etc.) del DOM visible.
- Quitar el campo/nodo visible de "Departamento/Partido".
- Arreglar el layout roto de `home-intro`/`home-env` (aplicar reglas CSS reales a las clases que usa el JSX, o alinear JSX y CSS).
- Reemplazar el formulario de 3 inputs por mapa + lista de zonas tras elegir provincia.
- Quitar el bloque de estadísticas, la franja de features y los "artículos" ficticios.

**SHOULD HAVE** (mejora sustancial, no bloqueante):
- Cargar una fuente serif real en vez de depender de una fuente de sistema exclusiva de Apple.
- Introducir imágenes/ilustraciones reales o patrones gráficos por categoría en vez de tarjetas 100% texto.
- Reemplazar los glifos Unicode por un sistema de íconos real.
- Separar visualmente "Mi Cultivo" del resto del nav.

**NICE TO HAVE** (pulido):
- Mapa ilustrado propio con estilo distintivo (más allá de un mapa funcional básico).
- Microinteracciones de hover en categorías (revelar descripción).
- Variación de tamaño/proporción entre tarjetas de categoría para romper la grilla perfectamente uniforme.

## 26. Fases de implementación

**FASE 1 — Imprescindible**: eliminar todo lenguaje técnico visible, quitar el campo de Departamento/Partido, arreglar el layout roto (CSS/JSX desalineados), quitar contador de estadísticas + franja de features + artículos ficticios + sidebar técnico.

**FASE 2 — Importante**: reemplazar el formulario de geografía por mapa + lista de zonas; cargar tipografía real; dar tratamiento visual (imagen o patrón gráfico) a las categorías; separar "Mi Cultivo" del nav público.

**FASE 3 — Pulido**: sistema de íconos propio, mapa ilustrado con estilo distintivo, microinteracciones de categoría, variación de proporciones entre tarjetas.

## 27. Criterios de aceptación visual

1. En menos de 5 segundos, un visitante nuevo identifica el sitio como una plataforma de información geográfica/editorial sobre cultivo — no como un panel de datos de gobierno ni una landing de producto SaaS.
2. El mapa es reconociblemente un mapa de Argentina, no un formulario ni un blob decorativo sin relación con el país.
3. Ninguna variable climática se representa sobre el mapa (color, ícono, leyenda).
4. Cero apariciones de `NO_IMPLEMENTADO` o de cualquier término técnico interno en el DOM visible al usuario, en ningún estado ni breakpoint.
5. El departamento/partido no aparece como campo ni como nodo de navegación visible.
6. Cada clase CSS usada en un componente de Home tiene al menos una regla de estilo real asociada (sin layouts "huérfanos").
7. Al menos las categorías principales tienen tratamiento visual (imagen o ilustración/patrón), no solo texto con borde.
8. La experiencia mobile prioriza el buscador de texto sobre el mapa táctil, y usa scroll horizontal o listas simples en vez de grillas apretadas de tarjetas.
9. No existen datos meteorológicos falsos o simulados en ningún estado del Panel Ambiental.
10. "Mi Cultivo" y cualquier otra funcionalidad que requiera cuenta se distingue visualmente de la navegación pública.

## 28. Decisiones pendientes

- Definir el color de alerta climática (distinto del verde de marca) — no se fija en este documento, es tarea de construcción con revisión de contraste/accesibilidad real.
- Definir si el mapa de v1 será una ilustración vectorial propia hecha a mano/con herramienta de diseño, o una simplificación programática de los límites reales (GeoJSON de `03_GEO.md` estilizado) — ambas caminos son válidos, la decisión de cuál construir primero es de la fase de construcción, no de este documento.
- Definir la fuente serif real a cargar (nombre concreto) — este documento solo establece que debe cargarse de verdad, no cuál usar.
- Definir el tratamiento visual interino de categorías mientras no exista fotografía real (ilustración encargada vs. patrón generado) — ver tensión ya señalada entre `06_VISUAL.md` (fotografía pendiente) y la ambición visual de esta dirección.
- **Ninguna decisión registrada en `16_DECISIONS.md` (D1-D10) requiere revisión** — no se marca ningún `DECISION_REVIEW_REQUIRED` en esta auditoría. Los defectos encontrados son de implementación (código que no sigue `22_HOME_EXPERIENCE.md`, `02_UX.md` y `06_VISUAL.md`), no de las decisiones de producto ya tomadas.

---

## Verificación final

¿Si mañana tuviera que entregarle este documento a un diseñador para construir la Home, obtendría una interfaz con identidad clara y consistente? **Sí.** El documento define qué eliminar con evidencia concreta y verificable en el código, da una dirección de nombre y concepto (RELIEVE), especifica paleta/tipografía/composición con reglas de uso (no solo adjetivos), entrega wireframes desktop y mobile, define los 5 estados de Home con su tratamiento visual, y deja una política explícita de qué conservar/reducir/eliminar/reemplazar componente por componente — sin dejar ninguna ambigüedad sobre por qué cada cambio es necesario.
