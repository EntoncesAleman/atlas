// Notas de temporada — modo con cuenta. Mismo patrón que `remoteStorage.js`: la UI nunca arma
// queries a mano, y el control de acceso real lo aplica RLS (`auth.uid() = user_id`), no este
// archivo (ver migración `mi_cultivo_season_notes_alerts_notifications`).

function mapNoteRow(row) {
  return {
    id: row.id,
    body: row.body,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function fetchNotesRemote(supabase, cultivoId) {
  const { data, error } = await supabase
    .from('cultivo_notes')
    .select('*')
    .eq('cultivo_id', cultivoId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapNoteRow);
}

export async function insertNoteRemote(supabase, userId, cultivoId, body) {
  const { data, error } = await supabase
    .from('cultivo_notes')
    .insert({ cultivo_id: cultivoId, user_id: userId, body: body.trim() })
    .select()
    .single();
  if (error) throw error;
  return mapNoteRow(data);
}

export async function deleteNoteRemote(supabase, noteId) {
  const { error } = await supabase.from('cultivo_notes').delete().eq('id', noteId);
  if (error) throw error;
}

// Usado solo por "Reiniciar Mi Cultivo" (ver mi-cultivo/page.js): las notas de temporada son
// parte de la temporada que se está reiniciando, igual que los eventos — a diferencia de la
// ubicación (provincia), que el reinicio preserva a propósito por ser un dato del dispositivo/
// cuenta, no de la temporada puntual.
export async function deleteAllNotesRemote(supabase, cultivoId) {
  const { error } = await supabase.from('cultivo_notes').delete().eq('cultivo_id', cultivoId);
  if (error) throw error;
}

export async function setSeasonNameRemote(supabase, cultivoId, seasonName) {
  const { error } = await supabase
    .from('cultivos')
    .update({ season_name: seasonName, updated_at: new Date().toISOString() })
    .eq('id', cultivoId);
  if (error) throw error;
}
