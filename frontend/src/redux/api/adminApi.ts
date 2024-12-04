import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/admin/users",
    }),
    getUserById: builder.query({
      query: (id) => `/admin/users/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
    }),
    blacklistVendor: builder.mutation({
      query: ({ vendorId, isBlacklisted }) => ({
        url: `/admin/vendor/${vendorId}/blacklist`,
        method: "PATCH",
        body: { isBlacklisted },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBlacklistVendorMutation,
} = adminApi;
