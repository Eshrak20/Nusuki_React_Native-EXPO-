export type UniversityItem = {
    id: number;
    name: string;
    country: string;
    location: string;
    universityUrl: string;
    uni_logo: string;
    created_at: string;
    updated_at: string;
};

export type UniversityPaginationData = {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    data: UniversityItem[];
};

export type UniversityApiResponse = {
    success: boolean;
    message: string;
    data: UniversityPaginationData;
    code: number;
};

export type UniversityQueryParams = {
    page?: number;
    size?: number;
    keyword?: string;
    country?: string;
};