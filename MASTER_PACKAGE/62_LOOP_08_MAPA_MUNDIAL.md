# Loop 8 — Mapa Mundial de Conocimiento del Atlas

Fecha: 2026-09-15
Alcance: síntesis pura (no investigación nueva exhaustiva, no redacción de entradas finales, no cambios de código ni de `editorialData.js`). Unifica los mapas de conocimiento dispersos en las 14 entradas publicadas del Atlas + `MASTER_PACKAGE` + el contenido nuevo de `documentacion/` en un único mapa de conceptos, relaciones, huecos y estructura propuesta.

---

## 0. Nota previa obligatoria — integridad de `documentacion/`

Antes del mapa: la carpeta `documentacion/` se revisó completa (6 documentos .docx únicos — 3 eran duplicados exactos con sufijo `(1)`/`(2)` — y 8 imágenes) y **no se volcó directamente a `editorialData.js`** por un motivo de integridad, no de alcance.

**Texto (6 informes únicos):**

| Documento | Naturaleza | Uso seguro |
|---|---|---|
| `informe_general_germinacion_semillas.docx` | Genérico, sin cifras prescriptivas, con nota metodológica propia que dice explícitamente "no prescribe temperaturas, tiempos... los parámetros concretos deben contrastarse" | ✅ Útil para estructura/huecos conceptuales, no aporta datos que citar |
| `Informe General - Crecimiento Vegetativo en Plantas.docx` | Genérico (especie-agnóstico), cita fuentes por nombre (Penn State Extension, OpenStax, USDA, Nature) sin URL verificable | ✅ Útil para estructura; ⚠️ cifras no citables tal cual |
| `Informe Tecnico - Germinacion de Cannabis Sativa L.docx` | Específico de Cannabis, con marcadores `[cite: 1.1.1]` que **no** son citas reales (no hay bibliografía verificable detrás) | ⚠️ Cifras específicas (rangos de T°, HR, tiempos, "%G") no verificables — no citar como fuente |
| `Informe Tecnico - Crecimiento Vegetativo de Cannabis Sativa L.docx` | Específico de Cannabis (PPFD, VPD, EC, NPK, LST/HST/FIM/Supercropping). Cita 4 fuentes por nombre sin URL/DOI | ⚠️ Mismo problema — nombres de fuente plausibles pero no verificados en esta sesión |
| `Informe Tecnico y Guia Practica.docx` (maduración/cosecha/secado) | Cita autores con nombre y año (Bernstein et al. 2019/U. Haifa, Mejía et al. 2015, Vergara et al. 2016) e instituciones argentinas (INTA, CONICET, RACME, UNLP, UNS) sin URL/DOI | ⚠️ Candidatos de alto valor para una pasada de verificación real — **no** se deben citar como fuente hasta confirmar URL/DOI real |
| `Marco Legal Argentino Cannabis y Cáñamo.docx` | Normas y números de resolución muy específicos, incluidas resoluciones fechadas 2025-2026 (Res. MSAL 1780/2025, Res. ARICCAME 41/2026, Dec. 833/2024) | ⚠️ Alto riesgo si se publica sin verificar contra Boletín Oficial/InfoLeg — es contenido legal, la categoría más sensible del sitio |

Ninguna de las cifras específicas de estos 5 documentos técnicos entró al mapa como "fuente" — entran como **candidatos a investigar** (sección 6). Esto es coherente con la regla que ya aplica todo el resto del proyecto: cada fuente en `sources.js` tiene URL real y una anotación `VERIFIED`/`PARTIAL` de lectura directa; nada de `documentacion/` pasa ese estándar todavía.

**Imágenes (8 archivos):**

