"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthShell } from "@/components/auth-shell";
import { useAuth } from "@/components/auth-provider";
import { hasSupabaseEnv } from "@/lib/env";

export function VerifyEmailClient({ email, status }: { email: string; status?: string }) {
  const router = useRouter();
  const { verifyEmail } = useAuth();
  const [message, setMessage] = useState(
    status === "confirmed"
      ? `Email confirmed for ${email}. You can continue to sign in.`
      : status === "setup"
        ? "For smooth local Supabase signup, disable Email confirmation in Supabase Auth -> Sign In / Providers -> Email, then retry signup."
      : `Verification ready for ${email}.`,
  );

  async function handleVerify() {
    const result = await verifyEmail(email);
    setMessage(result.message);
    if (result.ok) {
      router.push("/login");
    }
  }

  return (
    <AuthShell
      eyebrow="Verification"
      title="Check your inbox to verify access"
      description={
        hasSupabaseEnv
          ? "Supabase email verification is active. Confirm the message sent to your inbox, then return here to sign in."
          : "In demo mode you can complete verification directly from this screen, so the product flow works without external email infrastructure."
      }
    >
      <section className="auth-panel auth-state-panel">
        <h2>Verification sent</h2>
        <p className="auth-message">{message}</p>
        <div className="auth-state-actions">
          {hasSupabaseEnv ? (
            <Link className="primary-button auth-submit" href="/login">
              Back to Log In
            </Link>
          ) : (
            <button className="primary-button auth-submit" onClick={handleVerify} type="button">
              Verify Demo Email
            </button>
          )}
          <Link className="secondary-button auth-secondary" href="/signup">
            Back to Sign Up
          </Link>
        </div>
      </section>
    </AuthShell>
  );
}
