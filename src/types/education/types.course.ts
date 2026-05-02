export type CourseItem = {
  id: number;
  name: string;
  university: string;
  city: string;
  country: string;
  study_level: string;
  logo: string;

  duration?: string;
  tuition_fee?: string;
  created_at?: string;
  updated_at?: string;
};

export type CoursePaginationData = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  data: CourseItem[];
};

export type CourseApiResponse = {
  success: boolean;
  message: string;
  data: CoursePaginationData;
  code: number;
};

export type CourseQueryParams = {
  page?: number;
  size?: number;
  study_level?: string;
  keyword?: string;
};