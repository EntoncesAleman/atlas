import Link from 'next/link';
import { getCategories, getEntries } from '../lib/editorial/registry';
import { sources } from '../lib/editorial/sources';
import { assets } from '../lib/editorial/assets';
import { communityClubs, communityEvents, communityCourses, communityVoices } from '../lib/community/communityData';
import { listCombinedUsers } from './_lib/users';
import { getSupabaseAdminClient } from '../lib/supabase/admin';
import styles from './admin.module.css';

export const metadata = { title: 'Dashboard — Panel administrador' };

async function getDashboardData() {
  const admin = getSupabaseAdminClient();
  const { users, error: usersError } = await listCombinedUsers();

  let newsletterCount = 0;
  let recentActions = [];
  if (admin) {
    const { count } = await admin.from('newsletter_subscribers').select('id', { count: 'exact', head: true }).eq('status', 'subscribed');
    newsletterCount = count ?? 0;
    const { data } = await admin
      .from('admin_audit_log')
      .select('id, actor_email, action, target_type, target_id, created_at')
      .order('created_at', { ascending: false })
      .limit(8);
    recentActions = data ?? [];
  }

  const usersByRole = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] ?? 0) + 1;
    return acc;
  }, {});
  const pendingClubs = users.filter((u) => u.clubStatus === 'pending').length;

  return {
    usersError,
    totalUsers: users.length,
    usersByRole,
    pendingClubs,
    newsletterCount,
    recentActions,
    adminConfigured: Boolean(admin)
  };
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();
  const entries = getEntries();
  const categories = getCategories();

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Dashboard</h1>
        <p>Estado general del sitio: personas, contenido, comunidad y actividad reciente.</p>
      </div>

      {!data.adminConfigured && (
        <p className={styles.emptyState}>
          Falta configurar <code>SUPABASE_SERVICE_ROLE_KEY</code> — sin esa variable el panel no
          puede leer usuarios, clubes ni newsletter. Ver <Link href="/admin/sistema">Sistema</Link>.
        </p>
      )}

      <div className={styles.statGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{data.totalUsers}</span>
          <span className={styles.statLabel}>Cuentas totales</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{data.usersByRole.admin ?? 0}</span>
          <span className={styles.statLabel}>Administradores</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{data.usersByRole.club ?? 0}</span>
          <span className={styles.statLabel}>Clubes aprobados</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{data.pendingClubs}</span>
          <span className={styles.statLabel}>Solicitudes de club pendientes</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{categories.length}</span>
          <span className={styles.statLabel}>Categorías del Atlas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{entries.length}</span>
          <span className={styles.statLabel}>Entradas publicadas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{sources.length}</span>
          <span className={styles.statLabel}>Fuentes registradas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{assets.length}</span>
          <span className={styles.statLabel}>Assets registrados</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{communityClubs.length}</span>
          <span className={styles.statLabel}>Clubes en directorio editorial</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{communityEvents.length}</span>
          <span className={styles.statLabel}>Eventos de comunidad</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{communityCourses.length}</span>
          <span className={styles.statLabel}>Cursos de comunidad</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{communityVoices.length}</span>
          <span className={styles.statLabel}>Voces de comunidad</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{data.newsletterCount}</span>
          <span className={styles.statLabel}>Suscriptores newsletter</span>
        </div>
      </div>

      {data.pendingClubs > 0 && (
        <div className={styles.section}>
          <p className={styles.emptyState}>
            Hay {data.pendingClubs} solicitud{data.pendingClubs === 1 ? '' : 'es'} de club esperando
            revisión. Ir a <Link href="/admin/moderacion">Moderación</Link>.
          </p>
        </div>
      )}

      <div className={styles.section}>
        <h2>Actividad reciente (auditoría)</h2>
        <p className={styles.sectionNote}>Últimas acciones administrativas registradas — ver el historial completo en Sistema.</p>
        {data.recentActions.length === 0 ? (
          <div className={styles.emptyState}>Todavía no se registró ninguna acción administrativa.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Quién</th>
                  <th>Acción</th>
                  <th>Objeto</th>
                </tr>
              </thead>
              <tbody>
                {data.recentActions.map((action) => (
                  <tr key={action.id}>
                    <td>{new Date(action.created_at).toLocaleString('es-AR')}</td>
                    <td>{action.actor_email ?? '—'}</td>
                    <td>{action.action}</td>
                    <td>{action.target_type ? `${action.target_type}${action.target_id ? ` · ${action.target_id}` : ''}` : '—'}</td>
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
