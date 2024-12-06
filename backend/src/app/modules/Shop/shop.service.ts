import prisma from "../../../shared/prisma";
import { Request } from "express";
import { TFile } from "../../types/file";
import { fileUploader } from "../../../helpers/fileUploader";
import ApiError from "../../errors/ApiError";

const createShop = async (user: any, req: Request) => {
  //  upload file to cloudinary
  // save data into db
  const file = req.file as TFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.logo = uploadToCloudinary?.secure_url;
  }

  req.body.vendorId = user.vendor.id;

  const shop = await prisma.shop.create({ data: req.body });

  return shop;
};

const getAShop = async (payload: any) => {
  // fetch shop data
  // return that data

  const shop = await prisma.shop.findFirst({
    where: { vendorId: payload.vendor.id },
  });
  console.log('shop data', shop)
  if (!shop) throw new ApiError(404, "Shop not found");
  return shop;
};

export const ShopServices = {
  createShop,
  getAShop,
};
