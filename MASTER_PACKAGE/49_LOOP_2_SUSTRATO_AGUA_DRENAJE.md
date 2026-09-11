# 49 — Loop 2: Sustrato, agua y drenaje + Verificación real de Supabase

Segundo loop editorial corto, con un objetivo B agregado explícitamente: confirmar con evidencia
real (no solo lectura de código) que la aplicación está correctamente conectada a Supabase.

## 1. Alcance

**Parte A**: completar la entrada `sustrato-y-drenaje` (categoría `suelo-y-agua`) con la misma
estructura ya usada en el Loop 1 (Historia, mecanismo reforzado, síntesis proceso/observación/
mecanismo, relación con otras etapas), sin tocar ninguna otra entrada.

**Parte B**: auditar en vivo la integración real con Supabase (Auth, Database, RLS, Storage) del
proyecro **Atlas** (`rksepodyvutrzqlniofe`), sin modificar esquema, políticas, bucket ni
credenciales.

No se tocó: ninguna otra entrada editorial, GeoSelector, contextualización provincial, Chatbot,
arquitectura, esquema de Supabase, políticas RLS, configuración de Storage.

## 2. Parte A — Fuentes investigadas

Prioridad seguida: peer-reviewed → universidades → organismos públicos → instituciones
agrícolas/botánicas → libros/revisiones → fuentes técnicas especializadas; para Argentina, INTA
primero.

| Fuente | Tipo | Verificación |
|---|---|---|
| Rubio, E.; Karlanian, M. — "Cómo elegir un buen sustrato para las macetas" (INTA, Instituto de Floricultura) | OFFICIAL | Lectura directa |
| Barbaro, L. A.; Karlanian, M. A. (2020) — "Efecto de las propiedades físicas del sustrato sobre el desarrollo de plantines florales en maceta", *Ciencia del Suelo* 38(1) | SCIENTIFIC | Lectura directa (SciELO, acceso abierto) |
| White, J. W.; Mastalerz, J. W. (1966) — "Soil moisture as related to container capacity", *Proc. Amer. Soc. Hort. Sci.* 89 | ACADEMIC | **No verificado por lectura directa** — corroborado solo por búsquedas convergentes; sin URL (ver §3) |
| Loreti, E.; Perata, P. (2020) — "The Many Facets of Hypoxia in Plants", *Plants* (MDPI) | SCIENTIFIC | Lectura directa (PMC, acceso abierto) |

Se reutilizaron sin cambios las 2 fuentes ya existentes desde la Fase 7B2 (`oficial-inta-relacion-suelo-planta-agua`,
`academica-unlpam-inta-guia-evaluacion-visual-suelo`).

## 3. Corrección a la regla "no inventar DOI/URL"

Al citar White & Mastalerz (1966) se generó por error una URL inventada
(`cabidigitallibrary.org/doi/10.5555/...`) en el primer intento de registrar la fuente. Se detectó
antes de terminar el loop y se corrigió: el campo `url` de esa fuente quedó en `null` con una nota
explícita de que no se encontró ninguna página real y verificable para enlazar, en vez de inventar
una dirección. Como consecuencia directa, se hizo un ajuste mínimo de código en
`atlas/[category]/[entry]/page.js`: el renderizado de "Fuentes" ahora muestra el título como texto
plano (sin `<a>`) cuando `source.url` es `null`, en vez de generar un enlace no funcional. Es el
único cambio de código de este loop fuera de contenido editorial puro.

## 4. Historia incorporada

Un párrafo: la formalización del concepto de "capacidad de contenedor" (White y Mastalerz, 1966)
como quiebre entre la práctica hortícola empírica anterior y una comprensión física explícita de
por qué un sustrato en maceta retiene agua de forma distinta que el mismo suelo en el campo
abierto; y la línea de investigación argentina más reciente (INTA, 2020) que cuantifica la
relación entre porosidad de aireación y capacidad de retención de agua. Se marcó explícitamente
que el trabajo de 1966 es una formalización conceptual puntual (hecho histórico verificado por
convergencia de fuentes secundarias, no leído directamente) y que el estudio de 2020 es una
evaluación en petunias y copetes, no en Cannabis — presentado como lo que es, un estudio con esas
especies, nunca generalizado sin aclaración.

