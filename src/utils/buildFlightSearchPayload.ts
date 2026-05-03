import type { FlightSearchPayload, FlightSearchState } from "../types/flight/types.flight";

type BuildFlightSearchPayloadParams = {
  searchData: FlightSearchState;
  page?: number;
  size?: number;
};

export const buildFlightSearchPayload = ({
  searchData,
  page = 1,
  size = 20,
}: BuildFlightSearchPayloadParams): FlightSearchPayload => {
  const isStudent = searchData.fareType === "student";

  const commonPayload = {
    fare_type: searchData.fareType,
    adults: searchData.travelers.adults,
    children: isStudent ? 0 : searchData.travelers.children,
    child_ages: isStudent ? [] : searchData.travelers.child_ages,
    infants: isStudent ? 0 : searchData.travelers.infants,
    cabin: searchData.cabin,

    max_stops: 0,
    page,
    size,

    sort_by: "price" as const,
    sort_order: "asc" as const,

    refundability: [],
    stops: [],
    airlines: [],
    layover_cities: [],
    flight_schedule_departure: [],
    flight_schedule_arrival: [],
    aircraft: [],

    price_min: null,
    price_max: null,
    layover_duration_min: null,
    layover_duration_max: null,
  };

  if (searchData.tripType === "multi_way") {
    return {
      ...commonPayload,
      trip_type: "multi_way",
      segments: searchData.segments.map((segment) => ({
        origin: segment.fromDest?.iata_code ?? "",
        destination: segment.toDest?.iata_code ?? "",
        departure_date: segment.departureDate,
      })),
    };
  }

  return {
    ...commonPayload,
    trip_type: searchData.tripType,
    origin: searchData.fromDest?.iata_code ?? "",
    destination: searchData.toDest?.iata_code ?? "",
    departure_date: searchData.departureDate,
    ...(searchData.tripType === "round_way"
      ? { return_date: searchData.returnDate }
      : {}),
  };
};