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

interface CreateShopRequest {
  name: string;
  description: string;
  file: File;
}

// interface CreateShopResponse {
//   data: {
//     id: string;
//     name: string;
//     logo: string;
//     description: string;
//     createdAt: string;
//     updatedAt: string;
//     vendorId: string;
//     deletedAt: string | null;
//   };
//   message: string;
//   success: boolean;
// }

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

export const { useGetShopQuery, useCreateShopMutation } = shopApi;
