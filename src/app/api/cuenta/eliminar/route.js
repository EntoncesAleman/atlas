import { isSameOrigin } from '../../../lib/account/request';
import { getServerSupabaseClient } from '../../../lib/supabase/server';
import { getSupabaseAdminClient } from '../../../lib/supabase/admin';
import { deleteAccount } from '../../../lib/account/data';
import { removeClubMedia } from '../../../lib/club/data';
export const maxDuration = 60;
export async function DELETE(request) {
  if (!isSameOrigin(request)) return Response.json({ error: 'Solicitud inválida.' }, { status: 403 });
  const client = await getServerSupabaseClient();
  const user = client ? (await client.auth.getUser()).data.user : null;
  if (!user) return Response.json({ error: 'Iniciá sesión para eliminar tu cuenta.' }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (body?.confirmation !== 'ELIMINAR') return Response.json({ error: 'Confirmá la eliminación.' }, { status: 400 });
  const admin = getSupabaseAdminClient();
  if (!admin) return Response.json({ error: 'La eliminación de cuentas no está disponible ahora.' }, { status: 503 });
  try {
    await removeClubMedia(admin, user.id);
    await deleteAccount(admin, user.id);
    await client.auth.signOut();
    return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'La eliminación no se completó. Algunas fotos pueden haberse borrado. Volvé a intentarlo.' }, { status: 503 });
  }
}
