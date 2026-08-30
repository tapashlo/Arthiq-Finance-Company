-- Saved model scenarios.
--
-- One table, one policy shape: a row belongs to exactly one account and is
-- visible to nobody else. Row-level security is enabled before any policy is
-- written, so the table is closed by default rather than open until secured.

create table if not exists public.scenarios (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null check (char_length(trim(name)) between 1 and 80),
  -- The assumption set, exactly as the model sanitises it. Stored as jsonb so
  -- adding an assumption later does not need a migration; the client clamps
  -- whatever it reads back through sanitise() before projecting.
  assumptions jsonb not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.scenarios enable row level security;

-- Both USING and WITH CHECK: the first stops you reading or deleting someone
-- else's row, the second stops you writing a row owned by someone else.
drop policy if exists "scenarios are private to their owner" on public.scenarios;
create policy "scenarios are private to their owner"
  on public.scenarios
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists scenarios_user_created_idx
  on public.scenarios (user_id, created_at desc);

-- A cap, so one account cannot fill the table.
create or replace function public.enforce_scenario_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.scenarios where user_id = new.user_id) >= 100 then
    raise exception 'Scenario limit reached. Delete one before saving another.';
  end if;
  return new;
end;
$$;

drop trigger if exists scenarios_limit on public.scenarios;
create trigger scenarios_limit
  before insert on public.scenarios
  for each row execute function public.enforce_scenario_limit();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists scenarios_touch on public.scenarios;
create trigger scenarios_touch
  before update on public.scenarios
  for each row execute function public.touch_updated_at();
