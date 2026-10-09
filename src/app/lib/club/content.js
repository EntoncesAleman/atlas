// Reglas de contenido del espacio de clubes: qué campos tiene cada cosa que un club puede cargar
// y cómo se valida. Sin acceso a datos, así que también lo usan los formularios del cliente.
//
// Sin enlaces externos ni precios a propósito: la regla D5 del proyecto no admite enlaces a clubes
// ni a puntos de venta, así que todo se describe con texto, fecha y zona general.

import { EVENT_TYPES, EVENT_MODALITIES } from '../community/communityData';

export const CONTENT_KINDS = ['event', 'course', 'news'];
export const CONTENT_KIND_LABELS = { event: 'Evento', course: 'Curso', news: 'Novedad' };
export const SUBMISSION_STATUS_LABELS = { pending: 'En revisión', approved: 'Publicado', rejected: 'No publicado', withdrawn: 'Retirado' };
export const MODALITY_LABELS = { PRESENCIAL: 'Presencial', VIRTUAL: 'Virtual', HIBRIDA: 'Híbrida' };
export const COURSE_COSTS = ['GRATUITO', 'ARANCELADO'];
export const COURSE_COST_LABELS = { GRATUITO: 'Gratuito', ARANCELADO: 'Arancelado' };
export const CLUB_SPECIALTIES = [
  'Cultivo en exterior',
  'Cultivo en interior',
  'Suelo vivo y compost',
  'Genética y semillas',
  'Sanidad vegetal',
  'Cosecha y poscosecha',
  'Uso medicinal',
  'Reducción de daños',
  'Marco legal y derechos',
  'Formación y talleres',
];
export const MEMBER_ROLES = ['editor', 'member'];
export const MEMBER_ROLE_LABELS = { editor: 'Edita contenidos', member: 'Integrante' };
export const MAX_PENDING_SUBMISSIONS = 8;
export const MAX_CLUB_MEMBERS = 30;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const LINK_PATTERN = /https?:\/\/|www\./i;

function validDate(value) {
  if (!DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function todayInArgentina() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' });
}

function reader(input) {
  return (key) => (typeof input[key] === 'string' ? input[key].trim() : '');
}

function checkStartDate(date) {
  const today = todayInArgentina();
  const limit = `${Number(today.slice(0, 4)) + 2}${today.slice(4)}`;
  if (!validDate(date)) return 'Revisá la fecha de inicio.';
  if (date < today) return 'La fecha de inicio ya pasó.';
  if (date > limit) return 'La fecha de inicio está a más de dos años.';
  return null;
}

function checkPlace({ modality, provinceId, locality }, provinceIds) {
  if (!EVENT_MODALITIES.includes(modality)) return 'Elegí una modalidad.';
  if (provinceId && !provinceIds.includes(provinceId)) return 'Elegí una provincia de la lista.';
  if (modality !== 'VIRTUAL' && !provinceId) return 'Indicá la provincia.';
  if (locality && locality.length > 80) return 'La localidad es demasiado larga.';
  return null;
}

// Cada validador devuelve `{ payload }` ya normalizado o `{ error }` con un mensaje para mostrar.
// `provinceIds` llega por parámetro para no arrastrar la geometría del mapa al cliente.
export function validateSubmission(kind, input, provinceIds) {
  const text = reader(input);
  let payload;
  let error = null;

  if (kind === 'event') {
    payload = { title: text('title'), type: text('type'), date: text('date'), endDate: text('endDate') || null, modality: text('modality'), provinceId: text('provinceId') || null, locality: text('locality') || null, description: text('description') };
    if (!EVENT_TYPES.includes(payload.type)) error = 'Elegí un tipo de actividad.';
    error ??= checkStartDate(payload.date);
    if (!error && payload.endDate && (!validDate(payload.endDate) || payload.endDate < payload.date)) error = 'Revisá la fecha de cierre: tiene que ser igual o posterior al inicio.';
    error ??= checkPlace(payload, provinceIds);
  } else if (kind === 'course') {
    const capacity = text('capacity');
    payload = { title: text('title'), date: text('date'), modality: text('modality'), provinceId: text('provinceId') || null, locality: text('locality') || null, duration: text('duration'), cost: text('cost'), capacity: capacity ? Number(capacity) : null, description: text('description') };
    error = checkStartDate(payload.date);
    error ??= checkPlace(payload, provinceIds);
    if (!error && (payload.duration.length < 2 || payload.duration.length > 60)) error = 'Indicá la duración (por ejemplo, "4 encuentros de 2 horas").';
    if (!error && !COURSE_COSTS.includes(payload.cost)) error = 'Indicá si el curso es gratuito o arancelado.';
    if (!error && payload.capacity !== null && (!Number.isInteger(payload.capacity) || payload.capacity < 1 || payload.capacity > 5000)) error = 'Revisá los cupos.';
  } else if (kind === 'news') {
    payload = { title: text('title'), description: text('description') };
  } else {
    return { error: 'Tipo de contenido inválido.' };
  }

  if (!error && (payload.title.length < 5 || payload.title.length > 120)) error = 'El título necesita entre 5 y 120 caracteres.';
  if (!error && (payload.description.length < 40 || payload.description.length > 1500)) error = 'El texto necesita entre 40 y 1500 caracteres.';
  if (!error && LINK_PATTERN.test(Object.values(payload).filter((value) => typeof value === 'string').join(' '))) error = 'No incluyas enlaces: el Atlas publica solo el texto.';
  return error ? { error } : { payload };
}

export function validateClubProfile(input, provinceIds) {
  const text = reader(input);
  const specialties = [...new Set((Array.isArray(input.specialties) ? input.specialties : []).filter((item) => CLUB_SPECIALTIES.includes(item)))];
  const year = text('foundedYear');
  const profile = { description: text('description'), provinceId: text('provinceId'), locality: text('locality') || null, specialties, foundedYear: year ? Number(year) : null };
  const currentYear = Number(todayInArgentina().slice(0, 4));

  if (profile.description.length < 80 || profile.description.length > 1500) return { error: 'La presentación necesita entre 80 y 1500 caracteres.' };
  if (!provinceIds.includes(profile.provinceId)) return { error: 'Elegí la provincia del club.' };
  if (profile.locality && profile.locality.length > 80) return { error: 'La localidad es demasiado larga.' };
  if (specialties.length > 6) return { error: 'Elegí hasta 6 especialidades.' };
  if (profile.foundedYear !== null && (!Number.isInteger(profile.foundedYear) || profile.foundedYear < 1950 || profile.foundedYear > currentYear)) return { error: 'Revisá el año de inicio.' };
  if (LINK_PATTERN.test(`${profile.description} ${profile.locality ?? ''}`)) return { error: 'No incluyas enlaces: la ficha publica solo el texto.' };
  return { profile };
}

export function validateJournalEntry(input, stageIds) {
  const text = reader(input);
  const entry = { date: text('date'), stageId: text('stageId') || null, note: text('note') };
  if (!validDate(entry.date) || entry.date > todayInArgentina()) return { error: 'Revisá la fecha: no puede ser futura.' };
  if (entry.stageId && !stageIds.includes(entry.stageId)) return { error: 'Elegí una etapa de la lista.' };
  if (entry.note.length < 3 || entry.note.length > 2000) return { error: 'La nota necesita entre 3 y 2000 caracteres.' };
  return { entry };
}

export function slugify(name) {
  return (name || 'club').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'club';
}
