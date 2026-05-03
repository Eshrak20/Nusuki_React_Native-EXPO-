import type { FlightSearchPayload } from "./types.flight";

export type SortBy = "price" | "duration" | "departure_at";
export type SortOrder = "asc" | "desc";

export type FlightAirport = {
  airport?: string;
  airport_name?: string;
  city?: string;
  city_name?: string;
  country?: string;
  country_code?: string;
  country_name?: string;
  terminal?: string | null;
};

export type FlightAirline = {
  code: string;
  name: string;
  logo: string;
};

export type FlightSegment = {
  airline: FlightAirline;
  flight_number: string;
  operating_flight_number?: string;
  origin: FlightAirport;
  destination: FlightAirport;
  departure_at: string;
  arrival_at: string;
  elapsed_time: number;
  elapsed_time_text: string;
  stop_count: number;
  booking_code?: string;
  cabin_code?: string;
  cabin_name?: string;
  meal_code?: string;
  seats_available?: number;
  aircraft?: {
    code?: string;
    name?: string;
  };
  journey_index?: number;
};

export type FlightJourney = {
  journey_index: number;
  requested?: {
    origin: string;
    destination: string;
    departure_date: string;
  };
  summary: {
    origin: FlightAirport;
    destination: FlightAirport;
    departure_at: string;
    arrival_at: string;
    duration_minutes: number;
    duration_text: string;
    stops: number;
    is_direct: boolean;
  };
  segments: FlightSegment[];
};

export type FlightResultItem = {
  id: number;
  pricing_source?: string;
  distribution_model?: string;
  airline: FlightAirline;
  segments: FlightSegment[];
  journeys?: FlightJourney[];
  summary: {
    origin: FlightAirport;
    destination: FlightAirport;
    departure_at: string;
    arrival_at: string;
    duration_minutes: number;
    duration_text: string;
    stops: number;
    is_direct: boolean;
  };
  pricing: {
    currency: string;
    total: number;
    base?: number;
    tax?: number;
  };
  fare: {
    cabin?: string;
    cabin_name?: string;
    fare_basis?: string;
    booking_code?: string;
    refundable?: boolean;
    seats_available?: number;
    last_ticket_date?: string;
    last_ticket_time?: string;
  };
  baggage?: {
    label?: string;
    weight?: number;
    unit?: string;
  };
  flight_id: string;
  search_id: string;
};

export type FilterOption = {
  value: string | number;
  label: string;
  count: number;
  request_key?: string;
};

export type AirlineFilterOption = {
  code: string;
  name: string;
  logo: string;
  count: number;
  request_key?: string;
};

export type LayoverCityFilterOption = {
  airport: string;
  airport_name: string;
  city_name: string;
  label: string;
  count: number;
  request_key?: string;
};

export type ScheduleFilterOption = {
  value: string;
  label: string;
  start_hour: number;
  end_hour: number;
  count: number;
};

export type FlightSearchFiltersResponse = {
  route?: {
    trip_type: string;
    origin: string;
    destination: string;
    label: string;
    segments: {
      origin: string;
      destination: string;
      departure_date: string;
    }[];
  };
  price_range?: {
    min: number;
    max: number;
    absolute_min: number;
    absolute_max: number;
  };
  layover_duration?: {
    min_minutes: number;
    max_minutes: number;
    min_text: string;
    max_text: string;
  };
  refundability?: FilterOption[];
  stops?: FilterOption[];
  airlines?: AirlineFilterOption[];
  layover_cities?: LayoverCityFilterOption[];
  flight_schedules?: {
    departure: ScheduleFilterOption[];
    arrival: ScheduleFilterOption[];
  };
  aircraft?: {
    code: string;
    name: string;
    count: number;
    request_key?: string;
  }[];
};

export type FlightSearchApiResponse = {
  success: boolean;
  message: string;
  data: {
    search: FlightSearchPayload;
    airline_price_summary: AirlineFilterOption[];
    filters: FlightSearchFiltersResponse;
    pagination: {
      page: number;
      size: number;
      total: number;
      total_pages: number;
      from: number;
      to: number;
      has_next_page: boolean;
      has_previous_page: boolean;
    };
    statistics: {
      itinerary_count: number;
      returned_count: number;
      available_flights: number;
    };
    flights: FlightResultItem[];
    search_id: string;
    route: {
      trip_type: string;
      origin: string;
      destination: string;
      label: string;
      segments: {
        origin: string;
        destination: string;
        departure_date: string;
      }[];
    };
    meta?: {
      search_cache_expires_at?: string;
    };
  };
  code: number;
};