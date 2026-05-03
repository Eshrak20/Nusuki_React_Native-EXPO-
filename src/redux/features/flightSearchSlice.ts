import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialFlightSearchState } from "../../data/flightConfig";
import type {
  AirportItem,
  CabinClass,
  FareType,
  FlightSearchState,
  FlightSegment,
  Travelers,
  TripType,
} from "../../types/flight/types.flight";
import { addDaysToApiDate, isApiDateBefore } from "../../utils/flightDate";

type SegmentAirportPayload = {
  index: number;
  field: "fromDest" | "toDest";
  airport: AirportItem;
};

type SegmentDatePayload = {
  index: number;
  departureDate: string;
};

type TravelerCountKey = "adults" | "children" | "infants";

type UpdateTravelerCountPayload = {
  key: TravelerCountKey;
  value: number;
};

type UpdateChildAgePayload = {
  index: number;
  age: number;
};

const normalizeStudentFareTravelers = (state: FlightSearchState) => {
  if (state.fareType === "student") {
    state.travelers.children = 0;
    state.travelers.child_ages = [];
    state.travelers.infants = 0;
  }
};

const ensureChildrenAges = (travelers: Travelers) => {
  if (travelers.children > travelers.child_ages.length) {
    while (travelers.child_ages.length < travelers.children) {
      travelers.child_ages.push(2);
    }
  } else {
    travelers.child_ages = travelers.child_ages.slice(0, travelers.children);
  }
};

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState: initialFlightSearchState,
  reducers: {
    setTripType: (state, action: PayloadAction<TripType>) => {
      state.tripType = action.payload;

      if (action.payload === "one_way") {
        state.returnDate = "";
      }

      if (action.payload === "multi_way") {
        if (state.segments.length < 2) {
          state.segments = [
            { fromDest: state.fromDest, toDest: state.toDest, departureDate: state.departureDate },
            { fromDest: state.toDest, toDest: null, departureDate: state.returnDate || "" },
          ];
        }
      }
    },

    setFromDest: (state, action: PayloadAction<AirportItem | null>) => {
      state.fromDest = action.payload;
    },

    setToDest: (state, action: PayloadAction<AirportItem | null>) => {
      state.toDest = action.payload;
    },

    swapDestinations: (state) => {
      const temp = state.fromDest;
      state.fromDest = state.toDest;
      state.toDest = temp;
    },

    setDepartureDate: (state, action: PayloadAction<string>) => {
      state.departureDate = action.payload;

      if (state.returnDate && isApiDateBefore(state.returnDate, action.payload)) {
        state.returnDate = "";
      }
    },

    setReturnDate: (state, action: PayloadAction<string>) => {
      if (state.departureDate && isApiDateBefore(action.payload, state.departureDate)) {
        return;
      }

      state.returnDate = action.payload;
    },

    setFareType: (state, action: PayloadAction<FareType>) => {
      state.fareType = action.payload;
      normalizeStudentFareTravelers(state);
    },

    setCabin: (state, action: PayloadAction<CabinClass>) => {
      state.cabin = action.payload;
    },

    updateTravelerCount: (state, action: PayloadAction<UpdateTravelerCountPayload>) => {
      const { key, value } = action.payload;

      if (state.fareType === "student" && (key === "children" || key === "infants")) {
        return;
      }

      state.travelers[key] = value;

      if (key === "children") {
        ensureChildrenAges(state.travelers);
      }

      normalizeStudentFareTravelers(state);
    },

    updateChildAge: (state, action: PayloadAction<UpdateChildAgePayload>) => {
      const { index, age } = action.payload;

      if (state.travelers.child_ages[index] !== undefined) {
        state.travelers.child_ages[index] = age;
      }
    },

    updateSegmentAirport: (state, action: PayloadAction<SegmentAirportPayload>) => {
      const { index, field, airport } = action.payload;

      if (!state.segments[index]) return;

      state.segments[index][field] = airport;

      // Main bug fix:
      // If segment 1 destination is CGP, segment 2 origin becomes CGP.
      if (field === "toDest" && state.segments[index + 1]) {
        state.segments[index + 1].fromDest = airport;
      }
    },

    updateSegmentDate: (state, action: PayloadAction<SegmentDatePayload>) => {
      const { index, departureDate } = action.payload;

      const previousSegment = state.segments[index - 1];

      if (previousSegment?.departureDate && isApiDateBefore(departureDate, previousSegment.departureDate)) {
        return;
      }

      state.segments[index].departureDate = departureDate;

      // If next segment date is before this one, clear next date.
      for (let nextIndex = index + 1; nextIndex < state.segments.length; nextIndex += 1) {
        const nextSegment = state.segments[nextIndex];

        if (nextSegment.departureDate && isApiDateBefore(nextSegment.departureDate, departureDate)) {
          nextSegment.departureDate = "";
        }
      }
    },

    addSegment: (state) => {
      if (state.segments.length >= 5) return;

      const lastSegment = state.segments[state.segments.length - 1];

      state.segments.push({
        fromDest: lastSegment?.toDest ?? null,
        toDest: null,
        departureDate: lastSegment?.departureDate
          ? addDaysToApiDate(lastSegment.departureDate, 1)
          : "",
      });
    },

    removeSegment: (state, action: PayloadAction<number>) => {
      if (state.segments.length <= 2) return;

      state.segments.splice(action.payload, 1);
    },

    resetFlightSearch: () => initialFlightSearchState,
  },
});

export const {
  setTripType,
  setFromDest,
  setToDest,
  swapDestinations,
  setDepartureDate,
  setReturnDate,
  setFareType,
  setCabin,
  updateTravelerCount,
  updateChildAge,
  updateSegmentAirport,
  updateSegmentDate,
  addSegment,
  removeSegment,
  resetFlightSearch,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;