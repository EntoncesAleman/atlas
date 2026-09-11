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
  }
];

export const editorialEntries = [
  {
    id: 'germinacion',
    slug: 'germinacion',
    categoryId: 'fundamentos',
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
    relatedEntryIds: ['sustrato-y-drenaje', 'luz-y-fotoperiodo', 'cultivo-en-secuencia'],
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
          'Frente a esa falta de oxígeno, la raíz puede cambiar temporalmente su metabolismo hacia una vía que no lo requiere (fermentación), pero es una vía de emergencia, no una alternativa sostenible: si la condición se mantiene, la función radicular se deteriora.'
        ]
      },
      {
        id: 'observar-la-humedad',
        title: 'Observar la humedad',
        paragraphs: [
          'La humedad del sustrato no se lee bien solo por la superficie: la parte superior puede estar seca al tacto mientras el interior todavía retiene agua, o al revés. El peso relativo de la maceta o el contenedor (más liviano cuando está seco, más pesado cuando está húmedo) suele ser una referencia más consistente que la apariencia superficial sola.',
          'Remover el sustrato de forma constante para "revisar" la humedad altera físicamente su estructura y puede introducir el mismo problema que se busca evitar.'
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
    sourceIds: ['oficial-inta-relacion-suelo-planta-agua', 'academica-unlpam-inta-guia-evaluacion-visual-suelo'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-10',
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
    relatedEntryIds: ['cultivo-en-secuencia', 'cosecha-y-maduracion'],
    sourceIds: ['academica-unne-fitocromos-desarrollo-vegetal', 'cientifica-hesami-2023-cannabis-life-cycle'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-10',
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
    relatedEntryIds: ['germinacion', 'luz-y-fotoperiodo'],
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
    relatedEntryIds: ['cultivo-en-secuencia', 'marco-editorial'],
    sourceIds: ['cientifica-hesami-2023-cannabis-life-cycle'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-10',
    metadata: {
      seoTitle: 'Cosecha y maduración — Atlas del Cultivo Argentino',
      seoDescription: 'Qué cambia visiblemente en la inflorescencia durante la maduración, por qué es un proceso gradual y no un punto fijo, y qué errores de lectura son frecuentes.',
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
          'Al momento de esta revisión, Argentina cuenta con un marco (Ley 27.350 y su reglamentación vigente) que crea el Programa de Cannabis y su registro asociado (REPROCANN), habilitando modalidades de autocultivo, cultivo solidario o inscripción a través de una organización autorizada, con fines terapéuticos/medicinales.',
          'Por otro lado, la Ley 23.737 tipifica penalmente el cultivo de plantas destinado a la producción de estupefacientes, con una figura atenuada cuando la cantidad y las circunstancias muestran de manera inequívoca que el destino es el consumo personal. La base constitucional que ampara la esfera de decisión personal en este tipo de situaciones, cuando no hay daño a terceros, proviene del fallo "Arriola" de la Corte Suprema de Justicia de la Nación (2009).',
          'Este resumen es general, no vinculante y puede quedar desactualizado: el marco regulatorio argentino sobre este tema ha tenido cambios y anuncios de cambios en años recientes. No debe tomarse como la última palabra sobre la situación legal de nadie en particular — para eso hace falta asesoramiento profesional actualizado.'
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
    sourceIds: ['ley-27350-reprocann', 'ley-23737-art5', 'fallo-arriola-csjn-2009', 'ley-27669-publicidad', 'ley-25326-datos-personales'],
    editorialStatus: 'PUBLISHED',
    lastReviewed: '2026-09-10',
    metadata: {
      seoTitle: 'Marco editorial y responsable — Atlas del Cultivo Argentino',
      seoDescription: 'Qué es y qué no es el atlas, la diferencia entre información y recomendación, y un resumen no vinculante del contexto legal argentino con fuentes oficiales.',
      canonical: null,
      ogImage: null
    }
  }
];
