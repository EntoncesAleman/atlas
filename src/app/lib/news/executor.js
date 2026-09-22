// Ejecutor de la sincronización semanal de Noticias — capa separada del Skill a propósito
// (consigna explícita): el Skill (`skill.js`) solo busca y estructura, sin saber que Supabase
// existe; este módulo es el único que conoce Supabase, decide qué se persiste y cómo, y nunca
// contiene lógica editorial propia (no evalúa relevancia, no arma resúmenes, no clasifica —
// todo eso ya viene resuelto en lo que devuelve el Skill).
//
// Flujo: cron/manual → este ejecutor → Skill → deduplicación contra lo ya persistido →
// Supabase (insert, nunca update/delete de filas existentes) → resumen de ejecución.
//
// Quién lo llama: `src/app/api/news/weekly-sync/route.js` (protegido con `CRON_SECRET`, mismo
// patrón que `notifications/scheduled-run`) o, en desarrollo/pruebas, cualquier invocación
// manual con `dryRun: true`.

import { getSupabaseAdminClient } from '../supabase/admin';
import { findAtlasNews } from './skill';

function normalizeUrlForCompare(url) {
  return (url || '').replace(/[?#].*$/, '').replace(/\/$/, '').toLowerCase();
}

// Similaridad de título por superposición de palabras (Jaccard sobre tokens de 3+ letras) — un
// mecanismo simple y sin dependencias nuevas para el "mecanismo secundario de título/similaridad"
// que pide la consigna, además de la unicidad de URL que ya impone la constraint de la tabla.
// Dos títulos que comparten la mayoría de sus palabras significativas son, en la práctica, la
// misma noticia cubierta por dos fuentes distintas.
const TITLE_SIMILARITY_THRESHOLD = 0.6;

function titleTokens(title) {
  return new Set(
    (title || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .split(/[^a-z0-9áéíóúñ]+/i)
      .filter((token) => token.length >= 3)
  );
}

function titleSimilarity(a, b) {
  const tokensA = titleTokens(a);
  const tokensB = titleTokens(b);
  if (tokensA.size === 0 || tokensB.size === 0) return 0;
  let shared = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) shared += 1;
  }
  return shared / new Set([...tokensA, ...tokensB]).size;
}

export async function runNewsWeeklySync({ dryRun = false } = {}) {
  const startedAt = Date.now();
  const admin = getSupabaseAdminClient();
  if (!admin) {
    return { ok: false, reason: 'admin_client_not_configured' };
  }

  const summary = {
    dryRun,
    sourcesChecked: [],
    found: 0,
    added: 0,
    skippedDuplicateUrl: 0,
    skippedSimilarTitle: 0,
    errors: [],
    addedItems: [],
    durationMs: 0
  };

  let skillResult;
  try {
    skillResult = await findAtlasNews();
  } catch (error) {
    return { ok: false, reason: 'skill_exception', message: error.message ?? 'unknown_error' };
  }

  summary.sourcesChecked = skillResult.sourcesChecked;
  summary.found = skillResult.items.length;

  if (skillResult.items.length === 0) {
    summary.durationMs = Date.now() - startedAt;
    return { ok: true, ...summary };
  }

  // Ventana de comparación de duplicados: las noticias de los últimos 60 días alcanzan para
  // detectar tanto duplicados exactos (misma URL) como una misma noticia cubierta por dos
  // fuentes distintas en semanas cercanas — no hace falta traer la tabla entera, que solo crece
  // (nunca se borra una noticia vieja).
  const { data: recentRows, error: recentError } = await admin
    .from('news_items')
    .select('title, source_url')
    .gte('discovered_at', new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString());

  if (recentError) {
    return { ok: false, reason: recentError.message };
  }

  const existingUrls = new Set((recentRows ?? []).map((row) => normalizeUrlForCompare(row.source_url)));
  const existingTitles = (recentRows ?? []).map((row) => row.title);

  for (const item of skillResult.items) {
    try {
      const normalizedUrl = normalizeUrlForCompare(item.sourceUrl);
      if (existingUrls.has(normalizedUrl)) {
        summary.skippedDuplicateUrl += 1;
        continue;
      }

      const isSimilarToExisting = existingTitles.some((existingTitle) => titleSimilarity(existingTitle, item.title) >= TITLE_SIMILARITY_THRESHOLD);
      if (isSimilarToExisting) {
        summary.skippedSimilarTitle += 1;
        continue;
      }

      if (dryRun) {
        summary.added += 1;
        summary.addedItems.push({ title: item.title, sourceUrl: item.sourceUrl, countryScope: item.countryScope, category: item.category });
        // No se agrega a `existingUrls`/`existingTitles` en dry-run: cada ítem se evalúa contra
        // el estado real de la base, nunca contra lo que "se habría" agregado en esta misma
        // corrida simulada.
        continue;
      }

      const { error: insertError } = await admin.from('news_items').insert({
        title: item.title,
        summary: item.summary,
        source_name: item.sourceName,
        source_url: item.sourceUrl,
        published_at: item.publishedAt,
        country_scope: item.countryScope,
        category: item.category,
        tags: item.tags,
        image_url: item.imageUrl,
        status: 'published'
      });

      if (insertError) {
        // Constraint única de `source_url` como último resguardo ante una carrera entre dos
        // ejecuciones concurrentes del cron — no debería pasar en la práctica (Vercel Cron no
        // superpone corridas de la misma tarea), pero si pasara, se cuenta como duplicado, no
        // como error real.
        if (insertError.code === '23505') {
          summary.skippedDuplicateUrl += 1;
          continue;
        }
        throw insertError;
      }

      existingUrls.add(normalizedUrl);
      existingTitles.push(item.title);
      summary.added += 1;
      summary.addedItems.push({ title: item.title, sourceUrl: item.sourceUrl, countryScope: item.countryScope, category: item.category });
    } catch (error) {
      summary.errors.push({ sourceUrl: item.sourceUrl, message: error.message ?? 'unknown_error' });
    }
  }

  summary.durationMs = Date.now() - startedAt;
  return { ok: true, ...summary };
}
