import  {Request, Response} from "express"
import catchAsync from "../../../shared/catchAsync"
import { AdminServices } from "./admin.service"
import sendResponse from "../../../shared/sendResponse"
import pick from "../../../shared/pick"
import { adminFilterableFields } from "./admin.constant"

const getAllUser  = catchAsync(async (req: Request, res: Response) => {
const filters = pick(req.query, adminFilterableFields)
const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"])

const result = await AdminServices.getAllUser(filters, options)

sendResponse(res,{
    statusCode: 200,
    success: true,
    message: "User data fetched successfully",
    data: result.data,
    meta: result.meta
  })
})


const getUserById  = catchAsync(async (req: Request, res: Response) => {

const { userId } = req.params;
 
const result = await AdminServices.getUserById(userId)

sendResponse(res,{
    statusCode: 200,
    success: true,
    message: "User data fetched successfully",
    data: result
  })

})


const updateUserIntoDB  = catchAsync(async (req: Request, res: Response) => {

const { userId } = req.params;

const result = await AdminServices.updateUserIntoDB(userId, req.body)

sendResponse(res,{
    statusCode: 200,
    success: true,
    message: "User Data Updated Successfully",
    data: result
  })

})


const blacklistVendor  = catchAsync(async (req: Request, res: Response) => {

const { vendorId } = req.params;

 await AdminServices.blacklistVendor(vendorId, req.body)

sendResponse(res,{
    statusCode: 200,
    success: true,
    message: "Vendor blacklisted successfully",
    data: null
  })

})


const deleteUserFromDB  = catchAsync(async (req: Request, res: Response) => {
const { userId } = req.params;

await AdminServices.deleteUserFromDB(userId)

sendResponse(res,{
    statusCode: 200,
    success: true,
    message: "User successfully deleted",
    data: null
  })

})


export const AdminController = {
  getAllUser,
  getUserById,
  updateUserIntoDB,
  blacklistVendor,
  deleteUserFromDB,
}