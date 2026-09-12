# 57 — Informe de investigación: Cannabis, Argentina y ambiente (Loop 4.2)

Responde directamente las 13 preguntas de cierre de la consigna. Ver el detalle fila por fila en
`55_CANNABIS_ARGENTINA_EVIDENCE_MATRIX.md` y el mapa de vacíos en
`56_CANNABIS_ARGENTINA_RESEARCH_GAPS.md`. Este loop fue exclusivamente de investigación — no se
modificó código, componentes ni contenido público.

## 1. ¿Qué sabemos con alta confianza?

- CONICET (a través de su Centro Científico Tecnológico Patagonia, CENPAT, en Puerto Madryn,
  Chubut) registró oficialmente 6 cultivares medicinales de Cannabis sativa L. en el Registro
  Nacional de Cultivares de INASE (Resolución 238/2023, Boletín Oficial, documento primario
  leído directamente): Malvina, Ballena Franca, CENPAT, Pachamama, CONICET y Mariquita.
- Esos cultivares se cultivaron realmente al aire libre en Chubut (temporada 2022-2023).
- El mecanismo fisiológico del fotoperiodo en Cannabis sativa (no una analogía): bajo día corto,
  baja la giberelina y eso dispara la inflorescencia condensada, con un umbral de al menos 3 días
  consecutivos de oscuridad prolongada (Alter et al. 2024, ya incorporado desde el Loop 4.1).
- La historia taxonómica real de "sativa/indica/ruderalis" (Linnaeus 1753, Lamarck 1785,
  Janischevsky 1924) y que los nombres comerciales actuales no tienen validez taxonómica formal
  (Pollio 2016, ya incorporado desde el Loop 4.1).
- Existieron órdenes coloniales españolas (1619, 1626) de fomentar el cultivo de cáñamo
  específicamente en el Río de la Plata y Tucumán, documentadas con signatura de archivo exacta
  (Archivo General de Indias, vía Díaz-Ordóñez 2017).
- El cálculo de fotoperiodo astronómico ya implementado (Loop 3B) es correcto dentro de su margen
  documentado de error (verificado contra cifras públicas de referencia en este loop).

## 2. ¿Qué sabemos parcialmente?

- Que existe un paper científico (preprint) sobre los cultivares CONICET-CENPAT, con coautoría
  institucional confirmada — pero sin haber podido leer su contenido metodológico completo.
- Rangos térmicos generales para Cannabis en Argentina (mínimo ~8°C, óptimo 10-25°C, ciclo 2-7
  meses) — de la declaración de un investigador con una maestría en curso, no de un paper
  publicado con metodología pública.
- Que existe un documento de INTA sobre fenología de cáñamo — sin poder leer su contenido
  (bloqueo de acceso al repositorio, mismo patrón ya documentado en loops anteriores).

## 3. ¿Qué información específicamente argentina encontramos?

La más significativa: el registro oficial y el cultivo real de 6 cultivares de Cannabis
desarrollados en Argentina (CONICET-CENPAT, Chubut), con quimiotipo documentado para dos de ellos
(Malvina, Pachamama). También: la historia colonial documentada del Río de la Plata/Tucumán
(1619-1626) y la investigación histórica sobre Belgrano (1797), ambas ya con fuente primaria o
secundaria sólida.

## 4. ¿Qué regiones tienen evidencia directa?

Solo **Chubut** (Patagonia) tiene evidencia directa (nivel A) de cultivo real de Cannabis, vía los
cultivares CONICET-CENPAT — aunque sin datos públicos de fenología/rendimiento asociados a esa
evidencia todavía.

## 5. ¿Qué regiones solamente tienen evidencia ambiental?

Las 23 jurisdicciones restantes: tienen evidencia geográfica/climática (clasificación del
centroide, fotoperiodo astronómico, cantidad de estaciones SMN — todo del Loop 4) pero ninguna
evidencia directa de cultivo real de Cannabis.

## 6. ¿Qué sabemos sobre fotoperiodismo?

Bastante, a dos niveles distintos: (a) el mecanismo fisiológico específico de Cannabis sativa
(giberelina, umbral de 3 días, Alter et al. 2024); y (b) la variación real del umbral fotoperiódico
crítico entre cultivares internacionales de cáñamo, correlacionada con la latitud de origen
genético (13h45m a 15h30m según cultivar, con genotipos día-neutros incluidos — Zhang et al. 2021,
leído en texto completo). Ninguno de los dos estudios es sobre cultivares o ambientes argentinos
específicamente.

## 7. ¿Qué sabemos sobre sativa/indica/ruderalis?

