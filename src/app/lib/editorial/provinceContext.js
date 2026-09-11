// Contextualización provincial del Atlas (Fase 47.2).
//
// Objetivo puntual de esta fase: "el cultivo cambia según dónde estés" tiene que notarse también
// dentro de una entrada del Atlas, no solo en Home. Esta capa NO reescribe ni duplica el
// contenido editorial base (`editorial/editorialData.js`) — agrega, por entrada, un párrafo corto
// que relaciona el conocimiento general ya publicado con la macrorregión y la latitud reales de
// la provincia elegida (`lib/geo/provinceContext.js`).
//
// Regla dura de esta capa (ver `MASTER_PACKAGE/47_2_PROVINCIAL_CONTEXT.md` y la consigna de
// fase): nunca se afirma un dato climático puntual (temperatura, milímetros de lluvia, fecha de
// helada, humedad, horas de luz exactas) porque esa capa de datos sigue en `PARTIAL_RESEARCH`
// (`04_CLIMATE.md`). Lo único que varía entre provincias acá es su macrorregión y su latitud —
// ambos datos ya verificados y reutilizados, no inventados. Provincias de una misma macrorregión
// comparten el mismo texto a propósito: no hay evidencia propia para diferenciarlas más allá de
// eso, y la consigna es explícita en que inventar esa diferencia sería peor que no tenerla.

import { getProvinceGeoContext } from '../geo/provinceContext';

const REGION_TRAIT = {
  noa: 'una geografía muy variada, con valles templados, puna árida de altura y zonas de yungas húmedas conviviendo dentro de la misma región',
  nea: 'un clima subtropical, con humedad ambiente relativamente alta durante buena parte del año',
  cuyo: 'un clima árido, con amplitud térmica marcada entre el día y la noche',
  pampeana: 'un clima templado, con lluvias distribuidas de forma relativamente pareja a lo largo del año',
  patagonia: 'un clima frío, con una diferencia estacional marcada en la duración del día entre verano e invierno',
};

function regionSentence(ctx) {
  return `${ctx.name} pertenece a ${ctx.regionLabel}, una zona que en términos generales tiene ${REGION_TRAIT[ctx.region]}.`;
}

const MARCO_EDITORIAL_NOTE =
  'El marco legal descripto en esta entrada es de alcance nacional. Este atlas todavía no cuenta con información verificada específica por provincia sobre este tema — cualquier variación local debe confirmarse con fuentes oficiales de tu jurisdicción.';

// Un generador por entrada (no por provincia): recibe el contexto geográfico ya resuelto y
// devuelve los párrafos a mostrar. `null` significa "esta entrada no contextualiza por
// provincia" — ninguna entrada de las 7 cae en ese caso hoy, pero la función queda preparada
// para que una futura entrada sin evidencia suficiente pueda optar por no mostrar nada.
const ENTRY_CONTEXT_BUILDERS = {
  germinacion(ctx) {
    return [
      regionSentence(ctx),
      'Esa condición ambiental general puede acelerar o retrasar el ritmo de la germinación según la época del año, pero no cambia lo que hay que observar: disponibilidad de agua, oxígeno en el sustrato y una temperatura relativamente estable.',
    ];
  },
  'sustrato-y-drenaje': function sustratoYDrenaje(ctx) {
    return [
      regionSentence(ctx),
      'Eso influye en cuánto tarda en secarse el sustrato entre riego y riego, y en si conviene reforzar el drenaje según la época del año — pero la humedad real del sustrato en un momento dado solo se confirma observándolo, nunca infiriéndola solo por la región.',
    ];
  },
  'luz-y-fotoperiodo': function luzYFotoperiodo(ctx) {
    const paragraphs = [regionSentence(ctx)];
    if (typeof ctx.lat === 'number') {
      const latAbs = Math.round(Math.abs(ctx.lat));
      paragraphs.push(
        `${ctx.name} se ubica a unos ${latAbs}° de latitud sur. Cuanto más al sur está una zona del país, mayor es la diferencia entre la duración del día en verano y en invierno — la señal de fotoperiodo que dispara la floración al aire libre es, en ese sentido, más marcada cuanto más al sur.`
      );
    }
    return paragraphs;
  },
  'lectura-de-senales': function lecturaDeSenales(ctx) {
    return [
      regionSentence(ctx),
      'Esa condición ambiental general puede modificar qué tan probable es cierto tipo de origen frente a otro — pero eso orienta la observación, nunca reemplaza mirar el patrón completo antes de nombrar una causa.',
    ];
  },
  'cultivo-en-secuencia': function cultivoEnSecuencia(ctx) {
    return [
      regionSentence(ctx),
      'El ritmo con el que una planta atraviesa esta secuencia al aire libre depende, en parte, de esas condiciones generales del ambiente — la trayectoria propia de cada planta sigue siendo la referencia más confiable, no un calendario regional.',
    ];
  },
  'cosecha-y-maduracion': function cosechaYMaduracion(ctx) {
    const paragraphs = [regionSentence(ctx)];
    if (typeof ctx.lat === 'number') {
      paragraphs.push(
        `En ${ctx.name}, la duración del día cambia con la estación siguiendo el mismo patrón general que en el resto de ${ctx.regionLabel} — algo que puede influir en el ritmo de la maduración al aire libre, sin fijar por eso una fecha ni una duración estándar de cosecha.`
      );
    }
    return paragraphs;
  },
  'marco-editorial': function marcoEditorial() {
    return [MARCO_EDITORIAL_NOTE];
  },
};

export function getEntryProvinceContext(entryId, provinceId) {
  const builder = ENTRY_CONTEXT_BUILDERS[entryId];
  if (!builder) return null;

  const geoContext = getProvinceGeoContext(provinceId);
  if (!geoContext) return null;

  const paragraphs = builder(geoContext);
  if (!paragraphs || paragraphs.length === 0) return null;

  return {
    provinceName: geoContext.name,
    paragraphs,
  };
}
