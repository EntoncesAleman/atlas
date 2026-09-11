# 19 — Registro de Fuentes

Toda fuente externa relevante usada para fundamentar decisiones del blueprint, con fecha de consulta: **2026-09-09** (salvo que se indique otra). Formato: `FUENTE | URL | QUÉ RESPALDA | LIMITACIONES/ESTADO`.

## Legal / regulatorio

| Fuente | URL | Respalda | Estado |
|---|---|---|---|
| Boletín Oficial — Res. 1780/2025 (Salud/REPROCANN) | https://www.boletinoficial.gob.ar/detalleAviso/primera/325794/20250523 | Marco vigente de REPROCANN (autocultivador, cultivador solidario, ONG) | Verificado, primaria |
| Argentina.gob.ar — Ley 23.737 texto actualizado | https://www.argentina.gob.ar/normativa/nacional/ley-23737-138/actualizacion | Art. 5 inc. a) tipifica cultivo para producir estupefacientes; atenuante por uso personal | Verificado, primaria |
| Boletín Oficial — Ley 27.669 | https://www.boletinoficial.gob.ar/detalleAviso/primera/263212/20220526 | Restricciones a publicidad/promoción de cannabis psicoactivo | Verificado, primaria. Aplica a publicidad comercial, no a contenido educativo — **zona gris, tratar con cautela editorial** |
| TNI — Fallo "Arriola" (CSJN 2009) | https://www.tni.org/es/art%C3%ADculo/fallo-arriola-de-la-corte-suprema-sobre-tenencia-de-estupefacientes-para-consumo-personal | Base constitucional (Art. 19 CN) de la tenencia/cultivo para consumo personal | Fuente secundaria del fallo; recomendable cruzar contra texto CSJN original antes de publicar en el sitio |
| OAS — Ley 25.326 texto completo | https://www.oas.org/juridico/pdfs/arg_ley25326.pdf | Marco de protección de datos personales | Verificado, primaria |
| Argentina.gob.ar/AAIP — Protección de datos | https://www.argentina.gob.ar/aaip/datospersonales | Rol del AAIP, derechos ARCO | Verificado, primaria |
| Argentina.gob.ar/AAIP — Proyecto de ley datos personales | https://www.argentina.gob.ar/aaip/datospersonales/proyecto-ley-datos-personales | Reforma en curso de Ley 25.326 | **TODO RESEARCH** — sin sanción, monitorear |
| IAPP — Novedades legislativas AR (datos/IA) | https://iapp.org/news/a/novedades-legislativas-en-argentina-sobre-protecci-n-de-datos-personales-e-inteligencia-artificial | Estado de proyectos Carro/Doñate/Yeza 2025-2026 | Secundaria, **UNVERIFIED** contra texto de proyectos |
| UNRC — Decreto Reglamentario Ley 25.326 | https://www.unrc.edu.ar/unrc/coedi/docs/meteriales/DECRETO%20REGLAMENTARIO%20DE%20LA%20LEY%2025326,%20SOBRE%20PROTECCION%20DE%20LOS%20DATOS%20PERSONALES.pdf | Régimen de bases de datos con fines de publicidad (Art. 27), opt-out/bloqueo | Verificado, primaria |
| Argentina.gob.ar — Registro Nacional No Llame | https://www.argentina.gob.ar/noticias/registro-no-llame-la-aaip-brinda-informacion-para-garantizar-el-cumplimiento-de-la-ley | Ley 26.951, contexto de comunicaciones no solicitadas | Verificado, primaria; aplica principalmente a telemarketing |
| Diagonales / El Litoral — anuncio de baja de permisos REPROCANN (feb. 2025) | https://www.diagonales.com/nacion/bullrich-confirmo-que-daran-de-baja-los-300-mil-permisos-del-reprocann_a67af33695d41f24042658125 | Riesgo de cambio regulatorio sobre REPROCANN | **UNVERIFIED** — anuncio político, no instrumento legal confirmado como ejecutado |
| Agenda Cannabis — cambios REPROCANN 2026 | https://agendacannabis.com.ar/2026/02/03/existe-algunos-cambios-en-el-reprocann-este-2026/ | Posible reasignación a SEDRONAR (Decreto 27/2026) | **UNVERIFIED** — prensa sectorial, no Boletín Oficial confirmado en esta investigación |

## Clima / APIs meteorológicas

