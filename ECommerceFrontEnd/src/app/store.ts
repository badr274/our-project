import { configureStore } from "@reduxjs/toolkit";
import { AuthApiSlice } from "./auth/AuthApiSlice";
import { productsApiSlice } from "./services/ProductsSlice";
import { cartApiSlice } from "./services/CartSlice";
import { wishlistApiSlice } from "./services/WishlistSlice";
import PersistShoppingCartReducer from "./features/ShoppingCartSlice";
import PersistWishlistReducer from "./features/wihslistStoreSlice";
import persistStore from "redux-persist/es/persistStore";
const store = configureStore({
  reducer: {
    [AuthApiSlice.reducerPath]: AuthApiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [cartApiSlice.reducerPath]: cartApiSlice.reducer,
    [wishlistApiSlice.reducerPath]: wishlistApiSlice.reducer,
    shoppingCart: PersistShoppingCartReducer,
    wislistStore: PersistWishlistReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      productsApiSlice.middleware,
      AuthApiSlice.middleware,
      cartApiSlice.middleware,
      wishlistApiSlice.middleware,
    ]);
  },
});
export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
