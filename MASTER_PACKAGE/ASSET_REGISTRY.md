# Asset Registry — Biblioteca visual del Atlas

Registro específico de cada archivo de imagen usado en producción, con procedencia completa. Complementa (no duplica) `19_SOURCE_REGISTRY.md`. Toda fila con licencia distinta de "Interno" requiere atribución visible en una página de créditos antes de un lanzamiento real (ver pendiente en `27_VISUAL_SOURCE_AND_CURATORIAL_POLICY.md`).

## Assets en uso (integrados en `atlasData.js`)

| filename | category | type | source | author | license | source_url | attribution | date_checked | status |
|---|---|---|---|---|---|---|---|---|---|
| `real/category-fundamentos-real.jpg` | Fundamentos | Ilustración botánica (histórica) | Wikimedia Commons | Walther Otto Müller (Köhler's Medizinal-Pflanzen, 1887) | Dominio público | https://commons.wikimedia.org/wiki/File:Cannabis_sativa_Koehler_drawing.jpg | "W. Müller, Köhler's Medizinal-Pflanzen (1887) — dominio público" | 2026-09-09 | ACTIVO |
| `real/entry-germinacion-real.svg` | Fundamentos (entrada Germinación) | Diagrama científico | Wikimedia Commons | Begoon (derivado de Kat1992) | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:Germination-en.svg | "Begoon, derivado de Kat1992 — CC BY-SA 3.0, vía Wikimedia Commons" | 2026-09-09 | ACTIVO |
| `real/category-suelo-y-agua-real.jpg` | Suelo y agua | Fotografía documental | Wikimedia Commons | Mclund | CC BY 4.0 | https://commons.wikimedia.org/wiki/File:Soil_profile_0-125cm.jpg | "Mclund — CC BY 4.0, vía Wikimedia Commons" | 2026-09-09 | ACTIVO |
| `real/category-luz-y-clima-cover-real.jpg` | Luz y clima (portada de categoría) | Fotografía documental | Wikimedia Commons | Alla Varta | CC BY 4.0 | https://commons.wikimedia.org/wiki/File:Plant_under_a_phytolamp.jpg | "Alla Varta — CC BY 4.0, vía Wikimedia Commons" | 2026-09-10 | ACTIVO (Fase 8C.1) — reemplaza al diagrama como portada de categoría, ver nota abajo |
| `real/category-luz-y-clima-real.jpg` | Luz y clima (entrada "luz-y-fotoperiodo") | Diagrama científico | Wikimedia Commons | Giovnnni pastrami | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Photoperiodism_in_plants.jpg | "Giovnnni pastrami — CC BY-SA 4.0, vía Wikimedia Commons" | 2026-09-09 | ACTIVO — ya no es portada de categoría, ver nota abajo |
| `real/category-sanidad-real.jpg` | Sanidad | Fotografía documental | Wikimedia Commons | Aleksey Gnilenkov | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Red_spider_mite_(Tetranychus_urticae).jpg | "Aleksey Gnilenkov — CC BY 2.0, vía Wikimedia Commons" | 2026-09-09 | ACTIVO |
| `real/category-cultivo-real.jpg` | Cultivo | Fotografía documental | Wikimedia Commons | Aleks | GFDL 1.2+ / CC BY-SA 3.0/2.5/2.0/1.0 | https://commons.wikimedia.org/wiki/File:Industrialhemp.jpg | "Aleks — CC BY-SA 3.0, vía Wikimedia Commons" | 2026-09-09 | ACTIVO |
| `real/category-cosecha-real.jpg` | Cosecha | Fotografía documental | Wikimedia Commons | "Cannabis Pictures" | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Cannabis_Drying_out_the_crop_(16558794823).jpg | "Cannabis Pictures — CC BY 2.0, vía Wikimedia Commons" | 2026-09-09 | ACTIVO — ver nota estética abajo |
| `categories/category-marco-legal.svg` | Marco legal | Ilustración abstracta editorial | Interno (proyecto, Fase 4) | Proyecto Atlas del Cultivo Argentino | Interno (propiedad del proyecto) | — | No requiere | 2026-09-09 | ACTIVO — CONSERVADO, ver justificación en política curatorial |

## Assets descartados de esta ronda pero conservados en disco (no referenciados por `atlasData.js`)

| filename | category | type | source | license | status | motivo |
|---|---|---|---|---|---|---|
| `categories/category-fundamentos.svg` | Fundamentos | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Sustituido por lámina real de mayor credibilidad editorial |
| `categories/category-suelo-y-agua.svg` | Suelo y agua | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Ídem |
| `categories/category-luz-y-clima.svg` | Luz y clima | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Ídem |
| `categories/category-sanidad.svg` | Sanidad | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Ídem — además resuelve el `PENDIENTE` dejado por la Fase 6B |
| `categories/category-cultivo.svg` | Cultivo | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Ídem |
| `categories/category-cosecha.svg` | Cosecha | Ilustración abstracta | Interno (Fase 4) | Interno | REEMPLAZADO | Ídem |
| `categories/pollinations/category-*-pollinations*.jpg` (6 archivos) | Varias | Imagen generada por IA | Pollinations (experimento Fase 6B) | N/A (generado) | EXPERIMENTO CERRADO | Ver `27B_POLLINATIONS_VISUAL_EXPERIMENT.md`. No usar en producción por decisión explícita de esta fase (regla: no IA). Se conservan como registro histórico del experimento, no borrar sin motivo. |

## Nota de composición: Luz y clima (actualizada, Fase 8C.1)

El diagrama de fitocromo (`category-luz-y-clima-real.jpg`) es una imagen apaisada con texto explicativo distribuido en los cuatro costados — en el grid cuadrado de categorías (Fase 8B), el recorte a 1:1 cortaba buena parte de ese texto, haciendo que la tarjeta "pareciera un dibujo" denso e ilegible en vez de comunicar el concepto de "Luz y clima" con claridad. Se resolvió reemplazando la imagen de portada de categoría por una fotografía documental distinta (`category-luz-y-clima-cover-real.jpg`, Alla Varta, CC BY 4.0: una planta bajo luz de cultivo artificial) — el diagrama original **no se eliminó ni se reemplazó como archivo**: sigue activo y en uso como asset de la entrada "luz-y-fotoperiodo" (`asset-luz-clima-photoperiodism`, `entryId` fijo), donde su contenido técnico es directamente pertinente y se lee en un contenedor más ancho. La categoría y la entrada ahora tienen assets separados (antes compartían el mismo archivo) — ver `asset-luz-clima-cover` vs. `asset-luz-clima-photoperiodism` en `editorial/assets.js`.

## Nota editorial: Cosecha

La fotografía elegida (`category-cosecha-real.jpg`) muestra inflorescencias colgadas secándose con luz cálida de atardecer — es documental (un proceso real de poscosecha, no un producto empaquetado ni una vidriera de dispensario), pero su iluminación dorada y el brillo de los tricomas le dan una calidad más "atractiva" que el resto de la serie, más sobria. Se aceptó tras comparar con la alternativa de dominio público (`Herbs_Hung_to_Dry.jpg`, un dibujo lineal muy simple y de bajo valor editorial) por ser la opción real más creíble y relevante disponible — pero se registra la tensión con el principio "evitar estética de dispensario" para una futura revisión si se encuentra una alternativa más sobria.
