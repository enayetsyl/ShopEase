import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TPaginationOptions } from "../../types/pagination";
import { Request } from "express";
import { TFile } from "../../types/file";
import { fileUploader } from "../../../helpers/fileUploader";
import { TProductFilterRequest } from "./product.type";
import { productSearchableFields } from "./product.constant";



const createAProduct = async (user: any, req: Request) => {
  // upload files to cloudinary
  // add cloudinary link to data
  // add it into db
  const files = req.files as TFile[];
  if(files?.length === 0) throw new ApiError(400, "At least one image is required")

  const vendorId = user.vendor.id

  const shop = await prisma.shop.findFirst({
    where: { vendorId },
    select: {
      id: true
    },
  });

  if(!shop) throw new ApiError(404, "Shop not found")

  const shopId = shop.id

  const uploadedFiles = await fileUploader.uploadMultipleToCloudinary(files)

  const imageUrls = uploadedFiles.map(file=> file.secure_url)

  const productData = {
    ...req.body, image: imageUrls,
    vendorId, shopId
  }

  const product = await prisma.product.create({
    data: productData,
  });

  return product;
};

const getAllProducts = async (params: TProductFilterRequest,options: TPaginationOptions) => {
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

const getAProduct = async (id: string) => {
  // const result = await findCategoryById(id);

  // return result;
};

const duplicateAProduct = async (
  payload: any) => {
  // get category
  // update data
  
};
const updateAProduct = async (
  id: string,
  payload: any
) => {
  // get category
  // update data
  
};



export const ProductServices = {
  createAProduct,
  duplicateAProduct,
  getAllProducts,
  getAProduct,
  updateAProduct
};
