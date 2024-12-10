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
exports.AdminController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const admin_service_1 = require("./admin.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const admin_constant_1 = require("./admin.constant");
// ! User related controller
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, admin_constant_1.adminFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield admin_service_1.AdminServices.getAllUser(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User data fetched successfully",
        data: result.data,
        meta: result.meta,
    });
}));
const getUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield admin_service_1.AdminServices.getUserById(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User data fetched successfully",
        data: result,
    });
}));
const updateUserIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield admin_service_1.AdminServices.updateUserIntoDB(userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User Data Updated Successfully",
        data: result,
    });
}));
const deleteUserFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    yield admin_service_1.AdminServices.deleteUserFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User successfully deleted",
        data: null,
    });
}));
// ! Vendor related controller
const blacklistVendorShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = req.params;
    yield admin_service_1.AdminServices.blacklistVendorShop(shopId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendor shop blacklisted successfully",
        data: null,
    });
}));
// ! Category related controller
const createACategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminServices.createACategory(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category created successfully",
        data: result,
    });
}));
const getAllCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield admin_service_1.AdminServices.getAllCategories(options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Categories fetched successfully",
        data: result.data,
        meta: result.meta
    });
}));
const getACategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const result = yield admin_service_1.AdminServices.getACategory(categoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category fetched successfully",
        data: result,
    });
}));
const updateACategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const result = yield admin_service_1.AdminServices.updateACategory(categoryId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category updated successfully",
        data: result,
    });
}));
const deleteACategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const result = yield admin_service_1.AdminServices.deleteACategory(categoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category deleted successfully",
        data: result,
    });
}));
exports.AdminController = {
    getAllUser,
    getUserById,
    updateUserIntoDB,
    blacklistVendorShop,
    deleteUserFromDB,
    createACategory,
    getAllCategories,
    getACategory,
    updateACategory,
    deleteACategory,
};
