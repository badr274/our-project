import { IWishlist } from "@/interfaces";
import CookieService from "@/services/CookieService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApiSlice = createApi({
  reducerPath: "wishlistApi",
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
    getWishlistItems: build.query<{ wishlists: IWishlist[] | undefined }, void>(
      {
        query: () => "/wishlist",
      }
    ),
    addItemToWishlist: build.mutation<
      { message: string; wishlists: IWishlist[] | undefined },
      { product_id: number }
    >({
      query: (args) => ({
        url: "/wishlist",
        method: "POST",
        body: args,
      }),
    }),
    updateWishlistItem: build.mutation<
      { message: string; wishlists: IWishlist[] | undefined },
      { product_id: number }
    >({
      query: (args) => ({
        url: `/wishlist/${args.product_id}`,
        method: "PUT",
        body: args,
      }),
    }),
    removeItemFromWishlist: build.mutation<
      { message: string; wishlists: IWishlist[] | undefined },
      { product_id: number }
    >({
      query: (args) => ({
        url: `/wishlist/${args.product_id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useAddItemToWishlistMutation,
  useGetWishlistItemsQuery,
  useRemoveItemFromWishlistMutation,
  useUpdateWishlistItemMutation,
} = wishlistApiSlice;
