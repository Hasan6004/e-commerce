import formatPrice from "@/lib/utils/formatPrice";
import React from "react";

interface PriceDataProps {
  sumOfQuantities: number;
  sumOfPrices: number;
  sumOfDiscounts: number;
  children?: React.ReactNode;
}

const PriceData = ({
  sumOfQuantities,
  sumOfPrices,
  sumOfDiscounts,
  children,
}: PriceDataProps) => {
  return (
    <>
      <div className="border-1 rounded-2xl w-full max-w-[350px] p-2 sm:p-5 flex flex-col gap-3 items-end">
        <div className="flex flex-row gap-1 font-vazir font-medium">
          <p>{sumOfQuantities}</p>
          <span>:تعداد محصول</span>
        </div>
        <div className="flex flex-row gap-1 font-vazir font-medium">
          <p>{formatPrice(sumOfPrices)}</p>
          <span>:جمع خرید خام</span>
        </div>
        <div className="flex flex-row gap-1 font-vazir font-medium text-red-600">
          <p>{formatPrice(sumOfDiscounts)}</p>
          <span>:جمع تخفیف</span>
        </div>
        <div className="w-[100%] h-[1px] bg-gray-200" />
        <div className="flex flex-row gap-1 font-vazir font-medium">
          <span>تومان</span>
          <p>{formatPrice(sumOfPrices - sumOfDiscounts)}</p>
          <span>:جمع خرید نهایی </span>
        </div>
        {children}
      </div>
    </>
  );
};

export default PriceData;
