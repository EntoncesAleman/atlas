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

// Cantidad real de estaciones meteorológicas del SMN por provincia (Loop 4, Fase 53) — verificado
// descargando y parseando el listado oficial (`oficial-smn-listado-estaciones`). No es un valor
// climático: es un dato de cobertura de la red de observación, útil para entender qué tan densa
// (o escasa) es la infraestructura de medición real de cada jurisdicción.
const SMN_STATION_COUNT = {
  'buenos-aires': 26, caba: 2, catamarca: 2, chaco: 2, chubut: 5, cordoba: 9, corrientes: 5,
  entrerios: 3, formosa: 2, jujuy: 3, lapampa: 3, larioja: 4, mendoza: 6, misiones: 4,
  neuquen: 2, rionegro: 5, salta: 5, sanjuan: 2, sanluis: 3, santacruz: 7, santafe: 7,
  santiagodelestero: 2, tucuman: 1, tierradelfuego: 2,
};

// Clasificación climática oficial IGN/INDEC (capa "Tipos de climas", ANIDA) en el centroide
// geométrico de cada provincia (Loop 4, Fase 53) — determinada por punto-en-polígono real contra
// la capa WFS oficial (`oficial-indec-anida-tipos-climaticos-wfs`), no copiada de una fuente
// secundaria ni estimada editorialmente. Cuatro provincias ya documentadas en `03_GEO.md` como
// internamente heterogéneas (Mendoza, Salta, Jujuy, Buenos Aires) llevan una nota reforzada de que
// el resultado es solo el del centroide, no el de toda su superficie.
const HETEROGENEOUS_PROVINCES = new Set(['mendoza', 'salta', 'jujuy', 'buenos-aires']);

const CLIMATE_CLASSIFICATION_CENTROID = {
  jujuy: 'Cálido / Subtropical Serrano',
  salta: 'Cálido / Subtropical Serrano',
  formosa: 'Cálido / Subtropical con Estación Seca',
  chaco: 'Cálido / Subtropical con Estación Seca',
  misiones: 'Cálido / Subtropical sin Estación Seca',
  corrientes: 'Cálido / Subtropical sin Estación Seca',
  tucuman: 'Cálido / Subtropical Serrano',
  catamarca: 'Árido / De sierras y campos',
  santiagodelestero: 'Cálido / Subtropical con Estación Seca',
  larioja: 'Árido / De sierras y campos',
  cordoba: 'Templado / Pampeano',
  santafe: 'Cálido / Subtropical con Estación Seca',
  entrerios: 'Templado / Pampeano',
  sanjuan: 'Árido / De sierras y campos',
  mendoza: 'Árido / De la estepa patagónica',
  sanluis: 'Templado / De transición',
  'buenos-aires': 'Templado / Pampeano',
  caba: 'Templado / Pampeano',
  lapampa: 'Templado / De transición',
  neuquen: 'Árido / Patagónico',
  rionegro: 'Árido / Patagónico',
  chubut: 'Árido / Patagónico',
  santacruz: 'Árido / Patagónico',
  tierradelfuego: 'Frío / Andes patagónico - fueguinos',
};

if (Object.keys(SMN_STATION_COUNT).length !== 24 || Object.keys(CLIMATE_CLASSIFICATION_CENTROID).length !== 24) {
  throw new Error('SMN_STATION_COUNT y CLIMATE_CLASSIFICATION_CENTROID deben cubrir las 24 jurisdicciones.');
}

