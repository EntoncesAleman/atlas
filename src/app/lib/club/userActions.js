'use server';

// Acciones de cualquier persona con sesión respecto de los clubes: seguir, dejar de seguir y
// responder una invitación a un equipo.

import { revalidatePath } from 'next/cache';
import { getSessionProfile } from '../supabase/server';
import { getSupabaseAdminClient } from '../supabase/admin';

async function sessionAndAdmin() {
  const { user } = await getSessionProfile();
  const admin = getSupabaseAdminClient();
  return user && admin ? { user, admin } : null;
}

export async function setClubFollow(clubId, follow) {
  const context = await sessionAndAdmin();
  if (!context) return { ok: false, signedIn: false };
  const { user, admin } = context;
  if (follow) {
    // Solo se sigue a un club con ficha publicada.
    const { data: club } = await admin.from('club_profiles').select('club_id').eq('club_id', clubId).not('published', 'is', null).maybeSingle();
    if (!club) return { ok: false, signedIn: true };
    const { error } = await admin.from('club_follows').upsert({ user_id: user.id, club_id: clubId }, { onConflict: 'user_id,club_id' });
    if (error) return { ok: false, signedIn: true };
  } else {
    const { error } = await admin.from('club_follows').delete().eq('user_id', user.id).eq('club_id', clubId);
    if (error) return { ok: false, signedIn: true };
  }
  revalidatePath('/club');
  return { ok: true, signedIn: true, following: follow };
}

// La invitación está asociada a un email: solo la responde quien inició sesión con ese email.
export async function respondClubInvite(inviteId, accept) {
  const context = await sessionAndAdmin();
  if (!context) return { ok: false };
  const { user, admin } = context;
  const email = (user.email ?? '').toLowerCase();
  if (!email) return { ok: false };
  const query = accept
    ? admin.from('club_members').update({ status: 'active', user_id: user.id }).eq('id', inviteId).eq('email', email).eq('status', 'invited')
    : admin.from('club_members').delete().eq('id', inviteId).eq('email', email);
  const { error } = await query;
  if (error) return { ok: false };
  revalidatePath('/club');
  return { ok: true };
}
