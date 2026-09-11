# 09 — Seguridad (Threat Model)

No se implementa nada en este documento. Es un modelo de amenazas para guiar la construcción futura.

## Superficie de ataque
1. Autenticación/cuentas (registro, login, recuperación de contraseña).
2. API pública de contenido (lectura) + API privada de "Mi Cultivo" (lectura/escritura).
3. Subida de archivos (fotos de cultivo, potencialmente fotos de perfil).
4. Newsletter/alertas por email (superficie de abuso/spam).
5. Buscador (posible vector de scraping agresivo o inyección si se usa búsqueda "inteligente").
6. Panel/rol editorial interno (gestión de artículos, media, datos climáticos).

## Amenazas y mitigaciones

### IDOR (Insecure Direct Object Reference)
**Riesgo**: un usuario accede a `cultivation_id`, `photo_id`, `note_id` de otro usuario adivinando o iterando IDs.
**Mitigación**: toda entidad privada se filtra por `user_id` del token autenticado en cada query, nunca confiar en un `user_id` recibido del cliente; usar IDs no secuenciales/adivinables (UUID) como capa adicional, no como única defensa; políticas a nivel de base de datos (row-level security) si el motor elegido lo soporta (ver [[13_STACK]]).

### Exposición de fotografías y ubicación privadas
**Riesgo**: URLs de fotos privadas quedan públicas/adivinables (bucket mal configurado); la "zona guardada" del perfil se filtra vía API pública.
**Mitigación**: storage privado con URLs firmadas de corta duración para fotos de cultivo (nunca bucket público); todo endpoint que devuelva datos de perfil/cultivo requiere autenticación y ownership check; nunca incluir ubicación exacta en ningún caso (ya no existe ese dato, ver [[07_DATABASE]]).

### Acceso entre usuarios / escalado de privilegios
**Riesgo**: rol editorial interno mal separado del rol de usuario normal permite a un usuario común editar contenido público, o a un editor leer datos privados de cultivos ajenos sin necesidad operativa.
**Mitigación**: roles explícitos (visitor/user/editor/admin), el rol editorial nunca tiene acceso de lectura a `cultivations`/`cultivation_photos`/`cultivation_notes` salvo excepción de soporte auditada y con consentimiento (ver [[10_PRIVACY]]).

### Abuso de uploads
**Riesgo**: subida de archivos maliciosos (ejecutables disfrazados, imágenes con payload, tamaño excesivo) vía "Mi Cultivo".
**Mitigación**: validar tipo MIME real (no solo extensión), límite de tamaño estricto, reprocesar/recomprimir imágenes en servidor (esto también elimina metadatos EXIF con posible geolocalización embebida — importante: una foto de celular puede tener GPS en EXIF y debe limpiarse siempre al subir), escaneo básico de contenido si el proveedor de storage lo ofrece.

### Spam / abuso de newsletter y alertas
**Riesgo**: bots se suscriben masivamente; alguien suscribe emails ajenos sin consentimiento.
**Mitigación**: double opt-in obligatorio (confirmación por email antes de activar), CAPTCHA/verificación anti-bot en formularios públicos, rate limiting por IP y por email en endpoints de suscripción, unsubscribe de un clic sin necesidad de login.

### Rate limiting general
**Riesgo**: fuerza bruta en login, scraping agresivo de la enciclopedia/API pública, abuso de recuperación de contraseña como vector de enumeración de emails.
**Mitigación**: rate limiting por IP/usuario en login y recuperación de contraseña; respuestas que no revelen si un email existe o no ("si el email existe, te enviamos un link"); rate limiting razonable en API pública (no bloquear indexación de buscadores, ver [[11_SEO]]).

### Secretos y variables de entorno
**Riesgo**: claves de API de clima/mapas/email filtradas en el repo o en el cliente.
**Mitigación**: todas las claves de proveedores externos ([[18_EXTERNAL_SERVICES]]) viven en variables de entorno del backend, nunca en código de cliente ni en el repo; proxys server-side para cualquier API externa que requiera clave (el navegador nunca llama directo a un proveedor de clima con una API key secreta).

### Backups y eliminación de datos
**Riesgo**: un usuario borra su cuenta pero los datos persisten indefinidamente en backups, violando su expectativa de eliminación.
**Mitigación**: política de retención de backups explícita y corta (definir número de días en fase de construcción), documentar en privacidad que backups pueden retener datos por X días tras el borrado; borrado "duro" real (no solo soft-delete de cara al usuario) tras el período de gracia.

## Fuera de alcance / no aplica en v1
- No hay pagos, así que no hay superficie PCI.
- No hay mensajería entre usuarios (no hay DMs ni comentarios públicos en v1 — reduce superficie de abuso/moderación significativamente; **ASSUMPTION**, revisar si se agrega comunidad más adelante).
