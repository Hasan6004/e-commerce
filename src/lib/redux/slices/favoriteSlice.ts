import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { userState } from "./userSlice";
import api from "@/lib/api/axios";

interface favoriteItem {
  productId: number;
  userId: number;
  id: number;
}

interface favoriteState {
  loading: boolean;
  error: string | null;
  favorites: favoriteItem[] | null;
}

const initialState: favoriteState = {
  loading: false,
  error: null,
  favorites: null,
};

export const addFavorite = createAsyncThunk<
  favoriteItem,
  Omit<favoriteItem, "id">,
  { rejectValue: string }
>("favorite/add", async (newFavorite, { getState, rejectWithValue }) => {
  const userId = (getState() as { user: userState }).user.user?.id;
  if (!userId) {
    console.log("HEREEEEeeee");
    return rejectWithValue("لطفا ابتدا وارد شوید");
  }
  const newFavoriteResponse = await api.post<favoriteItem>(
    "/favorites",
    newFavorite
  );
  if (!newFavoriteResponse) {
    return rejectWithValue("خطا در اضافه کردن به علاقه‌مندی‌ها");
  }
  return newFavoriteResponse.data;
});

export const fetchFavorites = createAsyncThunk<
  favoriteItem[],
  void,
  { state: RootState; rejectValue: string }
>("favorite/fetch", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const userId = state.user.user?.id;

    if (!userId) {
      return rejectWithValue("لطفا ابتدا وارد شوید");
    }

    const response = await api.get<favoriteItem[]>(
      `/favorites?userId=${userId}`
    );

    return response.data;
  } catch (err) {
    return rejectWithValue("خطا در بارگذاری محصولات موردعلاقه");
  }
});

export const removeFromFavorites = createAsyncThunk<
  number,
  number,
  { state: RootState; rejectValue: string }
>("favorite/delete", async (id, { getState, rejectWithValue }) => {
  try {
    const userId = (getState() as { user: userState }).user.user?.id;

    if (!userId) {
      return rejectWithValue("لطفا ابتدا وارد شوید");
    }

    const getItem = await api.get(
      `/favorites?userId=${userId}&productId=${id}`
    );

    if (getItem.data.length > 0) {
      const favoriteId = getItem.data[0].id;
      await api.delete(`/favorites/${favoriteId}`);
      return favoriteId;
    }
  } catch (error) {
    rejectWithValue("خطا در حذف محصول موردنظر");
  }
});

// const initialState: number[] = [];

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    //   addToFavorites: (state, action) => {
    //     state.push(action.payload);
    //     toast.success("محصول موردنظر به لیست علاقه‌مندی‌ها افزوده شد", {
    //       className: "font-vazir text-[14px] mt-10",
    //     });
    //   },
    //   removeFromFavorites: (state, action) => {
    //     toast.success("محصول موردنظر از لیست علاقه‌مندی‌ها حذف شد", {
    //       className: "font-vazir text-[14px] mt-10",
    //     });
    //     return state.filter((item) => item !== action.payload);
    //   },
  },
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
        (state, action: PayloadAction<favoriteItem>) => {
          state.error = null;
          state.loading = false;
          if (state.favorites) {
            state.favorites?.push(action.payload);
          } else {
            state.favorites = [action.payload];
          }
        }
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
        (state, action: PayloadAction<favoriteItem[]>) => {
          state.loading = false;
          state.error = null;
          state.favorites = action.payload;
        }
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
            (item) => item.id !== action.payload
          );
        }
      );
  },
});

// export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
