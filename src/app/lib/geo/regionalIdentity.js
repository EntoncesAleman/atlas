import { getProvinceGeoContext } from './provinceContext';

const apn = 'https://www.argentina.gob.ar/parquesnacionales/ecorregiones/';
export const TERRITORY_SOURCES = {
  indec: { title: 'INDEC · División regional', url: 'https://www.indec.gob.ar/ftp/cuadros/publicaciones/anuario_estadistico_2023.pdf' },
  smn: { title: 'SMN · Atlas climático 1991–2020', url: 'https://repositorio.smn.gob.ar/handle/20.500.12160/2986' },
  puna: { title: 'APN · Puna', url: `${apn}puna` },
  yungas: { title: 'APN · Yungas', url: `${apn}yungas` },
  chaco: { title: 'APN · Chaco Seco', url: `${apn}chaco-seco` },
  selva: { title: 'APN · Selva Paranense', url: `${apn}selva-paranense` },
  ibera: { title: 'APN · Esteros del Iberá', url: `${apn}esteros-del-ibera` },
  monte: { title: 'APN · Monte de Sierras y Bolsones', url: `${apn}monte-de-sierras-y-bolsones` },
  pampa: { title: 'APN · Pampa', url: `${apn}pampa` },
  estepa: { title: 'APN · Estepa Patagónica', url: `${apn}estepa-patagonica` },
  bosques: { title: 'APN · Bosques Patagónicos', url: `${apn}bosques-patagonicos` },
};

// Editorial landscape families. Boundaries follow the existing geographic grouping;
// environmental descriptions refer to named ecoregions, not uniform provincial climates.
export const REGIONAL_IDENTITIES = {
  noa: {
    name: 'Noroeste', shortName: 'NOA', banner: '/atlas/field/banner-noa.webp', color: '#a7926e',
    title: 'Entre la puna y las yungas',
    description: 'La altura cambia el paisaje del Noroeste. La puna tiene arbustos bajos y salinas; sobre las laderas orientales, las yungas forman una selva de montaña. Hacia las tierras bajas también aparece el bosque chaqueño.',
    environments: ['Puna', 'Yungas', 'Chaco Seco'], sourceIds: ['puna', 'yungas', 'chaco'],
    note: 'La altura y la exposición de cada valle importan. El paisaje de una quebrada no describe toda una provincia.',
  },
  nea: {
    name: 'Noreste', shortName: 'NEA', banner: '/atlas/field/banner-nea.webp', color: '#5e7960',
    title: 'Selva, esteros y bosque chaqueño',
    description: 'La selva misionera y los esteros correntinos ofrecen dos paisajes del Noreste. El bosque chaqueño suma otro ambiente, con sectores más secos. La presencia del agua y la vegetación cambia dentro de la región.',
    environments: ['Selva Paranense', 'Esteros del Iberá', 'Chaco Seco'], sourceIds: ['selva', 'ibera', 'chaco'],
    note: 'Misiones, Corrientes, Chaco y Formosa comparten una región geográfica y reúnen ambientes diferentes.',
  },
  cuyo: {
    name: 'Cuyo', shortName: 'Cuyo', banner: '/atlas/field/banner-cuyo.webp', color: '#b3a184',
    title: 'La cordillera y el monte',
    description: 'Al pie de los Andes, el monte ocupa valles y laderas con vegetación arbustiva y pocas lluvias. La montaña y las tierras bajas tienen condiciones distintas; la provincia elegida es el comienzo del recorrido.',
    environments: ['Monte de Sierras y Bolsones'], sourceIds: ['monte'],
    note: 'Para conocer temperaturas y precipitaciones de un lugar, consultá las normales de una estación cercana.',
  },
  pampeana: {
    name: 'Región Pampeana', shortName: 'Pampeana', banner: '/atlas/field/banner-pampeana.webp', color: '#929970',
    title: 'El horizonte de los pastizales',
    description: 'La ecorregión Pampa tiene extensas llanuras, lagunas y ríos de curso lento. Las sierras de Tandil y de la Ventana interrumpen el horizonte. Su paisaje es una parte de la región geográfica pampeana.',
    environments: ['Pampa'], sourceIds: ['pampa'],
    note: 'La región geográfica incluye ambientes fuera de la ecorregión Pampa. CABA se agrupa aquí para navegar el Atlas.',
  },
  patagonia: {
    name: 'Patagonia', shortName: 'Patagonia', banner: '/atlas/field/banner-patagonia.webp', color: '#7b9187',
    title: 'Del bosque a la estepa',
    description: 'Los bosques patagónicos siguen una franja de la cordillera desde Neuquén hasta Tierra del Fuego. La estepa se extiende por gran parte del territorio, con escasas lluvias, frío y viento. Son paisajes que pueden convivir en una misma provincia.',
    environments: ['Bosques Patagónicos', 'Estepa Patagónica'], sourceIds: ['bosques', 'estepa'],
    note: 'Un bosque junto a un lago no representa las condiciones de toda la Patagonia. La zona elegida ayuda a ubicar la lectura.',
  },
};

export function getRegionalIdentity(provinceId) {
  const province = getProvinceGeoContext(provinceId);
  return province ? { ...REGIONAL_IDENTITIES[province.region], id: province.region, province } : null;
}
