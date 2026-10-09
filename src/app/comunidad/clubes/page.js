import { publicMetadata } from '../../lib/site';
import Link from 'next/link';
import { communityClubs, getProvinceLabel } from '../../lib/community/communityData';
import { listPublicClubs } from '../../lib/club/data';
import CommunityEmptyState from '../../components/CommunityEmptyState';

export const metadata = publicMetadata('/comunidad/clubes', 'Clubes — Atlas del Cultivo Argentino', 'Clubes cannábicos de todo el país, como espacios educativos y territoriales con cursos, talleres y actividades propias de su provincia.');

// Las fichas aprobadas se leen de la base; aprobar una también revalida esta página.
export const revalidate = 300;

export default async function ClubesPage() {
  const clubs = await listPublicClubs();
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
        {clubs.length === 0 && communityClubs.length === 0 ? (
          <CommunityEmptyState
            title="Todavía no hay clubes publicados"
            description="Cada ficha la completa el propio club desde su cuenta y se publica después de una revisión del equipo del Atlas."
          />
        ) : (
          <div className="community-directory-grid">
            {clubs.map((club) => (
              <article className="community-directory-card club-directory-card" key={club.id}>
                {club.photoUrl && <img src={club.photoUrl} alt="" loading="lazy" />}
                <span className="community-card-status">{[club.locality, getProvinceLabel(club.provinceId)].filter(Boolean).join(', ')}</span>
                <h3><Link href={`/comunidad/clubes/${club.slug}`}>{club.name}</Link></h3>
                <p>{club.description.length > 180 ? `${club.description.slice(0, 180)}…` : club.description}</p>
              </article>
            ))}
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
