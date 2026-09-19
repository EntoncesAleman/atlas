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
  },

  // --- Bloques nuevos del atlas (2026-09-18): recursos externos curados, distintos del
  // contenido enciclopédico propio de las categorías anteriores ---
  {
    id: 'material-de-lectura',
    order: 14,
    slug: 'material-de-lectura',
    title: 'Material de lectura',
    tag: 'Lectura',
    type: 'RECURSOS',
    regionLabel: 'Biblioteca',
    cta: 'Explorar',
    description: 'Informes, guías y artículos recomendados para profundizar.',
    shortDescription: 'Una selección curada de lectura externa, oficial y académica.',
    editorialDescription: 'El atlas no reemplaza a sus fuentes: esta sección reúne informes oficiales, guías académicas y artículos científicos de acceso abierto para quien quiera leer directamente el material original.',
    tags: ['lectura'],
    metadata: {
      seoTitle: 'Material de lectura — Atlas del Cultivo Argentino',
      seoDescription: 'Informes, guías y artículos recomendados sobre Cannabis, cultivo y su marco regulatorio, con enlace directo a la fuente original.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'documentales',
    order: 15,
    slug: 'documentales',
    title: 'Documentales',
    tag: 'Documentales',
    type: 'RECURSOS',
    regionLabel: 'Cine',
    cta: 'Explorar',
    description: 'Documentales argentinos sobre cannabis medicinal y autocultivo.',
    shortDescription: 'Una selección de documentales reales, con dirección y fecha de estreno verificadas.',
    editorialDescription: 'Una selección de documentales argentinos —con dirección, año y fuente de verificación— sobre cannabis medicinal, autocultivo y las personas detrás de esas historias.',
    tags: ['documental'],
    metadata: {
      seoTitle: 'Documentales — Atlas del Cultivo Argentino',
      seoDescription: 'Documentales argentinos sobre cannabis medicinal y autocultivo, con dirección, año de estreno y fuente de verificación.',
      canonical: null,
      ogImage: null
    },
    status: 'PUBLISHED'
  },
  {
    id: 'noticias',
    order: 16,
    slug: 'noticias',
    title: 'Noticias',
    tag: 'Noticias',
    type: 'RECURSOS',
    regionLabel: 'Actualidad',
    cta: 'Explorar',
    description: 'Cambios regulatorios recientes, con fuente oficial verificada.',
    shortDescription: 'Novedades regulatorias e institucionales recientes sobre cannabis en Argentina.',
    editorialDescription: 'Un registro de cambios regulatorios e institucionales recientes sobre cannabis y cáñamo en Argentina, siempre con fuente oficial o periodística verificable y fecha de publicación.',
    tags: ['noticia', 'contexto'],
    metadata: {
      seoTitle: 'Noticias — Atlas del Cultivo Argentino',
      seoDescription: 'Cambios regulatorios e institucionales recientes sobre cannabis y cáñamo en Argentina, con fuente oficial o periodística verificada.',
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
    relatedEntryIds: ['germinacion', 'cultivo-en-secuencia', 'evaluacion-visual-del-suelo', 'textura-estructura-porosidad', 'capacidad-de-campo-agua-disponible', 'componentes-de-sustrato', 'suelo-vivo-y-microbiologia', 'calidad-del-agua-de-riego', 'agua-y-expansion-celular'],
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
    relatedEntryIds: ['cultivo-en-secuencia', 'cosecha-y-maduracion', 'genetica-y-tipos', 'intensidad-de-luz', 'variacion-genetica-fotoperiodo', 'fotoperiodo-segun-latitud-argentina', 'espectro-de-luz-azul-rojo-rojo-lejano'],
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
    relatedEntryIds: ['sustrato-y-drenaje', 'marco-editorial', 'chupadera-fungosa-damping-off', 'moho-gris-botrytis-cinerea'],
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
    relatedEntryIds: ['germinacion', 'luz-y-fotoperiodo', 'poda', 'fertilizacion-y-nutricion', 'ciclo-de-vida', 'interior-y-exterior'],
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
    relatedEntryIds: ['cultivo-en-secuencia', 'fertilizacion-y-nutricion', 'entrenamiento-de-bajo-estres-lst', 'defoliacion', 'poda-de-bajos-bblr', 'super-cropping', 'fim', 'herramientas-e-higiene-de-poda', 'meristemos-crecimiento-primario-secundario', 'arquitectura-y-asignacion-de-recursos'],
    sourceIds: [
      'cientifica-chavalina-2026-hemp-topping-morphology',
      'academica-beveridge-2023-apical-dominance-review'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
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
    relatedEntryIds: ['sustrato-y-drenaje', 'lectura-de-senales', 'poda', 'ph-y-disponibilidad-de-nutrientes', 'suelo-vivo-y-microbiologia', 'conductividad-electrica-y-sales', 'arquitectura-y-asignacion-de-recursos', 'senescencia-y-final-del-desarrollo'],
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
    relatedEntryIds: ['cultivo-en-secuencia', 'marco-editorial', 'poscosecha', 'quimica-de-la-maduracion', 'moho-gris-botrytis-cinerea', 'senescencia-y-final-del-desarrollo'],
    sourceIds: ['cientifica-hesami-2023-cannabis-life-cycle', 'cientifica-bernstein-2019-cannabis-npk-cannabinoide-canopia'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
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
    relatedEntryIds: ['lectura-de-senales', 'germinacion', 'reprocann-modalidades', 'industria-cannabis-argentina-actual', 'aptitud-agroclimatica-argentina-canamo'],
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
    intro: 'Contar la historia de Cannabis sativa exige la misma disciplina que el resto del atlas aplica a la observación de una planta viva: distinguir qué es evidencia directa (un resto arqueológico fechado, un documento de archivo), qué es interpretación razonable sobre esa evidencia, y qué sigue siendo hipótesis abierta. Esta entrada recorre esa historia como una línea de tiempo global — desde el origen de la especie hasta su llegada a América — sin convertir ningún tramo en un relato más cerrado del que la evidencia permite. La continuación específica de esa historia en el territorio que hoy es Argentina tiene su propia entrada ("Historia de la planta en Argentina"), separada a propósito para no mezclar dos escalas de evidencia distintas (global vs. regional) en un mismo texto.',
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
          'En América del Sur, el proceso fue más temprano y más disperso de lo que suele repetirse: las primeras remisiones documentadas de semilla de cáñamo hacia "las Indias" datan de 1513-1520 (dos arrobas de cañamones y cuatro de lino en 1513, según el Archivo General de Indias), y llegaron primero a asentamientos en Mesoamérica, no a Chile. La Real Cédula de Carlos V de 1545 —la fecha que la mayoría de los sitios de divulgación repiten como "el momento en que el cáñamo llegó a Chile"— en realidad fue una orden general dirigida a "las Indias" en su conjunto, no una medida específica para Chile; para esa fecha ya se habían hecho intentos de siembra en el Caribe, Mesoamérica, Ecuador, Perú, Venezuela y el propio Río de la Plata. Lo que sí es cierto es que Chile terminó siendo, hacia 1577-1605, la única región donde el cultivo se volvió rentable y sostenido a gran escala (valles de Quillota y La Ligua) — probablemente por tener un clima mediterráneo similar al de origen de la semilla, no por haber sido el primer lugar de siembra. Qué pasó específicamente en el territorio que hoy es Argentina, dentro de ese mismo proceso sudamericano, es el tema de "Historia de la planta en Argentina".'
        ]
      }
    ],
    observations: [
      'Un fitolito fechado o un documento de archivo con su fecha y su institución de origen es evidencia directa. Que una fecha se repita en muchos sitios web sin ninguna cita no la vuelve más cierta — el caso de "1545, Chile" es exactamente ese patrón: una simplificación repetida durante un siglo que la propia investigación histórica reciente cuestiona con documentos primarios.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'OTHER',
        description: 'Tratar una fecha ampliamente repetida en sitios de divulgación (como "1545, Quillota, Chile") como si fuera un hecho verificado, sin revisar si esa repetición proviene de una fuente primaria o de una simplificación heredada de un solo texto de principios del siglo XX.'
      }
    ],
    environmentContext: null,
    tags: ['historia', 'domesticación'],
    relatedEntryIds: ['genetica-y-tipos', 'germinacion', 'historia-de-la-planta-argentina'],
    sourceIds: [
      'cientifica-ren-2021-cannabis-domestication-genomics',
      'cientifica-dalmartello-2023-haimenkou-cannabis-archaeobotany',
      'cientifica-liu-2026-shandong-cannabis-phytolith',
      'cientifica-mcpartland-2018-cannabis-europa-polen',
      'academica-diaz-ordonez-2017-cannabis-chile-colonial'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Historia de la planta — Atlas del Cultivo Argentino',
      seoDescription: 'Origen, domesticación y expansión de Cannabis sativa desde Asia hacia Europa y América — una línea de tiempo global, separada de su continuación en Argentina.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'historia-de-la-planta-argentina',
    slug: 'historia-de-la-planta-en-argentina',
    categoryId: 'historia',
    title: 'Historia de la planta en Argentina',
    summary: 'Del Río de la Plata colonial a Manuel Belgrano: la evidencia documental muestra intentos de fomento reales, pero ninguna fuente confirma un cultivo exitoso y sostenido antes del siglo XXI.',
    intro: '"Historia de la planta" sigue la línea de tiempo global hasta la llegada del cáñamo a América. Esta entrada retoma ese hilo específicamente en el territorio que hoy es Argentina: qué órdenes coloniales llegaron acá, qué escribió realmente Manuel Belgrano sobre el tema, y qué vacío documental separa esos episodios de la industria argentina actual (ver "La industria del cannabis en la Argentina actual").',
    sections: [
      {
        id: 'rio-de-la-plata-y-tucuman',
        title: 'El Río de la Plata y Tucumán: intentos coloniales, sin evidencia de éxito',
        paragraphs: [
          'Documentos primarios del Archivo General de Indias muestran que la Corona española no ignoró la región que hoy es Argentina: una real cédula de 1619 se dirigió específicamente al gobernador del Río de la Plata, y otra de 1626 se envió a los gobernadores del Río de la Plata, Cartagena, Tucumán y Paraguay, entre otros, instruyendo fomentar el cultivo de cáñamo en sus jurisdicciones — casi 180 años antes de que Manuel Belgrano escribiera sobre el mismo tema.',
          'No hay, en la fuente consultada para esta entrada, evidencia de que esas órdenes se hayan traducido en un cultivo exitoso y sostenido en el Río de la Plata o Tucumán: los propios funcionarios reales fueron confirmando, con el correr de las décadas, que el cáñamo no podía cultivarse de forma rentable en ninguna jurisdicción americana salvo Chile (ver "Historia de la planta"). Lo que sí queda documentado es un vínculo económico indirecto: hacia 1644-1648, la escasez de mano de obra que limitaba ampliar los cultivos chilenos se atribuye, en los propios documentos de la época, en parte al cierre del puerto de Buenos Aires — el Río de la Plata aparece conectado a la cadena de suministro del cáñamo colonial como nudo logístico, no como zona de cultivo.'
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
        title: 'Un vacío documental, no un capítulo perdido',
        paragraphs: [
          'Entre los intentos coloniales del siglo XVII y la actualidad, esta entrada no encontró, dentro de su alcance de investigación, una fuente primaria verificada que documente una plantación argentina exitosa y sostenida posterior a Belgrano — lo que hay son órdenes, memorias y proyectos de fomento, no evidencia confirmada de cultivo a escala. Se documenta esa ausencia en vez de rellenarla con una "primera plantación" que ninguna fuente consultada respalda.',
          'El marco legal y regulatorio moderno de Cannabis en Argentina —la Ley 23.737 (que tipifica el cultivo no autorizado), el fallo "Arriola" de la Corte Suprema (2009) y la Ley 27.350/REPROCANN (uso medicinal y autocultivo registrado)— ya está descripto con sus fuentes oficiales en la entrada "Marco editorial y responsable" de este atlas, y el desarrollo industrial posterior a 2017 en "La industria del cannabis en la Argentina actual" — esta entrada no repite ese contenido, solo señala la continuidad histórica hacia él.'
        ]
      }
    ],
    observations: [
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
        type: 'CONTEXT',
        description: 'Tratar el vacío documental entre Belgrano y la actualidad como si fuera evidencia de que no pasó nada, en vez de una ausencia de fuentes verificadas dentro del alcance de esta investigación — son dos afirmaciones distintas.'
      }
    ],
    environmentContext: null,
    tags: ['historia', 'domesticación', 'argentina'],
    relatedEntryIds: ['historia-de-la-planta', 'marco-editorial', 'industria-cannabis-argentina-actual'],
    sourceIds: [
      'academica-diaz-ordonez-2017-cannabis-chile-colonial',
      'historica-belgrano-1797-memoria-lino-canamo'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Historia de la planta en Argentina — Atlas del Cultivo Argentino',
      seoDescription: 'Las reales cédulas coloniales de 1619 y 1626, la memoria de Belgrano de 1797 sobre lino y cáñamo, y el vacío documental hasta la industria argentina actual.',
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
    relatedEntryIds: ['historia-de-la-planta', 'luz-y-fotoperiodo', 'cosecha-y-maduracion', 'quimica-de-la-maduracion', 'canamo-industrial-frontera-thc', 'variacion-genetica-fotoperiodo', 'diferencias-geneticas-crecimiento-cultivares'],
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
    relatedEntryIds: ['cultivo-en-secuencia', 'luz-y-fotoperiodo', 'cosecha-y-maduracion', 'poscosecha', 'cuidado-de-la-plantula', 'temperatura-y-desarrollo', 'crecimiento-vegetal-y-desarrollo', 'elongacion-stretch-floracion', 'senescencia-y-final-del-desarrollo'],
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
  {
    id: 'crecimiento-vegetal-y-desarrollo',
    slug: 'que-es-el-crecimiento-vegetal',
    categoryId: 'fundamentos',
    title: 'Qué es el crecimiento vegetal: crecimiento y desarrollo no son lo mismo',
    summary: '"Crecimiento" y "desarrollo" se usan como sinónimos en el lenguaje cotidiano de cultivo, pero en fisiología vegetal describen dos procesos distintos —uno cuantitativo, el otro cualitativo— que suelen ocurrir juntos sin ser lo mismo.',
    intro: 'Antes de describir etapas puntuales del ciclo de Cannabis sativa, esta entrada fija el vocabulario de base: qué es, en fisiología vegetal, "crecimiento", qué es "desarrollo", y por qué la distinción importa para leer el resto de esta categoría sin confundir un aumento de tamaño con un cambio de etapa.',
    sections: [
      {
        id: 'definicion-de-crecimiento',
        title: 'Crecimiento: un aumento irreversible de volumen o masa',
        paragraphs: [
          'En fisiología vegetal, el crecimiento se define como el aumento irreversible de volumen de una célula, tejido, órgano o planta completa, generalmente acompañado de un aumento de masa. Es una definición más precisa de lo que parece: que se haya producido división celular no alcanza, por sí solo, para decir que hubo crecimiento — dividir una célula en dos no aumenta el volumen ni la masa total hasta que esas células nuevas se expanden.'
        ]
      },
      {
        id: 'definicion-de-desarrollo',
        title: 'Desarrollo: cambios cualitativos a lo largo del ciclo',
        paragraphs: [
          'El desarrollo, en cambio, es la serie de cambios cualitativos por los que pasa una planta a lo largo de su ciclo completo, desde el cigoto hasta la muerte del individuo (lo que en fisiología vegetal se llama ciclo ontogénico). La transición de la etapa vegetativa a la floración, por ejemplo, es un cambio de desarrollo —un cambio de programa, no solo de tamaño—, aunque suele venir acompañada de cambios de crecimiento (como la elongación de entrenudos).',
          'En la mayoría de los casos, crecimiento y desarrollo ocurren de forma paralela y coordinada — por eso es fácil tratarlos como sinónimos en el uso cotidiano. Pero distinguirlos ayuda a leer mejor una planta: una que crece mucho en tamaño no necesariamente cambió de etapa de desarrollo, y una que cambió de etapa (por ejemplo, inició floración) no necesariamente está creciendo más rápido en ese momento.'
        ]
      },
      {
        id: 'por-que-esta-distincion-importa-para-cannabis',
        title: 'Por qué esta distinción importa para leer Cannabis sativa',
        paragraphs: [
          'Un ejemplo concreto que desarrolla otra entrada de este atlas: durante la transición a floración, Cannabis sativa atraviesa primero un cambio de desarrollo (la señal fotoperiódica que dispara la floración, ver "Luz como señal temporal") y, asociado a eso pero no idéntico, un cambio de crecimiento particular (la elongación acelerada de entrenudos conocida como "stretch", ver "Elongación (stretch) en la transición a floración"). Son dos fenómenos relacionados pero distintos: uno es la señal de cambio de programa, el otro es un patrón de crecimiento que ese cambio de programa dispara temporalmente.'
        ]
      }
    ],
    observations: [
      'Ver que una planta aumentó de altura es una observación de crecimiento. Concluir de eso que "cambió de etapa" es una interpretación que puede o no ser correcta — el crecimiento y el cambio de etapa (desarrollo) no son la misma variable, aunque a menudo coincidan en el tiempo.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Tratar "crecimiento" y "desarrollo" como sinónimos intercambiables — son dos procesos distintos (uno cuantitativo, otro cualitativo) que suelen ocurrir juntos pero no son la misma cosa.'
      },
      {
        type: 'OBSERVATION',
        description: 'Asumir que división celular por sí sola constituye crecimiento — según la definición fisiológica, hace falta además el aumento de volumen o masa que sigue a esa división.'
      }
    ],
    environmentContext: null,
    tags: ['fundamentos', 'ciclo'],
    relatedEntryIds: ['division-celular-elongacion-diferenciacion', 'ciclo-de-vida', 'elongacion-stretch-floracion'],
    sourceIds: ['academica-unne-crecimiento-y-desarrollo'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Qué es el crecimiento vegetal — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué crecimiento (aumento irreversible de volumen o masa) y desarrollo (cambios cualitativos del ciclo) son dos conceptos distintos en fisiología vegetal, aunque suelan ocurrir juntos.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'division-celular-elongacion-diferenciacion',
    slug: 'division-celular-elongacion-y-diferenciacion',
    categoryId: 'fundamentos',
    title: 'División celular, elongación y diferenciación: la base celular del crecimiento',
    summary: 'Todo crecimiento vegetal, sin excepción, se arma con la misma secuencia de tres procesos celulares — la planta no tiene un atajo distinto para crecer más rápido, solo puede repetir o acelerar esta misma secuencia.',
    intro: '"Qué es el crecimiento vegetal" define el crecimiento como un aumento irreversible de volumen o masa. Esta entrada describe, a nivel celular, cómo ocurre ese aumento: la secuencia de división, elongación y diferenciación celular que subyace a cualquier forma de crecimiento vegetal, incluido el de Cannabis sativa.',
    sections: [
      {
        id: 'las-tres-fases',
        title: 'Las tres fases del crecimiento celular',
        paragraphs: [
          'El proceso de crecimiento incluye tres fases sucesivas: división celular (mitosis y citocinesis), expansión o elongación de las células resultantes, y diferenciación. La sola división celular no aumenta el volumen ni la masa —produce más células, no células más grandes—; es la elongación de esas células nuevas la que realmente incrementa el tamaño de la planta. La diferenciación, por su parte, son los cambios permanentes de forma y organización interna que convierten a una célula genérica en un tipo celular especializado (una célula de la epidermis, del xilema, etc.).'
        ]
      },
      {
        id: 'el-mecanismo-de-elongacion',
        title: 'Cómo elonga una célula vegetal: pared, turgencia y agua',
        paragraphs: [
          'La célula vegetal está rodeada por una pared celular que le da forma definida y le impide desplazarse o cambiar de forma libremente. Para que una célula se alargue, esa pared debe "aflojarse" de forma controlada —un proceso llamado relajación de la tensión de la pared, mediado en parte por enzimas activadas por la hormona auxina—. Esa relajación, junto con la entrada de agua a la vacuola central de la célula (que genera la presión de turgencia), es lo que permite que la célula se expanda de forma irreversible.',
          'Este mecanismo explica por qué el agua no es solo "un recurso que la planta consume": es, literalmente, parte del motor físico de la elongación celular — un punto que desarrolla en más detalle "Agua y expansión celular".'
        ]
      },
      {
        id: 'diferenciacion-y-especializacion',
        title: 'Diferenciación: de célula genérica a tejido especializado',
        paragraphs: [
          'Una vez que una célula terminó de elongarse, puede diferenciarse: cambiar de forma y de organización interna para cumplir una función específica dentro de un tejido. Esta diferenciación es la razón por la que una planta madura está compuesta por muchos tipos de células distintas —de raíz, de tallo, de hoja, de tejido conductor— a pesar de que todas provienen, en última instancia, de la misma división celular original en los meristemas (ver "Meristemos: crecimiento primario y secundario").'
        ]
      }
    ],
    observations: [
      'Que una planta crezca más rápido bajo ciertas condiciones (más luz, más agua disponible) no implica un mecanismo celular distinto — implica que esas mismas tres fases (división, elongación, diferenciación) ocurren con mayor velocidad o en más puntos de la planta a la vez, no que exista un atajo biológico alternativo.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Asumir que "más división celular" es sinónimo de "más crecimiento" — el aumento de tamaño real depende de la elongación de las células ya divididas, no solo de cuántas veces se dividieron.'
      },
      {
        type: 'CONTEXT',
        description: 'Tratar la falta de agua como un problema exclusivamente nutricional o de "sed" de la planta, sin considerar que el agua participa directamente, a nivel mecánico, en el proceso físico de elongación celular.'
      }
    ],
    environmentContext: null,
    tags: ['fundamentos', 'ciclo'],
    relatedEntryIds: ['crecimiento-vegetal-y-desarrollo', 'meristemos-crecimiento-primario-secundario', 'agua-y-expansion-celular'],
    sourceIds: ['academica-unne-crecimiento-y-desarrollo'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'División celular, elongación y diferenciación — Atlas del Cultivo Argentino',
      seoDescription: 'Las tres fases celulares que componen todo crecimiento vegetal, y cómo la pared celular, la turgencia y el agua hacen posible la elongación celular.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'meristemos-crecimiento-primario-secundario',
    slug: 'meristemos-crecimiento-primario-y-secundario',
    categoryId: 'fundamentos',
    title: 'Meristemos: de dónde sale todo el crecimiento nuevo',
    summary: 'A diferencia de un animal, una planta no crece "en todos lados a la vez": todo su crecimiento nuevo sale de un puñado de zonas localizadas y permanentes, los meristemos — entenderlos explica por qué cortar una punta de crecimiento tiene el efecto que tiene.',
    intro: '"División celular, elongación y diferenciación" describe el mecanismo celular del crecimiento sin decir dónde ocurre. Esta entrada cubre ese punto: los meristemos, las zonas localizadas de tejido embrionario que sostienen el crecimiento indefinido de una planta durante toda su vida.',
    sections: [
      {
        id: 'que-son-los-meristemos',
        title: 'Qué son los meristemos',
        paragraphs: [
          'Los meristemos son grupos de células pequeñas, de paredes delgadas, núcleos grandes y vacuolas pequeñas o ausentes, con una gran capacidad de división. A diferencia de la mayoría de las células vegetales maduras (que ya no se dividen), los meristemos se autoperpetúan: parte de sus células permanece siempre en estado embrionario (células iniciales), mientras otra parte se diferencia y forma los tejidos del cuerpo de la planta (células derivadas).',
          'Esta es una diferencia real con el crecimiento animal: en la mayoría de los animales, el número de células se fija al llegar a la adultez, y las divisiones posteriores solo reemplazan células muertas. En una planta, en cambio, el crecimiento es indefinido y se sostiene en estas zonas localizadas durante toda su vida.'
        ]
      },
      {
        id: 'tipos-de-meristemos',
        title: 'Tipos de meristemos: apicales, laterales e intercalares',
        paragraphs: [
          'Los meristemos apicales están en las puntas de tallos y raíces, y su actividad produce el crecimiento primario: el alargamiento del cuerpo de la planta, el aumento de su superficie de contacto con el aire y el suelo, y eventualmente los órganos reproductivos. Los meristemos laterales —el cámbium vascular y el felógeno— están dispuestos en paralelo a los costados de tallos y raíces, y producen el crecimiento secundario: el aumento en grosor. Los meristemos apicales se forman durante el desarrollo del embrión (meristemos primarios); el cámbium vascular se diferencia recién después de la germinación (meristemo secundario).',
          'Existe además un tercer tipo, el meristemo intercalar, ubicado entre regiones ya diferenciadas —típico de los entrenudos de las gramíneas—, de actividad limitada en el tiempo, responsable de que las zonas de inserción de hojas o nudos se separen entre sí a medida que el entrenudo se alarga.'
        ]
      },
      {
        id: 'por-que-esto-explica-la-poda',
        title: 'Por qué esto explica lo que pasa al remover una punta de crecimiento',
        paragraphs: [
          'El hecho de que el crecimiento en longitud dependa de meristemos apicales puntuales —no de toda la planta a la vez— es la base fisiológica de por qué remover uno de esos meristemos (la práctica que describe "Poda") tiene un efecto tan marcado: se elimina una fuente localizada y autoperpetuada de crecimiento y de señal hormonal, no solo "una parte" de la planta en un sentido genérico. Esta entrada no desarrolla el mecanismo hormonal de la dominancia apical en sí —eso ya lo hace "Poda" en detalle— y se limita a la base de tejido meristemático que hace posible ese fenómeno.'
        ]
      }
    ],
    observations: [
      'Ver que una rama sigue creciendo en longitud mucho después de haber emergido es compatible con la actividad continua de un meristemo apical en su punta — no es una anomalía, es el modo de crecimiento indefinido característico de las plantas.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Pensar en el crecimiento vegetal como algo distribuido de manera uniforme por toda la planta, similar al crecimiento animal — en una planta, el crecimiento en longitud depende de zonas puntuales (meristemos apicales), no de la totalidad del tejido.'
      },
      {
        type: 'OTHER',
        description: 'Confundir el crecimiento primario (en longitud, por meristemos apicales) con el crecimiento secundario (en grosor, por meristemos laterales) — son dos procesos distintos, sostenidos por tejidos meristemáticos distintos.'
      }
    ],
    environmentContext: null,
    tags: ['fundamentos', 'ciclo'],
    relatedEntryIds: ['division-celular-elongacion-diferenciacion', 'arquitectura-y-asignacion-de-recursos', 'poda'],
    sourceIds: ['academica-unne-crecimiento-y-desarrollo'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Meristemos: crecimiento primario y secundario — Atlas del Cultivo Argentino',
      seoDescription: 'Qué son los meristemos, la diferencia entre meristemos apicales, laterales e intercalares, y por qué el crecimiento primario y secundario dependen de tejidos distintos.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'agua-y-expansion-celular',
    slug: 'agua-y-expansion-celular',
    categoryId: 'fundamentos',
    title: 'Agua y expansión celular',
    summary: 'La falta de agua no solo "estresa" a la planta en un sentido general: frena el crecimiento por un mecanismo físico concreto, porque el agua es parte directa del motor que expande cada célula nueva.',
    intro: '"División celular, elongación y diferenciación" menciona que el agua participa del mecanismo físico de elongación celular. Esta entrada desarrolla ese punto en particular: por qué el agua es, literalmente, uno de los componentes del crecimiento, no solo un recurso que la planta consume aparte.',
    sections: [
      {
        id: 'turgencia-como-motor',
        title: 'La presión de turgencia como motor de la elongación',
        paragraphs: [
          'Cuando una célula vegetal se expande, lo hace porque entra agua a su vacuola central, generando una presión interna (turgencia) que empuja contra la pared celular. Para que esa presión se traduzca en un aumento de tamaño real —y no solo en una célula "hinchada" pero del mismo tamaño—, la pared celular debe aflojarse de forma controlada al mismo tiempo (relajación de la tensión de la pared, ver "División celular, elongación y diferenciación"). Sin esa entrada de agua, no hay presión de turgencia suficiente para estirar la pared, y la elongación celular se frena, incluso si el resto de las condiciones (luz, temperatura, nutrientes) son favorables.'
        ]
      },
      {
        id: 'por-que-la-elongacion-es-mas-sensible-que-la-fotosintesis',
        title: 'Por qué el crecimiento suele frenarse antes que la fotosíntesis',
        paragraphs: [
          'Este mecanismo explica un patrón general de fisiología vegetal: la expansión celular por elongación es, en general, más sensible a la falta de agua que la fotosíntesis. Una planta con déficit hídrico moderado puede seguir fotosintetizando de forma casi normal mientras su crecimiento en tamaño ya se frenó — porque el mecanismo de elongación depende de una presión de turgencia concreta que se pierde antes de que la maquinaria fotosintética deje de funcionar.'
        ]
      },
      {
        id: 'lo-que-esta-entrada-no-hace',
        title: 'Lo que esta entrada no hace',
        paragraphs: [
          'Esta entrada no fija un umbral de riego ni una frecuencia — depende del sustrato, el sistema de cultivo y el ambiente, variables que ya desarrollan "Sustrato, agua y drenaje" y "Capacidad de campo, punto de marchitez y agua disponible" en la categoría Suelo y agua. El aporte específico de esta entrada es el mecanismo fisiológico: por qué el agua importa para el crecimiento en sí, más allá de su rol en fotosíntesis o en el transporte de nutrientes.'
        ]
      }
    ],
    observations: [
      'Ver que una planta con sustrato algo seco crece más lento en altura, sin mostrar todavía marchitez ni otros síntomas visibles, es compatible con este mecanismo: el crecimiento por elongación puede frenarse antes de que aparezcan señales más evidentes de estrés hídrico.'
    ],
    signals: [
      {
        level: 'AMBIGUOUS',
        description: 'Un ritmo de crecimiento en altura más lento que en días anteriores, sin otros síntomas visibles (color, turgencia de las hojas), es compatible con una ligera limitación hídrica en la elongación celular — pero también con otras variables (temperatura, luz, etapa del ciclo) que esta entrada no aísla por sí sola.'
      }
    ],
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Asumir que si la planta no muestra marchitez, el agua disponible es necesariamente suficiente para un crecimiento óptimo — el mecanismo de elongación celular puede verse limitado por disponibilidad hídrica antes de que aparezcan síntomas visibles de estrés.'
      },
      {
        type: 'CONTEXT',
        description: 'Tratar el agua únicamente como un vehículo de nutrientes o como materia prima de la fotosíntesis, sin considerar su rol mecánico directo en la expansión celular.'
      }
    ],
    environmentContext: [
      'Esta entrada describe un mecanismo fisiológico general, válido tanto en cultivo de contenedor como en suelo directo, en interior o en exterior — la disponibilidad real de agua en cada sistema es un tema aparte, que desarrollan las entradas correspondientes de "Suelo y agua".'
    ],
    tags: ['fundamentos', 'agua'],
    relatedEntryIds: ['division-celular-elongacion-diferenciacion', 'sustrato-y-drenaje', 'capacidad-de-campo-agua-disponible'],
    sourceIds: ['academica-unne-crecimiento-y-desarrollo'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Agua y expansión celular — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué el agua es parte directa del mecanismo físico de elongación celular, y por qué el crecimiento en tamaño suele frenarse por falta de agua antes que la fotosíntesis.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'fotosintesis-respiracion-y-biomasa',
    slug: 'fotosintesis-respiracion-y-produccion-de-biomasa',
    categoryId: 'fundamentos',
    title: 'Fotosíntesis, respiración y producción de biomasa',
    summary: '"Luz y clima" describe qué es la luz y cómo medirla. Esta entrada mira la otra mitad de la ecuación: qué hace la planta con esa luz para convertirla, efectivamente, en más planta.',
    intro: 'Las entradas de "Luz y clima" (PAR, PPFD, espectro) describen el factor ambiental —la luz— en sí mismo. Esta entrada cambia el eje: cómo responde la planta a esa luz en términos de crecimiento, a través de la relación entre fotosíntesis (ganancia de carbono), respiración (su costo) y la biomasa que efectivamente queda disponible para crecer.',
    sections: [
      {
        id: 'ganancia-neta-de-carbono',
        title: 'Fotosíntesis y respiración: una ganancia neta, no bruta',
        paragraphs: [
          'La fotosíntesis captura energía lumínica para producir azúcares a partir de agua y dióxido de carbono — es la fuente de casi todo el carbono que termina formando parte del cuerpo de la planta. Pero no todo ese carbono fijado se convierte en crecimiento: la respiración, el proceso por el cual la planta libera parte de esa energía para sus propias funciones metabólicas, consume una porción de lo que la fotosíntesis produjo. El crecimiento real depende del balance neto entre ambos procesos, no de la fotosíntesis bruta por sí sola.'
        ]
      },
      {
        id: 'de-la-hoja-a-la-biomasa',
        title: 'De la superficie foliar a la biomasa: un índice cuantitativo',
        paragraphs: [
          'Un principio bien documentado en fisiología de cultivos vincula directamente la superficie foliar de una planta con su ganancia de biomasa: como las hojas son el principal órgano fotosintético, la relación entre el área foliar y el peso seco acumulado por unidad de tiempo (un índice llamado tasa de asimilación neta) funciona como una medida de la eficiencia productiva de la planta. Esto es coherente con un patrón general de fisiología de cultivos: las especies cultivadas invierten buena parte de su crecimiento inicial en expandir su superficie foliar, precisamente porque esa superficie es la que después sostiene la ganancia de biomasa del resto del ciclo.'
        ]
      },
      {
        id: 'la-curva-de-crecimiento',
        title: 'La curva de crecimiento: no es una línea recta',
        paragraphs: [
          'Al graficar el tamaño de una planta contra el tiempo, se obtiene típicamente una curva en forma de "S" (sigmoidea), con tres fases de velocidad distinta: una fase exponencial inicial (crecimiento lento en términos absolutos, pero acelerado en proporción, cuando hay pocas células con capacidad de dividirse), una fase lineal (incrementos similares en períodos iguales de tiempo) y una fase final de desaceleración que confluye con la senescencia. Esta forma de curva es un patrón general documentado en muchas especies vegetales, con variaciones reales según la especie —en algunas la fase lineal es apenas perceptible; en otras, se extiende mucho—.'
        ]
      }
    ],
    observations: [
      'Ver que una planta joven, con poca superficie foliar, crece más lento en términos absolutos que la misma planta semanas después, con más hojas desarrolladas, es compatible con la fase exponencial de la curva de crecimiento — no indica necesariamente un problema en la etapa temprana.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Esperar un ritmo de crecimiento constante a lo largo de todo el ciclo — la curva de crecimiento de la mayoría de las especies vegetales tiene fases con velocidades claramente distintas, no es una línea recta.'
      },
      {
        type: 'CONTEXT',
        description: 'Tratar la fotosíntesis medida en una sola hoja como equivalente a la ganancia de biomasa de toda la planta — la producción neta depende del balance con la respiración y de la superficie foliar total, no de la actividad de un único punto.'
      }
    ],
    environmentContext: [
      'Esta entrada no repite los factores ambientales que afectan la fotosíntesis (intensidad y espectro de luz, temperatura) — esos ya están desarrollados en la categoría "Luz y clima". El aporte de esta entrada es la respuesta de la planta: qué hace con esa luz en términos de biomasa, no qué es la luz en sí.'
    ],
    tags: ['fundamentos', 'luz'],
    relatedEntryIds: ['agua-y-expansion-celular', 'par-ppfd-medicion-de-luz', 'arquitectura-y-asignacion-de-recursos'],
    sourceIds: ['academica-unne-crecimiento-y-desarrollo'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Fotosíntesis, respiración y producción de biomasa — Atlas del Cultivo Argentino',
      seoDescription: 'Cómo se relacionan fotosíntesis, respiración y superficie foliar con la ganancia real de biomasa, y por qué la curva de crecimiento vegetal tiene forma de "S", no de línea recta.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'arquitectura-y-asignacion-de-recursos',
    slug: 'arquitectura-y-asignacion-de-recursos',
    categoryId: 'fundamentos',
    title: 'Arquitectura de la planta y asignación de recursos: raíz, tallo y biomasa',
    summary: 'Una planta no reparte su crecimiento al azar entre raíz y parte aérea: existe una correlación real y medible entre ambas, y un estudio directo sobre cáñamo la cuantificó con 46 genotipos distintos.',
    intro: '"Meristemos" describe de dónde sale el crecimiento nuevo. Esta entrada mira hacia dónde va ese crecimiento: cómo la planta reparte sus recursos entre raíz y parte aérea, qué papel juega la disponibilidad de nitrógeno en ese reparto, y qué tan distinto puede ser ese patrón entre genotipos de la misma especie.',
    sections: [
      {
        id: 'relacion-raiz-parte-aerea',
        title: 'La relación entre biomasa de raíz y de parte aérea',
        paragraphs: [
          'Un estudio de 2026 fenotipó 46 genotipos de cáñamo industrial (incluyendo variedades europeas, canadienses, chinas y estadounidenses de alto CBD) bajo condiciones controladas de invernadero, y encontró una correlación fuerte entre la biomasa de raíz y la de parte aérea (R=0.93): en términos generales, una planta con más biomasa de raíz también tiende a tener más biomasa aérea, y viceversa — un patrón de asignación de recursos coordinada, no independiente entre ambas partes de la planta.',
          'El mismo estudio encontró una variación considerable entre genotipos: 175% de diferencia en longitud total de raíz y en biomasa aérea entre el genotipo más grande y el más chico del panel, con una heredabilidad (proporción de esa variación explicada por la genética) de moderada a alta según el rasgo. Es evidencia directa de Cannabis sativa —aunque de cáñamo industrial en condiciones de invernadero con sustrato sin suelo, no necesariamente representativa de cultivo en tierra ni de todas las variedades de uso medicinal o recreativo—.'
        ]
      },
      {
        id: 'nitrogeno-y-biomasa-el-mecanismo-no-la-dosis',
        title: 'Nitrógeno y biomasa: el mecanismo, no una dosis',
        paragraphs: [
          'El nitrógeno es un componente estructural de proteínas y otras moléculas necesarias para formar tejido nuevo — por eso su disponibilidad se asocia, de forma bien documentada, con la cantidad de biomasa que una planta puede generar. Un estudio de 2023 con cáñamo floral (orientado a cannabinoides) a campo, en tres cultivares distintos, encontró que las plantas con nitrógeno suplementario alcanzaron más del doble de biomasa aérea, mayor altura final, mayor diámetro de tallo y más cobertura de canopia que las plantas sin ese agregado.',
          'Esta entrada no convierte ese hallazgo en una recomendación de dosis: la disponibilidad de nitrógeno participa en procesos fundamentales para la formación de biomasa, pero la respuesta real depende del cultivar, la etapa fisiológica, el resto de las condiciones ambientales y la disponibilidad de otros recursos — el mecanismo y la aplicación práctica (tablas, dosis, programas de fertilización) son temas de la categoría "Fertilización", no de esta entrada.'
        ]
      },
      {
        id: 'ramificacion-y-dominancia-apical',
        title: 'Ramificación: una nota, no un desarrollo completo',
        paragraphs: [
          'Parte de la arquitectura de una planta —cuántas ramas desarrolla y con qué vigor— depende del mecanismo de dominancia apical, ya descrito en detalle en la categoría Poda: mientras el meristemo apical del tallo principal está activo, inhibe el desarrollo de yemas laterales; remover ese meristemo (o doblar el tallo, en el caso del entrenamiento de bajo estrés) libera esa inhibición. Esta entrada no repite ese mecanismo — se limita a señalar que la arquitectura final de una planta es, en parte, resultado de esa dinámica hormonal, además de la asignación de biomasa entre raíz y parte aérea que describen las secciones anteriores.'
        ]
      }
    ],
    observations: [
      'Ver que dos plantas del mismo cultivar, con el mismo manejo, desarrollan sistemas de raíces de tamaño visiblemente distinto (por ejemplo, al trasplantar) es compatible con la variabilidad individual normal dentro de una misma genética — la correlación raíz-parte aérea es un patrón general, no una proporción fija idéntica en cada planta.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Convertir la asociación entre nitrógeno y biomasa en una regla de "más nitrógeno siempre es mejor" — la evidencia citada muestra una asociación en condiciones experimentales puntuales (cáñamo floral, tres cultivares, clima de desierto), no una relación ilimitada ni universal.'
      },
      {
        type: 'CONTEXT',
        description: 'Generalizar la variación genética de 175% en biomasa/raíz encontrada en cáñamo industrial de invernadero a cualquier comparación entre cultivares de Cannabis, incluyendo variedades no incluidas en ese panel ni evaluadas en esas condiciones.'
      }
    ],
    environmentContext: [
      'Un sistema radicular en contenedor (interior o exterior) tiene un volumen físico limitado por el tamaño de la maceta, algo que no ocurre en tierra directa — una restricción que puede modificar la relación raíz/parte aérea observada, sin que eso implique un problema de la planta en sí.'
    ],
    tags: ['fundamentos', 'cultivo', 'interior', 'exterior'],
    relatedEntryIds: ['meristemos-crecimiento-primario-secundario', 'diferencias-geneticas-crecimiento-cultivares', 'fertilizacion-y-nutricion', 'poda'],
    sourceIds: ['cientifica-morales-2026-arquitectura-raiz-canamo', 'cientifica-farnisa-2023-nitrogeno-canamo-floral-biomasa'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Arquitectura de la planta y asignación de recursos — Atlas del Cultivo Argentino',
      seoDescription: 'Cómo se relacionan la biomasa de raíz y de parte aérea, qué encontró un estudio directo sobre 46 genotipos de cáñamo, y qué mecanismo general conecta al nitrógeno con la producción de biomasa.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'diferencias-geneticas-crecimiento-cultivares',
    slug: 'diferencias-geneticas-en-el-crecimiento-entre-cultivares',
    categoryId: 'fundamentos',
    title: 'Diferencias genéticas en el crecimiento entre cultivares',
    summary: 'Preguntar "cuánto crece Cannabis" no tiene una sola respuesta: la evidencia genética muestra diferencias reales y cuantificadas en arquitectura de raíz, biomasa y umbral de floración entre genotipos de la misma especie.',
    intro: '"Arquitectura de la planta y asignación de recursos" ya muestra que existe variación genética real en cómo una planta reparte su crecimiento entre raíz y parte aérea. Esta entrada reúne esa evidencia de variación genética con la de otras entradas del atlas, para dejar explícito un punto editorial de fondo: ningún parámetro de crecimiento de Cannabis sativa debería presentarse como un valor único para "la especie".',
    sections: [
      {
        id: 'variacion-en-arquitectura-de-raiz-y-biomasa',
        title: 'Variación en arquitectura de raíz y biomasa',
        paragraphs: [
          'El estudio de 46 genotipos de cáñamo industrial ya citado en "Arquitectura de la planta y asignación de recursos" encontró una diferencia de 175% en longitud total de raíz y en biomasa aérea entre el genotipo más grande y el más chico del panel, con una heredabilidad de moderada a alta (0.45 a 0.78 según el rasgo) — es decir, buena parte de esa diferencia responde a la genética, no solo al ambiente en el que se midió.'
        ]
      },
      {
        id: 'variacion-en-umbral-fotoperiodico-y-tiempo-de-floracion',
        title: 'Variación en el umbral fotoperiódico y el tiempo hasta floración',
        paragraphs: [
          'La categoría "Luz y clima" ya documenta, con evidencia genética directa, que el umbral de duración de oscuridad necesario para disparar la floración varía entre cultivares —al punto de existir genes identificados (Autoflower1, Early1) que producen cultivares insensibles al fotoperíodo o que florecen antes que otros—. Un estudio con 10 cultivares drug-type bajo distintos fotoperiodos de floración encontró además que, incluso entre cultivares que sí responden al fotoperiodo, la demora hasta el inicio de floración varía de 0 a 4 días según el cultivar bajo el mismo régimen de luz.'
        ]
      },
      {
        id: 'por-que-esto-es-un-punto-editorial-de-fondo',
        title: 'Por qué esto es un punto editorial de fondo para todo el atlas',
        paragraphs: [
          'La consecuencia práctica de esta evidencia es que cualquier cifra puntual sobre crecimiento, biomasa, tiempo hasta floración o arquitectura de Cannabis sativa —en esta entrada o en cualquier otra del atlas— debería leerse como el resultado de un estudio con un material genético concreto, no como una constante de la especie. Cuando dos fuentes distintas dan cifras diferentes para lo aparentemente "lo mismo", una explicación real y documentada es que evaluaron genotipos distintos, no que una de las dos fuentes esté necesariamente equivocada.'
        ]
      }
    ],
    observations: [
      'Que dos plantas de distinta genética, cultivadas en las mismas condiciones, difieran notablemente en tamaño de raíz, biomasa total o tiempo hasta floración es una observación compatible con la variación genética documentada — no requiere, por sí sola, una explicación de manejo o de error de cultivo.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'OTHER',
        description: 'Presentar una cifra de crecimiento, biomasa o tiempo de floración obtenida con un cultivar o panel de genotipos puntual como si fuera una constante aplicable a "Cannabis sativa" en general.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Descartar una fuente por dar una cifra distinta a otra sobre el mismo tema, sin considerar primero si ambas evaluaron el mismo material genético en las mismas condiciones — la diferencia puede ser real y explicable por genotipo, no un error.'
      }
    ],
    environmentContext: [
      'La variación genética que describe esta entrada es independiente del ambiente de cultivo (interior o exterior): es una propiedad del material vegetal, aunque su expresión final —cuánto crece realmente una planta— sí depende de la interacción entre esa genética y el ambiente específico en el que se cultive.'
    ],
    tags: ['fundamentos', 'genética'],
    relatedEntryIds: ['arquitectura-y-asignacion-de-recursos', 'variacion-genetica-fotoperiodo', 'genetica-y-tipos'],
    sourceIds: [
      'cientifica-morales-2026-arquitectura-raiz-canamo',
      'academica-toth-2022-genetica-fotoperiodo-cannabis',
      'cientifica-ahrens-2023-photoperiod-flowering-indoor'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Diferencias genéticas en el crecimiento entre cultivares — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué no existe un valor único de crecimiento, biomasa o tiempo de floración para Cannabis sativa: evidencia genética directa de variación real entre cultivares y genotipos.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'estres-ambiental-y-crecimiento',
    slug: 'estres-ambiental-y-crecimiento-vegetal',
    categoryId: 'fundamentos',
    title: 'Estrés ambiental y crecimiento vegetal',
    summary: 'Frente a una condición desfavorable, una planta no solo "sufre": redirige recursos, y ese redireccionamiento casi siempre implica menos crecimiento en tamaño a cambio de otra cosa —defensa, supervivencia o reproducción—.',
    intro: 'Varias entradas de este atlas documentan, por separado, casos concretos de estrés ambiental afectando a Cannabis sativa: humedad relativa alta retrasando la floración (ver "Humedad relativa, transpiración y VPD"), sal agregada reduciendo biomasa (ver "Conductividad eléctrica y sales"), daño mecánico deliberado como el super cropping (ver Poda). Esta entrada conecta esos casos con un principio general de fisiología vegetal: por qué el estrés, en términos generales, tiende a limitar el crecimiento.',
    sections: [
      {
        id: 'el-costo-energetico-de-responder-al-estres',
        title: 'El costo energético de responder al estrés',
        paragraphs: [
          'Cuando una planta enfrenta una condición desfavorable —sequía, salinidad, daño físico, temperatura extrema—, activa respuestas fisiológicas y bioquímicas que tienen un costo energético real. Esa energía y esos recursos (agua, carbono, nitrógeno) que se destinan a responder al estrés no están disponibles, al mismo tiempo, para el crecimiento en tamaño. Este principio general —a veces descrito como un balance entre crecimiento y defensa— no es específico de Cannabis: es un patrón documentado en fisiología vegetal general, que las entradas específicas de este atlas ilustran con casos concretos de la especie.'
        ]
      },
      {
        id: 'no-todo-estres-es-igual',
        title: 'No todo estrés es igual, ni todos los efectos son iguales',
        paragraphs: [
          'El tipo de estrés y el momento del ciclo en que ocurre determinan qué se ve afectado. La humedad relativa alta durante floración, por ejemplo, retrasó la floración y redujo la biomasa en un estudio directo sobre Cannabis (ver "Humedad relativa, transpiración y VPD"); la sal agregada en concentraciones altas redujo el crecimiento de forma medible en otro estudio directo (ver "Conductividad eléctrica y sales"); el daño mecánico deliberado del super cropping se apoya en la lógica opuesta —un estrés controlado que, según la fisiología vegetal general, puede inducir un tallo más grueso, aunque sin evidencia directa de Cannabis que confirme ese resultado puntual—.',
          'Esta entrada no unifica esos casos en una única regla cuantitativa: los reúne bajo el mismo principio general (el estrés redirige recursos, casi siempre a costa del crecimiento en tamaño), remitiendo a cada entrada específica para el detalle y las condiciones exactas de cada estudio.'
        ]
      }
    ],
    observations: [
      'Ver que una planta bajo una condición adversa puntual crece más lento que una planta sin esa condición es una observación coherente con este principio general. No permite, por sí sola, anticipar cuánto se reducirá el crecimiento ni si el efecto será reversible — eso depende del tipo de estrés, su intensidad y el momento del ciclo, variables que cada entrada específica de este atlas desarrolla por separado.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Tratar "estrés" como una sola variable con un único efecto esperable — distintos tipos de estrés (hídrico, salino, mecánico, térmico) actúan por mecanismos distintos y con resultados distintos, documentados por separado en otras entradas de este atlas.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Asumir que todo estrés reduce el crecimiento de forma directamente proporcional a su intensidad — la relación real depende del tipo de estrés, la etapa del ciclo y el margen de tolerancia del cultivar, no es una función lineal simple.'
      }
    ],
    environmentContext: [
      'La exposición a la mayoría de los tipos de estrés ambiental que describe esta entrada suele ser más variable y menos controlable en exterior (clima real, sin control directo) que en un ambiente protegido, donde muchas de esas variables pueden mantenerse dentro de un rango elegido.'
    ],
    tags: ['fundamentos', 'ambiente', 'riesgo'],
    relatedEntryIds: ['humedad-relativa-transpiracion-vpd', 'conductividad-electrica-y-sales', 'super-cropping', 'fotosintesis-respiracion-y-biomasa'],
    sourceIds: ['academica-unne-crecimiento-y-desarrollo'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Estrés ambiental y crecimiento vegetal — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué el estrés ambiental tiende a limitar el crecimiento en tamaño de una planta, y cómo se conectan los casos específicos de Cannabis sativa ya documentados en otras entradas del atlas.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'elongacion-stretch-floracion',
    slug: 'elongacion-stretch-en-la-transicion-a-floracion',
    categoryId: 'fundamentos',
    title: 'Elongación ("stretch") en la transición a floración',
    summary: 'El "stretch" no dura un número fijo de semanas ni implica que la planta vaya a duplicar o triplicar su tamaño en cualquier caso: un estudio directo sobre Cannabis sativa muestra un patrón mucho más acotado en el tiempo, y con un límite explícito de cuánto se puede generalizar.',
    intro: 'Es común escuchar que, al iniciar floración, Cannabis sativa atraviesa un "estirón" (stretch) de duración fija, o que su tamaño se duplica o triplica. Esta entrada revisa esas dos afirmaciones puntuales contra un estudio directo sobre la especie que midió la elongación de entrenudos día por día tras el cambio de fotoperiodo.',
    sections: [
      {
        id: 'que-encontro-el-estudio-directo',
        title: 'Qué encontró un estudio directo sobre Cannabis sativa',
        paragraphs: [
          'Un estudio de 2024 sobre Cannabis sativa siguió el desarrollo de la inflorescencia después de cambiar a fotoperiodo de día corto, y describió dos fases: una primera fase de elongación rápida de entrenudos y del tallo principal, concentrada entre los días 5 y 10 después del cambio de fotoperiodo; y una segunda fase en la que esa elongación de entrenudos nuevos se detiene y se forma la inflorescencia condensada.',
          'Esto contradice la idea de un "stretch" que dura de forma pareja dos o tres semanas completas: en este estudio, el grueso de la elongación ocurrió en una ventana bastante más acotada (unos 5 días), seguida por un freno relativamente abrupto — no una desaceleración lenta y pareja a lo largo de varias semanas.'
        ]
      },
      {
        id: 'el-limite-explicito-del-estudio',
        title: 'El límite explícito del estudio: un solo cultivar',
        paragraphs: [
          'Los propios autores del estudio señalan una limitación importante: trabajaron con un único cultivar medicinal comercial, y advierten explícitamente que "vale la pena considerar la posibilidad de que estos hallazgos varíen entre diferentes cultivares de Cannabis". Esto es coherente con lo que ya describe "Diferencias genéticas en el crecimiento entre cultivares": no hay razón para asumir que la duración exacta o la magnitud de esta elongación sea idéntica en cualquier genotipo.'
        ]
      },
      {
        id: 'sobre-duplicar-o-triplicar-el-tamano',
        title: 'Sobre "duplicar o triplicar" el tamaño',
        paragraphs: [
          'La afirmación de que la planta "puede duplicar o triplicar su tamaño" durante el stretch, y que eso depende de si la genética es de tipo "indica" o "sativa", circula ampliamente en guías de cultivo comerciales, pero dentro de las fuentes consultadas para esta investigación no se encontró un estudio científico revisado por pares que mida específicamente ese porcentaje de aumento de altura ni que lo asocie de forma validada a esas dos categorías —que, además, "Genética y tipos" ya describe como clasificaciones de origen histórico y comercial, no botánicas—. El estudio directo citado arriba documenta que hubo una diferencia de altura entre plantas de día largo y día corto medida a los 30 días, sin dar una cifra de "veces" de aumento ni asociarla a esa distinción indica/sativa.'
        ]
      }
    ],
    observations: [
      'Ver que una planta elonga notablemente sus entrenudos en los primeros días después de reducir el fotoperiodo es una observación compatible con el patrón documentado en el estudio citado. Fijar una fecha exacta de "fin del stretch" a partir de una regla de semanas es una interpretación que ese mismo estudio no respalda —el patrón que encontró depende del cultivar, y la ventana medida fue de días, no de semanas—.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Elongación notable de entrenudos y del tallo principal en los primeros días tras el cambio a fotoperiodo de día corto, seguida de una desaceleración y la aparición de inflorescencias más compactas — el patrón general que describe el estudio citado, aunque su duración exacta puede variar según el cultivar.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Que la elongación se prolongue más o menos días que en otra planta o en otro cultivo previo no alcanza, por sí sola, para concluir un problema — la duración de esta fase varía según la genética, según reconocen los propios autores del estudio citado.'
      }
    ],
    commonMistakes: [
      {
        type: 'OTHER',
        description: 'Presentar una duración fija de dos o tres semanas para el "stretch" como si fuera una regla biológica — el estudio directo disponible describe una fase de elongación rápida mucho más acotada en el tiempo (días, no semanas), aunque advierte que puede variar por cultivar.'
      },
      {
        type: 'OTHER',
        description: 'Afirmar que la planta "duplica o triplica" su tamaño según sea de tipo indica o sativa — esa cifra y esa asociación no tienen, dentro de las fuentes consultadas, respaldo de un estudio científico revisado por pares.'
      }
    ],
    environmentContext: [
      'En un ambiente protegido, el cambio de fotoperiodo que dispara esta fase de elongación lo decide el cultivador en el momento que elige; en exterior, lo dispara el acortamiento natural de los días, en una fecha que depende de la estación y la latitud (ver "Fotoperiodo según latitud argentina").'
    ],
    tags: ['fundamentos', 'fotoperiodo'],
    relatedEntryIds: ['crecimiento-vegetal-y-desarrollo', 'diferencias-geneticas-crecimiento-cultivares', 'luz-y-fotoperiodo', 'genetica-y-tipos'],
    sourceIds: ['cientifica-alter-2024-cannabis-fotoperiodo-giberelina'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Elongación (stretch) en la transición a floración — Atlas del Cultivo Argentino',
      seoDescription: 'Qué encontró un estudio directo sobre Cannabis sativa al medir la elongación de entrenudos tras el cambio de fotoperiodo, y por qué no existe evidencia de una duración fija de semanas ni de que la planta "duplique o triplique" su tamaño.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'senescencia-y-final-del-desarrollo',
    slug: 'senescencia-y-final-del-desarrollo',
    categoryId: 'fundamentos',
    title: 'Senescencia y final del desarrollo',
    summary: 'La senescencia no es que la planta "se muera de a poco sin motivo": es una etapa final activa y regulada, en la que la planta redirige sus propios nutrientes hacia las partes que todavía se están desarrollando.',
    intro: 'El "ciclo de vida" de Cannabis sativa que describe otra entrada de esta categoría termina en la cosecha, un punto de manejo decidido por quien cultiva. Pero la biología de la planta tiene su propio final: la senescencia. Esta entrada describe qué es ese proceso, en términos de fisiología vegetal general, dado que no se encontró, dentro de las fuentes consultadas para esta investigación, un estudio de senescencia dedicado específicamente a Cannabis sativa.',
    sections: [
      {
        id: 'que-es-la-senescencia',
        title: 'Qué es la senescencia',
        paragraphs: [
          'La senescencia es la etapa final del desarrollo de una planta o de uno de sus órganos (una hoja, por ejemplo), descrita en fisiología vegetal como una transición funcional: la planta deja de priorizar la asimilación de nutrientes y pasa a movilizarlos hacia otras partes. Lejos de ser un simple "apagado", es un proceso activo y regulado por la propia planta.'
        ]
      },
      {
        id: 'que-la-dispara',
        title: 'Qué dispara la senescencia',
        paragraphs: [
          'Una revisión de fisiología vegetal general documenta tres tipos de factores que disparan la senescencia: el desarrollo (la edad es el factor interno principal), hormonales (hormonas como el etileno, el ácido jasmónico, el ácido salicílico y el ácido abscísico la promueven; las citoquininas y las giberelinas la retrasan) y ambientales (sequía, estrés salino, oscuridad, temperaturas extremas, deficiencia de nutrientes, patógenos). Ya que varios de estos factores hormonales y ambientales aparecen también en otras entradas de este atlas —giberelinas y fotoperiodo en "Luz como señal temporal", estrés hídrico y salino en las entradas correspondientes—, es razonable esperar que la senescencia de Cannabis sativa responda a mecanismos similares, aunque esta entrada no puede citar un estudio que lo confirme directamente en la especie.'
        ]
      },
      {
        id: 'hacia-donde-van-los-nutrientes',
        title: 'Hacia dónde van los nutrientes durante la senescencia',
        paragraphs: [
          'Durante la senescencia, los nutrientes que la planta moviliza desde el tejido que está envejeciendo se exportan hacia órganos en desarrollo activo: brotes nuevos, hojas jóvenes, flores o semillas. Es el mismo principio general de movilidad de nutrientes que ya describe "Fertilización y nutrición" para explicar por qué un síntoma de carencia aparece primero en hojas viejas o jóvenes según el nutriente — la senescencia es, en cierto sentido, ese mismo mecanismo de movilidad llevado a su versión más completa al final de la vida de un órgano.'
        ]
      },
      {
        id: 'lo-que-esta-entrada-no-hace',
        title: 'Lo que esta entrada no hace',
        paragraphs: [
          'Esta entrada no valida ni recomienda la práctica difundida de "lavado de raíces" o suspensión del riego con nutrientes en los días previos a la cosecha, presentada a veces como una forma de "forzar" a la planta a movilizar sus reservas. Esa práctica ya se documenta, sin evidencia científica que la respalde para Cannabis sativa, en "Manejo poscosecha: secado y curado" — esta entrada no agrega evidencia nueva sobre ese punto puntual, solo señala que el mecanismo general de movilización de nutrientes durante la senescencia es real en fisiología vegetal, lo cual no confirma, por sí solo, que esa práctica puntual tenga el efecto que se le atribuye.'
        ]
      }
    ],
    observations: [
      'Ver que las hojas más viejas de una planta amarillean y mueren hacia el final del ciclo, mientras las inflorescencias siguen desarrollándose, es compatible con el proceso general de senescencia y movilización de nutrientes — no es, por sí solo, evidencia de una carencia nutricional que deba corregirse.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Amarillamiento progresivo y muerte de las hojas más viejas hacia el final del ciclo, mientras las estructuras reproductivas (inflorescencias) continúan su desarrollo — compatible con el proceso general de senescencia, no necesariamente una señal de problema.'
      }
    ],
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Tratar el amarillamiento de hojas viejas al final del ciclo como un síntoma de carencia nutricional a corregir, sin considerar que puede corresponder al proceso normal de senescencia y removilización de nutrientes hacia las inflorescencias en desarrollo.'
      },
      {
        type: 'OTHER',
        description: 'Presentar una práctica de manejo de fin de ciclo (como la suspensión de nutrientes) como validada por la evidencia general de senescencia — el mecanismo general es real, pero eso no confirma automáticamente que una práctica puntual de manejo tenga el efecto que se le atribuye en Cannabis sativa.'
      }
    ],
    environmentContext: null,
    tags: ['fundamentos', 'ciclo'],
    relatedEntryIds: ['ciclo-de-vida', 'fertilizacion-y-nutricion', 'poscosecha', 'cosecha-y-maduracion'],
    sourceIds: ['academica-guo-2021-senescencia-foliar-revision'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Senescencia y final del desarrollo — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es la senescencia vegetal, qué la dispara, y por qué el amarillamiento de hojas viejas al final del ciclo no es necesariamente un síntoma de carencia nutricional.',
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
    relatedEntryIds: ['cosecha-y-maduracion', 'ciclo-de-vida', 'almacenamiento', 'senescencia-y-final-del-desarrollo'],
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
  },

  // ============================================================================================
  // Ronda 2026-09-18 — segunda entrada para cada categoría que tenía una sola (ninguna categoría
  // debe abrir en una pantalla con un único recurso). Cada entrada nueva cubre un ángulo distinto
  // del ya cubierto por la entrada existente de la misma categoría, documentado en su propio
  // `intro`, y usa fuentes ya verificadas en el registro (`sources.js`) o verificadas en esta
  // misma ronda antes de citarlas — ninguna cifra ni afirmación nueva sin respaldo.
  // ============================================================================================
  {
    id: 'evaluacion-visual-del-suelo',
    slug: 'evaluacion-visual-del-suelo',
    categoryId: 'suelo-y-agua',
    title: 'Evaluación visual del suelo',
    summary: 'Antes de que exista un análisis de laboratorio, el propio suelo ya muestra señales visuales y táctiles —estructura, porosidad, olor, presencia de raíces— que orientan sobre su calidad.',
    intro: '"Sustrato, agua y drenaje" describe la relación física entre agua y aire dentro de un sustrato de maceta. Esta entrada mira un paso anterior, más relevante para quien cultiva directo en tierra: cómo leer la calidad de un suelo real a simple vista y al tacto, sin instrumental de laboratorio, antes incluso de decidir si ese suelo necesita alguna enmienda.',
    sections: [
      {
        id: 'por-que-evaluar-a-simple-vista',
        title: 'Por qué una evaluación visual, no solo un análisis de laboratorio',
        paragraphs: [
          'Un análisis de laboratorio da valores precisos, pero no siempre está disponible ni es lo primero que se necesita: una guía de evaluación visual —elaborada por la Facultad de Agronomía de la Universidad Nacional de La Pampa junto con la EEA INTA Anguil— sistematiza indicadores que cualquier persona puede observar y sentir en el propio suelo, como referencia previa o complementaria a un análisis de laboratorio, no como su reemplazo.',
          'El principio de fondo es el mismo que ya describe "Sustrato, agua y drenaje" para una maceta: la estructura física del suelo —cómo se agrupan sus partículas— determina cuánto espacio poroso hay disponible para que convivan agua y aire, algo que también puede observarse en tierra directa, a otra escala.'
        ]
      },
      {
        id: 'que-mirar-y-que-sentir',
        title: 'Qué mirar y qué sentir',
        paragraphs: [
          'Entre los indicadores visuales y táctiles que este tipo de guías documenta están la estructura del suelo (si se agrega en terrones porosos o se compacta en bloques macizos), la facilidad con la que el agua se infiltra tras un riego o una lluvia, la presencia de raíces y de actividad biológica visible (como lombrices o galerías), y el color y el olor del suelo húmedo —un suelo con buena aireación suele oler "a tierra"; un olor a estancado o azufrado es compatible con condiciones de anegamiento prolongado, el mismo estado de hipoxia radicular que describe "Sustrato, agua y drenaje".',
          'Ninguno de estos indicadores, por separado, cierra una conclusión: son señales que, leídas en conjunto, orientan sobre si el suelo sostiene bien la relación agua-aire-raíz, o si tiene una limitación física (compactación, encharcamiento) que conviene atender antes de cultivar.'
        ]
      }
    ],
    observations: [
      'Notar que un puñado de suelo húmedo se desarma en terrones porosos al apretarlo y soltarlo es una observación directa de estructura. Concluir de inmediato "este suelo es excelente para cualquier cultivo" es una interpretación que todavía no considera otras variables (nutrientes, pH, historia de uso) que esta entrada no evalúa.',
      'Un suelo compactado y uno anegado pueden mostrar señales distintas (el primero se resiste al tacto y al riego se infiltra lento; el segundo huele a estancado) aunque ambos terminen limitando el oxígeno disponible para la raíz por caminos distintos.'
    ],
    signals: [
      {
        level: 'EXPECTED',
        description: 'Suelo que se agrega en terrones porosos al tacto, con infiltración de agua visible en minutos tras un riego, y presencia de raíces o actividad biológica (lombrices, galerías) en los primeros centímetros.'
      },
      {
        level: 'ATTENTION',
        description: 'Suelo que se compacta en bloques macizos sin estructura granular, agua que queda estancada en superficie mucho tiempo después de un riego, u olor a estancado en profundidad son señales que ameritan revisar compactación o drenaje antes de cultivar directo en ese lugar.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Un suelo seco y duro en superficie durante una sequía prolongada no necesariamente indica mala estructura de fondo — la sequedad superficial es esperable en esas condiciones climáticas y no sustituye a una evaluación con el suelo en un estado de humedad más representativo.'
      }
    ],
    commonMistakes: [
      {
        type: 'OBSERVATION',
        description: 'Evaluar el suelo solo por su aspecto seco en superficie, sin cavar unos centímetros para ver su estructura real en profundidad.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Tratar un solo indicador favorable (por ejemplo, buen olor) como si garantizara por sí solo que el suelo es apto, sin considerar el resto de los indicadores en conjunto.'
      },
      {
        type: 'CONTEXT',
        description: 'Aplicar los mismos indicadores visuales de un suelo de campo abierto a un sustrato de maceta sin ajustar la lectura — son sistemas físicamente distintos, como ya señala "Sustrato, agua y drenaje".'
      }
    ],
    environmentContext: [
      'Esta evaluación tiene más sentido para quien cultiva en tierra directa (exterior) que para quien usa un sustrato preparado en maceta, donde la estructura ya fue definida por la mezcla elegida. En ambos casos, los indicadores generales —estructura, infiltración, olor, actividad biológica— describen el mismo principio físico de fondo.'
    ],
    tags: ['suelo', 'agua', 'drenaje'],
    relatedEntryIds: ['sustrato-y-drenaje', 'textura-estructura-porosidad', 'materia-organica-actividad-biologica'],
    sourceIds: [
      'academica-unlpam-inta-guia-evaluacion-visual-suelo',
      'oficial-inta-relacion-suelo-planta-agua'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'Evaluación visual del suelo — Atlas del Cultivo Argentino',
      seoDescription: 'Qué indicadores visuales y táctiles —estructura, infiltración, olor, actividad biológica— ayudan a leer la calidad de un suelo real antes de cultivar en tierra directa.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'textura-estructura-porosidad',
    slug: 'textura-estructura-porosidad',
    categoryId: 'suelo-y-agua',
    title: 'Textura, estructura y porosidad',
    summary: 'Tres palabras que suelen usarse como sinónimos vagos de "buena tierra" describen en realidad tres propiedades físicas distintas y medibles — y ninguna de las tres, por sí sola, garantiza un buen desarrollo radicular.',
    intro: '"Sustrato, agua y drenaje" describe cómo un sustrato reparte agua y aire para la raíz, sin detenerse en qué hace, físicamente, que reparta esas dos cosas de una forma u otra. Esta entrada retoma exactamente ese punto: qué es la textura, qué es la estructura y qué es la porosidad de un suelo o sustrato — tres conceptos de la física de suelos, no específicos de Cannabis, que explican el mecanismo detrás de esa relación agua-aire.',
    sections: [
      {
        id: 'que-es-la-textura',
        title: 'Qué es la textura',
        paragraphs: [
          'La textura describe la proporción relativa de partículas minerales de distinto tamaño —arena, limo y arcilla— que componen un suelo. Es, en un suelo mineral natural, una propiedad relativamente fija: no cambia de un día para el otro con el manejo, a diferencia de la estructura.',
          'Esta propiedad, en el sentido estricto de la física de suelos, describe un suelo mineral natural. Un sustrato de cultivo en contenedor —armado a partir de turba, fibra de coco, perlita u otros componentes— no se clasifica de la misma manera: esa composición se trata en "Componentes de sustrato para cultivo en contenedor", una pregunta relacionada pero distinta.'
        ]
      },
      {
        id: 'que-es-la-estructura',
        title: 'Qué es la estructura',
        paragraphs: [
          'La estructura describe cómo esas partículas se agrupan en agregados (a veces llamados "peds" en la literatura de suelos) y cómo esos agregados se asocian en unidades mayores. A diferencia de la textura, la estructura sí puede modificarse por manejo: la FAO señala al agua como el factor con mayor efecto sobre la estructura del suelo — trabajar o compactar un suelo cuando está muy húmedo puede dañar esa estructura de forma medible.',
          'La estructura es la que determina, en la práctica, cuánto espacio poroso hay disponible y cómo se reparte entre agua y aire — el mismo principio físico que "Sustrato, agua y drenaje" describe a partir de su efecto (retención y drenaje), no de su causa.'
        ]
      },
      {
        id: 'que-es-la-porosidad',
        title: 'Qué es la porosidad',
        paragraphs: [
          'La porosidad es el espacio del volumen total del suelo que no está ocupado por materia mineral ni orgánica: es el espacio disponible para que lo ocupen el aire o el agua. La FAO da una referencia general para ese espacio poroso total: "idealmente, debería ser un 50% del volumen del suelo".',
          'Esa cifra es una referencia orientativa de agronomía general, publicada por la propia FAO como un ideal de referencia —no un mínimo obligatorio para que un suelo o sustrato funcione, ni una cifra validada específicamente para Cannabis sativa—. Un suelo o sustrato real puede apartarse de ese 50% y seguir sosteniendo una planta sana; esta entrada no fija un umbral por debajo del cual algo "falla".'
        ]
      }
    ],
    observations: [
      'Ver que un suelo o sustrato se desarma en agregados porosos al tacto (ver "Evaluación visual del suelo") es una observación compatible con buena estructura. Concluir de esa sola observación un porcentaje exacto de porosidad es una interpretación que excede lo que permite ver o sentir a simple vista.',
      'Que la textura de un suelo no cambie con el manejo no significa que su comportamiento tampoco cambie: la misma textura puede comportarse mejor o peor según el estado de su estructura, que sí es sensible al manejo.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Tratar la cifra de "50% de espacio poroso" como un umbral estricto que hay que alcanzar o medir — la propia FAO la presenta como una referencia ideal de agronomía general, no como un mínimo obligatorio ni una cifra validada para Cannabis.'
      },
      {
        type: 'CONTEXT',
        description: 'Confundir textura (composición mineral, relativamente fija) con estructura (agregación de esas partículas, sensible al manejo) — son dos propiedades distintas, y solo la segunda cambia según cómo se trabaje el suelo.'
      },
      {
        type: 'CONTEXT',
        description: 'Aplicar el concepto de "textura" (arena/limo/arcilla) directamente a un sustrato de cultivo en contenedor sin ajustar la lectura — un sustrato armado con turba, fibra de coco o perlita no es un suelo mineral natural y se describe mejor por sus componentes (ver "Componentes de sustrato para cultivo en contenedor").'
      }
    ],
    environmentContext: [
      'La textura de un suelo de campo (exterior) depende de su origen geológico y no se elige; la composición de un sustrato de contenedor (interior o exterior) sí se elige, combinando materiales distintos — la lógica de "textura fija" no aplica de la misma manera a ambos casos, aunque el principio de fondo (partículas, agregación, espacio poroso) sea el mismo.'
    ],
    tags: ['suelo', 'interior', 'exterior'],
    relatedEntryIds: ['sustrato-y-drenaje', 'evaluacion-visual-del-suelo', 'componentes-de-sustrato'],
    sourceIds: ['oficial-fao-soils-portal-propiedades-fisicas'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Textura, estructura y porosidad — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es la textura, qué es la estructura y qué es la porosidad de un suelo o sustrato, y por qué la referencia de "50% de espacio poroso" de la FAO es orientativa, no una regla estricta.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'capacidad-de-campo-agua-disponible',
    slug: 'capacidad-de-campo-agua-disponible',
    categoryId: 'suelo-y-agua',
    title: 'Capacidad de campo, punto de marchitez y agua disponible',
    summary: 'No toda el agua que un suelo o sustrato retiene está disponible para la raíz: hay un rango medible entre "saturado de agua" y "seco al punto de matar a la planta", y ese rango varía —a veces mucho— según el tipo de suelo.',
    intro: '"Sustrato, agua y drenaje" describe, en términos generales, que el sustrato retiene agua y deja drenar el exceso. Esta entrada precisa esa idea con tres conceptos de la física de suelos que dan un vocabulario más exacto: capacidad de campo, punto de marchitez permanente y agua disponible.',
    sections: [
      {
        id: 'capacidad-de-campo',
        title: 'Capacidad de campo',
        paragraphs: [
          'Después de saturar un suelo con agua y dejar que el exceso drene por gravedad, el agua que queda retenida es lo que se llama capacidad de campo: un estado en el que los poros grandes ya tienen aire y agua a la vez, mientras los poros chicos siguen llenos de agua. Un manual de riego de la FAO describe ese estado como "ideal para el crecimiento del cultivo" —una referencia general de agronomía, no una cifra específica medida en Cannabis sativa—.'
        ]
      },
      {
        id: 'punto-de-marchitez',
        title: 'Punto de marchitez permanente',
        paragraphs: [
          'A medida que un suelo sigue secándose más allá de la capacidad de campo, llega un punto en el que el agua que queda está retenida con demasiada fuerza como para que la raíz pueda extraerla — ese es el punto de marchitez permanente. La planta no muere ahí porque "no queda agua" en términos absolutos: muere porque el agua que queda ya no está disponible para ella.'
        ]
      },
      {
        id: 'agua-disponible-y-por-que-varia',
        title: 'Agua disponible: por qué varía según el suelo',
        paragraphs: [
          'El agua disponible es la diferencia entre la capacidad de campo y el punto de marchitez permanente — el rango real de agua que la planta puede usar entre esos dos extremos. La misma fuente de la FAO da valores de referencia según la textura del suelo: entre 25 y 100 mm de agua por metro en suelos arenosos, entre 100 y 175 mm/m en suelos francos, y entre 175 y 250 mm/m en suelos arcillosos.',
          'La propia fuente aclara, de forma explícita, que estos valores "son constantes para un suelo dado, pero varían ampliamente de un tipo de suelo a otro" — es la fuente misma la que descarta una cifra única aplicable a cualquier suelo, y con más razón a cualquier sustrato de cultivo en contenedor, que es un sistema físico distinto al suelo de campo (ver "Textura, estructura y porosidad").'
        ]
      }
    ],
    observations: [
      'Que un sustrato recién regado se sienta pesado y húmedo no significa necesariamente que esté en capacidad de campo: ese estado se alcanza recién después de que el exceso drenó, no en el momento mismo del riego.',
      'Ver una planta marchita no distingue por sí solo si el sustrato llegó al punto de marchitez permanente o si se trata de un marchitamiento temporario por otra causa (calor, por ejemplo) — esta entrada no desarrolla esa distinción, que depende de si el marchitamiento se revierte al bajar la temperatura sin regar.'
    ],
    signals: [
      {
        level: 'AMBIGUOUS',
        description: 'Una planta marchita que se recupera sola, sin riego, al bajar la temperatura ambiente, es compatible con un marchitamiento temporario por calor, no con haber alcanzado el punto de marchitez permanente — esta entrada no evalúa ese fenómeno en detalle.'
      }
    ],
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Tomar los valores de agua disponible por textura (arena, franco, arcilla) que da esta fuente y aplicarlos directamente, sin ajuste, a un sustrato de cultivo en contenedor — son valores de referencia para suelo de campo, un sistema físico distinto.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Asumir que llegar a capacidad de campo es lo mismo que "sustrato recién regado" — la capacidad de campo es el estado posterior al drenaje del exceso, no el momento del riego en sí.'
      }
    ],
    environmentContext: [
      'El concepto de capacidad de campo, punto de marchitez y agua disponible aplica tanto a un suelo de campo (exterior) como a un sustrato de contenedor (interior o exterior), aunque los valores de referencia citados en esta entrada son específicos de suelo de campo por textura, no de sustratos de maceta.'
    ],
    tags: ['suelo', 'agua', 'interior', 'exterior'],
    relatedEntryIds: ['sustrato-y-drenaje', 'textura-estructura-porosidad', 'agua-y-expansion-celular'],
    sourceIds: ['oficial-fao-brouwer-heibloem-1985-capacidad-campo-agua-disponible'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Capacidad de campo, punto de marchitez y agua disponible — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es la capacidad de campo, qué es el punto de marchitez permanente, y por qué el agua disponible entre ambos varía ampliamente según el tipo de suelo, según una guía de riego de la FAO.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'materia-organica-actividad-biologica',
    slug: 'materia-organica-y-actividad-biologica',
    categoryId: 'suelo-y-agua',
    title: 'Materia orgánica y actividad biológica del suelo',
    summary: '"Evaluación visual del suelo" nombra la actividad biológica como uno de varios indicadores a simple vista. Esta entrada explica qué hay detrás de esa actividad: la materia orgánica, y por qué cumple varias funciones a la vez, no solo la de "nutrir".',
    intro: '"Evaluación visual del suelo" menciona la presencia de lombrices y galerías como un indicador observable de actividad biológica, sin desarrollar por qué esa actividad ocurre. Esta entrada retoma ese punto: qué es la materia orgánica del suelo, qué funciones cumple, y qué prácticas documentadas la reducen.',
    sections: [
      {
        id: 'que-es-y-cuanta-hay',
        title: 'Qué es la materia orgánica y cuánta hay, en general',
        paragraphs: [
          'La materia orgánica del suelo es el conjunto de residuos vegetales y animales en distintos grados de descomposición, junto con los organismos vivos que la producen y la procesan. Una publicación de la FAO da una referencia general: "la mayoría de los suelos contienen 2-10 por ciento de materia orgánica" — presentada explícitamente como una referencia para "la mayoría de los suelos", no como una cifra universal ni como un dato medido en sustratos de cultivo en contenedor, donde el compost puede representar una proporción deliberadamente mucho mayor (ver "Componentes de sustrato para cultivo en contenedor").'
        ]
      },
      {
        id: 'que-funciones-cumple',
        title: 'Qué funciones cumple, más allá de nutrir',
        paragraphs: [
          'La misma fuente describe varias funciones a la vez: la materia orgánica ayuda a unir partículas del suelo en agregados (la estructura que describe "Textura, estructura y porosidad"), mejora la infiltración y retención de agua, y ofrece hábitat y alimento a los organismos del suelo que, a su vez, ciclan nutrientes y modifican la estructura física. Ninguna de estas funciones depende únicamente de la cantidad total de materia orgánica: incluso en proporciones bajas, la fuente señala que "es muy importante".'
        ]
      },
      {
        id: 'que-la-reduce',
        title: 'Qué prácticas documentadas la reducen',
        paragraphs: [
          'La misma fuente de la FAO documenta tres tipos de prácticas que reducen la materia orgánica del suelo con el tiempo: las que reducen la producción de biomasa vegetal (monocultivo, barbecho desnudo), las que reducen el aporte de residuos orgánicos (quema de rastrojos, sobrepastoreo, remoción de residuos de cosecha) y las que aumentan la velocidad de descomposición —el laboreo del suelo es, según la fuente, "una de las prácticas principales que reduce el nivel de materia orgánica"—. Esta descripción corresponde a manejo de suelo de campo (exterior); esta entrada no evalúa cómo se traduce, si es que se traduce, a un sustrato de contenedor.'
        ]
      }
    ],
    observations: [
      'Ver actividad biológica visible —lombrices, galerías, olor "a tierra"— es una observación compatible con materia orgánica activa (ver "Evaluación visual del suelo"). No permite, por sí sola, estimar un porcentaje de materia orgánica sin un análisis específico.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Asumir que "más materia orgánica siempre es mejor" sin límite — la fuente citada no sostiene una relación lineal ilimitada, solo que incluso una proporción baja ya cumple funciones importantes.'
      },
      {
        type: 'CONTEXT',
        description: 'Tratar toda la conversación sobre "suelo vivo" o microbiología como si fuera lo mismo que materia orgánica — la materia orgánica es el sustento físico y nutricional de esa actividad biológica, pero son dos conceptos distintos (ver "Suelo vivo y microbiología").'
      }
    ],
    environmentContext: [
      'Las prácticas que reducen materia orgánica citadas en esta entrada (laboreo, quema de rastrojos, monocultivo) corresponden a manejo de suelo de campo (exterior). En un sustrato de contenedor (interior o exterior), la materia orgánica suele incorporarse de forma deliberada como componente de la mezcla (compost), un proceso distinto al de acumulación o pérdida natural en un suelo de campo.'
    ],
    tags: ['suelo', 'interior', 'exterior'],
    relatedEntryIds: ['evaluacion-visual-del-suelo', 'componentes-de-sustrato', 'suelo-vivo-y-microbiologia'],
    sourceIds: ['oficial-fao-a0100e-materia-organica-suelo'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Materia orgánica y actividad biológica del suelo — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es la materia orgánica del suelo, qué funciones cumple más allá de nutrir, y qué prácticas documentadas por la FAO la reducen con el tiempo.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'componentes-de-sustrato',
    slug: 'componentes-de-sustrato',
    categoryId: 'suelo-y-agua',
    title: 'Componentes de sustrato para cultivo en contenedor',
    summary: 'Turba, fibra de coco, perlita, vermiculita y compost no son intercambiables: cada uno aporta una combinación distinta de retención de agua, aireación y aporte de nutrientes, y las mezclas más usadas combinan varios en vez de depender de uno solo.',
    intro: '"Sustrato, agua y drenaje" describe el sustrato de cultivo en contenedor por su función física (retener agua y dejar espacio para el aire), sin detenerse en de qué está hecho. Esta entrada mira esa otra pregunta: qué materiales se usan habitualmente para armar un sustrato de contenedor, y qué aporta cada uno por separado.',
    sections: [
      {
        id: 'turba',
        title: 'Turba (peat moss)',
        paragraphs: [
          'La turba de Sphagnum retiene una gran cantidad de agua y aire a la vez, y se descompone muy lentamente en comparación con otros componentes orgánicos. Es naturalmente ácida (pH aproximado 3.5–4.0 según una guía de extensión agrícola), por lo que las mezclas que la usan como base suelen necesitar una corrección de pH (encalado) para no partir de un sustrato demasiado ácido.'
        ]
      },
      {
        id: 'fibra-de-coco-perlita-vermiculita',
        title: 'Fibra de coco, perlita y vermiculita',
        paragraphs: [
          'La fibra de coco tiene un pH menos ácido que la turba (aproximadamente 5.5–6.8), es más duradera y más fácil de rehumedecer una vez seca, pero según la misma fuente suele traer más conductividad eléctrica y sales solubles que la turba —una variable relevante para quien mida CE en su sustrato (ver "Conductividad eléctrica y sales")—.',
          'La perlita mejora la aireación y es prácticamente estéril y de pH neutro, sin aportar nutrientes por sí misma. La vermiculita cumple una función de aireación parecida, pero retiene más agua que la perlita y puede aportar algo de potasio, magnesio y otros minerales traza — dos materiales que suelen agruparse como "aireantes" pero que no se comportan igual.'
        ]
      },
      {
        id: 'compost-y-mezclas',
        title: 'Compost y proporciones de mezcla',
        paragraphs: [
          'El compost retiene agua y aporta nutrientes de forma directa, con un pH generalmente entre 6.5 y 8. La misma guía de extensión da proporciones de mezcla habituales para estos componentes, pero aclara de forma explícita que son "guía general, no reglas fijas": cada productor suele ajustar su propia receta según el material disponible y el cultivo.',
          'Un estudio del INTA (2015) ilustra ese tipo de ajuste con un caso concreto, aunque no de Cannabis: comparó ceniza volcánica contra perlita expandida como aireante, mezcladas con turba al 20% o 50%, y encontró que ambos materiales dieron una conductividad eléctrica baja (0.01 y 0.02 dS/m) y una porosidad de aireación alta (63% y 55%), con mejor desarrollo de los plantines en las mezclas al 20% que al 50%. Es evidencia de que estas propiedades se pueden medir y comparar entre materiales — no una receta a copiar para Cannabis.'
        ]
      }
    ],
    observations: [
      'El ciclo de oscurecimiento y aclarado del sustrato al regar y secarse, que ya describe "Sustrato, agua y drenaje", refleja sobre todo el comportamiento de los componentes que retienen agua (turba, fibra de coco, compost) más que el de los aireantes (perlita, vermiculita) — los distintos componentes de una misma mezcla no contribuyen por igual a esa señal visual.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Tomar una proporción de mezcla específica (por ejemplo, encontrada en un sitio comercial o de cultivo) como una receta validada universalmente, en vez de un punto de partida habitual que cada productor suele ajustar.'
      },
      {
        type: 'CONTEXT',
        description: 'Tratar perlita y vermiculita como intercambiables por cumplir ambas una función de "aireación" — retienen agua de forma distinta, y esa diferencia puede importar según qué tan seguido se riegue.'
      },
      {
        type: 'OBSERVATION',
        description: 'No considerar la acidez natural de la turba al armar una mezcla nueva, y atribuir después un síntoma de pH a otra causa sin haber revisado primero el componente de base (ver "pH y disponibilidad de nutrientes").'
      }
    ],
    environmentContext: [
      'La elección de componentes de sustrato no depende de si el cultivo es en interior o en exterior —un contenedor con la misma mezcla puede usarse en cualquiera de los dos ambientes—; lo que sí cambia entre ambos es cuánto se seca esa mezcla entre riegos, un punto que ya desarrolla "Sustrato, agua y drenaje".'
    ],
    tags: ['suelo', 'interior', 'exterior'],
    relatedEntryIds: ['sustrato-y-drenaje', 'textura-estructura-porosidad', 'materia-organica-actividad-biologica'],
    sourceIds: [
      'institucional-eorganic-componentes-sustrato-organico',
      'cientifica-barbaro-2015-ceniza-volcanica-perlita-sustrato',
      'oficial-inta-sustrato-maceta-rubio-karlanian'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Componentes de sustrato para cultivo en contenedor — Atlas del Cultivo Argentino',
      seoDescription: 'Qué aporta cada componente habitual de un sustrato de maceta —turba, fibra de coco, perlita, vermiculita, compost— y por qué las proporciones de mezcla son guía general, no una receta fija.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'suelo-vivo-y-microbiologia',
    slug: 'suelo-vivo-y-microbiologia',
    categoryId: 'suelo-y-agua',
    title: 'Suelo vivo y microbiología: el caso de las micorrizas',
    summary: '"Suelo vivo" describe un ecosistema real de organismos que interactúan con la raíz — y, a diferencia de buena parte del resto de esta categoría, existe evidencia científica directa sobre Cannabis sativa para al menos un grupo de esos organismos: los hongos micorrícicos arbusculares.',
    intro: 'Las entradas anteriores de esta categoría describen el sustrato y el suelo como un sistema físico: agua, aire, partículas, materia orgánica. Esta entrada agrega una dimensión distinta: ese mismo sistema también aloja organismos vivos que interactúan activamente con la raíz. Se enfoca en el grupo mejor documentado para Cannabis sativa entre las fuentes consultadas para esta investigación: los hongos micorrícicos arbusculares (AMF, por su sigla en inglés).',
    sections: [
      {
        id: 'que-son-las-micorrizas',
        title: 'Qué son, en términos generales',
        paragraphs: [
          'Los hongos micorrícicos arbusculares son uno de los grupos de microorganismos de suelo más estudiados en agronomía general por su asociación con la raíz: colonizan el tejido radicular y extienden, en los términos generales en que se los describe, el alcance efectivo de la raíz para la absorción de agua y nutrientes. Esta entrada no desarrolla el mecanismo bioquímico completo de esa asociación — se enfoca en qué evidencia existe, específicamente, sobre Cannabis sativa.'
        ]
      },
      {
        id: 'evidencia-directa-en-cannabis',
        title: 'Evidencia directa en Cannabis sativa',
        paragraphs: [
          'Un estudio de 2022 evaluó la inoculación con dos especies de AMF (Rhizophagus aggregatus y R. prolifer) en un cultivar de cáñamo, comparado contra un control sin fertilizar y un control con fertilizante NPK sintético, en macetas bajo invernadero durante 60 días. La inoculación con R. aggregatus dio los mejores resultados: 80 cm de altura de planta contra 43 cm del control sin fertilizar, 11.8 g de peso seco de inflorescencia contra 5.83 g, 32.28 mg/g de CBD contra 24.56 mg/g, y 1.65 mg/g de THC contra 1.20 mg/g, con una colonización radicular del 21%.',
          'Es evidencia directa de Cannabis sativa, no una analogía de otro cultivo — pero es un único estudio, con un único cultivar, en condiciones de maceta bajo invernadero y en una sola localidad. Los propios autores señalan la necesidad de validación a campo y en otros cultivares antes de generalizar el resultado.'
        ]
      },
      {
        id: 'lo-que-esta-entrada-no-hace',
        title: 'Lo que esta entrada no hace',
        paragraphs: [
          'Esta entrada no recomienda ningún producto comercial de inoculación ni una dosis — el estudio citado evaluó especies puntuales de laboratorio, no un producto disponible en el mercado. Tampoco cubre otras prácticas que suelen agruparse bajo la idea de "suelo vivo" (té de compost, inoculantes bacterianos específicos): dentro de las fuentes consultadas para esta investigación, no se encontró para ellas el mismo tipo de evidencia directa sobre Cannabis que sí existe para las micorrizas arbusculares.'
        ]
      }
    ],
    observations: [
      'Ver mejor desarrollo en una planta inoculada, en un cultivo doméstico sin grupo de control real, no aísla a la micorriza como causa de esa diferencia — el mismo principio que limita cualquier comparación sin control aplica acá.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Presentar la microbiología de suelo o el "suelo vivo" en general como si tuviera el mismo nivel de evidencia sobre Cannabis que el estudio específico de micorrizas citado acá — esta entrada solo verificó evidencia directa para ese grupo puntual de organismos, no para la categoría completa.'
      },
      {
        type: 'CONTEXT',
        description: 'Generalizar el resultado de un estudio de 60 días, un cultivar y una localidad como si aplicara a cualquier cultivar, clima o sistema de cultivo — los propios autores señalan esa limitación.'
      }
    ],
    environmentContext: [
      'La colonización por micorrizas ocurre en condiciones distintas según el ambiente: un suelo de campo sin disturbar (exterior) puede alojar poblaciones nativas de estos hongos, mientras que un sustrato de contenedor estéril o comercial (interior o exterior) suele partir sin ellas, salvo que se inoculen de forma deliberada — una diferencia real entre ambos contextos que esta entrada no cuantifica.'
    ],
    tags: ['suelo', 'interior', 'exterior'],
    relatedEntryIds: ['materia-organica-actividad-biologica', 'sustrato-y-drenaje', 'fertilizacion-y-nutricion'],
    sourceIds: ['cientifica-seemakram-2022-micorrizas-cannabis-cbd-thc'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Suelo vivo y microbiología: micorrizas en Cannabis — Atlas del Cultivo Argentino',
      seoDescription: 'Qué son los hongos micorrícicos arbusculares y qué encontró, de forma directa sobre Cannabis sativa, un estudio de inoculación en cáñamo — con sus límites explícitos de generalización.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'calidad-del-agua-de-riego',
    slug: 'calidad-del-agua-de-riego',
    categoryId: 'suelo-y-agua',
    title: 'Calidad del agua de riego',
    summary: 'El agua de riego no es un insumo neutro: su pH, dureza y contenido de sales pueden importar tanto como el propio sustrato — y al menos una creencia extendida sobre el agua de red no resiste la evidencia institucional disponible.',
    intro: 'Ninguna entrada de esta categoría trata todavía el agua misma como variable, más allá de cuánta se aplica. Esta entrada describe qué parámetros de calidad del agua de riego documenta la horticultura general —pH, alcalinidad, dureza, conductividad eléctrica, cloro y cloramina— y revisa, con evidencia institucional, dos ideas muy difundidas entre quienes cultivan: que el agua de red siempre necesita reposo antes de regar, y que el agua fría es mala para la raíz.',
    sections: [
      {
        id: 'parametros-basicos',
        title: 'Parámetros básicos de calidad del agua de riego',
        paragraphs: [
          'Una guía institucional de horticultura de invernadero y vivero recomienda un pH del agua de riego entre 5.4 y 7.0 "según el cultivo" —un rango explícitamente dependiente del cultivo, no una cifra fija—, una alcalinidad de hasta 100 mg/L, una dureza de hasta 150 mg/L de carbonato de calcio, y señala una conductividad eléctrica del agua mayor a 1.0 mmhos/cm como umbral de advertencia de riesgo de salinidad. Es evidencia general de horticultura, no un estándar validado específicamente para Cannabis sativa.'
        ]
      },
      {
        id: 'cloro-y-cloramina',
        title: 'Cloro y cloramina: una creencia a revisar',
        paragraphs: [
          'Una respuesta institucional de un servicio de extensión agrícola, citando a la agencia de protección ambiental de Estados Unidos (EPA) y a una universidad, sostiene que los niveles bajos de cloramina presentes en el agua potable de red "no son tóxicos para las plantas" y que el agua clorada o cloraminada, a las concentraciones municipales habituales, es "segura para árboles, césped, hortalizas, etc." — un dato que contradice directamente la creencia extendida de que el agua de red siempre necesita reposo antes de regar.',
          'La misma fuente señala una excepción puntual encontrada en la bibliografía: un estudio detectó oscurecimiento de raíz en lechuga cultivada en hidroponía con cloramina. También aclara algo importante: mientras el cloro libre sí se evapora del agua dejada reposar, la cloramina —que hoy usan muchas redes de agua potable— no se elimina de la misma manera solo por dejar reposar el agua.'
        ]
      },
      {
        id: 'temperatura-del-agua',
        title: 'Temperatura del agua: otra idea a revisar',
        paragraphs: [
          'Un estudio científico sobre tabaco cultivado en sistemas de flotación de invernadero —no Cannabis— probó agua a temperatura constante de 15, 20, 25 y 30 °C y encontró que la enfermedad radicular por un patógeno del género Pythium se correlacionó con la temperatura del agua, con el nivel MÁS BAJO de daño radicular a 15 °C, la temperatura más fría de las probadas.',
          'Este resultado es el opuesto al que asume la idea difundida de que el agua fría "shockea" la raíz y favorece enfermedad. Tampoco establece lo contrario como regla universal: es una sola especie de Pythium, en una sola especie vegetal, y otras especies del mismo género se comportan de forma distinta según la bibliografía general de fitopatología. El punto que sí puede sostenerse es que la relación entre temperatura del agua y enfermedad radicular no es simple ni unidireccional — no alcanza con asumir que "más frío es peor".'
        ]
      }
    ],
    observations: [
      'Ver depósitos blancos en la superficie del sustrato o en el borde de una maceta es una observación compatible con acumulación de sales del agua de riego (ver "Conductividad eléctrica y sales"). No identifica, por sí sola, cuál de los parámetros de calidad del agua está detrás.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Asumir que dejar reposar el agua de red 24 horas siempre elimina el cloro o cloramina — es efectivo para el cloro libre, pero la fuente citada señala explícitamente que no funciona igual para la cloramina.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Tratar "agua fría es mala para la raíz" como un hecho establecido — el único estudio directo revisado acá sobre temperatura del agua y enfermedad radicular encontró el patrón opuesto, en una especie distinta de Cannabis, sin que eso alcance tampoco para fijar una regla contraria.'
      },
      {
        type: 'CONTEXT',
        description: 'Aplicar los rangos de pH, alcalinidad y dureza citados —de horticultura general de invernadero/vivero— como si fueran un estándar validado específicamente para Cannabis sativa.'
      }
    ],
    environmentContext: [
      'La fuente de agua disponible suele diferir entre interior y exterior: en interior, el agua de riego suele ser agua de red municipal (con cloro o cloramina); en exterior, puede sumarse agua de pozo o de lluvia, con un perfil de calidad distinto que esta entrada no desarrolla.'
    ],
    tags: ['suelo', 'agua', 'interior', 'exterior'],
    relatedEntryIds: ['sustrato-y-drenaje', 'ph-y-disponibilidad-de-nutrientes', 'conductividad-electrica-y-sales', 'humedad-relativa-transpiracion-vpd'],
    sourceIds: [
      'institucional-pennstate-2025-calidad-agua-riego',
      'institucional-ask-extension-2018-cloramina-agua-riego',
      'cientifica-fortnum-2000-temperatura-agua-pythium'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Calidad del agua de riego — Atlas del Cultivo Argentino',
      seoDescription: 'Qué parámetros de calidad del agua de riego documenta la horticultura general, y qué dice la evidencia institucional sobre dos creencias difundidas: el reposo del agua de red y la temperatura del agua.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'conductividad-electrica-y-sales',
    slug: 'conductividad-electrica-y-sales',
    categoryId: 'suelo-y-agua',
    title: 'Conductividad eléctrica y sales',
    summary: 'La conductividad eléctrica (CE) mide la concentración de sales disueltas, no un nutriente en particular — y un mismo número de CE puede significar cosas muy distintas según si viene del agua de origen sin fertilizar o de una solución ya fertilizada a propósito.',
    intro: '"Calidad del agua de riego" menciona la conductividad eléctrica como uno de varios parámetros del agua de origen. Esta entrada la desarrolla en particular, porque es una de las mediciones más citadas —y, dentro de las fuentes consultadas para esta investigación, una de las pocas de esta categoría con evidencia directa sobre Cannabis sativa—.',
    sections: [
      {
        id: 'que-mide-la-ce',
        title: 'Qué mide la conductividad eléctrica',
        paragraphs: [
          'La conductividad eléctrica es una medida de cuánta corriente eléctrica puede transportar el agua o la solución del sustrato — y esa capacidad depende de la concentración total de iones (sales) disueltos, sin distinguir de qué sal en particular se trata. Un número de CE más alto significa más iones disueltos en total, no necesariamente más de un nutriente específico.'
        ]
      },
      {
        id: 'dos-escalas-que-no-hay-que-confundir',
        title: 'Dos escalas distintas que no hay que confundir',
        paragraphs: [
          'Una guía clásica de la FAO sobre calidad de agua para riego clasifica el agua de origen —sin fertilizar— por su conductividad eléctrica: sin restricción de uso por debajo de 0.7 dS/m, restricción leve a moderada entre 0.7 y 3.0 dS/m, y restricción severa por encima de 3.0 dS/m. La propia guía aclara que son valores orientativos, no un estándar rígido, y que la tolerancia real depende del cultivo.',
          'Esa escala describe la calidad del agua de origen, antes de agregar ningún fertilizante — es una escala distinta de la conductividad eléctrica de una solución nutritiva ya fertilizada a propósito, que un cultivador eleva de forma deliberada para nutrir la planta. Confundir ambas escalas —evaluar una solución fertilizada con el criterio pensado para agua sin fertilizar— es un error de categoría, no solo de cifra.'
        ]
      },
      {
        id: 'evidencia-directa-en-cannabis',
        title: 'Evidencia directa en Cannabis sativa',
        paragraphs: [
          'Un estudio de 2020 evaluó Cannabis sativa (variedad de tipo droga) en hidroponía y acuaponía, agregando cloruro de sodio (NaCl) en concentraciones de 1 a 40 mM para elevar la conductividad eléctrica de la solución. En hidroponía, la fitotoxicidad fue clara a 40 mM (hasta 150% menos biomasa seca de inflorescencia que en el tratamiento de 1 mM), y el contenido de cannabinoides ya empezó a bajar con concentraciones de NaCl relativamente bajas, a partir de 5 mM, a un ritmo medido de -0.037% de THCA por cada mM de NaCl agregado.',
          'En acuaponía, con una conductividad eléctrica de base similar (entre 1.8 y 1.94 mS/cm), la tolerancia fue mayor: solo se redujo la concentración de cannabinoides, sin el mismo daño de crecimiento observado en hidroponía. El propio estudio distingue el origen del aumento de conductividad eléctrica —por NaCl agregado versus por nutrientes— como una variable relevante en sí misma, no intercambiable.'
        ]
      }
    ],
    observations: [
      'Un depósito de sales visible en la superficie del sustrato o en el borde de una maceta (ver "Calidad del agua de riego") es una observación compatible con acumulación de sales, sin que eso identifique por sí solo si el origen es el agua, el fertilizante, o ambos.'
    ],
    signals: [
      {
        level: 'ATTENTION',
        description: 'Un aumento notorio y sostenido de la conductividad eléctrica de la solución de riego o del sustrato, sin que se haya agregado más fertilizante, amerita revisar la calidad del agua de origen (ver "Calidad del agua de riego") antes de asumir que el sustrato "concentró" sales por sí solo.'
      }
    ],
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Aplicar la escala de calidad de agua de la FAO (pensada para agua de origen sin fertilizar) para evaluar si una solución nutritiva ya fertilizada tiene "demasiada CE" — son dos marcos de referencia distintos, no la misma escala con otro nombre.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Generalizar el hallazgo del estudio de NaCl en Cannabis sativa citado acá a cualquier aumento de conductividad eléctrica, sin importar el origen — el propio estudio distingue el efecto de la sal agregada (NaCl) del efecto de una solución nutritiva bien formulada con más nutrientes.'
      },
      {
        type: 'OBSERVATION',
        description: 'Tratar la conductividad eléctrica como si identificara qué nutriente en particular está en exceso o en falta — es una medida de la concentración iónica total, no una composición nutriente por nutriente.'
      }
    ],
    environmentContext: [
      'Un suelo de campo (exterior) puede lavar parte de sus sales acumuladas con lluvia a lo largo del tiempo; un sustrato de contenedor sin ese aporte de agua adicional (más marcado en interior, donde no llueve) depende enteramente del riego para esa función de lavado — una diferencia real entre ambos contextos que esta entrada no cuantifica.'
    ],
    tags: ['suelo', 'agua', 'interior', 'exterior'],
    relatedEntryIds: ['calidad-del-agua-de-riego', 'ph-y-disponibilidad-de-nutrientes', 'fertilizacion-y-nutricion', 'estres-ambiental-y-crecimiento'],
    sourceIds: [
      'oficial-fao-ayers-westcot-1985-calidad-agua-riego-ec',
      'cientifica-yep-2020-nacl-ec-cannabis-hidroponia'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Conductividad eléctrica y sales — Atlas del Cultivo Argentino',
      seoDescription: 'Qué mide la conductividad eléctrica, por qué no hay que confundir la escala de calidad del agua de origen con la de una solución nutritiva fertilizada, y qué encontró un estudio directo sobre Cannabis sativa y NaCl.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'intensidad-de-luz',
    slug: 'intensidad-de-luz',
    categoryId: 'luz-y-clima',
    title: 'Intensidad de luz: la otra variable',
    summary: '"Luz como señal temporal" distingue la duración de la luz (fotoperiodo) de su intensidad, y se enfoca en la primera. Esta entrada mira la segunda: qué hace la intensidad y qué señal da su falta.',
    intro: '"Luz como señal temporal" abre con una distinción explícita: la intensidad de luz se relaciona con la energía disponible para fotosíntesis, mientras que la duración funciona como señal de tiempo — y esa entrada se enfoca en la segunda. Esta entrada completa la primera: qué hace la intensidad de luz y cuál es la señal más documentada, y mejor conocida, de que hay poca.',
    sections: [
      {
        id: 'energia-no-solo-senal',
        title: 'Energía para fotosíntesis, no una señal de tiempo',
        paragraphs: [
          'A diferencia de la duración del período de luz (que funciona como señal de fotoperiodo), la intensidad de luz que recibe una planta se relaciona con cuánta energía tiene disponible para la fotosíntesis: el proceso por el cual convierte luz, agua y dióxido de carbono en los azúcares que sostienen su crecimiento. Más intensidad, dentro de un rango que la planta puede aprovechar, generalmente significa más energía disponible — pero es una variable distinta de "cuánto dura" ese período de luz, que es lo que trata la entrada sobre fotoperiodo.'
        ]
      },
      {
        id: 'la-senal-de-poca-luz-etiolacion',
        title: 'La señal más documentada de que falta intensidad: la etiolación',
        paragraphs: [
          'Cuando una plántula recibe menos intensidad de luz de la que necesita, una respuesta bien documentada en horticultura general es la etiolación: el tallo se alarga de forma desproporcionada, buscando alcanzar una fuente de luz más intensa, a costa de un tallo más fino y más débil que el de una plántula con luz suficiente. Es la causa más común de "plántulas estiradas" que documenta la literatura de horticultura general, no un fenómeno exclusivo de ninguna especie en particular.',
          'La corrección documentada para ese caso es acercar la fuente de luz (dentro de límites seguros para no quemar el follaje) o aumentar la intensidad disponible, y revisar también la densidad de siembra —plántulas demasiado juntas compiten por luz entre sí y favorecen el mismo efecto—.'
        ]
      }
    ],
    observations: [
      'Ver que una plántula tiene el tallo notablemente más largo y fino que sus vecinas del mismo lote es una observación compatible con etiolación por falta de intensidad de luz. Concluir de inmediato que la genética de esa plántula es "débil" sin revisar antes la distancia a la fuente de luz y la densidad de siembra es una interpretación apresurada.',
      'La intensidad de luz y la duración del período de luz pueden variar de forma independiente: una planta puede recibir muchas horas de luz de baja intensidad, o pocas horas de luz muy intensa — son dos variables que no se sustituyen entre sí.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'OBSERVATION',
        description: 'Confundir la etiolación (tallo alargado y débil por falta de intensidad de luz) con una etapa normal de crecimiento acelerado, sin comparar contra plántulas del mismo lote en mejores condiciones de luz.'
      },
      {
        type: 'CONTEXT',
        description: 'Atribuir un tallo estirado únicamente a la distancia de la fuente de luz sin considerar la densidad de siembra, que produce el mismo efecto por competencia entre plántulas vecinas.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Tratar "intensidad de luz" y "duración del período de luz" como si fueran la misma variable — son dos aspectos distintos de la luz, con efectos distintos, tal como ya distingue "Luz como señal temporal".'
      }
    ],
    environmentContext: [
      'En exterior, la intensidad de luz disponible varía con la hora del día, la estación y la nubosidad, sin que quien cultiva tenga control directo sobre ella. En un ambiente protegido con luz artificial, la intensidad pasa a depender del equipo elegido y de la distancia a la fuente — un control más directo, pero que exige revisar esa distancia activamente. Esta entrada no describe equipos ni parámetros técnicos de iluminación artificial: se limita al concepto general de intensidad como variable distinta del fotoperiodo.'
    ],
    tags: ['luz', 'ambiente'],
    relatedEntryIds: ['luz-y-fotoperiodo', 'cuidado-de-la-plantula', 'par-ppfd-medicion-de-luz'],
    sourceIds: [
      'agricultural-illinois-extension-2022-leggy-seedlings'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'Intensidad de luz: la otra variable — Atlas del Cultivo Argentino',
      seoDescription: 'Qué hace la intensidad de luz, en qué se distingue del fotoperiodo, y por qué la etiolación (tallo alargado y débil) es la señal más documentada de que falta.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'par-ppfd-medicion-de-luz',
    slug: 'par-ppfd-medicion-de-luz',
    categoryId: 'luz-y-clima',
    title: 'PAR, PPFD y medición de luz',
    summary: '"Intensidad de luz" describe el concepto en términos generales. Esta entrada agrega el vocabulario técnico para medirla —PAR, PPFD, DLI— y qué encontró, de forma directa sobre Cannabis sativa, un estudio que probó un rango de intensidad mucho más amplio que el habitual en otros cultivos.',
    intro: '"Intensidad de luz: la otra variable" describe la intensidad como la energía disponible para fotosíntesis, sin entrar en cómo se mide. Esta entrada cubre ese punto: qué es la radiación fotosintéticamente activa (PAR), cómo se mide (PPFD) y cómo se acumula en un día (DLI) — y qué mostró, de forma directa sobre Cannabis sativa, un estudio reciente sobre el efecto de intensidades muy altas.',
    sections: [
      {
        id: 'que-es-par-ppfd-dli',
        title: 'Qué es PAR, PPFD y DLI',
        paragraphs: [
          'La radiación fotosintéticamente activa (PAR) es la porción del espectro de luz, entre 400 y 700 nanómetros, que la planta puede usar para fotosíntesis. La densidad de flujo de fotones fotosintéticos (PPFD) mide cuántos fotones de esa franja llegan a una superficie por segundo, en micromoles por metro cuadrado por segundo (µmol·m⁻²·s⁻¹) — es, en términos simples, la intensidad de luz instantánea.',
          'El integral de luz diaria (DLI) acumula esa intensidad a lo largo de un día completo, en mol·m⁻²·día⁻¹. Una guía de extensión universitaria da rangos de referencia de DLI según el cultivo (por ejemplo, 5-10 para plantines, 20-30 para tomate), aclarando explícitamente que son "recomendaciones específicas de cultivo" que "pueden necesitar ajuste" — no valores universales, y ninguno de ellos específico de Cannabis.'
        ]
      },
      {
        id: 'evidencia-directa-en-cannabis',
        title: 'Qué encontró un estudio directo sobre Cannabis sativa',
        paragraphs: [
          'Un estudio de 2021 probó PPFD a nivel de dosel entre 120 y 1800 µmol·m⁻²·s⁻¹ durante toda la floración de Cannabis sativa en interior. El rendimiento de inflorescencia seca aumentó de forma lineal en todo ese rango —4.5 veces más al pasar del extremo más bajo al más alto— sin mostrar una meseta de saturación ni siquiera en la intensidad más alta probada, a diferencia de la mayoría de los cultivos de invernadero, que sí alcanzan un techo antes.',
          'El mismo estudio no encontró efecto de la intensidad de luz sobre la concentración de THC ni de CBD: más luz produjo más flor, no flor con mayor potencia. Además, la fotosíntesis medida en una hoja individual saturó a intensidades mucho menores que la respuesta de toda la planta — un dato que advierte contra medir una sola hoja y extrapolar esa lectura al cultivo completo.'
        ]
      }
    ],
    observations: [
      'Que una hoja individual deje de aumentar su tasa fotosintética a cierta intensidad no significa que el rendimiento de toda la planta también haya llegado a su techo — el estudio citado encontró exactamente esa disociación entre ambos niveles.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Asumir que existe una intensidad de luz "de saturación" fija para Cannabis, más allá de la cual dar más luz no sirve — el estudio citado no encontró ese techo dentro del rango probado, algo inusual frente a otros cultivos.'
      },
      {
        type: 'CONTEXT',
        description: 'Usar los rangos de DLI de referencia de otros cultivos (lechuga, tomate) como si fueran aplicables a Cannabis sin ajuste — son valores de cultivos distintos, no una cifra transferible sin evidencia propia.'
      }
    ],
    environmentContext: [
      'En exterior, el PPFD depende del sol, la hora del día, la estación y la nubosidad, sin control directo de quien cultiva. En interior, depende del equipo de iluminación elegido, algo que si se puede ajustar de forma directa — pero el estudio citado se hizo en interior, y esta entrada no evalúa si el mismo patrón (sin saturación) aplica de igual forma a la luz solar en exterior.'
    ],
    tags: ['luz', 'interior', 'exterior'],
    relatedEntryIds: ['intensidad-de-luz', 'espectro-de-luz-azul-rojo-rojo-lejano', 'fotosintesis-respiracion-y-biomasa'],
    sourceIds: ['institucional-virginia-tech-2025-par-ppfd-dli', 'cientifica-rodriguez-morrison-2021-ppfd-cannabis'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'PAR, PPFD y medición de luz — Atlas del Cultivo Argentino',
      seoDescription: 'Qué son PAR, PPFD y DLI, y qué encontró un estudio directo sobre Cannabis sativa al probar intensidades de luz mucho más altas que las habituales en otros cultivos.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'espectro-de-luz-azul-rojo-rojo-lejano',
    slug: 'espectro-de-luz-azul-rojo-y-rojo-lejano',
    categoryId: 'luz-y-clima',
    title: 'Espectro de luz: azul, rojo y rojo lejano',
    summary: 'No toda la luz dentro del rango que la planta puede usar para fotosíntesis tiene el mismo efecto — el color de esa luz también importa, y la evidencia directa sobre Cannabis muestra respuestas distintas según el cultivar.',
    intro: '"Luz como señal temporal" ya presenta al fitocromo como receptor sensible a luz roja y roja lejana, en el contexto del fotoperiodo. Esta entrada amplía esa idea: qué hace cada franja del espectro —azul, rojo, rojo lejano— sobre la forma de la planta y, según evidencia directa de Cannabis sativa, sobre su rendimiento y su perfil de cannabinoides.',
    sections: [
      {
        id: 'que-hace-cada-franja',
        title: 'Qué hace cada franja del espectro, en términos generales',
        paragraphs: [
          'La luz azul, en fisiología vegetal general, tiende a favorecer plantas más compactas. La luz roja lejana, en cambio, puede alargar los entrenudos y expandir las hojas —un efecto asociado a cómo la planta interpreta la sombra de otras plantas cercanas—. Esta entrada no desarrolla el mecanismo fotorreceptor completo (fitocromo para rojo/rojo lejano, criptocromo para azul): se enfoca en qué encontró la evidencia directa de Cannabis sativa sobre estos efectos.'
        ]
      },
      {
        id: 'evidencia-directa-fraccion-azul',
        title: 'Evidencia directa: la fracción de luz azul',
        paragraphs: [
          'Un estudio de 2021 probó cinco espectros con distinta fracción de fotones azules (entre 4% y 20% del total) sobre un único cultivar de Cannabis. El rendimiento de flor bajó de forma lineal, un 12.3% en total, al aumentar la fracción de azul de 4% a 20%. La fracción de azul, en cambio, no tuvo efecto estadísticamente significativo sobre la concentración final de cannabinoides.',
          'Los propios autores del estudio advierten sobre su propio límite: probaron un único cultivar, y señalan explícitamente que "es posible que cultivares de Cannabis con morfologías y días a floración distintos respondan de forma diferente a la fracción de fotones azules" — el resultado no debería tratarse como una regla aplicable a cualquier genotipo sin más evidencia.'
        ]
      }
    ],
    observations: [
      'Ver una planta más compacta bajo una fuente de luz con más proporción de azul es una observación compatible con el efecto general descripto en fisiología vegetal. Concluir que esa misma proporción de azul también va a reducir el rendimiento en cualquier cultivar es una extrapolación que el estudio citado no respalda de forma genérica — lo probó en un solo cultivar.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Generalizar el resultado de rendimiento y fracción de azul, obtenido en un único cultivar, como si aplicara a cualquier genotipo de Cannabis — los propios autores señalan esa limitación de forma explícita.'
      },
      {
        type: 'CONTEXT',
        description: 'Tratar "más azul reduce el rendimiento" como equivalente a "el azul es malo para la planta" — el estudio mide un efecto cuantitativo sobre el rendimiento final, no una valoración general de la franja espectral.'
      }
    ],
    environmentContext: [
      'La composición espectral de la luz solar en exterior no se elige ni se ajusta; en un ambiente protegido con luz artificial, la fracción de cada color sí puede elegirse según el equipo instalado — un control que el estudio citado usó específicamente para su experimento en interior.'
    ],
    tags: ['luz', 'interior', 'exterior'],
    relatedEntryIds: ['luz-y-fotoperiodo', 'par-ppfd-medicion-de-luz', 'radiacion-uv-y-cannabinoides'],
    sourceIds: ['cientifica-westmoreland-2021-espectro-azul-cannabis', 'academica-unne-fitocromos-desarrollo-vegetal'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Espectro de luz: azul, rojo y rojo lejano — Atlas del Cultivo Argentino',
      seoDescription: 'Qué hace cada franja del espectro de luz sobre la forma de la planta, y qué encontró un estudio directo sobre Cannabis sativa acerca de la fracción de luz azul, el rendimiento y los cannabinoides.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'radiacion-uv-y-cannabinoides',
    slug: 'radiacion-uv-y-cannabinoides',
    categoryId: 'luz-y-clima',
    title: 'Radiación UV y cannabinoides: una controversia científica',
    summary: 'Que la radiación ultravioleta aumenta el THC es una de las afirmaciones más repetidas sobre Cannabis — y un estudio reciente, más controlado que los que originaron esa idea, no encontró el mismo efecto.',
    intro: 'Esta entrada trata específicamente una afirmación puntual y muy citada: que exponer a Cannabis sativa a radiación ultravioleta (UV), sobre todo UV-B, aumenta la producción de THC. En vez de repetirla como un hecho establecido, describe de dónde viene esa idea y qué encontró la evidencia más reciente al ponerla a prueba de nuevo.',
    sections: [
      {
        id: 'de-donde-viene-la-idea',
        title: 'De dónde viene la idea',
        paragraphs: [
          'La relación entre radiación UV-B y mayor concentración de THC fue reportada por trabajos de las décadas de 1980 (Lydon, 1986; Lydon et al., 1987) y de 2009 (Zhang & Björn), que encontraron una relación lineal entre exposición a UV-B y THC en hojas jóvenes e inflorescencias. Una hipótesis propuesta para explicar ese patrón es que el THC actuaría como un mecanismo de protección contra el daño que la radiación UV-B causa a nivel celular.'
        ]
      },
      {
        id: 'lo-que-encontro-un-estudio-mas-reciente',
        title: 'Lo que encontró un estudio más reciente y controlado',
        paragraphs: [
          'Un estudio de 2022 aplicó UV-A y UV-B sobre Cannabis cultivado en interior durante los últimos 20 días de floración, y no encontró efecto ni sobre el peso seco de la inflorescencia ni sobre la concentración de cannabinoides en ella —las hojas de azúcar sí mostraron más THC, pero es un tejido de bajo valor comercial, no la inflorescencia misma—.',
          'Los propios autores señalan que este resultado contradice los estudios más antiguos, y plantean que las diferencias podrían deberse a factores genéticos de los cultivares modernos, que podrían limitar esa respuesta de aumento de metabolitos secundarios frente al estrés UV. Concluyen, en sus propias palabras, que no encontraron "beneficios comercialmente relevantes de agregar UV a la producción de cannabis en interior".'
        ]
      },
      {
        id: 'lo-que-esta-entrada-no-hace',
        title: 'Lo que esta entrada no hace',
        paragraphs: [
          'Esta entrada no resuelve la contradicción entre ambos grupos de estudios ni afirma cuál tiene razón: describe que existe, con fechas, para que quede claro que "la radiación UV aumenta los cannabinoides" es una afirmación con evidencia a favor y evidencia en contra, no un hecho cerrado.'
        ]
      }
    ],
    observations: [
      'Que un estudio antiguo haya encontrado un efecto y uno más reciente no lo haya encontrado no significa automáticamente que el primero estuviera mal —puede deberse a diferencias reales entre los cultivares evaluados en cada época, algo que ninguno de los dos estudios controla por el otro—.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'OTHER',
        description: 'Presentar "la radiación UV aumenta los cannabinoides" como un hecho establecido y cerrado — la evidencia disponible incluye un estudio reciente y controlado que no encontró ese efecto en la inflorescencia, y cuyos autores señalan la contradicción de forma explícita.'
      },
      {
        type: 'CONTEXT',
        description: 'Extrapolar un aumento de THC observado en hojas jóvenes o en hojas de azúcar (tejido de bajo valor comercial) a la inflorescencia, que es el tejido que en la práctica importa para rendimiento y potencia.'
      }
    ],
    environmentContext: [
      'La radiación UV solar está siempre presente en exterior, en una cantidad que no se elige. En un ambiente protegido, la exposición a UV depende exclusivamente de si se instala un equipo de iluminación que la agregue de forma deliberada — sin ese agregado, un cultivo en interior recibe muy poca o ninguna UV.'
    ],
    tags: ['luz', 'interior', 'exterior'],
    relatedEntryIds: ['espectro-de-luz-azul-rojo-rojo-lejano', 'aptitud-agroclimatica-argentina-canamo'],
    sourceIds: ['cientifica-llewellyn-2022-uvb-cannabis-sin-efecto', 'academica-mora-2019-aptitud-agroclimatica-canamo-uba'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Radiación UV y cannabinoides: una controversia científica — Atlas del Cultivo Argentino',
      seoDescription: 'De dónde viene la idea de que la radiación UV aumenta el THC, y por qué un estudio reciente y controlado sobre Cannabis sativa no encontró ese efecto en la inflorescencia.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'variacion-genetica-fotoperiodo',
    slug: 'variacion-genetica-de-la-respuesta-fotoperiodica',
    categoryId: 'luz-y-clima',
    title: 'Variación genética de la respuesta fotoperiódica',
    summary: 'No todos los cultivares de Cannabis responden al mismo umbral de oscuridad para florecer — y esa variación tiene, hoy, una base genética identificada, no solo observaciones de campo.',
    intro: '"Luz como señal temporal" describe a Cannabis sativa como una planta de día corto, sin detenerse en que ese umbral de oscuridad no es idéntico entre cultivares. Esta entrada cubre exactamente ese punto, con evidencia genética directa: la variación de la respuesta fotoperiódica entre distintos materiales de la misma especie.',
    sections: [
      {
        id: 'un-umbral-que-varia',
        title: 'Un umbral que varía, no un número único',
        paragraphs: [
          'Distintos trabajos ubican el umbral fotoperiódico de floración de Cannabis sativa alrededor de las 14 horas de luz para buena parte de las variedades de cáñamo industrial y medicinal criadas en Europa y América del Norte, con un retraso considerable en fotoperiodos mayores a 16 horas. Esa cifra describe ese conjunto particular de variedades, no a la especie completa: existen cultivares seleccionados en países nórdicos que son insensibles al fotoperíodo y completan su ciclo con cualquier duración de luz, precisamente porque el umbral de 14 horas no les sirve a esas latitudes.'
        ]
      },
      {
        id: 'la-base-genetica-identificada',
        title: 'La base genética identificada',
        paragraphs: [
          'Un estudio de 2022 identificó dos genes de efecto mayor sobre el momento de floración en Cannabis sativa: Autoflower1 (AF1), un gen recesivo que hace que la planta sea insensible al fotoperíodo —las plantas con dos copias de esta variante florecen incluso con luz continua—, y Early1 (E1), que adelanta la floración entre 2 y 4 semanas en cultivares que sí responden al fotoperíodo.',
          'El mismo estudio señala que la variación en el momento de floración que ya se observaba entre cultivares en cultivos a campo, antes de identificar estos genes, probablemente corresponde a diferencias genéticas reales en el umbral de duración de noche crítica — es decir, la variabilidad que ya se observaba informalmente tiene ahora un correlato genético identificado, no es solo una impresión de campo.'
        ]
      }
    ],
    observations: [
      'Ver que dos cultivares sembrados el mismo día, en el mismo lugar, entran en floración en momentos distintos es una observación compatible con una diferencia genética real en el umbral fotoperiódico de cada uno — no necesariamente un error de manejo o una anomalía.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Tratar "12 horas de oscuridad" o "14 horas de luz" como un umbral universal de floración para cualquier cultivar de Cannabis — la evidencia genética muestra variación real entre genotipos, incluyendo cultivares completamente insensibles al fotoperíodo.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Asumir que un cultivar que tarda más o menos que otro en florecer bajo el mismo fotoperiodo tiene algún problema — puede ser, simplemente, una diferencia genética esperable en el umbral fotoperiódico de cada material.'
      }
    ],
    environmentContext: [
      'En interior, con fotoperiodo controlado, esta variación genética se traduce en distintos tiempos de floración entre cultivares bajo el mismo esquema de luz. En exterior, se traduce además en distintas fechas de floración natural según la latitud y la genética combinadas — ver "Fotoperiodo según latitud argentina".'
    ],
    tags: ['luz', 'fotoperiodo', 'genética', 'interior', 'exterior'],
    relatedEntryIds: ['luz-y-fotoperiodo', 'genetica-y-tipos', 'fotoperiodo-segun-latitud-argentina', 'diferencias-geneticas-crecimiento-cultivares', 'elongacion-stretch-floracion'],
    sourceIds: ['academica-toth-2022-genetica-fotoperiodo-cannabis', 'academica-mora-2019-aptitud-agroclimatica-canamo-uba'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Variación genética de la respuesta fotoperiódica — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué el umbral de oscuridad necesario para que Cannabis sativa florezca varía entre cultivares, con evidencia genética directa de dos genes identificados que controlan esa diferencia.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'fotoperiodo-segun-latitud-argentina',
    slug: 'fotoperiodo-segun-latitud-argentina',
    categoryId: 'luz-y-clima',
    title: 'Fotoperiodo según latitud argentina',
    summary: 'Argentina se extiende por más de 30 grados de latitud — la diferencia en duración del día entre el norte y el sur del país, en la misma fecha, es real y considerable, no un matiz menor.',
    intro: '"Luz como señal temporal" describe el fotoperiodo como señal biológica sin cuantificar cómo varía geográficamente. Esta entrada cubre ese punto para el caso argentino: cómo cambia la duración del día según la latitud, un dato relevante para cualquier cultivo de exterior sensible al fotoperiodo, no solo Cannabis.',
    sections: [
      {
        id: 'por-que-varia-con-la-latitud',
        title: 'Por qué la duración del día varía con la latitud',
        paragraphs: [
          'La duración del día en una fecha dada depende de la latitud del lugar: cuanto más lejos del ecuador, mayor es la diferencia entre la duración del día en verano y en invierno. Argentina se extiende aproximadamente entre los 22° y los 55° de latitud sur —desde el extremo norte de Jujuy hasta Tierra del Fuego—, un rango de más de 30 grados que produce diferencias reales de fotoperiodo entre el norte y el sur del país en la misma fecha del año.'
        ]
      },
      {
        id: 'que-tan-grande-es-la-diferencia',
        title: 'Qué tan grande es esa diferencia',
        paragraphs: [
          'Una tesis de la UBA que calculó el fotoperiodo diario entre los 22° y 55° de latitud sur —el rango que cubre el territorio argentino— usando la fórmula astronómica estándar de duración del día según declinación solar, encontró que, durante el semestre cálido (octubre a marzo), el fotoperiodo se mantiene siempre por debajo de las 15 horas en el extremo norte del país (entre 22° y 30°S), mientras que en el extremo sur (42° a 55°S) hay un período de 3 a 4 meses con más de 16 horas de luz por día.',
          'Esa diferencia no es un matiz: significa que una misma variedad fotoperiódica, sembrada en el norte y en el sur del país en la misma fecha, puede atravesar fotoperiodos inductivos de floración muy distintos según dónde esté — un dato que conecta directamente con la variación genética de la respuesta fotoperiódica entre cultivares.'
        ]
      }
    ],
    observations: [
      'Que una misma variedad florezca en fechas distintas cultivada en el norte y en el sur del país es una observación compatible con la diferencia real de fotoperiodo entre esas latitudes — no necesariamente una anomalía de la planta ni del manejo.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Aplicar una misma fecha de siembra o de floración esperada a cualquier punto del país sin considerar la latitud — el fotoperiodo en la misma fecha calendario es marcadamente distinto entre el norte y el sur de Argentina.'
      },
      {
        type: 'OTHER',
        description: 'Confundir esta variación geográfica del fotoperiodo natural con el fotoperiodo de un cultivo en interior con luz artificial — en interior, el fotoperiodo se define por el equipo de control, no por la latitud del lugar (ver "Luz como señal temporal").'
      }
    ],
    environmentContext: [
      'Esta variación de fotoperiodo por latitud es, por definición, un fenómeno de exterior: depende de la posición geográfica real del cultivo bajo el sol. En un ambiente protegido con luz artificial, el fotoperiodo se desacopla de la latitud por completo.'
    ],
    tags: ['luz', 'fotoperiodo', 'argentina', 'exterior'],
    relatedEntryIds: ['luz-y-fotoperiodo', 'variacion-genetica-fotoperiodo', 'aptitud-agroclimatica-argentina-canamo'],
    sourceIds: ['academica-mora-2019-aptitud-agroclimatica-canamo-uba'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Fotoperiodo según latitud argentina — Atlas del Cultivo Argentino',
      seoDescription: 'Cómo varía la duración del día entre el norte y el sur de Argentina en la misma fecha, y por qué esa diferencia de más de 30 grados de latitud es relevante para cualquier cultivo de exterior sensible al fotoperiodo.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'temperatura-y-desarrollo',
    slug: 'temperatura-y-desarrollo',
    categoryId: 'luz-y-clima',
    title: 'Temperatura y desarrollo',
    summary: 'La temperatura no solo determina si una planta crece rápido o lento: define, a través del "tiempo térmico", cuántos días necesita cada etapa — y los límites de calor y frío que se citan como universales, en la bibliografía real, son cifras de cultivares y estudios puntuales.',
    intro: 'Ninguna entrada de esta categoría trata todavía la temperatura como variable propia, más allá de mencionarla de paso. Esta entrada cubre el concepto de tiempo térmico y revisa, contra la bibliografía citada por una tesis de la UBA sobre cáñamo, dos afirmaciones muy repetidas: que existe un rango térmico universal de 20 a 30 °C, y que hay límites fijos de frío y calor extremo.',
    sections: [
      {
        id: 'tiempo-termico',
        title: 'Tiempo térmico: por qué "días" no alcanza',
        paragraphs: [
          'El desarrollo de una planta no avanza al mismo ritmo cada día del año: avanza más rápido con más calor (dentro de un rango) y más lento con menos. El tiempo térmico —también llamado grados-día— acumula la temperatura por encima de una temperatura base a lo largo del tiempo, en vez de contar días de calendario, para predecir mejor cuándo termina una etapa de desarrollo.',
          'Una tesis de la UBA sobre cáñamo cita, de la bibliografía internacional, un requerimiento de aproximadamente 100 °C-día (base 0 °C) entre siembra y emergencia, y de aproximadamente 500 °C-día entre emergencia y cobertura total del terreno — cifras que provienen de estudios sobre cáñamo fibra europeo, no verificadas de forma independiente sobre cultivares argentinos ni sobre variedades de uso medicinal.'
        ]
      },
      {
        id: 'el-rango-de-20-a-30-grados',
        title: 'El rango de 20 a 30 °C: de dónde sale y qué tan sólido es',
        paragraphs: [
          'La misma tesis cita ese rango (20 a 30 °C) de trabajos de las décadas de 1970 y 2000 sobre tasa de fotosíntesis y producción de cannabinoides, aclarando explícitamente que depende "de la variedad de origen" —no es un número fijo—. Para acotarlo más, cita observaciones de cultivos ilegales de interior en Países Bajos y Bélgica, que mantuvieron temperaturas constantes entre 25 y 30 °C, y un trabajo sobre producción de grado medicinal en Estados Unidos y Reino Unido que fijó 25 °C como referencia — pero esas últimas dos fuentes son observaciones de manejo de cultivadores, no ensayos experimentales controlados que prueben distintas temperaturas y midan el resultado.',
          'En síntesis: el rango de 20-30 °C existe en la bibliografía, pero como una síntesis de estudios y prácticas heterogéneas, sesgada hacia condiciones de interior y hacia variedades europeas y norteamericanas — no como un óptimo experimentalmente validado y aplicable, sin más, a cualquier cultivar o ambiente.'
        ]
      },
      {
        id: 'limites-de-frio-y-calor',
        title: 'Límites de frío y calor: cifras de estudios puntuales, no reglas fijas',
        paragraphs: [
          'La misma tesis cita una "temperatura máxima vital" cercana a los 40 °C —definida en 40.7 °C por un estudio y en 41.3 °C por otro, ambos sobre cáñamo fibra europeo—, por encima de la cual la producción de biomasa y la duración del ciclo se vuelven muy heterogéneas. También cita que plántulas de hasta 4 a 5 pares de hojas toleran heladas breves de hasta -5 °C, y que existen cultivares seleccionados en Finlandia y Rusia que resisten heladas de hasta -6 °C en cualquier momento de su ciclo —aunque aclara que la mayoría de las variedades de clima templado no resisten heladas durante la floración—.',
          'Estas cifras describen los cultivares y las condiciones de los estudios que las midieron, no un límite universal de la especie: la propia existencia de variedades resistentes al frío contradice la idea de un límite fijo aplicable a cualquier genotipo.'
        ]
      }
    ],
    observations: [
      'Ver que dos plantas de cultivares distintos, expuestas a la misma temperatura, se desarrollan a ritmos distintos es compatible con diferencias genéticas reales en sus requerimientos térmicos — no necesariamente un error de manejo.'
    ],
    signals: [
      {
        level: 'ATTENTION',
        description: 'Temperaturas sostenidas por encima de los 40 °C, o heladas durante la etapa de floración en variedades no seleccionadas para resistirlas, son condiciones que la bibliografía citada asocia con daño significativo — ameritan atención, no solo observación pasiva.'
      }
    ],
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Presentar el rango 20-30 °C como un óptimo experimentalmente demostrado para cualquier Cannabis sativa — la bibliografía que lo sostiene mezcla ensayos científicos con observaciones de cultivos ilegales de interior, y aclara explícitamente que depende de la variedad.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Tratar los límites de 40 °C o de -5/-6 °C como umbrales fijos de la especie completa — son cifras medidas en cultivares puntuales (mayormente cáñamo fibra europeo), y existen variedades seleccionadas específicamente por resistir condiciones más extremas.'
      }
    ],
    environmentContext: [
      'En un ambiente protegido, la temperatura puede mantenerse dentro de un rango elegido con equipamiento; en exterior, depende del clima de cada región y estación, sin control directo — ver "Heladas" para el caso específico de temperaturas bajo cero, y "Aptitud agroclimática de Argentina para cáñamo" para cómo se traduce esto en un análisis regional.'
    ],
    tags: ['ambiente', 'interior', 'exterior'],
    relatedEntryIds: ['heladas', 'aptitud-agroclimatica-argentina-canamo', 'ciclo-de-vida'],
    sourceIds: ['academica-mora-2019-aptitud-agroclimatica-canamo-uba'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Temperatura y desarrollo — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es el tiempo térmico, de dónde sale realmente el rango de 20 a 30 °C tan citado para Cannabis, y por qué los límites de frío y calor extremo son cifras de estudios puntuales, no reglas universales.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'heladas',
    slug: 'heladas',
    categoryId: 'luz-y-clima',
    title: 'Heladas',
    summary: 'No todas las heladas son iguales para una planta: importa la intensidad, la duración y —sobre todo— en qué etapa del ciclo ocurren. Una helada que una plántula tolera puede ser letal en plena floración.',
    intro: '"Temperatura y desarrollo" menciona de paso la tolerancia a heladas según cifras citadas por una tesis de la UBA sobre cáñamo. Esta entrada desarrolla ese punto en particular, porque las heladas son uno de los riesgos climáticos más relevantes para un cultivo de exterior en gran parte de Argentina.',
    sections: [
      {
        id: 'tolerancia-segun-etapa',
        title: 'La tolerancia depende de la etapa del ciclo',
        paragraphs: [
          'Según la bibliografía citada por esa tesis, plántulas de cáñamo de hasta 4 a 5 pares de hojas pueden tolerar heladas breves de hasta -5 °C sin daño letal, aunque períodos largos de temperaturas muy bajas en esa etapa sí pueden afectar negativamente el desarrollo final de la planta. La situación es muy distinta en floración: la gran mayoría de las variedades de clima templado no resisten heladas en esa etapa, y varios ensayos a campo citados en la misma tesis se vieron directamente interrumpidos por daño de helada durante la floración.',
          'Existen, de todos modos, cultivares seleccionados específicamente en Finlandia y Rusia que resisten heladas de hasta -6 °C en cualquier momento del ciclo, incluida la floración — evidencia de que la resistencia a heladas no es una propiedad fija de la especie, sino que varía según la genética seleccionada.'
        ]
      },
      {
        id: 'como-se-usa-esto-para-planificar-un-ciclo',
        title: 'Cómo se usa esto para planificar un ciclo, en teoría',
        paragraphs: [
          'La misma tesis define, para su propio análisis de zonificación, una ventana libre de heladas de seis meses (helada tardía antes del 1 de octubre, primera helada temprana con 20% de probabilidad después del 31 de marzo) para variedades de ciclo largo, y una ventana de tres a cuatro meses (helada tardía antes del 1 de noviembre, primera helada temprana después del 28 de febrero) para variedades de ciclo corto. Son criterios usados para un análisis climático de gabinete, no una recomendación de siembra verificada a campo en Argentina — ver "Aptitud agroclimática de Argentina para cáñamo" para el contexto completo de ese trabajo y sus límites explícitos.'
        ]
      }
    ],
    observations: [
      'Ver daño por frío en una plántula joven no permite predecir automáticamente qué tan vulnerable sería esa misma planta a una helada de la misma intensidad en floración — la tolerancia cambia con la etapa, no es una propiedad fija de la planta durante todo el ciclo.'
    ],
    signals: [
      {
        level: 'ATTENTION',
        description: 'Una helada durante la etapa de floración, en una variedad no seleccionada específicamente por resistencia al frío, es una condición que la bibliografía citada asocia con daño severo o interrupción del ciclo — no una condición menor comparable a una helada en etapa de plántula.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Una helada breve y de poca intensidad en una plántula de hasta 4-5 pares de hojas no necesariamente indica un problema serio, según la tolerancia citada — el contexto (intensidad, duración, etapa exacta) es lo que decide, no la sola ocurrencia de temperaturas bajo cero.'
      }
    ],
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Tratar la tolerancia a heladas como un valor único para toda la planta, sin distinguir que la tolerancia en etapa de plántula y en floración son datos completamente distintos, citados por separado en la bibliografía.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Asumir que ninguna variedad de Cannabis resiste heladas en floración porque la mayoría no lo hace — existen cultivares seleccionados específicamente para eso, aunque no sean los típicos de uso medicinal en Argentina.'
      }
    ],
    environmentContext: [
      'Las heladas son, por definición, un riesgo de cultivo en exterior — un ambiente protegido con control de temperatura elimina este riesgo por completo, independientemente de la variedad cultivada.'
    ],
    tags: ['ambiente', 'riesgo', 'exterior'],
    relatedEntryIds: ['temperatura-y-desarrollo', 'aptitud-agroclimatica-argentina-canamo'],
    sourceIds: ['academica-mora-2019-aptitud-agroclimatica-canamo-uba'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Heladas — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué la tolerancia a heladas de Cannabis depende de la etapa del ciclo, qué cifras de tolerancia documenta la bibliografía internacional, y por qué no son un límite fijo de la especie.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'humedad-relativa-transpiracion-vpd',
    slug: 'humedad-relativa-transpiracion-y-vpd',
    categoryId: 'luz-y-clima',
    title: 'Humedad relativa, transpiración y déficit de presión de vapor (VPD)',
    summary: 'El VPD combina temperatura y humedad en un solo número, y una humedad demasiado alta tiene efectos medidos y reales sobre Cannabis — pero la "tabla de VPD ideal" que circula ampliamente entre cultivadores no viene de un experimento científico revisado por pares.',
    intro: 'Ninguna entrada de esta categoría trata todavía la humedad relativa como variable propia de desarrollo (más allá de su rol en enfermedades, ver "Moho gris" en Sanidad). Esta entrada cubre la relación entre humedad relativa, transpiración y déficit de presión de vapor (VPD), con evidencia directa de Cannabis sativa sobre los efectos de la humedad alta, y una revisión explícita del origen de la "tabla de VPD" tan citada en cultivo.',
    sections: [
      {
        id: 'que-es-el-vpd',
        title: 'Qué es el VPD',
        paragraphs: [
          'El déficit de presión de vapor (VPD) mide qué tan "seco" está el aire en relación a su capacidad máxima de contener vapor de agua a una temperatura dada, combinando temperatura y humedad relativa en un solo número (en kilopascales, kPa). Un VPD más alto significa un aire con más capacidad de "absorber" agua, lo que tiende a acelerar la transpiración de la planta; un VPD muy bajo (aire casi saturado de humedad) la enlentece.'
        ]
      },
      {
        id: 'evidencia-directa-humedad-alta',
        title: 'Evidencia directa: qué pasa con humedad relativa alta',
        paragraphs: [
          'Un estudio de 2025 comparó Cannabis sativa cultivada con humedad relativa de dosel baja (37-58%) contra alta (78-98%). Los VPD resultantes fueron muy distintos: en floración, 0.92 kPa con humedad baja contra apenas 0.25 kPa con humedad alta. Los efectos medidos con humedad alta fueron claros: la floración se retrasó tres semanas, la biomasa seca total fue menos de la mitad, y varios cannabinoides bajaron notablemente (el ácido cannabidiólico, por ejemplo, casi 5 veces menos).',
          'Es evidencia directa de que un VPD muy bajo (por humedad excesiva) perjudica a Cannabis sativa de forma medible. No es, sin embargo, evidencia de que exista un rango de VPD "ideal" preciso: el estudio comparó dos condiciones bastante extremas entre sí, no una serie de valores intermedios que permita afirmar dónde está el óptimo exacto.'
        ]
      },
      {
        id: 'la-tabla-de-vpd-de-donde-sale',
        title: 'La "tabla de VPD ideal": de dónde sale realmente',
        paragraphs: [
          'Los rangos de VPD "ideal" que circulan ampliamente en sitios y foros de cultivo (aproximadamente 0.5-1 kPa en esquejes, 0.7-1.2 en vegetativo, 1.0-1.5 en floración) se originan en un artículo de 2019 publicado en Cannabis Science and Technology —una publicación de la industria orientada a cultivadores y procesadores, no una revista científica revisada por pares—. Incluso el estudio científico de 2025 mencionado arriba, al citar esos rangos, lo hace como referencia de otra fuente, sin haberlos validado experimentalmente ellos mismos.',
          'Esto no significa que esos rangos sean necesariamente incorrectos — significa que, hasta donde permite verificar esta investigación, no provienen de un experimento controlado y revisado por pares que haya probado esos valores específicos y medido el resultado. Es una distinción importante entre una guía de industria y un hallazgo científico validado.'
        ]
      }
    ],
    observations: [
      'Ver que una planta transpira visiblemente menos (por ejemplo, sustrato que tarda mucho más en secarse de lo habitual) en un ambiente muy húmedo es una observación compatible con VPD bajo. Concluir de ahí un valor exacto de VPD sin medir temperatura y humedad relativa reales es una interpretación que excede lo que permite ver a simple vista.'
    ],
    signals: [
      {
        level: 'ATTENTION',
        description: 'Humedad relativa sostenida por encima del 78-80% durante la floración es la condición que el estudio citado asoció con retraso de floración, pérdida de biomasa y caída de cannabinoides — además del riesgo de moho gris que ya describe esa entrada en Sanidad.'
      }
    ],
    commonMistakes: [
      {
        type: 'OTHER',
        description: 'Citar una tabla de VPD "ideal" por etapa como si fuera un hallazgo científico validado — su origen documentado es un artículo de una publicación de industria, no un experimento controlado revisado por pares.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Asumir que, porque la humedad muy alta perjudica claramente a la planta, existe por lo tanto un rango estrecho y preciso de VPD "óptimo" — la evidencia directa disponible compara extremos, no establece un óptimo fino.'
      }
    ],
    environmentContext: [
      'En un ambiente protegido, la humedad relativa y por lo tanto el VPD pueden controlarse con equipamiento (deshumidificadores, ventilación). En exterior, dependen del clima de cada región y estación —ver "Calidad del agua de riego" en Suelo y agua para la relación entre humedad y otros parámetros ambientales, y "Moho gris (Botrytis cinerea)" en Sanidad para el riesgo de enfermedad asociado a humedad alta en floración.'
    ],
    tags: ['ambiente', 'interior', 'exterior'],
    relatedEntryIds: ['moho-gris-botrytis-cinerea', 'calidad-del-agua-de-riego', 'estres-ambiental-y-crecimiento'],
    sourceIds: ['cientifica-corredor-perilla-2025-humedad-vpd-cannabis', 'otra-breit-2019-vpd-cannabis-tabla-comercial'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Humedad relativa, transpiración y VPD — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es el déficit de presión de vapor (VPD), qué encontró un estudio directo sobre Cannabis y humedad alta, y por qué la "tabla de VPD ideal" tan citada viene de una publicación de industria, no de un experimento científico revisado por pares.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'aptitud-agroclimatica-argentina-canamo',
    slug: 'aptitud-agroclimatica-de-argentina-para-canamo',
    categoryId: 'luz-y-clima',
    title: 'Aptitud agroclimática de Argentina para cáñamo: qué estudió realmente la tesis de Mora',
    summary: 'Una tesis de maestría de la UBA (2019) es, hasta donde permite verificar esta investigación, el único trabajo de zonificación agroclimática de cáñamo para Argentina — pero es un estudio de gabinete basado en clima comparado internacionalmente, no un ensayo de campo con cultivares plantados en el país.',
    intro: 'Esta entrada describe qué hizo realmente la tesis de Francisco Mora, dirigida por Daniel Sorlino, "Aptitud agroclimática del territorio argentino para el cultivo de cáñamo (Cannabis sativa) y la producción de principios activos de interés medicinal" (Maestría en Meteorología Agrícola, UBA, 2019) — qué datos usó, qué encontró, y sobre todo, cuáles son los límites que el propio autor reconoce. No es una recomendación de dónde cultivar hoy: es la descripción de un trabajo académico específico, con su alcance y sus huecos.',
    sections: [
      {
        id: 'que-hizo-realmente-el-estudio',
        title: 'Qué hizo realmente el estudio',
        paragraphs: [
          'El trabajo no plantó cáñamo en ningún lugar de Argentina ni usó un cultivar propio: es un estudio de gabinete que recopiló datos climáticos mensuales de 153 sitios en 53 países donde el cultivo de Cannabis prospera en el mundo (de forma legal, ilegal, industrial o tradicional), de los cuales 92 caen dentro del rango de latitudes que ocupa Argentina (22° a 55° sur). Combinó esa información con requerimientos bioclimáticos publicados en la literatura científica internacional —mayormente estudios sobre cáñamo fibra de Europa y América del Norte— y con el Atlas agroclimático digital de la Argentina para el período 1981-2010, aplicando una metodología de clasificación agroclimática publicada en 1958 (Burgos).',
          'A partir de esa combinación, delimitó regiones térmicas (según requerimientos de tiempo térmico y riesgo de heladas y calor extremo), regiones hídricas (según qué porcentaje de la demanda de agua del cultivo cubre la lluvia) y regiones fotoperiódicas (según cuánto tiempo el fotoperiodo del semestre cálido supera el umbral de floración) — y superpuso las tres para obtener siete "tipos agroclimáticos" de aptitud (óptima, apta o marginal) para ciclos largos o cortos de cultivo.'
        ]
      },
      {
        id: 'los-resultados-principales',
        title: 'Los resultados principales, con sus condiciones',
        paragraphs: [
          'Para cultivo extensivo de cáñamo en general (no específicamente medicinal), el área óptima resultante abarca centro y este de San Luis, Córdoba, Santa Fe, Entre Ríos, suroeste de Corrientes, noreste de La Pampa y norte y sudeste de Buenos Aires, con la frontera entre variedades de ciclo largo y corto ubicada aproximadamente en los 40° de latitud sur.',
          'Sobre esa base, el estudio agregó una zonificación adicional —explícitamente descripta como "sin precedente"— orientada a la producción de principios activos de interés medicinal, combinando estudios de fotosíntesis y producción de cannabinoides con observaciones de cultivos ilegales de interior en Países Bajos y Bélgica para fijar un rango térmico de floración de 20 a 30 °C y una humedad relativa de 45 a 65% durante febrero y marzo. Esa zona más acotada abarca este de Córdoba, centro y sur de Santa Fe, centro y sur de Entre Ríos, noreste de La Pampa y norte de Buenos Aires.'
        ]
      },
      {
        id: 'los-limites-que-el-propio-autor-reconoce',
        title: 'Los límites que el propio autor reconoce',
        paragraphs: [
          'El propio trabajo dedica una sección final ("Reflexiones para futuros estudios") a enumerar sus propias limitaciones, de forma explícita: la zonificación "resulta necesario evaluar" con "estudios de ensayos geográficos y siembras continuadas a lo largo del territorio argentino" —es decir, nunca se hizo ese ensayo de campo—; la zonificación específica para producción de principios activos "no tiene precedente" y necesita un ensayo in situ para saber si "los supuestos teóricos tienen un vínculo real con la práctica".',
          'A esto se suman otras limitaciones que el propio autor detalla: la densidad de estaciones meteorológicas es baja en Patagonia y el noroeste argentino, por lo que esos límites deberían tratarse como "zonas de transición", no fronteras precisas; el estudio excluye por completo el territorio por encima de los 1000 metros sobre el nivel del mar (dejando sin evaluar, por ejemplo, las sierras de Córdoba y San Luis, rodeadas en el mapa por zonas "óptimas"); los datos son promedios de 30 años (1981-2010) y no incorporan cambio climático; el análisis es exclusivamente climático, sin evaluación de suelo; y usó como referencia variedades europeas de cáñamo fibra, por lo que el propio autor advierte que cultivares con resistencia a heladas, a sequía, o insensibles al fotoperíodo "es muy probable" que amplíen los límites propuestos.'
        ]
      },
      {
        id: 'lo-que-esta-entrada-no-hace',
        title: 'Lo que esta entrada no hace',
        paragraphs: [
          'Esta entrada no convierte este mapa de aptitud teórica en una recomendación de dónde cultivar hoy: describe qué estudió un trabajo académico específico, con qué método y con qué huecos reconocidos por su propio autor. Tampoco evalúa el marco legal vigente para el cultivo de Cannabis en Argentina (ver "Marco editorial y responsable" y "REPROCANN: modalidades"), que es un tema completamente aparte de la aptitud climática del territorio.'
        ]
      }
    ],
    observations: [
      'Que un lugar aparezca clasificado como "zona óptima" en el mapa de esta tesis es una observación sobre el resultado de un modelo climático comparado internacionalmente. Concluir que un cultivo real en ese lugar, hoy, con un cultivar y un manejo específicos, va a tener éxito es una extrapolación que el propio estudio no respalda —de hecho, señala explícitamente la falta de validación a campo—.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Presentar el mapa de zonas óptimas de esta tesis como una recomendación de cultivo validada, en vez de un resultado teórico de un modelo climático comparado que el propio autor señala como pendiente de validación a campo.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Tratar los límites de latitud o provincia de este trabajo como fronteras precisas — el propio autor los describe como "zonas de transición" en las regiones con menos estaciones meteorológicas (Patagonia, NOA), no líneas exactas en el mapa.'
      },
      {
        type: 'OTHER',
        description: 'Ignorar que el estudio se basó en variedades europeas de cáñamo fibra como referencia — cultivares con otra genética (resistentes a heladas, insensibles al fotoperíodo) podrían tener una aptitud territorial distinta a la calculada acá, según el propio autor.'
      }
    ],
    environmentContext: [
      'Todo el análisis de esta tesis corresponde a cultivo extensivo de exterior: el propio trabajo señala que, si la producción se hiciera de forma intensiva con riego o invernadero, el área a considerar "podría ser varias veces superior" a la calculada para condiciones puramente de secano y clima natural.'
    ],
    tags: ['ambiente', 'argentina', 'exterior'],
    relatedEntryIds: ['temperatura-y-desarrollo', 'heladas', 'fotoperiodo-segun-latitud-argentina', 'diferencias-agroclimaticas-regiones-argentinas', 'marco-editorial'],
    sourceIds: ['academica-mora-2019-aptitud-agroclimatica-canamo-uba'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Aptitud agroclimática de Argentina para cáñamo — Atlas del Cultivo Argentino',
      seoDescription: 'Qué estudió realmente la tesis de Francisco Mora (UBA, 2019) sobre zonificación agroclimática de cáñamo en Argentina, qué método usó, y cuáles son los límites que el propio autor reconoce explícitamente.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'diferencias-agroclimaticas-regiones-argentinas',
    slug: 'diferencias-agroclimaticas-entre-regiones-argentinas',
    categoryId: 'luz-y-clima',
    title: 'Diferencias agroclimáticas entre regiones argentinas',
    summary: '"NOA", "Cuyo", "Pampeana" y "Patagonia" son categorías reales, usadas por organismos como la FAO — pero son agrupaciones productivas y administrativas, no clasificaciones climáticas de precisión, y una misma provincia puede contener climas muy distintos.',
    intro: 'Es común escuchar que Argentina se divide en unas pocas "regiones" con clima homogéneo. Esta entrada revisa qué tan sólida es esa idea: de dónde salen esas categorías, qué usan de verdad los organismos oficiales para clasificar el territorio, y por qué no equivalen a un mapa climático preciso.',
    sections: [
      {
        id: 'de-donde-salen-noa-cuyo-pampeana-patagonia',
        title: 'De dónde salen "NOA", "Cuyo", "Pampeana" y "Patagonia"',
        paragraphs: [
          'Un documento de la FAO sobre agricultura de secano en América Latina sí usa estas categorías, asociadas a provincias y a sistemas productivos dominantes: "Pampeana" (Buenos Aires, Córdoba, Santa Fe, orientada a granos), "NOA" (Salta, Jujuy, Tucumán, Santiago del Estero, Catamarca), "NEA" (Corrientes, Chaco, Misiones, Formosa) y "Cuyo"/"Comahue" (valles bajo riego, fruticultura y vitivinicultura). El mismo documento aclara explícitamente que "Patagonia no se cubre en este informe" por su actividad agrícola limitada —es decir, ni siquiera la fuente que usa estas categorías las trata como una clasificación climática completa y uniforme del país—.',
          'Estas categorías existen y se usan de forma real, pero agrupan provincias por su producción dominante, no por límites de temperatura, precipitación o fotoperiodo. Una misma provincia incluida en "NOA", por ejemplo, puede contener tanto puna de altura como selva subtropical de yungas —climas radicalmente distintos dentro de la misma etiqueta regional—.'
        ]
      },
      {
        id: 'un-esquema-oficial-mas-especifico',
        title: 'Un esquema oficial más específico: RIAN de INTA',
        paragraphs: [
          'INTA cuenta con un sistema propio de regionalización, llamado RIAN (Regiones Agroecológicas de la República Argentina), que delimita el país en "zonas" (identificadas con números romanos) y "subzonas" (con letras) según criterios de suelo, aptitud de uso de la tierra, agroclima, tipo y estructura de la vegetación y sistemas productivos característicos, siguiendo límites de departamentos provinciales. Es un esquema mucho más granular que "NOA/Cuyo/Pampeana/Patagonia", pensado específicamente para análisis agropecuario.',
          'Esta entrada no pudo verificar los límites exactos de ese sistema por lectura directa —el dominio de INTA no respondió al intentar el acceso en esta investigación—, así que no describe subzonas puntuales. Lo relevante acá es que existe, del lado de un organismo técnico argentino, un esquema alternativo y más preciso que las cuatro categorías populares, lo que por sí solo ya muestra que esas cuatro categorías no son "la" clasificación agroclimática oficial del país.'
        ]
      },
      {
        id: 'la-alternativa-que-usa-esta-misma-categoria',
        title: 'La alternativa que ya usa esta categoría del atlas',
        paragraphs: [
          'La forma más precisa de tratar la variabilidad climática argentina que ya aplica este atlas no son las cuatro regiones populares, sino análisis por latitud y por variable climática específica: ver "Fotoperiodo según latitud argentina" y "Aptitud agroclimática de Argentina para cáñamo", que trabajan con rangos de latitud y umbrales térmicos/hídricos concretos en vez de nombres de región.'
        ]
      }
    ],
    observations: [
      'Escuchar que "en el NOA se puede cultivar todo el año" no distingue, por sí solo, entre las distintas condiciones reales que existen dentro de esa etiqueta —altura, humedad, temperatura— que pueden variar enormemente entre un valle y una zona de puna, ambos dentro de la misma región nombrada.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Afirmar que una provincia entera tiene "un clima" a partir de la región popular en la que se la agrupa (NOA, Cuyo, Pampeana, Patagonia) — estas categorías son agrupaciones productivas/administrativas, y dentro de una misma provincia puede haber climas muy distintos según la zona y la altura.'
      },
      {
        type: 'OTHER',
        description: 'Tratar "NOA/Cuyo/Pampeana/Patagonia" como si fuera la única o la oficial clasificación agroclimática argentina — INTA mantiene un esquema propio (RIAN) más granular y basado en criterios técnicos distintos.'
      }
    ],
    environmentContext: [
      'Esta entrada trata variabilidad climática de exterior por definición — un ambiente protegido controla sus propias condiciones independientemente de en qué región del país esté ubicado.'
    ],
    tags: ['ambiente', 'argentina', 'exterior'],
    relatedEntryIds: ['aptitud-agroclimatica-argentina-canamo', 'fotoperiodo-segun-latitud-argentina'],
    sourceIds: [
      'oficial-fao-y5210s-regiones-agroecologicas-argentina',
      'oficial-inta-rian-regiones-agroecologicas',
      'academica-mora-2019-aptitud-agroclimatica-canamo-uba'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Diferencias agroclimáticas entre regiones argentinas — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué "NOA", "Cuyo", "Pampeana" y "Patagonia" son agrupaciones productivas y administrativas, no una clasificación climática de precisión, y qué esquema más específico usa INTA.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'chupadera-fungosa-damping-off',
    slug: 'chupadera-fungosa-damping-off',
    categoryId: 'sanidad',
    title: 'Chupadera fungosa (damping-off)',
    summary: 'El exceso de humedad alrededor de una plántula recién emergida puede favorecer hongos que la matan en cuestión de días — la causa más documentada de pérdida de plántulas en horticultura general.',
    intro: '"Lectura de señales y sanidad" describe el marco general para no saltar de un síntoma a una causa. Esta entrada aplica ese marco a un caso concreto y bien documentado en horticultura: la chupadera fungosa (damping-off), una de las causas más frecuentes de pérdida de plántulas recién emergidas.',
    sections: [
      {
        id: 'que-es',
        title: 'Qué es la chupadera fungosa',
        paragraphs: [
          'La chupadera fungosa (damping-off, en la literatura en inglés) es una enfermedad causada por distintos hongos y organismos afines a los hongos (entre ellos géneros como Rhizoctonia, Fusarium, Pythium y Phytophthora, documentados por la extensión agrícola de Penn State) que atacan la semilla o la plántula recién emergida. Puede ocurrir antes de que la plántula emerja del sustrato (y entonces se lee como "la semilla nunca germinó") o después de emerger, con el tallo debilitándose justo a nivel del sustrato hasta que la plántula se cae.',
          'El factor ambiental más documentado que favorece esta enfermedad es el exceso de humedad: un sustrato saturado, con poca circulación de aire, ofrece exactamente las condiciones que esos organismos necesitan para desarrollarse — el mismo estado de saturación que "Sustrato, agua y drenaje" describe como perjudicial para la raíz por falta de oxígeno, favorece acá, además, el desarrollo de estos organismos.'
        ]
      },
      {
        id: 'prevencion',
        title: 'Qué describe la literatura de horticultura general sobre prevención',
        paragraphs: [
          'Las prácticas culturales que la extensión agrícola documenta como preventivas incluyen: evitar el riego excesivo (regar solo cuando el sustrato lo necesita, no en un calendario fijo), favorecer la circulación de aire alrededor de las plántulas, usar un sustrato con buen drenaje desde el inicio, y evitar la siembra demasiado densa —que, además de favorecer etiolación (ver "Intensidad de luz"), reduce la circulación de aire entre plántulas—.',
          'Esta entrada describe el fenómeno general y los factores de riesgo documentados en horticultura, sin ser evidencia específica de Cannabis sativa: es información general de fisiología/patología vegetal, coherente con la forma en que el resto del atlas distingue evidencia específica de la especie de evidencia general aplicada por analogía.'
        ]
      }
    ],
    observations: [
      'Ver que varias plántulas de un mismo semillero se caen en pocos días, con el tallo visiblemente afinado justo a nivel del sustrato, es una observación compatible con chupadera fungosa. Concluir sin más que "las semillas eran de mala calidad" sin revisar la humedad y la circulación de aire del semillero es una interpretación que ignora la causa ambiental más documentada de este cuadro.',
      'Que una plántula nunca llegue a emerger, sin ninguna otra señal visible en superficie, es compatible con una infección de preemergencia — un caso donde, igual que ya señala "Germinación y primera lectura del material" para la falta de viabilidad, la ausencia de cambio visible no permite por sí sola identificar la causa exacta sin revisar el resto del entorno.'
    ],
    signals: [
      {
        level: 'ATTENTION',
        description: 'Plántulas que se caen en pocos días con el tallo afinado y oscurecido justo a nivel del sustrato, especialmente si ocurre en varias plántulas del mismo semillero de forma simultánea.'
      },
      {
        level: 'AMBIGUOUS',
        description: 'Que una sola semilla, aislada, nunca emerja no alcanza por sí sola para atribuirlo a chupadera fungosa — la falta de viabilidad de esa semilla en particular (ver "Germinación y primera lectura del material") es una causa igualmente posible sin más señales.'
      }
    ],
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Atribuir la pérdida de plántulas únicamente a la calidad de la semilla sin revisar primero la humedad y la circulación de aire del semillero, el factor de riesgo más documentado para esta enfermedad.'
      },
      {
        type: 'OBSERVATION',
        description: 'No revisar el tallo a nivel del sustrato (el punto típico donde se debilita en la chupadera fungosa) y quedarse solo con la observación de que "la plántula se cayó".'
      }
    ],
    environmentContext: [
      'El riesgo de chupadera fungosa aumenta en cualquier ambiente donde la humedad se mantenga alta y el aire circule poco alrededor de las plántulas — una condición más fácil de generar sin querer en un espacio protegido cerrado que al aire libre, aunque también puede ocurrir en exterior con riego excesivo o mala circulación.'
    ],
    tags: ['sanidad', 'riesgo'],
    relatedEntryIds: ['lectura-de-senales', 'germinacion', 'cuidado-de-la-plantula', 'herramientas-e-higiene-de-poda', 'moho-gris-botrytis-cinerea'],
    sourceIds: [
      'agricultural-psu-extension-2026-damping-off'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Chupadera fungosa (damping-off) — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es la chupadera fungosa, por qué el exceso de humedad es el factor de riesgo más documentado, y qué prácticas culturales generales la previenen.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'moho-gris-botrytis-cinerea',
    slug: 'moho-gris-botrytis-cinerea',
    categoryId: 'sanidad',
    title: 'Moho gris / podredumbre de la flor (Botrytis cinerea)',
    summary: 'A diferencia de la chupadera fungosa, que ataca en la etapa de plántula, el moho gris ataca la flor durante la floración —y lo hace por dentro, donde puede pasar desapercibido hasta que el daño ya es grande.',
    intro: '"Chupadera fungosa (damping-off)" describe la enfermedad fúngica más documentada en la etapa de plántula. Esta entrada describe una enfermedad fúngica distinta, específica de una etapa distinta del ciclo: el moho gris o podredumbre de la flor, causado por Botrytis cinerea, que ataca las inflorescencias durante la floración. A diferencia de la chupadera fungosa, para esta enfermedad sí existe evidencia científica directa sobre Cannabis sativa.',
    sections: [
      {
        id: 'que-es',
        title: 'Qué es el moho gris y por qué es difícil de detectar a tiempo',
        paragraphs: [
          'Botrytis cinerea es un hongo necrotrófico (que mata el tejido que coloniza) documentado en más de mil especies vegetales, no exclusivo de Cannabis sativa. En la planta, causa una podredumbre de la inflorescencia que suele desarrollarse en el interior de flores densas —donde el aire circula menos— antes de volverse visible desde afuera, lo que significa que, para cuando el daño se nota a simple vista, puede llevar ya un tiempo desarrollándose por dentro.',
          'Un estudio científico de 2023 sobre Cannabis sativa cultivada en invernadero investigó específicamente el desarrollo de esta enfermedad en la especie, a diferencia de la chupadera fungosa —que esta entrada trata como evidencia general de horticultura, no específica de Cannabis—.'
        ]
      },
      {
        id: 'condiciones-ambientales',
        title: 'Condiciones ambientales asociadas',
        paragraphs: [
          'La humedad relativa alta (por encima del 70%) combinada con una temperatura moderada (entre 17 y 24 °C aproximadamente) aparece descrita como favorable para el desarrollo de este hongo sobre Cannabis sativa. Esta entrada señala una salvedad importante sobre esta cifra: no pudo verificarse por lectura directa del artículo científico original (ver la ficha de la fuente), por lo que se cita como una caracterización consistente encontrada en más de una búsqueda, no como una lectura confirmada del texto completo.'
        ]
      },
      {
        id: 'manejo',
        title: 'Qué describe la evidencia sobre manejo',
        paragraphs: [
          'La misma investigación asocia una mejora en la circulación de aire alrededor de las inflorescencias con una reducción notable en la incidencia de la enfermedad. Igual que con las cifras de humedad y temperatura, esta entrada no pudo confirmar el valor exacto por lectura directa del artículo original, así que no fija acá una cifra puntual — el punto editorial que sí puede sostenerse con esa salvedad es la dirección del efecto: más circulación de aire, menos incidencia reportada.'
        ]
      },
      {
        id: 'lo-que-esta-entrada-no-hace',
        title: 'Lo que esta entrada no hace',
        paragraphs: [
          'Esta entrada no da un protocolo de manejo paso a paso, ni fija un umbral exacto de humedad o temperatura como "el límite seguro" — las cifras disponibles no pudieron confirmarse por lectura directa del artículo original, y aun si lo hubieran sido, un estudio en condiciones de invernadero no necesariamente representa todos los sistemas de cultivo posibles (ver "Interior y exterior").'
        ]
      }
    ],
    observations: [
      'Ver zonas oscurecidas o con aspecto acuoso dentro de una inflorescencia densa, al abrirla, es una observación compatible con moho gris en desarrollo. No revisar el interior de flores densas durante la floración, y confiar solo en el aspecto externo, es la razón documentada por la que esta enfermedad suele notarse tarde.',
      'Que el moho gris comparta con la chupadera fungosa el hecho de ser causado por un hongo no significa que compartan factores de riesgo idénticos — una ataca en la etapa de plántula por exceso de humedad en el sustrato, la otra ataca la flor en floración por humedad relativa y circulación de aire alrededor de la inflorescencia.'
    ],
    signals: [
      {
        level: 'ATTENTION',
        description: 'Zonas oscurecidas, blandas o con aspecto acuoso dentro de una inflorescencia densa durante la floración, especialmente en un ambiente con humedad relativa alta y poca circulación de aire.'
      }
    ],
    commonMistakes: [
      {
        type: 'OBSERVATION',
        description: 'Evaluar el estado de una inflorescencia densa solo por su aspecto externo durante la floración, sin abrirla para revisar el interior, que es donde esta enfermedad suele desarrollarse primero según la literatura citada.'
      },
      {
        type: 'OTHER',
        description: 'Citar como confirmado un umbral exacto de humedad, temperatura o porcentaje de reducción de la enfermedad de este estudio — esta entrada no pudo verificar esas cifras por lectura directa del artículo original y las presenta con esa salvedad explícita.'
      }
    ],
    environmentContext: [
      'El riesgo de moho gris aumenta con la densidad del follaje y de las inflorescencias (menos circulación de aire interna, ver "Poda" y "Defoliación") y con la humedad relativa del ambiente —una combinación más probable en un espacio protegido mal ventilado, aunque el exterior no está exento si la humedad ambiental es alta.'
    ],
    tags: ['sanidad', 'riesgo'],
    relatedEntryIds: ['lectura-de-senales', 'chupadera-fungosa-damping-off', 'cosecha-y-maduracion', 'herramientas-e-higiene-de-poda', 'defoliacion', 'humedad-relativa-transpiracion-vpd'],
    sourceIds: [
      'cientifica-mahmoud-2023-botrytis-cinerea-cannabis-podredumbre-flor'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Moho gris / podredumbre de la flor (Botrytis cinerea) — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es el moho gris (Botrytis cinerea) en Cannabis sativa, por qué es difícil de detectar a tiempo dentro de flores densas, y qué condiciones ambientales y de manejo describe la evidencia científica disponible.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'interior-y-exterior',
    slug: 'interior-y-exterior',
    categoryId: 'cultivo',
    title: 'Interior y exterior: las mismas variables, un contexto distinto',
    summary: 'Cultivar en un ambiente protegido o al aire libre no cambia qué variables importan —agua, luz, sustrato, temperatura—, cambia quién las controla y cuánto pueden fluctuar.',
    intro: '"Cultivo en secuencia" describe la ontogenia de la planta como un proceso continuo, sin distinguir todavía el ambiente en el que ocurre. Esta entrada mira esa variable: qué cambia, y qué no cambia, entre cultivar en un ambiente protegido (interior) y cultivar al aire libre (exterior) — sin tomar partido por ninguno de los dos.',
    sections: [
      {
        id: 'lo-que-no-cambia',
        title: 'Lo que no cambia entre ambos sistemas',
        paragraphs: [
          'Ninguna de las variables fisiológicas que describe el resto del atlas deja de aplicar según el sistema: la planta sigue necesitando agua y aire disponibles en el sustrato (ver "Sustrato, agua y drenaje"), sigue respondiendo al fotoperiodo como señal de floración (ver "Luz como señal temporal"), y sigue atravesando la misma secuencia de desarrollo descripta en "Cultivo en secuencia". Interior y exterior no son dos fisiologías distintas de la misma especie — son dos contextos distintos para la misma fisiología.'
        ]
      },
      {
        id: 'lo-que-si-cambia-control-y-fuente',
        title: 'Lo que sí cambia: quién controla cada variable, y de dónde viene la señal',
        paragraphs: [
          'En un ambiente protegido con luz artificial, la señal de fotoperiodo puede desacoplarse por completo del ciclo estacional externo, tal como ya señala "Luz como señal temporal" — quien cultiva decide cuándo cambia la duración de luz, en vez de que la decida la estación del año. Al aire libre, esa señal la da el propio ciclo estacional, sin que nadie la controle directamente.',
          'Algo parecido ocurre con el agua: en interior, el riego suele ser la única fuente de agua, un factor bajo control directo; en exterior, se le suma la lluvia, que puede sumarse al riego sin que quien cultiva lo decida —tal como ya señala "Sustrato, agua y drenaje"—. Y con la temperatura: un espacio protegido tiende a ofrecer condiciones más estables y controlables; el exterior sigue el clima real de la zona y la estación, con toda su variabilidad.',
          'Esta diferencia no es solo técnica: cambia qué tan predecible es la secuencia de desarrollo que describe "Cultivo en secuencia" — más predecible cuanto más controlado esté el ambiente, más sujeta a la variabilidad del clima real cuanto más expuesta esté la planta al exterior.'
        ]
      }
    ],
    observations: [
      'Ver que una planta de exterior crece a un ritmo distinto que una de interior no es, por sí solo, evidencia de que un sistema sea "mejor" que el otro — es evidencia de que están respondiendo a contextos ambientales distintos, con distinto grado de control sobre las mismas variables.',
      'Que la señal de fotoperiodo esté desacoplada del calendario estacional en un cultivo de interior es una consecuencia esperable del control artificial de la luz, no una anomalía ni un error de manejo.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Tratar interior y exterior como si fueran dos formas distintas de responder biológicamente, en vez de un mismo organismo respondiendo a las mismas variables con distinto grado de control externo sobre ellas.'
      },
      {
        type: 'CONTEXT',
        description: 'Aplicar una lectura pensada para un ambiente protegido (por ejemplo, sobre el desacople del fotoperiodo) a una planta de exterior sin ajustar que, ahí, esa señal la sigue dando el ciclo estacional real.'
      }
    ],
    environmentContext: [
      'Esta entrada no recomienda un sistema por sobre otro para ningún contexto: describe la diferencia estructural entre ambos (qué controla cada uno de las mismas variables) para que la elección, si existe, sea informada.'
    ],
    tags: ['cultivo', 'ciclo'],
    relatedEntryIds: ['cultivo-en-secuencia', 'luz-y-fotoperiodo', 'sustrato-y-drenaje'],
    sourceIds: [
      'cientifica-hesami-2023-cannabis-life-cycle'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'Interior y exterior: las mismas variables, un contexto distinto — Atlas del Cultivo Argentino',
      seoDescription: 'Qué cambia y qué no cambia entre cultivar en un ambiente protegido o al aire libre: las mismas variables fisiológicas, con distinto grado de control sobre ellas.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'reprocann-modalidades',
    slug: 'reprocann-modalidades',
    categoryId: 'marco-legal',
    title: 'REPROCANN: las tres modalidades de inscripción',
    summary: '"Marco editorial y responsable" nombra el autocultivo, el cultivo solidario y la inscripción vía ONG como las tres vías del REPROCANN. Esta entrada describe qué distingue a cada una, sin entrar en requisitos que cambian con el tiempo.',
    intro: 'El Decreto 883/2020 reglamentó por primera vez el registro del Programa de Cannabis (REPROCANN), habilitando tres modalidades distintas de inscripción. "Marco editorial y responsable" ya las nombra al resumir el marco legal vigente; esta entrada se detiene en qué distingue conceptualmente a cada una, sin listar requisitos puntuales —que cambian con las sucesivas reglamentaciones, la más reciente de ellas la Resolución 1780/2025—, para lo cual la fuente oficial vale más que cualquier resumen editorial.',
    sections: [
      {
        id: 'tres-modalidades',
        title: 'Tres modalidades, una misma inscripción',
        paragraphs: [
          'El Decreto 883/2020 habilita tres formas distintas de acceder al cultivo registrado dentro del REPROCANN: el autocultivo (la persona cultiva para sí misma), el cultivo solidario —también descripto como "tercero cultivador"— (una persona distinta a quien usa el cannabis se registra para cultivarlo en su nombre), y la inscripción a través de una organización no gubernamental o asociación civil autorizada. Las tres modalidades habilitan el cultivo dentro del mismo marco regulatorio; lo que cambia es quién realiza materialmente el cultivo en relación a quien lo necesita.'
        ]
      },
      {
        id: 'por-que-existen-tres-y-no-una',
        title: 'Por qué existen tres modalidades y no una sola',
        paragraphs: [
          'La distinción entre las tres modalidades responde a una situación práctica: no toda persona que necesita acceder a cannabis con fines terapéuticos está en condiciones de cultivarlo por sí misma —por salud, por falta de espacio o conocimiento, o por otras razones—. El cultivo solidario y la inscripción vía ONG existen, precisamente, para cubrir esa distancia entre quien necesita el acceso y quien puede sostener el cultivo, sin que eso implique una relación comercial entre ambos dentro del marco del programa.',
          'Esta entrada no detalla los requisitos documentales, los plazos ni los límites de plantas de ninguna de las tres modalidades: esos datos están sujetos a la reglamentación vigente en cada momento (la última revisión general, al momento de esta entrada, es la Resolución 1780/2025) y consultarlos directamente en la fuente oficial es más confiable que cualquier resumen que pueda desactualizarse.'
        ]
      }
    ],
    observations: [
      'Que existan tres modalidades de inscripción es un hecho verificable en el propio texto del Decreto 883/2020. Cuáles son los requisitos exactos vigentes hoy para cada una es una pregunta distinta, que depende de la reglamentación actualizada — esta entrada responde la primera, no la segunda.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'OTHER',
        description: 'Asumir que "cultivo solidario" implica una relación comercial entre quien cultiva y quien usa el cannabis — el marco regulatorio distingue esta figura precisamente de una transacción comercial.'
      },
      {
        type: 'CONTEXT',
        description: 'Tomar los requisitos de alguna de las tres modalidades descriptos en una fuente no oficial o desactualizada como si fueran los vigentes hoy, sin confirmarlos contra la reglamentación actual.'
      }
    ],
    environmentContext: null,
    tags: ['marco', 'legal', 'contexto'],
    relatedEntryIds: ['marco-editorial'],
    sourceIds: [
      'decreto-883-2020-reprocann',
      'ley-27350-reprocann'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'REPROCANN: las tres modalidades de inscripción — Atlas del Cultivo Argentino',
      seoDescription: 'Qué distingue al autocultivo, el cultivo solidario y la inscripción vía ONG dentro del REPROCANN, creadas por el Decreto 883/2020.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'industria-cannabis-argentina-actual',
    slug: 'industria-cannabis-argentina-actual',
    categoryId: 'historia',
    title: 'La industria del cannabis en la Argentina actual (2017-2026)',
    summary: '"Historia de la planta" documenta un vacío entre los intentos coloniales y la actualidad, y remite el marco legal moderno a "Marco editorial y responsable". Esta entrada llena ese vacío desde otro ángulo: qué pasó realmente, con qué actores y qué evidencia.',
    intro: '"Historia de la planta" señala explícitamente que no encontró, dentro de su alcance de investigación, evidencia de un cultivo argentino exitoso y sostenido entre la memoria de Belgrano (1797) y la actualidad — y remite el marco legal moderno a "Marco editorial y responsable", sin repetirlo. Esta entrada cubre el tramo que ninguna de las dos desarrolla: qué pasó, concretamente, desde que la Ley 27.350 (2017) reabrió la posibilidad de cultivo registrado en Argentina, con los hechos y las fuentes oficiales que los documentan — no el texto de la norma en sí, que ya está en la otra entrada.',
    sections: [
      {
        id: 'cultivares-propios-conicet',
        title: 'Los primeros cultivares argentinos registrados',
        paragraphs: [
          'En abril de 2023, el Instituto Nacional de Semillas (INASE) resolvió, a pedido de CONICET, inscribir en el Registro Nacional de la Propiedad de Cultivares seis creaciones fitogenéticas de Cannabis sativa L. desarrolladas por CONICET-CENPAT (Puerto Madryn, Chubut): Malvina, Ballena Franca, Cenpat, Pachamama, Conicet y Mariquita. Es, según la evidencia disponible para este atlas, el primer registro oficial de cultivares de Cannabis desarrollados en el país.',
          'Ese registro dejó de ser solo propiedad intelectual sobre el papel al mes siguiente: CONICET confirmó que, durante el verano 2022-2023, se había cultivado a campo abierto en Puerto Madryn un ensayo de 1200 semillas feminizadas del cultivar Malvina (alto en THC) y del cultivar Pachamama (alto en CBD), con la licencia de comercialización otorgada a la empresa Whale Leaf Farm. Es la primera evidencia de cultivo real —no solo de registro— que este atlas documenta para la etapa posterior a la Ley 27.350.'
        ]
      },
      {
        id: 'jujuy-y-la-escala-industrial',
        title: 'Jujuy y la escala industrial',
        paragraphs: [
          'En octubre de 2022, el Gobierno de la Provincia de Jujuy confirmó que Cannava S.E. operaba la primera planta industrial de producción y procesamiento farmacéutico de cannabis medicinal habilitada por ANMAT en el país, con un invernadero automatizado (control computarizado de humedad, temperatura, luz y riego), una primera cosecha de 35 hectáreas y capacidad productiva anual declarada de 80 toneladas de inflorescencias medicinales.',
          'En abril de 2023, la misma provincia anunció un sistema de franquicias biotecnológicas para producción privada: un parque de incubación de más de 70 hectáreas con 66 invernaderos tecnificados de 2500 m² cada uno, con capacidad para 2000 plantas por ciclo en 3 o 4 ciclos anuales, bajo manuales de calidad y estándares de farmacopea alemana y normas GACP/GMP. Ninguna fuente oficial pública consultada para este atlas detalla condiciones técnicas exactas (fotoperiodo, temperatura, humedad relativa) de esa operación — esta entrada no las inventa donde la fuente no las da.'
        ]
      },
      {
        id: 'no-toda-iniciativa-provincial-continuo',
        title: 'No toda iniciativa provincial continuó',
        paragraphs: [
          'La historia reciente no es de crecimiento lineal en todas las jurisdicciones: en abril de 2026, el gobierno de Misiones disolvió MisioPharma (Biofábrica Misiones S.A.), la empresa provincial que producía cannabis medicinal bajo una modalidad híbrida de invernadero y cielo abierto, con el objetivo declarado de "apuntalar la eficiencia del Estado". Documentar este cierre, junto a los casos de continuidad de Jujuy y CONICET-Chubut, evita presentar la industria argentina de cannabis como una trayectoria uniforme de expansión — la evidencia disponible muestra provincias con desarrollos sostenidos y al menos una con una iniciativa discontinuada.'
        ]
      }
    ],
    observations: [
      'Que INASE haya registrado seis cultivares de Cannabis a pedido de CONICET es un hecho documentado en el propio Boletín Oficial. Que ese registro se haya traducido en cultivo real a campo es un hecho distinto, confirmado en este caso por un comunicado posterior de la propia CONICET — sin ese segundo dato, el primero solo demostraría propiedad intelectual, no producción efectiva.',
      'Que Jujuy y Chubut tengan desarrollos documentados no permite generalizar que todas las provincias argentinas tengan una industria de cannabis medicinal en curso — la disolución de MisioPharma en Misiones es evidencia directa de lo contrario para esa jurisdicción en particular.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Presentar el registro de un cultivar en el INASE como si fuera, por sí solo, evidencia de cultivo real a escala — son dos hechos distintos que, en el caso de Malvina y Pachamama, coincidieron, pero que no se implican automáticamente uno al otro.'
      },
      {
        type: 'CONTEXT',
        description: 'Generalizar el desarrollo industrial de una provincia (Jujuy) o de un organismo (CONICET-Chubut) como si describiera el estado de la industria en todo el país, sin considerar casos documentados de discontinuidad como el de Misiones.'
      },
      {
        type: 'OTHER',
        description: 'Repetir condiciones técnicas de cultivo (fotoperiodo, temperatura, humedad) atribuidas a Cannava o a cualquier otro proyecto provincial sin una fuente oficial pública que las respalde — ninguna de las fuentes consultadas para esta entrada las publica.'
      }
    ],
    environmentContext: null,
    tags: ['historia', 'argentina', 'industria'],
    relatedEntryIds: ['historia-de-la-planta-argentina', 'marco-editorial'],
    sourceIds: [
      'oficial-inase-resolucion-238-2023-cultivares-cannabis',
      'oficial-conicet-2023-comercializacion-semillas-cannabis',
      'oficial-cannava-jujuy-planta-anmat-2022',
      'oficial-cannava-jujuy-franquicias-2023',
      'periodistica-misiones-biofabrica-disolucion-2026'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'La industria del cannabis en la Argentina actual (2017-2026) — Atlas del Cultivo Argentino',
      seoDescription: 'Los cultivares argentinos registrados por INASE a pedido de CONICET, la escala industrial de Jujuy (Cannava) y la disolución de MisioPharma en Misiones: qué pasó, con qué fuentes.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'entrenamiento-de-bajo-estres-lst',
    slug: 'entrenamiento-de-bajo-estres-lst',
    categoryId: 'poda',
    title: 'Entrenamiento de bajo estrés (LST): doblar en vez de cortar',
    summary: 'La poda remueve tejido para liberar la dominancia apical. El entrenamiento de bajo estrés (LST) persigue un resultado de forma parecido —más puntos de crecimiento expuestos a la luz— sin remover ningún tejido.',
    intro: '"Poda" describe qué ocurre cuando se remueve el meristema apical: se elimina la fuente de la señal que inhibía las yemas laterales. Esta entrada describe una intervención distinta, que persigue un objetivo de forma parecido —una planta menos dominada por un único eje vertical— sin remover tejido: el entrenamiento de bajo estrés, conocido por su sigla en inglés, LST (low-stress training).',
    sections: [
      {
        id: 'que-es-lst',
        title: 'Qué es el LST',
        paragraphs: [
          'El entrenamiento de bajo estrés consiste en doblar y sujetar (con ataduras blandas u otro método similar) el tallo y las ramas de la planta, sin cortar ningún tejido, para cambiar la orientación de su crecimiento y exponer más puntos de la planta a la luz disponible —en vez de que un único eje vertical concentre la mayor parte de esa exposición—. Es una intervención mecánica sobre la forma, distinta de la intervención fisiológica directa sobre la dominancia apical que describe "Poda".'
        ]
      },
      {
        id: 'por-que-doblar-cambia-el-crecimiento',
        title: 'Por qué doblar un tallo cambia su crecimiento',
        paragraphs: [
          'El transporte de auxina —la misma hormona que, según describe "Poda", viaja desde el meristema apical hacia abajo para inhibir yemas laterales— no es uniforme en todas direcciones dentro del tallo: la orientación del tallo influye en cómo se distribuye esa señal, un fenómeno relacionado con lo que la fisiología vegetal general describe como canalización del transporte de auxina. Esta entrada no desarrolla el mecanismo molecular completo de ese fenómeno —sigue siendo objeto de investigación activa, como ya señala "Poda" sobre la dominancia apical en general— pero es la base fisiológica general por la que cambiar la orientación de un tallo, sin cortarlo, puede modificar qué yemas se desarrollan más.',
          'A diferencia del topping, que sí cuenta con un estudio directo sobre Cannabis sativa citado en "Poda", esta entrada no tiene, dentro de las fuentes consultadas, un estudio específico de LST en Cannabis — se describe el mecanismo general de orientación del tallo y transporte hormonal, sin presentarlo como evidencia directa de la especie.'
        ]
      }
    ],
    observations: [
      'Ver que una rama doblada y sujeta cambia su dirección de crecimiento en los días siguientes es una observación directa de la respuesta de la planta. Concluir que esa técnica produce necesariamente más producción final es una interpretación distinta, que depende de variables (luz disponible para las ramas expuestas, tiempo restante del ciclo) que esta entrada no evalúa — el mismo límite que ya señala "Poda" para el topping.',
      'Que el LST no remueva tejido no significa que esté libre de riesgo: un tallo doblado con demasiada fuerza o de forma repentina puede quebrarse, un daño físico distinto del que describe "Poda" para un corte mal hecho, pero un daño real de todos modos.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Presentar el LST como una alternativa "sin riesgo" al topping por no remover tejido — el riesgo cambia de naturaleza (quiebre del tallo por doblado brusco), no desaparece.'
      },
      {
        type: 'CONTEXT',
        description: 'Aplicar conclusiones del estudio de topping en cáñamo industrial (citado en "Poda") como si fueran evidencia directa también del LST — son dos intervenciones mecánicas distintas sobre el mismo mecanismo general de dominancia apical, no la misma técnica con otro nombre.'
      }
    ],
    environmentContext: [
      'El espacio físico disponible alrededor de la planta condiciona cuánto se puede doblar y sujetar un tallo sin dañarlo — una variable que depende del contenedor y del espacio del cultivo, no del ambiente climático en sí. Esta entrada no fija un ángulo, un momento del ciclo ni un método de sujeción específico.'
    ],
    tags: ['cultivo', 'poda'],
    relatedEntryIds: ['poda', 'cultivo-en-secuencia', 'super-cropping'],
    sourceIds: [
      'academica-beveridge-2023-apical-dominance-review'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Entrenamiento de bajo estrés (LST) — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es el LST, en qué se distingue de la poda por remoción de tejido, y qué base fisiológica general —no evidencia directa de Cannabis— explica por qué doblar un tallo cambia su crecimiento.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'defoliacion',
    slug: 'defoliacion',
    categoryId: 'poda',
    title: 'Defoliación',
    summary: 'Remover hojas grandes que sombrean las inflorescencias inferiores no es lo mismo que remover ramas —y un estudio directo en Cannabis sativa muestra que ese sombreado, no la genética, explica buena parte de por qué las flores de abajo suelen tener menos cannabinoides.',
    intro: '"Poda" describe la remoción del meristema apical y su efecto sobre la dominancia apical. La defoliación es una intervención distinta: remover hojas grandes (típicamente las hojas de abanico que más sombra proyectan) sin tocar ramas ni meristemas, con el objetivo de mejorar cuánta luz llega a los sitios de floración que esas hojas cubren. Esta entrada describe esa intervención y qué encontró, de forma directa sobre Cannabis sativa, un estudio dedicado al tema.',
    sections: [
      {
        id: 'que-es-la-defoliacion',
        title: 'Qué es la defoliación',
        paragraphs: [
          'La defoliación consiste en remover selectivamente hojas grandes —principalmente las hojas de abanico (fan leaves) que, por su tamaño, proyectan sombra sobre las inflorescencias y hojas más pequeñas ubicadas debajo suyo— sin remover ramas ni brotes. Es una intervención distinta de "Poda de bajos", que remueve ramas o brotes enteros en vez de solo hojas, aunque ambas persiguen un objetivo relacionado: mejorar la penetración de luz hacia la parte inferior de la planta.'
        ]
      },
      {
        id: 'evidencia-de-penetracion-de-luz-y-uniformidad',
        title: 'Qué encontró un estudio directo sobre Cannabis sativa',
        paragraphs: [
          'Un estudio publicado en 2021 evaluó cómo la arquitectura de la planta afecta la uniformidad química entre inflorescencias de una misma planta de Cannabis sativa. Encontró que la falta de penetración de luz hacia las inflorescencias ubicadas más abajo en la planta se asocia con una concentración de cannabinoides hasta un 40% menor que en las inflorescencias superiores, mejor iluminadas.',
          'El mismo estudio encontró que intervenciones de arquitectura —remoción de ramas/brotes bajos y defoliación de hojas grandes— mejoraron la uniformidad del perfil químico entre las distintas inflorescencias de una misma planta, atribuible a la mejora en la penetración de luz que esas intervenciones permiten. Es evidencia directa de la especie, no una analogía de otro cultivo.'
        ]
      },
      {
        id: 'lo-que-esta-entrada-no-hace',
        title: 'Lo que esta entrada no hace',
        paragraphs: [
          'Esta entrada no da un momento del ciclo, una cantidad de hojas ni un porcentaje de follaje a remover como "la técnica correcta" — el estudio citado muestra un efecto general de la penetración de luz sobre la uniformidad química, no un protocolo de defoliación paso a paso.',
          'Existe además un estudio que evaluó defoliación simulando daño por granizo en distintas etapas de crecimiento de Cannabis sativa (verificado por lectura directa del texto completo; ver la ficha de la fuente). Esa fuente describe un efecto que depende de la etapa en la que ocurre la defoliación, no un resultado único aplicable a cualquier momento del ciclo. Esta entrada no reproduce las cifras específicas de cada etapa acá, para no convertirse en un desglose estadístico separado de la fuente original.'
        ]
      }
    ],
    observations: [
      'Ver menos desarrollo en las inflorescencias inferiores de una planta con mucho follaje superior es una observación compatible con el mecanismo de sombreado que describe el estudio citado. Concluir que defoliar automáticamente "arregla" esa diferencia en cualquier contexto es una interpretación que ese mismo estudio no sostiene de forma universal.',
      'Que una hoja grande empiece a amarillear y caerse de forma natural hacia el final del ciclo (ver "Cultivo en secuencia") no es lo mismo que una defoliación activa — son dos procesos distintos, uno fisiológico y espontáneo, el otro una intervención deliberada.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Tratar la defoliación como intercambiable con "Poda de bajos" — el estudio citado evaluó ambas intervenciones de arquitectura, pero remover hojas y remover ramas/brotes no son la misma acción ni tienen necesariamente el mismo efecto individual.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Presentar un porcentaje específico de mejora, un momento exacto del ciclo o una cantidad de hojas a remover como si fuera un protocolo validado — el estudio citado documenta un efecto general de la penetración de luz, no una receta cuantificada de defoliación.'
      },
      {
        type: 'OTHER',
        description: 'Asumir que esta entrada no menciona cifras por etapa del estudio de defoliación simulada por granizo porque esas cifras no existen o son dudosas — el estudio fue verificado por lectura directa y sí describe un efecto dependiente de la etapa; esta entrada simplemente no las reproduce acá (ver la ficha de la fuente).'
      }
    ],
    environmentContext: [
      'Cuánto sombrea el follaje superior a las inflorescencias inferiores depende de la densidad de la planta, su arquitectura y cómo esté distribuida la fuente de luz (ver "Poda") — el mismo mecanismo de sombreado puede ser más o menos marcado según el ambiente y la genética.'
    ],
    tags: ['cultivo', 'poda'],
    relatedEntryIds: ['poda', 'poda-de-bajos-bblr', 'entrenamiento-de-bajo-estres-lst', 'moho-gris-botrytis-cinerea'],
    sourceIds: [
      'cientifica-danziger-2021-shape-matters-defoliacion',
      'cientifica-sandoval-2024-defoliacion-estres-mecanico'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Defoliación — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es la defoliación, en qué se distingue de la poda de bajos, y qué encontró un estudio directo sobre Cannabis sativa acerca de la penetración de luz y la uniformidad química entre inflorescencias.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'poda-de-bajos-bblr',
    slug: 'poda-de-bajos',
    categoryId: 'poda',
    title: 'Poda de bajos (BBLR)',
    summary: 'Remover ramas y brotes que quedan atrapados en la sombra de la parte superior de la planta —conocido en inglés como bud site/branch removal (BBLR)— es una intervención distinta de la defoliación, aunque ambas comparten un mismo objetivo de fondo.',
    intro: '"Defoliación" describe la remoción de hojas grandes para mejorar la penetración de luz. Esta entrada describe una intervención relacionada pero distinta: remover ramas o brotes enteros —generalmente los ubicados más abajo en la planta, donde la sombra del follaje superior deja menos luz disponible— conocida en inglés como bud site removal o branch removal (BBLR).',
    sections: [
      {
        id: 'que-es-la-poda-de-bajos',
        title: 'Qué es la poda de bajos',
        paragraphs: [
          'La poda de bajos remueve ramas o brotes de floración completos, no solo hojas, generalmente los ubicados en la parte inferior de la planta. La lógica de la intervención parte de que esos sitios, al recibir menos luz por el sombreado del follaje superior, tienden a desarrollar inflorescencias más pequeñas y con menor concentración de cannabinoides — removerlos redirige los recursos de la planta hacia los sitios mejor iluminados, en lugar de mantener crecimiento en puntos con luz insuficiente.'
        ]
      },
      {
        id: 'misma-evidencia-que-defoliacion',
        title: 'La misma base de evidencia que "Defoliación"',
        paragraphs: [
          'El estudio de 2021 citado en "Defoliación" —que encontró hasta un 40% menos cannabinoides en inflorescencias inferiores peor iluminadas de Cannabis sativa— evaluó la remoción de ramas/brotes bajos como una de las intervenciones de arquitectura que mejoraron la uniformidad química entre inflorescencias de una misma planta. Es la misma fuente y el mismo mecanismo de fondo (penetración de luz) que sustenta "Defoliación"; esta entrada lo aplica a una acción distinta sobre la planta (remover ramas, no solo hojas).'
        ]
      },
      {
        id: 'lo-que-esta-entrada-no-hace',
        title: 'Lo que esta entrada no hace',
        paragraphs: [
          'Esta entrada no fija qué proporción de la planta o qué altura debe removerse — el estudio citado muestra el efecto general de mejorar la penetración de luz, no un umbral cuantificado de cuánto remover en cada caso.'
        ]
      }
    ],
    observations: [
      'Que una inflorescencia inferior se vea visiblemente menos desarrollada que las superiores es una observación compatible con el mecanismo de sombreado descrito en el estudio citado. No implica, por sí sola, que remover esa rama sea la mejor decisión en cualquier contexto — depende de cuánto tiempo de ciclo resta y de cuánta luz recibiría esa rama si se dejara.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Tratar "Poda de bajos" y "Defoliación" como la misma técnica con dos nombres — comparten el mismo objetivo de fondo (mejorar penetración de luz) y la misma fuente de evidencia, pero una remueve ramas/brotes y la otra remueve hojas.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Asumir que remover más ramas bajas siempre mejora el resultado final — el estudio citado documenta una mejora en la uniformidad química, no una relación donde "más remoción" sea proporcionalmente mejor sin límite.'
      }
    ],
    environmentContext: [
      'Cuánta luz efectivamente pierde una rama baja por sombreado depende de la densidad del follaje superior y de cómo está distribuida la fuente de luz (ver "Poda" y "Defoliación") — el mismo mecanismo puede ser más o menos marcado según el ambiente y la arquitectura de cada planta.'
    ],
    tags: ['cultivo', 'poda'],
    relatedEntryIds: ['poda', 'defoliacion', 'entrenamiento-de-bajo-estres-lst'],
    sourceIds: [
      'cientifica-danziger-2021-shape-matters-defoliacion'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Poda de bajos (BBLR) — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es la poda de bajos o BBLR, en qué se distingue de la defoliación, y qué evidencia directa sobre Cannabis sativa comparten ambas intervenciones de arquitectura.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'super-cropping',
    slug: 'super-cropping',
    categoryId: 'poda',
    title: 'Super cropping y tigmomorfogénesis',
    summary: 'Doblar un tallo hasta dañar sus tejidos internos, sin romper la corteza, se apoya en un mecanismo vegetal real y bien documentado —la respuesta al estrés mecánico—, pero sin un estudio dedicado a Cannabis sativa que lo confirme de forma directa.',
    intro: '"Entrenamiento de bajo estrés (LST)" describe doblar tallos y ramas sin dañar ningún tejido. El super cropping es una técnica relacionada pero distinta: doblar el tallo con más fuerza, de forma deliberada, hasta dañar los tejidos internos (fibras) mientras la corteza externa permanece intacta — con el objetivo buscado de que la planta responda engrosando esa zona. Esta entrada describe el mecanismo vegetal general en el que se apoya esa lógica, y es explícita sobre el límite de la evidencia disponible.',
    sections: [
      {
        id: 'que-es-el-super-cropping',
        title: 'Qué es el super cropping',
        paragraphs: [
          'El super cropping consiste en presionar y doblar un tallo o rama entre los dedos hasta sentir que las fibras internas ceden, sin que la corteza externa se rompa —a diferencia de un quiebre completo, que sí seccionaría el tallo—. El resultado buscado es que la planta, en respuesta a ese daño interno controlado, desarrolle un tallo más grueso y resistente en esa zona.'
        ]
      },
      {
        id: 'tigmomorfogenesis-el-mecanismo-general',
        title: 'Tigmomorfogénesis: el mecanismo vegetal general detrás de la idea',
        paragraphs: [
          'La tigmomorfogénesis es el nombre que la fisiología vegetal general da a los cambios de crecimiento y desarrollo que las plantas experimentan en respuesta a un estímulo mecánico repetido —viento, roce, flexión—. Una revisión académica reciente sobre el tema describe que ese tipo de estrés mecánico puede inducir, en plantas en general, tallos más cortos y gruesos como parte de la respuesta adaptativa. Es el mecanismo general en el que se apoya conceptualmente la lógica del super cropping.',
          'Esa revisión no es un estudio de Cannabis sativa: es una síntesis de fisiología vegetal general, sin datos propios de ninguna especie en particular. Se cita acá exactamente en ese rol —el marco biológico general del que la técnica toma su lógica—, no como evidencia directa de que el super cropping produce ese efecto en Cannabis.'
        ]
      },
      {
        id: 'lo-que-esta-entrada-no-hace',
        title: 'Lo que esta entrada no hace',
        paragraphs: [
          'Dentro de las fuentes consultadas para esta investigación no se encontró un estudio dedicado a evaluar el super cropping de forma directa en Cannabis sativa —a diferencia del topping, que sí cuenta con el estudio directo citado en "Poda". Esta entrada no presenta ninguna cifra de engrosamiento, rendimiento o resistencia como resultado confirmado de la técnica: describe el mecanismo general y señala explícitamente esa ausencia de evidencia específica.'
        ]
      }
    ],
    observations: [
      'Ver que una zona doblada de un tallo se engrosa en las semanas siguientes es una observación compatible con la respuesta general a estrés mecánico que describe la tigmomorfogénesis. Concluir que ese engrosamiento se traduce en mayor producción final es una interpretación adicional que esta entrada no puede respaldar con un estudio directo de la especie.'
    ],
    signals: [
      {
        level: 'ATTENTION',
        description: 'Un tallo que se quiebra por completo (corteza incluida), en vez de doblarse con daño interno controlado, es un resultado distinto del buscado por la técnica y amerita evaluar si la planta puede sostener esa rama o si conviene removerla.'
      }
    ],
    commonMistakes: [
      {
        type: 'CONTEXT',
        description: 'Presentar el super cropping como una técnica con evidencia directa de Cannabis sativa equivalente a la del topping — el mecanismo general (tigmomorfogénesis) está bien documentado en fisiología vegetal, pero esta entrada no encontró un estudio dedicado a la técnica en esta especie.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Confundir un tallo quebrado por completo con un super cropping "exitoso" — la técnica busca dañar fibras internas sin romper la corteza; un quiebre total es un resultado distinto, con más riesgo para esa rama.'
      }
    ],
    environmentContext: null,
    tags: ['cultivo', 'poda'],
    relatedEntryIds: ['poda', 'entrenamiento-de-bajo-estres-lst', 'estres-ambiental-y-crecimiento'],
    sourceIds: [
      'academica-jedrzejuk-2025-tigmomorfogenesis-review'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Super cropping y tigmomorfogénesis — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es el super cropping, qué mecanismo general de fisiología vegetal (tigmomorfogénesis) sustenta su lógica, y por qué no existe, en las fuentes consultadas, un estudio dedicado a la técnica en Cannabis sativa.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'fim',
    slug: 'fim',
    categoryId: 'poda',
    title: 'FIM',
    summary: 'FIM remueve una porción del meristema apical en vez de la totalidad que remueve el topping — una diferencia real y descriptible, aunque, a diferencia del topping, sin un estudio dedicado que confirme sus efectos específicos en Cannabis sativa.',
    intro: '"Poda" describe el topping: la remoción completa del meristema apical, respaldada por un estudio directo en cáñamo industrial. El FIM es una variante surgida de la comunidad de cultivo que remueve solo una parte de esa punta de crecimiento. Esta entrada describe la técnica y es explícita sobre una diferencia importante con el topping: el nivel de evidencia disponible.',
    sections: [
      {
        id: 'que-es-el-fim',
        title: 'Qué es el FIM',
        paragraphs: [
          'El FIM (comúnmente descrito como sigla de una frase informal en inglés, sin una fuente científica que fije su origen exacto) consiste en remover aproximadamente entre un 75% y un 80% del meristema apical, en vez del 100% que remueve un topping típico. La descripción de la técnica en la comunidad de cultivo sostiene que, al dejar una porción de tejido meristemático dañado pero no eliminado por completo, pueden desarrollarse más puntos de crecimiento nuevos que los que libera un topping limpio —donde típicamente se desarrollan dos ramas principales a partir de las yemas inmediatamente inferiores—.'
        ]
      },
      {
        id: 'misma-logica-fisiologica-que-poda',
        title: 'La misma lógica fisiológica de fondo que "Poda"',
        paragraphs: [
          'El mecanismo de fondo es el mismo que describe "Poda": dañar o remover el meristema apical reduce la señal (auxina) que inhibe a las yemas laterales, liberándolas para desarrollarse. Una remoción parcial, en principio, plantea la misma lógica que una remoción total, pero de forma menos completa y con daño distribuido de forma menos definida en el tejido restante que un corte limpio.'
        ]
      },
      {
        id: 'la-diferencia-de-evidencia-con-el-topping',
        title: 'La diferencia de evidencia con el topping',
        paragraphs: [
          'El topping cuenta, según describe "Poda", con un estudio directo en dos cultivares de cáñamo industrial (Cannabis sativa L.) que midió cambios en morfología, fisiología y composición bioquímica. Dentro de las fuentes consultadas para esta investigación, no se encontró un estudio equivalente dedicado específicamente al FIM en Cannabis sativa: la descripción de sus efectos —incluida la idea de que produce más puntos de crecimiento que el topping— proviene de documentación de la comunidad de cultivo, no de una fuente académica o científica revisada por pares.',
          'Esto no significa que la técnica no tenga ningún efecto —remover tejido meristemático, aunque sea parcialmente, es consistente con el mecanismo general de dominancia apical—, sino que esta entrada no puede citar una cifra o un resultado específico de FIM en Cannabis con el mismo respaldo que "Poda" cita para el topping. Es, en sí mismo, un dato editorial relevante: la ausencia de evidencia dedicada no es lo mismo que evidencia de que la técnica no funciona.'
        ]
      }
    ],
    observations: [
      'Ver el desarrollo de más de dos puntos de crecimiento nuevos tras un corte de FIM es una observación reportada de forma consistente por la comunidad de cultivo. Presentarla como un resultado científicamente cuantificado y garantizado es una interpretación que esta entrada no puede respaldar sin un estudio dedicado a la técnica.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'OTHER',
        description: 'Presentar el FIM como una técnica con el mismo nivel de evidencia que el topping — "Poda" cita un estudio directo en Cannabis sativa para el topping; para el FIM, dentro de las fuentes consultadas, solo se encontró documentación de comunidad de cultivo, no un estudio científico dedicado.'
      },
      {
        type: 'INTERPRETATION',
        description: 'Afirmar un número fijo de nuevos puntos de crecimiento ("siempre salen cuatro colas") como si fuera una regla biológica —la respuesta depende de dónde y cuánto tejido meristemático quede dañado, algo que varía según cómo se ejecute el corte.'
      }
    ],
    environmentContext: null,
    tags: ['cultivo', 'poda'],
    relatedEntryIds: ['poda', 'entrenamiento-de-bajo-estres-lst'],
    sourceIds: [
      'cientifica-chavalina-2026-hemp-topping-morphology',
      'academica-beveridge-2023-apical-dominance-review'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'FIM — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es el FIM, en qué se diferencia técnicamente del topping, y por qué, a diferencia del topping, no existe dentro de las fuentes consultadas un estudio científico dedicado a sus efectos en Cannabis sativa.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'herramientas-e-higiene-de-poda',
    slug: 'herramientas-e-higiene',
    categoryId: 'poda',
    title: 'Herramientas e higiene de poda',
    summary: 'Cada corte es una herida abierta en la planta, y una herramienta contaminada puede transformar una poda de rutina en la vía de entrada de un patógeno — una práctica de higiene general de horticultura, no específica de Cannabis.',
    intro: 'Ninguna de las entradas de esta categoría —"Poda", "Entrenamiento de bajo estrés (LST)", "Defoliación", "Poda de bajos" o "FIM"— trata la higiene de las herramientas usadas para intervenir. Esta entrada cubre ese punto en común: por qué desinfectar herramientas de corte importa, y cómo hacerlo según una guía institucional de horticultura general.',
    sections: [
      {
        id: 'por-que-importa',
        title: 'Por qué importa: cada corte es una vía de entrada',
        paragraphs: [
          'Cualquier corte —sea un topping, una defoliación o la remoción de una rama baja— abre una herida en el tejido de la planta. Una guía institucional de extensión agrícola señala que la limpieza y desinfección de herramientas de poda es importante para prevenir la propagación de enfermedades: una herramienta que tocó tejido enfermo (u otra planta enferma) puede transportar el patógeno hacia el corte siguiente si no se desinfecta entre uso y uso.',
          'Es un principio de higiene general de horticultura, no un hallazgo específico de Cannabis sativa —el mismo tipo de evidencia general que ya sustenta, por ejemplo, la sección de prevención de "Chupadera fungosa (damping-off)" en la categoría Sanidad.'
        ]
      },
      {
        id: 'como-desinfectar',
        title: 'Cómo desinfectar: dos métodos según el caso',
        paragraphs: [
          'La misma guía describe dos métodos según la situación. Para uso general —desinfectar entre plantas o antes de remover tejido potencialmente enfermo— recomienda alcohol isopropílico o etílico al 70%, aplicado por inmersión breve o frotado sobre la herramienta, sin necesidad de un remojo prolongado.',
          'Para patógenos más resistentes (la guía cita específicamente el caso del fuego bacteriano en manzanos, para el cual el alcohol no es efectivo) recomienda en cambio una solución de lavandina al 10% (nueve partes de agua por una parte de lavandina), con un remojo de al menos diez minutos y un enjuague posterior de la herramienta para evitar que la lavandina la corroa.'
        ]
      },
      {
        id: 'lo-que-esta-entrada-no-hace',
        title: 'Lo que esta entrada no hace',
        paragraphs: [
          'Esta entrada no evalúa qué patógenos específicos de Cannabis sativa se transmiten por herramientas contaminadas —esa evidencia, si existe, corresponde a la categoría Sanidad, no a esta entrada sobre higiene general de herramientas de poda.'
        ]
      }
    ],
    observations: [
      'Que una planta desarrolle síntomas de enfermedad después de una poda no prueba, por sí solo, que la herramienta estuviera contaminada — hay otras vías de contagio y otros orígenes posibles (ver "Lectura de señales y sanidad"). Es un factor de riesgo a controlar, no la única causa posible.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'OBSERVATION',
        description: 'Asumir que una herramienta "se ve limpia" significa que está desinfectada — la guía citada distingue limpieza visible (remover restos de tejido o tierra) de desinfección (eliminar patógenos), que requiere alcohol o una solución específica, no solo un paño.'
      },
      {
        type: 'CONTEXT',
        description: 'Usar lavandina sin diluir o sin enjuague posterior pensando que "más fuerte es mejor" — la guía citada especifica una dilución concreta y un enjuague, precisamente porque la lavandina sin diluir puede corroer la herramienta.'
      }
    ],
    environmentContext: null,
    tags: ['cultivo', 'poda', 'sanidad'],
    relatedEntryIds: ['poda', 'lectura-de-senales', 'chupadera-fungosa-damping-off', 'moho-gris-botrytis-cinerea'],
    sourceIds: [
      'institucional-iowa-state-extension-2026-higiene-herramientas-poda'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-19',
    metadata: {
      seoTitle: 'Herramientas e higiene de poda — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué desinfectar herramientas de poda entre cortes previene la transmisión de enfermedades, y cómo hacerlo según una guía institucional de horticultura general.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'ph-y-disponibilidad-de-nutrientes',
    slug: 'ph-y-disponibilidad-de-nutrientes',
    categoryId: 'fertilizacion',
    title: 'pH y disponibilidad: por qué un nutriente presente no siempre está disponible',
    summary: '"Fertilización y nutrición" señala que la disponibilidad real de un nutriente depende de más que su sola presencia en el sustrato, sin desarrollarlo. Esta entrada retoma exactamente ese punto.',
    intro: '"Fertilización y nutrición" cierra su última sección señalando que un síntoma de carencia visible no siempre significa que el nutriente falte en términos absolutos en el sustrato, y que esa entrada no desarrolla esa relación "por depender de demasiadas variables específicas de cada sustrato". Esta entrada retoma ese punto dejado abierto, con una de esas variables: el pH del sustrato.',
    sections: [
      {
        id: 'forma-quimica-no-solo-cantidad',
        title: 'La forma química importa tanto como la cantidad',
        paragraphs: [
          'Que un nutriente esté presente en el sustrato no significa que esté en una forma química que la raíz pueda absorber. El pH del sustrato —qué tan ácido o alcalino es— influye directamente en la forma química en la que se encuentra cada nutriente disuelto en la solución del sustrato, y esa forma es la que determina si la raíz puede tomarlo o no.'
        ]
      },
      {
        id: 'el-hierro-como-caso-documentado',
        title: 'El hierro como caso documentado de baja movilidad y sensibilidad al pH',
        paragraphs: [
          'Una guía de fisiología vegetal sobre micronutrientes documenta al hierro como un caso concreto de nutriente con movilidad baja dentro de la planta —su deficiencia se expresa primero en las hojas jóvenes, el patrón opuesto al del nitrógeno o el fósforo que ya describe "Fertilización y nutrición"—. La disponibilidad del hierro en el sustrato es, además, muy sensible a la forma química en la que se encuentra, algo que varía con las condiciones del sustrato: un suelo o sustrato con pH fuera del rango adecuado para ese nutriente puede tener hierro presente en cantidad, pero en una forma poco disponible para la raíz.',
          'Esto es exactamente el caso que "Fertilización y nutrición" advierte al final: un síntoma de carencia (clorosis en hojas jóvenes, compatible con falta de hierro) puede aparecer sin que el nutriente falte en el sustrato en términos absolutos — puede estar presente pero no disponible, por una condición del sustrato distinta de la cantidad aplicada.'
        ]
      }
    ],
    observations: [
      'Ver clorosis en las hojas jóvenes de una planta es una observación compatible con carencia de hierro (ver "Fertilización y nutrición"). Concluir de inmediato que "falta agregar hierro" sin considerar que el sustrato podría tener el nutriente en una forma poco disponible es una interpretación que puede llevar a corregir la variable equivocada.',
      'Agregar más de un nutriente que ya está presente pero poco disponible no resuelve el problema de disponibilidad — puede, incluso, generar un exceso una vez que la condición que limitaba la disponibilidad se corrija por otra vía.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Asumir que todo síntoma de carencia se resuelve agregando más del nutriente correspondiente, sin considerar que el problema puede ser de disponibilidad (forma química) y no de cantidad presente.'
      },
      {
        type: 'CONTEXT',
        description: 'Corregir un síntoma de carencia sin revisar antes si hay una condición del sustrato (como el pH) que esté limitando la disponibilidad del nutriente ya presente.'
      }
    ],
    environmentContext: [
      'Esta entrada no da un rango de pH de referencia para Cannabis sativa ni para ningún sustrato en particular — depende de la especie, del sustrato y del nutriente puntual en cuestión, y esta entrada se limita al principio general de que el pH modifica la disponibilidad, no a una cifra prescriptiva.'
    ],
    tags: ['fertilización', 'nutrición'],
    relatedEntryIds: ['fertilizacion-y-nutricion', 'sustrato-y-drenaje', 'calidad-del-agua-de-riego', 'conductividad-electrica-y-sales'],
    sourceIds: [
      'academica-kirkby-romheld-2007-micronutrientes-fisiologia',
      'academica-unne-nutricion-mineral-dabrio-2020'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'pH y disponibilidad de nutrientes — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué la presencia de un nutriente en el sustrato no garantiza su disponibilidad para la raíz, con el hierro como caso documentado de sensibilidad al pH.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'almacenamiento',
    slug: 'almacenamiento',
    categoryId: 'manejo-poscosecha',
    title: 'Almacenamiento: qué pasa después del curado',
    summary: 'El curado estabiliza el perfil organoléptico del material seco. Lo que ocurre después —cómo se guarda, con qué luz, qué temperatura y qué exposición al aire— sigue afectando su composición con el paso del tiempo.',
    intro: '"Manejo poscosecha: secado y curado" describe el secado y el curado como los dos procesos centrales de manejo del material ya cosechado. Esta entrada mira el paso siguiente, distinto de ambos: qué pasa con ese material una vez guardado, y por qué las condiciones de almacenamiento siguen importando después de terminado el curado.',
    sections: [
      {
        id: 'la-degradacion-no-se-detiene',
        title: 'La composición sigue cambiando después del curado',
        paragraphs: [
          'Un estudio de estabilidad de cannabinoides en material vegetal y productos derivados de Cannabis sativa, bajo distintas condiciones de almacenamiento prolongado, encontró que la temperatura ambiente acelera la degradación del THC hacia cannabinol (CBN) —un cannabinoide distinto, con propiedades distintas—, mientras que el almacenamiento a −20 °C preserva mejor el perfil de cannabinoides original a lo largo del tiempo.',
          'El mismo trabajo encontró una diferencia notable entre cannabinoides: los productos dominados por CBD mostraron estabilidad robusta incluso a temperatura ambiente, mientras que los dominados por THC resultaron mucho más sensibles a la degradación ambiental — es decir, "cuánto importa" la temperatura de almacenamiento depende también de qué cannabinoide predomina en el material, no es una regla única para cualquier planta.'
        ]
      },
      {
        id: 'que-no-afirma-esta-entrada',
        title: 'Qué no afirma esta entrada',
        paragraphs: [
          'El estudio citado no se pudo leer en su versión completa en esta sesión —el acceso a la revista está restringido—, por lo que esta entrada se limita a lo que su resumen público respalda: la dirección general del efecto (temperatura ambiente acelera la conversión de THC a CBN; frío la retrasa) y la diferencia entre productos dominados por THC y por CBD. No se cita ninguna cifra exacta de porcentaje de degradación ni un plazo específico, por no estar verificados por lectura directa.',
          'Tampoco se deriva de acá ninguna recomendación de temperatura de guarda doméstica: el estudio trabajó con condiciones de temperatura ambiente, refrigeración y freezer (−20 °C) como puntos de comparación experimental, no como una escala de recomendaciones de uso cotidiano.'
        ]
      }
    ],
    observations: [
      'Que el estudio haya medido una conversión de THC a CBN más rápida a temperatura ambiente que a −20 °C es un hallazgo reportado en su resumen. Convertir eso en la instrucción "hay que guardar todo en el freezer" sería una recomendación que esta entrada no hace, porque el propio resumen no evalúa el efecto práctico de eso sobre el uso cotidiano del material, ni compara contra condiciones intermedias más habituales (como un lugar oscuro y fresco a temperatura ambiente).',
      'Que un producto dominado por CBD haya mostrado más estabilidad a temperatura ambiente que uno dominado por THC es un dato sobre el material, no sobre el método de guarda — cambia qué tan sensible es un material dado al paso del tiempo, no invalida la observación general de que la temperatura influye en la degradación.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Extraer una recomendación operativa concreta (por ejemplo, "guardar en el freezer") de un hallazgo de laboratorio que comparó condiciones experimentales, sin que el estudio citado evalúe esa recomendación específicamente.'
      },
      {
        type: 'CONTEXT',
        description: 'Aplicar la misma expectativa de estabilidad a un material dominado por THC que a uno dominado por CBD, cuando el propio estudio documenta una diferencia real entre ambos.'
      },
      {
        type: 'OTHER',
        description: 'Presentar una cifra exacta de degradación o un plazo específico atribuido a este estudio sin haber podido verificarlo por lectura directa del texto completo — esta entrada evita hacerlo explícitamente.'
      }
    ],
    environmentContext: [
      'Esta entrada no fija una condición de almacenamiento única ni recomendada para ningún contexto argentino en particular: describe el hallazgo general de un estudio internacional sobre la dirección del efecto de la temperatura, no una guía de guarda doméstica.'
    ],
    tags: ['cosecha', 'maduración'],
    relatedEntryIds: ['poscosecha'],
    sourceIds: [
      'cientifica-majumdar-2026-cannabinoid-storage-stability'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'Almacenamiento: qué pasa después del curado — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué el perfil de cannabinoides sigue cambiando después del curado, y qué encontró un estudio reciente sobre el efecto de la temperatura de almacenamiento en la conversión de THC a CBN.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'canamo-industrial-frontera-thc',
    slug: 'canamo-industrial-frontera-thc',
    categoryId: 'genetica-tipos',
    title: 'Cáñamo industrial: la frontera genética y legal del 1% de THC',
    summary: '"Genética y tipos" describe el quimiotipo como una clasificación química, no botánica. Esta entrada mira un caso concreto de esa clasificación con consecuencias legales directas en Argentina: el cáñamo industrial.',
    intro: '"Genética y tipos: sativa, indica, ruderalis" ya distingue el quimiotipo —la proporción entre THCA y CBDA— de la clasificación taxonómica tradicional. Esta entrada aplica esa distinción a un caso concreto, con consecuencias legales directas en Argentina: la frontera del 1 % de THC que separa, en la Ley 27.669, al cáñamo industrial del resto de Cannabis sativa.',
    sections: [
      {
        id: 'una-frontera-legal-sobre-una-base-genetica',
        title: 'Una frontera legal trazada sobre una base genética',
        paragraphs: [
          'La Ley 27.669 excluye explícitamente del alcance penal de la Ley 23.737 a las plantas de Cannabis sativa con no más de 1 % de THC en peso seco, categoría que la norma llama cáñamo industrial —destinado a fibra, semilla u otros usos no psicoactivos—. Esa cifra no es un umbral arbitrario en términos botánicos: coincide, en términos generales, con el rango de plantas cuyo quimiotipo (ver "Genética y tipos") está dominado por CBDA en vez de THCA — la misma clasificación química que esa entrada ya describe, aplicada acá como criterio legal, no solo académico.',
          'Esta entrada no repite el detalle institucional de ARICCAME ni el trámite de licencias industriales, ya descriptos en "Marco editorial y responsable" — se enfoca en la base genética/química de la distinción entre cáñamo industrial y el resto de Cannabis sativa.'
        ]
      },
      {
        id: 'diversidad-genetica-del-canamo',
        title: 'El cáñamo no es genéticamente uniforme',
        paragraphs: [
          'Un estudio con 27 cultivares de cáñamo industrial —15 de aceite esencial y 12 de fibra/grano— encontró que el umbral fotoperiódico crítico (la duración de oscuridad necesaria para disparar la floración, ver "Luz como señal temporal") varía sustancialmente entre cultivares, de forma más marcada entre los de aceite esencial que entre los de fibra/grano. Es evidencia directa de Cannabis sativa —no una analogía con otra especie— de que "cáñamo industrial" no describe una única variedad genética uniforme, sino un conjunto de cultivares distintos que comparten el criterio legal del bajo THC, no necesariamente el resto de sus características.',
          'Esto es coherente con la advertencia general que ya hace "Genética y tipos" sobre los nombres comerciales de Cannabis: "cáñamo industrial" es, ante todo, una categoría legal y química (definida por el THC), no una descripción completa de la genética de la planta que la cumple.'
        ]
      }
    ],
    observations: [
      'Que una planta tenga 1 % o menos de THC en peso seco es una medición química verificable, la misma base que define el quimiotipo dominado por CBDA que ya describe "Genética y tipos". Que esa planta sea además fotoperiódicamente similar a cualquier otro cultivar de cáñamo es una suposición que el estudio de 27 cultivares no respalda — el umbral fotoperiódico varía entre ellos.',
      'Cumplir el criterio legal de cáñamo industrial (≤ 1 % THC) no dice nada, por sí solo, sobre si esa planta es de fibra, de grano o de aceite esencial — son categorías de uso agronómico distintas del criterio de THC que define la categoría legal.'
    ],
    signals: null,
    commonMistakes: [
      {
        type: 'INTERPRETATION',
        description: 'Tratar "cáñamo industrial" como si fuera una única variedad genética homogénea, cuando la evidencia directa de Cannabis sativa muestra diversidad real de umbral fotoperiódico (y, por extensión, de otras características) entre cultivares que cumplen igualmente el criterio legal de bajo THC.'
      },
      {
        type: 'CONTEXT',
        description: 'Confundir el criterio legal argentino (≤ 1 % THC en peso seco, Ley 27.669) con el criterio botánico de "sativa/indica" que ya describe "Genética y tipos" como sin validez taxonómica formal — son clasificaciones de naturaleza distinta.'
      }
    ],
    environmentContext: null,
    tags: ['genética', 'taxonomía', 'legal'],
    relatedEntryIds: ['genetica-y-tipos', 'marco-editorial', 'luz-y-fotoperiodo'],
    sourceIds: [
      'ley-27669-marco-industrial',
      'cientifica-zhang-2021-hemp-photoperiod-cultivars'
    ],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'Cáñamo industrial: la frontera genética y legal del 1% de THC — Atlas del Cultivo Argentino',
      seoDescription: 'Por qué el umbral legal argentino de 1% de THC (Ley 27.669) coincide con una distinción de quimiotipo, y por qué el cáñamo industrial no es una única variedad genética uniforme.',
      canonical: null,
      ogImage: null
    }
  },

  // ============================================================================================
  // Ronda 2026-09-18 — recursos de los 3 bloques nuevos: Material de lectura, Documentales,
  // Noticias. Cada "entrada" acá es un recurso externo curado, no un artículo propio del atlas:
  // `intro`/`sections` describen el recurso, y `sourceIds` apunta a la fuente real (enlace,
  // autor/institución y fecha viven en el registro de fuentes, ver sources.js).
  // ============================================================================================
  {
    id: 'lectura-oms-informe-critico-cannabis',
    slug: 'informe-critico-oms-cannabis',
    categoryId: 'material-de-lectura',
    title: 'Cannabis and cannabis resin: informe crítico de la OMS',
    summary: 'La primera revisión científica completa de la Organización Mundial de la Salud sobre Cannabis desde 1935, preparada para su Comité de Expertos en Farmacodependencia.',
    intro: 'En agosto de 2018, la Organización Mundial de la Salud publicó "Cannabis and cannabis resin", el informe de revisión crítica preparado para la 41ª reunión de su Comité de Expertos en Farmacodependencia (ECDD) — la primera revisión científica de la OMS sobre esta planta desde 1935. El documento completo está disponible de forma gratuita en el sitio institucional de la OMS.',
    sections: [
      {
        id: 'por-que-se-recomienda',
        title: 'Por qué se incluye en esta selección',
        paragraphs: [
          'Es un documento oficial, de acceso abierto y con metodología de revisión por comité de expertos declarada — un punto de partida de referencia internacional para quien quiera leer una revisión científica institucional sobre la planta, más allá del contenido propio de este atlas. Esta entrada no resume sus conclusiones ni las usa para respaldar ninguna afirmación puntual de otra parte del atlas: se lo incluye como material de lectura recomendado, a leer en su fuente original.'
        ]
      }
    ],
    observations: [],
    signals: null,
    commonMistakes: [],
    environmentContext: null,
    tags: ['lectura'],
    relatedEntryIds: [],
    sourceIds: ['oficial-oms-2018-cannabis-critical-review'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'Cannabis and cannabis resin: informe crítico de la OMS — Atlas del Cultivo Argentino',
      seoDescription: 'La revisión científica de la Organización Mundial de la Salud sobre Cannabis (2018), preparada para su Comité de Expertos en Farmacodependencia. Acceso libre al documento original.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'lectura-ariccame-preguntas-frecuentes',
    slug: 'preguntas-frecuentes-ariccame',
    categoryId: 'material-de-lectura',
    title: 'Preguntas frecuentes sobre la regulación del cáñamo y cannabis en Argentina',
    summary: 'El recurso oficial de referencia de ARICCAME para entender el marco regulatorio argentino del cáñamo y el cannabis medicinal, en formato de preguntas y respuestas.',
    intro: 'ARICCAME, la Agencia Regulatoria de la Industria del Cáñamo y del Cannabis Medicinal, publica en el portal argentina.gob.ar una guía de preguntas frecuentes sobre el marco regulatorio vigente. Es un recurso oficial y de acceso directo, complementario del resumen ya disponible en "Marco editorial y responsable" de este atlas.',
    sections: [
      {
        id: 'como-usar-este-recurso',
        title: 'Cómo se usa este recurso',
        paragraphs: [
          'Al tratarse de una página oficial mantenida por el propio organismo regulador, es la referencia más directa para consultar el estado vigente de requisitos y trámites — que, como ya advierte "Marco editorial y responsable", cambian con el tiempo. Esta entrada no reproduce su contenido: enlaza a la fuente para que se consulte actualizada.'
        ]
      }
    ],
    observations: [],
    signals: null,
    commonMistakes: [],
    environmentContext: null,
    tags: ['lectura', 'legal'],
    relatedEntryIds: ['marco-editorial', 'reprocann-modalidades'],
    sourceIds: ['oficial-ariccame-preguntas-frecuentes'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'Preguntas frecuentes sobre la regulación del cáñamo y cannabis en Argentina — Atlas del Cultivo Argentino',
      seoDescription: 'El recurso oficial de ARICCAME, en formato de preguntas y respuestas, para consultar el estado vigente del marco regulatorio argentino.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'lectura-guia-evaluacion-visual-suelo',
    slug: 'guia-evaluacion-visual-del-suelo',
    categoryId: 'material-de-lectura',
    title: 'Guía para la evaluación visual de la calidad del suelo',
    summary: 'Un manual académico de acceso abierto, elaborado por la Facultad de Agronomía de la UNLPam junto con el INTA, para leer la calidad del suelo con indicadores visuales y táctiles.',
    intro: 'Esta guía, editada por la Universidad Nacional de La Pampa junto con la EEA INTA Anguil, es la fuente central de la entrada "Evaluación visual del suelo" de este atlas. Se incluye acá también como lectura recomendada completa, para quien quiera ir más allá del recorte específico que hace esa entrada.',
    sections: [],
    observations: [],
    signals: null,
    commonMistakes: [],
    environmentContext: null,
    tags: ['lectura', 'suelo'],
    relatedEntryIds: ['evaluacion-visual-del-suelo', 'sustrato-y-drenaje'],
    sourceIds: ['academica-unlpam-inta-guia-evaluacion-visual-suelo'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'Guía para la evaluación visual de la calidad del suelo — Atlas del Cultivo Argentino',
      seoDescription: 'Manual académico de acceso abierto (UNLPam / INTA Anguil) sobre indicadores visuales y táctiles de calidad de suelo.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'lectura-pollio-nombre-cannabis',
    slug: 'el-nombre-del-cannabis-pollio',
    categoryId: 'material-de-lectura',
    title: 'The Name of Cannabis: A Short Guide for Nonbotanists',
    summary: 'Un artículo académico breve y de acceso abierto que reconstruye la historia taxonómica real detrás de los nombres "sativa", "indica" y "ruderalis".',
    intro: 'El artículo de Antonio Pollio, publicado en Cannabis and Cannabinoid Research (2016), es la fuente central de la sección histórica de "Genética y tipos: sativa, indica, ruderalis" en este atlas. Se incluye acá completo como lectura recomendada: es corto, de acceso abierto, y está escrito explícitamente para un público no especializado en botánica.',
    sections: [],
    observations: [],
    signals: null,
    commonMistakes: [],
    environmentContext: null,
    tags: ['lectura', 'genética', 'taxonomía'],
    relatedEntryIds: ['genetica-y-tipos'],
    sourceIds: ['cientifica-pollio-2016-nombre-cannabis-taxonomia'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'The Name of Cannabis: A Short Guide for Nonbotanists — Atlas del Cultivo Argentino',
      seoDescription: 'Artículo académico de acceso abierto (Pollio, 2016) sobre el origen histórico de los nombres sativa, indica y ruderalis.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'documental-cannabis-medicinal',
    slug: 'cannabis-medicinal-documental',
    categoryId: 'documentales',
    title: 'Cannabis medicinal (2023)',
    summary: 'Dirigido por la neurocientífica de CONICET Silvia Kochen junto a Emiliano Serra, recorre cómo ciencia, medicina, pacientes, familias, ONGs y cultivadores confluyeron en el marco regulatorio argentino actual.',
    intro: 'Estrenado el 11 de mayo de 2023 en el cine Gaumont de Buenos Aires, "Cannabis medicinal" es un documental de 61 minutos producido por Duermevela con el sello CONICET Documental y apoyo del INCAA. Incluye testimonios de José Mujica y de Raphael Mechoulam, el investigador que aisló el THC por primera vez.',
    sections: [
      {
        id: 'quien-lo-dirige',
        title: 'Quién lo dirige',
        paragraphs: [
          'Silvia Kochen es neurocientífica de CONICET, coordinadora de la Red de Cannabis Medicinal e Industrial (RACME) y co-dirige Cannabis CONICET — no es una producción externa al ecosistema científico argentino que investiga el tema, sino uno de sus propios investigadores documentando ese proceso desde adentro.'
        ]
      }
    ],
    observations: [],
    signals: null,
    commonMistakes: [],
    environmentContext: null,
    tags: ['documental', 'argentina'],
    relatedEntryIds: ['industria-cannabis-argentina-actual', 'marco-editorial'],
    sourceIds: ['documental-cannabis-medicinal-2023'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'Cannabis medicinal (2023) — Atlas del Cultivo Argentino',
      seoDescription: 'Documental argentino (2023) dirigido por Silvia Kochen (CONICET) y Emiliano Serra sobre el camino hacia el marco regulatorio actual del cannabis medicinal.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'documental-madre-planta',
    slug: 'madre-planta-documental',
    categoryId: 'documentales',
    title: 'Madre Planta (2022)',
    summary: 'Un documental de varios años de rodaje en Argentina, Chile e Israel sobre familias que recurrieron al aceite de cannabis para tratar patologías de sus hijos o nietos.',
    intro: 'Dirigido por Lisandro Costa, Alejandro Espolsino y Francisco López, "Madre Planta" se estrenó el 14 de abril de 2022 en el cine Gaumont, con emisión posterior por Canal Encuentro. Entre las historias que documenta está la de María Eugenia Sar y su nieto Joaquín, una de las familias que impulsó uno de los primeros amparos judiciales del país para el autocultivo de cannabis con fines medicinales.',
    sections: [],
    observations: [],
    signals: null,
    commonMistakes: [],
    environmentContext: null,
    tags: ['documental', 'argentina'],
    relatedEntryIds: ['industria-cannabis-argentina-actual'],
    sourceIds: ['documental-madre-planta-2022'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'Madre Planta (2022) — Atlas del Cultivo Argentino',
      seoDescription: 'Documental argentino (2022) sobre familias que recurrieron al aceite de cannabis medicinal, dirigido por Lisandro Costa, Alejandro Espolsino y Francisco López.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'documental-el-profe',
    slug: 'el-profe-documental',
    categoryId: 'documentales',
    title: 'El Profe (2021)',
    summary: 'Un cortometraje documental sobre Daniel Loza, cultivador solidario que difundió el autocultivo en Argentina a través de su serie web "Quinto Elemento".',
    intro: 'Dirigido por Julián Cáneva, "El Profe" es un cortometraje documental de 25 minutos sobre Daniel Loza, quien elaboraba aceite de cannabis y formó a numerosos cultivadores a través de su serie web "Quinto Elemento" —nombre que también dio a la cepa que creó—. Loza falleció en 2018, tras un allanamiento; sus materiales de elaboración fueron donados al CONICET en 2020.',
    sections: [],
    observations: [],
    signals: null,
    commonMistakes: [],
    environmentContext: null,
    tags: ['documental', 'argentina'],
    relatedEntryIds: ['industria-cannabis-argentina-actual'],
    sourceIds: ['documental-el-profe-2021'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'El Profe (2021) — Atlas del Cultivo Argentino',
      seoDescription: 'Cortometraje documental (2021) sobre Daniel Loza, cultivador solidario y creador de la serie web "Quinto Elemento", dirigido por Julián Cáneva.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'noticia-decreto-27-2026-sedronar',
    slug: 'reprocann-pasa-a-sedronar',
    categoryId: 'noticias',
    title: 'El REPROCANN pasa a depender de la SEDRONAR',
    summary: 'El Decreto 27/2026, publicado el 26 de enero de 2026, traspasó la gestión del registro de cultivo medicinal desde el Ministerio de Salud hacia la Secretaría de Políticas Integrales sobre Drogas.',
    intro: 'El 26 de enero de 2026, el Boletín Oficial publicó el Decreto 27/2026, que reorganiza competencias dentro del Ministerio de Salud y traspasa el registro, control y evaluación del REPROCANN a la SEDRONAR (Secretaría de Políticas Integrales sobre Drogas de la Nación) — organismo que hasta entonces no tenía a su cargo la gestión operativa del programa.',
    sections: [
      {
        id: 'que-cambia-y-que-no',
        title: 'Qué cambia y qué no',
        paragraphs: [
          'Según la cobertura periodística consultada para esta entrada, convergente entre distintos medios, el decreto no deroga la Ley 27.350 ni elimina el REPROCANN: el uso medicinal de cannabis sigue vigente en el marco de salud nacional. Lo que cambia es el organismo responsable de la gestión operativa del registro. Esta entrada no verificó el texto completo del decreto por lectura directa —solo el aviso de publicación en el Boletín Oficial y la cobertura periodística convergente— y no describe en detalle los procedimientos operativos nuevos, que exceden lo que esas fuentes permiten confirmar con precisión.'
        ]
      }
    ],
    observations: [],
    signals: null,
    commonMistakes: [],
    environmentContext: null,
    tags: ['noticia', 'legal', 'contexto'],
    relatedEntryIds: ['marco-editorial', 'reprocann-modalidades'],
    sourceIds: ['legal-decreto-27-2026-reprocann-sedronar'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'El REPROCANN pasa a depender de la SEDRONAR — Atlas del Cultivo Argentino',
      seoDescription: 'El Decreto 27/2026 traspasó la gestión operativa del REPROCANN del Ministerio de Salud a la SEDRONAR, sin derogar la Ley 27.350.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'noticia-ariccame-resolucion-41-propagacion',
    slug: 'ariccame-regimen-propagacion-2026',
    categoryId: 'noticias',
    title: 'ARICCAME abre un régimen especial para semillas, plantines y esquejes',
    summary: 'La Resolución 41/2026 habilita, hasta marzo de 2027, un trámite de adecuación para licenciar material de propagación de cannabis ya registrado en el Registro Nacional de Semillas.',
    intro: 'El 24 de junio de 2026, ARICCAME anunció, a través de un comunicado oficial en argentina.gob.ar, la Resolución 41/2026: un régimen especial de adecuación para licenciar semillas, plantines y esquejes de cannabis ya inscriptos en el Registro Nacional de Semillas.',
    sections: [
      {
        id: 'que-habilita-y-que-no',
        title: 'Qué habilita y qué no',
        paragraphs: [
          'El trámite está abierto hasta el 1º de marzo de 2027, y otorga licencias de cinco años con validación anual — pero esas licencias habilitan únicamente material de propagación (semillas, plantines, esquejes), no la producción ni la venta de flores o derivados. El comunicado enmarca la medida como un paso hacia "mayor previsibilidad jurídica" mientras se implementa el régimen general de licencias de la Ley 27.669.'
        ]
      }
    ],
    observations: [],
    signals: null,
    commonMistakes: [],
    environmentContext: null,
    tags: ['noticia', 'legal'],
    relatedEntryIds: ['marco-editorial'],
    sourceIds: ['oficial-ariccame-resolucion-41-2026-noticia', 'resolucion-ariccame-41-2026-organos-propagacion'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'ARICCAME abre un régimen especial para semillas, plantines y esquejes — Atlas del Cultivo Argentino',
      seoDescription: 'La Resolución 41/2026 de ARICCAME habilita, hasta marzo de 2027, licencias de adecuación para material de propagación de cannabis ya registrado.',
      canonical: null,
      ogImage: null
    }
  },
  {
    id: 'noticia-ariccame-canamo-horticola',
    slug: 'ariccame-canamo-hortícola-2026',
    categoryId: 'noticias',
    title: 'ARICCAME habilita la producción de cáñamo con fines hortícolas',
    summary: 'Un nuevo régimen de licencias permite, por primera vez, producir y comercializar flores, inflorescencias y biomasa de cáñamo no psicoactivo (hasta 1% de THC).',
    intro: 'En septiembre de 2026, ARICCAME publicó en el Boletín Oficial la Resolución 69/2026, que crea el régimen de licencias para producción, comercialización y actividades vinculadas al cáñamo con fines hortícolas — la cobertura de Bichos de Campo, un medio especializado en agro, es la fuente principal de esta entrada.',
    sections: [
      {
        id: 'alcance-de-la-resolucion',
        title: 'Alcance de la resolución',
        paragraphs: [
          'La medida aplica a plantas de Cannabis sativa L. consideradas no psicoactivas (hasta 1 % de THC, el mismo umbral que describe "Cáñamo industrial: la frontera genética y legal del 1% de THC" en este atlas) y contempla cuatro tipos de licencia: producción agrícola, elaboración de derivados, servicios vinculados y comercio exterior, todas de cinco años con validación anual. Entra en vigencia 30 días hábiles después de su publicación en el Boletín Oficial. Esta entrada no verificó el texto completo de la resolución por lectura directa, solo la cobertura periodística citada.'
        ]
      }
    ],
    observations: [],
    signals: null,
    commonMistakes: [],
    environmentContext: null,
    tags: ['noticia', 'legal', 'genética'],
    relatedEntryIds: ['canamo-industrial-frontera-thc', 'marco-editorial'],
    sourceIds: ['periodistica-bichosdecampo-2026-resolucion-69-canamo-horticola'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-18',
    metadata: {
      seoTitle: 'ARICCAME habilita la producción de cáñamo con fines hortícolas — Atlas del Cultivo Argentino',
      seoDescription: 'La Resolución 69/2026 de ARICCAME crea licencias para producir y comercializar flores, inflorescencias y biomasa de cáñamo no psicoactivo (hasta 1% de THC).',
      canonical: null,
      ogImage: null
    }
  }
];
