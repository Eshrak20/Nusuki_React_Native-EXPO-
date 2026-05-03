export type TripType = "one_way" | "round_way" | "multi_way";
export type FareType = "regular" | "student" | "umrah";
export type CabinClass = "Y" | "S" | "C" | "F";

export type AirportItem = {
  id: number;
  country_id: string;
  country: string;
  iso: string;
  name: string;
  iata_code: string;
  city_id: string;
  city_name: string;
  created_at: string;
  updated_at: string;
};

export type AirportsPaginationData = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  data: AirportItem[];
};

export type AirportsApiResponse = {
  success: boolean;
  message: string;
  data: AirportsPaginationData;
  code: number;
};

export type AirportsQueryParams = {
  page?: number;
  size?: number;
  keyword?: string;
};

export type Travelers = {
  adults: number;
  children: number;
  child_ages: number[];
  infants: number;
};

export type FlightSegment = {
  fromDest: AirportItem | null;
  toDest: AirportItem | null;
  departureDate: string;
};

export type FlightSearchState = {
  tripType: TripType;
  fromDest: AirportItem | null;
  toDest: AirportItem | null;
  departureDate: string;
  returnDate: string;
  fareType: FareType;
  cabin: CabinClass;
  travelers: Travelers;
  segments: FlightSegment[];
};

export type FlightSearchPayload = {
  trip_type: TripType;
  origin?: string;
  destination?: string;
  departure_date?: string;
  return_date?: string;
  segments?: {
    origin: string;
    destination: string;
    departure_date: string;
  }[];
  fare_type: FareType;
  adults: number;
  children: number;
  child_ages: number[];
  infants: number;
  cabin: CabinClass;
  max_stops: number;
  page: number;
  size: number;
  sort_by: "price" | "duration" | "departure_at";
  sort_order: "asc" | "desc";
  refundability: string[];
  stops: number[];
  airlines: string[];
  layover_cities: string[];
  flight_schedule_departure: string[];
  flight_schedule_arrival: string[];
  aircraft: string[];
  price_min: number | null;
  price_max: number | null;
  layover_duration_min: number | null;
  layover_duration_max: number | null;
};

export type FlightSearchResponse = {
  success: boolean;
  message: string;
  data: unknown;
  code: number;
};