import  {Request, Response} from "express"
import catchAsync from "../../../shared/catchAsync"
import { AuthServices } from "./admin.service"
import sendResponse from "../../../shared/sendResponse"

const register  = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Created Successfully.",
    data: result
  })
})
const login  = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body)

  const {accessToken, refreshToken, userWithoutPassword  } = result;

  res.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true
  });
  res.cookie('accessToken', accessToken, {
      secure: false,
      httpOnly: true
  });


  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Successfully logged in.",
    data: userWithoutPassword
  })
})


const changePassword  = catchAsync(async (req: Request &{user?: any}, res: Response) => {
   await AuthServices.changePassword(req.user, req.body)

  sendResponse(res,{
    statusCode: 200,
    success: true,
    message: "Password changed successfully.",
    data: ''
  })
})
const forgotPassword  = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.forgotPassword(req.body)

  sendResponse(res,{
    statusCode: 200,
    success: true,
    message: "Check your email",
    data: null
  })
})
const resetPassword  = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || ""

  await AuthServices.resetPassword(token, req.body)

  sendResponse(res,{
    statusCode: 200,
    success: true,
    message: "Password reset successfully",
    data: null
  })

})


export const AuthController = {
  register,
  login,
  changePassword,
  resetPassword,
  forgotPassword
}