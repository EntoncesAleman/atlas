// Fuente de verdad editorial estructurada (Fase 7A).
//
// Reemplaza el catálogo plano anterior de `atlasData.js` como único lugar donde se autoría
// contenido de categorías y entradas. `atlasData.js` ahora DERIVA su forma antigua desde acá
// (vía ./registry.js) para que la UI existente siga funcionando sin cambios.
//
// Reglas de esta migración (documentadas también en MASTER_PACKAGE/28_EDITORIAL_CONTENT_MODEL.md):
// - No se escribió contenido nuevo: `intro` conserva el texto exacto que antes vivía en `content`.
// - Los campos que hoy no tienen dato real (sections, observations, signals, commonMistakes,
//   environmentContext, lastReviewed, metadata.canonical, metadata.ogImage) quedan en `null` o
//   arreglo vacío — nunca inventados ni rellenados automáticamente.
// - `editorialStatus` se fija en 'PUBLISHED' para las 7 entradas porque ya estaban publicadas
//   antes de esta fase (campo `state`/`type` legado) — no se las degrada a REVIEW solo porque
//   ahora existe el campo. Ver justificación completa en el documento 28.
// - `relatedEntryIds` reemplaza el `related` legado (que apuntaba a slugs de CATEGORÍA). La
//   migración fue determinable sin ambigüedad porque, a la fecha de esta fase, cada categoría
//   tiene exactamente una entrada publicada — si en el futuro una categoría tiene más de una
//   entrada, una relación nueva no hereda este mapeo 1:1 automáticamente.

