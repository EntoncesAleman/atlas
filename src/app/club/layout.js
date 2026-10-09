// `requireClubAccess()` es la comprobación real del lado servidor: entra la cuenta del club y los
// integrantes activos de su equipo. El proxy ya corta el acceso antes de llegar acá; este layout
// es la segunda capa.
import { requireClubAccess } from '../lib/club/context';

export const metadata = {
  title: 'Panel de club — Atlas del Cultivo Argentino',
  robots: { index: false, follow: false }
};

export default async function ClubLayout({ children }) {
  await requireClubAccess();

  // El menú lateral del club lo arma GlobalHeader (ver `CLUB_LINKS`).
  return <main>{children}</main>;
}
