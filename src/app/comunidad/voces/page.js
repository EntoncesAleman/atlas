import Link from 'next/link';
import { communityVoices } from '../../lib/community/communityData';
import CommunityEmptyState from '../../components/CommunityEmptyState';

export const metadata = {
  title: 'Voces del territorio — Atlas del Cultivo Argentino',
  description: 'Entrevistas con investigadores, clubes, profesionales, educadores y especialistas de distintas provincias.'
};

export default function VocesPage() {
  return (
    <main className="atlas-page community-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <Link className="crumb" href="/comunidad">Comunidad</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Voces del territorio</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Editorial</span>
          <h1>Voces del territorio</h1>
          <p className="atlas-lede">
            Entrevistas con investigadores, clubes, profesionales, educadores y especialistas de
            distintas provincias. Es contenido editorial — nunca publicidad disfrazada de
            entrevista.
          </p>
        </div>
      </section>

      <section className="atlas-section">
        {communityVoices.length === 0 ? (
          <CommunityEmptyState
            title="Todavía no hay entrevistas publicadas"
            description="Cuando existan, cada voz llevará su fuente y contexto igual que cualquier otro contenido del Atlas."
          />
        ) : (
          <div className="community-directory-grid">
            {communityVoices.map((voice) => (
              <article className="community-directory-card" key={voice.id}>
                <h3>{voice.title}</h3>
                <p>{voice.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
