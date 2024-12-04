import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TPaginationOptions } from "../../types/pagination";
import { Request } from "express";
import { TFile } from "../../types/file";
import { fileUploader } from "../../../helpers/fileUploader";
import { TFlashSale } from "./flashSale.type";
import { productSearchableFields } from "./flashSale.constant";
import { findProductById } from "../../../helpers/productHelpers";



const createAFlashSale = async (flashSale: TFlashSale ) => {
  //  Create flash sale
  return await prisma.flashSale.create({
    data: flashSale
  })
 
};

const getAllFlashSale = async (
  options: TPaginationOptions
) => {
  // create pagination condition
  // get product data
  // get meta data
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  const now = new Date(new Date().toISOString());

  const result = await prisma.flashSale.findMany({
    where: {
      OR: [
        {
          // Active flash sales
          startTime: { lte: now },
          endTime: { gte: now },
        },
        {
          // Upcoming flash sales
          startTime: { gt: now },
        },
      ],
    },include: {product: true},
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { startTime: "desc" },
  });


  const total = await prisma.flashSale.count({
    where: {
      startTime: {lte: new Date()}, endTime:{gte: new Date() }
    },
  });

  return {
    data: result,
    meta: { page, limit, total },
  };
};

const getAFlashSale = async (id: string) => {
  const result = await findProductById(id);

  return result;
};

const updateAFlashSale = async (id: string, user: any, req: Request) => {
  // get product
  // update data

  const result = await findProductById(id);

  const files = req.files as TFile[];
  let imageUrls: string[] = [];

  if (files?.length > 0) {
    const uploadedFiles = await fileUploader.uploadMultipleToCloudinary(files);

    imageUrls = uploadedFiles.map((file) => file.secure_url);
  }

  const updatedImages = [...result.image, ...imageUrls];

  const productData = {
    ...req.body,
    image: updatedImages,
  };

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: productData,
  });

  return updatedProduct;
};

export const FlashSaleServices = {
  createAFlashSale,  
  getAllFlashSale,
  getAFlashSale,
  updateAFlashSale,
};
