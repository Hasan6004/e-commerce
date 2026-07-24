export type productType = {
  id: string;

  slug: string;

  brand: string | null;
  name: string;

  price: number;
  discountPercent: number;
  inStock: number;

  color?: string;

  category: string;

  href: string;

  imageSrc: string;

  description: string;

  specs?: Record<string, string>;

  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;
};
