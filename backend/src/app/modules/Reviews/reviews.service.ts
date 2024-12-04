import prisma from "../../../shared/prisma"
import { Request } from "express";
import { TFile } from "../../types/file";
import { fileUploader } from "../../../helpers/fileUploader";
import ApiError from "../../errors/ApiError";
import { TReview } from "./reviews.type";



const createReview = async (customerId: string, data: TReview) => {

  const { productId, comment, rating } = data;

  const hasPurchased = await prisma.order.findFirst({
    where: {
      customerId: customerId,
      order_items: {
        some: {
          productId: productId,
        },
      },
      status: "COMPLETED", 
    },
  });

  if (!hasPurchased) throw new ApiError(400, "You can only review products you have purchased.");

  const existingReview = await prisma.review.findFirst({
    where: {
      customerId,
      productId,
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this product.");
  }

  // console.log('existing review', existingReview)
  
  // console.log('has purchased', hasPurchased)
  const review = await prisma.review.create({
    data: {
      customerId,
      productId,
      comment,
      rating,
    },
  });

  return review;

}


const getReviews = async (payload:any) => {
  // fetch shop data
  // return that data

 const shop = await prisma.shop.findFirst({
      where: { vendorId: payload.vendor.id },
    });

  if(!shop) throw new ApiError(404, "Shop not found")
 return shop

}



export const ReviewServices = {
  createReview,
  getReviews,
}