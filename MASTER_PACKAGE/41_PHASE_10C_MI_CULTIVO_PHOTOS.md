# 41 — Mi Cultivo: Fotos Reales con Supabase Storage (Fase 10C)

Agrega fotografías reales a los eventos de "Mi Cultivo" en modo con cuenta, usando un bucket privado de Supabase Storage. El modo sin cuenta no cambia.

## 1. Qué se implementó

- Subida, visualización (miniatura + ampliada) y eliminación de fotos por evento, solo en modo con cuenta.
- Bucket privado nuevo (`cultivo-photos`) — nunca público.
- Tabla nueva `cultivo_event_photos`, con Row Level Security.
- Procesamiento en el navegador antes de subir: valida que sea una imagen real, la redimensiona a un máximo razonable y la reexporta — lo que de paso elimina cualquier metadato EXIF (incluido GPS), cumpliendo el requisito ya documentado en `10_PRIVACY.md`/`09_SECURITY.md`.
- El modo sin cuenta sigue exactamente igual que en la Fase 10A/10B: el espacio de foto por evento sigue siendo un placeholder fijo, sin capacidad real de carga.

## 2. Modelo de datos

```sql
cultivo_event_photos (
  id uuid primary key,
  user_id uuid → auth.users,
  cultivo_id uuid → cultivos,
  event_id uuid → cultivo_events,
  storage_path text unique,
  created_at timestamptz
)
```

Sigue el patrón "USUARIO → CULTIVO → EVENTO → FOTO/S" pedido: cada fila queda inequívocamente asociada a su usuario, su cultivo y su evento (con `user_id` repetido igual que en `cultivo_events`, a propósito, para que las políticas RLS sean directas sin necesitar un `EXISTS` contra otra tabla). No se agregó ningún campo fuera de lo pedido — no hay tamaño de archivo, ni ancho/alto, ni nombre original del archivo (evita guardar metadata innecesaria del dispositivo de origen).

## 3. Bucket y estructura de paths

- Bucket: **`cultivo-photos`**, creado como **privado** (`public: false`) — no existe ninguna URL pública permanente para estas fotos.
- Path de cada archivo: `{user_id}/{cultivo_id}/{event_id}/{uuid-aleatorio}.jpg` — tal como pedía la consigna. El nombre de archivo es siempre un UUID nuevo generado en el navegador (`crypto.randomUUID()`), nunca el nombre original del archivo subido (evita filtrar nombres de archivo del dispositivo de la persona).
- Todas las fotos se reexportan siempre como JPEG (independientemente del formato original) al pasar por el redimensionado en `<canvas>` — simplifica el manejo de formatos y refuerza que el archivo realmente se reprocesó (no se sube el archivo original tal cual).

## 4. Seguridad — políticas y verificación real

**Tabla `cultivo_event_photos`** (RLS habilitado): políticas de `select`/`insert`/`delete`, todas exigiendo `auth.uid() = user_id`. No hay política de `update` — las fotos no se editan, solo se agregan o se borran, según la consigna ("no implementar edición fotográfica").

**Bucket `cultivo-photos`** (políticas sobre `storage.objects`): `select`/`insert`/`delete` exigen que el primer segmento del path (`storage.foldername(name)[1]`, el `user_id`) coincida con `auth.uid()`. Esto es lo que efectivamente controla quién puede subir, listar o generar una URL firmada para un archivo — no el código de la aplicación.

**Verificación real de aislamiento** (no solo lectura de política, sino ejecución real contra la base, con dos cuentas reales distintas — no simuladas — usando `set local request.jwt.claims` para actuar explícitamente como cada una):
| Operación | Como dueño real | Como otro usuario (cuenta real distinta) |
|---|---|---|
| `select` en `cultivo_event_photos` | 1 fila visible | 0 filas visibles |
| `delete` en `cultivo_event_photos` | — | 0 filas borradas (no tuvo efecto; confirmado reseteando a un contexto sin RLS que la fila seguía existiendo) |
| `insert` en `cultivo_event_photos` reclamando el cultivo de otro | — | **Ver hallazgo de seguridad abajo — inicialmente permitido, corregido antes de cerrar la fase** |
| `select` en `storage.objects` (lo que necesita `createSignedUrl` para funcionar) | — | 0 objetos visibles |

