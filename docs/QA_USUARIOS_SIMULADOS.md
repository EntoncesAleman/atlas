# Revisión del espacio personal y pruebas con usuarios simulados

Fecha: 9 de octubre de 2026. Código revisado hasta `195cbee`. Los commits figuran a nombre de Tom; la atribución a Claude proviene de la conversación, no se puede distinguir por el autor de Git.

## Qué cambió

- `a5ebcec`: espacio personal, bitácora como entrada, navegación propia y panel de club diferenciado.
- `9aca101`: identidad de la cuenta y accesos personales desde las páginas públicas; biblioteca lateral también en Inicio.
- `3573322` y `195cbee`: biblioteca visual, una tarjeta por categoría, búsqueda en la página principal del Atlas.
- `a29c3a0` y `370c019`: propuestas de actividades con revisión administrativa; ficha pública del club, eventos, cursos, novedades, equipo, invitaciones, seguidores, cuaderno colectivo y visitas agregadas.

No son solo pantallas de ejemplo: existen acciones de servidor, rutas de cuenta, consultas a Supabase y una migración. La sección Amigos sigue siendo un estado informativo, sin relaciones entre cuentas implementadas.

## Evidencia verificada

- Build de producción completo: 53 páginas generadas.
- `tests/public-experience-audit.mjs`: pasó contra el build actual en un servidor separado, puerto 3002. Incluye recorrido público, navegación, búsquedas, guardadas, acceso sin sesión bloqueado al dashboard, conservación de registros locales y vistas responsive.
- `tests/account-data-audit.mjs`: pasó. Prueba el módulo de datos de cuenta con dobles de cliente: propiedad, paginación, exportación de fotos y limpieza. No demuestra el funcionamiento completo de clubes ni reemplaza una prueba de sesiones reales.
- Inspección de solo lectura en la base configurada: las seis tablas `club_profiles`, `club_submissions`, `club_members`, `club_follows`, `club_journal_entries` y `club_views` son accesibles por el cliente de servidor. El bucket `club-media` existe y es público. No se crearon cuentas ni contenidos durante la revisión.

No se probaron recorridos autenticados con cuentas separadas de propietario, editor, integrante y administrador. Las pruebas existentes no cubren el nuevo ciclo de clubes de extremo a extremo.

## Hallazgos para resolver o decidir

1. **Seleccionar el club activo.** `getClubContext()` elige la membresía activa más reciente. En `MyClubs`, todos los enlaces de equipos llevan a `/club`, sin identificar el club elegido. Una persona con dos equipos no puede escoger desde esa lista el espacio correcto. Incorporar un identificador de club seleccionado y comprobar en servidor que la cuenta tiene acceso a ese club en cada lectura y escritura.
2. **Fotos de borrador.** La ficha conserva separados `published` y `draft`, pero las fotos nuevas se suben directamente al bucket público `club-media`. La página pública muestra la versión aprobada; sin embargo, quien conozca la URL del archivo puede acceder a una foto todavía no aprobada. Definir si la moderación exige también privacidad de los archivos de borrador; en ese caso, almacenar borradores en privado y publicar la foto al aprobar.
3. **Conflictos de revisión.** La aprobación de ficha lee el borrador y después actualiza por `club_id`, sin comprobar que la versión siga siendo la misma. Una edición concurrente entre ambas operaciones puede perderse. Probar con dos sesiones y agregar control de versión o una operación transaccional antes de depender de edición simultánea.
4. **Permisos y datos recibidos.** La escritura distingue propietario/editor/integrante en servidor. La lectura de workspace entrega ficha de borrador, propuestas y emails del equipo a los integrantes activos. Definir explícitamente si todos los miembros deben recibir estos campos; cualquier restricción debe aplicarse en la consulta o proyección del servidor, no solo escondiendo controles.

## Herramientas recomendadas

