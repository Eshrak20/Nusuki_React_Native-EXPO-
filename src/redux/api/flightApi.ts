import { laravelApi } from "./laravelApi";
import type {
  AirportsApiResponse,
  AirportsQueryParams,
  FlightSearchPayload,
  FlightSearchResponse,
} from "../../types/flight/types.flight";

export const flightApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    getAirports: builder.query<AirportsApiResponse, AirportsQueryParams>({
      query: ({ page = 1, size = 20, keyword = "" }) => ({
        url: "/airports",
        method: "GET",
        params: {
          page,
          size,
          keyword,
        },
      }),
    }),

    searchFlights: builder.mutation<FlightSearchResponse, FlightSearchPayload>({
      query: (body) => ({
        url: "/flights/search",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAirportsQuery,
  useSearchFlightsMutation,
} = flightApi;