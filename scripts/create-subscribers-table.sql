-- Create subscribers table for email list management
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text check (source in ('site','kickstarter','steam','twitter','discord','presskit','demo_page','quest_modal','other')) default 'site',
  tags text[] default '{}',
  verified boolean default false,
  verify_token uuid default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create index for faster email lookups
create index if not exists idx_subscribers_email on subscribers(email);
create index if not exists idx_subscribers_verified on subscribers(verified);
create index if not exists idx_subscribers_source on subscribers(source);

-- Enable Row Level Security
alter table subscribers enable row level security;

-- Create policy for service role access
create policy "Service role can manage subscribers" on subscribers
  for all using (auth.role() = 'service_role');

-- Create updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_subscribers_updated_at
  before update on subscribers
  for each row
  execute function update_updated_at_column();
