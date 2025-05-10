import { persistReducer } from "redux-persist";
import { IWishlist } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

interface IInitialState {
  wishlist: IWishlist[] | undefined;
}
const initialState: IInitialState = {
  wishlist: [],
};
const wishlistStoreSlice = createSlice({
  name: "wishlist-store",
  initialState,
  reducers: {
    setWishlist: (state, actions: PayloadAction<IWishlist[] | undefined>) => {
      state.wishlist = actions.payload;
    },
  },
});
const persistConfig = {
  key: "wishlist-store",
  storage,
};
const PersistWishlistReducer = persistReducer(
  persistConfig,
  wishlistStoreSlice.reducer
);
export default PersistWishlistReducer;
export const { setWishlist } = wishlistStoreSlice.actions;