// Altitud sobre el nivel del mar (Loop 4.3, §6/§14) — misma fuente ya registrada
// (`oficial-smn-listado-estaciones`, columna ALTURA), reutilizada para un propósito nuevo, no una
// fuente nueva. georef-ar-api (`/provincias`, `/localidades`) NO expone ningún campo de elevación
// (confirmado en esta sesión contra el propio error de la API, que lista los campos válidos) y el
// MDE-Ar del IGN solo se distribuye como raster descargable (.img), no como API de punto — se
// descartaron ambos por impracticables para este loop. Se usa, para cada jurisdicción, la altura
// real de la estación SMN cuyo nombre coincide con la ciudad capital (o, si no existe ninguna con
// ese nombre exacto, la estación real más cercana a la capital) — nunca un promedio ni una
// estimación editorial. `exact: true` = la estación lleva el nombre de la propia capital;
// `exact: false` = estación real más cercana usada a falta de una con el nombre de la capital,
// documentada explícitamente para no presentar la altura de otra ciudad como si fuera la de la
// capital.
const CAPITAL_STATION_ALTITUDE = {
  'buenos-aires': { station: 'La Plata Aero', value: 23, exact: true },
  caba: { station: 'Buenos Aires Observatorio', value: 25, exact: true },
  catamarca: { station: 'Catamarca Aero', value: 464, exact: true },
  chaco: { station: 'Resistencia Aero', value: 52, exact: true },
  chubut: {
    station: 'Trelew Aero',
    value: 43,
    exact: false,
    note: 'La capital (Rawson) no tiene estación SMN propia en el listado oficial — se usa Trelew Aero, la estación real más cercana (~20 km), no un promedio ni una estimación.',
  },
  cordoba: { station: 'Córdoba Aero', value: 495, exact: true },
  corrientes: { station: 'Corrientes Aero', value: 62, exact: true },
  entrerios: { station: 'Paraná Aero', value: 78, exact: true },
  formosa: { station: 'Formosa Aero', value: 60, exact: true },
  jujuy: { station: 'Jujuy Aero', value: 909, exact: true },
  lapampa: { station: 'Santa Rosa Aero', value: 191, exact: true },
  larioja: { station: 'La Rioja Aero', value: 438, exact: true },
  mendoza: { station: 'Mendoza Aero', value: 704, exact: true },
  misiones: { station: 'Posadas Aero', value: 125, exact: true },
  neuquen: { station: 'Neuquén Aero', value: 271, exact: true },
  rionegro: { station: 'Viedma Aero', value: 7, exact: true },
  salta: { station: 'Salta Aero', value: 1221, exact: true },
  sanjuan: { station: 'San Juan Aero', value: 598, exact: true },
  sanluis: { station: 'San Luis Aero', value: 713, exact: true },
  santacruz: { station: 'Río Gallegos Aero', value: 25, exact: true },
  santafe: {
    station: 'Sauce Viejo Aero',
    value: 18,
    exact: false,
    note: 'La capital (Santa Fe) no tiene estación SMN propia en el listado oficial — se usa Sauce Viejo Aero, el aeropuerto real que sirve a la ciudad (~10 km), no un promedio ni una estimación.',
  },
  santiagodelestero: { station: 'Santiago del Estero Aero', value: 199, exact: true },
  tucuman: { station: 'Tucumán Aero', value: 450, exact: true },
  tierradelfuego: { station: 'Ushuaia Aero', value: 57, exact: true },
};

if (Object.keys(CAPITAL_STATION_ALTITUDE).length !== 24) {
  throw new Error('CAPITAL_STATION_ALTITUDE debe cubrir las 24 jurisdicciones.');
}

