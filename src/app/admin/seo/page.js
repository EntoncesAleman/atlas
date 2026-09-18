import { editorialCategories, editorialEntries } from '../../lib/editorial/editorialData';
import { sourceById } from '../../lib/editorial/sources';
import { assetForCategory, assetsForEntry } from '../../lib/editorial/assets';
import styles from '../admin.module.css';

export const metadata = { title: 'SEO — Panel administrador' };

// Rutas públicas conocidas del sitio (no las de `/admin/*`, que son privadas y noindex a
// propósito). Auditado a mano contra el árbol real de `src/app` — cada una tiene `metadata`
// propio o lo hereda de un layout.js hermano (mi-cultivo, chatbot) o del layout raíz (home).
const STATIC_ROUTES = [
  { path: '/', metadataSource: 'layout raíz (src/app/layout.js)' },
  { path: '/atlas', metadataSource: 'metadata propio' },
  { path: '/atlas/[category]', metadataSource: 'generateMetadata propio' },
  { path: '/atlas/[category]/[entry]', metadataSource: 'generateMetadata propio' },
  { path: '/chatbot', metadataSource: 'layout.js hermano (noindex)' },
  { path: '/mi-cultivo', metadataSource: 'layout.js hermano (noindex)' },
  { path: '/comunidad', metadataSource: 'metadata propio' },
  { path: '/comunidad/agenda', metadataSource: 'metadata propio' },
  { path: '/comunidad/clubes', metadataSource: 'metadata propio' },
  { path: '/comunidad/formacion', metadataSource: 'metadata propio' },
  { path: '/comunidad/voces', metadataSource: 'metadata propio' },
  { path: '/creditos', metadataSource: 'metadata propio' },
  { path: '/sobre-el-proyecto', metadataSource: 'metadata propio' }
];

function buildEditorialHealthReport() {
  const categoryIds = new Set(editorialCategories.map((c) => c.id));
  const entryIds = new Set(editorialEntries.map((e) => e.id));

  const missingSeo = [];
  const brokenRelated = [];
  const brokenSources = [];
  const missingCategoryImage = [];
  const missingEntryImage = [];
  const orphanCategory = [];

  for (const category of editorialCategories) {
    if (!category.metadata?.seoTitle || !category.metadata?.seoDescription) {
      missingSeo.push({ type: 'Categoría', id: category.id, title: category.title });
    }
    if (!assetForCategory(category.id)) {
      missingCategoryImage.push({ id: category.id, title: category.title });
    }
  }

  for (const entry of editorialEntries) {
    if (!categoryIds.has(entry.categoryId)) {
      orphanCategory.push({ id: entry.id, title: entry.title, categoryId: entry.categoryId });
    }
    if (!entry.metadata?.seoTitle || !entry.metadata?.seoDescription) {
      missingSeo.push({ type: 'Entrada', id: entry.id, title: entry.title });
    }
    for (const relatedId of entry.relatedEntryIds ?? []) {
      if (!entryIds.has(relatedId)) brokenRelated.push({ entryId: entry.id, brokenRef: relatedId });
    }
    for (const sourceId of entry.sourceIds ?? []) {
      if (!sourceById(sourceId)) brokenSources.push({ entryId: entry.id, brokenRef: sourceId });
    }
    if (assetsForEntry(entry.id).length === 0) {
      missingEntryImage.push({ id: entry.id, title: entry.title });
    }
  }

  return { missingSeo, brokenRelated, brokenSources, missingCategoryImage, missingEntryImage, orphanCategory };
}

export default async function AdminSeoPage() {
  const report = buildEditorialHealthReport();
  const totalIssues = report.missingSeo.length + report.brokenRelated.length + report.brokenSources.length + report.orphanCategory.length;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>SEO</h1>
        <p>Metadata, URLs, sitemap e indexación de las páginas públicas, más un chequeo real de integridad del contenido editorial (enlaces internos rotos, entradas sin metadata, sin imagen).</p>
      </div>

      <div className={styles.section}>
        <h2>Sitemap e indexación</h2>
        <ul>
          <li><code>/sitemap.xml</code> — generado por <code>src/app/sitemap.js</code>.</li>
          <li><code>/robots.txt</code> — generado por <code>src/app/robots.js</code>.</li>
          <li><code>/mi-cultivo</code> y <code>/chatbot</code> están marcados <code>noindex</code> a propósito (historial personal, no contenido editorial).</li>
          <li><code>/admin/*</code> está marcado <code>noindex</code> y además requiere rol admin — no debería aparecer nunca en el sitemap ni en resultados de búsqueda.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Páginas públicas y su fuente de metadata</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th>Ruta</th><th>Metadata</th></tr></thead>
            <tbody>
              {STATIC_ROUTES.map((route) => (
                <tr key={route.path}><td><code>{route.path}</code></td><td>{route.metadataSource}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Salud del contenido editorial</h2>
        <p className={styles.sectionNote}>{totalIssues === 0 ? 'Sin problemas detectados.' : `${totalIssues} problema(s) detectado(s).`}</p>

        {report.missingSeo.length > 0 && (
          <>
            <h3>Sin título/descripción SEO ({report.missingSeo.length})</h3>
            <ul>{report.missingSeo.map((item) => <li key={`${item.type}-${item.id}`}>{item.type}: {item.title} ({item.id})</li>)}</ul>
          </>
        )}

        {report.brokenRelated.length > 0 && (
          <>
            <h3>Enlaces internos rotos — relatedEntryIds ({report.brokenRelated.length})</h3>
            <ul>{report.brokenRelated.map((item, i) => <li key={i}>{item.entryId} → {item.brokenRef} (no existe)</li>)}</ul>
          </>
        )}

        {report.brokenSources.length > 0 && (
          <>
            <h3>Fuentes rotas — sourceIds ({report.brokenSources.length})</h3>
            <ul>{report.brokenSources.map((item, i) => <li key={i}>{item.entryId} → {item.brokenRef} (no existe)</li>)}</ul>
          </>
        )}

        {report.orphanCategory.length > 0 && (
          <>
            <h3>Entradas con categoría inexistente ({report.orphanCategory.length})</h3>
            <ul>{report.orphanCategory.map((item) => <li key={item.id}>{item.title} → {item.categoryId}</li>)}</ul>
          </>
        )}

        {report.missingCategoryImage.length > 0 && (
          <>
            <h3>Categorías sin imagen de portada ({report.missingCategoryImage.length})</h3>
            <ul>{report.missingCategoryImage.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
          </>
        )}

        {report.missingEntryImage.length > 0 && (
          <>
            <h3>Entradas sin imagen propia ({report.missingEntryImage.length})</h3>
            <p className={styles.sectionNote}>No es necesariamente un error — varias entradas del atlas nunca tuvieron imagen propia por diseño. Se lista para revisión manual, no como falla automática.</p>
            <ul>{report.missingEntryImage.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
          </>
        )}
      </div>
    </>
  );
}
