"use client";

import AddressModal from "@/components/features/addressModal/AddressModal";
import api from "@/lib/api/client";
import { handleError } from "@/lib/utils/handleError";
import { baseButton } from "@/styles/buttonStyles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { MdOutlineWarning } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const AddressesUI = ({ addresses }: { addresses: any[] }) => {
  const [addressesState, setAddressesState] = useState(addresses);
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [editedAddressId, setEditedAddressId] = useState<string>("");

  const router = useRouter();

  const [toggleAddressOverlay, setToggleAddressOverlay] =
    useState<boolean>(false);

  const hanldeDelete = async (addressId: string) => {
    try {
      await api.delete("/api/addresses", {
        data: { addressId },
      });
      toast.success("آدرس موردنظر با موفقیت حذف شد", {
        className: "font-vazir text-[16px] mt-10",
      });
      setAddressesState(
        addressesState.filter((item) => item.addressId !== addressId),
      );
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("لطفا ابتدا وارد شوید", {
          className: "font-vazir text-[16px] mt-10",
        });
        router.push(`/auth/login?redirect=/addresses`);
      }
      handleError(error.response.data.error);
    }
  };

  const handleEdit = async (
    addressId: string,
    province: string,
    city: string,
    postalCode: string,
    address: string,
  ) => {
    setEditEnabled(true);
    setEditedAddressId(addressId);
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
        },
      );
    } else {
      try {
        if (editEnabled) {
          const updatedAddress = {
            addressId: editedAddressId,
            province,
            city,
            postalCode,
            address,
          };
          await api.put("/api/addresses", updatedAddress);
          toast.success("آدرس موردنظر با موفقیت بروزرسانی شد", {
            className: "font-vazir text-[16px] mt-10",
          });
          setEditEnabled(false);
          setAddressesState([
            ...addressesState.filter(
              (item) => item.addressId !== editedAddressId,
            ),
            { fullAddress: updatedAddress.address, ...updatedAddress },
          ]);
        } else {
          const newAddress = {
            province,
            city,
            postalCode,
            address,
          };
          const res = await api.post("/api/addresses", newAddress);
          toast.success("آدرس جدید با موفقیت ذخیره شد", {
            className: "font-vazir text-[16px] mt-10",
          });
          setAddressesState([...addresses, res.data?.addedAddress]);
        }

        // clear the states after edit or add
        setEditedAddressId("");
        setPostalCode("");
        setProvince("");
        setCity("");
        setAddress("");
      } catch (error: any) {
        if (error.response.status === 401) {
          toast.error("لطفا ابتدا وارد شوید", {
            className: "font-vazir text-[16px] mt-10",
          });
          router.push(`/auth/login?redirect=/addresses`);
        }
        handleError(error);
      } finally {
        setToggleAddressOverlay(false);
      }
    }
  };

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
            {addressesState?.length === 0 ? (
              <p className="font-vazir text-[12px] sm:text-[14px] text-center">
                آدرسی برای نمایش وجود ندارد
              </p>
            ) : (
              addressesState?.map((item) => {
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
                            item.addressId,
                            item.province,
                            item.city,
                            item.postalCode,
                            item.fullAddress,
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

export default AddressesUI;
