import "dotenv/config";
import fs from "fs";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function migrate() {
  const raw = fs.readFileSync("data.json", "utf8");
  const { users, addresses, orders, favorites } = JSON.parse(raw);

  const userIdMap = new Map<number, string>();

  console.log("👤 Migrating users...");
  for (const user of users) {
    const password_hash = await bcrypt.hash(user.password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password_hash,
        role: user.role,
        phone: user.phone ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    userIdMap.set(user.id, data.id);
  }

  console.log("🏠 Migrating addresses...");
  for (const address of addresses) {
    const user_id = userIdMap.get(address.userId);
    if (!user_id) continue;

    await supabase.from("addresses").insert({
      user_id,
      province: address.province,
      city: address.city,
      postal_code: address.postalCode,
      address: address.address,
    });
  }

  console.log("📦 Migrating orders...");
  for (const order of orders) {
    const user_id = userIdMap.get(order.userId);
    if (!user_id) continue;

    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number: order.orderId,
        user_id,
        status: order.status,
        order_date: order.date,
        total_price: order.totalPrice,
      })
      .select()
      .single();

    if (error) throw error;

    for (const item of order.products) {
      await supabase.from("order_items").insert({
        order_id: data.id,
        product_id: item.productId,
        quantity: item.quantity,
      });
    }
  }

  console.log("❤️ Migrating favorites...");
  for (const fav of favorites) {
    const user_id = userIdMap.get(fav.userId);
    if (!user_id) continue;

    await supabase.from("favorites").insert({
      user_id,
      product_id: fav.productId,
    });
  }

  console.log("✅ Migration completed successfully!");
}

migrate().catch(console.error);
