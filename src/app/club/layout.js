// Igual que `/admin/layout.js`: `requireRole('club')` es la comprobación real del lado servidor
// (una cuenta 'admin' también pasa, por rango — ver ROLE_RANK en lib/auth/roles.js). El
// proxy ya corta el acceso antes de llegar acá; este layout es la segunda capa.
import { requireRole } from '../lib/auth/roles';

export const metadata = {
  title: 'Panel de club — Atlas del Cultivo Argentino',
  robots: { index: false, follow: false }
};

export default async function ClubLayout({ children }) {
  await requireRole('club');

  // El menú lateral del club lo arma GlobalHeader (ver `CLUB_LINKS`).
  return <main>{children}</main>;
}
