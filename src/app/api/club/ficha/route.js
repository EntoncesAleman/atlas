// Guarda los cambios de la ficha de un club como borrador pendiente de revisión. Es un Route
// Handler (y no una Server Action) porque puede traer una foto: las acciones tienen un límite de
// cuerpo de 1 MB.

import { randomUUID } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { isSameOrigin } from '../../../lib/account/request';
import { can, getClubContext } from '../../../lib/club/context';
import { slugify, validateClubProfile } from '../../../lib/club/content';
import { ARGENTINA_PROVINCES } from '../../../lib/geo/argentinaProvinces';
import { getSupabaseAdminClient } from '../../../lib/supabase/admin';

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

// Tipo real del archivo por sus primeros bytes, no por la extensión ni el tipo declarado.
function imageType(bytes) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { ext: 'jpg', mime: 'image/jpeg' };
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return { ext: 'png', mime: 'image/png' };
  if (String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP') return { ext: 'webp', mime: 'image/webp' };
  return null;
}

async function freeSlug(admin, name) {
  const base = slugify(name);
  const { data } = await admin.from('club_profiles').select('slug').like('slug', `${base}%`);
  const taken = new Set((data ?? []).map((row) => row.slug));
  if (!taken.has(base)) return base;
  for (let suffix = 2; suffix < 500; suffix += 1) if (!taken.has(`${base}-${suffix}`)) return `${base}-${suffix}`;
  return `${base}-${randomUUID().slice(0, 8)}`;
}

export async function POST(request) {
  if (!isSameOrigin(request)) return Response.json({ error: 'Solicitud inválida.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > MAX_PHOTO_BYTES + 100000) return Response.json({ error: 'La foto supera los 2 MB.' }, { status: 413 });
  const { user, club, capacity } = await getClubContext();
  if (!user) return Response.json({ error: 'Iniciá sesión para editar la ficha.' }, { status: 401 });
  if (!club || !can(capacity, 'editor')) return Response.json({ error: 'Tu cuenta no puede editar esta ficha.' }, { status: 403 });

  let form;
  try { form = await request.formData(); } catch { return Response.json({ error: 'Solicitud inválida.' }, { status: 400 }); }
  const { profile, error } = validateClubProfile({ ...Object.fromEntries(form), specialties: form.getAll('specialties') }, ARGENTINA_PROVINCES.map((province) => province.id));
  if (error) return Response.json({ error }, { status: 400 });

  const admin = getSupabaseAdminClient();
  if (!admin) return Response.json({ error: 'No se pudo guardar ahora. Probá más tarde.' }, { status: 503 });
  const { data: current, error: readError } = await admin.from('club_profiles').select('slug, published, draft').eq('club_id', club.id).maybeSingle();
  if (readError) return Response.json({ error: 'No se pudo guardar ahora. Probá más tarde.' }, { status: 503 });

  const previousPath = (current?.draft ?? current?.published)?.photoPath ?? null;
  let photoPath = form.get('removePhoto') === 'on' ? null : previousPath;
  const photo = form.get('photo');
  if (photo && typeof photo !== 'string' && photo.size > 0) {
    if (photo.size > MAX_PHOTO_BYTES) return Response.json({ error: 'La foto supera los 2 MB.' }, { status: 413 });
    const bytes = new Uint8Array(await photo.arrayBuffer());
    const type = imageType(bytes);
    if (!type) return Response.json({ error: 'La foto tiene que ser JPG, PNG o WebP.' }, { status: 400 });
    const path = `${club.id}/${randomUUID()}.${type.ext}`;
    const { error: uploadError } = await admin.storage.from('club-media').upload(path, bytes, { contentType: type.mime, cacheControl: '31536000' });
    if (uploadError) return Response.json({ error: 'No se pudo subir la foto. Probá de nuevo.' }, { status: 503 });
    photoPath = path;
  }

  const row = { club_id: club.id, slug: current?.slug ?? await freeSlug(admin, club.name), draft: { ...profile, photoPath }, draft_status: 'pending', review_note: null, updated_at: new Date().toISOString() };
  const { error: saveError } = await admin.from('club_profiles').upsert(row, { onConflict: 'club_id' });
  if (saveError) return Response.json({ error: 'No se pudo guardar la ficha. Probá de nuevo.' }, { status: 503 });

  // Una foto de borrador reemplazada que nunca se publicó ya no la referencia nadie.
  const stale = current?.draft?.photoPath;
  if (stale && stale !== photoPath && stale !== current?.published?.photoPath) await admin.storage.from('club-media').remove([stale]).catch(() => {});

  revalidatePath('/club');
  revalidatePath('/admin/eventos');
  return Response.json({ ok: true });
}
