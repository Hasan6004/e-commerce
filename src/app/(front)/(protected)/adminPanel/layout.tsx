"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { MdOutlineHome } from "react-icons/md";

type panelOptions =
  | "داشبورد"
  | "مدیریت سفارش‌ها"
  | "مدیریت محصولات"
  | "مدیریت کاربران"
  | "خانه";

const adminLayout = ({ children }: { children: React.ReactNode }) => {
  const [showNames, setShowNames] = useState<boolean>(false);
  const pathname = usePathname();

  const [activeOption, setActiveOption] = useState<panelOptions>("داشبورد");

  useEffect(() => {
    let currentActiveOption: panelOptions;
    if (pathname?.startsWith("/adminPanel/dashboard")) {
      currentActiveOption = "داشبورد";
    } else if (pathname?.startsWith("/adminPanel/orderManagement")) {
      currentActiveOption = "مدیریت سفارش‌ها";
    } else if (pathname?.startsWith("/adminPanel/productManagement")) {
      currentActiveOption = "مدیریت محصولات";
    } else if (pathname?.startsWith("/adminPanel/userManagement")) {
      currentActiveOption = "مدیریت کاربران";
    }
    setActiveOption(currentActiveOption!);
  }, [pathname]);

  return (
    <>
      <div className="flex flex-row justify-between p-2 gap-4 w-full">
        <main className="md:flex-8 w-full md:w-[80%] mb-5">{children}</main>
        <aside
          onMouseEnter={() => setShowNames(true)}
          onMouseLeave={() => setShowNames(false)}
          className="md:flex hidden md:flex-2 justify-end items-baseline py-15 transition ease-out delay-150 duration-300 cursor-pointer px-4 relative"
        >
          <nav className={`flex flex-col gap-4 md:sticky md:top-6 fixe`}>
            <Link href={"dashboard"}>
              <div
                className={`flex flex-row items-center justify-end gap-3 py-2 px-3 rounded-2xl hover:bg-gray-200 ${
                  activeOption === "داشبورد" && showNames && "bg-gray-300"
                }`}
                onClick={() => setActiveOption("داشبورد")}
              >
                <p
                  className={`
                  font-vazir text-[18px] font-medium whitespace-nowrap
                  transition-all duration-300 overflow-hidden hidden xl:block
                  ${
                    showNames
                      ? "xl:opacity-100 xl:max-w-[150px] xl:ml-2"
                      : "xl:opacity-0 xl:max-w-0 xl:ml-0"
                  }
                `}
                >
                  داشبورد
                </p>
                <div
                  className={` p-1 ${
                    activeOption === "داشبورد" && "bg-gray-300 rounded-2xl"
                  }`}
                >
                  <MdOutlineDashboard
                    className={`cursor-pointer text-black w-[26px] h-[26px]`}
                  />
                </div>
              </div>
            </Link>
            <Link href={"orderManagement"}>
              <div
                className={`flex flex-row items-center justify-end gap-3 py-2 px-3 rounded-2xl hover:bg-gray-200 ${
                  activeOption === "مدیریت سفارش‌ها" &&
                  showNames &&
                  "bg-gray-300"
                }`}
                onClick={() => setActiveOption("مدیریت سفارش‌ها")}
              >
                <p
                  className={`
                  font-vazir text-[18px] font-medium whitespace-nowrap
                  transition-all duration-300 overflow-hidden hidden xl:block
                  ${
                    showNames
                      ? "xl:opacity-100 xl:max-w-[150px] xl:ml-2"
                      : "xl:opacity-0 xl:max-w-0 xl:ml-0"
                  }
                `}
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
                    src={"/order-icon.svg"}
                    alt="order icon"
                    width={30}
                    height={30}
                    className="text-[#8c8c8c] cursor-pointer hover:text-black w-[26px] h-[26px]  shrink-0"
                  />
                </div>
              </div>
            </Link>
            <Link href={"productManagement"}>
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
                  className={`
                  font-vazir text-[18px] font-medium whitespace-nowrap
                  transition-all duration-300 overflow-hidden hidden xl:block
                  ${
                    showNames
                      ? "xl:opacity-100 xl:max-w-[150px] xl:ml-2"
                      : "xl:opacity-0 xl:max-w-0 xl:ml-0"
                  }
                `}
                >
                  مدیریت محصولات
                </p>
                <div
                  className={`p-1 ${
                    activeOption === "مدیریت محصولات" &&
                    "bg-gray-300 rounded-2xl"
                  }`}
                >
                  <Image
                    src={"/product-icon.svg"}
                    alt="order icon"
                    width={30}
                    height={30}
                    className="text-[#8c8c8c] cursor-pointer hover:text-black w-[26px] h-[26px] shrink-0"
                  />
                </div>
              </div>
            </Link>
            <Link href={"userManagement"}>
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
                  className={`
                  font-vazir text-[18px] font-medium whitespace-nowrap
                  transition-all duration-300 overflow-hidden hidden xl:block
                  ${
                    showNames
                      ? "xl:opacity-100 xl:max-w-[150px] xl:ml-2"
                      : "xl:opacity-0 xl:max-w-0 xl:ml-0"
                  }
                `}
                >
                  مدیریت کاربران
                </p>
                <div
                  className={`p-1 ${
                    activeOption === "مدیریت کاربران" &&
                    "bg-gray-300 rounded-2xl"
                  } `}
                >
                  <TbUsersGroup className="cursor-pointer text-black w-[26px] h-[26px]" />
                </div>
              </div>
            </Link>
          </nav>
        </aside>
        {/* Admin Panel Navbar on Mobile */}
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center bg-white p-2"
          dir="rtl"
        >
          <div className="w-[100%] mt-4 flex justify-center items-center h-[1px] bg-[#c8c8c8]" />
          <nav className={`flex flex-row justify-evenly gap-2 sm:gap-4 w-full`}>
            <Link href={"dashboard"}>
              <div
                className={`flex flex-row items-center justify-center sm:justify-end gap-3 py-2 px-3 rounded-2xl hover:bg-gray-200 ${
                  activeOption === "داشبورد" && "bg-gray-300"
                }`}
                onClick={() => setActiveOption("داشبورد")}
              >
                <div
                  className={` p-1 ${
                    activeOption === "داشبورد" && "bg-gray-300 rounded-2xl"
                  }`}
                >
                  <MdOutlineDashboard
                    className={`cursor-pointer text-black w-[26px] h-[26px]`}
                  />
                </div>
              </div>
            </Link>

            <Link href={"orderManagement"}>
              <div
                className={`flex flex-row items-center justify-center sm:justify-end gap-3 py-2 px-3 rounded-2xl  ${
                  activeOption === "مدیریت سفارش‌ها" && "bg-gray-300"
                }`}
                onClick={() => setActiveOption("مدیریت سفارش‌ها")}
              >
                <div
                  className={`p-1 flex-shrink-0 items-center text-center ${
                    activeOption === "مدیریت سفارش‌ها" &&
                    "bg-gray-300 rounded-2xl"
                  }`}
                >
                  <Image
                    src={"/order-icon.svg"}
                    alt="order icon"
                    width={26}
                    height={26}
                    className="text-[#8c8c8c] cursor-pointer hover:text-black w-[26px] h-[26px] shrink-0"
                  />
                </div>
              </div>
            </Link>

            <Link href={"/home"}>
              <div
                className={`flex flex-row items-center justify-center sm:justify-end gap-3 py-2 px-3 rounded-2xl hover:bg-gray-200
                ${activeOption === "خانه" && "bg-gray-300"}
                `}
                onClick={() => setActiveOption("خانه")}
              >
                <div
                  className={`p-1 ${
                    activeOption === "خانه" && "bg-gray-300 rounded-2xl"
                  } `}
                >
                  <MdOutlineHome className="cursor-pointer text-black w-[28px] h-[28px]" />
                </div>
              </div>
            </Link>

            <Link href={"productManagement"}>
              <div
                className={`flex flex-row items-center justify-center sm:justify-end gap-3 py-2 px-3 rounded-2xl hover:bg-gray-200
                ${activeOption === "مدیریت محصولات" && "bg-gray-300"}
                `}
                onClick={() => setActiveOption("مدیریت محصولات")}
              >
                <div
                  className={`p-1 flex-shrink-0 ${
                    activeOption === "مدیریت محصولات" &&
                    "bg-gray-300 rounded-2xl"
                  }`}
                >
                  <Image
                    src={"/product-icon.svg"}
                    alt="order icon"
                    width={26}
                    height={26}
                    className="text-[#8c8c8c] cursor-pointer hover:text-black w-[26px] h-[26px] shrink-0"
                  />
                </div>
              </div>
            </Link>

            <Link href={"userManagement"}>
              <div
                className={`flex flex-row items-center justify-center sm:justify-end gap-3 py-2 px-3 rounded-2xl hover:bg-gray-200
                ${activeOption === "مدیریت کاربران" && "bg-gray-300"}
                `}
                onClick={() => setActiveOption("مدیریت کاربران")}
              >
                <div
                  className={`p-1 ${
                    activeOption === "مدیریت کاربران" &&
                    "bg-gray-300 rounded-2xl"
                  } `}
                >
                  <TbUsersGroup className="cursor-pointer text-black w-[26px] h-[26px]" />
                </div>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default adminLayout;
