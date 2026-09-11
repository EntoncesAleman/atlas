# 43 — Mi Temporada: Historial Temporal de Mi Cultivo (Fase 12)

Convierte "Mi Cultivo" en una línea temporal real de la temporada del usuario, uniendo lo que ya existía (cultivo, 7 etapas, eventos, fechas, fotos, persistencia local, cuenta, RLS, provincia aproximada, clima) sin crear una segunda fuente de verdad ni infraestructura nueva.

## 1. Objetivo

Que la persona pueda entender, de un vistazo: cuándo empezó su temporada, cuánto tiempo pasó, en qué etapa está, qué eventos y fotos registró, qué contexto ambiental hay disponible hoy, y cuál es la próxima etapa — como un historial personal, no como un calendario agronómico prescriptivo.

## 2. UX — jerarquía de la página

Todo dentro de la misma página `/mi-cultivo` (no se creó una ruta nueva `/mi-cultivo/{temporada}`, ver §11), reordenada así:

```
MI CULTIVO
  Modo (sin cuenta / con cuenta) — sin cambios de fases anteriores
  [ Estado actual ]         — etapa actual + selector de etapa (sin cambios de lógica)
  [ Mi temporada ]          — NUEVO: resumen (inicio, tiempo transcurrido, etapa, eventos, fotos)
  [ Hoy ]                   — Contexto ambiental de la Fase 11, reetiquetado como "Hoy"
  [ Registrar un evento ]   — formulario existente, sin cambios
  [ Línea temporal ]        — antes "Eventos registrados": ahora con orden reciente/cronológico y eliminar evento
  [ Próxima etapa ]         — NUEVO: navegación/estado, sin fechas
```

Reutiliza el sistema visual existente (`.atlas-section`, `.atlas-entry-section`, tarjetas de estadística ya usadas en Contexto ambiental) — no se introdujo un layout nuevo ni un "dashboard" separado.

## 3. Modelo temporal — un solo concepto de "inicio"

**Inicio de temporada = fecha del primer evento real** (la más antigua entre `events[].date`, comparación lexicográfica sobre `YYYY-MM-DD`, sin margen de error).

Se decidió explícitamente **no** usar `cultivo.createdAt` (ni la columna `cultivos.created_at`) como fecha de inicio: ese campo es cuándo se creó el *registro* en la app (o la fila en Supabase), no necesariamente cuándo la persona empezó a cultivar de verdad — alguien puede abrir Mi Cultivo días después de haber plantado, o cargar eventos pasados más tarde. Usar dos campos distintos ("cuándo se creó el registro" vs. "cuándo empezó la temporada") hubiera violado la instrucción explícita de esta fase de no crear dos conceptos de inicio. El primer evento real, en cambio, es siempre un dato que la persona ingresó a propósito con una fecha real.

**Sin eventos, no hay fecha de inicio** — se muestra el estado vacío ("Todavía no registraste tu primer evento. Tu temporada va a empezar en cuanto cargues el primero."), nunca una fecha inventada (ni "hoy", ni la fecha de creación del registro).

No se agregó ninguna columna nueva a Supabase para esto — se calcula en el cliente a partir de `events`, que ya se cargan enteros en cada sesión.

## 4. "Mi temporada" (resumen)

Tarjetas con: **Inicio** (fecha del primer evento), **Tiempo transcurrido** ("Hace N días", calculado como días reales entre esa fecha y hoy — cálculo de calendario, no un dato climático ni agronómico), **Etapa actual** (la misma que ya mostraba "Estado actual"), **Eventos** (cantidad real de `events.length`) y, solo en modo con cuenta, **Fotos** (cantidad real de fotos sumando todos los eventos). En modo sin cuenta no se muestra el conteo de fotos porque ese modo nunca tuvo fotos reales (Fase 10C) — mostrar "0" ahí sería ambiguo entre "sin fotos" y "esta función no existe acá".

## 5. Línea temporal

