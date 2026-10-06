import assert from 'node:assert/strict';
import { access, mkdir, stat } from 'node:fs/promises';
import { chromium } from 'playwright';
import { getEntries, getCategoryById, getCategories } from '../src/app/lib/editorial/registry.js';
import { assets, assetsForEntry, assetForCategory } from '../src/app/lib/editorial/assets.js';
import { sourceById } from '../src/app/lib/editorial/sources.js';
import { openVisuals } from '../src/app/lib/editorial/openVisuals.js';
import { generatedVisuals } from '../src/app/lib/editorial/generatedVisuals.js';
const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3001';
const artifacts = '/tmp/atlas-visual-audit';
await mkdir(artifacts, { recursive: true });
const entries = getEntries();
const withImages = entries.filter(entry => assetsForEntry(entry.id).length);
assert.equal(withImages.length, entries.length, 'Todas las entradas publicadas tienen imagen');
for (const asset of generatedVisuals) {
  await access(`public${asset.file}`);
  assert.ok((await stat(`public${asset.file}`)).size > 1000);
  assert.equal(asset.generated, true);
  assert.equal(asset.sourceId, null);
  assert.equal(asset.license, 'Interno');
  assert.ok(asset.width > 0 && asset.height > 0);
  assert.ok(entries.some(entry => entry.id === asset.entryId));
}
assert.equal(new Set(assets.map(asset => asset.id)).size, assets.length, 'IDs de imágenes únicos');
for (const asset of openVisuals) {
  await access(`public${asset.file}`);
  assert.ok((await stat(`public${asset.file}`)).size > 1000);
  assert.ok(sourceById(asset.sourceId), `${asset.id}: fuente registrada`);
  assert.match(asset.sourceUrl, /^https:\/\/(commons.wikimedia.org\/wiki\/|journals.plos.org\/|www.mdpi.com\/)/);
  assert.match(asset.license, /^(CC BY(?:-SA)? \d\.\d|CC0|Dominio público)$/);
  assert.ok(asset.licenseUrl && asset.author && asset.verifiedAt && asset.modifications);
  assert.ok(asset.entryIds.every(id => entries.some(entry => entry.id === id)), `${asset.id}: destinos reales`);
}
assert.equal(assetsForEntry('cosecha-y-maduracion')[0].id, 'asset-open-tricomas');
const browser = await chromium.launch();
const page = await browser.newPage();
page.setDefaultNavigationTimeout(90000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const candidates = ['super-cropping', 'documental-madre-planta', 'documental-el-profe', 'sustrato-y-drenaje', 'luz-y-fotoperiodo', 'textura-estructura-porosidad', 'historia-de-la-planta-argentina', 'cosecha-y-maduracion', 'moho-gris-botrytis-cinerea', 'ph-y-disponibilidad-de-nutrientes', 'poda-de-bajos-bblr', 'humedad-relativa-transpiracion-vpd', 'espectro-de-luz-azul-rojo-rojo-lejano'];
try {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    for (const id of candidates) {
      console.log('Visual check', width, id);
      const entry = entries.find(entry => entry.id === id);
      const asset = assetsForEntry(id)[0];
      if (!asset) continue;
      const category = getCategoryById(entry.categoryId);
      assert.equal((await page.goto(`${base}/atlas/${category.slug}/${entry.slug}`, {waitUntil: 'domcontentloaded'})).status(), 200);
      await page.locator('.editorial-visual img').evaluate(img => img.decode());
      const result = await page.locator('.editorial-visual img').evaluate(img => ({ fit: getComputedStyle(img).objectFit, position: getComputedStyle(img).objectPosition, width: img.naturalWidth, height: img.naturalHeight }));
      assert.equal(result.fit, 'contain', `${id}: figura completa`);
      assert.equal(result.position, '50% 50%', `${id}: sujeto centrado`);
      assert.ok(result.width > 0 && result.height > 0, `${id}: imagen cargada`);
      if (asset.generated) {
        assert.match(await page.locator('.editorial-visual-caption').innerText(), /generada con IA/i);
        assert.equal(await page.locator('.editorial-visual-credit').innerText(), asset.credit);
      } else assert.equal(await page.locator('.editorial-visual-caption a[href="'+asset.sourceUrl+'"]').count(), 1);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${id}: sin desbordamiento a ${width}px`);
      if (['super-cropping','documental-madre-planta','documental-el-profe','sustrato-y-drenaje','cosecha-y-maduracion','textura-estructura-porosidad'].includes(id)) await page.screenshot({ path: `${artifacts}/${id}-${width}.png` });
    }
  }
  for (const category of getCategories()) {
    assert.equal((await page.goto(`${base}/atlas/${category.slug}`, {waitUntil: 'domcontentloaded'})).status(), 200);
    await page.locator('.editorial-visual img').evaluate(img => img.decode());
    const actual = await page.locator('.editorial-visual img').getAttribute('src');
    assert.equal(actual, assetForCategory(category.id).file);
    // Lazy thumbnails decode on demand; this checks every assigned image, including below the fold.
    const broken = await page.locator('img').evaluateAll(async imgs => {
      const results = await Promise.all(imgs.map(async img => { try { img.loading = 'eager'; await img.decode(); return null; } catch { return img.src; } }));
      return results.filter(Boolean);
    });
    assert.deepEqual(broken, [], `${category.slug}: sin imágenes rotas`);
  }
  await page.goto(base + '/creditos', {waitUntil: 'domcontentloaded'});
  for (const asset of openVisuals) assert.equal(await page.locator(`.credit-card a[href="${asset.sourceUrl}"]`).count(), 1);
  for (const asset of generatedVisuals) {
    const card = page.locator('.credit-card').filter({ has: page.locator(`img[src="${asset.file}"]`) });
    assert.equal(await card.count(), 1);
    assert.match(await card.innerText(), /generada con IA/i);
  }
  assert.deepEqual(errors, []);
  console.log(`${withImages.length}/${entries.length} entradas con imagen; ${openVisuals.length} nuevas fuentes; licencias, archivos, atribuciones y encuadres verificados en 390px y 1440px.`);
} finally { await browser.close(); }
