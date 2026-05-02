import { laravelApi } from "./laravelApi";
import type {
  PackageApiResponse,
  PackageQueryParams,
} from "../../types/hajj/types.package";
import type {
  VisaApiResponse,
  VisaQueryParams,
} from "../../types/visa/types.visaPackage";
import { UniversityApiResponse, UniversityQueryParams } from "../../types/education/types.university";

export const packagesApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    getHajjPackages: builder.query<PackageApiResponse, PackageQueryParams>({
      query: ({ page = 1, size = 10 }) => ({
        url: `/hajj-packages?page=${page}&size=${size}`,
        method: "GET",
      }),
    }),

    getUmrahPackages: builder.query<PackageApiResponse, PackageQueryParams>({
      query: ({ page = 1, size = 10 }) => ({
        url: `/umrah-packages?page=${page}&size=${size}`,
        method: "GET",
      }),
    }),

    getVisas: builder.query<VisaApiResponse, VisaQueryParams>({
      query: ({ page = 1, visa_category = "", country = "" }) => ({
        url: "/visas",
        method: "GET",
        params: {
          page,
          visa_category,
          country,
        },
      }),
    }),
    getUniversities: builder.query<UniversityApiResponse, UniversityQueryParams>({
      query: ({ page = 1, size = 12, keyword = "", country = "" }) => ({
        url: "/universities",
        method: "GET",
        params: {
          page,
          size,
          keyword,
          country,
        },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetHajjPackagesQuery,
  useGetUmrahPackagesQuery,
  useGetVisasQuery,
  useGetUniversitiesQuery,
} = packagesApi;