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

const follow = async (user: any, id: { vendorId: string }) => {
  const customerId = user.customer.id;

  const existingFollow = await prisma.follow.findFirst({
    where: {
      customerId,
      vendorId: id.vendorId,
      isDeleted: false,
    },
  });

  if (existingFollow)
    throw new ApiError(400, "You are already following this vendor.");

  const data = { vendorId: id.vendorId, customerId };

  return await prisma.follow.create({ data });
};

const getFollowers = async (vendorId: string) => {
  const total = await prisma.follow.count({
    where: { vendorId },
  });

  return {
    data: total,
  };
};
const getFollowersOfAShop = async (vendorId: string) => {
  console.log("vendor id", vendorId);
  const total = await prisma.follow.count({
    where: { vendorId, isDeleted: false },
  });

  console.log("toatl", total);
  return {
    data: total,
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

  if (!existingFollow)
    throw new ApiError(400, "You are not following this vendor.");

  const result = await prisma.follow.update({
    where: { id: existingFollow.id },
    data: { isDeleted: true },
  });

  return result;
};

export const FollowServices = {
  follow,
  unfollow,
  getFollowers,
  getFollowersOfAShop,
};
