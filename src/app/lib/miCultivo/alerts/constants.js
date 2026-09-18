// Referencias y mapeos del motor de avisos de Mi Cultivo — separado a propósito de
// `mi-cultivo/page.js` (ver nota en `engine.js`): son datos y reglas, no JSX.
//
// Cada número o enlace de acá está sacado directamente del contenido ya publicado del Atlas
// (`lib/editorial/editorialData.js`), nunca inventado para esta función. Donde el Atlas da un
// rango en semanas, se convierte a días con una multiplicación simple (misma cifra, otra unidad),
// no una estimación nueva.

export const ALERT_CATEGORIES = ['clima', 'etapa', 'sanidad'];

// A qué categoría/entrada del Atlas apunta "más información" según la etapa declarada en Mi
// Cultivo — para el bloque de "Siguiente etapa" y para los avisos de etapa/sanidad. Elegido por
// cuál entrada trata específicamente esa transición (ver el propio `intro` de cada entrada
// citada en el comentario).
export const STAGE_ATLAS_LINKS = {
  semilla: { categorySlug: 'germinacion', entrySlug: 'germinacion', label: 'Germinación y primera lectura del material' },
  germinacion: { categorySlug: 'fundamentos', entrySlug: 'cuidado-de-la-plantula', label: 'Cuidado de la plántula: el tramo entre la germinación y el vegetativo' },
  trasplante: { categorySlug: 'suelo-y-agua', entrySlug: 'sustrato-y-drenaje', label: 'Sustrato, agua y drenaje' },
  crecimiento: { categorySlug: 'fundamentos', entrySlug: 'ciclo-de-vida', label: 'Ciclo de vida y condiciones de referencia' },
  floracion: { categorySlug: 'luz-y-clima', entrySlug: 'luz-y-fotoperiodo', label: 'Luz como señal temporal' },
  cosecha: { categorySlug: 'cosecha', entrySlug: 'cosecha-y-maduracion', label: 'Cosecha y maduración' },
  maduracion: { categorySlug: 'manejo-poscosecha', entrySlug: 'poscosecha', label: 'Manejo poscosecha: secado y curado' }
};

// Rangos de referencia de duración por etapa, en días — solo para las etapas donde el Atlas
// publica un rango real (no un "evento puntual" como Cosecha, ni una etapa de manejo sin rango
// propio como Trasplante). Fuente: `ciclo-de-vida` (categoría `fundamentos`), tabla "Etapas del
// ciclo: referencia general":
//   - Germinación: "1–7 días" → literal.
//   - Vegetativo: "4–8 semanas" → 28–56 días (× 7).
//   - Floración (inicial/media + tardía/maduración sumadas): "3–5 semanas" + "4–7 semanas" →
//     7–12 semanas → 49–84 días (× 7). Es una suma aritmética de dos rangos ya publicados, no un
//     dato nuevo.
// `semilla`, `trasplante`, `cosecha` y `maduracion` quedan sin rango a propósito: la tabla del
// Atlas no da uno aplicable, y esta función no inventa uno donde la fuente no lo da.
export const STAGE_DURATION_REFERENCE_DAYS = {
  germinacion: { minDays: 1, maxDays: 7 },
  crecimiento: { minDays: 28, maxDays: 56 },
  floracion: { minDays: 49, maxDays: 84 }
};

// Umbral de humedad relativa a partir del cual `lib/weather/service.js` ya agrega la lectura
// "Ambiente húmedo" a `todayReadings` (ver `HIGH_HUMIDITY_THRESHOLD_PCT` en ese archivo) — se
// repite acá solo para decidir si esa misma lectura, combinada con la etapa, amerita un aviso de
// sanidad. No se recalcula el clima: se lee el resultado que el widget climático ya calculó.
export const HUMIDITY_READING_ID = 'humid';

// Etapas en las que "Cuidado de la plántula" documenta el damping-off como riesgo real asociado
// a exceso de humedad — antes de eso (semilla sin sembrar) o después (planta ya establecida en
// vegetativo) esa entrada no aplica, así que el aviso no se genera fuera de esta ventana.
export const DAMPING_OFF_RISK_STAGES = ['semilla', 'germinacion'];
