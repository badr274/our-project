import { configureStore } from "@reduxjs/toolkit";
import { productsApiSlice } from "./services/ProductsSlice";
import { AuthApiSlice } from "./auth/AuthApiSlice";
import PersistShoppingCartReducer from "./features/ShoppingCartSlice";
import persistStore from "redux-persist/es/persistStore";
const store = configureStore({
  reducer: {
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [AuthApiSlice.reducerPath]: AuthApiSlice.reducer,
    shoppingCart: PersistShoppingCartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat([productsApiSlice.middleware, AuthApiSlice.middleware]);
  },
});
export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
