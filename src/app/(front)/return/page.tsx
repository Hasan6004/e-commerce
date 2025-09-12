export default function ReturnPage() {
  return (
    <div
      className="font-vazir bg-white text-black flex justify-center px-4 py-16"
      dir="rtl"
    >
      <div className="w-full bg-gray-50 shadow-lg mx-5 rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">
          بازگشت کالا
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          مشتریان می‌توانند در صورت وجود مشکل یا مغایرت کالا، درخواست بازگشت ثبت
          کنند.
        </p>
        <ul className="list-disc pr-6 space-y-2 text-gray-700">
          <li>مدت زمان مجاز برای بازگشت: ۷ روز پس از تحویل</li>
          <li>کالا باید در بسته‌بندی اولیه و بدون آسیب باشد</li>
          <li>هزینه ارسال بر عهده فروشگاه خواهد بود (در صورت تایید مشکل)</li>
        </ul>
      </div>
    </div>
  );
}
