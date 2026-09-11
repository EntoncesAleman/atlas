# 15 — Matriz VSC Chat vs. Claude Code

Regla general (según el blueprint) aplicada al proyecto concreto.

## VSC Chat (tareas de ejecución acotada, iterativas, con contexto ya definido)
- Construir componentes de UI individuales (tarjetas de artículo, selector de zona, timeline de cultivo) una vez que el diseño conceptual ya está definido en [[02_UX]]/[[06_VISUAL]].
- Maquetar páginas siguiendo el sitemap de 02_UX.md, sección Sitemap completo y la estructura de [[11_SEO]].
- CSS/estilos siguiendo el sistema de diseño (una vez definido).
- CRUD de "Mi Cultivo" (temporadas/cultivos/eventos/notas/fotos) siguiendo el modelo ya cerrado en [[07_DATABASE]].
- Formularios (registro, login, alta de evento, alta de nota).
- Refactors simples y tests unitarios sobre funcionalidad ya especificada.
- Redacción asistida de artículos de enciclopedia siguiendo la plantilla editorial de [[05_CONTENT]] (con revisión humana de fuentes siempre).
- Documentación de código, changelogs, tareas repetitivas de contenido (carga de datos climáticos ya extraídos a la base de datos).

## Claude Code (tareas que requieren investigación, decisiones estructurales o auditoría)
- Cualquier decisión de arquitectura que este blueprint dejó abierta entre 2 alternativas ([[13_STACK]]) — requiere evaluar trade-offs con el estado real del proyecto en ese momento.
- Investigación compleja: resolver los `TODO RESEARCH` pendientes (INTA RIAN, contenido del Atlas Climático SMN, fuentes de heladas de INTA, reforma de Ley 25.326) antes de que se conviertan en contenido publicado.
- Diseño e implementación del sistema de permisos/ownership (mitigación de IDOR, [[09_SECURITY]]) — es seguridad transversal, no una feature aislada.
- Auditoría de privacidad antes de cada release que toque datos de usuario (¿se sigue cumpliendo la tabla de minimización de [[10_PRIVACY]]?).
- Integraciones complejas: proxy de clima con caché por zona, cálculo de reglas de alerta por umbral ([[04_CLIMATE]]), pipeline de limpieza de EXIF en fotos subidas.
- Revisión completa pre-lanzamiento (Fase 10 del roadmap): accesibilidad, seguridad, SEO técnico, coherencia legal.
- Cualquier cambio que toque el modelo de datos de forma estructural (migraciones que afectan relaciones entre `users`, `cultivations`, `climate_data`, etc.).

## Excepciones
- Un componente de UI "simple" que termina exponiendo datos sensibles (ej. una tarjeta que sin querer muestra `location` en vez de `zone_name`) deja de ser tarea de VSC Chat en el momento en que toca datos privados — cualquier tarea que toque `cultivation_photos`, `cultivation_notes`, o el perfil de usuario debe pasar al menos por una revisión tipo Claude Code antes de mergear, aunque la implementación inicial la haga VSC Chat.
- Redacción de contenido legal/de privacidad ([[10_PRIVACY]], [[12_LEGAL]]) nunca es tarea de "solo VSC Chat" — siempre requiere el research más profundo y, antes de publicar, revisión humana profesional (fuera del alcance de cualquier herramienta de código).
