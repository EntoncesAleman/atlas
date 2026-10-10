# Inicio con Territorio y Atlas

Variante implementada el 10 de octubre de 2026 para reducir el scroll del inicio móvil.

Hasta 1099 px, el inicio muestra dos pestañas. Territorio abre por defecto con el mapa real de Argentina, botánica y selector provincial. Atlas muestra el buscador y las 16 categorías editoriales. El banner grande y la bienvenida de sesión dejan de ocupar espacio antes del mapa; los accesos de cuenta siguen en la navegación global.

Contexto ambiental, paisajes, lecturas, noticias y accesos secundarios se conservan detrás de «Ver contexto, paisajes y lecturas». Cambiar de pestaña mantiene montado el selector y conserva provincia y zona. En escritorio siguen visibles el territorio y la columna editorial derecha.

Las pestañas permiten flechas, Home y End; el foco es visible. Los paneles ocultos salen de la navegación por teclado mediante `display:none`. No se agregan animaciones.

## Comprobación

```sh
npm run build
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3003
# En otra terminal:
AUDIT_BASE_URL=http://127.0.0.1:3003 node tests/home-explorer-audit.mjs
```

Prueba con navegador real a 390, 768 y 1440 px: mapa cerca del inicio, pestañas, teclado, persistencia provincial, desplegable de contexto, búsqueda, imágenes y enlaces de categorías, ausencia de desbordamiento horizontal y regreso a dos columnas al ampliar la ventana. Capturas locales en `/tmp/atlas-home-tabs`.

Esta prueba cubre la variante del inicio; no reemplaza el recorrido de cuentas y clubes de `tests/bots`.
