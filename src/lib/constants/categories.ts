type CategoriesArr = {
  category: string;
  img: string;
  enCategory: string;
};

export const categories: CategoriesArr[] = [
  { category: "کتاب", img: "/books-cat.png", enCategory: "book" },
  { category: "لوازم تحریر", img: "/tahrir-cat.jpg", enCategory: "stationery" },
  { category: "لپ تاپ", img: "/laptop-cat.png", enCategory: "laptop" },
  { category: "موبایل", img: "/mobile-cat.jpg", enCategory: "mobile" },
  { category: "لوازم دیجیتال", img: "/digital-cat.png", enCategory: "digital" },
  {
    category: "پوشاک",
    img: "/clothes-cat.png",
    enCategory: "clothes",
  },
  {
    category: "کفش",
    img: "/shoes-cat.webp",
    enCategory: "shoes",
  },
  {
    category: "لوازم خانگی",
    img: "/home-appliance-cat.jpg",
    enCategory: "home_appliance",
  },
];
