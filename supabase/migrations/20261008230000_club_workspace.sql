-- Espacio de clubes: ficha pública con revisión, contenidos propuestos (eventos, cursos,
-- novedades), equipo, seguidores, cuaderno colectivo y visitas.
-- Todas las tablas tienen RLS activado y casi ninguna policy: las lecturas y escrituras pasan por
-- el servidor (service_role) después de comprobar sesión y permisos. La única policy es la que
-- deja a cada persona ver sus propias membresías, para que el menú sepa si tiene un club.

create table public.club_profiles (
  club_id uuid primary key references auth.users(id) on delete cascade,
  slug text not null unique,
  published jsonb,
  draft jsonb,
  draft_status text not null default 'none' check (draft_status in ('none', 'pending', 'rejected')),
  review_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.club_submissions (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references auth.users(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  kind text not null check (kind in ('event', 'course', 'news')),
  payload jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'withdrawn')),
  review_note text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create index club_submissions_club_idx on public.club_submissions (club_id, created_at desc);
create index club_submissions_status_idx on public.club_submissions (status, kind);
create index club_submissions_author_idx on public.club_submissions (author_id);
create index club_submissions_reviewer_idx on public.club_submissions (reviewed_by);

create table public.club_members (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('editor', 'member')),
  status text not null default 'invited' check (status in ('invited', 'active')),
  created_at timestamptz not null default now(),
  unique (club_id, email)
);
create index club_members_user_idx on public.club_members (user_id);
create index club_members_email_idx on public.club_members (email);

create table public.club_follows (
  user_id uuid not null references auth.users(id) on delete cascade,
  club_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, club_id)
);
create index club_follows_club_idx on public.club_follows (club_id);

create table public.club_journal_entries (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references auth.users(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  author_name text,
  stage_id text,
  entry_date date not null,
  note text not null,
  created_at timestamptz not null default now()
);
create index club_journal_club_idx on public.club_journal_entries (club_id, entry_date desc);
create index club_journal_author_idx on public.club_journal_entries (author_id);

create table public.club_views (
  club_id uuid not null references auth.users(id) on delete cascade,
  target text not null,
  day date not null,
  views integer not null default 0,
  primary key (club_id, target, day)
);

alter table public.club_profiles enable row level security;
alter table public.club_submissions enable row level security;
alter table public.club_members enable row level security;
alter table public.club_follows enable row level security;
alter table public.club_journal_entries enable row level security;
alter table public.club_views enable row level security;

create policy club_members_select_own on public.club_members
  for select to authenticated using (user_id = (select auth.uid()));

create function public.increment_club_view(p_club uuid, p_target text)
returns void language sql security invoker set search_path = '' as $$
  insert into public.club_views (club_id, target, day, views)
  values (p_club, p_target, (now() at time zone 'America/Argentina/Buenos_Aires')::date, 1)
  on conflict (club_id, target, day) do update set views = public.club_views.views + 1;
$$;
revoke execute on function public.increment_club_view(uuid, text) from public, anon, authenticated;
grant execute on function public.increment_club_view(uuid, text) to service_role;

-- Fotos de la ficha. El bucket es público porque la ficha aprobada lo es; solo el servidor sube.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('club-media', 'club-media', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
