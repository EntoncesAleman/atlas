// Auditoría específica del Loop 4.3 (navegación del Atlas + Ficha Provincial centrada en
// Cannabis). No duplica `provincial-context-audit.mjs` (24 jurisdicciones × 7 entradas
// originales, sin modificar), `province-profile-model-check.mjs` (modelo de datos completo) ni
// `province-profile-ui-audit.mjs` (Ficha Provincial genérica) — cubre exclusivamente lo nuevo de
// este loop: remoción de "Explorar sin elegir", las 3 entradas nuevas (Formas de germinar, Poda,
// Fertilización y nutrición), altitud, luz estacional, y la jerarquía de evidencia Cannabis-primero
// (evidencia directa de Chubut > evidencia general de Cannabis > analogía con soja como último
// recurso, nunca al revés).

import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

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

async function setProvince(page, provinceId) {
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.evaluate((id) => window.localStorage.setItem('atlas:selectedProvince', id), provinceId);
}

async function main() {
  const browser = await chromium.launch();

  console.log('\n-- §1: Home tiene un único CTA de exploración --');
  {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const bodyText = await page.textContent('body');
    ok('Home ya no tiene "Explorar sin elegir"', !bodyText.includes('Explorar sin elegir'));
    ok('Home conserva "Explorar el Atlas"', bodyText.includes('Explorar el Atlas'));
    const geoClearCount = await page.locator('a.geo-clear').count();
    ok('No queda ningún elemento .geo-clear en el DOM', geoClearCount === 0);
    await page.click('text=Explorar el Atlas');
    await page.waitForURL('**/atlas', { timeout: 10000 });
    ok('"Explorar el Atlas" navega a /atlas', page.url().endsWith('/atlas'));
    await page.close();
  }

  console.log('\n-- §2-5: Grid, categorías y navegación diferenciada --');
  {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/atlas/fundamentos`, { waitUntil: 'networkidle' });
    const fundamentosText = await page.textContent('body');
    ok('Categoría Crecimiento tiene intro editorial', fundamentosText.length > 200);
    ok('Crecimiento lista "Germinación y primera lectura del material"', fundamentosText.includes('Germinación y primera lectura del material'));
    ok('Crecimiento lista "Formas de germinar"', fundamentosText.includes('Formas de germinar'));
    const fundamentosCards = await page.locator('.atlas-entry-card').count();
    ok('Crecimiento muestra 2 tarjetas de entrada diferenciadas', fundamentosCards === 2, `encontradas: ${fundamentosCards}`);

    await page.goto(`${BASE_URL}/atlas/cultivo`, { waitUntil: 'networkidle' });
    const cultivoText = await page.textContent('body');
    ok('Cultivo lista "Cultivo en secuencia"', cultivoText.includes('Cultivo en secuencia'));
    ok('Cultivo lista "Poda"', cultivoText.includes('Poda'));
    ok('Cultivo lista "Fertilización y nutrición"', cultivoText.includes('Fertilización y nutrición'));
    const cultivoCards = await page.locator('.atlas-entry-card').count();
    // 4 desde el Loop 4.4.1 (se sumó "Ciclo de vida y condiciones de referencia" a las 3 de 4.3).
    ok('Cultivo muestra 4 tarjetas de entrada diferenciadas', cultivoCards === 4, `encontradas: ${cultivoCards}`);

    await page.goto(`${BASE_URL}/atlas/cultivo/poda`, { waitUntil: 'networkidle' });
    ok('Poda es alcanzable por URL directa', page.url().endsWith('/atlas/cultivo/poda'));
    const podaText = await page.textContent('body');
    ok('Poda no da ninguna tabla de dosis ni instrucción paso a paso', !podaText.toLowerCase().includes('gramos') && !podaText.toLowerCase().includes('ppm'));

    await page.goto(`${BASE_URL}/atlas/cultivo/fertilizacion-y-nutricion`, { waitUntil: 'networkidle' });
    ok('Fertilización y nutrición es alcanzable por URL directa', page.url().endsWith('/atlas/cultivo/fertilizacion-y-nutricion'));
    const fertText = await page.textContent('body');
    ok('Fertilización no da ninguna tabla de dosis universal', !fertText.toLowerCase().includes('ppm') && !fertText.toLowerCase().includes('ml/l'));
    ok('Fertilización explica movilidad de nutrientes', fertText.includes('movilidad') || fertText.includes('móvil'));

    await page.goto(`${BASE_URL}/atlas/fundamentos/formas-de-germinar`, { waitUntil: 'networkidle' });
    ok('Formas de germinar es alcanzable por URL directa', page.url().endsWith('/atlas/fundamentos/formas-de-germinar'));
    await page.close();
  }

  console.log('\n-- §6/§14: Ficha Provincial — altitud y luz estacional --');
  {
    const page = await browser.newPage();
    await setProvince(page, 'mendoza');
    await page.goto(`${BASE_URL}/atlas/fundamentos/germinacion`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.province-profile-card');
    const cardText = await page.textContent('.province-profile-card');
    ok('Ficha Provincial muestra altitud en metros', cardText.includes('m s. n. m.'));
    ok('Ficha Provincial distingue día astronómico de horas de sol reales', cardText.toLowerCase().includes('astronóm'));
    ok('Ficha Provincial muestra las 4 estaciones', ['Verano', 'Otoño', 'Invierno', 'Primavera'].every((s) => cardText.includes(s)));
    await page.close();
  }

  console.log('\n-- §7/§9/§11: Jerarquía Cannabis-primero — Chubut vs. resto --');
  {
    const page = await browser.newPage();
    await setProvince(page, 'chubut');
    await page.goto(`${BASE_URL}/atlas/cultivo/cultivo-en-secuencia`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.province-profile-card');
    const chubutText = await page.textContent('.province-profile-card');
    ok('Chubut muestra evidencia directa propia', chubutText.includes('Evidencia directa de esta provincia'));
    ok('Chubut menciona los cultivares CONICET-CENPAT', chubutText.includes('Malvina'));
    ok('Chubut también muestra evidencia general de Cannabis', chubutText.includes('Evidencia general de Cannabis'));
    const chubutDirectIndex = chubutText.indexOf('Evidencia directa de esta provincia');
    const chubutGeneralIndex = chubutText.indexOf('Evidencia general de Cannabis');
    const chubutLastResortIndex = chubutText.indexOf('último recurso');
    ok('Orden correcto: directa antes que general antes que analogía', chubutDirectIndex >= 0 && chubutGeneralIndex > chubutDirectIndex && (chubutLastResortIndex === -1 || chubutLastResortIndex > chubutGeneralIndex));

    await page.close();

    const page2 = await browser.newPage();
    await setProvince(page2, 'buenos-aires');
    await page2.goto(`${BASE_URL}/atlas/cultivo/cultivo-en-secuencia`, { waitUntil: 'networkidle' });
    await page2.waitForSelector('.province-profile-card');
    const baText = await page2.textContent('.province-profile-card');
    ok('Buenos Aires NO muestra evidencia directa propia (no tiene)', !baText.includes('Evidencia directa de esta provincia'));
    ok('Buenos Aires SÍ muestra evidencia general de Cannabis (fallback, no soja primero)', baText.includes('Evidencia general de Cannabis'));
    ok('Buenos Aires no muestra "Malvina" (evidencia de Chubut no se generaliza)', !baText.includes('Malvina'));
    const baGeneralIndex = baText.indexOf('Evidencia general de Cannabis');
    const baSummaryLabel = await page2.locator('.province-profile-badge-lastresort').first().textContent().catch(() => '');
    ok('La analogía con soja queda etiquetada explícitamente como último recurso', baSummaryLabel.includes('último recurso'));
    const baLastResortDetails = page2.locator('.province-profile-evidence-lastresort');
    const lastResortCount = await baLastResortDetails.count();
    ok('La tarjeta de analogía con soja usa <details> (colapsada por defecto)', lastResortCount > 0);
    if (lastResortCount > 0) {
      const isOpenByDefault = await baLastResortDetails.first().evaluate((el) => el.hasAttribute('open'));
      ok('La analogía con soja NO está abierta por defecto (subordinada visualmente)', !isOpenByDefault);
    }
    ok('Ningún id técnico visible (ej. "cultivo_referencia_fenologica")', !baText.includes('cultivo_referencia_fenologica') && !baText.includes('cultivo_evidencia_general_cannabis'));
    await page2.close();
  }

  console.log('\n-- §9: Fallback general de Cannabis sin datos provinciales --');
  {
    const page = await browser.newPage();
    await setProvince(page, 'formosa');
    await page.goto(`${BASE_URL}/atlas/cosecha/cosecha-y-maduracion`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.province-profile-card');
    const text = await page.textContent('.province-profile-card');
    ok('Formosa (sin evidencia propia) recibe evidencia general de Cannabis en Cosecha', text.includes('Evidencia general de Cannabis'));
    await page.close();
  }

  console.log(`\n=== Resultado: ${pass} OK / ${fail} FAIL (${pass + fail} verificaciones) ===`);
  await browser.close();
  if (fail > 0) {
    console.log('\nFallas:');
    failures.forEach((f) => console.log(` - ${f}`));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error inesperado en la auditoría:', error);
  process.exit(1);
});
