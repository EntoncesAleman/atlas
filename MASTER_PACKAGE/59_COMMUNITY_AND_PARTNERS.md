# 59 — Comunidad, aliados y "Sobre el proyecto" (Loop 4.4)

Nota de numeración: la consigna de este loop pedía crear `58_COMMUNITY_AND_PARTNERS.md`, pero ese
número ya estaba tomado por `58_PROVINCIAL_CANNABIS_RESEARCH.md` (Loop 4.3, cerrado y pusheado
antes de que llegara esta consigna). Se usa `59` para no sobrescribir contenido real ya existente.

## Propósito

Expandir el Atlas con una capa de comunidad, educación y actividad territorial, sin convertirlo en
marketplace ni catálogo de growshops. El conocimiento del Atlas (geografía, ambiente, Cannabis) se
mantiene como núcleo; esta capa conecta ese conocimiento con organizaciones, actividad y personas
reales del territorio argentino.

## Arquitectura de datos

Nuevo módulo `src/app/lib/community/communityData.js` — deliberadamente SEPARADO del sistema
editorial de `lib/editorial/editorialData.js` (que describe procesos botánicos/ambientales, no
directorios de organizaciones). Se revisó explícitamente si el sistema editorial existente podía
extenderse (§15 de la consigna) y se concluyó que no aplica: un club, un evento o un curso no son
una entrada editorial con secciones/observaciones/señales — son registros de directorio con otra
forma.

Exporta 5 colecciones, **todas vacías hoy a propósito**:

- `communityClubs` — clubes cannábicos (nombre, provincia, localidad/área general, descripción,
  historia, sitio web, redes, actividades, cursos, eventos, especialidades, contacto, estado,
  sponsor/aliado, fecha de actualización — sin domicilio exacto salvo que el propio club lo
  publique).
- `communityEvents` — agenda territorial (título, organizador, provincia, localidad, fecha,
  modalidad, descripción, enlace, fuente, estado).
- `communityCourses` — formación (título, organizador, docente, modalidad, duración si está
  documentada, provincia/institución, descripción, fecha, enlace, estado).
- `communityVoices` — entrevistas editoriales.
- `atlasPartners` — sponsors/aliados (ver más abajo, sección aparte porque su superficie de
  renderizado es distinta).

Ninguna colección tiene contenido de relleno ni perfiles ficticios ("No crear perfiles ficticios",
"No inventar eventos") — el estado real de este proyecto hoy es que no hay ningún club, evento,
curso ni entrevista con fuente verificable todavía. La UI muestra "Próximamente" en ese estado.

Funciones auxiliares conscientes de provincia (`getClubsByProvince`, `getEventsByProvince`,
`getCoursesByProvince`) reutilizan la misma clave de `localStorage` (`atlas:selectedProvince`) ya
establecida en todo el proyecto — sin pedir ubicación exacta. Con arrays vacíos devuelven `[]`;
quedan listas para cuando exista contenido real sin requerir cambios de código.

`getFeaturedClub()` sostiene el módulo "Club destacado" (§8): nunca un ranking, un espacio
editorial rotativo — devuelve `null` mientras no haya ningún club marcado `featured`.

`NEWSLETTER_CONTENT_TYPES` deja solo la arquitectura editorial pedida por §7 (qué tipos de
contenido podría reunir un envío) — no se implementó ningún sistema de suscripción/envío de email
real, por instrucción expresa de no crear infraestructura de email compleja sin decisión de
proveedor (coherente con el bloqueo ya documentado en `TODO.md`, sección BLOCKED, sobre
proveedores de email/newsletter).

## Rutas nuevas

- `/sobre-el-proyecto` — página editorial (ver siguiente sección).
- `/comunidad` — hub con 4 tarjetas de navegación (Clubes/Agenda/Formación/Voces del territorio) +
  módulo "Club destacado".
- `/comunidad/clubes`, `/comunidad/agenda`, `/comunidad/formacion`, `/comunidad/voces` — 4
  directorios, cada uno con estado "Próximamente" mientras su colección esté vacía.

Ninguna ruta nueva introduce un carrito, un catálogo de productos ni lenguaje de e-commerce
("agregar al carrito", "comprar ahora") — verificado explícitamente en `tests/loop-4-4-audit.mjs`.

## Sobre el proyecto

Página editorial nueva, construida a partir del texto base entregado por el usuario, adaptada a la
estructura visual ya existente (`atlas-page`/`atlas-topbar`/`atlas-category-hero`/`atlas-section`,
sin crear un segundo sistema de diseño). Cubre explícitamente lo pedido: qué es y por qué existe el
Atlas, por qué el cultivo no puede explicarse igual para todo el país, cómo se construye la
información (evidencia científica vs. fuentes oficiales vs. información secundaria vs. inferencia),
qué hace y qué NO hace el Atlas (listas explícitas "El Atlas NO es" / "El Atlas SÍ es"),
independencia editorial, la relación Cannabis-geografía-ambiente-genética-fotoperiodo, la
importancia de la historia argentina y de documentar conocimiento propio, comunidad, clubes,
educación, y el proyecto como obra en construcción.

## Aliados del Atlas — restricción de ubicación (instrucción explícita, previa a esta consigna)

