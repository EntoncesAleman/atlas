// Cierre de P1-1 (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md): antes no existía robots.txt.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlas-one-zeta-43.vercel.app';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mi-cultivo', '/admin', '/club']
    },
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}
