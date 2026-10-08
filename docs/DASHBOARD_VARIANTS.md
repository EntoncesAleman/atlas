# Variantes de usuarios, cultivo y clubes

Galería accesible: `/propuestas`, con las seis capturas y enlaces individuales. Prototipos: `/propuestas/dashboards.html?variante=user-field` (cada variante tiene su identificador). El enlace local compartido inicialmente dependía de un servidor que dejó de estar activo; usar la ruta del sitio publicado para compartir. HTML, CSS y JavaScript independientes; no alteran Mi Cultivo ni el panel de club. Todos los registros son ejemplos y viven únicamente en memoria durante la visita. Las fotografías son ilustrativas y reutilizan los recursos locales del Atlas.

## Contexto comprobado

- `src/app/mi-cultivo/page.js` ofrece vista general, plantas, diario y bitácora, contenido y lecturas, ambiente y ajustes. Hay uso local sin cuenta, sincronización con cuenta, migración explícita de registros, fotos y alertas. Conservar estos recorridos y sus garantías al implementar cualquier variante.
- `src/app/club/page.js` es una sección reservada para cuentas aprobadas; ficha, eventos y cursos todavía se gestionan editorialmente. No hay un panel de autogestión implementado en esa ruta.
- `src/app/club/layout.js` exige rol de club, y `src/app/lib/auth/roles.js` diferencia user, club y admin. Este rol de cuenta no equivale a pertenencia y permisos dentro de una organización.
- La referencia local `documentacion/ejemplo dashboard usuario.jpeg` inspira la alternativa verde de seguimiento. No se incorpora ni se modifica ese archivo ajeno.

## Alternativas

| Variante | Para quién | Decisión principal |
| --- | --- | --- |
| Usuario · Cuaderno | Uso personal ocasional o frecuente | Una entrada tranquila, registro rápido y plantas antes que widgets |
| Usuario · Seguimiento | Quien consulta seguido su historial | Más densidad y verde profundo; sin instrumentos ficticios |
| Cultivo · Temporada | Observaciones sobre el conjunto | Temporada primero, plantas como fichas; eventos comunes requieren ampliar el modelo |
| Cultivo · Por planta | Seguimiento individual | Historia cronológica, fotos y etapa registrada, sin pronóstico automático |
| Club · Comunidad | Club que publica presentación y actividades | Borradores y revisión editorial con estado visible |
| Club · Equipo | Organización con varias personas | Miembros, invitaciones y permisos por organización; nueva infraestructura |

Recomendación: cuaderno como inicio, temporada como agrupación y ficha por planta como detalle. El panel de seguimiento puede ser una preferencia visual futura, sin duplicar el producto ni sus datos. Conservar diario privado, guardado local, cuenta opcional, exportación, eliminación y lecturas guardadas. Compactar ingreso y ajustes; retirar noticias del centro del diario. Una métrica solo aparece si existe un dato real con origen y fecha: el clima exterior no se presenta como sensor del ambiente de cultivo.

Para clubes, implementar primero autogestión editorial. Flujo propuesto: cuenta aprobada → editar borrador de ficha/actividad → vista previa → enviar a revisión → devolución o publicación por el Atlas. Mantener versiones públicas mientras se revisa una modificación y permitir retirar un borrador. Definir responsables y estados en servidor antes de conectar botones.

En una segunda etapa, sumar organizaciones y miembros: propietario administra integrantes, editor prepara contenido, lector consulta lo compartido. Las invitaciones deben aceptarse y cada consulta o escritura debe comprobar pertenencia y permiso mediante autorización en servidor y políticas de datos. El historial interno del equipo y los diarios personales son recursos separados. Un cultivo compartido sería opcional y necesitaría permisos explícitos; no se migra ningún diario personal al club automáticamente. No incluir catálogo comercial, ventas ni datos sensibles de asociados como parte de estas propuestas.

## Alcance y comprobación

El selector cambia entre seis composiciones; la navegación lateral muestra inicio, bitácora y privacidad; las fichas llevan a temporada o planta; el diálogo permite escribir una nota de ejemplo con validación; las simulaciones de revisión explican que no envían contenido. La invitación y edición de ficha muestran el flujo propuesto, no formularios productivos completos.

Se verifican 390, 768 y 1440 px, ausencia de desborde horizontal, carga de imágenes locales, cambios de variante, registro de observaciones, Escape y foco al cerrar el diálogo, navegación de secciones y simulación de revisión. No hay integraciones nuevas, sensores, emails ni escrituras a Supabase. Las variantes son material para decidir antes de implementar una arquitectura de clubes.
