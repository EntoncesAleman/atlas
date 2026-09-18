// Motor automático de acompañamiento (§13) — la pieza que hace que Mi Cultivo pueda avisar sin
// depender de que la persona abra la página. No es un sistema nuevo de reglas: reutiliza,
// server-side y para TODOS los cultivos a la vez, exactamente el mismo motor que ya corre
// client-side cuando alguien visita Mi Cultivo (`miCultivo/alerts/engine.js`) y el mismo
// despachador de notificaciones que ya usa el disparo manual (`notifications/dispatch.js`).
//
// Flujo (brief §13): cultivo → ubicación → etapa/temporada → clima → reglas editoriales →
// evaluación → alerta → preferencias → cola de notificación → envío → historial.
//
// Quién lo llama: `src/app/api/notifications/scheduled-run/route.js` (protegido con
// `CRON_SECRET`, pensado para Vercel Cron — ver `vercel.json`) o, en modo simulación, cualquier
// invocación manual con `dryRun: true` durante desarrollo. Nunca se llama solo.
//
// Idempotencia (Vercel documenta que un cron puede, ocasionalmente, invocarse dos veces para el
// mismo horario, o saltearse una ejecución — nunca hay que asumir "una vez por día, exacto"):
// esta función es segura de correr más de una vez seguida sin efectos duplicados. Generar
// alertas usa upsert con la constraint única `(cultivo_id, dedupe_key)`; despachar
// notificaciones revisa `notification_log` antes de reintentar un envío ya intentado. No hace
// falta un lock de concurrencia para esta escala.

import { getSupabaseAdminClient } from '../supabase/admin';
import { fetchProvinceWeatherServer } from '../weather/service';
import { buildAlertCandidates } from '../miCultivo/alerts/engine';
import { daysInCurrentStage } from '../miCultivo/season';
import { dispatchPendingEmailNotifications } from './dispatch';

const WEATHER_FETCH_ATTEMPTS = 2; // reintento simple: un pedido más si el primero falla, no una cola de reintentos con backoff — proporcional a lo que pide el brief.

async function fetchWeatherWithRetry(provinceId) {
  let lastResult = { ok: false, reason: 'unknown_location' };
  for (let attempt = 1; attempt <= WEATHER_FETCH_ATTEMPTS; attempt += 1) {
    try {
      lastResult = await fetchProvinceWeatherServer(provinceId);
      if (lastResult.ok) return lastResult;
    } catch (error) {
      lastResult = { ok: false, reason: 'exception', message: error.message };
    }
  }
  return lastResult;
}

// Mismo criterio de "upsert con dedupe" que `miCultivo/alertsRemote.js` (`syncAlertsRemote`),
// pero con el cliente service_role: esto corre para todos los usuarios, no para "mi propia
// fila" bajo RLS. La constraint única `(cultivo_id, dedupe_key)` en la base sigue siendo la
// que de verdad impide duplicados, acá como allá.
async function syncAlertsAdmin(admin, userId, cultivoId, candidates) {
  if (!candidates.length) return [];
  const rows = candidates.map((candidate) => ({
    cultivo_id: cultivoId,
    user_id: userId,
    category: candidate.category,
    title: candidate.title,
    body: candidate.body,
    related_href: candidate.relatedHref,
    dedupe_key: candidate.dedupeKey
  }));
  const { data, error } = await admin
    .from('cultivo_alerts')
    .upsert(rows, { onConflict: 'cultivo_id,dedupe_key', ignoreDuplicates: true })
    .select('id');
  if (error) throw error;
  return data ?? [];
}

