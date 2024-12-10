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
exports.ProductServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const product_constant_1 = require("./product.constant");
const productHelpers_1 = require("../../../helpers/productHelpers");
const createAProduct = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    // upload files to cloudinary
    // add cloudinary link to data
    // add it into db
    const files = req.files;
    if ((files === null || files === void 0 ? void 0 : files.length) === 0)
        throw new ApiError_1.default(400, "At least one image is required");
    const vendorId = user.vendor.id;
    const shop = yield prisma_1.default.shop.findFirst({
        where: { vendorId },
        select: {
            id: true,
        },
    });
    if (!shop)
        throw new ApiError_1.default(404, "Shop not found");
    const shopId = shop.id;
    const uploadedFiles = yield fileUploader_1.fileUploader.uploadMultipleToCloudinary(files);
    const imageUrls = uploadedFiles.map((file) => file.secure_url);
    const productData = Object.assign(Object.assign({}, req.body), { image: imageUrls, vendorId,
        shopId });
    const product = yield prisma_1.default.product.create({
        data: productData,
    });
    return product;
});
const getAllProducts = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    // create filter condition
    // get product data
    // get meta data
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: product_constant_1.productSearchableFields.map((field) => ({
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
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.product.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: "desc" },
    });
    const total = yield prisma_1.default.product.count({
        where: whereConditions,
    });
    return {
        data: result,
        meta: { page, limit, total },
    };
});
const getAllVendorProducts = (options, user) => __awaiter(void 0, void 0, void 0, function* () {
    // get product data based on vendor id
    // get meta data
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const result = yield prisma_1.default.product.findMany({
        where: {
            vendorId: user.vendor.id,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: "desc" },
        include: {
            category: {
                select: {
                    name: true,
                },
            },
        },
    });
    const total = yield prisma_1.default.product.count({
        where: {
            vendorId: user.vendor.id,
        },
    });
    return {
        data: result.map((product) => (Object.assign(Object.assign({}, product), { categoryName: product.category.name }))),
        meta: { page, limit, total },
    };
});
const getAProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.default.product.findUnique({
        where: { id },
        include: {
            reviews: {
                include: {
                    customer: {
                        select: {
                            id: true,
                            name: true,
                            profilePhoto: true,
                        },
                    },
                },
            },
            shop: true,
            category: true,
        },
    });
    if (!product || product.deletedAt !== null)
        throw new ApiError_1.default(404, "product Not Found");
    return product;
});
const duplicateAProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find existing product
    // remove id, createdAt, updatedAt, deletedAt
    // add the data to db
    const result = yield (0, productHelpers_1.findProductById)(id);
    const { id: _, updatedAt: __, createdAt: ___, deletedAt: ____ } = result, duplicateData = __rest(result, ["id", "updatedAt", "createdAt", "deletedAt"]);
    return yield prisma_1.default.product.create({
        data: duplicateData,
    });
});
const updateAProduct = (id, user, req) => __awaiter(void 0, void 0, void 0, function* () {
    // get product
    // update data
    const result = yield (0, productHelpers_1.findProductById)(id);
    const files = req.files;
    let imageUrls = [];
    if ((files === null || files === void 0 ? void 0 : files.length) > 0) {
        const uploadedFiles = yield fileUploader_1.fileUploader.uploadMultipleToCloudinary(files);
        imageUrls = uploadedFiles.map((file) => file.secure_url);
    }
    const updatedImages = [...result.image, ...imageUrls];
    const productData = Object.assign(Object.assign({}, req.body), { image: updatedImages });
    const updatedProduct = yield prisma_1.default.product.update({
        where: { id },
        data: productData,
    });
    return updatedProduct;
});
exports.ProductServices = {
    createAProduct,
    duplicateAProduct,
    getAllProducts,
    getAllVendorProducts,
    getAProduct,
    updateAProduct,
};
