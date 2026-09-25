import Link from 'next/link';
import CategoryShowcase from '../components/CategoryShowcase';
import PartnersStrip from '../components/PartnersStrip';
import ProvinceStatusBar from '../components/ProvinceStatusBar';
import EnvironmentalPanel from '../components/EnvironmentalPanel';
import NewsWidget from '../components/NewsWidget';
import GlobalHeader from '../components/shell/GlobalHeader';
import ContextHeader from '../components/shell/ContextHeader';

export const metadata = {
  title: 'El Atlas — Atlas del Cultivo Argentino',
  description: 'Índice editorial del Atlas: una navegación por categorías para recorrer el cultivo como sistema geográfico, ambiental y cultural.'
};

export default function AtlasIndexPage() {
  return (
    <div className="club-shell">
      <GlobalHeader />
      <ContextHeader kicker="Índice editorial" title="El Atlas" />

      <main className="club-atlas-index club-enter">
        <p className="club-atlas-lede">
          Una navegación editorial para recorrer el cultivo como sistema geográfico, ambiental y
          cultural.
        </p>
        <ProvinceStatusBar />

        <section className="club-atlas-section">
          <EnvironmentalPanel />
        </section>

        <section className="club-atlas-section">
          <CategoryShowcase showHeading={false} />
        </section>

        <NewsWidget />

        <section className="club-atlas-section club-community-promo">
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
    </div>
  );
}
