export type PackageServiceItem = {
  id: number;
  name: string;
  additional_fees: boolean;
};

export type PackageServiceGroup = {
  category: string;
  services: PackageServiceItem[];
};

export type PackageSightSeeingActivity = {
  id: number;
  name: string;
  activity_duration: number | string;
  additional_fees: boolean;
};

export type PackageSightSeeingGroup = {
  category: string;
  activities: PackageSightSeeingActivity[];
};

export type PackageImage = {
  id: number;
  image: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
  hajj_package_id?: string;
  umrah_package_id?: string;
};

export type DetailInnerImage = {
  id: number;
  image: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
  accommodation_id?: string;
  itinerary_id?: string;
};

export type PackageAccommodation = {
  id: number;
  hajj_package_id?: string;
  umrah_package_id?: string;
  accommodation_id: string;
  nights: string;
  accommodation: {
    id: number;
    name: string;
    location: string;
    short_description: string;
    rating: string;
    images: DetailInnerImage[];
  };
};

export type PackageItinerary = {
  id: number;
  hajj_package_id?: string;
  umrah_package_id?: string;
  itinerary_id: string;
  duration: string;
  itinerary: {
    id: number;
    name: string;
    location: string;
    short_description: string;
    images: DetailInnerImage[];
  };
};

export type PilgrimagePackageDetails = {
  id: number;
  name: string;
  tagline: string;
  price: string;
  company_name: string;
  flight_type: string;
  overview: string | null;
  date: string;
  num_of_nights: string | number;
  package_type: string;
  card_image: string;
  is_active: string | boolean;
  created_at: string;
  updated_at: string;

  package_services: PackageServiceGroup[];
  package_sight_seeings: PackageSightSeeingGroup[];
  images: PackageImage[];
  package_accommodations: PackageAccommodation[];
  package_itineraries: PackageItinerary[];
};

export type PilgrimagePackageDetailsResponse = {
  success: boolean;
  message: string;
  data: PilgrimagePackageDetails;
  code: number;
};