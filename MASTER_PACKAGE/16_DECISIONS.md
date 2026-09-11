# 16 — Decisiones

Registro de decisiones tomadas durante este blueprint. Formato: DECISIÓN / MOTIVO / ALTERNATIVAS / CONSECUENCIAS.

---

### D1 — Unidad de "zona aproximada" = departamento/partido agrupado editorialmente
**DECISIÓN**: usar el departamento/partido/comuna (ya codificado por INDEC/IGN) como unidad de datos, pero agrupar varios en "zonas" con nombre reconocible para el usuario (ver [[03_GEO]]).
**MOTIVO**: exponer ~530 departamentos sueltos es mala UX; el clima real tampoco respeta límites administrativos exactos, así que una agrupación editorial reconocible (valles, costa, puna) es más honesta y más usable.
**ALTERNATIVAS**: solo provincia (descartada, no resuelve el problema central del proyecto); coordenadas/geolocalización libre (descartada, viola privacidad y da falsa precisión).
**CONSECUENCIAS**: trabajo editorial manual de agrupamiento, no automatizable; depende de validar si INTA RIAN ya ofrece una regionalización reutilizable (TODO RESEARCH).

---

### D2 — Open-Meteo como proveedor principal de clima
**DECISIÓN**: usar el tier gratuito no comercial de Open-Meteo para pronóstico, condiciones actuales e histórico.
**MOTIVO**: gratuito, sin tarjeta, términos de uso explícitamente compatibles con un sitio sin fines de lucro y sin ads; buena cobertura de Argentina; incluye histórico desde 1940 en el tier gratuito.
**ALTERNATIVAS**: OpenWeatherMap (alertas nativas pero requiere tarjeta y cobra por volumen), WeatherAPI.com (permite uso comercial en free tier pero histórico limitado en ese tier), Visual Crossing (fuerte en histórico, sin alertas).
**CONSECUENCIAS**: el sistema de alertas por umbral debe calcularse del lado del proyecto (no hay endpoint de alertas nativo en Open-Meteo); si el proyecto deja de ser 100% no comercial, hay que migrar de proveedor o tier.
**RECONFIRMADA (Fase 11, 2026-09-11)**: implementado el contexto ambiental de "Mi Cultivo" sobre esta misma decisión, sin cambios. Se releyeron en vivo los términos y la documentación de Open-Meteo antes de implementar (no se asumió que seguían vigentes) — sin cambios respecto a lo aquí registrado. Se confirmó de nuevo que no existe endpoint de alertas nativo, validando la consecuencia ya anotada arriba. Ver `MASTER_PACKAGE/42_PHASE_11_CLIMA_MI_CULTIVO.md`.

---

### D3 — MapLibre GL JS (o Leaflet) en vez de Mapbox GL JS
**DECISIÓN**: usar una librería de mapas open-source sin licencia paga ni API key obligatoria.
**MOTIVO**: Mapbox GL JS es propietario desde 2020 y cobra por uso; el caso de uso (selector de provincia/zona) no necesita las capacidades avanzadas que justificarían esa dependencia paga.
**ALTERNATIVAS**: Mapbox GL JS (descartado por costo/licencia), mapa estático sin interactividad (descartado, la interacción tipo "clic en tu provincia" es parte del valor de producto de la home).
**CONSECUENCIAS**: ninguna relevante — es la opción de menor riesgo y menor costo, sin trade-off funcional significativo para este caso de uso.

---

### D4 — Base de datos relacional (Postgres o compatible)
**DECISIÓN**: usar un motor relacional como fuente de verdad, tanto para contenido público como para datos privados de usuario.
**MOTIVO**: el modelo de datos ([[07_DATABASE]]) es fuertemente relacional; soporte maduro de políticas de acceso por fila, relevante para mitigar IDOR ([[09_SECURITY]]); estándar portable entre proveedores.
**ALTERNATIVAS**: base NoSQL (descartada, las relaciones usuario→temporada→cultivo→eventos/notas/fotos son el núcleo del modelo, no encajan bien en un modelo documental sin duplicar lógica de integridad en la aplicación).
**CONSECUENCIAS**: ninguna negativa relevante para el perfil de este proyecto.

---

