import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TPaginationOptions } from "../../types/pagination";
import { Request } from "express";
import { TFile } from "../../types/file";
import { fileUploader } from "../../../helpers/fileUploader";
import { TProductFilterRequest } from "./follow.type";
import { productSearchableFields } from "./follow.constant";
import { findProductById } from "../../../helpers/productHelpers";

const follow = async (user: any, id: {vendorId: string}) => {
  const customerId = user.customer.id;

  const existingFollow = await prisma.follow.findFirst({
    where: {
      customerId,
      vendorId:id.vendorId,
      isDeleted: false,
    },
  });

  if (existingFollow) throw new ApiError(400, "You are already following this vendor.");
  

  const data = { vendorId:id.vendorId, customerId };

  return await prisma.follow.create({ data });
};

const getFollowers = async (
  params: TProductFilterRequest,
  options: TPaginationOptions
) => {
  // create filter condition
  // get product data
  // get meta data
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ProductWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: productSearchableFields.map((field) => ({
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

  const whereConditions: Prisma.ProductWhereInput = { AND: andConditions };

  const result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
  });

  const total = await prisma.product.count({
    where: whereConditions,
  });

  return {
    data: result,
    meta: { page, limit, total },
  };
};

const unfollow = async (vendorId: string, customerId: string) => {
  const existingFollow = await prisma.follow.findFirst({
    where: {
      customerId,
      vendorId,
      isDeleted: false,
    },
  });

  if (!existingFollow) throw new ApiError(400, "You are not following this vendor.");
  
  const result = await prisma.follow.update({
    where:{id: existingFollow.id},
    data: {isDeleted: true}
  })

  return result;
};

export const FollowServices = {
  follow,
  unfollow,
  getFollowers,
};
