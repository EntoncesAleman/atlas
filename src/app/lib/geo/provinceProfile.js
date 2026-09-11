// Modelo de datos de la Ficha Provincial (Loop 3B, Fase 51).
//
// Implementa la estructura `provinceProfile` especificada en
// `MASTER_PACKAGE/50_FICHA_PROVINCIAL_ATLAS.md` (§16). Es un modelo de datos puro — no hay
// ningún componente visual nuevo en este loop (eso queda para el Loop 3C, ver `50_...md` §26).
//
// Principio de no duplicación (pedido explícitamente en la Fase 21 del Loop 3B): `identity`,
// `geography` y `map` se DERIVAN en el momento de `PROVINCE_LOCATIONS`
// (`lib/weather/locations.js`, Fase 11), `getProvinceGeoContext` (`lib/geo/provinceContext.js`,
// Fase 47.2) y `ARGENTINA_PROVINCES` (`lib/geo/argentinaProvinces.js`, Fase 8A) — ninguno de esos
// tres módulos se modificó ni se copió acá.
//
// `environment`/`light`/`cultivation` son arrays de `DataPoint` (ver forma abajo). La regla dura
// de este loop es "PENDING_RESEARCH es mejor que un dato inventado" — la enorme mayoría de estos
// campos quedan en ese estado a propósito. Ver `MASTER_PACKAGE/51_LOOP_3B_PROVINCIAL_DATA.md` para
// el detalle completo de qué se investigó, qué se encontró y por qué el resto queda pendiente.

import { PROVINCE_LOCATIONS } from '../weather/locations';
import { getProvinceGeoContext } from './provinceContext';
import { getPhotoperiodDataPoint } from './photoperiod';

// Identidad administrativa verificada por consulta directa a georef-ar-api en esta sesión
// (`oficial-georef-api-provincias`, ver `editorial/sources.js`) + capital de cada jurisdicción
// (hecho administrativo público, mismo tipo de fuente que ya usa el proyecto para "23 provincias +
// CABA, confirmado por IGN" en `03_GEO.md` — no requiere una URL/DOI propia por dato, es
// conocimiento geográfico-administrativo de nivel A, no una investigación puntual nueva).
//
// CABA es un caso aparte, no una "provincia más": es una ciudad autónoma con estatus
// constitucional propio (no una subdivisión provincial ni la capital de la Provincia de Buenos
// Aires, que es La Plata) — `type: 'CABA'` la distingue explícitamente, y su `capital` es ella
// misma (no tiene una ciudad capital separada, a diferencia de las 23 provincias).
const IDENTITY_TABLE = {
  'buenos-aires': { indecCode: '06', officialName: 'Provincia de Buenos Aires', capital: 'La Plata', type: 'PROVINCIA' },
  caba: { indecCode: '02', officialName: 'Ciudad Autónoma de Buenos Aires', capital: 'Ciudad Autónoma de Buenos Aires', type: 'CABA' },
  catamarca: { indecCode: '10', officialName: 'Provincia de Catamarca', capital: 'San Fernando del Valle de Catamarca', type: 'PROVINCIA' },
  chaco: { indecCode: '22', officialName: 'Provincia del Chaco', capital: 'Resistencia', type: 'PROVINCIA' },
  chubut: { indecCode: '26', officialName: 'Provincia del Chubut', capital: 'Rawson', type: 'PROVINCIA' },
  cordoba: { indecCode: '14', officialName: 'Provincia de Córdoba', capital: 'Córdoba', type: 'PROVINCIA' },
  corrientes: { indecCode: '18', officialName: 'Provincia de Corrientes', capital: 'Corrientes', type: 'PROVINCIA' },
  entrerios: { indecCode: '30', officialName: 'Provincia de Entre Ríos', capital: 'Paraná', type: 'PROVINCIA' },
  formosa: { indecCode: '34', officialName: 'Provincia de Formosa', capital: 'Formosa', type: 'PROVINCIA' },
  jujuy: { indecCode: '38', officialName: 'Provincia de Jujuy', capital: 'San Salvador de Jujuy', type: 'PROVINCIA' },
  lapampa: { indecCode: '42', officialName: 'Provincia de La Pampa', capital: 'Santa Rosa', type: 'PROVINCIA' },
  larioja: { indecCode: '46', officialName: 'Provincia de La Rioja', capital: 'La Rioja', type: 'PROVINCIA' },
  mendoza: { indecCode: '50', officialName: 'Provincia de Mendoza', capital: 'Mendoza', type: 'PROVINCIA' },
  misiones: { indecCode: '54', officialName: 'Provincia de Misiones', capital: 'Posadas', type: 'PROVINCIA' },
  neuquen: { indecCode: '58', officialName: 'Provincia del Neuquén', capital: 'Neuquén', type: 'PROVINCIA' },
  rionegro: { indecCode: '62', officialName: 'Provincia de Río Negro', capital: 'Viedma', type: 'PROVINCIA' },
  salta: { indecCode: '66', officialName: 'Provincia de Salta', capital: 'Salta', type: 'PROVINCIA' },
  sanjuan: { indecCode: '70', officialName: 'Provincia de San Juan', capital: 'San Juan', type: 'PROVINCIA' },
  sanluis: { indecCode: '74', officialName: 'Provincia de San Luis', capital: 'San Luis', type: 'PROVINCIA' },
  santacruz: { indecCode: '78', officialName: 'Provincia de Santa Cruz', capital: 'Río Gallegos', type: 'PROVINCIA' },
  santafe: { indecCode: '82', officialName: 'Provincia de Santa Fe', capital: 'Santa Fe', type: 'PROVINCIA' },
  santiagodelestero: { indecCode: '86', officialName: 'Provincia de Santiago del Estero', capital: 'Santiago del Estero', type: 'PROVINCIA' },
  tucuman: { indecCode: '90', officialName: 'Provincia de Tucumán', capital: 'San Miguel de Tucumán', type: 'PROVINCIA' },
  tierradelfuego: {
    indecCode: '94',
    officialName: 'Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur',
    capital: 'Ushuaia',
    type: 'PROVINCIA',
  },
};

