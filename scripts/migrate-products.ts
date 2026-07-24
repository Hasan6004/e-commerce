import "dotenv/config";

import { createClient } from "@supabase/supabase-js";
import products from "@/lib/constants/products";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const dbProducts = products.map((p) => ({
  slug: p.slug,

  brand: p.brand || null,
  name: p.name,

  price: Number(p.price),
  discount_percent: p.discountPercent,
  in_stock: p.inStock,

  color: p.color || null,

  category: p.category,

  href: p.href,

  image_src: p.imageSrc,

  description: p.description,

  specs: p.specs ?? null,

  is_active: true,
}));

async function migrate() {
  const { error } = await supabase.from("products").insert(dbProducts);

  if (error) throw error;

  console.log(`${dbProducts.length} products inserted.`);
}

migrate().catch(console.error);
