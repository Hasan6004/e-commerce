import { supabaseServer } from "@/lib/supabase/server";
import { cookies } from "next/dist/server/request/cookies";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "لطفا ابتدا وارد شوید" },
      { status: 401 },
    );
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

  const userId = (decodedToken as any).id;

  const { data, error } = await supabaseServer
    .from("favorites")
    .select(
      `
    product:products (*)
  `,
    )
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 },
    );
  }

  return NextResponse.json({ favorites: data });
}

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { productId } = reqBody;

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "لطفا ابتدا وارد شوید" },
      { status: 401 },
    );
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

  const userId = (decodedToken as any).id;

  const { data, error } = await supabaseServer
    .from("favorites")
    .insert({
      user_id: userId,
      product_id: productId,
    })
    .select();

  if (error) {
    return NextResponse.json(
      { error: "خطا در افزودن به علاقه‌مندی‌ها" },
      { status: 500 },
    );
  }

  return NextResponse.json({ favorite: data?.[0] });
}

export async function DELETE(req: NextRequest) {
  const reqBody = await req.json();
  const { productId } = reqBody;

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "لطفا ابتدا وارد شوید" },
      { status: 401 },
    );
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

  const userId = (decodedToken as any).id;

  const { data, error } = await supabaseServer
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId)
    .select();

  if (error) {
    return NextResponse.json(
      { error: "خطا در حذف از علاقه‌مندی‌ها" },
      { status: 500 },
    );
  }

  return NextResponse.json({ productId: data?.[0].product_id });
}
