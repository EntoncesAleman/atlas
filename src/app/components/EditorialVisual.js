import { visualLicenseUrl, visualPresentation } from '../lib/editorial/visualPresentation';

export default function EditorialVisual({ asset, category = false }) {
  if (!asset) return null;
  const licenseUrl = visualLicenseUrl(asset);
  return (
    <figure className={`editorial-visual${asset.type === 'diagram' ? ' editorial-visual-diagram' : ''}`}>
      <a className={category ? 'atlas-category-media' : 'atlas-entry-media'} href={asset.file} target="_blank" rel="noopener noreferrer" aria-label="Abrir imagen completa">
        <img src={asset.file} alt={asset.alt} className={category ? 'atlas-category-image' : 'atlas-entry-hero-image'} style={{ ...visualPresentation(asset), ...(asset.width ? { maxWidth: `${asset.width}px` } : {}) }} width={asset.width} height={asset.height} />
      </a>
      <figcaption className="editorial-visual-caption">
        {asset.caption && <p>{asset.caption}</p>}
        {asset.generated && <p className="editorial-visual-credit">{asset.credit}</p>}
        {asset.sourceUrl && <p className="editorial-visual-credit">
          <a href={asset.sourceUrl} target="_blank" rel="noopener noreferrer">{asset.author} · Fuente</a>
          {' · '}{licenseUrl ? <a href={licenseUrl} target="_blank" rel="noopener noreferrer">{asset.license}</a> : asset.license}
          {asset.modifications && <span> · {asset.modifications}</span>}
        </p>}
        <a className="editorial-visual-expand" href={asset.file} target="_blank" rel="noopener noreferrer">Ver imagen completa ↗</a>
      </figcaption>
    </figure>
  );
}
