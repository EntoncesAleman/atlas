# 42 — Clima Personalizado + Contexto Ambiental de Mi Cultivo (Fase 11)

Agrega a "Mi Cultivo" una sección de contexto ambiental con datos meteorológicos reales para la provincia aproximada del cultivo. No es una app de clima: el objetivo es dar contexto a la etapa actual del cultivo con condiciones ambientales reales, nunca instrucciones de cultivo derivadas de esos datos.

## 1. Qué se implementó

- Selector de "ubicación aproximada (provincia)" dentro de Mi Cultivo, disponible tanto sin cuenta como con cuenta.
- Sección "Contexto ambiental" que muestra, solo cuando hay datos reales disponibles: temperatura, humedad, precipitación y viento actuales; un pronóstico corto (5 días); lecturas descriptivas "Qué está pasando hoy"; y alertas calculadas por umbral sobre el pronóstico (helada, lluvia abundante).
- Ningún dato inventado: si el proveedor no responde o la ubicación no tiene datos, se muestra "Datos ambientales no disponibles en este momento" — nunca un 0 disfrazado de dato real.
- Cero infraestructura nueva de servidor: se reutilizó el proxy `/api/climate` que ya existía de una fase anterior (ya resolvía "la UI nunca llama al proveedor externo directamente").

## 2. Fuentes investigadas y fuente elegida

Se releyó `04_CLIMATE.md`, `18_EXTERNAL_SERVICES.md` y `21_GEO_CLIMATE_RESEARCH.md` (investigación ya existente, tratada como línea de base) y se revalidó en vivo antes de dar nada por sentado:

| Fuente | Estado | Motivo |
|---|---|---|
| **Open-Meteo** (elegida — reconfirma Decisión D2) | Verificado en vivo (2026-09-11) | Sin necesidad de API key para uso no comercial, 10.000 llamadas/día, cobertura confirmada de temperatura/humedad/precipitación/viento actuales + horario + diario (hasta 16 días). Términos de uso releídos: siguen permitiendo "private or non-profit websites or apps that do not have subscriptions or advertising" — coincide con el perfil del proyecto. |
| SMN (Servicio Meteorológico Nacional) | Descartada como fuente de datos en vivo; usada como referencia de autoridad | `smn.gob.ar/avisos_a_muy_corto_plazo` devolvió **HTTP 402** al reintentarlo en esta fase, igual que en la investigación previa (`21_GEO_CLIMATE_RESEARCH.md`). No se pudo verificar que exponga una API pública consumible. Se la enlaza en la UI como referencia oficial de alertas, no como dependencia técnica. |
| INTA (RIAN/agroclima) | Descartada, sin cambios respecto a investigación previa | Dominios (`agroregionesrian.inta.gob.ar`, `climayagua.inta.gob.ar`, etc.) siguen sin resolver DNS desde este entorno — no se puede verificar que tengan API alguna. |
| OpenWeatherMap / Tomorrow.io / WeatherAPI.com / Visual Crossing | Descartadas | Comparadas en `04_CLIMATE.md`: requieren tarjeta, tienen límites más restrictivos en el tier gratuito, o términos menos claros para uso no comercial. No se volvió a evaluar en profundidad porque D2 ya las había descartado con justificación vigente. |

**No existe endpoint de alertas meteorológicas en Open-Meteo** (confirmado releyendo su documentación actual) — se mantiene la conclusión ya documentada: las alertas de esta fase se calculan localmente por umbral sobre el pronóstico, nunca se presentan como un aviso oficial, y siempre acompañadas de un enlace al SMN para alertas oficiales reales.

No se registró ninguna Decisión nueva en `16_DECISIONS.md`: esta fase es una continuación directa de la Decisión D2 ya vigente (mismo proveedor, mismo motivo), no una decisión nueva.

## 3. Cobertura, licencia y límites de Open-Meteo