## 5. Cambios editoriales realizados

En `src/app/lib/editorial/editorialData.js`, entrada `sustrato-y-drenaje`:
- Sección nueva **Historia** (un párrafo).
- Sección **Aireación y oxígeno**: sin reescribir su contenido ya correcto, se agregó
  "fermentación alcohólica" y "mucho menor rendimiento energético" para alinear la redacción con
  el respaldo internacional nuevo (Loreti & Perata 2020), sin cambiar la afirmación de fondo.
- Sección nueva **Qué se evalúa, qué se ve y por qué** (lista de 3 puntos que separa
  explícitamente PROCESO / OBSERVACIÓN / MECANISMO, como pedía la consigna). Incluye una mención
  nueva y acotada a raíces visibles en los orificios de drenaje, con lenguaje explícitamente
  condicional ("es compatible con", "no alcanza por sí solo para concluir") — no diagnostica.
- Sección nueva **Relación con otras etapas**, citando "Germinación y primera lectura del
  material" y "Cultivo en secuencia" por su título público exacto (nunca por id técnico).
- `sourceIds` ampliado de 2 a 6 fuentes. `lastReviewed` actualizado a `2026-09-11`.

No se tocó: `intro`, `observations`, `signals`, `commonMistakes`, `environmentContext`,
`editorialStatus`, ni el resto de las secciones existentes (`que-hace-el-sustrato`,
`agua-y-drenaje`, `observar-la-humedad`).

## 6. Relación con otras entradas — evaluación explícita

La consigna pedía evaluar relación como mínimo con 4 entradas. Resultado:

| Entrada | ¿Relación real? | Decisión |
|---|---|---|
| `germinacion` | Sí — la radícula se ancla y absorbe agua en este mismo sustrato | Ya estaba en `relatedEntryIds`; se mantiene |
| `cultivo-en-secuencia` | Sí — el sistema de raíces crece y necesita sostener el mismo equilibrio agua/aire durante toda la ontogenia | Ya estaba en `relatedEntryIds`; se mantiene |
| `luz-y-fotoperiodo` | **No evaluada como real** — es un eje temporal/de señal (fotoperiodo), sin relación física directa con agua/porosidad del sustrato en el contenido actual de ninguna de las dos entradas | No se agregó |
| `cosecha-y-maduracion` | **No evaluada como real** — esa entrada describe maduración de tricomas, sin ninguna mención de manejo de riego/sustrato en su contenido actual | No se agregó |

Se prefirió no forzar dos relaciones débiles solo por completar la lista mínima pedida —
coherente con la regla general de no inventar conexiones sin evidencia real en el propio
contenido.

## 7. Contexto provincial — verificado sin tocar código

`sustrato-y-drenaje` ya tenía, desde la Fase 47.2, un generador de contexto provincial propio en
`lib/editorial/provinceContext.js` (macrorregión + nota sobre ritmo de secado). No se modificó ese
archivo. Se confirmó que sigue funcionando sin cambios porque depende de `entry.id`
(`sustrato-y-drenaje`), que no cambió — verificado con la suite de la Fase 47.2 (ver §14).

## 8. Limitaciones de investigación (Parte A)

- White & Mastalerz (1966) no se pudo leer en texto completo ni se encontró una URL real para
  citarla — es una publicación previa a la era DOI. Se cita solo por el hecho histórico puntual
  (que formalizó el concepto de "capacidad de contenedor"), nunca por ninguna cifra interna del
  trabajo.
- El estudio de Barbaro & Karlanian (2020) es sobre petunias y copetes, no sobre Cannabis — se
  cita explícitamente como "condición de ese estudio puntual", nunca generalizada.
- No se encontró (ni se buscó exhaustivamente, por alcance) una fuente específica sobre sustrato y
  drenaje aplicada puntualmente a *Cannabis sativa* — la entrada sigue apoyándose en principios
  generales de fisiología de sustrato/raíz, igual que antes de este loop.

---

## PARTE B — Verificación real de Supabase

