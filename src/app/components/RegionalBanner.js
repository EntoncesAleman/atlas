'use client';
import useAtlasLocation from '../lib/hooks/useAtlasLocation';
import { getRegionalIdentity } from '../lib/geo/regionalIdentity';

export default function RegionalBanner({ children, home = false }) {
  const { provinceId, zone } = useAtlasLocation();
  const region = getRegionalIdentity(provinceId);
  return <section className={home ? 'field-banner' : 'ch regional-context-header'} data-region={region?.id || 'argentina'} style={region ? { '--field-banner-image': `url("${region.banner}")` } : undefined}>
    {home ? <>
      <span className="club-eyebrow">Atlas del Cultivo Argentino · {region?.name || 'Argentina'}</span>
      <h1>Cultivar es conocer<br />el territorio.</h1>
      <p>{region ? `${region.title}. Un recorrido desde ${region.province.name}${zone ? ` · ${zone}` : ''}.` : 'Geografía, clima y saberes para acompañar lo que crece.'}</p>
      <a className="field-banner-link" href="#elegir-provincia">Explorá tu región <span aria-hidden="true">↗</span></a>
    </> : children}
  </section>;
}
