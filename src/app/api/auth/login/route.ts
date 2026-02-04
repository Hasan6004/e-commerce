import { supabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    //   Check if user exists
    const { data, error } = await supabaseServer
      .from("users")
      .select("id, password_hash, role, first_name, last_name")
      .eq("email", email)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "کاربری با این ایمیل یافت نشد" },
        { status: 400 },
      );
    }

    //   Check if password is correct
    const validPassword = await bcrypt.compare(password, data.password_hash);

    if (!validPassword) {
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور اشتباه است" },
        { status: 400 },
      );
    }

    //   Create token
    const tokenData = {
      id: data.id,
      role: data.role,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "ورود با موفقیت انجام شد",
      success: true,
      user: {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: email,
        role: data.role,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
