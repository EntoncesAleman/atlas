// Layout del panel administrador — Server Component.
//
// `requireRole('admin')` es la comprobación real de permisos (lado servidor, contra la sesión
// verificada y el rol leído de `public.profiles`): si no hay sesión o el rol no alcanza, redirige
// ANTES de renderizar nada de acá, sin que el navegador llegue a recibir un solo byte del panel.
// Es la segunda capa de defensa — `proxy.js` ya corta el acceso a `/admin/*` antes de que la
// request llegue siquiera a este layout; esto cubre el caso de que el middleware falle o se
// desactive por error.
import Link from 'next/link';
import { requireRole } from '../lib/auth/roles';
import styles from './admin.module.css';

export const metadata = {
  title: 'Panel administrador — Atlas del Cultivo Argentino',
  robots: { index: false, follow: false }
};

const NAV_SECTIONS = [
  {
    label: 'General',
    items: [
      { href: '/admin', label: 'Dashboard' }
    ]
  },
  {
    label: 'Personas',
    items: [
      { href: '/admin/usuarios', label: 'Usuarios' },
      { href: '/admin/clubes', label: 'Clubes' },
      { href: '/admin/moderacion', label: 'Moderación' }
    ]
  },
  {
    label: 'Contenido',
    items: [
      { href: '/admin/editorial', label: 'Editorial' },
      { href: '/admin/recursos', label: 'Recursos' },
      { href: '/admin/seo', label: 'SEO' }
    ]
  },
  {
    label: 'Comunicación y datos',
    items: [
      { href: '/admin/newsletter', label: 'Newsletter' },
      { href: '/admin/reportes', label: 'Datos / reportes' }
    ]
  },
  {
    label: 'Plataforma',
    items: [
      { href: '/admin/sistema', label: 'Sistema' }
    ]
  }
];

export default async function AdminLayout({ children }) {
  const { user } = await requireRole('admin');

  return (
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label="Navegación del panel administrador">
        <p className={styles.navBrand}>Panel admin</p>
        <p className={styles.navUser}>{user.email}</p>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <span className={styles.navGroupLabel}>{section.label}</span>
            {section.items.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
        <div className={styles.navBack}>
          <Link href="/atlas" className={styles.navLink}>← Volver al sitio</Link>
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
