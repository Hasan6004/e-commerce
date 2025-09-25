"use client";

import { baseButton } from "@/styles/buttonStyles";
import React from "react";
import { MdClose } from "react-icons/md";

interface AddressModalProps {
  setToggleAddressOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  hanldeAddressSave: () => Promise<void>;
  province: string;
  setProvince: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  postalCode: string;
  setPostalCode: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const AddressModal = ({
  setToggleAddressOverlay,
  hanldeAddressSave,
  province,
  setProvince,
  city,
  setCity,
  postalCode,
  setPostalCode,
  address,
  setAddress,
}: AddressModalProps) => {
  const handleCancelModal = () => {
    setProvince("");
    setCity("");
    setPostalCode("");
    setAddress("");
    setToggleAddressOverlay(false);
  };

  return (
    <div className="absolute flex flex-col items-baseline gap-8 border-1 rounded-2xl m-auto bg-gray-50 w-[350px] z-50 py-4 px-4">
      <div className="flex flex-row justify-baseline">
        <MdClose
          size={24}
          className="cursor-pointer"
          onClick={() => setToggleAddressOverlay(false)}
        />
      </div>
      <div
        className="flex flex-row items-center justify-center gap-5"
        dir="rtl"
      >
        <label htmlFor="province" className="font-vazir text-[16px]">
          استان
        </label>
        <input
          type="text"
          id="province"
          className="font-vazir text-[12px] rounded-xl border-1 px-3 py-1 sm:text-[14px] bg-white w-[220px]"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
      </div>
      <div
        className="flex flex-row items-center justify-center gap-5"
        dir="rtl"
      >
        <label htmlFor="city" className="font-vazir text-[16px]">
          شهر
        </label>
        <input
          type="text"
          id="city"
          className="font-vazir text-[12px] rounded-xl border-1 px-3 py-1 sm:text-[14px] bg-white w-[220px]"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div
        className="flex flex-row items-center justify-center gap-5"
        dir="rtl"
      >
        <label htmlFor="postalCode" className="font-vazir text-[16px]">
          کد پستی
        </label>
        <input
          type="text"
          id="postalCode"
          className="font-vazir text-[12px] rounded-xl border-1 px-3 py-1 sm:text-[14px] bg-white w-[220px]"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <div
        className="flex flex-row items-center justify-center gap-5"
        dir="rtl"
      >
        <label htmlFor="address" className="font-vazir text-[16px]">
          آدرس
        </label>
        <input
          type="text"
          id="address"
          className="font-vazir text-[12px] rounded-xl border-1 px-3 py-1 sm:text-[14px] bg-white w-[220px]"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="flex flex-row w-full justify-center gap-6">
        <button
          type="button"
          className={baseButton}
          onClick={hanldeAddressSave}
        >
          ذخیره
        </button>
        <button
          type="button"
          className={baseButton}
          onClick={() => handleCancelModal()}
        >
          لغو
        </button>
      </div>
    </div>
  );
};

export default AddressModal;
