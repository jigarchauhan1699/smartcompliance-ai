import { type DataRow, moduleContent } from "@/lib/module-content";

export type GeneratedReport = {
  id: string;
  title: string;
  type: "SAR" | "CTR" | "Board Summary" | "Regulator Export";
  status: "Draft" | "Ready" | "Submitted";
  subject: string;
  createdAt: string;
  summary: string;
  caseId?: string;
};

export type WorkspaceNotification = {
  id: string;
  title: string;
  detail: string;
  timeLabel: string;
  read: boolean;
  href: string;
  severity: "info" | "warning" | "critical";
};

export type WorkspaceSearchResult = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  kind: "module" | "record" | "report" | "notification";
};

export type ModuleActionSlug =
  | "customer-screening"
  | "transaction-monitoring"
  | "risk-scoring"
  | "case-management"
  | "adverse-media"
  | "watchlists"
  | "reports"
  | "dashboard"
  | "audit-logs";

export type DemoWorkspaceState = {
  reports: GeneratedReport[];
  notifications: WorkspaceNotification[];
  moduleRows: Record<string, DataRow[]>;
  lastActionMessage: string;
};

const STORAGE_KEY = "smartcompliance.workspace.state";

function buildDefaultModuleRows() {
  return Object.fromEntries(
    Object.entries(moduleContent).map(([slug, content]) => [slug, content.rows]),
  ) as Record<string, DataRow[]>;
}

function hydrateWorkspaceState(rawState: Partial<DemoWorkspaceState> | null | undefined): DemoWorkspaceState {
  const defaultModuleRows = buildDefaultModuleRows();

  return {
    reports: rawState?.reports ?? defaultState.reports,
    notifications: rawState?.notifications ?? defaultState.notifications,
    moduleRows: {
      ...defaultModuleRows,
      ...(rawState?.moduleRows ?? {}),
    },
    lastActionMessage: rawState?.lastActionMessage ?? "",
  };
}

const defaultState: DemoWorkspaceState = {
  reports: [
    {
      id: "SAR-2026-118",
      title: "Suspicious Activity Report",
      type: "SAR",
      status: "Ready",
      subject: "Fatima Rahman",
      caseId: "CASE-1042",
      createdAt: "2026-03-14T09:20:00.000Z",
      summary: "Cross-border transfer spike with PEP overlap and unresolved supporting evidence.",
    },
    {
      id: "CTR-2026-077",
      title: "Currency Transaction Report",
      type: "CTR",
      status: "Submitted",
      subject: "Northstar Fintech cash corridor",
      createdAt: "2026-03-14T08:50:00.000Z",
      summary: "Threshold-triggered filing generated from monitoring cluster and exported successfully.",
    },
    {
      id: "BRD-2026-030",
      title: "Board Compliance Summary",
      type: "Board Summary",
      status: "Draft",
      subject: "Monthly operations snapshot",
      createdAt: "2026-03-13T18:10:00.000Z",
      summary: "Executive summary of alerts, case throughput, reporting status, and watchlist changes.",
    },
  ],
  notifications: [
    {
      id: "notif-1",
      title: "SAR ready for approval",
      detail: "CASE-1042 filing pack is ready for MLRO review.",
      timeLabel: "2 min ago",
      read: false,
      href: "/reports",
      severity: "critical",
    },
    {
      id: "notif-2",
      title: "Watchlist sync completed",
      detail: "OFAC and EU source refresh finished with 3 new aliases.",
      timeLabel: "12 min ago",
      read: false,
      href: "/watchlists",
      severity: "info",
    },
    {
      id: "notif-3",
      title: "Velocity cluster escalated",
      detail: "TRX-81291 triggered corridor escalation into case management.",
      timeLabel: "29 min ago",
      read: true,
      href: "/transaction-monitoring",
      severity: "warning",
    },
  ],
  moduleRows: buildDefaultModuleRows(),
  lastActionMessage: "",
};

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

function nowStamp() {
  return new Date().toISOString();
}

function nowLabel() {
  return "Just now";
}

function makeNotification(input: Omit<WorkspaceNotification, "id" | "timeLabel" | "read">): WorkspaceNotification {
  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timeLabel: nowLabel(),
    read: false,
    ...input,
  };
}

export function ensureWorkspaceSeed() {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  if (!storage.getItem(STORAGE_KEY)) {
    storage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
  }
}

