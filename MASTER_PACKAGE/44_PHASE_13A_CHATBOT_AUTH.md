# 44 — Chatbot del Atlas: Acceso Autenticado + Estructura Base (Fase 13A)

Establece únicamente la puerta de entrada y la interfaz base del Chatbot del Atlas: ruta `/chatbot`, acceso exclusivo para usuarios autenticados, y una estructura preparada para conectar retrieval/respuesta en fases futuras — sin implementar todavía ninguna de esas capas.

## 1. Objetivo y alcance

Implementar solo: la ruta, el gate de autenticación real, la interfaz visual base (estado inicial + input + botón deshabilitado), y la documentación de la regla conceptual del chatbot. No se implementó retrieval, LLM, búsqueda semántica, clima ni integración con Mi Cultivo — eso queda para las fases 13B/13C/13D.

## 2. Regla conceptual del chatbot (documentada, no mostrada al usuario)

> El Chatbot del Atlas no es una autoridad independiente. Es una interfaz conversacional sobre conocimiento editorial curado. Puede explicar, relacionar y contextualizar información autorizada, pero no puede inventar hechos, fuentes, diagnósticos, datos climáticos históricos ni recomendaciones que no estén respaldadas por el Atlas o por datos ambientales reales.

Esta regla vive como comentario al inicio de `src/app/chatbot/page.js` — guía el diseño de las fases siguientes, no aparece como texto en la UI.

## 3. Inspección previa (qué patrón se reutilizó)

Antes de escribir código se revisó cómo el proyecto ya resuelve autenticación y protección, para no introducir una segunda arquitectura:
- **Auth**: `src/app/lib/supabase/client.js` expone `getSupabaseClient()`, un cliente de Supabase para el navegador con la clave publicable (sin secretos). No existe ningún helper de Supabase para servidor (`@supabase/ssr` no está instalado), ni middleware (`middleware.js` no existe en el proyecto), ni ninguna ruta `/api/auth` con lógica real (la carpeta quedó vacía desde que se eliminó NextAuth en la Fase 10B).
- **Protección de rutas que requieren usuario**: el único precedente es `src/app/mi-cultivo/page.js`, que es 100% cliente (`'use client'`) y decide qué mostrar según `supabase.auth.getSession()` + `onAuthStateChange`, sin ningún chequeo de servidor. Es el único patrón de "acceso según sesión" que existe hoy en el proyecto.
- **Patrón visual**: `atlas-topbar` + `atlas-breadcrumb` (usado en `/atlas`, `/mi-cultivo`) para el encabezado de página interna; `atlas-category-hero` para el título; `atlas-entry-section` + `atlas-section-note` para el contenido; `photo-placeholder` para estados vacíos; `primary-button`/`secondary-button` para acciones. Todo reutilizado sin cambios.

Con eso confirmado, se replicó exactamente el mismo patrón de auth de Mi Cultivo en `/chatbot`, en vez de introducir SSR, cookies o middleware nuevos.

## 4. Acceso — comportamiento por caso

**Sin sesión**: `/chatbot` muestra únicamente la pantalla de acceso — "Esta función está disponible para usuarios con cuenta." con dos CTAs reales ("Iniciar sesión" / "Crear cuenta"), ambos apuntando a `/mi-cultivo`, que ya tiene el formulario real de registro/login de la Fase 10B (con su propio toggle entre "iniciar sesión" y "crear cuenta"). **No se duplicó ningún formulario de auth**, no se creó ningún login paralelo, no hay credenciales ni cuentas demo en el código.

**Con sesión**: `/chatbot` muestra la interfaz real: estado inicial "¿Qué querés consultar?", un campo de texto usable (`textarea`, con `placeholder="Escribí tu pregunta..."`) y un botón "Enviar" **permanentemente deshabilitado** en esta fase (el `submit` del formulario está interceptado con `preventDefault` y nunca hace nada — no hay ninguna llamada a red ni respuesta simulada). Debajo, una nota editorial: "El Chatbot del Atlas está en desarrollo." — lenguaje de producto normal, sin términos técnicos (`TODO`/`MOCK`/`DEBUG`/etc.).

