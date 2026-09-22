// Punto de entrada de la sincronización semanal de Noticias — pensado para Vercel Cron (ver
// `vercel.json`), utilizable a mano durante desarrollo con el mismo `CRON_SECRET`. Mismo patrón
// exacto que `/api/notifications/scheduled-run`: este endpoint es solo un disparador — toda la
// lógica real vive en el ejecutor (`lib/news/executor.js`), no acá.
//
// Vercel Cron dispara un GET; se soporta también POST para invocarlo a mano (ej. `curl -X POST`)
// con el mismo esquema de autorización, sin duplicar lógica entre ambos métodos.
import { NextResponse } from 'next/server';
import { runNewsWeeklySync } from '../../../lib/news/executor';

function isAuthorized(request) {
  const secret = process.env.CRON_SECRET;
  // Sin `CRON_SECRET` configurada, el endpoint queda inutilizable — nunca hay un "modo abierto"
  // por defecto para algo que escribe contenido público en nombre del Atlas.
  if (!secret) return false;
  return request.headers.get('authorization') === `Bearer ${secret}`;
}

async function handle(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const dryRun = new URL(request.url).searchParams.get('dryRun') === 'true';

  try {
    const result = await runNewsWeeklySync({ dryRun });
    return NextResponse.json(result, { status: result.ok ? 200 : 500 });
  } catch (error) {
    console.error('news_weekly_sync_exception', error);
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}

export async function GET(request) {
  return handle(request);
}

export async function POST(request) {
  return handle(request);
}