if (Object.keys(IDENTITY_TABLE).length !== 24) {
  throw new Error(`IDENTITY_TABLE debe tener 24 jurisdicciones, tiene ${Object.keys(IDENTITY_TABLE).length}`);
}

// Único dato "ambiental" con evidencia real hoy: cambio porcentual de precipitación entre las
// normales climatológicas 1981-2010 y 1991-2020 del SMN, citado textualmente en
// `oficial-smn-normales-1991-2020-cambios`. Es una TENDENCIA (comparación entre dos períodos de
// referencia), nunca una precipitación anual absoluta — por eso `unit: '% de cambio'`, no 'mm'.
// Córdoba lleva una nota explícita de alcance parcial (el hallazgo es "norte de Córdoba", no toda
// la provincia). "Oeste del NOA" no se pudo atribuir a ninguna de las 6 provincias de esa
// macrorregión con precisión suficiente — deliberadamente NO se creó un dato para eso (ver
// `51_LOOP_3B_PROVINCIAL_DATA.md` §14, "Contradicciones y datos no asignables").
const PRECIPITATION_TREND_1991_2020 = {
  cordoba: {
    value: -7.5,
    notes: 'Corresponde solo al norte de la provincia, según la fuente — no a toda la superficie de Córdoba.',
  },
  mendoza: { value: 8.5, notes: 'La fuente da un rango de 8-9%; se registra el punto medio.' },
  entrerios: { value: 8.5, notes: 'La fuente da un rango de 8-9%; se registra el punto medio.' },
};

function pendingDataPoint(key, notes) {
  return {
    key,
    value: null,
    unit: null,
    period: null,
    sourceId: null,
    evidenceLevel: 'E',
    availability: 'PENDING_RESEARCH',
    methodology: null,
    limitation: null,
    notes: notes ?? null,
  };
}

