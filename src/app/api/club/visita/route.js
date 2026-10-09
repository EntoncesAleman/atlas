// Cuenta una visita a la ficha pública de un club. Solo suma a un contador diario por club: no
// guarda quién visitó, ni IP, ni navegador.

import { isSameOrigin } from '../../../lib/account/request';
import { getSupabaseAdminClient } from '../../../lib/supabase/admin';

export async function POST(request) {
  if (!isSameOrigin(request)) return Response.json({ error: 'Solicitud inválida.' }, { status: 403 });
  let body;
  try { body = JSON.parse((await request.text()).slice(0, 500)); } catch { return Response.json({ error: 'Solicitud inválida.' }, { status: 400 }); }
  const slug = typeof body?.slug === 'string' ? body.slug.slice(0, 80) : '';
  const admin = getSupabaseAdminClient();
  if (!slug || !admin) return Response.json({ ok: false });
  const { data } = await admin.from('club_profiles').select('club_id').eq('slug', slug).not('published', 'is', null).maybeSingle();
  if (data) await admin.rpc('increment_club_view', { p_club: data.club_id, p_target: 'ficha' });
  return Response.json({ ok: true });
}
