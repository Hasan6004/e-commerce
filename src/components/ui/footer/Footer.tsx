"use client";

import React from "react";
import Input from "../input/Input";
import { baseButton } from "@/styles/buttonStyles";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Footer = () => {
  const pathname = usePathname();
  const hideFooter =
    pathname?.startsWith("/account") ||
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/profile") ||
    pathname?.startsWith("/addresses") ||
    pathname?.startsWith("/checkout") ||
    pathname?.startsWith("/orders") ||
    pathname?.startsWith("/paymentConfirm") ||
    pathname?.startsWith("/bookmarks") ||
    pathname?.startsWith("/adminPanel");

  return hideFooter ? null : (
    <>
      <footer className="w-full border-t border-b flex items-center justify-center flex-col p-5">
        <div className="flex max-md:flex-col-reverse max-md:gap-10 items-center justify-between w-full">
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <h4 className="font-vazir sm:text-[20px] font-bold text-16px">
                عضویت در خبرنامه
              </h4>
              <div className="flex flex-col items-center justify-center mt-4 gap-4">
                <Input type="text" id="email" placeholder="ایمیل" />
                <button className={baseButton}>ثبت</button>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-end justify-center">
              <h4 className="font-vazir font-medium sm:text-[20px] text-[16px]">
                خدمات مشتری
              </h4>
              <Link href={"/tracking"}>
                <p className="font-vazir sm:text-[16px] text-[14px] mt-4 cursor-pointer">
                  پیگیری سفارش
                </p>
              </Link>
              <Link href={"/shipping"}>
                <p className="font-vazir sm:text-[16px] text-[14px] mt-4 cursor-pointer">
                  شرایط ارسال
                </p>
              </Link>
              <Link href={"/return"}>
                <p className="font-vazir sm:text-[16px] text-[14px] mt-4 cursor-pointer">
                  بازگشت کالا
                </p>
              </Link>
              <Link href={"/support"}>
                <p className="font-vazir sm:text-[16px] text-[14px] mt-4 cursor-pointer">
                  پشتیبانی آنلاین
                </p>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-end justify-center">
              <h4 className="font-vazir font-medium sm:text-[20px] text-[16px]">
                دسترسی سریع
              </h4>
              <Link href={"/FAQ"}>
                <p className="font-vazir sm:text-[16px] text-[14px] mt-4 cursor-pointer">
                  سوالات متداول
                </p>
              </Link>
              <Link href={"/rules"}>
                <p className="font-vazir sm:text-[16px] text-[14px] mt-4 cursor-pointer">
                  قوانین و مقررات
                </p>
              </Link>
              <Link href={"/contact"}>
                <p className="font-vazir sm:text-[16px] text-[14px] mt-4 cursor-pointer">
                  تماس با ما
                </p>
              </Link>
              <Link href={"/about"}>
                <p className="font-vazir sm:text-[16px] text-[14px] mt-4 cursor-pointer">
                  درباره ما
                </p>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <Image
                width={60}
                height={60}
                src="/images/zoodbuy_logo.png"
                alt="Logo"
                className="lg:w-[75px] w[60px] lg:h-[75px] h-[60px] cursor-pointer"
              />
              <p className="font-vazir sm:text-[16px] text-[14px] mt-2">
                فروشگاه اینترنتی زودبای
              </p>
              <p className="font-vazir sm:text-[16px] text-14px mt-4 mb-2">
                همراه ما باشید
              </p>
              <div className="flex items-center justify-center gap-4 mt-2">
                <FaInstagram className="w-[30px] h-[30px] cursor-pointer" />
                <FaTelegram className="w-[30px] h-[30px] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="border w-full mt-10" />
        <div className="flex items-center justify-center mt-10">
          <FaRegCopyright className="w-[15px] h-[15px]" />
          <p className="font-vazir sm:text-[16px] text-[14px] ml-1">
            2025 - زودبای - تمامی حقوق محفوظ است
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
