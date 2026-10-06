import { Suspense } from 'react';
import { publicMetadata } from '../lib/site';
import Link from 'next/link';
import CategoryShowcase from '../components/CategoryShowcase';
import PartnersStrip from '../components/PartnersStrip';
import ProvinceStatusBar from '../components/ProvinceStatusBar';
import EnvironmentalPanel from '../components/EnvironmentalPanel';
import NewsWidget from '../components/NewsWidget';
import RegionalIntro from '../components/RegionalIntro';
import { getEntries, getCategoryById } from '../lib/editorial/registry';
import ContextHeader from '../components/shell/ContextHeader';

export const metadata = publicMetadata('/atlas', 'El Atlas — Atlas del Cultivo Argentino', 'Índice editorial del Atlas: una navegación por categorías para recorrer el cultivo como sistema geográfico, ambiental y cultural.');

export default function AtlasIndexPage() {
  const regionalIds = ['diferencias-agroclimaticas-regiones-argentinas', 'fotoperiodo-segun-latitud-argentina', 'heladas'];
  const readings = getEntries().filter(entry => regionalIds.includes(entry.id)).map(entry => ({ id: entry.id, title: entry.title, url: `/atlas/${getCategoryById(entry.categoryId).slug}/${entry.slug}` }));
  return (
    <div className="club-shell">
      <ContextHeader kicker="Índice editorial" title="El Atlas" />

      <main className="club-atlas-index club-enter">
        <p className="club-atlas-lede">
          Una navegación editorial para recorrer el cultivo como sistema geográfico, ambiental y
          cultural.
        </p>
        <ProvinceStatusBar />
        <RegionalIntro readings={readings} />
        <form action="/chatbot" className="atlas-public-search"><label htmlFor="atlas-query">Buscar en el Atlas</label><div><input id="atlas-query" name="q" type="search" placeholder="Tema, palabra o pregunta" required /><button type="submit" className="club-button">Buscar</button></div></form>

        <section className="club-atlas-section">
          <EnvironmentalPanel />
        </section>

        <section className="club-atlas-section">
          <CategoryShowcase showHeading={false} />
        </section>

        <Suspense fallback={<p role="status">Cargando noticias…</p>}><NewsWidget /></Suspense>

        <section className="club-atlas-section club-community-promo">
          <Link className="community-promo-card" href="/comunidad">
            <span className="atlas-related-type">Comunidad</span>
            <span className="community-promo-title">Clubes, agenda, formación y voces del territorio</span>
            <p className="community-promo-description">
              Una red de conocimiento aparte del contenido enciclopédico del Atlas: organizaciones,
              actividad regional y entrevistas de distintas provincias.
            </p>
            <span className="atlas-related-arrow">↗</span>
          </Link>
        </section>

        <PartnersStrip />
      </main>
    </div>
  );
}
