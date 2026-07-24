// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // ✅ Edge-compatible

const protectedRoutes = [
  "/adminPanel",
  "/profile",
  "/orders",
  "/checkout",
  "/addresses",
  "/paymentConfirm",
  "/account",
  "/favorites",
];

const authRoutes = ["/auth/login", "/auth/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  let user = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
      const { payload } = await jwtVerify(token, secret);
      user = payload; // ✅ Decoded JWT payload
    } catch (err) {
      console.error("JWT VERIFY ERROR:", err);
      user = null;
    }
  }

  /* =========================
     PROTECTED ROUTES
  ========================== */
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!user) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  /* =========================
     AUTH ROUTES
  ========================== */
  if (authRoutes.includes(pathname)) {
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|.*\\.).*)"],
};
