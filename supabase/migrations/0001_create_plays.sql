-- Same read-only-from-this-repo pattern as `posts`: Ryoka OS writes to
-- this table directly, equity.tw (and any other target_site) only reads
-- via the anon key, scoped by RLS to is_open rows.
create table plays (
  id            uuid primary key default gen_random_uuid(),
  target_site   text not null,
  label         text not null,          -- "Expired domain flip"
  category      text,                   -- "Domain flip", shown in the featured row
  note          text,                   -- the quote/description, only used when featured
  amount_cents  integer,                -- signed: negative = loss, positive = gain, null = not started
  status        text not null default 'flat',  -- 'up' | 'down' | 'flat'
  is_featured   boolean not null default false,
  is_open       boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index plays_site_idx on plays (target_site, is_open, created_at desc);

alter table plays enable row level security;
create policy "public reads open plays"
  on plays for select
  using (is_open = true);
