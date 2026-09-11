// Cliente de Supabase para el navegador (Fase 10B).
//
// Usa la clave publicable (segura para exponer en el cliente: el acceso real a
// los datos queda controlado por las políticas RLS de cada tabla, no por esta
// clave). No hay ninguna clave secreta/service_role en este archivo ni en
// ningún código que corra en el navegador.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let browserClient = null;

export function getSupabaseClient() {
  if (typeof window === 'undefined') return null;
  if (!supabaseUrl || !supabaseKey) return null;
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseKey);
  }
  return browserClient;
}
