# 27 — Política de Fuentes Visuales y Curaduría (Fase 6, dirección RELIEVE)

## 1. Conclusión del experimento Pollinations (contexto obligatorio)

`27B_POLLINATIONS_VISUAL_EXPERIMENT.md` queda como **experimento cerrado**, sin borrar. Su conclusión (`APTO CON LIMITACIONES`, con fallos reproducibles en cartografía, iconografía institucional y conceptos de diagnóstico/comparación, y un patrón sistemático de texto falso ilegible) es la que justifica esta fase: el Atlas necesita material visual real y verificable, no generado, para sostener credibilidad editorial. Esta fase no repite ni cuestiona esa conclusión — construye sobre ella.

## 2. Política visual definitiva

1. **Fuente real primero.** Toda imagen de categoría/entrada del Atlas debe provenir de una fuente real y verificable (fotografía documental, ilustración científica/histórica, o diagrama) antes de considerar cualquier alternativa.
2. **Sin IA generativa en producción.** Pollinations y cualquier otro generador quedan fuera de esta fase y de cualquier fase futura hasta que se decida explícitamente lo contrario con una nueva instrucción — no por omisión.
3. **Licencia verificada, no asumida.** Ninguna imagen se integra sin haber leído directamente su página de origen (autor, licencia, fecha) — "está en internet" nunca es motivo suficiente.
4. **Precisión sobre "argentinidad".** Se prefiere material argentino de calidad cuando existe, pero una fuente internacional precisa es preferible a una fuente argentina irrelevante o de baja credibilidad (aplicado en esta ronda: se prefirió un campo de cáñamo francés, on-topic, sobre un viñedo de Cafayate, argentino pero de otra especie).
5. **PENDIENTE es una respuesta válida.** Si no existe material real adecuado para una categoría, esa categoría queda `PENDIENTE` — no se rellena con una imagen irrelevante, de licencia dudosa, o generada.

## 3. Política de mapas

El mapa interactivo de la Home (`GeoSelector`, SVG funcional de Argentina) es la única superficie cartográfica del producto y **no se tocó en esta fase**. Ninguno de los 7 assets de categoría es un mapa — por lo tanto esta fase no buscó ni integró cartografía nueva. Regla permanente: cualquier cartografía futura debe ser real (datos geográficos oficiales, ver `03_GEO.md`), nunca ilustrada/generada, y nunca debe reemplazar al mapa funcional existente por motivos estéticos.

## 4. Política satelital/territorial

No se usó ninguna imagen satelital en esta ronda (ninguna de las 7 categorías lo requería estrictamente). Regla para el futuro: si se necesita una imagen aérea/satelital real, debe verificarse su fuente y condiciones de uso igual que cualquier fotografía — nunca una captura de Google Maps/Earth sin licencia clara, y nunca presentada como dato geográfico o climático real si es solo ilustrativa.

## 5. Política documental

Para plagas, enfermedades, estructuras y procesos observables (ej. Sanidad, Cosecha), se prioriza fotografía real con procedencia verificada por sobre cualquier ilustración o generación — así se resolvió en esta ronda para "Sanidad" (fotografía macro real de *Tetranychus urticae*), que en la Fase 6B había quedado `PENDIENTE` sin resolver con IA.

## 6. Política de ilustraciones

Una ilustración es válida cuando proviene de una fuente con licencia verificable y se identifica como tal (nunca presentada como fotografía). Se usaron dos en esta ronda: la lámina botánica histórica de Köhler (1887, dominio público) para Fundamentos, y el diagrama de germinación (CC BY-SA 3.0) para la entrada específica de Germinación. Ambas quedan etiquetadas en su `alt` text y en `ASSET_REGISTRY.md` con su naturaleza y procedencia exactas.

## 7. Política de licencias

