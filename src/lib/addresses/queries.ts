import { supabaseServer } from "../supabase/server";
import { getCurrentUser } from "../auth/jwt";

export async function fetchAddresses() {
  const user = await getCurrentUser();

  let query = supabaseServer
    .from("addresses")
    .select("*")
    .eq("user_id", user?.id);

  const { data, error } = await query;

  const addresses = data?.map((item) => addressMapper(item));

  if (error) {
    return { addresses: null, error: "خطا در دریافت آدرس‌ها" };
  }

  return { addresses, error: null };
}

function addressMapper(data: any) {
  return {
    addressId: data.id,
    userId: data.user_id,
    province: data.province,
    city: data.city,
    postalCode: data.postal_code,
    fullAddress: data.address,
  };
}
