import { getUserByEmailPassword } from "@/lib/api/auth";
import { User } from "@/types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserLoginFields extends User {}

interface userState {
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
    // think about adding user when registering. how and where to store the registered user (except database for now)
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
      });
  },
});

export default userSlice.reducer;

export const { logout } = userSlice.actions;
