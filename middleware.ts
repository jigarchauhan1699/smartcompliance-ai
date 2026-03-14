import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

const hasSupabaseEnv =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

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

type AppRole = "compliance_analyst" | "compliance_manager" | "mlro" | "developer" | "admin";

function normalizeAppRole(role: string | null | undefined): AppRole {
  const normalized = (role ?? "").trim().toLowerCase().replace(/\s+/g, "_");

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

  return "compliance_analyst";
}

function getUserRole(user: Pick<User, "user_metadata"> | null | undefined): AppRole {
  return normalizeAppRole((user?.user_metadata as Record<string, unknown> | undefined)?.role as string | undefined);
}

function getAllowedRolesForPath(): AppRole[] | null {
  return null;
}

async function updateSession(request: NextRequest) {
  if (!hasSupabaseEnv) {
    return { response: NextResponse.next(), user: null as User | null };
  }

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}

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
    const allowedRoles = getAllowedRolesForPath();
    const role = getUserRole(user);

    if (allowedRoles && !allowedRoles.includes(role) && role !== "admin") {
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
