// Coordenadas representativas por provincia (Fase 11).
//
// Resolución deliberada: PROVINCIA, no departamento/partido ni zona exacta, y
// mucho menos una dirección o GPS del usuario — coherente con `10_PRIVACY.md`
// ("ubicación siempre aproximada") y con el modelo geográfico ya establecido
// (`03_GEO.md`). Mi Cultivo solo guarda a qué provincia pertenece el cultivo;
// nunca coordenadas propias de la persona.
//
// Fuente de las coordenadas: centroide geométrico oficial de cada provincia,
// vía georef-ar-api (`apis.datos.gob.ar/georef`, la misma API oficial —
// respaldada por IGN— ya usada en la Fase 8A para la geometría del mapa).
// Consultado el 2026-09-11 con:
//   https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre,centroide
//
// Excepción documentada: el centroide geométrico oficial de "Tierra del Fuego,
// Antártida e Islas del Atlántico Sur" cae dentro del territorio antártico
// reclamado (~-82.5 de latitud) — inútil como referencia meteorológica para
// un cultivo (ahí no hay estaciones ni sentido agronómico). Se usa en su lugar
// el centroide oficial del municipio de Ushuaia (misma fuente/API), siguiendo
// el mismo criterio ya aplicado en la Fase 8A al recortar la geometría del
// mapa a la Isla Grande + Isla de los Estados.

export const PROVINCE_LOCATIONS = {
  jujuy: { name: 'Jujuy', lat: -23.32, lon: -65.7644 },
  salta: { name: 'Salta', lat: -24.2993, lon: -64.8142 },
  formosa: { name: 'Formosa', lat: -24.8951, lon: -59.9322 },
  chaco: { name: 'Chaco', lat: -26.387, lon: -60.7651 },
  misiones: { name: 'Misiones', lat: -26.8753, lon: -54.6516 },
  corrientes: { name: 'Corrientes', lat: -28.7742, lon: -57.8011 },
  tucuman: { name: 'Tucumán', lat: -26.9483, lon: -65.3648 },
  catamarca: { name: 'Catamarca', lat: -27.336, lon: -66.9479 },
  santiagodelestero: { name: 'Santiago del Estero', lat: -27.7834, lon: -63.2526 },
  larioja: { name: 'La Rioja', lat: -29.6849, lon: -67.1818 },
  cordoba: { name: 'Córdoba', lat: -32.1448, lon: -63.802 },
  santafe: { name: 'Santa Fe', lat: -30.7088, lon: -60.9507 },
  entrerios: { name: 'Entre Ríos', lat: -32.0589, lon: -59.2013 },
  sanjuan: { name: 'San Juan', lat: -30.8657, lon: -68.8882 },
  mendoza: { name: 'Mendoza', lat: -34.6304, lon: -68.5829 },
  sanluis: { name: 'San Luis', lat: -33.7611, lon: -66.0252 },
  'buenos-aires': { name: 'Buenos Aires', lat: -36.6774, lon: -60.5585 },
  caba: { name: 'CABA', lat: -34.6144, lon: -58.4459 },
  lapampa: { name: 'La Pampa', lat: -37.1351, lon: -65.4476 },
  neuquen: { name: 'Neuquén', lat: -38.642, lon: -70.1199 },
  rionegro: { name: 'Río Negro', lat: -40.4051, lon: -67.2297 },
  chubut: { name: 'Chubut', lat: -43.7886, lon: -68.5267 },
  santacruz: { name: 'Santa Cruz', lat: -48.8155, lon: -69.9558 },
  tierradelfuego: { name: 'Tierra del Fuego', lat: -54.804, lon: -68.3533 },
};

export const PROVINCE_OPTIONS = Object.entries(PROVINCE_LOCATIONS).map(([id, { name }]) => ({ id, name }));

export function getProvinceLocation(provinceId) {
  return PROVINCE_LOCATIONS[provinceId] ?? null;
}
