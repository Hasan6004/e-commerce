"use client";

import Pagination from "@/components/ui/pagination/Pagination";
import api from "@/lib/api/axios";
import formatPrice from "@/lib/utils/formatPrice";
import { handleError } from "@/lib/utils/handleError";
import { Order } from "@/types/order";
import { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Icon from "react-multi-date-picker/components/icon";
import removeSlash from "@/lib/utils/removeSlash";
import { IoMdCloseCircleOutline } from "react-icons/io";

type orderTypes = "all" | "shipped" | "processing" | "cancelled" | "delivered";

const filterEqv = {
  all: "همه",
  shipped: "حمل شده",
  processing: "در حال پردازش",
  cancelled: "لغو شده",
  delivered: "تحویل داده شده",
};

const page = () => {
  const [selectedFilter, setSelectedFilter] = useState<orderTypes>("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit] = useState<number>(8);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);

  const fetchOrders = async () => {
    try {
      const statusParam =
        selectedFilter === "all" ? "" : `&status=${filterEqv[selectedFilter]}`;

      const searchParam = searchInput ? `&orderId_like=${searchInput}` : "";

      const dateParam = selectedDate
        ? `&date=${removeSlash(selectedDate?.format())}`
        : "";

      const response = await api.get(
        `/orders?_page=${page}&_limit=${limit}${statusParam}${searchParam}${dateParam}`
      );

      setOrders(response.data);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (error) {
      handleError(error);
    }
  };

  const handleFilterChange = (filter: orderTypes) => {
    setSelectedFilter(filter);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleDateSearch = (date: any) => {
    setSelectedDate(date);
    setPage(1);
  };

  const filteredOrders: Order[] =
    selectedFilter === "all"
      ? orders
      : orders.filter((item) => item.status === filterEqv[selectedFilter]);

  useEffect(() => {
    fetchOrders();
  }, [page, selectedFilter, searchInput, selectedDate]);

  return (
    <>
      <div className="flex flex-col gap-4 items-center lg:flex-row lg:justify-between">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p
              className="font-vazir text-[14px] sm:text-[16px] font-bold"
              dir="rtl"
            >
              ۱۰۰
              <span className="text-gray-500 font-normal"> سفارش</span>
            </p>
            <p>|</p>
            <p
              className="font-vazir text-[14px] sm:text-[16px] font-bold"
              dir="rtl"
            >
              ۷۵
              <span className="text-gray-500 font-normal"> در حال پردارش</span>
            </p>
            <p>|</p>
            <p
              className="font-vazir text-[14px] sm:text-[16px] font-bold"
              dir="rtl"
            >
              ۲۵
              <span className="text-gray-500 font-normal"> حمل شده</span>
            </p>
          </div>
        </div>

        <div>
          <div className="lg:ml-5 ml-3 relative w-full">
            <div>
              <input
                type="text"
                className="border-1 lg:w-[350px] md:w-[250px] w-full max-w-[650px] lg:text-[16px] text-[14px] rounded-lg lg:p-2 p-1 border-[#6b6b6b] text-right"
                placeholder="جست‌وجوی سفارش"
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="absolute lg:left-2 lg:top-1 left-2 top-0 cursor-pointer hover:text-[black] lg:w-[25px] lg:h-[25px] w-[20px] h-[20px] z-[5]">
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => {
                    handleDateSearch(date);
                  }}
                  render={<Icon />}
                  calendar={persian}
                  locale={persian_fa}
                  maxDate={new DateObject({ calendar: persian })}
                  onOpenPickNewDate={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 mt-5">
        <div className="flex justify-center items-center w-full" dir="rtl">
          <div className="flex items-center overflow-x-auto whitespace-nowrap gap-3 mt-5 scrollbar-hide">
            <button
              type="button"
              className={`shrink-0 flex flex-row items-center gap-1 border-1 cursor-pointer bg-white text-black font-vazir text-[12px] sm:text-[14px] px-2 py-1 rounded-4xl ${
                selectedFilter === "all"
                  ? "border-black border-2 font-bold"
                  : "border-gray-700"
              } `}
              onClick={() => handleFilterChange("all")}
            >
              همه سفارش‌ها
            </button>

            <button
              type="button"
              className={`shrink-0 flex flex-row items-center gap-1 border-1 cursor-pointer bg-white text-black font-vazir text-[12px] sm:text-[14px] px-2 py-1 rounded-4xl ${
                selectedFilter === "processing"
                  ? "border-black border-2 font-bold"
                  : "border-gray-700"
              }
              `}
              onClick={() => handleFilterChange("processing")}
            >
              در حال پردازش
            </button>

            <button
              type="button"
              className={`shrink-0 flex flex-row items-center gap-1 border-1 cursor-pointer bg-white text-black font-vazir text-[12px] sm:text-[14px] px-2 py-1 rounded-4xl ${
                selectedFilter === "shipped"
                  ? "border-black border-2 font-bold"
                  : "border-gray-700"
              }
              `}
              onClick={() => handleFilterChange("shipped")}
            >
              حمل شده‌ها
            </button>

            <button
              type="button"
              className={`shrink-0 flex flex-row items-center gap-1 border-1 cursor-pointer bg-white text-black font-vazir text-[12px] sm:text-[14px] px-2 py-1 rounded-4xl ${
                selectedFilter === "cancelled"
                  ? "border-black border-2 font-bold"
                  : "border-gray-700"
              }
              `}
              onClick={() => handleFilterChange("cancelled")}
            >
              لغو شده‌ها
            </button>

            <button
              type="button"
              className={`shrink-0 flex flex-row items-center gap-1 border-1 cursor-pointer bg-white text-black font-vazir text-[12px] sm:text-[14px] px-2 py-1 rounded-4xl ${
                selectedFilter === "delivered"
                  ? "border-black border-2 font-bold"
                  : "border-gray-700"
              }
              `}
              onClick={() => handleFilterChange("delivered")}
            >
              تحویل شده‌ها
            </button>
          </div>
        </div>

        {selectedDate !== null && (
          <div className="flex justify-center items-center gap-2 border-2 border-black rounded-2xl p-1">
            <IoMdCloseCircleOutline
              className="cursor-pointer font-bold text-[14px] sm:text-[16px]"
              onClick={() => setSelectedDate(null)}
            />
            <p className="font-vazir text-[14px] font-medium sm:text-[16px]">
              {removeSlash(selectedDate?.format())}
            </p>
          </div>
        )}

        {filteredOrders.length === 0 ? (
          <p className="font-vazir text-[14px] sm:text-[16px] text-center w-full mt-5">
            هیچ سفارشی وجود ندارد
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto w-full scrollbar-hide">
            <table className="w-full" dir="rtl">
              <thead className="font-vazir text-[14px] sm:text-[16px] text-center bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                  <th className="font-bold px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                    شماره سفارش
                  </th>
                  <th className="font-bold px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                    تاریخ
                  </th>
                  <th className="font-bold px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                    وضعیت
                  </th>
                  <th className="font-bold px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                    مبلغ
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders!?.map((order: Order) => {
                  return (
                    <tr
                      key={order.orderId}
                      className="cursor-pointer mt-1 border-b border-default text-center"
                    >
                      <td className="font-vazir text-[14px] sm:text-[16px] px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                        {order.orderId}
                      </td>
                      <td className="font-vazir text-[14px] sm:text-[16px] px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                        {order.date}
                      </td>
                      <td className="font-vazir text-[14px] sm:text-[16px] px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                        {order.status}
                      </td>
                      <td className="font-vazir text-[14px] sm:text-[16px] px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                        {formatPrice(order.totalPrice)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {filteredOrders.length > 0 && (
          <div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        )}
      </div>
    </>
  );
};

export default page;
