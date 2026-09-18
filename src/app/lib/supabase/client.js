// Cliente de Supabase para el navegador (Fase 10B, migrado a @supabase/ssr en la fase de
// roles/admin — 2026-09-18).
//
// Usa la clave publicable (segura para exponer en el cliente: el acceso real a los datos queda
// controlado por las políticas RLS de cada tabla, no por esta clave). No hay ninguna clave
// secreta/service_role en este archivo ni en ningún código que corra en el navegador.
//
// Por qué @supabase/ssr y no supabase-js `createClient` directo (como antes): `createClient`
// guarda la sesión en localStorage, invisible para el servidor. `createBrowserClient` guarda la
// sesión en cookies, con el mismo formato que lee `lib/supabase/server.js` — es lo que permite
// que `middleware.js` y los Server Components (como el layout de `/admin`) puedan comprobar la
// sesión y el rol del lado servidor, no solo ocultar botones en el cliente. La API pública
// (`getSupabaseClient()`) no cambió, así que el resto del código (Mi Cultivo) sigue igual.

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let browserClient = null;

export function getSupabaseClient() {
  if (typeof window === 'undefined') return null;
  if (!supabaseUrl || !supabaseKey) return null;
  if (!browserClient) {
    browserClient = createBrowserClient(supabaseUrl, supabaseKey);
  }
  return browserClient;
}
