# 52 — Loop 3C: implementación de la Ficha Provincial + referencias fenológicas

Implementa visualmente la Ficha Provincial especificada en `50_FICHA_PROVINCIAL_ATLAS.md` y
construida con datos en `51_LOOP_3B_PROVINCIAL_DATA.md`, integrándola en las 7 entradas del Atlas,
y completa Cultivo/Cosecha con referencias fenológicas biológicamente comparables cuando no existe
evidencia directa.

**Una referencia fenológica no constituye un calendario provincial de cultivo.** Esta frase se
repite textualmente en el propio código (`PHENOLOGICAL_REFERENCE_LIMITATION`,
`lib/geo/provinceProfile.js`) y se muestra al usuario en cada tarjeta de referencia fenológica de
la ficha — no es solo una regla de este documento.

## 1. Implementación

Componente nuevo: `src/app/components/ProvinceProfileCard.js` (cliente). Se monta como primer
elemento dentro del `<aside className="atlas-entry-aside">` ya existente en
`atlas/[category]/[entry]/page.js` — reutiliza el grid de dos columnas
(`.atlas-entry-content-wrap`) sin crear ningún sistema de layout paralelo, tal como exigía la
consigna. `ProvinceContextPanel` (Fase 47.2) se reubicó como último bloque de datos dentro de la
ficha ("Contexto de tu zona") — se eliminó su montaje suelto en el cuerpo del artículo para no
duplicarlo, exactamente la decisión que ya había dejado planteada `50_FICHA_PROVINCIAL_ATLAS.md`
§20.

## 2. Componente

Un solo componente reutilizable (no siete sidebars) que arma, en este orden:

1. **Identidad** — jurisdicción + capital + región (nunca el id técnico ni el código INDEC).
2. **Mapa** — recorte del SVG nacional ya existente (`ARGENTINA_PROVINCES`), un solo color, sin
   overlay climático.
3. **Geografía** — latitud aproximada, con la aclaración explícita de que es el centroide
   geométrico de la provincia, no la ubicación de la persona usuaria.
4. **Ambiente** — solo los `DataPoint` con `availability: 'AVAILABLE'` (hoy: la tendencia de
   precipitación de Córdoba/Mendoza/Entre Ríos; el resto de provincias no muestra este bloque en
   absoluto, no un texto de "sin datos").
5. **Luz** — el cálculo de fotoperiodo de la Fase 3B (Spencer 1971 + Cooper 1969), siempre
   presente (toda provincia tiene latitud verificada), rotulado explícitamente como cálculo
   astronómico.
6. **Cultivo** y **7. Cosecha** — dos bloques separados; cada uno indica primero, con una frase
   corta, que no hay evidencia directa (nivel A/B) para Cannabis sativa, y después muestra la
   referencia fenológica (nivel C, ver §4).
7. **Contexto de tu zona** — `ProvinceContextPanel` sin modificar.
8. **Fuentes de esta ficha** — unión deduplicada de los `sourceId` realmente usados en los bloques
   con datos, resueltos contra `editorial/sources.js` (nunca un id crudo visible).

Estados internos (`AVAILABLE`/`UNAVAILABLE`/`PENDING_RESEARCH`/`NOT_APPLICABLE`) nunca se muestran
como texto al usuario — controlan qué se renderiza, no qué se imprime.

## 3. Datos utilizados

Todo sale de `getProvinceProfile`/`getArgentinaProfile` (Fase 3B, sin modificar su forma pública) +
`ARGENTINA_PROVINCES` para el mapa. No se agregó ninguna fuente de datos nueva más allá de las dos
fuentes fenológicas de este loop (§4). `ENTRY_FOCUS` decide qué bloques llevan una marca visual de
énfasis (borde/color distinto en el `<summary>`) según la entrada — nunca oculta un bloque con
datos reales, salvo `marco-editorial` (`MARCO_EDITORIAL_HIDDEN_BLOCKS`), que nunca muestra
Ambiente/Cultivo/Cosecha por regla explícita.

`ENTRY_FOCUS` (ajustado en este loop para reflejar la lista exacta pedida en la consigna):

```
germinacion            → environment, light, context
sustrato-y-drenaje     → environment, context
luz-y-fotoperiodo      → light, geography
lectura-de-senales     → environment
cultivo-en-secuencia   → environment, light, cultivation
cosecha-y-maduracion   → environment, light, cultivation
marco-editorial        → context   (environment/cultivation ocultos por regla, no por prioridad)
```

## 4. Referencias fenológicas incorporadas

**Especie de referencia: soja (*Glycine max*)**, usada para los dos bloques (Cultivo y Cosecha) de
las 24 jurisdicciones. Por qué es comparable:

