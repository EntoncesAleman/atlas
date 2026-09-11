# 06 — Biblioteca Visual (sistema de assets)

## Objetivo
Definir la estructura y metadatos del sistema de medios, sin descargar ni generar ninguna imagen todavía.

## Qué puede tener cada contenido
- 1 fotografía principal (obligatoria si el artículo lo amerita, opcional para artículos muy conceptuales).
- N fotografías secundarias.
- Ilustraciones (para conceptos que no se fotografían bien: anatomía, ciclos, diagramas de fotoperiodo).
- Diagramas (clima, geografía, timelines).
- Etiquetas (tags) libres + tags controlados (categoría, región si aplica, fase de la planta).
- Metadatos: autor/fuente, tipo de licencia, fecha de captura/creación, alt text (obligatorio, accesibilidad), dimensiones, formato.
- Fuente/licencia: obligatorio para toda imagen no generada internamente — ninguna imagen se publica sin licencia clara (propia, banco libre con atribución, o generada).

## Estructura de carpetas/prefijos de asset (lógica, no física — se traduce al storage elegido en [[08_ARCHITECTURE]])
```
/assets
  /maps
  /climate
  /germination
  /growth
  /flowering
  /cloning
  /pests
  /diseases
  /harvest
  /storage
  /soil
  /water
  /indoor
  /outdoor
```
Cada carpeta corresponde 1:1 con una categoría de la enciclopedia ([[05_CONTENT]]) para que el asset se pueda vincular por convención además de por relación explícita en base de datos.

## Reglas
- Toda imagen debe tener alt text descriptivo — no decorativo — porque gran parte del valor educativo está en identificar visualmente plagas/deficiencias/etapas.
- Las fotografías de usuarios ("Mi Cultivo") son un sistema **completamente separado y privado** — nunca se mezclan con la biblioteca visual pública ni se usan como contenido editorial sin consentimiento explícito y opt-in del usuario (ver [[10_PRIVACY]]).
- Formato preferido: WEB moderno (AVIF/WebP) con fallback, para peso liviano en conexiones móviles (relevante: uso desde el patio/campo con datos móviles).
- Ilustraciones/diagramas se prefieren vectoriales (SVG) cuando sea posible por peso y nitidez en cualquier tamaño.

## Pendiente de decidir en fase de construcción (marcado TODO RESEARCH)
- Proveedor de banco de imágenes libres de derechos que cubra fotografía botánica de calidad (ej. explorar si hace falta fotografía propia vs. bancos existentes) — no se decide en este blueprint.
- Herramienta/proceso de generación de ilustraciones/diagramas (¿ilustrador humano, herramienta interna, generación asistida?) — ASSUMPTION: se resolverá en fase de construcción de contenido, no de arquitectura.
