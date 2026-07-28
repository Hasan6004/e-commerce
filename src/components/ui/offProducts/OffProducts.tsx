import { getProducts } from "@/lib/products/queries";
import ProductCarousel from "../carousel/Carousel";
import { handleError } from "@/lib/utils/handleError";

const OffProducts = async () => {
  const response = await getProducts({ list: "discounted", limit: 7 });

  if (response.error) {
    handleError(response.error);
    return (
      <p className="text-center font-vazir text-[16px] mt-10">
        {response.error}
      </p>
    );
  }

  return (
    <>
      <div className="mt-10">
        <h2 className="flex items-center justify-center font-vazir text-[26px] sm:text-[32px] md:text-[36px] font-bold text-gray-800 p-5 sm:p-10 mt-8">
          تخفیف‌دارها
        </h2>
        <div className="w-full flex items-center justify-center p-10 pt-0">
          <ProductCarousel products={response.products!} />
        </div>
      </div>
    </>
  );
};

export default OffProducts;
