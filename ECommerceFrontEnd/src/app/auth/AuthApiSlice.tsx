import { ILogin, ISignup } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface ILoginResponse {
  token: string;
}
interface IRegisterResponse {
  token: string;
}
export const AuthApiSlice = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000" }),
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
  }),
});
// eslint-disable-next-line react-refresh/only-export-components
export const { useLoginMutation, useSignupMutation } = AuthApiSlice;
