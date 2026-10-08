'use client';

import Link from 'next/link';
import useAtlasLocation, { selectAtlasLocation } from '../lib/hooks/useAtlasLocation';
import { getProvinceProfile } from '../lib/geo/provinceProfile';

// Clearing keeps the current route and resets the shared provincial context.
export default function ProvinceStatusBar() {
  const { provinceId, hydrated } = useAtlasLocation();
  if (!hydrated) return null;

  if (!provinceId) return null;

  const profile = getProvinceProfile(provinceId);
  const label = profile?.identity.visibleName ?? provinceId;

  function clearProvince() {
    selectAtlasLocation('');
    window.location.reload();
  }

  return (
    <div className="atlas-province-status">
      <span className="atlas-province-status-label">Viendo · {label}</span>
      <Link href="/#elegir-provincia">Cambiar provincia</Link>
      <button type="button" className="atlas-province-status-clear" onClick={clearProvince}>
        Quitar provincia · Ver Atlas nacional
      </button>
    </div>
  );
}
