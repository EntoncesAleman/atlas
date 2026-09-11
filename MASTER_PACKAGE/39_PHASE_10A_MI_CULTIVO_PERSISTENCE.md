# 39 — Persistencia de Mi Cultivo (Fase 10A)

Hace que el historial de "Mi Cultivo" (Fase 9) sobreviva a un cierre/recarga de página, sin autenticación ni backend.

## 1. Mecanismo elegido: `localStorage`

**Por qué**: es gratuito, no depende de ningún servicio externo ni credencial, y — punto central — **ya es el patrón establecido del proyecto** para persistencia sin cuenta: `EnvironmentalPanel.js` ya guarda `atlas:selectedProvince`/`atlas:selectedZone` en `localStorage`, y `01_PRODUCT.md`/`02_UX.md`/`22_HOME_EXPERIENCE.md` documentan explícitamente ese mismo mecanismo como la forma de persistir preferencias de visitantes sin registrarse, reservando la base de datos real para cuentas logueadas. No se inventó un mecanismo nuevo — se replicó el que ya existía.

Se evaluó explícitamente no introducir ninguna base de datos real (Postgres/Supabase/etc.) porque esa decisión de infraestructura sigue `BLOCKED` en `TODO.md` por falta de proveedor elegido — hacerlo ahora habría significado tomar una decisión de arquitectura fuera del alcance de este loop, y probablemente habría que rehacerla cuando se resuelva la autenticación real.

**Límites comunicados en la propia interfaz** (no solo en la documentación): el historial vive en este navegador/dispositivo, no hay cuenta, no hay sincronización entre dispositivos, y se pierde si se cambia de navegador, se usa modo privado, o se borran los datos del sitio. La tarjeta "Sin cuenta" de la UI se reescribió para decir esto explícitamente — ya no dice "se pierde al recargar" (Fase 9), porque eso dejó de ser cierto.

## 2. Estructura persistida

`src/app/lib/miCultivo/model.js` (ampliado):

```js
// Cultivo
{ id, currentStageId, events: [Event], createdAt (ISO), updatedAt (ISO) }

// Event (compatible con la forma de Fase 9: mismo contenido, más auditoría)
{ id, stageId, date (YYYY-MM-DD), note, photoReserved: true, createdAt (ISO), updatedAt (ISO) }
```

`createCultivo()` y `createEvent()` reemplazan a la función `createSessionEvent()` de Fase 9 (mismo propósito, nombre más preciso ahora que no es "solo de sesión"). Se agregó `updateEvent(existing, patch)` para edición. Ningún dato de usuario se inventa: `events` arranca vacío, `note` puede quedar vacía, `photoReserved` es siempre `true` pero nunca se completa con un archivo.

## 3. Capa de acceso (repository)

**`src/app/lib/miCultivo/storage.js`** — nuevo módulo, es la única parte del proyecto que toca `window.localStorage` para esta funcionalidad:

```js
loadCultivo()    // lee y valida el JSON guardado; devuelve null si no hay nada o está corrupto
saveCultivo(c)   // persiste el cultivo completo; nunca lanza (try/catch silencioso)
resetCultivo()   // borra el registro guardado
```

`mi-cultivo/page.js` **nunca llama a `localStorage` directamente** — solo a estas tres funciones. Esto es deliberado: el día que exista backend autenticado, se reemplaza el contenido de `storage.js` (por ejemplo, por llamadas a una API) sin tocar la UI ni el modelo, tal como pedía la consigna ("evitar que la UI dependa directamente del mecanismo de almacenamiento").

## 4. Cambios en la página

- **Hidratación**: al montar, intenta `loadCultivo()`; si hay datos, los usa; si no, crea un cultivo nuevo (`createCultivo()`) sin guardarlo todavía. Un flag `hydrated` evita que el efecto de guardado pise el storage con el estado vacío inicial antes de terminar de leer.
- **Guardado**: un único `useEffect` persiste el cultivo completo (id, etapa actual, eventos, timestamps) cada vez que cambia algo relevante — siempre escribe el estado completo, nunca agrega incrementalmente, así que releer + regrabar no duplica nada.
- **Editar evento** (nuevo): cada tarjeta de evento tiene un botón "Editar" que carga sus valores en el formulario; el título de la sección cambia a "Editar evento" y el botón a "Guardar cambios", con un "Cancelar edición" para salir sin guardar. Al confirmar, `updateEvent()` reemplaza el evento existente (mismo `id`, nuevo `updatedAt`) — no crea uno nuevo.
- **Reiniciar Mi Cultivo** (nuevo): botón con confirmación en dos pasos (sin usar el diálogo nativo `confirm()`, para mantener la estética del sitio) que borra el registro guardado y arranca un cultivo nuevo vacío.
- **Diseño visual**: sin cambios de estructura — mismo timeline, mismas tarjetas de modo, mismo formulario; solo se agregaron los controles de editar/reiniciar y se reescribió el texto de la tarjeta "Sin cuenta" para reflejar la persistencia real.

## 5. Qué funciona sin cuenta (hoy)

Guardar y recuperar la etapa actual y todos los eventos (crear, editar) en el mismo navegador/dispositivo, incluso cerrando la pestaña o recargando. Reiniciar el historial manualmente.

## 6. Qué queda reservado para autenticación real (no implementado)

- Sincronización entre dispositivos y backup del lado del servidor (requiere backend + cuenta).
- Migración del historial local a una cuenta recién creada (importar lo que ya había en `localStorage` al registrarse) — no se construyó, pero la separación en `storage.js` deja el lugar preparado para ese flujo.
- Carga real de fotos (sigue como espacio reservado, deshabilitado).
- Login, base de datos, chatbot, alertas, clima personalizado — fuera de alcance, no tocados.

## 7. Seguridad / privacidad

Ningún dato sale del navegador: no hay `fetch` a ningún servicio, no hay credenciales ni claves involucradas. Lo único guardado son las etapas/fechas/notas que la propia persona carga voluntariamente — nada inventado, nada sensible más allá de lo que el usuario decide escribir en una nota de texto libre (mismo nivel de exposición que ya existía en memoria en Fase 9, ahora simplemente persistido localmente).

## 8. Pruebas realizadas

- `npm run build`: exit limpio, mismas 10 rutas.
- Playwright (Chromium headless) en 1440×900 y 390×844:
  - Crear un evento, verificar que `localStorage['atlas:miCultivo']` contiene el evento y la etapa actual correctos.
  - Recargar la página (simula cerrar/reabrir): el evento y la etapa actual se recuperan correctamente, sin duplicarse (conteo de tarjetas de evento verificado antes y después).
  - Editar el evento existente (cambiar la nota): el conteo de eventos no aumenta, el texto se actualiza, y sigue actualizado tras un segundo reload.
  - Agregar un segundo evento en una etapa posterior ("Cosecha"): la etapa actual avanza y persiste correctamente tras recargar.
  - Reiniciar Mi Cultivo (confirmación de dos pasos): el conteo de eventos vuelve a 0 y `localStorage` queda con un cultivo vacío nuevo.
  - Mobile (390×844): mismo flujo de creación de evento, sin overflow de documento (`scrollWidth === clientWidth`), formulario y timeline responsive.
  - Sin errores de consola en ningún caso.
- Regresión: `/`, `/atlas`, `/api/geo`, `/api/climate` responden 200.

## 9. Resultado del build

`npm run build` → éxito, mismas 10 rutas que en Fase 9.

**FASE 10A TERMINADA. No se implementó login, fotos, chatbot, alertas, clima personalizado, ni se tocó el mapa o el Atlas.**
