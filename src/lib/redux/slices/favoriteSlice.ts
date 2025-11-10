import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface favoriteItem {
  productId: number;
}

const initialState: number[] = [];

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.push(action.payload);
      toast.success("محصول موردنظر به لیست علاقه‌مندی‌ها افزوده شد", {
        className: "font-vazir text-[14px] mt-10",
      });
    },
    removeFromFavorites: (state, action) => {
      toast.success("محصول موردنظر از لیست علاقه‌مندی‌ها حذف شد", {
        className: "font-vazir text-[14px] mt-10",
      });
      return state.filter((item) => item !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