- **Cobertura**: variables actuales (temperatura, humedad relativa, precipitación, viento) + pronóstico diario (máx./mín. de temperatura, precipitación acumulada) hasta 16 días — se usan solo los primeros 5 del pronóstico en la UI.
- **Licencia/términos**: uso gratuito sin API key para aplicaciones no comerciales, sin publicidad ni suscripciones — coincide con el perfil editorial/no comercial de este proyecto.
- **Límites**: 10.000 llamadas/día, 5.000/hora, 600/minuto (por IP de origen — en este caso, el servidor de la app, no cada visitante). El proxy `/api/climate` ya envía `cache-control: public, s-maxage=3600, stale-while-revalidate=86400`, así que pedidos repetidos a la misma ubicación dentro de esa hora se sirven desde el caché HTTP del navegador/CDN sin volver a golpear a Open-Meteo — no se construyó una capa de caché propia porque esta ya alcanza.

## 4. Arquitectura

```
src/app/lib/weather/
  locations.js   — coordenadas representativas por provincia (no llama a ningún proveedor)
  service.js     — fetchProvinceWeather(provinceId): llama a /api/climate, normaliza la
                   respuesta y calcula lecturas/alertas por umbral
```

La UI (`mi-cultivo/page.js`) solo conoce `fetchProvinceWeather(provinceId)` — nunca arma la URL de Open-Meteo ni sabe qué proveedor hay detrás. Cambiar de proveedor en el futuro implica reescribir `service.js` (y, si hiciera falta, `/api/climate/route.js`), sin tocar la página. No se agregó ninguna dependencia nueva — `fetch` nativo y `Date` alcanzan.

`/api/climate/route.js` y `/api/geo/route.js` no se modificaron: ya existían y ya cumplían el contrato de proxy/servidor y de separación geografía/clima que pedía esta fase.

## 5. Ubicación: resolución, fuente y excepción documentada

- **Resolución**: provincia únicamente — nunca departamento, zona, dirección ni coordenadas propias de la persona. Coincide con `10_PRIVACY.md` ("ubicación siempre aproximada") y con el modelo geográfico de `03_GEO.md`.
- **Fuente de las coordenadas representativas**: centroide geométrico oficial de cada provincia, vía **georef-ar-api** (`apis.datos.gob.ar/georef`) — la misma API oficial (respaldada por IGN) ya usada en la Fase 8A para la geometría del mapa. Consultada en vivo el 2026-09-11 (`GET /api/provincias?campos=id,nombre,centroide`), no inventada ni copiada de una fuente de segunda mano.
- **Excepción documentada — Tierra del Fuego**: el centroide oficial de "Tierra del Fuego, Antártida e Islas del Atlántico Sur" cae en torno a -82,5° de latitud, dentro del territorio antártico reclamado — inútil como referencia meteorológica (no hay estaciones ni sentido agronómico ahí). Se usa en su lugar el centroide oficial del **municipio de Ushuaia** (misma API, mismo criterio ya aplicado en la Fase 8A al recortar la geometría del mapa a la Isla Grande + Isla de los Estados).
- Lo único que persiste en Supabase (columna nueva `cultivos.province_id`, `text`, nullable) es el identificador de provincia elegido por la persona — nunca una coordenada, nunca una consulta climática puntual.

## 6. Privacidad — qué sale del sistema y hacia dónde

- Lo único que viaja al proveedor externo (Open-Meteo, vía el proxy propio) es la coordenada **representativa de la provincia** (4 decimales, un punto fijo por provincia) — nunca una coordenada del dispositivo ni del usuario. No se pidió ni se usó geolocalización del navegador en ningún momento.
- El único dato que se le pregunta a la persona es "¿en qué provincia está tu cultivo?" — un desplegable de 24 opciones, no un mapa ni un buscador de direcciones.
- Ninguna respuesta climática puntual se guarda en Supabase — cada carga de la sección hace una consulta en vivo (a través del proxy). Solo persiste la provincia elegida.

## 7. Alertas

Sin endpoint de alertas oficiales consumible (ver §2), las alertas de esta fase son un cálculo propio sobre el pronóstico real de Open-Meteo, con umbrales explícitos y documentados en `service.js`:

| Alerta | Umbral | Campo usado |
|---|---|---|
| Riesgo de helada | temperatura mínima prevista ≤ 0 °C | `daily.temperature_2m_min` |
| Lluvia abundante prevista | precipitación acumulada prevista ≥ 20 mm/día | `daily.precipitation_sum` |

