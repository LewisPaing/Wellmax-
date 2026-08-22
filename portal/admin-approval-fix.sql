-- Run once in Supabase SQL Editor.
-- Allows only portal admins to approve or suspend non-admin client profiles.

create or replace function public.set_profile_approval(
  target_profile uuid,
  new_approved boolean
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
      and approved = true
  ) then
    raise exception 'Only an approved WellMax admin can manage client access';
  end if;

  if target_profile = auth.uid() then
    raise exception 'Administrators cannot change their own access here';
  end if;

  update public.profiles
  set approved = new_approved
  where id = target_profile
    and role <> 'admin';

  if not found then
    raise exception 'Client profile was not found';
  end if;

  return new_approved;
end;
$$;

revoke all on function public.set_profile_approval(uuid, boolean) from public;
grant execute on function public.set_profile_approval(uuid, boolean) to authenticated;
