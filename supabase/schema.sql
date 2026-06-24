-- VEYA waitlist table
-- Run this in your Supabase project: Dashboard → SQL Editor → New query → paste → Run

create table if not exists waitlist (
  id          uuid        primary key default gen_random_uuid(),
  email       text        not null,
  created_at  timestamptz not null default now(),

  constraint waitlist_email_unique unique (email),
  constraint waitlist_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

-- Lock down direct access; only the service-role key (server-side) can write
alter table waitlist enable row level security;

-- No public SELECT or INSERT — the API route uses the service role key which bypasses RLS
-- If you ever want to read from the client side, add a policy here.

-- Useful index for deduplication lookups
create index if not exists waitlist_email_idx on waitlist (lower(email));
