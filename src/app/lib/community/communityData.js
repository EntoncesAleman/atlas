// Modelo editorial de Comunidad (Loop 4.4).
//
// Es un directorio territorial/editorial, no una red social (consigna §3): los perfiles de
// clubes, eventos, cursos y voces se administran editorialmente, no por autogestión de cuentas.
// Todos los arrays empiezan VACÍOS a propósito — "No crear perfiles ficticios" (§4), "No inventar
// eventos" (§5) — el estado inicial real de este proyecto es que no hay todavía ningún club,
// evento, curso ni entrevista documentados con fuente verificable. La UI debe mostrar
// "Próximamente" en ese estado, nunca contenido de relleno.
//
// No se creó un sistema editorial paralelo: se reutiliza la misma forma de referencia a fuente
// (`sourceId`/`url`/`status`/`date`) y a jurisdicción (`provinceId`, mismos ids que
// `lib/geo/argentinaProvinces.js`/`lib/weather/locations.js`) ya establecida en el resto del
// proyecto — solo se define acá porque el contenido en sí (directorio de organizaciones/eventos)
// es estructuralmente distinto del contenido editorial de `editorial/editorialData.js` (entradas
// enciclopédicas sobre cultivo), que no debía extenderse para esto (§15, "revisar si ya existe un
// sistema editorial que pueda extenderse... NO crear sistemas duplicados" — se revisó y no aplica:
// un club no es una entrada editorial).

import { ARGENTINA_PROVINCES } from '../geo/argentinaProvinces';

// Resuelve el nombre visible de una provincia a partir del mismo `provinceId` que usa todo el
// proyecto (`lib/geo/argentinaProvinces.js`) — evita duplicar la lista de nombres acá.
export function getProvinceLabel(provinceId) {
  return ARGENTINA_PROVINCES.find((province) => province.id === provinceId)?.name ?? null;
}

// --- Clubes cannábicos (§4) ---
// Campos previstos por la consigna, sin domicilio ni datos innecesarios (§16): nombre, provincia,
// localidad/área general (nunca dirección exacta salvo que el propio club la publique
// voluntariamente), descripción, historia, sitio web, redes, actividades, cursos, eventos,
// especialidades, contacto, estado, sponsor/aliado, fecha de actualización.
//
// Sigue vacío a propósito (cierre de P2-4, MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md,
// 2026-09-16): se investigó activamente qué organizaciones reales existen (ej. Mamá Cultiva
// Argentina, la más documentada institucionalmente — nota académica de CONICET en
// ri.conicet.gov.ar/handle/11336/223742). Verificado directamente en su sitio oficial
// (mamacultivaargentina.org): opera "Tienda y Dispensario" con venta de flores/aceites y
// fitoderivados — un enlace a esa organización sería un enlace a un punto de venta de cannabis,
// exactamente lo que prohíbe la regla dura D5 de `MASTER_PACKAGE/16_DECISIONS.md` ("cero venta,
// cero marcas, cero enlaces a puntos de venta/clubes de cultivo"). Ninguna otra organización de
// alcance similar pudo verificarse libre de un componente comercial equivalente. No se agrega
// ningún club hasta que exista uno real, verificado y sin ese conflicto.
export const communityClubs = [];

export const CLUB_STATUS = ['ACTIVE', 'PENDING_REVIEW', 'ARCHIVED'];

// --- Agenda territorial (§5) ---
// 2 actividades reales, verificadas de forma directa (fetch de la fuente oficial, no solo
// resultado de búsqueda) en el cierre de P2-4 (2026-09-16). Ambas son congresos académicos/
// institucionales (universidad pública + CONICET) — no expos comerciales ni puntos de venta,
// coherente con D5. `endDate`/`locality` quedan `null` cuando la fuente no distingue esos datos.
export const communityEvents = [
  {
    id: 'ii-congreso-canamo-cannabis-medicinal-unaj-2026',
    title: 'II Congreso Internacional de Cáñamo Industrial y Cannabis Medicinal',
    organizer: 'Universidad Nacional Arturo Jauretche (UNAJ), con investigadores de CONICET (ENyS)',
    type: 'CONFERENCIA',
    provinceId: 'buenos-aires',
    locality: 'Florencio Varela',
    date: '2026-05-08',
    endDate: '2026-05-09',
    modality: 'PRESENCIAL',
    description:
      'Congreso académico y científico sobre cáñamo industrial y cannabis medicinal: especialistas, profesionales de la salud, investigadores y representantes institucionales presentaron avances científicos, médicos y productivos.',
    url: 'https://enys.conicet.gov.ar/se-realizo-el-ii-congreso-internacional-de-canamo-industrial-y-cannabis-medicinal-en-la-unaj/',
    source: 'CONICET — ENyS',
    status: 'REALIZADO',
    accessedAt: '2026-09-16',
  },
  {
    id: 'congreso-internacional-cannabis-salud-rosario-2026',
    title: '1er Congreso Internacional y 4to Congreso Argentino de Cannabis y Salud',
    organizer: 'Universidad Nacional de Rosario (UNR), AUPAC, SADCYT — con la Red RACME de CONICET',
    type: 'CONFERENCIA',
    provinceId: 'santafe',
    locality: 'Rosario',
    date: '2026-10-07',
    endDate: '2026-10-09',
    modality: 'PRESENCIAL',
    description:
      'Congreso académico sobre investigación básica, estudios clínicos, producción, política pública, procesos regulatorios, educación universitaria y economía social en cannabis y salud.',
    url: 'https://www.congresodecannabis.com/',
    source: 'CONICET — Red RACME',
    status: 'PROXIMO',
    accessedAt: '2026-09-16',
  },
];

