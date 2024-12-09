import {
  AllShopsApiResponse,
  CreateShopRequest,
  ProductData,
  ShopApiResponse,
  ShopData,
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
    getAllShop: builder.query<ShopData[], void>({
      query: () => "/shop/all",
      providesTags: ["Shop"],
      // async onQueryStarted(arg, { queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log("Fetched Data:", data);
      //   } catch (error) {
      //     console.error("Error fetching data:", error);
      //   }
      // },
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
  }),
});

export const { useGetShopQuery, useCreateShopMutation, useGetAllShopQuery } =
  shopApi;
