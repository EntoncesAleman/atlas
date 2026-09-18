import { listCombinedUsers } from '../_lib/users';
import { resolveClubRequest } from './actions';
import styles from '../admin.module.css';

export const metadata = { title: 'Moderación — Panel administrador' };

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default async function AdminModeracionPage() {
  const { users, error } = await listCombinedUsers();
  const pendingClubs = users.filter((u) => u.clubStatus === 'pending');
  const rejectedClubs = users.filter((u) => u.clubStatus === 'rejected');

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Moderación</h1>
        <p>
          Lo único que hoy genera una cola real de revisión en el sitio son las solicitudes de
          cuenta de club (alguien se registra pidiendo el rol "Club" en Mi Cultivo). No hay todavía
          comentarios, reseñas ni contenido enviado por usuarios que requiera moderación — cuando
          exista ese tipo de contenido, su cola aparece acá mismo.
        </p>
      </div>

      {error && <p className={styles.emptyState}>No se pudo cargar el listado: {error}</p>}

      <div className={styles.section}>
        <h2>Solicitudes de club pendientes</h2>
        <p className={styles.sectionNote}>Aprobar cambia el rol de la cuenta a "club" (server-side) y le da acceso al panel de club. Rechazar la deja como usuario normal.</p>
        {pendingClubs.length === 0 ? (
          <div className={styles.emptyState}>No hay solicitudes de club pendientes.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Club solicitado</th>
                  <th>Fecha de solicitud</th>
                  <th>Decisión</th>
                </tr>
              </thead>
              <tbody>
                {pendingClubs.map((u) => (
                  <tr key={u.id}>
                    <td>{u.email}</td>
                    <td>{u.clubName ?? '—'}</td>
                    <td>{formatDate(u.createdAt)}</td>
                    <td>
                      <div className={styles.inlineForm}>
                        <form action={resolveClubRequest}>
                          <input type="hidden" name="userId" value={u.id} />
                          <input type="hidden" name="decision" value="approve" />
                          <button type="submit" className={styles.smallButton}>Aprobar</button>
                        </form>
                        <form action={resolveClubRequest}>
                          <input type="hidden" name="userId" value={u.id} />
                          <input type="hidden" name="decision" value="reject" />
                          <button type="submit" className={`${styles.smallButton} ${styles.smallButtonDanger}`}>Rechazar</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2>Rechazadas recientemente</h2>
        {rejectedClubs.length === 0 ? (
          <div className={styles.emptyState}>Ninguna solicitud de club fue rechazada.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Club solicitado</th>
                </tr>
              </thead>
              <tbody>
                {rejectedClubs.map((u) => (
                  <tr key={u.id}>
                    <td>{u.email}</td>
                    <td>{u.clubName ?? '—'}</td>
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
