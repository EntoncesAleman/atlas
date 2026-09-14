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

  // --- Fuentes de contenido: Loop 2 — Sustrato, agua y drenaje (Fase 49, 2026-09-11) ---
  {
    id: 'oficial-inta-sustrato-maceta-rubio-karlanian',
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
    title: 'Is Twelve Hours Really the Optimum Photoperiod for Promoting Flowering in Indoor-Grown Cultivars of Cannabis sativa?',
    authorOrInstitution: 'Ahrens, A.; Llewellyn, D.; Zheng, Y. — Plants (Basel), MDPI, vol. 12, n.º 14, art. 2605',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10386198/',
    type: 'SCIENTIFIC',
    publicationDate: '2023-07-10',
    accessedAt: '2026-09-14',
    notes: 'VERIFICADO por lectura directa (PMC, artículo de libre acceso; DOI 10.3390/plants12142605). Estudio con 10 cultivares drug-type de Cannabis sativa bajo 6 fotoperiodos de floración (12 h a 15 h). Resultados clave: (1) el protocolo 18 h en vegetativo y 12 h en floración es el estándar industrial ampliamente adoptado, pero NO es el único que induce floración — muchos cultivares florecen robustamente hasta 14 h, con demoras de 0 a 4 días según cultivar; (2) algunos cultivares iniciaron floración incluso a 15 h aunque sin desarrollo posterior de inflorescencia; (3) la respuesta al fotoperiodo es cultivar-específica y no predecible de forma universal. Temperatura de ensayo: 25 °C constante. HR mantenida ≥ 60 % con sistema de nebulización. Se usa para respaldar: (a) el protocolo 18/6 y 12/12 como referencias ampliamente utilizadas, no como reglas universales; (b) que la variación entre cultivares es real y documentada; (c) los rangos de temperatura de referencia (25 °C para el ensayo) sin presentarlos como únicos valores válidos. No cita condiciones de cultivo argentino ni cultivares argentinos.'
  },
];

export function sourceById(id) {
  return sources.find((source) => source.id === id) ?? null;
}
