import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3001';
const artifacts = process.env.AUDIT_ARTIFACTS_DIR || '/tmp/atlas-regional-landscapes';
await mkdir(artifacts, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.setDefaultTimeout(60000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));

try {
  await page.route('**/api/climate?*', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"Weather unavailable in audit"}' }));
  await page.goto(base);
  await page.getByRole('heading', { name: 'Paisajes de las provincias' }).waitFor();
  assert.equal(await page.locator('.province-landscape-card').count(), 5);
  assert.equal(await page.locator('.map-provinces path').count(), 24);
  for (const image of await page.locator('.province-landscape-image>img, .geo-botanical img').all()) { await image.scrollIntoViewIfNeeded(); await page.waitForFunction(img => img.complete && img.naturalWidth > 0, await image.elementHandle()); }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));

  for (const [name, region] of [['Jujuy','noa'], ['Misiones','nea'], ['Mendoza','cuyo'], ['Buenos Aires','pampeana'], ['Río Negro','patagonia']]) {
    await page.getByRole('button', { name: `Elegir ${name}`, exact: true }).click();
    await page.waitForFunction(id => document.querySelector('.field-banner')?.dataset.region === id, region);
    assert.equal(await page.getByLabel('Provincia', { exact: true }).inputValue(), name);
    assert.ok(await page.locator('.field-banner').evaluate(el => getComputedStyle(el).backgroundImage.includes(`banner-${el.dataset.region}.webp`)));
    assert.equal(await page.locator('.map-province.selected').getAttribute('aria-label'), name);
    assert.ok((await page.locator('.territorial-region-label').innerText()).includes('Panorama regional'));
  }
  await page.getByRole('button', { name: 'Cuyo', exact: true }).click();
  assert.equal(await page.locator('.province-landscape-card').count(), 1);
  await page.getByRole('button', { name: 'Todas', exact: true }).click();
  assert.equal(await page.locator('.province-landscape-card').count(), 5);

  await page.locator('path[aria-label="Mendoza"]').focus();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Valle de Uco', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.territorial-context-location')?.textContent.includes('Valle de Uco'));
  await page.reload();
  await page.getByRole('button', { name: 'Valle de Uco', exact: true }).waitFor();
  assert.equal(await page.getByRole('button', { name: 'Valle de Uco', exact: true }).getAttribute('aria-pressed'), 'true');
  await page.getByText('No pudimos obtener el clima en este momento.', { exact: true }).waitFor();

  const other = await context.newPage();
  await other.goto(base + '/atlas');
  await other.waitForFunction(() => document.querySelector('.regional-context-header')?.dataset.region === 'cuyo');
  await page.getByRole('button', { name: 'Elegir Misiones', exact: true }).click();
  await other.waitForFunction(() => document.querySelector('.regional-context-header')?.dataset.region === 'nea');
  await other.getByText('Viendo · Misiones', { exact: true }).waitFor();
  await other.close();

  await page.getByRole('button', { name: 'Quitar provincia', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.field-banner')?.dataset.region === 'argentina');
  assert.equal(await page.evaluate(() => localStorage.getItem('atlas:selectedProvince')), null);
  assert.equal(await page.locator('.mini-province-selected').filter({ visible: true }).count(), 5); // Five fixed photographic location maps.
  await page.getByLabel('Provincia', { exact: true }).fill('Cór');
  assert.equal(await page.getByLabel('Provincia', { exact: true }).inputValue(), 'Cór');
  await page.getByText('No encontramos esa provincia.', { exact: false }).waitFor();
  await page.getByLabel('Provincia', { exact: true }).fill('');

  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ['', '/atlas', '/atlas/regiones']) {
      const response = await page.goto(base + path);
      assert.equal(response.status(), 200);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow ${path || '/'} at ${width}`);
    }
    await page.goto(base);
    for (const image of await page.locator('.province-landscape-image>img, .geo-botanical img').all()) { await image.scrollIntoViewIfNeeded(); await page.waitForFunction(img => img.complete && img.naturalWidth > 0, await image.elementHandle()); }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `${artifacts}/home-${width}.png`, fullPage: true });
  }

  await page.goto(base + '/atlas/regiones');
  assert.equal(await page.locator('.regional-landscape-section').count(), 5);
  assert.equal(await page.locator('.regional-province-links li').count(), 24);
  await page.locator('#region-cuyo').getByRole('link', { name: 'Mendoza', exact: false }).click();
  await page.waitForURL('**/atlas');
  await page.waitForFunction(() => document.querySelector('.regional-context-header')?.dataset.region === 'cuyo');
  assert.equal(await page.evaluate(() => localStorage.getItem('atlas:selectedProvince')), 'mendoza');
  await page.getByRole('button', { name: 'Elegir Misiones', exact: true }).click();
  await page.getByText('Viendo · Misiones', { exact: true }).waitFor();
  await page.getByRole('heading', { name: 'Explorá Misiones', exact: true }).waitFor();

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base);
  assert.equal(await page.locator('.map-province').first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  const sitemap = await page.request.get(base + '/sitemap.xml');
  assert.ok((await sitemap.text()).includes('/atlas/regiones'));

  // A failed photographic request retains the card's selection and exploration controls.
  const failedContext = await browser.newContext();
  const failed = await failedContext.newPage();
  await failed.route('**/_next/image?*', route => route.abort());
  await failed.goto(base);
  await failed.getByText('La fotografía no está disponible.', { exact: true }).first().waitFor();
  await failed.getByRole('button', { name: 'Elegir Jujuy', exact: true }).click();
  await failed.waitForFunction(() => document.querySelector('.field-banner')?.dataset.region === 'noa');
  await failedContext.close();
  const blockedContext = await browser.newContext();
  await blockedContext.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error('Storage unavailable in audit'); }; });
  const blocked = await blockedContext.newPage();
  await blocked.goto(base);
  await blocked.getByRole('button', { name: 'Elegir Jujuy', exact: true }).click();
  await blocked.waitForFunction(() => document.querySelector('.field-banner')?.dataset.region === 'noa');
  assert.equal(await blocked.getByLabel('Provincia', { exact: true }).inputValue(), 'Jujuy');
  await blockedContext.close();
  assert.deepEqual(errors, []);
  console.log('PASS: five regional banners, photo selection/filtering, map keyboard input, zone persistence, cross-tab synchronization, source pages, responsive layouts, reduced motion photo/weather error states and selection with blocked storage.');
} finally {
  await browser.close();
}
