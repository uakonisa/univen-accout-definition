-- 📊 Supabase SQL Schema for University of Venda Account Definition System (Updated with full account types)

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Table to store account metadata
create table if not exists account_definitions (
  id uuid primary key default uuid_generate_v4(),
  account_code varchar not null,
  account_name varchar not null,
  description text,
  type varchar check (type in ('INCOME', 'EXPENSE', 'ASSET', 'LIABILITY', 'EQUITY')) not null,
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  created_by uuid references auth.users(id) on delete set null
);

-- Table to store document metadata linked to accounts
create table if not exists account_documents (
  id uuid primary key default uuid_generate_v4(),
  account_id uuid references account_definitions(id) on delete cascade,
  file_name varchar,
  file_url text not null,
  file_type varchar,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()),
  uploaded_by uuid references auth.users(id) on delete set null
);

-- Enable Row Level Security
alter table account_definitions enable row level security;
alter table account_documents enable row level security;

-- Policies for authenticated users
create policy "Allow user to view their account records"
  on account_definitions for select
  using (true);

create policy "Allow user to insert/update/delete their own account records"
  on account_definitions for all
  using (auth.uid() = created_by);

create policy "Allow user to view linked documents"
  on account_documents for select
  using (true);

create policy "Allow user to insert/update/delete own documents"
  on account_documents for all
  using (auth.uid() = uploaded_by);

-- Supabase Storage (manual setup via Dashboard or CLI)
-- Bucket name: documents
-- Access: Public (recommended for direct preview)
-- File path format: account-documents/{account_id}/{timestamp}.{ext}

-- Auth Setup:
-- Supabase Auth (email/password or magic link)
-- RLS uses auth.uid() for data ownership and access
