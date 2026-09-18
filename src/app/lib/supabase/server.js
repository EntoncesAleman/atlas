// Cliente de Supabase para Server Components, Route Handlers y Server Actions.
//
// Lee/escribe la sesión desde las cookies de la request (mismo formato que escribe
// `createBrowserClient` en `lib/supabase/client.js`) — es lo que permite comprobar sesión y rol
// del lado servidor antes de renderizar una página o ejecutar una acción, no solo ocultar
// elementos en el cliente. Usa la clave publicable: igual que el cliente de navegador, el acceso
// real a los datos queda controlado por RLS, no por esta clave. Para operaciones que necesitan
// saltarse RLS (panel admin: listar todos los usuarios, cambiar el rol de otra persona), usar
// `lib/supabase/admin.js` en su lugar — nunca esta.

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getServerSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Un Server Component no puede escribir cookies (solo leerlas) — es esperable acá,
          // porque `middleware.js` ya se encarga de refrescar y persistir la sesión en cada
          // request. Este catch evita que Next.js tire un error por intentarlo de todos modos.
        }
      }
    }
  });
}

// Devuelve el usuario autenticado (o null) y su perfil (rol, club_name, club_status) leído con
// RLS normal (`profiles_select_own`) — es decir, cada quien solo puede leer su propio perfil acá,
// lo cual alcanza para esta función porque su propósito es "quién soy y qué rol tengo".
export async function getSessionProfile() {
  const supabase = await getServerSupabaseClient();
  if (!supabase) return { user: null, profile: null };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, display_name, role, club_name, club_status')
    .eq('id', user.id)
    .maybeSingle();

  return { user, profile: profile ?? null };
}
