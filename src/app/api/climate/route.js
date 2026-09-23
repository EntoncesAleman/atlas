import { NextResponse } from 'next/server';

const DEFAULT_LAT = -34.6037;
const DEFAULT_LON = -58.3816;
const DEFAULT_REGION = 'caba';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get('lat') ?? DEFAULT_LAT);
  const lon = Number(searchParams.get('lon') ?? DEFAULT_LON);
  const region = searchParams.get('region') ?? DEFAULT_REGION;

  const providerUrl = new URL('https://api.open-meteo.com/v1/forecast');
  providerUrl.searchParams.set('latitude', String(lat));
  providerUrl.searchParams.set('longitude', String(lon));
  // Cierre del widget de clima (LOOP — WIDGET CLIMA DEL ATLAS): se amplió `current`/`daily` con
  // apparent_temperature, weather_code y sunrise/sunset — ampliación aditiva y compatible: los
  // campos ya existentes no cambian de nombre ni de forma, `fetchProvinceWeather` (consumidor
  // actual, usado por Mi Cultivo) sigue leyendo exactamente los mismos campos que antes.
  providerUrl.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,apparent_temperature,weather_code'
  );
  providerUrl.searchParams.set(
    'daily',
    'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,sunrise,sunset'
  );
  // 7 días (antes 3): el mini-calendario de "Diario y bitácora" muestra un ícono de clima por
  // día para hoy y los próximos — mismo contrato de datos, Open-Meteo ya lo da gratis en su tier
  // no comercial (hasta 16 días). `fetchProvinceWeather` no cambia de forma, solo recibe más
  // elementos en `daily.*`.
  providerUrl.searchParams.set('forecast_days', '7');
  providerUrl.searchParams.set('timezone', 'auto');

  try {
    const upstream = await fetch(providerUrl, {
      headers: {
        accept: 'application/json',
      },
      cache: 'force-cache',
    });

    if (!upstream.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: 'climate_provider_unavailable',
          region,
          cache: 'miss',
          source: 'open-meteo',
        },
        { status: 502 }
      );
    }

    const payload = await upstream.json();
    const publicPayload = {
      ok: true,
      region,
      cache: 'regional-hit',
      source: 'open-meteo',
      generated_at: new Date().toISOString(),
      coordinates: {
        latitude: lat,
        longitude: lon,
      },
      current: payload.current,
      daily: payload.daily,
      metadata: {
        provider_terms: 'Open-Meteo no-commercial free tier',
        proxy_policy: 'server-side proxy with regional cache contract',
      },
    };

    return NextResponse.json(publicPayload, {
      headers: {
        'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    // Cierre de P3-3 (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md): antes se devolvía
    // `error.message` crudo al cliente. Se registra en el log del servidor para diagnóstico y se
    // responde con un código de error estable, sin exponer el detalle interno.
    console.error('climate_provider_exception', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'climate_provider_exception',
        region,
        cache: 'miss',
        source: 'open-meteo',
      },
      { status: 500 }
    );
  }
}
