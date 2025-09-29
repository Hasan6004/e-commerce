"use client";

import AddressModal from "@/components/features/addressModal/AddressModal";
import PriceData from "@/components/ui/priceData/PriceData";
import { addNewAddress, fetchAddress } from "@/lib/redux/slices/addressSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { handleError } from "@/lib/utils/handleError";
import { baseButton } from "@/styles/buttonStyles";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineAddLocationAlt, MdOutlineWarning } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [toggleAddressOverlay, setToggleAddressOverlay] =
    useState<boolean>(false);

  const { addresses } = useSelector((state: RootState) => state.address);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const params = useSearchParams();

  const prices = params.get("prices");
  const discounts = params.get("discounts");
  const quantities = params.get("quantities");

  const fetchAddresses = async () => {
    try {
      await dispatch(fetchAddress()).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  const handleCreateAddress = async () => {
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

  const handlePay = () => {
    if (!selectedAddress) {
      toast(
        <span className="flex flex-row items-center gap-3">
          <MdOutlineWarning size={22} />
          لطفا ابتدا یک آدرس انتخاب کنید
        </span>,
        {
          className: "font-vazir text-[16px] mt-10 border-1",
        }
      );
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="flex flex-col items-center gap-5">
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
              hanldeAddressSave={handleCreateAddress}
              setToggleAddressOverlay={setToggleAddressOverlay}
            />
          )}
          <div className="border-1 rounded-2xl p-4  w-full max-w-[350px]">
            <h2 className="font-vazir text-[16px] sm:text-[18px] font-bold text-center">
              انتخاب آدرس
            </h2>
            <div className="flex justify-center items-center">
              <button
                type="button"
                className={`${baseButton} flex flex-row gap-2 mt-5`}
                onClick={() => setToggleAddressOverlay(true)}
              >
                <MdOutlineAddLocationAlt size={22} />
                افزودن آدرس جدید
              </button>
            </div>
            <div
              className={`flex flex-col items-center mt-5 w-full ${
                addresses?.length !== 0 ? "overflow-y-auto" : ""
              } max-h-[300px] sm:max-h-[350px]`}
            >
              {addresses?.length === 0 ? (
                <div>
                  <p className="font-vazir text-[14px] sm:text-[16px] text-center">
                    آدرسی ثبت نشده است
                  </p>
                </div>
              ) : (
                addresses?.map((item) => {
                  return (
                    <div
                      key={item.addressId}
                      className="flex flex-row justify-between items-center gap-4 p-3 cursor-pointer hover:bg-gray-200 w-full"
                    >
                      <div>
                        <input
                          type="checkbox"
                          checked={selectedAddress === item.addressId}
                          onChange={() => setSelectedAddress(item.addressId)}
                          className="cursor-pointer"
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
          </div>
          <PriceData
            sumOfPrices={+prices!}
            sumOfDiscounts={+discounts!}
            sumOfQuantities={+quantities!}
          >
            <div className="flex justify-center items-center">
              {/* for the onClick we should add a function that first checks if an address is available and after that it should add the product to orders */}
              <button
                className={`${baseButton} text-center`}
                onClick={() => handlePay()}
              >
                پرداخت
              </button>
            </div>
          </PriceData>
        </div>
      </div>
    </>
  );
};

export default page;
