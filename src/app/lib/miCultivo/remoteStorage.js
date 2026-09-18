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
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    events: eventRows.map(mapEventRow),
  };
}

export async function fetchCultivo(supabase, userId) {
  const { data: cultivoRow, error: cultivoError } = await supabase
    .from('cultivos')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (cultivoError) throw cultivoError;
  if (!cultivoRow) return null;

  const { data: eventRows, error: eventsError } = await supabase
    .from('cultivo_events')
    .select('*')
    .eq('cultivo_id', cultivoRow.id)
    .order('created_at', { ascending: false });

  if (eventsError) throw eventsError;
  return mapCultivoRow(cultivoRow, eventRows ?? []);
}

// Devuelve el cultivo del usuario, creándolo (vacío) si todavía no existe.
export async function ensureCultivo(supabase, userId) {
  const existing = await fetchCultivo(supabase, userId);
  if (existing) return existing;

  const { data, error } = await supabase
    .from('cultivos')
    .insert({ user_id: userId })
    .select()
    .single();

  if (error) throw error;
  return mapCultivoRow(data, []);
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
