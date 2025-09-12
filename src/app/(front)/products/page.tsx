"use client";

import formatPrice from "@/lib/utils/formatPrice";
import { useEffect, useState } from "react";
import products from "@/lib/constants/products";
import { useSearchParams } from "next/navigation";
import Filters from "./Filters";
import { productType } from "@/types/poductType";
import Image from "next/image";
import { AiOutlineOrderedList } from "react-icons/ai";
import { HiAdjustments } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { TiArrowLeft } from "react-icons/ti";
import sortAsc from "@/lib/utils/sortAsc";
import sortDiscount from "@/lib/utils/sortDiscount";
import sortDes from "@/lib/utils/sortDes";
import Link from "next/link";

interface ProductsProps {
  category: string | undefined;
  enCategory: string | undefined;
}

type discountVisibilityType = {
  [productId: number | string]: boolean;
};

type orderTypes = "most expensive" | "cheapest" | "most discount" | null;

export default function Products({
  category = "",
  enCategory = "",
}: ProductsProps) {
  const [initialProducts, setInitialProducts] = useState<productType[] | null>(
    null
  ); // We need to keep the initial products so that when the filters are cleared, we could retrieve the initial products
  const [filteredProducts, setFilteredProducts] = useState<
    productType[] | null
  >(null);
  const [toggleFilters, setToggleFilters] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<orderTypes>(null);

  const searchParams = useSearchParams();
  const source = searchParams.get("from");

  useEffect(() => {
    if (source === "discounted") {
      setInitialProducts(products.filter((item) => item.discountPercent > 0));
      setFilteredProducts(products.filter((item) => item.discountPercent > 0));
    } else if (category !== "") {
      setInitialProducts(products.filter((item) => item.category === category));
      setFilteredProducts(
        products.filter((item) => item.category === category)
      );
    } else {
      setInitialProducts(products);
      setFilteredProducts(products);
    }
  }, []);

  const [discountVisibility, setDiscountVisibility] =
    useState<discountVisibilityType>({});

  const handleImageLoad = (productId: string | number) => {
    setDiscountVisibility((prev) => ({ ...prev, [productId]: true }));
  };

  const handleImageError = (productId: string | number) => {
    setDiscountVisibility((prev) => ({ ...prev, [productId]: false }));
  };

  const handleProductsOrder = (source: orderTypes): void => {
    setSelectedOrder(source);
    if (source === "most discount") {
      setFilteredProducts(filteredProducts!?.sort(sortDiscount));
    } else if (source === "most expensive") {
      setFilteredProducts(filteredProducts!?.sort(sortDes));
    } else if (source === "cheapest") {
      setFilteredProducts(filteredProducts!?.sort(sortAsc));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white relative">
      {filteredProducts?.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="text-gray-500 font-vazir text-[16px] text-center mt-10">
            هیچ محصولی یافت نشد
          </p>
        </div>
      )}
      <div
        className={`${
          !toggleFilters && "hidden"
        } absolute left-0 right-0 top-0 z-80 bg-white`}
      >
        <div className="ml-10 mt-5 text-[14px] block">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setToggleFilters(false)}
          >
            <MdOutlineClose size={22} />
          </button>
        </div>
        <div className="mt-10 px-10">
          <Filters
            updateProducts={setFilteredProducts}
            enCategory={enCategory}
            products={initialProducts}
          />
        </div>
      </div>
      <div className="mx-10 pb-16 sm:pb-24 mt-5 flex flex-row items-start justify-between gap-5">
        <div className="flex flex-col gap-3  lg:flex-4/5 flex-1">
          {filteredProducts?.length! > 1 && (
            <div className="flex items-center overflow-x-auto whitespace-nowrap gap-3 mt-5 scrollbar-hide">
              <button
                type="button"
                className={`shrink-0 flex flex-row items-center gap-1 border-1 cursor-pointer bg-white text-black font-vazir text-12px sm:text-[14px] px-2 py-1 rounded-4xl ${
                  selectedOrder === "most expensive"
                    ? "border-black border-2 font-bold"
                    : "border-gray-700"
                }`}
                onClick={() => handleProductsOrder("most expensive")}
              >
                گرانترین
              </button>

              <button
                type="button"
                className={`shrink-0 flex flex-row items-center gap-1 border-1 cursor-pointer bg-white text-black font-vazir text-12px sm:text-[14px] px-2 py-1 rounded-4xl ${
                  selectedOrder === "cheapest"
                    ? "border-black border-2 font-bold"
                    : "border-gray-700"
                }`}
                onClick={() => handleProductsOrder("cheapest")}
              >
                ارزان‌ترین
              </button>

              <button
                type="button"
                className={`shrink-0 flex flex-row items-center gap-1 border-1 cursor-pointer bg-white text-black font-vazir text-12px sm:text-[14px] px-2 py-1 rounded-4xl ${
                  selectedOrder === "most discount"
                    ? "border-black border-2 font-bold"
                    : "border-gray-700"
                }`}
                onClick={() => handleProductsOrder("most discount")}
              >
                بیشترین تخفیف
              </button>

              <p className="hidden sm:flex shrink-0 flex-row items-center gap-1 text-black font-vazir text-12px sm:text-[14px] px-2 py-1">
                <TiArrowLeft size={20} />
                مرتب سازی بر اساس
                <AiOutlineOrderedList size={20} />
              </p>

              <button
                type="button"
                className="lg:hidden shrink-0 flex flex-row items-center gap-1 cursor-pointer border-1 bg-white text-black font-vazir text-12px sm:text-[14px] px-2 py-1 rounded-4xl border-gray-700"
                onClick={() => setToggleFilters(true)}
              >
                فیلترها
                <HiAdjustments size={20} />
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 gap-x-6 gap-y-15 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredProducts?.map((product) => (
              <Link
                key={product.id}
                href={`products/${product.id}`}
                className="group"
              >
                <div className="relative">
                  <div>
                    {product.discountPercent !== 0 &&
                      discountVisibility[product.id] !== false && (
                        <div className="absolute bg-black text-white h-8 w-10 rounded-br-2xl flex items-center justify-center z-50">
                          <p className="text-center text-[12px] sm:text-[14px] font-vazir font-medium">
                            {`${product.discountPercent}%`}
                          </p>
                        </div>
                      )}
                  </div>
                  <Image
                    width={300}
                    height={300}
                    alt={product.name}
                    src={product.imageSrc}
                    onLoad={() => handleImageLoad(product.id)}
                    onError={() => handleImageError(product.id)}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                  />
                </div>
                <h3 className="mt-4 text-[16px] font-bold text-gray-700 font-vazir text-right">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 px-2 font-vazir font-bold flex flex-row gap-1">
                    <span>تومان</span>
                    {formatPrice(
                      String(
                        +product.price -
                          (+product.price * product.discountPercent) / 100
                      )
                    )}
                  </p>
                  {product.discountPercent > 0 && (
                    <p className="mt-1 text-[16px] font-medium text-gray-900 font-vazir flex flex-row line-through">
                      {formatPrice(product.price)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:flex-1/5 hidden lg:block">
          <Filters
            updateProducts={setFilteredProducts}
            enCategory={enCategory}
            products={initialProducts}
          />
        </div>
      </div>
    </div>
  );
}
