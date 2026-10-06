import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base=process.env.AUDIT_BASE_URL||'http://127.0.0.1:3001';
const browser=await chromium.launch();const page=await browser.newPage();
try {
  let received;
  await page.route('**/api/aportes',async route=>{received=route.request().postDataJSON();await route.fulfill({status:503,json:{error:'No se pudo guardar el aporte.'}})});
  await page.goto(base+'/aportes?tipo=correccion&referencia=%2Fatlas%2Fluz-y-clima%2Fheladas');
  const message=page.getByLabel('Tu aporte',{exact:true});await message.fill('Revisar esta referencia: el enlace de la fuente no responde.');
  await page.getByRole('checkbox').check();await page.getByRole('button',{name:'Enviar aporte'}).click();
  await page.getByText('No se pudo guardar el aporte.',{exact:true}).waitFor();
  assert.ok((await message.inputValue()).includes('Revisar esta referencia'));
  assert.equal(received.reference,'/atlas/luz-y-clima/heladas');assert.equal(received.consent,true);
  await page.unroute('**/api/aportes');
  await page.route('**/api/aportes',async route=>route.fulfill({status:200,json:{ok:true}}));
  await page.getByRole('button',{name:'Enviar aporte'}).click();await page.getByText('Recibimos tu aporte.',{exact:false}).waitFor();assert.equal(await message.inputValue(),'');
  let recovery;
  await page.route('**/auth/v1/recover**',async route=>{recovery={body:route.request().postDataJSON(),url:route.request().url()};await route.fulfill({status:200,json:{}})});
  await page.goto(base+'/cuenta/recuperar');await page.getByLabel('Email',{exact:true}).fill('audit@example.test');await page.getByRole('button',{name:'Pedir enlace'}).click();await page.getByText('Si existe una cuenta con ese email',{exact:false}).waitFor();
  assert.equal(recovery.body.email,'audit@example.test');const redirect=new URL(recovery.url).searchParams.get('redirect_to');assert.ok(redirect.includes('/auth/callback?next='));
  console.log('PASS: contribution prefill, consent, error preservation, success reset and password recovery redirect (mocked delivery; no email sent).');
} finally {await browser.close();}
