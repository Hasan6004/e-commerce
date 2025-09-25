"use client";
import { accountLinks } from "@/lib/constants/accountLinks";
import { RootState } from "@/lib/redux/store";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { logout } from "@/lib/redux/slices/userSlice";

const Account = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-center items-center flex-col bg-gray-50 border-1 p-5 rounded-2xl">
          <div className="flex flex-col items-center gap-2">
            <p className="font-vazir font-bold text-[16px] text-center">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="font-vazir font-medium text-[14px] text-gray-500">
              {user?.email}
            </p>
            <div className="text-center">
              <Link href={"/profile"}>
                <MdModeEdit
                  size={24}
                  className="active:bg-gray-500 rounded-2xl"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-1 bg-gray-50 mb-20 w-full rounded-2xl">
          {accountLinks.map((item, index) => {
            if (item.name === "logout") {
              return (
                <Fragment key={item.name}>
                  <div
                    className="flex flex-row justify-between items-center cursor-pointer gap-3 p-5 active:bg-gray-300"
                    onClick={() => dispatch(logout())}
                  >
                    <div>
                      <MdOutlineKeyboardArrowLeft size={20} />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <p className="font-vazir text-[16px] font-bold">
                        {item.text}
                      </p>
                      <item.icon className="w-[26px] h-[26px]" />
                    </div>
                  </div>
                  {index !== accountLinks.length - 1 && (
                    <div className="h-[1px] w-[90%] bg-gray-200 m-auto" />
                  )}
                </Fragment>
              );
            } else {
              return (
                <Link href={item.href!} key={item.name}>
                  <div className="flex flex-row justify-between items-center cursor-pointer gap-3 p-5 active:bg-gray-300">
                    <div>
                      <MdOutlineKeyboardArrowLeft size={20} />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <p className="font-vazir text-[16px] font-bold">
                        {item.text}
                      </p>
                      <item.icon className="w-[26px] h-[26px]" />
                    </div>
                  </div>
                  {index !== accountLinks.length - 1 && (
                    <div className="h-[1px] w-[90%] bg-gray-200 m-auto" />
                  )}
                </Link>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Account;
