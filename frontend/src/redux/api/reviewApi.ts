// Interface for a single review
export interface Review {
  id: string;
  customerId: string;
  productId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for the giveReview API response
export interface GiveReviewResponse {
  success: boolean;
  message: string;
  data: Review;
}

// Interface for the getReviews API response
export interface GetReviewsResponse {
  success: boolean;
  message: string;
  data: Review[];
}

// Interface for the request body of giveReview
export interface GiveReviewRequest {
  productId: string;
  rating: number;
  comment?: string;
}

import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    giveReview: builder.mutation<GiveReviewResponse, GiveReviewRequest>({
      query: (review) => ({
        url: "/reviews",
        method: "POST",
        body: review,
      }),
      transformResponse: (response: GiveReviewResponse) => ({
        success: response.success,
        message: response.message,
        data: response.data,
      }),
      invalidatesTags: ["Product"],
    }),
    getReviews: builder.query<GetReviewsResponse, void>({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      transformResponse: (response: GetReviewsResponse) => ({
        success: response.success,
        message: response.message,
        data: response.data,
      }),
    }),
  }),
});

export const { useGiveReviewMutation, useGetReviewsQuery } = reviewApi;
