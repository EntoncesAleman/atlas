// Registro de auditoría de acciones administrativas: qué se modificó, cuándo y por quién (§
// "Sistema" / "Historial de cambios" del panel admin). Usa siempre el cliente con service_role
// porque `admin_audit_log` no tiene ninguna policy pública (ver migración
// `roles_profiles_newsletter_audit`) — solo el propio servidor puede escribir ahí.
//
// Cada Server Action de mutación del panel admin debe llamar a esto después de una escritura
// exitosa. Si falla el log (por ejemplo, el cliente admin no está configurado), no debe tirar
// abajo la acción principal — se ignora en silencio antes que romper una operación real por un
// problema de auditoría.

import { getSupabaseAdminClient } from '../../lib/supabase/admin';

export async function logAdminAction({ actorId, actorEmail, action, targetType = null, targetId = null, details = null }) {
  try {
    const admin = getSupabaseAdminClient();
    if (!admin) return;
    await admin.from('admin_audit_log').insert({
      actor_id: actorId ?? null,
      actor_email: actorEmail ?? null,
      action,
      target_type: targetType,
      target_id: targetId ? String(targetId) : null,
      details
    });
  } catch {
    // No debe romper la acción principal por un problema de auditoría.
  }
}
