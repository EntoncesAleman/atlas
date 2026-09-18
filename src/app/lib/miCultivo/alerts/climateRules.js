// Reglas de "clima" del motor de avisos.
//
// No recalcula ningún umbral meteorológico: `lib/weather/service.js` (el mismo servicio que ya
// usa el bloque "Hoy" de Mi Cultivo) ya devuelve `todayReadings` (condición actual) y `alerts`
// (heladas/lluvia previstas) calculados sobre datos reales de Open-Meteo. Esta función solo
// decide cuáles de esas lecturas ya calculadas ameritan pasar al Centro de Alertas persistente,
// para no duplicar el widget climático existente ni sus umbrales.

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function evaluateClimateRules({ weatherResult }) {
  if (!weatherResult?.ok) return [];
  const candidates = [];
  const day = todayKey();

  for (const reading of weatherResult.todayReadings ?? []) {
    candidates.push({
      category: 'clima',
      title: reading.label,
      body: reading.detail,
      relatedHref: null,
      dedupeKey: `clima:hoy:${reading.id}:${day}`
    });
  }

  // Los ids de `weatherResult.alerts` ya incluyen la fecha del día previsto (ej.
  // `helada-2026-09-20`) — sirven directo como parte de la clave de deduplicación, sin agregar
  // una ventana de tiempo extra.
  for (const alert of weatherResult.alerts ?? []) {
    candidates.push({
      category: 'clima',
      title: alert.label,
      body: alert.detail,
      relatedHref: null,
      dedupeKey: `clima:pronostico:${alert.id}`
    });
  }

  return candidates;
}
