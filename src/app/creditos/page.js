import { visualPresentation, visualLicenseUrl } from '../lib/editorial/visualPresentation';
import { publicMetadata } from '../lib/site';
import Link from 'next/link';
import { attributableAssets } from '../lib/editorial/assets';

export const metadata = publicMetadata('/creditos', 'Créditos — Atlas del Cultivo Argentino', 'Procedencia del material visual del Atlas: fuentes, licencias e ilustraciones originales identificadas.');

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
          <p className="atlas-lede">Las fotografías y figuras de fuentes externas incluyen su autor y licencia. Las ilustraciones originales generadas con IA se identifican como tales.</p>
        </div>
      </section>

      <section className="atlas-section">
        <div className="credits-grid">
          {assets.map((asset) => (
            <article className="credit-card" key={asset.id}>
              <div className="credit-card-media">
                <img src={asset.file} alt={asset.alt} className="credit-card-image" style={visualPresentation(asset)} loading="lazy" />
              </div>
              <div className="credit-card-body">
                <span className="credit-license">{visualLicenseUrl(asset) ? <a href={visualLicenseUrl(asset)} target="_blank" rel="noopener noreferrer">{asset.license}</a> : asset.license}</span>
                <p className="credit-credit">{asset.credit}</p>
                {asset.modifications && <p className="credit-credit">{asset.modifications}</p>}
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
