---
name: atlas-editorial-voice
description: |
  Aplica la voz editorial propia del Atlas del Cultivo Argentino — editorial, humana, sobria,
  curiosa, narrativa, clara, nunca publicitaria ni burocrática ni con tono de respuesta de IA.
  Usar al escribir o editar cualquier entrada de `editorialData.js` (o contenido editorial
  equivalente del Atlas), al revisar coherencia de voz entre entradas, o al evaluar si un texto
  "suena al Atlas". No usar sobre Noticias (`/noticias`, `lib/news/*`, tabla `news_items`) — es
  una capa dinámica, curada y sincronizada aparte, con su propia disciplina de sumario fiel a la
  fuente, no la voz narrativa de las entradas del Atlas.
license: MIT
metadata:
  project: atlas-del-cultivo-argentino
  based_on: "MASTER_PACKAGE/28_EDITORIAL_CONTENT_MODEL.md, .claude/agents/editor-jefe-atlas/*, pases editoriales previos (germinación, Atlas completo, Lectura)"
---

# Voz editorial del Atlas

El Atlas del Cultivo Argentino no es un blog de cultivo ni un sitio de SEO agrícola. Es una obra
editorial única, con identidad territorial argentina, que trata el cultivo como sistema
geográfico, ambiental, científico, histórico y cultural. Esta skill existe para que cualquier
texto que se escriba o edite para el Atlas — no solo lo que ya escribió un editor — suene como si
lo hubiera escrito y curado un verdadero editor de esa obra.

## Cuándo usar esto

Al escribir una entrada nueva de `editorialData.js`, al editar una existente, al revisar
coherencia de voz entre dos o más entradas, o al evaluar (propio o ajeno) si un texto "suena al
Atlas" antes de darlo por terminado. **No aplica a Noticias** — ver exclusión abajo.

## Cómo debe sonar

Inteligente, sobria, argentina, observadora, precisa, elegante, humana, curiosa, accesible.
Culta sin ser pretenciosa. Científica sin sonar académica. Narrativa cuando el tema lo permite
(historia, crónica, perfil) — pero nunca narrativa a costa de la precisión.

## Cómo nunca debe sonar

- **Publicitaria.** Nada de superlativos sin respaldo, tono de venta, tono de folleto.
- **Burocrática.** Nada de lenguaje de trámite, de expediente, de circular institucional.
- **Con tono de respuesta de IA.** Genérica, sin punto de vista, sin fricción, intercambiable con
  un texto sobre cualquier otro tema con encontrar-y-reemplazar. Para detectar y corregir esto de
  forma sistemática, aplicar las skills `humanizer` y `avoid-ai-writing` como parte del proceso
  (ver "Herramientas complementarias" más abajo) — no reinventar esa detección acá.
- **De informe de investigación.** El Atlas es una obra editorial, no un paper ni una bitácora de
  búsqueda. La investigación es un insumo invisible, nunca el tema del texto.

## Frases y patrones prohibidos

No usar cuando no aportan nada real (que es casi siempre):

