import { ILogin, ISignup } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface ILoginResponse {
  token: string;
}
interface IRegisterResponse {
  token: string;
}
export const AuthApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (build) => ({
    Signup: build.mutation<IRegisterResponse, ISignup>({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),
    Login: build.mutation<ILoginResponse, ILogin>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),
    Logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),
  }),
});
// eslint-disable-next-line react-refresh/only-export-components
export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  AuthApiSlice;
