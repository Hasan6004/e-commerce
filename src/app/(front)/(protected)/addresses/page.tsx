"use client";

import AddressModal from "@/components/features/addressModal/AddressModal";
import {
  addNewAddress,
  deleteAddress,
  fetchAddress,
} from "@/lib/redux/slices/addressSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { handleError } from "@/lib/utils/handleError";
import { baseButton } from "@/styles/buttonStyles";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { MdOutlineWarning } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Addresses = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [toggleAddressOverlay, setToggleAddressOverlay] =
    useState<boolean>(false);

  const { addresses } = useSelector((state: RootState) => state.address);

  const fetchAddresses = async () => {
    try {
      await dispatch(fetchAddress()).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  const hanldeDelete = async (id: number) => {
    try {
      await dispatch(deleteAddress(id));
      toast.success("آدرس موردنظر با موفقیت حذف شد", {
        className: "font-vazir text-[16px] mt-10",
      });
    } catch (error) {
      handleError(error);
    }
  };

  const handleEdit = (
    province: string,
    city: string,
    postalCode: string,
    address: string
  ) => {
    setProvince(province);
    setCity(city);
    setPostalCode(postalCode);
    setAddress(address);
    setToggleAddressOverlay(true);
  };

  const hanldeAddressSave = async () => {
    if (
      province.trim() === "" ||
      city.trim() === "" ||
      postalCode.trim() === "" ||
      address.trim() === ""
    ) {
      toast(
        <span className="flex flex-row items-center gap-3">
          <MdOutlineWarning size={22} />
          لطفا همه موارد را پر کنید
        </span>,
        {
          className: "font-vazir text-[16px] mt-10 border-1",
        }
      );
    } else {
      try {
        await dispatch(
          addNewAddress({
            userId: user?.id!,
            province,
            city,
            postalCode,
            address,
          })
        );
        toast.success("آدرس جدید با موفقیت ذخیره شد", {
          className: "font-vazir text-[16px] mt-10",
        });
        setPostalCode("");
        setProvince("");
        setCity("");
        setAddress("");
      } catch (error) {
        handleError(error);
      } finally {
        setToggleAddressOverlay(false);
      }
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center relative p-5">
        <div className="border-1 flex flex-col p-5 rounded-2xl w-[400px] mt-10">
          <div className="flex flex-row justify-center items-center">
            <button
              type="button"
              className={`${baseButton} flex flex-row gap-2`}
              onClick={() => setToggleAddressOverlay(true)}
            >
              <MdOutlineAddLocationAlt size={22} />
              اضافه کردن آدرس
            </button>
          </div>
          <div className="w-[90%] h-[1px] bg-gray-200 mt-6 m-auto" />
          <h2 className="font-vazir mt-5 text-[16px] sm:text-[18px] font-bold text-center">
            آدرس‌های من
          </h2>
          <div className="flex flex-col items-center mt-5 overflow-y-auto max-h-[400px] sm:max-h-[450px]">
            {addresses?.length === 0 ? (
              <p className="font-vazir text-[12px] sm:text-[14px] text-center">
                آدرسی برای نمایش وجود ندارد
              </p>
            ) : (
              addresses?.map((item) => {
                return (
                  <div
                    key={item.addressId}
                    className="flex flex-row justify-between items-center gap-4 p-3 cursor-pointer hover:bg-gray-200 w-full"
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <MdDelete
                        size={22}
                        className="cursor-pointer"
                        onClick={() => hanldeDelete(item.addressId)}
                      />
                      <MdModeEditOutline
                        size={22}
                        className="cursor-pointer"
                        onClick={() =>
                          handleEdit(
                            item.province,
                            item.city,
                            item.postalCode,
                            item.fullAddress
                          )
                        }
                      />
                    </div>
                    <p
                      className="font-vazir text-[14px] sm:text-[16px] max-w-[220px] text-justify"
                      dir="rtl"
                    >
                      {item.province} - {item.city} - {item.fullAddress}
                    </p>
                  </div>
                );
              })
            )}
          </div>
          {toggleAddressOverlay && (
            <AddressModal
              city={city}
              setCity={setCity}
              province={province}
              setProvince={setProvince}
              address={address}
              setAddress={setAddress}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              hanldeAddressSave={hanldeAddressSave}
              setToggleAddressOverlay={setToggleAddressOverlay}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Addresses;
