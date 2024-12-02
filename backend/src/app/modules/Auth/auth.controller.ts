import  {Request, Response} from "express"
import catchAsync from "../../../shared/catchAsync"

const register  = catchAsync(async (req: Request, res: Response) => {
  
})
const login  = catchAsync(async (req: Request, res: Response) => {

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