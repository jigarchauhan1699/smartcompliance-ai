"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthShell } from "@/components/auth-shell";
import { useAuth } from "@/components/auth-provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/env";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("DemoPass123!");
  const [confirmPassword, setConfirmPassword] = useState("DemoPass123!");
  const [message, setMessage] = useState("Create a new password for your operator account.");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!hasSupabaseEnv || !supabase) {
      const result = await resetPassword(password);
      setMessage(result.message);
      if (result.ok) {
        router.push("/login");
      }
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    setMessage(error ? error.message : "Password updated successfully.");
    if (!error) {
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <AuthShell
      eyebrow="Recovery"
      title="Set a new password"
      description="This page completes the recovery flow so the product has a full auth cycle instead of a dead-end reset email."
    >
      <form className="auth-panel" onSubmit={handleSubmit}>
        <h2>Reset password</h2>
        <label htmlFor="new-password">New password</label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <button className="primary-button auth-submit" type="submit">
          Update Password
        </button>
        <p className="auth-message">{message}</p>
        <p className="auth-switch">
          Need to start over? <Link href="/forgot-password">Request another link</Link>
        </p>
      </form>
    </AuthShell>
  );
}
