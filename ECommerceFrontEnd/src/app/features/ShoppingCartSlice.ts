import { persistReducer } from "redux-persist";
import { IProduct } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import { addToShoppingCart } from "@/utils";

interface IInitialState {
  cartItems: IProduct[];
}
const initialState: IInitialState = {
  cartItems: [],
};
const ShoppingCartSlice = createSlice({
  name: "shopping-cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cartItems = addToShoppingCart(action.payload, state.cartItems);
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      const filteredItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = filteredItems;
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      state.cartItems.map((item) =>
        item.id === action.payload ? (item.quantity += 1) : item.quantity
      );
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      state.cartItems.map((item) =>
        item.id === action.payload ? (item.quantity -= 1) : item.quantity
      );
    },
    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; value: number }>
    ) => {
      state.cartItems.map((item) =>
        item.id === action.payload.id
          ? (item.quantity = action.payload.value)
          : item.quantity
      );
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
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  changeQuantity,
} = ShoppingCartSlice.actions;
