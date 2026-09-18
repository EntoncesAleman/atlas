'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ARGENTINA_PROVINCES,
  ARGENTINA_MAP_VIEWBOX,
  ARGENTINA_MAP_WIDTH,
  ARGENTINA_MAP_HEIGHT,
} from '../lib/geo/argentinaProvinces';

// Mismas claves de `localStorage` ya usadas por `EnvironmentalPanel.js` (ver
// también `lib/miCultivo/storage.js`) — no se inventa una convención nueva.
// Guardar acá la provincia elegida es lo que la hace "usable como contexto"
// en vez de un estado puramente decorativo que se pierde al cambiar de
// página (Patch 47.1): ningún dato de ubicación más preciso que provincia se
// guarda nunca, coherente con `10_PRIVACY.md`.
const PROVINCE_STORAGE_KEY = 'atlas:selectedProvince';
const ZONE_STORAGE_KEY = 'atlas:selectedZone';

function readStoredLocation() {
  if (typeof window === 'undefined') return { province: '', zone: '' };
  try {
    return {
      province: window.localStorage.getItem(PROVINCE_STORAGE_KEY) || '',
      zone: window.localStorage.getItem(ZONE_STORAGE_KEY) || '',
    };
  } catch {
    return { province: '', zone: '' };
  }
}

const provinceData = [
  { id: 'buenos-aires', name: 'Buenos Aires' },
  { id: 'caba', name: 'CABA' },
  { id: 'catamarca', name: 'Catamarca' },
  { id: 'chaco', name: 'Chaco' },
  { id: 'chubut', name: 'Chubut' },
  { id: 'cordoba', name: 'Córdoba' },
  { id: 'corrientes', name: 'Corrientes' },
  { id: 'entrerios', name: 'Entre Ríos' },
  { id: 'formosa', name: 'Formosa' },
  { id: 'jujuy', name: 'Jujuy' },
  { id: 'lapampa', name: 'La Pampa' },
  { id: 'larioja', name: 'La Rioja' },
  { id: 'mendoza', name: 'Mendoza' },
  { id: 'misiones', name: 'Misiones' },
  { id: 'neuquen', name: 'Neuquén' },
  { id: 'rionegro', name: 'Río Negro' },
  { id: 'salta', name: 'Salta' },
  { id: 'sanjuan', name: 'San Juan' },
  { id: 'sanluis', name: 'San Luis' },
  { id: 'santacruz', name: 'Santa Cruz' },
  { id: 'santafe', name: 'Santa Fe' },
  { id: 'santiagodelestero', name: 'Santiago del Estero' },
  { id: 'tucuman', name: 'Tucumán' },
  { id: 'tierradelfuego', name: 'Tierra del Fuego' }
];

const zoneExamples = {
  'buenos-aires': ['Costa Atlántica', 'Región Pampeana', 'Pampa Norte'],
  caba: ['Capital Federal'],
  cordoba: ['Sierras Centrales', 'Valle de Traslasierra', 'Pampeana'],
  mendoza: ['Valle de Uco', 'Oasis Norte', 'Alta Montaña'],
  salta: ['Valle Calchaquí', 'Yungas', 'Puna'],
  'santafe': ['Rosario', 'Llanuras', 'Rafaela'],
  'santiagodelestero': ['Llanura Central', 'Noroeste'],
  jujuy: ['Quebrada', 'Puna', 'Yungas'],
  'rionegro': ['Andes', 'Patagonia Norte'],
  'tierradelfuego': ['Isla Grande', 'Costa Sur']
};

const CABA_ID = 'caba';
const cabaGeometry = ARGENTINA_PROVINCES.find((item) => item.id === CABA_ID);

