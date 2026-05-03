export type TourPackageItem = {
  id: number;
  name: string;
  address: string;
  duration_days: string;
  image: string;
  price: string;
};

export type TourPackageFilters = {
  price: {
    min: number;
    max: number;
  };
  duration_days: string[];
};

export type TourPackagePagination = {
  current_page: number;
  last_page: number;
  total: number;
};

export type TourPackagesListData = {
  filters_applied: Record<string, string>;
  filters: TourPackageFilters;
  data: TourPackageItem[];
  pagination: TourPackagePagination;
};

export type TourPackagesListResponse = {
  success: boolean;
  message: string;
  data: TourPackagesListData;
  code: number;
};

export type TourPackagesListParams = {
  tour_id: number | string;
  page?: number;
  search?: string;
  min_price?: string;
  max_price?: string;
  duration_days?: string;
};