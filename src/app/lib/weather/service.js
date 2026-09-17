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

// Traducción de `weather_code` (WMO, el mismo estándar que documenta Open-Meteo) a una etiqueta
// legible en español — cierre del widget de clima (LOOP — WIDGET CLIMA DEL ATLAS). Es una
// traducción directa de un código real que ya devuelve el proveedor, no un dato inventado ni una
// lectura agronómica: describe la condición del cielo, nada más.
const WEATHER_CODE_LABELS = {
  0: 'Despejado',
  1: 'Mayormente despejado',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Niebla',
  48: 'Niebla con escarcha',
  51: 'Llovizna débil',
  53: 'Llovizna moderada',
  55: 'Llovizna intensa',
  56: 'Llovizna helada débil',
  57: 'Llovizna helada intensa',
  61: 'Lluvia débil',
  63: 'Lluvia moderada',
  65: 'Lluvia intensa',
  66: 'Lluvia helada débil',
  67: 'Lluvia helada intensa',
  71: 'Nevada débil',
  73: 'Nevada moderada',
  75: 'Nevada intensa',
  77: 'Granos de nieve',
  80: 'Chubascos débiles',
  81: 'Chubascos moderados',
  82: 'Chubascos intensos',
  85: 'Chubascos de nieve débiles',
  86: 'Chubascos de nieve intensos',
  95: 'Tormenta',
  96: 'Tormenta con granizo débil',
  99: 'Tormenta con granizo intenso',
};

function describeWeatherCode(code) {
  if (typeof code !== 'number') return null;
  return WEATHER_CODE_LABELS[code] ?? null;
}

// Open-Meteo devuelve `sunrise`/`sunset` ya en hora local (por `timezone=auto`, ver
// `route.js`), como texto ISO sin offset — se recorta a "HH:MM", sin ningún cálculo propio.
function formatLocalTime(isoDateTime) {
  if (typeof isoDateTime !== 'string') return null;
  const match = isoDateTime.match(/T(\d{2}:\d{2})/);
  return match ? match[1] : null;
}

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
    // Campos agregados para el widget de clima del Atlas — opcionales, `null` si el proveedor no
    // los trae (nunca un valor inventado en su lugar).
    apparentTemperature: typeof rawCurrent.apparent_temperature === 'number' ? rawCurrent.apparent_temperature : null,
    weatherCode: typeof rawCurrent.weather_code === 'number' ? rawCurrent.weather_code : null,
    weatherLabel: describeWeatherCode(rawCurrent.weather_code),
  };

  const forecast = Array.isArray(rawDaily?.time)
    ? rawDaily.time.map((date, index) => ({
        date,
        tempMax: rawDaily.temperature_2m_max?.[index] ?? null,
        tempMin: rawDaily.temperature_2m_min?.[index] ?? null,
        precipitationSum: rawDaily.precipitation_sum?.[index] ?? null,
        weatherCode: typeof rawDaily.weather_code?.[index] === 'number' ? rawDaily.weather_code[index] : null,
        weatherLabel: describeWeatherCode(rawDaily.weather_code?.[index]),
        sunrise: formatLocalTime(rawDaily.sunrise?.[index]),
        sunset: formatLocalTime(rawDaily.sunset?.[index]),
      }))
    : [];

  return {
    ok: true,
    locationName: location.name,
    generatedAt: payload.generated_at ?? null,
    current,
    // Amanecer/atardecer de hoy, si el proveedor los trajo — atajo directo al primer día del
    // pronóstico para no obligar al widget a indexar `forecast[0]` por su cuenta.
    sunrise: forecast[0]?.sunrise ?? null,
    sunset: forecast[0]?.sunset ?? null,
    forecast,
    todayReadings: buildTodayReadings(current),
    alerts: buildForecastAlerts(forecast),
  };
}
