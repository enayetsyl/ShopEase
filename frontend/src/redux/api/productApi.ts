import {
  EditProductRequest,
  ProductApiResponse,
  ProductData,
  SingleProductApiResponse,
  SingleProductData,
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
    getSingleProduct: builder.query<SingleProductData, { id: string }>({
      query: ({ id }) => `/products/${id}`,
      transformResponse: (response: SingleProductApiResponse) => {
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
          reviews, // Assuming reviews data is present in the API response
          category, // Assuming category data is present in the API response
          shop, // Assuming shop data is present in the API response
        } = response.data;

        const productData: SingleProductData = {
          productId,
          name,
          description,
          categoryId,
          discount,
          image,
          inventory,
          price,
          shopId,
          reviews: reviews?.map((review) => ({
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            customer: {
              id: review.customer.id,
              name: review.customer.name,
              profilePhoto: review.customer.profilePhoto,
            },
          })),
          category: {
            name: category.name,
            description: category.description,
          },
          shop: {
            name: shop.name,
            description: shop.description,
            logo: shop.logo,
          },
        };

        return productData;
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
    editProduct: builder.mutation<ProductApiResponse, EditProductRequest>({
      query: ({
        productId,
        name,
        description,
        discount,
        inventory,
        price,
        additionalImages,
      }) => {
        const dataObject = JSON.stringify({
          name,
          description,
          discount,
          inventory,
          price,
        });
        const formData = new FormData();
        formData.append("data", dataObject);
        additionalImages.forEach((file) => {
          formData.append("images", file);
        });

        return {
          url: `/products/${productId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    duplicateProduct: builder.mutation<
      ProductApiResponse,
      { productId: string }
    >({
      query: ({ productId }) => {
        return {
          url: `/products/duplicate/${productId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetVendorProductsQuery,
  useEditProductMutation,
  useDuplicateProductMutation,
  useGetSingleProductQuery,
} = productApi;
