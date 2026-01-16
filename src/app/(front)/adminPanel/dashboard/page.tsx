"use client";

import KpiCard from "@/components/ui/kpiCard/KpiCard";
import MonthlySalesChart from "@/components/ui/chart/Chart";
import LowStock from "@/components/ui/lowStock/LowStock";
import RecentOrders from "@/components/ui/recentOrders/RecentOrders";

const page = () => {
  return (
    <>
      <div className="w-full">
        <section
          className="flex flex-col md:flex-row gap-8 md:gap-10 items-center justify-evenly mt-10"
          dir="rtl"
        >
          <KpiCard
            title="مجموع فروش"
            change={-20}
            value={"14500000"}
            iconSrc="/images/sale.png"
          />
          <KpiCard
            title="تعداد سفارشات"
            value={"۲۳۰۰"}
            change={40}
            iconSrc="/images/order.png"
          />
          <KpiCard
            title="موجودی کالاها"
            value={"۱۲۰۰۰"}
            change={15}
            iconSrc="/images/products.png"
          />
          <KpiCard
            title="میانگین مبلغ سفارش"
            value={"۳۰۰۰۰۰"}
            change={10}
            iconSrc="/images/average.png"
          />
        </section>
        <section className="mt-15 mb-10 p-2">
          <MonthlySalesChart />
        </section>
        <section className="mt-10 p-2">
          <LowStock />
        </section>
        <section className="mt-10 p-2">
          <RecentOrders />
        </section>
      </div>
    </>
  );
};

export default page;