- **5 imágenes son forjas de procedencia**: `ferti.jpeg`, `ferti2.jpeg`, `puede ser.jpeg`, `Gemini_Generated_Image_knwhmcknwhmcknwh.jpeg` y `Gemini_Generated_Image_uzfv49uzfv49uzfv.jpeg` son ilustraciones generadas por IA que se autoatribuyen falsamente a **"Köhler, Plantas Medicinales"** (con números de lámina inventados — "Plate XLIII", "Tabula XXVII" — y texto ilegible/inconsistente típico de generación IA: "Flor mascrlina", "Kähler's Medizinal-Pflanzen" mal escrito). El proyecto ya usa el Köhler **real** de 1887 (`visual-koehler-1887`, Wikimedia Commons, dominio público) en `assets.js` — estas 5 imágenes impersonan esa misma fuente real. **No deben usarse en el Atlas bajo ningún concepto**; se recomienda eliminarlas o moverlas fuera del repo.
- **1 imagen** (`Gemini_Generated_Image_r1miwur1miwur1mi.jpeg`, "Tabula XXV — De semilla al frasco") es arte decorativo original sin impersonar una fuente real — más segura, pero de todos modos es material nuevo para "Mi Cultivo" (fuera del alcance de este loop, que solo pide analizar/mapear, no diseñar).
- **2 imágenes no revisadas en detalle por no ser relevantes al mapa de conceptos** (quedan disponibles para revisión visual aparte si se desea usarlas en la home o en Mi Cultivo).

**Recomendación:** tratar `documentacion/` como *insumo de investigación en bruto* para futuros loops de contenido (cada dato específico necesita su propia pasada de verificación con URL real antes de entrar a `sources.js`), nunca como fuente lista para citar. El resto de este documento usa `documentacion/` solo para detectar huecos conceptuales y prioridades de investigación — nunca para afirmar un dato como hecho.

---

## 1. Mapa maestro de conceptos

Organizado por macrotema (= categoría actual del Atlas). Cada concepto indica en qué entrada(s) vive hoy.

### Germinación
- Viabilidad vs. vigor (ensayos INASE) — `germinacion`
- Trifásico: imbibición → activación metabólica → emergencia de radícula — `germinacion`
- Germinación epigea (cotiledones sobre la superficie) — `germinacion`
- Condiciones: agua, oxígeno, temperatura (sin números fijos) — `germinacion`
- Formas de ofrecer esas condiciones: siembra directa / medio húmedo / remojo — `formas-de-germinar`
- Priming como tratamiento pre-siembra (mencionado, no desarrollado) — `formas-de-germinar`
- Observación vs. interpretación en la lectura de la plántula — `germinacion`

### Crecimiento
- Ontogenia como concepto formal (ver también Cultivo) — `ciclo-de-vida`
- Tabla de etapas con rangos de referencia (temperatura, HR, fotoperiodo) por etapa fisiológica — `ciclo-de-vida`
- Por qué los rangos no son universales (genética, sistema, objetivo productivo) — `ciclo-de-vida`
- Ambiente controlado como desacople del fotoperiodo estacional — `ciclo-de-vida`

### Suelo y agua
- Doble función competitiva del sustrato: retener agua / alojar aire — `sustrato-y-drenaje`
- Capacidad de contenedor (White & Mastalerz 1966) — `sustrato-y-drenaje`
- Hipoxia/anoxia radicular — `sustrato-y-drenaje`
- Lectura de humedad por peso, no solo por superficie — `sustrato-y-drenaje`

### Luz y clima
- Luz como energía vs. luz como señal temporal — `luz-y-fotoperiodo`
- Cannabis como planta de día corto — `luz-y-fotoperiodo`
- Fitocromo (Pr/Pfr) como receptor de la señal — `luz-y-fotoperiodo`
- Giberelina como mediador fisiológico de la transición floral — `luz-y-fotoperiodo`, `genetica-y-tipos`
- Continuidad de la oscuridad (no la cantidad de luz) como variable crítica — `luz-y-fotoperiodo`

### Sanidad
- Origen biótico vs. abiótico como primera bifurcación diagnóstica — `lectura-de-senales`
- Un síntoma no alcanza: hace falta el patrón (progresión, repetición entre especies) — `lectura-de-senales`

### Cultivo
- Ontogenia / secuencia continua e irreversible — `cultivo-en-secuencia`
- Transición vegetativo → reproductivo (folíolos, disposición foliar) — `cultivo-en-secuencia`
- Comparar la planta contra su propia trayectoria, no contra un estándar externo — `cultivo-en-secuencia`

