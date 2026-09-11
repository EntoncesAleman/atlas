# 27B — Experimento Visual 100% Pollinations (Fase 6B)

Experimento controlado: resolver la colección visual del Atlas usando **exclusivamente Pollinations** como fuente de imagen, sin búsqueda web, sin bancos de imágenes, sin Wikimedia, sin mapas ni satélite reales. No reemplaza la Fase 6 de curaduría de fuentes reales — es una medición de qué tan lejos llega un generador de imágenes gratuito por sí solo.

## 1. Objetivo

Determinar si Pollinations puede producir, sin ninguna otra fuente visual, una colección editorial coherente con la dirección **RELIEVE** para los 7 assets de categoría ya existentes (`25_FIRST_ASSET_COLLECTION.md`), y documentar honestamente dónde funciona y dónde no — incluyendo dos pruebas experimentales adicionales (mapa y vista aérea) que **no** se usan para navegación real ni para datos geográficos/climáticos.

## 2. Método

- Acceso: endpoint público gratuito `https://image.pollinations.ai/prompt/{prompt}?width=W&height=H&seed=N&nologo=true`, sin API key, sin costo. Reachability confirmada con un `curl` de prueba antes de empezar (200 OK, JPEG válido).
- Sin instalación de dependencias nuevas para la generación (uso de `curl` + `python3` stdlib para URL-encoding, ya presentes en el entorno). Se usó `playwright` (ya instalado como dependencia del proyecto desde una fase anterior) para la verificación visual en navegador real — no se instaló nada nuevo.
- Máximo 3 intentos por asset, con evaluación entre cada intento y prompt corregido si el resultado era claramente malo.
- Rúbrica de 20 puntos (Calidad visual, Coherencia con RELIEVE, Credibilidad, Utilidad editorial — 0-5 cada una): 17-20 Excelente, 14-16 Aceptable, 10-13 Dudosa, 0-9 Descartar.
- Todas las pruebas y variantes descartadas quedaron en un directorio temporal fuera de `public/` (`scratchpad/pollinations/attempt1|2|3/`); solo los resultados aceptados se copiaron a `public/atlas/categories/pollinations/`.
- Evaluación de cada imagen hecha por inspección visual directa (no hay librería de análisis de imagen instalada ni se instaló una para este experimento).

## 3. Prompts utilizados y resultados por asset

### 3.1 Fundamentos
- **Intento 1** (único, aceptado): *"Editorial botanical atlas illustration, vintage scientific engraving style, diagram of a plant life cycle from seed to seedling to mature plant, muted sage green and cream palette, fine linework, textured paper background, no text, no labels, no watermark, symmetrical calm composition, encyclopedia plate aesthetic, soft diffused lighting, minimal color saturation"* (1024×768, seed 101)
- **Resultado**: composición ovalada tipo herbario con hojas prensadas en disposición simétrica en cuadrantes — no muestra literalmente un "ciclo de vida" pero sí una lámina botánica creíble y editorial.
- **Puntuación**: Calidad 4 / Coherencia RELIEVE 4 / Credibilidad 3 / Utilidad 4 → **15/20 ACEPTABLE**.
- **Decisión**: ACEPTADO e **integrado**.

### 3.2 Suelo y agua
- **Intento 1** (único, aceptado): *"Editorial atlas illustration of a soil cross section with root system and a water droplet, cartographic engraving style, layered earth strata in warm clay and soil tones, muted natural palette, textured paper background, no text, no watermark, no people, scientific illustration plate, soft diffused lighting"* (1024×768, seed 102)
- **Resultado**: corte transversal de suelo con estratos y raíces emergiendo hacia pequeñas flores — el mejor resultado de todo el experimento.
- **Puntuación**: Calidad 5 / Coherencia RELIEVE 5 / Credibilidad 4 / Utilidad 5 → **19/20 EXCELENTE**.
- **Decisión**: ACEPTADO e **integrado**.

