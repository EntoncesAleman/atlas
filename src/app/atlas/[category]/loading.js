// Cierre de P3-2 (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md): esqueleto de carga para esta
// ruta dinámica. Impacto real bajo (los datos son estáticos en memoria, sin espera de red), pero
// completa la convención de Next.js que faltaba. Reutiliza las clases reales de la página
// (`atlas-topbar`, `atlas-category-hero`, `atlas-entry-grid`) para que el esqueleto tenga
// aproximadamente la misma forma que el contenido real, sin duplicar el layout.
export default function CategoryLoading() {
  return (
    <main className="atlas-page category-page" aria-busy="true" aria-label="Cargando categoría">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
      </section>

      <section className="atlas-category-hero">
        <div className="atlas-category-hero-copy">
          <div className="atlas-skeleton-line" style={{ width: '35%' }} />
          <div className="atlas-skeleton-line" style={{ height: 36, width: '60%' }} />
          <div className="atlas-skeleton-line" style={{ width: '90%' }} />
          <div className="atlas-skeleton-line" style={{ width: '75%' }} />
        </div>
        <div className="atlas-category-media">
          <div className="atlas-skeleton-block" style={{ width: '100%', height: 360 }} />
        </div>
      </section>

      <section className="atlas-section">
        <div className="atlas-entry-grid">
          {[0, 1, 2].map((index) => (
            <article className="atlas-entry-card" key={index}>
              <div className="atlas-entry-card-media">
                <div className="atlas-skeleton-block" style={{ width: '100%', height: 180 }} />
              </div>
              <div className="atlas-entry-card-body">
                <div className="atlas-skeleton-line" style={{ width: '40%' }} />
                <div className="atlas-skeleton-line" style={{ height: 20, width: '80%' }} />
                <div className="atlas-skeleton-line" style={{ width: '95%' }} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