function buildAltitude(provinceId) {
  const entry = CAPITAL_STATION_ALTITUDE[provinceId];
  if (!entry) return pendingDataPoint('altitude_capital', null);
  return {
    key: 'altitude_capital',
    value: entry.value,
    unit: 'm s. n. m.',
    period: null,
    sourceId: 'oficial-smn-listado-estaciones',
    evidenceLevel: 'A',
    availability: 'AVAILABLE',
    methodology: `Altura real de la estación meteorológica SMN "${entry.station}" (columna ALTURA del listado oficial), ${entry.exact ? 'la que lleva el nombre de la propia ciudad capital' : 'la estación real más cercana a la capital, a falta de una con su nombre exacto'}.`,
    limitation: entry.exact
      ? 'Es la altura del predio de la estación meteorológica, no necesariamente el punto más representativo de toda la ciudad capital (que puede tener relieve interno).'
      : entry.note,
    notes: null,
  };
}

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
    // Tier 5 de la jerarquía Cannabis-primero (Loop 4.3 §7/§16): CANNABIS → ARGENTINA →
    // PROVINCIA → AMBIENTE → EVIDENCIA, nunca "otra especie → suposición → Cannabis". La soja
    // deja de ser el sustituto por defecto — queda como último recurso, siempre después de la
    // evidencia general de Cannabis (tier 3) y nunca presentada sin esa evidencia al lado.
    evidenceTier: 5,
    methodology: 'Analogía biológica por categoría fotoperiódica (planta de día corto) más documentación agronómica argentina de zonificación por latitud — no es una medición ni un dato provincial directo de Cannabis sativa. El mecanismo fotoperiódico en sí (no la variación por latitud, que sigue sin fuente argentina para Cannabis) está respaldado por ciencia directa de la propia especie (Alter et al. 2024, Loop 4.1), no por analogía.',
    limitation: PHENOLOGICAL_REFERENCE_LIMITATION,
    referenceSpecies: 'Glycine max (soja)',
    referenceReason: 'Especie con la que se describió el fotoperiodismo vegetal (Garner y Allard, 1920) — misma categoría que Cannabis sativa: planta de día corto.',
    photoperiodResponse: 'En Cannabis sativa misma (no por analogía), el fotoperiodo de día corto reduce los niveles de giberelina y así dispara la inflorescencia condensada — se necesitan al menos 3 días consecutivos de oscuridad prolongada para que la señal se registre (Alter et al., 2024). La variación de ESE umbral según la latitud de cada provincia no tiene todavía fuente argentina propia para Cannabis; el patrón de "grupo de madurez" de la soja se usa solo para ilustrar que esa variación por latitud es un fenómeno agronómico real y documentado en el país, con umbrales distintos.',
    referenceRegion: `Su grupo de madurez recomendado varía por franja latitudinal en Argentina — esta jurisdicción está en ${regionLabel}.`,
    referenceSourceId: [
      'cientifica-garner-allard-1920-photoperiodism-discovery',
      'academica-truffer-2011-soja-entrerios-grupos-madurez',
      'cientifica-alter-2024-cannabis-fotoperiodo-giberelina',
    ],
    notes: `Referencia fenológica sobre ${aspect} — analogía de última instancia con otra especie (soja), no un dato directo de Cannabis sativa para esta provincia. Se muestra después de la evidencia general de Cannabis, nunca en su lugar.`,
  };
}

// Evidencia GENERAL de Cannabis sativa (Loop 4.3 §7, tier 3: "información general de Cannabis
// con respaldo científico") — antes de esta reescritura, la única referencia disponible para
// Cultivo/Cosecha en las 23 jurisdicciones sin evidencia directa era la analogía con soja (tier
// 5). Zhang et al. (2021) es evidencia DIRECTA de Cannabis sativa (27 cultivares de cáñamo reales,
// no una especie distinta) sobre por qué el umbral fotoperiódico y la duración hasta floración
// varían — nunca un calendario, pero sí ciencia de la propia especie que no dependía de comparar
// con otra planta.
const GENERAL_CANNABIS_EVIDENCE_LIMITATION =
  'Es evidencia directa de Cannabis sativa, pero internacional (cultivares de cáñamo de Norteamérica/Europa/Asia, ninguno argentino ni probado en Argentina) — explica por qué la duración del ciclo varía según el genotipo, nunca fija una fecha ni un calendario para ninguna provincia.';

