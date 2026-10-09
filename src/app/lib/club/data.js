// Lecturas del espacio de clubes. Solo servidor: usan service_role porque las tablas `club_*`
// no tienen policies públicas (ver supabase/migrations/20261008230000_club_workspace.sql).
// Toda lectura tolera que la base no responda o que la migración todavía no esté aplicada: en ese
// caso devuelve vacío y las páginas públicas siguen mostrando su contenido editorial.

import { getSupabaseAdminClient } from '../supabase/admin';
import { todayInArgentina } from './content';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function clubPhotoUrl(path) {
  return path && supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/club-media/${path}` : null;
}

async function rows(query) {
  try {
    const { data, error } = await query;
    return error ? null : data ?? [];
  } catch {
    return null;
  }
}

async function clubNames(admin, clubIds) {
  if (clubIds.length === 0) return new Map();
  const [profiles, fichas] = await Promise.all([
    rows(admin.from('profiles').select('id, club_name, role').in('id', clubIds)),
    rows(admin.from('club_profiles').select('club_id, slug, published').in('club_id', clubIds)),
  ]);
  const slugs = new Map((fichas ?? []).map((row) => [row.club_id, row.published ? row.slug : null]));
  // Una cuenta que dejó de ser club no publica nada, aunque tenga contenidos aprobados.
  return new Map((profiles ?? []).filter((row) => row.role === 'club').map((row) => [row.id, { name: row.club_name ?? 'Club registrado en el Atlas', slug: slugs.get(row.id) ?? null }]));
}

function mapSubmission(row) {
  return { id: row.id, clubId: row.club_id, kind: row.kind, status: row.status, reviewNote: row.review_note, submittedAt: row.created_at, payload: row.payload ?? {} };
}

// Todo lo que muestra el panel de un club.
export async function getClubWorkspaceData(clubId) {
  const admin = getSupabaseAdminClient();
  const empty = { ficha: null, submissions: [], members: [], journal: [], stats: { followers: 0, views30: 0 }, unavailable: true };
  if (!admin) return empty;
  const since = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
  const [ficha, submissions, members, journal, views, followers] = await Promise.all([
    rows(admin.from('club_profiles').select('slug, published, draft, draft_status, review_note').eq('club_id', clubId)),
    rows(admin.from('club_submissions').select('id, club_id, kind, payload, status, review_note, created_at').eq('club_id', clubId).order('created_at', { ascending: false }).limit(200)),
    rows(admin.from('club_members').select('id, email, role, status, created_at').eq('club_id', clubId).order('created_at', { ascending: true })),
    rows(admin.from('club_journal_entries').select('id, author_id, author_name, stage_id, entry_date, note, created_at').eq('club_id', clubId).order('entry_date', { ascending: false }).order('created_at', { ascending: false }).limit(200)),
    rows(admin.from('club_views').select('views').eq('club_id', clubId).eq('target', 'ficha').gte('day', since)),
    rows(admin.from('club_follows').select('user_id').eq('club_id', clubId)),
  ]);
  if ([ficha, submissions, members, journal].some((result) => result === null)) return empty;
  const row = ficha[0] ?? null;
  return {
    ficha: row && { slug: row.slug, published: row.published, draft: row.draft, draftStatus: row.draft_status, reviewNote: row.review_note, photoUrl: clubPhotoUrl((row.draft ?? row.published)?.photoPath) },
    submissions: submissions.map(mapSubmission),
    members: members.map((member) => ({ id: member.id, email: member.email, role: member.role, status: member.status })),
    journal: journal.map((entry) => ({ id: entry.id, authorId: entry.author_id, authorName: entry.author_name, stageId: entry.stage_id, date: entry.entry_date, note: entry.note })),
    stats: { followers: (followers ?? []).length, views30: (views ?? []).reduce((total, item) => total + item.views, 0) },
    unavailable: false,
  };
}

function mapPublicClub(row, name) {
  const ficha = row.published;
  return { id: row.club_id, slug: row.slug, name, description: ficha.description, provinceId: ficha.provinceId, locality: ficha.locality ?? null, specialties: ficha.specialties ?? [], foundedYear: ficha.foundedYear ?? null, photoUrl: clubPhotoUrl(ficha.photoPath) };
}

// Clubes con ficha aprobada, para el directorio de Comunidad.
export async function listPublicClubs() {
  const admin = getSupabaseAdminClient();
  if (!admin) return [];
  const fichas = await rows(admin.from('club_profiles').select('club_id, slug, published').not('published', 'is', null));
  if (!fichas?.length) return [];
  const names = await clubNames(admin, fichas.map((row) => row.club_id));
  return fichas.filter((row) => names.has(row.club_id)).map((row) => mapPublicClub(row, names.get(row.club_id).name)).sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

export async function getPublicClub(slug) {
  const admin = getSupabaseAdminClient();
  if (!admin) return null;
  const fichas = await rows(admin.from('club_profiles').select('club_id, slug, published').eq('slug', slug).not('published', 'is', null));
  const row = fichas?.[0];
  if (!row) return null;
  const names = await clubNames(admin, [row.club_id]);
  if (!names.has(row.club_id)) return null;
  const [submissions, followers] = await Promise.all([
    rows(admin.from('club_submissions').select('id, club_id, kind, payload, status, review_note, created_at').eq('club_id', row.club_id).eq('status', 'approved').order('created_at', { ascending: false }).limit(100)),
    rows(admin.from('club_follows').select('user_id').eq('club_id', row.club_id)),
  ]);
  const content = (submissions ?? []).map(mapSubmission);
  const today = todayInArgentina();
  const upcoming = (item) => (item.payload.endDate ?? item.payload.date) >= today;
  return {
    ...mapPublicClub(row, names.get(row.club_id).name),
    followers: (followers ?? []).length,
    events: content.filter((item) => item.kind === 'event' && upcoming(item)).sort((a, b) => a.payload.date.localeCompare(b.payload.date)),
    courses: content.filter((item) => item.kind === 'course' && upcoming(item)).sort((a, b) => a.payload.date.localeCompare(b.payload.date)),
    news: content.filter((item) => item.kind === 'news').slice(0, 10),
  };
}

// Contenidos aprobados de un tipo, con el nombre del club, para Agenda y Formación.
export async function listApprovedContent(kind, { clubIds } = {}) {
  const admin = getSupabaseAdminClient();
  if (!admin) return [];
  let query = admin.from('club_submissions').select('id, club_id, kind, payload, status, review_note, created_at').eq('kind', kind).eq('status', 'approved');
  if (clubIds) query = query.in('club_id', clubIds);
  const submissions = await rows(query.order('created_at', { ascending: false }).limit(200));
  if (!submissions?.length) return [];
  const names = await clubNames(admin, [...new Set(submissions.map((row) => row.club_id))]);
  return submissions.filter((row) => names.has(row.club_id)).map((row) => ({ ...mapSubmission(row), clubName: names.get(row.club_id).name, clubSlug: names.get(row.club_id).slug }));
}

// Eventos aprobados con la misma forma que `communityEvents`, para que la Agenda los liste igual.
export async function listApprovedClubEvents() {
  const today = todayInArgentina();
  return (await listApprovedContent('event')).map(({ id, clubName, clubSlug, payload }) => ({
    id: `club-${id}`, title: payload.title, organizer: clubName, clubSlug, type: payload.type, provinceId: payload.provinceId, locality: payload.locality,
    date: payload.date, endDate: payload.endDate, modality: payload.modality, description: payload.description, url: null,
    status: (payload.endDate ?? payload.date) < today ? 'REALIZADO' : 'PROXIMO', fromClub: true,
  }));
}

// Bandeja de revisión del admin: fichas con cambios pendientes y todos los contenidos propuestos.
export async function listReviewQueue() {
  const admin = getSupabaseAdminClient();
  if (!admin) return { fichas: [], submissions: [], error: true };
  const [fichas, submissions] = await Promise.all([
    rows(admin.from('club_profiles').select('club_id, slug, published, draft, draft_status').eq('draft_status', 'pending')),
    rows(admin.from('club_submissions').select('id, club_id, kind, payload, status, review_note, created_at').neq('status', 'withdrawn').order('created_at', { ascending: false }).limit(300)),
  ]);
  if (fichas === null || submissions === null) return { fichas: [], submissions: [], error: true };
  const clubIds = [...new Set([...fichas.map((row) => row.club_id), ...submissions.map((row) => row.club_id)])];
  const profiles = clubIds.length ? await rows(admin.from('profiles').select('id, club_name').in('id', clubIds)) : [];
  const name = (id) => (profiles ?? []).find((profile) => profile.id === id)?.club_name ?? 'Club sin nombre';
  return {
    fichas: fichas.map((row) => ({ clubId: row.club_id, clubName: name(row.club_id), draft: row.draft, hasPublished: Boolean(row.published), photoUrl: clubPhotoUrl(row.draft?.photoPath) })),
    submissions: submissions.map((row) => ({ ...mapSubmission(row), clubName: name(row.club_id) })),
    error: false,
  };
}

// Lo que ve una persona en la sección "Clubes" de su espacio: los que sigue (con sus próximas
// actividades), los clubes de los que es parte y las invitaciones que tiene pendientes.
export async function getUserClubs(user) {
  const admin = getSupabaseAdminClient();
  if (!admin) return { following: [], memberships: [], invites: [], unavailable: true };
  const email = (user.email ?? '').toLowerCase();
  const [follows, memberships] = await Promise.all([
    rows(admin.from('club_follows').select('club_id').eq('user_id', user.id)),
    email ? rows(admin.from('club_members').select('id, club_id, role, status, user_id').eq('email', email)) : [],
  ]);
  if (follows === null || memberships === null) return { following: [], memberships: [], invites: [], unavailable: true };
  const followedIds = follows.map((row) => row.club_id);
  const clubs = (await listPublicClubs()).filter((club) => followedIds.includes(club.id));
  const today = todayInArgentina();
  const upcoming = followedIds.length ? [...await listApprovedContent('event', { clubIds: followedIds }), ...await listApprovedContent('course', { clubIds: followedIds })].filter((item) => (item.payload.endDate ?? item.payload.date) >= today) : [];
  const names = await clubNames(admin, [...new Set(memberships.map((row) => row.club_id))]);
  const mine = memberships.filter((row) => names.has(row.club_id)).map((row) => ({ id: row.id, clubName: names.get(row.club_id).name, role: row.role, status: row.status, linked: row.user_id === user.id }));
  return {
    following: clubs.map((club) => ({ id: club.id, slug: club.slug, name: club.name, provinceId: club.provinceId, upcoming: upcoming.filter((item) => item.clubId === club.id).sort((a, b) => a.payload.date.localeCompare(b.payload.date)).slice(0, 4).map((item) => ({ id: item.id, kind: item.kind, title: item.payload.title, date: item.payload.date })) })),
    memberships: mine.filter((row) => row.status === 'active' && row.linked),
    invites: mine.filter((row) => row.status === 'invited'),
    unavailable: false,
  };
}

// Datos de clubes asociados a una cuenta, para la exportación de "Mis datos".
export async function exportUserClubData(user) {
  const admin = getSupabaseAdminClient();
  if (!admin) return null;
  const [ficha, submissions, team, memberships, follows, journal] = await Promise.all([
    rows(admin.from('club_profiles').select('*').eq('club_id', user.id)),
    rows(admin.from('club_submissions').select('*').eq('club_id', user.id)),
    rows(admin.from('club_members').select('*').eq('club_id', user.id)),
    rows(admin.from('club_members').select('*').eq('user_id', user.id)),
    rows(admin.from('club_follows').select('*').eq('user_id', user.id)),
    rows(admin.from('club_journal_entries').select('*').eq('author_id', user.id)),
  ]);
  return { club_profile: ficha ?? [], club_submissions: submissions ?? [], club_team: team ?? [], club_memberships: memberships ?? [], club_follows: follows ?? [], club_journal_entries: journal ?? [] };
}

// Fotos de la ficha de un club, para borrarlas junto con la cuenta.
export async function removeClubMedia(admin, clubId) {
  try {
    const { data } = await admin.storage.from('club-media').list(clubId, { limit: 100 });
    if (data?.length) await admin.storage.from('club-media').remove(data.map((file) => `${clubId}/${file.name}`));
  } catch {
    // Si el bucket no existe o no responde, la eliminación de la cuenta sigue.
  }
}
