import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authApi } from "./authApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
