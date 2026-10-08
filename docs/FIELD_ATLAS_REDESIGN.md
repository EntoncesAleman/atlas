# Atlas de campo — rediseño editorial

La portada combina papel marfil, tinta verde bosque, serif editorial y navegación lateral a partir de 1100 px. En tablet y móvil se usa menú compacto. Los encabezados públicos, las tarjetas y Mi Cultivo comparten la nueva paleta; las áreas administrativas conservan su interfaz.

El mapa mantiene los polígonos originales de `argentinaProvinces`, las 24 jurisdicciones y controles por teclado. La selección muestra la macrorregión existente y actualiza el widget meteorológico sin navegar. La zona permanece como referencia editorial y no modifica el pronóstico.

La fotografía local de Llao Llao tiene atribución visible y licencia documentada en `public/atlas/field/README.md`. Los banners usan una ilustración generada mediante imagegen, optimizada a WebP. Los textos y controles siguen siendo HTML; las imágenes no contienen interfaz ni geografía interactiva.

## Comprobaciones

- `npm run build`: correcto.
- `public-search-filters-audit.mjs`: búsqueda, filtros temáticos y provinciales correctos.
- `province-profile-model-check.mjs`: 969 verificaciones correctas.
- `account-data-audit.mjs`: comprobaciones de propiedad, exportación y limpieza correctas.
- `public-experience-audit.mjs`: navegación, filtros, lecturas guardadas, metadatos, exportación local, APIs privadas y layout responsive correctos.
- Navegador a 390, 768 y 1440 px: sin desborde horizontal; mapa, selección por teclado de Mendoza y zona Valle de Uco, buscador, Mi Cultivo y menú móvil correctos; sin errores JavaScript.
- Diario local: creación de evento con fecha y nota, persistencia tras recargar y layout sin desborde a 390 px, correctos.
- Capturas: `screenshots/field-atlas/home-{390,768,1440}.webp`.

## Límites

La referencia `public/projects/atlas-web-concept.png` no estaba presente. La estética se implementó desde el brief; no se pudo comparar con la imagen exacta.

El clima y las noticias dependen de sus servicios existentes y conservan sus estados de carga, vacío y error. No se crearon cifras ambientales ficticias. La autenticación y las fotos privadas en la nube requieren una cuenta; no se verificó una sesión autenticada real ni se modificaron datos de terceros.
