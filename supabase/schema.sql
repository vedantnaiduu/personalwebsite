-- Run this file in the Supabase SQL editor to create the public guestbook table, index, and RLS policies.

create table public.guestbook (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 40),
  message     text not null check (char_length(message) between 1 and 500),
  -- small drawing stored inline as an image data URL; cap size AND require the data-URL format
  -- so a row can never hold an external/attacker-controlled image URL that viewers would load.
  drawing     text check (
    drawing is null
    or (char_length(drawing) <= 200000 and drawing ~ '^data:image/(png|jpeg|webp);base64,')
  )
);

-- index for the wall feed
create index guestbook_created_at_idx on public.guestbook (created_at desc);

alter table public.guestbook enable row level security;

-- Anyone can read the wall
create policy "guestbook_select_public"
  on public.guestbook for select
  to anon
  using (true);

-- Anyone can insert, but only rows that pass the column CHECK constraints.
-- The WITH CHECK here re-validates so anon can't write oversized/empty rows.
create policy "guestbook_insert_anon"
  on public.guestbook for insert
  to anon
  with check (
    char_length(name) between 1 and 40
    and char_length(message) between 1 and 500
    and (
      drawing is null
      or (char_length(drawing) <= 200000 and drawing ~ '^data:image/(png|jpeg|webp);base64,')
    )
  );

-- NO update/delete policies for anon => anon cannot edit or delete entries.
