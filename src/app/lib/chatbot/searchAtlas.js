// Retrieval local del Atlas (Fase 13B).
//
// `searchAtlas(query)` busca sobre el modelo editorial YA existente
// (`lib/editorial/registry.js`, que a su vez lee `editorialData.js` y
// `sources.js`) — no duplica contenido, no crea una base de conocimiento
// paralela, no usa ningún LLM, embeddings, base vectorial ni servicio
// externo. Es determinista: la misma pregunta contra el mismo contenido
// editorial siempre devuelve el mismo resultado.
//
// Cada resultado conserva su origen exacto (entryId, categoryId, sectionId
// cuando corresponde, sourceIds) para que una futura capa de respuesta (Fase
// 13D) pueda citar de dónde salió cada afirmación — nunca un resultado
// "anónimo". Ver MASTER_PACKAGE/45_PHASE_13B_CHATBOT_RETRIEVAL.md para el
// detalle de diseño (scoring, normalización, snippets, límites).

import { getEntries, getCategoryById } from '../editorial/registry';

const STOPWORDS = new Set([
  'el', 'la', 'los', 'las', 'de', 'del', 'en', 'y', 'u', 'o', 'un', 'una', 'unos', 'unas',
  'es', 'son', 'que', 'con', 'para', 'por', 'al', 'se', 'su', 'sus', 'como', 'mi', 'tu',
  'sobre', 'durante', 'hay', 'lo', 'le', 'les', 'a', 'desde', 'entre', 'sin', 'ya',
  'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas', 'me', 'te', 'nos',
]);

const MAX_RESULTS = 5;
const MIN_SCORE = 3;
const STEM_LENGTH = 6;

// Rango Unicode de marcas diacríticas combinantes (U+0300–U+036F), construido
// por código de carácter en vez de escribir un escape `\u` literal en el
// archivo fuente — evita cualquier ambigüedad de codificación al guardar el
// archivo. Se usa junto con `.normalize('NFD')` para eliminar acentos de
// forma determinista sin ninguna dependencia externa.
const DIACRITIC_MARKS = new RegExp(
  `[${String.fromCharCode(0x0300)}-${String.fromCharCode(0x036f)}]`,
  'g'
);

// Prioridad de campos según la consigna de esta fase — de mayor a menor peso.
// Deliberadamente NO se incluye `relatedEntryIds` como señal de scoring: usar
// relaciones para "inflar" resultados que no contienen texto coincidente
// hubiera arriesgado devolver resultados sin evidencia real en ese resultado
// puntual — documentado en 45_PHASE_13B_CHATBOT_RETRIEVAL.md.
const FIELD_WEIGHT = {
  title: 10,
  summary: 9,
  tags: 8,
  sectionTitle: 6,
  sectionContent: 4,
  observations: 3,
  signals: 2,
  commonMistakes: 2,
  environmentContext: 1,
};

