'use client';

import { usePathname } from 'next/navigation';
import GlobalHeader from './GlobalHeader';
import SiteFooter from './SiteFooter';

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const privatePanel = /^\/(admin|club)(\/|$)/.test(pathname ?? '');
  return <>
    <a href="#site-content" className="skip-link">Ir al contenido</a>
    {!privatePanel && <GlobalHeader />}
    <div id="site-content" tabIndex={-1}>{children}</div>
    {!privatePanel && <SiteFooter />}
  </>;
}
