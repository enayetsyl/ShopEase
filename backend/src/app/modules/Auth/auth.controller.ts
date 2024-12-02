import  {Request, Response} from "express"
import catchAsync from "../../../shared/catchAsync"
import { AuthServices } from "./auth.service"
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


const changePassword  = catchAsync(async (req: Request, res: Response) => {

})
const resetPassword  = catchAsync(async (req: Request, res: Response) => {

})


export const AuthController = {
  register,
  login,
  changePassword,
  resetPassword
}