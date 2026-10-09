'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '../../lib/auth/roles';
import { getSupabaseAdminClient } from '../../lib/supabase/admin';
import { CLUB_EVENT_ACTION } from '../../lib/community/clubEvents';
import { logAdminAction } from '../_lib/audit';

// Aprobar publica la actividad en /comunidad/agenda; rechazar la deja fuera, con una nota opcional
// que el club ve en su panel. Una actividad ya publicada también se puede dar de baja.
export async function reviewClubEvent(formData) {
  const { user } = await requireRole('admin');
  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('Cliente admin no configurado (falta SUPABASE_SERVICE_ROLE_KEY).');

  const id = String(formData.get('id') || '');
  const decision = formData.get('decision');
  const note = String(formData.get('note') || '').trim().slice(0, 500);
  if (!['approve', 'reject'].includes(decision)) throw new Error('Decisión inválida');

  const { data, error } = await admin.from('admin_audit_log').select('details').eq('id', id).eq('action', CLUB_EVENT_ACTION).maybeSingle();
  if (error || !data) throw new Error('No se pudo encontrar la actividad.');
  if (!['pending', 'approved'].includes(data.details?.status)) throw new Error('Esta actividad ya no admite revisión.');

  const status = decision === 'approve' ? 'approved' : 'rejected';
  const { error: updateError } = await admin
    .from('admin_audit_log')
    .update({ details: { ...data.details, status, reviewNote: note || null, reviewedBy: user.id, reviewedAt: new Date().toISOString() } })
    .eq('id', id)
    .eq('action', CLUB_EVENT_ACTION);
  if (updateError) throw new Error('No se pudo actualizar la actividad.');

  await logAdminAction({ actorId: user.id, actorEmail: user.email, action: decision === 'approve' ? 'approve_club_event' : 'reject_club_event', targetType: 'club_event', targetId: id });

  revalidatePath('/admin/eventos');
  revalidatePath('/club');
  revalidatePath('/comunidad/agenda');
}
