'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useAtlasLocation, { selectAtlasLocation } from '../lib/hooks/useAtlasLocation';
import { PROVINCE_PHOTOS } from '../lib/geo/provincePhotos';
import { REGIONAL_IDENTITIES } from '../lib/geo/regionalIdentity';
import TerritoryMiniMap from './TerritoryMiniMap';

function ProvincePhoto({ photo, selected }) {
  const [imageStatus, setImageStatus] = useState('loading');
  return <article className={`province-landscape-card ${selected ? 'is-selected' : ''}`}>
    <div className="province-landscape-image" aria-busy={imageStatus === 'loading'}>
      {imageStatus !== 'error' ? <Image src={photo.image} alt={photo.alt} width={1000} height={650} sizes="(max-width: 600px) 90vw, (max-width: 1099px) 45vw, 25vw" onLoad={() => setImageStatus('ready')} onError={() => setImageStatus('error')} /> : <p role="status">La fotografía no está disponible.</p>}
      {imageStatus === 'loading' && <span className="sr-only" role="status">Cargando fotografía de {photo.name}…</span>}
      <TerritoryMiniMap provinceId={photo.provinceId} />
    </div>
    <div className="province-landscape-copy"><span className="club-eyebrow">{REGIONAL_IDENTITIES[photo.region].name}</span><h3>{photo.name}</h3><p>{photo.place}</p><button type="button" aria-pressed={selected} onClick={() => selectAtlasLocation(photo.provinceId)}>{selected ? 'Provincia seleccionada' : `Elegir ${photo.name}`} <span aria-hidden="true">↗</span></button><Link href="/atlas" onClick={() => selectAtlasLocation(photo.provinceId)}>Explorar el contexto</Link></div>
    <p className="province-photo-credit"><a href={photo.source}>{photo.author}</a> · <a href={photo.licenseUrl}>{photo.license}</a> · Encuadre adaptado</p>
  </article>;
}

export default function ProvinceLandscapeGallery() {
  const { provinceId } = useAtlasLocation();
  const [filter, setFilter] = useState('all');
  const photos = PROVINCE_PHOTOS.filter(photo => filter === 'all' || photo.region === filter);
  return <section className="province-landscapes" aria-labelledby="province-landscapes-title">
    <div className="field-section-title"><h2 id="province-landscapes-title">Paisajes de las provincias</h2><Link href="/atlas/regiones">El contexto regional ↗</Link></div>
    <p className="province-landscapes-lede">Cinco lugares para empezar a recorrer el país. Cada fotografía muestra un paisaje localizado dentro de su provincia.</p>
    <div className="province-landscape-filters" role="group" aria-label="Filtrar paisajes por región">{[{id:'all',name:'Todas'}, ...Object.entries(REGIONAL_IDENTITIES).map(([id, region]) => ({id,name:region.shortName}))].map(item => <button type="button" key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.name}</button>)}</div>
    <div className="province-landscape-grid">{photos.map(photo => <ProvincePhoto key={photo.provinceId} photo={photo} selected={photo.provinceId === provinceId} />)}</div>
  </section>;
}
