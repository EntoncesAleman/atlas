# 14 — Roadmap

Fases de construcción de alto nivel (no microtareas). Cada una asume que las anteriores están funcionalmente completas, aunque puede haber solapamiento real en ejecución.

## FASE 1 — Foundation
**Objetivo**: proyecto base funcionando (stack elegido, deploy vacío accesible, base de datos conectada, esquema inicial de [[07_DATABASE]] migrado).
**Dependencias**: decisiones de [[13_STACK]] tomadas y confirmadas (no solo "opción recomendada" — elegidas en concreto).
**Entregables**: repo inicializado, CI/deploy básico, esquema de base de datos de entidades públicas creado, página de inicio placeholder desplegada.
**Riesgos**: sobre-invertir en infraestructura antes de tener contenido real — mitigar yendo directo a Fase 2/3 en paralelo apenas esto esté funcional.
**Criterio de cierre**: un dominio real muestra una página "Atlas del Cultivo Argentino — en construcción" con HTTPS funcionando.

## FASE 2 — Sistema geográfico
**Objetivo**: jerarquía Argentina → Provincia → Zona cargada con datos reales (no placeholders) según la estrategia de [[03_GEO]].
**Dependencias**: Fase 1; resolución del TODO RESEARCH de INTA RIAN antes de definir el agrupamiento final de zonas.
**Entregables**: tabla `provinces` y `zones` pobladas, GeoJSON de límites integrado, páginas `/provincias/*` navegables (aunque el contenido de cada zona sea mínimo todavía).
**Riesgos**: subestimar el trabajo editorial de agrupar departamentos en zonas reconocibles — es contenido, no solo datos.
**Criterio de cierre**: se puede navegar Argentina → cualquier provincia → cualquier zona definida, sin errores, con datos reales de altitud/clima básico cargados.

## FASE 3 — Mapa
**Objetivo**: "¿Dónde cultivás?" funcional de punta a punta (mapa interactivo + fallback en lista).
**Dependencias**: Fase 2.
**Entregables**: componente de mapa (MapLibre/Leaflet) integrado a home, selector alternativo por texto, persistencia de selección en `localStorage`.
**Riesgos**: invertir demasiado en pulido visual del mapa antes de validar que el flujo completo (provincia → zona → contenido) funciona — el fallback en lista debe funcionar primero, el mapa es una mejora sobre eso, no al revés.
**Criterio de cierre**: un usuario puede completar el flujo de selección de ubicación sin usar el mouse (accesibilidad) y con el mapa deshabilitado (fallback).

## FASE 4 — Enciclopedia
**Objetivo**: las 13+ categorías de [[05_CONTENT]] con contenido real publicado (aunque sea parcial en cobertura, no en calidad).
**Dependencias**: Fase 1 (puede avanzar en paralelo a Fases 2/3, el contenido general no depende del sistema geográfico).
**Entregables**: CMS/editor de contenido interno (aunque sea mínimo), artículos publicados por categoría, sistema de bloques regionales ("En tu zona") integrado una vez exista Fase 2.
**Riesgos**: mayor riesgo de todo el proyecto — es la fase de más volumen de trabajo humano (redacción, revisión, curaduría de fuentes) y no se puede acelerar solo con más ingeniería.
**Criterio de cierre**: cada una de las 13 categorías tiene al menos un artículo publicado y revisado editorialmente.

## FASE 5 — Clima
**Objetivo**: módulo de clima funcional (climatología de referencia + pronóstico operativo) según [[04_CLIMATE]].
**Dependencias**: Fase 2 (necesita zonas definidas), decisión confirmada de proveedor ([[18_EXTERNAL_SERVICES]]).
**Entregables**: proxy de clima en backend, páginas `/clima/*` con datos reales, climatología de referencia cargada por zona (desde SMN/INTA).
**Riesgos**: dependencia de fuentes en PDF (SMN) que requieren extracción manual — no subestimar el tiempo de esta tarea.
**Criterio de cierre**: cualquier zona muestra clima actual + climatología de referencia con fuente citada.

## FASE 6 — Usuarios
**Objetivo**: registro/login/perfil funcionando de punta a punta, incluyendo borrado real de cuenta.
**Dependencias**: Fase 1; decisión de auth confirmada.
**Entregables**: flujos de 02_UX.md, sección Cuentas (registro, login, logout, recuperación, perfil, preferencias).
**Riesgos**: implementar borrado de cuenta como "soft delete" únicamente y llamarlo terminado — no cumple el principio de privacidad, ver [[10_PRIVACY]]/[[17_RISKS]].
**Criterio de cierre**: un usuario puede crear cuenta, cerrar sesión, recuperar contraseña, y eliminar su cuenta completamente (con período de gracia documentado).

## FASE 7 — Diario de cultivo ("Mi Cultivo")
**Objetivo**: modelo completo de 02_UX.md, flujo "Diario de cultivo"/[[07_DATABASE]] funcionando (temporada → cultivo → eventos/notas/fotos → timeline).
**Dependencias**: Fase 6; storage privado configurado con URLs firmadas.
**Entregables**: CRUD completo de temporadas/cultivos/eventos/notas/fotos, timeline visual, subida de fotos con limpieza de EXIF.
**Riesgos**: es la funcionalidad más sensible en privacidad/seguridad del proyecto — no acortar la revisión de seguridad de esta fase (ver [[09_SECURITY]]).
**Criterio de cierre**: un usuario puede crear una temporada, un cultivo, registrar eventos y fotos, y ver su historial completo desde otro dispositivo tras loguearse.

