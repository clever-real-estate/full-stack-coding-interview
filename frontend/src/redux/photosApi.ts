import { createApi } from "@reduxjs/toolkit/query/react";
import { Photo } from "../types";

import { baseQuery } from "./baseQuery";

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery,
  tagTypes: ["Photos"],
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], void>({
      query: () => "photos/",
    }),
    likePhoto: builder.mutation<void, number>({
      query: (photoId) => ({
        url: "photos/like/",
        method: "POST",
        body: { photo: photoId },
      }),
      onQueryStarted: async (photoId, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          photosApi.util.updateQueryData(
            "getPhotos",
            undefined,
            (draftPhotos) => {
              const photo = draftPhotos.find((p) => p.id === photoId);
              if (photo) {
                photo.liked = !photo.liked;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetPhotosQuery, useLikePhotoMutation } = photosApi;