| Fuente | URL | Respalda | Estado |
|---|---|---|---|
| Open-Meteo — Pricing | https://open-meteo.com/en/pricing | Tier gratuito no-comercial (10k/día), tiers pagos | Verificado, primaria |
| Open-Meteo — Terms | https://open-meteo.com/en/terms | Permiso explícito de uso no comercial/sin ads, licencia CC BY 4.0 | Verificado, primaria |
| Open-Meteo — Historical Weather API | https://open-meteo.com/en/docs/historical-weather-api | Datos históricos desde 1940 en tier gratuito | Verificado, primaria |
| OpenWeatherMap — Pricing | https://openweathermap.org/price | One Call 3.0: 1.000 llamadas/día gratis, pago por uso adicional | Verificado, primaria |
| Tomorrow.io — Pricing overview | https://support.tomorrow.io/hc/en-us/articles/23554984091156 | Free: 1 ubicación monitoreada, 1 alerta | Verificado; precios de tiers pagos **UNVERIFIED** |
| WeatherAPI.com — Pricing | https://www.weatherapi.com/pricing.aspx | Free: 100k llamadas/mes, uso comercial permitido en free tier | Verificado, primaria |
| Visual Crossing — Weather Data Pricing | https://www.visualcrossing.com/weather-data-pricing/ | Free: 1.000 registros/día, histórico 50+ años en todos los tiers | Verificado; cifra mensual (30k) reportada de forma inconsistente entre páginas — **revisar antes de decidir** |
| SMN — Descarga de datos | https://www.smn.gob.ar/descarga-de-datos | No hay API pública oficial documentada/soportada | Verificado (ausencia confirmada); existen APIs no oficiales de terceros (ver [[04_CLIMATE]]) — **UNVERIFIED como fuente de producción** |
| SMN — Repositorio institucional | https://repositorio.smn.gob.ar | Atlas Climático de Argentina y Estadísticas Climatológicas Normales 1991–2020, licencia CC BY 2.5 AR | Verificado, primaria; formato PDF, no API |
| SMN — Avisos a muy corto plazo | https://www.smn.gob.ar/avisos_a_muy_corto_plazo | Alertas meteorológicas oficiales (heladas, granizo, tormentas) | Verificado como página oficial; **sin feed/API confirmado** |
| Argentina.gob.ar / INTA — Información agroclimática | https://www.argentina.gob.ar/informacion-agroclimatica | Datos de heladas por deciles, clima y agua de INTA | Verificado como existente; acceso directo a climayagua.inta.gob.ar falló en esta sesión — **revisar acceso antes de integrarlo** |

## Geografía / cartografía

| Fuente | URL | Respalda | Estado |
|---|---|---|---|
| IGN — División Política | https://www.ign.gob.ar/NuestrasActividades/Geografia/DatosArgentina/DivisionPolitica | 23 provincias + CABA = 24 jurisdicciones, nombres oficiales | Verificado, primaria |
| INDEC — CODGEO | https://www.indec.gob.ar/indec/web/Institucional-Indec-Codgeo | Codificación provincia → departamento/partido | Verificado, primaria |
| georef-ar-api (GitHub, MIT) | https://github.com/datosgobar/georef-ar-api | GeoJSON/shapefile de provincias y departamentos, gratuito | Verificado, licencia MIT en el código; migrar a v2.1, revisar términos de uso de los datos antes de redistribuir |
| IGN — Geoportal / Capas SIG | https://www.ign.gob.ar/sig | Fuente primaria oficial de límites administrativos | Verificado como existente; requiere aceptar TyC — **revisar texto exacto de licencia antes de redistribuir** |
| INTA — RIAN, Regiones Agroecológicas | http://agroregionesrian.inta.gob.ar/inicio | Candidato oficial para dividir provincias en subzonas agroclimáticas | **TODO RESEARCH** — sitio no accesible en esta sesión (fallo DNS y prueba de curl `https://agroregionesrian.inta.gob.ar/inicio` devolvió `Could not resolve host`); confirmar URL, publicación y disponibilidad de capas SIG antes de usarlo como base editorial o como fuente vinculada en la app. |
| SMN — Atlas Climático de Argentina (2024/2025, período 1991–2020) | https://repositorio.smn.gob.ar/handle/20.500.12160/2981 | Clasificación climática regional oficial | Verificado como existente; HTML del repositorio disponible pero no revela patronalmente códigos Köppen explícitos ni una lectura completa del PDF; **UNVERIFIED** si usa códigos Köppen explícitos — requiere lectura completa del documento o extracción del PDF antes de citarlo como fuente taxonómica regional. |
| IGN — ANIDA, fascículo "Clima de Argentina" | https://static.ign.gob.ar/anida/fasciculos/fasc_afn_clima_arg.pdf | Cartografía climática oficial | Existencia verificada; contenido no extraído (PDF no accesible por fetch automático) |
| Wikipedia — Regiones climáticas de Argentina | https://es.wikipedia.org/wiki/Regiones_clim%C3%A1ticas_de_Argentina | Síntesis de 11 tipos Köppen presentes en Argentina, mapeados a 6 macrorregiones | Fuente secundaria — usar como punto de partida, no como cita final; cita "Peel and Rubio 2018" marcada **UNVERIFIED/probable error de atribución** (posible referencia real: Beck et al. 2018, Scientific Data) |
| IGN — Informe MDE-Ar 45m | https://www.ign.gob.ar/archivos/Informe_MDE-Ar_45m.pdf | Modelo digital de elevación oficial de Argentina (basado en SRTM corregido) | Verificado, primaria |
| MapLibre GL JS (GitHub) | https://github.com/maplibre/maplibre-gl-js | Librería de mapas open-source, sin API key | Verificado |
| Leaflet | https://leafletjs.com | Alternativa más liviana, BSD-2, sin API key | Verificado |

