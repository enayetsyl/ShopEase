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

  if (!shop) throw new ApiError(404, "Shop not found");
  return shop;
};

const getAllShops = async () => {
  const shops = await prisma.shop.findMany({
    where: { isBlackListed: false },
    include: {
      products: {
        include: {
          reviews: true,
        },
      },
      vendor: {
        include: {
          follows: true,
        },
      },
    },
  });


  console.log(shops)

  if (!shops) throw new ApiError(404, "shops not found");
  return shops;
};

export const ShopServices = {
  createShop,
  getAShop,
  getAllShops,
};
