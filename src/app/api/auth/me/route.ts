import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

  const { data: user } = await supabaseServer
    .from("users")
    .select("id, first_name, last_name, email, role")
    .eq("id", (decodedToken as any).id)
    .single();

  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
    },
  });
}