## Geografía / clima — ronda de investigación 2026-09-09 (gate CLAUDE_RESEARCH_REQUIRED, ver `21_GEO_CLIMATE_RESEARCH.md`)

| Fuente | URL | Respalda | Estado |
|---|---|---|---|
| INDEC GeoNode — capa "Tipos de climas" | https://geonode.indec.gob.ar/layers/geonode_data:geonode:tipos_climaticos | Clasificación climática Köppen oficial de Argentina, atribuida a ANIDA/IGN, dato vectorial, publicada 3-ene-2025 | **VERIFIED** (leído directamente) — licencia figura como "Not Specified", **no redistribuir la capa sin gestionar licencia con INDEC/IGN** |
| Wikipedia — "Clima de Argentina" (sección Köppen) | https://es.wikipedia.org/wiki/Clima_de_Argentina | Afirma 18 climas Köppen-Geiger en Argentina, con mapa de datos 1980-2016 | **VERIFIED como afirmación de Wikipedia** (leído directamente); no verificado como afirmación del Atlas SMN — **no atribuir esta cifra al SMN** |
| SMN — ficha del Atlas Climático (repositorio) | https://repositorio.smn.gob.ar/handle/20.500.12160/2981 | Confirma existencia/metadatos del Atlas (autoría Skansi et al., SMN, mar-2025, 129 pág.) | **VERIFIED** (leído directamente); metadatos **no mencionan** Köppen ni regionalización — el PDF completo sigue `INACCESSIBLE` (>10MB) |
| SMN — `clima/atlasclimatico` | https://www.smn.gob.ar/clima/atlasclimatico | Mapas normales por variable | **INACCESSIBLE** — HTTP 402 en esta sesión, motivo técnico no confirmado |
| IGN ANIDA — fascículo "Clima de Argentina" (PDF) | https://static.ign.gob.ar/anida/fasciculos/fasc_afn_clima_arg.pdf | Cartografía climática oficial | **PARTIAL** — descargado, mayormente imágenes escaneadas; no se pudo confirmar ni descartar clasificación Köppen explícita en el texto |
| INTA RIAN — regionalización agroecológica | http://agroregionesrian.inta.gob.ar/inicio (+ subpáginas `/noa`, `/pampeana`, `/tucuman`, etc.) | Candidato de regionalización agroecológica con zonas (numeral romano) y subzonas (letra) por provincia | **PARTIAL/SECONDARY** — `INACCESSIBLE` directamente (DNS, dos rondas); existencia y forma general corroboradas por múltiples resultados de búsqueda independientes y consistentes |
| IDE Salta (GeoNode, federado en IDERA/IGN) — "Regiones agroeconómicas homogéneas del NOA" | http://geoportal.idesa.gob.ar/layers/geonode:regiones_agro_eco_homog_noa | Regionalización agroeconómica oficial del NOA, proyecto RySA (Secretaría de Agricultura), basada en Atlas de Suelos + estudios INTA, publicada 17-ago-2016, dominio público | **SECONDARY** — `INACCESSIBLE` directamente (`ECONNREFUSED`); confirmado solo vía snippets de búsqueda. **Cobertura nacional NO confirmada** — solo NOA tiene nombre de capa confirmado |
| IDE Salta (GeoNode) — capa "Zonas Agro-Ecológicas-Económicas Uniformes" | http://geoportal.idesa.gob.ar/layers/geonode:zonas | Posible segunda regionalización relacionada | **SECONDARY/TODO RESEARCH** — solo detectada por nombre, sin metadatos verificados |
| INTA — Estadísticas de Heladas Meteorológicas (climayagua) | http://climayagua.inta.gob.ar/estad%C3%ADsticas_de_heladas_meteorol%C3%B3gicas | Metodología de deciles de primera/última helada, con ejemplo numérico para Balcarce (decil 10 = 6-may, decil 90 = 23-oct) | **PARTIAL/SECONDARY** — `INACCESSIBLE` directamente (DNS); contenido específico corroborado por snippet de búsqueda, no lectura primaria |
| heladas.agro.uba.ar (Facultad de Agronomía UBA) | https://heladas.agro.uba.ar/ | Espejo/proyecto académico con datos de heladas por estación INTA (Rafaela, Pergamino, Gral. Villegas, Concordia, Anguil, Alto Valle, Sáenz Peña) | **TODO RESEARCH** — detectado esta ronda, no accedido todavía; dominio no gubernamental, candidato de acceso prioritario para la próxima ronda (ver `21_GEO_CLIMATE_RESEARCH.md` §12) |

