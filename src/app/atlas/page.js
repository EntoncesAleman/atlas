import Link from 'next/link';
import CategoryShowcase from '../components/CategoryShowcase';
import PartnersStrip from '../components/PartnersStrip';
import ProvinceStatusBar from '../components/ProvinceStatusBar';
import EnvironmentalPanel from '../components/EnvironmentalPanel';
import NewsWidget from '../components/NewsWidget';

export const metadata = {
  title: 'El Atlas — Atlas del Cultivo Argentino',
  description: 'Índice editorial del Atlas: una navegación por categorías para recorrer el cultivo como sistema geográfico, ambiental y cultural.'
};

export default function AtlasIndexPage() {
  return (
    <main className="atlas-page atlas-index-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Atlas</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Índice editorial</span>
          <h1>El Atlas</h1>
          <p className="atlas-lede">Una navegación editorial para recorrer el cultivo como sistema geográfico, ambiental y cultural.</p>
          <ProvinceStatusBar />
        </div>
      </section>

      <section className="atlas-section atlas-weather-section">
        <EnvironmentalPanel />
      </section>

      <section className="atlas-section">
        <CategoryShowcase showHeading={false} />
      </section>

      <NewsWidget />

      <section className="atlas-section community-promo-section">
        <Link className="community-promo-card" href="/comunidad">
          <span className="atlas-related-type">Comunidad</span>
          <span className="community-promo-title">Clubes, agenda, formación y voces del territorio</span>
          <p className="community-promo-description">
            Una red de conocimiento aparte del contenido enciclopédico del Atlas: organizaciones,
            actividad regional y entrevistas de distintas provincias.
          </p>
          <span className="atlas-related-arrow">↗</span>
        </Link>
      </section>

      <PartnersStrip />
    </main>
  );
}
