export default function SupportPage() {
  return (
    <div
      className="font-vazir bg-white text-black flex justify-center px-4 py-16"
      dir="rtl"
    >
      <div className="w-full bg-gray-50 shadow-lg mx-5 rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">
          پشتیبانی آنلاین
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          تیم پشتیبانی زودبای همیشه آماده پاسخگویی به سوالات و مشکلات شماست.
        </p>
        <ul className="list-disc pr-6 space-y-2 text-gray-700">
          <li>ساعات پاسخگویی: همه روزه از ۹ صبح تا ۹ شب</li>
          <li>پاسخ سریع به ایمیل‌ها و تماس‌ها</li>
        </ul>
      </div>
    </div>
  );
}