### Poda
- Dominancia apical (auxina) como mecanismo — `poda`
- Citoquininas y azúcares como coautores del mecanismo (más allá de la auxina sola) — `poda`
- Topping como remoción del meristema apical — `poda`
- Variabilidad de respuesta por cultivar (no hay protocolo único) — `poda`

### Fertilización
- Esencialidad de un nutriente (método de solución completa vs. suprimida) — `fertilizacion-y-nutricion`
- Movilidad interna del nutriente → dónde aparece el síntoma (hojas viejas vs. jóvenes) — `fertilizacion-y-nutricion`
- Carencia vs. toxicidad vs. estrés ambiental como tres orígenes de apariencia similar — `fertilizacion-y-nutricion`
- Disponibilidad real (sustrato+agua) vs. presencia nominal del nutriente — `fertilizacion-y-nutricion`

### Cosecha
- Maduración como gradiente continuo, no evento binario — `cosecha-y-maduracion`
- Tricomas: transparente → lechoso → ámbar (solo color, no tipos morfológicos) — `cosecha-y-maduracion`
- Heterogeneidad de maduración dentro de la misma inflorescencia — `cosecha-y-maduracion`

### Manejo y poscosecha
- Distinción categórica: manejo del material muerto ≠ fisiología de planta viva — `poscosecha`
- Secado (18–20 °C, 50–60 % HR, 10–15 días) — `poscosecha`
- Curado (15–20 °C, 58–62 % HR, ≥4 semanas) — `poscosecha`
- Rechazo explícito del "lavado de raíces" por falta de evidencia revisada por pares — `poscosecha`

### Genética y tipos
- Historia taxonómica: Linnaeus (1753) → Lamarck (1785) → Janischevsky (1924) — `genetica-y-tipos`
- Sativa/indica como clasificación vernácula sin validez taxonómica moderna — `genetica-y-tipos`
- Fotoperiódica vs. autofloreciente como categoría funcionalmente útil — `genetica-y-tipos`
- Descubrimiento del fotoperiodismo (Garner & Allard, 1920) — `genetica-y-tipos`

### Historia
- Domesticación (~12.000 años, este de Asia, genómica) — `historia-de-la-planta`
- Evidencia arqueobotánica (Shandong, Haimenkou) — `historia-de-la-planta`
- Expansión a Europa (polen fósil, escitas) — `historia-de-la-planta`
- Llegada a América: Norte (Jamestown/Rolfe) vs. Sur (1513-1520, Chile 1577-1605) — `historia-de-la-planta`
- Intentos coloniales en Río de la Plata/Tucumán (1619, 1626) sin evidencia de éxito — `historia-de-la-planta`
- Belgrano 1797 — memoria sobre lino y cáñamo textil, no la planta psicoactiva — `historia-de-la-planta`

### Marco legal
- Distinción información vs. recomendación — `marco-editorial`
- Ley 27.350 / REPROCANN (mencionado en términos generales) — `marco-editorial`
- Ley 23.737 art. 5 + fallo Arriola — `marco-editorial`
- Ley 27.669 (solo el ángulo de restricción de publicidad, no el régimen industrial) — `marco-editorial`
- Ley 25.326 (minimización de datos) — `marco-editorial`

---

## 2. Relaciones entre macrotemas

Relaciones que ya están escritas explícitamente en el texto de las entradas (vía `relatedEntryIds` o referencias narrativas directas) — no inventadas para este mapa:

