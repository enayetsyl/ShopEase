import express, { NextFunction, Request, Response } from "express";
import {  OrderController } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

import { fileUploader } from "../../../helpers/fileUploader";
import { OrderValidation } from "./order.validation";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), validateRequest(OrderValidation.createOrder), OrderController.createOrder)

router.get("/", auth(UserRole.CUSTOMER,UserRole.ADMIN, UserRole.VENDOR), OrderController.getOrders)



export const OrderRoutes = router;
