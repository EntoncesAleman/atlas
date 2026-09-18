// Punto de entrada del motor automático de acompañamiento (§13) — pensado para Vercel Cron (ver
// `vercel.json`, que ya lo programa una vez por día, el intervalo más frecuente disponible sin
// un plan pago), pero utilizable a mano durante desarrollo con el mismo `CRON_SECRET`.
//
// Vercel Cron dispara un GET; se soporta también POST para invocarlo a mano (ej. `curl -X POST`)
// con el mismo esquema de autorización, sin duplicar lógica entre ambos métodos.
import { NextResponse } from 'next/server';
import { runScheduledCompanionCheck } from '../../../lib/notifications/scheduledRun';

function isAuthorized(request) {
  const secret = process.env.CRON_SECRET;
  // Sin `CRON_SECRET` configurada, el endpoint queda inutilizable — nunca hay un "modo abierto"
  // por defecto para algo que escribe datos de todas las personas usuarias.
  if (!secret) return false;
  return request.headers.get('authorization') === `Bearer ${secret}`;
}

async function handle(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const dryRun = new URL(request.url).searchParams.get('dryRun') === 'true';

  try {
    const result = await runScheduledCompanionCheck({ dryRun });
    return NextResponse.json(result, { status: result.ok ? 200 : 500 });
  } catch (error) {
    console.error('scheduled_companion_check_exception', error);
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}

export async function GET(request) {
  return handle(request);
}

export async function POST(request) {
  return handle(request);
}
