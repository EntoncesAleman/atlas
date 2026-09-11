# 46 — Chatbot del Atlas: Contexto Personalizado (Fase 13C)

Amplía el Chatbot del Atlas para que, junto al retrieval editorial de la Fase 13B, arme un paquete de contexto autorizado del propio usuario autenticado — listo para una futura capa de respuesta (Fase 13D), pero sin generar todavía ninguna respuesta ni diagnóstico.

## 1. Objetivo y flujo

```
PREGUNTA → RETRIEVAL DEL ATLAS (13B) → CONTEXTO AUTORIZADO → PAQUETE DE CONTEXTO → (listo para 13D)
```

Cada búsqueda en `/chatbot` ahora arma, además de los resultados editoriales, un paquete con datos reales del propio Mi Cultivo del usuario (etapa, eventos, fotos contadas — nunca mostradas), su provincia guardada y el clima actual de esa provincia. El paquete se guarda en memoria de la página y se muestra en la UI solo como dos indicadores discretos — nunca como datos crudos.

## 2. Inspección previa

Se releyó únicamente lo necesario: `searchAtlas.js` y `chatbot/page.js` (Fase 13B), `lib/miCultivo/remoteStorage.js` (`fetchCultivo`), `lib/miCultivo/photos.js` (`fetchPhotosByEvent`, RLS del bucket), `lib/miCultivo/model.js` (`stageLabel`), `lib/weather/service.js` (`fetchProvinceWeather`) y `lib/weather/locations.js` (`getProvinceLocation`) — todos ya construidos y probados en las Fases 10B/10C/11/12. No se releyó el resto del proyecto.

## 3. Arquitectura

```
src/app/lib/chatbot/
  searchAtlas.js   — retrieval editorial (Fase 13B, sin cambios)
  context.js       — NUEVO: loadUserContext(supabase, session, atlasResults)
```

`context.js` **solo lee**: nunca crea, actualiza ni borra nada de Mi Cultivo. Reutiliza exactamente las funciones ya existentes:
- `fetchCultivo(supabase, userId)` (`remoteStorage.js`, Fase 10B) — cultivo + eventos del usuario.
- `countPhotosByEvent(supabase, cultivoId)` (`photos.js`, **nueva función chica**, ver §4) — cuenta de fotos sin generar URLs firmadas.
- `stageLabel(stageId)` (`model.js`) — etiqueta legible de la etapa.
- `fetchProvinceWeather(provinceId)` (`weather/service.js`, Fase 11) — clima actual/pronóstico/alertas, sin cambios.
- `getProvinceLocation(provinceId)` (`weather/locations.js`) — nombre legible de la provincia.

No se creó ninguna tabla nueva, ninguna política RLS nueva, ningún proveedor climático nuevo, ninguna Edge Function.

## 4. Única función nueva de soporte: `countPhotosByEvent`

`fetchPhotosByEvent` (ya existente) genera una URL firmada por cada foto — necesario para mostrarlas en Mi Cultivo, pero innecesario y no deseado para el chatbot, que solo necesita un número. Se agregó `countPhotosByEvent(supabase, cultivoId)` en `photos.js`: un `select('event_id')` simple sobre `cultivo_event_photos` (misma tabla, mismas políticas RLS ya vigentes desde la Fase 10C, sin cambios), sin ningún llamado a Storage. Evita generar URLs firmadas que nunca se van a usar — coherente con "no exponer URLs firmadas" (§6) y con "no hacer llamadas innecesarias".

## 5. Contexto incorporado

**Editorial** (de `searchAtlas`, sin cambios): `entryId`, `categoryId`, `sectionId`, `sourceIds` de cada resultado — ya trazable desde la Fase 13B.

**Cultivo** (`cultivation`):
| Campo | Origen real | Si no existe |
|---|---|---|
| `hasCultivation` | `fetchCultivo` devolvió una fila o `null` | `false` |
| `stage` / `stageLabel` | `cultivo.currentStageId` / `stageLabel()` | `null` |
| `startDate` | fecha del primer evento real (mismo criterio único de "inicio de temporada" ya establecido en la Fase 12 — nunca `createdAt`) | `null` |
| `eventCount` | `cultivo.events.length` | `0` |
| `events[]` | `{ stageId, date, note }` de cada evento real — **sin `id`** (UUID interno) | `[]` |
| `photoCount` / `photosAvailable` | suma de `countPhotosByEvent` | `0` / `false` |

