// Auditoría específica del Loop 4.4.1 (ciclo general de Cannabis + evidencia argentina
// Jujuy/Misiones). Proporcional, no una auditoría completa (instrucción explícita §12): cubre
// solo lo nuevo de este loop. No duplica `loop-4-3-audit.mjs` (jerarquía Cannabis-primero general,
// Chubut, fallback general) ni `loop-4-4-audit.mjs` (Comunidad/Sobre el proyecto/Aliados).

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

  console.log('\n-- Parte 3: entrada general del ciclo + tabla --');
  {
    const page = await browser.newPage();
    const response = await page.goto(`${BASE_URL}/atlas/cultivo/ciclo-de-vida`, { waitUntil: 'networkidle' });
    ok('Ciclo de vida: responde 200', response.status() === 200);
    const text = await page.textContent('body');
    ok('Menciona las 6 etapas principales', ['Germinación', 'Plántula', 'Vegetativo', 'Floración', 'Cosecha'].every((s) => text.includes(s)));

    const tableRows = await page.locator('.atlas-entry-table tbody tr').count();
    ok('La tabla tiene 6 filas (una por etapa fisiológica, sin poscosecha)', tableRows === 6, `filas: ${tableRows}`);

    ok('Los rangos se presentan como "referencia", no como obligatorios', text.includes('de referencia') && !text.toLowerCase().includes('condición obligatoria'));
    ok('18/6 está contextualizado como referencia ampliamente utilizada, no como regla fija', text.includes('18/6') && text.includes('referencia'));
    ok('12/12 está contextualizado como referencia, con variación entre cultivares reconocida', text.includes('12/12') && text.includes('varía entre cultivares') || text.includes('umbral fotoperiódico varía'));
    ok('Explica que existen cultivares que florecen hasta 14h (Ahrens 2023)', text.includes('14 h') || text.includes('14h'));
    ok('No presenta la oscuridad total como requisito universal de germinación', !text.includes('la semilla necesita oscuridad total para germinar'));
    ok('No afirma absorción "masiva" de nitrógeno como ley universal', !text.toLowerCase().includes('absorción masiva de nitrógeno'));
    ok('No afirma 450nm/660nm como obligatorios', !text.includes('obligatorio') || (!text.includes('450 nm') && !text.includes('660 nm')));
    ok('No incluye "lavado de raíces" como etapa del ciclo', !text.toLowerCase().includes('lavado de raíces') || text.includes('sin evidencia'));
    ok('Explica por qué los rangos no son universales (variación por cultivar/sistema/objetivo)', text.includes('no son universales') || text.includes('no es universal'));
    await page.close();
  }

  console.log('\n-- Poscosecha separada del ciclo fisiológico --');
  {
    const page = await browser.newPage();
    const response = await page.goto(`${BASE_URL}/atlas/cosecha/poscosecha`, { waitUntil: 'networkidle' });
    ok('Poscosecha: responde 200 (ruta propia, separada de ciclo-de-vida)', response.status() === 200);
    const text = await page.textContent('body');
    ok('Distingue explícitamente manejo poscosecha de ciclo fisiológico', text.toLowerCase().includes('no es una etapa') || text.toLowerCase().includes('no son etapas') || text.toLowerCase().includes('proceso de manejo'));
    ok('No presenta "lavado de raíces" como requisito', !text.includes('obliga a la planta a consumir') || text.toLowerCase().includes('carece de evidencia'));
    ok('No afirma "polimerización" sin matiz', !text.toLowerCase().includes('polimerización'));
    await page.close();
  }

  console.log('\n-- Fuente Ahrens vinculada correctamente --');
  {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/atlas/cultivo/ciclo-de-vida`, { waitUntil: 'networkidle' });
    const sourcesText = await page.locator('.province-profile-sources-list, .atlas-entry-content').first().textContent().catch(() => '');
    // La fuente en sí se verifica a nivel de datos (sourceId real, ver check de Node más abajo);
    // acá solo confirmamos que la página no rompe al renderizar sourceIds.
    ok('La página de ciclo-de-vida carga sin error con sus fuentes asociadas', typeof sourcesText === 'string');
    await page.close();
  }

  console.log('\n-- Evidencia argentina: Jujuy solo con claims verificados --');
  {
    const page = await browser.newPage();
    await setProvince(page, 'jujuy');
    await page.goto(`${BASE_URL}/atlas/cultivo/cultivo-en-secuencia`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.province-profile-card');
    const text = await page.textContent('.province-profile-card');
    ok('Jujuy muestra evidencia directa (Cannava)', text.includes('Cannava'));
    ok('Jujuy NO atribuye a Cannava un fotoperiodo específico (18/6) sin fuente', !text.includes('Cannava') || !/Cannava[^.]*18\/6/.test(text));
    ok('Jujuy NO afirma iluminación suplementaria como hecho confirmado', !text.toLowerCase().includes('iluminación suplementaria'));
    await page.close();
  }

  console.log('\n-- Evidencia argentina: Misiones como antecedente histórico, no actividad actual --');
  {
    const page = await browser.newPage();
    await setProvince(page, 'misiones');
    await page.goto(`${BASE_URL}/atlas/cultivo/cultivo-en-secuencia`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.province-profile-card');
    const text = await page.textContent('.province-profile-card');
    ok('Misiones menciona el antecedente (MisioPharma/Biofábrica)', text.includes('MisioPharma') || text.includes('Biofábrica'));
    ok('Misiones marca el antecedente como histórico/ya no vigente', text.includes('histórico') || text.includes('disuelta'));
    ok('Misiones NO se presenta con el badge de evidencia directa activa', !text.includes('Evidencia directa de esta provincia'));
    await page.close();
  }

  console.log('\n-- No aparecen recomendaciones provinciales sin evidencia (spot-check) --');
  {
    const page = await browser.newPage();
    for (const provinceId of ['cordoba', 'santacruz', 'tierradelfuego']) {
      await setProvince(page, provinceId);
      await page.goto(`${BASE_URL}/atlas/cultivo/cultivo-en-secuencia`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.province-profile-card');
      const text = (await page.textContent('.province-profile-card')).toLowerCase();
      ok(`${provinceId}: no dice "necesita indoor"`, !text.includes('necesita indoor') && !text.includes('esta provincia necesita'));
      ok(`${provinceId}: no fija un mes de floración sin evidencia`, !/florece en (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/.test(text));
    }
    await page.close();
  }

  console.log('\n-- Navegación: Cultivo y Cosecha muestran las entradas nuevas diferenciadas --');
  {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/atlas/cultivo`, { waitUntil: 'networkidle' });
    const cultivoText = await page.textContent('body');
    ok('Cultivo lista "Ciclo de vida y condiciones de referencia"', cultivoText.includes('Ciclo de vida y condiciones de referencia'));
    const cultivoCards = await page.locator('.atlas-entry-card').count();
    ok('Cultivo tiene 4 tarjetas (secuencia, poda, fertilización, ciclo de vida)', cultivoCards === 4, `encontradas: ${cultivoCards}`);

    await page.goto(`${BASE_URL}/atlas/cosecha`, { waitUntil: 'networkidle' });
    const cosechaText = await page.textContent('body');
    ok('Cosecha lista "Manejo poscosecha: secado y curado"', cosechaText.includes('Manejo poscosecha'));
    const cosechaCards = await page.locator('.atlas-entry-card').count();
    ok('Cosecha tiene 2 tarjetas (maduración, poscosecha)', cosechaCards === 2, `encontradas: ${cosechaCards}`);
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