## 5. Protección real — qué se logró y qué es honesto documentar

El chequeo de sesión ocurre en un componente de cliente (mismo patrón que Mi Cultivo), no en un middleware ni en un server component. Dentro de esa restricción, la protección se implementó de la forma más sólida posible:
- La interfaz de conversación **no se renderiza en el DOM en absoluto** cuando no hay sesión — es una rama condicional de JSX, no un elemento oculto con CSS ni un input deshabilitado que sigue presente. Un usuario sin sesión que visite `/chatbot` directamente nunca ve ni puede interactuar con ningún elemento de la interfaz de chat.
- Mientras se resuelve la sesión (`authLoading`), se muestra un estado neutro ("Comprobando sesión…") — nunca se muestra la interfaz de chat de forma optimista antes de confirmar que hay sesión real.
- Si `getSupabaseClient()` devuelve `null` (por ejemplo, variables de entorno ausentes), el comportamiento es **fail-closed**: `session` queda `null` y se muestra la pantalla de acceso, nunca la interfaz.

**Honestidad sobre el límite real de esta fase**: como 13A explícitamente no conecta ningún dato ni llamada a ningún backend (ni editorialData, ni Mi Cultivo, ni clima), no existe todavía ningún recurso privado real detrás de esta pantalla — el único "activo" a proteger en esta fase es la interfaz visual en sí. Por eso el chequeo en cliente es proporcional al riesgo actual. El proyecto ya tiene el mecanismo real de protección de datos para cuando haga falta: **Row Level Security de Supabase**, el mismo que protege `cultivos`/`cultivo_events`/`cultivo_event_photos` hoy. Cuando una fase futura (13B/13C/13D) empiece a leer datos reales (editorialData del propio proyecto, o — más adelante — datos de Mi Cultivo del usuario), esa lectura va a tener que pasar por una tabla/política RLS o por una ruta de servidor que valide el token de sesión contra Supabase — no por este chequeo de cliente. Esto queda anotado explícitamente para que la Fase 13B no asuma que el chequeo de `/chatbot` ya es, por sí solo, la protección de esos datos futuros.

## 6. Arquitectura preparada para fases futuras

No se crearon carpetas ni archivos de scaffolding vacíos (`retrieval.js`, `context.js`, etc. sin contenido) — eso hubiera sido "arquitectura excesivamente abstracta" sin ningún uso real todavía, exactamente lo que esta fase pide evitar. En cambio, `src/app/chatbot/page.js` documenta en comentarios, en el punto exacto donde se va a conectar, el flujo previsto:

```
Fase 13B: pregunta → retrieval sobre editorialData
          (entradas, secciones, tags, relaciones, fuentes) → evidencia
Fase 13C: evidencia + contexto autorizado del usuario
          (Mi Cultivo, provincia, clima actual)
Fase 13D: evidencia + contexto → motor de respuesta → respuesta trazable
```

El `<form>` de la interfaz ya tiene su `onSubmit` y su estado de pregunta (`question`) — cuando 13B exista, conectar el retrieval real es reemplazar ese `preventDefault` por una llamada real y agregar el área de respuesta, sin rehacer la página ni su gate de acceso.

## 7. Qué NO se implementó (deliberado)

LLM, API de OpenAI/Anthropic/Gemini/Ollama, embeddings, base vectorial, RAG, búsqueda semántica, búsqueda web, scraping, historial de conversaciones, memoria conversacional, análisis de fotos, diagnóstico, clima dentro del chatbot, Mi Cultivo dentro del chatbot, notificaciones, recomendaciones personalizadas, tablas Supabase nuevas, Edge Functions nuevas, proveedores externos nuevos, sistema de créditos, monetización, publicidad. No se instaló ninguna dependencia nueva — todo el código usa exactamente las mismas dependencias que ya estaban en `package.json` (`@supabase/supabase-js`, ya usado desde la Fase 10B).

## 8. Navegación

