// Skill de Noticias del Atlas — núcleo reutilizable de búsqueda editorial de noticias.
//
// Contrato: este módulo SOLO busca, evalúa y estructura noticias — nunca escribe en Supabase ni
// conoce que Supabase existe. Quien lo llama (el ejecutor en `executor.js`, hoy; mañana podría
// ser el panel admin, un botón de ejecución manual, u otro proceso interno) es responsable de
// persistir el resultado. Esto es lo que permite invocar el Skill desde más de un lugar sin
// duplicar la lógica editorial en cada uno.
//
// Principio "no inventar": el resumen de cada noticia es un extracto fiel de la propia fuente
// (recortado, nunca reescrito ni completado con información que la fuente no dé) — el Skill
// corre como función server-side sin acceso a un modelo de lenguaje para sintetizar texto, así
// que la única forma de no inventar es no generar texto nuevo en absoluto. Un ítem sin fecha,
// sin resumen real o sin URL verificable simplemente se descarta, no se completa con un valor
// supuesto.

import { parseFeed } from './rssParser';
import { NEWS_SOURCES, RELEVANCE_KEYWORDS } from './sources';
import { isControlledTag } from '../editorial/tags';

const FETCH_TIMEOUT_MS = 10000;
const SUMMARY_MAX_LENGTH = 320;

function normalizeForMatch(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function isRelevant(title, summaryRaw) {
  const haystack = normalizeForMatch(`${title} ${summaryRaw}`);
  return RELEVANCE_KEYWORDS.some((keyword) => haystack.includes(normalizeForMatch(keyword)));
}

function inferCategory(defaultCategory, title, summaryRaw) {
  const haystack = normalizeForMatch(`${title} ${summaryRaw}`);
  if (/decreto|resolucion|normativa|regulacion|ley |proyecto de ley|reprocann|ariccame|sedronar/.test(haystack)) return 'marco-legal';
  if (/mercado|exportacion|produccion nacional|empresa|industria|inversion/.test(haystack)) return 'industria';
  if (/estudio|investigacion|publicacion cientifica|paper|journal|revista cientifica/.test(haystack)) return 'investigacion';
  return defaultCategory;
}

function inferTags(countryScope, category, title, summaryRaw, defaultTags) {
  const haystack = normalizeForMatch(`${title} ${summaryRaw}`);
  const candidates = new Set(['noticia', ...defaultTags]);
  if (countryScope === 'argentina') candidates.add('argentina');
  if (category === 'marco-legal') candidates.add('legal');
  if (category === 'industria') candidates.add('industria');
  if (/genetic|variedad|taxonom/.test(haystack)) candidates.add('genética');
  if (/cultivo|cultivar|agricultura|agronomi/.test(haystack)) candidates.add('cultivo');
  if (/sanidad|plaga|enfermedad/.test(haystack)) candidates.add('sanidad');
  return [...candidates].filter(isControlledTag);
}

function truncateSummary(summaryRaw) {
  if (summaryRaw.length <= SUMMARY_MAX_LENGTH) return summaryRaw;
  const cut = summaryRaw.slice(0, SUMMARY_MAX_LENGTH);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : SUMMARY_MAX_LENGTH)}…`;
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

async function fetchFeed(feedUrl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(feedUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'AtlasDelCultivoArgentino-NewsSkill/1.0 (+https://atlas-del-cultivo-argentino)' }
    });
    if (!response.ok) return { ok: false, error: `http_${response.status}` };
    const xml = await response.text();
    return { ok: true, xml };
  } catch (error) {
    return { ok: false, error: error.name === 'AbortError' ? 'timeout' : (error.message ?? 'fetch_error') };
  } finally {
    clearTimeout(timeout);
  }
}

// `sinceDays`: ventana de novedad. El cron corre semanalmente, pero se deja un margen mayor a 7
// días a propósito — Vercel Cron puede saltearse una ejecución puntual (ver nota de idempotencia
// en `scheduledRun.js`, mismo criterio acá) y esto evita perder noticias de una semana en la que
// el cron no corrió.
export async function findAtlasNews({ sinceDays = 12, maxPerSource = 10 } = {}) {
  const generatedAt = new Date().toISOString();
  const sinceThreshold = Date.now() - sinceDays * 24 * 60 * 60 * 1000;

  const sourcesChecked = [];
  const seenUrls = new Set();
  const items = [];

  for (const source of NEWS_SOURCES) {
    const fetchResult = await fetchFeed(source.feedUrl);
    if (!fetchResult.ok) {
      sourcesChecked.push({ id: source.id, name: source.name, ok: false, itemsFound: 0, itemsRelevant: 0, error: fetchResult.error });
      continue;
    }

    const { items: rawItems } = parseFeed(fetchResult.xml);
    let itemsRelevant = 0;

    for (const rawItem of rawItems.slice(0, maxPerSource)) {
      const title = (rawItem.title || '').trim();
      const link = (rawItem.link || '').trim();
      const summaryRaw = (rawItem.summaryRaw || '').trim();

      // Verificación mínima antes de considerar el ítem: sin título, sin URL verificable, sin
      // fecha o sin resumen real de la fuente, no hay forma de publicarlo sin completar algo a
      // ciegas — se descarta en vez de inventar el campo faltante.
      if (!title || !link || !isValidHttpUrl(link) || !rawItem.publishedAt || !summaryRaw) continue;

      const publishedAtMs = new Date(rawItem.publishedAt).getTime();
      if (publishedAtMs < sinceThreshold) continue;

      if (!isRelevant(title, summaryRaw)) continue;

      const normalizedUrl = link.replace(/[?#].*$/, '').replace(/\/$/, '').toLowerCase();
      if (seenUrls.has(normalizedUrl)) continue;
      seenUrls.add(normalizedUrl);

      const category = inferCategory(source.defaultCategory, title, summaryRaw);
      const tags = inferTags(source.countryScope, category, title, summaryRaw, source.defaultTags);

      items.push({
        title,
        summary: truncateSummary(summaryRaw),
        sourceName: source.name,
        sourceUrl: link,
        publishedAt: rawItem.publishedAt,
        countryScope: source.countryScope,
        category,
        tags,
        imageUrl: null
      });
      itemsRelevant += 1;
    }

    sourcesChecked.push({ id: source.id, name: source.name, ok: true, itemsFound: rawItems.length, itemsRelevant, error: null });
  }

  items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return { ok: true, generatedAt, sinceDays, sourcesChecked, items };
}