// `dryRun: true` (brief: "crear modo de prueba/simulación... registrar qué alerta habría sido
// enviada y por qué"): evalúa las mismas reglas sobre los mismos datos reales, pero no escribe
// ninguna alerta nueva en `cultivo_alerts` ni dispara `dispatchPendingEmailNotifications` — en
// cambio, devuelve el detalle completo de qué candidatos se habrían generado por cultivo, para
// poder inspeccionarlo (log, respuesta HTTP) sin efectos reales.
export async function runScheduledCompanionCheck({ dryRun = false } = {}) {
  const startedAt = Date.now();
  const admin = getSupabaseAdminClient();
  if (!admin) {
    return { ok: false, reason: 'admin_client_not_configured' };
  }

  const summary = {
    dryRun,
    cultivosConsidered: 0,
    cultivosProcessed: 0,
    cultivosFailed: 0,
    alertsGenerated: 0,
    provincesEvaluated: 0,
    weatherFailures: 0,
    notificationRuns: [],
    dryRunDetails: [],
    errors: []
  };

  // 1) Cultivos con ubicación aproximada elegida — sin eso no hay clima que evaluar, y las
  // reglas de etapa/sanidad tampoco tienen con qué hacerlo (dependen del clima real del lugar).
  const { data: cultivos, error: cultivosError } = await admin
    .from('cultivos')
    .select('id, user_id, current_stage_id, province_id')
    .not('province_id', 'is', null);

  if (cultivosError) {
    return { ok: false, reason: cultivosError.message };
  }

  summary.cultivosConsidered = cultivos.length;
  if (cultivos.length === 0) {
    summary.durationMs = Date.now() - startedAt;
    return { ok: true, ...summary };
  }

  // 2) Clima: una consulta por provincia distinta, nunca una por cultivo — varios cultivos de la
  // misma provincia comparten el mismo resultado. Respeta el límite de la API externa y evita
  // trabajo redundante (brief: "no ejecutar tareas innecesarias continuamente" / "respetar
  // límites de APIs externas").
  const provinceIds = [...new Set(cultivos.map((cultivo) => cultivo.province_id))];
  const weatherByProvince = new Map();
  for (const provinceId of provinceIds) {
    const weather = await fetchWeatherWithRetry(provinceId);
    weatherByProvince.set(provinceId, weather);
    summary.provincesEvaluated += 1;
    if (!weather.ok) summary.weatherFailures += 1;
  }

  // 3) Por cultivo: días en la etapa actual (a partir de sus propios eventos), reglas, alerta.
  for (const cultivo of cultivos) {
    try {
      const { data: eventRows, error: eventsError } = await admin
        .from('cultivo_events')
        .select('stage_id, event_date')
        .eq('cultivo_id', cultivo.id);
      if (eventsError) throw eventsError;

      const events = (eventRows ?? []).map((row) => ({ stageId: row.stage_id, date: row.event_date }));
      const stageDays = daysInCurrentStage(events, cultivo.current_stage_id);
      const weather = weatherByProvince.get(cultivo.province_id) ?? { ok: false, reason: 'unknown_location' };

      const candidates = buildAlertCandidates({
        currentStageId: cultivo.current_stage_id,
        daysInStage: stageDays,
        weatherResult: weather.ok ? weather : null
      });

      if (dryRun) {
        if (candidates.length > 0) {
          summary.dryRunDetails.push({
            cultivoId: cultivo.id,
            userId: cultivo.user_id,
            provinceId: cultivo.province_id,
            wouldGenerate: candidates.map((candidate) => ({
              category: candidate.category,
              title: candidate.title,
              dedupeKey: candidate.dedupeKey
            }))
          });
        }
      } else {
        const inserted = await syncAlertsAdmin(admin, cultivo.user_id, cultivo.id, candidates);
        summary.alertsGenerated += inserted.length;
      }

      summary.cultivosProcessed += 1;
    } catch (error) {
      summary.cultivosFailed += 1;
      summary.errors.push({ scope: 'cultivo', cultivoId: cultivo.id, message: error.message ?? 'unknown_error' });
    }
  }

  // 4) Notificaciones: reutiliza el mismo despachador que el disparo manual
  // (POST /api/notifications/dispatch) — un intento por usuario único con al menos un cultivo
  // considerado, nunca una segunda implementación de envío. En modo simulación no se despacha
  // nada real (ver nota de `dryRun` más arriba): el "qué se habría avisado" ya quedó en
  // `dryRunDetails`, sin necesidad de tocar `notification_log`.
  if (!dryRun) {
    const uniqueUserIds = [...new Set(cultivos.map((cultivo) => cultivo.user_id))];
    for (const userId of uniqueUserIds) {
      try {
        const { data: userLookup, error: userError } = await admin.auth.admin.getUserById(userId);
        if (userError) throw userError;
        const email = userLookup?.user?.email;
        if (!email) continue;
        const result = await dispatchPendingEmailNotifications(admin, userId, email);
        summary.notificationRuns.push({ userId, ...result });
      } catch (error) {
        summary.errors.push({ scope: 'dispatch', userId, message: error.message ?? 'unknown_error' });
      }
    }
  }

  summary.durationMs = Date.now() - startedAt;
  return { ok: true, ...summary };
}