// minúsculas + sin diacríticos + sin signos + espacios colapsados —
// determinista, sin dependencias. Ej.: "¿Cómo germina el cannabis?" ->
// "como germina el cannabis"; "GERMINACIÓN" -> "germinacion".
export function normalizeText(text) {
  return (text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITIC_MARKS, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(normalizedText) {
  return normalizedText.length ? normalizedText.split(' ') : [];
}

// Reducción a un prefijo común de hasta 6 caracteres — cubre variaciones
// morfológicas frecuentes en español sin un diccionario de sinónimos: por
// ejemplo "semilla"/"semillas" y "germinar"/"germinación" comparten prefijo
// ("semill", "germin"). No es un stemmer lingüístico real, es un recorte
// simple y determinista — documentado también en el archivo de la fase.
function stem(token) {
  return token.length <= 4 ? token : token.slice(0, STEM_LENGTH);
}

function queryStemsFrom(query) {
  const tokens = tokenize(normalizeText(query)).filter(
    (token) => token.length > 2 && !STOPWORDS.has(token)
  );
  return new Set(tokens.map(stem));
}

// Cuántos stems distintos de la consulta aparecen en un texto candidato — no
// pondera por repetición (un campo no gana más peso solo por repetir la
// misma palabra muchas veces).
function matchCount(queryStems, candidateText) {
  if (!candidateText) return 0;
  const candidateStems = new Set(tokenize(normalizeText(candidateText)).map(stem));
  let count = 0;
  for (const qStem of queryStems) {
    if (candidateStems.has(qStem)) count += 1;
  }
  return count;
}

// Junta el contenido real de una entrada en "trozos" buscables, cada uno con
// su campo de origen y (cuando aplica) el sectionId real de esa sección — es
// la base de la trazabilidad del resultado final.
function collectChunks(entry) {
  const chunks = [];
  if (entry.title) chunks.push({ field: 'title', weight: FIELD_WEIGHT.title, text: entry.title });
  if (entry.summary) chunks.push({ field: 'summary', weight: FIELD_WEIGHT.summary, text: entry.summary });
  for (const tag of entry.tags ?? []) {
    chunks.push({ field: 'tags', weight: FIELD_WEIGHT.tags, text: tag });
  }
  for (const section of entry.sections ?? []) {
    if (section.title) {
      chunks.push({ field: 'sectionTitle', weight: FIELD_WEIGHT.sectionTitle, text: section.title, sectionId: section.id });
    }
    for (const paragraph of section.paragraphs ?? []) {
      chunks.push({ field: 'sectionContent', weight: FIELD_WEIGHT.sectionContent, text: paragraph, sectionId: section.id });
    }
  }
  for (const observation of entry.observations ?? []) {
    chunks.push({ field: 'observations', weight: FIELD_WEIGHT.observations, text: observation });
  }
  for (const signal of entry.signals ?? []) {
    if (signal.description) chunks.push({ field: 'signals', weight: FIELD_WEIGHT.signals, text: signal.description });
  }
  for (const mistake of entry.commonMistakes ?? []) {
    if (mistake.description) chunks.push({ field: 'commonMistakes', weight: FIELD_WEIGHT.commonMistakes, text: mistake.description });
  }
  for (const paragraph of entry.environmentContext ?? []) {
    chunks.push({ field: 'environmentContext', weight: FIELD_WEIGHT.environmentContext, text: paragraph });
  }
  return chunks;
}

function scoreEntry(entry, queryStems) {
  let total = 0;
  const matchedFields = new Set();
  let bestChunk = null;
  let bestChunkScore = 0;

  for (const chunk of collectChunks(entry)) {
    const count = matchCount(queryStems, chunk.text);
    if (count === 0) continue;
    const chunkScore = count * chunk.weight;
    total += chunkScore;
    matchedFields.add(chunk.field);
    if (chunkScore > bestChunkScore) {
      bestChunkScore = chunkScore;
      bestChunk = chunk;
    }
  }

  return { total, matchedFields: Array.from(matchedFields), bestChunk };
}

// Extrae una ventana de texto REAL alrededor de la primera coincidencia —
// nunca una paráfrasis ni un resumen generado. `text` es contenido editorial
// tal cual está escrito; se devuelve un recorte de ese mismo texto.
function buildSnippet(text, queryStems, windowBefore = 60, windowAfter = 140) {
  if (!text) return null;
  // Versión "alineada" del texto: misma longitud que el original (signos ->
  // espacio, sin colapsar), para poder ubicar el recorte en el texto real.
  const aligned = text
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITIC_MARKS, '')
    .replace(/[^a-z0-9\s]/g, ' ');

  const wordRegex = /\S+/g;
  let match;
  let hitStart = -1;
  let hitEnd = -1;
  while ((match = wordRegex.exec(aligned)) !== null) {
    if (queryStems.has(stem(match[0]))) {
      hitStart = match.index;
      hitEnd = match.index + match[0].length;
      break;
    }
  }
  if (hitStart === -1) return null;

  let start = Math.max(0, hitStart - windowBefore);
  let end = Math.min(text.length, hitEnd + windowAfter);
  while (start > 0 && /\S/.test(text[start - 1])) start -= 1;
  while (end < text.length && /\S/.test(text[end])) end += 1;

  const prefix = start > 0 ? '…' : '';
  const suffix = end < text.length ? '…' : '';
  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

// El mejor trozo puede ser un título o un tag (texto demasiado corto para un
// recorte útil) — en ese caso se prefiere el resumen real de la entrada
// (sigue siendo texto editorial real, nunca inventado).
function pickSnippet(entry, bestChunk, queryStems) {
  const isThin = !bestChunk || bestChunk.field === 'tags' || bestChunk.field === 'title';
  const candidateText = isThin ? (entry.summary ?? bestChunk?.text ?? null) : bestChunk.text;
  if (!candidateText) return null;
  return buildSnippet(candidateText, queryStems) ?? candidateText;
}

// Devuelve { results } — máximo 5, ordenados por relevancia, nunca rellenado
// con coincidencias débiles solo para completar el límite. `results: []`
// significa explícitamente "no hay evidencia suficiente en el Atlas".
export function searchAtlas(query) {
  const queryStems = queryStemsFrom(query);
  if (queryStems.size === 0) return { results: [] };

  const scored = [];
  for (const entry of getEntries()) {
    const { total, matchedFields, bestChunk } = scoreEntry(entry, queryStems);
    if (total < MIN_SCORE) continue;

    const category = getCategoryById(entry.categoryId);
    if (!category) continue; // nunca devolver un resultado sin categoría real trazable

    scored.push({
      entryId: entry.id,
      categoryId: entry.categoryId,
      title: entry.title,
      score: total,
      matchedFields,
      snippet: pickSnippet(entry, bestChunk, queryStems),
      sectionId: bestChunk?.sectionId ?? null,
      sourceIds: entry.sourceIds ?? [],
      url: `/atlas/${category.slug}/${entry.slug}`,
    });
  }

  scored.sort((a, b) => b.score - a.score);
  return { results: scored.slice(0, MAX_RESULTS) };
}
