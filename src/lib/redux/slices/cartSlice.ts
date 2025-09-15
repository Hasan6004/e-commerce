import products from "@/lib/constants/products";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface cartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  discountPercent: number;
}

const initialState: cartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      toast.success("محصول موردنظر از سبد خرید حذف شد", {
        className: "font-vazir text-[16px] mt-10",
      });
      return state.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      // Checking inStock
      const inStock = products.find(
        (item) => item.id === action.payload
      )?.inStock;

      const product = state.find((item) => item.id === action.payload);
      if (product && inStock) {
        if (inStock - product.quantity > 0) {
          product.quantity += 1;
        } else {
          toast.error("موجودی محصول موردنظر کافی نیست", {
            className: "font-vazir text-[16px] mt-10",
          });
        }
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
