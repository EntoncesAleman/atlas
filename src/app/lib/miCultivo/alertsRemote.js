// Persistencia del Centro de Alertas — modo con cuenta únicamente (los avisos dependen de tener
// una fecha de referencia estable y de poder acumular historial entre visitas, algo que el modo
// sin cuenta no ofrece de forma confiable — mismo criterio ya aplicado a las fotos). Control de
// acceso real vía RLS (`auth.uid() = user_id`), igual que el resto de esta carpeta.
//
// La deduplicación real ocurre en dos capas: la constraint `unique (cultivo_id, dedupe_key)` en
// la base (ver migración) es la que de verdad impide filas duplicadas aunque este código tuviera
// un bug; `ignoreDuplicates: true` acá evita que Postgres devuelva un error 409 esperado cada vez
// que un aviso ya generado se vuelve a evaluar sin cambios.

function mapAlertRow(row) {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    body: row.body,
    relatedHref: row.related_href,
    status: row.status,
    createdAt: row.created_at,
    // `null` en todas las alertas que genera hoy el motor de reglas (evalúa a nivel del
    // cultivo completo, brief §7) — la columna existe para cuando una regla futura tenga
    // suficiente información propia de una planta puntual como para asociarla ahí en vez de al
    // cultivo en general (brief §14: "cuando exista información suficiente").
    plantaId: row.planta_id ?? null
  };
}

export async function fetchAlertsRemote(supabase, cultivoId) {
  const { data, error } = await supabase
    .from('cultivo_alerts')
    .select('*')
    .eq('cultivo_id', cultivoId)
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data ?? []).map(mapAlertRow);
}

// `candidates`: salida de `alerts/engine.js` (buildAlertCandidates). Devuelve solo las filas que
// realmente se insertaron (avisos nuevos) para que la UI pueda, si quiere, resaltarlos como
// recién aparecidos — los que ya existían (mismo dedupeKey) no se tocan ni se reportan como error.
export async function syncAlertsRemote(supabase, userId, cultivoId, candidates) {
  if (!candidates.length) return [];
  const rows = candidates.map((candidate) => ({
    cultivo_id: cultivoId,
    user_id: userId,
    category: candidate.category,
    title: candidate.title,
    body: candidate.body,
    related_href: candidate.relatedHref,
    dedupe_key: candidate.dedupeKey
  }));
  const { data, error } = await supabase
    .from('cultivo_alerts')
    .upsert(rows, { onConflict: 'cultivo_id,dedupe_key', ignoreDuplicates: true })
    .select();
  if (error) throw error;
  return (data ?? []).map(mapAlertRow);
}

export async function markAlertReadRemote(supabase, alertId) {
  const { error } = await supabase.from('cultivo_alerts').update({ status: 'read' }).eq('id', alertId);
  if (error) throw error;
}

export async function markAllAlertsReadRemote(supabase, cultivoId) {
  const { error } = await supabase
    .from('cultivo_alerts')
    .update({ status: 'read' })
    .eq('cultivo_id', cultivoId)
    .eq('status', 'unread');
  if (error) throw error;
}
