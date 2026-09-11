# 33 — Corrección del Mapa Geográfico de Argentina (Fase 8A)

Reemplaza el mapa de `GeoSelector` — hasta ahora un blob SVG dibujado a mano, sin relación real con la geografía argentina — por la geometría oficial de las 23 provincias + CABA.

## 1. Fuente cartográfica

- **Fuente**: georef-ar-api, API del Servicio de Normalización de Datos Geográficos de Argentina (`apis.datos.gob.ar`, organismo oficial del Estado argentino). Cada feature del GeoJSON declara `"fuente": "IGN"` — la geometría proviene del Instituto Geográfico Nacional.
- **URL exacta usada**: `https://apis.datos.gob.ar/georef/api/provincias.geojson?campos=geometria`
- **Formato**: GeoJSON (`FeatureCollection` de `Polygon`/`MultiPolygon`), coordenadas en WGS84 (lon/lat).
- **Fecha de acceso**: 2026-09-10.
- **Verificación previa de licencia/condiciones**: no se encontró una licencia explícita en la página de descarga (`argentina.gob.ar/georef/descarga-de-la-base-completa`); es un dato público servido por una API del Estado argentino para reutilización — igual que otras fuentes geográficas ya en uso en el proyecto (IGN/INDEC, ver `19_SOURCE_REGISTRY.md`). Se registra como fuente oficial, no como fuente de terceros.
- Se comprobó primero un intento directo con `campos=completo` (solo devuelve centroides, no polígonos) y se confirmó mediante `campos=geometria` que el endpoint sí expone la geometría completa — evitando asumir un formato sin verificarlo.

No se usó ninguna fuente alternativa (georef-ar-data en GitHub, Natural Earth, etc.) porque la fuente oficial de primera prioridad (API respaldada por IGN) resultó directamente utilizable.

## 2. Método de conversión

Script reproducible: **`scripts/build-argentina-provinces.py`** (Python 3 estándar, sin dependencias externas — usa `curl` como subproceso para evitar un problema de certificados TLS del Python de este entorno, no de la fuente en sí). Ejecutar con `python3 scripts/build-argentina-provinces.py` para regenerar el archivo de datos si la fuente cambia.

Pasos:
1. Descarga el GeoJSON completo (24 features: 23 provincias + CABA).
2. **Filtra Tierra del Fuego**: el feature "Tierra del Fuego, Antártida e Islas del Atlántico Sur" es un `MultiPolygon` de 1497 polígonos que incluye el reclamo antártico argentino y los archipiélagos del Atlántico Sur (Malvinas, Georgias, Sandwich) — geometría real, pero a una escala y ubicación que rompería por completo la proporción del mapa continental (un selector de zona de cultivo no necesita representar la Antártida). Se filtró por bounding box geográfico a solo Isla Grande de Tierra del Fuego + Isla de los Estados (`lon [-69.2, -63.3]`, `lat [-55.6, -52.2]`), quedando 84 de los 1497 polígonos. **No se tocó ninguna otra provincia.**
3. **Proyección**: cónica equivalente de Albers, ajustada a Argentina (paralelos estándar -28°/-52°, meridiano central -65°) — necesaria porque Argentina es un país muy alargado en el eje norte-sur (~3800 km) y una proyección equirrectangular simple distorsiona visiblemente el norte contra el sur.
4. **Simplificación**: Douglas-Peucker con tolerancia de 2500 m en el plano proyectado — reduce el total de puntos de ~23.300 (post-filtro de Tierra del Fuego) a 2.329, sin deformar límites de forma perceptible (verificado visualmente, ver §5).
5. Reescala a un `viewBox` SVG (`0 0 620 1323.2`, calculado automáticamente a partir del bounding box real) y emite `src/app/lib/geo/argentinaProvinces.js` con, por provincia: `id` interno, `name`, atributo `d` de `<path>`, `centroid` y `bbox` en coordenadas SVG.

## 3. Mapeo de identidades

Mapeo explícito por nombre (no por posición de array) en `NAME_TO_ID` dentro del script — cada nombre oficial de IGN/georef se asocia a mano con el `province_id` interno que ya usaba `GeoSelector.js` (`buenos-aires`, `caba`, `catamarca`, ... `tierradelfuego`, 24 en total). Los 24 IDs internos **no cambiaron** — `provinceData` (usado por el buscador de texto y el `<datalist>`) se dejó intacto en `GeoSelector.js`.

## 4. Tratamiento de CABA

CABA es, en la geometría real, un polígono minúsculo (~6×6.7 unidades SVG sobre un lienzo de 620×1323 — sin exagerar, del tamaño de un punto) pegado a la costa del Río de la Plata, dentro de la provincia de Buenos Aires. No se deformó ni se agrandó su geometría real. Para que siga siendo seleccionable:
- Se agregó un **hitbox circular invisible** (radio 16 unidades, ~5× el tamaño real de CABA) centrado en su centroide, superpuesto, con su propio `onClick`/`onKeyDown`/foco — es el objetivo de interacción real.
- Se agregó un **punto marcador visible** (círculo de color `--clay`, la misma paleta que ya usaba el mapa anterior para "seleccionado") sobre el centroide, para que CABA sea descubrible a simple vista aunque su polígono real sea ilegible a esa escala.
- El polígono real de CABA también es clicable/seleccionable directamente (queda debajo del hitbox), por si el zoom del navegador o el dispositivo permiten acertarlo.

## 5. Verificación geográfica

