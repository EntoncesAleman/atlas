// Cierre de P1-5A (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md).
//
// El contenido editorial menciona otras entradas entre comillas — `(ver "Cultivo en
// secuencia")`, `se describe en "Sustrato, agua y drenaje" como...` — pero esas menciones eran
// texto plano, nunca un link. Esta función NO modifica ninguna palabra del texto original: solo
// detecta, dentro de un párrafo, los fragmentos entre comillas que coinciden EXACTAMENTE
// (verbatim) con el `title` de otra entrada publicada, y los devuelve como un enlace real hacia
// esa entrada. No hay coincidencia por aproximación ni por palabra suelta — si el texto entre
// comillas no es un match literal contra un título real, queda como estaba: texto plano.
import { getEntries, getCategoryById } from './registry';

export function getEntryReferenceMatches(text, currentEntryId) {
  const entries = getEntries();
  const matches = [];
  const quoteRegex = /"([^"]+)"/g;
  let match;

  while ((match = quoteRegex.exec(text)) !== null) {
    const quoted = match[1];
    const target = entries.find((entry) => entry.title === quoted && entry.id !== currentEntryId);
    if (!target) continue;
    const category = getCategoryById(target.categoryId);
    if (!category) continue;

    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      label: match[0],
      href: `/atlas/${category.slug}/${target.slug}`
    });
  }

  return matches;
}
