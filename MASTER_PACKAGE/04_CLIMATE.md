# 04 — Clima y Alertas

## Dos necesidades distintas (no confundir)
1. **Climatología de referencia** (contenido editorial, estático/semi-estático): "¿cómo es el clima típico de esta zona?" — normales históricas, riesgos típicos por estación.
2. **Clima operativo** (dato vivo): pronóstico actual, condiciones de hoy, y alertas por umbral (helada, granizo, viento, tormenta) para usuarios registrados que activaron alertas.

Estas dos necesidades usan fuentes distintas y no deben mezclarse en el modelo de datos ni en la arquitectura (ver `climate_data` vs. el módulo de alertas en [[07_DATABASE]]).

## Separación de estructura geográfica y clima parcial
La estructura administrativa (`Argentina -> provincia -> departamento/partido -> zona editorial aproximada`) puede implementarse con información geográfica verificada y puede dejarse separada del dato climático. La clasificación climática y la regionalización agroecológica siguen estando en `PARTIAL_RESEARCH`: se verificó una capa oficial Köppen de INDEC/ANIDA (licencia pendiente de confirmación) y la regionalización agroecológica de INTA/RySA requiere acceso directo y lectura primaria antes de usarse como una fuente de zonas o de clase climática. La arquitectura de este proyecto debe dejar el plano geográfico independiente del clima para permitir añadir o cambiar la fuente climática sin rehacer la estructura.

## Clasificación climática de Argentina (para dar marco narrativo a cada zona)
Argentina presenta al menos **11 tipos climáticos Köppen** según la síntesis revisada de Wikipedia (Cfa, Cwa, Cfb, BSh, Cwb, BWh, BSk, BWk, Csb, Cfc, ET; esa página cita "18 climas" en otra sección, con base en un mapa de datos 1980-2016 — cifras de dos secciones distintas, no reconciliadas), agrupables en 6 macrorregiones reconocibles: NOA, Chaco, Mesopotamia, Cuyo, Pampas, Patagonia.

**Actualización 2026-09-09 (ver `21_GEO_CLIMATE_RESEARCH.md` §4)**: se verificó por lectura directa una fuente oficial de clasificación Köppen distinta de la síntesis de Wikipedia — la capa GIS **"Tipos de climas"** de INDEC, atribuida al Atlas Nacional Interactivo (ANIDA) del IGN (`geonode.indec.gob.ar`, `VERIFIED`, licencia "Not Specified" pendiente de confirmar antes de redistribuir). Esta es ahora la referencia recomendada para citar clasificación Köppen (ver decisión D10 en `16_DECISIONS.md`). El Atlas Climático del SMN (1991-2020) sigue `UNVERIFIED` en este punto: su ficha de repositorio no menciona Köppen ni regionalización, y el PDF completo (129 páginas) excede el límite de las herramientas de investigación disponibles — **no atribuir la cifra de "18 climas" de Wikipedia al SMN**, son fuentes distintas con períodos de datos distintos.

## Fuentes de datos: climatología de referencia (históricos/normales)
- **SMN — Estadísticas Climatológicas Normales 1991-2020** (105 estaciones SMN/INTA), licencia CC BY 2.5 AR, formato PDF — la fuente más autorizada para temperatura/precipitación/humedad promedio por estación. Requiere trabajo manual de extracción (no es una API).
- **INTA — Información agroclimática** (heladas por deciles: fecha de primera/última helada al 10%/90%) — existencia confirmada, acceso directo a climayagua.inta.gob.ar falló en esta investigación; **TODO RESEARCH** confirmar acceso y formato antes de comprometerse a usarlo como fuente de heladas.
- **Visual Crossing** (API paga/freemium) como complemento: histórico de 50+ años disponible incluso en tier gratuito (1.000 registros/día), útil para rellenar huecos entre estaciones SMN si se necesita granularidad por zona en vez de solo por estación meteorológica.

## Fuentes de datos: clima operativo (pronóstico + histórico consultable por API)
### SMN (oficial)
No tiene API pública documentada ni soportada. Existen proyectos de terceros que ingenierizaron a la inversa endpoints internos (`ws.smn.gob.ar`) — **no recomendado como dependencia de producción** por falta de SLA, ToS y estabilidad garantizada. Sí es la fuente correcta para **enlazar** alertas oficiales (`avisos_a_muy_corto_plazo`) como referencia de autoridad, aunque no se pueda consumir vía API confiable.

