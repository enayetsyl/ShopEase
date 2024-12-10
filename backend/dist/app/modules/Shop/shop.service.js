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
exports.ShopServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createShop = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    //  upload file to cloudinary
    // save data into db
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        req.body.logo = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    req.body.vendorId = user.vendor.id;
    const shop = yield prisma_1.default.shop.create({ data: req.body });
    return shop;
});
const getAShop = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch shop data
    // return that data
    const shop = yield prisma_1.default.shop.findFirst({
        where: { vendorId: payload.vendor.id },
    });
    if (!shop)
        throw new ApiError_1.default(404, "Shop not found");
    return shop;
});
const getAllShops = () => __awaiter(void 0, void 0, void 0, function* () {
    const shops = yield prisma_1.default.shop.findMany({
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
    if (!shops)
        throw new ApiError_1.default(404, "shops not found");
    return shops;
});
const getAShopForShopDetailPage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield prisma_1.default.shop.findUnique({
        where: { id: payload },
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
    if (!shop)
        throw new ApiError_1.default(404, "shop not found");
    return shop;
});
exports.ShopServices = {
    createShop,
    getAShop,
    getAllShops,
    getAShopForShopDetailPage,
};