La sección que antes se llamaba "Eventos registrados" ahora es "Línea temporal", con un selector de orden:
- **Más reciente primero** (default) — igual que antes.
- **Cronológico (temporada completa)** — del primer evento al último, para leer la temporada de punta a punta.

Ambos son la misma lista `events`, solo reordenada en el cliente (`Array.sort` sobre `event.date`) — no hay una segunda consulta ni una copia de los datos, así que no hay riesgo de duplicar ni perder eventos. Cada tarjeta de evento sigue mostrando fecha, etapa, nota y (en modo con cuenta) sus fotos exactamente como en la Fase 10C — no se tocó el componente de fotos, solo se lo dejó dentro de la lista reordenable.

**Editar** sigue funcionando sin cambios. **Eliminar evento individual es nuevo en esta fase** — antes solo existía "Reiniciar Mi Cultivo" (borra todo). Ver §6.

## 6. Eliminar un evento individual (nuevo)

No existía antes de esta fase — se agregó porque los tests pedidos explícitamente la requieren y porque una línea temporal real necesita poder corregir un evento cargado por error, no solo editarlo.

- **Confirmación de dos toques**, mismo patrón ya usado en "Reiniciar Mi Cultivo": el primer clic muestra "¿Confirmar? Tocá de nuevo", el segundo ejecuta el borrado.
- **Sin cuenta**: solo filtra el evento del array en memoria — se persiste solo vía el efecto de `localStorage` ya existente, sin código nuevo de persistencia.
- **Con cuenta**: nueva función `deleteEventRemote(supabase, eventId)` en `remoteStorage.js` (`delete from cultivo_events where id = eventId`), protegida por la misma política RLS que ya existía para `update`/`select` (`auth.uid() = user_id`) — **no se creó ninguna política nueva**, confirmado con `get_advisors` (0 alertas) antes y después.
- **Fotos del evento eliminado**: antes de borrar el evento, se borra cada una de sus fotos con la función `deleteEventPhoto` ya existente de la Fase 10C (que borra el archivo real de Storage, no solo la fila) — evita depender únicamente del `ON DELETE CASCADE` de `cultivo_event_photos.event_id`, que sí limpia las filas de la base automáticamente pero **nunca** los archivos del bucket (Storage no está vinculado por foreign key). Verificado en vivo: tras borrar un evento con una foto real, quedaron **0 objetos** en el bucket asociados a esa cuenta.

## 7. Contexto ambiental → "Hoy"

No se duplicó el panel de clima de la Fase 11: se reetiquetó su encabezado a **"Hoy"** (con "Contexto ambiental" como subtítulo) y se lo dejó en el mismo lugar de la jerarquía. Sigue mostrando exactamente lo mismo que ya mostraba: la oración de contexto ya mencionaba la etapa actual ("Tu cultivo está registrado en X, actualmente en la etapa Y"), más temperatura/humedad/lluvia/viento actuales, pronóstico corto y alertas por umbral — es decir, ya cumplía los cuatro puntos que pedía esta fase para la zona "Hoy" (etapa actual, contexto ambiental, pronóstico, alertas) sin necesitar ningún cambio de lógica ni de fuente de datos.

**No se implementó clima histórico.** Ningún evento tiene un dato ambiental real guardado en el momento en que ocurrió (esa captura nunca se implementó en ninguna fase anterior), así que no hay nada real que mostrar retroactivamente por evento — y por diseño explícito de esta fase, no se le atribuye el clima *actual* a eventos pasados. La única sección de clima de Mi Cultivo sigue siendo "Hoy" (contexto ambiental del momento en que se mira la página), tal como pedía la consigna.

## 8. Próxima etapa

Bloque nuevo y simple: `STAGES[currentIndex + 1]` si existe ("Próxima etapa: Floración. Vos decidís cuándo marcarla como etapa actual, arriba en 'Estado actual' — no hay fechas automáticas ni calendario fijo.") o, en la última etapa, un mensaje de cierre del recorrido. Es puramente informativo/de navegación — no calcula ni sugiere ninguna fecha, no genera ninguna recomendación agronómica, no depende del clima.

