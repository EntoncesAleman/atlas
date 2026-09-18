import Link from 'next/link';
import { listCombinedUsers } from '../_lib/users';
import { communityClubs } from '../../lib/community/communityData';
import styles from '../admin.module.css';

export const metadata = { title: 'Clubes — Panel administrador' };

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default async function AdminClubesPage() {
  const { users, error } = await listCombinedUsers();
  const clubAccounts = users.filter((u) => u.role === 'club');

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Clubes</h1>
        <p>Dos fuentes distintas, mostradas por separado a propósito: las cuentas de club reales (con login) y el directorio editorial público de /comunidad/clubes (todavía sin ningún club cargado).</p>
      </div>

      <div className={styles.section}>
        <h2>Cuentas de club (con acceso al panel de club)</h2>
        <p className={styles.sectionNote}>Se gestionan desde Usuarios o Moderación (aprobación de solicitudes) — acá es solo el listado.</p>
        {clubAccounts.length === 0 ? (
          <div className={styles.emptyState}>Todavía no hay ninguna cuenta con rol "club" aprobada.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nombre de club</th>
                  <th>Alta</th>
                  <th>Último ingreso</th>
                </tr>
              </thead>
              <tbody>
                {clubAccounts.map((u) => (
                  <tr key={u.id}>
                    <td>{u.email}</td>
                    <td>{u.clubName ?? '—'}</td>
                    <td>{formatDate(u.createdAt)}</td>
                    <td>{formatDate(u.lastSignInAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2>Directorio editorial público (/comunidad/clubes)</h2>
        <span className={styles.readOnlyNote}>Solo lectura — datos de src/app/lib/community/communityData.js, no de la base</span>
        <p className={styles.sectionNote}>
          Este directorio se administra editorialmente (cambios de código), no desde este panel —
          igual que el resto del contenido de Comunidad. Hoy está vacío a propósito: el propio
          código documenta que no hay todavía ningún club real, verificado y publicable. Ver{' '}
          <Link href="/comunidad/clubes">la página pública</Link>.
        </p>
        {communityClubs.length === 0 ? (
          <div className={styles.emptyState}>0 clubes en el directorio editorial.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Provincia</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {communityClubs.map((club) => (
                  <tr key={club.id}>
                    <td>{club.name}</td>
                    <td>{club.provinceId}</td>
                    <td>{club.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {error && <p className={styles.emptyState}>No se pudo cargar el listado de cuentas: {error}</p>}
    </>
  );
}
