import { ILogin, ISignup } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface ILoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}
interface IRegisterResponse {
  token: string;
}
export const AuthApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (build) => ({
    Signup: build.mutation<IRegisterResponse, ISignup>({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
    Login: build.mutation<ILoginResponse, ILogin>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    Logout: build.mutation({
      query: (token) => ({
        url: "/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {},
      }),
    }),
  }),
});
// eslint-disable-next-line react-refresh/only-export-components
export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  AuthApiSlice;
