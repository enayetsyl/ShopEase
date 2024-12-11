import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shopease-w422.onrender.com/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.warn("Access token is missing.");
      }
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
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
