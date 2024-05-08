import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthCredentials, AuthResponse } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    getToken: builder.mutation<AuthResponse, AuthCredentials>({
      query: (credentials) => ({
        url: "auth/token/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetTokenMutation } = authApi;
export default authApi.reducer;
