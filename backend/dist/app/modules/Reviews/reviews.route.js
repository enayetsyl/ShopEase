"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const reviews_validation_1 = require("./reviews.validation");
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), (0, validateRequest_1.default)(reviews_validation_1.reviewValidation.createReview), reviews_controller_1.ReviewController.createReview);
router.get("/", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), reviews_controller_1.ReviewController.getReviews);
exports.ReviewRoutes = router;
