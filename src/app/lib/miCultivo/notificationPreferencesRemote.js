// Preferencias de notificación — modo con cuenta. `web_push_enabled` existe como columna y
// checkbox a propósito (arquitectura preparada), pero el envío real de push todavía no está
// implementado: hace falta un Service Worker y claves VAPID que no forman parte de esta fase (ver
// aviso en la propia UI). Activar el checkbox solo guarda la preferencia, no dispara nada.

const DEFAULTS = { email_clima: false, email_etapa: false, email_sanidad: false, web_push_enabled: false };

function mapPreferencesRow(row) {
  if (!row) return { ...DEFAULTS };
  return {
    emailClima: row.email_clima,
    emailEtapa: row.email_etapa,
    emailSanidad: row.email_sanidad,
    webPushEnabled: row.web_push_enabled
  };
}

export async function fetchNotificationPreferencesRemote(supabase, userId) {
  const { data, error } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return mapPreferencesRow(data);
}

export async function setNotificationPreferencesRemote(supabase, userId, preferences) {
  const { error } = await supabase.from('notification_preferences').upsert({
    user_id: userId,
    email_clima: preferences.emailClima,
    email_etapa: preferences.emailEtapa,
    email_sanidad: preferences.emailSanidad,
    web_push_enabled: preferences.webPushEnabled,
    updated_at: new Date().toISOString()
  });
  if (error) throw error;
}
