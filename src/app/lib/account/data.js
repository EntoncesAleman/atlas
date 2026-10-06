export const ACCOUNT_TABLES = ['cultivos', 'cultivo_events', 'cultivo_notes', 'plantas', 'cultivo_event_photos', 'cultivo_alerts', 'notification_preferences', 'notification_log'];

export async function ownRows(client, table, userId) {
  const rows = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await client.from(table).select('*').eq(table === 'profiles' ? 'id' : 'user_id', userId).order(table === 'notification_preferences' ? 'user_id' : 'id').range(offset, offset + 499);
    if (error) throw error;
    rows.push(...(data ?? []));
    if ((data?.length ?? 0) < 500) return rows;
  }
}

export async function exportAccount(client, user) {
  const tables = ['profiles', ...ACCOUNT_TABLES];
  const results = await Promise.all(tables.map(table => ownRows(client, table, user.id)));
  const data = Object.fromEntries(tables.map((table, index) => [table, results[index]]));
  // Embed the actual private files so the export remains useful after account deletion.
  const photos = [];
  for (const photo of data.cultivo_event_photos) {
    if (!photo.storage_path.startsWith(`${user.id}/`)) throw new Error('Invalid private photo path');
    const { data: file, error } = await client.storage.from('cultivo-photos').download(photo.storage_path);
    if (error) throw error;
    photos.push({ id: photo.id, path: photo.storage_path, contentType: file.type || 'image/jpeg', base64: Buffer.from(await file.arrayBuffer()).toString('base64') });
  }
  return { version: 1, exportedAt: new Date().toISOString(), account: { id: user.id, email: user.email, createdAt: user.created_at }, data, photos };
}

export async function listPrivateFiles(client, userId) {
  const files = [];
  const bucket = client.storage.from('cultivo-photos');
  async function walk(prefix) {
    for (let offset = 0; ; offset += 100) {
      const { data, error } = await bucket.list(prefix, { limit: 100, offset, sortBy: { column: 'name', order: 'asc' } });
      if (error) throw error;
      for (const item of data ?? []) {
        if (!item.name || item.name.includes('/') || item.name === '.' || item.name === '..') throw new Error('Invalid private photo path');
        const path = `${prefix}/${item.name}`;
        if (item.id) files.push(path);
        else await walk(path);
      }
      if ((data?.length ?? 0) < 100) break;
    }
  }
  await walk(userId);
  return files;
}

export async function deleteAccount(admin, userId) {
  const files = await listPrivateFiles(admin, userId);
  for (let offset = 0; offset < files.length; offset += 100) {
    const { error } = await admin.storage.from('cultivo-photos').remove(files.slice(offset, offset + 100));
    if (error) throw error;
  }
  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) throw error;
}
