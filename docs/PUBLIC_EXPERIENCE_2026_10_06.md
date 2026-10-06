# Experiencia pública del Atlas — 6 de octubre de 2026

La lectura y la búsqueda del Atlas son públicas. El seguimiento sincronizado de cultivo y los paneles de club y administración utilizan cuenta; los roles siguen verificándose en el servidor y en las políticas existentes de Supabase.

## Cambios

- Navegación y pie compartidos en las páginas públicas; enlace para saltar al contenido y navegación móvil.
- Portada con elección de provincia como acción principal, recorrido inicial y bitácora de demostración identificada.
- Selector provincial que conserva texto parcial; formulario antes del mapa en móvil; zonas opcionales sin opciones ficticias. El pronóstico sigue usando el punto de referencia provincial.
- Inicio regional en `/atlas`, enlaces a lecturas geográficas existentes y acceso al buscador público.
- Búsqueda sin autenticación, con filtros por categoría y provincia mencionada literalmente en el contenido. Se conserva la búsqueda local sobre el registro editorial.
- Índices con anclas, fecha real de revisión, botón de corrección, lecturas guardadas y recuperación de la última sección leída. Las preferencias de lectura quedan en el navegador.
- Comunidad destaca Agenda y Formación, que tienen registros documentados; las secciones aún vacías tienen acceso a proponer aportes.
- Noticias distingue una consulta fallida de un resultado vacío y ofrece accesos a Agenda y aportes. El widget se carga dentro de Suspense.
- Recuperación de contraseña, exportación JSON local o de cuenta, eliminación de cuenta con confirmación y página de privacidad.
- Canonical y metadata social en páginas públicas; imagen de portada para compartir; Article y BreadcrumbList en entradas.

## Datos de cuenta

`GET /api/cuenta/exportar` verifica la sesión en el servidor y filtra todas las tablas por la identidad autenticada. La exportación remota incluye los archivos de fotos privados codificados en base64. Si una lectura o descarga falla, no devuelve una exportación incompleta.

`DELETE /api/cuenta/eliminar` comprueba origen, sesión y confirmación. Recorre el directorio privado del usuario, incluidas fotos huérfanas, elimina los archivos y luego utiliza Supabase Auth para eliminar la cuenta. Las relaciones de cultivo existentes dependen de sus cascadas en la base. Si ocurre un error entre operaciones, el formulario informa que la eliminación no se completó y que algunas fotos pudieron borrarse.

La recuperación usa el email del usuario y vuelve a `/auth/callback` para intercambiar el código por una sesión. El callback acepta únicamente destinos internos. El dominio de despliegue debe estar permitido en Redirect URLs de Supabase.

## Aportes

`POST /api/aportes` valida origen, consentimiento, tamaño, mensaje y referencia; incluye un campo trampa y un límite de tres envíos por hora por conexión. Para este límite guarda una huella HMAC diaria de la conexión, sin guardar la IP en texto plano.

Los aportes se guardan en la infraestructura privada existente `admin_audit_log`, con `action = public_contribution`. `/admin/aportes` filtra esa acción y permite marcar mensajes revisados. El acceso usa `requireRole('admin')`. No se publican aportes automáticamente ni se envían mensajes por email. No requiere migración nueva.

## Verificación

- `npm run build`.
- `node tests/account-data-audit.mjs`: propiedad de registros, paginación, fotos exportadas, errores de lectura y limpieza de Storage antes de borrar Auth, con cliente simulado.
- `node --import ./tests/_register-ext-loader.mjs tests/public-search-filters-audit.mjs`: filtros, límites y comprobación de origen.
- `node tests/public-experience-audit.mjs`: Chromium, búsqueda pública, ubicación, lectura guardada, metadata, exportación local, APIs sin sesión, imagen social y anchos 390/768/1440.
- `node tests/public-forms-audit.mjs`: campos precargados, consentimiento, conservación del mensaje ante fallas, limpieza tras éxito y recuperación. Respuestas simuladas; sin emails ni aportes reales.
- `node --import ./tests/_register-ext-loader.mjs tests/province-profile-model-check.mjs`: 969 comprobaciones del modelo existente.

Las capturas del navegador se generan en `/tmp/atlas-public-experience`, configurable con `AUDIT_ARTIFACTS_DIR`. El servidor de prueba se selecciona con `AUDIT_BASE_URL` (por defecto `http://127.0.0.1:3001`).

## Limitación externa observada

El dominio definido en `NEXT_PUBLIC_SUPABASE_URL` devuelve `ENOTFOUND`, tanto dentro como fuera del sandbox. No fue posible verificar recuperación por email, exportación/eliminación contra una cuenta real ni persistencia de aportes. No se crearon usuarios, se borraron datos ni se enviaron emails reales durante esta verificación. El usuario confirmó que el proyecto de Supabase está dormido. Para completar la prueba de integración se necesita reactivarlo; no se cambiaron la URL ni las claves configuradas.
