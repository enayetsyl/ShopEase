import express from "express";

import { PaymentController } from "./payment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { paymentValidation } from "./payment.validation";

const router = express.Router();

router.post("/create-payment-intent", validateRequest(paymentValidation.createPaymentIntent),
PaymentController.createPaymentIntent);

router.post("/payment-confirm", validateRequest(paymentValidation.confirmPayment),
PaymentController.paymentConfirm);




export const PaymentRoutes = router;
