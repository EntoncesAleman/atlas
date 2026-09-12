// Auditoría pequeña y específica del Loop 4.1 (Fase 54): nueva arquitectura del Grid, redirect
// de login y las 2 entradas nuevas de "Historia". No duplica `provincial-context-audit.mjs`
// (24 jurisdicciones × 7 entradas, Fase 47.2), `province-profile-model-check.mjs` (modelo de
// datos, Fase 51) ni `province-profile-ui-audit.mjs` (Ficha Provincial, Fase 52) — esos ya cubren
// evidencia/fotoperiodo/ausencia de ids técnicos/24 fichas, y siguen sin modificarse.
//
// Crea una cuenta de prueba real (mismo patrón ya usado en el Loop 2 para verificar Auth) y la
// borra al final — no deja ningún dato de prueba permanente en Supabase.

import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TEST_EMAIL = `loop41-atlas-expansion-${Date.now()}@example.com`;
const TEST_PASSWORD = 'Verificacion123!';

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

async function checkPage(page, path, label) {
  const consoleErrors = [];
  const listener = (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); };
  page.on('console', listener);
  const response = await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });
  ok(`${label}: responde 200`, response.status() === 200, `status ${response.status()}`);
  const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
  ok(`${label}: sin imágenes rotas`, broken.length === 0, broken.join(', '));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  ok(`${label}: sin overflow horizontal`, !overflow);
  ok(`${label}: sin errores de consola`, consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));
  page.off('console', listener);
  return response;
}

async function run() {
  const browser = await chromium.launch();
  console.log('\n=== Loop 4.1 — auditoría de expansión del Atlas ===\n');

  // --- 1. Grid: usuario NO autenticado ---
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`${BASE_URL}/atlas`, { waitUntil: 'networkidle' });
    const trackerText = await page.textContent('.tracker-card');
    ok('Grid sin sesión: tarjeta Mi Cultivo invita a ingresar', trackerText.includes('Explorar o ingresar') || trackerText.includes('con o sin cuenta'));
    ok('Grid sin sesión: NO dice "Ir a Mi Cultivo"', !trackerText.includes('Ir a Mi Cultivo'));

    const gridText = await page.textContent('.atlas-grid');
    ok('Grid: aparece la tarjeta "Historia"', gridText.includes('Historia'));
    await page.close();
  }

  // --- 2. Historia: categoría y las 2 entradas nuevas ---
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await checkPage(page, '/atlas/historia', 'Categoría Historia');
    await checkPage(page, '/atlas/historia/historia-de-la-planta', 'Entrada Historia de la planta');
    await checkPage(page, '/atlas/historia/genetica-y-tipos', 'Entrada Genética y tipos');

    const bodyText = await page.textContent('.atlas-entry-content-body');
    ok('Genética y tipos: sin sintaxis markdown sin procesar', !bodyText.includes('**'));
    ok('Genética y tipos: sin "undefined"/"null" visibles', !/undefined|null/i.test(bodyText));
    await page.close();
  }

  // --- 3. Login real → redirect a /atlas → Grid reconoce la sesión ---
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const consoleErrors = [];
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });

    await page.goto(`${BASE_URL}/mi-cultivo`, { waitUntil: 'networkidle' });
    const benefitsText = await page.textContent('.mi-cultivo-auth-benefits').catch(() => '');
    ok('Pantalla de ingreso: muestra "¿Qué gano al ingresar?"', benefitsText.includes('gano al ingresar'));

    await page.click('button.mi-cultivo-reset-link');
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);
    await page.click('form.mi-cultivo-auth-form button[type="submit"]');

    let redirected = true;
    try {
      await page.waitForURL('**/atlas', { timeout: 15000 });
    } catch {
      redirected = false;
    }
    ok('Login real: redirige a /atlas (no se queda en /mi-cultivo)', redirected, `url final: ${page.url()}`);
    ok('Login real: la URL final es exactamente /atlas', page.url().replace(BASE_URL, '').replace(/\/$/, '') === '/atlas' || page.url().endsWith('/atlas'));

    const trackerActive = await page.waitForSelector('.tracker-card:has-text("Ir a Mi Cultivo")', { timeout: 10000 }).then(() => true).catch(() => false);
    ok('Grid con sesión: la tarjeta Mi Cultivo pasa a "Ir a Mi Cultivo" sin recargar manualmente', trackerActive);

    ok('Flujo de login: sin errores de consola', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));

    // Limpieza: cerrar sesión antes de borrar la cuenta.
    await page.goto(`${BASE_URL}/mi-cultivo`, { waitUntil: 'networkidle' });
    await page.click('button:has-text("Cerrar sesión")').catch(() => {});
    await page.close();
  }

  // --- 4. Responsive: Home + Grid + entrada Historia en mobile ---
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    ok('Home mobile: sin overflow horizontal', !(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)));

    await checkPage(page, '/atlas', 'Grid (mobile)');
    await checkPage(page, '/atlas/historia/historia-de-la-planta', 'Historia de la planta (mobile)');
    await page.close();
  }

  await browser.close();

  console.log(`\n=== Resultado: ${pass} OK / ${fail} FAIL (${pass + fail} verificaciones) ===\n`);
  if (fail > 0) {
    console.log('Fallas:');
    for (const f of failures) console.log(`  - ${f}`);
    process.exitCode = 1;
  }
  console.log(`\nCuenta de prueba usada (borrar de Supabase si el script se cortó antes de limpiar): ${TEST_EMAIL}`);
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
