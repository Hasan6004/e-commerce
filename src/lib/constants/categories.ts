type CategoriesArr = {
  category: string;
  img: string;
  enCategory: string;
};

export const categories: CategoriesArr[] = [
  { category: "کتاب", img: "/images/books-cat.png", enCategory: "book" },
  {
    category: "لوازم تحریر",
    img: "/images/tahrir-cat.jpg",
    enCategory: "stationery",
  },
  { category: "لپ تاپ", img: "/images/laptop-cat.png", enCategory: "laptop" },
  { category: "موبایل", img: "/images/mobile-cat.jpg", enCategory: "mobile" },
  {
    category: "لوازم دیجیتال",
    img: "/images/digital-cat.png",
    enCategory: "digital",
  },
  {
    category: "پوشاک",
    img: "/images/clothes-cat.png",
    enCategory: "clothes",
  },
  {
    category: "کفش",
    img: "/images/shoes-cat.webp",
    enCategory: "shoes",
  },
  {
    category: "لوازم خانگی",
    img: "/images/home-appliance-cat.jpg",
    enCategory: "home_appliance",
  },
];
