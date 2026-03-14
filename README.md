# SmartCompliance AI

SmartCompliance AI is an AML/KYC SaaS demo built for the AI Mahakurukshetra vibe-coding hackathon.

It now matches the event’s required stack:

- Next.js App Router
- Supabase integration hooks for auth and database
- Seed/demo data for a non-empty first visit
- Vercel-ready structure at the repository root

## Product summary

SmartCompliance AI helps compliance teams review onboarding risk, sanctions/PEP alerts, and investigation queues from one command center.

Alternative to: ComplyAdvantage-style AML operations tooling.

## Local run

1. Install dependencies:

```bash
npm install
```

2. Add environment variables:

```bash
cp .env.example .env.local
```

Fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase setup

Run the SQL files in your Supabase SQL editor in this order:

1. [supabase/schema.sql](D:\SmartComplianceAI\supabase\schema.sql)
2. [supabase/seed.sql](D:\SmartComplianceAI\supabase\seed.sql)

Until env vars are configured, the app falls back to built-in demo content so judges do not see an empty product.

## Key routes

- `/` landing page
- `/dashboard` seeded compliance operations console
- `/auth` Supabase auth screen

## Deployment

Deploy the repo to Vercel and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Legacy backend

The earlier FastAPI prototype was moved into [legacy-backend](D:\SmartComplianceAI\legacy-backend) for reference. It is no longer the primary hackathon app.
