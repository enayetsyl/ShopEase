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
exports.FollowController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const follow_service_1 = require("./follow.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const follow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield follow_service_1.FollowServices.follow(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Vendor followed successfully",
        data: result,
    });
}));
const getFollowers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield follow_service_1.FollowServices.getFollowers(req.user.vendor.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Follower count fetched successfully",
        data: result,
    });
}));
const getFollowersOfAShop = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield follow_service_1.FollowServices.getFollowersOfAShop(req.params.vendorId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Follower count fetched successfully",
        data: result,
    });
}));
const unfollow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vendorId } = req.params;
    const result = yield follow_service_1.FollowServices.unfollow(vendorId, req.user.customer.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendor unfollowed successfully",
        data: result,
    });
}));
exports.FollowController = {
    follow, unfollow, getFollowers, getFollowersOfAShop
};
