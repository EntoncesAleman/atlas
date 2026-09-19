// Modelo de "Mi Cultivo" (Fase 9, extendido en Fase 10A con persistencia local).
//
// Este módulo define la forma de los datos, sin saber nada de dónde se guardan
// (ver ./storage.js para la capa de persistencia). Mantiene compatibilidad con
// los eventos de Fase 9: mismos campos de contenido (stageId, date, note,
// photoReserved), con metadata de auditoría agregada (createdAt/updatedAt).

export const STAGES = [
  { id: 'semilla', label: 'Semilla' },
  { id: 'germinacion', label: 'Germinación' },
  { id: 'trasplante', label: 'Trasplante / tierra' },
  { id: 'crecimiento', label: 'Crecimiento' },
  { id: 'floracion', label: 'Floración' },
  { id: 'cosecha', label: 'Cosecha' },
  { id: 'maduracion', label: 'Maduración / almacenamiento' },
];

let idSequence = 0;

function generateId(prefix) {
  idSequence += 1;
  return `${prefix}-${Date.now()}-${idSequence}`;
}

// Forma de un cultivo persistido:
// { id, currentStageId, provinceId (o null), events: [Event], createdAt (ISO), updatedAt (ISO) }
// `provinceId` es opcional a propósito (Fase 11): sin ubicación elegida, Mi
// Cultivo sigue funcionando igual, simplemente sin la sección de contexto
// ambiental. Nunca se guarda coordenadas ni ubicación más precisa que
// provincia (ver `lib/weather/locations.js`).
export function createCultivo() {
  const now = new Date().toISOString();
  return {
    id: generateId('cultivo'),
    currentStageId: STAGES[0].id,
    provinceId: null,
    seasonName: null,
    // Modo simple por cantidad (brief §14) — el modo detallado (plantas individuales con su
    // propia ficha) necesita una tabla propia y por eso es solo con cuenta (ver
    // `lib/miCultivo/plantasRemote.js`); el conteo simple y la variedad sí tienen sentido sin
    // cuenta, así que viajan en el mismo objeto local que el resto de Mi Cultivo.
    plantCount: 1,
    variety: null,
    events: [],
    notes: [],
    createdAt: now,
    updatedAt: now,
  };
}

// Forma de una nota de temporada en modo sin cuenta: { id, body, createdAt (ISO) }. En modo
// cuenta, la misma forma conceptual vive en la tabla `cultivo_notes` (ver `notesRemote.js`).
export function createNote(body) {
  return {
    id: generateId('note'),
    body: (body ?? '').trim(),
    createdAt: new Date().toISOString(),
  };
}

// Forma de un evento de cultivo:
// { id, stageId, date (YYYY-MM-DD), note, photoReserved: true, createdAt (ISO), updatedAt (ISO) }
export function createEvent({ stageId, date, note }) {
  const now = new Date().toISOString();
  return {
    id: generateId('event'),
    stageId,
    date,
    note: (note ?? '').trim(),
    photoReserved: true,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateEvent(existingEvent, { stageId, date, note }) {
  return {
    ...existingEvent,
    stageId,
    date,
    note: (note ?? '').trim(),
    updatedAt: new Date().toISOString(),
  };
}

export function stageIndex(stageId) {
  return STAGES.findIndex((stage) => stage.id === stageId);
}

export function stageLabel(stageId) {
  return STAGES.find((stage) => stage.id === stageId)?.label ?? stageId;
}
