import { categories } from "@/lib/constants/categories";
import { getProducts } from "@/lib/products/queries";
import ProductsUI from "../../products/ProductsUI";
import { handleError } from "@/lib/utils/handleError";

type Props = {
  params: { category: string };
};

const page = async ({ params }: Props) => {
  const { category } = await params;

  const persianNameCategory = categories.find(
    (item) => item.enCategory === category,
  );

  const response = await getProducts({
    category: persianNameCategory?.category,
  });

  if (response.error) {
    handleError(response.error);
    return (
      <p className="text-center font-vazir text-[16px]">${response.error}</p>
    );
  }

  return (
    <>
      <h1 className="font-vazir text-[20px] font-bold text-center mt-5">
        دسته‌بندی:{persianNameCategory?.category}
      </h1>
      <ProductsUI products={response.products!} />
    </>
  );
};

export default page;
