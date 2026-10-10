import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import EnvironmentalPanel from './components/EnvironmentalPanel';
import NewsWidget from './components/NewsWidget';
import GeoSelector from './components/GeoSelector';
import RegionalBanner from './components/RegionalBanner';
import TerritorialContext from './components/TerritorialContext';
import ProvinceLandscapeGallery from './components/ProvinceLandscapeGallery';
import CultivoPreview from './components/CultivoPreview';
import SavedReadings from './components/SavedReadings';
import AtlasEditorialRail from './components/AtlasEditorialRail';
import HomeWelcome from './components/HomeWelcome';
import HomeExplorer from './components/HomeExplorer';
import { getEntries, getCategoryById } from './lib/editorial/registry';
import { publicMetadata } from './lib/site';

export const metadata = publicMetadata('/', 'Atlas del Cultivo Argentino', 'Explorá el cultivo desde la geografía, el clima y las condiciones de cada provincia argentina.');

export default function HomePage() {
  const entries = getEntries().map(entry => ({ id: entry.id, title: entry.title, url: `/atlas/${getCategoryById(entry.categoryId).slug}/${entry.slug}` }));
  return (
    <div className="club-shell">

      <main className="club-home club-enter home-with-rail">
        <RegionalBanner home />
        <HomeWelcome />
        <HomeExplorer atlas={<AtlasEditorialRail />} territory={<>
        <div className="field-section-title"><span>01 / El territorio</span><span>Argentina · Un recorrido federal</span></div>
        <section className="field-explore" aria-label="Explorar el territorio">
          <div className="field-map-panel"><h2>Tu lugar en el mapa</h2><p>Cada provincia, una forma de cultivar.</p><GeoSelector /></div>
        </section>
        </>} context={<>
        <div className="field-context"><TerritorialContext /><EnvironmentalPanel /></div>
        <ProvinceLandscapeGallery />
        <section className="home-start" aria-labelledby="home-start-title">
          <span className="club-eyebrow">Primer recorrido</span><h2 id="home-start-title">Empezá por acá</h2>
          <div className="home-start-grid">
            <a href="#elegir-provincia"><span>01 · Territorio</span><h3>Entender mi región</h3><p>Elegí provincia y explorá su contexto ambiental.</p></a>
            <Link href="/atlas/germinacion"><span>02 · Lecturas</span><h3>Aprender lo básico</h3><p>Empezá por la semilla y seguí el recorrido de la planta.</p></Link>
            <Link href="/mi-cultivo"><span>03 · Bitácora</span><h3>Registrar mi cultivo</h3><p>Conocé cómo llevar fechas, notas y fotos de tu temporada.</p></Link>
          </div>
        </section>
        <section className="field-readings" aria-labelledby="field-readings-title"><div className="field-section-title"><h2 id="field-readings-title">El libro de campo</h2><Link href="/atlas">Todas las lecturas ↗</Link></div><div className="field-reading-grid">{[
          { href: '/atlas/germinacion', image: 'category-germinacion-real.jpg', title: 'El comienzo de una planta', label: 'Germinación' },
          { href: '/atlas/suelo-y-agua', image: 'category-suelo-y-agua-garden-real.jpg', title: 'Lo que sostiene la vida', label: 'Suelo y agua' },
          { href: '/comunidad', image: 'category-material-de-lectura-real.jpg', title: 'Saberes que se comparten', label: 'Comunidad' },
        ].map(card => <Link key={card.href} className="field-reading-card" href={card.href}><Image src={`/atlas/categories/real/${card.image}`} alt="" width={600} height={400} sizes="(max-width: 767px) 90vw, 30vw" /><span className="club-eyebrow">{card.label}</span><h3>{card.title} <span aria-hidden="true">↗</span></h3></Link>)}</div></section>
        <Suspense fallback={<p role="status">Cargando noticias…</p>}><NewsWidget /></Suspense>
        <SavedReadings entries={entries} compact />
        <CultivoPreview />
        </>} />
      </main>

    </div>
  );
}
