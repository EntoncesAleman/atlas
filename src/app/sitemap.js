import { getCategories, getEntries } from './lib/editorial/registry';

// `NEXT_PUBLIC_SITE_URL` no estaba definida en ningún lado del proyecto (ni .env.local ni
// MASTER_PACKAGE) — se usa como override si en algún momento se configura un dominio propio,
// y como fallback la URL de Vercel ya conocida para este proyecto. Cierre de P1-1
// (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md): antes no existía ningún sitemap.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlas-one-zeta-43.vercel.app';

// Rutas públicas indexables únicamente. `/mi-cultivo` queda afuera a propósito (ya marcada
// noindex en su layout — ver 11_SEO.md, "rutas privadas se marcan noindex explícitamente").
const STATIC_ROUTES = [
  '',
  '/atlas',
  '/comunidad',
  '/comunidad/clubes',
  '/comunidad/agenda',
  '/comunidad/formacion',
  '/comunidad/voces',
  '/creditos',
  '/sobre-el-proyecto',
  '/chatbot'
];

export default function sitemap() {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date()
  }));

  const categoryEntries = getCategories().map((category) => ({
    url: `${BASE_URL}/atlas/${category.slug}`
  }));

  const entryEntries = getEntries().map((entry) => {
    const category = getCategories().find((item) => item.id === entry.categoryId);
    return {
      url: `${BASE_URL}/atlas/${category?.slug ?? ''}/${entry.slug}`,
      lastModified: entry.lastReviewed ? new Date(entry.lastReviewed) : undefined
    };
  });

  return [...staticEntries, ...categoryEntries, ...entryEntries];
}
