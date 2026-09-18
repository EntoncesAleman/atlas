// Route Handler de callback de OAuth (Google, vía Supabase Auth).
//
// Esta es la URI que hay que pasar como `redirectTo` en `signInWithOAuth({ provider: 'google' })`
// — NO la URI que se registra en Google Cloud Console (esa es la de Supabase, ver
// `docs/GOOGLE_OAUTH_SETUP.md`). El flujo completo:
//
//   1. El navegador llama a `supabase.auth.signInWithOAuth({ provider: 'google', options:
//      { redirectTo: `${origin}/auth/callback` } })`.
//   2. Supabase redirige al navegador a Google. Google pide login/consentimiento.
//   3. Google redirige al navegador de vuelta a Supabase (a la URI que SÍ hay que cargar en
//      Google Cloud Console: `https://<project-ref>.supabase.co/auth/v1/callback`).
//   4. Supabase procesa el resultado y redirige al navegador a ESTA ruta
//      (`/auth/callback?code=...`), la que pasamos como `redirectTo` en el paso 1.
//   5. Este handler intercambia ese `code` por una sesión real y la deja guardada en cookies
//      (mismo formato que usa el resto de la app) antes de redirigir a destino.
//
// Sin este intercambio, la sesión nunca queda guardada del lado servidor — el usuario volvería
// a la app con un `code` en la URL pero sin sesión activa.

import { NextResponse } from 'next/server';
import { getServerSupabaseClient } from '../../lib/supabase/server';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/mi-cultivo';

  if (code) {
    const supabase = await getServerSupabaseClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/mi-cultivo?auth=error`);
}
