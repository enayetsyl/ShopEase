"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const product_validation_1 = require("./product.validation");
const fileUploader_1 = require("../../../helpers/fileUploader");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.VENDOR), fileUploader_1.fileUploader.upload.array("images", 10), (req, res, next) => {
    req.body = product_validation_1.productValidation.createProduct.parse(JSON.parse(req.body.data));
    return product_controller_1.ProductController.createAProduct(req, res, next);
});
router.post("/duplicate/:productId", (0, auth_1.default)(client_1.UserRole.VENDOR), product_controller_1.ProductController.duplicateAProduct);
router.get("/", product_controller_1.ProductController.getAllProducts);
router.get("/vendor-product", (0, auth_1.default)(client_1.UserRole.VENDOR), product_controller_1.ProductController.getAllVendorProducts);
router.get("/:productId", product_controller_1.ProductController.getAProduct);
router.patch("/:productId", (0, auth_1.default)(client_1.UserRole.VENDOR), fileUploader_1.fileUploader.upload.array("images", 10), (req, res, next) => {
    req.body = product_validation_1.productValidation.updateProduct.parse(JSON.parse(req.body.data));
    return product_controller_1.ProductController.updateAProduct(req, res, next);
});
exports.ProductRoutes = router;
