# 20 — Resumen Ejecutivo

## Qué es
**Atlas del Cultivo Argentino**: plataforma web exclusivamente informativa sobre cultivo de cannabis en Argentina, organizada alrededor del principio "el cultivo no es igual en toda Argentina" — cruza contenido botánico/agrícola con la geografía real del país (provincia → zona aproximada → clima/suelo/agua → contenido). Sin ecommerce, sin venta, sin marcas, sin orientación al consumo. Detalle completo en [[01_PRODUCT]].

## Por qué
No existe hoy una fuente en español que combine sistemáticamente agronomía del cannabis con la heterogeneidad climática real de Argentina, en un espacio serio y no comercial, distinto de foros y grow shops.

## Para quién
Personas en Argentina que autocultivan (amparadas por el marco de REPROCANN, ver estado legal en [[12_LEGAL]]) o que exploran el tema por interés botánico/científico, sin necesidad de exponer identidad ni ubicación exacta.

## Cómo funciona (flujo central, no debe romperse en ninguna decisión futura)
```
ARGENTINA → PROVINCIA → ZONA → INFORMACIÓN → MI CULTIVO
```
Modo visitante (sin cuenta) cubre toda la consulta; modo usuario (con cuenta) agrega solo lo que necesita persistencia real: diario de cultivo, alertas, newsletter, favoritos. Detalle en [[02_UX]].

## Qué datos necesita
Modelo relacional con dos mitades claramente separadas: contenido público editorial (provincias, zonas, artículos, clima de referencia) y datos privados de usuario (cultivos, eventos, notas, fotos) con aislamiento estricto por `user_id`. Nunca se guarda dirección exacta ni coordenadas GPS. Detalle en [[07_DATABASE]].

## Qué arquitectura usar
Frontend con SSR/SSG para contenido público (indexabilidad, [[11_SEO]]) + app autenticada para "Mi Cultivo"; backend como única capa de autorización; base de datos relacional; todo servicio externo (clima, storage) accedido vía proxy del backend, nunca directo desde el navegador. Detalle en [[08_ARCHITECTURE]] y [[13_STACK]].

## Qué servicios externos necesita
- **Clima**: Open-Meteo (tier gratuito no comercial) como motor principal — sin costo, cobertura de Argentina confirmada, términos compatibles con el perfil del proyecto.
- **Mapas**: MapLibre GL JS o Leaflet (open-source, sin API key) + límites geográficos de georef-ar-api/IGN (gratuitos).
- **Auth, storage, email, búsqueda, analítica, monitoreo**: sin decisión de proveedor tomada — criterios definidos en [[13_STACK]] y [[18_EXTERNAL_SERVICES]], pendientes de elegir en fase de construcción.

## Qué riesgos existen
Los más importantes (detalle completo en [[17_RISKS]]):
1. **Regulatorio**: posible cambio sobre REPROCANN (anunciado, no confirmado como ejecutado) — mitigado con fechas de revisión visibles y lenguaje no absoluto.
2. **Privacidad**: fuga de ubicación aproximada + identidad + fotos de cultivo es el peor escenario posible dado el tema — mitigado con storage privado firmado, limpieza de EXIF, y ubicación nunca más precisa que zona.
3. **Seguridad**: IDOR en "Mi Cultivo" es el riesgo técnico más crítico — mitigado con aislamiento estricto por `user_id` a nivel de política de datos, no solo de aplicación.
4. **Contenido**: el trabajo editorial (redacción + agrupamiento geográfico + climatología) es el cuello de botella real del proyecto, no la ingeniería.

