import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      messaage: "Logout successful",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Logout failed",
      },
      { status: 500 },
    );
  }
}
