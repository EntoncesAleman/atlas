# Asset Registry — Biblioteca visual del Atlas

Registro específico de cada archivo de imagen usado en producción, con procedencia completa. Complementa (no duplica) `19_SOURCE_REGISTRY.md`. Toda fila con licencia distinta de "Interno" requiere atribución visible en una página de créditos — implementada en `/creditos` (`src/app/creditos/page.js`, vía `attributableAssets()`).

## Ronda 2026-09-16 — mejora del sistema visual (13 categorías + entradas)

Consigna: incorporar imágenes reales verificadas para las 13 categorías y sus entradas, priorizando Wikimedia Commons/dominio público/CC0/CC BY/CC BY-SA, cero IA generativa, cero stock genérico. Investigación de partida provista por el usuario (candidatas por categoría); cada una se verificó de forma directa (fetch a la página real del archivo en Commons, nunca solo el resultado de una búsqueda) antes de integrarla. Fuente de verdad estructurada: `src/app/lib/editorial/assets.js` + `src/app/lib/editorial/sources.js` (13 fuentes visuales nuevas, prefijo `visual-`). Este documento resume esa misma información en formato de lectura rápida.

### Reemplazos aplicados (portada de categoría)

| Categoría | Antes | Después | Motivo |
|---|---|---|---|
| Germinación | (sin portada propia — compartía el diagrama de la entrada) | `Keimender_Hanfsamen...01.jpg` (Vschlothauer, **CC0**) | Ahora tiene portada propia, distinta de la imagen de la entrada |
| Suelo y agua | `Soil_profile_0-125cm.jpg` (Mclund, CC BY 4.0) | `Stem_root_and_clay.jpg` (Beeblebrox, **CC BY-SA 4.0**) | La anterior era un perfil de suelo real pero sin ninguna planta; la nueva muestra Cannabis sativa específicamente |
| Luz y clima | `Plant_under_a_phytolamp.jpg` (Alla Varta, CC BY 4.0) | `Close-Up_of_Cannabis_Plant_in_Sunlight.jpg` (Soyamol17, **CC0**) | La anterior era un ciclamen (especie distinta), aceptado en su momento por falta de alternativa; ahora existe una foto real de Cannabis igual de legible |
| Crecimiento (Fundamentos) | Ilustración generada con IA (Gemini) | `Cannabis-vegetative-growth-00003.jpg` (J. Patrick Bedell, **dominio público**) | Regla nueva de esta ronda: cero IA generativa activa en producción |
| Fertilización | Ilustración generada con IA (Gemini) | `Cannabis_Nutrient_Deficiency.JPG` (Cannabis Training University, **CC BY-SA 3.0**) | Ídem — además resuelve la falta de imagen de la única entrada de esta categoría (carencia/toxicidad) |
| Poda | `Industrialhemp.jpg` reutilizado de Cultivo (placeholder documentado) | `BBMamaTopped.jpg` (Big.thompson, **dominio público**) | Único candidato real encontrado que documenta el resultado visual del topping; reserva de calidad ver nota abajo |
| Manejo y poscosecha | `Cannabis_Drying_out_the_crop...jpg` duplicado exacto de Cosecha | `Cannabis_drying_room.jpg` (Beeblebrox, **CC BY-SA 4.0**) | Resuelve una duplicación exacta de imagen entre dos categorías distintas |
| Genética y tipos | Diagrama de fotoperiodismo (mismo archivo que la entrada "luz-y-fotoperiodo") | Lámina de Köhler, 1887 (reutilización — ya en uso en Historia/Fundamentos) | El diagrama de fotoperiodo describe floración/luz, no taxonomía — desajuste temático, no de licencia |
| Cultivo | `Industrialhemp.jpg` (Aleks) | **Sin cambios** | Evaluado explícitamente: ya muestra un sistema de cultivo real (campo), no una macro de flor — no había motivo para reemplazar |
| Cosecha | `Cannabis_Drying_out_the_crop...jpg` ("Cannabis Pictures", CC BY 2.0) | **Sin cambios** | Se evaluaron 2 candidatos nuevos y se rechazaron ambos, ver nota abajo |
| Sanidad | `Red_spider_mite...jpg` (Aleksey Gnilenkov, CC BY 2.0) | **Sin cambios** | Ya era la mejor opción real disponible; no se encontró nada que la superara |
| Historia | Lámina de Köhler, 1887 | **Sin cambios** | Sigue siendo la elección correcta para la portada de esta categoría |
| Marco legal | SVG interno del proyecto | **Sin cambios** | Ver investigación específica abajo — no se encontró alternativa real adecuada |

