import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "../User/user.validation"
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/users", auth(UserRole.ADMIN), AdminController.getAllUser)
router.get("/users/:userId", auth(UserRole.ADMIN), AdminController.getUserById)
router.patch("/users/:userId", auth(UserRole.ADMIN), validateRequest(userValidation.updateUser), AdminController.updateUserIntoDB)
router.patch("/vendor/:vendorId", auth(UserRole.ADMIN), validateRequest(userValidation.blacklistVendor), AdminController.blacklistVendor)
router.delete("/users/:userId", auth(UserRole.ADMIN), AdminController.deleteUserFromDB)



export const AdminRoutes = router;
