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

interface GetAdminUsersParams {
  page?: number;
  limit?: number;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<
      { data: AdminUser[]; meta?: AdminApiResponse["meta"] },
      GetAdminUsersParams
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/admin/users",
        params: { page, limit },
      }),
      transformResponse: (response: AdminApiResponse<AdminUser[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    getUserById: builder.query<AdminUser, string>({
      query: (id) => `/admin/users/${id}`,
      transformResponse: (response: AdminApiResponse<AdminUser>) =>
        response.data,
    }),
    updateUser: builder.mutation<
      AdminUser,
      { id: string; data: Partial<AdminUser> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: AdminApiResponse<AdminUser>) =>
        response.data,
    }),
    deleteUser: builder.mutation<null, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: AdminApiResponse<null>) => response.data,
    }),
    blacklistVendor: builder.mutation<
      null,
      { vendorId: string; isBlacklisted: boolean }
    >({
      query: ({ vendorId, isBlacklisted }) => ({
        url: `/admin/vendor/${vendorId}/blacklist`,
        method: "PATCH",
        body: { isBlacklisted },
      }),
      transformResponse: (response: AdminApiResponse<null>) => response.data,
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
