import Link from 'next/link';
import ContextHeader from '../../components/shell/ContextHeader';
import ProvinceContextLink from '../../components/ProvinceContextLink';
import { REGIONAL_IDENTITIES, TERRITORY_SOURCES } from '../../lib/geo/regionalIdentity';
import { ARGENTINA_PROVINCES } from '../../lib/geo/argentinaProvinces';
import { getProvinceGeoContext } from '../../lib/geo/provinceContext';
import { publicMetadata } from '../../lib/site';

export const metadata = publicMetadata('/atlas/regiones', 'Regiones y paisajes — Atlas del Cultivo Argentino', 'Paisajes regionales, ecorregiones y contexto climático para explorar las provincias argentinas con fuentes oficiales.');

export default function RegionsPage() {
  return <div className="club-shell">
    <ContextHeader kicker="Territorio · Ambiente" title="Regiones y paisajes" />
    <main className="club-atlas-index regional-landscape-index">
      <nav className="atlas-breadcrumb" aria-label="Ruta de navegación"><Link href="/">Inicio</Link><span aria-hidden="true"> / </span><Link href="/atlas">Atlas</Link><span aria-hidden="true"> / </span><span>Regiones</span></nav>
      <section className="regional-method"><h2>Ubicar el paisaje</h2><p>Una provincia puede reunir ambientes muy distintos. Los paisajes de este recorrido se organizan en cinco familias geográficas, mientras que las ecorregiones describen conjuntos de relieve, vegetación y condiciones naturales que atraviesan los límites provinciales.</p><p>La agrupación provincial sigue las regiones del INDEC, con CABA incorporada a la familia pampeana para navegar el Atlas. Cada banner es una interpretación artística de paisajes de la región.</p><p>Para leer el clima, el <a href={TERRITORY_SOURCES.smn.url}>Atlas del SMN</a> reúne normales del período 1991–2020. El pronóstico del Atlas del Cultivo muestra condiciones actuales para un punto provincial; elegir una zona añade contexto editorial sin cambiar ese punto.</p></section>
      <nav className="regional-index-links" aria-label="Ir a una región">{Object.entries(REGIONAL_IDENTITIES).map(([id, region]) => <a key={id} href={`#region-${id}`}>{region.name}</a>)}</nav>
      {Object.entries(REGIONAL_IDENTITIES).map(([id, region]) => <section key={id} id={`region-${id}`} className="regional-landscape-section">
        <header style={{backgroundImage:`linear-gradient(90deg,#172c23ec,#172c2355), url("${region.banner}")`}}><span className="club-eyebrow">{region.name}</span><h2>{region.title}</h2></header>
        <div className="regional-landscape-section-body"><p>{region.description}</p><p>{region.note}</p><h3>Provincias para explorar</h3><ul className="regional-province-links">{ARGENTINA_PROVINCES.filter(item => getProvinceGeoContext(item.id)?.region === id).map(item => <li key={item.id}><ProvinceContextLink provinceId={item.id}>{item.name} ↗</ProvinceContextLink></li>)}</ul><details><summary>Fuentes del paisaje</summary><ul>{region.sourceIds.map(sourceId => <li key={sourceId}><a href={TERRITORY_SOURCES[sourceId].url}>{TERRITORY_SOURCES[sourceId].title}</a></li>)}</ul></details></div>
      </section>)}
      <section className="regional-method"><h2>Fuentes y criterio territorial</h2><p>La cartografía provincial usa los polígonos del IGN distribuidos por GeoRef, con la proyección existente del proyecto. El mapa continental muestra las 23 provincias y CABA; Tierra del Fuego se representa con Isla Grande e Isla de los Estados. Su encuadre no incluye la Antártida ni los archipiélagos del Atlántico Sur.</p><ul>{['indec','smn'].map(id => <li key={id}><a href={TERRITORY_SOURCES[id].url}>{TERRITORY_SOURCES[id].title}</a></li>)}<li><a href="https://sib.gob.ar/ecorregiones">APN · Sistema de Información de Biodiversidad</a></li><li><a href="https://apis.datos.gob.ar/georef/api/provincias.geojson?campos=geometria">GeoRef · Geometrías provinciales, fuente IGN</a></li></ul></section>
    </main>
  </div>;
}
