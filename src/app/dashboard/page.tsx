import { InteractiveChart } from "@/components/interactive-chart";
import { PlatformShell } from "@/components/platform-shell";
import { getDashboardData } from "@/lib/data";
import { hasSupabaseEnv } from "@/lib/env";
import { requireServerRole } from "@/lib/server-auth";

const alertTrend = [
  { label: "Mon", value: 42, secondary: 31 },
  { label: "Tue", value: 56, secondary: 39 },
  { label: "Wed", value: 49, secondary: 37 },
  { label: "Thu", value: 68, secondary: 44 },
  { label: "Fri", value: 63, secondary: 41 },
  { label: "Sat", value: 38, secondary: 29 },
];

const analystThroughput = [
  { label: "A", value: 72 },
  { label: "B", value: 91 },
  { label: "C", value: 66 },
  { label: "D", value: 83 },
  { label: "E", value: 58 },
];

const riskDistribution = [
  { label: "Low", value: 54 },
  { label: "Medium", value: 29 },
  { label: "High", value: 17 },
];

export default async function DashboardPage() {
  const user = hasSupabaseEnv ? await requireServerRole("/dashboard") : null;
  const data = await getDashboardData();

  return (
    <PlatformShell
      title="Dashboard"
      subtitle="Real-time compliance intelligence with aligned spacing, interactive graphs, and clearer analyst flow."
      ctaLabel="Generate Report"
      authMode={hasSupabaseEnv ? "supabase" : "demo"}
      viewerName={user?.user_metadata.full_name ?? user?.email ?? undefined}
      viewerEmail={user?.email ?? undefined}
      viewerRole={user?.user_metadata.role ?? undefined}
    >
      <section className="metric-strip">
        {data.metrics.map((metric: { label: string; value: string; note: string }) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.note}</p>
          </article>
        ))}
      </section>

      <section className="module-overview-grid">
        <InteractiveChart
          title="Alert trend"
          subtitle="Hover to compare triggered vs escalated alerts"
          variant="line"
          data={alertTrend}
        />
        <InteractiveChart
          title="Analyst throughput"
          subtitle="Hover to inspect review completion by squad"
          variant="bar"
          data={analystThroughput}
        />
      </section>

      <section className="detail-card-grid">
        <article className="detail-card">
          <span>Auto-clear rate</span>
          <strong>68%</strong>
          <p>Low-risk alerts resolved without manual intervention.</p>
        </article>
        <article className="detail-card">
          <span>Risk pressure</span>
          <strong>17%</strong>
          <p>High-risk entities in the current operating window.</p>
        </article>
        <article className="detail-card">
          <span>Review SLA</span>
          <strong>11m</strong>
          <p>Median time from alert creation to first analyst action.</p>
        </article>
      </section>

      <section className="module-overview-grid">
        <InteractiveChart
          title="Risk distribution"
          subtitle="Hover to inspect portfolio concentration"
          variant="gauge"
          data={riskDistribution}
        />
        <article className="detail-stack-card">
          <div className="detail-stack-header">
            <div className="eyebrow">AI Summary</div>
            <h3>Live platform briefing</h3>
          </div>
          <div className="workflow-list">
            <div className="workflow-item">
              <div>
                <strong>4 accounts showing unusual velocity</strong>
                <p>Cross-border transfer spikes detected in the last hour</p>
              </div>
              <span className="workflow-status">High</span>
            </div>
            <div className="workflow-item">
              <div>
                <strong>2 SAR drafts need final approval</strong>
                <p>MLRO review pending before regulator submission</p>
              </div>
              <span className="workflow-status">Pending</span>
            </div>
            <div className="workflow-item">
              <div>
                <strong>Watchlist sync completed successfully</strong>
                <p>OFAC and EU entities refreshed 12 minutes ago</p>
              </div>
              <span className="workflow-status">Healthy</span>
            </div>
          </div>
        </article>
      </section>

      <section className="table-card">
        <div className="table-head">
          <span>Case</span>
          <span>Risk</span>
          <span>Status</span>
          <span>Queue</span>
        </div>
        {data.cases.map(
          (item: { id: string; customerName: string; riskLevel: string; status: string; queue: string }) => (
          <div className="table-row" key={item.id}>
            <div>
              <strong>{item.id}</strong>
              <p>{item.customerName}</p>
            </div>
            <div>
              <span className={`status-chip ${item.riskLevel}`}>{item.riskLevel}</span>
            </div>
            <div>{item.status}</div>
            <div>{item.queue}</div>
          </div>
          ),
        )}
      </section>
    </PlatformShell>
  );
}
