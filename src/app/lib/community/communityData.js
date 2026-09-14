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

// --- Clubes cannábicos (§4) ---
// Campos previstos por la consigna, sin domicilio ni datos innecesarios (§16): nombre, provincia,
// localidad/área general (nunca dirección exacta salvo que el propio club la publique
// voluntariamente), descripción, historia, sitio web, redes, actividades, cursos, eventos,
// especialidades, contacto, estado, sponsor/aliado, fecha de actualización.
export const communityClubs = [];

export const CLUB_STATUS = ['ACTIVE', 'PENDING_REVIEW', 'ARCHIVED'];

// --- Agenda territorial (§5) ---
export const communityEvents = [];

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

// --- Formación (§6) ---
export const communityCourses = [];

// --- Voces del territorio (§9) ---
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
