// Eventos propuestos por clubes. Un club los carga desde su panel y quedan pendientes hasta que
// un admin los aprueba; solo los aprobados se muestran en la Agenda pública.
//
// Se guardan en `admin_audit_log` (acción `club_event_submission`), igual que los aportes del
// sitio público (`api/aportes/route.js`): es un almacén privado, sin policies públicas, al que
// solo escribe el servidor con service_role. El estado vive en `details.status`.
//
// Sin enlaces externos a propósito: la regla D5 del proyecto no admite enlaces a clubes ni a
// puntos de venta, así que una actividad se describe con texto, fecha y zona general.

import { ARGENTINA_PROVINCES } from '../geo/argentinaProvinces';
import { EVENT_TYPES, EVENT_MODALITIES } from './communityData';
import { getSupabaseAdminClient } from '../supabase/admin';

export const CLUB_EVENT_ACTION = 'club_event_submission';
export const CLUB_EVENT_STATUS_LABELS = {
  pending: 'En revisión',
  approved: 'Publicado',
  rejected: 'No publicado',
  withdrawn: 'Retirado',
};
export const MAX_PENDING_CLUB_EVENTS = 5;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function validDate(value) {
  if (!DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function todayInArgentina() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' });
}

// Devuelve `{ event }` con los campos ya normalizados, o `{ error }` con un mensaje para mostrar.
export function validateClubEvent(input) {
  const text = (key) => (typeof input[key] === 'string' ? input[key].trim() : '');
  const event = {
    title: text('title'),
    type: text('type'),
    date: text('date'),
    endDate: text('endDate') || null,
    modality: text('modality'),
    provinceId: text('provinceId') || null,
    locality: text('locality') || null,
    description: text('description'),
  };
  const today = todayInArgentina();
  const limit = `${Number(today.slice(0, 4)) + 2}${today.slice(4)}`;

  if (event.title.length < 5 || event.title.length > 120) return { error: 'El título necesita entre 5 y 120 caracteres.' };
  if (!EVENT_TYPES.includes(event.type)) return { error: 'Elegí un tipo de actividad.' };
  if (!EVENT_MODALITIES.includes(event.modality)) return { error: 'Elegí una modalidad.' };
  if (!validDate(event.date)) return { error: 'Revisá la fecha de inicio.' };
  if (event.date < today) return { error: 'La fecha de inicio ya pasó.' };
  if (event.date > limit) return { error: 'La fecha de inicio está a más de dos años.' };
  if (event.endDate && (!validDate(event.endDate) || event.endDate < event.date || event.endDate > limit)) return { error: 'Revisá la fecha de cierre: tiene que ser igual o posterior al inicio.' };
  if (event.provinceId && !ARGENTINA_PROVINCES.some((province) => province.id === event.provinceId)) return { error: 'Elegí una provincia de la lista.' };
  if (event.modality !== 'VIRTUAL' && !event.provinceId) return { error: 'Indicá la provincia de la actividad.' };
  if (event.locality && event.locality.length > 80) return { error: 'La localidad es demasiado larga.' };
  if (event.description.length < 40 || event.description.length > 1200) return { error: 'La descripción necesita entre 40 y 1200 caracteres.' };
  if (/https?:\/\/|www\./i.test(`${event.title} ${event.description} ${event.locality ?? ''}`)) return { error: 'No incluyas enlaces: la Agenda publica solo la descripción de la actividad.' };

  return { event };
}

function mapSubmission(row) {
  const details = row.details ?? {};
  return {
    id: row.id,
    clubId: row.actor_id,
    clubEmail: row.actor_email,
    clubName: details.clubName ?? null,
    status: details.status ?? 'pending',
    reviewNote: details.reviewNote ?? null,
    reviewedAt: details.reviewedAt ?? null,
    submittedAt: row.created_at,
    event: details.event ?? {},
  };
}

// `clubId`: solo las propuestas de ese club. `status`: filtra por estado.
export async function listClubEventSubmissions({ clubId, status } = {}) {
  const admin = getSupabaseAdminClient();
  if (!admin) return { submissions: [], error: 'unavailable' };
  let query = admin.from('admin_audit_log').select('id, actor_id, actor_email, details, created_at').eq('action', CLUB_EVENT_ACTION);
  if (clubId) query = query.eq('actor_id', clubId);
  if (status) query = query.eq('details->>status', status);
  const { data, error } = await query.order('created_at', { ascending: false }).limit(200);
  if (error) return { submissions: [], error: 'unavailable' };
  return { submissions: (data ?? []).map(mapSubmission), error: null };
}

// Eventos aprobados, con la misma forma que `communityEvents` para que la Agenda los liste igual.
export async function listApprovedClubEvents() {
  const { submissions } = await listClubEventSubmissions({ status: 'approved' });
  const today = todayInArgentina();
  return submissions.map(({ id, clubName, event }) => ({
    id: `club-${id}`,
    title: event.title,
    organizer: clubName ?? 'Club registrado en el Atlas',
    type: event.type,
    provinceId: event.provinceId,
    locality: event.locality,
    date: event.date,
    endDate: event.endDate,
    modality: event.modality,
    description: event.description,
    url: null,
    status: (event.endDate ?? event.date) < today ? 'REALIZADO' : 'PROXIMO',
    fromClub: true,
  }));
}
