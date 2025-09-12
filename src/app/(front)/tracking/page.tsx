export default function TrackingPage() {
  return (
    <div
      className="font-vazir bg-white text-black flex justify-center px-4 py-16"
      dir="rtl"
    >
      <div className="w-full bg-gray-50 shadow-lg mx-5 rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">
          پیگیری سفارش
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          برای اطلاع از وضعیت سفارش خود، کافیست کد پیگیری را در بخش «پیگیری
          سفارش» وارد کنید.
        </p>
        <ul className="list-disc pr-6 space-y-2 text-gray-700">
          <li>ورود به پنل کاربری</li>
          <li>انتخاب گزینه «پیگیری سفارش»</li>
          <li>مشاهده آخرین وضعیت ارسال سفارش</li>
        </ul>
      </div>
    </div>
  );
}
