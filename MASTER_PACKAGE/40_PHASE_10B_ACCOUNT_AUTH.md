# 40 — Cuenta Real + Mi Cultivo Asociado (Fase 10B)

Reemplaza el auth falso por autenticación real (Supabase Auth + Postgres), y hace que "Mi Cultivo" pueda asociarse a una cuenta, con migración explícita desde el historial local (Fase 10A).

## 1. Lo que había, y por qué se detuvo el loop primero

La inspección mínima encontró que `src/app/api/auth/[...nextauth]/route.js` no era una implementación demo incompleta, sino **completamente falsa**: un único usuario hardcodeado en el código fuente (`admin@atlas.local`/`password`, comparado como texto plano), sin registro posible, sin base de datos, con un secreto de sesión con fallback hardcodeado. Esto confirmaba el bloqueo ya documentado en `TODO.md` ("Proveedores de auth... siguen sin decisión cerrada"). Siguiendo la regla explícita de este loop ("si falta una decisión indispensable de proveedor/backend, detenerse y reportar"), se pausó el trabajo y se reportaron opciones antes de escribir código. El usuario resolvió el bloqueo conectando un proyecto real de Supabase (Postgres + Auth, free tier) vía MCP.

## 2. Mecanismo de autenticación: Supabase Auth

- **Qué reemplaza**: la ruta `/api/auth/[...nextauth]` (NextAuth + CredentialsProvider falso) se **eliminó por completo**, junto con la dependencia `next-auth` (`npm uninstall next-auth`) — no quedó ningún camino de login falso en paralelo.
- **Por qué Supabase Auth y no NextAuth+Postgres manual**: Supabase Auth ya incluye registro, login, logout, hashing de contraseñas (nunca visible ni gestionado por este código) y sesiones — capa por capa, es exactamente lo que `13_STACK.md` recomendaba ("usar el sistema de autenticación integrado del proveedor de base de datos... si cubre email+password"). Añadir NextAuth encima habría duplicado la gestión de sesión sin necesidad.
- **Cliente**: `@supabase/supabase-js` (`src/app/lib/supabase/client.js`), inicializado con `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (clave publicable — segura para el navegador; el control de acceso real lo hace RLS en la base, no esta clave). Todo el flujo de auth es client-side (sign up, sign in, sign out, `onAuthStateChange`) — no se armó verificación de sesión en el servidor porque ninguna ruta de servidor de este proyecto necesita conocer la identidad del usuario todavía (todo el acceso a datos va del navegador a Supabase, protegido por RLS).
- **Variables de entorno**: `.env.local` (nuevo, con la URL y la clave publicable del proyecto — ninguna clave secreta/`service_role`). Se agregó `.gitignore` (no existía ninguno en el proyecto) para que `.env.local` nunca se suba a un repositorio.

## 3. Modelo de datos y asociación usuario/cultivo

Dos tablas nuevas en Postgres (migración `create_mi_cultivo_tables`), separando identidad, cultivo y eventos como pedía la consigna:

```sql
cultivos (id, user_id UNIQUE → auth.users, current_stage_id, created_at, updated_at)
cultivo_events (id, cultivo_id → cultivos, user_id → auth.users, stage_id, event_date, note, photo_reserved, created_at, updated_at)
```

- Un cultivo por usuario (`user_id` es `UNIQUE`) — coincide con el alcance actual de la UI (una sola planta activa a la vez, no una lista).
- `user_id` se repite en `cultivo_events` (además de `cultivo_id`) a propósito: permite políticas RLS simples y directas (`auth.uid() = user_id`) sin necesitar un `EXISTS` contra `cultivos`, más fácil de auditar y menos propenso a errores.
- `photo_reserved` (booleano, hoy siempre `true`) dejado en la tabla desde ahora — el día que exista carga real de fotos, alcanza con agregar una columna `photo_url` (o una tabla `event_photos` con `event_id` como FK) sin rediseñar `cultivo_events`.

**RLS**: `ROW LEVEL SECURITY` habilitado en ambas tablas, con policies de `select`/`insert`/`update`/`delete` que exigen `auth.uid() = user_id` en las cuatro operaciones. Esto es lo que de verdad impide que un usuario lea o modifique el cultivo de otro — no una validación en el código del cliente (que podría eludirse), sino una regla que Postgres aplica siempre, la pida quien la pida.

`get_advisors` (seguridad) de Supabase reportó **cero alertas** después de crear las tablas y después de todas las pruebas.

## 4. Capa de acceso remoto

**`src/app/lib/miCultivo/remoteStorage.js`** — mismo principio que `storage.js` (Fase 10A): la UI nunca arma queries a mano. Expone `fetchCultivo`, `ensureCultivo`, `setCurrentStageRemote`, `insertEventRemote`, `updateEventRemote`, `resetCultivoRemote`, `bulkInsertEventsRemote` — todas devuelven/reciben datos en la **misma forma camelCase** que `model.js` (`currentStageId`, `photoReserved`, etc.), así que el resto de la página no necesita distinguir si un evento vino de `localStorage` o de Supabase.

`mi-cultivo/page.js` decide en cada acción (marcar etapa, registrar evento, editar, reiniciar) si el usuario tiene sesión: con sesión, llama a `remoteStorage.js` (y Postgres/RLS quedan como la fuente de verdad); sin sesión, seguí usando exactamente la lógica local de la Fase 10A (`storage.js`, `localStorage`). Ninguna de las dos rutas se simula: ambas escriben datos reales en su mecanismo correspondiente.

## 5. Migración local → cuenta

Al iniciar sesión (o registrarse), la página siempre llama a `ensureCultivo` (crea el cultivo vacío en la cuenta si es la primera vez) y compara contra lo que hubiera en `localStorage`:

- **Si el dispositivo tiene eventos locales y la cuenta está vacía** → tarjeta "Tenés un cultivo guardado en este dispositivo. ¿Querés conservarlo en tu cuenta?" con dos botones explícitos ("Sí, conservarlo en mi cuenta" / "No, empezar de cero en la cuenta"). Aceptar copia los eventos locales a la cuenta (`bulkInsertEventsRemote`), fija la etapa actual a la más avanzada entre ambas, y **recién entonces** borra el `localStorage` (nunca antes de confirmar que la escritura remota funcionó).
- **Si el dispositivo tiene eventos locales Y la cuenta ya tenía historial propio (conflicto)** → mismo componente, copia distinta ("Tenés datos en dos lugares... no se borra nada automáticamente"), con las opciones "Sumar los de este dispositivo a mi cuenta" (mismo mecanismo de copia, ahora sobre una cuenta no vacía) o "Usar solo los de mi cuenta" (no toca el local, simplemente no lo incorpora — los datos del dispositivo no se pierden, quedan ahí sin usar).
- **Si el dispositivo no tenía eventos** → no se muestra ningún cartel, se adopta directamente el cultivo de la cuenta.
- Al cerrar sesión, la página vuelve a cargar lo que haya en `localStorage` (vacío si se migró, o lo que hubiera si el usuario nunca migró) — nunca deja pegados datos de la cuenta anterior en la vista "sin cuenta".

## 6. UI

- La tarjeta "Con cuenta" **dejó de decir "Próximamente"**: ahora es un formulario real (email + contraseña, alternar entre "Iniciar sesión" y "Crear una cuenta nueva"), o, con sesión activa, muestra el email de la cuenta y un botón "Cerrar sesión".
- La tarjeta "Sin cuenta" mantiene el texto de Fase 10A (persistencia local, sin sincronización) — es exacto tanto si hay sesión (queda marcada "Inactivo") como si no (queda "Modo actual").
- Errores de Supabase (credenciales inválidas, cuenta ya existente, contraseña corta) se traducen a mensajes en español entendibles — nunca se muestra el error técnico crudo del proveedor.
- Nada de dashboard: mismos bloques que Fase 10A (identidad, timeline, formulario, eventos), con la única pieza nueva siendo la tarjeta de cuenta y el cartel de migración cuando corresponde.

## 7. Pruebas realizadas (extremo a extremo, contra la base real)

Nota metodológica: el proyecto de Supabase tiene, por defecto, confirmación de email obligatoria y un límite muy bajo de envío de emails en el tier gratuito — verificarlo intentando registrarse repetidamente desde Playwright agotó ese límite (`over_email_send_rate_limit`) sin llegar a crear ningún usuario. Para poder probar el flujo completo sin esperar el reseteo del límite (hasta una hora) ni debilitar la política de confirmación de email del proyecto, se desplegó una Edge Function temporal que usaba la Admin API de Supabase (`auth.admin.createUser` con `email_confirm: true`) para crear dos cuentas de prueba ya confirmadas, sin pasar por el envío de email. La función se neutralizó (devuelve `410` y exige JWT) inmediatamente después de usarla dos veces — no se pudo eliminar por esta vía (la herramienta disponible no expone un `delete`), así que **queda pendiente borrarla manualmente desde el dashboard de Supabase** (Edge Functions → `temp-create-test-user` → eliminar). Todos los usuarios y eventos de prueba se borraron de la base al terminar.

- `npm run build`: exit limpio, 9 rutas (una menos que antes: `/api/auth/[...nextauth]` ya no existe).
- Flujo completo verificado con Playwright contra la base real (1440×900 y 390×844):
  - Crear un evento local, luego iniciar sesión → aparece el cartel de migración correcto → aceptar migra el evento (verificado en la base con SQL), limpia `localStorage`.
  - La cuenta persiste el cultivo real: recargar la página mantiene la sesión y los eventos (los trae de Postgres, no de memoria).
  - Registrar un evento nuevo estando logueado lo guarda directo en Supabase; editarlo actualiza la fila existente (no duplica) — confirmado recargando dos veces.
  - Escenario de conflicto (datos locales nuevos + cuenta que ya tenía historial): cartel distinto, fusión explícita al confirmar, sin pérdida de ningún evento de ningún lado.
  - Cerrar sesión vuelve al cultivo local (vacío, porque ya se había migrado) sin mezclar datos de la cuenta.
  - **Aislamiento real entre usuarios**: se creó una segunda cuenta y, al iniciar sesión con ella, mostró **cero eventos** (no los de la primera cuenta) — verificado en la aplicación real, no solo revisando las políticas SQL.
  - Sin overflow ni errores de consola en ninguna resolución.
- `get_advisors` (seguridad) de Supabase: `[]` (sin alertas) después de crear las tablas y después de todo el testing.

## 8. Seguridad — checklist de la consigna

- **Secretos fuera del código**: sí — `.env.local` (nuevo `.gitignore` lo excluye), sin ninguna clave `service_role` en código que corra en el navegador. La única clave usada en el cliente es la publicable, diseñada para exponerse.
- **Rutas protegidas no exponen datos de otros usuarios**: verificado en la aplicación real con dos cuentas — la cuenta B no vio ni pudo ver eventos de la cuenta A.
- **Un usuario no puede consultar/modificar el cultivo de otro**: aplicado por RLS en Postgres (`auth.uid() = user_id` en las cuatro operaciones de ambas tablas), no solo por lógica de cliente.
- **No se almacenan contraseñas en texto plano**: Supabase Auth gestiona el hashing — este proyecto nunca ve ni maneja la contraseña más allá de reenviarla a la API de Supabase por HTTPS.

## 9. Pendiente para fotos (no implementado, a propósito)

- El botón "Agregar foto" sigue deshabilitado en el formulario y en cada evento — sin cambios respecto de Fase 9/10A.
- Cuando se implemente, el camino más directo es un bucket de Supabase Storage (privado, con políticas RLS equivalentes a las de estas tablas) + una columna `photo_url` en `cultivo_events` o una tabla `event_photos` con `event_id` como FK — la estructura actual ya lo admite sin migrar nada de lo existente.
- Migrar fotos del modo "sin cuenta" (que hoy no puede tener fotos, porque no están implementadas en ningún modo) queda fuera de alcance hasta que exista carga real.

## 10. Pendiente operativo

- Borrar manualmente la Edge Function `temp-create-test-user` desde el dashboard de Supabase (ver §7) — quedó neutralizada pero no eliminada.
- Decidir (fuera de este loop) si se quiere configurar un proveedor de SMTP propio en Supabase para levantar el límite de envío de emails de confirmación antes de un lanzamiento real — el límite gratuito por defecto es adecuado para desarrollo, no para usuarios reales en volumen.

**FASE 10B TERMINADA. No se implementaron fotos, chatbot, alertas ni clima personalizado. No se tocó el mapa ni el grid del Atlas.**