Se agregó un tercer botón "Chatbot del Atlas" en el hero de la Home (`src/app/page.js`), junto a los dos ya existentes ("Mi Cultivo", "Ingresar libremente") — mismo componente `.hero-actions`, mismo estilo `.secondary-button`, sin crear header global ni rehacer la navegación. No se tocaron los enlaces placeholder de `HomeSecondaryAccess` (Biblioteca visual/Calendario/Comparador/Newsletter) — son features no implementadas de otras fases, no el lugar correcto para esto.

## 9. Privacidad

`/chatbot` en esta fase no consulta el cultivo del usuario, eventos, notas, fotos, clima, ubicación ni ningún otro dato personal — la única información que usa es si hay o no una sesión activa (booleano), igual que Mi Cultivo. No se muestra ningún ID interno, UUID, token ni dato de Supabase en la interfaz.

## 10. Pruebas realizadas

| # | Caso | Resultado |
|---|---|---|
| 1 | `/chatbot` sin sesión | Pantalla de acceso; interfaz de chat ausente del DOM (no solo oculta). |
| 2 | Click en "Iniciar sesión" → flujo real de Mi Cultivo (cuenta real creada por signup genuino) | Sesión iniciada correctamente. |
| 3 | `/chatbot` autenticado | Interfaz real: estado inicial, input usable, botón "Enviar" deshabilitado, nota de "en desarrollo" visible. |
| 4 | Logout desde Mi Cultivo → volver a `/chatbot` | Vuelve a la pantalla de acceso. |
| 5 | `/chatbot` sin sesión (acceso directo) | Sin acceso a la interfaz funcional (mismo resultado que la prueba 1). |
| 6 | Responsive 1440×900 y 390×844 (gate y Home con el botón nuevo) | Sin overflow horizontal en ningún caso; botón visible en mobile. |
| 7 | Consola del navegador durante todo el flujo | Sin errores. |
| 8 | `npm run build` | Limpio, 10 rutas (`/chatbot` nueva, ninguna perdida). |

Cuenta de prueba creada por signup real, usada para las pruebas 2–4, borrada al terminar (confirmado: 0 usuarios de prueba restantes). `get_advisors` de seguridad de Supabase: sin alertas (no se tocó ninguna política ni tabla).

## 11. Regresión

`/`, `/atlas`, una categoría (`/atlas/fundamentos`) y una entrada del Atlas, `/mi-cultivo`, login/logout, `/creditos`, `/api/geo`, `/api/climate` — todos responden 200, sin errores de consola nuevos.

## 12. Archivos

**Nuevos**: `src/app/chatbot/page.js`.
**Modificados**: `src/app/page.js` (botón nuevo en el hero), `src/app/globals.css` (estilo del formulario del chatbot y estado `:disabled` genérico de los botones, reutilizado en cualquier botón deshabilitado del sitio).
**Sin cambios**: esquema de Supabase, políticas RLS, Storage, Auth, Atlas, Mi Cultivo, mapa, modelo editorial.

## 13. Limitaciones (deliberadas de esta fase)

- El botón "Enviar" no hace nada — es la interfaz base, no el motor de respuesta.
- Los dos CTAs de la pantalla de acceso ("Iniciar sesión" / "Crear cuenta") llevan al mismo lugar (`/mi-cultivo`), donde la persona elige el modo correcto manualmente — no se preseleccionó el modo signup/signin para no modificar `mi-cultivo/page.js` sin necesidad real en esta fase.
- La protección de `/chatbot` es, por ahora, un chequeo de sesión en cliente (igual que Mi Cultivo) — proporcional a que esta fase no expone ningún dato real todavía (ver §5). No confundir esto con la protección de datos reales que sí va a hacer falta en 13B+, que debe apoyarse en RLS o en una ruta de servidor, no en este chequeo.

## 14. Siguiente fase sugerida

**Fase 13B — Retrieval del Atlas**: conectar la pregunta del usuario con `editorialData` (entradas, secciones, tags, relaciones, fuentes) para producir evidencia trazable, sin motor de respuesta todavía.

**FASE 13A TERMINADA. No se implementó retrieval, LLM, búsqueda semántica, clima, Mi Cultivo dentro del chatbot, ni ninguna otra funcionalidad de fases posteriores.**
