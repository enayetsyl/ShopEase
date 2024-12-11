import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Created Successfully.",
    data: result,
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);

  const { accessToken, refreshToken, userWithoutPassword } = result;

  res.cookie("accessToken", accessToken, {
    secure: true, // Disable for local development
    httpOnly: true, // Ensure it can be accessed via JavaScript
    sameSite: "strict", // Use 'lax' for local development
  });
  res.cookie("refreshToken", refreshToken, {
    secure: true, // Disable for local development
    httpOnly: true,
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Successfully logged in.",
    data: userWithoutPassword,
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    await AuthServices.changePassword(req.user, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Password changed successfully.",
      data: "",
    });
  }
);

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  await AuthServices.forgotPassword(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Check your email",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";

  await AuthServices.resetPassword(token, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset successfully",
    data: null,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  // Clear cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true, // Set to `true` in production
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true, // Set to `true` in production
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged out successfully.",
    data: null,
  });
});

export const AuthController = {
  register,
  login,
  changePassword,
  resetPassword,
  forgotPassword,
  logout,
};
