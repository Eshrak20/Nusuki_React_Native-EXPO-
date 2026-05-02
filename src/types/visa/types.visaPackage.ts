export type VisaItem = {
  id: number;
  country: string;
  visa_category: string;
  visa_validity: string;
  staying_validity: string;
  service_fee: string;
  processing_time: string;
  entry_type: string;
  visa_type: string;
  imp_info: string;
  country_flag: string;
  country_flag_url: string;
  created_at: string;
  updated_at: string;
};

export type VisaPaginationData = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  data: VisaItem[];
};

export type VisaApiResponse = {
  success: boolean;
  message: string;
  data: VisaPaginationData;
  code: number;
};

export type VisaQueryParams = {
  page?: number;
  visa_category?: string;
  country?: string;
};