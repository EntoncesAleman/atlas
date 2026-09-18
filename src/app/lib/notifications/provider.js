// Proveedor de envío de email — la única pieza que un futuro proveedor real (Resend, Postmark,
// SES, lo que se decida) necesita reemplazar. Separado a propósito del resto de la arquitectura
// de notificaciones (generación / preferencias / cola / historial, ver `dispatch.js`) para que
// cambiar de proveedor no toque ninguna otra pieza.
//
// Por diseño (brief: "no enviar emails reales durante desarrollo sin una acción explícita de
// configuración/producción"): sin `EMAIL_PROVIDER_API_KEY` configurada, esta función nunca hace
// ninguna llamada de red — devuelve `skipped` con el motivo, y quien la llama debe registrar eso
// en `notification_log` en vez de fingir un envío exitoso.
export async function sendEmail({ to, subject, body }) {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  if (!apiKey) {
    return { ok: false, skipped: true, reason: 'provider_not_configured' };
  }

  // Punto de integración real, todavía sin proveedor elegido — cuando se configure
  // EMAIL_PROVIDER_API_KEY, este es el único lugar que hay que completar con la llamada HTTP real
  // al proveedor elegido (ej. Resend: POST https://api.resend.com/emails).
  try {
    // eslint-disable-next-line no-unused-vars
    const _pending = { to, subject, body };
    return { ok: false, skipped: true, reason: 'provider_not_implemented' };
  } catch (error) {
    return { ok: false, skipped: false, reason: error.message ?? 'unknown_error' };
  }
}
