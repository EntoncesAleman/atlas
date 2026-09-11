# 38 — Mi Cultivo: Primera Versión Funcional (Fase 9)

Convierte `/mi-cultivo` de página explicativa estática (Fase 8C) a una experiencia real de historial/timeline, sin backend.

## 1. Modelo de datos

`src/app/lib/miCultivo/model.js` — nuevo módulo, sin dependencias externas:

```js
STAGES = [
  { id: 'semilla', label: 'Semilla' },
  { id: 'germinacion', label: 'Germinación' },
  { id: 'trasplante', label: 'Trasplante / tierra' },
  { id: 'crecimiento', label: 'Crecimiento' },
  { id: 'floracion', label: 'Floración' },
  { id: 'cosecha', label: 'Cosecha' },
  { id: 'maduracion', label: 'Maduración / almacenamiento' },
]
```

Forma de un evento (`createSessionEvent`): `{ id, stageId, date, note, photoReserved: true, loggedAt }`. `photoReserved` es siempre `true` y nunca se completa con un archivo real — es un campo reservado para cuando exista carga de fotos, no una promesa de que ya funciona. No se inventó ningún dato de usuario: la lista de eventos arranca vacía y solo crece con lo que la persona efectivamente carga en la sesión.

## 2. Dónde vive el estado

Todo el estado (`currentStageId`, `events`, campos del formulario) es `useState` de React dentro de `src/app/mi-cultivo/page.js` (ahora `'use client'`). No hay `localStorage`, no hay `sessionStorage`, no hay backend — al recargar la página o navegar afuera, el estado se pierde por completo. Esto fue deliberado: es la forma más honesta de cumplir "sin cuenta = sin persistencia", sin dar una falsa sensación de guardado (ni siquiera local) que después habría que explicar como limitación.

## 3. Experiencia construida

- **Dos modos, uno activo**: tarjeta "Sin cuenta" (modo actual, con la advertencia explícita "estos datos existen solo en esta pantalla... se pierden") y tarjeta "Con cuenta" (marcada "Próximamente", con "El registro y el inicio de sesión todavía no existen en el sitio") — mismo patrón honesto ya usado en el resto del proyecto para funciones no implementadas.
- **Estado actual + timeline**: fila de 7 etapas numeradas con tres estados visuales (completada / actual / próxima). Tocar cualquier etapa la marca como actual — es el único control de "estado", no hay edición de fecha de la etapa en sí, solo de los eventos.
- **Registrar un evento**: formulario con etapa (select), fecha (`<input type="date">`, sin valor por defecto para no inventar una fecha), nota (textarea opcional) y un botón de foto **deshabilitado** ("Agregar foto (próximamente)", `disabled`/`aria-disabled`) — no se implementó ni siquiera una vista previa local del archivo, para no crear una función a medias que después haya que explicar. Al registrar un evento cuya etapa es posterior a la etapa actual, la etapa actual avanza automáticamente (evita el estado inconsistente de "evento de floración" con "etapa actual: semilla").
- **Eventos registrados en esta visita**: lista en orden (más reciente primero) con etapa, fecha formateada, nota y un espacio reservado para foto por evento (visualmente presente, sin funcionalidad). Estado vacío explicado en vez de una lista en blanco sin contexto.
- **Salida**: CTA "Volver al Atlas", con la misma nota honesta de "este espacio se sigue construyendo" ya usada en 8C.

## 4. Entrada desde Home — botón corregido

El botón "Ingresar como usuario" (Fase 8C.1) implicaba un login real inexistente. Se renombró a **"Mi Cultivo"** — misma acción (llevar a `/mi-cultivo`), pero sin prometer autenticación. "Ingresar libremente" → `/atlas` no se tocó, tal como pedía la consigna.

## 5. Qué NO se implementó (a propósito)

Login real, base de datos, upload definitivo de fotos (ni siquiera vista previa local), chatbot, alertas, clima personalizado, categorías nuevas. `/mi-cultivo` sigue sin conexión a ningún servicio externo — todo el comportamiento nuevo es JavaScript de cliente sobre datos que el propio usuario carga en el momento.

## 6. Pruebas realizadas

- `npm run build`: exit limpio, mismas 10 rutas.
- Playwright (Chromium headless) en 1440×900 y 390×844:
  - `/mi-cultivo` responde 200, timeline con 7 etapas, exactamente una tarjeta de modo activa ("Sin cuenta") y una deshabilitada ("Con cuenta"), botón de foto deshabilitado, advertencia de no-persistencia presente en el texto visible, sin overflow de documento, sin errores de consola.
  - Interacción real verificada: click en la etapa 4 del timeline marca "Crecimiento" como actual; completar el formulario (etapa "Floración", fecha, nota) y enviarlo agrega una tarjeta de evento con los datos correctos y avanza la etapa actual a "Floración" automáticamente.
  - Mobile (390×844): el timeline pasa a 2 filas (4+3) sin línea conectora, las tarjetas de modo se apilan, el formulario pasa a una columna — sin overflow, sin deformación.
  - Home: el botón ya no dice "Ingresar como usuario"; el link "Mi Cultivo" navega correctamente a `/mi-cultivo`.
- Regresión: `/api/geo`, `/api/climate`, `/atlas`, `/creditos` responden 200.

## 7. Resultado del build

`npm run build` → éxito, mismas 10 rutas que en Fase 8C.1 (`/mi-cultivo` sigue prerenderizada estáticamente — la interactividad hidrata en cliente, sin necesitar datos de servidor).

## 8. Qué queda pendiente para autenticación/persistencia real (fuera de esta fase)

- Definir proveedor de auth real (sigue `BLOCKED` en `TODO.md` desde fases muy tempranas — no se resolvió acá, no era el objetivo).
- Persistencia de eventos en base de datos, asociada a una cuenta.
- Upload y almacenamiento real de fotos (privado por defecto, según `10_PRIVACY.md`).
- Decidir si el modo "sin cuenta" debería, en el futuro, usar almacenamiento local del navegador (`localStorage`) como paso intermedio antes de tener cuentas reales — deliberadamente no se hizo en esta fase (ver §2) para mantener el mensaje de "no persistente" sin matices.

**FASE 9 TERMINADA. No se implementó login real, base de datos, upload definitivo, chatbot, alertas, clima personalizado ni categorías nuevas.**
