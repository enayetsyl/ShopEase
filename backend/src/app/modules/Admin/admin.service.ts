import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TPaginationOptions } from "../../types/pagination";
import { adminSearchableFields } from "./admin.constant";

type TAdminFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  searchTerm?: string | undefined;
};

const getAllUser = async (
  params: TAdminFilterRequest,
  options: TPaginationOptions
) => {
  // create search and filter condition 
  // get user data
  // get meta data
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput = { AND: andConditions };

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getUserById = async (id: string) => {
  // get user
  // send result
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      vendor: true,
      customer: true,
    },
  });

  if (!user) throw new ApiError(404, "User Not Found");

  if (
    user.role === "VENDOR" &&
    (user.vendor?.isDeleted || user.vendor?.isSuspended)
  )
    throw new ApiError(403, "Vendor account is suspended or deleted. ");

  if (
    user.role === "CUSTOMER" &&
    (user.customer?.isDeleted || user.customer?.isSuspended)
  )
    throw new ApiError(403, "Customer account is suspended or deleted. ");

  return user;
};

const updateUserIntoDB = async (
  id: string,
  payload: { isSuspended: boolean }
) => {
  // get user
  // update data in the vendor/ customer collection
  // update data in the user collection
  // response

  const {  isSuspended } = payload;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      vendor: true,
      customer: true,
    },
  });

  if (!user) throw new ApiError(404, "User Not Found");

  const { role, vendor, customer } = user;

  if (
    user.role === "VENDOR" &&
    (user.vendor?.isDeleted || user.vendor?.isSuspended)
  )
    throw new ApiError(403, "Vendor account is suspended or deleted. ");

  if (
    user.role === "CUSTOMER" &&
    (user.customer?.isDeleted || user.customer?.isSuspended)
  )
    throw new ApiError(403, "Customer account is suspended or deleted. ");

      if (role === "VENDOR") {
       
          await prisma.vendor.update({
            where: { id: vendor!.id },
            data: { isSuspended },
          });
        }
      
      else if (role === "CUSTOMER") {
        
          await prisma.customer.update({
            where: { id: customer!.id },
            data: { isSuspended },
          });
        }

  
    return { message: "User updated successfully." };

};

const blacklistVendor = async (id: string, payload:{isBlacklisted : boolean}) => {};

const deleteUserFromDB = async (id: string) => {

};

export const AdminServices = {
  getAllUser,
  getUserById,
  deleteUserFromDB,
  updateUserIntoDB,
  blacklistVendor,
};
