import { createApi } from "@reduxjs/toolkit/query/react";
import { Photo } from "../types";

import { baseQuery } from "./baseQuery";

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery,
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], void>({
      query: () => "photos/",
    }),
  }),
});

export const { useGetPhotosQuery } = photosApi;
