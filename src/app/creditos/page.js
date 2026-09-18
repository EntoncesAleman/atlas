import Link from 'next/link';
import { attributableAssets } from '../lib/editorial/assets';

export const metadata = {
  title: 'Créditos — Atlas del Cultivo Argentino',
  description: 'Procedencia del material visual del Atlas que no es de producción interna: fuentes reales y verificadas, con su licencia y atribución.'
};

export default function CreditosPage() {
  const assets = attributableAssets();

  return (
    <main className="atlas-page creditos-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Créditos</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Procedencia visual</span>
          <h1>Créditos</h1>
          <p className="atlas-lede">Todo el material visual del Atlas que no es de producción interna proviene de fuentes reales y verificadas, con su licencia y atribución correspondiente.</p>
        </div>
      </section>

      <section className="atlas-section">
        <div className="credits-grid">
          {assets.map((asset) => (
            <article className="credit-card" key={asset.id}>
              <div className="credit-card-media">
                <img src={asset.file} alt={asset.alt} className="credit-card-image" />
              </div>
              <div className="credit-card-body">
                <span className="credit-license">{asset.license}</span>
                <p className="credit-credit">{asset.credit}</p>
                {asset.sourceUrl && (
                  <a className="credit-link" href={asset.sourceUrl} target="_blank" rel="noopener noreferrer">
                    Ver fuente original ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
