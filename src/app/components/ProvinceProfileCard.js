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

// Tres tarjetas de evidencia, en el mismo orden de prioridad Cannabis-primero del modelo de datos
// (Loop 4.3 §7/§16): directa provincial (tier 1) > general de Cannabis (tier 3) > analogía con
// otra especie (tier 5, último recurso, siempre visualmente más discreta que las dos anteriores).

function DirectCannabisEvidenceCard({ point }) {
  return (
    <div className="province-profile-phenology-card province-profile-evidence-direct">
      <span className="province-profile-phenology-badge province-profile-badge-direct">Evidencia directa de esta provincia</span>
      <p><strong>{point.value}</strong> ({point.period})</p>
      <p>{point.photoperiodResponse}</p>
      <p className="province-profile-phenology-region">{point.referenceRegion}</p>
      <p className="atlas-section-note province-profile-phenology-limitation">{point.limitation}</p>
    </div>
  );
}

// Antecedente histórico (Loop 4.4.1): evidencia tier 1 real pero ya no vigente (ej. una empresa
// provincial disuelta) — nunca se presenta con el mismo badge en tiempo presente que la evidencia
// directa activa, para no sugerir que la actividad sigue en curso.
function HistoricalCannabisEvidenceCard({ point }) {
  return (
    <div className="province-profile-phenology-card province-profile-evidence-historical">
      <span className="province-profile-phenology-badge province-profile-badge-historical">Antecedente histórico (ya no vigente)</span>
      <p><strong>{point.value}</strong> ({point.period})</p>
      <p>{point.notes}</p>
      <p className="province-profile-phenology-region">{point.referenceRegion}</p>
      <p className="atlas-section-note province-profile-phenology-limitation">{point.limitation}</p>
    </div>
  );
}

function GeneralCannabisEvidenceCard({ point }) {
  return (
    <div className="province-profile-phenology-card province-profile-evidence-general">
      <span className="province-profile-phenology-badge province-profile-badge-general">Evidencia general de Cannabis</span>
      <p>{point.photoperiodResponse}</p>
      <p className="province-profile-phenology-region">{point.referenceRegion}</p>
      <p className="atlas-section-note province-profile-phenology-limitation">{point.limitation}</p>
    </div>
  );
}

// Referencia fenológica: nunca se presenta como un dato directo de Cannabis sativa — siempre
// rotulada, siempre con la aclaración de qué NO permite concluir (Loop 3C, regla fundamental).
// Loop 4.3 la reubica como último recurso (tier 5): solo aparece después de la evidencia directa
// (si existe) y de la evidencia general de Cannabis, nunca sola ni primero.
function PhenologicalReferenceCard({ point }) {
  return (
    <details className="province-profile-phenology-card province-profile-evidence-lastresort">
      <summary className="province-profile-phenology-badge province-profile-badge-lastresort">Analogía con otra especie (último recurso)</summary>
      <p>{point.notes}</p>
      <p>
        <strong>Especie de referencia:</strong> {point.referenceSpecies}. {point.referenceReason}
      </p>
      <p>
        <strong>Respuesta fotoperiódica:</strong> {point.photoperiodResponse}
      </p>
      <p className="province-profile-phenology-region">{point.referenceRegion}</p>
      <p className="atlas-section-note province-profile-phenology-limitation">{point.limitation}</p>
    </details>
  );
}

