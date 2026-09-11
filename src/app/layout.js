import './globals.css';

export const metadata = {
  title: 'Atlas del Cultivo Argentino',
  description: 'Atlas del Cultivo Argentino: información editorial sobre cultivo, clima, geografía y condiciones regionales.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
