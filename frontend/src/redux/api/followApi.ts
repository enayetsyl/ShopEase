import { baseApi } from "./baseApi";

export const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followShop: builder.mutation<void, { vendorId: string }>({
      query: (body) => ({
        url: "/follows",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Shop"],
    }),
    unfollowShop: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/follows/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Shop"],
    }),
  }),
});

export const { useFollowShopMutation, useUnfollowShopMutation } = followApi;