## 9. Mapeo de la integración existente (inspección de código)

- **Cliente de navegador**: `src/app/lib/supabase/client.js` — `createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)`, solo se instancia en el navegador (`typeof window !== 'undefined'`), sin ninguna clave `service_role` en código de cliente.
- **Auth**: usado directamente en `src/app/mi-cultivo/page.js` (`supabase.auth.signUp`, `signInWithPassword`, `signOut`, `getSession`, `onAuthStateChange`). No hay ninguna otra pantalla de Auth en el proyecto (Chatbot reutiliza la misma sesión, no tiene su propio formulario).
- **Database**: `src/app/lib/miCultivo/remoteStorage.js` — CRUD sobre `cultivos` y `cultivo_events`.
- **Storage**: `src/app/lib/miCultivo/photos.js` — subida/lectura (URL firmada)/borrado sobre el bucket `cultivo-photos`, vía tabla `cultivo_event_photos`.
- **Variables de entorno usadas realmente por el código**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (ambas leídas únicamente en `lib/supabase/client.js`). No se encontró ninguna otra variable de Supabase referenciada en el código (`grep` de `process.env` en `src/`).

## 10. Variables de entorno — estado (sin exponer valores)

| Variable | Estado | Uso real confirmado |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | **PRESENTE** (en `.env.local`, ignorado por git) | Sí — `lib/supabase/client.js` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **PRESENTE** (en `.env.local`, ignorado por git) | Sí — `lib/supabase/client.js` |
| Cualquier variable `SUPABASE_SERVICE_ROLE_*` | **AUSENTE** del código de cliente (correcto: nunca debe estar en código que corre en el navegador) | No aplica al frontend |

Ningún valor se leyó ni se imprimió en ningún momento de esta verificación — solo se confirmó la
presencia de las claves (`grep` sobre nombres de variable, nunca sobre su contenido).

## 11. Conectividad real al proyecto — verificado

Se usó la integración de Supabase disponible en este entorno (misma cuenta que administra el
proyecto) para consultar directamente la plataforma, no solo el código:

- `list_projects` devuelve 4 proyectos de la organización; uno de ellos, **"Atlas"**
  (`rksepodyvutrzqlniofe`), coincide **exactamente** con el prefijo del proyecto embebido en
  `NEXT_PUBLIC_SUPABASE_URL` (verificado comparando solo el identificador de proyecto en la URL,
  nunca la clave).
- Estado del proyecto: **`ACTIVE_HEALTHY`**, Postgres 17.6.1, región `us-west-2`, creado
  `2026-09-10` (consistente con la línea de tiempo de la Fase 10B).
- `get_advisors` (seguridad): **0 alertas** — sin políticas RLS faltantes ni otras advertencias
  detectadas por el propio panel de Supabase.

Esto confirma **conexión real de red/proyecto**, no solo que el archivo `.env.local` exista.

## 12. Auth — verificado con una cuenta real, creada y borrada en esta sesión

Flujo ejecutado con Playwright contra `next dev` real (no simulado):
1. `POST` de signup real vía `supabase.auth.signUp` (UI de `/mi-cultivo`) con un email de prueba
   marcado explícitamente (`loop2-supabase-verify-<timestamp>@example.com`).
2. **Resultado**: sesión inmediata (sin pantalla de "confirmá tu email") — el proyecto tiene la
   confirmación de email desactivada o configurada para auto-confirmar. Se documenta como un dato
   de configuración observado, no se cambió nada.
3. Confirmado en la base real: fila nueva en `auth.users`, `email_confirmed_at` no nulo.
4. Cierre de sesión real (`supabase.auth.signOut`) ejecutado y confirmado (la UI volvió al estado
   público/sin cuenta).
5. **Limpieza**: la cuenta de prueba se borró con `DELETE FROM auth.users WHERE email = ...`
   (cascada real vía `ON DELETE CASCADE` a `cultivos`/`cultivo_events`/`cultivo_event_photos`,
   confirmada antes de borrar — ver §16). Verificado `auth.users` en 0 filas después.

**Auth: ✅ verificado con cuenta real de punta a punta (signup → sesión → logout → borrado).**

