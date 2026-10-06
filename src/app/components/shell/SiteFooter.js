import Link from 'next/link';

export default function SiteFooter() {
  return <footer className="club-footer">
    <div className="club-footer-row">
      <Link href="/" className="club-footer-brand">ATLAS DEL CULTIVO ARGENTINO</Link>
      <nav className="club-footer-links" aria-label="Información del proyecto">
        <Link href="/sobre-el-proyecto">Sobre el proyecto</Link>
        <Link href="/comunidad">Comunidad</Link>
        <Link href="/aportes">Aportes y correcciones</Link>
        <Link href="/privacidad">Privacidad</Link>
        <Link href="/creditos">Créditos</Link>
      </nav>
    </div>
  </footer>;
}
