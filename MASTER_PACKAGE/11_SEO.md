# 11 — SEO

## Objetivo
Que el contenido educativo/regional sea indexable y encontrable — es la forma principal de descubrimiento orgánico dado que el proyecto no hace paid media ni tiene presupuesto de marketing (**ASSUMPTION**).

## Estructura de URLs propuesta
```
/                                   → home ("¿Dónde cultivás?")
/argentina                         → vista nacional / mapa
/provincias                        → listado de provincias
/provincias/{provincia-slug}       → página de provincia (resumen clima/suelo/agua + contenido regional destacado)
/provincias/{provincia-slug}/{zona-slug} → página de zona
/enciclopedia                      → índice de categorías
/enciclopedia/{categoria-slug}     → índice de artículos de la categoría
/enciclopedia/{categoria-slug}/{articulo-slug} → artículo
/clima                             → landing del módulo clima
/clima/{provincia-slug}/{zona-slug} → clima de una zona
/calendario                        → landing del calendario
/calendario/{provincia-slug}       → calendario por provincia
/comparar                          → herramienta de comparación (con query params para regiones elegidas, ej. ?a=mendoza&b=buenos-aires)
/buscar                            → resultados de búsqueda
/sobre-el-proyecto, /privacidad, /terminos, /cookies
```
Rutas privadas (`/mi-cultivo/*`, `/perfil/*`) se marcan `noindex` explícitamente.

## Metadata
- Title y meta description únicos por página, especialmente en páginas de provincia/zona/artículo (evitar templates genéricos tipo "{zona} — Atlas del Cultivo" repetido sin valor adicional; incluir el dato distintivo, ej. "Cultivo en Valle de Uco, Mendoza — clima, altitud y suelo").
- Open Graph + Twitter Card para artículos y páginas de zona (imagen principal del artículo/zona).
- `canonical` obligatorio en toda página, especialmente relevante en `/comparar` (evitar indexar infinitas combinaciones de query params como páginas distintas — usar canonical a `/comparar` sin params o a un set curado de comparaciones populares).

## Sitemap
- Sitemap XML generado dinámicamente, segmentado (ej. `sitemap-articulos.xml`, `sitemap-zonas.xml`) si el volumen de contenido regional crece mucho (provincia × zona puede dar cientos de páginas).
- Solo se listan páginas públicas indexables; `/mi-cultivo/*`, `/perfil/*`, `/alertas/*` nunca aparecen.

## Structured Data (JSON-LD)
- `Article` en artículos de enciclopedia (author, datePublished, dateModified — importante dado que el contenido climático/agronómico se revisa periódicamente, ver [[05_CONTENT]]).
- `BreadcrumbList` en toda página con jerarquía Argentina → Provincia → Zona → Contenido.
- `FAQPage` en la sección de preguntas frecuentes por región, si el contenido efectivamente tiene formato pregunta/respuesta.
- Evitar marcar `Product` en absolutamente ningún caso (coherente con la regla "no ecommerce" — un uso incorrecto de structured data de producto sería una señal contradictoria tanto para buscadores como para el posicionamiento del proyecto).

## Contenido duplicado y páginas dinámicas
- Riesgo: páginas de zona con muy poco contenido único (solo datos climáticos tabulares) pueden leerse como "thin content" por buscadores. Mitigación: cada página de zona debe tener al menos un resumen narrativo único, no solo una tabla de datos.
- Riesgo: el comparador puede generar combinaciones casi infinitas de URLs. Mitigación: el comparador es interactivo (client-side/query param) y no genera páginas estáticas indexables por combinación — se indexa la herramienta, no cada combinación.

## Rendimiento (relevante para SEO también, no solo UX)
- Mobile-first real (Core Web Vitals se miden mayormente en mobile hoy).
- Imágenes optimizadas (ver [[06_VISUAL]]) impactan directamente LCP.
- El mapa interactivo no debe bloquear el render inicial de contenido textual (carga diferida/lazy del mapa pesado, contenido de texto ya visible y indexable sin JS si es posible — preferir server-side rendering o generación estática para contenido de enciclopedia y zonas, ver [[13_STACK]]).