- **Germinación → Suelo y agua**: la radícula se ancla en el mismo sistema agua-aire que describe `sustrato-y-drenaje` ("el sustrato no cambia entre una etapa y otra").
- **Germinación → Crecimiento**: la aparición de hojas verdaderas es el punto de conexión explícito hacia la etapa vegetativa (`germinacion` → `ciclo-de-vida`/`cultivo-en-secuencia`).
- **Luz y clima → Cultivo**: el fotoperiodo es "el factor que dispara" la transición vegetativo→reproductivo en `cultivo-en-secuencia`.
- **Luz y clima → Genética y tipos**: el mecanismo giberelina/fotoperiodo se describe en ambas entradas con la misma fuente (`cientifica-alter-2024-cannabis-fotoperiodo-giberelina`) — concepto compartido, no duplicado textualmente pero sí temáticamente.
- **Sanidad → Fertilización**: ambas usan explícitamente el mismo principio metodológico ("un síntoma no alcanza para diagnosticar") — `fertilizacion-y-nutricion` lo cita literalmente como préstamo de `lectura-de-senales`.
- **Poda → Cultivo**: la poda depende de la etapa de desarrollo que describe `cultivo-en-secuencia` (no fija "el momento correcto").
- **Cosecha → Manejo y poscosecha**: relación explícita y ya bien delimitada (`cosecha-y-maduracion` ↔ `poscosecha`), con la distinción "planta viva / material ya cosechado" repetida en ambas.
- **Crecimiento → Manejo y poscosecha**: `ciclo-de-vida` incluye la nota de que la sección de poscosecha se trata aparte "porque no forma parte de la fisiología de la planta viva" — el límite categórico está declarado dos veces (en `ciclo-de-vida` y en `poscosecha`), consistente.
- **Historia → Genética y tipos**: hoy conectadas solo por `relatedEntryIds`, sin superposición real de contenido (una es cronológica/arqueológica, la otra es taxonómica) — la separación de categorías del loop anterior fue correcta, no había solapamiento que fusionar.
- **Marco legal → todo el resto**: es la única categoría que ninguna otra entrada cita activamente (ninguna entrada biológica menciona REPROCANN o la Ley 27.350) — aislamiento temático deliberado y correcto dado el disclaimer "información, no asesoramiento".

**Relación no explícita pero real (detectada en este loop):** el principio "observación ≠ interpretación" no es un concepto de una sola entrada — es la arquitectura epistémica que atraviesa las 14 entradas (cada una tiene su propio bloque `observations` que repite esta distinción con ejemplos distintos). No está declarado en ningún lugar como "el principio rector del Atlas"; vive implícito, repetido 14 veces. Ver sección 7.

---

## 3. Conceptos repetidos / unificación

| Concepto repetido | Dónde aparece | ¿Fusionar? |
|---|---|---|
| Observación vs. interpretación | Las 14 entradas (campo `observations`) | No fusionar el contenido (cada ejemplo es específico y vale la pena), pero sí **nombrar explícitamente el principio una sola vez** como marco editorial transversal — hoy solo se practica, nunca se declara como tal fuera de `marco-editorial` (que ni siquiera lo menciona en estos términos). |
| "Un síntoma no alcanza" / lectura de patrón, no de punto | `lectura-de-senales` (biótico/abiótico), `fertilizacion-y-nutricion` (carencia/toxicidad/estrés), `sustrato-y-drenaje` (marchitamiento por falta o exceso de agua) | Ya está bien enlazado vía texto explícito; no requiere una entrada nueva, es un patrón metodológico compartido correctamente atribuido. |
| Triple condición agua+oxígeno+temperatura | `germinacion`, `formas-de-germinar`, `sustrato-y-drenaje` (agua/aire), `poscosecha` (HR/temperatura) | Concepto fisiológico legítimamente repetido en cada etapa porque la física es la misma en cada una — no es una duplicación de contenido, es el mismo principio aplicado a contextos distintos (correcto, no fusionar). |
| Fotoperiodo (mecanismo fitocromo/giberelina) | `luz-y-fotoperiodo` (fitocromo), `genetica-y-tipos` (giberelina, Garner-Allard), `cultivo-en-secuencia` (disparador de transición), `ciclo-de-vida` (columna de tabla) | Cuatro entradas tocan el mismo mecanismo desde ángulos distintos (señal/receptor, historia del descubrimiento, consecuencia observable, referencia numérica). No hay contenido duplicado palabra por palabra, pero si el Atlas crece, este es el concepto con más riesgo de fragmentarse — candidato a que `luz-y-fotoperiodo` sea explícitamente el "nodo canónico" y el resto solo enlace hacia él (ya ocurre parcialmente). |
| "Esta entrada no fija/no da una receta/no recomienda" | Aparece como cierre en prácticamente todas las entradas (germinación, formas de germinar, poda, fertilización, sustrato, cosecha, poscosecha) | Es una decisión editorial consistente, no una repetición accidental — vale la pena preservarla como regla de estilo documentada (no está escrita en ningún lugar como regla formal del proyecto, solo se infiere de que todas las entradas la siguen). |

