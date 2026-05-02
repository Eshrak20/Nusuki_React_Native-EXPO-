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
import { CourseApiResponse, CourseQueryParams } from "../../types/education/types.course";
import { TestPreparationQueryParams, TestPreparationsApiResponse } from "../../types/education/types.test";

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
    getCourses: builder.query<CourseApiResponse, CourseQueryParams>({
      query: ({ page = 1, size = 12, study_level = "", keyword = "" }) => ({
        url: "/courses",
        method: "GET",
        params: {
          page,
          size,
          study_level,
          keyword,
        },
      }),
    }),
    getTests: builder.query<TestPreparationsApiResponse,TestPreparationQueryParams>({
      query: ({ page = 1, examType = "" }) => ({
        url: "/test-preparations",
        method: "GET",
        params: {
          page,
          examType,
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
  useGetCoursesQuery,
  useGetTestsQuery
} = packagesApi;