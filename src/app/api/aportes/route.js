import { isSameOrigin } from '../../lib/account/request';
import { createHmac } from 'node:crypto';
import { getSupabaseAdminClient } from '../../lib/supabase/admin';
export async function POST(request) {
  if (!isSameOrigin(request)) return Response.json({ error: 'Solicitud inválida.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 16000) return Response.json({ error: 'El aporte es demasiado largo.' }, { status: 413 });
  const raw = await request.text();
  if (raw.length > 16000) return Response.json({ error: 'El aporte es demasiado largo.' }, { status: 413 });
  let body; try { body = JSON.parse(raw); } catch { return Response.json({ error: 'Solicitud inválida.' }, { status: 400 }); }
  const types = ['correccion', 'actividad', 'fuente', 'otro'];
  const type = body?.type;
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const reference = typeof body?.reference === 'string' ? body.reference.trim() : '';
  let validReference = !reference || (reference.startsWith('/') && !reference.startsWith('//'));
  try { if (reference && !reference.startsWith('/')) validReference = new URL(reference).protocol === 'https:'; } catch {}
  if (body?.website || body?.consent !== true || !types.includes(type) || message.length < 20 || message.length > 4000 || email.length > 254 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || reference.length > 1000 || !validReference) {
    return Response.json({ error: 'Revisá el mensaje, el email y la referencia antes de enviarlos.' }, { status: 400 });
  }
  const admin = getSupabaseAdminClient();
  if (!admin) return Response.json({ error: 'La recepción de aportes no está disponible ahora. Podés guardar tu mensaje y volver a intentarlo.' }, { status: 503 });
  // Keep raw IP addresses out of the editorial inbox. The token expires with the day.
  const ip = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for') || 'local';
  const rateKey = createHmac('sha256', process.env.SUPABASE_SERVICE_ROLE_KEY).update(`${new Date().toISOString().slice(0, 10)}:${ip.split(',')[0]}`).digest('hex');
  const { count, error: countError } = await admin.from('admin_audit_log').select('id', { count: 'exact', head: true }).eq('action', 'public_contribution').eq('details->>rateKey', rateKey).gte('created_at', new Date(Date.now() - 3600000).toISOString());
  if (countError) return Response.json({ error: 'No se pudo recibir el aporte. Probá más tarde.' }, { status: 503 });
  if (count >= 3) return Response.json({ error: 'Ya recibimos varios aportes desde esta conexión. Probá de nuevo en una hora.' }, { status: 429 });
  // Existing private audit store provides a durable, admin-only inbox without public write policies.
  const { error } = await admin.from('admin_audit_log').insert({ actor_id: null, actor_email: email || null, action: 'public_contribution', target_type: type, target_id: null, details: { message, reference, rateKey, reviewed: false } });
  if (error) return Response.json({ error: 'No se pudo guardar el aporte. Tu mensaje sigue en el formulario para reintentarlo.' }, { status: 503 });
  return Response.json({ ok: true });
}
