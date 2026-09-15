// Registro estructurado de assets visuales.
// Deriva de MASTER_PACKAGE/ASSET_REGISTRY.md — no se buscaron assets nuevos en esta fase,
// no se reemplazó ningún archivo de Fase 6. Cada asset referencia su fuente real vía sourceId
// (ver ./sources.js) salvo los assets internos del proyecto (license: 'Interno').
// Estados permitidos: ACTIVE, REVIEW, ARCHIVED, PENDING.

export const assets = [
  {
    id: 'asset-fundamentos-koehler',
    file: '/atlas/categories/real/category-fundamentos-real.jpg',
    type: 'illustration',
    categoryId: 'fundamentos',
    entryId: null,
    sourceId: 'visual-koehler-1887',
    author: 'Walther Otto Müller',
    license: 'Dominio público',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cannabis_sativa_Koehler_drawing.jpg',
    alt: 'Lámina botánica histórica de Cannabis sativa (Köhler, 1887, dominio público) mostrando planta macho y hembra con detalle de flores, polen y semillas.',
    credit: 'W. Müller, Köhler\'s Medizinal-Pflanzen (1887) — dominio público',
    status: 'ACTIVE'
  },
  {
    id: 'asset-germinacion-diagram',
    file: '/atlas/categories/real/entry-germinacion-real.svg',
    type: 'diagram',
    categoryId: 'germinacion',
    entryId: 'germinacion',
    sourceId: 'visual-germination-diagram',
    author: 'Begoon (derivado de Kat1992)',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Germination-en.svg',
    // Alt revisado en Fase 7B1 (piloto Germinación): antes mezclaba descripción y atribución.
    // La atribución ya vive en `credit` — el alt queda puramente descriptivo de lo visible.
    alt: 'Diagrama comparativo de germinación epigea e hipogea: muestra la semilla, la radícula, el hipocótilo y la emergencia de las hojas cotiledonares por encima o por debajo de la superficie del sustrato según el tipo de germinación.',
    credit: 'Begoon, derivado de Kat1992 — CC BY-SA 3.0, vía Wikimedia Commons',
    status: 'ACTIVE'
  },
  {
    id: 'asset-suelo-agua-profile',
    file: '/atlas/categories/real/category-suelo-y-agua-real.jpg',
    type: 'photo',
    categoryId: 'suelo-y-agua',
    entryId: 'sustrato-y-drenaje',
    sourceId: 'visual-soil-profile',
    author: 'Mclund',
    license: 'CC BY 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Soil_profile_0-125cm.jpg',
    alt: 'Fotografía documental de un perfil de suelo excavado hasta 1,25 m de profundidad, con marcadores señalando los distintos horizontes (Mclund, CC BY 4.0).',
    credit: 'Mclund — CC BY 4.0, vía Wikimedia Commons',
    status: 'ACTIVE'
  },
  {
    id: 'asset-luz-clima-cover',
    file: '/atlas/categories/real/category-luz-y-clima-cover-real.jpg',
    type: 'photo',
    categoryId: 'luz-y-clima',
    entryId: null,
    sourceId: 'visual-plant-under-phytolamp',
    author: 'Alla Varta',
    license: 'CC BY 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Plant_under_a_phytolamp.jpg',
    alt: 'Fotografía documental de flores de ciclamen iluminadas por una lámpara de cultivo artificial de tono violeta, en un ambiente interior oscuro (CC BY 4.0).',
    credit: 'Alla Varta — CC BY 4.0, vía Wikimedia Commons',
    status: 'ACTIVE'
  },
  {
    id: 'asset-luz-clima-photoperiodism',
    file: '/atlas/categories/real/category-luz-y-clima-real.jpg',
    type: 'diagram',
    categoryId: 'luz-y-clima',
    entryId: 'luz-y-fotoperiodo',
    sourceId: 'visual-photoperiodism-diagram',
    author: 'Giovnnni pastrami',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Photoperiodism_in_plants.jpg',
    alt: 'Diagrama científico real del ciclo del fitocromo (Pr/Pfr) que explica cómo el fotoperiodo activa la floración en plantas de día largo y de día corto (CC BY-SA 4.0).',
    credit: 'Giovnnni pastrami — CC BY-SA 4.0, vía Wikimedia Commons',
    status: 'ACTIVE'
  },
  {
    id: 'asset-sanidad-spider-mite',
    file: '/atlas/categories/real/category-sanidad-real.jpg',
    type: 'photo',
    categoryId: 'sanidad',
    entryId: 'lectura-de-senales',
    sourceId: 'visual-red-spider-mite',
    author: 'Aleksey Gnilenkov',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Red_spider_mite_(Tetranychus_urticae).jpg',
    alt: 'Fotografía macro documental de arañuela roja (Tetranychus urticae), una plaga común del cultivo (Aleksey Gnilenkov, CC BY 2.0).',
    credit: 'Aleksey Gnilenkov — CC BY 2.0, vía Wikimedia Commons',
    status: 'ACTIVE'
  },
  {
    id: 'asset-cultivo-hemp-field',
    file: '/atlas/categories/real/category-cultivo-real.jpg',
    type: 'photo',
    categoryId: 'cultivo',
    entryId: 'cultivo-en-secuencia',
    sourceId: 'visual-industrial-hemp-field',
    author: 'Aleks',
    license: 'GFDL 1.2+ / CC BY-SA 3.0 y compatibles',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Industrialhemp.jpg',
    alt: 'Fotografía documental de un cultivo exterior de cáñamo industrial (Cannabis sativa) en Francia (Aleks, CC BY-SA/GFDL).',
    credit: 'Aleks — CC BY-SA 3.0, vía Wikimedia Commons',
    status: 'ACTIVE'
  },
  {
    id: 'asset-cosecha-drying',
    file: '/atlas/categories/real/category-cosecha-real.jpg',
    type: 'photo',
    categoryId: 'cosecha',
    entryId: 'cosecha-y-maduracion',
    sourceId: 'visual-cannabis-drying',
    author: '"Cannabis Pictures"',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cannabis_Drying_out_the_crop_(16558794823).jpg',
    alt: 'Fotografía documental de inflorescencias de cannabis colgadas para su secado tras la cosecha (CC BY 2.0).',
    credit: 'Cannabis Pictures — CC BY 2.0, vía Wikimedia Commons',
    status: 'ACTIVE',
    knownIssues: 'Reserva estética documentada: tono más cálido/atractivo que el resto de la serie, en tensión con la regla anti-dispensario. Ver ASSET_REGISTRY.md.'
  },
  {
    id: 'asset-historia-koehler',
    file: '/atlas/categories/real/category-fundamentos-real.jpg',
    type: 'illustration',
    categoryId: 'historia',
    entryId: null,
    sourceId: 'visual-koehler-1887',
    author: 'Walther Otto Müller',
    license: 'Dominio público',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cannabis_sativa_Koehler_drawing.jpg',
    alt: 'Lámina botánica histórica de Cannabis sativa (Köhler, 1887, dominio público) mostrando planta macho y hembra con detalle de flores, polen y semillas.',
    credit: 'W. Müller, Köhler\'s Medizinal-Pflanzen (1887) — dominio público',
    status: 'ACTIVE',
    knownIssues: 'Mismo archivo real ya usado como portada de "Crecimiento" (`asset-fundamentos-koehler`) — reutilización deliberada de un asset histórico ya verificado, no una imagen nueva sin licenciar (Loop 4.1). Reforzado temáticamente: es una ilustración de 1887, apropiada para una categoría de Historia.'
  },
  {
    id: 'asset-historia-de-la-planta-koehler',
    file: '/atlas/categories/real/category-fundamentos-real.jpg',
    type: 'illustration',
    categoryId: null,
    entryId: 'historia-de-la-planta',
    sourceId: 'visual-koehler-1887',
    author: 'Walther Otto Müller',
    license: 'Dominio público',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cannabis_sativa_Koehler_drawing.jpg',
    alt: 'Lámina botánica histórica de Cannabis sativa (Köhler, 1887, dominio público) mostrando planta macho y hembra con detalle de flores, polen y semillas.',
    credit: 'W. Müller, Köhler\'s Medizinal-Pflanzen (1887) — dominio público',
    status: 'ACTIVE',
    knownIssues: 'Mismo archivo ya usado como portada de "Crecimiento" y de la categoría "Historia" (Loop 4.1) — reutilización deliberada de un asset histórico ya verificado, coherente con el tema de la entrada.'
  },
  {
    id: 'asset-genetica-y-tipos-photoperiodism',
    file: '/atlas/categories/real/category-luz-y-clima-real.jpg',
    type: 'diagram',
    categoryId: 'genetica-tipos',
    entryId: 'genetica-y-tipos',
    sourceId: 'visual-photoperiodism-diagram',
    author: 'Giovnnni pastrami',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Photoperiodism_in_plants.jpg',
    alt: 'Diagrama científico real del ciclo del fitocromo (Pr/Pfr) que explica cómo el fotoperiodo activa la floración en plantas de día largo y de día corto (CC BY-SA 4.0).',
    credit: 'Giovnnni pastrami — CC BY-SA 4.0, vía Wikimedia Commons',
    status: 'ACTIVE',
    knownIssues: 'Mismo archivo ya usado en la entrada "luz-y-fotoperiodo" (Loop 4.1) — reutilización deliberada: esta entrada dedica una sección entera a explicar el mecanismo fotoperiódico, el mismo que ilustra el diagrama.'
  },
  {
    id: 'asset-poda-hemp-field',
    file: '/atlas/categories/real/category-cultivo-real.jpg',
    type: 'photo',
    categoryId: 'poda',
    entryId: null,
    sourceId: 'visual-industrial-hemp-field',
    author: 'Aleks',
    license: 'GFDL 1.2+ / CC BY-SA 3.0 y compatibles',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Industrialhemp.jpg',
    alt: 'Fotografía documental de un cultivo exterior de cáñamo industrial (Cannabis sativa) en Francia (Aleks, CC BY-SA/GFDL).',
    credit: 'Aleks — CC BY-SA 3.0, vía Wikimedia Commons',
    status: 'ACTIVE',
    knownIssues: 'Mismo archivo ya usado como portada de "Cultivo" (`asset-cultivo-hemp-field`) — reutilización deliberada de un asset ya verificado; no se buscó un asset nuevo específico de poda en esta fase (corrección de estructura, sin investigación de contenido nueva).'
  },
  {
    id: 'asset-fertilizacion-hemp-field',
    file: '/atlas/categories/real/category-cultivo-real.jpg',
    type: 'photo',
    categoryId: 'fertilizacion',
    entryId: null,
    sourceId: 'visual-industrial-hemp-field',
    author: 'Aleks',
    license: 'GFDL 1.2+ / CC BY-SA 3.0 y compatibles',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Industrialhemp.jpg',
    alt: 'Fotografía documental de un cultivo exterior de cáñamo industrial (Cannabis sativa) en Francia (Aleks, CC BY-SA/GFDL).',
    credit: 'Aleks — CC BY-SA 3.0, vía Wikimedia Commons',
    status: 'ACTIVE',
    knownIssues: 'Mismo archivo ya usado como portada de "Cultivo" (`asset-cultivo-hemp-field`) — reutilización deliberada de un asset ya verificado; no se buscó un asset nuevo específico de fertilización en esta fase (corrección de estructura, sin investigación de contenido nueva).'
  },
  {
    id: 'asset-manejo-poscosecha-drying',
    file: '/atlas/categories/real/category-cosecha-real.jpg',
    type: 'photo',
    categoryId: 'manejo-poscosecha',
    entryId: null,
    sourceId: 'visual-cannabis-drying',
    author: '"Cannabis Pictures"',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cannabis_Drying_out_the_crop_(16558794823).jpg',
    alt: 'Fotografía documental de inflorescencias de cannabis colgadas para su secado tras la cosecha (CC BY 2.0).',
    credit: 'Cannabis Pictures — CC BY 2.0, vía Wikimedia Commons',
    status: 'ACTIVE',
    knownIssues: 'Mismo archivo ya usado como portada de "Cosecha" (`asset-cosecha-drying`) — reutilización deliberada de un asset ya verificado, temáticamente coherente con el secado/curado del manejo poscosecha.'
  },
  {
    id: 'asset-marco-legal-internal',
    file: '/atlas/categories/category-marco-legal.svg',
    type: 'internal-illustration',
    categoryId: 'marco-legal',
    entryId: 'marco-editorial',
    sourceId: null,
    author: 'Proyecto Atlas del Cultivo Argentino',
    license: 'Interno',
    sourceUrl: null,
    alt: 'Ilustración editorial del marco legal.',
    credit: null,
    status: 'ACTIVE'
  }
];

export function assetById(id) {
  return assets.find((asset) => asset.id === id) ?? null;
}

export function assetsForEntry(entryId) {
  return assets.filter((asset) => asset.entryId === entryId);
}

export function assetForCategory(categoryId) {
  return assets.find((asset) => asset.categoryId === categoryId && !asset.entryId)
    ?? assets.find((asset) => asset.categoryId === categoryId)
    ?? null;
}

export function attributableAssets() {
  return assets.filter((asset) => asset.license !== 'Interno');
}
