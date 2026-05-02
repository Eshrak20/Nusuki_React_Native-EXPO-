import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const laravelApi = createApi({
  reducerPath: "laravelApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://engine.nusukibd.com/",
    baseUrl: "https://nusuki.downtown-bd.com/api/",

  }),
  endpoints: () => ({}),
});