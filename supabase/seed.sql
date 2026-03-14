insert into public.dashboard_metrics (label, value, note, sort_order)
values
  ('Open alerts', '42', 'Across onboarding and transaction monitoring', 1),
  ('Auto-cleared', '68%', 'Rules and AI explanations resolved low-risk noise', 2),
  ('SAR drafts', '6', 'Ready for analyst review', 3),
  ('P99 review SLA', '11m', 'Measured on seeded operational data', 4)
on conflict do nothing;

insert into public.compliance_cases (case_code, customer_name, institution, risk_level, status, trigger_reason, queue_name)
values
  ('CASE-1042', 'Fatima Rahman', 'Northstar Fintech', 'high', 'EDD review', 'PEP hit and cross-border transfer spike', 'Enhanced Due Diligence'),
  ('CASE-1041', 'Omar Haddad', 'Vertex Payments', 'high', 'Escalated', 'EU sanctions name match', 'Sanctions'),
  ('CASE-1038', 'Aanya Shah', 'LendMint', 'medium', 'Analyst review', 'Volume exceeds declared income profile', 'Onboarding'),
  ('CASE-1032', 'Miguel Torres', 'Pinnacle Bank', 'low', 'Auto-cleared', 'Duplicate false positive watchlist alias', 'Resolved')
on conflict do nothing;