export const editorialCategories = [
  {
    id: 'fundamentos',
    order: 4,
    slug: 'fundamentos',
    title: 'Crecimiento',
    tag: 'Crecimiento',
    type: 'CRECIMIENTO',
    regionLabel: 'Nacional',
    cta: 'Explorar',
    description: 'Ciclo de vida y práctica de cultivo.',
    shortDescription: 'Nociones generales para entender la lectura del cultivo.',
    editorialDescription: 'Una primera observación del cultivo parte de reconocer que cada decisión se sostiene en una secuencia de observación, preparación y cuidado.',
    tags: ['fundamentos'],
    metadata: {
      seoTitle: 'Crecimiento — Atlas del Cultivo Argentino',
      seoDescription: 'Ciclo de vida y práctica de cultivo.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'suelo-y-agua',
    order: 2,
    slug: 'suelo-y-agua',
    title: 'Suelo y agua',
    tag: 'Suelo y agua',
    type: 'MANEJO',
    regionLabel: 'Sistema',
    cta: 'Explorar',
    description: 'Sustrato, agua y drenaje.',
    shortDescription: 'Suelo, agua y estructura del entorno de cultivo.',
    editorialDescription: 'El atlas observa el recurso hídrico y el soporte físico como una relación editorial y territorial.',
    tags: ['suelo', 'agua'],
    metadata: {
      seoTitle: 'Suelo y agua — Atlas del Cultivo Argentino',
      seoDescription: 'Sustrato, agua y drenaje.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'luz-y-clima',
    order: 3,
    slug: 'luz-y-clima',
    title: 'Luz y clima',
    tag: 'Luz y clima',
    type: 'AMBIENTE',
    regionLabel: 'Ambiente',
    cta: 'Explorar',
    description: 'Fotoperiodo y contexto ambiental.',
    shortDescription: 'Luz, fotoperiodo y contexto general del ambiente.',
    editorialDescription: 'La luz y el clima aparecen como condiciones de lectura del entorno, no como una base meteorológica aplicada al cultivo.',
    tags: ['luz', 'ambiente'],
    metadata: {
      seoTitle: 'Luz y clima — Atlas del Cultivo Argentino',
      seoDescription: 'Fotoperiodo y contexto ambiental.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'sanidad',
    order: 10,
    slug: 'sanidad',
    title: 'Sanidad',
    tag: 'Sanidad',
    type: 'SANIDAD',
    regionLabel: 'Sanidad',
    cta: 'Explorar',
    description: 'Riesgos, condiciones y señales.',
    shortDescription: 'Sanidad vegetal: observación, prevención y señales.',
    editorialDescription: 'La sanidad del cultivo se presenta como una lectura de síntomas, entorno y riesgo.',
    tags: ['sanidad', 'riesgo'],
    metadata: {
      seoTitle: 'Sanidad — Atlas del Cultivo Argentino',
      seoDescription: 'Riesgos, condiciones y señales.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'cultivo',
    order: 6,
    slug: 'cultivo',
    title: 'Cultivo',
    tag: 'Cultivo',
    type: 'CICLO',
    regionLabel: 'Cultivo',
    cta: 'Explorar',
    description: 'Interior, exterior y práctica.',
    shortDescription: 'El cultivo en su flujo de crecimiento y desarrollo.',
    editorialDescription: 'El cultivo se describe como una experiencia de observación, manejo y adaptación a cada contexto geográfico y ecológico.',
    tags: ['cultivo', 'ciclo'],
    metadata: {
      seoTitle: 'Cultivo — Atlas del Cultivo Argentino',
      seoDescription: 'Interior, exterior y práctica.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'cosecha',
    order: 8,
    slug: 'cosecha',
    title: 'Cosecha',
    tag: 'Cosecha',
    type: 'CICLO',
    regionLabel: 'Producción',
    cta: 'Explorar',
    description: 'Maduración y almacenamiento.',
    shortDescription: 'Maduración, cuidado y cierre del ciclo.',
    editorialDescription: 'La cosecha se entiende como una etapa de lectura del cultivo y de cuidado de la producción.',
    tags: ['cosecha', 'maduración'],
    metadata: {
      seoTitle: 'Cosecha — Atlas del Cultivo Argentino',
      seoDescription: 'Maduración y almacenamiento.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'marco-legal',
    order: 13,
    slug: 'marco-legal',
    title: 'Marco legal',
    tag: 'Contexto',
    type: 'CONTEXTO',
    regionLabel: 'Contexto',
    cta: 'Explorar',
    description: 'Contexto y marco editorial.',
    shortDescription: 'Marco legal, institucional y contextual.',
    editorialDescription: 'El atlas reserva una mirada editorial y responsable para el contexto normativo y el marco de la práctica.',
    tags: ['marco', 'legal', 'contexto'],
    metadata: {
      seoTitle: 'Marco legal — Atlas del Cultivo Argentino',
      seoDescription: 'Contexto y marco editorial.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'historia',
    order: 12,
    slug: 'historia',
    title: 'Historia',
    tag: 'Historia',
    type: 'HISTORIA',
    regionLabel: 'Origen',
    cta: 'Explorar',
    description: 'Origen, domesticación y llegada de la planta a Argentina.',
    shortDescription: 'De dónde viene la planta y cómo llegó hasta acá.',
    editorialDescription: 'El atlas mira hacia atrás: de dónde viene Cannabis sativa, cómo se domesticó, cómo llegó a América y qué evidencia real existe de su historia en el territorio que hoy es Argentina.',
    tags: ['historia'],
    metadata: {
      seoTitle: 'Historia — Atlas del Cultivo Argentino',
      seoDescription: 'Origen, domesticación y llegada de la planta a Argentina.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },

  // --- Categorías separadas de "Crecimiento" e "Historia" (corrección de estructura) ---
  {
    id: 'germinacion',
    order: 1,
    slug: 'germinacion',
    title: 'Germinación',
    tag: 'Germinación',
    type: 'CRECIMIENTO',
    regionLabel: 'Inicio',
    cta: 'Explorar',
    description: 'La semilla y su primera transición biológica.',
    shortDescription: 'Qué ocurre dentro de la semilla antes de que exista una planta para observar.',
    editorialDescription: 'El atlas separa la germinación del resto del ciclo de crecimiento: es un punto de partida biológico propio, con su propia fisiología y sus propias señales, antes de que empiece la etapa vegetativa.',
    tags: ['germinación'],
    metadata: {
      seoTitle: 'Germinación — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es la germinación, qué ocurre biológicamente y qué formas distintas existen de ofrecerle a la semilla agua, oxígeno y temperatura.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'poda',
    order: 7,
    slug: 'poda',
    title: 'Poda',
    tag: 'Poda',
    type: 'MANEJO',
    regionLabel: 'Manejo',
    cta: 'Explorar',
    description: 'Dominancia apical y manejo de la forma de la planta.',
    shortDescription: 'Qué mecanismo fisiológico interrumpe la poda y qué evidencia existe sobre sus efectos.',
    editorialDescription: 'El atlas trata la poda como una intervención sobre un mecanismo fisiológico concreto —la dominancia apical—, no como un instructivo genérico de tareas.',
    tags: ['poda'],
    metadata: {
      seoTitle: 'Poda — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es la dominancia apical, qué hace la poda sobre ese mecanismo, y qué muestra la evidencia científica directa de Cannabis sativa.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'fertilizacion',
    order: 5,
    slug: 'fertilizacion',
    title: 'Fertilización',
    tag: 'Fertilización',
    type: 'MANEJO',
    regionLabel: 'Nutrición',
    cta: 'Explorar',
    description: 'Nutrientes esenciales y su disponibilidad para la planta.',
    shortDescription: 'Movilidad de nutrientes, disponibilidad en el sustrato y lectura de síntomas.',
    editorialDescription: 'El atlas mira la fertilización desde la disponibilidad real de nutrientes para la planta, no desde una tabla de dosis universal.',
    tags: ['fertilización', 'nutrición'],
    metadata: {
      seoTitle: 'Fertilización — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es un nutriente esencial, cómo se distingue una carencia de una toxicidad, y qué determina su disponibilidad real para la planta.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'manejo-poscosecha',
    order: 9,
    slug: 'manejo-poscosecha',
    title: 'Manejo y poscosecha',
    tag: 'Poscosecha',
    type: 'MANEJO',
    regionLabel: 'Manejo',
    cta: 'Explorar',
    description: 'Secado y curado del material ya cosechado.',
    shortDescription: 'El manejo del material cosechado, separado de la fisiología de la planta viva.',
    editorialDescription: 'El atlas separa el manejo poscosecha —secado, curado— de la fisiología de la planta viva: son procesos distintos, con objetivos y variables propias.',
    tags: ['cosecha', 'maduración'],
    metadata: {
      seoTitle: 'Manejo y poscosecha — Atlas del Cultivo Argentino',
      seoDescription: 'Secado y curado del material cosechado: qué objetivo tiene cada proceso y qué no hace el manejo poscosecha.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'genetica-tipos',
    order: 11,
    slug: 'genetica-tipos',
    title: 'Genética y tipos',
    tag: 'Genética',
    type: 'CLASIFICACIÓN',
    regionLabel: 'Genética',
    cta: 'Explorar',
    description: 'Clasificación, fotoperiodo y autofloración.',
    shortDescription: 'Cómo se clasifican los tipos de Cannabis sativa y qué distinciones son realmente útiles.',
    editorialDescription: 'El atlas separa la genética y los tipos de la mirada histórica: es una clasificación viva, en discusión académica, no un capítulo cerrado del pasado.',
    tags: ['genética', 'taxonomía'],
    metadata: {
      seoTitle: 'Genética y tipos — Atlas del Cultivo Argentino',
      seoDescription: 'La clasificación de Cannabis sativa, por qué está discutida, y qué distinciones (fotoperiodo, autofloración) son realmente útiles hoy.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  }
];

export const editorialEntries = [
  {
    id: 'germinacion',
    slug: 'germinacion',
    categoryId: 'germinacion',
    title: 'Germinación y primera lectura del material',
    summary: 'La semilla se vuelve legible cuando el entorno ofrece agua, oxígeno y una temperatura estable — la luz recién empieza a importar cuando la plántula emerge.',
    intro: 'La germinación es el primer punto de atención del atlas: una transición biológica, no una técnica. Antes de que exista una planta para observar, hay una semilla que absorbe agua, activa su metabolismo y rompe su cubierta desde adentro. Entender qué está pasando en ese proceso — y qué de lo que se ve realmente significa algo — es la base de cualquier lectura posterior del cultivo.',
    sections: [
      {
        id: 'que-es-la-germinacion',
        title: '¿Qué es la germinación?',
        paragraphs: [
          'La germinación es la reanudación del crecimiento del embrión que queda en estado latente dentro de la semilla madura. No es el "comienzo de la vida" de la planta —el embrión ya existe formado dentro de la semilla— sino el momento en que ese embrión retoma su desarrollo hasta romper la cubierta seminal (testa) y emerger como una plántula autónoma.',
          'El criterio que suele usarse para considerar que una semilla "germinó" es la emergencia visible de la radícula (la primera raíz embrionaria) a través de la testa. Todo lo anterior a ese punto —por más que ya esté ocurriendo activamente— es preparación interna, no germinación consumada.'
        ]
      },
      {
        id: 'historia',
        title: 'Historia',
        paragraphs: [
          'Los estudios genómicos más recientes ubican el comienzo de la domesticación de Cannabis sativa hace unos 12.000 años, en el este de Asia: una comparación de 110 genomas de variedades de todo el mundo encontró que los cultivares actuales de fibra y de uso psicoactivo derivan de un mismo fondo genético ancestral, representado hoy por poblaciones silvestres y variedades locales de China. Es una fecha estimada por métodos genéticos —no una medición directa sobre un resto físico— y el origen geográfico exacto sigue en discusión académica. La evidencia física más concreta es más tardía: fitolitos (microestructuras vegetales que se conservan mejor que una semilla) hallados en Shandong, norte de China, ubican a la planta dentro del conjunto de cultivos manejados entre hace 4.500 y 3.400 años, y en el sitio de la Edad del Bronce de Haimenkou (Yunnan, suroeste de China) se recuperaron más de 800 semillas fechadas entre 1650 y 400 a.C. — el registro arqueobotánico más directo que existe hoy de que la planta ya se manejaba y probablemente se propagaba de forma activa por semilla, mucho antes de que existiera ningún conocimiento escrito sobre cómo hacerla germinar.'
        ]
      },
      {
        id: 'antes-de-empezar-estado-semilla',
        title: 'El estado de la semilla, antes de que empiece todo',
        paragraphs: [
          'Antes de que cualquier condición ambiental importe, la semilla necesita ser viable: tener un embrión vivo, capaz de retomar su desarrollo. El organismo argentino que regula la calidad de semillas (INASE) distingue dos ensayos de laboratorio relacionados pero distintos: el ensayo de germinación evalúa si la semilla puede dar una plántula normal bajo condiciones controladas y estandarizadas, mientras que el ensayo de vigor evalúa cómo se comporta esa misma semilla frente a condiciones menos favorables que las del ensayo estándar. Esa distinción explica, en parte, por qué dos semillas de aspecto idéntico pueden comportarse distinto fuera de un laboratorio: la viabilidad y el vigor no son lo mismo.'
        ]
      },
      {
        id: 'que-esta-ocurriendo',
        title: 'Cómo ocurre la germinación',
        paragraphs: [
          'El proceso puede describirse en tres momentos. Primero, la imbibición: la semilla absorbe agua del entorno, se hidrata y se ablanda; este ingreso de agua es lo que reactiva la maquinaria metabólica que estaba detenida. Segundo, la activación: el agua permite que se activen enzimas que empiezan a movilizar las reservas almacenadas en la semilla (almidones, proteínas, lípidos) y a convertirlas en energía y materiales disponibles para el crecimiento del embrión. Tercero, la emergencia: el embrión se alarga, la presión interna aumenta, y la radícula perfora la testa y sale hacia afuera. Este patrón de tres fases —descripto originalmente para semillas en general, no de forma específica para Cannabis— es uno de los modelos más citados de la fisiología de la germinación.',
          'Cannabis sativa germina de forma epigea: a diferencia de una germinación hipogea (donde las hojas cotiledonares quedan bajo tierra), acá el hipocótilo se alarga y empuja hacia arriba, levantando los dos cotiledones (las hojas seminales) por encima de la superficie del sustrato. Ese arco que se endereza a medida que sale del sustrato es parte normal del proceso, no una anomalía.'
        ]
      },
      {
        id: 'que-como-por-que',
        title: 'Qué ocurre, qué se ve y por qué',
        paragraphs: [
          'Separado en tres preguntas distintas, para no mezclar el proceso con la observación ni con su causa:'
        ],
        list: [
          'Qué ocurre: la semilla absorbe agua (imbibición), reactiva su metabolismo interno y, cuando la actividad enzimática avanza lo suficiente, la radícula rompe la testa y emerge — un proceso biológico continuo, no una serie de pasos que ejecute quien cultiva.',
          'Qué se ve desde afuera: hinchamiento de la semilla, apertura de la testa, una raíz pálida (radícula) creciendo hacia abajo, el hipocótilo arqueado enderezándose a medida que emerge, y los cotiledones abriéndose y tomando color verde.',
          'Por qué ocurre así: el agua reactiva enzimas que movilizan las reservas almacenadas en la semilla; el oxígeno sostiene la respiración que esas reacciones necesitan; la temperatura regula la velocidad general del proceso — ninguno de los tres tiene un valor único válido para cualquier semilla, momento o lugar.'
        ]
      },
      {
        id: 'primeras-senales',
        title: 'Primeras señales',
        paragraphs: [
          'Lo primero que suele hacerse visible es un leve hinchamiento de la semilla y, después, una apertura de la testa por donde asoma la radícula: una raíz pálida, fina, que crece hacia abajo y se ancla al sustrato. Poco después aparece el hipocótilo, arqueado, empujando hacia la superficie. Al emerger, ese arco se endereza y arrastra consigo los dos cotiledones, que se abren y —con exposición a la luz— empiezan a tomar color verde.',
          'Ninguna de estas señales, por sí sola, permite anticipar cómo va a seguir el desarrollo posterior de la planta: son indicadores de que el proceso está en curso, no un pronóstico.'
        ]
      },
      {
        id: 'condiciones-ambientales',
        title: 'Condiciones ambientales',
        paragraphs: [
          'El agua es la condición que dispara todo el proceso: sin imbibición no hay activación metabólica posible. Pero el exceso de agua también puede frenarlo, porque desplaza el aire del sustrato y limita el oxígeno disponible para la respiración del embrión —la germinación es un proceso aeróbico, y un sustrato anegado o muy compactado puede directamente detenerla.',
          'La temperatura influye sobre la velocidad a la que ocurren las reacciones enzimáticas: existe un rango dentro del cual el proceso avanza con normalidad, y se vuelve más lento o se detiene fuera de ese rango. No hay un número único válido para todas las condiciones ni todo el año, y esta entrada no fija uno: la lectura de "cuánto tarda" depende del contexto ambiental en cada caso (ver más abajo).',
          'La estructura del sustrato también importa, porque es lo que permite que el agua y el aire convivan: un sustrato que retiene humedad pero también drena y deja espacio poroso favorece el proceso; uno que se compacta o se seca por completo lo dificulta desde ángulos opuestos.'
        ]
      },
      {
        id: 'lectura-de-la-plantula',
        title: 'Lectura de la plántula',
        paragraphs: [
          'Una vez que los cotiledones se abren y verdean, la plántula empieza a generar su propia energía por fotosíntesis en lugar de depender solo de las reservas de la semilla. La aparición de las primeras hojas verdaderas —distintas en forma a los cotiledones, ya con los bordes serrados característicos de la especie— suele tomarse como la señal de que la etapa de germinación, en sentido estricto, quedó atrás y empieza la etapa de crecimiento vegetativo.'
        ]
      },
      {
        id: 'relacion-con-otras-etapas',
        title: 'Relación con otras etapas',
        paragraphs: [
          'La germinación no es un capítulo aislado: es el punto de partida de una secuencia continua (ver "Cultivo en secuencia"). La radícula que emerge acá es el primer tramo del sistema de raíces que después sostiene todo el desarrollo vegetativo, y el sustrato que la recibe es, desde el primer día, el mismo que se describe en "Sustrato, agua y drenaje" como sostén de agua y aire para la raíz. Una vez que aparecen las primeras hojas verdaderas, la planta entra en la etapa de crecimiento vegetativo propiamente dicha, donde el fotoperiodo (ver "Luz como señal temporal") empieza a acumular la información que, más adelante, dispara la transición hacia la floración. Esta entrada no desarrolla esas etapas siguientes — solo señala el punto donde se conectan.'
        ]
      }
    ],
    observations: [
      'Observar y concluir no son lo mismo. Ver que la testa se abrió y que asomó una raíz pálida es una observación directa: algo visible, verificable, que cualquiera que mire la misma semilla podría confirmar.',
      'Afirmar a partir de eso que "la planta va a crecer bien" o que "el lote es de buena calidad" ya es una interpretación: una conclusión que depende de otros factores que todavía no se manifestaron. El atlas separa estas dos cosas a propósito — una buena lectura empieza por no confundir lo que se ve con lo que se supone.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Radícula pálida creciendo hacia abajo; hipocótilo arqueado que progresivamente se endereza al emerger; cotiledones que se abren y pasan de un tono claro a verde con la exposición a la luz. Es un proceso con ritmo variable de semilla a semilla, no un cronograma fijo.'
      },
      {
        level: 'ATTENTION',
        description: 'Ausencia total de cambio visible durante un lapso considerablemente más largo de lo que llevó al resto del mismo lote de semillas puede indicar falta de viabilidad de esa semilla en particular, o una condición ambiental (agua, oxígeno o temperatura) fuera de rango — sin que esto último sea un diagnóstico cerrado sin revisar el entorno.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Que la testa quede parcialmente adherida a los cotiledones al momento de abrirse es una situación que se observa con cierta frecuencia y que muchas veces se resuelve sola a medida que los cotiledones se expanden. No alcanza, por sí sola, para concluir que hay un problema.'
      }
    ],
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Confundir el arco normal del hipocótilo —que se endereza de manera progresiva a medida que emerge— con una "deformación" de la plántula.'
      },
      {
        type: 'OBSERVATION',
        description: 'Remover o mover el sustrato con demasiada frecuencia para "revisar" el avance, lo que puede alterar físicamente el proceso y después leerse erróneamente como una anomalía "natural" de la germinación.'
      },
      {
        type: 'CONTEXT',
        description: 'Atribuir una germinación lenta únicamente a la calidad de la semilla, sin considerar que la temperatura y la disponibilidad de agua del entorno también determinan el ritmo del proceso.'
      }
    ],
    environmentContext: [
      'Esta etapa no se observa igual en todos los contextos. Un ambiente protegido (por ejemplo, un espacio interior con temperatura más estable) tiende a ofrecer condiciones más constantes que un ambiente exterior, donde la temperatura y la humedad varían con el clima del día y la estación.',
      'Argentina tiene una diversidad climática amplia entre regiones —ya documentada en la dimensión geográfica del atlas—, lo que significa que el ritmo y la estacionalidad de esta etapa al aire libre no son iguales en todo el país. Esta entrada no afirma diferencias puntuales por provincia porque esa capa de contenido regional todavía no está desarrollada con fuente propia; lo que sí puede decirse en general es que el mismo proceso biológico se expresa con tiempos distintos según cuánto se aleje el ambiente real de un rango estable de agua, oxígeno y temperatura.'
    ],
    tags: ['fundamentos', 'germinación', 'agua'],
    relatedEntryIds: ['formas-de-germinar', 'sustrato-y-drenaje', 'luz-y-fotoperiodo', 'cultivo-en-secuencia', 'historia-de-la-planta', 'cuidado-de-la-plantula'],
    sourceIds: [
      'oficial-inase-vigor-semillas',
      'academica-unne-fisiologia-vegetal-germinacion',
      'academica-unpsjb-fisiologia-general-germinacion',
      'cientifica-latif-2025-hemp-priming-germination',
      'cientifica-cannabis-landraces-dormancy-2023',
      'cientifica-bewley-1997-seed-germination-dormancy',
      'cientifica-ren-2021-cannabis-domestication-genomics',
      'cientifica-dalmartello-2023-haimenkou-cannabis-archaeobotany',
      'cientifica-liu-2026-shandong-cannabis-phytolith'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-11',
    metadata: {
      seoTitle: 'Germinación y primera lectura del material — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es la germinación, qué ocurre biológicamente, qué señales observar y qué errores de interpretación son frecuentes en esta primera etapa.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'formas-de-germinar',
    slug: 'formas-de-germinar',
    categoryId: 'germinacion',
    title: 'Formas de germinar',
    summary: 'Sembrar directo, envolver la semilla en un medio húmedo o dejarla en remojo son formas distintas de ofrecer la misma combinación de agua, oxígeno y temperatura — no compiten por cuál es "mejor", sino por qué controlan y qué riesgo asumen.',
    intro: 'La entrada "Germinación y primera lectura del material" describe qué ocurre biológicamente dentro de la semilla. Esta entrada mira el paso anterior: de qué formas distintas se le puede ofrecer a esa semilla el agua, el oxígeno y la temperatura que ese proceso necesita, y qué cambia —en control, en riesgo, en lo que se puede observar— según cuál se elija.',
    sections: [
      {
        id: 'misma-fisiologia-formas-distintas',
        title: 'La misma fisiología, formas distintas de ofrecerla',
        paragraphs: [
          'Ninguna forma de germinar cambia el proceso biológico en sí: imbibición, activación metabólica y emergencia de la radícula (ver "Germinación y primera lectura del material") ocurren igual sea cual sea el método. Lo que cambia entre un método y otro es cómo se controla el acceso de la semilla al agua y al aire, y qué tan fácil es observar el momento exacto en que la radícula emerge sin tener que remover el sustrato para verlo.',
          'Por eso esta entrada no ordena los métodos de "mejor a peor": describe qué controla cada uno y qué compromiso asume, coherente con el resto del atlas.'
        ]
      },
      {
        id: 'siembra-directa',
        title: 'Siembra directa en sustrato',
        paragraphs: [
          'Consiste en colocar la semilla directamente en el sustrato final (o uno provisorio de igual estructura) y regar, dejando que la radícula emerja y crezca directamente en su medio definitivo. La ventaja física es que la raíz nunca se manipula: no hay traspaso ni riesgo de dañar la radícula recién emergida, que es frágil y quebradiza en sus primeras horas. La contrapartida es que el proceso queda oculto bajo la superficie —no se puede confirmar a simple vista que la semilla efectivamente germinó hasta que asoma el hipocótilo, ni distinguir, si no ocurre, si la causa fue una semilla no viable o una condición del sustrato fuera de rango.'
        ]
      },
      {
        id: 'medio-humedo-envuelto',
        title: 'Semilla envuelta en un medio húmedo (papel, tela, algodón)',
        paragraphs: [
          'Consiste en colocar la semilla entre capas de un material absorbente humedecido (papel de cocina, tela, algodón) en un ambiente cerrado que mantenga la humedad. Permite observar directamente el momento en que la testa se abre y la radícula emerge, sin necesidad de remover ningún sustrato — es, en ese sentido, el método con mayor visibilidad del proceso.',
          'El compromiso está en el paso siguiente: una vez que la radícula emerge, hay que trasladar la semilla al sustrato definitivo, y ese traspaso es exactamente el momento de mayor riesgo de dañar físicamente una radícula que recién empieza a anclarse y que es más frágil cuanto más creció dentro del medio húmedo. Distintos tratamientos previos a la siembra (remojo, envoltura húmeda, y otras variantes agrupadas bajo el término "priming") se han estudiado específicamente en cultivares de cáñamo y muestran diferencias reales en el establecimiento posterior de la plántula — es decir, la elección del método no es un detalle indiferente, aunque esta entrada no recomiende un tratamiento específico por encima de otro.'
        ]
      },
      {
        id: 'remojo-en-agua',
        title: 'Remojo previo en agua',
        paragraphs: [
          'Consiste en sumergir la semilla en agua durante un lapso antes de sembrarla (directo o en un medio húmedo), acelerando la imbibición inicial al maximizar el contacto con agua líquida. El límite físico de este método es el mismo que describe la entrada de germinación en general: el exceso de agua desplaza el aire, y una semilla sumergida por demasiado tiempo puede quedar con acceso insuficiente al oxígeno que la respiración del embrión necesita — por eso el remojo se usa como un paso acotado en el tiempo, no como el medio permanente de germinación.'
        ]
      },
      {
        id: 'que-no-cambia-entre-metodos',
        title: 'Qué no cambia entre métodos',
        paragraphs: [
          'Ningún método reemplaza la necesidad de que la semilla sea viable: un embrión no viable no va a germinar sea cual sea la forma en que se lo intente (ver la distinción entre viabilidad y vigor, en "Germinación y primera lectura del material"). Tampoco ningún método "fuerza" una germinación más rápida que la que permite la propia semilla — lo que cambia es la visibilidad del proceso y el punto en que existe riesgo de manipulación física, no la velocidad biológica de fondo.'
        ]
      },
      {
        id: 'semillas-con-dormicion-fisica',
        title: 'Cuando la testa misma es la barrera: dormición física y escarificación',
        paragraphs: [
          'Los tres métodos anteriores asumen una semilla sin dormición prolongada, que es el caso de la mayoría de los cultivares comerciales de Cannabis sativa (ver "Germinación y primera lectura del material"). Existe, sin embargo, un caso distinto y documentado en fisiología de semillas en general: la dormición física (o "dormición dura"), en la que el propio tegumento de la semilla es impermeable al agua o al oxígeno y bloquea la imbibición, sin que haya ningún problema con el embrión que contiene. Es un mecanismo descripto en múltiples especies vegetales —no específico de Cannabis— y más probable en semilla vieja, silvestre o de variedades de cáñamo de fibra con testa particularmente gruesa.',
          'La escarificación es el conjunto de tratamientos que buscan superar esa barrera, agrupados en tres tipos según cómo actúan: mecánica (abrasión o corte superficial de la testa), química (uso de sustancias que ablandan o disuelven parte del tegumento) y térmica (exposición a calor o agua caliente que agrieta la cubierta). Los tres comparten el mismo objetivo fisiológico — permitir que el agua llegue al embrión — y ninguno "fuerza" la germinación de un embrión no viable: siguen aplicando las mismas tres condiciones (agua, oxígeno, temperatura) que el resto de esta entrada describe, solo que a una semilla cuya testa, sin ese tratamiento previo, no las dejaría llegar.',
          'Esta entrada no prescribe un método de escarificación, un tiempo ni una concentración específica: son variables que dependen del grosor real de la testa en cada caso, y aplicar un tratamiento más agresivo del necesario puede dañar el embrión en vez de ayudarlo.'
        ]
      }
    ],
    observations: [
      'Ver que una semilla en medio húmedo abrió la testa y mostró la radícula un día antes que otra sembrada directamente no es evidencia de que el método haya sido "mejor" — puede deberse a que ese método simplemente permite verlo antes, no a que haya germinado antes en términos biológicos reales.',
      'El traspaso de una radícula ya emergida desde un medio húmedo hacia el sustrato es un momento observable de riesgo físico, distinto del proceso de germinación en sí — confundir un daño de manipulación con "la semilla no germinó bien" es un error de atribución frecuente.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'En siembra directa: ausencia de cambio visible en superficie durante los primeros días, seguida de la emergencia del hipocótilo. En medio húmedo: apertura de la testa y radícula visible directamente sobre el material húmedo.'
      },
      {
        level: 'ATTENTION',
        description: 'Una radícula que se ve oscurecida, reseca o quebradiza inmediatamente después de un traspaso desde un medio húmedo amerita revisar si el manejo del traspaso fue la causa, antes de atribuirlo a la calidad de la semilla.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Que dos semillas del mismo lote, sembradas por métodos distintos, muestren tiempos distintos hasta que se hace visible la radícula no alcanza, por sí solo, para concluir que un método es más rápido que otro — la variabilidad individual entre semillas del mismo lote es real y esperable.'
      }
    ],
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Concluir que un método de germinación es superior a otro a partir de cuándo se hizo visible la radícula, sin considerar que cada método ofrece distinta visibilidad del mismo proceso interno.'
      },
      {
        type: 'OBSERVATION',
        description: 'Revisar con demasiada frecuencia una siembra directa removiendo el sustrato para "ver cómo va", lo que puede dañar físicamente una radícula que ya está emergiendo bajo la superficie.'
      },
      {
        type: 'CONTEXT',
        description: 'Atribuir a "mala calidad de semilla" un daño que en realidad ocurrió durante el traspaso desde un medio húmedo hacia el sustrato definitivo — son dos causas distintas de un mismo resultado visible (la planta no prospera).'
      }
    ],
    environmentContext: [
      'La elección de método no cambia qué condiciones ambientales importan (agua, oxígeno, temperatura, ya descriptas en "Germinación y primera lectura del material"), pero sí cambia cuánto control directo se tiene sobre esas condiciones: un medio húmedo cerrado suele mantener la humedad de forma más estable que un sustrato expuesto a la ventilación o al clima exterior.',
      'Esta entrada no recomienda un método por sobre otro para ningún contexto (interior, exterior, escala) — describe las diferencias reales entre ellos para que la elección sea informada, no arbitraria.'
    ],
    tags: ['fundamentos', 'germinación', 'agua'],
    relatedEntryIds: ['germinacion', 'sustrato-y-drenaje'],
    sourceIds: [
      'cientifica-bewley-1997-seed-germination-dormancy',
      'cientifica-latif-2025-hemp-priming-germination',
      'oficial-inase-vigor-semillas',
      'academica-unne-fisiologia-vegetal-germinacion',
      'academica-ermis-2024-hardseededness-review'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-13',
    metadata: {
      seoTitle: 'Formas de germinar — Atlas del Cultivo Argentino',
      seoDescription: 'Siembra directa, medio húmedo envuelto y remojo previo: qué controla cada forma de germinar, qué riesgo asume, y por qué ninguna cambia la fisiología de fondo.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'sustrato-y-drenaje',
    slug: 'sustrato-y-drenaje',
    categoryId: 'suelo-y-agua',
    title: 'Sustrato, agua y drenaje',
    summary: 'El sustrato se lee por su doble capacidad, aparentemente contradictoria, de retener agua y de dejarla drenar — ninguna de las dos sola alcanza.',
    intro: 'El sustrato no es solo el lugar donde se sostiene físicamente la planta: es la interfase que decide cuánta agua y cuánto aire llegan a la raíz al mismo tiempo. Un sustrato "bueno" no es el que retiene más agua ni el que drena más rápido — es el que sostiene ambas cosas a la vez, porque la raíz necesita las dos.',
    sections: [
      {
        id: 'que-hace-el-sustrato',
        title: 'Qué hace el sustrato',
        paragraphs: [
          'El sustrato cumple varias funciones a la vez: sostiene físicamente la planta, almacena agua y nutrientes disponibles, y —esto suele pasarse por alto— aloja el aire que la raíz necesita para respirar. Estas funciones compiten por el mismo espacio: el volumen que ocupa el agua es, literalmente, el volumen que no puede ocupar el aire.',
          'Por eso la estructura física del sustrato (el tamaño y la disposición de sus partículas y agregados) importa tanto como su composición: determina cuánto espacio poroso existe y cómo se reparte entre agua retenida y aire disponible.'
        ]
      },
      {
        id: 'historia',
        title: 'Historia',
        paragraphs: [
          'La idea de que un sustrato en maceta se comporta distinto que el mismo suelo en el campo abierto se formalizó recién a mediados del siglo XX. Un trabajo clave fue el de White y Mastalerz (1966), que describieron el concepto de "capacidad de contenedor": después de regar a saturación y dejar drenar, un sustrato dentro de una maceta retiene más agua en su parte inferior que la misma mezcla en el suelo abierto, por una acumulación de agua que se forma en el fondo del recipiente —un efecto físico ligado a la altura del contenedor, no a un exceso de riego—. Antes de esa formalización, la práctica hortícola ya distinguía, de forma empírica, entre un sustrato "que retenga humedad" y uno "que no encharque", pero sin explicar por qué esas dos necesidades a veces entran en tensión dentro de un contenedor chico. Desde entonces, la investigación pasó de esa descripción cualitativa a cuantificar la relación entre porosidad de aireación y capacidad de retención de agua: en Argentina, un estudio del INTA (2020) evaluó cómo distintas proporciones de compost y turba en una mezcla modifican esa relación y el desarrollo de plantines florales, dentro de una línea de investigación que sigue activa.'
        ]
      },
      {
        id: 'agua-y-drenaje',
        title: 'Agua y drenaje',
        paragraphs: [
          'El drenaje es la capacidad del sustrato de dejar salir el agua excedente después de haber retenido la que puede sostener. No es una falla ni un desperdicio: es lo que evita que el espacio poroso quede permanentemente ocupado por agua en lugar de aire.',
          'Un sustrato sin drenaje suficiente no falla por "exceso de riego" en abstracto, sino porque cada riego sucesivo no tiene adónde ir: el agua se acumula, desplaza el aire, y el sistema completo se satura.'
        ]
      },
      {
        id: 'aireacion-y-oxigeno',
        title: 'Aireación y oxígeno',
        paragraphs: [
          'La raíz respira: consume oxígeno y libera dióxido de carbono, igual que el resto de la planta, para obtener la energía que necesita para absorber agua y nutrientes. Cuando el sustrato queda anegado, el agua desplaza el aire de los poros y esa respiración se interrumpe — un estado que se describe como hipoxia (falta de oxígeno) o, si se prolonga, anoxia.',
          'Frente a esa falta de oxígeno, la raíz puede cambiar temporalmente su metabolismo hacia una vía que no lo requiere (fermentación alcohólica), pero es una vía de emergencia con mucho menor rendimiento energético, no una alternativa sostenible: si la condición se mantiene, la función radicular se deteriora.'
        ]
      },
      {
        id: 'que-se-evalua-que-se-ve-y-por-que',
        title: 'Qué se evalúa, qué se ve y por qué',
        paragraphs: [
          'Separado en tres preguntas distintas, para no mezclar el proceso físico con la observación ni con su causa:'
        ],
        list: [
          'Qué se evalúa: la capacidad del sustrato de sostener agua disponible para la raíz y, al mismo tiempo, dejar espacio poroso para el aire — dos capacidades que compiten por el mismo volumen, no dos sustratos distintos.',
          'Qué se ve desde afuera: el sustrato oscurece y pesa más recién regado, aclara y aligera a medida que se seca; en un contenedor con buen drenaje, el agua sobrante escurre por los orificios de salida poco después de regar. Al revisar el fondo de la maceta, a veces se ven raíces claras llegando hasta los orificios de drenaje — es compatible con un sistema radicular activo, pero no alcanza por sí solo para concluir que el resto del sustrato está en buen estado.',
          'Por qué ocurre así: el agua ocupa primero los poros más chicos (los que la retienen contra la gravedad) y el excedente circula por los poros más grandes hasta salir por el fondo; si esos poros grandes quedan bloqueados —por compactación, por un contenedor sin salida, o por riego constante sin dejar secar— el aire no puede volver a ocupar ese espacio y la raíz entra en hipoxia, porque no puede respirar con normalidad.'
        ]
      },
      {
        id: 'observar-la-humedad',
        title: 'Observar la humedad',
        paragraphs: [
          'La humedad del sustrato no se lee bien solo por la superficie: la parte superior puede estar seca al tacto mientras el interior todavía retiene agua, o al revés. El peso relativo de la maceta o el contenedor (más liviano cuando está seco, más pesado cuando está húmedo) suele ser una referencia más consistente que la apariencia superficial sola.',
          'Remover el sustrato de forma constante para "revisar" la humedad altera físicamente su estructura y puede introducir el mismo problema que se busca evitar.'
        ]
      },
      {
        id: 'relacion-con-otras-etapas',
        title: 'Relación con otras etapas',
        paragraphs: [
          'El sustrato no es un tema aparte del resto del recorrido: es la base física sobre la que ocurre buena parte de lo que describen otras entradas del atlas. La radícula que aparece durante la "Germinación y primera lectura del material" se ancla y empieza a absorber agua exactamente en este mismo sistema de poros, agua y aire — el sustrato no cambia entre una etapa y otra, aunque las necesidades de la planta sí lo hagan. A medida que la planta avanza en su desarrollo ("Cultivo en secuencia"), el sistema de raíces ocupa más volumen y se vuelve más sensible a que ese equilibrio entre agua y aire se sostenga, porque una raíz más grande también respira más. Esta entrada no desarrolla esas etapas — solo señala que el sustrato es la base física común a todas ellas.'
        ]
      }
    ],
    observations: [
      'Ver que la superficie del sustrato está oscura y húmeda después de un riego es una observación directa. Concluir a partir de eso que "hay buen drenaje" ya es una interpretación — el drenaje se evalúa por cómo cambia esa humedad con el tiempo, no por una sola foto del momento.',
      'De la misma manera, ver una planta caída (marchita) no dice por sí solo si falta agua o si sobra: la falta de agua y el exceso de agua (por asfixia radicular) pueden producir una apariencia externa similar, aunque el mecanismo interno sea opuesto.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'El sustrato oscurece al regar y aclara progresivamente a medida que se seca, en un ciclo que se repite de forma más o menos regular según el ambiente. Es el comportamiento esperable de cualquier sustrato con drenaje funcional.'
      },
      {
        level: 'ATTENTION',
        description: 'Un sustrato que permanece visiblemente saturado u oscuro durante un lapso mucho más largo de lo habitual entre riegos, o que desarrolla un olor a estancado, es una señal que amerita revisar la capacidad de drenaje del sistema (agujeros de salida, compactación, tipo de contenedor).'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Que la superficie se vea seca mientras el interior sigue húmedo es una situación común y esperable en muchos sustratos — no alcanza, por sí sola, para decidir que hace falta regar.'
      }
    ],
    commonMistakes: [
      {
        type: 'OBSERVATION',
        description: 'Evaluar la humedad mirando solo la superficie del sustrato, sin considerar que el perfil completo puede estar en un estado distinto en profundidad.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Atribuir automáticamente una planta marchita a "falta de agua" sin considerar que el exceso de agua —por asfixia radicular— puede producir una apariencia externa parecida.'
      },
      {
        type: 'CONTEXT',
        description: 'Juzgar la necesidad de drenaje de un sustrato sin considerar si está en maceta/contenedor (donde el agua solo puede salir por el fondo) o en el suelo directo (donde también drena lateralmente) — son situaciones físicamente distintas.'
      }
    ],
    environmentContext: [
      'En un ambiente protegido, el ritmo de secado del sustrato depende sobre todo del riego y de la temperatura/ventilación del espacio, factores relativamente estables y controlables. Al aire libre, se le suma la lluvia (que puede sumarse al riego sin que el cultivador lo decida) y la evaporación, que varía con el clima del día y la estación.',
      'Esta entrada no fija un ritmo de riego ni una frecuencia — depende de demasiadas variables locales (tipo de sustrato, tamaño de contenedor, clima) como para dar un número único sin convertirlo en una receta arbitraria.'
    ],
    tags: ['suelo', 'agua', 'drenaje'],
    relatedEntryIds: ['germinacion', 'cultivo-en-secuencia'],
    sourceIds: [
      'oficial-inta-relacion-suelo-planta-agua',
      'academica-unlpam-inta-guia-evaluacion-visual-suelo',
      'oficial-inta-sustrato-maceta-rubio-karlanian',
      'cientifica-barbaro-karlanian-2020-propiedades-fisicas-sustrato',
      'academica-white-mastalerz-1966-container-capacity',
      'cientifica-loreti-perata-2020-hypoxia-plants'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-11',
    metadata: {
      seoTitle: 'Sustrato, agua y drenaje — Atlas del Cultivo Argentino',
      seoDescription: 'Qué función cumple el sustrato, cómo se relacionan agua y aire en la raíz, y qué señales observar antes de concluir que falta o sobra riego.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'luz-y-fotoperiodo',
    slug: 'luz-y-fotoperiodo',
    categoryId: 'luz-y-clima',
    title: 'Luz como señal temporal',
    summary: 'La luz no solo alimenta a la planta por fotosíntesis: también le indica en qué momento del año está, y eso cambia lo que la planta hace.',
    intro: 'Hay dos formas distintas en que la luz importa para una planta, y conviene no mezclarlas. Una es la luz como energía: cuánta luz recibe la planta para fotosintetizar. La otra es la luz como señal de tiempo: cuánto dura el período de luz frente al de oscuridad, y qué le indica eso a la planta sobre en qué momento del ciclo está. Esta entrada trata principalmente la segunda.',
    sections: [
      {
        id: 'luz-como-senal',
        title: 'Luz como señal, no solo como energía',
        paragraphs: [
          'La intensidad de luz (cuánta luz recibe la planta) y la duración del período de luz (cuánto dura ese período dentro de las 24 horas del día) son dos variables distintas, y una planta puede responder de forma diferente a cada una. La intensidad se relaciona principalmente con cuánta energía hay disponible para fotosíntesis. La duración —y, más precisamente, la duración del período de oscuridad ininterrumpida— es lo que funciona como señal de tiempo.',
          'Esta distinción es la base conceptual del fotoperiodismo: la respuesta de una planta a la duración relativa del día y la noche, no solo a la cantidad de luz que recibe.'
        ]
      },
      {
        id: 'cannabis-planta-de-dia-corto',
        title: 'Cannabis como planta de día corto',
        paragraphs: [
          'Cannabis sativa es, en su comportamiento natural, una planta de día corto: el desarrollo vegetativo predomina bajo fotoperiodos de día largo, y la transición hacia el desarrollo reproductivo (floración) se dispara cuando el fotoperiodo pasa a ser de día corto —es decir, cuando el período de oscuridad ininterrumpida se alarga lo suficiente—. Esta transición no es solo interna: se acompaña de cambios morfológicos visibles, como el cambio en la disposición de las hojas en el tallo.',
          'Al aire libre, esta señal la da el propio ciclo estacional: los días se acortan progresivamente hacia el fin del verano y el otoño en el hemisferio sur, que es donde está Argentina.'
        ]
      },
      {
        id: 'fitocromo-receptor',
        title: 'El fitocromo, el receptor de la señal',
        paragraphs: [
          'La planta no "ve" la duración del día de forma abstracta: la detecta a través de un pigmento sensible a la luz llamado fitocromo, que existe en dos formas que se convierten una en la otra según el tipo de luz que reciben (luz roja y roja lejana) y que revierten parcialmente durante la oscuridad. La proporción entre estas dos formas al final del período de oscuridad es, en términos generales, lo que la planta "lee" como información de tiempo.',
          'Esto explica por qué una interrupción breve del período de oscuridad con luz puede alterar la señal completa, incluso si la cantidad total de luz del día no cambió demasiado: lo que se altera es la continuidad de la oscuridad, no la cantidad de luz en sí.'
        ]
      },
      {
        id: 'de-la-senal-a-la-flor',
        title: 'De la señal a la flor: qué pasa adentro de la planta',
        paragraphs: [
          'Un trabajo reciente sobre Cannabis sativa específicamente —no una analogía con otra especie— siguió lo que ocurre entre que la planta recibe la señal de día corto y la inflorescencia aparece: bajo fotoperiodo de día corto, los niveles de una hormona vegetal (giberelina) bajan, y ese descenso es lo que frena el alargamiento de los entrenudos y permite que se forme la inflorescencia condensada característica de la floración. Aplicar giberelina de forma artificial reproduce el efecto contrario (el de día largo) e impide que la inflorescencia se compacte.',
          'El mismo trabajo encontró que la señal necesita sostenerse: hacen falta al menos tres días consecutivos de fotoperiodo corto para que el cambio se registre — una interrupción antes de ese punto no alcanza para disparar la transición, coherente con la idea, ya mencionada arriba, de que lo que importa es la continuidad de la señal, no un único ciclo aislado.'
        ]
      }
    ],
    observations: [
      'Notar que una planta recibe menos horas de luz directa que otra es una observación. Concluir de inmediato que "por eso" no va a florecer, o que va a crecer peor, es una interpretación apresurada: la floración depende de la señal de fotoperiodo específicamente, no solo de la cantidad general de luz recibida.',
      'De la misma manera, ver que una planta crece más lento en altura no es, por sí solo, un dato suficiente para atribuirlo a la luz — hay otras variables (agua, sustrato, temperatura) que producen efectos similares.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'La planta orienta su crecimiento hacia la fuente de luz disponible (fototropismo) — un comportamiento normal, no una señal de problema.'
      },
      {
        level: 'ATTENTION',
        description: 'Una interrupción irregular o repetida del período de oscuridad, en un contexto donde se espera un fotoperiodo de día corto continuo, puede retrasar o alterar la señal de floración — vale la pena revisar la continuidad de la oscuridad antes de asumir otra causa.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Un crecimiento vertical más lento en un período puntual, sin otros cambios asociados, no alcanza por sí solo para atribuirlo a la luz — muchas variables producen ese mismo efecto aislado.'
      }
    ],
    commonMistakes: [
      {
        type: 'OBSERVATION',
        description: 'Confundir "cuánta luz hay" (intensidad, brillo general del ambiente) con "cuánto dura la oscuridad ininterrumpida" (la variable que realmente funciona como señal de fotoperiodo).'
      },
      {
        type: 'INTERPRETATION',
        description: 'Asumir que más luz siempre equivale a mejor o más rápido desarrollo, sin considerar que el momento y la duración de esa luz importan tanto como la cantidad.'
      },
      {
        type: 'CONTEXT',
        description: 'Leer el comportamiento de una planta de exterior sin considerar en qué momento del ciclo estacional está el fotoperiodo natural de esa fecha y esa latitud.'
      }
    ],
    environmentContext: [
      'Al aire libre, la duración del día cambia de forma progresiva y predecible con la estación y la latitud — es la señal natural de fotoperiodo. En un ambiente protegido con luz artificial, esa señal puede desacoplarse por completo del ciclo estacional externo, porque pasa a depender de una fuente de luz controlada en vez del sol.',
      'Esta entrada no describe instalaciones de iluminación artificial ni parámetros técnicos de equipos: se limita al concepto de fotoperiodo como señal biológica, que es la base común a cualquier ambiente, protegido o exterior.'
    ],
    tags: ['luz', 'fotoperiodo', 'ambiente'],
    relatedEntryIds: ['cultivo-en-secuencia', 'cosecha-y-maduracion', 'genetica-y-tipos'],
    sourceIds: ['academica-unne-fitocromos-desarrollo-vegetal', 'cientifica-hesami-2023-cannabis-life-cycle', 'cientifica-alter-2024-cannabis-fotoperiodo-giberelina'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-12',
    metadata: {
      seoTitle: 'Luz como señal temporal — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es el fotoperiodismo, por qué Cannabis sativa responde al día corto, y por qué la duración de la oscuridad importa tanto como la cantidad de luz.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'lectura-de-senales',
    slug: 'lectura-de-senales',
    categoryId: 'sanidad',
    title: 'Lectura de señales y sanidad',
    summary: 'Observar no es diagnosticar: un mismo síntoma puede tener un origen biótico (un organismo) o abiótico (una condición ambiental), y confundirlos es el error más común.',
    intro: 'Cuando una planta muestra un cambio visible —una hoja que amarillea, un borde que se seca, una mancha— la pregunta inmediata suele ser "¿qué tiene?". Esta entrada propone frenar ese paso: antes de nombrar una causa, hay una pregunta previa más útil, que es de qué tipo de origen podría tratarse, y qué otras cosas habría que mirar antes de decidirlo.',
    sections: [
      {
        id: 'observar-no-es-diagnosticar',
        title: 'Observar no es diagnosticar',
        paragraphs: [
          'El diagnóstico de una alteración en una planta se inicia determinando si su origen es biótico (causado por un organismo —un hongo, una bacteria, una plaga—) o abiótico (causado por una condición ambiental adversa —agua, temperatura, luz, nutrientes—). Esa primera distinción es un paso metodológico, no una conclusión inmediata a partir de lo que se ve a simple vista.',
          'Esta entrada no reemplaza un diagnóstico técnico ni pretende identificar organismos o enfermedades específicas: organiza el marco de lectura para no saltar directamente de un síntoma a una causa.'
        ]
      },
      {
        id: 'origen-biotico-vs-abiotico',
        title: 'Por qué un síntoma solo no alcanza',
        paragraphs: [
          'Distintas causas pueden producir síntomas visualmente muy parecidos. Un ejemplo concreto: organismos que invaden el sistema que transporta agua dentro de la planta pueden impedir ese transporte y generar una apariencia idéntica a la del estrés hídrico o la carencia de nutrientes —aunque el origen real no tenga nada que ver con el agua ni con la nutrición disponible en el sustrato—.',
          'Por eso, un síntoma aislado casi nunca alcanza como evidencia suficiente: hace falta mirar el patrón completo, no solo el punto donde apareció el cambio.'
        ]
      },
      {
        id: 'leer-el-patron',
        title: 'Leer el patrón, no solo el punto',
        paragraphs: [
          'Algunas preguntas ayudan a orientar sin diagnosticar: ¿el cambio se repite en varias plantas de especies distintas que comparten el mismo espacio, o aparece en una sola? ¿Avanza progresivamente de una hoja o una planta a las vecinas, o se mantiene localizado? ¿Coincide con algún cambio reciente en el riego, la temperatura o el ambiente?',
          'Ninguna de estas preguntas da, por sí sola, una respuesta cerrada — pero cada una acota el campo de causas posibles antes de nombrar una.'
        ]
      }
    ],
    observations: [
      'Ver que una hoja cambió de color es una observación directa. Decir que "la planta tiene tal problema" a partir de esa sola hoja ya es una interpretación — y frecuentemente una interpretación prematura.',
      'El atlas no ofrece un listado de "si ves X, es Y": ese formato es precisamente el que genera errores de lectura, porque un mismo síntoma visible puede corresponder a orígenes muy distintos.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Variaciones normales de color o forma asociadas a la edad de la hoja (las más viejas cambian de aspecto antes que las nuevas) o a su posición relativa respecto de la luz, sin patrón de avance ni repetición en otras plantas.'
      },
      {
        level: 'ATTENTION',
        description: 'Un cambio que avanza progresivamente de una hoja a las contiguas, o que aparece de forma simultánea en varias plantas de la misma especie mientras otras especies cercanas no se ven afectadas, es un patrón que orienta más hacia un origen biótico y amerita observación más cercana.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Un cambio puntual, localizado, sin avance visible en los días siguientes y sin relación clara con ningún cambio reciente de riego o ambiente — es exactamente el tipo de caso donde todavía no hay suficiente información para orientar hacia ningún origen en particular.'
      }
    ],
    commonMistakes: [
      {
        type: 'OBSERVATION',
        description: 'Fijarse en un único punto o una única hoja en vez de observar el patrón en el conjunto de la planta y de las plantas vecinas.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Aplicar una lógica de "si veo X, entonces es Y": nombrar una causa específica a partir de un solo síntoma visual, sin considerar que ese mismo síntoma tiene múltiples orígenes posibles.'
      },
      {
        type: 'CONTEXT',
        description: 'No revisar si hubo un cambio reciente en el riego, la temperatura o el ambiente antes de asumir que el origen es necesariamente un organismo externo (plaga u hongo).'
      }
    ],
    environmentContext: [
      'En un ambiente protegido, con menos variables externas, suele ser más simple relacionar un cambio con un evento reciente puntual (un ajuste de riego, un cambio de ubicación). Al aire libre, el número de variables posibles es mayor —clima, viento, organismos del entorno—, lo que hace que el patrón completo (no un síntoma aislado) sea todavía más necesario para orientar la lectura.'
    ],
    tags: ['sanidad', 'riesgo'],
    relatedEntryIds: ['sustrato-y-drenaje', 'marco-editorial'],
    sourceIds: ['oficial-inta-sintomatologia-diagnostico-diferencial'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-10',
    metadata: {
      seoTitle: 'Lectura de señales y sanidad — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué un síntoma aislado no alcanza para diagnosticar, cómo distinguir origen biótico de abiótico, y qué patrones observar antes de concluir.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'cultivo-en-secuencia',
    slug: 'cultivo-en-secuencia',
    categoryId: 'cultivo',
    title: 'Cultivo en secuencia',
    summary: 'El desarrollo de la planta es un proceso continuo (ontogenia), no una serie de fotos sueltas — leer una etapa aislada, sin la trayectoria previa, deja afuera la mitad de la información.',
    intro: 'Una planta no llega a un estado nuevo de un día para el otro: llega a través de una secuencia de cambios continuos y en gran medida irreversibles, que se conoce en biología como ontogenia. Esta entrada trata esa continuidad —cómo una etapa se apoya en la anterior y prepara la siguiente— y no un instructivo de tareas por etapa.',
    sections: [
      {
        id: 'una-secuencia-no-una-foto',
        title: 'Una secuencia, no una foto',
        paragraphs: [
          'El desarrollo de una planta a lo largo de su vida implica cambios que van más allá de un simple aumento de tamaño: aparecen órganos nuevos, cambian los tejidos, y en algún momento la planta pasa de un desarrollo predominantemente vegetativo (raíces, tallo, hojas) a uno reproductivo (flores). Esa secuencia completa —desde la germinación hasta la maduración— es lo que se llama ontogenia.',
          'Mirar solo el estado actual de una planta, sin la trayectoria que la trajo hasta ahí, deja afuera información relevante: el mismo estado visible puede significar cosas distintas según si la planta viene acelerando, sostenida o frenando su desarrollo.'
        ]
      },
      {
        id: 'de-vegetativo-a-reproductivo',
        title: 'De vegetativo a reproductivo',
        paragraphs: [
          'Durante el desarrollo vegetativo, la planta invierte su energía en estructuras no reproductivas: raíces, ramas, nudos, hojas. En algún momento —en Cannabis sativa, disparado principalmente por el cambio de fotoperiodo (ver la entrada sobre luz)— empieza el desarrollo reproductivo, con la formación de flores.',
          'Esta transición no es instantánea ni se limita a "que aparezcan flores": se acompaña de otros cambios progresivos, como variaciones en la cantidad de folíolos por hoja y en cómo se disponen las hojas a lo largo del tallo. Son señales de que el proceso está en marcha, observables antes de que la floración sea evidente a simple vista.'
        ]
      },
      {
        id: 'por-que-una-observacion-no-alcanza',
        title: 'Por qué una observación aislada puede ser insuficiente',
        paragraphs: [
          'Comparar una planta contra un estándar externo fijo ("a esta altura debería tener tal aspecto") ignora que cada planta tiene su propio ritmo. Comparar la misma planta contra su propio estado anterior —¿está avanzando, sostenida o retrocediendo respecto de la semana pasada?— suele ser una lectura más útil que compararla contra un ideal externo.'
        ]
      }
    ],
    observations: [
      'Ver que una planta tiene hojas con más folíolos que hace unas semanas es una observación directa de progreso vegetativo. Concluir de ahí que "va a florecer pronto" es una interpretación que depende de otra variable distinta (el fotoperiodo), no solo de cuánto creció.',
      'La secuencia completa importa más que cualquier punto suelto de ella: dos plantas pueden verse iguales hoy y tener trayectorias previas muy distintas.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Progresión gradual y continua: más nudos, más folíolos por hoja, cambios paulatinos en la disposición de las hojas a medida que se acerca la transición reproductiva. El ritmo varía de planta a planta, pero la dirección del cambio es consistente.'
      },
      {
        level: 'ATTENTION',
        description: 'Una detención abrupta del desarrollo respecto del propio ritmo previo de esa planta —no respecto de un estándar externo— amerita revisar qué cambió en el entorno reciente (agua, luz, sustrato), en vez de asumir que "así es esta planta".'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Una semana de crecimiento más lento, aislada, sin otras señales asociadas, no alcanza por sí sola para concluir que algo cambió: el desarrollo no avanza siempre al mismo ritmo constante.'
      }
    ],
    commonMistakes: [
      {
        type: 'OBSERVATION',
        description: 'Comparar una planta solo contra un estándar externo, en vez de contra su propia trayectoria previa a lo largo del tiempo.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Asumir que dos plantas en el mismo estado visible están necesariamente en el mismo punto interno de su desarrollo — la variabilidad individual (genética, de origen) es real.'
      },
      {
        type: 'CONTEXT',
        description: 'Leer una transición de etapa sin considerar que el fotoperiodo es, en gran medida, el factor que la dispara —tratarla como si fuera solo cuestión de "tiempo transcurrido".'
      }
    ],
    environmentContext: [
      'La continuidad y el ritmo de esta secuencia se leen distinto según el ambiente: en un espacio protegido, con condiciones más estables, la secuencia tiende a ser más predecible. Al aire libre, sigue el fotoperiodo y el clima real de la estación y la zona, con la variabilidad que eso implica.',
      'Esta entrada no fija un calendario ni una duración esperada para cada etapa — depende de demasiadas variables (genética, ambiente, manejo) como para dar una cifra única sin volverla arbitraria.'
    ],
    tags: ['cultivo', 'ciclo'],
    relatedEntryIds: ['germinacion', 'luz-y-fotoperiodo', 'poda', 'fertilizacion-y-nutricion', 'ciclo-de-vida'],
    sourceIds: ['cientifica-hesami-2023-cannabis-life-cycle', 'academica-uncuyo-guia-crecimiento'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-10',
    metadata: {
      seoTitle: 'Cultivo en secuencia — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué el desarrollo de la planta es una secuencia continua (ontogenia) y no una serie de estados aislados, y cómo leer la transición de vegetativo a reproductivo.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'poda',
    slug: 'poda',
    categoryId: 'poda',
    title: 'Poda',
    summary: 'Podar interrumpe una señal hormonal concreta —la dominancia apical— y por eso cambia la forma de la planta; no es un atajo genérico para "que crezca mejor".',
    intro: 'Podar suele describirse en términos de resultado ("para que salgan más ramas", "para que entre más luz"), pero el resultado se explica por un mecanismo fisiológico puntual: la dominancia apical. Esta entrada describe ese mecanismo, qué hace la poda sobre él, y qué evidencia existe —de la propia especie, no de una analogía— sobre sus efectos.',
    sections: [
      {
        id: 'dominancia-apical',
        title: 'Dominancia apical: por qué una planta crece "hacia arriba" por defecto',
        paragraphs: [
          'La dominancia apical es el fenómeno por el cual el meristema apical (la punta de crecimiento del tallo principal) inhibe el crecimiento de las yemas laterales ubicadas más abajo. El mecanismo involucra auxina producida en esa punta de crecimiento, que viaja hacia abajo y suprime el desarrollo de esas yemas — el resultado visible es una planta que prioriza el crecimiento vertical de un tallo principal por sobre la ramificación lateral.',
          'Más de un siglo de investigación sobre este mecanismo muestra que no se explica solo por auxina: estudios recientes encontraron que, tras eliminar la punta de crecimiento, el aumento de citoquininas (otra hormona vegetal) en las yemas laterales está más correlacionado con un aumento de azúcares disponibles que con la caída de auxina en sí — el mecanismo completo sigue siendo objeto de investigación activa, no un capítulo cerrado.'
        ]
      },
      {
        id: 'que-hace-la-poda',
        title: 'Qué hace la poda sobre ese mecanismo',
        paragraphs: [
          'Remover el meristema apical (una práctica conocida como "topping" cuando se hace en el tallo principal) elimina la fuente de la señal que inhibía a las yemas laterales — sin esa señal, esas yemas quedan liberadas para desarrollarse, y la planta pasa de un crecimiento dominado por un solo eje vertical a una estructura con más puntos de crecimiento activos.',
          'Un estudio reciente con dos cultivares de cáñamo industrial (Cannabis sativa L.) sometidos a distintos niveles de topping encontró cambios medibles en su morfología, fisiología y composición bioquímica — y, relevante para no generalizar de más, esos cambios no fueron idénticos entre los dos cultivares: la respuesta a la poda varió según el material genético.'
        ]
      },
      {
        id: 'lo-que-esta-entrada-no-hace',
        title: 'Lo que esta entrada no hace',
        paragraphs: [
          'Esta entrada no da un momento del ciclo, una cantidad de nudos ni una técnica paso a paso para podar — reproducir una instrucción así, sin evidencia argentina ni de todos los contextos posibles (genética, ambiente, etapa de la planta), sería exactamente el tipo de receta universal que el atlas evita en el resto de su contenido. El estudio citado muestra que la respuesta varía por cultivar; no hay evidencia de que un único protocolo de poda funcione igual para cualquier planta.'
        ]
      }
    ],
    observations: [
      'Ver que una planta desarrolla más ramas laterales después de remover su punta de crecimiento es una observación consistente con el mecanismo de dominancia apical. Concluir que "más ramas" significa automáticamente "más producción final" es una interpretación distinta, que depende de otras variables (luz disponible para esas ramas nuevas, tiempo restante del ciclo) que esta entrada no evalúa.',
      'Que dos plantas de cultivares distintos respondan de forma distinta al mismo corte no es una contradicción — es exactamente lo que encontró el estudio citado: la respuesta a la poda no es uniforme entre genotipos.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Desarrollo progresivo de las yemas laterales antes inhibidas, en los días/semanas posteriores a la remoción del meristema apical — es el mecanismo esperado de liberación de la dominancia apical, no una anomalía.'
      },
      {
        level: 'ATTENTION',
        description: 'Una detención generalizada del crecimiento (no solo de las yemas antes dominadas) tras un corte amerita revisar si hubo un daño mayor al previsto, más allá del efecto esperado sobre la dominancia apical.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Que dos plantas del mismo lote respondan con distinta velocidad de ramificación tras un corte similar no alcanza, por sí solo, para concluir que el corte estuvo mal hecho en una de ellas — la variabilidad genética individual es real.'
      }
    ],
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Tratar la poda como una técnica con un único resultado garantizado, ignorando que el propio estudio de referencia encontró respuestas distintas entre cultivares de la misma especie.'
      },
      {
        type: 'CONTEXT',
        description: 'Aplicar un protocolo de poda leído para un contexto o cultivar distinto sin considerar que la dominancia apical y su liberación son un mecanismo general, pero su magnitud y velocidad de respuesta varían según la planta.'
      },
      {
        type: 'OBSERVATION',
        description: 'Confundir el desarrollo esperado de yemas laterales liberadas de la dominancia apical con un "rebrote de emergencia" o una señal de estrés — es la respuesta fisiológica prevista, no una anomalía.'
      }
    ],
    environmentContext: [
      'La disponibilidad de luz para las nuevas ramas laterales que se desarrollan tras una poda depende del ambiente: en un espacio protegido con iluminación distribuida de forma más uniforme, esas ramas nuevas pueden acceder a más luz que en un ambiente donde la luz llega predominantemente desde un punto (el sol, en exterior, con su propio recorrido diario). Esta entrada no evalúa ese balance para ningún contexto específico.',
      'No se fija ningún momento del ciclo como "el momento correcto" para podar — depende de la etapa de desarrollo de la planta (ver "Cultivo en secuencia") y de variables que esta entrada no cuantifica.'
    ],
    tags: ['cultivo', 'poda'],
    relatedEntryIds: ['cultivo-en-secuencia', 'fertilizacion-y-nutricion'],
    sourceIds: [
      'cientifica-chavalina-2026-hemp-topping-morphology',
      'academica-beveridge-2023-apical-dominance-review'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-13',
    metadata: {
      seoTitle: 'Poda — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es la dominancia apical, qué hace la poda sobre ese mecanismo, y qué muestra la evidencia científica directa de Cannabis sativa sobre sus efectos.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'fertilizacion-y-nutricion',
    slug: 'fertilizacion-y-nutricion',
    categoryId: 'fertilizacion',
    title: 'Fertilización y nutrición',
    summary: 'Cada nutriente cumple una función específica y se mueve de forma distinta dentro de la planta — esa movilidad, no una tabla de dosis, es lo que explica dónde aparece primero un síntoma de carencia.',
    intro: 'Esta entrada no da ninguna tabla de dosificación: describe cómo funciona la nutrición mineral en general —qué son los nutrientes esenciales, por qué se agrupan en macro y micronutrientes, cómo se relaciona su movilidad dentro de la planta con dónde aparece un síntoma, y por qué carencia y exceso pueden producirse por mecanismos opuestos pero limitar el crecimiento igual. Ninguna cifra de esta entrada es específica de Cannabis sativa: es fisiología vegetal general, la misma que describen las guías de cátedra ya citadas en otras entradas de este atlas.',
    sections: [
      {
        id: 'que-es-un-nutriente-esencial',
        title: 'Qué es un nutriente esencial',
        paragraphs: [
          'Un elemento se considera esencial cuando su ausencia impide que la planta complete su ciclo de vida normal y esa función no puede ser reemplazada por ningún otro elemento. Esto se estableció experimentalmente comparando plantas cultivadas en soluciones nutritivas completas contra las mismas plantas con un elemento puntual suprimido — un método que sigue siendo la base de cómo se identifica la esencialidad de un nutriente.',
          'Los nutrientes esenciales se agrupan en macronutrientes y micronutrientes según la concentración que la planta necesita, no según su importancia relativa: un micronutriente en concentración insuficiente limita el crecimiento tanto como un macronutriente insuficiente — la diferencia es cuánto de cada uno se necesita, no cuán esencial es.'
        ]
      },
      {
        id: 'movilidad-y-donde-aparece-el-sintoma',
        title: 'Movilidad dentro de la planta: por qué el síntoma aparece donde aparece',
        paragraphs: [
          'No todos los nutrientes se mueven igual una vez que están dentro de la planta. Algunos —el nitrógeno y el fósforo, por ejemplo— tienen alta movilidad interna: cuando escasean, la planta puede retirarlos de las hojas más viejas para redirigirlos hacia el crecimiento nuevo. Por eso, la deficiencia de estos nutrientes se manifiesta primero como cambios (por ejemplo, amarillamiento) en las hojas más viejas, mientras las hojas jóvenes se mantienen con mejor aspecto por más tiempo.',
          'Otros nutrientes tienen movilidad baja. El azufre, por ejemplo, normalmente no se redistribuye desde las hojas adultas hacia las jóvenes, así que su deficiencia —cuando ocurre— tiende a mostrarse de forma generalizada en las hojas jóvenes. El hierro es otro caso de baja movilidad: su carencia se expresa como clorosis (pérdida de verde) que aparece primero en las hojas jóvenes, no en las viejas.',
          'Esta relación —movilidad del nutriente y ubicación del primer síntoma visible— es el principio general más útil para orientar una lectura: preguntarse "¿el cambio aparece primero en las hojas viejas o en las jóvenes?" acota el campo de nutrientes posibles antes de nombrar uno en particular, siguiendo la misma lógica de "leer el patrón, no el punto" que ya describe la entrada "Lectura de señales y sanidad".'
        ]
      },
      {
        id: 'carencia-toxicidad-estres',
        title: 'Carencia, toxicidad y estrés ambiental: tres orígenes que pueden verse parecidos',
        paragraphs: [
          'La carencia (falta de un nutriente) y la toxicidad (exceso del mismo nutriente, o de otro) pueden limitar el crecimiento por mecanismos opuestos, pero producir una apariencia externa igualmente empobrecida: una planta con poco crecimiento, hojas de aspecto alterado, sin que ese aspecto solo alcance para distinguir cuál de las dos situaciones está ocurriendo.',
          'A eso se suma que varios síntomas de origen nutricional —clorosis, necrosis en bordes o puntas, crecimiento reducido— también pueden originarse en un estrés puramente ambiental (agua, temperatura, luz) sin que ningún nutriente esté realmente desbalanceado, el mismo principio de "un síntoma no alcanza para diagnosticar" que ya describe "Lectura de señales y sanidad" para el origen biótico/abiótico en general.'
        ]
      },
      {
        id: 'suelo-planta-y-disponibilidad',
        title: 'La relación entre el sustrato/agua y la disponibilidad del nutriente',
        paragraphs: [
          'Que un nutriente esté presente en el sustrato no garantiza que la planta pueda absorberlo: su disponibilidad real depende de que esté disuelto en la solución del sustrato y de que la raíz pueda acceder a él —la misma relación agua-aire-raíz que describe "Sustrato, agua y drenaje" es la base física sobre la que ocurre también la absorción de nutrientes, no un sistema aparte.',
          'Por eso un síntoma de carencia visible no siempre significa que el nutriente falte en términos absolutos en el sustrato: puede significar que, en las condiciones actuales (agua, estructura del sustrato, otras variables), ese nutriente no está llegando a la raíz de forma disponible. Esta entrada no desarrolla esa relación en detalle —depende de demasiadas variables específicas de cada sustrato como para generalizar sin convertirlo en una receta.'
        ]
      }
    ],
    observations: [
      'Ver que las hojas más viejas de una planta amarillean mientras las jóvenes se mantienen verdes es una observación compatible con la carencia de un nutriente de alta movilidad (como el nitrógeno). Concluir de inmediato "le falta nitrógeno" sin considerar otras causas posibles con el mismo patrón es una interpretación apresurada — el patrón acota el campo de causas, no lo cierra.',
      'Que una hoja joven muestre clorosis con las venas todavía verdes es compatible con la carencia de un nutriente de baja movilidad (como el hierro) — es un patrón distinto del anterior, y confundir ambos patrones lleva a orientar la lectura hacia el nutriente equivocado.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Diferencias graduales de color o vigor entre hojas de distinta edad a lo largo del desarrollo normal de la planta, sin un patrón de avance claro ni repetición en todas las plantas del mismo lote.'
      },
      {
        level: 'ATTENTION',
        description: 'Un patrón de amarillamiento que respeta consistentemente "hojas viejas primero" o "hojas jóvenes primero" en varias plantas del mismo lote, sin relación con ningún cambio ambiental reciente, orienta hacia revisar la nutrición — sin que esto sea un diagnóstico cerrado sin revisar también el sustrato, el riego y el resto del ambiente.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Un cambio de color puntual y localizado, en una sola hoja, sin patrón de avance ni repetición, es exactamente el tipo de caso donde carencia nutricional, toxicidad y estrés ambiental siguen siendo igualmente posibles — no alcanza para orientar hacia ninguna de las tres.'
      }
    ],
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Nombrar un nutriente específico a partir de un síntoma aislado sin considerar el patrón de movilidad (dónde aparece primero el cambio) que es la pista más informativa disponible sin análisis de laboratorio.'
      },
      {
        type: 'OBSERVATION',
        description: 'Confundir un síntoma de toxicidad (exceso) con uno de carencia (falta) porque ambos pueden producir una apariencia externa similar de crecimiento reducido o alteración foliar.'
      },
      {
        type: 'CONTEXT',
        description: 'Aplicar un correctivo nutricional sin revisar primero si el sustrato y el riego están permitiendo que el nutriente esté realmente disponible para la raíz — un problema de disponibilidad se ve igual que una carencia real, pero requiere una solución distinta.'
      }
    ],
    environmentContext: [
      'La disponibilidad real de un nutriente para la raíz depende de condiciones que varían entre un ambiente protegido (más estable, más controlable) y uno exterior (sujeto a lluvia, temperatura y evaporación variables) — la misma distinción que ya hace "Sustrato, agua y drenaje" para el agua aplica también a los nutrientes disueltos en ella.',
      'Esta entrada no da una tabla de dosificación ni un calendario de fertilización para ningún contexto: describe la fisiología general de la nutrición mineral, no una receta aplicable sin considerar el sustrato, el agua y la etapa de desarrollo de cada planta en particular.'
    ],
    tags: ['cultivo', 'fertilización', 'nutrición'],
    relatedEntryIds: ['sustrato-y-drenaje', 'lectura-de-senales', 'poda'],
    sourceIds: [
      'academica-unne-nutricion-mineral-dabrio-2020',
      'academica-kirkby-romheld-2007-micronutrientes-fisiologia'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-13',
    metadata: {
      seoTitle: 'Fertilización y nutrición — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es un nutriente esencial, por qué su movilidad dentro de la planta determina dónde aparece un síntoma, y por qué carencia, toxicidad y estrés ambiental pueden verse parecidos.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'cosecha-y-maduracion',
    slug: 'cosecha-y-maduracion',
    categoryId: 'cosecha',
    title: 'Cosecha y maduración',
    summary: 'La maduración de la inflorescencia es un cambio gradual y observable, no un punto fijo — la cosecha cierra un proceso de lectura, no responde a una fecha.',
    intro: 'Hacia el final del desarrollo reproductivo, la inflorescencia atraviesa una serie de cambios visibles que, en conjunto, se leen como maduración. Esta entrada describe esos cambios desde un punto de vista botánico y observacional: qué cambia y cómo se lee, no cuándo "conviene" cosechar ni con qué fin.',
    sections: [
      {
        id: 'maduracion-no-es-un-punto-fijo',
        title: 'Maduración, no un punto fijo',
        paragraphs: [
          'La maduración de la inflorescencia es un proceso gradual, no un evento que ocurre de un día para el otro. Distintas estructuras de la misma planta —e incluso de la misma inflorescencia— pueden avanzar a ritmos ligeramente distintos, lo que hace que "está madura" sea, en rigor, una simplificación de un proceso continuo.'
        ]
      },
      {
        id: 'que-cambia-en-la-inflorescencia',
        title: 'Qué cambia en la inflorescencia',
        paragraphs: [
          'Uno de los cambios mejor documentados ocurre en los tricomas glandulares —estructuras microscópicas presentes en la superficie de la inflorescencia—: a medida que avanza la maduración, crecen en longitud de tallo y en diámetro de cabezuela, y cambian de color de forma progresiva: de transparentes a un aspecto lechoso, y finalmente a tonos ámbar/marrón.',
          'Ese cambio de color no es un interruptor binario: es un gradiente continuo, y distintas zonas de la misma inflorescencia pueden estar en puntos distintos de ese gradiente al mismo tiempo.'
        ]
      },
      {
        id: 'gradiente-dentro-de-la-planta',
        title: 'El gradiente no es solo dentro de una inflorescencia',
        paragraphs: [
          'La heterogeneidad de maduración no se limita a una sola flor: un estudio sobre cannabis medicinal encontró un gradiente espacial natural de cannabinoides según la altura de la planta —el THC, junto con CBD, CBG, THCV y CBC, tiende a concentrarse más en las regiones superiores de la planta, mientras que CBN y CBT se concentran más en las flores medias e inferiores—. El mismo trabajo encontró que suplementar con ácido húmico reduce esa variabilidad espacial natural, aunque a costa de una concentración menor de cannabinoides en las regiones superiores.',
          'Esto es coherente con la idea de esta entrada de que "toda la planta está madura" es una simplificación: la posición de una inflorescencia dentro del dosel —no solo el tiempo transcurrido— es una variable real detrás de por qué distintas zonas de una misma planta pueden leerse en puntos distintos del proceso.'
        ]
      },
      {
        id: 'senal-visual-vs-conclusion',
        title: 'Señal visual vs. conclusión',
        paragraphs: [
          'Ver que los tricomas cambiaron de color es una observación. Decidir qué punto exacto de ese gradiente cuenta como "el momento" ya no es una observación sino un criterio —y distintos criterios pueden llevar a leer distintos momentos del mismo proceso como significativos, según qué se priorice observar—. Esta entrada describe el proceso, no fija un criterio único.'
        ]
      }
    ],
    observations: [
      'Notar que el color de los tricomas cambió en una parte de la inflorescencia es una observación directa. Concluir que "toda la planta está madura" a partir de esa sola zona es una interpretación que puede no corresponder al resto de la planta.',
      'El desarrollo de los tricomas —crecimiento en tamaño y cambio de color— es un dato observable en sí mismo; lo que ese dato "significa" en términos de decisión es una lectura aparte, que depende de qué se está evaluando.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Cambio de color gradual y progresivo en los tricomas (de transparente a lechoso y luego a tonos más oscuros), acompañado de crecimiento en tamaño — un proceso continuo, no un cambio de un día para el otro.'
      },
      {
        level: 'ATTENTION',
        description: 'Una maduración marcadamente desigual dentro de la misma inflorescencia —zonas claramente avanzadas junto a zonas claramente sin cambios— amerita observar si hay una causa asociada, como diferencias de exposición a la luz dentro de la misma planta.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Un cambio de color temprano y aislado en un solo punto pequeño de una inflorescencia, sin un patrón más amplio, no alcanza por sí solo para leer el estado del resto de la planta.'
      }
    ],
    commonMistakes: [
      {
        type: 'OBSERVATION',
        description: 'Evaluar la maduración mirando un único punto de la planta en vez de comparar varias zonas de la misma inflorescencia y de distintas inflorescencias.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Tratar la maduración como un estado binario ("madura" / "no madura") en vez de como un gradiente continuo, que es como efectivamente se describe en la bibliografía sobre el tema.'
      },
      {
        type: 'CONTEXT',
        description: 'Ignorar que la exposición a la luz dentro de la misma planta no es uniforme, lo que hace esperable —no anómala— cierta disparidad de maduración entre distintas zonas de una misma planta.'
      }
    ],
    environmentContext: [
      'El ritmo de este proceso varía según el genotipo de la planta y las condiciones ambientales (luz, temperatura) a las que estuvo expuesta durante su desarrollo — no es un plazo fijo aplicable por igual a cualquier planta o cualquier ambiente.',
      'Esta entrada no fija una duración ni una fecha de cosecha: describe el proceso observable, coherente con el resto del atlas, que no convierte información botánica general en un calendario prescriptivo.'
    ],
    tags: ['cosecha', 'maduración'],
    relatedEntryIds: ['cultivo-en-secuencia', 'marco-editorial', 'poscosecha', 'quimica-de-la-maduracion'],
    sourceIds: ['cientifica-hesami-2023-cannabis-life-cycle', 'cientifica-bernstein-2019-cannabis-npk-cannabinoide-canopia'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-15',
    metadata: {
      seoTitle: 'Cosecha y maduración — Atlas del Cultivo Argentino',
      seoDescription: 'Qué cambia visiblemente en la inflorescencia durante la maduración, por qué es un proceso gradual y no un punto fijo, y qué errores de lectura son frecuentes.',
      canonical: null,
      ogImage: null
    }
  },

  // --- Cierre de P2-5 (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md, 2026-09-16) — hueco #3 de
  // 62_LOOP_08_MAPA_MUNDIAL.md §4/§9: "Cosecha y maduración" describe el cambio de color de los
  // tricomas pero no su causa química ni los tipos de tricoma; "Genética y tipos: sativa, indica,
  // ruderalis" agregó una
  // sección de quimiotipo (I/II/III) que explícitamente declara fuera de su alcance "la biosíntesis
  // completa... ni el detalle de los tricomas glandulares". Esta entrada cubre exactamente eso, sin
  // duplicar ninguna de las dos.
  {
    id: 'quimica-de-la-maduracion',
    slug: 'quimica-de-la-maduracion',
    categoryId: 'cosecha',
    title: 'Química de la maduración: tricomas y cannabinoides',
    summary: 'El cambio de color de los tricomas que describe "Cosecha y maduración" tiene detrás una estructura (tres tipos de tricoma glandular, con distinto contenido de cannabinoides) y una reacción química (una ruta compartida que convierte un mismo precursor en distintos cannabinoides) — ninguna de las dos alcanza a simple vista.',
    intro: '"Cosecha y maduración" describe qué se ve: el cambio gradual de color de los tricomas. "Genética y tipos: sativa, indica, ruderalis" describe el quimiotipo: qué cannabinoide predomina en una planta, y aclara explícitamente que no desarrolla la biosíntesis ni los tipos de tricoma por exceder el alcance de una entrada sobre clasificación. Esta entrada llena ese espacio: qué es un tricoma glandular, qué tipos existen, y qué ruta química ocurre dentro de ellos para producir los cannabinoides.',
    sections: [
      {
        id: 'tres-tipos-de-tricoma',
        title: 'Tres tipos de tricoma glandular',
        paragraphs: [
          'Un tricoma es una estructura microscópica que se proyecta desde la superficie de la planta. Cannabis sativa desarrolla varios tipos, pero los glandulares —los que producen y almacenan cannabinoides y terpenos— se agrupan en tres formas reconocibles: el tricoma bulboso (una cabeza pequeña sobre un tallo corto) y el capitado-sésil (una cabeza globular más grande, apoyada directamente sobre la superficie, sin tallo visible) aparecen sobre todo en las hojas durante el desarrollo vegetativo; el capitado-pedunculado (una cabeza globular grande sobre un tallo multicelular más alto) se asocia principalmente a la inflorescencia y prolifera durante la floración.',
          'Un estudio que analizó el desarrollo y la composición de estos tres tipos a lo largo de la maduración de la inflorescencia encontró diferencias reales entre ellos: el tricoma capitado-pedunculado es el principal reservorio de cannabinoides y terpenos, mientras que el capitado-sésil presenta niveles notoriamente más bajos. Es decir, no todo tricoma glandular contribuye por igual — la forma del tricoma es, en sí misma, un dato relevante sobre cuánto cannabinoide puede estar produciendo.'
        ]
      },
      {
        id: 'de-cbga-a-thca-cbda-cbca',
        title: 'De CBGA a THCA, CBDA y CBCA: la ruta compartida',
        paragraphs: [
          'Dentro del tricoma glandular, la biosíntesis de cannabinoides sigue una ruta con un punto de partida común. Primero se forma el ácido olivetólico a partir de una condensación de precursores metabólicos; después, una prenilación (la inserción de un grupo químico proveniente de la vía de los isoprenoides) lo convierte en ácido cannabigerólico (CBGA) — el precursor compartido de los principales cannabinoides ácidos.',
          'A partir de ahí, tres enzimas distintas —la THCA-sintasa, la CBDA-sintasa y la CBCA-sintasa— compiten por el mismo CBGA y lo convierten, cada una, en un cannabinoide distinto: ácido tetrahidrocannabinólico (THCA), ácido cannabidiólico (CBDA) o ácido cannabicroménico (CBCA). Cuál de esas tres enzimas predomina en una planta determinada es, precisamente, lo que "Genética y tipos: sativa, indica, ruderalis" describe como quimiotipo (I, II o III) — una variación genética que determina qué enzima está mayoritariamente presente, no un efecto de la maduración en sí.'
        ]
      },
      {
        id: 'que-no-reemplaza-esta-entrada',
        title: 'Qué no reemplaza esta entrada',
        paragraphs: [
          'Conocer esta ruta química no da un atajo para "calcular" el contenido de cannabinoides de una planta a simple vista: la proporción entre cannabinoides (el quimiotipo) queda determinada genéticamente desde etapas tempranas del desarrollo, mientras que lo que cambia visiblemente durante la maduración —el color y tamaño del tricoma, que describe "Cosecha y maduración"— refleja la actividad y el desarrollo estructural del tricoma, no un cambio en qué cannabinoide predomina. Son dos preguntas distintas: cuál cannabinoide predomina (genético, quimiotipo) y cuánto se desarrolló el tricoma que lo produce (estructural, maduración). Esta entrada no propone un método visual para estimar concentración exacta de cannabinoides — eso requiere análisis de laboratorio.'
        ]
      }
    ],
    observations: [
      'Distinguir a simple vista un tricoma capitado-pedunculado (sobre la inflorescencia) de uno capitado-sésil (sobre una hoja) es, con magnificación adecuada, una observación directa de forma y ubicación. Concluir de esa sola observación una concentración exacta de cannabinoides no lo es — eso es una medición de laboratorio, no una lectura visual.',
      'Que dos plantas tengan el mismo quimiotipo (misma proporción THCA/CBDA) no implica que tengan la misma cantidad total de cannabinoides ni el mismo grado de desarrollo de tricomas — son dos variables independientes entre sí.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Presencia de tricomas bulbosos y capitado-sésiles sobre hojas desde etapas vegetativas tempranas, y proliferación creciente de tricomas capitado-pedunculados sobre la inflorescencia a medida que avanza la floración.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Diferenciar a ojo desnudo (sin magnificación) un tricoma capitado-sésil de uno capitado-pedunculado es poco confiable por su tamaño microscópico — la distinción documentada en la literatura se hizo con microscopía, no a simple vista.'
      }
    ],
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Confundir el quimiotipo (qué cannabinoide predomina, determinado genéticamente) con la maduración (cuánto se desarrolló el tricoma que lo produce, un proceso estructural) — son dos fenómenos independientes que esta entrada separa a propósito.'
      },
      {
        type: 'CONTEXT',
        description: 'Asumir que todos los tricomas glandulares de una planta contienen la misma cantidad de cannabinoides, cuando la evidencia documenta diferencias reales entre tipos (el capitado-pedunculado como principal reservorio, el capitado-sésil con niveles notoriamente más bajos).'
      },
      {
        type: 'OBSERVATION',
        description: 'Tratar una observación a ojo desnudo, sin magnificación, como si tuviera la misma precisión que la microscopía usada en los estudios que describen estos tres tipos de tricoma.'
      }
    ],
    environmentContext: null,
    tags: ['cosecha', 'maduración', 'genética'],
    relatedEntryIds: ['cosecha-y-maduracion', 'genetica-y-tipos'],
    sourceIds: [
      'cientifica-walsh-2021-minor-cannabinoids-biosynthesis',
      'cientifica-livingston-2019-trichome-morphology-maturation',
      'cientifica-vergara-2016-cannabis-quimiotipo-evolucion-cultivo'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-16',
    metadata: {
      seoTitle: 'Química de la maduración: tricomas y cannabinoides — Atlas del Cultivo Argentino',
      seoDescription: 'Los tres tipos de tricoma glandular de Cannabis sativa y la ruta de biosíntesis que convierte CBGA en THCA, CBDA y CBCA dentro de ellos.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'marco-editorial',
    slug: 'marco-editorial',
    categoryId: 'marco-legal',
    title: 'Marco editorial y responsable',
    summary: 'El atlas es información, no asesoramiento: describe un marco general y públicamente verificable, nunca una recomendación aplicable al caso particular de una persona.',
    intro: 'Antes de leer cualquier contenido de este atlas conviene tener clara su naturaleza: es un proyecto informativo y editorial sobre cultivo, geografía y ambiente. No ofrece asesoramiento legal ni médico individual, no es una guía de consumo, y no reemplaza la consulta a una fuente oficial actualizada o a un profesional cuando la situación de una persona lo amerita.',
    sections: [
      {
        id: 'que-es-y-que-no-es',
        title: 'Qué es el atlas y qué no es',
        paragraphs: [
          'El atlas describe procesos botánicos, ambientales y geográficos de forma general y educativa. No es una guía de consumo, no explica extracción ni preparación de ningún tipo, y no incluye dosificación ni recomendaciones médicas — esos temas quedan explícitamente fuera de su alcance.',
          'Tampoco es un servicio comercial: no vende productos, no recomienda marcas y no enlaza a puntos de venta. Su propósito es exclusivamente informativo.'
        ]
      },
      {
        id: 'informacion-vs-recomendacion',
        title: 'Información vs. recomendación',
        paragraphs: [
          'Hay una diferencia entre describir cómo funciona un proceso en general y recomendar qué hacer en un caso particular. El atlas se ubica del lado de la descripción: explica qué se sabe sobre un fenómeno (por ejemplo, cómo germina una semilla o qué indica un cambio de color en una inflorescencia), sin indicarle a una persona qué acción tomar con su propia planta o su propia situación.',
          'Esta distinción también aplica a las cuestiones legales: el atlas puede describir qué dice una norma vigente en Argentina, pero no puede decirle a una persona si su situación particular está alcanzada por ella —eso requiere asesoramiento profesional específico—.'
        ]
      },
      {
        id: 'contexto-legal-argentina',
        title: 'Contexto legal en Argentina (resumen no vinculante)',
        paragraphs: [
          'Al momento de esta revisión, Argentina cuenta con un marco (Ley 27.350 y su reglamentación) que crea el Programa de Cannabis y su registro asociado (REPROCANN), habilitando modalidades de autocultivo, cultivo solidario (tercero cultivador) o inscripción a través de una organización autorizada, con fines terapéuticos/medicinales. El Decreto 883/2020 fue el que reglamentó por primera vez ese autocultivo registrado, derogando la reglamentación anterior (Decreto 738/2017).',
          'La Resolución 1780/2025 del Ministerio de Salud (mayo de 2025) reordenó ese registro y endureció varios requisitos: exige presentar informes médicos y cromatográficos, reordena las categorías de usuario/cultivador e incorpora a las personas jurídicas que desarrollan proyectos de investigación. Los inscriptos previos tuvieron un plazo de adecuación a los nuevos requisitos. Esta entrada no detalla cada requisito porque cambian con el tiempo — para el estado exacto de una inscripción particular, la fuente vale más que este resumen.',
          'Por otro lado, la Ley 23.737 tipifica penalmente el cultivo de plantas destinado a la producción de estupefacientes, con una figura atenuada cuando la cantidad y las circunstancias muestran de manera inequívoca que el destino es el consumo personal. La base constitucional que ampara la esfera de decisión personal en este tipo de situaciones, cuando no hay daño a terceros, proviene del fallo "Arriola" de la Corte Suprema de Justicia de la Nación (2009).',
          'Este resumen es general, no vinculante y puede quedar desactualizado: el marco regulatorio argentino sobre este tema ha tenido cambios y anuncios de cambios en años recientes. No debe tomarse como la última palabra sobre la situación legal de nadie en particular — para eso hace falta asesoramiento profesional actualizado.'
        ]
      },
      {
        id: 'canamo-industrial-y-ariccame',
        title: 'Cáñamo industrial: un marco distinto al del uso medicinal/personal',
        paragraphs: [
          'Todo lo descripto arriba (Ley 27.350, REPROCANN) regula el uso medicinal y el autocultivo personal. El cáñamo industrial —plantas de Cannabis sativa con no más de 1 % de THC en peso seco, destinadas a fibra, semilla u otros usos no psicoactivos— tiene desde 2022 un marco aparte: la Ley 27.669 lo excluye explícitamente del alcance penal de la Ley 23.737 y crea la Agencia Regulatoria de la Industria del Cáñamo y del Cannabis Medicinal (ARICCAME), reglamentada por el Decreto 405/2023, con competencia para autorizar y fiscalizar el cultivo, la producción, la comercialización y la importación/exportación de semillas y plantas con fines industriales o medicinales a escala comercial.',
          'ARICCAME estuvo intervenida desde septiembre de 2024 (Decreto 833/2024) por lo que la propia norma describe como "inadecuada operatividad" del organismo, con el objetivo declarado de reordenar su funcionamiento; esa intervención fue prorrogada en 2025. Quien esté evaluando una licencia industrial o de propagación debería confirmar el estado institucional vigente de la Agencia directamente, no asumir que la situación descripta acá sigue igual.',
          'Esta entrada no explica cómo tramitar una licencia ni qué categoría de registro corresponde a cada actor (productor de semillas, vivero, proyecto industrial): son detalles operativos que cambian con la reglamentación y exceden el propósito informativo general de esta entrada.'
        ]
      },
      {
        id: 'limites-del-contenido',
        title: 'Límites del contenido',
        paragraphs: [
          'El atlas no ofrece asesoramiento jurídico individual, no reemplaza a un profesional del derecho ni de la salud, y no debe usarse como única fuente para tomar una decisión personal con consecuencias legales o médicas.',
          'Tampoco funciona como un canal de promoción o publicidad: la normativa argentina vigente (Ley 27.669) restringe específicamente la publicidad y promoción de cannabis psicoactivo, algo que este proyecto no hace bajo ninguna circunstancia —no porque la norma lo exija de forma ambigua para el contenido puramente educativo, sino porque el propio atlas define no vender ni promocionar nada como una regla propia, independiente de esa discusión—.',
          'Sobre los datos de las personas que usan el atlas: el proyecto sigue el principio de minimización de datos personales alineado con la Ley 25.326, pidiendo solo lo estrictamente necesario para las funciones que lo requieren.'
        ]
      }
    ],
    observations: [
      'Leer el texto de una norma (lo que dice) es una cosa verificable, con una fuente pública citable. Leer cómo se aplicaría esa norma a la situación particular de una persona es otra cosa completamente distinta, que requiere contexto individual que este atlas no tiene ni pide —por diseño, para no recolectar datos personales innecesarios—.',
      'El atlas puede equivocarse por desactualización, no solo por error: una norma puede cambiar después de la fecha de última revisión de esta entrada. Por eso esa fecha se muestra siempre, y no se reemplaza por un texto que suene definitivo.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Tomar una descripción general del marco legal como si fuera una respuesta aplicable a un caso personal específico — es exactamente la distinción que esta entrada pide no perder de vista.'
      },
      {
        type: 'CONTEXT',
        description: 'Asumir que el marco descripto sigue vigente exactamente así sin revisar la fecha de última revisión de esta entrada, dado que hay cambios regulatorios anunciados o en curso sobre este tema en Argentina.'
      },
      {
        type: 'OTHER',
        description: 'Citar esta entrada como si fuera el texto legal completo, en vez de un resumen editorial que remite a las fuentes oficiales citadas — la fuente primaria siempre es el texto normativo, no este resumen.'
      }
    ],
    environmentContext: null,
    tags: ['marco', 'legal', 'contexto'],
    relatedEntryIds: ['lectura-de-senales', 'germinacion'],
    // Único caso de esta migración con fuentes de contenido reales asociadas desde Fase 7A: el
    // tema de la entrada (marco legal/responsabilidad) coincide exactamente con fuentes ya
    // registradas y verificadas en 19_SOURCE_REGISTRY.md — no se inventó ninguna. En 7B2 se
    // sumaron dos fuentes ya verificadas y también pertinentes (publicidad y datos personales).
    // En Loop 8B (2026-09-15) se sumó el ángulo industrial/cáñamo (Ley 27.669 operativa,
    // Decreto 405/2023, ARICCAME, Decreto 883/2020, Decreto 833/2024) — las 5 normas se
    // verificaron por búsqueda directa contra boletinoficial.gob.ar antes de citarlas.
    sourceIds: [
      'ley-27350-reprocann', 'ley-23737-art5', 'fallo-arriola-csjn-2009', 'ley-27669-publicidad', 'ley-25326-datos-personales',
      'ley-27669-marco-industrial', 'decreto-405-2023-reglamentario-27669', 'decreto-883-2020-reprocann', 'decreto-833-2024-intervencion-ariccame'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-15',
    metadata: {
      seoTitle: 'Marco editorial y responsable — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es y qué no es el atlas, la diferencia entre información y recomendación, y un resumen no vinculante del contexto legal argentino (REPROCANN, cáñamo industrial y ARICCAME) con fuentes oficiales.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'historia-de-la-planta',
    slug: 'historia-de-la-planta',
    categoryId: 'historia',
    title: 'Historia de la planta',
    summary: 'De un pasto silvestre euroasiático a un cultivo intercontinental: una línea de tiempo que separa lo que hay evidencia de probar, de lo que todavía es hipótesis.',
    intro: 'Contar la historia de Cannabis sativa exige la misma disciplina que el resto del atlas aplica a la observación de una planta viva: distinguir qué es evidencia directa (un resto arqueológico fechado, un documento de archivo), qué es interpretación razonable sobre esa evidencia, y qué sigue siendo hipótesis abierta. Esta entrada recorre esa historia como una línea de tiempo — desde el origen de la especie hasta las primeras huellas documentales de su cultivo en el territorio que hoy es Argentina — sin convertir ningún tramo en un relato más cerrado del que la evidencia permite.',
    sections: [
      {
        id: 'origen-y-domesticacion',
        title: 'Origen y domesticación',
        paragraphs: [
          'Los estudios genómicos más recientes (secuenciación de 110 genomas de variedades de todo el mundo) estiman que Cannabis sativa comenzó a domesticarse hace unos 12.000 años en el este de Asia: los cultivares actuales de fibra y de uso psicoactivo derivan de un mismo fondo genético ancestral, representado hoy por poblaciones silvestres y variedades locales de China. Es una fecha estimada por métodos genéticos —no una medición directa sobre un resto físico— y el origen geográfico exacto sigue en discusión académica.',
          'La evidencia física más concreta es más tardía: fitolitos (microestructuras vegetales que se conservan mejor que una semilla) hallados en Shandong, norte de China, ubican a la planta dentro de un conjunto de cultivos manejados entre hace 4.500 y 3.400 años. En el sitio de la Edad del Bronce de Haimenkou (Yunnan, suroeste de China) se recuperaron más de 800 semillas (aquenios) de Cannabis fechadas entre 1650 y 400 a.C. — el registro arqueobotánico más directo de que la planta ya se manejaba y probablemente se propagaba de forma activa por semilla.'
        ]
      },
      {
        id: 'expansion-hacia-europa',
        title: 'Expansión hacia Europa',
        paragraphs: [
          'Cannabis es una planta nativa de Europa desde mucho antes de cualquier cultivo humano: hay polen de la especie en el oeste de Europa desde el Pleistoceno tardío (hace 18.500-15.000 años), en un momento en que la planta crecía silvestre, sin ninguna relación con el ser humano todavía. Esta distinción —presencia silvestre versus cultivo— es central para no confundir "la planta ya estaba ahí" con "la gente ya la cultivaba".',
          'La evidencia de cultivo (no solo presencia) en Europa aparece recién en la Edad del Cobre/Bronce, en el sudeste del continente. Un síntesis reciente de estudios de polen fósil propone que los escitas —una cultura esteparia de la Edad del Hierro— introdujeron el cultivo de cáñamo a pueblos celtas, eslavos y fino-úgricos: 28 estudios de polen en territorio celta muestran señales de cultivo de cáñamo que aparecen recién después del año 550 a.C., coincidiendo con el contacto con los escitas. Es una síntesis probabilística sobre muchos sitios, no un único hallazgo puntual.'
        ]
      },
      {
        id: 'llegada-a-america',
        title: 'Llegada a América: dos historias distintas',
        paragraphs: [
          'La llegada de la planta a América no fue un único evento — fueron procesos distintos en el norte y en el sur del continente, con actores y cronologías propias.',
          'En América del Norte, el cáñamo llegó con los colonos ingleses a Virginia: en Jamestown se cultivó cáñamo traído desde Inglaterra para cuerdas, velas y tela, y ya en 1616 el colono John Rolfe podía afirmar que el cáñamo cultivado ahí no era peor que el de Inglaterra u Holanda. Varias colonias inglesas llegaron a estar obligadas por ley a cultivarlo, como insumo para la marina.',
          'En América del Sur, el proceso fue más temprano y más disperso de lo que suele repetirse: las primeras remisiones documentadas de semilla de cáñamo hacia "las Indias" datan de 1513-1520 (dos arrobas de cañamones y cuatro de lino en 1513, según el Archivo General de Indias), y llegaron primero a asentamientos en Mesoamérica, no a Chile. La Real Cédula de Carlos V de 1545 —la fecha que la mayoría de los sitios de divulgación repiten como "el momento en que el cáñamo llegó a Chile"— en realidad fue una orden general dirigida a "las Indias" en su conjunto, no una medida específica para Chile; para esa fecha ya se habían hecho intentos de siembra en el Caribe, Mesoamérica, Ecuador, Perú, Venezuela y el propio Río de la Plata. Lo que sí es cierto es que Chile terminó siendo, hacia 1577-1605, la única región donde el cultivo se volvió rentable y sostenido a gran escala (valles de Quillota y La Ligua) — probablemente por tener un clima mediterráneo similar al de origen de la semilla, no por haber sido el primer lugar de siembra.'
        ]
      },
      {
        id: 'rio-de-la-plata-y-tucuman',
        title: 'El Río de la Plata y Tucumán: intentos coloniales, sin evidencia de éxito',
        paragraphs: [
          'Documentos primarios del Archivo General de Indias muestran que la Corona española no ignoró la región que hoy es Argentina: una real cédula de 1619 se dirigió específicamente al gobernador del Río de la Plata, y otra de 1626 se envió a los gobernadores del Río de la Plata, Cartagena, Tucumán y Paraguay, entre otros, instruyendo fomentar el cultivo de cáñamo en sus jurisdicciones — casi 180 años antes de que Manuel Belgrano escribiera sobre el mismo tema.',
          'No hay, en la fuente consultada para esta entrada, evidencia de que esas órdenes se hayan traducido en un cultivo exitoso y sostenido en el Río de la Plata o Tucumán: los propios funcionarios reales fueron confirmando, con el correr de las décadas, que el cáñamo no podía cultivarse de forma rentable en ninguna jurisdicción americana salvo Chile. Lo que sí queda documentado es un vínculo económico indirecto: hacia 1644-1648, la escasez de mano de obra que limitaba ampliar los cultivos chilenos se atribuye, en los propios documentos de la época, en parte al cierre del puerto de Buenos Aires — el Río de la Plata aparece conectado a la cadena de suministro del cáñamo colonial como nudo logístico, no como zona de cultivo.'
        ]
      },
      {
        id: 'belgrano-y-el-canamo',
        title: 'Belgrano y el cáñamo: qué escribió realmente',
        paragraphs: [
          'La frase que suele repetirse —"Belgrano promovía la plantación de cannabis"— simplifica y distorsiona un episodio real pero distinto. El 9 de junio de 1797, como Secretario del Real Consulado de Comercio de Buenos Aires (cargo que ocupó entre 1794 y 1809), Manuel Belgrano presentó una memoria titulada "Utilidades que resultarán a esta Provincia y a la Península del cultivo del lino y del cáñamo" — un texto de política económica sobre dos cultivos de fibra textil e industrial (lino y cáñamo), pensado para sustituir importaciones y abastecer de cuerdas y telas a la Corona, no un texto sobre la planta en su sentido psicoactivo o medicinal moderno.',
          'Fue una entre unas quince memorias que Belgrano escribió para el Consulado sobre temas de agricultura, manufactura, comercio y crédito — parte de un programa más amplio de fomento económico, no una iniciativa aislada sobre esta planta en particular. Y, tal como pasó con los intentos coloniales de 150 años antes, la propuesta no prosperó: la iniciativa de cultivar lino y cáñamo a escala no encontró el apoyo gubernamental ni privado necesario para sostenerse.'
        ]
      },
      {
        id: 'siglo-xx-y-actualidad',
        title: 'Siglo XX y actualidad',
        paragraphs: [
          'Entre los intentos coloniales del siglo XVII y la actualidad, esta entrada no encontró, dentro de su alcance de investigación, una fuente primaria verificada que documente una plantación argentina exitosa y sostenida posterior a Belgrano — lo que hay son órdenes, memorias y proyectos de fomento, no evidencia confirmada de cultivo a escala. Se documenta esa ausencia en vez de rellenarla con una "primera plantación" que ninguna fuente consultada respalda.',
          'El marco legal y regulatorio moderno de Cannabis en Argentina —la Ley 23.737 (que tipifica el cultivo no autorizado), el fallo "Arriola" de la Corte Suprema (2009) y la Ley 27.350/REPROCANN (uso medicinal y autocultivo registrado)— ya está descripto con sus fuentes oficiales en la entrada "Marco editorial y responsable" de este atlas; esta entrada no repite ese contenido, solo señala la continuidad histórica hacia él.'
        ]
      }
    ],
    observations: [
      'Un fitolito fechado o un documento de archivo con su fecha y su institución de origen es evidencia directa. Que una fecha se repita en muchos sitios web sin ninguna cita no la vuelve más cierta — el caso de "1545, Chile" es exactamente ese patrón: una simplificación repetida durante un siglo que la propia investigación histórica reciente cuestiona con documentos primarios.',
      'Que la Corona española haya ordenado fomentar el cultivo de cáñamo en el Río de la Plata en 1619 y 1626 es un hecho documentado. Que ese cultivo se haya concretado ahí es, con la evidencia disponible, una afirmación que no se puede hacer — la ausencia de evidencia de éxito no es lo mismo que evidencia de fracaso, pero tampoco permite dar por hecho lo primero.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Confundir "primer envío de semilla documentado" con "primera plantación exitosa" — son dos afirmaciones distintas, y la evidencia disponible respalda mejor la primera que la segunda en la mayoría de los casos.'
      },
      {
        type: 'CONTEXT',
        description: 'Repetir la frase "Belgrano promovía el cultivo de cannabis" sin la aclaración de que su memoria de 1797 trataba sobre lino y cáñamo como insumo textil/naval, en el marco de una política general de fomento agrícola — no sobre la planta en el sentido en que hoy se la discute.'
      },
      {
        type: 'OTHER',
        description: 'Tratar una fecha ampliamente repetida en sitios de divulgación (como "1545, Quillota, Chile") como si fuera un hecho verificado, sin revisar si esa repetición proviene de una fuente primaria o de una simplificación heredada de un solo texto de principios del siglo XX.'
      }
    ],
    environmentContext: null,
    tags: ['historia', 'domesticación', 'argentina'],
    relatedEntryIds: ['genetica-y-tipos', 'germinacion', 'marco-editorial'],
    sourceIds: [
      'cientifica-ren-2021-cannabis-domestication-genomics',
      'cientifica-dalmartello-2023-haimenkou-cannabis-archaeobotany',
      'cientifica-liu-2026-shandong-cannabis-phytolith',
      'cientifica-mcpartland-2018-cannabis-europa-polen',
      'academica-diaz-ordonez-2017-cannabis-chile-colonial',
      'historica-belgrano-1797-memoria-lino-canamo'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-12',
    metadata: {
      seoTitle: 'Historia de la planta — Atlas del Cultivo Argentino',
      seoDescription: 'Origen, domesticación, llegada a Europa y a América, los intentos coloniales en el Río de la Plata y Tucumán, y qué escribió realmente Belgrano sobre el cáñamo.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'genetica-y-tipos',
    slug: 'genetica-y-tipos',
    categoryId: 'genetica-tipos',
    title: 'Genética y tipos: sativa, indica, ruderalis',
    summary: '"Sativa", "indica" y "ruderalis" nacieron como nombres de especies propuestos por distintos botánicos en siglos distintos — no como categorías climáticas ni como las variedades comerciales que hoy llevan esos nombres.',
    intro: 'Pocas etiquetas se usan con tanta seguridad y tan poca precisión como "sativa" e "indica". Esta entrada cuenta de dónde vienen esos nombres, por qué la clasificación en tres especies está discutida por la propia botánica moderna, y qué categorías tienen hoy más utilidad real para entender cómo responde la planta al ambiente — sin convertir ningún nombre histórico en una regla de adaptación climática.',
    sections: [
      {
        id: 'la-clasificacion-original',
        title: 'La clasificación original: tres botánicos, tres criterios distintos',
        paragraphs: [
          'Carl Linnaeus describió una única especie, Cannabis sativa, en su obra fundacional Species Plantarum (1753) — el punto de partida de la nomenclatura botánica moderna. En ese momento no existía ninguna otra especie de Cannabis reconocida.',
          'En 1785, Jean-Baptiste Lamarck propuso una segunda especie, Cannabis indica, para diferenciar plantas cultivadas en Occidente (que él seguía llamando C. sativa) de poblaciones silvestres que había observado en India — basándose en diferencias morfológicas (altura, tipo de tallo, forma de las hojas), no en ninguna diferencia de clima ni de efecto. Es un dato importante: la distinción original de Lamarck fue morfológica y geográfica, no climática.',
          'En 1924, el botánico ruso D. E. Janischevsky describió una tercera forma, Cannabis ruderalis, a partir de poblaciones silvestres y ruderales (que crecen en terrenos alterados, al margen de caminos y campos) del sur de Rusia y Asia Central — plantas más pequeñas, de ciclo corto, adaptadas a un clima muy distinto del de India o de Europa occidental.'
        ]
      },
      {
        id: 'una-clasificacion-discutida',
        title: 'Por qué esta clasificación está discutida hoy',
        paragraphs: [
          'La botánica moderna no da por cerrada esta discusión. Buena parte de los taxónomos actuales tratan a Cannabis como un género de una sola especie variable (monoespecífico) o como una especie con múltiples formas (polimórfica), en vez de como tres especies separadas — la pregunta de si "indica" merece o no el rango de especie distinta sigue abierta en la literatura científica.',
          'Más importante para este atlas: los nombres "sativa" e "indica" que usan hoy cultivadores, semillerías y dispensarios para describir variedades comerciales no tienen validez taxonómica — no corresponden a un registro botánico formal, sino a una clasificación vernácula construida por la industria, muchas veces sin relación clara con la clasificación original de Lamarck. Un cultivar comercial llamado "sativa" no es necesariamente más parecido a la C. sativa de Linnaeus que uno llamado "indica".'
        ]
      },
      {
        id: 'fotoperiodo-autofloracion-y-lo-que-si-es-util',
        title: 'Fotoperiódica, autofloreciente: categorías más útiles que "sativa/indica"',
        paragraphs: [
          'Para entender cómo una planta responde al ambiente, la propia ciencia moderna del cannabis usa categorías distintas de "sativa/indica" — y son las que este atlas prioriza. La más relevante es la respuesta al fotoperiodo (ver "Luz como señal temporal"): la mayoría de las variedades de Cannabis son fotoperiódicas, es decir que necesitan que el período de oscuridad se alargue lo suficiente para pasar a floración — el mismo mecanismo que Garner y Allard describieron por primera vez en 1920, usando precisamente soja y tabaco como especies de estudio.',
          'Las variedades autoflorecientes son la excepción: florecen según su propia edad/madurez, sin necesidad de un cambio de fotoperiodo. Ese rasgo se asocia genéticamente a la herencia de Cannabis ruderalis (adaptada a veranos cortos donde esperar la señal de día corto sería tarde) y hoy se sabe que tiene una base genética identificable, no solo una observación de campo.',
          'Un trabajo reciente sobre el mecanismo fisiológico en Cannabis (no una analogía con otra especie) muestra que, bajo fotoperiodo de día corto, los niveles de una hormona vegetal (giberelina) bajan, lo que frena la elongación de la planta y forma la inflorescencia condensada característica de la floración — y que la señal necesita al menos tres días consecutivos de oscuridad prolongada para registrarse. Categorías como "fotoperiódica/autofloreciente" o "ciclo corto/medio/largo" describen esto con mucha más precisión que "sativa" o "indica" — y son las que la Ficha Provincial de este atlas usa cuando hay evidencia suficiente, nunca como una regla fija de adaptación climática.'
        ]
      },
      {
        id: 'quimiotipos',
        title: 'Quimiotipo: una clasificación química, no botánica ni comercial',
        paragraphs: [
          'Hay una tercera categoría, distinta de la taxonómica (sativa/indica/ruderalis) y de la fisiológica (fotoperiódica/autofloreciente), que responde a una pregunta diferente: qué cannabinoide predomina en la planta. El quimiotipo se define por la proporción entre ácido tetrahidrocannabinólico (THCA) y ácido cannabidiólico (CBDA) — a grandes rasgos, quimiotipo I (predominio de THCA), quimiotipo II (proporción mixta/intermedia) y quimiotipo III (predominio de CBDA), con quimiotipos IV y V para variantes con otros cannabinoides dominantes o con niveles muy bajos de ambos. A diferencia de "sativa/indica", el quimiotipo sí tiene una base química medible (cromatografía), no una apariencia o un nombre comercial.',
          'Un estudio que siguió plantas de los tres quimiotipos principales durante todo su crecimiento encontró que esa proporción THCA/CBDA queda definida desde etapas tempranas del desarrollo y se mantiene estable a lo largo del ciclo —no es algo que "aparezca" recién en la floración—, aunque las plantas de quimiotipo II y III tardaron más que las de quimiotipo I en alcanzar el pico de producción de THCA, CBDA y monoterpenos.',
          'Esta entrada no desarrolla la biosíntesis completa (la ruta que convierte el precursor CBGA en THCA, CBDA o CBCA mediante enzimas específicas) ni el detalle de los tricomas glandulares donde ocurre — son temas con entidad propia que exceden el alcance de una entrada sobre nomenclatura y clasificación.'
        ]
      }
    ],
    observations: [
      'Que Lamarck haya distinguido "indica" de "sativa" por su morfología es un hecho histórico documentado. Que "sativa" e "indica" describan hoy, de forma consistente, dos perfiles de efecto o de clima de origen es una creencia popular que la propia botánica no respalda con la misma certeza.',
      'Decir que una variedad es "autofloreciente" es una observación verificable (florece sin cambio de fotoperiodo). Decir que por eso "viene de un clima frío" es una interpretación que mezcla origen genético con recomendación de cultivo — la genética informa, no dicta, cómo se comporta una planta en un ambiente nuevo.',
      'Que una planta sea de "quimiotipo I" es una medición química verificable en laboratorio. Suponer que un cultivar vendido como "sativa" es necesariamente de un quimiotipo particular es una asociación sin base — nombre comercial y quimiotipo son dos clasificaciones independientes entre sí.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Presentar "sativa", "indica" y "ruderalis" como si fueran tres variedades modernas con efectos o climas de adaptación fijos, en vez de tres propuestas taxonómicas históricas hechas en siglos distintos con criterios distintos.'
      },
      {
        type: 'CONTEXT',
        description: 'Usar "sativa = clima cálido", "indica = clima frío" o "ruderalis = clima norteño" como reglas de adaptación — ninguna de las tres clasificaciones originales se basó en clima, y la ciencia genómica moderna no respalda esas equivalencias como reglas universales.'
      },
      {
        type: 'OBSERVATION',
        description: 'Confundir el nombre comercial de un cultivar ("sativa", "indica") con una clasificación botánica válida — el propio campo científico señala que esos nombres de uso vernáculo no tienen respaldo taxonómico formal.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Tratar "sativa/indica" y "quimiotipo I/II/III" como si fueran la misma clasificación con dos nombres distintos — una es vernácula y sin base taxonómica formal, la otra es una medición química verificable en laboratorio; no se corresponden entre sí de forma predecible.'
      }
    ],
    environmentContext: null,
    tags: ['historia', 'genética', 'taxonomía', 'fotoperiodo'],
    relatedEntryIds: ['historia-de-la-planta', 'luz-y-fotoperiodo', 'cosecha-y-maduracion', 'quimica-de-la-maduracion'],
    sourceIds: [
      'cientifica-pollio-2016-nombre-cannabis-taxonomia',
      'cientifica-garner-allard-1920-photoperiodism-discovery',
      'cientifica-alter-2024-cannabis-fotoperiodo-giberelina',
      'preprint-cannabis-daylength-mutation-2023',
      'cientifica-ren-2021-cannabis-domestication-genomics',
      'cientifica-vergara-2016-cannabis-quimiotipo-evolucion-cultivo'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-15',
    metadata: {
      seoTitle: 'Genética y tipos: sativa, indica, ruderalis — Atlas del Cultivo Argentino',
      seoDescription: 'De dónde vienen los nombres sativa, indica y ruderalis, por qué la clasificación en tres especies está discutida, y qué categorías (fotoperiódica/autofloreciente, quimiotipo) son más útiles hoy.',
      canonical: null,
      ogImage: null
    }
  },

  // --- Loop 4.4.1 — Ciclo general de Cannabis sativa L. ---
  // Fuentes: Ahrens et al. 2023 (leído en texto completo, control de fotoperiodo y variación entre
  // cultivares), Hesami et al. 2023 (ontogenia completa desde germinación hasta cosecha), Alter et
  // al. 2024 (mecanismo fisiológico del fotoperiodo en floración), Zhang et al. 2021 (variación
  // del umbral fotoperiódico entre cultivares por latitud de origen). Ningún valor presentado como
  // "condición óptima universal": todos son rangos de referencia con variación explícita declarada.
  {
    id: 'ciclo-de-vida',
    slug: 'ciclo-de-vida',
    categoryId: 'fundamentos',
    title: 'Ciclo de vida y condiciones de referencia',
    summary: 'Cannabis sativa L. atraviesa etapas fisiológicas reconocibles — germinación, plántula, vegetativo, floración, cosecha — con condiciones de referencia que varían según la genética, el cultivar y el sistema de cultivo.',
    intro: 'Cannabis sativa es una especie con una ontogenia —una secuencia de desarrollo— que va desde la germinación hasta la maduración y cosecha. Esta entrada ofrece una referencia general de esas etapas: sus características fisiológicas principales, los rangos de condiciones bajo los que suelen manejarse, y por qué esos rangos son referencias orientativas, no recetas universales. La información se basa en evidencia científica internacional directa de la especie y se distingue explícitamente del conocimiento específico de cada región argentina, que requiere datos propios todavía en construcción.',
    sections: [
      {
        id: 'como-leer-esta-entrada',
        title: 'Cómo leer esta entrada',
        paragraphs: [
          'Esta entrada describe el ciclo de vida de Cannabis sativa como fenómeno biológico general. Los rangos de condiciones que aparecen (temperatura, humedad relativa, fotoperiodo) son referencias ampliamente documentadas en la literatura científica y en la práctica del cultivo controlado — no son valores obligatorios ni aplicables de forma idéntica a cualquier cultivar, ambiente o sistema.',
          'Dos factores explican por qué esos rangos no son universales: la genética del cultivar (diferentes variedades pueden tener umbrales y respuestas distintos para las mismas variables) y el sistema de cultivo (un cultivo bajo ambiente controlado puede mantener condiciones estables; un cultivo exterior depende del clima real del lugar y la estación). Esta entrada no describe un sistema ni el otro: describe el proceso biológico que subyace a ambos.',
          'Al final de esta entrada hay una sección dedicada al manejo poscosecha (secado y curado), separada del ciclo fisiológico de la planta viva porque son procesos distintos con objetivos diferentes.'
        ]
      },
      {
        id: 'fotoperiodo-como-eje',
        title: 'El fotoperiodo como eje del ciclo',
        paragraphs: [
          'Cannabis sativa es una especie de día corto: la transición del desarrollo vegetativo al reproductivo (floración) se desencadena, en la mayoría de los cultivares, cuando la duración de la oscuridad supera un umbral crítico de forma sostenida. El mecanismo fisiológico implica cambios en los niveles de giberelinas: bajo fotoperiodo de día corto, estos niveles disminuyen, lo que promueve la formación de inflorescencias condensadas; bajo día largo, los niveles elevados inhiben esa transición. Se requieren al menos varios días consecutivos de fotoperiodo corto para que la señal quede registrada.',
          'El umbral fotoperiódico no es idéntico en todos los cultivares: estudios con cultivares de cáñamo (aceite esencial, fibra, grano) mostraron que el umbral crítico varía entre cultivares, y que cultivares de origen genético de alta latitud florecen más rápido bajo fotoperiodo corto que cultivares de origen subtropical. Existen además cultivares que no responden al fotoperiodo (llamados "autoflorecientes" o "día-neutros"), cuya floración depende de la edad fisiológica de la planta en lugar del ciclo de luz.',
          'En un ambiente exterior, el fotoperiodo es la duración astronómica del día, que depende de la latitud y la estación. En un ambiente controlado (indoor), el cultivador establece artificialmente ese ciclo de luz y oscuridad, pudiendo desacoplarlo del ciclo estacional externo.'
        ]
      },
      {
        id: 'tabla-etapas',
        title: 'Etapas del ciclo: referencia general',
        paragraphs: [
          'La siguiente tabla presenta las etapas principales del ciclo de Cannabis sativa con sus características fisiológicas generales y los rangos de condiciones de referencia más frecuentemente documentados. Estos rangos son orientativos: pueden variar según el cultivar, el sistema de cultivo, el objetivo productivo y las condiciones reales del ambiente.',
          'El ciclo fisiológico de la planta abarca desde la germinación hasta la cosecha. El manejo poscosecha (secado y curado) se presenta por separado al final de esta entrada, porque no forma parte de la fisiología de la planta viva.',
        ],
        table: {
          caption: 'Rangos de referencia por etapa del ciclo de Cannabis sativa L. Todos los valores son orientativos y pueden variar según cultivar, sistema y condiciones.',
          headers: ['Etapa', 'Duración de referencia', 'Fotoperiodo de referencia', 'Temperatura de referencia', 'Humedad relativa de referencia', 'Notas fisiológicas'],
          rows: [
            {
              etapa: 'Germinación',
              duracion: '1–7 días',
              fotoperiodo: 'No determinante para el proceso germinativo (la semilla no necesita luz para germinar)',
              temperatura: '22–26 °C',
              hr: '80–90 %',
              notas: 'La semilla absorbe agua (imbibición), reactiva su metabolismo y la radícula perfora la testa. Requiere humedad, oxígeno y temperatura estable. No existe un umbral de luz obligatorio para la germinación de esta especie.'
            },
            {
              etapa: 'Plántula',
              duracion: '2–3 semanas',
              fotoperiodo: '18/6 o 20/4 como referencias de cultivo controlado; en exterior, la duración del día depende de la estación y la latitud',
              temperatura: '22–27 °C',
              hr: '65–80 %',
              notas: 'Emergencia de cotiledones y primeras hojas verdaderas. La planta pasa de depender de las reservas de la semilla a la fotosíntesis activa. Responde a la calidad y cantidad de luz disponible.'
            },
            {
              etapa: 'Vegetativo',
              duracion: '4–8 semanas (variable según el sistema y el objetivo)',
              fotoperiodo: '18/6 como referencia ampliamente utilizada en cultivo controlado; en exterior depende de la estación',
              temperatura: '22–26 °C',
              hr: '40–60 %',
              notas: 'Desarrollo de estructura: tallos, ramas, nudos, hojas. Las necesidades nutricionales cambian con el desarrollo y varían según el sistema y el cultivar. Técnicas de conducción vegetal (LST, despunte) pueden aplicarse en esta etapa — son prácticas hortícolas, no procesos fisiológicos obligatorios del ciclo.'
            },
            {
              etapa: 'Floración inicial / media',
              duracion: '3–5 semanas (primera parte de la floración)',
              fotoperiodo: '12/12 como referencia dominante en cultivo controlado; en exterior el fotoperiodo corto natural desencadena la transición',
              temperatura: '20–26 °C',
              hr: '40–50 %',
              notas: 'El cambio de fotoperiodo a día corto desencadena la transición reproductiva. Aparecen las primeras inflorescencias. El umbral de día corto varía entre cultivares: estudios documentan que algunos cultivares florecen bajo fotoperiodos de hasta 14 h.'
            },
            {
              etapa: 'Floración tardía / maduración',
              duracion: '4–7 semanas',
              fotoperiodo: '12/12 o equivalente',
              temperatura: '18–24 °C',
              hr: '35–45 %',
              notas: 'Maduración de las inflorescencias. En los tricomas glandulares se observa el cambio gradual de transparente a lechoso y luego ámbar. Distintas estructuras de la misma inflorescencia pueden estar en puntos distintos de ese gradiente simultáneamente.'
            },
            {
              etapa: 'Cosecha',
              duracion: 'Evento puntual al finalizar la maduración',
              fotoperiodo: 'N/A',
              temperatura: '18–22 °C como referencia de manejo',
              hr: '45–50 % como referencia de manejo',
              notas: 'La cosecha marca el final del ciclo de la planta viva. El momento de cosecha se determina por observación del estado de maduración, no por una fecha fija. Incluye el corte y la eventual remoción de hojas (manicura).'
            }
          ]
        }
      },
      {
        id: 'variacion-entre-cultivares',
        title: 'Por qué estos rangos no son universales',
        paragraphs: [
          'Los rangos de esta tabla son los más frecuentemente documentados en la literatura científica y en protocolos de cultivo controlado. Pero la respuesta real de una planta depende de múltiples factores:',
        ],
        list: [
          'Genética: distintos cultivares tienen umbrales fotoperiódicos distintos. Algunos florecen robustamente bajo fotoperiodos de hasta 14 h; otros requieren menos de 12 h para iniciar floración. Los cultivares autoflorecientes no dependen del fotoperiodo.',
          'Latitud de origen genético: cultivares de origen genético de alta latitud tienden a florecer más rápido bajo fotoperiodo corto que cultivares de origen subtropical, un patrón documentado en estudios con múltiples cultivares de cáñamo.',
          'Sistema de cultivo: en un ambiente controlado (indoor), el cultivador puede mantener fotoperiodo, temperatura y humedad estables. En exterior, las condiciones dependen del clima real de la región, la estación y la latitud.',
          'Objetivo productivo: un cultivo orientado a fibra, semilla o inflorescencia puede manejar distintas duraciones del ciclo vegetativo y distintos momentos de inducción a la floración.'
        ]
      },
      {
        id: 'ambiente-controlado-principio',
        title: 'Cultivo bajo ambiente controlado: principio fisiológico',
        paragraphs: [
          'El cultivo bajo ambiente controlado (indoor, o invernadero con iluminación artificial) permite desacoplar el fotoperiodo del ciclo estacional externo. El cultivador puede mantener un fotoperiodo de día largo durante la etapa vegetativa y luego reducirlo para inducir la floración, independientemente de la estación del año o de la latitud geográfica.',
          'Este principio tiene una base fisiológica directa: como las investigaciones sobre el mecanismo giberelina-fotoperiodo en Cannabis sativa confirman, la señal de floración se activa por la duración de la oscuridad sostenida, no por la temperatura ni por la estación del calendario. Controlar esa duración artificialmente es equivalente, desde el punto de vista fisiológico, a lo que hace el ciclo estacional en el exterior.',
          'Argentina tiene diversidad geográfica y climática amplia: desde provincias con fotoperiodos invernales de menos de 9 horas (extremo sur) hasta provincias con variación anual del fotoperiodo relativamente reducida (extremo norte). Qué significa esa diversidad para el cultivo de Cannabis sativa en cada región es una capa de información distinta — para eso está la Ficha Provincial del Atlas, que refleja la evidencia real disponible por jurisdicción.'
        ]
      }
    ],
    observations: [
      'Los rangos de esta tabla son referencias, no diagnósticos. Una planta fuera de esos rangos no está necesariamente en problemas; una planta dentro de ellos no está necesariamente bien. El contexto (cultivar, sistema, etapa exacta) importa tanto como el número.',
      'La separación entre el ciclo fisiológico (planta viva) y el manejo poscosecha (secado/curado) es deliberada: el curado no es una etapa de la biología de la planta, es un proceso de manejo del material ya cosechado, con sus propias variables y objetivos.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'En la transición al fotoperiodo de floración: alargamiento visible de los entrenudos en las primeras semanas ("estiramiento"), seguido de la aparición de primordios florales en las yemas axilares. Esto ocurre en cultivares fotoperiódicos en respuesta a la reducción de horas de luz.'
      },
      {
        level: 'ATTENTION',
        description: 'Ausencia de señales de floración después de varias semanas bajo fotoperiodo de día corto puede indicar un cultivar con umbral fotoperiódico diferente al esperado, una interrupción de la oscuridad durante la noche, o un cultivar autofloreciente que ya había iniciado la transición reproductiva antes del cambio de fotoperiodo.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Una "reverte" o re-vegetación (aparición de hojas de forma vegetativa en una planta que ya había iniciado floración) puede ocurrir si el fotoperiodo se extiende nuevamente. No indica necesariamente un daño permanente, pero sí un cambio en la señal fotoperiódica que la planta recibió.'
      }
    ],
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Tratar los rangos de la tabla como valores obligatorios, en vez de como referencias orientativas que varían por cultivar y sistema.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Asumir que 12/12 es el único fotoperiodo que puede inducir floración. La evidencia científica muestra que muchos cultivares drug-type florecen robustamente bajo fotoperiodos de hasta 14 h, con demoras de 0 a 4 días según cultivar.'
      },
      {
        type: 'CONTEXT',
        description: 'Confundir el manejo poscosecha (secado, curado) con etapas del ciclo fisiológico de la planta. Son procesos de distinta naturaleza con objetivos distintos.'
      }
    ],
    environmentContext: [
      'En Argentina, la diversidad geográfica implica que la duración del día varía significativamente entre provincias: en el solsticio de verano, el norte del país tiene fotoperiodos de alrededor de 13–14 horas, mientras que el extremo sur puede superar las 15–17 horas. En invierno, esa variación se invierte. Esta diferencia astronómica es real y calculable — lo que todavía no está completamente documentado con evidencia directa de Cannabis es cómo responden cultivares específicos a esa variación en cada región.',
      'La Ficha Provincial del Atlas refleja la evidencia disponible por jurisdicción. Chubut cuenta con evidencia directa de nivel A de cultivo real de Cannabis sativa al aire libre (CONICET-CENPAT, cultivares Malvina y Pachamama, verano 2022-2023) y Jujuy cuenta con evidencia directa de nivel A de producción industrial bajo invernadero automatizado (Cannava S.E., habilitada por ANMAT) — sin que ninguna de las dos evidencias se generalice a otras provincias. Misiones tuvo una producción real documentada (MisioPharma/Biofábrica) que ya no está activa. Para el resto de las provincias, la información disponible combina datos ambientales verificables con principios fisiológicos generales, sin evidencia de campo local directa todavía.'
    ],
    tags: ['cultivo', 'ciclo', 'fotoperiodo', 'ambiente'],
    relatedEntryIds: ['cultivo-en-secuencia', 'luz-y-fotoperiodo', 'cosecha-y-maduracion', 'poscosecha', 'cuidado-de-la-plantula'],
    sourceIds: [
      'cientifica-ahrens-2023-photoperiod-flowering-indoor',
      'cientifica-hesami-2023-cannabis-life-cycle',
      'cientifica-alter-2024-cannabis-fotoperiodo-giberelina',
      'cientifica-zhang-2021-hemp-photoperiod-cultivars'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-14',
    metadata: {
      seoTitle: 'Ciclo de vida y condiciones de referencia — Atlas del Cultivo Argentino',
      seoDescription: 'Las etapas fisiológicas de Cannabis sativa, sus rangos de referencia de temperatura, humedad y fotoperiodo, y por qué esos rangos no son valores universales.',
      canonical: null,
      ogImage: null
    }
  },

  // --- Cierre de P2-5 (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md, 2026-09-16) — hueco #1 de
  // 62_LOOP_08_MAPA_MUNDIAL.md §4: el tramo entre "aparecen las primeras hojas verdaderas" (fin de
  // `germinacion`) y la etapa "Plántula" con rangos de referencia (inicio de la tabla de
  // `ciclo-de-vida`) no tenía narrativa propia. Fuentes GENERAL (extensión agrícola universitaria,
  // no específicas de Cannabis) — igual que el resto del atlas hace explícito cuando la evidencia
  // es de fisiología general y no de la especie.
  {
    id: 'cuidado-de-la-plantula',
    slug: 'cuidado-de-la-plantula',
    categoryId: 'fundamentos',
    title: 'Cuidado de la plántula: el tramo entre la germinación y el vegetativo',
    summary: 'Entre que la radícula emerge y la planta entra de lleno en desarrollo vegetativo hay un tramo corto y frágil, con dos riesgos bien documentados en fisiología general de plántulas: el damping-off y la etiolación por luz insuficiente.',
    intro: '"Germinación y primera lectura del material" termina en el momento en que aparecen las primeras hojas verdaderas. "Ciclo de vida y condiciones de referencia" retoma la secuencia ya en la etapa "Plántula", con sus rangos de referencia de temperatura, humedad y fotoperiodo. Esta entrada llena ese tramo intermedio: qué hace especialmente frágil a una plántula recién emergida, y cuáles son los dos riesgos con mejor evidencia documentada en esta etapa — ninguno específico de Cannabis, ambos observables en cualquier plántula.',
    sections: [
      {
        id: 'por-que-esta-entrada-existe',
        title: 'Por qué esta entrada existe',
        paragraphs: [
          'Ni "Germinación y primera lectura del material" ni "Ciclo de vida y condiciones de referencia" describen en detalle qué ocurre entre esos dos puntos. Es un tramo real, con entidad fisiológica propia: la plántula ya dejó de depender por completo de las reservas de la semilla, pero todavía no desarrolló el sistema de raíces ni la estructura foliar que la sostienen en la etapa vegetativa plena. Esa transición es, precisamente, cuando se documenta con más frecuencia el colapso de plántulas por causas evitables.',
          'Esta entrada describe dos de esas causas con evidencia general de fisiología y patología vegetal (no específica de Cannabis sativa) — coherente con cómo el atlas ya trata otras entradas de manejo (ver "Suelo y agua", "Fertilización") cuando la evidencia disponible es de la fisiología vegetal en general, aplicada por analogía, y no un estudio de campo de esta especie en particular.'
        ]
      },
      {
        id: 'damping-off',
        title: 'Damping-off: el colapso de la plántula recién emergida',
        paragraphs: [
          'El "damping-off" (o "mal de almácigo") es el nombre general para el colapso de plántulas causado por hongos y mohos de agua del suelo — géneros como Rhizoctonia, Fusarium, Pythium y Phytophthora son los más documentados. Se distingue una forma pre-emergencia, que destruye la radícula y el hipocótilo antes de que la plántula asome sobre el sustrato, de una forma post-emergencia, que se manifiesta como pudrición del tallo justo en la línea del sustrato o por debajo, y que suele terminar en el volcado y la muerte de la plántula ya emergida.',
          'La condición ambiental más asociada a esta enfermedad es el exceso de humedad: un sustrato saturado o mal drenado, combinado con humedad relativa alta, favorece a estos patógenos. Esto conecta directamente con lo que "Sustrato, agua y drenaje" ya describe sobre la doble función del sustrato (retener agua y alojar aire): un sustrato que no drena no solo limita el oxígeno de la raíz, también crea las condiciones que estos patógenos necesitan.',
          'Las prácticas generales documentadas para reducirlo incluyen partir de semilla y sustrato sanos, evitar el riego excesivo, favorecer la circulación de aire y evitar el hacinamiento de plántulas — ninguna es una receta cerrada ni específica de Cannabis, son principios generales de manejo de almácigo.'
        ]
      },
      {
        id: 'etiolacion',
        title: 'Etiolación: el tallo que se estira buscando luz',
        paragraphs: [
          'La causa más frecuentemente documentada de plántulas "estiradas" (tallos alargados, delgados y débiles, con hojas pequeñas y muy espaciadas) es la luz insuficiente en intensidad, duración o cercanía a la fuente. Es un fenómeno general de fisiología vegetal, conocido como etiolación: en ausencia de suficiente luz, la planta destina energía a alargar el tallo en busca de una fuente de luz mejor, a costa del desarrollo de hojas y raíz.',
          'Las medidas generales documentadas para prevenirlo o corregirlo son acercar la fuente de luz a una distancia adecuada, sostener una duración de luz suficiente, y evitar que las plántulas compitan entre sí por luz cuando están sembradas con demasiada densidad.'
        ]
      },
      {
        id: 'que-no-cambia-en-este-tramo',
        title: 'Qué no cambia respecto a la germinación',
        paragraphs: [
          'Las tres condiciones que ya describe "Germinación y primera lectura del material" —agua, oxígeno y temperatura— siguen importando en este tramo; lo que se agrega es que ahora la luz pasa a ser una variable activa (la plántula ya fotosintetiza) y que el riesgo de patógenos de sustrato sigue vigente mientras el tallo permanece cerca de la línea del suelo. Esta entrada no fija valores de luz, riego ni densidad de siembra: describe los dos riesgos mejor documentados de esta etapa para que puedan reconocerse, no para prescribir un manejo único.'
        ]
      }
    ],
    observations: [
      'Ver un tallo alargado, delgado y de color pálido es una observación directa. Concluir sin más información que la planta quedó "dañada para siempre" es una interpretación — la etiolación es, ante todo, una respuesta a la falta de luz, y corregir la causa suele mejorar el desarrollo posterior, aunque esta entrada no cuantifica cuánto ni en qué plazo.',
      'Ver que una plántula se dobla y colapsa en la línea del sustrato es una observación. Atribuirlo de entrada a "falta de nutrientes" sin considerar el patrón típico del damping-off (pudrición justo en esa línea, humedad excesiva reciente) es una interpretación apresurada que puede llevar a una corrección equivocada.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Tallo corto y firme, hojas verdaderas de tamaño creciente y bien separadas entre nudos, color verde uniforme — desarrollo típico de una plántula con luz y humedad dentro de un rango razonable.'
      },
      {
        level: 'ATTENTION',
        description: 'Tallo notablemente alargado y delgado en relación al tamaño de las hojas (posible etiolación por luz insuficiente), o pudrición/oscurecimiento del tallo justo en la línea del sustrato con volcado de la plántula (patrón típico de damping-off post-emergencia).'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Un entrenudo algo más largo que el anterior, de forma aislada y sin que el resto de la plántula muestre signos de debilidad, no alcanza por sí solo para concluir etiolación — la variabilidad individual entre plántulas del mismo lote es real.'
      }
    ],
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Atribuir el volcado de una plántula a una causa nutricional sin considerar el patrón típico del damping-off (pudrición en la línea del sustrato, asociada a exceso de humedad reciente).'
      },
      {
        type: 'OBSERVATION',
        description: 'No registrar la distancia y duración de la fuente de luz al notar tallos alargados, lo que dificulta confirmar la etiolación como causa más probable frente a otras posibles.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Responder a una plántula estirada agregando más riego o fertilizante en vez de revisar primero la luz disponible, que es la causa con mejor evidencia documentada para este síntoma.'
      }
    ],
    environmentContext: [
      'La evidencia de esta entrada proviene de extensión agrícola general (no específica de Cannabis sativa) — el mismo criterio de transparencia que ya aplica el atlas en "Suelo y agua" y "Fertilización" cuando la evidencia disponible es de fisiología vegetal general aplicada por analogía. No existe todavía, para esta etapa puntual, una fuente con evidencia directa y verificada de Cannabis sativa en Argentina.'
    ],
    tags: ['fundamentos', 'germinación', 'sanidad', 'riesgo', 'luz'],
    relatedEntryIds: ['germinacion', 'ciclo-de-vida', 'lectura-de-senales', 'sustrato-y-drenaje'],
    sourceIds: ['agricultural-psu-extension-2026-damping-off', 'agricultural-illinois-extension-2022-leggy-seedlings'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-16',
    metadata: {
      seoTitle: 'Cuidado de la plántula post-emergencia — Atlas del Cultivo Argentino',
      seoDescription: 'El tramo entre la germinación y la etapa vegetativa: damping-off y etiolación por luz insuficiente, los dos riesgos mejor documentados de esta etapa.',
      canonical: null,
      ogImage: null
    }
  },

  // --- Loop 4.4.1 — Manejo poscosecha ---
  {
    id: 'poscosecha',
    slug: 'poscosecha',
    categoryId: 'manejo-poscosecha',
    title: 'Manejo poscosecha: secado y curado',
    summary: 'El secado y el curado son procesos de manejo del material ya cosechado, no etapas del ciclo fisiológico de la planta viva. Sus objetivos y condiciones son distintos a los del cultivo.',
    intro: 'Una vez cosechada la inflorescencia, el proceso biológico de la planta terminó. Lo que sigue —secado y curado— es el manejo de ese material para estabilizarlo y preservarlo. Esta entrada describe esos procesos como lo que son: técnicas de postcosecha con condiciones de referencia propias, separadas del ciclo de la planta viva.',
    sections: [
      {
        id: 'secado',
        title: 'Secado',
        paragraphs: [
          'El secado reduce el contenido de humedad del material recién cosechado. Una humedad residual excesiva favorece el desarrollo de hongos (Botrytis, entre otros); un secado excesivamente rápido puede afectar la textura y las características organolépticas del material.',
          'Como referencia general, se documentan condiciones de manejo de 18–20 °C y 50–60 % de humedad relativa, en un espacio con circulación de aire y oscuridad, durante 10 a 15 días. Estos valores varían según el volumen, la estructura de las inflorescencias y las condiciones del espacio disponible.'
        ]
      },
      {
        id: 'curado',
        title: 'Curado',
        paragraphs: [
          'El curado es el proceso de maduración lenta del material ya seco, en envases herméticos (habitualmente de vidrio), con apertura periódica para regular la humedad y los gases. Su objetivo es la estabilización del perfil organoléptico del material.',
          'Los rangos de referencia documentados son: 15–20 °C, 58–62 % de humedad relativa, oscuridad, con un mínimo de 4 semanas y frecuentemente hasta 8 semanas o más. La duración y las condiciones exactas dependen del material y del objetivo.',
          'El curado no debe presentarse como una "continuación fisiológica" del ciclo de la planta, ni como un proceso de fermentación activa comparable a procesos industriales, sin una fuente científica específica que lo respalde para esta especie. Es un proceso de maduración del material cosechado, con similitudes a otras técnicas de postcosecha agrícola.'
        ]
      },
      {
        id: 'que-no-hace-el-poscosecha',
        title: 'Qué no es el manejo poscosecha',
        paragraphs: [
          'Esta entrada no incluye el "lavado de raíces" como etapa del ciclo, ni lo trata como un requisito del manejo poscosecha. La práctica de regar únicamente con agua en los días finales antes de la cosecha para "obligar a la planta a consumir sus reservas nutricionales" carece de evidencia científica revisada por pares que valide ese mecanismo. Se documenta su existencia como práctica difundida en la cultura del cultivo, pero no como recomendación respaldada por evidencia.',
          'Esta entrada tampoco incluye instrucciones de preparación, extracción, dosificación ni consumo. El foco es el proceso de manejo del material vegetal cosechado, no sus usos derivados.'
        ]
      }
    ],
    observations: [
      'La diferencia entre el ciclo fisiológico y el manejo poscosecha es relevante editorialmente: en el primero, la planta viva responde activamente al ambiente; en el segundo, el material ya cosechado se maneja para preservarlo. Los errores de interpretación más frecuentes vienen de tratar ambos como si fueran la misma cosa.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Durante el secado: reducción gradual del peso y del contenido de humedad del material, con las ramas que pierden flexibilidad progresivamente.'
      },
      {
        level: 'ATTENTION',
        description: 'Aparición de olor a moho, manchas visibles o textura esponjosa que no desaparece durante el secado son señales de presencia fúngica que puede avanzar si no se corrige la humedad o la circulación de aire.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Una humedad residual dentro del rango 58–62 % durante el curado puede mantenerse estable o fluctuar: si el envase muestra condensación, la humedad es excesiva; si el material se siente seco y crujiente, la humedad es insuficiente. El ajuste es gradual, no un evento puntual.'
      }
    ],
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Tratar el secado y el curado como etapas del ciclo de la planta, en vez de como manejo poscosecha del material ya cosechado.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Asumir que el "lavado de raíces" es un paso fisiológico necesario del ciclo, sin base en evidencia científica revisada por pares.'
      },
      {
        type: 'OBSERVATION',
        description: 'No revisar la humedad del material durante el curado de forma periódica, asumiendo que una vez en el frasco el proceso es pasivo y no requiere monitoreo.'
      }
    ],
    environmentContext: [
      'Las condiciones óptimas de secado y curado dependen del ambiente disponible: en regiones con alta humedad ambiental (como el NEA o Buenos Aires en verano) puede ser más difícil mantener la humedad relativa en rango sin equipamiento específico (deshumidificador). En regiones con baja humedad ambiental (Cuyo, Patagonia) puede ocurrir lo contrario. Esta entrada no da una recomendación específica por provincia porque no existe evidencia directa de campo en Argentina que la respalde para esta etapa — se describe el principio general.'
    ],
    tags: ['cosecha', 'maduración', 'cultivo'],
    relatedEntryIds: ['cosecha-y-maduracion', 'ciclo-de-vida'],
    sourceIds: [
      'cientifica-hesami-2023-cannabis-life-cycle'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-14',
    metadata: {
      seoTitle: 'Manejo poscosecha: secado y curado — Atlas del Cultivo Argentino',
      seoDescription: 'El secado y el curado como procesos de manejo poscosecha separados del ciclo fisiológico de la planta, con sus rangos de referencia y la distinción respecto de prácticas sin evidencia.',
      canonical: null,
      ogImage: null
    }
  }
];