## Fuentes de contenido — Fase 7B2, escalado editorial (2026-09-10)

Investigadas para las 6 entradas restantes (`sustrato-y-drenaje`, `luz-y-fotoperiodo`, `lectura-de-senales`, `cultivo-en-secuencia`, `cosecha-y-maduracion`, `marco-editorial`), con la misma prioridad que el piloto. Estructuradas en `sources.js`; detalle metodológico completo en `MASTER_PACKAGE/31_PHASE_7B2_EDITORIAL_SCALE.md`.

| Fuente | URL | Tipo | Respalda | Estado |
|---|---|---|---|---|
| INTA (CIAP) — "Sintomatología ocasionada por agentes fitopatógenos y diagnóstico diferencial" | https://www.argentina.gob.ar/inta/ciap/sintomatologia-ocasionada-por-agentes-fitopatogenos-y-diagnostico-diferencial | OFFICIAL | Principio de no concluir origen biótico/abiótico de un síntoma sin mirar el patrón completo | VERIFIED, leída directamente con citas reales |
| INTA, EEA Alto Valle (Holzmann) — "Relación suelo – planta – agua" | https://repositorio.inta.gob.ar/xmlui/bitstream/handle/20.500.12123/14501/INTA_CRPatagoniaNorte_EEAAltoValle_holzmann_RL_Relaci%C3%B3n_suelo_planta_agua.pdf | OFFICIAL | Relación agua/oxígeno/raíz | PARTIAL — repositorio institucional oficial verificado; reintento de descarga en Fase 7C bloqueado por reset de conexión TLS al dominio (no confirmado como PDF escaneado) |
| Facultad de Agronomía UNLPam + EEA INTA Anguil — "Guía para la evaluación visual de la calidad del suelo" (2021) | https://www.unlpam.edu.ar/images/extension/edunlpam/Gu%C3%ADa%20para%20la%20evaluaci%C3%B3n%20visual%20de%20la%20calidad%20del%20suelo.pdf | ACADEMIC | Estructura del suelo, porosidad, aireación | **VERIFIED** (Fase 7C) — extraído y leído en texto completo localmente |
| UNNE, Cátedra de Fisiología Vegetal — "Fitocromos y desarrollo vegetal" | https://exa.unne.edu.ar/biologia/fisiologia.vegetal/Fitocromos%20y%20desarrollo%20vegetal.pdf | ACADEMIC | Modelo de fitocromo/fotoperiodo | **VERIFIED** (Fase 7C) — extraído y leído en texto completo localmente |
| UNCUYO, FCEN — "Ciclo de Ingreso, Biología: Guía N°3 Crecimiento" | https://fcen.uncuyo.edu.ar/ingreso/upload/guia-n3-crecimiento.pdf | ACADEMIC | Fase vegetativa/reproductiva, ontogenia | **VERIFIED** (Fase 7C) — extraído y leído en texto completo localmente |
| Hesami, Pepe, Jones (2023) — "Morphological Characterization of *Cannabis sativa* L. Throughout Its Complete Life Cycle", *Plants* (MDPI) | https://pmc.ncbi.nlm.nih.gov/articles/PMC10610221/ | SCIENTIFIC | Ontogenia completa de *Cannabis sativa*, transición vegetativo→reproductivo, maduración de tricomas | VERIFIED — texto completo leído directamente, acceso abierto |

