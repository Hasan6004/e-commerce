import { getProduct } from "@/lib/products/product";
import ProductDetailsPage from "./ProductDetails";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const response = await getProduct(slug);

  if (!response.product) return <p>${response.error}</p>;

  return <ProductDetailsPage product={response.product} />;
}
