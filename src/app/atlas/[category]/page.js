import Link from 'next/link';
import { notFound } from 'next/navigation';
import { atlasCategories, atlasEntries } from '../../lib/atlasData';
import { getCategory, getRelatedCategories } from '../../lib/editorial/registry';

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};

  return {
    title: category.metadata?.seoTitle ?? `${category.title} — Atlas del Cultivo Argentino`,
    description: category.metadata?.seoDescription ?? category.description,
    alternates: category.metadata?.canonical ? { canonical: category.metadata.canonical } : undefined
  };
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const category = atlasCategories.find((item) => item.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const entries = atlasEntries.filter((entry) => entry.categoryId === category.id && entry.state === 'PUBLISHED');
  // Categorías relacionadas reales (Loop de cierre P1-4, auditoría 63) — se calculan sobre el
  // objeto de categoría del registry (tiene `order`/`relatedEntryIds` de sus entradas), no sobre
  // el adaptador legado que se usa para el resto del render de esta página.
  const registryCategory = getCategory(categorySlug);
  const relatedCategories = registryCategory ? getRelatedCategories(registryCategory, 3) : [];

  return (
    <main className="atlas-page category-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <Link className="crumb" href="/atlas">Atlas</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{category.title}</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div className="atlas-category-hero-copy">
          <span className="section-label dark-label">{category.type}</span>
          <h1>{category.title}</h1>
          <p className="atlas-lede">{category.editorialDescription}</p>
          <div className="atlas-category-actions">
            <Link className="primary-button" href={`/atlas/${category.slug}/${entries[0]?.slug ?? ''}`}>Explorar contenido</Link>
            <Link className="secondary-button" href="/atlas">Volver al atlas</Link>
          </div>
        </div>
        <div className="atlas-category-media">
          <img src={category.asset} alt={category.alt} className="atlas-category-image" />
        </div>
      </section>

      <section className="atlas-section">
        <div className="section-heading">
          <div>
            <span className="section-label dark-label">Explorar</span>
            <h2>{category.title}</h2>
          </div>
        </div>

        <div className="atlas-entry-grid">
          {entries.length > 0 ? entries.map((entry) => (
            <article className="atlas-entry-card" key={entry.id}>
              {entry.image && (
                <div className="atlas-entry-card-media">
                  <img src={entry.image} alt={entry.alt} className="atlas-entry-image" />
                </div>
              )}
              <div className="atlas-entry-card-body">
                <span className="atlas-entry-type">{entry.tags[0]}</span>
                <h3><Link href={`/atlas/${category.slug}/${entry.slug}`}>{entry.title}</Link></h3>
                <p>{entry.summary}</p>
                <Link className="atlas-card-link" href={`/atlas/${category.slug}/${entry.slug}`}>Leer pieza <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          )) : (
            <article className="atlas-entry-card empty-card">
              <div className="atlas-entry-card-body">
                <span className="atlas-entry-type">Contenido futuro</span>
                <h3>Biblioteca en preparación</h3>
                <p>La categoría sigue abierta para una próxima colección editorial.</p>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="atlas-section">
        <div className="section-heading">
          <div>
            <span className="section-label dark-label">Relacionado</span>
            <h2>Otras categorías</h2>
          </div>
        </div>
        <div className="atlas-related-grid">
          {relatedCategories.map((related) => (
            <Link key={related.id} className="atlas-related-card" href={`/atlas/${related.slug}`}>
              <span className="atlas-related-type">{related.type}</span>
              <span className="atlas-related-title">{related.title}</span>
              <span className="atlas-related-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
