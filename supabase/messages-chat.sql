-- WellMax client-to-admin chat
-- Run this entire file in Supabase Dashboard > SQL Editor.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 4000),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists messages_client_created_idx
  on public.messages (client_id, created_at);
create index if not exists messages_unread_idx
  on public.messages (client_id, read_at)
  where read_at is null;

alter table public.messages enable row level security;

create or replace function public.is_wellmax_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

grant execute on function public.is_wellmax_admin() to authenticated;

drop policy if exists "clients read own messages" on public.messages;
create policy "clients read own messages"
on public.messages for select
to authenticated
using (
  public.is_wellmax_admin()
  or exists (
    select 1 from public.client_members cm
    where cm.client_id = messages.client_id
      and cm.user_id = auth.uid()
  )
);

drop policy if exists "members send own client messages" on public.messages;
create policy "members send own client messages"
on public.messages for insert
to authenticated
with check (
  sender_id = auth.uid()
  and (
    public.is_wellmax_admin()
    or exists (
      select 1 from public.client_members cm
      where cm.client_id = messages.client_id
        and cm.user_id = auth.uid()
    )
  )
);

drop policy if exists "admin updates message read state" on public.messages;
create policy "admin updates message read state"
on public.messages for update
to authenticated
using (public.is_wellmax_admin())
with check (public.is_wellmax_admin());

-- Required for live updates. Safe to run more than once.
do $$
begin
  alter publication supabase_realtime add table public.messages;
exception
  when duplicate_object then null;
end $$;
