import Link from 'next/link';
import { communityClubs } from '../../lib/community/communityData';
import CommunityEmptyState from '../../components/CommunityEmptyState';

export const metadata = {
  title: 'Clubes — Atlas del Cultivo Argentino',
  description: 'Clubes cannábicos de todo el país, como espacios educativos y territoriales con cursos, talleres y actividades propias de su provincia.'
};

export default function ClubesPage() {
  return (
    <main className="atlas-page community-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <Link className="crumb" href="/comunidad">Comunidad</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Clubes</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Organizaciones</span>
          <h1>Clubes</h1>
          <p className="atlas-lede">
            Los clubes cannábicos pueden ser protagonistas de esta red: no solo como sponsors, sino
            como espacios educativos y territoriales, con cursos, talleres, charlas y actividades
            propias de su provincia.
          </p>
        </div>
      </section>

      <section className="atlas-section">
        {communityClubs.length === 0 ? (
          <CommunityEmptyState
            title="Todavía no hay clubes documentados"
            description="Esta sección se administra editorialmente, con la misma disciplina de fuente y verificación que el resto del Atlas — no se publican perfiles sin confirmar directamente con cada organización."
          />
        ) : (
          <div className="community-directory-grid">
            {communityClubs.map((club) => (
              <article className="community-directory-card" key={club.id}>
                <h3>{club.name}</h3>
                <p>{club.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
