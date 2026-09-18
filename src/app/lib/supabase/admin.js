// Cliente de Supabase con la service_role key — SOLO para código que corre en el servidor
// (Route Handlers, Server Actions, Server Components del panel admin). NUNCA importar este
// archivo desde un componente cliente ('use client') ni desde nada que se envíe al navegador:
// la service_role key salta por completo las políticas RLS.
//
// Es la única forma correcta de implementar "gestión de cuentas": listar todas las personas
// usuarias (no solo la propia), cambiar el rol de otra persona, aprobar una cuenta de club,
// suspender una cuenta — ninguna de esas operaciones puede hacerla una persona autenticada común
// contra su propia fila (ver `protect_profile_privileged_columns` en la migración de roles).
//
// La key vive en `SUPABASE_SERVICE_ROLE_KEY` (sin prefijo NEXT_PUBLIC_) para que Next.js nunca la
// incluya en el bundle del navegador. Hace falta configurarla a mano (ver README de variables de
// entorno) — no se inventa ni se commitea.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let adminClient = null;

export function getSupabaseAdminClient() {
  if (typeof window !== 'undefined') {
    throw new Error('getSupabaseAdminClient() no debe llamarse desde el navegador.');
  }
  if (!supabaseUrl || !serviceRoleKey) return null;
  if (!adminClient) {
    adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
  }
  return adminClient;
}
