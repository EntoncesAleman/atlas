// Cierre de P3-2 (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md): esqueleto de carga para esta
// ruta dinámica. Impacto real bajo (los datos son estáticos en memoria, sin espera de red), pero
// completa la convención de Next.js que faltaba. Reutiliza las clases reales de la página
// (`atlas-entry-hero`, `atlas-entry-content-wrap`, `atlas-entry-aside`) para que el esqueleto
// tenga aproximadamente la misma forma que el contenido real, sin duplicar el layout.
export default function EntryLoading() {
  return (
    <main className="atlas-page entry-page" aria-busy="true" aria-label="Cargando entrada">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
      </section>

      <section className="atlas-entry-hero">
        <div className="atlas-entry-hero-copy">
          <div className="atlas-skeleton-line" style={{ width: '30%' }} />
          <div className="atlas-skeleton-line" style={{ height: 36, width: '70%' }} />
          <div className="atlas-skeleton-line" style={{ width: '90%' }} />
        </div>
        <div className="atlas-entry-media">
          <div className="atlas-skeleton-block" style={{ width: '100%', height: 360 }} />
        </div>
      </section>

      <section className="atlas-entry-content-wrap">
        <article className="atlas-entry-content">
          <div className="atlas-entry-content-body">
            <div className="atlas-skeleton-line" style={{ width: '100%' }} />
            <div className="atlas-skeleton-line" style={{ width: '95%' }} />
            <div className="atlas-skeleton-line" style={{ width: '85%' }} />
            <div className="atlas-skeleton-line" style={{ width: '92%' }} />
            <div className="atlas-skeleton-line" style={{ width: '70%' }} />
          </div>
        </article>
        <aside className="atlas-entry-aside">
          <div className="atlas-skeleton-line" style={{ width: '60%' }} />
          <div className="atlas-skeleton-line" style={{ width: '80%' }} />
          <div className="atlas-skeleton-line" style={{ width: '50%' }} />
        </aside>
      </section>
    </main>
  );
}