// Cierre de P1-5B (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md): a 375px de ancho, el <path>
// real de Tucumán mide ~13×17px y el de Misiones ~19×21px en pantalla — muy por debajo del
// mínimo táctil accesible. Mismo principio ya aplicado a CABA (radio 16 en unidades del
// viewBox): un círculo invisible más grande, centrado en el centroide real de la provincia,
// superpuesto sobre la geometría visible sin modificarla — solo amplía el área que responde al
// toque/clic.
// Bug Jujuy→Salta (verificación de P1-5B, MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md): a
// diferencia de Tucumán/Misiones (provincias chicas que necesitan un área de toque más grande en
// su propio centroide), Salta es grande pero muy irregular (un "gajo" largo hacia el este) — tanto
// su `centroid` guardado como el centroide geométrico real (área-ponderada) caen FUERA de su
// propio polígono y DENTRO del de Jujuy, así que un clic apuntado "al centro de Salta" terminaba
// seleccionando Jujuy. Se calculó por separado un punto interior seguro — el más alejado de
// cualquier borde ("pole of inaccessibility", la misma técnica que usan herramientas de mapas
// reales para ubicar una etiqueta) — verificado fuera de los polígonos de las 6 provincias
// vecinas de Salta. Se usa solo para el hitbox; la geometría visible no se tocó.
const HITBOX_CENTROID_OVERRIDES = {
  salta: [279.26, 80.25],
};

const SMALL_PROVINCE_HITBOX_IDS = ['tucuman', 'misiones', 'salta'];
const smallProvinceGeometries = SMALL_PROVINCE_HITBOX_IDS
  .map((id) => {
    const geometry = ARGENTINA_PROVINCES.find((item) => item.id === id);
    if (!geometry) return null;
    return { ...geometry, centroid: HITBOX_CENTROID_OVERRIDES[id] ?? geometry.centroid };
  })
  .filter(Boolean);

