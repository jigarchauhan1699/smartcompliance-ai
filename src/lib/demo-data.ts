export type ComplianceCase = {
  id: string;
  customerName: string;
  institution: string;
  riskLevel: "high" | "medium" | "low";
  status: string;
  trigger: string;
  queue: string;
};

export const dashboardMetrics = [
  { label: "Open alerts", value: "42", note: "Across onboarding and transaction monitoring" },
  { label: "Auto-cleared", value: "68%", note: "Rules and AI explanations resolved low-risk noise" },
  { label: "SAR drafts", value: "6", note: "Ready for analyst review" },
  { label: "P99 review SLA", value: "11m", note: "Measured on seeded operational data" },
];

export const seededCases: ComplianceCase[] = [
  {
    id: "CASE-1042",
    customerName: "Fatima Rahman",
    institution: "Northstar Fintech",
    riskLevel: "high",
    status: "EDD review",
    trigger: "PEP hit and cross-border transfer spike",
    queue: "Enhanced Due Diligence",
  },
  {
    id: "CASE-1041",
    customerName: "Omar Haddad",
    institution: "Vertex Payments",
    riskLevel: "high",
    status: "Escalated",
    trigger: "EU sanctions name match",
    queue: "Sanctions",
  },
  {
    id: "CASE-1038",
    customerName: "Aanya Shah",
    institution: "LendMint",
    riskLevel: "medium",
    status: "Analyst review",
    trigger: "Volume exceeds declared income profile",
    queue: "Onboarding",
  },
  {
    id: "CASE-1032",
    customerName: "Miguel Torres",
    institution: "Pinnacle Bank",
    riskLevel: "low",
    status: "Auto-cleared",
    trigger: "Duplicate false positive watchlist alias",
    queue: "Resolved",
  },
];
