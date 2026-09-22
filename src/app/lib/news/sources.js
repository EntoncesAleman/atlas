// Fuentes de noticias del Skill de Noticias del Atlas — lista curada a mano, verificada por
// lectura directa (cada URL se probó con una petición real antes de agregarla acá; no hay
// ninguna fuente incluida "porque debería existir"). Ampliar esta lista requiere el mismo
// criterio: organismo público, universidad/centro de investigación, publicación científica o
// medio periodístico reconocido — nunca un blog comercial, un growshop o un agregador sin
// editorial propia.
//
// `countryScope`/`defaultCategory`/`defaultTags` son el criterio por defecto de cada fuente
// (de dónde es y de qué habla en general); el Skill los usa como base y los ajusta por ítem
// según palabras clave del propio título/resumen cuando corresponde.

export const NEWS_CATEGORIES = ['marco-legal', 'industria', 'investigacion', 'cultivo', 'institucional'];

export const NEWS_COUNTRY_SCOPES = ['argentina', 'mundo'];

export const NEWS_SOURCES = [
  {
    id: 'inta-informa',
    name: 'INTA Informa',
    feedUrl: 'https://intainforma.inta.gob.ar/feed/',
    countryScope: 'argentina',
    defaultCategory: 'institucional',
    defaultTags: ['argentina', 'cultivo'],
    kind: 'rss'
  },
  {
    id: 'chequeado',
    name: 'Chequeado',
    feedUrl: 'https://chequeado.com/feed/',
    countryScope: 'argentina',
    defaultCategory: 'marco-legal',
    defaultTags: ['argentina', 'contexto'],
    kind: 'rss'
  },
  {
    id: 'nature-plant-sciences',
    name: 'Nature — Plant Sciences',
    feedUrl: 'https://www.nature.com/subjects/plant-sciences.rss',
    countryScope: 'mundo',
    defaultCategory: 'investigacion',
    defaultTags: ['contexto'],
    kind: 'rss'
  },
  {
    id: 'sciencedaily-botany',
    name: 'ScienceDaily — Botany',
    feedUrl: 'https://www.sciencedaily.com/rss/plants_animals/botany.xml',
    countryScope: 'mundo',
    defaultCategory: 'investigacion',
    defaultTags: ['contexto'],
    kind: 'rss'
  }
];

// Palabras clave para evaluar relevancia dentro del universo editorial del Atlas (Cannabis,
// cáñamo, cultivo). Un feed generalista (Chequeado, Nature, ScienceDaily) trae de todo — sin
// este filtro, el Skill terminaría proponiendo noticias sin relación con el proyecto. Un feed
// ya temático (INTA Informa) igual pasa por el mismo filtro por consistencia, no porque haga
// falta.
export const RELEVANCE_KEYWORDS = [
  'cannabis',
  'cáñamo',
  'canamo',
  'hemp',
  'marihuana',
  'marijuana',
  'thc',
  'cbd',
  'cultivo',
  'cultivar',
  'sedronar',
  'reprocann',
  'ariccame',
  'agroindustria del cáñamo',
  'cannabicultura',
  'psicoactiv'
];