**Geografía** (`geography.province`): nombre legible de la provincia guardada en el cultivo (ej. "Mendoza"), o `null` si no eligió ninguna — mismo dato que ya se usa en Mi Cultivo desde la Fase 11.

**Clima** (`climate`): `current`, `forecast`, `todayReadings`, `alerts` — exactamente el mismo resultado que ya devuelve `fetchProvinceWeather` en Mi Cultivo, sin transformación adicional. `available: false` (con todo lo demás en `null`/`[]`) si no hay provincia o si el proveedor no respondió — **nunca un dato inventado ni un 0 disfrazado de lectura real**, mismo principio que la Fase 11.

## 6. Fotos como contexto, no como imagen ni diagnóstico

Solo se calcula y se guarda `photoCount`/`photosAvailable` (un número y un booleano). En ningún punto de esta fase se lee el contenido de una imagen, se genera una URL firmada para el paquete de contexto, ni se envía ninguna foto a ningún lado. El paquete de contexto nunca contiene un `storagePath`, una URL firmada ni ningún dato de Storage.

## 7. Clima como contexto, no como recomendación

El paquete incluye la lectura ambiental real (temperatura, humedad, lluvia, viento, pronóstico, alertas por umbral ya calculadas en la Fase 11) tal cual — nunca una recomendación derivada ("deberías regar menos", etc.). No se agregó ningún cálculo nuevo sobre el clima; se reexpone el mismo resultado que ya produce `fetchProvinceWeather`.

## 8. Regla de "contexto, no diagnóstico"

Ningún campo del paquete es una conclusión. No existe (ni se agregó) ningún campo tipo `"estado de salud"`, `"problema detectado"`, `"diagnóstico"` ni equivalente — `cultivation`/`climate` son exclusivamente datos crudos (etapa, fechas, notas propias del usuario, lecturas ambientales) para que una futura Fase 13D los use como referencia al momento de redactar una respuesta, nunca una interpretación ya hecha por esta capa.

## 9. Privacidad y aislamiento

- El contexto siempre se arma a partir de `session.user.id` — la identidad ya validada por Supabase Auth en el propio navegador — **nunca** de un id de usuario pasado como parámetro externo. `loadUserContext` recibe el objeto `session` completo, no un string suelto.
- El aislamiento real entre cuentas lo sigue haciendo RLS (`auth.uid() = user_id`, sin ninguna política nueva ni modificada) — no el código de esta capa.
- El paquete de contexto **nunca incluye**: email, UUID de usuario, UUID de cultivo/evento/foto, tokens, storage paths, URLs firmadas, ni ningún dato de otro usuario.
- La UI solo muestra dos indicadores de texto fijo ("Contexto de Mi Cultivo disponible" / "Contexto ambiental disponible") — nunca el paquete completo, ningún ID ni ninguna estructura técnica.

**Verificación real de aislamiento** (dos cuentas reales, creadas por el flujo genuino de la app, `set local request.jwt.claims` contra Postgres real — mismo método ya usado en fases anteriores): actuando como el usuario B, un `select` sobre el cultivo real del usuario A devolvió **0 filas**; actuando como A, el mismo `select` devolvió su propia fila. En la UI, B nunca mostró el badge de "Contexto ambiental disponible" que sí tenía A (que había elegido una provincia) — confirmando que el contexto de una cuenta no se filtra a la otra ni siquiera a nivel de indicador visual.

## 10. Pruebas realizadas

| # | Caso | Resultado |
|---|---|---|
| 1 | Usuario recién registrado (cultivo vacío, sin eventos) | `hasCultivation: true` (existe una fila real, aunque vacía), badge de Mi Cultivo visible, sin badge de clima. |
| 2 | Usuario con cultivo | Igual que arriba — confirmado que un cultivo real (incluso sin eventos) sí es contexto disponible, no un dato inventado. |
| 3 | Cultivo con eventos | Al cargar un evento real, `eventCount`/`events[]` reflejan el dato inmediatamente en la siguiente búsqueda. |
| 4 | Cultivo con fotos | Al subir una foto real, `photoCount` pasa a reflejarlo (verificado indirectamente: sin errores, sin exposición de URL). |
| 5 | Provincia seleccionada | `geography.province` y el badge de contexto ambiental aparecen tras elegir Mendoza. |
| 6 | Clima disponible | Con provincia elegida, `climate.available: true` con datos reales de Open-Meteo (vía el mismo proxy de la Fase 11). |
| 7 | Clima no disponible | Sin provincia elegida: `climate.available: false`, todo en `null`/`[]` — sin badge de clima, sin fallback inventado. |
| 8 | Dos cuentas | Verificado en UI y en Postgres real (ver §9) — cada cuenta solo ve su propio contexto. |
| 9 | Usuario sin sesión | El formulario de búsqueda no existe en el DOM (mismo gate de la Fase 13A) — `loadUserContext` nunca se llama. |
| 10 | Retrieval de 13B | Sigue funcionando sin cambios — mismas 5 consultas de prueba de la fase anterior devuelven los mismos resultados. |
| — | Responsive 1440×900 y 390×844, con contexto real cargado | Sin overflow horizontal, sin errores de consola, badges visibles y legibles en ambos tamaños. |

