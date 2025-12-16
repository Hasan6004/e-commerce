import formatPrice from "@/lib/utils/formatPrice";
import Image from "next/image";
import React from "react";
interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  iconSrc: string;
}

const KpiCard = ({ title, value, change, iconSrc }: KpiCardProps) => {
  return (
    <>
      <div className="border-1 rounded-2xl w-[180px] h-[200px] text-right px-4 py-4 hover:shadow-md transition-shadow duration-300 cursor-pointer">
        <div className="flex flex-col gap-2 justify-between">
          <Image
            width={40}
            height={40}
            src={iconSrc}
            alt="sales icon"
            className="mb-4"
          />
          <h4 className="font-vazir text-[16px] font-bold text-gray-700">
            {title}
          </h4>
          <p className="font-vazir text-[20px] text-gray-900 font-semibold mt-1">
            {formatPrice(value)}
          </p>
          <p
            className={`font-vazir text-[15px] ${
              change > 0 ? "text-green-500" : "text-red-500"
            } font-bold flex justify-end animate-pulse`}
          >
            {change > 0 ? `${change}+%` : `${change}%`}
          </p>
        </div>
      </div>
    </>
  );
};

export default KpiCard;
