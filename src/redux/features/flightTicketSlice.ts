import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SortBy, SortOrder } from "../../types/flight/types.flightResults";

export type FlightTicketFilters = {
  refundability: string[];
  stops: number[];
  airlines: string[];
  layover_cities: string[];
  aircraft: string[];
  flight_schedules: {
    departure: string[];
    arrival: string[];
  };
  price_min: number | null;
  price_max: number | null;
  layover_duration_min: number | null;
  layover_duration_max: number | null;
};

type FlightTicketState = {
  filters: FlightTicketFilters;
  sortBy: SortBy;
  sortOrder: SortOrder;
  selectedAirlineCode: string | null;
};

const initialFilters: FlightTicketFilters = {
  refundability: [],
  stops: [],
  airlines: [],
  layover_cities: [],
  aircraft: [],
  flight_schedules: {
    departure: [],
    arrival: [],
  },
  price_min: null,
  price_max: null,
  layover_duration_min: null,
  layover_duration_max: null,
};

const initialState: FlightTicketState = {
  filters: initialFilters,
  sortBy: "price",
  sortOrder: "asc",
  selectedAirlineCode: null,
};

const toggleArrayValue = <T,>(items: T[], value: T) => {
  return items.includes(value)
    ? items.filter((item) => item !== value)
    : [...items, value];
};

const flightTicketSlice = createSlice({
  name: "flightTicket",
  initialState,
  reducers: {
    toggleRefundability: (state, action: PayloadAction<string>) => {
      state.filters.refundability = toggleArrayValue(
        state.filters.refundability,
        action.payload,
      );
    },

    toggleStop: (state, action: PayloadAction<number>) => {
      state.filters.stops = toggleArrayValue(state.filters.stops, action.payload);
    },

    toggleAirline: (state, action: PayloadAction<string>) => {
      state.filters.airlines = toggleArrayValue(
        state.filters.airlines,
        action.payload,
      );
    },

    toggleLayoverCity: (state, action: PayloadAction<string>) => {
      state.filters.layover_cities = toggleArrayValue(
        state.filters.layover_cities,
        action.payload,
      );
    },

    toggleAircraft: (state, action: PayloadAction<string>) => {
      state.filters.aircraft = toggleArrayValue(
        state.filters.aircraft,
        action.payload,
      );
    },

    toggleSchedule: (
      state,
      action: PayloadAction<{
        type: "departure" | "arrival";
        value: string;
      }>,
    ) => {
      const { type, value } = action.payload;

      state.filters.flight_schedules[type] = toggleArrayValue(
        state.filters.flight_schedules[type],
        value,
      );
    },

    setPriceRange: (
      state,
      action: PayloadAction<{ min: number | null; max: number | null }>,
    ) => {
      state.filters.price_min = action.payload.min;
      state.filters.price_max = action.payload.max;
    },

    setLayoverRange: (
      state,
      action: PayloadAction<{ min: number | null; max: number | null }>,
    ) => {
      state.filters.layover_duration_min = action.payload.min;
      state.filters.layover_duration_max = action.payload.max;
    },

    setSort: (
      state,
      action: PayloadAction<{ sortBy: SortBy; sortOrder: SortOrder }>,
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },

    setSelectedAirlineCode: (state, action: PayloadAction<string | null>) => {
      state.selectedAirlineCode = action.payload;
    },

    resetFlightTicketFilters: (state) => {
      state.filters = initialFilters;
      state.selectedAirlineCode = null;
    },

    resetFlightTicketUi: (state) => {
      state.sortBy = "price";
      state.sortOrder = "asc";
      state.selectedAirlineCode = null;
    },
  },
});

export const {
  toggleRefundability,
  toggleStop,
  toggleAirline,
  toggleLayoverCity,
  toggleAircraft,
  toggleSchedule,
  setPriceRange,
  setLayoverRange,
  setSort,
  setSelectedAirlineCode,
  resetFlightTicketFilters,
  resetFlightTicketUi,
} = flightTicketSlice.actions;

export default flightTicketSlice.reducer;