Y, en "Qué está pasando hoy" (lectura del presente, no alerta a futuro): ambiente húmedo (humedad ≥ 80%), lluvia reciente (precipitación actual > 0), viento fuerte (≥ 40 km/h), temperatura elevada (≥ 32 °C) o baja (≤ 5 °C) — siempre sobre `current`, siempre con lenguaje prudente ("puede favorecer...", "conviene observar..."), nunca un diagnóstico ("tu planta tiene..."). Cada bloque de alertas incluye un enlace al SMN para alertas oficiales reales, dejando explícito que el cálculo propio no las reemplaza.

No se implementó ninguna notificación push, email, Telegram ni WhatsApp — las alertas solo se ven dentro de Mi Cultivo, tal como pedía esta fase.

## 8. Datos históricos

No se investigó ni se implementó una capa de datos históricos en esta fase. Construir infraestructura de series históricas hubiera sido una complejidad desproporcionada para lo pedido (mostrar contexto actual + pronóstico corto) — se documenta como extensión futura (ver §12), no como pendiente olvidado.

## 9. Fallback y estados

- **Sin ubicación elegida**: "Elegí una provincia para ver el contexto ambiental de tu zona." — no se muestra ninguna sección de clima.
- **Cargando**: "Cargando datos ambientales…"
- **Proveedor no responde / respuesta inválida / error de red**: "Datos ambientales no disponibles en este momento." — verificado interceptando la respuesta de `/api/climate` para forzar un error 500: la UI cae correctamente a este mensaje, sin mostrar ceros ni datos previos como si fueran actuales.
- **Campo puntual ausente en la respuesta real** (p. ej. si el proveedor no trajera viento para un punto dado): ese campo específico simplemente no se renderiza — nunca se rellena con un valor por defecto.

## 10. Sin cuenta

Mi Cultivo sigue funcionando igual sin cuenta. La provincia elegida se guarda en el mismo objeto local que ya persiste `localStorage` (`storage.js`, sin cambios de código — es agnóstico a la forma del objeto). Nunca se exige crear una cuenta para ver el contexto ambiental, y la provincia local nunca se sube a la cuenta salvo como parte del flujo de migración ya existente, con el mismo consentimiento explícito con el que ya se migran los eventos (ver §11).

## 11. Con cuenta y seguridad

- Columna nueva `public.cultivos.province_id` (`text`, nullable) — agregada con `alter table` simple. **No hizo falta ninguna política RLS nueva**: las políticas existentes de la tabla (`auth.uid() = user_id`) son por fila, así que ya cubren la columna nueva — confirmado con `get_advisors` (0 alertas) inmediatamente después de la migración.
- Nueva función `setProvinceRemote(supabase, cultivoId, provinceId)` en `remoteStorage.js`, simétrica a `setCurrentStageRemote` ya existente.
- **Aislamiento entre usuarios, verificado en vivo contra Postgres real** (dos cuentas reales creadas por el flujo genuino de la app, nunca filas fabricadas): actuando explícitamente como el usuario B (`set local request.jwt.claims`), tanto el `update` como el `select` sobre el cultivo del usuario A devolvieron 0 filas — RLS bloquea tanto la modificación como la lectura. Actuando como el dueño real (usuario A), el mismo `update` sí tuvo efecto. Cuentas y datos de prueba borrados al terminar (`0` restantes, confirmado por conteo).
- Se encontró y corrigió una **condición de carrera real** (misma clase de bug que el de la Fase 10C con fotos): si la persona elegía una provincia en la ventana en la que la sesión ya está activa pero el cultivo remoto todavía no terminó de cargarse/migrarse, la escritura se hacía contra un `cultivoId` que todavía era el local (no un UUID de la cuenta) y la selección se perdía en silencio en cuanto terminaba de cargar. **Corrección**: el selector de provincia queda deshabilitado ("Cargando tu cultivo…") hasta que `migrationChecked && !pendingMigration`, igual que ya se hacía para el efecto de carga de fotos.
- Sin secretos nuevos: no se usó `service_role` ni ninguna clave nueva en código de cliente; no se creó ninguna Edge Function.

## 12. Tests realizados

