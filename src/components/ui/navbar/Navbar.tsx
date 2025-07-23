"use client";

import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { mobileLinks } from "@/lib/constants/mobileLinks";
import { useState } from "react";

const Navbar = () => {
  const [userType, setUserType] = useState<"general" | "loggedIn" | "admin">(
    "general"
  );
  const [isActive, setIsActive] = useState<string>("home");
  return (
    <nav className="lg:px-10 px-5 py-5">
      <div className=" flex flex-row justify-between items-center">
        <div className="flex-6 md:flex-1 flex justify-baseline items-center">
          <div className="hidden md:flex justify-center items-center gap-[0.5px]">
            <span className="font-vazir font-medium lg:text-[16px] text-[14px]">
              0
            </span>
            <GrCart className="text-[#8c8c8c] cursor-pointer hover:text-black lg:w-[28px] lg:h-[28px] w-[20px] h-[20px]" />
          </div>
          <div className="lg:ml-5 ml-3 hidden md:block">
            <IoPersonOutline className="cursor-pointer text-[#8c8c8c] hover:text-black lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]" />
          </div>
          <div className="lg:ml-5 ml-3 relative w-full">
            <div>
              <input
                type="text"
                className="border-1 lg:w-[350px] md:w-[250px] w-full max-w-[650px] lg:text-[16px] text-[14px] rounded-lg lg:p-2 p-1 border-[#6b6b6b] text-right"
                placeholder="جست‌وجوی محصول"
              />
              <IoSearchOutline className="absolute lg:left-2 lg:top-2 left-1 top-1 text-[#6b6b6b] cursor-pointer hover:text-[black] lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]" />
            </div>
          </div>
        </div>
        <ul className="hidden md:flex flex-row justify-center items-center lg:gap-5 gap-3 flex-3">
          {userType === "general" && (
            <li className="font-vazir lg:text-[18px] text-[16px] hover:font-bold">
              <Link href={"/"}>تماس با ما</Link>
            </li>
          )}
          <li className="font-vazir lg:text-[18px] text-[16px] hover:font-bold">
            <Link href={"/"}>درباره</Link>
          </li>
          {userType === "admin" && (
            <li className="font-vazir lg:text-[18px] text-[16px] hover:font-bold">
              <Link href={"/admin"}>پنل ادمین</Link>
            </li>
          )}
          {userType === "loggedIn" && (
            <li className="font-vazir lg:text-[18px] text-[16px] hover:font-bold">
              <Link href={"/orders"}>سفارشات</Link>
            </li>
          )}
          <li className="font-vazir lg:text-[18px] text-[16px] hover:font-bold">
            <Link href={"/products"}>دسته‌بندی</Link>
          </li>
          <li className="font-vazir lg:text-[18px] text-[16px] hover:font-bold">
            <Link href={"/home"}>خانه</Link>
          </li>
        </ul>
        <div className="flex-1 flex items-center justify-end">
          <a href="#">
            <img
              src="./zoodbuy_logo.png"
              alt="Logo"
              className="lg:w-[75px] w[60px] lg:h-[75px] h-[60px] cursor-pointer"
            />
          </a>
        </div>
      </div>
      <div className="w-[100%] mt-4 flex justify-center items-center h-[1px] bg-[#c8c8c8]" />
      <div className="md:hidden fixed bottom-0 left-0 right-0 flex flex-row justify-between items-center">
        {mobileLinks.map((item) => {
          if (item.type === userType)
            return (
              <div
                key={item.href}
                className="cursor-pointer flex-1 flex flex-col items-center justify-center gap-1"
                onClick={() => setIsActive(item.name)}
              >
                <item.icon
                  className={`cursor-pointer ${
                    isActive === item.name ? "text-black" : "text-[#8c8c8c]"
                  } w-[25px] h-[25px]`}
                />
                <Link
                  href={item.href}
                  className={`font-vazir ${
                    isActive === item.name && "font-bold"
                  } text-[14px]`}
                >
                  {item.text}
                </Link>
              </div>
            );
        })}
        {/* <div className="cursor-pointer flex-1 flex flex-col items-center justify-center gap-1">
          <IoPersonOutline className="cursor-pointer text-[#8c8c8c] w-[25px] h-[25px]" />
          <Link href={"/"} className="font-vazir text-[14px]">
            حساب من
          </Link>
        </div>
        <div className="cursor-pointer flex-1 flex flex-col items-center justify-center gap-1">
          <MdOutlineLibraryBooks className="text-[#8c8c8c] cursor-pointer w-[25px] h-[25px]" />
          <Link href={"/"} className="font-vazir text-[14px]">
            سفارشات
          </Link>
        </div>
        <div className="cursor-pointer flex-1 flex flex-col items-center justify-center gap-1">
          <GrCart className="text-[#8c8c8c] cursor-pointer w-[24px] h-[24px]" />
          <Link href={"/"} className="font-vazir text-[14px]">
            سبد خرید
          </Link>
        </div>
        <div className="cursor-pointer flex-1 flex flex-col items-center justify-center gap-1">
          <MdOutlineCategory className="text-[#8c8c8c] cursor-pointer w-[28px] h-[28px]" />
          <Link href={"/"} className="font-vazir text-[14px]">
            دسته‌بندی
          </Link>
        </div>
        <div className="cursor-pointer flex-1 flex flex-col items-center justify-center gap-1">
          <MdOutlineHome className="text-[#8c8c8c] cursor-pointer w-[28px] h-[28px]" />
          <Link href={"/home"} className="font-vazir text-[14px] font-bold">
            خانه
          </Link>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
