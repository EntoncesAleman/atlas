// Parser mínimo de RSS 2.0 / Atom por expresiones regulares — deliberado en vez de sumar una
// dependencia nueva (`xml2js`, `rss-parser`, etc.) para un formato bien acotado: un feed de
// noticias tiene una estructura repetitiva y predecible (lista de `<item>`/`<entry>` con un
// puñado de subcampos de texto). No es un parser XML general y no pretende serlo.

function decodeEntities(text) {
  if (!text) return '';
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function stripHtml(text) {
  if (!text) return '';
  return decodeEntities(text.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function extractTag(block, tag) {
  // Cubre tanto `<tag>valor</tag>` como `<tag attr="...">valor</tag>` y el caso Atom
  // `<link href="..."/>` (sin contenido de texto, el valor está en el atributo).
  const withContent = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  if (withContent) return decodeEntities(withContent[1]);

  if (tag === 'link') {
    const selfClosing = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i);
    if (selfClosing) return decodeEntities(selfClosing[1]);
  }
  return '';
}

function extractItems(xml) {
  const rssItems = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  if (rssItems.length > 0) return rssItems;
  return xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
}

// Devuelve `{ ok, items: [{ title, link, publishedAt, summaryRaw }] }`. `publishedAt` queda como
// ISO string cuando la fecha del feed es parseable por `Date`, o `null` si no — nunca se inventa
// una fecha: un ítem sin fecha confiable simplemente no la tiene, y el Skill decide qué hacer con
// eso (no publicarlo) en vez de asumir "ahora".
export function parseFeed(xml) {
  if (!xml || typeof xml !== 'string') return { ok: false, items: [] };

  const blocks = extractItems(xml);
  const items = blocks.map((block) => {
    const title = stripHtml(extractTag(block, 'title'));
    const link = extractTag(block, 'link').trim();
    const rawDate = extractTag(block, 'pubDate') || extractTag(block, 'published') || extractTag(block, 'updated') || extractTag(block, 'dc:date');
    const parsedDate = rawDate ? new Date(rawDate) : null;
    const publishedAt = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : null;
    const summaryRaw = stripHtml(extractTag(block, 'description') || extractTag(block, 'summary') || extractTag(block, 'content'));

    return { title, link, publishedAt, summaryRaw };
  });

  return { ok: true, items };
}
