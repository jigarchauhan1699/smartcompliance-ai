import { NextResponse, type NextRequest } from "next/server";

import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const next = requestUrl.searchParams.get("next") || "/dashboard";
  const redirectUrl = new URL(next, request.url);

  if (!hasSupabaseEnv) {
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("error", "supabase-not-configured");
    return NextResponse.redirect(redirectUrl);
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("error", "supabase-client-unavailable");
    return NextResponse.redirect(redirectUrl);
  }

  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  if (error) {
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("error", errorDescription ?? error);
    return NextResponse.redirect(redirectUrl);
  }

  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) {
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("error", exchangeError.message);
      return NextResponse.redirect(redirectUrl);
    }
  } else if (tokenHash && type) {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as "signup" | "recovery" | "magiclink" | "invite" | "email_change" | "email",
    });

    if (verifyError) {
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("error", verifyError.message);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.redirect(redirectUrl);
}