---

## 4. Nuevas entradas potenciales

Ordenadas por qué tan claro es el hueco estructural (no por prioridad de investigación — eso está en la sección 6).

1. **Cuidado de la plántula post-emergencia** (entre Germinación y Crecimiento). `germinacion` termina en "aparecen las primeras hojas verdaderas"; `ciclo-de-vida` empieza la tabla ya en la etapa "Plántula" con rangos de referencia, pero ninguna entrada narra el tramo intermedio (luz para plántula, riesgo de estiramiento/etiolación, *damping-off*). `documentacion/Informe Tecnico - Germinacion...docx` tiene una sección dedicada a esto (§11–12) que confirma que es un tramo con entidad propia, aunque sus cifras específicas necesitan sourcing real antes de usarse.
2. **Cáñamo industrial y régimen de licencias** (dentro de Marco legal). `marco-editorial` cubre el ángulo medicinal/personal (Ley 27.350, REPROCANN, Arriola) pero no el régimen industrial que la propia Ley 27.669 habilita (ARICCAME, INASE, categorías de registro, licencias de propagación). Es un vacío real, no un matiz — hoy el Atlas no dice nada sobre cómo se regula el cáñamo como industria, solo como cultivo personal/medicinal. Alta sensibilidad legal: cualquier redacción nueva acá necesita verificación contra Boletín Oficial antes de publicarse.
3. **Quimiotipos y composición química** (dentro de Genética y tipos, o como extensión de Cosecha). `genetica-y-tipos` ya dice explícitamente que busca "categorías que tienen hoy más utilidad real" que sativa/indica — el quimiotipo (I/II/III, dominancia THC/CBD) es exactamente ese tipo de categoría y hoy no está. `cosecha-y-maduracion` menciona tricomas solo por color, no por tipo morfológico (bulboso/sésil/pedunculado) ni por la ruta biosintética CBGA→THCA/CBDA/CBCA que explicaría por qué el color cambia. Concepto real, con buena literatura científica citable (necesita verificación de URL, no investigación desde cero).
4. **Escarificación y semillas con dormición dura** (extensión de `formas-de-germinar`, no necesariamente entrada nueva). Hoy la entrada cubre 3 formas de germinar asumiendo semilla sin dormición fuerte; no cubre qué hacer con semilla vieja, silvestre o de cáñamo de fibra con testa muy dura — un caso real que la propia entrada de germinación deja abierto ("la mayoría de los cultivares comerciales... no presenta latencia prolongada", implicando que algunos casos sí).

**Explícitamente NO recomendado como entrada nueva:** un catálogo de técnicas de conducción (LST/HST/topping/FIM/supercropping/SCROG). `poda` ya declara por diseño que evita "una técnica paso a paso" — esto es coherente con la filosofía anti-receta del resto del Atlas, no un vacío involuntario. Añadirlo sería un cambio de política editorial, no un llenado de hueco, y debería decidirse aparte, no colarse como "contenido faltante".

---

## 5. Contradicciones transversales

**Ninguna contradicción dura entre entradas publicadas.** Las 14 entradas son internamente consistentes entre sí (verificado cruce por cruce en la sección 2).

**Tensiones/riesgos de desactualización detectados contra `documentacion/`** (no son contradicciones de contenido, son riesgos de vigencia):

- `marco-editorial` describe REPROCANN en términos generales y ya incluye el disclaimer "puede quedar desactualizado". `documentacion/Marco Legal...docx` sugiere que la Resolución MSAL 1780/2025 endureció sustancialmente los requisitos (certificado de antecedentes penales, director médico obligatorio para personas jurídicas, máximo 3 sedes, informe cromatográfico por lote) — si esto es real, la entrada actual ya no describe el régimen vigente con precisión. **No se puede confirmar sin verificar la resolución real**, pero el propio disclaimer de la entrada anticipó exactamente este escenario. Prioridad alta para una pasada de verificación (no para esta sesión).
- Los rangos numéricos de `ciclo-de-vida` (vegetativo: 22–26 °C / 40–60 % HR) y de `poscosecha` (secado: 18–20 °C / 50–60 % HR) son compatibles con los de `documentacion/` (22–28 °C / 55–70→50-60 % HR; secado 18–21 °C / 55–60 % HR) — se solapan, ninguno contradice al otro. Diferencia de granularidad, no de sustancia.

