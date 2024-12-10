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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createReview = (customerId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, comment, rating } = data;
    const hasPurchased = yield prisma_1.default.order.findFirst({
        where: {
            customerId: customerId,
            order_items: {
                some: {
                    productId: productId,
                },
            },
            status: "COMPLETED",
        },
    });
    if (!hasPurchased)
        throw new ApiError_1.default(400, "You can only review products you have purchased.");
    const existingReview = yield prisma_1.default.review.findFirst({
        where: {
            customerId,
            productId,
        },
    });
    if (existingReview) {
        throw new Error("You have already reviewed this product.");
    }
    const review = yield prisma_1.default.review.create({
        data: {
            customerId,
            productId,
            comment,
            rating,
        },
    });
    return review;
});
const getReviews = (user, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    let reviews;
    let total = 0;
    if (user.role === "VENDOR") {
        const vendorId = user.vendor.id;
        reviews = yield prisma_1.default.review.findMany({
            where: {
                product: {
                    vendorId: vendorId,
                },
            },
            skip,
            take: limit,
            include: {
                product: true,
                customer: true,
            },
        });
        // Count total reviews for vendor's products
        total = yield prisma_1.default.review.count({
            where: {
                product: {
                    vendorId: vendorId,
                },
            },
        });
    }
    else if (user.role === "ADMIN") {
        reviews = yield prisma_1.default.review.findMany({
            skip,
            take: limit,
            include: {
                product: true,
                customer: true,
            },
        });
        // Count total reviews
        total = yield prisma_1.default.review.count();
    }
    return {
        data: reviews,
        meta: { total, page, limit }
    };
});
exports.ReviewServices = {
    createReview,
    getReviews,
};
