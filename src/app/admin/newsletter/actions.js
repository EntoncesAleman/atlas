'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '../../lib/auth/roles';
import { getSupabaseAdminClient } from '../../lib/supabase/admin';
import { logAdminAction } from '../_lib/audit';
import { NEWSLETTER_CONTENT_TYPES } from '../../lib/community/communityData';

// Alta manual desde el panel (todavía no existe un formulario público de suscripción en el
// sitio — ver nota en communityData.js: se documentó explícitamente como fuera de alcance de un
// loop anterior). Esta acción deja la tabla lista para cuando exista ese formulario público, y
// mientras tanto permite cargar suscriptores a mano (por ejemplo, importados de otro canal).
export async function addSubscriber(formData) {
  const { user } = await requireRole('admin');
  const email = (formData.get('email') || '').toString().trim().toLowerCase();
  if (!email || !email.includes('@')) throw new Error('Email inválido');
  const segments = NEWSLETTER_CONTENT_TYPES.filter((type) => formData.get(`segment_${type}`) === 'on');

  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('Cliente admin no configurado (falta SUPABASE_SERVICE_ROLE_KEY).');

  const { error } = await admin
    .from('newsletter_subscribers')
    .upsert({ email, segments, status: 'subscribed', source: 'admin_manual', unsubscribed_at: null }, { onConflict: 'email' });
  if (error) throw new Error(error.message);

  await logAdminAction({ actorId: user.id, actorEmail: user.email, action: 'newsletter_add_subscriber', targetType: 'newsletter_subscriber', targetId: email });
  revalidatePath('/admin/newsletter');
  revalidatePath('/admin');
}

export async function setSubscriberStatus(formData) {
  const { user } = await requireRole('admin');
  const id = formData.get('id');
  const status = formData.get('status');
  if (!['subscribed', 'unsubscribed'].includes(status)) throw new Error('Estado inválido');

  const admin = getSupabaseAdminClient();
  if (!admin) throw new Error('Cliente admin no configurado.');

  const { error } = await admin
    .from('newsletter_subscribers')
    .update({ status, unsubscribed_at: status === 'unsubscribed' ? new Date().toISOString() : null })
    .eq('id', id);
  if (error) throw new Error(error.message);

  await logAdminAction({ actorId: user.id, actorEmail: user.email, action: 'newsletter_set_status', targetType: 'newsletter_subscriber', targetId: id, details: { status } });
  revalidatePath('/admin/newsletter');
}
