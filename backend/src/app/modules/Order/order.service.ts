import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TPaginationOptions } from "../../types/pagination";
import { Request } from "express";
import { TProductFilterRequest } from "./order.type";
import { productSearchableFields } from "./order.constant";

const createOrder = async (user: any, req: Request) => {
  const { vendorId, totalAmount, products } = req.body;

  const customerId = user.customer.id

  console.log('customer id', customerId)
  console.log('req,body', req.body)

  if (!Array.isArray(products) || products.length === 0) throw new ApiError(400,"Products array must not be empty.");
  
  return await prisma.$transaction(async (tx) => {
    // Create the order first
    const order = await tx.order.create({
      data: {
        customerId: customerId, 
        vendorId,
        totalAmount,
        status: "PENDING",
      },
    });

    // Create order items
    const orderItems = products.map((item) => ({
      orderId: order.id, 
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount || 0,
    }));

    await tx.orderItem.createMany({
      data: orderItems,
    });

    return order; 
  });

};

const getOrders = async (
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



export const OrderServices = {
  createOrder,
  getOrders
};
