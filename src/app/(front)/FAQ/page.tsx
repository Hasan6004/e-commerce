export default function FaqPage() {
  return (
    <div
      className="font-vazir bg-white text-black flex justify-center px-4 py-16"
      dir="rtl"
    >
      <div className="w-full bg-gray-50 shadow-lg mx-5 rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">
          سوالات متداول
        </h1>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <div>
            <h2 className="font-semibold">چطور می‌توانم سفارشم را ثبت کنم؟</h2>
            <p>
              پس از انتخاب محصول مورد نظر، آن را به سبد خرید اضافه کرده و مراحل
              ثبت سفارش را کامل کنید.
            </p>
          </div>
          <div>
            <h2 className="font-semibold">مدت زمان ارسال چقدر است؟</h2>
            <p>سفارش‌ها معمولاً بین ۲ تا ۵ روز کاری به دست مشتری می‌رسند.</p>
          </div>
          <div>
            <h2 className="font-semibold">آیا امکان بازگشت کالا وجود دارد؟</h2>
            <p>
              بله، در صورت وجود مشکل می‌توانید تا ۷ روز پس از تحویل کالا درخواست
              بازگشت ثبت کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
