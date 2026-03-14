import { dashboardMetrics, seededCases } from "@/lib/demo-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getDashboardData() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      source: "demo" as const,
      metrics: dashboardMetrics,
      cases: seededCases,
    };
  }

  const [{ data: metricsData }, { data: casesData }] = await Promise.all([
    supabase.from("dashboard_metrics").select("*").order("sort_order", { ascending: true }),
    supabase.from("compliance_cases").select("*").order("created_at", { ascending: false }).limit(8),
  ]);

  return {
    source: "supabase" as const,
    metrics:
      metricsData?.map((item) => ({
        label: item.label,
        value: item.value,
        note: item.note,
      })) ?? dashboardMetrics,
    cases:
      casesData?.map((item) => ({
        id: item.case_code,
        customerName: item.customer_name,
        institution: item.institution,
        riskLevel: item.risk_level,
        status: item.status,
        trigger: item.trigger_reason,
        queue: item.queue_name,
      })) ?? seededCases,
  };
}
