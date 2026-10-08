'use client';
import Link from 'next/link';
import useAtlasLocation from '../lib/hooks/useAtlasLocation';
import { getProvinceGeoContext } from '../lib/geo/provinceContext';
export default function RegionalIntro({ readings }) {
  const { provinceId } = useAtlasLocation();
  const province = getProvinceGeoContext(provinceId);
  return <section className="regional-intro">
    <div><span className="club-eyebrow">{province ? 'Tu contexto regional' : 'Empezá por tu región'}</span><h2>{province ? `Explorá ${province.name}` : 'El Atlas, desde donde estás'}</h2><p>{province ? `${province.name} pertenece a ${province.regionLabel}. Consultá el contexto ambiental y estas lecturas para entender las diferencias entre regiones.` : 'Elegí una provincia para sumar contexto geográfico a la lectura. También podés recorrer todo el Atlas sin seleccionar ubicación.'}</p><Link href="/#elegir-provincia">{province ? 'Cambiar provincia' : 'Elegir provincia'} →</Link></div>
    <div><h3>Lecturas para entender el territorio</h3><ul>{readings.map(entry => <li key={entry.id}><Link href={entry.url}>{entry.title} →</Link></li>)}</ul><p className="atlas-section-note">Son lecturas generales sobre Argentina. El clima operativo usa un punto de referencia provincial.</p></div>
  </section>;
}
