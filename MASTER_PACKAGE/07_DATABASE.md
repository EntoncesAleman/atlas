# 07 — Modelo de Datos (conceptual)

Este documento define entidades y relaciones a nivel conceptual. No es DDL final — el motor de base de datos concreto se define en [[13_STACK]].

## Entidades públicas (contenido editorial — no requieren cuenta para leer)

- **provinces** — id, name, slug, region_macro (NEA/NOA/Cuyo/Pampeana/Patagonia/CABA), geometry_ref.
- **zones** — id, province_id, name, slug, description, climate_summary, soil_summary, water_summary, altitude_band, geometry_ref. Ver estrategia de subdivisión en [[03_GEO]].
- **climate_data** — id, zone_id (o province_id si no hay dato a nivel zona), source, metric (temp_avg, precip_avg, humidity_avg, frost_risk, hail_risk, etc.), period, value, unit, source_registry_ref (FK lógica a [[19_SOURCE_REGISTRY]]).
- **articles** — id, title, slug, category_id, type (general/regional/mixed), body, status, published_at, reviewed_at, cover_media_id.
- **categories** — id, name, slug, parent_id (para subcategorías), order.
- **tags** — id, name, slug, type (free/controlled).
- **article_tags** — article_id, tag_id.
- **article_region_blocks** — id, article_id, zone_id o province_id, body (el bloque "En tu zona").
- **media** — id, url/storage_ref, alt_text, type (photo/illustration/diagram), category_ref, license, source, credited_author, created_at.
- **article_media** — article_id, media_id, role (primary/secondary).
- **seasons_calendar_entries** — id, province_id/zone_id (nullable = nacional), title, description, type (astronomical/climatic/botanical/agricultural/historical — ver 02_UX.md, sección Calendario), start_window, end_window, indoor_outdoor (nullable).

## Entidades de usuario (privadas — requieren cuenta)

- **users** — id, email, password_hash (o proveedor OAuth), created_at, email_verified_at, deleted_at (soft delete para permitir purga real diferida, ver [[10_PRIVACY]]).
- **profiles** — user_id (1:1 con users), display_name (opcional, no obligatorio), saved_province_id (nullable), saved_zone_id (nullable).
- **notification_preferences** — user_id, weather_alerts_enabled, newsletter_enabled, alert_types (frost/hail/storm/wind — array o tabla hija).
- **newsletter_subscriptions** — id, user_id (nullable — puede suscribirse sin cuenta completa, solo email), email, confirmed_at (double opt-in), unsubscribed_at.
- **weather_alerts_log** — id, user_id, zone_id, alert_type, sent_at (auditoría de envíos, para poder explicar "por qué recibí esto" y para rate limiting).
- **favorites** — id, user_id, article_id, created_at.
- **seasons** — id, user_id, name (ej. "Temporada 2025/26"), start_date, end_date (nullable, en curso).
- **cultivations** — id, season_id, user_id (denormalizado para queries de permisos directas), name, location_zone_id (nullable, puede diferir del guardado en profile), setting (indoor/outdoor/greenhouse), medium (soil/pot/etc — como texto libre o enum abierto, sin catálogo comercial), status (active/finished/abandoned).
- **plants** — id, cultivation_id, label (ej. "Planta 1"), strain_note (texto libre opcional, el usuario puede anotar variedad sin que el sistema la valide contra catálogo comercial).
- **cultivation_events** — id, cultivation_id, plant_id (nullable, puede ser evento a nivel cultivo), event_type (siembra/trasplante/cambio_fase/riego/poda/otro), event_date, note.
- **cultivation_notes** — id, cultivation_id, plant_id (nullable), body, created_at.
- **cultivation_photos** — id, cultivation_id, plant_id (nullable), media_ref (storage privado, distinto del bucket de `media` público), created_at, note.

## Relaciones clave
```
users 1—1 profiles
users 1—N seasons
seasons 1—N cultivations
cultivations 1—N plants
cultivations/plants 1—N cultivation_events
cultivations/plants 1—N cultivation_notes
cultivations/plants 1—N cultivation_photos
users 1—N favorites —N—1 articles
users 1—1 notification_preferences
provinces 1—N zones
zones/provinces 1—N climate_data
zones/provinces 1—N article_region_blocks
articles N—N tags, N—N media, 1—N article_region_blocks
```

## Índices y permisos (principios, no DDL)
- Todo acceso a `cultivations`, `plants`, `cultivation_events`, `cultivation_notes`, `cultivation_photos`, `favorites`, `notification_preferences` debe filtrar **siempre** por `user_id` propio del solicitante a nivel de política de datos (no solo a nivel de aplicación) — ver [[09_SECURITY]], riesgo IDOR.
- Índices obligatorios: `zones.province_id`, `articles.slug` (único), `articles.category_id`, `cultivations.user_id`, `cultivation_events.cultivation_id`, `climate_data.(zone_id, metric, period)`.
- Datos públicos (provinces, zones, articles, categories, tags, media, climate_data, seasons_calendar_entries) son de solo-lectura para visitantes anónimos vía API/consulta; escritura restringida a rol editorial interno (no hay CMS público ni contribución de usuarios en v1 — **ASSUMPTION**, revisar si se quiere comunidad más adelante, fuera de alcance de v1).
- Datos privados de usuario: aislamiento estricto por `user_id`, sin excepción, sin "modo admin" que los liste salvo soporte con auditoría (ver [[09_SECURITY]]).

## Campos explícitamente NO incluidos (por diseño de privacidad)
- Sin campo de dirección exacta ni coordenadas GPS precisas en ninguna entidad de usuario.
- Sin campo de nombre real obligatorio (display_name es opcional).
- Sin campo de teléfono (no se usa SMS en v1).
- Sin tracking de IP persistente asociado a `users` más allá de lo estrictamente necesario para seguridad (rate limiting, detección de abuso) — ver [[09_SECURITY]] y [[10_PRIVACY]].
