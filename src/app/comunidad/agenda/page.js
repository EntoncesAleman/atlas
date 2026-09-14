import Link from 'next/link';
import { communityEvents } from '../../lib/community/communityData';
import CommunityEmptyState from '../../components/CommunityEmptyState';

export default function AgendaPage() {
  return (
    <main className="atlas-page community-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <Link className="crumb" href="/comunidad">Comunidad</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Agenda</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Actividad</span>
          <h1>Agenda</h1>
          <p className="atlas-lede">
            Cursos, talleres, charlas, jornadas y encuentros organizados por provincia y fecha.
            Cuando tengas una provincia elegida en Inicio, esta agenda prioriza su actividad
            territorial — sin ubicación exacta, sin pedir nada además de lo que ya elegiste.
          </p>
        </div>
      </section>

      <section className="atlas-section">
        {communityEvents.length === 0 ? (
          <CommunityEmptyState
            title="Todavía no hay actividades documentadas"
            description="No se inventa ningún evento: esta agenda solo muestra actividad real, con su organizador, fecha y fuente verificable."
          />
        ) : (
          <div className="community-directory-grid">
            {communityEvents.map((event) => (
              <article className="community-directory-card" key={event.id}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
