// Capa de contexto geográfico por provincia (Fase 47.2).
//
// Reutiliza `PROVINCE_LOCATIONS` (`lib/weather/locations.js`, Fase 11) como única fuente de
// nombre y latitud por provincia — no se duplica el listado de provincias ni se inventa ninguna
// coordenada nueva. La agrupación en macrorregión (`PROVINCE_REGION`) es la regionalización
// estadística de uso corriente en Argentina (NOA/NEA/Cuyo/Pampeana/Patagonia, la misma división
// que ya usa INDEC para sus estadísticas regionales) reutilizada acá exclusivamente como
// agrupación GEOGRÁFICA editorial para poder diferenciar provincias sin inventar nada — NO es
// una clasificación climática: la clasificación climática de Argentina (Köppen, normales SMN)
// sigue en estado `PARTIAL_RESEARCH` (ver `04_CLIMATE.md`) y esta capa no la adelanta ni la
// sustituye. Ver `MASTER_PACKAGE/47_2_PROVINCIAL_CONTEXT.md` para el detalle de esta decisión.

import { PROVINCE_LOCATIONS } from '../weather/locations';

export const REGION_LABELS = {
  noa: 'el Noroeste argentino',
  nea: 'el Noreste argentino',
  cuyo: 'Cuyo',
  pampeana: 'la región pampeana',
  patagonia: 'la Patagonia',
};

// Agrupación de las 24 jurisdicciones en 5 macrorregiones (fuente: regionalización
// estadística de uso corriente en Argentina — ver nota arriba). CABA se agrupa con la región
// pampeana junto con la provincia de Buenos Aires, siguiendo el mismo criterio.
const PROVINCE_REGION = {
  jujuy: 'noa',
  salta: 'noa',
  catamarca: 'noa',
  tucuman: 'noa',
  santiagodelestero: 'noa',
  larioja: 'noa',
  formosa: 'nea',
  chaco: 'nea',
  corrientes: 'nea',
  misiones: 'nea',
  mendoza: 'cuyo',
  sanjuan: 'cuyo',
  sanluis: 'cuyo',
  'buenos-aires': 'pampeana',
  caba: 'pampeana',
  cordoba: 'pampeana',
  entrerios: 'pampeana',
  lapampa: 'pampeana',
  santafe: 'pampeana',
  neuquen: 'patagonia',
  rionegro: 'patagonia',
  chubut: 'patagonia',
  santacruz: 'patagonia',
  tierradelfuego: 'patagonia',
};

// Bandas de latitud (no climáticas): una lectura directa del dato geográfico ya verificado en
// `PROVINCE_LOCATIONS` (centroide oficial georef-ar-api), usada solo para describir cuánto varía
// la duración del día entre estaciones según qué tan al norte o al sur está una provincia —
// un hecho astronómico, no una afirmación de clima.
function latitudeBand(lat) {
  if (typeof lat !== 'number') return null;
  if (lat > -28) return 'extremo norte';
  if (lat > -34) return 'centro-norte';
  if (lat > -40) return 'centro';
  if (lat > -46) return 'patagonia norte';
  return 'patagonia sur';
}

export function getProvinceGeoContext(provinceId) {
  const location = PROVINCE_LOCATIONS[provinceId];
  const region = PROVINCE_REGION[provinceId];
  if (!location || !region) return null;
  return {
    id: provinceId,
    name: location.name,
    lat: location.lat,
    region,
    regionLabel: REGION_LABELS[region],
    latitudeBand: latitudeBand(location.lat),
  };
}

export function isKnownProvinceId(provinceId) {
  return Boolean(PROVINCE_REGION[provinceId]);
}
