'use server';

import { revalidatePath } from 'next/cache';
import { requireClubAccess } from '../lib/club/context';
import { getSupabaseAdminClient } from '../lib/supabase/admin';
import { ARGENTINA_PROVINCES } from '../lib/geo/argentinaProvinces';
import { STAGES } from '../lib/miCultivo/model';
import { CONTENT_KINDS, MAX_CLUB_MEMBERS, MAX_PENDING_SUBMISSIONS, MEMBER_ROLES, validateJournalEntry, validateSubmission } from '../lib/club/content';

const UNAVAILABLE = 'No se pudo guardar ahora. Probá más tarde.';
const provinceIds = () => ARGENTINA_PROVINCES.map((province) => province.id);

// Un club propone un evento, un curso o una novedad. Nunca se publica solo: queda `pending` hasta
// que un admin lo revisa en /admin/eventos.
export async function submitClubContent(_previous, formData) {
  const { user, club } = await requireClubAccess('editor');
  const kind = String(formData.get('kind') || '');
  if (!CONTENT_KINDS.includes(kind)) return { ok: false, message: 'Tipo de contenido inválido.' };
  const { payload, error } = validateSubmission(kind, Object.fromEntries(formData), provinceIds());
  if (error) return { ok: false, message: error };

  const admin = getSupabaseAdminClient();
  if (!admin) return { ok: false, message: UNAVAILABLE };
  const { count, error: countError } = await admin.from('club_submissions').select('id', { count: 'exact', head: true }).eq('club_id', club.id).eq('status', 'pending');
  if (countError) return { ok: false, message: UNAVAILABLE };
  if (count >= MAX_PENDING_SUBMISSIONS) return { ok: false, message: `El club ya tiene ${MAX_PENDING_SUBMISSIONS} contenidos en revisión. Esperá a que se resuelvan para enviar otro.` };

  const { error: insertError } = await admin.from('club_submissions').insert({ club_id: club.id, author_id: user.id, kind, payload });
  if (insertError) return { ok: false, message: UNAVAILABLE };

  revalidatePath('/club');
  revalidatePath('/admin/eventos');
  return { ok: true, message: 'Enviado. El equipo del Atlas lo revisa antes de publicarlo.' };
}

// Retirar algo propio: una propuesta en revisión, o un contenido ya publicado que se da de baja.
export async function withdrawClubContent(formData) {
  const { club } = await requireClubAccess('editor');
  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error(UNAVAILABLE);
  const { error } = await admin.from('club_submissions').update({ status: 'withdrawn' }).eq('id', String(formData.get('id') || '')).eq('club_id', club.id).in('status', ['pending', 'approved']);
  if (error) throw new Error('No se pudo retirar.');
  revalidatePath('/club');
  revalidatePath('/admin/eventos');
  revalidatePath('/comunidad', 'layout');
}

// Equipo: solo la cuenta del club invita, cambia permisos o quita integrantes. La invitación queda
// asociada a un email; la persona la acepta desde su propio espacio cuando inicia sesión.
export async function inviteClubMember(_previous, formData) {
  const { user, club } = await requireClubAccess('owner');
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const role = String(formData.get('role') || '');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { ok: false, message: 'Ese email no parece válido.' };
  if (!MEMBER_ROLES.includes(role)) return { ok: false, message: 'Elegí un permiso.' };
  if (email === (user.email ?? '').toLowerCase()) return { ok: false, message: 'Esa es la cuenta del club: ya tiene todos los permisos.' };

  const admin = getSupabaseAdminClient();
  if (!admin) return { ok: false, message: UNAVAILABLE };
  const { count, error: countError } = await admin.from('club_members').select('id', { count: 'exact', head: true }).eq('club_id', club.id);
  if (countError) return { ok: false, message: UNAVAILABLE };
  if (count >= MAX_CLUB_MEMBERS) return { ok: false, message: `El equipo admite hasta ${MAX_CLUB_MEMBERS} personas.` };
  const { error } = await admin.from('club_members').insert({ club_id: club.id, email, role });
  if (error) return { ok: false, message: error.code === '23505' ? 'Esa persona ya está en el equipo o tiene una invitación pendiente.' : UNAVAILABLE };

  revalidatePath('/club');
  return { ok: true, message: 'Invitación guardada. La persona la ve en la sección Clubes de su espacio al iniciar sesión con ese email.' };
}

export async function updateClubMember(formData) {
  const { club } = await requireClubAccess('owner');
  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error(UNAVAILABLE);
  const id = String(formData.get('id') || '');
  const intent = formData.get('intent');
  const query = intent === 'remove'
    ? admin.from('club_members').delete().eq('id', id).eq('club_id', club.id)
    : MEMBER_ROLES.includes(formData.get('role')) ? admin.from('club_members').update({ role: formData.get('role') }).eq('id', id).eq('club_id', club.id) : null;
  if (!query) throw new Error('Permiso inválido.');
  const { error } = await query;
  if (error) throw new Error('No se pudo actualizar el equipo.');
  revalidatePath('/club');
}

// Cuaderno colectivo: lo escribe cualquier integrante; lo borra quien lo escribió o la cuenta del club.
export async function addClubJournalEntry(_previous, formData) {
  const { user, profile, club } = await requireClubAccess('member');
  const { entry, error } = validateJournalEntry(Object.fromEntries(formData), STAGES.map((stage) => stage.id));
  if (error) return { ok: false, message: error };
  const admin = getSupabaseAdminClient();
  if (!admin) return { ok: false, message: UNAVAILABLE };
  const authorName = profile?.display_name || user.user_metadata?.full_name || user.user_metadata?.name || (user.email ?? '').split('@')[0];
  const { error: insertError } = await admin.from('club_journal_entries').insert({ club_id: club.id, author_id: user.id, author_name: authorName, stage_id: entry.stageId, entry_date: entry.date, note: entry.note });
  if (insertError) return { ok: false, message: UNAVAILABLE };
  revalidatePath('/club');
  return { ok: true, message: 'Registro guardado en el cuaderno del club.' };
}

export async function deleteClubJournalEntry(formData) {
  const { user, club, capacity } = await requireClubAccess('member');
  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error(UNAVAILABLE);
  let query = admin.from('club_journal_entries').delete().eq('id', String(formData.get('id') || '')).eq('club_id', club.id);
  if (capacity !== 'owner') query = query.eq('author_id', user.id);
  const { error } = await query;
  if (error) throw new Error('No se pudo borrar el registro.');
  revalidatePath('/club');
}