### 3.3 Luz y clima
- **Intento 1** (descartado): prompt inicial produjo una fotografía dramática de atardecer sobre montañas con destello de lente — registro fotográfico hiperrealista, incoherente con el resto de la serie. Calidad 4 / Coherencia 2 / Credibilidad 3 / Utilidad 2 → **11/20 DUDOSA**.
- **Intento 2** (aceptado): *"Editorial atlas engraving illustration of the sun as a simple radiating geometric symbol above a flat horizon line, hand-drawn crosshatch linework, muted sage and cream flat color fields, absolutely no photographic lens flare, no realistic sky photography, flat 2D illustration like a vintage encyclopedia diagram, no text, textured paper background"* (1024×768, seed 203)
- **Resultado**: disco solar radiante estilo grabado, simétrico, tonos sepia — encaja mucho mejor con el registro "lámina de atlas". Tiene marcas diminutas semi-ilegibles en el anillo exterior (textura, no texto real legible — menor, no descalifica).
- **Puntuación**: Calidad 4 / Coherencia RELIEVE 5 / Credibilidad 4 / Utilidad 4 → **17/20 EXCELENTE**.
- **Decisión**: ACEPTADO e **integrado** (versión del intento 2).

### 3.4 Sanidad — **PENDIENTE, sin asset aceptado**
- **Intento 1**: *"...a magnifying glass over a stylized single leaf silhouette..."* → generó un objeto ambiguo tipo "ojo" en vez de una lupa reconocible, dentro de una bandeja ovalada. Calidad 3 / Coherencia 3 / Credibilidad 2 / Utilidad 2 → **10/20 DUDOSA**.
- **Intento 2**: *"...vintage botanical diagnostic chart, a single stylized leaf outline divided into quadrants showing subtle texture variations..."* → el modelo ignoró la instrucción de diagrama y devolvió un patrón de hoja espejado en mandala (decorativo, sin concepto de diagnóstico). Calidad 4 / Coherencia 3 / Credibilidad 2 / Utilidad 2 → **11/20 DUDOSA**.
- **Intento 3 (último permitido)**: *"...two simple leaf silhouettes side by side... left leaf smooth and even, right leaf with subtle edge curling and small spots... no symmetry, no mirrored pattern..."* → el modelo volvió a producir un patrón simétrico de hoja en espejo, ignorando otra vez la instrucción explícita de asimetría/comparación.
- **Puntuación final**: ninguno de los 3 intentos superó el umbral aceptable para el propósito de "observación de sanidad/diagnóstico".
- **Decisión**: **PENDIENTE**. No se fabricó una imagen mala para completar la colección. Se mantiene el SVG abstracto ya existente de la Fase 4 (`category-sanidad.svg`) sin cambios. Esto es el límite más claro y reproducible encontrado en todo el experimento: **Pollinations no logra representar un concepto de comparación/diagnóstico sin caer en simetría decorativa o en artefactos ambiguos**, al menos con el modelo por defecto y sin control fino de composición.

### 3.5 Cultivo
- **Intento 1** (descartado): *"...outdoor terraced cultivation rows following hillside contour lines..."* → paisaje fotorrealista de laderas verdes tipo Europa/Mediterráneo, coherente en calidad pero geográficamente poco plausible como Argentina y demasiado fotográfico frente al resto de la serie ilustrada. Calidad 5 / Coherencia 2 / Credibilidad 3 / Utilidad 3 → **13/20 DUDOSA**.
- **Intento 2** (aceptado): *"Flat 2D editorial atlas engraving illustration of terraced cultivation plots along a dry valley with distant arid mountains..."* (1024×768, seed 205) → el modelo devolvió una fotografía monocroma de terrazas de cultivo en un valle árido de montaña, de registro documental (no plano/grabado como se pidió, pero sí un registro "documental" que la propia identidad RELIEVE contempla como válido). Muy plausible como paisaje de valles áridos del NOA/Cuyo.
- **Puntuación**: Calidad 5 / Coherencia RELIEVE 4 / Credibilidad 4 / Utilidad 4 → **17/20 EXCELENTE**.
- **Decisión**: ACEPTADO e **integrado** (versión del intento 2). Nota: el modelo no obedeció la instrucción de estilo "grabado plano" y entregó fotografía documental en su lugar — se aceptó igual porque el resultado es fuerte y el registro documental es parte explícita de la identidad RELIEVE, pero queda registrado como comportamiento real del modelo (tiende a lo fotográfico incluso cuando se le pide lo contrario).

