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

---

## Ampliación del Loop 4.4 — Auditoría del material agronómico (septiembre 2026)

Esta sección responde las 7 preguntas de cierre del brief del Loop 4.4, complementando las 13
preguntas del Loop 4.2 ya respondidas arriba. Ver las tablas de evidencia N01-N19 y P01-P25 en
`55_CANNABIS_ARGENTINA_EVIDENCE_MATRIX.md` y los vacíos actualizados en `56_CANNABIS_ARGENTINA_RESEARCH_GAPS.md`.

### 1. Claims confirmados (tienen respaldo A/B o D verificable)

- **Control de fotoperiodo en indoor como mecanismo de gestión del ciclo**: VERIFIED nivel B
  (Ahrens et al. 2023, leído en texto completo — N13).
- **Fotoperiodo 18/6 en vegetativo como protocolo industrial estándar**: PARTIAL nivel B
  (Ahrens 2023 lo documenta como el protocolo de la industria — N01).
- **Fotoperiodo 12/12 en floración como protocolo dominante**: PARTIAL nivel B (Ahrens 2023 —
  N02). Con la caveat importante de que muchos cultivares florecen hasta 14h.
- **Fotoperiodos solsticiales por provincia**: VERIFIED nivel D (cálculo canónico del Atlas,
  Spencer 1971 + Cooper 1969, ya verificado en Loops anteriores — E17). Los valores del material
  recibido son astronómicamente plausibles pero difieren sistemáticamente del Atlas.
- **Cannava opera invernaderos con control automatizado de temperatura, humedad, luz y riego**:
  VERIFIED nivel A (prensa.jujuy.gob.ar, leído directamente — N18 parcial).
- **MisioPharma operó producción híbrida invernadero+campo antes de su disolución**: VERIFIED
  (fuentes periodísticas convergentes — N19).
- **Marco normativo Ley 27.350 + Decreto 883/2020**: VERIFIED nivel A (Boletín Oficial).
  Establece qué instituciones pueden investigar Cannabis a campo (INTA, CONICET).

### 2. Claims parcialmente confirmados

- **18/6 para vegetativo y 12/12 para floración**: el mecanismo fisiológico es correcto pero
  la presentación como "regla fija" en el material es una simplificación que el propio Ahrens 2023
  demuestra incorrecta — muchos cultivares florecen a 13-14h, y el estudio fue diseñado
  específicamente para cuestionar el dogma del "12h obligatorio".
- **Temperatura en vegetativo/floración 20-26°C**: plausible y consistente con el único dato
  de nivel B disponible (25°C constante en Ahrens 2023), pero los rangos exactos del material
  no tienen cita específica.
- **Relación UV/cannabinoides**: el fenómeno existe pero el material lo describe de manera imprecisa
  al mezclar síntesis de cannabinoides por UV durante cultivo con degradación de THC a CBN en
  postcosecha.
- **Inferencias de necesidad de indoor por clima provincial**: los datos climáticos base (temperatura,
  HR, heladas, lluvias) son en su mayoría verificables por SMN (nivel D). Las inferencias
  agronómicas sobre Cannabis son lógicas en algunos casos pero ninguna tiene un estudio de campo
  argentino específico de Cannabis que las valide directamente.
- **Chubut ventana exterior diciembre-marzo**: el cultivo exterior real en verano está verificado
  (CONICET-CENPAT, nivel A), pero los límites exactos de la ventana no están en los comunicados
  oficiales.

### 3. Claims rechazados

- **"Lavado de raíces"** (riego con agua pura en los últimos 7-10 días para consumir reservas):
  sin evidencia científica revisada por pares. La agronomía no ha validado el mecanismo declarado.
  RECHAZADO.
- **"Cannava integra iluminación suplementaria para extender fotoperiodo a 18h"**: esta afirmación
  específica NO está en ninguno de los comunicados oficiales de Cannava leídos. El material recibido
  lo presenta como un hecho, pero es una inferencia no confirmada por la fuente. RECHAZADO como
  afirmación verificada (puede ser cierto, pero no está documentado).

