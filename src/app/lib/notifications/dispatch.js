// Orquestador de envío de notificaciones — server-only. Deliberadamente en capas separadas
// (brief §10): generación del aviso (`miCultivo/alerts/engine.js`, ya corrió antes de esto y dejó
// filas en `cultivo_alerts`), preferencias (`notification_preferences`), proveedor de envío
// (`provider.js`) y cola/historial (`notification_log`) — cada una reemplazable sin tocar las
// demás.
//
// No se llama automáticamente en ningún render ni efecto: requiere una invocación explícita (ver
// `src/app/api/notifications/dispatch/route.js`), tal como pide el brief ("no enviar emails
// reales... sin una acción explícita").

import { sendEmail } from './provider';

const CATEGORY_PREFERENCE_KEY = {
  clima: 'email_clima',
  etapa: 'email_etapa',
  sanidad: 'email_sanidad'
};

const CATEGORY_LABEL = { clima: 'Clima', etapa: 'Etapa', sanidad: 'Sanidad' };

// `supabase`: cliente server-side con la sesión de la propia persona (ver lib/supabase/server.js)
// — todas las consultas quedan acotadas a sus propios datos por RLS, así que esta función nunca
// necesita (ni debe recibir) un cliente con service_role.
export async function dispatchPendingEmailNotifications(supabase, userId, userEmail) {
  const { data: preferences } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (!preferences) {
    return { processed: 0, sent: 0, skipped: 0, failed: 0 };
  }

  // Alertas del usuario que todavía no tienen ningún intento de envío por email registrado en el
  // historial — esto ES la deduplicación a nivel de notificación: cada alerta genera como máximo
  // un intento de email en toda su vida, nunca reintentos automáticos repetidos.
  const { data: alreadyNotified } = await supabase
    .from('notification_log')
    .select('alert_id')
    .eq('user_id', userId)
    .eq('channel', 'email');
  const notifiedIds = new Set((alreadyNotified ?? []).map((row) => row.alert_id));

  const { data: alerts } = await supabase
    .from('cultivo_alerts')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'unread');

  const pending = (alerts ?? []).filter((alert) => !notifiedIds.has(alert.id));

  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const alert of pending) {
    const preferenceKey = CATEGORY_PREFERENCE_KEY[alert.category];
    if (!preferenceKey || !preferences[preferenceKey]) {
      continue; // La persona no pidió avisos de esta categoría — ni se cuenta como intento.
    }

    const result = await sendEmail({
      to: userEmail,
      subject: `Mi Cultivo — ${CATEGORY_LABEL[alert.category] ?? alert.category}: ${alert.title}`,
      body: alert.body
    });

    const logRow = {
      user_id: userId,
      alert_id: alert.id,
      channel: 'email',
      status: result.ok ? 'sent' : result.skipped ? 'skipped' : 'failed',
      error: result.ok ? null : result.reason,
      sent_at: result.ok ? new Date().toISOString() : null
    };
    await supabase.from('notification_log').insert(logRow);

    if (result.ok) sent += 1;
    else if (result.skipped) skipped += 1;
    else failed += 1;
  }

  return { processed: pending.length, sent, skipped, failed };
}