## 9. Calendario

No se implementó un calendario mensual. Con el volumen de datos real disponible (eventos puntuales, no series densas) la línea temporal (con su modo cronológico) ya representa la temporada completa sin la complejidad de una vista de calendario — se prefirió timeline, tal como permitía explícitamente la consigna ("si un calendario mensual completo no aporta valor suficiente, preferir timeline"). No se agregó ninguna dependencia de calendario.

## 10. Persistencia — ninguna fuente nueva

"Mi temporada" es enteramente una vista derivada de datos que ya existían: `cultivo` (etapa actual, provincia), `events` (fecha, etapa, nota), `photosByEvent` (Fase 10C) y el resultado de `fetchProvinceWeather` (Fase 11). No se agregó ninguna tabla, columna ni bucket nuevo — el inicio de temporada y el tiempo transcurrido se calculan en el cliente a partir de `events`, no se guardan. La única escritura nueva contra Supabase es el `delete` de `deleteEventRemote` (§6), sobre una tabla y una política ya existentes.

## 11. Sin cuenta / con cuenta

- **Sin cuenta**: todo funciona igual que antes — Mi Temporada, línea temporal (con su orden), eliminar evento, editar evento, todo opera sobre el mismo objeto en `localStorage`, sin exigir cuenta en ningún punto. No se alteró la migración local → cuenta de la Fase 10B.
- **Con cuenta**: Mi Temporada y la línea temporal leen exactamente los mismos `events`/`photosByEvent` que ya se cargaban — no hay una segunda consulta paralela. Aislamiento entre usuarios reverificado en vivo (ver §13): un usuario no puede ver ni borrar los eventos de otro.
- No se creó la ruta `/mi-cultivo/{temporada}` que menciona el sitemap conceptual de `02_UX.md` — esa era una idea de arquitectura previa al código real; como Mi Cultivo ya funciona como una sola página unificada desde la Fase 9 (sin cuenta incluido, algo que el sitemap original no contemplaba porque asumía que Mi Cultivo requería cuenta desde el principio), separar "Mi Temporada" en una ruta aparte hubiera roto ese patrón ya establecido sin necesidad real. Se implementó como sección dentro de la misma página, coherente con cómo se construyó todo lo demás desde la Fase 9.

## 12. Seguridad y privacidad

- No se tocó Auth, ni el storage de fotos, ni ninguna política existente salvo la reutilización (sin cambios) de la política de `delete` ya vigente en `cultivo_events`.
- No se creó ninguna Edge Function.
- No se expone ningún dato privado fuera de la cuenta/cultivo correspondiente: la UI nunca muestra IDs internos, UUIDs ni paths de Storage — igual que en fases anteriores.
- `get_advisors` (seguridad): 0 alertas, verificado después de implementar `deleteEventRemote` y después de la limpieza final de datos de prueba.

## 13. Pruebas realizadas

**Sin cuenta**: crear 3 eventos con fechas fuera de orden de carga → "Mi temporada" muestra el inicio correcto (la fecha más antigua, no la primera cargada) y "Hace N días" correcto; línea temporal en ambos órdenes (reciente/cronológico) verificada explícitamente por fecha; reload → los 3 eventos y el resumen persisten igual; eliminar un evento (doble confirmación) → cuenta baja a 2 y el resumen se recalcula. Además, con 8 eventos cargados (fechas de casi 2 meses), el resumen y el render de la línea temporal se mantuvieron correctos y sin errores — cubre "cultivo con muchos eventos".

**Con cuenta**: registro real de dos cuentas (usuario A y B, creadas por el flujo genuino de la app) → A carga 2 eventos y sube una foto real a uno de ellos → "Mi temporada" muestra inicio/tiempo transcurrido/etapa/eventos/fotos correctos, con la miniatura visible en la línea temporal → reload → todo persiste igual (incluida la foto) → se elimina el evento que tenía la foto (doble confirmación) → queda 1 evento, contador de fotos baja a 0, y se confirmó por SQL directo que **0 objetos** de Storage quedaron huérfanos. Usuario B, con su propia cuenta nueva, ve "Mi temporada" completamente vacía — cero eventos de A visibles.

