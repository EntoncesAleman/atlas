import Link from 'next/link';
import GeoSelector from './components/GeoSelector';

export default function HomePage() {
  return (
    <div className="site-shell home-shell">
      <header className="site-header home-header">
        <a className="brand" href="/" aria-label="Atlas del Cultivo Argentino">
          <span className="brand-mark">ARG</span>
          <span className="brand-copy">
            <span className="brand-title">Atlas del Cultivo Argentino</span>
            <span className="brand-subtitle">Geografía · Clima · Contenido</span>
          </span>
        </a>
      </header>

      <main className="page home-page home-page-entry">
        <section className="home-intro">
          <div className="home-intro-copy">
            <span className="section-label">Atlas de cultivo / Argentina</span>
            <h1>El cultivo cambia según dónde estés.</h1>
            <p className="hero-lede">Una guía pública para entender cultivo a partir de la geografía, el contenido regional y el contexto ambiental de Argentina.</p>

            <div className="hero-actions">
              <Link className="primary-button" href="/mi-cultivo">
                Ingresar
              </Link>
              <Link className="secondary-button" href="/atlas">
                Explorar el Atlas
              </Link>
            </div>
          </div>

          <aside className="hero-panel">
            <GeoSelector />
          </aside>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <a className="brand footer-brand" href="#">
            <span className="brand-mark small">ARG</span>
            <span className="brand-copy">
              <span className="brand-title">Atlas del Cultivo Argentino</span>
            </span>
          </a>
          <nav className="footer-links">
            <a href="/sobre-el-proyecto">Sobre el proyecto</a>
            <a href="/comunidad">Comunidad</a>
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="/creditos">Créditos</a>
            <a href="#">Mapa</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
