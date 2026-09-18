'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '../../lib/auth/roles';
import { getSupabaseAdminClient } from '../../lib/supabase/admin';
import { logAdminAction } from '../_lib/audit';

const VALID_ROLES = ['user', 'club', 'admin'];

// Cada acción vuelve a comprobar `requireRole('admin')` acá adentro, no solo confía en que el
// layout/proxy ya lo hicieron antes de renderizar el formulario — una Server Action se puede
// invocar directamente (POST a la ruta de acción) sin pasar de nuevo por el layout que la
// contiene, así que esta es la comprobación que de verdad importa para esta mutación puntual.
export async function setUserRole(formData) {
  const { user } = await requireRole('admin');
  const targetId = formData.get('userId');
  const role = formData.get('role');
  if (!VALID_ROLES.includes(role)) throw new Error('Rol inválido');

  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('Cliente admin no configurado (falta SUPABASE_SERVICE_ROLE_KEY).');

  const { error } = await admin
    .from('profiles')
    .update({ role, club_status: role === 'club' ? 'approved' : null })
    .eq('id', targetId);
  if (error) throw new Error(error.message);

  await logAdminAction({
    actorId: user.id,
    actorEmail: user.email,
    action: 'set_user_role',
    targetType: 'profile',
    targetId,
    details: { role }
  });

  revalidatePath('/admin/usuarios');
  revalidatePath('/admin/moderacion');
  revalidatePath('/admin');
}

export async function setAccountSuspension(formData) {
  const { user } = await requireRole('admin');
  const targetId = formData.get('userId');
  const suspend = formData.get('suspend') === 'true';

  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('Cliente admin no configurado (falta SUPABASE_SERVICE_ROLE_KEY).');

  // "87600h" (~10 años) como suspensión de facto indefinida, siguiendo el ejemplo documentado
  // por Supabase para este parámetro — "none" revierte cualquier baneo activo.
  const { error } = await admin.auth.admin.updateUserById(targetId, {
    ban_duration: suspend ? '87600h' : 'none'
  });
  if (error) throw new Error(error.message);

  await logAdminAction({
    actorId: user.id,
    actorEmail: user.email,
    action: suspend ? 'suspend_account' : 'reactivate_account',
    targetType: 'auth_user',
    targetId
  });

  revalidatePath('/admin/usuarios');
  revalidatePath('/admin');
}