## Fuentes de contenido — Fase 7B1, piloto editorial "Germinación" (2026-09-10)

Investigadas para la entrada `germinacion`. Prioridad aplicada: organismos oficiales argentinos → instituciones científicas/académicas argentinas → publicaciones internacionales revisadas por pares, usadas solo para lo que las fuentes argentinas no cubren en detalle (fisiología específica de *Cannabis sativa*). Estructuradas también en `src/app/lib/editorial/sources.js` (no duplicadas como texto libre, ese archivo es la fuente de verdad operativa; esta tabla es el espejo de registro).

| Fuente | URL | Tipo | Respalda | Estado |
|---|---|---|---|---|
| INASE — "Vigor en semillas" | https://www.argentina.gob.ar/inase/vigor-en-semillas | OFFICIAL | Marco oficial argentino de ensayo de germinación/vigor bajo reglas ISTA | VERIFIED, leído directamente |
| UNNE — Cátedra de Fisiología Vegetal, guía de estudio Germinación | https://exa.unne.edu.ar/biologia/fisiologia.vegetal/GuiadeestudioGerminacion.pdf | ACADEMIC | Modelo trifásico de germinación (imbibición/activación/emergencia) | PARTIAL — existencia y origen institucional verificados; texto completo no extraíble por la herramienta de fetch en esta sesión |
| UNPSJB — Cátedra de Fisiología General, TP15 Germinación | https://www.fcn.unp.edu.ar/fisiologiageneral/images/tp/TP15_Germinacion.pdf | ACADEMIC | Ídem, como respaldo convergente | PARTIAL — mismo límite de extracción |
| Latif et al. (2025), *Scientific Reports* vol. 15, art. 3073 | https://www.nature.com/articles/s41598-025-86469-y | SCIENTIFIC | Establecimiento de plántula en *Cannabis sativa* responde a factores ambientales variables | VERIFIED — título/autoría/revista/DOI confirmados por búsqueda consistente; texto completo no accesible (gate de sesión de Nature) |
| Publicación científica (ScienceDirect, 2023) sobre latencia de semillas de cannabis | https://www.sciencedirect.com/science/article/pii/S0254629923007597 | SCIENTIFIC | Existencia de latencia de semilla como fenómeno estudiado en Cannabis | PARTIAL/UNVERIFIED — título y URL consistentes; **autoría exacta y nombre de revista no verificados** (dos búsquedas dieron nombres de revista distintos, acceso directo bloqueado HTTP 403) — no se citan resultados numéricos de este estudio, solo el hecho general |

## Biblioteca visual real — Fase 6 (curaduría visual, 2026-09-09)

Fuentes de imagen/ilustración real usadas para reemplazar la colección generada con Pollinations (Fase 6B, cerrada como experimento) en los 7 assets de categoría del Atlas. Todas verificadas por lectura directa de la página de archivo en Wikimedia Commons (autor, licencia y descripción confirmados, no asumidos).

