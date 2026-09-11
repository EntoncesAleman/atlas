# 01 — Definición de Producto

## Nombre
**Atlas del Cultivo Argentino**

## Qué es
Una plataforma web **exclusivamente informativa y educativa** sobre cultivo de cannabis en Argentina, organizada alrededor de un principio central:

> **El cultivo no es igual en toda Argentina.**

El contenido botánico, agrícola y de cuidados se cruza sistemáticamente con la geografía real del país (provincia → zona aproximada → clima/suelo/agua locales) en lugar de presentar guías genéricas de cultivo como si Argentina fuera un único clima.

## Qué NO es (restricciones duras, válidas para todo el proyecto)
- NO es un ecommerce.
- NO vende productos ni servicios.
- NO recomienda marcas ni productos comerciales (fertilizantes, semillas, iluminación, etc. se explican como *conceptos*, nunca como catálogo).
- NO está orientado al consumo (no trata dosificación, efectos, extracción, ni nada post-cosecha orientado a consumo).
- NO pide datos personales innecesarios (nunca dirección exacta; ubicación siempre aproximada y opcional).
- NO ofrece asesoramiento legal ni médico.

Cualquier funcionalidad futura debe pasar este filtro antes de considerarse.

## Para quién
- Personas en Argentina interesadas en el autocultivo doméstico (amparado en el marco de uso personal / REPROCANN — ver [[12_LEGAL]] para el estado legal verificado), en cualquier nivel de experiencia.
- Personas que exploran el tema por curiosidad botánica/agrícola/científica sin intención inmediata de cultivar.
- Perfil geográfico: todo el país, con contenido que se adapta a la enorme heterogeneidad climática (puna, yungas, pampa húmeda, patagonia, cuyo, litoral, etc.).

## Los dos modos de uso

### MODO VISITANTE (sin cuenta — es el modo por defecto y el más importante)
Puede hacer todo lo que es *consulta*:
- Explorar el mapa de Argentina.
- Seleccionar provincia y, opcionalmente, zona aproximada.
- Omitir la selección de zona y navegar en modo genérico/nacional.
- Consultar información climática de una zona (sin guardar nada).
- Consultar el calendario agrícola/estacional por provincia/zona.
- Explorar la enciclopedia completa.
- Consultar la biblioteca visual (fotos, ilustraciones, diagramas).
- Buscar contenido (texto libre, filtros, tags).
- Comparar dos o más regiones entre sí.
- Leer el newsletter público (archivo) sin suscribirse.

Ninguna de estas acciones requiere registro, y ninguna debe pedir email "para continuar". El registro nunca debe interponerse en el camino de la exploración.

### MODO USUARIO (registrado)
Todo lo del modo visitante, más funcionalidades que requieren **persistencia atada a una identidad**:
- Guardar su ubicación aproximada (provincia + zona) como preferencia.
- Crear cultivos y temporadas ("Mi Cultivo").
- Registrar eventos del cultivo (siembra, trasplante, cambio de fase, riego relevante, poda, etc.).
- Registrar notas de texto libre.
- Subir fotografías privadas asociadas a su cultivo.
- Consultar su historial completo desde cualquier dispositivo.
- Guardar contenidos favoritos de la enciclopedia.
- Suscribirse a alertas meteorológicas para su zona guardada.
- Suscribirse al newsletter.

### Regla de decisión: ¿esto necesita cuenta?
Pregunta única: **¿el dato debe persistir y pertenecer a una identidad a través del tiempo/dispositivos?**
- Si el dato es efímero o reproducible desde inputs públicos (ej.: "clima de esta zona ahora") → **NO requiere cuenta**, aunque el usuario esté logueado.
- Si el dato es privado y acumulativo (fotos de un cultivo, notas, historial) → **requiere cuenta**.
- Ubicación: se puede *usar* sin cuenta (seleccionás provincia/zona en cada visita, vía UI o guardado en `localStorage` del navegador); solo se **guarda en el servidor** si el usuario se registra y lo activa explícitamente.

## Propuesta de valor
1. Es la única fuente en español que cruza sistemáticamente "qué hacés" (agronomía del cannabis) con "dónde estás" (geografía/clima argentino) sin pretender que el país es homogéneo.
2. Es un espacio serio, no comercial — se diferencia de foros, grow shops y contenido orientado a venta.
3. Da al usuario una herramienta de seguimiento propio (diario de cultivo) sin necesidad de compartir nada públicamente ni de exponer datos sensibles.

## Principio geográfico rector (detalle en [[03_GEO]])
```
ARGENTINA → PROVINCIA → ZONA APROXIMADA → CONDICIONES AMBIENTALES → CONTENIDO RELEVANTE
```
Este flujo es el "spine" de la aplicación: casi toda página de contenido regionalizado cuelga de esta jerarquía.

## Métricas de éxito conceptuales (no de vanidad)
- % de sesiones que completan una selección de provincia/zona (mide si el "¿dónde cultivás?" funciona como entrada).
- % de contenido de enciclopedia consultado que es "contenido dependiente de región" vs. general (mide si la propuesta de regionalización realmente se usa).
- Retención de usuarios registrados que vuelven a su diario de cultivo (mide si "Mi Cultivo" aporta valor real, no solo la enciclopedia).
- Nunca: revenue, conversión de venta, CTR publicitario — no son objetivos de este producto.
