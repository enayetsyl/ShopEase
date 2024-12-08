import { baseApi } from "./baseApi";

interface Product {
  productId: string;
  quantity: number;
  price: number;
  discount: number;
}

interface StructuredCartData {
  vendorId: string;
  totalAmount: number;
  products: Product[];
}

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  id: string;
  customerId: string;
  vendorId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  order_items?: OrderItem[];
}

interface OrderApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Order;
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderApiResponse, StructuredCartData>({
      query: (cartData) => {
        return {
          url: `orders`,
          method: "POST",
          body: cartData,
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
