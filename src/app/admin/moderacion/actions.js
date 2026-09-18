'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '../../lib/auth/roles';
import { getSupabaseAdminClient } from '../../lib/supabase/admin';
import { logAdminAction } from '../_lib/audit';

export async function resolveClubRequest(formData) {
  const { user } = await requireRole('admin');
  const targetId = formData.get('userId');
  const decision = formData.get('decision'); // 'approve' | 'reject'
  if (!['approve', 'reject'].includes(decision)) throw new Error('Decisión inválida');

  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('Cliente admin no configurado (falta SUPABASE_SERVICE_ROLE_KEY).');

  const { error } = await admin
    .from('profiles')
    .update({
      role: decision === 'approve' ? 'club' : 'user',
      club_status: decision === 'approve' ? 'approved' : 'rejected'
    })
    .eq('id', targetId);
  if (error) throw new Error(error.message);

  await logAdminAction({
    actorId: user.id,
    actorEmail: user.email,
    action: decision === 'approve' ? 'approve_club_request' : 'reject_club_request',
    targetType: 'profile',
    targetId
  });

  revalidatePath('/admin/moderacion');
  revalidatePath('/admin/usuarios');
  revalidatePath('/admin/clubes');
  revalidatePath('/admin');
}
