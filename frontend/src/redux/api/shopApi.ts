import { baseApi } from "./baseApi";

interface ShopApiResponse {
  data: {
    id: string;
    name: string;
    logo: string;
    description: string;
    createdAt: string;
    deletedAt: null | boolean;
    isBlackListed: boolean;
    updatedAt: string;
    vendorId: string;
  };
  message: string;
  success: boolean;
}

interface ShopData {
  shopId: string;
  name: string;
  description: string;
  logo: string;
}

export const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShop: builder.query<ShopData, void>({
      query: () => "/shop",
      transformResponse: (response: ShopApiResponse) => {
        const { id: shopId, name, logo, description } = response.data;
        const shopData = { shopId, name, description, logo };
        return shopData;
      },
    }),
  }),
});

export const { useGetShopQuery } = shopApi;
