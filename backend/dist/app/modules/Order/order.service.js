"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createOrder = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { vendorId, totalAmount, products } = req.body;
    const customerId = user.customer.id;
    if (!Array.isArray(products) || products.length === 0)
        throw new ApiError_1.default(400, "Products array must not be empty.");
    return yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Create the order first
        const order = yield tx.order.create({
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
        yield tx.orderItem.createMany({
            data: orderItems,
        });
        return order;
    }));
});
const getOrders = (params, options, user) => __awaiter(void 0, void 0, void 0, function* () {
    // create filter condition
    // get product data
    // get meta data
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    let orders;
    let total = 0;
    if (user.role === "CUSTOMER") {
        const customerId = user.customer.id;
        orders = yield prisma_1.default.order.findMany({
            where: { customerId },
            include: { order_items: true },
            skip,
            take: limit,
            orderBy: options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : { createdAt: "desc" },
        });
        total = yield prisma_1.default.order.count({
            where: { customerId },
        });
    }
    else if (user.role === "VENDOR") {
        const vendorId = user.vendor.id;
        orders = yield prisma_1.default.order.findMany({
            where: { vendorId },
            include: { order_items: true },
            skip,
            take: limit,
            orderBy: options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : { createdAt: "desc" },
        });
        total = yield prisma_1.default.order.count({
            where: { vendorId },
        });
    }
    else if (user.role === "ADMIN") {
        orders = yield prisma_1.default.order.findMany({
            where: { deletedAt: null },
            include: { order_items: true, customer: true, vendor: true },
            skip,
            take: limit,
            orderBy: options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : { createdAt: "desc" },
        });
        total = yield prisma_1.default.order.count({
            where: { deletedAt: null },
        });
    }
    return {
        data: orders,
        meta: { page, limit, total },
    };
    // const andConditions: Prisma.OrderWhereInput[] = [];
    // if (params.searchTerm) {
    //   andConditions.push({
    //     OR: orderFilterableFields.map((field) => ({
    //       [field]: {
    //         contains: params.searchTerm,
    //         mode: "insensitive",
    //       },
    //     })),
    //   });
    // }
    // if (Object.keys(filterData).length > 0) {
    //   andConditions.push({
    //     AND: Object.keys(filterData).map((key) => ({
    //       [key]: {
    //         equals: (filterData as any)[key],
    //       },
    //     })),
    //   });
    // }
    // const whereConditions: Prisma.OrderWhereInput = { AND: andConditions };
    // const result = await prisma.order.findMany({
    //   where: whereConditions,
    //   skip,
    //   take: limit,
    //   orderBy:
    //     options.sortBy && options.sortOrder
    //       ? { [options.sortBy]: options.sortOrder }
    //       : { createdAt: "desc" },
    // });
    // const total = await prisma.order.count({
    //   where: whereConditions,
    // });
    // return {
    //   data: result,
    //   meta: { page, limit, total },
    // };
});
exports.OrderServices = {
    createOrder,
    getOrders
};