// Referencia fenológica (Loop 3C, Fase 52) — jerarquía de evidencia para Cultivo/Cosecha definida
// en la consigna: A (directa provincial) > B (científica/agronómica argentina aplicable) >
// C (referencia fenológica de especie comparable) > D (derivación geográfica) > E (pendiente).
// Ninguna de las 24 jurisdicciones tiene evidencia A o B para Cultivo/Cosecha de Cannabis sativa
// (ver `51_LOOP_3B_PROVINCIAL_DATA.md` §12) — esto es un dato de nivel C, nunca elevado.
//
// Especie de referencia: SOJA (Glycine max). Por qué es comparable:
// 1. Es, junto con el tabaco, una de las dos especies con las que Garner y Allard describieron
//    por primera vez el fotoperiodismo vegetal en 1920 (`cientifica-garner-allard-1920-...`) —
//    igual que Cannabis sativa, es una planta de DÍA CORTO: la transición a la fase reproductiva
//    depende de que la duración de la oscuridad supere un umbral, no solo de la temperatura.
// 2. Es la relación fotoperiodo-latitud mejor documentada de la agronomía argentina: los
//    "grupos de madurez" de soja tienen una franja latitudinal de comportamiento, verificado por
//    lectura directa para Entre Ríos en `academica-truffer-2011-soja-entrerios-grupos-madurez`
//    ("Cada Grupo de Madurez tiene una franja latitudinal en la que se comporta como ciclo
//    medio... La provincia de Entre Ríos queda comprendida en la región Pampeana Norte, con los
//    grupos de madurez VI y VII").
//
// LÍMITE EXPLÍCITO de la analogía (se repite en cada `limitation` para que nunca se pierda de
// vista): la soja y el Cannabis son especies distintas, con umbrales fotoperiódicos y ciclos
// propios NO equivalentes entre sí. Esta referencia ilustra que el patrón fotoperiodo-latitud es
// un fenómeno agronómico real y documentado en Argentina — nunca establece una fecha ni un
// calendario de floración/cosecha para Cannabis sativa en ninguna provincia.
const PHENOLOGICAL_REFERENCE_LIMITATION =
  'Una referencia fenológica no constituye un calendario provincial de cultivo. La soja (Glycine max) y Cannabis sativa son especies distintas, con umbrales fotoperiódicos y duración de ciclo propios, no equivalentes entre sí — esta referencia ilustra que el patrón fotoperiodo-latitud es un fenómeno agronómico real y documentado en Argentina, nunca una fecha de floración o cosecha para Cannabis sativa.';

function phenologicalReferenceDataPoint({ key, aspect, regionLabel }) {
  return {
    key,
    value: null,
    unit: null,
    period: null,
    sourceId: 'academica-truffer-2011-soja-entrerios-grupos-madurez',
    evidenceLevel: 'C',
    availability: 'AVAILABLE',
    methodology: 'Analogía biológica por categoría fotoperiódica (planta de día corto) más documentación agronómica argentina de zonificación por latitud — no es una medición ni un dato provincial directo de Cannabis sativa.',
    limitation: PHENOLOGICAL_REFERENCE_LIMITATION,
    referenceSpecies: 'Glycine max (soja)',
    referenceReason: 'Especie con la que se describió el fotoperiodismo vegetal (Garner y Allard, 1920) — misma categoría que Cannabis sativa: planta de día corto.',
    photoperiodResponse: 'La transición a floración se acelera cuando el fotoperiodo baja de un umbral propio de cada "grupo de madurez" (variedad) — mismo principio de señal por oscuridad que "Luz como señal temporal", con umbrales distintos.',
    referenceRegion: `Su grupo de madurez recomendado varía por franja latitudinal en Argentina — esta jurisdicción está en ${regionLabel}.`,
    referenceSourceId: ['cientifica-garner-allard-1920-photoperiodism-discovery', 'academica-truffer-2011-soja-entrerios-grupos-madurez'],
    notes: `Referencia fenológica sobre ${aspect}, no un dato directo de Cannabis sativa para esta provincia.`,
  };
}

