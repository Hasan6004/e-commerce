"use client";
import formatPrice from "@/lib/utils/formatPrice";
import Link from "next/link";
import { useRef } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import products from "@/lib/constants/products";
import Image from "next/image";

export default function ProductCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector("div");
      if (!card) return;
      const cardWidth = (card as HTMLElement).offsetWidth + 16; // width + gap
      carouselRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const limitedProducts = products
    .filter((item) => item.discountPercent > 0)
    ?.slice(0, 7);

  return (
    <div className="relative w-full">
      {/* Prev Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow shadow-gray-800 p-2 rounded-full z-10 cursor-pointer outline-0"
      >
        <GrFormPrevious size={24} />
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {limitedProducts.map((p) => (
          <div
            key={p.id}
            className="min-w-[60%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[18%] bg-white rounded-xl shadow shadow-gray-400 pb-4 cursor-pointer"
          >
            <div className="relative">
              <div className="absolute bg-black text-white h-8 w-10 rounded-br-2xl flex items-center justify-center">
                <p className="text-center text-[12px] sm:text-[14px] font-vazir font-medium">
                  {formatPrice(p.discountPercent)}%
                </p>
              </div>
              <Image
                width={300}
                height={300}
                src={p.imageSrc}
                alt={p.name}
                className="w-full h-60 object-cover rounded-md"
              />
            </div>
            <h3 className="mt-2 font-medium px-2 text-right font-vazir">
              {p.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-gray-700 px-2 font-vazir font-bold">
                {formatPrice(
                  String(+p.price - (+p.price * p.discountPercent) / 100)
                )}
              </p>
              <p className="text-gray-500 px-2 font-vazir line-through">
                {formatPrice(p.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow shadow-gray-800 p-2 rounded-full z-10 outline-0 cursor-pointer"
      >
        <GrFormNext size={24} />
      </button>
      <div className="flex items-center justify-center mt-3">
        <Link href={{ pathname: "/products", query: { from: "discounted" } }}>
          <button className="font-vazir font-medium bg-white shadow shadow-gray-800 px-3 py-2 rounded-full z-10 outline-0 cursor-pointer">
            مشاهده همه
          </button>
        </Link>
      </div>
    </div>
  );
}