| # | Caso | Resultado |
|---|---|---|
| A | Sin cuenta, sin ubicación elegida | Mensaje "Elegí una provincia…", sin llamada a `/api/climate`. |
| B | Sin cuenta, ubicación válida (Buenos Aires) | Datos reales mostrados (temperatura, humedad, lluvia, viento, pronóstico). |
| C | Cambiar de ubicación (Mendoza) refresca los datos | Confirmado — mostró además una alerta de helada real para esa fecha/ubicación (mínima prevista de 0 °C). |
| D | Reload persiste la ubicación elegida (sin cuenta → `localStorage`) | Confirmado — misma provincia y mismos datos tras recargar. |
| E | Proveedor no responde (simulado forzando un 500 en `/api/climate`) | Cae a "Datos ambientales no disponibles en este momento", sin ceros falsos. |
| F | Con cuenta: elegir provincia persiste en Supabase (`province_id`) | Confirmado por SQL directo tras la interacción real en el navegador. |
| G | Con cuenta: condición de carrera al elegir provincia antes de que cargue el cultivo remoto | Bug real encontrado y corregido (ver §11) — selector deshabilitado hasta que el cultivo remoto está listo. |
| H | Aislamiento entre cuentas (usuario B no puede leer/modificar el `province_id` de A) | Confirmado contra Postgres real con `set local request.jwt.claims` — 0 filas visibles/afectadas como atacante, 1 fila afectada como dueño real. |
| I | Etapa actual se refleja en el texto de contexto | Confirmado ("Tu cultivo está registrado en X, actualmente en la etapa Semilla"). |
| J | Alerta se muestra solo cuando el pronóstico real la dispara | Confirmado — Buenos Aires (sin helada prevista) no mostró alertas; Mendoza (con mínima de 0 °C) sí. |
| K | Sin exposición de secretos | El único pedido de red visible es `GET /api/climate?lat=...&lon=...&region=...` — sin ninguna clave, sin ninguna coordenada de usuario, solo la coordenada representativa de la provincia. |
| — | Responsive 1440×900 y 390×844 | Sin overflow horizontal, sin errores de consola, en Home/Atlas/Créditos/Mi Cultivo. |
| — | Regresión | `/`, `/atlas`, `/creditos`, `/api/geo`, `/api/climate` responden 200; `npm run build` limpio (mismas 9 rutas). |

## 13. Archivos principales

**Nuevos**:
- `src/app/lib/weather/locations.js` — coordenadas representativas por provincia (georef-ar-api).
- `src/app/lib/weather/service.js` — `fetchProvinceWeather`, lecturas de "qué está pasando hoy" y alertas por umbral.
- Migración Supabase `add_province_id_to_cultivos` — columna `province_id` en `cultivos` (sin políticas nuevas).

**Modificados**:
- `src/app/mi-cultivo/page.js` — selector de provincia, sección "Contexto ambiental", corrección de la condición de carrera de §11.
- `src/app/lib/miCultivo/model.js` — `createCultivo()` incluye `provinceId: null` por defecto.
- `src/app/lib/miCultivo/remoteStorage.js` — mapea `province_id` y agrega `setProvinceRemote`.
- `src/app/globals.css` — estilos de la nueva sección.

## 14. Limitaciones conocidas (documentadas, no pendientes de "arreglar")

- Las alertas son un cálculo propio por umbral, no un aviso oficial — se deja explícito en la UI junto con el enlace al SMN.
- No hay datos históricos ni gráficos de tendencia — fuera de alcance de esta fase (ver §8).
- El SMN no pudo verificarse como fuente de datos en vivo (HTTP 402 persistente) — queda solo como referencia de autoridad enlazada, no como dependencia técnica.
- Si el usuario cambia de provincia con mucha frecuencia, cada cambio dispara una consulta nueva (no hay debounce) — dado el volumen esperado de uso de esta sección, no se consideró necesario agregarlo.

## 15. Extensiones futuras (no implementadas en esta fase)

- Notificaciones (push/email/Telegram/WhatsApp) sobre alertas — explícitamente fuera de alcance de esta fase.
- Datos históricos/series de tiempo, si en el futuro se justifica la complejidad.
- Reintentar el acceso a INTA RIAN/SMN si en algún momento se vuelven accesibles desde el entorno de ejecución, para reemplazar o complementar el cálculo de alertas por umbral con una fuente oficial real.

**FASE 11 TERMINADA. No se implementó chatbot, notificaciones push, Telegram, WhatsApp, newsletter, CMS, marketplace, pagos, funciones de consumo, recomendaciones médicas, nuevas funciones de fotos, rediseño del Atlas, rediseño de la Home ni cambios en Auth. No se creó ninguna Edge Function.**
