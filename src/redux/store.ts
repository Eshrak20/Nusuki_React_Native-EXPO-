import { configureStore } from "@reduxjs/toolkit";
import { laravelApi } from "./api/laravelApi";
import flightSearchReducer from "./features/flightSearchSlice";
export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
    [laravelApi.reducerPath]: laravelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(laravelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;