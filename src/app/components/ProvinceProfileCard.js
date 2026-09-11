'use client';

import { useEffect, useState } from 'react';
import {
  getProvinceProfile,
  getArgentinaProfile,
  ENTRY_FOCUS,
  MARCO_EDITORIAL_HIDDEN_BLOCKS,
} from '../lib/geo/provinceProfile';
import { ARGENTINA_PROVINCES, ARGENTINA_MAP_VIEWBOX } from '../lib/geo/argentinaProvinces';
import { sourceById } from '../lib/editorial/sources';
import ProvinceContextPanel from './ProvinceContextPanel';

// Misma clave que ya usan `GeoSelector`/`ProvinceContextPanel` desde la Fase 47.1/47.2 — no se
// crea ningún estado ni clave de `localStorage` nueva (regla explícita del Loop 3C).
const PROVINCE_STORAGE_KEY = 'atlas:selectedProvince';

function available(points) {
  return (points ?? []).filter((point) => point.availability === 'AVAILABLE');
}

// Mapa: recorte del mismo SVG nacional ya existente (`ARGENTINA_PROVINCES`, IGN/georef-ar-api,
// Fase 8A) — nunca un asset nuevo, nunca un color por temperatura/precipitación
// (`50_FICHA_PROVINCIAL_ATLAS.md` §10).
function ProfileMap({ provinceId, label }) {
  const provinceGeometry = provinceId ? ARGENTINA_PROVINCES.find((item) => item.id === provinceId) : null;

  if (provinceId && !provinceGeometry) return null;

  if (provinceGeometry) {
    const [minX, minY, maxX, maxY] = provinceGeometry.bbox;
    const padding = Math.max(maxX - minX, maxY - minY) * 0.08;
    const viewBox = `${minX - padding} ${minY - padding} ${maxX - minX + padding * 2} ${maxY - minY + padding * 2}`;
    return (
      <svg
        className="province-profile-map"
        viewBox={viewBox}
        role="img"
        aria-label={`Mapa de ${label}`}
      >
        <path className="province-profile-map-shape" d={provinceGeometry.d} />
      </svg>
    );
  }

  // Sin provincia: contorno nacional completo, ninguna resaltada (Fase 8, sin selección).
  return (
    <svg
      className="province-profile-map province-profile-map-national"
      viewBox={ARGENTINA_MAP_VIEWBOX}
      role="img"
      aria-label="Mapa de la República Argentina, sin ninguna provincia seleccionada"
    >
      {ARGENTINA_PROVINCES.map((item) => (
        <path key={item.id} className="province-profile-map-shape" d={item.d} />
      ))}
    </svg>
  );
}

function DataPointList({ points }) {
  return (
    <ul className="province-profile-datapoints">
      {points.map((point) => (
        <li className="province-profile-datapoint" key={point.key}>
          {point.value !== null && (
            <span className="province-profile-datapoint-value">
              {point.value > 0 && point.unit === '% de cambio' ? '+' : ''}
              {point.value}
              {point.unit ? ` ${point.unit}` : ''}
            </span>
          )}
          {point.period && <span className="province-profile-datapoint-period"> ({point.period})</span>}
          {point.notes && <p className="province-profile-datapoint-notes">{point.notes}</p>}
        </li>
      ))}
    </ul>
  );
}

// Referencia fenológica: nunca se presenta como un dato directo de Cannabis sativa — siempre
// rotulada, siempre con la aclaración de qué NO permite concluir (Loop 3C, regla fundamental).
function PhenologicalReferenceCard({ point }) {
  return (
    <div className="province-profile-phenology-card">
      <span className="province-profile-phenology-badge">Referencia fenológica</span>
      <p>{point.notes}</p>
      <p>
        <strong>Especie de referencia:</strong> {point.referenceSpecies}. {point.referenceReason}
      </p>
      <p>
        <strong>Respuesta fotoperiódica:</strong> {point.photoperiodResponse}
      </p>
      <p className="province-profile-phenology-region">{point.referenceRegion}</p>
      <p className="atlas-section-note province-profile-phenology-limitation">{point.limitation}</p>
    </div>
  );
}

function CultivationBlock({ title, directPoint, referencePoint }) {
  return (
    <div className="province-profile-cultivation-block">
      <h4>{title}</h4>
      {directPoint && (
        <p className="atlas-section-note">
          Todavía no hay evidencia directa (provincial o argentina específica) sobre esto para
          Cannabis sativa.
        </p>
      )}
      {referencePoint && <PhenologicalReferenceCard point={referencePoint} />}
    </div>
  );
}