1. Es, junto con el tabaco, una de las dos especies con las que Garner y Allard describieron por
   primera vez el fotoperiodismo vegetal en 1920 — la misma categoría fotoperiódica que Cannabis
   sativa: **planta de día corto** (la transición a la fase reproductiva depende de que la
   oscuridad continua supere un umbral, no solo de la temperatura).
2. Es la relación fotoperiodo-latitud mejor documentada de la agronomía argentina: los "grupos de
   madurez" de soja tienen una franja latitudinal de comportamiento — verificado por lectura
   directa para Entre Ríos ("grupos de madurez VI y VII" en la región Pampeana Norte).

**Tipo de respuesta fotoperiódica**: día corto cuantitativo (la floración se acelera, no se
bloquea por completo, cuando el fotoperiodo baja del umbral — a diferencia de una respuesta
absoluta).

**Límite de la analogía**, repetido en cada tarjeta que se le muestra a la persona usuaria: la
soja y el Cannabis son especies distintas, con umbrales fotoperiódicos y duración de ciclo propios
no equivalentes entre sí — la referencia ilustra que el patrón fotoperiodo-latitud es un fenómeno
agronómico real y documentado en Argentina, nunca una fecha de floración o cosecha para Cannabis
sativa.

## 5. Fuentes

| id | Verificación |
|---|---|
| `cientifica-garner-allard-1920-photoperiodism-discovery` | Verificado vía Crossref (DOI real); trabajo original completo no leído en esta sesión |
| `academica-truffer-2011-soja-entrerios-grupos-madurez` | **Verificado por lectura directa** (SciELO Argentina, cita textual) |

Ninguna URL ni DOI inventado — donde no se pudo verificar una URL en loops anteriores (Spencer
1971, Cooper 1969, White & Mastalerz 1966) se mantiene `url: null`, sin cambios.

## 6. Niveles de evidencia aplicados

Jerarquía usada exactamente como la definió la consigna:

- **A/B** (directa/científica argentina específica): ninguna de las 24 jurisdicciones tiene
  evidencia de este nivel para Cultivo/Cosecha de Cannabis sativa — se muestra explícitamente
  "todavía no hay evidencia directa" antes de la referencia.
- **C** (referencia fenológica): las dos tarjetas de soja, en las 24 jurisdicciones.
- **D** (derivación geográfica): el cálculo de fotoperiodo (bloque Luz).
- **E** (pendiente): todo lo demás de Ambiente (temperatura media, Köppen, heladas) y los
  `DataPoint` de "ventana directa" de Cultivo/Cosecha.

Ningún dato C o D se presentó ni se etiquetó como si fuera A (regla explícita de la consigna
verificada a mano y con test automatizado — ver §10).

## 7. Diferencia entre dato directo e inferencia

Estructural, no solo textual: cada `DataPoint` tiene su propio `evidenceLevel`, `methodology` y
`limitation`. La UI nunca mezcla ambos tipos en el mismo párrafo — el dato directo de Ambiente
(precipitación, nivel A) se muestra como una lista de valor/unidad/período; la referencia
fenológica (nivel C) se muestra en una tarjeta visualmente distinta, con su propio rótulo
("Referencia fenológica") y su propia aclaración de límite.

## 8. Limitaciones

- Solo 3 de las 24 jurisdicciones (Córdoba, Mendoza, Entre Ríos) tienen algún dato de Ambiente
  disponible — el resto no muestra ese bloque, resultado esperado de la Fase 3B, no un defecto de
  este loop.
- La referencia fenológica es la MISMA especie (soja) para las 24 jurisdicciones — no se encontró,
  ni se buscó exhaustivamente, una especie de referencia distinta más específica por región (fuera
  de alcance: la consigna pedía completar Cultivo/Cosecha con una referencia defendible, no una
  investigación de múltiples especies por zona).
- El texto de la tarjeta de referencia fenológica es idéntico entre Cultivo y Cosecha salvo el
  aspecto comparado (`aspect`) y la nota — es intencional (misma especie, mismo respaldo
  bibliográfico), no una duplicación accidental.
- No se implementó hora civil de amanecer/atardecer (ya diferido desde la Fase 3B, sin cambios en
  este loop).

## 9. Responsive

Desktop/tablet: sin breakpoint nuevo — hereda el que ya colapsa `.atlas-entry-content-wrap` a una
columna a los 980px (Fase 47.2). Mobile: los bloques Geografía/Ambiente/Luz/Cultivo/Cosecha/Fuentes
se implementaron con `<details>`/`<summary>` nativos (abiertos por defecto en cualquier
resolución) — accesibles de fábrica (`aria-expanded` lo maneja el navegador, sin JS propio).
Identidad y "Contexto de tu zona" nunca están dentro de un `<details>` — siempre visibles, tal
como exigía la consigna. Verificado sin overflow horizontal en 390×844 con Tierra del Fuego
(nombre de provincia más largo) y en 1280×1200 en desktop.

## 10. Tests

