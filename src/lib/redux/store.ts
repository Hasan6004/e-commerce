import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import addressReducer from "./slices/addressSlice";
import orderReducer from "./slices/orderSlice";
import favoriteReducer from "./slices/favoriteSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    address: addressReducer,
    order: orderReducer,
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
