"use client";

import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";

type panelOptions =
  | "داشبورد"
  | "مدیریت سفارش‌ها"
  | "مدیریت محصولات"
  | "مدیریت کاربران";

const page = () => {
  const [showNames, setShowNames] = useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<panelOptions>("داشبورد");
  return (
    <>
      <div className="flex h-screen">
        <div className="flex-1">{/* Main content */}</div>
        <div
          onMouseEnter={() => setShowNames(true)}
          onMouseLeave={() => setShowNames(false)}
          className="flex justify-end items-baseline py-15 hover:w-[280px] transition ease-out delay-150 duration-300 cursor-pointer px-4"
        >
          <div className={`flex flex-col gap-4`}>
            <div
              className={`flex flex-row items-center justify-end gap-3 py-2 px-3 rounded-2xl hover:bg-gray-200 ${
                activeOption === "داشبورد" && showNames && "bg-gray-300"
              }`}
              onClick={() => setActiveOption("داشبورد")}
            >
              <p
                className={`${
                  showNames ? "opacity-100" : "opacity-0"
                } font-vazir text-[18px] font-medium transition-opacity duration-300`}
              >
                داشبورد
              </p>
              <div
                className={` p-1 ${
                  activeOption === "داشبورد" && "bg-gray-300 rounded-2xl"
                }`}
              >
                <MdOutlineDashboard
                  className={`cursor-pointer text-black lg:w-[28px] lg:h-[28px] w-[20px] h-[20px]`}
                />
              </div>
            </div>
            <div
              className={`flex flex-row items-center justify-end gap-3 py-2 px-3 rounded-2xl hover:bg-gray-200 ${
                activeOption === "مدیریت سفارش‌ها" && showNames && "bg-gray-300"
              }`}
              onClick={() => setActiveOption("مدیریت سفارش‌ها")}
            >
              <p
                className={`${
                  showNames ? "opacity-100" : "opacity-0"
                } font-vazir text-[18px] font-medium transition-opacity duration-300`}
              >
                مدیریت سفارش‌ها
              </p>
              <div
                className={`p-1 ${
                  activeOption === "مدیریت سفارش‌ها" &&
                  "bg-gray-300 rounded-2xl"
                }`}
              >
                <Image
                  src={"./order-icon.svg"}
                  alt="order icon"
                  width={30}
                  height={30}
                  className="text-[#8c8c8c] cursor-pointer hover:text-black lg:w-[28px] lg:h-[28px] w-[20px] h-[20px]"
                />
              </div>
            </div>
            <div
              className={`flex flex-row items-center justify-end gap-3 py-2 px-3 rounded-2xl hover:bg-gray-200
                ${
                  activeOption === "مدیریت محصولات" &&
                  showNames &&
                  "bg-gray-300"
                }
                `}
              onClick={() => setActiveOption("مدیریت محصولات")}
            >
              <p
                className={`${
                  showNames ? "opacity-100" : "opacity-0"
                } font-vazir text-[18px] font-medium transition-opacity duration-300`}
              >
                مدیریت محصولات
              </p>
              <div
                className={`p-1 ${
                  activeOption === "مدیریت محصولات" && "bg-gray-300 rounded-2xl"
                }`}
              >
                <Image
                  src={"./product-icon.svg"}
                  alt="order icon"
                  width={30}
                  height={30}
                  className="text-[#8c8c8c] cursor-pointer hover:text-black lg:w-[28px] lg:h-[28px] w-[20px] h-[20px]"
                />
              </div>
            </div>
            <div
              className={`flex flex-row items-center justify-end gap-3 py-2 px-3 rounded-2xl hover:bg-gray-200
                ${
                  activeOption === "مدیریت کاربران" &&
                  showNames &&
                  "bg-gray-300"
                }
                `}
              onClick={() => setActiveOption("مدیریت کاربران")}
            >
              <p
                className={`${
                  showNames ? "opacity-100" : "opacity-0"
                } font-vazir text-[18px] font-medium transition-opacity duration-300`}
              >
                مدیریت کاربران
              </p>
              <div
                className={`p-1 ${
                  activeOption === "مدیریت کاربران" && "bg-gray-300 rounded-2xl"
                } `}
              >
                <TbUsersGroup className="cursor-pointer text-black lg:w-[28px] lg:h-[28px] w-[20px] h-[20px]" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
        </div>
      </div>
    </>
  );
};

export default page;
