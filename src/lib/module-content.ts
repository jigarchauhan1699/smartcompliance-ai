export type Metric = {
  label: string;
  value: string;
  note: string;
};

export type DataRow = {
  title: string;
  secondary: string;
  risk: "high" | "medium" | "low";
  status: string;
  detail: string;
};

export type MiniCard = {
  title: string;
  value: string;
  note: string;
};

export type WorkflowItem = {
  title: string;
  meta: string;
  status: string;
};

export type ChartPoint = {
  label: string;
  value: number;
  secondary?: number;
};

export type ModuleContent = {
  title: string;
  subtitle: string;
  cta: string;
  metrics: Metric[];
  cards: MiniCard[];
  workflow: WorkflowItem[];
  rows: DataRow[];
  insight: string;
  chartTitle: string;
  chartSubtitle: string;
  chartVariant: "line" | "bar" | "gauge";
  chartData: ChartPoint[];
};

export const moduleContent: Record<string, ModuleContent> = {
  "customer-screening": {
    title: "Customer Screening",
    subtitle: "Review onboarding profiles, identity verification, sanctions hits, and analyst next steps in one view.",
    cta: "Run Screening",
    metrics: [
      { label: "Profiles checked", value: "184", note: "Since 09:00 today" },
      { label: "PEP matches", value: "7", note: "Requiring analyst sign-off" },
      { label: "Doc verification", value: "98.1%", note: "Auto-pass success rate" },
    ],
    cards: [
      { title: "ID verification", value: "94%", note: "OCR and liveness checks passed automatically" },
      { title: "Sanctions confidence", value: "0.92", note: "Average match quality across active alerts" },
      { title: "Manual escalations", value: "18", note: "Queued for enhanced due diligence" },
    ],
    workflow: [
      { title: "Collect identity evidence", meta: "Passport, selfie, proof of address", status: "Completed" },
      { title: "Run sanctions and PEP screening", meta: "OFAC, EU, PEP registry", status: "In progress" },
      { title: "Analyst final decision", meta: "Auto-approve or escalate", status: "Pending" },
    ],
    rows: [
      { title: "Fatima Rahman", secondary: "Passport verified", risk: "high", status: "EDD review", detail: "PEP result and media article overlap" },
      { title: "Aanya Shah", secondary: "Driver license verified", risk: "medium", status: "Pending", detail: "Income profile mismatch" },
      { title: "Miguel Torres", secondary: "National ID verified", risk: "low", status: "Cleared", detail: "No watchlist conflicts" },
    ],
    insight: "The screening page now balances identity detail with review actions, instead of forcing analysts to bounce between visual blocks.",
    chartTitle: "Screening confidence",
    chartSubtitle: "Hover to inspect pass rates per checkpoint",
    chartVariant: "bar",
    chartData: [
      { label: "OCR", value: 88 },
      { label: "Liveness", value: 94 },
      { label: "Face match", value: 91 },
      { label: "Sanctions", value: 86 },
      { label: "PEP", value: 78 },
      { label: "EDD", value: 63 },
    ],
  },
  "transaction-monitoring": {
    title: "Transaction Monitoring",
    subtitle: "Live surveillance for suspicious movement, repeated beneficiaries, and corridor anomalies.",
    cta: "Create Rule",
    metrics: [
      { label: "Transactions today", value: "1.2M", note: "Across 14 partner institutions" },
      { label: "Alerts triggered", value: "142", note: "After deduplication" },
      { label: "False positive rate", value: "31%", note: "Below baseline target" },
    ],
    cards: [
      { title: "High-risk geographies", value: "12", note: "Currently under enhanced scrutiny" },
      { title: "Velocity clusters", value: "9", note: "Burst activity patterns detected today" },
      { title: "Auto-grouped cases", value: "27", note: "Merged by shared account and corridor" },
    ],
    workflow: [
      { title: "Ingest streaming payments", meta: "API and queued batch inputs", status: "Completed" },
      { title: "Evaluate configurable rules", meta: "Threshold, velocity, geography", status: "Completed" },
      { title: "Route suspicious clusters", meta: "Case and analyst assignment", status: "In progress" },
    ],
    rows: [
      { title: "TRX-81291", secondary: "$245,000 from UAE", risk: "high", status: "Escalated", detail: "Velocity + high-risk corridor" },
      { title: "TRX-81272", secondary: "$18,450 from India", risk: "medium", status: "Monitoring", detail: "Repeated beneficiary pattern" },
      { title: "TRX-81254", secondary: "$1,840 from UK", risk: "low", status: "Closed", detail: "Expected merchant behavior" },
    ],
    insight: "This page now reads like a monitoring cockpit: chart first for pattern recognition, structured rows second for adjudication.",
    chartTitle: "Hourly alert intensity",
    chartSubtitle: "Hover to inspect where pressure is building",
    chartVariant: "line",
    chartData: [
      { label: "08", value: 22, secondary: 18 },
      { label: "10", value: 35, secondary: 21 },
      { label: "12", value: 52, secondary: 28 },
      { label: "14", value: 61, secondary: 31 },
      { label: "16", value: 46, secondary: 26 },
      { label: "18", value: 67, secondary: 34 },
      { label: "20", value: 40, secondary: 24 },
    ],
  },
  "risk-scoring": {
    title: "Risk Scoring",
    subtitle: "Explainable AI scores for entities and transactions with factor breakdowns that stand up to audit review.",
    cta: "Export Model View",
    metrics: [
      { label: "Average customer score", value: "7.2", note: "Updated every 15 minutes" },
      { label: "High-risk entities", value: "63", note: "Across all institutions" },
      { label: "Explainability coverage", value: "100%", note: "Every decision auditable" },
    ],
    cards: [
      { title: "Behavioral deviation", value: "41%", note: "Share of score driven by pattern shifts" },
      { title: "Geo contribution", value: "24%", note: "Weighted by corridor and sanctions exposure" },
      { title: "Network factor", value: "18%", note: "Related-party and beneficiary overlap" },
    ],
    workflow: [
      { title: "Score recalculation", meta: "Runs on new transactions and profile updates", status: "Completed" },
      { title: "Explainability packaging", meta: "Reason codes added to every score", status: "Completed" },
      { title: "Analyst override review", meta: "Exceptions routed for governance", status: "Pending" },
    ],
    rows: [
      { title: "Northstar Fintech", secondary: "Portfolio segment", risk: "high", status: "Watch closely", detail: "Geography + transfer velocity" },
      { title: "Vertex Payments", secondary: "Merchant cohort", risk: "medium", status: "Stable", detail: "Network relationship anomaly" },
      { title: "Pinnacle Bank", secondary: "Retail book", risk: "low", status: "Healthy", detail: "Normal transaction distribution" },
    ],
    insight: "Risk scoring now has clearer information hierarchy: score story first, factor breakdown second, evidence rows third.",
    chartTitle: "Portfolio risk distribution",
    chartSubtitle: "Hover to inspect factor concentration",
    chartVariant: "gauge",
    chartData: [
      { label: "Low", value: 52 },
      { label: "Medium", value: 31 },
      { label: "High", value: 17 },
    ],
  },
  "case-management": {
    title: "Case Management",
    subtitle: "Investigate alerts with linked evidence, ownership, timelines, comments, and report-ready actions.",
    cta: "Assign Case",
    metrics: [
      { label: "Open cases", value: "42", note: "11 require EDD today" },
      { label: "Avg resolution time", value: "3h 18m", note: "Past 7 days" },
      { label: "SAR drafts", value: "6", note: "Awaiting final review" },
    ],
    cards: [
      { title: "Assigned today", value: "12", note: "Distributed across 5 analysts" },
      { title: "Escalated", value: "4", note: "Senior review or MLRO sign-off needed" },
      { title: "Evidence bundles", value: "31", note: "Cases with linked docs and transactions" },
    ],
    workflow: [
      { title: "Case intake", meta: "Alerts batched into one evidence view", status: "Completed" },
      { title: "Analyst investigation", meta: "Comments, linked transactions, watchlists", status: "In progress" },
      { title: "Disposition and filing", meta: "Close, escalate, or generate SAR", status: "Pending" },
    ],
    rows: [
      { title: "CASE-1042", secondary: "Fatima Rahman", risk: "high", status: "Assigned", detail: "Analyst: Kavya Patel" },
      { title: "CASE-1038", secondary: "Aanya Shah", risk: "medium", status: "In review", detail: "Awaiting supporting docs" },
      { title: "CASE-1032", secondary: "Miguel Torres", risk: "low", status: "Closed", detail: "False positive resolved" },
    ],
    insight: "Case management now has enough structure to feel actionable: workflow, status pressure, and investigation rows are aligned.",
    chartTitle: "Case resolution pace",
    chartSubtitle: "Hover to compare throughput by weekday",
    chartVariant: "bar",
    chartData: [
      { label: "Mon", value: 12 },
      { label: "Tue", value: 16 },
      { label: "Wed", value: 19 },
      { label: "Thu", value: 14 },
      { label: "Fri", value: 11 },
    ],
  },
  "adverse-media": {
    title: "Adverse Media",
    subtitle: "AI-ranked article matches with credibility, relevance, and highlighted entities for analyst triage.",
    cta: "Refresh Sources",
    metrics: [
      { label: "Articles scanned", value: "8,420", note: "In the last 24 hours" },
      { label: "Relevant matches", value: "29", note: "Above 0.82 relevance score" },
      { label: "Source confidence", value: "92%", note: "Weighted by publisher credibility" },
    ],
    cards: [
      { title: "Fraud mentions", value: "14", note: "Articles tagging customer or related entities" },
      { title: "Source confidence", value: "4.6/5", note: "Weighted by publisher credibility" },
      { title: "Human review", value: "9", note: "Stories requiring contextual judgment" },
    ],
    workflow: [
      { title: "Source ingestion", meta: "News, blogs, enforcement notices", status: "Completed" },
      { title: "Entity matching", meta: "Names, aliases, company references", status: "Completed" },
      { title: "Analyst relevance review", meta: "Escalate or dismiss", status: "In progress" },
    ],
    rows: [
      { title: "Financial fraud probe", secondary: "Global Ledger", risk: "high", status: "Linked", detail: "Matched to Omar Haddad" },
      { title: "Corruption inquiry", secondary: "MarketWire", risk: "medium", status: "Reviewing", detail: "PEP mention needs context" },
      { title: "Licensing dispute", secondary: "Regional Times", risk: "low", status: "Dismissed", detail: "Low relevance to AML" },
    ],
    insight: "Adverse media is now framed as a triage workflow, which is more useful than a pile of attractive but ambiguous article cards.",
    chartTitle: "Media match relevance",
    chartSubtitle: "Hover to compare relevance and confidence",
    chartVariant: "line",
    chartData: [
      { label: "Mon", value: 72, secondary: 81 },
      { label: "Tue", value: 64, secondary: 77 },
      { label: "Wed", value: 88, secondary: 90 },
      { label: "Thu", value: 59, secondary: 72 },
      { label: "Fri", value: 74, secondary: 86 },
    ],
  },
  watchlists: {
    title: "Watchlists",
    subtitle: "Manage sanctions, PEP, and custom entity lists with stronger matching visibility and sync health.",
    cta: "Upload List",
    metrics: [
      { label: "Active lists", value: "14", note: "Sanctions, PEP, and internal" },
      { label: "Entities synced", value: "182K", note: "Updated overnight" },
      { label: "Pending reviews", value: "12", note: "New aliases detected" },
    ],
    cards: [
      { title: "Daily sync jobs", value: "27", note: "All list sources refreshed overnight" },
      { title: "Alias collisions", value: "6", note: "Potential duplicate entities to review" },
      { title: "Custom watchlists", value: "3", note: "Owned by analyst teams" },
    ],
    workflow: [
      { title: "Source sync", meta: "OFAC, EU, PEP, custom lists", status: "Completed" },
      { title: "Alias normalization", meta: "Entity and transliteration matching", status: "In progress" },
      { title: "Approval of internal additions", meta: "Manager review before publish", status: "Pending" },
    ],
    rows: [
      { title: "EU Consolidated List", secondary: "Synced 12 min ago", risk: "high", status: "Current", detail: "3 new aliases added" },
      { title: "Global PEP Registry", secondary: "Synced 34 min ago", risk: "medium", status: "Current", detail: "12 profile updates" },
      { title: "Internal blacklist", secondary: "Updated by analyst", risk: "low", status: "Draft", detail: "Awaiting manager approval" },
    ],
    insight: "Watchlists now emphasize operational ownership and sync health, which is what real compliance teams need to manage.",
    chartTitle: "Entity sync volume",
    chartSubtitle: "Hover to inspect daily list updates",
    chartVariant: "bar",
    chartData: [
      { label: "OFAC", value: 12 },
      { label: "EU", value: 18 },
      { label: "UN", value: 9 },
      { label: "PEP", value: 26 },
      { label: "Custom", value: 7 },
    ],
  },
  reports: {
    title: "Reports",
    subtitle: "Generate SAR, CTR, and executive reporting with clearer status, exports, and submission readiness.",
    cta: "Generate Report",
    metrics: [
      { label: "Reports this week", value: "23", note: "Across SAR and CTR" },
      { label: "Submission success", value: "100%", note: "No rejected payloads" },
      { label: "Avg prep time", value: "9m", note: "Using pre-filled templates" },
    ],
    cards: [
      { title: "Ready to submit", value: "8", note: "Reports with all mandatory fields complete" },
      { title: "Need review", value: "5", note: "Awaiting compliance manager approval" },
      { title: "Export formats", value: "4", note: "PDF, XML, CSV, regulator payload" },
    ],
    workflow: [
      { title: "Assemble case evidence", meta: "Pull transactions, counterparties, analyst notes", status: "Completed" },
      { title: "Generate regulator draft", meta: "SAR, CTR, and compliance summaries", status: "In progress" },
      { title: "Submit and retain audit copy", meta: "Store final regulator-ready archive", status: "Pending" },
    ],
    rows: [
      { title: "SAR-2026-118", secondary: "Prepared for CASE-1042", risk: "high", status: "Ready", detail: "Needs MLRO approval" },
      { title: "CTR-2026-077", secondary: "Cash threshold breach", risk: "medium", status: "Submitted", detail: "Filed 28 minutes ago" },
      { title: "Board summary", secondary: "Monthly compliance snapshot", risk: "low", status: "Draft", detail: "Awaiting data refresh" },
    ],
    insight: "Reporting now gives users a proper production rhythm: queue, readiness, and submission state are visually separated.",
    chartTitle: "Submission pipeline",
    chartSubtitle: "Hover to see draft-to-submit conversion",
    chartVariant: "line",
    chartData: [
      { label: "Draft", value: 23, secondary: 18 },
      { label: "Review", value: 17, secondary: 14 },
      { label: "Approved", value: 12, secondary: 11 },
      { label: "Submitted", value: 9, secondary: 8 },
    ],
  },
  "developer-portal": {
    title: "Developer Portal",
    subtitle: "API keys, webhook health, sandbox runs, and integration operations for product teams.",
    cta: "Create API Key",
    metrics: [
      { label: "API requests", value: "3.8M", note: "Trailing 30 days" },
      { label: "Webhook success", value: "99.97%", note: "Across 12 live endpoints" },
      { label: "Sandbox sessions", value: "218", note: "Used by partner engineers" },
    ],
    cards: [
      { title: "Active keys", value: "19", note: "Separated by environment and partner" },
      { title: "Webhook retries", value: "0.03%", note: "Delivery failures in last 7 days" },
      { title: "Latency P95", value: "420ms", note: "Across screening and transaction endpoints" },
    ],
    workflow: [
      { title: "Provision credentials", meta: "Scoped API keys and access controls", status: "Completed" },
      { title: "Validate webhook consumers", meta: "Replay and inspect failed deliveries", status: "In progress" },
      { title: "Monitor integration health", meta: "Usage, quotas, and errors", status: "Completed" },
    ],
    rows: [
      { title: "Production key", secondary: "pk_live_...84c2", risk: "high", status: "Active", detail: "Rotates in 14 days" },
      { title: "Webhook: screening.completed", secondary: "Northstar Fintech", risk: "medium", status: "Healthy", detail: "P95 420ms delivery" },
      { title: "Sandbox run", secondary: "LendMint QA", risk: "low", status: "Passing", detail: "42 requests last hour" },
    ],
    insight: "The portal now feels more like an actual integration workspace, not a decorative docs teaser.",
    chartTitle: "Webhook delivery health",
    chartSubtitle: "Hover to compare success and retries",
    chartVariant: "line",
    chartData: [
      { label: "Mon", value: 99, secondary: 1 },
      { label: "Tue", value: 98, secondary: 2 },
      { label: "Wed", value: 100, secondary: 0 },
      { label: "Thu", value: 99, secondary: 1 },
      { label: "Fri", value: 99, secondary: 1 },
    ],
  },
  "audit-logs": {
    title: "Audit Logs",
    subtitle: "Track user actions, system events, and case changes with filterable traceability.",
    cta: "Export Logs",
    metrics: [
      { label: "Events captured", value: "24,812", note: "Past 24 hours" },
      { label: "Immutable coverage", value: "100%", note: "All state-changing actions" },
      { label: "Critical actions", value: "86", note: "Require retention lock" },
    ],
    cards: [
      { title: "Case events", value: "4,220", note: "Updates, escalations, and closures" },
      { title: "Access logs", value: "13,481", note: "User and API access footprints" },
      { title: "Retention locks", value: "86", note: "Critical actions protected" },
    ],
    workflow: [
      { title: "Capture state-changing events", meta: "Cases, reports, watchlists, profiles", status: "Completed" },
      { title: "Apply retention and export rules", meta: "Immutable storage for sensitive actions", status: "Completed" },
      { title: "Review anomaly access patterns", meta: "Security ops and audit teams", status: "In progress" },
    ],
    rows: [
      { title: "Case escalated", secondary: "CASE-1042 by analyst", risk: "high", status: "Recorded", detail: "2:14 PM IST" },
      { title: "Watchlist updated", secondary: "EU list sync service", risk: "medium", status: "Recorded", detail: "1:55 PM IST" },
      { title: "Customer approved", secondary: "Automated onboarding", risk: "low", status: "Recorded", detail: "1:41 PM IST" },
    ],
    insight: "Audit logs now give security and compliance teams a usable workspace, with evidence density without visual cramping.",
    chartTitle: "Event volume by source",
    chartSubtitle: "Hover to inspect system pressure points",
    chartVariant: "bar",
    chartData: [
      { label: "Cases", value: 42 },
      { label: "Screening", value: 58 },
      { label: "Reports", value: 21 },
      { label: "Users", value: 76 },
      { label: "API", value: 65 },
    ],
  },
};
