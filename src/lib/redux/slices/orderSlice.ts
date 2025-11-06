import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/types/order";
import { RootState } from "../store";
import { userState } from "./userSlice";
import api from "@/lib/api/axios";

interface OrdersState {
  loading: boolean;
  error: string | null;
  orders: Order[] | null;
}

const initialState: OrdersState = {
  loading: false,
  error: null,
  orders: null,
};

export const fetchOrdersByUser = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string; state: RootState }
>("orders/fetch", async (_, { getState, rejectWithValue }) => {
  const userId = (getState() as { user: userState }).user?.user?.id;
  if (!userId) {
    return rejectWithValue("کاربر وارد نشده است");
  }
  const orders = await api.get<Order[]>(`/orders?userId=${userId}`);
  if (!orders) {
    rejectWithValue("خطا در بارگذاری سفارش‌ها");
  }

  return orders.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orders = null;
      })
      .addCase(
        fetchOrdersByUser.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.error = null;
          state.orders = action.payload;
        }
      )
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.loading = false;
        state.orders = null;
        state.error = action.payload ?? "خطای ناشناخته";
      });
  },
});

export default orderSlice.reducer;