export function getWorkspaceState(): DemoWorkspaceState {
  const storage = getStorage();
  if (!storage) {
    return defaultState;
  }

  ensureWorkspaceSeed();
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultState;
  }

  return hydrateWorkspaceState(JSON.parse(raw) as Partial<DemoWorkspaceState>);
}

export function saveWorkspaceState(state: DemoWorkspaceState) {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function emitWorkspaceChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("smartcompliance-workspace-change"));
  }
}

function slugToHref(slug: string) {
  return `/${slug}`;
}

export function getModuleRows(state: DemoWorkspaceState, slug: string) {
  return state.moduleRows?.[slug] ?? moduleContent[slug]?.rows ?? [];
}

export function searchWorkspace(state: DemoWorkspaceState, query: string): WorkspaceSearchResult[] {
  const term = query.trim().toLowerCase();
  if (!term) {
    return [];
  }

  const moduleResults: WorkspaceSearchResult[] = Object.entries(moduleContent)
    .flatMap(([slug, content]) => {
      const base: WorkspaceSearchResult[] = [];
      const matchesModule =
        content.title.toLowerCase().includes(term) ||
        content.subtitle.toLowerCase().includes(term) ||
        slug.includes(term);

      if (matchesModule) {
        base.push({
          id: `module-${slug}`,
          title: content.title,
          subtitle: content.subtitle,
          href: slugToHref(slug),
          kind: "module",
        });
      }

      return [
        ...base,
        ...getModuleRows(state, slug)
          .filter(
            (row) =>
              row.title.toLowerCase().includes(term) ||
              row.secondary.toLowerCase().includes(term) ||
              row.detail.toLowerCase().includes(term),
          )
          .map((row) => ({
            id: `row-${slug}-${row.title}`,
            title: row.title,
            subtitle: `${content.title} | ${row.secondary}`,
            href: slugToHref(slug),
            kind: "record" as const,
          })),
      ];
    })
    .slice(0, 8);

  const reportResults = state.reports
    .filter(
      (report) =>
        report.id.toLowerCase().includes(term) ||
        report.title.toLowerCase().includes(term) ||
        report.subject.toLowerCase().includes(term) ||
        report.summary.toLowerCase().includes(term),
    )
    .map((report) => ({
      id: `report-${report.id}`,
      title: `${report.id} | ${report.title}`,
      subtitle: `${report.status} | ${report.subject}`,
      href: "/reports",
      kind: "report" as const,
    }));

  const notificationResults = state.notifications
    .filter(
      (notification) =>
        notification.title.toLowerCase().includes(term) || notification.detail.toLowerCase().includes(term),
    )
    .map((notification) => ({
      id: `notification-${notification.id}`,
      title: notification.title,
      subtitle: notification.detail,
      href: notification.href,
      kind: "notification" as const,
    }));

  return [...moduleResults, ...reportResults, ...notificationResults].slice(0, 10);
}

export function createGeneratedReport(
  state: DemoWorkspaceState,
  input: {
    type: GeneratedReport["type"];
    subject: string;
    caseId?: string;
  },
) {
  const idPrefix =
    input.type === "SAR"
      ? "SAR"
      : input.type === "CTR"
        ? "CTR"
        : input.type === "Board Summary"
          ? "BRD"
          : "EXP";
  const id = `${idPrefix}-2026-${String(state.reports.length + 119).padStart(3, "0")}`;
  const createdAt = nowStamp();
  const nextReport: GeneratedReport = {
    id,
    title:
      input.type === "Regulator Export"
        ? "Regulator Export Package"
        : input.type === "Board Summary"
          ? "Board Compliance Summary"
          : input.type === "CTR"
            ? "Currency Transaction Report"
            : "Suspicious Activity Report",
    type: input.type,
    status: input.type === "Regulator Export" ? "Ready" : "Draft",
    subject: input.subject,
    caseId: input.caseId,
    createdAt,
    summary: `Generated ${input.type} for ${input.subject} using seeded case evidence, transaction activity, and analyst commentary.`,
  };

  return {
    state: {
      ...state,
      reports: [nextReport, ...state.reports],
      notifications: [
        makeNotification({
          title: `${nextReport.id} generated`,
          detail: `${nextReport.title} is ready in the reports workspace.`,
          href: "/reports",
          severity: "info",
        }),
        ...state.notifications,
      ],
      lastActionMessage: `${nextReport.id} generated successfully.`,
    },
    report: nextReport,
  };
}

