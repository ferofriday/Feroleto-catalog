-- Feroleto Catalog: categories, crop_types, varieties, client_submissions, submission_selections

-- Categories (Vegetables, Cut Flowers, Herbs)
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0
);

-- Crop types (e.g. Cherry Tomatoes, Dahlias)
create table if not exists public.crop_types (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  description text,
  season text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_crop_types_category on public.crop_types(category_id);

-- Varieties under each crop type
create table if not exists public.varieties (
  id uuid primary key default gen_random_uuid(),
  crop_type_id uuid not null references public.crop_types(id) on delete cascade,
  name text not null,
  type_subtype text,
  days_to_maturity text,
  season text,
  note text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_varieties_crop_type on public.varieties(crop_type_id);

-- Client submissions (one per client form submit)
create table if not exists public.client_submissions (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  status text check (status in ('new', 'planned', 'planted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Selections: either whole crop type (variety_id null) or specific variety
create table if not exists public.submission_selections (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.client_submissions(id) on delete cascade,
  crop_type_id uuid not null references public.crop_types(id) on delete cascade,
  variety_id uuid references public.varieties(id) on delete cascade,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists idx_submission_selections_submission on public.submission_selections(submission_id);
create index if not exists idx_submission_selections_crop_type on public.submission_selections(crop_type_id);

-- RLS: allow public read for categories, crop_types, varieties; allow insert for client_submissions and submission_selections
alter table public.categories enable row level security;
alter table public.crop_types enable row level security;
alter table public.varieties enable row level security;
alter table public.client_submissions enable row level security;
alter table public.submission_selections enable row level security;

create policy "Public read categories" on public.categories for select using (true);
create policy "Public read crop_types" on public.crop_types for select using (true);
create policy "Public read varieties" on public.varieties for select using (true);
create policy "Public insert client_submissions" on public.client_submissions for insert with check (true);
create policy "Public insert submission_selections" on public.submission_selections for insert with check (true);

-- Admin: use service role or a dedicated admin policy; for simplicity we use service role for admin routes
-- No policy for update/delete on submissions from anon; admin will use service role key

-- Storage bucket for crop type images (create in Supabase dashboard or via API)
-- insert into storage.buckets (id, name, public) values ('crop-images', 'crop-images', true);
