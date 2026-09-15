// Vocabulario controlado de tags editoriales.
// Base fija según el encargo de Fase 7A — no se amplía sin necesidad real.
// Ningún tag usado por una categoría/entrada debe salir de esta lista sin documentarlo.

export const CONTROLLED_TAGS = [
  'fundamentos',
  'germinación',
  'suelo',
  'agua',
  'drenaje',
  'luz',
  'fotoperiodo',
  'ambiente',
  'sanidad',
  'riesgo',
  'cultivo',
  'ciclo',
  'cosecha',
  'maduración',
  'marco',
  'legal',
  'contexto',
  'historia',
  'domesticación',
  'argentina',
  'genética',
  'taxonomía',
  'poda',
  'fertilización',
  'nutrición'
];

export function isControlledTag(tag) {
  return CONTROLLED_TAGS.includes(tag);
}

// Vocabulario controlado de niveles de señal (`signals[].level`) y tipos de error
// (`commonMistakes[].type`) — formalizado en Fase 7B2 a partir del piloto de Fase 7B1.
// El código interno queda en inglés (consistencia de datos); la UI traduce con estos mapas
// para que el visitante nunca vea el código técnico crudo.

export const SIGNAL_LEVELS = ['EXPECTED', 'ATTENTION', 'AMBIGUOUS'];

export const SIGNAL_LEVEL_LABELS = {
  EXPECTED: 'Esperable',
  ATTENTION: 'Atención',
  AMBIGUOUS: 'Ambigua'
};

export const MISTAKE_TYPES = ['OBSERVATION', 'INTERPRETATION', 'CONTEXT', 'OTHER'];

export const MISTAKE_TYPE_LABELS = {
  OBSERVATION: 'Observación',
  INTERPRETATION: 'Interpretación',
  CONTEXT: 'Contextualización',
  OTHER: 'Otro'
};

// Vocabulario controlado de alcance de fuente (`sources[].scope`) — formalizado para
// distinguir, en la UI, evidencia específica de Cannabis sativa de evidencia general de
// fisiología vegetal/agronomía usada por analogía o como marco conceptual transferible.
// Ver la nota completa en lib/editorial/sources.js. Una fuente sin `scope` (legal,
// geográfica, climática, astronómica) no entra en ninguno de estos dos grupos.

export const SOURCE_SCOPES = ['CANNABIS', 'GENERAL'];

export const SOURCE_SCOPE_LABELS = {
  CANNABIS: 'Evidencia específica de Cannabis',
  GENERAL: 'Evidencia general de fisiología vegetal'
};

// Auditoría de duplicados semánticos (Fase 7A, 2026-09-09):
// Se revisaron los tags actualmente en uso en las 7 entradas migradas contra esta lista.
// No se encontró ningún duplicado semántico (ej. "clima" vs "ambiente" usados de forma
// intercambiable) — todos los tags en uso coinciden exactamente con un término de esta lista.
// No se eliminó ningún tag existente.