## Qué falta investigar (TODO RESEARCH activos)
- Si INTA RIAN (Regiones Agroecológicas) ofrece una regionalización oficial reutilizable para las "zonas" — no se pudo acceder al sitio en esta investigación.
- Contenido exacto del Atlas Climático SMN (¿usa códigos Köppen explícitos?).
- Acceso y formato real de los datos de heladas por deciles de INTA (climayagua.inta.gob.ar).
- Estado real (ejecutado o no) del anuncio de baja de registros REPROCANN y del Decreto 27/2026.
- Estado de los proyectos de reforma de Ley 25.326 (Carro/Doñate/Yeza).
Todos registrados con fuente y estado en [[19_SOURCE_REGISTRY]].

## Qué debe construirse primero
Fases 1-7 del roadmap ([[14_ROADMAP]]): foundation → sistema geográfico → mapa → enciclopedia → clima → usuarios → diario de cultivo. Priorización MUST/SHOULD/COULD/LATER en la sección "Priorización" de ese mismo documento.

## Cierre del piloto editorial "Germinación" (Fase 7B1, 2026-09-10)
La entrada `germinacion` es, a esta fecha, la única entrada del Atlas con contenido editorial completo bajo el modelo de Fase 7A: estructura en 5 secciones, observaciones separadas de interpretación, señales categorizadas (`ESPERABLE`/`ATENCIÓN`/`AMBIGUA`), errores frecuentes tipados, contexto ambiental, y 5 fuentes reales investigadas con prioridad argentina/académica (INASE, dos cátedras universitarias — UNNE y UNPSJB —, y dos publicaciones científicas internacionales sobre germinación de *Cannabis sativa*), documentadas con honestidad sobre qué se pudo verificar por lectura directa y qué quedó con verificación parcial. El piloto validó el modelo editorial y encontró dos correcciones menores (forma de `signals`/`commonMistakes`/`observations`/`environmentContext`, y una fuga de nota interna a un campo público) — ambas corregidas y documentadas en `28_EDITORIAL_CONTENT_MODEL.md` y `30_GERMINACION_PILOT.md`. Las otras 6 entradas del Atlas siguen con el contenido mínimo heredado de Fase 5 — replicar este patrón es el trabajo pendiente más directo hacia un Atlas con contenido real.

## Estado real de la construcción (actualizado 2026-09-09)
La construcción ya avanzó considerablemente por fuera de este blueprint inicial, en "loops" documentados fase por fase en `TODO.md` y en `MASTER_PACKAGE/22` a `29`: Home rediseñada en dirección visual **RELIEVE** (con mapa real, selector geográfico y Panel Ambiental honesto sobre su falta de datos), un Atlas navegable (`/atlas`, categoría, entrada) con 7 categorías y 7 entradas reales, una biblioteca visual curada con fuentes reales y licenciadas (Wikimedia Commons, tras descartar un experimento con generación por IA — ver `27B_POLLINATIONS_VISUAL_EXPERIMENT.md`), página de créditos/atribución, y — más recientemente (Fase 7A) — un modelo editorial estructurado (fuentes, assets, relaciones por ID real, estado editorial formal) que reemplaza el catálogo plano inicial sin romper la UI existente. El sistema geográfico (`/api/geo`), el mapa y el Panel Ambiental permanecen sin datos climáticos reales (`PARTIAL_RESEARCH`, ver `21_GEO_CLIMATE_RESEARCH.md`) — esa sigue siendo la brecha más importante entre este resumen y un producto terminado. Auth, storage, hosting y proveedor de email siguen sin decisión de infraestructura cerrada (`BLOCKED` en `TODO.md`).

## Qué puede hacer VSC Chat / qué merece Claude Code
Ver matriz completa en [[15_TASK_MATRIX]]. Regla corta: construcción de UI/CRUD/contenido sobre especificación ya cerrada → VSC Chat; decisiones de arquitectura, seguridad transversal (permisos/IDOR), investigación de fuentes, y cualquier cosa que toque datos privados de usuario → Claude Code.

