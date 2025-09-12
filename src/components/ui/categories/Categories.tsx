import { categories } from "@/lib/constants/categories";
import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  return (
    <>
      <div className="sm:border-1 sm:m-10 sm:rounded-2xl sm:shadow-lg sm:pb-10">
        <h2 className="flex items-center justify-center font-vazir text-[26px] sm:text-[32px] md:text-[36px] font-bold text-gray-800 p-5 sm:p-10 mt-8">
          دسته‌بندی‌ کالاها
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-5 mt-5 sm:px-10">
          {categories.map((cat) => {
            return (
              <Link
                key={cat.category}
                href={`/category/${encodeURIComponent(cat.enCategory)}`}
              >
                <div className="flex flex-col items-center sm:gap-3 md:gap-5 gap-2 p-5">
                  <Image
                    width={300}
                    height={300}
                    src={cat.img}
                    alt="Books"
                    className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] rounded-[100%] cursor-pointer"
                  />
                  <p className="font-vazir font-medium sm:text-[18px] text-[16px] cursor-pointer">
                    {cat.category}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;
