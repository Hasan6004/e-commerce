import React from "react";

const Banner = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full h-[120px] bg-yellow-100 flex items-center justify-center rounded-2xl mx-10 cursor-pointer">
          <p className="hidden sm:block font-vazir text-[26px] font-bold">
            ارسال رایگان برای خریدهای بالای ۷۰۰ هزار تومان
          </p>
          <div className="flex items-center justify-center flex-col gap-3">
            <p className="font-vazir font-bold text-[16px] sm:hidden ">
              ارسال رایگان برای
            </p>
            <p className="font-vazir font-bold text-[16px] sm:hidden">
              خریدهای بالای ۷۰۰ هزار تومان
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
