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
exports.FlashSaleController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const flashSale_service_1 = require("./flashSale.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const createAFlashSale = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield flashSale_service_1.FlashSaleServices.createAFlashSale(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Flash Sale created successfully",
        data: result,
    });
}));
const getAllFlashSale = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield flashSale_service_1.FlashSaleServices.getAllFlashSale(options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All Flash Sale fetched successfully",
        data: result.data,
        meta: result.meta,
    });
}));
const getAFlashSale = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield flashSale_service_1.FlashSaleServices.getAFlashSale(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Flash Sale fetched successfully",
        data: result,
    });
}));
const updateAFlashSale = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield flashSale_service_1.FlashSaleServices.updateAFlashSale(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Flash Sale updated successfully",
        data: result,
    });
}));
exports.FlashSaleController = {
    createAFlashSale,
    getAllFlashSale,
    getAFlashSale,
    updateAFlashSale,
};