function CultivationBlock({ title, directPoint, directEvidencePoint, historicalEvidencePoint, generalEvidencePoint, referencePoint }) {
  return (
    <div className="province-profile-cultivation-block">
      <h4>{title}</h4>
      {directPoint && !directEvidencePoint && !historicalEvidencePoint && (
        <p className="atlas-section-note">
          Todavía no hay evidencia directa (provincial o argentina específica) sobre esto para
          Cannabis sativa.
        </p>
      )}
      {directEvidencePoint && <DirectCannabisEvidenceCard point={directEvidencePoint} />}
      {historicalEvidencePoint && <HistoricalCannabisEvidenceCard point={historicalEvidencePoint} />}
      {generalEvidencePoint && <GeneralCannabisEvidenceCard point={generalEvidencePoint} />}
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
  const todayLight = lightPoints.find((p) => p.season === 'hoy');
  const seasonalLight = lightPoints.filter((p) => p.season && p.season !== 'hoy');
  // Tier 1 (evidencia directa provincial) se busca por PREFIJO de key + tier, no por el nombre de
  // una provincia puntual — así una jurisdicción nueva con evidencia real (ej. Jujuy/Cannava) se
  // renderiza sin tocar este componente, y una evidencia ya no vigente (ej. Misiones, empresa
  // disuelta) se distingue explícitamente por su `availability: 'HISTORICAL'` (Loop 4.4.1).
  const cultivoDirect = profile.cultivation.find((p) => p.key === 'cultivo_ventana_directa');
  const cultivoDirectEvidence = profile.cultivation.find((p) => p.key.startsWith('cultivo_') && p.evidenceTier === 1 && p.availability === 'AVAILABLE');
  const cultivoHistoricalEvidence = profile.cultivation.find((p) => p.key.startsWith('cultivo_') && p.evidenceTier === 1 && p.availability === 'HISTORICAL');
  const cultivoGeneralEvidence = profile.cultivation.find((p) => p.key === 'cultivo_evidencia_general_cannabis' && p.availability === 'AVAILABLE');
  const cultivoRef = profile.cultivation.find((p) => p.key === 'cultivo_referencia_fenologica' && p.availability === 'AVAILABLE');
  const cosechaDirect = profile.cultivation.find((p) => p.key === 'cosecha_ventana_directa');
  const cosechaDirectEvidence = profile.cultivation.find((p) => p.key.startsWith('cosecha_') && p.evidenceTier === 1 && p.availability === 'AVAILABLE');
  const cosechaHistoricalEvidence = profile.cultivation.find((p) => p.key.startsWith('cosecha_') && p.evidenceTier === 1 && p.availability === 'HISTORICAL');
  const cosechaGeneralEvidence = profile.cultivation.find((p) => p.key === 'cosecha_evidencia_general_cannabis' && p.availability === 'AVAILABLE');
  const cosechaRef = profile.cultivation.find((p) => p.key === 'cosecha_referencia_fenologica' && p.availability === 'AVAILABLE');
  const showCultivation = !hiddenBlocks.has('cultivation');
  const altitude = profile.geography.altitude?.availability === 'AVAILABLE' ? profile.geography.altitude : null;

  const allSourceIds = [
    profile.identity.sourceId,
    altitude?.sourceId,
    ...environmentPoints.map((p) => p.sourceId),
    ...lightPoints.map((p) => p.sourceId),
    ...(showCultivation ? [
      cultivoDirectEvidence?.sourceId, cosechaDirectEvidence?.sourceId,
      cultivoHistoricalEvidence?.sourceId, cosechaHistoricalEvidence?.sourceId,
      cultivoGeneralEvidence?.sourceId, cosechaGeneralEvidence?.sourceId,
      cultivoRef?.sourceId, cosechaRef?.sourceId,
      ...(cultivoDirectEvidence?.referenceSourceId ?? []), ...(cosechaDirectEvidence?.referenceSourceId ?? []),
      ...(cultivoHistoricalEvidence?.referenceSourceId ?? []), ...(cosechaHistoricalEvidence?.referenceSourceId ?? []),
      ...(cultivoGeneralEvidence?.referenceSourceId ?? []), ...(cosechaGeneralEvidence?.referenceSourceId ?? []),
      ...(cultivoRef?.referenceSourceId ?? []), ...(cosechaRef?.referenceSourceId ?? []),
    ] : []),
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
        {altitude && (
          <p>
            Altitud de referencia: {altitude.value} {altitude.unit} ({altitude.methodology.includes('propia ciudad capital') ? 'estación de la capital' : 'estación más cercana a la capital'}).
            <span className="atlas-section-note province-profile-altitude-note"> {altitude.limitation}</span>
          </p>
        )}
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
          <p className="atlas-section-note">
            {todayLight?.limitation ?? 'Cálculo astronómico a partir de la latitud — no una medición ni un pronóstico.'}
          </p>
          {todayLight && (
            <div className="province-profile-light-today">
              <DataPointList points={[todayLight]} />
            </div>
          )}
          {seasonalLight.length > 0 && (
            <ul className="province-profile-seasonal-light">
              {seasonalLight.map((point) => (
                <li key={point.key} className="province-profile-seasonal-light-item">
                  <span className="province-profile-seasonal-light-label">{point.seasonLabel}</span>
                  <span className="province-profile-seasonal-light-value">{point.value} h</span>
                </li>
              ))}
            </ul>
          )}
        </details>
      )}

      {showCultivation && (
        <>
          <details className={blockClass('cultivation')} open>
            <summary>Cultivo</summary>
            <CultivationBlock
              title="Transición vegetativo → reproductivo"
              directPoint={cultivoDirect}
              directEvidencePoint={cultivoDirectEvidence}
              historicalEvidencePoint={cultivoHistoricalEvidence}
              generalEvidencePoint={cultivoGeneralEvidence}
              referencePoint={cultivoRef}
            />
          </details>
          <details className={blockClass('cultivation')} open>
            <summary>Cosecha</summary>
            <CultivationBlock
              title="Ventana de maduración/cosecha"
              directPoint={cosechaDirect}
              directEvidencePoint={cosechaDirectEvidence}
              historicalEvidencePoint={cosechaHistoricalEvidence}
              generalEvidencePoint={cosechaGeneralEvidence}
              referencePoint={cosechaRef}
            />
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
