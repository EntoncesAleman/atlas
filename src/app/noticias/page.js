import Link from 'next/link';
import { getServerSupabaseClient } from '../lib/supabase/server';
import { NEWS_CATEGORIES, NEWS_COUNTRY_SCOPES } from '../lib/news/sources';

// Historial permanente de Noticias — consigna explícita: "debe consultar Supabase directamente
// y no depender solo del último lote sincronizado". Por eso esta página nunca lee del resultado
// de una corrida del ejecutor: siempre hace su propia consulta a `news_items` con los filtros
// pedidos, cada vez que se visita. RLS (`news_items_select_public`) ya deja fuera lo "hidden";
// acá se pueden ver `published` y `archived` — lo archivado sigue siendo historial válido, solo
// dejó de ser "reciente" para el widget de `/atlas`.

export const metadata = {
  title: 'Historial de noticias — Atlas del Cultivo Argentino',
  description: 'Todas las noticias publicadas en el Atlas, con filtro por país y categoría.'
};

const COUNTRY_SCOPE_LABELS = { argentina: 'Argentina', mundo: 'Mundo' };
const CATEGORY_LABELS = {
  'marco-legal': 'Marco legal',
  industria: 'Industria',
  investigacion: 'Investigación',
  cultivo: 'Cultivo',
  institucional: 'Institucional'
};
const PAGE_SIZE = 20;

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default async function NoticiasHistorialPage({ searchParams }) {
  const params = await searchParams;
  const scope = NEWS_COUNTRY_SCOPES.includes(params?.scope) ? params.scope : '';
  const category = NEWS_CATEGORIES.includes(params?.category) ? params.category : '';
  const sort = params?.sort === 'asc' ? 'asc' : 'desc';
  const page = Math.max(1, Number.parseInt(params?.page, 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await getServerSupabaseClient();
  let query = supabase
    ? supabase.from('news_items').select('id, title, summary, source_name, source_url, published_at, country_scope, category', { count: 'exact' }).in('status', ['published', 'archived'])
    : null;

  if (query && scope) query = query.eq('country_scope', scope);
  if (query && category) query = query.eq('category', category);

  const { data, count } = query
    ? await query.order('published_at', { ascending: sort === 'asc' }).range(from, to)
    : { data: [], count: 0 };

  const items = data ?? [];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function buildHref(overrides) {
    const next = new URLSearchParams();
    if (scope) next.set('scope', scope);
    if (category) next.set('category', category);
    if (sort !== 'desc') next.set('sort', sort);
    if (page > 1) next.set('page', String(page));
    Object.entries(overrides).forEach(([key, value]) => {
      if (value === null || value === '') next.delete(key);
      else next.set(key, String(value));
    });
    const qs = next.toString();
    return qs ? `/noticias?${qs}` : '/noticias';
  }

  return (
    <main className="atlas-page noticias-historial-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <Link className="crumb" href="/atlas">Atlas</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Noticias</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Historial</span>
          <h1>Historial de noticias</h1>
          <p className="atlas-lede">Todas las noticias publicadas en el Atlas, ordenadas por fecha.</p>
        </div>
      </section>

      <section className="atlas-section">
        <form className="news-filters" method="get">
          <select name="scope" defaultValue={scope}>
            <option value="">Argentina y Mundo</option>
            {NEWS_COUNTRY_SCOPES.map((value) => (
              <option key={value} value={value}>{COUNTRY_SCOPE_LABELS[value]}</option>
            ))}
          </select>
          <select name="category" defaultValue={category}>
            <option value="">Todas las categorías</option>
            {NEWS_CATEGORIES.map((value) => (
              <option key={value} value={value}>{CATEGORY_LABELS[value] ?? value}</option>
            ))}
          </select>
          <select name="sort" defaultValue={sort}>
            <option value="desc">Más recientes primero</option>
            <option value="asc">Más antiguas primero</option>
          </select>
          <button type="submit" className="secondary-button">Filtrar</button>
        </form>

        {items.length === 0 ? (
          <p className="news-widget-empty">No hay noticias que coincidan con estos filtros.</p>
        ) : (
          <ul className="news-widget-list news-historial-list">
            {items.map((item) => (
              <li key={item.id} className="news-card">
                <span className={`news-card-scope news-card-scope-${item.country_scope}`}>
                  {COUNTRY_SCOPE_LABELS[item.country_scope] ?? item.country_scope}
                </span>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-card-summary">{item.summary}</p>
                <div className="news-card-meta">
                  <span>{item.source_name}</span>
                  <span>{CATEGORY_LABELS[item.category] ?? item.category}</span>
                  <span>{formatDate(item.published_at)}</span>
                  <a href={item.source_url} target="_blank" rel="noopener noreferrer nofollow">
                    Ver fuente ↗
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <nav className="news-pagination" aria-label="Paginación de noticias">
            {page > 1 && <Link href={buildHref({ page: page - 1 })}>← Más recientes</Link>}
            <span>Página {page} de {totalPages}</span>
            {page < totalPages && <Link href={buildHref({ page: page + 1 })}>Más antiguas →</Link>}
          </nav>
        )}
      </section>
    </main>
  );
}
