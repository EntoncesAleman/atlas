# 21 — Investigación Geográfica y Climática (Gate: CLAUDE_RESEARCH_REQUIRED)

Rol de este documento: cerrar (o dejar correctamente abierto) el bloqueo registrado en `TODO.md` bajo `CLAUDE_RESEARCH_REQUIRED` sobre regionalización agroecológica, climatología oficial y definición de "zona". Es un documento de investigación — no redefine arquitectura ni esquema, solo evidencia y recomendación.

**Fecha de esta ronda de investigación**: 2026-09-09 (continuación de la ronda inicial documentada en `19_SOURCE_REGISTRY.md`).

---

## 1. Executive Summary

Se recuperó evidencia nueva y directamente verificable que **no existía en la ronda anterior**: un layer GIS oficial de tipos climáticos de Argentina bajo clasificación Köppen, publicado en el geoportal nacional de INDEC y atribuido al Atlas Nacional Interactivo (ANIDA) del IGN (`VERIFIED`, ver §4). También se encontró evidencia secundaria sólida (vía indexación de buscador, no lectura directa) de que INTA RIAN es un sitio real y poblado con regionalización agroecológica por provincia, y de que existe un segundo candidato oficial independiente — "Regiones agroeconómicas homogéneas" del proyecto RySA (Secretaría de Agricultura), publicado en el geoportal de IDE Salta (federado en IDERA/IGN) — que no había sido detectado en la investigación anterior.

Sin embargo, **ningún dominio `*.inta.gob.ar` ni `idesa.gob.ar` fue accesible directamente desde este entorno** (fallo de resolución DNS / conexión rechazada, reproducible en dos rondas de investigación distintas), y el PDF completo del Atlas Climático del SMN excede el límite de tamaño de las herramientas de fetch disponibles. Esto significa que **la existencia** de estas fuentes está razonablemente establecida, pero **su contenido exacto y su disponibilidad como dato reutilizable (shapefile/GeoJSON, licencia)** siguen sin poder verificarse de primera mano en esta sesión.

**Conclusión operativa**: el gate pasa de `CLAUDE_RESEARCH_REQUIRED` (sin ninguna fuente climática oficial verificada) a `PARTIAL_RESEARCH` (una fuente climática oficial de clasificación queda `VERIFIED` y es utilizable ya; la regionalización agroecológica de INTA sigue en evidencia secundaria, no primaria). No corresponde declarar `DONE`: cerrar el gate hoy exigiría inventar contenido de páginas que no pude leer directamente, lo cual está explícitamente prohibido por el encargo.

---

## 2. Preguntas investigadas

A. ¿Existe una regionalización agroecológica/agroclimática oficial reutilizable (INTA RIAN u otro organismo)?
B. ¿El SMN provee una clasificación climática regional oficial reutilizable?
C. ¿El Atlas Climático del SMN contiene una clasificación/taxonomía extraíble y verificable?
D. ¿INTA provee heladas/variables agroclimáticas con estructura trazable?
E. ¿Qué unidad geográfica debe usar el producto para "zona"?
F. ¿La jerarquía Argentina → Provincia → Zona/subregión → datos ambientales es correcta o hay una mejor respaldada por fuentes oficiales?

---

## 3. Fuentes consultadas en esta ronda

