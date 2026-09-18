import Link from 'next/link';
import { editorialCategories, editorialEntries } from '../../lib/editorial/editorialData';
import { sourceById } from '../../lib/editorial/sources';
import styles from '../admin.module.css';

export const metadata = { title: 'Recursos — Panel administrador' };

const RESOURCE_CATEGORY_SLUGS = ['material-de-lectura', 'documentales', 'noticias'];

export default async function AdminRecursosPage() {
  const resourceCategories = editorialCategories.filter((cat) => RESOURCE_CATEGORY_SLUGS.includes(cat.slug));

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Recursos</h1>
        <p>Material de lectura, documentales y noticias: cada recurso es una entrada editorial con una fuente externa real (enlace, autor/institución, fecha).</p>
      </div>
      <span className={styles.readOnlyNote}>Solo lectura — misma fuente de datos que Editorial (src/app/lib/editorial/*.js).</span>

      {resourceCategories.map((cat) => {
        const catEntries = editorialEntries.filter((e) => e.categoryId === cat.id);
        return (
          <div className={styles.section} key={cat.id}>
            <h2>{cat.title} ({catEntries.length})</h2>
            {catEntries.length === 0 ? (
              <div className={styles.emptyState}>Sin recursos todavía en esta categoría.</div>
            ) : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr><th>Título</th><th>Fuente / enlace</th><th>Autor / institución</th><th>Fecha</th><th>Estado</th></tr>
                  </thead>
                  <tbody>
                    {catEntries.map((entry) => {
                      const source = sourceById((entry.sourceIds ?? [])[0]);
                      return (
                        <tr key={entry.id}>
                          <td><Link href={`/atlas/${cat.slug}/${entry.slug}`} target="_blank">{entry.title}</Link></td>
                          <td>{source?.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.url}</a> : 'Sin enlace público'}</td>
                          <td>{source?.authorOrInstitution ?? '—'}</td>
                          <td>{source?.publicationDate ?? '—'}</td>
                          <td><span className={`${styles.badge} ${entry.editorialStatus === 'PUBLISHED' ? styles.badgeOk : styles.badgePending}`}>{entry.editorialStatus}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
