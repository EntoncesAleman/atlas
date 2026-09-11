// Auditoría Playwright de la Fase 47.2 (contextualización provincial del Atlas).
//
// No usa un test runner (el proyecto no tiene ninguno instalado, ver `47_PHASE_PRODUCT_COMPLETION.md`
// §8) — es un script Node que maneja Chromium directamente con la librería `playwright` ya
// presente en `package.json`, imprime un resumen PASS/FAIL y termina con exit code 1 si algo falló.
//
// Cobertura exigida por la consigna de la Fase 47.2 (§13 a §16):
// - Las 24 jurisdicciones, cada una con sus 7 entradas editoriales.
// - Persistencia de la elección al volver a Home.
// - Aislamiento entre provincias al cambiar de selección (Buenos Aires → Mendoza → Tierra del
//   Fuego → CABA).
// - "Explorar sin elegir" vuelve al estado general (sin contaminación de una elección previa).
// - Responsive en 4 resoluciones (Home y una entrada).
// - Regresión mínima de las superficies que este patch no debía tocar.

import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const PROVINCES = [
  { id: 'buenos-aires', name: 'Buenos Aires', region: 'pampeana' },
  { id: 'catamarca', name: 'Catamarca', region: 'noa' },
  { id: 'chaco', name: 'Chaco', region: 'nea' },
  { id: 'chubut', name: 'Chubut', region: 'patagonia' },
  { id: 'cordoba', name: 'Córdoba', region: 'pampeana' },
  { id: 'corrientes', name: 'Corrientes', region: 'nea' },
  { id: 'entrerios', name: 'Entre Ríos', region: 'pampeana' },
  { id: 'formosa', name: 'Formosa', region: 'nea' },
  { id: 'jujuy', name: 'Jujuy', region: 'noa' },
  { id: 'lapampa', name: 'La Pampa', region: 'pampeana' },
  { id: 'larioja', name: 'La Rioja', region: 'noa' },
  { id: 'mendoza', name: 'Mendoza', region: 'cuyo' },
  { id: 'misiones', name: 'Misiones', region: 'nea' },
  { id: 'neuquen', name: 'Neuquén', region: 'patagonia' },
  { id: 'rionegro', name: 'Río Negro', region: 'patagonia' },
  { id: 'salta', name: 'Salta', region: 'noa' },
  { id: 'sanjuan', name: 'San Juan', region: 'cuyo' },
  { id: 'sanluis', name: 'San Luis', region: 'cuyo' },
  { id: 'santacruz', name: 'Santa Cruz', region: 'patagonia' },
  { id: 'santafe', name: 'Santa Fe', region: 'pampeana' },
  { id: 'santiagodelestero', name: 'Santiago del Estero', region: 'noa' },
  { id: 'tierradelfuego', name: 'Tierra del Fuego', region: 'patagonia' },
  { id: 'tucuman', name: 'Tucumán', region: 'noa' },
  { id: 'caba', name: 'CABA', region: 'pampeana' },
];

if (PROVINCES.length !== 24) {
  throw new Error(`Se esperaban 24 jurisdicciones, hay ${PROVINCES.length}`);
}

const ENTRIES = [
  { category: 'fundamentos', entry: 'germinacion' },
  { category: 'suelo-y-agua', entry: 'sustrato-y-drenaje' },
  { category: 'luz-y-clima', entry: 'luz-y-fotoperiodo' },
  { category: 'sanidad', entry: 'lectura-de-senales' },
  { category: 'cultivo', entry: 'cultivo-en-secuencia' },
  { category: 'cosecha', entry: 'cosecha-y-maduracion' },
  { category: 'marco-legal', entry: 'marco-editorial' },
];

if (ENTRIES.length !== 7) {
  throw new Error(`Se esperaban 7 entradas, hay ${ENTRIES.length}`);
}

const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];

let passCount = 0;
let failCount = 0;
const failures = [];

function ok(label, condition, detail) {
  if (condition) {
    passCount += 1;
  } else {
    failCount += 1;
    failures.push(detail ? `${label} — ${detail}` : label);
    console.log(`  FAIL ${label}${detail ? ' — ' + detail : ''}`);
  }
}