### 3.6 Cosecha
- **Intento 1** (descartado): *"...a harvest basket with plant cuttings drying..."* → arreglo floral fotorrealista tipo centro de mesa de floristería, sin relación con cosecha/cultivo. Calidad 4 / Coherencia 1 / Credibilidad 1 / Utilidad 1 → **7/20 DESCARTAR**.
- **Intento 2** (aceptado con reserva): *"Flat 2D editorial atlas engraving illustration of a simple woven harvest basket holding cut plant stems and drying leaves... not a flower bouquet..."* (1024×768, seed 206) → lámina botánica de canasto con tallos y dos frutos redondos ambarinos, registro pictórico coherente con la serie. Tiene una firma/garabato ilegible en la parte inferior (texto falso, artefacto típico del modelo).
- **Puntuación**: Calidad 4 / Coherencia RELIEVE 4 / Credibilidad 3 / Utilidad 3 → **14/20 ACEPTABLE**.
- **Decisión**: ACEPTADO en la colección (`category-cosecha-pollinations-candidate.jpg`, guardado en `public/`) pero **no integrado** en `atlasData.js` en esta ronda — el garabato ilegible en la esquina es un defecto real que requiere un recorte o una regeneración antes de publicarse; se prefiere no shippear un artefacto de texto falso sin limpiar.

### 3.7 Marco legal
- **Intento 1** (descartado): *"...a balanced scale motif combined with a simple folded document silhouette..."* → generó un plato/emblema abstracto con un símbolo geométrico central que no comunica "legal" y podría leerse como un logo. Calidad 3 / Coherencia 2 / Credibilidad 2 / Utilidad 1 → **8/20 DESCARTAR**.
- **Intento 2** (descartado): mismo concepto con más énfasis en "engraving atlas style" → generó un objeto escultórico ambiguo (parece un pez o tela drapeada sobre un pedestal), sigue sin comunicar el concepto. No se asignó puntuación completa por ser un fallo conceptual claro (estimado **8/20**, mismo rango que intento 1).
- **Intento 3 (último permitido, aceptado)**: *"Minimalist flat vector-style icon illustration of a simple balance scale, two pans hanging from a horizontal beam on a central post... no 3D rendering, no photorealism..."* (1024×768, seed 307) → balanza reconocible con dos platillos colgantes, estilo ícono plano.
- **Puntuación**: Calidad 4 / Coherencia RELIEVE 3 (registro de "ícono plano" distinto del grabado/fotográfico del resto de la serie) / Credibilidad 4 / Utilidad 4 → **15/20 ACEPTABLE**.
- **Decisión**: ACEPTADO en la colección (`category-marco-legal-pollinations-candidate.jpg`, guardado en `public/`) pero **no integrado** en esta ronda — mezclar un ícono vectorial plano con las láminas grabadas/fotográficas del resto de la grilla generaría inconsistencia visual dentro del mismo `CategoryShowcase`; se deja pendiente de una segunda pasada de restilización antes de integrar.

### 3.8 Prueba de mapa (experimental — nunca para navegación real)
- **Intento 1**: *"...elongated south american country silhouette map..."* → forma incorrecta (no es reconocible como Argentina ni como Sudamérica), con un bloque de texto/sello ilegible inventado en la esquina superior derecha.
- **Intento 2**: *"...blank vintage paper map style, absolutely no text..."* → el modelo ignoró la instrucción y devolvió un patrón radial tipo corte de tronco/diana, sin ninguna masa continental reconocible.
- **Resultado**: **`FAILED_GENERATIVE_MAP_TEST`** en ambos intentos. No se hizo un tercer intento porque dos fallos con estrategias de prompt distintas ya son evidencia suficiente del límite (el objetivo era medir el límite, no perfeccionarlo).
- **Decisión**: descartado como cartografía. **No se usa para navegación, no reemplaza el mapa funcional existente, no se integra en ningún componente.**

### 3.9 Prueba de vista aérea/satelital (experimental)
- **Intento 1** (único): *"Abstract aerial view editorial illustration of agricultural terrain with fields and a winding river..."* → imagen muy lograda de campos agrícolas vistos desde arriba con un río sinuoso, registro fotográfico creíble tipo llanura pampeana.
- **Puntuación** (para su propósito experimental, no como asset de categoría): Calidad 5 / Coherencia 3 (fotográfico, no grabado) / Credibilidad 4 / Utilidad 3 → **15/20 ACEPTABLE** como experimento.
- **Decisión**: clasificado como **`GENERATED_EDITORIAL_IMAGE`**. No se presenta como fotografía satelital real, no se usa para datos geográficos ni climáticos, no se integra en ningún componente de producción — queda solo documentado como evidencia de capacidad.

