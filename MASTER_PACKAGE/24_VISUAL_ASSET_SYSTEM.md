# 24 — Sistema visual editorial para el Atlas

## Filosofía
El sistema visual del atlas debe sentirse editorial, cartográfico, natural y preciso. No debe parecer una web SaaS ni un catálogo genérico de cannabis. Las categorías deben comportarse como fichas editoriales de una enciclopedia visual.

## Roles de imagen
- Imagen principal: fotografía, lámina, ilustración, esquema o mapa, como pieza destacada de una ficha importante.
- Imagen secundaria: tarjeta de categoría o entrada resumida.
- Micro-ilustración: empleo mínimo en metadatos o accesos pequeños.
- Ficha editorial: bloque reutilizable con imagen, título, descripción, contexto y enlace.

## Estructura de assets
```text
public/
  atlas/
    categories/
    fundamentals/
    cycle/
    environment/
    health/
    space/
    geography/
```

## Naming
`category-{slug}.svg`

## Tratamiento
- Preferir textura de papel, líneas cartográficas, cuadrícula editorial, contornos suaves y color soberbio de la identidad RELIEVE.
- No inventar imágenes fotográficas ni poner placeholders que parezcan definitivos.
- Hasta que exista un asset documentado, usar una ficha editorial con tratamiento tipográfico y patrón abstracto.

## Fotografía vs ilustración
- Fotografía: síntomas, plagas, hongos, enfermedades, deficiencias, estructuras reales o ejemplos documentales.
- Ilustración: conceptos, procesos, esquemas, ciclos, explicaciones, elementos editoriales.
- Mapa/cartografía: geografía, regiones, contexto territorial.

## Reglas de IA
- Las ilustraciones conceptuales y esquemáticas pueden utilizarse cuando el estilo cumple el sistema.
- No producir imágenes generadas para representar enfermedades, síntomas físicos, estructuras botánicas exactas o datos científicos.

## Accesibilidad
Todo asset debe tener texto equivalente y una alternativa accesible. La información clave no debe depender solo de imágenes.

## Ratios
- Hero/editorial: 16:9
- Card: 4:3
- Ficha documental: 3:2
- Lámina/ilustración: 4:5

## Cómo incorporar un asset nuevo
1. Guardar el archivo bajo `public/atlas/...` con naming consistente.
2. Referenciar la ficha correspondiente desde el componente visual reutilizable.
3. Añadir texto alternativo y metadatos accesibles.
4. Mantener el criterio de no inventar ciencia ni datos.