## 13. Database — verificado con escritura y lectura reales

Con la cuenta de prueba autenticada (misma sesión de arriba):
- `ensureCultivo` creó una fila real en `cultivos` (confirmado por SQL).
- Se cargó un evento real desde el formulario de Mi Cultivo → fila real en `cultivo_events`
  (confirmado por SQL antes de borrarlo).
- Se borró el evento desde la UI real (`deleteEventRemote`) → confirmado por SQL: 0 filas de
  `cultivo_events` para esa cuenta después del borrado.

**Database: ✅ verificado — lectura y escritura reales confirmadas, no solo código leído.**

## 14. RLS — verificado leyendo las políticas reales en Postgres (no solo el comentario del código)

Se consultó `pg_policies` directamente sobre el proyecto real (no un supuesto ni una migración
archivada) para las tablas `cultivos`, `cultivo_events`, `cultivo_event_photos` y
`storage.objects`:

- `cultivos`: `SELECT`/`UPDATE`/`DELETE` con `auth.uid() = user_id`; `INSERT` con
  `WITH CHECK (auth.uid() = user_id)`.
- `cultivo_events`: mismo patrón `auth.uid() = user_id` en las 4 operaciones.
- `cultivo_event_photos`: `SELECT`/`DELETE` por `auth.uid() = user_id`; `INSERT` con una condición
  más estricta que además verifica que el `cultivo_id` y el `event_id` referenciados pertenezcan
  al mismo usuario (`EXISTS` contra `cultivos`/`cultivo_events`) — evita que alguien intente
  adjuntar una foto a un evento ajeno aunque conociera su id.
- `storage.objects` (bucket `cultivo-photos`): las 3 políticas (`INSERT`/`SELECT`/`DELETE`) exigen
  `bucket_id = 'cultivo-photos' AND (storage.foldername(name))[1] = auth.uid()::text` — coincide
  exactamente con `buildStoragePath` en `photos.js` (`${userId}/${cultivoId}/${eventId}/...`).

Esto es una verificación **directa sobre la base real**, más fuerte que releer el comentario del
código o que confiar en la documentación de una fase anterior. No se creó, modificó ni eliminó
ninguna política.

**RLS: ✅ verificado por lectura directa de las políticas reales — coinciden con lo que el código asume.**

## 15. Storage — verificado con subida, lectura y borrado reales

Con la misma cuenta de prueba:
- Bucket confirmado: `cultivo-photos`, `public: false` (privado, como documenta el código).
- Se subió una foto de prueba real (JPEG mínimo) a través del flujo real de la UI
  (`uploadEventPhoto`) → objeto real creado en `storage.objects`, con el path esperado
  (`{userId}/{cultivoId}/{eventId}/{uuid}.jpg`).
- Se generó y se usó una URL firmada real (`createSignedUrls`) — la miniatura se mostró en la UI.
- Se borró la foto desde la UI real (`deleteEventPhoto`) → confirmado por SQL: el objeto salió de
  `storage.objects` (no solo su fila en `cultivo_event_photos`) y no quedó ningún objeto huérfano
  nuevo asociado a la cuenta de prueba.

**Storage: ✅ verificado de punta a punta — subida, URL firmada y borrado real confirmados, 0 objetos huérfanos nuevos.**

### Hallazgo (no nuevo, no corregido en este loop)

