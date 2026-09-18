// Comprobación de rol del lado servidor — para usar en layouts/Server Components de zonas
// privadas (`/admin`, y en el futuro `/club`). No es un reemplazo de RLS ni del proxy: es
// una tercera capa (defensa en profundidad), pensada para poder redirigir con un mensaje claro
// antes de renderizar nada del panel, no solo bloquear la consulta de datos.
//
// Los tres roles válidos (`user`, `club`, `admin`) están definidos en la constraint de
// `public.profiles.role` (ver la migración `roles_profiles_newsletter_audit`) — este archivo no
// inventa ningún rol adicional.

import { redirect } from 'next/navigation';
import { getSessionProfile } from '../supabase/server';

const ROLE_RANK = { user: 0, club: 1, admin: 2 };

// `minRole`: alcanza con tener ese rol o uno de rango mayor (admin siempre pasa cualquier
// chequeo). Si no hay sesión, redirige a Mi Cultivo con el login. Si hay sesión pero el rol no
// alcanza, redirige a Mi Cultivo con un aviso — nunca muestra ni un fragmento del panel privado
// antes de decidir esto.
export async function requireRole(minRole) {
  const { user, profile } = await getSessionProfile();

  if (!user) {
    redirect('/mi-cultivo?auth=requerido');
  }

  const role = profile?.role ?? 'user';
  if (ROLE_RANK[role] < ROLE_RANK[minRole]) {
    redirect('/mi-cultivo?acceso=denegado');
  }

  return { user, profile };
}