export const EVENT_TYPES = [
  'CURSO',
  'TALLER',
  'CHARLA',
  'JORNADA',
  'ENCUENTRO',
  'CONFERENCIA',
  'ACTIVIDAD_INSTITUCIONAL',
  'EVENTO_COMUNITARIO',
];

export const EVENT_TYPE_LABELS = {
  CURSO: 'Curso',
  TALLER: 'Taller',
  CHARLA: 'Charla',
  JORNADA: 'Jornada',
  ENCUENTRO: 'Encuentro',
  CONFERENCIA: 'Conferencia',
  ACTIVIDAD_INSTITUCIONAL: 'Actividad institucional',
  EVENTO_COMUNITARIO: 'Evento comunitario',
};

export const EVENT_MODALITIES = ['PRESENCIAL', 'VIRTUAL', 'HIBRIDA'];

export const EVENT_STATUS = ['PROXIMO', 'REALIZADO', 'CANCELADO'];

export const EVENT_STATUS_LABELS = {
  PROXIMO: 'Próximo',
  REALIZADO: 'Realizado',
  CANCELADO: 'Cancelado',
};

// --- Formación (§6) ---
// 2 cursos reales, institucionales (universidades públicas), verificados de forma directa
// (2026-09-16) contra su página oficial. Se excluyó deliberadamente un tercer candidato
// (AAMI — Asociación Argentina de Medicina Integrativa, "Curso Online Formativo de Cannabis
// edición 3"): su página muestra "Inscripciones CERRADAS" y "fecha de inicio: a confirmar" — no
// hay una oferta vigente que documentar hoy sin inventar una fecha.
export const communityCourses = [
  {
    id: 'diplomado-cultivo-cannabis-sativa-uncuyo',
    title: 'Diplomado en Cultivo de Cannabis Sativa',
    organizer: 'Facultad de Ciencias Agrarias — Universidad Nacional de Cuyo (UNCuyo)',
    docente: null,
    modality: 'PRESENCIAL',
    duration: '125 horas',
    provinceId: 'mendoza',
    institution: 'UNCuyo',
    description:
      'Formación en aspectos agronómicos, regulatorios, productivos y de gestión del cultivo de Cannabis sativa, dirigida a profesionales, técnicos, productores, cultivadores y estudiantes.',
    date: '2026-10-07',
    url: 'https://www.uncuyo.edu.ar/prensa/crece-la-formacion-en-cannabis-y-la-uncuyo-abre-una-nueva-cohorte-de-su-diplomado',
    status: 'VIGENTE',
    accessedAt: '2026-09-16',
  },
  {
    id: 'curso-produccion-aceite-cannabis-utn',
    title: 'Curso de Producción de Aceite de Cannabis',
    organizer: 'Universidad Tecnológica Nacional — Facultad Regional Buenos Aires (UTN FRBA)',
    docente: 'Florencia Macaluso, Matías Emanuel Hallu, Rodrigo Maltz, Silvana Emilia Andreassi',
    modality: 'VIRTUAL',
    duration: '12 semanas / 36 horas',
    provinceId: 'caba',
    institution: 'UTN FRBA',
    description:
      'Curso online con certificado oficial sobre fundamentos de cultivo, extracción, marco legal y producción de aceite de cannabis.',
    date: '2027-04-13',
    url: 'https://sceu.frba.utn.edu.ar/e-learning/detalle/curso/3521/curso-de-produccion-de-aceite-de-cannabis',
    status: 'VIGENTE',
    accessedAt: '2026-09-16',
  },
];

export const COURSE_STATUS = ['VIGENTE', 'FINALIZADO'];

export const COURSE_STATUS_LABELS = {
  VIGENTE: 'Vigente',
  FINALIZADO: 'Finalizado',
};

