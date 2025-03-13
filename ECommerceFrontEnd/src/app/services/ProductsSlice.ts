import { IProduct } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productsApiSlice = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "/products",
    }),
    getLimitProducts: build.query({
      query: () => "/products?limit=10",
    }),
    getSingleProduct: build.query<IProduct, number | string | undefined>({
      query: (id) => `/products/${id}`,
    }),
    getProductsByCategory: build.query({
      query: (category: string | null) => `/products/category/${category}`,
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetLimitProductsQuery,
  useGetSingleProductQuery,
  useGetProductsByCategoryQuery,
} = productsApiSlice;