## Auditoría de factibilidad (Fase 28 del encargo original)
- **¿Es técnicamente viable?** Sí — no requiere tecnología experimental; el stack recomendado (SSR/SSG + backend integrado + Postgres + storage de objetos) es estándar y bien documentado.
- **¿Es económicamente viable?** Sí, para v1 — los dos servicios externos ya evaluados (clima, mapas) tienen opciones gratuitas viables sin tarjeta. El costo real está en tiempo humano de contenido, no en infraestructura.
- **¿Qué servicios externos son necesarios?** Clima (Open-Meteo), mapas/geo (MapLibre o Leaflet + georef-ar-api), y — sin decidir todavía — auth, storage, email, hosting.
- **¿Qué servicios pueden tener costo?** Cualquiera de los anteriores al superar el tier gratuito por volumen de tráfico; el más sensible al costo si el proyecto crece es clima (Open-Meteo es gratis solo bajo uso no comercial) y storage de fotos (crece con el uso real de "Mi Cultivo").
- **¿Qué datos son difíciles de conseguir?** Climatología oficial por zona sub-provincial (SMN/INTA están en PDF, no en API) y la regionalización agroclimática de INTA (acceso no confirmado en esta investigación).
- **¿Qué información requiere actualización periódica?** Contenido legal ([[12_LEGAL]]), climatología si cambian los períodos normales publicados por SMN, y cualquier artículo que dependa de estado regulatorio.
- **¿Qué partes son difíciles?** El trabajo editorial de agrupar ~530 departamentos en zonas reconocibles ([[03_GEO]]); el diseño correcto de permisos/aislamiento de datos privados ([[09_SECURITY]]).
- **¿Qué partes son innecesarias (por ahora)?** Comunidad/comentarios, búsqueda semántica, app nativa — todo marcado LATER.
- **¿Qué partes podrían simplificarse?** El calendario completo (5 tipos de dato) puede arrancar solo con el componente climático; el comparador puede arrancar con menos variables que las ideales y crecer después.
- **¿Qué puede construirse sin servicios externos?** Enciclopedia, sistema geográfico (con GeoJSON estático), diario de cultivo (salvo storage de fotos), estructura de cuentas — todo corre sobre el stack propio sin depender de terceros salvo para clima/mapas/storage/email.
- **¿Qué puede hacer VSC Chat? ¿Qué merece Claude Code?** Ver [[15_TASK_MATRIX]].

## Verificación de coherencia (Regla Final del encargo)
- ✅ El proyecto sigue siendo exclusivamente informativo — ninguna sección de este blueprint introduce venta, catálogo de producto, ni checkout.
- ✅ Sin ecommerce, sin venta de productos — regla dura repetida y reforzada en [[01_PRODUCT]], [[05_CONTENT]], [[12_LEGAL]], [[16_DECISIONS]] (D5).
- ✅ La experiencia principal se mantiene: `ARGENTINA → PROVINCIA → ZONA → INFORMACIÓN → MI CULTIVO`.
- ⚠️ Contradicciones/duplicaciones detectadas y resueltas durante la redacción: varias referencias cruzadas apuntaban a documentos no incluidos en el paquete de 20 archivos (accesibilidad, responsive, sistema de diseño, sitemap, calendario, buscador, comparador, cuentas, newsletter, priorización) — se consolidaron dentro de [[02_UX]] y [[14_ROADMAP]] en vez de crear archivos adicionales fuera del listado pedido.
- ⚠️ Dependencias externas a vigilar por costo: Open-Meteo (gratis solo si el proyecto se mantiene no comercial), storage de fotos (crece con adopción de "Mi Cultivo").
- ⚠️ Riesgos de privacidad ya mitigados por diseño (no requieren rediseño, solo disciplina de implementación): ubicación aproximada, limpieza de EXIF, storage privado firmado.
- ⚠️ Información que necesita actualización periódica: todo lo marcado `UNVERIFIED`/`TODO RESEARCH` en [[19_SOURCE_REGISTRY]], especialmente el bloque legal (REPROCANN, reforma de datos personales).
