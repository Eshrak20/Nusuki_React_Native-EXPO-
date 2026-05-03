import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FlightSessionState = {
  expiresAt: number | null;
};

const initialState: FlightSessionState = {
  expiresAt: null,
};

const FLIGHT_SESSION_MINUTES = 15;

const flightSessionSlice = createSlice({
  name: "flightSession",
  initialState,
  reducers: {
    startFlightSession: (state, action: PayloadAction<number | undefined>) => {
      const minutes = action.payload ?? FLIGHT_SESSION_MINUTES;
      console.log("Starting session with minutes:", minutes);
      state.expiresAt = Date.now() + minutes * 60 * 1000;
    },

    clearFlightSession: (state) => {
      state.expiresAt = null;
    },
  },
});

export const { startFlightSession, clearFlightSession } =
  flightSessionSlice.actions;

export default flightSessionSlice.reducer;