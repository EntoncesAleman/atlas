'use client';

// Suma una visita a la ficha del club, una sola vez por pestaña. No envía ningún dato de la persona.

import { useEffect } from 'react';

export default function ClubViewBeacon({ slug }) {
  useEffect(() => {
    const key = `atlas:club-view:${slug}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, '1');
    } catch {
      // Sin almacenamiento disponible se cuenta igual.
    }
    fetch('/api/club/visita', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug }), keepalive: true }).catch(() => {});
  }, [slug]);
  return null;
}
