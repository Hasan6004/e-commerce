import formatPrice from "@/lib/utils/formatPrice";
import { baseButton } from "@/styles/buttonStyles";
import Link from "next/link";

const RecentOrders = () => {
  const recentOrdersData = [
    {
      id: "#1028",
      customer: "علی رضایی",
      date: "1403/06/20",
      amount: 1250000,
      status: "پرداخت‌شده",
    },
    {
      id: "#1027",
      customer: "سارا محمدی",
      date: "1403/06/20",
      amount: 780000,
      status: "در انتظار پرداخت",
    },
    {
      id: "#1026",
      customer: "محمد کریمی",
      date: "1403/06/19",
      amount: 2450000,
      status: "لغو شده",
    },
    {
      id: "#1025",
      customer: "نازنین احمدی",
      date: "1403/06/19",
      amount: 560000,
      status: "پرداخت‌شده",
    },
    {
      id: "#1024",
      customer: "حسین موسوی",
      date: "1403/06/18",
      amount: 1980000,
      status: "پرداخت‌شده",
    },
    {
      id: "#1023",
      customer: "مریم جعفری",
      date: "1403/06/18",
      amount: 920000,
      status: "در انتظار پرداخت",
    },
  ];

  return (
    <>
      <div className="w-[100%] border-1 shadow-md py-5 rounded-2xl">
        <h2 className="text-center font-vazir text-[18px] font-bold mb-2">
          سفارش‌های اخیر
        </h2>
        <table className="table-auto md:table-fixed w-full" dir="rtl">
          <thead className="font-vazir text-[16px] text-center bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th className="font-bold px-6 py-3">شماره سفارش</th>
              <th className="font-bold px-6 py-3">نام مشتری</th>
              <th className="font-bold px-6 py-3">تاریخ</th>
              <th className="font-bold px-6 py-3">مبلغ</th>
              <th className="font-bold px-6 py-3">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {recentOrdersData.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="cursor-pointer mt-1 border-b border-default text-center"
                >
                  <td className="font-vazir text-[16px] px-6 py-3">
                    {item.id}
                  </td>
                  <td className="font-vazir text-[16px] px-6 py-3">
                    {item.customer}
                  </td>
                  <td className="font-vazir text-[16px] px-6 py-3">
                    {item.date}
                  </td>
                  <td className="font-vazir text-[16px] px-6 py-3">
                    {formatPrice(item.amount)}
                  </td>
                  <td className="font-vazir text-[16px] px-6 py-3">
                    {item.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-center mt-5">
          <Link href={"/adminPanel/orderManagement"}>
            <button className={baseButton}>مشاهده بیشتر</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecentOrders;
