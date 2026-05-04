import { PilgrimagePackageDetailsResponse } from "@/types/pilgrimage/types.packageDetails";
import { laravelApi } from "./laravelApi";
import { VisaDetailsApiResponse } from "@/types/visa/types.visaDetails";


export const packageDetApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({

    getHajjPackageDetails: builder.query<PilgrimagePackageDetailsResponse, number>({
      query: (id) => ({
        url: `/hajj-packages/detail/${id}`,
        method: "GET",
      }),
    }),

    getUmrahPackageDetails: builder.query<PilgrimagePackageDetailsResponse, number>({
      query: (id) => ({
        url: `/umrah-packages/detail/${id}`,
        method: "GET",
      }),
    }),

    getVisaDetails: builder.query<VisaDetailsApiResponse, number>({
      query: (id) => ({
        url: `/visas/${id}`,
        method: "GET",
      }),
    }),

  }),

  overrideExisting: false,
});

export const {
  useGetHajjPackageDetailsQuery,
  useGetUmrahPackageDetailsQuery,
  useGetVisaDetailsQuery
} = packageDetApi;