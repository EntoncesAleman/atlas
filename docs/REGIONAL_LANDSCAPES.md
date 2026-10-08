# Paisajes regionales y contexto ambiental

Investigación y revisión: 8 de octubre de 2026.

## Criterio de agrupación

El Atlas usa cinco familias visuales: NOA, NEA, Cuyo, Pampeana y Patagonia. La asignación provincial reutiliza `provinceContext.js`. Es una agrupación geográfica editorial basada en la división del INDEC; CABA se incorpora a la familia pampeana para navegación. INDEC distingue también una región metropolitana. La Rioja pertenece al NOA y La Pampa a la Pampeana en esta agrupación.

La familia visual no constituye una clasificación climática. Una ecorregión puede atravesar provincias y una provincia puede contener varias ecorregiones. Los textos nombran ambientes concretos y describen la región completa, sin extender las condiciones de una foto o estación a toda la provincia.

## Fuentes y afirmaciones

| Familia | Contexto incorporado | Fuentes oficiales |
| --- | --- | --- |
| NOA | Puna de arbustos bajos y salinas; selva de montaña sobre laderas orientales; bosque chaqueño en tierras bajas. | [Puna](https://www.argentina.gob.ar/parquesnacionales/ecorregiones/puna), [Yungas](https://www.argentina.gob.ar/parquesnacionales/ecorregiones/yungas), [Chaco Seco](https://www.argentina.gob.ar/parquesnacionales/ecorregiones/chaco-seco) |
| NEA | Selva misionera, humedales correntinos y bosque chaqueño, con ambientes de distinta disponibilidad de agua. | [Selva Paranense](https://www.argentina.gob.ar/parquesnacionales/ecorregiones/selva-paranense), [Esteros del Iberá](https://www.argentina.gob.ar/parquesnacionales/ecorregiones/esteros-del-ibera), [Chaco Seco](https://www.argentina.gob.ar/parquesnacionales/ecorregiones/chaco-seco) |
| Cuyo | Monte arbustivo sobre valles y laderas, con pocas lluvias; relieve de montaña y tierras bajas. | [Monte de Sierras y Bolsones](https://www.argentina.gob.ar/parquesnacionales/ecorregiones/monte-de-sierras-y-bolsones) |
| Pampeana | La ecorregión Pampa tiene llanuras, lagunas, ríos lentos y sierras de Tandil y Ventania. La familia geográfica tiene un alcance mayor. | [Pampa](https://www.argentina.gob.ar/parquesnacionales/ecorregiones/pampa) |
| Patagonia | Franja de bosques cordilleranos de Neuquén a Tierra del Fuego; estepa de pocas lluvias, frío y viento. | [Bosques Patagónicos](https://www.argentina.gob.ar/parquesnacionales/ecorregiones/bosques-patagonicos), [Estepa Patagónica](https://www.argentina.gob.ar/parquesnacionales/ecorregiones/estepa-patagonica) |

La regionalización se contrastó con el [Anuario Estadístico INDEC 2023, sección 1.5](https://www.indec.gob.ar/ftp/cuadros/publicaciones/anuario_estadistico_2023.pdf). La distinción entre ecorregiones y provincias puede explorarse en el [SIB de Parques Nacionales](https://sib.gob.ar/ecorregiones).

El [Atlas Climático del SMN, período 1991–2020](https://repositorio.smn.gob.ar/handle/20.500.12160/2986) es la referencia para normales climatológicas. Se incorpora su enlace y período, sin extraer cifras ni asignar una clase Köppen a una provincia completa. El pronóstico operativo existente sigue usando Open-Meteo y un punto provincial; la zona seleccionada no modifica la consulta.

## Implementación

- `regionalIdentity.js`: textos, fuentes, paleta y banners de las cinco familias.
- `useAtlasLocation.js`: lectura validada de provincia, persistencia y sincronización entre componentes y pestañas. La selección permanece usable en la página si el almacenamiento está bloqueado.
- `ProvinceStatusBar`, `ProvinceContextPanel` y `ProvinceProfileCard`: consumen la selección compartida para mantener las fichas y la lectura alineadas con el banner.
- `RegionalBanner`: encabezado de portada y de las páginas que usan `ContextHeader`. La selección también cambia los fondos del shell, las cabeceras de categorías y el acceso a Mi Cultivo.
- `GeoSelector`: mapa interactivo con colores regionales, leyenda, grabado botánico, selección por teclado, búsqueda y zonas.
- `TerritoryMiniMap`: misma geometría provincial de IGN/GeoRef, con provincia y región resaltadas; se usa en contexto y tarjetas fotográficas.
- `TerritorialContext`: panorama regional con fuentes desplegables y distinción de alcance.
- `ProvinceLandscapeGallery`: cinco fotos provinciales reales, filtro regional y acciones para elegir provincia o abrir el Atlas. Ninguna foto se reasigna a otra provincia.
- `/atlas/regiones`: explicación pública del criterio y fuentes, con navegación por las 24 jurisdicciones. Incluida en el sitemap.

La geometría original no se modifica. El encuadre continental heredado excluye Antártida y archipiélagos del Atlántico Sur; la nueva página lo explicita.

## Imágenes y licencias

Los cinco banners y el conjunto botánico se generaron con imagegen integrado. Se guardan en `public/atlas/field`, en WebP; la botánica conserva transparencia real. Son ilustraciones artísticas, con composición editorial, no identificaciones taxonómicas ni reproducciones cartográficas. Los prompts exactos están en `regional-prompts.json`.

Las fotos tienen autor, ubicación, fuente y licencia en `provincePhotos.js`, atribución visible y detalle en el README de los recursos. Se redujeron y convirtieron a WebP; el encuadre y la saturación se adaptan en la interfaz. Las versiones mantienen la licencia de cada obra.

## Alcance pendiente

La galería tiene fotografías verificadas de Jujuy, Misiones, Mendoza, Buenos Aires y Río Negro. Las restantes jurisdicciones están disponibles en el mapa y contexto; no se simulan fotografías provinciales faltantes.

La referencia `public/projects/atlas-web-concept.png` sigue ausente. Se implementan los rasgos descritos por el usuario: banners regionales verdes, mapas pequeños, planta al lado y fotos provinciales. No se afirma coincidencia exacta con una imagen no disponible.

## Validación

- `npm run build`: compilación de producción correcta, con `/atlas/regiones` estática e incluida en el sitemap.
- `tests/regional-landscapes-audit.mjs`: cinco banners, selección fotográfica y por teclado, filtros, zona tras recarga, sincronización entre pestañas, fuentes, movimiento reducido, fallos de foto/clima y almacenamiento bloqueado. Correcto.
- `tests/public-experience-audit.mjs`: búsqueda, filtros, lecturas guardadas, navegación pública, metadatos, exportación local del diario y rechazo de accesos privados sin sesión. Correcto.
- `tests/public-search-filters-audit.mjs`: correcto.
- `tests/province-profile-model-check.mjs`: 969 verificaciones correctas.
- Inicio, `/atlas` y `/atlas/regiones`: revisados en navegador a 390, 768 y 1440 px, sin desborde horizontal. Sin errores JavaScript en el recorrido funcional.
- Capturas de portada: `screenshots/regional-atlas/home-{390,768,1440}.webp`.

Las pruebas de error meteorológico y fotográfico usan respuestas fallidas interceptadas exclusivamente en el navegador del test. No se introducen datos de demostración en el contexto regional ni se modifica la consulta de producción.
