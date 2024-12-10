"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashSaleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const flashSale_controller_1 = require("./flashSale.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const flashSale_validation_1 = require("./flashSale.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.VENDOR), (0, validateRequest_1.default)(flashSale_validation_1.flashSaleValidation.createFlashSale), flashSale_controller_1.FlashSaleController.createAFlashSale);
router.get("/", flashSale_controller_1.FlashSaleController.getAllFlashSale);
router.get("/:id", flashSale_controller_1.FlashSaleController.getAFlashSale);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.VENDOR), (0, validateRequest_1.default)(flashSale_validation_1.flashSaleValidation.updateFlashSale), flashSale_controller_1.FlashSaleController.updateAFlashSale);
exports.FlashSaleRoutes = router;
