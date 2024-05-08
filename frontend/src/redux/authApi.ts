import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthCredentials, AuthResponse } from "./types";

import { baseQuery } from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
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
