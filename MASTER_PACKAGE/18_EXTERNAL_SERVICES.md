# 18 — Servicios Externos

Resumen de todo servicio de terceros que el proyecto podría necesitar, con estado de investigación. Ninguno está contratado ni implementado — este documento es insumo para la fase de construcción.

## Clima
- **Open-Meteo** (recomendado, ver [[04_CLIMATE]]) — gratuito bajo uso no comercial, sin necesidad de tarjeta ni cuenta.
- **OpenWeatherMap** — respaldo si se necesitan alertas nativas del proveedor; requiere tarjeta incluso en tier gratuito.
- Fuentes oficiales sin API confiable (SMN, INTA) — se usan como referencia editorial y enlace de autoridad, no como dependencia técnica en tiempo real.

## Mapas / geografía
- **MapLibre GL JS** o **Leaflet** — librerías, sin costo de licencia, sin API key obligatoria.
- **georef-ar-api** (datos.gob.ar) — fuente de límites administrativos (provincia/departamento), gratuita, código MIT.
- Si se elige alojar tiles vectoriales propios en vez de un mapa simple tipo coroplético: evaluar **Protomaps** o **OpenMapTiles** self-hosted (evitar Mapbox por licencia paga) — **TODO RESEARCH**, no evaluado en profundidad en esta ronda porque el picker de provincia/zona probablemente no necesita tiles de calle detallados (no es un mapa de navegación, es un selector de región).

## Autenticación
**DECISIÓN DE CONSTRUCCIÓN (original, blueprint)**: usar `Auth.js`/`NextAuth` con el stack confirmado de Next.js, como capa de autenticación email + contraseña y flujo de recuperación/borrado de cuenta. Requisito no negociable: debe soportar borrado de cuenta real (ver [[10_PRIVACY]]). Se conserva la preferencia de no integrar provider externo de auth si un integrador del framework entrega el flujo mínimo sin dejar el proyecto acoplado a un proveedor de cuentas propietario.
**ACTUALIZACIÓN (Fase 10B, implementación real)**: esta ruta nunca se construyó de verdad — lo que existía era una demo de NextAuth con un usuario hardcodeado. La autenticación real usa **Supabase Auth** (ver decisión D13 en `16_DECISIONS.md`). Este párrafo queda como registro histórico del plan original, no como estado vigente.

## Almacenamiento de archivos (fotos)
**DECISIÓN DE CONSTRUCCIÓN (original, blueprint)**: usar `Cloudflare R2` como proveedor de storage de objetos compatible con el protocolo S3; separar un bucket público para media editorial y un bucket privado para fotos de `Mi Cultivo` con URLs firmadas de corta duración. Requisito no negociable: no publicar fotos privadas ni exponer location exacta; la foto de `Mi Cultivo` requiere limpieza de EXIF (GPS), compresión y URL firmada con vida limitada.
**ACTUALIZACIÓN (Fase 10C, implementación real)**: no se usó Cloudflare R2. La media editorial pública se sirve como archivos estáticos del propio proyecto (`public/atlas/categories/real/...`, ver `ASSET_REGISTRY.md`) — no hay bucket público dedicado. Las fotos privadas de `Mi Cultivo` usan **Supabase Storage** (bucket privado `cultivo-photos`, URLs firmadas de 30 minutos, RLS por usuario) — ver decisión D9 (marcada superada) y `MASTER_PACKAGE/41_PHASE_10C_MI_CULTIVO_PHOTOS.md`. Los requisitos no negociables (EXIF limpio, sin fotos privadas públicas, URLs firmadas de corta duración) sí se cumplieron, solo cambió el proveedor.

## Email transaccional / newsletter
No investigado en profundidad en esta ronda. Requisitos no negociables: soporte de double opt-in, unsubscribe de un clic, y separación clara entre email transaccional (confirmación de cuenta, recuperación de contraseña) y email de marketing/newsletter (para no arriesgar la entregabilidad del transaccional por quejas de spam del newsletter). **TODO RESEARCH** en fase de construcción.

## Búsqueda
No investigado en esta ronda. Para v1, dado el volumen de contenido esperado (enciclopedia + páginas de zona, no un catálogo masivo), es razonable evaluar primero una solución de búsqueda simple integrada a la base de datos (full-text search nativo) antes de sumar un servicio de búsqueda dedicado — ver también 02_UX.md, sección Buscador en el roadmap. **TODO RESEARCH**.

## Analítica
No investigado en esta ronda. Requisito de producto (derivado de [[10_PRIVACY]]): preferir una herramienta que no dependa de cookies de terceros ni haga fingerprinting, para minimizar la necesidad de un banner de cookies invasivo. **TODO RESEARCH** en fase de construcción — evaluar opciones "privacy-first" (ej. analítica basada en logs del servidor o herramientas sin cookies) vs. Google Analytics (descartar por defecto salvo justificación, ya que es la opción menos alineada con el principio de privacidad del proyecto).

## Monitoreo / observabilidad
No investigado en esta ronda. **TODO RESEARCH** en fase de construcción, típicamente resuelto por el mismo proveedor de hosting elegido.

## Regla general para toda esta lista
Ningún servicio de esta lista se contrata "porque sí" — cada uno debe justificarse contra la pregunta de 14_ROADMAP.md, sección Priorización/regla anti-sobrediseño: ¿qué problema resuelve, es necesaria, cuánto cuesta mantenerla, puede agregarse después en vez de ahora? Priorizar servicios con tier gratuito real (no solo trial) y sin necesidad de tarjeta cuando sea posible, dado que el proyecto no genera ingresos.
