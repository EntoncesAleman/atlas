'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '../lib/auth/roles';
import { getSupabaseAdminClient } from '../lib/supabase/admin';
import { CLUB_EVENT_ACTION, MAX_PENDING_CLUB_EVENTS, validateClubEvent } from '../lib/community/clubEvents';

// Un club propone una actividad. Nunca se publica sola: queda `pending` hasta que un admin la
// revisa en /admin/eventos.
export async function submitClubEvent(_previous, formData) {
  const { user, profile } = await requireRole('club');
  const { event, error } = validateClubEvent(Object.fromEntries(formData));
  if (error) return { ok: false, message: error };

  const admin = getSupabaseAdminClient();
  if (!admin) return { ok: false, message: 'No se pudo enviar la actividad ahora. Probá más tarde.' };

  const { count, error: countError } = await admin
    .from('admin_audit_log')
    .select('id', { count: 'exact', head: true })
    .eq('action', CLUB_EVENT_ACTION)
    .eq('actor_id', user.id)
    .eq('details->>status', 'pending');
  if (countError) return { ok: false, message: 'No se pudo enviar la actividad ahora. Probá más tarde.' };
  if (count >= MAX_PENDING_CLUB_EVENTS) return { ok: false, message: `Ya tenés ${MAX_PENDING_CLUB_EVENTS} actividades en revisión. Esperá a que se resuelvan para enviar otra.` };

  const { error: insertError } = await admin.from('admin_audit_log').insert({
    actor_id: user.id,
    actor_email: user.email,
    action: CLUB_EVENT_ACTION,
    target_type: 'club_event',
    target_id: null,
    details: { status: 'pending', clubName: profile?.club_name ?? null, event },
  });
  if (insertError) return { ok: false, message: 'No se pudo guardar la actividad. Probá de nuevo.' };

  revalidatePath('/club');
  revalidatePath('/admin/eventos');
  return { ok: true, message: 'Actividad enviada. El equipo del Atlas la revisa antes de publicarla en la Agenda.' };
}

// El club puede retirar una propuesta propia mientras siga en revisión.
export async function withdrawClubEvent(formData) {
  const { user } = await requireRole('club');
  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('No disponible.');
  const id = String(formData.get('id') || '');
  const { data, error } = await admin.from('admin_audit_log').select('details').eq('id', id).eq('action', CLUB_EVENT_ACTION).eq('actor_id', user.id).maybeSingle();
  if (error || !data || data.details?.status !== 'pending') throw new Error('No se pudo retirar la actividad.');
  const { error: updateError } = await admin.from('admin_audit_log').update({ details: { ...data.details, status: 'withdrawn' } }).eq('id', id).eq('action', CLUB_EVENT_ACTION).eq('actor_id', user.id);
  if (updateError) throw new Error('No se pudo retirar la actividad.');
  revalidatePath('/club');
  revalidatePath('/admin/eventos');
}
