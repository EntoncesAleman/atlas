# 35 — Hover del Mapa y Separación Home/Atlas (Fase 8B.1)

Dos correcciones puntuales sobre trabajo ya cerrado (Fases 8A y 8B), sin reabrir ninguna de las dos.

## 1. Hover del mapa

**Causa**: `.map-province.hovered` usaba `fill: var(--sage-glass)` — un token `rgba(71, 98, 67, 0.08)`, prácticamente transparente (8% de opacidad), pensado originalmente como velo sutil sobre superficies claras (`.atlas-card-scrim`), no como color de relleno sólido de una provincia. Sobre el fondo verde oscuro del mapa (`.geo-map-wrap`, degradado `--sage-dark`→`--sage`), ese relleno casi transparente se fundía visualmente con el fondo — de ahí que se percibiera como "el mismo color que el Panel Ambiental" (ambos leídos como una mancha verde apagada, sin contraste real).

**Fix**: `.map-province.hovered` pasa a `fill: var(--sage-active)` (`#a5b59e`) — un tono sage sólido de intensidad media, ya existente en la paleta de tokens (antes solo usado una vez, en un detalle decorativo no relacionado) y no perteneciente al vocabulario climático del proyecto (no es azul/rojo/amarillo de alerta). Verificado por color computado real en el navegador:
- Reposo: `rgb(249, 246, 238)` (`--paper`)
- Hover: `rgb(165, 181, 158)` (`--sage-active`)
- Seleccionada: `rgb(179, 151, 123)` (`--clay`, sin cambios)

Los tres estados son ahora claramente distinguibles entre sí. El orden de las reglas CSS (`.hovered` antes que `.selected`, misma especificidad) sigue garantizando que una provincia seleccionada conserve su color `--clay` aunque el mouse quede posicionado encima (`.selected` gana en cascade). No se tocó la geometría de las provincias (Fase 8A), ni `EnvironmentalPanel`, ni ningún color climático.

## 2. Separación Home / Atlas

**Diagnóstico**: `CategoryShowcase` (el grid cuadrado de 7 categorías, Fase 8B) se renderizaba completo e inmediatamente debajo del Panel Ambiental en la Home — visualmente, la Home ya mostraba el contenido íntegro de la enciclopedia antes de que el visitante llegara a `/atlas`, sin ninguna señal de que hubiera "más" en otro lugar. (Nota aparte, verificada durante la inspección: `/atlas` en sí no usa `CategoryShowcase`/`AtlasVisualCard` — tiene su propia lista en filas, `atlas-index-row` — así que el grid cuadrado de 8B solo existía en la Home. Esto no se tocó: la consigna de este loop es ajustar la composición de la Home, no rediseñar `/atlas`.)

**Fix** (solo composición, sin tocar el diseño de las tarjetas):
- `CategoryShowcase.js` ahora acepta dos props opcionales: `limit` (recorta cuántas categorías renderiza; sin `limit`, se comporta exactamente igual que antes) y `description` (párrafo opcional bajo el título de la sección). Cuando `limit` deja categorías afuera, se agrega un botón `Ir al Atlas completo` debajo del grid.
- `page.js` (Home) ahora invoca `<CategoryShowcase limit={3} description="..." />` — muestra 3 de las 7 categorías como adelanto, con una oración que dirige explícitamente al Atlas completo, más el botón "Ir al Atlas completo" (además del link "Ver todas" que ya existía en el encabezado de la sección).
- `AtlasVisualCard.js` **no se modificó**. Las 3 tarjetas que aparecen en la Home miden exactamente 1:1 (verificado por `getBoundingClientRect`), igual que las 7 en Fase 8B.

Con esto, la Home queda legible como: identidad del proyecto → mapa + selección geográfica → Panel Ambiental → **adelanto** de 3 categorías con salida clara al Atlas → accesos secundarios. El Atlas completo (7 categorías) sigue viviendo solo en `/atlas` y en la navegación real del sitio, no duplicado en la Home.

## 3. Qué no se tocó

Contenido editorial, geometría del mapa (8A), diseño de las tarjetas cuadradas (8B), Panel Ambiental, clima, auth, CMS, SEO, chatbot, "Historia de la planta". No se eliminó ningún componente — `CategoryShowcase` se seguía usando exactamente igual, solo con dos props nuevas opcionales que no rompen ningún otro consumidor (hoy no hay otro).

## 4. Pruebas realizadas

- `npm run build`: exit limpio.
- Playwright (Chromium headless) en 1440×900 y 390×844: 24 provincias presentes, colores de hover/seleccionada/reposo confirmados distintos por valor RGB computado real (no solo inspección visual), sin overflow de `.geo-picker` ni `.category-showcase`, sin errores de consola, navegación real Home → Atlas vía el botón "Ir al Atlas completo" confirmada (`page.url()` termina en `/atlas`), `/atlas` responde 200 con sus 7 filas de categoría intactas.
- Inspección visual: captura de una provincia en hover (clara, visible, verde sage sólido) y de una provincia seleccionada con otra en hover simultáneamente (colores inequívocamente distintos); captura completa de Home en desktop y mobile confirmando la nueva composición (adelanto de 3 categorías + CTA, en vez del grid completo de 7).
- Regresión: `/api/geo`, `/api/climate` responden 200.

## 5. Resultado del build

`npm run build` → éxito, mismas 9 rutas que en fases anteriores.

## 6. Pendientes (no tocados, fuera de alcance)

Sin cambios respecto de lo ya registrado en `TODO.md` tras la Fase 8B (overflow de `.secondary-access-card`, duplicación "CONTEXTO CONTEXTO" en Marco legal) — ninguno de los dos fue tocado ni afectado por esta fase.

**FASE 8B.1 TERMINADA. No se inicia 8C, chatbot, ni "Historia de la planta".**
