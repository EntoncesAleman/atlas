export default function HomeSecondaryAccess() {
  return (
    <section className="secondary-access" aria-label="Accesos secundarios">
      <div className="secondary-access-grid">
        <a className="secondary-access-card" href="#">
          <span className="access-icon" aria-hidden="true">◌</span>
          <span className="access-copy">
            <span className="access-title">Biblioteca visual</span>
            <span className="access-text">Imágenes y referencias visuales</span>
          </span>
        </a>

        <a className="secondary-access-card" href="#">
          <span className="access-icon" aria-hidden="true">☼</span>
          <span className="access-copy">
            <span className="access-title">Calendario</span>
            <span className="access-text">Estacionalidad y ciclo</span>
          </span>
        </a>

        <a className="secondary-access-card" href="#">
          <span className="access-icon" aria-hidden="true">⇄</span>
          <span className="access-copy">
            <span className="access-title">Comparador</span>
            <span className="access-text">Provincias y zonas</span>
          </span>
        </a>

        <a className="secondary-access-card" href="#">
          <span className="access-icon" aria-hidden="true">✉</span>
          <span className="access-copy">
            <span className="access-title">Newsletter</span>
            <span className="access-text">Archivo y novedades</span>
          </span>
        </a>
      </div>
    </section>
  );
}
