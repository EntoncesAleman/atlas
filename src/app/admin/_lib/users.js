// Helpers de lectura para el panel admin: combinan `auth.users` (vía la Admin API, que
// requiere service_role) con `public.profiles` (rol, club_name, club_status). Ninguna función
// acá hace RLS bypass "por las dudas" en el cliente — todas corren server-side, dentro de
// páginas/acciones ya protegidas por `requireRole('admin')`.

import { getSupabaseAdminClient } from '../../lib/supabase/admin';

// `auth.admin.listUsers` pagina de a 50 por default — para el tamaño actual de este proyecto
// (0 usuarios reales todavía) alcanza con traer varias páginas hasta agotarlas; si el proyecto
// crece mucho, esta función es el único lugar que habría que cambiar a paginación real en la UI.
export async function listAllAuthUsers() {
  const admin = getSupabaseAdminClient();
  if (!admin) return { users: [], error: 'admin_client_not_configured' };

  const perPage = 200;
  let page = 1;
  const all = [];
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) return { users: all, error: error.message };
    all.push(...data.users);
    if (data.users.length < perPage) break;
    page += 1;
    if (page > 25) break; // salvaguarda: no iterar sin límite ante un bug de paginación
  }
  return { users: all, error: null };
}

export async function listAllProfiles() {
  const admin = getSupabaseAdminClient();
  if (!admin) return { profiles: [], error: 'admin_client_not_configured' };
  const { data, error } = await admin.from('profiles').select('*');
  if (error) return { profiles: [], error: error.message };
  return { profiles: data ?? [], error: null };
}

// Combina ambas fuentes por id en una sola fila lista para tabla: email/fecha de
// alta/último ingreso/estado de baneo desde auth.users, rol/club desde profiles.
export async function listCombinedUsers() {
  const [{ users, error: usersError }, { profiles, error: profilesError }] = await Promise.all([
    listAllAuthUsers(),
    listAllProfiles()
  ]);

  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));

  const combined = users.map((user) => {
    const profile = profileById.get(user.id) ?? null;
    const provider = user.app_metadata?.provider ?? user.identities?.[0]?.provider ?? 'email';
    const isBanned = Boolean(user.banned_until) && new Date(user.banned_until) > new Date();
    return {
      id: user.id,
      email: user.email,
      createdAt: user.created_at,
      lastSignInAt: user.last_sign_in_at,
      provider,
      isBanned,
      role: profile?.role ?? 'user',
      displayName: profile?.display_name ?? null,
      clubName: profile?.club_name ?? null,
      clubStatus: profile?.club_status ?? null
    };
  });

  return { users: combined, error: usersError ?? profilesError ?? null };
}