- "Según las fuentes consultadas...", "dentro de las fuentes consultadas para esta
  investigación...", o cualquier variante que explicite el propio proceso de investigación en
  vez del contenido. Si no hay estudio dedicado sobre algo, decirlo como hecho editorial ("no
  existe, hasta donde permite verificar este Atlas, un estudio dedicado a...") — nunca como
  narración del propio trabajo de búsqueda.
- "En este artículo veremos...", "Es importante destacar que...", "Como sabemos...", "En
  conclusión...", "Cabe mencionar que...", "No hay que olvidar que..." — cualquier apertura o
  cierre que anuncie estructura en vez de empezar a contarla.
- Lenguaje de informe: "la investigación arrojó", "los datos sugieren que", "se concluye que" en
  lugar de una afirmación editorial directa y atribuida a su fuente real.
- Relleno y repetición: una idea dicha dos veces con distintas palabras, un párrafo que no agrega
  nada al anterior, una lista de generalidades donde cabría un ejemplo concreto.
- Estructuras mecánicas: el mismo patrón de párrafo (afirmación / explicación / cierre)
  repetido de forma idéntica entrada tras entrada, o dentro de una misma entrada, hasta que se
  vuelve previsible.
- Párrafos artificialmente uniformes: todos del mismo largo, mismo ritmo, mismo tipo de oración
  de apertura — la prosa real varía.
- Afirmaciones no respaldadas y falsa certeza: cualquier frase que suene más segura de lo que la
  evidencia disponible permite.

## Principios de redacción

- **Empezar por lo concreto, no por la definición de diccionario.**
- **Un párrafo, una idea** — dividir cuando un párrafo mezcla dos o más.
- **Transiciones que razonan, no que decoran** ("por eso", "sin embargo", "lo que lleva a" — no
  "por otro lado" como comodín cuando no hay oposición real).
- **Ejemplos concretos antes que generalizaciones abstractas.**
- **Titulares y bajadas que prometen algo específico**, no una categoría genérica.
- **Cerrar con algo que se gana, no con un resumen** de lo ya dicho.

## Trazabilidad y distinción evidencia/interpretación (no negociable)

Esto no es un detalle de estilo — es la disciplina central del Atlas, y ninguna edición de voz
puede debilitarla:

- **Nunca inventar** datos, cifras, fechas, autores, estudios, citas, reseñas, páginas,
  `sourceId` o enlaces que no estén ya en el contenido o verificados por lectura directa.
- **Nunca reasignar** una fuente existente a una afirmación distinta de la que sostenía.
- Distinguir siempre **EVIDENCIA** (lo que un estudio o dato verificable sostiene) de
  **INTERPRETACIÓN** (una lectura razonable pero no la evidencia misma), de **PRÁCTICA
  HORTÍCOLA**, **TRADICIÓN**, **OPINIÓN**, **HIPÓTESIS** e **INFORMACIÓN HISTÓRICA** — nunca
  mezclarlas sin que quede claro a cuál pertenece cada afirmación.
- Cuando falte respaldo para algo que el texto necesitaría afirmar, **señalarlo como observación
  para revisión humana** en el informe de la tarea — nunca completarlo con algo plausible ni
  suavizarlo hasta que deje de notarse el vacío.
- Editar la voz de una entrada nunca es excusa para tocar `sourceIds`, `tags` ni
  `relatedEntryIds` sin evidencia nueva y explícita que lo justifique.

## Qué preservar siempre

- La información real de la entrada — mejorar la voz no es una licencia para cortar contenido
  válido.
- Las fuentes exactamente como estaban, salvo instrucción explícita de investigación nueva.
- La estructura de datos existente (`intro`/`sections`/`observations`/`signals`/
  `commonMistakes`/`environmentContext`/`tags`/`relatedEntryIds`/`sourceIds` — ver
  `MASTER_PACKAGE/28_EDITORIAL_CONTENT_MODEL.md`) — no inventar campos nuevos fuera de ese
  modelo.
- Lo que ya funciona. Si una entrada ya suena al Atlas, no se edita solo para que quede
  "distinta" — eso es reescribir por reescribir, y esta skill no lo pide.

## Proceso al aplicar esta skill

1. Leer la entrada completa antes de tocar nada — entender qué dice, qué fuente sostiene qué, y
   si ya suena al Atlas (en cuyo caso, no editar).
2. Detectar, con criterio concreto (no genérico), qué patrones de esta skill aparecen realmente
   en el texto: lenguaje de informe, apertura débil, párrafo con varias ideas, repetición,
   afirmación sin respaldo claro.
3. Editar solo lo que tiene un problema real — nunca reescribir una entrada entera por una frase
   suelta.
4. Verificar después de editar: ¿la fuente real sigue sosteniendo exactamente lo que el texto
   dice? ¿se perdió algún dato? ¿el modelo de datos sigue siendo válido?
5. Registrar, en el informe de la tarea, cualquier vacío de fuente encontrado — sin resolverlo
   inventando.

## Herramientas complementarias

Esta skill define la voz de destino; para la mecánica de edición, combinarla con:

- **`copy-editor`** (o equivalente instalado) para poda a nivel de oración: adverbios, voz
  pasiva, "fad words", paralelismo.
- **`humanizer`** / **`avoid-ai-writing`** para detectar y corregir patrones específicos de
  escritura de IA (contrastes "no X sino Y", cierres de una línea, tríadas forzadas, guiones por
  todos lados, negrita decorativa) — leer sus propias referencias (`references/patterns.md` en
  `avoid-ai-writing`) antes de aplicarlas.
- **`content-research-writer`** solo para la parte de estructura/outline/hooks cuando se escribe
  contenido nuevo — nunca para su función de "agregar citas" sin verificación real, que en este
  proyecto siempre sigue la jerarquía de fuentes documentada en
  `.claude/agents/editor-jefe-atlas/02-principios-editoriales.md`.

Ninguna de estas herramientas autoriza por sí sola a inventar contenido, fuente o dato: los
principios de trazabilidad de esta skill están por encima de cualquier sugerencia de las otras.

## Exclusión: Noticias

Esta skill **no se aplica a Noticias** (`/noticias`, `src/app/lib/news/*`, componentes
`NewsWidget*`, tabla Supabase `news_items`). Esa capa es contenido sincronizado dinámicamente con
su propia disciplina (resumen = extracto fiel de la fuente, nunca reescritura editorial — ver
`docs/NEWS_SYSTEM.md`), no la voz narrativa de las entradas del Atlas. No usar esta skill, ni
`copy-editor`, ni `humanizer`, ni `avoid-ai-writing` sobre ningún archivo o contenido de esa zona.
