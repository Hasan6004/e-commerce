import { supabaseServer } from "../supabase/server";

export async function userLogin(email: string) {
  const { data, error } = await supabaseServer
    .from("users")
    .select("id, password_hash, role, first_name, last_name")
    .eq("email", email)
    .single();

  return { data, error };
}