### D5 — Cero venta, cero marcas, cero enlaces comerciales (regla dura de producto)
**DECISIÓN**: ningún artículo, ninguna sección, ninguna funcionalidad puede mencionar marcas comerciales, vender nada, ni enlazar a puntos de venta/clubes de cultivo.
**MOTIVO**: (a) es un requisito explícito del usuario desde el inicio del proyecto; (b) reduce a cero el riesgo de zona gris con Ley 27.669 sobre publicidad/promoción de cannabis, sin necesidad de que un tribunal trace esa línea por el proyecto.
**ALTERNATIVAS**: permitir menciones "neutras" de categorías de producto sin marca — evaluado y descartado por simplicidad de aplicar la regla de forma consistente (una regla absoluta es más fácil de auditar que una regla con matices).
**CONSECUENCIAS**: ninguna — es coherente con el objetivo fundacional del proyecto declarado por el usuario.

---

### D6 — Double opt-in y baja de un clic como estándar propio (por encima del piso legal)
**DECISIÓN**: newsletter y alertas usan double opt-in y unsubscribe de un clic sin login, aunque la Ley 25.326 permita un régimen más laxo en ciertos casos (Art. 27).
**MOTIVO**: elimina cualquier zona gris legal, y es simplemente mejor práctica de producto/confianza del usuario.
**ALTERNATIVAS**: apoyarse en el mínimo legal (opt-out) — descartado por ser innecesariamente arriesgado para un beneficio marginal.
**CONSECUENCIAS**: fricción levemente mayor en el alta de newsletter (requiere confirmar por email), aceptable dado el perfil del proyecto.

---

### D7 — Registro/login nunca bloquea la lectura pública
**DECISIÓN**: ninguna página de contenido informativo (enciclopedia, clima, calendario, comparador, mapa) requiere cuenta para consultarse.
**MOTIVO**: es un requisito explícito de producto (modo visitante debe ser completo) y además maximiza el valor SEO/de descubrimiento del sitio.
**ALTERNATIVAS**: ninguna considerada — es una restricción dura del encargo original, no una decisión de trade-off.
**CONSECUENCIAS**: el registro se posiciona como invitación contextual ("guardá este cultivo") en vez de gate de entrada, lo cual es coherente con todo el resto del diseño de UX ([[02_UX]]).

---

### DECISION: D10 — Capa Köppen de INDEC/ANIDA como referencia editorial de clasificación climática
**Fecha**: 2026-09-09
**Evidencia**: `21_GEO_CLIMATE_RESEARCH.md` §4.1 — capa GIS "Tipos de climas" leída directamente en `geonode.indec.gob.ar`, atribuida al Atlas Nacional Interactivo de Argentina (ANIDA, IGN), aplicando clasificación Köppen, publicada 3-ene-2025. `VERIFIED` por lectura primaria (no secundaria).
**Decisión**: usar esta capa como **referencia narrativa citable** al redactar la caracterización climática de cada zona editorial (ej. "esta zona se ubica en una región de clima Köppen X según IGN/ANIDA"), **sin redistribuir el archivo de la capa** hasta resolver su licencia (figura como "Not Specified" en los metadatos leídos).
**Motivo**: es la primera fuente de clasificación climática de Argentina que este proyecto pudo verificar por lectura directa (no por snippet de buscador ni por síntesis de terceros) — cumple el estándar de evidencia más alto disponible hasta ahora para esta pregunta.
**Alternativas**: esperar a poder leer completo el Atlas Climático del SMN (descartado por ahora — el PDF excede el límite de las herramientas disponibles en esta sesión, sin fecha de resolución); usar la cifra de Wikipedia de "18 climas" (descartada como cita directa porque su fuente real es un mapa de datos 1980-2016, no el Atlas SMN 1991-2020, y no se debe presentar como si viniera del organismo oficial que en realidad no la verificó en esta investigación).
**Impacto**: no cierra el gate `CLAUDE_RESEARCH_REQUIRED` de regionalización agroecológica en su totalidad (INTA RIAN y "regiones agroeconómicas homogéneas" siguen sin lectura primaria) — solo resuelve la sub-pregunta de clasificación climática citable. Ver estado completo en `21_GEO_CLIMATE_RESEARCH.md` y `TODO.md`.

---

