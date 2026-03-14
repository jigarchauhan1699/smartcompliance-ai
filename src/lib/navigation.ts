import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  Code2,
  FileCheck2,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Newspaper,
  Settings,
  ShieldCheck,
  UserRoundSearch,
} from "lucide-react";

import { canAccessRole, type AppRole } from "@/lib/authz";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: AppRole[];
};

export const navigationItems: NavigationItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Customer Screening", href: "/customer-screening", icon: UserRoundSearch },
  { label: "Transaction Monitoring", href: "/transaction-monitoring", icon: Activity },
  { label: "Risk Scoring", href: "/risk-scoring", icon: ShieldCheck },
  { label: "Case Management", href: "/case-management", icon: FolderKanban },
  { label: "Adverse Media", href: "/adverse-media", icon: Newspaper },
  { label: "Watchlists", href: "/watchlists", icon: AlertTriangle },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Developer Portal", href: "/developer-portal", icon: Code2 },
  { label: "Audit Logs", href: "/audit-logs", icon: FileCheck2 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const supportedModules = navigationItems
  .map((item) => item.href.replace("/", ""))
  .filter((slug) => slug !== "dashboard");

export const quickActions = [
  { label: "Generate SAR", href: "/reports" },
  { label: "Review Cases", href: "/case-management" },
  { label: "Open API Portal", href: "/developer-portal" },
  { label: "Scan Watchlists", href: "/watchlists" },
];

export function filterNavigationItems(role: AppRole) {
  return navigationItems.filter((item) => !item.roles || canAccessRole(item.roles, role));
}

export function filterQuickActions(role: AppRole) {
  return quickActions.filter((action) => {
    const item = navigationItems.find((navigationItem) => navigationItem.href === action.href);
    return !item?.roles || canAccessRole(item.roles, role);
  });
}
