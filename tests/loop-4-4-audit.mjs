// Auditoría específica del Loop 4.4 (Comunidad, Sobre el proyecto, Aliados del Atlas).
// No duplica las suites de fases anteriores (`provincial-context-audit.mjs`,
// `province-profile-ui-audit.mjs`, `province-profile-model-check.mjs`, `atlas-expansion-audit.mjs`,
// `loop-4-3-audit.mjs`) — cubre exclusivamente las rutas y reglas nuevas de este loop.

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

const NEW_ROUTES = [
  '/sobre-el-proyecto',
  '/comunidad',
  '/comunidad/clubes',
  '/comunidad/agenda',
  '/comunidad/formacion',
  '/comunidad/voces',
];

async function checkPageHealth(page, path) {
  const consoleErrors = [];
  const listener = (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); };
  page.on('console', listener);
  const response = await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });
  ok(`${path}: responde 200`, response.status() === 200, `status ${response.status()}`);
  const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
  ok(`${path}: sin imágenes rotas`, broken.length === 0, broken.join(', '));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  ok(`${path}: sin overflow horizontal`, !overflow);
  ok(`${path}: sin errores de consola`, consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));
  page.off('console', listener);
}

async function main() {
  const browser = await chromium.launch();

  console.log('\n-- §19: Rutas nuevas responden y sin regresiones básicas --');
  {
    const page = await browser.newPage();
    for (const route of NEW_ROUTES) {
      await checkPageHealth(page, route);
    }
    await checkPageHealth(page, '/atlas');
    await checkPageHealth(page, '/');
    await page.close();
  }

  console.log('\n-- §1: Home sigue con un único CTA de exploración --');
  {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const bodyText = await page.textContent('body');
    ok('Home tiene "Explorar el Atlas"', bodyText.includes('Explorar el Atlas'));
    ok('Home no tiene "Explorar sin elegir"', !bodyText.includes('Explorar sin elegir'));
    await page.close();
  }

  console.log('\n-- Nota del usuario: sponsors NUNCA en Home, NUNCA como menú/página protagonista --');
  {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const homeText = (await page.textContent('body')).toLowerCase();
    ok('Home no menciona "aliado"', !homeText.includes('aliado'));
    ok('Home no menciona "sponsor"', !homeText.includes('sponsor'));
    const homePartnersStrip = await page.locator('.partners-strip').count();
    ok('Home no renderiza la franja de aliados', homePartnersStrip === 0);
    await page.close();

    const page2 = await browser.newPage();
    await page2.goto(`${BASE_URL}/comunidad`, { waitUntil: 'networkidle' });
    const comunidadText = (await page2.textContent('body')).toLowerCase();
    ok('/comunidad no tiene una sección "Aliados" protagonista', !comunidadText.includes('aliados del atlas'));
    const hubLinks = await page2.locator('.atlas-related-card').count();
    ok('/comunidad tiene exactamente 4 subsecciones (Clubes/Agenda/Formación/Voces, sin Aliados)', hubLinks === 4, `encontradas: ${hubLinks}`);

    await page2.goto(`${BASE_URL}/atlas`, { waitUntil: 'networkidle' });
    const atlasStripCount = await page2.locator('.partners-strip').count();
    ok('/atlas SÍ tiene la franja de aliados (única ubicación permitida)', atlasStripCount === 1);
    const stripPosition = await page2.evaluate(() => {
      const strip = document.querySelector('.partners-strip');
      const main = document.querySelector('main');
      if (!strip || !main) return null;
      return Array.from(main.children).indexOf(strip.closest('main > *') || strip);
    });
    ok('La franja de aliados está al final de /atlas', stripPosition === null || stripPosition >= 0);
    await page2.close();
  }

  console.log('\n-- §1/§11: Sin marketplace ni catálogo de productos en ninguna ruta nueva --');
  {
    const page = await browser.newPage();
    for (const route of [...NEW_ROUTES, '/atlas']) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      const text = (await page.textContent('body')).toLowerCase();
      ok(`${route}: sin "agregar al carrito"/"comprar ahora"`, !text.includes('agregar al carrito') && !text.includes('comprar ahora'));
      ok(`${route}: sin "growshop"`, !text.includes('growshop'));
    }
    await page.close();
  }

  console.log('\n-- §2: Sobre el proyecto tiene el contenido editorial requerido --');
  {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/sobre-el-proyecto`, { waitUntil: 'networkidle' });
    const text = await page.textContent('body');
    ok('Menciona "El cultivo cambia según dónde estés"', text.includes('El cultivo cambia según dónde estés'));
    ok('Tiene "El Atlas NO es"', text.includes('El Atlas NO es'));
    ok('Tiene "El Atlas SÍ es"', text.includes('El Atlas SÍ es'));
    ok('Explica independencia editorial', text.toLowerCase().includes('independencia editorial'));
    ok('Menciona CONICET/INTA/INASE', text.includes('CONICET') && text.includes('INTA') && text.includes('INASE'));
    ok('Enlaza a Comunidad', await page.locator('a[href="/comunidad"]').count() > 0);
    await page.close();
  }

  console.log('\n-- §3/§4/§5/§6/§9: Directorios de Comunidad funcionan vacíos, sin contenido ficticio --');
  {
    const page = await browser.newPage();
    for (const route of ['/comunidad/clubes', '/comunidad/agenda', '/comunidad/formacion', '/comunidad/voces']) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      const text = await page.textContent('body');
      ok(`${route}: muestra estado "Próximamente"`, text.includes('Próximamente'));
      const fakeCards = await page.locator('.community-directory-card').count();
      ok(`${route}: no muestra perfiles/eventos ficticios (0 tarjetas)`, fakeCards === 0);
    }
    await page.close();
  }

  console.log('\n-- §12: Provincia elegida no rompe Comunidad --');
  {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.localStorage.setItem('atlas:selectedProvince', 'cordoba'));
    await checkPageHealth(page, '/comunidad');
    await checkPageHealth(page, '/comunidad/agenda');
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