export function triggerModuleAction(state: DemoWorkspaceState, slug: ModuleActionSlug) {
  if (slug === "reports" || slug === "dashboard") {
    const reportResult = createGeneratedReport(state, {
      type: slug === "dashboard" ? "Board Summary" : "SAR",
      subject: slug === "dashboard" ? "Operations dashboard snapshot" : "Fatima Rahman",
      caseId: slug === "dashboard" ? undefined : "CASE-1042",
    });
    return {
      state: reportResult.state,
      message:
        slug === "dashboard"
          ? `Executive report ${reportResult.report.id} generated.`
          : `Report ${reportResult.report.id} generated.`,
    };
  }

  if (slug === "audit-logs") {
    return {
      state: {
        ...state,
        notifications: [
          makeNotification({
            title: "Audit log export prepared",
            detail: "Immutable audit package is ready for download in the audit workspace.",
            href: "/audit-logs",
            severity: "info",
          }),
          ...state.notifications,
        ],
        lastActionMessage: "Audit log export prepared successfully.",
      },
      message: "Audit log export prepared successfully.",
    };
  }

  const definitions: Record<
    Exclude<ModuleActionSlug, "reports" | "dashboard" | "audit-logs">,
    { row: DataRow; message: string; notification: Omit<WorkspaceNotification, "id" | "timeLabel" | "read"> }
  > = {
    "customer-screening": {
      row: {
        title: `Screen-${Date.now().toString().slice(-4)}`,
        secondary: "Passport + selfie matched",
        risk: "medium",
        status: "Queued",
        detail: "Fresh screening batch added with seeded identity evidence.",
      },
      message: "New customer screening run created.",
      notification: {
        title: "Screening batch created",
        detail: "A new onboarding screening run was created and added to analyst review.",
        href: "/customer-screening",
        severity: "info",
      },
    },
    "transaction-monitoring": {
      row: {
        title: `RULE-${Date.now().toString().slice(-4)}`,
        secondary: "Velocity > 5 transfers / 30m",
        risk: "high",
        status: "Active",
        detail: "New monitoring rule now watches burst behavior in seeded transaction data.",
      },
      message: "Transaction monitoring rule created.",
      notification: {
        title: "Monitoring rule activated",
        detail: "A new high-risk velocity rule is now active.",
        href: "/transaction-monitoring",
        severity: "warning",
      },
    },
    "risk-scoring": {
      row: {
        title: `MODEL-${Date.now().toString().slice(-4)}`,
        secondary: "Portfolio factor snapshot",
        risk: "low",
        status: "Exported",
        detail: "Explainability package exported with seeded score drivers and evidence.",
      },
      message: "Risk model export created.",
      notification: {
        title: "Model view exported",
        detail: "Risk scoring explainability export is ready for review.",
        href: "/risk-scoring",
        severity: "info",
      },
    },
    "case-management": {
      row: {
        title: `CASE-${Date.now().toString().slice(-4)}`,
        secondary: "Newly assigned seeded investigation",
        risk: "medium",
        status: "Assigned",
        detail: "Assigned to current analyst queue with linked evidence bundle.",
      },
      message: "Case assigned successfully.",
      notification: {
        title: "Case assigned",
        detail: "A new investigation case was routed to the active analyst queue.",
        href: "/case-management",
        severity: "warning",
      },
    },
    "adverse-media": {
      row: {
        title: "Enforcement bulletin refresh",
        secondary: "New publisher set scanned",
        risk: "medium",
        status: "Updated",
        detail: "Source refresh completed and new adverse media matches were added.",
      },
      message: "Media sources refreshed.",
      notification: {
        title: "Adverse media refreshed",
        detail: "Fresh source scan completed with new seeded article matches.",
        href: "/adverse-media",
        severity: "info",
      },
    },
    watchlists: {
      row: {
        title: `Custom Watchlist ${Date.now().toString().slice(-3)}`,
        secondary: "Uploaded internal entity set",
        risk: "high",
        status: "Draft",
        detail: "Seeded watchlist upload created and queued for approval.",
      },
      message: "Watchlist uploaded successfully.",
      notification: {
        title: "Watchlist upload received",
        detail: "A new custom list was uploaded and added to review.",
        href: "/watchlists",
        severity: "critical",
      },
    },
  };

  const definition = definitions[slug];
  const existingRows = getModuleRows(state, slug);

  return {
    state: {
      ...state,
      moduleRows: {
        ...state.moduleRows,
        [slug]: [definition.row, ...existingRows],
      },
      notifications: [makeNotification(definition.notification), ...state.notifications],
      lastActionMessage: definition.message,
    },
    message: definition.message,
  };
}
