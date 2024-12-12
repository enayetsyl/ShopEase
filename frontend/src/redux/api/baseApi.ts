import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getTokenFromLS = () => {
  const token = localStorage.getItem("accessToken");

  return token ? token : null;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getTokenFromLS();

      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [
    "Auth",
    "Admin",
    "Users",
    "Categories",
    "Shop",
    "Product",
    "Payment",
    "Review",
    "Flash Sale",
  ],
  endpoints: () => ({}),
});
