-- WellMax Client Portal — Supabase foundation
-- Run this once in the Supabase SQL editor.

create extension if not exists pgcrypto;

create type public.portal_role as enum ('admin', 'staff', 'client');
create type public.project_status as enum ('planned', 'active', 'review', 'approved', 'completed', 'paused');
create type public.approval_status as enum ('pending', 'approved', 'changes_requested');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.portal_role not null default 'client',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.client_members (
  client_id uuid not null references public.clients(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  primary key (client_id, user_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  title text not null,
  description text,
  status public.project_status not null default 'planned',
  progress smallint not null default 0 check (progress between 0 and 100),
  due_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  storage_path text not null unique,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  body text not null check (char_length(body) between 1 and 5000),
  created_at timestamptz not null default now()
);

create table public.approvals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  file_id uuid references public.project_files(id) on delete set null,
  title text not null,
  status public.approval_status not null default 'pending',
  requested_by uuid references public.profiles(id),
  decided_by uuid references public.profiles(id),
  decision_note text,
  decided_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.create_profile_for_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger create_profile_after_signup
after insert on auth.users for each row execute function public.create_profile_for_new_user();

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'staff')); $$;

create or replace function public.can_access_client(target_client uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select public.is_staff() or exists (select 1 from public.client_members where client_id = target_client and user_id = auth.uid()); $$;

create or replace function public.protect_profile_privileges()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_staff() then
    raise exception 'Only WellMax staff can change portal roles';
  end if;
  return new;
end;
$$;

create trigger protect_profile_privileges_before_update
before update on public.profiles for each row execute function public.protect_profile_privileges();

create or replace function public.protect_approval_request()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if not public.is_staff() and (
    new.project_id is distinct from old.project_id or
    new.file_id is distinct from old.file_id or
    new.title is distinct from old.title or
    new.requested_by is distinct from old.requested_by or
    new.created_at is distinct from old.created_at
  ) then
    raise exception 'Clients may only record an approval decision';
  end if;
  return new;
end;
$$;

create trigger protect_approval_request_before_update
before update on public.approvals for each row execute function public.protect_approval_request();

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.client_members enable row level security;
alter table public.projects enable row level security;
alter table public.project_files enable row level security;
alter table public.comments enable row level security;
alter table public.approvals enable row level security;

create policy "profiles read self or staff" on public.profiles for select using (id = auth.uid() or public.is_staff());
create policy "profiles update self" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "clients read permitted" on public.clients for select using (public.can_access_client(id));
create policy "members read permitted" on public.client_members for select using (user_id = auth.uid() or public.is_staff());
create policy "projects read permitted" on public.projects for select using (public.can_access_client(client_id));
create policy "projects staff manage" on public.projects for all using (public.is_staff()) with check (public.is_staff());
create policy "files read permitted" on public.project_files for select using (exists (select 1 from public.projects p where p.id = project_id and public.can_access_client(p.client_id)));
create policy "files staff manage" on public.project_files for all using (public.is_staff()) with check (public.is_staff());
create policy "comments read permitted" on public.comments for select using (exists (select 1 from public.projects p where p.id = project_id and public.can_access_client(p.client_id)));
create policy "comments create permitted" on public.comments for insert with check (author_id = auth.uid() and exists (select 1 from public.projects p where p.id = project_id and public.can_access_client(p.client_id)));
create policy "comments update own" on public.comments for update using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy "approvals read permitted" on public.approvals for select using (exists (select 1 from public.projects p where p.id = project_id and public.can_access_client(p.client_id)));
create policy "approvals staff manage" on public.approvals for all using (public.is_staff()) with check (public.is_staff());
create policy "clients decide approvals" on public.approvals for update using (exists (select 1 from public.projects p where p.id = project_id and public.can_access_client(p.client_id))) with check (decided_by = auth.uid());

insert into storage.buckets (id, name, public) values ('client-files', 'client-files', false)
on conflict (id) do nothing;

create policy "authenticated portal file reads" on storage.objects for select to authenticated
using (bucket_id = 'client-files' and exists (
  select 1 from public.project_files f join public.projects p on p.id = f.project_id
  where f.storage_path = name and public.can_access_client(p.client_id)
));

create policy "staff portal file uploads" on storage.objects for insert to authenticated
with check (bucket_id = 'client-files' and public.is_staff());