### Hallazgo real durante las pruebas: el `insert` no validaba `cultivo_id`/`event_id`

La política de `insert` original solo exigía `auth.uid() = user_id`. Se probó explícitamente si un usuario autenticado real podía insertar una fila con su **propio** `user_id` (pasando esa parte de la política) pero apuntando, vía `cultivo_id`/`event_id`, al cultivo/evento de **otra cuenta real** — y el insert **se aceptó**. Impacto real: como la política de `select` sigue exigiendo `auth.uid() = user_id`, esa fila fantasma nunca sería visible para la víctima (solo para quien la insertó), así que no había fuga de lectura — pero sí era una brecha de integridad referencial real (permitía "colgar" una fila propia de un `cultivo_id`/`event_id` ajeno sin autorización).

**Corrección aplicada** (migración `tighten_cultivo_event_photos_insert_policy`, antes de cerrar la fase): la política de `insert` ahora exige además que el `cultivo_id` y el `event_id` de la fila realmente pertenezcan al usuario autenticado:
```sql
create policy "cultivo_event_photos_insert_own" on public.cultivo_event_photos
  for insert with check (
    auth.uid() = user_id
    and exists (select 1 from public.cultivos c where c.id = cultivo_id and c.user_id = auth.uid())
    and exists (select 1 from public.cultivo_events e where e.id = event_id and e.user_id = auth.uid())
  );
```
Reverificado con las mismas dos cuentas reales: el mismo intento de ataque ahora es rechazado (`new row violates row-level security policy`), y la subida legítima del dueño real (misma prueba, con sus propios IDs) se sigue aceptando sin cambios — confirmado además con una subida real completa desde el navegador después de aplicar la corrección.

Es decir, al cerrar la fase: un usuario ajeno no puede ver la fila de la foto, no puede generar una URL firmada para el archivo (porque ni siquiera puede ver el objeto de Storage), no puede borrarla, y **ya tampoco** puede insertar una fila que aparente pertenecer al cultivo de otra persona. Ver §9 para el detalle completo de cómo se armaron las dos cuentas de prueba.

**Nota honesta sobre URLs firmadas**: una URL firmada, una vez generada, funciona como un token de acceso por sí sola durante su vigencia (30 minutos) — igual que en cualquier sistema de storage con URLs firmadas (S3, GCS, etc.). Lo que la aplicación garantiza es que **nadie más que el dueño puede generar una** para su archivo; no hay ningún mecanismo (ni debería haberlo) para que la aplicación entregue la URL firmada de un archivo a otro usuario.

**Autorización**: todas las operaciones dependen de `session.user.id` (la sesión real de Supabase en el navegador) — nunca de un `user_id` recibido de un formulario o de un parámetro. `photos.js`/`page.js` pasan el `userId` de `session.user.id` porque las políticas igual lo vuelven a verificar contra `auth.uid()` en el servidor; aunque el cliente mintiera, la base lo rechazaría.

**Sin secretos nuevos**: no se usó la clave `service_role` en ningún momento del código de la aplicación. Se usó una vez, indirectamente, durante las pruebas (ver §9) — nunca en código que corre en el navegador.

## 5. Flujo de subida

`src/app/lib/miCultivo/photoProcessing.js` (nuevo, sin dependencias externas):
1. Rechaza si no hay archivo, si `file.type` no empieza con `image/`, o si pesa más de 20MB.
2. Intenta decodificar el archivo con `createImageBitmap()` — si falla, lo rechaza como "no parece ser una imagen válida" (esto detecta archivos que mienten su `Content-Type`, no solo confía en la extensión/MIME declarado).
3. Redimensiona al lado más largo a un máximo de 1600px (si ya es más chica, no la agranda) y la reexporta como JPEG calidad 0,85 vía `<canvas>` — este paso es, a la vez, la compresión simple permitida por la consigna y el mecanismo real de limpieza de EXIF/GPS, porque un canvas nunca conserva metadatos del archivo original.

`src/app/lib/miCultivo/photos.js` (`uploadEventPhoto`): sube el blob procesado al bucket y, si la subida funciona, inserta la fila en `cultivo_event_photos`. **Si la inserción en la base falla después de una subida exitosa, se intenta borrar el archivo recién subido** para no dejarlo huérfano sin ninguna fila que lo referencie.

