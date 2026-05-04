export type VisaRequirementType =
  | "basic"
  | "for_student"
  | "for_job_holder"
  | "for_service_holder"
  | "for_house_wife"
  | string;

export type VisaRequirement = {
  id: number;
  visa_id: string;
  requirement_name: string;
  type: VisaRequirementType;
  created_at: string;
  updated_at: string;
};

export type VisaProcess = {
  id: number;
  visa_id: string;
  step_title: string;
  description: string;
  sort_order: string;
  created_at: string;
  updated_at: string;
};

export type VisaDetails = {
  id: number;
  country: string;
  visa_category: string;
  visa_validity: string;
  staying_validity: string;
  service_fee: string;
  processing_time: string;
  entry_type: string;
  visa_type: string;
  imp_info: string | null;
  country_flag: string;
  country_flag_url: string;
  created_at: string;
  updated_at: string;
  requirements: VisaRequirement[];
  processes: VisaProcess[];
};

export type VisaDetailsApiResponse = {
  success: boolean;
  message: string;
  data: VisaDetails;
  code: number;
};