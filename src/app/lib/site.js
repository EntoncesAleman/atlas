export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://atlas-one-zeta-43.vercel.app').replace(/\/$/, '');
export const SITE_NAME = 'Atlas del Cultivo Argentino';
export function publicMetadata(path, title, description, image = '/opengraph-image') {
  return {
    title, description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title, description, url: `${SITE_URL}${path}`, siteName: SITE_NAME, locale: 'es_AR', type: 'website', images: [{ url: image, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] }
  };
}
