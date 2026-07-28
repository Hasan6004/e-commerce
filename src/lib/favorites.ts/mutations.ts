import { getCurrentUser } from "../auth/jwt";
import { supabaseServer } from "../supabase/server";

export async function addToFavorites(productId: number) {
  const user = await getCurrentUser();

  const { data, error } = await supabaseServer
    .from("favorites")
    .insert({
      user_id: user?.id,
      product_id: productId,
    })
    .select();

  if (error) {
    return { favorite: null, error: "خطا در افزودن به علاقه‌مندی‌ها" };
  }

  return { favorite: data[0], error: null };
}

export async function removeFromFavorites(productId: number) {
  const user = await getCurrentUser();

  const { data, error } = await supabaseServer
    .from("favorites")
    .delete()
    .eq("user_id", user?.id)
    .eq("product_id", productId)
    .select();

  if (error) {
    return { favorite: null, error };
  }

  return { favorite: data[0], error: null };
}
