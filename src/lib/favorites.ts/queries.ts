import { getCurrentUser } from "../auth/jwt";
import { supabaseServer } from "../supabase/server";

export async function fetchFavorites() {
  const user = await getCurrentUser();

  const { data, error } = await supabaseServer
    .from("favorites")
    .select(
      `
      product:products (*)
    `,
    )
    .eq("user_id", user?.id);

  if (error) {
    return { favorites: null, error: "خطا در دریافت محصولات موردعلاقه" };
  }

  const favorites = data?.map((item) => favoritesMapper(item));

  return { favorites, error: null };
}

export async function isFavorite(productId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  const { data, error } = await supabaseServer
    .from("favorites")
    .select("*")
    .eq("user_id", user?.id)
    .eq("product_id", productId);

  if (error) {
    return false;
  }

  return !!data?.length;
}

function favoritesMapper(item: any) {
  return {
    id: item["product"].id,
    slug: item["product"].slug,
    brand: item["product"].brand,
    name: item["product"].name,
    price: item["product"].price,
    discountPercent: item["product"].discount_percent,
    inStock: item["product"].in_stock,
    color: item["product"].color,
    category: item["product"].category,
    href: item["product"].href,
    imageSrc: item["product"].image_src,
    description: item["product"].description,
    specs: item["product"].specs,
    isActive: item["product"].is_active,
    createdAt: item["product"].created_at,
    updatedAt: item["product"].updated_at,
  };
}
