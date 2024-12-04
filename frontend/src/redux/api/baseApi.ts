import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002/api/v1",
  }),
  tagTypes: ["Auth", "Users", "Categories"],
  endpoints: () => ({}),
});
