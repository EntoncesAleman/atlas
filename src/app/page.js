import Link from 'next/link';
import GeoSelector from './components/GeoSelector';
import GlobalHeader from './components/shell/GlobalHeader';

export default function HomePage() {
  return (
    <div className="club-shell">
      <GlobalHeader />

      <main className="club-home club-enter">
        <section className="club-hero">
          <div className="club-hero-copy">
            <span className="club-eyebrow">Atlas de cultivo · Argentina</span>
            <h1>
              El cultivo cambia
              <br />
              según dónde estés.
            </h1>
            <p className="club-hero-lede">
              Una guía pública para entender el cultivo a partir de la geografía, el contenido
              regional y el contexto ambiental de cada provincia argentina.
            </p>
            <div className="club-hero-actions">
              <Link className="club-button" href="/mi-cultivo">Entrar a Mi Cultivo</Link>
              <Link className="club-button club-button-outline" href="/atlas">Explorar el Atlas</Link>
            </div>
          </div>

          <div className="club-hero-map">
            <GeoSelector />
          </div>
        </section>
      </main>

      <footer className="club-footer">
        <div className="club-footer-row">
          <Link href="/" className="club-footer-brand">ATLAS DEL CULTIVO ARGENTINO</Link>
          <nav className="club-footer-links">
            <Link href="/sobre-el-proyecto">Sobre el proyecto</Link>
            <Link href="/comunidad">Comunidad</Link>
            <Link href="/creditos">Créditos</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
