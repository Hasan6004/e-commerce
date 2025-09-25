"use client";

import { useFormChanged } from "@/lib/hooks/useFormChanged";
import { updateUser } from "@/lib/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { baseButton } from "@/styles/buttonStyles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [firstName, setFirstName] = useState<string>(user?.firstName || "");
  const [lastName, setLastName] = useState<string>(user?.lastName || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>(user?.password || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleUpdate = async () => {
    try {
      await dispatch(
        updateUser({ firstName, lastName, email, password, phone })
      ).unwrap();
      toast.success("اطلاعات با موفقیت به‌روزرسانی شد", {
        className: "font-vazir text-[16px] mt-10",
      });
      router.push("/home");
    } catch (error) {
      toast.error("خطا در به‌روزرسانی اطلاعات", {
        className: "font-vazir text-[16px] mt-10",
      });
    }
  };

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: user?.password || "",
    phone: user?.phone || "",
  };

  const currentValues = { firstName, lastName, email, password, phone };

  const isChanged = useFormChanged(initialValues, currentValues);

  return (
    <>
      <div className="flex justify-center items-center mt-10 p-4">
        <div className="border-1 border-gray-400 rounded-2xl flex flex-col justify-center items-center gap-8 px-6 py-6 w-[300px]">
          <div className="flex flex-col gap-4 text-right w-full">
            <label
              htmlFor="firstname"
              className="font-vazir font-medium text-[14px] sm:text-[16px] text-gray-500 w-full"
            >
              نام
            </label>
            <input
              type="text"
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-b-1 font-vazir text-[14px] sm:text-[16px] font-bold outline-0 py-1 w-full border-blue-100 focus:border-black focus:border-b-2"
              dir="rtl"
            />
          </div>
          <div className="flex flex-col gap-4 text-right w-full">
            <label
              htmlFor="lastname"
              className="font-vazir font-medium text-[14px] sm:text-[16px] text-gray-500"
            >
              نام خانوادگی
            </label>
            <input
              type="text"
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-b-1 font-vazir text-[14px] sm:text-[16px] font-bold outline-0 py-1 border-blue-100 focus:border-black focus:border-b-2"
              dir="rtl"
            />
          </div>
          <div className="flex flex-col gap-4 text-right w-full">
            <label
              htmlFor="email"
              className="font-vazir font-medium text-[14px] sm:text-[16px] text-gray-500 w-full"
            >
              ایمیل
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-1 font-vazir text-[14px] sm:text-[16px] font-bold outline-0 py-1 w-full border-blue-100 focus:border-black focus:border-b-2"
            />
          </div>
          <div className="flex flex-col gap-4 text-right w-full">
            <label
              htmlFor="password"
              className="font-vazir font-medium text-[14px] sm:text-[16px] text-gray-500 w-full"
            >
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-1 font-vazir text-[14px] sm:text-[16px] font-bold outline-0 py-1 w-full border-blue-100 focus:border-black focus:border-b-2"
            />
          </div>
          <div className="flex flex-col gap-4 text-right w-full">
            <label
              htmlFor="phone"
              className="font-vazir font-medium text-[14px] sm:text-[16px] text-gray-500 w-full"
            >
              شماره موبایل
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-b-1 font-vazir text-[14px] sm:text-[16px] font-bold outline-0 py-1 w-full border-blue-100 focus:border-black focus:border-b-2"
            />
          </div>
          <button
            className={`${baseButton}`}
            disabled={!isChanged}
            onClick={handleUpdate}
          >
            اعمال
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