### Imágenes nuevas agregadas a entradas (antes sin imagen propia, o compartían la de su categoría)

| Entrada | Categoría | Archivo | Autor | Licencia |
|---|---|---|---|---|
| Formas de germinar | Germinación | `C_sativa_seedling.jpg` | Avriette | CC BY-SA 3.0 / GFDL 1.2+ |
| Cuidado de la plántula (P2-5) | Crecimiento | `Cannabis_seedling_-_seven_days.jpg` | Trav1085 | CC BY-SA 3.0 / GFDL 1.2+ |
| Ciclo de vida y condiciones de referencia | Crecimiento | `Untrained_cannabis_plant_in_the_vegetative_stage.jpg` | Plantlady223 | CC BY-SA 4.0 |
| Sustrato, agua y drenaje | Suelo y agua | `Cannabis_sativa_radix_profile.png` | Prof. Dr. Lore Kutschera | CC BY-SA 2.5 |
| Cultivo en secuencia | Cultivo | `Cannabis_plants_in_hoop_house.jpg` | Brian Shamblen | CC BY 2.0 |
| Historia de la planta | Historia | `Cannabis_sativa_1542.jpg` (Füllmaurer/Fuchs) | — | Dominio público |

**Química de la maduración: tricomas y cannabinoides** (entrada nueva de P2-5, categoría Cosecha) queda **sin imagen** a propósito — no se investigó ni se encontró un candidato real específico de morfología de tricomas en esta ronda. No forzada, documentada como gap abierto.

### Candidatos investigados y rechazados (con motivo)

| Candidato | Por qué se rechazó |
|---|---|
| `Cannabis_plant_with_grow_lights.jpg` / `Cannabis_plant_below_a_grow_light.jpg` (autor: "Cannabis Tours", CC BY-SA 4.0) | Fotos de un tour comercial pago en un grow facility de Denver ("My 420 Tours") — se priorizó `Close-Up_of_Cannabis_Plant_in_Sunlight.jpg` (CC0, sin contexto comercial) para la portada de Luz y clima |
| `Cannabis_harvest.jpg` y `Commercial_cannabis,_harvested_and_trimmed.jpg` (mismo autor "Cannabis Tours") | Evaluados para reemplazar la portada de Cosecha — descartados: sus propias descripciones en Commons dicen "listo para empaquetar y vender"/"comercial distribution", en tensión directa con la regla dura del proyecto de cero venta/cero estética de dispensario (`16_DECISIONS.md`, D5) |
| `Drying_Cannabis.jpg` / `Marijuana_Drying.jpg` (Cannabis Training University) | Alternativas válidas para Manejo y poscosecha, pero `Cannabis_drying_room.jpg` se consideró más sobria (sala/proceso, sin producto en primer plano) |
| INASE (isotipo/logo) | Existe en Commons pero es un logo, no una fotografía/ilustración apta como imagen principal de portada — no se usa |
| Boletín Oficial / edificios institucionales argentinos | No se encontró ninguna fotografía de archivo real vinculada específicamente a estos organismos |

### Reserva de calidad documentada: Poda

`BBMamaTopped.jpg` (dominio público, Big.thompson) es el único candidato real encontrado tras una búsqueda específica de imágenes de topping/poda en Cannabis con licencia clara. Muestra correctamente el patrón botánico del topping (varios brotes apicales co-dominantes), pero es de baja resolución (640×512 original) y tiene un fondo doméstico con objetos sueltos (un vaso de plástico, productos de fertilizante) — no es una fotografía "editorialmente prolija". Se aceptó porque el criterio de esta ronda es representar el concepto correctamente, no maximizar estética, y porque la alternativa (mantener el campo de cáñamo genérico de Cultivo como placeholder de Poda) no tenía ninguna relación temática real con la poda. Revisar si aparece una alternativa más prolija en el futuro.

