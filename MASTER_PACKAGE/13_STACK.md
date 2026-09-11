# 13 — Stack Tecnológico

Criterios de priorización (en orden): mantenimiento sencillo por una persona/equipo chico, bajo costo (el proyecto no genera ingresos), escalabilidad razonable, buena documentación, seguridad, y posibilidad real de cambiar de proveedor sin reescribir todo (evitar lock-in innecesario). No se elige tecnología por moda.

## Frontend
- **OPCIÓN RECOMENDADA**: framework con soporte de renderizado server-side/estático (SSR/SSG) — crítico para [[11_SEO]] (la enciclopedia y las páginas de zona deben ser indexables sin depender de JS del lado del cliente) y para rendimiento en mobile con datos móviles.
- **MOTIVO**: gran parte del valor del sitio es contenido de lectura pública que debe posicionar en buscadores; un SPA puro client-side-only es la peor opción para este objetivo.
- **ALTERNATIVA**: un sitio estático generado (SSG puro) para la enciclopedia/páginas de zona + una app separada solo para "Mi Cultivo" (que sí puede ser un SPA autenticado, porque no necesita SEO). Válido, pero suma complejidad de mantener dos frontends — se recomienda **empezar unificado** con un framework que soporte ambos modos (páginas estáticas/SSR para contenido público, rutas autenticadas client-rendered para "Mi Cultivo") y solo separar si la complejidad lo justifica más adelante.

## Backend
- **OPCIÓN RECOMENDADA**: backend integrado al mismo framework/proyecto que el frontend (funciones/rutas de servidor) en vez de un backend separado desde el día 1, dado el tamaño del equipo esperado y la necesidad de mantenimiento simple.
- **MOTIVO**: menos infraestructura que operar, menos superficie de despliegue, más fácil de razonar para una persona trabajando desde VS Code.
- **ALTERNATIVA**: backend separado (framework tipo Express/FastAPI/NestJS) si en el futuro se necesita compartir la misma API con otros clientes (ej. una app móvil nativa) — no es el caso en v1.

## Base de datos
- **OPCIÓN RECOMENDADA**: base de datos relacional (Postgres o compatible) — el modelo de datos de [[07_DATABASE]] es fuertemente relacional (usuarios → temporadas → cultivos → eventos/notas/fotos, con necesidad real de integridad referencial y de políticas de acceso por fila).
- **MOTIVO**: relaciones claras, soporte maduro de row-level security (relevante para mitigar IDOR, ver [[09_SECURITY]]), buena documentación, y es el estándar más portable (fácil de migrar de proveedor sin reescribir el modelo de datos).
- **ALTERNATIVA**: una base de datos administrada con auth y storage integrados en la misma plataforma, si se prioriza velocidad de arranque y mantenimiento mínimo por sobre control total de la infraestructura.

## Auth
- **OPCIÓN RECOMENDADA**: usar el sistema de autenticación integrado del proveedor de base de datos/plataforma elegida, si cubre email+password, verificación de email, recuperación de contraseña y borrado real de cuenta (requisito no negociable de [[10_PRIVACY]]).
- **MOTIVO**: evita reinventar manejo seguro de contraseñas (hashing, rate limiting de login) desde cero.
- **ALTERNATIVA**: librería de auth de código abierto integrada al framework elegido, si se prefiere no atar el login a la misma plataforma que la base de datos (mejor portabilidad, algo más de trabajo de integración).

## Storage (fotos privadas y assets públicos)
- **OPCIÓN RECOMENDADA**: storage de objetos (tipo S3) con soporte nativo de URLs firmadas de corta duración, separando explícitamente un bucket/prefijo público (biblioteca visual editorial) de uno privado (fotos de "Mi Cultivo") — ver [[06_VISUAL]] y [[09_SECURITY]].
- **MOTIVO**: es el estándar de facto, con buena documentación y fácil de mover entre proveedores (la interfaz S3 es ampliamente compatible).

## Mapas
- **MapLibre GL JS** (recomendado) o **Leaflet** — ver justificación completa en [[03_GEO]]. Ambos gratuitos, sin lock-in de proveedor, sin API key obligatoria.

## Clima
- **Open-Meteo** (recomendado) — ver justificación completa en [[04_CLIMATE]] y [[18_EXTERNAL_SERVICES]].

## Email
- **TODO RESEARCH** en fase de construcción (no evaluado en esta ronda de investigación) — requisito no negociable: soporte de double opt-in y unsubscribe de un clic (ver [[18_EXTERNAL_SERVICES]]).

## Búsqueda
- **OPCIÓN RECOMENDADA para v1**: búsqueda de texto completo nativa de la base de datos elegida (evita sumar un servicio dedicado para un volumen de contenido moderado).
- **ALTERNATIVA**: servicio de búsqueda dedicado (útil si se agrega búsqueda semántica más adelante, ver 02_UX.md, sección Buscador en ROADMAP) — no justificado desde el día 1.

## Hosting
- **OPCIÓN RECOMENDADA**: plataforma de hosting con despliegue integrado al framework elegido, previews automáticos por rama/PR, y buen soporte de variables de entorno — reduce fricción de mantenimiento para un equipo chico.
- **MOTIVO**: minimiza DevOps manual, permite iterar rápido, buen soporte de dominios y HTTPS automático (requisito duro, ver [[10_PRIVACY]]).

## Analytics
- **OPCIÓN RECOMENDADA**: herramienta de analítica "privacy-first" sin cookies de terceros (ver justificación en [[18_EXTERNAL_SERVICES]]).
- **EVITAR por defecto**: Google Analytics u otras herramientas que dependan de cookies de terceros/fingerprinting, salvo justificación explícita — no está alineado con los principios de privacidad del proyecto ([[10_PRIVACY]]).

## Monitoring
- **OPCIÓN RECOMENDADA**: el monitoreo/logs integrado de la plataforma de hosting elegida como punto de partida (evita sumar otro servicio desde el día 1); herramienta de tracking de errores dedicada solo si el volumen de uso lo justifica.

## Nota general
Casi todas las decisiones de esta sección quedan **intencionalmente abiertas entre 2 opciones concretas** (no una única marca), porque elegir el proveedor exacto es una decisión de implementación, no de arquitectura — corresponde a la fase de construcción, con este documento como filtro de criterios. Ver también la matriz VSC Chat vs. Claude Code en [[15_TASK_MATRIX]] para quién debería tomar esa decisión final.
