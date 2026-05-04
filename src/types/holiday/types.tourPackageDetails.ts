export type HolidayTourInfo = {
  id: number;
  city_name: string;
  country_name: string;
  display_name: string;
};

export type HolidayPackageImage = {
  id: number;
  image: string;
  image_url: string;
};

export type HolidayPackageOffer = {
  id: number;
  name: string;
  valid_from: string;
  valid_until: string;
  departs: string;
  price_per_person_single: string | null;
  price_per_person_double: string | null;
  price_per_person_twin: string | null;
  price_per_person_triple: string | null;
  price_per_person_child_3_to_6: string | null;
  price_per_person_child_7_to_12: string | null;
  description: string | null;
};

export type HolidayPackageDetails = {
  id: number;
  tour_id: string;
  tour: HolidayTourInfo;
  name: string;
  city_name: string;
  country_name: string;
  address: string;
  duration_days: string;

  highlights: string | null;
  itinerary: string | null;
  pickup_note: string | null;
  cancelation_policy: string | null;
  tax: string | null;
  included_service: string | null;
  general_condition: string | null;
  equated_monthly_installment: string | null;

  images: HolidayPackageImage[];
  offers: HolidayPackageOffer[];
};

export type HolidayPackageDetailsApiResponse = {
  success: boolean;
  message: string;
  data: HolidayPackageDetails;
  code: number;
};