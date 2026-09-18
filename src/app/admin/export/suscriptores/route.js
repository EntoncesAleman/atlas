import { requireRole } from '../../../lib/auth/roles';
import { getSupabaseAdminClient } from '../../../lib/supabase/admin';
import { toCsv, csvResponse } from '../../_lib/csv';

export async function GET() {
  await requireRole('admin');
  const admin = getSupabaseAdminClient();
  const { data } = admin
    ? await admin.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false })
    : { data: [] };
  const csv = toCsv(data ?? [], [
    { label: 'email', value: (s) => s.email },
    { label: 'estado', value: (s) => s.status },
    { label: 'segmentos', value: (s) => (s.segments ?? []).join('|') },
    { label: 'origen', value: (s) => s.source ?? '' },
    { label: 'suscripto_desde', value: (s) => s.subscribed_at },
    { label: 'dado_de_baja', value: (s) => s.unsubscribed_at ?? '' }
  ]);
  return csvResponse(csv, `suscriptores-${new Date().toISOString().slice(0, 10)}.csv`);
}