**Aislamiento entre cuentas (RLS de `deleteEventRemote`)**, verificado contra Postgres real con `set local request.jwt.claims` (control positivo y negativo, no solo lectura de política): actuando como el usuario B, un `delete` sobre un evento de A afectó **0 filas** (confirmado consultando el estado dentro de la misma transacción, sin depender solo del `rollback`); actuando como el dueño real (A), el mismo `delete` sí afectó la fila. Ambas pruebas en la misma sesión, sobre el mismo evento real.

**Editar evento**: sigue funcionando — se editó la nota de un evento existente y el cambio se reflejó correctamente en la línea temporal.

**Cambio de etapa**: se probó tocar una etapa distinta en "Estado actual" — sigue actualizando la etapa actual y, en consecuencia, "Mi temporada" y "Próxima etapa" se recalculan solos (son valores derivados, no un estado propio que pueda desincronizarse).

**Regresión**: Home, Atlas, Créditos y Mi Cultivo en 1440×900 y 390×844 sin overflow y sin errores de consola; `/api/geo` y `/api/climate` responden 200; `npm run build` limpio (mismas 9 rutas).

Al terminar, se borraron las cuentas de prueba, sus eventos y sus fotos (confirmado: 0 usuarios, 0 objetos de Storage restantes).

## 14. Archivos principales

**Modificados**:
- `src/app/lib/miCultivo/remoteStorage.js` — nueva función `deleteEventRemote`.
- `src/app/mi-cultivo/page.js` — helpers de fecha/temporada (`getSeasonStartDate`, `daysSince`, `formatElapsed`), estado y handler de eliminar evento, estado y lógica de orden de la línea temporal, secciones nuevas "Mi temporada" y "Próxima etapa", reetiquetado de "Contexto ambiental" a "Hoy", renombre de "Eventos registrados" a "Línea temporal".
- `src/app/globals.css` — estilos de las tarjetas de resumen de temporada, el selector de orden y los botones de acción del evento (editar/eliminar).

**Sin cambios**: esquema de Supabase (ninguna migración nueva), políticas RLS (ninguna nueva ni modificada), Storage/bucket de fotos, Auth, mapa, Atlas, Home, modelo editorial.

## 15. Limitaciones conocidas

- No hay clima histórico por evento — cada evento pasado no tiene (ni tuvo nunca) un dato ambiental capturado en el momento en que ocurrió; "Hoy" siempre refleja el presente, nunca el pasado de un evento puntual.
- No hay vista de calendario mensual — se prefirió la línea temporal (con su modo cronológico) por ser suficiente para el volumen de datos real y evitar una dependencia/complejidad nueva.
- "Tiempo transcurrido" es un cálculo de calendario simple (días reales entre el primer evento y hoy) — no distingue fines de semana, no tiene en cuenta si la temporada se "pausó", y no es un dato agronómico.

## 16. Extensiones futuras (no implementadas en esta fase)

- Capturar el contexto ambiental real en el momento de cada evento (para permitir clima histórico real por evento, no retroactivo) — requeriría decidir explícitamente guardar una instantánea de clima por evento, evaluado como fuera de alcance de esta fase.
- Vista de calendario mensual, si en algún momento el volumen de eventos por temporada lo justifica.
- Exportar la temporada completa (ya previsto conceptualmente en `10_PRIVACY.md` como derecho de portabilidad) — no implementado en esta fase.

**FASE 12 TERMINADA. No se implementó chatbot, IA conversacional, notificaciones, histórico meteorológico, calendario agronómico prescriptivo, CMS, newsletter, marketplace, pagos, consumo, recomendaciones médicas ni nuevas funciones de fotos más allá de la integración de eliminación descripta en §6. No se tocó Home, mapa, Atlas, Auth, Storage ni el modelo editorial salvo la reutilización sin cambios ya descripta.**
