import prisma from "../../../shared/prisma"
import { Request } from "express";
import { TFile } from "../../types/file";
import { fileUploader } from "../../../helpers/fileUploader";
import ApiError from "../../errors/ApiError";
import Stripe from "stripe";
import config from "../../../config";

const stripe = new Stripe(config.STRIPE_SECRET_KEY as string)

const createPaymentIntent = async (data: {amount: number}) => {
//  upload file to cloudinary
// save data into db
// console.log('data', data)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount *100,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  return paymentIntent;

}


const savePaymentInfo = async(data: any) => {
  return await prisma.payment.create({
    data:data
  })
}




export const PaymentServices = {
  createPaymentIntent, savePaymentInfo

}