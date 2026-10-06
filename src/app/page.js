import Link from 'next/link';
import GeoSelector from './components/GeoSelector';
import CultivoPreview from './components/CultivoPreview';
import SavedReadings from './components/SavedReadings';
import { getEntries, getCategoryById } from './lib/editorial/registry';
import { publicMetadata } from './lib/site';

export const metadata = publicMetadata('/', 'Atlas del Cultivo Argentino', 'Explorá el cultivo desde la geografía, el clima y las condiciones de cada provincia argentina.');

export default function HomePage() {
  const entries = getEntries().map(entry => ({ id: entry.id, title: entry.title, url: `/atlas/${getCategoryById(entry.categoryId).slug}/${entry.slug}` }));
  return (
    <div className="club-shell">

      <main className="club-home club-enter">
        <section className="club-hero">
          <div className="club-hero-copy">
            <span className="club-eyebrow">Atlas de cultivo · Argentina</span>
            <h1>
              El cultivo cambia
              <br />
              según dónde estés.
            </h1>
            <p className="club-hero-lede">
              Una guía pública para entender el cultivo a partir de la geografía, el contenido
              regional y el contexto ambiental de cada provincia argentina.
            </p>
            <div className="club-hero-actions">
              <a className="club-button" href="#elegir-provincia">Explorar mi provincia</a>
              <Link className="club-button club-button-outline" href="/atlas">Explorar el Atlas</Link>
            </div>
          </div>

          <div className="club-hero-map">
            <GeoSelector />
          </div>
        </section>
        <section className="home-start" aria-labelledby="home-start-title">
          <span className="club-eyebrow">Primer recorrido</span><h2 id="home-start-title">Empezá por acá</h2>
          <div className="home-start-grid">
            <a href="#elegir-provincia"><span>01 · Territorio</span><h3>Entender mi región</h3><p>Elegí provincia y explorá su contexto ambiental.</p></a>
            <Link href="/atlas/germinacion"><span>02 · Lecturas</span><h3>Aprender lo básico</h3><p>Empezá por la semilla y seguí el recorrido de la planta.</p></Link>
            <Link href="/mi-cultivo"><span>03 · Bitácora</span><h3>Registrar mi cultivo</h3><p>Conocé cómo llevar fechas, notas y fotos de tu temporada.</p></Link>
          </div>
        </section>
        <SavedReadings entries={entries} compact />
        <CultivoPreview />
      </main>

    </div>
  );
}