Al confirmar "0 objetos huérfanos nuevos" se encontraron **2 objetos huérfanos preexistentes** en
el bucket (759 bytes cada uno, con fecha del mismo día pero de un folder-prefix que no corresponde
a ninguna cuenta activa). Esto coincide con una limitación ya documentada en
`46_PHASE_13C_CHATBOT_CONTEXT.md` ("Quedaron 2 archivos de prueba huérfanos en el bucket privado
... lección de proceso para limpieza de pruebas futuras"). **No se intentó borrarlos en este
loop**: borrar directamente la fila de `storage.objects` por SQL no garantiza que el blob real se
elimine del backend de almacenamiento — puede dejar el archivo físico sin ninguna fila que lo
referencie, un problema potencialmente peor. El borrado correcto requiere la Storage API
(`storage.from(bucket).remove(...)`), no una consulta SQL directa. Queda como pendiente real,
documentado — no es un problema de seguridad (bucket privado, RLS activa, sin owner válido que
pueda listarlos).

## 16. Conclusión Supabase

# ✅ CONECTADO Y VERIFICADO

| Componente | Estado | Método |
|---|---|---|
| Configuración (variables de entorno) | ✅ Presentes y usadas realmente por el código | Inspección de código + `grep` de nombres, sin exponer valores |
| Conexión de red/proyecto | ✅ Verificada | `list_projects`/`get_project` — coincide con la URL configurada, proyecto `ACTIVE_HEALTHY` |
| Auth | ✅ Verificado | Signup + sesión + logout reales, con cuenta de prueba borrada al final |
| Database | ✅ Verificado | Insert/select/delete reales sobre `cultivos`/`cultivo_events` |
| RLS | ✅ Verificado | Lectura directa de las políticas reales en `pg_policies`, coinciden con el código |
| Storage | ✅ Verificado | Subida, URL firmada y borrado reales sobre el bucket `cultivo-photos`, 0 objetos huérfanos nuevos |
| Advisors de seguridad de Supabase | ✅ 0 alertas | `get_advisors(type: security)` |

**Pruebas que NO se ejecutaron, con motivo:**
- Aislamiento en vivo entre **dos** cuentas simultáneas (ya se había hecho y documentado en las
  Fases 10B/10C/13C) — no se rehizo en este loop porque el objetivo era *confirmar*, no repetir
  una fase ya cerrada; en su lugar se verificó la definición real de las políticas RLS en la base
  (§14), que es una prueba más fuerte y general (cubre a cualquier usuario, no solo a los dos que
  se probaron en su momento).
- Migración local → cuenta (Fase 10B) — fuera de alcance de este loop, no se tocó.

## 17. Verificación final

- `npm run build`: limpio, mismas 9 rutas.
- `tests/provincial-context-audit.mjs` (sin modificar): **1280/1280 verificaciones en verde**.
- Verificación visual (Playwright) de `sustrato-y-drenaje`: 0 errores de consola, 0 imágenes
  rotas, 0 `undefined`/`null` visibles, la fuente sin URL se muestra como texto plano (no como
  enlace roto).
- Revisado a mano: ningún id técnico expuesto como texto público; ningún parámetro numérico de
  sustrato/agua presentado como regla universal (los porcentajes de Barbaro & Karlanian se citan
  explícitamente como resultado de ese estudio con petunias/copetes, no como recomendación).
- Se creó y se borró un archivo de test temporal (`tests/_tmp-loop2-supabase-check.mjs`, usado
  solo para automatizar el flujo de Auth/Storage de la Parte B) — no forma parte del commit final.

## 18. Pendientes reales

- 2 objetos huérfanos preexistentes en el bucket `cultivo-photos` (ver §15) — requieren limpieza
  vía Storage API en una fase futura dedicada, no vía SQL directo.
- No hay ninguna fuente específica de sustrato/drenaje aplicada a Cannabis (ver §8) — sigue siendo
  una limitación de la investigación disponible, no de este loop en particular.

## 19. Archivos

**Modificados**: `src/app/lib/editorial/editorialData.js` (entrada `sustrato-y-drenaje`),
`src/app/lib/editorial/sources.js` (4 fuentes nuevas), `src/app/atlas/[category]/[entry]/page.js`
(fuente sin URL se renderiza como texto, no como enlace roto).
**Nuevo**: `MASTER_PACKAGE/49_LOOP_2_SUSTRATO_AGUA_DRENAJE.md`.
**Sin cambios**: cualquier otra entrada editorial, arquitectura editorial, GeoSelector,
contextualización provincial, Mi Cultivo (funcionalidad), Chatbot, esquema/políticas/Storage de
Supabase, credenciales.

**LOOP 2 TERMINADO. No se continuó con Luz y fotoperiodo, Lectura de señales, Cultivo en
secuencia, Cosecha y maduración ni Marco argentino — esos son loops separados.**
