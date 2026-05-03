import { configureStore } from "@reduxjs/toolkit";
import { laravelApi } from "./api/laravelApi";
import flightSessionReducer from "./features/flightSessionSlice";
import flightSearchReducer from "./features/flightSearchSlice";
import flightTicketSlice from "./features/flightTicketSlice";
export const store = configureStore({
  reducer: {
    flightSession: flightSessionReducer,
    flightSearch: flightSearchReducer,
    flightTicket: flightTicketSlice,
    [laravelApi.reducerPath]: laravelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(laravelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;