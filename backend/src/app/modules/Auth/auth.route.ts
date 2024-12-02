import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "../User/user.validation"

const router = express.Router();

router.post("/register", validateRequest(userValidation.registerUser), AuthController.register);
router.post("/login", AuthController.login);
router.post("/change-password", AuthController.changePassword);
router.post("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
