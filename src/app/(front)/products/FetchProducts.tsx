// import axios from "axios";

// export const FetchProducts = async () => {
//   try {
//     const res = await axios.get("/api/products");
//     const productsUI = res?.data?.products?.map((p: any) => ({
//       id: p.id,
//       brand: p.brand,
//       name: p.name,
//       price: p.price,
//       discountPercent: p.discount_percent,
//       inStock: p.in_stock,
//       color: p.color,
//       category: p.category,
//       href: p.href,
//       imageSrc: p.image_src,
//       description: p.description,
//       specs: p.specs,
//     }));

//     return productsUI;
//   } catch (error) {
//     console.log("Error fetching products:", error);
//     return null;
//   }
// };
