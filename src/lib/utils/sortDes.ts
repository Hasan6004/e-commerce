import { productType } from "@/types/poductType";

const sortDes = (a: productType, b: productType) => {
  const discountedPriceA = +a.price - (+a.price * a.discountPercent) / 100;
  const discountedPriceB = +b.price - (+b.price * b.discountPercent) / 100;
  return discountedPriceB - discountedPriceA;
};

export default sortDes;
