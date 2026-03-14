"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

import { forgotPasswordAction } from "@/app/auth-actions";
import { AuthShell } from "@/components/auth-shell";
import { useAuth } from "@/components/auth-provider";
import { hasSupabaseEnv } from "@/lib/env";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("analyst@smartcompliance.demo");
  const [demoMessage, setDemoMessage] = useState("Enter your email to send a reset link.");
  const [actionState, formAction, isPending] = useActionState(forgotPasswordAction, { message: "" });
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const message = hasSupabaseEnv ? actionState.message || "Enter your email to send a reset link." : demoMessage;

  async function handleDemoSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await requestPasswordReset(email);
    setDemoMessage(result.message);
    if (result.ok) {
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    }
  }

  return (
    <AuthShell
      eyebrow="Recovery"
      title="Reset your operator password"
      description="Use this page when an analyst or manager is locked out. The reset route is part of the complete product flow now."
    >
      <form
        className="auth-panel"
        action={hasSupabaseEnv ? formAction : undefined}
        onSubmit={hasSupabaseEnv ? undefined : handleDemoSubmit}
      >
        <h2>Forgot password</h2>
        <label htmlFor="recovery-email">Work email</label>
        <input
          id="recovery-email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        {hasSupabaseEnv ? <input type="hidden" name="origin" value={origin} /> : null}
        <button className="primary-button auth-submit" type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send Reset Link"}
        </button>
        <p className="auth-message">{message}</p>
        <p className="auth-switch">
          Remembered your password? <Link href="/login">Back to log in</Link>
        </p>
      </form>
    </AuthShell>
  );
}
