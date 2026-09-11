# MASTER — Atlas del Cultivo Argentino

Blueprint completo (no código) de una web argentina, exclusivamente informativa, sobre cultivo de cannabis, organizada alrededor de un principio: **el cultivo no es igual en toda Argentina.**

No es ecommerce. No vende nada. No recomienda productos comerciales. No está orientada al consumo. No pide datos personales innecesarios.

## Flujo central del producto (no debe romperse en ninguna decisión futura)
```
ARGENTINA → PROVINCIA → ZONA APROXIMADA → CONDICIONES AMBIENTALES → CONTENIDO RELEVANTE
```
Con "Mi Cultivo" (diario privado, requiere cuenta) como capa opcional sobre ese mismo eje geográfico.

## Dónde está cada cosa
Toda la especificación detallada vive en `MASTER_PACKAGE/`. Este archivo es solo el punto de entrada — no dupliques contenido acá, edita los documentos especializados.

| Archivo | Contenido |
|---|---|
| `01_PRODUCT.md` | Qué es, qué no es, modo visitante vs. usuario |
| `02_UX.md` | Flujos, navegación, sitemap, accesibilidad, responsive, sistema de diseño |
| `03_GEO.md` | Jerarquía geográfica, estrategia de zonas, fuentes de datos, mapa |
| `04_CLIMATE.md` | Climatología de referencia vs. clima operativo, proveedores, alertas |
| `05_CONTENT.md` | Arquitectura de la enciclopedia (categorías, tipo general/regional) |
| `06_VISUAL.md` | Biblioteca visual (assets, metadatos, licencias) |
| `07_DATABASE.md` | Modelo de datos conceptual |
| `08_ARCHITECTURE.md` | Arquitectura lógica del sistema |
| `09_SECURITY.md` | Threat model |
| `10_PRIVACY.md` | Principios y modelo de privacidad |
| `11_SEO.md` | URLs, metadata, sitemap técnico, structured data |
| `12_LEGAL.md` | Estado legal investigado (autocultivo, datos personales, newsletter, cookies) |
| `13_STACK.md` | Opciones de stack tecnológico con motivo/alternativa |
| `14_ROADMAP.md` | Fases de construcción + priorización MUST/SHOULD/COULD/LATER |
| `15_TASK_MATRIX.md` | Qué tarea es VSC Chat vs. Claude Code |
| `16_DECISIONS.md` | Decisiones tomadas, con motivo/alternativas/consecuencias |
| `17_RISKS.md` | Riesgos identificados y mitigaciones |
| `18_EXTERNAL_SERVICES.md` | Servicios de terceros evaluados |
| `19_SOURCE_REGISTRY.md` | Todas las fuentes externas citadas, con fecha y estado |
| `20_MASTER_SUMMARY.md` | Resumen ejecutivo + auditoría de factibilidad |
| `21_GEO_CLIMATE_RESEARCH.md` | Investigación de cierre del gate agroclimático: regionalización INTA, clasificación Köppen, heladas, unidad de "zona" |

Ver también, en la raíz: `TODO.md` (próximas tareas concretas), `DECISIONS.md` (espejo corto de 16_DECISIONS.md) y `ROADMAP.md` (espejo corto de 14_ROADMAP.md).

## Reglas duras que ninguna fase de construcción puede violar
1. Nada de ecommerce, venta, ni marcas comerciales.
2. Ubicación siempre aproximada (provincia/zona) — nunca dirección exacta ni GPS.
3. Modo visitante siempre completo — el login nunca bloquea la lectura.
4. Todo dato ambiental/legal publicado debe tener fuente trazable en `19_SOURCE_REGISTRY.md`, o estar marcado `ASSUMPTION`/`UNVERIFIED`/`TODO RESEARCH`.
5. Aislamiento estricto entre datos públicos (editorial) y privados (Mi Cultivo).

## Estado de este blueprint
Investigación y arquitectura completas. Ningún código fue escrito, ninguna dependencia fue instalada, ningún componente fue creado — por diseño, según el encargo original. La construcción real es el siguiente paso, no parte de este entregable.
