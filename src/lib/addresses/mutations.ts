import { getCurrentUser } from "../auth/jwt";
import { supabaseServer } from "../supabase/server";

export async function addNewAddress(newAddress: any) {
  const user = await getCurrentUser();

  const { data, error } = await supabaseServer
    .from("addresses")
    .insert({
      user_id: user?.id,
      province: newAddress.province,
      city: newAddress.city,
      postal_code: newAddress.postalCode,
      address: newAddress.address,
    })
    .select();

  if (error) {
    return { addedAddress: null, error: "خطا در افزودن آدرس جدید" };
  }

  const addedAddress = formatAddress(data![0]);

  return { addedAddress, error: null };
}

export async function editAddress(newAddress: any) {
  const user = await getCurrentUser();

  const { data, error } = await supabaseServer
    .from("addresses")
    .update({
      province: newAddress.province,
      city: newAddress.city,
      postal_code: newAddress.postalCode,
      address: newAddress.address,
    })
    .eq("id", newAddress.addressId)
    .select()
    .single();

  if (error) {
    return { updatedAddress: null, error: "خطا در بروزرسانی آدرس" };
  }

  const updatedAddress = formatAddress(data);

  return { updatedAddress, error };
}

export async function removeAddress(addressId: string) {
  const user = await getCurrentUser();

  const { data, error } = await supabaseServer
    .from("addresses")
    .delete()
    .eq("user_id", user?.id)
    .eq("id", addressId)
    .select();

  if (error) {
    return { removedAddress: null, error: "خطا در حذف آدرس" };
  }

  const removedAddress = formatAddress(data);

  return { removedAddress, error: null };
}

function formatAddress(item: any) {
  return {
    userId: item.user_id,
    addressId: item.id,
    province: item.province,
    city: item.city,
    postalCode: item.postal_code,
    fullAddress: item.address,
  };
}
