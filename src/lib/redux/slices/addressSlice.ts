import { Address } from "@/types/address";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "@/lib/api/axios";
import { userState } from "./userSlice";

interface AddressFromServer {
  id: number;
  userId: number;
  province: string;
  city: string;
  postalCode: string;
  address: string;
}

interface AddressesState {
  loading: boolean;
  addresses: Address[] | null;
  error: string | null;
}

const initialState: AddressesState = {
  loading: false,
  error: null,
  addresses: null,
};

export const fetchAddress = createAsyncThunk<
  Address[],
  void,
  { rejectValue: string; state: RootState }
>("address/get", async (_, { getState, rejectWithValue }) => {
  const userId = (getState() as { user: userState }).user?.user?.id;
  if (!userId) {
    return rejectWithValue("کاربر وارد نشده است");
  }
  const addresses = await api.get<AddressFromServer[]>(
    `/addresses?userId=${userId}`
  );
  if (!addresses) {
    rejectWithValue("خطا در بارگذاری آدرس‌ها");
  }
  let result: Address[] = [];

  if (addresses.data.length > 0) {
    result = addresses.data.map((item) => {
      const temp: Address = {
        addressId: item.id,
        userId: item.userId,
        province: item.province,
        city: item.city,
        postalCode: item.postalCode,
        fullAddress: item.address,
      };
      return temp;
    });
  }
  return result;
});

export const addNewAddress = createAsyncThunk<
  Address,
  Omit<AddressFromServer, "id">,
  { rejectValue: string }
>("address/add", async (newAddress, { getState, rejectWithValue }) => {
  const userId = (getState() as { user: userState }).user?.user?.id;
  if (!userId) {
    return rejectWithValue("کاربر وارد نشده است");
  }
  const newAddressResponse = await api.post<AddressFromServer>(
    "/addresses",
    newAddress
  );
  if (!newAddressResponse) {
    rejectWithValue("خطا در ایجاد آدرس جدید");
  }

  const formattedNewAddress: Address = {
    addressId: newAddressResponse.data.id,
    userId: newAddressResponse.data.userId,
    province: newAddressResponse.data.province,
    city: newAddressResponse.data.city,
    fullAddress: newAddressResponse.data.address,
    postalCode: newAddressResponse.data.postalCode,
  };

  return formattedNewAddress;
});

export const deleteAddress = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("address/delete", async (id, { rejectWithValue }) => {
  const deleteResponse = await api.delete<AddressFromServer>(
    `/addresses/${id}`
  );
  if (!deleteResponse) {
    rejectWithValue("خطا در حذف آدرس");
  }
  return id;
});

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.addresses = null;
      })
      .addCase(
        fetchAddress.fulfilled,
        (state, action: PayloadAction<Address[]>) => {
          state.loading = false;
          state.error = null;
          state.addresses = action.payload;
        }
      )
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.addresses = null;
        state.error = action.payload ?? "خطای ناشناخته";
      })
      .addCase(addNewAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addNewAddress.fulfilled,
        (state, action: PayloadAction<Address>) => {
          state.error = null;
          state.loading = false;
          if (state.addresses) {
            state.addresses?.push(action.payload);
          } else {
            state.addresses = [action.payload];
          }
        }
      )
      .addCase(addNewAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "خطای ناشناخته";
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAddress.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.error = null;
          state.addresses = state.addresses!?.filter(
            (item) => item.addressId !== action.payload
          );
        }
      )
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "خطای ناشناخته";
      });
  },
});

export default addressSlice.reducer;
