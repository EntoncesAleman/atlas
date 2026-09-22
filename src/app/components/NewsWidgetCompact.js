'use client';

// Variante cliente de `NewsWidget.js`, solo para "Mi Cultivo" (que es 100% Client Component por
// su manejo de sesión/estado — no puede importar un Server Component como `NewsWidget.js`
// directamente, que depende de `next/headers`/cookies). Mismo dato real (`news_items`, RLS
// pública), mismas clases CSS (`news-widget-*`, `news-row-*`) para verse idéntico — se duplica
// el fetch mínimo en vez de forzar un Server Component dentro de un árbol cliente.

import { useEffect, useState } from 'react';

const COUNTRY_SCOPE_LABELS = { argentina: 'Argentina', mundo: 'Mundo' };

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function NewsWidgetCompact({ supabase, limit = 4 }) {
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!supabase) {
      setStatus('error');
      return;
    }
    let cancelled = false;
    supabase
      .from('news_items')
      .select('id, title, source_name, source_url, published_at, country_scope')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setStatus('error');
          return;
        }
        setItems(data ?? []);
        setStatus('ready');
      });
    return () => {
      cancelled = true;
    };
  }, [supabase, limit]);

  return (
    <div className="atlas-entry-section news-widget news-widget-compact" aria-label="Noticias relevantes">
      <h2>Noticias relevantes</h2>

      {status === 'loading' && <p className="atlas-section-note">Cargando noticias…</p>}
      {status === 'error' && <p className="atlas-section-note">No se pudieron cargar las noticias en este momento.</p>}
      {status === 'ready' && items.length === 0 && (
        <p className="atlas-section-note">Todavía no hay noticias sincronizadas.</p>
      )}

      {status === 'ready' && items.length > 0 && (
        <ul className="news-row-list">
          {items.map((item) => (
            <li key={item.id} className="news-row">
              <h3 className="news-row-title">{item.title}</h3>
              <div className="news-row-meta">
                <span>{COUNTRY_SCOPE_LABELS[item.country_scope] ?? item.country_scope}</span>
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

      <a className="news-widget-footer-link" href="/noticias">
        Historial de noticias →
      </a>
    </div>
  );
}
