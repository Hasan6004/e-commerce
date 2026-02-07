import api from "@/lib/api/axios";
import { User } from "@/types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

interface UserLoginFields extends User {}

export interface userState {
  isAuthenticated: boolean;
  authchecked: boolean;
  user: UserLoginFields | null;
  error: string | null;
  loading: boolean;
}

const initialState: userState = {
  isAuthenticated: false,
  authchecked: false,
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>(
  "user/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.post("/api/auth/login", credentials, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "خطا در ورود به حساب",
      );
    }
  },
);

export const fetchUser = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("user/me", async (_, { rejectWithValue }) => {
  const res = await axios.get("/api/auth/me", {
    withCredentials: true,
  });
  if (!res.data.user) {
    return rejectWithValue("خطا در بارگذاری اطلاعات کاربر");
  }
  return res.data.user;
});

export const updateUser = createAsyncThunk<
  User,
  {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
  },
  { rejectValue: string; state: RootState }
>("user/update", async (updatedFields, { getState, rejectWithValue }) => {
  const state = getState();
  const userId = (state as { user: userState }).user?.user?.id;
  if (!userId) {
    return rejectWithValue("لطفا ابتدا وارد شوید");
  }
  const updatedUser = await api.patch(`/users/${userId}`, updatedFields);
  if (!updatedUser) {
    rejectWithValue("خطا در به‌روزرسانی اطلاعات کاربر");
  }
  return updatedUser.data;
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/api/auth/logout");
    } catch (error: any) {
      rejectWithValue("خطا در خروج از حساب");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.loading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.loading = false;
          state.error = null;
          state.isAuthenticated = true;
          state.authchecked = true;
          state.user = action.payload;
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.authchecked = true;
        state.user = null;
        state.error = action.payload ?? "خطای ناشناخته";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? "خطای ناشناخته در به‌روزرسانی اطلاعات کاربر";
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.loading = false;
          state.error = null;
          state.isAuthenticated = action.payload ? true : false;
          state.authchecked = true;
          state.user = action.payload;
        },
      )
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.authchecked = true;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.authchecked = true;
        state.error = null;
        state.user = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload ?? "خطای ناشناخته";
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
