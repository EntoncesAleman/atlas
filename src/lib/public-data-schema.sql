-- Minimal Postgres-compatible public schema contract for atlas-del-cultivo-argentino
-- Based on MASTER_PACKAGE/07_DATABASE.md and MASTER_PACKAGE/04_CLIMATE.md.

CREATE SCHEMA IF NOT EXISTS atlas_public;

CREATE TABLE IF NOT EXISTS atlas_public.provinces (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  region_macro VARCHAR(30) NOT NULL,
  geometry_ref VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS atlas_public.zones (
  id UUID PRIMARY KEY,
  province_id UUID NOT NULL REFERENCES atlas_public.provinces(id),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  climate_summary TEXT,
  soil_summary TEXT,
  water_summary TEXT,
  altitude_band VARCHAR(50),
  geometry_ref VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS atlas_public.climate_data (
  id UUID PRIMARY KEY,
  zone_id UUID NULL REFERENCES atlas_public.zones(id),
  province_id UUID NULL REFERENCES atlas_public.provinces(id),
  source VARCHAR(50) NOT NULL DEFAULT 'open-meteo',
  metric VARCHAR(30) NOT NULL,
  period VARCHAR(50) NOT NULL,
  value NUMERIC(8,3) NOT NULL,
  unit VARCHAR(30) NOT NULL,
  source_registry_ref VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK ((zone_id IS NOT NULL) OR (province_id IS NOT NULL))
);

CREATE TABLE IF NOT EXISTS atlas_public.articles (
  id UUID PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  slug VARCHAR(180) UNIQUE NOT NULL,
  category_id UUID,
  type VARCHAR(30) NOT NULL DEFAULT 'regional',
  body TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  cover_media_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS atlas_public.categories (
  id UUID PRIMARY KEY,
  name VARCHAR(80) UNIQUE NOT NULL,
  slug VARCHAR(80) UNIQUE NOT NULL,
  parent_id UUID NULL REFERENCES atlas_public.categories(id),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS atlas_public.tags (
  id UUID PRIMARY KEY,
  name VARCHAR(80) UNIQUE NOT NULL,
  slug VARCHAR(80) UNIQUE NOT NULL,
  type VARCHAR(30) NOT NULL DEFAULT 'free'
);

CREATE TABLE IF NOT EXISTS atlas_public.article_tags (
  article_id UUID NOT NULL REFERENCES atlas_public.articles(id),
  tag_id UUID NOT NULL REFERENCES atlas_public.tags(id),
  PRIMARY KEY (article_id, tag_id)
);

CREATE TABLE IF NOT EXISTS atlas_public.media (
  id UUID PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  storage_ref VARCHAR(255) NOT NULL,
  alt_text VARCHAR(180),
  type VARCHAR(30) NOT NULL DEFAULT 'photo',
  category_ref VARCHAR(80),
  license VARCHAR(120),
  source VARCHAR(120),
  credited_author VARCHAR(120),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS atlas_public.article_media (
  article_id UUID NOT NULL REFERENCES atlas_public.articles(id),
  media_id UUID NOT NULL REFERENCES atlas_public.media(id),
  role VARCHAR(30) NOT NULL DEFAULT 'primary',
  PRIMARY KEY (article_id, media_id)
);

CREATE TABLE IF NOT EXISTS atlas_public.seasons_calendar_entries (
  id UUID PRIMARY KEY,
  province_id UUID NULL REFERENCES atlas_public.provinces(id),
  zone_id UUID NULL REFERENCES atlas_public.zones(id),
  title VARCHAR(120) NOT NULL,
  description TEXT,
  type VARCHAR(40) NOT NULL,
  start_window DATE,
  end_window DATE,
  indoor_outdoor VARCHAR(30),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK ((province_id IS NOT NULL) OR (zone_id IS NOT NULL))
);

CREATE INDEX IF NOT EXISTS idx_zones_province_id ON atlas_public.zones(province_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON atlas_public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON atlas_public.articles(category_id);
CREATE INDEX IF NOT EXISTS idx_climate_zone_metric_period ON atlas_public.climate_data(zone_id, metric, period);
CREATE INDEX IF NOT EXISTS idx_climate_province_metric_period ON atlas_public.climate_data(province_id, metric, period);
