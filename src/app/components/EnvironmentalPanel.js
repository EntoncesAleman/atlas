'use client';

// Widget de clima del Atlas (LOOP — WIDGET CLIMA DEL ATLAS).
//
// Este componente ya existía como una tarjeta puramente decorativa ("Panel Ambiental", sin datos
// reales, nunca montada en ninguna página) desde antes de que existiera `/api/climate` — se
// adapta acá en vez de crear un componente nuevo, tal como pide la consigna. Reutiliza
// `fetchProvinceWeather` (misma capa que ya usa Mi Cultivo, Fase 11) — cero lógica de fetch
// duplicada, mismo proxy server-side (`/api/climate`), misma clave de contexto geográfico
// (`atlas:selectedProvince`) que ya escriben `GeoSelector`/`ProvinceStatusBar`.
//
// Sincronización de provincia: se lee una sola vez al montar, igual que
// `ProvinceStatusBar`/`ProvinceContextPanel` — ese mismo componente ya resuelve un cambio de
// provincia con un `window.location.reload()` explícito (ver su comentario: "sin depender de un
// mecanismo de sincronización entre componentes nuevo"), así que este panel no necesita — ni
// debe — inventar uno propio.
//
// Principio "informa, no interpreta": este componente solo presenta valores meteorológicos reales
// con su unidad y etiqueta. No arma ninguna frase de recomendación de cultivo — eso es contenido
// editorial aparte, documentado y con fuente, no una inferencia automática de un dato del clima.

import { useEffect, useState } from 'react';
import { fetchProvinceWeather } from '../lib/weather/service';

const PROVINCE_STORAGE_KEY = 'atlas:selectedProvince';

function readStoredProvince() {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(PROVINCE_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function Stat({ label, value, unit }) {
  if (value === null || value === undefined) return null;
  return (
    <div className="environmental-stat">
      <span className="environmental-stat-label">{label}</span>
      <span className="environmental-stat-value">
        {value}
        {unit ? <span className="environmental-stat-unit">{unit}</span> : null}
      </span>
    </div>
  );
}

function Skeleton() {
  return (
    <div aria-hidden="true">
      <div className="atlas-skeleton-line" style={{ width: '40%' }} />
      <div className="environmental-current">
        {[0, 1, 2, 3].map((index) => (
          <div className="atlas-skeleton-block" style={{ height: 64 }} key={index} />
        ))}
      </div>
    </div>
  );
}

export default function EnvironmentalPanel() {
  // `null` = todavía no se hidrató desde localStorage (evita un salto visual al montar).
  const [provinceId, setProvinceId] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const [result, setResult] = useState(null);

  useEffect(() => {
    setProvinceId(readStoredProvince());
  }, []);

  useEffect(() => {
    if (!provinceId) {
      setStatus('idle');
      setResult(null);
      return;
    }
    let cancelled = false;
    setStatus('loading');
    fetchProvinceWeather(provinceId).then((weather) => {
      if (cancelled) return;
      setResult(weather);
      setStatus(weather.ok ? 'ready' : 'error');
    });
    return () => {
      cancelled = true;
    };
  }, [provinceId]);

  function retry() {
    if (!provinceId) return;
    setStatus('loading');
    fetchProvinceWeather(provinceId).then((weather) => {
      setResult(weather);
      setStatus(weather.ok ? 'ready' : 'error');
    });
  }

  // Pre-hidratación: mismo esqueleto que el estado de carga, para no mostrar el estado "sin
  // provincia" antes de tiempo si en realidad sí hay una guardada (evita el salto visual).
  if (provinceId === null) {
    return (
      <section className="environmental-panel" aria-label="Clima de tu zona">
        <div className="environmental-panel-head">
          <span className="panel-kicker">Clima</span>
        </div>
        <Skeleton />
      </section>
    );
  }

  return (
    <section className="environmental-panel" aria-label="Clima de tu zona" aria-busy={status === 'loading'}>
      <div className="environmental-panel-head">
        <span className="panel-kicker">Clima</span>
        <span className="panel-status">{provinceId ? (result?.locationName ?? provinceId) : 'Argentina'}</span>
      </div>

      {!provinceId && (
        <div className="environmental-message">
          <p>Elegí tu provincia en Inicio para ver el clima de tu zona.</p>
          <p className="environmental-note">
            Solo a nivel provincia — nunca tu ubicación exacta ni GPS. No se elige automáticamente.
          </p>
        </div>
      )}

      {provinceId && status === 'loading' && (
        <div role="status" aria-live="polite">
          <span className="sr-only">Cargando clima de {provinceId}…</span>
          <Skeleton />
        </div>
      )}

      {provinceId && status === 'error' && (
        <div className="environmental-message" role="alert">
          <p>No pudimos obtener el clima en este momento.</p>
          <button type="button" className="secondary-button environmental-retry" onClick={retry}>
            Reintentar
          </button>
        </div>
      )}

      {provinceId && status === 'ready' && result?.ok && (
        <div className="environmental-body">
          {result.current.weatherLabel && (
            <p className="environmental-condition">{result.current.weatherLabel}</p>
          )}

          <div className="environmental-current">
            <Stat label="Temperatura" value={result.current.temperature !== null ? Math.round(result.current.temperature) : null} unit="°C" />
            <Stat
              label="Sensación térmica"
              value={result.current.apparentTemperature !== null ? Math.round(result.current.apparentTemperature) : null}
              unit="°C"
            />
            <Stat label="Humedad" value={result.current.humidity !== null ? Math.round(result.current.humidity) : null} unit="%" />
            <Stat label="Viento" value={result.current.windSpeed !== null ? Math.round(result.current.windSpeed) : null} unit=" km/h" />
            <Stat label="Lluvia" value={result.current.precipitation !== null ? result.current.precipitation : null} unit=" mm" />
            {result.sunrise && <Stat label="Amanecer" value={result.sunrise} />}
            {result.sunset && <Stat label="Atardecer" value={result.sunset} />}
          </div>

          {result.forecast?.length > 0 && (
            <div className="environmental-forecast">
              <span className="environmental-subheading">Próximos días</span>
              <ol>
                {result.forecast.map((day) => (
                  <li key={day.date}>
                    <span className="environmental-forecast-date">{day.date.slice(5).replace('-', '/')}</span>
                    {day.weatherLabel && <span className="environmental-forecast-condition">{day.weatherLabel}</span>}
                    <span className="environmental-forecast-temps">
                      {day.tempMax !== null ? `${Math.round(day.tempMax)}°` : '—'}
                      {' / '}
                      {day.tempMin !== null ? `${Math.round(day.tempMin)}°` : '—'}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {result.alerts?.length > 0 && (
            <div className="environmental-alerts">
              <ul>
                {result.alerts.map((alert) => (
                  <li key={alert.id}>
                    <strong>{alert.label}.</strong> {alert.detail}
                  </li>
                ))}
              </ul>
              <p className="environmental-note">
                Lecturas calculadas localmente a partir del pronóstico — no reemplazan avisos oficiales.
                Para alertas oficiales, consultá el{' '}
                <a href="https://www.smn.gob.ar/" target="_blank" rel="noopener noreferrer">Servicio Meteorológico Nacional</a>.
              </p>
            </div>
          )}

          <p className="environmental-source">
            Fuente: Open-Meteo{result.generatedAt ? ` — datos generados ${new Date(result.generatedAt).toLocaleString('es-AR')}` : ''}.
          </p>
        </div>
      )}
    </section>
  );
}
