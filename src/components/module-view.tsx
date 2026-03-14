"use client";

import { InteractiveChart } from "@/components/interactive-chart";
import { ReportsWorkspace } from "@/components/reports-workspace";
import { useWorkspace } from "@/components/workspace-provider";
import { moduleContent } from "@/lib/module-content";

type ModuleViewProps = {
  slug: string;
};

export function ModuleView({ slug }: ModuleViewProps) {
  const content = moduleContent[slug];
  const { getRowsForModule, lastActionMessage } = useWorkspace();
  const rows = getRowsForModule(slug);

  if (slug === "reports") {
    return (
      <>
        <section className="metric-strip">
          {content.metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.note}</p>
            </article>
          ))}
        </section>

        <section className="module-overview-grid">
          <InteractiveChart
            title={content.chartTitle}
            subtitle={content.chartSubtitle}
            variant={content.chartVariant}
            data={content.chartData}
          />

          <article className="detail-stack-card">
            <div className="detail-stack-header">
              <div className="eyebrow">Workflow</div>
              <h3>Operational flow</h3>
            </div>
            <div className="workflow-list">
              {content.workflow.map((item) => (
                <div className="workflow-item" key={item.title}>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.meta}</p>
                  </div>
                  <span className="workflow-status">{item.status}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <ReportsWorkspace seededRows={rows} />
      </>
    );
  }

  return (
    <>
      <section className="metric-strip">
        {content.metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.note}</p>
          </article>
        ))}
      </section>

      {lastActionMessage ? (
        <section className="action-feedback-card">
          <strong>Latest action</strong>
          <p>{lastActionMessage}</p>
        </section>
      ) : null}

      <section className="module-overview-grid">
        <InteractiveChart
          title={content.chartTitle}
          subtitle={content.chartSubtitle}
          variant={content.chartVariant}
          data={content.chartData}
        />

        <article className="detail-stack-card">
          <div className="detail-stack-header">
            <div className="eyebrow">Workflow</div>
            <h3>Operational flow</h3>
          </div>
          <div className="workflow-list">
            {content.workflow.map((item) => (
              <div className="workflow-item" key={item.title}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.meta}</p>
                </div>
                <span className="workflow-status">{item.status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="detail-card-grid">
        {content.cards.map((card) => (
          <article className="detail-card" key={card.title}>
            <span>{card.title}</span>
            <strong>{card.value}</strong>
            <p>{card.note}</p>
          </article>
        ))}
      </section>

      <section className="table-card">
        <div className="table-head">
          <span>Item</span>
          <span>Risk</span>
          <span>Status</span>
          <span>Detail</span>
        </div>
        {rows.map((row) => (
          <div className="table-row" key={`${slug}-${row.title}-${row.detail}`}>
            <div>
              <strong>{row.title}</strong>
              <p>{row.secondary}</p>
            </div>
            <div>
              <span className={`status-chip ${row.risk}`}>{row.risk}</span>
            </div>
            <div>{row.status}</div>
            <div>{row.detail}</div>
          </div>
        ))}
      </section>
    </>
  );
}