function buildEnvironment(provinceId) {
  const points = [
    pendingDataPoint('temperature_mean_annual', 'Requiere extracción manual de estaciones SMN (Estadísticas Climatológicas Normales 1991-2020) o lectura del Atlas Climático Digital INTA 2010 — ninguno procesado todavía en este loop.'),
    pendingDataPoint('precipitation_annual', 'Idem temperatura — climatología de referencia sigue en PARTIAL_RESEARCH (ver `04_CLIMATE.md`).'),
    pendingDataPoint('climate_classification_koppen', 'Capa GIS oficial existe (INDEC/ANIDA, ver `21_GEO_CLIMATE_RESEARCH.md`) pero requiere análisis geoespacial no disponible en este entorno para determinar el/los tipo(s) predominante(s) por provincia.'),
    pendingDataPoint('frost_dates', 'Bloqueado por acceso a dominios INTA (climayagua.inta.gob.ar) — ver `TODO.md`, sección BLOCKED.'),
  ];

  const trend = PRECIPITATION_TREND_1991_2020[provinceId];
  if (trend) {
    points.push({
      key: 'precipitation_trend_1991_2020_vs_1981_2010',
      value: trend.value,
      unit: '% de cambio',
      period: '1991-2020 vs. 1981-2010',
      sourceId: 'oficial-smn-normales-1991-2020-cambios',
      evidenceLevel: 'A',
      availability: 'AVAILABLE',
      methodology: 'Comparación directa entre dos normales climatológicas oficiales del SMN (1981-2010 y 1991-2020).',
      limitation: 'Es un cambio porcentual (tendencia), no una precipitación anual absoluta.',
      notes: trend.notes,
    });
  }

  return points;
}

function buildLight(latitude) {
  if (typeof latitude !== 'number') return [];
  return [getPhotoperiodDataPoint(latitude, new Date())];
}

// Cultivo y Cosecha son bloques visuales separados (pedido explícito de la Fase "FICHA
// PROVINCIAL" de este loop) pero comparten el mismo array `cultivation`, distinguidos por el
// prefijo de `key` (`cultivo_`/`cosecha_`) — evita extender el modelo con un top-level nuevo
// cuando no hace falta (ya lo permitía la forma definida en 3B).
function buildCultivation(geoContext) {
  const regionLabel = geoContext?.regionLabel ?? 'su región';
  return [
    pendingDataPoint('cultivo_ventana_directa', 'Sin fuente provincial/argentina directa (nivel A/B) para el momento de transición vegetativo→reproductivo de Cannabis sativa — ver `51_LOOP_3B_PROVINCIAL_DATA.md` §12.'),
    phenologicalReferenceDataPoint({
      key: 'cultivo_referencia_fenologica',
      aspect: 'la transición de la fase vegetativa a la reproductiva (floración) por efecto del fotoperiodo',
      regionLabel,
    }),
    pendingDataPoint('cosecha_ventana_directa', 'Sin fuente provincial/argentina directa (nivel A/B) para ventana de cosecha de Cannabis sativa — ver `51_LOOP_3B_PROVINCIAL_DATA.md` §13.'),
    phenologicalReferenceDataPoint({
      key: 'cosecha_referencia_fenologica',
      aspect: 'cómo varía el tiempo hasta la madurez/cosecha según la latitud',
      regionLabel,
    }),
  ];
}

export function getProvinceProfile(provinceId) {
  const identity = IDENTITY_TABLE[provinceId];
  const location = PROVINCE_LOCATIONS[provinceId];
  const geoContext = getProvinceGeoContext(provinceId);

  if (!identity || !location || !geoContext) return null;

  return {
    identity: {
      id: provinceId,
      officialName: identity.officialName,
      visibleName: location.name,
      type: identity.type,
      capital: identity.capital,
      indecCode: identity.indecCode,
      sourceId: 'oficial-georef-api-provincias',
    },
    geography: {
      region: geoContext.region,
      regionLabel: geoContext.regionLabel,
      // Latitud/longitud del CENTROIDE GEOMÉTRICO oficial de la provincia (georef-ar-api) — no es
      // la capital, no es una estación meteorológica y no es la ubicación de ninguna persona
      // usuaria. Ver la excepción de Tierra del Fuego ya documentada en `lib/weather/locations.js`
      // (se usa el centroide de Ushuaia, no el geométrico real, que cae en territorio antártico).
      latitude: location.lat,
      longitude: location.lon,
      coordinateMeaning: 'centroide_geometrico_provincial',
    },
    map: {
      // Referencia al dataset ya existente — nunca una copia del path SVG.
      provinceId,
      source: 'lib/geo/argentinaProvinces.js (ARGENTINA_PROVINCES)',
    },
    environment: buildEnvironment(provinceId),
    light: buildLight(location.lat),
    cultivation: buildCultivation(geoContext),
    sources: [], // se completa en runtime uniendo los sourceId presentes en environment/light/cultivation
    metadata: {
      generatedAt: new Date().toISOString(),
      lastReviewed: '2026-09-11',
    },
  };
}

