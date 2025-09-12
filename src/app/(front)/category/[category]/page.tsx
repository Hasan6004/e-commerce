import { categories } from "@/lib/constants/categories";
import Products from "../../products/page";

type Props = {
  params: { category: string };
};

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params;
  const persianNameCategory = categories.find(
    (item) => item.enCategory === category
  );
  return (
    <>
      <h1 className="font-vazir text-[20px] font-bold text-center mt-5">
        دسته‌بندی:{persianNameCategory?.category}
      </h1>
      <Products
        category={persianNameCategory?.category}
        enCategory={persianNameCategory?.enCategory}
      />
    </>
  );
};

export default CategoryPage;
