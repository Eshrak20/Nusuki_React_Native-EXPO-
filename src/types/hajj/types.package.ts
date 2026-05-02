export type PackageItem = {
  id: number;
  name: string;
  tagline: string;
  price: string;
  card_image: string;
  created_at: string;
  updated_at: string;
};

export type PackagePaginationData = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  data: PackageItem[];
};

export type PackageApiResponse = {
  success: boolean;
  message: string;
  data: PackagePaginationData;
  code: number;
};

export type PackageQueryParams = {
  page?: number;
  size?: number;
};