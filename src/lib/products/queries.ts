import { isFavorite } from "../favorites.ts/queries";
import { supabaseServer } from "../supabase/server";

type ProductFilters = {
  list?: "all" | "discounted";
  limit?: number;
  category?: string;
};

export async function getProducts(options: ProductFilters = {}) {
  const { list, category, limit = 0 } = options;

  let query = supabaseServer.from("products").select("*");

  if (list === "discounted") {
    query = query.gt("discount_percent", 0);
  }

  if (list === "discounted" && limit > 0) {
    query = query.limit(limit);
  }

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    return { products: null, error: "خطا در دریافت محصولات" };
  }

  const mappedData = data?.map((product) => productMapper(product));

  return { products: mappedData, error: null };
}

export async function getProduct(slug: string) {
  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return { product: null, error: "خطا در دریافت محصول" };
  }

  const isFavoriteResult = await isFavorite(data.id);

  return {
    product: productMapper(data),
    isFavorite: isFavoriteResult,
    error: null,
  };
}

function productMapper(product: any) {
  return {
    id: product.id,
    slug: product.slug,
    brand: product.brand,
    name: product.name,
    price: product.price,
    discountPercent: product.discount_percent,
    inStock: product.in_stock,
    color: product.color,
    category: product.category,
    href: product.href,
    imageSrc: product.image_src,
    description: product.description,
    specs: product.specs,
    isActive: product.is_active,
    createdAt: product.created_at,
    updatedAt: product.updated_at,
  };
}
