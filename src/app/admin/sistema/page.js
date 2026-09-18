import { getSupabaseAdminClient } from '../../lib/supabase/admin';
import styles from '../admin.module.css';

export const metadata = { title: 'Sistema — Panel administrador' };

const ENV_VARS = [
  { key: 'NEXT_PUBLIC_SUPABASE_URL', required: true, note: 'Cliente de navegador y servidor' },
  { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', required: true, note: 'Cliente de navegador y servidor' },
  { key: 'SUPABASE_SERVICE_ROLE_KEY', required: true, note: 'Panel admin — bypass de RLS' }
];

async function checkDatabase() {
  const admin = getSupabaseAdminClient();
  if (!admin) return { ok: false, detail: 'Cliente admin no configurado' };
  const started = Date.now();
  const { error } = await admin.from('profiles').select('id', { count: 'exact', head: true });
  if (error) return { ok: false, detail: error.message };
  return { ok: true, detail: `Respondió en ${Date.now() - started} ms` };
}

async function checkStorage() {
  const admin = getSupabaseAdminClient();
  if (!admin) return { ok: false, detail: 'Cliente admin no configurado' };
  const { data, error } = await admin.storage.listBuckets();
  if (error) return { ok: false, detail: error.message };
  const hasBucket = data?.some((bucket) => bucket.id === 'cultivo-photos');
  return { ok: hasBucket, detail: hasBucket ? 'Bucket cultivo-photos disponible' : 'Bucket cultivo-photos no encontrado' };
}

async function checkWeatherApi() {
  const started = Date.now();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-34.6&longitude=-58.4&current=temperature_2m', { signal: controller.signal });
    clearTimeout(timeout);
    return { ok: response.ok, detail: response.ok ? `Respondió en ${Date.now() - started} ms` : `HTTP ${response.status}` };
  } catch (error) {
    return { ok: false, detail: error.message ?? 'Sin respuesta' };
  }
}

async function getRowCounts() {
  const admin = getSupabaseAdminClient();
  if (!admin) return {};
  const tables = ['profiles', 'cultivos', 'cultivo_events', 'cultivo_event_photos', 'newsletter_subscribers', 'admin_audit_log'];
  const counts = {};
  await Promise.all(tables.map(async (table) => {
    const { count } = await admin.from(table).select('id', { count: 'exact', head: true });
    counts[table] = count ?? 0;
  }));
  return counts;
}

export default async function AdminSistemaPage() {
  const [db, storage, weather, counts] = await Promise.all([
    checkDatabase(),
    checkStorage(),
    checkWeatherApi(),
    getRowCounts()
  ]);

  const admin = getSupabaseAdminClient();
  const { data: auditLog } = admin
    ? await admin.from('admin_audit_log').select('*').order('created_at', { ascending: false }).limit(50)
    : { data: [] };

  const healthChecks = [
    { name: 'Base de datos (Supabase Postgres)', ...db },
    { name: 'Storage (fotos de Mi Cultivo)', ...storage },
    { name: 'Clima (Open-Meteo, usado por Mi Cultivo y el Atlas)', ...weather }
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Sistema</h1>
        <p>Estado de las integraciones reales del sitio, variables de entorno y auditoría completa de acciones administrativas.</p>
      </div>

      <div className={styles.section}>
        <h2>Salud general</h2>
        <div className={styles.healthGrid}>
          {healthChecks.map((check) => (
            <div className={styles.healthCard} key={check.name}>
              <h3>
                <span className={`${styles.badge} ${check.ok ? styles.badgeOk : styles.badgeError}`}>{check.ok ? 'OK' : 'Error'}</span>{' '}
                {check.name}
              </h3>
              <p>{check.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Variables de entorno</h2>
        <p className={styles.sectionNote}>Solo se comprueba si están presentes — nunca se muestra su valor acá.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th>Variable</th><th>Uso</th><th>Estado</th></tr></thead>
            <tbody>
              {ENV_VARS.map((env) => {
                const present = Boolean(process.env[env.key]);
                return (
                  <tr key={env.key}>
                    <td><code>{env.key}</code></td>
                    <td>{env.note}</td>
                    <td>
                      <span className={`${styles.badge} ${present ? styles.badgeOk : (env.required ? styles.badgeError : styles.badgePending)}`}>
                        {present ? 'Configurada' : env.required ? 'Falta (requerida)' : 'Falta (opcional)'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Filas por tabla</h2>
        <div className={styles.statGrid}>
          {Object.entries(counts).map(([table, count]) => (
            <div className={styles.statCard} key={table}><span className={styles.statValue}>{count}</span><span className={styles.statLabel}>{table}</span></div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Auditoría — últimas 50 acciones</h2>
        {(!auditLog || auditLog.length === 0) ? (
          <div className={styles.emptyState}>Sin acciones administrativas registradas todavía.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Fecha</th><th>Quién</th><th>Acción</th><th>Objeto</th><th>Detalle</th></tr></thead>
              <tbody>
                {auditLog.map((entry) => (
                  <tr key={entry.id}>
                    <td>{new Date(entry.created_at).toLocaleString('es-AR')}</td>
                    <td>{entry.actor_email ?? '—'}</td>
                    <td>{entry.action}</td>
                    <td>{entry.target_type ? `${entry.target_type}${entry.target_id ? ` · ${entry.target_id}` : ''}` : '—'}</td>
                    <td>{entry.details ? JSON.stringify(entry.details) : '—'}</td>
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
