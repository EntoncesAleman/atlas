import { listCombinedUsers } from '../_lib/users';
import { setUserRole, setAccountSuspension } from './actions';
import styles from '../admin.module.css';

export const metadata = { title: 'Usuarios — Panel administrador' };

const ROLE_LABEL = { user: 'Usuario', club: 'Club', admin: 'Admin' };
const ROLE_BADGE = { user: styles.badgeUser, club: styles.badgeClub, admin: styles.badgeAdmin };

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default async function AdminUsuariosPage({ searchParams }) {
  const params = await searchParams;
  const query = (params?.q ?? '').toLowerCase().trim();
  const roleFilter = params?.role ?? '';
  const statusFilter = params?.estado ?? '';

  const { users, error } = await listCombinedUsers();

  const filtered = users.filter((u) => {
    if (query && !(u.email?.toLowerCase().includes(query) || u.displayName?.toLowerCase().includes(query) || u.clubName?.toLowerCase().includes(query))) return false;
    if (roleFilter && u.role !== roleFilter) return false;
    if (statusFilter === 'suspendido' && !u.isBanned) return false;
    if (statusFilter === 'activo' && u.isBanned) return false;
    return true;
  });

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Usuarios</h1>
        <p>Listado real de cuentas (auth.users + perfil). Rol y suspensión se aplican del lado servidor: cambian el registro real, no solo lo que ve esta pantalla.</p>
      </div>

      {error && <p className={styles.emptyState}>No se pudo cargar el listado completo: {error}</p>}

      <form className={styles.searchBar} method="get">
        <input type="text" name="q" placeholder="Buscar por email, nombre o club…" defaultValue={params?.q ?? ''} />
        <select name="role" defaultValue={roleFilter}>
          <option value="">Todos los roles</option>
          <option value="user">Usuario</option>
          <option value="club">Club</option>
          <option value="admin">Admin</option>
        </select>
        <select name="estado" defaultValue={statusFilter}>
          <option value="">Todos los estados</option>
          <option value="activo">Activos</option>
          <option value="suspendido">Suspendidos</option>
        </select>
        <button type="submit" className={styles.smallButton}>Filtrar</button>
      </form>

      <p className={styles.sectionNote}>{filtered.length} de {users.length} cuentas.</p>

      {filtered.length === 0 ? (
        <div className={styles.emptyState}>Ninguna cuenta coincide con ese filtro.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Rol</th>
                <th>Origen</th>
                <th>Alta</th>
                <th>Último ingreso</th>
                <th>Estado</th>
                <th>Gestión</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>
                    {u.email}
                    {u.clubName && <div className={styles.sectionNote} style={{ margin: 0 }}>Club: {u.clubName}</div>}
                  </td>
                  <td>
                    <span className={`${styles.badge} ${ROLE_BADGE[u.role]}`}>{ROLE_LABEL[u.role]}</span>
                    {u.clubStatus === 'pending' && <span className={`${styles.badge} ${styles.badgePending}`} style={{ marginLeft: 4 }}>Club pendiente</span>}
                  </td>
                  <td>{u.provider}</td>
                  <td>{formatDate(u.createdAt)}</td>
                  <td>{formatDate(u.lastSignInAt)}</td>
                  <td>
                    <span className={`${styles.badge} ${u.isBanned ? styles.badgeError : styles.badgeOk}`}>
                      {u.isBanned ? 'Suspendido' : 'Activo'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <form action={setUserRole} className={styles.inlineForm}>
                        <input type="hidden" name="userId" value={u.id} />
                        <select name="role" defaultValue={u.role} className={styles.smallSelect}>
                          <option value="user">Usuario</option>
                          <option value="club">Club</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button type="submit" className={styles.smallButton}>Guardar rol</button>
                      </form>
                      <form action={setAccountSuspension} className={styles.inlineForm}>
                        <input type="hidden" name="userId" value={u.id} />
                        <input type="hidden" name="suspend" value={(!u.isBanned).toString()} />
                        <button type="submit" className={`${styles.smallButton} ${u.isBanned ? '' : styles.smallButtonDanger}`}>
                          {u.isBanned ? 'Reactivar' : 'Suspender'}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
