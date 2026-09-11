# 12 — Legal / Editorial

**Disclaimer de este documento**: no es asesoramiento legal. Resume investigación con fuentes registradas en [[19_SOURCE_REGISTRY]], marcando explícitamente lo verificado, lo no verificado y lo cambiante. Antes del lanzamiento, esta sección debe ser revisada por un abogado argentino con experiencia en la materia — el blueprint no reemplaza esa revisión.

## Estado legal del autocultivo en Argentina (lo que se pudo verificar)
- **Ley 27.350** crea el marco de cannabis medicinal/terapéutico y **REPROCANN** (Registro del Programa de Cannabis), que habilita autocultivo, "cultivador solidario" o inscripción vía ONG autorizada. Categorías vigentes según **Res. 1780/2025** (Ministerio de Salud). Fuente: Boletín Oficial ([[19_SOURCE_REGISTRY]]).
- **Ley 23.737, Art. 5 inc. a)** tipifica "sembrar o cultivar plantas... para producir estupefacientes" (4-15 años), con un **atenuante cuando la cantidad/circunstancias muestran inequívocamente que el cultivo es para consumo personal** (pena reducida, 1 mes-2 años, con posibles alternativas de rehabilitación).
- **Fallo "Arriola" (CSJN, 2009)** declaró inconstitucional la criminalización de la tenencia para consumo personal en base al Art. 19 de la Constitución Nacional (autonomía del ámbito privado, sin daño a terceros). Es la base constitucional sobre la que se apoya la tolerancia al autocultivo personal.
- **Conclusión operativa para el proyecto**: el autocultivo personal, especialmente registrado en REPROCANN, tiene un marco de tolerancia/legalidad razonablemente establecido, pero **no es una zona 100% resuelta ni estática** — ver riesgo regulatorio abajo.

### Riesgo regulatorio activo (marcar TODO RESEARCH / UNVERIFIED)
- En **febrero de 2025** la Ministra de Seguridad anunció la intención de dar de baja ~300.000 registros REPROCANN, calificado por especialistas como jurídicamente cuestionable (REPROCANN depende de Salud, no de Seguridad). **No hay confirmación de ejecución** de esa baja en las fuentes revisadas.
- Reportes de prensa sectorial (no confirmados en Boletín Oficial en esta investigación) sugieren una posible reorganización hacia SEDRONAR en 2026 (Decreto 27/2026).
- **Implicancia para el producto**: el contenido legal del sitio debe estar redactado de forma que sobreviva a cambios regulatorios sin quedar "roto" — usar lenguaje como "al momento de esta publicación" y fecha de última revisión visible (ver [[05_CONTENT]]), y evitar afirmar categóricamente "el autocultivo es legal" sin matices ni fecha.

## ¿Publicar información de cultivo es legal?
No se encontró ninguna norma que prohíba específicamente contenido educativo/botánico no comercial. Sí existe la **Ley 27.669**, que restringe la **publicidad/promoción** de cannabis psicoactivo y sus derivados en medios, permitiendo publicidad solo en puntos de venta/clubes de cultivo autorizados y hacia audiencia adulta específica.

**Lectura para este proyecto**: esa ley apunta a publicidad/promoción comercial de producto, no a contenido agronómico/educativo puro. Pero no se halló jurisprudencia ni guía de la autoridad de aplicación que trace esa línea explícitamente para un sitio informativo tipo "Atlas del Cultivo". Por eso el proyecto adopta como regla dura (ya presente en [[01_PRODUCT]]) **cero mención de marcas, cero venta, cero enlaces a puntos de venta/clubes** — no porque sea la única interpretación posible, sino porque elimina el riesgo por completo sin sacrificar el objetivo educativo.

## Protección de datos — Ley 25.326
- Marco vigente desde 2000, reglamentado por Decreto 1558/2001, con AAIP como autoridad de aplicación y derechos ARCO (acceso, rectificación, actualización, confidencialidad, bloqueo, supresión).
- Consentimiento debe ser previo, libre, expreso e informado; los datos deben ser adecuados/pertinentes/no excesivos para la finalidad — esto **respalda directamente** el principio de minimización de datos del proyecto (ver [[10_PRIVACY]]).
- **Dato sensible**: la ley define una categoría de "datos sensibles" con protección reforzada (ideología, salud, etc.). Es razonable interpretar que el estado de "persona que cultiva cannabis" (aun legal) es sensible por su cercanía a datos de salud/orientación personal — el proyecto trata todos los datos de "Mi Cultivo" con el estándar más alto por precaución, sin esperar una definición judicial exacta.
- **Reforma en curso**: hay múltiples proyectos de ley (Carro, Doñate, Yeza — expediente 1751-D-2026) inspirados en el anteproyecto de la AAIP, alineados a estándares tipo GDPR/LGPD. Ninguno sancionado a la fecha de esta investigación. **Implicancia**: diseñar la privacidad del proyecto ya alineada a estándares GDPR-like (ver [[10_PRIVACY]]) es una apuesta segura que probablemente ya cumple cualquier reforma razonable.

## Newsletter y comunicaciones
- El régimen de Ley 25.326 Art. 27 es más permisivo de lo que el proyecto necesita (permite ciertos usos sin opt-in estricto bajo condiciones). El proyecto **no se apoya en ese mínimo legal**: usa double opt-in y baja en un clic como estándar propio, más exigente que el piso legal, precisamente para evitar cualquier zona gris (ver [[10_PRIVACY]] y 02_UX.md, sección Newsletter en ROADMAP).
- Ley 26.951 (Registro No Llame) es principalmente sobre telemarketing telefónico; se menciona por completitud, aplicabilidad directa a email marketing **UNVERIFIED**.

## Cookies
No se encontró una ley argentina específica tipo ePrivacy/EU que exija banner de cookies obligatorio; el marco aplicable es el general de Ley 25.326 sobre consentimiento para tratamiento de datos personales. **Decisión de producto**: igual se implementará un aviso de cookies simple y honesto (no un banner invasivo tipo "aceptar todo" oscuro) como buena práctica, no como obligación legal confirmada. Marcar como `UNVERIFIED (ausencia de norma específica)` en cualquier texto legal público del sitio hasta validación por abogado.

## Documentos legales requeridos en el sitio
1. **Términos de Uso** — aclara que el sitio es informativo, no comercial, no asesoramiento legal/médico.
2. **Política de Privacidad** — contenido detallado en [[10_PRIVACY]].
3. **Aviso de Cookies** — simple, honesto, con opción real de rechazo.
4. **Disclaimer editorial** — visible en secciones legales/de salud de la enciclopedia: "Este contenido es informativo, no constituye asesoramiento legal ni médico. El marco legal puede cambiar; verificá la fecha de última revisión."

## Regla editorial derivada
Toda página que mencione el marco legal debe:
- Mostrar fecha de última revisión de forma prominente.
- Citar la fuente oficial (Boletín Oficial, argentina.gob.ar) en vez de solo prensa.
- Evitar lenguaje absoluto ("es legal") a favor de lenguaje preciso y fechado ("al [fecha], el marco de REPROCANN establece...").