// --- Voces del territorio (§9) ---
// Sigue vacía a propósito: son entrevistas editoriales propias (requieren realizar una
// conversación real con una persona), no un dato que pueda "encontrarse" verificado en una
// fuente externa como los cursos/congresos de arriba — no hay ninguna entrevista real todavía.
export const communityVoices = [];

// --- Aliados del Atlas (§10) ---
// NOTA DE ALCANCE (instrucción explícita del usuario, previa a esta consigna): los sponsors/
// aliados NO tienen sección de menú ni página protagonista — aparecen EXCLUSIVAMENTE como una
// franja discreta al final de `/atlas` (ver `PartnersStrip.js`). Por eso este array no tiene una
// página de directorio propia en `/comunidad`, a diferencia de clubes/agenda/formación/voces.
//
// Schema de cada aliado (Loop 4.4.1, PARTE 10):
//   id:          string — identificador único (snake_case)
//   name:        string — nombre visible del aliado
//   logo:        string|null — URL al logo/icono (puede ser null si no hay imagen)
//   url:         string|null — URL al sitio del aliado (puede ser null)
//   type:        PARTNER_TYPES[n] — tipo conceptual del aliado
//   description: string|null — descripción breve opcional (una frase)
//
// NO inventar aliados reales. El array comienza vacío — la UI maneja el estado vacío
// mostrando un mensaje discreto. Agregar aliados reales cuando existan.
//
// Sigue vacío a propósito (cierre de P2-4, 2026-09-16): "aliado" implica una relación real de
// colaboración, no solo ser citado como fuente. Instituciones como INTA/CONICET/UNCuyo ya
// aparecen correctamente como fuente/organizador en `editorial/sources.js` y en
// `communityEvents`/`communityCourses` de este mismo archivo — listarlas además como "aliado del
// Atlas" implicaría una alianza formal que no existe y no está verificada.
export const atlasPartners = [];
// Ejemplo de estructura (no activar hasta tener aliados reales):
// export const atlasPartners = [
//   {
//     id: 'ejemplo_aliado',
//     name: 'Nombre del aliado',
//     logo: null,           // o '/logos/aliado.svg'
//     url: 'https://...',
//     type: 'ALIADO_INSTITUCIONAL',
//     description: 'Una frase breve que describe qué hace este aliado.',
//   },
// ];

export const PARTNER_TYPES = ['SPONSOR', 'ALIADO_EDUCATIVO', 'ALIADO_INSTITUCIONAL', 'COLABORADOR'];

export const PARTNER_TYPE_LABELS = {
  SPONSOR: 'Sponsor',
  ALIADO_EDUCATIVO: 'Aliado educativo',
  ALIADO_INSTITUCIONAL: 'Aliado institucional',
  COLABORADOR: 'Colaborador',
};

// --- Club destacado (§8) ---
// Espacio editorial ROTATIVO, nunca un ranking ("no decir 'mejor club'"). Con `communityClubs`
// vacío no hay nada que destacar todavía — la función devuelve `null` y la UI debe mostrar el
// mismo estado "Próximamente" que el resto de Comunidad, nunca un club inventado.
export function getFeaturedClub() {
  return communityClubs.find((club) => club.featured) ?? null;
}

// --- Newsletter (§7) ---
// Solo la ARQUITECTURA EDITORIAL pedida por la consigna ("no crear un sistema de email complejo
// si todavía no existe... preparar solamente la estructura editorial necesaria") — qué tipos de
// contenido puede reunir un envío de newsletter, reutilizando las mismas fuentes de datos que ya
// existen (`communityEvents`, `communityCourses`, `communityClubs`) en vez de crear un sistema de
// suscripción/envío de emails nuevo, que está fuera del alcance de este loop.
export const NEWSLETTER_CONTENT_TYPES = [
  'novedades_del_atlas',
  'eventos_provinciales',
  'cursos_nuevos',
  'investigaciones',
  'clubes_destacados',
  'entrevistas',
  'novedades_institucionales',
];

// --- Utilidades conscientes de provincia (§12) ---
// Cuando el usuario tiene una provincia elegida (misma clave de localStorage ya usada en todo el
// proyecto, `atlas:selectedProvince`), estas funciones permiten priorizar contenido de esa
// provincia sin pedir ubicación exacta. Con los arrays vacíos, devuelven `[]` — quedan listas para
// cuando exista contenido real, sin necesitar cambios de código en ese momento.
export function getClubsByProvince(provinceId) {
  if (!provinceId) return communityClubs;
  return communityClubs.filter((club) => club.provinceId === provinceId);
}

export function getEventsByProvince(provinceId) {
  if (!provinceId) return communityEvents;
  return communityEvents.filter((event) => event.provinceId === provinceId);
}

export function getCoursesByProvince(provinceId) {
  if (!provinceId) return communityCourses;
  return communityCourses.filter((course) => course.provinceId === provinceId);
}
