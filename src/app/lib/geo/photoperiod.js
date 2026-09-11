// Cálculo determinista de duración del día por latitud (Loop 3B, Fase 49→51).
//
// No es una fuente de datos nueva por investigar: es geometría solar estándar, la misma que ya
// recomendaba `MASTER_PACKAGE/50_FICHA_PROVINCIAL_ATLAS.md` (§12) como "la pieza de menor esfuerzo
// y mayor valor" porque no depende de ningún dato provincial nuevo — solo de la latitud que el
// proyecto ya tiene verificada desde la Fase 11 (`lib/weather/locations.js`).
//
// Metodología (documentada también en `MASTER_PACKAGE/51_LOOP_3B_PROVINCIAL_DATA.md`, sección 10):
// 1. Declinación solar: aproximación de Fourier de Spencer, J. W. (1971), "Fourier series
//    representation of the position of the sun", Search, 2(5), p. 172 — la fórmula más citada en
//    la literatura de geometría solar (error máximo documentado de ~0.28°, ver fuente registrada
//    en `editorial/sources.js` como `cientifica-spencer-1971-solar-declination`).
// 2. Ángulo horario de salida/puesta de sol y duración del día: geometría solar estándar
//    (Cooper, P. I. (1969), "The absorption of radiation in solar stills", Solar Energy 12(3),
//    333-346; reproducida en cualquier texto de ingeniería solar, ej. Duffie & Beckman, "Solar
//    Engineering of Thermal Processes") — no es una fórmula exclusiva de un único paper, es
//    geometría esférica estándar del ángulo entre el observador y el terminador día/noche.
//
// Nivel de evidencia (ver `50_FICHA_PROVINCIAL_ATLAS.md` §15): D — cálculo/estimación
// documentada, determinista y verificable, NUNCA presentada como una medición.
//
// Supuestos y límites explícitos (no ocultos):
// - Ignora refracción atmosférica y el radio aparente del disco solar (los ~34'+16' que suelen
//   sumarse a la definición de "salida/puesta" civil) — este módulo calcula la duración del día
//   definida por el borde geométrico del disco solar en el horizonte matemático (declinación +
//   latitud), no la definición civil exacta de amanecer/atardecer. La diferencia típica es de
//   pocos minutos, no relevante para el uso editorial de esta ficha (comparar estaciones/latitudes
//   entre sí, no dar una hora exacta).
// - Ignora la ecuación del tiempo, la longitud geográfica y el huso horario — por eso este módulo
//   NO calcula hora civil de amanecer/atardecer, solo duración total de luz solar en horas. Calcular
//   hora civil requeriría además longitud + huso horario (ART, UTC-3 fijo, sin horario de verano
//   desde 2009) y quedó explícitamente fuera de este loop (ver limitaciones en el documento 51).
// - Ignora la elevación del terreno y obstrucciones locales del horizonte (montañas, etc.).
// - Años bisiestos: se usa el día del año real (1-365 o 1-366) a partir de un objeto `Date`
//   nativo de JavaScript — no hace falta un ajuste manual, `Date` ya cuenta bisiestos
//   correctamente al calcular la fecha.
// - Válido para cualquier latitud de Argentina continental e insular (ninguna provincia argentina
//   cruza el círculo polar antártico salvo el territorio reclamado, fuera del uso agronómico de
//   esta ficha — ver la excepción de Tierra del Fuego ya documentada en `lib/weather/locations.js`).

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function dayOfYear(date) {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const diffMs = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start.getTime();
  return Math.floor(diffMs / 86400000) + 1;
}

// Declinación solar en grados, método de Spencer (1971).
export function solarDeclinationDeg(date) {
  const n = dayOfYear(date);
  const daysInYear = (date.getUTCFullYear() % 4 === 0 && (date.getUTCFullYear() % 100 !== 0 || date.getUTCFullYear() % 400 === 0)) ? 366 : 365;
  const gamma = (2 * Math.PI / daysInYear) * (n - 1); // "day angle" en radianes

  const declinationRad =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.001480 * Math.sin(3 * gamma);

  return declinationRad * RAD_TO_DEG;
}

// Duración del día en horas decimales, para una latitud (grados, negativa en el hemisferio sur) y
// una fecha dada. `null` solo podría darse en latitudes polares donde el sol no sale/se pone en
// absoluto (no aplica a ninguna provincia argentina continental) — se deja el caso cubierto por
// robustez, nunca se espera que ocurra con los datos reales de `PROVINCE_LOCATIONS`.
export function dayLengthHours(latitudeDeg, date = new Date()) {
  const declinationDeg = solarDeclinationDeg(date);
  const latRad = latitudeDeg * DEG_TO_RAD;
  const declRad = declinationDeg * DEG_TO_RAD;

  const cosHourAngle = -Math.tan(latRad) * Math.tan(declRad);

  if (cosHourAngle <= -1) return 24; // sol de medianoche (no aplica en Argentina)
  if (cosHourAngle >= 1) return 0; // noche polar (no aplica en Argentina)

  const hourAngleRad = Math.acos(cosHourAngle);
  return (24 / Math.PI) * hourAngleRad;
}

export function getPhotoperiodDataPoint(latitudeDeg, date = new Date()) {
  const hours = dayLengthHours(latitudeDeg, date);
  if (hours === null) {
    return {
      key: 'day_length_hours',
      value: null,
      unit: 'h',
      period: date.toISOString().slice(0, 10),
      sourceId: 'cientifica-spencer-1971-solar-declination',
      evidenceLevel: 'E',
      availability: 'UNAVAILABLE',
      methodology: null,
      limitation: null,
      notes: 'No calculable con la fórmula estándar para esta combinación de latitud/fecha.',
    };
  }
  return {
    key: 'day_length_hours',
    value: Math.round(hours * 100) / 100,
    unit: 'h',
    period: date.toISOString().slice(0, 10),
    sourceId: 'cientifica-spencer-1971-solar-declination',
    evidenceLevel: 'D',
    availability: 'AVAILABLE',
    methodology: 'Declinación solar (Spencer, 1971) + geometría estándar de ángulo horario (Cooper, 1969) a partir de la latitud.',
    limitation: 'Cálculo astronómico determinista, no una medición ni un pronóstico. Ignora refracción atmosférica, ecuación del tiempo y elevación del terreno.',
    notes: 'Cálculo astronómico determinista (declinación solar + latitud), no una medición ni un pronóstico. Ignora refracción atmosférica, ecuación del tiempo y elevación del terreno.',
  };
}
