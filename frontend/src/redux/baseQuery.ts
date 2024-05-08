import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "./store";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
