"use client";

import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useWorkspace } from "@/components/workspace-provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const settingsTabs = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "integrations", label: "Integrations" },
  { id: "appearance", label: "Appearance" },
] as const;

type SettingsTab = (typeof settingsTabs)[number]["id"];

type SettingsWorkspaceProps = {
  mode?: "demo" | "supabase";
  initialProfile?: {
    fullName: string;
    email: string;
    role: string;
    team: string;
    company: string;
    bio: string;
  };
};

export function SettingsWorkspace({ mode = "demo", initialProfile }: SettingsWorkspaceProps) {
  const { updateProfile, user } = useAuth();
  const { setActionMessage } = useWorkspace();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [message, setMessage] = useState(
    mode === "supabase" ? "Profile changes update your Supabase account metadata." : "Profile changes save locally in demo mode.",
  );
  const [profile, setProfile] = useState({
    fullName: initialProfile?.fullName ?? user?.fullName ?? "",
    email: initialProfile?.email ?? user?.email ?? "",
    role: initialProfile?.role ?? user?.role ?? "",
    team: initialProfile?.team ?? user?.team ?? "",
    company: initialProfile?.company ?? user?.company ?? "",
    bio: initialProfile?.bio ?? user?.bio ?? "",
  });

  const handleProfileSave = useCallback(async () => {
    if (mode === "supabase") {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setMessage("Supabase client unavailable.");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profile.fullName,
          team: profile.team,
          company: profile.company,
          bio: profile.bio,
        },
      });

      const nextMessage = error ? error.message : "Profile updated.";
      setMessage(nextMessage);
      setActionMessage(nextMessage);
      return;
    }

    const result = await updateProfile({
      fullName: profile.fullName,
      company: profile.company,
      role: profile.role,
      team: profile.team,
      bio: profile.bio,
    });
    setMessage(result.message);
    setActionMessage(result.message);
  }, [mode, profile, setActionMessage, updateProfile]);

  useEffect(() => {
    const handler = () => {
      void handleProfileSave();
    };

    window.addEventListener("smartcompliance-settings-save", handler);
    return () => window.removeEventListener("smartcompliance-settings-save", handler);
  }, [handleProfileSave]);

  return (
    <div className="settings-workspace">
      <section className="settings-tab-row">
        {settingsTabs.map((tab) => (
          <button
            key={tab.id}
            className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </section>

      {activeTab === "profile" ? (
        <section className="settings-grid">
          <article className="settings-card">
            <h3>Operator profile</h3>
            <div className="settings-form-grid">
              <label>
                Full name
                <input
                  value={profile.fullName}
                  onChange={(event) => setProfile((current) => ({ ...current, fullName: event.target.value }))}
                />
              </label>
              <label>
                Work email
                <input value={profile.email} disabled />
              </label>
              <label>
                Role
                <input
                  value={profile.role}
                  onChange={(event) => setProfile((current) => ({ ...current, role: event.target.value }))}
                  disabled={mode === "supabase"}
                />
              </label>
              <label>
                Team
                <input
                  value={profile.team}
                  onChange={(event) => setProfile((current) => ({ ...current, team: event.target.value }))}
                />
              </label>
              <label>
                Institution
                <input
                  value={profile.company}
                  onChange={(event) => setProfile((current) => ({ ...current, company: event.target.value }))}
                />
              </label>
            </div>
            <label>
              Bio
              <textarea
                value={profile.bio}
                onChange={(event) => setProfile((current) => ({ ...current, bio: event.target.value }))}
              />
            </label>
            <div className="settings-actions">
              <button className="primary-button" onClick={handleProfileSave} type="button">
                Save Profile
              </button>
              <span className="settings-message">{message}</span>
            </div>
          </article>
          <article className="settings-card">
            <h3>Workspace identity</h3>
            <div className="settings-stats">
              <div>
                <strong>94%</strong>
                <span>MFA adoption</span>
              </div>
              <div>
                <strong>8</strong>
                <span>Connected tools</span>
              </div>
              <div>
                <strong>3</strong>
                <span>Pending invites</span>
              </div>
            </div>
            <div className="settings-note-card">
              <strong>Manager note</strong>
              <p>Profile data is used in audit logs, case assignments, and regulator exports. Keep it accurate.</p>
            </div>
          </article>
        </section>
      ) : null}

      {activeTab === "security" ? (
        <section className="settings-grid">
          <article className="settings-card">
            <h3>Authentication controls</h3>
            <div className="settings-list">
              <div className="settings-list-row">
                <span>Single Sign-On</span>
                <strong>Enabled</strong>
              </div>
              <div className="settings-list-row">
                <span>Multi-factor Authentication</span>
                <strong>Required</strong>
              </div>
              <div className="settings-list-row">
                <span>Session timeout</span>
                <strong>30 minutes</strong>
              </div>
              <div className="settings-list-row">
                <span>Password rotation</span>
                <strong>90 days</strong>
              </div>
            </div>
          </article>
          <article className="settings-card">
            <h3>Recent access</h3>
            <div className="workflow-list">
              <div className="workflow-item">
                <div>
                  <strong>Chrome on macOS</strong>
                  <p>Ahmedabad, India | 2 minutes ago</p>
                </div>
                <span className="workflow-status">Current</span>
              </div>
              <div className="workflow-item">
                <div>
                  <strong>Safari on iPhone</strong>
                  <p>Ahmedabad, India | Yesterday</p>
                </div>
                <span className="workflow-status">Trusted</span>
              </div>
            </div>
          </article>
        </section>
      ) : null}

      {activeTab === "notifications" ? (
        <section className="settings-grid">
          <article className="settings-card">
            <h3>Alert routing</h3>
            <div className="settings-list">
              <div className="settings-list-row">
                <span>High-risk screening alerts</span>
                <strong>Email + Slack</strong>
              </div>
              <div className="settings-list-row">
                <span>Case escalation notices</span>
                <strong>Slack only</strong>
              </div>
              <div className="settings-list-row">
                <span>Report submission updates</span>
                <strong>Email digest</strong>
              </div>
            </div>
          </article>
          <article className="settings-card">
            <h3>Digest schedule</h3>
            <div className="settings-note-card">
              <strong>08:30 IST</strong>
              <p>Daily analyst queue digest with overnight alerts, pending EDD items, and filing deadlines.</p>
            </div>
            <div className="settings-note-card">
              <strong>18:00 IST</strong>
              <p>End-of-day operational summary for managers and risk leadership.</p>
            </div>
          </article>
        </section>
      ) : null}

      {activeTab === "integrations" ? (
        <section className="settings-grid">
          <article className="settings-card">
            <h3>Connected systems</h3>
            <div className="workflow-list">
              <div className="workflow-item">
                <div>
                  <strong>Supabase</strong>
                  <p>Primary app database and auth provider</p>
                </div>
                <span className="workflow-status">Connected</span>
              </div>
              <div className="workflow-item">
                <div>
                  <strong>Slack</strong>
                  <p>#aml-ops high-risk routing</p>
                </div>
                <span className="workflow-status">Connected</span>
              </div>
              <div className="workflow-item">
                <div>
                  <strong>OFAC Sync</strong>
                  <p>Nightly sanctions refresh</p>
                </div>
                <span className="workflow-status">Healthy</span>
              </div>
            </div>
          </article>
          <article className="settings-card">
            <h3>API usage</h3>
            <div className="settings-stats">
              <div>
                <strong>3.8M</strong>
                <span>Requests / 30d</span>
              </div>
              <div>
                <strong>99.97%</strong>
                <span>Webhook success</span>
              </div>
              <div>
                <strong>420ms</strong>
                <span>P95 latency</span>
              </div>
            </div>
          </article>
        </section>
      ) : null}

      {activeTab === "appearance" ? (
        <section className="settings-grid">
          <article className="settings-card">
            <h3>Interface preferences</h3>
            <div className="settings-list">
              <div className="settings-list-row">
                <span>Theme mode</span>
                <strong>Light</strong>
              </div>
              <div className="settings-list-row">
                <span>Density</span>
                <strong>Comfortable</strong>
              </div>
              <div className="settings-list-row">
                <span>High contrast data mode</span>
                <strong>Enabled</strong>
              </div>
            </div>
          </article>
          <article className="settings-card">
            <h3>Design rationale</h3>
            <div className="settings-note-card">
              <strong>Why this layout</strong>
              <p>
                Compliance products need consistent spacing, predictable cards, and restrained accents. Theme colors are
                now applied to graphs and active controls without reducing legibility.
              </p>
            </div>
          </article>
        </section>
      ) : null}
    </div>
  );
}