function collectConsoleErrors(page) {
  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return errors;
}

async function hasOverflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
}

async function brokenImages(page) {
  return page.$$eval('img', (imgs) => imgs.filter((img) => img.src && (!img.complete || img.naturalWidth === 0)).map((img) => img.src));
}

async function bodyText(page, selector) {
  const el = await page.$(selector);
  if (!el) return '';
  return (await el.textContent()) || '';
}

async function selectProvinceOnHome(page, province) {
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.fill('#provinceSelect', province.name);
  // Confirma que el input realmente resolvió a la provincia esperada (vía datalist) antes de
  // persistir — que el resumen ya muestre el nombre correcto, no el de otra provincia.
  const summary = await bodyText(page, '.geo-selection-summary');
  ok(`${province.name}: el selector resuelve al nombre correcto antes de confirmar`, summary.includes(province.name), summary);
  await page.click('a.geo-submit');
  await page.waitForURL('**/atlas', { timeout: 10000 });
  return summary;
}

async function run() {
  const browser = await chromium.launch();

  console.log(`\n=== Fase 47.2 — Auditoría de contextualización provincial (${PROVINCES.length} jurisdicciones × ${ENTRIES.length} entradas) ===\n`);

  // Guarda el texto del panel "Contexto de tu zona" de `germinacion` por provincia, para
  // verificar al final que provincias de una misma macrorregión comparten el cuerpo del texto
  // (esperado, documentado) y que provincias de macrorregión distinta lo tienen distinto (no
  // todo es idéntico "solo para que el test pase").
  const germinacionBodyByProvince = new Map();
  // Guarda el texto completo del panel de `luz-y-fotoperiodo` por provincia — ahí sí se espera
  // una diferencia provincia a provincia (usa latitud real, no solo macrorregión).
  const luzPanelByProvince = new Map();

  for (const province of PROVINCES) {
    console.log(`-- ${province.name} (${province.id}) --`);
    const page = await browser.newPage();
    const consoleErrors = collectConsoleErrors(page);

    // A + B + C: seleccionar provincia, persistir, navegar a /atlas.
    await selectProvinceOnHome(page, province);

    const storedProvinceId = await page.evaluate(() => window.localStorage.getItem('atlas:selectedProvince'));
    ok(`${province.name}: persistencia en localStorage`, storedProvinceId === province.id, `esperado "${province.id}", obtenido "${storedProvinceId}"`);

    // D: abrir las 7 entradas.
    for (const { category, entry } of ENTRIES) {
      await page.goto(`${BASE_URL}/atlas/${category}/${entry}`, { waitUntil: 'networkidle' });
      // El panel se hidrata en un efecto de cliente — esperarlo explícitamente.
      await page.waitForSelector('.atlas-province-context', { timeout: 5000 }).catch(() => {});

      const panelText = await bodyText(page, '.atlas-province-context');
      const bodyFullText = await bodyText(page, '.atlas-entry-content-body');

      // F: nombre de provincia correcto.
      ok(`${province.name}/${entry}: muestra el nombre de provincia`, panelText.includes(province.name), `panel: "${panelText.slice(0, 120)}"`);

      // G: no aparece información de otra provincia.
      const leaked = PROVINCES.filter((other) => other.id !== province.id && panelText.includes(other.name));
      ok(`${province.name}/${entry}: sin nombres de otras provincias en el panel`, leaked.length === 0, leaked.map((p) => p.name).join(', '));

      // H: sin undefined/null visibles.
      ok(`${province.name}/${entry}: sin "undefined"/"null" en el contenido`, !/undefined|null/i.test(bodyFullText));

      // I: sin errores de consola.
      // (se verifica una vez al final de la página completa, ver abajo)

      // J: sin imágenes rotas.
      const broken = await brokenImages(page);
      ok(`${province.name}/${entry}: sin imágenes rotas`, broken.length === 0, broken.join(', '));

      // K: sin overflow horizontal (viewport por defecto).
      ok(`${province.name}/${entry}: sin overflow horizontal`, !(await hasOverflow(page)));

      if (entry === 'germinacion') {
        // Cuerpo del panel sin el nombre de provincia (aparece dos veces: el badge y dentro de
        // la oración), para comparar solo el texto de macrorregión.
        germinacionBodyByProvince.set(province.id, panelText.split(province.name).join('').trim());
      }
      if (entry === 'luz-y-fotoperiodo') {
        luzPanelByProvince.set(province.id, panelText);
      }
    }

    ok(`${province.name}: sin errores de consola en todo el recorrido`, consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));

    // L + M: volver a Home, la provincia sigue elegida.
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const homeSummaryAfter = await bodyText(page, '.geo-selection-summary');
    ok(`${province.name}: persiste al volver a Home`, homeSummaryAfter.includes(province.name), homeSummaryAfter);

    await page.close();
  }

  // Verificación cruzada §13: misma macrorregión → mismo cuerpo de texto en `germinacion`;
  // macrorregión distinta → cuerpo de texto distinto (evita tanto "todo inventado como distinto"
  // como "todo idéntico sin razón").
  console.log('\n-- Verificación cruzada: coherencia por macrorregión (germinación) --');
  for (const a of PROVINCES) {
    for (const b of PROVINCES) {
      if (a.id >= b.id) continue;
      const bodyA = germinacionBodyByProvince.get(a.id);
      const bodyB = germinacionBodyByProvince.get(b.id);
      if (a.region === b.region) {
        ok(`${a.name} vs ${b.name} (misma macrorregión, ${a.region}): mismo texto general`, bodyA === bodyB);
      } else {
        ok(`${a.name} vs ${b.name} (macrorregión distinta): texto general distinto`, bodyA !== bodyB);
      }
    }
  }

  console.log('\n-- Verificación cruzada: latitud real distingue provincias (luz y fotoperiodo) --');
  const luzValues = [...luzPanelByProvince.values()];
  const luzUnique = new Set(luzValues);
  ok('luz-y-fotoperiodo: cada provincia tiene un texto propio (latitud real)', luzUnique.size === luzValues.length, `${luzUnique.size} únicos de ${luzValues.length}`);

  // §14 — Prueba de aislamiento explícita.
  console.log('\n-- Prueba de aislamiento: Buenos Aires → Mendoza → Tierra del Fuego → CABA --');
  {
    const page = await browser.newPage();
    const sequence = ['buenos-aires', 'mendoza', 'tierradelfuego', 'caba'];
    let previousPanelText = null;
    let previousProvinceName = null;
    for (const provinceId of sequence) {
      const province = PROVINCES.find((p) => p.id === provinceId);
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      await page.fill('#provinceSelect', province.name);
      await page.click('a.geo-submit');
      await page.waitForURL('**/atlas', { timeout: 10000 });
      await page.goto(`${BASE_URL}/atlas/fundamentos/germinacion`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.atlas-province-context', { timeout: 5000 }).catch(() => {});

      const introText = await bodyText(page, '.atlas-excerpt');
      const panelText = await bodyText(page, '.atlas-province-context');

      ok(`Aislamiento ${province.name}: contenido base intacto`, introText.includes('La germinación es el primer punto de atención del atlas'));
      ok(`Aislamiento ${province.name}: panel muestra su propio nombre`, panelText.includes(province.name));
      if (previousProvinceName) {
        ok(`Aislamiento ${province.name}: no queda texto de "${previousProvinceName}"`, !panelText.includes(previousProvinceName));
      }
      ok(`Aislamiento ${province.name}: no repite el panel textual anterior sin cambiar`, panelText !== previousPanelText || province.region === PROVINCES.find(p => p.id === sequence[sequence.indexOf(provinceId) - 1])?.region);

      previousPanelText = panelText;
      previousProvinceName = province.name;
    }
    await page.close();
  }

  // §15 — Sin provincia ("Explorar sin elegir").
  console.log('\n-- Prueba sin provincia ("Explorar sin elegir") --');
  {
    const page = await browser.newPage();
    const consoleErrors = collectConsoleErrors(page);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.fill('#provinceSelect', 'Mendoza');
    await page.click('a.geo-submit');
    await page.waitForURL('**/atlas', { timeout: 10000 });

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.click('a.geo-clear');
    await page.waitForURL('**/atlas', { timeout: 10000 });

    const storedAfterClear = await page.evaluate(() => window.localStorage.getItem('atlas:selectedProvince'));
    ok('Explorar sin elegir: limpia la selección persistida', storedAfterClear === null || storedAfterClear === '');

    for (const { category, entry } of ENTRIES) {
      await page.goto(`${BASE_URL}/atlas/${category}/${entry}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.atlas-province-context', { timeout: 5000 }).catch(() => {});
      const panelText = await bodyText(page, '.atlas-province-context');
      const bodyFullText = await bodyText(page, '.atlas-entry-content-body');
      ok(`Sin provincia/${entry}: muestra el prompt genérico`, panelText.includes('Elegí tu provincia'));
      ok(`Sin provincia/${entry}: no muestra nombre de ninguna provincia`, !PROVINCES.some((p) => panelText.includes(p.name)));
      ok(`Sin provincia/${entry}: sin "undefined"/"null"`, !/undefined|null/i.test(bodyFullText));
    }
    ok('Sin provincia: sin errores de consola', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));
    await page.close();
  }

  // §16 — Responsive.
  console.log('\n-- Responsive (Home y una entrada) --');
  {
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage({ viewport });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      ok(`Home ${viewport.width}x${viewport.height}: sin overflow horizontal`, !(await hasOverflow(page)));

      await page.fill('#provinceSelect', 'Tierra del Fuego');
      await page.click('a.geo-submit');
      await page.waitForURL('**/atlas', { timeout: 10000 });
      await page.goto(`${BASE_URL}/atlas/fundamentos/germinacion`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.atlas-province-context', { timeout: 5000 }).catch(() => {});
      ok(`Entrada (Tierra del Fuego) ${viewport.width}x${viewport.height}: sin overflow horizontal`, !(await hasOverflow(page)));

      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      await page.fill('#provinceSelect', 'CABA');
      await page.click('a.geo-submit');
      await page.waitForURL('**/atlas', { timeout: 10000 });
      await page.goto(`${BASE_URL}/atlas/marco-legal/marco-editorial`, { waitUntil: 'networkidle' });
      ok(`Entrada (CABA) ${viewport.width}x${viewport.height}: sin overflow horizontal`, !(await hasOverflow(page)));

      await page.close();
    }
  }

  // Regresión mínima.
  console.log('\n-- Regresión --');
  {
    const page = await browser.newPage();
    const surfaces = [
      '/',
      '/atlas',
      '/mi-cultivo',
      '/chatbot',
      '/creditos',
      '/api/geo',
      '/api/climate',
      '/atlas/fundamentos',
      '/atlas/suelo-y-agua',
      '/atlas/luz-y-clima',
      '/atlas/sanidad',
      '/atlas/cultivo',
      '/atlas/cosecha',
      '/atlas/marco-legal',
    ];
    for (const path of surfaces) {
      const response = await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });
      ok(`Regresión ${path}: responde 200`, response.status() === 200, `status ${response.status()}`);
    }

    // "Crecimiento" visible donde antes decía "Fundamentos" (Fase 47.2 §10).
    await page.goto(`${BASE_URL}/atlas`, { waitUntil: 'networkidle' });
    const atlasIndexText = await page.textContent('body');
    ok('Índice del Atlas: muestra "Crecimiento"', atlasIndexText.includes('Crecimiento'));
    ok('Índice del Atlas: ya no muestra "Fundamentos" como texto visible', !atlasIndexText.includes('Fundamentos'));

    await page.goto(`${BASE_URL}/atlas/fundamentos`, { waitUntil: 'networkidle' });
    const categoryText = await page.textContent('body');
    ok('Categoría /atlas/fundamentos: título visible es "Crecimiento"', categoryText.includes('Crecimiento'));

    await page.close();
  }

  await browser.close();

  console.log(`\n=== Resultado: ${passCount} OK / ${failCount} FAIL (${passCount + failCount} verificaciones) ===`);
  if (failCount > 0) {
    console.log('\nFallas:');
    for (const f of failures) console.log(`  - ${f}`);
    process.exitCode = 1;
  }
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
