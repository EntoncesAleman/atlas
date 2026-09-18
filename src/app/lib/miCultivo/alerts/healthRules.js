// Reglas de "sanidad" del motor de avisos — preventivas y enlazadas siempre a una entrada real
// del Atlas, nunca un diagnóstico. Ver el brief: "no diagnosticar automáticamente una enfermedad
// o plaga a partir de datos insuficientes" — estas reglas no leen ningún síntoma reportado por la
// persona (no existe ese dato en Mi Cultivo), solo cruzan etapa declarada + condición ambiental
// ya calculada, para señalar cuándo vale la pena leer una entrada preventiva concreta.

import { HUMIDITY_READING_ID, DAMPING_OFF_RISK_STAGES } from './constants';
import { isoYearWeek } from './time';

export function evaluateHealthRules({ currentStageId, weatherResult }) {
  if (!weatherResult?.ok) return [];
  if (!DAMPING_OFF_RISK_STAGES.includes(currentStageId)) return [];

  const isHumid = (weatherResult.todayReadings ?? []).some((reading) => reading.id === HUMIDITY_READING_ID);
  if (!isHumid) return [];

  return [{
    category: 'sanidad',
    title: 'Humedad alta en una etapa sensible al exceso de humedad',
    body: 'El Atlas documenta el exceso de humedad como el factor de riesgo mejor asociado a la chupadera fungosa (damping-off) en el tramo entre la germinación y el vegetativo — no es un diagnóstico de tu planta, es una condición ambiental real registrada hoy en tu zona que vale la pena tener presente.',
    relatedHref: '/atlas/sanidad/chupadera-fungosa-damping-off',
    dedupeKey: `sanidad:humedad_damping_off:${currentStageId}:${isoYearWeek()}`
  }];
}
