// Validación pequeña y específica del modelo de datos nuevo del Loop 3B (Fase 51).
// No es una auditoría general ni reemplaza `provincial-context-audit.mjs` (que no se modifica).
// Corre en Node puro, sin Playwright: este loop es de datos, no de UI (la UI queda para el
// Loop 3C, ver `MASTER_PACKAGE/50_FICHA_PROVINCIAL_ATLAS.md` §26).

import { getProvinceProfile, getArgentinaProfile, getAllProvinceIds } from '../src/app/lib/geo/provinceProfile.js';
import { dayLengthHours } from '../src/app/lib/geo/photoperiod.js';
import { sources } from '../src/app/lib/editorial/sources.js';

const sourceIds = new Set(sources.map((s) => s.id));

let pass = 0;
let fail = 0;
const failures = [];

function ok(label, condition, detail) {
  if (condition) {
    pass += 1;
  } else {
    fail += 1;
    failures.push(detail ? `${label} — ${detail}` : label);
  }
}

const REQUIRED_KEYS = ['identity', 'geography', 'map', 'environment', 'light', 'cultivation', 'sources', 'metadata'];

function checkDataPointSourceIds(points, label) {
  for (const point of points) {
    if (point.availability === 'AVAILABLE') {
      ok(`${label}/${point.key}: AVAILABLE tiene sourceId real`, Boolean(point.sourceId) && sourceIds.has(point.sourceId), `sourceId="${point.sourceId}"`);
      ok(`${label}/${point.key}: AVAILABLE tiene evidenceLevel`, ['A', 'B', 'C', 'D', 'E'].includes(point.evidenceLevel));
    } else {
      ok(`${label}/${point.key}: no-AVAILABLE (${point.availability}) sin sourceId inventado`, point.sourceId === null || sourceIds.has(point.sourceId));
    }
  }
}

// --- 1. Las 24 jurisdicciones ---
const ids = getAllProvinceIds();
ok('24 jurisdicciones exactas', ids.length === 24, `hay ${ids.length}`);
ok('sin ids duplicados', new Set(ids).size === ids.length);

for (const id of ids) {
  const profile = getProvinceProfile(id);
  ok(`${id}: perfil generado`, Boolean(profile));
  if (!profile) continue;

  for (const key of REQUIRED_KEYS) {
    ok(`${id}: tiene la clave "${key}"`, key in profile);
  }

  ok(`${id}: identity.indecCode presente (2 dígitos)`, /^\d{2}$/.test(profile.identity.indecCode ?? ''));
  ok(`${id}: identity.capital presente`, typeof profile.identity.capital === 'string' && profile.identity.capital.length > 0);
  ok(`${id}: geography.latitude es número negativo (hemisferio sur)`, typeof profile.geography.latitude === 'number' && profile.geography.latitude < 0);

  checkDataPointSourceIds(profile.environment, `${id}/environment`);
  checkDataPointSourceIds(profile.light, `${id}/light`);
  checkDataPointSourceIds(profile.cultivation, `${id}/cultivation`);
}

// Códigos INDEC sin repetir (24 códigos únicos)
const indecCodes = new Set(ids.map((id) => getProvinceProfile(id).identity.indecCode));
ok('24 códigos INDEC únicos', indecCodes.size === 24, `hay ${indecCodes.size}`);

// CABA no confundida con la Provincia de Buenos Aires
const caba = getProvinceProfile('caba');
const buenosAires = getProvinceProfile('buenos-aires');
ok('CABA tiene type CABA (no PROVINCIA)', caba.identity.type === 'CABA');
ok('CABA y Buenos Aires son ids distintos con capitales distintas', caba.identity.capital !== buenosAires.identity.capital);
ok('Buenos Aires (provincia) capital es La Plata, no CABA', buenosAires.identity.capital === 'La Plata');

// --- 2. ArgentinaProfile (fallback sin provincia) ---
const argentina = getArgentinaProfile();
for (const key of REQUIRED_KEYS) {
  ok(`ArgentinaProfile: tiene la clave "${key}"`, key in argentina);
}
ok('ArgentinaProfile: map.provinceId es null (no resalta ninguna provincia)', argentina.map.provinceId === null);
ok('ArgentinaProfile: dato de temperatura marcado como nacional, no por provincia', argentina.environment[0]?.notes?.includes('ninguna provincia individual'));

// --- 3. Fotoperiodo: sanity check astronómico real ---
// En diciembre (verano austral), cuanto más al sur, más horas de luz.
// En junio (invierno austral), cuanto más al sur, menos horas de luz.
const dic = new Date(Date.UTC(2026, 11, 21)); // cercano al solsticio de verano austral
const jun = new Date(Date.UTC(2026, 5, 21)); // cercano al solsticio de invierno austral

const jujuyLat = getProvinceProfile('jujuy').geography.latitude; // ~-23.3 (norte)
const ushuaiaLat = getProvinceProfile('tierradelfuego').geography.latitude; // ~-54.8 (sur)

const jujuyDic = dayLengthHours(jujuyLat, dic);
const ushuaiaDic = dayLengthHours(ushuaiaLat, dic);
const jujuyJun = dayLengthHours(jujuyLat, jun);
const ushuaiaJun = dayLengthHours(ushuaiaLat, jun);

ok('Fotoperiodo: en diciembre, Ushuaia (sur) tiene más horas de luz que Jujuy (norte)', ushuaiaDic > jujuyDic, `Ushuaia=${ushuaiaDic.toFixed(2)}h, Jujuy=${jujuyDic.toFixed(2)}h`);
ok('Fotoperiodo: en junio, Ushuaia (sur) tiene menos horas de luz que Jujuy (norte)', ushuaiaJun < jujuyJun, `Ushuaia=${ushuaiaJun.toFixed(2)}h, Jujuy=${jujuyJun.toFixed(2)}h`);
ok('Fotoperiodo: duración del día entre 0 y 24 horas siempre', [jujuyDic, ushuaiaDic, jujuyJun, ushuaiaJun].every((h) => h > 0 && h < 24));
ok('Fotoperiodo: Jujuy varía menos entre estaciones que Ushuaia (más cerca del ecuador)', Math.abs(jujuyDic - jujuyJun) < Math.abs(ushuaiaDic - ushuaiaJun));

console.log(`\n=== Loop 3B — validación del modelo de datos: ${pass} OK / ${fail} FAIL (${pass + fail} verificaciones) ===\n`);
if (fail > 0) {
  console.log('Fallas:');
  for (const f of failures) console.log(`  - ${f}`);
  process.exitCode = 1;
}