Que son tres propuestas taxonómicas hechas en tres siglos distintos, con criterios distintos
(morfológico y geográfico, nunca climático), que la botánica moderna no las trata como tres
especies separadas de forma consensuada, y que los nombres comerciales actuales no tienen validez
taxonómica formal — todo esto ya documentado en el Loop 4.1, no se encontró nada en este loop que
lo contradiga o que amplíe sustancialmente ese cuadro.

## 8. ¿Qué sabemos sobre autoflorecientes?

Que el rasgo se asocia genéticamente a la herencia de Cannabis ruderalis y tiene base genética
identificable (ya documentado desde el Loop 4.1), y que — hallazgo nuevo de este loop — incluso
entre cultivares de cáñamo "fotoperiódico" hay algunos día-neutros (florecen igual a 24h de luz:
"CFX-1", "Joey", "Tygra", "Helena", según Zhang et al. 2021) — es decir, la insensibilidad al
fotoperiodo no es exclusiva de la línea ruderalis/autofloreciente "recreativa", también aparece en
germoplasma de cáñamo industrial.

## 9. ¿Qué sabemos sobre cultivares argentinos?

Los 6 de CONICET-CENPAT, registrados oficialmente (§1), con Chubut como única región de cultivo
real confirmado. No se encontró evidencia de otros cultivares argentinos registrados o
desarrollados institucionalmente fuera de este programa, ni de que estos 6 se hayan probado en
otras provincias.

## 10. ¿Qué sabemos sobre cultivo/cosecha regional?

Seguimos sin ninguna fuente de nivel A o B que dé una ventana de cultivo/cosecha específica para
Cannabis en ninguna provincia argentina. Lo que sí se reforzó es el marco conceptual para
interpretar esa falta de datos: la interacción genotipo×latitud (nivel B, internacional) explica
*por qué* no alcanzaría con una sola ventana por provincia aunque hubiera datos — dependería
también de qué genotipo se esté describiendo.

## 11. ¿Qué NO sabemos?

- Ninguna fecha de "primera plantación argentina" verificable entre Belgrano y el siglo XX
  (`NO ENCONTRADO EN LAS FUENTES CONSULTADAS`).
- Ningún calendario regional de siembra/floración/cosecha de Cannabis específico para una
  provincia argentina, respaldado por fuente científica o agronómica.
- Ningún dato de rendimiento regional (kg/planta, kg/ha) por provincia o región argentina.
- El contenido completo de al menos un documento de INTA directamente relevante (fenología de
  cáñamo), bloqueado por acceso de dominio.
- El texto original de la memoria de Belgrano de 1797.

## 12. ¿Qué debería aparecer finalmente en la Ficha Provincial?

- Para **Chubut**: podría sumarse, como dato de nivel A, la mención de que allí se desarrollaron y
  cultivaron realmente cultivares de Cannabis registrados oficialmente (CONICET-CENPAT) — sin
  inventar cifras de rendimiento o ciclo que esa misma fuente no da.
- Para las 24 jurisdicciones: reforzar (no reemplazar) la explicación de por qué "sativa/indica" no
  predice adaptación, citando ahora también la evidencia internacional cuantificada de interacción
  genotipo×latitud (Zhang et al. 2021) junto a la ya usada de Pollio (2016).
- El cálculo de fotoperiodo por estación (no solo la fecha de generación del perfil) — ya
  verificado en este loop como correcto — es un candidato concreto para una futura ampliación de
  `provinceProfile.js` (mostrar solsticios/equinoccios, no solo "hoy").

## 13. ¿Qué NO debería aparecer todavía?

- Ninguna ventana de siembra/floración/cosecha por provincia — sigue sin evidencia A/B.
- Ninguna fecha de "primera plantación argentina".
- Ningún dato de rendimiento regional.
- Ninguna generalización de Chubut/CENPAT al resto de la Patagonia — la propia consigna lo pedía
  explícitamente ("no generalizar automáticamente Trelew a toda Patagonia"), y este loop no
  encontró evidencia de que los cultivares CENPAT se hayan probado fuera de Chubut.
- El umbral térmico de -8°C (Galic et al. 2022) no debería presentarse como una "temperatura
  segura" para ninguna provincia — es un umbral de daño en un estudio internacional no leído en
  texto completo, no una recomendación de manejo.

## Cierre

Este loop fue exclusivamente de investigación: no se modificaron componentes, rutas, base de
datos ni contenido público. Los tres documentos (`55`, `56`, `57`) quedan como base para decidir,
en un loop de implementación futuro, qué de todo esto se incorpora al producto — con el mismo
criterio ya aplicado en todos los loops anteriores: nunca convertir una analogía o un cálculo en
un hecho directo, y nunca rellenar un vacío de evidencia con una estimación disfrazada de dato.
