import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      // Get the token from cookies
      const token = Cookies.get("accessToken");
      console.log("accesstoken in base api", token);

      // If the token exists, set it in the Authorization header
      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "Users", "Categories", "Shop"],
  endpoints: () => ({}),
});
