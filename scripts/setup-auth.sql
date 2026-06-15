-- 1. Create the profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  family_context text,
  dietary_preferences text[] default '{}'::text[],
  brand_preferences jsonb default '{}'::jsonb,
  addresses jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Set up RLS (Row Level Security)
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile" 
on public.profiles for select 
using ( auth.uid() = id );

-- Users can update their own profile
create policy "Users can update own profile" 
on public.profiles for update 
using ( auth.uid() = id );

-- 3. Create a trigger to automatically insert a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
