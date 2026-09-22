import { getSupabaseAdminClient } from '../../lib/supabase/admin';
import { setNewsStatus, updateNewsContent } from './actions';
import styles from '../admin.module.css';

export const metadata = { title: 'Noticias — Panel administrador' };

const STATUS_LABELS = { published: 'Publicada', archived: 'Archivada', hidden: 'Oculta' };
const STATUS_BADGE_CLASS = { published: styles.badgeOk, archived: styles.badgeUser, hidden: styles.badgeError };

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default async function AdminNoticiasPage() {
  const admin = getSupabaseAdminClient();
  const { data: newsItems, error } = admin
    ? await admin.from('news_items').select('*').order('published_at', { ascending: false }).limit(200)
    : { data: [], error: 'admin_client_not_configured' };

  const list = newsItems ?? [];
  const publishedCount = list.filter((item) => item.status === 'published').length;
  const archivedCount = list.filter((item) => item.status === 'archived').length;
  const hiddenCount = list.filter((item) => item.status === 'hidden').length;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Noticias</h1>
        <p>
          Gestión del Skill de Noticias del Atlas: la sincronización semanal (cron) y la ejecución
          manual escriben acá vía el ejecutor (<code>lib/news/executor.js</code>) — nunca se
          borran filas, solo cambia el estado. Mostrando las últimas 200.
        </p>
      </div>

      {error && <p className={styles.emptyState}>No se pudo cargar la tabla: {error === 'admin_client_not_configured' ? 'falta SUPABASE_SERVICE_ROLE_KEY' : error}</p>}

      <div className={styles.statGrid}>
        <div className={styles.statCard}><span className={styles.statValue}>{list.length}</span><span className={styles.statLabel}>Total</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>{publishedCount}</span><span className={styles.statLabel}>Publicadas</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>{archivedCount}</span><span className={styles.statLabel}>Archivadas</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>{hiddenCount}</span><span className={styles.statLabel}>Ocultas</span></div>
      </div>

      <div className={styles.section}>
        <h2>Noticias sincronizadas</h2>
        {list.length === 0 ? (
          <div className={styles.emptyState}>Sin noticias todavía — corré la sincronización semanal (ver documentación en <code>docs/NEWS_SYSTEM.md</code>).</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Título</th><th>País</th><th>Categoría</th><th>Fuente</th><th>Publicada</th><th>Estado</th><th>Gestión</th></tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id}>
                    <td style={{ maxWidth: 320 }}>
                      <details>
                        <summary>{item.title}</summary>
                        <p className={styles.sectionNote}>{item.summary}</p>
                        <form action={updateNewsContent} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                          <input type="hidden" name="id" value={item.id} />
                          <input type="text" name="title" defaultValue={item.title} style={{ padding: '6px 8px', borderRadius: 8, border: '1px solid var(--line)' }} />
                          <textarea name="summary" defaultValue={item.summary} rows={3} style={{ padding: '6px 8px', borderRadius: 8, border: '1px solid var(--line)' }} />
                          <button type="submit" className={styles.smallButton} style={{ alignSelf: 'flex-start' }}>Guardar edición</button>
                        </form>
                      </details>
                    </td>
                    <td>{item.country_scope}</td>
                    <td>{item.category}</td>
                    <td>
                      <a href={item.source_url} target="_blank" rel="noopener noreferrer nofollow">{item.source_name}</a>
                    </td>
                    <td>{formatDate(item.published_at)}</td>
                    <td><span className={`${styles.badge} ${STATUS_BADGE_CLASS[item.status] ?? ''}`}>{STATUS_LABELS[item.status] ?? item.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {item.status !== 'archived' && (
                          <form action={setNewsStatus}>
                            <input type="hidden" name="id" value={item.id} />
                            <input type="hidden" name="status" value="archived" />
                            <button type="submit" className={styles.smallButton}>Archivar</button>
                          </form>
                        )}
                        {item.status !== 'hidden' && (
                          <form action={setNewsStatus}>
                            <input type="hidden" name="id" value={item.id} />
                            <input type="hidden" name="status" value="hidden" />
                            <button type="submit" className={styles.smallButtonDanger}>Ocultar</button>
                          </form>
                        )}
                        {item.status !== 'published' && (
                          <form action={setNewsStatus}>
                            <input type="hidden" name="id" value={item.id} />
                            <input type="hidden" name="status" value="published" />
                            <button type="submit" className={styles.smallButton}>Republicar</button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
