import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PaymentServices } from "./payment.service";
import sendResponse from "../../../shared/sendResponse";


const createPaymentIntent = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentServices.createPaymentIntent(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Payment Intent Created Successfully.",
      data: result,
    });
  }
);

const paymentConfirm = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentServices.savePaymentInfo(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Payment Saved Successfully.",
      data: result,
    });
  }
);

export const PaymentController = {
  createPaymentIntent, paymentConfirm
};
