import { getUserByEmailPassword } from "@/lib/api/auth";
import api from "@/lib/api/axios";
import { User } from "@/types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserLoginFields extends User {}

export interface userState {
  isAuthenticated: boolean;
  user: UserLoginFields | null;
  // token: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: userState = {
  isAuthenticated: false,
  user: null,
  // token: null,
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
    { rejectWithValue }
  ) => {
    const user = await getUserByEmailPassword(
      credentials.email,
      credentials.password
    );
    if (!user) {
      return rejectWithValue("ایمیل یا رمز عبور اشتباه است");
    }
    return user;
  }
);

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
    return rejectWithValue("کاربر وارد نشده است");
  }
  const updatedUser = await api.patch(`/users/${userId}`, updatedFields);
  if (!updatedUser) {
    rejectWithValue("خطا در به‌روزرسانی اطلاعات کاربر");
  }
  return updatedUser.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        // state.token = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.loading = false;
          state.error = null;
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
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
      });
  },
});

export default userSlice.reducer;

export const { logout } = userSlice.actions;
