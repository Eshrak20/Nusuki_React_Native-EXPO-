import { configureStore } from "@reduxjs/toolkit";
import { laravelApi } from "./api/laravelApi";

export const store = configureStore({
  reducer: {
    [laravelApi.reducerPath]: laravelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(laravelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;