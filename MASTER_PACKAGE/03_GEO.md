# 03 — Principio Geográfico

## Jerarquía
```
ARGENTINA
  → PROVINCIA (23 provincias + CABA = 24 jurisdicciones)
    → ZONA APROXIMADA (subdivisión dentro de la provincia)
      → CONDICIONES AMBIENTALES (clima, suelo, agua, altitud)
        → CONTENIDO RELEVANTE (enciclopedia + calendario + alertas)
```

## Separación explícita de estructura geográfica versus clima parcial
La parte de la estructura geográfica que YA puede implementarse con información verificable es la jerarquía administrativa de referencia:
```
ARGENTINA -> PROVINCIA -> DEPARTAMENTO/PARTIDO -> ZONA EDITORIAL APROXIMADA
```
Esto está respaldado por divisiones administrativas oficiales (IGN/INDEC) y por el nivel de departamento/partido como base de datos y geocodificación.

La parte climática (`Köppen`, `climatología de referencia`, `heladas`, `regionalización agroecológica`) sigue declarada `PARTIAL_RESEARCH` en `21_GEO_CLIMATE_RESEARCH.md` y no debe añadirse a la estructura geográfica propuesta ni eliminar la capacidad de la arquitectura de incorporar esas fuentes más tarde sin rehacer el modelo.

## Divisiones administrativas oficiales (verificado)
23 provincias + CABA, confirmado por IGN (División Política) y corroborado por INDEC (CODGEO), que además define la codificación estándar **provincia → departamento/partido/comuna** — ese es precisamente el nivel que el proyecto necesita para "zona aproximada". Fuentes en [[19_SOURCE_REGISTRY]].

## Por qué una provincia no alcanza como unidad
Ejemplos concretos que justifican una subdivisión (usar como casos de referencia al diseñar el picker de zonas):
- **Buenos Aires**: de pampa húmeda a zona costera atlántica — clima y suelo muy distintos entre el norte/oeste de la provincia y la costa.
- **Mendoza**: de alta montaña árida a valles cultivados (oasis de riego) — altitud y disponibilidad de agua completamente distintas dentro de la misma provincia.
- **Salta/Jujuy**: puna (altura, frío, aridez extrema), yungas (selva de montaña, húmeda) y valles templados coexisten en la misma provincia.
Esto confirma la premisa fundacional del blueprint: "el cultivo no es igual en toda Argentina", ni siquiera dentro de una misma provincia.

## Estrategia de subdivisión (decisión recomendada)
Usar como unidad de "zona aproximada" el **departamento/partido/comuna** (nivel administrativo ya codificado por INDEC/IGN), **agrupado editorialmente** en subregiones climáticas con nombre reconocible (ej. "Valle de Uco", "Puna Jujeña", "Costa Atlántica bonaerense") en vez de exponer al usuario ~530 departamentos sueltos.

- **DECISIÓN**: el departamento/partido es la unidad de datos (nivel granular, para poder anclar clima/suelo con precisión razonable); la "zona" que ve el usuario en el selector es una **agrupación editorial de 1 a N departamentos** con un nombre y descripción reconocibles.
- **MOTIVO**: un selector de ~530 departamentos es una mala UX ("¿Dónde cultivás?" no debería sentirse como un formulario catastral); agrupar por identidad geográfica reconocible (valles, costa, puna, etc.) es más usable y también más honesto, porque el clima real no respeta límites de departamento.
- **ALTERNATIVAS consideradas**: (a) usar solo provincia, descartada por no resolver el problema que motiva el proyecto; (b) usar coordenadas libres/geolocalización, descartada por violar el principio de privacidad ([[10_PRIVACY]]) y por dar falsa precisión (un clima "de tu punto exacto" no es realista con las fuentes de datos disponibles).
- **CONSECUENCIAS**: requiere trabajo editorial manual de agrupación por provincia (no es automatizable con una regla simple) — se transforma en una tarea de contenido, no solo de datos. Ver TODO RESEARCH abajo.
- **TODO RESEARCH (actualizado 2026-09-09, ver `21_GEO_CLIMATE_RESEARCH.md`)**: INTA RIAN y un segundo candidato hallado en esta ronda ("regiones agroeconómicas homogéneas", proyecto RySA) siguen sin lectura primaria posible desde este entorno (dominios `inta.gob.ar`/`idesa.gob.ar` inaccesibles) — su existencia y forma general están corroboradas por evidencia secundaria consistente, pero no se puede confirmar todavía si reemplazan el agrupamiento manual. Ver estado completo y próximos pasos en `21_GEO_CLIMATE_RESEARCH.md` §5 y §12.

