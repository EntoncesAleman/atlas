'use client';

// Chip de Noticias para el Context Header — NO forma parte del sistema de Noticias en sí (no
// importa ni modifica `NewsWidget.js`/`NewsWidgetCompact.js`/`lib/news/*`): es un punto de
// entrada nuevo, propio del shell, que hace su propia lectura pública mínima (mismo patrón RLS
// ya establecido — `status = 'published'`, clave anon) solo para mostrar un conteo/titular breve
// y enlazar al historial real en `/noticias`.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '../../lib/supabase/client';
import { IconJournal } from '../icons/DashboardIcons';

export default function NewsChip() {
  const [state, setState] = useState({ status: 'loading', count: 0, latestTitle: '' });

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setState({ status: 'error', count: 0, latestTitle: '' });
      return;
    }
    let cancelled = false;
    supabase
      .from('news_items')
      .select('title', { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(1)
      .then(({ data, count, error }) => {
        if (cancelled) return;
        if (error) {
          setState({ status: 'error', count: 0, latestTitle: '' });
          return;
        }
        setState({ status: 'ready', count: count ?? 0, latestTitle: data?.[0]?.title ?? '' });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = state.status === 'ready'
    ? (state.count > 0 ? `${state.count} publicadas` : 'Sin novedades')
    : state.status === 'error'
      ? 'No disponible'
      : 'Cargando…';

  return (
    <Link href="/noticias" className="club-widget-chip-button">
      <span className="club-widget-chip">
        <IconJournal className="club-widget-chip-icon" />
        <span className="club-widget-chip-body">
          <span className="club-widget-chip-label">Noticias</span>
          <span className="club-widget-chip-value">{value}</span>
        </span>
      </span>
    </Link>
  );
}
