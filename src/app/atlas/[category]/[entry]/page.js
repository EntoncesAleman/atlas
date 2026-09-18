import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCategory,
  getCategoryById,
  getEntry,
  getEntriesForCategory,
  getRelatedEntries,
  getSourcesForEntry,
  getAssetsForEntry,
  groupSourcesByScope
} from '../../../lib/editorial/registry';
import { SIGNAL_LEVEL_LABELS, MISTAKE_TYPE_LABELS, SOURCE_SCOPE_LABELS } from '../../../lib/editorial/tags';
import { getEntryReferenceMatches } from '../../../lib/editorial/linkifyReferences';
import ProvinceProfileCard from '../../../components/ProvinceProfileCard';

// Cierre de P1-5A (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md): envuelve en un <Link> real
// los fragmentos de `text` que `getEntryReferenceMatches` identificó como una mención exacta a
// otra entrada — el resto del texto se devuelve intacto, carácter por carácter.
function renderTextWithReferences(text, currentEntryId, keyPrefix) {
  const matches = getEntryReferenceMatches(text, currentEntryId);
  if (matches.length === 0) return text;

  const nodes = [];
  let cursor = 0;
  matches.forEach((match, index) => {
    if (match.start > cursor) nodes.push(text.slice(cursor, match.start));
    nodes.push(
      <Link key={`${keyPrefix}-ref-${index}`} href={match.href} className="atlas-inline-reference">
        {match.label}
      </Link>
    );
    cursor = match.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, entry: entrySlug } = await params;
  const category = getCategory(categorySlug);
  const entry = category ? getEntry(categorySlug, entrySlug) : null;
  if (!category || !entry) return {};

  return {
    title: entry.metadata?.seoTitle ?? `${entry.title} — Atlas del Cultivo Argentino`,
    description: entry.metadata?.seoDescription ?? entry.summary,
    alternates: entry.metadata?.canonical ? { canonical: entry.metadata.canonical } : undefined
  };
}

export default async function EntryPage({ params }) {
  const { category: categorySlug, entry: entrySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) {
    notFound();
  }

  const entry = getEntry(categorySlug, entrySlug);
  if (!entry) {
    notFound();
  }

  const categoryEntries = getEntriesForCategory(category);
  const entryIndex = categoryEntries.findIndex((item) => item.slug === entry.slug);
  const previous = categoryEntries[entryIndex - 1];
  const next = categoryEntries[entryIndex + 1];

  const relatedEntries = getRelatedEntries(entry);
  const entrySources = getSourcesForEntry(entry);
  const [heroAsset] = getAssetsForEntry(entry);

  const { cannabis: cannabisSources, general: generalSources, other: otherSources } =
    groupSourcesByScope(entrySources);
  const sourceGroups = [
    { key: 'cannabis', label: SOURCE_SCOPE_LABELS.CANNABIS, items: cannabisSources },
    { key: 'general', label: SOURCE_SCOPE_LABELS.GENERAL, items: generalSources },
    { key: 'other', label: 'Otras fuentes', items: otherSources }
  ].filter((group) => group.items.length > 0);
  const showSourceGroupLabels = sourceGroups.length > 1;

  return (
    <main className="atlas-page entry-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <Link className="crumb" href="/atlas">Atlas</Link>
          <span className="crumb-sep">/</span>
          <Link className="crumb" href={`/atlas/${category.slug}`}>{category.title}</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{entry.title}</span>
        </nav>
      </section>

      <section className="atlas-entry-hero">
        <div className="atlas-entry-hero-copy">
          <span className="section-label dark-label">{category.title}</span>
          <h1>{entry.title}</h1>
          <p className="atlas-lede">{entry.summary}</p>
          <div className="atlas-entry-tags">
            {entry.tags.map((tag) => <span className="atlas-tag" key={tag}>{tag}</span>)}
          </div>
        </div>
        {heroAsset && (
          <div className="atlas-entry-media">
            <img src={heroAsset.file} alt={heroAsset.alt} className="atlas-entry-hero-image" />
          </div>
        )}
      </section>

      <section className="atlas-entry-content-wrap">
        <article className="atlas-entry-content">
          <div className="atlas-entry-content-body">
            <p className="atlas-excerpt">{entry.intro}</p>

            {entry.sections?.length > 0 && entry.sections.map((section) => (
              <div className="atlas-entry-section" key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={index}>{renderTextWithReferences(paragraph, entry.id, `${section.id}-p${index}`)}</p>
                ))}
                {section.list?.length > 0 && (
                  <ul>
                    {section.list.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                )}
                {section.table && (
                  <div className="atlas-entry-table-wrap">
                    <table className="atlas-entry-table">
                      <caption>{section.table.caption}</caption>
                      <thead>
                        <tr>
                          {section.table.headers.map((header) => <th key={header}>{header}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, index) => (
                          <tr key={index}>
                            <td data-label={section.table.headers[0]}>{row.etapa}</td>
                            <td data-label={section.table.headers[1]}>{row.duracion}</td>
                            <td data-label={section.table.headers[2]}>{row.fotoperiodo}</td>
                            <td data-label={section.table.headers[3]}>{row.temperatura}</td>
                            <td data-label={section.table.headers[4]}>{row.hr}</td>
                            <td data-label={section.table.headers[5]}>{row.notas}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {section.note && <p className="atlas-section-note">{section.note}</p>}
              </div>
            ))}

            {entry.observations?.length > 0 && (
              <div className="atlas-entry-section">
                <h2>Observaciones</h2>
                {entry.observations.map((paragraph, index) => (
                  <p key={index}>{renderTextWithReferences(paragraph, entry.id, `obs-p${index}`)}</p>
                ))}
              </div>
            )}

            {entry.signals?.length > 0 && (
              <div className="atlas-entry-section">
                <h2>Señales</h2>
                <ul className="atlas-signal-list">
                  {entry.signals.map((signal, index) => (
                    <li className={`atlas-signal atlas-signal-${signal.level.toLowerCase()}`} key={index}>
                      <span className="atlas-signal-level">{SIGNAL_LEVEL_LABELS[signal.level] ?? signal.level}</span>
                      <span className="atlas-signal-description">{signal.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {entry.commonMistakes?.length > 0 && (
              <div className="atlas-entry-section">
                <h2>Errores frecuentes</h2>
                <ul className="atlas-mistake-list">
                  {entry.commonMistakes.map((mistake, index) => (
                    <li className="atlas-mistake" key={index}>
                      <span className="atlas-mistake-type">{MISTAKE_TYPE_LABELS[mistake.type] ?? mistake.type}</span>
                      <span className="atlas-mistake-description">{renderTextWithReferences(mistake.description, entry.id, `mistake-${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {entry.environmentContext?.length > 0 && (
              <div className="atlas-entry-section">
                <h2>Contexto ambiental</h2>
                {entry.environmentContext.map((paragraph, index) => (
                  <p key={index}>{renderTextWithReferences(paragraph, entry.id, `env-p${index}`)}</p>
                ))}
              </div>
            )}

          </div>

          {entrySources.length > 0 && (
            <div className="atlas-sources">
              <span className="atlas-aside-label">Fuentes</span>
              {sourceGroups.map((group) => (
                <div className="atlas-source-group" key={group.key}>
                  {showSourceGroupLabels && (
                    <span className={`atlas-source-group-label atlas-source-group-${group.key}`}>
                      {group.label}
                    </span>
                  )}
                  <ul className="atlas-sources-list">
                    {group.items.map((source) => (
                      <li className="atlas-source-item" key={source.id}>
                        {source.url ? (
                          <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
                        ) : (
                          <span>
                            {source.title}
                            <span className="atlas-source-no-link" title="No se localizó una página pública verificable para enlazar esta fuente.">
                              {' '}(sin enlace público disponible)
                            </span>
                          </span>
                        )}
                        {source.authorOrInstitution && (
                          <span className="atlas-source-meta"> — {source.authorOrInstitution}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </article>

        <aside className="atlas-entry-aside">
          <ProvinceProfileCard entryId={entry.id} />

          <span className="atlas-aside-label">Contenido relacionado</span>
          <div className="atlas-aside-list">
            {relatedEntries.length > 0 ? relatedEntries.map((related) => {
              const relatedCategory = getCategoryById(related.categoryId);
              return (
                <Link
                  className="atlas-aside-link"
                  key={related.id}
                  href={`/atlas/${relatedCategory?.slug ?? category.slug}/${related.slug}`}
                >
                  {related.title}
                </Link>
              );
            }) : (
              <span className="atlas-aside-link inactive">Biblioteca ampliada</span>
            )}
          </div>
          <div className="atlas-aside-nav">
            {previous ? <Link className="atlas-prev-next" href={`/atlas/${category.slug}/${previous.slug}`}>← Anterior</Link> : <span className="atlas-prev-next disabled">Anterior</span>}
            <Link className="atlas-prev-next" href={`/atlas/${category.slug}`}>Volver a categoría</Link>
            {next ? <Link className="atlas-prev-next" href={`/atlas/${category.slug}/${next.slug}`}>Siguiente →</Link> : <span className="atlas-prev-next disabled">Siguiente</span>}
          </div>
        </aside>
      </section>
    </main>
  );
}

