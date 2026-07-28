import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { supabaseServer } from "../supabase/server";

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    let query = await supabaseServer
      .from("users")
      .select("*")
      .eq("id", payload.id)
      .single();

    if (query.error) {
      return null;
    }

    return query.data;
  } catch (error) {
    return null;
  }
}
