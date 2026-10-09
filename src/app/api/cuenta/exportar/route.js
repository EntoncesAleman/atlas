import { getServerSupabaseClient } from '../../../lib/supabase/server';
import { exportAccount } from '../../../lib/account/data';
import { exportUserClubData } from '../../../lib/club/data';
export const maxDuration = 60;
export async function GET() {
  const client = await getServerSupabaseClient();
  const user = client ? (await client.auth.getUser()).data.user : null;
  if (!user) return Response.json({ error: 'Iniciá sesión para exportar tus datos.' }, { status: 401 });
  try {
    return new Response(JSON.stringify({ ...await exportAccount(client, user), clubs: await exportUserClubData(user) }, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Disposition': 'attachment; filename="atlas-mi-cuenta.json"', 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'No se pudo completar la exportación. Probá de nuevo.' }, { status: 503 });
  }
}
