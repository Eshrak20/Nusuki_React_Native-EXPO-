import { laravelApi } from "./laravelApi";

import type {
  AirportsApiResponse,
  AirportsQueryParams,
  FlightSearchPayload,
} from "../../types/flight/types.flight";

import type { FlightSearchApiResponse } from "../../types/flight/types.flightResults";

import type {
  FlightDetailApiResponse,
  FlightDetailRequest,
} from "../../types/flight/types.flightTicket";

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

    flightSearchTicketLists: builder.query<FlightSearchApiResponse,FlightSearchPayload>({
      query: (body) => ({
        url: "/flights/search",
        method: "POST",
        body,
      }),
    }),

    flightDetailTicket: builder.query<FlightDetailApiResponse,FlightDetailRequest>({
      query: ({ flight_id, search_id }) => ({
        url: "/flights/detail",
        method: "GET",
        params: {
          flight_id,
          search_id,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAirportsQuery,

  // For ticket list page
  useFlightSearchTicketListsQuery,
  useLazyFlightSearchTicketListsQuery,

  // For detail page
  useFlightDetailTicketQuery,
  useLazyFlightDetailTicketQuery,
} = flightApi;