En la UI: cada evento (ya guardado) tiene un control "Agregar foto" (un `<input type="file" accept="image/*">` estilizado como botón). Mientras sube, muestra "Subiendo…" y deshabilita el control; si falla, muestra el motivo en español (mensaje de validación tal cual, o uno genérico para errores de red/servidor) sin exponer nunca el error técnico crudo.

## 6. Flujo de eliminación

`deleteEventPhoto` en `photos.js`: primero borra el archivo de Storage, después la fila de la base.
- Si falla el borrado en Storage por un motivo real (permisos, red), se corta ahí — la fila NO se borra, así que no se pierde la única referencia al archivo y la persona puede reintentar.
- Si el archivo ya no existía (por ejemplo, un reintento después de un fallo parcial anterior), Supabase Storage no lanza error por borrar algo que ya no está — el flujo sigue y borra la fila igual, autolimpiando el caso.
- No se agregó papelera ni posibilidad de recuperación, tal como pedía la consigna.

## 7. Comportamiento sin cuenta

Sin cambios respecto de la Fase 9/10A: el espacio de foto de cada evento sigue siendo el mismo bloque estático ("Espacio reservado para foto de esta etapa"), sin ningún control real. **No se implementó ningún almacenamiento local de imágenes** (por ejemplo, IndexedDB) para este modo — hacerlo hubiera significado construir un mecanismo de persistencia binaria completamente nuevo, con su propio límite de cuota y su propia lógica de sincronización eventual al migrar a una cuenta, una complejidad desproporcionada para esta fase y explícitamente desaconsejada por la consigna ("si genera una complejidad desproporcionada, NO inventar una solución nueva"). Queda documentado como limitación conocida, no como un olvido.

## 8. Migración local → cuenta

No hay nada que migrar: el modo sin cuenta nunca tuvo capacidad de fotos (ni antes de esta fase ni después), así que un cultivo local jamás contiene una foto que migrar. El flujo de migración de eventos (Fase 10B) no necesitó ningún cambio de comportamiento — pero sí **expuso el bug del §9.4** (el efecto de fotos disparándose con el `cultivoId` local durante la ventana de migración), así que se volvió a probar explícitamente después de corregirlo: crear un evento local, iniciar sesión, ver el cartel de migración, aceptarlo, y confirmar que el evento persiste tras recargar sin ningún error de UUID — funcionó correctamente.

## 9. Cómo se probó (y una limitación real de la plataforma)

El proyecto de Supabase tiene un límite muy bajo de envío de emails de confirmación en el tier gratuito (igual que en la Fase 10B). Esta fase prohibía explícitamente recrear la Edge Function temporal usada en 10B o crear cualquier Edge Function nueva. Se reportó el bloqueo antes de improvisar; con autorización explícita para conectarse a Supabase y resolverlo, se procedió así:

