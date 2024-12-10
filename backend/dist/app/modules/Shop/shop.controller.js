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
exports.ShopController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const shop_service_1 = require("./shop.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_service_1.ShopServices.createShop(req.user, req);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Shop Created Successfully.",
        data: result,
    });
}));
const getAShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_service_1.ShopServices.getAShop(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Shop fetched successfully",
        data: result,
    });
}));
const getAShopForShopDetailPage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = req.params;
    const result = yield shop_service_1.ShopServices.getAShopForShopDetailPage(shopId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Shop detail fetched successfully",
        data: result,
    });
}));
const getAllShops = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_service_1.ShopServices.getAllShops();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All Shops fetched successfully",
        data: result,
    });
}));
exports.ShopController = {
    createShop,
    getAShop,
    getAllShops,
    getAShopForShopDetailPage,
};