| # | Fuente | Método | Resultado |
|---|---|---|---|
| 1 | `agroregionesrian.inta.gob.ar/inicio` | WebFetch directo | `INACCESSIBLE` — `ENOTFOUND` (fallo de resolución DNS, igual que en la ronda anterior) |
| 2 | `rian.inta.gov.ar` | WebFetch directo | `INACCESSIBLE` — `ENOTFOUND` |
| 3 | `climayagua.inta.gob.ar/estadísticas_de_heladas_meteorológicas` | WebFetch directo | `INACCESSIBLE` — `ENOTFOUND` |
| 4 | `siga.inta.gob.ar` / `siga2.inta.gob.ar` | Localizado por WebSearch, no fetch directo intentado (mismo dominio raíz `inta.gob.ar` con fallos consistentes) | No verificado, mismo patrón de bloqueo esperado |
| 5 | `repositorio.smn.gob.ar/handle/20.500.12160/2981` (ficha del Atlas Climático) | WebFetch directo | `VERIFIED` (accesible, leído) |
| 6 | `repositorio.smn.gob.ar/bitstream/.../Atlas_Climático_de_Argentina.pdf` (documento completo, 129 pág.) | WebFetch directo | `INACCESSIBLE` — excede el límite de tamaño de la herramienta (>10MB) |
| 7 | `repositorio.smn.gob.ar/bitstream/.../estadísticas_climatológicas_normales_1991-2020.pdf` | WebFetch directo | `INACCESSIBLE` — excede el límite de tamaño de la herramienta |
| 8 | `smn.gob.ar/clima/atlasclimatico` | WebFetch directo | `INACCESSIBLE` — HTTP 402 (posible protección/paywall técnico del servidor, no confirmado el motivo exacto) |
| 9 | `geonode.indec.gob.ar/layers/geonode_data:geonode:tipos_climaticos` | WebFetch directo | `VERIFIED` (accesible, leído íntegramente) |
| 10 | `es.wikipedia.org/wiki/Clima_de_Argentina` | WebFetch directo | `VERIFIED` (accesible, leído; fuente secundaria) |
| 11 | `static.ign.gob.ar/anida/fasciculos/fasc_afn_clima_arg.pdf` | WebFetch directo | `PARTIAL` — se descargó (1.1MB) pero es mayormente imágenes escaneadas; el texto extraíble no permitió confirmar ni descartar una clasificación Köppen explícita |
| 12 | `geoportal.idesa.gob.ar/layers/geonode:regiones_agro_eco_homog_noa` | WebFetch directo | `INACCESSIBLE` — `ECONNREFUSED` |
| 13 | `geoportal.idesa.gob.ar/layers/geonode:zonas` | WebFetch directo | `INACCESSIBLE` — `ECONNREFUSED` |
| 14 | Múltiples búsquedas (WebSearch) sobre INTA RIAN, SIGA, heladas, RySA, regiones agroeconómicas homogéneas, IDERA/IDESA | WebSearch (resultados indexados + snippets) | `SECONDARY` para todas — usados solo para establecer existencia/forma general, no como cita de contenido definitivo |

---

## 4. Evidencia — Clasificación climática oficial (Preguntas B y C)

### 4.1. Hallazgo nuevo y verificado: capa Köppen oficial vía INDEC/IGN-ANIDA
`VERIFIED` (leído directamente): existe una capa GIS pública llamada **"Tipos de climas"**, publicada en el geoportal nacional de INDEC (`geonode.indec.gob.ar`), con estos metadatos confirmados por lectura directa:
- **Fuente/atribución**: Atlas Nacional Interactivo de Argentina (ANIDA) — IGN.
- **Metodología declarada**: clasificación de Köppen, combinando temperatura y precipitación con factores orográficos.
- **Resumen**: describe climas "desde el subtropical hasta el frío nival" a lo largo de Argentina.
- **Fecha de publicación**: 3 de enero de 2025.
- **Tipo de dato**: vectorial.
- **Licencia**: **"Not Specified"** (sin licencia explícita declarada por el autor original) — esto es una limitación real: no se puede asumir permiso de redistribución sin gestionar la licencia con INDEC/IGN antes del lanzamiento.
- **Contacto responsable**: `azajarevich@indec.gob.ar`.
- **Formatos de descarga**: exportación de imagen (JPEG/PDF/PNG) confirmada; no se pudo confirmar en los metadatos leídos si ofrece descarga vectorial directa (shapefile/GeoJSON) — esto requiere entrar al geoportal con sesión/interacción real, no solo lectura de metadatos.

**Esto responde parcialmente pero de forma sólida a B y C**: no es el Atlas Climático del SMN el que provee la clasificación reutilizable, sino un producto distinto y también oficial (IGN vía INDEC). Es la primera fuente de este proyecto que puede citarse como **clasificación climática oficial verificada de primera mano**, con la salvedad de la licencia pendiente de confirmar.

### 4.2. Atlas Climático del SMN — sigue sin poder verificarse su contenido
`VERIFIED` (negativo): la ficha del repositorio institucional del SMN (leída directamente) **no menciona clasificación Köppen ni regionalización** en su resumen/palabras clave visibles — solo "Atlas", "Clima de Argentina", "Climatología". Esto no prueba que el documento completo no la contenga (129 páginas, autoría de Skansi et al., SMN, marzo 2025), solo que **no aparece en los metadatos superficiales**.
`INACCESSIBLE`: el PDF completo no pudo leerse (excede el límite de la herramienta de fetch, >10MB). **No se debe citar ninguna clasificación climática como proveniente del Atlas SMN hasta que alguien con acceso a un lector de PDF sin ese límite (o que lo descargue localmente) lo confirme.**
Un resultado de búsqueda anterior citó "Argentina posee 18 climas según Köppen" en aparente relación con el Atlas SMN — **se verificó que esa cifra específica proviene de Wikipedia** (ver 4.3), no de una lectura confirmada del Atlas SMN. **Esto es exactamente el tipo de error de atribución que el encargo pide evitar** — se deja registrado explícitamente para que nadie repita la mezcla.

