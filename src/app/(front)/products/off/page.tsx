import { handleError } from "@/lib/utils/handleError";
import { getProducts } from "@/lib/products/product";
import ProductsUI from "../ProductsUI";

export default async function Products() {
  const response = await getProducts({ list: "discounted" });

  if (response.error) {
    handleError(response.error);
    return (
      <p className="text-center font-vazir text-[16px]">${response.error}</p>
    );
  }

  return <ProductsUI products={response.products!} />;
}
