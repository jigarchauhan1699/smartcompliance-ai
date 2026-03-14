import { VerifyEmailClient } from "@/components/verify-email-client";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; status?: string }>;
}) {
  const params = await searchParams;

  return <VerifyEmailClient email={params.email ?? "analyst@smartcompliance.demo"} status={params.status} />;
}
