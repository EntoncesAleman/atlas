import Link from 'next/link';
import {
  communityCourses,
  COURSE_STATUS_LABELS,
  getProvinceLabel,
} from '../../lib/community/communityData';
import CommunityEmptyState from '../../components/CommunityEmptyState';

const MODALITY_LABELS = { PRESENCIAL: 'Presencial', VIRTUAL: 'Virtual', HIBRIDA: 'Híbrida' };

export const metadata = {
  title: 'Formación — Atlas del Cultivo Argentino',
  description: 'Cursos online, talleres y capacitaciones documentadas, con su organizador, docente y modalidad.'
};

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
                <span className="community-card-status">{COURSE_STATUS_LABELS[course.status]}</span>
                <h3>{course.title}</h3>
                <p className="community-card-meta">
                  {MODALITY_LABELS[course.modality]} · {course.duration}
                  {course.provinceId ? ` · ${getProvinceLabel(course.provinceId)}` : ''}
                </p>
                <p>{course.description}</p>
                <p className="community-card-meta">{course.organizer}</p>
                {course.url && (
                  <p className="community-card-link">
                    <a href={course.url} target="_blank" rel="noreferrer">
                      Ver información oficial
                    </a>
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
