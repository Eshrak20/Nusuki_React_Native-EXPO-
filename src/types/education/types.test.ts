export type TestPreparationItem = {
  id: number;
  testDesc: string;
  date: string;
  duration: string;
  batch: string;
  examType: string;
  time: string;
  image: string;
  created_at: string;
  updated_at: string;
};

export type TestPreparationPaginationData = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  data: TestPreparationItem[];
};

export type TestPreparationsApiResponse = {
  success: boolean;
  message: string;
  data: TestPreparationPaginationData;
  code: number;
};

export type TestPreparationQueryParams = {
  page?: number;
  examType?: string;
};