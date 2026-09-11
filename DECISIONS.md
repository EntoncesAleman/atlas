# DECISIONS (espejo corto)

Detalle completo (motivo, alternativas, consecuencias) en `MASTER_PACKAGE/16_DECISIONS.md`. Resumen de navegación rápida:

- **D1** — "Zona aproximada" = departamento/partido agrupado editorialmente en regiones con nombre reconocible.
- **D2** — Open-Meteo (tier gratuito no comercial) como proveedor principal de clima.
- **D3** — MapLibre GL JS / Leaflet en vez de Mapbox GL JS (evitar licencia paga).
- **D4** — Base de datos relacional (Postgres o compatible) como fuente de verdad.
- **D5** — Cero venta, cero marcas, cero enlaces comerciales — regla dura de producto.
- **D6** — Double opt-in y baja de un clic en newsletter/alertas, por encima del piso legal.
- **D7** — Registro/login nunca bloquea la lectura pública.
- **D8** — Auth.js (NextAuth) como proveedor de autenticación de la aplicación Next.js. **Superada por D13** (nunca se implementó de verdad; era una demo con usuario hardcodeado).
- **D9** — Cloudflare R2 como storage S3-compatible con bucket público y privado para media editorial y fotos de Mi Cultivo. **Superada por la implementación real de Fase 10C**: fotos privadas usan Supabase Storage (bucket `cultivo-photos`), media editorial pública son archivos estáticos del proyecto — Cloudflare R2 nunca se implementó.
- **D10** — Capa Köppen de INDEC/ANIDA (verificada por lectura directa) como referencia editorial citable de clasificación climática, con licencia pendiente de confirmar antes de redistribuir el archivo. Ver `MASTER_PACKAGE/21_GEO_CLIMATE_RESEARCH.md`.
- **D11** — Capa editorial estructurada (`editorial/editorialData.js` + `registry.js`) como fuente de verdad; `atlasData.js` pasa a ser un adaptador derivado, no editado a mano. Ver `MASTER_PACKAGE/28_EDITORIAL_CONTENT_MODEL.md`.
- **D12** — El contenido ya publicado no se degrada automáticamente a `REVIEW` al introducir el estado editorial formal; el flujo formal rige solo hacia adelante.
- **D13** — Supabase (Postgres + Auth) como proveedor real de autenticación y base de datos, resolviendo el bloqueo de infraestructura de auth — usado hoy para "Mi Cultivo" (registro/login/logout reales, RLS). Ver `MASTER_PACKAGE/40_PHASE_10B_ACCOUNT_AUTH.md`.
