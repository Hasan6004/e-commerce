"use client";

import products from "@/lib/constants/products";
import { fetchOrdersByUser } from "@/lib/redux/slices/orderSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import formatPrice from "@/lib/utils/formatPrice";
import { handleError } from "@/lib/utils/handleError";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type orderStatus = "در حال پردازش" | "تحویل داده شده" | "لغو شده" | "حمل شده";

const Orders = () => {
  const [selectedType, setSelectedType] =
    useState<orderStatus>("در حال پردازش");

  const { orders } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();

  const fetchOrders = async () => {
    try {
      await dispatch(fetchOrdersByUser()).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  const formattedOrders = useMemo(() => {
    console.log(orders);
    const selectedStatusOrders = orders?.filter(
      (item) => item.status === selectedType
    );

    return selectedStatusOrders?.map((item) => {
      const productDetails = item.products.map((p) => {
        const temp = products.find((i) => i.id === p.productId)!;

        return {
          productId: p.productId,
          name: temp.name,
          image: temp.imageSrc,
          price: +temp.price,
          quantity: p.quantity,
        };
      });

      return {
        orderId: item.orderId,
        userId: item.userId,
        products: productDetails,
        date: item.date,
        totalPrice: item.totalPrice,
      };
    });
  }, [orders, selectedType]);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="sm:p-6 p-5">
        <div className="flex justify-center items-center">
          <div className="border-1 rounded-2xl p-4 sm:min-w-[700px]">
            <h2 className="text-center font-medium text-[15px] sm:text-[17px] font-vazir">
              تاریخچه سفارشات
            </h2>
            <div className="flex flex-row items-center justify-evenly gap-8 mt-8">
              <button
                className={`font-vazir text-[16px] font-medium cursor-pointer ${
                  selectedType === "لغو شده" && "border-b-3 border-black pb-1"
                }
                `}
                onClick={() => setSelectedType("لغو شده")}
              >
                لغو شده
              </button>
              <button
                className={`font-vazir text-[16px] font-medium cursor-pointer ${
                  selectedType === "تحویل داده شده" &&
                  "border-b-3 border-black pb-1"
                }`}
                onClick={() => setSelectedType("تحویل داده شده")}
              >
                تحویل شده
              </button>
              <button
                className={`font-vazir text-[16px] font-medium cursor-pointer ${
                  selectedType === "در حال پردازش" &&
                  "border-b-3 border-black pb-1"
                }`}
                onClick={() => setSelectedType("در حال پردازش")}
              >
                جاری
              </button>
            </div>
            <div className="h-[1px] w-full bg-gray-100" />
            <div className="mt-5">
              {formattedOrders?.length === 0 && (
                <p className="font-vazir text-[14px] sm:text-[16px] text-center">
                  سفارشی وجود ندارد
                </p>
              )}
              <div className="flex flex-col gap-3 max-h-[600px] overflow-auto">
                {formattedOrders?.map((order) => (
                  <div
                    key={order.orderId}
                    className="p-4 w-[100%] border-1 border-gray-300 rounded-2xl flex flex-col gap-5 cursor-pointer"
                  >
                    <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between items-center sm:mx-5 mt-3">
                      <p className="font-vazir sm:text-[14px] text-[12px] font-bold">
                        {order.date}
                        <span className="text-gray-500 font-medium ml-3">
                          تاریخ ثبت سفارش
                        </span>
                      </p>
                      <p className="font-vazir sm:text-[14px] text-[12px] font-bold">
                        <span className="text-gray-500 font-medium ml-3">
                          کد پیگیری سفارش
                        </span>
                        {order.orderId}
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="font-vazir sm:text-[14px] text-[12px] font-bold">
                        <span className="text-gray-500 font-medium ml-2">
                          مبلغ کل سفارش
                        </span>
                        {formatPrice(order.totalPrice)}
                        <span className="mr-1">تومان</span>
                      </p>
                    </div>
                    {order.products.map((product) => (
                      <div
                        key={product.productId}
                        className="flex flex-col justify-center sm:flex-row sm:justify-between items-center sm:mx-5"
                      >
                        <div>
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="flex flex-col items-end gap-2 mt-5 sm:mt-0">
                          <p className="font-vazir text-[14px] sm:text-[16px] font-bold">
                            {product.name}
                          </p>
                          <p className="font-vazir sm:text-[16px] text-[14px] font-bold">
                            <span className="text-gray-500 font-medium ml-2">
                              تعداد
                            </span>
                            {product.quantity}
                          </p>
                          <p className="font-vazir font-bold sm:text-[16px] text-[14px]">
                            <span className="text-gray-500 font-medium ml-2">
                              قیمت واحد
                            </span>
                            {formatPrice(product.price)}
                            <span className="mr-1">تومان</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
