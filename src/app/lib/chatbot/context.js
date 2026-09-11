// Contexto autorizado del usuario para el Chatbot del Atlas (Fase 13C).
//
// `loadUserContext(supabase, session, atlasResults)` arma el paquete de
// contexto que la futura Fase 13D va a poder pasarle a un motor de
// respuesta — hoy no se usa para generar nada, solo se prepara y se muestra
// de forma discreta en la UI (ver `chatbot/page.js`).
//
// Reutiliza exactamente las mismas funciones ya existentes y ya probadas de
// Mi Cultivo (Fase 10B/10C) y de clima (Fase 11) — no se creó ninguna tabla,
// ninguna política RLS nueva, ningún proveedor climático nuevo. Esta capa
// SOLO lee: nunca crea, actualiza ni borra nada de Mi Cultivo.
//
// Regla de privacidad no negociable: el contexto pertenece exclusivamente a
// `session.user.id`, la identidad ya validada por Supabase Auth — esta
// función nunca acepta un id de usuario como parámetro externo. El
// aislamiento real entre cuentas lo sigue haciendo RLS (`auth.uid() =
// user_id`, sin cambios), no este código.
//
// Regla de "contexto, no diagnóstico": nada de lo que arma esta capa es una
// conclusión. `cultivation`/`climate` son datos crudos (etapa, fechas,
// notas, condiciones ambientales) para que una futura respuesta los pueda
// usar como referencia — no hay ningún campo de "estado de salud",
// "problema detectado" ni nada equivalente, y no debe agregarse ninguno acá.

import { fetchCultivo } from '../miCultivo/remoteStorage';
import { countPhotosByEvent } from '../miCultivo/photos';
import { stageLabel } from '../miCultivo/model';
import { fetchProvinceWeather } from '../weather/service';
import { getProvinceLocation } from '../weather/locations';

// Mismo criterio único de "inicio de temporada" que Mi Temporada (Fase 12):
// la fecha del primer evento real, nunca `createdAt` del registro ni la
// fecha de hoy. Ver `mi-cultivo/page.js` (`getSeasonStartDate`) — misma
// lógica, duplicada acá a propósito para que esta capa no dependa de un
// componente de UI ('use client').
function getSeasonStartDate(events) {
  if (!events.length) return null;
  return events.reduce((earliest, item) => (item.date < earliest ? item.date : earliest), events[0].date);
}

function buildCultivationContext(cultivo, photoCountsByEvent) {
  if (!cultivo) {
    return {
      hasCultivation: false,
      stage: null,
      stageLabel: null,
      startDate: null,
      eventCount: 0,
      events: [],
      photoCount: 0,
      photosAvailable: false,
    };
  }

  const events = cultivo.events ?? [];
  const photoCount = Object.values(photoCountsByEvent ?? {}).reduce((sum, count) => sum + count, 0);

  return {
    hasCultivation: true,
    stage: cultivo.currentStageId ?? null,
    stageLabel: cultivo.currentStageId ? stageLabel(cultivo.currentStageId) : null,
    startDate: getSeasonStartDate(events),
    eventCount: events.length,
    // Sin `id` (UUID interno) ni datos de fotos por evento — solo lo que la
    // consigna pide: etapa, fecha, nota.
    events: events.map((event) => ({ stageId: event.stageId, date: event.date, note: event.note ?? '' })),
    photoCount,
    photosAvailable: photoCount > 0,
  };
}

function buildGeographyContext(provinceId) {
  const location = provinceId ? getProvinceLocation(provinceId) : null;
  return { province: location?.name ?? null };
}

async function buildClimateContext(provinceId) {
  const empty = { available: false, current: null, forecast: [], todayReadings: [], alerts: [] };
  if (!provinceId) return empty;

  const weather = await fetchProvinceWeather(provinceId);
  if (!weather.ok) return empty; // fallback limpio — nunca un dato inventado

  return {
    available: true,
    current: weather.current,
    forecast: weather.forecast,
    todayReadings: weather.todayReadings,
    alerts: weather.alerts,
  };
}

// Devuelve el paquete de contexto, o `null` si no hay sesión real. Nunca
// lanza: cualquier fallo puntual (cultivo inexistente, clima no disponible)
// se resuelve como contexto vacío/`null`/`false`, nunca como excepción que
// rompa la búsqueda editorial de 13B.
export async function loadUserContext(supabase, session, atlasResults = []) {
  if (!supabase || !session?.user?.id) return null;

  let cultivo = null;
  try {
    cultivo = await fetchCultivo(supabase, session.user.id);
  } catch {
    cultivo = null;
  }

  let photoCountsByEvent = {};
  if (cultivo) {
    try {
      photoCountsByEvent = await countPhotosByEvent(supabase, cultivo.id);
    } catch {
      photoCountsByEvent = {};
    }
  }

  const provinceId = cultivo?.provinceId ?? null;
  const climate = await buildClimateContext(provinceId);

  return {
    atlas: { results: atlasResults },
    cultivation: buildCultivationContext(cultivo, photoCountsByEvent),
    geography: buildGeographyContext(provinceId),
    climate,
  };
}
