'use client';

import { useEffect, useState } from 'react';
import { getEntryProvinceContext } from '../lib/editorial/provinceContext';

// Misma clave que ya escribe `GeoSelector.js` y ya lee `EnvironmentalPanel.js` — no se crea
// ningún estado ni ninguna clave de `localStorage` nueva (Fase 47.2, ver
// `MASTER_PACKAGE/47_2_PROVINCIAL_CONTEXT.md`).
const PROVINCE_STORAGE_KEY = 'atlas:selectedProvince';

export default function ProvinceContextPanel({ entryId }) {
  // `null` = todavía no se hidrató desde localStorage (evita mostrar un estado que después
  // "salta" al montar); `''` = hidratado, sin provincia elegida.
  const [provinceId, setProvinceId] = useState(null);

  useEffect(() => {
    try {
      setProvinceId(window.localStorage.getItem(PROVINCE_STORAGE_KEY) || '');
    } catch {
      setProvinceId('');
    }
  }, []);

  if (provinceId === null) return null;

  if (!provinceId) {
    return (
      <div className="atlas-entry-section atlas-province-context atlas-province-context-empty">
        <h2>Contexto de tu zona</h2>
        <p>Elegí tu provincia para contextualizar esta información.</p>
      </div>
    );
  }

  const context = getEntryProvinceContext(entryId, provinceId);
  if (!context) return null;

  return (
    <div className="atlas-entry-section atlas-province-context">
      <h2>Contexto de tu zona</h2>
      <span className="atlas-province-context-name">{context.provinceName}</span>
      {context.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
