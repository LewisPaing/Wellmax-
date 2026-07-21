-- WellMax portal: public registration approval and internal service requests
alter table public.profiles add column if not exists company_name text;
alter table public.profiles add column if not exists approved boolean not null default false;

update public.profiles
set approved = true
where role in ('admin','staff')
   or exists (select 1 from public.client_members cm where cm.user_id = profiles.id);

create or replace function public.create_profile_for_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, company_name, approved)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1)),
    nullif(new.raw_user_meta_data ->> 'company_name', ''),
    false
  );
  return new;
end;
$$;

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 120),
  service_type text not null,
  description text not null check (char_length(description) between 3 and 5000),
  desired_due_at date,
  status text not null default 'new' check (status in ('new','reviewing','accepted','in_progress','closed')),
  staff_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.service_requests enable row level security;
drop policy if exists "requests read permitted" on public.service_requests;
drop policy if exists "clients create requests" on public.service_requests;
drop policy if exists "staff manage requests" on public.service_requests;

create policy "requests read permitted" on public.service_requests
for select using (public.can_access_client(client_id));

create policy "clients create requests" on public.service_requests
for insert with check (
  created_by = auth.uid()
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.approved)
  and public.can_access_client(client_id)
);

create policy "staff manage requests" on public.service_requests
for all using (public.is_staff()) with check (public.is_staff());