function generalCannabisEvidenceDataPoint({ key, aspect }) {
  return {
    key,
    value: null,
    unit: null,
    period: null,
    sourceId: 'cientifica-zhang-2021-hemp-photoperiod-cultivars',
    evidenceLevel: 'B',
    availability: 'AVAILABLE',
    evidenceTier: 3,
    methodology: 'Evidencia científica directa de Cannabis sativa (27 cultivares de cáñamo probados bajo 11 fotoperiodos distintos), de alcance internacional — no argentina ni provincial.',
    limitation: GENERAL_CANNABIS_EVIDENCE_LIMITATION,
    referenceSpecies: 'Cannabis sativa (cultivares de cáñamo internacionales, no argentinos)',
    referenceReason: 'Evidencia directa de la propia especie sobre cómo varía el umbral fotoperiódico y la velocidad de floración entre cultivares — reemplaza la necesidad de recurrir primero a una analogía con otra especie.',
    photoperiodResponse: 'El umbral fotoperiódico crítico (a partir del cual el cultivar deja de crecer en altura y empieza a florecer) varió entre 13h45m y 15h30m según el cultivar en cáñamo de aceite esencial, y se mantuvo más uniforme (~14h) en cáñamo de fibra/grano (Zhang et al., 2021). Los cultivares de origen genético más norteño (Canadá, Polonia) florecieron más rápido (4 a 11 días bajo fotoperiodo crítico) que los de origen más sureño (China, 21 a 25 días) — un patrón de adaptación genética a la latitud de origen, no de la latitud donde se cultive hoy.',
    referenceRegion: 'Patrón documentado en cultivares internacionales de cáñamo — todavía no hay un estudio equivalente con cultivares argentinos ni ensayado en ninguna provincia del país.',
    referenceSourceId: [
      'cientifica-zhang-2021-hemp-photoperiod-cultivars',
      'cientifica-alter-2024-cannabis-fotoperiodo-giberelina',
    ],
    notes: `Evidencia científica general de Cannabis sativa sobre ${aspect} — no es un dato argentino ni provincial, pero es de la propia especie, no una analogía con otra planta.`,
  };
}

// Evidencia institucional para Jujuy (Loop 4.4.1) — nivel A para el hecho de que existe
// producción industrial de Cannabis medicinal bajo invernadero automatizado en la provincia.
// Cannava S.E. es la empresa estatal de Jujuy habilitada por ANMAT. Los comunicados oficiales
// CONFIRMAN: invernadero con control computarizado de temperatura, humedad, luz y riego;
// capacidad de 3-4 ciclos anuales; 80 toneladas/año. NO confirman fotoperiodo específico (18/6),
// iluminación suplementaria, temperaturas/HR exactas ni SOPs internos — esos datos no están en
// fuentes públicas. No se deben atribuir a Cannava condiciones no documentadas.
function jujuyCannavaDataPoint() {
  return {
    key: 'cultivo_evidencia_cannava_jujuy',
    value: 'Cannava S.E. — primera planta industrial de Cannabis medicinal habilitada por ANMAT en Argentina',
    unit: null,
    period: '2018–presente',
    sourceId: 'oficial-cannava-jujuy-planta-anmat-2022',
    evidenceLevel: 'A',
    availability: 'AVAILABLE',
    evidenceTier: 1,
    methodology: 'Comunicados oficiales del Gobierno de Jujuy y habilitación de ANMAT, leídos directamente.',
    limitation: 'Evidencia de producción industrial real bajo invernadero automatizado, pero sin datos públicos de condiciones técnicas numéricas (fotoperiodo, temperatura, HR, PPFD). No se debe generalizar a cultivo exterior ni a otras provincias.',
    referenceSpecies: 'Cannabis sativa L. (uso medicinal, grado farmacéutico)',
    referenceReason: 'Evidencia provincial directa de producción real bajo ambiente controlado — no una analogía ni una inferencia.',
    photoperiodResponse: 'Los invernaderos de Cannava son automatizados con control de luz, pero el fotoperiodo específico utilizado no figura en los comunicados oficiales públicos.',
    referenceRegion: 'Finca El Pongo, San Pedro, Jujuy. La evidencia es específica de esta instalación; no se extiende a cultivo exterior en la provincia ni a otras instalaciones privadas.',
    referenceSourceId: [
      'oficial-cannava-jujuy-planta-anmat-2022',
      'oficial-cannava-jujuy-franquicias-2023',
    ],
    notes: 'Jujuy es la segunda jurisdicción con evidencia de nivel A de producción real de Cannabis medicinal en Argentina, después de Chubut. La diferencia clave: Chubut documenta cultivo al aire libre (CONICET-CENPAT); Jujuy documenta producción bajo invernadero industrial (Cannava). Misiones documentó producción híbrida (MisioPharma/Biofábrica) pero la empresa fue disuelta en abril de 2026.',
  };
}

