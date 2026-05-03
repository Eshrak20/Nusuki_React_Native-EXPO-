export type TourRegion = {
  id: number;
  name: string;
  is_selected?: boolean;
};

export type TourType = {
  id: number;
  name: string;
  is_selected?: boolean;
  has_regions: boolean;
  regions: TourRegion[];
};

export type TourItem = {
  id: number;
  city_name: string;
  country_name: string;
  display_name: string;
  bg_image: string;
  bg_image_url: string;
  tour_types: {
    id: number;
    name: string;
  }[];
  regions: {
    id: number;
    name: string;
  }[];
};

export type ToursData = {
  selected_tour_type_id: number | null;
  selected_tour_region_id: number | null;
  has_regions: boolean;
  tour_types: TourType[];
  regions: TourRegion[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  tours: TourItem[];
};

export type ToursApiResponse = {
  success: boolean;
  message: string;
  data: ToursData;
  code: number;
};

export type GetToursParams = {
  page?: number;
  tour_type_id?: number | string;
  tour_region_id?: number | string;
};