import { supabase } from "@/lib/supabase";

export async function getCurrentSessionUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);
  return session?.user ?? null;
}

export async function getMyActiveSpace() {
  const user = await getCurrentSessionUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("space_members")
    .select("space_id, role, status, spaces(id, name)")
    .eq("user_id", user.id)
    .eq("status", "active")
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}