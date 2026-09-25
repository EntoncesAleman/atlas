'use client';

// Capa 1 del shell nuevo (ver docs/CLUB_VISUAL_SYSTEM.md): representa al PRODUCTO completo, no a
// una página puntual. Reemplaza el patrón anterior de cada página reimplementando su propia
// franja superior ("ATLAS DEL CULTIVO ARGENTINO" + breadcrumb) — ahora es un único componente
// compartido, montado en Home / índice del Atlas / Mi Cultivo (las tres superficies de esta fase
// de rediseño; el resto del sitio conserva su encabezado anterior por ahora).
//
// Deliberadamente sin conocimiento de sesión real: Home y el índice del Atlas son Server
// Components sin estado de auth propio. El único lugar con sesión real (Mi Cultivo) pasa
// `accountLabel`/`onSignOut` para reflejarla — en el resto simplemente enlaza a "/mi-cultivo".

import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/atlas', label: 'Explorar' },
  { href: '/atlas/material-de-lectura', label: 'Lecturas' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/comunidad', label: 'Comunidad' },
  { href: '/chatbot', label: 'Buscador' },
];

export default function GlobalHeader({ accountLabel, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="gh">
      <div className="gh-row">
        <Link href="/" className="gh-brand" onClick={() => setMenuOpen(false)}>
          <span className="gh-brand-mark">ATLAS</span>
          <span className="gh-brand-sub">del cultivo argentino</span>
        </Link>

        <nav className="gh-nav" aria-label="Navegación principal">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div className="gh-actions">
          {accountLabel ? (
            <div className="gh-account">
              <span>{accountLabel}</span>
              {onSignOut && <button type="button" onClick={onSignOut}>Salir</button>}
            </div>
          ) : (
            <Link href="/mi-cultivo" className="gh-club-link">Mi Cultivo</Link>
          )}
          <button
            type="button"
            className="gh-menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Abrir navegación"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="gh-nav-mobile" aria-label="Navegación principal (móvil)">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
          {!accountLabel && <Link href="/mi-cultivo" onClick={() => setMenuOpen(false)}>Mi Cultivo</Link>}
        </nav>
      )}
    </header>
  );
}
