// Plantas individuales dentro de un cultivo/temporada — modo detallado, opcional (brief §14).
// Mismo patrón "own row" que el resto de esta carpeta: el control de acceso real lo aplica RLS
// (`auth.uid() = user_id`), esto solo arma las queries.
//
// Solo existen en modo cuenta: el modo sin cuenta sigue siendo, a propósito, un único cultivo
// simple guardado en este navegador (ver nota en `mi-cultivo/page.js`) — extender también el
// almacenamiento local a varios cultivos y plantas es un cambio de arquitectura mucho más grande
// que excede lo que pide esta fase, y el brief pide explícitamente no convertir esto en un
// sistema agrícola empresarial.

function mapPlantaRow(row) {
  return {
    id: row.id,
    cultivoId: row.cultivo_id,
    label: row.label,
    variety: row.variety ?? null,
    stageId: row.stage_id ?? null,
    startDate: row.start_date ?? null,
    notes: row.notes ?? '',
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function fetchPlantasRemote(supabase, cultivoId) {
  const { data, error } = await supabase
    .from('plantas')
    .select('*')
    .eq('cultivo_id', cultivoId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapPlantaRow);
}

export async function insertPlantaRemote(supabase, userId, cultivoId, { label, variety, stageId, startDate, notes }) {
  const { data, error } = await supabase
    .from('plantas')
    .insert({
      cultivo_id: cultivoId,
      user_id: userId,
      label: label.trim(),
      variety: variety?.trim() || null,
      stage_id: stageId || null,
      start_date: startDate || null,
      notes: (notes ?? '').trim()
    })
    .select()
    .single();
  if (error) throw error;
  return mapPlantaRow(data);
}

export async function updatePlantaRemote(supabase, plantaId, { label, variety, stageId, startDate, notes }) {
  const { data, error } = await supabase
    .from('plantas')
    .update({
      label: label.trim(),
      variety: variety?.trim() || null,
      stage_id: stageId || null,
      start_date: startDate || null,
      notes: (notes ?? '').trim(),
      updated_at: new Date().toISOString()
    })
    .eq('id', plantaId)
    .select()
    .single();
  if (error) throw error;
  return mapPlantaRow(data);
}

export async function deletePlantaRemote(supabase, plantaId) {
  const { error } = await supabase.from('plantas').delete().eq('id', plantaId);
  if (error) throw error;
}
