"use client";

import { useMemo, useState } from "react";

import { useWorkspace } from "@/components/workspace-provider";

const reportTypes = ["SAR", "CTR", "Board Summary", "Regulator Export"] as const;

type ReportsWorkspaceProps = {
  seededRows: Array<{
    title: string;
    secondary: string;
    status: string;
    detail: string;
  }>;
};

export function ReportsWorkspace({ seededRows }: ReportsWorkspaceProps) {
  const { createReport, lastActionMessage, reports } = useWorkspace();
  const [reportType, setReportType] = useState<(typeof reportTypes)[number]>("SAR");
  const [subject, setSubject] = useState("Fatima Rahman");
  const [caseId, setCaseId] = useState("CASE-1042");
  const [message, setMessage] = useState("Generate a new filing or summary package from seeded compliance data.");

  const reportStats = useMemo(() => {
    const ready = reports.filter((item) => item.status === "Ready").length;
    const submitted = reports.filter((item) => item.status === "Submitted").length;
    const draft = reports.filter((item) => item.status === "Draft").length;

    return { ready, submitted, draft };
  }, [reports]);

  function handleGenerate() {
    const created = createReport({
      type: reportType,
      subject,
      caseId: caseId || undefined,
    });
    setMessage(`${created.id} generated successfully for ${created.subject}.`);
  }

  return (
    <div className="reports-workspace">
      <section className="reports-layout">
        <article className="settings-card">
          <div className="detail-stack-header">
            <div className="eyebrow">Generator</div>
            <h3>Generate regulator-ready output</h3>
          </div>
          <div className="settings-form-grid">
            <label>
              Report type
              <select value={reportType} onChange={(event) => setReportType(event.target.value as typeof reportType)}>
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Subject
              <input value={subject} onChange={(event) => setSubject(event.target.value)} />
            </label>
            <label>
              Linked case
              <input value={caseId} onChange={(event) => setCaseId(event.target.value)} />
            </label>
            <label>
              Output mode
              <select defaultValue="PDF + Audit Copy">
                <option>PDF + Audit Copy</option>
                <option>Regulator Payload + PDF</option>
                <option>Executive Summary</option>
              </select>
            </label>
          </div>
          <div className="settings-actions">
            <button className="primary-button" type="button" onClick={handleGenerate}>
              Generate Now
            </button>
            <span className="settings-message">{message}</span>
          </div>
        </article>

        <article className="detail-stack-card">
          <div className="detail-stack-header">
            <div className="eyebrow">Readiness</div>
            <h3>Submission queue</h3>
          </div>
          <div className="settings-stats report-stats">
            <div>
              <strong>{reportStats.ready}</strong>
              <span>Ready</span>
            </div>
            <div>
              <strong>{reportStats.submitted}</strong>
              <span>Submitted</span>
            </div>
            <div>
              <strong>{reportStats.draft}</strong>
              <span>Draft</span>
            </div>
          </div>
          <div className="workflow-list">
            {seededRows.map((row) => (
              <div className="workflow-item" key={row.title}>
                <div>
                  <strong>{row.title}</strong>
                  <p>{row.secondary}</p>
                </div>
                <span className="workflow-status">{row.status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="table-card">
        <div className="table-head report-table-head">
          <span>Report</span>
          <span>Type</span>
          <span>Status</span>
          <span>Subject</span>
        </div>
        {lastActionMessage ? (
          <div className="report-action-strip">
            <strong>Latest action</strong>
            <span>{lastActionMessage}</span>
          </div>
        ) : null}
        {reports.map((report) => (
          <div className="table-row report-table-row" key={report.id}>
            <div>
              <strong>{report.id}</strong>
              <p>{report.summary}</p>
            </div>
            <div>{report.type}</div>
            <div>{report.status}</div>
            <div>
              <strong>{report.subject}</strong>
              <p>{new Date(report.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
