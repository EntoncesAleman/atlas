# Biblioteca lateral del Atlas

En `/atlas`, el índice de categorías y lecturas se muestra al comienzo, a la derecha del contexto territorial en escritorio (desde 1100 px). La columna permanece visible mientras se recorre la página y su lista tiene desplazamiento independiente. Cada lectura se muestra con su imagen y su título. El acceso a Mi Cultivo está fuera de la lista desplazable. El buscador no forma parte de la columna: sigue en `/atlas`, después de la introducción regional. La portada usa la misma columna.

`AtlasEditorialRail` obtiene las categorías y entradas publicadas del registro editorial existente; no mantiene otro catálogo. Todos los títulos enlazan a sus rutas reales. Los bloques de contexto, clima, fotografías, noticias y comunidad permanecen en la página.

En móvil y tablet, la biblioteca se coloca antes del contexto. La lista tiene una altura acotada y admite desplazamiento con teclado; el contenedor tiene nombre accesible y foco visible. Con ventanas de escritorio bajas se desactiva la posición fija para evitar comprimir los controles.

Comprobaciones: build de producción, 390/768/1440 px sin desborde horizontal, columna a la derecha y posición sticky en escritorio, desplazamiento de lista mediante teclado, enlace a artículo y búsqueda. Auditoría pública para filtros, navegación y acceso a cuenta. Capturas en `screenshots/atlas-editorial-rail`.
