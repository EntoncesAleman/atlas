import Link from 'next/link';
import { communityCourses } from '../../lib/community/communityData';
import CommunityEmptyState from '../../components/CommunityEmptyState';

export default function FormacionPage() {
  return (
    <main className="atlas-page community-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <Link className="crumb" href="/comunidad">Comunidad</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Formación</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Educación</span>
          <h1>Formación</h1>
          <p className="atlas-lede">
            Cursos online, talleres y capacitaciones documentadas, con su organizador, docente y
            modalidad. Esta es una primera etapa de directorio y presentación — no un campus
            virtual (LMS) con inscripción ni seguimiento propio.
          </p>
        </div>
      </section>

      <section className="atlas-section">
        {communityCourses.length === 0 ? (
          <CommunityEmptyState
            title="Todavía no hay cursos documentados"
            description="La información comercial y la información editorial se mantienen diferenciadas: ningún curso se lista sin confirmar organizador, modalidad y fuente."
          />
        ) : (
          <div className="community-directory-grid">
            {communityCourses.map((course) => (
              <article className="community-directory-card" key={course.id}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
