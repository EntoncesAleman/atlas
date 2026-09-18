// Adaptador editorial (Fase 7A).
//
// Única puerta de entrada que la UI debería usar para leer contenido estructurado.
// Internamente combina editorialData.js (categorías/entradas), sources.js (fuentes) y
// assets.js (assets) — la UI no debería importar esos tres módulos por separado.

import { editorialCategories, editorialEntries } from './editorialData';
import { sourceById } from './sources';
import { assetForCategory, assetsForEntry } from './assets';

export function getCategories() {
  return editorialCategories
    .filter((category) => category.status === 'PUBLISHED')
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getEntries() {
  return editorialEntries.filter((entry) => entry.editorialStatus === 'PUBLISHED');
}

export function getCategory(slug) {
  return editorialCategories.find((category) => category.slug === slug) ?? null;
}

export function getCategoryById(categoryId) {
  return editorialCategories.find((category) => category.id === categoryId) ?? null;
}

export function getEntry(categorySlug, entrySlug) {
  const category = getCategory(categorySlug);
  if (!category) return null;
  return (
    editorialEntries.find(
      (entry) =>
        entry.categoryId === category.id &&
        entry.slug === entrySlug &&
        entry.editorialStatus === 'PUBLISHED'
    ) ?? null
  );
}

export function getEntriesForCategory(category) {
  return editorialEntries.filter(
    (entry) => entry.categoryId === category.id && entry.editorialStatus === 'PUBLISHED'
  );
}

export function getRelatedEntries(entry) {
  return (entry.relatedEntryIds ?? [])
    .map((id) => editorialEntries.find((candidate) => candidate.id === id))
    .filter((candidate) => candidate && candidate.editorialStatus === 'PUBLISHED');
}

// Categorías relacionadas con una categoría dada (Loop de cierre de P1-4, auditoría 63).
// Nunca arbitrario: prioriza categorías que aparecen de verdad en el modelo editorial —
// las de las entradas que las propias entradas de esta categoría ya listan en
// `relatedEntryIds` —, ordenadas por cuántas veces aparecen. Solo si eso no alcanza para
// completar `limit` se rellena con las categorías más cercanas en `order` (criterio estable
// y no aleatorio, nunca una relación inventada presentada como si fuera editorial).
export function getRelatedCategories(category, limit = 3) {
  const entries = getEntriesForCategory(category);
  const frequency = new Map();

  entries.forEach((entry) => {
    getRelatedEntries(entry).forEach((related) => {
      if (related.categoryId === category.id) return;
      frequency.set(related.categoryId, (frequency.get(related.categoryId) ?? 0) + 1);
    });
  });

  const byRelation = Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([categoryId]) => getCategoryById(categoryId))
    .filter((candidate) => candidate && candidate.status === 'PUBLISHED');

  const result = [...byRelation];

  if (result.length < limit) {
    const usedIds = new Set([category.id, ...result.map((item) => item.id)]);
    const byProximity = getCategories()
      .filter((candidate) => !usedIds.has(candidate.id))
      .sort((a, b) => Math.abs((a.order ?? 0) - (category.order ?? 0)) - Math.abs((b.order ?? 0) - (category.order ?? 0)));
    for (const candidate of byProximity) {
      if (result.length >= limit) break;
      result.push(candidate);
    }
  }

  return result.slice(0, limit);
}

export function getSourcesForEntry(entry) {
  return (entry.sourceIds ?? [])
    .map((id) => sourceById(id))
    .filter(Boolean);
}

// Agrupa fuentes ya resueltas (ver getSourcesForEntry) por `scope` (CANNABIS | GENERAL |
// sin scope) para que la UI pueda mostrar la distinción "evidencia específica de Cannabis"
// vs. "evidencia general de fisiología vegetal" sin cada componente teniendo que conocer el
// vocabulario controlado de `tags.js`. Preserva el orden original dentro de cada grupo.
export function groupSourcesByScope(sources) {
  const cannabis = sources.filter((source) => source.scope === 'CANNABIS');
  const general = sources.filter((source) => source.scope === 'GENERAL');
  const other = sources.filter((source) => source.scope !== 'CANNABIS' && source.scope !== 'GENERAL');
  return { cannabis, general, other };
}

export function getAssetsForEntry(entry) {
  return assetsForEntry(entry.id);
}

export function getCategoryAsset(category) {
  return assetForCategory(category.id);
}
