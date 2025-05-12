import { persistReducer } from "redux-persist";
import { ICartProduct } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";

interface IInitialState {
  cartItems: ICartProduct[] | undefined;
}
const initialState: IInitialState = {
  cartItems: [],
};
const ShoppingCartSlice = createSlice({
  name: "shopping-cart",
  initialState,
  reducers: {
    setCartItems: (
      state,
      actions: PayloadAction<ICartProduct[] | undefined>
    ) => {
      state.cartItems = actions.payload;
    },
  },
});
const persistConfig = {
  key: "shopping-cart",
  storage,
};
const PersistShoppingCartReducer = persistReducer(
  persistConfig,
  ShoppingCartSlice.reducer
);
export default PersistShoppingCartReducer;
export const { setCartItems } = ShoppingCartSlice.actions;
