import {
  addNewAddress,
  editAddress,
  removeAddress,
} from "@/lib/addresses/mutations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { province, city, postalCode, address } = reqBody;

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "لطفا ابتدا وارد شوید" },
      { status: 401 },
    );
  }

  const { addedAddress, error } = await addNewAddress({
    province,
    city,
    postalCode,
    address,
  });

  if (error) {
    return NextResponse.json(
      { error: "خطا در افزودن آدرس جدید" },
      { status: 500 },
    );
  }

  return NextResponse.json({ addedAddress });
}

export async function PUT(req: NextRequest) {
  const reqBody = await req.json();
  const { addressId, province, city, postalCode, address } = reqBody;

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "لطفا ابتدا وارد شوید" },
      { status: 401 },
    );
  }

  const { updatedAddress, error } = await editAddress({
    addressId,
    province,
    city,
    postalCode,
    address,
  });

  if (error) {
    return NextResponse.json(
      { error: "خطا در بروزرسانی آدرس" },
      { status: 500 },
    );
  }

  return NextResponse.json({ updatedAddress });
}

export async function DELETE(req: NextRequest) {
  const reqBody = await req.json();
  const { addressId } = reqBody;
  console.log(addressId);

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "لطفا ابتدا وارد شوید" },
      { status: 401 },
    );
  }

  const { removedAddress, error } = await removeAddress(addressId);

  if (error) {
    return NextResponse.json({ error: "خطا در حذف آدرس" }, { status: 500 });
  }

  return NextResponse.json({ removedAddress });
}
