import { categories } from "@/lib/constants/categories";
import Link from "next/link";

const Categories = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h2 className="font-vazir font-bold text-[20px]">انتخاب دسته‌بندی</h2>
      <ul
        className={`w-full flex flex-col justify-center items-center bg-white shadow-md border rounded-md mt-0 z-50`}
      >
        {categories.map((cat, i) => (
          <Link
            key={i}
            href={`/category/${encodeURIComponent(cat.enCategory)}`}
          >
            <li className="px-4 py-2 hover:bg-gray-100 text-right text-gray-700 cursor-pointer font-vazir">
              {cat.category}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
