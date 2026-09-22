import Link from 'next/link';
import { getServerSupabaseClient } from '../lib/supabase/server';

// Widget público de Noticias del Atlas — vive en `/atlas` como una sección más (igual patrón
// que `PartnersStrip`/`EnvironmentalPanel`: un `<section className="atlas-section">` agregado,
// nunca dentro de `CategoryShowcase`, que sigue siendo la grilla editorial de categorías sin
// tocar), y en una variante compacta (`compact`) dentro de "Mi Cultivo". El archivo completo
// vive en `/noticias` (historial).
//
// Diseño: dos columnas editoriales (Argentina primero, Mundo después) en vez de una grilla
// uniforme de tarjetas — refleja la prioridad pedida ("noticias relevantes para Argentina")
// como jerarquía visual real, no solo como orden de filas dentro de una misma lista. Solo la
// noticia principal de Argentina lleva imagen (cuando existe): el resto es una lista de
// titulares con metadato, más cerca de una portada de diario que de un feed de tarjetas
// repetidas.
//
// Lectura pública: `getServerSupabaseClient()` con la clave anon — el acceso real lo sigue
// controlando RLS (`news_items_select_public`, que ya excluye `hidden`), mismo criterio que el
// resto de la app (ver `lib/supabase/server.js`). No hace falta el cliente admin para esto.

const COUNTRY_SCOPE_LABELS = { argentina: 'Argentina', mundo: 'Mundo' };

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function NewsRow({ item, lead = false }) {
  return (
    <li className={`news-row ${lead ? 'news-row-lead' : ''}`}>
      {lead && item.image_url && (
        <img className="news-row-image" src={item.image_url} alt="" />
      )}
      <h3 className="news-row-title">{item.title}</h3>
      {lead && item.summary && <p className="news-row-summary">{item.summary}</p>}
      <div className="news-row-meta">
        <span>{item.source_name}</span>
        <span>{formatDate(item.published_at)}</span>
        <a href={item.source_url} target="_blank" rel="noopener noreferrer nofollow">
          Ver fuente ↗
        </a>
      </div>
    </li>
  );
}

export default async function NewsWidget({ limit = 8, compact = false }) {
  const supabase = await getServerSupabaseClient();
  const { data } = supabase
    ? await supabase
        .from('news_items')
        .select('id, title, summary, source_name, source_url, published_at, country_scope, image_url')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit)
    : { data: null };

  const items = data ?? [];
  const argentina = items.filter((item) => item.country_scope === 'argentina');
  const mundo = items.filter((item) => item.country_scope === 'mundo');

  return (
    <section className={`atlas-section news-widget ${compact ? 'news-widget-compact' : ''}`} aria-label="Noticias del Atlas">
      <div className="news-widget-header">
        <span className="section-label dark-label">Noticias</span>
        {!compact && <h2>Novedades del cultivo, en Argentina y el mundo</h2>}
      </div>

      {items.length === 0 ? (
        <p className="news-widget-empty">Todavía no hay noticias sincronizadas.</p>
      ) : (
        <div className="news-widget-columns">
          {argentina.length > 0 && (
            <div className="news-widget-column">
              <span className="news-widget-column-label">{COUNTRY_SCOPE_LABELS.argentina}</span>
              <ul className="news-row-list">
                {argentina.map((item, index) => (
                  <NewsRow key={item.id} item={item} lead={!compact && index === 0} />
                ))}
              </ul>
            </div>
          )}
          {mundo.length > 0 && (
            <div className="news-widget-column">
              <span className="news-widget-column-label">{COUNTRY_SCOPE_LABELS.mundo}</span>
              <ul className="news-row-list">
                {mundo.map((item) => (
                  <NewsRow key={item.id} item={item} />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <Link className="news-widget-footer-link" href="/noticias">
        Historial de noticias →
      </Link>
    </section>
  );
}
