import type { User } from "@supabase/supabase-js";

export const appRoles = [
  "compliance_analyst",
  "compliance_manager",
  "mlro",
  "developer",
  "admin",
] as const;

export type AppRole = (typeof appRoles)[number];

export const defaultAppRole: AppRole = "compliance_analyst";

export function normalizeAppRole(role: string | null | undefined): AppRole {
  const normalized = (role ?? "").trim().toLowerCase().replace(/\s+/g, "_");

  if (normalized === "analyst" || normalized === "compliance_analyst") {
    return "compliance_analyst";
  }
  if (normalized === "manager" || normalized === "compliance_manager") {
    return "compliance_manager";
  }
  if (normalized === "mlro") {
    return "mlro";
  }
  if (normalized === "developer" || normalized === "engineer") {
    return "developer";
  }
  if (normalized === "admin" || normalized === "administrator") {
    return "admin";
  }

  return defaultAppRole;
}

export function getUserRole(user: Pick<User, "user_metadata"> | null | undefined): AppRole {
  return normalizeAppRole(user?.user_metadata?.role);
}

export function canAccessRole(required: AppRole[], currentRole: AppRole) {
  return required.includes(currentRole) || currentRole === "admin";
}

const allAppRoles: AppRole[] = [
  "compliance_analyst",
  "compliance_manager",
  "mlro",
  "developer",
  "admin",
];

export const routeRoleAccess: Record<string, AppRole[]> = {
  "/dashboard": allAppRoles,
  "/customer-screening": allAppRoles,
  "/transaction-monitoring": allAppRoles,
  "/risk-scoring": allAppRoles,
  "/case-management": allAppRoles,
  "/adverse-media": allAppRoles,
  "/watchlists": allAppRoles,
  "/reports": allAppRoles,
  "/developer-portal": allAppRoles,
  "/audit-logs": allAppRoles,
  "/settings": allAppRoles,
};

export function getAllowedRolesForPath(pathname: string) {
  const match = Object.entries(routeRoleAccess).find(
    ([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  return match?.[1] ?? null;
}
