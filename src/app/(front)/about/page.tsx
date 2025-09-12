// app/about/page.tsx
import { Heart, ShieldCheck, Headphones, Truck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="font-vazir" dir="rtl">
      <section className=" text-black bg-gray-50 py-20 text-center">
        <div className="mb-6">
          <img
            src="./zoodbuy_logo.png"
            alt="ZoodBuy Logo"
            className="mx-auto w-24 h-24 object-contain"
          />
        </div>

        <h1 className="text-4xl font-bold mb-4">درباره زودبای</h1>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed">
          فروشگاه آنلاین <span className="font-bold">زودبای (ZoodBuy)</span> با
          هدف ایجاد بهترین تجربه‌ی خرید اینترنتی برای مشتریان ایرانی راه‌اندازی
          شد. ما تلاش می‌کنیم محصولات باکیفیت و متنوع را با قیمتی مناسب و ارسال
          سریع به دست شما برسانیم.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">هدف ما</h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          هدف زودبای ساده است: ایجاد یک تجربه‌ی خرید آنلاین امن، سریع و لذت‌بخش.
          تیم ما با شور و انرژی کار می‌کند تا مطمئن شویم شما با آرامش خاطر خرید
          کنید.
        </p>
      </section>

      <section className="bg-gray-50 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">ارزش‌های ما</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
            <ShieldCheck className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">تضمین کیفیت</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              تمامی محصولات زودبای دارای ضمانت اصالت و کیفیت هستند.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
            <Heart className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">احترام به مشتری</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              مشتریان ما سرمایه اصلی فروشگاه هستند.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
            <Truck className="w-12 h-12 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">ارسال سریع</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              سفارش‌های شما در سریع‌ترین زمان ممکن ارسال می‌شوند.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
            <Headphones className="w-12 h-12 mx-auto text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">پشتیبانی ۲۴/۷</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              تیم پشتیبانی زودبای همیشه آماده پاسخگویی به شماست.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
