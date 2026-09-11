# 17 — Riesgos

## Riesgos legales/regulatorios
- **Cambio regulatorio sobre REPROCANN** (anuncio de febrero 2025 de dar de baja registros, posible reasignación a SEDRONAR en 2026) — no confirmado como ejecutado, pero si ocurre puede volver desactualizado el contenido de [[12_LEGAL]] rápidamente. **Mitigación**: fecha de última revisión visible en todo contenido legal, lenguaje no absoluto, monitoreo periódico (no es un dato "se escribe una vez y listo").
- **Zona gris entre contenido educativo y "promoción"** bajo Ley 27.669 — no hay jurisprudencia que trace la línea exacta para un sitio como este. **Mitigación**: regla dura de cero marcas/cero venta/cero enlaces a puntos de venta, ya adoptada en [[01_PRODUCT]].
- **Reforma de Ley 25.326 en curso** — varios proyectos, ninguno sancionado. **Mitigación**: diseñar privacidad ya alineada a estándares más exigentes (tipo GDPR) que el piso legal actual, para no depender de acertar qué proyecto se aprueba.

## Riesgos de privacidad
- **Fuga de ubicación aproximada + identidad + evidencia de cultivo (fotos)** es el peor escenario de este proyecto específico, con impacto real desproporcionado para el usuario dado el tema. **Mitigación**: ver [[09_SECURITY]] y [[10_PRIVACY]] en profundidad — storage privado firmado, limpieza de EXIF, ubicación nunca más precisa que zona.
- **Metadatos EXIF con GPS en fotos subidas por el usuario** — el producto nunca pide ubicación exacta, pero una foto de celular puede filtrarla igual si no se limpia server-side. **Mitigación**: ya incorporada como requisito explícito en [[09_SECURITY]].
- **Retención de datos en backups tras borrado de cuenta** — riesgo de que "eliminar cuenta" no sea realmente eliminar. **Mitigación**: política de retención de backups corta y documentada, ver [[09_SECURITY]].

## Riesgos técnicos/de arquitectura
- **IDOR en endpoints de "Mi Cultivo"** — el riesgo técnico más crítico del proyecto dado que maneja datos sensibles. Ver mitigación detallada en [[09_SECURITY]].
- **Dependencia de un proveedor de clima gratuito sin SLA** (Open-Meteo) para una función que el usuario puede considerar crítica (alerta de helada). **Mitigación**: comunicar claramente que es informativo, enlazar siempre a SMN como fuente oficial de respaldo.
- **Términos de uso "no comercial" de Open-Meteo** — si el proyecto cambia de naturaleza (monetización, algo hoy fuera de alcance), deja de cumplir los términos del tier gratuito. **Watch item**: revisar si el proyecto se mantiene 100% no comercial antes de cualquier cambio de modelo.
- **Fuentes climáticas oficiales en PDF, no en API** (SMN, INTA) — requiere trabajo manual de extracción, no automatizable fácilmente, riesgo de subestimar el esfuerzo de la Fase 5 del roadmap.

## Riesgos de contenido/producto
- **Contenido climático/agronómico desactualizado** — a diferencia de una app típica, este contenido tiene fecha de caducidad real (normales climáticas se actualizan por período, recomendaciones estacionales cambian). **Mitigación**: campo de fecha de última revisión obligatorio y visible ([[05_CONTENT]]).
- **Explosión combinatoria de contenido regional** si se intenta crear una página completa por cada combinación provincia×zona×categoría en vez de usar el patrón de bloques regionales incrustados. **Mitigación**: ya resuelto por diseño en [[05_CONTENT]] (bloques "En tu zona" sobre contenido general, no duplicación completa).
- **Trabajo editorial de agrupar departamentos en "zonas reconocibles"** ([[03_GEO]]) es manual y no se puede acelerar solo con ingeniería — riesgo de cuello de botella en Fase 2 del roadmap.

## Riesgos de sobrediseño (relevantes por la regla anti-sobrediseño del blueprint)
- Construir un sistema de comunidad (comentarios, mensajería) no solicitado, que multiplicaría la superficie de moderación/abuso sin estar en el alcance actual — explícitamente fuera de v1 (ver [[07_DATABASE]] y [[09_SECURITY]]).
- Sumar servicios pagos (búsqueda dedicada, proveedor de clima con alertas nativas) antes de que el volumen de uso lo justifique — ver regla general en [[18_EXTERNAL_SERVICES]].
- Construir un mapa con tiles de calle detallados (tipo Google Maps) cuando el caso de uso real es un selector de región, no navegación — ver decisión en [[03_GEO]].

## Riesgos identificados que requieren decisión humana (no resolubles por investigación adicional)
- Si el REPROCANN efectivamente se reestructura de forma restrictiva, el proyecto debe decidir su postura editorial (¿sigue publicando contenido de autocultivo con más matices legales, o ajusta el enfoque?) — es una decisión editorial/de negocio, no técnica.
