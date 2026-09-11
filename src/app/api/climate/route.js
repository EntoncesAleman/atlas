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
  providerUrl.searchParams.set('current', 'temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m');
  providerUrl.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum');
  providerUrl.searchParams.set('forecast_days', '3');
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
    return NextResponse.json(
      {
        ok: false,
        error: 'climate_provider_exception',
        region,
        cache: 'miss',
        source: 'open-meteo',
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
