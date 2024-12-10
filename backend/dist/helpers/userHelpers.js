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
exports.checkAccountStatus = exports.findUserByEmail = exports.findUserById = void 0;
const ApiError_1 = __importDefault(require("../app/errors/ApiError"));
const prisma_1 = __importDefault(require("../shared/prisma"));
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { id },
        include: { vendor: true, customer: true }
    });
    if (!user)
        throw new ApiError_1.default(404, "User Not Found");
    return user;
});
exports.findUserById = findUserById;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { email },
        include: { vendor: true, customer: true }
    });
    if (!user)
        throw new ApiError_1.default(404, "User Not Found");
    return user;
});
exports.findUserByEmail = findUserByEmail;
const checkAccountStatus = (user) => {
    var _a, _b, _c, _d;
    if (user.role === "VENDOR" && (((_a = user.vendor) === null || _a === void 0 ? void 0 : _a.isDeleted) || ((_b = user.vender) === null || _b === void 0 ? void 0 : _b.isSuspended)))
        throw new ApiError_1.default(403, "Vendor account is suspended or deleted.");
    if (user.role === "CUSTOMER" && (((_c = user.customer) === null || _c === void 0 ? void 0 : _c.isDeleted) || ((_d = user.customer) === null || _d === void 0 ? void 0 : _d.isSuspended)))
        throw new ApiError_1.default(403, "Customer account is suspended or deleted.");
};
exports.checkAccountStatus = checkAccountStatus;
