# 47.1 — Patch: Home + Contextualización Geográfica

Ajuste puntual de UX sobre el cierre funcional de la Fase 47: simplifica los CTAs del Home y convierte la selección de provincia de un estado puramente decorativo a un dato realmente persistido y reutilizable como contexto — sin crear ningún sistema nuevo.

## 1. Cambios realizados

### Home — CTAs
- Se quitó el botón "Chatbot del Atlas" del hero de Home (`src/app/page.js`). El Chatbot **no se tocó**: sigue existiendo, funcionando y protegido en `/chatbot` exactamente igual que antes — solo dejó de promocionarse desde la entrada principal.
- "Mi Cultivo" → **"Ingresar"** (mismo destino, `/mi-cultivo`).
- "Ingresar libremente" → **"Explorar el Atlas"** (mismo destino, `/atlas`).

### "¿Dónde cultivás?" — breve y funcional
- Se agregó una oración descriptiva bajo el título del selector (`src/app/components/GeoSelector.js`): *"Elegí tu provincia para adaptar la información al contexto climático de tu zona."* — sin agregar ningún campo nuevo.
- La selección sigue siendo **solo provincia** como dato principal — no se agregó ningún campo de dirección, calle, coordenadas ni GPS (ninguno existía antes tampoco). El selector de "zona" ya existente sigue siendo opcional y solo aparece después de elegir provincia — nunca bloquea la exploración.
- **Corrección real, no cosmética**: el botón "Explorar {provincia}" no tenía ningún `onClick` — no hacía absolutamente nada al tocarlo. Ahora persiste la elección y navega a `/atlas`. El botón "Explorar sin elegir" antes solo reseteaba el estado local del componente (se quedaba en la misma página) — ahora también limpia la elección guardada y navega a `/atlas`.
- La elección se **hidrata al volver**: si la persona ya había elegido una provincia en una visita anterior, el mapa y el resumen la muestran de nuevo al entrar a Home — coherente con el diseño original ya documentado en `02_UX.md` ("la sesión, vía localStorage, recuerda la elección... mostrando siempre un selector para cambiarla"), que hasta ahora nunca se había implementado de verdad.

## 2. Cómo se usa la provincia como contexto (y qué NO se hizo)

Se reutilizó una convención de `localStorage` **que ya existía en el código pero nunca se completaba**: `src/app/components/EnvironmentalPanel.js` (un componente de una fase anterior) ya leía `localStorage.getItem('atlas:selectedProvince')`/`'atlas:selectedZone'` — pero como el botón de `GeoSelector` nunca escribía nada ahí, esas claves nunca se llenaban. Este patch cierra exactamente ese circuito: `GeoSelector` ahora **escribe** en esas mismas claves al confirmar una elección.

Se guarda el **id interno de provincia** (ej. `mendoza`, `buenos-aires` — el mismo esquema de ids ya usado en `lib/weather/locations.js` desde la Fase 11 para Mi Cultivo), no el nombre visible — así, si una fase futura quiere leer esta elección para mostrar clima real, puede pasarla directamente a `getProvinceLocation()`/`fetchProvinceWeather()` ya existentes, sin ninguna conversión adicional.

**Nunca se guarda** nada más preciso que provincia/zona — ninguna coordenada, ninguna dirección, ningún dato de geolocalización del navegador.

**Deliberadamente NO se hizo** (fuera de alcance de este patch, ver regla de alcance):
- No se conectó ningún dato climático real a las 7 entradas editoriales ni a ninguna otra página — eso es "profundizar el Atlas", explícitamente fuera de este patch.
- No se revivió/rediseñó `EnvironmentalPanel.js` para mostrar datos reales — sigue siendo un componente que existe en el código pero **no se renderiza en ninguna página** (confirmado con `grep`, sin cambios en este patch). Mostrarlo en Home habría significado agregar una sección visible nueva ("convertir Home en un dashboard"), algo que la consigna prohíbe explícitamente.
- No se creó ninguna API nueva, ningún proveedor climático nuevo, ninguna duplicación de los datos de provincia ya existentes en `lib/geo/argentinaProvinces.js`/`lib/weather/locations.js`.
- No se tocó `/api/geo` ni `/api/climate` — se reutilizan tal cual cuando corresponda en el futuro.

En síntesis, esta fase entrega el primer eslabón real de la cadena `PROVINCIA → CONTEXTO GEOGRÁFICO → CONTEXTO CLIMÁTICO → INFORMACIÓN DEL ATLAS CONTEXTUALIZADA`: la provincia elegida ahora **se guarda y se puede usar** (`localStorage`, clave ya establecida, id compatible con la infraestructura climática existente) — pero todavía no hay ningún consumidor visible de ese dato en el Atlas. Ese consumo pertenece a una fase futura, no a este patch.

## 3. Verificación realizada

- **Home**: botones "Ingresar" (→ `/mi-cultivo`) y "Explorar el Atlas" (→ `/atlas`) confirmados por `href` real; "Chatbot del Atlas" confirmado ausente del hero.
- **Selector breve**: texto descriptivo visible; elegir una provincia en el mapa (Mendoza) actualiza el resumen; "Explorar Mendoza" navega a `/atlas` y persiste `atlas:selectedProvince=mendoza` en `localStorage` (verificado leyendo el valor real, no asumido).
- **Hidratación**: al volver a Home después de haber elegido Mendoza, el resumen la muestra de nuevo sin tener que re-seleccionarla.
- **"Explorar sin elegir"**: navega a `/atlas` y limpia ambas claves de `localStorage` (verificado que quedan en `null`).
- **Regresión**: `/mi-cultivo`, `/chatbot` (gate intacto, sin sesión), `/atlas` (las 8 tarjetas siguen ahí, sin cambios), `/api/geo`, `/api/climate` — todo responde correctamente, sin errores de consola.
- **Responsive**: 1440×900, 1280×800, 768×1024 y 390×844 — sin overflow horizontal, CTAs y selector geográfico visibles y usables en las 4 resoluciones.
- **Build**: `npm run build` limpio, mismas 9 rutas (este patch no agrega ni quita ninguna ruta).

## 4. Fuera de alcance — anotado para después, no resuelto acá

Conforme a la regla de alcance ("si encontrás algo que no sea necesario para este patch, documentarlo en TODO y continuar"):
- `EnvironmentalPanel.js` sigue siendo un componente huérfano (existe, no se importa en ninguna página). Ahora que `GeoSelector` sí alimenta las claves de `localStorage` que ese componente espera, revivirlo con datos climáticos reales (reutilizando `fetchProvinceWeather` de Mi Cultivo) es un candidato concreto para una fase futura — pero decidir *dónde* mostrarlo (¿Home? ¿una página propia?) y *cómo* sin convertir Home en un dashboard es una decisión de producto que excede este patch.
- No se investigó ni se tocó ninguna entrada editorial, ninguna fuente, ningún loop de investigación.

## 5. Archivos

**Modificados**: `src/app/page.js` (CTAs del hero), `src/app/components/GeoSelector.js` (texto breve, persistencia real, hidratación), `src/app/globals.css` (estilo del texto nuevo).
**Sin cambios**: Atlas, Mi Cultivo, Chatbot (ni su UI ni su arquitectura interna), Auth, RLS, Storage, `/api/geo`, `/api/climate`, modelo editorial, `EnvironmentalPanel.js`.

**PATCH 47.1 TERMINADO. No se inició ninguno de los 8 loops de investigación. No se rediseñó Home, Atlas, Chatbot, Mi Cultivo ni el sistema de clima.**
