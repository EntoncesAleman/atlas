# 64 — Widget de clima del Atlas

Fecha: 2026-09-17. Construye un widget de clima real para el Atlas general (no Mi Cultivo, que ya
tenía el suyo desde la Fase 11 — ver `42_PHASE_11_CLIMA_MI_CULTIVO.md`), reutilizando toda la
infraestructura climática existente. No se investigó climatología de nuevo, no se cambiaron
categorías, mapa, navegación, Buscador, Mi Cultivo ni Comunidad.

## 1. Qué se implementó

- `EnvironmentalPanel` (`src/app/components/EnvironmentalPanel.js`) — existía desde antes como una
  tarjeta puramente decorativa ("Panel Ambiental", sin datos reales, nunca montada en ninguna
  página). Se adaptó en el mismo archivo/nombre en vez de crear un componente nuevo, tal como pide
  la arquitectura del proyecto ("reutilizar contenedores equivalentes, no duplicar").
- Se montó en `/atlas` (`src/app/atlas/page.js`), justo debajo del `ProvinceStatusBar` en el hero
  y antes del grid de categorías — sigue el flujo "Atlas → contexto geográfico → información
  ambiental → contenido editorial" sin crear una sección de navegación nueva.
- Reutiliza `fetchProvinceWeather` (`lib/weather/service.js`, Fase 11) — el mismo proxy
  `/api/climate`, la misma tabla de coordenadas por provincia, la misma clave de contexto
  geográfico (`atlas:selectedProvince`) que ya escriben `GeoSelector`/`ProvinceStatusBar`. Cero
  lógica de fetch duplicada.

## 2. Datos que muestra

Temperatura, sensación térmica, humedad, viento, precipitación, condición del cielo (traducción de
`weather_code` de Open-Meteo — código WMO estándar, no una interpretación agronómica), amanecer y
atardecer de hoy, pronóstico corto de 3 días (condición + máx./mín.), alertas por umbral ya
existentes (helada, lluvia abundante — mismas que Mi Cultivo, con el mismo enlace al SMN), y
timestamp de generación. Cada dato se muestra solo si el proveedor lo trajo — nunca un valor
inventado en su lugar.

## 3. Ampliación de `/api/climate` (aditiva, compatible)

`route.js` amplió los parámetros `current`/`daily` enviados a Open-Meteo con
`apparent_temperature`, `weather_code`, `sunrise`, `sunset` — el widget los necesitaba y Open-Meteo
ya los expone sin costo ni autenticación adicional en su tier gratuito (mismo proveedor, mismos
términos ya validados en la Fase 11). El contrato público no cambió de forma incompatible: los
campos que ya leía `fetchProvinceWeather` (`temperature_2m`, `relative_humidity_2m`,
`precipitation`, `wind_speed_10m`, `temperature_2m_max/min`, `precipitation_sum`) siguen ahí, con
el mismo nombre y forma — Mi Cultivo (el único otro consumidor) sigue funcionando sin cambios,
verificado en vivo. `fetchProvinceWeather` se extendió para parsear los campos nuevos
(`current.apparentTemperature`, `current.weatherCode`/`weatherLabel`,
`forecast[].weatherCode`/`weatherLabel`/`sunrise`/`sunset`, `sunrise`/`sunset` de hoy) sin tocar
los campos que ya devolvía. El manejo de errores de `route.js` (sin exponer `error.message`,
cierre de P3-3) no se tocó.

## 4. Estados implementados

| Estado | Comportamiento |
|---|---|
| Pre-hidratación | Esqueleto (evita un salto visual si en realidad sí hay provincia guardada) |
| Sin provincia | Mensaje neutro invitando a elegir provincia en Inicio — nunca autoselecciona, nunca usa GPS |
| Cargando | Esqueleto (`atlas-skeleton-block`/`atlas-skeleton-line`, ya usados por `loading.js` de P3-2), región `aria-live="polite"` |
| Error | Mensaje humano, sin detalle interno, botón "Reintentar" |
| Éxito | Todos los datos disponibles, con unidad y etiqueta |
| Datos parciales | Solo se renderizan los campos que el proveedor trajo (cada `Stat` es `null`-safe) — verificado forzando una respuesta con un solo campo presente |

Cambiar de provincia (Home → "Explorar") y quitar provincia (`ProvinceStatusBar`) actualizan el
widget correctamente porque ambos flujos ya recargan la página — mismo patrón que usa el resto del
contexto geográfico del Atlas (`ProvinceStatusBar`, `ProvinceContextPanel`); no se inventó un
mecanismo de sincronización entre componentes nuevo.

## 5. Diseño visual

Reutiliza literalmente el mismo lenguaje visual que ya usa el clima de Mi Cultivo
(`.mi-cultivo-weather-*`): misma tarjeta de stat, mismos tokens de color
(`--paper-soft`, `--line`, `--sage-dark`, `--sage-glass`, `--clay`), misma tipografía
(`--font-serif` para valores, Inter para etiquetas). Clases nuevas con prefijo `environmental-*`
(el componente ya se llamaba así) — sin gradientes, sin iconografía nueva, sin mapa de colores por
temperatura. Se agregó una utilidad `.sr-only` (no existía) para el anuncio de carga accesible.

## 6. Verificación

Playwright real contra `npm run dev`: sin provincia → estado neutro; seleccionar Mendoza → datos
reales (temperatura, sensación térmica, humedad, viento, lluvia, amanecer/atardecer, pronóstico de
3 días, fuente); cambiar a Chubut → el widget se actualiza; quitar provincia → vuelve al estado
neutro; reload → persiste; loading → esqueleto visible; error forzado (mock de `/api/climate` con
500) → mensaje humano + reintentar, sin fuga de detalle interno; datos parciales forzados (solo
temperatura) → solo esa tarjeta se muestra, sin inventar el resto; responsive 375/768/1280px → sin
overflow; Mi Cultivo probado de nuevo → clima real sigue funcionando; 0 errores de consola, 0
assets rotos en todo el recorrido. `npm run build` limpio.

## 7. Qué NO se hizo (respetando el alcance del loop)

Ninguna recomendación de cultivo derivada del clima, ninguna investigación climatológica nueva,
ningún cambio en Home/Mi Cultivo/mapa/Buscador/Comunidad más allá de la extensión aditiva de
`/api/climate`, ningún sistema de caché/polling nuevo (se apoya en el mismo `cache-control` de
`/api/climate` ya vigente desde la Fase 11).

## 8. Mejoras futuras (no bloquean, no implementadas)

- El pronóstico corto se limita a 3 días (mismo límite que ya tenía `/api/climate` antes de este
  loop) — Mi Cultivo usa 5; no se cambió `forecast_days` para no alterar el volumen de datos que
  ya consume Mi Cultivo sin necesidad real comprobada.
- No hay debounce si alguien cambia de provincia muy seguido — mismo criterio ya documentado como
  aceptable en la Fase 11 para el widget de Mi Cultivo.
