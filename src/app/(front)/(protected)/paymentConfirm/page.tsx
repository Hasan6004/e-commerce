"use client";

import { baseButton } from "@/styles/buttonStyles";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  return (
    <>
      <div className="flex justify-center items-center text-center">
        <div className="flex flex-col justify-center items-center gap-5 mt-8 border-1 border-gray-400 p-8 rounded-2xl">
          <h2 className="font-vazir font-medium text-[16px] sm:text-[18px] text-blue-900">
            تبریک! خرید شما با موفقیت انجام شد
          </h2>
          <p className="font-vazir font-medium text-[14px] sm:text-[16px] text-gray-500">
            کد پیگیری سفارش
            <span className="text-blue-600">{searchParams.get("code")}</span>
          </p>
          <div className="flex flex-row gap-5">
            <Link href={"/orders"}>
              <button type="button" className={baseButton}>
                پیگیری سفارش
              </button>
            </Link>
            <Link href={"/products"}>
              <button type="button" className={baseButton}>
                ادامه خرید
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
