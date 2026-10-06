'use server';
import { revalidatePath } from 'next/cache';
import { requireRole } from '../../lib/auth/roles';
import { getSupabaseAdminClient } from '../../lib/supabase/admin';
export async function markReviewed(formData) {
  const { user } = await requireRole('admin'); const admin = getSupabaseAdminClient(); if (!admin) throw new Error('Recepción no disponible.');
  const id = String(formData.get('id') || '');
  const { data, error } = await admin.from('admin_audit_log').select('details').eq('id', id).eq('action', 'public_contribution').maybeSingle();
  if (error || !data) throw new Error('No se pudo encontrar el aporte.');
  const { error: updateError } = await admin.from('admin_audit_log').update({ details: { ...data.details, reviewed: true, reviewedBy: user.id, reviewedAt: new Date().toISOString() } }).eq('id', id).eq('action', 'public_contribution');
  if (updateError) throw new Error('No se pudo actualizar el aporte.');
  revalidatePath('/admin/aportes');
}
