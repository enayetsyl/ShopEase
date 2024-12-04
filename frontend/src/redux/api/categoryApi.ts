import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/admin/categories",
    }),
    getCategoryById: builder.query({
      query: (id) => `/admin/categories/${id}`,
    }),
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/admin/categories",
        method: "POST",
        body: categoryData,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/categories/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