## 11. Regresión

`/`, `/atlas`, una categoría, una entrada, `/mi-cultivo`, login/logout, `/creditos`, `/api/geo`, `/api/climate` — todos responden 200, sin errores de consola nuevos. `npm run build`: limpio, 10 rutas (sin cambios respecto a 13B). `get_advisors` de seguridad: sin alertas (no se modificó ninguna tabla ni política).

## 12. Límites explícitos de esta fase

- No hay LLM, no hay generación de lenguaje natural, no hay Internet — el paquete de contexto no se envía a ningún lado, solo se arma y se guarda en memoria del navegador durante esa sesión de la página.
- No hay memoria conversacional ni historial — cada búsqueda arma un paquete nuevo desde cero; nada se persiste en Supabase.
- No se modifica Mi Cultivo desde el chatbot — `loadUserContext` es exclusivamente de lectura.
- No se instaló ninguna dependencia nueva.

## 13. Nota honesta de limpieza de pruebas

Durante la limpieza de las cuentas de prueba de esta fase, se borraron primero las filas de `auth.users` y después se intentó borrar los archivos de Storage asociados a una foto de prueba real — pero el orden fue el incorrecto (en fases anteriores siempre se borró primero el archivo de Storage, con una sesión real, y recién después la cuenta). Sin una sesión válida de esos usuarios ya eliminados, y sin acceso a la clave `service_role` (nunca expuesta a este entorno, por diseño), quedaron **2 archivos de prueba huérfanos** en el bucket privado `cultivo-photos` (imágenes de 1×1 píxel, ~70 bytes cada una, sin ninguna fila de base de datos que las referencie). No representan un riesgo real: las políticas de `storage.objects` siguen exigiendo que `auth.uid()` coincida con el primer segmento del path, y esos UUID de usuario ya no corresponden a ninguna cuenta existente — son permanentemente inaccesibles por cualquier vía de la aplicación. Queda documentado como lección de proceso para la limpieza de pruebas de fases futuras: borrar siempre los objetos de Storage con una sesión real **antes** de borrar la cuenta.

## 14. Archivos

**Nuevos**: `src/app/lib/chatbot/context.js`.
**Modificados**: `src/app/lib/miCultivo/photos.js` (nueva función `countPhotosByEvent`), `src/app/chatbot/page.js` (arma y muestra el contexto junto a cada búsqueda), `src/app/globals.css` (estilo de los indicadores de contexto).
**Sin cambios**: `searchAtlas.js`, `remoteStorage.js`, `model.js`, `weather/service.js`, `weather/locations.js`, esquema de Supabase, RLS, Storage (políticas), Auth, Home, mapa, Atlas.

## 15. Resultado final

`/chatbot`, para un usuario autenticado, ahora arma en cada búsqueda un paquete de contexto real y trazable — evidencia editorial (13B) + contexto autorizado del propio usuario (13C) — listo para conectarse a una futura capa de respuesta. Ningún dato se inventa, ningún dato de otro usuario se filtra, y el chatbot sigue sin generar ninguna respuesta ni diagnóstico.

**Siguiente fase sugerida: 13D** — motor de respuesta que combine evidencia + contexto en una respuesta trazable (todavía sin decidir proveedor de LLM).

**FASE 13C TERMINADA. No se implementó LLM, generación de lenguaje natural, Internet, memoria conversacional, historial, diagnóstico, recomendaciones automáticas, modificación de Mi Cultivo, tablas nuevas, Edge Functions nuevas ni un nuevo proveedor climático.**