### Comparativa de proveedores evaluados
| Proveedor | Tier gratuito | Cobertura AR | Histórico | Alertas | Uso comercial en free tier | Costo pago |
|---|---|---|---|---|---|---|
| **Open-Meteo** | 10.000 llamadas/día, sin key | Sí | Desde 1940 (incluido en free) | No tiene endpoint de alertas | **Solo no-comercial** (encaja con este proyecto) | Desde $29/mes si se supera el free tier |
| OpenWeatherMap | 1.000 llamadas/día (One Call 3.0) | Sí | Desde 1979 (pago por llamada) | Sí, incluidas en One Call 3.0 | Sí | ~$0.0015/llamada excedente |
| Tomorrow.io | 1 ubicación, 1 alerta | Sí | 24h | Sí (limitado en free) | UNVERIFIED | Precios de tiers pagos no confirmados |
| WeatherAPI.com | 100.000 llamadas/mes | Sí | Free: solo 1 día atrás | Alertas completas requieren pago | **Sí, permitido en free** | Desde $7/mes (Starter) |
| Visual Crossing | 1.000 registros/día | Sí | 50+ años, incluido en free | No tiene alertas | UNVERIFIED | $0.0001/registro excedente |

(Detalle completo y fuentes en [[19_SOURCE_REGISTRY]] y [[18_EXTERNAL_SERVICES]].)

## Decisión recomendada (no definitiva — a confirmar en fase de construcción)
- **DECISIÓN**: usar **Open-Meteo** (tier gratuito no comercial) como motor principal para pronóstico, condiciones actuales e histórico.
- **MOTIVO**: gratuito, sin necesidad de tarjeta, términos explícitamente permiten "sitios web privados o sin fines de lucro sin publicidad ni suscripciones" — coincide exactamente con el perfil de este proyecto (no ecommerce, no ads). Buena cobertura de Argentina.
- **ALTERNATIVAS**: OpenWeatherMap One Call 3.0 como proveedor de respaldo si en el futuro se necesitan alertas nativas del proveedor (Open-Meteo no las tiene) y el volumen de uso justifica el costo por llamada; WeatherAPI.com si se prioriza uso comercial explícito sobre volumen gratuito alto.
- **CONSECUENCIAS**: como Open-Meteo no tiene endpoint de alertas, el sistema de alertas por umbral debe **calcularse del lado del proyecto** a partir de las variables de pronóstico (temperatura mínima prevista → alerta de helada; ráfagas de viento previstas → alerta de viento; intensidad de precipitación → proxy de tormenta/posible granizo), en vez de depender de un servicio de alertas de terceros. Esto es más trabajo de lógica propia pero evita atarse a un proveedor pago desde el día 1.

## Diseño del sistema de alertas (conceptual, no implementación)
```
UBICACIÓN GUARDADA (provincia + zona del perfil)
   ↓
CONSULTA PERIÓDICA A PROVEEDOR DE PRONÓSTICO (job programado, no en tiempo real por request)
   ↓
REGLAS POR UMBRAL (definidas por tipo: helada = temp. mín. prevista ≤ 0°C; viento fuerte = ráfaga ≥ umbral X km/h; tormenta/granizo = proxy por precipitación intensa + otros indicadores disponibles)
   ↓
¿Coincide con alguna alerta que el usuario activó en sus preferencias? ([[07_DATABASE]] notification_preferences)
   ↓
EMAIL (con registro en weather_alerts_log para auditoría/anti-spam, y link de baja de un clic)
```
- Debe evitarse el "alert fatigue": frecuencia máxima razonable de alertas por día/semana a definir en construcción, y agrupar alertas del mismo tipo en la misma ventana de tiempo en un solo email.
- El cálculo de alertas corre server-side (nunca expone la API key del proveedor al cliente — ver [[09_SECURITY]]).

## Riesgos identificados
- Dependencia de un proveedor gratuito sin SLA (Open-Meteo) para una función que el usuario puede percibir como "importante" (alerta de helada). Mitigación: comunicar claramente que las alertas son informativas y no reemplazan el juicio propio ni el monitoreo oficial de SMN; siempre enlazar a la fuente oficial SMN como respaldo.
- Términos de "no comercial" de Open-Meteo: si el proyecto en el futuro incorpora cualquier forma de monetización (algo que hoy está fuera de alcance, ver [[01_PRODUCT]]), habría que migrar a un tier pago o proveedor distinto — dejarlo documentado como condición de watch en [[17_RISKS]].
