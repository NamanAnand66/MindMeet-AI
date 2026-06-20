create extension if not exists vector;
create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  title text not null default 'Untitled meeting',
  source text not null check (source in ('upload', 'live')),
  status text not null check (status in ('processing', 'live', 'completed', 'failed')),
  storage_path text,
  duration_seconds numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transcripts (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  provider text not null,
  text text not null,
  segments jsonb not null default '[]'::jsonb,
  raw_response jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.summaries (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  content jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.action_items (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  task text not null,
  owner text not null default 'Unassigned',
  deadline text not null default 'Not mentioned',
  priority text not null default 'Medium' check (priority in ('High', 'Medium', 'Low')),
  status text not null default 'Pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.analytics (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  speaking_time_by_speaker jsonb not null default '{}'::jsonb,
  recurring_topics text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.transcript_chunks (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  embedding vector(1536) not null,
  created_at timestamptz not null default now()
);

create index if not exists transcript_chunks_embedding_idx
on public.transcript_chunks using ivfflat (embedding vector_cosine_ops)
with (li
$$;
