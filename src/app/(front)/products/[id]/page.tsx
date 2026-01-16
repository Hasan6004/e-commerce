"use client";

import { Fragment, use, useEffect } from "react";
import products from "@/lib/constants/products";
import formatPrice from "@/lib/utils/formatPrice";
import { baseButton } from "@/styles/buttonStyles";
import Image from "next/image";
import { useState } from "react";
import { addToCart, incrementQuantity } from "@/lib/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdOutlineBookmarkRemove } from "react-icons/md";
import {
  addFavorite,
  removeFromFavorites,
} from "@/lib/redux/slices/favoriteSlice";
import { handleError } from "@/lib/utils/handleError";

type Props = {
  params: Promise<{ id: string }>;
};

const colorClasses: Record<string, string> = {
  black: "bg-black",
  white: "bg-white",
  pink: "bg-pink-700",
  blue: "bg-blue-700",
  green: "bg-green-700",
  orange: "bg-orange-700",
  gray: "bg-gray-700",
  silver: "bg-gray-700",
};

export default function ProductDetailsPage({ params }: Props) {
  const { id } = use(params);
  const productId = Number(id);

  const product = products.find((item) => item.id === productId);

  const [activeTab, setActiveTab] = useState<"description" | "specs">(
    "description"
  );

  const [isInFavorites, setIsInFavorites] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart);

  const { user } = useSelector((state: RootState) => state.user);

  const { favorites } = useSelector((state: RootState) => state.favorite);

  const handleAddToCart = () => {
    // first we should check if its in the user cart beforehand. if it exists then we only need to increment its quantity
    const cartProduct = cartItems.find((item) => item.id === product?.id);
    if (cartProduct) {
      dispatch(incrementQuantity(product?.id));
    } else {
      dispatch(
        addToCart({
          id: product?.id,
          name: product?.name,
          price: product?.price,
          quantity: 1,
          image: product?.imageSrc,
          discountPercent: product?.discountPercent,
        })
      );
    }
    toast.success("محصول مورد نظر به سبد خرید اضافه شد", {
      className: "font-vazir text-[14px] sm:text-[16px] mt-10",
    });
  };

  const handleAddToFavorite = async (productId: number) => {
    try {
      await dispatch(
        addFavorite({
          productId,
          userId: +user!?.id,
        })
      ).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  const handleRemoveFromFavorite = async (id: number) => {
    try {
      await dispatch(removeFromFavorites(id)).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  if (!product) return <p>محصولی یافت نشد</p>;

  useEffect(() => {
    setIsInFavorites(
      !!favorites?.some(
        (item) => item.productId === +productId && item.userId === +user!.id
      )
    );
  }, [favorites]);

  return (
    <div className="px-10 w-full py-10">
      <div className="flex flex-col items-center lg:flex-row-reverse lg:items-start lg:justify-between py-5">
        {/* Product image */}
        <div className="flex-1">
          <Image
            width={500}
            height={500}
            src={product.imageSrc}
            alt={product.name}
          />
        </div>

        {/* Product details */}
        <div className="flex-2 flex flex-col items-center mt-5" dir="rtl">
          <div>
            <h1 className="font-vazir font-bold text-[24px] sm:text-[30px] mb-5">
              {product.name}
            </h1>

            {/* Tabs */}
            <div className="flex justify-start items-center gap-5 mb-6 p-5">
              <button
                type="button"
                className={`font-vazir text-[14px] sm:text-[16px] cursor-pointer ${
                  activeTab === "description"
                    ? "text-black font-bold border-b-2 border-black"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("description")}
              >
                توضیحات
              </button>
              <button
                type="button"
                className={`font-vazir sm:text-[16px] text-[14px] cursor-pointer ${
                  activeTab === "specs"
                    ? "text-black font-bold border-b-2 border-black"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("specs")}
              >
                مشخصات
              </button>
            </div>

            {activeTab === "description" ? (
              <p className="font-vazir text-[16px] sm:text-[18px] sm:max-w-[600px]  text-justify leading-[30px] text-gray-700">
                {product.description}
              </p>
            ) : (
              <div className="flex flex-col gap-6 sm:w-[600px] p-5">
                {product.specs &&
                  Object.entries(product.specs).map(([key, value]) => (
                    <Fragment key={key}>
                      <div className="flex flex-row justify-between">
                        <p className="font-vazir text-gray-500 font-medium sm:text-[16px] text-[14px]">
                          {key}
                        </p>
                        <p className="font-vazir sm:text-[16px] text-[14px]">
                          {value}
                        </p>
                      </div>
                    </Fragment>
                  ))}
              </div>
            )}

            {/* Colors */}
            {product.color && (
              <div className="mt-5">
                <span className="font-vazir text-[18px] sm:text-[20px] font-bold">
                  رنگ‌ها:
                </span>
                <div
                  className={`w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] ${
                    colorClasses[product.color]
                  }
                  }   rounded-full border-2 border-gray-200 mt-3 cursor-pointer`}
                />
              </div>
            )}

            {/* Price Section */}
            <div className="mt-10 flex flex-col">
              <div className="flex flex-row items-start justify-between gap-5">
                {product.inStock === 0 ? (
                  <p className="font-vazir font-bold text-red-500 text-[18px] sm:text-[20px]">
                    ناموجود
                  </p>
                ) : (
                  <>
                    <p
                      className={`font-vazir  ${
                        product.discountPercent > 0
                          ? "line-through text-gray-600 text-[16px] sm:text-[18px] font-medium"
                          : "text-black text-[16px] sm:text-[18px] font-bold"
                      }`}
                    >
                      {formatPrice(product.price)}
                      {product.discountPercent === 0 && (
                        <span className="mr-2">تومان</span>
                      )}
                    </p>
                    {product.discountPercent > 0 && (
                      <>
                        <div className="sm:w-[36px] sm:h-[36px] w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center">
                          <span className="font-vazir text-[12px] sm:text-[14px] font-medium">
                            {product.discountPercent}%
                          </span>
                        </div>
                        <div>
                          <p className="font-vazir text-black text-[18px] sm:text-[20px] font-bold">
                            {formatPrice(
                              +product.price -
                                (+product.price * product.discountPercent) / 100
                            )}
                            <span className="mr-2">تومان</span>
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Add to cart */}
              {product.inStock > 0 && (
                <div className="mt-10 text-center flex justify-center items-center gap-3">
                  <button
                    type="button"
                    className={`${baseButton} px-15`}
                    onClick={() => handleAddToCart()}
                  >
                    افزودن به سبد خرید
                  </button>
                  {isInFavorites ? (
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => handleRemoveFromFavorite(+productId)}
                    >
                      <MdOutlineBookmarkRemove size={32} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => handleAddToFavorite(+product?.id)}
                    >
                      <MdOutlineBookmarkAdd size={32} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
