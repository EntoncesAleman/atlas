import Link from 'next/link';
import { getServerSupabaseClient } from '../lib/supabase/server';

// Widget público de Noticias del Atlas — vive en `/atlas` como una sección más (igual patrón
// que `PartnersStrip`/`EnvironmentalPanel`: un `<section className="atlas-section">` agregado,
// nunca dentro de `CategoryShowcase`, que sigue siendo la grilla editorial de categorías sin
// tocar). Muestra solo lo más reciente; el archivo completo vive en `/noticias` (historial).
//
// Lectura pública: `getServerSupabaseClient()` con la clave anon — el acceso real lo sigue
// controlando RLS (`news_items_select_public`, que ya excluye `hidden`), mismo criterio que el
// resto de la app (ver `lib/supabase/server.js`). No hace falta el cliente admin para esto.

const COUNTRY_SCOPE_LABELS = { argentina: 'Argentina', mundo: 'Mundo' };

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default async function NewsWidget() {
  const supabase = await getServerSupabaseClient();
  const { data } = supabase
    ? await supabase
        .from('news_items')
        .select('id, title, summary, source_name, source_url, published_at, country_scope')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(6)
    : { data: null };

  const items = data ?? [];

  return (
    <section className="atlas-section news-widget" aria-label="Noticias del Atlas">
      <div className="news-widget-header">
        <span className="section-label dark-label">Noticias</span>
        <h2>Novedades del cultivo, en Argentina y el mundo</h2>
      </div>

      {items.length === 0 ? (
        <p className="news-widget-empty">Todavía no hay noticias sincronizadas.</p>
      ) : (
        <ul className="news-widget-list">
          {items.map((item) => (
            <li key={item.id} className="news-card">
              <span className={`news-card-scope news-card-scope-${item.country_scope}`}>
                {COUNTRY_SCOPE_LABELS[item.country_scope] ?? item.country_scope}
              </span>
              <h3 className="news-card-title">{item.title}</h3>
              <p className="news-card-summary">{item.summary}</p>
              <div className="news-card-meta">
                <span>{item.source_name}</span>
                <span>{formatDate(item.published_at)}</span>
                <a href={item.source_url} target="_blank" rel="noopener noreferrer nofollow">
                  Ver fuente ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link className="news-widget-footer-link" href="/noticias">
        Historial de noticias →
      </Link>
    </section>
  );
}
