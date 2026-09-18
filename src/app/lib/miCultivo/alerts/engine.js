// Motor de avisos de Mi Cultivo — el único lugar que combina las reglas de clima/etapa/sanidad.
// Deliberadamente separado de `mi-cultivo/page.js` (brief: "No crear reglas arbitrarias dentro de
// componentes React... las reglas deben poder modificarse sin rehacer Mi Cultivo"): agregar o
// ajustar una regla es editar el archivo de esa categoría, nunca tocar el componente de la
// página. `page.js` solo llama a `buildAlertCandidates` y persiste el resultado.

import { evaluateClimateRules } from './climateRules';
import { evaluateStageRules } from './stageRules';
import { evaluateHealthRules } from './healthRules';

export function buildAlertCandidates({ currentStageId, daysInStage, weatherResult }) {
  return [
    ...evaluateClimateRules({ weatherResult }),
    ...evaluateStageRules({ currentStageId, daysInStage }),
    ...evaluateHealthRules({ currentStageId, weatherResult })
  ];
}
