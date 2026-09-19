// Registro estructurado de fuentes reales.
// Cada fuente proviene de MASTER_PACKAGE/19_SOURCE_REGISTRY.md — no se inventa ninguna URL,
// autor ni fecha. Si un dato no está determinado en el registro original, se deja `null`.
// Tipos permitidos: OFFICIAL, ACADEMIC, SCIENTIFIC, AGRICULTURAL, LEGAL, VISUAL, OTHER.
//
// `scope` (opcional, ver lib/editorial/tags.js — SOURCE_SCOPES): distingue si la fuente es
// evidencia ESPECÍFICA de Cannabis sativa ('CANNABIS') o evidencia GENERAL de fisiología
// vegetal/agronomía aplicada por analogía, de otra especie o de metodología species-agnostic
// ('GENERAL'). Se omite en fuentes legales y en fuentes puramente geográficas/climáticas/
// astronómicas, donde la distinción no aplica. No reclasificar una fuente GENERAL como
// CANNABIS solo porque se usa para respaldar contenido de una entrada sobre Cannabis — el
// campo describe el objeto de estudio real de la fuente, no la entrada donde se cita.

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
    scope: 'GENERAL',
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
    scope: 'GENERAL',
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
    scope: 'GENERAL',
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
    scope: 'CANNABIS',
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
    scope: 'CANNABIS',
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
    scope: 'GENERAL',
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
    scope: 'CANNABIS',
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
    scope: 'CANNABIS',
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
    scope: 'CANNABIS',
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
    scope: 'GENERAL',
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
    scope: 'GENERAL',
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
    scope: 'GENERAL',
    title: 'Guía para la evaluación visual de la calidad del suelo',
    authorOrInstitution: 'Facultad de Agronomía, Universidad Nacional de La Pampa (UNLPam) y EEA INTA Anguil',
    url: 'https://www.unlpam.edu.ar/images/extension/edunlpam/Gu%C3%ADa%20para%20la%20evaluaci%C3%B3n%20visual%20de%20la%20calidad%20del%20suelo.pdf',
    type: 'ACADEMIC',
    publicationDate: '2021',
    accessedAt: '2026-09-10',
    notes: 'VERIFICADO por lectura directa en Fase 7C (extracción local con PyMuPDF/pdftotext-equivalente, no era un PDF escaneado sino texto normal que la herramienta de fetch previa no pudo procesar). Confirma autoría (Noellemeyer et al., Editorial UNLPam, 2021, ISBN 978-950-863-430-6) y contenido real sobre estructura/porosidad/aireación/drenaje del suelo y su relación con retención de agua y oxígeno de raíz — respalda directamente el contenido ya publicado de "sustrato-y-drenaje" sin necesidad de citar cifras.'
  },

  // --- Fuentes de contenido: Loop 2 — Sustrato, agua y drenaje (Fase 49, 2026-09-11) ---
  {
    id: 'oficial-inta-sustrato-maceta-rubio-karlanian',
    scope: 'GENERAL',
    title: 'Cómo elegir un buen sustrato para las macetas',
    authorOrInstitution: 'Rubio, E.; Karlanian, M. — Instituto de Floricultura, INTA (Argentina.gob.ar)',
    url: 'https://www.argentina.gob.ar/noticias/como-elegir-un-buen-sustrato-para-las-macetas',
    type: 'OFFICIAL',
    publicationDate: null,
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO por lectura directa. Nota institucional del Instituto de Floricultura del INTA: define las funciones del sustrato (retención de agua/nutrientes, aireación, anclaje) y da rangos orientativos generales de aireación/retención hídrica citados por los propios investigadores del INTA — se usa para respaldar la función general del sustrato, no como cifra prescriptiva para Cannabis.'
  },
  {
    id: 'cientifica-barbaro-karlanian-2020-propiedades-fisicas-sustrato',
    scope: 'GENERAL',
    title: 'Efecto de las propiedades físicas del sustrato sobre el desarrollo de plantines florales en maceta',
    authorOrInstitution: 'Barbaro, L. A.; Karlanian, M. A. — INTA, revista Ciencia del Suelo, vol. 38, n.º 1',
    url: 'https://www.scielo.org.ar/scielo.php?script=sci_arttext&pid=S1850-20672020000100001&lng=es&nrm=iso&tlng=es',
    type: 'SCIENTIFIC',
    publicationDate: '2020-07',
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO por lectura directa (SciELO Argentina, acceso abierto). DOI no localizado/no indexado en Crossref al momento de esta verificación — identificador usado es el PID de SciELO en la URL. Estudio con petunias y copetes (no Cannabis): compara mezclas de compost de corteza de pino y turba de Sphagnum en distintas proporciones y mide su relación entre porosidad de aireación y capacidad de retención de agua. Se cita únicamente para respaldar, como condición de ese estudio puntual (no como regla universal ni aplicable a Cannabis), que existe una relación medible y cuantificable entre esas dos propiedades del sustrato y el desarrollo de la parte aérea de la planta.'
  },
  {
    id: 'academica-white-mastalerz-1966-container-capacity',
    scope: 'GENERAL',
    title: 'Soil moisture as related to container capacity',
    authorOrInstitution: 'White, J. W.; Mastalerz, J. W. — Proceedings of the American Society for Horticultural Science, vol. 89, pp. 757-765 (páginas citadas de forma inconsistente entre fuentes secundarias: 757 o 758 de inicio)',
    url: null,
    type: 'ACADEMIC',
    publicationDate: '1966',
    accessedAt: '2026-09-11',
    notes: 'SIN URL: no se localizó ninguna página real y verificable (ni de texto completo ni de sola referencia bibliográfica) para citar como enlace — se prefirió dejar `url: null` antes que inventar una dirección. NO verificado por lectura directa (publicación previa a la era DOI/acceso abierto digital). La cita (autores, año, revista, volumen) está corroborada de forma convergente por varias búsquedas independientes que la referencian como el trabajo que formalizó el concepto de "capacidad de contenedor" en horticultura de contenedor. Se usa únicamente para ese hecho histórico puntual —que ese concepto se formalizó en ese trabajo—, no para ninguna cifra o hallazgo interno del artículo. Candidato a reforzar con una fuente secundaria académica verificable en una fase futura si se retoma investigación histórica de esta entrada.'
  },
  {
    id: 'cientifica-loreti-perata-2020-hypoxia-plants',
    scope: 'GENERAL',
    title: 'The Many Facets of Hypoxia in Plants',
    authorOrInstitution: 'Loreti, E.; Perata, P. — Plants (Basel), MDPI',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7356549/',
    type: 'SCIENTIFIC',
    publicationDate: '2020-06',
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO por lectura directa (PMC, artículo de libre acceso; DOI 10.3390/plants9060745). Revisión internacional que respalda, con cita textual, el mecanismo ya descripto en la entrada: la hipoxia limita la respiración aeróbica de la raíz, y la fermentación alcohólica la reemplaza de forma temporal con mucho menor rendimiento energético (2 moles de ATP contra 36 de la respiración aeróbica) — refuerzo internacional del mismo principio agua-oxígeno-raíz que ya citaban las fuentes argentinas de la Fase 7B2.'
  },

  {
    id: 'academica-unne-fitocromos-desarrollo-vegetal',
    scope: 'GENERAL',
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
    scope: 'GENERAL',
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
    scope: 'CANNABIS',
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
    scope: 'CANNABIS',
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
    scope: 'GENERAL',
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
    scope: 'GENERAL',
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
    scope: 'GENERAL',
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
    scope: 'GENERAL',
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
    scope: 'GENERAL',
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
    scope: 'CANNABIS',
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
    scope: 'CANNABIS',
    title: 'Inflorescencias de cannabis secándose tras la cosecha',
    authorOrInstitution: '"Cannabis Pictures" (usuario de Flickr, vía Wikimedia Commons)',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis_Drying_out_the_crop_(16558794823).jpg',
    type: 'VISUAL',
    publicationDate: null,
    accessedAt: '2026-09-09',
    notes: 'CC BY 2.0. Verificado por lectura directa.'
  },

  // --- Fuentes visuales: mejora del sistema visual del Atlas (2026-09-16). Investigación provista
  // por el usuario (candidatas de Wikimedia Commons por categoría/entrada) — verificada de forma
  // directa (fetch a la página real de cada archivo, no solo el resultado de una búsqueda) antes
  // de integrar ninguna. Ninguna imagen generada por IA se agrega ni se conserva activa: los
  // assets con `license: 'Interno'` que eran ilustraciones de IA (Fundamentos, Suelo y agua,
  // Fertilización) se archivaron en `assets.js`, reemplazados por estas fuentes reales.
  {
    id: 'visual-keimender-hanfsamen',
    scope: 'CANNABIS',
    title: 'Keimender Hanfsamen (semilla de cáñamo germinando)',
    authorOrInstitution: 'Vschlothauer',
    url: 'https://commons.wikimedia.org/wiki/File:Keimender_Hanfsamen_-_Germinating_hemp_seed_01.jpg',
    type: 'VISUAL',
    publicationDate: '2024-04-22',
    accessedAt: '2026-09-16',
    notes: 'CC0 1.0 (dominio público). Verificado por lectura directa. Semilla de cáñamo ~5 días después de la siembra, testa abriéndose, radícula e hipocótilo arqueado visibles.'
  },
  {
    id: 'visual-c-sativa-seedling',
    scope: 'CANNABIS',
    title: 'Plántula joven de Cannabis sativa',
    authorOrInstitution: 'Avriette',
    url: 'https://commons.wikimedia.org/wiki/File:C_sativa_seedling.jpg',
    type: 'VISUAL',
    publicationDate: '2006-12-15',
    accessedAt: '2026-09-16',
    notes: 'CC BY-SA 3.0 / GFDL 1.2+. Verificado por lectura directa. Plántula pequeña con cotiledones y primera hoja verdadera.'
  },
  {
    id: 'visual-cannabis-seedling-seven-days',
    scope: 'CANNABIS',
    title: 'Plántula de cannabis a los siete días',
    authorOrInstitution: 'Trav1085',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis_seedling_-_seven_days.jpg',
    type: 'VISUAL',
    publicationDate: '2012-09-06',
    accessedAt: '2026-09-16',
    notes: 'CC BY-SA 3.0 / GFDL 1.2+. Verificado por lectura directa. Plántula con tres pares de hojas visibles, siete días tras la germinación.'
  },
  {
    id: 'visual-cannabis-sativa-radix-profile',
    scope: 'CANNABIS',
    title: 'Perfil de raíz de Cannabis sativa en campo de cáñamo (Klagenfurt)',
    authorOrInstitution: 'Prof. Dr. Lore Kutschera',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis_sativa_radix_profile.png',
    type: 'VISUAL',
    publicationDate: '2006-03-12',
    accessedAt: '2026-09-16',
    notes: 'CC BY-SA 2.5. Verificado por lectura directa. Diagrama documental real del sistema de raíces de una planta de 180 cm expuesta en un campo de cáñamo, con horizontes de suelo marcados — no es una ilustración esquemática, es un registro de campo real.'
  },
  {
    id: 'visual-stem-root-clay',
    scope: 'CANNABIS',
    title: 'Tallo y raíces de cannabis con sustrato de arcilla expandida',
    authorOrInstitution: 'Beeblebrox',
    url: 'https://commons.wikimedia.org/wiki/File:Stem_root_and_clay.jpg',
    type: 'VISUAL',
    publicationDate: '2022-09-29',
    accessedAt: '2026-09-16',
    notes: 'CC BY-SA 4.0. Verificado por lectura directa. Raíz y tallo principal con la arcilla expandida (sustrato hidropónico ebb-and-flow) usada para una sola planta.'
  },
  {
    id: 'visual-cannabis-sunlight-closeup',
    scope: 'CANNABIS',
    title: 'Primer plano de planta de Cannabis a contraluz solar',
    authorOrInstitution: 'Soyamol17',
    url: 'https://commons.wikimedia.org/wiki/File:Close-Up_of_Cannabis_Plant_in_Sunlight.jpg',
    type: 'VISUAL',
    publicationDate: '2026-01-24',
    accessedAt: '2026-09-16',
    notes: 'CC0 1.0 (dominio público). Verificado por lectura directa. Reemplaza `visual-plant-under-phytolamp` (ciclamen, especie distinta) como portada de "Luz y clima" — la razón original para usar una especie genérica (no existía entonces una foto de Cannabis igual de legible) queda superada por esta candidata real y específica.'
  },
  {
    id: 'visual-cannabis-vegetative-growth',
    scope: 'CANNABIS',
    title: 'Cannabis en etapa de crecimiento vegetativo',
    authorOrInstitution: 'J. Patrick Bedell',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis-vegetative-growth-00003.jpg',
    type: 'VISUAL',
    publicationDate: '2007-02-24',
    accessedAt: '2026-09-16',
    notes: 'Dominio público ("all rights released" por el propio autor). Verificado por lectura directa. Reemplaza una ilustración generada con IA como portada de "Crecimiento" — ninguna imagen de IA se mantiene activa tras esta ronda.'
  },
  {
    id: 'visual-untrained-cannabis-vegetative',
    scope: 'CANNABIS',
    title: 'Planta de cannabis sin conducir en etapa vegetativa',
    authorOrInstitution: 'Plantlady223',
    url: 'https://commons.wikimedia.org/wiki/File:Untrained_cannabis_plant_in_the_vegetative_stage.jpg',
    type: 'VISUAL',
    publicationDate: '2016-01-04',
    accessedAt: '2026-09-16',
    notes: 'CC BY-SA 4.0. Verificado por lectura directa. Muestra la forma de "árbol de Navidad" no conducida, típica de la arquitectura natural de la especie sin intervención de poda.'
  },
  {
    id: 'visual-cannabis-nutrient-deficiency',
    scope: 'CANNABIS',
    title: 'Hoja de cannabis con clorosis por desequilibrio nutricional',
    authorOrInstitution: 'Cannabis Training University',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis_Nutrient_Deficiency.JPG',
    type: 'VISUAL',
    publicationDate: '2011-05-18',
    accessedAt: '2026-09-16',
    notes: 'CC BY-SA 3.0. Verificado por lectura directa. Clorosis (amarillamiento) real documentada, coherente con el contenido de la entrada "Fertilización y nutrición" sobre carencia/toxicidad — no se usa como portada genérica de nutrición, se usa específicamente donde el texto habla de este síntoma.'
  },
  {
    id: 'visual-cannabis-hoop-house',
    scope: 'CANNABIS',
    title: 'Cultivo de cannabis bajo túnel (hoop house)',
    authorOrInstitution: 'Brian Shamblen',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis_plants_in_hoop_house.jpg',
    type: 'VISUAL',
    publicationDate: '2018-09-21',
    accessedAt: '2026-09-16',
    notes: 'CC BY 2.0. Verificado por lectura directa (originado en Flickr, revisión de licencia confirmada en Commons el 2021-10-30). Sistema de cultivo estructurado real (invernadero tipo túnel), distinto de la fotografía de campo abierto ya usada como portada de "Cultivo".'
  },
  {
    id: 'visual-bbmamatopped',
    scope: 'CANNABIS',
    title: 'Planta de cannabis "toppeada" (despuntada)',
    authorOrInstitution: 'Big.thompson',
    url: 'https://commons.wikimedia.org/wiki/File:BBMamaTopped.jpg',
    type: 'VISUAL',
    publicationDate: '2006-11-22',
    accessedAt: '2026-09-16',
    notes: 'Dominio público ("released into the public domain" por el autor). Verificado por lectura directa. Único candidato real encontrado que documenta específicamente el resultado del topping (varios brotes apicales co-dominantes tras remover el meristema principal) — se acepta con una reserva de calidad documentada en ASSET_REGISTRY.md (resolución 640×512, fondo doméstico poco prolijo) por ser la única alternativa real y verificable disponible frente a un placeholder genérico sin relación temática.'
  },
  {
    id: 'visual-cannabis-drying-room',
    scope: 'CANNABIS',
    title: 'Sala de secado de cannabis tras la cosecha',
    authorOrInstitution: 'Beeblebrox',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis_drying_room.jpg',
    type: 'VISUAL',
    publicationDate: '2022-09-16',
    accessedAt: '2026-09-16',
    notes: 'CC BY-SA 4.0. Verificado por lectura directa. Sala de secado real (ventilación, control de clima), distinta de la fotografía ya usada para "Cosecha" — resuelve la duplicación exacta de imagen entre "Cosecha" y "Manejo y poscosecha".'
  },
  {
    id: 'visual-cannabis-sativa-1542',
    scope: 'CANNABIS',
    title: 'Ilustración botánica de Cannabis sativa, De Historia Stirpium (1542)',
    authorOrInstitution: 'Heinrich Füllmaurer, para Leonhart Fuchs',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis_sativa_1542.jpg',
    type: 'VISUAL',
    publicationDate: '1542',
    accessedAt: '2026-09-16',
    notes: 'Dominio público (autor fallecido hace más de 100 años). Verificado por lectura directa. Xilografía distinta de la lámina de Köhler (1887) ya usada en Fundamentos/Historia — aporta un punto histórico más temprano y visualmente distinto para la entrada "Historia de la planta".'
  },

  // --- Fuentes de contenido: Loop 3B — base de datos de la Ficha Provincial (Fase 51, 2026-09-11) ---
  {
    id: 'oficial-georef-api-provincias',
    title: 'API georef — provincias (id, nombre, nombre_completo, centroide)',
    authorOrInstitution: 'georef-ar-api, apis.datos.gob.ar (datos oficiales IGN/INDEC)',
    url: 'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre,nombre_completo,centroide',
    type: 'OFFICIAL',
    publicationDate: null,
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO por consulta directa a la API en esta sesión (misma API oficial ya usada desde la Fase 8A para la geometría del mapa y desde la Fase 11 para los centroides de `PROVINCE_LOCATIONS`). Devuelve las 24 jurisdicciones sin duplicados ni omisiones, con su código INDEC de 2 dígitos (campo `id`) y su nombre oficial completo (`nombre_completo`) — fuente de la tabla `identity` de `provinceProfile` (código INDEC y nombre oficial).'
  },
  {
    id: 'oficial-smn-normales-1991-2020-cambios',
    title: 'Cambios en las normales climatológicas del SMN',
    authorOrInstitution: 'Servicio Meteorológico Nacional (SMN)',
    url: 'https://www.argentina.gob.ar/noticias/cambios-en-las-normales-climatologicas-del-smn',
    type: 'OFFICIAL',
    publicationDate: null,
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO por lectura directa. Nota oficial del SMN que compara las normales climatológicas 1981-2010 vs. 1991-2020: temperatura media anual país 16.1°C → 16.3°C, y cita textualmente la única comparación regional con porcentaje que aparece en la nota: "Los mayores cambios se observaron en el oeste del NOA y el norte de Córdoba, con un secamiento cercano al 7.5%, y en Mendoza y Entre Ríos con aumentos de precipitación entre un 8 y un 9% respecto del período anterior." Se usa: (a) la cifra nacional de temperatura, solo a nivel `ArgentinaProfile`, nunca asignada a ninguna provincia; (b) el cambio porcentual de precipitación de Mendoza y Entre Ríos, con la aclaración expresa de que es un cambio entre normales climatológicas (tendencia), no una precipitación anual absoluta. El dato de "oeste del NOA" NO se asignó a ninguna provincia puntual de las 6 que este proyecto agrupa como NOA — la nota no especifica a cuáles corresponde "oeste del NOA" con precisión suficiente para atribuirlo a una jurisdicción sin adivinar, así que se documentó como límite (ver `51_LOOP_3B_PROVINCIAL_DATA.md` §14). Lo mismo aplica a "norte de Córdoba": se registró para Córdoba con la aclaración explícita de que es solo el norte de la provincia, no toda su superficie.'
  },
  {
    id: 'oficial-smn-normales-1991-2020-pdf',
    title: 'Estadísticas Climatológicas Normales 1991-2020',
    authorOrInstitution: 'Servicio Meteorológico Nacional (SMN), ISSN 2953-5549',
    url: 'https://repositorio.smn.gob.ar/bitstream/handle/20.500.12160/2506/estad%C3%ADsticas_climatol%C3%B3gicas_normales_1991-2020.pdf?sequence=4&isAllowed=y',
    type: 'OFFICIAL',
    publicationDate: '2021',
    accessedAt: '2026-09-11',
    notes: 'Existencia y origen institucional verificados (URL real del repositorio institucional del SMN). Documento fuente primario de 105 estaciones SMN/INTA con normales de temperatura/precipitación por estación — NO se pudo procesar en esta sesión: el archivo excede el límite de tamaño de la herramienta de lectura disponible (>10MB). Ninguna cifra por estación/provincia de este documento se usó directamente en `provinceProfile` — la única cifra nacional usada (§`oficial-smn-normales-1991-2020-cambios`) viene de la nota periodística oficial del SMN que sí se pudo leer, no de este PDF. Queda como la fuente primaria a extraer manualmente en una fase futura dedicada (ver limitaciones).'
  },
  {
    id: 'oficial-ign-anida-clima-argentina',
    title: 'Clima en Argentina (fascículo ANIDA — Argentina Físico-Natural)',
    authorOrInstitution: 'Instituto Geográfico Nacional (IGN) — Atlas Nacional Interactivo de la República Argentina (ANIDA)',
    url: 'https://static.ign.gob.ar/anida/fasciculos/fasc_afn_clima_arg.pdf',
    type: 'OFFICIAL',
    publicationDate: '2014',
    accessedAt: '2026-09-11',
    notes: 'Existencia, autoría institucional (IGN) y año de creación (metadatos del PDF, 2014, con revisiones hasta 2023) verificados por acceso directo al archivo. Es el mismo proyecto ANIDA cuya capa GIS "Tipos de climas" ya se había verificado como fuente Köppen oficial en `21_GEO_CLIMATE_RESEARCH.md` (Fase 7). El contenido de texto/tablas del fascículo NO se pudo extraer en esta sesión (PDF con mucho contenido gráfico/comprimido) — no se usó ninguna afirmación de su contenido interno, solo se registra su existencia como candidato de lectura manual futura para clasificación climática por región.'
  },
  {
    id: 'oficial-inta-atlas-climatico-digital-2010',
    title: 'Atlas Climático Digital de la República Argentina',
    authorOrInstitution: 'Bianchi, A. R.; Cravero, S. A. C. — INTA',
    url: 'https://www.argentina.gob.ar/sites/default/files/inta-atlas_climatico_digital_argentina-2010.pdf',
    type: 'OFFICIAL',
    publicationDate: '2010',
    accessedAt: '2026-09-11',
    notes: 'Título, autoría y año corroborados de forma consistente por búsqueda (INTA, 2010) e identificados en una URL oficial de argentina.gob.ar. Contenido (mapas de temperatura media, precipitación anual, evapotranspiración, balance hídrico, índice de aridez de De Martonne) NO leído directamente en esta sesión. No se usó ninguna cifra de este atlas — se registra como el candidato más prometedor para climatología de referencia por región en una fase de investigación climática dedicada futura, dado que ya es mapas por variable a nivel de todo el país.'
  },
  {
    id: 'cientifica-spencer-1971-solar-declination',
    title: 'Fourier series representation of the position of the sun',
    authorOrInstitution: 'Spencer, J. W. — Search, vol. 2, n.º 5, p. 172',
    url: null,
    type: 'SCIENTIFIC',
    publicationDate: '1971',
    accessedAt: '2026-09-11',
    notes: 'SIN URL: no se localizó una copia digital accesible de esta publicación de 1971 (revista "Search" de la ANZAAS, previa a la era de acceso abierto digital) — se prefirió `url: null` antes que inventar una dirección. NO verificado por lectura directa del artículo original. La fórmula exacta de declinación solar (serie de Fourier de 7 términos) fue corroborada de forma textual y consistente por fuentes secundarias que la citan como la aproximación más citada en la literatura de geometría solar (error máximo documentado de ~0.28°). Usada en `lib/geo/photoperiod.js` para el cálculo de duración del día — nivel de evidencia D (cálculo determinista, no medición), nunca presentado como dato oficial.'
  },
  {
    id: 'academica-cooper-1969-solar-geometry',
    title: 'The absorption of radiation in solar stills (geometría solar estándar: ángulo horario y duración del día)',
    authorOrInstitution: 'Cooper, P. I. — Solar Energy, vol. 12, n.º 3, pp. 333-346',
    url: null,
    type: 'ACADEMIC',
    publicationDate: '1969',
    accessedAt: '2026-09-11',
    notes: 'SIN URL: no se localizó una copia digital verificable en esta sesión — se dejó `url: null`. NO verificado por lectura directa. Se cita por convención de la literatura de ingeniería solar como origen habitual de la relación estándar entre ángulo horario de salida/puesta de sol y latitud/declinación (`duración del día = (24/π) · arccos(-tan(latitud)·tan(declinación))`) — es geometría esférica estándar, reproducida idénticamente en numerosos textos posteriores (ej. Duffie & Beckman, "Solar Engineering of Thermal Processes"), no una fórmula exclusiva ni controvertida de este paper puntual.'
  },

  // --- Fuentes de contenido: Loop 3C — referencias fenológicas de Cultivo/Cosecha (Fase 52, 2026-09-11) ---
  {
    id: 'cientifica-garner-allard-1920-photoperiodism-discovery',
    scope: 'GENERAL',
    title: 'Effect of the Relative Length of Day and Night and Other Factors of the Environment on Growth and Reproduction in Plants',
    authorOrInstitution: 'Garner, W. W.; Allard, H. A. — trabajo original en Journal of Agricultural Research 18:553-606 (1920); entrada verificada en Monthly Weather Review, vol. 48, p. 415',
    url: 'https://doi.org/10.1175/1520-0493(1920)48%3C415b:EOTRLO%3E2.0.CO;2',
    type: 'SCIENTIFIC',
    publicationDate: '1920-07',
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO vía Crossref (DOI real, resuelve a la entrada bibliográfica del hallazgo en Monthly Weather Review — un resumen/reseña contemporáneo del trabajo original más extenso publicado el mismo año en Journal of Agricultural Research, no leído en su versión completa en esta sesión). Es el trabajo fundacional que describió por primera vez el fotoperiodismo vegetal, usando precisamente tabaco y SOJA (Glycine max) como especies experimentales — ambas plantas de día corto, la misma categoría fotoperiódica que Cannabis sativa. Se cita únicamente para respaldar que la soja es una especie históricamente fundacional en la ciencia del fotoperiodismo y del mismo tipo de respuesta (día corto) que el cannabis — no se cita ningún hallazgo cuantitativo específico del paper.'
  },
  {
    id: 'academica-truffer-2011-soja-entrerios-grupos-madurez',
    scope: 'GENERAL',
    title: 'La dinámica del campo científico tecnológico en la construcción del conocimiento local: La soja en Entre Ríos',
    authorOrInstitution: 'Truffer, I.; Saluso, A.; Nolla, J. D. — revista Pampa, n.º 7, supl. 1',
    url: 'https://www.scielo.org.ar/scielo.php?lng=es&nrm=iso&pid=S2314-02082011000200009&script=sci_arttext&tlng=es',
    type: 'ACADEMIC',
    publicationDate: '2011',
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO por lectura directa (SciELO Argentina, acceso abierto). Cita textualmente (atribuido a Ing. Baigorri, 1991, dentro del propio artículo): "Debido a la respuesta fotoperiódica de la soja, el ciclo tiene una importancia fundamental en la adaptación de los cultivares a cada región... Cada Grupo de Madurez tiene una franja latitudinal en la que se comporta como ciclo medio" — y da un ejemplo concreto: "La provincia de Entre Ríos queda comprendida en la región Pampeana Norte, con los grupos de madurez VI y VII." Se usa para respaldar que la relación entre latitud/fotoperiodo y el ciclo de desarrollo de la soja está documentada y sistematizada en la agronomía argentina — NO se usa para asignar un grupo de madurez a ninguna otra de las 24 jurisdicciones (solo Entre Ríos tiene esta cita puntual) ni, bajo ningún concepto, para inferir una fecha de floración o cosecha de Cannabis sativa.'
  },

  // --- Fuentes de contenido: Loop 4 — investigación ambiental y fenológica (Fase 53, 2026-09-11) ---
  {
    id: 'oficial-smn-listado-estaciones',
    title: 'Listado de Estaciones Meteorológicas del SMN',
    authorOrInstitution: 'Servicio Meteorológico Nacional (SMN), publicado vía datos.gob.ar (Datos Argentina)',
    url: 'https://ssl.smn.gob.ar/dpd/zipopendata.php?dato=estaciones',
    type: 'OFFICIAL',
    publicationDate: null,
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO por descarga y lectura directa (archivo ZIP oficial, descomprimido y parseado en esta sesión — 118 estaciones con nombre, provincia, latitud/longitud en grados/minutos, altura, número OACI). Se usó únicamente para contar estaciones SMN reales por provincia (dato de cobertura/densidad de red, no un valor climático) — las 24 jurisdicciones tienen al menos 1 estación (mínimo: Tucumán con 1; máximo: Buenos Aires con 26). No se usó ningún valor de temperatura/precipitación de este archivo (no los contiene: es solo el listado de estaciones, no sus normales).'
  },
  {
    id: 'oficial-indec-anida-tipos-climaticos-wfs',
    title: 'Tipos de climas (capa geoespacial WFS) — Atlas Nacional Interactivo de la República Argentina (ANIDA)',
    authorOrInstitution: 'Adriana Zajarevich — INDEC / IGN, publicado vía GeoNode (geonode.indec.gob.ar)',
    url: 'https://geonode.indec.gob.ar/layers/geonode_data:geonode:tipos_climaticos',
    type: 'OFFICIAL',
    publicationDate: null,
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO por consulta directa al servicio WFS oficial (GetFeature, formato GeoJSON, EPSG:4326) en esta sesión — se obtuvieron las 16 geometrías reales de tipo de clima (clasificación propia IGN/INDEC en español, con 4 grupos —Frío, Templado, Cálido, Árido— y 16 tipos, ej. "Templado/Pampeano", "Árido/Patagónico"; no son códigos Köppen literales pero es la misma capa oficial ya identificada como fuente Köppen en `21_GEO_CLIMATE_RESEARCH.md`). Se determinó el tipo climático correspondiente a cada una de las 24 jurisdicciones mediante un cálculo de punto-en-polígono (ray casting, implementado sin librerías externas) usando el mismo centroide geométrico provincial ya verificado en `PROVINCE_LOCATIONS` (Fase 11) — un cálculo determinista sobre datos oficiales, no una estimación editorial. LICENCIA: figura "Not Specified" en el origen (mismo estado ya documentado en `21_GEO_CLIMATE_RESEARCH.md`/D10) — se cita el resultado de la clasificación con atribución completa, sin redistribuir el archivo/capa completo. LIMITACIÓN CENTRAL: el resultado corresponde al punto exacto del centroide, no a toda la superficie provincial — en provincias con alta diversidad interna ya documentada en `03_GEO.md` (Mendoza, Salta, Jujuy, Buenos Aires), el tipo climático de otras zonas de la misma provincia puede ser distinto del que da el centroide.'
  },
  {
    id: 'cientifica-schmidt-2024-tabaco-fotoperiodo-domesticacion',
    scope: 'GENERAL',
    title: 'COL2-dependent photoperiodic floral induction in Nicotiana sylvestris seems to be lost in the N. sylvestris × N. tomentosiformis hybrid N. tabacum',
    authorOrInstitution: 'Schmidt, F. J.; Grundmann, L.; Lahme, M.; Seidemann, M.; Schwarze, A.; Lichtenauer, S.; Twyman, R. M.; Prüfer, D.; Noll, G. A. — Frontiers in Plant Science',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10794312/',
    type: 'SCIENTIFIC',
    publicationDate: '2024',
    accessedAt: '2026-09-11',
    notes: 'VERIFICADO por lectura directa (PMC, artículo de libre acceso; DOI 10.3389/fpls.2023.1249879). Investigado como candidato para sumar el tabaco (cultivado realmente en Jujuy/Salta/Tucumán/Chaco/Catamarca/Misiones/Corrientes, según fuente oficial MAGyP) como segunda especie de referencia fenológica junto a la soja. RESULTADO: se descartó — el paper demuestra que el tabaco CULTIVADO (Nicotiana tabacum) perdió, durante su domesticación/hibridación, la sensibilidad fotoperiódica de sus ancestros silvestres (N. sylvestris, día largo obligado; N. tomentosiformis, día corto facultativo) y hoy tiene "comportamiento de floración día-neutro". Esto lo vuelve una referencia MÁS DÉBIL que la soja para ilustrar una respuesta de día corto comparable a Cannabis sativa, pese a cultivarse en regiones argentinas relevantes — se documenta la investigación y el descarte, no se incorpora el tabaco como referencia.'
  },

  // --- Fuentes de contenido: Loop 4.1 — Historia de la planta y Cannabis regional (Fase 54, 2026-09-12) ---
  {
    id: 'cientifica-mcpartland-2018-cannabis-europa-polen',
    scope: 'CANNABIS',
    title: 'Cannabis is indigenous to Europe and cultivation began during the Copper or Bronze age: a probabilistic synthesis of fossil pollen studies',
    authorOrInstitution: 'McPartland, J. M.; Guy, G. W.; Hegman, W. — Vegetation History and Archaeobotany, vol. 27, pp. 635-648',
    url: 'https://doi.org/10.1007/s00334-018-0678-7',
    type: 'SCIENTIFIC',
    publicationDate: '2018-07',
    accessedAt: '2026-09-12',
    notes: 'Título, autoría, revista, volumen/páginas y DOI verificados de forma consistente y vía metadatos de búsqueda; texto completo no leído directamente en esta sesión. Síntesis probabilística de estudios de polen fósil: Cannabis es nativo de Europa desde el Pleistoceno (polen ya presente 18.500-15.000 años AP), pero la evidencia de CULTIVO (no solo presencia silvestre) recién aparece en la Edad del Cobre/Bronce en el sudeste de Europa, y los escitas (cultura esteparia de la Edad del Hierro) habrían introducido el cultivo de cáñamo a pueblos celtas/eslavos/fino-úgricos hacia el 550 a.C. Se cita para distinguir explícitamente "presencia silvestre" de "cultivo" en la línea de tiempo europea — no se afirma ninguna fecha de "primer cultivo mundial" a partir de esta fuente.'
  },
  {
    id: 'academica-diaz-ordonez-2017-cannabis-chile-colonial',
    scope: 'CANNABIS',
    title: 'Cannabis Sativa y Chile (1577-1700): Un Insumo al servicio del Imperio',
    authorOrInstitution: 'Díaz-Ordóñez, M.; Rodríguez Hernández, A. J. — TEMPUS Revista en Historia General (Universidad de Antioquia), n.º 6, pp. 1-21',
    url: 'https://revistas.udea.edu.co/index.php/tempus/article/view/329709',
    type: 'ACADEMIC',
    publicationDate: '2017-11',
    accessedAt: '2026-09-12',
    notes: 'VERIFICADO por lectura directa (texto completo de 22 páginas extraído y leído en esta sesión). Fuente central para la sección "Cannabis en Sudamérica" — con citas textuales a documentos primarios del Archivo General de Indias (AGI). Hallazgos clave usados: (1) el mito difundido de "1545, Quillota, Chile" como primer cultivo americano es cuestionado por los propios autores — la evidencia documental más temprana de envío de semillas a "las Indias" data de 1513-1520 y llegó primero a Mesoamérica, no a Chile; la Real Cédula de 1545 fue una orden general al virreinato, no específica de Chile. (2) Chile se consolidó como la única región con cultivo de cáñamo rentable a gran escala en América del Sur colonial (valles de Quillota y La Ligua, desde 1577/1605), por motivos fenológicos/climáticos (clima mediterráneo). (3) Documentos primarios AGI muestran que la Corona española extendió órdenes de fomento del cultivo de cáñamo a la región del Río de la Plata y Tucumán en 1619 (AGI, Buenos Aires, 2, L.5) y 1626 (AGI, Indiferente, 429, L.37) — es decir, hay evidencia documental de intentos/órdenes que alcanzaron el territorio hoy argentino casi 180 años antes de Belgrano, aunque sin evidencia de que resultaran en cultivo exitoso allí (los propios funcionarios españoles confirmaron que, salvo Chile, el cáñamo no podía cultivarse rentablemente en las demás jurisdicciones). (4) Hacia 1644-1648, la escasez de mano de obra en Chile se vincula documentalmente al cierre del puerto de Buenos Aires — un dato que conecta económicamente al Río de la Plata con la cadena de suministro del cáñamo colonial sin que la región fuera zona de cultivo.'
  },
  {
    id: 'historica-belgrano-1797-memoria-lino-canamo',
    scope: 'CANNABIS',
    title: 'Utilidades que resultarán a esta Provincia y a la Península del cultivo del lino y del cáñamo (Memoria del Consulado de Comercio de Buenos Aires)',
    authorOrInstitution: 'Belgrano, Manuel — Secretario del Real Consulado de Comercio de Buenos Aires',
    url: null,
    type: 'OTHER',
    publicationDate: '1797-06-09',
    accessedAt: '2026-09-12',
    notes: 'SIN URL: no se localizó una copia digitalizada del documento primario en esta sesión — se prefirió `url: null` antes que inventar una dirección. NO verificado por lectura directa del texto original de Belgrano. Título, autoría, fecha de presentación (9 de junio de 1797) y contexto institucional (Secretario del Consulado de Comercio de Buenos Aires) corroborados de forma consistente por varias fuentes secundarias (Biblioteca Nacional de Maestros, artículos de historia económica). Se cita específicamente para corregir la simplificación popular "Belgrano promovía el cultivo de cannabis": el documento real trata sobre "lino y cáñamo" (fibra textil/naval, uso industrial), no sobre la planta en sentido psicoactivo/medicinal moderno, y la iniciativa de fomento fracasó por falta de apoyo gubernamental y privado (no llegó a establecer un cultivo sostenido) — ambos matices corroborados de forma independiente por más de una fuente secundaria.'
  },
  {
    id: 'cientifica-pollio-2016-nombre-cannabis-taxonomia',
    scope: 'CANNABIS',
    title: 'The Name of Cannabis: A Short Guide for Nonbotanists',
    authorOrInstitution: 'Pollio, A. — Cannabis and Cannabinoid Research, vol. 1, n.º 1',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5531363/',
    type: 'SCIENTIFIC',
    publicationDate: '2016',
    accessedAt: '2026-09-12',
    notes: 'VERIFICADO por lectura directa (PMC, artículo de libre acceso; DOI 10.1089/can.2016.0027). Fuente central para "Genética y tipos": reconstruye la historia taxonómica real — Linnaeus (1753, Species Plantarum) describió una única especie, Cannabis sativa; Lamarck (1785) propuso Cannabis indica como especie distinta por diferencias morfológicas entre poblaciones cultivadas de Occidente y poblaciones silvestres de India (NO por diferencias climáticas); Janischevsky (1924) describió Cannabis ruderalis en poblaciones silvestres/ruderales del sur de Rusia. El propio artículo señala que la mayoría de los taxónomos modernos tratan a Cannabis como un género monoespecífico o polimórfico, no como tres especies separadas, y que los nombres "sativa"/"indica" usados hoy por cultivadores y dispensarios "no tienen validez taxonómica" — se cita textualmente para desactivar la idea de que son "tres variedades modernas independientes".'
  },
  {
    id: 'cientifica-alter-2024-cannabis-fotoperiodo-giberelina',
    scope: 'CANNABIS',
    title: 'Inflorescence development in female cannabis plants is mediated by photoperiod and gibberellin',
    authorOrInstitution: 'Alter, H.; Sade, Y.; Sood, A.; Carmeli-Weissberg, M.; Shaya, F.; Kamenetsky-Goldstein, R.; Bernstein, N.; Spitzer-Rimon, B. — Horticulture Research',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11560369/',
    type: 'SCIENTIFIC',
    publicationDate: '2024',
    accessedAt: '2026-09-12',
    notes: 'VERIFICADO por lectura directa (PMC, artículo de libre acceso; DOI 10.1093/hr/uhae245). Primer respaldo de este proyecto sobre el MECANISMO fotoperiódico específico de Cannabis sativa (no una analogía con otra especie): bajo fotoperiodo de día corto (SD), los niveles de giberelina (GA4) bajan, lo que produce el cese de elongación de entrenudos y la formación de una inflorescencia condensada; se requieren al menos 3 días consecutivos de fotoperiodo corto para que la señal de floración se registre. Aplicar giberelina exógena imita el efecto de día largo e impide la inflorescencia compacta. Se usa para reforzar la entrada "Luz como señal temporal" y la sección de Cultivo con ciencia directa de Cannabis, no una referencia de especie comparable.'
  },
  {
    id: 'preprint-cannabis-daylength-mutation-2023',
    scope: 'CANNABIS',
    title: 'Loss of daylength sensitivity by splice site mutation in Cannabis',
    authorOrInstitution: 'Preprint en bioRxiv (autoría no confirmada por lectura directa en esta sesión)',
    url: 'https://www.biorxiv.org/content/10.1101/2023.03.10.532103',
    type: 'SCIENTIFIC',
    publicationDate: '2023',
    accessedAt: '2026-09-12',
    notes: 'PREPRINT, sin revisión por pares confirmada — no verificado por lectura directa (la herramienta de fetch devolvió error de límite de solicitudes). Título y existencia corroborados por búsqueda. Se registra únicamente como respaldo indicativo, ya corroborado de forma independiente por múltiples fuentes divulgativas convergentes (no usadas como autoridad primaria), de que la pérdida de sensibilidad al fotoperiodo en Cannabis (rasgo asociado a variedades "autofloreciente") tiene una base genética identificable (mutación puntual) — no se cita ningún detalle cuantitativo del preprint.'
  },
  {
    id: 'otra-semillalibre-2026-guia-regional-revisada',
    scope: 'CANNABIS',
    title: '"Cuándo plantar Cannabis en Argentina según tu región — Guía 2026" (blog comercial, revisado y contrastado, no usado como autoridad)',
    authorOrInstitution: 'Semilla Libre (sitio comercial de venta de semillas)',
    url: 'https://semillalibre.com/blog/cuando-plantar-cannabis-en-argentina-segun-tu-region-guia-2026',
    type: 'OTHER',
    publicationDate: '2026',
    accessedAt: '2026-09-12',
    notes: 'Blog comercial SIN ninguna fuente/cita propia (confirmado por lectura directa: cero referencias en el artículo). Investigado por instrucción explícita del Loop 4.1, clasificando cada afirmación: (a) "las autoflorecientes no dependen del fotoperiodo para florecer" — CORROBORADA de forma independiente por ciencia real (ver `cientifica-pollio-2016-...` y `preprint-cannabis-daylength-mutation-2023`); (b) "Patagonia tiene temporadas más cortas y temperaturas más bajas" — PARCIALMENTE CORROBORADA (consistente con la clasificación climática real de esta provincia, `oficial-indec-anida-tipos-climaticos-wfs`, pero sin ninguna fuente que verifique la conclusión de cultivo específica); (c) ventanas de siembra/floración/cosecha por mes y por región (ej. "floración: febrero a abril" para la zona centro) — NO CORROBORADAS: ninguna fuente científica o agronómica independiente respalda esas fechas exactas para Cannabis en Argentina. Estas fechas NO se incorporaron a ningún dato del proyecto — se documentan acá únicamente como el resultado de la verificación pedida, no como contenido utilizable.'
  },

  // --- Fuentes de contenido: Loop 4.3 — investigación regional de Cannabis + Ficha Provincial (2026-09-13) ---
  {
    id: 'oficial-inase-resolucion-238-2023-cultivares-cannabis',
    scope: 'CANNABIS',
    title: 'Resolución 238/2023 — Registro Nacional de la Propiedad de Cultivares: Malvina, Ballena Franca, Cenpat, Pachamama, Conicet y Mariquita (Cannabis sativa L.)',
    authorOrInstitution: 'Instituto Nacional de Semillas (INASE) — Boletín Oficial de la República Argentina',
    url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/286492/20230516',
    type: 'OFFICIAL',
    publicationDate: '2023-04-21',
    accessedAt: '2026-09-13',
    notes: 'VERIFICADO por lectura directa. Resolución que ordena la inscripción, a pedido de CONICET, de seis creaciones fitogenéticas de Cannabis sativa L. en el Registro Nacional de la Propiedad de Cultivares (Ley 20.247): Malvina, Ballena Franca, Cenpat, Pachamama, Conicet y Mariquita. Es la única evidencia de nivel A de cultivares de Cannabis argentinos registrados oficialmente que este proyecto encontró para cualquiera de las 24 jurisdicciones — desarrollados por CONICET-CENPAT (Puerto Madryn, Chubut).'
  },
  {
    id: 'oficial-conicet-2023-comercializacion-semillas-cannabis',
    scope: 'CANNABIS',
    title: 'Por primera vez se comercializarán semillas de cannabis medicinal con tecnología CONICET',
    authorOrInstitution: 'CONICET (Consejo Nacional de Investigaciones Científicas y Técnicas)',
    url: 'https://www.conicet.gov.ar/por-primera-vez-se-comercializaran-semillas-de-cannabis-medicinal-con-tecnologia-conicet/',
    type: 'OFFICIAL',
    publicationDate: '2023-05-19',
    accessedAt: '2026-09-13',
    notes: 'VERIFICADO por lectura directa. Comunicado oficial de CONICET que confirma cultivo real al aire libre en Puerto Madryn, Chubut, de los cultivares Malvina y Pachamama (temporada de verano 2022-2023): "el verano pasado cultivamos las plantas de estos dos cultivares que vamos a comercializar... del ensayo a campo, donde se germinaron 1200 semillas feminizadas de Malvina, solo dos plantas mostraron floración masculina". Confirma quimiotipo (Malvina: alto en THC; Pachamama: alto en CBD) y la licencia de comercialización a la empresa Whale Leaf Farm (Puerto Madryn). Es la fuente que convierte el registro varietal (`oficial-inase-resolucion-238-2023-cultivares-cannabis`) en evidencia de CULTIVO REAL, no solo de registro de propiedad intelectual — nivel A para Chubut específicamente, sin datos públicos de fenología completa (fecha de siembra, floración o cosecha) más allá de "el verano pasado".'
  },
  {
    id: 'cientifica-zhang-2021-hemp-photoperiod-cultivars',
    scope: 'CANNABIS',
    title: 'Photoperiodic Flowering Response of Essential Oil, Grain, and Fiber Hemp (Cannabis sativa L.) Cultivars',
    authorOrInstitution: 'Zhang, M.; Anderson, S. L.; Brym, Z. T.; Pearson, B. J. — Frontiers in Plant Science, vol. 12, art. 694153',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8367441/',
    type: 'SCIENTIFIC',
    publicationDate: '2021-08-02',
    accessedAt: '2026-09-13',
    notes: 'VERIFICADO por lectura directa (PMC, artículo de libre acceso; DOI 10.3389/fpls.2021.694153). Evidencia DIRECTA de Cannabis sativa (27 cultivares de cáñamo: 15 de aceite esencial, 12 de fibra/grano), no una analogía con otra especie: el umbral fotoperiódico crítico varía sustancialmente entre cultivares (13h45m a 15h30m en los de aceite esencial; más uniforme, ~14h, en los de fibra/grano), y los cultivares de origen más norteño (Canadá, Polonia) florecieron más rápido (4-11 días bajo fotoperiodo crítico) que los de origen más sureño (China, 21-25 días) — un patrón de adaptación genotipo×latitud de origen, no de la latitud de cultivo actual. Se usa como evidencia GENERAL de Cannabis (nivel B: internacional, no argentina) para explicar por qué el ciclo/floración de Cannabis no es un valor único, en lugar de recurrir a la analogía de la soja para esta parte del contenido — ninguno de estos 27 cultivares es argentino ni se probó en Argentina.'
  },

  // --- Fuentes de contenido: Loop 4.3 — nuevas entradas "Formas de germinar", "Poda" y
  // "Fertilización y nutrición" (2026-09-13) ---
  {
    id: 'academica-unne-nutricion-mineral-dabrio-2020',
    scope: 'GENERAL',
    title: 'Guía de estudio: Nutrición mineral de los vegetales',
    authorOrInstitution: 'Dabrio, A. (elaboración); Marassi, M. A. (corrección) — Cátedra de Fisiología Vegetal, FaCENA, Universidad Nacional del Nordeste (UNNE)',
    url: 'https://exa.unne.edu.ar/biologia/fisiologia.vegetal/Gu%C3%ADa%20de%20estudio-Nutricion%20mineral%202020.pdf',
    type: 'ACADEMIC',
    publicationDate: '2020',
    accessedAt: '2026-09-13',
    notes: 'VERIFICADO por lectura directa (extracción local con PyMuPDF; mismo dominio y misma cátedra que las fuentes ya verificadas de germinación y fitocromos de este proyecto). Guía de cátedra sobre nutrición mineral: clasificación macro/micronutrientes, criterios de esencialidad, y sintomatología de deficiencia nutriente por nutriente. Se cita textualmente para dos hechos concretos: (1) el nitrógeno y el fósforo son muy móviles dentro de la planta, por lo que sus síntomas de deficiencia aparecen primero en las hojas más viejas/adultas; (2) el azufre es relativamente inmóvil, por lo que su deficiencia se manifiesta primero en las hojas jóvenes — el mismo principio de movilidad que explica por qué el patrón de aparición de un síntoma (hojas viejas vs. hojas jóvenes) orienta sobre qué nutriente falta, sin necesitar una tabla de dosificación.'
  },
  {
    id: 'academica-kirkby-romheld-2007-micronutrientes-fisiologia',
    scope: 'GENERAL',
    title: 'Micronutrientes en la fisiología de las plantas: funciones, absorción y movilidad',
    authorOrInstitution: 'Kirkby, E. A. (Universidad de Leeds); Römheld, V. (Universidad de Hohenheim) — versión en español, publicada vía Cátedra de Fisiología Vegetal, FaCENA, UNNE',
    url: 'https://exa.unne.edu.ar/biologia/fisiologia.vegetal/MicronutrientesenlaFisiologia.pdf',
    type: 'ACADEMIC',
    publicationDate: '2007',
    accessedAt: '2026-09-13',
    notes: 'VERIFICADO por lectura directa (extracción local con PyMuPDF). Versión en español de Kirkby, E.A. y V. Römheld (2007), "Micronutrients in plant physiology: functions, uptake and mobility", Proceedings 543, The International Fertilizer Society. Explica la clasificación macro/micronutrientes por concentración requerida (no por importancia), y documenta con el hierro un caso concreto de nutriente de baja movilidad en el floema: su deficiencia se manifiesta primero como clorosis en las hojas jóvenes, no en las viejas — el caso opuesto al nitrógeno/fósforo (ver `academica-unne-nutricion-mineral-dabrio-2020`). Se usa para el concepto general de movilidad de nutrientes, nunca para ninguna cifra de dosificación.'
  },
  {
    id: 'cientifica-chavalina-2026-hemp-topping-morphology',
    scope: 'CANNABIS',
    title: 'Morphological, physiological, and biochemical responses of two industrial hemp (Cannabis sativa L.) cultivars to different levels of topping',
    authorOrInstitution: 'Chavalina, S.; Ioannidis, V.; Bilalis, D.; Lamari, F.; Zervoudakis, G.; Salachas, G. — Journal of Cannabis Research, vol. 8',
    url: 'https://link.springer.com/article/10.1186/s42238-026-00410-2',
    type: 'SCIENTIFIC',
    publicationDate: '2026-03-06',
    accessedAt: '2026-09-13',
    notes: 'Título, autoría completa, revista, volumen y DOI (10.1186/s42238-026-00410-2) verificados vía Crossref. El texto completo no se pudo leer directamente en esta sesión (acceso institucional/paywall de Springer). Se cita únicamente para respaldar el hecho general de que existe evidencia científica directa (no una analogía con otra especie) de que el topping (despunte del meristema apical) produce cambios morfológicos, fisiológicos y bioquímicos medibles en cáñamo industrial (Cannabis sativa L.), y que esos cambios varían entre cultivares — no se cita ningún resultado cuantitativo específico del estudio, que no se pudo verificar por lectura directa.'
  },
  {
    id: 'academica-beveridge-2023-apical-dominance-review',
    scope: 'GENERAL',
    title: 'Lessons from a century of apical dominance research',
    authorOrInstitution: 'Beveridge, C. A.; Rameau, C.; Wijerathna-Yapa, A. — Journal of Experimental Botany, vol. 74, n.º 14, pp. 3903-3922',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10400159/',
    type: 'SCIENTIFIC',
    publicationDate: '2023',
    accessedAt: '2026-09-13',
    notes: 'Título, autoría completa, revista, volumen/páginas y DOI (10.1093/jxb/erad137) verificados vía Crossref. El texto completo no se pudo leer directamente en esta sesión (la página de PMC devolvió una verificación anti-bot en el momento de la consulta). Se cita para respaldar el mecanismo general y ampliamente establecido de la dominancia apical (el meristema apical, vía auxina y otras señales hormonales, inhibe el crecimiento de las yemas laterales) — es una revisión de más de un siglo de investigación sobre un mecanismo consensuado en fisiología vegetal, no un hallazgo puntual o controvertido de este paper.'
  },

  // --- Fuentes de altitud: reutilización del listado SMN ya registrado (Loop 4.3, 2026-09-13) ---
  // No se registra una fuente nueva: `oficial-smn-listado-estaciones` (arriba) ya cubre la
  // columna ALTURA del mismo archivo oficial ya descargado en el Loop 4 — ver
  // `lib/geo/provinceProfile.js` (`CAPITAL_STATION_ALTITUDE`) para el uso puntual de esa columna.

  // --- Fuentes de contenido: Loop 4.4.1 — Evidencia argentina Jujuy/Misiones (2026-09-14) ---
  {
    id: 'oficial-cannava-jujuy-planta-anmat-2022',
    scope: 'CANNABIS',
    title: 'Jujuy tiene la única Planta Industrial de procesamiento de Cannabis Medicinal habilitada por ANMAT',
    authorOrInstitution: 'Gobierno de la Provincia de Jujuy — Secretaría de Comunicación y Gobierno Abierto',
    url: 'https://prensa.jujuy.gob.ar/farmaceutico/jujuy-tiene-la-unica-planta-industrial-procesamiento-cannabis-medicinal-habilitada-anmat-n108790',
    type: 'OFFICIAL',
    publicationDate: '2022-10-04',
    accessedAt: '2026-09-14',
    notes: 'VERIFICADO por lectura directa. Comunicado oficial del Gobierno de Jujuy confirmando que Cannava S.E. opera la primera planta industrial de producción y procesamiento farmacéutico de Cannabis medicinal habilitada por ANMAT en Argentina. Confirma explícitamente: (1) invernadero automatizado que controla humedad, temperatura, luz y riego de forma computarizada; (2) capacidad productiva anual de 80 toneladas de inflorescencias medicinales; (3) primera cosecha de 35 hectáreas; (4) personal de 200 empleados. NO menciona fotoperiodo específico (18/6 u otro), iluminación suplementaria, temperatura o HR exactas, PPFD ni SOPs internos. Esos datos no están en ningún comunicado oficial público accesible — no se deben atribuir a Cannava sin fuente.'
  },
  {
    id: 'oficial-cannava-jujuy-franquicias-2023',
    scope: 'CANNABIS',
    title: 'Jujuy lanza un sistema inédito de franquicias biotecnológicas para la producción privada de cannabis medicinal de grado farmacéutico',
    authorOrInstitution: 'Gobierno de la Provincia de Jujuy — Secretaría de Comunicación y Gobierno Abierto',
    url: 'https://prensa.jujuy.gob.ar/gerado-morales/jujuy-lanza-un-sistema-inedito-franquicias-biotecnologicas-la-produccion-privada-cannabis-medicinal-grado-farmaceutico-n110861',
    type: 'OFFICIAL',
    publicationDate: '2023-04-14',
    accessedAt: '2026-09-14',
    notes: 'VERIFICADO por lectura directa. Confirma la escala del proyecto: parque de incubación de más de 70 hectáreas con 66 invernaderos altamente tecnificados y automatizados de 2500 m², capacidad para 2000 plantas por ciclo en 3 o 4 ciclos anuales. Menciona manuales de calidad y SOPs que los franquiciados deberán respetar — sin publicar el contenido de esos manuales. Confirma estándares de farmacopea alemana y GACP/GMP. Ninguna condición técnica numérica (temperatura, HR, fotoperiodo) aparece en el texto.'
  },
  {
    id: 'periodistica-misiones-biofabrica-disolucion-2026',
    scope: 'CANNABIS',
    title: 'Misiones disolvió la empresa provincial de cannabis medicinal a fin de "apuntalar la eficiencia del Estado"',
    authorOrInstitution: 'Infobae',
    url: 'https://www.infobae.com/politica/2026/04/14/misiones-disolvio-la-empresa-provincial-de-cannabis-medicinal-a-fin-de-apuntalar-la-eficiencia-del-estado/',
    type: 'OTHER',
    publicationDate: '2026-04-14',
    accessedAt: '2026-09-14',
    notes: 'Nota periodística verificada por búsqueda directa. Confirma que el gobierno de Misiones disolvió MisioPharma/Biofábrica Misiones S.A. en abril de 2026. La producción de cannabis medicinal que realizaba esta empresa (modalidad híbrida invernadero + cielo abierto) cesó con la disolución. No se debe presentar a MisioPharma como una empresa actualmente operativa.'
  },

  // --- Fuentes de contenido: Loop 4.4.1 — Ciclo general de Cannabis sativa L. (2026-09-14) ---
  {
    id: 'cientifica-ahrens-2023-photoperiod-flowering-indoor',
    scope: 'CANNABIS',
    title: 'Is Twelve Hours Really the Optimum Photoperiod for Promoting Flowering in Indoor-Grown Cultivars of Cannabis sativa?',
    authorOrInstitution: 'Ahrens, A.; Llewellyn, D.; Zheng, Y. — Plants (Basel), MDPI, vol. 12, n.º 14, art. 2605',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10386198/',
    type: 'SCIENTIFIC',
    publicationDate: '2023-07-10',
    accessedAt: '2026-09-14',
    notes: 'VERIFICADO por lectura directa (PMC, artículo de libre acceso; DOI 10.3390/plants12142605). Estudio con 10 cultivares drug-type de Cannabis sativa bajo 6 fotoperiodos de floración (12 h a 15 h). Resultados clave: (1) el protocolo 18 h en vegetativo y 12 h en floración es el estándar industrial ampliamente adoptado, pero NO es el único que induce floración — muchos cultivares florecen robustamente hasta 14 h, con demoras de 0 a 4 días según cultivar; (2) algunos cultivares iniciaron floración incluso a 15 h aunque sin desarrollo posterior de inflorescencia; (3) la respuesta al fotoperiodo es cultivar-específica y no predecible de forma universal. Temperatura de ensayo: 25 °C constante. HR mantenida ≥ 60 % con sistema de nebulización. Se usa para respaldar: (a) el protocolo 18/6 y 12/12 como referencias ampliamente utilizadas, no como reglas universales; (b) que la variación entre cultivares es real y documentada; (c) los rangos de temperatura de referencia (25 °C para el ensayo) sin presentarlos como únicos valores válidos. No cita condiciones de cultivo argentino ni cultivares argentinos.'
  },

  // --- Fuentes de contenido: Loop 8B — verificación de documentacion/ (2026-09-15) ---
  // Cada fuente de este bloque fue encontrada y leída directamente durante esta sesión (WebSearch +
  // WebFetch) para reemplazar material de `documentacion/*.docx` que citaba estudios/normas por
  // nombre sin URL verificable. Dos citas de `documentacion/` NO pudieron confirmarse y quedaron
  // afuera deliberadamente: "Mejía et al. (2015)" (ningún estudio con esos datos apareció en la
  // búsqueda) y la afiliación "University of Haifa" para Bernstein et al. 2019 (la afiliación real,
  // verificada en el paper, es Volcani Center / Hebrew University of Jerusalem / Shenkar College).
  {
    id: 'ley-27669-marco-industrial',
    title: 'Ley 27.669 — Marco Regulatorio para el Desarrollo de la Industria del Cáñamo Industrial y del Cannabis Medicinal (texto completo)',
    authorOrInstitution: 'Boletín Oficial de la República Argentina',
    url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/263212/20220526',
    type: 'LEGAL',
    publicationDate: '2022-05-26',
    accessedAt: '2026-09-15',
    notes: 'VERIFICADO por búsqueda directa. Mismo texto legal que ya cita `ley-27669-publicidad` (ese registro se enfoca solo en la restricción de publicidad); este registro respalda el marco regulatorio industrial completo: crea la Agencia Regulatoria de la Industria del Cáñamo y del Cannabis Medicinal (ARICCAME, art. 4) y excluye al cáñamo industrial (≤1% THC en peso seco) del alcance de la Ley 23.737 (art. 3).'
  },
  {
    id: 'decreto-405-2023-reglamentario-27669',
    title: 'Decreto 405/2023 — Reglamentación de la Ley 27.669 y puesta en funcionamiento de ARICCAME',
    authorOrInstitution: 'Boletín Oficial de la República Argentina',
    url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/291621/20230807',
    type: 'LEGAL',
    publicationDate: '2023-08-07',
    accessedAt: '2026-09-15',
    notes: 'VERIFICADO por búsqueda directa. Aprueba la reglamentación de la Ley 27.669 (promulgado 04/08/2023, publicado 07/08/2023) y establece a ARICCAME como autoridad de aplicación, con competencia para autorizar importación, exportación, cultivo, producción industrial, fabricación, comercialización y adquisición de semillas y plantas de cannabis y sus derivados.'
  },
  {
    id: 'decreto-883-2020-reprocann',
    title: 'Decreto 883/2020 — Reglamentación de la Ley 27.350: autocultivo registrado y creación de REPROCANN',
    authorOrInstitution: 'Boletín Oficial de la República Argentina',
    url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/237208/20201112',
    type: 'LEGAL',
    publicationDate: '2020-11-12',
    accessedAt: '2026-09-15',
    notes: 'VERIFICADO por búsqueda directa (múltiples fuentes coincidentes: Boletín Oficial, Observatorio de Cannabis UNPAZ, InfoLeg). Deroga el Decreto 738/2017 (NO el "Decreto 1242/2017" que menciona por error un informe de `documentacion/` sin fuente verificable — ese número de decreto no aparece en ninguna fuente oficial encontrada). Crea el Registro del Programa de Cannabis (REPROCANN) y habilita el autocultivo, el cultivo solidario (tercero cultivador) y la inscripción vía ONG/Asociación Civil.'
  },
  {
    id: 'decreto-833-2024-intervencion-ariccame',
    title: 'Decreto 833/2024 — Intervención de ARICCAME por un año (Dr. Ignacio Ferrari, interventor)',
    authorOrInstitution: 'Boletín Oficial de la República Argentina',
    url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/314127/20240918',
    type: 'LEGAL',
    publicationDate: '2024-09-18',
    accessedAt: '2026-09-15',
    notes: 'VERIFICADO por búsqueda directa. Interviene ARICCAME por "inadecuada operatividad", con posibilidad de una única prórroga de un año (efectivamente prorrogada desde el 03/09/2025 según Resolución 464/2025, Ministerio de Economía). El interventor ejerce las competencias que la Ley 27.669 y el Decreto 405/2023 asignan al directorio de la Agencia.'
  },
  {
    id: 'resolucion-ariccame-41-2026-organos-propagacion',
    title: 'Resolución ARICCAME 41/2026 — Régimen especial de licencias para órganos de propagación de Cannabis sativa L.',
    authorOrInstitution: 'Boletín Oficial de la República Argentina',
    url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/343731/20260630',
    type: 'LEGAL',
    publicationDate: '2026-06-30',
    accessedAt: '2026-09-15',
    notes: 'VERIFICADO por búsqueda directa. Es la resolución más reciente encontrada sobre el régimen de propagación (semillas, esquejes, plantines) para fines medicinales bajo licencia ARICCAME. No se verificó el detalle completo de su articulado (solo el aviso de publicación en Boletín Oficial) — antes de citar una condición específica de esta resolución en una entrada, conviene leer el texto completo.'
  },
  {
    id: 'cientifica-bernstein-2019-cannabis-npk-cannabinoide-canopia',
    scope: 'CANNABIS',
    title: 'Impact of N, P, K, and Humic Acid Supplementation on the Chemical Profile of Medical Cannabis (Cannabis sativa L)',
    authorOrInstitution: 'Bernstein, N.; Gorelick, J.; Zerahia, R.; Koch, S. — Frontiers in Plant Science, vol. 10, art. 736',
    url: 'https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2019.00736/full',
    type: 'SCIENTIFIC',
    publicationDate: '2019-06-11',
    accessedAt: '2026-09-15',
    notes: 'VERIFICADO por lectura directa (Frontiers, acceso abierto). Reemplaza la cita sin URL de `documentacion/Informe Tecnico y Guia Practica.docx`, que atribuía este hallazgo a "Bernstein et al. (2019) / University of Haifa" — la afiliación real de los autores es Volcani Center, Hebrew University of Jerusalem, un centro I+D en Kiryat Arba y Shenkar College, no University of Haifa. Hallazgo clave: existe un gradiente espacial natural de cannabinoides según la altura de la planta — THC, CBD, CBG, THCV y CBC se concentran más en las regiones superiores; CBT y CBN se concentran más en flores medias/inferiores. La suplementación con ácido húmico reduce esa variabilidad espacial natural, pero a costa de menor concentración de cannabinoides en las regiones superiores.'
  },
  {
    id: 'cientifica-vergara-2016-cannabis-quimiotipo-evolucion-cultivo',
    scope: 'CANNABIS',
    title: 'Evolution of the Cannabinoid and Terpene Content during the Growth of Cannabis sativa Plants from Different Chemotypes',
    authorOrInstitution: 'Vergara, D. et al. — Journal of Natural Products, vol. 79, pp. 324-331',
    url: 'https://pubs.acs.org/doi/abs/10.1021/acs.jnatprod.5b00949',
    type: 'SCIENTIFIC',
    publicationDate: '2016-01-01',
    accessedAt: '2026-09-15',
    notes: 'VERIFICADO por búsqueda directa (resumen y metadatos confirmados en ACS Publications y ResearchGate; DOI 10.1021/acs.jnatprod.5b00949) — texto completo no verificado línea por línea en esta sesión (paywall). Siete plantas (chemotipos I, II y III) analizadas por HPLC-DAD (8 cannabinoides) y GC-FID/GC-MS (28 terpenos) durante el crecimiento. Hallazgo clave: el quimiotipo (razón THCA/CBDA) queda definido desde etapas tempranas y se mantiene estable durante todo el crecimiento; las plantas de quimiotipos II y III tardan más en alcanzar el pico de producción de THCA, CBDA y monoterpenos que las de quimiotipo I.'
  },

  // --- Fuentes de contenido: cierre de P2-5 (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md,
  // 2026-09-16) — huecos identificados en 62_LOOP_08_MAPA_MUNDIAL.md §4: "Cuidado de la plántula
  // post-emergencia", "Escarificación y semillas con dormición dura" y "Química de la maduración:
  // tricomas y cannabinoides". No se tocó el hueco de "Cáñamo industrial y régimen de licencias"
  // (marco legal): esa sección del mapa marca explícitamente alta sensibilidad legal y pide una
  // pasada de verificación dedicada contra Boletín Oficial antes de redactar, que excede el
  // alcance de esta tarea (P2-4/P2-5 únicamente).
  {
    id: 'agricultural-psu-extension-2026-damping-off',
    scope: 'GENERAL',
    title: 'Safeguard Your Seedlings from Damping-Off',
    authorOrInstitution: 'Jennie Diehl Mazzone — Penn State Extension',
    url: 'https://extension.psu.edu/safeguard-your-seedlings-from-damping-off',
    type: 'AGRICULTURAL',
    publicationDate: '2026-01-21',
    accessedAt: '2026-09-16',
    notes: 'VERIFICADO por lectura directa. Describe el damping-off (pre- y post-emergencia) como enfermedad fúngica/de mohos de agua (Rhizoctonia, Fusarium, Pythium, Phytophthora) favorecida por exceso de humedad, y las prácticas culturales que lo previenen. Evidencia general de fisiología/patología vegetal, no específica de Cannabis.'
  },
  {
    id: 'agricultural-illinois-extension-2022-leggy-seedlings',
    scope: 'GENERAL',
    title: '¿Qué anda mal con mis plántulas? (troubleshooting de problemas de siembra)',
    authorOrInstitution: 'Ken Johnson — University of Illinois Extension ("Good Growing")',
    url: 'https://extension.illinois.edu/blogs/good-growing/2022-02-25-whats-wrong-my-seedlings-troubleshooting-seed-starting-problems',
    type: 'AGRICULTURAL',
    publicationDate: '2022-02-25',
    accessedAt: '2026-09-16',
    notes: 'VERIFICADO por lectura directa. Identifica la luz insuficiente como causa más común de plántulas "estiradas" (etioladas) — tallos alargados y débiles — y describe cómo prevenirlo (luz suplementaria, distancia de la fuente, densidad de siembra). Evidencia general, no específica de Cannabis.'
  },
  {
    id: 'academica-ermis-2024-hardseededness-review',
    scope: 'GENERAL',
    title: 'Seeds of Resilience: Physiology and Mechanisms of Hardseededness',
    authorOrInstitution: 'Ermis, S.; Özden, E.; Yıldırım, E. — IntechOpen',
    url: 'https://www.intechopen.com/chapters/1173028',
    type: 'ACADEMIC',
    publicationDate: '2024',
    accessedAt: '2026-09-16',
    notes: 'VERIFICADO por lectura directa (capítulo revisado por pares, acceso abierto). Describe el mecanismo general de dormición física por impermeabilidad del tegumento al agua/oxígeno, y cómo la escarificación mecánica/química/térmica lo supera. Evidencia general de fisiología de semillas, no específica de Cannabis — DOI 10.5772/intechopen.1003847.'
  },
  {
    id: 'cientifica-walsh-2021-minor-cannabinoids-biosynthesis',
    scope: 'CANNABIS',
    title: 'Minor Cannabinoids: Biosynthesis, Molecular Pharmacology and Potential Therapeutic Uses',
    authorOrInstitution: 'Walsh, K. B.; McKinney, A. E.; Holmes, A. E. — Frontiers in Pharmacology, vol. 12, art. 777804',
    url: 'https://doi.org/10.3389/fphar.2021.777804',
    type: 'SCIENTIFIC',
    publicationDate: '2021',
    accessedAt: '2026-09-16',
    notes: 'VERIFICADO por lectura directa (Frontiers, acceso abierto). Describe la ruta de biosíntesis de cannabinoides dentro del tricoma glandular: condensación de hexanoil-CoA con malonil-CoA vía tetraketide synthase, ciclación a ácido olivetólico, prenilación a CBGA, y conversión de CBGA a THCA/CBDA/CBCA por sus respectivas oxidociclasas (THCA-sintasa, CBDA-sintasa, CBCA-sintasa).'
  },
  {
    id: 'cientifica-livingston-2019-trichome-morphology-maturation',
    scope: 'CANNABIS',
    title: 'Cannabis glandular trichomes alter morphology and metabolite content during flower maturation',
    authorOrInstitution: 'Livingston, S. J.; Quilichini, T. D.; Booth, J. K.; Wong, D. C. J.; Rensing, K. H.; Laflamme-Yonkman, J.; Castellarin, S. D.; Bohlmann, J.; Page, J. E.; Samuels, A. L. — The Plant Journal, vol. 101, no. 1, pp. 37-56',
    url: 'https://doi.org/10.1111/tpj.14516',
    type: 'SCIENTIFIC',
    publicationDate: '2019-10-12',
    accessedAt: '2026-09-16',
    notes: 'PARCIAL — autoría completa, revista y DOI verificados directamente vía Crossref; el texto completo no se pudo leer (acceso bloqueado por el editor, HTTP 403), se usa el resumen/hallazgos reportados en múltiples fuentes secundarias convergentes. Describe los tres tipos de tricoma glandular de Cannabis sativa (bulboso y capitado-sésil en hojas vegetativas; capitado-pedunculado asociado a la inflorescencia) y diferencias documentadas de contenido de cannabinoides/terpenos entre ellos (los capitado-pedunculados como principal reservorio).'
  },

  // --- Fuentes visuales — ronda 2026-09-18 (renovación de imágenes del Atlas: Genética y
  // tipos, Suelo y agua, Marco legal) ---
  {
    id: 'visual-cannabis-indica-oshaughnessy-1839',
    scope: 'CANNABIS',
    title: 'Cannabis Indica (Gunjah) — lámina de W. B. O\'Shaughnessy, 1839',
    authorOrInstitution: 'George Wallich (dibujante, según Roxburgh), en O\'Shaughnessy (1839) — Wellcome Collection',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis_Indica_(Gunjah)._Wellcome_L0005752.jpg',
    type: 'VISUAL',
    publicationDate: '1839',
    accessedAt: '2026-09-18',
    notes: 'CC BY 4.0 (licencia declarada por Wellcome Collection en Wikimedia Commons). Verificado por lectura directa de la página de archivo. Ilustra Cannabis indica, distinta de la lámina de Köhler (Cannabis sativa, 1887) que hasta esta ronda duplicaba la portada de "Historia".'
  },
  {
    id: 'visual-cannabis-sativa-plant-garden-sevela',
    scope: 'CANNABIS',
    title: 'Fotografía de Cannabis sativa creciendo en suelo de huerta',
    authorOrInstitution: 'Sevela.p (Pavel Ševela)',
    url: 'https://commons.wikimedia.org/wiki/File:Cannabis_sativa_plant_(16).jpg',
    type: 'VISUAL',
    publicationDate: '2011-08-16',
    accessedAt: '2026-09-18',
    notes: 'CC BY-SA 3.0. Verificado por lectura directa de la página de archivo (metadatos EXIF y extmetadata consultados vía API de Wikimedia). Reemplaza como portada de "Suelo y agua" una fotografía previa (raíces sobre arcilla expandida) documentada como visualmente poco atractiva.'
  },
  {
    id: 'visual-palacio-congreso-argentina-2019',
    scope: null,
    title: 'Palacio del Congreso de la Nación Argentina (2019)',
    authorOrInstitution: 'Felipe Restrepo Acosta',
    url: 'https://commons.wikimedia.org/wiki/File:2019_Buenos_Aires_-_Palacio_del_Congreso_de_la_Naci%C3%B3n_Argentina.jpg',
    type: 'VISUAL',
    publicationDate: '2019-03-27',
    accessedAt: '2026-09-18',
    notes: 'CC BY-SA 4.0. Verificado por lectura directa de la página de archivo. Reemplaza el gráfico interno genérico usado hasta esta ronda como portada de "Marco legal" por una fotografía institucional real del cuerpo legislativo argentino.'
  },

  // --- Fuentes visuales — ronda 2026-09-18 (portadas de los 3 bloques nuevos: Material de
  // lectura, Documentales, Noticias) ---
  {
    id: 'visual-open-book-benwhite',
    scope: null,
    title: 'Fotografía de un libro abierto',
    authorOrInstitution: 'Ben White (Unsplash)',
    url: 'https://commons.wikimedia.org/wiki/File:Open_book_(Unsplash).jpg',
    type: 'VISUAL',
    publicationDate: '2016-09-03',
    accessedAt: '2026-09-18',
    notes: 'CC0. Verificado por lectura directa de la página de archivo (metadatos extmetadata consultados vía API de Wikimedia).'
  },
  {
    id: 'visual-clapperboard-mrgandy',
    scope: null,
    title: 'Fotografía de una claqueta de cine tradicional',
    authorOrInstitution: 'MrGandy',
    url: 'https://commons.wikimedia.org/wiki/File:A_Traditional_Wooden_Slate_Clapperboard.jpg',
    type: 'VISUAL',
    publicationDate: null,
    accessedAt: '2026-09-18',
    notes: 'Dominio público (licencia declarada por el autor en Wikimedia Commons). Verificado por lectura directa de la página de archivo.'
  },
  {
    id: 'visual-newspaper-stack-blume',
    scope: null,
    title: 'Fotografía de una pila de diarios',
    authorOrInstitution: 'Daniel R. Blume',
    url: 'https://commons.wikimedia.org/wiki/File:A_stack_of_newspapers.jpg',
    type: 'VISUAL',
    publicationDate: null,
    accessedAt: '2026-09-18',
    notes: 'CC BY-SA 2.0. Verificado por lectura directa de la página de archivo.'
  },

  // --- Fuentes de contenido — ronda 2026-09-18 (bloques nuevos: Material de lectura,
  // Documentales, Noticias) ---
  {
    id: 'oficial-oms-2018-cannabis-critical-review',
    scope: 'CANNABIS',
    title: 'Cannabis and cannabis resin — Critical Review Report',
    authorOrInstitution: 'World Health Organization (WHO), Expert Committee on Drug Dependence (ECDD)',
    url: 'https://cdn.who.int/media/docs/default-source/controlled-substances/cannabis-and-cannabis-resin.pdf',
    type: 'OFFICIAL',
    publicationDate: '2018-08-01',
    accessedAt: '2026-09-18',
    notes: 'VERIFICADO por búsqueda directa (documento oficial alojado en el CDN institucional de la OMS, cdn.who.int). Primera revisión científica de la OMS sobre Cannabis desde 1935, preparada para el 41º Comité de Expertos en Farmacodependencia (ECDD). Se incluye como material de lectura recomendado, no como fuente de una afirmación puntual de ninguna entrada del atlas.'
  },
  {
    id: 'oficial-ariccame-preguntas-frecuentes',
    scope: null,
    title: 'Preguntas frecuentes sobre la regulación del cáñamo y cannabis en Argentina',
    authorOrInstitution: 'ARICCAME (Agencia Regulatoria de la Industria del Cáñamo y del Cannabis Medicinal) — Argentina.gob.ar',
    url: 'https://www.argentina.gob.ar/ariccame/preguntas-frecuentes-sobre-la-regulacion-del-canamo-y-cannabis-en-argentina',
    type: 'OFFICIAL',
    publicationDate: null,
    accessedAt: '2026-09-18',
    notes: 'VERIFICADO por búsqueda directa (página oficial de argentina.gob.ar). Recurso de lectura oficial y de referencia práctica sobre el marco regulatorio argentino, complementario del resumen ya citado en "Marco editorial y responsable".'
  },
  {
    id: 'documental-cannabis-medicinal-2023',
    scope: 'CANNABIS',
    title: 'Cannabis medicinal (documental, 2023)',
    authorOrInstitution: 'Silvia Kochen y Emiliano Serra (dirección) — producción de Duermevela, CONICET Documental, con apoyo del INCAA',
    url: 'https://www.conicet.gov.ar/estreno-del-documental-cannabis-medicinal/',
    type: 'OTHER',
    publicationDate: '2023-05-11',
    accessedAt: '2026-09-18',
    notes: 'VERIFICADO por lectura directa de la página oficial de CONICET. Estrenado el 11 de mayo de 2023 en el cine Gaumont (Buenos Aires), 61 minutos. Recorre cómo se tendieron puentes entre ciencia, medicina, pacientes, familias, ONGs y cultivadores en el proceso que llevó a la Ley 27.669; incluye testimonios de José Mujica y Raphael Mechoulam. Dirigido por Silvia Kochen, neurocientífica de CONICET y coordinadora de la Red de Cannabis Medicinal e Industrial (RACME).'
  },
  {
    id: 'documental-madre-planta-2022',
    scope: 'CANNABIS',
    title: 'Madre Planta (documental, 2022)',
    authorOrInstitution: 'Lisandro Costa, Alejandro Espolsino y Francisco López (dirección)',
    url: 'https://revistathc.com/2022/04/14/un-documental-argentino-sobre-el-cannabis-medicinal-llega-al-canal-encuentro/',
    type: 'OTHER',
    publicationDate: '2022-04-14',
    accessedAt: '2026-09-18',
    notes: 'VERIFICADO por lectura directa (Revista THC). Estrenado el 14 de abril de 2022 en el cine Gaumont, con emisión posterior por Canal Encuentro. Documenta, a lo largo de un rodaje de varios años en Argentina, Chile e Israel, las experiencias de familias (entre ellas la de María Eugenia Sar y su nieto Joaquín) que recurrieron al aceite de cannabis para tratar patologías de sus hijos o nietos, con entrevistas a Raphael Mechoulam.'
  },
  {
    id: 'documental-el-profe-2021',
    scope: 'CANNABIS',
    title: 'El Profe (documental, 2021)',
    authorOrInstitution: 'Julián Cáneva (dirección)',
    url: 'https://cinenacional.com/pelicula/el-profe',
    type: 'OTHER',
    publicationDate: '2021',
    accessedAt: '2026-09-18',
    notes: 'VERIFICADO por búsqueda directa (cinenacional.com y cobertura periodística convergente en Revista THC, 0221, El Día). Cortometraje documental (25 minutos) sobre Daniel Loza, cultivador solidario que difundió el autocultivo a través de su serie web "Quinto Elemento" y creó la cepa del mismo nombre; falleció en 2018 tras un allanamiento. Sus materiales de elaboración de aceite fueron donados al CONICET en 2020.'
  },
  {
    id: 'legal-decreto-27-2026-reprocann-sedronar',
    title: 'Decreto 27/2026 — Traspaso de la gestión del REPROCANN a la SEDRONAR',
    authorOrInstitution: 'Boletín Oficial de la República Argentina',
    url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/337707/20260126',
    type: 'LEGAL',
    publicationDate: '2026-01-26',
    accessedAt: '2026-09-18',
    notes: 'VERIFICADO por búsqueda directa (aviso real en boletinoficial.gob.ar, corroborado de forma convergente por múltiples coberturas periodísticas — Revista THC, El Planteo, Marimba). Reorganiza competencias dentro del Ministerio de Salud y traspasa el registro, control y evaluación del REPROCANN a la SEDRONAR (Secretaría de Políticas Integrales sobre Drogas), que hasta entonces dependía directamente del Ministerio de Salud. Las coberturas periodísticas consultadas coinciden en que el decreto no deroga la Ley 27.350 ni el REPROCANN, solo cambia el organismo de gestión — no se verificó el texto completo del decreto por lectura directa en esta sesión, solo el aviso de publicación y las coberturas convergentes.'
  },
  {
    id: 'oficial-ariccame-resolucion-41-2026-noticia',
    title: 'ARICCAME avanza en la regulación de órganos de propagación de cáñamo y cannabis medicinal',
    authorOrInstitution: 'Argentina.gob.ar (Presidencia de la Nación)',
    url: 'https://www.argentina.gob.ar/noticias/ariccame-avanza-en-la-regulacion-de-organos-de-propagacion-de-canamo-y-cannabis-medicinal',
    type: 'OFFICIAL',
    publicationDate: '2026-06-24',
    accessedAt: '2026-09-18',
    notes: 'VERIFICADO por lectura directa. Anuncio oficial de la Resolución ARICCAME 41/2026 (ver también `resolucion-ariccame-41-2026-organos-propagacion`, el aviso de Boletín Oficial): régimen especial de adecuación para licenciar semillas, plantines y esquejes de cannabis ya inscriptos en el Registro Nacional de Semillas, abierto hasta el 1º de marzo de 2027, con licencias de 5 años renovables anualmente que no habilitan producción ni venta de flores o derivados — solo material de propagación.'
  },
  {
    id: 'periodistica-bichosdecampo-2026-resolucion-69-canamo-horticola',
    title: 'La cadena del cáñamo completa otro tramo pendiente: el gobierno habilitó licencias para producir y comercializar flores, inflorescencias y biomasa no psicoactiva',
    authorOrInstitution: 'Bichos de Campo',
    url: 'https://bichosdecampo.com/la-cadena-del-canamo-completa-otro-tramo-pendiente-el-gobierno-habilito-licencias-para-producir-y-comercializar-flores-inflorescencias-y-biomasa-no-psicoactiva/',
    type: 'OTHER',
    publicationDate: '2026-09',
    accessedAt: '2026-09-18',
    notes: 'Nota periodística verificada por búsqueda directa (medio especializado en agro). Reporta la Resolución ARICCAME 69/2026, que crea un régimen de licencias (producción agrícola, elaboración de derivados, servicios vinculados y comercio exterior, todas de 5 años con validación anual) para cáñamo con fines hortícolas: plantas de Cannabis sativa L. no psicoactivas (hasta 1 % de THC), habilitando por primera vez la producción y comercialización de inflorescencias, biomasa y material vegetal de cáñamo con ese fin. Entra en vigencia 30 días hábiles después de su publicación en el Boletín Oficial. No se verificó el texto completo de la resolución en el Boletín Oficial por lectura directa en esta sesión, solo la cobertura periodística.'
  },

  // --- Fuente de contenido — ronda 2026-09-18 (entrada nueva "Almacenamiento", Manejo y
  // poscosecha) ---
  {
    id: 'cientifica-majumdar-2026-cannabinoid-storage-stability',
    scope: 'CANNABIS',
    title: 'Stability of Cannabinoids in Cannabis: Plant Material, Extracts, Oil Formulations, and Isolates (CBD and Δ9-THC) Under Different Storage Conditions',
    authorOrInstitution: 'Majumdar, C. G.; Radwan, M. M.; Chandra, S.; Wanas, A. S.; Elhendawy, M. A.; Ibrahim, E. A.; Geweda, M. M.; Lata, H.; ElSohly, M. A. — Cannabis & Cannabinoid Research',
    url: 'https://doi.org/10.1177/25785125261478275',
    type: 'SCIENTIFIC',
    publicationDate: '2026-08-11',
    accessedAt: '2026-09-18',
    notes: 'Título, autoría completa, revista, fecha y resumen verificados vía Crossref (DOI real, incluye abstract estructurado). El texto completo no se pudo leer directamente en esta sesión (acceso institucional/paywall de SAGE). Según el resumen: en material vegetal y productos derivados de Cannabis sativa, la temperatura ambiente acelera la degradación de THC a cannabinol (CBN), mientras que el almacenamiento a −20 °C preserva mejor el perfil de cannabinoides; los productos dominados por CBD muestran más estabilidad a temperatura ambiente que los dominados por THC. Se cita únicamente para ese hallazgo general de estabilidad, no para ninguna cifra cuantitativa interna del estudio que no figure en el resumen.'
  },

  {
    id: 'academica-jedrzejuk-2025-tigmomorfogenesis-review',
    scope: 'GENERAL',
    title: 'Plant Perception of Mechanical Stress: A Review of Thigmomorphogenesis',
    authorOrInstitution: 'Jędrzejuk, A.; Kuźma, N. — International Journal of Molecular Sciences (MDPI)',
    url: 'https://doi.org/10.3390/ijms262211120',
    type: 'ACADEMIC',
    publicationDate: '2025-11-14',
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO vía Crossref (título, autoría, revista y fecha confirmados por DOI). Revisión general de fisiología vegetal sobre tigmomorfogénesis (respuesta de la planta al estrés mecánico: viento, roce, flexión), no específica de Cannabis. Se cita solo como marco general del mecanismo biológico detrás de técnicas de estrés mecánico como el super cropping — no contiene ningún dato cuantitativo específico de Cannabis sativa.'
  },
  {
    id: 'cientifica-danziger-2021-shape-matters-defoliacion',
    scope: 'CANNABIS',
    title: 'Shape Matters: Plant Architecture Affects Chemical Uniformity in Cannabis sativa Inflorescences',
    authorOrInstitution: 'Danziger, N.; Bernstein, N. — Plants (MDPI)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8468686',
    type: 'SCIENTIFIC',
    publicationDate: '2021-09-02',
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa del texto completo vía PMC (el acceso directo a mdpi.com devolvió error 403 en esta sesión; se usó el espejo PMC, que es el mismo artículo). Estudio en Cannabis sativa real: la falta de penetración de luz hacia las inflorescencias inferiores se asocia con hasta ~40% menos cannabinoides que en las superiores; podas de arquitectura (remoción de brotes/ramas bajas, tipo BBLR, y defoliación de hojas grandes) mejoraron la uniformidad del perfil químico entre inflorescencias de la misma planta al mejorar la penetración de luz. Se cita únicamente para estos hallazgos descritos explícitamente en el texto, no para cifras de rendimiento total no reportadas en el artículo.'
  },
  {
    id: 'cientifica-sandoval-2024-defoliacion-estres-mecanico',
    scope: 'CANNABIS',
    title: 'Effects of Simulated Hail Damage (Defoliation) at Different Growth Stages on Cannabis sativa Yield and Quality',
    authorOrInstitution: 'Sandoval, N. et al. — Industrial Crops and Products',
    url: 'https://doi.org/10.1016/j.indcrop.2024.118226',
    type: 'SCIENTIFIC',
    publicationDate: '2024-05-01',
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa del texto completo (capítulo 4 de la tesis de maestría de Brandon Sandoval, Colorado State University, disponible en acceso abierto en mountainscholar.org — el mismo trabajo publicado como Sandoval et al. 2024 en Industrial Crops & Products, artículo 118226, según indica la propia tesis). Confirma: cultivar de cáñamo industrial \'Unicorn 1\', tres eventos de defoliación simulando daño por granizo (~50% del follaje removido con un mayal) en etapa vegetativa (DE1), floración temprana (DE2) y floración tardía (DE3). Hallazgo con dependencia de etapa: solo DE2 (floración temprana) produjo un aumento estadísticamente significativo (p<0.05) tanto en %CBD como en %THC totales por peso seco a cosecha (la métrica relevante para cumplimiento regulatorio); DE1 (vegetativa) mostró diferencias en concentración pero no en el % total; DE3 (floración tardía) no mostró diferencias significativas frente a control, consistente con Toth et al. (2021). No se citan estas cifras en el cuerpo de la entrada "Defoliación" del Atlas por decisión editorial (evitar un desglose estadístico ajeno al alcance de esa entrada), no por imposibilidad de verificación.'
  },
  {
    id: 'cientifica-mahmoud-2023-botrytis-cinerea-cannabis-podredumbre-flor',
    scope: 'CANNABIS',
    title: 'Understanding bud rot development, caused by Botrytis cinerea, on cannabis (Cannabis sativa L.) plants grown under greenhouse conditions',
    authorOrInstitution: 'Mahmoud, M.; BenRejeb, I.; Punja, Z. K.; Buirs, L.; Jabaji, S. — Botany',
    url: 'https://doi.org/10.1139/cjb-2022-0139',
    type: 'SCIENTIFIC',
    publicationDate: '2023-07-01',
    accessedAt: '2026-09-19',
    notes: 'Título, autoría completa, revista y fecha verificados vía Crossref (DOI real). El texto completo no se pudo verificar por lectura directa en esta sesión: el acceso directo devolvió error 403 tanto en la página de la revista (cdnsciencepub.com) como en un espejo abierto en Zenodo (tiempo de espera agotado). Las cifras citadas en esta investigación (humedad relativa superior a 70%, temperatura moderada de 17–24 °C como condiciones favorables para el hongo; mejora de la circulación de aire asociada a una reducción del 66–92% en la incidencia de la enfermedad) provienen de caracterizaciones del estudio indexadas por motores de búsqueda, consistentes entre sí en más de una búsqueda independiente, pero no confirmadas por lectura directa del artículo original — se citan con esa salvedad explícita.'
  },
  {
    id: 'institucional-iowa-state-extension-2026-higiene-herramientas-poda',
    title: 'How Do I Sanitize My Pruning Shears?',
    authorOrInstitution: 'Steil, A. (Consumer Horticulture Specialist) — Iowa State University Extension and Outreach',
    url: 'https://yardandgarden.extension.iastate.edu/faq/how-do-i-sanitize-my-pruning-shears',
    type: 'AGRICULTURAL',
    publicationDate: '2026-04-20',
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa. Guía institucional general de horticultura (no específica de Cannabis) sobre desinfección de herramientas de poda para prevenir la transmisión de enfermedades entre plantas: alcohol isopropílico o etílico al 70% (recomendado para uso general, sin necesidad de remojo prolongado) o solución de lavandina al 10% (9 partes de agua por 1 de lavandina, remojo mínimo de 10 minutos, con enjuague posterior para evitar corrosión) para casos de patógenos más resistentes. Se aplica por analogía a herramientas de poda de Cannabis, igual que otras fuentes generales de horticultura ya usadas en el Atlas.'
  },
  {
    id: 'oficial-fao-soils-portal-propiedades-fisicas',
    scope: 'GENERAL',
    title: 'Physical properties — FAO Soils Portal',
    authorOrInstitution: 'FAO — Soils Portal, Soil Survey / Soil Properties',
    url: 'https://www.fao.org/soils-portal/soil-survey/soil-properties/physical-properties/en/',
    type: 'OFFICIAL',
    publicationDate: null,
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa. Define textura (proporción de arena/limo/arcilla), estructura (agregación en "peds" que afecta aireación, movimiento de agua, conducción de calor y crecimiento radicular) y porosidad ("el espacio poroso no ocupado por materia mineral u orgánica, ocupado por aire o agua"). Cita textualmente: "Idealmente, el espacio poroso total debería ser un 50% del volumen del suelo" — presentado por la propia FAO como un ideal de referencia general de agronomía, no una cifra específica de Cannabis ni un mínimo obligatorio para que un sustrato funcione.'
  },
  {
    id: 'oficial-fao-brouwer-heibloem-1985-capacidad-campo-agua-disponible',
    scope: 'GENERAL',
    title: 'Irrigation Water Management: Training Manual No. 1 — Introduction to Irrigation (Cap. 2: Soil and water)',
    authorOrInstitution: 'Brouwer, C. (ILRI); Goffeau, A.; Heibloem, M. (FAO Land and Water Development Division)',
    url: 'https://www.fao.org/4/r4082e/r4082e03.htm',
    type: 'OFFICIAL',
    publicationDate: '1985',
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa. Define capacidad de campo (agua retenida tras el drenaje del exceso; "ideal para el crecimiento del cultivo"), punto de marchitez permanente (agua remanente que la raíz ya no puede extraer) y agua disponible (= capacidad de campo − punto de marchitez). Da valores de agua disponible por textura —arena 25–100 mm/m, franco 100–175 mm/m, arcilla 175–250 mm/m— aclarando textualmente que "son constantes para un suelo dado, pero varían ampliamente de un tipo de suelo a otro": es la propia fuente la que descarta una cifra universal. Fisiología/física de suelo general, no específica de Cannabis.'
  },
  {
    id: 'oficial-fao-a0100e-materia-organica-suelo',
    scope: 'GENERAL',
    title: 'The Importance of Soil Organic Matter — Key to Drought-Resistant Soil and Sustained Food and Production',
    authorOrInstitution: 'FAO — Soils Bulletin 80',
    url: 'https://www.fao.org/4/a0100e/a0100e02.htm',
    type: 'OFFICIAL',
    publicationDate: null,
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa (páginas a0100e02.htm y a0100e07.htm). Cita textual: "La mayoría de los suelos contienen 2-10 por ciento de materia orgánica" —presentado como referencia general de "la mayoría de los suelos", no como cifra universal ni específica de sustratos de cultivo en maceta—. Describe funciones generales (retención de agua, agregación de partículas, hábitat para organismos del suelo, ciclado de nutrientes) y prácticas que reducen la materia orgánica (laboreo, quema de rastrojos, monocultivo). Agronomía general, no evidencia de Cannabis.'
  },
  {
    id: 'institucional-eorganic-componentes-sustrato-organico',
    scope: 'GENERAL',
    title: 'Aspectos básicos del sustrato orgánico para macetas',
    authorOrInstitution: 'eOrganic (red de extensión universitaria, eXtension Foundation)',
    url: 'https://eorganic.org/node/35264',
    type: 'AGRICULTURAL',
    publicationDate: null,
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa. Describe propiedades generales de turba (pH 3.5–4.0, retiene mucha agua y aire), fibra de coco (pH 5.5–6.8, más EC/sales disueltas que la turba, más durable), perlita y vermiculita (aireación, sin aporte nutricional relevante salvo algo de K/Mg/Ca en vermiculita) y compost (retiene agua y aporta nutrientes, pH 6.5–8). Da proporciones de mezcla habituales (ej. perlita/vermiculita 30-50%) pero el propio texto aclara explícitamente que son "guía general, no reglas fijas" y que cada productor suele ajustar su propia receta — no se citan como estándar para Cannabis.'
  },
  {
    id: 'cientifica-barbaro-2015-ceniza-volcanica-perlita-sustrato',
    scope: 'GENERAL',
    title: 'Ceniza volcánica como alternativa a la perlita en la formulación de sustratos para plantines florales',
    authorOrInstitution: 'Barbaro, L. A.; Illa Healy, V.; Karlanián, M. A.; Mazzoni, A. — INTA / Universidad de Morón, revista Ciencia del Suelo, vol. 33, n.º 2',
    url: 'https://www.scielo.org.ar/scielo.php?script=sci_arttext&pid=S1850-20672015000200005',
    type: 'SCIENTIFIC',
    publicationDate: '2015-12',
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa (SciELO Argentina, acceso abierto). Estudio con pensamiento (pansy) e impatiens (no Cannabis): compara ceniza volcánica (erupción Puyehue 2011) contra perlita expandida, mezcladas con turba de Sphagnum al 20% o 50%, midiendo pH, CE, densidad aparente, porosidad de aireación, capacidad de retención de agua y desarrollo de plantines. CE baja en ambos materiales (0.01 y 0.02 dS/m) y alta porosidad de aireación (63% y 55% respectivamente); las mezclas al 20% dieron mejor desarrollo que al 50%. Se cita como condición de ese estudio puntual —mismo grupo de investigación que ya cita la entrada "Sustrato, agua y drenaje"—, no como cifra aplicable a Cannabis ni a cualquier mezcla de sustrato.'
  },
  {
    id: 'cientifica-seemakram-2022-micorrizas-cannabis-cbd-thc',
    scope: 'CANNABIS',
    title: 'Enhancement of Growth and Cannabinoids Content of Hemp (Cannabis sativa) Using Arbuscular Mycorrhizal Fungi',
    authorOrInstitution: 'Seemakram, W.; Paluka, J.; Suebrasri, T.; Lapjit, C.; Kanokmedhakul, S.; Kuyper, T. W.; Ekprasert, J.; Boonlue, S. — Frontiers in Plant Science',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9360772/',
    type: 'SCIENTIFIC',
    publicationDate: '2022-07-26',
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa (PMC, acceso abierto; DOI 10.3389/fpls.2022.845794, confirmado vía Crossref). Ensayo en maceta bajo invernadero (no a campo), 60 días, un solo cultivar de cáñamo (KKU05) en Tailandia, 6 repeticiones. Inoculación con Rhizophagus aggregatus BM-3 g3 dio mejores resultados que R. prolifer PC2-2, control sin fertilizar y control con NPK sintético: altura de planta 80 cm vs. 43 cm (control sin fertilizar), peso seco de inflorescencia 11.8 g vs. 5.83 g, CBD 32.28 mg/g vs. 24.56 mg/g, THC 1.65 mg/g vs. 1.20 mg/g, colonización radicular 21%. Es evidencia directa de Cannabis sativa, pero de un único estudio, un único cultivar, condiciones de maceta y una sola localidad — el propio estudio señala la necesidad de validación a campo y en otros cultivares antes de generalizar.'
  },
  {
    id: 'institucional-pennstate-2025-calidad-agua-riego',
    scope: 'GENERAL',
    title: 'A Water Quality Toolkit for Greenhouse and Nursery Production',
    authorOrInstitution: 'Boser, S.; Rizzo, D. (Water Resources Extension Educators) — Penn State Extension',
    url: 'https://extension.psu.edu/a-water-quality-toolkit-for-greenhouse-and-nursery-production',
    type: 'AGRICULTURAL',
    publicationDate: '2025-10-13',
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa. Guía institucional general de horticultura de invernadero/vivero (no específica de Cannabis): pH del agua de riego recomendado entre 5.4 y 7.0 "según el cultivo" (explícitamente dependiente del cultivo, no un número fijo); alcalinidad recomendada hasta 100 mg/L; dureza hasta 150 mg/L de CaCO3; conductividad eléctrica del agua de riego mayor a 1.0 mmhos/cm como umbral de advertencia de riesgo de salinidad. Se cita como referencia general de horticultura, no como estándar validado para Cannabis.'
  },
  {
    id: 'institucional-ask-extension-2018-cloramina-agua-riego',
    scope: 'GENERAL',
    title: 'Chloramine in Tap Water and Its Effects on Houseplants and Gardens',
    authorOrInstitution: 'Ask Extension (Sistema de Extensión Cooperativa de EE. UU., citando EPA y University of Nebraska Extension)',
    url: 'https://ask.extension.org/kb/faq.php?id=460986',
    type: 'AGRICULTURAL',
    publicationDate: '2018-06-19',
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa. Respuesta institucional que cita a la EPA y a University of Nebraska Extension: "los niveles bajos de cloramina en el agua potable no son tóxicos para las plantas" y que el agua clorada/cloraminada es "segura para árboles, césped, hortalizas, etc." a las concentraciones municipales habituales — contradice la idea difundida de que el agua de red siempre necesita reposo o dechloración antes de regar. Señala una excepción puntual: un estudio encontró oscurecimiento de raíz en lechuga cultivada en hidroponía con cloramina. No es evidencia específica de Cannabis, y no aborda si dejar reposar el agua elimina la cloramina (a diferencia del cloro libre, que sí se evapora con el tiempo).'
  },
  {
    id: 'cientifica-fortnum-2000-temperatura-agua-pythium',
    scope: 'GENERAL',
    title: 'Nutrient Solution Temperature Affects Pythium Root Rot of Tobacco in Greenhouse Float Systems',
    authorOrInstitution: 'Fortnum, B. A.; Rideout, J.; Martin, S. B.; Gooden, D. — Plant Disease',
    url: 'https://doi.org/10.1094/PDIS.2000.84.3.289',
    type: 'SCIENTIFIC',
    publicationDate: '2000-03',
    accessedAt: '2026-09-19',
    notes: 'Título, autoría, revista y fecha verificados vía Crossref (DOI real) y por el resumen público del artículo (acceso al texto completo bloqueado por la revista, error 403). Según el resumen: en tabaco cultivado en sistemas de flotación de invernadero, con temperatura del agua constante a 15, 20, 25 o 30 °C, la enfermedad por Pythium myriotylum se correlacionó con la temperatura del agua, con el nivel MÁS BAJO de necrosis radicular a 15 °C (la temperatura más fría probada) — el patrón opuesto al que asume la idea difundida de que el agua fría "shockea" la raíz y favorece enfermedad. Es tabaco (Solanaceae), no Cannabis, y un solo patógeno/especie de Pythium entre varias con comportamientos distintos — se cita para mostrar que la relación temperatura del agua/enfermedad radicular no es universal ni unidireccional, no para fijar una temperatura de riego recomendada.'
  },
  {
    id: 'oficial-fao-ayers-westcot-1985-calidad-agua-riego-ec',
    scope: 'GENERAL',
    title: 'Water Quality for Agriculture — FAO Irrigation and Drainage Paper 29 (Rev. 1), Tabla 1',
    authorOrInstitution: 'Ayers, R. S.; Westcot, D. W. — FAO',
    url: 'https://www.fao.org/4/t0234e/t0234e01.htm',
    type: 'OFFICIAL',
    publicationDate: '1985',
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa. Tabla 1 ("Guidelines for interpretation of water quality for irrigation") clasifica el agua de riego por conductividad eléctrica (ECw): sin restricción de uso <0.7 dS/m, restricción leve a moderada 0.7–3.0 dS/m, restricción severa >3.0 dS/m (equivalentes en sólidos disueltos totales: <450, 450–2000 y >2000 mg/L). El propio documento aclara: "estas guías pueden indicar problemas potenciales... pero la aptitud real de un agua depende de las condiciones específicas de uso y de la capacidad de manejo del usuario" — explícitamente no un estándar rígido, y varía según tolerancia de cada cultivo (tablas aparte). Es la escala de calidad de la fuente de agua, distinta de la CE de una solución nutritiva ya fertilizada en la zona radicular.'
  },
  {
    id: 'cientifica-yep-2020-nacl-ec-cannabis-hidroponia',
    scope: 'CANNABIS',
    title: 'Aquaponic and Hydroponic Solutions Modulate NaCl-Induced Stress in Drug-Type Cannabis sativa L.',
    authorOrInstitution: 'Yep, B.; Gale, N. V.; Zheng, Y. — Frontiers in Plant Science',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7424260/',
    type: 'SCIENTIFIC',
    publicationDate: '2020-08-05',
    accessedAt: '2026-09-19',
    notes: 'VERIFICADO por lectura directa (PMC, acceso abierto; DOI 10.3389/fpls.2020.01169, confirmado vía Crossref). Cannabis sativa (tipo droga) en hidroponía y acuaponía con NaCl agregado (1 a 40 mM). En hidroponía, fitotoxicidad clara a 40 mM (hasta 150% menos biomasa de inflorescencia seca que en 1 mM); el contenido de cannabinoides empezó a bajar con concentraciones de NaCl bajas ("por encima de 5 mM"), a una tasa de -0.037% THCA por mM de NaCl. En acuaponía, con EC basal similar (~1.8-1.94 mS/cm), la tolerancia fue mayor: solo se redujo la concentración de cannabinoides, sin el mismo daño de crecimiento. Es evidencia directa de Cannabis sativa sobre sal agregada (NaCl), no una equivalencia directa con "conductividad eléctrica alta por fertilización" en general — el propio estudio distingue el origen del aumento de CE (nutrientes vs. NaCl) como una variable relevante en sí misma.'
  },
];

export function sourceById(id) {
  return sources.find((source) => source.id === id) ?? null;
}
