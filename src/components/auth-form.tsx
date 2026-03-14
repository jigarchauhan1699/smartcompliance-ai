"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

import { magicLinkAction, signInAction, signUpAction } from "@/app/auth-actions";
import { AuthShell } from "@/components/auth-shell";
import { useAuth } from "@/components/auth-provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isRecoverableRateLimitMessage } from "@/lib/auth-messages";
import { hasSupabaseEnv } from "@/lib/env";

type AuthFormProps = {
  mode: "login" | "signup";
  initialMessage?: string;
};

export function AuthForm({ mode, initialMessage }: AuthFormProps) {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [fullName, setFullName] = useState("Kavya Patel");
  const [email, setEmail] = useState("analyst@smartcompliance.demo");
  const [password, setPassword] = useState("DemoPass123!");
  const [rememberMe, setRememberMe] = useState(true);
  const [demoMessage, setDemoMessage] = useState("Supabase credentials not set yet. Demo mode is active.");
  const [signInState, signInFormAction, signInPending] = useActionState(signInAction, { message: "" });
  const [signUpState, signUpFormAction, signUpPending] = useActionState(signUpAction, { message: "" });
  const [magicLinkState, magicLinkFormAction, magicLinkPending] = useActionState(magicLinkAction, { message: "" });
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const supabaseMessage =
    initialMessage ||
    magicLinkState.message ||
    (mode === "signup" ? signUpState.message : signInState.message) ||
    "Use your workspace credentials to continue.";
  const message = hasSupabaseEnv ? supabaseMessage : demoMessage;
  const showRateLimitHelp = isRecoverableRateLimitMessage(message);

  async function handleDemoSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result =
      mode === "signup"
        ? await signup({ fullName, company: "SmartCompliance", email, password })
        : await login(email, password);
    setDemoMessage(result.message);
    if (result.ok) {
      router.push(mode === "signup" ? `/verify-email?email=${encodeURIComponent(email)}` : "/dashboard");
    }
  }

  async function handleSsoLogin() {
    if (!hasSupabaseEnv) {
      setDemoMessage("SSO requires Supabase auth configuration.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setDemoMessage("Supabase client unavailable.");
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      setDemoMessage(error.message);
    }
  }

  return (
    <AuthShell
      eyebrow="Secure Access"
      title={mode === "signup" ? "Create your operator account" : "Welcome back to the compliance console"}
      description={
        hasSupabaseEnv
          ? "Supabase auth is active. Sessions, protected routes, password recovery, and profile metadata now follow a proper product auth structure."
          : "This auth flow now covers real product entry needs instead of only a single form. Use it for demos today and wire it to Supabase auth in production."
      }
    >
      <form
        className="auth-panel"
        action={hasSupabaseEnv ? (mode === "signup" ? signUpFormAction : signInFormAction) : undefined}
        onSubmit={hasSupabaseEnv ? undefined : handleDemoSubmit}
      >
        <h2>{mode === "signup" ? "Sign up" : "Log in"}</h2>
        {mode === "signup" ? (
          <>
            <label htmlFor="full-name">Full name</label>
            <input
              id="full-name"
              name="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </>
        ) : null}
        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <label htmlFor="password">{mode === "signup" ? "Create password" : "Password"}</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {hasSupabaseEnv ? <input type="hidden" name="origin" value={origin} /> : null}
        {mode === "signup" ? <input type="hidden" name="company" value="SmartCompliance" /> : null}
        <div className="auth-row">
          <label className="auth-check">
            <input
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              type="checkbox"
            />
            <span>Remember this device</span>
          </label>
          {mode === "login" ? (
            <Link className="auth-inline-link" href="/forgot-password">
              Forgot password?
            </Link>
          ) : null}
        </div>
        <button className="primary-button auth-submit" type="submit" disabled={signInPending || signUpPending}>
          {signInPending || signUpPending ? "Processing..." : mode === "signup" ? "Create Account" : "Sign In"}
        </button>
        <div className="auth-alt-actions">
          <button className="secondary-button auth-secondary" type="button" onClick={handleSsoLogin}>
            Continue with Google SSO
          </button>
          <button
            className="secondary-button auth-secondary"
            formAction={hasSupabaseEnv ? magicLinkFormAction : undefined}
            type={hasSupabaseEnv ? "submit" : "button"}
            disabled={magicLinkPending}
            onClick={
              hasSupabaseEnv
                ? undefined
                : () => setDemoMessage("Magic link requires Supabase auth configuration.")
            }
          >
            {magicLinkPending ? "Sending Link..." : "Use Magic Link"}
          </button>
        </div>
        <p className="auth-message">{message}</p>
        {showRateLimitHelp ? (
          <div className="auth-help-card">
            <strong>Testing recovery path</strong>
            <p>
              Supabase is limiting confirmation emails. For a smooth local signup flow, disable email confirmation in
              Supabase Auth while testing, then try again.
            </p>
            <div className="auth-help-actions">
              <Link className="secondary-button auth-secondary" href="/login">
                Try Log In
              </Link>
              <Link className="secondary-button auth-secondary" href="/verify-email?status=setup">
                View Setup Hint
              </Link>
            </div>
          </div>
        ) : null}
        <p className="auth-switch">
          {mode === "signup" ? "Already have an account?" : "Need an account?"}{" "}
          <Link href={mode === "signup" ? "/login" : "/signup"}>
            {mode === "signup" ? "Log in" : "Sign up"}
          </Link>
        </p>
        {mode === "signup" ? (
          <p className="auth-switch">
            By creating an account you agree to the platform security policy and compliance handling terms.
          </p>
        ) : null}
      </form>
    </AuthShell>
  );
}