### DECISION: D11 — Capa editorial estructurada con adaptador de compatibilidad (Fase 7A)
**Fecha**: 2026-09-09
**Decisión**: separar el contenido editorial en una fuente de verdad estructurada (`editorial/editorialData.js`) más registros de fuentes y assets (`editorial/sources.js`, `editorial/assets.js`), expuestos vía un adaptador único (`editorial/registry.js`); `atlasData.js` deja de ser la fuente de verdad y pasa a derivar la forma plana legada desde ese adaptador, para que la UI existente (Home, índice de atlas, página de categoría) siga funcionando sin reescritura.
**Motivo**: el catálogo plano de Fase 5 mezclaba contenido, procedencia de fuentes/assets y relaciones (por slug de categoría, no de entrada) en un único array — no escalaba a más de 1 entrada por categoría ni permitía citar fuentes de forma estructurada. Separar capas evita reescribir la UI de golpe y evita tener dos fuentes de contenido que puedan divergir.
**Alternativas**: reescribir `atlasData.js` in-place con los campos nuevos (descartada — hubiera mezclado again contenido y adaptador en el mismo archivo); crear un sistema paralelo sin adaptador de compatibilidad y migrar toda la UI de una vez (descartada por el encargo explícito de "no rehacer Home/mapa/GeoSelector/Panel Ambiental" en la misma fase).
**Impacto**: código nuevo debe consumir `editorial/registry.js`; `atlasData.js` queda congelado como capa derivada, nunca editado a mano. Ver `MASTER_PACKAGE/28_EDITORIAL_CONTENT_MODEL.md`.

---

### DECISION: D12 — No degradar automáticamente el contenido ya publicado a REVIEW
**Fecha**: 2026-09-09
**Decisión**: las 7 entradas ya publicadas antes de Fase 7A mantienen `editorialStatus: 'PUBLISHED'` al migrar al nuevo modelo formal de estados (`DRAFT/REVIEW/PUBLISHED/ARCHIVED`). El flujo formal de estados rige hacia adelante (contenido nuevo empieza en `DRAFT`), no hacia atrás.
**Motivo**: introducir un campo de estado formal no debe, por sí solo, cambiar qué contenido es visible al público — eso sería un cambio de comportamiento del producto disfrazado de refactor interno de datos, fuera del alcance autorizado de esta fase.
**Alternativas**: marcar todo el contenido existente como `REVIEW` por defecto al introducir el campo (descartada explícitamente por el encargo de esta fase).
**Impacto**: ninguno visible para el usuario — el sitio sigue mostrando exactamente el mismo contenido que mostraba antes de esta fase.

---

### Nota sobre D1 (no reabierta, reforzada)
La investigación de esta ronda (`21_GEO_CLIMATE_RESEARCH.md`) no encontró evidencia que contradiga D1 (departamento/partido como unidad de datos + agrupación editorial como "zona" visible). Se identificó un candidato adicional para acelerar el agrupamiento editorial ("regiones agroeconómicas homogéneas", proyecto RySA) pero **no se pudo leer directamente**, por lo que D1 se mantiene sin modificar hasta que ese acceso se logre. No se declara esto como una nueva decisión — es una confirmación de que la decisión existente sigue vigente.

---

### D8 — Auth.js (NextAuth) como proveedor de autenticación — **SUPERADA por D13**
**DECISIÓN**: usar `Auth.js`/`NextAuth` como librería de autenticación del proyecto y dejar el flujo de registro/login recuperable dentro del mismo repositorio Next.js, con email + contraseña y verificación mínima de email.
**MOTIVO**: el stack ya está decidido como Next.js SSR/SSG con backend integrado; Auth.js es la opción más compatible con una aplicación Next.js de mantenimiento simple y ofrece el patrón de rutas de sesión y estrategias con menos riesgo de reescribir el sistema desde cero.
**ALTERNATIVAS**: auth propio desde cero (descartado por riesgo de seguridad y complejidad), proveedor administrado externo de autenticación (descartado por introducir dependencia y mayor lock-in sin necesidad inicial).
**CONSECUENCIAS**: la seguridad de la capa de sesión debe gestionarse con variables de entorno, rate limiting y políticas de recuperación; el registro sigue siendo opcional para la lectura pública y no bloquea el contenido.
**ACTUALIZACIÓN (Fase 10B)**: esta decisión nunca se implementó de verdad — lo que existía en el código era una demo de NextAuth con un único usuario hardcodeado, sin base de datos ni registro real. Al construir la autenticación real de "Mi Cultivo", se reemplazó por Supabase Auth (ver D13) en vez de completar esta ruta. Se conserva esta entrada como registro histórico de la decisión original, no como estado vigente.

---