## 4. Tabla resumen de resultados

| Asset | Mejor puntuación | Intentos | Estado | Integrado |
|---|---|---|---|---|
| Fundamentos | 15/20 ACEPTABLE | 1 | Aceptado | Sí |
| Suelo y agua | 19/20 EXCELENTE | 1 | Aceptado | Sí |
| Luz y clima | 17/20 EXCELENTE | 2 | Aceptado | Sí |
| Sanidad | 11/20 DUDOSA (máximo alcanzado) | 3 | **Pendiente** | No (sigue SVG) |
| Cultivo | 17/20 EXCELENTE | 2 | Aceptado | Sí |
| Cosecha | 14/20 ACEPTABLE | 2 | Aceptado con reserva | No (artefacto de texto sin limpiar) |
| Marco legal | 15/20 ACEPTABLE | 3 | Aceptado con reserva | No (registro visual inconsistente con la serie) |
| Mapa (experimental) | — | 2 | `FAILED_GENERATIVE_MAP_TEST` | No, nunca |
| Vista aérea (experimental) | 15/20 | 1 | `GENERATED_EDITORIAL_IMAGE` | No (solo documental) |

Total: **4 de 7** categorías integradas en producción, **2 de 7** aceptadas pero retenidas por defectos puntuales, **1 de 7** sin resolver (pendiente), **2 pruebas experimentales** correctamente aisladas de cualquier uso funcional.

## 5. Metadatos de los assets integrados

| Filename | Categoría | Prompt (resumen) | Seed | Fecha | Dimensiones | Formato | Origen | Estado | Puntuación |
|---|---|---|---|---|---|---|---|---|---|
| `category-fundamentos-pollinations.jpg` | Fundamentos | Herbario/ciclo de vida, grabado botánico | 101 | 2026-09-09 | 1024×768 | JPEG | Pollinations (`image.pollinations.ai`, modelo por defecto) | Integrado | 15/20 |
| `category-suelo-y-agua-pollinations.jpg` | Suelo y agua | Corte de suelo con raíces y agua | 102 | 2026-09-09 | 1024×768 | JPEG | Pollinations | Integrado | 19/20 |
| `category-luz-y-clima-pollinations.jpg` | Luz y clima | Disco solar radiante, grabado plano | 203 | 2026-09-09 | 1024×768 | JPEG | Pollinations | Integrado | 17/20 |
| `category-cultivo-pollinations.jpg` | Cultivo | Terrazas de cultivo en valle árido | 205 | 2026-09-09 | 1024×768 | JPEG | Pollinations | Integrado | 17/20 |
| `category-cosecha-pollinations-candidate.jpg` | Cosecha | Canasto de cosecha con tallos | 206 | 2026-09-09 | 1024×768 | JPEG | Pollinations | Guardado, no integrado | 14/20 |
| `category-marco-legal-pollinations-candidate.jpg` | Marco legal | Balanza, ícono plano | 307 | 2026-09-09 | 1024×768 | JPEG | Pollinations | Guardado, no integrado | 15/20 |

Licencia/términos de uso de las imágenes generadas por Pollinations: **no investigados en esta ronda** (el experimento prohibía explícitamente hacer research web). Marcar `TODO RESEARCH` antes de cualquier uso en un lanzamiento real: confirmar los términos de servicio de Pollinations respecto a uso comercial/editorial de las imágenes generadas.

## 6. Comparación Fase 4 (SVG) vs. Pollinations