### Nota editorial: Cosecha (sin cambios en esta ronda, reafirmada)

Sigue vigente la nota de la ronda anterior: la fotografía elegida (`category-cosecha-real.jpg`) tiene un tono más cálido/atractivo que el resto de la serie. Se reevaluó explícitamente en esta ronda contra 2 candidatos nuevos (ver tabla de rechazados arriba) y ninguno resultó mejor — ambos tenían una tensión más fuerte con la regla anti-dispensario que la imagen actual. Se mantiene sin cambios.

### Marco legal (sin cambios, investigación documentada)

Se buscó específicamente material institucional argentino reutilizable (Boletín Oficial, INASE) como pidió la consigna. Resultado: solo existe el isotipo de INASE en Commons (no apto como imagen de portada), y ninguna fotografía de archivo de un edificio institucional vinculada a estos organismos. Se mantiene el gráfico SVG interno del proyecto sin cambios, coherente con la política de no forzar una imagen genérica (martillo, balanza, tribunales) para este concepto — la misma decisión que ya se había tomado en la ronda de Fase 6.

### Assets archivados en esta ronda (no borrados — registro conservado en `assets.js` con `status: 'ARCHIVED'`)

Reemplazados por las imágenes de la tabla de arriba: `asset-fundamentos-ciclo-ia`, `asset-fertilizacion-ia` (ambas ilustraciones de IA — ninguna imagen generada con IA queda activa tras esta ronda), `asset-sustrato-raices-ia` (IA, nunca llegó a renderizarse en producción), `asset-suelo-agua-profile` (perfil de suelo sin planta), `asset-luz-clima-cover` (ciclamen), `asset-historia-de-la-planta-koehler` y `asset-genetica-y-tipos-photoperiodism` (reutilizaciones/desajustes temáticos resueltos), `asset-poda-hemp-field` y `asset-manejo-poscosecha-drying` (placeholders/duplicados resueltos).

---

## Historial (rondas anteriores a 2026-09-16)

### Assets descartados de rondas anteriores, conservados en disco (no referenciados)

| filename | category | type | source | license | status | motivo |
|---|---|---|---|---|---|---|
| `categories/category-fundamentos.svg` | Fundamentos | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Sustituido por lámina real de mayor credibilidad editorial |
| `categories/category-suelo-y-agua.svg` | Suelo y agua | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Ídem |
| `categories/category-luz-y-clima.svg` | Luz y clima | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Ídem |
| `categories/category-sanidad.svg` | Sanidad | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Ídem — además resuelve el `PENDIENTE` dejado por la Fase 6B |
| `categories/category-cultivo.svg` | Cultivo | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Ídem |
| `categories/category-cosecha.svg` | Cosecha | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Ídem |
| `categories/pollinations/category-*-pollinations*.jpg` (6 archivos) | Varias | Imagen generada por IA | Pollinations (experimento Fase 6B) | N/A (generado) | EXPERIMENTO CERRADO | Ver `27B_POLLINATIONS_VISUAL_EXPERIMENT.md`. No usar en producción. Se conservan como registro histórico del experimento, no borrar sin motivo. |

### Nota de composición: Luz y clima (Fase 8C.1, contexto histórico)

El diagrama de fitocromo (`category-luz-y-clima-real.jpg`) es una imagen apaisada con texto explicativo distribuido en los cuatro costados — en el grid cuadrado de categorías (Fase 8B), el recorte a 1:1 cortaba buena parte de ese texto. Se resolvió en su momento reemplazando la imagen de portada de categoría por una fotografía documental distinta — el diagrama original no se eliminó: sigue activo como asset de la entrada "luz-y-fotoperiodo" (`asset-luz-clima-photoperiodism`), sin cambios en la ronda 2026-09-16. La misma lección de composición (evitar diagramas con contenido pegado a los bordes como portada de categoría, reservarlos para la entrada) se aplicó de nuevo en esta ronda con `Cannabis_sativa_radix_profile.png` (Suelo y agua).
