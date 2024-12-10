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
exports.FollowServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const follow = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = user.customer.id;
    const existingFollow = yield prisma_1.default.follow.findFirst({
        where: {
            customerId,
            vendorId: id.vendorId,
            isDeleted: false,
        },
    });
    if (existingFollow)
        throw new ApiError_1.default(400, "You are already following this vendor.");
    const data = { vendorId: id.vendorId, customerId };
    return yield prisma_1.default.follow.create({ data });
});
const getFollowers = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield prisma_1.default.follow.count({
        where: { vendorId },
    });
    return {
        data: total,
    };
});
const getFollowersOfAShop = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield prisma_1.default.follow.count({
        where: { vendorId, isDeleted: false },
    });
    return {
        data: total,
    };
});
const unfollow = (vendorId, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFollow = yield prisma_1.default.follow.findFirst({
        where: {
            customerId,
            vendorId,
            isDeleted: false,
        },
    });
    if (!existingFollow)
        throw new ApiError_1.default(400, "You are not following this vendor.");
    const result = yield prisma_1.default.follow.update({
        where: { id: existingFollow.id },
        data: { isDeleted: true },
    });
    return result;
});
exports.FollowServices = {
    follow,
    unfollow,
    getFollowers,
    getFollowersOfAShop,
};
