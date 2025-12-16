"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";

type panelOptions =
  | "داشبورد"
  | "مدیریت سفارش‌ها"
  | "مدیریت محصولات"
  | "مدیریت کاربران";

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
      <div className="flex p-5 gap-8">
        <main className="flex-5">{children}</main>
        <aside
          onMouseEnter={() => setShowNames(true)}
          onMouseLeave={() => setShowNames(false)}
          className="sm:flex flex-1 hidden justify-end items-baseline py-15 hover:w-[250px] transition ease-out delay-150 duration-300 cursor-pointer px-4"
        >
          <nav className={`flex flex-col gap-4 fixed`}>
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
                  transition-all duration-300 overflow-hidden
                  ${
                    showNames
                      ? "opacity-100 max-w-[150px] ml-2"
                      : "opacity-0 max-w-0 ml-0"
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
                    className={`cursor-pointer text-black lg:w-[28px] lg:h-[28px] w-[20px] h-[20px]`}
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
                  transition-all duration-300 overflow-hidden
                  ${
                    showNames
                      ? "opacity-100 max-w-[150px] ml-2"
                      : "opacity-0 max-w-0 ml-0"
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
                    className="text-[#8c8c8c] cursor-pointer hover:text-black lg:w-[28px] lg:h-[28px] w-[24px] h-[24px] shrink-0"
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
                  transition-all duration-300 overflow-hidden
                  ${
                    showNames
                      ? "opacity-100 max-w-[150px] ml-2"
                      : "opacity-0 max-w-0 ml-0"
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
                    className="text-[#8c8c8c] cursor-pointer hover:text-black lg:w-[28px] lg:h-[28px] w-[28px] h-[28px] shrink-0"
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
                  transition-all duration-300 overflow-hidden
                  ${
                    showNames
                      ? "opacity-100 max-w-[150px] ml-2"
                      : "opacity-0 max-w-0 ml-0"
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
                  <TbUsersGroup className="cursor-pointer text-black lg:w-[28px] lg:h-[28px] w-[24px] h-[24px]" />
                </div>
              </div>
            </Link>
          </nav>

          {/* Sidebar */}
        </aside>
      </div>
    </>
  );
};

export default adminLayout;
