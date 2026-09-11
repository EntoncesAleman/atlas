// Capa de clima de "Mi Cultivo" (Fase 11).
//
// La UI nunca llama a Open-Meteo directamente: siempre pasa por `/api/climate`
// (proxy server-side ya existente desde una fase anterior), que ya no expone
// ninguna clave (Open-Meteo no la requiere en su tier gratuito no comercial —
// ver `04_CLIMATE.md`) y ya trae sus propios encabezados de cache HTTP
// (`s-maxage=3600`), que el propio `fetch` del navegador respeta para pedidos
// GET idénticos — no hace falta una capa de cache adicional para esto.
//
// Ningún dato meteorológico se guarda en Supabase: esto es siempre una
// consulta en vivo al proveedor (a través del proxy), nunca una tabla nueva.
// Lo único que persiste es la provincia elegida (ver `miCultivo/remoteStorage.js`
// y `miCultivo/storage.js`), no ninguna respuesta climática puntual.

import { getProvinceLocation } from './locations';

const FROST_THRESHOLD_C = 0;
const HEAVY_RAIN_THRESHOLD_MM = 20;
const STRONG_WIND_THRESHOLD_KMH = 40;
const HIGH_TEMP_THRESHOLD_C = 32;
const LOW_TEMP_THRESHOLD_C = 5;
const HIGH_HUMIDITY_THRESHOLD_PCT = 80;

function formatShortDate(isoDate) {
  const [, month, day] = isoDate.split('-');
  return `${day}/${month}`;
}

// "Qué está pasando hoy": lecturas descriptivas, nunca un diagnóstico —
// siempre en términos de lo que se registró, no de lo que "tiene" la planta.
function buildTodayReadings(current) {
  const readings = [];
  if (!current) return readings;

  if (typeof current.humidity === 'number' && current.humidity >= HIGH_HUMIDITY_THRESHOLD_PCT) {
    readings.push({
      id: 'humid',
      label: 'Ambiente húmedo',
      detail: `Humedad registrada: ${Math.round(current.humidity)}%. Puede favorecer hongos y otros problemas asociados a la humedad — conviene observar.`,
    });
  }
  if (typeof current.precipitation === 'number' && current.precipitation > 0) {
    readings.push({
      id: 'recentRain',
      label: 'Lluvia reciente',
      detail: `Precipitación registrada en la última hora: ${current.precipitation} mm.`,
    });
  }
  if (typeof current.windSpeed === 'number' && current.windSpeed >= STRONG_WIND_THRESHOLD_KMH) {
    readings.push({
      id: 'strongWind',
      label: 'Viento fuerte',
      detail: `Viento registrado: ${Math.round(current.windSpeed)} km/h.`,
    });
  }
  if (typeof current.temperature === 'number' && current.temperature >= HIGH_TEMP_THRESHOLD_C) {
    readings.push({
      id: 'highTemp',
      label: 'Temperatura elevada',
      detail: `Temperatura registrada: ${Math.round(current.temperature)} °C.`,
    });
  }
  if (typeof current.temperature === 'number' && current.temperature <= LOW_TEMP_THRESHOLD_C) {
    readings.push({
      id: 'lowTemp',
      label: 'Temperatura baja',
      detail: `Temperatura registrada: ${Math.round(current.temperature)} °C.`,
    });
  }
  return readings;
}

// Alertas calculadas por umbral sobre el pronóstico (Open-Meteo no ofrece un
// endpoint de alertas — ver investigación en `04_CLIMATE.md`). Son una lectura
// propia del proyecto sobre datos reales, no un aviso oficial: siempre se
// presentan junto con el link a los avisos oficiales del SMN.
function buildForecastAlerts(forecast) {
  const alerts = [];
  for (const day of forecast) {
    if (typeof day.tempMin === 'number' && day.tempMin <= FROST_THRESHOLD_C) {
      alerts.push({
        id: `helada-${day.date}`,
        label: 'Riesgo de helada',
        detail: `Temperatura mínima prevista para el ${formatShortDate(day.date)}: ${Math.round(day.tempMin)} °C.`,
      });
    }
    if (typeof day.precipitationSum === 'number' && day.precipitationSum >= HEAVY_RAIN_THRESHOLD_MM) {
      alerts.push({
        id: `lluvia-${day.date}`,
        label: 'Lluvia abundante prevista',
        detail: `Precipitación acumulada prevista para el ${formatShortDate(day.date)}: ${Math.round(day.precipitationSum)} mm.`,
      });
    }
  }
  return alerts;
}

// Devuelve { ok: true, ... } con datos reales, o { ok: false, reason } — nunca
// datos inventados ni un 0/valor por defecto disfrazado de dato real.
export async function fetchProvinceWeather(provinceId) {
  const location = getProvinceLocation(provinceId);
  if (!location) {
    return { ok: false, reason: 'unknown_location' };
  }

  let response;
  try {
    response = await fetch(
      `/api/climate?lat=${location.lat}&lon=${location.lon}&region=${encodeURIComponent(provinceId)}`,
      { headers: { accept: 'application/json' } }
    );
  } catch {
    return { ok: false, reason: 'network_error', locationName: location.name };
  }

  if (!response.ok) {
    return { ok: false, reason: 'provider_unavailable', locationName: location.name };
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    return { ok: false, reason: 'invalid_response', locationName: location.name };
  }

  if (!payload?.ok || !payload.current) {
    return { ok: false, reason: 'provider_unavailable', locationName: location.name };
  }

  const rawCurrent = payload.current;
  const rawDaily = payload.daily;

  const current = {
    temperature: typeof rawCurrent.temperature_2m === 'number' ? rawCurrent.temperature_2m : null,
    humidity: typeof rawCurrent.relative_humidity_2m === 'number' ? rawCurrent.relative_humidity_2m : null,
    precipitation: typeof rawCurrent.precipitation === 'number' ? rawCurrent.precipitation : null,
    windSpeed: typeof rawCurrent.wind_speed_10m === 'number' ? rawCurrent.wind_speed_10m : null,
  };

  const forecast = Array.isArray(rawDaily?.time)
    ? rawDaily.time.map((date, index) => ({
        date,
        tempMax: rawDaily.temperature_2m_max?.[index] ?? null,
        tempMin: rawDaily.temperature_2m_min?.[index] ?? null,
        precipitationSum: rawDaily.precipitation_sum?.[index] ?? null,
      }))
    : [];

  return {
    ok: true,
    locationName: location.name,
    generatedAt: payload.generated_at ?? null,
    current,
    forecast,
    todayReadings: buildTodayReadings(current),
    alerts: buildForecastAlerts(forecast),
  };
}
