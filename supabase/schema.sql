-- ================================================
-- Nocodly AI — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ------------------------------------------------
-- profiles (extends auth.users)
-- ------------------------------------------------
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  full_name   text,
  avatar_url  text,
  company     text,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------
-- subscriptions
-- ------------------------------------------------
create table if not exists public.subscriptions (
  id                        uuid default uuid_generate_v4() primary key,
  user_id                   uuid references public.profiles(id) on delete cascade,
  plan                      text check (plan in ('starter', 'pro')) default 'starter',
  status                    text check (status in ('active', 'canceled', 'past_due', 'trialing')) default 'active',
  stripe_subscription_id    text unique,
  stripe_customer_id        text unique,
  current_period_end        timestamptz,
  created_at                timestamptz default now() not null,
  updated_at                timestamptz default now() not null
);

-- ------------------------------------------------
-- generations
-- ------------------------------------------------
create table if not exists public.generations (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references public.profiles(id) on delete cascade,
  prompt      text not null,
  output      text not null,
  model       text default 'gpt-4o-mini',
  tokens_used integer default 0,
  created_at  timestamptz default now() not null
);

-- ------------------------------------------------
-- usage_tracking
-- ------------------------------------------------
create table if not exists public.usage_tracking (
  id                    uuid default uuid_generate_v4() primary key,
  user_id               uuid references public.profiles(id) on delete cascade unique,
  total_generations     integer default 0,
  tokens_used           integer default 0,
  last_reset_at         timestamptz default now(),
  updated_at            timestamptz default now() not null
);

-- ------------------------------------------------
-- Row Level Security
-- ------------------------------------------------
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.generations enable row level security;
alter table public.usage_tracking enable row level security;

-- Profiles: users can only see/edit their own
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Subscriptions: users can view their own
create policy "Users can view own subscription" on public.subscriptions
  for select using (auth.uid() = user_id);

-- Generations: users can view/insert their own
create policy "Users can view own generations" on public.generations
  for select using (auth.uid() = user_id);
create policy "Users can insert own generations" on public.generations
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own generations" on public.generations
  for delete using (auth.uid() = user_id);

-- Usage: users can view their own
create policy "Users can view own usage" on public.usage_tracking
  for select using (auth.uid() = user_id);

-- ------------------------------------------------
-- Indexes for performance
-- ------------------------------------------------
create index if not exists idx_generations_user_id on public.generations(user_id);
create index if not exists idx_generations_created_at on public.generations(created_at desc);
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
