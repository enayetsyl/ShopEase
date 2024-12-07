import {
  ProductApiResponse,
  ProductData,
  VendorProductApiResponse,
  VendorProductData,
} from "@/types";
import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductData[], void>({
      query: () => "/products",
      transformResponse: (response: ProductApiResponse) => {
        return response.data.map((data) => {
          const {
            id: productId,
            name,
            description,
            categoryId,
            discount,
            image,
            inventory,
            price,
            shopId,
          } = data;
          const productData = {
            productId,
            name,
            description,
            categoryId,
            discount,
            image,
            inventory,
            price,
            shopId,
          };
          return productData;
        });
      },
    }),
    getVendorProducts: builder.query<
      VendorProductData[],
      { page: number; limit: number }
    >({
      query: ({ page, limit }) =>
        `/products/vendor-product?page=${page}&limit=${limit}`,
      transformResponse: (response: VendorProductApiResponse) => {
        return response.data.map((data) => {
          const {
            id: productId,
            name,
            description,
            categoryId,
            discount,
            image,
            inventory,
            price,
            shopId,
            categoryName,
          } = data;
          const productData = {
            productId,
            name,
            description,
            categoryId,
            discount,
            image,
            inventory,
            price,
            shopId,
            categoryName,
          };
          return productData;
        });
      },
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetVendorProductsQuery } = productApi;