## FASE 8 — Alertas y Newsletter
**Objetivo**: sistema de alertas meteorológicas y newsletter funcionando con double opt-in real.
**Dependencias**: Fase 5 (clima) y Fase 6 (usuarios).
**Entregables**: job programado de evaluación de alertas, emails de confirmación/baja, archivo de newsletter.
**Riesgos**: spam/abuso si no se implementa rate limiting y verificación anti-bot desde el inicio (ver [[09_SECURITY]]).
**Criterio de cierre**: un usuario puede activar alertas para su zona, recibir un email de prueba, y darse de baja en un clic sin login.

## FASE 9 — SEO y Buscador
**Objetivo**: sitio completamente indexable, sitemap real, buscador interno funcional.
**Dependencias**: Fase 4 (necesita contenido real para tener sentido).
**Entregables**: sitemap XML, structured data, metadata única por página, buscador con filtros básicos.
**Criterio de cierre**: Google Search Console (u equivalente) no reporta errores de indexación en las páginas públicas principales.

## FASE 10 — QA y Accesibilidad
**Objetivo**: revisión transversal de accesibilidad, responsive real, seguridad y privacidad antes de lanzamiento.
**Dependencias**: todas las anteriores funcionalmente completas.
**Entregables**: checklist de 02_UX.md, sección Accesibilidad verificado, revisión de seguridad ([[09_SECURITY]]) ejecutada, revisión legal de textos ([[12_LEGAL]]) confirmada por profesional.
**Criterio de cierre**: ningún ítem crítico abierto en el checklist de accesibilidad ni en el threat model.

## FASE 11 — Lanzamiento
**Objetivo**: sitio público, dominio final, monitoreo activo.
**Dependencias**: Fase 10.
**Entregables**: deploy de producción, dominio propio, monitoreo/analytics activos, plan de respuesta si algo falla el día 1.
**Criterio de cierre**: el sitio está accesible públicamente y cumple el criterio de éxito descripto en MASTER.md.

## Nota sobre orden
Fases 2-4 pueden avanzar en paralelo (geografía, mapa, contenido general no dependen entre sí más que en el punto de integración final). Fases 6-7 son secuenciales (no hay diario de cultivo sin usuarios). Fase 8 depende de 5 y 6 simultáneamente.

## Priorización (MUST / SHOULD / COULD / LATER)

**MUST HAVE** (sin esto no hay producto — Fases 1-7 del roadmap)
- Selector "¿Dónde cultivás?" (provincia + zona opcional) y su fallback accesible.
- Enciclopedia con las categorías núcleo publicadas y revisadas.
- Clima de referencia y operativo por zona.
- Cuentas con borrado real (no soft-delete de cara al usuario).
- Diario de cultivo (temporada → cultivo → eventos/notas/fotos → timeline).
- Privacidad y seguridad base: storage privado firmado, limpieza de EXIF, aislamiento por `user_id`.
- Textos legales (privacidad, términos, disclaimer editorial).

**SHOULD HAVE** (mejora sustancial, no bloquea el lanzamiento — Fases 8-9)
- Alertas meteorológicas por email.
- Newsletter con double opt-in.
- SEO técnico completo (sitemap, structured data, metadata única).
- Buscador con filtros.
- Comparador de zonas.

**COULD HAVE** (valioso pero postergable sin afectar la propuesta central)
- Calendario argentino completo con las 5 categorías de dato (astronómico/climático/botánico/agrícola/histórico) — una versión mínima (solo climático) puede ir en MUST, la versión completa es COULD.
- Favoritos de artículos.
- Exportación de datos del usuario en un formato más rico que un volcado simple.

**LATER** (fuera de alcance de v1, evaluar solo si hay evidencia real de necesidad)
- Búsqueda semántica.
- Cualquier forma de comunidad (comentarios, mensajería entre usuarios, contenido generado y compartido públicamente).
- App móvil nativa separada.
- Regionalización a nivel de departamento completo (arrancar con agrupaciones editoriales más gruesas y refinar después, ver [[03_GEO]]).

**Regla de aplicación**: ninguna tarea de SHOULD/COULD/LATER debe empezar a construirse mientras haya un MUST HAVE incompleto de una fase anterior del roadmap — evita que funcionalidades secundarias (por ejemplo, un comparador vistoso) desvíen tiempo de lo que hace al producto funcionar (por ejemplo, borrado de cuenta real).

## Estado de implementación real (nota de sincronización)
La construcción real avanzó con su propia numeración de "loops" (Fase 1 Foundation → ... → Fase 6 Curaduría visual real → Fase 7A Normalización del modelo editorial), documentada fase por fase en `TODO.md` y en los documentos `22` a `29` de este paquete. Esa numeración de loops no es 1:1 con las 11 fases de este roadmap original (ej. "Fase 3 — Sistema geográfico" del roadmap corresponde a varias fases de loop distintas) — `TODO.md` es la fuente de verdad del estado real de implementación en cualquier momento; este roadmap sigue siendo la fuente de verdad de la secuencia y prioridad de alto nivel.
