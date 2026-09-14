// Auditoría pequeña y específica de la Ficha Provincial (Loop 3C, Fase 52).
//
// No duplica `provincial-context-audit.mjs` (Fase 47.2, sin modificar) — ese ya cubre las 24
// jurisdicciones × 7 entradas para la contextualización general. Este test cubre exclusivamente lo
// nuevo de este loop: identidad/capital sin fuga entre provincias en las 24 jurisdicciones, y un
// chequeo más profundo (ENTRY_FOCUS, referencias fenológicas, bloqueo de marco-editorial, ausencia
// de ids técnicos) sobre un subconjunto representativo (Buenos Aires, Mendoza, Tierra del Fuego,
// CABA) para no repetir 24×7 navegaciones ya cubiertas por la otra suite.

import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const PROVINCES = [
  { id: 'buenos-aires', name: 'Buenos Aires', capital: 'La Plata' },
  { id: 'catamarca', name: 'Catamarca', capital: 'San Fernando del Valle de Catamarca' },
  { id: 'chaco', name: 'Chaco', capital: 'Resistencia' },
  { id: 'chubut', name: 'Chubut', capital: 'Rawson' },
  { id: 'cordoba', name: 'Córdoba', capital: 'Córdoba' },
  { id: 'corrientes', name: 'Corrientes', capital: 'Corrientes' },
  { id: 'entrerios', name: 'Entre Ríos', capital: 'Paraná' },
  { id: 'formosa', name: 'Formosa', capital: 'Formosa' },
  { id: 'jujuy', name: 'Jujuy', capital: 'San Salvador de Jujuy' },
  { id: 'lapampa', name: 'La Pampa', capital: 'Santa Rosa' },
  { id: 'larioja', name: 'La Rioja', capital: 'La Rioja' },
  { id: 'mendoza', name: 'Mendoza', capital: 'Mendoza' },
  { id: 'misiones', name: 'Misiones', capital: 'Posadas' },
  { id: 'neuquen', name: 'Neuquén', capital: 'Neuquén' },
  { id: 'rionegro', name: 'Río Negro', capital: 'Viedma' },
  { id: 'salta', name: 'Salta', capital: 'Salta' },
  { id: 'sanjuan', name: 'San Juan', capital: 'San Juan' },
  { id: 'sanluis', name: 'San Luis', capital: 'San Luis' },
  { id: 'santacruz', name: 'Santa Cruz', capital: 'Río Gallegos' },
  { id: 'santafe', name: 'Santa Fe', capital: 'Santa Fe' },
  { id: 'santiagodelestero', name: 'Santiago del Estero', capital: 'Santiago del Estero' },
  { id: 'tierradelfuego', name: 'Tierra del Fuego', capital: 'Ushuaia' },
  { id: 'tucuman', name: 'Tucumán', capital: 'San Miguel de Tucumán' },
  { id: 'caba', name: 'CABA', capital: 'Ciudad Autónoma de Buenos Aires' },
];

if (PROVINCES.length !== 24) throw new Error(`Se esperaban 24 jurisdicciones, hay ${PROVINCES.length}`);

const TECHNICAL_ID_PATTERNS = [
  /\bbuenos-aires\b/, /\btierradelfuego\b/, /\bsantiagodelestero\b/, /\brionegro\b/, /\bsanjuan\b/,
  /\bsanluis\b/, /\blapampa\b/, /\blarioja\b/, /\bsantacruz\b/, /\bsantafe\b/, /\bentrerios\b/,
  /oficial-[a-z0-9-]+/, /academica-[a-z0-9-]+/, /cientifica-[a-z0-9-]+/, /visual-[a-z0-9-]+/,
];

let pass = 0;
let fail = 0;
const failures = [];

function ok(label, condition, detail) {
  if (condition) pass += 1;
  else {
    fail += 1;
    failures.push(detail ? `${label} — ${detail}` : label);
    console.log(`  FAIL ${label}${detail ? ' — ' + detail : ''}`);
  }
}

async function selectProvince(page, province) {
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.fill('#provinceSelect', province.name);
  await page.click('a.geo-submit');
  await page.waitForURL('**/atlas', { timeout: 10000 });
}

