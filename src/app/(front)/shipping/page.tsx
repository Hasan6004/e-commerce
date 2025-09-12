export default function ShippingPage() {
  return (
    <div
      className="font-vazir bg-white text-black flex justify-center px-4 py-16"
      dir="rtl"
    >
      <div className="w-full bg-gray-50 shadow-lg mx-5 rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">
          شرایط ارسال
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          ارسال سفارش‌ها از طریق پست پیشتاز و شرکت‌های حمل و نقل معتبر انجام
          می‌شود.
        </p>
        <ul className="list-disc pr-6 space-y-2 text-gray-700">
          <li>مدت زمان ارسال ۲ تا ۵ روز کاری است.</li>
          <li>هزینه ارسال بر اساس وزن و مقصد محاسبه می‌شود.</li>
          <li>پیگیری سفارش از طریق پنل کاربری امکان‌پذیر است.</li>
        </ul>
      </div>
    </div>
  );
}
