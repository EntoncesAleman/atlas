# 10 — Privacidad

## Principios (válidos desde el día 1, no negociables)
1. **Ubicación siempre aproximada.** Nivel provincia/zona, nunca dirección ni coordenadas exactas. No hay campo en el modelo de datos que permita guardar más precisión que "zona" (ver [[07_DATABASE]]).
2. **Historial privado por defecto.** Nada de lo que un usuario registra en "Mi Cultivo" es público a menos que decida explícitamente compartirlo (y compartir no es una funcionalidad de v1 — ver 14_ROADMAP.md, sección Priorización en ROADMAP).
3. **Fotografías privadas por defecto**, almacenadas separadas de la biblioteca visual editorial, nunca usadas como contenido del sitio sin consentimiento explícito y específico.
4. **Datos mínimos.** El registro solo pide email + contraseña (o OAuth). No se pide nombre real, teléfono, ni documento.
5. **Derecho a eliminar**: cuenta completa, un cultivo puntual, o fotografías puntuales — cada uno de forma independiente y sin fricción (no "contactá a soporte para borrar tu cuenta").
6. **Baja de comunicaciones en un clic** desde cualquier email (newsletter o alertas), sin necesidad de login.
7. **Separación estricta entre datos públicos y privados** a nivel de arquitectura, no solo de UI (ver [[09_SECURITY]]).

## Qué se guarda y por qué (principio de minimización)
| Dato | ¿Se guarda? | Motivo |
|---|---|---|
| Email | Sí | Login, recuperación, alertas/newsletter opt-in |
| Contraseña | Sí (hasheada) | Autenticación, si no usa OAuth |
| Provincia/zona guardada | Sí, opcional | Personalizar clima/calendario sin repetir selección |
| Dirección exacta / GPS | **Nunca** | No aporta valor al producto y es el mayor riesgo de este tipo de plataforma |
| Nombre real | No (opcional, no se pide) | No es necesario para la funcionalidad |
| Fotos de cultivo | Sí, privadas | Core de "Mi Cultivo" |
| Metadatos EXIF de fotos (GPS embebido) | **Se eliminan al subir** | Una foto de celular puede filtrar ubicación exacta aunque el producto nunca la pida |
| IP | Solo temporalmente, para seguridad (rate limiting/abuso) | No se asocia permanentemente al perfil del usuario |

## Riesgos específicos de esta plataforma (por qué la privacidad importa más que en un sitio genérico)
- El tema (cultivo de cannabis) tiene sensibilidad legal y social en Argentina incluso estando amparado legalmente para uso personal (ver estado legal verificado en [[12_LEGAL]]) — una fuga de datos que vincule identidad + ubicación aproximada + evidencia de cultivo (fotos) es un daño real y desproporcionado para el usuario comparado con una fuga de datos de un sitio de recetas de cocina, por ejemplo.
- Por eso: cifrado en tránsito (HTTPS obligatorio, sin excepción), fotos en storage privado con URLs firmadas de corta duración, y ubicación nunca más precisa que "zona" son decisiones de privacidad que son también decisiones de seguridad legal para el usuario.

## Derechos del usuario (autogestionables desde "Mi Perfil")
- Ver todos sus datos.
- Exportar sus datos (al menos como descarga simple — formato exacto se define en construcción; útil también para cumplir el derecho de portabilidad de Ley 25.326, ver [[12_LEGAL]]).
- Eliminar un cultivo específico.
- Eliminar fotografías específicas.
- Eliminar la cuenta completa (con confirmación, y aviso claro del período de gracia en backups — ver [[09_SECURITY]]).
- Desactivar newsletter y/o alertas independientemente uno del otro.

## Cookies y tracking
- Cookies estrictamente necesarias (sesión de login) no requieren consentimiento bajo el estándar general, pero cualquier cookie de analítica/tracking sí debe pedirse con opt-in explícito — pendiente de confirmar el estándar exacto argentino en [[12_LEGAL]] (marcado para investigación).
- Analítica recomendada: herramientas que no dependan de cookies de terceros ni hagan fingerprinting (ver opción en [[13_STACK]], sección Analytics) — minimiza la necesidad de banner de cookies invasivo.

## Documentos legales requeridos (contenido, no implementación)
- Política de Privacidad (explica exactamente esta tabla, en lenguaje llano).
- Términos de Uso.
- Aviso de cookies (si corresponde tras investigación legal).
- Disclaimer editorial (contenido no es asesoramiento legal ni médico) — ver [[12_LEGAL]].
