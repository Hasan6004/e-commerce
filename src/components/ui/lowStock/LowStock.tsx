import products from "@/lib/constants/products";
import { baseButton } from "@/styles/buttonStyles";
import Image from "next/image";
import Link from "next/link";

const LowStock = () => {
  return (
    <>
      <div className="border-1 rounded-2xl shadow-md py-5 px-5" dir="rtl">
        <h2 className="font-vazir sm:text-[18px] text-[16px] font-bold text-center mb-10">
          لیست محصولات کم‌موجودی
        </h2>
        <div className="flex flex-col sm:flex-row justify-evenly sm:gap-0 gap-8">
          <div
            className={`flex flex-row justify-evenly items-start px-3 flex-1 cursor-pointer rounded-2xl hover:shadow-md transition-shadow duration-300 p-1 ${
              products[0].inStock === 0 && "animate-pulse"
            }`}
          >
            <div>
              <Image
                src={products[0].imageSrc}
                width={90}
                height={90}
                alt="image"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-vazir text-[14px] sm:text-[16px] font-medium">
                {products[0].name}
              </p>
              <p
                className={`font-vazir text-[16px] ${
                  products[0].inStock === 0 ? "text-red-600" : "text-red-400"
                } font-bold`}
              >
                <span className="font-normal text-gray-600">موجودی </span>
                {products[0].inStock}
              </p>
            </div>
          </div>

          <div
            className={`flex flex-row justify-evenly items-start px-3 flex-1 cursor-pointer rounded-2xl hover:shadow-md transition-shadow duration-300 p-1 ${
              products[2].inStock === 0 && "animate-pulse"
            }`}
          >
            <div>
              <Image
                src={products[2].imageSrc}
                width={90}
                height={90}
                alt="image"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-vazir text-[14px] sm:text-[16px] font-medium">
                {products[2].name}
              </p>
              <p
                className={`font-vazir text-[16px] ${
                  products[2].inStock === 0 ? "text-red-600" : "text-red-400"
                } font-bold`}
              >
                <span className="font-normal text-gray-600">موجودی </span>
                {products[2].inStock}
              </p>
            </div>
          </div>

          <div
            className={`flex flex-row justify-evenly items-start px-3 flex-1 cursor-pointer rounded-2xl hover:shadow-md transition-shadow duration-300 p-1 ${
              products[5].inStock === 0 && "animate-pulse"
            }`}
          >
            <div>
              <Image
                src={products[5].imageSrc}
                width={90}
                height={90}
                alt="image"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-vazir text-[14px] sm:text-[16px] font-medium">
                {products[5].name}
              </p>
              <p
                className={`font-vazir text-[16px] ${
                  products[5].inStock === 0 ? "text-red-600" : "text-red-400"
                } font-bold`}
              >
                <span className="font-normal text-gray-600">موجودی </span>
                {products[5].inStock}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href={"/adminPanel/productManagement"}>
            <button className={`${baseButton}`}>مشاهده همه</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LowStock;
