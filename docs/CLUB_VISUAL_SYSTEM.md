# Sistema visual "Club" (v2)

Rediseño estructural del shell del Atlas — Home, índice del Atlas y Mi Cultivo. Noticias, el
panel admin, Comunidad y el resto de páginas conservan su shell anterior por ahora; pueden
adoptar este mismo sistema en una fase futura sin cambios de arquitectura, solo montando los
mismos componentes.

## Principios

- **Identidad cartográfica, no "verde naturaleza" automático.** Tinta sobre papel/pergamino, con
  el sage relegado a acento territorial secundario (clima, tags) en vez de color dominante.
- **Dos capas de header, no una.** `GlobalHeader` (el producto) + `ContextHeader` (dónde estás),
  en vez de cada página reimplementando su propia franja de breadcrumb.
- **Los widgets viven en la cabecera persistente, no en el contenido.** En Mi Cultivo, Clima /
  Noticias / Alertas son chips del `ContextHeader`, visibles en las seis pestañas — no aparecen
  ni desaparecen según la sección activa.
- **Aditivo, no destructivo sobre lo compartido.** Los tokens legados (`--sage-*`, `--paper*`,
  `--font-main`, `--font-serif`) no cambiaron de valor — Noticias y todo lo no tocado en esta
  fase se ve exactamente igual que antes.

## Shell: `src/app/components/shell/`

- **`GlobalHeader.js`** — marca "ATLAS", nav principal (Explorar / Lecturas / Noticias /
  Comunidad / Buscador), acceso a Mi Cultivo o info de cuenta. Único, compartido entre Home /
  Atlas / Mi Cultivo. `'use client'` por el menú mobile.
- **`ContextHeader.js`** — `kicker` + `title` + `children` (widgets) + `tabs` opcional. Sin
  estado propio: lo puede montar un Server Component sin volverse cliente.
- **`NewsChip.js`** — chip de Noticias del Context Header. Hace su propia lectura pública mínima
  (mismo contrato RLS que ya usa el resto del sitio) y enlaza a `/noticias`; no importa ni
  modifica ningún archivo del sistema de Noticias.

## Tipografía

| Uso | Fuente |
|---|---|
| Display / wordmark / títulos grandes | Libre Caslon Display |
| Lectura larga (ledes, cuerpo editorial) | Newsreader |
| UI / navegación / botones / labels | Public Sans |
| Metadata / kickers / números / coordenadas | IBM Plex Mono |

Elegidas explícitamente para evitar los dos clichés más comunes de IA generativa (Fraunces,
Instrument Serif) y el default genérico (Inter solo). Los tokens legados (`--font-main`/
`--font-serif`, Inter + Source Serif 4) siguen intactos para lo no rediseñado.

## Color

Tokens nuevos, prefijo `--club-*`, definidos en `globals.css` junto a (no reemplazando) los
tokens legados:

- `--club-parchment` / `--club-surface` — fondo y superficie.
- `--club-ink` / `--club-ink-soft` / `--club-ink-muted` — texto, reemplaza al verde como color
  dominante.
- `--club-signal` — único acento saturado (naranja tierra), usado para hover/estados activos.
- `--club-sage` — el verde original, ahora acento secundario.
- `--club-line` / `--club-line-strong` — bordes.

## Componentes clave

- `.club-button` / `.club-button-outline` — botones del sistema nuevo (tinta sólida u outline).
- `.club-widget-chip` — chip de contexto (Clima/Noticias/Alertas).
- `.club-tabs` / `.club-tab` — navegación por pestañas horizontal (reemplaza el sidebar vertical
  de la iteración anterior de Mi Cultivo).
- `.club-panel` — contenedor de sección plano, sin sombra por defecto.

## Responsive

- **Desktop:** título + widgets en la misma fila del `ContextHeader`, tabs en una fila propia
  debajo.
- **Tablet/mobile (`≤720px`):** los widgets pasan a un rail horizontal con scroll-snap
  (`min-width: 148px` por chip, sin truncar el texto) en vez de comprimirse o desaparecer. El
  nav principal colapsa a un menú hamburguesa (`GlobalHeader`).

## Motion

Una sola animación de entrada (`.club-enter`, fade + subida de 10px, ~420ms) al montar el
contenido principal de cada página rediseñada. Envuelta en
`@media (prefers-reduced-motion: no-preference)` — desaparece por completo con reduced motion
activado. No hay scroll-hijacking ni librerías nuevas de animación.

## Qué NO se rediseñó en esta fase (a propósito)

- El formulario de login/cuenta de Mi Cultivo (`.mi-cultivo-login-card` y afines) conserva su
  estilo anterior — es infraestructura de auth, no la identidad del "Club".
- Noticias (`/noticias`, `/admin/noticias`, `NewsWidget`/`NewsWidgetCompact`) — zona protegida,
  sin cambios de código, datos ni estilos propios.
- Panel admin, Comunidad, Buscador, páginas de categoría/entrada del Atlas — quedan con el shell
  anterior; pueden migrar a `GlobalHeader`/`ContextHeader` en una fase futura sin rehacer nada de
  lo construido acá.
