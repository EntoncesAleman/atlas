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

export default function GlobalHeader({ accountLabel, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [activeSection, setActiveSection] = useState('bitacora');
  const [signOutBusy, setSignOutBusy] = useState(false);
  const [signOutError, setSignOutError] = useState('');
  const pathname = usePathname();
  const clubSpace = /^\/club(\/|$)/.test(pathname ?? '');
  const personalSpace = Boolean(user) && (clubSpace || pathname === '/mi-cultivo');
  const links = personalSpace ? (clubSpace ? CLUB_LINKS : PERSONAL_LINKS) : NAV_LINKS;
  const name = (clubSpace ? profile?.club_name : profile?.display_name) || user?.user_metadata?.full_name || user?.user_metadata?.name || 'Mi perfil';
  const isClub = profile?.role === 'club' || profile?.role === 'admin';
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const update = () => setActiveSection(readWorkspaceSection(clubSpace ? CLUB_LINKS : PERSONAL_LINKS, clubSpace ? 'actividad' : 'bitacora'));
    update(); window.addEventListener(WORKSPACE_EVENT, update); window.addEventListener('popstate', update);
    return () => { window.removeEventListener(WORKSPACE_EVENT, update); window.removeEventListener('popstate', update); };
  }, [clubSpace, pathname]);
  useEffect(() => {
    const supabase = getSupabaseClient(); if (!supabase) return;
    let active = true, version = 0;
    const updateUser = async (session) => {
      const requestVersion = ++version;
      if (!active) return;
      setUser(session?.user ?? null); setProfile(null);
      if (!session?.user) return;
      const { data } = await supabase.from('profiles').select('display_name, role, club_name, club_status').eq('id', session.user.id).maybeSingle();
      if (active && version === requestVersion) setProfile(data ?? null);
    };
    supabase.auth.getSession().then(({ data }) => updateUser(data.session)).catch(() => {});
    const { data } = supabase.auth.onAuthStateChange((_event, session) => { setTimeout(() => { void updateUser(session).catch(() => {}); }, 0); });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);
  async function signOut() {
    setSignOutBusy(true); setSignOutError('');
    try {
      if (onSignOut) await onSignOut();
      else { const { error } = await getSupabaseClient().auth.signOut(); if (error) throw error; }
      setUser(null); setProfile(null);
      if (clubSpace) window.location.assign('/mi-cultivo');
    } catch { setSignOutError('No se pudo cerrar la sesión. Probá de nuevo.'); }
    finally { setSignOutBusy(false); }
  }
  const renderLink = (item) => <Link key={item.href} href={item.href} aria-current={personalSpace ? (activeSection === item.section && item.href.startsWith(`${pathname}?`) ? 'page' : undefined) : pathname === item.href ? 'page' : undefined} onClick={(event) => { if (personalSpace) navigateWithinWorkspace(event, item.href); setMenuOpen(false); }}>{item.label}</Link>;
  return <header className={`gh${personalSpace ? ' gh-personal' : ''}`}>
    <div className="gh-row">
      <Link href="/" className="gh-brand" onClick={() => setMenuOpen(false)}><span className="gh-brand-mark">ATLAS</span><span className="gh-brand-sub">del cultivo argentino</span><span className="gh-brand-motto">Cultivo · Territorio · Comunidad</span></Link>
      {personalSpace && <div className="gh-profile-identity"><span className="gh-profile-avatar" aria-hidden="true">{name.trim().slice(0,1).toUpperCase()}</span><div><strong>{name}</strong><span>{clubSpace ? 'Espacio del club' : 'Tu espacio personal'}</span></div></div>}
      <nav className="gh-nav" aria-label={personalSpace ? (clubSpace ? 'Navegación del club' : 'Navegación personal') : 'Navegación principal'}>{links.map(renderLink)}{personalSpace && !clubSpace && isClub && <Link href="/club">Panel de mi club ↗</Link>}</nav>
      <div className="gh-sidebar-note">{personalSpace ? <><span>{clubSpace ? 'Comunidad y territorio' : 'Tu cuaderno privado'}</span><p>{clubSpace ? 'Un lugar para tu organización.' : 'Registrar, recordar y seguir lo que crece.'}</p><Link href="/atlas">Volver al Atlas ↗</Link></> : <><span>Un atlas vivo</span><p>Conocer el territorio.<br />Observar lo que crece.</p></>}</div>
      <div className="gh-actions"><div className="gh-account">{personalSpace ? <button type="button" onClick={signOut} disabled={signOutBusy}>{signOutBusy ? 'Cerrando sesión…' : 'Cerrar sesión'}</button> : <Link href="/mi-cultivo" className="gh-club-link" title={accountLabel ?? user?.email}>Mi Cultivo</Link>}</div><button type="button" className="gh-menu-toggle" aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar navegación' : 'Abrir navegación'} aria-controls="global-mobile-nav" onClick={() => setMenuOpen(open => !open)}><span /><span /><span /></button></div>
      {signOutError && <p role="alert">{signOutError}</p>}
    </div>
    {menuOpen && <nav id="global-mobile-nav" className="gh-nav-mobile" aria-label={personalSpace ? 'Navegación personal (móvil)' : 'Navegación principal (móvil)'} onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false); }}>{links.map(renderLink)}{personalSpace ? <><Link href="/atlas">Volver al Atlas ↗</Link>{isClub && !clubSpace && <Link href="/club">Panel de mi club ↗</Link>}</> : <Link href="/mi-cultivo" onClick={() => setMenuOpen(false)}>Mi Cultivo</Link>}</nav>}
  </header>;
}
