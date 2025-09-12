export type productType = {
  id: number | string;
  brand: string;
  name: string;
  price: string | number;
  discountPercent: number;
  inStock: number;
  color?: string;
  category: string;
  href: string;
  imageSrc: string;
  ram?: string;
  cpu?: string;
  description: string;
  specs?: {
    [key: string]: string;
  };
};
