'use client';

import { useEffect, useState } from 'react';
import { getProvinceProfile } from '../lib/geo/provinceProfile';

// Mismas claves que ya escriben/leen `GeoSelector.js`, `ProvinceContextPanel.js` y
// `ProvinceProfileCard.js` — no se crea ningún estado ni convención nueva.
const PROVINCE_STORAGE_KEY = 'atlas:selectedProvince';
const ZONE_STORAGE_KEY = 'atlas:selectedZone';

// Única acción de "Quitar provincia" del Atlas (Loop de corrección de contexto provincial):
// borra ambas claves y fuerza una recarga a `/atlas` para que todo componente que lee
// localStorage en su propio mount (ProvinceProfileCard, ProvinceContextPanel) vuelva a
// hidratar limpio, sin depender de un mecanismo de sincronización entre componentes nuevo.
export default function ProvinceStatusBar() {
  // `null` = todavía no se hidrató desde localStorage; `''` = hidratado, sin provincia.
  const [provinceId, setProvinceId] = useState(null);

  useEffect(() => {
    try {
      setProvinceId(window.localStorage.getItem(PROVINCE_STORAGE_KEY) || '');
    } catch {
      setProvinceId('');
    }
  }, []);

  if (!provinceId) return null;

  const profile = getProvinceProfile(provinceId);
  const label = profile?.identity.visibleName ?? provinceId;

  function clearProvince() {
    try {
      window.localStorage.removeItem(PROVINCE_STORAGE_KEY);
      window.localStorage.removeItem(ZONE_STORAGE_KEY);
    } catch {
      // localStorage no disponible — nada que limpiar.
    }
    window.location.href = '/atlas';
  }

  return (
    <div className="atlas-province-status">
      <span className="atlas-province-status-label">Viendo · {label}</span>
      <button type="button" className="atlas-province-status-clear" onClick={clearProvince}>
        Quitar provincia · Ver Atlas nacional
      </button>
    </div>
  );
}
