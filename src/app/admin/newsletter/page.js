import { getSupabaseAdminClient } from '../../lib/supabase/admin';
import { NEWSLETTER_CONTENT_TYPES } from '../../lib/community/communityData';
import { addSubscriber, setSubscriberStatus } from './actions';
import styles from '../admin.module.css';

export const metadata = { title: 'Newsletter — Panel administrador' };

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default async function AdminNewsletterPage() {
  const admin = getSupabaseAdminClient();
  const { data: subscribers, error } = admin
    ? await admin.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false })
    : { data: [], error: 'admin_client_not_configured' };

  const list = subscribers ?? [];
  const subscribedCount = list.filter((s) => s.status === 'subscribed').length;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Newsletter</h1>
        <p>
          Todavía no existe un formulario público de suscripción en el sitio (documentado como
          fuera de alcance en una fase anterior) — esta tabla queda lista para cuando exista, y
          mientras tanto permite cargar suscriptores a mano.
        </p>
      </div>

      {error && <p className={styles.emptyState}>No se pudo cargar la tabla: {error === 'admin_client_not_configured' ? 'falta SUPABASE_SERVICE_ROLE_KEY' : error}</p>}

      <div className={styles.statGrid}>
        <div className={styles.statCard}><span className={styles.statValue}>{list.length}</span><span className={styles.statLabel}>Total</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>{subscribedCount}</span><span className={styles.statLabel}>Activos</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>{list.length - subscribedCount}</span><span className={styles.statLabel}>Dados de baja</span></div>
      </div>

      <div className={styles.section}>
        <h2>Agregar suscriptor manualmente</h2>
        <form action={addSubscriber} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 420 }}>
          <input type="email" name="email" placeholder="email@ejemplo.com" required style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid var(--line)' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {NEWSLETTER_CONTENT_TYPES.map((type) => (
              <label key={type} style={{ fontSize: 12, display: 'flex', gap: 4, alignItems: 'center' }}>
                <input type="checkbox" name={`segment_${type}`} />
                {type.replaceAll('_', ' ')}
              </label>
            ))}
          </div>
          <button type="submit" className={styles.smallButton} style={{ alignSelf: 'flex-start' }}>Agregar</button>
        </form>
      </div>

      <div className={styles.section}>
        <h2>Suscriptores</h2>
        {list.length === 0 ? (
          <div className={styles.emptyState}>Sin suscriptores todavía.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Email</th><th>Segmentos</th><th>Origen</th><th>Alta</th><th>Estado</th><th>Gestión</th></tr>
              </thead>
              <tbody>
                {list.map((s) => (
                  <tr key={s.id}>
                    <td>{s.email}</td>
                    <td>{(s.segments ?? []).join(', ') || '—'}</td>
                    <td>{s.source ?? '—'}</td>
                    <td>{formatDate(s.subscribed_at)}</td>
                    <td><span className={`${styles.badge} ${s.status === 'subscribed' ? styles.badgeOk : styles.badgeUser}`}>{s.status === 'subscribed' ? 'Suscripto' : 'Baja'}</span></td>
                    <td>
                      <form action={setSubscriberStatus}>
                        <input type="hidden" name="id" value={s.id} />
                        <input type="hidden" name="status" value={s.status === 'subscribed' ? 'unsubscribed' : 'subscribed'} />
                        <button type="submit" className={styles.smallButton}>{s.status === 'subscribed' ? 'Dar de baja' : 'Reactivar'}</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className={styles.sectionNote} style={{ marginTop: 10 }}>
          Exportar: <a href="/admin/export/suscriptores">CSV de suscriptores</a>
        </p>
      </div>
    </>
  );
}
