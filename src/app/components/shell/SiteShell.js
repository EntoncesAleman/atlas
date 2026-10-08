'use client';

import { usePathname } from 'next/navigation';
import GlobalHeader from './GlobalHeader';
import SiteFooter from './SiteFooter';
import useAtlasLocation from '../../lib/hooks/useAtlasLocation';
import { getRegionalIdentity } from '../../lib/geo/regionalIdentity';

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const { provinceId } = useAtlasLocation();
  const region = getRegionalIdentity(provinceId);
  const privatePanel = /^\/(admin|club)(\/|$)/.test(pathname ?? '');
  return <div className={privatePanel ? undefined : 'field-atlas'} style={!privatePanel && region ? { '--field-banner-image': `url("${region.banner}")` } : undefined}>
    <a href="#site-content" className="skip-link">Ir al contenido</a>
    {!privatePanel && <GlobalHeader />}
    <div id="site-content" tabIndex={-1}>{children}</div>
    {!privatePanel && <SiteFooter />}
  </div>;
}