Inspección visual (captura de pantalla real, no solo prueba automática) confirmó forma y posición relativa correctas de: NOA (Jujuy, Salta, con la Puna angosta hacia el oeste), NEA (Misiones como "dedo" hacia el noreste, Corrientes, Chaco, Formosa), Cuyo (Mendoza, San Juan, San Luis), Centro (Córdoba, Santa Fe, Entre Ríos), Buenos Aires (con su forma característica y el Río de la Plata), Patagonia (Neuquén → Río Negro → Chubut → Santa Cruz angostándose hacia el sur) y Tierra del Fuego (isla separada en el extremo sur). Las 23 provincias + CABA están presentes y son geométricamente distinguibles — sin fusiones, sin desplazamientos, sin deformaciones evidentes.

## 6. Estilo visual

Se conservó la identidad visual existente del atlas (fondo degradado `--sage-dark`→`--sage`, patrón de puntos, tarjeta `geo-picker`): el mapa pasó de "ilustración decorativa sin relación con la geografía" a "cartografía real con estética editorial" — líneas finas (`stroke-width: 1.4`), relleno `--paper` en reposo, `--sage-glass` en hover, `--clay` en seleccionado (mismos tokens de color que ya usaba el mapa anterior para su estado "seleccionado", sin introducir paleta nueva). Sin sombras 3D, sin gradientes sobre las provincias, sin ninguna capa climática (ni color, ni ícono, ni leyenda).

## 7. Archivos modificados/creados

- **Creado**: `scripts/build-argentina-provinces.py` — script reproducible de conversión (documentado, sin dependencias externas).
- **Creado**: `src/app/lib/geo/argentinaProvinces.js` — datos generados (geometría SVG de las 24 jurisdicciones, no editar a mano).
- **Modificado**: `src/app/components/GeoSelector.js` — se reemplazó el SVG de blob falso y los 15 `provinceMapPositions` hardcodeados (solo 9 provincias tenían punto, las otras 15 no eran seleccionables en el mapa) por las 24 rutas reales, con hover/selección/teclado (`tabIndex`, `role="button"`, `aria-label`, `aria-pressed`, `onKeyDown` para Enter/Espacio) y el tratamiento especial de CABA (§4). `provinceData`, `zoneExamples`, el buscador de texto y el resto del flujo (selección de zona, resumen, botones "Explorar"/"Explorar sin elegir") quedaron intactos.
- **Modificado**: `src/app/globals.css` — reemplazadas las reglas del mapa anterior (`.map-outline`, `.map-shadow`, `.map-division`, `.map-pin-dot`, `.map-pin-label`, `.province-dot*`) por reglas para geometría real (`.map-province`, `.map-province.hovered`, `.map-province.selected`, `.map-province:focus-visible`, `.map-caba-dot`, `.map-caba-hitbox`). Se ajustó `.geo-map`/`.argentina-map` de un contenedor fijo de 260px (pensado para el blob cuadrado anterior) a un contenedor que respeta la proporción real de Argentina (alto ≈ 2,13× el ancho), escalado por `width: min(52%, 190px)` dentro de la tarjeta existente.
- **No tocado**: `atlasData.js`, `editorialData.js`, contenido editorial, assets, `/api/geo` (contrato sin cambios), `EnvironmentalPanel.js`, `CategoryShowcase.js`, ninguna otra fase.

## 8. Pruebas realizadas

- `npm run build`: exit limpio, sin errores provocados por esta tarea.
- Playwright (Chromium headless) en 1440×900, 1280×800, 768×1024 y 390×844 sobre Home: status 200, mapa visible (24 `.map-province` presentes en las 4 resoluciones), sin overflow horizontal del componente `.geo-picker`/mapa en ninguna resolución, sin errores de consola, sin imágenes rotas, click en una provincia activa su estado `selected`, click en el hitbox de CABA selecciona CABA y actualiza el resumen de ubicación ("CABA") y la lista de zonas ("Capital Federal").
- Inspección visual de capturas completas (desktop y mobile) y de un recorte ampliado del mapa: la forma es inequívocamente reconocible como Argentina, con NOA/NEA/Cuyo/Centro/Buenos Aires/Patagonia/Tierra del Fuego en su posición y proporción correcta.
- Regresión: `/api/geo?layer=provinces` → 200 (contrato sin cambios), `/api/climate` → 200, `/atlas` → 200.

## 9. Resultado del build

`npm run build` → éxito, 9 rutas generadas (`/`, `/_not-found`, `/api/auth/[...nextauth]`, `/api/climate`, `/api/geo`, `/api/storage`, `/atlas`, `/atlas/[category]`, `/atlas/[category]/[entry]`, `/creditos`), sin errores de TypeScript ni de compilación.

## 10. Problemas pendientes (no provocados por esta tarea, no corregidos aquí)

- Se detectó overflow horizontal en mobile (390px) causado por `.atlas-card-image` dentro de `CategoryShowcase` (la grilla de categorías del Atlas, Fase 3/4) — **no relacionado con el mapa ni con `GeoSelector`**, confirmado inspeccionando qué elementos exceden el viewport (ninguno pertenece al mapa). Fuera del alcance de esta fase (regla explícita: no tocar contenido/imágenes/grid); queda registrado para quien audite `CategoryShowcase` en el futuro.
- La licencia exacta de los datos de georef-ar-api no está declarada de forma explícita en la página de descarga consultada — se usa igualmente por ser una API oficial del Estado argentino que redistribuye datos de IGN, consistente con el resto de fuentes geográficas ya citadas en `19_SOURCE_REGISTRY.md`. Si se requiere una redistribución más allá del uso interno del sitio, conviene confirmar por escrito con el organismo antes del lanzamiento (mismo estándar de cautela ya aplicado a otras capas geográficas del proyecto).

**FASE 8A TERMINADA. No se inicia 8B ni 8C.**
