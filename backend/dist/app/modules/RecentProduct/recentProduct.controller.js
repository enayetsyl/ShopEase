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
exports.RecentProductController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const recentProduct_service_1 = require("./recentProduct.service");
const saveRecentProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = req.body;
    yield recentProduct_service_1.RecentProductServices.saveRecentProduct(req.user, products);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Recent products saved successfully.",
        data: "",
    });
}));
const getRecentProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recentProduct_service_1.RecentProductServices.getRecentProduct(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Recent products saved successfully.",
        data: result,
    });
}));
exports.RecentProductController = {
    saveRecentProduct,
    getRecentProduct,
};