// Nota informativa para Misiones (Loop 4.4.1) — evidencia histórica de producción que ya no
// está activa. MisioPharma/Biofábrica Misiones S.A. fue disuelta por el gobierno provincial el
// 2026-04-14. No se debe presentar como empresa actualmente operativa.
function misionesHistoricalNote() {
  return {
    key: 'cultivo_nota_historica_misiones',
    value: 'MisioPharma / Biofábrica Misiones S.A. — empresa estatal disuelta en abril de 2026',
    unit: null,
    period: '2021–2026-04',
    sourceId: 'periodistica-misiones-biofabrica-disolucion-2026',
    evidenceLevel: 'C',
    availability: 'HISTORICAL',
    evidenceTier: 1,
    methodology: 'Fuente periodística (Infobae, 2026-04-14) verificada por búsqueda directa, confirmando la disolución.',
    limitation: 'Evidencia histórica: la empresa realizó producción híbrida invernadero + cielo abierto hasta su disolución, pero los datos técnicos de esa producción no están en fuentes públicas accesibles. La empresa ya no está operativa.',
    referenceSpecies: 'Cannabis sativa L. (uso medicinal)',
    referenceReason: 'Antecedente de producción provincial real que informa el contexto histórico, no una recomendación activa.',
    photoperiodResponse: 'Sin datos publicados de condiciones técnicas de producción.',
    referenceRegion: 'Posadas, Misiones. La evidencia es del período previo a la disolución de la empresa.',
    referenceSourceId: ['periodistica-misiones-biofabrica-disolucion-2026'],
    notes: 'Misiones tuvo producción real de Cannabis medicinal, pero la única empresa provincial que la realizaba fue disuelta en 2026. Esta nota documenta ese antecedente sin presentarlo como actividad actual.',
  };
}