- Toda imagen no interna del proyecto debe tener: autor identificado (o indicación explícita de que es anónimo/institucional), licencia con nombre y versión exactos, URL de la fuente, y fecha de verificación.
- Las licencias CC BY / CC BY-SA / GFDL exigen atribución visible antes de un lanzamiento real (pendiente: página de créditos, ver §9).
- Un asset con licencia no verificable se marca `LICENSE_UNVERIFIED` y no se usa como definitivo — en esta ronda no se integró ningún asset en ese estado (todos los 7 activos tienen licencia leída directamente de la fuente).
- Licencia dudosa descarta un asset **aunque su calidad visual sea excelente** — no ocurrió esta vez, pero es la regla permanente.

## 8. Cuándo NO usar una imagen

- Cuando la licencia no se puede verificar en la fuente original.
- Cuando la imagen es irrelevante para el concepto aunque sea visualmente atractiva (ej.: se descartó `Harvest.jpg`, una fotografía de cosecha de sorgo, por no tener relación temática).
- Cuando el material es de baja calidad/legibilidad aunque la licencia y la relevancia sean correctas (ej.: se descartó `Soil_horizons.JPG` por mostrar una mancha de tierra poco legible como horizontes de suelo).
- Cuando una imagen argentina es irrelevante en especie/tema solo por ser argentina (ej.: se descartó el viñedo de Cafayate para "Cultivo" — es Argentina real, pero es vid, no cáñamo/cannabis).
- Cuando no existe ninguna opción que cumpla licencia + relevancia + calidad: la respuesta correcta es `PENDIENTE`, nunca rellenar.

## 9. Criterios de curaduría aplicados (resumen operativo de la rúbrica de 25 puntos)

Exactitud, Relevancia, Calidad, Compatibilidad RELIEVE y Licencia, 0-5 cada una. La licencia es la única dimensión que actúa como **bloqueo binario**: si no se puede verificar, el resto de la puntuación no importa. El detalle punto por punto de cada candidato está en la tabla de decisión (§10).

## 10. Auditoría de los 7 assets de Fase 4 y tabla de decisión

| Asset | Actual (antes de esta fase) | Candidato A | Candidato B | Candidato C | Fuente elegida | Licencia | Puntuación | Decisión |
|---|---|---|---|---|---|---|---|---|
| Fundamentos | Pollinations (herbario generado, 15/20 en 6B) | Köhler, *Cannabis sativa* (1887) | Germination-en.svg (diagrama) | — | Köhler (categoría) + Germination-en.svg (entrada Germinación) | Dominio público / CC BY-SA 3.0 | 24/25 (Köhler) | **REEMPLAZAR** |
| Suelo y agua | Pollinations (corte de suelo generado, 19/20 en 6B) | Soil_profile_0-125cm.jpg | Soil_horizons.JPG | — | Soil_profile_0-125cm.jpg | CC BY 4.0 | 20/25 (Exactitud 4, Relevancia 5, Calidad 4, RELIEVE 3, Licencia 5 — foto real pero de tono oscuro/embarrado, correcta pero no elegante) | **REEMPLAZAR** |
| Luz y clima | Pollinations (disco solar generado, 17/20 en 6B) | Photoperiodism_in_plants.jpg | — | — | Photoperiodism_in_plants.jpg | CC BY-SA 4.0 | 19/25 (Exactitud 5, Relevancia 5, Calidad 3 — diagrama simple tipo clip-art, RELIEVE 3, Licencia 5) | **REEMPLAZAR** (con nota de composición, ver `ASSET_REGISTRY.md`) |
| Sanidad | SVG interno (Pollinations no logró resolverlo en 6B, quedó `PENDIENTE`) | Red_spider_mite (Tetranychus urticae) | Powdery_mildew_9.jpg | — | Red_spider_mite | CC BY 2.0 | 23/25 (Exactitud 5, Relevancia 5, Calidad 5, RELIEVE 4, Licencia 5→4 por requerir atribución) | **REEMPLAZAR** — resuelve el pendiente de 6B |
| Cultivo | Pollinations (terrazas generadas, 17/20 en 6B) | Industrialhemp.jpg (Francia) | Hemp_plants-cannabis_sativa-field.JPG (Reino Unido) | Torrontés en Cafayate (Argentina, vid) | Industrialhemp.jpg | GFDL/CC BY-SA (multi) | 21/25 (Exactitud 5, Relevancia 5, Calidad 4, RELIEVE 4, Licencia 3 por requerir atribución con múltiples licencias listadas) | **REEMPLAZAR** — se prioriza precisión de especie sobre "argentinidad" del candidato C, ver §2.4 |
| Cosecha | SVG interno (Pollinations quedó en 14/20, no integrado en 6B) | Cannabis_Drying_out_the_crop | Herbs_Hung_to_Dry.jpg | — | Cannabis_Drying_out_the_crop | CC BY 2.0 | 20/25 (Exactitud 5, Relevancia 5, Calidad 5, RELIEVE 2 por tono más "atractivo"/dorado que el resto de la serie, Licencia 3) | **REEMPLAZAR** — con reserva estética documentada en `ASSET_REGISTRY.md` |
| Marco legal | SVG interno | — (sin candidato relevante encontrado) | — | — | SVG interno sin cambios | Interno | N/A (no aplica rúbrica a un asset ya interno que se conserva) | **CONSERVAR** |

