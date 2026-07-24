import { getProducts } from "@/lib/products/product";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await getProducts();

  if (response.error)
    return NextResponse.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 },
    );

  return NextResponse.json({ products: response.products });
}