### 4. Provincias con evidencia Cannabis directa

- **Chubut**: única con evidencia de nivel A. CONICET-CENPAT cultivó realmente Cannabis al
  aire libre en Puerto Madryn, verano 2022-2023 (E01/E02/E20). Sin datos exactos de ciclo.
- **Jujuy**: evidencia A de que Cannava opera invernaderos con control ambiental. No es evidencia
  de condiciones técnicas específicas de cultivo.
- **Misiones**: evidencia C (periodística institucional) de producción híbrida real antes de la
  disolución. Sin datos técnicos.
- **Entre Ríos (Concordia)**: INTA firmó convenio para ensayo Cannabis. Sin resultados publicados.

### 5. Provincias donde solo existe evidencia ambiental (nivel D)

Las 19 provincias restantes (Buenos Aires, CABA, Córdoba, Santa Fe, Mendoza, San Juan, Salta,
La Rioja, Tucumán, Corrientes, Neuquén, Río Negro, Santa Cruz, Tierra del Fuego, La Pampa, San
Luis, Catamarca, Chaco, Santiago del Estero, Formosa) tienen datos climáticos verificables por
SMN (temperatura, HR, fotoperiodo calculado, precipitación) pero sin ninguna evidencia directa de
cultivo real de Cannabis en ninguna de ellas.

### 6. Nuevos gaps descubiertos en este loop

1. Los protocolos de Cannava (SOPs, condiciones numéricas reales de temperatura/HR/fotoperiodo)
   no están en fuentes públicas accesibles.
2. Los resultados del ensayo INTA Concordia (desde 2022) no fueron encontrados publicados.
3. Saragoça et al. (2025) es una revisión de parámetros de cultivo Cannabis potencialmente útil
   para verificar los rangos de HR/temperatura del material, pero el PDF no fue accesible en esta
   sesión.
4. Los fotoperiodos del material recibido difieren sistemáticamente del cálculo del Atlas, con un
   caso atípico en Santa Cruz (diferencia de +0.42h en verano) que sugiere uso de latitudes
   distintas al centroide provincial.

### 7. Qué información puede pasar a la siguiente fase editorial

- El **mecanismo de fotoperiodo en indoor** (control del ciclo a voluntad) puede incorporarse
  como entrada editorial general de "cultivo controlado", citando Ahrens 2023 como fuente B —
  siempre distinguiendo el principio fisiológico (sí está verificado) de los rangos numéricos
  exactos (aún sin fuente A/B específica para todos).
- Los **datos de Cannava** confirman que existe producción industrial real de Cannabis medicinal
  en Argentina, a escala de invernadero, con control automatizado. Eso es incorporable como
  evidencia de que el cultivo controlado funciona en el país — sin atribuir a Cannava condiciones
  técnicas que sus comunicados no especifican.
- Los **fotoperiodos calculados por el Atlas** (E17) siguen siendo la referencia canónica.
  Los valores del material recibido son plausibles pero no coinciden exactamente.
- El claim de **cáñamo a campo en NEA/Pampeana** tiene lógica agronómica, pero ningún ensayo
  publicado por INTA u otra institución lo respalda todavía como "hecho" para ninguna provincia.
  Puede presentarse solo como "área de investigación activa" o "potencial identificado", nunca
  como hecho.

### Nota sobre el material recibido

El material "El Ciclo Agronómico Integral de Cannabis sativa L." no es utilizable como fuente
directa del producto. No tiene citas propias. Su contenido mezcla datos astronómicos plausibles
(fotoperiodos), datos climáticos reales (temperaturas, precipitaciones) e inferencias agronómicas
sin respaldo bibliográfico. Sigue el mismo patrón ya detectado en Semilla Libre y otros sitios
comerciales (E18, E22): formato profesional + zero citas propias. Se registra como fuente
secundaria de descubrimiento (nivel E) pero ninguno de sus datos se incorpora al producto sin
verificación independiente de nivel A/B/D.
