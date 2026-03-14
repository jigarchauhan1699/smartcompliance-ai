import { PlatformShell } from "@/components/platform-shell";
import { SettingsWorkspace } from "@/components/settings-workspace";
import { hasSupabaseEnv } from "@/lib/env";
import { requireServerRole } from "@/lib/server-auth";

export default async function SettingsPage() {
  const user = hasSupabaseEnv ? await requireServerRole("/settings") : null;
  const profile = user
    ? {
        fullName: user.user_metadata.full_name ?? "",
        email: user.email ?? "",
        role: user.user_metadata.role ?? "Compliance Analyst",
        team: user.user_metadata.team ?? "Operations",
        company: user.user_metadata.company ?? "",
        bio: user.user_metadata.bio ?? "",
      }
    : undefined;
  return (
    <PlatformShell
      title="Settings"
      subtitle="Manage operator profile, security, notifications, integrations, and workspace preferences."
      ctaLabel="Save Changes"
      authMode={hasSupabaseEnv ? "supabase" : "demo"}
      viewerName={profile?.fullName || profile?.email || undefined}
      viewerEmail={profile?.email}
      viewerRole={profile?.role}
    >
      <SettingsWorkspace mode={hasSupabaseEnv ? "supabase" : "demo"} initialProfile={profile} />
    </PlatformShell>
  );
}
