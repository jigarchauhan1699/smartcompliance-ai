import { redirect } from "next/navigation";

import { canAccessRole, getAllowedRolesForPath, getUserRole } from "@/lib/authz";
import { hasSupabaseEnv } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getServerAuthUser() {
  if (hasSupabaseEnv) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        return user;
      }
    }
  }

  return null;
}

export async function requireServerAuthUser() {
  const user = await getServerAuthUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireServerRole(pathname: string) {
  const user = await requireServerAuthUser();
  const allowedRoles = getAllowedRolesForPath(pathname);

  if (!allowedRoles) {
    return user;
  }

  const role = getUserRole(user);
  if (!canAccessRole(allowedRoles, role)) {
    redirect("/unauthorized");
  }

  return user;
}