- `tests/provincial-context-audit.mjs` (Fase 47.2, **sin modificar**): **1280/1280** — confirma
  que mover `ProvinceContextPanel` dentro de la nueva ficha no rompió nada de lo ya construido.
- `tests/province-profile-model-check.mjs` (Fase 3B, sin modificar su lógica más allá de que ahora
  valida más `DataPoint` por la extensión del modelo): **602/602**.
- `tests/province-profile-ui-audit.mjs` (**nuevo**, pequeño y específico, pedido explícitamente
  por esta consigna): **147/147**, cubriendo:
  - Las 24 jurisdicciones: nombre y capital propios visibles, sin nombre de otra provincia
    filtrado al cuerpo de la ficha (con la excepción documentada y verificada aparte de que la
    sección "Fuentes" cita un paper real cuyo título menciona "Entre Ríos" para las 24 — es la
    fuente real, no una fuga de datos), sin ningún id técnico visible.
  - Subconjunto profundo (Buenos Aires, Mendoza, Tierra del Fuego, CABA) × las 7 entradas:
    `marco-editorial` nunca muestra Ambiente/Cultivo/Cosecha; Cultivo/Cosecha siempre muestran la
    tarjeta "Referencia fenológica" con la frase exacta sobre calendario y la especie soja;
    `ENTRY_FOCUS` marca al menos un bloque como foco; cero errores de consola en 28 navegaciones.
  - Diferenciación real: Tierra del Fuego (extremo sur) siempre muestra una duración de luz
    distinta de Buenos Aires/Mendoza/CABA — Mendoza y CABA pueden coincidir en el valor redondeado
    porque están, en la realidad, casi a la misma latitud (verificado, no un error).
  - CABA nunca se confunde con la Provincia de Buenos Aires (capital propia mostrada, nunca "La
    Plata").
  - Estado sin provincia: ficha nacional mínima, invitación a elegir, sin bloques de
    Ambiente/Cultivo, sin imágenes rotas.

  Durante el desarrollo de este test se encontraron y corrigieron dos falsos positivos del propio
  test (no del producto): (1) la comprobación de "sin nombres de otras provincias" no excluía la
  lista de Fuentes, donde el título real de un paper menciona "Entre Ríos" para las 24
  jurisdicciones legítimamente; (2) la comprobación de diferenciación exigía que las 4 provincias
  del subconjunto tuvieran una duración de luz numéricamente distinta entre sí, sin contemplar que
  Mendoza y CABA están, en la realidad, a una latitud casi idéntica.

## 11. Build

`npm run build`: limpio, mismas 9 rutas (el componente nuevo vive dentro de una ruta ya existente,
no agrega ninguna).

## 12. Decisiones

1. `ProvinceContextPanel` se reubicó (no se duplicó) dentro de la nueva ficha — cumple
   exactamente lo que especificaba `50_FICHA_PROVINCIAL_ATLAS.md` §20.
2. Cultivo y Cosecha comparten el array `cultivation` del modelo (distinguidos por prefijo de
   `key`) en vez de extender el modelo con un top-level nuevo — evita una extensión innecesaria.
3. `ENTRY_FOCUS` se implementó como una marca visual (borde/color en el `<summary>`), nunca como
   reordenamiento de bloques — más simple, más robusto, y suficiente para "organizar/priorizar sin
   generar información" tal como pedía la consigna.
4. Los bloques colapsables usan `<details>` nativos, abiertos por defecto en todas las
   resoluciones — accesibilidad de fábrica sin JS propio, en vez de un acordeón controlado a mano.
5. Identidad nunca muestra el id técnico ni el código INDEC — se verificó a mano y con test
   automatizado.

## 13. Archivos

**Nuevos**: `src/app/components/ProvinceProfileCard.js`, `tests/province-profile-ui-audit.mjs`,
`MASTER_PACKAGE/52_PHASE_3C_PROVINCIAL_PROFILE_IMPLEMENTATION.md`.
**Modificados**: `src/app/lib/geo/provinceProfile.js` (referencias fenológicas + `ENTRY_FOCUS`
precisado), `src/app/lib/geo/photoperiod.js` (campos `methodology`/`limitation` agregados al
`DataPoint` de luz), `src/app/lib/editorial/sources.js` (2 fuentes nuevas),
`src/app/atlas/[category]/[entry]/page.js` (monta `ProvinceProfileCard`, ya no monta
`ProvinceContextPanel` suelto), `src/app/globals.css` (estilos de la ficha, reutilizando variables
ya existentes).
**Sin cambios**: Supabase, Auth, RLS, Storage, Mi Cultivo, Chatbot, contenido editorial de las 7
entradas, `ProvinceContextPanel.js` (su lógica interna), `provincial-context-audit.mjs`.

**LOOP 3C TERMINADO. No se inició el Loop 4.**