---

## 6. Huecos de investigación (para verificar, no para redactar todavía)

Priorizados:

1. **Marco regulatorio 2024-2026** (ARICCAME, Dec. 833/2024, Res. MSAL 1780/2025, Res. ARICCAME 41/2026) — máxima prioridad por sensibilidad legal y porque la propia entrada existente ya reconoce el riesgo de desactualización.
2. **Ley 27.669 operativa** (régimen de cáñamo industrial: INASE categorías A/F/K, licencias ARICCAME) con fuente primaria (texto de ley + reglamentación en InfoLeg/Boletín Oficial).
3. **Biosíntesis de cannabinoides y tipos de tricomas** — necesita 1-2 fuentes científicas reales (revisión por pares) sobre la ruta CBGA→THCA/CBDA/CBCA y morfología de tricomas (bulboso/sésil/capitado-pedunculado).
4. **Verificación de los tres estudios citados por nombre en el informe de poscosecha** (Bernstein et al. 2019, Mejía et al. 2015, Vergara et al. 2016) — si son reales y verificables, son directamente relevantes para enriquecer `cosecha-y-maduracion`/`poscosecha` con evidencia Cannabis-específica de buena calidad.
5. **INTA EEA Alto Valle/Castelar/Pergamino — ensayos de poscosecha regional** — si existe un repositorio INTA real (como los ya usados en `sources.js` para suelo/sustrato), sería evidencia argentina directa para la categoría Manejo y poscosecha, hoy sin ninguna fuente con `scope: ARGENTINA` propia más allá de lo genético/histórico.
6. **Cuidado de plántula post-emergencia** (damping-off, iluminación temprana) — buscar 1 fuente académica general (no necesita ser Cannabis-específica, el resto del Atlas ya usa fuentes `GENERAL` para fisiología no específica).

---

## 7. Fuentes especialmente importantes

**Ya en `sources.js` (nodos de alto grado — citadas por múltiples entradas, no reemplazar sin revisar todo lo que depende de ellas):**

- `cientifica-hesami-2023-cannabis-life-cycle` — citada por `cultivo-en-secuencia`, `cosecha-y-maduracion`, `ciclo-de-vida`, `poscosecha`. Es la fuente Cannabis-específica más transversal del Atlas.
- `cientifica-alter-2024-cannabis-fotoperiodo-giberelina` — citada por `luz-y-fotoperiodo` y `genetica-y-tipos`; es la única fuente que conecta mecanismo fisiológico con la categoría fotoperiódica/autofloreciente.
- `cientifica-ren-2021-cannabis-domestication-genomics` — citada por `germinacion` e `historia-de-la-planta`; conecta el mapa de Germinación con el de Historia (el único puente real entre esas dos categorías hoy).

**Candidatas nuevas de alta prioridad (pendientes de verificación real, ver sección 6):** las normas 2024-2026 de Marco legal, y los tres estudios de poscosecha citados por nombre en `documentacion/Informe Tecnico y Guia Practica.docx`.

---

## 8. Conocimiento específicamente argentino vs. internacional aplicable

El Atlas ya opera con un sistema de 3 niveles de evidencia (visible en `ProvinceProfileCard.js`: evidencia directa provincial > evidencia general de Cannabis > analogía con otra especie) — este loop no lo cambia, solo lo confirma como el marco correcto y lo documenta explícitamente porque no estaba nombrado como "sistema" en ningún `MASTER_PACKAGE` previo:

