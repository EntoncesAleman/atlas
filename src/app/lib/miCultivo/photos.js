// Capa de acceso a fotos de "Mi Cultivo" (Fase 10C) — Supabase Storage + tabla
// `cultivo_event_photos`. Mismo principio que remoteStorage.js: la UI llama
// solo a estas funciones, nunca arma paths de Storage ni queries a mano.
//
// El bucket `cultivo-photos` es PRIVADO — no hay URL pública permanente. Cada
// foto se recupera con una URL firmada de corta duración, generada bajo la
// sesión de quien la pide; Postgres RLS + las políticas de `storage.objects`
// (ver migración `create_cultivo_event_photos`) son las que realmente impiden
// que otro usuario pueda leer, firmar o borrar el archivo — no algo que
// dependa de que este código haga bien las cosas.

import { prepareEventPhoto } from './photoProcessing';

const BUCKET = 'cultivo-photos';
const SIGNED_URL_TTL_SECONDS = 1800; // 30 minutos

function buildStoragePath(userId, cultivoId, eventId) {
  const filename = `${crypto.randomUUID()}.jpg`;
  return `${userId}/${cultivoId}/${eventId}/${filename}`;
}

function mapPhotoRow(row) {
  return {
    id: row.id,
    eventId: row.event_id,
    storagePath: row.storage_path,
    createdAt: row.created_at,
  };
}

// Sube y registra una foto para un evento existente. Lanza PhotoValidationError
// (mensaje ya en español, apto para mostrar) si el archivo no es válido.
export async function uploadEventPhoto(supabase, { userId, cultivoId, eventId, file }) {
  const blob = await prepareEventPhoto(file);
  const storagePath = buildStoragePath(userId, cultivoId, eventId);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, blob, { contentType: 'image/jpeg', upsert: false });
  if (uploadError) throw uploadError;

  const { data, error: insertError } = await supabase
    .from('cultivo_event_photos')
    .insert({ user_id: userId, cultivo_id: cultivoId, event_id: eventId, storage_path: storagePath })
    .select()
    .single();

  if (insertError) {
    // La subida a Storage funcionó pero no se pudo registrar en la base —
    // se intenta deshacer la subida para no dejar un archivo huérfano sin
    // ninguna fila que lo referencie.
    await supabase.storage.from(BUCKET).remove([storagePath]).catch(() => {});
    throw insertError;
  }

  return mapPhotoRow(data);
}

// Trae todas las fotos de un cultivo (todas sus etapas/eventos de una vez) con
// una URL firmada temporal para cada una, agrupadas por evento.
export async function fetchPhotosByEvent(supabase, cultivoId) {
  const { data: rows, error } = await supabase
    .from('cultivo_event_photos')
    .select('*')
    .eq('cultivo_id', cultivoId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  if (!rows || rows.length === 0) return {};

  const paths = rows.map((row) => row.storage_path);
  const { data: signedUrls, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(paths, SIGNED_URL_TTL_SECONDS);
  if (signError) throw signError;

  const urlByPath = new Map((signedUrls ?? []).map((entry) => [entry.path, entry.signedUrl]));

  const grouped = {};
  for (const row of rows) {
    const photo = { ...mapPhotoRow(row), url: urlByPath.get(row.storage_path) ?? null };
    if (!grouped[photo.eventId]) grouped[photo.eventId] = [];
    grouped[photo.eventId].push(photo);
  }
  return grouped;
}

// Fase 13C: cuenta fotos por evento SIN generar URLs firmadas — el chatbot
// solo necesita saber cuántas fotos existen (para dar contexto, nunca para
// mostrarlas ni analizarlas), así que evita el paso de `createSignedUrls` que
// sí hace falta en `fetchPhotosByEvent` para la UI real de Mi Cultivo.
export async function countPhotosByEvent(supabase, cultivoId) {
  const { data: rows, error } = await supabase
    .from('cultivo_event_photos')
    .select('event_id')
    .eq('cultivo_id', cultivoId);
  if (error) throw error;

  const counts = {};
  for (const row of rows ?? []) {
    counts[row.event_id] = (counts[row.event_id] ?? 0) + 1;
  }
  return counts;
}

// Borra una foto: primero el archivo de Storage, después su fila. Si falla el
// borrado en Storage por un motivo real (no "ya no existe"), se corta antes
// de tocar la base para no perder la única referencia al archivo. Si el
// archivo ya no está (borrado antes, o inconsistencia), se continúa igual
// para poder limpiar la fila y no dejarla huérfana para siempre.
export async function deleteEventPhoto(supabase, photo) {
  const { error: removeError } = await supabase.storage.from(BUCKET).remove([photo.storagePath]);
  if (removeError) throw removeError;

  const { error: deleteError } = await supabase
    .from('cultivo_event_photos')
    .delete()
    .eq('id', photo.id);
  if (deleteError) throw deleteError;
}
