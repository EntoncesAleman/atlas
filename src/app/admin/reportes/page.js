import styles from '../admin.module.css';

export const metadata = { title: 'Datos / reportes — Panel administrador' };

const EXPORTS = [
  { href: '/admin/export/usuarios', label: 'Usuarios', description: 'Todas las cuentas: email, rol, origen, alta, último ingreso, estado de club/suspensión.' },
  { href: '/admin/export/clubes', label: 'Clubes', description: 'Cuentas con rol club o con una solicitud de club (aprobada, pendiente o rechazada).' },
  { href: '/admin/export/suscriptores', label: 'Suscriptores de newsletter', description: 'Email, estado, segmentos y fecha de alta/baja.' },
  { href: '/admin/export/editorial', label: 'Contenido editorial', description: 'Cada entrada del Atlas con su categoría, estado editorial, cantidad de fuentes y relacionadas.' }
];

export default function AdminReportesPage() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Datos / reportes</h1>
        <p>Exportación en CSV (se abre directo en Excel, Sheets o Numbers) de los datos reales del sitio. Sin XLSX todavía — no hacía falta agregar una dependencia nueva solo para eso; se puede sumar más adelante si realmente se necesita el formato binario.</p>
      </div>

      <div className={styles.section}>
        <h2>Exportaciones disponibles</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th>Reporte</th><th>Contenido</th><th></th></tr></thead>
            <tbody>
              {EXPORTS.map((item) => (
                <tr key={item.href}>
                  <td>{item.label}</td>
                  <td>{item.description}</td>
                  <td><a className={styles.smallButton} href={item.href}>Descargar CSV</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
