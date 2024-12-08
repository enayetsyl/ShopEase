import { PaymentResponse } from "@/types";
import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<PaymentResponse, { amount: number }>({
      query: (data) => ({
        url: "/payment/create-payment-intent",
        method: "POST",
        body: data,
      }),
    }),
    savePayment: builder.mutation<any, any>({
      query: (paymentData) => ({
        url: `/payment/payment-confirm`,
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useSavePaymentMutation } =
  paymentApi;
