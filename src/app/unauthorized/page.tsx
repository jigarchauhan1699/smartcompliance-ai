import Link from "next/link";

import { AuthShell } from "@/components/auth-shell";

export default function UnauthorizedPage() {
  return (
    <AuthShell
      eyebrow="Restricted"
      title="You do not have access to this workspace"
      description="Your authenticated account is valid, but your current role does not allow access to this area of SmartCompliance AI."
    >
      <section className="auth-panel auth-state-panel">
        <h2>Permission denied</h2>
        <p className="auth-message">
          Ask an administrator or compliance manager to update your assigned role if you need this module.
        </p>
        <div className="auth-state-actions">
          <Link className="primary-button auth-submit" href="/dashboard">
            Return to Dashboard
          </Link>
          <Link className="secondary-button auth-secondary" href="/settings">
            Review Profile
          </Link>
        </div>
      </section>
    </AuthShell>
  );
}
