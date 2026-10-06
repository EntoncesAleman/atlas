import './globals.css';
import SiteShell from './components/shell/SiteShell';
import { SITE_URL } from './lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Atlas del Cultivo Argentino',
  description: 'Atlas del Cultivo Argentino: información editorial sobre cultivo, clima, geografía y condiciones regionales.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
