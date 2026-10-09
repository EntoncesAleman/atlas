'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getSupabaseClient } from '../../lib/supabase/client';
import { PERSONAL_LINKS, CLUB_LINKS, WORKSPACE_EVENT, readWorkspaceSection, navigateWithinWorkspace } from '../../lib/workspace/navigation';

const NAV_LINKS = [
  { href: '/atlas', label: 'Explorar' },
  { href: '/atlas/material-de-lectura', label: 'Lecturas' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/comunidad', label: 'Comunidad' },
  { href: '/chatbot', label: 'Buscador' },
  { href: '/lecturas', label: 'Guardadas' },
];

// Acceso corto al espacio personal desde cualquier página del Atlas.
const QUICK_LINKS = PERSONAL_LINKS.filter((item) => ['bitacora', 'plantas', 'ajustes'].includes(item.section));

export default function GlobalHeader({ accountLabel, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [activeSection, setActiveSection] = useState('bitacora');
  const [signOutBusy, setSignOutBusy] = useState(false);
  const [signOutError, setSignOutError] = useState('');
  const pathname = usePathname();
  const clubSpace = /^\/club(\/|$)/.test(pathname ?? '');
  const signedIn = Boolean(user);
  // Espacio propio (Mi Cultivo o el club): el menú completo pasa a ser el del perfil. En el resto
  // del sitio, con sesión, el menú del Atlas se mantiene y suma un acceso corto a ese espacio.
  const personalSpace = signedIn && (clubSpace || pathname === '/mi-cultivo');
  const spaceLinks = personalSpace ? (clubSpace ? CLUB_LINKS : PERSONAL_LINKS) : QUICK_LINKS;
  // El panel de club es solo para cuentas de club; una cuenta admin tiene su propio panel.
  const isClub = profile?.role === 'club';
  const name = (clubSpace ? profile?.club_name : profile?.display_name) || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Mi perfil';
  const initial = name.trim().slice(0, 1).toUpperCase();

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const update = () => setActiveSection(readWorkspaceSection(clubSpace ? CLUB_LINKS : PERSONAL_LINKS, clubSpace ? 'actividad' : 'bitacora'));
    update();
    window.addEventListener(WORKSPACE_EVENT, update);
    window.addEventListener('popstate', update);
    return () => { window.removeEventListener(WORKSPACE_EVENT, update); window.removeEventListener('popstate', update); };
  }, [clubSpace, pathname]);
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) { setSessionReady(true); return; }
    let active = true, version = 0;
    const updateUser = async (session) => {
      const requestVersion = ++version;
      if (!active) return;
      setUser(session?.user ?? null);
      setProfile(null);
      setSessionReady(true);
      if (!session?.user) return;
      const { data } = await supabase.from('profiles').select('display_name, role, club_name, club_status').eq('id', session.user.id).maybeSingle();
      if (active && version === requestVersion) setProfile(data ?? null);
    };
    supabase.auth.getSession().then(({ data }) => updateUser(data.session)).catch(() => { if (active) setSessionReady(true); });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => { setTimeout(() => { void updateUser(session).catch(() => {}); }, 0); });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  async function signOut() {
    setSignOutBusy(true);
    setSignOutError('');
    try {
      if (onSignOut) await onSignOut();
      else { const { error } = await getSupabaseClient().auth.signOut(); if (error) throw error; }
      setUser(null);
      setProfile(null);
      if (clubSpace) window.location.assign('/mi-cultivo');
    } catch { setSignOutError('No se pudo cerrar la sesión. Probá de nuevo.'); }
    finally { setSignOutBusy(false); }
  }

  const spaceLink = (item) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={personalSpace && activeSection === item.section && item.href.startsWith(`${pathname}?`) ? 'page' : undefined}
      onClick={(event) => { if (personalSpace) navigateWithinWorkspace(event, item.href); setMenuOpen(false); }}
    >
      {item.label}
    </Link>
  );
  const atlasLink = (item) => (
    <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</Link>
  );
  const clubLink = signedIn && isClub && !clubSpace && <Link href="/club" onClick={() => setMenuOpen(false)}>Panel de mi club ↗</Link>;
  const signOutButton = (
    <button type="button" className="gh-signout" onClick={signOut} disabled={signOutBusy}>{signOutBusy ? 'Cerrando sesión…' : 'Cerrar sesión'}</button>
  );

  return (
    <header className={`gh${signedIn ? ' gh-signed' : ''}${personalSpace ? ' gh-personal' : ''}`}>
      <div className="gh-row">
        <Link href="/" className="gh-brand" onClick={() => setMenuOpen(false)}>
          <span className="gh-brand-mark">ATLAS</span>
          <span className="gh-brand-sub">del cultivo argentino</span><span className="gh-brand-motto">Cultivo · Territorio · Comunidad</span>
        </Link>

        {signedIn && (
          <Link href="/mi-cultivo?seccion=ajustes" className="gh-profile-identity" title={accountLabel ?? user.email} onClick={(event) => { if (personalSpace) navigateWithinWorkspace(event, '/mi-cultivo?seccion=ajustes'); }}>
            <span className="gh-profile-avatar" aria-hidden="true">{initial}</span>
            <span className="gh-profile-text"><strong>{name}</strong><span>{personalSpace ? (clubSpace ? 'Espacio del club' : 'Tu espacio personal') : 'Sesión iniciada'}</span></span>
          </Link>
        )}

        {signedIn && (
          <nav className="gh-nav gh-nav-space" aria-label={clubSpace ? 'Navegación del club' : 'Tu espacio'}>
            {!personalSpace && <span className="gh-nav-label">Tu espacio</span>}
            {spaceLinks.map(spaceLink)}
            {clubLink}
          </nav>
        )}

        {!personalSpace && (
          <nav className="gh-nav" aria-label="Navegación principal">
            {signedIn && <span className="gh-nav-label">El Atlas</span>}
            {NAV_LINKS.map(atlasLink)}
          </nav>
        )}

        <div className="gh-sidebar-note">
          {personalSpace ? (
            <><span>{clubSpace ? 'Comunidad y territorio' : 'Tu cuaderno privado'}</span><p>{clubSpace ? 'Un lugar para tu organización.' : 'Registrar, recordar y seguir lo que crece.'}</p><Link href="/atlas">Volver al Atlas ↗</Link></>
          ) : (
            <><span>Un atlas vivo</span><p>Conocer el territorio.<br />Observar lo que crece.</p></>
          )}
        </div>

        <div className="gh-actions">
          <div className="gh-account">
            {!sessionReady ? null : signedIn ? (
              <>
                <Link href="/mi-cultivo" className="gh-space-chip"><span className="gh-profile-avatar" aria-hidden="true">{initial}</span>Mi espacio</Link>
                {signOutButton}
              </>
            ) : (
              <>
                <span className="gh-account-hint">No iniciaste sesión</span>
                <Link href="/mi-cultivo" className="gh-club-link">Ingresar</Link>
              </>
            )}
          </div>
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
        {signOutError && <p role="alert">{signOutError}</p>}
      </div>

      {menuOpen && (
        <nav id="global-mobile-nav" className="gh-nav-mobile" aria-label="Navegación (móvil)" onKeyDown={(event) => { if (event.key === 'Escape') setMenuOpen(false); }}>
          {signedIn && <span className="gh-nav-label">{name} · tu espacio</span>}
          {signedIn && spaceLinks.map(spaceLink)}
          {clubLink}
          {personalSpace ? <Link href="/atlas">Volver al Atlas ↗</Link> : <>{signedIn && <span className="gh-nav-label">El Atlas</span>}{NAV_LINKS.map(atlasLink)}</>}
          {signedIn ? signOutButton : <Link href="/mi-cultivo" onClick={() => setMenuOpen(false)}>Ingresar o crear cuenta</Link>}
        </nav>
      )}
    </header>
  );
}
