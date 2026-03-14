"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

import {
  createGeneratedReport,
  emitWorkspaceChange,
  ensureWorkspaceSeed,
  getModuleRows,
  getWorkspaceState,
  saveWorkspaceState,
  searchWorkspace,
  triggerModuleAction,
  type DemoWorkspaceState,
  type GeneratedReport,
  type ModuleActionSlug,
  type WorkspaceSearchResult,
} from "@/lib/demo-workspace";
import type { DataRow } from "@/lib/module-content";

type WorkspaceContextValue = {
  reports: DemoWorkspaceState["reports"];
  notifications: DemoWorkspaceState["notifications"];
  unreadNotificationCount: number;
  lastActionMessage: string;
  createReport: (input: { type: GeneratedReport["type"]; subject: string; caseId?: string }) => GeneratedReport;
  triggerAction: (slug: ModuleActionSlug) => string;
  getRowsForModule: (slug: string) => DataRow[];
  setActionMessage: (message: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  search: (query: string) => WorkspaceSearchResult[];
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);
const SERVER_SNAPSHOT: DemoWorkspaceState = {
  reports: [],
  notifications: [],
  moduleRows: {},
  lastActionMessage: "",
};
let cachedSnapshotKey = "";
let cachedSnapshot: DemoWorkspaceState = SERVER_SNAPSHOT;

function getSnapshot(): DemoWorkspaceState {
  if (typeof window === "undefined") {
    return SERVER_SNAPSHOT;
  }

  ensureWorkspaceSeed();
  const snapshot = getWorkspaceState();
  const snapshotKey = JSON.stringify(snapshot);

  if (snapshotKey === cachedSnapshotKey) {
    return cachedSnapshot;
  }

  cachedSnapshotKey = snapshotKey;
  cachedSnapshot = snapshot;
  return cachedSnapshot;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener("smartcompliance-workspace-change", handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("smartcompliance-workspace-change", handler);
  };
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      reports: snapshot.reports,
      notifications: snapshot.notifications,
      unreadNotificationCount: snapshot.notifications.filter((item) => !item.read).length,
      lastActionMessage: snapshot.lastActionMessage,
      createReport(input) {
        const nextResult = createGeneratedReport(snapshot, input);
        saveWorkspaceState(nextResult.state);
        emitWorkspaceChange();
        return nextResult.report;
      },
      triggerAction(slug) {
        const nextResult = triggerModuleAction(snapshot, slug);
        saveWorkspaceState(nextResult.state);
        emitWorkspaceChange();
        return nextResult.message;
      },
      getRowsForModule(slug) {
        return getModuleRows(snapshot, slug);
      },
      setActionMessage(message) {
        const nextState = {
          ...snapshot,
          lastActionMessage: message,
        };
        saveWorkspaceState(nextState);
        emitWorkspaceChange();
      },
      markNotificationRead(id) {
        const nextState = {
          ...snapshot,
          notifications: snapshot.notifications.map((item) => (item.id === id ? { ...item, read: true } : item)),
        };
        saveWorkspaceState(nextState);
        emitWorkspaceChange();
      },
      markAllNotificationsRead() {
        const nextState = {
          ...snapshot,
          notifications: snapshot.notifications.map((item) => ({ ...item, read: true })),
        };
        saveWorkspaceState(nextState);
        emitWorkspaceChange();
      },
      search(query) {
        return searchWorkspace(snapshot, query);
      },
    }),
    [snapshot],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }

  return context;
}
