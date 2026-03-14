import { notFound } from "next/navigation";

import { ModuleView } from "@/components/module-view";
import { PlatformShell } from "@/components/platform-shell";
import { hasSupabaseEnv } from "@/lib/env";
import { requireServerRole } from "@/lib/server-auth";
import { moduleContent } from "@/lib/module-content";
import { supportedModules } from "@/lib/navigation";

export function generateStaticParams() {
  return supportedModules.map((module) => ({ module }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const content = moduleContent[module];
  const user = hasSupabaseEnv ? await requireServerRole(`/${module}`) : null;

  if (!content) {
    notFound();
  }

  return (
    <PlatformShell
      title={content.title}
      subtitle={content.subtitle}
      ctaLabel={content.cta}
      authMode={hasSupabaseEnv ? "supabase" : "demo"}
      viewerName={user?.user_metadata.full_name ?? user?.email ?? undefined}
      viewerEmail={user?.email ?? undefined}
      viewerRole={user?.user_metadata.role ?? undefined}
    >
      <ModuleView slug={module} />
    </PlatformShell>
  );
}
