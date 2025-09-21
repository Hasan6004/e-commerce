import { baseButton } from "@/styles/buttonStyles";
import Slider from "../../features/Slider";
import { heroImages } from "@/lib/constants/heroImages";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between lg:items-start items-center p-5 sm:p-10">
        <div className="relative sm:flex-1">
          <Slider>
            {heroImages.map((item) => (
              <Image
                width={600}
                height={600}
                key={item.id}
                src={item.img}
                alt="image"
                className="w-full sm:h-[80vh] h-[60vh] object-cover"
              />
            ))}
          </Slider>
        </div>
        <div className="lg:flex-1 flex flex-col items-center text-right mt-10 lg:mt-25 lg:ml-5">
          <h1 className="font-vazir font-bold md:text-[60px] sm:text-[50px] text-[42px] leading-[100px]">
            <span className="">از تکنولوژی تا پوشاک</span>
            <br />
            <span className="">با خیال راحت خرید کن</span>
          </h1>
          <Link href={{ pathname: "/products", query: { from: "all" } }}>
            <button
              className={`${baseButton} md:text-[24px] sm:text-[22px] text-[20px] mt-5 md:mt-10`}
            >
              مشاهده محصولات
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
