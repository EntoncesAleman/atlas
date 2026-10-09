// Clubes de la persona con sesión: los que sigue, los que integra y sus invitaciones. Con
// `?club=<id>` responde solo si sigue a ese club (lo usa el botón Seguir de la ficha pública).

import { getSessionProfile } from '../../../lib/supabase/server';
import { getSupabaseAdminClient } from '../../../lib/supabase/admin';
import { getUserClubs } from '../../../lib/club/data';

export async function GET(request) {
  const { user } = await getSessionProfile();
  const clubId = new URL(request.url).searchParams.get('club');
  const headers = { 'Cache-Control': 'private, no-store' };
  if (clubId) {
    if (!user) return Response.json({ signedIn: false, following: false }, { headers });
    const admin = getSupabaseAdminClient();
    const { data } = admin ? await admin.from('club_follows').select('club_id').eq('user_id', user.id).eq('club_id', clubId).maybeSingle() : { data: null };
    return Response.json({ signedIn: true, following: Boolean(data) }, { headers });
  }
  if (!user) return Response.json({ error: 'Iniciá sesión.' }, { status: 401, headers });
  return Response.json(await getUserClubs(user), { headers });
}