// Evidencia DIRECTA para Chubut (Loop 4.3 §7/§11, tier 1) — cultivo real y documentado de
// Cannabis sativa al aire libre (ver también Jujuy/Cannava y Misiones/histórico más abajo, Loop
// 4.4.1, para las otras dos jurisdicciones con evidencia tier 1): los 6 cultivares
// CONICET-CENPAT registrados en INASE (Resolución 238/2023) y cultivados al aire libre en Puerto
// Madryn (verano 2022-2023, confirmado por comunicado oficial de CONICET). No se generaliza a
// ninguna otra provincia patagónica — la propia investigación de este proyecto (Loop 4.2) ya
// documentó que no hay evidencia de que estos cultivares se hayan probado fuera de Chubut.
function chubutCannabisEvidenceDataPoint(key) {
  return {
    key,
    value: 'Cultivares registrados: Malvina, Ballena Franca, Cenpat, Pachamama, Conicet, Mariquita',
    unit: null,
    period: '2022-2023 (verano)',
    sourceId: 'oficial-conicet-2023-comercializacion-semillas-cannabis',
    evidenceLevel: 'A',
    availability: 'AVAILABLE',
    evidenceTier: 1,
    methodology: 'Registro oficial de propiedad de cultivares (INASE, Resolución 238/2023) + comunicado oficial de CONICET que confirma el cultivo real al aire libre en Puerto Madryn, Chubut, con un ensayo a campo de 1200 semillas feminizadas de Malvina germinadas.',
    limitation: 'Es evidencia real de cultivo exitoso en Chubut, pero sin datos públicos de fenología completa (fechas exactas de siembra, floración o cosecha) más allá de "el verano pasado" — no se debe generalizar a otras provincias patagónicas ni inferir un calendario a partir de esta evidencia.',
    referenceSpecies: 'Cannabis sativa L. (cultivares CONICET-CENPAT: Malvina y Pachamama, comercializados; Ballena Franca, Cenpat, Conicet y Mariquita, registrados)',
    referenceReason: 'Evidencia provincial directa, no una analogía ni una inferencia — cultivo real, documentado oficialmente, en el territorio de esta provincia.',
    photoperiodResponse: 'Malvina (quimiotipo alto en THC) y Pachamama (quimiotipo alto en CBD) se cultivaron y cosecharon con éxito al aire libre en Puerto Madryn durante la temporada de verano 2022-2023, con un ensayo a campo de 1200 semillas feminizadas de Malvina — sin que la fuente consultada especifique fechas exactas de siembra, floración o cosecha.',
    referenceRegion: 'Puerto Madryn, Chubut — no hay evidencia de que estos cultivares se hayan probado en otra provincia.',
    referenceSourceId: [
      'oficial-inase-resolucion-238-2023-cultivares-cannabis',
      'oficial-conicet-2023-comercializacion-semillas-cannabis',
    ],
    notes: 'Única evidencia de nivel A de cultivo real de Cannabis sativa encontrada, entre las 24 jurisdicciones, para esta provincia — desarrollada por CONICET-CENPAT.',
  };
}

