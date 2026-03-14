export type DemoUser = {
  id: string;
  fullName: string;
  company: string;
  email: string;
  role: string;
  team: string;
  bio: string;
  password: string;
  verified: boolean;
};

const USERS_KEY = "smartcompliance.demo.users";
const SESSION_KEY = "smartcompliance.demo.session";
const RESET_EMAIL_KEY = "smartcompliance.demo.reset-email";

const defaultUser: DemoUser = {
  id: "demo-1",
  fullName: "Kavya Patel",
  company: "Northstar Fintech",
  email: "analyst@smartcompliance.demo",
  role: "Compliance Manager",
  team: "Enhanced Due Diligence",
  bio: "Leads onboarding and complex EDD investigations for high-risk customer cohorts.",
  password: "DemoPass123!",
  verified: true,
};

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

export function ensureDemoSeed() {
  const storage = getStorage();
  if (!storage) return;

  const raw = storage.getItem(USERS_KEY);
  if (!raw) {
    storage.setItem(USERS_KEY, JSON.stringify([defaultUser]));
  }
}

export function getUsers(): DemoUser[] {
  const storage = getStorage();
  if (!storage) return [defaultUser];

  ensureDemoSeed();
  const raw = storage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as DemoUser[]) : [defaultUser];
}

export function saveUsers(users: DemoUser[]) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSessionEmail() {
  const storage = getStorage();
  return storage?.getItem(SESSION_KEY) ?? null;
}

export function setSessionEmail(email: string | null) {
  const storage = getStorage();
  if (!storage) return;

  if (email) {
    storage.setItem(SESSION_KEY, email);
  } else {
    storage.removeItem(SESSION_KEY);
  }
}

export function getPendingResetEmail() {
  const storage = getStorage();
  return storage?.getItem(RESET_EMAIL_KEY) ?? null;
}

export function setPendingResetEmail(email: string | null) {
  const storage = getStorage();
  if (!storage) return;

  if (email) {
    storage.setItem(RESET_EMAIL_KEY, email);
  } else {
    storage.removeItem(RESET_EMAIL_KEY);
  }
}

export function createDemoUser(input: Pick<DemoUser, "fullName" | "company" | "email" | "password">): DemoUser {
  return {
    id: `demo-${Date.now()}`,
    fullName: input.fullName,
    company: input.company,
    email: input.email,
    password: input.password,
    role: "Compliance Analyst",
    team: "Onboarding Review",
    bio: "New operator account created in demo mode.",
    verified: false,
  };
}
