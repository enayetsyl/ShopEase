"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const follow_controller_1 = require("./follow.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), follow_controller_1.FollowController.follow);
router.get("/", (0, auth_1.default)(client_1.UserRole.VENDOR), follow_controller_1.FollowController.getFollowers);
router.get("/:vendorId", follow_controller_1.FollowController.getFollowersOfAShop);
router.delete("/:vendorId", (0, auth_1.default)(client_1.UserRole.CUSTOMER), follow_controller_1.FollowController.unfollow);
exports.FollowRoutes = router;