function buildEnvironment(provinceId) {
  const points = [
    pendingDataPoint('temperature_mean_annual', 'Requiere extracción manual de estaciones SMN (Estadísticas Climatológicas Normales 1991-2020, PDF >10MB no procesable en este entorno) o lectura completa del Atlas Climático Digital INTA 2010 — ninguno procesado todavía. El dataset abierto de "temperatura últimos 365 días" (datos.gob.ar) existe y es real, pero es TIEMPO reciente, no climatología de 30 años — se decidió deliberadamente no usarlo para no mezclar ambas categorías (Loop 4).'),
    pendingDataPoint('precipitation_annual', 'Idem temperatura — climatología de referencia sigue en PARTIAL_RESEARCH (ver `04_CLIMATE.md`). Solo se pudo obtener una TENDENCIA de cambio porcentual para 3 provincias (ver `precipitation_trend_1991_2020_vs_1981_2010` más abajo), no un valor absoluto.'),
    pendingDataPoint('frost_dates', 'Bloqueado por acceso a dominios INTA (climayagua.inta.gob.ar) — reintentado en el Loop 4 (conexión rechazada, mismo bloqueo ya documentado en `TODO.md`, sección BLOCKED).'),
  ];

  const stationCount = SMN_STATION_COUNT[provinceId];
  if (typeof stationCount === 'number') {
    points.push({
      key: 'smn_station_count',
      value: stationCount,
      unit: 'estaciones',
      period: null,
      sourceId: 'oficial-smn-listado-estaciones',
      evidenceLevel: 'A',
      availability: 'AVAILABLE',
      methodology: 'Conteo directo del listado oficial de estaciones meteorológicas del SMN, filtrado por provincia.',
      limitation: 'Es una medida de cobertura de la red de observación, no un valor climático — una provincia con pocas estaciones puede tener climas internos no representados por ninguna de ellas.',
      notes: null,
    });
  }

  const classification = CLIMATE_CLASSIFICATION_CENTROID[provinceId];
  if (classification) {
    points.push({
      key: 'climate_classification_centroid',
      value: classification,
      unit: null,
      period: null,
      sourceId: 'oficial-indec-anida-tipos-climaticos-wfs',
      evidenceLevel: 'A',
      availability: 'AVAILABLE',
      methodology: 'Punto-en-polígono (ray casting) entre el centroide geométrico provincial ya verificado (Fase 11) y la capa geoespacial oficial IGN/INDEC de tipos de clima — cálculo determinista sobre datos oficiales, no una estimación editorial.',
      limitation: HETEROGENEOUS_PROVINCES.has(provinceId)
        ? 'Corresponde solo al centroide geométrico — esta provincia ya está documentada como internamente heterogénea (`03_GEO.md`), así que otras zonas de su territorio pueden tener un tipo climático distinto del indicado acá.'
        : 'Corresponde al centroide geométrico de la provincia, no a la totalidad de su superficie.',
      notes: null,
    });
  }

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

// Fechas de referencia de solsticios/equinoccios (Loop 4.3 §6/§12) — fechas calendario típicas
// del hemisferio sur, usadas solo para fijar el DÍA DEL AÑO que alimenta el mismo cálculo
// astronómico determinista ya verificado (`dayLengthHours`, Spencer 1971 + Cooper 1969). No son
// datos nuevos por investigar ni varían de forma relevante para el uso editorial de esta ficha
// (la fecha exacta de un equinoccio/solsticio puede correrse un día de un año a otro; esa
// variación es irrelevante frente al propósito de comparar estaciones entre sí).
const SEASON_REFERENCE_DATES = [
  { season: 'verano', label: 'Verano (solsticio de diciembre)', monthDay: [11, 21] },
  { season: 'otono', label: 'Otoño (equinoccio de marzo)', monthDay: [2, 20] },
  { season: 'invierno', label: 'Invierno (solsticio de junio)', monthDay: [5, 21] },
  { season: 'primavera', label: 'Primavera (equinoccio de septiembre)', monthDay: [8, 22] },
];

// "Duración del día astronómico" (de salida a puesta de sol) NO es lo mismo que "horas de sol"
// reales de un lugar (que restan nubosidad, niebla, horizonte obstruido por relieve, etc.) — esta
// aclaración se repite en cada dato (Loop 4.3 §6, pedido explícito) para que nunca se lea como una
// medición de brillo solar real.
const ASTRONOMICAL_DAY_LIMITATION =
  'Es la duración del día astronómico (de salida a puesta de sol), calculada solo a partir de la latitud — no son "horas de sol" reales del lugar, que además dependen de nubosidad, niebla y relieve que este cálculo no incluye.';

function buildLight(latitude) {
  if (typeof latitude !== 'number') return [];
  const year = new Date().getUTCFullYear();
  const seasonal = SEASON_REFERENCE_DATES.map(({ season, label, monthDay: [month, day] }) => {
    const date = new Date(Date.UTC(year, month, day));
    const base = getPhotoperiodDataPoint(latitude, date);
    return {
      ...base,
      key: `day_length_hours_${season}`,
      season,
      seasonLabel: label,
      limitation: ASTRONOMICAL_DAY_LIMITATION,
      notes: ASTRONOMICAL_DAY_LIMITATION,
    };
  });
  return [
    { ...getPhotoperiodDataPoint(latitude, new Date()), season: 'hoy', seasonLabel: 'Hoy', limitation: ASTRONOMICAL_DAY_LIMITATION, notes: ASTRONOMICAL_DAY_LIMITATION },
    ...seasonal,
  ];
}

// Cultivo y Cosecha son bloques visuales separados (pedido explícito de la Fase "FICHA
// PROVINCIAL" de este loop) pero comparten el mismo array `cultivation`, distinguidos por el
// prefijo de `key` (`cultivo_`/`cosecha_`) — evita extender el modelo con un top-level nuevo
// cuando no hace falta (ya lo permitía la forma definida en 3B).
//
// Orden de prioridad Cannabis-primero (Loop 4.3 §7/§16 — nunca al revés):
//   tier 1: Cannabis específico de la provincia — Chubut (cultivo exterior, CONICET-CENPAT),
//           Jujuy (producción industrial bajo invernadero, Cannava S.E.) y Misiones (antecedente
//           histórico, MisioPharma disuelta 2026-04). Resto de provincias: sin tier 1.
//   tier 2: Cannabis específico de una región argentina comparable (sin evidencia encontrada
//           todavía para ninguna provincia — no se inventa una comparación sin fuente)
//   tier 3: información general de Cannabis con respaldo científico (Zhang et al. 2021 + Alter et
//           al. 2024) — se muestra para las 24 jurisdicciones, no solo cuando falta algo más
//   tier 4: inferencia ambiental (ya cubierta por los bloques Ambiente/Luz, no se duplica acá)
//   tier 5: analogía con otra especie (soja) — último recurso, siempre después del tier 3, nunca
//           en su lugar
function buildCultivation(geoContext, provinceId) {
  const regionLabel = geoContext?.regionLabel ?? 'su región';
  const points = [
    pendingDataPoint('cultivo_ventana_directa', 'Sin fuente provincial/argentina directa (nivel A/B) para el momento de transición vegetativo→reproductivo de Cannabis sativa — ver `51_LOOP_3B_PROVINCIAL_DATA.md` §12.'),
  ];

  if (provinceId === 'chubut') {
    points.push(chubutCannabisEvidenceDataPoint('cultivo_evidencia_directa_chubut'));
  }

  if (provinceId === 'jujuy') {
    points.push(jujuyCannavaDataPoint());
  }

  if (provinceId === 'misiones') {
    points.push(misionesHistoricalNote());
  }

  points.push(
    generalCannabisEvidenceDataPoint({
      key: 'cultivo_evidencia_general_cannabis',
      aspect: 'la transición de la fase vegetativa a la reproductiva (floración) por efecto del fotoperiodo',
    }),
    phenologicalReferenceDataPoint({
      key: 'cultivo_referencia_fenologica',
      aspect: 'la transición de la fase vegetativa a la reproductiva (floración) por efecto del fotoperiodo',
      regionLabel,
    }),
    pendingDataPoint('cosecha_ventana_directa', 'Sin fuente provincial/argentina directa (nivel A/B) para ventana de cosecha de Cannabis sativa — ver `51_LOOP_3B_PROVINCIAL_DATA.md` §13.'),
  );

  if (provinceId === 'chubut') {
    points.push(chubutCannabisEvidenceDataPoint('cosecha_evidencia_directa_chubut'));
  }

  points.push(
    generalCannabisEvidenceDataPoint({
      key: 'cosecha_evidencia_general_cannabis',
      aspect: 'cómo varía el tiempo hasta la madurez/cosecha según el genotipo',
    }),
    phenologicalReferenceDataPoint({
      key: 'cosecha_referencia_fenologica',
      aspect: 'cómo varía el tiempo hasta la madurez/cosecha según la latitud',
      regionLabel,
    }),
  );

  return points;
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
      altitude: buildAltitude(provinceId),
    },
    map: {
      // Referencia al dataset ya existente — nunca una copia del path SVG.
      provinceId,
      source: 'lib/geo/argentinaProvinces.js (ARGENTINA_PROVINCES)',
    },
    environment: buildEnvironment(provinceId),
    light: buildLight(location.lat),
    cultivation: buildCultivation(geoContext, provinceId),
    sources: [], // se completa en runtime uniendo los sourceId presentes en environment/light/cultivation
    metadata: {
      generatedAt: new Date().toISOString(),
      lastReviewed: '2026-09-13',
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
  // Loop 4.4.1 — nuevas entradas
  'ciclo-de-vida': ['light', 'cultivation'],
  poscosecha: ['environment', 'cultivation'],
  'marco-editorial': ['context'],
};

export const MARCO_EDITORIAL_HIDDEN_BLOCKS = ['environment', 'cultivation'];
