import express from "express";
import { FlashSaleController } from "./flashSale.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { flashSaleValidation } from "./flashSale.validation";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.VENDOR),
  validateRequest(flashSaleValidation.createFlashSale),
  FlashSaleController.createAFlashSale
);

router.get("/", FlashSaleController.getAllFlashSale);

router.get("/:productId", FlashSaleController.getAFlashSale);

router.patch(
  "/:productId",
  auth(UserRole.VENDOR),
  validateRequest(flashSaleValidation.updateFlashSale),
  FlashSaleController.updateAFlashSale
);

export const FlashSaleRoutes = router;
