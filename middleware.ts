import { NextResponse, type NextRequest } from "next/server";

import { canAccessRole, getAllowedRolesForPath, getUserRole } from "@/lib/authz";
import { hasSupabaseEnv } from "@/lib/env";
import { updateSession } from "@/lib/supabase/middleware";

const protectedPrefixes = [
  "/dashboard",
  "/settings",
  "/customer-screening",
  "/transaction-monitoring",
  "/risk-scoring",
  "/case-management",
  "/adverse-media",
  "/watchlists",
  "/reports",
  "/developer-portal",
  "/audit-logs",
];

const authPrefixes = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify-email"];

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  if (!hasSupabaseEnv) {
    return response;
  }

  const pathname = request.nextUrl.pathname;
  const isProtected = protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  const isAuthPage = authPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isProtected && user) {
    const allowedRoles = getAllowedRolesForPath(pathname);
    const role = getUserRole(user);

    if (allowedRoles && !canAccessRole(allowedRoles, role)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (isAuthPage && user && pathname !== "/verify-email") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
