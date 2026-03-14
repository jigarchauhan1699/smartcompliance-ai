create table if not exists public.dashboard_metrics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  note text not null,
  sort_order integer not null default 0
);

create table if not exists public.compliance_cases (
  id uuid primary key default gen_random_uuid(),
  case_code text not null unique,
  customer_name text not null,
  institution text not null,
  risk_level text not null check (risk_level in ('high', 'medium', 'low')),
  status text not null,
  trigger_reason text not null,
  queue_name text not null,
  created_at timestamptz not null default now()
);