### 4.3. Wikipedia — "18 climas Köppen" (fuente secundaria, ya con cita propia identificada)
`VERIFIED` (como afirmación de Wikipedia, leída directamente): la página "Clima de Argentina" de Wikipedia afirma textualmente: *"según esta clasificación Argentina posee 18 climas a lo largo de su extenso territorio"*, con un mapa (Mapa 6: "Climas según clasificación Köppen-Geiger. Datos de 1980-2016") como referencia visual. El período de esos datos (1980-2016) **no coincide** con el período del Atlas SMN (1991-2020) ni se confirmó que sea el mismo dataset que el layer de INDEC/ANIDA (§4.1) — son, hasta donde se pudo verificar, **tres fuentes potencialmente distintas** aplicando la misma metodología Köppen-Geiger a distintos períodos/formatos. `INFERENCE`: es razonable que el mapa de Wikipedia y la capa de INDEC/ANIDA compartan origen (ambos citan IGN/ANIDA), pero esto no está confirmado dato por dato.
**Regla de uso**: cualquier cifra específica ("Argentina tiene N climas Köppen") debe citarse como proveniente de Wikipedia/IGN-ANIDA con su período de datos, nunca presentarse como si viniera del Atlas SMN 1991-2020.

### 4.4. Fascículo IGN ANIDA "Clima de Argentina"
`PARTIAL/UNVERIFIED`: el PDF se descargó pero es mayormente contenido de imagen escaneada; no se pudo confirmar ni descartar la presencia de una tabla/mapa de clasificación Köppen explícita dentro del documento con las herramientas de esta sesión.

---

## 5. Evidencia — Regionalización agroecológica (Pregunta A)

### 5.1. INTA RIAN (agroregionesrian.inta.gob.ar)
`INACCESSIBLE` de forma directa en dos rondas de investigación distintas (fallo de resolución DNS reproducible). **No se debe interpretar este fallo como prueba de que el sitio no existe** — es un patrón consistente con que **el dominio `*.inta.gob.ar` en su conjunto no es alcanzable desde este entorno de red** (también fallaron `rian.inta.gov.ar`, `climayagua.inta.gob.ar`, y no se probó `siga.inta.gob.ar` por el mismo motivo esperado).
`SECONDARY` (vía indexación de buscador, múltiples búsquedas independientes con resultados consistentes entre sí): el sitio existe, está poblado, y su estructura real incluye páginas por región macro (`/noa`, `/pampeana`) y por provincia (`/tucuman`), con una metodología de zonas (numeral romano) y subzonas (letra) — ejemplo citado repetidamente: "XVI-A: Subzona Agrícola Central del Chaco" — basada en suelo, aptitud de uso de la tierra, factores agroclimáticos, fisonomía de la vegetación y sistemas productivos característicos.
**Estado**: `PARTIAL` — existencia y forma general razonablemente establecidas por evidencia secundaria consistente; contenido exacto, cobertura total del país, y disponibilidad de capas SIG descargables siguen **sin verificación primaria**.

