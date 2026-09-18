// Disparador manual y explícito del envío de notificaciones pendientes — nunca se llama solo.
// Pensado para invocarse a mano (o, más adelante, desde un cron/acción admin explícita) una vez
// que `EMAIL_PROVIDER_API_KEY` esté configurada en producción. Sin esa variable, sigue
// respondiendo 200 con `skipped` en el resultado — nunca falla en silencio ni finge un envío.
import { NextResponse } from 'next/server';
import { getServerSupabaseClient } from '../../../lib/supabase/server';
import { dispatchPendingEmailNotifications } from '../../../lib/notifications/dispatch';

export async function POST() {
  const supabase = await getServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no está configurado.' }, { status: 500 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Necesitás una sesión activa.' }, { status: 401 });
  }

  try {
    const result = await dispatchPendingEmailNotifications(supabase, user.id, user.email);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json({ error: error.message ?? 'Error inesperado' }, { status: 500 });
  }
}
