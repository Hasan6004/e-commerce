import { handleError } from "@/lib/utils/handleError";
import ProductsUI from "./ProductsUI";
import { getProducts } from "@/lib/products/queries";

export default async function Products() {
  const response = await getProducts();

  if (response.error) {
    handleError(response.error);
    return (
      <p className="text-center font-vazir text-[16px]">${response.error}</p>
    );
  }

  return <ProductsUI products={response.products!} />;
}
