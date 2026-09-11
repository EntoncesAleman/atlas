# 05 — Arquitectura de Contenido (Enciclopedia)

## Principio de organización
Cada artículo de la enciclopedia se clasifica en uno de dos tipos:

- **CONTENIDO GENERAL**: verdadero en cualquier parte de Argentina (ej.: anatomía de la planta, ciclo de vida, qué es el fotoperiodo). No cambia por región.
- **CONTENIDO DEPENDIENTE DE REGIÓN**: su valor/aplicación cambia según provincia/zona (ej.: cuándo empieza la floración exterior en Salta vs. Tierra del Fuego, riesgo de granizo en Córdoba, dureza del agua de red en Buenos Aires vs. agua de perforación en Cuyo).

Un artículo puede ser general en su cuerpo principal y tener **bloques regionalizados incrustados** (ver patrón "En tu zona" en [[02_UX]]) en vez de duplicarse por provincia. Esto evita explosión combinatoria de contenido.

## Categorías (taxonomía v1)

1. **Fundamentos** — ciclo de vida, anatomía, genética (conceptos generales, no comercial), reproducción. *General.*
2. **Germinación** — semillas (conceptos: viabilidad, tipos, no marcas), método de germinación, primeros estadios. *General*, con nota regional sobre época recomendada según zona.
3. **Crecimiento (vegetativo)** — desarrollo vegetativo, raíces, tallos, hojas. *General.*
4. **Floración** — desarrollo floral, fotoperiodo, cambios estacionales. *Dependiente de región* para exterior (fechas de cambio de fotoperiodo natural varían con latitud), *general* para el concepto de fotoperiodo en sí.
5. **Clonación** — propagación, esquejes, desarrollo de clones. *General.*
6. **Sustrato y suelo** — suelo, sustratos, estructura, drenaje. *General* en concepto; *dependiente de región* en "qué tipo de suelo predomina en tu zona" (ver [[03_GEO]]).
7. **Agua** — agua de red, agua de lluvia, agua subterránea, dureza, minerales, pH como concepto. *Dependiente de región* fuertemente (la dureza y composición del agua de red/pozo varía muchísimo por provincia).
8. **Luz** — luz solar, fotoperiodo, iluminación artificial *como concepto* (nunca como catálogo de productos). *Dependiente de región* para horas de luz natural según latitud/estación.
9. **Clima** — temperatura, humedad, viento, lluvia, heladas, granizo, tormentas, nieve, amplitud térmica. Fuertemente *dependiente de región*; ver [[04_CLIMATE]].
10. **Sanidad** — plagas, hongos, enfermedades, deficiencias, excesos, daños ambientales. *General* en identificación; *dependiente de región* en prevalencia (ej. hongos más comunes en zonas húmedas del litoral vs. zonas áridas de Cuyo).
11. **Cultivo (formatos)** — interior, exterior, maceta, suelo, ambientes controlados. *General* en técnica; *dependiente de región* en viabilidad de exterior según clima.
12. **Cosecha** — maduración, indicadores generales, cosecha. *General*, con nota de época estimada según zona/floración.
13. **Almacenamiento** — conservación, humedad, temperatura, almacenamiento. *General.*

### Categorías adicionales identificadas como necesarias (no estaban explícitas en el pedido original, se agregan por completitud)
14. **Marco legal y contexto** — resumen no vinculante del marco legal argentino de autocultivo (REPROCANN, etc.), con disclaimer editorial fuerte de que no es asesoramiento legal. Ver [[12_LEGAL]].
15. **Glosario** — términos técnicos, para dar soporte transversal a la búsqueda y a lectores nuevos.
16. **Preguntas frecuentes por región** — FAQ corta, generada a partir de los bloques "En tu zona" más consultados (ver métricas en [[01_PRODUCT]]).

## Modelo de artículo (conceptual, detalle de campos en [[07_DATABASE]])
- Título, slug, categoría, tipo (general/regional/mixto), cuerpo (rich text/markdown), imagen principal, imágenes secundarias, tags, artículos relacionados, bloques regionales (0..N, cada uno atado a una o más zonas/provincias), fecha de publicación, fecha de última revisión, estado (borrador/publicado).
- **Fecha de última revisión** es visible en el artículo: contenido agronómico y climático necesita revisión periódica (ver [[17_RISKS]], riesgo de contenido desactualizado).

## Reglas de escritura editorial
- Tono: divulgación científica seria, no coloquial "stoner", no alarmista.
- Nunca mencionar marcas, tiendas, precios.
- Nunca dar indicaciones de dosificación, consumo o extracción.
- Cuando se cite un dato regional (clima, suelo), debe estar respaldado por fuente registrada en [[19_SOURCE_REGISTRY]] o marcado `ASSUMPTION`/`TODO RESEARCH`.