El usuario aclaró, antes de que llegara el resto de la consigna de este loop, una regla dura sobre
sponsors que se sigue al pie de la letra y que en algunos puntos es MÁS estricta que la redacción
general de §10/§13:

> "Los sponsors NO deben ser una sección del menú ni una página protagonista. Los sponsors/aliados
> deben aparecer exclusivamente dentro de /atlas, al final del Atlas, como una franja discreta de
> logos o iconos clickeables. No mostrar sponsors en la Home."

Por eso:

- `atlasPartners` **no tiene una página de directorio propia** en `/comunidad` (a diferencia de
  clubes/agenda/formación/voces) — la consigna general de §13 sugiere "Aliados" como una quinta
  subsección de Comunidad, pero esa lectura entra en conflicto directo con "exclusivamente dentro
  de /atlas" de la instrucción específica del usuario, que se interpreta como la más reciente y más
  concreta, y por lo tanto prevalece.
- `PartnersStrip.js` es la ÚNICA superficie donde puede aparecer un aliado/sponsor: una franja al
  final de `/atlas` (después del grid de categorías y de la tarjeta de Comunidad), sin logos
  inventados — con `atlasPartners` vacío muestra únicamente el texto "Próximamente", nunca un
  aliado de ejemplo.
- No hay ningún enlace a "Aliados" en el header, el footer, ni en `/comunidad`. Verificado en
  `tests/loop-4-4-audit.mjs`: Home no menciona "aliado" ni "sponsor" en ningún texto ni renderiza
  `.partners-strip`; `/comunidad` no tiene una tarjeta "Aliados del Atlas"; `/atlas` sí tiene
  exactamente una franja de aliados, al final de la página.

## Grid y navegación

El grid principal de categorías (`CategoryShowcase`, editorial) no se tocó ni se le agregó una
tarjeta de "Comunidad" mezclada con las categorías de contenido — se agregó, en cambio, una sección
visualmente diferenciada (`.community-promo-card`, fondo oscuro, estilo de banner) debajo del grid
en `/atlas`, que enlaza a `/comunidad`. Esto sigue la instrucción de "evaluar agregar una
entrada/sección claramente diferenciada" sin "convertir cada elemento en una tarjeta principal"
(§13).

Navegación de segunda capa: el footer de Home (único lugar del sitio con navegación secundaria
persistente) ahora enlaza `/sobre-el-proyecto` y `/comunidad` (antes ambos eran `href="#"` o no
existían). No se agregó ningún enlace nuevo al header — el header del proyecto solo tiene la marca,
sin lista de navegación, y esta fase no le agrega una para no "llenar el header" (§14).

## Privacidad

Ningún campo de club/evento/curso pide domicilio particular, GPS ni datos sensibles. El campo de
ubicación de un club es "localidad/área general", igual que el resto del proyecto ya hace con la
selección de provincia (nunca coordenadas exactas de una persona ni de una organización, salvo que
la organización publique voluntariamente algo más preciso).

## Responsabilidad editorial

"Sobre el proyecto" documenta explícitamente la distinción entre contenido editorial, educativo,
patrocinado, comunitario e institucional, y la regla de que ningún sponsor puede comprar una
conclusión científica ni alterar una ficha provincial — la misma disciplina de fuente/nivel de
evidencia que ya rige el resto del Atlas (Ficha Provincial, `sources.js`) se extiende
conceptualmente a esta capa nueva, aunque todavía no haya contenido patrocinado real que probarla.

## Futuro marketplace: NO

Por instrucción explícita (§11), no se creó ninguna sección de growshops ni catálogo de productos.
Si en el futuro existiera una relación con growshops, la consigna ya deja documentado que debería
plantearse como aliado educativo/proveedor técnico/espacio de capacitación/colaborador — nunca como
catálogo comercial. No se implementó nada de esto en este loop; queda solo como principio
documentado para una decisión de producto futura, no como una tarea abierta.

## Verificación

`tests/loop-4-4-audit.mjs` (nuevo, 77 verificaciones): las 6 rutas nuevas responden 200 sin
imágenes rotas/overflow/errores de consola; Home conserva el único CTA de exploración; ninguna
mención de "aliado"/"sponsor" en Home; `/comunidad` no tiene una sección "Aliados" protagonista y
tiene exactamente 4 subsecciones; `/atlas` sí tiene la franja de aliados, una sola vez, al final;
ninguna ruta nueva tiene lenguaje de carrito/compra ni "growshop"; "Sobre el proyecto" tiene el
contenido editorial requerido (frase de apertura, listas NO ES/SÍ ES, independencia editorial,
CONICET/INTA/INASE, enlace a Comunidad); los 4 directorios muestran "Próximamente" con 0 tarjetas
de contenido ficticio; una provincia elegida no rompe ninguna ruta de Comunidad.

Regresión completa reconfirmada después de este loop: `province-profile-model-check.mjs` (966),
`province-profile-ui-audit.mjs` (147), `loop-4-3-audit.mjs` (33), `provincial-context-audit.mjs`
(1280, la suite protegida de Fase 47.2, sin modificar en este loop), `atlas-expansion-audit.mjs`
(31, cuenta de prueba creada y borrada de Supabase). `npm run build` limpio (15 rutas, 6 más que
antes de este loop).