### 5.2. Hallazgo nuevo: "Regiones agroeconómicas homogéneas" (proyecto RySA)
`SECONDARY` (vía WebSearch, fetch directo bloqueado por `ECONNREFUSED`): se detectó un **segundo candidato oficial, no conocido en la ronda anterior**. Existe un conjunto de capas GIS llamado "Regiones agroeconómicas homogéneas" (al menos una confirmada para NOA: `regiones_agro_eco_homog_noa`, publicada el 17 de agosto de 2016, dominio público), construido para el proyecto **Riesgo y Seguro Agropecuario (RySA)** de la Secretaría de Agricultura, Ganadería, Pesca y Alimentación, usando "cartografía existente de regiones naturales y productivas", el **Atlas de Suelos de la República Argentina**, y estudios de los Centros Regionales de INTA. Está publicada en el geoportal de **IDE Salta** (`geoportal.idesa.gob.ar`), que es la infraestructura de datos espaciales de la **provincia de Salta**, federada dentro de **IDERA** (Infraestructura de Datos Espaciales de la República Argentina, coordinada por el IGN) — **no es un portal nacional propio**, es un nodo provincial de una red federada.
`SECONDARY`: se detectó al menos otra capa relacionada (`geonode:zonas` → "Zonas Agro-Ecológicas-Económicas Uniformes") en el mismo geoportal, sin poder confirmar su alcance ni relación exacta con la anterior.
**Limitación importante detectada**: la única capa confirmada por nombre explícito cubre **NOA**, no todo el país. No se encontró evidencia (ni primaria ni secundaria) de que existan capas equivalentes ya publicadas para Pampeana, Cuyo, NEA o Patagonia con el mismo nivel de detalle — solo descripciones generales de esas regiones en fuentes académicas/de divulgación, no capas de datos confirmadas. **Marcar como `TODO RESEARCH`**: confirmar cobertura nacional completa de "regiones agroeconómicas homogéneas" antes de asumir que es una base reutilizable para todo el país.

### 5.3. Corroboración institucional
`SECONDARY`: un resultado de búsqueda apunta a `inta.gob.ar/documentos/regiones-agroeconomicas-del-noroeste-argentino` como documento propio de INTA sobre esta regionalización del NOA — coherente con que INTA participó como fuente técnica del proyecto RySA, aunque el dominio no pudo visitarse directamente por el mismo bloqueo de red.

---

## 6. Evidencia — Heladas y variables agroclimáticas (Pregunta D)

`INACCESSIBLE` de forma directa: `climayagua.inta.gob.ar/estadísticas_de_heladas_meteorológicas` no resolvió (mismo patrón de bloqueo del dominio `inta.gob.ar`).

`SECONDARY` pero con contenido específico y verosímil (snippet de buscador con cifras concretas, no una descripción genérica): la página de INTA sobre "Estadísticas de Heladas Meteorológicas" presenta mapas de **"Fecha de Primera y Última Helada Meteorológica con Probabilidad de Ocurrencia del 10%"**, definidos por decil: el decil 10 es el límite de fechas de primera helada con ocurrencia más temprana que el promedio de la serie (con 10% de probabilidad — es decir, una helada más temprana ocurre en promedio 1 de cada 10 años). Se citó un ejemplo concreto para **Balcarce**: decil 10 = 6 de mayo, decil 90 = 23 de octubre (solo en el 10% de los años analizados se observó helada antes del 6/5 o después del 23/10).

**Hallazgo nuevo — vía de acceso alternativa no explorada en la ronda anterior**: existe un espejo/proyecto académico independiente, **`heladas.agro.uba.ar`** (Facultad de Agronomía, UBA), con páginas individuales por estación que citan explícitamente datos de estaciones **INTA** (ej. "Rafaela INTA", "Pergamino INTA", "General Villegas INTA", "Concordia INTA", "Anguil INTA", "Alto Valle INTA", "Sáenz Peña INTA"). Este dominio **no es `.gob.ar`** y por lo tanto **tiene buenas chances de ser accesible desde este entorno** en una próxima ronda (no se llegó a probar el fetch directo en esta sesión por límite de alcance) — se registra como **vía de acceso alternativa prioritaria** para la próxima investigación, en vez de insistir contra el bloqueo de red de `inta.gob.ar`.

**Estado**: `PARTIAL` — metodología y al menos un ejemplo numérico verosímiles y específicos; cobertura completa por estación/provincia, formato de exportación, y licencia siguen sin verificación primaria.

---

## 7. Unidad geográfica recomendada para "zona" (Pregunta E)

Evaluación de las 5 opciones planteadas por el encargo, ahora con la evidencia nueva de §4-6 incorporada.

