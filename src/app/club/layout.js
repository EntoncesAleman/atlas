// Igual que `/admin/layout.js`: `requireRole('club')` es la comprobación real del lado servidor
// (una cuenta 'admin' también pasa, por rango — ver ROLE_RANK en lib/auth/roles.js). El
// proxy ya corta el acceso antes de llegar acá; este layout es la segunda capa.
import Link from 'next/link';
import { requireRole } from '../lib/auth/roles';

export const metadata = {
  title: 'Panel de club — Atlas del Cultivo Argentino',
  robots: { index: false, follow: false }
};

export default async function ClubLayout({ children }) {
  await requireRole('club');

  return (
    <main className="atlas-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Panel de club</span>
        </nav>
      </section>
      {children}
    </main>
  );
}
