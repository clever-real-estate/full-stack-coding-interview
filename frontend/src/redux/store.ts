import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./authApi";
import authMiddleware from "./authMiddleware";
import authReducer from "./authSlice";
import { photosApi } from "./photosApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authMiddleware,
      authApi.middleware,
      photosApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
