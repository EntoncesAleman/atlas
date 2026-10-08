'use client';

import useAtlasLocation from '../lib/hooks/useAtlasLocation';
import { getEntryProvinceContext } from '../lib/editorial/provinceContext';

export default function ProvinceContextPanel({ entryId }) {
  const { provinceId, hydrated } = useAtlasLocation();
  if (!hydrated) return null;

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
