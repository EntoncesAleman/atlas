// Capa de acceso remoto de "Mi Cultivo" (Fase 10B) — Supabase Postgres + RLS.
//
// Mismo principio que storage.js (persistencia local): la UI nunca arma
// queries a mano, solo llama a estas funciones. El control de acceso real no
// depende de esta capa — lo aplica Postgres vía Row Level Security (cada
// política exige `auth.uid() = user_id`), así que aunque el cliente tuviera un
// bug, la base de datos igual impide leer o modificar el cultivo de otra
// persona. Ver la migración `create_mi_cultivo_tables` para las políticas.
//
// Devuelve/recibe cultivos y eventos en la MISMA forma que `model.js`
// (camelCase: currentStageId, photoReserved, etc.) para que el resto del
// código no necesite distinguir de dónde vinieron los datos.

function mapEventRow(row) {
  return {
    id: row.id,
    stageId: row.stage_id,
    date: row.event_date,
    note: row.note ?? '',
    photoReserved: row.photo_reserved,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapCultivoRow(row, eventRows) {
  return {
    id: row.id,
    currentStageId: row.current_stage_id,
    provinceId: row.province_id ?? null,
    seasonName: row.season_name ?? null,
    plantCount: row.plant_count ?? 1,
    plantMode: row.plant_mode ?? 'simple',
    variety: row.variety ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    events: eventRows.map(mapEventRow),
  };
}

function mapCultivoSummaryRow(row) {
  return {
    id: row.id,
    seasonName: row.season_name ?? null,
    currentStageId: row.current_stage_id,
    plantCount: row.plant_count ?? 1,
    plantMode: row.plant_mode ?? 'simple',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function fetchCultivoEvents(supabase, cultivoId) {
  const { data, error } = await supabase
    .from('cultivo_events')
    .select('*')
    .eq('cultivo_id', cultivoId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// Un cultivo puntual por id (brief §14: un usuario puede tener más de uno) — usado por el
// selector de cultivo/temporada para cargar el que la persona elige. El filtro por `userId`
// además de RLS es puro cinturón y tiradores: no cambia qué se puede leer, documenta la
// intención.
export async function fetchCultivoById(supabase, userId, cultivoId) {
  const { data: cultivoRow, error: cultivoError } = await supabase
    .from('cultivos')
    .select('*')
    .eq('id', cultivoId)
    .eq('user_id', userId)
    .maybeSingle();

  if (cultivoError) throw cultivoError;
  if (!cultivoRow) return null;

  const eventRows = await fetchCultivoEvents(supabase, cultivoRow.id);
  return mapCultivoRow(cultivoRow, eventRows);
}

// El cultivo "por defecto" de una persona: el que se abre al iniciar sesión si no hay uno ya
// elegido explícitamente (ver `selectedCultivoId` en mi-cultivo/page.js) — el más recientemente
// actualizado, no el primero creado, para retomar donde quedó la última vez.
async function fetchDefaultCultivo(supabase, userId) {
  const { data: cultivoRow, error: cultivoError } = await supabase
    .from('cultivos')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (cultivoError) throw cultivoError;
  if (!cultivoRow) return null;

  const eventRows = await fetchCultivoEvents(supabase, cultivoRow.id);
  return mapCultivoRow(cultivoRow, eventRows);
}

// Devuelve el cultivo por defecto de la persona, creando uno (vacío) si todavía no tiene
// ninguno. Se mantiene el mismo nombre/firma que antes de soportar varios cultivos por usuario
// (Fase 10B) para no tener que tocar el efecto de login/migración que ya la usa.
export async function ensureCultivo(supabase, userId) {
  const existing = await fetchDefaultCultivo(supabase, userId);
  if (existing) return existing;
  return createCultivoRemote(supabase, userId, {});
}

// Alias de compatibilidad: antes de soportar varios cultivos por usuario (brief §14), "el
// cultivo" de una persona era inequívoco. `lib/chatbot/context.js` sigue esperando exactamente
// esa firma (un cultivo, no una lista) — acá "el cultivo" pasa a significar, de forma explícita,
// su cultivo por defecto (el más recientemente actualizado). No se tocó `context.js`: sigue
// funcionando igual, ahora sobre una base de datos que admite más de un cultivo por persona.
export async function fetchCultivo(supabase, userId) {
  return fetchDefaultCultivo(supabase, userId);
}

// Listado liviano (sin eventos) de todos los cultivos/temporadas de la persona, para el
// selector — brief: "La interfaz debe permitir cambiar entre cultivos/temporadas sin perder
// información".
export async function listCultivosRemote(supabase, userId) {
  const { data, error } = await supabase
    .from('cultivos')
    .select('id, season_name, current_stage_id, plant_count, plant_mode, created_at, updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapCultivoSummaryRow);
}

export async function createCultivoRemote(supabase, userId, { seasonName } = {}) {
  const { data, error } = await supabase
    .from('cultivos')
    .insert({ user_id: userId, season_name: seasonName || null })
    .select()
    .single();
  if (error) throw error;
  return mapCultivoRow(data, []);
}

export async function setPlantInfoRemote(supabase, cultivoId, { plantCount, plantMode, variety }) {
  const { error } = await supabase
    .from('cultivos')
    .update({
      plant_count: plantCount,
      plant_mode: plantMode,
      variety: variety || null,
      updated_at: new Date().toISOString()
    })
    .eq('id', cultivoId);
  if (error) throw error;
}

export async function setCurrentStageRemote(supabase, cultivoId, stageId) {
  const { error } = await supabase
    .from('cultivos')
    .update({ current_stage_id: stageId, updated_at: new Date().toISOString() })
    .eq('id', cultivoId);
  if (error) throw error;
}

// Fase 11: guarda la provincia elegida como ubicación aproximada del cultivo
// (nunca coordenadas ni ubicación más precisa — ver `lib/weather/locations.js`).
export async function setProvinceRemote(supabase, cultivoId, provinceId) {
  const { error } = await supabase
    .from('cultivos')
    .update({ province_id: provinceId, updated_at: new Date().toISOString() })
    .eq('id', cultivoId);
  if (error) throw error;
}

export async function insertEventRemote(supabase, userId, cultivoId, { stageId, date, note }) {
  const { data, error } = await supabase
    .from('cultivo_events')
    .insert({
      cultivo_id: cultivoId,
      user_id: userId,
      stage_id: stageId,
      event_date: date,
      note: (note ?? '').trim(),
    })
    .select()
    .single();
  if (error) throw error;
  return mapEventRow(data);
}

export async function updateEventRemote(supabase, eventId, { stageId, date, note }) {
  const { data, error } = await supabase
    .from('cultivo_events')
    .update({
      stage_id: stageId,
      event_date: date,
      note: (note ?? '').trim(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', eventId)
    .select()
    .single();
  if (error) throw error;
  return mapEventRow(data);
}

// Fase 12: borra un único evento (a diferencia de `resetCultivoRemote`, que
// borra todos). Las fotos asociadas a ese evento se borran aparte, ANTES de
// llamar a esto, usando `deleteEventPhoto` (misma función de la Fase 10C) —
// así se borra también el archivo real de Storage. El `event_id` en
// `cultivo_event_photos` es `ON DELETE CASCADE`, así que cualquier fila de
// foto que igual quedara (por una limpieza previa incompleta) se borra sola
// al borrar el evento, pero eso nunca borra el archivo real del bucket.
export async function deleteEventRemote(supabase, eventId) {
  const { error } = await supabase.from('cultivo_events').delete().eq('id', eventId);
  if (error) throw error;
}

export async function resetCultivoRemote(supabase, cultivoId) {
  const { error: deleteError } = await supabase
    .from('cultivo_events')
    .delete()
    .eq('cultivo_id', cultivoId);
  if (deleteError) throw deleteError;

  const { error: updateError } = await supabase
    .from('cultivos')
    .update({ current_stage_id: 'semilla', updated_at: new Date().toISOString() })
    .eq('id', cultivoId);
  if (updateError) throw updateError;
}

// Copia eventos locales (de storage.js) al cultivo remoto — usado por el
// flujo de migración local -> cuenta. No borra nada del lado remoto.
export async function bulkInsertEventsRemote(supabase, userId, cultivoId, localEvents) {
  if (!localEvents.length) return [];
  const rows = localEvents.map((event) => ({
    cultivo_id: cultivoId,
    user_id: userId,
    stage_id: event.stageId,
    event_date: event.date,
    note: event.note ?? '',
    photo_reserved: true,
  }));
  const { data, error } = await supabase.from('cultivo_events').insert(rows).select();
  if (error) throw error;
  return (data ?? []).map(mapEventRow);
}
