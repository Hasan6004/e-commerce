export default function RulesPage() {
  return (
    <div
      className="font-vazir bg-white text-black flex justify-center px-4 py-16"
      dir="rtl"
    >
      <div className="w-full bg-gray-50 shadow-lg mx-5 rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">
          قوانین و مقررات
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          استفاده از فروشگاه اینترنتی زودبای به معنای پذیرفتن قوانین و مقررات
          زیر است. لطفاً پیش از ثبت سفارش خود، این موارد را مطالعه کنید.
        </p>
        <ul className="list-disc pr-6 space-y-2 text-gray-700">
          <li>اطلاعات کاربری باید صحیح و کامل وارد شود.</li>
          <li>رعایت حقوق مصرف‌کننده در اولویت فروشگاه است.</li>
          <li>هرگونه سوءاستفاده از سایت پیگرد قانونی دارد.</li>
        </ul>
      </div>
    </div>
  );
}
