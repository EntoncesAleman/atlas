import Link from 'next/link';
import { getFeaturedClub } from '../lib/community/communityData';
import CommunityEmptyState from '../components/CommunityEmptyState';

export const metadata = {
  title: 'Comunidad — Atlas del Cultivo Argentino',
  description: 'Clubes, investigadores, universidades y educadores de distintas provincias: un directorio editorial y territorial aparte del contenido enciclopédico del Atlas.'
};

const SECTIONS = [
  {
    slug: 'clubes',
    type: 'Organizaciones',
    title: 'Clubes',
    description: 'Clubes cannábicos de todo el país, con su actividad territorial y educativa.',
  },
  {
    slug: 'agenda',
    type: 'Actividad',
    title: 'Agenda',
    description: 'Cursos, talleres, charlas y encuentros organizados por provincia y fecha.',
  },
  {
    slug: 'formacion',
    type: 'Educación',
    title: 'Formación',
    description: 'Cursos online, talleres y capacitaciones documentadas, con su organizador y modalidad.',
  },
  {
    slug: 'voces',
    type: 'Editorial',
    title: 'Voces del territorio',
    description: 'Entrevistas con investigadores, clubes, profesionales y educadores de distintas provincias.',
  },
];

export default function ComunidadPage() {
  const featuredClub = getFeaturedClub();

  return (
    <main className="atlas-page community-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Comunidad</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Comunidad</span>
          <h1>Conocimiento y territorio, en red</h1>
          <p className="atlas-lede">
            El Atlas no construye este conocimiento solo. Clubes, investigadores, universidades,
            profesionales, asociaciones y educadores de distintas provincias pueden aportar lo que
            difícilmente aparece en una guía nacional genérica. Esta sección es un directorio
            editorial y territorial — no una red social — administrado con el mismo criterio de
            fuente y verificación que el resto del Atlas.
          </p>
        </div>
      </section>

      <section className="atlas-section">
        <div className="section-heading">
          <div>
            <span className="section-label dark-label">Explorar</span>
            <h2>Comunidad</h2>
          </div>
        </div>
        <div className="atlas-related-grid community-hub-grid">
          {SECTIONS.map((section) => (
            <Link key={section.slug} className="atlas-related-card" href={`/comunidad/${section.slug}`}>
              <span className="atlas-related-type">{section.type}</span>
              <span className="atlas-related-title">{section.title}</span>
              <p className="community-hub-card-description">{section.description}</p>
              <span className="atlas-related-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="atlas-section">
        <div className="section-heading">
          <div>
            <span className="section-label dark-label">Editorial rotativo</span>
            <h2>Club destacado</h2>
          </div>
        </div>
        {featuredClub ? (
          <article className="community-directory-card community-featured-club">
            <h3>{featuredClub.name}</h3>
            <p>{featuredClub.description}</p>
          </article>
        ) : (
          <CommunityEmptyState
            title="Todavía no hay un club destacado"
            description="Este espacio no es un ranking — es un lugar editorial rotativo para la historia, actividad o proyecto de un club por vez, cuando exista contenido documentado para mostrar."
          />
        )}
      </section>
    </main>
  );
}
