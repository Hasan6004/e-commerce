// import { cookies } from "next/dist/server/request/cookies";
import { NextRequest, NextResponse } from "next/server";
// import { fetchFavorites } from "@/lib/favorites.ts/queries";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/lib/favorites.ts/mutations";

// export async function GET() {
//   const token = (await cookies()).get("token")?.value;
//   if (!token) {
//     return NextResponse.json(
//       { error: "لطفا ابتدا وارد شوید" },
//       { status: 401 },
//     );
//   }

//   const { favorites, error } = await fetchFavorites();

//   if (error) {
//     return NextResponse.json(
//       { error: "خطا در دریافت محصولات" },
//       { status: 500 },
//     );
//   }

//   return NextResponse.json({ favorites, error: null });
// }

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

  const { favorite, error } = await addToFavorites(productId);

  if (error) {
    return NextResponse.json(
      { error: "خطا در افزودن به علاقه‌مندی‌ها" },
      { status: 500 },
    );
  }

  return NextResponse.json({ favorite });
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

  const { favorite, error } = await removeFromFavorites(productId);

  if (error) {
    return NextResponse.json(
      { error: "خطا در حذف از علاقه‌مندی‌ها" },
      { status: 500 },
    );
  }

  return NextResponse.json({ favorite });
}