| Opción | Ventajas | Desventajas | Precisión | Complejidad | Escalabilidad | Trazabilidad | UX | Dependencia externa |
|---|---|---|---|---|---|---|---|---|
| **A. Provincia → departamento/partido** | Unidad administrativa ya codificada (INDEC/IGN, `VERIFIED` en ronda anterior); estable en el tiempo; permite anclar clima/altitud con razonable granularidad | ~530 unidades es demasiado para un selector de usuario sin agrupar; los límites administrativos no coinciden con límites climáticos reales | Media-alta (nivel departamento) | Baja (dato ya existe, solo falta cargarlo) | Alta | Alta (fuente INDEC/IGN trazable) | Mala si se expone tal cual, buena si se usa solo como capa de datos interna | Baja (georef-ar-api/IGN, ya evaluados) |
| **B. Provincia → subregión editorial** | Máxima libertad de UX (nombres reconocibles: "Valle de Uco", "Puna Jujeña"); no depende de que una fuente externa publique exactamente lo que el producto necesita | 100% trabajo manual, sin trazabilidad automática a una fuente única; riesgo de que la etiqueta editorial se perciba (erróneamente) como clasificación científica si no se aclara | Depende de la calidad editorial | Alta (curaduría manual por las 24 jurisdicciones) | Media (cada provincia nueva es trabajo manual) | Baja si no se ancla a fuente real por debajo | Muy buena | Ninguna (control total) |
| **C. Provincia → coordenadas → clima → zona derivada** | Máxima precisión teórica | Viola el principio de privacidad del proyecto (ubicación nunca debe ser más precisa que zona, ver `10_PRIVACY.md`); da falsa sensación de precisión que las fuentes de datos disponibles no respaldan (ninguna fuente encontrada tiene resolución de coordenada libre confiable para Argentina) | Alta en teoría, engañosa en la práctica | Alta | Baja | Baja | Mala (pedir ubicación exacta contradice la propuesta de valor) | Alta |
| **D. Provincia → departamento/partido → clasificación climática (Köppen)** | Ahora es viable de forma más concreta que en la ronda anterior: existe una capa Köppen oficial verificada (§4.1) que en teoría podría cruzarse espacialmente con los polígonos de departamento (ambos son datos GIS) | Requiere trabajo GIS real (intersección espacial de dos capas) que no se ha hecho ni evaluado en esta ronda; la capa Köppen tiene licencia "Not Specified" (bloqueante hasta aclarar); el Köppen por sí solo no captura suelo/agua, que también importan al proyecto | Alta si se ejecuta bien | Alta (requiere procesamiento GIS, no solo carga de tabla) | Alta una vez construido | Alta (ambas fuentes son oficiales y trazables) | Buena si el resultado se traduce a nombres legibles, no códigos Köppen crudos | Media (dos fuentes oficiales, ninguna de pago) |
| **E. Modelo híbrido** | Combina lo mejor de A y B, y dejar D como enriquecimiento posterior | Es, en esencia, la decisión D1 ya tomada en la ronda anterior, ahora reforzada | Alta | Media | Alta | Alta | Buena | Baja |

### Recomendación
**Se mantiene y se refuerza la decisión D1 ya registrada** (`16_DECISIONS.md`): departamento/partido como unidad de datos + agrupación editorial como capa que ve el usuario (Opción E, híbrido de A+B). La evidencia nueva de esta ronda no contradice esa decisión — la enriquece con una fuente adicional legítima:

- **Cambio recomendado (no aplicado todavía, ver §9)**: usar la capa Köppen de INDEC/ANIDA (§4.1) como **insumo editorial de referencia** al momento de redactar la descripción climática de cada zona agrupada — no como reemplazo de la agrupación editorial, sino como respaldo verificable de "por qué esta zona se describe con este perfil climático", una vez resuelta la licencia.
- Las "regiones agroecológicas" de INTA RIAN y "regiones agroeconómicas homogéneas" (RySA) son candidatas a **acelerar el trabajo editorial de agrupamiento** (en vez de agrupar 530 departamentos a mano desde cero, partir de una regionalización ya publicada por el Estado) — pero esto **no puede confirmarse ni aplicarse hasta lograr acceso de lectura real** a esas fuentes (ver §9, próxima investigación).

---

## 8. Modelo recomendado (jerarquía, Pregunta F)

La jerarquía original:
```
ARGENTINA → PROVINCIA → ZONA/SUBREGIÓN → DATOS AMBIENTALES
```
**se confirma como correcta y no se propone reemplazarla**, con una precisión importante que esta investigación deja explícita (pedido del encargo, sección "No confundir dos capas"):

```
GEOGRAFÍA ADMINISTRATIVA (provincia → departamento/partido — INDEC/IGN, VERIFIED)
        +
GEOGRAFÍA AMBIENTAL (clima Köppen — INDEC/ANIDA, VERIFIED §4.1; heladas/normales — INTA/SMN, PARTIAL §4.2/§6)
        ↓ (cruce editorial, no automático)
CAPA EDITORIAL — PROJECT-DEFINED ("zona" que ve el usuario, ej. "Valle de Uco")
```

