import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const getTokenFromDocumentCookie = () => {
  const cookies = document.cookie.split("; ");
  const accessToken = cookies.find((row) => row.startsWith("accessToken="));
  return accessToken ? accessToken.split("=")[1] : null;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://shopease-w422.onrender.com/api/v1",
    baseUrl: "http://localhost:5002/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getTokenFromDocumentCookie();
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
