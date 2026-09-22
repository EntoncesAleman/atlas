'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '../../lib/auth/roles';
import { getSupabaseAdminClient } from '../../lib/supabase/admin';
import { logAdminAction } from '../_lib/audit';

const VALID_STATUSES = ['published', 'archived', 'hidden'];

export async function setNewsStatus(formData) {
  const { user } = await requireRole('admin');
  const id = formData.get('id');
  const status = formData.get('status');
  if (!VALID_STATUSES.includes(status)) throw new Error('Estado inválido');

  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('Cliente admin no configurado (falta SUPABASE_SERVICE_ROLE_KEY).');

  const { error } = await admin
    .from('news_items')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);

  await logAdminAction({ actorId: user.id, actorEmail: user.email, action: 'news_set_status', targetType: 'news_item', targetId: id, details: { status } });
  revalidatePath('/admin/noticias');
  revalidatePath('/noticias');
  revalidatePath('/atlas');
}

export async function updateNewsContent(formData) {
  const { user } = await requireRole('admin');
  const id = formData.get('id');
  const title = (formData.get('title') || '').toString().trim();
  const summary = (formData.get('summary') || '').toString().trim();
  if (!title || !summary) throw new Error('Título y resumen son obligatorios');

  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('Cliente admin no configurado.');

  const { error } = await admin
    .from('news_items')
    .update({ title, summary, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);

  await logAdminAction({ actorId: user.id, actorEmail: user.email, action: 'news_edit_content', targetType: 'news_item', targetId: id });
  revalidatePath('/admin/noticias');
  revalidatePath('/noticias');
  revalidatePath('/atlas');
}
