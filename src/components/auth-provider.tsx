"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

import {
  createDemoUser,
  DemoUser,
  ensureDemoSeed,
  getPendingResetEmail,
  getSessionEmail,
  getUsers,
  saveUsers,
  setPendingResetEmail,
  setSessionEmail,
} from "@/lib/demo-auth";

type ProfileUpdate = Pick<DemoUser, "fullName" | "company" | "role" | "team" | "bio">;

type AuthContextValue = {
  isReady: boolean;
  user: DemoUser | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; message: string }>;
  signup: (input: {
    fullName: string;
    company: string;
    email: string;
    password: string;
  }) => Promise<{ ok: boolean; message: string }>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ ok: boolean; message: string }>;
  resetPassword: (password: string) => Promise<{ ok: boolean; message: string }>;
  verifyEmail: (email: string) => Promise<{ ok: boolean; message: string }>;
  updateProfile: (profile: ProfileUpdate) => Promise<{ ok: boolean; message: string }>;
  pendingResetEmail: string | null;
};

type AuthSnapshot = {
  isReady: boolean;
  user: DemoUser | null;
  pendingResetEmail: string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const SERVER_SNAPSHOT: AuthSnapshot = {
  isReady: false,
  user: null,
  pendingResetEmail: null,
};

let cachedSnapshotKey = "";
let cachedSnapshot: AuthSnapshot = SERVER_SNAPSHOT;

function emitAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("smartcompliance-auth-change"));
  }
}

function getAuthSnapshot(): AuthSnapshot {
  if (typeof window === "undefined") {
    return SERVER_SNAPSHOT;
  }

  ensureDemoSeed();
  const users = getUsers();
  const sessionEmail = getSessionEmail();
  const user = users.find((item) => item.email.toLowerCase() === sessionEmail?.toLowerCase()) ?? null;
  const pendingResetEmail = getPendingResetEmail();
  const snapshotKey = JSON.stringify({
    sessionEmail,
    pendingResetEmail,
    users,
  });

  if (snapshotKey === cachedSnapshotKey) {
    return cachedSnapshot;
  }

  cachedSnapshotKey = snapshotKey;
  cachedSnapshot = {
    isReady: true,
    user,
    pendingResetEmail,
  };
  return cachedSnapshot;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener("smartcompliance-auth-change", handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("smartcompliance-auth-change", handler);
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getAuthSnapshot, () => SERVER_SNAPSHOT);

  const value = useMemo<AuthContextValue>(
    () => ({
      isReady: snapshot.isReady,
      user: snapshot.user,
      pendingResetEmail: snapshot.pendingResetEmail,
      async login(email, password) {
        const found = getUsers().find((item) => item.email.toLowerCase() === email.toLowerCase());
        if (!found) {
          return { ok: false, message: "No operator account found for that email." };
        }
        if (!found.verified) {
          return { ok: false, message: "Email not verified yet. Complete the verification step first." };
        }
        if (found.password !== password) {
          return { ok: false, message: "Incorrect password." };
        }

        setSessionEmail(found.email);
        emitAuthChange();
        return { ok: true, message: "Signed in successfully." };
      },
      async signup(input) {
        const users = getUsers();
        const exists = users.some((item) => item.email.toLowerCase() === input.email.toLowerCase());
        if (exists) {
          return { ok: false, message: "An account with that email already exists." };
        }

        const newUser = createDemoUser(input);
        saveUsers([...users, newUser]);
        emitAuthChange();
        return { ok: true, message: "Account created. Verify the email to continue." };
      },
      logout() {
        setSessionEmail(null);
        emitAuthChange();
      },
      async requestPasswordReset(email) {
        const found = getUsers().find((item) => item.email.toLowerCase() === email.toLowerCase());
        if (!found) {
          return { ok: false, message: "No operator account found for that email." };
        }

        setPendingResetEmail(email);
        emitAuthChange();
        return { ok: true, message: "Reset request created. Continue to the reset page." };
      },
      async resetPassword(password) {
        const email = snapshot.pendingResetEmail ?? getPendingResetEmail();
        if (!email) {
          return { ok: false, message: "No pending reset request found." };
        }

        const users = getUsers();
        const nextUsers = users.map((item) =>
          item.email.toLowerCase() === email.toLowerCase() ? { ...item, password } : item,
        );
        saveUsers(nextUsers);
        setPendingResetEmail(null);
        emitAuthChange();
        return { ok: true, message: "Password updated successfully." };
      },
      async verifyEmail(email) {
        const users = getUsers();
        const target = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
        if (!target) {
          return { ok: false, message: "Account not found." };
        }

        const nextUsers = users.map((item) =>
          item.email.toLowerCase() === email.toLowerCase() ? { ...item, verified: true } : item,
        );
        saveUsers(nextUsers);
        emitAuthChange();
        return { ok: true, message: "Email verified. You can sign in now." };
      },
      async updateProfile(profile) {
        if (!snapshot.user) {
          return { ok: false, message: "No active session." };
        }

        const users = getUsers();
        const nextUsers = users.map((item) =>
          item.email.toLowerCase() === snapshot.user?.email.toLowerCase() ? { ...item, ...profile } : item,
        );
        saveUsers(nextUsers);
        emitAuthChange();
        return { ok: true, message: "Profile updated." };
      },
    }),
    [snapshot],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
