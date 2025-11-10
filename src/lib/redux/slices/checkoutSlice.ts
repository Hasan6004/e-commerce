import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface checkoutNumbers {
  prices: number;
  discounts: number;
  quantities: number;
}

const initialState: checkoutNumbers = {
  prices: 0,
  discounts: 0,
  quantities: 0,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setNumbers: (state, action: PayloadAction<checkoutNumbers>) => {
      state.prices = action.payload.prices;
      state.discounts = action.payload.discounts;
      state.quantities = action.payload.quantities;
    },
  },
});

export const { setNumbers } = checkoutSlice.actions;
export default checkoutSlice.reducer;