| Categoría | Fase 4 (SVG abstracto) | Pollinations | Veredicto |
|---|---|---|---|
| Fundamentos | Líneas topográficas onduladas genéricas, ~1KB | Lámina de herbario reconocible, evocadora | **POLLINATIONS MEJOR** |
| Suelo y agua | Líneas abstractas genéricas | Corte de suelo con raíces, preciso y evocador | **POLLINATIONS MEJOR** |
| Luz y clima | Líneas abstractas genéricas | Disco solar grabado, específico al concepto | **POLLINATIONS MEJOR** |
| Sanidad | Línea abstracta simple, segura pero vacía de contenido | Ningún intento logró el concepto de diagnóstico | **POLLINATIONS PEOR** (se mantiene el SVG) |
| Cultivo | Líneas abstractas genéricas | Paisaje de terrazas áridas, muy evocador | **POLLINATIONS MEJOR** |
| Cosecha | Línea abstracta simple | Lámina de canasto con artefacto de texto sin limpiar | **NO CONCLUYENTE** (mejor concepto, defecto técnico pendiente) |
| Marco legal | Línea abstracta simple | Ícono de balanza reconocible pero de registro visual distinto al resto de la serie | **NO CONCLUYENTE** (mejor concepto, inconsistencia de estilo pendiente) |

Los SVG originales de Fase 4 **no se eliminaron** — siguen en `public/atlas/categories/*.svg` y siguen siendo la fuente activa para Sanidad, Cosecha y Marco legal.

## 7. Problemas detectados (patrones recurrentes, no anecdóticos)

1. **Texto falso/ilegible**: en al menos 3 de las 17 generaciones (mapa intento 1, luz-y-clima intento 2 en menor medida, cosecha intento 2) el modelo insertó marcas que imitan texto o firmas, siempre ilegibles e inventadas. Es un patrón sistemático, no un accidente aislado — cualquier imagen de Pollinations debe revisarse específicamente por esto antes de publicarse.
2. **Sesgo hacia la simetría/espejado en motivos de hoja**: los 3 intentos de "sanidad" derivaron en patrones simétricos/mandala incluso cuando el prompt pedía explícitamente asimetría o comparación lado a lado. Límite reproducible del modelo, no un error de prompt.
3. **Deriva hacia el registro fotográfico**: varios prompts que pedían explícitamente "flat 2D engraving illustration, not a photograph" devolvieron igualmente fotografías o cuasi-fotografías (luz-y-clima intento 1, cultivo intento 1 y 2, cosecha intento 1). El modelo prioriza su propio estilo por defecto sobre instrucciones de estilo específicas en varios casos.
4. **Objetos ambiguos/incómodos**: el intento 1 de "sanidad" produjo un objeto que se lee como un ojo; el intento 1 de "marco legal" produjo un emblema que podría confundirse con un logotipo. Ninguno de los dos se integró, precisamente por este riesgo.
5. **Geografía no verificable**: ninguna imagen aceptada de "cultivo" puede afirmarse como representación real de un lugar de Argentina — se aceptaron por plausibilidad y calidad editorial, nunca como documentación geográfica.

## 8. Límites de Pollinations (para este caso de uso específico)

- No resuelve conceptos de **comparación/diagnóstico** (sanidad) sin derivar en decoración simétrica.
- No resuelve **cartografía funcional** en absoluto — confirmado con dos estrategias de prompt distintas.
- No obedece de forma confiable instrucciones de **registro/estilo** (pedir "ilustración plana" no impide que devuelva fotografía).
- Tiende a insertar **texto falso ilegible** con cierta frecuencia — requiere revisión manual sistemática, no automatizable sin un segundo modelo de verificación.
- **Sí resuelve bien** composiciones botánicas/de suelo de tipo "lámina de atlas", motivos solares/geométricos simples, y paisajes documentales de terreno — estos fueron los mejores resultados del experimento.

## 9. ¿Pollinations sirve para este Atlas?

**PARCIALMENTE.**

Sirve, con curaduría humana obligatoria en cada imagen, para: composiciones botánicas de tipo lámina/herbario, cortes de suelo/agua, motivos solares/geométricos abstractos, y paisajes documentales de terreno. No sirve, ni con reintentos, para: cartografía funcional, iconografía legal/institucional consistente con un registro editorial único, ni conceptos de diagnóstico/comparación botánica sin caer en patrones decorativos simétricos que vacían el concepto de contenido. Ninguna imagen aceptada debe presentarse como documentación científica o geográfica real — todas son ilustración editorial generada, y así quedan etiquetadas.

## 10. Conclusiones

