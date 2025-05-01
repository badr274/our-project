import { ICartProduct } from "@/interfaces";
import CookieService from "@/services/CookieService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApiSlice = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = CookieService.get("token");

      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getCartProducts: build.query<{ carts: ICartProduct[] | undefined }, void>({
      query: () => "/cart",
    }),
    addProductToCart: build.mutation<
      { message: string; cart: ICartProduct[] | undefined },
      { product_id: number; quantity: number }
    >({
      query: (args) => ({
        url: "/cart",
        method: "POST",
        body: args,
      }),
    }),
    updateProductInCart: build.mutation<
      { message: string; cart: ICartProduct[] | undefined },
      { product_id: number; quantity: number }
    >({
      query: (args) => ({
        url: `/cart/${args.product_id}`,
        method: "PUT",
        body: args,
      }),
    }),
    removeProductFromCart: build.mutation<
      { message: string; cart: ICartProduct[] | undefined },
      { product_id: number }
    >({
      query: (args) => ({
        url: `/cart/${args.product_id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetCartProductsQuery,
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
  useUpdateProductInCartMutation,
} = cartApiSlice;