- [Playwright Test Agents](https://playwright.dev/docs/test-agents): planner explora y escribe un plan, generator produce pruebas, healer investiga fallos. Encaja con la dependencia Playwright que ya usa el Atlas. Las definiciones se pueden generar para Claude o Codex. El healer no debe rebajar los criterios ni convertir un error de producto en un test omitido para declarar éxito.
- [Playwright CLI y su skill oficial](https://github.com/microsoft/playwright-cli): para que el agente maneje el navegador, inspeccione, capture y reproduzca los recorridos. Es una opción concreta a la pregunta por un repo/skill.
- [Playwright MCP](https://github.com/microsoft/playwright-mcp): alternativa para exploración mediante herramientas MCP y snapshots de accesibilidad.
- [Browser Use](https://github.com/browser-use/browser-use): agente de navegador para tareas expresadas en lenguaje natural. Lo reservaría para exploración libre; para las comprobaciones obligatorias mantendría pruebas deterministas de Playwright.

No se instalaron herramientas nuevas ni se modificó la configuración de Claude/Codex. Navegadores automatizados y agentes con objetivos permiten simular recorridos, pero no equivalen a participantes humanos en una evaluación de usabilidad.

## Plan de usuarios de prueba

| Persona | Objetivo | Resultado obligatorio |
| --- | --- | --- |
| Visitante | Leer Atlas, buscar, elegir provincia y abrir Mi Cultivo | Lee lo público; ve ingreso y nunca registros privados ni acciones de club |
| Usuario A | Entrar, registrar nota/evento/foto, recargar y exportar | Bitácora primero; navegación personal; datos persisten en su cuenta |
| Usuario B | Repetir el recorrido con otra sesión | No recibe registros, fotos, invitaciones ni exportación de A |
| Club propietario | Editar ficha, proponer actividad e invitar equipo | Solo administra su club; nada aparece públicamente antes de aprobar |
| Editor | Aceptar invitación, proponer contenido y escribir cuaderno | Puede editar/proponer; no puede invitar, quitar ni cambiar permisos |
| Integrante | Leer y escribir cuaderno colectivo | No puede editar ficha ni proponer publicaciones ni gestionar el equipo |
| Administrador | Aprobar/rechazar ficha y contenido | Publicación refleja la decisión; devolución visible para el club; acción auditada |
| Miembro de dos clubes | Entrar a cada equipo y alternar | Club elegido explícito; registros y acciones nunca cruzan organizaciones |

Pruebas adicionales: usuario ajeno intenta acceder a IDs de otro club; revocar un miembro mientras conserva la página abierta; edición y aprobación concurrentes; invitación con email distinto; seguir/dejar de seguir; rechazo y reenvío; retirar una publicación; error de red; imagen inválida; cierre de sesión y navegación atrás. Repetir los recorridos principales a 390, 768 y 1440 px y con teclado.

## Cómo seguir

1. Preparar un entorno de pruebas con base y almacenamiento separados, cuentas ficticias de cada rol y dos clubes. Las credenciales/estados de sesión quedan fuera de Git. Usar contextos de navegador separados, no cambiar roles dentro de una misma sesión para simular aislamiento.
2. Reproducir el hallazgo de varios clubes y resolver la selección con autorización por organización.
3. Guardar este plan como criterio de aceptación y convertir primero ingreso/privacidad/moderación/permisos en pruebas Playwright. Cada resultado debe distinguir pasado, fallido y bloqueado; no declarar probados los roles para los que no hay sesión de prueba.
4. Sumar exploración con agentes por persona, capturas, trazas y un informe con pasos para reproducir cada hallazgo. Los recorridos que escriben, invitan o publican usan solo el entorno de pruebas; las visitas automatizadas no alimentan métricas de producción.
5. Corregir los fallos encontrados antes de ampliar Amigos. Una primera versión de Amigos puede limitarse a solicitud, aceptación, rechazo, eliminación y bloqueo, conservando la bitácora privada salvo una decisión explícita de compartir.

Ejemplo de encargo para el agente explorador:

> Actuá como una persona que entra por primera vez al Atlas. Usá la cuenta de prueba Usuario A en el entorno de pruebas. Encontrá la bitácora, registrá una observación y una foto, recargá y comprobá que siguen ahí. Navegá con teclado y repetí a 390 px. Documentá dónde te confundiste, cada error, los pasos y una captura. No cambies código ni criterios de aceptación. No uses cuentas reales ni publiques fuera del entorno de pruebas.
