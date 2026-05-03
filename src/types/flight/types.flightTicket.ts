import type { FlightResultItem } from "./types.flightResults";

export type FlightDetailRequest = {
  flight_id: string;
  search_id: string;
};

export type FlightDetailApiResponse = {
  success: boolean;
  message: string;
  data: {
    search_id: string;
    flight_id: string;
    flight: FlightResultItem;
    original_flight?: FlightResultItem;
    revalidation?: {
      valid: boolean;
      checked_at: string;
      price_changed: boolean;
      price_difference: number;
      original_total: number;
      latest_total: number;
      currency: string;
    };
    meta?: {
      cache?: {
        search_cached_until?: string;
        detail_cached_until?: string;
        detail_cache_hit?: boolean;
      };
    };
  };
  code: number;
};