## Fuentes de datos geográficos (límites administrativos)
- **georef-ar-api** (datos.gob.ar, código MIT) — GeoJSON y shapefile de provincias y departamentos, gratuito, es la opción recomendada para arrancar. Migrar a la versión v2.1 (la v1 está en deprecación). Revisar el texto de condiciones de uso de los *datos* (distinto de la licencia del código) antes de redistribuir.
- **IGN Geoportal / Capas SIG** — fuente primaria oficial de la que deriva georef-ar-api; shapefile/KML/GeoJSON/CSV en WGS84/POSGAR07. Requiere aceptar términos y condiciones — revisar antes del lanzamiento.
- **Natural Earth** — dominio público, sin atribución requerida, pero solo a nivel provincia y con geometría generalizada (no apta para departamentos). Útil solo para prototipo temprano del mapa nacional, no para el picker de zona final.

## Condiciones ambientales a documentar por zona (detalle operativo en [[04_CLIMATE]])
- Temperatura (promedio, mínimas/máximas históricas)
- Precipitación
- Humedad
- Viento
- Estacionalidad (cuándo empieza/termina cada estación en términos prácticos de cultivo, no solo el calendario astronómico)
- Altitud (fuente: IGN MDE-Ar, modelo digital de elevación oficial de 45m, basado en SRTM corregido)
- Características generales del suelo (a nivel descriptivo, no un mapa edafológico completo en v1 — **ASSUMPTION**, ver roadmap)
- Características generales del agua (dureza/origen típico: red, pozo, deshielo — ver [[05_CONTENT]] categoría Agua)
- Eventos meteorológicos relevantes (heladas, granizo, tormentas, nieve — frecuencia típica de la zona, no pronóstico)

## Regla de no inventar datos
Todo dato ambiental publicado por zona debe:
1. Tener una fila correspondiente en [[19_SOURCE_REGISTRY]], o
2. Estar marcado `ASSUMPTION` si es una inferencia razonable no verificada directamente, o
3. Estar marcado `TODO RESEARCH` si falta investigación antes de publicar.
Nunca se publica un número (ej. "precipitación anual: 800mm") sin fuente trazable.

## Mapa (detalle técnico, complementa lo geográfico)
- **Tecnología recomendada**: **MapLibre GL JS** (open-source, sin API key, sin costo, fork de Mapbox GL JS v1) como opción principal si se quiere estética vectorial moderna; **Leaflet** (BSD-2, aún más simple/liviano) como alternativa si el mapa termina siendo mayormente un selector tipo "coroplético" (provincia coloreada, clic para seleccionar) sin necesidad de estilizado vectorial avanzado. **Evitar Mapbox GL JS** (licencia propietaria desde 2020, requiere token y es medido por uso) — no aporta nada que MapLibre no resuelva gratis para este caso de uso.
- **Formato de datos**: GeoJSON como formato de intercambio estándar (liviano, nativo en JS, compatible con ambas librerías).
- **Interacción**: clic/tap en provincia → resalta y despliega selector de zona (lista, no obliga a hacer zoom/clic preciso en un departamento pequeño en mobile).
- **Mobile**: el mapa debe degradarse a una lista de provincias con buscador si el dispositivo/red no soporta bien el render vectorial (ver fallback abajo) — nunca debe ser el único camino.
- **Fallback si el mapa no carga**: selector `<select>`/lista de texto con las mismas provincias y zonas, siempre presente y funcional aunque el mapa falle o el usuario tenga JS deshabilitado (progressive enhancement, no dependencia dura del mapa para la función central del sitio).
- **Accesibilidad**: el mapa nunca es el único medio de seleccionar ubicación (ver también [[02_UX]] y 02_UX.md, sección Accesibilidad).
