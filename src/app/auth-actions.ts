"use server";

import { redirect } from "next/navigation";

import { normalizeSupabaseAuthMessage } from "@/lib/auth-messages";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthActionState = {
  message: string;
};

const defaultState: AuthActionState = { message: "" };

function getSignupMetadata(fullName: string, company: string) {
  return {
    full_name: fullName,
    company: company || "SmartCompliance",
    role: "compliance_analyst",
    team: "Onboarding Review",
    bio: "New operator account created through Supabase auth.",
  };
}

export async function signInAction(prevState: AuthActionState = defaultState, formData: FormData): Promise<AuthActionState> {
  void prevState;
  if (!hasSupabaseEnv) {
    return { message: "Supabase is not configured. Demo mode is active instead." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { message: "Supabase client unavailable." };
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { message: normalizeSupabaseAuthMessage(error.message, "login") };
  }

  redirect("/dashboard");
}

export async function magicLinkAction(
  prevState: AuthActionState = defaultState,
  formData: FormData,
): Promise<AuthActionState> {
  void prevState;

  if (!hasSupabaseEnv) {
    return { message: "Supabase is not configured. Demo mode is active instead." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { message: "Supabase client unavailable." };
  }

  const email = String(formData.get("email") ?? "");
  const origin = String(formData.get("origin") ?? "");

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: origin ? `${origin}/auth/callback?next=/dashboard` : undefined,
    },
  });

  return {
    message: error ? normalizeSupabaseAuthMessage(error.message, "magic-link") : "Magic link sent. Check your inbox to continue.",
  };
}

export async function signUpAction(prevState: AuthActionState = defaultState, formData: FormData): Promise<AuthActionState> {
  void prevState;
  if (!hasSupabaseEnv) {
    return { message: "Supabase is not configured. Demo mode is active instead." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { message: "Supabase client unavailable." };
  }

  const fullName = String(formData.get("fullName") ?? "");
  const company = String(formData.get("company") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const origin = String(formData.get("origin") ?? "");
  const metadata = getSignupMetadata(fullName, company);

  if (!fullName || !email || !password) {
    return { message: "Full name, email, and password are required." };
  }

  if (password.length < 8) {
    return { message: "Use a password with at least 8 characters." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: origin ? `${origin}/auth/callback?next=/dashboard` : undefined,
      data: metadata,
    },
  });

  if (error) {
    return { message: normalizeSupabaseAuthMessage(error.message, "signup") };
  }

  if (data.session) {
    redirect("/dashboard");
  }

  redirect(`/verify-email?email=${encodeURIComponent(email)}`);
}

export async function forgotPasswordAction(
  prevState: AuthActionState = defaultState,
  formData: FormData,
): Promise<AuthActionState> {
  void prevState;
  if (!hasSupabaseEnv) {
    return { message: "Supabase is not configured. Demo mode is active instead." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { message: "Supabase client unavailable." };
  }

  const email = String(formData.get("email") ?? "");
  const origin = String(formData.get("origin") ?? "");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: origin ? `${origin}/auth/callback?next=/reset-password` : undefined,
  });

  return { message: error ? normalizeSupabaseAuthMessage(error.message, "reset") : "Reset link sent. Check your inbox." };
}