### D9 — Cloudflare R2 como storage S3-compatible de media y fotos privadas — **SUPERADA por la implementación real de Fase 10C**
**DECISIÓN**: usar `Cloudflare R2` como almacenamiento de objetos compatible con el protocolo S3, con un bucket público para media editorial y un bucket privado para fotos de `Mi Cultivo`, usando URLs firmadas de corta duración para el bucket privado.
**MOTIVO**: el diseño del proyecto requiere separar contenido público e imágenes de `Mi Cultivo`, y la recomendación del blueprint exige un almacenamiento de objetos con URLs firmadas, sin acoplar el diseño a un servicio no portable.
**ALTERNATIVAS**: S3 de AWS (válido, pero requiere más operabilidad de billing y configuración), Supabase Storage (válido, pero introduce un lock-in proveedor más fuerte y exige evaluar la separación de buckets y URLs firmadas), storage local/físico (descartado por seguridad y no ser opción de producción).
**CONSECUENCIAS**: se necesita una política de limpieza de EXIF al subir fotos y una política de expiración de URLs firmadas para evitar acceso permanente a fotos privadas; el storage público y privado deben mantenerse separados por prefijo/bucket y no mezclar archivos de la biblioteca visual pública con fotos de cultivo.
**NOTA (Fase 10B)**: con D13 ya en Supabase para auth/base de datos, conviene reevaluar esta decisión antes de implementar fotos — usar Supabase Storage en vez de Cloudflare R2 evitaría un segundo proveedor y permitiría reutilizar las mismas políticas RLS ya escritas para `cultivos`/`cultivo_events`. No se resuelve acá (fuera de alcance de Fase 10B, que explícitamente no implementa fotos); queda como pregunta abierta para cuando se aborde esa fase.
**ACTUALIZACIÓN (Fase 10C)**: la pregunta abierta de la nota anterior se resolvió a favor de Supabase Storage, exactamente por el motivo ahí anticipado (evitar un segundo proveedor, reutilizar RLS) — bucket privado `cultivo-photos`, URLs firmadas de 30 minutos, políticas RLS sobre `storage.objects` espejando las de `cultivos`/`cultivo_events`. Cloudflare R2 nunca se implementó. La media editorial pública tampoco usa un bucket dedicado — se sirve como archivos estáticos del propio proyecto (`public/atlas/categories/real/...`). Ver `MASTER_PACKAGE/41_PHASE_10C_MI_CULTIVO_PHOTOS.md`. **Corrección de cierre de producto**: el endpoint `src/app/api/storage/route.js`, que describía el contrato de Cloudflare R2 nunca implementado (y no era llamado por ningún código del proyecto), se eliminó por describir una arquitectura inexistente — ver `MASTER_PACKAGE/47_PHASE_PRODUCT_COMPLETION.md`.

---

### D13 — Supabase (Postgres + Auth) como proveedor real de autenticación y base de datos
**DECISIÓN**: usar Supabase (Postgres administrado + Supabase Auth) como backend real de "Mi Cultivo" — reemplaza la demo falsa de NextAuth (D8) por registro/login/logout reales, con las tablas `cultivos`/`cultivo_events` protegidas por Row Level Security.
**MOTIVO**: resolvía el bloqueo de infraestructura documentado desde fases tempranas (`TODO.md`, sección BLOCKED) sin el cual "crear cuenta" solo podía simularse. El usuario provisionó un proyecto real (tier gratuito) en respuesta al reporte de bloqueo de Fase 10B — no fue una elección unilateral de Claude Code, sino la decisión de infraestructura que el propio proceso pedía que se tomara explícitamente antes de continuar.
**ALTERNATIVAS consideradas y descartadas para esta fase**: SQLite local (no sobrevive en hosting serverless, el sistema de archivos no persiste entre invocaciones); Neon Postgres + NextAuth con hashing manual (más superficie de error de seguridad, sin ganancia real sobre Supabase Auth); crear una tabla de usuarios propia sin auth gestionada (habría significado reinventar hashing/sesión/verificación, exactamente lo que D8 ya había descartado).
**CONSECUENCIAS**: introduce Supabase como dependencia de infraestructura (no solo de librería) — es free tier hoy, revisar el costo si el uso crece. El límite de envío de emails de confirmación del tier gratuito es bajo (ver `40_PHASE_10B_ACCOUNT_AUTH.md` §10) y debe revisarse antes de un lanzamiento con usuarios reales. Reabre la pregunta de si D9 (Cloudflare R2) sigue siendo la mejor opción para fotos, dado que ahora ya hay un proveedor con storage integrado (ver nota en D9).
