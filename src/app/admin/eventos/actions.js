'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '../../lib/auth/roles';
import { getSupabaseAdminClient } from '../../lib/supabase/admin';
import { logAdminAction } from '../_lib/audit';

function revalidateClubContent() {
  revalidatePath('/admin/eventos');
  revalidatePath('/club');
  revalidatePath('/comunidad', 'layout');
}

// Aprobar publica el contenido (Agenda, Formación o la ficha del club); rechazar lo deja fuera,
// con una nota opcional que el club ve en su panel. Lo ya publicado también se puede dar de baja.
export async function reviewClubSubmission(formData) {
  const { user } = await requireRole('admin');
  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('Cliente admin no configurado (falta SUPABASE_SERVICE_ROLE_KEY).');

  const id = String(formData.get('id') || '');
  const decision = formData.get('decision');
  const note = String(formData.get('note') || '').trim().slice(0, 500);
  if (!['approve', 'reject'].includes(decision)) throw new Error('Decisión inválida');

  const { error } = await admin
    .from('club_submissions')
    .update({ status: decision === 'approve' ? 'approved' : 'rejected', review_note: note || null, reviewed_by: user.id, reviewed_at: new Date().toISOString() })
    .eq('id', id)
    .in('status', decision === 'approve' ? ['pending'] : ['pending', 'approved']);
  if (error) throw new Error('No se pudo actualizar el contenido.');

  await logAdminAction({ actorId: user.id, actorEmail: user.email, action: decision === 'approve' ? 'approve_club_content' : 'reject_club_content', targetType: 'club_submission', targetId: id });
  revalidateClubContent();
}

// Ficha: aprobar reemplaza la versión publicada por el borrador; rechazar conserva lo publicado y
// deja el borrador para que el club lo corrija.
export async function reviewClubProfile(formData) {
  const { user } = await requireRole('admin');
  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('Cliente admin no configurado (falta SUPABASE_SERVICE_ROLE_KEY).');

  const clubId = String(formData.get('clubId') || '');
  const decision = formData.get('decision');
  const note = String(formData.get('note') || '').trim().slice(0, 500);
  if (!['approve', 'reject'].includes(decision)) throw new Error('Decisión inválida');

  const { data, error } = await admin.from('club_profiles').select('published, draft, draft_status').eq('club_id', clubId).maybeSingle();
  if (error || !data?.draft || data.draft_status !== 'pending') throw new Error('Esta ficha no tiene cambios pendientes.');

  const change = decision === 'approve'
    ? { published: data.draft, draft: null, draft_status: 'none', review_note: note || null }
    : { draft_status: 'rejected', review_note: note || null };
  const { error: updateError } = await admin.from('club_profiles').update({ ...change, reviewed_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('club_id', clubId);
  if (updateError) throw new Error('No se pudo actualizar la ficha.');

  const replaced = data.published?.photoPath;
  if (decision === 'approve' && replaced && replaced !== data.draft.photoPath) await admin.storage.from('club-media').remove([replaced]).catch(() => {});

  await logAdminAction({ actorId: user.id, actorEmail: user.email, action: decision === 'approve' ? 'approve_club_profile' : 'reject_club_profile', targetType: 'club_profile', targetId: clubId });
  revalidateClubContent();
}
