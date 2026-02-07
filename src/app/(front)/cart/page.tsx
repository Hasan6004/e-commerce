"use client";

import { RootState } from "@/lib/redux/store";
import Image from "next/image";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/lib/redux/slices/cartSlice";
import formatPrice from "@/lib/utils/formatPrice";
import { baseButton } from "@/styles/buttonStyles";
import Link from "next/link";
import PriceData from "@/components/ui/priceData/PriceData";
import { setNumbers } from "@/lib/redux/slices/checkoutSlice";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart);

  const sumOfQuantities = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const sumOfPrices = cartItems.reduce((acc, item) => {
    return acc + +item.price * item.quantity;
  }, 0);

  const sumOfDiscounts = cartItems.reduce((acc, item) => {
    return acc + (+item.price * item.quantity * item.discountPercent) / 100;
  }, 0);

  const dispatch = useDispatch();

  return (
    <>
      <div className="p-5 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 mb-30">
        {cartItems.length === 0 ? (
          <div className="text-center text-[18px] sm:text-[22px]  font-bold font-vazir h-[100vh] flex flex-col items-center justify-start gap-10 mt-20">
            <BsCartX size={60} />
            <p>!سبد خرید شما خالی است</p>
          </div>
        ) : (
          <>
            <div className="border-1 rounded-2xl w-full max-w-[600px] p-2 sm:p-5 flex flex-col gap-3">
              {cartItems?.map((item, index) => {
                return (
                  <Fragment key={String(item.id).concat(String(index))}>
                    <div className="flex flex-row items-start justify-end min-h-[120px] gap-6 bg-gray-50 p-3 rounded-2xl">
                      <div className="flex flex-col items-end gap-5">
                        <div className="font-vazir font-bold text-[14px] sm:text-[18px]">
                          {item.name}
                        </div>
                        <div className="font-vazir font-medium text-[14px] sm:text-[16px] flex flex-row gap-1">
                          <p>{formatPrice(item.price)}</p>
                          <span> :قیمت</span>
                        </div>
                        {item.discountPercent > 0 && (
                          <div className="font-vazir font-medium text-[14px] sm:text-[16px] text-red-600  flex flex-row gap-1">
                            <p>
                              <span className="sm:text-[14px] text-[12px] font-vazir">{`(${item.discountPercent}%) `}</span>
                              {formatPrice(
                                (item.price * item.discountPercent) / 100,
                              )}
                            </p>
                            <span>:تخفیف</span>
                          </div>
                        )}
                        <div className="flex flex-row gap-2 items-center">
                          {item.quantity > 1 ? (
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(decrementQuantity(item.id))
                              }
                            >
                              <FaMinus className="cursor-pointer w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => dispatch(removeFromCart(item.id))}
                            >
                              <MdDelete className="cursor-pointer w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" />
                            </button>
                          )}
                          <div className="font-vazir text-[14px] sm:text-[16px]">
                            {item.quantity}
                          </div>
                          <button
                            type="button"
                            onClick={() => dispatch(incrementQuantity(item.id))}
                          >
                            <FaPlus className="cursor-pointer w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                          </button>
                        </div>
                      </div>
                      <Image
                        width={70}
                        height={70}
                        src={item.image}
                        alt={item.name}
                        className="rounded-full object-cover w-[70px] h-[70px] sm:w-[100px] sm:h-[100px]"
                      />
                    </div>
                  </Fragment>
                );
              })}
            </div>
            <PriceData
              sumOfDiscounts={sumOfDiscounts}
              sumOfPrices={sumOfPrices}
              sumOfQuantities={sumOfQuantities}
            >
              <div className="w-[100%] sm:flex justify-center hidden mt-3">
                <Link href="/checkout">
                  <button
                    className={baseButton}
                    onClick={() =>
                      dispatch(
                        setNumbers({
                          prices: sumOfPrices,
                          discounts: sumOfDiscounts,
                          quantities: sumOfQuantities,
                        }),
                      )
                    }
                  >
                    تایید و پرداخت سفارش
                  </button>
                </Link>
              </div>
            </PriceData>
            <div className="sm:hidden flex justify-center w-full">
              <Link href="/checkout">
                <button
                  className={baseButton}
                  onClick={() =>
                    dispatch(
                      setNumbers({
                        prices: sumOfPrices,
                        discounts: sumOfDiscounts,
                        quantities: sumOfQuantities,
                      }),
                    )
                  }
                >
                  تایید و پرداخت سفارش
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
