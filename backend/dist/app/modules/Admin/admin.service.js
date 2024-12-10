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
exports.AdminServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const admin_constant_1 = require("./admin.constant");
const userHelpers_1 = require("../../../helpers/userHelpers");
const adminHelpers_1 = require("../../../helpers/adminHelpers");
// ! User related service function
const getAllUser = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    // create search and filter condition
    // get user data
    // get meta data
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: admin_constant_1.adminSearchableFields.map((field) => ({
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
    andConditions.push({
        deletedAt: null,
    });
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: "desc" },
    });
    const total = yield prisma_1.default.user.count({
        where: whereConditions,
    });
    return {
        meta: { page, limit, total },
        data: result,
    };
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // get user
    // send result
    const user = yield (0, userHelpers_1.findUserById)(id);
    (0, userHelpers_1.checkAccountStatus)(user);
    return user;
});
const updateUserIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // get user
    // update data in the vendor/ customer collection
    // update data in the user collection
    // response
    const { isSuspended } = payload;
    const user = yield (0, userHelpers_1.findUserById)(id);
    (0, userHelpers_1.checkAccountStatus)(user);
    const { role, vendor, customer } = user;
    if (role === "VENDOR") {
        yield prisma_1.default.vendor.update({
            where: { id: vendor.id },
            data: { isSuspended },
        });
    }
    else if (role === "CUSTOMER") {
        yield prisma_1.default.customer.update({
            where: { id: customer.id },
            data: { isSuspended },
        });
    }
    return;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userHelpers_1.findUserById)(id);
    (0, userHelpers_1.checkAccountStatus)(user);
    const { role, vendor, customer } = user;
    // Perform the updates in a transaction
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        if (role === "VENDOR") {
            yield tx.vendor.update({
                where: { id: vendor.id },
                data: { isDeleted: true },
            });
            // Update the user record's deletedAt field
            yield tx.user.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
        }
        else if (role === "CUSTOMER") {
            yield tx.customer.update({
                where: { id: customer.id },
                data: { isDeleted: true },
            });
            yield tx.user.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
        }
    }));
    return;
});
// ! Vendor related service function
const blacklistVendorShop = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.shop.update({
        where: { id },
        data: {
            isBlackListed: payload.isBlackListed,
        },
    });
});
// ! Category related service function
const createACategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check whether category exist
    // add it into db
    const { name, description } = payload;
    const existingCategory = yield prisma_1.default.category.findUnique({
        where: { name },
    });
    if (existingCategory) {
        throw new ApiError_1.default(400, "Category with this name already exists.");
    }
    // Create a new category
    const newCategory = yield prisma_1.default.category.create({
        data: {
            name,
            description: description || null,
        },
    });
    return newCategory;
});
const getAllCategories = (options) => __awaiter(void 0, void 0, void 0, function* () {
    // create filter condition
    // get category data
    // get meta data
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const result = yield prisma_1.default.category.findMany({
        where: {
            deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: "desc" },
    });
    const total = yield prisma_1.default.category.count({
        where: { deletedAt: null },
    });
    return {
        data: result,
        meta: { page, limit, total },
    };
});
const getACategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, adminHelpers_1.findCategoryById)(id);
    return result;
});
const updateACategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // get category
    // update data
    const { name, description } = payload;
    const category = yield (0, adminHelpers_1.findCategoryById)(id);
    if (name) {
        const existingCategory = yield prisma_1.default.category.findFirst({
            where: { name, NOT: { id } },
        });
        if (existingCategory)
            throw new ApiError_1.default(400, "Category name already exists.");
    }
    const result = yield prisma_1.default.category.update({
        where: { id },
        data: {
            name: name || category.name,
            description: description || category.description,
        },
    });
    return result;
});
const deleteACategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, adminHelpers_1.findCategoryById)(id);
    return yield prisma_1.default.category.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
});
exports.AdminServices = {
    getAllUser,
    getUserById,
    deleteUserFromDB,
    updateUserIntoDB,
    blacklistVendorShop,
    createACategory,
    getAllCategories,
    getACategory,
    updateACategory,
    deleteACategory,
};
