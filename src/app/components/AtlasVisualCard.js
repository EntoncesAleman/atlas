import { visualPresentation } from '../lib/editorial/visualPresentation';
import Link from 'next/link';

export default function AtlasVisualCard({ category, index }) {
  const presentation = visualPresentation(category.visual, { card: true });
  const isIllustration = presentation.objectFit === 'contain';
  const imageClassName = isIllustration ? 'atlas-card-image atlas-card-image-contain' : 'atlas-card-image';

  return (
    <article className="atlas-card" key={category.title}>
      <Link className="atlas-card-media-link" href={`/atlas/${category.slug}`} aria-label={`Explorar ${category.title}`}>
        <div className="atlas-card-media">
          <span className="atlas-card-scrim" />
          <img src={category.asset} alt={category.alt} className={imageClassName} style={presentation} />
          <span className="atlas-card-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="atlas-card-region">{category.regionLabel}</span>
        </div>
      </Link>

      <div className="atlas-card-body">
        <div className="atlas-card-meta">
          <span className="atlas-card-tag">{category.tag}</span>
          <span className="atlas-card-type">{category.type}</span>
        </div>
        <h3><Link className="atlas-card-title-link" href={`/atlas/${category.slug}`}>{category.title}</Link></h3>
        <p>{category.description}</p>
        <Link className="atlas-card-link" href={`/atlas/${category.slug}`}>
          <span>{category.cta}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
