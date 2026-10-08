'use client';
import { useEffect, useState } from 'react';
import { isKnownProvinceId } from '../geo/provinceContext';

export function readAtlasLocation() {
  try {
    const provinceId = localStorage.getItem('atlas:selectedProvince') || '';
    return isKnownProvinceId(provinceId)
      ? { provinceId, zone: localStorage.getItem('atlas:selectedZone') || '' }
      : { provinceId: '', zone: '' };
  } catch { return { provinceId: '', zone: '' }; }
}

export function selectAtlasLocation(provinceId, zone = '') {
  const location = { provinceId: isKnownProvinceId(provinceId) ? provinceId : '', zone };
  if (!location.provinceId) location.zone = '';
  try {
    for (const [key, value] of [['atlas:selectedProvince', location.provinceId], ['atlas:selectedZone', location.zone]]) {
      if (value) localStorage.setItem(key, value);
      else localStorage.removeItem(key);
    }
  } catch { /* Selection also works for the current page when storage is unavailable. */ }
  window.dispatchEvent(new CustomEvent('atlas:location-change', { detail: location }));
}

export default function useAtlasLocation() {
  const [location, setLocation] = useState({ provinceId: '', zone: '', hydrated: false });
  useEffect(() => {
    const sync = event => {
      const selected = event?.detail?.provinceId !== undefined ? event.detail : readAtlasLocation();
      setLocation({ ...selected, hydrated: true });
    };
    sync();
    window.addEventListener('atlas:location-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('atlas:location-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return location;
}
