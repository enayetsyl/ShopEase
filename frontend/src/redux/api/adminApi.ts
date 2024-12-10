import { baseApi } from "./baseApi";

export interface AdminApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface AdminUser {
  createdAt: string;
  deletedAt: string | null;
  email: string;
  id: string;
  name: string;
  password: string;
  role: "CUSTOMER" | "VENDOR" | "ADMIN";
  updatedAt: string;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<AdminApiResponse<AdminUser[]>, void>({
      query: () => "/admin/users",
    }),
    getUserById: builder.query<AdminApiResponse<AdminUser>, string>({
      query: (id) => `/admin/users/${id}`,
    }),
    updateUser: builder.mutation<
      AdminApiResponse<AdminUser>,
      { id: string; data: Partial<AdminUser> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteUser: builder.mutation<AdminApiResponse<null>, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
    }),
    blacklistVendor: builder.mutation<
      AdminApiResponse<null>,
      { vendorId: string; isBlacklisted: boolean }
    >({
      query: ({ vendorId, isBlacklisted }) => ({
        url: `/admin/vendor/${vendorId}/blacklist`,
        method: "PATCH",
        body: { isBlacklisted },
      }),
    }),
  }),
});

export const {
  useGetAdminUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBlacklistVendorMutation,
} = adminApi;
