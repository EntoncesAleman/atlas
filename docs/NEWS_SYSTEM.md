# Sistema de Noticias del Atlas

Infraestructura de noticias dinámicas del Atlas: un Skill reutilizable que busca noticias
relevantes, un ejecutor que las persiste en Supabase, un endpoint protegido para Vercel Cron, un
widget público en `/atlas` y un historial permanente en `/noticias`.

Esta es una capa **completamente separada** de la categoría editorial estática "Noticias" que ya
existe en `src/app/lib/editorial/editorialData.js` (`categoryId: 'noticias'`) — esa sigue siendo
contenido curado a mano dentro del Atlas editorial; esta es contenido sincronizado
automáticamente desde fuentes externas, con su propia tabla y sus propias rutas.

## Skill — `src/app/lib/news/skill.js`

Núcleo reutilizable: busca, evalúa relevancia, clasifica y estructura noticias. **Nunca escribe
en Supabase ni sabe que Supabase existe** — devuelve resultados estructurados, listos para que
otro proceso los persista. Pensado para poder llamarse desde el cron, el panel admin, una
ejecución manual, o cualquier otro proceso interno futuro.

**Contrato de entrada:**
```js
findAtlasNews({ sinceDays = 12, maxPerSource = 10 } = {})
```

**Contrato de salida:**
```js
{
  ok: true,
  generatedAt: '2026-09-22T...',
  sinceDays: 12,
  sourcesChecked: [{ id, name, ok, itemsFound, itemsRelevant, error }],
  items: [
    {
      title, summary, sourceName, sourceUrl, publishedAt,
      countryScope: 'argentina' | 'mundo',
      category: 'marco-legal' | 'industria' | 'investigacion' | 'cultivo' | 'institucional',
      tags: [...],       // subconjunto de CONTROLLED_TAGS (lib/editorial/tags.js)
      imageUrl: null
    }
  ]
}
```

Un ítem sin título, URL válida, fecha real o resumen real de la fuente se descarta — nunca se
completa un campo faltante con un valor supuesto. El `summary` es siempre un extracto fiel del
propio feed (recortado a ~320 caracteres), nunca una reescritura: el Skill corre server-side sin
acceso a un modelo de lenguaje, así que la única forma de no inventar es no generar texto nuevo.

### Fuentes — `src/app/lib/news/sources.js`

Lista curada y verificada a mano (cada feed se probó con una petición real antes de agregarlo):

| Fuente | Tipo | Alcance |
|---|---|---|
| INTA Informa | Organismo público (INTA) | Argentina |
| Chequeado | Medio periodístico reconocido | Argentina |
| Nature — Plant Sciences | Publicación científica | Mundo |
| ScienceDaily — Botany | Publicación científica | Mundo |

Un ítem solo se considera si además coincide con `RELEVANCE_KEYWORDS` (cannabis, cáñamo, cultivo,
marco regulatorio del sector, etc.) — evita que noticias sin relación con el universo editorial
del Atlas entren solo por venir de una fuente confiable.

### Parser — `src/app/lib/news/rssParser.js`

Parser mínimo de RSS 2.0 / Atom por expresiones regulares, sin dependencias nuevas (no se agregó
`rss-parser` ni `xml2js` — el formato es acotado y no hace falta un parser XML general).

## Ejecutor — `src/app/lib/news/executor.js`

Capa separada del Skill, la única que conoce Supabase:

```
cron/manual → ejecutor → Skill → deduplicación contra Supabase → insert → resumen de ejecución
```

```js
runNewsWeeklySync({ dryRun = false } = {})
```

Deduplicación de dos niveles, contra las noticias descubiertas en los últimos 60 días:
1. **URL exacta** — comparación de `source_url` normalizada, respaldada por la constraint
   `UNIQUE` de la columna en la base (última defensa ante una corrida concurrente).
2. **Similaridad de título** — superposición de palabras (Jaccard sobre tokens de 3+ letras,
   umbral 0.6): cubre la misma noticia cubierta por dos fuentes distintas con URLs diferentes.

Nunca hace `UPDATE` ni `DELETE` sobre noticias existentes — solo `INSERT` de lo nuevo. El estado
(`published`/`archived`/`hidden`) se gestiona aparte, desde el panel admin.

`dryRun: true` corre la misma lógica de principio a fin (incluida la lectura real de los feeds)
pero no escribe nada en la base — devuelve qué se habría agregado, para poder probarlo sin
publicar contenido real. **Verificado en este desarrollo**: la sincronización real nunca se
ejecutó durante la implementación, solo `dryRun`.

Devuelve `{ ok, dryRun, sourcesChecked, found, added, skippedDuplicateUrl, skippedSimilarTitle,
errors, addedItems, durationMs }`.

## Endpoint — `POST/GET /api/news/weekly-sync`

`src/app/api/news/weekly-sync/route.js`. Solo dispara el ejecutor — sin lógica editorial propia.
Protegido con `CRON_SECRET` (mismo patrón exacto que `/api/notifications/scheduled-run`, la única
protección de cron ya existente en el proyecto): sin esa variable configurada, responde 401
siempre, nunca hay modo abierto por defecto.

```bash
curl -X POST "https://<sitio>/api/news/weekly-sync?dryRun=true" \
  -H "Authorization: Bearer $CRON_SECRET"
```