function SourcesBlock({ sourceIds }) {
  const uniqueIds = Array.from(new Set(sourceIds));
  const sources = uniqueIds.map((id) => sourceById(id)).filter(Boolean);
  if (sources.length === 0) return null;

  return (
    <details className="province-profile-block" open>
      <summary>Fuentes de esta ficha</summary>
      <ul className="province-profile-sources-list">
        {sources.map((source) => (
          <li key={source.id}>
            {source.url ? (
              <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
            ) : (
              <span>{source.title}</span>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function ProvinceProfileCard({ entryId }) {
  // `null` = todavía no se hidrató desde localStorage; `''` = hidratado, sin provincia elegida.
  const [provinceId, setProvinceId] = useState(null);

  useEffect(() => {
    try {
      setProvinceId(window.localStorage.getItem(PROVINCE_STORAGE_KEY) || '');
    } catch {
      setProvinceId('');
    }
  }, []);

  if (provinceId === null) return null;

  const focusBlocks = new Set(ENTRY_FOCUS[entryId] ?? []);
  const hiddenBlocks = new Set(entryId === 'marco-editorial' ? MARCO_EDITORIAL_HIDDEN_BLOCKS : []);
  const blockClass = (name) => `province-profile-block${focusBlocks.has(name) ? ' province-profile-block-focus' : ''}`;

  if (!provinceId) {
    // Sin provincia elegida: ficha nacional mínima + invitación — nunca una provincia inventada,
    // nunca 8 bloques vacíos (`50_FICHA_PROVINCIAL_ATLAS.md` §8).
    const argentina = getArgentinaProfile();
    return (
      <div className="province-profile-card">
        <div className="province-profile-identity">
          <span className="province-profile-kicker">Ubicación</span>
          <h3>{argentina.identity.visibleName}</h3>
        </div>
        <ProfileMap provinceId={null} label="Argentina" />
        <p className="atlas-section-note">
          Elegí tu provincia en{' '}
          <a href="/">Inicio</a> para ver el contexto geográfico y ambiental de tu zona.
        </p>
        <ProvinceContextPanel entryId={entryId} />
      </div>
    );
  }

  const profile = getProvinceProfile(provinceId);
  if (!profile) return null;

  const environmentPoints = hiddenBlocks.has('environment') ? [] : available(profile.environment);
  const lightPoints = hiddenBlocks.has('light') ? [] : available(profile.light);
  const cultivoDirect = profile.cultivation.find((p) => p.key === 'cultivo_ventana_directa');
  const cultivoRef = profile.cultivation.find((p) => p.key === 'cultivo_referencia_fenologica' && p.availability === 'AVAILABLE');
  const cosechaDirect = profile.cultivation.find((p) => p.key === 'cosecha_ventana_directa');
  const cosechaRef = profile.cultivation.find((p) => p.key === 'cosecha_referencia_fenologica' && p.availability === 'AVAILABLE');
  const showCultivation = !hiddenBlocks.has('cultivation');

  const allSourceIds = [
    profile.identity.sourceId,
    ...environmentPoints.map((p) => p.sourceId),
    ...lightPoints.map((p) => p.sourceId),
    ...(showCultivation ? [cultivoRef?.sourceId, cosechaRef?.sourceId, ...(cultivoRef?.referenceSourceId ?? []), ...(cosechaRef?.referenceSourceId ?? [])] : []),
  ].filter(Boolean);

  return (
    <div className="province-profile-card">
      <div className="province-profile-identity">
        <span className="province-profile-kicker">Ubicación</span>
        <h3>{profile.identity.visibleName}</h3>
        <p className="province-profile-identity-meta">
          Capital: {profile.identity.capital}
          {profile.geography.regionLabel ? ` · ${profile.geography.regionLabel}` : ''}
        </p>
      </div>

      <ProfileMap provinceId={provinceId} label={profile.identity.visibleName} />

      <details className={blockClass('geography')} open>
        <summary>Geografía</summary>
        <p>
          Latitud aproximada: {Math.abs(profile.geography.latitude).toFixed(1)}° sur (centroide
          geométrico de la provincia — no tu ubicación exacta).
        </p>
      </details>

      {environmentPoints.length > 0 && (
        <details className={blockClass('environment')} open>
          <summary>Ambiente</summary>
          <DataPointList points={environmentPoints} />
        </details>
      )}

      {lightPoints.length > 0 && (
        <details className={blockClass('light')} open>
          <summary>Luz</summary>
          <p className="atlas-section-note">Cálculo astronómico a partir de la latitud — no una medición ni un pronóstico.</p>
          <DataPointList points={lightPoints} />
        </details>
      )}

      {showCultivation && (
        <>
          <details className={blockClass('cultivation')} open>
            <summary>Cultivo</summary>
            <CultivationBlock title="Transición vegetativo → reproductivo" directPoint={cultivoDirect} referencePoint={cultivoRef} />
          </details>
          <details className={blockClass('cultivation')} open>
            <summary>Cosecha</summary>
            <CultivationBlock title="Ventana de maduración/cosecha" directPoint={cosechaDirect} referencePoint={cosechaRef} />
          </details>
        </>
      )}

      <div className={blockClass('context')}>
        <ProvinceContextPanel entryId={entryId} />
      </div>

      <SourcesBlock sourceIds={allSourceIds} />
    </div>
  );
}
