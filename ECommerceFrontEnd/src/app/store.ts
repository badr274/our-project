import { configureStore } from "@reduxjs/toolkit";
import { AuthApiSlice } from "./auth/AuthApiSlice";
import { productsApiSlice } from "./services/ProductsSlice";
import { cartApiSlice } from "./services/CartSlice";
import PersistShoppingCartReducer from "./features/ShoppingCartSlice";
import persistStore from "redux-persist/es/persistStore";
const store = configureStore({
  reducer: {
    [AuthApiSlice.reducerPath]: AuthApiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [cartApiSlice.reducerPath]: cartApiSlice.reducer,
    shoppingCart: PersistShoppingCartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      productsApiSlice.middleware,
      AuthApiSlice.middleware,
      cartApiSlice.middleware,
    ]);
  },
});
export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
