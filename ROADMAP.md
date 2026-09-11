# ROADMAP (espejo corto)

Detalle completo, dependencias, entregables y criterios de cierre en `MASTER_PACKAGE/14_ROADMAP.md`. Este archivo es solo un resumen de navegación rápida.

1. **Foundation** — proyecto base, stack elegido, deploy vacío.
2. **Sistema geográfico** — provincias/zonas cargadas con datos reales.
3. **Mapa** — "¿Dónde cultivás?" funcional con fallback accesible.
4. **Enciclopedia** — categorías núcleo publicadas.
5. **Clima** — climatología de referencia + pronóstico operativo por zona.
6. **Usuarios** — registro/login/perfil, con borrado real de cuenta.
7. **Diario de cultivo** — "Mi Cultivo" de punta a punta.
8. **Alertas y Newsletter** — double opt-in, baja en un clic.
9. **SEO y Buscador**.
10. **QA y Accesibilidad** — revisión transversal pre-lanzamiento.
11. **Lanzamiento**.

Priorización MUST/SHOULD/COULD/LATER: ver sección "Priorización" en `MASTER_PACKAGE/14_ROADMAP.md`.

Estado real de implementación (loops de construcción, no 1:1 con las fases de arriba): ver `TODO.md`.

**Cierre funcional verificado**: Home, Atlas (enciclopedia núcleo, 7 categorías), Mi Cultivo (diario de cultivo completo), Chatbot (acceso + retrieval + contexto) y Usuarios (Supabase Auth/RLS) fueron auditados de punta a punta y confirmados funcionando — ver `MASTER_PACKAGE/47_PHASE_PRODUCT_COMPLETION.md`. Pendientes reales sin cambios: Alertas y Newsletter (fase 8, sin proveedor decidido), SEO y Buscador (fase 9), profundización enciclopédica de las 7 entradas (Historia/Cómo se hace — pausada, ver `TODO.md`).

**Contextualización provincial (Patch 47.2)**: las 7 entradas del Atlas ya usan la provincia elegida (macrorregión + latitud real, sin clasificación climática) para mostrar una sección "Contexto de tu zona" — ver `MASTER_PACKAGE/47_2_PROVINCIAL_CONTEXT.md`. La climatología de referencia por zona (punto 5 de arriba) sigue sin resolver: sigue dependiendo del gate `PARTIAL_RESEARCH` de `21_GEO_CLIMATE_RESEARCH.md`, que este patch no adelantó a propósito.