1. **Dos cuentas reales de prueba**: dos registros reales a través de la propia aplicación (el límite se había liberado en ese momento) — ambos usuarios se crearon por el flujo genuino, no fabricado. La primera cuenta quedó pendiente de confirmar por email; se marcó `email_confirmed_at` directamente en la base para esa cuenta ya creada (equivalente a "hacer clic en el link de confirmación", sobre un usuario real, no una fila inventada). La segunda cuenta, creada más tarde, recibió sesión inmediata al registrarse (sin necesitar el paso anterior). No se creó ninguna Edge Function en ningún momento.
2. **Flujo completo de fotos, con la primera cuenta, en el navegador real**: crear evento → subir foto → recargar página → la foto sigue visible → abrirla ampliada → eliminarla → confirmar que desaparece → repetir con un segundo evento. Los ocho pasos funcionaron correctamente.
3. **Verificación de bytes reales**: se tomó la URL firmada que la propia página generó para una foto subida, se descargó con `curl` (fuera de la UI) y se confirmó que es un JPEG válido (`file` reportó dimensiones y formato correctos) — y se inspeccionó visualmente la imagen descargada, confirmando que es exactamente la fotografía subida, no un archivo corrupto o vacío.
4. **Aislamiento entre usuarios — verificado con dos cuentas reales distintas** (no solo simulado): usando `set local request.jwt.claims` para actuar explícitamente como cada una de las dos cuentas reales creadas en el paso 1, se probó `select`/`delete`/`insert` sobre la tabla de fotos y `select` sobre `storage.objects`. Este método prueba el mecanismo real que decide el acceso (las políticas RLS de Postgres, evaluadas por el motor real) usando identidades de cuentas que de verdad existen — no una segunda pestaña de navegador, pero tampoco una simulación con un UUID inventado. Este proceso encontró una brecha real (ver el hallazgo de seguridad en §4) que se corrigió antes de cerrar la fase, y quedó reverificada con las mismas dos cuentas después del fix.
5. Se encontró y corrigió, durante esta misma ronda de pruebas, un segundo bug real (no de seguridad, de datos): el efecto que carga las fotos podía dispararse con el `cultivoId` **local** (formato de texto, no UUID) en el instante en que el modo cuenta ya estaba activo pero la migración todavía no había terminado de adoptar el cultivo remoto — causaba un error 400 de Postgres (`invalid input syntax for type uuid`). Se corrigió agregando `migrationChecked && !pendingMigration` a las condiciones del efecto (`mi-cultivo/page.js`), y se reverificó tanto el flujo de fotos como el de migración (§8) después del fix.
6. **Limpieza**: al terminar, se borraron las dos cuentas de prueba (cascada elimina cultivo/eventos/fotos de la base) y los archivos correspondientes en Storage, confirmado con conteos en cero: 0 usuarios, 0 cultivos, 0 eventos, 0 filas de fotos, 0 objetos de Storage.
7. **Responsive**: 1440×900 y 390×844, con cuenta y sin cuenta — sin overflow, timeline/formulario/lista de eventos y miniaturas de fotos se acomodan correctamente en ambos tamaños.
8. `get_advisors` (seguridad) de Supabase: sin alertas, verificado después de crear la tabla/bucket, después de encontrar y corregir la brecha del `insert`, y después de la limpieza final. `list_edge_functions`: vacío en los tres momentos (no se creó ninguna).

## 10. Regresión

- `npm run build`: exit limpio, mismas 9 rutas que en Fase 10B (no cambia el número de rutas).
- Modo sin cuenta: crear evento sigue funcionando, sigue mostrando el placeholder estático de foto (no un control real), sin ninguna llamada a Supabase.
- Login/logout/registro (Fase 10B) sin cambios de comportamiento.
- Migración local → cuenta (Fase 10B) sin cambios de comportamiento — se revisó el código y no fue necesario tocarlo.
- `/`, `/atlas`, `/creditos`, `/api/geo`, `/api/climate` responden 200.

## 11. Archivos principales

**Nuevos**:
- `src/app/lib/miCultivo/photoProcessing.js` — validación, redimensionado y limpieza de EXIF en el navegador.
- `src/app/lib/miCultivo/photos.js` — capa de acceso a Storage + tabla `cultivo_event_photos` (subir, listar con URLs firmadas, borrar).
- Migración Supabase `create_cultivo_event_photos` — tabla, políticas RLS, bucket `cultivo-photos` y políticas de `storage.objects`.

**Modificados**:
- `src/app/mi-cultivo/page.js` — estado y handlers de fotos, sección de fotos por evento (solo en modo cuenta), corrección del bug de `cultivoId` local descrito en §9.4.
- `src/app/globals.css` — estilos de miniaturas, botón "Agregar foto", vista ampliada.

## 12. Limitaciones conocidas (documentadas, no pendientes de "arreglar")

- El modo sin cuenta no tiene fotos, por diseño (ver §7) — no es un olvido.
- Las URLs firmadas duran 30 minutos; pasado ese tiempo, una foto que quedó abierta en una pestaña vieja dejaría de cargar hasta recargar la página (vuelve a pedir una URL nueva). No se implementó renovación automática en segundo plano — no hizo falta para el uso normal de la página.
- Quedaron, tras las pruebas, 0 artefactos de prueba en la base y en Storage (a diferencia de la Fase 10B, no quedó ninguna Edge Function ni cuenta de prueba pendiente de borrado manual).

**FASE 10C TERMINADA. No se implementó chatbot, clima personalizado, alertas, newsletter ni CMS. No se rediseñó el Atlas, el mapa, la Home ni las categorías. No se recreó `temp-create-test-user` ni se creó ninguna Edge Function.**