- **Evidencia argentina directa (nivel más alto):** Chubut (CONICET-CENPAT, cultivares Malvina/Pachamama), Jujuy (Cannava S.E./ANMAT), Misiones (MisioPharma, histórico/ya no vigente), INASE (Resolución 238/2023, cultivares registrados), INTA (suelo/sustrato). Cubre Germinación (parcial, vía INASE), Suelo y agua (bien cubierto), Genética (parcial, vía cultivares registrados) y la Ficha Provincial. **No cubre** Poda, Fertilización, ni Manejo y poscosecha — ninguna de las tres tiene todavía una sola fuente con evidencia argentina directa.
- **Evidencia internacional Cannabis-específica aplicada por scope `CANNABIS`:** la mayoría de las entradas (germinación, poda, luz/fotoperiodo, historia, genética) — correctamente etiquetada y nunca presentada como si fuera argentina.
- **Evidencia general (`GENERAL`) aplicada por analogía de fisiología vegetal:** Suelo y agua, Fertilización (deliberadamente 100 % general, por diseño editorial explícito de esa entrada), partes de Sanidad.
- **`documentacion/` no aporta evidencia argentina nueva verificable** salvo las menciones a INTA/CONICET/UNLP/UNS en el informe de poscosecha — que son, otra vez, candidatas a verificar (sección 6), no evidencia lista para usar.

---

## 9. Jerarquía enciclopédica propuesta

No se propone tocar las 13 categorías actuales (ya corregidas en el loop anterior) ni su orden. La propuesta es de **profundidad dentro de cada categoría**, no de reestructuración:

```
Atlas del Cultivo Argentino
├── Principio editorial transversal (no es una categoría — es el marco que atraviesa las 14 entradas):
│     observación ≠ interpretación · evidencia directa > evidencia general > analogía · nunca receta universal
│
├── Germinación
│     ├── Germinación y primera lectura del material (existe)
│     ├── Formas de germinar (existe)
│     └── [hueco] Escarificación / semillas con dormición dura
│
├── Crecimiento
│     ├── Ciclo de vida y condiciones de referencia (existe)
│     └── [hueco] Cuidado de la plántula post-emergencia (puente Germinación↔Crecimiento)
│
├── Suelo y agua — Sustrato, agua y drenaje (existe, sin huecos estructurales detectados)
├── Luz y clima — Luz como señal temporal (existe; nodo canónico del concepto fotoperiodo)
├── Sanidad — Lectura de señales y sanidad (existe, sin huecos estructurales detectados)
├── Cultivo — Cultivo en secuencia (existe, sin huecos estructurales detectados)
├── Poda — Poda (existe; catálogo de técnicas descartado a propósito, no es un hueco)
├── Fertilización — Fertilización y nutrición (existe; ausencia de cifras Cannabis-específicas es diseño, no hueco)
│
├── Cosecha
│     ├── Cosecha y maduración (existe)
│     └── [hueco] Química de la maduración: tricomas y cannabinoides (candidata a entrada nueva o sección ampliada)
│
├── Manejo y poscosecha — Manejo poscosecha: secado y curado (existe; podría enriquecerse in-place con método de trimado y actividad de agua, no necesariamente nueva entrada)
│
├── Genética y tipos
│     ├── Genética y tipos: sativa, indica, ruderalis (existe)
│     └── [hueco] Quimiotipos: clasificación química moderna
│
├── Historia — Historia de la planta (existe, sin huecos estructurales detectados)
│
└── Marco legal
      ├── Marco editorial y responsable (existe; ángulo medicinal/personal)
      └── [hueco, alta sensibilidad] Cáñamo industrial: ARICCAME, INASE y licencias
          + [riesgo de desactualización] revisar REPROCANN 2025 contra fuente primaria
```

---

## 10. Qué NO se hizo (respetando el encargo)

- No se modificó `editorialData.js`, `sources.js`, `assets.js` ni ningún componente.
- No se redactó ninguna entrada nueva ni se completó ningún hueco con contenido.
- No se investigó desde cero nada ya cubierto por loops anteriores (germinación, sustrato, luz/fotoperiodo, sanidad, cultivo-en-secuencia ya tienen su propio mapa documentado en `48`, `49`, `60`, `61`).
- No se usó ninguna cifra de `documentacion/` como si fuera una fuente verificada.
- No se usó ninguna de las 5 imágenes con procedencia falsificada.

**Parada del loop.** Pendiente de decisión del usuario: si se abre un Loop 9 para verificar sourcing real de la sección 6 (empezando por el marco regulatorio 2024-2026, por sensibilidad legal), y qué hacer con las 5 imágenes falsificadas en `documentacion/`.