`?dryRun=true` para probar sin publicar nada real.

## Cron — `vercel.json`

```json
{ "path": "/api/news/weekly-sync", "schedule": "0 13 * * 1" }
```

Todos los lunes a las 13:00 UTC, agregado al array `crons` ya existente **sin modificar** el cron
diario de notificaciones que ya estaba configurado.

## Modelo de datos — Supabase `public.news_items`

Aplicado directamente contra el proyecto Supabase del Atlas (mismo criterio que el resto de las
tablas del proyecto — no hay carpeta de migraciones versionada en el repo, ver `TODO.md`/
`MASTER_PACKAGE/40_PHASE_10B_ACCOUNT_AUTH.md`).

| Columna | Tipo | Notas |
|---|---|---|
| `id` | uuid PK | `gen_random_uuid()` |
| `title` | text | |
| `summary` | text | |
| `source_name` | text | |
| `source_url` | text | **UNIQUE** — deduplicación primaria |
| `published_at` | timestamptz | fecha real de la fuente |
| `discovered_at` | timestamptz | default `now()` |
| `country_scope` | text | CHECK `'argentina' \| 'mundo'` |
| `category` | text | ver `NEWS_CATEGORIES` en `sources.js` |
| `tags` | text[] | subconjunto de `CONTROLLED_TAGS` |
| `image_url` | text | opcional, `null` hasta que exista una fuente de imágenes verificada |
| `status` | text | CHECK `'published' \| 'archived' \| 'hidden'`, default `'published'` |
| `created_at` / `updated_at` | timestamptz | |

RLS habilitado. Política pública `news_items_select_public`: `status IN ('published',
'archived')` — el historial público muestra todo lo alguna vez publicado; solo `hidden` queda
fuera de lo que puede leer una persona anónima (es el estado que usa el panel admin para retirar
una noticia sin borrar la fila). El panel admin lee con el cliente `service_role`
(`getSupabaseAdminClient()`), que salta RLS y ve los tres estados.

**Nunca se borra una fila** en ninguna corrida del ejecutor — la tabla solo crece.

## Widget público — `/atlas`

`src/app/components/NewsWidget.js`, montado en `src/app/atlas/page.js` como una sección
adicional (`<NewsWidget />`) entre la grilla de categorías (`CategoryShowcase`, sin tocar) y la
tarjeta de Comunidad. Lee directo de Supabase con la clave anon (`getServerSupabaseClient()`) —
el control de acceso real sigue siendo RLS, no el código de la página. Muestra las 6 noticias
`published` más recientes y un enlace al historial completo.

## Historial — `/noticias`

`src/app/noticias/page.js`. Consulta Supabase directamente en cada visita (nunca depende del
último resultado del ejecutor). Filtros por querystring: `?scope=argentina|mundo`,
`?category=...`, `?sort=asc|desc`, `?page=N` (20 por página). Muestra `published` y `archived`;
`hidden` queda excluido por RLS.

## Admin — `/admin/noticias`

`src/app/admin/noticias/page.js` + `actions.js`, agregado a `NAV_SECTIONS` en
`admin/layout.js` (sección "Contenido"). Reutiliza el panel admin existente — mismo
`admin.module.css`, mismo patrón de Server Actions con `requireRole('admin')` +
`getSupabaseAdminClient()` + `logAdminAction()` que `admin/newsletter`. Permite: listar (últimas
200), archivar, ocultar, republicar, editar título/resumen y ver la fuente original.

## Variables de entorno

Ninguna nueva. Reutiliza exactamente las que ya existían:

- `SUPABASE_SERVICE_ROLE_KEY` — ya usada por el resto del panel admin (`lib/supabase/admin.js`).
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — lectura pública del widget e
  historial.
- `CRON_SECRET` — ya protegía `/api/notifications/scheduled-run`; ahora protege también
  `/api/news/weekly-sync` con el mismo valor.

## Verificación realizada en esta implementación

- `npm run build` limpio, rutas nuevas registradas (`/noticias`, `/admin/noticias`,
  `/api/news/weekly-sync`).
- Endpoint sin `Authorization` → 401.
- Endpoint con `dryRun=true` contra las fuentes reales → encontró 3 noticias relevantes reales de
  INTA Informa, 0 falsos positivos de las otras 3 fuentes en esa corrida — **sin escribir nada en
  la base** (confirmado con `SELECT count(*)` antes y después).
- Deduplicación probada con 2 filas de prueba insertadas a mano (no a través del Skill): una
  duplicaba una URL exacta, otra un título casi idéntico con URL distinta — el ejecutor las
  detectó correctamente (`skippedDuplicateUrl: 1`, `skippedSimilarTitle: 1`) y solo agregó la
  tercera noticia, genuinamente nueva.
- Widget en `/atlas` e historial en `/noticias` (con filtros de país/categoría) verificados
  renderizando esas mismas filas de prueba.
- `/admin/noticias` sin sesión redirige (no rompe) — mismo comportamiento que el resto de
  `/admin/*`.
- Filas de prueba eliminadas al terminar: la tabla queda en 0 filas, sin ninguna noticia real
  publicada todavía — la primera sincronización real queda para cuando se dispare el cron o se
  invoque el endpoint a mano en producción/staging.
