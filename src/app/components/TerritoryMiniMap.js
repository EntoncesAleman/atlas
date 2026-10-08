import { ARGENTINA_PROVINCES, ARGENTINA_MAP_VIEWBOX } from '../lib/geo/argentinaProvinces';
import { getProvinceGeoContext } from '../lib/geo/provinceContext';

export default function TerritoryMiniMap({ provinceId = '', regionId = '', className = '' }) {
  const caba = provinceId === 'caba' ? ARGENTINA_PROVINCES.find(item => item.id === 'caba') : null;
  return <svg className={`territory-mini-map ${className}`} viewBox={ARGENTINA_MAP_VIEWBOX} role="img" aria-label={provinceId ? `Ubicación de ${getProvinceGeoContext(provinceId)?.name || 'la provincia'} en Argentina` : 'Mapa de Argentina'}>
    {ARGENTINA_PROVINCES.map(item => <path key={item.id} d={item.d} className={provinceId === item.id ? 'mini-province-selected' : regionId && getProvinceGeoContext(item.id)?.region === regionId ? 'mini-region-selected' : ''} />)}
    {caba && <circle cx={caba.centroid[0]} cy={caba.centroid[1]} r={20} fill="#172c23" />}
  </svg>;
}
