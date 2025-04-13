import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productsApiSlice = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "/products",
    }),
    getLatestProducts: build.query({
      query: () => "/latest-products",
    }),
    getSingleProduct: build.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetLatestProductsQuery,
  useGetSingleProductQuery,
} = productsApiSlice;
