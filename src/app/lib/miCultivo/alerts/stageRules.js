// Reglas de "etapa" del motor de avisos — funciones puras, sin acceso a red ni a React. Reciben
// datos ya calculados y devuelven candidatos de aviso; quien las llama (`engine.js`) decide qué
// hacer con ellos (persistir, deduplicar).
//
// Principio explícito del brief: "nunca afirmar que la planta necesariamente debería estar en
// una etapa determinada". Por eso el texto siempre habla de rango de referencia y de "podría
// estar entrando", nunca en términos prescriptivos ("debería", "tiene que").

import { STAGE_ATLAS_LINKS, STAGE_DURATION_REFERENCE_DAYS } from './constants';
import { isoYearWeek } from './time';

// `daysInStage`: días desde el evento más antiguo registrado en la etapa actual (null si no hay
// ningún evento registrado en esa etapa — ver cálculo en `season.js`, que es quien realmente
// tiene los eventos para calcularlo). Sin ese dato no se genera ningún aviso de etapa: no hay
// base real para compararlo contra la referencia.
export function evaluateStageRules({ currentStageId, daysInStage }) {
  if (daysInStage === null || daysInStage === undefined) return [];

  const reference = STAGE_DURATION_REFERENCE_DAYS[currentStageId];
  if (!reference) return [];

  const link = STAGE_ATLAS_LINKS[currentStageId];
  const week = isoYearWeek();
  const candidates = [];

  if (daysInStage > reference.maxDays) {
    candidates.push({
      category: 'etapa',
      title: 'Esta etapa lleva más tiempo que el rango de referencia del Atlas',
      body: `Registraste esta etapa hace ${daysInStage} días. El Atlas documenta un rango de referencia de ${reference.minDays}–${reference.maxDays} días para esta etapa — es una referencia orientativa, no una regla: la genética, el sistema de cultivo y el ambiente real cambian el ritmo. Puede ser un buen momento para revisar si tu planta ya muestra señales de la próxima etapa.`,
      relatedHref: link ? `/atlas/${link.categorySlug}/${link.entrySlug}` : null,
      dedupeKey: `etapa:fuera_de_rango:${currentStageId}:${week}`
    });
  } else if (daysInStage >= Math.round(reference.maxDays * 0.8)) {
    candidates.push({
      category: 'etapa',
      title: 'Podrías estar acercándote a la próxima etapa',
      body: `Van ${daysInStage} días registrados en esta etapa, dentro del rango de referencia del Atlas (${reference.minDays}–${reference.maxDays} días) pero ya sobre el final. No es una fecha exacta — es un buen momento para empezar a observar señales de transición.`,
      relatedHref: link ? `/atlas/${link.categorySlug}/${link.entrySlug}` : null,
      dedupeKey: `etapa:acercandose:${currentStageId}:${week}`
    });
  }

  return candidates;
}
