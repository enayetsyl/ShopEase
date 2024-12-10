"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const recentProduct_controller_1 = require("./recentProduct.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), recentProduct_controller_1.RecentProductController.saveRecentProduct);
router.get("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), recentProduct_controller_1.RecentProductController.getRecentProduct);
exports.RecentProductRoutes = router;