async function run() {
  const browser = await chromium.launch();
  console.log(`\n=== Loop 3C — Ficha Provincial: auditoría de UI (${PROVINCES.length} jurisdicciones) ===\n`);

  // --- 1. Las 24 jurisdicciones: identidad/capital correctos, sin fuga entre provincias, sin ids técnicos ---
  for (const province of PROVINCES) {
    const page = await browser.newPage();
    await selectProvince(page, province);
    await page.goto(`${BASE_URL}/atlas/fundamentos/germinacion`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.province-profile-card', { timeout: 5000 });

    const fullCardText = await page.textContent('.province-profile-card');
    // La sección "Fuentes de esta ficha" cita, para TODAS las provincias, el mismo paper real
    // (Truffer et al. 2011) que en su título menciona "Entre Ríos" — es la fuente real que
    // documenta la relación fotoperiodo/latitud de la soja en Argentina, no un dato de Entre Ríos
    // filtrado a otra provincia. Se excluye esa lista de la comprobación de fuga de nombres; el
    // resto de la ficha (identidad, geografía, ambiente, luz, cultivo/cosecha) sí debe estar limpio.
    const sourcesListText = await page.locator('.province-profile-sources-list').textContent().catch(() => '');
    const cardText = fullCardText.replace(sourcesListText, '');

    ok(`${province.name}: ficha muestra su propio nombre`, cardText.includes(province.name));
    ok(`${province.name}: ficha muestra su propia capital`, cardText.includes(province.capital));

    // CABA es un caso legítimo de excepción: su propio nombre oficial ("Ciudad Autónoma de
    // Buenos Aires") contiene la cadena "Buenos Aires" sin que eso sea una fuga de datos de la
    // provincia de Buenos Aires — se verifica por separado, más abajo, que su capital mostrada
    // sea ella misma y no "La Plata" (la capital real de la provincia de Buenos Aires).
    const leaked = PROVINCES.filter((p) => {
      if (p.id === province.id) return false;
      if (province.id === 'caba' && p.id === 'buenos-aires') return false;
      return cardText.includes(p.name);
    });
    ok(`${province.name}: sin nombres de otras provincias en el cuerpo de la ficha (fuera de "Fuentes")`, leaked.length === 0, leaked.map((p) => p.name).join(', '));

    const idLeak = TECHNICAL_ID_PATTERNS.find((pattern) => pattern.test(cardText));
    ok(`${province.name}: sin ids técnicos visibles en la ficha`, !idLeak, idLeak ? String(idLeak) : '');

    await page.close();
  }

  // --- 2. Subconjunto representativo: ENTRY_FOCUS, fenología, marco-editorial, diferenciación ---
  console.log('\n-- Chequeo profundo: Buenos Aires, Mendoza, Tierra del Fuego, CABA --\n');

  const ENTRIES = [
    { category: 'fundamentos', entry: 'germinacion' },
    { category: 'suelo-y-agua', entry: 'sustrato-y-drenaje' },
    { category: 'luz-y-clima', entry: 'luz-y-fotoperiodo' },
    { category: 'sanidad', entry: 'lectura-de-senales' },
    { category: 'cultivo', entry: 'cultivo-en-secuencia' },
    { category: 'cosecha', entry: 'cosecha-y-maduracion' },
    { category: 'marco-legal', entry: 'marco-editorial' },
  ];

  const deepSet = PROVINCES.filter((p) => ['buenos-aires', 'mendoza', 'tierradelfuego', 'caba'].includes(p.id));
  const lightByProvince = {};

  for (const province of deepSet) {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('pageerror', (e) => consoleErrors.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });

    await selectProvince(page, province);

    for (const { category, entry } of ENTRIES) {
      await page.goto(`${BASE_URL}/atlas/${category}/${entry}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.province-profile-card', { timeout: 5000 });

      if (entry === 'marco-editorial') {
        const environmentBlocks = await page.locator('.province-profile-card .province-profile-block:has-text("Ambiente")').count();
        const cultivationBlocks = await page.locator('.province-profile-cultivation-block').count();
        ok(`${province.name}/marco-editorial: sin bloque Ambiente`, environmentBlocks === 0);
        ok(`${province.name}/marco-editorial: sin bloques Cultivo/Cosecha`, cultivationBlocks === 0);
      }

      if (entry === 'cultivo-en-secuencia' || entry === 'cosecha-y-maduracion') {
        const cardText = await page.textContent('.province-profile-card');
        ok(`${province.name}/${entry}: aparece "Referencia fenológica"`, cardText.includes('Referencia fenológica'));
        ok(`${province.name}/${entry}: incluye la aclaración exigida sobre calendario`, cardText.includes('Una referencia fenológica no constituye un calendario provincial de cultivo.'));
        ok(`${province.name}/${entry}: cita la especie de referencia (soja)`, cardText.includes('Glycine max'));

        const focusedBlocks = await page.locator('.province-profile-block-focus').count();
        ok(`${province.name}/${entry}: al menos un bloque de la ficha está marcado como foco (ENTRY_FOCUS)`, focusedBlocks > 0);
      }

      if (entry === 'luz-y-fotoperiodo') {
        const lightText = await page.textContent('.province-profile-card');
        const match = lightText.match(/(\d+[.,]\d+)\s*h\b/);
        if (match) lightByProvince[province.id] = match[1];
      }
    }

    ok(`${province.name}: sin errores de consola en las 7 entradas`, consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));
    await page.close();
  }

  // --- 3. Diferenciación real: el fotoperiodo (Luz) refleja la latitud real de cada provincia ---
  // Mendoza y CABA están a una latitud casi idéntica en la realidad (~34.6°S ambas) y por eso
  // pueden coincidir en horas de luz redondeadas — es el resultado físico correcto, no un error.
  // La comprobación real de diferenciación es que Tierra del Fuego (~54.8°S, mucho más al sur)
  // difiere claramente de las tres provincias del norte/centro.
  ok(
    'Diferenciación: Tierra del Fuego (extremo sur) muestra una duración de luz distinta de Buenos Aires/Mendoza/CABA',
    ['buenos-aires', 'mendoza', 'caba'].every((id) => lightByProvince[id] !== lightByProvince.tierradelfuego),
    JSON.stringify(lightByProvince)
  );
  ok('Diferenciación: se registró un valor de luz para las 4 provincias del subconjunto', Object.keys(lightByProvince).length === 4, JSON.stringify(lightByProvince));

  // CABA nunca se confunde con la Provincia de Buenos Aires
  {
    const page = await browser.newPage();
    await selectProvince(page, PROVINCES.find((p) => p.id === 'caba'));
    await page.goto(`${BASE_URL}/atlas/fundamentos/germinacion`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.province-profile-card');
    const identityText = await page.textContent('.province-profile-identity');
    ok('CABA: capital mostrada es la propia Ciudad Autónoma, no La Plata', identityText.includes('Ciudad Autónoma de Buenos Aires') && !identityText.includes('La Plata'));
    await page.close();
  }

  // --- 4. Sin provincia: ficha nacional mínima ---
  {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    // Loop 4.3 §1 eliminó "Explorar sin elegir" (redundante con "Explorar el Atlas") — se induce
    // el estado "sin provincia" directamente en vez de a través de un botón que ya no existe.
    await page.evaluate(() => window.localStorage.removeItem('atlas:selectedProvince'));
    await page.goto(`${BASE_URL}/atlas/fundamentos/germinacion`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.province-profile-card');

    const cardText = await page.textContent('.province-profile-card');
    ok('Sin provincia: la ficha muestra "Argentina"', cardText.includes('Argentina'));
    ok('Sin provincia: invita a elegir provincia en Inicio', cardText.includes('Elegí tu provincia'));
    ok('Sin provincia: no muestra bloque Ambiente/Cultivo', !cardText.includes('Ambiente') && !cardText.includes('Cultivo'));
    const broken = await page.$$eval('.province-profile-card img', (imgs) => imgs.filter((i) => !i.complete || i.naturalWidth === 0));
    ok('Sin provincia: sin imágenes rotas en la ficha', broken.length === 0);
    await page.close();
  }

  await browser.close();

  console.log(`\n=== Resultado: ${pass} OK / ${fail} FAIL (${pass + fail} verificaciones) ===\n`);
  if (fail > 0) {
    console.log('Fallas:');
    for (const f of failures) console.log(`  - ${f}`);
    process.exitCode = 1;
  }
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
