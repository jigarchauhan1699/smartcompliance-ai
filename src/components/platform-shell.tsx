"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useWorkspace } from "@/components/workspace-provider";
import { defaultAppRole, normalizeAppRole, type AppRole } from "@/lib/authz";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { filterNavigationItems, filterQuickActions } from "@/lib/navigation";

type PlatformShellProps = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  authMode?: "demo" | "supabase";
  viewerName?: string;
  viewerEmail?: string;
  viewerRole?: string;
  children: React.ReactNode;
};

export function PlatformShell({
  title,
  subtitle,
  ctaLabel,
  authMode = "demo",
  viewerName,
  viewerEmail,
  viewerRole,
  children,
}: PlatformShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { isReady, logout, user } = useAuth();
  const {
    markAllNotificationsRead,
    markNotificationRead,
    notifications,
    search,
    triggerAction,
    unreadNotificationCount,
  } = useWorkspace();
  const isDemoMode = authMode === "demo";
  const activeRole: AppRole = normalizeAppRole(viewerRole ?? user?.role ?? defaultAppRole);
  const activeViewerName = viewerName ?? user?.fullName ?? "Operator";
  const activeViewerEmail = viewerEmail ?? user?.email ?? "";
  const visibleNavigation = filterNavigationItems(activeRole);
  const visibleQuickActions = filterQuickActions(activeRole);
  const searchResults = useMemo(() => search(searchQuery), [search, searchQuery]);

  useEffect(() => {
    if (isDemoMode && isReady && !user) {
      router.replace("/login");
    }
  }, [isDemoMode, isReady, router, user]);

  async function handleLogout() {
    if (isDemoMode) {
      logout();
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }

    router.push("/login");
    router.refresh();
  }

  if (isDemoMode && (!isReady || !user)) {
    return (
      <div className="auth-loading-shell">
        <div className="auth-loading-card">
          <strong>Preparing your workspace...</strong>
          <span>Checking session and loading your operator console.</span>
        </div>
      </div>
    );
  }

  function handlePrimaryAction() {
    if (pathname === "/settings") {
      window.dispatchEvent(new Event("smartcompliance-settings-save"));
      return;
    }

    if (pathname === "/dashboard") {
      triggerAction("dashboard");
      router.push("/reports");
      return;
    }

    const slug = pathname.replace("/", "");
    if (
      slug === "customer-screening" ||
      slug === "transaction-monitoring" ||
      slug === "risk-scoring" ||
      slug === "case-management" ||
      slug === "adverse-media" ||
      slug === "watchlists" ||
      slug === "reports" ||
      slug === "audit-logs"
    ) {
      triggerAction(slug);
      if (slug === "reports") {
        router.refresh();
      }
      if (slug === "audit-logs") {
        setNotificationsOpen(true);
      }
      return;
    }

    if (ctaLabel === "Generate Report") {
      router.push("/reports");
    }
  }

  return (
    <div className="platform-root">
      {sidebarOpen ? <button className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} /> : null}

      <aside className={`platform-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand-block">
          <Link className="brand-link" href="/dashboard">
            <Image src="/logo-shield.png" alt="SmartCompliance AI" width={40} height={40} />
            <div>
              <h1>SmartCompliance</h1>
              <p>AI Platform</p>
            </div>
          </Link>
          <button className="mobile-close" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="nav-stack">
          {visibleNavigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${active ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-card">
            <div className="eyebrow">Quick Actions</div>
            <div className="quick-actions">
              {visibleQuickActions.map((action) => (
                <Link key={action.href} href={action.href} className="quick-link">
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="platform-main">
        <header className="platform-header">
          <div className="header-left">
            <button className="mobile-menu" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="search-shell">
              <Search size={18} />
              <input
                placeholder="Search customers, transactions, cases..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              {searchQuery ? (
                <button className="search-clear-button" onClick={() => setSearchQuery("")} type="button">
                  <X size={14} />
                </button>
              ) : null}
            </div>
            {searchQuery ? (
              <div className="search-results-panel">
                {searchResults.length ? (
                  searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={result.href}
                      className="search-result-item"
                      onClick={() => setSearchQuery("")}
                    >
                      <strong>{result.title}</strong>
                      <p>
                        {result.kind} | {result.subtitle}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="search-result-empty">
                    <strong>No results</strong>
                    <p>Try a case ID, customer name, module, or report type.</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
          <div className="header-actions">
            <button
              className={`circle-button notification-button ${unreadNotificationCount ? "has-unread" : ""}`}
              onClick={() => setNotificationsOpen((current) => !current)}
              type="button"
            >
              <Bell size={18} />
              {unreadNotificationCount ? <span className="notification-count">{unreadNotificationCount}</span> : null}
            </button>
            <button className="circle-button" onClick={handleLogout} title="Sign out">
              <LogOut size={18} />
            </button>
            <div className="user-chip" title={activeViewerEmail}>
              <span>{activeViewerName.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
            </div>
          </div>
        </header>

        {notificationsOpen ? (
          <div className="notification-panel">
            <div className="notification-panel-header">
              <div>
                <strong>Notifications</strong>
                <p>Operational activity across reports, watchlists, and monitoring.</p>
              </div>
              <button className="secondary-button notification-mark-all" onClick={markAllNotificationsRead} type="button">
                Mark all read
              </button>
            </div>
            <div className="notification-list">
              {notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={notification.href}
                  className={`notification-item ${notification.read ? "read" : "unread"} ${notification.severity}`}
                  onClick={() => {
                    markNotificationRead(notification.id);
                    setNotificationsOpen(false);
                  }}
                >
                  <div>
                    <strong>{notification.title}</strong>
                    <p>{notification.detail}</p>
                  </div>
                  <span>{notification.timeLabel}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <main className="content-shell">
          <section className="content-header">
            <div>
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>
            {ctaLabel ? (
              <button
                className="primary-button"
                type="button"
                onClick={handlePrimaryAction}
              >
                {ctaLabel}
              </button>
            ) : null}
          </section>

          <section className="content-grid">
            <div className="content-main">{children}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
