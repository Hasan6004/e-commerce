import React from "react";
import ProductCarousel from "../carousel/Carousel";

const OffProducts = () => {
  return (
    <>
      <div className="mt-20">
        <h2 className="flex items-center justify-center font-vazir text-[26px] sm:text-[32px] md:text-[36px] font-bold text-gray-800 p-5 sm:p-10 mt-8">
          تخفیف‌دارها
        </h2>
        <div className="w-full flex items-center justify-center p-20 pt-0">
          <ProductCarousel />
        </div>
      </div>
    </>
  );
};

export default OffProducts;
