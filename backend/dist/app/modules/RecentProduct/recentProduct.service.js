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
exports.RecentProductServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const saveRecentProduct = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    const recentProductsData = payload.map((productId) => ({
        userId: id,
        productId,
        visitedAt: new Date(),
    }));
    const savedData = yield prisma_1.default.recentProduct.createMany({
        data: recentProductsData,
        skipDuplicates: true,
    });
    return;
});
const getRecentProduct = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = user;
    const recentProducts = yield prisma_1.default.recentProduct.findMany({
        where: {
            userId,
        },
        orderBy: {
            visitedAt: "desc",
        },
        include: { product: true },
        take: 10,
    });
    return recentProducts;
});
exports.RecentProductServices = {
    saveRecentProduct,
    getRecentProduct,
};
