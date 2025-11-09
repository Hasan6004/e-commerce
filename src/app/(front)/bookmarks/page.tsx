"use client";

import products from "@/lib/constants/products";
import { RootState } from "@/lib/redux/store";
import formatPrice from "@/lib/utils/formatPrice";
import { productType } from "@/types/poductType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type discountVisibilityType = {
  [productId: number | string]: boolean;
};

const Bookmarks = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<
    productType[] | null
  >(null);

  const favorites = useSelector((state: RootState) => state.favorite);
  const [discountVisibility, setDiscountVisibility] =
    useState<discountVisibilityType>({});

  const handleImageLoad = (productId: string | number) => {
    setDiscountVisibility((prev) => ({ ...prev, [productId]: true }));
  };

  const handleImageError = (productId: string | number) => {
    setDiscountVisibility((prev) => ({ ...prev, [productId]: false }));
  };

  useEffect(() => {
    let result: productType[] = [];
    favorites.forEach((favId) => {
      const temp = products.find((item) => item.id === favId);
      if (temp) {
        result.push(temp);
      }
    });
    setFavoriteProducts(result);
  }, []);

  return (
    <>
      {favoriteProducts?.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="text-gray-500 font-vazir text-[16px] text-center mt-10">
            هیچ محصولی در لیست علاقه‌مندی‌ها یافت نشد
          </p>
        </div>
      )}
      <div className="p-10 grid grid-cols-1 gap-x-6 gap-y-15 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {favoriteProducts?.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
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
              {product.inStock === 0 ? (
                <p className="font-vazir text-red-500 font-medium text-[18px]">
                  ناموجود
                </p>
              ) : (
                <>
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
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Bookmarks;
