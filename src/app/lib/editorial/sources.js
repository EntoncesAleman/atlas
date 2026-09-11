// Registro estructurado de fuentes reales.
// Cada fuente proviene de MASTER_PACKAGE/19_SOURCE_REGISTRY.md — no se inventa ninguna URL,
// autor ni fecha. Si un dato no está determinado en el registro original, se deja `null`.
// Tipos permitidos: OFFICIAL, ACADEMIC, SCIENTIFIC, AGRICULTURAL, LEGAL, VISUAL, OTHER.

export const sources = [
  // --- Fuentes legales (ver MASTER_PACKAGE/12_LEGAL.md y 19_SOURCE_REGISTRY.md, sección Legal/regulatorio) ---
  {
    id: 'ley-27350-reprocann',
    title: 'Resolución 1780/2025 (Ministerio de Salud) — marco vigente de REPROCANN',
    authorOrInstitution: 'Boletín Oficial de la República Argentina',
    url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/325794/20250523',
    type: 'LEGAL',
    publicationDate: '2025-05-23',
    accessedAt: '2026-09-09',
    notes: 'Marco vigente de REPROCANN (autocultivador, cultivador solidario, ONG). Verificado por lectura directa.'
  },
  {
    id: 'ley-23737-art5',
    title: 'Ley 23.737, artículo 5 — tipificación de cultivo y atenuante por uso personal',
    authorOrInstitution: 'Argentina.gob.ar (texto normativo actualizado)',
    url: 'https://www.argentina.gob.ar/normativa/nacional/ley-23737-138/actualizacion',
    type: 'LEGAL',
    publicationDate: null,
    accessedAt: '2026-09-09',
    notes: 'Verificado por lectura directa. Texto legal primario.'
  },
  {
    id: 'fallo-arriola-csjn-2009',
    title: 'Fallo "Arriola" (CSJN, 2009) — base constitucional de la tenencia/cultivo para consumo personal',
    authorOrInstitution: 'Transnational Institute (resumen secundario del fallo de la CSJN)',
    url: 'https://www.tni.org/es/art%C3%ADculo/fallo-arriola-de-la-corte-suprema-sobre-tenencia-de-estupefacientes-para-consumo-personal',
    type: 'LEGAL',
    publicationDate: '2009-08-25',
    accessedAt: '2026-09-09',
    notes: 'Fuente secundaria del fallo — recomendable cruzar contra el texto original de la CSJN antes de citarlo como fuente definitiva en contenido publicado.'
  },
  {
    id: 'ley-27669-publicidad',
    title: 'Ley 27.669 — restricciones a publicidad/promoción de cannabis psicoactivo',
    authorOrInstitution: 'Boletín Oficial de la República Argentina',
    url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/263212/20220526',
    type: 'LEGAL',
    publicationDate: '2022-05-26',
    accessedAt: '2026-09-09',
    notes: 'Aplica a publicidad/promoción comercial, no a contenido educativo puro. Verificado por lectura directa.'
  },
  {
    id: 'ley-25326-datos-personales',
    title: 'Ley 25.326 — Protección de Datos Personales',
    authorOrInstitution: 'Organización de los Estados Americanos (texto completo)',
    url: 'https://www.oas.org/juridico/pdfs/arg_ley25326.pdf',
    type: 'LEGAL',
    publicationDate: '2000-10-30',
    accessedAt: '2026-09-09',
    notes: 'Verificado por lectura directa. Marco de protección de datos personales citado en 10_PRIVACY.md/12_LEGAL.md.'
  },

  // --- Fuentes de contenido: piloto editorial "Germinación" (Fase 7B1, 2026-09-10) ---
  {
    id: 'oficial-inase-vigor-semillas',
    title: 'Vigor en semillas',
    authorOrInstitution: 'INASE — Instituto Nacional de Semillas (Argentina)',
    url: 'https://www.argentina.gob.ar/inase/vigor-en-semillas',
    type: 'OFFICIAL',
    publicationDate: null,
    accessedAt: '2026-09-10',
    notes: 'Verificado por lectura directa. Distingue el ensayo de germinación estándar del ensayo de vigor y define el objetivo de ambos bajo las reglas ISTA vigentes en Argentina.'
  },
  {
    id: 'academica-unne-fisiologia-vegetal-germinacion',
    title: 'Guía de estudio — Germinación (Fisiología Vegetal I)',
    authorOrInstitution: 'Cátedra de Fisiología Vegetal, FaCENA, Universidad Nacional del Nordeste (UNNE)',
    url: 'https://exa.unne.edu.ar/biologia/fisiologia.vegetal/GuiadeestudioGerminacion.pdf',
    type: 'ACADEMIC',
    publicationDate: null,
    accessedAt: '2026-09-10',
    notes: 'Existencia y origen institucional verificados (PDF servido desde el dominio académico de la UNNE). El texto completo no pudo extraerse automáticamente en esta sesión (PDF no legible por la herramienta de fetch) — se usa como respaldo convergente del modelo trifásico de germinación (imbibición / activación metabólica / emergencia de radícula), no como única fuente de ninguna afirmación.'
  },
  {
    id: 'academica-unpsjb-fisiologia-general-germinacion',
    title: 'TP15 — Germinación',
    authorOrInstitution: 'Cátedra de Fisiología General, Universidad Nacional de la Patagonia San Juan Bosco (UNPSJB)',
    url: 'https://www.fcn.unp.edu.ar/fisiologiageneral/images/tp/TP15_Germinacion.pdf',
    type: 'ACADEMIC',
    publicationDate: null,
    accessedAt: '2026-09-10',
    notes: 'Existencia y origen institucional verificados. Mismo límite de extracción de texto que la fuente UNNE — usada como respaldo convergente, no como fuente única.'
  },
  {
    id: 'cientifica-latif-2025-hemp-priming-germination',
    title: 'Influence of different priming treatments on germination potential and seedling establishment of four important hemp (Cannabis sativa L.) cultivars',
    authorOrInstitution: 'Latif, S.; Qureshi, R. et al. — Scientific Reports (Nature), vol. 15, art. 3073',
    url: 'https://www.nature.com/articles/s41598-025-86469-y',
    type: 'SCIENTIFIC',
    publicationDate: '2025',
    accessedAt: '2026-09-10',
    notes: 'Título, autoría completa, revista y DOI verificados de forma consistente en múltiples búsquedas; el texto completo del artículo no se pudo leer directamente (acceso protegido por un gate de sesión de Nature). Citado únicamente para respaldar que el establecimiento de la plántula en Cannabis sativa responde a factores ambientales/de tratamiento variables — no se usa para recomendar ningún tratamiento específico (los priming treatments del estudio quedan fuera del alcance editorial de esta entrada).'
  },
  {
    id: 'cientifica-cannabis-landraces-dormancy-2023',
    title: 'Seed dormancy and germination responses of cannabis landraces to various pre-treatments',
    authorOrInstitution: 'Langa, S.; Magwaza, L. S.; Mditshwa, A.; Tesfay, S. Z. — South African Journal of Botany, vol. 165, pp. 91-100',
    url: 'https://doi.org/10.1016/j.sajb.2023.12.021',
    type: 'SCIENTIFIC',
    publicationDate: '2024-02',
    accessedAt: '2026-09-11',
    notes: 'RESUELTO en Loop 1 (Fase 48): autoría completa, revista (South African Journal of Botany, antes UNVERIFIED entre dos candidatas) y DOI verificados de forma consistente por Crossref. El texto completo del artículo sigue sin poder leerse directamente (acceso protegido). Se cita únicamente para respaldar que la latencia de semilla es un fenómeno real y estudiado en Cannabis — no se citan resultados numéricos específicos del estudio ni ningún pre-tratamiento como recomendación.'
  },

  // --- Fuentes de contenido: Loop 1 — Germinación, historia y refuerzo de "cómo ocurre" (Fase 48, 2026-09-11) ---
  {
    id: 'cientifica-bewley-1997-seed-germination-dormancy',
    title: 'Seed Germination and Dormancy',
    authorOrInstitution: 'Bewley, J. D. — The Plant Cell, vol. 9, n.º 7, pp. 1055-1066',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC156979/',
    type: 'SCIENTIFIC',
    publicationDate: '1997-07',
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO por lectura directa (PMC, artículo de libre acceso; DOI 10.1105/tpc.9.7.1055). Revisión clásica y ampliamente citada sobre fisiología de la germinación: describe el patrón trifásico de absorción de agua (imbibición inicial, fase intermedia de reactivación metabólica, y renovada absorción asociada a la protrusión de la radícula) y la reactivación de la respiración inmediatamente después de la imbibición. Se usa como respaldo internacional del mismo modelo trifásico (imbibición / activación metabólica / emergencia de radícula) que ya describían las guías argentinas UNNE/UNPSJB de la Fase 7A — no reemplaza esas fuentes, las refuerza con un texto verificable y públicamente accesible.'
  },
  {
    id: 'cientifica-ren-2021-cannabis-domestication-genomics',
    title: 'Large-scale whole-genome resequencing unravels the domestication history of Cannabis sativa',
    authorOrInstitution: 'Ren, G.; Zhang, X.; Li, Y.; Ridout, K.; Serrano-Serrano, M. L.; Yang, Y.; Liu, A.; Ravikanth, G.; Nawaz, M. A.; Mumtaz, A. S.; Salamin, N.; Fumagalli, L. — Science Advances, vol. 7, n.º 29',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8284894/',
    type: 'SCIENTIFIC',
    publicationDate: '2021-07',
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO por lectura directa (PMC, artículo de libre acceso; DOI 10.1126/sciadv.abg2286). Análisis de resecuenciación de 110 genomas (82 nuevos + 28 públicos) de variedades de todo el mundo. Estima la divergencia de los cultivares actuales de fibra y de uso psicoactivo, a partir de un fondo genético ancestral representado hoy por poblaciones silvestres/variedades locales de China, en aproximadamente 12.000 años antes del presente (este de Asia). Se cita como estimación genética de antigüedad y origen geográfico, no como evidencia arqueológica directa — el propio texto la distingue de un hallazgo físico fechado.'
  },
  {
    id: 'cientifica-dalmartello-2023-haimenkou-cannabis-archaeobotany',
    title: 'Morphometric approaches to Cannabis evolution and differentiation from archaeological sites: interpreting the archaeobotanical evidence from bronze age Haimenkou, Yunnan',
    authorOrInstitution: 'Dal Martello, R.; Min, R.; Stevens, C. J.; Qin, L.; Fuller, D. Q. — Vegetation History and Archaeobotany, vol. 33, pp. 503-518',
    url: 'https://doi.org/10.1007/s00334-023-00966-6',
    type: 'SCIENTIFIC',
    publicationDate: '2023-11',
    accessedAt: '2026-09-11',
    notes: 'Título, autoría completa, revista, volumen/páginas y DOI verificados de forma consistente vía Crossref. El texto completo no se pudo leer directamente en esta sesión (acceso institucional bloqueado). Se cita para respaldar el hallazgo, ya documentado en fuentes secundarias convergentes, de más de 800 semillas (aquenios) de Cannabis en el sitio de la Edad del Bronce de Haimenkou (Yunnan, suroeste de China), fechadas aproximadamente entre 1650 y 400 a.C. — evidencia arqueobotánica directa de semilla, no una estimación genética.'
  },
  {
    id: 'cientifica-liu-2026-shandong-cannabis-phytolith',
    title: 'Integrating cannabis into the prehistoric crop assemblage: Phytolith evidence from Shandong, Northern China (4500-3400 BP)',
    authorOrInstitution: 'Liu, X.; Wu, R.; Wang, B.; Li, Y.; Zhang, S.; Lv, K.; Gao, J.; Ge, Y.; Chen, X. — Journal of Archaeological Science, vol. 189, art. 106545',
    url: 'https://doi.org/10.1016/j.jas.2026.106545',
    type: 'SCIENTIFIC',
    publicationDate: '2026-05',
    accessedAt: '2026-09-11',
    notes: 'Título, autoría completa, revista, volumen y DOI verificados vía Crossref. El texto completo no se pudo leer directamente en esta sesión (acceso institucional bloqueado). Se cita para respaldar la fecha más temprana de evidencia física (fitolitos, no semillas) de Cannabis dentro de un conjunto de cultivos manejados en el norte de China, entre hace 4.500 y 3.400 años — anterior a la evidencia de semilla de Haimenkou, pero de un tipo de resto distinto (microestructura vegetal, no aquenio).'
  },

  // --- Fuentes de contenido: escalado editorial Fase 7B2 (2026-09-10) ---
  {
    id: 'oficial-inta-sintomatologia-diagnostico-diferencial',
    title: 'Sintomatología ocasionada por agentes fitopatógenos y diagnóstico diferencial',
    authorOrInstitution: 'INTA — Instituto Nacional de Tecnología Agropecuaria (CIAP)',
    url: 'https://www.argentina.gob.ar/inta/ciap/sintomatologia-ocasionada-por-agentes-fitopatogenos-y-diagnostico-diferencial',
    type: 'OFFICIAL',
    publicationDate: null,
    accessedAt: '2026-09-10',
    notes: 'Verificado por lectura directa. Explica el principio de no concluir origen biótico/abiótico a partir de un único síntoma visual, con el ejemplo de patógenos vasculares que imitan estrés hídrico/nutricional.'
  },
  {
    id: 'oficial-inta-relacion-suelo-planta-agua',
    title: 'Relación suelo – planta – agua',
    authorOrInstitution: 'INTA — Centro Regional Patagonia Norte, EEA Alto Valle (Holzmann, R. L.)',
    url: 'https://repositorio.inta.gob.ar/xmlui/bitstream/handle/20.500.12123/14501/INTA_CRPatagoniaNorte_EEAAltoValle_holzmann_RL_Relaci%C3%B3n_suelo_planta_agua.pdf?sequence=1&isAllowed=y',
    type: 'OFFICIAL',
    publicationDate: null,
    accessedAt: '2026-09-10',
    notes: 'Existencia y origen institucional verificados (repositorio institucional oficial de INTA). Fase 7C: se reintentó la descarga con `curl` para extracción local (PyMuPDF) — la conexión TLS a repositorio.inta.gob.ar se resetea (`Recv failure: Connection reset by peer`), mismo tipo de bloqueo de dominio INTA ya documentado en `21_GEO_CLIMATE_RESEARCH.md` para otros subdominios de INTA. No es evidencia de que el PDF sea escaneado — es un bloqueo de acceso al dominio desde este entorno. Se mantiene como respaldo convergente del principio general agua-oxígeno-raíz, no para ninguna cifra específica.'
  },
  {
    id: 'academica-unlpam-inta-guia-evaluacion-visual-suelo',
    title: 'Guía para la evaluación visual de la calidad del suelo',
    authorOrInstitution: 'Facultad de Agronomía, Universidad Nacional de La Pampa (UNLPam) y EEA INTA Anguil',
    url: 'https://www.unlpam.edu.ar/images/extension/edunlpam/Gu%C3%ADa%20para%20la%20evaluaci%C3%B3n%20visual%20de%20la%20calidad%20del%20suelo.pdf',
    type: 'ACADEMIC',
    publicationDate: '2021',
    accessedAt: '2026-09-10',
    notes: 'VERIFICADO por lectura directa en Fase 7C (extracción local con PyMuPDF/pdftotext-equivalente, no era un PDF escaneado sino texto normal que la herramienta de fetch previa no pudo procesar). Confirma autoría (Noellemeyer et al., Editorial UNLPam, 2021, ISBN 978-950-863-430-6) y contenido real sobre estructura/porosidad/aireación/drenaje del suelo y su relación con retención de agua y oxígeno de raíz — respalda directamente el contenido ya publicado de "sustrato-y-drenaje" sin necesidad de citar cifras.'
  },
  {
    id: 'academica-unne-fitocromos-desarrollo-vegetal',
    title: 'Fitocromos y desarrollo vegetal',
    authorOrInstitution: 'Cátedra de Fisiología Vegetal, FaCENA, Universidad Nacional del Nordeste (UNNE) — texto original de Martínez-García, Monte y Ruiz Cantón',
    url: 'https://exa.unne.edu.ar/biologia/fisiologia.vegetal/Fitocromos%20y%20desarrollo%20vegetal.pdf',
    type: 'ACADEMIC',
    publicationDate: null,
    accessedAt: '2026-09-10',
    notes: 'VERIFICADO por lectura directa en Fase 7C (extracción local con PyMuPDF). Misma cátedra que la fuente de germinación del piloto (Fase 7B1). Confirma el modelo de fitocromo controlando fotoperiodo/duración día-noche y su rol en floración — respalda directamente el contenido ya publicado de "luz-y-fotoperiodo".'
  },
  {
    id: 'academica-uncuyo-guia-crecimiento',
    title: 'Ciclo de Ingreso — Biología: Guía N°3, Crecimiento',
    authorOrInstitution: 'Facultad de Ciencias Exactas y Naturales, Universidad Nacional de Cuyo (UNCUYO)',
    url: 'https://fcen.uncuyo.edu.ar/ingreso/upload/guia-n3-crecimiento.pdf',
    type: 'ACADEMIC',
    publicationDate: null,
    accessedAt: '2026-09-10',
    notes: 'VERIFICADO por lectura directa en Fase 7C (extracción local con PyMuPDF). Material de curso de ingreso de UNCUYO; usa la planta de poroto como ejemplo didáctico general de transición de fase vegetativa a fase reproductiva (aparición de botones florales). Se cita solo para el concepto botánico general de esa transición, no como dato específico de Cannabis sativa — respalda el contenido ya publicado de "cultivo-en-secuencia" sin necesidad de reescritura.'
  },
  {
    id: 'cientifica-hesami-2023-cannabis-life-cycle',
    title: 'Morphological Characterization of Cannabis sativa L. Throughout Its Complete Life Cycle',
    authorOrInstitution: 'Hesami, M.; Pepe, M.; Jones, A. M. P. — revista Plants (Basel), 22 de octubre de 2023',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10610221/',
    type: 'SCIENTIFIC',
    publicationDate: '2023-10-22',
    accessedAt: '2026-09-10',
    notes: 'VERIFICADO por lectura directa (texto completo accesible, artículo de acceso abierto). Documenta la ontogenia completa de Cannabis sativa cv. White Widow desde germinación hasta madurez de cosecha: transición de fase vegetativa (fotoperiodo de día largo) a reproductiva (día corto), y maduración de tricomas glandulares con cambio de color transparente → lechoso → ámbar. Fuente principal para "cultivo-en-secuencia" y "cosecha-y-maduracion".'
  },

  // --- Fuentes visuales (ver MASTER_PACKAGE/ASSET_REGISTRY.md y 19_SOURCE_REGISTRY.md, sección Biblioteca visual real) ---
  {
    id: 'visual-koehler-1887',
    title: "Köhler's Medizinal-Pflanzen — lámina de Cannabis sativa",
    authorOrInstitution: 'Walther Otto Müller (1887)',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis_sativa_Koehler_drawing.jpg',
    type: 'VISUAL',
    publicationDate: '1887',
    accessedAt: '2026-09-09',
    notes: 'Dominio público. Verificado por lectura directa de la página de archivo en Wikimedia Commons.'
  },
  {
    id: 'visual-germination-diagram',
    title: 'Diagrama de germinación epigea e hipogea',
    authorOrInstitution: 'Begoon (obra derivada de Kat1992)',
    url: 'https://commons.wikimedia.org/wiki/File:Germination-en.svg',
    type: 'VISUAL',
    publicationDate: null,
    accessedAt: '2026-09-09',
    notes: 'CC BY-SA 3.0. Verificado por lectura directa.'
  },
  {
    id: 'visual-soil-profile',
    title: 'Fotografía de perfil de suelo (0-125 cm)',
    authorOrInstitution: 'Mclund',
    url: 'https://commons.wikimedia.org/wiki/File:Soil_profile_0-125cm.jpg',
    type: 'VISUAL',
    publicationDate: null,
    accessedAt: '2026-09-09',
    notes: 'CC BY 4.0. Verificado por lectura directa.'
  },
  {
    id: 'visual-photoperiodism-diagram',
    title: 'Diagrama del ciclo del fitocromo (Pr/Pfr) en fotoperiodismo vegetal',
    authorOrInstitution: 'Giovnnni pastrami',
    url: 'https://commons.wikimedia.org/wiki/File:Photoperiodism_in_plants.jpg',
    type: 'VISUAL',
    publicationDate: null,
    accessedAt: '2026-09-09',
    notes: 'CC BY-SA 4.0. Verificado por lectura directa. Se mantiene como asset de la entrada "luz-y-fotoperiodo" (Fase 8C.1) — dejó de usarse como portada de la categoría por ser una fotografía con bloques de texto densos, poco legibles en formato de tarjeta cuadrada.'
  },
  {
    id: 'visual-plant-under-phytolamp',
    title: 'Fotografía documental de una planta (ciclamen) bajo luz de cultivo artificial (fitolámpara)',
    authorOrInstitution: 'Alla Varta',
    url: 'https://commons.wikimedia.org/wiki/File:Plant_under_a_phytolamp.jpg',
    type: 'VISUAL',
    publicationDate: '2019-12-25',
    accessedAt: '2026-09-10',
    notes: 'CC BY 4.0. Verificado por lectura directa (autoría, licencia y fecha de captura confirmadas en la página de archivo). Reemplaza el diagrama de fitocromo como portada de la categoría "Luz y clima" (Fase 8C.1) — comunica el concepto de luz/fotoperiodo de forma legible a escala de tarjeta, sin texto superpuesto. No es una fotografía de Cannabis sativa específicamente (es una planta ornamental bajo luz artificial); se usa por el mismo motivo que ya se usó una fotografía genérica de perfil de suelo para "Suelo y agua": ilustra el concepto ambiental general, no una especie puntual.'
  },
  {
    id: 'visual-red-spider-mite',
    title: 'Fotografía macro de arañuela roja (Tetranychus urticae)',
    authorOrInstitution: 'Aleksey Gnilenkov',
    url: 'https://commons.wikimedia.org/wiki/File:Red_spider_mite_(Tetranychus_urticae).jpg',
    type: 'VISUAL',
    publicationDate: null,
    accessedAt: '2026-09-09',
    notes: 'CC BY 2.0. Verificado por lectura directa.'
  },
  {
    id: 'visual-industrial-hemp-field',
    title: 'Cultivo exterior de cáñamo industrial (Francia)',
    authorOrInstitution: 'Aleks',
    url: 'https://commons.wikimedia.org/wiki/File:Industrialhemp.jpg',
    type: 'VISUAL',
    publicationDate: '2000-06-01',
    accessedAt: '2026-09-09',
    notes: 'GFDL 1.2+ / CC BY-SA 3.0 y compatibles. Verificado por lectura directa.'
  },
  {
    id: 'visual-cannabis-drying',
    title: 'Inflorescencias de cannabis secándose tras la cosecha',
    authorOrInstitution: '"Cannabis Pictures" (usuario de Flickr, vía Wikimedia Commons)',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis_Drying_out_the_crop_(16558794823).jpg',
    type: 'VISUAL',
    publicationDate: null,
    accessedAt: '2026-09-09',
    notes: 'CC BY 2.0. Verificado por lectura directa.'
  }
];

export function sourceById(id) {
  return sources.find((source) => source.id === id) ?? null;
}
