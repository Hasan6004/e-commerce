// app/contact/page.tsx
"use client";

export default function ContactPage() {
  return (
    <div className="font-vazir bg-white text-black min-h-screen" dir="rtl">
      <section className="py-16 text-center border-b border-gray-200">
        <h1 className="text-4xl font-bold mb-4">ارتباط با زودبای</h1>
        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
          خوشحال می‌شویم با شما در ارتباط باشیم. اگر سوالی دارید، نیاز به
          راهنمایی دارید یا قصد همکاری با ما را دارید، از طریق راه‌های زیر با
          تیم زودبای تماس بگیرید.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-6">راه‌های تماس</h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <span className="font-semibold">ایمیل پشتیبانی:</span>{" "}
              support@zoodbuy.com
            </li>
            <li>
              <span className="font-semibold">ایمیل همکاری‌ها:</span>{" "}
              business@zoodbuy.com
            </li>
            <li>
              <span className="font-semibold">تلفن:</span> ۰۲۱-۱۲۳۴۵۶۷۸
            </li>
            <li>
              <span className="font-semibold">آدرس:</span> تهران، خیابان نمونه،
              پلاک ۱۲۳
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">ساعت پاسخگویی</h3>
            <p className="text-gray-700">
              پشتیبانی تلفنی: شنبه تا پنج‌شنبه، ۹ صبح تا ۶ عصر
            </p>
            <p className="text-gray-700">
              پشتیبانی ایمیل: ۲۴ ساعته / ۷ روز هفته
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">شبکه‌های اجتماعی</h3>
            <div className="flex gap-4 text-gray-700">
              <a href="#" className="hover:underline">
                اینستاگرام
              </a>
              <a href="#" className="hover:underline">
                تلگرام
              </a>
              <a href="#" className="hover:underline">
                لینکدین
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">فرم تماس سریع</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <input
              type="email"
              placeholder="ایمیل"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <input
              type="text"
              placeholder="موضوع"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <textarea
              placeholder="پیام شما"
              rows={5}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
            >
              ارسال پیام
            </button>
          </form>
        </div>
      </section>

      {/* Optional Map */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">محل ما روی نقشه</h2>
        <div className="w-full h-72 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            src="https://maps.google.com/maps?q=Tehran&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