## 11. Qué assets fueron reemplazados y por qué (resumen)

- **Fundamentos, Suelo y agua, Luz y clima, Cultivo**: reemplazan la versión generada con Pollinations de la Fase 6B — el propio experimento concluyó que la generación no alcanza el nivel de credibilidad editorial buscado; ahora tienen fuente real, licencia verificada y procedencia documentada.
- **Sanidad**: reemplaza el SVG interno de Fase 4. Es el caso más importante — Pollinations no logró resolver este concepto en 3 intentos (Fase 6B), y la investigación real sí encontró una fotografía documental precisa y bien licenciada en el primer intento, confirmando la premisa de esta fase ("documentación científica → buscar documentación real").
- **Cosecha**: reemplaza el SVG interno de Fase 4 con una fotografía real, aceptada con una reserva estética documentada (ver §8 de `ASSET_REGISTRY.md`).
- **Marco legal**: se audita y se decide **conservar** el SVG interno — no se encontró ninguna fotografía o ilustración real que fuera simultáneamente relevante, precisa y no arbitraria para un concepto de "contexto legal/institucional". Forzar una imagen (ej. un edificio de tribunales o el Congreso) hubiera sido exactamente el error que la regla de oro de esta fase prohíbe: "una imagen excelente pero irrelevante — descartar."

## 12. Qué queda pendiente (no resuelto en esta fase, con honestidad)

- **Atribución visible en el sitio**: las 6 imágenes con licencia CC BY/CC BY-SA/GFDL requieren una página de créditos/atribución antes de cualquier lanzamiento real — no implementada todavía (fuera del alcance de "reemplazar assets", es una pieza de UI nueva).
- **Composición de "Luz y clima"**: el recorte de la miniatura de categoría corta parte del texto del diagrama — mejora de crop/composición pendiente, no bloqueante.
- **Reserva estética de "Cosecha"**: aceptada pero con la tensión documentada contra la regla anti-dispensario; revisar si aparece una alternativa real más sobria.
- **Ampliar la biblioteca**: esta fase resolvió 7 categorías con 1 imagen principal cada una (más 1 imagen específica de entrada para Fundamentos) — no se agregaron fotografías secundarias, ilustraciones adicionales por artículo, ni cobertura para futuras entradas de contenido más allá de las 7 ya existentes.
- **Material argentino específico**: se evaluó y se descartó conscientemente un candidato argentino (viñedo de Cafayate) por imprecisión temática — sigue pendiente encontrar, a futuro, material fotográfico real de cultivo/territorio específicamente argentino y on-topic (no se encontró en esta ronda dentro del alcance de tiempo disponible).
