// Cálculos derivados de "Mi Cultivo" — funciones puras sobre los datos que la página ya tiene en
// memoria (eventos, fotos, etapa actual). Separado de `mi-cultivo/page.js` por el mismo motivo
// que el motor de avisos (`alerts/engine.js`): son reglas de lectura de datos, no JSX, y deberían
// poder cambiar sin tocar el componente.
//
// Ninguna función acá inventa un dato que no esté ya en `events`/`photosByEvent` — donde no hay
// suficiente información (por ejemplo, ninguna foto todavía, o ningún evento en la etapa actual)
// devuelven `null`/`0` real, nunca un placeholder disfrazado de dato.

import { STAGES, stageIndex } from './model';

// Ya existía como función local en `mi-cultivo/page.js` (Fase 12) — se mueve acá sin cambiar su
// criterio: el inicio de temporada es la fecha del evento más antiguo, nunca `createdAt` del
// registro ni la fecha de hoy.
export function getSeasonStartDate(events) {
  if (!events.length) return null;
  return events.reduce((earliest, item) => (item.date < earliest ? item.date : earliest), events[0].date);
}

export function daysSince(isoDate) {
  if (!isoDate) return null;
  const start = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  return Math.round((today.getTime() - start.getTime()) / 86400000);
}

// Días desde el registro más antiguo que ya está marcado con la etapa actual — es la única base
// real disponible para estimar "hace cuánto estás en esta etapa" (Mi Cultivo no guarda un
// historial de cuándo cambió `currentStageId`, solo el valor actual). Sin ningún evento en esa
// etapa, devuelve `null`: no hay manera honesta de estimarlo, así que no se inventa un número.
export function daysInCurrentStage(events, currentStageId) {
  const stageEvents = events.filter((event) => event.stageId === currentStageId);
  if (stageEvents.length === 0) return null;
  const earliest = stageEvents.reduce((min, item) => (item.date < min ? item.date : min), stageEvents[0].date);
  return daysSince(earliest);
}

// Progreso visual 0–100 según la posición de la etapa actual dentro de la secuencia de STAGES —
// una posición ordinal, no una estimación de tiempo real restante (el propio Atlas documenta que
// la duración de cada etapa varía demasiado como para proyectar una fecha de fin).
export function seasonProgressPercent(currentStageId) {
  const index = stageIndex(currentStageId);
  if (index < 0) return 0;
  return Math.round((index / (STAGES.length - 1)) * 100);
}

export function nextStage(currentStageId) {
  const index = stageIndex(currentStageId);
  return STAGES[index + 1] ?? null;
}

// El "último registro" para la sección destacada: el evento más reciente por fecha (empate roto
// por el más recientemente creado), con su primera foto asociada si existe.
export function getLastEntry(events, photosByEvent) {
  if (!events.length) return null;
  const sorted = [...events].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.createdAt < b.createdAt ? 1 : -1;
  });
  const latest = sorted[0];
  const photos = photosByEvent?.[latest.id] ?? [];
  return { event: latest, photo: photos[0] ?? null };
}

// Todas las fotos de la temporada, más recientes primero — para la tira/galería. Cada foto
// conserva la referencia a su evento (fecha, etapa) para el estado ampliado.
export function getAllPhotos(events, photosByEvent) {
  const eventById = new Map(events.map((event) => [event.id, event]));
  const all = Object.entries(photosByEvent ?? {}).flatMap(([eventId, photos]) =>
    photos.map((photo) => ({ ...photo, event: eventById.get(eventId) ?? null }))
  );
  return all.sort((a, b) => {
    const dateA = a.event?.date ?? '';
    const dateB = b.event?.date ?? '';
    if (dateA !== dateB) return dateA < dateB ? 1 : -1;
    return 0;
  });
}

// Resumen de temporada: solo cifras que surgen directamente de `events`/`photosByEvent`. No hay
// ninguna métrica "inventada" (por ejemplo, no hay una cifra de "salud del cultivo" o similar).
export function getSeasonSummary(events, photosByEvent) {
  const totalPhotos = Object.values(photosByEvent ?? {}).reduce((sum, list) => sum + list.length, 0);
  const distinctDays = new Set(events.map((event) => event.date)).size;
  const lastActivityDate = events.length
    ? events.reduce((latest, item) => (item.date > latest ? item.date : latest), events[0].date)
    : null;
  return {
    totalEvents: events.length,
    totalPhotos,
    distinctDaysRegistered: distinctDays,
    lastActivityDate
  };
}
