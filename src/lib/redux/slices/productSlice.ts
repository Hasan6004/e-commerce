import { productType } from "@/types/poductType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

interface ProductState {
  products: productType[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  productType[],
  void,
  { rejectValue: string; state: RootState }
>("products/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/api/products");
    const productsUI = res?.data?.products?.map((p: any) => ({
      id: p.id,
      brand: p.brand,
      name: p.name,
      price: p.price,
      discountPercent: p.discount_percent,
      inStock: p.in_stock,
      color: p.color,
      category: p.category,
      href: p.href,
      imageSrc: p.image_src,
      description: p.description,
      specs: p.specs,
    }));

    return productsUI;
  } catch (error) {
    return rejectWithValue("خطا در بارگذاری محصولات");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "خطای ناشناخته";
      });
  },
});

export default productsSlice.reducer;
