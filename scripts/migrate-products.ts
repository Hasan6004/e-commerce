import products from "@/lib/constants/products";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
const dbProducts = products.map((p) => ({
  id: p.id,
  brand: p.brand || null,
  name: p.name,
  price: p.price,
  discount_percent: p.discountPercent,
  in_stock: p.inStock,
  color: p.color || null,
  category: p.category,
  href: p.href,
  image_src: p.imageSrc,
  description: p.description,
  specs: p.specs,
}));

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const migrate = async () => {
  const { error } = await supabase.from("products").insert(dbProducts);

  if (error) {
    console.error(error);
  }
};

migrate().catch((err) => console.error(err));
