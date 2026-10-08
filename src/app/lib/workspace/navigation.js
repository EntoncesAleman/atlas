export const WORKSPACE_EVENT = 'atlas:workspace-navigation';
export const PERSONAL_LINKS = [
  { section: 'bitacora', href: '/mi-cultivo?seccion=bitacora', label: 'Bitácora' },
  { section: 'plantas', href: '/mi-cultivo?seccion=plantas', label: 'Mis plantas' },
  { section: 'overview', href: '/mi-cultivo?seccion=overview', label: 'Temporadas' },
  { section: 'lecturas', href: '/mi-cultivo?seccion=lecturas', label: 'Lecturas guardadas' },
  { section: 'clubes', href: '/mi-cultivo?seccion=clubes', label: 'Clubes' },
  { section: 'amigos', href: '/mi-cultivo?seccion=amigos', label: 'Amigos' },
  { section: 'ambiente', href: '/mi-cultivo?seccion=ambiente', label: 'Mi ambiente' },
  { section: 'ajustes', href: '/mi-cultivo?seccion=ajustes', label: 'Perfil y ajustes' },
];
export const CLUB_LINKS = [
  { section: 'actividad', href: '/club?seccion=actividad', label: 'Actividad del club' },
  { section: 'ficha', href: '/club?seccion=ficha', label: 'Ficha del club' },
  { section: 'agenda', href: '/club?seccion=agenda', label: 'Agenda y formación' },
  { section: 'equipo', href: '/club?seccion=equipo', label: 'Equipo' },
  { section: 'bitacora', href: '/mi-cultivo?seccion=bitacora', label: 'Mi bitácora privada' },
  { section: 'ajustes', href: '/mi-cultivo?seccion=ajustes', label: 'Mi perfil' },
];
export function readWorkspaceSection(links, fallback) {
  if (typeof window === 'undefined') return fallback;
  const section = new URLSearchParams(window.location.search).get('seccion');
  return links.some(link => link.section === section) ? section : fallback;
}
export function navigateWithinWorkspace(event, href) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = new URL(href, window.location.origin);
  if (target.pathname !== window.location.pathname) return;
  event.preventDefault();
  window.history.pushState({}, '', target.pathname + target.search);
  window.dispatchEvent(new Event(WORKSPACE_EVENT));
}
