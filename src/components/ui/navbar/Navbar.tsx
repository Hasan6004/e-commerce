"use client";

import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { mobileLinks } from "@/lib/constants/mobileLinks";
import { categories } from "@/lib/constants/categories";
import { Fragment, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { accountLinks } from "@/lib/constants/accountLinks";
import Image from "next/image";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/redux/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  const [toggleAccountLinks, setToggleAccountLinks] = useState<boolean>(false);
  const accountLinksRef = useRef<HTMLDivElement>(null);

  const cartItemsNumber = useSelector((state: RootState) => state.cart);

  // Close accountLinks when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountLinksRef.current &&
        !accountLinksRef.current.contains(event.target as Node)
      ) {
        setToggleAccountLinks(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pathname = usePathname();
  const showNavbar = !pathname?.startsWith("/auth");
  return !showNavbar ? null : (
    <nav className="lg:px-10 px-5 py-5">
      <div className=" flex flex-row justify-between items-center relative">
        <div className="flex-6 md:flex-1 flex justify-baseline items-center">
          <div className="hidden md:flex justify-center items-center gap-[0.5px]">
            <span className="font-vazir font-medium lg:text-[16px] text-[14px]">
              {cartItemsNumber?.length}
            </span>
            <Link href={"/cart"}>
              <GrCart className="text-[#8c8c8c] cursor-pointer hover:text-black lg:w-[28px] lg:h-[28px] w-[20px] h-[20px]" />
            </Link>
          </div>
          <div
            ref={accountLinksRef}
            className="lg:ml-5 ml-3 hidden md:block relative"
          >
            {isAuthenticated ? (
              <>
                <IoPersonOutline
                  className="cursor-pointer text-[#8c8c8c] hover:text-black lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]"
                  onClick={() => setToggleAccountLinks(!toggleAccountLinks)}
                />
                {toggleAccountLinks && (
                  <div className="absolute md:top-full md:left-0 bg-white shadow-md border rounded-md min-w-[180px] z-50">
                    <ul className="flex flex-col">
                      <Link href={"/profile"}>
                        <div
                          className="flex flex-row justify-between items-center p-3 hover:bg-gray-300
                        "
                        >
                          <MdOutlineKeyboardArrowLeft />
                          <p>
                            {user?.firstName} {user?.lastName}
                          </p>
                        </div>
                        <div className="h-[1px] w-[150px] bg-gray-200 m-auto" />
                      </Link>
                      {accountLinks.map((item, index) => {
                        if (item.name === "logout") {
                          return (
                            <Fragment key={item.name}>
                              <div
                                className="flex flex-row justify-end items-center gap-3 p-3 cursor-pointer hover:bg-gray-300"
                                onClick={() => {
                                  setToggleAccountLinks(false);
                                  dispatch(logout());
                                }}
                              >
                                <p>{item.text}</p>
                                <item.icon className="w-[21px] h-[21px]" />
                              </div>
                              {index !== accountLinks.length - 1 && (
                                <div className="h-[1px] w-[150px] bg-gray-200 m-auto" />
                              )}
                            </Fragment>
                          );
                        } else {
                          return (
                            <Link href={item.href!} key={item.name}>
                              <div
                                className="flex flex-row justify-end items-center cursor-pointer gap-3 p-3 hover:bg-gray-300"
                                onClick={() => setToggleAccountLinks(false)}
                              >
                                <p>{item.text}</p>
                                <item.icon className="w-[21px] h-[21px]" />
                              </div>
                              {index !== accountLinks.length - 1 && (
                                <div className="h-[1px] w-[150px] bg-gray-200 m-auto" />
                              )}
                            </Link>
                          );
                        }
                      })}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link href={"/auth/login"}>
                <IoPersonOutline className="cursor-pointer text-[#8c8c8c] hover:text-black lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]" />
              </Link>
            )}
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
          {isAuthenticated && user?.role === "customer" && (
            <li className="font-vazir lg:text-[18px] text-[16px] hover:font-bold">
              <Link href={"/orders"}>سفارشات</Link>
            </li>
          )}

          {!isAuthenticated && (
            <li className="font-vazir lg:text-[18px] text-[16px] hover:font-bold">
              <Link href={"/contact"}>تماس با ما</Link>
            </li>
          )}

          <li className="font-vazir lg:text-[18px] text-[16px] hover:font-bold">
            <Link href={"/about"}>درباره</Link>
          </li>

          {user?.role === "admin" && (
            <li className="font-vazir lg:text-[18px] text-[16px] hover:font-bold">
              <Link href={"/admin"}>پنل ادمین</Link>
            </li>
          )}

          <li
            className={`font-vazir lg:text-[18px] text-[16px] flex flex-col items-center justify-center cursor-pointer relative group`}
          >
            <div className="flex flex-row justify-center items-center hover:font-bold">
              <MdOutlineKeyboardArrowDown />
              <span>دسته‌بندی</span>
            </div>
            <ul
              className={`absolute right-0 top-full bg-white shadow-md border rounded-md mt-0  min-w-[180px] z-50 hidden group-hover:block`}
            >
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  href={`/category/${encodeURIComponent(cat.enCategory)}`}
                >
                  <li className="px-4 py-2 hover:bg-gray-100 text-right text-gray-700 cursor-pointer font-vazir">
                    {cat.category}
                  </li>
                </Link>
              ))}
            </ul>
          </li>

          <li className="font-vazir lg:text-[18px] text-[16px] hover:font-bold">
            <Link href={"/home"}>خانه</Link>
          </li>
        </ul>

        <div className="flex-1 flex items-center justify-end">
          <Link href="/home">
            <Image
              width={60}
              height={60}
              src="/images/zoodbuy_logo.png"
              alt="Logo"
              className="lg:w-[75px] w[60px] lg:h-[75px] h-[60px] cursor-pointer"
            />
          </Link>
        </div>
      </div>

      {!pathname?.startsWith("/adminPanel") && (
        <>
          <div className="w-[100%] mt-4 flex justify-center items-center h-[1px] bg-[#c8c8c8]" />
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 flex flex-row justify-between items-center bg-white p-1">
            {mobileLinks.map((item) => {
              const isActive =
                isAuthenticated && item.name === "account"
                  ? pathname === "/account"
                  : pathname === item.href;
              if (item.name === "adminPanel" && user?.role !== "admin")
                return null;
              return (
                <ul key={item.href} className="cursor-pointer flex-1">
                  <Link
                    href={
                      item.name === "account" && isAuthenticated
                        ? "/account"
                        : item.href
                    }
                    className={`font-vazir ${
                      isActive && "font-bold"
                    } text-[14px]
                   flex flex-col items-center justify-center gap-1
                  `}
                  >
                    <item.icon
                      className={`cursor-pointer ${
                        isActive ? "text-black" : "text-[#8c8c8c]"
                      } w-[25px] h-[25px]`}
                    />
                    {item.text}
                  </Link>
                </ul>
              );
            })}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
