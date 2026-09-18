import Link from 'next/link';
import { editorialCategories, editorialEntries } from '../../lib/editorial/editorialData';
import { sources } from '../../lib/editorial/sources';
import { assets } from '../../lib/editorial/assets';
import { CONTROLLED_TAGS } from '../../lib/editorial/tags';
import styles from '../admin.module.css';

export const metadata = { title: 'Editorial — Panel administrador' };

export default async function AdminEditorialPage({ searchParams }) {
  const params = await searchParams;
  const query = (params?.q ?? '').toLowerCase().trim();
  const categoryFilter = params?.categoria ?? '';
  const statusFilter = params?.estado ?? '';

  const entriesByCategory = editorialCategories.reduce((acc, cat) => {
    acc[cat.id] = editorialEntries.filter((e) => e.categoryId === cat.id).length;
    return acc;
  }, {});

  const filteredEntries = editorialEntries.filter((e) => {
    if (query && !(e.title.toLowerCase().includes(query) || e.id.toLowerCase().includes(query))) return false;
    if (categoryFilter && e.categoryId !== categoryFilter) return false;
    if (statusFilter && e.editorialStatus !== statusFilter) return false;
    return true;
  });

  const sourcesByType = sources.reduce((acc, s) => { acc[s.type] = (acc[s.type] ?? 0) + 1; return acc; }, {});
  const assetsByStatus = assets.reduce((acc, a) => { acc[a.status] = (acc[a.status] ?? 0) + 1; return acc; }, {});
  const assetsByLicense = assets.reduce((acc, a) => { acc[a.license] = (acc[a.license] ?? 0) + 1; return acc; }, {});

  const tagUsage = editorialEntries.reduce((acc, e) => {
    (e.tags ?? []).forEach((t) => { acc[t] = (acc[t] ?? 0) + 1; });
    return acc;
  }, {});
  const unusedTags = CONTROLLED_TAGS.filter((t) => !tagUsage[t]);

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Editorial</h1>
        <p>Categorías, entradas, fuentes, assets y etiquetas del Atlas.</p>
      </div>
      <span className={styles.readOnlyNote}>
        Solo lectura — el contenido editorial vive en src/app/lib/editorial/*.js (fuente de
        verdad deliberada, ver comentarios de ese código). Editarlo desde acá requeriría migrarlo
        a una base de datos, un cambio de arquitectura que excede esta tarea — esta pantalla es
        para inspeccionar y auditar el estado real, no un formulario de edición que no persistiría.
      </span>

      <div className={styles.statGrid}>
        <div className={styles.statCard}><span className={styles.statValue}>{editorialCategories.length}</span><span className={styles.statLabel}>Categorías</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>{editorialEntries.length}</span><span className={styles.statLabel}>Entradas</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>{sources.length}</span><span className={styles.statLabel}>Fuentes</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>{assets.length}</span><span className={styles.statLabel}>Assets</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>{assetsByStatus.ACTIVE ?? 0}</span><span className={styles.statLabel}>Assets activos</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>{assetsByStatus.ARCHIVED ?? 0}</span><span className={styles.statLabel}>Assets archivados</span></div>
      </div>

      <div className={styles.section}>
        <h2>Categorías</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Título</th><th>Slug</th><th>Orden</th><th>Entradas</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {editorialCategories.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((cat) => (
                <tr key={cat.id}>
                  <td><Link href={`/atlas/${cat.slug}`} target="_blank">{cat.title}</Link></td>
                  <td>{cat.slug}</td>
                  <td>{cat.order}</td>
                  <td>{entriesByCategory[cat.id] ?? 0}</td>
                  <td><span className={`${styles.badge} ${cat.status === 'PUBLISHED' ? styles.badgeOk : styles.badgePending}`}>{cat.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Entradas</h2>
        <form className={styles.searchBar} method="get">
          <input type="text" name="q" placeholder="Buscar por título o id…" defaultValue={params?.q ?? ''} />
          <select name="categoria" defaultValue={categoryFilter}>
            <option value="">Todas las categorías</option>
            {editorialCategories.map((cat) => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
          </select>
          <select name="estado" defaultValue={statusFilter}>
            <option value="">Todos los estados</option>
            <option value="PUBLISHED">Publicado</option>
            <option value="REVIEW">En revisión</option>
            <option value="DRAFT">Borrador</option>
            <option value="ARCHIVED">Archivado</option>
          </select>
          <button type="submit" className={styles.smallButton}>Filtrar</button>
        </form>
        <p className={styles.sectionNote}>{filteredEntries.length} de {editorialEntries.length} entradas.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Título</th><th>Categoría</th><th>Fuentes</th><th>Relacionadas</th><th>Revisada</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => {
                const cat = editorialCategories.find((c) => c.id === entry.categoryId);
                return (
                  <tr key={entry.id}>
                    <td>{cat ? <Link href={`/atlas/${cat.slug}/${entry.slug}`} target="_blank">{entry.title}</Link> : entry.title}</td>
                    <td>{cat?.title ?? entry.categoryId}</td>
                    <td>{(entry.sourceIds ?? []).length}</td>
                    <td>{(entry.relatedEntryIds ?? []).length}</td>
                    <td>{entry.lastReviewed ?? '—'}</td>
                    <td><span className={`${styles.badge} ${entry.editorialStatus === 'PUBLISHED' ? styles.badgeOk : styles.badgePending}`}>{entry.editorialStatus}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Fuentes por tipo</h2>
        <div className={styles.statGrid}>
          {Object.entries(sourcesByType).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
            <div className={styles.statCard} key={type}><span className={styles.statValue}>{count}</span><span className={styles.statLabel}>{type}</span></div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Assets por licencia</h2>
        <div className={styles.statGrid}>
          {Object.entries(assetsByLicense).sort((a, b) => b[1] - a[1]).map(([license, count]) => (
            <div className={styles.statCard} key={license}><span className={styles.statValue}>{count}</span><span className={styles.statLabel}>{license}</span></div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Etiquetas ({CONTROLLED_TAGS.length} en el vocabulario controlado)</h2>
        {unusedTags.length > 0 ? (
          <p className={styles.sectionNote}>Sin uso actualmente: {unusedTags.join(', ')}.</p>
        ) : (
          <p className={styles.sectionNote}>Todas las etiquetas del vocabulario controlado están en uso.</p>
        )}
      </div>
    </>
  );
}
