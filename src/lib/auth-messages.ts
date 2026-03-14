export function normalizeSupabaseAuthMessage(message: string, context: "signup" | "login" | "magic-link" | "reset") {
  const normalized = message.trim().toLowerCase();

  if (normalized.includes("email rate limit exceeded")) {
    if (context === "signup") {
      return "Signup is blocked because this Supabase project is throttling confirmation emails. Disable Confirm email in Supabase Auth for local testing, or add SUPABASE_SERVICE_ROLE_KEY so the first operator can be created directly without email.";
    }

    if (context === "magic-link") {
      return "Too many magic-link emails were requested. Wait a few minutes before requesting another link, or sign in with email and password instead.";
    }

    if (context === "reset") {
      return "Too many reset emails were requested. Wait a few minutes before trying again, or sign in if you still know your password.";
    }
  }

  if (normalized.includes("invalid login credentials")) {
    return "Incorrect email or password. If you already created the account, try Forgot password or use Magic Link.";
  }

  if (normalized.includes("user already registered")) {
    return "This email is already registered. Use Log in instead of Sign up.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Your account exists but email confirmation is still pending. Check your inbox or ask to disable confirmation in Supabase while testing.";
  }

  return message;
}

export function isRecoverableRateLimitMessage(message: string) {
  return message.toLowerCase().includes("rate limit");
}