- El experimento fue exitoso como *medición*, independientemente del resultado por asset: permitió aceptar 4 assets claramente superiores a la Fase 4, identificar 2 aceptables con defectos puntuales pendientes de limpieza/restilización antes de integrar, dejar 1 concepto honestamente sin resolver, y confirmar (dos veces, con enfoques distintos) que la cartografía generativa no es viable para este proyecto.
- El mapa funcional de Argentina (`GeoSelector`, SVG interactivo existente) **no fue tocado** en ningún momento y sigue siendo la única fuente de navegación geográfica.
- El Panel Ambiental, `/api/geo`, `/api/climate`, la navegación de `/atlas`, y el resto de la arquitectura permanecen intactos — se verificó con build (`next build` exit 0) y con inspección de navegador real (Playwright, headless Chromium) en 1440×900, 1280×800 y 390×844, en Home, `/atlas`, `/atlas/fundamentos` y `/atlas/fundamentos/germinacion`, sin texto técnico (`NO_IMPLEMENTADO`, "contrato geográfico") visible y sin imágenes rotas en ninguna combinación.
- Consecuencia visual honesta y visible del alcance parcial de esta integración: la grilla de 7 categorías en Home hoy mezcla 4 tarjetas con ilustración rica (Fundamentos, Suelo y agua, Luz y clima, Cultivo) y 3 tarjetas que siguen con el SVG abstracto casi vacío de la Fase 4 (Sanidad, Cosecha, Marco legal) — esto es correcto según la evidencia de este experimento, pero deja una asimetría visual notoria que una futura ronda debería resolver (terminando de limpiar/restilizar Cosecha y Marco legal, y decidiendo qué hacer con Sanidad).

## 11. Conclusión obligatoria

**POLLINATIONS PARA EL ATLAS: [x] APTO CON LIMITACIONES**

- **Dónde funciona**: ilustración botánica tipo lámina/herbario, cortes de suelo/raíces, motivos solares/geométricos abstractos, paisajes documentales de terreno árido/montañoso.
- **Dónde falla**: cartografía funcional (falla total, confirmada dos veces), iconografía institucional/legal en un registro visual consistente con el resto de la serie (logra el concepto pero no el registro), conceptos de comparación/diagnóstico botánico (falla en los 3 intentos permitidos).
- **Qué tipo de imágenes produce mejor**: composiciones botánicas/de suelo de tipo lámina de atlas, con paleta muted y textura de papel — coincide bien con RELIEVE cuando el prompt es muy específico.
- **Qué tipo de imágenes produce peor**: cualquier composición que dependa de asimetría intencional, iconografía institucional reconocible, o precisión geográfica/cartográfica.
- **¿Se sienten RELIEVE?**: los 4 assets integrados sí — grabado/documental, sobrio, sin estética cyberpunk/neón/publicitaria. Los 2 candidatos no integrados se sienten RELIEVE en concepto pero no en registro (ícono plano vs. lámina grabada) o tienen un defecto técnico visible (texto falso).
- **¿Son suficientemente creíbles?**: sí para uso editorial ilustrativo, nunca como documentación científica, geográfica o meteorológica real — y así se etiquetan explícitamente en el código (`alt` text) y en este documento.
- **¿Vale la pena usarlo en producción?**: sí, como una herramienta más dentro de un flujo con curaduría humana obligatoria por imagen (nunca automatizado sin revisión), y nunca como sustituto de fuentes reales para contenido que el proyecto presente como fáctico (clima, geografía, ciencia). No reemplaza la Fase 6 de curaduría de fuentes reales — la complementa para conceptos genuinamente editoriales/abstractos.

## 12. Qué queda para la próxima fase

- Limpiar el artefacto de texto falso en el candidato de Cosecha (recorte o regeneración) antes de integrarlo.
- Restilizar el candidato de Marco legal (o regenerar en el mismo registro "grabado/lámina" que el resto de la serie) antes de integrarlo, para no mezclar dos lenguajes visuales en la misma grilla.
- Resolver la asimetría visual actual de la grilla de categorías (4 ricas + 3 vacías) — decidir si se completa con más intentos de Pollinations, con ilustración real, o con una redistribución del layout mientras tanto.
- Investigar (fuera de esta sesión, ya que este experimento prohibía research web) los términos de uso/licencia de las imágenes generadas por Pollinations antes de cualquier lanzamiento real.
- "Sanidad" sigue abierta como problema de contenido visual — evaluar en la Fase 6 real (curaduría de fuentes) en vez de seguir insistiendo con generación pura.