export default function GeoSelector() {
  const [province, setProvince] = useState('');
  const [zone, setZone] = useState('');
  const [hoveredProvince, setHoveredProvince] = useState('');
  const selectedProvince = provinceData.find((item) => item.id === province)?.name ?? 'Argentina';
  const zoneOptions = province ? zoneExamples[province] ?? ['Zona aproximada'] : [];

  // Hidrata la elección previa (si existe) al entrar — la selección deja de
  // ser efímera: "mostrando siempre un selector para cambiarla" (02_UX.md).
  useEffect(() => {
    const stored = readStoredLocation();
    if (stored.province) setProvince(stored.province);
    if (stored.zone) setZone(stored.zone);
  }, []);

  const selectProvince = (id) => {
    setProvince(id);
    setZone('');
  };

  function persistLocation() {
    if (typeof window === 'undefined') return;
    try {
      if (province) window.localStorage.setItem(PROVINCE_STORAGE_KEY, province);
      else window.localStorage.removeItem(PROVINCE_STORAGE_KEY);
      if (zone) window.localStorage.setItem(ZONE_STORAGE_KEY, zone);
      else window.localStorage.removeItem(ZONE_STORAGE_KEY);
    } catch {
      // localStorage no disponible (modo privado, cuota, etc.) — la
      // exploración del Atlas no debe depender de que esto funcione.
    }
  }

  // Quitar provincia desde la Home: a diferencia de `ProvinceStatusBar` (que recarga la página
  // porque vive en rutas ya montadas con datos derivados de la provincia), acá no hace falta
  // recargar nada — el mapa y el resumen ya son estado de React, así que limpiarlo alcanza para
  // que la Home vuelva a mostrarse sin selección, sin salir de la página.
  function clearLocation() {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(PROVINCE_STORAGE_KEY);
        window.localStorage.removeItem(ZONE_STORAGE_KEY);
      } catch {
        // localStorage no disponible — nada que limpiar.
      }
    }
    setProvince('');
    setZone('');
  }

  const provinceKeyHandler = (id) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectProvince(id);
    }
  };

  return (
    <section className="geo-picker" aria-label="Selector geográfico">
      <div className="geo-picker-head">
        <span className="panel-kicker">¿Dónde cultivás?</span>
        <span className="panel-status">Argentina</span>
      </div>
      <p className="geo-picker-lede">Elegí tu provincia para adaptar la información al contexto climático de tu zona.</p>

      <div className="geo-map-wrap">
        <div className="geo-map" aria-label="Mapa de Argentina">
          <svg
            className="argentina-map"
            viewBox={ARGENTINA_MAP_VIEWBOX}
            width={ARGENTINA_MAP_WIDTH}
            height={ARGENTINA_MAP_HEIGHT}
            role="img"
            aria-label="Mapa de la República Argentina — 23 provincias y Ciudad Autónoma de Buenos Aires"
          >
            <g className="map-provinces">
              {ARGENTINA_PROVINCES.map((item) => {
                const selected = province === item.id;
                const hovered = hoveredProvince === item.id;
                const className = [
                  'map-province',
                  selected ? 'selected' : '',
                  hovered ? 'hovered' : '',
                  item.id === CABA_ID ? 'map-province-caba' : '',
                ].filter(Boolean).join(' ');
                return (
                  <path
                    key={item.id}
                    className={className}
                    d={item.d}
                    tabIndex={0}
                    role="button"
                    aria-label={item.name}
                    aria-pressed={selected}
                    onClick={() => selectProvince(item.id)}
                    onKeyDown={provinceKeyHandler(item.id)}
                    onMouseEnter={() => setHoveredProvince(item.id)}
                    onMouseLeave={() => setHoveredProvince('')}
                    onFocus={() => setHoveredProvince(item.id)}
                    onBlur={() => setHoveredProvince('')}
                  />
                );
              })}
            </g>
            <g className="map-small-province-hitboxes">
              {smallProvinceGeometries.map((geometry) => (
                <circle
                  key={geometry.id}
                  className="map-small-province-hitbox"
                  cx={geometry.centroid[0]}
                  cy={geometry.centroid[1]}
                  r={52}
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => selectProvince(geometry.id)}
                  onMouseEnter={() => setHoveredProvince(geometry.id)}
                  onMouseLeave={() => setHoveredProvince('')}
                />
              ))}
            </g>
            {cabaGeometry && (
              <g className="map-caba-marker">
                <circle
                  className="map-caba-dot"
                  cx={cabaGeometry.centroid[0]}
                  cy={cabaGeometry.centroid[1]}
                  r={province === CABA_ID || hoveredProvince === CABA_ID ? 5 : 3.4}
                />
                <circle
                  className="map-caba-hitbox"
                  cx={cabaGeometry.centroid[0]}
                  cy={cabaGeometry.centroid[1]}
                  r={16}
                  tabIndex={0}
                  role="button"
                  aria-label="Ciudad Autónoma de Buenos Aires (CABA)"
                  aria-pressed={province === CABA_ID}
                  onClick={() => selectProvince(CABA_ID)}
                  onKeyDown={provinceKeyHandler(CABA_ID)}
                  onMouseEnter={() => setHoveredProvince(CABA_ID)}
                  onMouseLeave={() => setHoveredProvince('')}
                  onFocus={() => setHoveredProvince(CABA_ID)}
                  onBlur={() => setHoveredProvince('')}
                />
              </g>
            )}
          </svg>
        </div>
      </div>

      <div className="geo-form">
        <label className="geo-label" htmlFor="provinceSelect">
          <span className="geo-label-text">Provincia</span>
          <input
            id="provinceSelect"
            className="geo-input"
            list="province-options"
            placeholder="Buscar provincia"
            value={selectedProvince === 'Argentina' ? '' : selectedProvince}
            onChange={(event) => {
              const match = provinceData.find((item) => item.name.toLowerCase() === event.target.value.toLowerCase());
              const nextProvince = match ? match.id : '';
              setProvince(nextProvince);
              setZone('');
            }}
          />
          <datalist id="province-options">
            {provinceData.map((item) => (
              <option key={item.id} value={item.name} />
            ))}
          </datalist>
        </label>

        {province && (
          <div className="zone-list" aria-label="Zonas editoriales">
            <div className="zone-list-head">
              <span className="zone-list-title">Zonas de {selectedProvince}</span>
              <span className="zone-list-cta">Explorar</span>
            </div>
            <div className="zone-options">
              {zoneOptions.map((item) => (
                <button className="zone-option" type="button" key={item} onClick={() => setZone(item)}>{item}</button>
              ))}
            </div>
          </div>
        )}

        <div className="geo-selection-summary">
          <span className="summary-label">Ubicación</span>
          <span className="summary-value">
            {selectedProvince}
            {zone ? ` · ${zone}` : ''}
          </span>
        </div>

        <div className="geo-actions">
          <Link className="primary-button geo-submit" href="/atlas" onClick={persistLocation}>
            Explorar {selectedProvince}
          </Link>
          {province && (
            <button type="button" className="secondary-button geo-clear" onClick={clearLocation}>
              Quitar provincia
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
