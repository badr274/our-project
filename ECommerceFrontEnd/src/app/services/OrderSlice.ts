import { IOrder, IOrderResponse } from "@/interfaces";
import CookieService from "@/services/CookieService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
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
    getOrders: build.query<{ order: IOrder[] | undefined }, void>({
      query: () => "/orders",
    }),
    getSingleOrder: build.query<
      { order: IOrder | undefined },
      { orderId: number }
    >({
      query: (args) => `/orders/${args.orderId}`,
    }),
    addOrder: build.mutation<
      IOrderResponse,
      { address: string; phone: string }
    >({
      query: (args) => ({
        url: "/orders",
        method: "POST",
        body: args,
      }),
    }),
    // updateOrder: build.mutation<
    //   { message: string; cart: IOrderResponse[] | undefined },
    //   { product_id: number; quantity: number }
    // >({
    //   query: (args) => ({
    //     url: `/cart/${args.product_id}`,
    //     method: "PUT",
    //     body: args,
    //   }),
    // }),
    // removeOrder: build.mutation<
    //   { message: string; cart: IOrderResponse[] | undefined },
    //   { product_id: number }
    // >({
    //   query: (args) => ({
    //     url: `/cart/${args.product_id}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});
export const {
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useAddOrderMutation,
} = orderApiSlice;
