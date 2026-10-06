'use client';

// Shared public navigation. Session only changes the account link; reading stays public.

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getSupabaseClient } from '../../lib/supabase/client';

const NAV_LINKS = [
  { href: '/atlas', label: 'Explorar' },
  { href: '/atlas/material-de-lectura', label: 'Lecturas' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/comunidad', label: 'Comunidad' },
  { href: '/chatbot', label: 'Buscador' },
  { href: '/lecturas', label: 'Guardadas' },
];

export default function GlobalHeader({ accountLabel, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionLabel, setSessionLabel] = useState(null);
  const pathname = usePathname();
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSessionLabel(data.session?.user.email ?? null);
    }).catch(() => {});
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setSessionLabel(session?.user.email ?? null);
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);
  const label = accountLabel ?? sessionLabel;

  return (
    <header className="gh">
      <div className="gh-row">
        <Link href="/" className="gh-brand" onClick={() => setMenuOpen(false)}>
          <span className="gh-brand-mark">ATLAS</span>
          <span className="gh-brand-sub">del cultivo argentino</span>
        </Link>

        <nav className="gh-nav" aria-label="Navegación principal">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>
          ))}
        </nav>

        <div className="gh-actions">
          {label ? (
            <div className="gh-account">
              <Link href="/mi-cultivo" className="gh-club-link" title={label}>Mi Cultivo</Link>
              {onSignOut && <button type="button" onClick={onSignOut}>Salir</button>}
            </div>
          ) : (
            <Link href="/mi-cultivo" className="gh-club-link">Mi Cultivo</Link>
          )}
          <button
            type="button"
            className="gh-menu-toggle"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
            aria-controls="global-mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="global-mobile-nav" className="gh-nav-mobile" aria-label="Navegación principal (móvil)" onKeyDown={(event) => { if (event.key === 'Escape') setMenuOpen(false); }}>
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
          <Link href="/mi-cultivo" onClick={() => setMenuOpen(false)}>Mi Cultivo</Link>
        </nav>
      )}
    </header>
  );
}
