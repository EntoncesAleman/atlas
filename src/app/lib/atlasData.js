// Capa de compatibilidad (Fase 7A).
//
// Este archivo YA NO es la fuente de verdad del contenido editorial — pasó a ser un adaptador
// que deriva la forma plana que la UI existente espera (`atlasCategories`, `atlasEntries`,
// `categoryBySlug`, `entryBySlug`) a partir del modelo editorial estructurado en
// `./editorial/editorialData.js`, vía `./editorial/registry.js`.
//
// Por qué existe todavía: page.js (Home/CategoryShowcase/AtlasVisualCard), atlas/page.js y
// atlas/[category]/page.js siguen consumiendo esta forma plana y no fue necesario tocarlos en
// esta fase — solo atlas/[category]/[entry]/page.js pasó a consumir el registry directamente
// para poder mostrar secciones/fuentes/relacionados por ID real.
//
// No hay dos fuentes de verdad: si en el futuro se edita contenido, se edita en
// `editorial/editorialData.js`, nunca acá.

import {
  getCategories,
  getEntries,
  getCategoryAsset
} from './editorial/registry';
import { assetsForEntry } from './editorial/assets';

function legacyCategory(category) {
  const asset = getCategoryAsset(category);
  return {
    id: category.id,
    slug: category.slug,
    title: category.title,
    tag: category.tag,
    type: category.type,
    regionLabel: category.regionLabel,
    cta: category.cta,
    description: category.description,
    shortDescription: category.shortDescription,
    editorialDescription: category.editorialDescription,
    asset: asset?.file ?? null,
    alt: asset?.alt ?? ''
  };
}

function legacyRelatedCategorySlugs(entry) {
  // El shape legado de `related` apuntaba a slugs de CATEGORÍA (no de entrada). Se conserva
  // por compatibilidad, derivado ahora desde `relatedEntryIds` (entradas reales).
  const categoriesById = new Map(editorialCategoriesById());
  const slugs = (entry.relatedEntryIds ?? [])
    .map((relatedId) => allEntries().find((candidate) => candidate.id === relatedId))
    .filter(Boolean)
    .map((relatedEntry) => categoriesById.get(relatedEntry.categoryId)?.slug)
    .filter(Boolean);
  return Array.from(new Set(slugs));
}

function editorialCategoriesById() {
  return getCategories().map((category) => [category.id, category]);
}

function allEntries() {
  return getEntries();
}

function legacyEntry(entry) {
  const category = getCategories().find((item) => item.id === entry.categoryId);
  const [primaryAsset] = assetsForEntry(entry.id);
  return {
    id: entry.id,
    slug: entry.slug,
    categoryId: entry.categoryId,
    title: entry.title,
    summary: entry.summary,
    content: entry.intro,
    image: primaryAsset?.file ?? null,
    alt: primaryAsset?.alt ?? '',
    tags: entry.tags,
    category: category?.title ?? '',
    categorySlug: category?.slug ?? '',
    type: entry.editorialStatus,
    related: legacyRelatedCategorySlugs(entry),
    state: entry.editorialStatus
  };
}

export const atlasCategories = getCategories().map(legacyCategory);
export const atlasEntries = getEntries().map(legacyEntry);

export function categoryBySlug(slug) {
  return atlasCategories.find((category) => category.slug === slug) ?? null;
}

export function entryBySlug(categorySlug, entrySlug) {
  const entry = atlasEntries.find(
    (item) => item.categorySlug === categorySlug && item.slug === entrySlug && item.state === 'PUBLISHED'
  );
  return entry ?? null;
}
