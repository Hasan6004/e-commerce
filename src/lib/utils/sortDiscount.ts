import { productType } from "@/types/poductType";

const sortDiscount = (a: productType, b: productType) => {
  return b.discountPercent - a.discountPercent;
};

export default sortDiscount;
