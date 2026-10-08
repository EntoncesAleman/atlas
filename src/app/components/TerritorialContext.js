'use client';
import Image from 'next/image';
import Link from 'next/link';
import useAtlasLocation from '../lib/hooks/useAtlasLocation';
import { getRegionalIdentity, TERRITORY_SOURCES } from '../lib/geo/regionalIdentity';
import TerritoryMiniMap from './TerritoryMiniMap';

export default function TerritorialContext() {
  const { provinceId, zone } = useAtlasLocation();
  const region = getRegionalIdentity(provinceId);
  const sources = region ? [...region.sourceIds, 'smn'] : ['indec', 'smn'];
  return <section className="territorial-context" aria-labelledby="territorial-context-title">
    <div className="territorial-context-head"><span className="club-eyebrow">Cuaderno del territorio</span><span className="territorial-context-location">{region?.province.name || 'Argentina'}{zone ? ` · ${zone}` : ''}</span></div>
    <div className="territorial-context-body">
      <div className="territorial-specimens"><TerritoryMiniMap provinceId={provinceId} regionId={region?.id} /><Image src="/atlas/field/botanical-specimens.webp" alt="" width={480} height={720} sizes="140px" /><span>Geografía · Botánica</span></div>
      <div>{region && <span className="territorial-region-label">Panorama regional · {region.name}</span>}<h2 id="territorial-context-title">{region?.title || 'Un país, muchos ambientes'}</h2><p>{region?.description || 'Elegí una provincia para recorrer sus paisajes y ubicar las lecturas. El Atlas reúne cinco familias regionales; cada una contiene ambientes distintos.'}</p>{region && <ul className="territorial-environments" aria-label="Ambientes mencionados">{region.environments.map(item => <li key={item}>{item}</li>)}</ul>}</div>
    </div>
    <p className="territorial-context-note">{region?.note || 'Los banners representan paisajes regionales. El clima del momento se consulta en el panel meteorológico.'}</p>
    <Link className="territorial-read-link" href="/atlas/luz-y-clima">Leer sobre luz y clima ↗</Link>
    <details className="territorial-sources"><summary>Fuentes y alcance del contexto</summary><p>Las familias visuales siguen la agrupación geográfica del Atlas. Las ecorregiones pueden cruzar límites provinciales. El SMN describe el clima con normales del período 1991–2020; el pronóstico usa un punto de referencia provincial.</p><ul>{sources.map(id => <li key={id}><a href={TERRITORY_SOURCES[id].url}>{TERRITORY_SOURCES[id].title}</a></li>)}</ul><a href="/atlas/regiones">Conocer las regiones del Atlas ↗</a></details>
  </section>;
}
