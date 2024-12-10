import { baseApi } from "./baseApi";

export const recentProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendRecentProducts: builder.mutation<void, string[]>({
      query: (recentProducts) => ({
        url: "/recent-products",
        method: "POST",
        body: { products: recentProducts },
      }),
    }),
  }),
});

export const { useSendRecentProductsMutation } = recentProductsApi;
