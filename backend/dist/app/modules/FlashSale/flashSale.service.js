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
exports.FlashSaleServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const flashSaleHelpers_1 = require("../../../helpers/flashSaleHelpers");
const createAFlashSale = (flashSale) => __awaiter(void 0, void 0, void 0, function* () {
    //  Create flash sale
    return yield prisma_1.default.flashSale.create({
        data: flashSale
    });
});
const getAllFlashSale = (options) => __awaiter(void 0, void 0, void 0, function* () {
    // create pagination condition
    // get product data
    // get meta data
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const now = new Date(new Date().toISOString());
    const result = yield prisma_1.default.flashSale.findMany({
        where: {
            OR: [
                {
                    // Active flash sales
                    startTime: { lte: now },
                    endTime: { gte: now },
                },
                {
                    // Upcoming flash sales
                    startTime: { gt: now },
                },
            ],
        }, include: { product: true },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { startTime: "desc" },
    });
    const total = yield prisma_1.default.flashSale.count({
        where: {
            startTime: { lte: new Date() }, endTime: { gte: new Date() }
        },
    });
    return {
        data: result,
        meta: { page, limit, total },
    };
});
const getAFlashSale = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, flashSaleHelpers_1.findFlashSaleById)(id);
});
const updateAFlashSale = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    // get product
    // update data
    const { discount, startTime, endTime } = updatedData;
    const result = yield (0, flashSaleHelpers_1.findFlashSaleById)(id);
    const updatedFlashSale = yield prisma_1.default.flashSale.update({
        where: { id },
        data: Object.assign(Object.assign(Object.assign({}, (discount !== undefined && { discount })), (startTime !== undefined && { startTime })), (endTime !== undefined && { endTime })),
    });
    return updatedFlashSale;
});
exports.FlashSaleServices = {
    createAFlashSale,
    getAllFlashSale,
    getAFlashSale,
    updateAFlashSale,
};
