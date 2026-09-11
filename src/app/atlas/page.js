import Link from 'next/link';
import CategoryShowcase from '../components/CategoryShowcase';

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
        </div>
      </section>

      <section className="atlas-section">
        <CategoryShowcase showHeading={false} />
      </section>
    </main>
  );
}
