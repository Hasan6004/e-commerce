import { supabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { firstName, lastName, email, password, role } = reqBody;

  //   Check if user already exists
  const { data: existingUser } = await supabaseServer
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    return NextResponse.json(
      { error: "کاربری با این ایمیل قبلا ثبت نام کرده است" },
      { status: 409 },
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //   Create new user
  const { data: user, error } = await supabaseServer
    .from("users")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password_hash: hashedPassword,
      role: role,
    })
    .select("id, first_name, last_name, email, role")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "خطا در ثبت نام کاربر" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: "ثبت نام با موفقیت انجام شد",
      success: true,
      user,
    },
    { status: 201 },
  );
  0;
}