// Fallback cuando no hay provincia seleccionada (`50_FICHA_PROVINCIAL_ATLAS.md` §8): solo
// información nacional realmente respaldada — nunca un promedio nacional presentado como si
// describiera a cualquier provincia en particular.
export function getArgentinaProfile() {
  return {
    identity: {
      id: 'argentina',
      officialName: 'República Argentina',
      visibleName: 'Argentina',
      type: 'PAIS',
      capital: 'Ciudad Autónoma de Buenos Aires',
      indecCode: null,
      sourceId: 'oficial-georef-api-provincias',
    },
    geography: {
      jurisdictionCount: 24,
      note: '23 provincias + Ciudad Autónoma de Buenos Aires.',
    },
    map: {
      provinceId: null, // el consumidor debe mostrar el contorno nacional completo, sin resaltar ninguna provincia
      source: 'lib/geo/argentinaProvinces.js (ARGENTINA_PROVINCES, las 24 en conjunto)',
    },
    environment: [
      {
        key: 'temperature_mean_annual_national',
        value: 16.3,
        unit: '°C',
        period: '1991-2020',
        sourceId: 'oficial-smn-normales-1991-2020-cambios',
        evidenceLevel: 'A',
        availability: 'AVAILABLE',
        methodology: 'Normal climatológica oficial del SMN, período 1991-2020, agregada a nivel país.',
        limitation: 'Promedio nacional — no representa el clima de ninguna provincia individual.',
        notes: 'Promedio a NIVEL PAÍS — nunca debe usarse para representar el clima de ninguna provincia individual (la propia fuente documenta variación regional real: ver `precipitation_trend_1991_2020_vs_1981_2010` en Córdoba/Mendoza/Entre Ríos).',
      },
    ],
    light: [],
    cultivation: [],
    sources: ['oficial-smn-normales-1991-2020-cambios', 'oficial-georef-api-provincias'],
    metadata: {
      generatedAt: new Date().toISOString(),
      lastReviewed: '2026-09-11',
    },
  };
}

export function getAllProvinceIds() {
  return Object.keys(IDENTITY_TABLE);
}

// Qué bloque(s) de la ficha se prioriza(n)/resaltan según la entrada editorial que se está leyendo
// (`50_FICHA_PROVINCIAL_ATLAS.md` §19, precisado en el Loop 3C). Los nombres de bloque
// corresponden a los que renderiza `ProvinceProfileCard`: `environment`, `light`, `geography`,
// `cultivation` y `context` (el bloque "Contexto de tu zona" / `ProvinceContextPanel`). Esto SOLO
// cambia énfasis visual — nunca oculta un bloque que tenga datos reales, salvo `marco-editorial`,
// que por regla explícita nunca muestra ambiente/cultivo (`MARCO_EDITORIAL_HIDDEN_BLOCKS`).
export const ENTRY_FOCUS = {
  germinacion: ['environment', 'light', 'context'],
  'sustrato-y-drenaje': ['environment', 'context'],
  'luz-y-fotoperiodo': ['light', 'geography'],
  'lectura-de-senales': ['environment'],
  'cultivo-en-secuencia': ['environment', 'light', 'cultivation'],
  'cosecha-y-maduracion': ['environment', 'light', 'cultivation'],
  'marco-editorial': ['context'],
};

export const MARCO_EDITORIAL_HIDDEN_BLOCKS = ['environment', 'cultivation'];