Ninguna etiqueta editorial ("Puna Jujeña", "Costa Atlántica bonaerense") debe presentarse en el sitio como una clasificación científica oficial. Debe quedar explícito en el propio contenido (no solo en este documento interno) que la agrupación es una decisión editorial del proyecto, y que los datos ambientales que la respaldan sí tienen fuente oficial citable (Köppen/INDEC-ANIDA, normales SMN, heladas INTA) cuando esa fuente exista y esté confirmada.

---

## 9. Limitaciones de esta ronda

1. **Bloqueo de red sistemático hacia `*.inta.gob.ar`**: cuatro subdominios distintos de INTA fallaron con el mismo patrón (`ENOTFOUND`) en dos rondas de investigación separadas. Esto es una limitación del entorno de ejecución de esta sesión, no evidencia de que los sitios no existan (la indexación de buscador confirma lo contrario).
2. **`geoportal.idesa.gob.ar` inaccesible** (`ECONNREFUSED`) — no se pudo leer directamente ninguna ficha de capa de "regiones agroeconómicas homogéneas".
3. **PDFs oficiales >10MB no legibles** con las herramientas de esta sesión (Atlas Climático SMN completo, Estadísticas Climatológicas Normales completas).
4. **`smn.gob.ar/clima/atlasclimatico` devolvió HTTP 402** — motivo técnico no confirmado (podría ser protección anti-bot o configuración del servidor), no se investigó más a fondo por estar fuera del alcance de "verificar sin construir nada".
5. La licencia de la capa Köppen de INDEC/ANIDA figura como "Not Specified" — no se debe asumir permiso de redistribución de esa capa como dato descargable del producto sin gestionarlo con INDEC/IGN.

## 10. Datos no verificados (no usar como hecho publicado)

- Cualquier cifra específica de temperatura/precipitación/humedad por zona — sigue sin extracción confirmada de los PDFs de SMN.
- El contenido interno exacto del Atlas Climático SMN (si usa o no códigos Köppen explícitos) — sigue `UNVERIFIED`.
- Cobertura nacional completa (todas las provincias) de "regiones agroeconómicas homogéneas" (RySA) — solo NOA confirmado por nombre.
- Formato de descarga real (shapefile/GeoJSON) y licencia definitiva de la capa Köppen de INDEC/ANIDA.
- Todo dato de heladas por estación más allá del ejemplo puntual de Balcarce citado en un snippet de búsqueda.

## 11. Decisiones que puede tomar el equipo de desarrollo (con la evidencia actual)

- **Puede decidir ya**: usar la capa "Tipos de climas" de INDEC/ANIDA como referencia editorial de clasificación Köppen por zona, sujeto a resolver la licencia antes de cualquier redistribución de la capa en sí (el uso como *referencia narrativa citada* — no como archivo redistribuido — es razonable desde ya).
- **No puede decidir todavía**: si INTA RIAN o "regiones agroeconómicas homogéneas" reemplazan el trabajo manual de agrupamiento editorial de departamentos — falta lectura primaria de esas fuentes.
- **No puede decidir todavía**: fuente definitiva de heladas por zona — falta confirmar acceso real a `climayagua.inta.gob.ar` o a su espejo `heladas.agro.uba.ar`.

## 12. Investigación futura (próxima ronda)

1. Repetir el intento de acceso a `agroregionesrian.inta.gob.ar`, `climayagua.inta.gob.ar` y `geoportal.idesa.gob.ar` desde una red sin el bloqueo observado en este entorno (ej. una máquina de desarrollo normal, no este sandbox) — es el paso de mayor impacto pendiente.
2. Probar `heladas.agro.uba.ar` directamente (dominio no gubernamental, probablemente accesible desde este entorno) como vía alternativa a los datos de heladas de INTA.
3. Descargar el Atlas Climático SMN y las Estadísticas Climatológicas Normales fuera de esta sesión (herramienta sin límite de 10MB) y releer específicamente buscando tablas de clasificación climática y datos por estación.
4. Confirmar cobertura nacional completa (o no) de "regiones agroeconómicas homogéneas" del proyecto RySA, y su licencia real de uso.
5. Confirmar el formato de descarga y la licencia definitiva de la capa "Tipos de climas" de INDEC/ANIDA directamente en el geoportal (no solo en la ficha de metadatos).

---

**Estado final de este documento**: investigación con progreso real y verificable, sin alcanzar verificación primaria completa. Ver estado del gate actualizado en `TODO.md`.
