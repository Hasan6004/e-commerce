import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { productType } from "@/types/poductType";

interface favoriteState {
  loading: boolean;
  error: string | null;
  favorites: productType[] | null;
}

const initialState: favoriteState = {
  loading: false,
  error: null,
  favorites: null,
};

export const addFavorite = createAsyncThunk<
  productType,
  { productId: number },
  { rejectValue: string }
>("favorite/add", async (newFavorite, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/favorites", newFavorite, {
      withCredentials: true,
    });
    return res.data.favorite;
  } catch (error) {
    return rejectWithValue("خطا در افزودن به علاقه‌مندی‌ها");
  }
});

export const fetchFavorites = createAsyncThunk<
  productType[],
  void,
  { rejectValue: string }
>("favorite/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/api/favorites", {
      withCredentials: true,
    });
    // Format the response to match the productType structure expected by the UI
    const favoritesUI = res?.data?.favorites?.map((p: any) => ({
      id: p["product"].id,
      brand: p["product"].brand,
      name: p["product"].name,
      price: p["product"].price,
      discountPercent: p["product"].discount_percent,
      inStock: p["product"].in_stock,
      color: p["product"].color,
      category: p["product"].category,
      href: p["product"].href,
      imageSrc: p["product"].image_src,
      description: p["product"].description,
      specs: p["product"].specs,
    }));

    return favoritesUI;
  } catch (err) {
    return rejectWithValue("خطا در بارگذاری محصولات موردعلاقه");
  }
});

export const removeFromFavorites = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("favorite/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await axios.delete("/api/favorites", {
      data: { productId: id },
      withCredentials: true,
    });
    return res.data.productId;
  } catch (error) {
    rejectWithValue("خطا در حذف محصول موردنظر");
  }
});

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "خطای ناشناخته";
      })
      .addCase(
        addFavorite.fulfilled,
        (state, action: PayloadAction<productType>) => {
          state.error = null;
          state.loading = false;
          state.favorites = state.favorites
            ? [...state.favorites, action.payload]
            : [action.payload];
        },
      )
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "خطای ناشناخته";
      })
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<productType[]>) => {
          state.loading = false;
          state.error = null;
          state.favorites = action.payload;
        },
      )
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "خطای ناشناخته";
      })
      .addCase(
        removeFromFavorites.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.error = null;
          state.favorites = state.favorites!?.filter(
            (item) => item.id !== action.payload,
          );
        },
      );
  },
});

export default favoriteSlice.reducer;
