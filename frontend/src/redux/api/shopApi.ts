import {
  AllShopsApiResponse,
  CreateShopRequest,
  ProductData,
  ShopApiResponse,
  ShopData,
  ShopRouteShopData,
  VendorData,
} from "@/types";
import { baseApi } from "./baseApi";

export const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShop: builder.query<ShopData, void>({
      query: () => "/shop",
      transformResponse: (response: ShopApiResponse) => {
        const { id: shopId, name, logo, description } = response.data;
        const shopData = { shopId, name, description, logo };
        return shopData;
      },
      providesTags: ["Shop"],
    }),
    getAllShop: builder.query<ShopRouteShopData[], void>({
      query: () => "/shop/all",
      transformResponse: (response: AllShopsApiResponse) => {
        return response.data.map((shop) => {
          const {
            id: shopId,
            name,
            logo,
            description,
            products,
            vendor,
          } = shop;
          const productsQuantity = products?.length ?? 0;
          const followers = vendor?.follows?.length ?? 0;
          const shopData = {
            shopId,
            name,
            description,
            logo,
            productsQuantity,
            followers,
          };
          return shopData;
        });
      },
      providesTags: ["Shop"],
    }),

    createShop: builder.mutation<ShopApiResponse, CreateShopRequest>({
      query: ({ name, description, file }) => {
        const dataObject = JSON.stringify({ name, description });
        const formData = new FormData();
        formData.append("data", dataObject);
        formData.append("file", file);
        return {
          url: "/shop",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Shop"],
    }),
    getShopDetails: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/shop/single/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetShopQuery,
  useCreateShopMutation,
  useGetAllShopQuery,
  useGetShopDetailsQuery,
} = shopApi;
