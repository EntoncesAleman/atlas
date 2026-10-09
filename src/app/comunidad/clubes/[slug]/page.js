import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publicMetadata } from '../../../lib/site';
import { getPublicClub } from '../../../lib/club/data';
import { COURSE_COST_LABELS, MODALITY_LABELS } from '../../../lib/club/content';
import { EVENT_TYPE_LABELS, getProvinceLabel } from '../../../lib/community/communityData';
import ClubFollowButton from '../../../components/ClubFollowButton';
import ClubViewBeacon from '../../../components/ClubViewBeacon';

// Ficha aprobada por el equipo del Atlas; aprobar cambios también revalida esta página.
export const revalidate = 300;

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function place(item) {
  return [item.locality, getProvinceLabel(item.provinceId)].filter(Boolean).join(', ');
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const club = await getPublicClub(slug);
  if (!club) return { title: 'Club no encontrado — Atlas del Cultivo Argentino' };
  return publicMetadata(`/comunidad/clubes/${club.slug}`, `${club.name} — Clubes del Atlas`, club.description.slice(0, 155));
}

export default async function ClubPage({ params }) {
  const { slug } = await params;
  const club = await getPublicClub(slug);
  if (!club) notFound();

  return (
    <main className="atlas-page community-page">
      <ClubViewBeacon slug={club.slug} />
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <Link className="crumb" href="/comunidad">Comunidad</Link>
          <span className="crumb-sep">/</span>
          <Link className="crumb" href="/comunidad/clubes">Clubes</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{club.name}</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Club · {place(club)}</span>
          <h1>{club.name}</h1>
          <p className="atlas-lede">
            {club.foundedYear ? `Desde ${club.foundedYear} · ` : ''}{club.followers === 1 ? '1 persona lo sigue' : `${club.followers} personas lo siguen`} · Ficha revisada por el equipo del Atlas
          </p>
        </div>
      </section>

      <section className="atlas-section club-public">
        <div className="club-public-about">
          {club.photoUrl && <img src={club.photoUrl} alt={`Foto de ${club.name}`} />}
          <div>
            <p className="club-public-description">{club.description}</p>
            {club.specialties.length > 0 && <ul className="territorial-environments">{club.specialties.map((item) => <li key={item}>{item}</li>)}</ul>}
            <ClubFollowButton clubId={club.id} clubName={club.name} />
          </div>
        </div>
      </section>

      <section className="atlas-section">
        <div className="atlas-entry-section">
          <h2>Próximas actividades</h2>
          {club.events.length === 0 && club.courses.length === 0 ? <p className="atlas-section-note">Este club no tiene actividades próximas publicadas.</p> : (
            <div className="community-directory-grid">
              {club.events.map(({ id, payload }) => (
                <article className="community-directory-card" key={id}>
                  <span className="community-card-status">{EVENT_TYPE_LABELS[payload.type]}</span>
                  <h3>{payload.title}</h3>
                  <p className="community-card-meta">{formatDate(payload.date)}{payload.endDate && payload.endDate !== payload.date ? ` al ${formatDate(payload.endDate)}` : ''} · {place(payload) || MODALITY_LABELS[payload.modality]}</p>
                  <p>{payload.description}</p>
                </article>
              ))}
              {club.courses.map(({ id, payload }) => (
                <article className="community-directory-card" key={id}>
                  <span className="community-card-status">Curso · {COURSE_COST_LABELS[payload.cost]}</span>
                  <h3>{payload.title}</h3>
                  <p className="community-card-meta">Desde el {formatDate(payload.date)} · {payload.duration} · {MODALITY_LABELS[payload.modality]}{payload.capacity ? ` · ${payload.capacity} cupos` : ''}</p>
                  <p>{payload.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        {club.news.length > 0 && (
          <div className="atlas-entry-section">
            <h2>Novedades</h2>
            {club.news.map(({ id, payload, submittedAt }) => (
              <article className="club-public-news" key={id}>
                <span className="community-card-status">{formatDate(submittedAt.slice(0, 10))}</span>
                <h3>{payload.title}</h3>
                <p>{payload.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