| Fuente | Tipo | URL | Licencia | Fecha verificación | Estado |
|---|---|---|---|---|---|
| Wikimedia Commons — File:Cannabis_sativa_Koehler_drawing.jpg | Ilustración botánica histórica (1887) | https://commons.wikimedia.org/wiki/File:Cannabis_sativa_Koehler_drawing.jpg | Dominio público (autor m. 1887, +70 años) | 2026-09-09 | VERIFIED, en uso (Fundamentos) |
| Wikimedia Commons — File:Germination-en.svg | Diagrama científico (germinación epigea/hipogea) | https://commons.wikimedia.org/wiki/File:Germination-en.svg | CC BY-SA 3.0 (Begoon, derivado de Kat1992) | 2026-09-09 | VERIFIED, en uso (entrada Germinación) |
| Wikimedia Commons — File:Soil_profile_0-125cm.jpg | Fotografía documental (perfil de suelo) | https://commons.wikimedia.org/wiki/File:Soil_profile_0-125cm.jpg | CC BY 4.0 (Mclund) | 2026-09-09 | VERIFIED, en uso (Suelo y agua) |
| Wikimedia Commons — File:Photoperiodism_in_plants.jpg | Diagrama científico (ciclo del fitocromo) | https://commons.wikimedia.org/wiki/File:Photoperiodism_in_plants.jpg | CC BY-SA 4.0 (Giovnnni pastrami) | 2026-09-09 | VERIFIED, en uso (entrada "luz-y-fotoperiodo", ya no como portada de categoría desde Fase 8C.1) |
| Wikimedia Commons — File:Plant_under_a_phytolamp.jpg | Fotografía documental (planta bajo luz de cultivo artificial) | https://commons.wikimedia.org/wiki/File:Plant_under_a_phytolamp.jpg | CC BY 4.0 (Alla Varta) | 2026-09-10 | VERIFIED, en uso (portada de categoría Luz y clima, Fase 8C.1) |
| Wikimedia Commons — File:Red_spider_mite_(Tetranychus_urticae).jpg | Fotografía documental (plaga) | https://commons.wikimedia.org/wiki/File:Red_spider_mite_(Tetranychus_urticae).jpg | CC BY 2.0 (Aleksey Gnilenkov) | 2026-09-09 | VERIFIED, en uso (Sanidad) |
| Wikimedia Commons — File:Industrialhemp.jpg | Fotografía documental (cultivo exterior de cáñamo, Francia) | https://commons.wikimedia.org/wiki/File:Industrialhemp.jpg | GFDL 1.2+ / CC BY-SA 3.0 y compatibles (Aleks) | 2026-09-09 | VERIFIED, en uso (Cultivo) |
| Wikimedia Commons — File:Cannabis_Drying_out_the_crop_(16558794823).jpg | Fotografía documental (secado poscosecha) | https://commons.wikimedia.org/wiki/File:Cannabis_Drying_out_the_crop_(16558794823).jpg | CC BY 2.0 ("Cannabis Pictures") | 2026-09-09 | VERIFIED, en uso (Cosecha) |
| Wikimedia Commons — File:Hemp_plants-cannabis_sativa-field.JPG | Fotografía documental (cultivo exterior, Reino Unido) | https://commons.wikimedia.org/wiki/File:Hemp_plants-cannabis_sativa-field.JPG | Dominio público (Nabokov) | 2026-09-09 | VERIFIED, candidato B no usado (Cultivo) |
| Wikimedia Commons — File:Herbs_Hung_to_Dry.jpg | Ilustración histórica (línea, secado de hierbas) | https://commons.wikimedia.org/wiki/File:Herbs_Hung_to_Dry.jpg | Dominio público (autora m. 1900) | 2026-09-09 | VERIFIED, candidato B no usado (Cosecha) |
| Wikimedia Commons — File:Torrontés_en_Cafayate_(Argentina).jpg | Fotografía documental (viñedo, Cafayate, Salta) | https://commons.wikimedia.org/wiki/File:Torront%C3%A9s_en_Cafayate_(Argentina).jpg | CC BY 2.0 (aaepstein) | 2026-09-09 | VERIFIED, candidato C no usado — territorio argentino real pero especie no relacionada (vid, no cannabis); descartado por precisión temática, no por licencia |
| Wikimedia Commons — File:Soil_horizons.JPG | Fotografía documental (horizontes de suelo) | https://commons.wikimedia.org/wiki/File:Soil_horizons.JPG | Dominio público (Jonty68) | 2026-09-09 | VERIFIED pero DESCARTADO — calidad visual insuficiente (foto de baja legibilidad, no muestra horizontes con claridad) |
| Wikimedia Commons — File:Harvest.jpg | Fotografía documental (sorgo) | https://commons.wikimedia.org/wiki/File:Harvest.jpg | CC BY 4.0 (Asikironalio) | 2026-09-09 | VERIFIED pero DESCARTADO — irrelevante (cultivo de sorgo, sin relación temática) |

**Nota sobre atribución**: las licencias CC BY/CC BY-SA/GFDL usadas exigen atribución (autor + licencia + enlace a la fuente); el detalle exacto de atribución por asset vive en `ASSET_REGISTRY.md`, no duplicado acá.

## Nota de uso de este registro
Todo dato citado en [[03_GEO]], [[04_CLIMATE]], [[12_LEGAL]], [[13_STACK]] y [[18_EXTERNAL_SERVICES]] debe poder rastrearse a una fila de esta tabla. Las filas marcadas `UNVERIFIED` o `TODO RESEARCH` no deben presentarse en el sitio como hechos definitivos sin revisión adicional antes del lanzamiento.
