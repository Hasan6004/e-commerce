import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseServer.from("products").select("*");

  if (error)
    return NextResponse.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 },
    );

  return NextResponse.json({ products: data });
}
