import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const artifacts = process.env.AUDIT_ARTIFACTS_DIR || '/tmp/atlas-public-experience';
await mkdir(artifacts, { recursive: true });
const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3001';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors=[]; page.on('pageerror', error=>errors.push(error.message));
try {
  await page.goto(base); await page.getByLabel('Provincia', {exact:true}).fill('Cór');
  assert.equal(await page.getByLabel('Provincia',{exact:true}).inputValue(),'Cór');
  await page.getByLabel('Provincia',{exact:true}).fill('Córdoba');
  await page.getByRole('link',{name:'Explorar Córdoba',exact:true}).click();
  await page.getByRole('heading',{name:'Explorá Córdoba'}).waitFor();
  assert.equal(await page.evaluate(()=>localStorage.getItem('atlas:selectedProvince')),'cordoba');
  await page.goto(base+'/chatbot?q=heladas');
  await page.locator('.chatbot-result-card').first().waitFor();
  assert.ok(await page.locator('.chatbot-result-card').count());
  await page.getByLabel('Provincia mencionada').selectOption('cordoba');
  await page.getByRole('button',{name:'Buscar',exact:true}).click();
  await page.locator('.chatbot-result-card').first().waitFor();
  await page.getByLabel('Provincia mencionada').selectOption('');
  await page.getByRole('button',{name:'Buscar',exact:true}).click();
  assert.equal(await page.getByText('Esta función está disponible para usuarios con cuenta.').count(),0);
  await page.locator('.chatbot-result-link').first().click();
  await page.getByRole('button',{name:'Guardar lectura',exact:true}).click();
  await page.getByText('Lectura guardada en este navegador.').waitFor();
  assert.ok(await page.locator('.entry-toc a').count());
  for(const link of await page.locator('.entry-toc a').all()) { const id=(await link.getAttribute('href')).slice(1); assert.equal(await page.locator(`[id="${id}"]`).count(),1); }
  const canonical=await page.locator('link[rel="canonical"]').getAttribute('href'); assert.ok(canonical.includes('/atlas/'));
  const json=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent()); assert.equal(json['@graph'][0]['@type'],'Article');
  await page.screenshot({path:`${artifacts}/article-desktop.png`,fullPage:true});
  await page.goto(base+'/lecturas'); await page.locator('.saved-reading-list li').waitFor(); assert.equal(await page.locator('.saved-reading-list li').count(),1);
  await page.reload(); await page.locator('.saved-reading-list li').waitFor();
  await page.getByRole('button',{name:/Quitar .* de guardadas/}).click(); await page.getByText('Todavía no guardaste lecturas.',{exact:false}).waitFor();
  await page.goto(base+'/mi-cultivo');
  await page.getByRole('heading',{name:'Iniciá sesión',exact:true}).waitFor();
  for (const selector of ['.dashboard-main', '.mi-cultivo-season-header', '.club-tabs', '.dashboard-fab', '.mi-cultivo-switcher-section']) {
    assert.equal(await page.locator(selector).count(), 0, `Private cultivation UI leaked: ${selector}`);
  }
  assert.equal(await page.getByText('Temporada sin nombre',{exact:true}).count(),0);
  // Existing local records must not make the private panel visible before login.
  await page.evaluate(() => localStorage.setItem('atlas:miCultivo', JSON.stringify({
    id:'local-audit', currentStageId:'germinacion', provinceId:'cordoba', seasonName:'Temporada privada de prueba',
    createdAt:'2026-10-01T12:00:00.000Z', events:[{id:'event-audit',stageId:'germinacion',date:'2026-10-02',note:'Observación privada de prueba'}], notes:[], plantCount:1,
  })));
  await page.reload();
  await page.getByRole('heading',{name:'Iniciá sesión',exact:true}).waitFor();
  assert.equal(await page.locator('.dashboard-main').count(),0);
  assert.equal(await page.getByText('Temporada privada de prueba',{exact:true}).count(),0);
  assert.equal(await page.getByText('Observación privada de prueba',{exact:true}).count(),0);
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('atlas:miCultivo')).events[0].note), 'Observación privada de prueba');
  await page.getByRole('button',{name:'Crear una cuenta nueva',exact:true}).click();
  await page.getByRole('heading',{name:'Creá tu cuenta',exact:true}).waitFor();
  assert.equal(await page.locator('.dashboard-main').count(),0);
  await page.getByRole('button',{name:'Ya tengo cuenta',exact:true}).click();
  assert.ok(await page.getByRole('link',{name:'Olvidé mi contraseña'}).count());
  const exportResponse=await page.request.get(base+'/api/cuenta/exportar'); assert.equal(exportResponse.status(),401);
  const deleteResponse=await page.request.delete(base+'/api/cuenta/eliminar',{headers:{origin:base},data:{confirmation:'ELIMINAR'}}); assert.equal(deleteResponse.status(),401);
  const invalid=await page.request.post(base+'/api/aportes',{headers:{origin:base},data:{type:'correccion',message:'breve',consent:true}}); assert.equal(invalid.status(),400);
  const crossOrigin=await page.request.post(base+'/api/aportes',{headers:{origin:'https://example.org'},data:{}});assert.equal(crossOrigin.status(),403);
  for(const path of ['/comunidad','/noticias','/privacidad','/aportes','/cuenta/recuperar']) {
    const response=await page.goto(base+path); assert.equal(response.status(),200); assert.equal(await page.locator('header.gh').count(),1); assert.equal(await page.locator('footer.club-footer').count(),1);
  }
  for(const width of [390,768,1440]) {
    await page.setViewportSize({width,height:900}); await page.goto(base); await page.getByLabel('Provincia',{exact:true}).waitFor();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);
    if(width===390) { const input=await page.getByLabel('Provincia',{exact:true}).boundingBox(); const map=await page.locator('.geo-map-wrap').boundingBox(); assert.ok(input.y<map.y); await page.screenshot({path:`${artifacts}/home-mobile.png`,fullPage:true}); }
    if(width===1440) await page.screenshot({path:`${artifacts}/home-desktop.png`,fullPage:true});
  }
  await page.setViewportSize({width:390,height:844});
  for (const path of ['/atlas','/chatbot','/lecturas','/aportes','/privacidad','/mi-cultivo']) {
    await page.goto(base+path); await page.waitForTimeout(300);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`mobile overflow ${path}`);
  }
  const socialImage=await page.request.get(base+'/opengraph-image'); assert.equal(socialImage.status(),200); assert.ok(socialImage.headers()['content-type'].includes('image/png'));
  assert.deepEqual(errors,[]); console.log('PASS: public search, geographic input, shared navigation, reading persistence, article metadata, cultivation session gate, unauthorized APIs and responsive layout.');
} finally { await browser.close(); }
