"use client";
import formatPrice from "@/lib/utils/formatPrice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function MonthlySalesChart() {
  const data = [
    { month: "فروردین", فروش: formatPrice(4200000), سفارشات: 120 },
    { month: "اردیبهشت", فروش: formatPrice(3900000), سفارشات: 98 },
    { month: "خرداد", فروش: formatPrice(5200000), سفارشات: 140 },
    { month: "تیر", فروش: formatPrice(6100000), سفارشات: 160 },
    { month: "مرداد", فروش: formatPrice(4500000), سفارشات: 110 },
    { month: "شهریور", فروش: formatPrice(7000000), سفارشات: 180 },
    { month: "مهر", فروش: formatPrice(5300000), سفارشات: 150 },
    { month: "آبان", فروش: formatPrice(4800000), سفارشات: 100 },
    { month: "آذر", فروش: formatPrice(6200000), سفارشات: 170 },
    { month: "دی", فروش: formatPrice(5800000), سفارشات: 130 },
    { month: "بهمن", فروش: formatPrice(6100000), سفارشات: 160 },
    { month: "اسفند", فروش: formatPrice(7500000), سفارشات: 190 },
  ];

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow min-h-[350px]">
      <h2 className="text-lg font-semibold font-vazir text-center mb-4">
        نمودار فروش
      </h2>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="فروش"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="سفارشات"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
