import AtlasVisualCard from './AtlasVisualCard';
import TrackerShowcaseCard from './TrackerShowcaseCard';
import { atlasCategories } from '../lib/atlasData';

export default function CategoryShowcase({ limit, description, showHeading = true }) {
  const categories = typeof limit === 'number' ? atlasCategories.slice(0, limit) : atlasCategories;
  const hasMore = typeof limit === 'number' && atlasCategories.length > limit;

  return (
    <section className="category-showcase" aria-label="Vidriera de categorías del atlas">
      {showHeading && (
        <div className="section-heading">
          <div>
            <span className="section-label dark-label">Enciclopedia</span>
            <h2>Categorías del atlas</h2>
            {description && <p className="category-showcase-lede">{description}</p>}
          </div>
          <a className="section-link" href="/atlas">Ver todas</a>
        </div>
      )}

      <div className="atlas-grid">
        <TrackerShowcaseCard />
        {categories.map((category, index) => (
          <AtlasVisualCard category={category} index={index} key={category.id} />
        ))}
      </div>

      {hasMore && (
        <div className="category-showcase-footer">
          <a className="primary-button" href="/atlas">Ir al Atlas completo</a>
        </div>
      )}
    </section>
  );
}
